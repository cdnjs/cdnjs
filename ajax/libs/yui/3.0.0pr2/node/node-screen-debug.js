YUI.add('node-screen', function(Y) {

/**
 * Extended Node interface for managing regions and screen positioning.
 * Adds support for positioning elements and normalizes window size and scroll detection. 
 * @module node
 * @submodule node-screen
 * @for Node
 */

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
        function(v, n) {
            Y.Node.getters[v] = Y.Node.wrapDOMMethod(v);
        }
    );

    Y.Node.addDOMMethods([
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
Y.each([
        /**
         * Returns a region object for the node 
         * @property region
         * @type Node
         */
        'region',
        /**
         * Returns a region object for the node's viewport 
         * @property viewportRegion
         * @type Node
         */
        'viewportRegion'
    ],

    function(v, n) {
        Y.Node.getters[v] = Y.Node.wrapDOMMethod(v);
    }
);

Y.Node.addDOMMethods([
    /**
     * Determines whether or not the node is currently visible in the viewport. 
     * @method inViewportRegion         
     * @return {Boolean} Whether or not the node is currently positioned
     * within the viewport's region
     */
    'inViewportRegion'
]);

// these need special treatment to extract 2nd node arg
Y.Node.methods({
    /**
     * Compares the intersection of the node with another node or region 
     * @method intersect         
     * @param {Node|Object} node2 The node or region to compare with.
     * @param {Object} altRegion An alternate region to use (rather than this node's). 
     * @return {Object} An object representing the intersection of the regions. 
     */
    intersect: function(node1, node2, altRegion) {
        if (node2 instanceof Y.Node) { // might be a region object
            node2 = Y.Node.getDOMNode(node2);
        }
        return Y.DOM.intersect(node1, node2, altRegion); 
    },

    /**
     * Determines whether or not the node is within the giving region.
     * @method inRegion         
     * @param {Node|Object} node2 The node or region to compare with.
     * @param {Boolean} all Whether or not all of the node must be in the region. 
     * @param {Object} altRegion An alternate region to use (rather than this node's). 
     * @return {Object} An object representing the intersection of the regions. 
     */
    inRegion: function(node1, node2, all, altRegion) {
        if (node2 instanceof Y.Node) { // might be a region object
            node2 = Y.Node.getDOMNode(node2);
        }
        return Y.DOM.inRegion(node1, node2, all, altRegion); 
    }
});



}, '@VERSION@' ,{requires:['dom-screen']});
