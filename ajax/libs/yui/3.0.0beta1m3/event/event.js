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

    POLL_INTERVAL = C.pollInterval || 40,

    _ready = function(e) {
        GLOBAL_ENV._ready();
    };

    if (!GLOBAL_ENV._ready) {

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
    
    adapt = Y.Env.evt.plugins,

    yready = function() {
        Y.fire('domready');
    };

Y.mix(adapt, {

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
    // console.log('DOMReady already fired', 'info', 'event');
    yready();
} else {
    // console.log('setting up before listener', 'info', 'event');
    // console.log('env: ' + YUI.Env.windowLoaded, 'info', 'event');
    Y.before(yready, GLOBAL_ENV, "_ready");
}

})();
(function() {

/**
 * Custom event engine, DOM event listener abstraction layer, synthetic DOM 
 * events.
 * @module event
 */

/**
 * Wraps a DOM event, properties requiring browser abstraction are
 * fixed here.  Provids a security layer when required.
 * @class EventFacade
 * @param ev {Event} the DOM event
 * @param currentTarget {HTMLElement} the element the listener was attached to
 * @param wrapper {Event.Custom} the custom event wrapper for this DOM event
 */

/*
 * @TODO constants? LEFTBUTTON, MIDDLEBUTTON, RIGHTBUTTON, keys
 */

/*

var whitelist = {
    altKey          : 1,
    // "button"          : 1, // we supply
    // "bubbles"         : 1, // needed?
    // "cancelable"      : 1, // needed? 
    // "charCode"        : 1, // we supply
    cancelBubble    : 1,
    // "currentTarget"   : 1, // we supply
    ctrlKey         : 1,
    clientX         : 1, // needed?
    clientY         : 1, // needed?
    detail          : 1, // not fully implemented
    // "fromElement"     : 1,
    keyCode         : 1,
    // "height"          : 1, // needed?
    // "initEvent"       : 1, // need the init events?
    // "initMouseEvent"  : 1,
    // "initUIEvent"     : 1,
    // "layerX"          : 1, // needed?
    // "layerY"          : 1, // needed?
    metaKey         : 1,
    // "modifiers"       : 1, // needed?
    // "offsetX"         : 1, // needed?
    // "offsetY"         : 1, // needed?
    // "preventDefault"  : 1, // we supply
    // "reason"          : 1, // IE proprietary
    // "relatedTarget"   : 1,
    // "returnValue"     : 1, // needed?
    shiftKey        : 1,
    // "srcUrn"          : 1, // IE proprietary
    // "srcElement"      : 1,
    // "srcFilter"       : 1, IE proprietary
    // "stopPropagation" : 1, // we supply
    // "target"          : 1,
    // "timeStamp"       : 1, // needed?
    // "toElement"       : 1,
    type            : 1,
    // "view"            : 1,
    // "which"           : 1, // we supply
    // "width"           : 1, // needed?
    x               : 1,
    y               : 1
},

*/

    var ua = Y.UA,

    /**
     * webkit key remapping required for Safari < 3.1
     * @property webkitKeymap
     * @private
     */
    webkitKeymap = {
        63232: 38, // up
        63233: 40, // down
        63234: 37, // left
        63235: 39, // right
        63276: 33, // page up
        63277: 34, // page down
        25: 9      // SHIFT-TAB (Safari provides a different key code in
                   // this case, even though the shiftKey modifier is set)
    },

    /**
     * Returns a wrapped node.  Intended to be used on event targets,
     * so it will return the node's parent if the target is a text
     * node
     * @method resolve
     * @private
     */
    resolve = function(n) {

        if (!n) {
            return null;
        }

        try {
            if (ua.webkit && 3 == n.nodeType) {
                n = n.parentNode;
            } 
        } catch(ex) { }

        return Y.Node.get(n);
    };


// provide a single event with browser abstractions resolved
//
// include all properties for both browers?
// include only DOM2 spec properties?
// provide browser-specific facade?

Y.DOMEventFacade = function(ev, currentTarget, wrapper) {

    var e = ev, ot = currentTarget, d = Y.config.doc, b = d.body,
        x = e.pageX, y = e.pageY, i, c, t;

    this.altKey   = e.altKey;
    this.ctrlKey  = e.ctrlKey;
    this.metaKey  = e.metaKey;
    this.shiftKey = e.shiftKey;

    //////////////////////////////////////////////////////

    if (!x && 0 !== x) {
        x = e.clientX || 0;
        y = e.clientY || 0;

        if (ua.ie) {
            x += Math.max(d.documentElement.scrollLeft, b.scrollLeft);
            y += Math.max(d.documentElement.scrollTop, b.scrollTop);
        }
    }

    this._yuifacade = true;

    /**
     * The X location of the event on the page (including scroll)
     * @property pageX
     * @type int
     */
    this.pageX = x;

    /**
     * The Y location of the event on the page (including scroll)
     * @property pageY
     * @type int
     */
    this.pageY = y;

    //////////////////////////////////////////////////////

    /**
     * The keyCode for key events.  Uses charCode if keyCode is not available
     * @property keyCode
     * @type int
     */
    c = e.keyCode || e.charCode || 0;

    if (ua.webkit && (c in webkitKeymap)) {
        c = webkitKeymap[c];
    }

    /**
     * The keyCode for key events.  Uses charCode if keyCode is not available
     * @property keyCode
     * @type int
     */
    this.keyCode = c;

    /**
     * The charCode for key events.  Same as keyCode
     * @property charCode
     * @type int
     */
    this.charCode = c;

    //////////////////////////////////////////////////////

    /**
     * The button that was pushed.
     * @property button
     * @type int
     */
    this.button = e.which || e.button;

    /**
     * The button that was pushed.  Same as button.
     * @property which
     * @type int
     */
    this.which = this.button;

    //////////////////////////////////////////////////////

    /**
     * Node reference for the targeted element
     * @propery target
     * @type Node
     */
    this.target = resolve(e.target || e.srcElement);

    /**
     * Node reference for the element that the listener was attached to.
     * @propery currentTarget
     * @type Node
     */
    this.currentTarget = resolve(ot);

    t = e.relatedTarget;

    if (!t) {
        if (e.type == "mouseout") {
            t = e.toElement;
        } else if (e.type == "mouseover") {
            t = e.fromElement;
        }
    }

    /**
     * Node reference to the relatedTarget
     * @propery relatedTarget
     * @type Node
     */
    this.relatedTarget = resolve(t);
    
    //////////////////////////////////////////////////////
    // methods

    /**
     * Stops the propagation to the next bubble target
     * @method stopPropagation
     */
    this.stopPropagation = function() {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        wrapper.stopPropagation();
    };

    /**
     * Stops the propagation to the next bubble target and
     * prevents any additional listeners from being exectued
     * on the current target.
     * @method stopImmediatePropagation
     */
    this.stopImmediatePropagation = function() {

        if (e.stopImmediatePropagation) {
            e.stopImmediatePropagation();
        } else {
            this.stopPropagation();
        }

        wrapper.stopImmediatePropagation();
    };

    /**
     * Prevents the event's default behavior
     * @method preventDefault
     */
    this.preventDefault = function() {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        wrapper.preventDefault();
    };

    /**
     * Stops the event propagation and prevents the default
     * event behavior.
     * @method halt
     * @param immediate {boolean} if true additional listeners
     * on the current target will not be executed
     */
    this.halt = function(immediate) {
        if (immediate) {
            this.stopImmediatePropagation();
        } else {
            this.stopPropagation();
        }

        this.preventDefault();
    };

};

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


var add = YUI.Env.add,
remove = YUI.Env.remove,

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

shouldIterate = function(o) {
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
        POLL_RETRYS: 1000,

        /**
         * The poll interval in milliseconds
         * @property POLL_INTERVAL
         * @type int
         * @static
         * @final
         */
        POLL_INTERVAL: 40,

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
E._interval = setInterval(Y.bind(E._poll, E), E.POLL_INTERVAL);
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
            setTimeout(Y.bind(Y.Event._poll, Y.Event), 0);

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

            var args=Y.Array(arguments, 0, true), 
                trimmedArgs=args.slice(1),
                compat, E=Y.Event, capture = false,
                handles, oEl, ek, key, cewrapper, context, 
                fireNow = false, ret;

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
            if (shouldIterate(el)) {


                handles=[];
                
                Y.each(el, function(v, k) {
                    args[2] = v;
                    handles.push(E.attach.apply(E, args));
                });

                return (handles.length === 1) ? handles[0] : handles;

            // If the el argument is a string, we assume it is 
            // actually the id of the element.  If the page is loaded
            // we convert el to the actual element, otherwise we 
            // defer attaching the event until the element is
            // ready
            } else if (Y.Lang.isString(el)) {

                // @TODO switch to using DOM directly here
                // oEl = (compat) ? Y.DOM.byId(el) : Y.all(el);
                oEl = (compat) ? Y.DOM.byId(el) : Y.Selector.query(el);

                if (oEl) {

                    if (Y.Lang.isArray(oEl)) {
                        if (oEl.length == 1) {
                            el = oEl[0];
                        } else {
                            args[2] = oEl;
                            return E.attach.apply(E, args);
                        }

                    // HTMLElement
                    } else {
                        el = oEl;
                    }

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

            // allow a node reference to Y.on to work with load time addEventListener check
            // (Node currently only has the addEventListener interface and that may be
            // removed).
            if (Y.Node && el instanceof Y.Node) {
                return el.on.apply(el, args);
            }

            ek = Y.stamp(el); 
            key = 'event:' + ek + type;
            cewrapper = _wrappers[key];

            if (!cewrapper) {
                // create CE wrapper
                cewrapper = Y.publish(key, {
                    //silent: true,
                    // host: this,
                    bubbles: false
                });

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
                        fireNow = true;
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
            ret = cewrapper.subscribe.apply(cewrapper, trimmedArgs);

            if (fireNow) {
                cewrapper.fire();
            }

            return ret;

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

                // el = (compat) ? Y.DOM.byId(el) : Y.all(el);
                el = (compat) ? Y.DOM.byId(el) : Y.Selector.query(el);
                return Y.Event.detach.apply(Y.Event, args);

            // The el argument can be an array of elements or element ids.
            } else if (shouldIterate(el)) {

                ok = true;
                for (i=0, len=el.length; i<len; ++i) {
                    args[2] = el[i];
                    ok = ( Y.Event.detach.apply(Y.Event, args) && ok );
                }

                return ok;

            }

            if (!type || !fn || !fn.call) {
                return this.purgeElement(el, false, type);
            }

            id = 'event:' + Y.stamp(el) + type;
            ce = _wrappers[id];

            if (ce) {
                return ce.detach(fn);
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
                new Y.DOMEventFacade(ev, el, _wrappers['event:' + Y.stamp(el) + e.type]);
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
         * @deprecated was not meant to be used directly
         * @static
         * @private
         */
        _isValidCollection: shouldIterate,

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
                Y.Event._poll();

            }
        },

        /**
         * Polling function that runs before the onload event fires, 
         * attempting to attach to DOM Nodes as soon as they are 
         * available
         * @method _poll
         * @static
         * @private
         */
        _poll: function() {

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

                    // el = (item.compat) ? Y.DOM.byId(item.id) : Y.get(item.id);
                    el = (item.compat) ? Y.DOM.byId(item.id) : Y.Selector.query(item.id, null, true);

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

                    // el = (item.compat) ? Y.DOM.byId(item.id) : Y.get(item.id);
                    el = (item.compat) ? Y.DOM.byId(item.id) : Y.Selector.query(item.id, null, true);

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
            // var oEl = (Y.Lang.isString(el)) ? Y.get(el) : el,
            var oEl = (Y.Lang.isString(el)) ?  Y.Selector.query(el, null, true) : el,
                lis = this.getListeners(oEl, type), i, len;
            if (lis) {
                for (i=0,len=lis.length; i<len ; ++i) {
                    lis[i].detachAll();
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
                results=[] , key = (type) ? 'event:' + ek + type : null;

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
                v.detachAll();
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

Y.Event = Event;


if (Y.config.injected || YUI.Env.windowLoaded) {
    onLoad();
} else {
    add(window, "load", onLoad);
}

// Process onAvailable/onContentReady items when when the DOM is ready in IE
if (Y.UA.ie) {
    Y.on(EVENT_READY, Event._poll, Event, true);
}

add(window, "unload", onUnload);

Event.Custom = Y.CustomEvent;
Event.Subscriber = Y.Subscriber;
Event.Target = Y.EventTarget;
Event.Handle = Y.EventHandle;
Event.Facade = Y.EventFacade;

Event._poll();

})();
/**
 * Executes the callback as soon as the specified element 
 * is detected in the DOM.
 * @for YUI
 * @event available
 */
Y.Env.evt.plugins.available = {
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
Y.Env.evt.plugins.contentready = {
    on: function(type, fn, id, o) {
        var a = arguments.length > 4 ?  Y.Array(arguments, 4, true) : [];
        return Y.Event.onContentReady.call(Y.Event, id, fn, o, a);
    }
};
(function() {

var FOCUS   = Y.UA.ie ? "focusin" : "focus",
    BLUR    = Y.UA.ie ? "focusout" : "blur",
    CAPTURE = "capture_",
    adapt = Y.Env.evt.plugins;


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
Y.Env.evt.plugins.key = {

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
(function() {

var delegates = {},

    _worker = function(delegateKey, e) {

        var target = e.target, 
            tests  = delegates[delegateKey], 
            spec, ename;

        for (spec in tests) {
            if (tests.hasOwnProperty(spec)) {
                ename  = tests[spec];
                e.currentTarget.queryAll(spec).some(function (v, k) {

                    if (v.compareTo(target) || v.contains(target)) {
                        e.target = v;
                        Y.fire(ename, e);
                        return true;
                    }
                });
            }
        }
    },

    _sanitize = Y.cached(function(str) {
        return str.replace(/[|,:]/g, '~');
    });

/**
 * Sets up a delegated listener container.
 * @event delegate
 * @param type {string} 'delegate'
 * @param fn {string} the function to execute
 * @param el {string|node} the element that is the delegation container
 * @param delegateType {string} the event type to delegate
 * @param spec {string} a selector that must match the target of the
 * event.
 * @return {Event.Handle} the detach handle
 * @for YUI
 */
Y.Env.evt.plugins.delegate = {

    on: function(type, fn, el, delegateType, spec) {

        if (!spec) {
            return false;
        }

        // identifier to target the container
        var guid = (Y.Lang.isString(el) ? el : Y.stamp(el)), 
                
            // the custom event for the delegation spec
            ename = 'delegate:' + guid + delegateType + _sanitize(spec),

            // the key to the listener for the event type and container
            delegateKey = delegateType + guid,

            a = Y.Array(arguments, 0, true);

        if (!(delegateKey in delegates)) {

            delegates[delegateKey] = {};

            // set up the listener on the container
            Y.on(delegateType, function(e) {
                _worker(delegateKey, e);
            }, el);

        }

        delegates[delegateKey][spec] = ename;

        a[0] = ename;

        // remove element, delegation spec and context object from the args
        a.splice(2, 3);
            
        // subscribe to the custom event for the delegation spec
        return Y.on.apply(Y, a);

    }
};

})();
(function() {

var detachHandle,

    timerHandle,

    CE_NAME = 'window:resize',

    handler = function(e) {

        if (Y.UA.gecko) {

            Y.fire(CE_NAME, e);

        } else {

            if (timerHandle) {
                timerHandle.cancel();
            }

            timerHandle = Y.later(Y.config.windowResizeDelay || 40, Y, function() {
                Y.fire(CE_NAME, e);
            });
        }
        
    };


/**
 * Firefox fires the window resize event once when the resize action
 * finishes, other browsers fire the event periodically during the
 * resize.  This code uses timeout logic to simulate the Firefox 
 * behavior in other browsers.
 * @event windowresize
 * @for YUI
 */
Y.Env.evt.plugins.windowresize = {

    on: function(type, fn) {

        // check for single window listener and add if needed
        if (!detachHandle) {
            detachHandle = Y.on('resize', handler);
        }

        var a = Y.Array(arguments, 0, true);
        a[0] = CE_NAME;

        return Y.on.apply(Y, a);
    }
};

})();
var isString = Y.Lang.isString,

	fireMouseEventForNode = function (node, relatedTarget, eventName, e, spec) {

		if (!node.compareTo(relatedTarget) && !node.contains(relatedTarget)) {

			e.target = node;

			Y.fire(eventName, e);
			
		}

	},


	handleMouseEvent = function (e, eventName, spec) {

		var relatedTarget = e.relatedTarget,
			currentTarget = e.currentTarget,
			target = e.target;

		if (spec) {

			currentTarget.queryAll(spec).some(function (v) {

				var bReturnVal;

				if (v.compareTo(target) || v.contains(target)) {
					fireMouseEventForNode(v, relatedTarget, eventName, e, spec);
					bReturnVal = true;
				}
				
				return bReturnVal; 
			
			});
		
		}
		else {
			fireMouseEventForNode(currentTarget, relatedTarget, eventName, e);
		}

	},

	sanitize = Y.cached(function (str) {

    	return str.replace(/[|,:]/g, "~");

	}),

	eventConfig = {

    	on: function(type, fn, el, spec) {

	        var sDOMEvent = (type === "mouseenter") ? "mouseover" : "mouseout",
				sEventName = type + ":" + (isString(el) ? el : Y.stamp(el)) + sDOMEvent,
	            args = Y.Array(arguments, 0, true),
				sSelector;

			if (isString(spec)) {
				sSelector = spec;
				sEventName = sEventName + sanitize(sSelector);
			}

	        if (!Y.getEvent(sEventName)) {

	            // Set up the listener on the container
	            Y.on(sDOMEvent, function (e) {
	
					handleMouseEvent(e, sEventName, sSelector);

				}, el);
	        }

	        args[0] = sEventName;


	        // Remove the element (and the spec--if defined) from the args
		
			if (sSelector) {
	        	args.splice(2, 2);
			}
			else {
				args.splice(2, 1);
			}
            

	        // Subscribe to the custom event for the delegation spec
	        return Y.on.apply(Y, args);

	    }

	};

/**
 * Sets up a "mouseenter" listener&#151;a listener that is called the first time 
 * the user's mouse enters the specified element(s).  By passing a CSS selector 
 * as the fourth argument, can also be used to delegate a "mouseenter" 
 * event listener.
 * 
 * @event mouseenter
 * @param type {string} "mouseenter"
 * @param fn {string} The method the event invokes.
 * @param el {string|node} The element(s) to assign the listener to.
 * @param spec {string} Optional.  String representing a selector that must 
 * match the target of the event in order for the listener to be called.
 * @return {Event.Handle} the detach handle
 * @for YUI
 */
Y.Env.evt.plugins.mouseenter = eventConfig;

/**
* Sets up a "mouseleave" listener&#151;a listener that is called the first time 
* the user's mouse leaves the specified element(s).  By passing a CSS selector 
* as the fourth argument, can also be used to delegate a "mouseleave" 
* event listener.
* 
* @event mouseleave
* @param type {string} "mouseleave"
* @param fn {string} The method the event invokes.
* @param el {string|node} The element(s) to assign the listener to.
* @param spec {string} Optional.  String representing a selector that must 
* match the target of the event in order for the listener to be called.
* @return {Event.Handle} the detach handle
* @for YUI
 */
Y.Env.evt.plugins.mouseleave = eventConfig;


}, '@VERSION@' ,{requires:['event-custom']});
