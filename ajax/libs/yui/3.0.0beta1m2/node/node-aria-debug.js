YUI.add('node-aria', function(Y) {

var _addDOMAttr = Y.Node.prototype._addDOMAttr;

Y.Node.prototype._addDOMAttr = function(name) {
    if (/^(?:role$|aria-)/.test(name)) {
        this.addAttr(name, {
            getter: function() {
                return Y.Node.getDOMNode(this).getAttribute(name, 2); 
            },

            setter: function(val) {
                Y.Node.getDOMNode(this).setAttribute(name, val);
                return val; 
            }
        });
    } else {
        _addDOMAttr.call(this, name);
    }
};


}, '@VERSION@' ,{requires:['node-base']});
