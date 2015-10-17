YUI.add('event-custom', function(Y) {

Y.Env.evt = {
    handles: {},
    plugins: {}
};

(function() {

/**
 * Allows for the insertion of methods that are executed before or after
 * a specified method
 * @class Do
 * @static
 */

var BEFORE = 0,
    AFTER = 1;

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
        var f = fn, a;
        if (c) {
            a = [fn, c].concat(Y.Array(arguments, 4, true));
            f = Y.rbind.apply(Y, a);
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
        var f = fn, a;
        if (c) {
            a = [fn, c].concat(Y.Array(arguments, 4, true));
            f = Y.rbind.apply(Y, a);
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
        var id = Y.stamp(obj), o, sid;

        if (! this.objs[id]) {
            // create a map entry for the obj if it doesn't exist
            this.objs[id] = {};
        }

        o = this.objs[id];

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
        sid = id + Y.stamp(fn) + sFn;

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
 * @class Do.Prevent
 */
Y.Do.Prevent = function(msg) {
    this.msg = msg;
};

/**
 * Return an Error object when you want to terminate the execution
 * of all subsequent method calls.
 * @class Do.Error
 * @deprecated use Y.Do.Halt or Y.Do.Prevent
 */
Y.Do.Error = Y.Do.Halt;

//////////////////////////////////////////////////////////////////////////

// Y["Event"] && Y.Event.addListener(window, "unload", Y.Do._unload, Y.Do);

})();
(function() {

/**
 * Wraps and protects a custom event for use when emitFacade is set to true.
 * @class EventFacade
 * @param e {Event} the custom event
 * @param currentTarget {HTMLElement} the element the listener was attached to
 */

/*
var PROPS = {
    details: 1,
    type: 1,
    target: 1,
    currentTarget: 1,
    stopPropagation: 2,
    stopImmediatePropagation: 2,
    preventDefault: 2,
    halt: 2
};

Y.EventFacade = function(e, currentTarget) {
    if (e) {
        Y.Object.each(PROPS, function(v, k) {
            //this[k] = (v == 2) ? e[k].apply(e, arguments) : e[k];
            var val = e[k];
            if (val) {
                this[k] = (v == 2) ? function() {
                    if (val) {
                        val.apply(e, arguments);
                    }
                } : val;
            } else {
                console.log('missing ' + k);
            }
        });
    }
};
*/

Y.EventFacade = function(e, currentTarget) {

    e = e || {};

    /**
     * The arguments passed to fire 
     * @property details
     * @type Array
     */
    this.details = e.details;

    /**
     * The event type
     * @property type
     * @type string
     */
    this.type = e.type;

    //////////////////////////////////////////////////////

    /**
     * Node reference for the targeted eventtarget
     * @propery target
     * @type Node
     */
    this.target = e.target;

    /**
     * Node reference for the element that the listener was attached to.
     * @propery currentTarget
     * @type Node
     */
    this.currentTarget = currentTarget;

    /**
     * Node reference to the relatedTarget
     * @propery relatedTarget
     * @type Node
     */
    this.relatedTarget = e.relatedTarget;
    
    /**
     * Stops the propagation to the next bubble target
     * @method stopPropagation
     */
    this.stopPropagation = function() {
        e.stopPropagation();
    };

    /**
     * Stops the propagation to the next bubble target and
     * prevents any additional listeners from being exectued
     * on the current target.
     * @method stopImmediatePropagation
     */
    this.stopImmediatePropagation = function() {
        e.stopImmediatePropagation();
    };

    /**
     * Prevents the event's default behavior
     * @method preventDefault
     */
    this.preventDefault = function() {
        e.preventDefault();
    };

    /**
     * Stops the event propagation and prevents the default
     * event behavior.
     * @method halt
     * @param immediate {boolean} if true additional listeners
     * on the current target will not be executed
     */
    this.halt = function(immediate) {
        e.halt(immediate);
    };

};

})();

/**
 * Custom event engine, DOM event listener abstraction layer, synthetic DOM 
 * events.
 * @module event-custom
 */

/**
 * Return value from all subscribe operations
 * @class EventHandle
 * @constructor
 * @param evt {CustomEvent} the custom event
 * @param sub {Subscriber} the subscriber
 */

// var onsubscribeType = "_event:onsub",
var AFTER = 'after', 
    CONFIGS = [
        'broadcast',
        'bubbles',
        'context',
        'contextFn',
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

    FACADE = new Y.EventFacade(),

    FACADE_KEYS = Y.Object.keys(FACADE),

    YUI3_SIGNATURE = 9,
    YUI_LOG = 'yui:log';

Y.EventHandle = function(evt, sub) {

    /**
     * The custom event
     * @type CustomEvent
     */
    this.evt = evt;

    /**
     * The subscriber object
     * @type Subscriber
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
 * The CustomEvent class lets you define events for your application
 * that can be subscribed to by one or more independent component.
 *
 * @param {String}  type The type of event, which is passed to the callback
 *                  when the event fires
 * @param o configuration object
 * @class CustomEvent
 * @constructor
 */
Y.CustomEvent = function(type, o) {

    // if (arguments.length > 2) {
// this.log('CustomEvent context and silent are now in the config', 'warn', 'Event');
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

    this.logSystem = (type == YUI_LOG);

    /**
     * If 0, this event does not broadcast.  If 1, the YUI instance is notified
     * every time this event fires.  If 2, the YUI instance and the YUI global
     * (if event is enabled on the global) are notified every time this event
     * fires.
     * @property broadcast
     * @type int
     */
    // this.broadcast = 0;

    /**
     * By default all custom events are logged in the debug build, set silent
     * to true to disable debug outpu for this event.
     * @property silent
     * @type boolean
     */
    this.silent = this.logSystem;

    // this.queuable = false;

    /**
     * The subscribers to this event
     * @property subscribers
     * @type Subscriber{}
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
     * @type Subscriber{}
     */
    this.afters = {};

    /**
     * This event has fired if true
     *
     * @property fired
     * @type boolean
     * @default false;
     */
    // this.fired = false;

    /**
     * This event should only fire one time if true, and if
     * it has fired, any new subscribers should be notified
     * immediately.
     *
     * @property fireOnce
     * @type boolean
     * @default false;
     */
    // this.fireOnce = false;

    /**
     * Flag for stopPropagation that is modified during fire()
     * 1 means to stop propagation to bubble targets.  2 means
     * to also stop additional subscribers on this target.
     * @property stopped
     * @type int
     */
    // this.stopped = 0;

    /**
     * Flag for preventDefault that is modified during fire().
     * if it is not 0, the default behavior for this event
     * @property prevented
     * @type int
     */
    // this.prevented = 0;

    /**
     * Specifies the host for this custom event.  This is used
     * to enable event bubbling
     * @property host
     * @type EventTarget
     */
    // this.host = null;

    /**
     * The default function to execute after event listeners
     * have fire, but only if the default action was not
     * prevented.
     * @property defaultFn
     * @type Function
     */
    // this.defaultFn = null;

    /**
     * The function to execute if a subscriber calls
     * stopPropagation or stopImmediatePropagation
     * @property stoppedFn
     * @type Function
     */
    // this.stoppedFn = null;

    /**
     * The function to execute if a subscriber calls
     * preventDefault
     * @property preventedFn
     * @type Function
     */
    // this.preventedFn = null;

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

    // this.hasSubscribers = false;

    // this.hasAfters = false;

    /**
     * If set to true, the custom event will deliver an EventFacade object
     * that is similar to a DOM event object.
     * @property emitFacade
     * @type boolean
     * @default false
     */
    // this.emitFacade = false;

    this.applyConfig(o, true);

    // this.log("Creating " + this.type);

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

    _on: function(fn, context, args, when) {

        if (!fn) {
            Y.error("Invalid callback for CE: " + this.type);
        }

        var s = new Y.Subscriber(fn, context, args, when);

        if (this.fireOnce && this.fired) {
            Y.later(0, this, this._notify, s);
        }

        if (when == AFTER) {
            this.afters[s.id] = s;
            this.hasAfters = true;
        } else {
            this.subscribers[s.id] = s;
            this.hasSubscribers = true;
        }

        return new Y.EventHandle(this, s);

    },

    /**
     * Listen for this event
     * @method subscribe
     * @param {Function} fn        The function to execute
     * @return {EventHandle|EventTarget} unsubscribe handle or a
     * chainable event target depending on the 'chain' config.
     * @deprecated use on
     */
    subscribe: function(fn, context) {
        var a = (arguments.length > 2) ? Y.Array(arguments, 2, true): null;
        return this._on(fn, context, a, true);
    },

    /**
     * Listen for this event
     * @method on
     * @param {Function} fn        The function to execute
     * @return {EventHandle|EventTarget} unsubscribe handle or a
     * chainable event target depending on the 'chain' config.
     */
    on: function(fn, context) {
        var a = (arguments.length > 2) ? Y.Array(arguments, 2, true): null;
        return this._on(fn, context, a, true);
    },

    /**
     * Listen for this event after the normal subscribers have been notified and
     * the default behavior has been applied.  If a normal subscriber prevents the 
     * default behavior, it also prevents after listeners from firing.
     * @method after
     * @param {Function} fn        The function to execute
     * @return {EventHandle|EventTarget} unsubscribe handle or a
     * chainable event target depending on the 'chain' config.
     */
    after: function(fn, context) {
        var a = (arguments.length > 2) ? Y.Array(arguments, 2, true): null;
        return this._on(fn, context, a, AFTER);
    },

    /**
     * Detach listeners.
     * @method detach 
     * @param {Function} fn  The subscribed function to remove, if not supplied
     *                       all will be removed
     * @param {Object}   context The context object passed to subscribe.
     * @return {boolean|EventTarget} returns a chainable event target
     * or a boolean for legacy detach support.
     */
    detach: function(fn, context) {

        // if arg[0] typeof unsubscribe handle
        if (fn && fn.detach) {
            return fn.detach();
        }

        if (!fn) {
            return this.unsubscribeAll();
        }

        var found = false, subs = this.subscribers, i, s;

        for (i in subs) {
            if (subs.hasOwnProperty(i)) {
                s = subs[i];
                if (s && s.contains(fn, context)) {
                    this._delete(s);
                    found = true;
                }
            }
        }

        return found;
    },

    /**
     * Detach listeners.
     * @method unsubscribe
     * @param {Function} fn  The subscribed function to remove, if not supplied
     *                       all will be removed
     * @param {Object}   context The context object passed to subscribe.
     * @return {boolean|EventTarget} returns a chainable event target
     * or a boolean for legacy detach support.
     * @deprecated use detach
     */
    unsubscribe: function() {
        return this.detach.apply(this, arguments);
    },

    _getFacade: function() {

        var ef = this._facade, o, args = this.details, o2;

        if (!ef) {
            ef = new Y.EventFacade(this, this.currentTarget);
        }

        // if the first argument is an object literal, apply the
        // properties to the event facade
        o = args && args[0];

        if (Y.Lang.isObject(o, true)) {

            o2 = {};

            // protect the event facade properties
            Y.mix(o2, ef, true, FACADE_KEYS);

            // mix the data
            Y.mix(ef, o, true);

            // restore ef
            Y.mix(ef, o2, true, FACADE_KEYS);
        }

        // update the details field with the arguments
        // ef.type = this.type;
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
     * @param s {Subscriber} the subscriber
     * @param args {Array} the arguments array to apply to the listener
     * @private
     */
    _notify: function(s, args, ef) {

        this.log(this.type + "->" + ": " +  s);

        var ret;

        // emit an EventFacade if this is that sort of event
        if (this.emitFacade) {

            // @TODO object literal support to fire makes it possible for
            // config info to be passed if we wish.
            
            if (!ef) {
                ef = this._getFacade(args);

                if (Y.Lang.isObject(args[0])) {
                    args[0] = ef;
                } else {
                    args.unshift(ef);
                }
            }
        }

        ret = s.notify(args, this);

        if (false === ret || this.stopped > 1) {
            this.log(this.type + " cancelled by subscriber");
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

        var es = Y.Env._eventstack,
            subs, s, args, i, ef, q, queue, ce, hasSub,
            ret = true, events;

        // @TODO find a better way to short circuit this.  
        // if (!this.broadcast && !this.defaultFn && !this.hasSubscribers && !this.hasAfters) {
        //     return true;
        // }

        if (es) {

            // queue this event if the current item in the queue bubbles
            // if (b && this.queuable && this.type != es.next.type) {
            if (this.queuable && this.type != es.next.type) {

                this.log('queue ' + this.type);

                es.queue.push([this, arguments]);
                return true;
            }

        } else {

            Y.Env._eventstack = {
               // id of the first event in the stack
               id: this.id,
               next: this,
               silent: this.silent,
               logging: (this.type === YUI_LOG),
               stopped: 0,
               prevented: 0,
               queue: []
            };

            es = Y.Env._eventstack;
        }

        if (this.fireOnce && this.fired) {

            this.log('fireOnce event: ' + this.type + ' already fired');

        } else {

            args = Y.Array(arguments, 0, true);

            this.stopped = 0;
            this.prevented = 0;
            this.target = this.target || this.host;

            events = new Y.EventTarget({
                fireOnce: true,
                context: this.host
            });

            this.events = events;

            if (this.preventedFn) {
                events.on('prevented', this.preventedFn);
            }

            if (this.stoppedFn) {
                events.on('stopped', this.stoppedFn);
            }

            this.currentTarget = this.host || this.currentTarget;

            this.fired = true;
            this.details = args.slice(); // original arguments in the details

            // this.log("Firing " + this  + ", " + "args: " + args);
            this.log("Firing " + this.type);

            hasSub = false;
            es.lastLogState = es.logging;
            ef = null;

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

                if (Y.Lang.isObject(args[0])) {
                    args[0] = ef;
                } else {
                    args.unshift(ef);
                }
            }

            if (this.hasSubscribers) {
                subs = Y.merge(this.subscribers);

                for (i in subs) {
                    if (subs.hasOwnProperty(i)) {

                        if (!hasSub) {
                            es.logging = (es.logging || (this.type === YUI_LOG));
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

            es.logging = (es.lastLogState);

            // bubble if this is hosted in an event target and propagation has not been stopped
            if (this.bubbles && this.host && !this.stopped) {
                es.stopped = 0;
                es.prevented = 0;
                ret = this.host.bubble(this);

                this.stopped = Math.max(this.stopped, es.stopped);
                this.prevented = Math.max(this.prevented, es.prevented);

            }

            // execute the default behavior if not prevented
            if (this.defaultFn && !this.prevented) {
                this.defaultFn.apply(this.host || this, args);
            }

            // broadcast listeners are fired as discreet events on the
            // YUI instance and potentially the YUI global.
            if (!this.stopped && this.broadcast) {

                if (this.host !== Y) {
                    Y.fire.apply(Y, args);
                }

                if (this.broadcast == 2) {
                    Y.Global.fire.apply(Y.Global, args);
                }
            }

            // process after listeners.  If the default behavior was
            // prevented, the after events don't fire.
            if (this.hasAfters && !this.prevented && this.stopped < 2) {
                subs = Y.merge(this.afters);
                for (i in subs) {
                    if (subs.hasOwnProperty(i)) {

                        if (!hasSub) {
                            es.logging = (es.logging || (this.type === YUI_LOG));
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
            queue = es.queue;

            while (queue.length) {
                // q[0] = the event, q[1] = arguments to fire
                q = queue.pop(); 
                ce = q[0];

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
     * @deprecated use detachAll
     */
    unsubscribeAll: function() {
        return this.detachAll.apply(this, arguments);
    },

    /**
     * Removes all listeners
     * @method detachAll
     * @return {int} The number of listeners unsubscribed
     */
    detachAll: function() {
        var subs = this.subscribers, i, l=0;
        for (i in subs) {
            if (subs.hasOwnProperty(i)) {
                this._delete(subs[i]);
                l++;
            }
        }

        this.subscribers={};

        return l;
    },

    /**
     * @method _delete
     * @param subscriber object
     * @private
     */
    _delete: function(s) {

        if (s) {
            delete s.fn;
            delete s.context;
            delete this.subscribers[s.id];
            delete this.afters[s.id];
        }

    },

    /**
     * @method toString
     */
    toString: function() {
         return this.type;
    },

    /**
     * Stop propagation to bubble targets
     * @method stopPropagation
     */
    stopPropagation: function() {
        this.stopped = 1;
        Y.Env._eventstack.stopped = 1;
        this.events.fire('stopped', this);
    },

    /**
     * Stops propagation to bubble targets, and prevents any remaining
     * subscribers on the current target from executing.
     * @method stopImmediatePropagation
     */
    stopImmediatePropagation: function() {
        this.stopped = 2;
        Y.Env._eventstack.stopped = 2;
        this.events.fire('stopped', this);
    },

    /**
     * Prevents the execution of this event's defaultFn
     * @method preventDefault
     */
    preventDefault: function() {
        if (this.preventable) {
            this.prevented = 1;
            Y.Env._eventstack.prevented = 1;

            this.events.fire('prevented', this);
        }
    },

    /**
     * Stops the event propagation and prevents the default
     * event behavior.
     * @method halt
     * @param immediate {boolean} if true additional listeners
     * on the current target will not be executed
     */
    halt: function(immediate) {
        if (immediate) {
            this.stopImmediatePropagation();
        } else {
            this.stopPropagation();
        }
        this.preventDefault();
    }

};

/////////////////////////////////////////////////////////////////////

/**
 * Stores the subscriber information to be used when the event fires.
 * @param {Function} fn       The wrapped function to execute
 * @param {Object}   context  The value of the keyword 'this' in the listener
 * @param {Array} args*       0..n additional arguments to supply the listener
 *
 * @class Subscriber
 * @constructor
 */
Y.Subscriber = function(fn, context, args) {

    /**
     * The callback that will be execute when the event fires
     * This is wrapped by Y.rbind if obj was supplied.
     * @property fn
     * @type Function
     */
    this.fn = fn;

    /**
     * Optional 'this' keyword for the listener
     * @property context
     * @type Object
     */
    this.context = context;

    /**
     * Unique subscriber id
     * @property id
     * @type String
     */
    this.id = Y.stamp(this);

    /*
     * }
     * fn bound to obj with additional arguments applied via Y.rbind
     * @property wrappedFn
     * @type Function
     */
    // this.wrappedFn = fn;

    /**
     * Additional arguments to propagate to the subscriber
     * @property args
     * @type Array
     */
    this.args = args;

    /**
     * Custom events for a given fire transaction.
     * @property events
     * @type {EventTarget}
     */
    this.events = null;
    
    // if (context) {
    //     this.wrappedFn = Y.rbind.apply(Y, args);
    // }
    

};

Y.Subscriber.prototype = {

    _notify: function(c, args, ce) {
        var a = this.args, ret;
        switch (ce.signature) {
            case 0:
                ret = this.fn.call(c, ce.type, args, c);
                break;
            case 1:
                ret = this.fn.call(c, args[0] || null, c);
                break;
            default:
                if (a || args) {
                    args = args || [];
                    a = (a) ? args.concat(a) : args;
                    ret = this.fn.apply(c, a);
                } else {
                    ret = this.fn.call(c);
                }
        }

        return ret;
    },

    /**
     * Executes the subscriber.
     * @method notify
     * @param args {Array} Arguments array for the subscriber
     * @param ce {CustomEvent} The custom event that sent the notification
     */
    notify: function(args, ce) {
        var c = this.context,
            ret = true;

        if (!c) {
            c = (ce.contextFn) ? ce.contextFn() : ce.context;
        }

        // Ease debugging by only catching errors if we will not re-throw
        // them.
        if (Y.config.throwFail) {
            ret = this._notify(c, args, ce);
        } else {
            try {
                ret = this._notify(c, args, ce);
            } catch(e) {
                Y.error(this + ' failed: ' + e.message, e);
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
     * @param {Object} context optional 'this' keyword for the listener
     * @return {boolean} true if the supplied arguments match this 
     *                   subscriber's signature.
     */
    contains: function(fn, context) {
        if (context) {
            return ((this.fn == fn) && this.context == context);
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

// FACADE = new Y.EventFacade(new Y.CustomEvent('x'));
(function() {

/**
 * EventTarget provides the implementation for any object to
 * publish, subscribe and fire to custom events, and also
 * alows other EventTargets to target the object with events
 * sourced from the other object.
 * EventTarget is designed to be used with Y.augment to wrap 
 * EventCustom in an interface that allows events to be listened to 
 * and fired by name.  This makes it possible for implementing code to
 * subscribe to an event that either has not been created yet, or will
 * not be created at all.
 * @class EventTarget
 * @param opts a configuration object
 * @config emitFacade {boolean} if true, all events will emit event 
 * facade payloads by default (default false)
 * @config prefix {string} the prefix to apply to non-prefixed event names 
 * @config chain {boolean} if true, on/after/detach return the host to allow 
 * chaining, otherwise they return an EventHandle (default false)
 */

var L = Y.Lang,
    PREFIX_DELIMITER = ':',
    CATEGORY_DELIMITER = '|',
    AFTER_PREFIX = '~AFTER~',

    /**
     * If the instance has a prefix attribute and the
     * event type is not prefixed, the instance prefix is
     * applied to the supplied type.
     * @method _getType
     * @private
     */
    _getType = Y.cached(function(type, pre) {

        if (!pre || !L.isString(type) || type.indexOf(PREFIX_DELIMITER) > -1) {
            return type;
        } 

        return pre + PREFIX_DELIMITER + type;
    }),

    /**
     * Returns an array with the detach key (if provided),
     * and the prefixed event name from _getType
     * Y.on('detachcategory, menu:click', fn)
     * @method _parseType
     * @private
     */
    _parseType = Y.cached(function(type, pre) {

        var t = type, detachcategory, after, i, full_t;

        if (!L.isString(t)) {
            return t;
        } 
        
        i = t.indexOf(AFTER_PREFIX);

        if (i > -1) {
            after = true;
            t = t.substr(AFTER_PREFIX.length);
        }

        // parts = t.split(DETACH_PREFIX_SPLITTER);
        // if (parts.length > 1) {
        //     detachcategory = parts[0];
        //     t = parts[1];
        //     if (t == '*') {
        //          t = null;
        //     }
        // }
        
        i = t.indexOf(CATEGORY_DELIMITER);
        if (i > -1) {
            detachcategory = t.substr(0, (i));
            t = t.substr(i+1);
            if (t == '*') {
                t = null;
            }
        }

        full_t = _getType(t, pre);

        return [detachcategory, full_t, after, t];
    }),

    ET = function(opts) {

        // console.log('EventTarget constructor executed: ' + this._yuid);

        var o = (L.isObject(opts)) ? opts : {};

        this._yuievt = {

            id: Y.guid(),

            events: {},

            targets: {},

            config: o,

            chain: ('chain' in o) ? o.chain : Y.config.chain,

            defaults: {
                context: o.context || this, 
                host: this,
                emitFacade: o.emitFacade,
                fireOnce: o.fireOnce,
                queuable: o.queuable,
                broadcast: o.broadcast,
                bubbles: ('bubbles' in o) ? o.bubbles : true
            }
        };

    };


ET.prototype = {

    /**
     * Subscribe to a custom event hosted by this object
     * @method on 
     * @param type    {string}   The type of the event
     * @param fn {Function} The callback
     * @return the event target or a detach handle per 'chain' config
     */
    on: function(type, fn, context, x) {

        var parts = _parseType(type, this._yuievt.config.prefix), f, c, args, ret, ce,
            detachcategory, handle, store = Y.Env.evt.handles, after, adapt, shorttype,
            Node = Y.Node, n;

        if (L.isObject(type, true)) {

            f = fn; 
            c = context; 
            args = Y.Array(arguments, 0, true);
            ret = {};
            after = type._after;
            delete type._after;

            Y.each(type, function(v, k) {

                if (v) {
                    f = v.fn || ((Y.Lang.isFunction(v)) ? v : f);
                    c = v.context || c;
                }

                args[0] = (after) ? AFTER_PREFIX + k : k;
                args[1] = f;
                args[2] = c;

                ret[k] = this.on.apply(this, args); 

            }, this);

            return (this._yuievt.chain) ? this : ret;

        } else if (L.isFunction(type)) {
            return Y.Do.before.apply(Y.Do, arguments);
        }

        detachcategory = parts[0];
        after = parts[2];
        shorttype = parts[3];


        // extra redirection so we catch adaptor events too.  take a look at this.
        if (Node && (this instanceof Node) && (shorttype in Node.DOM_EVENTS)) {
            args = Y.Array(arguments, 0, true);
            args.splice(2, 0, Node.getDOMNode(this));
            return Y.on.apply(Y, args);
        }

        type = parts[1];

        if (this instanceof YUI) {
            adapt = Y.Env.evt.plugins[type];
            args  = Y.Array(arguments, 0, true);
            args[0] = shorttype;
            // check for the existance of an event adaptor
            if (adapt && adapt.on) {
                n = args[2];
                if (Node && n && (n instanceof Node)) {
                    args[2] = Node.getDOMNode(n);
                }
                handle = adapt.on.apply(Y, args);
            // check to see if the target is an EventTarget.  If so,
            // delegate to it (the EventTarget should handle whether
            // or not the prefix was included);
            // } else if (o && !(o instanceof YUI) && o.getEvent) {
            //     a = Y.Array(arguments, 0, true);
            //     a.splice(2, 1);
            //     return o.on.apply(o, a);
            // } else if ((!type) || (!adapt && type.indexOf(':') == -1)) {
            } else if ((!type) || (!adapt && Node && (shorttype in Node.DOM_EVENTS))) {
                handle = Y.Event._attach(args);
            }

        } 

        if (!handle) {

            ce     = this._yuievt.events[type] || this.publish(type);
            // args   = Y.Array(arguments, 1, true);
            // f = (after) ? ce.after : ce.on;
            // handle = f.apply(ce, args);

            handle = ce._on(fn, context, (arguments.length > 3) ? Y.Array(arguments, 3, true) : null, (after) ? 'after' : true);
        }

        if (detachcategory) {

            store[detachcategory] = store[detachcategory] || {};
            store[detachcategory][type] = store[detachcategory][type] || [];
            store[detachcategory][type].push(handle);

        }

        return (this._yuievt.chain) ? this : handle;

    },

    /**
     * subscribe to an event
     * @method subscribe
     * @deprecated use on
     */
    subscribe: function() {
        return this.on.apply(this, arguments);
    },

    /**
     * Detach one or more listeners the from the specified event
     * @method detach 
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
     * @return {EventTarget} the host
     */
    detach: function(type, fn, context) {

        var parts = _parseType(type, this._yuievt.config.prefix), 
        detachcategory = L.isArray(parts) ? parts[0] : null,
        shorttype = (parts) ? parts[3] : null,
        handle, adapt, store = Y.Env.evt.handles, cat, args,
        evts = this._yuievt.events, ce, i, ret = true,

        keyDetacher = function(lcat, ltype) {
            var handles = lcat[ltype];
            if (handles) {
                while (handles.length) {
                    handle = handles.pop();
                    handle.detach();
                }
            }
        };

        if (detachcategory) {

            cat = store[detachcategory];
            type = parts[1];

            if (cat) {
                if (type) {
                    keyDetacher(cat, type);
                } else {
                    for (i in cat) {
                        if (cat.hasOwnProperty(i)) {
                            keyDetacher(cat, i);
                        }
                    }
                }

                return (this._yuievt.chain) ? this : true;
            }

        // If this is an event handle, use it to detach
        } else if (L.isObject(type) && type.detach) {
            ret = type.detach();
            return (this._yuievt.chain) ? this : true;
        // extra redirection so we catch adaptor events too.  take a look at this.
        } else if (Y.Node && (this instanceof Y.Node) && ((!shorttype) || (shorttype in Y.Node.DOM_EVENTS))) {
            args = Y.Array(arguments, 0, true);
            args[2] = Y.Node.getDOMNode(this);
            return Y.detach.apply(Y, args);
        }

        adapt = Y.Env.evt.plugins[shorttype];

        // The YUI instance handles DOM events and adaptors
        if (this instanceof YUI) {
            args = Y.Array(arguments, 0, true);
            // use the adaptor specific detach code if
            if (adapt && adapt.detach) {
                return adapt.detach.apply(Y, args);
            // DOM event fork
            } else if (!type || (!adapt && type.indexOf(':') == -1)) {
                args[0] = type;
                return Y.Event.detach.apply(Y.Event, args);
            }
        }

        if (type) {
            ce = evts[type];
            if (ce) {
                return ce.detach(fn, context);
            }
        } else {
            for (i in evts) {
                if (evts.hasOwnProperty(i)) {
                    ret = ret && evts[i].detach(fn, context);
                }
            }
            return ret;
        }

        return (this._yuievt.chain) ? this : false;
    },

    /**
     * detach a listener
     * @method unsubscribe
     * @deprecated use detach
     */
    unsubscribe: function() {
        return this.detach.apply(this, arguments);
    },
    
    /**
     * Removes all listeners from the specified event.  If the event type
     * is not specified, all listeners from all hosted custom events will
     * be removed.
     * @method detachAll
     * @param type {string}   The type, or name of the event
     */
    detachAll: function(type) {
        type = _getType(type, this._yuievt.config.prefix);
        return this.detach(type);
    },

    /**
     * Removes all listeners from the specified event.  If the event type
     * is not specified, all listeners from all hosted custom events will
     * be removed.
     * @method unsubscribeAll
     * @param type {string}   The type, or name of the event
     * @deprecated use detachAll
     */
    unsubscribeAll: function() {
        return this.detachAll.apply(this, arguments);
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
     *   'prefix': the prefix for this targets events, e.g., 'menu' in 'menu:click' 
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
        // this._yuievt.config.prefix

        type = _getType(type, this._yuievt.config.prefix);

        var events, ce, ret, o;

        if (L.isObject(type)) {
            ret = {};
            Y.each(type, function(v, k) {
                ret[k] = this.publish(k, v || opts); 
            }, this);

            return ret;
        }

        events = this._yuievt.events; 
        ce = events[type];

        //if (ce && !ce.configured) {
        if (ce) {
// ce.log("publish applying new config to published event: '"+type+"' exists", 'info', 'event');
            if (opts) {
                ce.applyConfig(opts, true);
            }

        } else {
            o = (opts) ?  Y.mix(opts, this._yuievt.defaults) : this._yuievt.defaults;
            // apply defaults

            ce = new Y.CustomEvent(type, o);

            events[type] = ce;

        }

        // make sure we turn the broadcast flag off if this
        // event was published as a result of bubbling
        if (opts instanceof Y.CustomEvent) {
            events[type].broadcast = false;
        }

        return events[type];
    },

    /**
     * Registers another EventTarget as a bubble target.  Bubble order
     * is determined by the order registered.  Multiple targets can
     * be specified.
     * @method addTarget
     * @param o {EventTarget} the target to add
     */
    addTarget: function(o) {
        this._yuievt.targets[Y.stamp(o)] = o;
        this._yuievt.hasTargets = true;
    },

    /**
     * Removes a bubble target
     * @method removeTarget
     * @param o {EventTarget} the target to remove
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

        var typeIncluded = L.isString(type),
            t = (typeIncluded) ? type : (type && type.type),
            ce, a, ret;

        t = _getType(t, this._yuievt.config.prefix);
        ce = this.getEvent(t);

        // this event has not been published or subscribed to
        if (!ce) {
            
            // if this object has bubble targets, we need to publish the
            // event in order for it to bubble.
            if (this._yuievt.hasTargets) {
                // ce = this.publish(t);
                // ce.details = Y.Array(arguments, (typeIncluded) ? 1 : 0, true);
                
                a = (typeIncluded) ? arguments : Y.Array(arguments, 0, true).unshift(t);
                return this.bubble(null, a, this);
            }

            // otherwise there is nothing to be done
            ret = true;

        } else {

            a = Y.Array(arguments, (typeIncluded) ? 1 : 0, true);
            ret = ce.fire.apply(ce, a);

            // clear target for next fire()
            ce.target = null;
        }

        return (this._yuievt.chain) ? this : ret;
    },

    /**
     * Returns the custom event of the provided type has been created, a
     * falsy value otherwise
     * @method getEvent
     * @param type {string} the type, or name of the event
     * @return {Event.Custom} the custom event or null
     */
    getEvent: function(type) {
        type = _getType(type, this._yuievt.config.prefix);
        var e = this._yuievt.events;
        return (e && type in e) ? e[type] : null;
    },

    /**
     * Propagate an event
     * @method bubble
     * @param evt {Event.Custom} the custom event to propagate
     * @return {boolean} the aggregated return value from Event.Custom.fire
     */
    bubble: function(evt, args, target) {

        var targs = this._yuievt.targets, ret = true,
            t, type, ce, i;

        if (!evt || ((!evt.stopped) && targs)) {

            for (i in targs) {
                if (targs.hasOwnProperty(i)) {
                    t = targs[i]; 
                    type = evt && evt.type;
                    ce = t.getEvent(type); 
                        
                    // if this event was not published on the bubble target,
                    // publish it with sensible default properties
                    if (!ce) {

                        // publish the event on the bubble target using this event
                        // for its configuration
                        // ce = t.publish(type, evt);

                        // set the host and context appropriately
                        // ce.context = (evt.host === evt.context) ? t : evt.context;
                        // ce.host = t;

                        // clear handlers if specified on this event
                        // ce.defaultFn = null;
                        // ce.preventedFn = null;
                        // ce.stoppedFn = null;

                        if (t._yuievt.hasTargets) {
                            t.bubble.call(t, evt, args, target);
                        }

                    } else {

                        ce.target = target || (evt && evt.target) || this;

                        ce.currentTarget = t;

                        ret = ret && ce.fire.apply(ce, args || evt.details);

                        // stopPropagation() was called
                        if (ce.stopped) {
                            break;
                        }
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
     * @return the event target or a detach handle per 'chain' config
     */
    after: function(type, fn) {

        var a = Y.Array(arguments, 0, true);

        switch (L.type(type)) {
            case 'function':
                return Y.Do.after.apply(Y.Do, arguments);
            case 'object':
                a[0]._after = true;
                break;
            default:
                a[0] = AFTER_PREFIX + type;
        }

        return this.on.apply(this, a);

    },

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
     * @return detach handle
     * @deprecated use the on method
     */
    before: function() { 
        return this.on.apply(this, arguments);
    }

};

Y.EventTarget = ET;

// make Y an event target
Y.mix(Y, ET.prototype, false, false, { 
    bubbles: false 
});

ET.call(Y);

YUI.Env.globalEvents = YUI.Env.globalEvents || new ET();

/**
 * Hosts YUI page level events.  This is where events bubble to
 * when the broadcast config is set to 2.  This property is
 * only available if the custom event module is loaded.
 * @property Global
 * @type EventTarget
 * @for YUI
 */
Y.Global = YUI.Env.globalEvents;

// @TODO implement a global namespace function on Y.Global?

})();


}, '@VERSION@' ,{requires:['oop']});
