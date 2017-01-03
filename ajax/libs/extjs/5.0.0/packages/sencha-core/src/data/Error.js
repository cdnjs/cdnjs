/**
 * This class hols the results of a validator for an `Ext.data.Model`. These objects are
 * placed in an `Ext.data.ErrorCollection` and returned by `{@link Ext.data.Model#validate}`.
 *
 * Usually this class does not need to be instantiated directly - instances are instead created
 * automatically when {@link Ext.data.Model#validate validate} on a model instance.
 *
 * @deprecated 5.0 Use `Ext.data.Validation` instead.
 */
Ext.define('Ext.data.Error', {
    isError: true,

    $configPrefixed: false, // compat

    config: {
        /**
         * @cfg {String} field
         * The name of the field this error belongs to.
         */
        field: null,

        /**
         * @cfg {String} message
         * The message containing the description of the error.
         */
        message: ''
    },

    constructor: function(config) {
        this.initConfig(config);
        this.msg = this.message; // compat
    }
});
