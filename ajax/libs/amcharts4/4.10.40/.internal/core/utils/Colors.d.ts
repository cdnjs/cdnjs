/**
 * A collection of color-related functions
 */
import * as $type from "./Type";
/**
 * Tries to resolve a named color into a hex color representation.
 *
 * @ignore Exclude from docs
 * @param value  Color name
 * @return Color
 * @deprecated
 * @hidden
 */
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
export declare function rgb(color: string, alpha?: number): iRGB;
/**
 * Converts a hex color code (i.e. "#FF5500") to an [[iRGB]] object.
 *
 * @ignore Exclude from docs
 * @param hex  Hex color code
 * @return RGB
 */
export declare function hexToRgb(hex: string): $type.Optional<iRGB>;
/**
 * Converts a hex color code with alpha (i.e. "#FF5500128") to an [[iRGB]] object.
 *
 * @ignore Exclude from docs
 * @param hex  Hex color code
 * @return RGB
 */
export declare function hexToRgbWithAlpha(hex: string): $type.Optional<iRGB>;
/**
 * Converts color strings in format like `rgb()` and `rgba()` to [[iRGB]].
 *
 * @ignore Exclude from docs
 * @param color  Color code
 * @return RGB
 */
export declare function rgbaToRgb(color: string): $type.Optional<iRGB>;
/**
 * Converts an [[iRGB]] object into a hex color code.
 *
 * @ignore Exclude from docs
 * @param rgb  RGB
 * @return Hex color code
 */
export declare function rgbToHex(rgb: iRGB): string;
/**
 * Converts an [[iRGB]] object into its `rgb()` or `rgba()` representation.
 *
 * @ignore Exclude from docs
 * @param rgb  RGB
 * @return `rgba()` syntax
 */
export declare function rgbToRGBA(rgb: iRGB): string;
/**
 * Pads a 1-digit string with a zero.
 *
 * @ignore Exclude from docs
 * @param c  Input string
 * @return Padded string
 */
export declare function pad2(c: string): string;
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
export declare function interpolate(rgb1: $type.Optional<iRGB>, rgb2: $type.Optional<iRGB>, percent: number): $type.Optional<iRGB>;
/**
 * Returns a color that is `percent` brighter than the reference color.
 *
 * @ignore Exclude from docs
 * @param color    Reference color
 * @param percent  Brightness percent
 * @return Hex code of the new color
 */
export declare function lighten(rgb: $type.Optional<iRGB>, percent: number): $type.Optional<iRGB>;
/**
 * Gets lightness step.
 *
 * @ignore Exclude from docs
 * @param value    Value
 * @param percent  Percent
 * @return Step
 */
export declare function getLightnessStep(value: number, percent: number): number;
/**
 * Returns a color that is `percent` brighter than the source `color`.
 *
 * @ignore Exclude from docs
 * @param color    Source color
 * @param percent  Brightness percent
 * @return New color
 */
export declare function brighten(rgb: $type.Optional<iRGB>, percent: number): $type.Optional<iRGB>;
/**
 * Returns brightness step.
 *
 * @ignore Exclude from docs
 * @param value    Value
 * @param percent  Percent
 * @return Step
 */
export declare function getBrightnessStep(value: number, percent: number): number;
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
export declare function saturate(rgb: $type.Optional<iRGB>, saturation: number): $type.Optional<iRGB>;
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
export declare function hslToRgb(color: iHSL): iRGB;
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
export declare function rgbToHsl(color: iRGB): iHSL;
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
export declare function rgbToHsv(color: iRGB): iHSV;
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
export declare function hsvToRgb(color: iHSV): iRGB;
/**
 * Returns `true` if color is "light". Useful indetermining which contrasting
 * color to use for elements over this color. E.g.: you would want to use
 * black text over light background, and vice versa.
 *
 * @ignore Exclude from docs
 * @param color  Source color
 * @return Light?
 */
export declare function isLight(color: iRGB): boolean;
/**
 * ============================================================================
 * COLOR CONVERSION
 * ============================================================================
 * @hidden
 */
/**
 * Represents an interface for an object that represents an RGB color.
 */
export interface iRGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}
/**
 * Represents an interface for an object that represents an HSL color.
 */
export interface iHSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}
/**
 * Represents an interface for an object that represents an HSV color.
 */
export interface iHSV {
    h: number;
    s: number;
    v: number;
    a?: number;
}
