/**
 * @private
 */
Ext.define('Ext.util.paintmonitor.OverflowChange', {

    extend: 'Ext.util.paintmonitor.Abstract',

    eventName: Ext.browser.is.Firefox ? 'overflow' : 'overflowchanged',

    monitorClass: 'overflowchange',

    onElementPainted: function(e) {
        this.getCallback().apply(this.getScope(), this.getArgs());
    }
});
