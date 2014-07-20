/**
 * This class holds the details of a single Ticket.
 */
Ext.define('Ticket.model.Ticket', {
    extend: 'Ticket.model.Base',
    
    requires: [
        'Ticket.override.data.field.Date'
    ],
    
    statics: {
        getStatusName: function(status) {
            return this.prototype.statusNames[status];
        }
    },

    fields: [
        // 'title', // undeclared on purpose
        // 'description', // undeclared on purpose
        'status',
        { name: 'projectId', reference: 'Project' },
        { name: 'creatorId', reference: 'User' },
        { name: 'assigneeId', reference: 'User' },
        { name: 'created', type: 'date' },
        { name: 'modified', type: 'date' },
        { name: 'modifiedById', reference: 'User' }, {
            name: 'statusName',
            depends: 'status',
            convert: function(val, rec) {
                return this.owner.getStatusName(rec.get('status'));
            }
        }
    ],
    
    statusNames: {
        1: 'Pending',
        2: 'Open',
        3: 'Closed'
    }
});
