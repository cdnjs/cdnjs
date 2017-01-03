var shortLorem =
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, '+
    'sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales '+
    'non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet '+
    'tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p>';

/**
 * A sample portal layout application class.
 */
Ext.define('Portal.view.main.Main', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.layout.container.Border',
        'Ext.ux.dashboard.GoogleRssPart',
        'Ext.dashboard.Dashboard'
    ],

    layout: {
        type: 'border'
    },

    controller: 'main',

    items: [{
        id: 'app-header',
        xtype: 'app-header',
        region: 'north'
    },{
        id: 'app-options',
        title: 'Options',
        region: 'west',
        animCollapse: true,
        width: 200,
        minWidth: 150,
        maxWidth: 400,
        split: true,
        collapsible: true,
        layout:{
            type: 'accordion',
            animate: true
        },
        header: {
            itemPosition: 1, // after title before collapse tool
            items: [{
                xtype: 'splitbutton',
                text: 'Add Feed',
                handler: 'onAddFeed',
                menu: [{
                    text: 'Sencha Blog',
                    handler: 'onAddFeedUrl',
                    feedUrl: 'http://feeds.feedburner.com/extblog'
                },{
                    text: 'Ajaxian',
                    handler: 'onAddFeedUrl',
                    feedUrl: 'http://feeds.feedburner.com/ajaxian'
                },{
                    text: 'CNN',
                    handler: 'onAddFeedUrl',
                    feedUrl: 'http://rss.cnn.com/rss/edition.rss'
                },{
                    text: 'Sci/Tech - Google News',
                    handler: 'onAddFeedUrl',
                    feedUrl: 'http://news.google.com/news?ned=us&topic=t&output=rss'
                }, {
                    text: 'Yahoo News',
                    handler: 'onAddFeedUrl',
                    feedUrl: 'http://rss.cnn.com/rss/edition.rss'
                }, {
                    text: 'ESPN Top News',
                    handler: 'onAddFeedUrl',
                    feedUrl: 'http://sports.espn.go.com/espn/rss/news'
                }]
            }]
        },
        items: [{
            html: '<div class="portlet-content">' + shortLorem + '</div>',
            title:'Navigation',
            autoScroll: true,
            border: false,
            glyph: '9798@'
            //iconCls: 'nav'
        },{
            title:'Settings',
            html: '<div class="portlet-content">' + shortLorem + '</div>',
            border: false,
            autoScroll: true,
            iconCls: 'settings'
        }]
    },{
        xtype: 'dashboard',
        reference: 'dashboard',
        region: 'center',
        stateful: false,

        columnWidths: [
            0.35,
            0.40,
            0.25
        ],
        parts: {
            rss: 'google-rss',

            stocks: {
                viewTemplate: {
                    title: 'Markets',
                    items: [{
                        xtype: 'markets'
                    }]
                }
            },

            stockTicker: {
                viewTemplate: {
                    title: 'Stocks',
                    items: [{
                        xtype: 'stocks'
                    }]
                }
            }
        },

        defaultContent: [{
            type: 'rss',
            columnIndex: 0,
            height: 500,
            feedUrl: 'http://feeds.feedburner.com/extblog'
        }, {
            type: 'stockTicker',
            columnIndex: 1,
            height: 300
        }, {
            type: 'stocks',
            columnIndex: 1,
            height: 300
        }, {
            type: 'rss',
            columnIndex: 2,
            height: 350,
            feedUrl: 'http://rss.cnn.com/rss/edition.rss'
        }]
    }]
});
