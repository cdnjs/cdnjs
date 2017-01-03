/**
 * Provides automatic scrolling of overflow regions in the page during drag operations.
 *
 * The ScrollManager configs will be used as the defaults for any scroll container registered with it, but you can also
 * override most of the configs per scroll container by adding a ddScrollConfig object to the target element that
 * contains these properties: {@link #hthresh}, {@link #vthresh}, {@link #increment} and {@link #frequency}. Example
 * usage:
 *
 *     var el = Ext.get('scroll-ct');
 *     el.ddScrollConfig = {
 *         vthresh: 50,
 *         hthresh: -1,
 *         frequency: 100,
 *         increment: 200
 *     };
 *     Ext.dd.ScrollManager.register(el);
 *
 * Note: This class is designed to be used in "Point Mode
 */
Ext.define('Ext.dd.ScrollManager', {
    singleton: true,
    requires: [
        'Ext.dd.DragDropManager'
    ],

    dirTrans: {
        up: -1,
        left: -1,
        down: 1,
        right: 1
    },

    constructor: function() {
        var ddm = Ext.dd.DragDropManager;
        ddm.fireEvents = Ext.Function.createSequence(ddm.fireEvents, this.onFire, this);
        ddm.stopDrag = Ext.Function.createSequence(ddm.stopDrag, this.onStop, this);
        this.doScroll = this.doScroll.bind(this);
        this.ddmInstance = ddm;
        this.els = {};
        this.dragEl = null;
        this.proc = {};
    },

    onStop: function(e){
        var sm = Ext.dd.ScrollManager;
        sm.dragEl = null;
        sm.clearProc();
    },

    triggerRefresh: function() {
        if (this.ddmInstance.dragCurrent) {
            this.ddmInstance.refreshCache(this.ddmInstance.dragCurrent.groups);
        }
    },

    doScroll: function() {
        var me = this;

        if (me.ddmInstance.dragCurrent) {
            var proc   = me.proc,
                procEl = proc.el,
                scrollComponent = proc.component,
                ddScrollConfig = proc.el.ddScrollConfig,
                distance = ddScrollConfig && ddScrollConfig.increment    ? ddScrollConfig.increment : me.increment,
                animate  = ddScrollConfig && 'animate' in ddScrollConfig ? ddScrollConfig.animate   : me.animate,
                afterScroll = function() {
                    me.triggerRefresh();
                };

            if (animate) {
                if (animate === true) {
                    animate = {
                        callback: afterScroll
                    };
                } else {
                    animate.callback = animate.callback ?
                        Ext.Function.createSequence(animate.callback, afterScroll) :
                        afterScroll;
                }
            }

            // If the element is the overflow element of a Component, and we are scrolling using CSS transform,
            // Then scroll using the correct method!
            if (scrollComponent) {

                // Left/right means increment has to be negated
                distance = distance * me.dirTrans[proc.dir];

                // Pass X or Y params depending upon dimension being scrolled
                if (proc.dir === 'up' || proc.dir === 'down') {
                    scrollComponent.scrollBy(0, distance, animate);
                } else {
                    scrollComponent.scrollBy(distance, 0, animate);
                }
            }
            else {
                procEl.scroll(proc.dir, distance, animate);
            }
            
            if (!animate) {
                afterScroll();
            }
        }
    },

    clearProc: function() {
        var proc = this.proc;
        if (proc.id) {
            clearInterval(proc.id);
        }
        if (proc.scroller) {
            proc.scroller.setSnapToBoundary(true);
            proc.scroller.snapToBoundary();
        }
        proc.id = 0;
        proc.el = proc.component = proc.scroller = null;
        proc.dir = "";
    },

    startProc: function(el, dir) {
        var me = this,
            group,
            freq,
            scrollComponent,
            proc = me.proc;

        me.clearProc();
        proc.el = el;
        proc.dir = dir;

        // See if we are CSS scrolling a *Component's overflowEl*.
        // The process has to know that so that it uses the correct methods to scroll and clear up
        if (Ext.supports.touchScroll === 2 && (scrollComponent = el.component) && el === scrollComponent.getOverflowEl()) {
            proc.component = scrollComponent;
            proc.scroller = scrollComponent.scrollManager.scroller;
            proc.scroller.setSnapToBoundary(false);
        }
        group = el.ddScrollConfig ? el.ddScrollConfig.ddGroup : undefined;
        freq  = (el.ddScrollConfig && el.ddScrollConfig.frequency)
              ? el.ddScrollConfig.frequency
              : me.frequency;

        if (group === undefined || me.ddmInstance.dragCurrent.ddGroup === group) {
            proc.id = setInterval(me.doScroll, freq);
        }
    },

    onFire: function(e, isDrop) {
        var me = this,
            pt,
            proc,
            els,
            id,
            el,
            elementRegion,
            configSource;

        if (isDrop || !me.ddmInstance.dragCurrent) {
            return;
        }
        if (!me.dragEl || me.dragEl !== me.ddmInstance.dragCurrent) {
            me.dragEl = me.ddmInstance.dragCurrent;
            // refresh regions on drag start
            me.refreshCache();
        }

        pt = e.getPoint();
        proc = me.proc;
        els = me.els;

        for (id in els) {
            el = els[id];
            elementRegion = el._region;
            configSource = el.ddScrollConfig || me;
            if (elementRegion && elementRegion.contains(pt) && el.isScrollable()) {
                if (elementRegion.bottom - pt.y <= configSource.vthresh) {
                    if(proc.el !== el){
                        me.startProc(el, "down");
                    }
                    return;
                } else if (elementRegion.right - pt.x <= configSource.hthresh) {
                    if (proc.el !== el) {
                        me.startProc(el, "right");
                    }
                    return;
                } else if (pt.y - elementRegion.top <= configSource.vthresh) {
                    if (proc.el !== el) {
                        me.startProc(el, "up");
                    }
                    return;
                } else if (pt.x - elementRegion.left <= configSource.hthresh) {
                    if (proc.el !== el) {
                        me.startProc(el, "left");
                    }
                    return;
                }
            }
        }
        me.clearProc();
    },

    /**
     * Registers new overflow element(s) to auto scroll
     * @param {String/HTMLElement/Ext.dom.Element/String[]/HTMLElement[]/Ext.dom.Element[]} el
     * The id of or the element to be scrolled or an array of either
     */
    register : function(el){
        if (Ext.isArray(el)) {
            for(var i = 0, len = el.length; i < len; i++) {
                    this.register(el[i]);
            }
        } else {
            el = Ext.get(el);
            this.els[el.id] = el;
        }
    },

    /**
     * Unregisters overflow element(s) so they are no longer scrolled
     * @param {String/HTMLElement/Ext.dom.Element/String[]/HTMLElement[]/Ext.dom.Element[]} el
     * The id of or the element to be removed or an array of either
     */
    unregister : function(el){
        if(Ext.isArray(el)){
            for (var i = 0, len = el.length; i < len; i++) {
                this.unregister(el[i]);
            }
        }else{
            el = Ext.get(el);
            delete this.els[el.id];
        }
    },

    /**
     * The number of pixels from the top or bottom edge of a container the pointer needs to be to trigger scrolling
     */
    vthresh : 25 * (window.devicePixelRatio || 1),

    /**
     * The number of pixels from the right or left edge of a container the pointer needs to be to trigger scrolling
     */
    hthresh : 25 * (window.devicePixelRatio || 1),

    /**
     * The number of pixels to scroll in each scroll increment
     */
    increment : 100,

    /**
     * The frequency of scrolls in milliseconds
     */
    frequency : 500,

    /**
     * True to animate the scroll
     */
    animate: true,

    /**
     * The animation duration in seconds - MUST BE less than Ext.dd.ScrollManager.frequency!
     */
    animDuration: 0.4,

    /**
     * @property {String} ddGroup
     * The named drag drop {@link Ext.dd.DragSource#ddGroup group} to which this container belongs. If a ddGroup is
     * specified, then container scrolling will only occur when a dragged object is in the same ddGroup.
     */
    ddGroup: undefined,

    /**
     * Manually trigger a cache refresh.
     */
    refreshCache : function(){
        var els = this.els,
            id;
        for (id in els) {
            if(typeof els[id] == 'object'){ // for people extending the object prototype
                els[id]._region = els[id].getRegion();
            }
        }
    }
});
