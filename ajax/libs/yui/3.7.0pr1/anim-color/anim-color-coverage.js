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
_yuitest_coverage["/build/anim-color/anim-color.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/anim-color/anim-color.js",
    code: []
};
_yuitest_coverage["/build/anim-color/anim-color.js"].code=["YUI.add('anim-color', function(Y) {","","/**"," * Adds support for color properties in <code>to</code>"," * and <code>from</code> attributes."," * @module anim"," * @submodule anim-color"," */","","var NUM = Number;","","Y.Anim.behaviors.color = {","    set: function(anim, att, from, to, elapsed, duration, fn) {","        from = Y.Color.re_RGB.exec(Y.Color.toRGB(from));","        to = Y.Color.re_RGB.exec(Y.Color.toRGB(to));","","        if (!from || from.length < 3 || !to || to.length < 3) {","            Y.error('invalid from or to passed to color behavior');","        }","","        anim._node.setStyle(att, 'rgb(' + [","            Math.floor(fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)),","            Math.floor(fn(elapsed, NUM(from[2]), NUM(to[2]) - NUM(from[2]), duration)),","            Math.floor(fn(elapsed, NUM(from[3]), NUM(to[3]) - NUM(from[3]), duration))","        ].join(', ') + ')');","    },","    ","    // TODO: default bgcolor const","    get: function(anim, att) {","        var val = anim._node.getComputedStyle(att);","        val = (val === 'transparent') ? 'rgb(255, 255, 255)' : val;","        return val;","    }","};","","Y.each(['backgroundColor',","        'borderColor',","        'borderTopColor',","        'borderRightColor', ","        'borderBottomColor', ","        'borderLeftColor'],","        function(v, i) {","            Y.Anim.behaviors[v] = Y.Anim.behaviors.color;","        }",");","","","}, '@VERSION@' ,{requires:['anim-base']});"];
_yuitest_coverage["/build/anim-color/anim-color.js"].lines = {"1":0,"10":0,"12":0,"14":0,"15":0,"17":0,"18":0,"21":0,"30":0,"31":0,"32":0,"36":0,"43":0};
_yuitest_coverage["/build/anim-color/anim-color.js"].functions = {"set:13":0,"get:29":0,"(anonymous 2):42":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/anim-color/anim-color.js"].coveredLines = 13;
_yuitest_coverage["/build/anim-color/anim-color.js"].coveredFunctions = 4;
_yuitest_coverline("/build/anim-color/anim-color.js", 1);
YUI.add('anim-color', function(Y) {

/**
 * Adds support for color properties in <code>to</code>
 * and <code>from</code> attributes.
 * @module anim
 * @submodule anim-color
 */

_yuitest_coverfunc("/build/anim-color/anim-color.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/anim-color/anim-color.js", 10);
var NUM = Number;

_yuitest_coverline("/build/anim-color/anim-color.js", 12);
Y.Anim.behaviors.color = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        _yuitest_coverfunc("/build/anim-color/anim-color.js", "set", 13);
_yuitest_coverline("/build/anim-color/anim-color.js", 14);
from = Y.Color.re_RGB.exec(Y.Color.toRGB(from));
        _yuitest_coverline("/build/anim-color/anim-color.js", 15);
to = Y.Color.re_RGB.exec(Y.Color.toRGB(to));

        _yuitest_coverline("/build/anim-color/anim-color.js", 17);
if (!from || from.length < 3 || !to || to.length < 3) {
            _yuitest_coverline("/build/anim-color/anim-color.js", 18);
Y.error('invalid from or to passed to color behavior');
        }

        _yuitest_coverline("/build/anim-color/anim-color.js", 21);
anim._node.setStyle(att, 'rgb(' + [
            Math.floor(fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)),
            Math.floor(fn(elapsed, NUM(from[2]), NUM(to[2]) - NUM(from[2]), duration)),
            Math.floor(fn(elapsed, NUM(from[3]), NUM(to[3]) - NUM(from[3]), duration))
        ].join(', ') + ')');
    },
    
    // TODO: default bgcolor const
    get: function(anim, att) {
        _yuitest_coverfunc("/build/anim-color/anim-color.js", "get", 29);
_yuitest_coverline("/build/anim-color/anim-color.js", 30);
var val = anim._node.getComputedStyle(att);
        _yuitest_coverline("/build/anim-color/anim-color.js", 31);
val = (val === 'transparent') ? 'rgb(255, 255, 255)' : val;
        _yuitest_coverline("/build/anim-color/anim-color.js", 32);
return val;
    }
};

_yuitest_coverline("/build/anim-color/anim-color.js", 36);
Y.each(['backgroundColor',
        'borderColor',
        'borderTopColor',
        'borderRightColor', 
        'borderBottomColor', 
        'borderLeftColor'],
        function(v, i) {
            _yuitest_coverfunc("/build/anim-color/anim-color.js", "(anonymous 2)", 42);
_yuitest_coverline("/build/anim-color/anim-color.js", 43);
Y.Anim.behaviors[v] = Y.Anim.behaviors.color;
        }
);


}, '@VERSION@' ,{requires:['anim-base']});
