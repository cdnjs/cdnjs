/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('color-harmony', function (Y, NAME) {

/**
Color Harmony provides methods useful for color combination discovery.

@module color
@submodule color-harmony
@class Harmony
@namespace Color
@since 3.8.0
*/
var HSL = 'hsl',
    RGB = 'rgb',

    SPLIT_OFFSET = 30,
    ANALOGOUS_OFFSET = 10,
    TRIAD_OFFSET = 360/3,
    TETRAD_OFFSET = 360/6,
    SQUARE_OFFSET = 360/4 ,

    DEF_COUNT = 5,
    DEF_OFFSET = 10,

    Color = Y.Color,

    Harmony = {

        // Color Groups
        /**
        Returns an Array of two colors. The first color in the Array
          will be the color passed in. The second will be the
          complementary color of the color provided
        @public
        @method getComplementary
        @param {String} str
        @param {String} [to]
        @return {Array}
        @since 3.8.0
        **/
        getComplementary: function(str, to) {
            var c = Harmony._start(str),
                offsets = [];

            to = to || Color.findType(str);

            offsets.push({});
            offsets.push({ h: 180 });

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Returns an Array of three colors. The first color in the Array
          will be the color passed in. The second two will be split
          complementary colors.
        @public
        @method getSplit
        @param {String} str
        @param {Number} [offset]
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getSplit: function(str, offset, to) {
            var c = Harmony._start(str),
                offsets = [];

            offset = offset || SPLIT_OFFSET;

            to = to || Color.findType(str);

            offsets.push({});
            offsets.push({ h: 180 + offset });
            offsets.push({ h: 180 - offset });

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Returns an Array of five colors. The first color in the Array
          will be the color passed in. The remaining four will be
          analogous colors two in either direction from the initially
          provided color.
        @public
        @method getAnalogous
        @param {String} str
        @param {Number} [offset]
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getAnalogous: function(str, offset, to) {
            var c = Harmony._start(str),
                offsets = [];

            offset = offset || ANALOGOUS_OFFSET;
            to = to || Color.findType(str);

            offsets.push({});
            offsets.push({ h: offset });
            offsets.push({ h: offset * 2 });
            offsets.push({ h: -offset });
            offsets.push({ h: -offset * 2 });

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Returns an Array of three colors. The first color in the Array
          will be the color passed in. The second two will be equidistant
          from the start color and each other.
        @public
        @method getTriad
        @param {String} str
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getTriad: function(str, to) {
            var c = Harmony._start(str),
                offsets = [];

            to = to || Color.findType(str);

            offsets.push({});
            offsets.push({ h: TRIAD_OFFSET });
            offsets.push({ h: -TRIAD_OFFSET });

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Returns an Array of four colors. The first color in the Array
          will be the color passed in. The remaining three colors are
          equidistant offsets from the starting color and each other.
        @public
        @method getTetrad
        @param {String} str
        @param {Number} [offset]
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getTetrad: function(str, offset, to) {
            var c = Harmony._start(str),
                offsets = [];

            offset = offset || TETRAD_OFFSET;
            to = to || Color.findType(str);

            offsets.push({});
            offsets.push({ h: offset });
            offsets.push({ h: 180 });
            offsets.push({ h: 180 + offset });

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Returns an Array of four colors. The first color in the Array
          will be the color passed in. The remaining three colors are
          equidistant offsets from the starting color and each other.
        @public
        @method getSquare
        @param {String} str
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getSquare: function(str, to) {
            var c = Harmony._start(str),
                offsets = [];

            to = to || Color.findType(str);

            offsets.push({});
            offsets.push({ h: SQUARE_OFFSET });
            offsets.push({ h: SQUARE_OFFSET * 2 });
            offsets.push({ h: SQUARE_OFFSET * 3 });

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Calculates lightness offsets resulting in a monochromatic Array
          of values.
        @public
        @method getMonochrome
        @param {String} str
        @param {Number} [count]
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getMonochrome: function(str, count, to) {
            var c = Harmony._start(str),
                colors = [],
                i = 0,
                l,
                step,
                _c = c.concat();

            count = count || DEF_COUNT;
            to = to || Color.findType(str);


            if (count < 2) {
                return str;
            }

            step = 100 / (count - 1);

            for (; i <= 100; i += step) {
                _c[2] = Math.max(Math.min(i, 100), 0);
                colors.push(_c.concat());
            }

            l = colors.length;

            for (i=0; i<l; i++) {
                colors[i] = Harmony._finish(colors[i], to);
            }

            return colors;
        },

        /**
        Creates an Array of similar colors. Returned Array is prepended
           with the color provided followed a number of colors decided
           by count
        @public
        @method getSimilar
        @param {String} str
        @param {Number} [offset]
        @param {Number} [count]
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getSimilar: function(str, offset, count, to) {
            var c = Harmony._start(str),
                offsets = [],
                slOffset,
                s = +(c[1]),
                sMin,
                sMax,
                sRand,
                l = +(c[2]),
                lMin,
                lMax,
                lRand;

            to = to || Color.findType(str);
            count = count || DEF_COUNT;
            offset = offset || DEF_OFFSET;

            slOffset = (offset > 100) ? 100 : offset;
            sMin = Math.max(0,   s - slOffset);
            sMax = Math.min(100, s + slOffset);
            lMin = Math.max(0,   l - slOffset);
            lMax = Math.min(100, l + slOffset);

            offsets.push({});
            for (i = 0; i < count; i++) {
                sRand = ( Math.round( (Math.random() * (sMax - sMin)) + sMin ) );
                lRand = ( Math.round( (Math.random() * (lMax - lMin)) + lMin ) );

                offsets.push({
                    h: ( Math.random() * (offset * 2)) - offset,
                    // because getOffset adjusts from the existing color, we
                    // need to adjust it negatively to get a good number for
                    // saturation and luminance, otherwise we get a lot of white
                    s: -(s - sRand),
                    l: -(l - lRand)
                });
            }

            return Harmony._adjustOffsetAndFinish(c, offsets, to);
        },

        /**
        Adjusts the provided color by the offset(s) given. You may
          adjust hue, saturation, and/or luminance in one step.
        @public
        @method getOffset
        @param {String} str
        @param {Object} adjust
          @param {Number} [adjust.h]
          @param {Number} [adjust.s]
          @param {Number} [adjust.l]
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getOffset: function(str, adjust, to) {
            var started = Y.Lang.isArray(str),
                hsla,
                type;

            if (!started) {
                hsla = Harmony._start(str);
                type = Color.findType(str);
            } else {
                hsla = str;
                type = 'hsl';
            }

            to = to || type;

            if (adjust.h) {
                hsla[0] = ((+hsla[0]) + adjust.h) % 360;
            }

            if (adjust.s) {
                hsla[1] = Math.max(Math.min((+hsla[1]) + adjust.s, 100), 0);
            }

            if (adjust.l) {
                hsla[2] = Math.max(Math.min((+hsla[2]) + adjust.l, 100), 0);
            }

            if (!started) {
                return Harmony._finish(hsla, to);
            }

            return hsla;
        },

        /**
        Returns 0 - 100 percentage of brightness from `0` (black) being the
          darkest to `100` (white) being the brightest.
        @public
        @method getBrightness
        @param {String} str
        @return {Number}
        @since 3.8.0
        **/
        getBrightness: function(str) {
            var c = Color.toArray(Color._convertTo(str, RGB)),
                r = c[0],
                g = c[1],
                b = c[2],
                weights = Y.Color._brightnessWeights;


            return Math.round(Math.sqrt(
                (r * r * weights.r) +
                (g * g * weights.g) +
                (b * b * weights.b)
            ) / 255 * 100);
        },

        /**
        Returns a new color value with adjusted luminance so that the
          brightness of the return color matches the perceived brightness
          of the `match` color provided.
        @public
        @method getSimilarBrightness
        @param {String} str
        @param {String} match
        @param {String} [to]
        @return {String}
        @since 3.8.0
        **/
        getSimilarBrightness: function(str, match, to){
            var c = Color.toArray(Color._convertTo(str, HSL)),
                b = Harmony.getBrightness(match);

            to = to || Color.findType(str);

            if (to === 'keyword') {
                to = 'hex';
            }

            c[2] = Harmony._searchLuminanceForBrightness(c, b, 0, 100);

            str = Color.fromArray(c, Y.Color.TYPES.HSLA);

            return Color._convertTo(str, to);
        },

        //--------------------
        // PRIVATE
        //--------------------
        /**
        Converts the provided color from additive to subtractive returning
          an Array of HSLA values
        @private
        @method _start
        @param {String} str
        @return {Array}
        @since 3.8.0
        */
        _start: function(str) {
            var hsla = Color.toArray(Color._convertTo(str, HSL));
            hsla[0] = Harmony._toSubtractive(hsla[0]);

            return hsla;
        },

        /**
        Converts the provided HSLA values from subtractive to additive
          returning a converted color string
        @private
        @method _finish
        @param {Array} hsla
        @param {String} [to]
        @return {String}
        @since 3.8.0
        */
        _finish: function(hsla, to) {
            hsla[0] = Harmony._toAdditive(hsla[0]);
            hsla = 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';

            if (to === 'keyword') {
                to = 'hex';
            }

            return Color._convertTo(hsla, to);
        },

        /**
        Adjusts the hue degree from subtractive to additive
        @private
        @method _toAdditive
        @param {Number} hue
        @return {Number} Converted additive hue
        @since 3.8.0
        */
        _toAdditive: function(hue) {
            hue = Y.Color._constrainHue(hue);

            if (hue <= 180) {
                hue /= 1.5;
            } else if (hue < 240) {
                hue = 120 + (hue - 180) * 2;
            }

            return Y.Color._constrainHue(hue, 10);
        },

        /**
        Adjusts the hue degree from additive to subtractive
        @private
        @method _toSubtractive
        @param {Number} hue
        @return {Number} Converted subtractive hue
        @since 3.8.0
        */
        _toSubtractive: function(hue) {
            hue = Y.Color._constrainHue(hue);

            if (hue <= 120) {
                hue *= 1.5;
            } else if (hue < 240) {
                hue = 180 + (hue - 120) / 2;
            }

            return Y.Color._constrainHue(hue, 10);
        },

        /**
        Contrain the hue to a value between 0 and 360 for calculations
            and real color wheel value space. Provide a precision value
            to round return value to a decimal place
        @private
        @method _constrainHue
        @param {Number} hue
        @param {Number} [precision]
        @return {Number} Constrained hue value
        @since 3.8.0
        **/
        _constrainHue: function(hue, precision) {
            while (hue < 0) {
                hue += 360;
            }
            hue %= 360;

            if (precision) {
                hue = Math.round(hue * precision) / precision;
            }

            return hue;
        },

        /**
        Brightness weight factors for perceived brightness calculations

        "standard" values are listed as R: 0.241, G: 0.691, B: 0.068
        These values were changed based on grey scale comparison of hsl
          to new hsl where brightness is said to be within plus or minus 0.01.
        @private
        @property _brightnessWeights
        @since 3.8.0
        */
        _brightnessWeights: {
            r: 0.221,
            g: 0.711,
            b: 0.068
        },

        /**
        Calculates the luminance as a mid range between the min and max
          to match the brightness level provided
        @private
        @method _searchLuminanceForBrightness
        @param {Array} color HSLA values
        @param {Number} brightness Brightness to be matched
        @param {Number} min Minimum range for luminance
        @param {Number} max Maximum range for luminance
        @return {Number} Found luminance to achieve requested brightness
        @since 3.8.0
        **/
        _searchLuminanceForBrightness: function(color, brightness, min, max) {
            var luminance = (max + min) / 2,
                b;

            color[2] = luminance;
            b = Harmony.getBrightness(Color.fromArray(color, Y.Color.TYPES.HSL));

            if (b + 2 > brightness && b - 2 < brightness) {
                return luminance;
            } else if (b > brightness) {
                return Harmony._searchLuminanceForBrightness(color, brightness, min, luminance);
            } else {
                return Harmony._searchLuminanceForBrightness(color, brightness, luminance, max);
            }
        },

        /**
        Takes an HSL array, and an array of offsets and returns and array
            of colors that have been adjusted. The returned colors will
            match the array of offsets provided. If you wish you have the
            same color value returned, you can provide null or an empty
            object to the offsets. The returned array will contain color
            value strings that have been adjusted from subtractive to
            additive.
        @private
        @method _adjustOffsetAndFinish
        @param {Array} color
        @param {Array} offsets
        @param {String} to
        @return {Array}
        @since 3.8.0
        **/
        _adjustOffsetAndFinish: function(color, offsets, to) {
            var colors = [],
                i,
                l = offsets.length,
                _c;

            for (i = 0; i < l; i++ ) {
                _c = color.concat();
                if (offsets[i]) {
                    _c = Harmony.getOffset(_c, offsets[i]);
                }
                colors.push(Harmony._finish(_c, to));
            }

            return colors;
        }

    };

Y.Color = Y.mix(Y.Color, Harmony);


}, '3.17.2', {"requires": ["color-hsl"]});
