Ext.define('ExecDashboard.view.companynews.News', {
    extend: 'Ext.grid.Panel',
    xtype: 'news',
    itemId: 'news',
    cls: 'company-news-grid',

    requires: [
        'Ext.grid.plugin.RowExpander'
    ],

    config: {
        activeState: null,
        defaultActiveState: 'all'
    },

    controller: 'news',

    viewModel: {
        type: 'news'
    },

    hideHeaders: true,

    bind: '{news}',

    tbar: [{
        text: 'All Posts',
        xtype: 'cycle',
        reference: 'filterButton',
        showText: true,
        width: 150,
        textAlign: 'left',

        listeners: {
            change: 'onNewsClick'
        },

        menu: {
            id: 'news-menu',
            items: [{
                text: 'All Posts',
                type: 'all',
                itemId: 'all',
                checked: true
            },{
                text: 'News',
                type: 'news',
                itemId: 'news'
            },{
                text: 'Forum',
                type: 'forum',
                itemId: 'forum'
            }]
        }
    }],

    columns: [{
        dataIndex: 'title',
        flex: 1,
        renderer: 'renderTitleColumn'
    }],

    viewConfig: {
        listeners: {
            itemclick: 'onCompanyClick',
            expandbody: 'onCompanyExpandBody',
            collapsebody: 'onCompanyCollapseBody'
        }
    },

    plugins: [{
        ptype: 'ux-rowexpander',
        pluginId: 'rowexpander'
    }],

    // This XTemplate is used by the controller to format the title column.
    titleTpl:
        '<div class="text-wrapper">' +
            '<div class="news-icon {type}">&nbsp;</div>' +
            '<div class="news-data">' +
                '<div class="news-picture"><img src="resources/icons/{image}"></div>' +
                '<div class="news-content">' +
                    '<div class="news-title">{title}</div>' +
                    '<div class="news-small">by <span class="news-author">{author}</span>' +
                    '<img src="resources/icons/cal-icon.png"/>{date}' +
                    '<img src="resources/icons/clock-icon.png"/>{time}</div>' +
                    '<div class="news-paragraph news-paragraph-simple" {expanded}>{paragraph:ellipsis(130, true)}</div>' +
                    '<div class="news-toggle expand" {expanded}><span>EXPAND</span>' +
                    '<img src="resources/icons/expand-news.png"></div>' +
                '</div>' +
            '</div>' +
        '<div>',

    validStates: {
        all: 1,
        news: 1,
        forum: 1
    },

    isValidState: function (state) {
        return state in this.validStates;
    }
});
