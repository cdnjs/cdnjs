Ext.define('KitchenSink.store.CountryStates', {
    extend: 'Ext.data.Store',

    alias: 'store.country-states',

    model: 'KitchenSink.model.State',

    pageSize: 0,

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/KitchenSink/CountryState'
    }
});
