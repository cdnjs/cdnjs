/**
 * This View Controller is associated with the Login view.
 */
Ext.define('Ticket.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    
    loginText: 'Logging in...',

    constructor: function () {
        this.callParent(arguments);

        this.loginManager = new Ticket.LoginManager({
            session: this.session,
            model: 'User'
        });
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },
    
    onLoginClick: function() {
        this.doLogin();
    },
    
    doLogin: function() {
        var form = this.lookupReference('form');
        
        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);

            this.loginManager.login({
                data: form.getValues(),
                scope: this,
                success: 'onLoginSuccess',
                failure: 'onLoginFailure'
            });
        }
    },
    
    onLoginFailure: function() {
        // Do something
        Ext.getBody().unmask();
    },

    onLoginSuccess: function(user) {
        Ext.getBody().unmask();

        var org = this.lookupReference('organization').getSelectedRecord();
        this.fireViewEvent('login', this.getView(), user, org, this.loginManager);
    }
});
