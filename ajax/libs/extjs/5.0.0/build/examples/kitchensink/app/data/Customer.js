Ext.define('KitchenSink.data.Customer', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var customers = [{
        id: 1,
        name: 'Customer A',
        phone: '540-111-1234'
    }, {
        id: 2,
        name: 'Customer B',
        phone: '650-222-2345'
    }, {
        id: 3,
        name: 'Customer C',
        phone: '412-333-3456'
    }, {
        id: 4,
        name: 'Customer D',
        phone: '861-444-4567'
    }];
    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\/KitchenSink\/Customer(\/\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                id;
            if (idPart) {
                id = parseInt(idPart.substring(1), 10);
                return Ext.Array.findBy(customers, function(customer) {
                    return customer.id === id;
                });
            } else {
                return customers;
            }
        }
    });
});
