Ext.define('KitchenSink.model.tree.Country', {
    extend: 'KitchenSink.model.tree.Base',
    entityName: 'Country',
    idProperty: 'name',
    fields: [{
        name: "name",
        convert: undefined
    }]
});