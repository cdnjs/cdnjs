Ext.define('KitchenSink.data.Order', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var orders = [{
        id: 1,
        customerId: 2,
        date: '2012-04-03',
        shipped: true
    }, {
        id: 2,
        customerId: 3,
        date: '2012-04-05',
        shipped: true
    }, {
        id: 3,
        customerId: 3,
        date: '2012-04-06',
        shipped: false
    }, {
        id: 4,
        customerId: 1,
        date: '2012-04-09',
        shipped: true
    }, {
        id: 5,
        customerId: 4,
        date: '2012-04-13',
        shipped: false
    }, {
        id: 6,
        customerId: 4,
        date: '2012-04-19',
        shipped: false
    }, {
        id: 7,
        customerId: 4,
        date: '2012-05-02',
        shipped: true
    }, {
        id: 8,
        customerId: 2,
        date: '2012-05-06',
        shipped: false
    }, {
        id: 9,
        customerId: 3,
        date: '2012-05-10',
        shipped: false
    }, {
        id: 10,
        customerId: 4,
        date: '2012-05-13',
        shipped: true
    }, {
        id: 11,
        customerId: 1,
        date: '2012-05-17',
        shipped: true
    }, {
        id: 12,
        customerId: 1,
        date: '2012-05-22',
        shipped: true
    }, {
        id: 13,
        customerId: 3,
        date: '2012-05-25',
        shipped: false
    }, {
        id: 14,
        customerId: 4,
        date: '2012-06-01',
        shipped: true
    }, {
        id: 15,
        customerId: 2,
        date: '2012-06-05',
        shipped: true
    }];
    
    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\/KitchenSink\/Order(\/\d+)?/,
        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                filters = ctx.params.filter,
                id;
            
            if (idPart) {
                id = parseInt(idPart.substring(1), 10);
                return Ext.Array.findBy(orders, function(order) {
                    return order.id === id;
                });
            } else if (filters) {
                filters = Ext.decode(filters);
                id = filters[0].value;
                return Ext.Array.filter(orders, function(order) {
                    return order.customerId === id;
                });
            } else {
                return orders;
            }
        }
    });
});
