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
 * Base Class for HBoxLayout and VBoxLayout Classes. Generally it should not need to be used directly.
 */
Ext.define('Ext.layout.container.Box', {

    /* Begin Definitions */

    alias: ['layout.box'],
    extend: 'Ext.layout.container.Container',
    alternateClassName: 'Ext.layout.BoxLayout',

    requires: [
        'Ext.layout.container.boxOverflow.None',
        'Ext.layout.container.boxOverflow.Menu',
        'Ext.layout.container.boxOverflow.Scroller',
        'Ext.util.Format',
        'Ext.dd.DragDropManager'
    ],

    /* End Definitions */

    /**
     * @cfg {Object} defaultMargins
     * If the individual contained items do not have a margins property specified or margin specified via CSS, the
     * default margins from this property will be applied to each item.
     *
     * This property may be specified as an object containing margins to apply in the format:
     *
     *     {
     *         top: (top margin),
     *         right: (right margin),
     *         bottom: (bottom margin),
     *         left: (left margin)
     *     }
     *
     * This property may also be specified as a string containing space-separated, numeric margin values. The order of
     * the sides associated with each value matches the way CSS processes margin values:
     *
     *   - If there is only one value, it applies to all sides.
     *   - If there are two values, the top and bottom borders are set to the first value and the right and left are
     *     set to the second.
     *   - If there are three values, the top is set to the first value, the left and right are set to the second,
     *     and the bottom is set to the third.
     *   - If there are four values, they apply to the top, right, bottom, and left, respectively.
     */
    defaultMargins: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },

    /**
     * @cfg {String} padding
     * Sets the padding to be applied to all child items managed by this layout.
     *
     * This property must be specified as a string containing space-separated, numeric padding values. The order of the
     * sides associated with each value matches the way CSS processes padding values:
     *
     *   - If there is only one value, it applies to all sides.
     *   - If there are two values, the top and bottom borders are set to the first value and the right and left are
     *     set to the second.
     *   - If there are three values, the top is set to the first value, the left and right are set to the second,
     *     and the bottom is set to the third.
     *   - If there are four values, they apply to the top, right, bottom, and left, respectively.
     */
    padding: 0,

    /**
     * @cfg {String} pack
     * Controls how the child items of the container are packed together. Acceptable configuration values for this
     * property are:
     *
     *   - **start** - child items are packed together at **left** (HBox) or **top** (VBox) side of container (*default**)
     *   - **center** - child items are packed together at **mid-width** (HBox) or **mid-height** (VBox) of container
     *   - **end** - child items are packed together at **right** (HBox) or **bottom** (VBox) side of container
     */
    pack: 'start',

    /**
     * @cfg {Number} flex
     * This configuration option is to be applied to **child items** of the container managed by this layout. Each child
     * item with a flex property will be flexed (horizontally in `hbox`, vertically in `vbox`) according to each item's
     * **relative** flex value compared to the sum of all items with a flex value specified. Any child items that have
     * either a `flex = 0` or `flex = undefined` will not be 'flexed' (the initial size will not be changed).
     */
    flex: undefined,

    /**
     * @cfg {String/Ext.Component} stretchMaxPartner
     * Allows stretchMax calculation to take into account the max perpendicular size (height for HBox layout and width
     * for VBox layout) of another Box layout when calculating its maximum perpendicular child size.
     *
     * If specified as a string, this may be either a known Container ID, or a ComponentQuery selector which is rooted
     * at this layout's Container (ie, to find a sibling, use `"^>#siblingItemId`).
     */
    stretchMaxPartner: undefined,

    alignRoundingMethod: 'round',

    type: 'box',
    scrollOffset: 0,
    itemCls: Ext.baseCSSPrefix + 'box-item',
    targetCls: Ext.baseCSSPrefix + 'box-layout-ct',
    targetElCls: Ext.baseCSSPrefix + 'box-target',
    innerCls: Ext.baseCSSPrefix + 'box-inner',

    // availableSpaceOffset is used to adjust the availableWidth, typically used
    // to reserve space for a scrollbar
    availableSpaceOffset: 0,

    // whether or not to reserve the availableSpaceOffset in layout calculations
    reserveOffset: true,

    manageMargins: true,
    
    createsInnerCt: true,

    childEls: [
        'innerCt',
        'targetEl'
    ],

    renderTpl: [
        '{%var oc,l=values.$comp.layout,oh=l.overflowHandler;',
        'if (oh.getPrefixConfig!==Ext.emptyFn) {',
            'if(oc=oh.getPrefixConfig())dh.generateMarkup(oc, out)',
        '}%}',
        '<div id="{ownerId}-innerCt" class="{[l.innerCls]} {[oh.getOverflowCls()]}" role="presentation">',
            '<div id="{ownerId}-targetEl" class="{targetElCls}">',
                '{%this.renderBody(out, values)%}',
            '</div>',
        '</div>',
        '{%if (oh.getSuffixConfig!==Ext.emptyFn) {',
            'if(oc=oh.getSuffixConfig())dh.generateMarkup(oc, out)',
        '}%}',
        {
            disableFormats: true,
            definitions: 'var dh=Ext.DomHelper;'
        }
    ],

    constructor: function(config) {
        var me = this,
            type;

        me.callParent(arguments);

        // The sort function needs access to properties in this, so must be bound.
        me.flexSortFn = Ext.Function.bind(me.flexSort, me);

        me.initOverflowHandler();

        type = typeof me.padding;
        if (type == 'string' || type == 'number') {
            me.padding = Ext.util.Format.parseBox(me.padding);
            me.padding.height = me.padding.top  + me.padding.bottom;
            me.padding.width  = me.padding.left + me.padding.right;
        }
    },

    // Matches: `<spaces>digits[.digits]<spaces>%<spaces>`
    // Captures: `digits[.digits]`
    _percentageRe: /^\s*(\d+(?:\.\d*)?)\s*[%]\s*$/,

    getItemSizePolicy: function (item, ownerSizeModel) {
        var me = this,
            policy = me.sizePolicy,
            align = me.align,
            flex = item.flex,
            key = align,
            names = me.names,
            width = item[names.width],
            height = item[names.height],
            percentageRe = me._percentageRe,
            percentageWidth = percentageRe.test(width),
            isStretch = (align == 'stretch'),
            isStretchMax = (align == 'stretchmax'),
            constrain = me.constrainAlign;
            
        // Getting the size model is expensive, so we only want to do so if we really need it
        if (!ownerSizeModel && (isStretch || flex || percentageWidth || (constrain && !isStretchMax))) {
            ownerSizeModel = me.owner.getSizeModel();
        }

        if (isStretch) {
            // If we are height.shrinkWrap, we behave as if we were stretchmax (for more
            // details, see beginLayoutCycle)...
            if (!percentageRe.test(height) && ownerSizeModel[names.height].shrinkWrap) {
                key = 'stretchmax';
                // We leave %age height as stretch since it will not participate in the
                // stretchmax size calculation. This avoid running such a child in its
                // shrinkWrap mode prior to supplying the calculated size.
            }
        } else if (!isStretchMax) {
            if (percentageRe.test(height)) {
                // Height %ages are calculated based on container size, so they are the
                // same as align=stretch for this purpose...
                key = 'stretch';
            } else if (constrain && !ownerSizeModel[names.height].shrinkWrap) {
                // Same functionality as stretchmax, only the max is going to be the size
                // of the container, not the largest item
                key = 'stretchmax';
            } else {
                key = '';
            }
        }

        if (flex || percentageWidth) {
            // If we are width.shrinkWrap, we won't be flexing since that requires a
            // container width...
            if (!ownerSizeModel[names.width].shrinkWrap) {
                policy = policy.flex; // both flex and %age width are calculated
            }
        }

        return policy[key];
    },

    flexSort: function (a, b) {
        // We need to sort the flexed items to ensure that we have
        // the items with max/min width first since when we set the
        // values we may have the value constrained, so we need to
        // react accordingly. Precedence is given from the largest
        // value through to the smallest value
        var maxWidthName = this.names.maxWidth,
            minWidthName = this.names.minWidth,
            infiniteValue = Infinity,
            aTarget = a.target,
            bTarget = b.target,
            result = 0,
            aMin, bMin, aMax, bMax,
            hasMin, hasMax;

        aMax = aTarget[maxWidthName] || infiniteValue;
        bMax = bTarget[maxWidthName] || infiniteValue;
        aMin = aTarget[minWidthName] || 0;
        bMin = bTarget[minWidthName] || 0;
        
        hasMin = isFinite(aMin) || isFinite(bMin);
        hasMax = isFinite(aMax) || isFinite(bMax);

        if (hasMin || hasMax) {
            if (hasMax) {
                result = aMax - bMax;
            }
            
            // If the result is 0, it means either
            // a) hasMax was false
            // b) The max values were the same
            if (result === 0 && hasMin) {
                result = bMin - aMin;
            }
        }
        return result;
    },

    isItemBoxParent: function (itemContext) {
        return true;
    },

    isItemShrinkWrap: function (item) {
        return true;
    },

    roundFlex: function(width) {
        return Math.ceil(width);
    },

    /**
     * @private
     * Called by an owning Panel before the Panel begins its collapse process.
     * Most layouts will not need to override the default Ext.emptyFn implementation.
     */
    beginCollapse: function(child) {
        var me = this;

        if (me.direction === 'vertical' && child.collapsedVertical()) {
            child.collapseMemento.capture(['flex']);
            delete child.flex;
        } else if (me.direction === 'horizontal' && child.collapsedHorizontal()) {
            child.collapseMemento.capture(['flex']);
            delete child.flex;
        }
    },

    /**
     * @private
     * Called by an owning Panel before the Panel begins its expand process.
     * Most layouts will not need to override the default Ext.emptyFn implementation.
     */
    beginExpand: function(child) {

        // Restores the flex if we used to be flexed before
        child.collapseMemento.restore(['flex']);
    },

    beginLayout: function (ownerContext) {
        var me = this,
            owner = me.owner,
            smp = owner.stretchMaxPartner,
            style = me.innerCt.dom.style,
            names = me.names;

        ownerContext.boxNames = names;

        // this must happen before callParent to allow the overflow handler to do its work
        // that can effect the childItems collection...
        me.overflowHandler.beginLayout(ownerContext);

        // get the contextItem for our stretchMax buddy:
        if (typeof smp === 'string') {
            smp = Ext.getCmp(smp) || owner.query(smp)[0];
        }

        ownerContext.stretchMaxPartner = smp && ownerContext.context.getCmp(smp);

        me.callParent(arguments);

        ownerContext.innerCtContext = ownerContext.getEl('innerCt', me);

        // Capture whether the owning Container is scrolling in the parallel direction
        me.scrollParallel = owner.scrollFlags[names.x];

        // Capture whether the owning Container is scrolling in the perpendicular direction
        me.scrollPerpendicular = owner.scrollFlags[names.y];

        // If we *are* scrolling parallel, capture the scroll position of the encapsulating element
        if (me.scrollParallel) {
            me.scrollPos = owner.getTargetEl().dom[names.scrollLeft];
        }

        // Don't allow sizes burned on to the innerCt to influence measurements.
        style.width = '';
        style.height = '';
    },

    beginLayoutCycle: function (ownerContext, firstCycle) {
        var me = this,
            align = me.align,
            names = ownerContext.boxNames,
            pack = me.pack,
            heightModelName = names.heightModel;

        // this must happen before callParent to allow the overflow handler to do its work
        // that can effect the childItems collection...
        me.overflowHandler.beginLayoutCycle(ownerContext, firstCycle);

        me.callParent(arguments);

        // Cache several of our string concat/compare results (since width/heightModel can
        // change if we are invalidated, we cannot do this in beginLayout)

        ownerContext.parallelSizeModel      = ownerContext[names.widthModel];
        ownerContext.perpendicularSizeModel = ownerContext[heightModelName];

        ownerContext.boxOptions = {
            align: align = {
                stretch:    align == 'stretch',
                stretchmax: align == 'stretchmax',
                center:     align == names.center,
                bottom:     align == names.afterY
            },
            pack: pack = {
                center: pack == 'center',
                end:    pack == 'end'
            }
        };

        // Consider an hbox w/stretch which means "assign all items the container's height".
        // The spirit of this request is make all items the same height, but when shrinkWrap
        // height is also requested, the height of the tallest item determines the height.
        // This is exactly what the stretchmax option does, so we jiggle the flags here to
        // act as if stretchmax were requested.

        if (align.stretch && ownerContext.perpendicularSizeModel.shrinkWrap) {
            align.stretchmax = true;
            align.stretch = false;
        }

        // This is handy for knowing that we might need to apply height %ages
        align.nostretch = !(align.stretch || align.stretchmax);

        // In our example hbox, packing items to the right (end) or center can only work if
        // there is a container width. So, if we are shrinkWrap, we just turn off the pack
        // options for the run.

        if (ownerContext.parallelSizeModel.shrinkWrap) {
            pack.center = pack.end = false;
        }

        me.cacheFlexes(ownerContext);

        // We set the width of the target el equal to the width of the innerCt
        // when the layout cycle is finished, so we need to clear the width here
        // to prevent the children from being crushed.
        // IE needs it because of its scrollIntoView bug: https://sencha.jira.com/browse/EXTJSIV-6520
        // Webkit needs it because of its mouse drag bug: https://sencha.jira.com/browse/EXTJSIV-5962
        // FF needs it because of a vertical tab bug: https://sencha.jira.com/browse/EXTJSIV-8614
        me.targetEl.setWidth(20000);
    },

    /**
     * This method is called to (re)cache our understanding of flexes. This happens during beginLayout and may need to
     * be called again if the flexes are changed during the layout (e.g., like ColumnLayout).
     * @param {Object} ownerContext
     * @protected
     */
    cacheFlexes: function (ownerContext) {
        var me = this,
            names = ownerContext.boxNames,
            widthModelName = names.widthModel,
            heightModelName = names.heightModel,
            nostretch = ownerContext.boxOptions.align.nostretch,
            totalFlex = 0,
            childItems = ownerContext.childItems,
            i = childItems.length,
            flexedItems = [],
            minWidth = 0,
            minWidthName = names.minWidth,
            percentageRe = me._percentageRe,
            percentageWidths = 0,
            percentageHeights = 0,
            child, childContext, flex, match;

        while (i--) {
            childContext = childItems[i];
            child = childContext.target;

            // check widthModel to see if we are the sizing layout. If so, copy the flex
            // from the item to the contextItem and add it to totalFlex
            //
            if (childContext[widthModelName].calculated) {
                childContext.flex = flex = child.flex;
                if (flex) {
                    totalFlex += flex;
                    flexedItems.push(childContext);
                    minWidth += child[minWidthName] || 0;
                } else { // a %age width...
                    match = percentageRe.exec(child[names.width]);
                    childContext.percentageParallel = parseFloat(match[1]) / 100;
                    ++percentageWidths;
                }
            }
            // the above means that "childContext.flex" is properly truthy/falsy, which is
            // often times quite convenient...

            if (nostretch && childContext[heightModelName].calculated) {
                // the only reason we would be calculated height in this case is due to a
                // height %age...
                match = percentageRe.exec(child[names.height]);
                childContext.percentagePerpendicular = parseFloat(match[1]) / 100;
                ++percentageHeights;
            }
        }

        ownerContext.flexedItems = flexedItems;
        ownerContext.flexedMinSize = minWidth;
        ownerContext.totalFlex = totalFlex;
        ownerContext.percentageWidths = percentageWidths;
        ownerContext.percentageHeights = percentageHeights;

        // The flexed boxes need to be sorted in ascending order of maxSize to work properly
        // so that unallocated space caused by maxWidth being less than flexed width can be
        // reallocated to subsequent flexed boxes.
        Ext.Array.sort(flexedItems, me.flexSortFn);
    },

    calculate: function(ownerContext) {
        var me = this,
            targetSize = me.getContainerSize(ownerContext),
            names = ownerContext.boxNames,
            state = ownerContext.state,
            plan = state.boxPlan || (state.boxPlan = {}),
            targetContext = ownerContext.targetContext;

        plan.targetSize = targetSize;

        // If we are not widthModel.shrinkWrap, we need the width before we can lay out boxes:
        if (!ownerContext.parallelSizeModel.shrinkWrap && !targetSize[names.gotWidth]) {
            me.done = false;
            return;
        }

        if (!state.parallelDone) {
            state.parallelDone = me.calculateParallel(ownerContext, names, plan);
        }

        if (!state.perpendicularDone) {
            state.perpendicularDone = me.calculatePerpendicular(ownerContext, names, plan);
        }

        if (state.parallelDone && state.perpendicularDone) {
            // Fix for left and right docked Components in a dock component layout. This is for docked Headers and docked Toolbars.
            // Older Microsoft browsers do not size a position:absolute element's width to match its content.
            // So in this case, in the publishInnerCtSize method we may need to adjust the size of the owning Container's element explicitly based upon
            // the discovered max width. So here we put a calculatedWidth property in the metadata to facilitate this.
            if (me.owner.dock && (Ext.isIE7m || Ext.isIEQuirks) && !me.owner.width && !me.horizontal) {
                plan.isIEVerticalDock = true;
                plan.calculatedWidth = plan.maxSize + ownerContext.getPaddingInfo().width + ownerContext.getFrameInfo().width;
                if (targetContext !== ownerContext) {
                    // targetContext can have additional padding, e.g. vertically
                    // oriented toolbar body element has a few px of left or right padding
                    // to make room for the tab strip.
                    plan.calculatedWidth += targetContext.getPaddingInfo().width;
                }
            }

            me.publishInnerCtSize(ownerContext, me.reserveOffset ? me.availableSpaceOffset : 0);

            // Calculate stretchmax only if there is >1 child item, or there is a stretchMaxPartner wanting the info
            if (me.done && (ownerContext.childItems.length > 1 || ownerContext.stretchMaxPartner) && ownerContext.boxOptions.align.stretchmax && !state.stretchMaxDone) {
                me.calculateStretchMax(ownerContext, names, plan);
                state.stretchMaxDone = true;
            }
            me.overflowHandler.calculate(ownerContext);
        } else {
            me.done = false;
        }
    },

    calculateParallel: function(ownerContext, names, plan) {
        var me = this,
            widthName = names.width,
            childItems = ownerContext.childItems,
            beforeXName = names.beforeX,
            afterXName = names.afterX,
            setWidthName = names.setWidth,
            childItemsLength = childItems.length,
            flexedItems = ownerContext.flexedItems,
            flexedItemsLength = flexedItems.length,
            pack = ownerContext.boxOptions.pack,
            padding = me.padding,
            containerWidth = plan.targetSize[widthName],
            totalMargin = 0,
            left = padding[beforeXName],
            nonFlexWidth = left + padding[afterXName] + me.scrollOffset +
                                    (me.reserveOffset ? me.availableSpaceOffset : 0),
            scrollbarWidth = Ext.getScrollbarSize()[names.width],
            i, childMargins, remainingWidth, remainingFlex, childContext, flex, flexedWidth,
            contentWidth, mayNeedScrollbarAdjust, childWidth, percentageSpace;

        // We may need to add scrollbar size to parallel size if
        //     Scrollbars take up space
        //     and we are scrolling in the perpendicular direction
        //     and shrinkWrapping in the parallel direction,
        //     and NOT stretching perpendicular dimensions to fit
        //     and NOT shrinkWrapping in the perpendicular direction
        if (scrollbarWidth &&
            me.scrollPerpendicular &&
            ownerContext.parallelSizeModel.shrinkWrap &&
            !ownerContext.boxOptions.align.stretch &&
            !ownerContext.perpendicularSizeModel.shrinkWrap) {

            // If its possible that we may need to add scrollbar size to the parallel size
            // then we need to wait until the perpendicular size has been determined,
            // so that we know if there is a scrollbar.
            if (!ownerContext.state.perpendicularDone) {
                return false;
            }
            mayNeedScrollbarAdjust = true;
        }

        // Gather the total size taken up by non-flexed items:
        for (i = 0; i < childItemsLength; ++i) {
            childContext = childItems[i];
            childMargins = childContext.marginInfo || childContext.getMarginInfo();

            totalMargin += childMargins[widthName];

            if (!childContext[names.widthModel].calculated) {
                childWidth = childContext.getProp(widthName);
                nonFlexWidth += childWidth; // min/maxWidth safe
                if (isNaN(nonFlexWidth)) {
                    return false;
                }
            }
        }

        nonFlexWidth += totalMargin;
        if (ownerContext.percentageWidths) {
            percentageSpace = containerWidth - totalMargin;
            if (isNaN(percentageSpace)) {
                return false;
            }

            for (i = 0; i < childItemsLength; ++i) {
                childContext = childItems[i];
                if (childContext.percentageParallel) {
                    childWidth = Math.ceil(percentageSpace * childContext.percentageParallel);
                    childWidth = childContext.setWidth(childWidth);
                    nonFlexWidth += childWidth;
                }
            }
        }

        // if we get here, we have all the childWidths for non-flexed items...

        if (ownerContext.parallelSizeModel.shrinkWrap) {
            plan.availableSpace = 0;
            plan.tooNarrow = false;
        } else {
            plan.availableSpace = containerWidth - nonFlexWidth;

            // If we're going to need space for a parallel scrollbar, then we need to redo the perpendicular measurements
            plan.tooNarrow = plan.availableSpace < ownerContext.flexedMinSize;
            if (plan.tooNarrow && Ext.getScrollbarSize()[names.height] && me.scrollParallel && ownerContext.state.perpendicularDone) {
                ownerContext.state.perpendicularDone = false;
                for (i = 0; i < childItemsLength; ++i) {
                    childItems[i].invalidate();
                }
            }
        }

        contentWidth = nonFlexWidth;
        remainingWidth = plan.availableSpace;
        remainingFlex = ownerContext.totalFlex;

        // Calculate flexed item sizes:
        for (i = 0; i < flexedItemsLength; i++) {
            childContext = flexedItems[i];
            flex         = childContext.flex;
            flexedWidth  = me.roundFlex((flex / remainingFlex) * remainingWidth);
            flexedWidth  = childContext[setWidthName](flexedWidth); // constrained

            // due to minWidth constraints, it may be that flexedWidth > remainingWidth

            contentWidth   += flexedWidth;
            // Remaining space has already had margins subtracted, so just subtract size
            remainingWidth  = Math.max(0, remainingWidth - flexedWidth); // no negatives!
            remainingFlex  -= flex;
        }

        if (pack.center) {
            left += remainingWidth / 2;

            // If content is too wide to pack to center, do not allow the centering calculation to place it off the left edge.
            if (left < 0) {
                left = 0;
            }
        } else if (pack.end) {
            left += remainingWidth;
        }

        // Assign parallel position for the boxes:
        for (i = 0; i < childItemsLength; ++i) {
            childContext = childItems[i];
            childMargins = childContext.marginInfo; // already cached by first loop

            left += childMargins[beforeXName];

            childContext.setProp(names.x, left);

            // We can read directly from "props.width" because we have already properly
            // requested it in the calculation of nonFlexedWidths or we calculated it.
            // We cannot call getProp because that would be inappropriate for flexed items
            // and we don't need any extra function call overhead:
            left += childMargins[afterXName] + childContext.props[widthName];
        }

        contentWidth += ownerContext.targetContext.getPaddingInfo()[widthName];

        // Stash the contentWidth on the state so that it can always be accessed later in the calculation
        ownerContext.state.contentWidth = contentWidth; 

        // if there is perpendicular overflow, the published parallel content size includes
        // the size of the perpendicular scrollbar.
        if (mayNeedScrollbarAdjust &&
            (ownerContext.peek(names.contentHeight) > plan.targetSize[names.height])) {
            contentWidth += scrollbarWidth;
            ownerContext[names.hasOverflowY] = true;

            // tell the component layout to set the parallel size in the dom
            ownerContext.target.componentLayout[names.setWidthInDom] = true;

            // IE8 in what passes for "strict" mode will not create a scrollbar if 
            // there is just the *exactly correct* spare space created for it. We
            // have to force that to happen once all the styles have been flushed
            // to the DOM (see completeLayout):
            ownerContext[names.invalidateScrollY] = Ext.isStrict && Ext.isIE8;
        }
        ownerContext[names.setContentWidth](contentWidth);

        return true;
    },

    calculatePerpendicular: function(ownerContext, names, plan) {
        var me = this,
            heightShrinkWrap = ownerContext.perpendicularSizeModel.shrinkWrap,
            targetSize = plan.targetSize,
            childItems = ownerContext.childItems,
            childItemsLength = childItems.length,
            mmax = Math.max,
            heightName = names.height,
            setHeightName = names.setHeight,
            beforeYName = names.beforeY,
            topPositionName = names.y,
            padding = me.padding,
            top = padding[beforeYName],
            availHeight = targetSize[heightName] - top - padding[names.afterY],
            align = ownerContext.boxOptions.align,
            isStretch    = align.stretch, // never true if heightShrinkWrap (see beginLayoutCycle)
            isStretchMax = align.stretchmax,
            isCenter     = align.center,
            isBottom     = align.bottom,
            constrain    = me.constrainAlign,
            maxHeight = 0,
            hasPercentageSizes = 0,
            onBeforeInvalidateChild = me.onBeforeConstrainInvalidateChild,
            onAfterInvalidateChild = me.onAfterConstrainInvalidateChild,
            scrollbarHeight = Ext.getScrollbarSize().height,
            childTop, i, childHeight, childMargins, diff, height, childContext,
            stretchMaxPartner, stretchMaxChildren, shrinkWrapParallelOverflow, 
            percentagePerpendicular;

        if (isStretch || ((isCenter || isBottom) && !heightShrinkWrap)) {
            if (isNaN(availHeight)) {
                return false;
            }
        }

        // If the intention is to horizontally scroll child components, but the container is too narrow,
        // then:
        //     if we are shrinkwrapping height:
        //         Set a flag because we are going to expand the height taken by the perpendicular dimension to accommodate the scrollbar
        //     else
        //         We must allow for the parallel scrollbar to intrude into the height
        if (me.scrollParallel && plan.tooNarrow) {
            if (heightShrinkWrap) {
                shrinkWrapParallelOverflow = true;
            } else {
                availHeight -= scrollbarHeight;
                plan.targetSize[heightName] -= scrollbarHeight;
            }
        }

        if (isStretch) {
            height = availHeight; // never heightShrinkWrap...
        } else {
            for (i = 0; i < childItemsLength; i++) {
                childContext = childItems[i];
                childMargins = (childContext.marginInfo || childContext.getMarginInfo())[heightName];

                if (!(percentagePerpendicular = childContext.percentagePerpendicular)) {
                    childHeight = childContext.getProp(heightName);
                } else {
                    ++hasPercentageSizes;
                    if (heightShrinkWrap) {
                        // height %age items cannot contribute to maxHeight... they are going
                        // to be a %age of that maxHeight!
                        continue;
                    } else {
                        childHeight = percentagePerpendicular * availHeight - childMargins;
                        childHeight = childContext[names.setHeight](childHeight);
                    }
                }
                
                // Summary:
                // 1) Not shrink wrapping height, so the height is not determined by the children
                // 2) Constrain is set
                // 3) The child item is shrink wrapping
                // 4) It execeeds the max
                if (!heightShrinkWrap && constrain && childContext[names.heightModel].shrinkWrap && childHeight > availHeight) {
                    childContext.invalidate({
                        before: onBeforeInvalidateChild,
                        after: onAfterInvalidateChild,
                        layout: me,
                        childHeight: availHeight,
                        names: names
                    });
                    
                    // By invalidating the height, it could mean the width can change, so we need
                    // to recalculate in the parallel direction.
                    ownerContext.state.parallelDone = false; 
                }

                // Max perpendicular measurement (used for stretchmax) must take the min perpendicular size of each child into account in case any fall short.
                if (isNaN(maxHeight = mmax(maxHeight, childHeight + childMargins,
                                           childContext.target[names.minHeight] || 0))) {
                    return false; // heightShrinkWrap || isCenter || isStretchMax ??
                }
            }

            // If there is going to be a parallel scrollbar maxHeight must include it to the outside world.
            // ie: a stretchmaxPartner, and the setContentHeight
            if (shrinkWrapParallelOverflow) {
                maxHeight += scrollbarHeight;
                ownerContext[names.hasOverflowX] = true;

                // tell the component layout to set the perpendicular size in the dom
                ownerContext.target.componentLayout[names.setHeightInDom] = true;

                // IE8 in what passes for "strict" mode will not create a scrollbar if 
                // there is just the *exactly correct* spare space created for it. We
                // have to force that to happen once all the styles have been flushed
                // to the DOM (see completeLayout):
                ownerContext[names.invalidateScrollX] = Ext.isStrict && Ext.isIE8;
            }

            // If we are associated with another box layout, grab its maxChildHeight
            // This must happen before we calculate and publish our contentHeight
            stretchMaxPartner = ownerContext.stretchMaxPartner;
            if (stretchMaxPartner) {
                // Publish maxChildHeight as soon as it has been calculated for our partner:
                ownerContext.setProp('maxChildHeight', maxHeight);
                stretchMaxChildren = stretchMaxPartner.childItems;
                // Only wait for maxChildHeight if our partner has visible items:
                if (stretchMaxChildren && stretchMaxChildren.length) {
                    maxHeight = mmax(maxHeight, stretchMaxPartner.getProp('maxChildHeight'));
                    if (isNaN(maxHeight)) {
                        return false;
                    }
                }
            }

            ownerContext[names.setContentHeight](maxHeight + me.padding[heightName] +
                    ownerContext.targetContext.getPaddingInfo()[heightName]);

            // We have to publish the contentHeight with the additional scrollbarHeight
            // to encourage our container to accomodate it, but we must remove the height
            // of the scrollbar as we go to sizing or centering the children.
            if (shrinkWrapParallelOverflow) {
                maxHeight -= scrollbarHeight;
            }
            plan.maxSize = maxHeight;

            if (isStretchMax) {
                height = maxHeight;
            } else if (isCenter || isBottom || hasPercentageSizes) {
                if (constrain) {
                    height = heightShrinkWrap ? maxHeight : availHeight;
                } else {
                    height = heightShrinkWrap ? maxHeight : mmax(availHeight, maxHeight);
                }

                // When calculating a centered position within the content box of the innerCt,
                // the width of the borders must be subtracted from the size to yield the
                // space available to center within. The publishInnerCtSize method explicitly
                // adds the border widths to the set size of the innerCt.
                height -= ownerContext.innerCtContext.getBorderInfo()[heightName];
            }
        }

        for (i = 0; i < childItemsLength; i++) {
            childContext = childItems[i];
            childMargins = childContext.marginInfo || childContext.getMarginInfo();

            childTop = top + childMargins[beforeYName];

            if (isStretch) {
                childContext[setHeightName](height - childMargins[heightName]);
            } else {
                percentagePerpendicular = childContext.percentagePerpendicular;
                if (heightShrinkWrap && percentagePerpendicular) {
                    childMargins = childContext.marginInfo || childContext.getMarginInfo();
                    childHeight = percentagePerpendicular * height - childMargins[heightName];
                    childHeight = childContext.setHeight(childHeight);
                }

                if (isCenter) {
                    diff = height - childContext.props[heightName];
                    if (diff > 0) {
                        childTop = top + Math[me.alignRoundingMethod](diff / 2);
                    }
                } else if (isBottom) {
                    childTop = mmax(0, height - childTop - childContext.props[heightName]);
                }
            }

            childContext.setProp(topPositionName, childTop);
        }

        return true;
    },
    
    onBeforeConstrainInvalidateChild: function(childContext, options){
        // NOTE: No "this" pointer in here...
        var heightModelName = options.names.heightModel;
        if (!childContext[heightModelName].constrainedMin) {
            // if the child hit a min constraint, it needs to be at its configured size, so
            // we leave the sizeModel alone
            childContext[heightModelName] = Ext.layout.SizeModel.calculated;
        }
    },
    
    onAfterConstrainInvalidateChild: function(childContext, options){
         // NOTE: No "this" pointer in here...
        var names = options.names;

        // We use 0 here because we know the size exceeds the available size.
        // This was chosen on purpose, even for align: 'bottom', because it doesn't
        // make practical sense to place the item at the bottom and then have it overflow
        // over the top of the container, since it's not possible to scroll to it. As such,
        // we always put the component at the top to follow normal document flow.
        childContext.setProp(names.beforeY, 0);
        if (childContext[names.heightModel].calculated) {
            childContext[names.setHeight](options.childHeight);
        }
    },

    calculateStretchMax: function (ownerContext, names, plan) {
        var me = this,
            heightName = names.height,
            widthName = names.width,
            childItems = ownerContext.childItems,
            length = childItems.length,
            height = plan.maxSize,
            onBeforeStretchMaxInvalidateChild = me.onBeforeStretchMaxInvalidateChild,
            onAfterStretchMaxInvalidateChild = me.onAfterStretchMaxInvalidateChild,
            childContext, props, i, childHeight;

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];

            props = childContext.props;
            childHeight = height - childContext.getMarginInfo()[heightName];

            if (childHeight != props[heightName] ||   // if (wrong height ...
                childContext[names.heightModel].constrained) { // ...or needs invalidation)
                // When we invalidate a child, since we won't be around to size or position
                // it, we include an after callback that will be run after the invalidate
                // that will (re)do that work. The good news here is that we can read the
                // results of all that from the childContext props.
                //
                // We also include a before callback to change the sizeModel to calculated
                // prior to the layout being invoked.
                childContext.invalidate({
                    before: onBeforeStretchMaxInvalidateChild,
                    after: onAfterStretchMaxInvalidateChild,
                    layout: me,
                    // passing this data avoids a 'scope' and its Function.bind
                    childWidth: props[widthName],
                    // subtract margins from the maximum value
                    childHeight: childHeight,
                    childX: props.x,
                    childY: props.y,
                    names: names
                });
            }
        }
    },
    
    onBeforeStretchMaxInvalidateChild: function (childContext, options) {
        // NOTE: No "this" pointer in here...
        var heightModelName = options.names.heightModel;

        // Change the childItem to calculated (i.e., "set by ownerCt"). The component layout
        // of the child can course-correct (like dock layout does for a collapsed panel),
        // so we must make these changes here before that layout's beginLayoutCycle is
        // called.
        if (!childContext[heightModelName].constrainedMax) {
            // if the child hit a max constraint, it needs to be at its configured size, so
            // we leave the sizeModel alone...
            childContext[heightModelName] = Ext.layout.SizeModel.calculated;
        }
    },

    onAfterStretchMaxInvalidateChild: function (childContext, options) {
        // NOTE: No "this" pointer in here...
        var names = options.names,
            childHeight = options.childHeight,
            childWidth = options.childWidth;

        childContext.setProp('x', options.childX);
        childContext.setProp('y', options.childY);

        if (childContext[names.heightModel].calculated) {
            // We need to respect a child that is still not calculated (such as a collapsed
            // panel)...
            childContext[names.setHeight](childHeight);
        }

        if (childContext[names.widthModel].calculated) {
            childContext[names.setWidth](childWidth);
        }
    },

    completeLayout: function(ownerContext) {
        var me = this,
            names = ownerContext.boxNames,
            invalidateScrollX = ownerContext.invalidateScrollX,
            invalidateScrollY = ownerContext.invalidateScrollY,
            dom, el, overflowX, overflowY, styles;

        me.overflowHandler.completeLayout(ownerContext);

        if (invalidateScrollX || invalidateScrollY) {
            el = me.getTarget();
            dom = el.dom;
            styles = dom.style;

            if (invalidateScrollX) {
                // get computed style to see if we are 'auto'
                overflowX = el.getStyle('overflowX');
                if (overflowX == 'auto') {
                    // capture the inline style (if any) so we can restore it later:
                    overflowX = styles.overflowX;
                    styles.overflowX = 'scroll'; // force the scrollbar to appear
                } else {
                    invalidateScrollX = false; // no work really since not 'auto'
                }
            }

            if (invalidateScrollY) {
                // get computed style to see if we are 'auto'
                overflowY = el.getStyle('overflowY');
                if (overflowY == 'auto') {
                    // capture the inline style (if any) so we can restore it later:
                    overflowY = styles.overflowY;
                    styles.overflowY = 'scroll'; // force the scrollbar to appear
                } else {
                    invalidateScrollY = false; // no work really since not 'auto'
                }
            }

            if (invalidateScrollX || invalidateScrollY) { // if (some form of 'auto' in play)
                // force a reflow...
                dom.scrollWidth;

                if (invalidateScrollX) {
                    styles.overflowX = overflowX; // restore inline style
                }
                if (invalidateScrollY) {
                    styles.overflowY = overflowY; // restore inline style
                }
            }
        }

        // If we are scrolling parallel, restore the saved scroll position
        if (me.scrollParallel) {
            me.owner.getTargetEl().dom[names.scrollLeft] = me.scrollPos;
        }
    },

    finishedLayout: function(ownerContext) {
        this.overflowHandler.finishedLayout(ownerContext);
        this.callParent(arguments);

        // Fix for an obscure webkit bug (EXTJSIV-5962) caused by the targetEl's 20000px
        // width.  We set a very large width on the targetEl at the beginning of the 
        // layout cycle to prevent any "crushing" effect on the child items, however
        // in some cases the very large width makes it possible to scroll the innerCt
        // by dragging on certain child elements. To prevent this from happening we ensure
        // that the targetEl's width is the same as the innerCt.
        // IE needs it because of its scrollIntoView bug: https://sencha.jira.com/browse/EXTJSIV-6520
        // Webkit needs it because of its mouse drag bug: https://sencha.jira.com/browse/EXTJSIV-5962
        // FF needs it because of a vertical tab bug: https://sencha.jira.com/browse/EXTJSIV-8614
        this.targetEl.setWidth(ownerContext.innerCtContext.props.width);
    },

    publishInnerCtSize: function(ownerContext, reservedSpace) {
        var me = this,
            names = ownerContext.boxNames,
            heightName = names.height,
            widthName = names.width,
            align = ownerContext.boxOptions.align,
            dock = me.owner.dock,
            padding = me.padding,
            plan = ownerContext.state.boxPlan,
            targetSize = plan.targetSize,
            height = targetSize[heightName],
            innerCtContext = ownerContext.innerCtContext,
            innerCtWidth = (ownerContext.parallelSizeModel.shrinkWrap || (plan.tooNarrow && me.scrollParallel)
                    ? ownerContext.state.contentWidth - ownerContext.targetContext.getPaddingInfo()[widthName]
                    : targetSize[widthName]) - (reservedSpace || 0),
            innerCtHeight;

        if (align.stretch) {
            innerCtHeight = height;
        } else {
            innerCtHeight = plan.maxSize + padding[names.beforeY] + padding[names.afterY] + innerCtContext.getBorderInfo()[heightName];

            if (!ownerContext.perpendicularSizeModel.shrinkWrap && (align.center || align.bottom)) {
                innerCtHeight = Math.max(height, innerCtHeight);
            }
        }

        innerCtContext[names.setWidth](innerCtWidth);
        innerCtContext[names.setHeight](innerCtHeight);

        // If unable to publish both dimensions, this layout needs to run again
        if (isNaN(innerCtWidth + innerCtHeight)) {
            me.done = false;
        }

        // If a calculated width has been found (this only happens for widthModel.shrinkWrap
        // vertical docked Components in old Microsoft browsers) then, if the Component has
        // not assumed the size of its content, set it to do so.
        //
        // We MUST pass the dirty flag to get that into the DOM, and because we are a Container
        // layout, and not really supposed to perform sizing, we must also use the force flag.
        if (plan.calculatedWidth && (dock == 'left' || dock == 'right')) {
            // TODO: setting the owner size should be the job of the component layout.
            ownerContext.setWidth(plan.calculatedWidth, true, true);
        }
    },

    onRemove: function(comp){
        var me = this;
        me.callParent(arguments);
        if (me.overflowHandler) {
            me.overflowHandler.onRemove(comp);
        }
        if (comp.layoutMarginCap == me.id) {
            delete comp.layoutMarginCap;
        }
    },

    /**
     * @private
     */
    initOverflowHandler: function() {
        var me = this,
            handler = me.overflowHandler,
            handlerType,
            constructor;

        if (typeof handler == 'string') {
            handler = {
                type: handler
            };
        }

        handlerType = 'None';
        if (handler && handler.type !== undefined) {
            handlerType = handler.type;
        }

        constructor = Ext.layout.container.boxOverflow[handlerType];
        if (constructor[me.type]) {
            constructor = constructor[me.type];
        }

        me.overflowHandler = Ext.create('Ext.layout.container.boxOverflow.' + handlerType, me, handler);
    },

    // Overridden method from Ext.layout.container.Container.
    // Used in the beforeLayout method to render all items into.
    getRenderTarget: function() {
        return this.targetEl;
    },

    // Overridden method from Ext.layout.container.Container.
    // Used by Container classes to insert special DOM elements which must exist in addition to the child components
    getElementTarget: function() {
        return this.innerCt;
    },

    //<debug>
    calculateChildBox: Ext.deprecated(),
    calculateChildBoxes: Ext.deprecated(),
    updateChildBoxes: Ext.deprecated(),
    //</debug>

    /**
     * @private
     */
    destroy: function() {
        Ext.destroy(this.innerCt, this.overflowHandler);
        this.callParent(arguments);
    },

    getRenderData: function() {
        var data = this.callParent();

        data.targetElCls = this.targetElCls;

        return data;
    }
});
