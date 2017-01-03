/**
 * An explorer component for navigating hierarchical content.  Consists of a breadcrumb bar
 * at the top, tree navigation on the left, and a center panel which displays the contents
 * of a given node.
 */
Ext.define('Ext.ux.Explorer', {
    extend: 'Ext.panel.Panel',
    xtype: 'explorer',
    requires: [
        'Ext.layout.container.Border',
        'Ext.toolbar.Breadcrumb',
        'Ext.tree.Panel'
    ],

    config: {
        /**
         * @cfg {Object} breadcrumb
         * Configuration object for the breadcrumb toolbar
         */
        breadcrumb: {
            dock: 'top',
            xtype: 'breadcrumb',
            reference: 'breadcrumb'
        },

        /**
         * @cfg {Object} contentView
         * Configuration object for the "content" data view
         */
        contentView: {
            xtype: 'dataview',
            reference: 'contentView',
            region: 'center',
            cls: Ext.baseCSSPrefix + 'explorer-view',
            itemSelector: '.' + Ext.baseCSSPrefix + 'explorer-item',
            tpl:
                '<tpl for=".">' +
                    '<div class="' + Ext.baseCSSPrefix + 'explorer-item">' +
                        '<div class="{iconCls}">' +
                            '<div class="' + Ext.baseCSSPrefix + 'explorer-node-icon' +
                                '{[values.leaf ? " ' + Ext.baseCSSPrefix + 'explorer-leaf-icon' + '" : ""]}' + '">' +
                            '</div>' +
                            '<div class="' + Ext.baseCSSPrefix + 'explorer-item-text">{text}</div>' +
                        '</div>' +
                    '</div>' +
                '</tpl>'
        },

        /**
         * @cfg {Ext.data.TreeStore} store
         * The TreeStore to use as the data source
         */
        store: null,

        /**
         * @cfg {Object} tree
         * Configuration object for the tree
         */
        tree: {
            xtype: 'treepanel',
            reference: 'tree',
            region: 'west',
            width: 200
        }
    },

    renderConfig: {
        /**
         * @cfg {Ext.data.TreeModel} selection
         * The selected node
         */
        selection: null
    },

    layout: 'border',
    referenceHolder: true,
    defaultListenerScope: true,
    cls: Ext.baseCSSPrefix + 'explorer',

    initComponent: function() {
        var me = this,
            store = me.getStore();

        //<debug>
        if (!store) {
            Ext.Error.raise('Ext.ux.Explorer requires a store.');
        }
        //</debug>

        me.dockedItems = [ me.getBreadcrumb() ];

        me.items = [ me.getTree(), me.getContentView() ];

        me.callParent();
    },

    applyBreadcrumb: function(breadcrumb) {
        var store = this.getStore();

        breadcrumb = Ext.create(Ext.apply({
            store: store,
            selection: store.getRoot()
        }, breadcrumb));

        breadcrumb.on('selectionchange', '_onBreadcrumbSelectionChange', this);

        return breadcrumb;
    },

    applyContentView: function(contentView) {
        /**
         * @property {Ext.data.Store} contentStore
         * @private
         * The backing store for the content view
         */
        var contentStore = this.contentStore = new Ext.data.Store({
            model: this.getStore().model
        });

        contentView = Ext.create(Ext.apply({
            store: contentStore
        }, contentView));

        return contentView;
    },

    applyTree: function(tree) {
        tree = Ext.create(Ext.apply({
            store: this.getStore()
        }, tree));

        tree.on('selectionchange', '_onTreeSelectionChange', this);

        return tree;
    },

    updateSelection: function(node) {
        var me = this,
            refs = me.getReferences(),
            breadcrumb = refs.breadcrumb,
            tree = refs.tree,
            treeSelectionModel = tree.getSelectionModel(),
            contentStore = me.contentStore,
            parentNode, treeView;

        if (breadcrumb.getSelection() !== node) {
            breadcrumb.setSelection(node);
        }

        if (treeSelectionModel.getSelection()[0] !== node) {
            treeSelectionModel.select([node]);
            parentNode = node.parentNode;
            if (parentNode) {
                parentNode.expand();
            }
            treeView = tree.getView();
            treeView.scrollRowIntoView(treeView.getRow(node));
        }

        contentStore.removeAll();
        contentStore.add(node.hasChildNodes() ? node.childNodes : [node]);
    },

    updateStore: function(store) {
        this.getBreadcrumb().setStore(store);
    },

    privates: {
        /**
         * Handles the tree's selectionchange event
         * @private
         * @param {Ext.tree.Panel} tree
         * @param {Ext.data.TreeModel[]} selection
         */
        _onTreeSelectionChange: function(tree, selection) {
            this.setSelection(selection[0]);
        },

        /**
         * Handles the breadcrumb bar's selectionchange event
         */
        _onBreadcrumbSelectionChange: function(breadcrumb, selection) {
            this.setSelection(selection);
        }
    }
});
