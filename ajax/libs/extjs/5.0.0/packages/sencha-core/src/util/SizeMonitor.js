/**
 *
 */
Ext.define('Ext.util.SizeMonitor', {
    requires: [
        'Ext.util.sizemonitor.Default',
        'Ext.util.sizemonitor.Scroll',
        'Ext.util.sizemonitor.OverflowChange'
    ],

    constructor: function(config) {
        var namespace = Ext.util.sizemonitor;

        if (Ext.browser.is.Firefox) {
            return new namespace.OverflowChange(config);
        }
        else if (Ext.browser.is.WebKit) {
            if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535')) {
                return new namespace.OverflowChange(config);
            }
            else {
                return new namespace.Scroll(config);
            }
        }
        else if (Ext.browser.is.IE11) {
            return new namespace.Scroll(config);
        }
        else {
            return new namespace.Default(config);
        }
    }
});
