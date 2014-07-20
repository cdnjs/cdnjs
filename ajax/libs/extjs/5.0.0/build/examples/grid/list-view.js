Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*'
]);
Ext.onReady(function(){
    Ext.define('ImageModel', {
        extend: 'Ext.data.Model',
        fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
    });
    var store = Ext.create('Ext.data.JsonStore', {
        model: 'ImageModel',
        proxy: {
            type: 'ajax',
            url: 'get-images.php',
            reader: {
                type: 'json',
                rootProperty: 'images'
            }
        }
    });
    store.load();

    var listView = Ext.create('Ext.grid.Panel', {
        width:425,
        height:250,
        collapsible:true,
        title:'Simple ListView <i>(0 items selected)</i>',
        renderTo: Ext.getBody(),

        store: store,
        multiSelect: true,
        viewConfig: {
            emptyText: 'No images to display'
        },

        columns: [{
            text: 'File',
            flex: (Ext.themeName === 'neptune-touch' || Ext.themeName === 'crisp') ? 47: 50,
            dataIndex: 'name'
        },{
            text: 'Last Modified',
            xtype: 'datecolumn',
            format: 'm-d h:i a',
            flex: 35,
            dataIndex: 'lastmod'
        },{
            text: 'Size',
            dataIndex: 'size',
            tpl: '{size:fileSize}',
            align: 'right',
            flex: (Ext.themeName === 'neptune-touch' || Ext.themeName === 'crisp') ? 18: 15,
            cls: 'listview-filesize'
        }]
    });

    // little bit of feedback
    listView.on('selectionchange', function(view, nodes){
        var len = nodes.length,
            suffix = len === 1 ? '' : 's',
            str = 'Simple ListView <i>({0} item{1} selected)</i>';
            
        listView.setTitle(Ext.String.format(str, len, suffix));
    });
});
