YUI.add('node-aria', function(Y) {

/**
 * Aria support for Node
 * @module node
 * @submodule node-aria
 */

Y.Node.prototype.get = function(name) {
    var val;
    if (re_aria.test(name)) {
            val = Y.Node.getDOMNode(this).getAttribute(name, 2); 
    } else {

    }

        setter: function(val) {
            Y.Node.getDOMNode(this).setAttribute(name, val);
            return val; 
        }
    });
};


}, '@VERSION@' ,{requires:['node-base']});
