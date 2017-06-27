YUI.add('node-aria', function(Y) {

/**
 * Aria support for Node
 * @module node
 * @submodule node-aria
 */

Y.Node.re_aria = /^(?:role$|aria-)/;

Y.Node.prototype._addAriaAttr = function(name) {
    this.addAttr(name, {
        getter: function() {
            return Y.Node.getDOMNode(this).getAttribute(name, 2); 
        },

        setter: function(val) {
            Y.Node.getDOMNode(this).setAttribute(name, val);
            return val; 
        }
    });
};


}, '@VERSION@' ,{requires:['node-base']});
