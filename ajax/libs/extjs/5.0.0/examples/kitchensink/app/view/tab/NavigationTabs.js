/**
 * This example shows how to give your tab bar a custom look and feel typical of
 * app navigation.
 */
Ext.define('KitchenSink.view.tab.NavigationTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'navigation-tabs',

    //<example>
    exampleTitle: 'Navigation Tabs',
    otherContent: [{
        type: 'Styles',
        path: 'sass/src/view/tab/NavigationTabs.scss'
    }],
    //</example>

    height: 400,
    width: 600,


    ui: 'navigation',
    tabBar: {
        layout: {
            pack: 'center'
        },
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
        border: false
    },

    defaults: {
        iconAlign: 'top',
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