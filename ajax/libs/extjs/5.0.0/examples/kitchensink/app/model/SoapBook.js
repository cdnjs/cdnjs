Ext.define('KitchenSink.model.SoapBook', {
    extend: 'KitchenSink.model.Base',
    
    fields: [
        // set up the fields mapping into the xml doc
        // The first needs mapping, the others are very basic
        {name: 'Author', mapping: 'm|ItemAttributes > m|Author'},
        'Title', 'Manufacturer', 'ProductGroup'
    ]
});