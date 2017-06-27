YUI.add('node-screen', function(Y) {

/**
 * Extended Node interface for managing regions and screen positioning.
 * Adds support for positioning elements and normalizes window size and scroll detection. 
 * @module node
 * @submodule node-screen
 * @for Node
 */

var NODE_TYPE = 'nodeType';

// these are all "safe" returns, no wrapping required
Y.each([
    /**
     * Returns the inner width of the viewport (exludes scrollbar). 
     * @property winWidth
     * @type {Int}
     */
    'winWidth',

    /**
     * Returns the inner height of the viewport (exludes scrollbar). 
     * @property winHeight
     * @type {Int}
     */
    'winHeight',

    /**
     * Document width 
     * @property winHeight
     * @type {Int}
     */
    'docWidth',

    /**
     * Document height 
     * @property docHeight
     * @type {Int}
     */
    'docHeight',

    /**
     * Amount page has been scroll vertically 
     * @property docScrollX
     * @type {Int}
     */
    'docScrollX',

    /**
     * Amount page has been scroll horizontally 
     * @property docScrollY
     * @type {Int}
     */
    'docScrollY'
    ],
    function(name) {
        Y.Node.ATTRS[name] = {
            getter: function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(Y.Node.getDOMNode(this));

                return Y.DOM[name].apply(this, args);
            }
        };
    }
);

Y.Node.ATTRS.scrollLeft = {
    getter: function() {
        var node = Y.Node.getDOMNode(this);
        return ('scrollLeft' in node) ? node.scrollLeft : Y.DOM.docScrollX(node);
    },

    setter: function(val) {
        var node = Y.Node.getDOMNode(this);
        if (node) {
            if ('scrollLeft' in node) {
                node.scrollLeft = val;
            } else if (node.document || node[NODE_TYPE] === 9) {
                Y.DOM._getWin(node).scrollTo(val, Y.DOM.docScrollY(node)); // scroll window if win or doc
            }
        } else {
            Y.log('unable to set scrollLeft for ' + node, 'error', 'Node');
        }
    }
};

Y.Node.ATTRS.scrollTop = {
    getter: function() {
        var node = Y.Node.getDOMNode(this);
        return ('scrollTop' in node) ? node.scrollTop : Y.DOM.docScrollY(node);
    },

    setter: function(val) {
        var node = Y.Node.getDOMNode(this);
        if (node) {
            if ('scrollTop' in node) {
                node.scrollTop = val;
            } else if (node.document || node[NODE_TYPE] === 9) {
                Y.DOM._getWin(node).scrollTo(Y.DOM.docScrollX(node), val); // scroll window if win or doc
            }
        } else {
            Y.log('unable to set scrollTop for ' + node, 'error', 'Node');
        }
    }
};

Y.Node.importMethod(Y.DOM, [
/**
 * Gets the current position of the node in page coordinates. 
 * Nodes must be part of the DOM tree to have page coordinates
 * (display:none or nodes not appended return false).
 * @method getXY
 * @return {Array} The XY position of the node
*/
    'getXY',

/**
 * Set the position of the node in page coordinates, regardless of how the node is positioned.
 * The node must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method setXY
 * @param {Array} xy Contains X & Y values for new position (coordinates are page-based)
 * @chainable
 */
    'setXY',

/**
 * Gets the current position of the node in page coordinates. 
 * Nodes must be part of the DOM tree to have page coordinates
 * (display:none or nodes not appended return false).
 * @method getX
 * @return {Int} The X position of the node
*/
    'getX',

/**
 * Set the position of the node in page coordinates, regardless of how the node is positioned.
 * The node must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method setX
 * @param {Int} x X value for new position (coordinates are page-based)
 * @chainable
 */
    'setX',

/**
 * Gets the current position of the node in page coordinates. 
 * Nodes must be part of the DOM tree to have page coordinates
 * (display:none or nodes not appended return false).
 * @method getY
 * @return {Int} The Y position of the node
*/
    'getY',

/**
 * Set the position of the node in page coordinates, regardless of how the node is positioned.
 * The node must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method setY
 * @param {Int} y Y value for new position (coordinates are page-based)
 * @chainable
 */
    'setY'
]);

/**
 * Extended Node interface for managing regions and screen positioning.
 * Adds support for positioning elements and normalizes window size and scroll detection. 
 * @module node
 * @submodule node-screen
 * @for Node
 */

/**
 * Returns a region object for the node 
 * @property region
 * @type Node
 */
Y.Node.ATTRS.region = {
    getter: function() {
        var node = Y.Node.getDOMNode(this);
        if (node && !node.tagName) {
            if (node.nodeType === 9) { // document
                node = node.documentElement;
            } else if (node.alert) { // window
                node = node.document.documentElement;
            }
        }
        return Y.DOM.region(node);
    }
};
    
/**
 * Returns a region object for the node's viewport 
 * @property viewportRegion
 * @type Node
 */
Y.Node.ATTRS.viewportRegion = {
    getter: function() {
        return Y.DOM.viewportRegion(Y.Node.getDOMNode(this));
    }
};

Y.Node.importMethod(Y.DOM, 'inViewportRegion');

// these need special treatment to extract 2nd node arg
/**
 * Compares the intersection of the node with another node or region 
 * @method intersect         
 * @param {Node|Object} node2 The node or region to compare with.
 * @param {Object} altRegion An alternate region to use (rather than this node's). 
 * @return {Object} An object representing the intersection of the regions. 
 */
Y.Node.prototype.intersect = function(node2, altRegion) {
    var node1 = Y.Node.getDOMNode(this);
    if (node2 instanceof Y.Node) { // might be a region object
        node2 = Y.Node.getDOMNode(node2);
    }
    return Y.DOM.intersect(node1, node2, altRegion); 
};

/**
 * Determines whether or not the node is within the giving region.
 * @method inRegion         
 * @param {Node|Object} node2 The node or region to compare with.
 * @param {Boolean} all Whether or not all of the node must be in the region. 
 * @param {Object} altRegion An alternate region to use (rather than this node's). 
 * @return {Object} An object representing the intersection of the regions. 
 */
Y.Node.prototype.inRegion = function(node2, all, altRegion) {
    var node1 = Y.Node.getDOMNode(this);
    if (node2 instanceof Y.Node) { // might be a region object
        node2 = Y.Node.getDOMNode(node2);
    }
    return Y.DOM.inRegion(node1, node2, all, altRegion); 
};


}, '@VERSION@' ,{requires:['dom-screen']});
