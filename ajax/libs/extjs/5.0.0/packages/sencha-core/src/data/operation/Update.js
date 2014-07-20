/**
 * @class Ext.data.operation.Update
 * Enacpsulates a update operation as performed by a {@link Ext.data.proxy.Proxy proxy}.
 *
 * This class is instantiated by {@link Ext.data.Store stores} and {@link Ext.data.Model records} and should
 * not need to be instantiated in user code.
 */
Ext.define('Ext.data.operation.Update', {
    extend: 'Ext.data.operation.Operation',
    alias: 'data.operation.update',
    
    action: 'update',

    isUpdateOperation: true,

    order: 20,

    config: {
        recordCreator: Ext.identityFn
    },
    
    doExecute: function() {
        return this.getProxy().update(this);
    }
});
