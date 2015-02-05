/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('tree-node', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Provides the `Tree.Node` class, which represents a tree node contained in a
`Tree` data structure.

@module tree
@submodule tree-node
**/

/**
Represents a tree node in a `Tree` data structure.

@class Tree.Node
@param {Tree} tree `Tree` instance with which this node should be associated.
@param {Object} [config] Configuration hash for this node.

    @param {Boolean} [config.canHaveChildren=false] Whether or not this node can
        contain child nodes. Will be automatically set to `true` if not
        specified and `config.children` contains one or more children.

    @param {Tree.Node[]} [config.children] Array of `Tree.Node` instances
        for child nodes of this node.

    @param {Object} [config.data] Implementation-specific data related to this
        node. You may add arbitrary properties to this hash for your own use.

    @param {String} [config.id] Unique id for this node. This id must be unique
        among all tree nodes on the entire page, and will also be used as this
        node's DOM id when it's rendered by a TreeView. A unique id will be
        automatically generated unless you specify a custom value.

    @param {Object} [config.state] State hash for this node. You may add
        arbitrary state properties to this hash for your own use. See the
        docs for `Tree.Node`'s `state` property for details on state values used
        internally by `Tree.Node`.

@constructor
**/

function TreeNode(tree, config) {
    config || (config = {});

    this.id   = this._yuid = config.id || this.id || Y.guid('treeNode-');
    this.tree = tree;

    this.children = config.children || [];
    this.data     = config.data || {};
    this.state    = config.state || {};

    if (config.canHaveChildren) {
        this.canHaveChildren = config.canHaveChildren;
    } else if (this.children.length) {
        this.canHaveChildren = true;
    }

    // Mix in arbitrary properties on the config object, but don't overwrite any
    // existing properties of this node.
    Y.mix(this, config);

    // If this node has children, loop through them and ensure their parent
    // references are all set to this node.
    for (var i = 0, len = this.children.length; i < len; i++) {
        this.children[i].parent = this;
    }
}

TreeNode.prototype = {
    // -- Public Properties ----------------------------------------------------

    /**
    Whether or not this node can contain child nodes.

    This value is falsy by default unless child nodes are added at instantiation
    time, in which case it will be automatically set to `true`. You can also
    manually set it to `true` to indicate that a node can have children even
    though it might not currently have any children.

    Note that regardless of the value of this property, appending, prepending,
    or inserting a node into this node will cause `canHaveChildren` to be set to
    true automatically.

    @property {Boolean} canHaveChildren
    **/

    /**
    Child nodes contained within this node.

    @property {Tree.Node[]} children
    @default []
    @readOnly
    **/

    /**
    Arbitrary serializable data related to this node.

    Use this property to store any data that should accompany this node when it
    is serialized to JSON.

    @property {Object} data
    @default {}
    **/

    /**
    Unique id for this node.

    @property {String} id
    @readOnly
    **/

    /**
    Parent node of this node, or `undefined` if this is an unattached node or
    the root node.

    @property {Tree.Node} parent
    @readOnly
    **/

    /**
    Current state of this node.

    Use this property to store state-specific info -- such as whether this node
    is "open", "selected", or any other arbitrary state -- that should accompany
    this node when it is serialized to JSON.

    @property {Object} state
    **/

    /**
    The Tree instance with which this node is associated.

    @property {Tree} tree
    @readOnly
    **/

    // -- Protected Properties -------------------------------------------------

    /**
    Mapping of child node ids to indices.

    @property {Object} _indexMap
    @protected
    **/

    /**
    Flag indicating whether the `_indexMap` is stale and needs to be rebuilt.

    @property {Boolean} _isIndexStale
    @default true
    @protected
    **/
    _isIndexStale: true,

    /**
    Simple way to type-check that this is an instance of Tree.Node.

    @property {Boolean} _isYUITreeNode
    @default true
    @protected
    **/
    _isYUITreeNode: true,

    /**
    Array of property names on this node that should be serialized to JSON when
    `toJSON()` is called.

    Note that the `children` property is a special case that is managed
    separately.

    @property {String[]} _serializable
    @protected
    **/
    _serializable: ['canHaveChildren', 'data', 'id', 'state'],

    // -- Public Methods -------------------------------------------------------

    /**
    Appends the given tree node or array of nodes to the end of this node's
    children.

    @method append
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config
        object, array of child nodes, or array of node config objects to append
        to the given parent. Node config objects will automatically be converted
        into node instances.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were appended.
    **/
    append: function (node, options) {
        return this.tree.appendNode(this, node, options);
    },

    /**
    Returns this node's depth.

    The root node of a tree always has a depth of 0. A child of the root has a
    depth of 1, a child of that child will have a depth of 2, and so on.

    @method depth
    @return {Number} This node's depth.
    @since 3.11.0
    **/
    depth: function () {
        if (this.isRoot()) {
            return 0;
        }

        var depth  = 0,
            parent = this.parent;

        while (parent) {
            depth += 1;
            parent = parent.parent;
        }

        return depth;
    },

    /**
    Removes all children from this node. The removed children will still be
    reusable unless the `destroy` option is truthy.

    @method empty
    @param {Object} [options] Options.
        @param {Boolean} [options.destroy=false] If `true`, the children will
            also be destroyed, which makes them available for garbage collection
            and means they can't be reused.
        @param {Boolean} [options.silent=false] If `true`, `remove` events will
            be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @return {Tree.Node[]} Array of removed child nodes.
    **/
    empty: function (options) {
        return this.tree.emptyNode(this, options);
    },

    /**
    Performs a depth-first traversal of this node, passing it and each of its
    descendants to the specified _callback_, and returning the first node for
    which the callback returns a truthy value.

    Traversal will stop as soon as a truthy value is returned from the callback.

    See `Tree#traverseNode()` for more details on how depth-first traversal
    works.

    @method find
    @param {Object} [options] Options.
        @param {Number} [options.depth] Depth limit. If specified, descendants
            will only be traversed to this depth before backtracking and moving
            on.
    @param {Function} callback Callback function to call with the traversed
        node and each of its descendants. If this function returns a truthy
        value, traversal will be stopped and the current node will be returned.

        @param {Tree.Node} callback.node Node being traversed.

    @param {Object} [thisObj] `this` object to use when executing _callback_.
    @return {Tree.Node|null} Returns the first node for which the _callback_
        returns a truthy value, or `null` if the callback never returns a truthy
        value.
    **/
    find: function (options, callback, thisObj) {
        return this.tree.findNode(this, options, callback, thisObj);
    },

    /**
    Returns `true` if this node has one or more child nodes.

    @method hasChildren
    @return {Boolean} `true` if this node has one or more child nodes, `false`
        otherwise.
    **/
    hasChildren: function () {
        return !!this.children.length;
    },

    /**
    Returns the numerical index of this node within its parent node, or `-1` if
    this node doesn't have a parent node.

    @method index
    @return {Number} Index of this node within its parent node, or `-1` if this
        node doesn't have a parent node.
    **/
    index: function () {
        return this.parent ? this.parent.indexOf(this) : -1;
    },

    /**
    Returns the numerical index of the given child node, or `-1` if the node is
    not a child of this node.

    @method indexOf
    @param {Tree.Node} node Child node.
    @return {Number} Index of the child, or `-1` if the node is not a child of
        this node.
    **/
    indexOf: function (node) {
        var index;

        if (this._isIndexStale) {
            this._reindex();
        }

        index = this._indexMap[node.id];

        return typeof index === 'undefined' ? -1 : index;
    },

    /**
    Inserts a node or array of nodes at the specified index under this node, or
    appends them to this node if no index is specified.

    If a node being inserted is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method insert
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config
        object, array of child nodes, or array of node config objects to insert
        under the given parent. Node config objects will automatically be
        converted into node instances.

    @param {Object} [options] Options.
        @param {Number} [options.index] Index at which to insert the child node.
            If not specified, the node will be appended as the last child of the
            parent.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
        @param {String} [options.src='insert'] Source of the change, to be
            passed along to the event facade of the resulting event. This can be
            used to distinguish between changes triggered by a user and changes
            triggered programmatically, for example.

    @return {Tree.Node[]} Node or array of nodes that were inserted.
    **/
    insert: function (node, options) {
        return this.tree.insertNode(this, node, options);
    },

    /**
    Returns `true` if this node has been inserted into a tree, `false` if it is
    merely associated with a tree and has not yet been inserted.

    @method isInTree
    @return {Boolean} `true` if this node has been inserted into a tree, `false`
        otherwise.
    **/
    isInTree: function () {
        if (this.tree && this.tree.rootNode === this) {
            return true;
        }

        return !!(this.parent && this.parent.isInTree());
    },

    /**
    Returns `true` if this node is the root of the tree.

    @method isRoot
    @return {Boolean} `true` if this node is the root of the tree, `false`
        otherwise.
    **/
    isRoot: function () {
        return !!(this.tree && this.tree.rootNode === this);
    },

    /**
    Returns this node's next sibling, or `undefined` if this node is the last
    child.

    @method next
    @return {Tree.Node} This node's next sibling, or `undefined` if this node is
        the last child.
    **/
    next: function () {
        if (this.parent) {
            return this.parent.children[this.index() + 1];
        }
    },

    /**
    Prepends a node or array of nodes at the beginning of this node's children.

    If a node being prepended is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method prepend
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config
        object, array of child nodes, or array of node config objects to prepend
        to this node. Node config objects will automatically be converted into
        node instances.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were prepended.
    **/
    prepend: function (node, options) {
        return this.tree.prependNode(this, node, options);
    },

    /**
    Returns this node's previous sibling, or `undefined` if this node is the
    first child

    @method previous
    @return {Tree.Node} This node's previous sibling, or `undefined` if this
        node is the first child.
    **/
    previous: function () {
        if (this.parent) {
            return this.parent.children[this.index() - 1];
        }
    },

    /**
    Removes this node from its parent node.

    @method remove
    @param {Object} [options] Options.
        @param {Boolean} [options.destroy=false] If `true`, this node and all
            its children will also be destroyed, which makes them available for
            garbage collection and means they can't be reused.
        @param {Boolean} [options.silent=false] If `true`, the `remove` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    remove: function (options) {
        return this.tree.removeNode(this, options);
    },

    /**
    Returns the total number of nodes contained within this node, including all
    descendants of this node's children.

    @method size
    @return {Number} Total number of nodes contained within this node, including
        all descendants.
    **/
    size: function () {
        var children = this.children,
            len      = children.length,
            total    = len;

        for (var i = 0; i < len; i++) {
            total += children[i].size();
        }

        return total;
    },

    /**
    Serializes this node to an object suitable for use in JSON.

    @method toJSON
    @return {Object} Serialized node object.
    **/
    toJSON: function () {
        var obj   = {},
            state = this.state,
            i, key, len;

        // Do nothing if this node is marked as destroyed.
        if (state.destroyed) {
            return null;
        }

        // Serialize properties explicitly marked as serializable.
        for (i = 0, len = this._serializable.length; i < len; i++) {
            key = this._serializable[i];

            if (key in this) {
                obj[key] = this[key];
            }
        }

        // Serialize child nodes.
        if (this.canHaveChildren) {
            obj.children = [];

            for (i = 0, len = this.children.length; i < len; i++) {
                obj.children.push(this.children[i].toJSON());
            }
        }

        return obj;
    },

    /**
    Performs a depth-first traversal of this node, passing it and each of its
    descendants to the specified _callback_.

    If the callback function returns `Tree.STOP_TRAVERSAL`, traversal will be
    stopped immediately. Otherwise, it will continue until the deepest
    descendant of _node_ has been traversed, or until each branch has been
    traversed to the optional maximum depth limit.

    Since traversal is depth-first, that means nodes are traversed like this:

                1
              / | \
             2  8  9
            / \     \
           3   7    10
         / | \      / \
        4  5  6    11 12

    @method traverse
    @param {Object} [options] Options.
        @param {Number} [options.depth] Depth limit. If specified, descendants
            will only be traversed to this depth before backtracking and moving
            on.
    @param {Function} callback Callback function to call with the traversed
        node and each of its descendants.

        @param {Tree.Node} callback.node Node being traversed.

    @param {Object} [thisObj] `this` object to use when executing _callback_.
    @return {Mixed} Returns `Tree.STOP_TRAVERSAL` if traversal was stopped;
        otherwise returns `undefined`.
    **/
    traverse: function (options, callback, thisObj) {
        return this.tree.traverseNode(this, options, callback, thisObj);
    },

    // -- Protected Methods ----------------------------------------------------
    _reindex: function () {
        var children = this.children,
            indexMap = {},
            i, len;

        for (i = 0, len = children.length; i < len; i++) {
            indexMap[children[i].id] = i;
        }

        this._indexMap     = indexMap;
        this._isIndexStale = false;
    }
};

Y.namespace('Tree').Node = TreeNode;


}, '3.15.0');
