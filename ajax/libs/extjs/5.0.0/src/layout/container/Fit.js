/**
 * This is a base class for layouts that contain a single item that automatically expands to fill the layout's
 * container. This class is intended to be extended or created via the layout:'fit'
 * {@link Ext.container.Container#layout} config, and should generally not need to be created directly via the new keyword.
 *
 * Fit layout does not have any direct config options (other than inherited ones). To fit a panel to a container using
 * Fit layout, simply set `layout: 'fit'` on the container and add a single panel to it.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Fit Layout',
 *         width: 300,
 *         height: 150,
 *         layout:'fit',
 *         items: {
 *             title: 'Inner Panel',
 *             html: 'This is the inner panel content',
 *             bodyPadding: 20,
 *             border: false
 *         },
 *         renderTo: Ext.getBody()
 *     });
 *
 * If the container has multiple items, all of the items will all be equally sized. This is usually not
 * desired, so to avoid this, place only a **single** item in the container. This sizing of all items
 * can be used to provide a background {@link Ext.Img image} that is "behind" another item
 * such as a {@link Ext.view.View dataview} if you also absolutely position the items.
 */
Ext.define('Ext.layout.container.Fit', {

    /* Begin Definitions */
    extend: 'Ext.layout.container.Container',
    alternateClassName: 'Ext.layout.FitLayout',

    alias: 'layout.fit',

    /* End Definitions */

    itemCls: Ext.baseCSSPrefix + 'fit-item',
    targetCls: Ext.baseCSSPrefix + 'layout-fit',
    type: 'fit',
   
    manageMargins: true,

    sizePolicies: {
        0: { readsWidth: 1, readsHeight: 1, setsWidth: 0, setsHeight: 0 },
        1: { readsWidth: 0, readsHeight: 1, setsWidth: 1, setsHeight: 0 },
        2: { readsWidth: 1, readsHeight: 0, setsWidth: 0, setsHeight: 1 },
        3: { readsWidth: 0, readsHeight: 0, setsWidth: 1, setsHeight: 1 }
    },

    getItemSizePolicy: function (item, ownerSizeModel) {
        // this layout's sizePolicy is derived from its owner's sizeModel:
        var sizeModel = ownerSizeModel || this.owner.getSizeModel(),
            mode = (sizeModel.width.shrinkWrap ? 0 : 1) |
                   (sizeModel.height.shrinkWrap ? 0 : 2);

       return this.sizePolicies[mode];
    },

    beginLayoutCycle: function (ownerContext, firstCycle) {
        var me = this,
            // determine these before the lastSizeModels get updated:
            resetHeight = me.lastHeightModel && me.lastHeightModel.calculated,
            resetWidth = me.lastWidthModel && me.lastWidthModel.calculated,
            resetSizes = resetWidth || resetHeight,
            maxChildMinHeight = 0, maxChildMinWidth = 0,
            c, childItems, i, item, length, margins, minHeight, minWidth, style, undef;

        me.callParent(arguments);

        // Clear any dimensions which we set before calculation, in case the current
        // settings affect the available size. This particularly effects self-sizing
        // containers such as fields, in which the target element is naturally sized,
        // and should not be stretched by a sized child item.
        if (resetSizes && ownerContext.targetContext.el.dom.tagName.toUpperCase() != 'TD') {
            resetSizes = resetWidth = resetHeight = false;
        }

        childItems = ownerContext.childItems;
        length = childItems.length;

        for (i = 0; i < length; ++i) {
            item = childItems[i];

            // On the firstCycle, we determine the max of the minWidth/Height of the items
            // since these can cause the container to grow scrollbars despite our attempts
            // to fit the child to the container.
            if (firstCycle) {
                c = item.target;
                minHeight = c.minHeight;
                minWidth = c.minWidth;

                if (minWidth || minHeight) {
                    margins = item.marginInfo || item.getMarginInfo();
                    // if the child item has undefined minWidth/Height, these will become
                    // NaN by adding the margins...
                    minHeight += margins.height;
                    minWidth += margins.height;

                    // if the child item has undefined minWidth/Height, these comparisons
                    // will evaluate to false... that is, "0 < NaN" == false...
                    if (maxChildMinHeight < minHeight) {
                        maxChildMinHeight = minHeight;
                    }
                    if (maxChildMinWidth < minWidth) {
                        maxChildMinWidth = minWidth;
                    }
                }
            }

            if (resetSizes) {
                style = item.el.dom.style;

                if (resetHeight) {
                    style.height = '';
                }
                if (resetWidth) {
                    style.width = '';
                }
            }
        }

        if (firstCycle) {
            ownerContext.maxChildMinHeight = maxChildMinHeight;
            ownerContext.maxChildMinWidth = maxChildMinWidth;
        }

        // Cache the overflowX/Y flags, but make them false in shrinkWrap mode (since we
        // won't be triggering overflow in that case) and false if we have no minSize (so
        // no child to trigger an overflow).
        c = ownerContext.target;
        ownerContext.overflowX = (!ownerContext.widthModel.shrinkWrap && 
                                   ownerContext.maxChildMinWidth &&
                                   c.scrollFlags.x) || undef;

        ownerContext.overflowY = (!ownerContext.heightModel.shrinkWrap &&
                                   ownerContext.maxChildMinHeight &&
                                   c.scrollFlags.y) || undef;
    },

    calculate : function (ownerContext) {
        var me = this,
            childItems = ownerContext.childItems,
            length = childItems.length,
            containerSize = me.getContainerSize(ownerContext),
            info = {
                length: length,
                ownerContext: ownerContext,
                targetSize: containerSize
            },
            shrinkWrapWidth = ownerContext.widthModel.shrinkWrap,
            shrinkWrapHeight = ownerContext.heightModel.shrinkWrap,
            overflowX = ownerContext.overflowX,
            overflowY = ownerContext.overflowY,
            scrollbars, scrollbarSize, padding, i, contentWidth, contentHeight;

        if (overflowX || overflowY) {
            // If we have children that have minHeight/Width, we may be forced to overflow
            // and gain scrollbars. If so, we want to remove their space from the other
            // axis so that we fit things inside the scrollbars rather than under them.
            scrollbars = me.getScrollbarsNeeded(
                    overflowX && containerSize.width, overflowY && containerSize.height,
                    ownerContext.maxChildMinWidth, ownerContext.maxChildMinHeight);

            if (scrollbars) {
                scrollbarSize = Ext.getScrollbarSize();
                if (scrollbars & 1) { // if we need the hscrollbar, remove its height
                    containerSize.height -= scrollbarSize.height;
                }
                if (scrollbars & 2) { // if we need the vscrollbar, remove its width
                    containerSize.width -= scrollbarSize.width;
                }
            }
        }

        // If length === 0, it means we either have no child items, or the children are hidden
        if (length > 0) {
            // Size the child items to the container (if non-shrinkWrap):
            for (i = 0; i < length; ++i) {
                info.index = i;
                me.fitItem(childItems[i], info);
            }
        } else {
            info.contentWidth = info.contentHeight = 0;
        }
        
        if (shrinkWrapHeight || shrinkWrapWidth) {
            padding = ownerContext.targetContext.getPaddingInfo();
            
            if (shrinkWrapWidth) {
                if (overflowY && !containerSize.gotHeight) {
                    // if we might overflow vertically and don't have the container height,
                    // we don't know if we will need a vscrollbar or not, so we must wait
                    // for that height so that we can determine the contentWidth...
                    me.done = false;
                } else {
                    contentWidth = info.contentWidth + padding.width;
                    // the scrollbar flag (if set) will indicate that an overflow exists on
                    // the horz(1) or vert(2) axis... if not set, then there could never be
                    // an overflow...
                    if (scrollbars & 2) { // if we need the vscrollbar, add its width
                        contentWidth += scrollbarSize.width;
                    }
                    if (!ownerContext.setContentWidth(contentWidth)) {
                        me.done = false;
                    }
                }
            }

            if (shrinkWrapHeight) {
                if (overflowX && !containerSize.gotWidth) {
                    // if we might overflow horizontally and don't have the container width,
                    // we don't know if we will need a hscrollbar or not, so we must wait
                    // for that width so that we can determine the contentHeight...
                    me.done = false;
                } else {
                    contentHeight = info.contentHeight + padding.height;
                    // the scrollbar flag (if set) will indicate that an overflow exists on
                    // the horz(1) or vert(2) axis... if not set, then there could never be
                    // an overflow...
                    if (scrollbars & 1) { // if we need the hscrollbar, add its height
                        contentHeight += scrollbarSize.height;
                    }
                    if (!ownerContext.setContentHeight(contentHeight)) {
                        me.done = false;
                    }
                }
            }
        }
    },

    fitItem: function (itemContext, info) {
        var me = this;

        if (itemContext.invalid) {
            me.done = false;
            return;
        }

        info.margins = itemContext.getMarginInfo();
        info.needed = info.got = 0;

        me.fitItemWidth(itemContext, info);
        me.fitItemHeight(itemContext, info);

        // If not all required dimensions have been satisfied, we're not done.
        if (info.got != info.needed) {
            me.done = false;
        }
    },

    fitItemWidth: function (itemContext, info) {
        var contentWidth, width;
        // Attempt to set only dimensions that are being controlled, not shrinkWrap dimensions
        if (info.ownerContext.widthModel.shrinkWrap) {
            // contentWidth must include the margins to be consistent with setItemWidth
            width = itemContext.getProp('width') + info.margins.width;
            // because we add margins, width will be NaN or a number (not undefined)

            contentWidth = info.contentWidth;
            if (contentWidth === undefined) {
                info.contentWidth = width;
            } else {
                info.contentWidth = Math.max(contentWidth, width);
            }
        } else if (itemContext.widthModel.calculated) {
            ++info.needed;
            if (info.targetSize.gotWidth) {
                ++info.got;
                this.setItemWidth(itemContext, info);
            } else {
                // Too early to position
                return;
            }
        }

        this.positionItemX(itemContext, info);
    },

    fitItemHeight: function (itemContext, info) {
        var contentHeight, height;
        if (info.ownerContext.heightModel.shrinkWrap) {
            // contentHeight must include the margins to be consistent with setItemHeight
            height = itemContext.getProp('height') + info.margins.height;
            // because we add margins, height will be NaN or a number (not undefined)

            contentHeight = info.contentHeight;
            if (contentHeight === undefined) {
                info.contentHeight = height;
            } else {
                info.contentHeight = Math.max(contentHeight, height);
            }
        } else if (itemContext.heightModel.calculated) {
            ++info.needed;
            if (info.targetSize.gotHeight) {
                ++info.got;
                this.setItemHeight(itemContext, info);
            } else {
                // Too early to position
                return;
            }
        }

        this.positionItemY(itemContext, info);
    },

    positionItemX: function (itemContext, info) {
        var margins = info.margins;

        // Adjust position to account for configured margins or if we have multiple items
        // (all items should overlap):
        if (info.index || margins.left) {
            itemContext.setProp('x', margins.left);
        }

        if (margins.width) {
            // Need the margins for shrink-wrapping but old IE sometimes collapses the left margin into the padding
            itemContext.setProp('margin-right', margins.width);
        }
    },

    positionItemY: function (itemContext, info) {
        var margins = info.margins;

        if (info.index || margins.top) {
            itemContext.setProp('y', margins.top);
        }

        if (margins.height) {
            // Need the margins for shrink-wrapping but old IE sometimes collapses the top margin into the padding
            itemContext.setProp('margin-bottom', margins.height);
        }
    },

    setItemHeight: function (itemContext, info) {
        itemContext.setHeight(info.targetSize.height - info.margins.height);
    },

    setItemWidth: function (itemContext, info) {
        itemContext.setWidth(info.targetSize.width - info.margins.width);
    }
});
