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
_yuitest_coverage["build/color-harmony/color-harmony.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/color-harmony/color-harmony.js",
    code: []
};
_yuitest_coverage["build/color-harmony/color-harmony.js"].code=["YUI.add('color-harmony', function (Y, NAME) {","","/**","Color Harmony provides methods useful for color combination discovery.","","@module color","@submodule color-harmony","@class Harmony","@namespace Color","@since 3.8.0","*/","var HSL = 'hsl',","    RGB = 'rgb',","","    SPLIT_OFFSET = 30,","    ANALOGOUS_OFFSET = 10,","    TRIAD_OFFSET = 360/3,","    TETRAD_OFFSET = 360/6,","    SQUARE_OFFSET = 360/4 ,","","    DEF_COUNT = 5,","    DEF_OFFSET = 10,","","    Color = Y.Color,","","    Harmony = {","","        // Color Groups","        /**","        Returns an Array of two colors. The first color in the Array","          will be the color passed in. The second will be the","          complementary color of the color provided","        @public","        @method getComplementary","        @param {String} str","        @param {String} [to]","        @return {Array}","        @since 3.8.0","        **/","        getComplementary: function(str, to) {","            var c = Harmony._start(str),","                offsets = [];","","            to = to || Color.findType(str);","","            offsets.push({});","            offsets.push({ h: 180 });","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Returns an Array of three colors. The first color in the Array","          will be the color passed in. The second two will be split","          complementary colors.","        @public","        @method getSplit","        @param {String} str","        @param {Number} [offset]","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getSplit: function(str, offset, to) {","            var c = Harmony._start(str),","                offsets = [];","","            offset = offset || SPLIT_OFFSET;","","            to = to || Color.findType(str);","","            offsets.push({});","            offsets.push({ h: 180 + offset });","            offsets.push({ h: 180 - offset });","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Returns an Array of five colors. The first color in the Array","          will be the color passed in. The remaining four will be","          analogous colors two in either direction from the initially","          provided color.","        @public","        @method getAnalogous","        @param {String} str","        @param {Number} [offset]","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getAnalogous: function(str, offset, to) {","            var c = Harmony._start(str),","                offsets = [];","","            offset = offset || ANALOGOUS_OFFSET;","            to = to || Color.findType(str);","","            offsets.push({});","            offsets.push({ h: offset });","            offsets.push({ h: offset * 2 });","            offsets.push({ h: -offset });","            offsets.push({ h: -offset * 2 });","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Returns an Array of three colors. The first color in the Array","          will be the color passed in. The second two will be equidistant","          from the start color and each other.","        @public","        @method getTriad","        @param {String} str","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getTriad: function(str, to) {","            var c = Harmony._start(str),","                offsets = [];","","            to = to || Color.findType(str);","","            offsets.push({});","            offsets.push({ h: TRIAD_OFFSET });","            offsets.push({ h: -TRIAD_OFFSET });","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Returns an Array of four colors. The first color in the Array","          will be the color passed in. The remaining three colors are","          equidistant offsets from the starting color and each other.","        @public","        @method getTetrad","        @param {String} str","        @param {Number} [offset]","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getTetrad: function(str, offset, to) {","            var c = Harmony._start(str),","                offsets = [];","","            offset = offset || TETRAD_OFFSET;","            to = to || Color.findType(str);","","            offsets.push({});","            offsets.push({ h: offset });","            offsets.push({ h: 180 });","            offsets.push({ h: 180 + offset });","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Returns an Array of four colors. The first color in the Array","          will be the color passed in. The remaining three colors are","          equidistant offsets from the starting color and each other.","        @public","        @method getSquare","        @param {String} str","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getSquare: function(str, to) {","            var c = Harmony._start(str),","                offsets = [];","","            to = to || Color.findType(str);","","            offsets.push({});","            offsets.push({ h: SQUARE_OFFSET });","            offsets.push({ h: SQUARE_OFFSET * 2 });","            offsets.push({ h: SQUARE_OFFSET * 3 });","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Calculates lightness offsets resulting in a monochromatic Array","          of values.","        @public","        @method getMonochrome","        @param {String} str","        @param {Number} [count]","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getMonochrome: function(str, count, to) {","            var c = Harmony._start(str),","                colors = [],","                i = 0,","                l,","                step,","                _c = c.concat();","","            count = count || DEF_COUNT;","            to = to || Color.findType(str);","","","            if (count < 2) {","                return str;","            }","","            step = 100 / (count - 1);","","            for (; i <= 100; i += step) {","                _c[2] = Math.max(Math.min(i, 100), 0);","                colors.push(_c.concat());","            }","","            l = colors.length;","","            for (i=0; i<l; i++) {","                colors[i] = Harmony._finish(colors[i], to);","            }","","            return colors;","        },","","        /**","        Creates an Array of similar colors. Returned Array is prepended","           with the color provided followed a number of colors decided","           by count","        @public","        @method getSimilar","        @param {String} str","        @param {Number} [offset]","        @param {Number} [count]","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getSimilar: function(str, offset, count, to) {","            var c = Harmony._start(str),","                offsets = [],","                slOffset;","","            to = to || Color.findType(str);","            count = count || DEF_COUNT;","            offset = offset || DEF_OFFSET;","            slOffset = (offset > 100) ? 100 : offset;","","            offsets.push({});","            for (i = 0; i < count; i++) {","                offsets.push({","                    h: ( Math.random() * (offset * 2)) - offset,","                    // because getOffset adjusts from the existing color, we","                    // need to adjust it negatively to get a good number for","                    // saturation and luminance, otherwise we get a lot of","                    // white when using large offsets","                    s: ( Math.random() * slOffset - c[1]),","                    l: ( Math.random() * slOffset - c[2])","                });","            }","","            return Harmony._adjustOffsetAndFinish(c, offsets, to);","        },","","        /**","        Adjusts the provided color by the offset(s) given. You may","          adjust hue, saturation, and/or luminance in one step.","        @public","        @method getOffset","        @param {String} str","        @param {Object} adjust","          @param {Number} [adjust.h]","          @param {Number} [adjust.s]","          @param {Number} [adjust.l]","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getOffset: function(str, adjust, to) {","            var started = Y.Lang.isArray(str),","                hsla,","                type;","","            if (!started) {","                hsla = Harmony._start(str);","                type = Color.findType(str);","            } else {","                hsla = str;","                type = 'hsl';","            }","","            to = to || type;","","            if (adjust.h) {","                hsla[0] = ((+hsla[0]) + adjust.h) % 360;","            }","","            if (adjust.s) {","                hsla[1] = Math.max(Math.min((+hsla[1]) + adjust.s, 100), 0);","            }","","            if (adjust.l) {","                hsla[2] = Math.max(Math.min((+hsla[2]) + adjust.l, 100), 0);","            }","","            if (!started) {","                return Harmony._finish(hsla, to);","            }","","            return hsla;","        },","","        /**","        Returns 0 - 100 percentage of brightness from `0` (black) being the","          darkest to `100` (white) being the brightest.","        @public","        @method getBrightness","        @param {String} str","        @return {Number}","        @since 3.8.0","        **/","        getBrightness: function(str) {","            var c = Color.toArray(Color._convertTo(str, RGB)),","                r = c[0],","                g = c[1],","                b = c[2],","                weights = Y.Color._brightnessWeights;","","","            return Math.round(Math.sqrt(","                (r * r * weights.r) +","                (g * g * weights.g) +","                (b * b * weights.b)","            ) / 255 * 100);","        },","","        /**","        Returns a new color value with adjusted luminance so that the","          brightness of the return color matches the perceived brightness","          of the `match` color provided.","        @public","        @method getSimilarBrightness","        @param {String} str","        @param {String} match","        @param {String} [to]","        @return {String}","        @since 3.8.0","        **/","        getSimilarBrightness: function(str, match, to){","            var c = Color.toArray(Color._convertTo(str, HSL)),","                b = Harmony.getBrightness(match);","","            to = to || Color.findType(str);","","            if (to === 'keyword') {","                to = 'hex';","            }","","            c[2] = Harmony._searchLuminanceForBrightness(c, b, 0, 100);","","            str = Color.fromArray(c, Y.Color.TYPES.HSLA);","","            return Color._convertTo(str, to);","        },","","        //--------------------","        // PRIVATE","        //--------------------","        /**","        Converts the provided color from additive to subtractive returning","          an Array of HSLA values","        @private","        @method _start","        @param {String} str","        @return {Array}","        @since 3.8.0","        */","        _start: function(str) {","            var hsla = Color.toArray(Color._convertTo(str, HSL));","            hsla[0] = Harmony._toSubtractive(hsla[0]);","","            return hsla;","        },","","        /**","        Converts the provided HSLA values from subtractive to additive","          returning a converted color string","        @private","        @method _finish","        @param {Array} hsla","        @param {String} [to]","        @return {String}","        @since 3.8.0","        */","        _finish: function(hsla, to) {","            hsla[0] = Harmony._toAdditive(hsla[0]);","            hsla = 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';","","            if (to === 'keyword') {","                to = 'hex';","            }","","            return Color._convertTo(hsla, to);","        },","","        /**","        Adjusts the hue degree from subtractive to additive","        @private","        @method _toAdditive","        @param {Number} hue","        @return {Number} Converted additive hue","        @since 3.8.0","        */","        _toAdditive: function(hue) {","            hue = Y.Color._constrainHue(hue);","","            if (hue <= 180) {","                hue /= 1.5;","            } else if (hue < 240) {","                hue = 120 + (hue - 180) * 2;","            }","","            return Y.Color._constrainHue(hue, 10);","        },","","        /**","        Adjusts the hue degree from additive to subtractive","        @private","        @method _toSubtractive","        @param {Number} hue","        @return {Number} Converted subtractive hue","        @since 3.8.0","        */","        _toSubtractive: function(hue) {","            hue = Y.Color._constrainHue(hue);","","            if (hue <= 120) {","                hue *= 1.5;","            } else if (hue < 240) {","                hue = 180 + (hue - 120) / 2;","            }","","            return Y.Color._constrainHue(hue, 10);","        },","","        /**","        Contrain the hue to a value between 0 and 360 for calculations","            and real color wheel value space. Provide a precision value","            to round return value to a decimal place","        @private","        @method _constrainHue","        @param {Number} hue","        @param {Number} [precision]","        @return {Number} Constrained hue value","        @since 3.8.0","        **/","        _constrainHue: function(hue, precision) {","            while (hue < 0) {","                hue += 360;","            }","            hue %= 360;","","            if (precision) {","                hue = Math.round(hue * precision) / precision;","            }","","            return hue;","        },","","        /**","        Brightness weight factors for perceived brightness calculations","","        \"standard\" values are listed as R: 0.241, G: 0.691, B: 0.068","        These values were changed based on grey scale comparison of hsl","          to new hsl where brightness is said to be within plus or minus 0.01.","        @private","        @property _brightnessWeights","        @since 3.8.0","        */","        _brightnessWeights: {","            r: 0.221,","            g: 0.711,","            b: 0.068","        },","","        /**","        Calculates the luminance as a mid range between the min and max","          to match the brightness level provided","        @private","        @method _searchLuminanceForBrightness","        @param {Array} color HSLA values","        @param {Number} brightness Brightness to be matched","        @param {Number} min Minimum range for luminance","        @param {Number} max Maximum range for luminance","        @return {Number} Found luminance to achieve requested brightness","        @since 3.8.0","        **/","        _searchLuminanceForBrightness: function(color, brightness, min, max) {","            var luminance = (max + min) / 2,","                b;","","            color[2] = luminance;","            b = Harmony.getBrightness(Color.fromArray(color, Y.Color.TYPES.HSL));","","            if (b + 2 > brightness && b - 2 < brightness) {","                return luminance;","            } else if (b > brightness) {","                return Harmony._searchLuminanceForBrightness(color, brightness, min, luminance);","            } else {","                return Harmony._searchLuminanceForBrightness(color, brightness, luminance, max);","            }","        },","","        /**","        Takes an HSL array, and an array of offsets and returns and array","            of colors that have been adjusted. The returned colors will","            match the array of offsets provided. If you wish you have the","            same color value returned, you can provide null or an empty","            object to the offsets. The returned array will contain color","            value strings that have been adjusted from subtractive to","            additive.","        @private","        @method _adjustOffsetAndFinish","        @param {Array} color","        @param {Array} offsets","        @param {String} to","        @return {Array}","        @since 3.8.0","        **/","        _adjustOffsetAndFinish: function(color, offsets, to) {","            var colors = [],","                i,","                l = offsets.length,","                _c;","","            for (i = 0; i < l; i++ ) {","                _c = color.concat();","                if (offsets[i]) {","                    _c = Harmony.getOffset(_c, offsets[i]);","                }","                colors.push(Harmony._finish(_c, to));","            }","","            return colors;","        }","","    };","","Y.Color = Y.mix(Y.Color, Harmony);","","","}, '@VERSION@', {\"requires\": [\"color-hsl\"]});"];
_yuitest_coverage["build/color-harmony/color-harmony.js"].lines = {"1":0,"12":0,"41":0,"44":0,"46":0,"47":0,"49":0,"65":0,"68":0,"70":0,"72":0,"73":0,"74":0,"76":0,"93":0,"96":0,"97":0,"99":0,"100":0,"101":0,"102":0,"103":0,"105":0,"120":0,"123":0,"125":0,"126":0,"127":0,"129":0,"145":0,"148":0,"149":0,"151":0,"152":0,"153":0,"154":0,"156":0,"171":0,"174":0,"176":0,"177":0,"178":0,"179":0,"181":0,"196":0,"203":0,"204":0,"207":0,"208":0,"211":0,"213":0,"214":0,"215":0,"218":0,"220":0,"221":0,"224":0,"241":0,"245":0,"246":0,"247":0,"248":0,"250":0,"251":0,"252":0,"263":0,"281":0,"285":0,"286":0,"287":0,"289":0,"290":0,"293":0,"295":0,"296":0,"299":0,"300":0,"303":0,"304":0,"307":0,"308":0,"311":0,"324":0,"331":0,"351":0,"354":0,"356":0,"357":0,"360":0,"362":0,"364":0,"380":0,"381":0,"383":0,"397":0,"398":0,"400":0,"401":0,"404":0,"416":0,"418":0,"419":0,"420":0,"421":0,"424":0,"436":0,"438":0,"439":0,"440":0,"441":0,"444":0,"459":0,"460":0,"462":0,"464":0,"465":0,"468":0,"500":0,"503":0,"504":0,"506":0,"507":0,"508":0,"509":0,"511":0,"532":0,"537":0,"538":0,"539":0,"540":0,"542":0,"545":0,"550":0};
_yuitest_coverage["build/color-harmony/color-harmony.js"].functions = {"getComplementary:40":0,"getSplit:64":0,"getAnalogous:92":0,"getTriad:119":0,"getTetrad:144":0,"getSquare:170":0,"getMonochrome:195":0,"getSimilar:240":0,"getOffset:280":0,"getBrightness:323":0,"getSimilarBrightness:350":0,"_start:379":0,"_finish:396":0,"_toAdditive:415":0,"_toSubtractive:435":0,"_constrainHue:458":0,"_searchLuminanceForBrightness:499":0,"_adjustOffsetAndFinish:531":0,"(anonymous 1):1":0};
_yuitest_coverage["build/color-harmony/color-harmony.js"].coveredLines = 133;
_yuitest_coverage["build/color-harmony/color-harmony.js"].coveredFunctions = 19;
_yuitest_coverline("build/color-harmony/color-harmony.js", 1);
YUI.add('color-harmony', function (Y, NAME) {

/**
Color Harmony provides methods useful for color combination discovery.

@module color
@submodule color-harmony
@class Harmony
@namespace Color
@since 3.8.0
*/
_yuitest_coverfunc("build/color-harmony/color-harmony.js", "(anonymous 1)", 1);
_yuitest_coverline("build/color-harmony/color-harmony.js", 12);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getComplementary", 40);
_yuitest_coverline("build/color-harmony/color-harmony.js", 41);
var c = Harmony._start(str),
                offsets = [];

            _yuitest_coverline("build/color-harmony/color-harmony.js", 44);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 46);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 47);
offsets.push({ h: 180 });

            _yuitest_coverline("build/color-harmony/color-harmony.js", 49);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getSplit", 64);
_yuitest_coverline("build/color-harmony/color-harmony.js", 65);
var c = Harmony._start(str),
                offsets = [];

            _yuitest_coverline("build/color-harmony/color-harmony.js", 68);
offset = offset || SPLIT_OFFSET;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 70);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 72);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 73);
offsets.push({ h: 180 + offset });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 74);
offsets.push({ h: 180 - offset });

            _yuitest_coverline("build/color-harmony/color-harmony.js", 76);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getAnalogous", 92);
_yuitest_coverline("build/color-harmony/color-harmony.js", 93);
var c = Harmony._start(str),
                offsets = [];

            _yuitest_coverline("build/color-harmony/color-harmony.js", 96);
offset = offset || ANALOGOUS_OFFSET;
            _yuitest_coverline("build/color-harmony/color-harmony.js", 97);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 99);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 100);
offsets.push({ h: offset });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 101);
offsets.push({ h: offset * 2 });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 102);
offsets.push({ h: -offset });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 103);
offsets.push({ h: -offset * 2 });

            _yuitest_coverline("build/color-harmony/color-harmony.js", 105);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getTriad", 119);
_yuitest_coverline("build/color-harmony/color-harmony.js", 120);
var c = Harmony._start(str),
                offsets = [];

            _yuitest_coverline("build/color-harmony/color-harmony.js", 123);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 125);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 126);
offsets.push({ h: TRIAD_OFFSET });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 127);
offsets.push({ h: -TRIAD_OFFSET });

            _yuitest_coverline("build/color-harmony/color-harmony.js", 129);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getTetrad", 144);
_yuitest_coverline("build/color-harmony/color-harmony.js", 145);
var c = Harmony._start(str),
                offsets = [];

            _yuitest_coverline("build/color-harmony/color-harmony.js", 148);
offset = offset || TETRAD_OFFSET;
            _yuitest_coverline("build/color-harmony/color-harmony.js", 149);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 151);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 152);
offsets.push({ h: offset });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 153);
offsets.push({ h: 180 });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 154);
offsets.push({ h: 180 + offset });

            _yuitest_coverline("build/color-harmony/color-harmony.js", 156);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getSquare", 170);
_yuitest_coverline("build/color-harmony/color-harmony.js", 171);
var c = Harmony._start(str),
                offsets = [];

            _yuitest_coverline("build/color-harmony/color-harmony.js", 174);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 176);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 177);
offsets.push({ h: SQUARE_OFFSET });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 178);
offsets.push({ h: SQUARE_OFFSET * 2 });
            _yuitest_coverline("build/color-harmony/color-harmony.js", 179);
offsets.push({ h: SQUARE_OFFSET * 3 });

            _yuitest_coverline("build/color-harmony/color-harmony.js", 181);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getMonochrome", 195);
_yuitest_coverline("build/color-harmony/color-harmony.js", 196);
var c = Harmony._start(str),
                colors = [],
                i = 0,
                l,
                step,
                _c = c.concat();

            _yuitest_coverline("build/color-harmony/color-harmony.js", 203);
count = count || DEF_COUNT;
            _yuitest_coverline("build/color-harmony/color-harmony.js", 204);
to = to || Color.findType(str);


            _yuitest_coverline("build/color-harmony/color-harmony.js", 207);
if (count < 2) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 208);
return str;
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 211);
step = 100 / (count - 1);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 213);
for (; i <= 100; i += step) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 214);
_c[2] = Math.max(Math.min(i, 100), 0);
                _yuitest_coverline("build/color-harmony/color-harmony.js", 215);
colors.push(_c.concat());
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 218);
l = colors.length;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 220);
for (i=0; i<l; i++) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 221);
colors[i] = Harmony._finish(colors[i], to);
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 224);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getSimilar", 240);
_yuitest_coverline("build/color-harmony/color-harmony.js", 241);
var c = Harmony._start(str),
                offsets = [],
                slOffset;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 245);
to = to || Color.findType(str);
            _yuitest_coverline("build/color-harmony/color-harmony.js", 246);
count = count || DEF_COUNT;
            _yuitest_coverline("build/color-harmony/color-harmony.js", 247);
offset = offset || DEF_OFFSET;
            _yuitest_coverline("build/color-harmony/color-harmony.js", 248);
slOffset = (offset > 100) ? 100 : offset;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 250);
offsets.push({});
            _yuitest_coverline("build/color-harmony/color-harmony.js", 251);
for (i = 0; i < count; i++) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 252);
offsets.push({
                    h: ( Math.random() * (offset * 2)) - offset,
                    // because getOffset adjusts from the existing color, we
                    // need to adjust it negatively to get a good number for
                    // saturation and luminance, otherwise we get a lot of
                    // white when using large offsets
                    s: ( Math.random() * slOffset - c[1]),
                    l: ( Math.random() * slOffset - c[2])
                });
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 263);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getOffset", 280);
_yuitest_coverline("build/color-harmony/color-harmony.js", 281);
var started = Y.Lang.isArray(str),
                hsla,
                type;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 285);
if (!started) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 286);
hsla = Harmony._start(str);
                _yuitest_coverline("build/color-harmony/color-harmony.js", 287);
type = Color.findType(str);
            } else {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 289);
hsla = str;
                _yuitest_coverline("build/color-harmony/color-harmony.js", 290);
type = 'hsl';
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 293);
to = to || type;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 295);
if (adjust.h) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 296);
hsla[0] = ((+hsla[0]) + adjust.h) % 360;
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 299);
if (adjust.s) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 300);
hsla[1] = Math.max(Math.min((+hsla[1]) + adjust.s, 100), 0);
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 303);
if (adjust.l) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 304);
hsla[2] = Math.max(Math.min((+hsla[2]) + adjust.l, 100), 0);
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 307);
if (!started) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 308);
return Harmony._finish(hsla, to);
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 311);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getBrightness", 323);
_yuitest_coverline("build/color-harmony/color-harmony.js", 324);
var c = Color.toArray(Color._convertTo(str, RGB)),
                r = c[0],
                g = c[1],
                b = c[2],
                weights = Y.Color._brightnessWeights;


            _yuitest_coverline("build/color-harmony/color-harmony.js", 331);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "getSimilarBrightness", 350);
_yuitest_coverline("build/color-harmony/color-harmony.js", 351);
var c = Color.toArray(Color._convertTo(str, HSL)),
                b = Harmony.getBrightness(match);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 354);
to = to || Color.findType(str);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 356);
if (to === 'keyword') {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 357);
to = 'hex';
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 360);
c[2] = Harmony._searchLuminanceForBrightness(c, b, 0, 100);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 362);
str = Color.fromArray(c, Y.Color.TYPES.HSLA);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 364);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_start", 379);
_yuitest_coverline("build/color-harmony/color-harmony.js", 380);
var hsla = Color.toArray(Color._convertTo(str, HSL));
            _yuitest_coverline("build/color-harmony/color-harmony.js", 381);
hsla[0] = Harmony._toSubtractive(hsla[0]);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 383);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_finish", 396);
_yuitest_coverline("build/color-harmony/color-harmony.js", 397);
hsla[0] = Harmony._toAdditive(hsla[0]);
            _yuitest_coverline("build/color-harmony/color-harmony.js", 398);
hsla = 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';

            _yuitest_coverline("build/color-harmony/color-harmony.js", 400);
if (to === 'keyword') {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 401);
to = 'hex';
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 404);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_toAdditive", 415);
_yuitest_coverline("build/color-harmony/color-harmony.js", 416);
hue = Y.Color._constrainHue(hue);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 418);
if (hue <= 180) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 419);
hue /= 1.5;
            } else {_yuitest_coverline("build/color-harmony/color-harmony.js", 420);
if (hue < 240) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 421);
hue = 120 + (hue - 180) * 2;
            }}

            _yuitest_coverline("build/color-harmony/color-harmony.js", 424);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_toSubtractive", 435);
_yuitest_coverline("build/color-harmony/color-harmony.js", 436);
hue = Y.Color._constrainHue(hue);

            _yuitest_coverline("build/color-harmony/color-harmony.js", 438);
if (hue <= 120) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 439);
hue *= 1.5;
            } else {_yuitest_coverline("build/color-harmony/color-harmony.js", 440);
if (hue < 240) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 441);
hue = 180 + (hue - 120) / 2;
            }}

            _yuitest_coverline("build/color-harmony/color-harmony.js", 444);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_constrainHue", 458);
_yuitest_coverline("build/color-harmony/color-harmony.js", 459);
while (hue < 0) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 460);
hue += 360;
            }
            _yuitest_coverline("build/color-harmony/color-harmony.js", 462);
hue %= 360;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 464);
if (precision) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 465);
hue = Math.round(hue * precision) / precision;
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 468);
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_searchLuminanceForBrightness", 499);
_yuitest_coverline("build/color-harmony/color-harmony.js", 500);
var luminance = (max + min) / 2,
                b;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 503);
color[2] = luminance;
            _yuitest_coverline("build/color-harmony/color-harmony.js", 504);
b = Harmony.getBrightness(Color.fromArray(color, Y.Color.TYPES.HSL));

            _yuitest_coverline("build/color-harmony/color-harmony.js", 506);
if (b + 2 > brightness && b - 2 < brightness) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 507);
return luminance;
            } else {_yuitest_coverline("build/color-harmony/color-harmony.js", 508);
if (b > brightness) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 509);
return Harmony._searchLuminanceForBrightness(color, brightness, min, luminance);
            } else {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 511);
return Harmony._searchLuminanceForBrightness(color, brightness, luminance, max);
            }}
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
            _yuitest_coverfunc("build/color-harmony/color-harmony.js", "_adjustOffsetAndFinish", 531);
_yuitest_coverline("build/color-harmony/color-harmony.js", 532);
var colors = [],
                i,
                l = offsets.length,
                _c;

            _yuitest_coverline("build/color-harmony/color-harmony.js", 537);
for (i = 0; i < l; i++ ) {
                _yuitest_coverline("build/color-harmony/color-harmony.js", 538);
_c = color.concat();
                _yuitest_coverline("build/color-harmony/color-harmony.js", 539);
if (offsets[i]) {
                    _yuitest_coverline("build/color-harmony/color-harmony.js", 540);
_c = Harmony.getOffset(_c, offsets[i]);
                }
                _yuitest_coverline("build/color-harmony/color-harmony.js", 542);
colors.push(Harmony._finish(_c, to));
            }

            _yuitest_coverline("build/color-harmony/color-harmony.js", 545);
return colors;
        }

    };

_yuitest_coverline("build/color-harmony/color-harmony.js", 550);
Y.Color = Y.mix(Y.Color, Harmony);


}, '@VERSION@', {"requires": ["color-hsl"]});
