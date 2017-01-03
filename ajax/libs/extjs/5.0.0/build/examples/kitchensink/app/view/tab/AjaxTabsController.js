Ext.define('KitchenSink.view.tab.AjaxTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ajax-tabs',

    onTabChange: function(tabPanel, newItem, oldItem) {
        if (!newItem.html && newItem.loader) {
            newItem.loader.load();
        }
    }
});
