/**
 * This class manages the User view.
 */
Ext.define('Ticket.view.user.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user', // enable "controller: 'user'" in the User view
    
    onGroupsClick: function() {
        var groups = new Ticket.view.user.Group();
        groups.show();
    }
});
