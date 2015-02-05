YUI.add('tree-selectable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that adds the concept of selection state for nodes.

@module tree
@submodule tree-selectable
@main tree-selectable
**/

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
var EVT_SELECT = 'select';

/**
Fired when a node is unselected.

@event unselect
@param {Tree.Node} node Node being unselected.
@preventable _defUnselectFn
**/
var EVT_UNSELECT = 'unselect';

function Selectable() {}

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
        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Selectable);
        this._selectedMap   = {};

        Do.after(this._selectableAfterDefAddFn, this, '_defAddFn');
        Do.after(this._selectableAfterDefClearFn, this, '_defClearFn');
        Do.after(this._selectableAfterDefRemoveFn, this, '_defRemoveFn');

        this._selectableEvents = [
            this.after('multiSelectChange', this._afterMultiSelectChange)
        ];
    },

    destructor: function () {
        (new Y.EventHandle(this._selectableEvents)).detach();

        this._selectableEvents = null;
        this._selectedMap      = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Returns an array of nodes that are currently selected.

    @method getSelectedNodes
    @return {Tree.Node.Selectable[]} Array of selected nodes.
    **/
    getSelectedNodes: function () {
        return Y.Object.values(this._selectedMap);
    },

    /**
    Selects the specified node.

    @method selectNode
    @param {Tree.Node.Selectable} node Node to select.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `select` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    selectNode: function (node, options) {
        // Instead of calling node.isSelected(), we look for the node in this
        // tree's selectedMap, which ensures that the `select` event will fire
        // in cases such as a node being added to this tree with its selected
        // state already set to true.
        if (!this._selectedMap[node.id]) {
            this._fireTreeEvent(EVT_SELECT, {
                node: node,
                src : options && options.src
            }, {
                defaultFn: this._defSelectFn,
                silent   : options && options.silent
            });
        }

        return this;
    },

    /**
    Unselects all selected nodes.

    @method unselect
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `unselect` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    unselect: function (options) {
        for (var id in this._selectedMap) {
            if (this._selectedMap.hasOwnProperty(id)) {
                this.unselectNode(this._selectedMap[id], options);
            }
        }

        return this;
    },

    /**
    Unselects the specified node.

    @method unselectNode
    @param {Tree.Node.Selectable} node Node to unselect.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `unselect` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    unselectNode: function (node, options) {
        if (node.isSelected() || this._selectedMap[node.id]) {
            this._fireTreeEvent(EVT_UNSELECT, {
                node: node,
                src : options && options.src
            }, {
                defaultFn: this._defUnselectFn,
                silent   : options && options.silent
            });
        }

        return this;
    },

    // -- Protected Methods ----------------------------------------------------
    _selectableAfterDefAddFn: function (e) {
        // If the node is marked as selected, we need go through the select
        // flow.
        if (e.node.isSelected()) {
            this.selectNode(e.node);
        }
    },

    _selectableAfterDefClearFn: function () {
        this._selectedMap = {};
    },

    _selectableAfterDefRemoveFn: function (e) {
        delete e.node.state.selected;
        delete this._selectedMap[e.node.id];
    },

    // -- Protected Event Handlers ---------------------------------------------
    _afterMultiSelectChange: function () {
        this.unselect();
    },

    _defSelectFn: function (e) {
        if (!this.get('multiSelect')) {
            this.unselect();
        }

        e.node.state.selected = true;
        this._selectedMap[e.node.id] = e.node;
    },

    _defUnselectFn: function (e) {
        delete e.node.state.selected;
        delete this._selectedMap[e.node.id];
    }
};

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

function NodeSelectable() {}

NodeSelectable.prototype = {
    /**
    Returns `true` if this node is currently selected.

    @method isSelected
    @return {Boolean} `true` if this node is currently selected, `false`
        otherwise.
    **/
    isSelected: function () {
        return !!this.state.selected;
    },

    /**
    Selects this node.

    @method select
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `select` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    select: function (options) {
        this.tree.selectNode(this, options);
        return this;
    },

    /**
    Unselects this node.

    @method unselect
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `unselect` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    unselect: function (options) {
        this.tree.unselectNode(this, options);
        return this;
    }
};

Y.Tree.Node.Selectable = NodeSelectable;


}, '3.18.0', {"requires": ["tree"]});
