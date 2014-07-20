/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.app.Module = function(config){
    Ext.apply(this, config);
    Ext.app.Module.superclass.constructor.call(this);
    this.init();
};

Ext.extend(Ext.app.Module, Ext.util.Observable, {
    init : Ext.emptyFn
});