/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 */
Ext.define('ResponsiveApp.view.main.Main', {
    extend: 'Ext.tab.Panel',

    xtype: 'app-main',
    
    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text: 'MyApp',
            flex: 0
        },
        glyph: 61
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        glyph: 72,
        html:
            '<h2>Responsive Design Demo</h2>' +

            '<p>This example demonstrates how to make your app responsive to changes in ' +
            'screen size or orientation.  Applications that run on tablets often need to ' +
            'change the position and/or layout of navigational elements when the orientation ' +
            'changes (when the device is rotated). This application uses a build-in feature ' +
            'in Ext JS called <code>responsiveConfig</code> to make real-time changes to the ' +
            'navigation tab bar as the screen size changes.  We use "wide" to describe a ' +
            'situation where the screen width is larger than its height, and "tall" when the ' +
            'screen\'s height is larger than its width.</p>' +

            '<ul>' +
                '<li>Application header is docked to the left when "wide" and top when "tall."</li>' +
                '<li>Tab icons are left-aligned when "wide" and top-aligned when "tall."</li>' +
                '<li>Tab text is left-aligned when "wide" and centered when "tall."</li>' +
                '<li>Tabs stretch to fit the width of the tab bar when "wide", but have a ' +
                'uniform width of 100px when "tall".</li>' +
            '</ul>' +

            '<p>Try resizing the window in your desktop browser, or rotating your tablet ' +
            'to see it in action!</p>' +

            '<p>For more info on how to use responsiveConfig in your application, see the ' +
            'API Docs for <code>Ext.mixin.Responsive</code> and <code>Ext.plugin.Responsive ' +
            '</code>.</p>'
    }, {
        title: 'Users',
        glyph: 117,
        html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
        title: 'Groups',
        glyph: 85,
        html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
        title: 'Settings',
        glyph: 42,
        html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
});
