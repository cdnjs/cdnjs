Ext.define('KitchenSink.model.form.ForumPost', {
    extend: 'KitchenSink.model.Base',
    idProperty: 'post_id',
    fields: [
        {name: 'postId', mapping: 'post_id'},
        {name: 'title', mapping: 'topic_title'},
        {name: 'topicId', mapping: 'topic_id'},
        {name: 'author', mapping: 'author'},
        {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
        {name: 'excerpt', mapping: 'post_text'}
    ]
});
