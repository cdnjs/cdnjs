Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tip.*',
    'Ext.tree.*'
]);

Ext.define('Post', {
    extend: 'Ext.data.TreeModel',
    idProperty: 'postid',
    fields: [{
        name: "title",
        convert: undefined
    }, {
        name: "threadid",
        convert: undefined
    }, {
        name: "username",
        convert: undefined
    }, {
        name: "userid",
        convert: undefined
    },  {
        name: "dateline",
        type: 'date',
        dateFormat: 'timestamp'
    }, {
        name: "postid",
        convert: undefined
    }, {
        name: "forumtitle",
        convert: undefined
    }, {
        name: "forumid",
        convert: undefined
    }, {
        name: "replycount",
        type: 'int',
        convert: undefined
    }, {
        name: "lastpost",
        dateFormat: 'timestamp',
        convert: undefined
    }, {
        name: "excerpt",
        convert: undefined
    }]
});

Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();

    function renderTitle(value, p, record) {
        return value ? Ext.String.format(
            '<a href="http://sencha.com/forum/showthread.php?t={1}" target="_blank">{0}</a>',
            value,
            record.data.threadid
        ) : '';
    }

    var store = Ext.create('Ext.data.TreeStore', {
        model: 'Post',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'forum-data.json'
        },
        lazyFill: true
    });

    Ext.create('Ext.tree.Panel', {
        title: 'Forum Folder Summary',
        width: 600,
        height: 400,
        renderTo: Ext.getBody(),
        reserveScrollbar: true,
        collapsible: true,
        loadMask: true,
        useArrows: true,
        rootVisible: false,
        store: store,
        animate: false,
        columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Forum',
            flex: 2.5,
            sortable: true,
            dataIndex: 'forumtitle'
        },{
            text: 'User',
            flex: 1,
            dataIndex: 'username',
            sortable: true
        }, {
            text: 'Title',
            flex: 2,
            dataIndex: 'title',
            renderer: renderTitle
        }]
    });
});
