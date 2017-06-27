/**
 * An easing library supports jquery.js, standalone module and CSS timing functions
 *
 * using AMD (Asynchronous Module Definition) API with OzJS
 * see http://ozjs.org for details
 *
 * Copyright (C) 2010-2012, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
define("mo/easing", [], function(require, exports){

    var def = 'easeOutQuad';

    var timing_values = {
        //easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
        //easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        //easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
        easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
        easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
        easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
        easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
        easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
        easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
        easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
        easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
        easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
        easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
        easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
        easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
        easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
        easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
        easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
        easeOutBack: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
        easeInElastic: '',
        easeOutElastic: '',
        easeInOutElastic: '',
        easeInBounce: '',
        easeOutBounce: '',
        easeInOutBounce: ''
    };

    /**
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     * t: current time, b: begInnIng value, c: change In value, d: duration
     */
    var timing_functions = {
        linear: function(x, t, b, c) {
            return b + c * x;
        },
        jswing: function(x, t, b, c) {
            return ((-Math.cos(x*Math.PI)/2) + 0.5) * c + b;
        },
        swing: function (x, t, b, c, d) {
            return timing_functions[def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - timing_functions.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return timing_functions.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return timing_functions.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    };

    timing_values.easeIn = timing_values.easeInQuad = 'ease-in';
    timing_values.easeOut = timing_values.easeOutQuad = 'ease-out';
    timing_values.easeInOut = timing_values.easeInOutQuad = 'ease-in-out';

    timing_functions.easeIn = timing_functions.easeInQuad;
    timing_functions.easeOut = timing_functions.easeOutQuad;
    timing_functions.easeInOut = timing_functions.easeInOutQuad;

    exports.def = def;
    exports.values = timing_values;
    exports.functions = timing_functions;

});
