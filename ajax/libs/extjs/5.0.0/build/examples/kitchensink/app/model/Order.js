Ext.define('KitchenSink.model.Order', {
    extend: 'KitchenSink.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'customerId', type: 'int', reference: 'Customer' },
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        'shipped'
    ],

    proxy: {
        type: 'rest',
        url: '/KitchenSink/Order'
    }
});
