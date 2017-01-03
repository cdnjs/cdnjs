Ext.define('Ticket.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',
    
    formulas: {
        theProject: function(get) {
            return get('projects.selection');
        },
        projectId: function(get) {
            return get('theProject.id');
        },
        hasProject: function(get) {
            return !!get('theProject');
        }
    },
    
    stores: {
        ticketStatusSummary: {
            fields: ['id', 'g1', 'name'],
            data: [
                { id: 1, g1: 2, name: 'Item-1' },
                { id: 2, g1: 1, name: 'Item-2' },
                { id: 3, g1: 3, name: 'Item-3' },
                { id: 4, g1: 5, name: 'Item-4' },
                { id: 5, g1: 8, name: 'Item-5' }
            ]
        },
        // TODO: fix store binding for charts
        xticketStatusSummary: {
            model: 'TicketStatusSummary',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'projectId',
                value: '{projectId}'    
            }]
        },
        ticketOpenSummary: {
            fields: ['total', 'date'],
            data: (function() {
                var data = [],
                    eDate = Ext.Date,
                    start = eDate.subtract(new Date(), eDate.DAY, 20),
                    i;
                    
                for (i = 0; i < 20; ++i) {
                    data.push({
                        total: Ext.Number.randomInt(5, 10),
                        date: start
                    });
                    start = eDate.add(start, eDate.DAY, 1);
                }
                
                return data;
            })()
        },
        // TODO: fix store binding for charts
        xticketOpenSummary: {
            model: 'TicketOpenSummary',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'projectId',
                value: '{projectId}'    
            }]
        },
        myActiveTickets: {
            model: 'Ticket',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'assigneeId',
                value: '{currentUser.id}'
            }, {
                property: 'projectId',
                value: '{projectId}'
            }, {
                property: 'status',
                value: 2
            }]
        },
        sortedUsers: {
            source: '{projects.selection.users}',
            sorters: [{
                property: 'name',
                direction: 'DESC'
            }]
        }
    }
});
