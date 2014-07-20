/**
 * @class Ext.data.operation.Create
 * Enacpsulates a create operation as performed by a {@link Ext.data.proxy.Proxy proxy}.
 *
 * This class is instantiated by {@link Ext.data.Store stores} and {@link Ext.data.Model records} and should
 * not need to be instantiated in user code.
 */
Ext.define('Ext.data.operation.Create', {
    extend: 'Ext.data.operation.Operation',
    alias: 'data.operation.create',
    
    action: 'create',

    isCreateOperation: true,

    order: 10,

    config: {
        recordCreator: Ext.identityFn
    },
    
    doExecute: function() {
        return this.getProxy().create(this);
    }
});
