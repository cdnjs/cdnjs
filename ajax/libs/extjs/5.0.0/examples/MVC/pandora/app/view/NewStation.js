Ext.define('Pandora.view.NewStation', {
    extend: 'Ext.form.field.ComboBox',
    emptyText: 'Search station',
    alias: 'widget.newstation',
    store: 'SearchResults',
    queryMode: 'local',
    displayField: 'name',
    valueField: 'id'
});