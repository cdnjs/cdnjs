/**
 * This example shows a common site registration form. The form appears to be simple but
 * it shows a few special things:
 *
 * - The display of field errors has been customized. Fields have `msgTarget: 'none'` so
 * the errors are not displayed with the individual fields; instead event listeners are
 * attached to the FormPanel to group up all error messages into a custom global error
 * indicator, with a persistent tooltip showing the error details.
 * - The "Terms of Use" link has an event handler attached so it opens the page in a modal
 * Ext.Window.
 * - The password fields have custom validation attached to verify the user enters the
 * same value in both.
 * - The submit button has `formBind: true` so it is only enabled when the form becomes
 * valid.
 */
Ext.define('KitchenSink.view.form.CustomErrorHandling', {
    extend: 'Ext.form.Panel',
    xtype: 'form-customerrors',
    controller: 'form-customerrors',
    
    //<example>
    requires: [
        'KitchenSink.view.form.CustomErrorHandlingController'
    ],
    
    exampleTitle: 'Custom Error Handling',
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/form/CustomErrorHandlingController.js'
    }],
    //</example>
    
    frame: true,
    width: 350,
    bodyPadding: 10,
    bodyBorder: true,
    title: 'Account Registration',

    defaults: {
        anchor: '100%'
    },
    
    fieldDefaults: {
        labelWidth: 110,
        labelAlign: 'left',
        msgTarget: 'none',
        invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
    },

    /*
     * Listen for validity change on the entire form and update the combined error icon
     */
    listeners: {
        validitychange: 'updateErrorState',
        errorchange: 'updateErrorState',
        scope: 'controller'
    },

    dockedItems: [{
        cls: Ext.baseCSSPrefix + 'dd-drop-ok',
        xtype: 'container',
        dock: 'bottom',
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        padding: '10 10 5',

        items: [{
            xtype: 'component',
            reference: 'formErrorState',
            height: '100%',
            invalidCls: Ext.baseCSSPrefix + 'form-invalid-icon-default',
            validCls: Ext.baseCSSPrefix + 'dd-drop-icon',
            baseCls: 'form-error-state',
            flex: 1,
            validText: 'Form is valid',
            invalidText: 'Form has errors',
            
            tipTpl: [
                '<ul class="' + Ext.plainListCls + '">',
                    '<tpl for=".">',
                        '<li><span class="field-name">{name}</span>: ',
                            '<span class="error">{error}</span>',
                        '</li>',
                    '</tpl>',
                '</ul>'
            ],

            setErrors: function(errors) {
                var me = this,
                    tpl = me.tipTpl,
                    tip = me.tip;
                
                if (!me.tipTpl.isTemplate) {
                    tpl = me.tipTpl = new Ext.XTemplate(tpl);
                }
                
                if (!tip) {
                    tip = me.tip = Ext.widget('tooltip', {
                        target: me.el,
                        title: 'Error Details:',
                        minWidth: 200,
                        autoHide: false,
                        anchor: 'top',
                        mouseOffset: [-11, -2],
                        closable: true,
                        constrainPosition: false,
                        cls: 'errors-tip'
                    });
                }

                errors = Ext.Array.from(errors);

                // Update CSS class and tooltip content
                if (errors.length) {
                    me.addCls(me.invalidCls);
                    me.removeCls(me.validCls);
                    me.update(me.invalidText);
                    tip.setDisabled(false);
                    tip.update(tpl.apply(errors));
                    tip.show();
                }
                else {
                    me.addCls(me.validCls);
                    me.removeCls(me.invalidCls);
                    me.update(me.validText);
                    tip.setDisabled(true);
                    tip.hide();
                }
            }
        }, {
            xtype: 'button',
            formBind: true,
            disabled: true,
            text: 'Submit Registration',
            minWidth: 140,
            listeners: {
                click: 'submitRegistration'
            }
        }]
    }],
    
    items: [{
        xtype: 'textfield',
        name: 'username',
        fieldLabel: 'User Name',
        allowBlank: false,
        minLength: 6
    }, {
        xtype: 'textfield',
        name: 'email',
        fieldLabel: 'Email Address',
        vtype: 'email',
        allowBlank: false
    }, {
        xtype: 'textfield',
        name: 'password1',
        fieldLabel: 'Password',
        inputType: 'password',
        style: 'margin-top: 15px',
        allowBlank: false,
        minLength: 8
    }, {
        xtype: 'textfield',
        name: 'password2',
        fieldLabel: 'Repeat Password',
        inputType: 'password',
        allowBlank: false,
        
        /*
         * Custom validator implementation - checks that the value matches what was entered into
         * the password1 field.
         */
        validator: function(value) {
            var password1 = this.previousSibling('[name=password1]');
            return (value === password1.getValue()) ? true : 'Passwords do not match.'
        }
    },

    /*
     * Terms of Use acceptance checkbox. Two things are special about this:
     * 1) The boxLabel contains a HTML link to the Terms of Use page; a special
     *    click listener opens this page in a modal Ext window for convenient viewing,
     *    and the Decline and Accept buttons in the window update the checkbox's state
     *    automatically.
     * 2) This checkbox is required, i.e. the form will not be able to be submitted
     *    unless the user has checked the box. Ext does not have this type of validation
     *    built in for checkboxes, so we add a custom getErrors method implementation.
     */
    {
        xtype: 'checkboxfield',
        name: 'acceptTerms',
        reference: 'acceptTerms',
        fieldLabel: 'Terms of Use',
        hideLabel: true,
        margin: '15 0 0 0',
        boxLabel: 'I have read and accept the <a href="#" class="terms">Terms of Use</a>.',

        // Listener to open the Terms of Use page link in a modal window
        // Note that the listener method itself is defined in the ViewController
        listeners: {
            click: {
                element: 'boxLabelEl',
                fn: 'onTermsOfUseElementClick'
            }
        },

        // Custom validation logic - requires the checkbox to be checked
        getErrors: function() {
            return this.getValue() ? [] : ['You must accept the Terms of Use']
        }
    }, {
        // The window is added to the form's children array to be handled
        // by the form's ViewController. In a more complicated case we would
        // probably want the window to have its own ViewController.
        xtype: 'window',
        reference: 'termsOfUseWindow',
        closeAction: 'hide',
        title: 'Terms of Use',
        modal: true,
        width: 700,
        height: 400,
        bodyPadding: '10 20',
        autoScroll: true,
        
        // Wall of text
        loader: {
            url: 'resources/data/form/terms-of-use.html',
            autoLoad: true
        },
    
        buttons: [{
            text: 'Decline',
            handler: 'declineTermsOfUse'
        }, {
            text: 'Accept',
            handler: 'acceptTermsOfUse'
        }]
    }]
});
