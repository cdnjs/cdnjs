Ext.define('Ext.aria.form.field.Time', {
    override: 'Ext.form.field.Time',
    
    requires: [
        'Ext.aria.form.field.ComboBox'
    ],
    
    // The default format for the time field is 'g:i A',
    // which is hardly informative
    formatText: 'Expected time format HH:MM AM or PM'
});
