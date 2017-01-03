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
        lazyFill: false
    });

    var tree = Ext.create('Ext.tree.Panel', {
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
        }],
        tbar: [{
            labelWidth: 130,
            xtype: 'triggerfield',
            fieldLabel: 'Filter on thread title',
            triggerCls: 'x-form-clear-trigger',
            onTriggerClick: function() {
                this.reset();
                store.clearFilter();
                this.focus();
            },
            enableKeyEvents: true,
            listeners: {
                keyup: function() {
                    var field = tree.down('textfield'),
                        v;

                    try {
                        v = new RegExp(field.getValue(), 'i');
                        store.filter({
                            filterFn: function(node) {
                                var children = node.childNodes,
                                    len = children && children.length,

                                    // Visibility of leaf nodes is whether they pass the test.
                                    // Visibility of branch nodes depends on them having visible children.
                                    visible = node.isLeaf() ? v.test(node.get('title')) : false,
                                    i;

                                // We're visible if one of our child nodes is visible.
                                // No loop body here. We are looping only while the visible flag remains false.
                                // Child nodes are filtered before parents, so we can check them here.
                                // As soon as we find a visible child, this branch node must be visible.
                                for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                                return visible;
                            },
                            id: 'titleFilter'
                        });
                    } catch (e) {
                        field.markInvalid('Invalid regular expression');
                    }
                },
                buffer: 250
            }
        }]
    });
});
