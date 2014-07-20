Ext.define('KitchenSink.store.Thumbnails', {
    extend: 'Ext.data.Store',
    // even though this is not a tree store, it uses a TreeModel because it contains
    // records from the navigation tree.
    model: 'Ext.data.TreeModel',
    proxy: 'memory'
});
