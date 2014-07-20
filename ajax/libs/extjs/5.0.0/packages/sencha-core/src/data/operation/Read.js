/**
 * @class Ext.data.operation.Read
 * Enacpsulates a read operation as performed by a {@link Ext.data.proxy.Proxy proxy}.
 *
 * This class is instantiated by {@link Ext.data.Store stores} and {@link Ext.data.Model records} and should
 * not need to be instantiated in user code.
 */
Ext.define('Ext.data.operation.Read', {
    extend: 'Ext.data.operation.Operation',
    alias: 'data.operation.read',
    
    action: 'read',

    isReadOperation: true,
    
    config: {
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
         * @cfg {Ext.util.Grouper} grouper
         * Optional grouping configuration. Only applies to 'read' actions where grouping is desired.
         */
        grouper: undefined,
    
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
         * @cfg {Number} page
         * The page for this operation.
         */
        page: undefined,
        
        /**
         * @cfg {Boolean} addRecords
         * Passed internally to loadRecords when the load completes
         * @private
         */
        addRecords: false
    },
    
    doExecute: function() {
        return this.getProxy().read(this);
    },

    doProcess: Ext.emptyFn,

    allowWrite: function() {
        return false;
    }
});
