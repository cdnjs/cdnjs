/**
 * This global controller manages the login view and ensures that view is created when
 * the application is launched. Once login is complete we then create the main view.
 */
Ext.define('Ticket.controller.Root', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ticket.view.login.Login',
        'Ticket.view.main.Main',
        'Ticket.LoginManager'
    ],
    
    loadingText: 'Loading...',
    
    onLaunch: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Not Supported', 'This example is not supported on Internet Explorer 8. Please use a different browser.');
            return;
        }
        var session = this.session = new Ext.data.Session();
        
        this.login = new Ticket.view.login.Login({
            session: session,
            autoShow: true,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });
    },

    /**
     * Called when the login controller fires the "login" event.
     *
     * @param loginController
     * @param user
     * @param organization
     * @param loginManager
     */
    onLogin: function (loginController, user, organization, loginManager) {
        this.login.destroy();

        this.loginManager = loginManager;
        this.organization = organization;
        this.user = user;
        
        this.showUI();
    },
    
    showUI: function() {
        this.viewport = new Ticket.view.main.Main({
            session: this.session,
            viewModel: {
                data: {
                    currentOrg: this.organization,
                    currentUser: this.user
                }
            }
        });
    },
    
    getSession: function() {
        return this.session;
    }
});
