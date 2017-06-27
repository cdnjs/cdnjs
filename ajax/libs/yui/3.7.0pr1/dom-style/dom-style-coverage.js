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
_yuitest_coverage["/build/dom-style/dom-style.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/dom-style/dom-style.js",
    code: []
};
_yuitest_coverage["/build/dom-style/dom-style.js"].code=["YUI.add('dom-style', function(Y) {","","(function(Y) {","/** "," * Add style management functionality to DOM."," * @module dom"," * @submodule dom-style"," * @for DOM"," */","","var DOCUMENT_ELEMENT = 'documentElement',","    DEFAULT_VIEW = 'defaultView',","    OWNER_DOCUMENT = 'ownerDocument',","    STYLE = 'style',","    FLOAT = 'float',","    CSS_FLOAT = 'cssFloat',","    STYLE_FLOAT = 'styleFloat',","    TRANSPARENT = 'transparent',","    GET_COMPUTED_STYLE = 'getComputedStyle',","    GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',","","    WINDOW = Y.config.win,","    DOCUMENT = Y.config.doc,","    UNDEFINED = undefined,","","    Y_DOM = Y.DOM,","","    TRANSFORM = 'transform',","    VENDOR_TRANSFORM = [","        'WebkitTransform',","        'MozTransform',","        'OTransform'","    ],","","    re_color = /color$/i,","    re_unit = /width|height|top|left|right|bottom|margin|padding/i;","","Y.Array.each(VENDOR_TRANSFORM, function(val) {","    if (val in DOCUMENT[DOCUMENT_ELEMENT].style) {","        TRANSFORM = val;","    }","});","","Y.mix(Y_DOM, {","    DEFAULT_UNIT: 'px',","","    CUSTOM_STYLES: {","    },","","","    /**","     * Sets a style property for a given element.","     * @method setStyle","     * @param {HTMLElement} An HTMLElement to apply the style to.","     * @param {String} att The style property to set. ","     * @param {String|Number} val The value. ","     */","    setStyle: function(node, att, val, style) {","        style = style || node.style;","        var CUSTOM_STYLES = Y_DOM.CUSTOM_STYLES;","","        if (style) {","            if (val === null || val === '') { // normalize unsetting","                val = '';","            } else if (!isNaN(new Number(val)) && re_unit.test(att)) { // number values may need a unit","                val += Y_DOM.DEFAULT_UNIT;","            }","","            if (att in CUSTOM_STYLES) {","                if (CUSTOM_STYLES[att].set) {","                    CUSTOM_STYLES[att].set(node, val, style);","                    return; // NOTE: return","                } else if (typeof CUSTOM_STYLES[att] === 'string') {","                    att = CUSTOM_STYLES[att];","                }","            } else if (att === '') { // unset inline styles","                att = 'cssText';","                val = '';","            }","            style[att] = val; ","        }","    },","","    /**","     * Returns the current style value for the given property.","     * @method getStyle","     * @param {HTMLElement} An HTMLElement to get the style from.","     * @param {String} att The style property to get. ","     */","    getStyle: function(node, att, style) {","        style = style || node.style;","        var CUSTOM_STYLES = Y_DOM.CUSTOM_STYLES,","            val = '';","","        if (style) {","            if (att in CUSTOM_STYLES) {","                if (CUSTOM_STYLES[att].get) {","                    return CUSTOM_STYLES[att].get(node, att, style); // NOTE: return","                } else if (typeof CUSTOM_STYLES[att] === 'string') {","                    att = CUSTOM_STYLES[att];","                }","            }","            val = style[att];","            if (val === '') { // TODO: is empty string sufficient?","                val = Y_DOM[GET_COMPUTED_STYLE](node, att);","            }","        }","","        return val;","    },","","    /**","     * Sets multiple style properties.","     * @method setStyles","     * @param {HTMLElement} node An HTMLElement to apply the styles to. ","     * @param {Object} hash An object literal of property:value pairs. ","     */","    setStyles: function(node, hash) {","        var style = node.style;","        Y.each(hash, function(v, n) {","            Y_DOM.setStyle(node, n, v, style);","        }, Y_DOM);","    },","","    /**","     * Returns the computed style for the given node.","     * @method getComputedStyle","     * @param {HTMLElement} An HTMLElement to get the style from.","     * @param {String} att The style property to get. ","     * @return {String} The computed value of the style property. ","     */","    getComputedStyle: function(node, att) {","        var val = '',","            doc = node[OWNER_DOCUMENT],","            computed;","","        if (node[STYLE] && doc[DEFAULT_VIEW] && doc[DEFAULT_VIEW][GET_COMPUTED_STYLE]) {","            computed = doc[DEFAULT_VIEW][GET_COMPUTED_STYLE](node, null);","            if (computed) { // FF may be null in some cases (ticket #2530548)","                val = computed[att];","            }","        }","        return val;","    }","});","","// normalize reserved word float alternatives (\"cssFloat\" or \"styleFloat\")","if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][CSS_FLOAT] !== UNDEFINED) {","    Y_DOM.CUSTOM_STYLES[FLOAT] = CSS_FLOAT;","} else if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][STYLE_FLOAT] !== UNDEFINED) {","    Y_DOM.CUSTOM_STYLES[FLOAT] = STYLE_FLOAT;","}","","// fix opera computedStyle default color unit (convert to rgb)","if (Y.UA.opera) {","    Y_DOM[GET_COMPUTED_STYLE] = function(node, att) {","        var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],","            val = view[GET_COMPUTED_STYLE](node, '')[att];","","        if (re_color.test(att)) {","            val = Y.Color.toRGB(val);","        }","","        return val;","    };","","}","","// safari converts transparent to rgba(), others use \"transparent\"","if (Y.UA.webkit) {","    Y_DOM[GET_COMPUTED_STYLE] = function(node, att) {","        var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],","            val = view[GET_COMPUTED_STYLE](node, '')[att];","","        if (val === 'rgba(0, 0, 0, 0)') {","            val = TRANSPARENT; ","        }","","        return val;","    };","","}","","Y.DOM._getAttrOffset = function(node, attr) {","    var val = Y.DOM[GET_COMPUTED_STYLE](node, attr),","        offsetParent = node.offsetParent,","        position,","        parentOffset,","        offset;","","    if (val === 'auto') {","        position = Y.DOM.getStyle(node, 'position');","        if (position === 'static' || position === 'relative') {","            val = 0;    ","        } else if (offsetParent && offsetParent[GET_BOUNDING_CLIENT_RECT]) {","            parentOffset = offsetParent[GET_BOUNDING_CLIENT_RECT]()[attr];","            offset = node[GET_BOUNDING_CLIENT_RECT]()[attr];","            if (attr === 'left' || attr === 'top') {","                val = offset - parentOffset;","            } else {","                val = parentOffset - node[GET_BOUNDING_CLIENT_RECT]()[attr];","            }","        }","    }","","    return val;","};","","Y.DOM._getOffset = function(node) {","    var pos,","        xy = null;","","    if (node) {","        pos = Y_DOM.getStyle(node, 'position');","        xy = [","            parseInt(Y_DOM[GET_COMPUTED_STYLE](node, 'left'), 10),","            parseInt(Y_DOM[GET_COMPUTED_STYLE](node, 'top'), 10)","        ];","","        if ( isNaN(xy[0]) ) { // in case of 'auto'","            xy[0] = parseInt(Y_DOM.getStyle(node, 'left'), 10); // try inline","            if ( isNaN(xy[0]) ) { // default to offset value","                xy[0] = (pos === 'relative') ? 0 : node.offsetLeft || 0;","            }","        } ","","        if ( isNaN(xy[1]) ) { // in case of 'auto'","            xy[1] = parseInt(Y_DOM.getStyle(node, 'top'), 10); // try inline","            if ( isNaN(xy[1]) ) { // default to offset value","                xy[1] = (pos === 'relative') ? 0 : node.offsetTop || 0;","            }","        } ","    }","","    return xy;","","};","","Y_DOM.CUSTOM_STYLES.transform = {","    set: function(node, val, style) {","        style[TRANSFORM] = val;","    },","","    get: function(node, style) {","        return Y_DOM[GET_COMPUTED_STYLE](node, TRANSFORM);","    }","};","","","})(Y);","(function(Y) {","var PARSE_INT = parseInt,","    RE = RegExp;","","Y.Color = {","    KEYWORDS: {","        black: '000',","        silver: 'c0c0c0',","        gray: '808080',","        white: 'fff',","        maroon: '800000',","        red: 'f00',","        purple: '800080',","        fuchsia: 'f0f',","        green: '008000',","        lime: '0f0',","        olive: '808000',","        yellow: 'ff0',","        navy: '000080',","        blue: '00f',","        teal: '008080',","        aqua: '0ff'","    },","","    re_RGB: /^rgb\\(([0-9]+)\\s*,\\s*([0-9]+)\\s*,\\s*([0-9]+)\\)$/i,","    re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,","    re_hex3: /([0-9A-F])/gi,","","    toRGB: function(val) {","        if (!Y.Color.re_RGB.test(val)) {","            val = Y.Color.toHex(val);","        }","","        if(Y.Color.re_hex.exec(val)) {","            val = 'rgb(' + [","                PARSE_INT(RE.$1, 16),","                PARSE_INT(RE.$2, 16),","                PARSE_INT(RE.$3, 16)","            ].join(', ') + ')';","        }","        return val;","    },","","    toHex: function(val) {","        val = Y.Color.KEYWORDS[val] || val;","        if (Y.Color.re_RGB.exec(val)) {","            val = [","                Number(RE.$1).toString(16),","                Number(RE.$2).toString(16),","                Number(RE.$3).toString(16)","            ];","","            for (var i = 0; i < val.length; i++) {","                if (val[i].length < 2) {","                    val[i] = '0' + val[i];","                }","            }","","            val = val.join('');","        }","","        if (val.length < 6) {","            val = val.replace(Y.Color.re_hex3, '$1$1');","        }","","        if (val !== 'transparent' && val.indexOf('#') < 0) {","            val = '#' + val;","        }","","        return val.toUpperCase();","    }","};","})(Y);","","","","}, '@VERSION@' ,{requires:['dom-base']});"];
_yuitest_coverage["/build/dom-style/dom-style.js"].lines = {"1":0,"3":0,"11":0,"38":0,"39":0,"40":0,"44":0,"59":0,"60":0,"62":0,"63":0,"64":0,"65":0,"66":0,"69":0,"70":0,"71":0,"72":0,"73":0,"74":0,"76":0,"77":0,"78":0,"80":0,"91":0,"92":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"103":0,"104":0,"105":0,"109":0,"119":0,"120":0,"121":0,"133":0,"137":0,"138":0,"139":0,"140":0,"143":0,"148":0,"149":0,"150":0,"151":0,"155":0,"156":0,"157":0,"160":0,"161":0,"164":0,"170":0,"171":0,"172":0,"175":0,"176":0,"179":0,"184":0,"185":0,"191":0,"192":0,"193":0,"194":0,"195":0,"196":0,"197":0,"198":0,"199":0,"201":0,"206":0,"209":0,"210":0,"213":0,"214":0,"215":0,"220":0,"221":0,"222":0,"223":0,"227":0,"228":0,"229":0,"230":0,"235":0,"239":0,"241":0,"245":0,"251":0,"252":0,"255":0,"280":0,"281":0,"284":0,"285":0,"291":0,"295":0,"296":0,"297":0,"303":0,"304":0,"305":0,"309":0,"312":0,"313":0,"316":0,"317":0,"320":0};
_yuitest_coverage["/build/dom-style/dom-style.js"].functions = {"(anonymous 3):38":0,"setStyle:58":0,"getStyle:90":0,"(anonymous 4):120":0,"setStyles:118":0,"getComputedStyle:132":0,"]:156":0,"]:171":0,"_getAttrOffset:184":0,"_getOffset:209":0,"set:240":0,"get:244":0,"(anonymous 2):3":0,"toRGB:279":0,"toHex:294":0,"(anonymous 5):251":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/dom-style/dom-style.js"].coveredLines = 111;
_yuitest_coverage["/build/dom-style/dom-style.js"].coveredFunctions = 17;
_yuitest_coverline("/build/dom-style/dom-style.js", 1);
YUI.add('dom-style', function(Y) {

_yuitest_coverfunc("/build/dom-style/dom-style.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/dom-style/dom-style.js", 3);
(function(Y) {
/** 
 * Add style management functionality to DOM.
 * @module dom
 * @submodule dom-style
 * @for DOM
 */

_yuitest_coverfunc("/build/dom-style/dom-style.js", "(anonymous 2)", 3);
_yuitest_coverline("/build/dom-style/dom-style.js", 11);
var DOCUMENT_ELEMENT = 'documentElement',
    DEFAULT_VIEW = 'defaultView',
    OWNER_DOCUMENT = 'ownerDocument',
    STYLE = 'style',
    FLOAT = 'float',
    CSS_FLOAT = 'cssFloat',
    STYLE_FLOAT = 'styleFloat',
    TRANSPARENT = 'transparent',
    GET_COMPUTED_STYLE = 'getComputedStyle',
    GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',

    WINDOW = Y.config.win,
    DOCUMENT = Y.config.doc,
    UNDEFINED = undefined,

    Y_DOM = Y.DOM,

    TRANSFORM = 'transform',
    VENDOR_TRANSFORM = [
        'WebkitTransform',
        'MozTransform',
        'OTransform'
    ],

    re_color = /color$/i,
    re_unit = /width|height|top|left|right|bottom|margin|padding/i;

_yuitest_coverline("/build/dom-style/dom-style.js", 38);
Y.Array.each(VENDOR_TRANSFORM, function(val) {
    _yuitest_coverfunc("/build/dom-style/dom-style.js", "(anonymous 3)", 38);
_yuitest_coverline("/build/dom-style/dom-style.js", 39);
if (val in DOCUMENT[DOCUMENT_ELEMENT].style) {
        _yuitest_coverline("/build/dom-style/dom-style.js", 40);
TRANSFORM = val;
    }
});

_yuitest_coverline("/build/dom-style/dom-style.js", 44);
Y.mix(Y_DOM, {
    DEFAULT_UNIT: 'px',

    CUSTOM_STYLES: {
    },


    /**
     * Sets a style property for a given element.
     * @method setStyle
     * @param {HTMLElement} An HTMLElement to apply the style to.
     * @param {String} att The style property to set. 
     * @param {String|Number} val The value. 
     */
    setStyle: function(node, att, val, style) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "setStyle", 58);
_yuitest_coverline("/build/dom-style/dom-style.js", 59);
style = style || node.style;
        _yuitest_coverline("/build/dom-style/dom-style.js", 60);
var CUSTOM_STYLES = Y_DOM.CUSTOM_STYLES;

        _yuitest_coverline("/build/dom-style/dom-style.js", 62);
if (style) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 63);
if (val === null || val === '') { // normalize unsetting
                _yuitest_coverline("/build/dom-style/dom-style.js", 64);
val = '';
            } else {_yuitest_coverline("/build/dom-style/dom-style.js", 65);
if (!isNaN(new Number(val)) && re_unit.test(att)) { // number values may need a unit
                _yuitest_coverline("/build/dom-style/dom-style.js", 66);
val += Y_DOM.DEFAULT_UNIT;
            }}

            _yuitest_coverline("/build/dom-style/dom-style.js", 69);
if (att in CUSTOM_STYLES) {
                _yuitest_coverline("/build/dom-style/dom-style.js", 70);
if (CUSTOM_STYLES[att].set) {
                    _yuitest_coverline("/build/dom-style/dom-style.js", 71);
CUSTOM_STYLES[att].set(node, val, style);
                    _yuitest_coverline("/build/dom-style/dom-style.js", 72);
return; // NOTE: return
                } else {_yuitest_coverline("/build/dom-style/dom-style.js", 73);
if (typeof CUSTOM_STYLES[att] === 'string') {
                    _yuitest_coverline("/build/dom-style/dom-style.js", 74);
att = CUSTOM_STYLES[att];
                }}
            } else {_yuitest_coverline("/build/dom-style/dom-style.js", 76);
if (att === '') { // unset inline styles
                _yuitest_coverline("/build/dom-style/dom-style.js", 77);
att = 'cssText';
                _yuitest_coverline("/build/dom-style/dom-style.js", 78);
val = '';
            }}
            _yuitest_coverline("/build/dom-style/dom-style.js", 80);
style[att] = val; 
        }
    },

    /**
     * Returns the current style value for the given property.
     * @method getStyle
     * @param {HTMLElement} An HTMLElement to get the style from.
     * @param {String} att The style property to get. 
     */
    getStyle: function(node, att, style) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "getStyle", 90);
_yuitest_coverline("/build/dom-style/dom-style.js", 91);
style = style || node.style;
        _yuitest_coverline("/build/dom-style/dom-style.js", 92);
var CUSTOM_STYLES = Y_DOM.CUSTOM_STYLES,
            val = '';

        _yuitest_coverline("/build/dom-style/dom-style.js", 95);
if (style) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 96);
if (att in CUSTOM_STYLES) {
                _yuitest_coverline("/build/dom-style/dom-style.js", 97);
if (CUSTOM_STYLES[att].get) {
                    _yuitest_coverline("/build/dom-style/dom-style.js", 98);
return CUSTOM_STYLES[att].get(node, att, style); // NOTE: return
                } else {_yuitest_coverline("/build/dom-style/dom-style.js", 99);
if (typeof CUSTOM_STYLES[att] === 'string') {
                    _yuitest_coverline("/build/dom-style/dom-style.js", 100);
att = CUSTOM_STYLES[att];
                }}
            }
            _yuitest_coverline("/build/dom-style/dom-style.js", 103);
val = style[att];
            _yuitest_coverline("/build/dom-style/dom-style.js", 104);
if (val === '') { // TODO: is empty string sufficient?
                _yuitest_coverline("/build/dom-style/dom-style.js", 105);
val = Y_DOM[GET_COMPUTED_STYLE](node, att);
            }
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 109);
return val;
    },

    /**
     * Sets multiple style properties.
     * @method setStyles
     * @param {HTMLElement} node An HTMLElement to apply the styles to. 
     * @param {Object} hash An object literal of property:value pairs. 
     */
    setStyles: function(node, hash) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "setStyles", 118);
_yuitest_coverline("/build/dom-style/dom-style.js", 119);
var style = node.style;
        _yuitest_coverline("/build/dom-style/dom-style.js", 120);
Y.each(hash, function(v, n) {
            _yuitest_coverfunc("/build/dom-style/dom-style.js", "(anonymous 4)", 120);
_yuitest_coverline("/build/dom-style/dom-style.js", 121);
Y_DOM.setStyle(node, n, v, style);
        }, Y_DOM);
    },

    /**
     * Returns the computed style for the given node.
     * @method getComputedStyle
     * @param {HTMLElement} An HTMLElement to get the style from.
     * @param {String} att The style property to get. 
     * @return {String} The computed value of the style property. 
     */
    getComputedStyle: function(node, att) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "getComputedStyle", 132);
_yuitest_coverline("/build/dom-style/dom-style.js", 133);
var val = '',
            doc = node[OWNER_DOCUMENT],
            computed;

        _yuitest_coverline("/build/dom-style/dom-style.js", 137);
if (node[STYLE] && doc[DEFAULT_VIEW] && doc[DEFAULT_VIEW][GET_COMPUTED_STYLE]) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 138);
computed = doc[DEFAULT_VIEW][GET_COMPUTED_STYLE](node, null);
            _yuitest_coverline("/build/dom-style/dom-style.js", 139);
if (computed) { // FF may be null in some cases (ticket #2530548)
                _yuitest_coverline("/build/dom-style/dom-style.js", 140);
val = computed[att];
            }
        }
        _yuitest_coverline("/build/dom-style/dom-style.js", 143);
return val;
    }
});

// normalize reserved word float alternatives ("cssFloat" or "styleFloat")
_yuitest_coverline("/build/dom-style/dom-style.js", 148);
if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][CSS_FLOAT] !== UNDEFINED) {
    _yuitest_coverline("/build/dom-style/dom-style.js", 149);
Y_DOM.CUSTOM_STYLES[FLOAT] = CSS_FLOAT;
} else {_yuitest_coverline("/build/dom-style/dom-style.js", 150);
if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][STYLE_FLOAT] !== UNDEFINED) {
    _yuitest_coverline("/build/dom-style/dom-style.js", 151);
Y_DOM.CUSTOM_STYLES[FLOAT] = STYLE_FLOAT;
}}

// fix opera computedStyle default color unit (convert to rgb)
_yuitest_coverline("/build/dom-style/dom-style.js", 155);
if (Y.UA.opera) {
    _yuitest_coverline("/build/dom-style/dom-style.js", 156);
Y_DOM[GET_COMPUTED_STYLE] = function(node, att) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "]", 156);
_yuitest_coverline("/build/dom-style/dom-style.js", 157);
var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],
            val = view[GET_COMPUTED_STYLE](node, '')[att];

        _yuitest_coverline("/build/dom-style/dom-style.js", 160);
if (re_color.test(att)) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 161);
val = Y.Color.toRGB(val);
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 164);
return val;
    };

}

// safari converts transparent to rgba(), others use "transparent"
_yuitest_coverline("/build/dom-style/dom-style.js", 170);
if (Y.UA.webkit) {
    _yuitest_coverline("/build/dom-style/dom-style.js", 171);
Y_DOM[GET_COMPUTED_STYLE] = function(node, att) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "]", 171);
_yuitest_coverline("/build/dom-style/dom-style.js", 172);
var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],
            val = view[GET_COMPUTED_STYLE](node, '')[att];

        _yuitest_coverline("/build/dom-style/dom-style.js", 175);
if (val === 'rgba(0, 0, 0, 0)') {
            _yuitest_coverline("/build/dom-style/dom-style.js", 176);
val = TRANSPARENT; 
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 179);
return val;
    };

}

_yuitest_coverline("/build/dom-style/dom-style.js", 184);
Y.DOM._getAttrOffset = function(node, attr) {
    _yuitest_coverfunc("/build/dom-style/dom-style.js", "_getAttrOffset", 184);
_yuitest_coverline("/build/dom-style/dom-style.js", 185);
var val = Y.DOM[GET_COMPUTED_STYLE](node, attr),
        offsetParent = node.offsetParent,
        position,
        parentOffset,
        offset;

    _yuitest_coverline("/build/dom-style/dom-style.js", 191);
if (val === 'auto') {
        _yuitest_coverline("/build/dom-style/dom-style.js", 192);
position = Y.DOM.getStyle(node, 'position');
        _yuitest_coverline("/build/dom-style/dom-style.js", 193);
if (position === 'static' || position === 'relative') {
            _yuitest_coverline("/build/dom-style/dom-style.js", 194);
val = 0;    
        } else {_yuitest_coverline("/build/dom-style/dom-style.js", 195);
if (offsetParent && offsetParent[GET_BOUNDING_CLIENT_RECT]) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 196);
parentOffset = offsetParent[GET_BOUNDING_CLIENT_RECT]()[attr];
            _yuitest_coverline("/build/dom-style/dom-style.js", 197);
offset = node[GET_BOUNDING_CLIENT_RECT]()[attr];
            _yuitest_coverline("/build/dom-style/dom-style.js", 198);
if (attr === 'left' || attr === 'top') {
                _yuitest_coverline("/build/dom-style/dom-style.js", 199);
val = offset - parentOffset;
            } else {
                _yuitest_coverline("/build/dom-style/dom-style.js", 201);
val = parentOffset - node[GET_BOUNDING_CLIENT_RECT]()[attr];
            }
        }}
    }

    _yuitest_coverline("/build/dom-style/dom-style.js", 206);
return val;
};

_yuitest_coverline("/build/dom-style/dom-style.js", 209);
Y.DOM._getOffset = function(node) {
    _yuitest_coverfunc("/build/dom-style/dom-style.js", "_getOffset", 209);
_yuitest_coverline("/build/dom-style/dom-style.js", 210);
var pos,
        xy = null;

    _yuitest_coverline("/build/dom-style/dom-style.js", 213);
if (node) {
        _yuitest_coverline("/build/dom-style/dom-style.js", 214);
pos = Y_DOM.getStyle(node, 'position');
        _yuitest_coverline("/build/dom-style/dom-style.js", 215);
xy = [
            parseInt(Y_DOM[GET_COMPUTED_STYLE](node, 'left'), 10),
            parseInt(Y_DOM[GET_COMPUTED_STYLE](node, 'top'), 10)
        ];

        _yuitest_coverline("/build/dom-style/dom-style.js", 220);
if ( isNaN(xy[0]) ) { // in case of 'auto'
            _yuitest_coverline("/build/dom-style/dom-style.js", 221);
xy[0] = parseInt(Y_DOM.getStyle(node, 'left'), 10); // try inline
            _yuitest_coverline("/build/dom-style/dom-style.js", 222);
if ( isNaN(xy[0]) ) { // default to offset value
                _yuitest_coverline("/build/dom-style/dom-style.js", 223);
xy[0] = (pos === 'relative') ? 0 : node.offsetLeft || 0;
            }
        } 

        _yuitest_coverline("/build/dom-style/dom-style.js", 227);
if ( isNaN(xy[1]) ) { // in case of 'auto'
            _yuitest_coverline("/build/dom-style/dom-style.js", 228);
xy[1] = parseInt(Y_DOM.getStyle(node, 'top'), 10); // try inline
            _yuitest_coverline("/build/dom-style/dom-style.js", 229);
if ( isNaN(xy[1]) ) { // default to offset value
                _yuitest_coverline("/build/dom-style/dom-style.js", 230);
xy[1] = (pos === 'relative') ? 0 : node.offsetTop || 0;
            }
        } 
    }

    _yuitest_coverline("/build/dom-style/dom-style.js", 235);
return xy;

};

_yuitest_coverline("/build/dom-style/dom-style.js", 239);
Y_DOM.CUSTOM_STYLES.transform = {
    set: function(node, val, style) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "set", 240);
_yuitest_coverline("/build/dom-style/dom-style.js", 241);
style[TRANSFORM] = val;
    },

    get: function(node, style) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "get", 244);
_yuitest_coverline("/build/dom-style/dom-style.js", 245);
return Y_DOM[GET_COMPUTED_STYLE](node, TRANSFORM);
    }
};


})(Y);
_yuitest_coverline("/build/dom-style/dom-style.js", 251);
(function(Y) {
_yuitest_coverfunc("/build/dom-style/dom-style.js", "(anonymous 5)", 251);
_yuitest_coverline("/build/dom-style/dom-style.js", 252);
var PARSE_INT = parseInt,
    RE = RegExp;

_yuitest_coverline("/build/dom-style/dom-style.js", 255);
Y.Color = {
    KEYWORDS: {
        black: '000',
        silver: 'c0c0c0',
        gray: '808080',
        white: 'fff',
        maroon: '800000',
        red: 'f00',
        purple: '800080',
        fuchsia: 'f0f',
        green: '008000',
        lime: '0f0',
        olive: '808000',
        yellow: 'ff0',
        navy: '000080',
        blue: '00f',
        teal: '008080',
        aqua: '0ff'
    },

    re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
    re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
    re_hex3: /([0-9A-F])/gi,

    toRGB: function(val) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "toRGB", 279);
_yuitest_coverline("/build/dom-style/dom-style.js", 280);
if (!Y.Color.re_RGB.test(val)) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 281);
val = Y.Color.toHex(val);
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 284);
if(Y.Color.re_hex.exec(val)) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 285);
val = 'rgb(' + [
                PARSE_INT(RE.$1, 16),
                PARSE_INT(RE.$2, 16),
                PARSE_INT(RE.$3, 16)
            ].join(', ') + ')';
        }
        _yuitest_coverline("/build/dom-style/dom-style.js", 291);
return val;
    },

    toHex: function(val) {
        _yuitest_coverfunc("/build/dom-style/dom-style.js", "toHex", 294);
_yuitest_coverline("/build/dom-style/dom-style.js", 295);
val = Y.Color.KEYWORDS[val] || val;
        _yuitest_coverline("/build/dom-style/dom-style.js", 296);
if (Y.Color.re_RGB.exec(val)) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 297);
val = [
                Number(RE.$1).toString(16),
                Number(RE.$2).toString(16),
                Number(RE.$3).toString(16)
            ];

            _yuitest_coverline("/build/dom-style/dom-style.js", 303);
for (var i = 0; i < val.length; i++) {
                _yuitest_coverline("/build/dom-style/dom-style.js", 304);
if (val[i].length < 2) {
                    _yuitest_coverline("/build/dom-style/dom-style.js", 305);
val[i] = '0' + val[i];
                }
            }

            _yuitest_coverline("/build/dom-style/dom-style.js", 309);
val = val.join('');
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 312);
if (val.length < 6) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 313);
val = val.replace(Y.Color.re_hex3, '$1$1');
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 316);
if (val !== 'transparent' && val.indexOf('#') < 0) {
            _yuitest_coverline("/build/dom-style/dom-style.js", 317);
val = '#' + val;
        }

        _yuitest_coverline("/build/dom-style/dom-style.js", 320);
return val.toUpperCase();
    }
};
})(Y);



}, '@VERSION@' ,{requires:['dom-base']});
