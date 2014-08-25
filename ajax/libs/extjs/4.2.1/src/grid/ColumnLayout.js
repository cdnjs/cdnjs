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
 * @private
 *
 * This class is used only by the grid's HeaderContainer docked child.
 *
 * It adds the ability to shrink the vertical size of the inner container element back if a grouped
 * column header has all its child columns dragged out, and the whole HeaderContainer needs to shrink back down.
 *
 * Also, after every layout, after all headers have attained their 'stretchmax' height, it goes through and calls
 * `setPadding` on the columns so that they lay out correctly.
 */
Ext.define('Ext.grid.ColumnLayout', {
    extend: 'Ext.layout.container.HBox',
    alias: 'layout.gridcolumn',
    type : 'gridcolumn',

    reserveOffset: false,

    firstHeaderCls: Ext.baseCSSPrefix + 'column-header-first',
    lastHeaderCls: Ext.baseCSSPrefix + 'column-header-last',

    initLayout: function() {
        if (!this.scrollbarWidth) {
            this.self.prototype.scrollbarWidth = Ext.getScrollbarSize().width;
        }
        this.grid = this.owner.up('[scrollerOwner]');
        this.callParent();
    },

    // Collect the height of the table of data upon layout begin
    beginLayout: function (ownerContext) {
        var me = this,
            owner = me.owner,
            grid = me.grid,
            view = grid.view,
            items = me.getVisibleItems(),
            len = items.length,
            firstCls = me.firstHeaderCls, 
            lastCls = me.lastHeaderCls,
            i, item;

        // If we are one side of a locking grid, then if we are on the "normal" side, we have to grab the normal view
        // for use in determining whether to subtract scrollbar width from available width.
        // The locked side does not have scrollbars, so it should not look at the view.
        if (grid.lockable) {
            if (owner.up('tablepanel') === view.normalGrid) {
                view = view.normalGrid.getView();
            } else {
                view = null;
            }
        }

        for (i = 0; i < len; i++) {
            item = items[i];

            // Keep the isLast flag correct so that the column's component layout can know whether or not
            // it needs a right border. See ColumnComponentLayout.beginLayoutCycle
            item.isLast = false;
            item.removeCls([firstCls, lastCls]);
            if (i === 0) {
                item.addCls(firstCls);
            }

            if (i === len - 1) {
                item.addCls(lastCls);
                item.isLast = true;
            }
        }

        me.callParent(arguments);

        // If the owner is the grid's HeaderContainer, and the UI displays old fashioned scrollbars and there is a rendered View with data in it,
        // collect the View context to interrogate it for overflow, and possibly invalidate it if there is overflow
        if (!owner.isColumn && Ext.getScrollbarSize().width && !grid.collapsed && view &&
                view.rendered && (ownerContext.viewTable = view.body.dom)) {
            ownerContext.viewContext = ownerContext.context.getCmp(view);
        }
    },

    roundFlex: function(width) {
        return Math.floor(width);
    },

    calculate: function(ownerContext) {
        this.callParent(arguments);

        // If we have calculated the widths, then if forceFit, and there are no flexes, we cannot tell the
        // TableLayout we are done. We will have to go through the convertWidthsToFlexes stage.
        if (ownerContext.state.parallelDone && (!this.owner.forceFit || ownerContext.flexedItems.length)) {
            // TODO: auto width columns aren't necessarily done here.
            // see view.TableLayout, there is a work around for that there 
            ownerContext.setProp('columnWidthsDone', true);
        }

        // Collect the height of the data table if we need it to determine overflow
        if (ownerContext.viewContext) {
            ownerContext.state.tableHeight = ownerContext.viewTable.offsetHeight;
        }
    },

    completeLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            state = ownerContext.state;

        me.callParent(arguments);

        // If we have not been through this already, and the owning Container is configured
        // forceFit, is not a group column and and there is a valid width, then convert
        // widths to flexes, and loop back.
        if (!ownerContext.flexedItems.length && !state.flexesCalculated && owner.forceFit &&

            // Recalculate based upon all columns now being flexed instead of sized.
            // Set flag, so that we do not do this infinitely
            me.convertWidthsToFlexes(ownerContext)) {
            me.cacheFlexes(ownerContext);
            ownerContext.invalidate({
                state: {
                    flexesCalculated: true
                }
            });
        } else {
            ownerContext.setProp('columnWidthsDone', true);
        }
    },

    convertWidthsToFlexes: function(ownerContext) {
        var me = this,
            totalWidth = 0,
            calculated = me.sizeModels.calculated,
            childItems, len, i, childContext, item;

        childItems = ownerContext.childItems;
        len = childItems.length;

        for (i = 0; i < len; i++) {
            childContext = childItems[i];
            item = childContext.target;

            totalWidth += childContext.props.width;

            // Only allow to be flexed if it's a resizable column
            if (!(item.fixed || item.resizable === false)) {

                // For forceFit, just use allocated width as the flex value, and the proportions
                // will end up the same whatever HeaderContainer width they are being forced into.
                item.flex = ownerContext.childItems[i].flex = childContext.props.width;
                item.width = null;
                childContext.widthModel = calculated;
            }
        }

        // Only need to loop back if the total column width is not already an exact fit
        return totalWidth !== ownerContext.props.width;
    },

    /**
     * @private
     * Local getContainerSize implementation accounts for vertical scrollbar in the view.
     */
    getContainerSize: function(ownerContext) {
        var me = this,
            result,
            viewContext = ownerContext.viewContext,
            viewHeight;

        // Column, NOT the main grid's HeaderContainer
        if (me.owner.isColumn) {
            result = me.getColumnContainerSize(ownerContext);
        }

        // This is the maingrid's HeaderContainer
        else {
            result = me.callParent(arguments);

            // If we've collected a viewContext and we're not shrinkwrapping the height
            // then we see if we have to narrow the width slightly to account for scrollbar
            if (viewContext && !viewContext.heightModel.shrinkWrap &&
                    viewContext.target.componentLayout.ownerContext) { // if (its layout is running)
                viewHeight = viewContext.getProp('height');
                if (isNaN(viewHeight)) {
                    me.done = false;
                } else if (ownerContext.state.tableHeight > viewHeight) {
                    result.width -= Ext.getScrollbarSize().width;
                    ownerContext.state.parallelDone = false;
                    viewContext.invalidate();
                }
            }
        }

// TODO - flip the initial assumption to "we have a vscroll" to avoid the invalidate in most
// cases (and the expensive ones to boot)

        return result;
    },

    getColumnContainerSize : function(ownerContext) {
        var padding = ownerContext.paddingContext.getPaddingInfo(),
            got = 0,
            needed = 0,
            gotWidth, gotHeight, width, height;

        // In an shrinkWrap width/height case, we must not ask for any of these dimensions
        // because they will be determined by contentWidth/Height which is calculated by
        // this layout...

        // Fit/Card layouts are able to set just the width of children, allowing child's
        // resulting height to autosize the Container.
        // See examples/tabs/tabs.html for an example of this.

        if (!ownerContext.widthModel.shrinkWrap) {
            ++needed;
            width = ownerContext.getProp('innerWidth');
            gotWidth = (typeof width == 'number');
            if (gotWidth) {
                ++got;
                width -= padding.width;
                if (width < 0) {
                    width = 0;
                }
            }
        }

        if (!ownerContext.heightModel.shrinkWrap) {
            ++needed;
            height = ownerContext.getProp('innerHeight');
            gotHeight = (typeof height == 'number');
            if (gotHeight) {
                ++got;
                height -= padding.height;
                if (height < 0) {
                    height = 0;
                }
            }
        }

        return {
            width: width,
            height: height,
            needed: needed,
            got: got,
            gotAll: got == needed,
            gotWidth: gotWidth,
            gotHeight: gotHeight
        };
    },

    // FIX: when flexing we actually don't have enough space as we would
    // typically because of the scrollOffset on the GridView, must reserve this
    publishInnerCtSize: function(ownerContext) {
        var me = this,
            size = ownerContext.state.boxPlan.targetSize,
            cw = ownerContext.peek('contentWidth'),
            view;

        // Allow the other co-operating objects to know whether the columns overflow the available width.
        me.owner.tooNarrow = ownerContext.state.boxPlan.tooNarrow;

        // InnerCt MUST stretch to accommodate all columns so that left/right scrolling is enabled in the header container.
        if ((cw != null) && !me.owner.isColumn) {
            size.width = cw;

            // innerCt must also encompass any vertical scrollbar width if there may be one
            view = me.owner.ownerCt.view;
            if (view.scrollFlags.y) {
                size.width += Ext.getScrollbarSize().width;
            }
        }

        return me.callParent(arguments);
    }
});
