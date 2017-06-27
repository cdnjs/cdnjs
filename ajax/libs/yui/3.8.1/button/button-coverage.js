if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/button/button.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/button/button.js",
    code: []
};
_yuitest_coverage["build/button/button.js"].code=["YUI.add('button', function (Y, NAME) {","","/**"," * A Button Widget"," *"," * @module button"," * @since 3.5.0"," */","","var CLASS_NAMES = Y.ButtonCore.CLASS_NAMES,","    ARIA_STATES = Y.ButtonCore.ARIA_STATES,","    ARIA_ROLES  = Y.ButtonCore.ARIA_ROLES;","","/**"," * Creates a Button"," *"," * @class Button"," * @extends Widget"," * @uses ButtonCore"," * @param config {Object} Configuration object"," * @constructor"," */","function Button() {","    Button.superclass.constructor.apply(this, arguments);","}","","/* Button extends Widget */","Y.extend(Button, Y.Widget,  {","","    /**","     * Bounding box template that will contain the Button's DOM subtree.","     *","     * @property BOUNDING_TEMPLATE","     * @type {String}","     * @default <button/>","     */","    BOUNDING_TEMPLATE : Y.ButtonCore.prototype.TEMPLATE,","","    /**","     * Content box template","     *","     * @property CONTENT_TEMPLATE","     * @type {String}","     * @default null","     */","    CONTENT_TEMPLATE  : null,","","    /**","     * @method initializer","     * @description Internal init() handler.","     * @param config {Object} Config object.","     * @private","     */","    initializer: function() {","        this._host = this.get('boundingBox');","    },","","    /**","     * bindUI implementation","     *","     * @description Hooks up events for the widget","     * @method bindUI","     */","    bindUI: function() {","        var button = this;","        button.after('labelChange', button._afterLabelChange);","        button.after('disabledChange', button._afterDisabledChange);","    },","","    /**","     * @method syncUI","     * @description Updates button attributes","     */","    syncUI: function() {","        var button = this;","        button._uiSetLabel(button.get('label'));","        button._uiSetDisabled(button.get('disabled'));","    },","","    /**","     * @method _afterLabelChange","     * @private","     */","    _afterLabelChange: function(e) {","        this._uiSetLabel(e.newVal);","    },","","    /**","     * @method _afterDisabledChange","     * @private","     */","    _afterDisabledChange: function(e) {","        this._uiSetDisabled(e.newVal);","    }","","}, {","    // Y.Button static properties","","    /**","     * The identity of the widget.","     *","     * @property NAME","     * @type String","     * @default 'button'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'button',","","    /**","     * Static property used to define the default attribute configuration of","     * the Widget.","     *","     * @property ATTRS","     * @type {Object}","     * @protected","     * @static","     */","    ATTRS: {","","        /**","         * The text of the button (the `value` or `text` property)","         *","         * @attribute label","         * @type String","         */","        label: {","            value: Y.ButtonCore.ATTRS.label.value","        }","    },","","    /**","     * @property HTML_PARSER","     * @type {Object}","     * @protected","     * @static","     */","    HTML_PARSER: {","        label: function(node) {","            this._host = node; // TODO: remove","            return this._getLabel();","        },","","        disabled: function(node) {","            return node.getDOMNode().disabled;","        }","    },","","    /**","     * List of class names used in the Button's DOM","     *","     * @property CLASS_NAMES","     * @type Object","     * @static","     */","    CLASS_NAMES: CLASS_NAMES","});","","Y.mix(Button.prototype, Y.ButtonCore.prototype);","","/**"," * Creates a ToggleButton"," *"," * @class ToggleButton"," * @extends Button"," * @param config {Object} Configuration object"," * @constructor"," */","function ToggleButton() {","    Button.superclass.constructor.apply(this, arguments);","}","","// TODO: move to ButtonCore subclass to enable toggle plugin, widget, etc.","/* ToggleButton extends Button */","Y.extend(ToggleButton, Button,  {","","    /**","     *","     *","     * @property trigger","     * @type {String}","     * @default","     */","    trigger: 'click',","","    /**","     *","     *","     * @property selectedAttrName","     * @type {String}","     * @default","     */","    selectedAttrName: '',","    ","    /**","     *","     * @method initializer","     */","    initializer: function (config) {","        var button = this,","            type = button.get('type'),","            selectedAttrName = (type === \"checkbox\" ? 'checked' : 'pressed'),","            selectedState = config[selectedAttrName] || false;","        ","        // Create the checked/pressed attribute","        button.addAttr(selectedAttrName, {","            value: selectedState","        });","        ","        button.selectedAttrName = selectedAttrName;","    },","    ","    /**","     *","     * @method destructor","     */","    destructor: function () {","        delete this.selectedAttrName;","    },","    ","    /**","     * @method bindUI","     * @description Hooks up events for the widget","     */","    bindUI: function() {","         var button = this,","             cb = button.get('contentBox');","        ","        ToggleButton.superclass.bindUI.call(button);","        ","        cb.on(button.trigger, button.toggle, button);","        button.after(button.selectedAttrName + 'Change', button._afterSelectedChange);","    },","","    /**","     * @method syncUI","     * @description Syncs the UI for the widget","     */","    syncUI: function() {","        var button = this,","            cb = button.get('contentBox'),","            type = button.get('type'),","            ROLES = ToggleButton.ARIA_ROLES,","            role = (type === 'checkbox' ? ROLES.CHECKBOX : ROLES.TOGGLE),","            selectedAttrName = button.selectedAttrName;","","        ToggleButton.superclass.syncUI.call(button);","        ","        cb.set('role', role);","        button._uiSetSelected(button.get(selectedAttrName));","    },","    ","    /**","     * @method _afterSelectedChange","     * @private","     */","    _afterSelectedChange: function(e){","        this._uiSetSelected(e.newVal);","    },","    ","    /**","     * @method _uiSetSelected","     * @private","     */","    _uiSetSelected: function(value) {","        var button = this,","            cb = button.get('contentBox'),","            STATES = ToggleButton.ARIA_STATES,","            type = button.get('type'),","            ariaState = (type === 'checkbox' ? STATES.CHECKED : STATES.PRESSED);","        ","        cb.toggleClass(Button.CLASS_NAMES.SELECTED, value);","        cb.set(ariaState, value);","    },","    ","    /**","     * @method toggle","     * @description Toggles the selected/pressed/checked state of a ToggleButton","     * @public","     */","    toggle: function() {","        var button = this;","        button._set(button.selectedAttrName, !button.get(button.selectedAttrName));","    }","","}, {","    ","    /**","     * The identity of the widget.","     *","     * @property NAME","     * @type {String}","     * @default 'buttongroup'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'toggleButton',","    ","    /**","     * Static property used to define the default attribute configuration of","     * the Widget.","     *","     * @property ATTRS","     * @type {Object}","     * @protected","     * @static","     */","    ATTRS: {","","       /**","        *","        *","        * @attribute type","        * @type String","        */","        type: {","            value: 'toggle',","            writeOnce: 'initOnly'","        }","    },","    ","    /**","     * @property HTML_PARSER","     * @type {Object}","     * @protected","     * @static","     */","    HTML_PARSER: {","        checked: function(node) {","            return node.hasClass(CLASS_NAMES.SELECTED);","        },","        pressed: function(node) {","            return node.hasClass(CLASS_NAMES.SELECTED);","        }","    },","    ","    /**","     * @property ARIA_STATES","     * @type {Object}","     * @protected","     * @static","     */","    ARIA_STATES: ARIA_STATES,","","    /**","     * @property ARIA_ROLES","     * @type {Object}","     * @protected","     * @static","     */","    ARIA_ROLES: ARIA_ROLES,","","    /**","     * Array of static constants used to identify the classnames applied to DOM nodes","     *","     * @property CLASS_NAMES","     * @type Object","     * @static","     */","    CLASS_NAMES: CLASS_NAMES","    ","});","","// Export","Y.Button = Button;","Y.ToggleButton = ToggleButton;","","","}, '@VERSION@', {\"requires\": [\"button-core\", \"cssbutton\", \"widget\"]});"];
_yuitest_coverage["build/button/button.js"].lines = {"1":0,"10":0,"23":0,"24":0,"28":0,"55":0,"65":0,"66":0,"67":0,"75":0,"76":0,"77":0,"85":0,"93":0,"141":0,"142":0,"146":0,"160":0,"170":0,"171":0,"176":0,"201":0,"207":0,"211":0,"219":0,"227":0,"230":0,"232":0,"233":0,"241":0,"248":0,"250":0,"251":0,"259":0,"267":0,"273":0,"274":0,"283":0,"284":0,"332":0,"335":0,"367":0,"368":0};
_yuitest_coverage["build/button/button.js"].functions = {"Button:23":0,"initializer:54":0,"bindUI:64":0,"syncUI:74":0,"_afterLabelChange:84":0,"_afterDisabledChange:92":0,"label:140":0,"disabled:145":0,"ToggleButton:170":0,"initializer:200":0,"destructor:218":0,"bindUI:226":0,"syncUI:240":0,"_afterSelectedChange:258":0,"_uiSetSelected:266":0,"toggle:282":0,"checked:331":0,"pressed:334":0,"(anonymous 1):1":0};
_yuitest_coverage["build/button/button.js"].coveredLines = 43;
_yuitest_coverage["build/button/button.js"].coveredFunctions = 19;
_yuitest_coverline("build/button/button.js", 1);
YUI.add('button', function (Y, NAME) {

/**
 * A Button Widget
 *
 * @module button
 * @since 3.5.0
 */

_yuitest_coverfunc("build/button/button.js", "(anonymous 1)", 1);
_yuitest_coverline("build/button/button.js", 10);
var CLASS_NAMES = Y.ButtonCore.CLASS_NAMES,
    ARIA_STATES = Y.ButtonCore.ARIA_STATES,
    ARIA_ROLES  = Y.ButtonCore.ARIA_ROLES;

/**
 * Creates a Button
 *
 * @class Button
 * @extends Widget
 * @uses ButtonCore
 * @param config {Object} Configuration object
 * @constructor
 */
_yuitest_coverline("build/button/button.js", 23);
function Button() {
    _yuitest_coverfunc("build/button/button.js", "Button", 23);
_yuitest_coverline("build/button/button.js", 24);
Button.superclass.constructor.apply(this, arguments);
}

/* Button extends Widget */
_yuitest_coverline("build/button/button.js", 28);
Y.extend(Button, Y.Widget,  {

    /**
     * Bounding box template that will contain the Button's DOM subtree.
     *
     * @property BOUNDING_TEMPLATE
     * @type {String}
     * @default <button/>
     */
    BOUNDING_TEMPLATE : Y.ButtonCore.prototype.TEMPLATE,

    /**
     * Content box template
     *
     * @property CONTENT_TEMPLATE
     * @type {String}
     * @default null
     */
    CONTENT_TEMPLATE  : null,

    /**
     * @method initializer
     * @description Internal init() handler.
     * @param config {Object} Config object.
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/button/button.js", "initializer", 54);
_yuitest_coverline("build/button/button.js", 55);
this._host = this.get('boundingBox');
    },

    /**
     * bindUI implementation
     *
     * @description Hooks up events for the widget
     * @method bindUI
     */
    bindUI: function() {
        _yuitest_coverfunc("build/button/button.js", "bindUI", 64);
_yuitest_coverline("build/button/button.js", 65);
var button = this;
        _yuitest_coverline("build/button/button.js", 66);
button.after('labelChange', button._afterLabelChange);
        _yuitest_coverline("build/button/button.js", 67);
button.after('disabledChange', button._afterDisabledChange);
    },

    /**
     * @method syncUI
     * @description Updates button attributes
     */
    syncUI: function() {
        _yuitest_coverfunc("build/button/button.js", "syncUI", 74);
_yuitest_coverline("build/button/button.js", 75);
var button = this;
        _yuitest_coverline("build/button/button.js", 76);
button._uiSetLabel(button.get('label'));
        _yuitest_coverline("build/button/button.js", 77);
button._uiSetDisabled(button.get('disabled'));
    },

    /**
     * @method _afterLabelChange
     * @private
     */
    _afterLabelChange: function(e) {
        _yuitest_coverfunc("build/button/button.js", "_afterLabelChange", 84);
_yuitest_coverline("build/button/button.js", 85);
this._uiSetLabel(e.newVal);
    },

    /**
     * @method _afterDisabledChange
     * @private
     */
    _afterDisabledChange: function(e) {
        _yuitest_coverfunc("build/button/button.js", "_afterDisabledChange", 92);
_yuitest_coverline("build/button/button.js", 93);
this._uiSetDisabled(e.newVal);
    }

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
    NAME: 'button',

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
         * The text of the button (the `value` or `text` property)
         *
         * @attribute label
         * @type String
         */
        label: {
            value: Y.ButtonCore.ATTRS.label.value
        }
    },

    /**
     * @property HTML_PARSER
     * @type {Object}
     * @protected
     * @static
     */
    HTML_PARSER: {
        label: function(node) {
            _yuitest_coverfunc("build/button/button.js", "label", 140);
_yuitest_coverline("build/button/button.js", 141);
this._host = node; // TODO: remove
            _yuitest_coverline("build/button/button.js", 142);
return this._getLabel();
        },

        disabled: function(node) {
            _yuitest_coverfunc("build/button/button.js", "disabled", 145);
_yuitest_coverline("build/button/button.js", 146);
return node.getDOMNode().disabled;
        }
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

_yuitest_coverline("build/button/button.js", 160);
Y.mix(Button.prototype, Y.ButtonCore.prototype);

/**
 * Creates a ToggleButton
 *
 * @class ToggleButton
 * @extends Button
 * @param config {Object} Configuration object
 * @constructor
 */
_yuitest_coverline("build/button/button.js", 170);
function ToggleButton() {
    _yuitest_coverfunc("build/button/button.js", "ToggleButton", 170);
_yuitest_coverline("build/button/button.js", 171);
Button.superclass.constructor.apply(this, arguments);
}

// TODO: move to ButtonCore subclass to enable toggle plugin, widget, etc.
/* ToggleButton extends Button */
_yuitest_coverline("build/button/button.js", 176);
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
        _yuitest_coverfunc("build/button/button.js", "initializer", 200);
_yuitest_coverline("build/button/button.js", 201);
var button = this,
            type = button.get('type'),
            selectedAttrName = (type === "checkbox" ? 'checked' : 'pressed'),
            selectedState = config[selectedAttrName] || false;
        
        // Create the checked/pressed attribute
        _yuitest_coverline("build/button/button.js", 207);
button.addAttr(selectedAttrName, {
            value: selectedState
        });
        
        _yuitest_coverline("build/button/button.js", 211);
button.selectedAttrName = selectedAttrName;
    },
    
    /**
     *
     * @method destructor
     */
    destructor: function () {
        _yuitest_coverfunc("build/button/button.js", "destructor", 218);
_yuitest_coverline("build/button/button.js", 219);
delete this.selectedAttrName;
    },
    
    /**
     * @method bindUI
     * @description Hooks up events for the widget
     */
    bindUI: function() {
         _yuitest_coverfunc("build/button/button.js", "bindUI", 226);
_yuitest_coverline("build/button/button.js", 227);
var button = this,
             cb = button.get('contentBox');
        
        _yuitest_coverline("build/button/button.js", 230);
ToggleButton.superclass.bindUI.call(button);
        
        _yuitest_coverline("build/button/button.js", 232);
cb.on(button.trigger, button.toggle, button);
        _yuitest_coverline("build/button/button.js", 233);
button.after(button.selectedAttrName + 'Change', button._afterSelectedChange);
    },

    /**
     * @method syncUI
     * @description Syncs the UI for the widget
     */
    syncUI: function() {
        _yuitest_coverfunc("build/button/button.js", "syncUI", 240);
_yuitest_coverline("build/button/button.js", 241);
var button = this,
            cb = button.get('contentBox'),
            type = button.get('type'),
            ROLES = ToggleButton.ARIA_ROLES,
            role = (type === 'checkbox' ? ROLES.CHECKBOX : ROLES.TOGGLE),
            selectedAttrName = button.selectedAttrName;

        _yuitest_coverline("build/button/button.js", 248);
ToggleButton.superclass.syncUI.call(button);
        
        _yuitest_coverline("build/button/button.js", 250);
cb.set('role', role);
        _yuitest_coverline("build/button/button.js", 251);
button._uiSetSelected(button.get(selectedAttrName));
    },
    
    /**
     * @method _afterSelectedChange
     * @private
     */
    _afterSelectedChange: function(e){
        _yuitest_coverfunc("build/button/button.js", "_afterSelectedChange", 258);
_yuitest_coverline("build/button/button.js", 259);
this._uiSetSelected(e.newVal);
    },
    
    /**
     * @method _uiSetSelected
     * @private
     */
    _uiSetSelected: function(value) {
        _yuitest_coverfunc("build/button/button.js", "_uiSetSelected", 266);
_yuitest_coverline("build/button/button.js", 267);
var button = this,
            cb = button.get('contentBox'),
            STATES = ToggleButton.ARIA_STATES,
            type = button.get('type'),
            ariaState = (type === 'checkbox' ? STATES.CHECKED : STATES.PRESSED);
        
        _yuitest_coverline("build/button/button.js", 273);
cb.toggleClass(Button.CLASS_NAMES.SELECTED, value);
        _yuitest_coverline("build/button/button.js", 274);
cb.set(ariaState, value);
    },
    
    /**
     * @method toggle
     * @description Toggles the selected/pressed/checked state of a ToggleButton
     * @public
     */
    toggle: function() {
        _yuitest_coverfunc("build/button/button.js", "toggle", 282);
_yuitest_coverline("build/button/button.js", 283);
var button = this;
        _yuitest_coverline("build/button/button.js", 284);
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
            _yuitest_coverfunc("build/button/button.js", "checked", 331);
_yuitest_coverline("build/button/button.js", 332);
return node.hasClass(CLASS_NAMES.SELECTED);
        },
        pressed: function(node) {
            _yuitest_coverfunc("build/button/button.js", "pressed", 334);
_yuitest_coverline("build/button/button.js", 335);
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
_yuitest_coverline("build/button/button.js", 367);
Y.Button = Button;
_yuitest_coverline("build/button/button.js", 368);
Y.ToggleButton = ToggleButton;


}, '@VERSION@', {"requires": ["button-core", "cssbutton", "widget"]});
