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
_yuitest_coverage["build/tree-labelable/tree-labelable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-labelable/tree-labelable.js",
    code: []
};
_yuitest_coverage["build/tree-labelable/tree-labelable.js"].code=["YUI.add('tree-labelable', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Extension for `Tree` that adds baked-in support for node labels like you might","see in a treeview or menu.","","@module tree","@submodule tree-labelable","@main tree-labelable","**/","","/**","Extension for `Tree` that adds baked-in support for node labels like you might","see in a treeview or menu.","","@class Tree.Labelable","@constructor","@extensionfor Tree","**/","","function Labelable() {}","","Labelable.prototype = {","    initializer: function () {","        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Labelable);","    }","};","","Y.Tree.Labelable = Labelable;","/**","@module tree","@submodule tree-labelable","**/","","/**","`Tree.Node` extension that adds baked in support for labels like you might see","in a treeview or menu.","","**Security note:** The label is stored in raw, unescaped form. If you choose to","render the label as HTML, be sure to escape it first with `Y.Escape.html()`","unless you actually intend to render raw HTML contained in the label.","","@class Tree.Node.Labelable","@constructor","@param {Tree} tree `Tree` instance with which this node should be associated.","@param {Object} [config] Configuration hash.","    @param {String} [config.label=''] Label for this node.","@extensionfor Tree.Node","**/","","function NodeLabelable(tree, config) {","    this._serializable = this._serializable.concat('label');","","    if ('label' in config) {","        this.label = config.label;","    }","}","","NodeLabelable.prototype = {","    /**","    Label for this node.","","    **Security note:** The label is stored in raw, unescaped form. If you choose","    to render the label as HTML, be sure to escape it first with","    `Y.Escape.html()` unless you actually intend to render raw HTML contained in","    the label.","","    @property {String} label","    @default ''","    **/","    label: ''","};","","Y.Tree.Node.Labelable = NodeLabelable;","","","}, '@VERSION@', {\"requires\": [\"tree\"]});"];
_yuitest_coverage["build/tree-labelable/tree-labelable.js"].lines = {"1":0,"23":0,"25":0,"27":0,"31":0,"53":0,"54":0,"56":0,"57":0,"61":0,"76":0};
_yuitest_coverage["build/tree-labelable/tree-labelable.js"].functions = {"Labelable:23":0,"initializer:26":0,"NodeLabelable:53":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-labelable/tree-labelable.js"].coveredLines = 11;
_yuitest_coverage["build/tree-labelable/tree-labelable.js"].coveredFunctions = 4;
_yuitest_coverline("build/tree-labelable/tree-labelable.js", 1);
YUI.add('tree-labelable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that adds baked-in support for node labels like you might
see in a treeview or menu.

@module tree
@submodule tree-labelable
@main tree-labelable
**/

/**
Extension for `Tree` that adds baked-in support for node labels like you might
see in a treeview or menu.

@class Tree.Labelable
@constructor
@extensionfor Tree
**/

_yuitest_coverfunc("build/tree-labelable/tree-labelable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-labelable/tree-labelable.js", 23);
function Labelable() {}

_yuitest_coverline("build/tree-labelable/tree-labelable.js", 25);
Labelable.prototype = {
    initializer: function () {
        _yuitest_coverfunc("build/tree-labelable/tree-labelable.js", "initializer", 26);
_yuitest_coverline("build/tree-labelable/tree-labelable.js", 27);
this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Labelable);
    }
};

_yuitest_coverline("build/tree-labelable/tree-labelable.js", 31);
Y.Tree.Labelable = Labelable;
/**
@module tree
@submodule tree-labelable
**/

/**
`Tree.Node` extension that adds baked in support for labels like you might see
in a treeview or menu.

**Security note:** The label is stored in raw, unescaped form. If you choose to
render the label as HTML, be sure to escape it first with `Y.Escape.html()`
unless you actually intend to render raw HTML contained in the label.

@class Tree.Node.Labelable
@constructor
@param {Tree} tree `Tree` instance with which this node should be associated.
@param {Object} [config] Configuration hash.
    @param {String} [config.label=''] Label for this node.
@extensionfor Tree.Node
**/

_yuitest_coverline("build/tree-labelable/tree-labelable.js", 53);
function NodeLabelable(tree, config) {
    _yuitest_coverfunc("build/tree-labelable/tree-labelable.js", "NodeLabelable", 53);
_yuitest_coverline("build/tree-labelable/tree-labelable.js", 54);
this._serializable = this._serializable.concat('label');

    _yuitest_coverline("build/tree-labelable/tree-labelable.js", 56);
if ('label' in config) {
        _yuitest_coverline("build/tree-labelable/tree-labelable.js", 57);
this.label = config.label;
    }
}

_yuitest_coverline("build/tree-labelable/tree-labelable.js", 61);
NodeLabelable.prototype = {
    /**
    Label for this node.

    **Security note:** The label is stored in raw, unescaped form. If you choose
    to render the label as HTML, be sure to escape it first with
    `Y.Escape.html()` unless you actually intend to render raw HTML contained in
    the label.

    @property {String} label
    @default ''
    **/
    label: ''
};

_yuitest_coverline("build/tree-labelable/tree-labelable.js", 76);
Y.Tree.Node.Labelable = NodeLabelable;


}, '@VERSION@', {"requires": ["tree"]});
