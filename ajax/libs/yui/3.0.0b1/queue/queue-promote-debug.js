YUI.add('queue-promote', function(Y) {

/**
 * Adds methods promote and remove to Queue instances
 *
 * @module queue
 * @submodule queue-promote
 * @for Queue
 */

Y.mix(Y.Queue.prototype, {
    /**
     * Returns the current index in the queue of the specified callback
     * 
     * @method indexOf
     * @param callback {Function} the callback function
     * @return {Number} the index of the callback or -1 if not found
     */
    indexOf : function (callback) {
        return Y.Array.indexOf(this._q, callback);
    },

    /**
     * Moves the referenced callback function to the top of the queue
     *
     * @method promote
     * @param callback {Function} reference to a function in the queue
     */
    promote : function (callback) {
        var index = this.indexOf(callback);

        if (index > -1) {
            this._q.unshift(this._q.splice(index,1));
        }
    },

    /**
     * Removes the referenced callback function from the queue
     *
     * @method remove
     * @param callback {Function} reference to a function in the queue
     */
    remove : function (callback) {
        var index = this.indexOf(callback);

        if (index > -1) {
            this._q.splice(index,1);
        }
    }

});


}, '@VERSION@' ,{requires:['queue-base']});
