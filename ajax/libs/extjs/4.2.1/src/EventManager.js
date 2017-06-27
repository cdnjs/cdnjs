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
// @tag dom,core
// @require util/Event.js
// @define Ext.EventManager

/**
 * @class Ext.EventManager
 * Registers event handlers that want to receive a normalized EventObject instead of the standard browser event and provides
 * several useful events directly.
 *
 * See {@link Ext.EventObject} for more details on normalized event objects.
 * @singleton
 */
Ext.EventManager = new function() {
    var EventManager = this,
        doc = document,
        win = window,
        escapeRx = /\\/g,
        prefix = Ext.baseCSSPrefix,
        // IE9strict addEventListener has some issues with using synthetic events
        supportsAddEventListener = !Ext.isIE9 && 'addEventListener' in doc,
        readyEvent,
        initExtCss = function() {
            // find the body element
            var bd = doc.body || doc.getElementsByTagName('body')[0],
                cls = [prefix + 'body'],
                htmlCls = [],
                supportsLG = Ext.supports.CSS3LinearGradient,
                supportsBR = Ext.supports.CSS3BorderRadius,
                html;

            if (!bd) {
                return false;
            }

            html = bd.parentNode;

            function add (c) {
                cls.push(prefix + c);
            }

            //Let's keep this human readable!
            if (Ext.isIE && Ext.isIE9m) {
                add('ie');

                // very often CSS needs to do checks like "IE7+" or "IE6 or 7". To help
                // reduce the clutter (since CSS/SCSS cannot do these tests), we add some
                // additional classes:
                //
                //      x-ie7p      : IE7+      :  7 <= ieVer
                //      x-ie7m      : IE7-      :  ieVer <= 7
                //      x-ie8p      : IE8+      :  8 <= ieVer
                //      x-ie8m      : IE8-      :  ieVer <= 8
                //      x-ie9p      : IE9+      :  9 <= ieVer
                //      x-ie78      : IE7 or 8  :  7 <= ieVer <= 8
                //
                if (Ext.isIE6) {
                    add('ie6');
                } else { // ignore pre-IE6 :)
                    add('ie7p');

                    if (Ext.isIE7) {
                        add('ie7');
                    } else {
                        add('ie8p');

                        if (Ext.isIE8) {
                            add('ie8');
                        } else {
                            add('ie9p');

                            if (Ext.isIE9) {
                                add('ie9');
                            }
                        }
                    }
                }

                if (Ext.isIE7m) {
                    add('ie7m');
                }
                if (Ext.isIE8m) {
                    add('ie8m');
                }
                if (Ext.isIE9m) {
                    add('ie9m');
                }
                if (Ext.isIE7 || Ext.isIE8) {
                    add('ie78');
                }
            }
            
            if (Ext.isIE10) {
                add('ie10');
            }
            
            if (Ext.isGecko) {
                add('gecko');
                if (Ext.isGecko3) {
                    add('gecko3');
                }
                if (Ext.isGecko4) {
                    add('gecko4');
                }
                if (Ext.isGecko5) {
                    add('gecko5');
                }
            }
            if (Ext.isOpera) {
                add('opera');
            }
            if (Ext.isWebKit) {
                add('webkit');
            }
            if (Ext.isSafari) {
                add('safari');
                if (Ext.isSafari2) {
                    add('safari2');
                }
                if (Ext.isSafari3) {
                    add('safari3');
                }
                if (Ext.isSafari4) {
                    add('safari4');
                }
                if (Ext.isSafari5) {
                    add('safari5');
                }
                if (Ext.isSafari5_0) {
                    add('safari5_0')
                }
            }
            if (Ext.isChrome) {
                add('chrome');
            }
            if (Ext.isMac) {
                add('mac');
            }
            if (Ext.isLinux) {
                add('linux');
            }
            if (!supportsBR) {
                add('nbr');
            }
            if (!supportsLG) {
                add('nlg');
            }

            // add to the parent to allow for selectors x-strict x-border-box, also set the isBorderBox property correctly
            if (html) {
                if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                    Ext.isBorderBox = false;
                }
                else {
                    Ext.isBorderBox = true;
                }

                if(!Ext.isBorderBox) {
                    htmlCls.push(prefix + 'content-box');
                }
                if (Ext.isStrict) {
                    htmlCls.push(prefix + 'strict');
                } else {
                    htmlCls.push(prefix + 'quirks');
                }
                Ext.fly(html, '_internal').addCls(htmlCls);
            }

            Ext.fly(bd, '_internal').addCls(cls);
            return true;
        };

    Ext.apply(EventManager, {
        /**
         * Check if we have bound our global onReady listener
         * @private
         */
        hasBoundOnReady: false,

        /**
         * Check if fireDocReady has been called
         * @private
         */
        hasFiredReady: false,

        /**
         * Additionally, allow the 'DOM' listener thread to complete (usually desirable with mobWebkit, Gecko)
         * before firing the entire onReady chain (high stack load on Loader) by specifying a delay value.
         * Defaults to 1ms.
         * @private
         */
        deferReadyEvent : 1,

        /*
         * diags: a list of event names passed to onReadyEvent (in chron order)
         * @private
         */
        onReadyChain : [],

        /**
         * Holds references to any onReady functions
         * @private
         */
        readyEvent:
            (function () {
                readyEvent = new Ext.util.Event();
                readyEvent.fire = function () {
                    Ext._beforeReadyTime = Ext._beforeReadyTime || new Date().getTime();
                    readyEvent.self.prototype.fire.apply(readyEvent, arguments);
                    Ext._afterReadytime = new Date().getTime();
                };
                return readyEvent;
            }()),

        /**
         * Fires when an event handler finishes its run, just before returning to browser control.
         * 
         * This includes DOM event handlers, Ajax (including JSONP) event handlers, and {@link Ext.util.TaskRunner TaskRunners}
         * 
         * This can be useful for performing cleanup, or update tasks which need to happen only
         * after all code in an event handler has been run, but which should not be executed in a timer
         * due to the intervening browser reflow/repaint which would take place.
         *
         */
        idleEvent: new Ext.util.Event(),

        /**
         * detects whether the EventManager has been placed in a paused state for synchronization
         * with external debugging / perf tools (PageAnalyzer)
         * @private
         */
        isReadyPaused: function(){
            return (/[?&]ext-pauseReadyFire\b/i.test(location.search) && !Ext._continueFireReady);
        },

        /**
         * Binds the appropriate browser event for checking if the DOM has loaded.
         * @private
         */
        bindReadyEvent: function() {
            if (EventManager.hasBoundOnReady) {
                return;
            }

            // Test scenario where Core is dynamically loaded AFTER window.load
            if ( doc.readyState == 'complete'  ) {  // Firefox4+ got support for this state, others already do.
                EventManager.onReadyEvent({
                    type: doc.readyState || 'body'
                });
            } else {
                doc.addEventListener('DOMContentLoaded', EventManager.onReadyEvent, false);
                win.addEventListener('load', EventManager.onReadyEvent, false);
                EventManager.hasBoundOnReady = true;
            }
        },

        onReadyEvent : function(e) {
            if (e && e.type) {
                EventManager.onReadyChain.push(e.type);
            }

            if (EventManager.hasBoundOnReady) {
                doc.removeEventListener('DOMContentLoaded', EventManager.onReadyEvent, false);
                win.removeEventListener('load', EventManager.onReadyEvent, false);
            }

            if (!Ext.isReady) {
                EventManager.fireDocReady();
            }
        },

        /**
         * We know the document is loaded, so trigger any onReady events.
         * @private
         */
        fireDocReady: function() {
            if (!Ext.isReady) {
                Ext._readyTime = new Date().getTime();
                Ext.isReady = true;

                Ext.supports.init();
                EventManager.onWindowUnload();
                readyEvent.onReadyChain = EventManager.onReadyChain;    //diags report

                if (Ext.isNumber(EventManager.deferReadyEvent)) {
                    Ext.Function.defer(EventManager.fireReadyEvent, EventManager.deferReadyEvent);
                    EventManager.hasDocReadyTimer = true;
                } else {
                    EventManager.fireReadyEvent();
                }
            }
        },

        /**
         * Fires the ready event
         * @private
         */
        fireReadyEvent: function() {

            // Unset the timer flag here since other onReady events may be
            // added during the fire() call and we don't want to block them
            EventManager.hasDocReadyTimer = false;
            EventManager.isFiring = true;

            // Ready events are all single: true, if we get to the end
            // & there are more listeners, it means they were added
            // inside some other ready event
            while (readyEvent.listeners.length && !EventManager.isReadyPaused()) {
                readyEvent.fire();
            }
            EventManager.isFiring = false;
            EventManager.hasFiredReady = true;
            Ext.EventManager.idleEvent.fire();
        },

        /**
         * Adds a listener to be notified when the document is ready (before onload and before images are loaded).
         *
         * {@link Ext#onDocumentReady} is an alias for {@link Ext.EventManager#onDocumentReady}.
         *
         * @param {Function} fn The method the event invokes.
         * @param {Object} [scope] The scope (`this` reference) in which the handler function executes.
         * Defaults to the browser window.
         * @param {Object} [options] Options object as passed to {@link Ext.Element#addListener}.
         */
        onDocumentReady: function(fn, scope, options) {
            options = options || {};
            // force single, only ever fire it once
            options.single = true;
            readyEvent.addListener(fn, scope, options);

            // If we're in the middle of firing, or we have a deferred timer
            // pending, drop out since the event will be fired  later
            if (!(EventManager.isFiring || EventManager.hasDocReadyTimer)) {
                if (Ext.isReady) {
                    EventManager.fireReadyEvent();
                } else {
                    EventManager.bindReadyEvent();
                }
            }
        },

        // --------------------- event binding ---------------------

        /**
         * Contains a list of all document mouse downs, so we can ensure they fire even when stopEvent is called.
         * @private
         */
        stoppedMouseDownEvent: new Ext.util.Event(),

        /**
         * Options to parse for the 4th argument to addListener.
         * @private
         */
        propRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|freezeEvent)$/,

        /**
         * Get the id of the element. If one has not been assigned, automatically assign it.
         * @param {HTMLElement/Ext.Element} element The element to get the id for.
         * @return {String} id
         */
        getId : function(element) {
            var id;

            element = Ext.getDom(element);

            if (element === doc || element === win) {
                id = element === doc ? Ext.documentId : Ext.windowId;
            }
            else {
                id = Ext.id(element);
            }

            if (!Ext.cache[id]) {
                Ext.addCacheEntry(id, null, element);
            }

            return id;
        },

        /**
         * Convert a "config style" listener into a set of flat arguments so they can be passed to addListener
         * @private
         * @param {Object} element The element the event is for
         * @param {Object} event The event configuration
         * @param {Object} isRemove True if a removal should be performed, otherwise an add will be done.
         */
        prepareListenerConfig: function(element, config, isRemove) {
            var propRe = EventManager.propRe,
                key, value, args;

            // loop over all the keys in the object
            for (key in config) {
                if (config.hasOwnProperty(key)) {
                    // if the key is something else then an event option
                    if (!propRe.test(key)) {
                        value = config[key];
                        // if the value is a function it must be something like click: function() {}, scope: this
                        // which means that there might be multiple event listeners with shared options
                        if (typeof value == 'function') {
                            // shared options
                            args = [element, key, value, config.scope, config];
                        } else {
                            // if its not a function, it must be an object like click: {fn: function() {}, scope: this}
                            args = [element, key, value.fn, value.scope, value];
                        }

                        if (isRemove) {
                            EventManager.removeListener.apply(EventManager, args);
                        } else {
                            EventManager.addListener.apply(EventManager, args);
                        }
                    }
                }
            }
        },

        mouseEnterLeaveRe: /mouseenter|mouseleave/,

        /**
         * Normalize cross browser event differences
         * @private
         * @param {Object} eventName The event name
         * @param {Object} fn The function to execute
         * @return {Object} The new event name/function
         */
        normalizeEvent: function(eventName, fn) {
            if (EventManager.mouseEnterLeaveRe.test(eventName) && !Ext.supports.MouseEnterLeave) {
                if (fn) {
                    fn = Ext.Function.createInterceptor(fn, EventManager.contains);
                }
                eventName = eventName == 'mouseenter' ? 'mouseover' : 'mouseout';
            } else if (eventName == 'mousewheel' && !Ext.supports.MouseWheel && !Ext.isOpera) {
                eventName = 'DOMMouseScroll';
            }
            return {
                eventName: eventName,
                fn: fn
            };
        },

        /**
         * Checks whether the event's relatedTarget is contained inside (or <b>is</b>) the element.
         * @private
         * @param {Object} event
         */
        contains: function(event) {
            event = event.browserEvent || event;
            var parent = event.currentTarget,
                child = EventManager.getRelatedTarget(event);

            if (parent && parent.firstChild) {
                while (child) {
                    if (child === parent) {
                        return false;
                    }
                    child = child.parentNode;
                    if (child && (child.nodeType != 1)) {
                        child = null;
                    }
                }
            }
            return true;
        },

        /**
         * Appends an event handler to an element.  The shorthand version {@link #on} is equivalent.
         * Typically you will use {@link Ext.Element#addListener} directly on an Element in favor of
         * calling this version.
         * 
         * {@link Ext.EventManager#on} is an alias for {@link Ext.EventManager#addListener}.
         *
         * @param {String/Ext.Element/HTMLElement/Window} el The html element or id to assign the event handler to.
         *
         * @param {String} eventName The name of the event to listen for.
         *
         * @param {Function/String} handler The handler function the event invokes. A String parameter
         * is assumed to be method name in `scope` object, or Element object if no scope is provided.
         * @param {Ext.EventObject} handler.event The {@link Ext.EventObject EventObject} describing the event.
         * @param {Ext.dom.Element} handler.target The Element which was the target of the event.
         * Note that this may be filtered by using the `delegate` option.
         * @param {Object} handler.options The options object from the addListener call.
         *
         * @param {Object} [scope] The scope (`this` reference) in which the handler function is executed.
         * Defaults to the Element.
         *
         * @param {Object} [options] An object containing handler configuration properties.
         * This may contain any of the following properties (See {@link Ext.Element#addListener}
         * for examples of how to use these options.):
         * @param {Object} options.scope The scope (`this` reference) in which the handler function is executed. Defaults to the Element.
         * @param {String} options.delegate A simple selector to filter the target or look for a descendant of the target
         * @param {Boolean} options.stopEvent True to stop the event. That is stop propagation, and prevent the default action.
         * @param {Boolean} options.preventDefault True to prevent the default action
         * @param {Boolean} options.stopPropagation True to prevent event propagation
         * @param {Boolean} options.normalized False to pass a browser event to the handler function instead of an Ext.EventObject
         * @param {Number} options.delay The number of milliseconds to delay the invocation of the handler after te event fires.
         * @param {Boolean} options.single True to add a handler to handle just the next firing of the event, and then remove itself.
         * @param {Number} options.buffer Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
         * by the specified number of milliseconds. If the event fires again within that time, the original
         * handler is *not* invoked, but the new handler is scheduled in its place.
         * @param {Ext.dom.Element} options.target Only call the handler if the event was fired on the target Element,
         * *not* if the event was bubbled up from a child node.
         */
        addListener: function(element, eventName, fn, scope, options) {
            // Check if we've been passed a "config style" event.
            if (typeof eventName !== 'string') {
                EventManager.prepareListenerConfig(element, eventName);
                return;
            }

            var dom = element.dom || Ext.getDom(element),
                hasAddEventListener, bind, wrap, cache, id, cacheItem, capture;
            
            if (typeof fn === 'string') {
                fn = Ext.resolveMethod(fn, scope || element);
            }

            //<debug>
            if (!fn) {
                Ext.Error.raise({
                    sourceClass: 'Ext.EventManager',
                    sourceMethod: 'addListener',
                    targetElement: element,
                    eventName: eventName,
                    msg: 'Error adding "' + eventName + '\" listener. The handler function is undefined.'
                });
            }
            //</debug>

            // create the wrapper function
            options = options || {};

            bind = EventManager.normalizeEvent(eventName, fn);
            wrap = EventManager.createListenerWrap(dom, eventName, bind.fn, scope, options);
            
            // add all required data into the event cache
            cache = EventManager.getEventListenerCache(element.dom ? element : dom, eventName);
            eventName = bind.eventName;

            // In IE9 we prefer to use attachEvent but it's not available for some Elements (SVG)
            hasAddEventListener = supportsAddEventListener || (Ext.isIE9 && !dom.attachEvent);
            
            if (!hasAddEventListener) {
                id = EventManager.normalizeId(dom);
                // If there's no id we don't have any events bound, so we never
                // need to clone at this point.
                if (id) {
                    cacheItem = Ext.cache[id][eventName];
                    if (cacheItem && cacheItem.firing) {
                        // If we're in the middle of firing we want to update the class
                        // cache reference so it is different to the array we referenced
                        // when we started firing the event. Though this is a more difficult
                        // way of not mutating the collection while firing, a vast majority of
                        // the time we won't be adding listeners for the same element/event type
                        // while firing the same event.
                        cache = EventManager.cloneEventListenerCache(dom, eventName);
                    }
                }
            }

            capture = !!options.capture;
            cache.push({
                fn: fn,
                wrap: wrap,
                scope: scope,
                capture: capture 
            });

            if (!hasAddEventListener) {
                // If cache length is 1, it means we're binding the first event
                // for this element for this type
                if (cache.length === 1) {
                    id = EventManager.normalizeId(dom, true);
                    fn = Ext.Function.bind(EventManager.handleSingleEvent, EventManager, [id, eventName], true);
                    Ext.cache[id][eventName] = {
                        firing: false,
                        fn: fn
                    };
                    dom.attachEvent('on' + eventName, fn);
                }
            } else {
                dom.addEventListener(eventName, wrap, capture);
            }

            if (dom == doc && eventName == 'mousedown') {
                EventManager.stoppedMouseDownEvent.addListener(wrap);
            }
        },
        
        // Handle the case where the window/document already has an id attached.
        // In this case we still want to return our custom window/doc id.
        normalizeId: function(dom, force) {
            var id;
            if (dom === document) {
                id = Ext.documentId;
            } else if (dom === window) {
                id = Ext.windowId;
            } else {
                id = dom.id;
            }
            if (!id && force) {
                id = EventManager.getId(dom);
            }
            return id;
        },
        
        handleSingleEvent: function(e, id, eventName) {
            // Don't create a copy here, since we fire lots of events and it's likely
            // that we won't add an event during a fire. Instead, we'll handle this during
            // the process of adding events 
            var listenerCache = EventManager.getEventListenerCache(id, eventName),
                attachItem = Ext.cache[id][eventName],
                len, i;
                
            // Typically this will never occur, however, the framework allows the creation
            // of synthetic events in Ext.EventObject. As such, it makes it possible to fire
            // off the same event on the same element during this method.
            if (attachItem.firing) {
                return;
            }
                
            attachItem.firing = true;
            for (i = 0, len = listenerCache.length; i < len; ++i) {
                listenerCache[i].wrap(e);
            }
            attachItem.firing = false;
            
        },

        /**
         * Removes an event handler from an element.  The shorthand version {@link #un} is equivalent.  Typically
         * you will use {@link Ext.Element#removeListener} directly on an Element in favor of calling this version.
         *
         * {@link Ext.EventManager#on} is an alias for {@link Ext.EventManager#addListener}.
         *
         * @param {String/Ext.Element/HTMLElement/Window} el The id or html element from which to remove the listener.
         * @param {String} eventName The name of the event.
         * @param {Function} fn The handler function to remove. **This must be a reference to the function passed
         * into the {@link #addListener} call.**
         * @param {Object} scope If a scope (`this` reference) was specified when the listener was added,
         * then this must refer to the same object.
         */
        removeListener : function(element, eventName, fn, scope) {
            // handle our listener config object syntax
            if (typeof eventName !== 'string') {
                EventManager.prepareListenerConfig(element, eventName, true);
                return;
            }

            var dom = Ext.getDom(element),
                id, el = element.dom ? element : Ext.get(dom),
                cache = EventManager.getEventListenerCache(el, eventName),
                bindName = EventManager.normalizeEvent(eventName).eventName,
                i = cache.length, j, cacheItem, hasRemoveEventListener,
                listener, wrap;
                
            if (!dom) {
                return;
            }

            // In IE9 we prefer to use detachEvent but it's not available for some Elements (SVG)
            hasRemoveEventListener = supportsAddEventListener || (Ext.isIE9 && !dom.detachEvent);
            
            if (typeof fn === 'string') {
                fn = Ext.resolveMethod(fn, scope || element);
            }

            while (i--) {
                listener = cache[i];

                if (listener && (!fn || listener.fn == fn) && (!scope || listener.scope === scope)) {
                    wrap = listener.wrap;

                    // clear buffered calls
                    if (wrap.task) {
                        clearTimeout(wrap.task);
                        delete wrap.task;
                    }

                    // clear delayed calls
                    j = wrap.tasks && wrap.tasks.length;
                    if (j) {
                        while (j--) {
                            clearTimeout(wrap.tasks[j]);
                        }
                        delete wrap.tasks;
                    }

                    if (!hasRemoveEventListener) {
                        // if length is 1, we're removing the final event, actually
                        // unbind it from the element
                        id = EventManager.normalizeId(dom, true);
                        cacheItem = Ext.cache[id][bindName];
                        if (cacheItem && cacheItem.firing) {
                            // See code in addListener for why we create a copy
                            cache = EventManager.cloneEventListenerCache(dom, bindName);
                        }
                        
                        if (cache.length === 1) {
                            fn = cacheItem.fn;
                            delete Ext.cache[id][bindName];
                            dom.detachEvent('on' + bindName, fn);
                        }
                    } else {
                        dom.removeEventListener(bindName, wrap, listener.capture);
                    }

                    if (wrap && dom == doc && eventName == 'mousedown') {
                        EventManager.stoppedMouseDownEvent.removeListener(wrap);
                    }

                    // remove listener from cache
                    Ext.Array.erase(cache, i, 1);
                }
            }
        },

        /**
         * Removes all event handers from an element.  Typically you will use {@link Ext.Element#removeAllListeners}
         * directly on an Element in favor of calling this version.
         * @param {String/Ext.Element/HTMLElement/Window} el The id or html element from which to remove all event handlers.
         */
        removeAll : function(element) {
            var id = (typeof element === 'string') ? element : element.id,
                cache, events, eventName;

            // If the element does not have an ID or a cache entry for its ID, then this is a no-op
            if (id && (cache = Ext.cache[id])) {
                events = cache.events;
    
                for (eventName in events) {
                    if (events.hasOwnProperty(eventName)) {
                        EventManager.removeListener(element, eventName);
                    }
                }
                cache.events = {};
             }
        },

        /**
         * Recursively removes all previous added listeners from an element and its children. Typically you will use {@link Ext.Element#purgeAllListeners}
         * directly on an Element in favor of calling this version.
         * @param {String/Ext.Element/HTMLElement/Window} el The id or html element from which to remove all event handlers.
         * @param {String} eventName (optional) The name of the event.
         */
        purgeElement : function(element, eventName) {
            var dom = Ext.getDom(element),
                i = 0, len, childNodes;

            if (eventName) {
                EventManager.removeListener(element, eventName);
            } else {
                EventManager.removeAll(element);
            }

            if (dom && dom.childNodes) {
                childNodes = dom.childNodes;
                for (len = childNodes.length; i < len; i++) {
                    EventManager.purgeElement(childNodes[i], eventName);
                }
            }
        },

        /**
         * Create the wrapper function for the event
         * @private
         * @param {HTMLElement} dom The dom element
         * @param {String} ename The event name
         * @param {Function} fn The function to execute
         * @param {Object} scope The scope to execute callback in
         * @param {Object} options The options
         * @return {Function} the wrapper function
         */
        createListenerWrap : function(dom, ename, fn, scope, options) {
            options = options || {};

            var f, gen, wrap = function(e, args) {
                // Compile the implementation upon first firing
                if (!gen) {
                    f = ['if(!' + Ext.name + ') {return;}'];

                    if (options.buffer || options.delay || options.freezeEvent) {
                        if (options.freezeEvent) {
                            // If we're freezing, we still want to update the singleton event object
                            // as well as returning a frozen copy
                            f.push('e = X.EventObject.setEvent(e);');
                        }
                        f.push('e = new X.EventObjectImpl(e, ' + (options.freezeEvent ? 'true' : 'false' ) + ');');
                    } else {
                        f.push('e = X.EventObject.setEvent(e);');
                    }

                    if (options.delegate) {
                        // double up '\' characters so escape sequences survive the
                        // string-literal translation
                        f.push('var result, t = e.getTarget("' + (options.delegate + '').replace(escapeRx, '\\\\') + '", this);');
                        f.push('if(!t) {return;}');
                    } else {
                        f.push('var t = e.target, result;');
                    }

                    if (options.target) {
                        f.push('if(e.target !== options.target) {return;}');
                    }

                    if (options.stopEvent) {
                        f.push('e.stopEvent();');
                    } else {
                        if(options.preventDefault) {
                            f.push('e.preventDefault();');
                        }
                        if(options.stopPropagation) {
                            f.push('e.stopPropagation();');
                        }
                    }

                    if (options.normalized === false) {
                        f.push('e = e.browserEvent;');
                    }

                    if (options.buffer) {
                        f.push('(wrap.task && clearTimeout(wrap.task));');
                        f.push('wrap.task = setTimeout(function() {');
                    }

                    if (options.delay) {
                        f.push('wrap.tasks = wrap.tasks || [];');
                        f.push('wrap.tasks.push(setTimeout(function() {');
                    }

                    // finally call the actual handler fn
                    f.push('result = fn.call(scope || dom, e, t, options);');

                    if (options.single) {
                        f.push('evtMgr.removeListener(dom, ename, fn, scope);');
                    }

                    // Fire the global idle event for all events except mousemove which is too common, and
                    // fires too frequently and fast to be use in tiggering onIdle processing. Do not fire on page unload.
                    if (ename !== 'mousemove' && ename !== 'unload') {
                        f.push('if (evtMgr.idleEvent.listeners.length) {');
                        f.push('evtMgr.idleEvent.fire();');
                        f.push('}');
                    }

                    if (options.delay) {
                        f.push('}, ' + options.delay + '));');
                    }

                    if (options.buffer) {
                        f.push('}, ' + options.buffer + ');');
                    }
                    f.push('return result;');

                    gen = Ext.cacheableFunctionFactory('e', 'options', 'fn', 'scope', 'ename', 'dom', 'wrap', 'args', 'X', 'evtMgr', f.join('\n'));
                }

                return gen.call(dom, e, options, fn, scope, ename, dom, wrap, args, Ext, EventManager);
            };
            return wrap;
        },
        
        /**
         * Gets the event cache object for a particular element
         * @private
         * @param {HTMLElement} element The element
         * @return {Object} The event cache object
         */
        getEventCache: function(element) {
            var elementCache, eventCache, id;
            
            if (!element) {
                return [];
            }

            if (element.$cache) {
                elementCache = element.$cache;
            } else {
                // getId will populate the cache for this element if it isn't already present
                if (typeof element === 'string') {
                    id = element;
                } else {
                    id = EventManager.getId(element);
                }
                elementCache = Ext.cache[id];
            }
            eventCache = elementCache.events || (elementCache.events = {});
            return eventCache;
        },

        /**
         * Get the event cache for a particular element for a particular event
         * @private
         * @param {HTMLElement} element The element
         * @param {Object} eventName The event name
         * @return {Array} The events for the element
         */
        getEventListenerCache : function(element, eventName) {
            var eventCache = EventManager.getEventCache(element);
            return eventCache[eventName] || (eventCache[eventName] = []);
        },
        
        /**
         * Clones the event cache for a particular element for a particular event
         * @private
         * @param {HTMLElement} element The element
         * @param {Object} eventName The event name
         * @return {Array} The cloned events for the element
         */
        cloneEventListenerCache: function(element, eventName){
            var eventCache = EventManager.getEventCache(element),
                out;
                
            if (eventCache[eventName]) {
                out = eventCache[eventName].slice(0);
            } else {
                out = [];
            }
            eventCache[eventName] = out;
            return out;
        },

        // --------------------- utility methods ---------------------
        mouseLeaveRe: /(mouseout|mouseleave)/,
        mouseEnterRe: /(mouseover|mouseenter)/,

        /**
         * Stop the event (preventDefault and stopPropagation)
         * @param {Event} event The event to stop
         */
        stopEvent: function(event) {
            EventManager.stopPropagation(event);
            EventManager.preventDefault(event);
        },

        /**
         * Cancels bubbling of the event.
         * @param {Event} event The event to stop bubbling.
         */
        stopPropagation: function(event) {
            event = event.browserEvent || event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        /**
         * Prevents the browsers default handling of the event.
         * @param {Event} event The event to prevent the default
         */
        preventDefault: function(event) {
            event = event.browserEvent || event;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
                // Some keys events require setting the keyCode to -1 to be prevented
                try {
                  // all ctrl + X and F1 -> F12
                  if (event.ctrlKey || event.keyCode > 111 && event.keyCode < 124) {
                      event.keyCode = -1;
                  }
                } catch (e) {
                    // see this outdated document http://support.microsoft.com/kb/934364/en-us for more info
                }
            }
        },

        /**
         * Gets the related target from the event.
         * @param {Object} event The event
         * @return {HTMLElement} The related target.
         */
        getRelatedTarget: function(event) {
            event = event.browserEvent || event;
            var target = event.relatedTarget;
            if (!target) {
                if (EventManager.mouseLeaveRe.test(event.type)) {
                    target = event.toElement;
                } else if (EventManager.mouseEnterRe.test(event.type)) {
                    target = event.fromElement;
                }
            }
            return EventManager.resolveTextNode(target);
        },

        /**
         * Gets the x coordinate from the event
         * @param {Object} event The event
         * @return {Number} The x coordinate
         */
        getPageX: function(event) {
            return EventManager.getPageXY(event)[0];
        },

        /**
         * Gets the y coordinate from the event
         * @param {Object} event The event
         * @return {Number} The y coordinate
         */
        getPageY: function(event) {
            return EventManager.getPageXY(event)[1];
        },

        /**
         * Gets the x & y coordinate from the event
         * @param {Object} event The event
         * @return {Number[]} The x/y coordinate
         */
        getPageXY: function(event) {
            event = event.browserEvent || event;
            var x = event.pageX,
                y = event.pageY,
                docEl = doc.documentElement,
                body = doc.body;

            // pageX/pageY not available (undefined, not null), use clientX/clientY instead
            if (!x && x !== 0) {
                x = event.clientX + (docEl && docEl.scrollLeft || body && body.scrollLeft || 0) - (docEl && docEl.clientLeft || body && body.clientLeft || 0);
                y = event.clientY + (docEl && docEl.scrollTop  || body && body.scrollTop  || 0) - (docEl && docEl.clientTop  || body && body.clientTop  || 0);
            }
            return [x, y];
        },

        /**
         * Gets the target of the event.
         * @param {Object} event The event
         * @return {HTMLElement} target
         */
        getTarget: function(event) {
            event = event.browserEvent || event;
            return EventManager.resolveTextNode(event.target || event.srcElement);
        },

        // technically no need to browser sniff this, however it makes
        // no sense to check this every time, for every event, whether
        // the string is equal.
        /**
         * Resolve any text nodes accounting for browser differences.
         * @private
         * @param {HTMLElement} node The node
         * @return {HTMLElement} The resolved node
         */
        resolveTextNode: Ext.isGecko ?
            function(node) {
                if (node) {
                    // work around firefox bug, https://bugzilla.mozilla.org/show_bug.cgi?id=101197
                    var s = HTMLElement.prototype.toString.call(node);
                    if (s !== '[xpconnect wrapped native prototype]' && s !== '[object XULElement]') {
                        return node.nodeType == 3 ? node.parentNode: node;
                    }
                }
            }
            :
            function(node) {
                return node && node.nodeType == 3 ? node.parentNode: node;
            },

        // --------------------- custom event binding ---------------------

        // Keep track of the current width/height
        curWidth: 0,
        curHeight: 0,

        /**
         * Adds a listener to be notified when the browser window is resized and provides resize event buffering (100 milliseconds),
         * passes new viewport width and height to handlers.
         * @param {Function} fn      The handler function the window resize event invokes.
         * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
         * @param {Boolean}  [options] Options object as passed to {@link Ext.Element#addListener}
         */
        onWindowResize: function(fn, scope, options) {
            var resize = EventManager.resizeEvent;

            if (!resize) {
                EventManager.resizeEvent = resize = new Ext.util.Event();
                EventManager.on(win, 'resize', EventManager.fireResize, null, {buffer: 100});
            }
            resize.addListener(fn, scope, options);
        },

        /**
         * Fire the resize event.
         * @private
         */
        fireResize: function() {
            var w = Ext.Element.getViewWidth(),
                h = Ext.Element.getViewHeight();

             //whacky problem in IE where the resize event will sometimes fire even though the w/h are the same.
             if (EventManager.curHeight != h || EventManager.curWidth != w) {
                 EventManager.curHeight = h;
                 EventManager.curWidth = w;
                 EventManager.resizeEvent.fire(w, h);
             }
        },

        /**
         * Removes the passed window resize listener.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    The scope of handler
         */
        removeResizeListener: function(fn, scope) {
            var resize = EventManager.resizeEvent;
            if (resize) {
                resize.removeListener(fn, scope);
            }
        },

        /**
         * Adds a listener to be notified when the browser window is unloaded.
         * @param {Function} fn      The handler function the window unload event invokes.
         * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
         * @param {Boolean}  options Options object as passed to {@link Ext.Element#addListener}
         */
        onWindowUnload: function(fn, scope, options) {
            var unload = EventManager.unloadEvent;

            if (!unload) {
                EventManager.unloadEvent = unload = new Ext.util.Event();
                EventManager.addListener(win, 'unload', EventManager.fireUnload);
            }
            if (fn) {
                unload.addListener(fn, scope, options);
            }
        },

        /**
         * Fires the unload event for items bound with onWindowUnload
         * @private
         */
        fireUnload: function() {
            // wrap in a try catch, could have some problems during unload
            try {
                // relinquish references.
                doc = win = undefined;

                var gridviews, i, ln,
                    el, cache;

                EventManager.unloadEvent.fire();
                // Work around FF3 remembering the last scroll position when refreshing the grid and then losing grid view
                if (Ext.isGecko3) {
                    gridviews = Ext.ComponentQuery.query('gridview');
                    i = 0;
                    ln = gridviews.length;
                    for (; i < ln; i++) {
                        gridviews[i].scrollToTop();
                    }
                }
                // Purge all elements in the cache
                cache = Ext.cache;

                for (el in cache) {
                    if (cache.hasOwnProperty(el)) {
                        EventManager.removeAll(el);
                    }
                }
            } catch(e) {
            }
        },

        /**
         * Removes the passed window unload listener.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    The scope of handler
         */
        removeUnloadListener: function(fn, scope) {
            var unload = EventManager.unloadEvent;
            if (unload) {
                unload.removeListener(fn, scope);
            }
        },

        /**
         * note 1: IE fires ONLY the keydown event on specialkey autorepeat
         * note 2: Safari < 3.1, Gecko (Mac/Linux) & Opera fire only the keypress event on specialkey autorepeat
         * (research done by Jan Wolter at http://unixpapa.com/js/key.html)
         * @private
         */
        useKeyDown: Ext.isWebKit ?
                       parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525 :
                       !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera),

        /**
         * Indicates which event to use for getting key presses.
         * @return {String} The appropriate event name.
         */
        getKeyEvent: function() {
            return EventManager.useKeyDown ? 'keydown' : 'keypress';
        }
    });

    // route "< ie9-Standards" to a legacy IE onReady implementation
    if(!supportsAddEventListener && document.attachEvent) {
        Ext.apply( EventManager, {
            /* Customized implementation for Legacy IE.  The default implementation is configured for use
             *  with all other 'standards compliant' agents.
             *  References: http://javascript.nwbox.com/IEContentLoaded/
             *  licensed courtesy of http://developer.yahoo.com/yui/license.html
             */

            /**
             * This strategy has minimal benefits for Sencha solutions that build themselves (ie. minimal initial page markup).
             * However, progressively-enhanced pages (with image content and/or embedded frames) will benefit the most from it.
             * Browser timer resolution is too poor to ensure a doScroll check more than once on a page loaded with minimal
             * assets (the readystatechange event 'complete' usually beats the doScroll timer on a 'lightly-loaded' initial document).
             */
            pollScroll : function() {
                var scrollable = true;

                try {
                    document.documentElement.doScroll('left');
                } catch(e) {
                    scrollable = false;
                }

                // on IE8, when running within an iFrame, document.body is not immediately available
                if (scrollable && document.body) {
                    EventManager.onReadyEvent({
                        type:'doScroll'
                    });
                } else {
                    /*
                     * minimize thrashing --
                     * adjusted for setTimeout's close-to-minimums (not too low),
                     * as this method SHOULD always be called once initially
                     */
                    EventManager.scrollTimeout = setTimeout(EventManager.pollScroll, 20);
                }

                return scrollable;
            },

            /**
             * Timer for doScroll polling
             * @private
             */
            scrollTimeout: null,

            /* @private
             */
            readyStatesRe  : /complete/i,

            /* @private
             */
            checkReadyState: function() {
                var state = document.readyState;

                if (EventManager.readyStatesRe.test(state)) {
                    EventManager.onReadyEvent({
                        type: state
                    });
                }
            },

            bindReadyEvent: function() {
                var topContext = true;

                if (EventManager.hasBoundOnReady) {
                    return;
                }

                //are we in an IFRAME? (doScroll ineffective here)
                try {
                    topContext = window.frameElement === undefined;
                } catch(e) {
                    // If we throw an exception, it means we're probably getting access denied,
                    // which means we're in an iframe cross domain.
                    topContext = false;
                }

                if (!topContext || !doc.documentElement.doScroll) {
                    EventManager.pollScroll = Ext.emptyFn;   //then noop this test altogether
                }

                // starts doScroll polling if necessary
                if (EventManager.pollScroll() === true) {
                    return;
                }

                // Core is loaded AFTER initial document write/load ?
                if (doc.readyState == 'complete' )  {
                    EventManager.onReadyEvent({type: 'already ' + (doc.readyState || 'body') });
                } else {
                    doc.attachEvent('onreadystatechange', EventManager.checkReadyState);
                    window.attachEvent('onload', EventManager.onReadyEvent);
                    EventManager.hasBoundOnReady = true;
                }
            },

            onReadyEvent : function(e) {
                if (e && e.type) {
                    EventManager.onReadyChain.push(e.type);
                }

                if (EventManager.hasBoundOnReady) {
                    document.detachEvent('onreadystatechange', EventManager.checkReadyState);
                    window.detachEvent('onload', EventManager.onReadyEvent);
                }

                if (Ext.isNumber(EventManager.scrollTimeout)) {
                    clearTimeout(EventManager.scrollTimeout);
                    delete EventManager.scrollTimeout;
                }

                if (!Ext.isReady) {
                    EventManager.fireDocReady();
                }
            },

            //diags: a list of event types passed to onReadyEvent (in chron order)
            onReadyChain : []
        });
    }


    /**
     * Adds a function to be called when the DOM is ready, and all required classes have been loaded.
     * 
     * If the DOM is ready and all classes are loaded, the passed function is executed immediately.
     * @member Ext
     * @method onReady
     * @param {Function} fn The function callback to be executed
     * @param {Object} scope The execution scope (`this` reference) of the callback function
     * @param {Object} options The options to modify the listener as passed to {@link Ext.util.Observable#addListener addListener}.
     */
    Ext.onReady = function(fn, scope, options) {
        Ext.Loader.onReady(fn, scope, true, options);
    };

    /**
     * @member Ext
     * @method onDocumentReady
     * @inheritdoc Ext.EventManager#onDocumentReady
     */
    Ext.onDocumentReady = EventManager.onDocumentReady;

    /**
     * @member Ext.EventManager
     * @method on
     * @inheritdoc Ext.EventManager#addListener
     */
    EventManager.on = EventManager.addListener;

    /**
     * @member Ext.EventManager
     * @method un
     * @inheritdoc Ext.EventManager#removeListener
     */
    EventManager.un = EventManager.removeListener;

    Ext.onReady(initExtCss);
};
