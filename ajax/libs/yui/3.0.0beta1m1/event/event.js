/**
 * DOM event listener abstraction layer
 * @module event
 */

(function() {

// Unlike most of the library, this code has to be executed as soon as it is
// introduced into the page -- and it should only be executed one time
// regardless of the number of instances that use it.

var GLOBAL_ENV = YUI.Env, 

    C = YUI.config, 

    D = C.doc, 

    POLL_INTERVAL = C.pollInterval || 20,

    _ready = function(e) {
        GLOBAL_ENV._ready();
    };

    if (!GLOBAL_ENV._ready) {

        GLOBAL_ENV.windowLoaded = false;

        GLOBAL_ENV._ready = function() {
            if (!GLOBAL_ENV.DOMReady) {
                GLOBAL_ENV.DOMReady=true;

                // Remove the DOMContentLoaded (FF/Opera)
                if (D.removeEventListener) {
                    D.removeEventListener("DOMContentLoaded", _ready, false);
                }
            }
        };

        // create custom event

        /////////////////////////////////////////////////////////////
        // DOMReady
        // based on work by: Dean Edwards/John Resig/Matthias Miller 

        // Internet Explorer: use the readyState of a defered script.
        // This isolates what appears to be a safe moment to manipulate
        // the DOM prior to when the document's readyState suggests
        // it is safe to do so.
        if (navigator.userAgent.match(/MSIE/)) {

            GLOBAL_ENV._dri = setInterval(function() {
                try {
                    // throws an error if doc is not ready
                    document.documentElement.doScroll('left');
                    clearInterval(GLOBAL_ENV._dri);
                    GLOBAL_ENV._dri = null;
                    _ready();
                } catch (ex) { 
                }
            }, POLL_INTERVAL); 

        // FireFox and Opera: These browsers provide a event for this
        // moment.  The latest WebKit releases now support this event.
        } else {
            D.addEventListener("DOMContentLoaded", _ready, false);
        }

        /////////////////////////////////////////////////////////////
    }

})();
YUI.add('event', function(Y) {

(function() {
/**
 * DOM event listener abstraction layer
 * @module event
 */

var GLOBAL_ENV = YUI.Env,

    yready = function() {
        Y.fire('domready');
    };

Y.mix(Y.Env.eventAdaptors, {

    /**
     * Executes the supplied callback when the DOM is first usable.  This
     * will execute immediately if called after the DOMReady event has
     * fired.   @todo the DOMContentReady event does not fire when the
     * script is dynamically injected into the page.  This means the
     * DOMReady custom event will never fire in FireFox or Opera when the
     * library is injected.  It _will_ fire in Safari, and the IE 
     * implementation would allow for us to fire it if the defered script
     * is not available.  We want this to behave the same in all browsers.
     * Is there a way to identify when the script has been injected 
     * instead of included inline?  Is there a way to know whether the 
     * window onload event has fired without having had a listener attached 
     * to it when it did so?
     *
     * <p>The callback is a Event.Custom, so the signature is:</p>
     * <p>type &lt;string&gt;, args &lt;array&gt;, customobject &lt;object&gt;</p>
     * <p>For DOMReady events, there are no fire argments, so the
     * signature is:</p>
     * <p>"DOMReady", [], obj</p>
     *
     *
     * @event domready
     * @for YUI
     *
     * @param {function} fn what to execute when the element is found.
     * @optional context execution context
     * @optional args 0..n arguments to send to the listener
     *
     */
    domready: {},

    /**
     * Use domready event instead. @see domready
     * @event event:ready
     * @for YUI
     * @deprecated use 'domready' instead
     */
    'event:ready': {

        on: function() {
            var a = Y.Array(arguments, 0, true);
            a[0] = 'domready';
            return Y.subscribe.apply(Y, a);
        },

        detach: function() {
            var a = Y.Array(arguments, 0, true);
            a[0] = 'domready';
            return Y.unsubscribe.apply(Y, a);
        }
    }

});


Y.publish('domready', {
    fireOnce: true
});

if (GLOBAL_ENV.DOMReady) {
    yready();
} else {
    Y.before(yready, GLOBAL_ENV, "_ready");
}

})();
(function() {
/**
 * DOM event listener abstraction layer
 * @module event
 */

/**
 * The event utility provides functions to add and remove event listeners,
 * event cleansing.  It also tries to automatically remove listeners it
 * registers during the unload event.
 *
 * @class Event
 * @static
 */

var add = function(el, type, fn, capture) {
    if (el.addEventListener) {
            el.addEventListener(type, fn, !!capture);
    } else if (el.attachEvent) {
            el.attachEvent("on" + type, fn);
    } 
},

remove = function(el, type, fn, capture) {
    if (el.removeEventListener) {
            el.removeEventListener(type, fn, !!capture);
    } else if (el.detachEvent) {
            el.detachEvent("on" + type, fn);
    }
},

onLoad = function() {
    YUI.Env.windowLoaded = true;
    Y.Event._load();
    remove(window, "load", onLoad);
},

onUnload = function() {
    Y.Event._unload();
    remove(window, "unload", onUnload);
},

EVENT_READY = 'domready',

COMPAT_ARG = '~yui|2|compat~',

CAPTURE = "capture_",

Event = function() {

    /**
     * True after the onload event has fired
     * @property _loadComplete
     * @type boolean
     * @static
     * @private
     */
    var _loadComplete =  false,

    /**
     * The number of times to poll after window.onload.  This number is
     * increased if additional late-bound handlers are requested after
     * the page load.
     * @property _retryCount
     * @static
     * @private
     */
    _retryCount = 0,

    /**
     * onAvailable listeners
     * @property _avail
     * @static
     * @private
     */
    _avail = [],

    /**
     * Custom event wrappers for DOM events.  Key is 
     * 'event:' + Element uid stamp + event type
     * @property _wrappers
     * @type Y.Event.Custom
     * @static
     * @private
     */
    _wrappers = {},

    _windowLoadKey = null,

    /**
     * Custom event wrapper map DOM events.  Key is 
     * Element uid stamp.  Each item is a hash of custom event
     * wrappers as provided in the _wrappers collection.  This
     * provides the infrastructure for getListeners.
     * @property _el_events
     * @static
     * @private
     */
    _el_events = {};

    return {

        /**
         * The number of times we should look for elements that are not
         * in the DOM at the time the event is requested after the document
         * has been loaded.  The default is 2000@amp;20 ms, so it will poll
         * for 40 seconds or until all outstanding handlers are bound
         * (whichever comes first).
         * @property POLL_RETRYS
         * @type int
         * @static
         * @final
         */
        POLL_RETRYS: 2000,

        /**
         * The poll interval in milliseconds
         * @property POLL_INTERVAL
         * @type int
         * @static
         * @final
         */
        POLL_INTERVAL: 20,

        /**
         * addListener/removeListener can throw errors in unexpected scenarios.
         * These errors are suppressed, the method returns false, and this property
         * is set
         * @property lastError
         * @static
         * @type Error
         */
        lastError: null,


        /**
         * poll handle
         * @property _interval
         * @static
         * @private
         */
        _interval: null,

        /**
         * document readystate poll handle
         * @property _dri
         * @static
         * @private
         */
         _dri: null,

        /**
         * True when the document is initially usable
         * @property DOMReady
         * @type boolean
         * @static
         */
        DOMReady: false,

        /**
         * @method startInterval
         * @static
         * @private
         */
        startInterval: function() {
            var E = Y.Event;

            if (!E._interval) {
E._interval = setInterval(Y.bind(E._tryPreloadAttach, E), E.POLL_INTERVAL);
            }
        },

        /**
         * Executes the supplied callback when the item with the supplied
         * id is found.  This is meant to be used to execute behavior as
         * soon as possible as the page loads.  If you use this after the
         * initial page load it will poll for a fixed time for the element.
         * The number of times it will poll and the frequency are
         * configurable.  By default it will poll for 10 seconds.
         *
         * <p>The callback is executed with a single parameter:
         * the custom object parameter, if provided.</p>
         *
         * @method onAvailable
         *
         * @param {string||string[]}   id the id of the element, or an array
         * of ids to look for.
         * @param {function} fn what to execute when the element is found.
         * @param {object}   p_obj an optional object to be passed back as
         *                   a parameter to fn.
         * @param {boolean|object}  p_override If set to true, fn will execute
         *                   in the context of p_obj, if set to an object it
         *                   will execute in the context of that object
         * @param checkContent {boolean} check child node readiness (onContentReady)
         * @static
         * @deprecated Use Y.on("available")
         */
        // @TODO fix arguments
        onAvailable: function(id, fn, p_obj, p_override, checkContent, compat) {

            var a = Y.Array(id), i;


            for (i=0; i<a.length; i=i+1) {
                _avail.push({ 
                    id:         a[i], 
                    fn:         fn, 
                    obj:        p_obj, 
                    override:   p_override, 
                    checkReady: checkContent,
                    compat:     compat 
                });
            }
            _retryCount = this.POLL_RETRYS;

            // We want the first test to be immediate, but async
            setTimeout(Y.bind(Y.Event._tryPreloadAttach, Y.Event), 0);

            return new Y.EventHandle(); // @TODO by id needs a defered handle
        },

        /**
         * Works the same way as onAvailable, but additionally checks the
         * state of sibling elements to determine if the content of the
         * available element is safe to modify.
         *
         * <p>The callback is executed with a single parameter:
         * the custom object parameter, if provided.</p>
         *
         * @method onContentReady
         *
         * @param {string}   id the id of the element to look for.
         * @param {function} fn what to execute when the element is ready.
         * @param {object}   p_obj an optional object to be passed back as
         *                   a parameter to fn.
         * @param {boolean|object}  p_override If set to true, fn will execute
         *                   in the context of p_obj.  If an object, fn will
         *                   exectute in the context of that object
         *
         * @static
         * @deprecated Use Y.on("contentready")
         */
        // @TODO fix arguments
        onContentReady: function(id, fn, p_obj, p_override, compat) {
            return this.onAvailable(id, fn, p_obj, p_override, true, compat);
        },


        /**
         * Appends an event handler
         *
         * @method attach
         *
         * @param {String}   type     The type of event to append
         * @param {Function} fn        The method the event invokes
         * @param {String|HTMLElement|Array|NodeList} el An id, an element 
         *  reference, or a collection of ids and/or elements to assign the 
         *  listener to.
         * @param {Object}   obj    An arbitrary object that will be 
         *                             passed as a parameter to the handler
         * @param {Boolean|object}  args 0..n arguments to pass to the callback
         * @return {Boolean} True if the action was successful or defered,
         *                        false if one or more of the elements 
         *                        could not have the listener attached,
         *                        or if the operation throws an exception.
         * @static
         */
        attach: function(type, fn, el, obj) {

            el = el || Y.config.win;

            // var a=Y.Array(arguments, 1, true), override=a[3], E=Y.Event, aa=Y.Array(arguments, 0, true);

            var args=Y.Array(arguments, 0, true), 
                trimmedArgs=args.slice(1),
                compat, E=Y.Event, capture = false,
                handles, oEl, size, ek, key, cewrapper, context;

            if (type.indexOf(CAPTURE) > -1) {
                type = type.substr(CAPTURE.length);
                capture = true;
            }

            if (trimmedArgs[trimmedArgs.length-1] === COMPAT_ARG) {
                compat = true;
                trimmedArgs.pop();
            }

            if (!fn || !fn.call) {
// throw new TypeError(type + " attach call failed, callback undefined");
                return false;
            }

            // The el argument can be an array of elements or element ids.
            if (this._isValidCollection(el)) {


                handles=[];
                
                Y.each(el, function(v, k) {
                    args[2] = v;
                    handles.push(E.attach.apply(E, args));
                });

                return (handles.length === 1) ? handles[0] : handles;


            } else if (Y.Lang.isString(el)) {

                oEl = (compat) ? Y.DOM.byId(el) : Y.all(el);

                // If the el argument is a string, we assume it is 
                // actually the id of the element.  If the page is loaded
                // we convert el to the actual element, otherwise we 
                // defer attaching the event until onload event fires

                // check to see if we need to delay hooking up the event 
                // until after the page loads.

                // Node collection
                // if (oEl && oEl.size && oEl.size() > 0) {
                //

                /*
                if (oEl) {
                    el = oEl;
                */

                if (oEl && (oEl instanceof Y.NodeList) && oEl.size() > 0) {
                    size = oEl.size();
                    if (size > 1) {
                        // args[0] = oEl;
                        args[2] = oEl;
                        return E.attach.apply(E, args);
                    } else {
                        el = oEl.item(0);
                        // el = oEl;
                    }

                // HTMLElement
                // } else if (compat && oEl) {
                } else if (oEl) {
                    el = oEl;

                // Not found = defer adding the event until the element is available
                } else {


                    return this.onAvailable(el, function() {
                        E.attach.apply(E, args);
                    }, E, true, false, compat);
                }
            }

            // Element should be an html element or an array if we get here.
            if (!el) {
                return false;
            }

            // the custom event key is the uid for the element + type

            ek = Y.stamp(el); 
            key = 'event:' + ek + type;
            cewrapper = _wrappers[key];


            if (!cewrapper) {
                // create CE wrapper
                cewrapper = Y.publish(key, {
                    silent: true,
                    // host: this,
                    bubbles: false
                });

                // cache the dom event details in the custom event
                // for later removeListener calls
                cewrapper.el = el;
                cewrapper.type = type;
                cewrapper.fn = function(e) {
                    cewrapper.fire(E.getEvent(e, el, compat));
                };

                if (el == Y.config.win && type == "load") {
                    // window load happens once
                    cewrapper.fireOnce = true;
                    _windowLoadKey = key;

                    // if the load is complete, fire immediately.
                    // all subscribers, including the current one
                    // will be notified.
                    if (YUI.Env.windowLoaded) {
                        cewrapper.fire();
                    }
                }

                _wrappers[key] = cewrapper;
                _el_events[ek] = _el_events[ek] || {};
                _el_events[ek][key] = cewrapper;

                // var capture = (Y.lang.isObject(obj) && obj.capture);
                // attach a listener that fires the custom event

                add(el, type, cewrapper.fn, capture);
            }

            // switched from obj to trimmedArgs[2] to deal with appened compat param
            context = trimmedArgs[2] || ((compat) ? el : Y.get(el));
            
            // set the context as the second arg to subscribe
            trimmedArgs[1] = context;

            // remove the 'obj' param
            trimmedArgs.splice(2, 1);

            // set context to the Node if not specified
            return cewrapper.subscribe.apply(cewrapper, trimmedArgs);

        },

        /**
         * Removes an event listener.  Supports the signature the event was bound
         * with, but the preferred way to remove listeners is using the handle
         * that is returned when using Y.on
         *
         * @method detach
         *
         * @param {String|HTMLElement|Array|NodeList} el An id, an element 
         *  reference, or a collection of ids and/or elements to remove
         *  the listener from.
         * @param {String} type the type of event to remove.
         * @param {Function} fn the method the event invokes.  If fn is
         *  undefined, then all event handlers for the type of event are *  removed.
         * @return {boolean} true if the unbind was successful, false *  otherwise.
         * @static
         */
        detach: function(type, fn, el, obj) {

            var args=Y.Array(arguments, 0, true), compat, i, len, ok,
                id, ce;

            if (args[args.length-1] === COMPAT_ARG) {
                compat = true;
                // args.pop();
            }

            if (type && type.detach) {
                return type.detach();
            }


            // The el argument can be a string
            if (typeof el == "string") {

                el = (compat) ? Y.DOM.byId(el) : Y.all(el);

            // The el argument can be an array of elements or element ids.
            } else if ( this._isValidCollection(el)) {

                ok = true;
                for (i=0, len=el.length; i<len; ++i) {
                    args[2] = el[i];
                    ok = ( Y.Event.detach.apply(Y.Event, args) && ok );
                }

                return ok;

            }

            if (!fn || !fn.call) {
                return this.purgeElement(el, false, type);
            }

            id = 'event:' + Y.stamp(el) + type;
            ce = _wrappers[id];

            if (ce) {
                return ce.unsubscribe(fn);
            } else {
                return false;
            }

        },

        /**
         * Finds the event in the window object, the caller's arguments, or
         * in the arguments of another method in the callstack.  This is
         * executed automatically for events registered through the event
         * manager, so the implementer should not normally need to execute
         * this function at all.
         * @method getEvent
         * @param {Event} e the event parameter from the handler
         * @param {HTMLElement} el the element the listener was attached to
         * @return {Event} the event 
         * @static
         */
        getEvent: function(e, el, noFacade) {
            var ev = e || window.event;

            return (noFacade) ? ev : 
                new Y.Event.Facade(ev, el, _wrappers['event:' + Y.stamp(el) + e.type]);
        },

        /**
         * Generates an unique ID for the element if it does not already 
         * have one.
         * @method generateId
         * @param el the element to create the id for
         * @return {string} the resulting id of the element
         * @static
         */
        generateId: function(el) {
            var id = el.id;

            if (!id) {
                id = Y.stamp(el);
                el.id = id;
            }

            return id;
        },

        /**
         * We want to be able to use getElementsByTagName as a collection
         * to attach a group of events to.  Unfortunately, different 
         * browsers return different types of collections.  This function
         * tests to determine if the object is array-like.  It will also 
         * fail if the object is an array, but is empty.
         * @method _isValidCollection
         * @param o the object to test
         * @return {boolean} true if the object is array-like and populated
         * @static
         * @private
         */
        _isValidCollection: function(o) {
            try {
                 
                // if (o instanceof Y.Node) {
                    // o.tagName ="adsf";
                // }

                return ( o                     && // o is something
                         typeof o !== "string" && // o is not a string
                         // o.length  && // o is indexed
                         (o.length && ((!o.size) || (o.size() > 1)))  && // o is indexed
                         !o.tagName            && // o is not an HTML element
                         !o.alert              && // o is not a window
                         (o.item || typeof o[0] !== "undefined") );
            } catch(ex) {
                return false;
            }

        },

        /**
         * hook up any deferred listeners
         * @method _load
         * @static
         * @private
         */
        _load: function(e) {

            if (!_loadComplete) {


                _loadComplete = true;

                // Just in case DOMReady did not go off for some reason
                // E._ready();
                if (Y.fire) {
                    Y.fire(EVENT_READY);
                }

                // Available elements may not have been detected before the
                // window load event fires. Try to find them now so that the
                // the user is more likely to get the onAvailable notifications
                // before the window load notification
                Y.Event._tryPreloadAttach();

            }
        },

        /**
         * Polling function that runs before the onload event fires, 
         * attempting to attach to DOM Nodes as soon as they are 
         * available
         * @method _tryPreloadAttach
         * @static
         * @private
         */
        _tryPreloadAttach: function() {

            if (this.locked) {
                return;
            }

            if (Y.UA.ie && !YUI.Env.DOMReady) {
                // Hold off if DOMReady has not fired and check current
                // readyState to protect against the IE operation aborted
                // issue.
                this.startInterval();
                return;
            }

            this.locked = true;


            // keep trying until after the page is loaded.  We need to 
            // check the page load state prior to trying to bind the 
            // elements so that we can be certain all elements have been 
            // tested appropriately
            var tryAgain = !_loadComplete, notAvail, executeItem,
                i, len, item, el;

            if (!tryAgain) {
                tryAgain = (_retryCount > 0);
            }

            // onAvailable
            notAvail = [];

            executeItem = function (el, item) {

                var context, ov = item.override;

                if (item.compat) {

                    if (item.override) {
                        if (ov === true) {
                            context = item.obj;
                        } else {
                            context = ov;
                        }
                    } else {
                        context = el;
                    }

                    item.fn.call(context, item.obj);

                } else {
                    context = item.obj || Y.get(el);
                    item.fn.apply(context, (Y.Lang.isArray(ov)) ? ov : []);
                }

            };


            // onAvailable
            for (i=0,len=_avail.length; i<len; ++i) {
                item = _avail[i];
                if (item && !item.checkReady) {

                    el = (item.compat) ? Y.DOM.byId(item.id) : Y.get(item.id);

                    if (el) {
                        executeItem(el, item);
                        _avail[i] = null;
                    } else {
                        notAvail.push(item);
                    }
                }
            }

            // onContentReady
            for (i=0,len=_avail.length; i<len; ++i) {
                item = _avail[i];
                if (item && item.checkReady) {

                    el = (item.compat) ? Y.DOM.byId(item.id) : Y.get(item.id);

                    if (el) {
                        // The element is available, but not necessarily ready
                        // @todo should we test parentNode.nextSibling?
                        if (_loadComplete || (el.get && el.get('nextSibling')) || el.nextSibling) {
                            executeItem(el, item);
                            _avail[i] = null;
                        }
                    } else {
                        notAvail.push(item);
                    }
                }
            }

            _retryCount = (notAvail.length === 0) ? 0 : _retryCount - 1;

            if (tryAgain) {
                // we may need to strip the nulled out items here
                this.startInterval();
            } else {
                clearInterval(this._interval);
                this._interval = null;
            }

            this.locked = false;

            return;

        },

        /**
         * Removes all listeners attached to the given element via addListener.
         * Optionally, the node's children can also be purged.
         * Optionally, you can specify a specific type of event to remove.
         * @method purgeElement
         * @param {HTMLElement} el the element to purge
         * @param {boolean} recurse recursively purge this element's children
         * as well.  Use with caution.
         * @param {string} type optional type of listener to purge. If
         * left out, all listeners will be removed
         * @static
         */
        purgeElement: function(el, recurse, type) {
            var oEl = (Y.Lang.isString(el)) ? Y.get(el) : el,
                lis = this.getListeners(oEl, type), i, len;
            if (lis) {
                for (i=0,len=lis.length; i<len ; ++i) {
                    lis[i].unsubscribeAll();
                }
            }

            if (recurse && oEl && oEl.childNodes) {
                for (i=0,len=oEl.childNodes.length; i<len ; ++i) {
                    this.purgeElement(oEl.childNodes[i], recurse, type);
                }
            }
        },

        /**
         * Returns all listeners attached to the given element via addListener.
         * Optionally, you can specify a specific type of event to return.
         * @method getListeners
         * @param el {HTMLElement|string} the element or element id to inspect 
         * @param type {string} optional type of listener to return. If
         * left out, all listeners will be returned
         * @return {Y.Custom.Event} the custom event wrapper for the DOM event(s)
         * @static
         */           
        getListeners: function(el, type) {
            var ek = Y.stamp(el, true), evts = _el_events[ek],
                results=[] , key = (type) ? 'event:' + type : null;

            if (!evts) {
                return null;
            }


            if (key) {
                if (evts[key]) {
                    results.push(evts[key]);
                }
            } else {
                Y.each(evts, function(v, k) {
                    results.push(v);
                });
            }

            return (results.length) ? results : null;
        },

        /**
         * Removes all listeners registered by pe.event.  Called 
         * automatically during the unload event.
         * @method _unload
         * @static
         * @private
         */
        _unload: function(e) {

            var E = Y.Event;

            Y.each(_wrappers, function(v, k) {
                v.unsubscribeAll();
                remove(v.el, v.type, v.fn);
                delete _wrappers[k];
            });

            remove(window, "load", E._load);
            remove(window, "unload", E._unload);
        },

        
        /**
         * Adds a DOM event directly without the caching, cleanup, context adj, etc
         *
         * @method nativeAdd
         * @param {HTMLElement} el      the element to bind the handler to
         * @param {string}      type   the type of event handler
         * @param {function}    fn      the callback to invoke
         * @param {boolen}      capture capture or bubble phase
         * @static
         * @private
         */
        nativeAdd: add,

        /**
         * Basic remove listener
         *
         * @method nativeRemove
         * @param {HTMLElement} el      the element to bind the handler to
         * @param {string}      type   the type of event handler
         * @param {function}    fn      the callback to invoke
         * @param {boolen}      capture capture or bubble phase
         * @static
         * @private
         */
        nativeRemove: remove
    };

}();

add(window, "load", onLoad);
add(window, "unload", onUnload);

Y.Event = Event;

// Process onAvailable/onContentReady items when when the DOM is ready in IE
if (Y.UA.ie && Y.on) {
    Y.on(EVENT_READY, Event._tryPreloadAttach, Event, true);
}

Event.Custom = Y.CustomEvent;
Event.Subscriber = Y.Subscriber;
Event.Target = Y.EventTarget;
Event.Handle = Y.EventHandle;
Event.Facade = Y.EventFacade;

Event._tryPreloadAttach();

})();
/**
 * Executes the callback as soon as the specified element 
 * is detected in the DOM.
 * @for YUI
 * @event available
 */
Y.Env.eventAdaptors.available = {
    on: function(type, fn, id, o) {
        var a = arguments.length > 4 ?  Y.Array(arguments, 4, true) : [];
        return Y.Event.onAvailable.call(Y.Event, id, fn, o, a);
    }
};

/**
 * Executes the callback as soon as the specified element 
 * is detected in the DOM with a nextSibling property
 * (indicating that the element's children are available)
 * @for YUI
 * @event contentready
 */
Y.Env.eventAdaptors.contentready = {
    on: function(type, fn, id, o) {
        var a = arguments.length > 4 ?  Y.Array(arguments, 4, true) : [];
        return Y.Event.onContentReady.call(Y.Event, id, fn, o, a);
    }
};
(function() {

var FOCUS   = Y.UA.ie ? "focusin" : "focus",
    BLUR    = Y.UA.ie ? "focusout" : "blur",
    CAPTURE = "capture_",
    adapt = Y.Env.eventAdaptors;


/**
 * Adds a DOM focus listener.  Uses the focusin event in IE,
 * and the capture phase otherwise so that
 * the event propagates properly.
 * @for YUI
 * @event focus
 */
adapt.focus = {
    on: function() {
        var a = Y.Array(arguments, 0, true);
        a[0] = CAPTURE + FOCUS;
        return Y.Event.attach.apply(Y.Event, a);
    },

    detach: function() {
        var a = Y.Array(arguments, 0, true);
        a[0] = CAPTURE + FOCUS;
        return Y.Event.detach.apply(Y.Event, a);

    }
};

/**
 * Adds a DOM focus listener.  Uses the focusout event in IE,
 * and the capture phase otherwise so that
 * the event propagates properly.
 * @for YUI
 * @event blur
 */
adapt.blur = {
    on: function() {
        var a = Y.Array(arguments, 0, true);
        a[0] = CAPTURE + BLUR;
        return Y.Event.attach.apply(Y.Event, a);
    },

    detach: function() {
        var a = Y.Array(arguments, 0, true);
        a[0] = CAPTURE + BLUR;
        return Y.Event.detach.apply(Y.Event, a);
    }
};

})();
/**
 * Add a key listener.  The listener will only be notified if the
 * keystroke detected meets the supplied specification.  The
 * spec consists of the key event type, followed by a colon,
 * followed by zero or more comma separated key codes, followed
 * by zero or more modifiers delimited by a plus sign.  Ex:
 * press:12,65+shift+ctrl
 * @event key
 * @for YUI
 * @param type {string} 'key'
 * @param fn {string} the function to execute
 * @param id {string} the element(s) to bind
 * @param spec {string} the keyCode and modifier specification
 * @param o optional context object
 * @param args 0..n additional arguments that should be provided 
 * to the listener.
 * @return {Event.Handle} the detach handle
 */
Y.Env.eventAdaptors.key = {

    on: function(type, fn, id, spec, o) {
        var a = Y.Array(arguments, 0, true),
            parsed, etype, criteria, ename;


        if (!spec || spec.indexOf(':') == -1) {
            a[0] = 'keypress';
            return Y.on.apply(Y, a);
        }

        parsed = spec.split(':');

        // key event type: 'down', 'up', or 'press'
        etype = parsed[0];

        // list of key codes optionally followed by modifiers
        criteria = (parsed[1]) ? parsed[1].split(/,|\+/) : null;

        // the name of the custom event that will be created for the spec
        ename = (Y.Lang.isString(id) ? id : Y.stamp(id)) + spec;

        ename = ename.replace(/,/g, '_');

        if (!Y.getEvent(ename)) {

            // subscribe spec validator to the DOM event
            Y.on(type + etype, function(e) {

                
                var passed = false, failed = false, i, crit, critInt;

                for (i=0; i<criteria.length; i=i+1) {
                    crit = criteria[i]; 
                    critInt = parseInt(crit, 10);

                    // pass this section if any supplied keyCode 
                    // is found
                    if (Y.Lang.isNumber(critInt)) {

                        if (e.charCode === critInt) {
                            passed = true;
                        } else {
                            failed = true;
                        }

                    // only check modifier if no keyCode was specified
                    // or the keyCode check was successful.  pass only 
                    // if every modifier passes
                    } else if (passed || !failed) {
                        passed = (e[crit + 'Key']);
                        failed = !passed;
                    }                    
                }

                // fire spec custom event if spec if met
                if (passed) {
                    Y.fire(ename, e);
                }

            }, id);

        }

        // subscribe supplied listener to custom event for spec validator
        // remove element and spec.
        a.splice(2, 2);
        a[0] = ename;

        return Y.on.apply(Y, a);
    }
};
/**
 * Set up a delegated listener container.
 * @event delegate
 * @param type {string} 'delegate'
 * @param fn {string} the function to execute
 * @param el {string|node} the element that is the delegation container
 * @param event {string} the event type to delegate
 * @param spec {string} a selector that must match the target of the
 * event.
 * @param o optional context object
 * @param args 0..n additional arguments that should be provided 
 * to the listener.
 * @return {Event.Handle} the detach handle
 * @for YUI
 */
Y.Env.eventAdaptors.delegate = {

    on: function(type, fn, el, event, spec, o) {

        var ename = 'delegate:' + (Y.Lang.isString(el) ? el : Y.stamp(el)) + event + spec,
            a     = Y.Array(arguments, 0, true);

        if (!Y.getEvent(ename)) {

            // set up the listener on the container
            Y.on(event, function(e) {

                var targets = e.currentTarget.queryAll(spec),
                    target  = e.target, 
                    passed  = false;

                if (targets) {

                    // @TODO we need Node.some 
                    targets.each(function (v, k) {

                        if ((!passed) && (v == target)) {
                            Y.fire(ename, e);
                            passed = true;
                        }

                    });

                }

            }, el);
        }

        a[0] = ename;

        // remove element, delegation event, and delegation spec from the args
        a.splice(2, 3);
            
        // subscribe to the custom event for the delegation spec
        return Y.on.apply(Y, a);

    }

};



}, '@VERSION@' );
