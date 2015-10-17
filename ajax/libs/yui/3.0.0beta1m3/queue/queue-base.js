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
