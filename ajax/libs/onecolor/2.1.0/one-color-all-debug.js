/*global one*/

/**
 * @namespace one One.com global JavaScript namespace.
 * @exports one
 */

if (typeof one === 'undefined') {
    one = {
        include: function () {}
    };
}

/*global one*/

/**
 * @namespace one.color
 */

/**
 * Parse a hex string, 24-bit integer or object representing a color.
 * If a one.color.(RGB|HSL|HSV|CMYK) object is provided, it will be returned
 * as-is, so in library code you can use {@link one.color} to be flexible
 * about how colors are provided to you:
 * <pre><code>
function foo (myColor) {
myColor = color(myColor);
// Now we are sure that myColor is a one.color.(RGB|CMYK|HSL|HSV) object, even if it was provided as a hex string.
}
 * </code></pre>
 * @param {String|Object} obj A hex string, integer value, or
 * object to parse.
 * @return {one.color.RGB|one.color.HSL|one.color.HSV|one.color.CMYK} Color object representing the
 * parsed color, or false if the input couldn't be parsed.
 */
(function () {
    var FUNCTION = Function,
        PARSEINT = parseInt,
        PARSEFLOAT = parseFloat,
        ROUND = Math.round,
        installedColorSpaces = [],
        channelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,
        alphaChannelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)\s*/,
        cssColorRegExp = new RegExp(
                             "^(rgb|hsl|hsv)a?" +
                             "\\(" +
                                 channelRegExp.source + "," +
                                 channelRegExp.source + "," +
                                 channelRegExp.source +
                                 "(?:," + alphaChannelRegExp.source + ")?" +
                             "\\)$", "i"),
        ONECOLOR = one.color = function (obj) {
            if (Object.prototype.toString.apply(obj) === '[object Array]') {
                if (obj[0].length === 4) {
                    // Assumed 4 element int RGB array from canvas with all channels [0;255]
                    return new ONECOLOR.RGB(obj[0] / 255, obj[1] / 255, obj[2] / 255, obj[3] / 255);
                } else {
                    // Assumed destringified array from one.color.JSON()
                    return new ONECOLOR[obj[0]](obj.slice(1, obj.length));
                }
            } else if (obj.charCodeAt) {
                if (ONECOLOR.namedColors) {
                    var lowerCased = obj.toLowerCase();
                    if (ONECOLOR.namedColors[lowerCased]) {
                        obj = ONECOLOR.namedColors[lowerCased];
                    }
                }
                // Test for CSS rgb(....) string
                var matchCssSyntax = obj.match(cssColorRegExp);
                if (matchCssSyntax) {
                    var colorSpaceName = matchCssSyntax[1].toUpperCase(),
                        alpha = typeof matchCssSyntax[8] === 'undefined' ? matchCssSyntax[8] : PARSEFLOAT(matchCssSyntax[8]),
                        hasHue = colorSpaceName[0] === 'H',
                        firstChannelDivisor = matchCssSyntax[3] ? 100 : (hasHue ? 360 : 255),
                        secondChannelDivisor = (matchCssSyntax[5] || hasHue) ? 100 : 255,
                        thirdChannelDivisor = (matchCssSyntax[7] || hasHue) ? 100 : 255;
                    if (typeof ONECOLOR[colorSpaceName] === 'undefined') {
                        throw new Error("one.color." + colorSpaceName + " is not installed.");
                    }
                    return new ONECOLOR[colorSpaceName](
                        PARSEFLOAT(matchCssSyntax[2]) / firstChannelDivisor,
                        PARSEFLOAT(matchCssSyntax[4]) / secondChannelDivisor,
                        PARSEFLOAT(matchCssSyntax[6]) / thirdChannelDivisor,
                        alpha
                    );
                }
                // Assume hex syntax
                if (obj.length < 6) {
                    // Allow CSS shorthand
                    obj = obj.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, '$1$1$2$2$3$3');
                }
                // Split obj into red, green, and blue components
                var hexMatch = obj.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);
                if (hexMatch) {
                    return new ONECOLOR.RGB(
                        PARSEINT(hexMatch[1], 16) / 255,
                        PARSEINT(hexMatch[2], 16) / 255,
                        PARSEINT(hexMatch[3], 16) / 255
                    );
                }
            } else if (typeof obj === 'object' && obj.isColor) {
                return obj;
            } else if (!isNaN(obj)) {
                // Strange integer representation sometimes returned by document.queryCommandValue in some browser...
                return new ONECOLOR.RGB((obj & 0xFF) / 255, ((obj & 0xFF00) >> 8) / 255, ((obj & 0xFF0000) >> 16) / 255);
            }
            return false;
        };

/*jslint evil:true*/
    ONECOLOR.installColorSpace = function (colorSpaceName, propertyNames, config) {
        ONECOLOR[colorSpaceName] = new FUNCTION(propertyNames.join(","),
            // Allow passing an array to the constructor:
            "if (Object.prototype.toString.apply(" + propertyNames[0] + ") === '[object Array]') {" +
                propertyNames.map(function (propertyName, i) {
                    return propertyName + "=" + propertyNames[0] + "[" + i + "];";
                }).reverse().join("") +
            "}" +
            "if (" + propertyNames.filter(function (propertyName) {
                return propertyName !== 'alpha';
            }).map(function (propertyName) {
                return "isNaN(" + propertyName + ")";
            }).join("||") + "){" + "throw new Error(\"[one.color." + colorSpaceName + "]: Invalid color: (\"+" + propertyNames.join("+\",\"+") + "+\")\");}" +
            propertyNames.map(function (propertyName) {
                if (propertyName === 'hue') {
                    return "this._hue=hue<0?hue-Math.floor(hue):hue%1"; // Wrap
                } else if (propertyName === 'alpha') {
                    return "this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);";
                } else {
                    return "this._" + propertyName + "=" + propertyName + "<0?0:(" + propertyName + ">1?1:" + propertyName + ")";
                }
            }).join(";") + ";"
        );
        ONECOLOR[colorSpaceName].propertyNames = propertyNames;

        var prototype = ONECOLOR[colorSpaceName].prototype;

        ['valueOf', 'hex', 'css', 'cssa'].forEach(function (methodName) {
            prototype[methodName] = prototype[methodName] || (colorSpaceName === 'RGB' ? prototype.hex : new FUNCTION("return this.rgb()." + methodName + "();"));
        });

        prototype.isColor = true;

        prototype.equals = function (otherColor, epsilon) {
            if (typeof epsilon === 'undefined') {
                epsilon = 1e-10;
            }

            otherColor = otherColor[colorSpaceName.toLowerCase()]();

            for (var i = 0; i < propertyNames.length; i = i + 1) {
                if (Math.abs(this['_' + propertyNames[i]] - otherColor['_' + propertyNames[i]]) > epsilon) {
                    return false;
                }
            }

            return true;
        };

        prototype.toJSON = new FUNCTION(
            "return ['" + colorSpaceName + "', " +
                propertyNames.map(function (propertyName) {
                    return "this._" + propertyName;
                }, this).join(", ") +
            "];"
        );

        for (var propertyName in config) {
            if (config.hasOwnProperty(propertyName)) {
                var matchFromColorSpace = propertyName.match(/^from(.*)$/);
                if (matchFromColorSpace) {
                    ONECOLOR[matchFromColorSpace[1].toUpperCase()].prototype[colorSpaceName.toLowerCase()] = config[propertyName];
                } else {
                    prototype[propertyName] = config[propertyName];
                }
            }
        }

        // It is pretty easy to implement the conversion to the same color space:
        prototype[colorSpaceName.toLowerCase()] = function () {
            return this;
        };
        prototype.toString = new FUNCTION("return \"[one.color." + colorSpaceName + ":\"+" + propertyNames.map(function (propertyName, i) {
            return "\" " + propertyNames[i] + "=\"+this._" + propertyName;
        }).join("+") + "+\"]\";");

        // Generate getters and setters
        propertyNames.forEach(function (propertyName, i) {
            prototype[propertyName] = new FUNCTION("value", "isDelta",
                // Simple getter mode: color.red()
                "if (typeof value === 'undefined') {" +
                    "return this._" + propertyName + ";" +
                "}" +
                // Adjuster: color.red(+.2, true)
                "if (isDelta) {" +
                    "return new this.constructor(" + propertyNames.map(function (otherPropertyName, i) {
                        return "this._" + otherPropertyName + (propertyName === otherPropertyName ? "+value" : "");
                    }).join(", ") + ");" +
                "}" +
                // Setter: color.red(.2);
                "return new this.constructor(" + propertyNames.map(function (otherPropertyName, i) {
                    return propertyName === otherPropertyName ? "value" : "this._" + otherPropertyName;
                }).join(", ") + ");");
        });

        function installForeignMethods(targetColorSpaceName, sourceColorSpaceName) {
            var obj = {};
            obj[sourceColorSpaceName.toLowerCase()] = new FUNCTION("return this.rgb()." + sourceColorSpaceName.toLowerCase() + "();"); // Fallback
            ONECOLOR[sourceColorSpaceName].propertyNames.forEach(function (propertyName, i) {
                obj[propertyName] = new FUNCTION("value", "isDelta", "return this." + sourceColorSpaceName.toLowerCase() + "()." + propertyName + "(value, isDelta);");
            });
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && ONECOLOR[targetColorSpaceName].prototype[prop] === undefined) {
                    ONECOLOR[targetColorSpaceName].prototype[prop] = obj[prop];
                }
            }
        }

        installedColorSpaces.forEach(function (otherColorSpaceName) {
            installForeignMethods(colorSpaceName, otherColorSpaceName);
            installForeignMethods(otherColorSpaceName, colorSpaceName);
        });

        installedColorSpaces.push(colorSpaceName);
    };

    /**
     * @name one.color.RGB
     * @class
     * <p>A color in the RGB colorspace with an optional alpha value.</p>
     * <p>one.color.(RGB|HSL|HSV|CMYK) objects are designed to be
     * immutable; all the conversion, set, and adjust methods return new
     * objects.</p>
     * <p>one.color.(RGB|HSL|HSV|CMYK) objects automatically get the set
     * and adjust methods from all other installed colorspaces, so
     * although you can use the explicit conversion methods ({@link
     * one.color.RGB#hsl}, {@link one.color.RGB#cmyk}...), the below
     * will work just fine:</p><pre><code>
        
    new one.color.RGB(.4, .3, .9).
        lightness(+.2, true). // Implicit conversion to HSL
        red(-.1). // Implicit conversion back to RGB
        hex(); // "#00a6f2"
    </code></pre>
     *
     * @constructor
     * Create a new one.color.RGB object. Values outside the supported
     * range, [0..1], will be adjusted automatically.
     * @param {Number} red The red component, range: [0..1]
     * @param {Number} green The green component, range: [0..1]
     * @param {Number} blue The blue component, range: [0..1]
     * @param {Number} [alpha] The alpha value, range: [0..1],
     * defaults to 1
     */
    ONECOLOR.installColorSpace('RGB', ['red', 'green', 'blue', 'alpha'], {
        /**
         * Get the standard RGB hex representation of the color.
         * @return {String} The hex string, e.g. "#f681df"
         */
        hex: function () {
            var hexString = (ROUND(255 * this._red) * 0x10000 + ROUND(255 * this._green) * 0x100 + ROUND(255 * this._blue)).toString(16);
            return '#' + ('00000'.substr(0, 6 - hexString.length)) + hexString;
        },

        /**
         * Get a valid CSS color representation of the color without an
         * alpha value.
         * @return {String} The CSS color string, e.g. "rgb(123, 2, 202)"
         */
        css: function () {
            return "rgb(" + ROUND(255 * this._red) + "," + ROUND(255 * this._green) + "," + ROUND(255 * this._blue) + ")";
        },

        /**
         * Get a valid CSS color representation of the color, including
         * the alpha value.
         * @return {String} The CSS color string, e.g. "rgba(123, 2, 202, 0.253)"
         */
        cssa: function () {
            return "rgba(" + ROUND(255 * this._red) + "," + ROUND(255 * this._green) + "," + ROUND(255 * this._blue) + "," + this._alpha + ")";
        }
    });
}());

/**
 * @name one.color.RGB.prototype.red
 * @function
 * @param {Number} red The new red component, range: [0..1]. If not
 * provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.RGB} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.RGB.prototype.green
 * @function
 * @param {Number} green The new green component, range: [0..1]
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.RGB} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.RGB.prototype.blue
 * @function
 * @param {Number} blue The new blue component, range: [0..1]
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.RGB} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.RGB.prototype.alpha
 * @function
 * @param {Number} alpha The new alpha value, range: [0..1]
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.RGB} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.RGB.prototype.toJSON
 * @description Convert the color to a JSON representation.
 * @function
 * @return {Array}
 */

/**
 * @name one.color.RGB.prototype.rgb
 * @description Convert the color to a {@link one.color.RGB} object, ie. return the
 * object itself.
 * @function
 * @return {one.color.RGB}
 */

/**
 * @name one.color.RGB.prototype.hsv
 * @description Convert the color to a {@link one.color.HSV} object.
 * @function
 * @requires one.color.HSV
 * @return {one.color.HSV}
 */

/**
 * @name one.color.RGB.prototype.hsl
 * @description Convert the color to a {@link one.color.HSL} object.
 * @function
 * @requires one.color.HSL
 * @return {one.color.HSL}
 */

/**
 * @name one.color.RGB.prototype.cmyk
 * @description Convert the color to a {@link one.color.CMYK} object.
 * @function
 * @requires one.color.CMYK
 * @return {one.color.CMYK}
 */

/*global one*/

/**
 * @name one.color.HSV
 * @class
 * <p>A color in the HSV colorspace, with an optional alpha value.</p>
 * <p>one.color.(RGB|HSL|HSV|CMYK) objects are designed to be
 * immutable; all the conversion, set, and adjust methods return new
 * objects.</p>
 * <p>one.color.(RGB|HSL|HSV|CMYK) objects automatically get the set
 * and adjust methods from all other installed colorspaces, so
 * although you can use the explicit conversion methods ({@link
 * one.color.HSV#rgb}, {@link one.color.HSV#hsl}...), the below
 * will work just fine:</p><pre><code>

new one.color.HSV(.9, .2, .4).
    blue(-.4, true). // Implicit conversion to RGB
    cyan(-.1). // Implicit conversion to CMYK
    hex(); // "#665200"
</code></pre>
 *
 * @constructor
 * Create a new one.color.HSV object. Component values outside the
 * supported range, [0..1], will be adjusted automatically.
 * @param {Number} hue The hue component, range: [0..1]
 * @param {Number} saturation The saturation component, range: [0..1]
 * @param {Number} value The value component, range: [0..1]
 * @param {Number} [alpha] The alpha value, range: [0..1],
 * defaults to 1
 */

/**
 * @name one.color.HSV.prototype.hue
 * @function
 * @param {Number} [hue] The new hue component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSV} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSV.prototype.saturation
 * @function
 * @param {Number} [saturation] The new saturation component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSV} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSV.prototype.value
 * @function
 * @param {Number} [value] The new value component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSV} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSV.prototype.alpha
 * @function
 * @param {Number} [alpha] The new alpha component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSV} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSV.prototype.toJSON
 * @description Convert the color to a JSON representation.
 * @function
 * @return {Array}
 */

/**
 * @name one.color.HSV.prototype.rgb
 * @description Convert the color to a {@link one.color.RGB} object.
 * @function
 * @return {one.color.RGB}
 */

/**
 * @name one.color.HSV.prototype.hsv
 * @description Convert the color to a {@link one.color.HSV} object, ie. return the object itself.
 * @function
 * @return {one.color.HSV}
 */

/**
 * @name one.color.HSV.prototype.hsl
 * @description Convert the color to a {@link one.color.HSL} object.
 * @function
 * @requires one.color.HSL
 * @return {one.color.HSL}
 */

/**
 * @name one.color.HSV.prototype.cmyk
 * @description Convert the color to a {@link one.color.CMYK} object.
 * @function
 * @include one.color.CMYK
 * @return {one.color.CMYK}
 */

/**
 * @name one.color.HSV.prototype.hex
 * @description Get the standard RGB hex representation of the color.
 * @function
 * @return {String} The hex string, e.g. "#f681df"
 */

/**
 * @name one.color.HSV.prototype.css
 * @description Get a valid CSS color representation of the color without an alpha value.
 * @function
 * @return {String} The CSS color string, e.g. "rgb(123, 2, 202)"
 */

/**
 * @name one.color.HSV.prototype.cssa
 * @description Get a valid CSS color representation of the color, including the alpha value.
 * @function
 * @return {String} The CSS color string, e.g. "rgba(123, 2, 202, 0.253)"
 */
(function () {
    var MATH = Math,
        ONECOLOR = one.color;
    ONECOLOR.installColorSpace('HSV', ['hue', 'saturation', 'value', 'alpha'], {
        rgb: function () {
            var hue = this._hue,
                saturation = this._saturation,
                value = this._value,
                i = MATH.min(5, MATH.floor(hue * 6)),
                f = hue * 6 - i,
                p = value * (1 - saturation),
                q = value * (1 - f * saturation),
                t = value * (1 - (1 - f) * saturation),
                red,
                green,
                blue;
            switch (i) {
            case 0:
                red = value;
                green = t;
                blue = p;
                break;
            case 1:
                red = q;
                green = value;
                blue = p;
                break;
            case 2:
                red = p;
                green = value;
                blue = t;
                break;
            case 3:
                red = p;
                green = q;
                blue = value;
                break;
            case 4:
                red = t;
                green = p;
                blue = value;
                break;
            case 5:
                red = value;
                green = p;
                blue = q;
                break;
            }
            return new ONECOLOR.RGB(red, green, blue, this._alpha);
        },

        hsl: function () {
            var l = (2 - this._saturation) * this._value,
                sv = this._saturation * this._value,
                svDivisor = l <= 1 ? l : (2 - l),
                saturation;

            // Avoid division by zero when lightness approaches zero:
            if (svDivisor < 1e-9) {
                saturation = 0;
            } else {
                saturation = sv / svDivisor;
            }
            return new ONECOLOR.HSL(this._hue, saturation, l / 2, this._alpha);
        },

        fromRgb: function () { // Becomes one.color.RGB.prototype.hsv
            var red = this._red,
                green = this._green,
                blue = this._blue,
                max = MATH.max(red, green, blue),
                min = MATH.min(red, green, blue),
                delta = max - min,
                hue,
                saturation = (max === 0) ? 0 : (delta / max),
                value = max;
            if (delta === 0) {
                hue = 0;
            } else {
                switch (max) {
                case red:
                    hue = (green - blue) / delta / 6 + (green < blue ? 1 : 0);
                    break;
                case green:
                    hue = (blue - red) / delta / 6 + 1 / 3;
                    break;
                case blue:
                    hue = (red - green) / delta / 6 + 2 / 3;
                    break;
                }
            }
            return new ONECOLOR.HSV(hue, saturation, value, this._alpha);
        }
    });
}());

/*global one*/


/**
 * @name one.color.HSL
 * @class
 * <p>A color in the HSL colorspace, with an optional alpha value.</p>
 * <p>one.color.(RGB|HSL|HSV|CMYK) objects are designed to be
 * immutable; all the conversion, set, and adjust methods return new
 * objects.</p>
 * <p>one.color.(RGB|HSL|HSV|CMYK) objects automatically get the set
 * and adjust methods from all other installed colorspaces, so
 * although you can use the explicit conversion methods ({@link
 * one.color.HSL#rgb}, {@link one.color.HSL#hsv}...), the below
 * will work just fine:</p><pre><code>

new one.color.HSL(.4, .3, .9, .9). // HSL with alpha
    black(+.1, true). // Implicit conversion to CMYK (with alpha)
    green(-.1). // Implicit conversion to RGB (with alpha)
    cssa(); // "rgba(198,0,203,0.9)"
</code></pre>
 *
 * @constructor
 * Create a new one.color.HSL object. Component values outside the
 * supported range, [0..1], will be adjusted automatically.
 * @param {Number} hue The hue component, range: [0..1]
 * @param {Number} saturation The saturation component, range: [0..1]
 * @param {Number} lightness The lightness component, range: [0..1]
 * @param {Number} [alpha] The alpha value, range: [0..1],
 * defaults to 1
 */

one.color.installColorSpace('HSL', ['hue', 'saturation', 'lightness', 'alpha'], {
    hsv: function () {
        // Algorithm adapted from http://wiki.secondlife.com/wiki/Color_conversion_scripts
        var l = this._lightness * 2,
            s = this._saturation * ((l <= 1) ? l : 2 - l),
            saturation;

        // Avoid division by zero when l + s is very small (approaching black):
        if (l + s < 1e-9) {
            saturation = 0;
        } else {
            saturation = (2 * s) / (l + s);
        }

        return new one.color.HSV(this._hue, saturation, (l + s) / 2, this._alpha);
    },

    rgb: function () {
        return this.hsv().rgb();
    },

    fromRgb: function () { // Becomes one.color.RGB.prototype.hsv
        return this.hsv().hsl();
    }
});

/**
 * @name one.color.HSL.prototype.hue
 * @function
 * @param {Number} [hue] The new hue component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSL} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSL.prototype.saturation
 * @function
 * @param {Number} [saturation] The new saturation component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSL} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSL.prototype.lightness
 * @function
 * @param {Number} [lightness] The new lightness component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSL} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSL.prototype.alpha
 * @function
 * @param {Number} [alpha] The new alpha component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.HSL} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.HSL.prototype.toJSON
 * @description Convert the color to a JSON representation.
 * @function
 * @return {Array}
 */

/**
 * @name one.color.HSL.prototype.rgb
 * @description Convert the color to a {@link one.color.RGB} object.
 * @function
 * @return {one.color.RGB}
 */

/**
 * @name one.color.HSL.prototype.hsv
 * @description Convert the color to a {@link one.color.HSV} object.
 * @function
 * @return {one.color.HSV}
 * @requires one.color.HSV
 */

/**
 * @name one.color.HSL.prototype.hsl
 * @description Convert the color to a {@link one.color.HSL} object, ie. return the object itself.
 * @function
 * @return {one.color.HSL}
 */

/**
 * @name one.color.HSL.prototype.cmyk
 * @description Convert the color to a {@link one.color.CMYK} object.
 * @function
 * @requires one.color.CMYK
 * @return {one.color.CMYK}
 */

/**
 * @name one.color.HSL.prototype.hex
 * @description Get the standard RGB hex representation of the color.
 * @function
 * @return {String} The hex string, e.g. "#f681df"
 */

/**
 * @name one.color.HSL.prototype.css
 * @description Get a valid CSS color representation of the color without an alpha value.
 * @function
 * @return {String} The CSS color string, e.g. "rgb(123, 2, 202)"
 */

/**
 * @name one.color.HSL.prototype.cssa
 * @description Get a valid CSS color representation of the color, including the alpha value.
 * @function
 * @return {String} The CSS color string, e.g. "rgba(123, 2, 202, 0.253)"
 */

/*global one*/

/**
 * @name one.color.CMYK
 * @class
 * <p>A color in the CMYK colorspace, with an optional alpha value.</p>
 * <p>one.color.(RGB|HSL|HSV|CMYK) objects are designed to be
 * immutable; all the conversion, set, and adjust methods return new
 * objects.</p>
 * <p>one.color.(RGB|HSL|HSV|CMYK) objects automatically get the set
 * and adjust methods from all other installed colorspaces, so
 * although you can use the explicit conversion methods ({@link one.color.CMYK#rgb},
 * {@link one.color.CMYK#hsl}...), the below
 * will work just fine:</p><pre><code>

new one.color.CMYK(.4, .2, .4, .9, .2). // CMYK with alpha
    blue(.2). // Implicit conversion to RGB (with alpha)
    hue(-.1, true). // Implicit conversion to HSL(/HSV) (with alpha)
    cssa(); // "rgba(20,13,0,0.2)"
</code></pre>
 * @static
 *
 * @constructor
 * Create a new one.color.CMYK object. Component values outside the
 * supported range, [0..1], will be adjusted automatically.
 * @param {Number} cyan The cyan component, range: [0..1]
 * @param {Number} magenta The magenta component, range: [0..1]
 * @param {Number} yellow The yellow component, range: [0..1]
 * @param {Number} black The black component, range: [0..1]
 * @param {Number} [alpha] The alpha value, range: [0..1],
 * defaults to 1
 */

/**
 * @name one.color.CMYK.prototype.cyan
 * @function
 * @param {Number} [cyan] The new cyan component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.CMYK} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.CMYK.prototype.magenta
 * @function
 * @param {Number} [magenta] The new magenta component, range:
 * [0..1]. If not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.CMYK} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.CMYK.prototype.yellow
 * @function
 * @param {Number} yellow The new yellow component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.CMYK} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.CMYK.prototype.black
 * @function
 * @param {Number} black The new black component, range: [0..1]. If
 * not provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.CMYK} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.CMYK.prototype.alpha
 * @function
 * @param {Number} alpha The new alpha value, range: [0..1]. If not
 * provided, the current value will be returned.
 * @param {Boolean} [isDelta] Whether the new value is relative to the
 * old value of the property. If the resulting value falls outside the
 * supported range, [0..1], it will be adjusted automatically.
 * @return {Number|one.color.CMYK} The current value of the property,
 * or a new color object with the changed value.
 */

/**
 * @name one.color.CMYK.prototype.toJSON
 * @description Convert the color to a JSON representation.
 * @function
 * @return {Array}
 */

/**
 * @name one.color.CMYK.prototype.rgb
 * @description Convert the color to a {@link one.color.RGB} object.
 * @function
 * @return {one.color.RGB}
 */

/**
 * @name one.color.CMYK.prototype.hsv
 * @description Convert the color to a {@link one.color.HSV} object.
 * @function
 * @requires one.color.HSV
 * @return {one.color.HSV}
 */

/**
 * @name one.color.CMYK.prototype.hsl
 * @description Convert the color to a {@link one.color.HSL} object.
 * @function
 * @requires one.color.HSL
 * @return {one.color.HSL}
 */

/**
 * @name one.color.CMYK.prototype.cmyk
 * @description Convert the color to a {@link one.color.CMYK} object, ie. return the object itself.
 * @function
 * @return {one.color.CMYK}
 */

/**
 * @name one.color.CMYK.prototype.hex
 * @description Get the standard RGB hex representation of the color.
 * @function
 * @return {String} The hex string, e.g. "#f681df"
 */

/**
 * @name one.color.CMYK.prototype.css
 * @description Get a valid CSS color representation of the color without an alpha value.
 * @function
 * @return {String} The CSS color string, e.g. "rgb(123, 2, 202)"
 */

/**
 * @name one.color.CMYK.prototype.cssa
 * @description Get a valid CSS color representation of the color, including the alpha value.
 * @function
 * @return {String} The CSS color string, e.g. "rgba(123, 2, 202, 0.253)"
 */

one.color.installColorSpace('CMYK', ['cyan', 'magenta', 'yellow', 'black', 'alpha'], {
    rgb: function () {
        return new one.color.RGB((1 - this._cyan * (1 - this._black) - this._black),
                                 (1 - this._magenta * (1 - this._black) - this._black),
                                 (1 - this._yellow * (1 - this._black) - this._black),
                                 this._alpha);
    },

    fromRgb: function () { // Becomes one.color.RGB.prototype.cmyk
        // Adapted from http://www.javascripter.net/faq/rgb2cmyk.htm
        var red = this._red,
            green = this._green,
            blue = this._blue,
            cyan = 1 - red,
            magenta = 1 - green,
            yellow = 1 - blue,
            black = 1;
        if (red || green || blue) {
            black = Math.min(cyan, Math.min(magenta, yellow));
            cyan = (cyan - black) / (1 - black);
            magenta = (magenta - black) / (1 - black);
            yellow = (yellow - black) / (1 - black);
        } else {
            black = 1;
        }
        return new one.color.CMYK(cyan, magenta, yellow, black, this._alpha);
    }
});

one.color.namedColors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
};

// This file is purely for the build system

if (typeof module !== 'undefined') {
    module.exports = one.color;
}

