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
_yuitest_coverage["build/tree-openable/tree-openable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-openable/tree-openable.js",
    code: []
};
_yuitest_coverage["build/tree-openable/tree-openable.js"].code=["YUI.add('tree-openable', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Extension for `Tree` that adds the concept of open/closed state for nodes.","","@module tree","@submodule tree-openable","@main tree-openable","**/","","/**","Extension for `Tree` that adds the concept of open/closed state for nodes.","","@class Tree.Openable","@constructor","@extensionfor Tree","**/","","/**","Fired when a node is closed.","","@event close","@param {Tree.Node} node Node being closed.","@preventable _defCloseFn","**/","var EVT_CLOSE = 'close';","","/**","Fired when a node is opened.","","@event open","@param {Tree.Node} node Node being opened.","@preventable _defOpenFn","**/","var EVT_OPEN = 'open';","","function Openable() {}","","Openable.prototype = {","    // -- Lifecycle ------------------------------------------------------------","    initializer: function () {","        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Openable);","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Closes the specified node if it isn't already closed.","","    @method closeNode","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `close` event","            will be suppressed.","    @chainable","    **/","    closeNode: function (node, options) {","        if (node.canHaveChildren && node.isOpen()) {","            this._fireTreeEvent(EVT_CLOSE, {node: node}, {","                defaultFn: this._defCloseFn,","                silent   : options && options.silent","            });","        }","","        return this;","    },","","    /**","    Opens the specified node if it isn't already open.","","    @method openNode","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `open` event","            will be suppressed.","    @chainable","    **/","    openNode: function (node, options) {","        if (node.canHaveChildren && !node.isOpen()) {","            this._fireTreeEvent(EVT_OPEN, {node: node}, {","                defaultFn: this._defOpenFn,","                silent   : options && options.silent","            });","        }","","        return this;","    },","","    /**","    Toggles the open/closed state of the specified node, closing it if it's","    currently open or opening it if it's currently closed.","","    @method toggleOpenNode","    @param {Tree.Node} node Node to toggle.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, events will be","            suppressed.","    @chainable","    **/","    toggleOpenNode: function (node, options) {","        return node.isOpen() ? this.closeNode(node, options) :","            this.openNode(node, options);","    },","","    // -- Default Event Handlers -----------------------------------------------","","    /**","    Default handler for the `close` event.","","    @method _defCloseFn","    @param {EventFacade} e","    @protected","    **/","    _defCloseFn: function (e) {","        delete e.node.state.open;","    },","","    /**","    Default handler for the `open` event.","","    @method _defOpenFn","    @param {EventFacade} e","    @protected","    **/","    _defOpenFn: function (e) {","        e.node.state.open = true;","    }","};","","Y.Tree.Openable = Openable;","/**","@module tree","@submodule tree-openable","**/","","/**","`Tree.Node` extension that adds methods useful for nodes in trees that use the","`Tree.Openable` extension.","","@class Tree.Node.Openable","@constructor","@extensionfor Tree.Node","**/","","function NodeOpenable() {}","","NodeOpenable.prototype = {","    /**","    Closes this node if it's currently open.","","    @method close","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `close` event","            will be suppressed.","    @chainable","    **/","    close: function (options) {","        this.tree.closeNode(this, options);","        return this;","    },","","    /**","    Returns `true` if this node is currently open.","","    Note: the root node of a tree is always considered to be open.","","    @method isOpen","    @return {Boolean} `true` if this node is currently open, `false` otherwise.","    **/","    isOpen: function () {","        return !!this.state.open || this.isRoot();","    },","","    /**","    Opens this node if it's currently closed.","","    @method open","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `open` event","            will be suppressed.","    @chainable","    **/","    open: function (options) {","        this.tree.openNode(this, options);","        return this;","    },","","    /**","    Toggles the open/closed state of this node, closing it if it's currently","    open or opening it if it's currently closed.","","    @method toggleOpen","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, events will be","            suppressed.","    @chainable","    **/","    toggleOpen: function (options) {","        this.tree.toggleOpenNode(this, options);","        return this;","    }","};","","Y.Tree.Node.Openable = NodeOpenable;","","","}, '@VERSION@', {\"requires\": [\"tree\"]});"];
_yuitest_coverage["build/tree-openable/tree-openable.js"].lines = {"1":0,"28":0,"37":0,"39":0,"41":0,"44":0,"59":0,"60":0,"66":0,"79":0,"80":0,"86":0,"101":0,"115":0,"126":0,"130":0,"145":0,"147":0,"158":0,"159":0,"171":0,"184":0,"185":0,"199":0,"200":0,"204":0};
_yuitest_coverage["build/tree-openable/tree-openable.js"].functions = {"Openable:39":0,"initializer:43":0,"closeNode:58":0,"openNode:78":0,"toggleOpenNode:100":0,"_defCloseFn:114":0,"_defOpenFn:125":0,"NodeOpenable:145":0,"close:157":0,"isOpen:170":0,"open:183":0,"toggleOpen:198":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-openable/tree-openable.js"].coveredLines = 26;
_yuitest_coverage["build/tree-openable/tree-openable.js"].coveredFunctions = 13;
_yuitest_coverline("build/tree-openable/tree-openable.js", 1);
YUI.add('tree-openable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that adds the concept of open/closed state for nodes.

@module tree
@submodule tree-openable
@main tree-openable
**/

/**
Extension for `Tree` that adds the concept of open/closed state for nodes.

@class Tree.Openable
@constructor
@extensionfor Tree
**/

/**
Fired when a node is closed.

@event close
@param {Tree.Node} node Node being closed.
@preventable _defCloseFn
**/
_yuitest_coverfunc("build/tree-openable/tree-openable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-openable/tree-openable.js", 28);
var EVT_CLOSE = 'close';

/**
Fired when a node is opened.

@event open
@param {Tree.Node} node Node being opened.
@preventable _defOpenFn
**/
_yuitest_coverline("build/tree-openable/tree-openable.js", 37);
var EVT_OPEN = 'open';

_yuitest_coverline("build/tree-openable/tree-openable.js", 39);
function Openable() {}

_yuitest_coverline("build/tree-openable/tree-openable.js", 41);
Openable.prototype = {
    // -- Lifecycle ------------------------------------------------------------
    initializer: function () {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "initializer", 43);
_yuitest_coverline("build/tree-openable/tree-openable.js", 44);
this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Openable);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Closes the specified node if it isn't already closed.

    @method closeNode
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `close` event
            will be suppressed.
    @chainable
    **/
    closeNode: function (node, options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "closeNode", 58);
_yuitest_coverline("build/tree-openable/tree-openable.js", 59);
if (node.canHaveChildren && node.isOpen()) {
            _yuitest_coverline("build/tree-openable/tree-openable.js", 60);
this._fireTreeEvent(EVT_CLOSE, {node: node}, {
                defaultFn: this._defCloseFn,
                silent   : options && options.silent
            });
        }

        _yuitest_coverline("build/tree-openable/tree-openable.js", 66);
return this;
    },

    /**
    Opens the specified node if it isn't already open.

    @method openNode
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `open` event
            will be suppressed.
    @chainable
    **/
    openNode: function (node, options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "openNode", 78);
_yuitest_coverline("build/tree-openable/tree-openable.js", 79);
if (node.canHaveChildren && !node.isOpen()) {
            _yuitest_coverline("build/tree-openable/tree-openable.js", 80);
this._fireTreeEvent(EVT_OPEN, {node: node}, {
                defaultFn: this._defOpenFn,
                silent   : options && options.silent
            });
        }

        _yuitest_coverline("build/tree-openable/tree-openable.js", 86);
return this;
    },

    /**
    Toggles the open/closed state of the specified node, closing it if it's
    currently open or opening it if it's currently closed.

    @method toggleOpenNode
    @param {Tree.Node} node Node to toggle.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, events will be
            suppressed.
    @chainable
    **/
    toggleOpenNode: function (node, options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "toggleOpenNode", 100);
_yuitest_coverline("build/tree-openable/tree-openable.js", 101);
return node.isOpen() ? this.closeNode(node, options) :
            this.openNode(node, options);
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default handler for the `close` event.

    @method _defCloseFn
    @param {EventFacade} e
    @protected
    **/
    _defCloseFn: function (e) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "_defCloseFn", 114);
_yuitest_coverline("build/tree-openable/tree-openable.js", 115);
delete e.node.state.open;
    },

    /**
    Default handler for the `open` event.

    @method _defOpenFn
    @param {EventFacade} e
    @protected
    **/
    _defOpenFn: function (e) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "_defOpenFn", 125);
_yuitest_coverline("build/tree-openable/tree-openable.js", 126);
e.node.state.open = true;
    }
};

_yuitest_coverline("build/tree-openable/tree-openable.js", 130);
Y.Tree.Openable = Openable;
/**
@module tree
@submodule tree-openable
**/

/**
`Tree.Node` extension that adds methods useful for nodes in trees that use the
`Tree.Openable` extension.

@class Tree.Node.Openable
@constructor
@extensionfor Tree.Node
**/

_yuitest_coverline("build/tree-openable/tree-openable.js", 145);
function NodeOpenable() {}

_yuitest_coverline("build/tree-openable/tree-openable.js", 147);
NodeOpenable.prototype = {
    /**
    Closes this node if it's currently open.

    @method close
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `close` event
            will be suppressed.
    @chainable
    **/
    close: function (options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "close", 157);
_yuitest_coverline("build/tree-openable/tree-openable.js", 158);
this.tree.closeNode(this, options);
        _yuitest_coverline("build/tree-openable/tree-openable.js", 159);
return this;
    },

    /**
    Returns `true` if this node is currently open.

    Note: the root node of a tree is always considered to be open.

    @method isOpen
    @return {Boolean} `true` if this node is currently open, `false` otherwise.
    **/
    isOpen: function () {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "isOpen", 170);
_yuitest_coverline("build/tree-openable/tree-openable.js", 171);
return !!this.state.open || this.isRoot();
    },

    /**
    Opens this node if it's currently closed.

    @method open
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `open` event
            will be suppressed.
    @chainable
    **/
    open: function (options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "open", 183);
_yuitest_coverline("build/tree-openable/tree-openable.js", 184);
this.tree.openNode(this, options);
        _yuitest_coverline("build/tree-openable/tree-openable.js", 185);
return this;
    },

    /**
    Toggles the open/closed state of this node, closing it if it's currently
    open or opening it if it's currently closed.

    @method toggleOpen
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, events will be
            suppressed.
    @chainable
    **/
    toggleOpen: function (options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "toggleOpen", 198);
_yuitest_coverline("build/tree-openable/tree-openable.js", 199);
this.tree.toggleOpenNode(this, options);
        _yuitest_coverline("build/tree-openable/tree-openable.js", 200);
return this;
    }
};

_yuitest_coverline("build/tree-openable/tree-openable.js", 204);
Y.Tree.Node.Openable = NodeOpenable;


}, '@VERSION@', {"requires": ["tree"]});
