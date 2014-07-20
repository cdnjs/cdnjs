Ext.define('KitchenSink.view.form.CheckboxGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-checkboxgroup',
    
    onSaveFormClick: function() {
        var form = this.getView().getForm();
        
        if (form.isValid()) {
            Ext.Msg.alert({
                title: 'Submitted Values',
                message: 'The following will be sent to the server: <br />' +
                         form.getValues(true).replace(/&/g,', '),
                height: 200
            });
        }
        else {
            Ext.Msg.alert(
                'Form incomplete',
                'You must fill out the form with valid values, <br/ >' +
                'including the (initially collapsed) Checkbox group.'
            );
        }
    },
    
    onResetFormClick: function() {
        this.getView().getForm().reset();
    }
});
