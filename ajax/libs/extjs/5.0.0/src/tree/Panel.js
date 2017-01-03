/**
 * The TreePanel provides tree-structured UI representation of tree-structured data.
 * A TreePanel must be bound to a {@link Ext.data.TreeStore}.
 * 
 * TreePanels support multiple columns through the {@link #columns} configuration.
 *
 * By default a TreePanel contains a single column which uses the `text` Field of
 * the store's nodes.
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
 *
 * Unless the TreeStore is configured with a {@link Ext.data.Model model} of your choosing, nodes in the {@link Ext.data.TreeStore} are by default, instances of {@link Ext.data.TreeModel}.
 *
 * # Heterogeneous node types.
 *
 * If the tree needs to use different data model classes at different levels there is much flexibility in how to specify this.
 *
 * ### Configuring the Reader.
 * If you configure the proxy's reader with a {@link Ext.data.reader.Reader#typeProperty typeProperty}, then the server is in control of which data model
 * types are created. A discriminator field is used in the raw data to decide which class to instantiate.
 * **If this is configured, then the data from the server is prioritized over other ways of determining node class**.
 *
 *     @example
 *     Ext.define('myApp.Territory', {
 *         extend: 'Ext.data.TreeModel',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.define('myApp.Country', {
 *         extend: 'Ext.data.TreeModel',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.define('myApp.City', {
 *         extend: 'Ext.data.TreeModel',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.create('Ext.tree.Panel', {
 *         renderTo: document.body,
 *         height: 200,
 *         width: 400,
 *         title: 'Sales Areas - using typeProperty',
 *         rootVisible: false,
 *         store: {
 *             // Child types use namespace of store's model by default
 *             model: 'myApp.Territory',
 *             proxy: {
 *                 type: 'memory',
 *                 reader: {
 *                     typeProperty: 'mtype'
 *                 }
 *             },
 *             root: {
 *                 children: [{
 *                     name: 'Europe, ME, Africa',
 *                     mtype: 'Territory',
 *                     children: [{
 *                         name: 'UK of GB & NI',
 *                         mtype: 'Country',
 *                         children: [{
 *                             name: 'London',
 *                             mtype: 'City',
 *                             leaf: true
 *                         }]
 *                     }]
 *                 }, {
 *                     name: 'North America',
 *                     mtype: 'Territory',
 *                     children: [{
 *                         name: 'USA',
 *                         mtype: 'Country',
 *                         children: [{
 *                             name: 'Redwood City',
 *                             mtype: 'City',
 *                             leaf: true
 *                         }]
 *                     }]
 *                 }]
 *             }
 *         }
 *     });
 *
 * ### Node being loaded decides.
 * You can declare your TreeModel subclasses with a {@link Ext.data.TreeModel#childType childType} which means that the node being loaded decides the
 * class to instantiate for all of its child nodes.
 *
 * It is important to note that if the root node is {@link Ext.tree.Panel#rootVisible hidden}, its type will default to the store's model type, and if left
 * as the default (`{@link Ext.data.TreeModel}`) this will have no knowledge of creation of special child node types. So be sure to specify a store model in this case:
 *
 *     @example
 *     Ext.define('myApp.TerritoryRoot', {
 *         extend: 'Ext.data.TreeModel',
 *         childType: 'myApp.Territory',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.define('myApp.Territory', {
 *         extend: 'Ext.data.TreeModel',
 *         childType: 'myApp.Country',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.define('myApp.Country', {
 *         extend: 'Ext.data.TreeModel',
 *         childType: 'myApp.City',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.define('myApp.City', {
 *         extend: 'Ext.data.TreeModel',
 *         fields: [{
 *             name: 'text',
 *             mapping: 'name'
 *         }]
 *     });
 *     Ext.create('Ext.tree.Panel', {
 *         renderTo: document.body,
 *         height: 200,
 *         width: 400,
 *         title: 'Sales Areas',
 *         rootVisible: false,
 *         store: {
 *             model: 'myApp.TerritoryRoot', // Needs to be this so it knows to create 'Country' child nodes
 *             root: {
 *                 children: [{
 *                     name: 'Europe, ME, Africa',
 *                     children: [{
 *                         name: 'UK of GB & NI',
 *                         children: [{
 *                             name: 'London',
 *                             leaf: true
 *                         }]
 *                     }]
 *                 }, {
 *                     name: 'North America',
 *                     children: [{
 *                         name: 'USA',
 *                         children: [{
 *                             name: 'Redwood City',
 *                             leaf: true
 *                         }]
 *                     }]
 *                 }]
 *             }
 *         }
 *     });
 *
 * # Data structure
 *
 * The {@link Ext.data.TreeStore TreeStore} maintains a {@link Ext.data.TreeStore#getRoot root node} and a hierarchical structure of {@link Ext.data.TreeModel node}s.
 *
 * The {@link Ext.tree.View UI} of the tree is driven by a {Ext.data.NodeStore NodeStore} which is a flattened view of *visible* nodes.
 * The NodeStore is dynamically updated to reflect the visibility state of nodes as nodes are added, removed or expanded. The UI
 * responds to mutation events fire by the NodeStore.
 * 
 * Note that nodes have several more {@link Ext.data.Model#cfg-fields fields} in order to describe their state within the hierarchy.
 *
 * If you add store listeners to the {@link Ext.data.Store#event-update update} event, then you will recieve notification when any of this state changes.
 * You should check the array of modified field names passed to the listener to decide whether the listener should take action or ignore the event.
 */
Ext.define('Ext.tree.Panel', {
    extend: 'Ext.panel.Table',
    alias: 'widget.treepanel',
    alternateClassName: ['Ext.tree.TreePanel', 'Ext.TreePanel'],
    requires: ['Ext.tree.View', 'Ext.selection.TreeModel', 'Ext.tree.Column', 'Ext.data.TreeStore'],
    viewType: 'treeview',
    selType: 'treemodel',

    treeCls: Ext.baseCSSPrefix + 'tree-panel',

    /**
     * @cfg {Boolean} [rowLines=false]
     * Configure as true to separate rows with visible horizontal lines (depends on theme).
     */
    rowLines: false,

    /**
     * @cfg {Boolean} [lines=true]
     * False to disable tree lines.
     */
    lines: true,

    /**
     * @cfg {Boolean} [useArrows=false]
     * True to use Vista-style arrows in the tree.
     */
    useArrows: false,

    /**
     * @cfg {Boolean} [singleExpand=false]
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
     * @cfg {Boolean} [rootVisible=true]
     * False to hide the root node.
     *
     * Note that trees *always* have a root node. If you do not specify a {@link #cfg-root} node, one will be created.
     *
     * If the root node is not visible, then in order for a tree to appear to the end user, the root node is autoloaded with its child nodes.
     */
    rootVisible: true,

    /**
     * @cfg {String} [displayField=text]
     * The field inside the model that will be used as the node's text.
     */
    displayField: 'text',

    /**
     * @cfg {Ext.data.Model/Ext.data.TreeModel/Object} root
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
        } else if (!store || !store.isStore) {
            store = Ext.apply({
                type: 'tree',
                root: me.root,
                fields: me.fields,
                model: me.model,
                proxy: 'memory',
                folderSort: me.folderSort
            }, store);
            store = me.store = Ext.StoreMgr.lookup(store);
        } else if (me.root) {
            store = me.store = Ext.data.StoreManager.lookup(store);
            store.setRoot(me.root);
            if (me.folderSort !== undefined) {
                store.folderSort = me.folderSort;
                store.sort();
            }
        }

        // Store must have the same idea about root visibility as us BEFORE callParent binds it.
        store.setRootVisible(me.rootVisible);

        // If there is no rootnode defined, then create one.
        if (!store.getRoot()) {
            store.setRoot({});
        }

        me.viewConfig = Ext.apply({
            rootVisible: me.rootVisible,
            animate: me.enableAnimations,
            singleExpand: me.singleExpand,
            node: store.getRoot(),
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
                flex     : 1,
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
            * @param {Ext.data.TreeModel} node The node who's checked property was changed
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
    },

    // @private
    // Hook into the TreeStore.
    // Do not callParent in TreePanel's bindStore
    // The TreeStore is only relevant to the tree - the View has its own NodeStore
    bindStore: function(store, initial) {
        var me = this,
            root = store.getRoot(),
            view = me.getView();

        me.store = store;

        // The TreeStore needs to know about this TreePanel's singleExpand constraint so that it can ensure compliance.
        store.singleExpand = me.singleExpand;

        // Connect to store. Return a Destroyable object
        me.storeListeners = me.mon(store, {
            destroyable: true,
            load: me.onStoreLoad,
            rootchange: me.onRootChange,
            clear: me.onClear,
            scope: me
        });

        if (view.store !== store) {
            // If coming from a reconfigure, we need to set the actual store property on the view. Setting the
            // store will then also set the dataSource.
            // 
            // Note that if it's a grid feature then this is sorted out in view.bindStore(), and it's own
            // implementation of .bindStore() will be called.
            view.bindStore(store, false);
        }

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
        me.rootRelayers = me.mon(root, {
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

        // If the user has set expanded: true on the root, we want to call the expand function to kick off
        // an expand process, so clear the expanded status and call expand.
        // Upon receipt, the expansion process is the most efficient way of processing the
        // returned nodes and putting them into the NodeStore in one block.
        // Appending a node to an expanded node is expensive - the NodeStore and UI are updated.
        if ((store.autoLoad !== false && !me.rootVisible) || root.isExpanded()) {
            root.data.expanded = false;
            root.expand();
        }

        // TreeStore must have an upward link to the TreePanel so that nodes can find their owning tree in NodeInterface.getOwnerTree
        store.ownerTree = me;
        
        if (!initial) {
            me.view.setRootNode(root, true);
        }
    },

    // @private
    unbindStore: function() {
        var me = this,
            store = me.store;

        if (store) {
            Ext.destroy(me.storeListeners, me.storeRelayers, me.rootRelayers);
            delete store.ownerTree;
            store.singleExpand = null;
        }
    },

    onClear: function(){
        this.view.onClear();
    },

    /**
     * Sets root node of this tree. All trees *always* have a root node. It may be {@link #rootVisible hidden}.
     *
     * If the passed node has not already been loaded with child nodes, and has its expanded field set, this triggers the {@link #cfg-store} to load the child nodes of the root.
     * @param {Ext.data.TreeModel/Object} root
     * @return {Ext.data.TreeModel} The new root
     */
    setRootNode: function() {
        return this.store.setRoot.apply(this.store, arguments);
    },

    /**
     * Returns the root node for this tree.
     * @return {Ext.data.TreeModel}
     */
    getRootNode: function() {
        return this.store.getRoot();
    },

    onRootChange: function(root) {
        this.view.setRootNode(root);
    },

    /**
     * Retrieve an array of checked records.
     * @return {Ext.data.TreeModel[]} An array containing the checked records
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
     * @param {String} path The path to select; A string of separated node IDs.
     * 
     * The path should include a leading separator. eg `'/root/usermanagement/users'`
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
