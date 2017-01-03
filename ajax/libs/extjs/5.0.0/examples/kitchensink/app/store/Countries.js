Ext.define('KitchenSink.store.Countries', {
    extend: 'Ext.data.Store',

    alias: 'store.countries',

    model: 'KitchenSink.model.tree.Country',

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/KitchenSink/Country'
    }
});
