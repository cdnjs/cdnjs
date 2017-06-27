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
 * The TreeStore is a store implementation that is backed by by an {@link Ext.data.Tree}.
 * It provides convenience methods for loading nodes, as well as the ability to use
 * the hierarchical tree structure combined with a store. This class is generally used
 * in conjunction with {@link Ext.tree.Panel}. This class also relays many events from
 * the Tree for convenience.
 *
 * # Using Models
 *
 * If no Model is specified, an implicit model will be created that implements {@link Ext.data.NodeInterface}.
 * The standard Tree fields will also be copied onto the Model for maintaining their state. These fields are listed
 * in the {@link Ext.data.NodeInterface} documentation.
 *
 * # Reading Nested Data
 *
 * For the tree to read nested data, the {@link Ext.data.reader.Reader} must be configured with a root property,
 * so the reader can find nested data for each node (if a root is not specified, it will default to
 * 'children'). This will tell the tree to look for any nested tree nodes by the same keyword, i.e., 'children'.
 * If a root is specified in the config make sure that any nested nodes with children have the same name.
 * Note that setting {@link #defaultRootProperty} accomplishes the same thing.
 */
Ext.define('Ext.data.TreeStore', {
    extend: 'Ext.data.AbstractStore',
    alias: 'store.tree',
    requires: [
        'Ext.util.Sorter',
        'Ext.data.Tree',
        'Ext.data.NodeInterface'
    ],

    /**
     * @cfg {Ext.data.Model/Ext.data.NodeInterface/Object} root
     * The root node for this store. For example:
     *
     *     root: {
     *         expanded: true,
     *         text: "My Root",
     *         children: [
     *             { text: "Child 1", leaf: true },
     *             { text: "Child 2", expanded: true, children: [
     *                 { text: "GrandChild", leaf: true }
     *             ] }
     *         ]
     *     }
     *
     * Setting the `root` config option is the same as calling {@link #setRootNode}.
     */

    /**
     * @cfg {Boolean} [clearOnLoad=true]
     * Remove previously existing child nodes before loading. 
     */
    clearOnLoad : true,

    /**
     * @cfg {Boolean} [clearRemovedOnLoad=true]
     * If `true`, when a node is reloaded, any records in the {@link #removed} record collection that were previously descendants of the node being reloaded will be cleared from the {@link #removed} collection.
     * Only applicable if {@link #clearOnLoad} is `true`.
     */
    clearRemovedOnLoad: true,

    /**
     * @cfg {String} [nodeParam="node"]
     * The name of the parameter sent to the server which contains the identifier of the node.
     */
    nodeParam: 'node',

    /**
     * @cfg {String} [defaultRootId="root"]
     * The default root id.
     */
    defaultRootId: 'root',
    
    /**
     * @cfg {String} [defaultRootText="Root"]
     * The default root text (if not specified)/
     */
    defaultRootText: 'Root',

    /**
     * @cfg {String} [defaultRootProperty="children"]
     * The root property to specify on the reader if one is not explicitly defined.
     */
    defaultRootProperty: 'children',
    
    // Keep a copy of the default so we know if it's been changed in a subclass/config
    rootProperty: 'children',
    
    fillCount: 0,

    /**
     * @cfg {Boolean} [folderSort=false]
     * Set to true to automatically prepend a leaf sorter.
     */
    folderSort: false,

    constructor: function(config) {
        var me = this,
            root,
            fields,
            defaultRoot;

        config = Ext.apply({}, config);

        /**
         * If we have no fields declare for the store, add some defaults.
         * These will be ignored if a model is explicitly specified.
         */
        fields = config.fields || me.fields;
        if (!fields) {
            config.fields = [
                {name: 'text', type: 'string'}
            ];
            defaultRoot = config.defaultRootProperty || me.defaultRootProperty;
            if (defaultRoot !== me.defaultRootProperty) {
                config.fields.push({
                    name: defaultRoot,   
                    type: 'auto',   
                    defaultValue: null, 
                    persist: false
                });
            }
        }

        me.callParent([config]);

        // We create our data tree.
        me.tree = new Ext.data.Tree();
        
        // data tree has an upward link
        me.tree.treeStore = me;

        // The following events are fired on this TreeStore by the bubbling from NodeInterface.fireEvent
        /**
         * @event append
         * @inheritdoc Ext.data.Tree#append
         */
        /**
         * @event remove
         * @inheritdoc Ext.data.Tree#remove
         */
        /**
         * @event move
         * @inheritdoc Ext.data.Tree#move
         */
        /**
         * @event insert
         * @inheritdoc Ext.data.Tree#insert
         */
        /**
         * @event beforeappend
         * @inheritdoc Ext.data.Tree#beforeappend
         */
        /**
         * @event beforeremove
         * @inheritdoc Ext.data.Tree#beforeremove
         */
        /**
         * @event beforemove
         * @inheritdoc Ext.data.Tree#beforemove
         */
        /**
         * @event beforeinsert
         * @inheritdoc Ext.data.Tree#beforeinsert
         */
        /**
         * @event expand
         * @inheritdoc Ext.data.Tree#expand
         */
        /**
         * @event collapse
         * @inheritdoc Ext.data.Tree#collapse
         */
        /**
         * @event beforeexpand
         * @inheritdoc Ext.data.Tree#beforeexpand
         */
        /**
         * @event beforecollapse
         * @inheritdoc Ext.data.Tree#beforecollapse
         */
        /**
         * @event sort
         * @inheritdoc Ext.data.Tree#sort
         */

        me.tree.on({
            scope: me,
            remove: me.onNodeRemove,
            // this event must follow the relay to beforeitemexpand to allow users to
            // cancel the expand:
            beforeexpand: me.onBeforeNodeExpand,
            append: me.onNodeAdded,
            insert: me.onNodeAdded,
            sort: me.onNodeSort
        });

        me.onBeforeSort();

        root = me.root;
        if (root) {
            delete me.root;
            me.setRootNode(root);
        }

        //<deprecated since=0.99>
        if (Ext.isDefined(me.nodeParameter)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.data.TreeStore: nodeParameter has been deprecated. Please use nodeParam instead.');
            }
            me.nodeParam = me.nodeParameter;
            delete me.nodeParameter;
        }
        //</deprecated>
    },

    // inherit docs
    setProxy: function(proxy) {
        var reader,
            needsRoot;

        if (proxy instanceof Ext.data.proxy.Proxy) {
            // proxy instance, check if a root was set
            needsRoot = Ext.isEmpty(proxy.getReader().root);
        } else if (Ext.isString(proxy)) {
            // string type, means a reader can't be set
            needsRoot = true;
        } else {
            // object, check if a reader and a root were specified.
            reader = proxy.reader;
            needsRoot = !(reader && !Ext.isEmpty(reader.root));
        }
        proxy = this.callParent(arguments);

        // The proxy sets a parameter to carry the entity ID based upon the Operation's id
        // That partameter name defaults to "id".
        // TreeStore however uses a nodeParam configuration to specify the entity id
        proxy.idParam = this.nodeParam;

        if (needsRoot) {
            reader = proxy.getReader();
            reader.root = this.defaultRootProperty;
            // force rebuild
            reader.buildExtractors(true);
        }
        return proxy;
    },

    // inherit docs
    onBeforeSort: function() {
        if (this.folderSort) {
            this.sort({
                property: 'leaf',
                direction: 'ASC'
            }, 'prepend', false);
        }
    },

    /**
     * Fired by the root node.
     *
     * Called before a node is expanded.
     *
     * This ensures that the child nodes are available before calling the passed callback.
     * @private
     * @param {Ext.data.NodeInterface} node The node being expanded.
     * @param {Function} callback The function to run after the expand finishes
     * @param {Object} scope The scope in which to run the callback function
     * @param {Array} args The extra args to pass to the callback after the new child nodes
     */
    onBeforeNodeExpand: function(node, callback, scope, args) {
        var me = this,
            reader, dataRoot, data,
            callbackArgs;
        
        // Children are loaded go ahead with expand
        if (node.isLoaded()) {
            callbackArgs = [node.childNodes];
            if (args) {
                callbackArgs.push.apply(callbackArgs, args);
            }
            Ext.callback(callback, scope || node, callbackArgs);
        }
        // There are unloaded child nodes in the raw data because of the lazy configuration, load them then call back.
        else if (dataRoot = (data = (node.raw || node[node.persistenceProperty])[(reader = me.getProxy().getReader()).root])) {
            me.fillNode(node, reader.extractData(dataRoot));
            delete data[reader.root];
            callbackArgs = [node.childNodes];
            if (args) {
                callbackArgs.push.apply(callbackArgs, args);
            }
            Ext.callback(callback, scope || node, callbackArgs);
        }
        // The node is loading
        else if (node.isLoading()) {
            me.on('load', function() {
                callbackArgs = [node.childNodes];
                if (args) {
                    callbackArgs.push.apply(callbackArgs, args);
                }
                Ext.callback(callback, scope || node, callbackArgs);
            }, me, {single: true});
        }
        // Node needs loading
        else {
            me.read({
                node: node,
                callback: function() {
                    // Clear the callback, since if we're introducing a custom one,
                    // it may be re-used on reload
                    delete me.lastOptions.callback;
                    callbackArgs = [node.childNodes];
                    if (args) {
                        callbackArgs.push.apply(callbackArgs, args);
                    }
                    Ext.callback(callback, scope || node, callbackArgs);
                }
            });
        }
    },

    //inherit docs
    getNewRecords: function() {
        return Ext.Array.filter(this.tree.flatten(), this.filterNew);
    },

    //inherit docs
    getUpdatedRecords: function() {
        return Ext.Array.filter(this.tree.flatten(), this.filterUpdated);
    },

    onNodeRemove: function(parent, node, isMove) {
        var me = this;

        node.unjoin(me);
        // Phantom nodes should never be included in the removed collection.
        // Also, if we're moving a node a remove will be fired, however we'll
        // be inserting it again, so don't push it into the removed collection
        if (!node.phantom && !isMove) {
            Ext.Array.include(me.removed, node);
        }

        if (me.autoSync && !me.autoSyncSuspended && !isMove) {
            me.sync();
        }
    },

    onNodeAdded: function(parent, node) {
        var me = this,
            proxy = me.getProxy(),
            reader = proxy.getReader(),
            data = node.raw || node[node.persistenceProperty],
            dataRoot;

        Ext.Array.remove(me.removed, node);
        node.join(me);

        // If node has raw data, load the child nodes from it.
        if (!node.isLeaf() && !me.lazyFill) {
            dataRoot = reader.getRoot(data);
            if (dataRoot) {
                me.fillNode(node, reader.extractData(dataRoot));
                delete data[reader.root];
            }
        }

        if (me.autoSync && !me.autoSyncSuspended && (node.phantom || node.dirty)) {
            me.sync();
        }
    },

    onNodeSort: function() {
        if (this.autoSync && !this.autoSyncSuspended) {
            this.sync();
        }
    },

    /**
     * Sets the root node for this store.  See also the {@link #root} config option.
     * @param {Ext.data.Model/Ext.data.NodeInterface/Object} root
     * @return {Ext.data.NodeInterface} The new root
     */
    setRootNode: function(root, /* private */ preventLoad) {
        var me = this,
            model = me.model,
            idProperty = model.prototype.idProperty

        root = root || {};
        if (!root.isModel) {
            root = Ext.apply({}, root);
            // create a default rootNode and create internal data struct.
            Ext.applyIf(root, {
                id: me.defaultRootId,
                text: me.defaultRootText,
                allowDrag: false
            });
            if (root[idProperty] === undefined) {
                root[idProperty] = me.defaultRootId;
            }
            Ext.data.NodeInterface.decorate(model);
            root = Ext.ModelManager.create(root, model);
        } else if (root.isModel && !root.isNode) {
            Ext.data.NodeInterface.decorate(model);
        }


        // Because we have decorated the model with new fields,
        // we need to build new extactor functions on the reader.
        me.getProxy().getReader().buildExtractors(true);

        // When we add the root to the tree, it will automaticaly get the NodeInterface
        me.tree.setRootNode(root);

        // If the user has set expanded: true on the root, we want to call the expand function to kick off
        // an expand process, so clear the expanded status and call expand.
        // Upon receipt, the expansion process is the most efficient way of processing the
        // returned nodes and putting them into the NodeStore in one block.
        // Appending a node to an expanded node is expensive - the NodeStore and UI are updated.
        if (preventLoad !== true && !root.isLoaded() && (me.autoLoad === true || root.isExpanded())) {
            root.data.expanded = false;
            root.expand();
        }

        return root;
    },

    /**
     * Returns the root node for this tree.
     * @return {Ext.data.NodeInterface}
     */
    getRootNode: function() {
        return this.tree.getRootNode();
    },

    /**
     * Returns the record node by id
     * @return {Ext.data.NodeInterface}
     */
    getNodeById: function(id) {
        return this.tree.getNodeById(id);
    },
    
    // inherit docs
    getById: function(id) {
        return this.getNodeById(id);    
    },

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options (Optional) config object. This is passed into the {@link Ext.data.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function.
     * The options can also contain a node, which indicates which node is to be loaded. If not specified, it will
     * default to the root node.
     */
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var me = this,
            node = options.node || me.tree.getRootNode();

        // If there is not a node it means the user hasnt defined a rootnode yet. In this case lets just
        // create one for them.
        if (!node) {
            node = me.setRootNode({
                expanded: true
            }, true);
        }
        
        // Assign the ID of the Operation so that a ServerProxy can set its idParam parameter,
        // or a REST proxy can create the correct URL
        options.id = node.getId();

        if (me.clearOnLoad) {
            if(me.clearRemovedOnLoad) {
                // clear from the removed array any nodes that were descendants of the node being reloaded so that they do not get saved on next sync.
                me.clearRemoved(node);
            }
            // temporarily remove the onNodeRemove event listener so that when removeAll is called, the removed nodes do not get added to the removed array
            me.tree.un('remove', me.onNodeRemove, me);
            // remove all the nodes
            node.removeAll(false);
            // reattach the onNodeRemove listener
            me.tree.on('remove', me.onNodeRemove, me);
        }

        Ext.applyIf(options, {
            node: node
        });

        me.callParent([options]);
        
        if (me.loading && node) {
            node.set('loading', true);
        }
        
        return me;
    },

    /**
     * Removes all records that used to be descendants of the passed node from the removed array
     * @private
     * @param {Ext.data.NodeInterface} node
     */
    clearRemoved: function(node) {
        var me = this,
            removed = me.removed,
            id = node.getId(),
            removedLength = removed.length,
            i = removedLength,
            recordsToClear = {},
            newRemoved = [],
            removedHash = {},
            removedNode,
            targetNode,
            targetId;

        if(node === me.getRootNode()) {
            // if the passed node is the root node, just reset the removed array
            me.removed = [];
            return;
        }

        // add removed records to a hash so they can be easily retrieved by id later
        for(; i--;) {
            removedNode = removed[i];
            removedHash[removedNode.getId()] = removedNode;
        }

        for(i = removedLength; i--;) {
            removedNode = removed[i];
            targetNode = removedNode;
            while(targetNode && targetNode.getId() !== id) {
                // walk up the parent hierarchy until we find the passed node or until we get to the root node
                targetId = targetNode.get('parentId');
                targetNode = targetNode.parentNode || me.getNodeById(targetId) || removedHash[targetId];
            }
            if(targetNode) {
                // removed node was previously a descendant of the passed node - add it to the records to clear from "removed" later
                recordsToClear[removedNode.getId()] = removedNode;
            }
        }

        // create a new removed array containing only the records that are not in recordsToClear
        for(i = 0; i < removedLength; i++) {
            removedNode = removed[i];
            if(!recordsToClear[removedNode.getId()]) {
                newRemoved.push(removedNode);
            }
        }

        me.removed = newRemoved;
    },

    /**
     * Fills a node with a series of child records.
     * @private
     * @param {Ext.data.NodeInterface} node The node to fill
     * @param {Ext.data.Model[]} newNodes The records to add
     */
    fillNode: function(node, newNodes) {
        var me = this,
            ln = newNodes ? newNodes.length : 0,
            sorters = me.sorters,
            i, sortCollection,
            needsIndexSort = false,
            performLocalSort = ln && me.sortOnLoad && !me.remoteSort && sorters && sorters.items && sorters.items.length,
            node1, node2, rootFill;

        // See if there are any differing index values in the new nodes. If not, then we do not have to sortByIndex
        for (i = 1; i < ln; i++) {
            node1 = newNodes[i];
            node2 = newNodes[i - 1];
            needsIndexSort = node1[node1.persistenceProperty].index != node2[node2.persistenceProperty].index;
            if (needsIndexSort) {
                break;
            }
        }

        // If there is a set of local sorters defined.
        if (performLocalSort) {
            // If sorting by index is needed, sort by index first
            if (needsIndexSort) {
                me.sorters.insert(0, me.indexSorter);
            }
            sortCollection = new Ext.util.MixedCollection();
            sortCollection.addAll(newNodes);
            sortCollection.sort(me.sorters.items);
            newNodes = sortCollection.items;

            // Remove the index sorter
            me.sorters.remove(me.indexSorter);
        } else if (needsIndexSort) {
            Ext.Array.sort(newNodes, me.sortByIndex);
        }

        node.set('loaded', true);
        
        // Fill node gets called recursively (indirectly) as we're populating the
        // nodes via a load or when appending a new child. As such, when we hit
        // the top most node, we fire an event to let the view know we'll be doing
        // a bulk operation so it can take appropriate action
        rootFill = me.fillCount === 0;
        if (rootFill) {
            // internal event
            me.fireEvent('beforefill', me, node, newNodes);
        }
        ++me.fillCount;

        if (newNodes.length) {
            node.appendChild(newNodes, undefined, true);
        }
        
        if (rootFill) {
            // internal event
            me.fireEvent('fillcomplete', me, node, newNodes);
        }
        --me.fillCount;
        
        return newNodes;
    },

    /**
     * Sorter function for sorting records in index order
     * @private
     * @param {Ext.data.NodeInterface} node1
     * @param {Ext.data.NodeInterface} node2
     * @return {Number}
     */
    sortByIndex: function(node1, node2) {
        return node1[node1.persistenceProperty].index - node2[node2.persistenceProperty].index;
    },
    
    onIdChanged: function(model, oldId, newId, oldInternalId){
        this.tree.onNodeIdChanged(model, oldId, newId, oldInternalId);
        this.callParent(arguments);    
    },

    // inherit docs
    onProxyLoad: function(operation) {
        var me = this,
            successful = operation.wasSuccessful(),
            records = operation.getRecords(),
            node = operation.node;

        me.loading = false;
        node.set('loading', false);
        if (successful) {
            if (!me.clearOnLoad) {
                records = me.cleanRecords(node, records);
            }
            records = me.fillNode(node, records);
        }
        // The load event has an extra node parameter
        // (differing from the load event described in AbstractStore)
        /**
         * @event load
         * Fires whenever the store reads data from a remote data source.
         * @param {Ext.data.TreeStore} this
         * @param {Ext.data.NodeInterface} node The node that was loaded.
         * @param {Ext.data.Model[]} records An array of records.
         * @param {Boolean} successful True if the operation was successful.
         */
        // deprecate read?
        me.fireEvent('read', me, operation.node, records, successful);
        me.fireEvent('load', me, operation.node, records, successful);
        //this is a callback that would have been passed to the 'read' function and is optional
        Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
    },
    
    cleanRecords: function(node, records){
        var nodeHash = {},
            childNodes = node.childNodes,
            i = 0,
            len  = childNodes.length,
            out = [],
            rec;
            
        // build a hash of all the childNodes under the current node for performance
        for (; i < len; ++i) {
            nodeHash[childNodes[i].getId()] = true;
        }
        
        for (i = 0, len = records.length; i < len; ++i) {
            rec = records[i];
            if (!nodeHash[rec.getId()]) {
                out.push(rec);    
            }
        }
        
        return out;
    },

    // inherit docs
    removeAll: function() {
        var root = this.getRootNode();
        if (root) {
            root.destroy(true);
        }
        this.fireEvent('clear', this);
    },

    // inherit docs
    doSort: function(sorterFn) {
        var me = this;
        if (me.remoteSort) {
            //the load function will pick up the new sorters and request the sorted data from the proxy
            me.load();
        } else {
            me.tree.sort(sorterFn, true);
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
        me.fireEvent('sort', me, me.sorters.getRange());
    }
}, function() {
    var proto = this.prototype;
    proto.indexSorter = new Ext.util.Sorter({
        sorterFn: proto.sortByIndex
    });
});
