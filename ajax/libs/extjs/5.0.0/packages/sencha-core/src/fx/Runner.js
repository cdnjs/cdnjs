/**
 * @class Ext.fx.Runner
 * @private
 */
Ext.define('Ext.fx.Runner', {
    requires: [
        'Ext.fx.runner.CssTransition'
//        'Ext.fx.runner.CssAnimation'
    ],

    constructor: function() {
        return new Ext.fx.runner.CssTransition();
    }
});
