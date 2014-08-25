/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * The TreePanel provides tree-structured UI representation of tree-structured data.
 * A TreePanel must be bound to a {@link Ext.data.TreeStore}. TreePanel's support
 * multiple columns through the {@link #columns} configuration.
 *
 * Simple TreePanel using inline data:
 *
 *     @example
 *     var store = Ext.create('Ext.data.TreeStore', {
 *         root: {
 *             expanded: true,
 *             children: [
 *                 { text: "detention", leaf: true },
 *                 { text: "homework", expanded: true, children: [
 *                     { text: "book report", leaf: true },
 *                     { text: "algebra", leaf: true}
 *                 ] },
 *                 { text: "buy lottery tickets", leaf: true }
 *             ]
 *         }
 *     });
 *
 *     Ext.create('Ext.tree.Panel', {
 *         title: 'Simple Tree',
 *         width: 200,
 *         height: 150,
 *         store: store,
 *         rootVisible: false,
 *         renderTo: Ext.getBody()
 *     });
 *
 * For the tree node config options (like `text`, `leaf`, `expanded`), see the documentation of
 * {@link Ext.data.NodeInterface NodeInterface} config options.
 */
Ext.define('Ext.tree.Panel', {
    extend: 'Ext.panel.Table',
    alias: 'widget.treepanel',
    alternateClassName: ['Ext.tree.TreePanel', 'Ext.TreePanel'],
    requires: ['Ext.tree.View', 'Ext.selection.TreeModel', 'Ext.tree.Column', 'Ext.data.TreeStore'],
    viewType: 'treeview',
    selType: 'treemodel',

    treeCls: Ext.baseCSSPrefix + 'tree-panel',

    deferRowRender: false,

    /**
     * @cfg {Boolean} rowLines
     * False so that rows are not separated by lines.
     */
    rowLines: false,

    /**
     * @cfg {Boolean} lines
     * False to disable tree lines.
     */
    lines: true,

    /**
     * @cfg {Boolean} useArrows
     * True to use Vista-style arrows in the tree.
     */
    useArrows: false,

    /**
     * @cfg {Boolean} singleExpand
     * True if only 1 node per branch may be expanded.
     */
    singleExpand: false,

    ddConfig: {
        enableDrag: true,
        enableDrop: true
    },

    /**
     * @cfg {Boolean} animate
     * True to enable animated expand/collapse. Defaults to the value of {@link Ext#enableFx}.
     */

    /**
     * @cfg {Boolean} rootVisible
     * False to hide the root node.
     */
    rootVisible: true,

    /**
     * @cfg {String} displayField
     * The field inside the model that will be used as the node's text.
     */
    displayField: 'text',

    /**
     * @cfg {Ext.data.Model/Ext.data.NodeInterface/Object} root
     * Allows you to not specify a store on this TreePanel. This is useful for creating a simple tree with preloaded
     * data without having to specify a TreeStore and Model. A store and model will be created and root will be passed
     * to that store. For example:
     *
     *     Ext.create('Ext.tree.Panel', {
     *         title: 'Simple Tree',
     *         root: {
     *             text: "Root node",
     *             expanded: true,
     *             children: [
     *                 { text: "Child 1", leaf: true },
     *                 { text: "Child 2", leaf: true }
     *             ]
     *         },
     *         renderTo: Ext.getBody()
     *     });
     */
    root: null,

    // Required for the Lockable Mixin. These are the configurations which will be copied to the
    // normal and locked sub tablepanels
    normalCfgCopy: ['displayField', 'root', 'singleExpand', 'useArrows', 'lines', 'rootVisible', 'scroll'],
    lockedCfgCopy: ['displayField', 'root', 'singleExpand', 'useArrows', 'lines', 'rootVisible'],
    
    isTree: true,

    /**
     * @cfg {Boolean} hideHeaders
     * True to hide the headers.
     */

    /**
     * @cfg {Boolean} folderSort
     * True to automatically prepend a leaf sorter to the store.
     */
     
    /**
     * @cfg {Ext.data.TreeStore} store (required)
     * The {@link Ext.data.TreeStore Store} the tree should use as its data source.
     */
    
    arrowCls: Ext.baseCSSPrefix + 'tree-arrows',
    linesCls: Ext.baseCSSPrefix + 'tree-lines',
    noLinesCls: Ext.baseCSSPrefix + 'tree-no-lines',
    autoWidthCls: Ext.baseCSSPrefix + 'autowidth-table',

    constructor: function(config) {
        config = config || {};
        if (config.animate === undefined) {
            config.animate = Ext.isBoolean(this.animate) ? this.animate : Ext.enableFx;
        }
        this.enableAnimations = config.animate;
        delete config.animate;

        this.callParent([config]);
    },

    initComponent: function() {
        var me = this,
            cls = [me.treeCls],
            store = me.store,
            view;

        if (me.useArrows) {
            cls.push(me.arrowCls);
            me.lines = false;
        }

        if (me.lines) {
            cls.push(me.linesCls);
        } else if (!me.useArrows) {
            cls.push(me.noLinesCls);
        }

        if (Ext.isString(store)) {
            store = me.store = Ext.StoreMgr.lookup(store);
        } else if (!store || Ext.isObject(store) && !store.isStore) {
            store = me.store = new Ext.data.TreeStore(Ext.apply({
                root: me.root,
                fields: me.fields,
                model: me.model,
                folderSort: me.folderSort
            }, store));
        } else if (me.root) {
            store = me.store = Ext.data.StoreManager.lookup(store);
            store.setRootNode(me.root);
            if (me.folderSort !== undefined) {
                store.folderSort = me.folderSort;
                store.sort();
            }
        }

        // I'm not sure if we want to this. It might be confusing
        // if (me.initialConfig.rootVisible === undefined && !me.getRootNode()) {
        //     me.rootVisible = false;
        // }

        me.viewConfig = Ext.apply({
            rootVisible: me.rootVisible,
            animate: me.enableAnimations,
            singleExpand: me.singleExpand,
            node: store.getRootNode(),
            hideHeaders: me.hideHeaders
        }, me.viewConfig);

        // If the user specifies the headers collection manually then dont inject our own
        if (!me.columns) {
            if (me.initialConfig.hideHeaders === undefined) {
                me.hideHeaders = true;
            }
            me.addCls(me.autoWidthCls);
            me.columns = [{
                xtype    : 'treecolumn',
                text     : 'Name',
                width    : Ext.isIE6 ? '100%' : 10000, // IE6 needs width:100%
                dataIndex: me.displayField         
            }];
        }

        if (me.cls) {
            cls.push(me.cls);
        }
        me.cls = cls.join(' ');

        me.callParent();

        // TreeModel has to know about the TreeStore so that pruneRemoved can work properly upon removal
        // of nodes.
        me.selModel.treeStore = me.store;

        view = me.getView();

        // Relay events from the TreeView.
        // An injected LockingView relays events from its locked side's View
        me.relayEvents(view, [
            /**
            * @event checkchange
            * Fires when a node with a checkbox's checked property changes
            * @param {Ext.data.NodeInterface} node The node who's checked property was changed
            * @param {Boolean} checked The node's new checked state
            */
            'checkchange',
            /**
            * @event afteritemexpand
            * @inheritdoc Ext.tree.View#afteritemexpand
            */
            'afteritemexpand',
            /**
            * @event afteritemcollapse
            * @inheritdoc Ext.tree.View#afteritemcollapse
            */
            'afteritemcollapse'
        ]);

        // If there has been a LockingView injected, this processing will be performed by the locked TreePanel
        if (!view.isLockingView) {
            // If the root is not visible and there is no rootnode defined, then just lets load the store
            if (!view.rootVisible && !me.getRootNode()) {
                me.setRootNode({
                    expanded: true
                });
            }
        }
    },

    // @private
    // Hook into the TreeStore.
    // Do not callParent in TreePanel's bindStore
    // The TreeStore is only relevant to the tree - the View has its own NodeStore
    bindStore: function(store, initial) {
        var me = this;

        me.store = store;

        // Connect to store. Return a Destroyable object
        me.storeListeners = me.mon(store, {
            destroyable: true,
            load: me.onStoreLoad,
            rootchange: me.onRootChange,
            clear: me.onClear,
            scope: me
        });

        // Relay store events. relayEvents always returns a Destroyable object.
        me.storeRelayers = me.relayEvents(store, [
            /**
             * @event beforeload
             * @inheritdoc Ext.data.TreeStore#beforeload
             */
            'beforeload',

            /**
             * @event load
             * @inheritdoc Ext.data.TreeStore#load
             */
            'load'
        ]);

        // Relay store events with prefix. Return a Destroyable object
        me.storeRelayers1 = me.mon(store, {
            destroyable: true,

            /**
             * @event itemappend
             * @inheritdoc Ext.data.TreeStore#append
             */
            append: me.createRelayer('itemappend'),

            /**
             * @event itemremove
             * @inheritdoc Ext.data.TreeStore#remove
             */
            remove: me.createRelayer('itemremove'),

            /**
             * @event itemmove
             * @inheritdoc Ext.data.TreeStore#move
             */
            move: me.createRelayer('itemmove', [0, 4]),

            /**
             * @event iteminsert
             * @inheritdoc Ext.data.TreeStore#insert
             */
            insert: me.createRelayer('iteminsert'),

            /**
             * @event beforeitemappend
             * @inheritdoc Ext.data.TreeStore#beforeappend
             */
            beforeappend: me.createRelayer('beforeitemappend'),

            /**
             * @event beforeitemremove
             * @inheritdoc Ext.data.TreeStore#beforeremove
             */
            beforeremove: me.createRelayer('beforeitemremove'),

            /**
             * @event beforeitemmove
             * @inheritdoc Ext.data.TreeStore#beforemove
             */
            beforemove: me.createRelayer('beforeitemmove'),

            /**
             * @event beforeiteminsert
             * @inheritdoc Ext.data.TreeStore#beforeinsert
             */
            beforeinsert: me.createRelayer('beforeiteminsert'),

            /**
             * @event itemexpand
             * @inheritdoc Ext.data.TreeStore#expand
             */
            expand: me.createRelayer('itemexpand', [0, 1]),

            /**
             * @event itemcollapse
             * @inheritdoc Ext.data.TreeStore#collapse
             */
            collapse: me.createRelayer('itemcollapse', [0, 1]),

            /**
             * @event beforeitemexpand
             * @inheritdoc Ext.data.TreeStore#beforeexpand
             */
            beforeexpand: me.createRelayer('beforeitemexpand', [0, 1]),

            /**
             * @event beforeitemcollapse
             * @inheritdoc Ext.data.TreeStore#beforecollapse
             */
            beforecollapse: me.createRelayer('beforeitemcollapse', [0, 1])
        });

        // TreeStore must have an upward link to the TreePanel so that nodes can find their owning tree in NodeInterface.getOwnerTree
        store.ownerTree = me;
        
        if (!initial) {
            me.view.setRootNode(me.getRootNode());
        }
    },

    // @private
    // TODO: Decide whether it is possible to reconfigure a TreePanel.
    unbindStore: function() {
        var me = this,
            store = me.store;

        if (store) {
            Ext.destroy(me.storeListeners, me.storeRelayers, me.storeRelayers1);
            delete store.ownerTree;
        }
    },

    onClear: function(){
        this.view.onClear();
    },

    /**
     * Sets root node of this tree.
     * @param {Ext.data.Model/Ext.data.NodeInterface/Object} root
     * @return {Ext.data.NodeInterface} The new root
     */
    setRootNode: function() {
        return this.store.setRootNode.apply(this.store, arguments);
    },

    /**
     * Returns the root node for this tree.
     * @return {Ext.data.NodeInterface}
     */
    getRootNode: function() {
        return this.store.getRootNode();
    },

    onRootChange: function(root) {
        this.view.setRootNode(root);
    },

    /**
     * Retrieve an array of checked records.
     * @return {Ext.data.NodeInterface[]} An array containing the checked records
     */
    getChecked: function() {
        return this.getView().getChecked();
    },

    isItemChecked: function(rec) {
        return rec.get('checked');
    },
    
    /**
     * Expands a record that is loaded in the tree.
     * @param {Ext.data.Model} record The record to expand
     * @param {Boolean} [deep] True to expand nodes all the way down the tree hierarchy.
     * @param {Function} [callback] The function to run after the expand is completed
     * @param {Object} [scope] The scope of the callback function.
     */
    expandNode: function(record, deep, callback, scope) {
        return this.getView().expand(record, deep, callback, scope || this);
    },

    /**
     * Collapses a record that is loaded in the tree.
     * @param {Ext.data.Model} record The record to collapse
     * @param {Boolean} [deep] True to collapse nodes all the way up the tree hierarchy.
     * @param {Function} [callback] The function to run after the collapse is completed
     * @param {Object} [scope] The scope of the callback function.
     */
    collapseNode: function(record, deep, callback, scope) {
        return this.getView().collapse(record, deep, callback, scope || this);
    },

    /**
     * Expand all nodes
     * @param {Function} [callback] A function to execute when the expand finishes.
     * @param {Object} [scope] The scope of the callback function
     */
    expandAll : function(callback, scope) {
        var me = this,
            root = me.getRootNode(),
            animate = me.enableAnimations;
        if (root) {
            if (!animate) {
                Ext.suspendLayouts();
            }
            root.expand(true, callback, scope || me);
            if (!animate) {
                Ext.resumeLayouts(true);
            }
        }
    },

    /**
     * Collapse all nodes
     * @param {Function} [callback] A function to execute when the collapse finishes.
     * @param {Object} [scope] The scope of the callback function
     */
    collapseAll : function(callback, scope) {
        var me = this,
            root = me.getRootNode(),
            animate = me.enableAnimations,
            view = me.getView();

        if (root) {
            if (!animate) {
                Ext.suspendLayouts();
            }
            scope = scope || me;
            if (view.rootVisible) {
                root.collapse(true, callback, scope);
            } else {
                root.collapseChildren(true, callback, scope);
            }
            if (!animate) {
                Ext.resumeLayouts(true);
            }
        }
    },

    /**
     * Expand the tree to the path of a particular node.
     * @param {String} path The path to expand. The path should include a leading separator.
     * @param {String} [field] The field to get the data from. Defaults to the model idProperty.
     * @param {String} [separator='/'] A separator to use.
     * @param {Function} [callback] A function to execute when the expand finishes. The callback will be called with
     * (success, lastNode) where success is if the expand was successful and lastNode is the last node that was expanded.
     * @param {Object} [scope] The scope of the callback function
     */
    expandPath: function(path, field, separator, callback, scope) {
        var me = this,
            current = me.getRootNode(),
            index = 1,
            view = me.getView(),
            keys,
            expander;

        field = field || me.getRootNode().idProperty;
        separator = separator || '/';

        if (Ext.isEmpty(path)) {
            Ext.callback(callback, scope || me, [false, null]);
            return;
        }

        keys = path.split(separator);
        if (current.get(field) != keys[1]) {
            // invalid root
            Ext.callback(callback, scope || me, [false, current]);
            return;
        }

        expander = function(){
            if (++index === keys.length) {
                Ext.callback(callback, scope || me, [true, current]);
                return;
            }
            var node = current.findChild(field, keys[index]);
            if (!node) {
                Ext.callback(callback, scope || me, [false, current]);
                return;
            }
            current = node;
            current.expand(false, expander);
        };
        current.expand(false, expander);
    },

    /**
     * Expand the tree to the path of a particular node, then select it.
     * @param {String} path The path to select. The path should include a leading separator.
     * @param {String} [field] The field to get the data from. Defaults to the model idProperty.
     * @param {String} [separator='/'] A separator to use.
     * @param {Function} [callback] A function to execute when the select finishes. The callback will be called with
     * (bSuccess, oLastNode) where bSuccess is if the select was successful and oLastNode is the last node that was expanded.
     * @param {Object} [scope] The scope of the callback function
     */
    selectPath: function(path, field, separator, callback, scope) {
        var me = this,
            root,
            keys,
            last;

        field = field || me.getRootNode().idProperty;
        separator = separator || '/';

        keys = path.split(separator);
        last = keys.pop();
        if (keys.length > 1) {
            me.expandPath(keys.join(separator), field, separator, function(success, node){
                var lastNode = node;
                if (success && node) {
                    node = node.findChild(field, last);
                    if (node) {
                        me.getSelectionModel().select(node);
                        Ext.callback(callback, scope || me, [true, node]);
                        return;
                    }
                }
                Ext.callback(callback, scope || me, [false, lastNode]);
            }, me);
        } else {
            root = me.getRootNode();
            if (root.getId() === last) {
                me.getSelectionModel().select(root);
                Ext.callback(callback, scope || me, [true, root]);
            } else {
                Ext.callback(callback, scope || me, [false, null]);
            }
        }
    }
});
