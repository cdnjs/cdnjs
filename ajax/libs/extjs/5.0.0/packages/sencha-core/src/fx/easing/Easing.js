/**
 * @private
 */
Ext.define('Ext.fx.easing.Easing', {
    requires: ['Ext.fx.easing.Linear'],

    constructor: function(easing) {
        return Ext.factory(easing, Ext.fx.easing.Linear, null, 'easing');
    }
});
