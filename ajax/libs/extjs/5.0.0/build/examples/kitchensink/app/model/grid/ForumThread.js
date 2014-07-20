Ext.define('KitchenSink.model.grid.ForumThread', {
    extend: 'KitchenSink.model.Base',
    fields: [
        'title', 'forumtitle', 'forumid', 'username',
        {name: 'replycount', type: 'int'},
        {name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp'},
        'lastposter', 'excerpt', 'threadid'
    ],
    idProperty: 'threadid',
    proxy: {
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        type: 'jsonp',
        url: 'http://www.sencha.com/forum/topics-browse-remote.php',
        reader: {
            rootProperty: 'topics',
            totalProperty: 'totalCount'
        },
        // sends single sort as multi parameter
        simpleSortMode: true
    }
});
