if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/tree/tree.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree/tree.js",
    code: []
};
_yuitest_coverage["build/tree/tree.js"].code=["YUI.add('tree', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Provides a generic tree data structure and related functionality.","","A tree has a root node, which may contain any number of child nodes, which may","themselves contain child nodes, ad infinitum.","","Child nodes are lightweight function instances which delegate to the tree for","all significant functionality, so trees remain performant and memory-efficient","even with thousands and thousands of nodes.","","@module tree","@main tree","**/","","/**","The `Tree` class represents a generic tree data structure. A tree has a root","node, which may contain any number of child nodes, which may themselves contain","child nodes, ad infinitum.","","This class doesn't expose any UI, but is intended to be used as a data structure","or base class for other components. For example, the SmugMug TreeView gallery","module extends Tree and provides a TreeView UI.","","@class Tree","@param {Object} [config] Config options.","    @param {Object[]|Tree.Node[]} [config.nodes] Array of tree node config","        objects or `Tree.Node` instances to add to this tree at initialization","        time.","    @param {Object|Tree.Node} [config.rootNode] Node to use as the root node of","        this tree.","@constructor","@extends Base","**/","","var Lang = Y.Lang,","","    /**","    Fired when a node is added to this Tree. The `src` property will indicate","    how the node was added (\"append\", \"insert\", \"prepend\", etc.).","","    @event add","    @param {Number} index Index at which the node will be added.","    @param {Tree.Node} node Node being added.","    @param {Tree.Node} parent Parent node to which the node will be added.","    @param {String} src Source of the event (\"append\", \"insert\", \"prepend\",","        etc.).","    @preventable _defAddFn","    **/","    EVT_ADD = 'add',","","    /**","    Fired when this Tree is cleared.","","    @event clear","    @param {Tree.Node} rootNode New root node of this tree (the old root node is","        always destroyed when a tree is cleared).","    @preventable _defClearFn","    **/","    EVT_CLEAR = 'clear',","","    /**","    Fired when a node is removed from this Tree.","","    @event remove","    @param {Boolean} destroy Whether or not the node will be destroyed after","        being removed from this tree.","    @param {Tree.Node} node Node being removed.","    @param {Tree.Node} parent Parent node from which the node will be removed.","    @preventable _defRemoveFn","    **/","    EVT_REMOVE = 'remove';","","var Tree = Y.Base.create('tree', Y.Base, [], {","    // -- Public Properties ----------------------------------------------------","","    /**","    Reference to the `children` array of this Tree's `rootNode`.","","    This is a convenience property to allow you to type `tree.children` instead","    of `tree.rootNode.children`.","","    @property {Tree.Node[]} children","    @readOnly","    **/","","    /**","    The `Tree.Node` class or subclass that should be used for nodes created by","    this tree.","","    You may specify an actual class reference or a string that resolves to a","    class reference at runtime.","","    @property {String|Tree.Node} nodeClass","    @default Y.Tree.Node","    **/","    nodeClass: Y.Tree.Node,","","    /**","    Optional array containing one or more extension classes that should be mixed","    into the `nodeClass` when this Tree is instantiated. The resulting composed","    node class will be unique to this Tree instance and will not affect any","    other instances, nor will it modify the defined `nodeClass` itself.","","    This provides a late-binding extension mechanism for nodes that doesn't","    require them to extend `Y.Base`, which would incur a significant performance","    hit.","","    @property {Array} nodeExtensions","    @default []","    **/","    nodeExtensions: [],","","    /**","    Root node of this Tree.","","    @property {Tree.Node} rootNode","    @readOnly","    **/","","    // -- Protected Properties -------------------------------------------------","","    /**","    Simple way to type-check that this is a Tree instance.","","    @property {Boolean} _isYUITree","    @default true","    @protected","    **/","    _isYUITree: true,","","    /**","    Composed node class based on `nodeClass` that mixes in any extensions","    specified in `nodeExtensions`. If there are no extensions, this will just be","    a reference to `nodeClass`.","","    @property {Tree.Node} _nodeClass","    @protected","    **/","","    /**","    Mapping of node ids to node instances for nodes in this tree.","","    @property {Object} _nodeMap","    @protected","    **/","","    /**","    Default config object for the root node.","","    @property {Object} _rootNodeConfig","    @protected","    **/","    _rootNodeConfig: {canHaveChildren: true},","","    // -- Lifecycle ------------------------------------------------------------","    initializer: function (config) {","        config || (config = {});","","        if (config.nodeClass) {","            this.nodeClass = config.nodeClass;","        }","","        if (config.nodeExtensions) {","            this.nodeExtensions = this.nodeExtensions.concat(config.nodeExtensions);","        }","","        /**","        Hash of published custom events.","","        @property {Object} _published","        @default {}","        @protected","        **/","        this._published || (this._published = {});","        this._nodeMap = {};","","        // Allow all extensions to initialize, then finish up.","        this.onceAfter('initializedChange', function () {","            this._composeNodeClass();","","            this.clear(config.rootNode, {silent: true});","","            if (config.nodes) {","                this.insertNode(this.rootNode, config.nodes, {silent: true});","            }","        });","    },","","    destructor: function () {","        this.destroyNode(this.rootNode, {silent: true});","","        this.children   = null;","        this.rootNode   = null;","        this._nodeClass = null;","        this._nodeMap   = null;","        this._published = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Appends a node or array of nodes as the last child of the specified parent","    node.","","    If a node being appended is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method appendNode","    @param {Tree.Node} parent Parent node.","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to append","        to the given parent. Node config objects will automatically be converted","        into node instances.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were","        appended.","    **/","    appendNode: function (parent, node, options) {","        return this.insertNode(parent, node, Y.merge(options, {","            index: parent.children.length,","            src  : 'append'","        }));","    },","","    /**","    Clears this tree by destroying the root node and all its children. If a","    `rootNode` argument is provided, that node will become the root node of this","    tree; otherwise, a new root node will be created.","","    @method clear","    @param {Object|Tree.Node} [rootNode] If specified, this node will be used as","        the new root node.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `clear` event","            will be suppressed.","    @chainable","    **/","    clear: function (rootNode, options) {","        return this._fireTreeEvent(EVT_CLEAR, {","            rootNode: this.createNode(rootNode || this._rootNodeConfig)","        }, {","            defaultFn: this._defClearFn,","            silent   : options && options.silent","        });","    },","","    /**","    Creates and returns a new `Tree.Node` instance associated with (but not","    yet appended to) this tree.","","    @method createNode","    @param {Object|Tree.Node} [config] Node configuration. If a `Tree.Node`","        instance is specified instead of a config object, that node will be","        adopted into this tree (if it doesn't already belong to this tree) and","        removed from any other tree to which it belongs.","    @return {Tree.Node} New node.","    **/","    createNode: function (config) {","        config || (config = {});","","        // If `config` is already a node, just ensure it's in the node map and","        // return it.","        if (config._isYUITreeNode) {","            this._adoptNode(config);","            return config;","        }","","        // First, create nodes for any children of this node.","        if (config.children) {","            var children = [];","","            for (var i = 0, len = config.children.length; i < len; i++) {","                children.push(this.createNode(config.children[i]));","            }","","            config = Y.merge(config, {children: children});","        }","","        var node = new this._nodeClass(this, config);","","        return this._nodeMap[node.id] = node;","    },","","    /**","    Removes and destroys a node and all its child nodes. Once destroyed, a node","    is eligible for garbage collection and cannot be reused or re-added to the","    tree.","","    @method destroyNode","    @param {Tree.Node} node Node to destroy.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, `remove` events will","            be suppressed.","    @chainable","    **/","    destroyNode: function (node, options) {","        var child, i, len;","","        options || (options = {});","","        for (i = 0, len = node.children.length; i < len; i++) {","            child = node.children[i];","","            // Manually remove the child from its parent; this makes destroying","            // all children of the parent much faster since there's no splicing","            // involved.","            child.parent = null;","","            // Destroy the child.","            this.destroyNode(child, options);","        }","","        if (node.parent) {","            this.removeNode(node, options);","        }","","        node.children  = null;","        node.data      = null;","        node.state     = {destroyed: true};","        node.tree      = null;","        node._htmlNode = null;","        node._indexMap = null;","","        delete this._nodeMap[node.id];","","        return this;","    },","","    /**","    Removes all children from the specified node. The removed children will","    still be reusable unless the `destroy` option is truthy.","","    @method emptyNode","    @param {Tree.Node} node Node to empty.","    @param {Object} [options] Options.","        @param {Boolean} [options.destroy=false] If `true`, the children will","            also be destroyed, which makes them available for garbage collection","            and means they can't be reused.","        @param {Boolean} [options.silent=false] If `true`, `remove` events will","            be suppressed.","    @return {Tree.Node[]} Array of removed child nodes.","    **/","    emptyNode: function (node, options) {","        var removed = [];","","        while (node.children.length) {","            removed.push(this.removeNode(node.children[0], options));","        }","","        return removed;","    },","","    /**","    Returns the tree node with the specified id, or `undefined` if the node","    doesn't exist in this tree.","","    @method getNodeById","    @param {String} id Node id.","    @return {Tree.Node} Node, or `undefined` if not found.","    **/","    getNodeById: function (id) {","        return this._nodeMap[id];","    },","","    /**","    Inserts a node or array of nodes at the specified index under the given","    parent node, or appends them to the parent if no index is specified.","","    If a node being inserted is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method insertNode","    @param {Tree.Node} parent Parent node.","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to insert","        under the given parent. Node config objects will automatically be","        converted into node instances.","","    @param {Object} [options] Options.","        @param {Number} [options.index] Index at which to insert the child node.","            If not specified, the node will be appended as the last child of the","            parent.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","","    @return {Tree.Node[]} Node or array of nodes that were inserted.","    **/","    insertNode: function (parent, node, options) {","        options || (options = {});","        parent  || (parent = this.rootNode);","","        var index = options.index;","","        if (typeof index === 'undefined') {","            index = parent.children.length;","        }","","        // If `node` is an array, recurse to insert each node it contains.","        //","        // Note: If you're getting an exception here because `node` is null when","        // you've passed in a reference to some other node's `children` array,","        // that's happening because nodes must be removed from their current","        // parent before being added to the new one, and the `children` array is","        // being modified while the nodes are inserted.","        //","        // Solution: pass a copy of the other node's `children` array instead of","        // the original. Doing the copy operation here would have a negative","        // impact on performance, so you're on your own since this is such a","        // rare edge case.","        if ('length' in node && Lang.isArray(node)) {","            var inserted = [];","","            for (var i = 0, len = node.length; i < len; i++) {","                inserted.push(this.insertNode(parent, node[i], options));","","                if ('index' in options) {","                    options.index += 1;","                }","            }","","            return inserted;","        }","","        node = this.createNode(node);","","        this._fireTreeEvent(EVT_ADD, {","            index : index,","            node  : node,","            parent: parent,","            src   : options.src || 'insert'","        }, {","            defaultFn: this._defAddFn,","            silent   : options.silent","        });","","        return node;","    },","","    /**","    Prepends a node or array of nodes at the beginning of the specified parent","    node.","","    If a node being prepended is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method prependNode","    @param {Tree.Node} parent Parent node.","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node,","        node config object, array of child nodes, or array of node config","        objects to prepend to the given parent. Node config objects will","        automatically be converted into node instances.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were","        prepended.","    **/","    prependNode: function (parent, node, options) {","        return this.insertNode(parent, node, Y.merge(options, {","            index: 0,","            src  : 'prepend'","        }));","    },","","    /**","    Removes the specified node from its parent node. The removed node will still","    be reusable unless the `destroy` option is truthy.","","    @method removeNode","    @param {Tree.Node} node Node to remove.","    @param {Object} [options] Options.","        @param {Boolean} [options.destroy=false] If `true`, the node and all its","            children will also be destroyed, which makes them available for","            garbage collection and means they can't be reused.","        @param {Boolean} [options.silent=false] If `true`, the `remove` event","            will be suppressed.","    @return {Tree.Node} Node that was removed.","    **/","    removeNode: function (node, options) {","        options || (options = {});","","        this._fireTreeEvent(EVT_REMOVE, {","            destroy: !!options.destroy,","            node   : node,","            parent : node.parent,","            src    : options.src || 'remove'","        }, {","            defaultFn: this._defRemoveFn,","            silent   : options.silent","        });","","        return node;","    },","","    /**","    Returns the total number of nodes in this tree, at all levels.","","    Use `rootNode.children.length` to get only the number of top-level nodes.","","    @method size","    @return {Number} Total number of nodes in this tree.","    **/","    size: function () {","        return this.rootNode.size();","    },","","    /**","    Serializes this tree to an object suitable for use in JSON.","","    @method toJSON","    @return {Object} Serialized tree object.","    **/","    toJSON: function () {","        return this.rootNode.toJSON();","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Moves the specified node and all its children from another tree to this","    tree.","","    @method _adoptNode","    @param {Tree.Node} node Node to adopt.","    @param {Object} [options] Options to pass along to `removeNode()`.","    @protected","    **/","    _adoptNode: function (node, options) {","        var oldTree = node.tree;","","        if (oldTree === this) {","            return;","        }","","        for (var i = 0, len = node.children.length; i < len; i++) {","            this._adoptNode(node.children[i], {silent: true});","        }","","        oldTree.removeNode(node, options);","        delete oldTree._nodeMap[node.id];","","        // If this node isn't an instance of this tree's composed _nodeClass,","        // then we need to recreate it to avoid potentially breaking things in","        // really weird ways.","        if (!(node instanceof this._nodeClass)","                || oldTree._nodeClass !== this._nodeClass) {","","            node = this.createNode(node.toJSON());","        }","","        node.tree = this;","        this._nodeMap[node.id] = node;","    },","","    /**","    Composes a custom late-bound tree node class (if necessary) based on the","    classes specified in this Tree's `nodeClass` and `nodeExtensions`","    properties.","","    The composed class is stored in this Tree's `_nodeClass` property. If","    composition wasn't necessary, then `_nodeClass` will just be a reference to","    `nodeClass`.","","    @method _composeNodeClass","    @protected","    **/","    _composeNodeClass: function () {","        var nodeClass      = this.nodeClass,","            nodeExtensions = this.nodeExtensions,","            composedClass;","","        if (typeof nodeClass === 'string') {","            // Look for a namespaced node class on `Y`.","            nodeClass = Y.Object.getValue(Y, nodeClass.split('.'));","","            if (nodeClass) {","                this.nodeClass = nodeClass;","            } else {","                Y.error('Tree: Node class not found: ' + nodeClass);","                return;","            }","        }","","        if (!nodeExtensions.length) {","            this._nodeClass = nodeClass;","            return;","        }","","        // Compose a new class by mixing extensions into nodeClass.","        composedClass = function () {","            var extensions = composedClass._nodeExtensions;","","            nodeClass.apply(this, arguments);","","            for (var i = 0, len = extensions.length; i < len; i++) {","                extensions[i].apply(this, arguments);","            }","        };","","        Y.extend(composedClass, nodeClass);","","        for (var i = 0, len = nodeExtensions.length; i < len; i++) {","            Y.mix(composedClass.prototype, nodeExtensions[i].prototype, true);","        }","","        composedClass._nodeExtensions = nodeExtensions;","        this._nodeClass = composedClass;","    },","","    /**","    Utility method for lazily publishing and firing events.","","    @method _fireTreeEvent","    @param {String} name Event name to fire.","    @param {Object} facade Event facade.","    @param {Object} [options] Options.","        @param {Function} [options.defaultFn] Default handler for this event.","        @param {Boolean} [options.silent=false] Whether the default handler","            should be executed directly without actually firing the event.","    @chainable","    @protected","    **/","    _fireTreeEvent: function (name, facade, options) {","        if (options && options.silent) {","            if (options.defaultFn) {","                options.defaultFn.call(this, facade);","            }","        } else {","            if (options && options.defaultFn && !this._published[name]) {","                this._published[name] = this.publish(name, {","                    defaultFn: options.defaultFn","                });","            }","","            this.fire(name, facade);","        }","","        return this;","    },","","    /**","    Removes the specified node from its parent node if it has one.","","    @method _removeNodeFromParent","    @param {Tree.Node} node Node to remove.","    @protected","    **/","    _removeNodeFromParent: function (node) {","        var parent = node.parent,","            index;","","        if (parent) {","            index = parent.indexOf(node);","","            if (index > -1) {","                parent.children.splice(index, 1);","                parent._isIndexStale = true;","                node.parent = null;","            }","        }","    },","","    // -- Default Event Handlers -----------------------------------------------","    _defAddFn: function (e) {","        var node   = e.node,","            parent = e.parent;","","        // Remove the node from its existing parent if it has one.","        if (node.parent) {","            this._removeNodeFromParent(node);","        }","","        // Add the node to its new parent at the desired index.","        node.parent = parent;","        parent.children.splice(e.index, 0, node);","","        parent.canHaveChildren = true;","        parent._isIndexStale   = true;","    },","","    _defClearFn: function (e) {","        var newRootNode = e.rootNode;","","        if (this.rootNode) {","            this.destroyNode(this.rootNode, {silent: true});","        }","","        this._nodeMap = {};","        this._nodeMap[newRootNode.id] = newRootNode;","","        this.rootNode = newRootNode;","        this.children = newRootNode.children;","    },","","    _defRemoveFn: function (e) {","        var node = e.node;","","        if (e.destroy) {","            this.destroyNode(node, {silent: true});","        } else if (e.parent) {","            this._removeNodeFromParent(node);","        } else if (this.rootNode === node) {","            // Guess we'll need a new root node!","            this.rootNode = this.createNode(this._rootNodeConfig);","            this.children = this.rootNode.children;","        }","    }","});","","Y.Tree = Y.mix(Tree, Y.Tree);","","","}, '@VERSION@', {\"requires\": [\"base-build\", \"tree-node\"]});"];
_yuitest_coverage["build/tree/tree.js"].lines = {"1":0,"39":0,"77":0,"161":0,"163":0,"164":0,"167":0,"168":0,"178":0,"179":0,"182":0,"183":0,"185":0,"187":0,"188":0,"194":0,"196":0,"197":0,"198":0,"199":0,"200":0,"225":0,"245":0,"265":0,"269":0,"270":0,"271":0,"275":0,"276":0,"278":0,"279":0,"282":0,"285":0,"287":0,"303":0,"305":0,"307":0,"308":0,"313":0,"316":0,"319":0,"320":0,"323":0,"324":0,"325":0,"326":0,"327":0,"328":0,"330":0,"332":0,"350":0,"352":0,"353":0,"356":0,"368":0,"395":0,"396":0,"398":0,"400":0,"401":0,"416":0,"417":0,"419":0,"420":0,"422":0,"423":0,"427":0,"430":0,"432":0,"442":0,"465":0,"486":0,"488":0,"498":0,"510":0,"520":0,"535":0,"537":0,"538":0,"541":0,"542":0,"545":0,"546":0,"551":0,"554":0,"557":0,"558":0,"574":0,"578":0,"580":0,"582":0,"583":0,"585":0,"586":0,"590":0,"591":0,"592":0,"596":0,"597":0,"599":0,"601":0,"602":0,"606":0,"608":0,"609":0,"612":0,"613":0,"630":0,"631":0,"632":0,"635":0,"636":0,"641":0,"644":0,"655":0,"658":0,"659":0,"661":0,"662":0,"663":0,"664":0,"671":0,"675":0,"676":0,"680":0,"681":0,"683":0,"684":0,"688":0,"690":0,"691":0,"694":0,"695":0,"697":0,"698":0,"702":0,"704":0,"705":0,"706":0,"707":0,"708":0,"710":0,"711":0,"716":0};
_yuitest_coverage["build/tree/tree.js"].functions = {"(anonymous 2):182":0,"initializer:160":0,"destructor:193":0,"appendNode:224":0,"clear:244":0,"createNode:264":0,"destroyNode:302":0,"emptyNode:349":0,"getNodeById:367":0,"insertNode:394":0,"prependNode:464":0,"removeNode:485":0,"size:509":0,"toJSON:519":0,"_adoptNode:534":0,"composedClass:596":0,"_composeNodeClass:573":0,"_fireTreeEvent:629":0,"_removeNodeFromParent:654":0,"_defAddFn:670":0,"_defClearFn:687":0,"_defRemoveFn:701":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree/tree.js"].coveredLines = 144;
_yuitest_coverage["build/tree/tree.js"].coveredFunctions = 23;
_yuitest_coverline("build/tree/tree.js", 1);
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

_yuitest_coverfunc("build/tree/tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree/tree.js", 39);
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
    @preventable _defRemoveFn
    **/
    EVT_REMOVE = 'remove';

_yuitest_coverline("build/tree/tree.js", 77);
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
        _yuitest_coverfunc("build/tree/tree.js", "initializer", 160);
_yuitest_coverline("build/tree/tree.js", 161);
config || (config = {});

        _yuitest_coverline("build/tree/tree.js", 163);
if (config.nodeClass) {
            _yuitest_coverline("build/tree/tree.js", 164);
this.nodeClass = config.nodeClass;
        }

        _yuitest_coverline("build/tree/tree.js", 167);
if (config.nodeExtensions) {
            _yuitest_coverline("build/tree/tree.js", 168);
this.nodeExtensions = this.nodeExtensions.concat(config.nodeExtensions);
        }

        /**
        Hash of published custom events.

        @property {Object} _published
        @default {}
        @protected
        **/
        _yuitest_coverline("build/tree/tree.js", 178);
this._published || (this._published = {});
        _yuitest_coverline("build/tree/tree.js", 179);
this._nodeMap = {};

        // Allow all extensions to initialize, then finish up.
        _yuitest_coverline("build/tree/tree.js", 182);
this.onceAfter('initializedChange', function () {
            _yuitest_coverfunc("build/tree/tree.js", "(anonymous 2)", 182);
_yuitest_coverline("build/tree/tree.js", 183);
this._composeNodeClass();

            _yuitest_coverline("build/tree/tree.js", 185);
this.clear(config.rootNode, {silent: true});

            _yuitest_coverline("build/tree/tree.js", 187);
if (config.nodes) {
                _yuitest_coverline("build/tree/tree.js", 188);
this.insertNode(this.rootNode, config.nodes, {silent: true});
            }
        });
    },

    destructor: function () {
        _yuitest_coverfunc("build/tree/tree.js", "destructor", 193);
_yuitest_coverline("build/tree/tree.js", 194);
this.destroyNode(this.rootNode, {silent: true});

        _yuitest_coverline("build/tree/tree.js", 196);
this.children   = null;
        _yuitest_coverline("build/tree/tree.js", 197);
this.rootNode   = null;
        _yuitest_coverline("build/tree/tree.js", 198);
this._nodeClass = null;
        _yuitest_coverline("build/tree/tree.js", 199);
this._nodeMap   = null;
        _yuitest_coverline("build/tree/tree.js", 200);
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
        _yuitest_coverfunc("build/tree/tree.js", "appendNode", 224);
_yuitest_coverline("build/tree/tree.js", 225);
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
    @chainable
    **/
    clear: function (rootNode, options) {
        _yuitest_coverfunc("build/tree/tree.js", "clear", 244);
_yuitest_coverline("build/tree/tree.js", 245);
return this._fireTreeEvent(EVT_CLEAR, {
            rootNode: this.createNode(rootNode || this._rootNodeConfig)
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
        _yuitest_coverfunc("build/tree/tree.js", "createNode", 264);
_yuitest_coverline("build/tree/tree.js", 265);
config || (config = {});

        // If `config` is already a node, just ensure it's in the node map and
        // return it.
        _yuitest_coverline("build/tree/tree.js", 269);
if (config._isYUITreeNode) {
            _yuitest_coverline("build/tree/tree.js", 270);
this._adoptNode(config);
            _yuitest_coverline("build/tree/tree.js", 271);
return config;
        }

        // First, create nodes for any children of this node.
        _yuitest_coverline("build/tree/tree.js", 275);
if (config.children) {
            _yuitest_coverline("build/tree/tree.js", 276);
var children = [];

            _yuitest_coverline("build/tree/tree.js", 278);
for (var i = 0, len = config.children.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 279);
children.push(this.createNode(config.children[i]));
            }

            _yuitest_coverline("build/tree/tree.js", 282);
config = Y.merge(config, {children: children});
        }

        _yuitest_coverline("build/tree/tree.js", 285);
var node = new this._nodeClass(this, config);

        _yuitest_coverline("build/tree/tree.js", 287);
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
    @chainable
    **/
    destroyNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "destroyNode", 302);
_yuitest_coverline("build/tree/tree.js", 303);
var child, i, len;

        _yuitest_coverline("build/tree/tree.js", 305);
options || (options = {});

        _yuitest_coverline("build/tree/tree.js", 307);
for (i = 0, len = node.children.length; i < len; i++) {
            _yuitest_coverline("build/tree/tree.js", 308);
child = node.children[i];

            // Manually remove the child from its parent; this makes destroying
            // all children of the parent much faster since there's no splicing
            // involved.
            _yuitest_coverline("build/tree/tree.js", 313);
child.parent = null;

            // Destroy the child.
            _yuitest_coverline("build/tree/tree.js", 316);
this.destroyNode(child, options);
        }

        _yuitest_coverline("build/tree/tree.js", 319);
if (node.parent) {
            _yuitest_coverline("build/tree/tree.js", 320);
this.removeNode(node, options);
        }

        _yuitest_coverline("build/tree/tree.js", 323);
node.children  = null;
        _yuitest_coverline("build/tree/tree.js", 324);
node.data      = null;
        _yuitest_coverline("build/tree/tree.js", 325);
node.state     = {destroyed: true};
        _yuitest_coverline("build/tree/tree.js", 326);
node.tree      = null;
        _yuitest_coverline("build/tree/tree.js", 327);
node._htmlNode = null;
        _yuitest_coverline("build/tree/tree.js", 328);
node._indexMap = null;

        _yuitest_coverline("build/tree/tree.js", 330);
delete this._nodeMap[node.id];

        _yuitest_coverline("build/tree/tree.js", 332);
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
    @return {Tree.Node[]} Array of removed child nodes.
    **/
    emptyNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "emptyNode", 349);
_yuitest_coverline("build/tree/tree.js", 350);
var removed = [];

        _yuitest_coverline("build/tree/tree.js", 352);
while (node.children.length) {
            _yuitest_coverline("build/tree/tree.js", 353);
removed.push(this.removeNode(node.children[0], options));
        }

        _yuitest_coverline("build/tree/tree.js", 356);
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
        _yuitest_coverfunc("build/tree/tree.js", "getNodeById", 367);
_yuitest_coverline("build/tree/tree.js", 368);
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

    @return {Tree.Node[]} Node or array of nodes that were inserted.
    **/
    insertNode: function (parent, node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "insertNode", 394);
_yuitest_coverline("build/tree/tree.js", 395);
options || (options = {});
        _yuitest_coverline("build/tree/tree.js", 396);
parent  || (parent = this.rootNode);

        _yuitest_coverline("build/tree/tree.js", 398);
var index = options.index;

        _yuitest_coverline("build/tree/tree.js", 400);
if (typeof index === 'undefined') {
            _yuitest_coverline("build/tree/tree.js", 401);
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
        _yuitest_coverline("build/tree/tree.js", 416);
if ('length' in node && Lang.isArray(node)) {
            _yuitest_coverline("build/tree/tree.js", 417);
var inserted = [];

            _yuitest_coverline("build/tree/tree.js", 419);
for (var i = 0, len = node.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 420);
inserted.push(this.insertNode(parent, node[i], options));

                _yuitest_coverline("build/tree/tree.js", 422);
if ('index' in options) {
                    _yuitest_coverline("build/tree/tree.js", 423);
options.index += 1;
                }
            }

            _yuitest_coverline("build/tree/tree.js", 427);
return inserted;
        }

        _yuitest_coverline("build/tree/tree.js", 430);
node = this.createNode(node);

        _yuitest_coverline("build/tree/tree.js", 432);
this._fireTreeEvent(EVT_ADD, {
            index : index,
            node  : node,
            parent: parent,
            src   : options.src || 'insert'
        }, {
            defaultFn: this._defAddFn,
            silent   : options.silent
        });

        _yuitest_coverline("build/tree/tree.js", 442);
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
        _yuitest_coverfunc("build/tree/tree.js", "prependNode", 464);
_yuitest_coverline("build/tree/tree.js", 465);
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
    @return {Tree.Node} Node that was removed.
    **/
    removeNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "removeNode", 485);
_yuitest_coverline("build/tree/tree.js", 486);
options || (options = {});

        _yuitest_coverline("build/tree/tree.js", 488);
this._fireTreeEvent(EVT_REMOVE, {
            destroy: !!options.destroy,
            node   : node,
            parent : node.parent,
            src    : options.src || 'remove'
        }, {
            defaultFn: this._defRemoveFn,
            silent   : options.silent
        });

        _yuitest_coverline("build/tree/tree.js", 498);
return node;
    },

    /**
    Returns the total number of nodes in this tree, at all levels.

    Use `rootNode.children.length` to get only the number of top-level nodes.

    @method size
    @return {Number} Total number of nodes in this tree.
    **/
    size: function () {
        _yuitest_coverfunc("build/tree/tree.js", "size", 509);
_yuitest_coverline("build/tree/tree.js", 510);
return this.rootNode.size();
    },

    /**
    Serializes this tree to an object suitable for use in JSON.

    @method toJSON
    @return {Object} Serialized tree object.
    **/
    toJSON: function () {
        _yuitest_coverfunc("build/tree/tree.js", "toJSON", 519);
_yuitest_coverline("build/tree/tree.js", 520);
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
        _yuitest_coverfunc("build/tree/tree.js", "_adoptNode", 534);
_yuitest_coverline("build/tree/tree.js", 535);
var oldTree = node.tree;

        _yuitest_coverline("build/tree/tree.js", 537);
if (oldTree === this) {
            _yuitest_coverline("build/tree/tree.js", 538);
return;
        }

        _yuitest_coverline("build/tree/tree.js", 541);
for (var i = 0, len = node.children.length; i < len; i++) {
            _yuitest_coverline("build/tree/tree.js", 542);
this._adoptNode(node.children[i], {silent: true});
        }

        _yuitest_coverline("build/tree/tree.js", 545);
oldTree.removeNode(node, options);
        _yuitest_coverline("build/tree/tree.js", 546);
delete oldTree._nodeMap[node.id];

        // If this node isn't an instance of this tree's composed _nodeClass,
        // then we need to recreate it to avoid potentially breaking things in
        // really weird ways.
        _yuitest_coverline("build/tree/tree.js", 551);
if (!(node instanceof this._nodeClass)
                || oldTree._nodeClass !== this._nodeClass) {

            _yuitest_coverline("build/tree/tree.js", 554);
node = this.createNode(node.toJSON());
        }

        _yuitest_coverline("build/tree/tree.js", 557);
node.tree = this;
        _yuitest_coverline("build/tree/tree.js", 558);
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
        _yuitest_coverfunc("build/tree/tree.js", "_composeNodeClass", 573);
_yuitest_coverline("build/tree/tree.js", 574);
var nodeClass      = this.nodeClass,
            nodeExtensions = this.nodeExtensions,
            composedClass;

        _yuitest_coverline("build/tree/tree.js", 578);
if (typeof nodeClass === 'string') {
            // Look for a namespaced node class on `Y`.
            _yuitest_coverline("build/tree/tree.js", 580);
nodeClass = Y.Object.getValue(Y, nodeClass.split('.'));

            _yuitest_coverline("build/tree/tree.js", 582);
if (nodeClass) {
                _yuitest_coverline("build/tree/tree.js", 583);
this.nodeClass = nodeClass;
            } else {
                _yuitest_coverline("build/tree/tree.js", 585);
Y.error('Tree: Node class not found: ' + nodeClass);
                _yuitest_coverline("build/tree/tree.js", 586);
return;
            }
        }

        _yuitest_coverline("build/tree/tree.js", 590);
if (!nodeExtensions.length) {
            _yuitest_coverline("build/tree/tree.js", 591);
this._nodeClass = nodeClass;
            _yuitest_coverline("build/tree/tree.js", 592);
return;
        }

        // Compose a new class by mixing extensions into nodeClass.
        _yuitest_coverline("build/tree/tree.js", 596);
composedClass = function () {
            _yuitest_coverfunc("build/tree/tree.js", "composedClass", 596);
_yuitest_coverline("build/tree/tree.js", 597);
var extensions = composedClass._nodeExtensions;

            _yuitest_coverline("build/tree/tree.js", 599);
nodeClass.apply(this, arguments);

            _yuitest_coverline("build/tree/tree.js", 601);
for (var i = 0, len = extensions.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 602);
extensions[i].apply(this, arguments);
            }
        };

        _yuitest_coverline("build/tree/tree.js", 606);
Y.extend(composedClass, nodeClass);

        _yuitest_coverline("build/tree/tree.js", 608);
for (var i = 0, len = nodeExtensions.length; i < len; i++) {
            _yuitest_coverline("build/tree/tree.js", 609);
Y.mix(composedClass.prototype, nodeExtensions[i].prototype, true);
        }

        _yuitest_coverline("build/tree/tree.js", 612);
composedClass._nodeExtensions = nodeExtensions;
        _yuitest_coverline("build/tree/tree.js", 613);
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
        _yuitest_coverfunc("build/tree/tree.js", "_fireTreeEvent", 629);
_yuitest_coverline("build/tree/tree.js", 630);
if (options && options.silent) {
            _yuitest_coverline("build/tree/tree.js", 631);
if (options.defaultFn) {
                _yuitest_coverline("build/tree/tree.js", 632);
options.defaultFn.call(this, facade);
            }
        } else {
            _yuitest_coverline("build/tree/tree.js", 635);
if (options && options.defaultFn && !this._published[name]) {
                _yuitest_coverline("build/tree/tree.js", 636);
this._published[name] = this.publish(name, {
                    defaultFn: options.defaultFn
                });
            }

            _yuitest_coverline("build/tree/tree.js", 641);
this.fire(name, facade);
        }

        _yuitest_coverline("build/tree/tree.js", 644);
return this;
    },

    /**
    Removes the specified node from its parent node if it has one.

    @method _removeNodeFromParent
    @param {Tree.Node} node Node to remove.
    @protected
    **/
    _removeNodeFromParent: function (node) {
        _yuitest_coverfunc("build/tree/tree.js", "_removeNodeFromParent", 654);
_yuitest_coverline("build/tree/tree.js", 655);
var parent = node.parent,
            index;

        _yuitest_coverline("build/tree/tree.js", 658);
if (parent) {
            _yuitest_coverline("build/tree/tree.js", 659);
index = parent.indexOf(node);

            _yuitest_coverline("build/tree/tree.js", 661);
if (index > -1) {
                _yuitest_coverline("build/tree/tree.js", 662);
parent.children.splice(index, 1);
                _yuitest_coverline("build/tree/tree.js", 663);
parent._isIndexStale = true;
                _yuitest_coverline("build/tree/tree.js", 664);
node.parent = null;
            }
        }
    },

    // -- Default Event Handlers -----------------------------------------------
    _defAddFn: function (e) {
        _yuitest_coverfunc("build/tree/tree.js", "_defAddFn", 670);
_yuitest_coverline("build/tree/tree.js", 671);
var node   = e.node,
            parent = e.parent;

        // Remove the node from its existing parent if it has one.
        _yuitest_coverline("build/tree/tree.js", 675);
if (node.parent) {
            _yuitest_coverline("build/tree/tree.js", 676);
this._removeNodeFromParent(node);
        }

        // Add the node to its new parent at the desired index.
        _yuitest_coverline("build/tree/tree.js", 680);
node.parent = parent;
        _yuitest_coverline("build/tree/tree.js", 681);
parent.children.splice(e.index, 0, node);

        _yuitest_coverline("build/tree/tree.js", 683);
parent.canHaveChildren = true;
        _yuitest_coverline("build/tree/tree.js", 684);
parent._isIndexStale   = true;
    },

    _defClearFn: function (e) {
        _yuitest_coverfunc("build/tree/tree.js", "_defClearFn", 687);
_yuitest_coverline("build/tree/tree.js", 688);
var newRootNode = e.rootNode;

        _yuitest_coverline("build/tree/tree.js", 690);
if (this.rootNode) {
            _yuitest_coverline("build/tree/tree.js", 691);
this.destroyNode(this.rootNode, {silent: true});
        }

        _yuitest_coverline("build/tree/tree.js", 694);
this._nodeMap = {};
        _yuitest_coverline("build/tree/tree.js", 695);
this._nodeMap[newRootNode.id] = newRootNode;

        _yuitest_coverline("build/tree/tree.js", 697);
this.rootNode = newRootNode;
        _yuitest_coverline("build/tree/tree.js", 698);
this.children = newRootNode.children;
    },

    _defRemoveFn: function (e) {
        _yuitest_coverfunc("build/tree/tree.js", "_defRemoveFn", 701);
_yuitest_coverline("build/tree/tree.js", 702);
var node = e.node;

        _yuitest_coverline("build/tree/tree.js", 704);
if (e.destroy) {
            _yuitest_coverline("build/tree/tree.js", 705);
this.destroyNode(node, {silent: true});
        } else {_yuitest_coverline("build/tree/tree.js", 706);
if (e.parent) {
            _yuitest_coverline("build/tree/tree.js", 707);
this._removeNodeFromParent(node);
        } else {_yuitest_coverline("build/tree/tree.js", 708);
if (this.rootNode === node) {
            // Guess we'll need a new root node!
            _yuitest_coverline("build/tree/tree.js", 710);
this.rootNode = this.createNode(this._rootNodeConfig);
            _yuitest_coverline("build/tree/tree.js", 711);
this.children = this.rootNode.children;
        }}}
    }
});

_yuitest_coverline("build/tree/tree.js", 716);
Y.Tree = Y.mix(Tree, Y.Tree);


}, '@VERSION@', {"requires": ["base-build", "tree-node"]});
