/**
 * @class Ext.app.domain.View
 */
Ext.define('Ext.app.domain.View', {
    extend: 'Ext.app.EventDomain',
    
    isInstance: true,
    
    constructor: function(controller) {
        this.callParent(arguments);
        this.controller = controller;
        this.monitoredClasses = [Ext.Component];
    },
    
    match: function(target, selector, controller) {
        var out = false;
        if (selector === '#') {
            out = controller === target.getController();
        } else {
            out = target.is(selector);
        }
        return out;
    },
    
    destroy: function() {
        this.controller = null;
        this.callParent();
    }
});
