/**
 * Node Store
 * @private
 */
Ext.define('Ext.data.NodeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.node',
    requires: ['Ext.data.NodeInterface'],

    /**
     * @property {Boolean} isNodeStore
     * `true` in this class to identify an object as an instantiated NodeStore, or subclass thereof.
     */
    isNodeStore: true,

    config: {
        /**
         * @cfg {Ext.data.Model} node The Record you want to bind this Store to. Note that
         * this record will be decorated with the {@link Ext.data.NodeInterface} if this is not the
         * case yet.
         * @accessor
         */
        node: null,

        /**
         * @cfg {Boolean} recursive Set this to `true` if you want this NodeStore to represent
         * all the descendants of the node in its flat data collection. This is useful for
         * rendering a tree structure to a DataView and is being used internally by
         * the TreeView. Any records that are moved, removed, inserted or appended to the
         * node at any depth below the node this store is bound to will be automatically
         * updated in this Store's internal flat data structure.
         * @accessor
         */
        recursive: false,

        /**
         * @cfg {Boolean} rootVisible `false` to not include the root node in this Stores collection.
         * @accessor
         */
        rootVisible: false,

        /**
         * @cfg {Boolean} folderSort
         * Set to `true` to automatically prepend a leaf sorter.
         */
        folderSort: false
    },

    /**
     * @protected
     * Recursion level counter. Incremented when expansion or collaping of a node is initiated,
     * including when nested nodes below the expanding/collapsing root begin expanding or collapsing.
     * 
     * This ensures that collapsestart, collapsecomplete, expandstart and expandcomplete only
     * fire on the top level node being collapsed/expanded.
     * 
     * Also, allows listeners to the `add` and `remove` events to know whether a collapse of expand is in progress.
     */
    isExpandingOrCollapsing: 0,

    // NodeStores are never buffered or paged. They are loaded from the TreeStore to reflect all visible
    // nodes.
    // BufferedRenderer always asks for the *total* count, so this must return the count.
    getTotalCount: function() {
        return this.getCount();
    },

    afterEdit: function(record, modifiedFields) {
        // Only for when being used as the flat NodeStore of a List
        if (this.getNode() && modifiedFields) {
            if (modifiedFields.indexOf('loaded') !== -1) {
                return this.add(this.retrieveChildNodes(record));
            }
            if (modifiedFields.indexOf('expanded') !== -1) {
                return this.filter();
            }
            if (modifiedFields.indexOf('sorted') !== -1) {
                return this.sort();
            }
        }
        this.callParent(arguments);
    },

    onNodeAppend: function(parent, node) {
        this.add([node].concat(this.retrieveChildNodes(node)));
    },

    onNodeInsert: function(parent, node) {
        this.add([node].concat(this.retrieveChildNodes(node)));
    },

    onNodeRemove: function(parent, node) {
        this.remove([node].concat(this.retrieveChildNodes(node)));
    },

    onNodeExpand: function(parent, records) {
        this.loadRecords(records);
    },

    applyNode: function(node) {
        if (node) {
            Ext.data.NodeInterface.decorate(node);
        }
        return node;
    },

    updateNode: function(node, oldNode) {
        var me = this,
            data;

        if (oldNode && !oldNode.isDestroyed) {
            oldNode.un({
                append  : 'onNodeAppend',
                insert  : 'onNodeInsert',
                remove  : 'onNodeRemove',
                load    : 'onNodeLoad',
                scope: me
            });
            oldNode.unjoin(me);
        }

        if (node) {
            node.on({
                scope   : me,
                append  : 'onNodeAppend',
                insert  : 'onNodeInsert',
                remove  : 'onNodeRemove',
                load    : 'onNodeLoad'
            });

            node.join(me);

            data = [];
            if (node.childNodes.length) {
                data = data.concat(me.retrieveChildNodes(node));
            }
            if (me.getRootVisible()) {
                data.push(node);
            } else if (node.isLoaded() || node.isLoading()) {
                node.set('expanded', true);
            }

            me.getData().clear();
            me.fireEvent('clear', me);

            me.suspendEvents();
            me.add(data);
            me.resumeEvents();

            if(data.length === 0) {
                me.loaded = node.loaded = true;
            }

            me.fireEvent('refresh', me, me.data);
        }
    },

    /**
     * Private method used to deeply retrieve the children of a record without recursion.
     * @private
     * @param {Ext.data.NodeInterface} root
     * @return {Array}
     */
    retrieveChildNodes: function(root) {
        var node = this.getNode(),
            recursive = this.getRecursive(),
            added = [],
            child = root;

        if (!root.childNodes.length || (!recursive && root !== node)) {
            return added;
        }

        if (!recursive) {
            return root.childNodes;
        }

        while (child) {
            if (child._added) {
                delete child._added;
                if (child === root) {
                    break;
                } else {
                    child = child.nextSibling || child.parentNode;
                }
            } else {
                if (child !== root) {
                    added.push(child);
                }
                if (child.firstChild) {
                    child._added = true;
                    child = child.firstChild;
                } else {
                    child = child.nextSibling || child.parentNode;
                }
            }
        }

        return added;
    },

    /**
     * @param {Object} node
     * @return {Boolean}
     */
    isVisible: function(node) {
        var parent = node.parentNode;

        if (!this.getRecursive() && parent !== this.getNode()) {
            return false;
        }

        while (parent) {
            if (!parent.isExpanded()) {
                return false;
            }

            //we need to check this because for a nodestore the node is not likely to be the root
            //so we stop going up the chain when we hit the original node as we don't care about any
            //ancestors above the configured node
            if (parent === this.getNode()) {
                break;
            }

            parent = parent.parentNode;
        }
        return true;
    }
});