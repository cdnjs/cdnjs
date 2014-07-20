Ext.define('KitchenSink.store.form.ForumPosts', {
    extend: 'Ext.data.Store',
    alias: 'store.form-forum-posts',
    storeId: 'form-forum-posts',
    
    model: 'KitchenSink.model.form.ForumPost',
    
    proxy: {
        type: 'jsonp',
        url: 'http://sencha.com/forum/topics-remote.php',
        reader: {
            type: 'json',
            rootProperty: 'topics',
            totalProperty: 'totalCount'
        }
    },
    
    statics: {
        defaultForumId: 4
    },
    
    listeners: {
        beforeload: 'onBeforeLoad',
        scope: 'this'
    },
    
    onBeforeLoad: function() {
        var proxy, params;
        
        proxy = this.getProxy();
        params = proxy.getExtraParams();
        
        if (params.query) {
            proxy.setExtraParam('forumId', undefined);
        }
        else {
            proxy.setExtraParam('forumId', this.self.defaultForumId);
        }
    }
});
