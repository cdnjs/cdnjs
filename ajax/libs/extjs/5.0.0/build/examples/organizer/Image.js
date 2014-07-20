Ext.define('Ext.org.Image', {
    extend: 'Ext.data.Model',
    idProperty: 'name',
    fields: ['name', 'thumb', {
        name: 'leaf', defaultValue: true
    }]
});