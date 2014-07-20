Ext.define('Ticket.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ticket.model.*',
        'Ticket.view.dashboard.Dashboard',
        'Ticket.view.ticket.Detail',
        'Ticket.view.ticket.Search',
        'Ticket.view.main.MainController',
        'Ticket.view.main.MainModel',
        'Ext.layout.container.Border'
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'border',
    
    items: [{
        xtype: 'container',
        id: 'app-header',
        region: 'north',
        height: 52,
        layout: {
            type: 'hbox',
            align: 'middle'
        },

        items: [{
            xtype: 'component',
            id: 'app-header-logo',
            listeners: {
                click: 'showBindInspector',
                element: 'el'
            }
        },{
            xtype: 'component',
            cls: 'app-header-text',
            bind: '{currentOrg.name}',
            flex: 1
        },{
            xtype: 'component',
            id: 'app-header-username',
            cls: 'app-header-text',
            bind: '{currentUser.name}',
            listeners: {
                click: 'onClickUserName',
                element: 'el'
            },
            margin: '0 10 0 0'
        }]
    }, {
        region: 'west',
        xtype: 'grid',
        reference: 'projects',
        title: 'Projects',
        width: 250,
        split: true,
        collapsible: true,
        selModel: {
            listeners: {
                selectionchange: 'onProjectSelect'
            }
        },
        bind: {
            store: '{currentOrg.projects}',
            // Bind the project for the current user as the default selection (single).
            selection: {
                bindTo: '{currentUser.project}',
                single: true
            }
        },
        columns: [{
            text: 'Name',
            dataIndex: 'name',
            flex: 1
        }, {
            xtype: 'actioncolumn',
            width: 20,
            handler: 'onProjectSearchClick',
            stopSelection: false,
            items: [{
                tooltip: 'Search tickets',
                iconCls: 'search'
            }]
        }]
    }, {
        xtype: 'tabpanel',
        region: 'center',
        flex: 1,
        reference: 'main',
        items: [{
            xtype: 'app-dashboard',
            title: 'Dashboard',
            listeners: {
                viewticket: 'onViewTicket',
                edituser: 'onEditUser'
            }
        }]
    }]
});
