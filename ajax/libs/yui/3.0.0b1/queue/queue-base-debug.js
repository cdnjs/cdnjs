YUI.add('queue-base', function(Y) {

/**
 * <p>The Queue module adds a common data structure for FIFO operations. In its
 * simplest form, it is little more than an array wrapper. Additional
 * submodules introduce more functionality such as promotion and removal of
 * queued items.</p>
 *
 * <p>An AsyncQueue class is provided in the queue-run submodule.  This class
 * affords a mechanism to do complex sequential and iterative callback
 * execution across configured timeouts.
 *
 * @module queue
 */

/**
 * A simple FIFO queue.  Items are added to the Queue with add(1..n items) and
 * removed using next().
 *
 * @module queue
 * @submodule queue-base
 * @class Queue
 * @param item* {MIXED} 0..n items to seed the queue
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
         * The collection of enqueued items
         *
         * @property _q
         * @type {Array}
         * @protected
         */
        this._q = [];
    },

    /**
     * Get the next item in the queue.
     *
     * @method next
     * @return {MIXED} the next item in the queue
     */
    next : function () {
        return this._q.shift();
    },

    /**
     * Add 0..n items to the end of the queue
     *
     * @method add
     * @param item* {MIXED} 0..n items
     */
    add : function () {
        Y.Array.each(Y.Array(arguments,0,true),function (fn) {
            this._q.push(fn);
        },this);

        return this;
    },

    /**
     * Returns the current number of queued items
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
