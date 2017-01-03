Ext.define('KitchenSink.model.tree.City', {
    extend: 'KitchenSink.model.tree.Base',
    entityName: 'City',
    idProperty: 'name',
    fields: [{
        name: "name",
        convert: undefined
    }]
});