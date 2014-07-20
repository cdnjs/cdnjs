Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
//    'Ext.state.*',
    'Ext.grid.filters.Filters'
]);


Ext.onReady(function(){

//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

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
        remoteGroup: true,
        leadingBufferZone: 300,
        pageSize: 100,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an Ajax proxy would be better
            type: 'jsonp',
            url: 'http://www.sencha.com/forum/remote_topics/index.php',
            reader: {
                rootProperty: 'topics',
                totalProperty: 'totalCount'
            },
            // sends single sort as multi parameter
            simpleSortMode: true,
            // sends single group as multi parameter
            simpleGroupMode: true,

            // This particular service cannot sort on more than one field, so grouping === sorting.
            groupParam: 'sort',
            groupDirectionParam: 'dir'
        },
        sorters: [{
            property: 'threadid',
            direction: 'ASC'
        }],
        autoLoad: true,
        listeners: {

            // This particular service cannot sort on more than one field, so if grouped, disable sorting
            groupchange: function(store, groupers) {
                var sortable = !store.isGrouped(),
                    headers = grid.headerCt.getVisibleGridColumns(),
                    i, len = headers.length;

                for (i = 0; i < len; i++) {
                    headers[i].sortable = (headers[i].sortable !== undefined) ? headers[i].sortable : sortable;
                }
            },

            // This particular service cannot sort on more than one field, so if grouped, disable sorting
            beforeprefetch: function(store, operation) {
                if (operation.getGrouper()) {
                    operation.setSorters(null);
                }
            }
        }
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
        features: [{
            ftype: 'grouping',
            hideGroupedHeader: false
        }],
        plugins: 'gridfilters',
        columns:[{
            xtype: 'rownumberer',
            width: 50,
            sortable: false
        },{
            tdCls: 'x-grid-cell-topic',
            text: "Topic",
            dataIndex: 'title',
            flex: 1,
            renderer: renderTopic,
            sortable: true,
            groupable: false,
            cellWrap: true,
            filter: true
        },{
            text: "Author",
            dataIndex: 'username',
            width: 100,
            hidden: true,
            sortable: true,
            groupable: false
        },{
            text: "Replies",
            dataIndex: 'replycount',
            align: 'center',
            width: 70,
            sortable: false,
            filter: {
                type: 'numeric'
            }
        },{
            id: 'last',
            text: "Last Post",
            dataIndex: 'lastpost',
            width: 130,
            renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A'),
            sortable: true,
            groupable: false
        }],
        renderTo: Ext.getBody()
    });
});
