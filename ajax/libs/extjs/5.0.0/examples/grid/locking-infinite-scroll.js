Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);

Ext.onReady(function(){
    Ext.define('ForumThread', {
        extend: 'Ext.data.Model',
        fields: [
            'title', 'forumtitle', 'forumid', 'username', {
                name: 'replycount', 
                type: 'int'
            }, {
                name: 'lastpost', 
                mapping: 'lastpost', 
                type: 'date', 
                dateFormat: 'timestamp'
            },
            'lastposter', 'excerpt', 'threadid'
        ],
        idProperty: 'threadid'
    });

    // create the Data Store
    var store = Ext.create('Ext.data.BufferedStore', {
        id: 'store',
        model: 'ForumThread',
        remoteSort: true,
        pageSize: 100,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: 'http://www.sencha.com/forum/remote_topics/index.php',
            reader: {
                rootProperty: 'topics',
                totalProperty: 'totalCount'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        sorters: [{
            property: 'lastpost',
            direction: 'DESC'
        }],
        autoLoad: true
    });

    function renderTopic(value, p, record) {
        return Ext.String.format(
            '<a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a>',
            value,
            record.data.forumtitle,
            record.getId(),
            record.data.forumid
        );
    }

    var grid = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 500,
        collapsible: true,
        title: 'ExtJS.com - Browse Forums',
        store: store,
        loadMask: true,
        selModel: {
            pruneRemoved: false
        },
        multiSelect: true,
        viewConfig: {
            trackOver: false
        },
        // grid columns
        columns:[{
            xtype: 'rownumberer',
            width: 50,
            sortable: false,
            locked: true,
            lockable: false
        },{
            tdCls: 'x-grid-cell-topic',
            text: "Topic",
            dataIndex: 'title',
            flex: 1,
            renderer: renderTopic,
            sortable: false
        },{
            text: "Author",
            dataIndex: 'username',
            width: 100,
            hidden: true,
            sortable: true
        },{
            text: "Replies",
            dataIndex: 'replycount',
            align: 'center',
            width: 70,
            sortable: false
        },{
            id: 'last',
            text: "Last Post",
            dataIndex: 'lastpost',
            width: 130,
            renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A'),
            sortable: true
        }],
        renderTo: Ext.getBody()
    });
});