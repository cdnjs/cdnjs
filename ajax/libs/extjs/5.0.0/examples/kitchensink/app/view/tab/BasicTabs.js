/**
 * Demonstrates a default configuration of a tab panel.
 */
Ext.define('KitchenSink.view.tab.BasicTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'basic-tabs',
    controller: 'tab-view',
    
    //<example>
    requires: [
        'KitchenSink.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/tab/TabController.js'
    }],
    exampleTitle: 'Basic Tabs',
    //</example>
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    items: [{
        title: 'Active Tab',
        html: KitchenSink.DummyText.longText
    }, {
        title: 'Inactive Tab',
        html: KitchenSink.DummyText.extraLongText
    }, {
        title: 'Disabled Tab',
        disabled: true
    }],

    listeners: {
        scope: 'controller',
        tabchange: 'onTabChange'
    }
});