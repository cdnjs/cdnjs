Ext.define('PageAnalyzer.models.LayoutTreeNode', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'text', type: 'string' },
        { name: 'blocks', type: 'string' },
        { name: 'triggers', type: 'string' },
        { name: 'boxParent', type: 'string' },
        { name: 'isBoxParent', type: 'boolean' },
        { name: 'heightModel', type: 'string' },
        { name: 'widthModel', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'duration', type: 'float'},
        { name: 'totalTime', type: 'float'},
        { name: 'count', type: 'int'}
    ]
});
