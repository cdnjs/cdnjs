YUI.add('queue-base', function(Y) {

/**
 * Mechanism to execute a series of callbacks in sequence.
 * Callbacks can be function references or object literals with the following
 * keys:
 * <dl>
 *    <dt>fn</dt>
 *      <dd>{Function} REQUIRED the callback function.</dd>
 *    <dt>context</dt>
 *      <dd>{Object} the desired execution context of the callback function</dd>
 *    <dt>args</dt>
 *      <dd>{Array} list of arguments to pass to the callback function</dd>
 * </dl>
 *
 * @module queue
 * @submodule queue-base
 * @class Queue
 * @constructor
 * @param config {Object} default callback configuration values
 * @param callback* {Function|Object} Any number of callbacks to initialize the queue
 */
function Queue(config) {
    // Factory or Constructor
    var self = this instanceof Queue ? this : new Queue(config);

    // To avoid duplicate initialization
    if (self === this) {
        this._init(config);
    }

    return self.add.apply(self, Y.Array(arguments,1,true));
}

/**
 * Defaults used to fill unset callback configuration values.
 *
 * @property Queue.defaults
 * @type {Object}
 * @static
 */
Queue.defaults = {};

Queue.prototype = {
    /** 
     * Callback defaults for this instance.  Initially populated from the
     * static Queue.defaults collection.
     *
     * @property defaults
     * @type {Object}
     * @protected
     */
    _defaults : null,

    /**
     * Indicates the execution state of the Queue.
     *
     * @property active
     * @type {Boolean}
     */
    active : false,

    /**
     * Initializes the Queue isntance properties and events.
     *
     * @method _init
     * @param config {Object} Instance level defaults for all callbacks
     * @protected
     */
    _init : function (config) {
        this._q = [];

        this._defaults = Y.merge(
            Queue.defaults,
            { context : this },
            (Y.Lang.isObject(config) ? config : {}));

        this.publish('executeCallback', {
            defaultFn : this._defExecFn,
            emitFacade: true
        });
        this.publish('shiftCallback', {
            defaultFn : this._defShiftFn,
            emitFacade: true
        });
    },

    /**
     * Execute the queue callbacks (also resumes paused Queue).
     * @method run
     * @return {Queue} the Queue instance
     */
    run : function () {
        this.active = true;

        // Grab the first callback in the queue
        var callback = this._q.shift();

        // A callback is present and not currently executing/scheduled
        while (callback && this.active) {
            this._defExecFn(callback);
            callback = this._q.shift();
        }

        if (!this.size()) {
            this.active = false;
        }

        return this;
    },

    /**
     * Executes the callback function
     * @method _defExecFn
     * @param callback {Object} the callback object
     * @protected
     */
    _defExecFn : function (callback) {
        if (Y.Lang.isFunction(callback.fn)) {
            var args = 'args' in callback ? Y.Array(callback.args) : [];
            callback.fn.apply(callback.context, args);
        }
    },

    /**
     * Add any number of callbacks to the end of the queue.  Callbacks passed
     * in as functions will be wrapped in a callback object with defaulted
     * config values.
     *
     * @method add
     * @param callback* {Function|Object} Any number of callbacks
     * @return {Queue} the Queue instance
     */
    add : function () {
        var callbacks = Y.Array(arguments,0,true), i, len, c, added = [];

        for (i = 0, len = callbacks.length; i < len; ++i) {
            c = this._prepareCallback(callbacks[i]);

            if (Y.Lang.isObject(c)) {
                this._q.push(c);
                added.push(c);
            }
        }

        this.fire('addCallback',added);

        return this;
    },

    /**
     * Normalizes the callback into object literal form with required key:value
     * pairs dfaulted to functional values.
     *
     * @method _prepareCallback
     * @param callback {Object|Function} the raw callback
     * @return {Object} the normalized callback object
     * @protected
     */
    _prepareCallback : function (callback) {
        if (Y.Lang.isFunction(callback)) {
            callback = { fn : callback };
        }

        if (Y.Lang.isObject(callback)) {
            callback = Y.merge(this._defaults, callback);
        }

        return callback;
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
        this.active = false;

        return this;
    },

    /**
     * Stop and clear the Queue's queue after the current execution of the
     * current callback completes.
     * @method stop
     * @return {Queue} the Queue instance
     */
    stop : function () { 
        this.active = false;
        this._q = [];

        return this;
    },

    /**
     * Returns the number of items in the queue.  Callbacks configured with
     * <code>iterations</code> or <code>until</code> are counted only once.
     *
     * @method size
     * @return {Number} the number of currently queued callbacks
     */
    size : function () {
        return this._q.length;
    },

    // Placeholder stubs for event methods to allow for less code replacement
    // in extension.
    publish : function () {},
    fire : function () {}
};

Y.Queue = Queue;


}, '@VERSION@' );
