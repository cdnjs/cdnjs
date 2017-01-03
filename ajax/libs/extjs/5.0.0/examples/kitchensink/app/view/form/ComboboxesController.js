Ext.define('KitchenSink.view.form.ComboboxesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-combos',
    
    onStateSelected: function(combo) {
        Ext.Msg.alert('State', 'Chosen state: ' + combo.getValue());
    }
});
