/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('button-core', function (Y, NAME) {

/**
 * Provides an interface for working with button-like DOM nodes
 *
 * @module button-core
 * @since 3.5.0
 */
var getClassName = Y.ClassNameManager.getClassName,
    AttributeCore = Y.AttributeCore;

/**
 * Creates a button
 *
 * @class ButtonCore
 * @uses AttributeCore
 * @param config {Object} Configuration object
 * @constructor
 */
function ButtonCore(config) {
    this.initializer(config);
}

ButtonCore.prototype = {

    /**
     *
     * @property TEMPLATE
     * @type {String}
     * @default <button/>
     */
    TEMPLATE: '<button/>',

    /**
     *
     * @property constructor
     * @type {Object}
     * @default ButtonCore
     * @private
     */
    constructor: ButtonCore,

    /**
     * @method initializer
     * @description Internal init() handler.
     * @param config {Object} Config object.
     * @private
     */
    initializer: function(config) {
        this._initNode(config);
        this._initAttributes(config);
        this._renderUI(config);
    },

    /**
     * @method _initNode
     * @description Node initializer
     * @param config {Object} Config object.
     * @private
     */
    _initNode: function(config) {
        if (config.host) {
            this._host = Y.one(config.host);
        } else {
            this._host = Y.Node.create(this.TEMPLATE);
        }
    },

    /**
     * @method _initAttributes
     * @description  Attribute initializer
     * @param config {Object} Config object.
     * @private
     */
    _initAttributes: function(config) {
        AttributeCore.call(this, ButtonCore.ATTRS, config);
    },

    /**
     * @method renderUI
     * @description Renders any UI/DOM elements for Button instances
     * @param config {Object} Config object.
     * @private
     */
    _renderUI: function() {
        var node = this.getNode(),
            nodeName = node.get('nodeName').toLowerCase();

        // Set some default node attributes
        node.addClass(ButtonCore.CLASS_NAMES.BUTTON);

        if (nodeName !== 'button' && nodeName !== 'input') {
            node.set('role', 'button');
        }
    },

    /**
     * @method enable
     * @description Sets the button's `disabled` DOM attribute to `false`
     * @public
     */
    enable: function() {
        this.set('disabled', false);
    },

    /**
     * @method disable
     * @description Sets the button's `disabled` DOM attribute to `true`
     * @public
     */
    disable: function() {
        this.set('disabled', true);
    },

    /**
     * @method getNode
     * @description Gets the button's host node
     * @return {Node} The host node instance
     * @public
     */
    getNode: function() {
        if (!this._host) {
            // If this._host doesn't exist, that means this._initNode
            // was never executed, meaning this is likely a Widget and
            // the host node should point to the boundingBox.
            this._host = this.get('boundingBox');
        }

        return this._host;
    },

    /**
     * @method _getLabel
     * @description Getter for a button's `label` ATTR
     * @return {String} The text label of the button
     * @private
     */
    _getLabel: function () {
        var node = this.getNode(),
            label = ButtonCore._getTextLabelFromNode(node);

        return label;
    },

    /**
     * @method _getLabelHTML
     * @description Getter for a button's `labelHTML` ATTR
     * @return {String} The HTML label of the button
     * @private
     */
    _getLabelHTML: function () {
        var node = this.getNode(),
            labelHTML = ButtonCore._getHTMLFromNode(node);

        return labelHTML;
    },

    /**
     * @method _setLabel
     * @description Setter for a button's `label` ATTR
     * @param value {String} The value to set for `label`
     * @param name {String} The name of this ATTR (`label`)
     * @param opts {Object} Additional options
     *    @param opts.src {String} A string identifying the callee.
     *        `internal` will not sync this value with the `labelHTML` ATTR
     * @return {String} The text label for the given node
     * @private
     */
    _setLabel: function (value, name, opts) {
        var label = Y.Escape.html(value);

        if (!opts || opts.src !== 'internal') {
            this.set('labelHTML', label, {src: 'internal'});
        }

        return label;
    },

    /**
     * @method _setLabelHTML
     * @description Setter for a button's `labelHTML` ATTR
     * @param value {String} The value to set for `labelHTML`
     * @param name {String} The name of this ATTR (`labelHTML`)
     * @param opts {Object} Additional options
     *    @param opts.src {String} A string identifying the callee.
     *        `internal` will not sync this value with the `label` ATTR
     * @return {String} The HTML label for the given node
     * @private
     */
    _setLabelHTML: function (value, name, opts) {
        var node = this.getNode(),
            labelNode = ButtonCore._getLabelNodeFromParent(node),
            nodeName = node.get('nodeName').toLowerCase();

        if (nodeName === 'input') {
            labelNode.set('value', value);
        }
        else {
            labelNode.setHTML(value);
        }

        if (!opts || opts.src !== 'internal') {
            this.set('label', value, {src: 'internal'});
        }

        return value;
    },

    /**
     * @method _setDisabled
     * @description Setter for the `disabled` ATTR
     * @param value {boolean}
     * @private
     */
    _setDisabled: function(value) {
        var node = this.getNode();

        node.getDOMNode().disabled = value; // avoid rerunning setter when this === node
        node.toggleClass(ButtonCore.CLASS_NAMES.DISABLED, value);

        return value;
    }
};

// ButtonCore inherits from AttributeCore
Y.mix(ButtonCore.prototype, AttributeCore.prototype);

/**
 * Attribute configuration.
 *
 * @property ATTRS
 * @type {Object}
 * @protected
 * @static
 */
ButtonCore.ATTRS = {

    /**
     * The text of the button's label
     *
     * @config label
     * @type String
     */
    label: {
        setter: '_setLabel',
        getter: '_getLabel',
        lazyAdd: false
    },

    /**
     * The HTML of the button's label
     *
     * This attribute accepts HTML and inserts it into the DOM **without**
     * sanitization.  This attribute should only be used with HTML that has
     * either been escaped (using `Y.Escape.html`), or sanitized according to
     * the requirements of your application.
     *
     * If all you need is support for text labels, please use the `label`
     * attribute instead.
     *
     * @config labelHTML
     * @type HTML
     */
    labelHTML: {
        setter: '_setLabelHTML',
        getter: '_getLabelHTML',
        lazyAdd: false
    },

    /**
     * The button's enabled/disabled state
     *
     * @config disabled
     * @type Boolean
     */
    disabled: {
        value: false,
        setter: '_setDisabled',
        lazyAdd: false
    }
};

/**
 * Name of this component.
 *
 * @property NAME
 * @type String
 * @static
 */
ButtonCore.NAME = "button";

/**
 * Array of static constants used to identify the classnames applied to DOM nodes
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @public
 * @static
 */
ButtonCore.CLASS_NAMES = {
    BUTTON  : getClassName('button'),
    DISABLED: getClassName('button', 'disabled'),
    SELECTED: getClassName('button', 'selected'),
    LABEL   : getClassName('button', 'label')
};

/**
 * Array of static constants used to for applying ARIA states
 *
 * @property ARIA_STATES
 * @type {Object}
 * @private
 * @static
 */
ButtonCore.ARIA_STATES = {
    PRESSED : 'aria-pressed',
    CHECKED : 'aria-checked'
};

/**
 * Array of static constants used to for applying ARIA roles
 *
 * @property ARIA_ROLES
 * @type {Object}
 * @private
 * @static
 */
ButtonCore.ARIA_ROLES = {
    BUTTON  : 'button',
    CHECKBOX: 'checkbox',
    TOGGLE  : 'toggle'
};

/**
 * Finds the label node within a button
 *
 * @method _getLabelNodeFromParent
 * @param node {Node} The parent node
 * @return {Node} The label node
 * @private
 * @static
 */
ButtonCore._getLabelNodeFromParent = function (node) {
    var labelNode = (node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node);

    return labelNode;
};

/**
 * Gets a text label from a node
 *
 * @method _getTextLabelFromNode
 * @param node {Node} The parent node
 * @return {String} The text label for a given node
 * @private
 * @static
 */
ButtonCore._getTextLabelFromNode = function (node) {
    var labelNode = ButtonCore._getLabelNodeFromParent(node),
        nodeName = labelNode.get('nodeName').toLowerCase(),
        label = labelNode.get(nodeName === 'input' ? 'value' : 'text');

    return label;
};

/**
 * A utility method that gets an HTML label from a given node
 *
 * @method _getHTMLFromNode
 * @param node {Node} The parent node
 * @return {String} The HTML label for a given node
 * @private
 * @static
 */
ButtonCore._getHTMLFromNode = function (node) {
    var labelNode = ButtonCore._getLabelNodeFromParent(node),
        label = labelNode.getHTML();

    return label;
};

/**
 * Gets the disabled attribute from a node
 *
 * @method _getDisabledFromNode
 * @param node {Node} The parent node
 * @return {boolean} The disabled state for a given node
 * @private
 * @static
 */
ButtonCore._getDisabledFromNode = function (node) {
    return node.get('disabled');
};

// Export ButtonCore
Y.ButtonCore = ButtonCore;


}, '3.17.2', {"requires": ["attribute-core", "classnamemanager", "node-base", "escape"]});
