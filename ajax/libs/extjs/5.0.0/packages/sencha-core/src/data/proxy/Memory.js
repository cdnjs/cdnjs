/**
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
 *                 rootProperty: 'users'
 *             }
 *         }
 *     });
 */
Ext.define('Ext.data.proxy.Memory', {
    extend: 'Ext.data.proxy.Client',
    alias: 'proxy.memory',
    alternateClassName: 'Ext.data.MemoryProxy',

    isMemoryProxy: true,

    config: {
        /**
        * @cfg {Boolean} [enablePaging]
        * Configure as `true` to enable this MemoryProxy to honour a read operation's `start` and `limit` options.
        *
        * When `true`, read operations will be able to read *pages* of records from the data object.
        */
       enablePaging: false,

        /**
        * @cfg {Object} data
        * Optional data to pass to configured Reader.
        */
        data: null
    },
    
    /**
     * @private
     * Fake processing function to commit the records, set the current operation
     * to successful and call the callback if provided. This function is shared
     * by the create, update and destroy methods to perform the bare minimum
     * processing required for the proxy to register a result from the action.
     */
    finishOperation: function(operation) {
        var i = 0,
            recs = operation.getRecords(),
            len = recs.length;
            
        for (i; i < len; i++) {
            recs[i].commit();
        }
        operation.setSuccessful(true);
    },
    
    /**
     * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
     * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
     * there is no real back end in this case there's not much else to do. This method can be easily overridden to 
     * implement more complex logic if needed.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    create: function(operation) {
        this.finishOperation(operation);
    },
    
    /**
     * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
     * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
     * there is no real back end in this case there's not much else to do. This method can be easily overridden to 
     * implement more complex logic if needed.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    update: function(operation) {
        this.finishOperation(operation);
    },
    
    /**
     * Currently this is a hard-coded method that simply commits any records and sets the operation to successful,
     * then calls the callback function, if provided. It is essentially mocking a server call in memory, but since
     * there is no real back end in this case there's not much else to do. This method can be easily overridden to 
     * implement more complex logic if needed.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    erase: function(operation) {
        this.finishOperation(operation);
    },

    /**
     * Reads data from the configured {@link #data} object. Uses the Proxy's {@link #reader}, if present.
     * @param {Ext.data.operation.Operation} operation The read Operation
     */
    read: function(operation) {
        var me = this,
            resultSet = me.getReader().read(me.getData()),
            records = resultSet.getRecords(),
            sorters = operation.getSorters(),
            grouper = operation.getGrouper(),
            filters = operation.getFilters(),
            start = operation.getStart(),
            limit = operation.getLimit();

        // Apply filters, sorters, and start/limit options
        if (operation.process(resultSet, null, null, false) !== false) {
            // Filter the resulting array of records
            if (filters && filters.length) {
                // Total will be updated by setting records
                resultSet.setRecords(records = Ext.Array.filter(records, Ext.util.Filter.createFilterFn(filters)));
                resultSet.setTotal(records.length);
            }

            // Remotely, grouper just mean top priority sorters
            if (grouper) {
                // Must concat so as not to mutate passed sorters array which could be the items property of the sorters collection
                sorters = sorters ? sorters.concat(grouper) : sorters;
            }

            // Sort by the specified grouper and sorters
            if (sorters && sorters.length) {
                resultSet.setRecords(records = Ext.Array.sort(records, Ext.util.Sortable.createComparator(sorters)));
            }

            // Reader reads the whole passed data object.
            // If successful and we were given a start and limit, slice the result.
            if (me.getEnablePaging() && start !== undefined && limit !== undefined) {

                // Attempt to read past end of memory dataset - convert to failure
                if (start >= resultSet.getTotal()) {
                    resultSet.setConfig({
                        success: false,
                        records: [],
                        total: 0
                    });
                }
                // Range is valid, slice it up.
                else {
                    resultSet.setRecords(Ext.Array.slice(records, start, start + limit));
                }
            }
            operation.setCompleted();
        }
    },

    clear: Ext.emptyFn
});
