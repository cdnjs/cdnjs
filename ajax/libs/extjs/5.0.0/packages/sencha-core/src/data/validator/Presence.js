/**
 * Validates that the passed value is not null or undefined.
 */
Ext.define('Ext.data.validator.Presence', {
    extend: 'Ext.data.validator.Validator',
    alias: 'data.validator.presence',

    type: 'presence',
    
    config: {
        /**
         * @cfg {String} message
         * The error message to return when the value is not specified.
         */
        message: 'Must be present'
    },
    
    validate: function(value) {
        var valid = !(value === undefined || value === null);
        return valid ? true : this.getMessage();
    }
});
