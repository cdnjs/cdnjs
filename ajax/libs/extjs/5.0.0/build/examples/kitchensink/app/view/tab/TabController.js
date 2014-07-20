Ext.define('KitchenSink.view.tab.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tab-view',

    onTabChange: function(tabs, newTab, oldTab) {
        Ext.suspendLayouts();
        newTab.setTitle('Active Tab');
        oldTab.setTitle('Inactive Tab');
        Ext.resumeLayouts(true);
    }
});