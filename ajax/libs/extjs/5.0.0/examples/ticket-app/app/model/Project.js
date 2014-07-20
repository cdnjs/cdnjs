/**
 * This entity represents a project which is a container for tickets.
 */
Ext.define('Ticket.model.Project', {
    extend: 'Ticket.model.Base',

    fields: [
        'name',
        { name: 'organizationId', reference: 'Organization' }, {
            name: 'leadId',
            unique: true,
            reference: 'User'
        }
    ]
});
