/**
 * Demonstrates a tab panel with icons in the tab buttons.
 */
Ext.define('KitchenSink.view.tab.IconTabs', {
    extend: 'Ext.container.Container',
    xtype: 'icon-tabs',
    controller: 'tab-view',
    width: 400,
    
    //<example>
    requires: [
        'KitchenSink.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/tab/TabController.js'
    }],
    exampleTitle: 'Icon Tabs',
    //</example>

    defaults: {
        xtype: 'tabpanel',
        width: 400,
        height: 200,
        defaults: {
            bodyPadding: 10,
            autoScroll: true
        }
    },
    
    items: [{
        margin: '0 0 20 0',
        items: [{
            glyph: 72,
            html: KitchenSink.DummyText.longText
        }, {
            glyph: 99,
            html: KitchenSink.DummyText.extraLongText
        }, {
            glyph: 42,
            disabled: true
        }]
    }, {
        plain: true,
        items: [{
            title: 'Active Tab',
            glyph: 72,
            html: KitchenSink.DummyText.longText
        }, {
            title: 'Inactive Tab',
            glyph: 99,
            html: KitchenSink.DummyText.extraLongText
        }, {
            title: 'Disabled Tab',
            glyph: 42,
            disabled: true
        }],
        listeners: {
            tabchange: 'onTabChange'
        }
    }]
});
