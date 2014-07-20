Ext.define('KitchenSink.model.PartTimeEmployee', {
    extend: 'KitchenSink.model.Base',
    fields: [
        {name: 'email',     type: 'string'},
        {name: 'title',     type: 'string'},
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'phone-1',   type: 'string'},
        {name: 'phone-2',   type: 'string'},
        {name: 'phone-3',   type: 'string'},
        {name: 'hours',     type: 'number'},
        {name: 'minutes',   type: 'number'},
        {name: 'startDate', type: 'date'},
        {name: 'endDate',   type: 'date'}
    ]
});