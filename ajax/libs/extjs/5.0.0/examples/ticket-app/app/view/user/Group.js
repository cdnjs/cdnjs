Ext.define('Ticket.view.user.Group', {
    extend: 'Ext.window.Window',
    
    controller: 'user-group',
    viewModel: {
        type: 'user-group'
    },
    
    width: 450,
    minHeight: 250,
    height: 350,

    bodyPadding: 10,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    title: 'Edit Groups',
    modal: true,

    items: [{
        xtype: 'grid',
        bind: '{currentOrg.groups}',
        reference: 'groupGrid',

        title: 'Groups',
        margin: '0 5 0 0',
        flex: 1,

        hideHeaders: true,
        columns: [{
            dataIndex: 'name',
            flex: 1
        }]
    }, {
        xtype: 'multiselector',
        bind: {
            store: '{groupGrid.selection.users}',
            title: 'Users - {groupGrid.selection.name}'
        },

        title: 'Users',
        margin: '0 0 0 5',
        flex: 1,

        search: {
            store: {
                model: 'User'
            }
        }
    }],

    buttons: [{
        text: 'New Group',
        listeners: {
            click: 'onAddGroup'
        }
    },'->',{
        text: 'Close',
        listeners: {
            click: 'closeView'
        }
    }]
});
