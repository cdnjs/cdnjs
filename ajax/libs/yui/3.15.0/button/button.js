/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('button', function (Y, NAME) {

/**
 * A Button Widget
 *
 * @module button
 * @since 3.5.0
 */

var ButtonCore = Y.ButtonCore,
    CLASS_NAMES = ButtonCore.CLASS_NAMES,
    ARIA_STATES = ButtonCore.ARIA_STATES,
    ARIA_ROLES = ButtonCore.ARIA_ROLES;

/**
 * Creates a Button
 *
 * @class Button
 * @extends Widget
 * @uses ButtonCore
 * @param config {Object} Configuration object
 * @constructor
 */
function Button() {
    Button.superclass.constructor.apply(this, arguments);
}

/* Button extends Widget */
Y.extend(Button, Y.Widget,  {

    // Y.Button prototype properties

    /**
     * Bounding box template that will contain the Button's DOM subtree.
     *
     * @property BOUNDING_TEMPLATE
     * @type {String}
     * @default <button/>
     */
    BOUNDING_TEMPLATE : ButtonCore.prototype.TEMPLATE,

    /**
     * Content box template
     *
     * @property CONTENT_TEMPLATE
     * @type {String}
     * @default null
     */
    CONTENT_TEMPLATE : null

}, {

    // Y.Button static properties

    /**
     * The identity of the widget.
     *
     * @property NAME
     * @type String
     * @default 'button'
     * @readOnly
     * @protected
     * @static
     */
    NAME: ButtonCore.NAME,

    /**
     * Static property used to define the default attribute configuration of
     * the Widget.
     *
     * @property ATTRS
     * @type {Object}
     * @protected
     * @static
     */
    ATTRS: ButtonCore.ATTRS,

    /**
     * The text of the button's label
     *
     * @attribute label
     * @type String
     */

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
     * @attribute labelHTML
     * @type HTML
     */

    /**
     * @property HTML_PARSER
     * @type {Object}
     * @protected
     * @static
     */
    HTML_PARSER: {
        labelHTML: ButtonCore._getHTMLFromNode,
        disabled: ButtonCore._getDisabledFromNode
    },

    /**
     * List of class names used in the Button's DOM
     *
     * @property CLASS_NAMES
     * @type Object
     * @static
     */
    CLASS_NAMES: CLASS_NAMES
});

Y.mix(Button.prototype, ButtonCore.prototype);

/**
 * Creates a ToggleButton
 *
 * @class ToggleButton
 * @extends Button
 * @param config {Object} Configuration object
 * @constructor
 */
function ToggleButton() {
    Button.superclass.constructor.apply(this, arguments);
}

// TODO: move to ButtonCore subclass to enable toggle plugin, widget, etc.
/* ToggleButton extends Button */
Y.extend(ToggleButton, Button,  {

    /**
     *
     *
     * @property trigger
     * @type {String}
     * @default
     */
    trigger: 'click',

    /**
     *
     *
     * @property selectedAttrName
     * @type {String}
     * @default
     */
    selectedAttrName: '',

    /**
     *
     * @method initializer
     */
    initializer: function (config) {
        var button = this,
            type = button.get('type'),
            selectedAttrName = (type === "checkbox" ? 'checked' : 'pressed'),
            selectedState = config[selectedAttrName] || false;

        // Create the checked/pressed attribute
        button.addAttr(selectedAttrName, {
            value: selectedState
        });

        button.selectedAttrName = selectedAttrName;
    },

    /**
     *
     * @method destructor
     */
    destructor: function () {
        delete this.selectedAttrName;
    },

    /**
     * @method bindUI
     * @description Hooks up events for the widget
     */
    bindUI: function() {
         var button = this,
             cb = button.get('contentBox');

        ToggleButton.superclass.bindUI.call(button);

        cb.on(button.trigger, button.toggle, button);
        button.after(button.selectedAttrName + 'Change', button._afterSelectedChange);
    },

    /**
     * @method syncUI
     * @description Syncs the UI for the widget
     */
    syncUI: function() {
        var button = this,
            cb = button.get('contentBox'),
            type = button.get('type'),
            ROLES = ToggleButton.ARIA_ROLES,
            role = (type === 'checkbox' ? ROLES.CHECKBOX : ROLES.TOGGLE),
            selectedAttrName = button.selectedAttrName;

        ToggleButton.superclass.syncUI.call(button);

        cb.set('role', role);
        button._uiSetSelected(button.get(selectedAttrName));
    },

    /**
     * @method _afterSelectedChange
     * @private
     */
    _afterSelectedChange: function(e){
        this._uiSetSelected(e.newVal);
    },

    /**
     * @method _uiSetSelected
     * @private
     */
    _uiSetSelected: function(value) {
        var button = this,
            cb = button.get('contentBox'),
            STATES = ToggleButton.ARIA_STATES,
            type = button.get('type'),
            ariaState = (type === 'checkbox' ? STATES.CHECKED : STATES.PRESSED);

        cb.toggleClass(Button.CLASS_NAMES.SELECTED, value);
        cb.set(ariaState, value);
    },

    /**
     * @method toggle
     * @description Toggles the selected/pressed/checked state of a ToggleButton
     * @public
     */
    toggle: function() {
        var button = this;
        button._set(button.selectedAttrName, !button.get(button.selectedAttrName));
    }

}, {

    /**
     * The identity of the widget.
     *
     * @property NAME
     * @type {String}
     * @default 'buttongroup'
     * @readOnly
     * @protected
     * @static
     */
    NAME: 'toggleButton',

    /**
     * Static property used to define the default attribute configuration of
     * the Widget.
     *
     * @property ATTRS
     * @type {Object}
     * @protected
     * @static
     */
    ATTRS: {

       /**
        *
        *
        * @attribute type
        * @type String
        */
        type: {
            value: 'toggle',
            writeOnce: 'initOnly'
        }
    },

    /**
     * @property HTML_PARSER
     * @type {Object}
     * @protected
     * @static
     */
    HTML_PARSER: {
        checked: function(node) {
            return node.hasClass(CLASS_NAMES.SELECTED);
        },
        pressed: function(node) {
            return node.hasClass(CLASS_NAMES.SELECTED);
        }
    },

    /**
     * @property ARIA_STATES
     * @type {Object}
     * @protected
     * @static
     */
    ARIA_STATES: ARIA_STATES,

    /**
     * @property ARIA_ROLES
     * @type {Object}
     * @protected
     * @static
     */
    ARIA_ROLES: ARIA_ROLES,

    /**
     * Array of static constants used to identify the classnames applied to DOM nodes
     *
     * @property CLASS_NAMES
     * @type Object
     * @static
     */
    CLASS_NAMES: CLASS_NAMES

});

// Export
Y.Button = Button;
Y.ToggleButton = ToggleButton;


}, '3.15.0', {"requires": ["button-core", "cssbutton", "widget"]});
