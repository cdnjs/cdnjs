Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.layout.container.HBox',
    'Ext.window.MessageBox'
]);

Ext.define('Item', {
    extend: 'Ext.data.Model',
    fields: ['text', 'canDropOnFirst', 'canDropOnSecond']
});

Ext.onReady(function() {
    
    var store1 = {
        model: 'Item',
        root: {
            text: 'Root 1',
            expanded: true,
            children: [{
                text: 'Child 1',
                canDropOnFirst: true,
                canDropOnSecond: true,
                leaf: true
            }, {
                text: 'Child 2',
                canDropOnFirst: true,
                canDropOnSecond: false,
                leaf: true
            }, {
                text: 'Child 3',
                canDropOnFirst: false,
                canDropOnSecond: true,
                leaf: true
            }, {
                text: 'Child 4',
                canDropOnFirst: false,
                canDropOnSecond: false,
                leaf: true
            }]
        }
    };
    
    var store2 = {
        model: 'Item',
        root: {
            text: 'Root 2',
            expanded: true,
            children: [{
                text: 'Folder 1',
                children: [],
                expanded: true
            }, {
                text: 'Folder 2',
                children: [],
                expanded: true
            }]
        }
    };

    new Ext.panel.Panel({
        renderTo: 'tree-div',
        width: 300,
        height: 200,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaultType: 'treepanel',
        defaults: {
            rootVisible: false,
            flex: 1
        },
        items: [{
            title: 'Source',
            store: store1,
            viewConfig: {
                plugins: {
                   ptype: 'treeviewdragdrop',
                   enableDrag: true,
                   enableDrop: false
                }
            }
        }, {
            title: 'Destination',
            store: store2,
            viewConfig: {
                plugins: {
                   ptype: 'treeviewdragdrop',
                   enableDrag: false,
                   enableDrop: true,
                   appendOnly: true
                },
                listeners: {
                    nodedragover: function(targetNode, position, dragData){
                        var rec = dragData.records[0],
                            isFirst = targetNode.isFirst(),
                            canDropFirst = rec.get('canDropOnFirst'),
                            canDropSecond = rec.get('canDropOnSecond');
                            
                        return isFirst ? canDropFirst : canDropSecond;
                    }
                }
            }
        }]
    });
});
