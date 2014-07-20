// @define Ext.fx.Easing

/**
 * @class Ext.fx.Easing
 *
 * This class contains a series of function definitions used to modify values during an animation.
 * They describe how the intermediate values used during a transition will be calculated. It allows for a transition to change
 * speed over its duration. The following options are available: 
 *
 * - linear The default easing type
 * - backIn
 * - backOut
 * - bounceIn
 * - bounceOut
 * - ease
 * - easeIn
 * - easeOut
 * - easeInOut
 * - elasticIn
 * - elasticOut
 * - cubic-bezier(x1, y1, x2, y2)
 *
 * Note that cubic-bezier will create a custom easing curve following the CSS3 [transition-timing-function][0]
 * specification.  The four values specify points P1 and P2 of the curve as (x1, y1, x2, y2). All values must
 * be in the range [0, 1] or the definition is invalid.
 *
 * [0]: http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
 *
 * @singleton
 */
Ext.require('Ext.fx.CubicBezier', function() {
    var math = Math,
        pi = math.PI,
        pow = math.pow,
        sin = math.sin,
        sqrt = math.sqrt,
        abs = math.abs,
        backInSeed = 1.70158;
        
    Ext.define('Ext.fx.Easing', {
        singleton: true,
        
        linear: Ext.identityFn,
        ease: function(n) {
            var q = 0.07813 - n / 2,
                alpha = -0.25,
                Q = sqrt(0.0066 + q * q),
                x = Q - q,
                X = pow(abs(x), 1/3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1/3) * (y < 0 ? -1 : 1),
                t = X + Y + 0.25;
            return pow(1 - t, 2) * 3 * t * 0.1 + (1 - t) * 3 * t * t + t * t * t;
        },
        easeIn: function (n) {
            return pow(n, 1.7);
        },
        easeOut: function (n) {
            return pow(n, 0.48);
        },
        easeInOut: function(n) {
            var q = 0.48 - n / 1.04,
                Q = sqrt(0.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1/3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1/3) * (y < 0 ? -1 : 1),
                t = X + Y + 0.5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            return n * n * ((backInSeed + 1) * n - backInSeed);
        },
        backOut: function (n) {
            n = n - 1;
            return n * n * ((backInSeed + 1) * n + backInSeed) + 1;
        },
        elasticIn: function (n) {
            if (n === 0 || n === 1) {
                return n;
            }
            var p = 0.3,
                s = p / 4;
            return pow(2, -10 * n) * sin((n - s) * (2 * pi) / p) + 1;
        },
        elasticOut: function (n) {
            return 1 - Ext.fx.Easing.elasticIn(1 - n);
        },
        bounceIn: function (n) {
            return 1 - Ext.fx.Easing.bounceOut(1 - n);
        },
        bounceOut: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + 0.75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + 0.9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + 0.984375;
                    }
                }
            }
            return l;
        }
    }, function(){
        var easing = Ext.fx.Easing.self,
            proto = easing.prototype;
            
        easing.addMembers({
            'back-in': proto.backIn,
            'back-out': proto.backOut,
            'ease-in': proto.easeIn,
            'ease-out': proto.easeOut,
            'elastic-in': proto.elasticIn,
            'elastic-out': proto.elasticOut,
            'bounce-in': proto.bounceIn,
            'bounce-out': proto.bounceOut,
            'ease-in-out': proto.easeInOut
        });        
    });
});