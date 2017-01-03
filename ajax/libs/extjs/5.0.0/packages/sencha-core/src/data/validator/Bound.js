/**
 * @abstract
 * A superclass for a validator that checks if a value is within a certain range.
 */
Ext.define('Ext.data.validator.Bound', {
    extend: 'Ext.data.validator.Validator',
    alias: 'data.validator.bound',
    
    type: 'bound',
    
    config: {
        /**
         * @cfg {Number} min
         * The minimum length value.
         */
        min: undefined,
        
        /**
         * @cfg {Number} max
         * The maximum length value.
         */
        max: undefined,
        
        /**
         * @cfg {String} emptyMessage
         * The error message to return when the value is empty.
         */
        emptyMessage: 'Must be present',
        
        /**
         * @cfg {String} minOnlyMessage
         * The error message to return when the value is less than the minimum
         * and we only have a minimum specified.
         */
        minOnlyMessage: null,
        
        /**
         * @cfg {String} maxOnlyMessage
         * The error message to return when the value is more than the maximum
         * and we only have a maximum specified.
         */
        maxOnlyMessage: null,
        
        /**
         * @cfg {String} bothMessage
         * The error message to return when the value is not in the specified range
         * and we have both values.
         */
        bothOnlyMessage: null
    },
    
    constructor: function() {
        var me = this;
        
        me.preventConfigure = true;
        me.callParent(arguments);
        delete me.preventConfigure;
        me.configure();
    },
    
    setConfig: function() {
        var me = this;
        
        me.preventConfigure = true;   
        me.callParent(arguments);
        delete me.preventConfigure;
        me.configure();
    },
    
    configure: function() {
        var me = this,
            hasMin, hasMax,
            min, max;
            
        if (me.preventConfigure) {
            return;
        }
            
        min = me.getMin();
        max = me.getMax();
            
        hasMin = me.hasMin = min !== undefined;
        hasMax = me.hasMax = max !== undefined;
        
        if (hasMin && hasMax) {
            me._bothMsg = Ext.String.format(me.getBothMessage(), min, max); 
        } else if (hasMin) {
            me._minMsg = Ext.String.format(me.getMinOnlyMessage(), min);
        } else if (hasMax) {
            me._maxMsg = Ext.String.format(me.getMaxOnlyMessage(), max);
        }     
    },
    
    updateMin: function() {
        this.configure();    
    },
    
    updateMax: function() {
        this.configure();    
    },
    
    updateMinOnlyMessage: function(v) {
        this.configure();    
    },
    
    updateMaxOnlyMessage: function() {
        this.configure();  
    },
    
    updateBothMessage: function() {
        this.configure();  
    },
    
    validate: function(value) {
        var me = this,
            hasMin = me.hasMin,
            hasMax = me.hasMax,
            min = me.getMin(),
            max = me.getMax(),
            msg = true,
            len;
            
        if (value === undefined || value === null) {
            return me.getEmptyMessage();
        }
        
        value = me.getValue(value);
        if (hasMin && hasMax) {
            if (value < min || value > max) {
                msg = me._bothMsg;
            }
        } else if (hasMin) {
            if (value < min) {
                msg = me._minMsg;
            }
        } else if (hasMax) {
            if (value > max) {
                msg = me._maxMsg;
            }    
        }
        
        return msg;
    },
    
    getValue: Ext.identityFn
});
