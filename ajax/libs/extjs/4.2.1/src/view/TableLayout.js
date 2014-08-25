/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 *  Component layout for {@link Ext.view.Table}
 *  @private
 * 
 */
Ext.define('Ext.view.TableLayout', {
    extend: 'Ext.layout.component.Auto',
    requires: ['Ext.util.CSS'],

    alias: ['layout.tableview'],
    type: 'tableview',

    beginLayout: function(ownerContext) {
        var me = this,
            otherSide = me.owner.lockingPartner,
            owner = me.owner;

        me.callParent(arguments);
        
        // If we are in a twinned grid (locked view) then set up bidirectional links with the other side's layout context
        if (otherSide) {
            me.lockedGrid = me.owner.up('[lockable]');
            me.lockedGrid.needsRowHeightSync = true;
            if (!ownerContext.lockingPartner) {
                ownerContext.lockingPartner = ownerContext.context.getItem(otherSide, otherSide.el);
                if (ownerContext.lockingPartner && !ownerContext.lockingPartner.lockingPartner) {
                    ownerContext.lockingPartner.lockingPartner = ownerContext;
                }
            }
        }

        // Grab a ContextItem for the header container
        ownerContext.headerContext = ownerContext.context.getCmp(me.headerCt);

        // Grab ContextItem for the table only if there is a table to size
        if (me.owner.body.dom) {
            ownerContext.bodyContext = ownerContext.getEl(me.owner.body);
        }
        if (Ext.isWebKit) {
            owner.el.select(owner.getBodySelector()).setStyle('table-layout', 'auto');
        }
    },

    calculate: function(ownerContext) {
        var me = this,
            lockingPartner = me.lockingPartner,
            owner = me.owner,
            contentHeight = 0,
            emptyEl;

        // We can only complete our work (setting the CSS rules governing column widths) if the
        // Grid's HeaderContainer's ColumnLayout has set the widths of its columns.
        if (ownerContext.headerContext.hasProp('columnWidthsDone')) {
            if (!me.setColumnWidths(ownerContext)) {
                me.done = false;
                return;
            }
            ownerContext.state.columnWidthsSynced = true;
            if (ownerContext.bodyContext) {
                emptyEl = me.owner.el.down('.' + owner.ownerCt.emptyCls, true);
                if (!emptyEl) {
                    contentHeight = ownerContext.bodyContext.el.dom.offsetHeight;
                    ownerContext.bodyContext.setHeight(contentHeight, false);
                } else {
                    contentHeight = emptyEl.offsetHeight;
                }
                ownerContext.setProp('contentHeight', contentHeight);
            }
            
            // If we are part of a twinned table view set (locking grid)
            // Then only complete when both sides are complete.
            if (lockingPartner && !lockingPartner.state.columnWidthsSynced) {
                me.done = false;
            } else {
                me.callParent(arguments);
            }

        } else {
            me.done = false;
        }
    },

    measureContentHeight: function(ownerContext) {
        var lockingPartner = ownerContext.lockingPartner;

        // Only able to produce a valid contentHeight if there's no table
        // ... or we have flushed all column widths to the table (or both tables if we are a pair)
        if (!ownerContext.bodyContext || (ownerContext.state.columnWidthsSynced && (!lockingPartner || lockingPartner.state.columnWidthsSynced))) {
            return this.callParent(arguments);
        }
    },

    setColumnWidths: function(ownerContext) {
        var me = this,
            owner = me.owner,
            context = ownerContext.context,
            columns = me.headerCt.getVisibleGridColumns(),
            column,
            i = 0, len = columns.length,
            tableWidth = 0,
            columnLineWidth = 0,
            childContext,
            colWidth,
            isContentBox = !Ext.isBorderBox;

        // So that the setProp can trigger this layout.
        if (context) {
            context.currentLayout = me;
        }

        // Set column width corresponding to each header
        for (i = 0; i < len; i++) {
            column = columns[i];
            childContext = context.getCmp(column);
            colWidth = childContext.props.width;
            if (isNaN(colWidth)) {
                // We don't have a width set, so we need to trigger when this child
                // actually gets a width assigned so we can continue. Technically this
                // shouldn't happen however we have a bug inside ColumnLayout where
                // columnWidthsDone is set incorrectly. This is just a workaround.
                childContext.getProp('width');
                return false;
            }
            tableWidth += colWidth;
            // https://sencha.jira.com/browse/EXTJSIV-9263 - Browsers which cannot be switched to border box when doctype present (IE6 & IE7) - must subtract borders width from width of cells.
            if (isContentBox && owner.columnLines) {
                // https://sencha.jira.com/browse/EXTJSIV-9744 - default border width to 1 because
                // We are looking at the *header* border widths and Neptune, being a borderless theme
                // omits the border from the last column *HEADER*. But we are interrogating that to
                // know the width of border lines between cells which are not omitted.
                if (!columnLineWidth) {
                    columnLineWidth = context.getCmp(column).borderInfo.width || 1;
                }
                colWidth -= columnLineWidth;
            }

            // Select column sizing <col> elements within every <table> within the grid.
            // 90% of the time, there will be only one table.
            // The RowWrap and Summary Features embed tables within colspanning cells, and these also
            // get <colgroup><col></colgroup> sizers which need updating.
            // On IE8, sizing <col> elements to control column width was about 2.25 times
            // faster than selecting all the cells in the column to be resized.
            // Column sizing using dynamic CSS rules is *extremely* expensive on IE.
            owner.body.select(owner.getColumnSizerSelector(column)).setWidth(colWidth);

        }
        // Set widths of all tables (includes tables embedded in RowWrap and Summary rows)
        owner.el.select(owner.getBodySelector()).setWidth(tableWidth);
        return true;
    },

    finishedLayout: function() {
        var me = this,
            owner = me.owner;

        me.callParent(arguments);

        if (Ext.isWebKit) {
            owner.el.select(owner.getBodySelector()).setStyle('table-layout', '');
        }
        // Make sure only one side gets to do the sync on completion - it's an expensive process.
        // Only do it if the syncRowHeightConfig hasn't been set to false.
        if (owner.refreshCounter && me.lockedGrid && me.lockedGrid.syncRowHeight && me.lockedGrid.needsRowHeightSync) {
            me.lockedGrid.syncRowHeights();
            me.lockedGrid.needsRowHeightSync = false;
        }
    }
});