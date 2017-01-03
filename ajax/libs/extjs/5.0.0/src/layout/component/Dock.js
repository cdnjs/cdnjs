/**
 * This ComponentLayout handles docking for Panels. It takes care of panels that are
 * part of a ContainerLayout that sets this Panel's size and Panels that are part of
 * an AutoContainerLayout in which this panel get his height based of the CSS or
 * its content.
 * @private
 */
Ext.define('Ext.layout.component.Dock', {

    /* Begin Definitions */

    extend: 'Ext.layout.component.Component',

    alias: 'layout.dock',

    alternateClassName: 'Ext.layout.component.AbstractDock',

    /* End Definitions */

    type: 'dock',
    
    horzAxisProps: {
        name: 'horz',
        oppositeName: 'vert',
        dockBegin: 'left',
        dockEnd: 'right',
        horizontal: true,
        marginBegin: 'margin-left',
        maxSize: 'maxWidth',
        minSize: 'minWidth',
        pos: 'x',
        setSize: 'setWidth',
        shrinkWrapDock: 'shrinkWrapDockWidth',
        size: 'width',
        sizeModel: 'widthModel'
    },

    vertAxisProps: {
        name: 'vert',
        oppositeName: 'horz',
        dockBegin: 'top',
        dockEnd: 'bottom',
        horizontal: false,
        marginBegin: 'margin-top',
        maxSize: 'maxHeight',
        minSize: 'minHeight',
        pos: 'y',
        setSize: 'setHeight',
        shrinkWrapDock: 'shrinkWrapDockHeight',
        size: 'height',
        sizeModel: 'heightModel'
    },

    initializedBorders: -1,

    horizontalCollapsePolicy: { width: true, x: true },

    verticalCollapsePolicy: { height: true, y: true },

    finishRender: function () {
        var me = this,
            target, items;

        me.callParent();

        target = me.getRenderTarget();
        items = me.getDockedItems();

        me.finishRenderItems(target, items);
    },

    isItemBoxParent: function (itemContext) {
        return true;
    },

    isItemShrinkWrap: function (item) {
        return true;
    },

    noBorderClasses: [
        Ext.baseCSSPrefix + 'docked-noborder-top',
        Ext.baseCSSPrefix + 'docked-noborder-right',
        Ext.baseCSSPrefix + 'docked-noborder-bottom',
        Ext.baseCSSPrefix + 'docked-noborder-left'
    ],

    noBorderClassesSides: {
        top: Ext.baseCSSPrefix + 'docked-noborder-top',
        right: Ext.baseCSSPrefix + 'docked-noborder-right',
        bottom: Ext.baseCSSPrefix + 'docked-noborder-bottom',
        left: Ext.baseCSSPrefix + 'docked-noborder-left'
    },

    borderWidthProps: {
        top: 'border-top-width',
        right: 'border-right-width',
        bottom: 'border-bottom-width',
        left: 'border-left-width'
    },

    _itemCls: Ext.baseCSSPrefix + 'docked',

    handleItemBorders: function() {
        var me = this,
            owner = me.owner,
            borders, docked,
            lastItems = me.lastDockedItems,
            oldBorders = me.borders,
            currentGeneration = owner.dockedItems.generation,
            noBorderClassesSides = me.noBorderClassesSides,
            borderWidthProps = me.borderWidthProps,
            i, ln, item, dock, side,
            collapsed = me.collapsed;

        if (me.initializedBorders == currentGeneration || (owner.border && !owner.manageBodyBorders)) {
            return;
        }

        me.initializedBorders = currentGeneration;

        // Borders have to be calculated using expanded docked item collection.
        me.collapsed = false;
        me.lastDockedItems = docked = me.getLayoutItems();
        me.collapsed = collapsed;

        borders = { top: [], right: [], bottom: [], left: [] };

        for (i = 0, ln = docked.length; i < ln; i++) {
            item = docked[i];
            dock = item.dock;

            if (item.ignoreBorderManagement) {
                continue;
            }

            if (!borders[dock].satisfied) {
                borders[dock].push(item);
                borders[dock].satisfied = true;
            }

            if (!borders.top.satisfied && dock !== 'bottom') {
                borders.top.push(item);
            }
            if (!borders.right.satisfied && dock !== 'left') {
                borders.right.push(item);
            }
            if (!borders.bottom.satisfied && dock !== 'top') {
                borders.bottom.push(item);
            }
            if (!borders.left.satisfied && dock !== 'right') {
                borders.left.push(item);
            }
        }

        if (lastItems) {
            for (i = 0, ln = lastItems.length; i < ln; i++) {
                item = lastItems[i];
                if (!item.isDestroyed && !item.ignoreBorderManagement && !owner.manageBodyBorders) {
                    item.removeCls(me.noBorderClasses);
                }
            }
        }

        if (oldBorders) {
            for (side in oldBorders) {
                if (owner.manageBodyBorders && oldBorders[side].satisfied) {
                    owner.setBodyStyle(borderWidthProps[side], '');
                }
            }
        }

        for (side in borders) {
            ln = borders[side].length;
            if (!owner.manageBodyBorders) {
                for (i = 0; i < ln; i++) {
                    borders[side][i].addCls(noBorderClassesSides[side]);
                }
                if ((!borders[side].satisfied && !owner.bodyBorder) || owner.bodyBorder === false) {
                    owner.addBodyCls(noBorderClassesSides[side]);
                } else {
                    owner.removeBodyCls(noBorderClassesSides[side]);
                }
            }
            else if (borders[side].satisfied) {
                owner.setBodyStyle(borderWidthProps[side], '1px');
            }
        }

        me.borders = borders;
    },

    beforeLayoutCycle: function (ownerContext) {
        var me = this,
            owner = me.owner,
            shrinkWrap = me.sizeModels.shrinkWrap,
            shrinkWrapDock = owner.shrinkWrapDock,
            collapsedHorz, collapsedVert;

        if (owner.collapsed) {
            if (owner.collapsedVertical()) {
                collapsedVert = true;
                ownerContext.measureDimensions = 1;
            } else {
                collapsedHorz = true;
                ownerContext.measureDimensions = 2;
            }
        }

        ownerContext.collapsedVert = collapsedVert;
        ownerContext.collapsedHorz = collapsedHorz;

        // If we are collapsed, we want to auto-layout using the placeholder/expander
        // instead of the normal items/dockedItems. This must be done here since we could
        // be in a box layout w/stretchmax which sets the width/heightModel to allow it to
        // control the size.
        if (collapsedVert) {
            ownerContext.heightModel = shrinkWrap;
        } else if (collapsedHorz) {
            ownerContext.widthModel = shrinkWrap;
        }
        
        shrinkWrapDock = shrinkWrapDock === true ? 3 : (shrinkWrapDock || 0);
        ownerContext.shrinkWrapDockHeight = (shrinkWrapDock & 1) && ownerContext.heightModel.shrinkWrap;
        ownerContext.shrinkWrapDockWidth = (shrinkWrapDock & 2) && ownerContext.widthModel.shrinkWrap;
    },

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            docked = me.getLayoutItems(),
            layoutContext = ownerContext.context,
            dockedItemCount = docked.length,
            lastCollapsedState = me.lastCollapsedState,
            dockedItems, i, item, itemContext, offsets,
            collapsed, dock;

        me.callParent(arguments);

        // Cache the children as ContextItems (like a Container). Also setup to handle
        // collapsed state:
        collapsed = owner.getCollapsed();
        if (collapsed !== lastCollapsedState && lastCollapsedState !== undefined) {
            // If we are collapsing...
            if (me.owner.collapsed) {
                ownerContext.isCollapsingOrExpanding = 1;
                // Add the collapsed class now, so that collapsed CSS rules are applied before measurements are taken by the layout.
                owner.addClsWithUI(owner.collapsedCls);
            } else {
                ownerContext.isCollapsingOrExpanding = 2;
                // Remove the collapsed class now, before layout calculations are done.
                owner.removeClsWithUI(owner.collapsedCls);
                ownerContext.lastCollapsedState = me.lastCollapsedState;
            }
        }
        me.lastCollapsedState = collapsed;

        ownerContext.dockedItems = dockedItems = [];

        for (i = 0; i < dockedItemCount; i++) {
            item = docked[i];
            if (item.rendered) {
                dock = item.dock;
                itemContext = layoutContext.getCmp(item);
                itemContext.dockedAt = { x: 0, y: 0 };
                itemContext.offsets = offsets = Ext.Element.parseBox(item.offsets || 0);
                itemContext.horizontal = dock == 'top' || dock == 'bottom';
                offsets.width = offsets.left + offsets.right;
                offsets.height = offsets.top + offsets.bottom;
                dockedItems.push(itemContext);
            }
        }

        ownerContext.bodyContext = ownerContext.getEl('body');
    },

    beginLayoutCycle: function(ownerContext) {
        var me = this,
            docked = ownerContext.dockedItems,
            len = docked.length,
            owner = me.owner,
            frameBody = owner.frameBody,
            lastHeightModel = me.lastHeightModel,
            i, item, dock;

        me.callParent(arguments);

        if (me.owner.manageHeight) {
            // Reset in case manageHeight gets turned on during lifecycle.
            // See below for why display could be set to non-default value.
            if (me.lastBodyDisplay) {
                owner.body.dom.style.display = me.lastBodyDisplay = '';
            }
        } else {
            // When manageHeight is false, the body stretches the outer el by using wide margins to force it to
            // accommodate the docked items. When overflow is visible (when panel is resizable and has embedded handles),
            // the body must be inline-block so as not to collapse its margins
            if (me.lastBodyDisplay !== 'inline-block') {
                owner.body.dom.style.display = me.lastBodyDisplay = 'inline-block';
            }

            if (lastHeightModel && lastHeightModel.shrinkWrap &&
                        !ownerContext.heightModel.shrinkWrap) {
                owner.body.dom.style.marginBottom = '';
            }
        }

        if (ownerContext.widthModel.auto) {
            if (ownerContext.widthModel.shrinkWrap) {
                owner.el.setWidth(null);
            }
            owner.body.setWidth(null);
            if (frameBody) {
                frameBody.setWidth(null);
            }
        }
        if (ownerContext.heightModel.auto) {
            owner.body.setHeight(null);
            //owner.el.setHeight(null); Disable this for now
            if (frameBody) {
                frameBody.setHeight(null);
            }
        }

        // Each time we begin (2nd+ would be due to invalidate) we need to publish the
        // known contentWidth/Height if we are collapsed:
        if (ownerContext.collapsedVert) {
            ownerContext.setContentHeight(0);
        } else if (ownerContext.collapsedHorz) {
            ownerContext.setContentWidth(0);
        }

        // dock: 'right' items, when a panel gets narrower get "squished". Moving them to
        // left:0px avoids this!
        for (i = 0; i < len; i++) {
            item = docked[i].target;
            dock = item.dock;

            if (dock == 'right') {
                item.setLocalX(0);
            } else if (dock != 'left') {
                continue;
            }

            // TODO - clear width/height?
        }
    },

    calculate: function (ownerContext) {
        var me = this,
            measure = me.measureAutoDimensions(ownerContext, ownerContext.measureDimensions),
            state = ownerContext.state,
            horzDone = state.horzDone,
            vertDone = state.vertDone,
            bodyContext = ownerContext.bodyContext,
            framing, horz, vert, forward, backward;

        // make sure we can use these value w/o calling methods to get them
        ownerContext.borderInfo  || ownerContext.getBorderInfo();
        ownerContext.paddingInfo || ownerContext.getPaddingInfo();
        ownerContext.frameInfo   || ownerContext.getFrameInfo();
        bodyContext.borderInfo   || bodyContext.getBorderInfo();
        bodyContext.paddingInfo  || bodyContext.getPaddingInfo();

        // On CSS3 browsers, the border and padding frame the outer el. On non-CSS3
        // browsers, the outer el has no border or padding - all that appears on the
        // framing elements as padding and height. In CSS3, the border size effects the
        // origin of the dockedItems but the padding does not (so that must be added in
        // most of the time). In non-CSS3 mode, the dockedItems are outside the framing:
        //
        //      ... top / left dockedItems ...
        //      <div id="...-ml" style="padding-left: border-radius-left;">
        //          <div id="...-mr" style="padding-right: border-radius-right;">
        //              <div id="...-mc" style="padding: extra;">
        //                  ... body ...
        //              </div>
        //          </div>
        //      </div>
        //      ... bottom / right dockedItems ...
        // 
        // For the sake of sanity, we perform all the calculations in CSS3 mode. We test
        // for the presence of non-CSS3 framing only when necessary.
        //
        if (!ownerContext.frameBorder) {
            if (!(framing = ownerContext.framing)) {
                ownerContext.frameBorder = ownerContext.borderInfo;
                ownerContext.framePadding = ownerContext.paddingInfo;
            } else {
                // These values match what they would have been in CSS3.
                ownerContext.frameBorder = framing.border;
                ownerContext.framePadding = framing.padding;
            }
        }

        // Start the axes so they are ready to proceed inwards (fixed-size) or outwards
        // (shrinkWrap) and stash key property names as well:
        horz = !horzDone &&
               me.createAxis(ownerContext, measure.contentWidth, ownerContext.widthModel,
                             me.horzAxisProps, ownerContext.collapsedHorz);
        vert = !vertDone &&
               me.createAxis(ownerContext, measure.contentHeight, ownerContext.heightModel,
                             me.vertAxisProps, ownerContext.collapsedVert);

        // We iterate forward and backward over the dockedItems at the same time based on
        // whether an axis is shrinkWrap or fixed-size. For a fixed-size axis, the outer box
        // axis is allocated to docked items in forward order and is reduced accordingly.
        // To handle a shrinkWrap axis, the box starts at the inner (body) size and is used to
        // size docked items in backwards order. This is because the last docked item shares
        // an edge with the body. The item size is used to adjust the shrinkWrap axis outwards
        // until the first docked item (at the outermost edge) is processed. This backwards
        // order ensures that docked items never get an incorrect size for any dimension.
        for (forward = 0, backward = ownerContext.dockedItems.length; backward--; ++forward) {
            if (horz) {
                me.dockChild(ownerContext, horz, backward, forward);
            }
            if (vert) {
                me.dockChild(ownerContext, vert, backward, forward);
            }
        }
        
        if (horz && me.finishAxis(ownerContext, horz)) {
            state.horzDone = horzDone = horz;
        }
        
        if (vert && me.finishAxis(ownerContext, vert)) {
            state.vertDone = vertDone = vert;
        }

        // Once all items are docked, the final size of the outer panel or inner body can
        // be determined. If we can determine both width and height, we are done.
        if (horzDone && vertDone && me.finishConstraints(ownerContext, horzDone, vertDone)) {
            // Size information is published as we dock items but position is hard to do
            // that way (while avoiding published multiple times) so we publish all the
            // positions at the end.
            me.finishPositions(ownerContext, horzDone, vertDone);
        } else {
            me.done = false;
        }
    },

    /**
     * Creates an axis object given the particulars. The process starts by placing the
     * dockedItems in an idealized box where this method is called once for each side.
     * The ideal box is defined by the CSS3 border and padding values (which account for
     * the influence of border-radius). The origin (the (0,0) point) of the ideal box is
     * the top-left edge of the border or the border-box. Normal dockedItems are placed
     * inside this box at an offset to clear the border and padding and sit properly in
     * the panel next to the body.
     * 
     * The origin has to be started differently if the axis is in shrinkWrap mode. When
     * shrink-wrapping an axis, the axis starts at the edge of the body and expands
     * outwards as items are docked. This means the ideal (0,0) for shrinkWrap is on the
     * top-left corner of the body.
     * 
     * The following diagram illustrates this using the vertical axis.
     * 
     *      +---------------------------+ 10px (border)
     *      |                           |
     *      |  xxxxxxxxxxxxxxxxxxxxxxx  | 5px (padding)   shrinkWrap    other
     *      |  +=====================+  |                   -50         15
     *      |  |  Header             |  | 30px
     *      |  |                     |  |
     *      |  +=====================+  |
     *      |  +---------------------+  |                   -20         45
     *      |  |  tbar               |  | 20 px
     *      |  +---------------------+  |
     *      |  +---------------------+  |                   0           65
     *      |  |  Body               |  | 100px
     *      |  |                     |  |
     *      |  |                     |  |
     *      |  +---------------------+  |
     *      |  +---------------------+  |                   100         165
     *      |  |  bbar               |  | 15px
     *      |  +---------------------+  |
     *      |  xxxxxxxxxxxxxxxxxxxxxxx  | 5px
     *      |                           |
     *      +---------------------------+ 10px
     *
     * These are sufficient to determine sizes of things, but to finalize this process
     * and assign proper positions, the tentative coordinates have to be adjusted by an
     * amount appropriate for the item. Because dockedItems are position:absolute, they
     * sit inside the border and so must be adjusted for padding. The body is different
     * because it is position:relative and so it naturally sits inside the padding and
     * the padding must not be included in its position.
     * 
     * Headers and footers that use `ignoreParentFrame` interact with this process by
     * moving themselves outside the border and padding. So in the above diagram, the
     * Header would move up by 15px and *everything else* would move up by 10px. When
     * shrinkWrap is taking place, the 10px of border on the top is removed from the
     * height as well.
     * 
     * The bbar behaves slightly different when it is `ignoreParentFrame`. In shrinkWrap
     * mode, it alone would move down by the padding and the bottom border would not be
     * included in the height. Otherwise, the bbar would be moved down 15px (since the
     * edge is fixed) and the next dockedItem would be placed at, or the body would be
     * stretched down to, 5px (padding) pixels above the bbar.
     *
     * @private
     */
    createAxis: function (ownerContext, contentSize, sizeModel, axisProps, collapsedAxis) {
        var me = this,
            begin = 0,
            owner = me.owner,
            maxSize = owner[axisProps.maxSize],
            minSize = owner[axisProps.minSize] || 0,
            dockBegin = axisProps.dockBegin,
            dockEnd = axisProps.dockEnd,
            posProp = axisProps.pos,
            sizeProp = axisProps.size,
            hasMaxSize = maxSize != null, // exactly the same as "maxSize !== null && maxSize !== undefined"
            shrinkWrap = sizeModel.shrinkWrap,
            bodyContext, framing, padding, end;

        if (shrinkWrap) {
            // End position before adding docks around the content is content size plus the body borders in this axis.
            // If collapsed in this axis, the body borders will not be shown.
            if (collapsedAxis) {
                end = 0;
            } else {
                bodyContext = ownerContext.bodyContext;
                end = contentSize + bodyContext.borderInfo[sizeProp];
            }
        } else {
            framing = ownerContext.frameBorder;
            padding = ownerContext.framePadding;

            begin = framing[dockBegin] + padding[dockBegin];
            end = ownerContext.getProp(sizeProp) - (framing[dockEnd] + padding[dockEnd]);
        }

        return {
            shrinkWrap: sizeModel.shrinkWrap,
            sizeModel: sizeModel,
            // An axis tracks start and end+1 px positions. eg 0 to 10 for 10px high
            initialBegin: begin,
            begin: begin,
            end: end,
            collapsed: collapsedAxis,
            horizontal: axisProps.horizontal,
            ignoreFrameBegin: null,
            ignoreFrameEnd: null,
            initialSize: end - begin,
            maxChildSize: 0,
            hasMinMaxConstraints: (minSize || hasMaxSize) && sizeModel.shrinkWrap,
            minSize: minSize,
            maxSize: hasMaxSize ? maxSize : 1e9,
            bodyPosProp: me.owner.manageHeight ? posProp : axisProps.marginBegin,
            dockBegin: dockBegin,    // 'left' or 'top'
            dockEnd: dockEnd,        // 'right' or 'end'
            posProp: posProp,        // 'x' or 'y'
            sizeProp: sizeProp,      // 'width' or 'height'
            setSize: axisProps.setSize,
            shrinkWrapDock: ownerContext[axisProps.shrinkWrapDock],
            sizeModelName: axisProps.sizeModel,
            dockedPixelsEnd: 0
        };
    },

    /**
     * Docks a child item on the specified axis. This boils down to determining if the item
     * is docked at the "beginning" of the axis ("left" if horizontal, "top" if vertical),
     * the "end" of the axis ("right" if horizontal, "bottom" if vertical) or stretches
     * along the axis ("top" or "bottom" if horizontal, "left" or "right" if vertical). It
     * also has to differentiate between fixed and shrinkWrap sized dimensions.
     * @private
     */
    dockChild: function (ownerContext, axis, backward, forward) {
        var me = this,
            itemContext = ownerContext.dockedItems[axis.shrinkWrap ? backward : forward],
            item = itemContext.target,
            dock = item.dock, // left/top/right/bottom
            sizeProp = axis.sizeProp,
            pos, size;

        if (item.ignoreParentFrame && ownerContext.isCollapsingOrExpanding) {
            // collapsed window header margins may differ from expanded window header margins
            // so we need to make sure the old cached values are not used in axis calculations
            itemContext.clearMarginCache();
        }

        itemContext.marginInfo || itemContext.getMarginInfo(); // get marginInfo ready

        if (dock == axis.dockBegin) {
            if (axis.shrinkWrap) {
                pos = me.dockOutwardBegin(ownerContext, itemContext, item, axis);
            } else {
                pos = me.dockInwardBegin(ownerContext, itemContext, item, axis);
            }
        } else if (dock == axis.dockEnd) {
            if (axis.shrinkWrap) {
                pos = me.dockOutwardEnd(ownerContext, itemContext, item, axis);
            } else {
                pos = me.dockInwardEnd(ownerContext, itemContext, item, axis);
            }
        } else {
            if (axis.shrinkWrapDock) {
                // we are still shrinkwrapping transversely... so we need to include the
                // size of this item in the max calculation
                size = itemContext.getProp(sizeProp) + itemContext.marginInfo[sizeProp];
                axis.maxChildSize = Math.max(axis.maxChildSize, size);
                pos = 0;
            } else {
                pos = me.dockStretch(ownerContext, itemContext, item, axis);
            }
        }

        itemContext.dockedAt[axis.posProp] = pos;
    },

    /**
     * Docks an item on a fixed-size axis at the "beginning". The "beginning" of the horizontal
     * axis is "left" and the vertical is "top". For a fixed-size axis, the size works from
     * the outer element (the panel) towards the body.
     * @private
     */
    dockInwardBegin: function (ownerContext, itemContext, item, axis) {
        var pos = axis.begin,
            sizeProp = axis.sizeProp,
            ignoreParentFrame = item.ignoreParentFrame,
            delta,
            size, 
            dock;

        if (ignoreParentFrame) {
            axis.ignoreFrameBegin = itemContext;
            dock = item.dock;

            // We need to move everything up by the border-width.
            delta = ownerContext.frameBorder[dock];

            // We need to move the header "up" by the padding as well.
            pos -= delta + ownerContext.framePadding[dock];
        }

        if (!item.overlay) {
            size = itemContext.getProp(sizeProp) + itemContext.marginInfo[sizeProp];
            axis.begin += size;
            if (ignoreParentFrame) {
                axis.begin -= delta;
            }
        }

        return pos;
    },

    /**
     * Docks an item on a fixed-size axis at the "end". The "end" of the horizontal axis is
     * "right" and the vertical is "bottom".
     * @private
     */
    dockInwardEnd: function (ownerContext, itemContext, item, axis) {
        var sizeProp = axis.sizeProp,
            size = itemContext.getProp(sizeProp) + itemContext.marginInfo[sizeProp],
            pos = axis.end - size,
            frameEnd;

        if (!item.overlay) {
            axis.end = pos;
        }

        if (item.ignoreParentFrame) {
            axis.ignoreFrameEnd = itemContext;
            frameEnd = ownerContext.frameBorder[item.dock];
            pos += frameEnd + ownerContext.framePadding[item.dock];
            axis.end += frameEnd;
        }

        return pos;
    },

    /**
     * Docks an item on a shrinkWrap axis at the "beginning". The "beginning" of the horizontal
     * axis is "left" and the vertical is "top". For a shrinkWrap axis, the size works from
     * the body outward to the outermost element (the panel).
     * 
     * During the docking process, coordinates are allowed to be negative. We start with the
     * body at (0,0) so items docked "top" or "left" will simply be assigned negative x/y. In
     * the {@link #finishPositions} method these are corrected and framing is added. This way
     * the correction is applied as a simple translation of delta x/y on all coordinates to
     * bring the origin back to (0,0).
     * @private
     */
    dockOutwardBegin: function (ownerContext, itemContext, item, axis) {
        var pos = axis.begin,
            sizeProp = axis.sizeProp,
            size;

        if (axis.collapsed) {
            axis.ignoreFrameBegin = axis.ignoreFrameEnd = itemContext;
        } else if (item.ignoreParentFrame) {
            axis.ignoreFrameBegin = itemContext;
        }
        // NOTE - When shrinkWrapping an ignoreParentFrame, this must be the last item
        // on the axis. Since that is so, we let finishAxis take this in to account.

        if (!item.overlay) {
            size = itemContext.getProp(sizeProp) + itemContext.marginInfo[sizeProp];
            pos -= size;
            axis.begin = pos;
        }

        return pos;
    },

    /**
     * Docks an item on a shrinkWrap axis at the "end". The "end" of the horizontal axis is
     * "right" and the vertical is "bottom".
     * @private
     */
    dockOutwardEnd: function (ownerContext, itemContext, item, axis) {
        var pos = axis.end,
            sizeProp = axis.sizeProp,
            size;

        size = itemContext.getProp(sizeProp) + itemContext.marginInfo[sizeProp];

        if (axis.collapsed) {
            axis.ignoreFrameBegin = axis.ignoreFrameEnd = itemContext;
        } else if (item.ignoreParentFrame) {
            axis.ignoreFrameEnd = itemContext;
        }
        // NOTE - When shrinkWrapping an ignoreParentFrame, this must be the last item
        // on the axis. Since that is so, we let finishAxis take this in to account.

        if (!item.overlay) {
            axis.end = pos + size;
            axis.dockedPixelsEnd += size;
        }

        return pos;
    },

    /**
     * Docks an item that might stretch across an axis. This is done for dock "top" and
     * "bottom" items on the horizontal axis and dock "left" and "right" on the vertical.
     * @private
     */
    dockStretch: function (ownerContext, itemContext, item, axis) {
        var dock = item.dock, // left/top/right/bottom (also used to index padding/border)
            sizeProp = axis.sizeProp, // 'width' or 'height'
            horizontal = dock == 'top' || dock == 'bottom',
            border = ownerContext.frameBorder,
            offsets = itemContext.offsets,
            padding = ownerContext.framePadding,
            endProp = horizontal ? 'right' : 'bottom',
            startProp = horizontal ? 'left' : 'top',
            pos = axis.begin + offsets[startProp],
            margin, size;

        if (item.stretch !== false) {
            size = axis.end - pos - offsets[endProp];

            if (item.ignoreParentFrame) {
                // In CSS3, the border and padding need to be ignored specifically. In
                // non-CSS3 / framing mode, the border and padding will be 0 **but** the
                // header is not rendered inside the framing elements and so we do not
                // want to do anything anyway!
                pos -= padding[startProp] + border[startProp];
                size += padding[sizeProp] + border[sizeProp];
            }

            margin = itemContext.marginInfo;
            size -= margin[sizeProp];

            itemContext[axis.setSize](size);
        }

        return pos;
    },

    /**
     * Finishes the calculation of an axis by determining its size. In non-shrink-wrap
     * cases, this is also where we set the body size.
     * @private
     */
    finishAxis: function (ownerContext, axis) {
        // If the maxChildSize is NaN it means at some point we tried to determine
        // The size of a docked item but we couldn't, so just jump out straight
        // away before doing any other processing
        if (isNaN(axis.maxChildSize)) {
            return false;
        }
        
        var axisBegin = axis.begin,
            size = axis.end - axisBegin,
            collapsed = axis.collapsed,
            setSizeMethod = axis.setSize,
            beginName = axis.dockBegin, // left or top
            endName = axis.dockEnd, // right or bottom
            padding = ownerContext.framePadding,
            border = ownerContext.frameBorder,
            borderBegin = border[beginName],
            framing = ownerContext.framing,
            framingBegin = framing && framing[beginName],
            // The padding is in play unless the axis is collapsed.
            paddingBegin = collapsed ? 0 : padding[beginName],
            sizeProp = axis.sizeProp,
            ignoreFrameBegin = axis.ignoreFrameBegin,
            ignoreFrameEnd = axis.ignoreFrameEnd,
            bodyContext = ownerContext.bodyContext,
            extraPaddingBegin = Math.max(borderBegin + paddingBegin - framingBegin, 0),
            bodyPos, bodySize, delta, dirty;

        if (axis.shrinkWrap) {
            // Since items docked left/top on a shrinkWrap axis go into negative coordinates,
            // we apply a delta to all coordinates to adjust their relative origin back to
            // a (0,0) inside the border.

            bodySize = axis.initialSize;

            if (framing) {
                // In CSS3 mode, things are compartively simple because "framing" is just
                // borders and padding. In non-CSS3 mode, however, the framing elements
                // are given a size equal to the max of the border-width and border-radius
                // and this pushes the body down accordingly. Further, the dockedItems are
                // all rendered outside the framing elements, so their origin equals the
                // ideal box origin. To translate this to match CSS3, we have to add on
                // the border-top.

                delta = -axisBegin + borderBegin + paddingBegin;
                bodyPos = delta - framingBegin - extraPaddingBegin;
            } else {
                bodyPos = -axisBegin;
                delta = bodyPos + paddingBegin;
            }

            if (!collapsed) {
                size += padding[sizeProp];
            }

            if (ignoreFrameBegin) {
                // When some component ignores the begin framing, we move everything "up"
                // by that amount of framing. We also do not include that amount of the
                // framing in the shrinkWrap size.
                delta -= borderBegin;
                bodyPos -= borderBegin;

                // The item ignoring the framing must also escape the padding. Since the
                // axis.delta includes the padding and we want to apply this to only the
                // one item, we just poke its dockedAt.x/y property so that when we add
                // axis.begin the padding will cancel out. (Note: when we are collapsed
                // paddingBegin will be 0).
                
                ignoreFrameBegin.dockedAt[axis.posProp] -= paddingBegin;
            } else {
                size += borderBegin;
            }

            if (collapsed) {
                // in this case "ignoreFrameBegin === ignoreFrameEnd" so we can take the
                // special cases out of the mix here...
            } else if (ignoreFrameEnd) {
                // When a component ignores the end framing, we simply move it further
                // "down" by the end padding and we do not add the end framing to the
                // shrinkWrap size.
                ignoreFrameEnd.dockedAt[axis.posProp] += padding[endName];
            } else {
                size += border[endName];
            }

            axis.size = size; // we have to wait for min/maxWidth/Height processing

            if (!axis.horizontal && !this.owner.manageHeight) {
                // the height of the bodyEl will give the proper height to the outerEl so
                // we don't need to set heights in the DOM
                dirty = false;
            }
        } else {
            // For a fixed-size axis, we started at the outer box and already have the
            // proper origin... almost... except for the owner's border.
            if (framing) {
                // since dockedItems are rendered outside the framing, they have the
                // proper origin already:
                delta = 0;
                bodyPos = axisBegin - framingBegin - extraPaddingBegin;
            } else {
                delta = -borderBegin;
                bodyPos = axisBegin - paddingBegin - borderBegin;
            }

            // Body size is remaining space between ends of Axis.
            bodySize = size;
        }

        axis.delta = delta;
        bodyContext[setSizeMethod](bodySize, dirty);
        bodyContext.setProp(axis.bodyPosProp, bodyPos);

        return !isNaN(size);
    },
    
    beforeInvalidateShrinkWrapDock: function(itemContext, options){
        var sizeModelName = options.axis.sizeModelName;
        if (!itemContext[sizeModelName].constrainedMin) {
            // if the child hit a min constraint, it needs to be at its configured size, so
            // we leave the sizeModel alone
            itemContext[sizeModelName] = Ext.layout.SizeModel.calculated;
        }
    },
    
    afterInvalidateShrinkWrapDock: function(itemContext, options){
        var axis = options.axis,
            me = options.layout,
            pos;

        if (itemContext[axis.sizeModelName].calculated) {
            pos = me.dockStretch(options.ownerContext, itemContext, itemContext.target, axis);
            itemContext.setProp(axis.posProp, axis.delta + pos);
        }
    },
    
    /**
     * Finishes processing of each axis by applying the min/max size constraints.
     * @private
     */
    finishConstraints: function (ownerContext, horz, vert) {
        var me = this,
            sizeModels = me.sizeModels,
            publishWidth = horz.shrinkWrap,
            publishHeight = vert.shrinkWrap,
            owner = me.owner,
            dirty, height, width, heightModel, widthModel, size, 
            minSize, maxSize, maxChildSize, desiredSize;

        // In these calculations, maxChildSize will only be > 0 in the scenario where
        // we are dock shrink wrapping in that direction, otherwise it is not measured.
        // As such, the additions are done to simplify the logic, even though in most
        // cases, it will have no impact on the overall result.
        
        if (publishWidth) {
            size = horz.size;
            minSize = horz.collapsed ? 0 : horz.minSize;
            maxSize = horz.maxSize;
            maxChildSize = horz.maxChildSize;
            desiredSize = Math.max(size, maxChildSize);

            if (desiredSize > maxSize) {
                widthModel = sizeModels.constrainedMax;
                width = maxSize;
            } else if (desiredSize < minSize) {
                widthModel = sizeModels.constrainedMin;
                width = minSize;
            } else if (size < maxChildSize) {
                widthModel = sizeModels.constrainedDock;
                owner.dockConstrainedWidth = width = maxChildSize;
            } else {
                width = size;
            }
        }

        if (publishHeight) {
            size = vert.size;
            minSize = vert.collapsed ? 0 : vert.minSize;
            maxSize = vert.maxSize;
            maxChildSize = vert.maxChildSize;
            // For vertical docks, their weighting means the height is affected by top/bottom
            // docked items, so we need to subtract them here
            desiredSize = Math.max(size, maxChildSize + size - vert.initialSize);

            if (desiredSize > maxSize) {
                heightModel = sizeModels.constrainedMax;
                height = maxSize;
            } else if (desiredSize < minSize) {
                heightModel = sizeModels.constrainedMin;
                height = minSize;
            } else if (size < maxChildSize) {
                heightModel = sizeModels.constrainedDock;
                owner.dockConstrainedHeight = height = maxChildSize;
            } else {
                if (!ownerContext.collapsedVert && !owner.manageHeight) {
                    // height of the outerEl is provided by the height (including margins)
                    // of the bodyEl, so this value does not need to be written to the DOM
                    dirty = false;

                    // so long as we set top and bottom margins on the bodyEl!
                    ownerContext.bodyContext.setProp('margin-bottom', vert.dockedPixelsEnd);
                }

                height = size;
            }
        }

        // Handle the constraints...

        if (widthModel || heightModel) {
            // See ContextItem#init for an analysis of why this case is special. Basically,
            // in this case, we only know the width and the height could be anything.
            if (widthModel && heightModel &&
                        widthModel.constrainedMax &&  heightModel.constrainedByMin) {
                ownerContext.invalidate({ widthModel: widthModel });
                return false;
            }

            // To process a width or height other than that to which we have shrinkWrapped,
            // we need to invalidate our component and carry forward w/these constrains...
            // unless the ownerLayout wants these results and will invalidate us anyway.
            if (!ownerContext.widthModel.calculatedFromShrinkWrap &&
                        !ownerContext.heightModel.calculatedFromShrinkWrap) {
                // nope, just us to handle the constraint...
                ownerContext.invalidate({ widthModel: widthModel, heightModel: heightModel });
                return false;
            }

            // We have a constraint to deal with, so we just adjust the size models and
            // allow the ownerLayout to invalidate us with its contribution to our final
            // size...
        } else {
            // We're not invalidating, the ownerContext, so if we're shrink wrapping we'll need to
            // tell any docked items to invalidate themselves if necessary.'
            me.invalidateAxes(ownerContext, horz, vert);
            
        }

        // we only publish the sizes if we are not invalidating the result...

        if (publishWidth) {
            ownerContext.setWidth(width);
            if (widthModel) {
                ownerContext.widthModel = widthModel; // important to the ownerLayout
            }
        }
        if (publishHeight) {
            ownerContext.setHeight(height, dirty);
            if (heightModel) {
                ownerContext.heightModel = heightModel; // important to the ownerLayout
            }
        }

        return true;
    },
    
    /**
     * 
     * The default weighting of docked items produces this arrangement:
     * 
     *      +--------------------------------------------+
     *      |                    Top 1                   |
     *      +--------------------------------------------+
     *      |                    Top 2                   |
     *      +-----+-----+--------------------+-----+-----+
     *      |     |     |                    |     |     |
     *      |     |     |                    |     |     |
     *      |     |     |                    |  R  |  R  |
     *      |  L  |  L  |                    |  I  |  I  |
     *      |  E  |  E  |                    |  G  |  G  |
     *      |  F  |  F  |                    |  H  |  H  |
     *      |  T  |  T  |                    |  T  |  T  |
     *      |     |     |                    |     |     |
     *      |  2  |  1  |                    |  1  |  2  |
     *      |     |     |                    |     |     |
     *      |     |     |                    |     |     |
     *      +-----+-----+--------------------+-----+-----+
     *      |                  Bottom 1                  |
     *      +--------------------------------------------+
     *      |                  Bottom 2                  |
     *      +--------------------------------------------+
     * 
     * So when we are shrinkWrapDock on the horizontal, the stretch size for top/bottom
     * docked items is the final axis size. For the vertical axis, however, the stretch
     *
     */ 
    invalidateAxes: function(ownerContext, horz, vert){
        var before = this.beforeInvalidateShrinkWrapDock,
            after = this.afterInvalidateShrinkWrapDock,
            horzSize = horz.end - horz.begin,
            vertSize = vert.initialSize,
            invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize <= horzSize,
            invalidateVert = vert.shrinkWrapDock && vert.maxChildSize <= vertSize,
            dockedItems, len, i, itemContext, itemSize, isHorz, axis, sizeProp;

        if (invalidateHorz || invalidateVert) {
            if (invalidateVert) {
                // For vertical, we need to reset the initial position because they are affected
                // by the horizontally docked items
                vert.begin = vert.initialBegin;
                vert.end = vert.begin + vert.initialSize;
            }
            dockedItems = ownerContext.dockedItems;
            for (i = 0, len = dockedItems.length; i < len; ++i) {
                itemContext = dockedItems[i];
                isHorz = itemContext.horizontal;
                axis = null;
                if (invalidateHorz && isHorz) {
                    sizeProp = horz.sizeProp;
                    itemSize = horzSize;
                    axis = horz;
                } else if (invalidateVert && !isHorz) {
                    sizeProp = vert.sizeProp;
                    itemSize = vertSize;
                    axis = vert;
                }
                
                if (axis) {
                    // subtract any margins
                    itemSize -= itemContext.getMarginInfo()[sizeProp];
                    if (itemSize !== itemContext.props[sizeProp]) {
                        itemContext.invalidate({
                            before: before,
                            after: after,
                            axis: axis,
                            ownerContext: ownerContext,
                            layout: this
                        });
                    }
                }
            }
        }
    },

    /**
     * Finishes the calculation by setting positions on the body and all of the items.
     * @private
     */
    finishPositions: function (ownerContext, horz, vert) {
        var dockedItems = ownerContext.dockedItems,
            length = dockedItems.length,
            deltaX = horz.delta,
            deltaY = vert.delta,
            index, itemContext;

        for (index = 0; index < length; ++index) {
            itemContext = dockedItems[index];

            itemContext.setProp('x', deltaX + itemContext.dockedAt.x);
            itemContext.setProp('y', deltaY + itemContext.dockedAt.y);
        }
    },

    finishedLayout: function(ownerContext) {
        var me = this,
            target = ownerContext.target;

        me.callParent(arguments);

        if (!ownerContext.animatePolicy) {
            if (ownerContext.isCollapsingOrExpanding === 1) {
                target.afterCollapse(false);
            } else if (ownerContext.isCollapsingOrExpanding === 2) {
                target.afterExpand(false);
            }
        }
    },

    getAnimatePolicy: function(ownerContext) {
        var me = this,
            lastCollapsedState, policy;

        if (ownerContext.isCollapsingOrExpanding == 1) {
            lastCollapsedState = me.lastCollapsedState;
        } else if (ownerContext.isCollapsingOrExpanding == 2) {
            lastCollapsedState = ownerContext.lastCollapsedState;
        }

        if (lastCollapsedState == 'left' || lastCollapsedState == 'right') {
            policy = me.horizontalCollapsePolicy;
        } else if (lastCollapsedState == 'top' || lastCollapsedState == 'bottom') {
            policy = me.verticalCollapsePolicy;
        }

        return policy;
    },

    /**
     * Retrieve an ordered and/or filtered array of all docked Components.
     * @param {String} [order='render'] The desired ordering of the items ('render' or 'visual').
     * @param {Boolean} [beforeBody] An optional flag to limit the set of items to only those
     *  before the body (true) or after the body (false). All components are returned by
     *  default.
     * @return {Ext.Component[]} An array of components.
     * @protected
     */
    getDockedItems: function(order, beforeBody) {
        var me = this,
            renderedOnly = (order === 'visual'),
            all = renderedOnly ? Ext.ComponentQuery.query('[rendered]', me.owner.dockedItems.items) : me.owner.dockedItems.items,
            sort = all && all.length && order !== false,
            renderOrder,
            dock, dockedItems, i, isBefore, length;

        if (beforeBody == null) {
            dockedItems = sort && !renderedOnly ? all.slice() : all;
        } else {
            dockedItems = [];

            for (i = 0, length = all.length; i < length; ++i) {
                dock = all[i].dock;
                isBefore = (dock == 'top' || dock == 'left');
                if (beforeBody ? isBefore : !isBefore) {
                    dockedItems.push(all[i]);
                }
            }

            sort = sort && dockedItems.length;
        }

        if (sort) {
            renderOrder = (order = order || 'render') == 'render';
            Ext.Array.sort(dockedItems, function(a, b) {
                var aw,
                    bw;

                // If the two items are on opposite sides of the body, they must not be sorted by any weight value:
                // For rendering purposes, left/top *always* sorts before right/bottom
                if (renderOrder && ((aw = me.owner.dockOrder[a.dock]) !== (bw = me.owner.dockOrder[b.dock]))) {

                    // The two dockOrder values cancel out when two items are on opposite sides.
                    if (!(aw + bw)) {
                        return aw - bw;
                    }
                }

                aw = me.getItemWeight(a, order);
                bw = me.getItemWeight(b, order);
                if ((aw !== undefined) && (bw !== undefined)) {
                    return aw - bw;
                }
                return 0;
            });
        }

        return dockedItems || [];
    },

    getItemWeight: function (item, order) {
        var weight = item.weight || this.owner.defaultDockWeights[item.dock];
        return weight[order] || weight;
    },

    /**
     * @protected
     * Returns an array containing all the **visible** docked items inside this layout's owner Panel
     * @return {Array} An array containing all the **visible** docked items of the Panel
     */
    getLayoutItems : function() {
        var me = this,
            items,
            itemCount,
            item,
            i,
            result;

        if (me.owner.collapsed) {
            result = me.owner.getCollapsedDockedItems();
        } else {
            items = me.getDockedItems('visual');
            itemCount = items.length;
            result = [];
            for (i = 0; i < itemCount; i++) {
                item = items[i];
                if (!item.hidden) {
                    result.push(item);
                }
            }
        }
        return result;
    },

    // Content size includes padding but not borders, so subtract them off
    measureContentWidth: function (ownerContext) {
        var bodyContext = ownerContext.bodyContext;
        return bodyContext.el.getWidth() - bodyContext.getBorderInfo().width;
    },

    measureContentHeight: function (ownerContext) {
        var bodyContext = ownerContext.bodyContext;
        return bodyContext.el.getHeight() - bodyContext.getBorderInfo().height;
    },
    
    redoLayout: function(ownerContext) {
        var me = this,
            owner = me.owner;
        
        // If we are collapsing...
        if (ownerContext.isCollapsingOrExpanding == 1) {
            if (owner.reExpander) {
                owner.reExpander.el.show();
            }
            // Add the collapsed class now, so that collapsed CSS rules are applied before measurements are taken by the layout.
            owner.addClsWithUI(owner.collapsedCls);
            ownerContext.redo(true);
        } else if (ownerContext.isCollapsingOrExpanding == 2) {
            // Remove the collapsed class now, before layout calculations are done.
            owner.removeClsWithUI(owner.collapsedCls);
            ownerContext.bodyContext.redo();
        } 
    },

    // @private override inherited.
    // We need to render in the correct order, top/left before bottom/right
    renderChildren: function() {
        var me = this,
            items = me.getDockedItems(),
            target = me.getRenderTarget();

        me.handleItemBorders();

        me.renderItems(items, target);
    },

    /**
     * @protected
     * Render the top and left docked items before any existing DOM nodes in our render target,
     * and then render the right and bottom docked items after. This is important, for such things
     * as tab stops and ARIA readers, that the DOM nodes are in a meaningful order.
     * Our collection of docked items will already be ordered via Panel.getDockedItems().
     */
    renderItems: function(items, target) {
        var me = this,
            dockedItemCount = items.length,
            itemIndex = 0,
            correctPosition = 0,
            staticNodeCount = 0,
            targetNodes = me.getRenderTarget().dom.childNodes,
            targetChildCount = targetNodes.length,
            i, j, targetChildNode, item;

        // Calculate the number of DOM nodes in our target that are not our docked items
        for (i = 0, j = 0; i < targetChildCount; i++) {
            targetChildNode = targetNodes[i];
            if (targetChildNode.nodeType === 1 && Ext.fly(targetChildNode).hasCls(Ext.baseCSSPrefix + 'resizable-handle')) {
                break;
            }
            for (j = 0; j < dockedItemCount; j++) {
                item = items[j];
                if (item.rendered && item.el.dom === targetChildNode) {
                    break;
                }
            }
            // Walked off the end of the docked items without matching the found child node;
            // Then it's a static node.
            if (j === dockedItemCount) {
                staticNodeCount++;
            }
        }

        // Now we go through our docked items and render/move them
        for (; itemIndex < dockedItemCount; itemIndex++, correctPosition++) {
            item = items[itemIndex];

            // If we're now at the first right/bottom docked item, we jump over the body element.
            //
            // TODO: This is affected if users provide custom weight values to their
            // docked items, which puts it out of (t,l,r,b) order. Avoiding a second
            // sort operation here, for now, in the name of performance. getDockedItems()
            // needs the sort operation not just for this layout-time rendering, but
            // also for getRefItems() to return a logical ordering (FocusManager, CQ, et al).
            if (itemIndex === correctPosition && (item.dock === 'right' || item.dock === 'bottom')) {
                correctPosition += staticNodeCount;
            }

            // Same logic as Layout.renderItems()
            if (item && !item.rendered) {
                me.renderItem(item, target, correctPosition);
            }
            else if (!me.isValidParent(item, target, correctPosition)) {
                me.moveItem(item, target, correctPosition);
            }
        }
    },

    undoLayout: function(ownerContext) {
        var me = this,
            owner = me.owner;
        
        // If we are collapsing...
        if (ownerContext.isCollapsingOrExpanding == 1) {

            // We do not want to see the re-expander header until the final collapse is complete
            if (owner.reExpander) {
                owner.reExpander.el.hide();
            }
            // Add the collapsed class now, so that collapsed CSS rules are applied before measurements are taken by the layout.
            owner.removeClsWithUI(owner.collapsedCls);
            ownerContext.undo(true);
        } else if (ownerContext.isCollapsingOrExpanding == 2) {
            // Remove the collapsed class now, before layout calculations are done.
            owner.addClsWithUI(owner.collapsedCls);
            ownerContext.bodyContext.undo();
        } 
    },

    sizePolicy: {
        nostretch: {
            setsWidth: 0,
            setsHeight: 0
        },

        horz: { // item goes horizontally (top or bottom docked)
            shrinkWrap: {
                // This is how we manage the width of a top/bottom docked item when its
                // shrinkWrapWidth and ours need to be maxed (calculatedFromShrinkWrap)
                setsWidth: 1,
                setsHeight: 0,
                readsWidth: 1
            },
            stretch: {
                setsWidth: 1,
                setsHeight: 0
            }
        },

        vert: { // item goes vertically (left or right docked)
            shrinkWrap: {
                setsWidth: 0,
                setsHeight: 1,
                readsHeight: 1
            },
            stretch: {
                setsWidth: 0,
                setsHeight: 1
            }
        },

        stretchV: {
            setsWidth: 0,
            setsHeight: 1
        },

        // Circular dependency with partial auto-sized panels:
        //
        // If we have an autoHeight docked item being stretched horizontally (top/bottom),
        // that stretching will determine its width and its width must be set before its
        // autoHeight can be determined. If that item is docked in an autoWidth panel, the
        // body will need its height set before it can determine its width, but the height
        // of the docked item is needed to subtract from the panel height in order to set
        // the body height.
        //
        // This same pattern occurs with autoHeight panels with autoWidth docked items on
        // left or right. If the panel is fully auto or fully fixed, these problems don't
        // come up because there is no dependency between the dimensions.
        //
        // Cutting the Gordian Knot: In these cases, we have to allow something to measure
        // itself without full context. This is OK as long as the managed dimension doesn't
        // effect the auto-dimension, which is often the case for things like toolbars. The
        // managed dimension only effects overflow handlers and such and does not change the
        // auto-dimension. To encourage the item to measure itself without waiting for the
        // managed dimension, we have to tell it that the layout will also be reading that
        // dimension. This is similar to how stretchmax works.

        autoStretchH: {
            readsWidth: 1,
            setsWidth: 1,
            setsHeight: 0
        },
        autoStretchV: {
            readsHeight: 1,
            setsWidth: 0,
            setsHeight: 1
        }
    },

    getItemSizePolicy: function (item, ownerSizeModel) {
        var me = this,
            policy = me.sizePolicy,
            shrinkWrapDock = me.owner.shrinkWrapDock,
            dock, vertical;

        if (item.stretch === false) {
            return policy.nostretch;
        }

        dock = item.dock;
        vertical = (dock == 'left' || dock == 'right');

        shrinkWrapDock = shrinkWrapDock === true ? 3 : (shrinkWrapDock || 0);
        if (vertical) {
            policy = policy.vert;
            shrinkWrapDock = shrinkWrapDock & 1;
        } else {
            policy = policy.horz;
            shrinkWrapDock = shrinkWrapDock & 2;
        }

        if (shrinkWrapDock) {
            // Getting the size model is expensive, so only do so if we really need it
            if (!ownerSizeModel) {
                ownerSizeModel = me.owner.getSizeModel();
            }
            if (ownerSizeModel[vertical ? 'height' : 'width'].shrinkWrap) {
                return policy.shrinkWrap;
            }
        }

        return policy.stretch;
    },

    /**
     * @protected
     * We are overriding the Ext.layout.Layout configureItem method to also add a class that
     * indicates the position of the docked item. We use the itemCls (x-docked) as a prefix.
     * An example of a class added to a dock: right item is x-docked-right
     * @param {Ext.Component} item The item we are configuring
     */
    configureItem : function(item, pos) {
        this.callParent(arguments);

        item.addCls(this._itemCls);
        if (!item.ignoreBorderManagement) {
            item.addClsWithUI(this.getDockCls(item.dock));
        }
    },

    /**
     * Get's the css class name for a given dock position.
     * @param {String} dock `top`, `right`, `bottom`, or `left`
     * @return {String}
     * @private 
     */
    getDockCls: function(dock) {
        return 'docked-' + dock;
    },

    afterRemove: function(item) {
        var dom;

        this.callParent(arguments);

        item.removeCls(this._itemCls);
        if (!item.ignoreBorderManagement) {
            item.removeClsWithUI(this.getDockCls(item.dock));
        }

        dom = item.el.dom;

        if (!item.destroying && dom) {
            dom.parentNode.removeChild(dom);
        }
        this.childrenChanged = true;
    },

    /**
     * This object is indexed by a component's `baseCls` to yield another object which
     * is then indexed by the component's `ui` to produce an array of CSS class names.
     * This array is indexed in the same manner as the `noBorderClassTable` and indicates
     * the a particular edge of a docked item or the body element is actually "collapsed"
     * with the component's outer border.
     * @private
     */
    borderCollapseMap: {
        /*
        'x-panel': {
            'default': []
        }
        */
    },

    /**
     * Returns the array of class names to add to a docked item or body element when for
     * the edges that should collapse with the outer component border. Basically, the
     * panel's outer border must look visually like a contiguous border but may need to
     * be realized by using the border of docked items and/or the body. This class name
     * allows the border color and width to be controlled accordingly and distinctly from
     * the border of the docked item or body element when it is not having its border
     * collapsed.
     * @private
     */
    getBorderCollapseTable: function () {
        var me = this,
            map = me.borderCollapseMap,
            owner = me.owner,
            baseCls = owner.baseCls,
            ui = owner.ui,
            table;

        map = map[baseCls] || (map[baseCls] = {});
        table = map[ui];

        if (!table) {
            baseCls += '-' + ui + '-outer-border-';
            map[ui] = table = [
                0,                  // TRBL
                baseCls + 'l',      // 0001 = 1
                baseCls + 'b',      // 0010 = 2
                baseCls + 'bl',     // 0011 = 3
                baseCls + 'r',      // 0100 = 4
                baseCls + 'rl',     // 0101 = 5
                baseCls + 'rb',     // 0110 = 6
                baseCls + 'rbl',    // 0111 = 7
                baseCls + 't',      // 1000 = 8
                baseCls + 'tl',     // 1001 = 9
                baseCls + 'tb',     // 1010 = 10
                baseCls + 'tbl',    // 1011 = 11
                baseCls + 'tr',     // 1100 = 12
                baseCls + 'trl',    // 1101 = 13
                baseCls + 'trb',    // 1110 = 14
                baseCls + 'trbl'    // 1111 = 15
            ];
        }

        return table;
    }
});
