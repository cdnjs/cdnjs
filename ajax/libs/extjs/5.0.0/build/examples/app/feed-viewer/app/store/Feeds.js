Ext.define('FV.store.Feeds', {
    extend: 'Ext.data.Store',

    model: 'FV.model.Feed',

    data: [
        {name: 'Sencha Blog',   url: 'http://feeds.feedburner.com/extblog'},
        {name: 'Sencha Forums', url: 'http://sencha.com/forum/external.php?type=RSS2'},
        {name: 'Ajaxian',       url: 'http://feeds.feedburner.com/ajaxian'}
    ]
});
