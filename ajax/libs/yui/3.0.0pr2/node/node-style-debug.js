YUI.add('node-style', function(Y) {

/**
 * Extended Node interface for managing node styles.
 * @module node
 * @submodule node-style
 * @for Node
 */

Y.Node.addDOMMethods([
    /**
     * Returns the style's current value.
     * @method getStyle
     * @param {String} attr The style attribute to retrieve. 
     * @return {String} The current value of the style property for the element.
     */
    'getStyle',

    /**
     * Returns the computed value for the given style property.
     * @method getComputedStyle
     * @param {String} attr The style attribute to retrieve. 
     * @return {String} The computed value of the style property for the element.
     */
    'getComputedStyle',

    /**
     * Sets a style property of the node.
     * @method setStyle
     * @param {String} attr The style attribute to set. 
     * @param {String|Number} val The value. 
     * @chainable
     */
    'setStyle',

    /**
     * Sets multiple style properties on the node.
     * @method setStyles
     * @param {Object} hash An object literal of property:value pairs. 
     * @chainable
     */
    'setStyles'
]);



}, '@VERSION@' ,{requires:['dom-style', 'node-base']});
