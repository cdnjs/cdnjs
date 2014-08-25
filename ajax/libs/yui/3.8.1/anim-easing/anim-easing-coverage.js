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
_yuitest_coverage["build/anim-easing/anim-easing.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/anim-easing/anim-easing.js",
    code: []
};
_yuitest_coverage["build/anim-easing/anim-easing.js"].code=["YUI.add('anim-easing', function (Y, NAME) {","","/*","TERMS OF USE - EASING EQUATIONS","Open source under the BSD License.","Copyright 2001 Robert Penner All rights reserved.","","Redistribution and use in source and binary forms, with or without modification,","are permitted provided that the following conditions are met:",""," * Redistributions of source code must retain the above copyright notice, this","    list of conditions and the following disclaimer."," * Redistributions in binary form must reproduce the above copyright notice,","    this list of conditions and the following disclaimer in the documentation","    and/or other materials provided with the distribution."," * Neither the name of the author nor the names of contributors may be used to","    endorse or promote products derived from this software without specific prior","    written permission.","","THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND","ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED","WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.","IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,","INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,","BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,","DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY","OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE","OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED","OF THE POSSIBILITY OF SUCH DAMAGE.","*/","","/**"," * The easing module provides methods for customizing"," * how an animation behaves during each run."," * @class Easing"," * @module anim"," * @submodule anim-easing"," */","","var Easing = {","","    /**","     * Uniform speed between points.","     * @for Easing","     * @method easeNone","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeNone: function (t, b, c, d) {","        return c*t/d + b;","    },","","    /**","     * Begins slowly and accelerates towards end. (quadratic)","     * @method easeIn","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeIn: function (t, b, c, d) {","        return c*(t/=d)*t + b;","    },","","    /**","     * Begins quickly and decelerates towards end.  (quadratic)","     * @method easeOut","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeOut: function (t, b, c, d) {","        return -c *(t/=d)*(t-2) + b;","    },","","    /**","     * Begins slowly and decelerates towards end. (quadratic)","     * @method easeBoth","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeBoth: function (t, b, c, d) {","        if ((t /= d/2) < 1) {","            return c/2*t*t + b;","        }","","        return -c/2 * ((--t)*(t-2) - 1) + b;","    },","","    /**","     * Begins slowly and accelerates towards end. (quartic)","     * @method easeInStrong","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeInStrong: function (t, b, c, d) {","        return c*(t/=d)*t*t*t + b;","    },","","    /**","     * Begins quickly and decelerates towards end.  (quartic)","     * @method easeOutStrong","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeOutStrong: function (t, b, c, d) {","        return -c * ((t=t/d-1)*t*t*t - 1) + b;","    },","","    /**","     * Begins slowly and decelerates towards end. (quartic)","     * @method easeBothStrong","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    easeBothStrong: function (t, b, c, d) {","        if ((t /= d/2) < 1) {","            return c/2*t*t*t*t + b;","        }","","        return -c/2 * ((t-=2)*t*t*t - 2) + b;","    },","","    /**","     * Snap in elastic effect.","     * @method elasticIn","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @param {Number} a Amplitude (optional)","     * @param {Number} p Period (optional)","     * @return {Number} The computed value for the current animation frame","     */","","    elasticIn: function (t, b, c, d, a, p) {","        var s;","        if (t === 0) {","            return b;","        }","        if ( (t /= d) === 1 ) {","            return b+c;","        }","        if (!p) {","            p = d* 0.3;","        }","","        if (!a || a < Math.abs(c)) {","            a = c;","            s = p/4;","        }","        else {","            s = p/(2*Math.PI) * Math.asin (c/a);","        }","","        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;","    },","","    /**","     * Snap out elastic effect.","     * @method elasticOut","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @param {Number} a Amplitude (optional)","     * @param {Number} p Period (optional)","     * @return {Number} The computed value for the current animation frame","     */","    elasticOut: function (t, b, c, d, a, p) {","        var s;","        if (t === 0) {","            return b;","        }","        if ( (t /= d) === 1 ) {","            return b+c;","        }","        if (!p) {","            p=d * 0.3;","        }","","        if (!a || a < Math.abs(c)) {","            a = c;","            s = p / 4;","        }","        else {","            s = p/(2*Math.PI) * Math.asin (c/a);","        }","","        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;","    },","","    /**","     * Snap both elastic effect.","     * @method elasticBoth","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @param {Number} a Amplitude (optional)","     * @param {Number} p Period (optional)","     * @return {Number} The computed value for the current animation frame","     */","    elasticBoth: function (t, b, c, d, a, p) {","        var s;","        if (t === 0) {","            return b;","        }","","        if ( (t /= d/2) === 2 ) {","            return b+c;","        }","","        if (!p) {","            p = d*(0.3*1.5);","        }","","        if ( !a || a < Math.abs(c) ) {","            a = c;","            s = p/4;","        }","        else {","            s = p/(2*Math.PI) * Math.asin (c/a);","        }","","        if (t < 1) {","            return -0.5*(a*Math.pow(2,10*(t-=1)) *","                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;","        }","        return a*Math.pow(2,-10*(t-=1)) *","                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;","    },","","","    /**","     * Backtracks slightly, then reverses direction and moves to end.","     * @method backIn","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @param {Number} s Overshoot (optional)","     * @return {Number} The computed value for the current animation frame","     */","    backIn: function (t, b, c, d, s) {","        if (s === undefined) {","            s = 1.70158;","        }","        if (t === d) {","            t -= 0.001;","        }","        return c*(t/=d)*t*((s+1)*t - s) + b;","    },","","    /**","     * Overshoots end, then reverses and comes back to end.","     * @method backOut","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @param {Number} s Overshoot (optional)","     * @return {Number} The computed value for the current animation frame","     */","    backOut: function (t, b, c, d, s) {","        if (typeof s === 'undefined') {","            s = 1.70158;","        }","        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;","    },","","    /**","     * Backtracks slightly, then reverses direction, overshoots end,","     * then reverses and comes back to end.","     * @method backBoth","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @param {Number} s Overshoot (optional)","     * @return {Number} The computed value for the current animation frame","     */","    backBoth: function (t, b, c, d, s) {","        if (typeof s === 'undefined') {","            s = 1.70158;","        }","","        if ((t /= d/2 ) < 1) {","            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;","        }","        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;","    },","","    /**","     * Bounce off of start.","     * @method bounceIn","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    bounceIn: function (t, b, c, d) {","        return c - Y.Easing.bounceOut(d-t, 0, c, d) + b;","    },","","    /**","     * Bounces off end.","     * @method bounceOut","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    bounceOut: function (t, b, c, d) {","        if ((t/=d) < (1/2.75)) {","                return c*(7.5625*t*t) + b;","        } else if (t < (2/2.75)) {","                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;","        } else if (t < (2.5/2.75)) {","                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;","        }","        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;","    },","","    /**","     * Bounces off start and end.","     * @method bounceBoth","     * @param {Number} t Time value used to compute current value","     * @param {Number} b Starting value","     * @param {Number} c Delta between start and end values","     * @param {Number} d Total length of animation","     * @return {Number} The computed value for the current animation frame","     */","    bounceBoth: function (t, b, c, d) {","        if (t < d/2) {","            return Y.Easing.bounceIn(t * 2, 0, c, d) * 0.5 + b;","        }","        return Y.Easing.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;","    }","};","","Y.Easing = Easing;","","","}, '@VERSION@', {\"requires\": [\"anim-base\"]});"];
_yuitest_coverage["build/anim-easing/anim-easing.js"].lines = {"1":0,"40":0,"53":0,"66":0,"79":0,"92":0,"93":0,"96":0,"109":0,"122":0,"135":0,"136":0,"139":0,"155":0,"156":0,"157":0,"159":0,"160":0,"162":0,"163":0,"166":0,"167":0,"168":0,"171":0,"174":0,"189":0,"190":0,"191":0,"193":0,"194":0,"196":0,"197":0,"200":0,"201":0,"202":0,"205":0,"208":0,"223":0,"224":0,"225":0,"228":0,"229":0,"232":0,"233":0,"236":0,"237":0,"238":0,"241":0,"244":0,"245":0,"248":0,"264":0,"265":0,"267":0,"268":0,"270":0,"284":0,"285":0,"287":0,"302":0,"303":0,"306":0,"307":0,"309":0,"322":0,"335":0,"336":0,"337":0,"338":0,"339":0,"340":0,"342":0,"355":0,"356":0,"358":0,"362":0};
_yuitest_coverage["build/anim-easing/anim-easing.js"].functions = {"easeNone:52":0,"easeIn:65":0,"easeOut:78":0,"easeBoth:91":0,"easeInStrong:108":0,"easeOutStrong:121":0,"easeBothStrong:134":0,"elasticIn:154":0,"elasticOut:188":0,"elasticBoth:222":0,"backIn:263":0,"backOut:283":0,"backBoth:301":0,"bounceIn:321":0,"bounceOut:334":0,"bounceBoth:354":0,"(anonymous 1):1":0};
_yuitest_coverage["build/anim-easing/anim-easing.js"].coveredLines = 76;
_yuitest_coverage["build/anim-easing/anim-easing.js"].coveredFunctions = 17;
_yuitest_coverline("build/anim-easing/anim-easing.js", 1);
YUI.add('anim-easing', function (Y, NAME) {

/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to
    endorse or promote products derived from this software without specific prior
    written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * The easing module provides methods for customizing
 * how an animation behaves during each run.
 * @class Easing
 * @module anim
 * @submodule anim-easing
 */

_yuitest_coverfunc("build/anim-easing/anim-easing.js", "(anonymous 1)", 1);
_yuitest_coverline("build/anim-easing/anim-easing.js", 40);
var Easing = {

    /**
     * Uniform speed between points.
     * @for Easing
     * @method easeNone
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeNone: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeNone", 52);
_yuitest_coverline("build/anim-easing/anim-easing.js", 53);
return c*t/d + b;
    },

    /**
     * Begins slowly and accelerates towards end. (quadratic)
     * @method easeIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeIn: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeIn", 65);
_yuitest_coverline("build/anim-easing/anim-easing.js", 66);
return c*(t/=d)*t + b;
    },

    /**
     * Begins quickly and decelerates towards end.  (quadratic)
     * @method easeOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeOut: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeOut", 78);
_yuitest_coverline("build/anim-easing/anim-easing.js", 79);
return -c *(t/=d)*(t-2) + b;
    },

    /**
     * Begins slowly and decelerates towards end. (quadratic)
     * @method easeBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeBoth: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeBoth", 91);
_yuitest_coverline("build/anim-easing/anim-easing.js", 92);
if ((t /= d/2) < 1) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 93);
return c/2*t*t + b;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 96);
return -c/2 * ((--t)*(t-2) - 1) + b;
    },

    /**
     * Begins slowly and accelerates towards end. (quartic)
     * @method easeInStrong
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeInStrong: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeInStrong", 108);
_yuitest_coverline("build/anim-easing/anim-easing.js", 109);
return c*(t/=d)*t*t*t + b;
    },

    /**
     * Begins quickly and decelerates towards end.  (quartic)
     * @method easeOutStrong
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeOutStrong: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeOutStrong", 121);
_yuitest_coverline("build/anim-easing/anim-easing.js", 122);
return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },

    /**
     * Begins slowly and decelerates towards end. (quartic)
     * @method easeBothStrong
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeBothStrong: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "easeBothStrong", 134);
_yuitest_coverline("build/anim-easing/anim-easing.js", 135);
if ((t /= d/2) < 1) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 136);
return c/2*t*t*t*t + b;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 139);
return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },

    /**
     * Snap in elastic effect.
     * @method elasticIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} a Amplitude (optional)
     * @param {Number} p Period (optional)
     * @return {Number} The computed value for the current animation frame
     */

    elasticIn: function (t, b, c, d, a, p) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "elasticIn", 154);
_yuitest_coverline("build/anim-easing/anim-easing.js", 155);
var s;
        _yuitest_coverline("build/anim-easing/anim-easing.js", 156);
if (t === 0) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 157);
return b;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 159);
if ( (t /= d) === 1 ) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 160);
return b+c;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 162);
if (!p) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 163);
p = d* 0.3;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 166);
if (!a || a < Math.abs(c)) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 167);
a = c;
            _yuitest_coverline("build/anim-easing/anim-easing.js", 168);
s = p/4;
        }
        else {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 171);
s = p/(2*Math.PI) * Math.asin (c/a);
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 174);
return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },

    /**
     * Snap out elastic effect.
     * @method elasticOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} a Amplitude (optional)
     * @param {Number} p Period (optional)
     * @return {Number} The computed value for the current animation frame
     */
    elasticOut: function (t, b, c, d, a, p) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "elasticOut", 188);
_yuitest_coverline("build/anim-easing/anim-easing.js", 189);
var s;
        _yuitest_coverline("build/anim-easing/anim-easing.js", 190);
if (t === 0) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 191);
return b;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 193);
if ( (t /= d) === 1 ) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 194);
return b+c;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 196);
if (!p) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 197);
p=d * 0.3;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 200);
if (!a || a < Math.abs(c)) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 201);
a = c;
            _yuitest_coverline("build/anim-easing/anim-easing.js", 202);
s = p / 4;
        }
        else {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 205);
s = p/(2*Math.PI) * Math.asin (c/a);
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 208);
return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },

    /**
     * Snap both elastic effect.
     * @method elasticBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} a Amplitude (optional)
     * @param {Number} p Period (optional)
     * @return {Number} The computed value for the current animation frame
     */
    elasticBoth: function (t, b, c, d, a, p) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "elasticBoth", 222);
_yuitest_coverline("build/anim-easing/anim-easing.js", 223);
var s;
        _yuitest_coverline("build/anim-easing/anim-easing.js", 224);
if (t === 0) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 225);
return b;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 228);
if ( (t /= d/2) === 2 ) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 229);
return b+c;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 232);
if (!p) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 233);
p = d*(0.3*1.5);
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 236);
if ( !a || a < Math.abs(c) ) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 237);
a = c;
            _yuitest_coverline("build/anim-easing/anim-easing.js", 238);
s = p/4;
        }
        else {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 241);
s = p/(2*Math.PI) * Math.asin (c/a);
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 244);
if (t < 1) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 245);
return -0.5*(a*Math.pow(2,10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 248);
return a*Math.pow(2,-10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },


    /**
     * Backtracks slightly, then reverses direction and moves to end.
     * @method backIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} s Overshoot (optional)
     * @return {Number} The computed value for the current animation frame
     */
    backIn: function (t, b, c, d, s) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "backIn", 263);
_yuitest_coverline("build/anim-easing/anim-easing.js", 264);
if (s === undefined) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 265);
s = 1.70158;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 267);
if (t === d) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 268);
t -= 0.001;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 270);
return c*(t/=d)*t*((s+1)*t - s) + b;
    },

    /**
     * Overshoots end, then reverses and comes back to end.
     * @method backOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} s Overshoot (optional)
     * @return {Number} The computed value for the current animation frame
     */
    backOut: function (t, b, c, d, s) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "backOut", 283);
_yuitest_coverline("build/anim-easing/anim-easing.js", 284);
if (typeof s === 'undefined') {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 285);
s = 1.70158;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 287);
return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },

    /**
     * Backtracks slightly, then reverses direction, overshoots end,
     * then reverses and comes back to end.
     * @method backBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} s Overshoot (optional)
     * @return {Number} The computed value for the current animation frame
     */
    backBoth: function (t, b, c, d, s) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "backBoth", 301);
_yuitest_coverline("build/anim-easing/anim-easing.js", 302);
if (typeof s === 'undefined') {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 303);
s = 1.70158;
        }

        _yuitest_coverline("build/anim-easing/anim-easing.js", 306);
if ((t /= d/2 ) < 1) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 307);
return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 309);
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },

    /**
     * Bounce off of start.
     * @method bounceIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    bounceIn: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "bounceIn", 321);
_yuitest_coverline("build/anim-easing/anim-easing.js", 322);
return c - Y.Easing.bounceOut(d-t, 0, c, d) + b;
    },

    /**
     * Bounces off end.
     * @method bounceOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    bounceOut: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "bounceOut", 334);
_yuitest_coverline("build/anim-easing/anim-easing.js", 335);
if ((t/=d) < (1/2.75)) {
                _yuitest_coverline("build/anim-easing/anim-easing.js", 336);
return c*(7.5625*t*t) + b;
        } else {_yuitest_coverline("build/anim-easing/anim-easing.js", 337);
if (t < (2/2.75)) {
                _yuitest_coverline("build/anim-easing/anim-easing.js", 338);
return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else {_yuitest_coverline("build/anim-easing/anim-easing.js", 339);
if (t < (2.5/2.75)) {
                _yuitest_coverline("build/anim-easing/anim-easing.js", 340);
return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }}}
        _yuitest_coverline("build/anim-easing/anim-easing.js", 342);
return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },

    /**
     * Bounces off start and end.
     * @method bounceBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    bounceBoth: function (t, b, c, d) {
        _yuitest_coverfunc("build/anim-easing/anim-easing.js", "bounceBoth", 354);
_yuitest_coverline("build/anim-easing/anim-easing.js", 355);
if (t < d/2) {
            _yuitest_coverline("build/anim-easing/anim-easing.js", 356);
return Y.Easing.bounceIn(t * 2, 0, c, d) * 0.5 + b;
        }
        _yuitest_coverline("build/anim-easing/anim-easing.js", 358);
return Y.Easing.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
};

_yuitest_coverline("build/anim-easing/anim-easing.js", 362);
Y.Easing = Easing;


}, '@VERSION@', {"requires": ["anim-base"]});
