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
 */
Ext.define('Ext.layout.container.boxOverflow.Scroller', {

    /* Begin Definitions */

    extend: 'Ext.layout.container.boxOverflow.None',
    requires: ['Ext.util.ClickRepeater', 'Ext.Element'],
    alternateClassName: 'Ext.layout.boxOverflow.Scroller',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    /* End Definitions */

    /**
     * @cfg {Boolean} animateScroll
     * True to animate the scrolling of items within the layout (ignored if enableScroll is false)
     */
    animateScroll: false,

    /**
     * @cfg {Number} scrollIncrement
     * The number of pixels to scroll by on scroller click
     */
    scrollIncrement: 20,

    /**
     * @cfg {Number} wheelIncrement
     * The number of pixels to increment on mouse wheel scrolling.
     */
    wheelIncrement: 10,

    /**
     * @cfg {Number} scrollRepeatInterval
     * Number of milliseconds between each scroll while a scroller button is held down
     */
    scrollRepeatInterval: 60,

    /**
     * @cfg {Number} scrollDuration
     * Number of milliseconds that each scroll animation lasts
     */
    scrollDuration: 400,

    /**
     * @cfg {String} beforeCtCls
     * CSS class added to the beforeCt element. This is the element that holds any special items such as scrollers,
     * which must always be present at the leftmost edge of the Container
     */

    /**
     * @cfg {String} afterCtCls
     * CSS class added to the afterCt element. This is the element that holds any special items such as scrollers,
     * which must always be present at the rightmost edge of the Container
     */

    /**
     * @cfg {String} [scrollerCls='x-box-scroller']
     * CSS class added to both scroller elements if enableScroll is used
     */
    scrollerCls: Ext.baseCSSPrefix + 'box-scroller',

    /**
     * @cfg {String} beforeScrollerCls
     * CSS class added to the left scroller element if enableScroll is used
     */

    /**
     * @cfg {String} afterScrollerCls
     * CSS class added to the right scroller element if enableScroll is used
     */

    constructor: function(layout, config) {
        var me = this;

        me.layout = layout;
        Ext.apply(me, config || {});

        // Dont pass the config so that it is not applied to 'this' again
        me.mixins.observable.constructor.call(me);

        me.addEvents(
            /**
             * @event scroll
             * @param {Ext.layout.container.boxOverflow.Scroller} scroller The layout scroller
             * @param {Number} newPosition The new position of the scroller
             * @param {Boolean/Object} animate If animating or not. If true, it will be a animation configuration, else it will be false
             */
            'scroll'
        );
        me.scrollPosition = 0;
        me.scrollSize = 0;
    },

    getPrefixConfig: function() {
        var me = this,
            layout = me.layout,
            owner = layout.owner,
            cls;

        me.initCSSClasses();
        cls = Ext.layout.container.Box.prototype.innerCls + ' ' + me.beforeCtCls;
        if (owner.plain) {
            // Add plain class for components that need separate "plain" styling (e.g. tab bar)
            cls += ' ' + me.scrollerCls + '-plain';
        }
        return {
            cls: cls,
            cn : {
                id : owner.id + layout.names.beforeScrollerSuffix,
                cls: me.scrollerCls + ' ' + me.beforeScrollerCls,
                style: 'display:none'
            }
        };
    },

    getSuffixConfig: function() {
        var me = this,
            layout = me.layout,
            owner = layout.owner,
            cls = Ext.layout.container.Box.prototype.innerCls + ' ' + me.afterCtCls;

        if (owner.plain) {
            // Add plain class for components that need separate "plain" styling (e.g. tab bar)
            cls += ' ' + me.scrollerCls + '-plain';
        }
        return {
            cls: cls,
            cn : {
                id : owner.id + layout.names.afterScrollerSuffix,
                cls: me.scrollerCls + ' ' + me.afterScrollerCls,
                style: 'display:none'
            }
        };
    },

    getOverflowCls: function() {
        return Ext.baseCSSPrefix + this.layout.direction + '-box-overflow-body';
    },

    initCSSClasses: function() {
        var me = this,
            prefix = Ext.baseCSSPrefix,
            layout = me.layout,
            names = layout.names,
            beforeXName = names.beforeX,
            afterXName = names.afterX,
            type = me.getOwnerType(layout.owner);

        me.beforeCtCls = me.beforeCtCls || prefix + 'box-scroller-' + beforeXName;
        me.afterCtCls  = me.afterCtCls  || prefix + 'box-scroller-' + afterXName;
        
        me.beforeScrollerCls = me.beforeScrollerCls || prefix + type + '-scroll-' + beforeXName;
        me.afterScrollerCls  = me.afterScrollerCls  || prefix + type + '-scroll-' + afterXName;
    },

    beginLayout: function (ownerContext) {
        var layout = this.layout;

        ownerContext.innerCtScrollPos = this.getScrollPosition();

        this.callParent(arguments);
    },

    completeLayout: function(ownerContext) {
        var me = this,
            plan = ownerContext.state.boxPlan,
            names = me.layout.names,
            last;

        // If there is overflow...
        if (plan && plan.tooNarrow) {
            last = ownerContext.childItems[ownerContext.childItems.length - 1];

            // capture this before callParent since it calls handle/clearOverflow:
            me.scrollSize = last.props[names.x] + last.props[names.width];
            me.updateScrollButtons();
        }
        this.callParent(arguments);
    },

    finishedLayout: function(ownerContext) {
        var me = this,
            layout = me.layout,
            scrollPos = Math.min(me.getMaxScrollPosition(), ownerContext.innerCtScrollPos);

        layout.innerCt[layout.names.setScrollLeft](scrollPos);
    },

    handleOverflow: function(ownerContext) {
        var me = this,
            methodName = me.layout.names.getWidth;

        me.showScrollers();
        return {
            reservedSpace: me.beforeCt[methodName]() + me.afterCt[methodName]()
        };
    },

    /**
     * @private
     * Gets references to the beforeCt and afterCt elements if they have not already been captured
     * and creates click handlers for them.
     */
    captureChildElements: function() {
        var me = this,
            el = me.layout.owner.el,
            before, after, hoverCls, pressedSuffix, pressedCls, hoverSuffix;

        // Grab the scroll click receiving elements
        if (!me.beforeCt) {
            hoverSuffix = '-hover';
            pressedSuffix = '-pressed';
            hoverCls = me.scrollerCls + hoverSuffix;
            pressedCls = me.scrollerCls + pressedSuffix;
            before = me.beforeScroller = el.getById(me.layout.owner.id + '-before-scroller');
            after = me.afterScroller = el.getById(me.layout.owner.id + '-after-scroller');
            me.beforeCt = before.up('');
            me.afterCt = after.up('');
            me.createWheelListener();

            before.addClsOnOver(hoverCls);
            before.addClsOnOver(me.beforeScrollerCls + hoverSuffix);
            before.addClsOnClick(pressedCls);
            before.addClsOnClick(me.beforeScrollerCls + pressedSuffix);
            after.addClsOnOver(hoverCls);
            after.addClsOnOver(me.afterScrollerCls + hoverSuffix);
            after.addClsOnClick(pressedCls);
            after.addClsOnClick(me.afterScrollerCls + pressedSuffix);

            before.setVisibilityMode(Ext.Element.DISPLAY);
            after.setVisibilityMode(Ext.Element.DISPLAY);

            me.beforeRepeater = new Ext.util.ClickRepeater(before, {
                interval: me.scrollRepeatInterval,
                handler : me.scrollLeft,
                scope   : me
            });

            me.afterRepeater = new Ext.util.ClickRepeater(after, {
                interval: me.scrollRepeatInterval,
                handler : me.scrollRight,
                scope   : me
            });
        }
    },

    /**
     * @private
     * Sets up an listener to scroll on the layout's innerCt mousewheel event
     */
    createWheelListener: function() {
        var me = this;
        me.layout.innerCt.on({
            mousewheel: function(e) {
                me.scrollBy(me.getWheelDelta(e) * me.wheelIncrement * -1, false);
            },
            stopEvent: true
        });
    },

    getWheelDelta: function (e) {
        return e.getWheelDelta();
    },

    /**
     * @private
     */
    clearOverflow: function () {
        this.hideScrollers();
    },

    /**
     * @private
     * Shows the scroller elements in the beforeCt and afterCt. Creates the scrollers first if they are not already
     * present. 
     */
    showScrollers: function() {
        var me = this;

        me.captureChildElements();
        me.beforeScroller.show();
        me.afterScroller.show();
        me.layout.owner.addClsWithUI(me.layout.direction === 'vertical' ? 'vertical-scroller' : 'scroller');
        // TODO - this may invalidates data in the ContextItem's styleCache
    },

    /**
     * @private
     * Hides the scroller elements in the beforeCt and afterCt
     */
    hideScrollers: function() {
        var me = this;

        if (me.beforeScroller !== undefined) {
            me.beforeScroller.hide();
            me.afterScroller.hide();
            me.layout.owner.removeClsWithUI(me.layout.direction === 'vertical' ? 'vertical-scroller' : 'scroller');
            // TODO - this may invalidates data in the ContextItem's styleCache
        }
    },

    /**
     * @private
     */
    destroy: function() {
        var me = this;

        Ext.destroy(me.beforeRepeater, me.afterRepeater, me.beforeScroller, me.afterScroller, me.beforeCt, me.afterCt);
    },

    /**
     * @private
     * Scrolls left or right by the number of pixels specified
     * @param {Number} delta Number of pixels to scroll to the right by. Use a negative number to scroll left
     */
    scrollBy: function(delta, animate) {
        this.scrollTo(this.getScrollPosition() + delta, animate);
    },

    /**
     * @private
     * @return {Object} Object passed to scrollTo when scrolling
     */
    getScrollAnim: function() {
        return {
            duration: this.scrollDuration, 
            callback: this.updateScrollButtons, 
            scope   : this
        };
    },

    /**
     * @private
     * Enables or disables each scroller button based on the current scroll position
     */
    updateScrollButtons: function() {
        var me = this,
            beforeMeth,
            afterMeth,
            beforeCls,
            afterCls,
            disabledCls,
            suffix = '-disabled';
            
        if (me.beforeScroller == null || me.afterScroller == null) {
            return;
        }

        beforeMeth = me.atExtremeBefore()  ? 'addCls' : 'removeCls';
        afterMeth  = me.atExtremeAfter() ? 'addCls' : 'removeCls';
        disabledCls = me.scrollerCls + suffix;
        beforeCls = [disabledCls, me.beforeScrollerCls + suffix];
        afterCls = [disabledCls, me.afterScrollerCls  + suffix];

        me.beforeScroller[beforeMeth](beforeCls);
        me.afterScroller[afterMeth](afterCls);
        me.scrolling = false;
    },

    /**
     * @private
     * Scrolls to the left by the configured amount
     */
    scrollLeft: function() {
        this.scrollBy(-this.scrollIncrement, false);
    },

    /**
     * @private
     * Scrolls to the right by the configured amount
     */
    scrollRight: function() {
        this.scrollBy(this.scrollIncrement, false);
    },

    /**
     * Returns the current scroll position of the innerCt element
     * @return {Number} The current scroll position
     */
    getScrollPosition: function(){
        var me = this,
            layout = me.layout,
            result;

        // Until we actually scroll, the scroll[Top|Left] is stored as zero to avoid DOM
        // hits, after that it's NaN.
        if (isNaN(me.scrollPosition)) {
            result = layout.innerCt[layout.names.getScrollLeft]();
        } else {
            result = me.scrollPosition;
        }
        return result;
    },

    /**
     * @private
     * Returns the maximum value we can scrollTo
     * @return {Number} The max scroll value
     */
    getMaxScrollPosition: function() {
        var me = this,
            layout = me.layout,
            maxScrollPos = me.scrollSize - layout.innerCt[layout.names.getWidth]();

        return (maxScrollPos < 0) ? 0 : maxScrollPos;
    },

    /**
     * @private
     * Returns true if the innerCt scroll is already at its left-most point
     * @return {Boolean} True if already at furthest left point
     */
    atExtremeBefore: function() {
        return !this.getScrollPosition();
    },

    /**
     * @private
     * Returns true if the innerCt scroll is already at its right-most point
     * @return {Boolean} True if already at furthest right point
     */
    atExtremeAfter: function() {
        return this.getScrollPosition() >= this.getMaxScrollPosition();
    },

    /**
     * @private
     * Scrolls to the given position. Performs bounds checking.
     * @param {Number} position The position to scroll to. This is constrained.
     * @param {Boolean} animate True to animate. If undefined, falls back to value of this.animateScroll
     */
    scrollTo: function(position, animate) {
        var me = this,
            layout = me.layout,
            names = layout.names,
            oldPosition = me.getScrollPosition(),
            newPosition = Ext.Number.constrain(position, 0, me.getMaxScrollPosition());

        if (newPosition != oldPosition && !me.scrolling) {
            me.scrollPosition = NaN;
            if (animate === undefined) {
                animate = me.animateScroll;
            }

            layout.innerCt[names.scrollTo](names.beforeScrollX, newPosition, animate ? me.getScrollAnim() : false);
            if (animate) {
                me.scrolling = true;
            } else {
                me.updateScrollButtons();
            }
            me.fireEvent('scroll', me, newPosition, animate ? me.getScrollAnim() : false);
        }
    },

    /**
     * Scrolls to the given component.
     * @param {String/Number/Ext.Component} item The item to scroll to. Can be a numerical index, component id 
     * or a reference to the component itself.
     * @param {Boolean} animate True to animate the scrolling
     */
    scrollToItem: function(item, animate) {
        var me = this,
            layout = me.layout,
            owner = layout.owner,
            names = layout.names,
            visibility,
            box,
            newPos;

        item = me.getItem(item);
        if (item !== undefined) {
            if (item == owner.items.first()) {
                newPos = 0
            } else if (item === owner.items.last()) {
                newPos = me.getMaxScrollPosition();
            } else {
                visibility = me.getItemVisibility(item);
                if (!visibility.fullyVisible) {
                    box = item.getBox(false, true);
                    newPos = box[names.x];
                    if (visibility.hiddenEnd) {
                        newPos -= (me.layout.innerCt[names.getWidth]() - box[names.width]);
                    }
                }
            }
            if (newPos !== undefined) {
                me.scrollTo(newPos, animate);
            }
        }
    },

    /**
     * @private
     * For a given item in the container, return an object with information on whether the item is visible
     * with the current innerCt scroll value.
     * @param {Ext.Component} item The item
     * @return {Object} Values for fullyVisible, hiddenStart and hiddenEnd
     */
    getItemVisibility: function(item) {
        var me          = this,
            box         = me.getItem(item).getBox(true, true),
            layout      = me.layout,
            names       = layout.names,
            itemStart   = box[names.x],
            itemEnd     = itemStart + box[names.width],
            scrollStart = me.getScrollPosition(),
            scrollEnd   = scrollStart + layout.innerCt[names.getWidth]();

        return {
            hiddenStart : itemStart < scrollStart,
            hiddenEnd   : itemEnd > scrollEnd,
            fullyVisible: itemStart > scrollStart && itemEnd < scrollEnd
        };
    }
});
