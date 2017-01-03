Ext.define('KitchenSink.model.tree.Territory', {
    extend: 'KitchenSink.model.tree.Base',
    entityName: 'Territory',
    idProperty: 'name',
    fields: [{
        name: "name",
        convert: undefined
    }]
});