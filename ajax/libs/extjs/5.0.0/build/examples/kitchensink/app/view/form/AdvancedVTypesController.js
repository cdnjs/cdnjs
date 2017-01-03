Ext.define('KitchenSink.view.form.AdvancedVTypesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-advtypes',
    
    validateField: function(field) {
        field.next().validate();
    }
});
