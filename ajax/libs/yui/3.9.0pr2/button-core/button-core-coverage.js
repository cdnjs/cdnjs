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
_yuitest_coverage["build/button-core/button-core.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/button-core/button-core.js",
    code: []
};
_yuitest_coverage["build/button-core/button-core.js"].code=["YUI.add('button-core', function (Y, NAME) {","","/**"," * Provides an interface for working with button-like DOM nodes"," *"," * @module button-core"," * @since 3.5.0"," */","var getClassName = Y.ClassNameManager.getClassName;","","/**"," * Creates a button"," *"," * @class ButtonCore"," * @uses AttributeCore"," * @param config {Object} Configuration object"," * @constructor"," */","function ButtonCore(config) {","    this.initializer(config);","}","","ButtonCore.prototype = {","","    /**","     *","     * @property TEMPLATE","     * @type {String}","     * @default <button/>","     */","    TEMPLATE: '<button/>',","","    /**","     *","     * @property constructor","     * @type {Object}","     * @default ButtonCore","     * @private","     */","    constructor: ButtonCore,","","    /**","     * @method initializer","     * @description Internal init() handler.","     * @param config {Object} Config object.","     * @private","     */","    initializer: function(config) {","        this._initNode(config);","        this._initAttributes(config);","        this._renderUI(config);","    },","","    /**","     * @method _initNode","     * @description Node initializer","     * @param config {Object} Config object.","     * @private","     */","    _initNode: function(config) {","        if (config.host) {","            this._host = Y.one(config.host);","        } else {","            this._host = Y.Node.create(this.TEMPLATE);","        }","    },","","    /**","     * @method _initAttributes","     * @description  Attribute initializer","     * @param config {Object} Config object.","     * @private","     */","    _initAttributes: function(config) {","        var host = this._host,","            node = host.one('.' + ButtonCore.CLASS_NAMES.LABEL) || host;","            ","        config.label = config.label || this._getLabel(node);","        Y.AttributeCore.call(this, ButtonCore.ATTRS, config);","    },","","    /**","     * @method renderUI","     * @description Renders any UI/DOM elements for Button instances","     * @param config {Object} Config object.","     * @private","     */","    _renderUI: function() {","        var node = this.getNode(),","            tagName = node.get('tagName').toLowerCase();","","        // Set some default node attributes","        node.addClass(ButtonCore.CLASS_NAMES.BUTTON);","        ","        if (tagName !== 'button' && tagName !== 'input') {","            node.set('role', 'button');","        }","    },","","    /**","     * @method enable","     * @description Sets the button's `disabled` DOM attribute to false","     * @public","     */","    enable: function() {","        this.set('disabled', false);","    },","","    /**","     * @method disable","     * @description Sets the button's `disabled` DOM attribute to true","     * @public","     */","    disable: function() {","        this.set('disabled', true);","    },","","    /**","     * @method getNode","     * @description Gets the host DOM node for this button instance","     * @public","     */","    getNode: function() {","        return this._host;","    },","    ","    /**","     * @method _getLabel","     * @description Getter for a button's 'label' ATTR","     * @private","     */","    _getLabel: function () {","        var node    = this.getNode(),","            tagName = node.get('tagName').toLowerCase(),","            label;","","        if (tagName === 'input') {","            label = node.get('value');","        }","        else {","            label = (node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node).get('text');","        }","        ","        return label;","    },","    ","    /**","     * @method _uiSetLabel","     * @description Setter for a button's 'label' ATTR","     * @param label {string}","     * @private","     */","    _uiSetLabel: function (label) {","        var node    = this.getNode(),","            tagName = node.get('tagName').toLowerCase();","","        if (tagName === 'input') {","            node.set('value', label);","        } else {","            (node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node).set('text', label);","        }","","        return label;","    },","","    /**","     * @method _uiSetDisabled","     * @description Setter for the 'disabled' ATTR","     * @param value {boolean}","     * @private","     */","    _uiSetDisabled: function(value) {","        var node = this.getNode();","        ","        node.getDOMNode().disabled = value; // avoid rerunning setter when this === node","        node.toggleClass(ButtonCore.CLASS_NAMES.DISABLED, value);","        ","        return value;","    }","};","","","Y.mix(ButtonCore.prototype, Y.AttributeCore.prototype);","","/**"," * Attribute configuration."," *"," * @property ATTRS"," * @type {Object}"," * @protected"," * @static"," */","ButtonCore.ATTRS = {","","    /**","     * The text of the button (the `value` or `text` property)","     *","     * @attribute label","     * @type String","     */","    label: {","        setter: '_uiSetLabel',","        getter: '_getLabel',","        lazyAdd: false","    },","","    /**","     * The button's enabled/disabled state","     *","     * @attribute disabled","     * @type Boolean","     */","    disabled: {","        value: false,","        setter: '_uiSetDisabled',","        lazyAdd: false","    }","};","","/**"," * Name of this component."," *"," * @property NAME"," * @type String"," * @static"," */","ButtonCore.NAME = \"button\";","","/**"," * Array of static constants used to identify the classnames applied to DOM nodes"," *"," * @property CLASS_NAMES"," * @type {Object}"," * @public"," * @static"," */","ButtonCore.CLASS_NAMES = {","    BUTTON  : getClassName('button'),","    DISABLED: getClassName('button', 'disabled'),","    SELECTED: getClassName('button', 'selected'),","    LABEL   : getClassName('button', 'label')","};","","/**"," * Array of static constants used to for applying ARIA states"," *"," * @property CLASS_NAMES"," * @type {Object}"," * @private"," * @static"," */","ButtonCore.ARIA_STATES = {","    PRESSED : 'aria-pressed',","    CHECKED : 'aria-checked'","};","","/**"," * Array of static constants used to for applying ARIA roles"," *"," * @property CLASS_NAMES"," * @type {Object}"," * @private"," * @static"," */","ButtonCore.ARIA_ROLES = {","    BUTTON  : 'button',","    CHECKBOX: 'checkbox',","    TOGGLE  : 'toggle'","};","","// Export Button","Y.ButtonCore = ButtonCore;","","}, '@VERSION@', {\"requires\": [\"attribute-core\", \"classnamemanager\", \"node-base\"]});"];
_yuitest_coverage["build/button-core/button-core.js"].lines = {"1":0,"9":0,"19":0,"20":0,"23":0,"49":0,"50":0,"51":0,"61":0,"62":0,"64":0,"75":0,"78":0,"79":0,"89":0,"93":0,"95":0,"96":0,"106":0,"115":0,"124":0,"133":0,"137":0,"138":0,"141":0,"144":0,"154":0,"157":0,"158":0,"160":0,"163":0,"173":0,"175":0,"176":0,"178":0,"183":0,"193":0,"227":0,"237":0,"252":0,"265":0,"272":0};
_yuitest_coverage["build/button-core/button-core.js"].functions = {"ButtonCore:19":0,"initializer:48":0,"_initNode:60":0,"_initAttributes:74":0,"_renderUI:88":0,"enable:105":0,"disable:114":0,"getNode:123":0,"_getLabel:132":0,"_uiSetLabel:153":0,"_uiSetDisabled:172":0,"(anonymous 1):1":0};
_yuitest_coverage["build/button-core/button-core.js"].coveredLines = 42;
_yuitest_coverage["build/button-core/button-core.js"].coveredFunctions = 12;
_yuitest_coverline("build/button-core/button-core.js", 1);
YUI.add('button-core', function (Y, NAME) {

/**
 * Provides an interface for working with button-like DOM nodes
 *
 * @module button-core
 * @since 3.5.0
 */
_yuitest_coverfunc("build/button-core/button-core.js", "(anonymous 1)", 1);
_yuitest_coverline("build/button-core/button-core.js", 9);
var getClassName = Y.ClassNameManager.getClassName;

/**
 * Creates a button
 *
 * @class ButtonCore
 * @uses AttributeCore
 * @param config {Object} Configuration object
 * @constructor
 */
_yuitest_coverline("build/button-core/button-core.js", 19);
function ButtonCore(config) {
    _yuitest_coverfunc("build/button-core/button-core.js", "ButtonCore", 19);
_yuitest_coverline("build/button-core/button-core.js", 20);
this.initializer(config);
}

_yuitest_coverline("build/button-core/button-core.js", 23);
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
        _yuitest_coverfunc("build/button-core/button-core.js", "initializer", 48);
_yuitest_coverline("build/button-core/button-core.js", 49);
this._initNode(config);
        _yuitest_coverline("build/button-core/button-core.js", 50);
this._initAttributes(config);
        _yuitest_coverline("build/button-core/button-core.js", 51);
this._renderUI(config);
    },

    /**
     * @method _initNode
     * @description Node initializer
     * @param config {Object} Config object.
     * @private
     */
    _initNode: function(config) {
        _yuitest_coverfunc("build/button-core/button-core.js", "_initNode", 60);
_yuitest_coverline("build/button-core/button-core.js", 61);
if (config.host) {
            _yuitest_coverline("build/button-core/button-core.js", 62);
this._host = Y.one(config.host);
        } else {
            _yuitest_coverline("build/button-core/button-core.js", 64);
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
        _yuitest_coverfunc("build/button-core/button-core.js", "_initAttributes", 74);
_yuitest_coverline("build/button-core/button-core.js", 75);
var host = this._host,
            node = host.one('.' + ButtonCore.CLASS_NAMES.LABEL) || host;
            
        _yuitest_coverline("build/button-core/button-core.js", 78);
config.label = config.label || this._getLabel(node);
        _yuitest_coverline("build/button-core/button-core.js", 79);
Y.AttributeCore.call(this, ButtonCore.ATTRS, config);
    },

    /**
     * @method renderUI
     * @description Renders any UI/DOM elements for Button instances
     * @param config {Object} Config object.
     * @private
     */
    _renderUI: function() {
        _yuitest_coverfunc("build/button-core/button-core.js", "_renderUI", 88);
_yuitest_coverline("build/button-core/button-core.js", 89);
var node = this.getNode(),
            tagName = node.get('tagName').toLowerCase();

        // Set some default node attributes
        _yuitest_coverline("build/button-core/button-core.js", 93);
node.addClass(ButtonCore.CLASS_NAMES.BUTTON);
        
        _yuitest_coverline("build/button-core/button-core.js", 95);
if (tagName !== 'button' && tagName !== 'input') {
            _yuitest_coverline("build/button-core/button-core.js", 96);
node.set('role', 'button');
        }
    },

    /**
     * @method enable
     * @description Sets the button's `disabled` DOM attribute to false
     * @public
     */
    enable: function() {
        _yuitest_coverfunc("build/button-core/button-core.js", "enable", 105);
_yuitest_coverline("build/button-core/button-core.js", 106);
this.set('disabled', false);
    },

    /**
     * @method disable
     * @description Sets the button's `disabled` DOM attribute to true
     * @public
     */
    disable: function() {
        _yuitest_coverfunc("build/button-core/button-core.js", "disable", 114);
_yuitest_coverline("build/button-core/button-core.js", 115);
this.set('disabled', true);
    },

    /**
     * @method getNode
     * @description Gets the host DOM node for this button instance
     * @public
     */
    getNode: function() {
        _yuitest_coverfunc("build/button-core/button-core.js", "getNode", 123);
_yuitest_coverline("build/button-core/button-core.js", 124);
return this._host;
    },
    
    /**
     * @method _getLabel
     * @description Getter for a button's 'label' ATTR
     * @private
     */
    _getLabel: function () {
        _yuitest_coverfunc("build/button-core/button-core.js", "_getLabel", 132);
_yuitest_coverline("build/button-core/button-core.js", 133);
var node    = this.getNode(),
            tagName = node.get('tagName').toLowerCase(),
            label;

        _yuitest_coverline("build/button-core/button-core.js", 137);
if (tagName === 'input') {
            _yuitest_coverline("build/button-core/button-core.js", 138);
label = node.get('value');
        }
        else {
            _yuitest_coverline("build/button-core/button-core.js", 141);
label = (node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node).get('text');
        }
        
        _yuitest_coverline("build/button-core/button-core.js", 144);
return label;
    },
    
    /**
     * @method _uiSetLabel
     * @description Setter for a button's 'label' ATTR
     * @param label {string}
     * @private
     */
    _uiSetLabel: function (label) {
        _yuitest_coverfunc("build/button-core/button-core.js", "_uiSetLabel", 153);
_yuitest_coverline("build/button-core/button-core.js", 154);
var node    = this.getNode(),
            tagName = node.get('tagName').toLowerCase();

        _yuitest_coverline("build/button-core/button-core.js", 157);
if (tagName === 'input') {
            _yuitest_coverline("build/button-core/button-core.js", 158);
node.set('value', label);
        } else {
            _yuitest_coverline("build/button-core/button-core.js", 160);
(node.one('.' + ButtonCore.CLASS_NAMES.LABEL) || node).set('text', label);
        }

        _yuitest_coverline("build/button-core/button-core.js", 163);
return label;
    },

    /**
     * @method _uiSetDisabled
     * @description Setter for the 'disabled' ATTR
     * @param value {boolean}
     * @private
     */
    _uiSetDisabled: function(value) {
        _yuitest_coverfunc("build/button-core/button-core.js", "_uiSetDisabled", 172);
_yuitest_coverline("build/button-core/button-core.js", 173);
var node = this.getNode();
        
        _yuitest_coverline("build/button-core/button-core.js", 175);
node.getDOMNode().disabled = value; // avoid rerunning setter when this === node
        _yuitest_coverline("build/button-core/button-core.js", 176);
node.toggleClass(ButtonCore.CLASS_NAMES.DISABLED, value);
        
        _yuitest_coverline("build/button-core/button-core.js", 178);
return value;
    }
};


_yuitest_coverline("build/button-core/button-core.js", 183);
Y.mix(ButtonCore.prototype, Y.AttributeCore.prototype);

/**
 * Attribute configuration.
 *
 * @property ATTRS
 * @type {Object}
 * @protected
 * @static
 */
_yuitest_coverline("build/button-core/button-core.js", 193);
ButtonCore.ATTRS = {

    /**
     * The text of the button (the `value` or `text` property)
     *
     * @attribute label
     * @type String
     */
    label: {
        setter: '_uiSetLabel',
        getter: '_getLabel',
        lazyAdd: false
    },

    /**
     * The button's enabled/disabled state
     *
     * @attribute disabled
     * @type Boolean
     */
    disabled: {
        value: false,
        setter: '_uiSetDisabled',
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
_yuitest_coverline("build/button-core/button-core.js", 227);
ButtonCore.NAME = "button";

/**
 * Array of static constants used to identify the classnames applied to DOM nodes
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @public
 * @static
 */
_yuitest_coverline("build/button-core/button-core.js", 237);
ButtonCore.CLASS_NAMES = {
    BUTTON  : getClassName('button'),
    DISABLED: getClassName('button', 'disabled'),
    SELECTED: getClassName('button', 'selected'),
    LABEL   : getClassName('button', 'label')
};

/**
 * Array of static constants used to for applying ARIA states
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @private
 * @static
 */
_yuitest_coverline("build/button-core/button-core.js", 252);
ButtonCore.ARIA_STATES = {
    PRESSED : 'aria-pressed',
    CHECKED : 'aria-checked'
};

/**
 * Array of static constants used to for applying ARIA roles
 *
 * @property CLASS_NAMES
 * @type {Object}
 * @private
 * @static
 */
_yuitest_coverline("build/button-core/button-core.js", 265);
ButtonCore.ARIA_ROLES = {
    BUTTON  : 'button',
    CHECKBOX: 'checkbox',
    TOGGLE  : 'toggle'
};

// Export Button
_yuitest_coverline("build/button-core/button-core.js", 272);
Y.ButtonCore = ButtonCore;

}, '@VERSION@', {"requires": ["attribute-core", "classnamemanager", "node-base"]});
