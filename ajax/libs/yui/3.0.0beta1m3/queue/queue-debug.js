YUI.add('queue-base', function(Y) {

/**
 * A simple FIFO queue of function references.
 *
 * @module queue
 * @submodule queue-base
 * @class Queue
 * @param callback* {Function} 0..n callback functions to seed the queue
 */
function Queue() {
    this._init();
    this.add.apply(this, arguments);
}

Queue.prototype = {
    /**
     * Initialize the queue
     *
     * @method _init
     * @protected
     */
    _init : function () {
        /**
         * The collection of enqueued functions
         *
         * @property _q
         * @type {Array}
         * @protected
         */
        this._q = [];
    },

    /**
     * Get the next callback in the queue.
     *
     * @method next
     * @return {Function} the next callback in the queue
     */
    next : function () {
        return this._q.shift();
    },

    /**
     * Add 0..n callbacks to the end of the queue
     *
     * @method add
     * @param callback* {Function} 0..n callback functions
     */
    add : function () {
        Y.Array.each(Y.Array(arguments,0,true),function (fn) {
            this._q.push(fn);
        },this);

        return this;
    },

    /**
     * Returns the current number of queued callbacks
     *
     * @method size
     * @return {Number}
     */
    size : function () {
        return this._q.length;
    }
};

Y.Queue = Queue;


}, '@VERSION@' );
YUI.add('queue-run', function(Y) {

var Queue   = Y.Queue,
    EXECUTE = 'execute',
    SHIFT   = 'shift',
    PROMOTE = 'promote',
    REMOVE  = 'remove',

    isObject   = Y.Lang.isObject,
    isFunction = Y.Lang.isFunction;

/**
 * Remaps functionality to preventable events, adds support for scheduling
 * callbacks to execute asynchronously, as well as iterative callbacks.
 *
 * @module queue
 * @submodule queue-run
 * @for Queue
 */

/**
 * Static default values used to populate callback configuration properties.
 *
 * @property Queue.defaults
 * @type {Object}
 * @static
 */
Queue.defaults = Y.mix({
    autoContinue : true,
    iterations   : 1,
    timeout      : -1,
    until        : function () {
        this.iterations |= 0;
        return this.iterations <= 0;
    }
}, Y.config.queueDefaults || {});

Y.mix(Queue.prototype, {
    /**
     *  used to indicate the Queue is currently executing a callback.
     *
     * @property _running
     * @type {Boolean|Object} true for synchronous callback execution, the
     *                        return handle from Y.later for async callbacks
     * @protected
     */
    _running : false,

    /**
     * Initializes the Queue instance properties and events.  Overrides the
     * base implementation.
     *
     * @method _init
     * @protected
     */
    _init : function () {
        Y.EventTarget.call(this, { emitFacade: true });

        this._q = [];

        /** 
         * Callback defaults for this instance.  Static defaults that are not
         * overridden are also included.
         *
         * @property defaults
         * @type {Object}
         */
        this.defaults = {};

        this._initEvents();
    },

    /**
     * Initializes the instance events.
     *
     * @method _initEvents
     * @protected
     */
    _initEvents : function () {
        /*
        this.publish({
            'execute' : { defaultFn : this._defExecFn },
            'shift'   : { defaultFn : this._defShiftFn },
            'add'     : { defaultFn : this._defAddFn },
            'promote' : { defaultFn : this._defPromoteFn },
            'remove'  : { defaultFn : this._defRemoveFn }
        });
        */
        this.publish('execute' , { defaultFn : this._defExecFn, emitFacade: true });
        this.publish('shift'   , { defaultFn : this._defShiftFn, emitFacade: true });
        this.publish('add'     , { defaultFn : this._defAddFn, emitFacade: true });
        this.publish('promote' , { defaultFn : this._defPromoteFn, emitFacade: true });
        this.publish('remove'  , { defaultFn : this._defRemoveFn, emitFacade: true });
    },

    /**
     * Returns the next callback needing execution.  If a callback is
     * configured to repeat via iterations or until, it will be returned until
     * the completion criteria is met.
     *
     * When the queue is empty, null is returned.
     *
     * @method next
     * @return {Function} the callback to execute
     */
    next : function () {
        var callback;

        while (this._q.length) {
            callback = this._q[0] = this._prepare(this._q[0]);
            if (callback && callback.until()) {
                this.fire(SHIFT, { callback: callback });
                callback = null;
            } else {
                break;
            }
        }

        return callback || null;
    },

    /**
     * Shifts the callback from the queue
     *
     * @method _defShiftFn
     * @param e {Event} The event object
     */
    _defShiftFn : function (e) {
        if (this.indexOf(e.callback) === 0) {
            this._q.shift();
        }
    },

    /**
     * Creates a wrapper function to execute the callback using the aggregated 
     * configuration from static Queue.defaults to the instance defaults to the
     * specified callback settings.
     *
     * The wrapper function is decorated with the callback configuration as
     * properties.
     *
     * @method _prepare
     * @param callback {Object|Function} the raw callback
     * @return {Function} a decorated function wrapper to execute the callback
     * @protected
     */
    _prepare: function (callback) {
        if (isFunction(callback) && callback._prepared) {
            return callback;
        }

        var config = Y.merge(
            Queue.defaults,
            { context : this, args: [], _prepared: true },
            this.defaults,
            (isFunction(callback) ? { fn: callback } : callback)),
            
            wrapper = Y.bind(function () {
                if (!wrapper._running) {
                    wrapper.iterations--;
                }
                if (isFunction(wrapper.fn)) {
                    wrapper.fn.apply(wrapper.context || Y,
                                     Y.Array(wrapper.args));
                }
            }, this);
            
        return Y.mix(wrapper, config);
    },

    /**
     * Sets the Queue in motion.  All queued callbacks will be executed in
     * order unless pause() or stop() is called or if one of the callbacks is
     * configured with autoContinue: false.
     *
     * @method run
     * @return {Queue} the Queue instance
     */
    run : function () {
        var callback,
            cont = true;

        for (callback = this.next();
            cont && callback && !this.isRunning();
            callback = this.next())
        {
            cont = (callback.timeout < 0) ?
                this._execute(callback) :
                this._schedule(callback);
        }

        if (!callback) {
            /**
             * Event fired after the last queued callback is executed.
             * @event complete
             */
            this.fire('complete');
        }

        return this;
    },

    /**
     * Handles the execution of synchronous callbacks.
     *
     * @method _execute
     * @param callback {Object} the callback object to execute
     * @return {Boolean} whether the run loop should continue
     * @protected
     */
    _execute : function (callback) {
        this._running = callback._running = true;

        callback.iterations--;
        this.fire(EXECUTE, { callback: callback });

        var cont = this._running && callback.autoContinue;

        this._running = callback._running = false;

        return cont;
    },

    /**
     * Schedules the execution of asynchronous callbacks.
     *
     * @method _schedule
     * @param callback {Object} the callback object to execute
     * @return {Boolean} whether the run loop should continue
     * @protected
     */
    _schedule : function (callback) {
        this._running = Y.later(callback.timeout, this, function () {
            if (this._execute(callback)) {
                this.run();
            }
        });

        return false;
    },

    /**
     * Determines if the Queue is waiting for a callback to complete execution.
     *
     * @method isRunning
     * @return {Boolean} true if Queue is waiting for a 
     *                   from any initiated transactions
     */
    isRunning : function () {
        return !!this._running;
    },

    /**
     * Executes the callback function
     * @method _defExecFn
     * @param e {Event} the event object
     * @protected
     */
    _defExecFn : function (e) {
        e.callback();
    },

    /**
     * Add any number of callbacks to the end of the queue. Callbacks may be
     * provided as functions or objects with at least a <code>fn</code>
     * property containing a reference to the callback function.
     *
     * @method add
     * @param callback* {Function|Object} 0..n callbacks
     * @return {Queue} the Queue instance
     */
    add : function () {
        this.fire('add', { callbacks: Y.Array(arguments,0,true) });

        return this;
    },

    /**
     * Adds the callbacks in the event facade to the queue. Callbacks
     * successfully added to the queue are present in the event's
     * <code>added</code> property in the after phase.
     *
     * @method _defAddFn
     * @param e {Event} the event object
     */
    _defAddFn : function(e) {
        var _q = this._q,
            added = [];

        Y.Array.each(e.callbacks, function (c) {
            if (isObject(c)) {
                _q.push(c);
                added.push(c);
            }
        });

        e.added = added;
    },

    /**
     * Pause the execution of the Queue after the execution of the current
     * callback completes.  If called from code outside of a queued callback,
     * clears the timeout for the pending callback. Paused Queue can be
     * restarted with q.run()
     * @method pause
     * @return {Queue} the Queue instance
     */
    pause: function () {
        if (isObject(this._running)) {
            this._running.cancel();
        }

        this._running = false;

        return this;
    },

    /**
     * Stop and clear the Queue's queue after the current execution of the
     * current callback completes.
     * @method stop
     * @return {Queue} the Queue instance
     */
    stop : function () { 
        this._q = [];

        return this.pause();
    },

    /** 
     * Returns the current index of a callback.  Pass in either the id or
     * callback function from getCallback.
     *
     * @method indexOf
     * @param callback {String|Function} the callback or its specified id
     * @return {Number} index of the callback or -1 if not found
     */
    indexOf : function (callback) {
        var i = 0, len = this._q.length, c;

        for (; i < len; ++i) {
            c = this._q[i];
            if (c === callback || c.id === callback) {
                return i;
            }
        }

        return -1;
    },

    /**
     * Retrieve a callback by its id.  Useful to modify the configuration
     * while the Queue is running.
     *
     * @method getCallback
     * @param id {String} the id assigned to the callback
     * @return {Object} the callback object
     */
    getCallback : function (id) {
        var i = this.indexOf(id);

        return (i > -1) ? this._q[i] : null;
    },

    /**
     * Promotes the named callback to the top of the queue. If a callback is
     * currently executing or looping (via until or iterations), the promotion
     * is scheduled to occur after the current callback has completed.
     *
     * @method promote
     * @param callback {String|Object} the callback object or a callback's id
     * @return {Queue} the Queue instance
     */
    promote : function (callback) {
        var payload = { callback : callback },e;

        if (this.isRunning()) {
            e = this.after(SHIFT, function () {
                    this.fire(PROMOTE, payload);
                    e.detach();
                }, this);
        } else {
            this.fire(PROMOTE, payload);
        }

        return this;
    },

    /**
     * Promotes the named callback to the top of the queue.
     *
     * The event object will contain a property &quot;callback&quot;, which
     * hold the id of a callback or the callback object itself.
     *
     * @method _defPromoteFn
     * @param e {Event} the custom event
     * @protected
     */
    _defPromoteFn : function (e) {
        var i = this.indexOf(e.callback),
            promoted = (i > -1) ? this._q.splice(i,1)[0] : null;

        e.promoted = promoted;

        if (promoted) {
            this._q.unshift(promoted);
        }
    },

    /**
     * Removes the callback from the queue.  If the Queue is active, the
     * removal is scheduled to occur after the current callback has completed.
     *
     * @method remove
     * @param callback {String|Object} the callback object or a callback's id
     * @return {Queue} the Queue instance
     */
    remove : function (callback) {
        var payload = { callback : callback },e;

        // Can't return the removed callback because of the deferral until
        // current callback is complete
        if (this.isRunning()) {
            e = this.after(SHIFT, function () {
                    this.fire(REMOVE, payload);
                    e.detach();
                },this);
        } else {
            this.fire(REMOVE, payload);
        }

        return this;
    },

    /**
     * Removes the callback from the queue.
     *
     * The event object will contain a property &quot;callback&quot;, which
     * hold the id of a callback or the callback object itself.
     *
     * @method _defRemoveFn
     * @param e {Event} the custom event
     * @protected
     */
    _defRemoveFn : function (e) {
        var i = this.indexOf(e.callback);

        e.removed = (i > -1) ? this._q.splice(i,1)[0] : null;
    },

    /**
     * Returns the number of callbacks in the queue
     *
     * @method size
     * @return {Number}
     */
    size : function () {
        // next() flushes callbacks that have met their until() criteria and
        // therefore shouldn't count since they wouldn't execute anyway.
        if (!this.isRunning()) {
            this.next();
        }

        return this._q.length;
    }
},true);

Y.augment(Queue, Y.EventTarget);


}, '@VERSION@' ,{requires:['queue-base','oop','event-custom']});


YUI.add('queue', function(Y){}, '@VERSION@' ,{use:['queue-base', 'queue-run']});

