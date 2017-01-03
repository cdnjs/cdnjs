/**
 * Validates that the length of the value is between a {@link #min} and {@link #max}.
 */
Ext.define('Ext.data.validator.Length', {
    extend: 'Ext.data.validator.Bound',
    alias: 'data.validator.length',
    
    type: 'length',
    
    config: {
        /**
         * @cfg {Number} min
         * The minimum length value.
         */
        
        /**
         * @cfg {Number} max
         * The maximum length value.
         */
        
        /**
         * @cfg {String} minOnlyMessage
         * The error message to return when the value is less than the minimum
         * length and we only have a minimum specified.
         */
        minOnlyMessage: 'Length must be greater than {0}',
        
        /**
         * @cfg {String} maxOnlyMessage
         * The error message to return when the value is more than the maximum
         * length and we only have a maximum specified.
         */
        maxOnlyMessage: 'Length must be less than {0}',
        
        /**
         * @cfg {String} bothMessage
         * The error message to return when the value length is not in the specified 
         * range and we have both values.
         */
        bothMessage: 'Length must be between {0} and {1}'
    },
    
    getValue: function(v) {
        return String(v).length;
    }
});
