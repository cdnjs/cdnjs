/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('event-custom-complex', function (Y, NAME) {


/**
 * Adds event facades, preventable default behavior, and bubbling.
 * events.
 * @module event-custom
 * @submodule event-custom-complex
 */

var FACADE,
    FACADE_KEYS,
    YObject = Y.Object,
    key,
    EMPTY = {},
    CEProto = Y.CustomEvent.prototype,
    ETProto = Y.EventTarget.prototype,

    mixFacadeProps = function(facade, payload) {
        var p;

        for (p in payload) {
            if (!(FACADE_KEYS.hasOwnProperty(p))) {
                facade[p] = payload[p];
            }
        }
    };

/**
 * Wraps and protects a custom event for use when emitFacade is set to true.
 * Requires the event-custom-complex module
 * @class EventFacade
 * @param e {Event} the custom event
 * @param currentTarget {HTMLElement} the element the listener was attached to
 */

Y.EventFacade = function(e, currentTarget) {

    if (!e) {
        e = EMPTY;
    }

    this._event = e;

    /**
     * The arguments passed to fire
     * @property details
     * @type Array
     */
    this.details = e.details;

    /**
     * The event type, this can be overridden by the fire() payload
     * @property type
     * @type string
     */
    this.type = e.type;

    /**
     * The real event type
     * @property _type
     * @type string
     * @private
     */
    this._type = e.type;

    //////////////////////////////////////////////////////

    /**
     * Node reference for the targeted eventtarget
     * @property target
     * @type Node
     */
    this.target = e.target;

    /**
     * Node reference for the element that the listener was attached to.
     * @property currentTarget
     * @type Node
     */
    this.currentTarget = currentTarget;

    /**
     * Node reference to the relatedTarget
     * @property relatedTarget
     * @type Node
     */
    this.relatedTarget = e.relatedTarget;

};

Y.mix(Y.EventFacade.prototype, {

    /**
     * Stops the propagation to the next bubble target
     * @method stopPropagation
     */
    stopPropagation: function() {
        this._event.stopPropagation();
        this.stopped = 1;
    },

    /**
     * Stops the propagation to the next bubble target and
     * prevents any additional listeners from being exectued
     * on the current target.
     * @method stopImmediatePropagation
     */
    stopImmediatePropagation: function() {
        this._event.stopImmediatePropagation();
        this.stopped = 2;
    },

    /**
     * Prevents the event's default behavior
     * @method preventDefault
     */
    preventDefault: function() {
        this._event.preventDefault();
        this.prevented = 1;
    },

    /**
     * Stops the event propagation and prevents the default
     * event behavior.
     * @method halt
     * @param immediate {boolean} if true additional listeners
     * on the current target will not be executed
     */
    halt: function(immediate) {
        this._event.halt(immediate);
        this.prevented = 1;
        this.stopped = (immediate) ? 2 : 1;
    }

});

CEProto.fireComplex = function(args) {

    var es,
        ef,
        q,
        queue,
        ce,
        ret = true,
        events,
        subs,
        ons,
        afters,
        afterQueue,
        postponed,
        prevented,
        preventedFn,
        defaultFn,
        self = this,
        host = self.host || self,
        next,
        oldbubble,
        stack = self.stack,
        yuievt = host._yuievt,
        hasPotentialSubscribers;

    if (stack) {

        // queue this event if the current item in the queue bubbles
        if (self.queuable && self.type !== stack.next.type) {
            self.log('queue ' + self.type);

            if (!stack.queue) {
                stack.queue = [];
            }
            stack.queue.push([self, args]);

            return true;
        }
    }

    hasPotentialSubscribers = self.hasSubs() || yuievt.hasTargets || self.broadcast;

    self.target = self.target || host;
    self.currentTarget = host;

    self.details = args.concat();

    if (hasPotentialSubscribers) {

        es = stack || {

           id: self.id, // id of the first event in the stack
           next: self,
           silent: self.silent,
           stopped: 0,
           prevented: 0,
           bubbling: null,
           type: self.type,
           // defaultFnQueue: new Y.Queue(),
           defaultTargetOnly: self.defaultTargetOnly

        };

        subs = self.getSubs();
        ons = subs[0];
        afters = subs[1];

        self.stopped = (self.type !== es.type) ? 0 : es.stopped;
        self.prevented = (self.type !== es.type) ? 0 : es.prevented;

        if (self.stoppedFn) {
            // PERF TODO: Can we replace with callback, like preventedFn. Look into history
            events = new Y.EventTarget({
                fireOnce: true,
                context: host
            });
            self.events = events;
            events.on('stopped', self.stoppedFn);
        }

        // self.log("Firing " + self  + ", " + "args: " + args);
        self.log("Firing " + self.type);

        self._facade = null; // kill facade to eliminate stale properties

        ef = self._createFacade(args);

        if (ons) {
            self._procSubs(ons, args, ef);
        }

        // bubble if this is hosted in an event target and propagation has not been stopped
        if (self.bubbles && host.bubble && !self.stopped) {
            oldbubble = es.bubbling;

            es.bubbling = self.type;

            if (es.type !== self.type) {
                es.stopped = 0;
                es.prevented = 0;
            }

            ret = host.bubble(self, args, null, es);

            self.stopped = Math.max(self.stopped, es.stopped);
            self.prevented = Math.max(self.prevented, es.prevented);

            es.bubbling = oldbubble;
        }

        prevented = self.prevented;

        if (prevented) {
            preventedFn = self.preventedFn;
            if (preventedFn) {
                preventedFn.apply(host, args);
            }
        } else {
            defaultFn = self.defaultFn;

            if (defaultFn && ((!self.defaultTargetOnly && !es.defaultTargetOnly) || host === ef.target)) {
                defaultFn.apply(host, args);
            }
        }

        // broadcast listeners are fired as discreet events on the
        // YUI instance and potentially the YUI global.
        if (self.broadcast) {
            self._broadcast(args);
        }

        if (afters && !self.prevented && self.stopped < 2) {

            // Queue the after
            afterQueue = es.afterQueue;

            if (es.id === self.id || self.type !== yuievt.bubbling) {

                self._procSubs(afters, args, ef);

                if (afterQueue) {
                    while ((next = afterQueue.last())) {
                        next();
                    }
                }
            } else {
                postponed = afters;

                if (es.execDefaultCnt) {
                    postponed = Y.merge(postponed);

                    Y.each(postponed, function(s) {
                        s.postponed = true;
                    });
                }

                if (!afterQueue) {
                    es.afterQueue = new Y.Queue();
                }

                es.afterQueue.add(function() {
                    self._procSubs(postponed, args, ef);
                });
            }

        }

        self.target = null;

        if (es.id === self.id) {

            queue = es.queue;

            if (queue) {
                while (queue.length) {
                    q = queue.pop();
                    ce = q[0];
                    // set up stack to allow the next item to be processed
                    es.next = ce;
                    ce._fire(q[1]);
                }
            }

            self.stack = null;
        }

        ret = !(self.stopped);

        if (self.type !== yuievt.bubbling) {
            es.stopped = 0;
            es.prevented = 0;
            self.stopped = 0;
            self.prevented = 0;
        }

    } else {
        defaultFn = self.defaultFn;

        if(defaultFn) {
            ef = self._createFacade(args);

            if ((!self.defaultTargetOnly) || (host === ef.target)) {
                defaultFn.apply(host, args);
            }
        }
    }

    // Kill the cached facade to free up memory.
    // Otherwise we have the facade from the last fire, sitting around forever.
    self._facade = null;

    return ret;
};

/**
 * @method _hasPotentialSubscribers
 * @for CustomEvent
 * @private
 * @return {boolean} Whether the event has potential subscribers or not
 */
CEProto._hasPotentialSubscribers = function() {
    return this.hasSubs() || this.host._yuievt.hasTargets || this.broadcast;
};

/**
 * Internal utility method to create a new facade instance and
 * insert it into the fire argument list, accounting for any payload
 * merging which needs to happen.
 *
 * This used to be called `_getFacade`, but the name seemed inappropriate
 * when it was used without a need for the return value.
 *
 * @method _createFacade
 * @private
 * @param fireArgs {Array} The arguments passed to "fire", which need to be
 * shifted (and potentially merged) when the facade is added.
 * @return {EventFacade} The event facade created.
 */

// TODO: Remove (private) _getFacade alias, once synthetic.js is updated.
CEProto._createFacade = CEProto._getFacade = function(fireArgs) {

    var userArgs = this.details,
        firstArg = userArgs && userArgs[0],
        firstArgIsObj = (firstArg && (typeof firstArg === "object")),
        ef = this._facade;

    if (!ef) {
        ef = new Y.EventFacade(this, this.currentTarget);
    }

    if (firstArgIsObj) {
        // protect the event facade properties
        mixFacadeProps(ef, firstArg);

        // Allow the event type to be faked http://yuilibrary.com/projects/yui3/ticket/2528376
        if (firstArg.type) {
            ef.type = firstArg.type;
        }

        if (fireArgs) {
            fireArgs[0] = ef;
        }
    } else {
        if (fireArgs) {
            fireArgs.unshift(ef);
        }
    }

    // update the details field with the arguments
    ef.details = this.details;

    // use the original target when the event bubbled to this target
    ef.target = this.originalTarget || this.target;

    ef.currentTarget = this.currentTarget;
    ef.stopped = 0;
    ef.prevented = 0;

    this._facade = ef;

    return this._facade;
};

/**
 * Utility method to manipulate the args array passed in, to add the event facade,
 * if it's not already the first arg.
 *
 * @method _addFacadeToArgs
 * @private
 * @param {Array} The arguments to manipulate
 */
CEProto._addFacadeToArgs = function(args) {
    var e = args[0];

    // Trying not to use instanceof, just to avoid potential cross Y edge case issues.
    if (!(e && e.halt && e.stopImmediatePropagation && e.stopPropagation && e._event)) {
        this._createFacade(args);
    }
};

/**
 * Stop propagation to bubble targets
 * @for CustomEvent
 * @method stopPropagation
 */
CEProto.stopPropagation = function() {
    this.stopped = 1;
    if (this.stack) {
        this.stack.stopped = 1;
    }
    if (this.events) {
        this.events.fire('stopped', this);
    }
};

/**
 * Stops propagation to bubble targets, and prevents any remaining
 * subscribers on the current target from executing.
 * @method stopImmediatePropagation
 */
CEProto.stopImmediatePropagation = function() {
    this.stopped = 2;
    if (this.stack) {
        this.stack.stopped = 2;
    }
    if (this.events) {
        this.events.fire('stopped', this);
    }
};

/**
 * Prevents the execution of this event's defaultFn
 * @method preventDefault
 */
CEProto.preventDefault = function() {
    if (this.preventable) {
        this.prevented = 1;
        if (this.stack) {
            this.stack.prevented = 1;
        }
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
 * Registers another EventTarget as a bubble target.  Bubble order
 * is determined by the order registered.  Multiple targets can
 * be specified.
 *
 * Events can only bubble if emitFacade is true.
 *
 * Included in the event-custom-complex submodule.
 *
 * @method addTarget
 * @chainable
 * @param o {EventTarget} the target to add
 * @for EventTarget
 */
ETProto.addTarget = function(o) {
    var etState = this._yuievt;

    if (!etState.targets) {
        etState.targets = {};
    }

    etState.targets[Y.stamp(o)] = o;
    etState.hasTargets = true;

    return this;
};

/**
 * Returns an array of bubble targets for this object.
 * @method getTargets
 * @return EventTarget[]
 */
ETProto.getTargets = function() {
    var targets = this._yuievt.targets;
    return targets ? YObject.values(targets) : [];
};

/**
 * Removes a bubble target
 * @method removeTarget
 * @chainable
 * @param o {EventTarget} the target to remove
 * @for EventTarget
 */
ETProto.removeTarget = function(o) {
    var targets = this._yuievt.targets;

    if (targets) {
        delete targets[Y.stamp(o, true)];

        if (YObject.size(targets) === 0) {
            this._yuievt.hasTargets = false;
        }
    }

    return this;
};

/**
 * Propagate an event.  Requires the event-custom-complex module.
 * @method bubble
 * @param evt {CustomEvent} the custom event to propagate
 * @return {boolean} the aggregated return value from Event.Custom.fire
 * @for EventTarget
 */
ETProto.bubble = function(evt, args, target, es) {

    var targs = this._yuievt.targets,
        ret = true,
        t,
        ce,
        i,
        bc,
        ce2,
        type = evt && evt.type,
        originalTarget = target || (evt && evt.target) || this,
        oldbubble;

    if (!evt || ((!evt.stopped) && targs)) {

        for (i in targs) {
            if (targs.hasOwnProperty(i)) {

                t = targs[i];

                ce = t._yuievt.events[type];

                if (t._hasSiblings) {
                    ce2 = t.getSibling(type, ce);
                }

                if (ce2 && !ce) {
                    ce = t.publish(type);
                }

                oldbubble = t._yuievt.bubbling;
                t._yuievt.bubbling = type;

                // if this event was not published on the bubble target,
                // continue propagating the event.
                if (!ce) {
                    if (t._yuievt.hasTargets) {
                        t.bubble(evt, args, originalTarget, es);
                    }
                } else {

                    if (ce2) {
                        ce.sibling = ce2;
                    }

                    // set the original target to that the target payload on the facade is correct.
                    ce.target = originalTarget;
                    ce.originalTarget = originalTarget;
                    ce.currentTarget = t;
                    bc = ce.broadcast;
                    ce.broadcast = false;

                    // default publish may not have emitFacade true -- that
                    // shouldn't be what the implementer meant to do
                    ce.emitFacade = true;

                    ce.stack = es;

                    // TODO: See what's getting in the way of changing this to use
                    // the more performant ce._fire(args || evt.details || []).

                    // Something in Widget Parent/Child tests is not happy if we
                    // change it - maybe evt.details related?
                    ret = ret && ce.fire.apply(ce, args || evt.details || []);

                    ce.broadcast = bc;
                    ce.originalTarget = null;

                    // stopPropagation() was called
                    if (ce.stopped) {
                        break;
                    }
                }

                t._yuievt.bubbling = oldbubble;
            }
        }
    }

    return ret;
};

/**
 * @method _hasPotentialSubscribers
 * @for EventTarget
 * @private
 * @param {String} fullType The fully prefixed type name
 * @return {boolean} Whether the event has potential subscribers or not
 */
ETProto._hasPotentialSubscribers = function(fullType) {

    var etState = this._yuievt,
        e = etState.events[fullType];

    if (e) {
        return e.hasSubs() || etState.hasTargets  || e.broadcast;
    } else {
        return false;
    }
};

FACADE = new Y.EventFacade();
FACADE_KEYS = {};

// Flatten whitelist
for (key in FACADE) {
    FACADE_KEYS[key] = true;
}


}, '3.15.0', {"requires": ["event-custom-base"]});
