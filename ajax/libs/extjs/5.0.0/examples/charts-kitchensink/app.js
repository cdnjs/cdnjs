/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'ChartsKitchenSink',

    autoCreateViewport: true,
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to ChartsKitchenSink.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'Ext.grid.Panel',
        'ChartsKitchenSink.view.*',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'Ext.data.JsonStore'
    ],

    controllers: [
        'Main'
    ],

    init: function() {
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));       
    }
});
