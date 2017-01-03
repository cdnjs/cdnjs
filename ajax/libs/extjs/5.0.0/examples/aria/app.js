/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Aria',
    
    requires: [
        'Ext.window.Toast'
    ],
    
    controllers: [
        'Wizard'
    ],

    views: [
        'Buttons',
        'DatePicker',
        'Form',
        'Grid',
        'Image',
        'ItemSelector',
        'List',
        'Panel',
        'Toolbar',
        'Viewport',
        'Window'
    ],

    autoCreateViewport: 'Aria.view.Viewport',
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to Aria.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
    msg: function(title, format) {
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        
        Ext.toast(s, title);
    }
});
