/**
 * Provides a mechanism to run one or more {@link Ext.data.operation.Operation operations}
 * in a given order. Fires the `operationcomplete` event after the completion of each
 * Operation, and the `complete` event when all Operations have been successfully executed.
 * Fires an `exception` event if any of the Operations encounter an exception.
 *
 * Usually these are only used internally by {@link Ext.data.proxy.Proxy} classes.
 */
Ext.define('Ext.data.Batch', {
    mixins: {
        observable: 'Ext.mixin.Observable'
    },

    config: {    
        /**
        * @cfg {Boolean} pauseOnException
        * True to pause the execution of the batch if any operation encounters an exception
        * (defaults to false). If you set this to true you are responsible for implementing the appropriate
        * handling logic and restarting or discarding the batch as needed. There are different ways you could 
        * do this, e.g. by handling the batch's {@link #event-exception} event directly, or perhaps by overriding
        * {@link Ext.data.ProxyStore#onBatchException onBatchException} at the store level. If you do pause
        * and attempt to handle the exception you can call {@link #retry} to process the same operation again. 
        * 
        * Note that {@link Ext.data.operation.Operation operations} are atomic, so any operations that may have succeeded
        * prior to an exception (and up until pausing the batch) will be finalized at the server level and will
        * not be automatically reversible. Any transactional / rollback behavior that might be desired would have
        * to be implemented at the application level. Pausing on exception will likely be most beneficial when
        * used in coordination with such a scheme, where an exception might actually affect subsequent operations
        * in the same batch and so should be handled before continuing with the next operation.
        * 
        * If you have not implemented transactional operation handling then this option should typically be left 
        * to the default of false (e.g. process as many operations as possible, and handle any exceptions 
        * asynchronously without holding up the rest of the batch).
        */
        pauseOnException: false
    },

    /**
     * @property {Number} current
     * The index of the current operation being executed.
     * @private
     */
    current: -1,

    /**
     * @property {Number} total
     * The total number of operations in this batch.
     * @private
     */
    total: 0,

    /**
     * @property {Boolean} running
     * True if the batch is currently running.
     * @private
     */
    running: false,

    /**
     * @property {Boolean} complete
     * True if this batch has been executed completely.
     * @private
     */
    complete: false,

    /**
     * @property {Boolean} exception
     * True if this batch has encountered an exception. This is cleared at the start of each operation.
     * @private
     */
    exception: false,

    /**
     * Creates new Batch object.
     * @param {Object} [config] Config object
     */
    constructor: function(config) {
        var me = this;

        me.mixins.observable.constructor.call(me, config);

        /**
         * @event complete
         * Fired when all operations of this batch have been completed
         * @param {Ext.data.Batch} batch The batch object
         * @param {Object} operation The last operation that was executed
         */

        /**
         * @event exception
         * Fired when a operation encountered an exception
         * @param {Ext.data.Batch} batch The batch object
         * @param {Object} operation The operation that encountered the exception
         */

        /**
         * @event operationcomplete
         * Fired when each operation of the batch completes
         * @param {Ext.data.Batch} batch The batch object
         * @param {Object} operation The operation that just completed
         */

        /**
         * Ordered array of operations that will be executed by this batch
         * @property {Ext.data.operation.Operation[]} operations
         * @private
         */
        me.operations = [];
        
        /**
         * Ordered array of operations that raised an exception during the most recent
         * batch execution and did not successfully complete
         * @property {Ext.data.operation.Operation[]} exceptions
         */
        me.exceptions = [];
    },

    /**
     * Adds a new operation to this batch at the end of the {@link #operations} array
     * @param {Ext.data.operation.Operation/Ext.data.operation.Operation[]} operation 
     * The {@link Ext.data.operation.Operation Operation} object or an array of operations.
     * @return {Ext.data.Batch} this
     */
    add: function(operation) {
        var me = this,
            i, len;
            
        if (Ext.isArray(operation)) {
            for (i = 0, len = operation.length; i < len; ++i) {
                me.add(operation[i]);
            }
        } else {
            me.total++;
    
            operation.setBatch(me);

            me.operations.push(operation);
        }
        return me;
    },

    /**
     * Sorts the `{@link Ext.data.operation.Operation operations}` based on their type and
     * the foreign key dependencies of the entities. Consider a simple Parent and Child
     * case where the Child has a "parentId" field. If this batch contains two `create`
     * operations, one of a Parent and one for its Child, the server must receive and
     * process the `create` of the Parent before the Child can be created.
     *
     * In the case of `destroy` operations this order is reversed. The Child entity must be
     * destroyed before the Parent to avoid any foreign key constraints (a Child with an
     * invalid parentId field).
     *
     * Further, `create` operations must all occur before `update` operations to ensure
     * that all entities exist that might be now referenced by the updates. The created
     * entities can safely reference already existing entities.
     *
     * Finally, `destroy` operations are sorted after `update` operations to allow those
     * updates to remove references to the soon-to-be-deleted entities.
     */
    sort: function () {
        this.operations.sort(this.sortFn);
    },

    sortFn: function (operation1, operation2) {
        var ret = operation1.order - operation2.order;
        if (ret) {
            return ret;
        }

        var entityType1 = operation1.entityType,
            entityType2 = operation2.entityType,
            rank;

        // Since the orders are equal, the operations are the same type. Read operations
        // have no records, so report equality.
        if (!entityType1 || !entityType2) {
            return 0;
        }

        // Otherwise, determine the entity rank for the entities involved in the two
        // operations.
        if (!(rank = entityType1.rank)) {
            // Time to perform the topo-sort based on foreign-key references.
            entityType1.schema.rankEntities();

            // Now the rank is available for all entities.
            rank = entityType1.rank;
        }

        return (rank - entityType2.rank) * operation1.foreignKeyDirection;
    },

    /**
     * Kicks off execution of the batch, continuing from the next operation if the previous
     * operation encountered an exception, or if execution was paused. Use this method to start
     * the batch for the first time or to restart a paused batch by skipping the current
     * unsuccessful operation.
     * 
     * To retry processing the current operation before continuing to the rest of the batch (e.g.
     * because you explicitly handled the operation's exception), call {@link #retry} instead.
     * 
     * Note that if the batch is already running any call to start will be ignored.
     * 
     * @return {Ext.data.Batch} this
     */
    start: function(/* private */ index) {
        var me = this;
        
        if (!me.operations.length || me.running) {
            return me;
        }
        
        me.exceptions.length = 0;
        me.exception = false;
        me.running = true;

        return me.runOperation(Ext.isDefined(index) ? index : me.current + 1);
    },
    
    /**
     * Kicks off execution of the batch, continuing from the current operation. This is intended
     * for restarting a {@link #pause paused} batch after an exception, and the operation that raised
     * the exception will now be retried. The batch will then continue with its normal processing until
     * all operations are complete or another exception is encountered.
     * 
     * Note that if the batch is already running any call to retry will be ignored.
     * 
     * @return {Ext.data.Batch} this
     */
    retry: function() {
        return this.start(this.current);
    },

    /**
     * @private
     * Runs the next operation, relative to this.current.
     * @return {Ext.data.Batch} this
     */
    runNextOperation: function() {
        var me = this;
        
        if (me.running) {
            me.runOperation(me.current + 1);
        }
        return me;
    },

    /**
     * Pauses execution of the batch, but does not cancel the current operation
     * @return {Ext.data.Batch} this
     */
    pause: function() {
        this.running = false;
        return this;
    },
    
    /**
     * Gets the operations for this batch.
     * @return {Ext.data.operation.Operation[]} The operations.
     */
    getOperations: function() {
        return this.operations;    
    },
    
    /**
     * Gets any operations that have returned without success in this batch.
     * @return {Ext.data.operation.Operation[]} The exceptions
     */
    getExceptions: function() {
        return this.exceptions;
    },
    
    /**
     * Gets the currently running operation. Will return null if the batch has
     * not started or is completed.
     * @return {Ext.data.operation.Operation} The operation
     */
    getCurrent: function() {
        var out = null,
            current = this.current;
            
        if (!(current === -1 || this.complete)) {
            out = this.operations[current]
        }    
        return out;
    },
    
    /**
     * Gets the total number of operations in this batch.
     * @return {Number} The total
     */
    getTotal: function() {
        return this.total;
    },
    
    /**
     * Checks if this batch is running.
     * @return {Boolean} `true` if this batch is running.
     */
    isRunning: function() {
        return this.running;
    },
    
    /**
     * Checks if this batch is complete.
     * @return {Boolean} `true` if this batch is complete.
     */
    isComplete: function() {
        return this.complete;    
    },
    
    /**
     * Checks if this batch has any exceptions.
     * @return {Boolean} `true` if this batch has any exceptions.
     */
    hasException: function() {
        return this.exception;    
    },

    /**
     * Executes an operation by its numeric index in the {@link #operations} array
     * @param {Number} index The operation index to run
     * @return {Ext.data.Batch} this
     * 
     * @private
     */
    runOperation: function(index) {
        var me = this,
            operations = me.operations,
            operation = operations[index];

        if (operation === undefined) {
            me.running = false;
            me.complete = true;
            me.fireEvent('complete', me, operations[operations.length - 1]);
        } else {
            me.current = index;
            operation.setInternalCallback(me.onOperationComplete);
            operation.setInternalScope(me);
            operation.execute();
        }
        return me;
    },
    
    onOperationComplete: function(operation) {
        var me = this,
            exception = operation.hasException();
            
        if (exception) {
            me.exception = true;
            me.exceptions.push(operation);
            me.fireEvent('exception', me, operation);
        }

        if (exception && me.getPauseOnException()) {
            me.pause();
        } else {
            me.fireEvent('operationcomplete', me, operation);
            me.runNextOperation();
        }
    }
});
