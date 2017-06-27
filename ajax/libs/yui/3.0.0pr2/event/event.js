/**
 * The YUI event system
 * @module event
 */
YUI.add("event", function(Y) {

    var FOCUS = Y.UA.ie ? "focusin" : "focus",
        BLUR = Y.UA.ie ? "focusout" : "blur",
        CAPTURE = "capture_",
        Lang = Y.Lang;

    Y.Env.eventAdaptors = {

        /**
         * Adds a DOM focus listener.  Uses the focusin event in IE,
         * and the capture phase otherwise so that
         * the event propagates properly.
         * @for YUI
         * @event focus
         */
        focus: {
            on: function() {
                arguments[0] = CAPTURE + FOCUS;
                return Y.Event.attach.apply(Y.Event, arguments);
            },

            detach: function() {
                arguments[0] = CAPTURE + FOCUS;
                return Y.Event.detach.apply(Y.Event, arguments);

            }
        },

        /**
         * Adds a DOM focus listener.  Uses the focusout event in IE,
         * and the capture phase otherwise so that
         * the event propagates properly.
         * @for YUI
         * @event blur
         */
        blur: {
            on: function() {
                arguments[0] = CAPTURE + BLUR;
                return Y.Event.attach.apply(Y.Event, arguments);
            },

            detach: function() {
                arguments[0] = CAPTURE + BLUR;
                return Y.Event.detach.apply(Y.Event, arguments);
            }
        },

        /**
         * Executes the callback as soon as the specified element 
         * is detected in the DOM.
         * @for YUI
         * @event available
         */
        available: {
            on: function(type, fn, id, o) {
                var a = arguments.length > 4 ?  Y.Array(arguments, 4, true) : [];
                return Y.Event.onAvailable.call(Y.Event, id, fn, o, a);
            }
        },

        /**
         * Executes the callback as soon as the specified element 
         * is detected in the DOM with a nextSibling property
         * (indicating that the element's children are available)
         * @for YUI
         * @event contentready
         */
        contentready: {
            on: function(type, fn, id, o) {
                var a = arguments.length > 4 ?  Y.Array(arguments, 4, true) : [];
                return Y.Event.onContentReady.call(Y.Event, id, fn, o, a);
            }
        },

        /**
         * Add a key listener.  The listener will only be notified if the
         * keystroke detected meets the supplied specification.  The
         * spec consists of the key event type, followed by a colon,
         * followed by zero or more comma separated key codes, followed
         * by zero or more modifiers delimited by a plus sign.  Ex:
         * press:12,65+shift+ctrl
         * @event key
         * @param fn {string} the function to execute
         * @param id {string} the element(s) to bind
         * @param spec {string} the keyCode and modifier specification
         * @param o optional context object
         * @param args 0..n additional arguments that should be provided 
         * to the listener.
         */
        key: {

            on: function(type, fn, id, spec, o) {

                if (!spec || spec.indexOf(':') == -1) {
                    arguments[0] = 'keypress';
                    return Y.on.apply(Y, arguments);
                }

                // parse spec ([key event type]:[criteria])
                var parsed = spec.split(':'),

                    // key event type: 'down', 'up', or 'press'
                    etype = parsed[0],

                    // list of key codes optionally followed by modifiers
                    criteria = (parsed[1]) ? parsed[1].split(/,|\+/) : null,

                    // the name of the custom event that will be created for the spec
                    ename = (Lang.isString(id) ? id : Y.stamp(id)) + spec,

                    a = Y.Array(arguments, 0, true);



                // subscribe spec validator to the DOM event
                Y.on(type + etype, function(e) {

                    
                    var passed = false, failed = false;

                    for (var i=0; i<criteria.length; i=i+1) {
                        var crit = criteria[i], critInt = parseInt(crit, 10);

                        // pass this section if any supplied keyCode 
                        // is found
                        if (Lang.isNumber(critInt)) {

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

                // subscribe supplied listener to custom event for spec validator
                // remove element and spec.
                a.splice(2, 2);
                a[0] = ename;

                return Y.on.apply(Y, a);
            }
        }

    };

    /**
     * Attach an event listener, either to a DOM object
     * or to an Event.Target.
     * @param type {string} the event type
     * @param f {Function} the function to execute
     * @param o the Event.Target or element to attach to
     * @param context Optional execution context
     * @param args* 0..n additional arguments to append
     * to the signature provided when the event fires.
     * @method on
     * @for YUI
     * @return {Event.Handle} a handle object for 
     * unsubscribing to this event.
     */
    Y.on = function(type, f, o) {
        
       var adapt = Y.Env.eventAdaptors[type];
        
        if (adapt && adapt.on) {
            return adapt.on.apply(Y, arguments);
        } else {
            if (adapt || type.indexOf(':') > -1) {
                return Y.subscribe.apply(Y, arguments);
            } else {
                return Y.Event.attach.apply(Y.Event, arguments);
            }
        }

    };

    /**
     * Detach an event listener (either a custom event or a
     * DOM event
     * @method detach
     * @param type the type of event, or a Event.Handle to
     * for the subscription.  If the Event.Handle is passed
     * in, the other parameters are not used.
     * @param f {Function} the subscribed function
     * @param o the object or element the listener is subscribed
     * to.
     * @method detach
     * @return {YUI} the YUI instance
     */
    Y.detach = function(type, f, o) {

        var adapt = Y.Env.eventAdaptors[type];

        if (Lang.isObject(type) && type.detach) {
            return type.detach();
        } else {
            if (adapt && adapt.detach) {
                return adapt.detach.apply(Y, arguments);
            } else if (adapt || type.indexOf(':') > -1) {
                return Y.unsubscribe.apply(Y, arguments);
            } else {
                return Y.Event.detach.apply(Y.Event, arguments);
            }
        }
    };

    /**
     * Executes the callback before a DOM event, custom event
     * or method.  If the first argument is a function, it
     * is assumed the target is a method.  For DOM and custom
     * events, this is an alias for Y.on.
     *
     * For DOM and custom events:
     * type, callback, context, 1-n arguments
     *  
     * For methods:
     * callback, object (method host), methodName, context, 1-n arguments
     *
     * @method before
     * @return unsubscribe handle
     */
    Y.before = function(type, f, o) { 
        if (Lang.isFunction(type)) {
            return Y.Do.before.apply(Y.Do, arguments);
        } else {
            return Y.on.apply(Y, arguments);
        }
    };

    var after = Y.after;

    /**
     * Executes the callback after a DOM event, custom event
     * or method.  If the first argument is a function, it
     * is assumed the target is a method.
     *
     * For DOM and custom events:
     * type, callback, context, 1-n arguments
     *  
     * For methods:
     * callback, object (method host), methodName, context, 1-n arguments
     *
     * @method after
     * @return {Event.Handle} unsubscribe handle
     */
    Y.after = function(type, f, o) {
        if (Lang.isFunction(type)) {
            return Y.Do.after.apply(Y.Do, arguments);
        } else {
            return after.apply(Y, arguments);
        }
    };


}, "3.0.0", {
    use: [
          "aop", 
          "event-custom", 
          "event-target", 
          "event-ready",
          "event-dom", 
          "event-facade",
          "event-simulate"
          ]
});
/*
 * Method displacement
 * @submodule event-aop
 * @module event
 */
YUI.add("aop", function(Y) {

    var BEFORE = 0,
        AFTER = 1;

    /**
     * Allows for the insertion of methods that are executed before or after
     * a specified method
     * @class Do
     * @static
     */
    Y.Do = {

        /**
         * Cache of objects touched by the utility
         * @property objs
         * @static
         */
        objs: {},

        /**
         * Execute the supplied method before the specified function
         * @method before
         * @param fn {Function} the function to execute
         * @param obj the object hosting the method to displace
         * @param sFn {string} the name of the method to displace
         * @param c The execution context for fn
         * @return {string} handle for the subscription
         * @static
         */
        before: function(fn, obj, sFn, c) {
            var f = fn;
            if (c) {
                var a = [fn, c].concat(Y.Array(arguments, 4, true));
                f = Y.bind.apply(Y, a);
            }

            return this._inject(BEFORE, f, obj, sFn);
        },

        /**
         * Execute the supplied method after the specified function
         * @method after
         * @param fn {Function} the function to execute
         * @param obj the object hosting the method to displace
         * @param sFn {string} the name of the method to displace
         * @param c The execution context for fn
         * @return {string} handle for the subscription
         * @static
         */
        after: function(fn, obj, sFn, c) {
            var f = fn;
            if (c) {
                var a = [fn, c].concat(Y.Array(arguments, 4, true));
                f = Y.bind.apply(Y, a);
            }

            return this._inject(AFTER, f, obj, sFn);
        },

        /**
         * Execute the supplied method after the specified function
         * @method _inject
         * @param when {string} before or after
         * @param fn {Function} the function to execute
         * @param obj the object hosting the method to displace
         * @param sFn {string} the name of the method to displace
         * @param c The execution context for fn
         * @return {string} handle for the subscription
         * @private
         * @static
         */
        _inject: function(when, fn, obj, sFn) {

            // object id
            var id = Y.stamp(obj);

            if (! this.objs[id]) {
                // create a map entry for the obj if it doesn't exist
                this.objs[id] = {};
            }
            var o = this.objs[id];

            if (! o[sFn]) {
                // create a map entry for the method if it doesn't exist
                o[sFn] = new Y.Do.Method(obj, sFn);

                // re-route the method to our wrapper
                obj[sFn] = 
                    function() {
                        return o[sFn].exec.apply(o[sFn], arguments);
                    };
            }

            // subscriber id
            var sid = id + Y.stamp(fn) + sFn;

            // register the callback
            o[sFn].register(sid, fn, when);

            return new Y.EventHandle(o[sFn], sid);

        },

        /**
         * Detach a before or after subscription
         * @method detach
         * @param handle {string} the subscription handle
         */
        detach: function(handle) {

            if (handle.detach) {
                handle.detach();
            }

        },

        _unload: function(e, me) {

        }
    };

    //////////////////////////////////////////////////////////////////////////

    /**
     * Wrapper for a displaced method with aop enabled
     * @class Do.Method
     * @constructor
     * @param obj The object to operate on
     * @param sFn The name of the method to displace
     */
    Y.Do.Method = function(obj, sFn) {
        this.obj = obj;
        this.methodName = sFn;
        this.method = obj[sFn];
        // this.before = [];
        // this.after = [];
        this.before = {};
        this.after = {};
    };

    /**
     * Register a aop subscriber
     * @method register
     * @param sid {string} the subscriber id
     * @param fn {Function} the function to execute
     * @param when {string} when to execute the function
     */
    Y.Do.Method.prototype.register = function (sid, fn, when) {
        if (when) {
            // this.after.push(fn);
            this.after[sid] = fn;
        } else {
            // this.before.push(fn);
            this.before[sid] = fn;
        }
    };

    /**
     * Unregister a aop subscriber
     * @method delete
     * @param sid {string} the subscriber id
     * @param fn {Function} the function to execute
     * @param when {string} when to execute the function
     */
    Y.Do.Method.prototype._delete = function (sid) {
        delete this.before[sid];
        delete this.after[sid];
    };

    /**
     * Execute the wrapped method
     * @method exec
     */
    Y.Do.Method.prototype.exec = function () {

        var args = Y.Array(arguments, 0, true), 
            i, ret, newRet, 
            bf = this.before,
            af = this.after,
            prevented = false;

        // execute before
        for (i in bf) {
            if (bf.hasOwnProperty(i)) {
                ret = bf[i].apply(this.obj, args);
                if (ret) {
                    switch (ret.constructor) {
                        case Y.Do.Halt:
                            return ret.retVal;
                        case Y.Do.AlterArgs:
                            args = ret.newArgs;
                            break;
                        case Y.Do.Prevent:
                            prevented = true;
                            break;
                        default:
                    }
                }
            }
        }

        // execute method
        if (!prevented) {
            ret = this.method.apply(this.obj, args);
        }

        // execute after methods.
        for (i in af) {
            if (af.hasOwnProperty(i)) {
                newRet = af[i].apply(this.obj, args);
                // Stop processing if a Halt object is returned
                if (newRet && newRet.constructor == Y.Do.Halt) {
                    return newRet.retVal;
                // Check for a new return value
                } else if (newRet && newRet.constructor == Y.Do.AlterReturn) {
                    ret = newRet.newRetVal;
                }
            }
        }

        return ret;
    };

    //////////////////////////////////////////////////////////////////////////


    /**
     * Return an AlterArgs object when you want to change the arguments that
     * were passed into the function.  An example would be a service that scrubs
     * out illegal characters prior to executing the core business logic.
     * @class Do.AlterArgs
     */
    Y.Do.AlterArgs = function(msg, newArgs) {
        this.msg = msg;
        this.newArgs = newArgs;
    };

    /**
     * Return an AlterReturn object when you want to change the result returned
     * from the core method to the caller
     * @class Do.AlterReturn
     */
    Y.Do.AlterReturn = function(msg, newRetVal) {
        this.msg = msg;
        this.newRetVal = newRetVal;
    };

    /**
     * Return a Halt object when you want to terminate the execution
     * of all subsequent subscribers as well as the wrapped method
     * if it has not exectued yet.
     * @class Do.Halt
     */
    Y.Do.Halt = function(msg, retVal) {
        this.msg = msg;
        this.retVal = retVal;
    };

    /**
     * Return a Prevent object when you want to prevent the wrapped function
     * from executing, but want the remaining listeners to execute
     * @class Do.Halt
     */
    Y.Do.Prevent = function(msg) {
        this.msg = msg;
    };

    /**
     * Return an Error object when you want to terminate the execution
     * of all subsequent method calls.
     * @class Do.Error
     * @deprecated
     */
    Y.Do.Error = Y.Do.Halt;

    //////////////////////////////////////////////////////////////////////////

// Y["Event"] && Y.Event.addListener(window, "unload", Y.Do._unload, Y.Do);

}, "3.0.0");
/*
 * YUI Custom Events
 * @submodule event-custom
 * @module event
 */
YUI.add("event-custom", function(Y) {

    var onsubscribeType = "_event:onsub",
        AFTER = 'after', 
        CONFIGS = [
            'broadcast',
            'bubbles',
            'context',
            'configured',
            'currentTarget',
            'defaultFn',
            'details',
            'emitFacade',
            'fireOnce',
            'host',
            'preventable',
            'preventedFn',
            'queuable',
            'silent',
            'stoppedFn',
            'target',
            'type'
        ],

        YUI3_SIGNATURE = 9;

    /**
     * Return value from all subscribe operations
     * @class Event.Handle
     * @constructor
     * @param evt {Event.Custom} the custom event
     * @param sub {Event.Subscriber} the subscriber
     */
    Y.EventHandle = function(evt, sub) {

        /**
         * The custom event
         * @type Event.Custom
         */
        this.evt = evt;

        /**
         * The subscriber object
         * @type Event.Subscriber
         */
        this.sub = sub;
    };

    Y.EventHandle.prototype = {
        /**
         * Detaches this subscriber
         * @method detach
         */
        detach: function() {

            if (this.evt) {
                this.evt._delete(this.sub);
            }
        }
    };

    /**
     * The Event.Custom class lets you define events for your application
     * that can be subscribed to by one or more independent component.
     *
     * @param {String}  type The type of event, which is passed to the callback
     *                  when the event fires
     * @param o configuration object
     * @class Event.Custom
     * @constructor
     */
    Y.CustomEvent = function(type, o) {

        // if (arguments.length > 2) {
        // }

        o = o || {};

        this.id = Y.stamp(this);

        /**
         * The type of event, returned to subscribers when the event fires
         * @property type
         * @type string
         */
        this.type = type;

        /**
         * The context the the event will fire from by default.  Defaults to the YUI
         * instance.
         * @property context
         * @type object
         */
        this.context = Y;


        /**
         * If 0, this event does not broadcast.  If 1, the YUI instance is notified
         * every time this event fires.  If 2, the YUI instance and the YUI global
         * (if event is enabled on the global) are notified every time this event
         * fires.
         * @property broadcast
         * @type int
         */
        this.broadcast = 0;

        /**
         * By default all custom events are logged in the debug build, set silent
         * to true to disable debug outpu for this event.
         * @property silent
         * @type boolean
         */

        this.queuable = false;

        /**
         * The subscribers to this event
         * @property subscribers
         * @type Event.Subscriber{}
         */
        this.subscribers = {};

        /*
         * The publisher has configured this event
         * @property configured
         * @type boolean
         * @default true
         */
        // this.configured = true;

        /**
         * 'After' subscribers
         * @property afters
         * @type Event.Subscriber{}
         */
        this.afters = {};

        /**
         * This event has fired if true
         *
         * @property fired
         * @type boolean
         * @default false;
         */
        this.fired = false;

        /**
         * This event should only fire one time if true, and if
         * it has fired, any new subscribers should be notified
         * immediately.
         *
         * @property fireOnce
         * @type boolean
         * @default false;
         */
        this.fireOnce = false;

        /**
         * Flag for stopPropagation that is modified during fire()
         * 1 means to stop propagation to bubble targets.  2 means
         * to also stop additional subscribers on this target.
         * @property stopped
         * @type int
         */
        this.stopped = 0;

        /**
         * Flag for preventDefault that is modified during fire().
         * if it is not 0, the default behavior for this event
         * @property prevented
         * @type int
         */
        this.prevented = 0;

        /**
         * Specifies the host for this custom event.  This is used
         * to enable event bubbling
         * @property host
         * @type Event.Target
         */
        this.host = null;

        /**
         * The default function to execute after event listeners
         * have fire, but only if the default action was not
         * prevented.
         * @property defaultFn
         * @type Function
         */
        this.defaultFn = null;

        /**
         * The function to execute if a subscriber calls
         * stopPropagation or stopImmediatePropagation
         * @property stoppedFn
         * @type Function
         */
        this.stoppedFn = null;

        /**
         * The function to execute if a subscriber calls
         * preventDefault
         * @property preventedFn
         * @type Function
         */
        this.preventedFn = null;

        /**
         * Specifies whether or not this event's default function
         * can be cancelled by a subscriber by executing preventDefault() 
         * on the event facade 
         * @property preventable 
         * @type boolean 
         * @default true
         */
        this.preventable = true;

        /**
         * Specifies whether or not a subscriber can stop the event propagation
         * via stopPropagation(), stopImmediatePropagation(), or halt()
         * @property bubbles
         * @type boolean
         * @default true
         */
        this.bubbles = true;

        /**
         * Supports multiple options for listener signatures in order to
         * port YUI 2 apps.
         * @property signature
         * @type int
         * @default 9
         */
        this.signature = YUI3_SIGNATURE;

        /**
         * If set to true, the custom event will deliver an Event.Facade object
         * that is similar to a DOM event object.
         * @property emitFacade
         * @type boolean
         * @default false
         */
        this.emitFacade = false;

        this.applyConfig(o, true);


        // Only add subscribe events for events that are not generated by 
        // Event.Custom
        if (type !== onsubscribeType) {

            /**
             * Custom events provide a custom event that fires whenever there is
             * a new subscriber to the event.  This provides an opportunity to
             * handle the case where there is a non-repeating event that has
             * already fired has a new subscriber.  
             *
             * @event subscribeEvent
             * @type Event.Custom
             * @param {Function} fn The function to execute
             * @param {Object}   obj An object to be passed along when the event 
             *                       fires
             * @param {boolean|Object}  override If true, the obj passed in becomes 
             *                                   the execution context of the listener.
             *                                   if an object, that object becomes the
             *                                   the execution context.
             */
            this.subscribeEvent = new Y.CustomEvent(onsubscribeType, {
                    context: this,
                    silent: true
                });
        } 

    };

    Y.CustomEvent.prototype = {

        _YUI_EVENT: true,

        /**
         * Apply configuration properties.  Only applies the CONFIG whitelist
         * @method applyConfig
         * @param o hash of properties to apply
         * @param force {boolean} if true, properties that exist on the event 
         * will be overwritten.
         */
        applyConfig: function(o, force) {
            if (o) {
                Y.mix(this, o, force, CONFIGS);
            }
        },

        _subscribe: function(fn, obj, args, when) {

            if (!fn) {
                Y.fail("Invalid callback for CE: " + this.type);
            }

            var se = this.subscribeEvent;
            if (se) {
                se.fire.apply(se, args);
            }

            var s = new Y.Subscriber(fn, obj, args, when);


            if (this.fireOnce && this.fired) {

                // this._notify(s);
                // setTimeout(Y.bind(this._notify, this, s), 0);
                Y.later(0, this, this._notify, s);
            }

            if (when == AFTER) {
                this.afters[s.id] = s;
            } else {
                this.subscribers[s.id] = s;
            }

            return new Y.EventHandle(this, s);

        },

        /**
         * Listen for this event
         * @method subscribe
         * @param {Function} fn        The function to execute
         * @param {Object}   obj       An object to be passed along when the event fires
         * @param args* 1..n params to provide to the listener
         * @return {Event.Handle} unsubscribe handle
         */
        subscribe: function(fn, obj) {
            return this._subscribe(fn, obj, arguments, true);
        },

        /**
         * Listen for this event after the normal subscribers have been notified and
         * the default behavior has been applied.  If a normal subscriber prevents the 
         * default behavior, it also prevents after listeners from firing.
         * @method after
         * @param {Function} fn        The function to execute
         * @param {Object}   obj       An object to be passed along when the event fires
         * @param args* 1..n params to provide to the listener
         * @return {Event.Handle} unsubscribe handle
         */
        after: function(fn, obj) {
            return this._subscribe(fn, obj, arguments, AFTER);
        },

        /**
         * Unsubscribes subscribers.
         * @method unsubscribe
         * @param {Function} fn  The subscribed function to remove, if not supplied
         *                       all will be removed
         * @param {Object}   obj  The custom object passed to subscribe.  This is
         *                        optional, but if supplied will be used to
         *                        disambiguate multiple listeners that are the same
         *                        (e.g., you subscribe many object using a function
         *                        that lives on the prototype)
         * @return {boolean} True if the subscriber was found and detached.
         */
        unsubscribe: function(fn, obj) {

            // if arg[0] typeof unsubscribe handle
            if (fn && fn.detach) {
                return fn.detach();
            }

            if (!fn) {
                return this.unsubscribeAll();
            }

            var found = false, subs = this.subscribers;
            for (var i in subs) {
                if (subs.hasOwnProperty(i)) {
                    var s = subs[i];
                    if (s && s.contains(fn, obj)) {
                        this._delete(s);
                        found = true;
                    }
                }
            }

            return found;
        },

        _getFacade: function(args) {

            var ef = this._facade;

            if (!ef) {
                ef = new Y.Event.Facade(this, this.currentTarget);
            }

            // if the first argument is an object literal, apply the
            // properties to the event facade
            var o = args && args[0];
            if (Y.Lang.isObject(o, true) && !o._yuifacade) {
                Y.mix(ef, o, true);
            }

            // update the details field with the arguments
            ef.details = this.details;
            ef.target = this.target;
            ef.currentTarget = this.currentTarget;
            ef.stopped = 0;
            ef.prevented = 0;

            this._facade = ef;

            return this._facade;
        },

        /**
         * Notify a single subscriber
         * @method _notify
         * @param s {Event.Subscriber} the subscriber
         * @param args {Array} the arguments array to apply to the listener
         * @private
         */
        _notify: function(s, args, ef) {


            var ret, c, ct;

            // emit an Event.Facade if this is that sort of event
            // if (this.emitFacade && (!args[0] || !args[0]._yuifacade)) {
            if (this.emitFacade) {

                // @TODO object literal support to fire makes it possible for
                // config info to be passed if we wish.
                
                if (!ef) {
                    ef = this._getFacade(args);
                    args[0] = ef;
                }

            }

            // The default context should be the object/element that
            // the listener was bound to.
            ct = (args && Y.Lang.isObject(args[0]) && args[0].currentTarget);
            ret = s.notify(ct || this.context, args, this);

            if (false === ret || this.stopped > 1) {
                return false;
            }

            return true;
        },

        /**
         * Logger abstraction to centralize the application of the silent flag
         * @method log
         * @param msg {string} message to log
         * @param cat {string} log category
         */
        log: function(msg, cat) {
            var es = Y.Env._eventstack, s =  es && es.logging;
            // if (!s && !this.silent) {
            if (!this.silent) {
            }
        },

        /**
         * Notifies the subscribers.  The callback functions will be executed
         * from the context specified when the event was created, and with the 
         * following parameters:
         *   <ul>
         *   <li>The type of event</li>
         *   <li>All of the arguments fire() was executed with as an array</li>
         *   <li>The custom object (if any) that was passed into the subscribe() 
         *       method</li>
         *   </ul>
         * @method fire 
         * @param {Object*} arguments an arbitrary set of parameters to pass to 
         *                            the handler.
         * @return {boolean} false if one of the subscribers returned false, 
         *                   true otherwise
         */
        fire: function() {

            var es = Y.Env._eventstack;

            if (es) {

                // var b = this.bubbles, h = this.host;
                // if (b && h) {
                //     b = (h._yuievt.targets.length);
                // }

                // es.silent = (es.silent || this.silent);

                // queue this event if the current item in the queue bubbles
                // if (b && this.queuable && this.type != es.next.type) {
                if (this.queuable && this.type != es.next.type) {


                    es.queue.push([this, arguments]);
                    return true;
                }

            } else {

                Y.Env._eventstack = {
                   // id of the first event in the stack
                   id: this.id,
                   next: this,
                   silent: this.silent,
                   logging: (this.type === 'yui:log'),
                   stopped: 0,
                   prevented: 0,
                   queue: []
                };

                es = Y.Env._eventstack;
            }

            var ret = true;

            if (this.fireOnce && this.fired) {


            } else {

                // var subs = this.subscribers.slice(), len=subs.length,
                var subs = Y.merge(this.subscribers), s,
                           args=Y.Array(arguments, 0, true), i;

                this.stopped = 0;
                this.prevented = 0;
                this.target = this.target || this.host;

                this.currentTarget = this.host || this.currentTarget;

                this.fired = true;
                this.details = args.slice(); // original arguments in the details


                var hasSub = false;
                es.lastLogState = es.logging;


                var ef = null;
                if (this.emitFacade) {

                    // this.fire({
                    //   foo: 1
                    //   bar: 2
                    // }
                    // this.fire({
                    //   bar: 2
                    // } // foo is still 1 unless we create a new facade
                    this._facade = null;

                    ef = this._getFacade(args);
                    args[0] = ef;
                }

                for (i in subs) {
                    if (subs.hasOwnProperty(i)) {

                        if (!hasSub) {
                            es.logging = (es.logging || (this.type === 'yui:log'));
                            hasSub = true;
                        }

                        // stopImmediatePropagation
                        if (this.stopped == 2) {
                            break;
                        }

                        s = subs[i];
                        if (s && s.fn) {
                            ret = this._notify(s, args, ef);
                            if (false === ret) {
                                this.stopped = 2;
                            }
                        }
                    }
                }

                es.logging = (es.lastLogState);

                // bubble if this is hosted in an event target and propagation has not been stopped
                // @TODO check if we need to worry about defaultFn order
                if (this.bubbles && this.host && !this.stopped) {
                    es.stopped = 0;
                    es.prevented = 0;
                    ret = this.host.bubble(this);

                    this.stopped = Math.max(this.stopped, es.stopped);
                    this.prevented = Math.max(this.prevented, es.prevented);
                }

                // execute the default behavior if not prevented
                // @TODO need context
                if (this.defaultFn && !this.prevented) {
                    this.defaultFn.apply(this.host || this, args);
                }

                // process after listeners.  If the default behavior was
                // prevented, the after events don't fire.
                if (!this.prevented && this.stopped < 2) {
                    subs = Y.merge(this.afters);
                    for (i in subs) {
                        if (subs.hasOwnProperty(i)) {

                            if (!hasSub) {
                                es.logging = (es.logging || (this.type === 'yui:log'));
                                hasSub = true;
                            }

                            // stopImmediatePropagation
                            if (this.stopped == 2) {
                                break;
                            }

                            s = subs[i];
                            if (s && s.fn) {
                                ret = this._notify(s, args, ef);
                                if (false === ret) {
                                    this.stopped = 2;
                                }
                            }
                        }
                    }
                }
            }

            if (es.id === this.id) {
// console.log('clearing stack: ' + es.id + ', ' + this);

// reset propragation properties while processing the rest of the queue

// process queued events
                var queue = es.queue;

                while (queue.length) {
                    // q[0] = the event, q[1] = arguments to fire
                    var q = queue.pop(), ce = q[0];

                    es.stopped = 0;
                    es.prevented = 0;
                    
// set up stack to allow the next item to be processed
                    es.next = ce;

                    ret = ce.fire.apply(ce, q[1]);
                }

                Y.Env._eventstack = null;
            } 

            return (ret !== false);
        },

        /**
         * Removes all listeners
         * @method unsubscribeAll
         * @return {int} The number of listeners unsubscribed
         */
        unsubscribeAll: function() {
            var subs = this.subscribers, i;
            for (i in subs) {
                if (subs.hasOwnProperty(i)) {
                    this._delete(subs[i]);
                }
            }

            this.subscribers={};

            return i;
        },

        /**
         * @method _delete
         * @param subscriber object
         * @private
         */
        _delete: function(s) {

            if (s) {
                delete s.fn;
                delete s.obj;
                delete this.subscribers[s.id];
                delete this.afters[s.id];
            }

        },

        /**
         * @method toString
         */
        toString: function() {
             // return "{ CE '" + this.type + "' " + "id: " + this.id +
                  // ", host: " + (this.host && Y.stamp(this.host) + " }");
             return this.type;
        },

        /**
         * Stop propagation to bubble targets
         * @method stopPropagation
         */
        stopPropagation: function() {
            this.stopped = 1;
            Y.Env._eventstack.stopped = 1;
            if (this.stoppedFn) {
                this.stoppedFn.call(this.host || this, this);
            }
        },

        /**
         * Stops propagation to bubble targets, and prevents any remaining
         * subscribers on the current target from executing.
         * @method stopImmediatePropagation
         */
        stopImmediatePropagation: function() {
            this.stopped = 2;
            Y.Env._eventstack.stopped = 2;
            if (this.stoppedFn) {
                this.stoppedFn.call(this.host || this, this);
            }
        },

        /**
         * Prevents the execution of this event's defaultFn
         * @method preventDefault
         */
        preventDefault: function() {
            if (this.preventable) {
                this.prevented = 1;
                Y.Env._eventstack.prevented = 1;
            }
            if (this.preventedFn) {
                this.preventedFn.call(this.host || this, this);
            }
        }

    };

    /////////////////////////////////////////////////////////////////////

    /**
     * Stores the subscriber information to be used when the event fires.
     * @param {Function} fn       The wrapped function to execute
     * @param {Object}   obj      An object to be passed along when the event fires
     * @param {Array} args        subscribe() additional arguments
     *
     * @class Event.Subscriber
     * @constructor
     */
    Y.Subscriber = function(fn, obj, args) {

        /**
         * The callback that will be execute when the event fires
         * This is wrapped by Y.bind if obj was supplied.
         * @property fn
         * @type Function
         */
        this.fn = fn;

        /**
         * An optional custom object that will passed to the callback when
         * the event fires
         * @property obj
         * @type Object
         */
        this.obj = obj;

        /**
         * Unique subscriber id
         * @property id
         * @type String
         */
        this.id = Y.stamp(this);

        /**
         * Optional additional arguments supplied to subscribe().  If present,
         * these will be appended to the arguments supplied to fire()
         * @property args
         * @type Array
         */
        // this.args = args;

        /**
         * }
         * fn bound to obj with additional arguments applied via Y.bind
         * @property wrappedFn
         * @type Function
         */
        this.wrappedFn = fn;
        
        if (obj) {
            /*
            var a = (args) ? Y.Array(args) : [];
            a.unshift(fn, obj);
            // a.unshift(fn);
            m = Y.bind.apply(Y, a);
            */
            this.wrappedFn = Y.bind.apply(Y, args);
        }
        


    };

    Y.Subscriber.prototype = {

        /**
         * Executes the subscriber.
         * @method notify
         * @param defaultContext The execution context if not overridden
         * by the subscriber
         * @param args {Array} Arguments array for the subscriber
         * @param ce {Event.Custom} The custom event that sent the notification
         */
        notify: function(defaultContext, args, ce) {
            var c = this.obj || defaultContext, ret = true,

                f = function() {
                    switch (ce.signature) {
                        case 0:
                            ret = this.fn.call(c, ce.type, args, this.obj);
                            break;
                        case 1:
                            ret = this.fn.call(c, args[0] || null, this.obj);
                            break;
                        default:
                            ret = this.wrappedFn.apply(c, args || []);
                    }
                };

            // Ease debugging by only catching errors if we will not re-throw
            // them.
            if (Y.config.throwFail) {
                f.call(this);
            } else {
                try {
                    f.call(this);
                } catch(e) {
                    Y.fail(this + ' failed: ' + e.message, e);
                }
            }

            return ret;
        },

        /**
         * Returns true if the fn and obj match this objects properties.
         * Used by the unsubscribe method to match the right subscriber.
         *
         * @method contains
         * @param {Function} fn the function to execute
         * @param {Object} obj an object to be passed along when the event fires
         * @return {boolean} true if the supplied arguments match this 
         *                   subscriber's signature.
         */
        contains: function(fn, obj) {
            if (obj) {
                return ((this.fn == fn) && this.obj == obj);
            } else {
                return (this.fn == fn);
            }
        },

        /**
         * @method toString
         */
        toString: function() {
            return "Subscriber " + this.id;
        }
    };

}, "3.0.0");
/*
 * Configures an object to be able to be targeted for events, and to publish events
 * @submodule event-target
 * @module event
 */
YUI.add("event-target", function(Y) {

    var SILENT = { 'yui:log': true };

    /**
     * Event.Target is designed to be used with Y.augment to wrap 
     * Event.Custom in an interface that allows events to be subscribed to 
     * and fired by name.  This makes it possible for implementing code to
     * subscribe to an event that either has not been created yet, or will
     * not be created at all.
     *
     * @Class Event.Target
     */
    Y.EventTarget = function(opts) { 

        // console.log('Event.Target constructor executed: ' + this._yuid);

        var o = (Y.Lang.isObject(opts)) ? opts : {};

        this._yuievt = {

            events: {},

            targets: {},

            config: o,

            defaults: {
                context: this, 
                host: this,
                emitFacade: o.emitFacade || false,
                bubbles: ('bubbles' in o) ? o.bubbles : true
            }
            
        };

    };

    var ET = Y.EventTarget;


    ET.prototype = {

        /**
         * Subscribe to a custom event hosted by this object
         * @method subscribe
         * @param type    {string}   The type of the event
         * @param fn {Function} The callback
         * @param context The execution context
         * @param args* 1..n params to supply to the callback
         */
        subscribe: function(type, fn, context) {

            if (Y.Lang.isObject(type)) {

                var f = fn, c = context, args = Y.Array(arguments, 0, true),
                    ret = {};

                Y.each(type, function(v, k) {

                    if (v) {
                        f = v.fn || f;
                        c = v.context || c;
                    }

                    args[0] = k;
                    args[1] = f;
                    args[2] = c;

                    ret[k] = this.subscribe.apply(this, args); 

                }, this);

                return ret;

            }

            var ce = this._yuievt.events[type] || 
                // this.publish(type, {
                //     configured: false
                // }),
                this.publish(type),
                a = Y.Array(arguments, 1, true);

            return ce.subscribe.apply(ce, a);

        },

        /**
         * Unsubscribes one or more listeners the from the specified event
         * @method unsubscribe
         * @param type {string|Object}   Either the handle to the subscriber or the 
         *                        type of event.  If the type
         *                        is not specified, it will attempt to remove
         *                        the listener from all hosted events.
         * @param fn   {Function} The subscribed function to unsubscribe, if not
         *                          supplied, all subscribers will be removed.
         * @param context  {Object}   The custom object passed to subscribe.  This is
         *                        optional, but if supplied will be used to
         *                        disambiguate multiple listeners that are the same
         *                        (e.g., you subscribe many object using a function
         *                        that lives on the prototype)
         * @return {boolean} true if the subscriber was found and detached.
         */
        unsubscribe: function(type, fn, context) {

            // If this is an event handle, use it to detach
            if (Y.Lang.isObject(type) && type.detach) {
                return type.detach();
            }

            var evts = this._yuievt.events;

            if (type) {
                var ce = evts[type];
                if (ce) {
                    return ce.unsubscribe(fn, context);
                }
            } else {
                var ret = true;
                for (var i in evts) {
                    if (Y.Object.owns(evts, i)) {
                        ret = ret && evts[i].unsubscribe(fn, context);
                    }
                }
                return ret;
            }

            return false;
        },
        
        /**
         * Removes all listeners from the specified event.  If the event type
         * is not specified, all listeners from all hosted custom events will
         * be removed.
         * @method unsubscribeAll
         * @param type {string}   The type, or name of the event
         */
        unsubscribeAll: function(type) {
            return this.unsubscribe(type);
        },

        /**
         * Creates a new custom event of the specified type.  If a custom event
         * by that name already exists, it will not be re-created.  In either
         * case the custom event is returned. 
         *
         * @method publish
         *
         * @param type {string} the type, or name of the event
         * @param opts {object} optional config params.  Valid properties are:
         *
         *  <ul>
         *    <li>
         *   'broadcast': whether or not the YUI instance and YUI global are notified when the event is fired (false)
         *    </li>
         *    <li>
         *   'bubbles': whether or not this event bubbles (true)
         *    </li>
         *    <li>
         *   'context': the default execution context for the listeners (this)
         *    </li>
         *    <li>
         *   'defaultFn': the default function to execute when this event fires if preventDefault was not called
         *    </li>
         *    <li>
         *   'emitFacade': whether or not this event emits a facade (false)
         *    </li>
         *    <li>
         *   'fireOnce': if an event is configured to fire once, new subscribers after
         *   the fire will be notified immediately.
         *    </li>
         *    <li>
         *   'preventable': whether or not preventDefault() has an effect (true)
         *    </li>
         *    <li>
         *   'preventedFn': a function that is executed when preventDefault is called
         *    </li>
         *    <li>
         *   'queuable': whether or not this event can be queued during bubbling (false)
         *    </li>
         *    <li>
         *   'silent': if silent is true, debug messages are not provided for this event.
         *    </li>
         *    <li>
         *   'stoppedFn': a function that is executed when stopPropagation is called
         *    </li>
         *    <li>
         *   'type': the event type (valid option if not provided as the first parameter to publish)
         *    </li>
         *  </ul>
         *
         *  @return {Event.Custom} the custom event
         *
         */
        publish: function(type, opts) {

            if (Y.Lang.isObject(type)) {
                var ret = {};
                Y.each(type, function(v, k) {
                    ret[k] = this.publish(k, v || opts); 
                }, this);

                return ret;
            }

            var events = this._yuievt.events, ce = events[type];

            //if (ce && !ce.configured) {
            if (ce) {
// ce.log("publish applying config to published event: '"+type+"' exists", 'info', 'event');

                // This event could have been published
                ce.applyConfig(opts, true);
                // ce.configured = true;

            } else {
                var o = opts || {};

                // apply defaults
                Y.mix(o, this._yuievt.defaults);

                ce = new Y.CustomEvent(type, o);

                events[type] = ce;

                if (o.onSubscribeCallback) {
                    ce.subscribeEvent.subscribe(o.onSubscribeCallback);
                }

            }

            return events[type];
        },

        /**
         * Registers another Event.Target as a bubble target.  Bubble order
         * is determined by the order registered.  Multiple targets can
         * be specified.
         * @method addTarget
         * @param o {Event.Target} the target to add
         */
        addTarget: function(o) {
            this._yuievt.targets[Y.stamp(o)] = o;
            this._yuievt.hasTargets = true;
        },

        /**
         * Removes a bubble target
         * @method removeTarget
         * @param o {Event.Target} the target to remove
         */
        removeTarget: function(o) {
            delete this._yuievt.targets[Y.stamp(o)];
        },

       /**
         * Fire a custom event by name.  The callback functions will be executed
         * from the context specified when the event was created, and with the 
         * following parameters.
         *
         * If the custom event object hasn't been created, then the event hasn't 
         * been published and it has no subscribers.  For performance sake, we 
         * immediate exit in this case.  This means the event won't bubble, so 
         * if the intention is that a bubble target be notified, the event must 
         * be published on this object first.
         *
         * @method fire
         * @param type {String|Object} The type of the event, or an object that contains
         * a 'type' property.
         * @param arguments {Object*} an arbitrary set of parameters to pass to 
         * the handler.
         * @return {boolean} the return value from Event.Custom.fire
         *                   
         */
        fire: function(type) {

            var typeIncluded = Y.Lang.isString(type),
                t = (typeIncluded) ? type : (type && type.type);

            var ce = this.getEvent(t);

            // this event has not been published or subscribed to
            if (!ce) {
                
                // if this object has bubble targets, we need to publish the
                // event in order for it to bubble.
                if (this._yuievt.hasTargets) {
                    // ce = this.publish(t, {
                    //     configured: false
                    // });
                    ce = this.publish(t);
                    ce.details = Y.Array(arguments, (typeIncluded) ? 1 : 0, true);

                    return this.bubble(ce);
                }

                // otherwise there is nothing to be done
                return true;
            }

            // Provide this object's subscribers the object they are listening to.
            // ce.currentTarget = this;

            // This this the target unless target is current not null
            // (set in bubble()).
            // ce.target = ce.target || this;

            var a = Y.Array(arguments, (typeIncluded) ? 1 : 0, true);
            var ret = ce.fire.apply(ce, a);

            // clear target for next fire()
            ce.target = null;

            return ret;
        },

        /**
         * Returns the custom event of the provided type has been created, a
         * falsy value otherwise
         * @method getEvent
         * @param type {string} the type, or name of the event
         * @return {Event.Custom} the custom event or null
         */
        getEvent: function(type) {
            var e = this._yuievt.events;
            return (e && type in e) ? e[type] : null;
        },

        /**
         * Propagate an event
         * @method bubble
         * @param evt {Event.Custom} the custom event to propagate
         * @return {boolean} the aggregated return value from Event.Custom.fire
         */
        bubble: function(evt) {

            var targs = this._yuievt.targets, ret = true;

            if (!evt.stopped && targs) {


                for (var i in targs) {
                    if (targs.hasOwnProperty(i)) {

                        var t = targs[i], type = evt.type,
                            ce = t.getEvent(type), targetProp = evt.target || this;
                            
                        // if this event was not published on the bubble target,
                        // publish it with sensible default properties
                        if (!ce) {

                            // publish the event on the bubble target using this event
                            // for its configuration
                            ce = t.publish(type, evt);
                            // ce.configured = false;

                            // set the host and context appropriately
                            ce.context = (evt.host === evt.context) ? t : evt.context;
                            ce.host = t;

                            // clear handlers if specified on this event
                            ce.defaultFn = null;
                            ce.preventedFn = null;
                            ce.stoppedFn = null;
                        }

                        ce.target = targetProp;
                        ce.currentTarget = t;

                        // ce.target = evt.target;

                        ret = ret && ce.fire.apply(ce, evt.details);

                        // stopPropagation() was called
                        if (ce.stopped) {
                            break;
                        }
                    }
                }
            }

            return ret;
        },

        /**
         * Subscribe to a custom event hosted by this object.  The
         * supplied callback will execute after any listeners add
         * via the subscribe method, and after the default function,
         * if configured for the event, has executed.
         * @method after
         * @param type    {string}   The type of the event
         * @param fn {Function} The callback
         * @param context The execution context
         * @param args* 1..n params to supply to the callback
         */
        after: function(type, fn) {
            if (Y.Lang.isFunction(type)) {
                return Y.Do.after.apply(Y.Do, arguments);
            } else {
                var ce = this._yuievt.events[type] || 
                    // this.publish(type, {
                    //     configured: false
                    // }),
                    this.publish(type),
                    a = Y.Array(arguments, 1, true);

                return ce.after.apply(ce, a);
            }
        },

        before: function(type, fn) {
            if (Y.Lang.isFunction(type)) {
                return Y.Do.after.apply(Y.Do, arguments);
            } else {
                return this.subscribe.apply(this, arguments);
            }
        }

    };

    // make Y an event target
    Y.mix(Y, ET.prototype, false, false, { 
        bubbles: false 
    });
    ET.call(Y);


}, "3.0.0");

/*
 * DOMReady
 * @submodule event-ready
 * @module event
 */

(function() {

var Env = YUI.Env, 
    C = YUI.config, 
    D = C.doc, 
    POLL_INTERVAL = C.pollInterval || 20;

    if (!Env._ready) {

        Env.windowLoaded = false;

        var _ready = function(e) {
            YUI.Env._ready();
        };

        Env._ready = function() {
            if (!Env.DOMReady) {
                Env.DOMReady=true;

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

            Env._dri = setInterval(function() {
                try {
                    // throws an error if doc is not ready
                    document.documentElement.doScroll('left');
                    clearInterval(Env._dri);
                    Env._dri = null;
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

    YUI.add("event-ready", function(Y) {

        if (Y === YUI) {
            return;
        }

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
             * @optional args 1..n arguments to send to the listener
             *
             */
            domready: {

            },

            /**
             * Use domready event instead. @see domready
             * @event event:ready
             * @for YUI
             * @deprecated use 'domready' instead
             */
            'event:ready': {

                on: function() {
                    arguments[0] = 'domready';
                    return Y.subscribe.apply(Y, arguments);
                },

                detach: function() {
                    arguments[0] = 'domready';
                    return Y.unsubscribe.apply(Y, arguments);
                }
            }

        });


        Y.publish('domready', {
            fireOnce: true
        });

        var yready = function() {
            Y.fire('domready');
        };

        if (Env.DOMReady) {
            yready();
        } else {
            Y.before(yready, Env, "_ready");
        }

    }, "3.0.0");

})();
/*
 * The YUI DOM event system
 * @submodule event-dom
 * @module event
 */
(function() {

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
        remove(window, "load", onLoad);
    },

    EVENT_READY = 'domready',

    COMPAT_ARG = '~yui|2|compat~',

    CAPTURE = "capture_";

add(window, "load", onLoad);

YUI.add("event-dom", function(Y) {

    /**
     * The event utility provides functions to add and remove event listeners,
     * event cleansing.  It also tries to automatically remove listeners it
     * registers during the unload event.
     *
     * @class Event
     * @static
     */
    Y.Event = function() {

        /**
         * True after the onload event has fired
         * @property loadComplete
         * @type boolean
         * @static
         * @private
         */
        var loadComplete =  false;

        /**
         * The number of times to poll after window.onload.  This number is
         * increased if additional late-bound handlers are requested after
         * the page load.
         * @property _retryCount
         * @static
         * @private
         */
        var _retryCount = 0;

        /**
         * onAvailable listeners
         * @property _avail
         * @static
         * @private
         */
        var _avail = [];

        /**
         * Custom event wrappers for DOM events.  Key is 
         * 'event:' + Element uid stamp + event type
         * @property _wrappers
         * @type Y.Event.Custom
         * @static
         * @private
         */
        var _wrappers = {};

        var _windowLoadKey = null;

        /**
         * Custom event wrapper map DOM events.  Key is 
         * Element uid stamp.  Each item is a hash of custom event
         * wrappers as provided in the _wrappers collection.  This
         * provides the infrastructure for getListeners.
         * @property _el_events
         * @static
         * @private
         */
        var _el_events = {};

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

                var a = Y.Array(id);


                for (var i=0; i<a.length; i=i+1) {
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
             * @param {Boolean|object}  args 1..n ar
             * @return {Boolean} True if the action was successful or defered,
             *                        false if one or more of the elements 
             *                        could not have the listener attached,
             *                        or if the operation throws an exception.
             * @static
             */
            attach: function(type, fn, el, obj) {

                // var a=Y.Array(arguments, 1, true), override=a[3], E=Y.Event, aa=Y.Array(arguments, 0, true);

                var args=Y.Array(arguments, 0, true), 
                    trimmedArgs=args.slice(1),
                    compat, E=Y.Event, capture = false;

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


                    var handles=[], i, l;
                    
                    Y.each(el, function(v, k) {
                        args[2] = v;
                        handles.push(E.attach.apply(E, args));
                    });

                    return handles;


                } else if (Y.Lang.isString(el)) {

                    var oEl = (compat) ? Y.DOM.byId(el) : Y.all(el);

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

                    if (oEl && (oEl instanceof Y.Node)) {
                        var size = oEl.size();
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

                var ek = Y.stamp(el), key = 'event:' + ek + type,
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
                var context = trimmedArgs[2] || ((compat) ? el : Y.get(el));
                
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

                var args=Y.Array(arguments, 0, true), compat;

                if (args[args.length-1] === COMPAT_ARG) {
                    compat = true;
                    // args.pop();
                }

                if (type && type.detach) {
                    return type.detach();
                }

                var i, len, li;

                // The el argument can be a string
                if (typeof el == "string") {

                    el = (compat) ? Y.DOM.byId(el) : Y.all(el);

                // The el argument can be an array of elements or element ids.
                } else if ( this._isValidCollection(el)) {

                    var ok = true;
                    for (i=0, len=el.length; i<len; ++i) {

                        args[2] = el[i];

                        // ok = ( this.detach(el[i], type, fn) && ok );
                        ok = ( Y.Event.detach.apply(Y.Event, args) && ok );
                    }

                    return ok;

                }

                if (!fn || !fn.call) {
                    return this.purgeElement(el, false, type);
                }

                var id = 'event:' + Y.stamp(el) + type, 
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

                if (!loadComplete) {


                    loadComplete = true;

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
                var tryAgain = !loadComplete;
                if (!tryAgain) {
                    tryAgain = (_retryCount > 0);
                }

                // onAvailable
                var notAvail = [];

                var executeItem = function (el, item) {
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

                var i, len, item, el;

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
                            if (loadComplete || (el.get && el.get('nextSibling')) || el.nextSibling) {
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
                    id = Y.stamp(oEl);
                var lis = this.getListeners(oEl, type), i, len;
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
                var ek = Y.stamp(el), evts = _el_events[ek];

                if (!evts) {
                    return null;
                }

                var results=[] , key = (type) ? 'event:' + type : null;

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

    var E = Y.Event;

    // Process onAvailable/onContentReady items when when the DOM is ready in IE
    if (Y.UA.ie && Y.on) {
        Y.on(EVENT_READY, E._tryPreloadAttach, E, true);
    }

    E.Custom = Y.CustomEvent;
    E.Subscriber = Y.Subscriber;
    E.Target = Y.EventTarget;

    add(window, "load", E._load);
    add(window, "unload", E._unload);

    E._tryPreloadAttach();

}, "3.0.0");

})();
/*
 * A wrapper for DOM events and Custom Events
 * @submodule event-facade
 * @module event
 *
 * @TODO constants? LEFTBUTTON, MIDDLEBUTTON, RIGHTBUTTON, keys
 */
YUI.add("event-facade", function(Y) {


    var whitelist = {
        "altKey"          : 1,
        // "button"          : 1, // we supply
        // "bubbles"         : 1, // needed?
        // "cancelable"      : 1, // needed? 
        // "charCode"        : 1, // we supply
        "cancelBubble"    : 1,
        // "currentTarget"   : 1, // we supply
        "ctrlKey"         : 1,
        "clientX"         : 1, // needed?
        "clientY"         : 1, // needed?
        "detail"          : 1, // not fully implemented
        // "fromElement"     : 1,
        "keyCode"         : 1,
        // "height"          : 1, // needed?
        // "initEvent"       : 1, // need the init events?
        // "initMouseEvent"  : 1,
        // "initUIEvent"     : 1,
        // "layerX"          : 1, // needed?
        // "layerY"          : 1, // needed?
        "metaKey"         : 1,
        // "modifiers"       : 1, // needed?
        // "offsetX"         : 1, // needed?
        // "offsetY"         : 1, // needed?
        // "preventDefault"  : 1, // we supply
        // "reason"          : 1, // IE proprietary
        // "relatedTarget"   : 1,
        // "returnValue"     : 1, // needed?
        "shiftKey"        : 1,
        // "srcUrn"          : 1, // IE proprietary
        // "srcElement"      : 1,
        // "srcFilter"       : 1, IE proprietary
        // "stopPropagation" : 1, // we supply
        // "target"          : 1,
        // "timeStamp"       : 1, // needed?
        // "toElement"       : 1,
        "type"            : 1,
        // "view"            : 1,
        // "which"           : 1, // we supply
        // "width"           : 1, // needed?
        "x"               : 1,
        "y"               : 1
    };

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

    /**
     * Wraps a DOM event, properties requiring browser abstraction are
     * fixed here.  Provids a security layer when required.
     * @class Event.Facade
     * @param ev {Event} the DOM event
     * @param currentTarget {HTMLElement} the element the listener was attached to
     * @param wrapper {Event.Custom} the custom event wrapper for this DOM event
     */
    Y.Event.Facade = function(ev, currentTarget, wrapper, details) {

        // @TODO the document should be the target's owner document

        var e = ev, ot = currentTarget, d = Y.config.doc, b = d.body,
            x = e.pageX, y = e.pageY, isCE = (ev._YUI_EVENT);

        // copy all primitives ... this is slow in FF
        // for (var i in e) {
        for (var i in whitelist) {
            // if (!Y.Lang.isObject(e[i])) {
            if (whitelist.hasOwnProperty(i)) {
                this[i] = e[i];
            }
        }

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
        var c = e.keyCode || e.charCode || 0;

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

        /**
         * The event details.  Currently supported for Custom
         * Events only, where it contains the arguments that
         * were passed to fire().
         * @property details
         * @type Array
         */
        this.details = details;

        //////////////////////////////////////////////////////

        /**
         * Timestamp for the event
         * @property time
         * @type Date
         */
        this.time = e.time || new Date().getTime();

        //////////////////////////////////////////////////////
        
        /**
         * Node reference for the targeted element
         * @propery target
         * @type Node
         */
        this.target = (isCE) ? e.target : resolve(e.target || e.srcElement);

        /**
         * Node reference for the element that the listener was attached to.
         * @propery currentTarget
         * @type Node
         */
        this.currentTarget = (isCE) ? ot :  resolve(ot);

        var t = e.relatedTarget;
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
        this.relatedTarget = (isCE) ? t : resolve(t);
        
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
            if (wrapper) {
                wrapper.stopPropagation();
            }
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

            if (wrapper) {
                wrapper.stopImmediatePropagation();
            }

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
            if (wrapper) {
                wrapper.preventDefault();
            }
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

}, "3.0.0");
/*
 * Functionality to simulate events.
 * @submodule event-simulate
 * @module event
 */
YUI.add("event-simulate", function(Y) {

    //shortcuts
    var L   = Y.Lang,
        array       = Y.Array,
        isFunction  = L.isFunction,
        isString    = L.isString,
        isBoolean   = L.isBoolean,
        isObject    = L.isObject,
        isNumber    = L.isNumber,
        
        //mouse events supported
        mouseEvents = [
        
            /**
             * Simulates a click on a particular element.
             * @param {HTMLElement} target The element to click on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method click
             * @static   
             * @for Event
             */        
            "click", 
            
            /**
             * Simulates a double click on a particular element.
             * @param {HTMLElement} target The element to double click on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method dblclick
             * @static
             */            
            "dblclick", 
            
            /**
             * Simulates a mouseover event on a particular element. Use "relatedTarget"
             * on the options object to specify where the mouse moved from.
             * Quirks: Firefox less than 2.0 doesn't set relatedTarget properly, so
             * fromElement is assigned in its place. IE doesn't allow fromElement to be
             * be assigned, so relatedTarget is assigned in its place. Both of these
             * concessions allow YAHOO.util.Event.getRelatedTarget() to work correctly
             * in both browsers.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method mouseover
             * @static
             */             
            "mouseover", 
            
            /**
             * Simulates a mouseout event on a particular element. Use "relatedTarget"
             * on the options object to specify where the mouse moved to.
             * Quirks: Firefox less than 2.0 doesn't set relatedTarget properly, so
             * toElement is assigned in its place. IE doesn't allow toElement to be
             * be assigned, so relatedTarget is assigned in its place. Both of these
             * concessions allow YAHOO.util.Event.getRelatedTarget() to work correctly
             * in both browsers.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method mouseout
             * @static
             */            
            "mouseout", 
            
            /**
             * Simulates a mousedown on a particular element.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method mousedown
             * @static
             */            
            "mousedown", 
            
            /**
             * Simulates a mouseup on a particular element.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method mouseup
             * @static
             */            
            "mouseup", 
            
            /**
             * Simulates a mousemove on a particular element.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method mousemove
             * @static
             */           
            "mousemove"
        ],
        
        //key events supported
        keyEvents   = [
        
            /**
             * Simulates a keydown event on a particular element.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method keydown
             * @static
             */        
            "keydown", 
            
            /**
             * Simulates a keyup event on a particular element.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method keyup
             * @static
             */            
            "keyup", 
            
            /**
             * Simulates a keypress on a particular element.
             * @param {HTMLElement} target The element to act on.
             * @param {Object} options Additional event options (use DOM standard names).
             * @method keypress
             * @static
             */            
            "keypress"
        ];

    /**
     * Note: Intentionally not for YUIDoc generation.
     * Simulates a key event using the given event information to populate
     * the generated event object. This method does browser-equalizing
     * calculations to account for differences in the DOM and IE event models
     * as well as different browser quirks. Note: keydown causes Safari 2.x to
     * crash.
     * @method simulateKeyEvent
     * @private
     * @static
     * @param {HTMLElement} target The target of the given event.
     * @param {String} type The type of event to fire. This can be any one of
     *      the following: keyup, keydown, and keypress.
     * @param {Boolean} bubbles (Optional) Indicates if the event can be
     *      bubbled up. DOM Level 3 specifies that all key events bubble by
     *      default. The default is true.
     * @param {Boolean} cancelable (Optional) Indicates if the event can be
     *      canceled using preventDefault(). DOM Level 3 specifies that all
     *      key events can be cancelled. The default 
     *      is true.
     * @param {Window} view (Optional) The view containing the target. This is
     *      typically the window object. The default is window.
     * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys
     *      is pressed while the event is firing. The default is false.
     * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys
     *      is pressed while the event is firing. The default is false.
     * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys
     *      is pressed while the event is firing. The default is false.
     * @param {Boolean} metaKey (Optional) Indicates if one of the META keys
     *      is pressed while the event is firing. The default is false.
     * @param {int} keyCode (Optional) The code for the key that is in use. 
     *      The default is 0.
     * @param {int} charCode (Optional) The Unicode code for the character
     *      associated with the key being used. The default is 0.
     */
    function simulateKeyEvent(target /*:HTMLElement*/, type /*:String*/, 
                                 bubbles /*:Boolean*/,  cancelable /*:Boolean*/,    
                                 view /*:Window*/,
                                 ctrlKey /*:Boolean*/,    altKey /*:Boolean*/, 
                                 shiftKey /*:Boolean*/,   metaKey /*:Boolean*/, 
                                 keyCode /*:int*/,        charCode /*:int*/) /*:Void*/                             
    {
        //check target    
        if (!target){
            Y.fail("simulateKeyEvent(): Invalid target.");
        }
        
        //check event type
        if (isString(type)){
            type = type.toLowerCase();
            switch(type){
                case "textevent": //DOM Level 3
                    type = "keypress";
                    /*falls through*/
                case "keyup":
                case "keydown":
                case "keypress":
                    break;
                default:
                    Y.fail("simulateKeyEvent(): Event type '" + type + "' not supported.");
            }
        } else {
            Y.fail("simulateKeyEvent(): Event type must be a string.");
        }
        
        //setup default values
        if (!isBoolean(bubbles)){
            bubbles = true; //all key events bubble
        }
        if (!isBoolean(cancelable)){
            cancelable = true; //all key events can be cancelled
        }
        if (!isObject(view)){
            view = window; //view is typically window
        }
        if (!isBoolean(ctrlKey)){
            ctrlKey = false;
        }
        if (!isBoolean(altKey)){
            altKey = false;
        }
        if (!isBoolean(shiftKey)){
            shiftKey = false;
        }
        if (!isBoolean(metaKey)){
            metaKey = false;
        }
        if (!isNumber(keyCode)){
            keyCode = 0;
        }
        if (!isNumber(charCode)){
            charCode = 0; 
        }

        //try to create a mouse event
        var customEvent /*:MouseEvent*/ = null;
            
        //check for DOM-compliant browsers first
        if (isFunction(document.createEvent)){
        
            try {
                
                //try to create key event
                customEvent = document.createEvent("KeyEvents");
                
                /*
                 * Interesting problem: Firefox implemented a non-standard
                 * version of initKeyEvent() based on DOM Level 2 specs.
                 * Key event was removed from DOM Level 2 and re-introduced
                 * in DOM Level 3 with a different interface. Firefox is the
                 * only browser with any implementation of Key Events, so for
                 * now, assume it's Firefox if the above line doesn't error.
                 */
                //TODO: Decipher between Firefox's implementation and a correct one.
                customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey,
                    altKey, shiftKey, metaKey, keyCode, charCode);       
                
            } catch (ex /*:Error*/){

                /*
                 * If it got here, that means key events aren't officially supported. 
                 * Safari/WebKit is a real problem now. WebKit 522 won't let you
                 * set keyCode, charCode, or other properties if you use a
                 * UIEvent, so we first must try to create a generic event. The
                 * fun part is that this will throw an error on Safari 2.x. The
                 * end result is that we need another try...catch statement just to
                 * deal with this mess.
                 */
                try {

                    //try to create generic event - will fail in Safari 2.x
                    customEvent = document.createEvent("Events");

                } catch (uierror /*:Error*/){

                    //the above failed, so create a UIEvent for Safari 2.x
                    customEvent = document.createEvent("UIEvents");

                } finally {

                    customEvent.initEvent(type, bubbles, cancelable);
    
                    //initialize
                    customEvent.view = view;
                    customEvent.altKey = altKey;
                    customEvent.ctrlKey = ctrlKey;
                    customEvent.shiftKey = shiftKey;
                    customEvent.metaKey = metaKey;
                    customEvent.keyCode = keyCode;
                    customEvent.charCode = charCode;
          
                }          
             
            }
            
            //fire the event
            target.dispatchEvent(customEvent);

        } else if (isObject(document.createEventObject)){ //IE
        
            //create an IE event object
            customEvent = document.createEventObject();
            
            //assign available properties
            customEvent.bubbles = bubbles;
            customEvent.cancelable = cancelable;
            customEvent.view = view;
            customEvent.ctrlKey = ctrlKey;
            customEvent.altKey = altKey;
            customEvent.shiftKey = shiftKey;
            customEvent.metaKey = metaKey;
            
            /*
             * IE doesn't support charCode explicitly. CharCode should
             * take precedence over any keyCode value for accurate
             * representation.
             */
            customEvent.keyCode = (charCode > 0) ? charCode : keyCode;
            
            //fire the event
            target.fireEvent("on" + type, customEvent);  
                    
        } else {
            Y.fail("simulateKeyEvent(): No event simulation framework present.");
        }
    }

    /*
     * Note: Intentionally not for YUIDoc generation.
     * Simulates a mouse event using the given event information to populate
     * the generated event object. This method does browser-equalizing
     * calculations to account for differences in the DOM and IE event models
     * as well as different browser quirks.
     * @method simulateMouseEvent
     * @private
     * @static
     * @param {HTMLElement} target The target of the given event.
     * @param {String} type The type of event to fire. This can be any one of
     *      the following: click, dblclick, mousedown, mouseup, mouseout,
     *      mouseover, and mousemove.
     * @param {Boolean} bubbles (Optional) Indicates if the event can be
     *      bubbled up. DOM Level 2 specifies that all mouse events bubble by
     *      default. The default is true.
     * @param {Boolean} cancelable (Optional) Indicates if the event can be
     *      canceled using preventDefault(). DOM Level 2 specifies that all
     *      mouse events except mousemove can be cancelled. The default 
     *      is true for all events except mousemove, for which the default 
     *      is false.
     * @param {Window} view (Optional) The view containing the target. This is
     *      typically the window object. The default is window.
     * @param {int} detail (Optional) The number of times the mouse button has
     *      been used. The default value is 1.
     * @param {int} screenX (Optional) The x-coordinate on the screen at which
     *      point the event occured. The default is 0.
     * @param {int} screenY (Optional) The y-coordinate on the screen at which
     *      point the event occured. The default is 0.
     * @param {int} clientX (Optional) The x-coordinate on the client at which
     *      point the event occured. The default is 0.
     * @param {int} clientY (Optional) The y-coordinate on the client at which
     *      point the event occured. The default is 0.
     * @param {Boolean} ctrlKey (Optional) Indicates if one of the CTRL keys
     *      is pressed while the event is firing. The default is false.
     * @param {Boolean} altKey (Optional) Indicates if one of the ALT keys
     *      is pressed while the event is firing. The default is false.
     * @param {Boolean} shiftKey (Optional) Indicates if one of the SHIFT keys
     *      is pressed while the event is firing. The default is false.
     * @param {Boolean} metaKey (Optional) Indicates if one of the META keys
     *      is pressed while the event is firing. The default is false.
     * @param {int} button (Optional) The button being pressed while the event
     *      is executing. The value should be 0 for the primary mouse button
     *      (typically the left button), 1 for the terciary mouse button
     *      (typically the middle button), and 2 for the secondary mouse button
     *      (typically the right button). The default is 0.
     * @param {HTMLElement} relatedTarget (Optional) For mouseout events,
     *      this is the element that the mouse has moved to. For mouseover
     *      events, this is the element that the mouse has moved from. This
     *      argument is ignored for all other events. The default is null.
     */
    function simulateMouseEvent(target /*:HTMLElement*/, type /*:String*/, 
                                   bubbles /*:Boolean*/,  cancelable /*:Boolean*/,    
                                   view /*:Window*/,        detail /*:int*/, 
                                   screenX /*:int*/,        screenY /*:int*/, 
                                   clientX /*:int*/,        clientY /*:int*/,       
                                   ctrlKey /*:Boolean*/,    altKey /*:Boolean*/, 
                                   shiftKey /*:Boolean*/,   metaKey /*:Boolean*/, 
                                   button /*:int*/,         relatedTarget /*:HTMLElement*/) /*:Void*/
    {
        
        //check target   
        if (!target){
            Y.fail("simulateMouseEvent(): Invalid target.");
        }
        
        //check event type
        if (isString(type)){
            type = type.toLowerCase();
            
            //make sure it's a supported mouse event
            if (array.indexOf(mouseEvents, type) == -1){
                Y.fail("simulateMouseEvent(): Event type '" + type + "' not supported.");
            }
        } else {
            Y.fail("simulateMouseEvent(): Event type must be a string.");
        }
        
        //setup default values
        if (!isBoolean(bubbles)){
            bubbles = true; //all mouse events bubble
        }
        if (!isBoolean(cancelable)){
            cancelable = (type != "mousemove"); //mousemove is the only one that can't be cancelled
        }
        if (!isObject(view)){
            view = window; //view is typically window
        }
        if (!isNumber(detail)){
            detail = 1;  //number of mouse clicks must be at least one
        }
        if (!isNumber(screenX)){
            screenX = 0; 
        }
        if (!isNumber(screenY)){
            screenY = 0; 
        }
        if (!isNumber(clientX)){
            clientX = 0; 
        }
        if (!isNumber(clientY)){
            clientY = 0; 
        }
        if (!isBoolean(ctrlKey)){
            ctrlKey = false;
        }
        if (!isBoolean(altKey)){
            altKey = false;
        }
        if (!isBoolean(shiftKey)){
            shiftKey = false;
        }
        if (!isBoolean(metaKey)){
            metaKey = false;
        }
        if (!isNumber(button)){
            button = 0; 
        }

        //try to create a mouse event
        var customEvent /*:MouseEvent*/ = null;
            
        //check for DOM-compliant browsers first
        if (isFunction(document.createEvent)){
        
            customEvent = document.createEvent("MouseEvents");
        
            //Safari 2.x (WebKit 418) still doesn't implement initMouseEvent()
            if (customEvent.initMouseEvent){
                customEvent.initMouseEvent(type, bubbles, cancelable, view, detail,
                                     screenX, screenY, clientX, clientY, 
                                     ctrlKey, altKey, shiftKey, metaKey, 
                                     button, relatedTarget);
            } else { //Safari
            
                //the closest thing available in Safari 2.x is UIEvents
                customEvent = document.createEvent("UIEvents");
                customEvent.initEvent(type, bubbles, cancelable);
                customEvent.view = view;
                customEvent.detail = detail;
                customEvent.screenX = screenX;
                customEvent.screenY = screenY;
                customEvent.clientX = clientX;
                customEvent.clientY = clientY;
                customEvent.ctrlKey = ctrlKey;
                customEvent.altKey = altKey;
                customEvent.metaKey = metaKey;
                customEvent.shiftKey = shiftKey;
                customEvent.button = button;
                customEvent.relatedTarget = relatedTarget;
            }
            
            /*
             * Check to see if relatedTarget has been assigned. Firefox
             * versions less than 2.0 don't allow it to be assigned via
             * initMouseEvent() and the property is readonly after event
             * creation, so in order to keep YAHOO.util.getRelatedTarget()
             * working, assign to the IE proprietary toElement property
             * for mouseout event and fromElement property for mouseover
             * event.
             */
            if (relatedTarget && !customEvent.relatedTarget){
                if (type == "mouseout"){
                    customEvent.toElement = relatedTarget;
                } else if (type == "mouseover"){
                    customEvent.fromElement = relatedTarget;
                }
            }
            
            //fire the event
            target.dispatchEvent(customEvent);

        } else if (isObject(document.createEventObject)){ //IE
        
            //create an IE event object
            customEvent = document.createEventObject();
            
            //assign available properties
            customEvent.bubbles = bubbles;
            customEvent.cancelable = cancelable;
            customEvent.view = view;
            customEvent.detail = detail;
            customEvent.screenX = screenX;
            customEvent.screenY = screenY;
            customEvent.clientX = clientX;
            customEvent.clientY = clientY;
            customEvent.ctrlKey = ctrlKey;
            customEvent.altKey = altKey;
            customEvent.metaKey = metaKey;
            customEvent.shiftKey = shiftKey;

            //fix button property for IE's wacky implementation
            switch(button){
                case 0:
                    customEvent.button = 1;
                    break;
                case 1:
                    customEvent.button = 4;
                    break;
                case 2:
                    //leave as is
                    break;
                default:
                    customEvent.button = 0;                    
            }    

            /*
             * Have to use relatedTarget because IE won't allow assignment
             * to toElement or fromElement on generic events. This keeps
             * YAHOO.util.customEvent.getRelatedTarget() functional.
             */
            customEvent.relatedTarget = relatedTarget;
            
            //fire the event
            target.fireEvent("on" + type, customEvent);
                    
        } else {
            Y.fail("simulateMouseEvent(): No event simulation framework present.");
        }
    }
    
    //add mouse event methods
    array.each(mouseEvents, function(type){
        Y.Event[type] = function(target, options){
            options = options || {};
            simulateMouseEvent(target, type, options.bubbles,
                options.cancelable, options.view, options.detail, options.screenX,        
                options.screenY, options.clientX, options.clientY, options.ctrlKey,
                options.altKey, options.shiftKey, options.metaKey, options.button,         
                options.relatedTarget);        
        };
    });

    //add key event methods
    array.each(keyEvents, function(type){
        Y.Event[type] = function(target, options){
            options = options || {};
            simulateKeyEvent(target, type, options.bubbles,
                options.cancelable, options.view, options.ctrlKey,
                options.altKey, options.shiftKey, options.metaKey, 
                options.keyCode, options.charCode);       
        };
    });
    
    /**
     * Simulates the event with the given name on a target.
     * @param {HTMLElement} target The DOM element that's the target of the event.
     * @param {String} type The type of event to simulate (i.e., "click").
     * @param {Object} options (Optional) Extra options to copy onto the event object.
     * @return {void}
     * @method simulate
     * @static
     */
    Y.Event.simulate = function(target, type, options){
        if (isFunction(Y.Event[type])){
            Y.Event[type](target, options);
        }
    };
    
    /*
     * TODO: focus(), blur(), submit()
     */

}, "@VERSION@", { requires: ["lang","event-dom"] });
