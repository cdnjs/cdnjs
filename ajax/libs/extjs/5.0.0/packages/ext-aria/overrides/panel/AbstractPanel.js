Ext.define('Ext.aria.panel.AbstractPanel', {
    override: 'Ext.panel.AbstractPanel',
    
    requires: [
        'Ext.aria.container.Container',
        'Ext.aria.dom.Element',
        'Ext.aria.toolbar.Toolbar'
    ]
});