Ext.define('KitchenSink.store.DeviceMarketShare', {
    extend: 'Ext.data.Store',

    alias: 'store.device-market-share',

    fields: ['os', 'data1', 'data2' ],
    data: [
        { os: 'Android', data1: 68.3, data2: 150 },
        { os: 'iOS', data1: 17.9, data2: 200 },
        { os: 'Windows Phone', data1: 10.2, data2: 250 },
        { os: 'BlackBerry', data1: 1.7, data2: 90 },
        { os: 'Others', data1: 1.9, data2: 190 }
    ]
});
