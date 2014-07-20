(function () {
    var pow = Math.pow,
        sin = Math.sin,
        cos = Math.cos,
        sqrt = Math.sqrt,
        pi = Math.PI,
        easings, addEasing, poly, createPoly, easing, i, l;

    //create polynomial easing equations
    poly = ['quad', 'cubic', 'quart', 'quint'];

    //create other easing equations
    easings = {
        pow: function (p, x) {
            return pow(p, x[0] || 6);
        },

        expo: function (p) {
            return pow(2, 8 * (p - 1));
        },

        circ: function (p) {
            return 1 - sqrt(1 - p * p);
        },

        sine: function (p) {
            return 1 - sin((1 - p) * pi / 2);
        },

        back: function (p, n) {
            n = n || 1.616;
            return p * p * ((n + 1) * p - n);
        },

        bounce: function (p) {
            var value;
            for (var a = 0, b = 1; 1; a += b, b /= 2) {
                if (p >= (7 - 4 * a) / 11) {
                    value = b * b - pow((11 - 6 * a - 11 * p) / 4, 2);
                    break;
                }
            }
            return value;
        },

        elastic: function (p, x) {
            return pow(2, 10 * --p) * cos(20 * p * pi * (x || 1) / 3);
        }
    };

    //Add easeIn, easeOut, easeInOut options to all easing equations.
    addEasing = function (easing, params) {
        params = params && params.length ? params : [ params ];
        return Ext.apply(easing, {

            easeIn: function (pos) {
                return easing(pos, params);
            },

            easeOut: function (pos) {
                return 1 - easing(1 - pos, params);
            },

            easeInOut: function (pos) {
                return (pos <= 0.5) ? easing(2 * pos, params) / 2
                    : (2 - easing(2 * (1 - pos), params)) / 2;
            }
        });
    };

    //Append the polynomial equations with easing support to the EasingPrototype.
    createPoly = function (times) {
        return function (p) {
            return pow(p, times);
        };
    };

    for (i = 0, l = poly.length; i < l; ++i) {
        easings[poly[i]] = createPoly(i + 2);
    }

    //Add linear interpolator
    easings.linear = function (x) {
        return x;
    };

    for (easing in easings) {
        if (easings.hasOwnProperty(easing)) {
            addEasing(easings[easing]);
        }
    }

    /**
     * @class
     * Contains transition equations such as `Quad`, `Cubic`, `Quart`, `Quint`,
     * `Expo`, `Circ`, `Pow`, `Sine`, `Back`, `Bounce`, `Elastic`, etc.
     *
     * Contains transition equations such as `Quad`, `Cubic`, `Quart`, `Quint`, `Expo`, `Circ`, `Pow`, `Sine`, `Back`, `Bounce`, `Elastic`, etc.
     * Each transition also contains methods for applying this function as ease in, ease out or ease in and out accelerations.
     *
     *     var fx = Ext.create('Ext.draw.fx.Sprite', {
     *         sprite: sprite,
     *         duration: 1000,
     *         easing: 'backOut'
     *     });
     */
    Ext.define('Ext.draw.TimingFunctions', {
        singleton: true,
        easingMap: {
            linear: easings.linear,
            easeIn: easings.quad.easeIn,
            easeOut: easings.quad.easeOut,
            easeInOut: easings.quad.easeInOut,
            backIn: easings.back,
            backOut: function (x, n) {
                return 1 - easings.back(1 - x, n);
            },
            backInOut: function (x, n) {
                if (x < 0.5) {
                    return easings.back(x * 2, n) * 0.5;
                } else {
                    return 1 - easings.back((1 - x) * 2, n) * 0.5;
                }
            },
            elasticIn: function (x, n) {
                return 1 - easings.elastic(1 - x, n);
            },
            elasticOut: easings.elastic,
            bounceIn: easings.bounce,
            bounceOut: function (x) {
                return 1 - easings.bounce(1 - x);
            }
        }
    }, function () {
        Ext.apply(this, easings);
    });

})();

