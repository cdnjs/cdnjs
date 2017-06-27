/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @author Ed Spencer
 * @class Ext.data.Batch
 *
 * <p>Provides a mechanism to run one or more {@link Ext.data.Operation operations} in a given order. Fires the 'operationcomplete' event
 * after the completion of each Operation, and the 'complete' event when all Operations have been successfully executed. Fires an 'exception'
 * event if any of the Operations encounter an exception.</p>
 *
 * <p>Usually these are only used internally by {@link Ext.data.proxy.Proxy} classes</p>
 *
 */
Ext.define('Ext.data.Batch', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {Boolean} autoStart
     * True to immediately start processing the batch as soon as it is constructed (defaults to false)
     */
    autoStart: false,
    
    /**
     * @cfg {Boolean} pauseOnException
     * True to pause the execution of the batch if any operation encounters an exception
     * (defaults to false). If you set this to true you are responsible for implementing the appropriate
     * handling logic and restarting or discarding the batch as needed. There are different ways you could 
     * do this, e.g. by handling the batch's {@link #exception} event directly, or perhaps by overriding
     * {@link Ext.data.AbstractStore#onBatchException onBatchException} at the store level. If you do pause
     * and attempt to handle the exception you can call {@link #retry} to process the same operation again. 
     * 
     * Note that {@link Ext.data.Operation operations} are atomic, so any operations that may have succeeded
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
    pauseOnException: false,

    /**
     * @property {Number} current
     * The index of the current operation being executed. Read only
     */
    current: -1,

    /**
     * @property {Number} total
     * The total number of operations in this batch. Read only
     */
    total: 0,

    /**
     * @property {Boolean} isRunning
     * True if the batch is currently running. Read only
     */
    isRunning: false,

    /**
     * @property {Boolean} isComplete
     * True if this batch has been executed completely. Read only
     */
    isComplete: false,

    /**
     * @property {Boolean} hasException
     * True if this batch has encountered an exception. This is cleared at the start of each operation. Read only
     */
    hasException: false,

    /**
     * Creates new Batch object.
     * @param {Object} [config] Config object
     */
    constructor: function(config) {
        var me = this;

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

        me.mixins.observable.constructor.call(me, config);

        /**
         * Ordered array of operations that will be executed by this batch
         * @property {Ext.data.Operation[]} operations
         */
        me.operations = [];
        
        /**
         * Ordered array of operations that raised an exception during the most recent
         * batch execution and did not successfully complete
         * @property {Ext.data.Operation[]} exceptions
         */
        me.exceptions = [];
    },

    /**
     * Adds a new operation to this batch at the end of the {@link #operations} array
     * @param {Object} operation The {@link Ext.data.Operation Operation} object
     * @return {Ext.data.Batch} this
     */
    add: function(operation) {
        this.total++;

        operation.setBatch(this);

        this.operations.push(operation);
        
        return this;
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
        
        if (me.isRunning) {
            return me;
        }
        
        me.exceptions.length = 0;
        me.hasException = false;
        me.isRunning = true;

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
        return this.runOperation(this.current + 1);
    },

    /**
     * Pauses execution of the batch, but does not cancel the current operation
     * @return {Ext.data.Batch} this
     */
    pause: function() {
        this.isRunning = false;
        return this;
    },

    /**
     * Executes an operation by its numeric index in the {@link #operations} array
     * @param {Number} index The operation index to run
     * @return {Ext.data.Batch} this
     */
    runOperation: function(index) {
        var me = this,
            operations = me.operations,
            operation = operations[index],
            onProxyReturn;

        if (operation === undefined) {
            me.isRunning = false;
            me.isComplete = true;
            me.fireEvent('complete', me, operations[operations.length - 1]);
        } else {
            me.current = index;

            onProxyReturn = function(operation) {
                var hasException = operation.hasException();

                if (hasException) {
                    me.hasException = true;
                    me.exceptions.push(operation);
                    me.fireEvent('exception', me, operation);
                }

                if (hasException && me.pauseOnException) {
                    me.pause();
                } else {
                    operation.setCompleted();
                    me.fireEvent('operationcomplete', me, operation);
                    me.runNextOperation();
                }
            };

            operation.setStarted();

            me.proxy[operation.action](operation, onProxyReturn, me);
        }
        
        return me;
    }
});
