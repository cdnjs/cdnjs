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
            otherSide = me.owner.lockingPartner;

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
    },

    calculate: function(ownerContext) {
        var me = this,
            lockingPartner = me.lockingPartner,
            owner = me.owner,
            contentHeight = 0,
            emptyEl;

        // Shortcut when empty grid. Inform contexts of zero contentHheight.
        if (!owner.store.getCount()) {
            ownerContext.state.columnWidthsSynced = true;
            if (ownerContext.bodyContext) {
                ownerContext.bodyContext.setHeight(contentHeight, false);
            }
            ownerContext.setProp('contentHeight', contentHeight);
            me.callParent(arguments);
            return;
        }

        // We can only complete our work (setting the CSS rules governing column widths) if the
        // Grid's HeaderContainer's ColumnLayout has set the widths of its columns.
        // This property will *EXIST* when the ColumnLayout has completed.
        // It will only be *TRUE* if one or more columns have changed width, necessitating table layout
        if (ownerContext.headerContext.hasProp('columnsChanged')) {
            if (ownerContext.headerContext.getProp('columnsChanged') && !me.setColumnWidths(ownerContext)) {
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
                // If there is horizontal overflow, and the grid is shrinkwrapping height, then allow the horizontal scrollbar to contibute to contentHeight
                if (ownerContext.headerContext.state.boxPlan.tooNarrow && ownerContext.ownerCtContext.sizeModel.height.shrinkWrap) {
                    contentHeight += Ext.getScrollbarSize().height;
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
        // No content to size. We're done
        if (!this.owner.body.dom) {
            return true;
        }

        var me = this,
            owner = me.owner,
            context = ownerContext.context,
            columnsChanged = ownerContext.headerContext.getProp('columnsChanged'),
            columns = me.headerCt.getVisibleGridColumns(),
            column,
            i = 0,
            len = columnsChanged.length,
            childContext,
            colWidth;

        // So that the setProp can trigger this layout.
        if (context) {
            context.currentLayout = me;
        }

        // Set column width corresponding to each header
        for (i = 0; i < len; i++) {
            column = columns[columnsChanged[i]];
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
            owner.body.select(owner.getColumnSizerSelector(column)).setWidth(colWidth);
        }
        return true;
    },

    finishedLayout: function(ownerContext) {
        var me = this,
            tableWidth = ownerContext.headerContext.props.contentWidth,
            nodeContainer = Ext.fly(me.owner.getNodeContainer());

        me.callParent(arguments);
        nodeContainer && nodeContainer.setWidth(tableWidth);

        // Make sure only one side gets to do the sync on completion - it's an expensive process.
        // Only do it if the syncRowHeightConfig hasn't been set to false.
        if (me.owner.refreshCounter && me.lockedGrid && me.lockedGrid.syncRowHeight && me.lockedGrid.needsRowHeightSync) {
            me.lockedGrid.syncRowHeights();
            me.lockedGrid.needsRowHeightSync = false;
        }
    }
});