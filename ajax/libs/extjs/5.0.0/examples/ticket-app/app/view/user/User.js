/**
 * This class defines the User editing view.
 */
Ext.define('Ticket.view.user.User', {
    extend: 'Ext.window.Window',
    
    controller: 'user', // links to Ticket.view.user.UserController
    
    width: 300,
    minHeight: 250,
    height: 450,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    // As a Window the default property we are binding is "title":
    bind: 'Edit User: {theUser.name}',

    modal: true,

    tools: [{
        type: 'gear',
        tooltip: 'Edit Groups',

        // Call is routed to our ViewController (Ticket.view.user.UserController):
        callback: 'onGroupsClick'
    }],
    
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        labelWidth: 70,

        // As a textfield the default property we are binding is "value":
        bind: '{theUser.name}'
    }, {
        // The multiselector is basically a grid that displays the currently selected
        // items. To add items there is a Search tool configured below.
        xtype: 'multiselector',
        bind: '{theUser.groups}',

        title: 'Groups',

        flex: 1,
        margin: '10 0',

        // This configures the Search popup. In this case we want to browse all groups.
        search: {
            store: {
                model: 'Group'
            }
        }
    }],

    buttons: [{
        text: 'Groups',
        listeners: {
            // Call is routed to our ViewController (Ticket.view.user.UserController):
            click: 'onGroupsClick'
        }
    }, '->', {
        text: 'Close',
        listeners: {
            // Call is routed to our ViewController (Ticket.view.user.UserController) but
            // the "closeView" method is a helper inherited from Ext.app.ViewController.
            click: 'closeView'
        }
    }]
});
