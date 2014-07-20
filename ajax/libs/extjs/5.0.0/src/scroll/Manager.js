/**
 * Framework-internal class for managing touch scrolling of Components and providing
 * scroll indicators while scrolling.
 *
 * @private
 */
Ext.define('Ext.scroll.Manager', {
    extend: 'Ext.util.Observable',
    requires: [
        'Ext.scroll.Scroller',
        'Ext.scroll.Indicator',
        'Ext.GlobalEvents'
    ],

    /**
     * @cfg {Ext.dom.Element} el The element that gets moved when touch-scrolling.  This should
     * be an single child of an overflowing container element (an element that is styled
     * with overflow:auto), and should shrinkwrap around its contents (display: table, or
     * position: absolute)
     */

    /**
     * @cfg {String} direction The {@link Ext.scroll.Scroller#direction direction} to use for
     * the Scroller.
     */

    /**
     * @cfg {Number} minIndicatorLength The minimum length for the scroll indicators.
     */
    minIndicatorLength: 24,

    /**
     * @cfg {Ext.Component} owner The owning component
     */

    /**
     * @event scroll
     * Fires when scroller is scrolled.
     * @param {Ext.scroll.Manager} scrollManager
     * @param {Number} x
     * @param {Number} y
     */

    refreshCounter: 0,

    translationMethods: {
        1: 'scrollparent',
        2: 'csstransform'
    },

    constructor: function(config) {
        var me = this,
            containerListeners = {
                dragend: 'onDragEnd',
                dragcancel: 'onDragEnd',
                scope: me
            },
            containerEl;

        if (Ext.supports.touchScroll === 2) {
            // If using full virtual scrolling attach a mousewheel listener for moving
            // the scroll position.  Otherwise we use native scrolling and so do not
            // want to override the native behavior
            containerListeners.mousewheel = 'onMouseWheel';
            containerListeners.scroll = {
                fn: 'onElementScroll',
                delegated: false,
                scope: me
            };
        }

        me.callParent(arguments);

        me.scroller = new Ext.scroll.Scroller({
            // scroller gets refreshed by Component#onResize,
            // so there is no need to initialize a SizeMonitor
            autoRefresh: false,
            element: me.el,
            direction: me.direction,
            momentumEasing: {
                bounce: {
                    springTension: 1
                }
            },
            outOfBoundRestrictFactor: 0,
            translatable: {
                translationMethod: me.translationMethods[Ext.supports.touchScroll]
            },
            listeners: {
                scrollstart: 'onScrollStart',
                scroll: 'onScroll',
                scrollend: 'onScrollEnd',
                scope: me
            }
        });

        Ext.GlobalEvents.on('idle', me.doRefresh, me);

        containerEl = me.containerEl = me.el.parent();

        me.owner.mon(containerEl, containerListeners);

        me.initIndicators();
    },

    onElementScroll: function(event, targetEl) {
        targetEl.scrollTop = targetEl.scrollLeft = 0;
    },

    destroy: function() {
        var me = this;

        me.clearListeners();
        Ext.GlobalEvents.un('idle', me.doRefresh, me);
        me.scroller.destroy();
    },

    initIndicators: function() {
        var me = this,
            containerEl = me.containerEl,
            scroller = me.scroller,
            minLength = me.minIndicatorLength;

        if (Ext.supports.touchScroll === 2) {
            me.xIndicator = new Ext.scroll.Indicator({
                axis: 'x',
                scroller: scroller,
                containerEl: containerEl,
                minLength: minLength
            });
            me.yIndicator = new Ext.scroll.Indicator({
                axis: 'y',
                scroller: scroller,
                containerEl: containerEl,
                minLength: minLength
            });
            me.refreshIndicators();
        }
    },

    invokeIndicators: function(name, args, yArgs) {
        var me = this,
            xIndicator = me.xIndicator,
            yIndicator = me.yIndicator;

        if (xIndicator && me.isAxisEnabled('x')) {
            xIndicator[name].apply(xIndicator, args);
        }

        if (yIndicator && me.isAxisEnabled('y')) {
            yIndicator[name].apply(yIndicator, yArgs || args);
        }
    },

    getPosition: function() {
        return this.scroller.getPosition();
    },

    refresh: function(immediate) {
        ++this.refreshCounter;
        if (immediate) {
            this.doRefresh();
        }
    },

    refreshIndicators: function() {
        var me = this,
            scroller = me.scroller,
            maxPosition = scroller.getMaxPosition(),
            size = scroller.getSize();

        me.invokeIndicators('setMaxScrollPosition', [maxPosition.x], [maxPosition.y]);
        me.invokeIndicators('setScrollSize', [size.x], [size.y]);
        me.invokeIndicators('setHasOpposite', [me.isAxisEnabled('y')], [me.isAxisEnabled('x')]);
    },
    
    doRefresh: function() {
        var me = this,
            scroller = me.scroller;

        if (me.refreshCounter) {
            scroller.refresh();
            me.refreshIndicators();
            me.refreshCounter = 0;
        }
    },

    onScrollStart: function() {
        this.isTouching = Ext.isScrolling = true;

        this.invokeIndicators('show');

        this.toggleOthers(true);
    },

    onScroll: function(scroller, x, y) {
        var me = this;

        me.invokeIndicators('setValue', [x], [y]);

        me.fireEvent('scroll', me, x, y);
    },

    onScrollEnd: function() {
        var me = this;

        Ext.isScrolling = false;

        if (me.isTouching) {
            return;
        }

        me.invokeIndicators('hide');
    },

    onDragEnd: function() {
        this.isTouching = false;
        this.toggleOthers(false);
    },

    onMouseWheel: function(e) {
        var me = this,
            scroller = me.scroller,
            delta = e.getWheelDeltas(),
            deltaX = -delta.x,
            deltaY = -delta.y,
            position = scroller.getPosition(),
            maxPosition = scroller.getMaxPosition(),
            minPosition = scroller.getMinPosition(),
            max = Math.max,
            min = Math.min,
            positionX = max(min(position.x + deltaX, maxPosition.x), minPosition.x),
            positionY = max(min(position.y + deltaY, maxPosition.y), minPosition.y);

        deltaX = positionX - position.x;
        deltaY = positionY - position.y;

        if (!deltaX && !deltaY) {
            return;
        }
        e.stopEvent();

        me.onScrollStart();
        me.scrollBy(deltaX, deltaY);
        me.onScroll(scroller, positionX, positionY);
        me.onScrollEnd(scroller);
    },

    isAxisEnabled: function(axis) {
        return this.scroller.isAxisEnabled(axis);
    },

    setScrollX: function(x) {
        var scroller = this.scroller;
        scroller.scrollTo(x, scroller.getPosition().y);
    },

    setScrollY: function(y) {
        var scroller = this.scroller;
        scroller.scrollTo(scroller.getPosition().x, y);
    },

    scrollTo: function(x, y, animate) {
        this.scroller.scrollTo(x, y, animate);
    },

    scrollBy: function(x, y, animate) {
        if (x.length) {
            animate = y;
            y = x[1];
            x = x[0];
        } else if (!Ext.isNumber(x)) {
            animate = y;
            y = x.y;
            x = x.x;
        }
        this.scroller.scrollBy(x, y, animate);
    },

    /**
     * Scrolls a descendant element of the scroller into view.
     * @param {String/HTMLElement/Ext.dom.Element} el the descendant to scroll into view
     * @param {Boolean} [hscroll=true] False to disable horizontal scroll.
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element
     * animation config object
     * @private
     */
    scrollIntoView: function(el, hscroll, animate) {
        var me = this,
            containerEl = me.containerEl,
            scroller = me.scroller,
            currentPosition = scroller.getPosition(),
            currentX = currentPosition.x,
            currentY = currentPosition.y,
            position = Ext.fly(el).getScrollIntoViewXY(containerEl, currentX, currentY),
            newX = position.x,
            newY = position.y;

        if (hscroll === false) {
            newX = currentX;
        }

        if (newX !== currentX || newY !== currentY) {
            scroller.scrollTo(newX, newY, animate);
        }
    },

    toggleOthers: function(disabled) {
        var scrollers = Ext.scroll.Scroller.instances,
            scroller, id;

        // TODO: maybe only disable others in our hierachy instead of ALL others
        for (id in scrollers) {
            scroller = scrollers[id];
            if (scroller !== this.scroller) {
                scroller.setDisabled(disabled);
            }
        }
    },

    preventDefault: function(e) {
        if (e.touches.length === 1) {
            // prevent the body/viewport from scrolling
            e.preventDefault();
        }
    }
});