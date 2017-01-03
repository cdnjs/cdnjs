/**
 * @private
 */
Ext.define('Ext.layout.container.boxOverflow.Scroller', {

    /* Begin Definitions */

    extend: 'Ext.layout.container.boxOverflow.None',
    requires: ['Ext.util.ClickRepeater', 'Ext.Element'],
    alternateClassName: 'Ext.layout.boxOverflow.Scroller',
    alias: [
        'box.overflow.scroller',
        'box.overflow.Scroller' // capitalized for 4.x compat
    ],
    mixins: {
        observable: 'Ext.mixin.Observable'
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

    // private
    scrollerCls: Ext.baseCSSPrefix + 'box-scroller',
    beforeSuffix: '-before-scroller',
    afterSuffix: '-after-scroller',

    /**
     * @event scroll
     * @param {Ext.layout.container.boxOverflow.Scroller} scroller The layout scroller
     * @param {Number} newPosition The new position of the scroller
     * @param {Boolean/Object} animate If animating or not. If true, it will be a animation configuration, else it will be false
     */

    constructor: function(config) {
        var me = this;

        me.mixins.observable.constructor.call(me, config);

        me.scrollPosition = 0;
        me.scrollSize = 0;
    },

    getPrefixConfig: function() {
        return {
            role: 'presentation',
            id: this.layout.owner.id + this.beforeSuffix,
            cls: this.createScrollerCls('beforeX'),
            style: 'display:none'
        };
    },

    getSuffixConfig: function() {
        return {
            role: 'presentation',
            id : this.layout.owner.id + this.afterSuffix,
            cls: this.createScrollerCls('afterX'),
            style: 'display:none'
        };
    },

    createScrollerCls: function(xName) {
        var me = this,
            layout = me.layout,
            owner = layout.owner,
            prefix = Ext.baseCSSPrefix,
            type = me.getOwnerType(owner),
            scrollerCls = me.scrollerCls,
            cls =
                scrollerCls + ' ' +
                scrollerCls + '-' + layout.names[xName] + ' ' +
                scrollerCls + '-' + type + ' ' +
                scrollerCls + '-' + type + '-' + owner.ui;

        if (owner.plain) {
            // Add plain class for components that need separate "plain" styling (e.g. tab bar)
            cls += ' ' + scrollerCls + '-plain';
        }

        return cls;
    },

    getOverflowCls: function(direction) {
        return this.scrollerCls + '-body-' + direction;
    },

    beginLayout: function (ownerContext) {
        var layout = this.layout;

        ownerContext.innerCtScrollPos = this.getScrollPosition();

        this.callParent(arguments);
    },

    finishedLayout: function(ownerContext) {
        var me = this,
            plan = ownerContext.state.boxPlan,
            layout = me.layout,
            names = layout.names,
            scrollPos = Math.min(me.getMaxScrollPosition(), ownerContext.innerCtScrollPos),
            lastProps, lastItemContext;

        // If there is overflow...
        if (plan && plan.tooNarrow) {
            lastProps = ownerContext.childItems[ownerContext.childItems.length - 1].props;

            // capture this before callParent since it calls handle/clearOverflow:
            me.scrollSize = lastProps[names.x] + lastProps[names.width];
            me.updateScrollButtons();
        }

        layout.innerCt[names.setScrollLeft](scrollPos);
        this.callParent([ownerContext]);
    },

    handleOverflow: function(ownerContext) {
        var me = this,
            names = me.layout.names,
            getWidth = names.getWidth,
            parallelMargins = names.parallelMargins,
            scrollerWidth, targetPaddingWidth, beforeScroller, afterScroller;

        me.showScrollers();

        beforeScroller = me.getBeforeScroller();
        afterScroller = me.getAfterScroller();
        
        scrollerWidth = beforeScroller[getWidth]() + afterScroller[getWidth]() +
            beforeScroller.getMargin(parallelMargins) + afterScroller.getMargin(parallelMargins);
        
        targetPaddingWidth = ownerContext.targetContext.getPaddingInfo()[names.width];
        
        return {
            reservedSpace: Math.max(scrollerWidth - targetPaddingWidth, 0)
        };
    },

    /**
     * @private
     * Returns a reference to the "before" scroller element.  Creates click handlers on
     * the first call.
     */
    getBeforeScroller: function() {
        var me = this;

        return  me._beforeScroller || (me._beforeScroller =
            me.createScroller(me.beforeSuffix, 'beforeRepeater', 'scrollLeft'));
    },

    /**
     * @private
     * Returns a reference to the "after" scroller element.  Creates click handlers on
     * the first call.
     */
    getAfterScroller: function() {
        var me = this;

        return me._afterScroller || (me._afterScroller =
            me.createScroller(me.afterSuffix, 'afterRepeater', 'scrollRight'));
    },

    createScroller: function(suffix, repeaterName, scrollHandler) {
        var me = this,
            owner = me.layout.owner,
            scrollerCls = me.scrollerCls,
            scrollerEl;

        scrollerEl = owner.el.getById(owner.id + suffix);

        scrollerEl.addClsOnOver(scrollerCls + '-hover');
        scrollerEl.addClsOnClick(scrollerCls + '-pressed');

        scrollerEl.setVisibilityMode(Ext.Element.DISPLAY);

        me[repeaterName] = new Ext.util.ClickRepeater(scrollerEl, {
            interval: me.scrollRepeatInterval,
            handler: scrollHandler,
            scope: me
        });

        return scrollerEl;
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
     * Shows the scroller elements. Creates the scrollers first if they are not already present.
     */
    showScrollers: function() {
        var me = this;

        me.createWheelListener();
        me.getBeforeScroller().show();
        me.getAfterScroller().show();
        me.layout.owner.addClsWithUI(me.layout.direction === 'vertical' ? 'vertical-scroller' : 'scroller');
        // TODO - this may invalidates data in the ContextItem's styleCache
    },

    /**
     * @private
     * Hides the scroller elements.
     */
    hideScrollers: function() {
        var me = this,
            beforeScroller = me.getBeforeScroller(),
            afterScroller = me.getAfterScroller();

        if (beforeScroller) {
            beforeScroller.hide();
            afterScroller.hide();
            me.layout.owner.removeClsWithUI(me.layout.direction === 'vertical' ? 'vertical-scroller' : 'scroller');
            // TODO - this may invalidates data in the ContextItem's styleCache
        }
    },

    /**
     * @private
     */
    destroy: function() {
        var me = this;

        Ext.destroy(me.beforeRepeater, me.afterRepeater, me._beforeScroller, me._afterScroller);
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
            beforeScroller = me.getBeforeScroller(),
            afterScroller = me.getAfterScroller(),
            disabledCls;

        if (!beforeScroller || !afterScroller) {
            return;
        }

        disabledCls = me.scrollerCls + '-disabled';

        beforeScroller[me.atExtremeBefore()  ? 'addCls' : 'removeCls'](disabledCls);
        afterScroller[me.atExtremeAfter() ? 'addCls' : 'removeCls'](disabledCls);
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
     */
    setVertical: function() {
        var me = this,
            beforeScroller = me.getBeforeScroller(),
            afterScroller = me.getAfterScroller(),
            names = me.layout.names,
            scrollerCls = me.scrollerCls;

        beforeScroller.removeCls(scrollerCls + '-' + names.beforeY);
        afterScroller.removeCls(scrollerCls + '-' + names.afterY);

        beforeScroller.addCls(scrollerCls + '-' + names.beforeX);
        afterScroller.addCls(scrollerCls + '-' + names.afterX);

        this.callParent();
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
            innerCt = layout.innerCt,
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
                        newPos -= (innerCt[names.getWidth]() - box[names.width]);
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
