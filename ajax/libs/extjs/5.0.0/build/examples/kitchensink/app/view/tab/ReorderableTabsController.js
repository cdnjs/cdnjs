Ext.define('KitchenSink.view.tab.ReorderableTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reorderable-tabs',

    counter: 4,

    onAddTabClick: function() {
        var tabPanel = this.getView(),
            counter = ++this.counter,
            html = counter % 2 ? KitchenSink.DummyText.longText :
                KitchenSink.DummyText.extraLongText,
            tab = tabPanel.add({
                title: 'Tab ' + counter,
                html: html
            });

        tabPanel.setActiveTab(tab);
    }
});
