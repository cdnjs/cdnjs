YUI.add('queue', function(Y) {

/**
 * Mechanism to execute a series of callbacks in a non-blocking queue.  Each
 * callback is executed via setTimout unless configured with a negative
 * timeout, in which case it is run in blocking mode in the same execution
 * thread as the previous callback.  Callbacks can be function references or
 * object literals with the following keys:
 * <ul>
 *    <li><code>fn</code> - {Function} REQUIRED the callback function.</li>
 *    <li><code>timeout</code> - {number} millisecond delay to wait after previous callback completion before executing this callback.  Negative values cause immediate blocking execution.  Default 0.</li>
 *    <li><code>until</code> - {Function} boolean function executed before each iteration.  Return true to indicate callback completion.</li>
 *    <li><code>iterations</code> - {Number} number of times to execute the callback before proceeding to the next callback in the queue. Incompatible with <code>until</code>.</li>
 * </ul>
 *
 * @module queue
 * @class Queue
 * @constructor
 * @param callback* {Function|Object} Any number of callbacks to initialize the queue
 */
Y.Queue = function () {
    // Factory or Constructor
    var me = this instanceof Y.Queue ? this : new Y.Queue();

    /**
     * The callback queue
     * @property q
     * @type {Array}
     * @protected
     */
    me.q = [];

    return me.add.apply(me,arguments);
};

Y.Queue.prototype = {
    /**
     * Timeout id used to pause or stop execution and indicate the execution
     * state of the Queue.  0 indicates paused or stopped, negatives indicate
     * blocking execution, and positives indicate non-blocking execution.
     * @property id
     * @type {number}
     * @protected
     */
    id   : 0,

    /**
     * Execute the queue callbacks (also resumes paused Queue).
     * @method run
     * @return {Queue} the Queue instance
     */
    run : function () {
        // Grab the first callback in the queue
        var c  = this.q[0],
            fn;

        // If there is no callback in the queue or the Queue is currently
        // in an execution mode, return
        if (!c) {
            /**
             * Event fired after the last queued callback is executed.  Not
             * fired if the Queue is stopped via q.stop().
             * @event end
             */
            this.fire('end');
            return this;
        } else if (this.id) {
            return this;
        }

        fn = c.fn || c;

        if (typeof fn === 'function') {
            var ms   = c.timeout || 0,
                me   = this;

            // Execute immediately if the callback timeout is negative.
            if (ms < 0) {
                this.id = ms;
                if (c.until) { // test .until condition
                    for (;!c.until();) {
                        this._exec(fn,c);
                    }
                } else if (c.iterations) { // test .iterations
                    for (;c.iterations-- > 0;) {
                        this._exec(fn,c);
                    }
                } else { // single shot callback
                    this._exec(fn,c);
                }
                this._shift();
                this.id = 0;
                return this.run();
            } else {
                if (c.until) { // test .until condition
                    if (c.until()) {
                        // Move to the next callback
                        this._shift();
                        return this.run();
                    }
                } else if (!c.iterations || !--c.iterations) { // .iterations
                    this._shift();
                }

                // Set to execute after the configured timeout
                this.id = setTimeout(function () {
                    me._exec(fn,c);

                    // Loop unless the Queue was paused from inside the callback
                    if (me.id) {
                        // Indicate ready to run state
                        me.id = 0;
                        // Start the fun all over again
                        me.run();
                    }
                },ms);
            }
        }

        return this;
    },

    /**
     * Executes the callback function
     * @method _exec
     * @param fn {Function} the function to execute
     * @param c {Object|Function} the callback as defined during add(c)
     * @protected
     */
    _exec : function (fn,c) {
        /**
         * Fired before a callback is executed
         * @event beforeCallback
         * @param o {Object} Object literal with the following keys:
         * <dl>
         * <dt>fn</dt><dd>The function about to be executed</dd>
         * <dt>callback</dt><dd>The callback as provided to <code>add(..)</code></dd>
         * </dl>
         */
        this.fire('beforeCallback',{fn:fn,callback:c});

        fn.call(this);

        /**
         * Fired before a callback is executed
         * @event afterCallback
         * @param o {Object} Object literal with the following keys:
         * <dl>
         * <dt>fn</dt><dd>The function just executed</dd>
         * <dt>callback</dt><dd>The callback as provided to <code>add(..)</code></dd>
         * </dl>
         */
        this.fire('afterCallback',{fn:fn,callback:c});
    },

    /**
     * Shifts the first callback off the Queue
     * @method _shift
     * @private
     */
    _shift : function () {
        /**
         * Fired after a callback is shifted from the Queue
         * @event shiftCallback
         * @param callback {Function|Object} The callback passed to <code>add(..)</code>
         */
        this.fire('shiftCallback',this.q.shift());
    },
    
    /**
     * Add any number of callbacks to the end of the queue
     * @method add
     * @param callback* {Function|Object} Any number of callbacks
     * @return {Queue} the Queue instance
     */
    add  : function () {
        var callbacks = Y.Array(arguments,0,true);
        this.q.splice.apply(this.q,[this.q.length,0].concat(callbacks));

        /**
         * Fired from within <code>add(..)</code> after callbacks are queued
         * @event addCallback
         * @param callbacks {Array} Array of callbacks passed to <code>add(..)</code>
         */
        this.fire('addCallback',callbacks);
        return this;
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
        clearTimeout(this.id);
        this.id = 0;

        /**
         * Fired after Queue is paused
         * @event pause
         */
        this.fire('pause');
        return this;
    },

    /**
     * Stop and clear the Queue's queue after the current execution of the
     * current callback completes.
     * @method stop
     * @return {Queue} the Queue instance
     */
    stop : function () { 
        this.pause();
        this.q = [];

        /**
         * Fired after Queue is stopped
         * @event stop
         */
        this.fire('stop');
        return this;
    }
};
Y.augment(Y.Queue,Y.Event.Target);


}, '@VERSION@' ,{requires:['event']});
