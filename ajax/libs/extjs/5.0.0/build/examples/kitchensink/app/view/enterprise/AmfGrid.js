/**
 * This example shows how to load a grid using Adobe AMF (Action Message Format) data.
 * It demonstrates the UTF-8 decoder by loading pangrams in several languages.
 *
 * AMF support is available only in the Enterprise Edition.
 */
Ext.define('KitchenSink.view.enterprise.AmfGrid', {
    extend: 'Ext.container.Container',

    xtype: 'amf-grid',

    width: 600,
    
    //<example>
    otherContent: [{
        type: 'Model',
        path: 'app/model/Pangram.js'
    },{
        type: 'Data',
        path: 'resources/data/enterprise/amf0-pangrams.amf'
    }],
    //</example>
    defaults: {
        height: 200,
        width: 600
    },

    items: [{
        xtype: 'grid',
        title: 'AMF0 Pangrams',
        margin: '0 0 10 0',
        store: {
            model: 'KitchenSink.model.Pangram',
            proxy: {
                type: 'amf',
                url: 'resources/data/enterprise/amf0-pangrams.amf'
            },
            autoLoad: true
        },
        columns: [
            { text: 'Language', dataIndex: 'language', width: 130 },
            { text: 'Pangram', dataIndex: 'text', flex: 1 }
        ]
    }, {
        xtype: 'grid',
        title: 'AMF3 Pangrams',
        store: {
            model: 'KitchenSink.model.Pangram',
            proxy: {
                type: 'amf',
                url: 'resources/data/enterprise/amf3-pangrams.amf'
            },
            autoLoad: true
        },
        columns: [
            { text: 'Language', dataIndex: 'language', width: 130 },
            { text: 'Pangram', dataIndex: 'text', flex: 1 }
        ]
    }]
});
