/**
 */
Ext.define('Ext.data.field.String', {
    extend: 'Ext.data.field.Field',

    alias: 'data.field.string',

    sortType: 'asUCString',

    isStringField: true,

    convert: function(v) {
        var defaultValue = this.allowNull ? null : '';
        return (v === undefined || v === null) ? defaultValue : String(v);
    },
    
    getType: function() {
        return 'string';
    }
});
