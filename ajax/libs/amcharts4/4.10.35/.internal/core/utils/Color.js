/**
 * This module contains Color object definition
 */
import { registry } from "../Registry";
import * as $colors from "./Colors";
import * as $type from "./Type";
/**
 * Represents a color.
 *
 * `Color` accepts value only in [[iRGB]] object format. To create `Color`
 * object by parsing it from any supported string-based formats, use helper
 * [[color]] function:
 *
 * ```TypeScript
 * am4core.color("#ff0000");
 * am4core.color("#f00");
 * am4core.color("rgb(255, 0, 0)");
 * am4core.color("rgba(255, 0, 0, 0.5)");
 * am4core.color({ r: 255, g: 0, b: 0 });
 * am4core.color("red");
 * ```
 * ```JavaScript
 * am4core.color("#ff0000");
 * am4core.color("#f00");
 * am4core.color("rgb(255, 0, 0)");
 * am4core.color("rgba(255, 0, 0, 0.5)");
 * am4core.color({ r: 255, g: 0, b: 0 });
 * am4core.color("red");
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/colors/} for color-related info
 */
var Color = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param color Source color
     */
    function Color(color) {
        this._value = color;
    }
    Object.defineProperty(Color.prototype, "rgb", {
        /**
         * Returns [[iRGB]] representation of the color.
         *
         * @return RGB object
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hex", {
        /**
         * Returns color hex value string, e.g. "#FF0000".
         *
         * @return Hex color code
         */
        get: function () {
            return this._value ? $colors.rgbToHex(this._value) : "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "rgba", {
        /**
         * Returns an `rgba()` representation of the color, e.g.:
         * `rgba(255, 0, 0, 0.5)`.
         *
         * @return rgba color string
         */
        get: function () {
            return this._value ? $colors.rgbToRGBA(this._value) : "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "alpha", {
        /**
         * Returns current transparency.
         *
         * @return Alpha (0-1)
         */
        get: function () {
            if (this._value != null && this._value.a != null) {
                return this._value.a;
            }
            else {
                return 1;
            }
        },
        /**
         * Set alpha (transparency) of the color.
         *
         * @param value Alpha (0-1)
         */
        set: function (value) {
            if (this._value) {
                this._value.a = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "lightColor", {
        /**
         * Returns current light color setting.
         *
         * @return Color
         */
        get: function () {
            if (!this._lightColor) {
                this._lightColor = new Color({ r: 255, g: 255, b: 255 });
            }
            return this._lightColor;
        },
        /**
         * Sets "light" color. Used when determining contrasting color.
         *
         * @param color Color
         */
        set: function (color) {
            this._lightColor = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "darkColor", {
        /**
         * Returns current dark color setting.
         *
         * @return Color
         */
        get: function () {
            if (!this._darkColor) {
                this._darkColor = new Color({ r: 0, g: 0, b: 0 });
            }
            return this._darkColor;
        },
        /**
         * Sets "dark" color. Used when determining contrasting color.
         *
         * @param color Color
         */
        set: function (color) {
            this._darkColor = color;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Overrides `toString` method so that [[Color]] object can be used as
     * string.
     *
     * @ignore Exclude from docs
     * @return String represantion of color (usable in CSS)
     */
    Color.prototype.toString = function () {
        return this.alpha < 1 ? this.rgba : this.hex;
    };
    /**
     * Returns a new [[Color]] which is percent lighter (positive value),
     * or darker (negative value).
     *
     * Parameter is in the scale of -1 to 1.
     *
     * @param percent  Increase/decrease lightness by X
     * @return New Color
     */
    Color.prototype.lighten = function (percent) {
        return new Color($colors.lighten(this.rgb, percent));
    };
    /**
     * Returns a new [[Color]] which is percent brighter (positive value),
     * or darker (negative value).
     *
     * Parameter is in the scale of -1 to 1.
     *
     * @param percent  Increase/decrease brightness by X
     * @return New Color
     */
    Color.prototype.brighten = function (percent) {
        return new Color($colors.brighten(this.rgb, percent));
    };
    /**
     * Returns a new [[Color]] based on current color with specific saturation
     * applied.
     *
     * `saturation` can be in the range of 0 (fully desaturated) to 1 (fully
     * saturated).
     *
     * @param saturation  Saturation (0-1)
     * @return New (saturated) color
     */
    Color.prototype.saturate = function (saturation) {
        return new Color($colors.saturate(this.rgb, saturation));
    };
    Object.defineProperty(Color.prototype, "alternative", {
        /**
         * Returns a either light or dark color that contrasts specifically with
         * this color.
         *
         * Uses properties `darkColor` (default black) and `lightColor` (default
         * white).
         *
         * Useful when determining which color label should be on a colored
         * background, so that it stands out.
         *
         * @return Contrasting color
         */
        get: function () {
            if (this.rgb != null) {
                return $colors.isLight(this.rgb) ? this.darkColor : this.lightColor;
            }
            else {
                throw new Error("Color does not exist");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Color;
}());
export { Color };
/**
 * Resolves an input variable to a normal [[iRGB]] color and creates [[Color]]
 * object for it.
 *
 * @param value  Input value
 * @param alpha  Alpha (0-1)
 * @return Color object
 */
export function color(value, alpha) {
    if (!$type.hasValue(value)) {
        return new Color(undefined);
    }
    if (typeof value == "string") {
        var cacheId = "_color_" + value + "_" + (alpha || "1");
        var cached = registry.getCache(cacheId);
        if (cached) {
            return new Color({
                r: cached.r,
                g: cached.g,
                b: cached.b,
                a: cached.a
            });
        }
        var rgb = $colors.rgb(value, alpha);
        registry.setCache(cacheId, rgb);
        return new Color(rgb);
    }
    // Check if it's already a Color object
    if (value instanceof Color) {
        if ($type.hasValue(alpha)) {
            value.alpha = alpha;
        }
        return value;
    }
    // Not a string or Color instance, it's the iRGB object then
    return new Color(value);
}
/**
 * Checks if supplied argument is instance of [[Color]].
 *
 * @param value  Input value
 * @return Is Color?
 */
export function isColor(value) {
    return value instanceof Color;
}
/**
 * Converts any value to [[Color]].
 *
 * @param value  Input value
 * @return Color
 */
export function castColor(value) {
    return color(value);
}
/**
 * Converts any value into a [[Color]].
 *
 * @param value  Source value
 * @return Color object
 */
export function toColor(value) {
    if ($type.hasValue(value) && !isColor(value)) {
        return castColor(value);
    }
    return value;
}
//# sourceMappingURL=Color.js.map