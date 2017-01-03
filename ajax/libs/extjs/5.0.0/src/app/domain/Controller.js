/**
 * This class implements the controller event domain. All classes extending from
 * {@link Ext.app.Controller} are included in this domain. The selectors are simply id's or the
 * wildcard "*" to match any controller.
 * 
 * @private
 */
Ext.define('Ext.app.domain.Controller', {
    extend: 'Ext.app.EventDomain',
    singleton: true,

    requires: [
        'Ext.app.Controller'
    ],

    type: 'controller',
    prefix: 'controller.',
    idMatchRe: /^\#/,

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.app.BaseController);
    },
    
    match: function(target, selector) {
        var result = false,
            alias = target.alias;
        
        if (selector === '*') {
            result = true;
        } else if (selector === '#') {
            result = !!target.isApplication;
        } else if (this.idMatchRe.test(selector)) {
            result = target.getId() === selector.substring(1);
        } else if (alias) {
            result = Ext.Array.indexOf(alias, this.prefix + selector) > -1;
        }
        return result;
    }
});
