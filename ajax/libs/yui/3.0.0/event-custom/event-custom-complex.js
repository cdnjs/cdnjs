YUI.add('event-custom-complex', function(Y) {


/**
 * Adds event facades, preventable default behavior, and bubbling.
 * events.
 * @module event-custom
 * @submodule event-custom-complex
 */

(function() {

var FACADE, FACADE_KEYS, CEProto = Y.CustomEvent.prototype;

/**
 * Wraps and protects a custom event for use when emitFacade is set to true.
 * Requires the event-custom-complex module
 * @class EventFacade
 * @param e {Event} the custom event
 * @param currentTarget {HTMLElement} the element the listener was attached to
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

CEProto.fireComplex = function(args) {
    var es = Y.Env._eventstack, ef, q, queue, ce, ret, events;

    if (es) {
        // queue this event if the current item in the queue bubbles
        if (this.queuable && this.type != es.next.type) {
            this.log('queue ' + this.type);
            es.queue.push([this, args]);
            return true;
        }
    } else {
        Y.Env._eventstack = {
           // id of the first event in the stack
           id: this.id,
           next: this,
           silent: this.silent,
           stopped: 0,
           prevented: 0,
           queue: []
        };
        es = Y.Env._eventstack;
    }

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

    this.details = args.slice(); // original arguments in the details

    // this.log("Firing " + this  + ", " + "args: " + args);
    this.log("Firing " + this.type);

    this._facade = null; // kill facade to eliminate stale properties

    ef = this._getFacade(args);

    if (Y.Lang.isObject(args[0])) {
        args[0] = ef;
    } else {
        args.unshift(ef);
    }

    if (this.hasSubscribers) {
        this._procSubs(Y.merge(this.subscribers), args, ef);
    }

    // bubble if this is hosted in an event target and propagation has not been stopped
    if (this.bubbles && this.host && this.host.bubble && !this.stopped) {
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
    this._broadcast(args);

    // process after listeners.  If the default behavior was
    // prevented, the after events don't fire.
    if (this.hasAfters && !this.prevented && this.stopped < 2) {
        this._procSubs(Y.merge(this.afters), args, ef);
    }

    if (es.id === this.id) {
        queue = es.queue;

        while (queue.length) {
            q = queue.pop(); 
            ce = q[0];
            es.stopped = 0;
            es.prevented = 0;
            // set up stack to allow the next item to be processed
            es.next = ce;
            ce.fire.apply(ce, q[1]);
        }

        Y.Env._eventstack = null;
    } 

    return this.stopped ? false : true;
};

CEProto._getFacade = function() {

    var ef = this._facade, o, o2,
    args = this.details;

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
};

/**
 * Stop propagation to bubble targets
 * @for CustomEvent
 * @method stopPropagation
 */
CEProto.stopPropagation = function() {
    this.stopped = 1;
    Y.Env._eventstack.stopped = 1;
    this.events.fire('stopped', this);
};

/**
 * Stops propagation to bubble targets, and prevents any remaining
 * subscribers on the current target from executing.
 * @method stopImmediatePropagation
 */
CEProto.stopImmediatePropagation = function() {
    this.stopped = 2;
    Y.Env._eventstack.stopped = 2;
    this.events.fire('stopped', this);
};

/**
 * Prevents the execution of this event's defaultFn
 * @method preventDefault
 */
CEProto.preventDefault = function() {
    if (this.preventable) {
        this.prevented = 1;
        Y.Env._eventstack.prevented = 1;
        this.events.fire('prevented', this);
    }
};

/**
 * Stops the event propagation and prevents the default
 * event behavior.
 * @method halt
 * @param immediate {boolean} if true additional listeners
 * on the current target will not be executed
 */
CEProto.halt = function(immediate) {
    if (immediate) {
        this.stopImmediatePropagation();
    } else {
        this.stopPropagation();
    }
    this.preventDefault();
};

/**
 * Propagate an event.  Requires the event-custom-complex module.
 * @method bubble
 * @param evt {Event.Custom} the custom event to propagate
 * @return {boolean} the aggregated return value from Event.Custom.fire
 * @for EventTarget
 */
Y.EventTarget.prototype.bubble = function(evt, args, target) {

    var targs = this._yuievt.targets, ret = true,
        t, type, ce, i, bc;

    if (!evt || ((!evt.stopped) && targs)) {

        for (i in targs) {
            if (targs.hasOwnProperty(i)) {
                t = targs[i]; 
                type = evt && evt.type;
                ce = t.getEvent(type, true); 
                    
                // if this event was not published on the bubble target,
                // publish it with sensible default properties
                if (!ce) {

                    if (t._yuievt.hasTargets) {
                        t.bubble.call(t, evt, args, target);
                    }

                } else {
                    ce.target = target || (evt && evt.target) || this;
                    ce.currentTarget = t;

                    bc = ce.broadcast;
                    ce.broadcast = false;
                    ret = ret && ce.fire.apply(ce, args || evt.details);
                    ce.broadcast = bc;

                    // stopPropagation() was called
                    if (ce.stopped) {
                        break;
                    }
                }
            }
        }
    }

    return ret;
};

FACADE = new Y.EventFacade();
FACADE_KEYS = Y.Object.keys(FACADE);

})();


}, '@VERSION@' ,{requires:['event-custom-base']});
