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

    requires: [
        'Ext.panel.Table'  
    ],

    reserveOffset: false,

    firstHeaderCls: Ext.baseCSSPrefix + 'column-header-first',
    lastHeaderCls: Ext.baseCSSPrefix + 'column-header-last',

    initLayout: function() {
        var me = this;
        if (me.scrollbarWidth === undefined) {
            me.self.prototype.scrollbarWidth = Ext.getScrollbarSize().width;
        }

        // The grid which owns this HeaderContainer
        me.grid = me.owner.up('tablepanel');

        // The grid which was configured by the user and which controls
        // collapsed state and visible state.
        // When this view is one side of a lockable assembly, this will be the lockable grid.
        me.controllingGrid = me.owner.up('[scrollerOwner]');
        me.callParent();
    },

    // Collect the height of the table of data upon layout begin
    beginLayout: function (ownerContext) {
        var me = this,
            owner = me.owner,
            grid = me.controllingGrid,
            view = me.grid.view,
            items = me.getVisibleItems(),
            len = items.length,
            firstCls = me.firstHeaderCls,
            lastCls = me.lastHeaderCls,
            removeCls = [firstCls, lastCls],
            i, item;

        // If the associated view is not configured to do vertical scrolling, then
        // The scrollbar we accommodate in container size calculations will not be present.
        if (!view.scrollFlags.y) {
            me.scrollbarWidth = 0;
        }
        // In case they change the scroll config dynamically, delete any instance property
        else {
            delete me.scrollbarWidth;
        }

        for (i = 0; i < len; i++) {
            item = items[i];
            item.margin = null;
            item.removeCls(removeCls);
            if (i === 0) {
                item.addCls(firstCls);
            }

            if (i === len - 1) {
                item.addCls(lastCls);
            }
        }

        // The grid header container usually needs an extra <scrollbarWidth> pixels of left/right scrollability
        // because if there is vertical overflow in the table view, the appearance of the vertical scrollbar gives
        // the table view that extra <scrollbarWidth> of left/right scrollability, and the header container and the
        // view need to have exactly the same left/right scroll range so they can be kept in sync.
        // This property is the adjustment value.
        //
        // There are bugs in certain browsers which necessitate setting this value to zero in some RTL situations.
        //
        // Chrome has a bug which means that in RTL mode the vertical scrollbar does NOT add extra left/right scrolling.
        // https://code.google.com/p/chromium/issues/detail?id=179332
        // TODO: Remove the Ext.supports.rtlVertScrollbarOnRight test and the test for it when all supported Chrome versions are fixed.
        //
        // Safari keeps the scrollbar on the right in RTL mode so the extra width comes from padding added to the header container.
        //
        // See Ext.rtl.grid.ColumnLayout for further information. That class sets scrollbarAdjustment to
        // zero for an RTL grid when those bugs are present
        me.scrollbarAdjustment = me.scrollbarWidth;

        me.callParent(arguments);

        // If the owner is the grid's HeaderContainer, and the UI displays old fashioned scrollbars and there is a rendered View with data in it,
        // collect the View context to interrogate it for overflow, and possibly invalidate it if there is overflow
        if (!owner.isColumn && !grid.collapsed && view && view.rendered && (ownerContext.viewTable = view.body.dom) && me.scrollbarWidth) {
            ownerContext.viewContext = ownerContext.context.getCmp(view);
        }
    },

    // TableView performs its non-deferred initial refresh during its render layout run.
    // Because the ColumnLayout has already been through its beginLayout phase at that point,
    // a viewContext will not have been captured. This method allows the TableView
    // to inject a ViewContext at the time of initial refresh.
    injectViewContext: function(ownerContext, view) {
        if (!this.controllingGrid.collapsed && view.rendered && (ownerContext.viewTable = view.body.dom) && this.scrollbarWidth) {
            ownerContext.viewContext = ownerContext.context.getCmp(view);
        }
    },

    roundFlex: function(width) {
        return Math.floor(width);
    },

    calculate: function(ownerContext) {
        var me = this,
            view = me.grid.view,
            columns, len, i, column,
            columnsChanged = false;

        me.viewScrollX = view.getScrollX();
        me.callParent(arguments);

        if (ownerContext.state.parallelDone && me.owner.isRootHeader) {
            // The TableLayout only needs to lay out the table if any of the columns have changed width
            columns = ownerContext.target.getVisibleGridColumns();
            len = columns.length;
            for (i = 0; i < len; i++) {
                column = ownerContext.context.getItem(null, columns[i].el);
                if (!column.lastBox || column.props.width !== column.lastBox.width) {
                    (columnsChanged || (columnsChanged = [])).push(i);
                }
            }
            ownerContext.setProp('columnsChanged', columnsChanged);
        }

        // Collect the height of the data table if we need it to determine overflow
        if (ownerContext.viewContext && !ownerContext.state.tableHeight) {
            ownerContext.state.tableHeight = ownerContext.viewTable ? ownerContext.viewTable.offsetHeight : view.all.sumHeights();
        }
    },

    completeLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            state = ownerContext.state;

        me.callParent(arguments);

        // If there is a table neeeding possible resize and we have not been through this already
        // and the owning Container is configured forceFit and the conversion of widths to flexes
        // tells us that the width does not already match the container width, then loop back
        // and recalculate with every column flexed.
        if (ownerContext.viewTable && !state.flexesCalculated && !ownerContext.flexedItems.length && owner.forceFit &&

            // Recalculate based upon all columns now being flexed instead of sized.
            // Set flag, so that we do not do this infinitely
            me.convertWidthsToFlexes(ownerContext)) {
            me.cacheFlexes(ownerContext);

            // Next time round, the *new* tableHeight needs to be known for the *first* run of getContainerSize to
            // be able to assess new vertical overflow status.
            ownerContext.invalidate({
                state: {
                    flexesCalculated: true,
                    tableHeight: ownerContext.viewTable.offsetHeight
                }
            });
        } else {
            // The *PRESENCE* of the property indicates that this layout has done its job.
            // It is only set to TRUE when column widths have CHANGED and one or more elements
            // need resizing by the listening TableLayout
            delete ownerContext.props.columnChanged;
        }
    },

    finishedLayout: function(ownerContext) {
        var view = this.grid.getView();

        this.callParent(arguments);

        // Keep the HeaderContainer's horizontal scroll position synced with where the user has scrolled the view to (it will reset during a layout)
        // IF this is a top lever grid HeaderContainer and the view is doing horizontal scrolling and the HeaderContainer overflows.
        // Only do this after the initial layout where scroll position will be at default.
        if (this.viewScrollX && !this.owner.isColumn && view.scrollFlags.x && this.owner.tooNarrow && this.owner.componentLayoutCounter) {
            this.owner.setScrollX(this.viewScrollX);
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
            viewHeight,
            viewLayoutContext,
            shrinkWrapHeight = viewContext && viewContext.heightModel.shrinkWrap;

        // Column, NOT the main grid's HeaderContainer
        if (me.owner.isColumn) {
            result = me.getColumnContainerSize(ownerContext);
        }

        // This is the maingrid's HeaderContainer
        else {
            result = me.callParent(arguments);
            if (!result.gotAll) {
                me.done = false;
                return result;
            }

            // If scrollbars take up a width and our grid is not configured to ALWAYS leave space for a scrollbar
            // and we've collected a viewContext and we're not shrinkwrapping the height, and there is vertical scrolling
            // and (there's at least one flexed column or we are force fitting - all flexed) which has to clear the vertical scrollbar
            // then we see if we have to increase the width slightly to eat the space we initially left for the scrollbar
            if (me.scrollbarWidth && !me.controllingGrid.reserveScrollbar && viewContext) {
                viewLayoutContext = viewContext.target.componentLayout.ownerContext;
                if (!shrinkWrapHeight && viewContext.target.scrollFlags.y &&
                    (ownerContext.flexedItems && ownerContext.flexedItems.length || me.owner.forceFit) && viewLayoutContext) { // if (its layout is running)
                    viewHeight = viewContext.getProp('height');
                    if (isNaN(viewHeight)) {
                        me.done = false;
                    } else if (ownerContext.state.tableHeight <= viewHeight && viewContext.target.scrollFlags.y) {
                        ownerContext.state.parallelDone = false;
                        viewLayoutContext.invalidate();
                        return result;
                    }
                }
            }
        }

        // Initially assume that we need to account for a scrollbar unless the height shrinkwraps content
        if (!shrinkWrapHeight) {
            result.width -= me.scrollbarWidth;
        }
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

    publishInnerCtSize: function(ownerContext) {
        var me = this,
            owner = me.owner,
            size = ownerContext.state.boxPlan.targetSize,
            cw = ownerContext.peek('contentWidth');

        if ((cw != null) && !owner.isColumn) {
            size.width = cw;

            // The grid header container usually needs an extra <scrollbarWidth> pixels of left/right scrollability
            // because if there is vertical overflow in the table view, the appearance of the vertical scrollbar gives
            // the table view that extra <scrollbarWidth> of left/right scrollability, and the header container and the
            // view need to have exactly the same left/right scroll range so they can be kept in sync.
            //
            // There are bugs in certain browsers which necessitate setting this value to zero in some RTL situations.
            //
            // Chrome has a bug which means that in RTL mode the vertical scrollbar does NOT add extra left/right scrolling.
            // https://code.google.com/p/chromium/issues/detail?id=179332
            // TODO: Remove the Ext.supports.rtlVertScrollbarOnRight test and the test for it when all supported Chrome versions are fixed.
            //
            // Safari keeps the scrollbar on the right in RTL mode so the extra width comes from padding added to the header container.
            //
            // See Ext.rtl.grid.ColumnLayout for further information. That class sets scrollbarAdjustment to
            // zero for an RTL grid when those bugs are present
            if (owner.ownerCt.view.scrollFlags.y) {
                size.width += me.scrollbarAdjustment;
            }
        }

        return me.callParent(arguments);
    }
});
