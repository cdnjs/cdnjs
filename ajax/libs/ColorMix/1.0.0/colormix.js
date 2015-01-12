/*!
 *
 * ColorMix JavaScript Library v1.0.0
 * http://colormix.florentschildknecht.com
 *
 * Copyright 2013 @ Florent SCHILDKNECHT
 *
 * Date: 2013-05-23
 *
 */
var ColorMix = (function () {
    "use strict";
    var _gradient = [{
            reference: 0,
            color: {
                red: 0,
                green: 0,
                blue: 0
            }
        }, {
            reference: 100,
            color: {
                red: 255,
                green: 255,
                blue: 255
            }
        }],
        Color = function (R, G, B) {
            var red,
                green,
                blue;
            if (R !== undefined) {
                if (G !== undefined && B !== undefined) {
                    this.setRed(parseInt(R));
                    this.setGreen(parseInt(G));
                    this.setBlue(parseInt(B));
                } else if (typeof R === 'string') {
                    this.fromHex(R);
                }
            } else {
                this.setRed(0);
                this.setGreen(0);
                this.setBlue(0);
            }
            return this;
        },
        ColorSpace = (function () {
            // Singleton tool for ColorSpace manipulation
            return {
                RGB: function (R, G, B) {
                    if (R === undefined || G === undefined || B === undefined) {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGB()"';
                    }
                    return {
                        'red': isNaN(parseInt(R)) ? 0 : parseInt(R),
                        'green': isNaN(parseInt(G)) ? 0 : parseInt(G),
                        'blue': isNaN(parseInt(B)) ? 0 : parseInt(B)
                    }
                },
                XYZ: function (X, Y, Z) {
                    if (X === undefined || Y === undefined || Z === undefined) {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZ()"';
                    }
                    return {
                        'x': isNaN(parseFloat(X)) ? 0.0 : parseFloat(X),
                        'y': isNaN(parseFloat(Y)) ? 0.0 : parseFloat(Y),
                        'z': isNaN(parseFloat(Z)) ? 0.0 : parseFloat(Z)
                    }
                },
                HSL: function (H, S, L) {
                    if (H === undefined || S === undefined || L === undefined) {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.HSL()"';
                    }
                    return {
                        'hue': isNaN(parseInt(H)) ? 0.0 : parseInt(H),
                        'sat': isNaN(parseInt(S)) ? 0.0 : parseInt(S),
                        'lig': isNaN(parseInt(L)) ? 0.0 : parseInt(L)
                    }
                },
                Lab: function (L, a, b) {
                    if (L === undefined || a === undefined || b === undefined) {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.Lab()"';
                    }
                    return {
                        'L': isNaN(parseFloat(L)) ? 0.0 : parseFloat(L),
                        'a': isNaN(parseFloat(a)) ? 0.0 : parseFloat(a),
                        'b': isNaN(parseFloat(b)) ? 0.0 : parseFloat(b)
                    }
                },
                RGBtoXYZ: function (R, G, B) {
                    var RGB,
                        red,
                        green,
                        blue;

                    if (R !== undefined && G !== undefined && B !== undefined) {
                        RGB = new this.RGB(R, G, B);
                    } else if (R !== undefined && typeof R === 'object' && R.red !== undefined && R.green !== undefined && R.blue !== undefined) {
                        RGB = new this.RGB(R.red, R.green, R.blue);
                    } else {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoXYZ()".';
                    }
                    red = parseFloat(RGB.red / 255); // R [0::255] as %
                    green = parseFloat(RGB.green / 255); // G [0::255] as %
                    blue = parseFloat(RGB.blue / 255); // B [0::255] as %

                    if (red > 0.04045) {
                        red = Math.pow((( red + 0.055) / 1.055), 2.4);
                    } else {
                        red /= 12.92;
                    }
                    red *= 100;
                    if (green > 0.04045) {
                        green = Math.pow(((green + 0.055) / 1.055), 2.4);
                    } else {
                        green /= 12.92;
                    }
                    green *= 100;
                    if (blue > 0.04045) {
                        blue = Math.pow(((blue + 0.055) / 1.055), 2.4);
                    } else {
                        blue /= 12.92;
                    }
                    blue *= 100;

                    return new this.XYZ(red * 0.4124 + green * 0.3576 + blue * 0.1805, red * 0.2126 + green * 0.7152 + blue * 0.0722, red * 0.0193 + green * 0.1192 + blue * 0.9505);
                },
                XYZtoRGB: function (X, Y, Z) {
                    var XYZ,
                        x,
                        y,
                        z,
                        red,
                        green,
                        blue;

                    if (X !== undefined && Y !== undefined && Z !== undefined) {
                        XYZ = new this.XYZ(X, Y, Z);
                    } else if (X !== undefined && typeof X === 'object' && X.x !== undefined && X.y !== undefined && X.z !== undefined) {
                        XYZ = new this.XYZ(X.x, X.y, X.z);
                    } else {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZtoRGB()".';
                    }

                    x = XYZ.x / 100, // x [0::95.047]
                    y = XYZ.y / 100, // y [0::100.000]
                    z = XYZ.z / 100, // z [0::108.883]
                    red = x * 3.2406 + y * -1.5372 + z * -0.4986,
                    green = x * -0.9689 + y * 1.8758 + z * 0.0415,
                    blue = x * 0.0557 + y * -0.2040 + z * 1.0570;

                    if (red > 0.0031308) {
                        red = 1.055 * (Math.pow(red, (1 / 2.4))) - 0.055;
                    } else {
                        red *= 12.92;
                    }
                    red *= 255;
                    if (green > 0.0031308) {
                        green = 1.055 * (Math.pow(green, (1 / 2.4))) - 0.055;
                    } else {
                        green *= 12.92;
                    }
                    green *= 255;
                    if (blue > 0.0031308) {
                        blue = 1.055 * (Math.pow(blue, (1 / 2.4))) - 0.055;
                    } else {
                        blue *= 12.92;
                    }
                    blue *= 255;

                    return new this.RGB(Math.round(red), Math.round(green), Math.round(blue))
                },
                RGBtoHSL: function(R, G, B) {
                    var RGB,
                        red,
                        green,
                        blue;

                    if (R !== undefined && G !== undefined && B !== undefined) {
                        RGB = new this.RGB(R, G, B);
                    } else if (R !== undefined && typeof R === 'object' && R.red !== undefined && R.green !== undefined && R.blue !== undefined) {
                        RGB = new this.RGB(R.red, R.green, R.blue);
                    } else {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoXYZ()".';
                    }

                    red = RGB.red / 255;
                    green = RGB.green / 255;
                    blue = RGB.blue / 255;

                    var max = Math.max(red, green, blue),
                        min = Math.min(red, green, blue),
                        H,
                        S,
                        L = (max + min) / 2;

                    if (max == min) {
                        // achromatic
                        H = S = 0;
                    } else {
                        var d = max - min;
                        S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case red:
                                H = (green - blue) / d + (green < blue ? 6 : 0);
                                break;
                            case green:
                                H = (blue - red) / d + 2;
                                break;
                            case blue:
                                H = (red - green) / d + 4;
                                break;
                        }
                        H /= 6;
                    }

                    return new this.HSL(Math.floor(H * 360), Math.floor(S * 100), Math.floor(L * 100));
                },
                XYZtoLab: function (X, Y, Z) {
                    var XYZ,
                        x,
                        y,
                        z;

                    if (X !== undefined && Y !== undefined && Z !== undefined) {
                        XYZ = new this.XYZ(X, Y, Z);
                    } else if (X !== undefined && typeof X === 'object' && X.x !== undefined && X.y !== undefined && X.z !== undefined) {
                        XYZ = new this.XYZ(X.x, X.y, X.z);
                    } else {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZtoLab()".';
                    }

                    x = XYZ.x / 95.047;
                    y = XYZ.y / 100.000;
                    z = XYZ.z / 108.883;

                    if (x > 0.008856) {
                        x = Math.pow(x,  (1 / 3));
                    } else {
                        x = (7.787 * x) + 16 / 116;
                    }
                    if (y > 0.008856) {
                        y = Math.pow(y,  (1 / 3));
                    } else {
                        y = (7.787 * y) + 16 / 116;
                    }
                    if (z > 0.008856) {
                        z = Math.pow(z,  (1 / 3));
                    } else{
                        z = (7.787 * z) + 16 / 116;
                    }

                    return new this.Lab((116 * y) - 16, 500 * (x - y), 200 * (y - z));
                },
                LabtoXYZ: function (L, a, b) {
                    var Lab,
                        X,
                        Y,
                        Z;

                    if (L !== undefined && a !== undefined && b !== undefined) {
                        Lab = new this.Lab(L, a, b);
                    } else if (L !== undefined && typeof L === 'object' && L.L !== undefined && L.a !== undefined && L.b !== undefined) {
                        Lab = new this.Lab(L.L, L.a, L.b);
                    } else {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.LabtoXYZ()".';
                    }

                    Y = (Lab.L + 16) / 116;
                    X = Lab.a / 500 + Y;
                    Z = Y - Lab.b / 200;

                    if (Math.pow(Y, 3) > 0.008856) {
                        Y = Math.pow(Y, 3);
                    } else {
                        Y = (Y - 16 / 116) / 7.787;
                    }
                    if (Math.pow(X, 3) > 0.008856) {
                        X = Math.pow(X, 3);
                    } else {
                        X = (X - 16 / 116) / 7.787;
                    }
                    if (Math.pow(Z, 3) > 0.008856) {
                        Z = Math.pow(Z, 3);
                    } else {
                        Z = (Z - 16 / 116) / 7.787;
                    }

                    return new this.XYZ(X * 95.047, Y * 100.000, Z * 108.883);
                },
                RGBtoLab: function (R, G, B) {
                    if (R === undefined || G === undefined || B === undefined) {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoLab()"';
                    }
                    return this.XYZtoLab(this.RGBtoXYZ(R, G, B));
                },
                LabtoRGB: function (L, a, b) {
                    if (L === undefined || a === undefined || b === undefined) {
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.LabtoRGB()"';
                    }
                    return this.XYZtoRGB(this.LabtoXYZ(L, a, b));
                }
            }
        })();

    Color.prototype = {
        fromHex: function (hex) {
            hex = String(hex || '');
            if (hex.length > 0) {
                if (hex[0] === '#') {
                    hex = hex.slice(1);
                }
                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                var red = parseInt(hex.slice(0, 2), 16),
                    green = parseInt(hex.slice(2, 4), 16),
                    blue = parseInt(hex.slice(4, 6), 16);

                this.setRed(isNaN(red) ? 0 : red);
                this.setGreen(isNaN(green) ? 0 : green);
                this.setBlue(isNaN(blue) ? 0 : blue);
            } else {
                this.setRed(0);
                this.setGreen(0);
                this.setBlue(0);
            }
            return this;
        },
        setRed: function (R) {
            if (R !== undefined) {
                this.red = Math.min(255, Math.max(0, parseInt(R)));
            }
            return this;
        },
        getRed: function () {
            return this.red;
        },
        setGreen: function (G) {
            if (G !== undefined) {
                this.green = Math.min(255, Math.max(0, parseInt(G)));
            }
            return this;
        },
        getGreen: function () {
            return this.green;
        },
        setBlue: function (B) {
            if (B !== undefined) {
                this.blue = Math.min(255, Math.max(0, parseInt(B)));
            }
            return this;
        },
        getBlue: function () {
            return this.blue;
        },
        toString: function (mode) {
            var colorString = '';
            switch (mode) {
                case 'rgb':
                    colorString = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
                    break;
                case 'rgba':
                    colorString = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', 1)';
                    break;
                case 'hsl':
                    var HSL = ColorMix.ColorSpace.RGBtoHSL(this.red, this.green, this.blue);
                    colorString = 'hsl(' +  HSL.hue + ', ' + HSL.sat + '%, ' + HSL.lig + '%)';
                    break;
                case 'hsla':
                    var HSL = ColorMix.ColorSpace.RGBtoHSL(this.red, this.green, this.blue);
                    colorString = 'hsla(' +  HSL.hue + ', ' + HSL.sat + '%, ' + HSL.lig + '%, 1)';
                    break;
                case 'hex':
                default:
                    colorString = '#' + ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue).toString(16).slice(1);
                    break;
            }
            return colorString;
        },
        useAsBackground: function (selector) {
            selector = String(selector);
            if (selector.length > 0) {
                if (window.jQuery !== undefined) {
                    window.jQuery(selector).css('background-color', 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')');
                } else {
                    var elts,
                        i;
                    if (typeof selector === 'string') {
                        switch (selector[0]) {
                            case '#':
                                elts = document.getElementById(selector);
                                break;
                            case '.':
                                if (document.getElementsByClassName) {
                                    elts = document.getElementsByClassName(selector);
                                } else {
                                    elts = [];
                                    var DOMelts = document.getElementsByTagName('*');
                                    i = DOMelts.length;
                                    while (i--) {
                                        if (DOMelts[i].className === selector.slice(1)) {
                                            elts.push(DOMelts[i]);
                                        }
                                    }
                                }
                                break;
                            default:
                                elts = document.getElementsByTagName(selector);
                                break;
                        }
                    }
                    i = elts.length;
                    while (i--) {
                        elts[i].style['background-color'] = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
                    }
                }
            }
            return this;
        },
        useAsColor: function (selector) {
            selector = String(selector);
            if (selector.length > 0) {
                if (window.jQuery !== undefined) {
                    window.jQuery(selector).css('color', 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')');
                } else {
                    var elts,
                        i;
                    if (typeof selector === 'string') {
                        switch (selector[0]) {
                            case '#':
                                elts = document.getElementById(selector);
                                break;
                            case '.':
                                if (document.getElementsByClassName) {
                                    elts = document.getElementsByClassName(selector);
                                } else {
                                    elts = [];
                                    var DOMelts = document.getElementsByTagName('*');
                                    i = DOMelts.length;
                                    while (i--) {
                                        if (DOMelts[i].className === selector.slice(1)) {
                                            elts.push(DOMelts[i]);
                                        }
                                    }
                                }
                                break;
                            default:
                                elts = document.getElementsByTagName(selector);
                                break;
                        }
                    }
                    i = elts.length;
                    while (i--) {
                        elts[i].style['color'] = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
                    }
                }
            }
            return this;
        }
    }

    return {
        'Color': Color,
        'ColorSpace': ColorSpace,
        'mix': function (colors, percents) {
            if (colors === undefined || Object.prototype.toString.call(colors) !== '[object Array]') {
                throw '"ColorMix.mix()" first parameter should be an array of ColorMix.Color objects';
            }
            if (percents === undefined) {
                percents = [];
                var i = colors.length;
                while (i-- > 0) {
                    percents[i] = 100 / colors.length;
                }
            } else if (Object.prototype.toString.call(percents) !== '[object Array]') {
                throw '"ColorMix.mix()" second parameter should be an array of percents. (nnumber values)';
            }
            if (colors.length !== percents.length) {
                throw '"ColorMix.mix()" parameters should be arrays of the same size !';
            }
            var i = colors.length,
                L = 0,
                a = 0,
                b = 0,
                P = 0,
                RGB;
            while (i--) {
                if (!(colors[i] instanceof ColorMix.Color)) {
                    throw '"ColorMix.mix()" color at index: ' + i + ' should be an instance of ColorMix.Color() object !';
                }
                P += percents[i];
                if (P > 100) {
                    throw 'Invalid "ColorMix.mix()" second parameter: the sum of all the percents array items should be 100.';
                }
                var Lab = ColorMix.ColorSpace.RGBtoLab(colors[i].getRed(), colors[i].getGreen(), colors[i].getBlue());
                L += Lab.L * percents[i] / 100;
                a += Lab.a * percents[i] / 100;
                b += Lab.b * percents[i] / 100;
            }
            if (P !== 100) {
                throw 'Invalid "ColorMix.mix()" second parameter: the sum of all the percents array items should be 100.';
            }
            RGB = ColorMix.ColorSpace.LabtoRGB(L, a, b);
            return new ColorMix.Color(RGB.red, RGB.green, RGB.blue);
        },
        'setGradient': function (newGradient) {
            if (newGradient !== undefined && Object.prototype.toString.call(newGradient) === '[object Array]') {
                _gradient = newGradient;
            }
            return this;
        },
        'getGradient': function () {
            return _gradient;
        },
        'blend': function (reference) {
            if (reference === undefined) {
                throw 'Missing "ColorMix.blend()" first parameter.';
            }

            reference = parseInt(reference);
            if (isNaN(reference)) {
                throw 'Invalid "ColorMix.blend()" first parameter: you should provide a number.';
            }

            var i,
                l = _gradient.length,
                previous = _gradient[0],
                next = _gradient[l - 1],
                C1,
                C2;

            // Get the color range (the closest steps of reference in the gradient)
            if (reference <= previous.reference) {
                return new ColorMix.Color(previous.color.red, previous.color.green, previous.color.blue);
            } else if (reference >= next.reference) {
                return new ColorMix.Color(next.color.red, next.color.green, next.color.blue);
            }

            while (l--) {
                var step = _gradient[l];
                if (step.reference <= reference && step.reference > previous.reference) {
                    previous = step;
                } else if (step.reference >= reference && step.reference < next.reference) {
                    next = step;
                }
            }

            C1 = new ColorMix.Color(previous.color.red, previous.color.green, previous.color.blue);
            C2 = new ColorMix.Color(next.color.red, next.color.green, next.color.blue);

            // Calculate percentages
            previous.percent = Math.abs(100 / ((previous.reference - next.reference) / (reference - next.reference)));
            next.percent = 100 - previous.percent;

            // Mix the colors on LAB Color Space
            // Then convert it to RGB again
            // Returns a ColorMix.Color instance.
            return new ColorMix.mix([C1, C2], [previous.percent, next.percent]);
        }
    }
})();
