Ext.define('KitchenSink.model.form.Contact', {
    extend: 'KitchenSink.model.Base',

    fields: [
        {name: 'first', mapping: 'name > first'},
        {name: 'last', mapping: 'name > last'},
        'company', 'email', 'state',
        {name: 'dob', type: 'date', dateFormat: 'm/d/Y'}
    ]
});
