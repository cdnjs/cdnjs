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
 * @class Ext.data.Tree
 *
 * This class is used as a container for a series of nodes. The nodes themselves maintain
 * the relationship between parent/child. The tree itself acts as a manager. It gives functionality
 * to retrieve a node by its identifier: {@link #getNodeById}.
 *
 * The tree also relays events from any of it's child nodes, allowing them to be handled in a
 * centralized fashion. In general this class is not used directly, rather used internally
 * by other parts of the framework.
 *
 */
Ext.define('Ext.data.Tree', {
    alias: 'data.tree',

    mixins: {
        observable: "Ext.util.Observable"
    },

    /**
     * @property {Ext.data.NodeInterface}
     * The root node for this tree
     */
    root: null,

    /**
     * Creates new Tree object.
     * @param {Ext.data.NodeInterface} root (optional) The root node
     */
    constructor: function(root) {
        var me = this;

        me.mixins.observable.constructor.call(me);

        if (root) {
            me.setRootNode(root);
        }
        
        // All these events from tree nodes bubbble up and fire on this Tree
        me.on({
            scope: me,
            idchanged: me.onNodeIdChanged,
            insert: me.onNodeInsert,
            append: me.onNodeAppend,
            remove: me.onNodeRemove
        });
    },

    /**
     * Returns the root node for this tree.
     * @return {Ext.data.NodeInterface}
     */
    getRootNode : function() {
        return this.root;
    },

    /**
     * Sets the root node for this tree.
     * @param {Ext.data.NodeInterface} node
     * @return {Ext.data.NodeInterface} The root node
     */
    setRootNode : function(node) {
        var me = this;

        me.root = node;

        // If the passed node is currently the root of another Tree, remove it.
        if (node.rootOf) {
            node.rootOf.removeRootNode();
        }

        // If the passed node is owned by some other node, remove it.
        else if (node.parentNode) {
            node.parentNode.removeChild(node);
        }

        // Insert upward link to owning Tree
        node.rootOf = me;

        if (node.fireEventArgs('beforeappend', [null, node]) !== false) {
            node.set('root', true);
            // root node should never be phantom or dirty, so commit it
            node.updateInfo(true, {
                isFirst: true,
                isLast: true,
                depth: 0,
                index: 0,
                parentId: null
            });

            // The following events are fired on this TreePanel by the bubbling from NodeInterface.fireEvent
            /**
             * @event append
             * @inheritdoc Ext.data.NodeInterface#append
             */
            /**
             * @event remove
             * @inheritdoc Ext.data.NodeInterface#remove
             */
            /**
             * @event move
             * @inheritdoc Ext.data.NodeInterface#move
             */
            /**
             * @event insert
             * @inheritdoc Ext.data.NodeInterface#insert
             */
            /**
             * @event beforeappend
             * @inheritdoc Ext.data.NodeInterface#beforeappend
             */
            /**
             * @event beforeremove
             * @inheritdoc Ext.data.NodeInterface#beforeremove
             */
            /**
             * @event beforemove
             * @inheritdoc Ext.data.NodeInterface#beforemove
             */
            /**
             * @event beforeinsert
             * @inheritdoc Ext.data.NodeInterface#beforeinsert
             */
            /**
             * @event expand
             * @inheritdoc Ext.data.NodeInterface#expand
             */
            /**
             * @event collapse
             * @inheritdoc Ext.data.NodeInterface#collapse
             */
            /**
             * @event beforeexpand
             * @inheritdoc Ext.data.NodeInterface#beforeexpand
             */
            /**
             * @event beforecollapse
             * @inheritdoc Ext.data.NodeInterface#beforecollapse
             */
            /**
             * @event sort
             * @inheritdoc Ext.data.NodeInterface#event-sort
             */
            /**
             * @event rootchange
             * Fires whenever the root node is changed in the tree.
             * @param {Ext.data.Model} root The new root
            */

            me.nodeHash = {};
            node.fireEvent('append', null, node);
            node.fireEvent('rootchange', node);
        }

        return node;
    },

    /**
     * Removes the root node from this tree.
     * @return {Ext.data.NodeInterface} The root node
     */
    removeRootNode: function() {
        var me = this,
            root = me.root;

        root.set('root', false);
        root.fireEvent('remove', null, root, false);
        root.fireEvent('rootchange', null);

        // Unlink root after events so that the required bubbling propagates to all handlers.
        // This unregisters the node and its descendants.
        root.rootOf = me.root = null;
        return root;
    },

    /**
     * Flattens all the nodes in the tree into an array.
     * @private
     * @return {Ext.data.NodeInterface[]} The flattened nodes.
     */
    flatten: function(){
        return Ext.Object.getValues(this.nodeHash);
    },

    /**
     * Fired when a node is inserted into the root or one of it's children
     * @private
     * @param {Ext.data.NodeInterface} parent The parent node
     * @param {Ext.data.NodeInterface} node The inserted node
     */
    onNodeInsert: function(parent, node) {
        this.registerNode(node, true);
    },

    /**
     * Fired when a node is appended into the root or one of it's children
     * @private
     * @param {Ext.data.NodeInterface} parent The parent node
     * @param {Ext.data.NodeInterface} node The appended node
     */
    onNodeAppend: function(parent, node) {
        this.registerNode(node, true);
    },

    /**
     * Fired when a node is removed from the root or one of it's children
     * @private
     * @param {Ext.data.NodeInterface} parent The parent node
     * @param {Ext.data.NodeInterface} node The removed node
     */
    onNodeRemove: function(parent, node) {
        this.unregisterNode(node, true);
    },

    /**
     * Fired when a node's id changes.  Updates the node's id in the node hash.
     * @private
     * @param {Ext.data.NodeInterface} node 
     * @param {Number} oldId The old id
     * @param {Number} newId The new id
     */
    onNodeIdChanged: function(node, oldId, newId, oldInternalId) {
        var nodeHash = this.nodeHash;
    
        nodeHash[node.internalId] = node;
        delete nodeHash[oldInternalId];
    },

    /**
     * Gets a node in this tree by its id.
     * @param {String} id
     * @return {Ext.data.NodeInterface} The match node.
     */
    getNodeById : function(id) {
        return this.nodeHash[id];
    },

    /**
     * Registers a node with the tree
     * @private
     * @param {Ext.data.NodeInterface} node The node to register
     * @param {Boolean} [includeChildren] True to unregister any child nodes
     */
    registerNode : function(node, includeChildren) {
        var me = this,
            children, length, i;

        me.nodeHash[node.internalId] = node;
        if (includeChildren === true) {
            children = node.childNodes;
            length = children.length;
            for (i = 0; i < length; i++) {
                me.registerNode(children[i], true);
            }
        }
    },

    /**
     * Unregisters a node with the tree
     * @private
     * @param {Ext.data.NodeInterface} node The node to unregister
     * @param {Boolean} [includeChildren] True to unregister any child nodes
     */
    unregisterNode : function(node, includeChildren) {
        var me = this,
            children, length, i;

        delete me.nodeHash[node.internalId];
        if (includeChildren === true) {
            children = node.childNodes;
            length = children.length;
            for (i = 0; i < length; i++) {
                me.unregisterNode(children[i], true);
            }
        }
    },

    /**
     * Sorts this tree
     * @private
     * @param {Function} sorterFn The function to use for sorting
     * @param {Boolean} recursive True to perform recursive sorting
     */
    sort: function(sorterFn, recursive) {
        this.getRootNode().sort(sorterFn, recursive);
    },

     /**
     * Filters this tree
     * @private
     * @param {Function} sorterFn The function to use for filtering
     * @param {Boolean} recursive True to perform recursive filtering
     */
    filter: function(filters, recursive) {
        this.getRootNode().filter(filters, recursive);
    }
});