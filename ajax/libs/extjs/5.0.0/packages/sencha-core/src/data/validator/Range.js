/**
 * Validates that the the value is between a {@link #min} and {@link #max}.
 */
Ext.define('Ext.data.validator.Range', {
    extend: 'Ext.data.validator.Bound',
    alias: 'data.validator.range',
    
    type: 'range',
    
    config: {
        /**
         * @cfg {Number} min
         * The minimum value.
         */
        
        /**
         * @cfg {Number} max
         * The maximum value.
         */
        
        /**
         * @cfg {String} minOnlyMessage
         * The error message to return when the value is less than the minimum
         * and we only have a minimum specified.
         */
        minOnlyMessage: 'Must be greater than {0}',
        
        /**
         * @cfg {String} maxOnlyMessage
         * The error message to return when the value is more than the maximum
         * and we only have a maximum specified.
         */
        maxOnlyMessage: 'Must be less than {0}',
        
        /**
         * @cfg {String} bothMessage
         * The error message to return when the value is not in the specified 
         * range and we have both values.
         */
        bothMessage: 'Must be between {0} and {1}'
    }
});
