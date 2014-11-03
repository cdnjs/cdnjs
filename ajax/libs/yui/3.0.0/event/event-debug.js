/*
 * DOM event listener abstraction layer
 * @module event
 * @submodule event-base
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

                // Remove the DOMContentLoaded (FF/Opera/Safari)
                if (D.removeEventListener) {
                    D.removeEventListener("DOMContentLoaded", _ready, false);
                }
            }
        };

        // create custom event

/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */

        // Internet Explorer: use the readyState of a defered script.
        // This isolates what appears to be a safe moment to manipulate
        // the DOM prior to when the document's readyState suggests
        // it is safe to do so.
        if (navigator.userAgent.match(/MSIE/)) {

            if (self !== self.top) {
                document.onreadystatechange = function() {
                    if (document.readyState == 'complete') {
                        document.onreadystatechange = null;
                        _ready();
                    }
                };
            } else {

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
            }

        // FireFox, Opera, Safari 3+: These browsers provide a event for this
        // moment.
        } else {
            D.addEventListener("DOMContentLoaded", _ready, false);
        }

        /////////////////////////////////////////////////////////////
    }

})();
YUI.add('event-base', function(Y) {

(function() {
/*
 * DOM event listener abstraction layer
 * @module event
 * @submodule event-base
 */

var GLOBAL_ENV = YUI.Env,
    
    yready = function() {
        Y.fire('domready');
    };

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
 * @submodule event-base
 */

/**
 * Wraps a DOM event, properties requiring browser abstraction are
 * fixed here.  Provids a security layer when required.
 * @class DOMEventFacade
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
        25:     9, // SHIFT-TAB (Safari provides a different key code in
                   // this case, even though the shiftKey modifier is set)
		63272: 46, // delete
		63273: 36, // home
		63275: 35  // end
    },

    /**
     * Returns a wrapped node.  Intended to be used on event targets,
     * so it will return the node's parent if the target is a text
     * node.
     *
     * If accessing a property of the node throws an error, this is
     * probably the anonymous div wrapper Gecko adds inside text
     * nodes.  This likely will only occur when attempting to access
     * the relatedTarget.  In this case, we now return null because
     * the anonymous div is completely useless and we do not know
     * what the related target was because we can't even get to
     * the element's parent node.
     *
     * @method resolve
     * @private
     */
    resolve = function(n) {
        try {
            if (n && 3 == n.nodeType) {
                n = n.parentNode;
            }
        } catch(e) { 
            return null;
        }

        return Y.one(n);
    };


// provide a single event with browser abstractions resolved
//
// include all properties for both browers?
// include only DOM2 spec properties?
// provide browser-specific facade?

Y.DOMEventFacade = function(ev, currentTarget, wrapper) {

    wrapper = wrapper || {};

    var e = ev, ot = currentTarget, d = Y.config.doc, b = d.body,
        x = e.pageX, y = e.pageY, c, t;

    this.altKey   = e.altKey;
    this.ctrlKey  = e.ctrlKey;
    this.metaKey  = e.metaKey;
    this.shiftKey = e.shiftKey;
    this.type     = e.type;
    this.clientX  = e.clientX;
    this.clientY  = e.clientY;

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
     * The native event
     * @property _event
     */
    this._event = e;

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

    /**
     * Number representing the direction and velocity of the movement of the mousewheel.
     * Negative is down, the higher the number, the faster.  Applies to the mousewheel event.
     * @property wheelDelta
     * @type int
     */
    if (e.type == "mousewheel" || e.type == "DOMMouseScroll") {
        this.wheelDelta = (e.detail) ? (e.detail * -1) : Math.round(e.wheelDelta / 80) || ((e.wheelDelta < 0) ? -1 : 1);
    }

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
        wrapper.stopped = 1;
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
        wrapper.stopped = 2;
    };

    /**
     * Prevents the event's default behavior
     * @method preventDefault
     * @param returnValue {string} sets the returnValue of the event to this value
     * (rather than the default false value).  This can be used to add a customized 
     * confirmation query to the beforeunload event).
     */
    this.preventDefault = function(returnValue) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = returnValue || false;
        wrapper.prevented = 1;
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
 * @submodule event-base
 */

/**
 * The event utility provides functions to add and remove event listeners,
 * event cleansing.  It also tries to automatically remove listeners it
 * registers during the unload event.
 *
 * @class Event
 * @static
 */

Y.Env.evt.dom_wrappers = {};
Y.Env.evt.dom_map = {};

var _eventenv = Y.Env.evt,
add = YUI.Env.add,
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

shouldIterate = function(o) {
    try {
        return (o && typeof o !== "string" && Y.Lang.isNumber(o.length) && !o.tagName && !o.alert);
    } catch(ex) {
        Y.log("collection check failure", "warn", "event");
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
    _wrappers = _eventenv.dom_wrappers,

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
    _el_events = _eventenv.dom_map;

    return {

        /**
         * The number of times we should look for elements that are not
         * in the DOM at the time the event is requested after the document
         * has been loaded.  The default is 1000@amp;40 ms, so it will poll
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

            var a = Y.Array(id), i, availHandle;

            // Y.log('onAvailable registered for: ' + id);

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

            availHandle = new Y.EventHandle({

                _delete: function() {
                    // set by the event system for lazy DOM listeners
                    if (availHandle.handle) {
                        availHandle.handle.detach();
						return;
                    }

                    var i, j;

                    // otherwise try to remove the onAvailable listener(s)
                    for (i = 0; i < a.length; i++) {
                        for (j = 0; j < _avail.length; j++) {
                            if (a[i] === _avail[j].id) {
                                _avail.splice(j, 1);
                            }
                        }
                    }
                }

            });

            return availHandle;
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
         * Adds an event listener
         *
         * @method attach
         *
         * @param {String}   type     The type of event to append
         * @param {Function} fn        The method the event invokes
         * @param {String|HTMLElement|Array|NodeList} el An id, an element 
         *  reference, or a collection of ids and/or elements to assign the 
         *  listener to.
         * @param {Object}   context optional context object
         * @param {Boolean|object}  args 0..n arguments to pass to the callback
         * @return {EventHandle} an object to that can be used to detach the listener
         *                     
         * @static
         */

        attach: function(type, fn, el, context) {
            return Y.Event._attach(Y.Array(arguments, 0, true));
        },

		_createWrapper: function (el, type, capture, compat, facade) {

            var ek = Y.stamp(el),
	            key = 'event:' + ek + type,
	            cewrapper;


            if (false === facade) {
                key += 'native';
            }
            if (capture) {
                key += 'capture';
            }


            cewrapper = _wrappers[key];
            

            if (!cewrapper) {
                // create CE wrapper
                cewrapper = Y.publish(key, {
                    silent: true,
                    bubbles: false,
                    contextFn: function() {
                        cewrapper.nodeRef = cewrapper.nodeRef || Y.one(cewrapper.el);
                        return cewrapper.nodeRef;
                    }
                });
            
                // for later removeListener calls
                cewrapper.el = el;
                cewrapper.key = key;
                cewrapper.domkey = ek;
                cewrapper.type = type;
                cewrapper.fn = function(e) {
                    cewrapper.fire(Y.Event.getEvent(e, el, (compat || (false === facade))));
                };
				cewrapper.capture = capture;
            
                if (el == Y.config.win && type == "load") {
                    // window load happens once
                    cewrapper.fireOnce = true;
                    _windowLoadKey = key;
                }
            
                _wrappers[key] = cewrapper;
                _el_events[ek] = _el_events[ek] || {};
                _el_events[ek][key] = cewrapper;
            
                add(el, type, cewrapper.fn, capture);
            }

			return cewrapper;
			
		},

        _attach: function(args, config) {

            var compat, E=Y.Event,
                handles, oEl, cewrapper, context, 
                fireNow = false, ret,
                type = args[0],
                fn = args[1],
                el = args[2] || Y.config.win,
                facade = config && config.facade,
                capture = config && config.capture;

            if (args[args.length-1] === COMPAT_ARG) {
                compat = true;
                // trimmedArgs.pop();
            }

            if (!fn || !fn.call) {
// throw new TypeError(type + " attach call failed, callback undefined");
Y.log(type + " attach call failed, invalid callback", "error", "event");
                return false;
            }

            // The el argument can be an array of elements or element ids.
            if (shouldIterate(el)) {

                handles=[];
                
                Y.each(el, function(v, k) {
                    args[2] = v;
                    handles.push(E._attach(args, config));
                });

                // return (handles.length === 1) ? handles[0] : handles;
                return new Y.EventHandle(handles);

            // If the el argument is a string, we assume it is 
            // actually the id of the element.  If the page is loaded
            // we convert el to the actual element, otherwise we 
            // defer attaching the event until the element is
            // ready
            } else if (Y.Lang.isString(el)) {

                // oEl = (compat) ? Y.DOM.byId(el) : Y.Selector.query(el);

                if (compat) {
                    oEl = Y.DOM.byId(el);
                } else {

                    oEl = Y.Selector.query(el);

                    switch (oEl.length) {
                        case 0:
                            oEl = null;
                            break;
                        case 1:
                            oEl = oEl[0];
                            break;
                        default:
                            args[2] = oEl;
                            return E._attach(args, config);
                    }
                }

                if (oEl) {

                    el = oEl;

                // Not found = defer adding the event until the element is available
                } else {

                    // Y.log(el + ' not found');
                    ret = this.onAvailable(el, function() {
                        // Y.log('lazy attach: ' + args);
                        
                        ret.handle = E._attach(args, config);

                    }, E, true, false, compat);

                    return ret;

                }
            }

            // Element should be an html element or node
            if (!el) {
                Y.log("unable to attach event " + type, "warn", "event");
                return false;
            }

            if (Y.Node && el instanceof Y.Node) {
                el = Y.Node.getDOMNode(el);
            }

 			cewrapper = this._createWrapper(el, type, capture, compat, facade);

            if (el == Y.config.win && type == "load") {

                // if the load is complete, fire immediately.
                // all subscribers, including the current one
                // will be notified.
                if (YUI.Env.windowLoaded) {
                    fireNow = true;
                }
            }

            if (compat) {
                args.pop();
            }

            context = args[3];

            // set context to the Node if not specified
            // ret = cewrapper.on.apply(cewrapper, trimmedArgs);
            ret = cewrapper._on(fn, context, (args.length > 4) ? args.slice(4) : null);

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
         * @param {String} type the type of event to remove.
         * @param {Function} fn the method the event invokes.  If fn is
         * undefined, then all event handlers for the type of event are 
         * removed.
         * @param {String|HTMLElement|Array|NodeList|EventHandle} el An 
         * event handle, an id, an element reference, or a collection 
         * of ids and/or elements to remove the listener from.
         * @return {boolean} true if the unbind was successful, false otherwise.
         * @static
         */
        detach: function(type, fn, el, obj) {

            var args=Y.Array(arguments, 0, true), compat, i, l, ok,
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
                if (compat) {
                    el = Y.DOM.byId(el);
                } else {
                    el = Y.Selector.query(el);
                    l = el.length;
                    if (l < 1) {
                        el = null;
                    } else if (l == 1) {
                        el = el[0];
                    }
                }
                // return Y.Event.detach.apply(Y.Event, args);

            // The el argument can be an array of elements or element ids.
            } 
            
            if (!el) {
                return false;
            }
            
            if (shouldIterate(el)) {

                ok = true;
                for (i=0, l=el.length; i<l; ++i) {
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

                // Y.log('Load Complete', 'info', 'event');

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

            // Y.log.debug("poll");

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
                    context = item.obj || Y.one(el);
                    item.fn.apply(context, (Y.Lang.isArray(ov)) ? ov : []);
                }

            };


            // onAvailable
            for (i=0,len=_avail.length; i<len; ++i) {
                item = _avail[i];
                if (item && !item.checkReady) {

                    // el = (item.compat) ? Y.DOM.byId(item.id) : Y.one(item.id);
                    el = (item.compat) ? Y.DOM.byId(item.id) : Y.Selector.query(item.id, null, true);

                    if (el) {
                        // Y.log('avail: ' + el);
                        executeItem(el, item);
                        _avail[i] = null;
                    } else {
                        // Y.log('NOT avail: ' + el);
                        notAvail.push(item);
                    }
                }
            }

            // onContentReady
            for (i=0,len=_avail.length; i<len; ++i) {
                item = _avail[i];
                if (item && item.checkReady) {

                    // el = (item.compat) ? Y.DOM.byId(item.id) : Y.one(item.id);
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
            // var oEl = (Y.Lang.isString(el)) ? Y.one(el) : el,
            var oEl = (Y.Lang.isString(el)) ?  Y.Selector.query(el, null, true) : el,
                lis = this.getListeners(oEl, type), i, len, props;
            if (lis) {
                for (i=0,len=lis.length; i<len ; ++i) {
                    props = lis[i];
                    props.detachAll();
                    remove(props.el, props.type, props.fn, props.capture);
                    delete _wrappers[props.key];
                    delete _el_events[props.domkey][props.key];
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

                // get native events as well
                key += 'native';
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
            Y.each(_wrappers, function(v, k) {
                v.detachAll();
                remove(v.el, v.type, v.fn, v.capture);
                delete _wrappers[k];
                delete _el_events[v.domkey][k];
            });
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

Y.on("unload", onUnload);

Event.Custom = Y.CustomEvent;
Event.Subscriber = Y.Subscriber;
Event.Target = Y.EventTarget;
Event.Handle = Y.EventHandle;
Event.Facade = Y.EventFacade;

Event._poll();

})();

/**
 * DOM event listener abstraction layer
 * @module event
 * @submodule event-base
 */

/**
 * Executes the callback as soon as the specified element 
 * is detected in the DOM.
 * @event available
 * @param type {string} 'available'
 * @param fn {function} the callback function to execute.
 * @param el {string|HTMLElement|collection} the element(s) to attach
 * @param context optional argument that specifies what 'this' refers to.
 * @param args* 0..n additional arguments to pass on to the callback function.
 * These arguments will be added after the event object.
 * @return {EventHandle} the detach handle
 * @for YUI
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
 * @event contentready
 * @param type {string} 'contentready'
 * @param fn {function} the callback function to execute.
 * @param el {string|HTMLElement|collection} the element(s) to attach
 * @param context optional argument that specifies what 'this' refers to.
 * @param args* 0..n additional arguments to pass on to the callback function.
 * These arguments will be added after the event object.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
Y.Env.evt.plugins.contentready = {
    on: function(type, fn, id, o) {
        var a = arguments.length > 4 ?  Y.Array(arguments, 4, true) : [];
        return Y.Event.onContentReady.call(Y.Event, id, fn, o, a);
    }
};


}, '@VERSION@' ,{requires:['event-custom-base']});
YUI.add('event-delegate', function(Y) {

/**
 * Adds event delegation support to the library.
 * 
 * @module event
 * @submodule event-delegate
 */

var Event = Y.Event,
	Lang = Y.Lang,

	delegates = {},
	
	specialTypes = {
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	},

	resolveTextNode = function(n) {
	    try {
	        if (n && 3 == n.nodeType) {
	            return n.parentNode;
	        }
	    } catch(e) { }
	    return n;
	},

    delegateHandler = function(delegateKey, e, el) {

        var target = resolveTextNode((e.target || e.srcElement)), 
            tests  = delegates[delegateKey],
            spec, 
			ename,
			matched,
			fn,
			ev;


		var getMatch = function(el, selector, container) {
			
			var returnVal;
			
			if (!el || el === container) {
				returnVal = false;
			}
			else {
				returnVal = Y.Selector.test(el, selector) ? el: getMatch(el.parentNode, selector, container);
			}
			
			return returnVal;
			
		};


        for (spec in tests) {

            if (tests.hasOwnProperty(spec)) {

                ename  = tests[spec];
				fn	= tests.fn;
				matched = null;


				if (Y.Selector.test(target, spec, el)) {
					matched = target;
				}
				else if (Y.Selector.test(target, ((spec.replace(/,/gi, " *,")) + " *"), el)) {
						
					//	The target is a descendant of an element matching 
					//	the selector, so crawl up to find the ancestor that 
					//	matches the selector
					
					matched = getMatch(target, spec, el);
					
				}


				if (matched) {

                    if (!ev) {
                        ev = new Y.DOMEventFacade(e, el);
                        ev.container = ev.currentTarget;
                    }

                    ev.currentTarget = Y.Node.get(matched);

					Y.publish(ename, {
			               contextFn: function() {
			                   return ev.currentTarget;
			               }
			           });

					if (fn) {
						fn(ev, ename);
					}
					else {
                    	Y.fire(ename, ev);								
					}
					
				}

            }
        }

    },

	attach = function (type, key, element) {

		var focusMethods = {
				focus: Event._attachFocus,
				blur: Event._attachBlur
			},

			attachFn = focusMethods[type],

			args = [type, 
			function (e) {
	            delegateHandler(key, (e || window.event), element);
			}, 
			element];


		if (attachFn) {
			return attachFn(args, { capture: true, facade: false });
		}
		else {
			return Event._attach(args, { facade: false });
		}
		
	},

    sanitize = Y.cached(function(str) {
        return str.replace(/[|,:]/g, '~');
    });

/**
 * Sets up event delegation on a container element.  The delegated event
 * will use a supplied selector to test if the target or one of the
 * descendants of the target match it.  The supplied callback function 
 * will only be executed if a match was encountered, and, in fact, 
 * will be executed for each element that matches if you supply an 
 * ambiguous selector.
 *
 * The event object for the delegated event is supplied to the callback
 * function.  It is modified slightly in order to support all properties
 * that may be needed for event delegation.  'currentTarget' is set to
 * the element that matched the delegation specifcation.  'container' is
 * set to the element that the listener is bound to (this normally would
 * be the 'currentTarget').
 *
 * @event delegate
 * @param type {string} 'delegate'
 * @param fn {function} the callback function to execute.  This function
 * will be provided the event object for the delegated event.
 * @param el {string|node} the element that is the delegation container
 * @param delegateType {string} the event type to delegate
 * @param spec {string} a selector that must match the target of the
 * event.
 * @param context optional argument that specifies what 'this' refers to.
 * @param args* 0..n additional arguments to pass on to the callback function.
 * These arguments will be added after the event object.
 * @return {EventHandle} the detach handle
 * @for YUI
 * @deprecated use Y.delegate
 */
Y.Env.evt.plugins.delegate = {

    on: function(type, fn, el, delegateType, spec) {

        Y.log('delegate event is deprecated, use Y.delegate()', 'warn', 'deprecated');

		var args = Y.Array(arguments, 0, true);
		
		args.splice(3, 1);
		
		args[0] = delegateType;

		return Y.delegate.apply(Y, args);

    }

};


/**
 * Sets up event delegation on a container element.  The delegated event
 * will use a supplied selector to test if the target or one of the
 * descendants of the target match it.  The supplied callback function 
 * will only be executed if a match was encountered, and, in fact, 
 * will be executed for each element that matches if you supply an 
 * ambiguous selector.
 *
 * The event object for the delegated event is supplied to the callback
 * function.  It is modified slightly in order to support all properties
 * that may be needed for event delegation.  'currentTarget' is set to
 * the element that matched the delegation specifcation.  'container' is
 * set to the element that the listener is bound to (this normally would
 * be the 'currentTarget').
 *
 * @method delegate
 * @param type {string} the event type to delegate
 * @param fn {function} the callback function to execute.  This function
 * will be provided the event object for the delegated event.
 * @param el {string|node} the element that is the delegation container
 * @param spec {string} a selector that must match the target of the
 * event.
 * @param context optional argument that specifies what 'this' refers to.
 * @param args* 0..n additional arguments to pass on to the callback function.
 * These arguments will be added after the event object.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
Event.delegate = function (type, fn, el, spec) {

    if (!spec) {
        Y.log('delegate: no spec, nothing to do', 'warn', 'event');
        return false;
    }


    var args = Y.Array(arguments, 0, true),	    
		element = el,	// HTML element serving as the delegation container
		availHandle;	


	if (Lang.isString(el)) {
		
		//	Y.Selector.query returns an array of matches unless specified 
		//	to return just the first match.  Since the primary use case for
		//	event delegation is to use a single event handler on a container,
		//	Y.delegate doesn't currently support being able to bind a 
		//	single listener to multiple containers.
		
		element = Y.Selector.query(el, null, true);
		
		if (!element) { // Not found, check using onAvailable

			availHandle = Event.onAvailable(el, function() {

				availHandle.handle = Event.delegate.apply(Event, args);

            }, Event, true, false);

            return availHandle;
			
		}
		
	}


	element = Y.Node.getDOMNode(element);


	var	guid = Y.stamp(element),
            
        // The Custom Event for the delegation spec
        ename = 'delegate:' + guid + type + sanitize(spec),

        // The key to the listener for the event type and container
        delegateKey = type + guid,

		delegate = delegates[delegateKey],

		domEventHandle,
		
		ceHandle,
		
		listeners;
	

    if (!delegate) {

		delegate = {};

		if (specialTypes[type]) {
			
			if (!Event._fireMouseEnter) {
				Y.log("Delegating a " + type + " event requires the event-mouseenter submodule.", "error", "Event");
				return false;				
			}
			
			type = specialTypes[type];
			delegate.fn = Event._fireMouseEnter;
			
		}

		//	Create the DOM Event wrapper that will fire the Custom Event

		domEventHandle = attach(type, delegateKey, element);


		//	Hook into the _delete method for the Custom Event wrapper of this
		//	DOM Event in order to clean up the 'delegates' map and unsubscribe
		//	the associated Custom Event listeners fired by this DOM event
		//	listener if/when the user calls "purgeElement" OR removes all 
		//	listeners of the Custom Event.
		
		Y.after(function (sub) {

			if (domEventHandle.sub == sub) {

				//	Delete this event from the map of known delegates
				delete delegates[delegateKey];

				Y.log("DOM event listener associated with the " + ename + " Custom Event removed.  Removing all " + ename + " listeners.", "info", "Event");

				//	Unsubscribe all listeners of the Custom Event fired 
				//	by this DOM event.
				Y.detachAll(ename);
				
			}

		}, domEventHandle.evt, "_delete");
			
		delegate.handle = domEventHandle;

        delegates[delegateKey] = delegate;

    }


	listeners = delegate.listeners;

	delegate.listeners = listeners ? (listeners + 1) : 1;
    delegate[spec] = ename;


    args[0] = ename;

    // Remove element, delegation spec
    args.splice(2, 2);
        

    // Subscribe to the Custom Event for the delegation spec

	ceHandle = Y.on.apply(Y, args);


	//	Hook into the detach method of the handle in order to clean up the 
	//	'delegates' map and remove the associated DOM event handler 
	//	responsible for firing this Custom Event if all listener for this 
	//	event have been removed.

	Y.after(function () {
			
		delegate.listeners = (delegate.listeners - 1);
		
		if (delegate.listeners === 0) {
			Y.log("No more listeners for the " + ename + " Custom Event.  Removing its associated DOM event listener.", "info", "Event");
			delegate.handle.detach();
		}

	}, ceHandle, "detach");

    return ceHandle;
	
};

Y.delegate = Event.delegate;


}, '@VERSION@' ,{requires:['node-base']});
YUI.add('event-mousewheel', function(Y) {

/**
 * Adds mousewheel event support
 * @module event
 * @submodule event-mousewheel
 */
var DOM_MOUSE_SCROLL = 'DOMMouseScroll',
    fixArgs = function(args) {
        var a = Y.Array(args, 0, true), target;
        if (Y.UA.gecko) {
            a[0] = DOM_MOUSE_SCROLL;
            target = Y.config.win;
        } else {
            target = Y.config.doc;
        }

        if (a.length < 3) {
            a[2] = target;
        } else {
            a.splice(2, 0, target);
        }

        return a;
    };

/**
 * Mousewheel event.  This listener is automatically attached to the
 * correct target, so one should not be supplied.  Mouse wheel 
 * direction and velocity is stored in the 'mouseDelta' field.
 * @event mousewheel
 * @param type {string} 'mousewheel'
 * @param fn {function} the callback to execute
 * @param context optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
Y.Env.evt.plugins.mousewheel = {
    on: function() {
        return Y.Event._attach(fixArgs(arguments));
    },

    detach: function() {
        return Y.Event.detach.apply(Y.Event, fixArgs(arguments));
    }
};


}, '@VERSION@' ,{requires:['node-base']});
YUI.add('event-mouseenter', function(Y) {

/**
 * Adds support for mouseenter/mouseleave events
 * @module event
 * @submodule event-mouseenter
 */
var Event = Y.Event,
	Lang = Y.Lang,

	plugins = Y.Env.evt.plugins,
	
	listeners = {},

	eventConfig = {

    	on: function(type, fn, el) {

		    var args = Y.Array(arguments, 0, true),	    
				element = el,
				availHandle;


			if (Lang.isString(el)) {

				//	Need to use Y.all because if el is a string it could be a 
				//	selector that returns a NodeList

				element = Y.all(el);

				if (element.size() === 0) { // Not found, check using onAvailable

		            availHandle = Event.onAvailable(el, function() {

		                availHandle.handle = Y.on.apply(Y, args);

		            }, Event, true, false);
		
					return availHandle;

				}

			}
			

	        var sDOMEvent = (type === "mouseenter") ? "mouseover" : "mouseout",

				//	The name of the custom event
				sEventName = type + ":" + Y.stamp(element) + sDOMEvent,

				listener = listeners[sEventName],

				domEventHandle,
				
				ceHandle,
				
				nListeners;


			//	Bind an actual DOM event listener that will call the 
			//	the custom event				
			if (!listener) {
				
				domEventHandle = Y.on(sDOMEvent, Y.rbind(Event._fireMouseEnter, Y, sEventName), element);

				//	Hook into the _delete method for the Custom Event wrapper of this
				//	DOM Event in order to clean up the 'listeners' map and unsubscribe
				//	the associated Custom Event listeners fired by this DOM event
				//	listener if/when the user calls "purgeElement" OR removes all 
				//	listeners of the Custom Event.

				Y.after(function (sub) {

					if (domEventHandle.sub == sub) {

						//	Delete this event from the map of known mouseenter 
						//	and mouseleave listeners
						delete listeners[sEventName];

						Y.log("DOM event listener associated with the " + sEventName + " Custom Event removed.  Removing all " + sEventName + " listeners.", "info", "Event");

						//	Unsubscribe all listeners of the Custom Event fired 
						//	by this DOM event.
						Y.detachAll(sEventName);

					}

				}, domEventHandle.evt, "_delete");
				

				listener = {};				
				listener.handle = domEventHandle;				

				listeners[sEventName] = listener;

			}

			nListeners = listener.count;

			listener.count = nListeners ? (nListeners + 1) : 1;

	        args[0] = sEventName;

	        // Remove the element from the args
			args.splice(2, 1);

	        // Subscribe to the custom event
	        ceHandle = Y.on.apply(Y, args);
	
			//	Hook into the detach method of the handle in order to clean up the 
			//	'listeners' map and remove the associated DOM event handler 
			//	responsible for firing this Custom Event if all listener for this 
			//	event have been removed.

			Y.after(function () {

				listener.count = (listener.count - 1);

				if (listener.count === 0) {
					Y.log("No more listeners for the " + sEventName + " Custom Event.  Removing its associated DOM event listener.", "info", "Event");
					listener.handle.detach();
				}

			}, ceHandle, "detach");	
	
	
			return ceHandle;

	    }

	};
	

Event._fireMouseEnter = function (e, eventName) {

	var relatedTarget = e.relatedTarget,
		currentTarget = e.currentTarget;

	if (currentTarget !== relatedTarget && 
		!currentTarget.contains(relatedTarget)) {

		Y.publish(eventName, {
               contextFn: function() {
                   return currentTarget;
               }
           });			

		Y.fire(eventName, e);

	}

};	


/**
 * Sets up a "mouseenter" listener&#151;a listener that is called the first time 
 * the user's mouse enters the specified element(s).
 * 
 * @event mouseenter
 * @param type {string} "mouseenter"
 * @param fn {function} The method the event invokes.
 * @param el {string|node} The element(s) to assign the listener to.
 * @param spec {string} Optional.  String representing a selector that must 
 * match the target of the event in order for the listener to be called.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
plugins.mouseenter = eventConfig;

/**
* Sets up a "mouseleave" listener&#151;a listener that is called the first time 
* the user's mouse leaves the specified element(s).
* 
* @event mouseleave
* @param type {string} "mouseleave"
* @param fn {function} The method the event invokes.
* @param el {string|node} The element(s) to assign the listener to.
* @param spec {string} Optional.  String representing a selector that must 
* match the target of the event in order for the listener to be called.
* @return {EventHandle} the detach handle
* @for YUI
 */
plugins.mouseleave = eventConfig;


}, '@VERSION@' ,{requires:['node-base']});
YUI.add('event-key', function(Y) {

/**
 * Functionality to listen for one or more specific key combinations.
 * @module event
 * @submodule event-key
 */

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
 * @param fn {function} the function to execute
 * @param id {string|HTMLElement|collection} the element(s) to bind
 * @param spec {string} the keyCode and modifier specification
 * @param o optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {Event.Handle} the detach handle
 */
Y.Env.evt.plugins.key = {

    on: function(type, fn, id, spec, o) {
        var a = Y.Array(arguments, 0, true), parsed, etype, criteria, ename;

        parsed = spec && spec.split(':');

        if (!spec || spec.indexOf(':') == -1 || !parsed[1]) {
Y.log('Illegal key spec, creating a regular keypress listener instead.', 'info', 'event');
            a[0] = 'key' + ((parsed && parsed[0]) || 'press');
            return Y.on.apply(Y, a);
        }

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

                // Y.log('keylistener: ' + e.keyCode);
                
                var passed = false, failed = false, i, crit, critInt;

                for (i=0; i<criteria.length; i=i+1) {
                    crit = criteria[i]; 
                    critInt = parseInt(crit, 10);

                    // pass this section if any supplied keyCode 
                    // is found
                    if (Y.Lang.isNumber(critInt)) {

                        if (e.charCode === critInt) {
                            // Y.log('passed: ' + crit);
                            passed = true;
                        } else {
                            failed = true;
                            // Y.log('failed: ' + crit);
                        }

                    // only check modifier if no keyCode was specified
                    // or the keyCode check was successful.  pass only 
                    // if every modifier passes
                    } else if (passed || !failed) {
                        passed = (e[crit + 'Key']);
                        failed = !passed;
                        // Y.log(crit + ": " + passed);
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


}, '@VERSION@' ,{requires:['node-base']});
YUI.add('event-focus', function(Y) {

/**
 * Adds focus and blur event listener support.  These events normally
 * do not bubble, so this adds support for that so these events
 * can be used in event delegation scenarios.
 * 
 * @module event
 * @submodule event-focus
 */
(function() {

var UA = Y.UA,
	Event = Y.Event,
	plugins = Y.Env.evt.plugins,
	ie = UA.ie,
	bUseMutation = (UA.opera || UA.webkit),
	eventNames = {
		focus: (ie ? 'focusin' : (bUseMutation ? 'DOMFocusIn' : 'focus')),
		blur: (ie ? 'focusout' : (bUseMutation ? 'DOMFocusOut' : 'blur'))
	},

	//	Only need to use capture phase for Gecko since it doesn't support 
	//	focusin, focusout, DOMFocusIn, or DOMFocusOut
    CAPTURE_CONFIG = { capture: (UA.gecko ? true : false) },


	attach = function (args, config) {

	    var a = Y.Array(args, 0, true);
		a[0] = eventNames[a[0]];
	    return Event._attach(a, config);

	},
	
	eventAdapter = {

		on: function () {
			return attach(arguments, CAPTURE_CONFIG);
		}

	};


Event._attachFocus = attach;
Event._attachBlur = attach;

/**
 * Adds a DOM focus listener.  Uses the focusin event in IE, 
 * DOMFocusIn for Opera and Webkit, and the capture phase for Gecko so that
 * the event propagates in a way that enables event delegation.
 *
 * @for YUI
 * @event focus
 * @param type {string} 'focus'
 * @param fn {function} the callback function to execute
 * @param o {string|HTMLElement|collection} the element(s) to bind
 * @param context optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {EventHandle} the detach handle
 */
plugins.focus = eventAdapter;

/**
 * Adds a DOM blur listener.  Uses the focusout event in IE, 
 * DOMFocusOut for Opera and Webkit, and the capture phase for Gecko so that
 * the event propagates in a way that enables event delegation.
 *
 * @for YUI
 * @event blur
 * @param type {string} 'blur'
 * @param fn {function} the callback function to execute
 * @param o {string|HTMLElement|collection} the element(s) to bind
 * @param context optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {EventHandle} the detach handle
 */
plugins.blur = eventAdapter;

})();


}, '@VERSION@' ,{requires:['node-base']});
YUI.add('event-resize', function(Y) {

/**
 * Adds a window resize event that has its behavior normalized to fire at the
 * end of the resize rather than constantly during the resize.
 * @module event
 * @submodule event-resize
 */
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
            detachHandle = Y.Event._attach(['resize', handler]);
        }

        var a = Y.Array(arguments, 0, true);
        a[0] = CE_NAME;

        return Y.on.apply(Y, a);
    }
};

})();


}, '@VERSION@' ,{requires:['node-base']});


YUI.add('event', function(Y){}, '@VERSION@' ,{use:['event-base', 'event-delegate', 'event-mousewheel', 'event-mouseenter', 'event-key', 'event-focus', 'event-resize']});

