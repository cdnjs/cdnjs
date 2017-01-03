Ext.define('KitchenSink.view.form.CustomErrorHandlingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-customerrors',
    
    submitRegistration: function() {
        var form = this.getView().getForm();

        /* Normally we would submit the form to the server here and handle the response...
        form.submit({
            clientValidation: true,
            url: 'register.php',
            success: function(form, action) {
               //...
            },
            failure: function(form, action) {
                //...
            }
        });
        */

        if (form.isValid()) {
            var out = [];
            Ext.Object.each(form.getValues(), function(key, value){
                out.push(key + '=' + value);
            });
            Ext.Msg.alert('Submitted Values', out.join('<br />'));
        }
    },
    
    updateErrorState: function() {
        var me = this,
            view, form, errorCmp, fields, errors;
        
        view = me.getView();
        form = view.getForm();
        
        // This is to prevent showing global error when form first loads
        if (me.hasBeenDirty || form.isDirty()) {
            errorCmp = me.lookupReference('formErrorState');
            
            fields = form.getFields();
            errors = [];
            
            fields.each(function(field) {
                Ext.Array.forEach(field.getErrors(), function(error) {
                    errors.push({name: field.getFieldLabel(), error: error});
                });
            });
            
            errorCmp.setErrors(errors);
            me.hasBeenDirty = true;
        }
    },

    onTermsOfUseElementClick: function(e) {
        var me = this,
            target;
        
        target = e.getTarget('.terms');
        e.preventDefault();
    
        if (target) {
            this.lookupReference('termsOfUseWindow').show();
        }
    },
    
    acceptTermsOfUse: function() {
        this.closeTermsOfUse(true);
    },
    
    declineTermsOfUse: function() {
        this.closeTermsOfUse(false);
    },
    
    closeTermsOfUse: function(accepted) {
        this.lookupReference('termsOfUseWindow').close();
        this.lookupReference('acceptTerms').setValue(accepted);
    }
});
