/**
 * This is the View Model associated to the login view.
 */
Ext.define('Ticket.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',

    // Just some data to seed the process. This might be pulled from a cookie or other
    // in a real app.
    data: {
        defaultOrg: 1,
        username: 'Don'
    },

    stores: {
        /**
         * @property {Ext.data.Store} organizations
         * This store definition populates the Organization combobox.
         */
        organizations: {
            model: 'Organization',

            autoLoad: true,

            // Associate this store with the data session (an Ext.data.Session).
            // This ensures the Organization records are cached and distinct going forward.
            isolated: false
        }
    }
});
