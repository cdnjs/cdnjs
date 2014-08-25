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
 *
 * Represents a single read or write operation performed by a {@link Ext.data.proxy.Proxy Proxy}. Operation objects are
 * used to enable communication between Stores and Proxies. Application developers should rarely need to interact with
 * Operation objects directly.
 *
 * Several Operations can be batched together in a {@link Ext.data.Batch batch}.
 */
Ext.define('Ext.data.Operation', {
    /**
     * @cfg {Boolean} synchronous
     * True if this Operation is to be executed synchronously. This property is inspected by a
     * {@link Ext.data.Batch Batch} to see if a series of Operations can be executed in parallel or not.
     */
    synchronous: true,

    /**
     * @cfg {String} action
     * The action being performed by this Operation. Should be one of 'create', 'read', 'update' or 'destroy'.
     */
    action: undefined,

    /**
     * @cfg {Ext.util.Filter[]} filters
     * Optional array of filter objects. Only applies to 'read' actions.
     */
    filters: undefined,

    /**
     * @cfg {Ext.util.Sorter[]} sorters
     * Optional array of sorter objects. Only applies to 'read' actions.
     */
    sorters: undefined,

    /**
     * @cfg {Ext.util.Grouper[]} groupers
     * Optional grouping configuration. Only applies to 'read' actions where grouping is desired.
     */
    groupers: undefined,

    /**
     * @cfg {Number} start
     * The start index (offset), used in paging when running a 'read' action.
     */
    start: undefined,

    /**
     * @cfg {Number} limit
     * The number of records to load. Used on 'read' actions when paging is being used.
     */
    limit: undefined,

    /**
     * @cfg {Ext.data.Batch} batch
     * The batch that this Operation is a part of.
     */
    batch: undefined,
    
    /**
     * @cfg {Object} params
     * Parameters to pass along with the request when performing the operation.
     */

    /**
     * @cfg {Function} callback
     * Function to execute when operation completed.
     * @cfg {Ext.data.Model[]} callback.records Array of records.
     * @cfg {Ext.data.Operation} callback.operation The Operation itself.
     * @cfg {Boolean} callback.success True when operation completed successfully.
     */
    callback: undefined,

    /**
     * @cfg {Object} scope
     * Scope for the {@link #callback} function.
     */
    scope: undefined,

    /**
     * @property {Boolean} started
     * The start status of this Operation. Use {@link #isStarted}.
     * @readonly
     * @private
     */
    started: false,

    /**
     * @property {Boolean} running
     * The run status of this Operation. Use {@link #isRunning}.
     * @readonly
     * @private
     */
    running: false,

    /**
     * @property {Boolean} complete
     * The completion status of this Operation. Use {@link #isComplete}.
     * @readonly
     * @private
     */
    complete: false,

    /**
     * @property {Boolean} success
     * Whether the Operation was successful or not. This starts as undefined and is set to true
     * or false by the Proxy that is executing the Operation. It is also set to false by {@link #setException}. Use
     * {@link #wasSuccessful} to query success status.
     * @readonly
     * @private
     */
    success: undefined,

    /**
     * @property {Boolean} exception
     * The exception status of this Operation. Use {@link #hasException} and see {@link #getError}.
     * @readonly
     * @private
     */
    exception: false,

    /**
     * @property {String/Object} error
     * The error object passed when {@link #setException} was called. This could be any object or primitive.
     * @private
     */
    error: undefined,

    /**
     * @property {RegExp} actionCommitRecordsRe
     * The RegExp used to categorize actions that require record commits.
     */
    actionCommitRecordsRe: /^(?:create|update)$/i,

    /**
     * @property {RegExp} actionSkipSyncRe
     * The RegExp used to categorize actions that skip local record synchronization. This defaults
     * to match 'destroy'.
     */
    actionSkipSyncRe: /^destroy$/i,

    /**
     * Creates new Operation object.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        Ext.apply(this, config || {});
    },

    /**
     * This method is called to commit data to this instance's records given the records in
     * the server response. This is followed by calling {@link Ext.data.Model#commit} on all
     * those records (for 'create' and 'update' actions).
     *
     * If this {@link #action} is 'destroy', any server records are ignored and the
     * {@link Ext.data.Model#commit} method is not called.
     *
     * @param {Ext.data.Model[]} serverRecords An array of {@link Ext.data.Model} objects returned by
     * the server.
     * @markdown
     */
    commitRecords: function(serverRecords) {
        var me = this,
            commitRecords = me.actionCommitRecordsRe.test(me.action),
            mc, index, clientRecords, serverRec, clientRec, i, len,
            modifiedFields, recordModifiedFields;

        if (!me.actionSkipSyncRe.test(me.action)) {
            clientRecords = me.records;

            if (clientRecords && clientRecords.length) {

                // If we plan to commit the records modified by the server's return records
                // we collect all the fields which were modified as a result.
                // This is so that a modifiedFields array can be passed into the commit codepath
                // so that minimal UI updating can be applied.
                if (commitRecords) {
                    recordModifiedFields = [];
                }
                if (clientRecords.length > 1) {
                    // If this operation has multiple records, client records need to be matched up with server records
                    // so that any data returned from the server can be updated in the client records. If we don't have
                    // a clientIdProperty specified on the model and we've done a create, just assume the data is returned in order.
                    // If it's an update, the records should already have an id which should match what the server returns.
                    if (me.action == 'update' || clientRecords[0].clientIdProperty) {
                        mc = new Ext.util.MixedCollection();
                        mc.addAll(serverRecords);

                        for (index = clientRecords.length; index--; ) {
                            clientRec = clientRecords[index];
                            serverRec = mc.findBy(me.matchClientRec, clientRec);

                            // Replace client record data with server record data
                            modifiedFields = clientRec.copyFrom(serverRec);

                            // If we plan to commit the records, collect modified field list for each record
                            if (commitRecords) {
                                recordModifiedFields.push(modifiedFields);
                            }
                        }
                    } else {
                        for (i = 0, len = clientRecords.length; i < len; ++i) {
                            clientRec = clientRecords[i];
                            serverRec = serverRecords[i];
                            if (clientRec && serverRec) {
                                modifiedFields = me.updateRecord(clientRec, serverRec);

                                // If we plan to commit the records, collect modified field list for each record
                                if (commitRecords) {
                                    recordModifiedFields.push(modifiedFields);
                                }
                            }
                        }
                    }
                } else {
                    // operation only has one record, so just match the first client record up with the first server record
                    modifiedFields = me.updateRecord(clientRecords[0], serverRecords[0]);   

                    // If we plan to commit the records, collect modified field list for each record
                    if (commitRecords) {
                        recordModifiedFields[0] = modifiedFields;
                    }
                }

                if (commitRecords) {
                    for (index = clientRecords.length; index--; ) {

                        // Pass array of field names which were modified as a result of the server's reply
                        // In a grid, this avoids full row refreshes when the record returns unmodified.
                        // See Ext.view.Table#shouldUpdateCell
                        clientRecords[index].commit(false, recordModifiedFields[index]);
                    }
                }
            }
        }
    },
    
    updateRecord: function(clientRec, serverRec) {
        // if the client record is not a phantom, make sure the ids match before replacing the client data with server data.
        if (serverRec && (clientRec.phantom || clientRec.getId() === serverRec.getId())) {
            return clientRec.copyFrom(serverRec);
        }

        // ID could not be matched up, no fields were modified.
        return [];
    },

    // Private.
    // Record matching function used by commitRecords
    // IMPORTANT: This is called in the scope of the clientRec being matched
    matchClientRec: function(record) {
        var clientRec = this,
            clientRecordId = clientRec.getId();

        if(clientRecordId && record.getId() === clientRecordId) {
            return true;
        }
        // if the server record cannot be found by id, find by internalId.
        // this allows client records that did not previously exist on the server
        // to be updated with the correct server id and data.
        return record.internalId === clientRec.internalId;
    },

    /**
     * Marks the Operation as started.
     */
    setStarted: function() {
        this.started = true;
        this.running = true;
    },

    /**
     * Marks the Operation as completed.
     */
    setCompleted: function() {
        this.complete = true;
        this.running  = false;
    },

    /**
     * Marks the Operation as successful.
     */
    setSuccessful: function() {
        this.success = true;
    },

    /**
     * Marks the Operation as having experienced an exception. Can be supplied with an option error message/object.
     * @param {String/Object} error (optional) error string/object
     */
    setException: function(error) {
        this.exception = true;
        this.success = false;
        this.running = false;
        this.error = error;
    },

    /**
     * Returns true if this Operation encountered an exception (see also {@link #getError})
     * @return {Boolean} True if there was an exception
     */
    hasException: function() {
        return this.exception === true;
    },

    /**
     * Returns the error string or object that was set using {@link #setException}
     * @return {String/Object} The error object
     */
    getError: function() {
        return this.error;
    },

    /**
     * Returns the {@link Ext.data.Model record}s associated with this operation.  For read operations the records as set by the {@link Ext.data.proxy.Proxy Proxy} will be returned (returns `null` if the proxy has not yet set the records).
     * For create, update, and destroy operations the operation's initially configured records will be returned, although the proxy may modify these records' data at some point after the operation is initialized.
     * @return {Ext.data.Model[]}
     */
    getRecords: function() {
        var resultSet = this.getResultSet();
        return this.records || (resultSet ? resultSet.records : null);
    },

    /**
     * Returns the ResultSet object (if set by the Proxy). This object will contain the {@link Ext.data.Model model}
     * instances as well as meta data such as number of instances fetched, number available etc
     * @return {Ext.data.ResultSet} The ResultSet object
     */
    getResultSet: function() {
        return this.resultSet;
    },

    /**
     * Returns true if the Operation has been started. Note that the Operation may have started AND completed, see
     * {@link #isRunning} to test if the Operation is currently running.
     * @return {Boolean} True if the Operation has started
     */
    isStarted: function() {
        return this.started === true;
    },

    /**
     * Returns true if the Operation has been started but has not yet completed.
     * @return {Boolean} True if the Operation is currently running
     */
    isRunning: function() {
        return this.running === true;
    },

    /**
     * Returns true if the Operation has been completed
     * @return {Boolean} True if the Operation is complete
     */
    isComplete: function() {
        return this.complete === true;
    },

    /**
     * Returns true if the Operation has completed and was successful
     * @return {Boolean} True if successful
     */
    wasSuccessful: function() {
        return this.isComplete() && this.success === true;
    },

    /**
     * @private
     * Associates this Operation with a Batch
     * @param {Ext.data.Batch} batch The batch
     */
    setBatch: function(batch) {
        this.batch = batch;
    },

    /**
     * Checks whether this operation should cause writing to occur.
     * @return {Boolean} Whether the operation should cause a write to occur.
     */
    allowWrite: function() {
        return this.action != 'read';
    }
});
