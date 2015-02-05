/*
YUI 3.17.0 (build ce55cc9)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('node-style', function (Y, NAME) {

(function(Y) {
/**
 * Extended Node interface for managing node styles.
 * @module node
 * @submodule node-style
 */

Y.mix(Y.Node.prototype, {
    /**
     * Sets a style property of the node.
     * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
     * @method setStyle
     * @param {String} attr The style attribute to set.
     * @param {String|Number} val The value.
     * @chainable
     */
    setStyle: function(attr, val) {
        Y.DOM.setStyle(this._node, attr, val);
        return this;
    },

    /**
     * Sets multiple style properties on the node.
     * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
     * @method setStyles
     * @param {Object} hash An object literal of property:value pairs.
     * @chainable
     */
    setStyles: function(hash) {
        Y.DOM.setStyles(this._node, hash);
        return this;
    },

    /**
     * Returns the style's current value.
     * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
     * @method getStyle
     * @for Node
     * @param {String} attr The style attribute to retrieve.
     * @return {String} The current value of the style property for the element.
     */

     getStyle: function(attr) {
        return Y.DOM.getStyle(this._node, attr);
     },

    /**
     * Returns the computed value for the given style property.
     * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
     * @method getComputedStyle
     * @param {String} attr The style attribute to retrieve.
     * @return {String} The computed value of the style property for the element.
     */
     getComputedStyle: function(attr) {
        return Y.DOM.getComputedStyle(this._node, attr);
     }
});

/**
 * Returns an array of values for each node.
 * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
 * @method getStyle
 * @for NodeList
 * @see Node.getStyle
 * @param {String} attr The style attribute to retrieve.
 * @return {Array} The current values of the style property for the element.
 */

/**
 * Returns an array of the computed value for each node.
 * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
 * @method getComputedStyle
 * @see Node.getComputedStyle
 * @param {String} attr The style attribute to retrieve.
 * @return {Array} The computed values for each node.
 */

/**
 * Sets a style property on each node.
 * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
 * @method setStyle
 * @see Node.setStyle
 * @param {String} attr The style attribute to set.
 * @param {String|Number} val The value.
 * @chainable
 */

/**
 * Sets multiple style properties on each node.
 * Use camelCase (e.g. 'backgroundColor') for multi-word properties.
 * @method setStyles
 * @see Node.setStyles
 * @param {Object} hash An object literal of property:value pairs.
 * @chainable
 */

// These are broken out to handle undefined return (avoid false positive for
// chainable)

Y.NodeList.importMethod(Y.Node.prototype, ['getStyle', 'getComputedStyle', 'setStyle', 'setStyles']);
})(Y);
/**
 * @module node
 * @submodule node-base
 */

var Y_Node = Y.Node;

Y.mix(Y_Node.prototype, {
    /**
     * Makes the node visible.
     * If the "transition" module is loaded, show optionally
     * animates the showing of the node using either the default
     * transition effect ('fadeIn'), or the given named effect.
     * @method show
     * @for Node
     * @param {String} name A named Transition effect to use as the show effect.
     * @param {Object} config Options to use with the transition.
     * @param {Function} callback An optional function to run after the transition completes.
     * @chainable
     */
    show: function(callback) {
        callback = arguments[arguments.length - 1];
        this.toggleView(true, callback);
        return this;
    },

    /**
     * The implementation for showing nodes.
     * Default is to remove the hidden attribute and reset the CSS style.display property.
     * @method _show
     * @protected
     * @chainable
     */
    _show: function() {
        this.removeAttribute('hidden');

        // For back-compat we need to leave this in for browsers that
        // do not visually hide a node via the hidden attribute
        // and for users that check visibility based on style display.
        this.setStyle('display', '');

    },

    /**
    Returns whether the node is hidden by YUI or not. The hidden status is
    determined by the 'hidden' attribute and the value of the 'display' CSS
    property.

    @method _isHidden
    @return {Boolean} `true` if the node is hidden.
    @private
    **/
    _isHidden: function() {
        return  this.hasAttribute('hidden') || Y.DOM.getComputedStyle(this._node, 'display') === 'none';
    },

    /**
     * Displays or hides the node.
     * If the "transition" module is loaded, toggleView optionally
     * animates the toggling of the node using given named effect.
     * @method toggleView
     * @for Node
     * @param {Boolean} [on] An optional boolean value to force the node to be shown or hidden
     * @param {Function} [callback] An optional function to run after the transition completes.
     * @chainable
     */
    toggleView: function(on, callback) {
        this._toggleView.apply(this, arguments);
        return this;
    },

    _toggleView: function(on, callback) {
        callback = arguments[arguments.length - 1];

        // base on current state if not forcing
        if (typeof on != 'boolean') {
            on = (this._isHidden()) ? 1 : 0;
        }

        if (on) {
            this._show();
        }  else {
            this._hide();
        }

        if (typeof callback == 'function') {
            callback.call(this);
        }

        return this;
    },

    /**
     * Hides the node.
     * If the "transition" module is loaded, hide optionally
     * animates the hiding of the node using either the default
     * transition effect ('fadeOut'), or the given named effect.
     * @method hide
     * @param {String} name A named Transition effect to use as the show effect.
     * @param {Object} config Options to use with the transition.
     * @param {Function} callback An optional function to run after the transition completes.
     * @chainable
     */
    hide: function(callback) {
        callback = arguments[arguments.length - 1];
        this.toggleView(false, callback);
        return this;
    },

    /**
     * The implementation for hiding nodes.
     * Default is to set the hidden attribute to true and set the CSS style.display to 'none'.
     * @method _hide
     * @protected
     * @chainable
     */
    _hide: function() {
        this.setAttribute('hidden', 'hidden');

        // For back-compat we need to leave this in for browsers that
        // do not visually hide a node via the hidden attribute
        // and for users that check visibility based on style display.
        this.setStyle('display', 'none');
    }
});

Y.NodeList.importMethod(Y.Node.prototype, [
    /**
     * Makes each node visible.
     * If the "transition" module is loaded, show optionally
     * animates the showing of the node using either the default
     * transition effect ('fadeIn'), or the given named effect.
     * @method show
     * @param {String} name A named Transition effect to use as the show effect.
     * @param {Object} config Options to use with the transition.
     * @param {Function} callback An optional function to run after the transition completes.
     * @for NodeList
     * @chainable
     */
    'show',

    /**
     * Hides each node.
     * If the "transition" module is loaded, hide optionally
     * animates the hiding of the node using either the default
     * transition effect ('fadeOut'), or the given named effect.
     * @method hide
     * @param {String} name A named Transition effect to use as the show effect.
     * @param {Object} config Options to use with the transition.
     * @param {Function} callback An optional function to run after the transition completes.
     * @chainable
     */
    'hide',

    /**
     * Displays or hides each node.
     * If the "transition" module is loaded, toggleView optionally
     * animates the toggling of the nodes using given named effect.
     * @method toggleView
     * @param {Boolean} [on] An optional boolean value to force the nodes to be shown or hidden
     * @param {Function} [callback] An optional function to run after the transition completes.
     * @chainable
     */
    'toggleView'
]);


}, '3.17.0', {"requires": ["dom-style", "node-base"]});
