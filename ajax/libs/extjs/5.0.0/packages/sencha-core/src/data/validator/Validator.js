/**
 * The base class for validators to be used to validate {@link Ext.data.Field fields} in
 * a {@link Ext.data.Model model}.
 * 
 * The model will call the {@link #validate} method, which may be overridden by subclasses.
 */
Ext.define('Ext.data.validator.Validator', {
    mixins: [
        'Ext.mixin.Factoryable'
    ],

    alias: 'data.validator.base',  // also configures Factoryable

    isValidator: true,
    
    /**
     * @property {String} type
     * A string representation of this format.
     */
    type: 'base',
    
    statics: {
        all: {},

        register: function (name, cls) {
            var all = this.all;
            all[name.toUpperCase()] = all[name.toLowerCase()] = all[name] = cls.prototype;
        }
    },

    onClassExtended: function (cls, data) {
        if (data.type) {
            Ext.data.validator.Validator.register(data.type, cls);
        }
    },

    /**
     * Creates new Validator.
     * @param {Object/Function} config A config object. A function may also be passed, 
     * which will be used as the {@link #validate} method for this validator.
     */
    constructor: function(config) {
        if (typeof config === 'function') {
            this.fnOnly = true;
            this.validate = config;
        } else {
            this.initConfig(config);
        }     
    },
    
    /**
     * Validates the passed value.
     * @param {Object} value The value
     * @param {Ext.data.Model} record The record
     * @return {Boolean/String} `true` if the value is valid. A string may be returned if the value 
     * is not valid, to indicate an error message. Any other non `true` value indicates the value
     * is not valid.
     */
    validate: function() {
        return true;
    },
    
    /**
     * Creates a copy of this validator
     * @private
     * @return {Ext.data.validator.Validator} The clone
     */
    clone: function() {
        var me = this;

        if (me.fnOnly) {
            return new Ext.data.validator.Validator(me.validate);
        }

        return new me.self(me.getCurrentConfig());
    }
},
function() {
    this.register(this.prototype.type, this);
});
