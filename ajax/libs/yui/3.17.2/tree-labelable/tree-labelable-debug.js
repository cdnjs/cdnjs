/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

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

function Labelable() {}

Labelable.prototype = {
    initializer: function () {
        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Labelable);
    }
};

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

function NodeLabelable(tree, config) {
    this._serializable = this._serializable.concat('label');

    if ('label' in config) {
        this.label = config.label;
    }
}

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

Y.Tree.Node.Labelable = NodeLabelable;


}, '3.17.2', {"requires": ["tree"]});
