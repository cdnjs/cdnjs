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
_yuitest_coverage["build/button-plugin/button-plugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/button-plugin/button-plugin.js",
    code: []
};
_yuitest_coverage["build/button-plugin/button-plugin.js"].code=["YUI.add('button-plugin', function (Y, NAME) {","","/**","* A Button Plugin","*","* @module button-plugin","* @since 3.5.0","*/","","/**","* @class Button","* @param config {Object} Configuration object","* @extends ButtonCore","* @constructor","* @namespace Plugin","*/","function ButtonPlugin() {","    ButtonPlugin.superclass.constructor.apply(this, arguments);","}","","Y.extend(ButtonPlugin, Y.ButtonCore, {","    ","    /**","    * @method _afterNodeGet","    * @param name {string}","    * @private","    */","    _afterNodeGet: function (name) {","        // TODO: point to method (_uiSetLabel, etc) instead of getter/setter","        var ATTRS = this.constructor.ATTRS,","            fn = ATTRS[name] && ATTRS[name].getter && this[ATTRS[name].getter];","            ","        if (fn) {","            return new Y.Do.AlterReturn('get ' + name, fn.call(this));","        }","    },","","    /**","    * @method _afterNodeSet","    * @param name {String}","    * @param val {String}","    * @private","    */","    _afterNodeSet: function (name, val) {","        var ATTRS = this.constructor.ATTRS,","            fn = ATTRS[name] && ATTRS[name].setter && this[ATTRS[name].setter];","            ","        if (fn) {","            fn.call(this, val);","        }","    },","","    /**","    * @method _initNode","    * @param config {Object}","    * @private","    */","    _initNode: function(config) {","        var node = config.host;","        this._host = node;","        ","        Y.Do.after(this._afterNodeGet, node, 'get', this);","        Y.Do.after(this._afterNodeSet, node, 'set', this);","    },","","    /**","    * @method destroy","    * @private","    */","    destroy: function(){","        // Nothing to do, but things are happier with it here","    }","    ","}, {","    ","    /**","    * Attribute configuration.","    *","    * @property ATTRS","    * @type {Object}","    * @private","    * @static","    */","    ATTRS: Y.merge(Y.ButtonCore.ATTRS),","    ","    /**","    * Name of this component.","    *","    * @property NAME","    * @type String","    * @static","    */","    NAME: 'buttonPlugin',","    ","    /**","    * Namespace of this component.","    *","    * @property NS","    * @type String","    * @static","    */","    NS: 'button'","    ","});","","/**","* @method createNode","* @description A factory that plugs a Y.Node instance with Y.Plugin.Button","* @param node {Object}","* @param config {Object}","* @return {Object} A plugged Y.Node instance","* @public","*/","ButtonPlugin.createNode = function(node, config) {","    var template;","","    if (node && !config) {","        if (! (node.nodeType || node.getDOMNode || typeof node === 'string')) {","            config = node;","            node = config.srcNode;","        }","    }","","    config   = config || {};","    template = config.template || Y.Plugin.Button.prototype.TEMPLATE;","    node     = node || config.srcNode || Y.DOM.create(template);","","    return Y.one(node).plug(Y.Plugin.Button, config);","};","","Y.namespace('Plugin').Button = ButtonPlugin;","","","}, '@VERSION@', {\"requires\": [\"button-core\", \"cssbutton\", \"node-pluginhost\"]});"];
_yuitest_coverage["build/button-plugin/button-plugin.js"].lines = {"1":0,"17":0,"18":0,"21":0,"30":0,"33":0,"34":0,"45":0,"48":0,"49":0,"59":0,"60":0,"62":0,"63":0,"114":0,"115":0,"117":0,"118":0,"119":0,"120":0,"124":0,"125":0,"126":0,"128":0,"131":0};
_yuitest_coverage["build/button-plugin/button-plugin.js"].functions = {"ButtonPlugin:17":0,"_afterNodeGet:28":0,"_afterNodeSet:44":0,"_initNode:58":0,"createNode:114":0,"(anonymous 1):1":0};
_yuitest_coverage["build/button-plugin/button-plugin.js"].coveredLines = 25;
_yuitest_coverage["build/button-plugin/button-plugin.js"].coveredFunctions = 6;
_yuitest_coverline("build/button-plugin/button-plugin.js", 1);
YUI.add('button-plugin', function (Y, NAME) {

/**
* A Button Plugin
*
* @module button-plugin
* @since 3.5.0
*/

/**
* @class Button
* @param config {Object} Configuration object
* @extends ButtonCore
* @constructor
* @namespace Plugin
*/
_yuitest_coverfunc("build/button-plugin/button-plugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/button-plugin/button-plugin.js", 17);
function ButtonPlugin() {
    _yuitest_coverfunc("build/button-plugin/button-plugin.js", "ButtonPlugin", 17);
_yuitest_coverline("build/button-plugin/button-plugin.js", 18);
ButtonPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/button-plugin/button-plugin.js", 21);
Y.extend(ButtonPlugin, Y.ButtonCore, {
    
    /**
    * @method _afterNodeGet
    * @param name {string}
    * @private
    */
    _afterNodeGet: function (name) {
        // TODO: point to method (_uiSetLabel, etc) instead of getter/setter
        _yuitest_coverfunc("build/button-plugin/button-plugin.js", "_afterNodeGet", 28);
_yuitest_coverline("build/button-plugin/button-plugin.js", 30);
var ATTRS = this.constructor.ATTRS,
            fn = ATTRS[name] && ATTRS[name].getter && this[ATTRS[name].getter];
            
        _yuitest_coverline("build/button-plugin/button-plugin.js", 33);
if (fn) {
            _yuitest_coverline("build/button-plugin/button-plugin.js", 34);
return new Y.Do.AlterReturn('get ' + name, fn.call(this));
        }
    },

    /**
    * @method _afterNodeSet
    * @param name {String}
    * @param val {String}
    * @private
    */
    _afterNodeSet: function (name, val) {
        _yuitest_coverfunc("build/button-plugin/button-plugin.js", "_afterNodeSet", 44);
_yuitest_coverline("build/button-plugin/button-plugin.js", 45);
var ATTRS = this.constructor.ATTRS,
            fn = ATTRS[name] && ATTRS[name].setter && this[ATTRS[name].setter];
            
        _yuitest_coverline("build/button-plugin/button-plugin.js", 48);
if (fn) {
            _yuitest_coverline("build/button-plugin/button-plugin.js", 49);
fn.call(this, val);
        }
    },

    /**
    * @method _initNode
    * @param config {Object}
    * @private
    */
    _initNode: function(config) {
        _yuitest_coverfunc("build/button-plugin/button-plugin.js", "_initNode", 58);
_yuitest_coverline("build/button-plugin/button-plugin.js", 59);
var node = config.host;
        _yuitest_coverline("build/button-plugin/button-plugin.js", 60);
this._host = node;
        
        _yuitest_coverline("build/button-plugin/button-plugin.js", 62);
Y.Do.after(this._afterNodeGet, node, 'get', this);
        _yuitest_coverline("build/button-plugin/button-plugin.js", 63);
Y.Do.after(this._afterNodeSet, node, 'set', this);
    },

    /**
    * @method destroy
    * @private
    */
    destroy: function(){
        // Nothing to do, but things are happier with it here
    }
    
}, {
    
    /**
    * Attribute configuration.
    *
    * @property ATTRS
    * @type {Object}
    * @private
    * @static
    */
    ATTRS: Y.merge(Y.ButtonCore.ATTRS),
    
    /**
    * Name of this component.
    *
    * @property NAME
    * @type String
    * @static
    */
    NAME: 'buttonPlugin',
    
    /**
    * Namespace of this component.
    *
    * @property NS
    * @type String
    * @static
    */
    NS: 'button'
    
});

/**
* @method createNode
* @description A factory that plugs a Y.Node instance with Y.Plugin.Button
* @param node {Object}
* @param config {Object}
* @return {Object} A plugged Y.Node instance
* @public
*/
_yuitest_coverline("build/button-plugin/button-plugin.js", 114);
ButtonPlugin.createNode = function(node, config) {
    _yuitest_coverfunc("build/button-plugin/button-plugin.js", "createNode", 114);
_yuitest_coverline("build/button-plugin/button-plugin.js", 115);
var template;

    _yuitest_coverline("build/button-plugin/button-plugin.js", 117);
if (node && !config) {
        _yuitest_coverline("build/button-plugin/button-plugin.js", 118);
if (! (node.nodeType || node.getDOMNode || typeof node === 'string')) {
            _yuitest_coverline("build/button-plugin/button-plugin.js", 119);
config = node;
            _yuitest_coverline("build/button-plugin/button-plugin.js", 120);
node = config.srcNode;
        }
    }

    _yuitest_coverline("build/button-plugin/button-plugin.js", 124);
config   = config || {};
    _yuitest_coverline("build/button-plugin/button-plugin.js", 125);
template = config.template || Y.Plugin.Button.prototype.TEMPLATE;
    _yuitest_coverline("build/button-plugin/button-plugin.js", 126);
node     = node || config.srcNode || Y.DOM.create(template);

    _yuitest_coverline("build/button-plugin/button-plugin.js", 128);
return Y.one(node).plug(Y.Plugin.Button, config);
};

_yuitest_coverline("build/button-plugin/button-plugin.js", 131);
Y.namespace('Plugin').Button = ButtonPlugin;


}, '@VERSION@', {"requires": ["button-core", "cssbutton", "node-pluginhost"]});
