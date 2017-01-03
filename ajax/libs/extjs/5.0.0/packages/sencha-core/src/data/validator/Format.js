/**
 * Validates that the passed value matches a specific format specified by a regex.
 * The format is provided by the {@link #matcher} config.
 */
Ext.define('Ext.data.validator.Format', {
    extend: 'Ext.data.validator.Validator',
    alias: 'data.validator.format',
    
    type: 'format',
    
    config: {
        /**
         * @cfg {String} message
         * The error message to return when the value does not match the format.
         */
        message: 'Is in the wrong format',
    
        /**
         * @cfg {RegExp} matcher (required) The matcher regex to test against the value.
         */
        matcher: undefined
    },
    
    //<debug>
    constructor: function() {
        this.callParent(arguments);
        if (!this.getMatcher()) {
            Ext.Error.raise('validator.Format must be configured with a matcher');
        }
    },
    //</debug>
    
    validate: function(value) {
        var matcher = this.getMatcher(),
            result = matcher && matcher.test(value);

        return result ? result : this.getMessage();
    }
});
