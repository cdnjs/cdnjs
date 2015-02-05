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
 * This is a layout that will render form Fields, one under the other all stretched to the Container width.
 *
 *     @example
 *     Ext.create('Ext.Panel', {
 *         width: 500,
 *         height: 300,
 *         title: "FormLayout Panel",
 *         layout: 'form',
 *         renderTo: Ext.getBody(),
 *         bodyPadding: 5,
 *         defaultType: 'textfield',
 *         items: [{
 *            fieldLabel: 'First Name',
 *             name: 'first',
 *             allowBlank:false
 *         },{
 *             fieldLabel: 'Last Name',
 *             name: 'last'
 *         },{
 *             fieldLabel: 'Company',
 *             name: 'company'
 *         }, {
 *             fieldLabel: 'Email',
 *             name: 'email',
 *             vtype:'email'
 *         }, {
 *             fieldLabel: 'DOB',
 *             name: 'dob',
 *             xtype: 'datefield'
 *         }, {
 *             fieldLabel: 'Age',
 *             name: 'age',
 *             xtype: 'numberfield',
 *             minValue: 0,
 *             maxValue: 100
 *         }, {
 *             xtype: 'timefield',
 *             fieldLabel: 'Time',
 *             name: 'time',
 *             minValue: '8:00am',
 *             maxValue: '6:00pm'
 *         }]
 *     });
 *
 * Note that any configured {@link Ext.Component#padding padding} will be ignored on items within a Form layout.
 */
Ext.define('Ext.layout.container.Form', {

    /* Begin Definitions */

    alias: 'layout.form',
    extend: 'Ext.layout.container.Container',
    alternateClassName: 'Ext.layout.FormLayout',

    /* End Definitions */
   
    tableCls: Ext.baseCSSPrefix + 'form-layout-table',

    type: 'form',
    
    createsInnerCt: true,

    manageOverflow: true,

    // Begin with no previous adjustments
    lastOverflowAdjust: {
        width: 0,
        height: 0
    },

    childEls: ['formTable'],
    
    padRow: '<tr><td class="' + Ext.baseCSSPrefix + 'form-item-pad" colspan="3"></td></tr>',

    renderTpl: [
        '<table id="{ownerId}-formTable" class="{tableCls}" style="width:100%" cellpadding="0">',
            '{%this.renderBody(out,values)%}',
        '</table>',
        '{%this.renderPadder(out,values)%}'
    ],

    getRenderData: function(){
        var data = this.callParent();
        data.tableCls = this.tableCls;
        return data;    
    },

    calculate : function (ownerContext) {
        var me = this,
            containerSize = me.getContainerSize(ownerContext, true),
            tableWidth,
            childItems,
            i = 0, length,
            shrinkwrapHeight = ownerContext.sizeModel.height.shrinkWrap;

        if (shrinkwrapHeight) {
            if (ownerContext.hasDomProp('containerChildrenSizeDone')) {
                ownerContext.setProp('contentHeight', me.formTable.dom.offsetHeight + ownerContext.targetContext.getPaddingInfo().height);
            } else {
                me.done = false;
            }
        }

        // Once we have been widthed, we can impose that width (in a non-dirty setting) upon all children at once
        if (containerSize.gotWidth) {
            tableWidth = me.formTable.dom.offsetWidth;
            childItems = ownerContext.childItems;

            for (length = childItems.length; i < length; ++i) {
                childItems[i].setWidth(tableWidth, false);
            }
        } else {
            me.done = false;
        }
    },

    getRenderTarget: function() {
        return this.formTable;
    },

    getRenderTree: function() {
        var me = this,
            result = me.callParent(arguments),
            i, len;

        for (i = 0, len = result.length; i < len; i++) {
            result[i] = me.transformItemRenderTree(result[i]);
        }
        return result;
    },

    transformItemRenderTree: function(item) {

        if (item.tag && item.tag == 'table') {
            item.tag = 'tbody';
            delete item.cellspacing;
            delete item.cellpadding;

            // IE6 doesn't separate cells nicely to provide input field
            // vertical separation. It also does not support transparent borders
            // which is how the extra 1px is added to the 2px each side cell spacing.
            // So it needs a 5px high pad row.
            if (Ext.isIE6) {
                item.cn = this.padRow;
            }

            return item;
        }

        return {
            tag: 'tbody',
            cn: {
                tag: 'tr',
                cn: {
                    tag: 'td',
                    colspan: 3,
                    style: 'width:100%',
                    cn: item
                }
            }
        };

    },

    isValidParent: function(item, target, position) {
        return true;
    },

    isItemShrinkWrap: function(item) {
        return ((item.shrinkWrap === true) ? 3 : item.shrinkWrap||0) & 2;
    },

    getItemSizePolicy: function(item) {
        return {
            setsWidth: 1,
            setsHeight: 0
        };
    },


// All of the below methods are old methods moved here from Container layout
// TODO: remove these methods once Form layout extends Auto layout

    beginLayoutCycle: function (ownerContext, firstCycle) {
        var padEl = this.overflowPadderEl;

        if (padEl) {
            padEl.setStyle('display', 'none');
        }

        // Begin with the scrollbar adjustment that we used last time - this is more likely to be correct
        // than beginning with no adjustment at all
        if (!ownerContext.state.overflowAdjust) {
            ownerContext.state.overflowAdjust = this.lastOverflowAdjust;
        }
    },

    /**
     * Handles overflow processing for a container. This should be called once the layout
     * has determined contentWidth/Height. In addition to the ownerContext passed to the
     * {@link #calculate} method, this method also needs the containerSize (the object
     * returned by {@link #getContainerSize}).
     * 
     * @param {Ext.layout.ContextItem} ownerContext
     * @param {Object} containerSize
     * @param {Number} dimensions A bit mask for the overflow managed dimensions. The 0-bit
     * is for `width` and the 1-bit is for `height`. In other words, a value of 1 would be
     * only `width`, 2 would be only `height` and 3 would be both.
     */
    calculateOverflow: function (ownerContext, containerSize, dimensions) {
        var me = this,
            targetContext = ownerContext.targetContext,
            manageOverflow = me.manageOverflow,
            state = ownerContext.state,
            overflowAdjust = state.overflowAdjust,
            padWidth, padHeight, padElContext, padding, scrollRangeFlags,
            scrollbarSize, contentW, contentH, ownerW, ownerH, scrollbars,
            xauto, yauto;

        if (manageOverflow && !state.secondPass && !me.reserveScrollbar) {
            // Determine the dimensions that have overflow:auto applied. If these come by
            // way of component config, this does not require a DOM read:
            xauto = (me.getOverflowXStyle(ownerContext) === 'auto');
            yauto = (me.getOverflowYStyle(ownerContext) === 'auto');

            // If the container layout is not using width, we don't need to adjust for the
            // vscroll (likewise for height). Perhaps we don't even need to run the layout
            // again if the adjustments won't have any effect on the result!
            if (!containerSize.gotWidth) {
                xauto = false;
            }
            if (!containerSize.gotHeight) {
                yauto = false;
            }

            if (xauto || yauto) {
                scrollbarSize = Ext.getScrollbarSize();

                // as a container we calculate contentWidth/Height, so we don't want
                // to use getProp and make it look like we are triggered by them...
                contentW = ownerContext.peek('contentWidth');
                contentH = ownerContext.peek('contentHeight');
                // The content size includes the target element's padding.  Since
                // the containerSize excludes the target element's padding, we  need
                // to subtract this padding from the content size before checking
                // to see if scrollbars are needed.
                padding = targetContext.getPaddingInfo();
                contentW -= padding.width;
                contentH -= padding.height;
                ownerW = containerSize.width;
                ownerH = containerSize.height;

                scrollbars = me.getScrollbarsNeeded(ownerW, ownerH, contentW, contentH);
                state.overflowState = scrollbars;

                if (typeof dimensions == 'number') {
                    scrollbars &= ~dimensions; // ignore dimensions that have no effect
                }

                overflowAdjust = {
                    width:  (xauto && (scrollbars & 2)) ? scrollbarSize.width : 0,
                    height: (yauto && (scrollbars & 1)) ? scrollbarSize.height : 0
                };

                // We can have 0-sized scrollbars (new Mac OS) and so don't invalidate
                // the layout unless this will change something...
                if (overflowAdjust.width !== me.lastOverflowAdjust.width || overflowAdjust.height !== me.lastOverflowAdjust.height) {
                    me.done = false;

                    // we pass overflowAdjust and overflowState in as state for the next
                    // cycle (these are discarded if one of our ownerCt's invalidates):
                    ownerContext.invalidate({
                        state: {
                            overflowAdjust: overflowAdjust,
                            overflowState: state.overflowState,
                            secondPass: true
                        }
                    });
                }
            }
        }

        if (!me.done) {
            return;
        }

        padElContext = ownerContext.padElContext ||
                      (ownerContext.padElContext = ownerContext.getEl('overflowPadderEl', me));

        // Even if overflow does not effect the layout, we still do need the padEl to be
        // sized or hidden appropriately...
        if (padElContext) {
            scrollbars = state.overflowState; // the true overflow state
            padWidth = ownerContext.peek('contentWidth');
            // the padder element must have a height of at least 1px, or its width will be ignored by the container.
            // The extra height is adjusted for by adding a -1px top margin to the padder element
            padHeight = 1;

            if (scrollbars) {
                padding = targetContext.getPaddingInfo();
                scrollRangeFlags = me.scrollRangeFlags;

                if ((scrollbars & 2) && (scrollRangeFlags & 1)) { // if (vscroll and loses bottom)
                    padHeight += padding.bottom;
                }

                if ((scrollbars & 1) && (scrollRangeFlags & 4)) { // if (hscroll and loses right)
                    padWidth += padding.right;
                }
                padElContext.setProp('display', '');
                padElContext.setSize(padWidth, padHeight);
            } else {
                padElContext.setProp('display', 'none');
            }
        }
    },

    completeLayout: function (ownerContext) {
        // Cache the scrollbar adjustment
        this.lastOverflowAdjust = ownerContext.state.overflowAdjust;
    },

    /**
     * Creates an element that makes bottom/right body padding consistent across browsers.
     * This element is sized based on the need for scrollbars in {@link #calculateOverflow}.
     * If the {@link #manageOverflow} option is false, this element is not created.
     *
     * See {@link #getScrollRangeFlags} for more details.
     */
    doRenderPadder: function (out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        var me = renderData.$layout,
            owner = me.owner,
            scrollRangeFlags = me.getScrollRangeFlags();

        if (me.manageOverflow) {
            if (scrollRangeFlags & 5) { // if (loses parent bottom and/or right padding)
                out.push('<div id="',owner.id,'-overflowPadderEl" ',
                    // the padder element must have a height of at least 1px, or its width will be ignored by the container.
                    // The extra height is adjusted for by adding a -1px top margin to the padder element
                    // A side effect of this approach is that click events will not register on bottom 1px of the container's
                    // last child item, unless that item has a bottom margin.  To fix this we make the padder element
                    // relatively positioned and give it a large negative z-index.  -99999 seems sufficient.
                    'style="font-size: 1px; height: 1px; margin-top: -1px; position: relative; z-index: -99999');

                out.push('"></div>');

                me.scrollRangeFlags = scrollRangeFlags; // remember for calculateOverflow
            }
        }
    },

    /**
     * Returns the container size (that of the target). Only the fixed-sized dimensions can
     * be returned because the shrinkWrap dimensions are based on the contentWidth/Height
     * as determined by the container layout.
     *
     * If the {@link #calculateOverflow} method is used and if {@link #manageOverflow} is
     * true, this may adjust the width/height by the size of scrollbars.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The owner's context item.
     * @param {Boolean} [inDom=false] True if the container size must be in the DOM.
     * @param {Boolean} [ignoreOverflow=true] if true scrollbar size will not be 
     * subtracted from container size.
     * @return {Object} The size
     * @return {Number} return.width The width
     * @return {Number} return.height The height
     * @protected
     */
    getContainerSize : function(ownerContext, inDom, ignoreOverflow) {
        // Subtle But Important:
        // 
        // We don't want to call getProp/hasProp et.al. unless we in fact need that value
        // for our results! If we call it and don't need it, the layout manager will think
        // we depend on it and will schedule us again should it change.

        var targetContext = ownerContext.targetContext,
            frameInfo = targetContext.getFrameInfo(),
            // if we're managing padding the padding is on the innerCt instead of the targetEl
            padding = targetContext.getPaddingInfo(),
            got = 0,
            needed = 0,
            overflowAdjust = ignoreOverflow ?  null : ownerContext.state.overflowAdjust,
            gotWidth, gotHeight, width, height;

        // In an shrinkWrap width/height case, we must not ask for any of these dimensions
        // because they will be determined by contentWidth/Height which is calculated by
        // this layout...

        // Fit/Card layouts are able to set just the width of children, allowing child's
        // resulting height to autosize the Container.
        // See examples/tabs/tabs.html for an example of this.

        if (!ownerContext.widthModel.shrinkWrap) {
            ++needed;
            width = inDom ? targetContext.getDomProp('width') : targetContext.getProp('width');
            gotWidth = (typeof width == 'number');
            if (gotWidth) {
                ++got;
                width -= frameInfo.width + padding.width;
                if (overflowAdjust) {
                    width -= overflowAdjust.width;
                }
            }
        }

        if (!ownerContext.heightModel.shrinkWrap) {
            ++needed;
            height = inDom ? targetContext.getDomProp('height') : targetContext.getProp('height');
            gotHeight = (typeof height == 'number');
            if (gotHeight) {
                ++got;
                height -= frameInfo.height + padding.height;
                if (overflowAdjust) {
                    height -= overflowAdjust.height;
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

    /**
     * returns the overflow-x style of the render target
     * @protected
     * @param {Ext.layout.ContextItem} ownerContext
     * @return {String}
     */
    getOverflowXStyle: function(ownerContext) {
        var me = this;

        return me.overflowXStyle ||
            (me.overflowXStyle = me.owner.scrollFlags.overflowX || ownerContext.targetContext.getStyle('overflow-x'));
    },

    /**
     * returns the overflow-y style of the render target
     * @protected
     * @param {Ext.layout.ContextItem} ownerContext
     * @return {String}
     */
    getOverflowYStyle: function(ownerContext) {
        var me = this;

        return me.overflowYStyle || 
            (me.overflowYStyle = me.owner.scrollFlags.overflowY || ownerContext.targetContext.getStyle('overflow-y'));
    },

    /**
     * Returns flags indicating cross-browser handling of scrollHeight/Width. In particular,
     * IE has issues with padding-bottom in a scrolling element (it does not include that
     * padding in the scrollHeight). Also, margin-bottom on a child in a scrolling element
     * can be lost.
     * 
     * All browsers seem to ignore margin-right on children and padding-right on the parent
     * element (the one with the overflow)
     * 
     * This method returns a number with the follow bit positions set based on things not
     * accounted for in scrollHeight and scrollWidth:
     *
     *  - 1: Scrolling element's padding-bottom is not included in scrollHeight.
     *  - 2: Last child's margin-bottom is not included in scrollHeight.
     *  - 4: Scrolling element's padding-right is not included in scrollWidth.
     *  - 8: Child's margin-right is not included in scrollWidth.
     *
     * To work around the margin-bottom issue, it is sufficient to create a 0px tall last
     * child that will "hide" the margin. This can also be handled by wrapping the children
     * in an element, again "hiding" the margin. Wrapping the elements is about the only
     * way to preserve their right margins. This is the strategy used by Column layout.
     *
     * To work around the padding-bottom problem, since it is comes from a style on the
     * parent element, about the only simple fix is to create a last child with height
     * equal to padding-bottom. To preserve the right padding, the sizing element needs to
     * have a width that includes the right padding.
     */
    getScrollRangeFlags: (function () {
        var flags = -1;

        return function () {
            if (flags < 0) {
                var div = Ext.getBody().createChild({
                        //cls: 'x-border-box x-hide-offsets',
                        cls: Ext.baseCSSPrefix + 'border-box',
                        style: {
                            width: '100px', height: '100px', padding: '10px',
                            overflow: 'auto'
                        },
                        children: [{
                            style: {
                                border: '1px solid red',
                                width: '150px', height: '150px',
                                margin: '0 5px 5px 0' // TRBL
                            }
                        }]
                    }),
                    scrollHeight = div.dom.scrollHeight,
                    scrollWidth = div.dom.scrollWidth,
                    heightFlags = {
                        // right answer, nothing missing:
                        175: 0,
                        // missing parent padding-bottom:
                        165: 1,
                        // missing child margin-bottom:
                        170: 2,
                        // missing both
                        160: 3
                    },
                    widthFlags = {
                        // right answer, nothing missing:
                        175: 0,
                        // missing parent padding-right:
                        165: 4,
                        // missing child margin-right:
                        170: 8,
                        // missing both
                        160: 12
                    };

                flags = (heightFlags[scrollHeight] || 0) | (widthFlags[scrollWidth] || 0);
                //Ext.log('flags=',flags.toString(2));
                div.remove();
            }

            return flags;
        };
    }()),

    initLayout: function() {
        var me = this,
            scrollbarWidth = Ext.getScrollbarSize().width;

        me.callParent();

        // Create a default lastOverflowAdjust based upon scrolling configuration.
        // If the Container is to overflow, or we *always* reserve space for a scrollbar
        // then reserve space for a vertical scrollbar
        if (scrollbarWidth && me.manageOverflow && !me.hasOwnProperty('lastOverflowAdjust')) {
            if (me.owner.scrollFlags.y || me.reserveScrollbar) {
                me.lastOverflowAdjust = {
                    width: scrollbarWidth,
                    height: 0
                };
            }
        }
    },

    setupRenderTpl: function (renderTpl) {
        this.callParent(arguments);

        renderTpl.renderPadder = this.doRenderPadder;
    }
});
