Ext.define('KitchenSink.store.Products', {
    extend: 'Ext.data.Store',

    alias: 'store.products',
    model: 'KitchenSink.model.grid.Product',
    proxy: {
        type: 'ajax',
        url: 'resources/data/grid/grid-filter.json',
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: 'id',
            totalProperty: 'total'
        }
    },
    remoteSort: false,
    sorters: [{
        property: 'company',
        direction: 'ASC'
    }],
    pageSize: 50
});
