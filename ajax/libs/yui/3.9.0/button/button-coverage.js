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
_yuitest_coverage["build/button/button.js"].code=["YUI.add('button', function (Y, NAME) {","","/**"," * A Button Widget"," *"," * @module button"," * @since 3.5.0"," */","","var CLASS_NAMES = Y.ButtonCore.CLASS_NAMES,","    ARIA_STATES = Y.ButtonCore.ARIA_STATES,","    ARIA_ROLES  = Y.ButtonCore.ARIA_ROLES;","","/**"," * Creates a Button"," *"," * @class Button"," * @extends Widget"," * @uses ButtonCore"," * @param config {Object} Configuration object"," * @constructor"," */","function Button() {","    Button.superclass.constructor.apply(this, arguments);","}","","/* Button extends Widget */","Y.extend(Button, Y.Widget,  {","","    /**","     * Bounding box template that will contain the Button's DOM subtree.","     *","     * @property BOUNDING_TEMPLATE","     * @type {String}","     * @default <button/>","     */","    BOUNDING_TEMPLATE : Y.ButtonCore.prototype.TEMPLATE,","","    /**","     * Content box template","     *","     * @property CONTENT_TEMPLATE","     * @type {String}","     * @default null","     */","    CONTENT_TEMPLATE  : null,","","    /**","     * @method initializer","     * @description Internal init() handler.","     * @param config {Object} Config object.","     * @private","     */","    initializer: function(config) {","        // ButtonCore requires this","        this._host = this.get('boundingBox');","","        // A workaround until there's a better way to handle setting Node attributes","        // via HTML parsing in classes that extend Widget","        if (config.disabled) {","            this.set('disabled', config.disabled);","        }","    },","","    /**","     * bindUI implementation","     *","     * @description Hooks up events for the widget","     * @method bindUI","     */","    bindUI: function() {","        var button = this;","        button.after('labelChange', button._afterLabelChange);","        button.after('disabledChange', button._afterDisabledChange);","    },","","    /**","     * @method syncUI","     * @description Updates button attributes","     */","    syncUI: function() {","        var button = this;","        Y.ButtonCore.prototype._uiSetLabel.call(button, button.get('label'));","        Y.ButtonCore.prototype._uiSetDisabled.call(button, button.get('disabled'));","    },","","    /**","     * @method _afterLabelChange","     * @private","     */","    _afterLabelChange: function(e) {","        Y.ButtonCore.prototype._uiSetLabel.call(this, e.newVal);","    },","","    /**","     * @method _afterDisabledChange","     * @private","     */","    _afterDisabledChange: function(e) {","        // Unable to use `this._uiSetDisabled` because that points","        // to `Y.Widget.prototype._uiSetDisabled`.","        // This works for now.","        // @TODO Investigate most appropriate solution.","        Y.ButtonCore.prototype._uiSetDisabled.call(this, e.newVal);","    }","","}, {","    // Y.Button static properties","","    /**","     * The identity of the widget.","     *","     * @property NAME","     * @type String","     * @default 'button'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'button',","","    /**","     * Static property used to define the default attribute configuration of","     * the Widget.","     *","     * @property ATTRS","     * @type {Object}","     * @protected","     * @static","     */","    ATTRS: {","","        /**","         * The text of the button (the `value` or `text` property)","         *","         * @attribute label","         * @type String","         */","        label: {","            value: Y.ButtonCore.ATTRS.label.value","        }","    },","","    /**","     * @property HTML_PARSER","     * @type {Object}","     * @protected","     * @static","     */","    HTML_PARSER: {","        label: function(node) {","            this._host = node; // TODO: remove","            return this._getLabel();","        },","","        disabled: function(node) {","            return node.getDOMNode().disabled;","        }","    },","","    /**","     * List of class names used in the Button's DOM","     *","     * @property CLASS_NAMES","     * @type Object","     * @static","     */","    CLASS_NAMES: CLASS_NAMES","});","","Y.mix(Button.prototype, Y.ButtonCore.prototype);","","/**"," * Creates a ToggleButton"," *"," * @class ToggleButton"," * @extends Button"," * @param config {Object} Configuration object"," * @constructor"," */","function ToggleButton() {","    Button.superclass.constructor.apply(this, arguments);","}","","// TODO: move to ButtonCore subclass to enable toggle plugin, widget, etc.","/* ToggleButton extends Button */","Y.extend(ToggleButton, Button,  {","","    /**","     *","     *","     * @property trigger","     * @type {String}","     * @default","     */","    trigger: 'click',","","    /**","     *","     *","     * @property selectedAttrName","     * @type {String}","     * @default","     */","    selectedAttrName: '',","    ","    /**","     *","     * @method initializer","     */","    initializer: function (config) {","        var button = this,","            type = button.get('type'),","            selectedAttrName = (type === \"checkbox\" ? 'checked' : 'pressed'),","            selectedState = config[selectedAttrName] || false;","        ","        // Create the checked/pressed attribute","        button.addAttr(selectedAttrName, {","            value: selectedState","        });","        ","        button.selectedAttrName = selectedAttrName;","    },","    ","    /**","     *","     * @method destructor","     */","    destructor: function () {","        delete this.selectedAttrName;","    },","    ","    /**","     * @method bindUI","     * @description Hooks up events for the widget","     */","    bindUI: function() {","         var button = this,","             cb = button.get('contentBox');","        ","        ToggleButton.superclass.bindUI.call(button);","        ","        cb.on(button.trigger, button.toggle, button);","        button.after(button.selectedAttrName + 'Change', button._afterSelectedChange);","    },","","    /**","     * @method syncUI","     * @description Syncs the UI for the widget","     */","    syncUI: function() {","        var button = this,","            cb = button.get('contentBox'),","            type = button.get('type'),","            ROLES = ToggleButton.ARIA_ROLES,","            role = (type === 'checkbox' ? ROLES.CHECKBOX : ROLES.TOGGLE),","            selectedAttrName = button.selectedAttrName;","","        ToggleButton.superclass.syncUI.call(button);","        ","        cb.set('role', role);","        button._uiSetSelected(button.get(selectedAttrName));","    },","    ","    /**","     * @method _afterSelectedChange","     * @private","     */","    _afterSelectedChange: function(e){","        this._uiSetSelected(e.newVal);","    },","    ","    /**","     * @method _uiSetSelected","     * @private","     */","    _uiSetSelected: function(value) {","        var button = this,","            cb = button.get('contentBox'),","            STATES = ToggleButton.ARIA_STATES,","            type = button.get('type'),","            ariaState = (type === 'checkbox' ? STATES.CHECKED : STATES.PRESSED);","        ","        cb.toggleClass(Button.CLASS_NAMES.SELECTED, value);","        cb.set(ariaState, value);","    },","    ","    /**","     * @method toggle","     * @description Toggles the selected/pressed/checked state of a ToggleButton","     * @public","     */","    toggle: function() {","        var button = this;","        button._set(button.selectedAttrName, !button.get(button.selectedAttrName));","    }","","}, {","    ","    /**","     * The identity of the widget.","     *","     * @property NAME","     * @type {String}","     * @default 'buttongroup'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'toggleButton',","    ","    /**","     * Static property used to define the default attribute configuration of","     * the Widget.","     *","     * @property ATTRS","     * @type {Object}","     * @protected","     * @static","     */","    ATTRS: {","","       /**","        *","        *","        * @attribute type","        * @type String","        */","        type: {","            value: 'toggle',","            writeOnce: 'initOnly'","        }","    },","    ","    /**","     * @property HTML_PARSER","     * @type {Object}","     * @protected","     * @static","     */","    HTML_PARSER: {","        checked: function(node) {","            return node.hasClass(CLASS_NAMES.SELECTED);","        },","        pressed: function(node) {","            return node.hasClass(CLASS_NAMES.SELECTED);","        }","    },","    ","    /**","     * @property ARIA_STATES","     * @type {Object}","     * @protected","     * @static","     */","    ARIA_STATES: ARIA_STATES,","","    /**","     * @property ARIA_ROLES","     * @type {Object}","     * @protected","     * @static","     */","    ARIA_ROLES: ARIA_ROLES,","","    /**","     * Array of static constants used to identify the classnames applied to DOM nodes","     *","     * @property CLASS_NAMES","     * @type Object","     * @static","     */","    CLASS_NAMES: CLASS_NAMES","    ","});","","// Export","Y.Button = Button;","Y.ToggleButton = ToggleButton;","","","}, '@VERSION@', {\"requires\": [\"button-core\", \"cssbutton\", \"widget\"]});"];
_yuitest_coverage["build/button/button.js"].lines = {"1":0,"10":0,"23":0,"24":0,"28":0,"56":0,"60":0,"61":0,"72":0,"73":0,"74":0,"82":0,"83":0,"84":0,"92":0,"104":0,"152":0,"153":0,"157":0,"171":0,"181":0,"182":0,"187":0,"212":0,"218":0,"222":0,"230":0,"238":0,"241":0,"243":0,"244":0,"252":0,"259":0,"261":0,"262":0,"270":0,"278":0,"284":0,"285":0,"294":0,"295":0,"343":0,"346":0,"378":0,"379":0};
_yuitest_coverage["build/button/button.js"].functions = {"Button:23":0,"initializer:54":0,"bindUI:71":0,"syncUI:81":0,"_afterLabelChange:91":0,"_afterDisabledChange:99":0,"label:151":0,"disabled:156":0,"ToggleButton:181":0,"initializer:211":0,"destructor:229":0,"bindUI:237":0,"syncUI:251":0,"_afterSelectedChange:269":0,"_uiSetSelected:277":0,"toggle:293":0,"checked:342":0,"pressed:345":0,"(anonymous 1):1":0};
_yuitest_coverage["build/button/button.js"].coveredLines = 45;
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
    initializer: function(config) {
        // ButtonCore requires this
        _yuitest_coverfunc("build/button/button.js", "initializer", 54);
_yuitest_coverline("build/button/button.js", 56);
this._host = this.get('boundingBox');

        // A workaround until there's a better way to handle setting Node attributes
        // via HTML parsing in classes that extend Widget
        _yuitest_coverline("build/button/button.js", 60);
if (config.disabled) {
            _yuitest_coverline("build/button/button.js", 61);
this.set('disabled', config.disabled);
        }
    },

    /**
     * bindUI implementation
     *
     * @description Hooks up events for the widget
     * @method bindUI
     */
    bindUI: function() {
        _yuitest_coverfunc("build/button/button.js", "bindUI", 71);
_yuitest_coverline("build/button/button.js", 72);
var button = this;
        _yuitest_coverline("build/button/button.js", 73);
button.after('labelChange', button._afterLabelChange);
        _yuitest_coverline("build/button/button.js", 74);
button.after('disabledChange', button._afterDisabledChange);
    },

    /**
     * @method syncUI
     * @description Updates button attributes
     */
    syncUI: function() {
        _yuitest_coverfunc("build/button/button.js", "syncUI", 81);
_yuitest_coverline("build/button/button.js", 82);
var button = this;
        _yuitest_coverline("build/button/button.js", 83);
Y.ButtonCore.prototype._uiSetLabel.call(button, button.get('label'));
        _yuitest_coverline("build/button/button.js", 84);
Y.ButtonCore.prototype._uiSetDisabled.call(button, button.get('disabled'));
    },

    /**
     * @method _afterLabelChange
     * @private
     */
    _afterLabelChange: function(e) {
        _yuitest_coverfunc("build/button/button.js", "_afterLabelChange", 91);
_yuitest_coverline("build/button/button.js", 92);
Y.ButtonCore.prototype._uiSetLabel.call(this, e.newVal);
    },

    /**
     * @method _afterDisabledChange
     * @private
     */
    _afterDisabledChange: function(e) {
        // Unable to use `this._uiSetDisabled` because that points
        // to `Y.Widget.prototype._uiSetDisabled`.
        // This works for now.
        // @TODO Investigate most appropriate solution.
        _yuitest_coverfunc("build/button/button.js", "_afterDisabledChange", 99);
_yuitest_coverline("build/button/button.js", 104);
Y.ButtonCore.prototype._uiSetDisabled.call(this, e.newVal);
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
            _yuitest_coverfunc("build/button/button.js", "label", 151);
_yuitest_coverline("build/button/button.js", 152);
this._host = node; // TODO: remove
            _yuitest_coverline("build/button/button.js", 153);
return this._getLabel();
        },

        disabled: function(node) {
            _yuitest_coverfunc("build/button/button.js", "disabled", 156);
_yuitest_coverline("build/button/button.js", 157);
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

_yuitest_coverline("build/button/button.js", 171);
Y.mix(Button.prototype, Y.ButtonCore.prototype);

/**
 * Creates a ToggleButton
 *
 * @class ToggleButton
 * @extends Button
 * @param config {Object} Configuration object
 * @constructor
 */
_yuitest_coverline("build/button/button.js", 181);
function ToggleButton() {
    _yuitest_coverfunc("build/button/button.js", "ToggleButton", 181);
_yuitest_coverline("build/button/button.js", 182);
Button.superclass.constructor.apply(this, arguments);
}

// TODO: move to ButtonCore subclass to enable toggle plugin, widget, etc.
/* ToggleButton extends Button */
_yuitest_coverline("build/button/button.js", 187);
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
        _yuitest_coverfunc("build/button/button.js", "initializer", 211);
_yuitest_coverline("build/button/button.js", 212);
var button = this,
            type = button.get('type'),
            selectedAttrName = (type === "checkbox" ? 'checked' : 'pressed'),
            selectedState = config[selectedAttrName] || false;
        
        // Create the checked/pressed attribute
        _yuitest_coverline("build/button/button.js", 218);
button.addAttr(selectedAttrName, {
            value: selectedState
        });
        
        _yuitest_coverline("build/button/button.js", 222);
button.selectedAttrName = selectedAttrName;
    },
    
    /**
     *
     * @method destructor
     */
    destructor: function () {
        _yuitest_coverfunc("build/button/button.js", "destructor", 229);
_yuitest_coverline("build/button/button.js", 230);
delete this.selectedAttrName;
    },
    
    /**
     * @method bindUI
     * @description Hooks up events for the widget
     */
    bindUI: function() {
         _yuitest_coverfunc("build/button/button.js", "bindUI", 237);
_yuitest_coverline("build/button/button.js", 238);
var button = this,
             cb = button.get('contentBox');
        
        _yuitest_coverline("build/button/button.js", 241);
ToggleButton.superclass.bindUI.call(button);
        
        _yuitest_coverline("build/button/button.js", 243);
cb.on(button.trigger, button.toggle, button);
        _yuitest_coverline("build/button/button.js", 244);
button.after(button.selectedAttrName + 'Change', button._afterSelectedChange);
    },

    /**
     * @method syncUI
     * @description Syncs the UI for the widget
     */
    syncUI: function() {
        _yuitest_coverfunc("build/button/button.js", "syncUI", 251);
_yuitest_coverline("build/button/button.js", 252);
var button = this,
            cb = button.get('contentBox'),
            type = button.get('type'),
            ROLES = ToggleButton.ARIA_ROLES,
            role = (type === 'checkbox' ? ROLES.CHECKBOX : ROLES.TOGGLE),
            selectedAttrName = button.selectedAttrName;

        _yuitest_coverline("build/button/button.js", 259);
ToggleButton.superclass.syncUI.call(button);
        
        _yuitest_coverline("build/button/button.js", 261);
cb.set('role', role);
        _yuitest_coverline("build/button/button.js", 262);
button._uiSetSelected(button.get(selectedAttrName));
    },
    
    /**
     * @method _afterSelectedChange
     * @private
     */
    _afterSelectedChange: function(e){
        _yuitest_coverfunc("build/button/button.js", "_afterSelectedChange", 269);
_yuitest_coverline("build/button/button.js", 270);
this._uiSetSelected(e.newVal);
    },
    
    /**
     * @method _uiSetSelected
     * @private
     */
    _uiSetSelected: function(value) {
        _yuitest_coverfunc("build/button/button.js", "_uiSetSelected", 277);
_yuitest_coverline("build/button/button.js", 278);
var button = this,
            cb = button.get('contentBox'),
            STATES = ToggleButton.ARIA_STATES,
            type = button.get('type'),
            ariaState = (type === 'checkbox' ? STATES.CHECKED : STATES.PRESSED);
        
        _yuitest_coverline("build/button/button.js", 284);
cb.toggleClass(Button.CLASS_NAMES.SELECTED, value);
        _yuitest_coverline("build/button/button.js", 285);
cb.set(ariaState, value);
    },
    
    /**
     * @method toggle
     * @description Toggles the selected/pressed/checked state of a ToggleButton
     * @public
     */
    toggle: function() {
        _yuitest_coverfunc("build/button/button.js", "toggle", 293);
_yuitest_coverline("build/button/button.js", 294);
var button = this;
        _yuitest_coverline("build/button/button.js", 295);
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
            _yuitest_coverfunc("build/button/button.js", "checked", 342);
_yuitest_coverline("build/button/button.js", 343);
return node.hasClass(CLASS_NAMES.SELECTED);
        },
        pressed: function(node) {
            _yuitest_coverfunc("build/button/button.js", "pressed", 345);
_yuitest_coverline("build/button/button.js", 346);
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
_yuitest_coverline("build/button/button.js", 378);
Y.Button = Button;
_yuitest_coverline("build/button/button.js", 379);
Y.ToggleButton = ToggleButton;


}, '@VERSION@', {"requires": ["button-core", "cssbutton", "widget"]});
