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

    /**
     * @cfg {Ext.data.Model} node
     * The Record you want to bind this Store to. Note that
     * this record will be decorated with the Ext.data.NodeInterface if this is not the
     * case yet.
     */
    node: null,

    /**
     * @cfg {Boolean} recursive
     * Set this to true if you want this NodeStore to represent
     * all the descendents of the node in its flat data collection. This is useful for
     * rendering a tree structure to a DataView and is being used internally by
     * the TreeView. Any records that are moved, removed, inserted or appended to the
     * node at any depth below the node this store is bound to will be automatically
     * updated in this Store's internal flat data structure.
     */
    recursive: false,

    /**
     * @cfg {Boolean} rootVisible
     * False to not include the root node in this Stores collection.
     */
    rootVisible: false,

    /**
     * @cfg {Ext.data.TreeStore} treeStore
     * The TreeStore that is used by this NodeStore's Ext.tree.View.
     */

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

    constructor: function(config) {
        var me = this,
            node;

        config = config || {};
        Ext.apply(me, config);

        //<debug>
        if (Ext.isDefined(me.proxy)) {
            Ext.Error.raise("A NodeStore cannot be bound to a proxy. Instead bind it to a record " +
                            "decorated with the NodeInterface by setting the node config.");
        }
        me.useModelWarning = false;
        //</debug>

        config.proxy = {type: 'proxy'};
        me.callParent([config]);

        node = me.node;
        if (node) {
            me.node = null;
            me.setNode(node);
        }
    },

    // NodeStores are never buffered or paged. They are loaded from the TreeStore to reflect all visible
    // nodes.
    // BufferedRenderer always asks for the *total* count, so this must return the count.
    getTotalCount: function() {
        return this.getCount();
    },

    setNode: function(node) {
        var me = this;
        if (me.node && me.node != node) {
            // We want to unbind our listeners on the old node
            me.mun(me.node, {
                expand: me.onNodeExpand,
                collapse: me.onNodeCollapse,
                append: me.onNodeAppend,
                insert: me.onNodeInsert,
                bulkremove: me.onBulkRemove,
                remove: me.onNodeRemove,
                sort: me.onNodeSort,
                scope: me
            });
            me.node = null;
        }

        if (node) {
            Ext.data.NodeInterface.decorate(node.self);
            me.removeAll();
            if (me.rootVisible) {
                me.add(node);
            } else if (!node.isExpanded() && me.treeStore.autoLoad !== false) {
                node.expand();
            }

            me.mon(node, {
                expand: me.onNodeExpand,
                collapse: me.onNodeCollapse,
                append: me.onNodeAppend,
                insert: me.onNodeInsert,
                bulkremove: me.onBulkRemove,
                remove: me.onNodeRemove,
                sort: me.onNodeSort,
                scope: me
            });
            me.node = node;
            if (node.isExpanded() && node.isLoaded()) {
                me.onNodeExpand(node, node.childNodes, true);
            }
        }
    },
 
    onNodeSort: function(node, childNodes) {
        var me = this;

        if ((me.indexOf(node) !== -1 || (node === me.node && !me.rootVisible) && node.isExpanded())) {
            Ext.suspendLayouts();
            me.onNodeCollapse(node, childNodes, true);
            me.onNodeExpand(node, childNodes, true);
            Ext.resumeLayouts(true);
        }
    },

    // Triggered by a NodeInterface's bubbled "expand" event.
    onNodeExpand: function(parent, records, suppressEvent) {
        var me = this,
            insertIndex = me.indexOf(parent) + 1,
            toAdd = [];

        // Used by the TreeView to bracket recursive expand & collapse ops
        // and refresh the size. This is most effective when folder nodes are loaded,
        // and this method is able to recurse.
        if (!suppressEvent) {
            me.fireEvent('beforeexpand', parent, records, insertIndex);
        }

        me.handleNodeExpand(parent, records, toAdd);

        // The add event from this insertion is handled by TreeView.onAdd.
        // That implementation calls parent and then ensures the previous sibling's joining lines are correct.
        // The datachanged event is relayed by the TreeStore. Internally, that's not used.
        me.insert(insertIndex, toAdd);

        // Triggers the TreeView's onExpand method which calls refreshSize,
        // and fires its afteritemexpand event
        if (!suppressEvent) {
            me.fireEvent('expand', parent, records);
        }
    },

    // Collects child nodes to remove into the passed toRemove array.
    // When available, all descendant nodes are pushed into that array using recursion.
    handleNodeExpand: function(parent, records, toAdd) {
        var me = this,
            ln = records ? records.length : 0,
            i, record;

        // recursive is hardcoded to true in TreeView.
        if (!me.recursive && parent !== me.node) {
            return;
        }

        if (parent !== this.node && !me.isVisible(parent)) {
            return;
        }

        if (ln) {
            // The view items corresponding to these are rendered.
            // Loop through and expand any of the non-leaf nodes which are expanded
            for (i = 0; i < ln; i++) {
                record = records[i];

                // Add to array being collected by recursion when child nodes are loaded.
                // Must be done here in loop so that child nodes are inserted into the stream in place
                // in recursive calls.
                toAdd.push(record);

                if (record.isExpanded()) {
                    if (record.isLoaded()) {
                        // Take a shortcut - appends to toAdd array
                        me.handleNodeExpand(record, record.childNodes, toAdd);
                    }
                    else {
                        // Might be asynchronous if child nodes are not immediately available
                        record.set('expanded', false);
                        record.expand();
                    }
                }
            }
        }
    },
    
    // Triggered by NodeInterface's bubbled bulkremove event
    onBulkRemove: function(parent, childNodes, isMove) {
        this.onNodeCollapse(parent, childNodes, true);
    },

    // Triggered by a NodeInterface's bubbled "collapse" event.
    onNodeCollapse: function(parent, records, suppressEvent, callback, scope) {
        var me = this,
            collapseIndex = me.indexOf(parent) + 1,
            node, lastNodeIndexPlus, sibling, found;

        if (!me.recursive && parent !== me.node) {
            return;
        }

        // Used by the TreeView to bracket recursive expand & collapse ops.
        // The TreeViewsets up the animWrap object if we are animating.
        // It also caches the collapse callback to call when it receives the
        // end collapse event. See below.
        if (!suppressEvent) {
            me.fireEvent('beforecollapse', parent, records, collapseIndex, callback, scope);
        }

        // Only attempt to remove the records if they are there.
        // Collapsing an ancestor node *immediately removes from the view, ALL its descendant nodes at all levels*.
        // But if the collapse was recursive, all descendant root nodes will still fire their
        // events. But we must ignore those events here - we have nothing to do.
        if (records.length && me.data.contains(records[0])) {
            
            // Calculate the index *one beyond* the last node we are going to remove
            // Need to loop up the tree to find the nearest view sibling, since it could
            // exist at some level above the current node.
            node = parent;
            while (node.parentNode) {
                sibling = node.nextSibling;
                if (sibling) {
                    found = true;
                    lastNodeIndexPlus = me.indexOf(sibling); 
                    break;
                } else {
                    node = node.parentNode;
                }
            }
            if (!found) {
                lastNodeIndexPlus = me.getCount();
            }

            // Remove the whole collapsed node set.
            me.removeAt(collapseIndex, lastNodeIndexPlus - collapseIndex);
        }

        // Triggers the TreeView's onCollapse method which calls refreshSize,
        // and fires its afteritecollapse event
        if (!suppressEvent) {
            me.fireEvent('collapse', parent, records, collapseIndex);
        }
    },

    onNodeAppend: function(parent, node, index) {
        var me = this,
            refNode, sibling;

        // Only react to a node append if it is to a node which is expanded, and is part of a tree
        if (me.isVisible(node)) {
            if (index === 0) {
                refNode = parent;
            } else {
                sibling = node.previousSibling;
                while (sibling.isExpanded() && sibling.lastChild) {
                    sibling = sibling.lastChild;
                }
                refNode = sibling;
            }
            me.insert(me.indexOf(refNode) + 1, node);
            if (!node.isLeaf() && node.isExpanded()) {
                if (node.isLoaded()) {
                    // Take a shortcut
                    me.onNodeExpand(node, node.childNodes, true);
                } else if (!me.treeStore.fillCount ) {
                    // If the node has been marked as expanded, it means the children
                    // should be provided as part of the raw data. If we're filling the nodes,
                    // the children may not have been loaded yet, so only do this if we're
                    // not in the middle of populating the nodes.
                    node.set('expanded', false);
                    node.expand();
                }
            }
        }
    },

    onNodeInsert: function(parent, node, refNode) {
        var me = this,
            index = this.indexOf(refNode);

        if (index != -1 && me.isVisible(node)) {
            me.insert(index, node);
            if (!node.isLeaf() && node.isExpanded()) {
                if (node.isLoaded()) {
                    // Take a shortcut
                    me.onNodeExpand(node, node.childNodes, true);
                }
                else {
                    node.set('expanded', false);
                    node.expand();
                }
            }
        }
    },

    onNodeRemove: function(parent, node, isMove) {
        var me = this;
        if (me.indexOf(node) != -1) {

            // If the removed node is a non-leaf and is expanded, use the onCollapse method to get rid
            // of all descendants at any level.
            if (!node.isLeaf() && node.isExpanded()) {

                // onCollapse expects to be able to use the "collapsing" node's parentNode
                // and nextSibling pointers so temporarily reinstate them.
                // Reinstating them is safe because we pass the suppressEvents flag, and no user code
                // is executed.
                node.parentNode = node.removeContext.parentNode;
                node.nextSibling = node.removeContext.nextSibling;
                me.onNodeCollapse(node, node.childNodes, true);
                node.parentNode = node.nextSibling = null;
            }
            me.remove(node);
        }
    },

    isVisible: function(node) {
        var parent = node.parentNode;
        while (parent) {
            // Hit root and it is expanded, the node is visible
            if (parent === this.node && parent.data.expanded) {
                return true;
            }

            // Hit a collapsed ancestor, the node is not visible
            if (!parent.data.expanded) {
                return false;
            }

            parent = parent.parentNode;
        }
        // Walked off the top - the node is not part of the tree structure
        return false;
    }
});