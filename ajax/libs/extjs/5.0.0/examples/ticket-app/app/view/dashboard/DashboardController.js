Ext.define('Ticket.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',
    
    onGridEditClick: function(btn) {
        this.fireViewEvent('edituser', this.getView(), btn.getWidgetRecord());
    },
    
    onTicketClick: function(view, rowIdx, colIdx, item, e, rec) {
        this.viewTicket(rec);
    },

    onTicketDblClick: function(view, rec) {
        this.viewTicket(rec);
    },

    viewTicket: function(rec) {
        this.fireViewEvent('viewticket', this.getView(), rec);
    },
    
    onActiveTicketRefreshClick: function() {
        this.lookupReference('activeTickets').getStore().load();
    },

    renderTicketStatus: function(v) {
        return Ticket.model.Ticket.getStatusName(v);
    }
});
