/**
 * This example shows how to load a grid with SOAP data, and how to use a SOAP reader to
 * parse records from an xml response that contains namespace prefixes.
 *
 * SOAP support is available only in the Enterprise Edition.
 */
Ext.define('KitchenSink.view.enterprise.SoapGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'soap-grid',

    //<example>
    otherContent: [{
        type: 'Model',
        path: 'app/model/SoapBook.js'
    },{
        type: 'Data',
        path: 'resources/data/enterprise/soap.xml'
    }],
    //</example>
    width: 600,
    height: 350,

    frame: true,
    title: 'Soap Grid Example',
    store: {
        model: 'KitchenSink.model.SoapBook',
        autoLoad: true,
        proxy: {
            type: 'soap',
            url: 'resources/data/enterprise/soap.xml',
            api: {
                read: 'ItemSearch'
            },
            soapAction: {
                read: 'http://webservices.amazon.com/ItemSearch'
            },
            operationParam: 'operation',
            extraParams: {
                'Author': 'Sheldon'
            },
            targetNamespace: 'http://webservices.amazon.com/',
            reader: {
                type: 'soap',
                record: 'm|Item',
                idProperty: 'ASIN',
                namespace: 'm'
            }
        }
    },
    columns: [
        {text: "Author", flex: 1, dataIndex: 'Author'},
        {text: "Title", width: 180, dataIndex: 'Title'},
        {text: "Manufacturer", width: 115, dataIndex: 'Manufacturer'},
        {text: "Product Group", width: 125, dataIndex: 'ProductGroup'}
    ]
});
