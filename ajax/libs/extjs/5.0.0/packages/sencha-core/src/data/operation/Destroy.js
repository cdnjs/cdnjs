/**
 * @class Ext.data.operation.Destroy
 * Enacpsulates a destriy operation as performed by a {@link Ext.data.proxy.Proxy proxy}.
 *
 * This class is instantiated by {@link Ext.data.Store stores} and {@link Ext.data.Model records} and should
 * not need to be instantiated in user code.
 */
Ext.define('Ext.data.operation.Destroy', {
    extend: 'Ext.data.operation.Operation',
    alias: 'data.operation.destroy',
    
    action: 'destroy',

    isDestroyOperation: true,

    order: 30,

    foreignKeyDirection: -1,

    doProcess: function(/* resultSet, request, response */) {
        var clientRecords = this.getRecords(), 
            clientLen = clientRecords.length,
            i;
        
        for (i = 0; i < clientLen; ++i) {
            clientRecords[i].setErased();
        }
    },
    
    doExecute: function() {
        return this.getProxy().erase(this);
    },

    getRecordData: function (record, operation) {
        var data = {},
            idField = record.idField,
            nameProperty = this.getNameProperty() || 'name';

        data[idField[nameProperty]] = record.id;

        return data;
    }
});
