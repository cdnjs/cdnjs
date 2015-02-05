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
_yuitest_coverage["build/tree-selectable/tree-selectable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-selectable/tree-selectable.js",
    code: []
};
_yuitest_coverage["build/tree-selectable/tree-selectable.js"].code=["YUI.add('tree-selectable', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Extension for `Tree` that adds the concept of selection state for nodes.","","@module tree","@submodule tree-selectable","@main tree-selectable","**/","","var Do = Y.Do;","","/**","Extension for `Tree` that adds the concept of selection state for nodes.","","@class Tree.Selectable","@constructor","@extensionfor Tree","**/","","/**","Fired when a node is selected.","","@event select","@param {Tree.Node} node Node being selected.","@preventable _defSelectFn","**/","var EVT_SELECT = 'select';","","/**","Fired when a node is unselected.","","@event unselect","@param {Tree.Node} node Node being unselected.","@preventable _defUnselectFn","**/","var EVT_UNSELECT = 'unselect';","","function Selectable() {}","","Selectable.prototype = {","    // -- Protected Properties -------------------------------------------------","","    /**","    Mapping of node ids to node instances for nodes in this tree that are","    currently selected.","","    @property {Object} _selectedMap","    @protected","    **/","","    // -- Lifecycle ------------------------------------------------------------","    initializer: function () {","        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Selectable);","        this._selectedMap   = {};","","        Do.after(this._selectableAfterDefAddFn, this, '_defAddFn');","        Do.after(this._selectableAfterDefClearFn, this, '_defClearFn');","        Do.after(this._selectableAfterDefRemoveFn, this, '_defRemoveFn');","","        this._selectableEvents = [","            this.after('multiSelectChange', this._afterMultiSelectChange)","        ];","    },","","    destructor: function () {","        (new Y.EventHandle(this._selectableEvents)).detach();","","        this._selectableEvents = null;","        this._selectedMap      = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Returns an array of nodes that are currently selected.","","    @method getSelectedNodes","    @return {Tree.Node.Selectable[]} Array of selected nodes.","    **/","    getSelectedNodes: function () {","        return Y.Object.values(this._selectedMap);","    },","","    /**","    Selects the specified node.","","    @method selectNode","    @param {Tree.Node.Selectable} node Node to select.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `select` event","            will be suppressed.","    @chainable","    **/","    selectNode: function (node, options) {","        // Instead of calling node.isSelected(), we look for the node in this","        // tree's selectedMap, which ensures that the `select` event will fire","        // in cases such as a node being added to this tree with its selected","        // state already set to true.","        if (!this._selectedMap[node.id]) {","            this._fireTreeEvent(EVT_SELECT, {node: node}, {","                defaultFn: this._defSelectFn,","                silent   : options && options.silent","            });","        }","","        return this;","    },","","    /**","    Unselects all selected nodes.","","    @method unselect","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `unselect` event","            will be suppressed.","    @chainable","    **/","    unselect: function (options) {","        for (var id in this._selectedMap) {","            if (this._selectedMap.hasOwnProperty(id)) {","                this.unselectNode(this._selectedMap[id], options);","            }","        }","","        return this;","    },","","    /**","    Unselects the specified node.","","    @method unselectNode","    @param {Tree.Node.Selectable} node Node to unselect.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `unselect` event","            will be suppressed.","    @chainable","    **/","    unselectNode: function (node, options) {","        if (node.isSelected() || this._selectedMap[node.id]) {","            this._fireTreeEvent(EVT_UNSELECT, {node: node}, {","                defaultFn: this._defUnselectFn,","                silent   : options && options.silent","            });","        }","","        return this;","    },","","    // -- Protected Methods ----------------------------------------------------","    _selectableAfterDefAddFn: function (e) {","        // If the node is marked as selected, we need go through the select","        // flow.","        if (e.node.isSelected()) {","            this.selectNode(e.node);","        }","    },","","    _selectableAfterDefClearFn: function () {","        this._selectedMap = {};","    },","","    _selectableAfterDefRemoveFn: function (e) {","        delete e.node.state.selected;","        delete this._selectedMap[e.node.id];","    },","","    // -- Protected Event Handlers ---------------------------------------------","    _afterMultiSelectChange: function () {","        this.unselect();","    },","","    _defSelectFn: function (e) {","        if (!this.get('multiSelect')) {","            this.unselect();","        }","","        e.node.state.selected = true;","        this._selectedMap[e.node.id] = e.node;","    },","","    _defUnselectFn: function (e) {","        delete e.node.state.selected;","        delete this._selectedMap[e.node.id];","    }","};","","Selectable.ATTRS = {","    /**","    Whether or not to allow multiple nodes to be selected at once.","","    @attribute {Boolean} multiSelect","    @default false","    **/","    multiSelect: {","        value: false","    }","};","","Y.Tree.Selectable = Selectable;","/**","@module tree","@submodule tree-selectable","**/","","/**","`Tree.Node` extension that adds methods useful for nodes in trees that use the","`Tree.Selectable` extension.","","@class Tree.Node.Selectable","@constructor","@extensionfor Tree.Node","**/","","function NodeSelectable() {}","","NodeSelectable.prototype = {","    /**","    Returns `true` if this node is currently selected.","","    @method isSelected","    @return {Boolean} `true` if this node is currently selected, `false`","        otherwise.","    **/","    isSelected: function () {","        return !!this.state.selected;","    },","","    /**","    Selects this node.","","    @method select","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `select` event","            will be suppressed.","    @chainable","    **/","    select: function (options) {","        this.tree.selectNode(this, options);","        return this;","    },","","    /**","    Unselects this node.","","    @method unselect","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `unselect` event","            will be suppressed.","    @chainable","    **/","    unselect: function (options) {","        this.tree.unselectNode(this, options);","        return this;","    }","};","","Y.Tree.Node.Selectable = NodeSelectable;","","","}, '@VERSION@', {\"requires\": [\"tree\"]});"];
_yuitest_coverage["build/tree-selectable/tree-selectable.js"].lines = {"1":0,"13":0,"30":0,"39":0,"41":0,"43":0,"56":0,"57":0,"59":0,"60":0,"61":0,"63":0,"69":0,"71":0,"72":0,"84":0,"102":0,"103":0,"109":0,"122":0,"123":0,"124":0,"128":0,"142":0,"143":0,"149":0,"156":0,"157":0,"162":0,"166":0,"167":0,"172":0,"176":0,"177":0,"180":0,"181":0,"185":0,"186":0,"190":0,"202":0,"217":0,"219":0,"228":0,"241":0,"242":0,"255":0,"256":0,"260":0};
_yuitest_coverage["build/tree-selectable/tree-selectable.js"].functions = {"Selectable:41":0,"initializer:55":0,"destructor:68":0,"getSelectedNodes:83":0,"selectNode:97":0,"unselect:121":0,"unselectNode:141":0,"_selectableAfterDefAddFn:153":0,"_selectableAfterDefClearFn:161":0,"_selectableAfterDefRemoveFn:165":0,"_afterMultiSelectChange:171":0,"_defSelectFn:175":0,"_defUnselectFn:184":0,"NodeSelectable:217":0,"isSelected:227":0,"select:240":0,"unselect:254":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-selectable/tree-selectable.js"].coveredLines = 48;
_yuitest_coverage["build/tree-selectable/tree-selectable.js"].coveredFunctions = 18;
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 1);
YUI.add('tree-selectable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that adds the concept of selection state for nodes.

@module tree
@submodule tree-selectable
@main tree-selectable
**/

_yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 13);
var Do = Y.Do;

/**
Extension for `Tree` that adds the concept of selection state for nodes.

@class Tree.Selectable
@constructor
@extensionfor Tree
**/

/**
Fired when a node is selected.

@event select
@param {Tree.Node} node Node being selected.
@preventable _defSelectFn
**/
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 30);
var EVT_SELECT = 'select';

/**
Fired when a node is unselected.

@event unselect
@param {Tree.Node} node Node being unselected.
@preventable _defUnselectFn
**/
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 39);
var EVT_UNSELECT = 'unselect';

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 41);
function Selectable() {}

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 43);
Selectable.prototype = {
    // -- Protected Properties -------------------------------------------------

    /**
    Mapping of node ids to node instances for nodes in this tree that are
    currently selected.

    @property {Object} _selectedMap
    @protected
    **/

    // -- Lifecycle ------------------------------------------------------------
    initializer: function () {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "initializer", 55);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 56);
this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Selectable);
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 57);
this._selectedMap   = {};

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 59);
Do.after(this._selectableAfterDefAddFn, this, '_defAddFn');
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 60);
Do.after(this._selectableAfterDefClearFn, this, '_defClearFn');
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 61);
Do.after(this._selectableAfterDefRemoveFn, this, '_defRemoveFn');

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 63);
this._selectableEvents = [
            this.after('multiSelectChange', this._afterMultiSelectChange)
        ];
    },

    destructor: function () {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "destructor", 68);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 69);
(new Y.EventHandle(this._selectableEvents)).detach();

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 71);
this._selectableEvents = null;
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 72);
this._selectedMap      = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Returns an array of nodes that are currently selected.

    @method getSelectedNodes
    @return {Tree.Node.Selectable[]} Array of selected nodes.
    **/
    getSelectedNodes: function () {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "getSelectedNodes", 83);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 84);
return Y.Object.values(this._selectedMap);
    },

    /**
    Selects the specified node.

    @method selectNode
    @param {Tree.Node.Selectable} node Node to select.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `select` event
            will be suppressed.
    @chainable
    **/
    selectNode: function (node, options) {
        // Instead of calling node.isSelected(), we look for the node in this
        // tree's selectedMap, which ensures that the `select` event will fire
        // in cases such as a node being added to this tree with its selected
        // state already set to true.
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "selectNode", 97);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 102);
if (!this._selectedMap[node.id]) {
            _yuitest_coverline("build/tree-selectable/tree-selectable.js", 103);
this._fireTreeEvent(EVT_SELECT, {node: node}, {
                defaultFn: this._defSelectFn,
                silent   : options && options.silent
            });
        }

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 109);
return this;
    },

    /**
    Unselects all selected nodes.

    @method unselect
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `unselect` event
            will be suppressed.
    @chainable
    **/
    unselect: function (options) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "unselect", 121);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 122);
for (var id in this._selectedMap) {
            _yuitest_coverline("build/tree-selectable/tree-selectable.js", 123);
if (this._selectedMap.hasOwnProperty(id)) {
                _yuitest_coverline("build/tree-selectable/tree-selectable.js", 124);
this.unselectNode(this._selectedMap[id], options);
            }
        }

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 128);
return this;
    },

    /**
    Unselects the specified node.

    @method unselectNode
    @param {Tree.Node.Selectable} node Node to unselect.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `unselect` event
            will be suppressed.
    @chainable
    **/
    unselectNode: function (node, options) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "unselectNode", 141);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 142);
if (node.isSelected() || this._selectedMap[node.id]) {
            _yuitest_coverline("build/tree-selectable/tree-selectable.js", 143);
this._fireTreeEvent(EVT_UNSELECT, {node: node}, {
                defaultFn: this._defUnselectFn,
                silent   : options && options.silent
            });
        }

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 149);
return this;
    },

    // -- Protected Methods ----------------------------------------------------
    _selectableAfterDefAddFn: function (e) {
        // If the node is marked as selected, we need go through the select
        // flow.
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "_selectableAfterDefAddFn", 153);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 156);
if (e.node.isSelected()) {
            _yuitest_coverline("build/tree-selectable/tree-selectable.js", 157);
this.selectNode(e.node);
        }
    },

    _selectableAfterDefClearFn: function () {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "_selectableAfterDefClearFn", 161);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 162);
this._selectedMap = {};
    },

    _selectableAfterDefRemoveFn: function (e) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "_selectableAfterDefRemoveFn", 165);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 166);
delete e.node.state.selected;
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 167);
delete this._selectedMap[e.node.id];
    },

    // -- Protected Event Handlers ---------------------------------------------
    _afterMultiSelectChange: function () {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "_afterMultiSelectChange", 171);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 172);
this.unselect();
    },

    _defSelectFn: function (e) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "_defSelectFn", 175);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 176);
if (!this.get('multiSelect')) {
            _yuitest_coverline("build/tree-selectable/tree-selectable.js", 177);
this.unselect();
        }

        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 180);
e.node.state.selected = true;
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 181);
this._selectedMap[e.node.id] = e.node;
    },

    _defUnselectFn: function (e) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "_defUnselectFn", 184);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 185);
delete e.node.state.selected;
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 186);
delete this._selectedMap[e.node.id];
    }
};

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 190);
Selectable.ATTRS = {
    /**
    Whether or not to allow multiple nodes to be selected at once.

    @attribute {Boolean} multiSelect
    @default false
    **/
    multiSelect: {
        value: false
    }
};

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 202);
Y.Tree.Selectable = Selectable;
/**
@module tree
@submodule tree-selectable
**/

/**
`Tree.Node` extension that adds methods useful for nodes in trees that use the
`Tree.Selectable` extension.

@class Tree.Node.Selectable
@constructor
@extensionfor Tree.Node
**/

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 217);
function NodeSelectable() {}

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 219);
NodeSelectable.prototype = {
    /**
    Returns `true` if this node is currently selected.

    @method isSelected
    @return {Boolean} `true` if this node is currently selected, `false`
        otherwise.
    **/
    isSelected: function () {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "isSelected", 227);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 228);
return !!this.state.selected;
    },

    /**
    Selects this node.

    @method select
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `select` event
            will be suppressed.
    @chainable
    **/
    select: function (options) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "select", 240);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 241);
this.tree.selectNode(this, options);
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 242);
return this;
    },

    /**
    Unselects this node.

    @method unselect
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `unselect` event
            will be suppressed.
    @chainable
    **/
    unselect: function (options) {
        _yuitest_coverfunc("build/tree-selectable/tree-selectable.js", "unselect", 254);
_yuitest_coverline("build/tree-selectable/tree-selectable.js", 255);
this.tree.unselectNode(this, options);
        _yuitest_coverline("build/tree-selectable/tree-selectable.js", 256);
return this;
    }
};

_yuitest_coverline("build/tree-selectable/tree-selectable.js", 260);
Y.Tree.Node.Selectable = NodeSelectable;


}, '@VERSION@', {"requires": ["tree"]});
