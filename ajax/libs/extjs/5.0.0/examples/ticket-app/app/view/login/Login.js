Ext.define('Ticket.view.login.Login', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ticket.view.login.LoginController',
        'Ticket.view.login.LoginModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox'
    ],
    
    viewModel: 'login',
    
    controller: 'login',
    bodyPadding: 10,
    title: 'Login - Ticket App',
    closable: false,
    
    cls: 'login',
    
    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            bind: '{username}',
            fieldLabel: 'Username',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            enableKeyEvents: true,
            cls: 'password',
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password',
            cls: 'hint'
        },{
            xtype: 'combobox',
            name: 'organization',
            fieldLabel: 'Organization',
            reference: 'organization',
            queryMode: 'local',
            editable: false,
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            bind: {
                store: '{organizations}',
                value: {
                    twoWay: false,
                    bindTo: '{defaultOrg}'
                }
            }
        }]
    },

    buttons: [{
        text: 'Login',
        listeners: {
            click: 'onLoginClick'
        }
    }]
});
