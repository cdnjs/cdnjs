Ext.define('KitchenSink.model.field.PhoneNumber', {
    extend: 'Ext.data.field.String',

    alias: 'data.field.phonenumber',

    validators: [
        { type: 'format', matcher: /^\d{3}-?\d{3}-?\d{4}$/ }
    ]
});
