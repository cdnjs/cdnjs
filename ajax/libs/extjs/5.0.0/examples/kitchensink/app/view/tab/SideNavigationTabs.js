/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KitchenSink.view.tab.SideNavigationTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'side-navigation-tabs',

    //<example>
    exampleTitle: 'Side Navigation Tabs',
    otherContent: [{
        type: 'Styles',
        path: 'sass/src/view/tab/NavigationTabs.scss'
    }],
    //</example>

    height: 400,
    width: 600,

    ui: 'navigation',
    tabPosition: 'left',
    tabRotation: 0,
    tabBar: {
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
        border: false
    },

    defaults: {
        textAlign: 'left',
        bodyPadding: 15
    },

    items: [{
        title: 'Home',
        glyph: 72,
        html: KitchenSink.DummyText.longText
    }, {
        title: 'Users',
        glyph: 117,
        html: KitchenSink.DummyText.extraLongText
    }, {
        title: 'Groups',
        glyph: 85,
        html: KitchenSink.DummyText.longText
    }, {
        title: 'Settings',
        glyph: 42,
        html: KitchenSink.DummyText.extraLongText
    }]
});