/**
 * This class manages ready detection and handling. Direct use of this class is not
 * recommended. Instead use `Ext.onReady`:
 * 
 *      Ext.onReady(function () {
 *          // DOM and Framework are ready...
 *      });
 *
 * ## DOM Ready
 *
 * The lowest-level of readiness is DOM readiness. This level implies only that the document
 * body exists. Many things require the DOM to be ready for manipulation. If that is all
 * that is required, the `Ext.onDocumentReady` method can be called to register a callback
 * to be called as soon as the DOM is ready:
 *
 *      Ext.onDocumentReady(function () {
 *          // the document body is ready
 *      });
 *
 * ## Framework Ready
 *
 * In production builds of applications it is common to have all of the code loaded before
 * DOM ready, so the need to wait for "onReady" is often confused with only that concern.
 * This is easy to understand, at least in part because historically `Ext.onReady` only
 * waited for DOM ready.
 *
 * With the introduction of `Ext.Loader`, however, it became common for DOM ready to occur
 * in the middle of dynamically loading code. If application code were executed at that
 * time, any use of the yet-to-be-loaded classes would throw errors. As a consequence of
 * this, the `Ext.onReady` mechanism was extended to wait for both DOM ready *and* all of
 * the required classes to be loaded.
 *
 * When the framework enters or leaves a state where it is not ready (for example, the
 * first dynamic load is requested or last load completes), `Ext.env.Ready` is informed.
 * For example:
 *
 *      Ext.env.Ready.block();
 *
 *      //...
 *
 *      Ext.env.Ready.unblock();
 *
 * When there are no blocks and the DOM is ready, the Framework is ready and the "onReady"
 * callbacks are called.
 *
 * Priority can be used to control the ordering of onReady listeners, for example:
 *
 *     Ext.onReady(function() {
 *
 *     }, null, {
 *         priority: 100
 *     });
 *
 * Ready listeners with higher priorities will run sooner than those with lower priorities,
 * the default priority being `0`.  Internally the framework reserves priorities of 1000
 * or greater, and -1000 or lesser for onReady handlers that must run before or after
 * any application code.  Applications should stick to using priorities in the -999 - 999
 * range. The following priorities are currently in use by the framework:
 *
 * - Element_scroll rtl override: `1001`
 * - Event system initialization: `2000`
 * - Ext.dom.Element: `1500`
 *
 * @class Ext.env.Ready
 * @singleton
 * @private
 * @since 5.0.0
 */
Ext.env.Ready = {
// @define Ext.env.Ready
// @require Ext.env.Browser
// @require Ext.env.OS
// @require Ext.env.Feature

    /**
     * @property {Number} The number of Framework readiness blocks.
     * @private
     */
    blocks: 0,

    /**
     * @property {Number} bound This property stores the state of event listeners bound
     * to the document or window to detect ready state.
     * @private
     */
    bound: 0,

    /**
     * @property {Number} [delay=1]
     * This allows the DOM listener thread to complete (usually desirable with mobWebkit,
     * Gecko) before firing the entire onReady chain (high stack load on Loader). For mobile
     * devices when running from Home Screen, the splash screen will not disappear until
     * all external resource requests finish. This delay clears the splash screen.
     * @private
     */
    delay: 1,

    //<debug>
    /**
     * @property {Event[]} events An array of events that have triggered ready state. This
     * is for diagnostic purposes only and is only available in debug builds.
     * An array
     * @private
     */
    events: [],
    //</debug>

    /**
     * @property {Boolean} firing This property is `true` when we currently calling the
     * listeners.
     * @private
     */
    firing: false,

    /**
     * @property {Number} generation A counter of the number of mutations of `listeners`.
     * @private
     */
    generation: 0,

    /**
     * @property {Object[]} listeners The set of listeners waiting for ready.
     * @private
     */
    listeners: [],

    /**
     * @property {Number} nextId A counter so we can assign listeners an `id` to keep
     * them in FIFO order.
     * @private
     */
    nextId: 0,

    /**
     * @property {Number} sortGeneration A captured value of `generation` that indicates
     * when the `listeners` were last sorted.
     * @private
     */
    sortGeneration: 0,

    /**
     * @property {Number} state
     * Holds the current ready state as managed by this class. The values possible are:
     * 
     *   * 0 - Not ready.
     *   * 1 - Ready detected but listeners are not yet notified.
     *   * 2 - Ready detected and listeners are notified. See also `firing`.
     *   
     * @private
     */
    state: 0,

    /**
     * @property {Object} timer The handle from `setTimeout` for the delayed notification
     * of ready.
     * @private
     */
    timer: null,

    /**
     * Binds the appropriate browser event for checking if the DOM has loaded.
     * @private
     */
    bind: function () {
        var me = Ext.env.Ready,
            doc = document;

        if (!me.bound) {
            // Test scenario where load is dynamic AFTER window.load
            if (doc.readyState == 'complete') {
                // Firefox4+ got support for this state, others already do.
                me.onReadyEvent({
                    type: doc.readyState || 'body'
                });
            } else {
                me.bound = 1;
                if (Ext.browser.is.PhoneGap && !Ext.os.is.Desktop) {
                    me.bound = 2;
                    doc.addEventListener('deviceready', me.onReadyEvent, false);
                }
                doc.addEventListener('DOMContentLoaded', me.onReadyEvent, false);
                window.addEventListener('load', me.onReadyEvent, false);
            }
        }
    },

    block: function () {
        ++this.blocks;
    },

    /**
     * This method starts the process of firing the ready event. This may be delayed based
     * on the `delay` property.
     * @private
     */
    fireReady: function () {
        var me = Ext.env.Ready;

        if (!me.state) {
            Ext._readyTime = Ext.now();
            Ext.isDomReady = true;
            me.state = 1;

            // As soon as we transition to domready, complete the feature detection:
            Ext.feature.detect(true);

            if (!me.delay) {
                me.handleReady();
            } else if (navigator.standalone) {
                // When running from Home Screen, the splash screen will not disappear
                // until all external resource requests finish.
                // The first timeout clears the splash screen
                // The second timeout allows inital HTML content to be displayed
                me.timer = setTimeout(function() {
                    me.timer = null;
                    me.handleReadySoon();
                }, 1);
            } else {
                me.handleReadySoon();
            }
        }
    },

    /**
     * This method iterates over the `listeners` and invokes them. This advances the
     * `state` from 1 to 2 and ensure the proper subset of `listeners` are invoked.
     * @private
     */
    handleReady: function () {
        var me = this;

        if (me.state === 1) {
            if (me.isPaused()) {
                me.handleReadySoon(250); // poll to see when we get resumed
            } else {
                me.state = 2;

                Ext._beforeReadyTime = Ext.now();
                me.invokeAll();
                Ext._afterReadytime = Ext.now();
            }
        }
    },

    /**
     * This method is called to schedule a call to `handleReady` using a `setTimeout`. It
     * ensures that only one timer is pending.
     * @param {Number} [delay] If passed, this overrides the `delay` property.
     * @private
     */
    handleReadySoon: function (delay) {
        var me = this;

        if (!me.timer) {
            me.timer = setTimeout(function () {
                me.timer = null;
                me.handleReady();
            }, delay || me.delay);
        }
    },

    /**
     * This method invokes the given `listener` instance based on its options.
     * @param {Object} listener
     */
    invoke: function (listener) {
        var delay = listener.delay;

        if (delay) {
            setTimeout(function () {
                listener.fn.call(listener.scope);
            }, delay);
        } else {
            listener.fn.call(listener.scope);
        }
    },

    /**
     * Invokes as many listeners as are appropriate given the current state. This should
     * only be called when DOM ready is achieved. The remaining business of `blocks` is
     * handled here.
     */
    invokeAll: function () {
        var me = this,
            listeners = me.listeners,
            listener;

        if (!me.blocks) {
            // Since DOM is ready and we have no blocks, we mark the framework as ready.
            // Historically this flag has never regressed to false so we don't bother with
            // that.
            Ext.isReady = true;
        }
        me.firing = true;

        // NOTE: We cannot cache this length because each time through the loop a callback
        // may have added new callbacks.
        while (listeners.length) {
            if (me.sortGeneration !== me.generation) {
                me.sortGeneration = me.generation;

                // This will happen just once on the first pass... if nothing is being
                // added as we call the callbacks. This sorts the listeners such that the
                // highest priority listener is at the *end* of the array ... so we can
                // use pop (as opposed to shift) to extract it.
                listeners.sort(me.sortFn);
            }

            listener = listeners.pop();
            if (me.blocks && !listener.dom) {
                // If we are blocked (i.e., only DOM ready) and this listener is not a
                // DOM-ready listener we have reached the end of the line. The remaining
                // listeners are Framework ready listeners.
                listeners.push(listener);
                break;
            }

            me.invoke(listener);
        }

        me.firing = false;
    },

    /**
     * Detects whether we have been placed in a paused state for synchronization with
     * external debugging / perf tools (PageAnalyzer).
     * @private
     */
    isPaused: function () {
        return (location.search || '').indexOf('ext-pauseReadyFire') > 0 &&
                !Ext._continueFireReady;
    },

    /**
     * This method wraps the given listener pieces in a proper object for the `listeners`
     * array and `invoke` methods.
     * @param {Function} fn The method to call.
     * @param {Object} [scope] The scope (`this` reference) in which the `fn` executes.
     * Defaults to the browser window.
     * @param {Object} [options] An object with extra options.
     * @param {Number} [options.delay=0] A number of milliseconds to delay.
     * @param {Number} [options.priority=0] Relative priority of this callback. A larger
     * number will result in the callback being sorted before the others.  Priorities
     * 1000 or greater and -1000 or lesser are reserved for internal framework use only.
     * @param {Boolean} [options.dom=false] Pass `true` to only wait for DOM ready, `false`
     * means full Framework and DOM readiness.
     * @return {Object} The listener instance.
     * @private
     */
    makeListener: function (fn, scope, options) {
        var ret = {
            fn: fn,
            id: ++this.nextId, // so sortFn can respect FIFO
            scope: scope,
            dom: false,
            priority: 0
        };
        if (options) {
            Ext.apply(ret, options);
        }
        ret.phase = ret.dom ? 0 : 1; // to simplify the sortFn
        return ret;
    },

    /**
     * Adds a listener to be notified when the document is ready (before onload and before
     * images are loaded).
     *
     * @param {Function} fn The method to call.
     * @param {Object} [scope] The scope (`this` reference) in which the `fn` executes.
     * Defaults to the browser window.
     * @param {Object} [options] An object with extra options.
     * @param {Number} [options.delay=0] A number of milliseconds to delay.
     * @param {Number} [options.priority=0] Relative priority of this callback. A larger
     * number will result in the callback being sorted before the others.  Priorities
     * 1000 or greater and -1000 or lesser are reserved for internal framework use only.
     * @param {Boolean} [options.dom=false] Pass `true` to only wait for DOM ready, `false`
     * means full Framework and DOM readiness.
     * @private
     */
    on: function (fn, scope, options) {
        var me = Ext.env.Ready,
            listener = me.makeListener(fn, scope, options);

        if (me.state === 2 && !me.firing && (listener.dom || !me.blocks)) {
            // If we are DOM ready (state === 2) and not currently in invokeAll (!firing)
            // and this listener is ready to call (either a DOM ready listener or there
            // are no blocks), then we need to invoke the listener now.
            //
            // Otherwise we can fall to the else block and push the listener. The eventual
            // (or currently executing) call to handleReady or unblock will trigger its
            // delivery in proper priority order.
            me.invoke(listener);
        } else {
            me.listeners.push(listener);
            ++me.generation;

            if (!me.bound) {
                // If we have never bound then bind the ready event now. If we have unbound
                // the event then me.bound == -1 and we don't want to rebind it as the DOM
                // is ready.
                me.bind();
            }
        }
    },

    /**
     * This is a generic event handler method attached to all of the various events that
     * may indicate ready state. The first call to this method indicates ready state has
     * been achieved.
     * @param {Event} [ev] The event instance.
     * @private
     */
    onReadyEvent: function (ev) {
        var me = Ext.env.Ready;

        //<debug>
        if (ev && ev.type) {
            me.events.push(ev);
        }
        //</debug>

        if (me.bound > 0) {
            me.unbind();
            me.bound = -1; // NOTE: *not* 0 or false - we never want to rebind!
        }

        if (!me.state) {
            me.fireReady();
        }
    },

    /**
     * Sorts the `listeners` array by `phase` and `priority` such that the first listener
     * to fire can be determined using `pop` on the `listeners` array.
     * @private
     */
    sortFn: function (a, b) {
        return -((a.phase - b.phase) || (b.priority - a.priority) || (a.id - b.id));
    },

    unblock: function () {
        var me = this;

        if (me.blocks) {
            if (! --me.blocks) {
                if (me.state === 2 && !me.firing) {
                    // We have already finished handleReady (the DOM ready handler) so
                    // this trigger just needs to dispatch all the remaining listeners.
                    me.invokeAll();
                }
                // if we are currently firing then invokeAll will pick up the Framework
                // ready listeners automatically.
                //
                // If me.state < 2 then we are waiting for DOM ready so it will eventually
                // call handleReady and invokeAll when everything is ready.
            }
        }
    },

    /**
     * This method is called to remove all event listeners that may have been set up to
     * detect ready state.
     * @private
     */
    unbind: function () {
        var me = this,
            doc = document;

        if (me.bound > 1) {
            doc.removeEventListener('deviceready', me.onReadyEvent, false);
        }

        doc.removeEventListener('DOMContentLoaded', me.onReadyEvent, false);
        window.removeEventListener('load', me.onReadyEvent, false);
    }
};

(function () {
    var Ready = Ext.env.Ready;

    //<feature legacyBrowser>
    if (Ext.isIE8) {
        /* Customized implementation for Legacy IE. The default implementation is 
         * configured for use with all other 'standards compliant' agents.
         * References: http://javascript.nwbox.com/IEContentLoaded/
         * licensed courtesy of http://developer.yahoo.com/yui/license.html
         */
        Ext.apply(Ready, {
            /**
             * Timer for doScroll polling
             * @private
             */
            scrollTimer: null,

            /**
             * @private
             */
            readyStatesRe  : /complete/i,

            /**
             * This strategy has minimal benefits for Sencha solutions that build
             * themselves (ie. minimal initial page markup). However, progressively-enhanced
             * pages (with image content and/or embedded frames) will benefit the most
             * from it. Browser timer resolution is too poor to ensure a doScroll check
             * more than once on a page loaded with minimal assets (the readystatechange
             * event 'complete' usually beats the doScroll timer on a 'lightly-loaded'
             * initial document).
             * @private
             */
            pollScroll : function() {
                var scrollable = true;

                try {
                    document.documentElement.doScroll('left');
                } catch(e) {
                    scrollable = false;
                }

                // on IE8, when running within an iFrame, document.body is not immediately
                // available
                if (scrollable && document.body) {
                    Ready.onReadyEvent({
                        type: 'doScroll'
                    });
                } else {
                     // Minimize thrashing --
                     // adjusted for setTimeout's close-to-minimums (not too low),
                     // as this method SHOULD always be called once initially
                    Ready.scrollTimer = setTimeout(Ready.pollScroll, 20);
                }

                return scrollable;
            },

            bind: function () {
                if (Ready.bound) {
                    return;
                }

                var doc = document,
                    topContext;

                // See if we are in an IFRAME? (doScroll ineffective here)
                try {
                    topContext = window.frameElement === undefined;
                } catch(e) {
                    // If we throw an exception, it means we're probably getting access
                    // denied, which means we're in an iframe cross domain.
                }

                if (!topContext || !doc.documentElement.doScroll) {
                    Ready.pollScroll = Ext.emptyFn;   //then noop this test altogether
                }
                else if (Ready.pollScroll()) { // starts scroll polling if necessary
                    return;
                }

                if (doc.readyState == 'complete')  {
                    // Loaded AFTER initial document write/load...
                    Ready.onReadyEvent({
                        type: 'already ' + (doc.readyState || 'body')
                    });
                } else {
                    doc.attachEvent('onreadystatechange', Ready.onReadyStateChange);
                    window.attachEvent('onload', Ready.onReadyEvent);
                    Ready.bound = 1;
                }
            },

            unbind : function () {
                document.detachEvent('onreadystatechange', Ready.onReadyStateChange);
                window.detachEvent('onload', Ready.onReadyEvent);

                if (Ext.isNumber(Ready.scrollTimer)) {
                    clearTimeout(Ready.scrollTimer);
                    Ready.scrollTimer = null;
                }
            },

            /**
             * This event handler is called when the readyState changes.
             * @private
             */
            onReadyStateChange: function() {
                var state = document.readyState;

                if (Ready.readyStatesRe.test(state)) {
                    Ready.onReadyEvent({
                        type: state
                    });
                }
            }
        });
    }
    //</feature>

    /**
     * @property {Boolean} isDomReady
     * `true` when the document body is ready for use.
     * @member Ext
     * @readonly
     */

    /**
     * @property {Boolean} isReady
     * `true` when `isDomReady` is true and the Framework is ready for use.
     * @member Ext
     * @readonly
     */

    /**
     * @method onDocumentReady
     * @member Ext
     * Adds a listener to be notified when the document is ready (before onload and before
     * images are loaded).
     *
     * @param {Function} fn The method to call.
     * @param {Object} [scope] The scope (`this` reference) in which the handler function
     * executes. Defaults to the browser window.
     * @param {Object} [options] An object with extra options.
     * @param {Number} [options.delay=0] A number of milliseconds to delay.
     * @param {Number} [options.priority=0] Relative priority of this callback. A larger
     * number will result in the callback being sorted before the others.  Priorities
     * 1000 or greater and -1000 or lesser are reserved for internal framework use only.
     * @private
     */
    Ext.onDocumentReady = function (fn, scope, options) {
        var opt = {
            dom: true
        };

        if (options) {
            Ext.apply(opt, options);
        }

        Ready.on(fn, scope, opt);
    };

    /**
     * @method onReady
     * @member Ext
     * Adds a listener to be notified when the document is ready (before onload and before
     * images are loaded).
     *
     * @param {Function} fn The method to call.
     * @param {Object} [scope] The scope (`this` reference) in which the handler function
     * executes. Defaults to the browser window.
     * @param {Object} [options] An object with extra options.
     * @param {Number} [options.delay=0] A number of milliseconds to delay.
     * @param {Number} [options.priority=0] Relative priority of this callback. A larger
     * number will result in the callback being sorted before the others.  Priorities
     * 1000 or greater and -1000 or lesser are reserved for internal framework use only.
     * @param {Boolean} [options.dom=false] Pass `true` to only wait for DOM ready, `false`
     * means full Framework and DOM readiness.
     * numbers are reserved.
     */
    Ext.onReady = function (fn, scope, options) {
        Ready.on(fn, scope, options);
    };

    Ready.bind();
}());
