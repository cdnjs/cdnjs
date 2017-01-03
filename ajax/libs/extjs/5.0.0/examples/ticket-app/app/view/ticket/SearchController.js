Ext.define('Ticket.view.ticket.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ticketsearch',
    
    onTicketClick: function(view, rowIdx, colIdx, item, e, rec) {
        this.fireViewEvent('viewticket', this.getView(), rec);
    },
    
    onRefreshClick: function() {
        this.getView().getStore().load();
    },

    renderAssignee: function(v, meta, rec) {
        return rec.getAssignee().get('name');
    },

    renderCreator: function(v, meta, rec) {
        return rec.getCreator().get('name');
    },

    renderStatus: function(v) {
        return Ticket.model.Ticket.getStatusName(v);
    }
});
