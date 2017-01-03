/**
 * Validates that the value exists in a {@link #list} of values.
 */
Ext.define('Ext.data.validator.Inclusion', {
    extend: 'Ext.data.validator.List',
    alias: 'data.validator.inclusion',
    
    type: 'inclusion',
    config: {
        /**
         * @cfg {String} message
         * The error message to return when the passed value does not exist
         * in the specified {@link #list}.
         */
        message: 'Is not in the list of acceptable values'
    },
    
    //<debug>
    constructor: function() {
        this.callParent(arguments);
        if (!this.getList()) {
            Ext.Error.raise('validator.Inclusion requires a list');
        }    
    },
    //</debug>
    
    inclusion: true
});
