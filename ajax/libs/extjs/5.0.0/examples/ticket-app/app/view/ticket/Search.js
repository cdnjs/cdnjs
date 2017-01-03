/**
 * This view is the ticket search grid. It is created one instance per project and added
 * as a tab.
 */
Ext.define('Ticket.view.ticket.Search', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ticketsearch',
    
    requires: [
        'Ticket.view.ticket.SearchController',
        'Ticket.view.ticket.SearchModel',
        'Ext.form.field.ComboBox',
        'Ticket.override.grid.column.Date'
    ],

    // Connects to our View Controller (Ticket.view.ticket.SearchController) and View Model
    // (Ticket.view.ticket.SearchModel).
    controller: 'ticketsearch',
    viewModel: {
        type: 'ticketsearch'
    },

    bind: {
        title: 'Search - {theProject.name}',
        store: '{tickets}'
    },
    
    tbar: [{
        xtype: 'combobox',
        fieldLabel: 'User',
        forceSelection: true,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        autoLoadOnValue: true,

        // Giving this component a "reference" gives it a name for us in our View Controller
        // and View Model. In this case, we need the selection ("value") of this field to
        // control the filter of the grid's store. That is handled in the View Model's
        // "stores" declaration. Normally fields bind their value and don't also publish
        // it to the View Model so we have to instruct it to do so via "publishes".
        reference: 'assigneeField',
        publishes: ['value'],

        bind: {
            store: '{theProject.users}',
            value: '{defaultUser}'  // this is a formula in our ViewModel so just oneway
        }
    }, {
        xtype: 'combobox',
        fieldLabel: 'Status',
        forceSelection: true,
        editable: false,
        displayField: 'name',
        valueField: 'id',

        // This field's selection ("value") is also needed in the grid's store filter.
        reference: 'statusField',
        publishes: ['value'],

        bind: {
            store: '{statuses}',
            value: '{defaultStatus}' // this is data in our ViewModel so twoway
        }
    }, {
        text: 'Refresh',
        handler: 'onRefreshClick'
    }],
    
    columns: [{
        text: 'ID',
        dataIndex: 'id'
    }, {
        text: 'Title',
        dataIndex: 'title',
        flex: 1
    }, {
        text: 'Status',
        dataIndex: 'status',
        renderer: 'renderStatus'
    }, {
        text: 'Assignee',
        renderer: 'renderAssignee'
    }, {
        text: 'Creator',
        renderer: 'renderCreator'
    }, {
        xtype: 'datecolumn',
        text: 'Created',
        dataIndex: 'created'
    }, {
        xtype: 'datecolumn',
        text: 'Modified',
        dataIndex: 'modified'
    }, {
        xtype: 'actioncolumn',
        width: 20,
        handler: 'onTicketClick',
        items: [{
            tooltip: 'View ticket',
            iconCls: 'ticket'
        }]
    }]
});
