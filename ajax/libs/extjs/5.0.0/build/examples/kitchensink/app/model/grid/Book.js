Ext.define('KitchenSink.model.grid.Book',{
    extend: 'KitchenSink.model.Base',
    requires: [
        'Ext.data.reader.Xml'
    ],
    proxy: {
        // load using HTTP
        type: 'ajax',
        url: 'resources/data/grid/sheldon.xml',
        // the return will be XML, so lets set up a reader
        reader: {
            type: 'xml',
            // records will have an "Item" tag
            record: 'Item',
            idProperty: 'ASIN',
            totalRecords: '@total'
        }
    },
    fields: [
        // set up the fields mapping into the xml doc
        // The first needs mapping, the others are very basic
        {name: 'Author', mapping: '@author.name'},
        'Title', 'Manufacturer', 'ProductGroup'
    ]
});
