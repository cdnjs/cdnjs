Ext.define('Ext.aria.menu.Menu', {
    override: 'Ext.menu.Menu',
    
    // Menu is a Panel, but it's not obliged to have a title
    // so skip both checks
    ariaSkipContainerTitleCheck: true,
    ariaSkipPanelTitleCheck: true
});
