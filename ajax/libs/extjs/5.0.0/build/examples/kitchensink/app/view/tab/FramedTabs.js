/**
 * Demonstrates a tab panel with framing.
 */
Ext.define('KitchenSink.view.tab.FramedTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    controller: 'tab-view',
    
    //<example>
    requires: [
        'KitchenSink.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/tab/TabController.js'
    }],
    exampleTitle: 'Framed Tabs',
    //</example>
    
    frame: true,
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