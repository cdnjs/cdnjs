/**
 * This class describes a group of users.
 */
Ext.define('Ticket.model.Group', {
    extend: 'Ticket.model.Base',

    fields: [
        'name',
        { name: 'organizationId', reference: 'Organization' }
    ],

    manyToMany: 'User'
});
