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
_yuitest_coverage["build/tree-node/tree-node.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-node/tree-node.js",
    code: []
};
_yuitest_coverage["build/tree-node/tree-node.js"].code=["YUI.add('tree-node', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Provides the `Tree.Node` class, which represents a tree node contained in a","`Tree` data structure.","","@module tree","@submodule tree-node","**/","","/**","Represents a tree node in a `Tree` data structure.","","@class Tree.Node","@param {Tree} tree `Tree` instance with which this node should be associated.","@param {Object} [config] Configuration hash for this node.","","    @param {Boolean} [config.canHaveChildren=false] Whether or not this node can","        contain child nodes. Will be automatically set to `true` if not","        specified and `config.children` contains one or more children.","","    @param {Tree.Node[]} [config.children] Array of `Tree.Node` instances","        for child nodes of this node.","","    @param {Object} [config.data] Implementation-specific data related to this","        node. You may add arbitrary properties to this hash for your own use.","","    @param {String} [config.id] Unique id for this node. This id must be unique","        among all tree nodes on the entire page, and will also be used as this","        node's DOM id when it's rendered by a TreeView. A unique id will be","        automatically generated unless you specify a custom value.","","    @param {Object} [config.state] State hash for this node. You may add","        arbitrary state properties to this hash for your own use. See the","        docs for `Tree.Node`'s `state` property for details on state values used","        internally by `Tree.Node`.","","@constructor","**/","","function TreeNode(tree, config) {","    config || (config = {});","","    this.id   = this._yuid = config.id || this.id || Y.guid('treeNode-');","    this.tree = tree;","","    this.children = config.children || [];","    this.data     = config.data || {};","    this.state    = config.state || {};","","    if (config.canHaveChildren) {","        this.canHaveChildren = config.canHaveChildren;","    } else if (this.children.length) {","        this.canHaveChildren = true;","    }","","    // Mix in arbitrary properties on the config object, but don't overwrite any","    // existing properties of this node.","    Y.mix(this, config);","","    // If this node has children, loop through them and ensure their parent","    // references are all set to this node.","    for (var i = 0, len = this.children.length; i < len; i++) {","        this.children[i].parent = this;","    }","}","","TreeNode.prototype = {","    // -- Public Properties ----------------------------------------------------","","    /**","    Whether or not this node can contain child nodes.","","    This value is falsy by default unless child nodes are added at instantiation","    time, in which case it will be automatically set to `true`. You can also","    manually set it to `true` to indicate that a node can have children even","    though it might not currently have any children.","","    Note that regardless of the value of this property, appending, prepending,","    or inserting a node into this node will cause `canHaveChildren` to be set to","    true automatically.","","    @property {Boolean} canHaveChildren","    **/","","    /**","    Child nodes contained within this node.","","    @property {Tree.Node[]} children","    @default []","    @readOnly","    **/","","    /**","    Arbitrary serializable data related to this node.","","    Use this property to store any data that should accompany this node when it","    is serialized to JSON.","","    @property {Object} data","    @default {}","    **/","","    /**","    Unique id for this node.","","    @property {String} id","    @readOnly","    **/","","    /**","    Parent node of this node, or `undefined` if this is an unattached node or","    the root node.","","    @property {Tree.Node} parent","    @readOnly","    **/","","    /**","    Current state of this node.","","    Use this property to store state-specific info -- such as whether this node","    is \"open\", \"selected\", or any other arbitrary state -- that should accompany","    this node when it is serialized to JSON.","","    @property {Object} state","    **/","","    /**","    The Tree instance with which this node is associated.","","    @property {Tree} tree","    @readOnly","    **/","","    // -- Protected Properties -------------------------------------------------","","    /**","    Mapping of child node ids to indices.","","    @property {Object} _indexMap","    @protected","    **/","","    /**","    Flag indicating whether the `_indexMap` is stale and needs to be rebuilt.","","    @property {Boolean} _isIndexStale","    @default true","    @protected","    **/","    _isIndexStale: true,","","    /**","    Simple way to type-check that this is an instance of Tree.Node.","","    @property {Boolean} _isYUITreeNode","    @default true","    @protected","    **/","    _isYUITreeNode: true,","","    /**","    Array of property names on this node that should be serialized to JSON when","    `toJSON()` is called.","","    Note that the `children` property is a special case that is managed","    separately.","","    @property {String[]} _serializable","    @protected","    **/","    _serializable: ['canHaveChildren', 'data', 'id', 'state'],","","    // -- Public Methods -------------------------------------------------------","","    /**","    Appends the given tree node or array of nodes to the end of this node's","    children.","","    @method append","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to append","        to the given parent. Node config objects will automatically be converted","        into node instances.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were appended.","    **/","    append: function (node, options) {","        return this.tree.appendNode(this, node, options);","    },","","    /**","    Removes all children from this node. The removed children will still be","    reusable unless the `destroy` option is truthy.","","    @method empty","    @param {Object} [options] Options.","        @param {Boolean} [options.destroy=false] If `true`, the children will","            also be destroyed, which makes them available for garbage collection","            and means they can't be reused.","        @param {Boolean} [options.silent=false] If `true`, `remove` events will","            be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @return {Tree.Node[]} Array of removed child nodes.","    **/","    empty: function (options) {","        return this.tree.emptyNode(this, options);","    },","","    /**","    Returns `true` if this node has one or more child nodes.","","    @method hasChildren","    @return {Boolean} `true` if this node has one or more child nodes, `false`","        otherwise.","    **/","    hasChildren: function () {","        return !!this.children.length;","    },","","    /**","    Returns the numerical index of this node within its parent node, or `-1` if","    this node doesn't have a parent node.","","    @method index","    @return {Number} Index of this node within its parent node, or `-1` if this","        node doesn't have a parent node.","    **/","    index: function () {","        return this.parent ? this.parent.indexOf(this) : -1;","    },","","    /**","    Returns the numerical index of the given child node, or `-1` if the node is","    not a child of this node.","","    @method indexOf","    @param {Tree.Node} node Child node.","    @return {Number} Index of the child, or `-1` if the node is not a child of","        this node.","    **/","    indexOf: function (node) {","        var index;","","        if (this._isIndexStale) {","            this._reindex();","        }","","        index = this._indexMap[node.id];","","        return typeof index === 'undefined' ? -1 : index;","    },","","    /**","    Inserts a node or array of nodes at the specified index under this node, or","    appends them to this node if no index is specified.","","    If a node being inserted is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method insert","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to insert","        under the given parent. Node config objects will automatically be","        converted into node instances.","","    @param {Object} [options] Options.","        @param {Number} [options.index] Index at which to insert the child node.","            If not specified, the node will be appended as the last child of the","            parent.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","        @param {String} [options.src='insert'] Source of the change, to be","            passed along to the event facade of the resulting event. This can be","            used to distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","","    @return {Tree.Node[]} Node or array of nodes that were inserted.","    **/","    insert: function (node, options) {","        return this.tree.insertNode(this, node, options);","    },","","    /**","    Returns `true` if this node has been inserted into a tree, `false` if it is","    merely associated with a tree and has not yet been inserted.","","    @method isInTree","    @return {Boolean} `true` if this node has been inserted into a tree, `false`","        otherwise.","    **/","    isInTree: function () {","        if (this.tree.rootNode === this) {","            return true;","        }","","        return !!(this.parent && this.parent.isInTree());","    },","","    /**","    Returns `true` if this node is the root of the tree.","","    @method isRoot","    @return {Boolean} `true` if this node is the root of the tree, `false`","        otherwise.","    **/","    isRoot: function () {","        return this.tree.rootNode === this;","    },","","    /**","    Returns this node's next sibling, or `undefined` if this node is the last","    child.","","    @method next","    @return {Tree.Node} This node's next sibling, or `undefined` if this node is","        the last child.","    **/","    next: function () {","        if (this.parent) {","            return this.parent.children[this.index() + 1];","        }","    },","","    /**","    Prepends a node or array of nodes at the beginning of this node's children.","","    If a node being prepended is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method prepend","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to prepend","        to this node. Node config objects will automatically be converted into","        node instances.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were prepended.","    **/","    prepend: function (node, options) {","        return this.tree.prependNode(this, node, options);","    },","","    /**","    Returns this node's previous sibling, or `undefined` if this node is the","    first child","","    @method previous","    @return {Tree.Node} This node's previous sibling, or `undefined` if this","        node is the first child.","    **/","    previous: function () {","        if (this.parent) {","            return this.parent.children[this.index() - 1];","        }","    },","","    /**","    Removes this node from its parent node.","","    @method remove","    @param {Object} [options] Options.","        @param {Boolean} [options.destroy=false] If `true`, this node and all","            its children will also be destroyed, which makes them available for","            garbage collection and means they can't be reused.","        @param {Boolean} [options.silent=false] If `true`, the `remove` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    remove: function (options) {","        return this.tree.removeNode(this, options);","    },","","    /**","    Returns the total number of nodes contained within this node, including all","    descendants of this node's children.","","    @method size","    @return {Number} Total number of nodes contained within this node, including","        all descendants.","    **/","    size: function () {","        var children = this.children,","            len      = children.length,","            total    = len;","","        for (var i = 0; i < len; i++) {","            total += children[i].size();","        }","","        return total;","    },","","    /**","    Serializes this node to an object suitable for use in JSON.","","    @method toJSON","    @return {Object} Serialized node object.","    **/","    toJSON: function () {","        var obj   = {},","            state = this.state,","            i, key, len;","","        // Do nothing if this node is marked as destroyed.","        if (state.destroyed) {","            return null;","        }","","        // Serialize properties explicitly marked as serializable.","        for (i = 0, len = this._serializable.length; i < len; i++) {","            key = this._serializable[i];","","            if (key in this) {","                obj[key] = this[key];","            }","        }","","        // Serialize child nodes.","        if (this.canHaveChildren) {","            obj.children = [];","","            for (i = 0, len = this.children.length; i < len; i++) {","                obj.children.push(this.children[i].toJSON());","            }","        }","","        return obj;","    },","","    // -- Protected Methods ----------------------------------------------------","    _reindex: function () {","        var children = this.children,","            indexMap = {},","            i, len;","","        for (i = 0, len = children.length; i < len; i++) {","            indexMap[children[i].id] = i;","        }","","        this._indexMap     = indexMap;","        this._isIndexStale = false;","    }","};","","Y.namespace('Tree').Node = TreeNode;","","","}, '@VERSION@');"];
_yuitest_coverage["build/tree-node/tree-node.js"].lines = {"1":0,"43":0,"44":0,"46":0,"47":0,"49":0,"50":0,"51":0,"53":0,"54":0,"55":0,"56":0,"61":0,"65":0,"66":0,"70":0,"194":0,"215":0,"226":0,"238":0,"251":0,"253":0,"254":0,"257":0,"259":0,"289":0,"301":0,"302":0,"305":0,"316":0,"328":0,"329":0,"350":0,"362":0,"363":0,"384":0,"396":0,"400":0,"401":0,"404":0,"414":0,"419":0,"420":0,"424":0,"425":0,"427":0,"428":0,"433":0,"434":0,"436":0,"437":0,"441":0,"446":0,"450":0,"451":0,"454":0,"455":0,"459":0};
_yuitest_coverage["build/tree-node/tree-node.js"].functions = {"TreeNode:43":0,"append:193":0,"empty:214":0,"hasChildren:225":0,"index:237":0,"indexOf:250":0,"insert:288":0,"isInTree:300":0,"isRoot:315":0,"next:327":0,"prepend:349":0,"previous:361":0,"remove:383":0,"size:395":0,"toJSON:413":0,"_reindex:445":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-node/tree-node.js"].coveredLines = 58;
_yuitest_coverage["build/tree-node/tree-node.js"].coveredFunctions = 17;
_yuitest_coverline("build/tree-node/tree-node.js", 1);
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

_yuitest_coverfunc("build/tree-node/tree-node.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-node/tree-node.js", 43);
function TreeNode(tree, config) {
    _yuitest_coverfunc("build/tree-node/tree-node.js", "TreeNode", 43);
_yuitest_coverline("build/tree-node/tree-node.js", 44);
config || (config = {});

    _yuitest_coverline("build/tree-node/tree-node.js", 46);
this.id   = this._yuid = config.id || this.id || Y.guid('treeNode-');
    _yuitest_coverline("build/tree-node/tree-node.js", 47);
this.tree = tree;

    _yuitest_coverline("build/tree-node/tree-node.js", 49);
this.children = config.children || [];
    _yuitest_coverline("build/tree-node/tree-node.js", 50);
this.data     = config.data || {};
    _yuitest_coverline("build/tree-node/tree-node.js", 51);
this.state    = config.state || {};

    _yuitest_coverline("build/tree-node/tree-node.js", 53);
if (config.canHaveChildren) {
        _yuitest_coverline("build/tree-node/tree-node.js", 54);
this.canHaveChildren = config.canHaveChildren;
    } else {_yuitest_coverline("build/tree-node/tree-node.js", 55);
if (this.children.length) {
        _yuitest_coverline("build/tree-node/tree-node.js", 56);
this.canHaveChildren = true;
    }}

    // Mix in arbitrary properties on the config object, but don't overwrite any
    // existing properties of this node.
    _yuitest_coverline("build/tree-node/tree-node.js", 61);
Y.mix(this, config);

    // If this node has children, loop through them and ensure their parent
    // references are all set to this node.
    _yuitest_coverline("build/tree-node/tree-node.js", 65);
for (var i = 0, len = this.children.length; i < len; i++) {
        _yuitest_coverline("build/tree-node/tree-node.js", 66);
this.children[i].parent = this;
    }
}

_yuitest_coverline("build/tree-node/tree-node.js", 70);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "append", 193);
_yuitest_coverline("build/tree-node/tree-node.js", 194);
return this.tree.appendNode(this, node, options);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "empty", 214);
_yuitest_coverline("build/tree-node/tree-node.js", 215);
return this.tree.emptyNode(this, options);
    },

    /**
    Returns `true` if this node has one or more child nodes.

    @method hasChildren
    @return {Boolean} `true` if this node has one or more child nodes, `false`
        otherwise.
    **/
    hasChildren: function () {
        _yuitest_coverfunc("build/tree-node/tree-node.js", "hasChildren", 225);
_yuitest_coverline("build/tree-node/tree-node.js", 226);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "index", 237);
_yuitest_coverline("build/tree-node/tree-node.js", 238);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "indexOf", 250);
_yuitest_coverline("build/tree-node/tree-node.js", 251);
var index;

        _yuitest_coverline("build/tree-node/tree-node.js", 253);
if (this._isIndexStale) {
            _yuitest_coverline("build/tree-node/tree-node.js", 254);
this._reindex();
        }

        _yuitest_coverline("build/tree-node/tree-node.js", 257);
index = this._indexMap[node.id];

        _yuitest_coverline("build/tree-node/tree-node.js", 259);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "insert", 288);
_yuitest_coverline("build/tree-node/tree-node.js", 289);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "isInTree", 300);
_yuitest_coverline("build/tree-node/tree-node.js", 301);
if (this.tree.rootNode === this) {
            _yuitest_coverline("build/tree-node/tree-node.js", 302);
return true;
        }

        _yuitest_coverline("build/tree-node/tree-node.js", 305);
return !!(this.parent && this.parent.isInTree());
    },

    /**
    Returns `true` if this node is the root of the tree.

    @method isRoot
    @return {Boolean} `true` if this node is the root of the tree, `false`
        otherwise.
    **/
    isRoot: function () {
        _yuitest_coverfunc("build/tree-node/tree-node.js", "isRoot", 315);
_yuitest_coverline("build/tree-node/tree-node.js", 316);
return this.tree.rootNode === this;
    },

    /**
    Returns this node's next sibling, or `undefined` if this node is the last
    child.

    @method next
    @return {Tree.Node} This node's next sibling, or `undefined` if this node is
        the last child.
    **/
    next: function () {
        _yuitest_coverfunc("build/tree-node/tree-node.js", "next", 327);
_yuitest_coverline("build/tree-node/tree-node.js", 328);
if (this.parent) {
            _yuitest_coverline("build/tree-node/tree-node.js", 329);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "prepend", 349);
_yuitest_coverline("build/tree-node/tree-node.js", 350);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "previous", 361);
_yuitest_coverline("build/tree-node/tree-node.js", 362);
if (this.parent) {
            _yuitest_coverline("build/tree-node/tree-node.js", 363);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "remove", 383);
_yuitest_coverline("build/tree-node/tree-node.js", 384);
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
        _yuitest_coverfunc("build/tree-node/tree-node.js", "size", 395);
_yuitest_coverline("build/tree-node/tree-node.js", 396);
var children = this.children,
            len      = children.length,
            total    = len;

        _yuitest_coverline("build/tree-node/tree-node.js", 400);
for (var i = 0; i < len; i++) {
            _yuitest_coverline("build/tree-node/tree-node.js", 401);
total += children[i].size();
        }

        _yuitest_coverline("build/tree-node/tree-node.js", 404);
return total;
    },

    /**
    Serializes this node to an object suitable for use in JSON.

    @method toJSON
    @return {Object} Serialized node object.
    **/
    toJSON: function () {
        _yuitest_coverfunc("build/tree-node/tree-node.js", "toJSON", 413);
_yuitest_coverline("build/tree-node/tree-node.js", 414);
var obj   = {},
            state = this.state,
            i, key, len;

        // Do nothing if this node is marked as destroyed.
        _yuitest_coverline("build/tree-node/tree-node.js", 419);
if (state.destroyed) {
            _yuitest_coverline("build/tree-node/tree-node.js", 420);
return null;
        }

        // Serialize properties explicitly marked as serializable.
        _yuitest_coverline("build/tree-node/tree-node.js", 424);
for (i = 0, len = this._serializable.length; i < len; i++) {
            _yuitest_coverline("build/tree-node/tree-node.js", 425);
key = this._serializable[i];

            _yuitest_coverline("build/tree-node/tree-node.js", 427);
if (key in this) {
                _yuitest_coverline("build/tree-node/tree-node.js", 428);
obj[key] = this[key];
            }
        }

        // Serialize child nodes.
        _yuitest_coverline("build/tree-node/tree-node.js", 433);
if (this.canHaveChildren) {
            _yuitest_coverline("build/tree-node/tree-node.js", 434);
obj.children = [];

            _yuitest_coverline("build/tree-node/tree-node.js", 436);
for (i = 0, len = this.children.length; i < len; i++) {
                _yuitest_coverline("build/tree-node/tree-node.js", 437);
obj.children.push(this.children[i].toJSON());
            }
        }

        _yuitest_coverline("build/tree-node/tree-node.js", 441);
return obj;
    },

    // -- Protected Methods ----------------------------------------------------
    _reindex: function () {
        _yuitest_coverfunc("build/tree-node/tree-node.js", "_reindex", 445);
_yuitest_coverline("build/tree-node/tree-node.js", 446);
var children = this.children,
            indexMap = {},
            i, len;

        _yuitest_coverline("build/tree-node/tree-node.js", 450);
for (i = 0, len = children.length; i < len; i++) {
            _yuitest_coverline("build/tree-node/tree-node.js", 451);
indexMap[children[i].id] = i;
        }

        _yuitest_coverline("build/tree-node/tree-node.js", 454);
this._indexMap     = indexMap;
        _yuitest_coverline("build/tree-node/tree-node.js", 455);
this._isIndexStale = false;
    }
};

_yuitest_coverline("build/tree-node/tree-node.js", 459);
Y.namespace('Tree').Node = TreeNode;


}, '@VERSION@');
