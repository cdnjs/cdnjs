Ext.define('KitchenSink.store.Posts', {
    extend: 'Ext.data.TreeStore',

    model: 'KitchenSink.model.tree.Post',

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/KitchenSink/Posts'
    },

    lazyFill: false
});
