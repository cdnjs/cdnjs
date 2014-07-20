/**
 * @private
 * Private utility class for managing all {@link Ext.form.field.Checkbox} fields grouped by name.
 */
Ext.define('Ext.form.CheckboxManager', {
    extend: 'Ext.util.MixedCollection',
    singleton: true,

    getByName: function(name, formId) {
        return this.filterBy(function(item) {
            return item.name == name && item.getFormId() == formId;
        });
    }
});
