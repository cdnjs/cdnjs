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
var installedColorSpaces = [],
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
                    alpha = typeof matchCssSyntax[8] === 'undefined' ? matchCssSyntax[8] : parseFloat(matchCssSyntax[8]),
                    hasHue = colorSpaceName[0] === 'H',
                    firstChannelDivisor = matchCssSyntax[3] ? 100 : (hasHue ? 360 : 255),
                    secondChannelDivisor = (matchCssSyntax[5] || hasHue) ? 100 : 255,
                    thirdChannelDivisor = (matchCssSyntax[7] || hasHue) ? 100 : 255;
                if (typeof ONECOLOR[colorSpaceName] === 'undefined') {
                    throw new Error("one.color." + colorSpaceName + " is not installed.");
                }
                return new ONECOLOR[colorSpaceName](
                    parseFloat(matchCssSyntax[2]) / firstChannelDivisor,
                    parseFloat(matchCssSyntax[4]) / secondChannelDivisor,
                    parseFloat(matchCssSyntax[6]) / thirdChannelDivisor,
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
                    parseInt(hexMatch[1], 16) / 255,
                    parseInt(hexMatch[2], 16) / 255,
                    parseInt(hexMatch[3], 16) / 255
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
    ONECOLOR[colorSpaceName] = new Function(propertyNames.join(","),
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
        prototype[methodName] = prototype[methodName] || (colorSpaceName === 'RGB' ? prototype.hex : new Function("return this.rgb()." + methodName + "();"));
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

    prototype.toJSON = new Function(
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
    prototype.toString = new Function("return \"[one.color." + colorSpaceName + ":\"+" + propertyNames.map(function (propertyName, i) {
        return "\" " + propertyNames[i] + "=\"+this._" + propertyName;
    }).join("+") + "+\"]\";");

    // Generate getters and setters
    propertyNames.forEach(function (propertyName, i) {
        prototype[propertyName] = new Function("value", "isDelta",
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
        obj[sourceColorSpaceName.toLowerCase()] = new Function("return this.rgb()." + sourceColorSpaceName.toLowerCase() + "();"); // Fallback
        ONECOLOR[sourceColorSpaceName].propertyNames.forEach(function (propertyName, i) {
            obj[propertyName] = new Function("value", "isDelta", "return this." + sourceColorSpaceName.toLowerCase() + "()." + propertyName + "(value, isDelta);");
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

ONECOLOR.installMethod = function (name, fn) {
    installedColorSpaces.forEach(function (colorSpace) {
        ONECOLOR[colorSpace].prototype[name] = fn;
    });
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
        var hexString = (Math.round(255 * this._red) * 0x10000 + Math.round(255 * this._green) * 0x100 + Math.round(255 * this._blue)).toString(16);
        return '#' + ('00000'.substr(0, 6 - hexString.length)) + hexString;
    },

    /**
     * Get a valid CSS color representation of the color without an
     * alpha value.
     * @return {String} The CSS color string, e.g. "rgb(123, 2, 202)"
     */
    css: function () {
        return "rgb(" + Math.round(255 * this._red) + "," + Math.round(255 * this._green) + "," + Math.round(255 * this._blue) + ")";
    },

    /**
     * Get a valid CSS color representation of the color, including
     * the alpha value.
     * @return {String} The CSS color string, e.g. "rgba(123, 2, 202, 0.253)"
     */
    cssa: function () {
        return "rgba(" + Math.round(255 * this._red) + "," + Math.round(255 * this._green) + "," + Math.round(255 * this._blue) + "," + this._alpha + ")";
    }
});

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
ONECOLOR.installColorSpace('HSV', ['hue', 'saturation', 'value', 'alpha'], {
    rgb: function () {
        var hue = this._hue,
            saturation = this._saturation,
            value = this._value,
            i = Math.min(5, Math.floor(hue * 6)),
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
            max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
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

ONECOLOR.installColorSpace('HSL', ['hue', 'saturation', 'lightness', 'alpha'], {
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

        return new ONECOLOR.HSV(this._hue, saturation, (l + s) / 2, this._alpha);
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

// This file is purely for the build system

if (typeof module !== 'undefined') {
    module.exports = ONECOLOR;
}

