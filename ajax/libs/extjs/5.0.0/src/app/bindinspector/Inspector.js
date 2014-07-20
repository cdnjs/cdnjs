Ext.define('Ext.app.bindinspector.Inspector', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.app.bindinspector.Container',
        'Ext.layout.container.Fit',
        'Ext.tip.QuickTipManager'
    ],

    title: 'Bind Inspector',

    layout: 'fit',

    autoShow: true,
    maximized: true,
    maximizable: true,
    width: 960,
    height: 575,

    initComponent: function() {
        var snapshot = (new Ext.app.bindinspector.Environment()).captureSnapshot(),
            env = new Ext.app.bindinspector.Environment();
            
        env.unpackSnapshot(snapshot);

        this.items = {
            xtype: 'bindinspector-container',
            env: env
        };
        this.callParent();
    },

    afterRender: function() {
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();
    }
});
