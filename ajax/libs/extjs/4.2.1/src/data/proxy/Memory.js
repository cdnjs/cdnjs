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
 * In-memory proxy. This proxy simply uses a local variable for data storage/retrieval, so its contents are lost on
 * every page refresh.
 *
 * Usually this Proxy isn't used directly, serving instead as a helper to a {@link Ext.data.Store Store} where a reader
 * is required to load data. For example, say we have a Store for a User model and have some inline data we want to
 * load, but this data isn't in quite the right format: we can use a MemoryProxy with a JsonReader to read it into our
 * Store:
 *
 *     //this is the model we will be using in the store
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'id',    type: 'int'},
 *             {name: 'name',  type: 'string'},
 *             {name: 'phone', type: 'string', mapping: 'phoneNumber'}
 *         ]
 *     });
 *
 *     //this data does not line up to our model fields - the phone field is called phoneNumber
 *     var data = {
 *         users: [
 *             {
 *                 id: 1,
 *                 name: 'Ed Spencer',
 *                 phoneNumber: '555 1234'
 *             },
 *             {
 *                 id: 2,
 *                 name: 'Abe Elias',
 *                 phoneNumber: '666 1234'
 *             }
 *         ]
 *     };
 *
 *     //note how we set the 'root' in the reader to match the data structure above
 *     var store = Ext.create('Ext.data.Store', {
 *         autoLoad: true,
 *         model: 'User',
 *         data : data,
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         }
 *     });
 */
Ext.define('Ext.data.proxy.Memory', {
    extend: 'Ext.data.proxy.Client',
    alias: 'proxy.memory',
    alternateClassName: 'Ext.data.MemoryProxy',

    /**
     * @cfg {Boolean} [enablePaging=false]
     * Configure as `true` to enable this MemoryProxy to honour a read operation's `start` and `limit` options.
     *
     * When `true`, read operations will be able to read *pages* of records from the data object.
     */

    /**
     * @cfg {Object} data
     * Optional data to pass to configured Reader.
     */

    constructor: function(config) {
        this.callParent([config]);

        //ensures that the reader has been instantiated properly
        this.setReader(this.reader);
    },
    
    /**
     * @private
     * Fake processing function to commit the records, set the current operation
     * to successful and call the callback if provided. This function is shared
     * by the create, update and destroy methods to perform the bare minimum
     * processing required for the proxy to register a result from the action.
     */
    updateOperation: function(operation, callback, scope) {
        var i = 0,
            recs = operation.getRecords(),
            len = recs.length;
            
        for (i; i < len; i++) {
            recs[i].commit();
        }
        operation.setCompleted();
        operation.setSuccessful();
        
        Ext.callback(callback, scope || this, [operation]);
    },
    
    /**
     * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
     * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
     * there is no real back end in this case there's not much else to do. This method can be easily overridden to 
     * implement more complex logic if needed.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether
     * successful or not)
     * @param {Object} scope Scope to execute the callback function in
     * @method
     */
    create: function() {
        this.updateOperation.apply(this, arguments);
    },
    
    /**
     * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
     * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
     * there is no real back end in this case there's not much else to do. This method can be easily overridden to 
     * implement more complex logic if needed.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether
     * successful or not)
     * @param {Object} scope Scope to execute the callback function in
     * @method
     */
    update: function() {
        this.updateOperation.apply(this, arguments);
    },
    
    /**
     * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
     * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
     * there is no real back end in this case there's not much else to do. This method can be easily overridden to 
     * implement more complex logic if needed.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether
     * successful or not)
     * @param {Object} scope Scope to execute the callback function in
     * @method
     */
    destroy: function() {
        this.updateOperation.apply(this, arguments);
    },

    /**
     * Reads data from the configured {@link #data} object. Uses the Proxy's {@link #reader}, if present.
     * @param {Ext.data.Operation} operation The read Operation
     * @param {Function} callback The callback to call when reading has completed
     * @param {Object} scope The scope to call the callback function in
     */
    read: function(operation, callback, scope) {
        var me = this,
            resultSet = operation.resultSet = me.getReader().read(me.data),
            records = resultSet.records,
            sorters = operation.sorters,
            groupers = operation.groupers,
            filters = operation.filters;

        operation.setCompleted();

        // Apply filters, sorters, and start/limit options
        if (resultSet.success) {

            // Filter the resulting array of records
            if (filters && filters.length) {
                records = resultSet.records = Ext.Array.filter(records, Ext.util.Filter.createFilterFn(filters));
            }

            // Remotely, groupers just mean top priority sorters
            if (groupers && groupers.length) {
                // Must concat so as not to mutate passed sorters array which could be the items property of the sorters collection
                sorters = sorters ? sorters.concat(groupers) : sorters;
            }

            // Sort by the specified groupers and sorters
            if (sorters && sorters.length) {
                resultSet.records = Ext.Array.sort(records, Ext.util.Sortable.createComparator(sorters));
            }

            // Reader reads the whole passed data object.
            // If successful and we were given a start and limit, slice the result.
            if (me.enablePaging && operation.start !== undefined && operation.limit !== undefined) {

                // Attempt to read past end of memory dataset - convert to failure
                if (operation.start >= resultSet.total) {
                    resultSet.success = false;
                    resultSet.count = 0;
                    resultSet.records = [];
                }
                // Range is valid, slice it up.
                else {
                    resultSet.records = Ext.Array.slice(resultSet.records, operation.start, operation.start + operation.limit);
                    resultSet.count = resultSet.records.length;
                }
            }
        }

        if (resultSet.success) {
            operation.setSuccessful();
        } else {
            me.fireEvent('exception', me, null, operation);
        }
        Ext.callback(callback, scope || me, [operation]);
    },

    clear: Ext.emptyFn
});
