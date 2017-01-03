/**
 * Demonstrates a simple login form.
 */
Ext.define('KitchenSink.view.form.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-login',
    
    //<example>
    exampleTitle: 'Login Form',
    themes: {
        classic: {
            labelWidth: 100
        },
        neptune: {
            labelWidth: 120
        },
        gray: {
            labelWidth: 100
        },
        "neptune-touch": {
            labelWidth: 120
        }
    },
    //</example>
    
    title: 'Login',
    frame:true,
    width: 320,
    bodyPadding: 10,
    
    defaultType: 'textfield',
    
    items: [{
        allowBlank: false,
        fieldLabel: 'User ID',
        name: 'user',
        emptyText: 'user id'
    }, {
        allowBlank: false,
        fieldLabel: 'Password',
        name: 'pass',
        emptyText: 'password',
        inputType: 'password'
    }, {
        xtype:'checkbox',
        fieldLabel: 'Remember me',
        name: 'remember'
    }],
    
    buttons: [
        { text:'Register' },
        { text:'Login' }
    ],
    
    initComponent: function() {
        this.defaults = {
            anchor: '100%',
            labelWidth: this.themeInfo.labelWidth
        };
        
        this.callParent();
    }
});
