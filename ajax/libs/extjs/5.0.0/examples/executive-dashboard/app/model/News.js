Ext.define('ExecDashboard.model.News', {
    extend: 'ExecDashboard.model.Base',

    fields: [
        'type',
        { name: 'date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        'time',
        'author',
        'group',
        'image',
        'title',
        'paragraph'
    ]
});
