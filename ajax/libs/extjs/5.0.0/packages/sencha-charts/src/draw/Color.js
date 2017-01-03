(function () {
    /**
     * Represents an RGB color and provides helper functions on it e.g. to get
     * color components in HSL color space.
     */
    Ext.define('Ext.draw.Color', {
        statics: {
            colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
            rgbToHexRe: /\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
            rgbaToHexRe: /\s*rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\.\d]+)\)/,
            hexRe: /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/
        },

        isColor: true,
        /**
         * @cfg {Number} lightnessFactor
         *
         * The default factor to compute the lighter or darker color.
         */
        lightnessFactor: 0.2,

        /**
         * @constructor
         * @param {Number} red Red component (0..255)
         * @param {Number} green Green component (0..255)
         * @param {Number} blue Blue component (0..255)
         * @param {Number} [alpha=1] (optional) Alpha component (0..1)
         */
        constructor: function (red, green, blue, alpha) {
            this.setRGB(red, green, blue, alpha);
        },

        setRGB: function (red, green, blue, alpha) {
            var me = this;
            me.r = Math.min(255, Math.max(0, red));
            me.g = Math.min(255, Math.max(0, green));
            me.b = Math.min(255, Math.max(0, blue));
            if (alpha === undefined) {
                me.a = 1;
            } else {
                me.a = Math.min(1, Math.max(0, alpha));
            }
        },

        /**
         * Returns the gray value (0 to 255) of the color.
         *
         * The gray value is calculated using the formula r*0.3 + g*0.59 + b*0.11.
         *
         * @return {Number}
         */
        getGrayscale: function () {
            // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
            return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
        },
        
        /**
         * Get the equivalent HSL components of the color.
         * @param {Array} [target] Optional array to receive the values.
         * @return {Array}
         */
        getHSL: function (target) {
            var me = this,
                r = me.r / 255,
                g = me.g / 255,
                b = me.b / 255,
                max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                delta = max - min,
                h,
                s = 0,
                l = 0.5 * (max + min);

            // min==max means achromatic (hue is undefined)
            if (min !== max) {
                s = (l < 0.5) ? delta / (max + min) : delta / (2 - max - min);
                if (r === max) {
                    h = 60 * (g - b) / delta;
                } else if (g === max) {
                    h = 120 + 60 * (b - r) / delta;
                } else {
                    h = 240 + 60 * (r - g) / delta;
                }
                if (h < 0) {
                    h += 360;
                }
                if (h >= 360) {
                    h -= 360;
                }
            }
            if (target) {
                target[0] = h;
                target[1] = s;
                target[2] = l;
            } else {
                target = [h, s, l];
            }
            return target;
        },

        /**
         * Set current color based on the specified HSL values.
         *
         * @param {Number} h Hue component (0..359)
         * @param {Number} s Saturation component (0..1)
         * @param {Number} l Lightness component (0..1)
         * @return this
         */
        setHSL: function (h, s, l) {
            var c, x, m,
                abs = Math.abs,
                floor = Math.floor;
            h = (h % 360 + 360 ) % 360;
            s = s > 1 ? 1 : s < 0 ? 0 : s;
            l = l > 1 ? 1 : l < 0 ? 0 : l;
            if (s === 0 || h === null) {
                l *= 255;
                this.setRGB(l, l, l);
            }
            else {
                // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
                // C is the chroma
                // X is the second largest component
                // m is the lightness adjustment
                h /= 60;
                c = s * (1 - abs(2 * l - 1));
                x = c * (1 - abs(h - 2 * floor(h / 2) - 1));
                m = l - c / 2;
                m *= 255;
                c *= 255;
                x *= 255;
                switch (floor(h)) {
                    case 0:
                        this.setRGB(c + m, x + m, m);
                        break;
                    case 1:
                        this.setRGB(x + m, c + m, m);
                        break;
                    case 2:
                        this.setRGB(m, c + m, x + m);
                        break;
                    case 3:
                        this.setRGB(m, x + m, c + m);
                        break;
                    case 4:
                        this.setRGB(x + m, m, c + m);
                        break;
                    case 5:
                        this.setRGB(c + m, m, x + m);
                        break;
                }
            }
            return this;
        },

        /**
         * Return a new color that is lighter than this color.
         * @param {Number} [factor=0.2] Lighter factor (0..1).
         * @return {Ext.draw.Color}
         */
        createLighter: function (factor) {
            var hsl = this.getHSL();
            factor = factor || this.lightnessFactor;
            // COMPAT Ext.util.Numbers -> Ext.Number
            hsl[2] = hsl[2] + factor;
            if (hsl[2] > 1) {
                hsl[2] = 1;
            } else if (hsl[2] < 0) {
                hsl[2] = 0;
            }
            return Ext.draw.Color.fromHSL(hsl[0], hsl[1], hsl[2]);
        },

        /**
         * Return a new color that is darker than this color.
         * @param {Number} [factor=0.2] Darker factor (0..1).
         * @return {Ext.draw.Color}
         */
        createDarker: function (factor) {
            factor = factor || this.lightnessFactor;
            return this.createLighter(-factor);
        },

        /**
         * Return the color in the hex format, i.e. '#rrggbb'.
         * @return {String}
         */
        toString: function () {
            if (this.a === 1) {
                var me = this,
                    round = Math.round,
                    r = round(me.r).toString(16),
                    g = round(me.g).toString(16),
                    b = round(me.b).toString(16);
                r = (r.length === 1) ? '0' + r : r;
                g = (g.length === 1) ? '0' + g : g;
                b = (b.length === 1) ? '0' + b : b;
                return ['#', r, g, b].join('');
            } else {
                return 'rgba(' + [Math.round(this.r), Math.round(this.g), Math.round(this.b), this.a.toFixed(15)].join(',') + ')';
            }
        },

        /**
         * Convert a color to hexadecimal format.
         *
         * @param {String/Array} color The color value (i.e 'rgb(255, 255, 255)', 'color: #ffffff').
         * Can also be an Array, in this case the function handles the first member.
         * @return {String} The color in hexadecimal format.
         */
        toHex: function (color) {
            if (Ext.isArray(color)) {
                color = color[0];
            }
            if (!Ext.isString(color)) {
                return '';
            }
            if (color.substr(0, 1) === '#') {
                return color;
            }
            var digits = Ext.draw.Color.colorToHexRe.exec(color);

            if (Ext.isArray(digits)) {
                var red = parseInt(digits[2], 10),
                    green = parseInt(digits[3], 10),
                    blue = parseInt(digits[4], 10),
                    rgb = blue | (green << 8) | (red << 16);
                return digits[1] + '#' + ("000000" + rgb.toString(16)).slice(-6);
            }
            else {
                return '';
            }
        },

        /**
         * Parse the string and set current color.
         *
         * Supported formats: '#rrggbb', '#rgb', and 'rgb(r,g,b)'.
         *
         * If the string is not recognized, an `undefined` will be returned instead.
         *
         * @param {String} str Color in string.
         * @return this
         */
        setFromString: function (str) {
            var values, r, g, b, a = 1,
                parse = parseInt;

            if (str === 'none') {
                this.r = this.g = this.b = this.a = 0;
                return this;
            }

            if ((str.length === 4 || str.length === 7) && str.substr(0, 1) === '#') {
                values = str.match(Ext.draw.Color.hexRe);
                if (values) {
                    r = parse(values[1], 16) >> 0;
                    g = parse(values[2], 16) >> 0;
                    b = parse(values[3], 16) >> 0;
                    if (str.length === 4) {
                        r += (r * 16);
                        g += (g * 16);
                        b += (b * 16);
                    }
                }
            }
            else if ((values = str.match(Ext.draw.Color.rgbToHexRe))) {
                r = +values[1];
                g = +values[2];
                b = +values[3];
            } else if ((values = str.match(Ext.draw.Color.rgbaToHexRe))) {
                r = +values[1];
                g = +values[2];
                b = +values[3];
                a = +values[4];
            } else {
                if (Ext.draw.Color.ColorList.hasOwnProperty(str.toLowerCase())) {
                    return this.setFromString(Ext.draw.Color.ColorList[str.toLowerCase()]);
                }
            }
            if (typeof r === 'undefined') {
                return this;
            }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            return this;
        }
    }, function () {
        var flyColor = new this();

        //<deprecated product=touch since=2.2>
        this.createAlias({
            "getLighter": "createLighter",
            "getDarker": "createDarker"
        });
        //</deprecated>

        this.addStatics({
            /**
             * Returns a flyweight instance of Ext.draw.Color.
             *
             * Can be called with either a CSS color string or with separate
             * arguments for red, green, blue, alpha.
             * 
             * @param {Number/String} red Red component (0..255) or CSS color string.
             * @param {Number} [green] Green component (0..255)
             * @param {Number} [blue] Blue component (0..255)
             * @param {Number} [alpha=1] Alpha component (0..1)
             * @return {Ext.draw.Color}
             * @static
             */
            fly: function (r, g, b, a) {
                switch (arguments.length) {
                    case 1:
                        flyColor.setFromString(r);
                        break;
                    case 3:
                    case 4:
                        flyColor.setRGB(r, g, b, a);
                        break;
                    default:
                        return null;
                }
                return flyColor;
            },

            ColorList: {
                "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
                "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
                "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
                "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
                "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
                "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
                "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
                "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
                "honeydew": "#f0fff0", "hotpink": "#ff69b4",
                "indianred ": "#cd5c5c", "indigo ": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
                "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
                "lightgray": "#d3d3d3", "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
                "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
                "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
                "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
                "navajowhite": "#ffdead", "navy": "#000080",
                "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
                "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
                "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
                "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
                "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
                "violet": "#ee82ee",
                "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
                "yellow": "#ffff00", "yellowgreen": "#9acd32"
            },

            /**
             * Create a new color based on the specified HSL values.
             *
             * @param {Number} h Hue component (0..359)
             * @param {Number} s Saturation component (0..1)
             * @param {Number} l Lightness component (0..1)
             * @return {Ext.draw.Color}
             * @static
             */
            fromHSL: function (h, s, l) {
                return (new this(0, 0, 0, 0)).setHSL(h, s, l);
            },

            /**
             * Parse the string and create a new color.
             *
             * Supported formats: '#rrggbb', '#rgb', and 'rgb(r,g,b)'.
             *
             * If the string is not recognized, an undefined will be returned instead.
             *
             * @param {String} string Color in string.
             * @returns {Ext.draw.Color}
             * @static
             */
            fromString: function (string) {
                return (new this(0, 0, 0, 0)).setFromString(string);
            },

            /**
             * Convenience method for creating a color.
             * 
             * Can be called with several different combinations of arguments:
             * 
             *     // Ext.draw.Color is returned unchanged.
             *     Ext.draw.Color.create(new Ext.draw.color(255, 0, 0, 0));
             * 
             *     // CSS color string.
             *     Ext.draw.Color.create("red");
             * 
             *     // Array of red, green, blue, alpha
             *     Ext.draw.Color.create([255, 0, 0, 0]);
             * 
             *     // Separate arguments of red, green, blue, alpha
             *     Ext.draw.Color.create(255, 0, 0, 0);
             * 
             *     // Returns black when no arguments given.
             *     Ext.draw.Color.create();
             * 
             * @param {Ext.draw.Color/String/Number[]/Number} [red] Red component (0..255),
             * CSS color string or array of all components.
             * @param {Number} [green] Green component (0..255)
             * @param {Number} [blue] Blue component (0..255)
             * @param {Number} [alpha=1] Alpha component (0..1)
             * @return {Ext.draw.Color}
             * @static
             */
            create: function (arg) {
                if (arg instanceof this) {
                    return arg;
                } else if (Ext.isArray(arg)) {
                    return new Ext.draw.Color(arg[0], arg[1], arg[2], arg[3]);
                } else if (Ext.isString(arg)) {
                    return Ext.draw.Color.fromString(arg);
                } else if (arguments.length > 2) {
                    return new Ext.draw.Color(arguments[0], arguments[1], arguments[2], arguments[3]);
                } else {
                    return new Ext.draw.Color(0, 0, 0, 0);
                }
            }
        });
    });
})();