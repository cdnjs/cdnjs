Ext.require([
    'Ext.direct.*',
    'Ext.data.*',
    'Ext.tree.*'
]);

Ext.onReady(function() {
    Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

    var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        proxy: {
            type: 'direct',
            directFn: 'TestAction.getTree',
            paramOrder: ['node']
        }
    });


    // create the Tree
    var tree = Ext.create('Ext.tree.Panel', {
        store: store,
        height: 350,
        width: 600,
        title: 'Tree Sample',
        rootVisible: false,
        renderTo: Ext.getBody()
    });
});
