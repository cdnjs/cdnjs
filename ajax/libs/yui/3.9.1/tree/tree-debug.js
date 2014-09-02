YUI.add('tree', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Provides a generic tree data structure and related functionality.

A tree has a root node, which may contain any number of child nodes, which may
themselves contain child nodes, ad infinitum.

Child nodes are lightweight function instances which delegate to the tree for
all significant functionality, so trees remain performant and memory-efficient
even with thousands and thousands of nodes.

@module tree
@main tree
**/

/**
The `Tree` class represents a generic tree data structure. A tree has a root
node, which may contain any number of child nodes, which may themselves contain
child nodes, ad infinitum.

This class doesn't expose any UI, but is intended to be used as a data structure
or base class for other components. For example, the SmugMug TreeView gallery
module extends Tree and provides a TreeView UI.

@class Tree
@param {Object} [config] Config options.
    @param {Object[]|Tree.Node[]} [config.nodes] Array of tree node config
        objects or `Tree.Node` instances to add to this tree at initialization
        time.
    @param {Object|Tree.Node} [config.rootNode] Node to use as the root node of
        this tree.
@constructor
@extends Base
**/

var Lang = Y.Lang,

    /**
    Fired when a node is added to this Tree. The `src` property will indicate
    how the node was added ("append", "insert", "prepend", etc.).

    @event add
    @param {Number} index Index at which the node will be added.
    @param {Tree.Node} node Node being added.
    @param {Tree.Node} parent Parent node to which the node will be added.
    @param {String} src Source of the event ("append", "insert", "prepend",
        etc.).
    @preventable _defAddFn
    **/
    EVT_ADD = 'add',

    /**
    Fired when this Tree is cleared.

    @event clear
    @param {Tree.Node} rootNode New root node of this tree (the old root node is
        always destroyed when a tree is cleared).
    @param {String} src Source of the event.
    @preventable _defClearFn
    **/
    EVT_CLEAR = 'clear',

    /**
    Fired when a node is removed from this Tree.

    @event remove
    @param {Boolean} destroy Whether or not the node will be destroyed after
        being removed from this tree.
    @param {Tree.Node} node Node being removed.
    @param {Tree.Node} parent Parent node from which the node will be removed.
    @param {String} src Source of the event.
    @preventable _defRemoveFn
    **/
    EVT_REMOVE = 'remove';

var Tree = Y.Base.create('tree', Y.Base, [], {
    // -- Public Properties ----------------------------------------------------

    /**
    Reference to the `children` array of this Tree's `rootNode`.

    This is a convenience property to allow you to type `tree.children` instead
    of `tree.rootNode.children`.

    @property {Tree.Node[]} children
    @readOnly
    **/

    /**
    The `Tree.Node` class or subclass that should be used for nodes created by
    this tree.

    You may specify an actual class reference or a string that resolves to a
    class reference at runtime.

    @property {String|Tree.Node} nodeClass
    @default Y.Tree.Node
    **/
    nodeClass: Y.Tree.Node,

    /**
    Optional array containing one or more extension classes that should be mixed
    into the `nodeClass` when this Tree is instantiated. The resulting composed
    node class will be unique to this Tree instance and will not affect any
    other instances, nor will it modify the defined `nodeClass` itself.

    This provides a late-binding extension mechanism for nodes that doesn't
    require them to extend `Y.Base`, which would incur a significant performance
    hit.

    @property {Array} nodeExtensions
    @default []
    **/
    nodeExtensions: [],

    /**
    Root node of this Tree.

    @property {Tree.Node} rootNode
    @readOnly
    **/

    // -- Protected Properties -------------------------------------------------

    /**
    Simple way to type-check that this is a Tree instance.

    @property {Boolean} _isYUITree
    @default true
    @protected
    **/
    _isYUITree: true,

    /**
    Composed node class based on `nodeClass` that mixes in any extensions
    specified in `nodeExtensions`. If there are no extensions, this will just be
    a reference to `nodeClass`.

    @property {Tree.Node} _nodeClass
    @protected
    **/

    /**
    Mapping of node ids to node instances for nodes in this tree.

    @property {Object} _nodeMap
    @protected
    **/

    /**
    Default config object for the root node.

    @property {Object} _rootNodeConfig
    @protected
    **/
    _rootNodeConfig: {canHaveChildren: true},

    // -- Lifecycle ------------------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        if (config.nodeClass) {
            this.nodeClass = config.nodeClass;
        }

        if (config.nodeExtensions) {
            this.nodeExtensions = this.nodeExtensions.concat(config.nodeExtensions);
        }

        /**
        Hash of published custom events.

        @property {Object} _published
        @default {}
        @protected
        **/
        this._published || (this._published = {});
        this._nodeMap = {};

        // Allow all extensions to initialize, then finish up.
        this.onceAfter('initializedChange', function () {
            this._composeNodeClass();

            this.clear(config.rootNode, {silent: true});

            if (config.nodes) {
                this.insertNode(this.rootNode, config.nodes, {silent: true});
            }
        });
    },

    destructor: function () {
        this.destroyNode(this.rootNode, {silent: true});

        this.children   = null;
        this.rootNode   = null;
        this._nodeClass = null;
        this._nodeMap   = null;
        this._published = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Appends a node or array of nodes as the last child of the specified parent
    node.

    If a node being appended is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method appendNode
    @param {Tree.Node} parent Parent node.
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config
        object, array of child nodes, or array of node config objects to append
        to the given parent. Node config objects will automatically be converted
        into node instances.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were
        appended.
    **/
    appendNode: function (parent, node, options) {
        return this.insertNode(parent, node, Y.merge(options, {
            index: parent.children.length,
            src  : 'append'
        }));
    },

    /**
    Clears this tree by destroying the root node and all its children. If a
    `rootNode` argument is provided, that node will become the root node of this
    tree; otherwise, a new root node will be created.

    @method clear
    @param {Object|Tree.Node} [rootNode] If specified, this node will be used as
        the new root node.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `clear` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    clear: function (rootNode, options) {
        return this._fireTreeEvent(EVT_CLEAR, {
            rootNode: this.createNode(rootNode || this._rootNodeConfig),
            src     : options && options.src
        }, {
            defaultFn: this._defClearFn,
            silent   : options && options.silent
        });
    },

    /**
    Creates and returns a new `Tree.Node` instance associated with (but not
    yet appended to) this tree.

    @method createNode
    @param {Object|Tree.Node} [config] Node configuration. If a `Tree.Node`
        instance is specified instead of a config object, that node will be
        adopted into this tree (if it doesn't already belong to this tree) and
        removed from any other tree to which it belongs.
    @return {Tree.Node} New node.
    **/
    createNode: function (config) {
        config || (config = {});

        // If `config` is already a node, just ensure it's in the node map and
        // return it.
        if (config._isYUITreeNode) {
            this._adoptNode(config);
            return config;
        }

        // First, create nodes for any children of this node.
        if (config.children) {
            var children = [];

            for (var i = 0, len = config.children.length; i < len; i++) {
                children.push(this.createNode(config.children[i]));
            }

            config = Y.merge(config, {children: children});
        }

        var node = new this._nodeClass(this, config);

        return this._nodeMap[node.id] = node;
    },

    /**
    Removes and destroys a node and all its child nodes. Once destroyed, a node
    is eligible for garbage collection and cannot be reused or re-added to the
    tree.

    @method destroyNode
    @param {Tree.Node} node Node to destroy.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, `remove` events will
            be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting events. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    destroyNode: function (node, options) {
        var child, i, len;

        options || (options = {});

        for (i = 0, len = node.children.length; i < len; i++) {
            child = node.children[i];

            // Manually remove the child from its parent; this makes destroying
            // all children of the parent much faster since there's no splicing
            // involved.
            child.parent = null;

            // Destroy the child.
            this.destroyNode(child, options);
        }

        if (node.parent) {
            this.removeNode(node, options);
        }

        node.children  = null;
        node.data      = null;
        node.state     = {destroyed: true};
        node.tree      = null;
        node._htmlNode = null;
        node._indexMap = null;

        delete this._nodeMap[node.id];

        return this;
    },

    /**
    Removes all children from the specified node. The removed children will
    still be reusable unless the `destroy` option is truthy.

    @method emptyNode
    @param {Tree.Node} node Node to empty.
    @param {Object} [options] Options.
        @param {Boolean} [options.destroy=false] If `true`, the children will
            also be destroyed, which makes them available for garbage collection
            and means they can't be reused.
        @param {Boolean} [options.silent=false] If `true`, `remove` events will
            be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting events. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @return {Tree.Node[]} Array of removed child nodes.
    **/
    emptyNode: function (node, options) {
        var removed = [];

        while (node.children.length) {
            removed.push(this.removeNode(node.children[0], options));
        }

        return removed;
    },

    /**
    Returns the tree node with the specified id, or `undefined` if the node
    doesn't exist in this tree.

    @method getNodeById
    @param {String} id Node id.
    @return {Tree.Node} Node, or `undefined` if not found.
    **/
    getNodeById: function (id) {
        return this._nodeMap[id];
    },

    /**
    Inserts a node or array of nodes at the specified index under the given
    parent node, or appends them to the parent if no index is specified.

    If a node being inserted is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method insertNode
    @param {Tree.Node} parent Parent node.
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
    insertNode: function (parent, node, options) {
        options || (options = {});
        parent  || (parent = this.rootNode);

        var index = options.index;

        if (typeof index === 'undefined') {
            index = parent.children.length;
        }

        // If `node` is an array, recurse to insert each node it contains.
        //
        // Note: If you're getting an exception here because `node` is null when
        // you've passed in a reference to some other node's `children` array,
        // that's happening because nodes must be removed from their current
        // parent before being added to the new one, and the `children` array is
        // being modified while the nodes are inserted.
        //
        // Solution: pass a copy of the other node's `children` array instead of
        // the original. Doing the copy operation here would have a negative
        // impact on performance, so you're on your own since this is such a
        // rare edge case.
        if ('length' in node && Lang.isArray(node)) {
            var inserted = [];

            for (var i = 0, len = node.length; i < len; i++) {
                inserted.push(this.insertNode(parent, node[i], options));

                if ('index' in options) {
                    options.index += 1;
                }
            }

            return inserted;
        }

        node = this.createNode(node);

        this._fireTreeEvent(EVT_ADD, {
            index : index,
            node  : node,
            parent: parent,
            src   : options.src || 'insert'
        }, {
            defaultFn: this._defAddFn,
            silent   : options.silent
        });

        return node;
    },

    /**
    Prepends a node or array of nodes at the beginning of the specified parent
    node.

    If a node being prepended is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method prependNode
    @param {Tree.Node} parent Parent node.
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node,
        node config object, array of child nodes, or array of node config
        objects to prepend to the given parent. Node config objects will
        automatically be converted into node instances.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were
        prepended.
    **/
    prependNode: function (parent, node, options) {
        return this.insertNode(parent, node, Y.merge(options, {
            index: 0,
            src  : 'prepend'
        }));
    },

    /**
    Removes the specified node from its parent node. The removed node will still
    be reusable unless the `destroy` option is truthy.

    @method removeNode
    @param {Tree.Node} node Node to remove.
    @param {Object} [options] Options.
        @param {Boolean} [options.destroy=false] If `true`, the node and all its
            children will also be destroyed, which makes them available for
            garbage collection and means they can't be reused.
        @param {Boolean} [options.silent=false] If `true`, the `remove` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @return {Tree.Node} Node that was removed.
    **/
    removeNode: function (node, options) {
        options || (options = {});

        this._fireTreeEvent(EVT_REMOVE, {
            destroy: !!options.destroy,
            node   : node,
            parent : node.parent,
            src    : options.src || 'remove'
        }, {
            defaultFn: this._defRemoveFn,
            silent   : options.silent
        });

        return node;
    },

    /**
    Returns the total number of nodes in this tree, at all levels.

    Use `rootNode.children.length` to get only the number of top-level nodes.

    @method size
    @return {Number} Total number of nodes in this tree.
    **/
    size: function () {
        return this.rootNode.size();
    },

    /**
    Serializes this tree to an object suitable for use in JSON.

    @method toJSON
    @return {Object} Serialized tree object.
    **/
    toJSON: function () {
        return this.rootNode.toJSON();
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Moves the specified node and all its children from another tree to this
    tree.

    @method _adoptNode
    @param {Tree.Node} node Node to adopt.
    @param {Object} [options] Options to pass along to `removeNode()`.
    @protected
    **/
    _adoptNode: function (node, options) {
        var oldTree = node.tree;

        if (oldTree === this) {
            return;
        }

        for (var i = 0, len = node.children.length; i < len; i++) {
            this._adoptNode(node.children[i], {silent: true});
        }

        oldTree.removeNode(node, options);
        delete oldTree._nodeMap[node.id];

        // If this node isn't an instance of this tree's composed _nodeClass,
        // then we need to recreate it to avoid potentially breaking things in
        // really weird ways.
        if (!(node instanceof this._nodeClass)
                || oldTree._nodeClass !== this._nodeClass) {

            node = this.createNode(node.toJSON());
        }

        node.tree = this;
        this._nodeMap[node.id] = node;
    },

    /**
    Composes a custom late-bound tree node class (if necessary) based on the
    classes specified in this Tree's `nodeClass` and `nodeExtensions`
    properties.

    The composed class is stored in this Tree's `_nodeClass` property. If
    composition wasn't necessary, then `_nodeClass` will just be a reference to
    `nodeClass`.

    @method _composeNodeClass
    @protected
    **/
    _composeNodeClass: function () {
        var nodeClass      = this.nodeClass,
            nodeExtensions = this.nodeExtensions,
            composedClass;

        if (typeof nodeClass === 'string') {
            // Look for a namespaced node class on `Y`.
            nodeClass = Y.Object.getValue(Y, nodeClass.split('.'));

            if (nodeClass) {
                this.nodeClass = nodeClass;
            } else {
                Y.error('Tree: Node class not found: ' + nodeClass);
                return;
            }
        }

        if (!nodeExtensions.length) {
            this._nodeClass = nodeClass;
            return;
        }

        // Compose a new class by mixing extensions into nodeClass.
        composedClass = function () {
            var extensions = composedClass._nodeExtensions;

            nodeClass.apply(this, arguments);

            for (var i = 0, len = extensions.length; i < len; i++) {
                extensions[i].apply(this, arguments);
            }
        };

        Y.extend(composedClass, nodeClass);

        for (var i = 0, len = nodeExtensions.length; i < len; i++) {
            Y.mix(composedClass.prototype, nodeExtensions[i].prototype, true);
        }

        composedClass._nodeExtensions = nodeExtensions;
        this._nodeClass = composedClass;
    },

    /**
    Utility method for lazily publishing and firing events.

    @method _fireTreeEvent
    @param {String} name Event name to fire.
    @param {Object} facade Event facade.
    @param {Object} [options] Options.
        @param {Function} [options.defaultFn] Default handler for this event.
        @param {Boolean} [options.silent=false] Whether the default handler
            should be executed directly without actually firing the event.
    @chainable
    @protected
    **/
    _fireTreeEvent: function (name, facade, options) {
        if (options && options.silent) {
            if (options.defaultFn) {
                options.defaultFn.call(this, facade);
            }
        } else {
            if (options && options.defaultFn && !this._published[name]) {
                this._published[name] = this.publish(name, {
                    defaultFn: options.defaultFn
                });
            }

            this.fire(name, facade);
        }

        return this;
    },

    /**
    Removes the specified node from its parent node if it has one.

    @method _removeNodeFromParent
    @param {Tree.Node} node Node to remove.
    @protected
    **/
    _removeNodeFromParent: function (node) {
        var parent = node.parent,
            index;

        if (parent) {
            index = parent.indexOf(node);

            if (index > -1) {
                parent.children.splice(index, 1);
                parent._isIndexStale = true;
                node.parent = null;
            }
        }
    },

    // -- Default Event Handlers -----------------------------------------------
    _defAddFn: function (e) {
        var node   = e.node,
            parent = e.parent;

        // Remove the node from its existing parent if it has one.
        if (node.parent) {
            this._removeNodeFromParent(node);
        }

        // Add the node to its new parent at the desired index.
        node.parent = parent;
        parent.children.splice(e.index, 0, node);

        parent.canHaveChildren = true;
        parent._isIndexStale   = true;
    },

    _defClearFn: function (e) {
        var newRootNode = e.rootNode;

        if (this.rootNode) {
            this.destroyNode(this.rootNode, {silent: true});
        }

        this._nodeMap = {};
        this._nodeMap[newRootNode.id] = newRootNode;

        this.rootNode = newRootNode;
        this.children = newRootNode.children;
    },

    _defRemoveFn: function (e) {
        var node = e.node;

        if (e.destroy) {
            this.destroyNode(node, {silent: true});
        } else if (e.parent) {
            this._removeNodeFromParent(node);
        } else if (this.rootNode === node) {
            // Guess we'll need a new root node!
            this.rootNode = this.createNode(this._rootNodeConfig);
            this.children = this.rootNode.children;
        }
    }
});

Y.Tree = Y.mix(Tree, Y.Tree);


}, '@VERSION@', {"requires": ["base-build", "tree-node"]});
