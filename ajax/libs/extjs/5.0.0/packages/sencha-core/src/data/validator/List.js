/**
 * A superclass for inclusion/exclusion validators.
 * @private
 */
Ext.define('Ext.data.validator.List', {
    extend: 'Ext.data.validator.Validator',
    alias: 'data.validator.list',
    
    type: 'list',
    
    config: {
        /**
         * @cfg {Array} list (required)
         * The list to check the passed value against.
         */
        list: null
    },
    
    inclusion: null,
    
    validate: function(value) {
        var contains = Ext.Array.contains(this.getList(), value),
            inclusion = this.inclusion,
            exclusion = !inclusion,
            result;
            
        result = (inclusion && contains) || (exclusion && !contains);
        return result || this.getMessage();
    }
});
