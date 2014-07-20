Ext.define('KitchenSink.store.ForumThreads', {
    extend: 'Ext.data.Store',

    alias: 'store.forumthreads',
    model: 'KitchenSink.model.grid.ForumThread',

    pageSize: 50,
    remoteSort: true,
    sorters: [{
        property: 'lastpost',
        direction: 'DESC'
    }]
});
