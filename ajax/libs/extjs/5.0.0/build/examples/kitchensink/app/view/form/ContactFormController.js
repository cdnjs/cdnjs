Ext.define('KitchenSink.view.form.ContactFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-contact',
    
    showWindow: function() {
        var win = this.lookupReference('popupWindow');
        
        if (!win) {
            win = new KitchenSink.view.form.ContactFormWindow();
            
            // A Window is a floating component, so by default it is not connected
            // to our main View in any way. By adding it, we are creating this link
            // and allow the window to be controlled by the main ViewController,
            // as well as be destroyed automatically along with the main View.
            this.getView().add(win);
        }
        
        win.show();
    },

    onFormCancel: function() {
        this.lookupReference('windowForm').getForm().reset();
        this.lookupReference('popupWindow').hide();
    },
    
    onFormSubmit: function() {
        var formPanel = this.lookupReference('windowForm'),
            form = formPanel.getForm();
        
        if (form.isValid()) {
            // In a real application, this would submit the form to the configured url
            // form.submit();
            form.reset();
            this.lookupReference('popupWindow').hide();
            Ext.MessageBox.alert(
                'Thank you!',
                'Your inquiry has been sent. We will respond as soon as possible.'
            );
        }
    }
});
