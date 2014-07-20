/**
 * This view is used to present the details of a single Ticket.
 */
Ext.define('Ticket.model.User', {
    extend: 'Ticket.model.Base',

    fields: [
        'name',
        { name: 'organizationId', reference: 'Organization' },
        { name: 'projectId', reference: 'Project' }
    ],

    manyToMany: 'Group'
});
