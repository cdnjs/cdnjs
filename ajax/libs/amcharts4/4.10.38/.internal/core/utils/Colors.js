/**
 * A collection of color-related functions
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as $math from "./Math";
import * as $type from "./Type";
/**
 * Define named colors for easy resolution to RGB.
 */
var namedColors = {
    aliceblue: { r: 240, g: 248, b: 255 },
    antiquewhite: { r: 250, g: 235, b: 215 },
    aqua: { r: 0, g: 255, b: 255 },
    aquamarine: { r: 127, g: 255, b: 212 },
    azure: { r: 240, g: 255, b: 255 },
    beige: { r: 245, g: 245, b: 220 },
    bisque: { r: 255, g: 228, b: 196 },
    black: { r: 0, g: 0, b: 0 },
    blanchedalmond: { r: 255, g: 235, b: 205 },
    blue: { r: 0, g: 0, b: 255 },
    blueviolet: { r: 138, g: 43, b: 226 },
    brown: { r: 165, g: 42, b: 42 },
    burlywood: { r: 222, g: 184, b: 135 },
    cadetblue: { r: 95, g: 158, b: 160 },
    chartreuse: { r: 127, g: 255, b: 0 },
    chocolate: { r: 210, g: 105, b: 30 },
    coral: { r: 255, g: 127, b: 80 },
    cornflowerblue: { r: 100, g: 149, b: 237 },
    cornsilk: { r: 255, g: 248, b: 220 },
    crimson: { r: 220, g: 20, b: 60 },
    cyan: { r: 0, g: 255, b: 255 },
    darkblue: { r: 0, g: 0, b: 139 },
    darkcyan: { r: 0, g: 139, b: 139 },
    darkgoldenrod: { r: 184, g: 134, b: 11 },
    darkgray: { r: 169, g: 169, b: 169 },
    darkgrey: { r: 169, g: 169, b: 169 },
    darkgreen: { r: 0, g: 100, b: 0 },
    darkkhaki: { r: 189, g: 183, b: 107 },
    darkmagenta: { r: 139, g: 0, b: 139 },
    darkolivegreen: { r: 85, g: 107, b: 47 },
    darkorange: { r: 255, g: 140, b: 0 },
    darkorchid: { r: 153, g: 50, b: 204 },
    darkred: { r: 139, g: 0, b: 0 },
    darksalmon: { r: 233, g: 150, b: 122 },
    darkseagreen: { r: 143, g: 188, b: 143 },
    darkslateblue: { r: 72, g: 61, b: 139 },
    darkslategray: { r: 47, g: 79, b: 79 },
    darkslategrey: { r: 47, g: 79, b: 79 },
    darkturquoise: { r: 0, g: 206, b: 209 },
    darkviolet: { r: 148, g: 0, b: 211 },
    deeppink: { r: 255, g: 20, b: 147 },
    deepskyblue: { r: 0, g: 191, b: 255 },
    dimgray: { r: 105, g: 105, b: 105 },
    dimgrey: { r: 105, g: 105, b: 105 },
    dodgerblue: { r: 30, g: 144, b: 255 },
    firebrick: { r: 178, g: 34, b: 34 },
    floralwhite: { r: 255, g: 250, b: 240 },
    forestgreen: { r: 34, g: 139, b: 34 },
    fuchsia: { r: 255, g: 0, b: 255 },
    gainsboro: { r: 220, g: 220, b: 220 },
    ghostwhite: { r: 248, g: 248, b: 255 },
    gold: { r: 255, g: 215, b: 0 },
    goldenrod: { r: 218, g: 165, b: 32 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 },
    green: { r: 0, g: 128, b: 0 },
    greenyellow: { r: 173, g: 255, b: 47 },
    honeydew: { r: 240, g: 255, b: 240 },
    hotpink: { r: 255, g: 105, b: 180 },
    indianred: { r: 205, g: 92, b: 92 },
    indigo: { r: 75, g: 0, b: 130 },
    ivory: { r: 255, g: 255, b: 240 },
    khaki: { r: 240, g: 230, b: 140 },
    lavender: { r: 230, g: 230, b: 250 },
    lavenderblush: { r: 255, g: 240, b: 245 },
    lawngreen: { r: 124, g: 252, b: 0 },
    lemonchiffon: { r: 255, g: 250, b: 205 },
    lightblue: { r: 173, g: 216, b: 230 },
    lightcoral: { r: 240, g: 128, b: 128 },
    lightcyan: { r: 224, g: 255, b: 255 },
    lightgoldenrodyellow: { r: 250, g: 250, b: 210 },
    lightgray: { r: 211, g: 211, b: 211 },
    lightgrey: { r: 211, g: 211, b: 211 },
    lightgreen: { r: 144, g: 238, b: 144 },
    lightpink: { r: 255, g: 182, b: 193 },
    lightsalmon: { r: 255, g: 160, b: 122 },
    lightseagreen: { r: 32, g: 178, b: 170 },
    lightskyblue: { r: 135, g: 206, b: 250 },
    lightslategray: { r: 119, g: 136, b: 153 },
    lightslategrey: { r: 119, g: 136, b: 153 },
    lightsteelblue: { r: 176, g: 196, b: 222 },
    lightyellow: { r: 255, g: 255, b: 224 },
    lime: { r: 0, g: 255, b: 0 },
    limegreen: { r: 50, g: 205, b: 50 },
    linen: { r: 250, g: 240, b: 230 },
    magenta: { r: 255, g: 0, b: 255 },
    maroon: { r: 128, g: 0, b: 0 },
    mediumaquamarine: { r: 102, g: 205, b: 170 },
    mediumblue: { r: 0, g: 0, b: 205 },
    mediumorchid: { r: 186, g: 85, b: 211 },
    mediumpurple: { r: 147, g: 112, b: 219 },
    mediumseagreen: { r: 60, g: 179, b: 113 },
    mediumslateblue: { r: 123, g: 104, b: 238 },
    mediumspringgreen: { r: 0, g: 250, b: 154 },
    mediumturquoise: { r: 72, g: 209, b: 204 },
    mediumvioletred: { r: 199, g: 21, b: 133 },
    midnightblue: { r: 25, g: 25, b: 112 },
    mintcream: { r: 245, g: 255, b: 250 },
    mistyrose: { r: 255, g: 228, b: 225 },
    moccasin: { r: 255, g: 228, b: 181 },
    navajowhite: { r: 255, g: 222, b: 173 },
    navy: { r: 0, g: 0, b: 128 },
    oldlace: { r: 253, g: 245, b: 230 },
    olive: { r: 128, g: 128, b: 0 },
    olivedrab: { r: 107, g: 142, b: 35 },
    orange: { r: 255, g: 165, b: 0 },
    orangered: { r: 255, g: 69, b: 0 },
    orchid: { r: 218, g: 112, b: 214 },
    palegoldenrod: { r: 238, g: 232, b: 170 },
    palegreen: { r: 152, g: 251, b: 152 },
    paleturquoise: { r: 175, g: 238, b: 238 },
    palevioletred: { r: 219, g: 112, b: 147 },
    papayawhip: { r: 255, g: 239, b: 213 },
    peachpuff: { r: 255, g: 218, b: 185 },
    peru: { r: 205, g: 133, b: 63 },
    pink: { r: 255, g: 192, b: 203 },
    plum: { r: 221, g: 160, b: 221 },
    powderblue: { r: 176, g: 224, b: 230 },
    purple: { r: 128, g: 0, b: 128 },
    rebeccapurple: { r: 102, g: 51, b: 153 },
    red: { r: 255, g: 0, b: 0 },
    rosybrown: { r: 188, g: 143, b: 143 },
    royalblue: { r: 65, g: 105, b: 225 },
    saddlebrown: { r: 139, g: 69, b: 19 },
    salmon: { r: 250, g: 128, b: 114 },
    sandybrown: { r: 244, g: 164, b: 96 },
    seagreen: { r: 46, g: 139, b: 87 },
    seashell: { r: 255, g: 245, b: 238 },
    sienna: { r: 160, g: 82, b: 45 },
    silver: { r: 192, g: 192, b: 192 },
    skyblue: { r: 135, g: 206, b: 235 },
    slateblue: { r: 106, g: 90, b: 205 },
    slategray: { r: 112, g: 128, b: 144 },
    slategrey: { r: 112, g: 128, b: 144 },
    snow: { r: 255, g: 250, b: 250 },
    springgreen: { r: 0, g: 255, b: 127 },
    steelblue: { r: 70, g: 130, b: 180 },
    tan: { r: 210, g: 180, b: 140 },
    teal: { r: 0, g: 128, b: 128 },
    thistle: { r: 216, g: 191, b: 216 },
    tomato: { r: 255, g: 99, b: 71 },
    turquoise: { r: 64, g: 224, b: 208 },
    violet: { r: 238, g: 130, b: 238 },
    wheat: { r: 245, g: 222, b: 179 },
    white: { r: 255, g: 255, b: 255 },
    whitesmoke: { r: 245, g: 245, b: 245 },
    yellow: { r: 255, g: 255, b: 0 },
    yellowgreen: { r: 154, g: 205, b: 50 }
};
/**
 * Tries to resolve a named color into a hex color representation.
 *
 * @ignore Exclude from docs
 * @param value  Color name
 * @return Color
 * @deprecated
 * @hidden
 */
/*export function resolveNamedColor(value: string): Color {
    return (<any>namedColors)[value] ? (<any>namedColors)[value] : undefined;
}*/
/**
 * Converts a proper color hex code (i.e. "#FF5500") or named color (i.e. "red")
 * into an {iRGB} object. If the code is not correctly formatted, an RGB of
 * black is returned.
 *
 * @ignore Exclude from docs
 * @param color  Color code
 * @param alpha  Alpha (0-1)
 * @return RGB
 */
export function rgb(color, alpha) {
    // Init return value
    var rgb;
    // Try resolving color format
    // Named color?
    if (namedColors[color]) {
        rgb = namedColors[color];
    }
    // Hex code?
    else if (color.charAt(0) === "#") {
        rgb = hexToRgb(color);
    }
    // rgb() format?
    else if (color.match(/^rgba?\(/)) {
        rgb = rgbaToRgb(color);
    }
    // Was not able to resolve?
    if (!rgb) {
        rgb = { r: 0, g: 0, b: 0, a: 1 };
    }
    // Set alpha
    if ($type.hasValue(alpha)) {
        rgb.a = alpha;
    }
    return rgb;
}
/**
 * Converts a hex color code (i.e. "#FF5500") to an [[iRGB]] object.
 *
 * @ignore Exclude from docs
 * @param hex  Hex color code
 * @return RGB
 */
export function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : hexToRgbWithAlpha(hex);
}
/**
 * Converts a hex color code with alpha (i.e. "#FF5500128") to an [[iRGB]] object.
 *
 * @ignore Exclude from docs
 * @param hex  Hex color code
 * @return RGB
 */
export function hexToRgbWithAlpha(hex) {
    // Expand shorthand form (e.g. "03FA") to full form (e.g. "0033FFAA")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b, a) {
        return r + r + g + g + b + b + a + a;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: parseInt(result[4], 16) / 256
    } : undefined;
}
/**
 * Converts color strings in format like `rgb()` and `rgba()` to [[iRGB]].
 *
 * @ignore Exclude from docs
 * @param color  Color code
 * @return RGB
 */
export function rgbaToRgb(color) {
    color = color.replace(/[ ]/g, "");
    // Init
    var matches = color.match(/^rgb\(([0-9]*),([0-9]*),([0-9]*)\)/i);
    // Try rgb() format
    if (matches) {
        matches.push("1");
    }
    else {
        matches = color.match(/^rgba\(([0-9]*),([0-9]*),([0-9]*),([.0-9]*)\)/i);
        if (!matches) {
            return;
        }
    }
    return {
        r: parseInt(matches[1]),
        g: parseInt(matches[2]),
        b: parseInt(matches[3]),
        a: parseFloat(matches[4])
    };
}
/**
 * Converts an [[iRGB]] object into a hex color code.
 *
 * @ignore Exclude from docs
 * @param rgb  RGB
 * @return Hex color code
 */
export function rgbToHex(rgb) {
    return "#" + pad2(rgb.r.toString(16)) + pad2(rgb.g.toString(16)) + pad2(rgb.b.toString(16));
}
/**
 * Converts an [[iRGB]] object into its `rgb()` or `rgba()` representation.
 *
 * @ignore Exclude from docs
 * @param rgb  RGB
 * @return `rgba()` syntax
 */
export function rgbToRGBA(rgb) {
    if ($type.hasValue(rgb.a) && rgb.a !== 1) {
        return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + rgb.a + ")";
    }
    else {
        return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
    }
}
/**
 * Pads a 1-digit string with a zero.
 *
 * @ignore Exclude from docs
 * @param c  Input string
 * @return Padded string
 */
export function pad2(c) {
    return c.length == 1 ? "0" + c : "" + c;
}
/**
 * Returns an intermediate color between two colors based on the relative
 * position. Position needs to be in range between 0 and 1. Zero meaning the
 * resulting color will be closest to the first reference color.
 *
 * @ignore Exclude from docs
 * @param color1   First reference color
 * @param color2   Second reference color
 * @param percent  Relative position (0-1)
 * @return Interpolated color
 */
export function interpolate(rgb1, rgb2, percent) {
    percent = $math.fitToRange(percent, 0, 1);
    if (rgb1) {
        if (rgb2) {
            return {
                r: rgb1.r + Math.round((rgb2.r - rgb1.r) * percent),
                g: rgb1.g + Math.round((rgb2.g - rgb1.g) * percent),
                b: rgb1.b + Math.round((rgb2.b - rgb1.b) * percent),
                a: (rgb1.a || 1) + Math.round(((rgb2.a || 1) - (rgb1.a || 1)) * percent)
            };
        }
        else {
            return rgb1;
        }
    }
    else if (rgb2) {
        return rgb2;
    }
    else {
        return rgb1;
    }
}
/**
 * Returns a color that is `percent` brighter than the reference color.
 *
 * @ignore Exclude from docs
 * @param color    Reference color
 * @param percent  Brightness percent
 * @return Hex code of the new color
 */
export function lighten(rgb, percent) {
    if (rgb) {
        return {
            r: Math.max(0, Math.min(255, rgb.r + getLightnessStep(rgb.r, percent))),
            g: Math.max(0, Math.min(255, rgb.g + getLightnessStep(rgb.g, percent))),
            b: Math.max(0, Math.min(255, rgb.b + getLightnessStep(rgb.b, percent))),
            a: rgb.a
        };
    }
    else {
        // TODO is this correct ?
        return rgb;
    }
}
;
/**
 * Gets lightness step.
 *
 * @ignore Exclude from docs
 * @param value    Value
 * @param percent  Percent
 * @return Step
 */
export function getLightnessStep(value, percent) {
    var base = percent > 0 ? 255 - value : value;
    return Math.round(base * percent);
}
/**
 * Returns a color that is `percent` brighter than the source `color`.
 *
 * @ignore Exclude from docs
 * @param color    Source color
 * @param percent  Brightness percent
 * @return New color
 */
export function brighten(rgb, percent) {
    if (rgb) {
        var base = Math.min(Math.max(rgb.r, rgb.g, rgb.b), 230);
        //let base = Math.max(rgb.r, rgb.g, rgb.b);
        var step = getLightnessStep(base, percent);
        return {
            r: Math.max(0, Math.min(255, Math.round(rgb.r + step))),
            g: Math.max(0, Math.min(255, Math.round(rgb.g + step))),
            b: Math.max(0, Math.min(255, Math.round(rgb.b + step))),
            a: rgb.a
        };
    }
    else {
        // TODO is this correct ?
        return rgb;
    }
}
;
/**
 * Returns brightness step.
 *
 * @ignore Exclude from docs
 * @param value    Value
 * @param percent  Percent
 * @return Step
 */
export function getBrightnessStep(value, percent) {
    var base = 255; //percent > 0 ? 255 - value : value;
    return Math.round(base * percent);
}
/**
 * Returns a new [[iRGB]] object based on `rgb` parameter with specific
 * saturation applied.
 *
 * `saturation` can be in the range of 0 (fully desaturated) to 1 (fully
 * saturated).
 *
 * @ignore Exclude from docs
 * @param color       Base color
 * @param saturation  Saturation (0-1)
 * @return New color
 */
export function saturate(rgb, saturation) {
    if (rgb == null || saturation == 1) {
        return rgb;
    }
    var hsl = rgbToHsl(rgb);
    hsl.s = saturation;
    return hslToRgb(hsl);
}
/*
// not used
export function rgbToMatrix(rgb: iRGB): string {
    let r = $type.toText($math.round((rgb.r || 0) / 255, 10));
    let g = $type.toText($math.round((rgb.g || 0) / 255, 10));
    let b = $type.toText($math.round((rgb.b || 0) / 255, 10));
    let a = $type.toText(rgb.a || 1);
    return	      r + " 0 0 0 0" +
                    " 0 " + g + " 0 0 0" +
                    " 0 0 " + b + " 0 0" +
                    " 0 0 0 " + a + " 0";
}
*/
/**
 * The functions below are taken and adapted from Garry Tan's blog post:
 * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 *
 * The further attributions go mjijackson.com, which now seems to be defunct.
 */
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * Function adapted from:
 * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 *
 * @ignore Exclude from docs
 * @param h       The hue
 * @param s       The saturation
 * @param l       The lightness
 * @return The RGB representation
 */
export function hslToRgb(color) {
    var r, g, b;
    var h = color.h;
    var s = color.s;
    var l = color.l;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * Function adapted from:
 * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 *
 * @ignore Exclude from docs
 * @param r       The red color value
 * @param g       The green color value
 * @param b       The blue color value
 * @return The HSL representation
 */
export function rgbToHsl(color) {
    var r = color.r / 255;
    var g = color.g / 255;
    var b = color.b / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l
    };
}
/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @ignore Exclude from docs
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
export function rgbToHsv(color) {
    var r = color.r / 255;
    var g = color.g / 255;
    var b = color.b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var v = max;
    var d = max - min;
    s = max == 0 ? 0 : d / max;
    if (max == min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        v: v
    };
}
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @ignore Exclude from docs
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
export function hsvToRgb(color) {
    var r = 0;
    var g = 0;
    var b = 0;
    var h = color.h;
    var s = color.s;
    var v = color.v;
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
/**
 * Returns `true` if color is "light". Useful indetermining which contrasting
 * color to use for elements over this color. E.g.: you would want to use
 * black text over light background, and vice versa.
 *
 * @ignore Exclude from docs
 * @param color  Source color
 * @return Light?
 */
export function isLight(color) {
    return ((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000 >= 128;
}
//# sourceMappingURL=Colors.js.map