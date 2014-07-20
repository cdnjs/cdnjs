/**
 * This example shows how filters can be applied to the TreeStore of a Tree. TreeStore
 * filters are added in the same way as other store filters.
 *
 * The filter function is called on child nodes first so that it can use child node state
 * when calculating a parent node\'s filter result.
 *
 * Folder nodes who's child nodes are all filtered out will be hidden.
 *
 * Regular expressions may be used, eg `(tab|tree)panel`
 */
Ext.define('KitchenSink.view.tree.FilteredTree', {
    extend: 'Ext.tree.Panel',

    xtype: 'filtered-tree',

    //<example>
    exampleTitle: 'Filtered TreeGrid.',
    otherContent: [{
        type: 'Store',
        path: 'app/store/Posts.js'
    },{
        type: 'Model',
        path: 'app/model/tree/Post.js'
    },{
        type: 'Data',
        path: 'app/data/Posts.js'
    }],
    //</example>
    store: 'Posts',
    rootVisible: false,
    animate: false,
    frame: true,
    title: 'Filtered Tree',
    width: 650,
    height: 400,
    reserveScrollbar: true,
    useArrows: true,
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
        renderer: function (value, p, record) {
            return value ? Ext.String.format(
                '<a href="http://sencha.com/forum/showthread.php?t={1}" target="_blank">{0}</a>',
                value,
                record.data.threadid
            ) : '';
        }
    }],
    tbar: [{
        labelWidth: 130,
        xtype: 'triggerfield',
        fieldLabel: 'Filter on thread title',
        triggerCls: 'x-form-clear-trigger',
        onTriggerClick: function() {
            var store = this.up('treepanel').store;

            this.reset();
            store.clearFilter();
            this.focus();
        },
        listeners: {
            change: function() {
                var tree = this.up('treepanel'),
                    v,
                    matches = 0;

                try {
                    v = new RegExp(this.getValue(), 'i');
                    tree.store.filter({
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

                            if (visible && node.isLeaf()) {
                                matches++;
                            }
                            return visible;
                        },
                        id: 'titleFilter'
                    });
                    tree.down('#matches').setValue(matches);
                } catch (e) {
                    this.markInvalid('Invalid regular expression');
                }
            },
            buffer: 250
        }
    }, {
        xtype: 'displayfield',
        itemId: 'matches',
        fieldLabel: 'Matches',

        // Use shrinkwrap width for the label
        labelWidth: null,
        listeners: {
            beforerender: function() {
                var me = this,
                    tree = me.up('treepanel'),
                    root = tree.getRootNode(),
                    leafCount = 0;

                tree.store.on('fillcomplete', function(store, node) {
                    if (node === root) {
                        root.visitPostOrder('', function(node) {
                            if (node.isLeaf()) {
                                leafCount++;
                            }
                        });
                        me.setValue(leafCount);
                    }
                });
            },
            single: true
        }
    }]
});
