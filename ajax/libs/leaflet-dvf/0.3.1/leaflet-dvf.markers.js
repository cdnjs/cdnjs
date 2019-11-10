/*
 @preserve Leaflet Data Visualization Framework, a JavaScript library for creating thematic maps using Leaflet
 (c) 2013-2015, Scott Fairgrieve, HumanGeo
 */;/*
 * Class for interpolating values along a line using a linear equation
 */
(function (window, document, undefined) {
    L.LinearFunction = L.Class.extend({
        options: {
            constrainX: false
        },

        initialize: function (minPoint, maxPoint, options) {
            this.setOptions(options);
            this.setRange(minPoint, maxPoint);
        },

        _calculateParameters: function (minPoint, maxPoint) {
            if (this._xRange === 0) {
                this._slope = 0;
                this._b = minPoint.y;
            }
            else {
                this._slope = (maxPoint.y - minPoint.y) / this._xRange;
                this._b = minPoint.y - this._slope * minPoint.x;
            }
        },

        _arrayToPoint: function (array) {
            return {
                x: array[0],
                y: array[1]
            };
        },

        setOptions: function (options) {
            L.Util.setOptions(this, options);

            this._preProcess = this.options.preProcess;
            this._postProcess = this.options.postProcess;
        },

        getBounds: function () {
            var minX = Math.min(this._minPoint.x, this._maxPoint.x);
            var maxX = Math.max(this._minPoint.x, this._maxPoint.x);
            var minY = Math.min(this._minPoint.y, this._maxPoint.y);
            var maxY = Math.max(this._minPoint.y, this._maxPoint.y);

            return [new L.Point(minX, minY), new L.Point(maxX, maxY)];
        },

        setRange: function (minPoint, maxPoint) {
            minPoint = minPoint instanceof Array ? this._arrayToPoint(minPoint) : minPoint;
            maxPoint = maxPoint instanceof Array ? this._arrayToPoint(maxPoint) : maxPoint;

            this._minPoint = minPoint;
            this._maxPoint = maxPoint;
            this._xRange = maxPoint.x - minPoint.x;
            this._yRange = maxPoint.y - minPoint.y;

            this._calculateParameters(minPoint, maxPoint);

            return this;
        },

        setMin: function (point) {
            this.setRange(point, this._maxPoint);

            return this;
        },

        setMax: function (point) {
            this.setRange(this._minPoint, point);

            return this;
        },

        setPreProcess: function (preProcess) {
            this._preProcess = preProcess;

            return this;
        },

        setPostProcess: function (postProcess) {
            this._postProcess = postProcess;

            return this;
        },

        constrainX: function (x) {
            x = Number(x);

            if (this.options.constrainX) {
                x = Math.max(x, this._minPoint.x);
                x = Math.min(x, this._maxPoint.x);
            }

            return x;
        },

        evaluate: function (x) {
            var y;

            if (this._preProcess) {
                x = this._preProcess(x);
            }

            // Call toFixed to ensure that both numbers being added are using the same precision
            y = Number((this._slope * x).toFixed(6)) + Number(this._b.toFixed(6));

            if (this._postProcess) {
                y = this._postProcess(y, x);
            }

            return y;
        },

        random: function () {
            var randomX = Math.random() * this._xRange + this._minPoint.x;

            return this.evaluate(randomX);
        },

        sample: function (count) {
            count = Math.max(count, 2);

            var segmentCount = count - 1;
            var segmentSize = this._xRange / segmentCount;
            var x = this._minPoint.x;
            var yValues = [];

            while (x <= this._maxPoint.x) {
                yValues.push(this.evaluate(x));

                x += segmentSize;
            }

            return yValues;
        },

        evaluatePercent: function (percent) {
            return this.getPointAtPercent(percent).y;
        },

        getPointAtPercent: function (percent) {
            var percentOffsetX = this._xRange * percent;
            var percentOffsetY = this._yRange * percent;
            var x = this._minPoint.x + percentOffsetX;
            var y = this._minPoint.y + percentOffsetY;

            return new L.Point(x, y);
        },

        samplePoints: function (count) {
            count = Math.max(count, 2);

            var segmentCount = count - 1;
            var segmentSize = this._xRange / segmentCount;
            var x = this._minPoint.x;
            var points = [];

            while (x <= this._maxPoint.x) {
                points.push(new L.Point(x, this.evaluate(x)));

                x += segmentSize;
            }

            return points;
        },

        getIntersectionPoint: function (otherFunction) {
            var point = null;

            if (this._slope !== otherFunction._slope) {
                var x = (this._b - otherFunction._b) / (otherFunction._slope - this._slope);
                var y = this.evaluate(x);

                point = new L.Point(x, y);
            }

            return point;
        }

    });

    /*
     * A linear function that outputs a color value - used to vary color proportionally to some data property value
     */
    L.ColorFunction = L.LinearFunction.extend({
        options: {
            alpha: 1.0,
            includeAlpha: false
        },

        initialize: function (minPoint, maxPoint, options) {
            L.Util.setOptions(this, options);

            // Order of output parts (e.g., ['r','g','b'])
            this._parts = [];

            // Part of the output that's dynamic (e.g. 'r')
            this._dynamicPart = null;
            this._outputPrecision = 0;

            // Output prefix (e.g. rgb, hsl, etc.)
            this._prefix = null;

            // Override this as necessary
            this._formatOutput = function (y) {
                return y.toFixed(this._outputPrecision);

            };

            this._mapOutput = function (parts) {
                var outputParts = [];

                for (var i = 0, len = this._parts.length; i < len; ++i) {
                    var part = this._parts[i];
                    outputParts.push(parts[part]);
                }

                if (this.options.includeAlpha) {
                    outputParts.push(this.options.alpha);
                }

                return outputParts;
            };

            this._getColorString = function (y) {
                y = this._formatOutput(y);

                this.options[this._dynamicPart] = y;

                var parts = this._mapOutput(this.options);

                return this._writeColor(this._prefix, parts);
            };

            this._writeColor = function (prefix, parts) {
                if (this.options.includeAlpha) {
                    prefix += 'a';
                }

                return prefix + '(' + parts.join(',') + ')';
            };

            options = L.extend({}, this.options);

            var postProcess = function (y) {
                if (options && options.postProcess) {
                    y = options.postProcess.call(this, y);
                }

                var colorString = this._getColorString(y);

                if (((L.Browser.ie) && colorString.indexOf('hsl') > -1) || options.rgb) {
                    colorString = L.hslColor(colorString).toRGBString();
                }

                return colorString;
            };

            L.LinearFunction.prototype.initialize.call(this, minPoint, maxPoint, {
                preProcess: this.options.preProcess,
                postProcess: postProcess
            });
        }
    });

    L.HSLColorFunction = L.ColorFunction.extend({
        initialize: function (minPoint, maxPoint, options) {
            L.ColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._parts = ['outputHue', 'outputSaturation', 'outputLuminosity'];
            this._prefix = 'hsl';
            this._outputPrecision = 2;
        }
    });

    L.RGBColorFunction = L.ColorFunction.extend({
        initialize: function (minPoint, maxPoint, options) {
            L.ColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._parts = ['outputRed', 'outputBlue', 'outputGreen'];
            this._prefix = 'rgb';
            this._outputPrecision = 0;
        }
    });

    L.RGBRedFunction = L.LinearFunction.extend({

        options: {
            outputGreen: 0,
            outputBlue: 0
        },

        initialize: function (minPoint, maxPoint, options) {
            L.RGBColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._dynamicPart = 'outputRed';
        }
    });

    /*
     * 
     */
    L.RGBBlueFunction = L.LinearFunction.extend({

        options: {
            outputRed: 0,
            outputGreen: 0
        },

        initialize: function (minPoint, maxPoint, options) {
            L.RGBColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._dynamicPart = 'outputBlue';
        }
    });

    /*
     * 
     */
    L.RGBGreenFunction = L.LinearFunction.extend({

        options: {
            outputRed: 0,
            outputBlue: 0
        },

        initialize: function (minPoint, maxPoint, options) {
            L.RGBColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._dynamicPart = 'outputGreen';
        }
    });

    /*
     * Produces a gradient between two RGB colors.  The colors are specified as rgb arrays (e.g. [255, 0, 255]) or rgb strings
     */
    L.RGBColorBlendFunction = L.LinearFunction.extend({
        initialize: function (minX, maxX, rgbMinColor, rgbMaxColor) {
            rgbMinColor = new L.RGBColor(rgbMinColor);
            rgbMaxColor = new L.RGBColor(rgbMaxColor);
            var red1 = rgbMinColor.r();
            var red2 = rgbMaxColor.r();
            var green1 = rgbMinColor.g();
            var green2 = rgbMaxColor.g();
            var blue1 = rgbMinColor.b();
            var blue2 = rgbMaxColor.b();

            this._minX = minX;
            this._maxX = maxX;
            this._xRange = maxX - minX;
            this._minPoint = new L.Point(minX, rgbMinColor);
            this._maxPoint = new L.Point(maxX, rgbMaxColor);

            this._redFunction = new L.LinearFunction(new L.Point(minX, red1), new L.Point(maxX, red2));
            this._greenFunction = new L.LinearFunction(new L.Point(minX, green1), new L.Point(maxX, green2));
            this._blueFunction = new L.LinearFunction(new L.Point(minX, blue1), new L.Point(maxX, blue2));
        },

        getBounds: function () {
            var redBounds = this._redFunction.getBounds();
            var greenBounds = this._greenFunction.getBounds();
            var blueBounds = this._blueFunction.getBounds();

            var minY = Math.min(redBounds[0].y, greenBounds[0].y, blueBounds[0].y);
            var maxY = Math.max(redBounds[0].y, greenBounds[0].y, blueBounds[0].y);

            return [new L.Point(redBounds[0].x, minY), new L.Point(redBounds[1].x, maxY)];
        },

        evaluate: function (x) {
            return new L.RGBColor([this._redFunction.evaluate(x), this._greenFunction.evaluate(x), this._blueFunction.evaluate(x)]).toRGBString();
        }
    });


    /*
     * Class for varying the hue linearly and producing an HSL color value
     */
    L.HSLHueFunction = L.HSLColorFunction.extend({

        options: {
            outputSaturation: '100%',
            outputLuminosity: '50%'
        },

        initialize: function (minPoint, maxPoint, options) {
            L.HSLColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._dynamicPart = 'outputHue';
        }
    });

    /*
     * Class for varying the saturation linearly and producing an HSL color value
     */
    L.HSLSaturationFunction = L.LinearFunction.extend({

        options: {
            outputHue: 0,
            outputLuminosity: '50%'
        },

        initialize: function (minPoint, maxPoint, options) {
            L.HSLColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._formatOutput = function (y) {
                return (y * 100).toFixed(this._outputPrecision) + '%';
            };

            this._dynamicPart = 'outputSaturation';
        }
    });

    /*
     * Class for varying the luminosity linearly and producing an HSL color value
     */
    L.HSLLuminosityFunction = L.LinearFunction.extend({

        options: {
            outputHue: 0,
            outputSaturation: '100%'
        },

        initialize: function (minPoint, maxPoint, options) {
            L.HSLColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);

            this._formatOutput = function (y) {
                return (y * 100).toFixed(this._outputPrecision) + '%';
            };

            this._dynamicPart = 'outputLuminosity';
        }
    });

    /*
     * Produces a gradient between two HSL colors
     */
    L.HSLColorBlendFunction = L.LinearFunction.extend({
        initialize: function (minX, maxX, hslMinColor, hslMaxColor) {
            hslMinColor = new L.HSLColor(hslMinColor);
            hslMaxColor = new L.HSLColor(hslMaxColor);
            var h1 = hslMinColor.h();
            var h2 = hslMaxColor.h();
            var s1 = hslMinColor.s();
            var s2 = hslMaxColor.s();
            var l1 = hslMinColor.l();
            var l2 = hslMaxColor.l();

            this._minX = minX;
            this._maxX = maxX;

            this._hueFunction = new L.LinearFunction(new L.Point(minX, h1), new L.Point(maxX, h2));
            this._saturationFunction = new L.LinearFunction(new L.Point(minX, s1), new L.Point(maxX, s2));
            this._luminosityFunction = new L.LinearFunction(new L.Point(minX, l1), new L.Point(maxX, l2));
        },

        getBounds: function () {
            var hBounds = this._hueFunction.getBounds();
            var sBounds = this._saturationFunction.getBounds();
            var lBounds = this._luminosityFunction.getBounds();

            var minY = Math.min(hBounds[0].y, sBounds[0].y, lBounds[0].y);
            var maxY = Math.max(hBounds[0].y, sBounds[0].y, lBounds[0].y);

            return [new L.Point(hBounds[0].x, minY), new L.Point(hBounds[1].x, maxY)];
        },

        evaluate: function (x) {
            return new L.HSLColor([this._hueFunction.evaluate(x), this._saturationFunction.evaluate(x), this._luminosityFunction.evaluate(x)]).toHSLString();
        }
    });

    /*
     * Allows you to combine multiple linear functions into a single linear function
     */
    L.PiecewiseFunction = L.LinearFunction.extend({
        options: {
            constrainX: true
        },

        initialize: function (functions, options) {

            L.Util.setOptions(this, options);

            this._functions = functions;

            var startPoint;
            var endPoint;

            startPoint = functions[0].getBounds()[0];
            endPoint = functions[functions.length - 1].getBounds()[1];

            L.LinearFunction.prototype.initialize.call(this, startPoint, endPoint, {
                preProcess: this.options.preProcess,
                postProcess: this.options.postProcess
            });
        },

        _getFunction: function (x) {
            var bounds;
            var startPoint;
            var endPoint;
            var currentFunction;

            if (x < this._minPoint.x) {
                currentFunction = this._functions[0];
            }
            else if (x >= this._maxPoint.x) {
                currentFunction = this._functions[this._functions.length - 1];
            }
            else {
                for (var index = 0; index < this._functions.length; ++index) {
                    currentFunction = this._functions[index];
                    bounds = currentFunction.getBounds();

                    startPoint = bounds[0];
                    endPoint = bounds[1];

                    if (x >= startPoint.x && x < endPoint.x) {
                        break;
                    }
                }
            }

            return currentFunction;
        },

        evaluate: function (x) {
            var currentFunction;
            var y = null;

            x = this.constrainX(x);

            if (this._preProcess) {
                x = this._preProcess(x);
            }

            currentFunction = this._getFunction(x);

            if (currentFunction) {
                y = currentFunction.evaluate(x);

                if (this._postProcess) {
                    y = this._postProcess(y, x);
                }
            }

            return y;
        }
    });

    /*
     * Specific an array of x values to break on along with a set of colors (breaks.length - 1)
     */
    L.ColorClassFunction = L.PiecewiseFunction.extend({
        options: {
            interpolate: false
        },

        initialize: function (classBreaks, colors, options) {
            var functions = [];
            var colorFunction;

            L.Util.setOptions(this, options);

            for (var i = 0, len = classBreaks.length - 1; i < len; ++i) {
                var start = classBreaks[i],
                    end = classBreaks[i + 1],
                    startColor = colors[i],
                    endColor = this.options.interpolate ? colors[Math.min(colors.length - 1, i + 1)] : colors[i];

                colorFunction = new L.RGBColorBlendFunction(start, end, startColor, endColor);

                functions.push(colorFunction);
            }

            L.PiecewiseFunction.prototype.initialize.call(this, functions);
        }
    });

    L.CustomColorFunction = L.PiecewiseFunction.extend({
        options: {
            interpolate: true
        },

        initialize: function (minX, maxX, colors, options) {
            L.setOptions(this, options);

            var range = maxX - minX;
            var count = this.options.interpolate ? colors.length - 1 : colors.length;
            var xRange = range / count;
            var functions = [];
            var colorFunction;
            var next;

            var func = new L.LinearFunction([0, minX], [count, maxX]);

            for (var i = 0; i < count; ++i) {
                next = i + 1;
                //colorFunction = this.options.interpolate ? new L.RGBColorBlendFunction(minX + xRange * i, minX + xRange * next, colors[i], colors[next]) : new L.RGBColorBlendFunction(minX + xRange * i, minX + xRange * next, colors[i], colors[i]);
                colorFunction = this.options.interpolate ? new L.RGBColorBlendFunction(func.evaluate(i), func.evaluate(next), colors[i], colors[next]) : new L.RGBColorBlendFunction(func.evaluate(i), func.evaluate(next), colors[i], colors[i]);
                functions.push(colorFunction);
            }

            func = null;

            L.PiecewiseFunction.prototype.initialize.call(this, functions);
        }
    });


    L.CategoryFunction = L.Class.extend({
        initialize: function (categoryMap, options) {

            L.Util.setOptions(this, options);

            this._categoryKeys = Object.keys(categoryMap);
            this._categoryMap = categoryMap;

            this._preProcess = this.options.preProcess;
            this._postProcess = this.options.postProcess;
        },

        evaluate: function (x) {
            var y;

            if (this._preProcess) {
                x = this._preProcess(x);
            }

            y = this._categoryMap[x];

            if (this._postProcess) {
                y = this._postProcess(y, x);
            }

            return y;
        },

        getCategories: function () {
            return this._categoryKeys;
        }
    });

    L.categoryFunction = function (categoryMap, options) {
        return new L.CategoryFunction(categoryMap, options);
    };
    
}(window, document));;// indexOf doesn't work in IE 8 and below, so add this method if it doesn't exist
// Copied from:  http://stackoverflow.com/questions/1744310/how-to-fix-array-indexof-in-javascript-for-ie-browsers
(function (window, document, undefined) {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }

    // Add the keys method to the Object class if it doesn't exist
    // Object.keys is supported in newer browsers IE9+, etc.
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = ['toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                var result, prop, i;

                if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) {
                    throw new TypeError('Object.keys called on non-object');
                }

                result = [];

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        })();
    }

    L.Util.guid = function () {
        var s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    L.Util.getProperty = function (obj, property, defaultValue) {
        return (property in obj) ? obj[property] : defaultValue;
    };

    L.Util.setFieldValue = function (record, fieldName, value) {
        var keyParts = fieldName.split('.');
        var pointer = record;
        var part;

        for (var i = 0, len = keyParts.length - 1; i < len; ++i) {
            part = keyParts[i];
            pointer[part] = pointer[part] || {};
            pointer = pointer[part];
        }

        pointer[keyParts[keyParts.length - 1]] = value;
    };

    L.Util.getFieldValue = function (record, fieldName) {

        var value = null;

        if (fieldName) {
            var parts = fieldName.split('.');
            var valueField = record;
            var part;
            var searchParts;
            var searchKey;
            var searchValue;
            var testObject;
            var searchPart;
            var bracketIndex = -1;
            var testValue;

            for (var partIndex = 0, len = parts.length; partIndex < len; ++partIndex) {
                part = parts[partIndex];

                bracketIndex = part.indexOf('[');

                if (bracketIndex > -1) {

                    searchPart = part.substring(bracketIndex);
                    part = part.substring(0, bracketIndex);

                    searchPart = searchPart.replace('[', '').replace(']', '');

                    searchParts = searchPart.split('=');
                    searchKey = searchParts[0];
                    searchValue = searchParts[1];

                    valueField = valueField[part];

                    for (var valueIndex = 0; valueIndex < valueField.length; ++valueIndex) {
                        testObject = valueField[valueIndex];

                        testValue = testObject[searchKey];

                        if (testValue && testValue === searchValue) {
                            valueField = testObject;
                        }
                    }
                }
                else if (valueField && valueField.hasOwnProperty(part)) {
                    valueField = valueField[part];
                }
                else {
                    valueField = null;
                    break;
                }
            }

            value = valueField;
        }
        else {
            value = record;
        }

        return value;
    };

    L.Util.getNumericRange = function (records, fieldName) {
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;

        for (var index in records) {
            if (records.hasOwnProperty(index)) {
                var record = records[index];
                var value = L.Util.getFieldValue(record, fieldName);
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
        }

        return [min, max];
    };

    L.Util.pointToGeoJSON = function () {
        var feature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [this._latlng[1], this._latlng[0]]
            },
            properties: {}
        };

        var key;

        for (key in this.options) {
            if (this.options.hasOwnProperty(key)) {
                var value = this.options[key];

                if (typeof(value) !== 'function') {
                    feature.properties[key] = value;
                }
            }
        }

        for (key in legendOptions) {
            if (legendOptions.hasOwnProperty(key)) {
                var categoryOptions = legendOptions[key];
                var displayName = categoryOptions.displayName || key;

                var legendElement = L.DomUtil.create('div', 'data-layer-legend', legend);
                var legendBox = L.DomUtil.create('div', 'legend-box', legendElement);

                L.DomUtil.create('div', 'key', legendElement).innerHTML = displayName;
                L.StyleConverter.applySVGStyle(legendBox, categoryOptions);
            }
        }

        return feature;
    };

    L.Util.updateLayer = function (layer, updateFunction) {
        if (layer.eachLayer && !(layer instanceof L.FeatureGroup)) {
            layer.eachLayer(function (layer) {
                L.Util.updateLayer(layer, updateFunction);
            });
        }
        else {
            updateFunction.call(this, layer);
        }
    };

    L.CategoryLegend = L.Class.extend({
        initialize: function (options) {
            L.setOptions(this, options);
        },

        generate: function (options) {
            options = options || {};

            var container = document.createElement('div');
            var legend = L.DomUtil.create('div', 'legend', container);
            var className = options.className;
            var legendOptions = this.options;

            if (className) {
                L.DomUtil.addClass(legend, className);
            }

            if (options.title) {
                L.DomUtil.create('div', 'legend-title', legend).innerHTML = options.title;
            }

            for (var key in legendOptions) {
                categoryOptions = legendOptions[key];

                var displayName = categoryOptions.displayName || key;

                var legendElement = L.DomUtil.create('div', 'data-layer-legend', legend);
                var legendBox = L.DomUtil.create('div', 'legend-box', legendElement);

                L.DomUtil.create('div', 'key', legendElement).innerHTML = displayName;
                L.StyleConverter.applySVGStyle(legendBox, categoryOptions);
            }

            return container.innerHTML;
        }
    });

    /*
     * Uses Leaflet's DivIcon class for adding a legend popup to data markers
     */
    L.LegendIcon = L.DivIcon.extend({
        initialize: function (fields, layerOptions, options) {
            var fragment = document.createDocumentFragment();
            var container = document.createElement('div', '', fragment);
            var legendContent = L.DomUtil.create('div', 'legend', container);
            var legendTitle = L.DomUtil.create('div', 'title', legendContent);
            var legendBox = L.DomUtil.create('div', 'legend-box', legendContent);
            var legendValues = L.DomUtil.create('div', 'legend-values', legendContent);
            var field;
            var title = layerOptions.title || layerOptions.name;

            if (title) {
                legendTitle.innerHTML = title;
            }

            for (var key in fields) {
                field = fields[key];
                L.DomUtil.create('div', 'key', legendValues).innerHTML = field.name || key;
                L.DomUtil.create('div', 'value', legendValues).innerHTML = field.value;
            }

            L.StyleConverter.applySVGStyle(legendBox, layerOptions);

            options.html = container.innerHTML;
            options.className = options.className || 'legend-icon';

            L.DivIcon.prototype.initialize.call(this, options);
        }
    });

    L.legendIcon = function (fields, layerOptions, options) {
        return new L.LegendIcon(fields, layerOptions, options);
    };

    L.GeometryUtils = {

        getName: function (geoJSON) {
            var name = null;

            if (geoJSON && geoJSON.features) {
                for (var index = 0; index < geoJSON.features.length; ++index) {
                    var feature = geoJSON.features[index];
                    if (feature.properties && feature.properties.name) {
                        name = feature.properties.name;
                        break;
                    }
                }
            }

            return name;
        },

        getGeoJSONLocation: function (geoJSON, record, locationTextField, recordToLayer) {
            var locationTextFunction = function (record) {
                return L.Util.getFieldValue(record, locationTextField);
            };

            if (locationTextField && (typeof locationTextField === 'function')) {
                locationTextFunction = locationTextField;
            }

            var geoJSONLayer = new L.GeoJSON(geoJSON, {
                pointToLayer: function (feature, latlng) {
                    var location = {
                        location: latlng,
                        text: locationTextFunction ? locationTextFunction(record) : [latlng.lat.toFixed(3), latlng.lng.toFixed(3)].join(', '),
                        center: latlng
                    };

                    return recordToLayer(location, record);
                }
            });

            var center = null;

            try {
                center = L.GeometryUtils.loadCentroid(geoJSON);
            }
            catch (ex) {
                console.log('Error loading centroid for ' + JSON.stringify(geoJSON));
            }

            return {
                location: geoJSONLayer,
                text: locationTextFunction ? locationTextFunction(record) : null,
                center: center
            };
        },

        // Merges a set of properties into the properties of each feature of a GeoJSON FeatureCollection
        mergeProperties: function (properties, featureCollection, mergeKey) {
            var features = featureCollection.features;
            var featureIndex = L.GeometryUtils.indexFeatureCollection(features, mergeKey);
            var property;
            var mergeValue;
            var newFeatureCollection = {
                type: 'FeatureCollection',
                features: []
            };

            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    property = properties[key];

                    mergeValue = property[mergeKey];

                    if (mergeValue) {
                        var feature = featureIndex[mergeValue];

                        for (var prop in property) {
                            feature.properties[prop] = property[prop];
                        }

                        newFeatureCollection.features.push(feature);
                    }
                }
            }

            return newFeatureCollection;
        },

        // Indexes a GeoJSON FeatureCollection using the provided key
        indexFeatureCollection: function (featureCollection, indexKey) {
            var features = featureCollection.features;
            var feature;
            var properties;
            var featureIndex = {};
            var value;

            for (var index = 0; index < features.length; ++index) {
                feature = features[index];

                properties = feature.properties;

                value = properties[indexKey];

                // If the value already exists in the index, then either create a GeometryCollection or append the
                // feature's geometry to the existing GeometryCollection
                if (value in featureIndex) {
                    var existingFeature = featureIndex[value];

                    if (existingFeature.geometry.type !== 'GeometryCollection') {
                        featureIndex[value] = {
                            type: 'Feature',
                            geometry: {
                                type: 'GeometryCollection',
                                geometries: [feature.geometry, existingFeature.geometry]
                            }
                        };
                    }
                    else {
                        existingFeature.geometry.geometries.push(feature.geometry);
                    }
                }
                else {
                    featureIndex[value] = feature;
                }
            }

            return featureIndex;
        },

        arrayToMap: function (array, fromKey, toKey) {
            var map = {};
            var item;
            var from;
            var to;

            for (var index = 0; index < array.length; ++index) {
                item = array[index];

                from = item[fromKey];

                to = toKey ? item[toKey] : item;

                map[from] = to;

            }

            return map;
        },

        arrayToMaps: function (array, mapLinks) {
            var map;
            var item;
            var from;
            var to;
            var maps = [];
            var mapLink;
            var fromKey;
            var toKey;

            for (var i = 0, len = mapLinks.length; i < len; ++i) {
                maps.push({});
            }

            for (var index = 0; index < array.length; ++index) {
                item = array[index];

                for (var keyIndex = 0; keyIndex < mapLinks.length; ++keyIndex) {
                    map = maps[keyIndex];
                    mapLink = mapLinks[keyIndex];

                    fromKey = mapLink.from;
                    toKey = mapLink.to;

                    from = item[fromKey];
                    to = toKey ? item[toKey] : item;

                    map[from] = to;
                }
            }

            return maps;
        },

        loadCentroid: function (feature) {
            var centroidLatLng = null;
            var centroid;
            var x, y;

            if (feature.geometry && feature.geometry.type === 'Point') {
                centroidLatLng = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
            }
            else if (typeof jsts !== 'undefined') {

                var parser = new jsts.io.GeoJSONParser();
                var jstsFeature = parser.read(feature);

                if (jstsFeature.getCentroid) {
                    centroid = jstsFeature.getCentroid();
                    x = centroid.coordinate.x;
                    y = centroid.coordinate.y;
                }
                else if (jstsFeature.features) {
                    var totalCentroidX = 0;
                    var totalCentroidY = 0;

                    for (var i = 0, len = jstsFeature.features.length; i < len; ++i) {
                        centroid = jstsFeature.features[i].geometry.getCentroid();

                        totalCentroidX += centroid.coordinate.x;
                        totalCentroidY += centroid.coordinate.y;
                    }

                    x = totalCentroidX / jstsFeature.features.length;
                    y = totalCentroidY / jstsFeature.features.length;
                }
                else {
                    centroid = jstsFeature.geometry.getCentroid();
                    x = centroid.coordinate.x;
                    y = centroid.coordinate.y;
                }

                centroidLatLng = new L.LatLng(y, x);

            }

            return centroidLatLng;
        },

        loadCentroids: function (dictionary) {
            var centroids = {};
            var feature;

            for (var key in dictionary) {
                feature = dictionary[key];
                centroids[key] = L.GeometryUtils.loadCentroid(feature);
            }

            return centroids;
        }
    };

    L.SVGPathBuilder = L.Class.extend({
        initialize: function (points, innerPoints, options) {
            this._points = points || [];
            this._innerPoints = innerPoints || [];

            L.setOptions(this, options);
        },

        options: {
            closePath: true
        },

        _getPathString: function (points, digits) {
            var pathString = '';

            if (points.length > 0) {

                var point = points[0];

                digits = digits !== null ? digits : 2;

                var startChar = 'M';
                var lineToChar = 'L';
                var closePath = 'Z';

                if (L.Browser.vml) {
                    digits = 0;
                    startChar = 'm';
                    lineToChar = 'l';
                    closePath = 'xe';
                }

                pathString = startChar + point.x.toFixed(digits) + ' ' + point.y.toFixed(digits);

                for (var index = 1; index < points.length; index++) {
                    point = points[index];
                    pathString += lineToChar + point.x.toFixed(digits) + ' ' + point.y.toFixed(digits);
                }

                if (this.options.closePath) {
                    pathString += closePath;
                }

            }

            return pathString;
        },

        addPoint: function (point, inner) {
            if (inner) {
                this._innerPoints.push(point);
            }
            else {
                this._points.push(point);
            }
        },

        build: function (digits) {
            digits = digits || this.options.digits;

            var pathString = this._getPathString(this._points, digits);

            if (this._innerPoints) {
                pathString += this._getPathString(this._innerPoints, digits);
            }

            return pathString;
        }
    });

    L.StyleConverter = {
        keyMap: {
            fillColor: {
                property: ['background-color'],
                valueFunction: function (value) {
                    return value;
                }
            },
            color: {
                property: ['color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'], //border
                valueFunction: function (value) {
                    return value;
                }
            },
            weight: {
                property: ['border-width'],
                valueFunction: function (value) {
                    return Math.ceil(value) + 'px';
                }
            },
            lineWeight: {
                property: ['border-width'],
                valueFunction: function (value) {
                    return Math.ceil(value) + 'px';
                }
            },
            stroke: {
                property: ['border-style'],
                valueFunction: function (value) {
                    return value === true ? 'solid' : 'none';
                }
            },
            dashArray: {
                property: ['border-style'],
                valueFunction: function (value) {
                    var style = 'solid';

                    if (value) {
                        style = 'dashed';
                    }

                    return style;
                }
            },
            barThickness: {
                property: ['height'],
                valueFunction: function (value) {
                    return value + 'px';
                }
            },
            radius: {
                property: ['height'],
                valueFunction: function (value) {
                    return 2 * value + 'px';
                }
            },
            radiusY: {
                property: ['height'],
                valueFunction: function (value) {
                    return 2 * value + 'px';
                }
            },
            fillOpacity: {
                property: ['opacity'],
                valueFunction: function (value) {
                    return value;
                }
            }
        },

        applySVGStyle: function (element, svgStyle, additionalKeys) {
            var keyMap = L.StyleConverter.keyMap;

            if (additionalKeys) {
                keyMap = L.Util.extend(keyMap, additionalKeys);
            }

            element.style.borderStyle = 'solid';

            for (var property in svgStyle) {
                L.StyleConverter.setCSSProperty(element, property, svgStyle[property], keyMap);
            }

            return element;
        },

        setCSSProperty: function (element, key, value, keyMap) {
            keyMap = keyMap || L.StyleConverter.keyMap;

            var cssProperty = keyMap[key];
            var cssText = '';

            if (cssProperty) {
                var propertyKey = cssProperty.property;
                for (var propertyIndex = 0, propertyLength = propertyKey.length; propertyIndex < propertyLength; ++propertyIndex) {
                    cssText += propertyKey[propertyIndex] + ':' + cssProperty.valueFunction(value) + ';';
                }
            }
            element.style.cssText += cssText;

            return element;
        }
    };

    L.StylesBuilder = L.Class.extend({
        initialize: function (categories, styleFunctionMap) {
            this._categories = categories;
            this._styleFunctionMap = styleFunctionMap;

            this._buildStyles();
        },

        _buildStyles: function () {
            var map = {};
            var category;
            var styleFunction;
            var styleValue;

            for (var index = 0; index < this._categories.length; ++index) {
                category = this._categories[index];

                map[category] = {};

                for (var property in this._styleFunctionMap) {
                    styleFunction = this._styleFunctionMap[property];

                    styleValue = styleFunction.evaluate ? styleFunction.evaluate(index) : (typeof styleFunction === 'function' ? styleFunction(index) : styleFunction);

                    map[category][property] = styleValue;
                }
            }

            this._styleMap = map;
        },

        getStyles: function () {
            return this._styleMap;
        }


    });

    L.PaletteBuilder = L.Class.extend({
        initialize: function (styleFunctionMap) {
            this._styleFunctionMap = styleFunctionMap;
        },

        generate: function (options) {
            options = options || {};

            var container = document.createElement('div');
            var paletteElement = L.DomUtil.create('div', 'palette', container);
            var count = options.count || 10;
            var categories = (function (count) {
                var categoryArray = [];

                for (var i = 0; i < count; ++i) {
                    categoryArray.push(i);
                }

                return categoryArray;
            })(count);

            var styleBuilder = new L.StylesBuilder(categories, this._styleFunctionMap);
            var styles = styleBuilder.getStyles();

            if (options.className) {
                L.DomUtil.addClass(paletteElement, options.className);
            }

            for (var styleKey in styles) {
                var i = L.DomUtil.create('i', 'palette-element', paletteElement);
                var style = styles[styleKey];

                L.StyleConverter.applySVGStyle(i, style);
            }

            return container.innerHTML;

        }
    });

    L.HTMLUtils = {
        buildTable: function (obj, className, ignoreFields) {
            className = className || 'table table-condensed table-striped table-bordered';

            var fragment = document.createDocumentFragment();
            var table = L.DomUtil.create('table', className, fragment);
            var thead = L.DomUtil.create('thead', '', table);
            var tbody = L.DomUtil.create('tbody', '', table);

            var thead_tr = L.DomUtil.create('tr', '', thead);
            var thead_values = ['Name', 'Value'];
            for (var i = 0, l = thead_values.length; i < l; i++) {
                var thead_th = L.DomUtil.create('th', '', thead_tr);
                thead_th.innerHTML = thead_values[i];
            }

            ignoreFields = ignoreFields || [];

            function inArray(arrayObj, value) {
                for (var i = 0, l = arrayObj.length; i < l; i++) {
                    if (arrayObj[i] === value) {
                        return true;
                    }
                }
                return false;
            }

            for (var property in obj) {
                if (obj.hasOwnProperty(property) && !inArray(ignoreFields, property)) {
                    var value = obj[property];
                    if (typeof value === 'object') {
                        var container = document.createElement('div');
                        container.appendChild(L.HTMLUtils.buildTable(value, className, ignoreFields));
                        value = container.innerHTML;
                    }

                    var tbody_tr = L.DomUtil.create('tr', '', tbody);
                    var tbody_values = [property, value];
                    for (i = 0, l = tbody_values.length; i < l; i++) {
                        var tbody_td = L.DomUtil.create('td', '', tbody_tr);
                        tbody_td.innerHTML = tbody_values[i];
                    }
                }
            }

            return table;
        }
    };

    /*
     * Provides basic animation of numeric properties.  TODO:  Change this to use L.Util.requestAnimFrame
     */
    L.AnimationUtils = {
        // From:  http://gizma.com/easing/
        easingFunctions: {
            linear: function (t,d) {
                return t / d;
            },
            easeIn: function (t, d) {
                return Math.pow(t / d, 5);
            },
            easeOut: function (t, d) {
                return 1 - Math.pow(1 - (t / d), 5);
            },
            easeInOut: function (t, d) {
                t /= d/2;
                if (t < 1) return 0.5*Math.pow(t, 4);
                t -= 2;
                return -0.5 * (Math.pow(t, 4) - 2);
            }
        },
        animate: function (layer, options) {
            var from = options.from || {};
            var to = options.to || {};
            var duration = options.duration || 500;
            var linearFunctions = {};
            var easing = options.easing || L.AnimationUtils.easingFunctions.linear;
            var animationEnd = options.animationEnd;

            for (var key in from) {
                if (key !== 'color' && key !== 'fillColor' && key !== 'position' && to[key]) {
                    linearFunctions[key] = new L.LinearFunction([0, from[key]], [1, to[key]]);
                }
                else if ((key === 'color' || key === 'fillColor') && (from[key] !== to[key])) {
                    var fromColor = L.Color.getColor(from[key]);
                    var toColor = L.Color.getColor(to[key]);
                    linearFunctions[key] = new L.RGBColorBlendFunction(0, 1, fromColor.toRGBString(), toColor.toRGBString());
                }
                else if (key === 'position' && to[key]) {
                    linearFunctions[key] = new L.LinearFunction([from[key].x, from[key].y], [to[key].x, to[key].y], {
                        postProcess: function (y, x) {
                            return {
                                x: x,
                                y: y
                            };
                        }
                    });
                }
            }

            var layerOptions = {};
            var start = (+new Date());

            var updateLayer = function () {
                var delta = (+new Date()) - start;
                var percent = easing(delta, duration);

                if (percent < 1) {
                    for (var key in linearFunctions) {
                        layerOptions[key] = linearFunctions[key].evaluate(percent);
                    }

                    layer.options = L.extend({}, layer.options, layerOptions);
                    layer.setStyle(layer.options).redraw();
                    layer._animId = L.Util.requestAnimFrame(updateLayer);
                }
                else {
                    L.Util.cancelAnimFrame(layer._animId);
                    layer._animId = null;

                    if (animationEnd) {
                        animationEnd();
                    }
                }
            };

            layer._animId = L.Util.requestAnimFrame(updateLayer);
        },
        buildDistanceIndex: function (latlngs) {
            var index = {};
            var total = 0.0;

            index.index = [0.0];

            for (var i = 0, len = latlngs.length; i < len - 1; ++i) {
                total += latlngs[i].distanceTo(latlngs[i + 1]);
                index.index.push(total);
            }

            index.totalDistance = total;
            return index;
        },
        distanceToPoints: function (latlngs, index, distance, lastIndex) {
            var points = null;
            var info = {};

            if (distance >= index.totalDistance) {
                info.distances = [index.totalDistance, index.totalDistance];
                info.points = [latlngs[latlngs.length - 1], latlngs[latlngs.length - 1]];
                info.index = latlngs.length - 1;
            }
            else {
                for (var i = lastIndex, len = index.index.length; i < len - 1; ++i) {
                    if (distance >= index.index[i] && distance < index.index[i + 1]) {
                        info.distances = [index.index[i], index.index[i + 1]];
                        info.points = [latlngs[i], latlngs[i + 1]];
                        info.index = i;
                        break;
                    }
                }
            }

            return info;
        },
        getInterpolator: function (points) {
            return new L.LinearFunction([points[0].lng, points[0].lat], [points[1].lng, points[1].lat]);
        },
        animateLine: function (layer, options) {
            var from = options.from || {};
            var to = options.to || {};
            var path = options.path || layer._latlngs || [];
            var duration = options.duration || 1000;
            var easing = options.easing || L.AnimationUtils.easingFunctions.linear;
            var animationEnd = options.animationEnd;
            var start = (+new Date());
            var me = this;
            var styleFunctions = {};
            var distanceIndex = this.buildDistanceIndex(path);
            var timeToDistance = distanceIndex.totalDistance/duration;
            var update = options.update || function (layer, points, interpolatedPoint) {
                layer.setLatLng(new L.LatLng(interpolatedPoint.y, interpolatedPoint.x));
            };

            for (var key in from) {
                if (key !== 'color' && key !== 'fillColor' && key !== 'position' && to[key]) {
                    styleFunctions[key] = new L.LinearFunction([0, from[key]], [1, to[key]]);
                }
                else if ((key === 'color' || key === 'fillColor') && (from[key] !== to[key])) {
                    var fromColor = L.Color.getColor(from[key]);
                    var toColor = L.Color.getColor(to[key]);
                    styleFunctions[key] = new L.RGBColorBlendFunction(0, 1, fromColor.toRGBString(), toColor.toRGBString());
                }
                else if (key === 'position' && to[key]) {
                    styleFunctions[key] = new L.LinearFunction([from[key].x, from[key].y], [to[key].x, to[key].y], {
                        postProcess: function (y, x) {
                            return {
                                x: x,
                                y: y
                            };
                        }
                    });
                }
            }

            var lastIndex = 0;

            var animate = function (timestamp) {
                var elapsedTime = (+new Date()) - start;
                var distance = elapsedTime * timeToDistance;
                var info = me.distanceToPoints(path, distanceIndex, distance, lastIndex);
                var pointPercent = info.distances[0]/distanceIndex.totalDistance;
                var pointPercent1 = info.distances[1]/distanceIndex.totalDistance;
                var interpolator = me.getInterpolator(info.points);
                var percent = easing(elapsedTime, duration);
                var relativePercent = (percent - pointPercent)/((pointPercent1 - pointPercent) || 1);
                var interpolatedPoint = interpolator.getPointAtPercent(relativePercent);
                var layerOptions = {};

                update(layer, info.points, interpolatedPoint);

                lastIndex = info.index;

                if (percent >= 1) {
                    L.Util.cancelAnimFrame(layer._animId);

                    if (animationEnd) {
                        animationEnd();
                    }
                }
                else {
                    for (var key in styleFunctions) {
                        layerOptions[key] = styleFunctions[key].evaluate(percent);
                    }

                    layer.options = L.extend({}, layer.options, layerOptions);
                    layer.setStyle(layer.options);
                    layer._animId = L.Util.requestAnimFrame(animate);
                }

                interpolator = null;
                interpolatedPoint = null;
            };

            layer._animId = L.Util.requestAnimFrame(animate);
        }
    };

    /**
     * Adapted from:  http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
     * These functions will be used to provide backwards compatibility with browsers that don't support hsl
     */
    L.Color = L.Class.extend({
        statics: {
            getColor: function (colorDef) {
                if (colorDef.indexOf('#') > -1 || colorDef.indexOf('rgb') > -1) {
                    return new L.RGBColor(colorDef);
                }
                else {
                    return new L.HSLColor(colorDef);
                }
            }
        },
        initialize: function (colorDef) {
            this._rgb = [0, 0, 0];
            this._hsl = [0, 1, 0.5];
            this._a = 1.0;

            if (colorDef) {
                this.parseColorDef(colorDef);
            }
        },

        parseColorDef: function (colorDef) {
            // Override in inheriting classes
        },

        /**
         * Converts an RGB color value to HSL. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and l in the set [0, 1].
         *
         * @param   Number  r       The red color value
         * @param   Number  g       The green color value
         * @param   Number  b       The blue color value
         * @return  Array           The HSL representation
         */
        rgbToHSL: function (r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
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

            return [h, s, l];
        },

        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   Number  h       The hue
         * @param   Number  s       The saturation
         * @param   Number  l       The lightness
         * @return  Array           The RGB representation
         */
        hslToRGB: function (h, s, l) {
            var r, g, b;

            var hue2rgb = function (p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
        },

        setRGB: function (r, g, b) {
            this._rgb = [r, g, b];

            this._hsl = this.rgbToHSL(r, g, b);

            return this;
        },

        setHSL: function (h, s, l) {
            this._hsl = [h, s, l];

            this._rgb = this.hslToRGB(h, s, l);

            return this;
        },

        toHSL: function () {
            // Return HSL components
            return this._hsl;
        },

        toHSLString: function () {
            // Return HSL string
            var prefix = 'hsl';

            if (this._a < 1.0) {
                prefix += 'a';
            }

            return prefix + '(' + (this._hsl[0] * 360).toFixed(1) + ',' + (this._hsl[1] * 100).toFixed(0) + '%,' + (this._hsl[2] * 100).toFixed(0) + '%)';
        },

        toRGB: function () {
            // Return RGB components
            return this._rgb;
        },

        toRGBString: function () {
            // Return RGB string
            var rgbString;

            if (this._a < 1.0) {
                rgbString = 'rgba(' + this._rgb[0].toFixed(0) + ',' + this._rgb[1].toFixed(0) + ',' + this._rgb[2].toFixed(0) + ',' + this._a.toFixed(1) + ')';
            }
            else {
                var parts = [this._rgb[0].toString(16), this._rgb[1].toString(16), this._rgb[2].toString(16)];

                for (var i = 0, len = parts.length; i < len; ++i) {
                    if (parts[i].length === 1) {
                        parts[i] = '0' + parts[i];
                    }
                }

                rgbString = '#' + parts.join('');
            }

            return rgbString;
        },

        r: function (newR) {
            if (!arguments.length) return this._rgb[0];
            return this.setRGB(newR, this._rgb[1], this._rgb[2]);
        },

        g: function (newG) {
            if (!arguments.length) return this._rgb[1];
            return this.setRGB(this._rgb[0], newG, this._rgb[2]);
        },

        b: function (newB) {
            if (!arguments.length) return this._rgb[2];
            return this.setRGB(this._rgb[0], this._rgb[1], newB);
        },

        h: function (newH) {
            if (!arguments.length) return this._hsl[0];
            return this.setHSL(newH, this._hsl[1], this._hsl[2]);
        },

        s: function (newS) {
            if (!arguments.length) return this._hsl[1];
            return this.setHSL(this._hsl[0], newS, this._hsl[2]);
        },

        l: function (newL) {
            if (!arguments.length) return this._hsl[2];
            return this.setHSL(this._hsl[0], this._hsl[1], newL);
        },

        a: function (newA) {
            if (!arguments.length) return this._a;
            this._a = newA;
            return this;
        }
    });

    /*
     * A class representing an RGB color - extends L.Color
     */
    L.RGBColor = L.Color.extend({
        initialize: function (colorDef) {
            L.Color.prototype.initialize.call(this, colorDef);
        },

        parseColorDef: function (colorDef) {
            var isArray = colorDef instanceof Array;
            var isHex = colorDef.indexOf('#') === 0;
            var parts = [];
            var r, g, b, a;

            if (isArray) {
                r = Math.floor(colorDef[0]);
                g = Math.floor(colorDef[1]);
                b = Math.floor(colorDef[2]);

                a = colorDef.length === 4 ? colorDef[3] : 1.0;
            }
            else if (isHex) {
                colorDef = colorDef.replace('#', '');

                r = parseInt(colorDef.substring(0, 2), 16);
                g = parseInt(colorDef.substring(2, 4), 16);
                b = parseInt(colorDef.substring(4, 6), 16);

                a = colorDef.length === 8 ? parseInt(colorDef.substring(6, 8), 16) : 1.0;
            }
            else {
                parts = colorDef.replace('rgb', '').replace('a', '').replace(/\s+/g, '').replace('(', '').replace(')', '').split(',');

                r = parseInt(parts[0]);
                g = parseInt(parts[1]);
                b = parseInt(parts[2]);

                a = parts.length === 4 ? parseInt(parts[3]) : 1.0;
            }

            this.setRGB(r, g, b);
            this._a = a;
        }
    });

    L.rgbColor = function (colorDef) {
        return new L.RGBColor(colorDef);
    };

    L.HSLColor = L.Color.extend({
        initialize: function (colorDef) {
            L.Color.prototype.initialize.call(this, colorDef);
        },

        parseColorDef: function (colorDef) {
            // Could be a string or an array
            var isArray = colorDef instanceof Array;
            var h, s, l, a;

            if (isArray) {
                h = colorDef[0];
                s = colorDef[1];
                l = colorDef[2];

                a = colorDef.length === 4 ? colorDef[3] : 1.0;
            }
            else {
                var parts = colorDef.replace('hsl', '').replace('a', '').replace('(', '').replace(/\s+/g, '').replace(/%/g, '').replace(')', '').split(',');

                h = Number(parts[0]) / 360;
                s = Number(parts[1]) / 100;
                l = Number(parts[2]) / 100;

                a = parts.length === 4 ? parseInt(parts[3]) : 1.0;
            }

            this.setHSL(h, s, l);
            this._a = a;
        }
    });

    L.hslColor = function (colorDef) {
        return new L.HSLColor(colorDef);
    };

    /*
     * A generic animation class based on the L.PosAnimation code from Leaflet
     */
    L.Animation = L.Evented.extend({

        initialize: function (easeFunction, animateFrame) {
            this._easeFunction = easeFunction; // Function that takes time as an input parameter
            this._animateFrame = animateFrame;
        },

        run: function (el, options) { // (HTMLElement, Point[, Number, Number])
            options = options || {};

            this.stop();

            this._el = el;
            this._inProgress = true;
            this._duration = options.duration || 0;

            this._animationOptions = options;
            this._startTime = +new Date();

            this.fire('start');

            this._animate();
        },

        stop: function () {
            if (!this._inProgress) {
                return;
            }

            this._step();
            this._complete();
        },

        _animate: function () {
            // animation loop
            this._animId = L.Util.requestAnimFrame(this._animate, this);
            this._step();
        },

        _step: function () {
            var elapsed = (+new Date()) - this._startTime,
                duration = this._duration * 1000;

            if (duration === 0 || elapsed < duration) {
                this._runFrame(this._easeFunction(elapsed / (duration || 1)));
            } else {
                this._runFrame(1);
                this._complete();
            }
        },

        _runFrame: function (progress) {
            this._animateFrame(progress);

            this.fire('step');
        },

        _complete: function () {
            L.Util.cancelAnimFrame(this._animId);

            this._inProgress = false;
            this.fire('end');
        }
    });

}(window, document));;// @preserve This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).
// Adapted from:  https://raw.github.com/mbostock/d3/master/lib/colorbrewer/colorbrewer.js
(function (window, document, undefined) {
    L.ColorBrewer = {
        Sequential: {
            YlGn: {
                3: ["#f7fcb9", "#addd8e", "#31a354"],
                4: ["#ffffcc", "#c2e699", "#78c679", "#238443"],
                5: ["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"],
                6: ["#ffffcc", "#d9f0a3", "#addd8e", "#78c679", "#31a354", "#006837"],
                7: ["#ffffcc", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32"],
                8: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32"],
                9: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"]
            },
            YlGnBu: {
                3: ["#edf8b1", "#7fcdbb", "#2c7fb8"],
                4: ["#ffffcc", "#a1dab4", "#41b6c4", "#225ea8"],
                5: ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"],
                6: ["#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8", "#253494"],
                7: ["#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84"],
                8: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84"],
                9: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]
            },
            GnBu: {
                3: ["#e0f3db", "#a8ddb5", "#43a2ca"],
                4: ["#f0f9e8", "#bae4bc", "#7bccc4", "#2b8cbe"],
                5: ["#f0f9e8", "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac"],
                6: ["#f0f9e8", "#ccebc5", "#a8ddb5", "#7bccc4", "#43a2ca", "#0868ac"],
                7: ["#f0f9e8", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#08589e"],
                8: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#08589e"],
                9: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"]
            },
            BuGn: {
                3: ["#e5f5f9", "#99d8c9", "#2ca25f"],
                4: ["#edf8fb", "#b2e2e2", "#66c2a4", "#238b45"],
                5: ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"],
                6: ["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#2ca25f", "#006d2c"],
                7: ["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824"],
                8: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824"],
                9: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"]
            },
            PuBuGn: {
                3: ["#ece2f0", "#a6bddb", "#1c9099"],
                4: ["#f6eff7", "#bdc9e1", "#67a9cf", "#02818a"],
                5: ["#f6eff7", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59"],
                6: ["#f6eff7", "#d0d1e6", "#a6bddb", "#67a9cf", "#1c9099", "#016c59"],
                7: ["#f6eff7", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016450"],
                8: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016450"],
                9: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"]
            },
            PuBu: {
                3: ["#ece7f2", "#a6bddb", "#2b8cbe"],
                4: ["#f1eef6", "#bdc9e1", "#74a9cf", "#0570b0"],
                5: ["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"],
                6: ["#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#2b8cbe", "#045a8d"],
                7: ["#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b"],
                8: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b"],
                9: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"]
            },
            BuPu: {
                3: ["#e0ecf4", "#9ebcda", "#8856a7"],
                4: ["#edf8fb", "#b3cde3", "#8c96c6", "#88419d"],
                5: ["#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"],
                6: ["#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8856a7", "#810f7c"],
                7: ["#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#6e016b"],
                8: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#6e016b"],
                9: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"]
            },
            RdPu: {
                3: ["#fde0dd", "#fa9fb5", "#c51b8a"],
                4: ["#feebe2", "#fbb4b9", "#f768a1", "#ae017e"],
                5: ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
                6: ["#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#c51b8a", "#7a0177"],
                7: ["#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177"],
                8: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177"],
                9: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"]
            },
            PuRd: {
                3: ["#e7e1ef", "#c994c7", "#dd1c77"],
                4: ["#f1eef6", "#d7b5d8", "#df65b0", "#ce1256"],
                5: ["#f1eef6", "#d7b5d8", "#df65b0", "#dd1c77", "#980043"],
                6: ["#f1eef6", "#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "#980043"],
                7: ["#f1eef6", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#91003f"],
                8: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#91003f"],
                9: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"]
            },
            OrRd: {
                3: ["#fee8c8", "#fdbb84", "#e34a33"],
                4: ["#fef0d9", "#fdcc8a", "#fc8d59", "#d7301f"],
                5: ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"],
                6: ["#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#e34a33", "#b30000"],
                7: ["#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#990000"],
                8: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#990000"],
                9: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]
            },
            YlOrRd: {
                3: ["#ffeda0", "#feb24c", "#f03b20"],
                4: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"],
                5: ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"],
                6: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"],
                7: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"],
                8: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"],
                9: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]
            },
            YlOrBr: {
                3: ["#fff7bc", "#fec44f", "#d95f0e"],
                4: ["#ffffd4", "#fed98e", "#fe9929", "#cc4c02"],
                5: ["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"],
                6: ["#ffffd4", "#fee391", "#fec44f", "#fe9929", "#d95f0e", "#993404"],
                7: ["#ffffd4", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#8c2d04"],
                8: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#8c2d04"],
                9: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]
            },
            Purples: {
                3: ["#efedf5", "#bcbddc", "#756bb1"],
                4: ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#6a51a3"],
                5: ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"],
                6: ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"],
                7: ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486"],
                8: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486"],
                9: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"]
            },
            Blues: {
                3: ["#deebf7", "#9ecae1", "#3182bd"],
                4: ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"],
                5: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
                6: ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"],
                7: ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"],
                8: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"],
                9: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"]
            },
            Greens: {
                3: ["#e5f5e0", "#a1d99b", "#31a354"],
                4: ["#edf8e9", "#bae4b3", "#74c476", "#238b45"],
                5: ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"],
                6: ["#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#31a354", "#006d2c"],
                7: ["#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32"],
                8: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32"],
                9: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]
            },
            Oranges: {
                3: ["#fee6ce", "#fdae6b", "#e6550d"],
                4: ["#feedde", "#fdbe85", "#fd8d3c", "#d94701"],
                5: ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"],
                6: ["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#e6550d", "#a63603"],
                7: ["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#8c2d04"],
                8: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#8c2d04"],
                9: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"]
            },
            Reds: {
                3: ["#fee0d2", "#fc9272", "#de2d26"],
                4: ["#fee5d9", "#fcae91", "#fb6a4a", "#cb181d"],
                5: ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],
                6: ["#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"],
                7: ["#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d"],
                8: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d"],
                9: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"]
            },
            Greys: {
                3: ["#f0f0f0", "#bdbdbd", "#636363"],
                4: ["#f7f7f7", "#cccccc", "#969696", "#525252"],
                5: ["#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"],
                6: ["#f7f7f7", "#d9d9d9", "#bdbdbd", "#969696", "#636363", "#252525"],
                7: ["#f7f7f7", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525"],
                8: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525"],
                9: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"]
            }
        },
        Diverging: {
            PuOr: {
                3: ["#f1a340", "#f7f7f7", "#998ec3"],
                4: ["#e66101", "#fdb863", "#b2abd2", "#5e3c99"],
                5: ["#e66101", "#fdb863", "#f7f7f7", "#b2abd2", "#5e3c99"],
                6: ["#b35806", "#f1a340", "#fee0b6", "#d8daeb", "#998ec3", "#542788"],
                7: ["#b35806", "#f1a340", "#fee0b6", "#f7f7f7", "#d8daeb", "#998ec3", "#542788"],
                8: ["#b35806", "#e08214", "#fdb863", "#fee0b6", "#d8daeb", "#b2abd2", "#8073ac", "#542788"],
                9: ["#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788"],
                10: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
                11: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"]
            },
            BrBG: {
                3: ["#d8b365", "#f5f5f5", "#5ab4ac"],
                4: ["#a6611a", "#dfc27d", "#80cdc1", "#018571"],
                5: ["#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571"],
                6: ["#8c510a", "#d8b365", "#f6e8c3", "#c7eae5", "#5ab4ac", "#01665e"],
                7: ["#8c510a", "#d8b365", "#f6e8c3", "#f5f5f5", "#c7eae5", "#5ab4ac", "#01665e"],
                8: ["#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#c7eae5", "#80cdc1", "#35978f", "#01665e"],
                9: ["#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e"],
                10: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
                11: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"]
            },
            PRGn: {
                3: ["#af8dc3", "#f7f7f7", "#7fbf7b"],
                4: ["#7b3294", "#c2a5cf", "#a6dba0", "#008837"],
                5: ["#7b3294", "#c2a5cf", "#f7f7f7", "#a6dba0", "#008837"],
                6: ["#762a83", "#af8dc3", "#e7d4e8", "#d9f0d3", "#7fbf7b", "#1b7837"],
                7: ["#762a83", "#af8dc3", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#7fbf7b", "#1b7837"],
                8: ["#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837"],
                9: ["#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837"],
                10: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
                11: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"]
            },
            PiYG: {
                3: ["#e9a3c9", "#f7f7f7", "#a1d76a"],
                4: ["#d01c8b", "#f1b6da", "#b8e186", "#4dac26"],
                5: ["#d01c8b", "#f1b6da", "#f7f7f7", "#b8e186", "#4dac26"],
                6: ["#c51b7d", "#e9a3c9", "#fde0ef", "#e6f5d0", "#a1d76a", "#4d9221"],
                7: ["#c51b7d", "#e9a3c9", "#fde0ef", "#f7f7f7", "#e6f5d0", "#a1d76a", "#4d9221"],
                8: ["#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221"],
                9: ["#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221"],
                10: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
                11: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"]
            },
            RdBu: {
                3: ["#ef8a62", "#f7f7f7", "#67a9cf"],
                4: ["#ca0020", "#f4a582", "#92c5de", "#0571b0"],
                5: ["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"],
                6: ["#b2182b", "#ef8a62", "#fddbc7", "#d1e5f0", "#67a9cf", "#2166ac"],
                7: ["#b2182b", "#ef8a62", "#fddbc7", "#f7f7f7", "#d1e5f0", "#67a9cf", "#2166ac"],
                8: ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac"],
                9: ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac"],
                10: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
                11: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"]
            },
            RdGy: {
                3: ["#ef8a62", "#ffffff", "#999999"],
                4: ["#ca0020", "#f4a582", "#bababa", "#404040"],
                5: ["#ca0020", "#f4a582", "#ffffff", "#bababa", "#404040"],
                6: ["#b2182b", "#ef8a62", "#fddbc7", "#e0e0e0", "#999999", "#4d4d4d"],
                7: ["#b2182b", "#ef8a62", "#fddbc7", "#ffffff", "#e0e0e0", "#999999", "#4d4d4d"],
                8: ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#e0e0e0", "#bababa", "#878787", "#4d4d4d"],
                9: ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d"],
                10: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
                11: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"]
            },
            RdYlBu: {
                3: ["#fc8d59", "#ffffbf", "#91bfdb"],
                4: ["#d7191c", "#fdae61", "#abd9e9", "#2c7bb6"],
                5: ["#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6"],
                6: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"],
                7: ["#d73027", "#fc8d59", "#fee090", "#ffffbf", "#e0f3f8", "#91bfdb", "#4575b4"],
                8: ["#d73027", "#f46d43", "#fdae61", "#fee090", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4"],
                9: ["#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4"],
                10: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
                11: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"]
            },
            Spectral: {
                3: ["#fc8d59", "#ffffbf", "#99d594"],
                4: ["#d7191c", "#fdae61", "#abdda4", "#2b83ba"],
                5: ["#d7191c", "#fdae61", "#ffffbf", "#abdda4", "#2b83ba"],
                6: ["#d53e4f", "#fc8d59", "#fee08b", "#e6f598", "#99d594", "#3288bd"],
                7: ["#d53e4f", "#fc8d59", "#fee08b", "#ffffbf", "#e6f598", "#99d594", "#3288bd"],
                8: ["#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd"],
                9: ["#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd"],
                10: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
                11: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"]
            },
            RdYlGn: {
                3: ["#fc8d59", "#ffffbf", "#91cf60"],
                4: ["#d7191c", "#fdae61", "#a6d96a", "#1a9641"],
                5: ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"],
                6: ["#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#91cf60", "#1a9850"],
                7: ["#d73027", "#fc8d59", "#fee08b", "#ffffbf", "#d9ef8b", "#91cf60", "#1a9850"],
                8: ["#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850"],
                9: ["#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850"],
                10: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
                11: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]
            }
        },
        Qualitative: {
            Accent: {
                3: ["#7fc97f", "#beaed4", "#fdc086"],
                4: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99"],
                5: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0"],
                6: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"],
                7: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17"],
                8: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"]
            },
            Dark2: {
                3: ["#1b9e77", "#d95f02", "#7570b3"],
                4: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
                5: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"],
                6: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02"],
                7: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
                8: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
            },
            Paired: {
                3: ["#a6cee3", "#1f78b4", "#b2df8a"],
                4: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"],
                5: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"],
                6: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"],
                7: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f"],
                8: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"],
                9: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6"],
                10: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a"],
                11: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99"],
                12: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]
            },
            Pastel1: {
                3: ["#fbb4ae", "#b3cde3", "#ccebc5"],
                4: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4"],
                5: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6"],
                6: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc"],
                7: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd"],
                8: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec"],
                9: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
            },
            Pastel2: {
                3: ["#b3e2cd", "#fdcdac", "#cbd5e8"],
                4: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4"],
                5: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9"],
                6: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae"],
                7: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc"],
                8: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]
            },
            Set1: {
                3: ["#e41a1c", "#377eb8", "#4daf4a"],
                4: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"],
                5: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
                6: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"],
                7: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628"],
                8: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf"],
                9: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"]
            },
            Set2: {
                3: ["#66c2a5", "#fc8d62", "#8da0cb"],
                4: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"],
                5: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"],
                6: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"],
                7: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"],
                8: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
            },
            Set3: {
                3: ["#8dd3c7", "#ffffb3", "#bebada"],
                4: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072"],
                5: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"],
                6: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462"],
                7: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69"],
                8: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"],
                9: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9"],
                10: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"],
                11: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5"],
                12: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
            }
        }
    };

    /*
     * Convenience functions for generating a color scale between a min X and a max X value
     */
    L.Palettes = {
        huePalette: function (min, max, minH, maxH, options) {
            return new L.HSLHueFunction(new L.Point(min, minH), new L.Point(max, maxH), options);
        },
        luminosityPalette: function (min, max, minL, maxL, options) {
            return new L.HSLLuminosityFunction(new L.Point(min, minL), new L.Point(max, maxL), options);
        },
        saturationPalette: function (min, max, minS, maxS, options) {
            return new L.HSLSaturationFunction(new L.Point(min, minS), new L.Point(max, maxS), options);
        },
        rgbBlendPalette: function (min, max, minColor, maxColor, options) {
            return new L.RGBColorBlendFunction(min, max, minColor, maxColor, options);
        },
        hslBlendPalette: function (min, max, minColor, maxColor, options) {
            return new L.HSLColorBlendFunction(min, max, minColor, maxColor, options);
        },
        customColorPalette: function (min, max, colors, options) {
            return new L.CustomColorFunction(min, max, colors, options);
        }
    };

    /*
     * Pre-defined color palettes for easy use.  Call getPalette passing a min and max value get a pre-defined LinearFunction
     */
    L.DynamicColorPalettes = {
        rainbow: {
            text: 'Rainbow',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 0, 300, options);
            }
        },
        greentored: {
            text: 'Green - Red',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 120, 0, options);
            }
        },
        yellowtored: {
            text: 'Yellow - Red',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 60, 0, options);
            }
        },
        orangetored: {
            text: 'Orange - Red',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 30, 0, options);
            }
        },
        redtopurple: {
            text: 'Red - Purple',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 360, 270, options);
            }
        },
        bluetored: {
            text: 'Blue - Red',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 210, 360, options);
            }
        },
        bluetored2: {
            text: 'Blue - Red 2',
            getPalette: function (min, max, options) {
                return L.Palettes.huePalette(min, max, 180, 0, options);
            }
        },
        whitetored: {
            text: 'White - Red',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 0}));
            }
        },
        whitetoorange: {
            text: 'White - Orange',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 30}));
            }
        },
        whitetoyellow: {
            text: 'White - Yellow',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 60}));
            }
        },
        whitetogreen: {
            text: 'White - Green',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 120}));
            }
        },
        whitetoltblue: {
            text: 'White - Lt. Blue',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 180}));
            }
        },
        whitetoblue: {
            text: 'White - Blue',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 240}));
            }
        },
        whitetopurple: {
            text: 'White - Purple',
            getPalette: function (min, max, options) {
                return L.Palettes.luminosityPalette(min, max, 1, 0.5, L.Util.extend(option, {outputHue: 270}));
            }
        },
        graytored: {
            text: 'Gray - Red',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 0}));
            }
        },
        graytoorange: {
            text: 'Gray - Orange',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 30}));
            }
        },
        graytoyellow: {
            text: 'Gray - Yellow',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 60}));
            }
        },
        graytogreen: {
            text: 'Gray - Green',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 120}));
            }
        },
        graytoltblue: {
            text: 'Gray - Lt. Blue',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 180}));
            }
        },
        graytoblue: {
            text: 'Gray - Blue',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 240}));
            }
        },
        graytopurple: {
            text: 'Gray - Purple',
            getPalette: function (min, max, options) {
                return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {outputHue: 270}));
            }
        }
    };

    /*
     *
     */
    L.DynamicPaletteElement = L.Class.extend({
        initialize: function (key, dynamicPalette) {
            this._key = key;
            this._dynamicPalette = dynamicPalette;
        },

        generate: function (options) {
            var paletteElement = L.DomUtil.create('div', 'palette');
            var count = options.count;
            var palette = this._dynamicPalette.getPalette(0, count - 1);
            var width = options.width;

            var showText = true;

            if (options.showText) {
                showText = options.showText;
            }

            // Store the palette key in the element via HTML5 custom "data-" attribute.
            // Doing this will make it possible use a CSS selector to "find" this element
            // based on the palette key value later.
            paletteElement.setAttribute('data-palette-key', this._key);

            if (this._dynamicPalette.text && showText) {
                L.DomUtil.create('div', 'palette-text', paletteElement).innerHTML = '<i class="icon-ok hidden"></i>' + this._dynamicPalette.text;
            }

            var elementWidth = width / count;

            if (options.className) {
                L.DomUtil.addClass(paletteElement, options.className);
            }

            for (var i = 0; i < count; ++i) {
                var iElement = L.DomUtil.create('i', 'palette-element');

                for (var styleKey in palette) {

                    var styleValue = palette[styleKey];
                    var style = styleValue.evaluate ? styleValue.evaluate(i) : styleValue;

                    L.StyleConverter.setCSSProperty(iElement, styleKey, style);

                }

                iElement.style.width = elementWidth + 'px';

                paletteElement.appendChild(iElement);
            }

            return paletteElement;
        }

    });

}(window, document));;(function (window, document, undefined) {

    L.Path.XLINK_NS = 'http://www.w3.org/1999/xlink';

    var DomUtilFunctions = DomUtilFunctions || {
        setStyle: function(element, style) {
            var styleString = '';

            for (var key in style) {
                styleString += key + ': ' + style[key] + ';';
            }

            element.setAttribute('style', styleString);

            return element;
        },
        setAttr: function (element, attr) {
            for (var key in attr) {
                element.setAttribute(key, attr[key]);
            }

            return element;
        }
    };

    L.extend(L.DomUtil, DomUtilFunctions);

    /*
     * Functions that support displaying text on an SVG path
     */
    L.TextFunctions = L.TextFunctions || {
        __addPath: L.SVG.prototype._addPath,
        _addPath: function (layer) {
            L.TextFunctions.__addPath.call(this, layer);
            if (layer.options.text) {
                this._createText(layer);
            }
        },

        __removePath: L.SVG.prototype._removePath,
        _removePath: function (layer) {
            this.__removePath.call(this, layer);
            if (layer._text) {
                L.DomUtil.remove(layer._text);
            }
            if (layer._pathDef) {
                L.DomUtil.remove(layer._pathDef);
            }
        },

        __updatePath: L.SVG.prototype._updatePath,
        _updatePath: function (layer) {
            this.__updatePath.call(this, layer);

            if (layer.options.text) {
                this._createText(layer);
            }
        },

        __setPath: L.SVG.prototype._setPath,
        _setPath: function (layer, path) {
            this.__setPath.call(this, layer, path);

            if (layer.options.text) {
                this._createText(layer);
            }
        },

        _initText: function (layer) {
            if (layer.options.text) {
                this._createText(layer);
            }
        },

        getTextAnchor: function (layer) {
            if (layer._point) {
                return layer._point;
            }
        },

        setTextAnchor: function (layer, anchorPoint) {
            if (layer._text) {
                layer._text.setAttribute('x', anchorPoint.x);
                layer._text.setAttribute('y', anchorPoint.y);
            }
        },

        _createText: function (layer) {
            var options = layer.options.text || {};

            if (layer._text) {
                L.DomUtil.remove(layer._text);
                layer.text = null;
            }

            if (layer._pathDef) {
                L.DomUtil.remove(layer._pathDef);
                layer._pathDef = null;
            }

            layer._text = L.SVG.create('text');
            layer._text.setAttribute('id', L.stamp(layer._text));

            var textNode = document.createTextNode(options.text);

            // If path is true, then create a textPath element and append it
            // to the text element; otherwise, populate the text element with a text node
            if (options.path && layer._path) {

                var pathOptions = options.path;

                var clonedPath = L.SVG.create('path');
                var existingDef = layer._path.getAttribute('d');

                clonedPath.setAttribute('id', L.stamp(clonedPath));
                if (existingDef) {
                    clonedPath.setAttribute('d', existingDef);
                }

                this._createDefs();

                this._defs.appendChild(clonedPath);
                layer._pathDef = clonedPath;

                // Create the textPath element and add attributes to reference this path
                var textPath = L.SVG.create('textPath');

                if (pathOptions.startOffset) {
                    textPath.setAttribute('startOffset', pathOptions.startOffset);
                }

                if (pathOptions.attr) {
                    L.DomUtil.setAttr(textPath, pathOptions.attr);
                }

                if (pathOptions.style) {
                    L.DomUtil.setStyle(textPath, pathOptions.style);
                }

                textPath.setAttributeNS(L.Path.XLINK_NS, 'xlink:href', '#' + L.stamp(clonedPath));
                textPath.appendChild(textNode);

                // Add the textPath element to the text element
                layer._text.appendChild(textPath);
            }
            else {
                layer._text.appendChild(textNode);
                layer._project();
                var anchorPoint = layer.getTextAnchor ? layer.getTextAnchor() : this.getTextAnchor(layer);
                this.setTextAnchor(layer, anchorPoint);
            }

            //className
            if (options.className) {
                layer._text.setAttribute('class', options.className);
            }
            else {
                layer._text.setAttribute('class', 'leaflet-svg-text');
            }

            //attributes
            if (options.attr) {
                L.DomUtil.setAttr(layer._text, options.attr);
            }

            //style
            if (options.style) {
                L.DomUtil.setStyle(layer._text, options.style);
            }

            if (layer._path) {
                var referencedNode = layer._path.nextSibling;

                this._container.firstChild.insertBefore(layer._text, referencedNode);
            }
        }
    };

    /*
     * Functions that support additions to the basic SVG Path features provided by Leaflet
     */
    var PathFunctions = PathFunctions || {
        __updateStyle: L.SVG.prototype._updateStyle,
        _finishPathAnimation: function (layer, animationEnd) {
            return function () {
                var dashArray = layer.options.dashArray || [0, 0];
                layer._path.style.strokeDasharray = dashArray.join(' ');
                layer._path.style.strokeDashoffset = 0;

                if (animationEnd) {
                    animationEnd(layer);
                }
            };
        },
        animatePath: function (layer) {
            var path = layer._path;
            var length = path.getTotalLength();
            var animationOptions = layer.options.animatePath !== true ? L.extend({}, layer.options.animatePath) : {};
            var property = animationOptions.property || 'stroke-dashoffset';
            var duration = animationOptions.duration || '2s';
            var timingFunction = animationOptions.timingFunction || 'ease-in-out';
            var transition = [property, duration, timingFunction].join(' ');

            path.style.transition = path.style.MozTransition = 'none';
            path.style.transition = path.style.WebkitTransition = 'none';
            path.style.transition = path.style.MsTransition = 'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            // Define our transition
            path.style.transition = path.style.MozTransition = transition;
            path.style.transition = path.style.WebkitTransition = transition;
            path.style.transition = path.style.MsTransition = transition;
            // Go!
            path.style.strokeDashoffset = '0';

            L.DomEvent.on(path, {
                transitionEnd: this._finishPathAnimation(layer, animationOptions.animationEnd),
                mozTransitionEnd: this._finishPathAnimation(layer, animationOptions.animationEnd),
                msTransitionEnd: this._finishPathAnimation(layer, animationOptions.animationEnd),
                webkitTransitionEnd: this._finishPathAnimation(layer, animationOptions.animationEnd),
                oTransitionEnd: this._finishPathAnimation(layer, animationOptions.animationEnd)
            });
        },

        _createDefs: function () {
            if (!this._defs) {
                this._defs = L.SVG.create('defs');
                this._container.appendChild(this._defs);
            }
        },

        _addPath: function (layer) {

            L.TextFunctions._addPath.call(this, layer);

            if (layer._gradient) {
                this._defs.appendChild(layer._gradient);
            }
            if (layer._dropShadow) {
                this._defs.appendChild(layer._dropShadow);
            }
            if (layer._fillPattern) {
                this._defs.appendChild(layer._fillPattern);
            }
            if (layer._shapePattern) {
                this._defs.appendChild(layer._shapePattern);
            }
            if (layer._shape && layer._path) {
                this._container.firstChild.insertBefore(layer._shape, layer._path.nextSibling);
            }
            if (layer._pathDef) {
                this._defs.appendChild(layer._pathDef);
            }

            if (layer.options.animatePath) {
                this.animatePath(layer);
            }
        },

        _updatePath: function (layer) {
            L.TextFunctions._updatePath.call(this, layer);

            var me = this;
            if (layer.options.wordCloud) {
                var options = layer.options.wordCloud;

                if (options.words.length > 0) {
                    setTimeout(function () {
                        me._createWordCloudPattern(layer);
                    }, 0);
                }
            }
        },

        _removePath: function (layer) {

            L.TextFunctions._removePath.call(this, layer);

            if (layer._gradient) {
                L.DomUtil.remove(layer._gradient);
            }
            if (layer._dropShadow) {
                L.DomUtil.remove(layer._dropShadow);
            }
            if (layer._fillPattern) {
                L.DomUtil.remove(layer._fillPattern);
            }
            if (layer._shapePattern) {
                L.DomUtil.remove(layer._shapePattern);
            }
            if (layer._shape) {
                L.DomUtil.remove(layer._shape);
            }

            if (layer._g) {
                L.DomUtil.remove(layer._g);
            }
        },

        _createMarker: function (layer, type, options) {
            if (!this._defs) {
                this._createDefs();
            }

            layer._markers = layer._markers || {};
            layer._markerPath = layer._markerPath || {};

            if (!layer._markers[type]) {
                layer._markers[type] = L.SVG.create('marker');
                this._defs.appendChild(layer._markers[type]);
            }

            var markerGuid = L.Util.guid();

            var exaggeration = options.exaggeration || 2;
            var size = options.size || 2 * exaggeration;
            var halfSize = size/2;
            var style = L.extend({
                fill: layer.options.color,
                opacity: layer.options.opacity,
                radius: halfSize,
                numberOfSides: 3,
                rotation: 0,
                position: new L.Point(halfSize, halfSize)
            }, options.style);

            layer._markers[type].setAttribute('id', markerGuid);
            layer._markers[type].setAttribute('markerWidth', size);
            layer._markers[type].setAttribute('markerHeight', size);
            layer._markers[type].setAttribute('refX', halfSize);
            layer._markers[type].setAttribute('refY', halfSize);
            layer._markers[type].setAttribute('orient', options.orient || 'auto');
            layer._markers[type].setAttribute('markerUnits', options.markerUnits || 'strokeWidth');

            if (!layer._markerPath[type]) {
                layer._markerPath[type] = L.SVG.create('path');
                layer._markers[type].appendChild(layer._markerPath[type]);
            }

            var points = new L.RegularPolygonMarker(new L.LatLng(0,0),{})._getPoints(new L.Point(0,0), false, style);
            var d = new L.SVGPathBuilder(points, [], {
                closePath: true
            }).build(6);

            /*
             if (options.reverse) {
             layer._markerPath[type].setAttribute('d', 'M0,' + halfSize + ' L' + size + ',' + size + ' L' + size + ',0 L0,' + halfSize);
             }
             else {
             layer._markerPath[type].setAttribute('d', 'M' + size + ',' + halfSize + ' L0,' + size + ' L0,0 L' + size + ',' + halfSize);
             }
             */
            layer._markerPath[type].setAttribute('d', d);

            layer._markerPath[type].setAttribute('style', 'fill: ' + style.fill + '; opacity: ' + style.opacity);
        },
        _createGradient: function (layer) {
            if (!this._defs) {
                this._createDefs();
            }

            var options = layer.options.gradient !== true ? L.extend({}, layer.options.gradient) : {};
            var gradient;
            var gradientOptions;
            var gradientType = options.gradientType || 'linear';

            gradient = layer._gradient || L.SVG.create(gradientType + 'Gradient');

            if (gradientType === "radial") {
                gradientOptions = options.radial || {cx: '50%', cy: '50%', r: '50%', fx: '50%', fy: '50%'};
            } else {
                var vector = options.vector || [["0%", "0%"], ["100%", "100%"]];
                gradientOptions = {
                    x1: vector[0][0],
                    x2: vector[1][0],
                    y1: vector[0][1],
                    y2: vector[1][1]
                };
            }

            gradientOptions.id = gradient.id || L.stamp(gradient);

            if (options.gradientUnits) {
                gradient.setAttribute('gradientUnits', options.gradientUnits);
            }

            var stops = options.stops || [
                    {
                        offset: '0%',
                        style: {
                            color: 'rgb(255, 255, 255)',
                            opacity: 1
                        }
                    },
                    {
                        offset: '60%',
                        style: {
                            color: layer.options.fillColor || layer.options.color,
                            opacity: 1
                        }
                    }
                ];

            var key;

            for (key in gradientOptions) {
                gradient.setAttribute(key, gradientOptions[key]);
            }

            var children = gradient.childNodes;
            var childLength = children ? children.length : 0;

            for (var i = 0, len = stops.length; i < len; ++i) {
                var stop = stops[i];
                var stopElement = childLength > i ? children[i] : L.SVG.create('stop');

                stop.style = stop.style || {};

                for (key in stop) {
                    var stopProperty = stop[key];

                    if (key === 'style') {
                        var styleProperty = '';

                        stopProperty.color = stopProperty.color || (layer.options.fillColor || layer.options.color);
                        stopProperty.opacity = typeof stopProperty.opacity === 'undefined' ? 1 : stopProperty.opacity;

                        for (var propKey in stopProperty) {
                            styleProperty += 'stop-' + propKey + ':' + stopProperty[propKey] + ';';
                        }

                        stopProperty = styleProperty;
                    }

                    stopElement.setAttribute(key, stopProperty);
                }

                if (childLength <= i) {
                    gradient.appendChild(stopElement);
                }
            }

            layer._gradient = gradient;
            return gradientOptions.id;
        },

        _createDropShadow: function (layer) {

            this._createDefs();

            var filter = layer._dropShadow || L.SVG.create('filter');
            var feOffset = filter.querySelector('feOffset') || L.SVG.create('feOffset');
            var feGaussianBlur = filter.querySelector('feGaussianBlur') || L.SVG.create('feGaussianBlur');
            var feBlend = filter.querySelector('feBlend') || L.SVG.create('feBlend');

            var options = layer.options.dropShadow && typeof(layer.options.dropShadow) === 'object' && Object.keys(layer.options.dropShadow).length > 0 ? layer.options.dropShadow : {
                width: '200%',
                height: '200%'
            };

            options.id = L.stamp(filter);

            for (var key in options) {
                filter.setAttribute(key, options[key]);
            }

            var offsetOptions = {
                result: 'offOut',
                'in': 'SourceAlpha',
                dx: '2',
                dy: '2'
            };

            var blurOptions = {
                result: 'blurOut',
                'in': 'offOut',
                stdDeviation: '2'
            };

            var blendOptions = {
                'in': 'SourceGraphic',
                in2: 'blurOut',
                mode: 'lighten'
            };

            for (key in offsetOptions) {
                feOffset.setAttribute(key, offsetOptions[key]);
            }

            for (key in blurOptions) {
                feGaussianBlur.setAttribute(key, blurOptions[key]);
            }

            for (key in blendOptions) {
                feBlend.setAttribute(key, blendOptions[key]);
            }

            filter.id = options.id;

            if (!layer._dropShadow) {
                filter.appendChild(feOffset);
                filter.appendChild(feGaussianBlur);
                filter.appendChild(feBlend);
            }

            layer._dropShadow = filter;

            return L.stamp(filter);
        },

        _createCustomElement: function (tag, attributes) {
            var element = L.SVG.create(tag);
            element.setAttribute('id', L.stamp(element));

            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    element.setAttribute(key, attributes[key]);
                }
            }

            return element;
        },

        _createImage: function (imageOptions) {
            var image = L.SVG.create('image');
            image.setAttribute('id', L.stamp(image));
            image.setAttribute('width', imageOptions.width);
            image.setAttribute('height', imageOptions.height);
            image.setAttribute('x', imageOptions.x || 0);
            image.setAttribute('y', imageOptions.y || 0);
            image.setAttribute('preserveAspectRatio', imageOptions.preserveAspectRatio || 'xMidYMid meet');
            image.setAttributeNS(L.Path.XLINK_NS, 'xlink:href', imageOptions.url);

            return image;
        },

        _createPattern: function (patternOptions) {
            var pattern = L.SVG.create('pattern');
            pattern.setAttribute('id', L.stamp(pattern));
            pattern.setAttribute('width', patternOptions.width);
            pattern.setAttribute('height', patternOptions.height);
            pattern.setAttribute('x', patternOptions.x || 0);
            pattern.setAttribute('y', patternOptions.y || 0);
            pattern.setAttribute('patternUnits', patternOptions.patternUnits || 'objectBoundingBox');
            return pattern;
        },

        _createShape: function (type, shapeOptions) {
            var shape = this._createCustomElement(type, shapeOptions);
            return shape;
        },

        _createFillPattern: function (layer) {
            this._createDefs();

            var patternOptions = L.extend({}, layer.options.fillPattern);
            var pattern = this._createPattern(patternOptions.pattern);

            var imageOptions = L.extend({
                url: patternOptions.url
            }, patternOptions.image);
            var image = this._createImage(imageOptions);

            pattern.appendChild(image);

            if (layer._fillPattern) {
                L.DomUtil.remove(layer._fillPattern);
            }
            layer._fillPattern = pattern;

            return L.stamp(pattern);
        },

        _getDefaultDiameter: function (radius) {
            return 1.75 * radius;
        },

        // Added for image circle
        _createShapeImage: function (layer) {
            this._createDefs();

            var imageOptions = layer.options.shapeImage || {};

            var radius = layer.options.radius || Math.max(layer.options.radiusX, layer.options.radiusY);
            var diameter = layer._getDefaultDiameter ? layer._getDefaultDiameter(radius) : this._getDefaultDiameter(radius);
            var imageSize = imageOptions.imageSize || new L.Point(diameter, diameter);

            var circleSize = imageOptions.radius || diameter / 2;

            var shapeOptions = imageOptions.shape || {
                circle: {
                    r: circleSize,
                    cx: 0,
                    cy: 0
                }
            };

            var patternOptions = imageOptions.pattern || {
                width: imageSize.x,
                height: imageSize.y,
                x: 0,
                y: 0
            };

            patternOptions.patternUnits = patternOptions.patternUnits || 'objectBoundingBox';

            var pattern = this._createPattern(patternOptions);
            L.stamp(pattern);

            var shapeKeys = Object.keys(shapeOptions);
            var shapeType = shapeKeys.length > 0 ? shapeKeys[0] : 'circle';

            shapeOptions[shapeType].fill = 'url(#' + L.stamp(pattern) + ')';

            var shape = this._createShape(shapeType, shapeOptions[shapeType]);

            if (layer.options.interactive) {
                shape.setAttribute('class', 'leaflet-interactive');
            }

            imageOptions = imageOptions.image || {
                width: imageSize.x,
                height: imageSize.y,
                x: 0,
                y: 0,
                url: layer.options.imageCircleUrl
            };

            var image = this._createImage(imageOptions);
            image.setAttributeNS(L.Path.XLINK_NS, 'xlink:href', imageOptions.url);

            pattern.appendChild(image);

            if (layer._shapePattern) {
                L.DomUtil.remove(layer._shapePattern);
            }
            if (layer._shape) {
                L.DomUtil.remove(layer._shape);
            }

            layer._shapePattern = pattern;
            layer._shape = shape;

            return L.stamp(pattern);
        },

        _updateStyle: function (layer) {
            this.__updateStyle.call(this, layer);

            var guid;

            if (layer._path) {
                if (layer.options.text) {
                    layer._renderer._createText(layer);
                }

                if (layer.options.markers) {
                    for (var key in layer.options.markers) {
                        if (layer.options.markers.hasOwnProperty(key)) {
                            this._createMarker(layer, key, layer.options.markers[key]);
                            layer._path.setAttribute('marker-' + key, 'url(#' + layer._markers[key].getAttribute('id') + ')');
                        }
                    }
                }

                if (layer.options.gradient) {
                    guid = this._createGradient(layer);

                    if (layer.options.stroke && !layer.options.fill) {
                        layer._path.setAttribute('stroke', 'url(#' + guid + ')');
                    }
                    else {
                        layer._path.setAttribute('fill', 'url(#' + guid + ')');
                    }
                }
                else if (!layer.options.fill) {
                    layer._path.setAttribute('fill', 'none');
                }

                if (layer.options.dropShadow) {
                    guid = this._createDropShadow(layer);

                    layer._path.setAttribute('filter', 'url(#' + guid + ')');
                }
                else {
                    layer._path.removeAttribute('filter');
                }

                if (layer.options.fillPattern) {
                    guid = this._createFillPattern(layer);
                    layer._path.setAttribute('fill', 'url(#' + guid + ')');
                }
            }

            if (layer._applyCustomStyles) {
                layer._applyCustomStyles();
            }

            if (layer._gradient) {
                this._defs.appendChild(layer._gradient);
            }
            if (layer._dropShadow) {
                this._defs.appendChild(layer._dropShadow);
            }
            if (layer._fillPattern) {
                this._defs.appendChild(layer._fillPattern);
            }
            if (layer._shapePattern) {
                this._defs.appendChild(layer._shapePattern);
            }
            if (layer._shape && layer._path) {
                this._container.firstChild.insertBefore(layer._shape, layer._path.nextSibling);
            }

            if (layer.options.wordCloud) {
                var options = layer.options.wordCloud;
                var me = this;

                if (options.words.length > 0) {
                    setTimeout(function () {
                        me._createWordCloudPattern(layer);
                    }, 0);
                }
            }
        },

        _createWordCloudPattern: function (layer) {
            var wordCloudOptions = layer.options.wordCloud || {};
            var patternGuid = '';
            var patternOptions = wordCloudOptions.patternOptions || {};

            if (!this._defs) {
                this._createDefs();
            }

            wordCloudOptions.textField = wordCloudOptions.textField || 'key';
            wordCloudOptions.countField = wordCloudOptions.countField || 'doc_count';

            for (var i = 0, len = wordCloudOptions.words.length; i < len; ++i) {
                var word = wordCloudOptions.words[i];

                patternGuid += word[wordCloudOptions.textField] + "_" + word[wordCloudOptions.countField];
            }

            if (patternGuid !== layer._wordCloudGuid && layer._path) {
                layer._wordCloudGuid = patternGuid;

                // Hash words to see if we need to create a new word cloud pattern or use the existing one
                var clonedPath = L.SVG.create('path');
                clonedPath.setAttribute('d', layer._path.getAttribute('d'));
                clonedPath.setAttribute('id', patternGuid);

                patternOptions.id = patternGuid;
                patternOptions.patternUnits = patternOptions.patternUnits || 'userSpaceOnUse';

                var bbox = layer.getBounds();

                var bounds = new L.Bounds(this._map.project(bbox.getNorthWest()), this._map.project(bbox.getSouthEast()));
                var ratio = bounds.getSize().x / bounds.getSize().y;

                patternOptions.width = patternOptions.width || 500;
                patternOptions.height = patternOptions.height || (500 * ratio) || 500;

                patternOptions.width = Math.min(patternOptions.width, patternOptions.height);
                patternOptions.height = patternOptions.width;

                layer._wordCloud = L.SVG.create('g');
                layer._wordPattern = this._createPattern(patternOptions);
                layer._wordPattern.id = patternGuid;
                layer._wordPattern.appendChild(layer._wordCloud);

                this._defs.appendChild(layer._wordPattern);

                this._createWordCloud(layer, layer._wordCloud, wordCloudOptions);
            }

            if (layer._path) {
                var existingFill = layer._path.getAttribute('fill');

                if (existingFill.indexOf(layer._wordCloudGuid) === -1) {
                    layer._path.setAttribute('fill', 'url(#' + layer._wordCloudGuid + ')');
                }
            }

        },

        _createWordCloud: function (layer, element, wordCloudOptions) {
            var width = wordCloudOptions.patternOptions.width;
            var height = wordCloudOptions.patternOptions.height;
            var words = wordCloudOptions.words;
            var anchor = this.getTextAnchor(layer);
            var rect = L.SVG.create('rect');
            var countField = wordCloudOptions.countField;
            var textField = wordCloudOptions.textField;
            var rotation = wordCloudOptions.rotation || function (d) {
                return 0;
            };
            rect.setAttribute('width', width);
            rect.setAttribute('height', height);
            rect.style.fill = layer.options.fillColor || '#000';
            rect.setAttribute('transform', "translate(" + -width / 2 + ',' + -height / 2 + ")");
            element.appendChild(rect);

            var draw = function (words, element) {
                return function (words) {
                    var id = "svg" + L.Util.guid();
                    d3.select(element)
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                        .selectAll("text")
                        .data(words)
                        .enter().append("text")
                        .style("font-size", function (d) {
                            return d.size + "px";
                        })
                        .style("font-family", wordCloudOptions.fontFamily || 'Impact')
                        .style("fill", function (d, i) {
                            return fill(i);
                        })
                        .attr("text-anchor", "middle")
                        .attr("transform", function (d) {
                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                        })
                        .text(function (d) {
                            return d[textField];
                        });
                };
            };

            var fill = wordCloudOptions.textFillColor || d3.scale.category20();
            var scale = d3.scale.linear();

            var max = words[0][countField];
            var min = words[words.length - 1][countField];

            var fontSize = wordCloudOptions.fontSize || d3.scale.log().domain([min, max]).range([10, 40]);

            scale.domain([0, 10]).range([-60, 60]);

            d3.layout.cloud().size([width, height])
                .spiral('rectangular')
                .timeInterval(Infinity)
                .words(words)
                .padding(5)
                .rotate(rotation)
                .font(wordCloudOptions.fontFamily || 'Impact')
                .fontSize(function (d) {
                    return fontSize(d[countField]);
                })
                .on("end", draw(words, element))
                .start();

            return element;

        }
    };

    /**
     * Extend L.Polyline with an alternative getCenter method.  The current getCenter method
     * doesn't account for the case where you have a line with the same starting/ending point
     */
    L.PolylineFunctions = {
        _getCenter: L.Polyline.prototype.getCenter,
        getCenter: function () {
            var centerPoint = this._getCenter.call(this);

            if (!centerPoint) {
                centerPoint = this._latlngs[0];
            }

            return centerPoint;
        },
        _buildDistanceIndex: function () {
            if (!this._index) {
                var latlngs = this._latlngs;
                var total = 0.0;

                this._index = [0.0];

                for (var i = 0, len = latlngs.length; i < len - 1; ++i) {
                    total += latlngs[i].distanceTo(latlngs[i + 1]);
                    this._index.push(total);
                }

                this._totalDistance = total;
            }
            return this;
        },
        _clearDistanceIndex: function () {
            this._totalDistance = 0.0;
            this._index = null;
            return this;
        },
        _distanceToPoints: function (latlngs, distance) {
            var points = null;

            if (distance >= this._totalDistance) {
                points = [latlngs[latlngs.length - 1], latlngs[latlngs.length - 1]];
            }
            else {
                for (var i = 0, len = this._index.length; i < len - 1; ++i) {
                    if (distance >= this._index[i] && distance < this._index[i + 1]) {
                        points = [latlngs[i], latlngs[i + 1]];
                        break;
                    }
                }
            }

            return points;
        },
        _getInterpolator: function (points) {
            return new L.LinearFunction([points[0].lng, points[0].lat], [points[1].lng, points[1].lat]);
        },
        animateLine: function (options) {
            var updater = function (latlngs) {
                return function (layer, points, interpolatedPoint) {
                    var index = latlngs.indexOf(points[0]);
                    layer.setLatLngs(latlngs.slice(0, index + 1).concat(new L.LatLng(interpolatedPoint.y, interpolatedPoint.x)));
                };
            };

            L.AnimationUtils.animateLine(this, L.extend({}, {
                update: updater(this._latlngs.slice())
            }, options));
        }
    };

    L.extend(L.Polyline.prototype, L.PolylineFunctions);

    L.Polyline.prototype.getTextAnchor = function () {
        var center = this.getCenter();

        return this._map.latLngToLayerPoint(center);
    };

    L.extend(L.SVG.prototype, L.TextFunctions, PathFunctions);

    /*
     * Rotates a point the provided number of degrees about another point.  Code inspired/borrowed from OpenLayers
     */
    L.Point.prototype.rotate = function (angle, point) {
        var radius = this.distanceTo(point);
        var theta = (angle * L.LatLng.DEG_TO_RAD) + Math.atan2(this.y - point.y, this.x - point.x);
        this.x = point.x + (radius * Math.cos(theta));
        this.y = point.y + (radius * Math.sin(theta));
    };

    /*
     * Let's override the default behavior of L.GeoJSON.asFeature, since it doesn't handle nested FeatureCollections
     */
    L.extend(L.GeoJSON, {
        asFeature: function (geoJSON) {
            if (geoJSON.type === 'Feature' || geoJSON.type === 'FeatureCollection') {
                return geoJSON;
            }

            return {
                type: 'Feature',
                properties: {},
                geometry: geoJSON
            };
        }
    });

    // Extend the L.TextFunctions above and change the __updatePath reference, since
    // _updatePath for a line/polygon is different than for a regular path
    L.LineTextFunctions = L.extend({}, L.TextFunctions);

    // Pulled from the Leaflet discussion here:  https://github.com/Leaflet/Leaflet/pull/1586
    // This is useful for getting a centroid/anchor point for centering text or other SVG markup
    L.LineTextFunctions.getCenter = function () {
        var latlngs = this._latlngs,
            len = latlngs.length,
            i, j, p1, p2, f, center;

        for (i = 0, j = len - 1, area = 0, lat = 0, lng = 0; i < len; j = i++) {
            p1 = latlngs[i];
            p2 = latlngs[j];
            f = p1.lat * p2.lng - p2.lat * p1.lng;
            lat += (p1.lat + p2.lat) * f;
            lng += (p1.lng + p2.lng) * f;
            area += f / 2;
        }

        center = area ? new L.LatLng(lat / (6 * area), lng / (6 * area)) : latlngs[0];
        center.area = area;

        return center;
    };

    L.extend(L.LatLng, {
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
    });

    /*
     * Rotates a point the provided number of degrees about another point.  Code inspired/borrowed from OpenLayers
     */
    L.Point.prototype.rotate = function (angle, point) {
        var radius = this.distanceTo(point);
        var theta = (angle * L.LatLng.DEG_TO_RAD) + Math.atan2(this.y - point.y, this.x - point.x);
        this.x = point.x + (radius * Math.cos(theta));
        this.y = point.y + (radius * Math.sin(theta));
    };

    /*
     * Draws a Leaflet map marker using SVG rather than an icon, allowing the marker to be dynamically styled
     */
    L.RegularPolygonMarker = L.Path.extend({
        initialize: function (centerLatLng, options) {
            L.setOptions(this, options);

            this._latlng = centerLatLng;

            this.options.numberOfSides = Math.max(this.options.numberOfSides, 3);
        },

        options: {
            fill: true,
            radiusX: 10,
            radiusY: 10,
            rotation: 0,
            numberOfSides: 3,
            position: {
                x: 0,
                y: 0
            },
            maxDegrees: 360,
            gradient: true,
            dropShadow: false,
            interactive: true
        },

        setLatLng: function (latlng) {
            this._latlng = latlng;
            return this.redraw();
        },

        projectLatLngs: function () {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._points = this._getPoints(this._point, false, this.options);

            if (this.options.innerRadius || (this.options.innerRadiusX && this.options.innerRadiusY)) {
                this._innerPoints = this._getPoints(this._point, true, this.options).reverse();
            }
        },

        _project: function () {
            this.projectLatLngs();
            this._updateBounds();
        },

        _updateBounds: function () {
            var map = this._map,
                radiusX = this.options.radius || this.options.radiusX,
                radiusY = this.options.radius || this.options.radiusY,
                deltaX = radiusX * Math.cos(Math.PI / 4),
                deltaY = radiusY * Math.sin(Math.PI / 4),
                point = map.project(this._latlng),
                swPoint = new L.Point(point.x - deltaX, point.y + deltaY),
                nePoint = new L.Point(point.x + deltaX, point.y - deltaY);
            this._pxBounds = new L.Bounds(swPoint, nePoint);
        },

        _update: function () {
            if (this._map) {
                this._renderer._setPath(this, this.getPathString());
            }
        },

        getBounds: function () {
            var map = this._map,
                radiusX = this.options.radius || this.options.radiusX,
                radiusY = this.options.radius || this.options.radiusY,
                deltaX = radiusX * Math.cos(Math.PI / 4),
                deltaY = radiusY * Math.sin(Math.PI / 4),
                point = map.project(this._latlng),
                swPoint = new L.Point(point.x - deltaX, point.y + deltaY),
                nePoint = new L.Point(point.x + deltaX, point.y - deltaY),
                sw = map.unproject(swPoint),
                ne = map.unproject(nePoint);

            return new L.LatLngBounds(sw, ne);
        },

        setRadius: function (radius) {
            this.options.radius = radius;
            return this.redraw();
        },

        setRadiusXY: function (radiusX, radiusY) {
            this.options.radius = null;
            this.options.radiusX = radiusX;
            this.options.radiusY = radiusY;
            return this.redraw();
        },

        setInnerRadius: function (innerRadius) {
            this.options.innerRadius = innerRadius;
            return this.redraw();
        },

        setInnerRadiusXY: function (innerRadiusX, innerRadiusY) {
            this.options.innerRadius = null;
            this.options.innerRadiusX = innerRadiusX;
            this.options.innerRadiusY = innerRadiusY;
            return this.redraw();
        },

        setRotation: function (rotation) {
            this.options.rotation = rotation;
            return this.redraw();
        },

        setNumberOfSides: function (numberOfSides) {
            this.options.numberOfSides = numberOfSides;
            return this.redraw();
        },

        getLatLng: function () {
            return this._latlng;
        },

        getPathString: function () {
            var anchorPoint = this.getTextAnchor();

            if (this._shape) {
                if (this._shape.tagName === 'circle' || this._shape.tagName === 'ellipse') {
                    this._shape.setAttribute('cx', anchorPoint.x);
                    this._shape.setAttribute('cy', anchorPoint.y);
                }
                else {
                    var width = this._shape.getAttribute('width');
                    var height = this._shape.getAttribute('height');
                    this._shape.setAttribute('x', anchorPoint.x - Number(width) / 2);
                    this._shape.setAttribute('y', anchorPoint.y - Number(height) / 2);
                }
            }

            if (this._path) {
                this._path.setAttribute('shape-rendering', 'geometricPrecision');
            }
            return new L.SVGPathBuilder(this._points, this._innerPoints).build(6);
        },

        getTextAnchor: function () {
            return this._point;
        },

        _getPoints: function (point, inner, options) {
            var maxDegrees = options.maxDegrees || 360;
            var angleSize = maxDegrees / Math.max(options.numberOfSides, 3);
            var degrees = maxDegrees;
            var angle = 0;
            var points = [];
            var newPoint;
            var angleRadians;
            var radiusX = !inner ? options.radius || options.radiusX : options.innerRadius || options.innerRadiusX;
            var radiusY = !inner ? options.radius || options.radiusY : options.innerRadius || options.innerRadiusY;

            var toRad = function (number) {
                return number * L.LatLng.DEG_TO_RAD;
            };

            while (angle < degrees) {

                angleRadians = toRad(angle);

                // Calculate the point the radius pixels away from the center point at the
                // given angle;
                newPoint = this._getPoint(point, angleRadians, radiusX, radiusY, options);

                // Add the point to the latlngs array
                points.push(newPoint);

                // Increment the angle
                angle += angleSize;
            }

            return points;
        },

        _getPoint: function (point, angle, radiusX, radiusY, options) {
            var startPoint = options.position ? point.add(new L.Point(options.position.x, options.position.y)) : point;
            var newPoint = new L.Point(startPoint.x + radiusX * Math.cos(angle), startPoint.y + radiusY * Math.sin(angle));

            newPoint.rotate(options.rotation, startPoint);

            return newPoint;
        },

        _getDefaultDiameter: function (radius) {
            var angle = Math.PI / this.options.numberOfSides;
            var minLength = radius * Math.cos(angle);

            return 1.75 * minLength;
        },

        _applyCustomStyles: function () {
            // Added for image circle
            if (this.options.shapeImage || this.options.imageCircleUrl) {
                this._renderer._createShapeImage(this);
            }
        },

        toGeoJSON: function () {
            var geoJSON = L.Marker.prototype.toGeoJSON.call(this);

            geoJSON.properties = this.options;

            return geoJSON;
        }
    });

    // Displays a star on the map
    L.StarMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfPoints: 5,
            rotation: -15.0,
            maxDegrees: 360,
            gradient: true,
            dropShadow: true
        },

        setNumberOfPoints: function (numberOfPoints) {
            this.options.numberOfPoints = numberOfPoints;
            return this.redraw();
        },

        _getPoints: function (point, inner, options) {
            var maxDegrees = options.maxDegrees || 360;
            var angleSize = maxDegrees / options.numberOfPoints;
            var degrees = maxDegrees;
            var angle = 0;
            var points = [];
            var newPoint, newPointInner;
            var angleRadians;
            var radiusX = !inner ? options.radius || options.radiusX : options.innerRadius || options.innerRadiusX;
            var radiusY = !inner ? options.radius || options.radiusY : options.innerRadius || options.innerRadiusY;

            var toRad = function (number) {
                return number * L.LatLng.DEG_TO_RAD;
            };

            while (angle < degrees) {

                angleRadians = toRad(angle);

                // Calculate the point the radius meters away from the center point at the
                // given angle;
                newPoint = this._getPoint(point, angleRadians, radiusX, radiusY, options);
                newPointInner = this._getPoint(point, angleRadians + toRad(angleSize) / 2, radiusX / 2, radiusY / 2, options);

                // Add the point to the latlngs array
                points.push(newPoint);
                points.push(newPointInner);

                // Increment the angle
                angle += angleSize;
            }

            return points;
        }
    });

    L.starMarker = function (centerLatLng, options) {
        return new L.StarMarker(centerLatLng, options);
    };

    L.TriangleMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfSides: 3,
            rotation: 30.0,
            radius: 5
        }
    });

    L.triangleMarker = function (centerLatLng, options) {
        return new L.TriangleMarker(centerLatLng, options);
    };

    L.DiamondMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfSides: 4,
            radiusX: 5,
            radiusY: 10
        }
    });

    L.diamondMarker = function (centerLatLng, options) {
        return new L.DiamondMarker(centerLatLng, options);
    };

    L.SquareMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfSides: 4,
            rotation: 45.0,
            radius: 5
        }
    });

    L.squareMarker = function (centerLatLng, options) {
        return new L.SquareMarker(centerLatLng, options);
    };

    L.PentagonMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfSides: 5,
            rotation: -18.0,
            radius: 5
        }
    });

    L.pentagonMarker = function (centerLatLng, options) {
        return new L.PentagonMarker(centerLatLng, options);
    };

    L.HexagonMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfSides: 6,
            rotation: 30.0,
            radius: 5
        }
    });

    L.hexagonMarker = function (centerLatLng, options) {
        return new L.HexagonMarker(centerLatLng, options);
    };

    L.OctagonMarker = L.RegularPolygonMarker.extend({
        options: {
            numberOfSides: 8,
            rotation: 22.5,
            radius: 5
        }
    });

    L.octagonMarker = function (centerLatLng, options) {
        return new L.OctagonMarker(centerLatLng, options);
    };

    /*
     * Draws a Leaflet map marker using SVG rather than an icon, allowing the marker to be dynamically styled
     */
    L.MapMarker = L.Path.extend({

        // includes: L.TextFunctions,

        initialize: function (centerLatLng, options) {
            L.setOptions(this, options);
            this._latlng = centerLatLng;
        },

        options: {
            fill: true,
            fillOpacity: 1,
            opacity: 1,
            radius: 15,
            innerRadius: 5,
            position: {
                x: 0,
                y: 0
            },
            rotation: 0,
            numberOfSides: 50,
            color: '#000000',
            fillColor: '#0000FF',
            weight: 1,
            gradient: true,
            dropShadow: true,
            interactive: true
        },

        setLatLng: function (latlng) {
            this._latlng = latlng;
            return this.redraw();
        },

        projectLatLngs: function () {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._points = this._getPoints(this._point, false, this.options);

            if (this.options.innerRadius > 0) {
                this._innerPoints = this._getPoints(this._point, true, this.options).reverse();
            }
        },

        _project: function () {
            this.projectLatLngs();
            this._updateBounds();
        },

        _updateBounds: function () {
            var map = this._map,
                height = this.options.radius * 3,
                point = map.project(this._latlng),
                swPoint = new L.Point(point.x - this.options.radius, point.y),
                nePoint = new L.Point(point.x + this.options.radius, point.y - height);
            this._pxBounds = new L.Bounds(swPoint, nePoint);
        },

        _update: function () {
            if (this._map) {
                this._renderer._setPath(this, this.getPathString());
            }
        },

        getBounds: function () {
            var map = this._map,
                height = this.options.radius * 3,
                point = map.project(this._latlng),
                swPoint = new L.Point(point.x - this.options.radius, point.y),
                nePoint = new L.Point(point.x + this.options.radius, point.y - height),
                sw = map.unproject(swPoint),
                ne = map.unproject(nePoint);

            return new L.LatLngBounds(sw, ne);
        },

        getLatLng: function () {
            return this._latlng;
        },

        setRadius: function (radius) {
            this.options.radius = radius;
            return this.redraw();
        },

        setInnerRadius: function (innerRadius) {
            this.options.innerRadius = innerRadius;
            return this.redraw();
        },

        setRotation: function (rotation) {
            this.options.rotation = rotation;
            return this.redraw();
        },

        setNumberOfSides: function (numberOfSides) {
            this.options.numberOfSides = numberOfSides;
            return this.redraw();
        },

        getPathString: function () {
            var anchorPoint = this.getTextAnchor();

            if (this._shape) {
                if (this._shape.tagName === 'circle' || this._shape.tagName === 'ellipse') {
                    this._shape.setAttribute('cx', anchorPoint.x);
                    this._shape.setAttribute('cy', anchorPoint.y);
                }
                else {
                    var width = this._shape.getAttribute('width');
                    var height = this._shape.getAttribute('height');
                    this._shape.setAttribute('x', anchorPoint.x - Number(width) / 2);
                    this._shape.setAttribute('y', anchorPoint.y - Number(height) / 2);
                }
            }

            if (this._path) {
                this._path.setAttribute('shape-rendering', 'geometricPrecision');
            }

            return new L.SVGPathBuilder(this._points, this._innerPoints).build(6);
        },

        getTextAnchor: function () {
            var anchorPoint = this.options.position ? this._point.add(new L.Point(this.options.position.x, this.options.position.y)) : this._point;
            return new L.Point(anchorPoint.x, anchorPoint.y - 2 * this.options.radius);
        },

        _getPoints: function (point, inner, options) {
            var maxDegrees = !inner ? 210 : 360;
            var angleSize = !inner ? maxDegrees / 50 : maxDegrees / Math.max(options.numberOfSides, 3);
            var degrees = !inner ? maxDegrees : maxDegrees + options.rotation;
            var angle = !inner ? -30 : options.rotation;
            var points = [];
            var newPoint;
            var angleRadians;
            var radius = options.radius;
            var multiplier = Math.sqrt(0.75);

            var toRad = function (number) {
                return number * L.LatLng.DEG_TO_RAD;
            };

            var startPoint = options.position ? point.add(new L.Point(options.position.x, options.position.y)) : point;

            if (!inner) {
                points.push(startPoint);
                points.push(new L.Point(startPoint.x + multiplier * radius, startPoint.y - 1.5 * radius));
            }

            while (angle < degrees) {

                angleRadians = toRad(angle);

                // Calculate the point the radius pixels away from the center point at the
                // given angle;
                newPoint = this._getPoint(startPoint, angleRadians, radius, inner, options);

                // Add the point to the latlngs array
                points.push(newPoint);

                // Increment the angle
                angle += angleSize;
            }

            if (!inner) {
                points.push(new L.Point(startPoint.x - multiplier * radius, startPoint.y - 1.5 * radius));
            }

            return points;
        },

        _getPoint: function (point, angle, radius, inner, options) {
            var markerRadius = radius;

            radius = !inner ? radius : options.innerRadius;

            return new L.Point(point.x + radius * Math.cos(angle), point.y - 2 * markerRadius - radius * Math.sin(angle));
        },

        _applyCustomStyles: function () {
            // Added for image circle
            if (this.options.shapeImage || this.options.imageCircleUrl) {
                this._renderer._createShapeImage(this);
            }
        }
    });

    L.mapMarker = function () {
        return new L.MapMarker(latlng, options);
    };

    /*
     * Class for putting custom SVG on the map.  This is experimental and a little bit of a hack
     */
    L.SVGMarker = L.Path.extend({

        initialize: function (latlng, options) {
            L.setOptions(this, options);

            this._svg = options.svg || '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
            if (this._svg.indexOf("<") === 0) {
                this._data = (new DOMParser()).parseFromString(this._svg, 'text/xml');
            }

            this._latlng = latlng;
        },

        projectLatLngs: function () {
            this._point = this._map.latLngToLayerPoint(this._latlng);
        },

        _project: function () {
            this.projectLatLngs();
            this._updateBounds();
        },

        _updateBounds: function () {
            var map = this._map,
                radiusX = 200,
                radiusY = 200,
                deltaX = radiusX * Math.cos(Math.PI / 4),
                deltaY = radiusY * Math.sin(Math.PI / 4),
                point = map.project(this._latlng),
                swPoint = new L.Point(point.x - deltaX, point.y + deltaY),
                nePoint = new L.Point(point.x + deltaX, point.y - deltaY);
            this._pxBounds = new L.Bounds(swPoint, nePoint);
        },

        _update: function () {
            if (this._map && this._path) {
                this.updateSVG();
            }
        },

        setLatLng: function (latlng) {
            this._latlng = latlng;
            this.redraw();
        },

        getLatLng: function () {
            return this._latlng;
        },

        onAdd: function () {
            var me = this;
            this._renderer = this._map.getRenderer(this);
            if (!this._data) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        me._data = this.responseXML;
                        me._reset();
                        me.addSVG();
                        me.updateSVG();
                    }
                };
                xhr.open('GET', this._svg, true);
                xhr.send(null);
            }
            else {
                me._reset();
                me.addSVG();
                me.updateSVG();
            }


        },

        addSVG: function () {
            var me = this;
            var data = me._data;
            me._svgEl = data.nodeName.toLowerCase() === 'svg' ? data.cloneNode(true) : data.querySelector('svg').cloneNode(true);

            if (!me._g) {
                var g = L.SVG.create('g');
                me._g = g;
                me._g.id = L.stamp(me._g);
                me._svgEl.id = L.stamp(me._svgEl);
                me._g.appendChild(me._svgEl);

                me._path = me._g;

                me._renderer._rootGroup.appendChild(me._path);
                me.addInteractiveTarget(me._path);

                if (me.options.interactive) {
                    L.DomUtil.addClass(me._g, 'leaflet-interactive');

                    var interact = function (node) {
                        var children = node.childNodes;

                        if (node.id) {
                            node.id = L.stamp(node);
                        }

                        if (children) {
                            for (var i = 0, len = children.length; i < len; ++i) {
                                interact(children[i]);
                            }
                        }
                    };

                    interact(me._svgEl);

                }
            }
        },

        updateSVG: function () {
            var me = this;

            var options = me.options || {};
            me._g.setAttribute('pointer-events', options.pointerEvents || (options.interactive ? 'visiblePainted' : 'none'));

            if (options.setStyle) {
                options.setStyle.call(me, me._svgEl);
            }

            var elementWidth = me._svgEl.getAttribute('width');
            var elementHeight = me._svgEl.getAttribute('height');

            var width = elementWidth ? elementWidth.replace('px', '') : '100%';
            var height = elementHeight ? elementHeight.replace('px', '') : '100%';

            // If the width is 100% (meaning that no width is provided), then set the width and height to the size specified in the options
            if (width === '100%') {
                width = options.size.x;
                height = options.size.y;

                me._svgEl.setAttribute('width', width + (String(width).indexOf('%') !== -1 ? '' : 'px'));
                me._svgEl.setAttribute('height', height + (String(height).indexOf('%') !== -1 ? '' : 'px'));
            }

            var size = options.size || new L.Point(width, height);

            var scaleSize = new L.Point(size.x / width, size.y / height);
            var transforms = [];
            var anchor = options.anchor || new L.Point(-size.x / 2, -size.y / 2);
            var x = me._point.x + anchor.x;
            var y = me._point.y + anchor.y;

            transforms.push('translate(' + x + ' ' + y + ')');
            transforms.push('scale(' + scaleSize.x + ' ' + scaleSize.y + ')');

            if (me.options.rotation) {
                transforms.push('rotate(' + options.rotation + ' ' + (width / 2) + ' ' + (height / 2) + ')');
            }

            me._g.setAttribute('transform', transforms.join(' '));
        },

        getElement: function () {
            return me._g;
        },

        redraw: function () {
            if (this._map && this._path) {
                this._renderer._updatePath(this);
            }
            return this;
        },

        toGeoJSON: function () {
            return L.Util.pointToGeoJSON.call(this);
        }

    });

    L.svgMarker = function (latlng, options) {
        return new L.SVGMarker(latlng, options);
    };

    /*
     * A FeatureGroup with setLatLng and getLatLng methods
     */
    L.MarkerGroup = L.FeatureGroup.extend({
        initialize: function (latlng, markers) {
            L.FeatureGroup.prototype.initialize.call(this, markers);

            this.setLatLng(latlng);
        },

        setStyle: function (style) {
            return this;
        },

        setLatLng: function (latlng) {
            this._latlng = latlng;
            this.eachLayer(function (layer) {
                if (layer.setLatLng) {
                    layer.setLatLng(latlng);
                }
            });

            return this;
        },

        getLatLng: function (latlng) {
            return this._latlng;
        },

        toGeoJSON: function () {
            var featureCollection = {
                type: 'FeatureCollection',
                features: []
            };

            var eachLayerFunction = function (featureCollection) {
                return function (layer) {
                    featureCollection.features.push(L.Util.pointToGeoJSON.call(layer));
                };
            };

            this.eachLayer(eachLayerFunction(featureCollection));

            return featureCollection;
        }
    });

    L.markerGroup = function (latlng, markers) {
        return new L.MarkerGroup(latlng, markers);
    };
    
}(window, document));;/*
 * Class for a drawing a bar marker on the map.  This is the basis for the BarChartMarker
 */

(function (window, document, undefined) {
	L.BarMarker = L.Path.extend({
	    initialize: function (centerLatLng, options) {
	        L.setOptions(this, options);

	        this._latlng = centerLatLng;
	    },

	    options: {
	        fill: true,
	        width: 2,
	        maxHeight: 10,
	        position: {
	            x: 0,
	            y: 0
	        },
	        weight: 1,
	        color: '#000',
	        opacity: 1.0,
	        gradient: true,
	        dropShadow: false,
	        lineCap: 'square',
	        lineJoin: 'miter'
	    },

	    setLatLng: function (latlng) {
	        this._latlng = latlng;
	        return this.redraw();
	    },

	    _project: function () {
	        this._point = this._map.latLngToLayerPoint(this._latlng);
	        this._points = this._getPoints();
	    },

	    _update: function () {
	        if (!this._map) {
	            return;
	        }
	        if (this._map) {
	            this._renderer._setPath(this, this.getPathString());
	        }
	    },

	    getBounds: function () {
	        var map = this._map,
	            point = map.project(this._latlng),
	            halfWidth = this.options.width / 2,
	            swPoint = new L.Point(point.x - halfWidth, point.y),
	            nePoint = new L.Point(point.x + halfWidth, point.y - this.options.maxHeight),
	            sw = map.unproject(swPoint),
	            ne = map.unproject(nePoint);

	        return new L.LatLngBounds(sw, ne);
	    },

	    getLatLng: function () {
	        return this._latlng;
	    },

	    getPathString: function () {
	        this._path.setAttribute('shape-rendering', 'crispEdges');
	        return new L.SVGPathBuilder(this._points).build();
	    },

	    _getPoints: function () {

	        var points = [];
	        var startX = this._point.x + this.options.position.x;
	        var startY = this._point.y + this.options.position.y;
	        var halfWidth = this.options.width / 2;
	        var sePoint, nePoint, nwPoint, swPoint;
	        var height = this.options.value / this.options.maxValue * this.options.maxHeight;

	        sePoint = new L.Point(startX + halfWidth, startY);
	        nePoint = new L.Point(startX + halfWidth, startY - height);
	        nwPoint = new L.Point(startX - halfWidth, startY - height);
	        swPoint = new L.Point(startX - halfWidth, startY);

	        points = [sePoint, nePoint, nwPoint, swPoint];

	        return points;
	    }

	});

	L.barMarker = function (centerLatLng, options) {
	    return new L.BarMarker(centerLatLng, options);
	};

	/*
	 * Base class for all chart markers.  This class should be extended by any chart marker class (e.g. BarChartMarker, PieChartMarker, etc.)
	 */
	L.ChartMarker = L.FeatureGroup.extend({
	    initialize: function (centerLatLng, options) {
	        L.Util.setOptions(this, options);

	        this._layers = {};
	        this._latlng = centerLatLng;

	        this._loadComponents();
	    },

	    setLatLng: function (latlng) {
	        this._latlng = latlng;
	        return this.redraw();
	    },

	    getLatLng: function () {
	        return this._latlng;
	    },

	    _loadComponents: function () {
	        // TODO: Override this in subclasses
	    },

	    _highlight: function (options) {
	        if (options.weight) {
	            options.weight *= 2;
	        }

	        return options;
	    },

	    _unhighlight: function (options) {
	        if (options.weight) {
	            options.weight /= 2;
	        }

	        return options;
	    },

	    _bindMouseEvents: function (chartElement) {
	        var self = this;
	        var tooltipOptions = this.options.tooltipOptions;

	        chartElement.on('mouseover', function (e) {
	            var currentOptions = this.options;
	            var key = currentOptions.key;
	            var value = currentOptions.value;
	            var layerPoint = e.layerPoint;
	            var x = layerPoint.x - this._point.x;
	            var y = layerPoint.y - this._point.y;
	            var iconSize = currentOptions.iconSize;
	            var newX = x;
	            var newY = y;
	            var newPoint;
	            var offset = 5;

	            if (iconSize) {
	                newX = x < 0 ? iconSize.x - x + offset : -x - offset;
	                newY = y < 0 ? iconSize.y - y + offset : -y - offset;

	                newPoint = new L.Point(newX, newY);
	            }

	            var legendOptions = {};
	            var displayText = currentOptions.displayText ? currentOptions.displayText(value) : value;

	            legendOptions[key] = {
	                name: currentOptions.displayName,
	                value: displayText
	            };

	            var icon = new L.LegendIcon(legendOptions, currentOptions, {
	                className: 'leaflet-div-icon',
	                iconSize: tooltipOptions ? tooltipOptions.iconSize : iconSize,
	                iconAnchor: newPoint || new L.Point(-5, 0)
	            });

	            currentOptions.marker = new L.Marker(self._latlng, {
	                icon: icon
	            });

	            currentOptions = self._highlight(currentOptions);

	            this.initialize(self._latlng, currentOptions);
	            this.redraw();
	            this.setStyle(currentOptions);

	            self.addLayer(currentOptions.marker);
	        });

	        chartElement.on('mouseout', function (e) {
	            var currentOptions = this.options;

	            currentOptions = self._unhighlight(currentOptions);

	            this.initialize(self._latlng, currentOptions);
	            this.redraw();
	            this.setStyle(currentOptions);

	            self.removeLayer(currentOptions.marker);
	        });
	    },

	    bindPopup: function (content, options) {
	        this.eachLayer(function (layer) {
	            layer.bindPopup(content, options);
	        });
	    },

	    openPopup: function (latlng) {
	        for (var i in this._layers) {
	            var layer = this._layers[i];
	            latlng = latlng || this._latlng;
	            layer.openPopup(latlng);
	            break;
	        }
	    },

	    closePopup: function () {
	        for (var i in this._layers) {
	            var layer = this._layers[i];
	            latlng = latlng || this._latlng;
	            layer.closePopup();
	            break;
	        }
	    },

	    redraw: function () {
	        this.clearLayers();
	        this._loadComponents();
	    },

	    toGeoJSON: function () {
	        /*
	        var geoJSON = L.Marker.prototype.toGeoJSON.call(this);

	        geoJSON.properties = this.options;

	        return geoJSON;
	        */
	        return L.Util.pointToGeoJSON.call(this);
	    }
	});

	/*
	 * 
	 */
	L.BarChartMarker = L.ChartMarker.extend({
	    initialize: function (centerLatLng, options) {
	        L.setOptions(this, options);

	        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
	    },

	    options: {
	        weight: 1,
	        opacity: 1,
	        color: '#000',
	        fill: true,
	        position: {
	            x: 0,
	            y: 0
	        },
	        width: 10,
	        offset: 0,
	        iconSize: new L.Point(50, 40)
	    },

	    _loadComponents: function () {
	        var value, minValue, maxValue;
	        var bar;
	        var options = L.extend({}, this.options);
	        var x;
	        var y;
	        var keys = Object.keys(this.options.data);
	        var count = keys.length;
	        var width = this.options.width;
	        var offset = this.options.offset || 0;
	        var data = this.options.data;
	        var chartOptions = this.options.chartOptions;
	        var chartOption;

	        x = -((width * count) + (offset * (count - 1))) / 2 + width / 2;
	        y = 0;

	        // Iterate through the data values
	        for (var key in data) {
	            value = data[key];
	            chartOption = chartOptions[key];

	            minValue = chartOption.minValue || 0;
	            maxValue = chartOption.maxValue || 100;

	            options.fillColor = chartOption.fillColor || this.options.fillColor;
	            options.value = value;
	            options.minValue = minValue;
	            options.maxValue = maxValue;
	            options.position = {
	                x: x,
	                y: y
	            };
	            options.width = width;
	            options.maxHeight = chartOption.maxHeight || 10;
	            options.key = key;
	            options.value = value;
	            options.displayName = chartOption.displayName;
	            options.opacity = this.options.opacity || 1.0;
	            options.fillOpacity = this.options.fillOpacity || 0.7;
	            options.weight = this.options.weight || 1;
	            options.color = chartOption.color || this.options.color;
	            options.displayText = chartOption.displayText;

	            bar = new L.BarMarker(this._latlng, options);

	            this._bindMouseEvents(bar);

	            this.addLayer(bar);

	            x += width + offset;
	        }
	    }
	});

	/*
	 * Draws a radial bar on the map.  Used by the RadialBarChartMarker, PieChartMarker, and CoxcombChartMarker
	 * to draw pie slices/radial bars
	 */
	L.RadialBarMarker = L.Path.extend({
	    initialize: function (centerLatLng, options) {
	        L.setOptions(this, options);

	        this._latlng = centerLatLng;
	    },

	    options: {
	        fill: true,
	        radius: 10,
	        rotation: 0,
	        numberOfSides: 30,
	        position: {
	            x: 0,
	            y: 0
	        },
	        gradient: true,
	        dropShadow: false
	    },

	    setLatLng: function (latlng) {
	        this._latlng = latlng;
	        return this.redraw();
	    },

	    _project: function () {
	        this._point = this._map.latLngToLayerPoint(this._latlng);
	        this._points = this._getPoints();
	    },

	    _update: function () {
	        if (!this._map) {
	            return;
	        }
	        if (this._map) {
	            this._renderer._setPath(this, this.getPathString());
	        }
	    },

	    getBounds: function () {
	        var map = this._map,
	            radiusX = this.options.radiusX || this.options.radius,
	            radiusY = this.options.radiusY || this.options.radius,
	            deltaX = radiusX * Math.cos(Math.PI / 4),
	            deltaY = radiusY * Math.sin(Math.PI / 4),
	            point = map.project(this._latlng),
	            swPoint = new L.Point(point.x - deltaX, point.y + deltaY),
	            nePoint = new L.Point(point.x + deltaX, point.y - deltaY),
	            sw = map.unproject(swPoint),
	            ne = map.unproject(nePoint);

	        return new L.LatLngBounds(sw, ne);
	    },

	    getLatLng: function () {
	        return this._latlng;
	    },

	    getPathString: function () {

	        var angle = this.options.endAngle - this.options.startAngle;
	        var largeArc = angle >= 180 ? '1' : '0';
	        var radiusX = this.options.radiusX || this.options.radius;
	        var radiusY = this.options.radiusY || this.options.radius;
	        var path = 'M' + this._points[0].x.toFixed(2) + ',' + this._points[0].y.toFixed(2) + 'A' + radiusX.toFixed(2) + ',' + radiusY.toFixed(2) + ' 0 ' + largeArc + ',1 ' + this._points[1].x.toFixed(2) + ',' + this._points[1].y.toFixed(2) + 'L';

	        if (this._innerPoints) {
	            path = path + this._innerPoints[0].x.toFixed(2) + ',' + this._innerPoints[0].y.toFixed(2);
	            path = path + 'A' + (radiusX - this.options.barThickness).toFixed(2) + ',' + (radiusY - this.options.barThickness).toFixed(2) + ' 0 ' + largeArc + ',0 ' + this._innerPoints[1].x.toFixed(2) + ',' + this._innerPoints[1].y.toFixed(2) + 'z';
	        }
	        else {
	            path = path + this._point.x.toFixed(2) + ',' + this._point.y.toFixed(2) + 'z';
	        }

	        if (L.Browser.vml) {
	            path = Core.SVG.path(path);
	        }

	        this._path.setAttribute('shape-rendering', 'geometricPrecision');

	        return path;

	    },

	    _getPoints: function () {

	        var angleDelta = this.options.endAngle - this.options.startAngle;
	        var degrees = this.options.endAngle + this.options.rotation;
	        var angle = this.options.startAngle + this.options.rotation;
	        var points = [];
	        var radiusX = 'radiusX' in this.options ? this.options.radiusX : this.options.radius;
	        var radiusY = 'radiusY' in this.options ? this.options.radiusY : this.options.radius;
	        var toRad = function (number) {
	            return number * L.LatLng.DEG_TO_RAD;
	        };

	        // Make sure degrees is defined
	        degrees = degrees || 0;

	        if (angleDelta === 360.0) {
	            degrees = degrees - 0.1;
	        }

	        var startRadians = toRad(angle);
	        var endRadians = toRad(degrees);

	        points.push(this._getPoint(startRadians, radiusX, radiusY));
	        points.push(this._getPoint(endRadians, radiusX, radiusY));

	        if (this.options.barThickness) {
	            this._innerPoints = [];
	            this._innerPoints.push(this._getPoint(endRadians, radiusX - this.options.barThickness, radiusY - this.options.barThickness));
	            this._innerPoints.push(this._getPoint(startRadians, radiusX - this.options.barThickness, radiusY - this.options.barThickness));
	        }

	        return points;
	    },

	    _getPoint: function (angle, radiusX, radiusY) {
	        return new L.Point(this._point.x + this.options.position.x + radiusX * Math.cos(angle), this._point.y + this.options.position.y + radiusY * Math.sin(angle));
	    }
	});

	L.radialBarMarker = function (centerLatLng, options) {
	    return new L.RadialBarMarker(centerLatLng, options);
	};

	/*
	 * Class for drawing a pie chart marker on the map
	 */
	L.PieChartMarker = L.ChartMarker.extend({
	    initialize: function (centerLatLng, options) {
	        L.Util.setOptions(this, options);

	        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
	    },

	    options: {
	        weight: 1,
	        opacity: 1,
	        color: '#000',
	        fill: true,
	        radius: 10,
	        rotation: 0,
	        numberOfSides: 50,
	        mouseOverExaggeration: 1.2,
	        maxDegrees: 360.0,
	        iconSize: new L.Point(50, 40)
	    },

	    _highlight: function (options) {
	        var oldRadiusX = options.radiusX;
	        var oldRadiusY = options.radiusY;
	        var oldBarThickness = options.barThickness;
	        options.oldBarThickness = oldBarThickness;
	        options.oldRadiusX = oldRadiusX;
	        options.oldRadiusY = oldRadiusY;
	        options.radiusX *= options.mouseOverExaggeration;
	        options.radiusY *= options.mouseOverExaggeration;
	        options.barThickness = options.radiusX - oldRadiusX + oldBarThickness;
	        return options;
	    },

	    _unhighlight: function (options) {
	        options.radiusX = options.oldRadiusX;
	        options.radiusY = options.oldRadiusY;
	        options.barThickness = options.oldBarThickness;
	        return options;
	    },

	    _loadComponents: function () {
	        var value;
	        var sum = 0;
	        var angle = 0;
	        var percentage = 0.0;
	        var maxDegrees = this.options.maxDegrees || 360.0;
	        var lastAngle = this.options.rotation;
	        var bar;
	        var options = this.options;
	        var data = this.options.data;
	        var chartOptions = this.options.chartOptions;
	        var chartOption;
	        var key;

	        var getValue = function (data, key) {
	            var value = 0.0;
	            if (data[key]) {
	                value = parseFloat(data[key]);
	            }
	            return value;
	        };

	        // Calculate the sum of the data values
	        for (key in data) {
	            value = getValue(data, key);
	            sum += value;
	        }

	        // Iterate through the data values
	        if (sum > 0) {
	            for (key in data) {
	                value = parseFloat(data[key]) || 0;
	                chartOption = chartOptions[key];
	                percentage = value / sum;

	                angle = percentage * maxDegrees;

	                options.startAngle = lastAngle;
	                options.endAngle = lastAngle + angle;

	                options.fillColor = chartOption.fillColor;
	                options.color = chartOption.color || '#000';
	                options.radiusX = this.options.radiusX || this.options.radius;
	                options.radiusY = this.options.radiusY || this.options.radius;
	                options.rotation = 0;

	                // Set the key and value for use later
	                options.key = key;
	                options.value = value;
	                options.displayName = chartOption.displayName;
	                options.displayText = chartOption.displayText;

	                bar = new L.RadialBarMarker(this._latlng, options);

	                this._bindMouseEvents(bar);

	                lastAngle = options.endAngle;

	                this.addLayer(bar);
	            }
	        }
	    }
	});

	L.pieChartMarker = function (centerLatLng, options) {
	    return new L.PieChartMarker(centerLatLng, options);
	};

	/*
	 * 
	 */
	L.CoxcombChartMarker = L.PieChartMarker.extend({
	    statics: {
	        SIZE_MODE_RADIUS: 'radius',
	        SIZE_MODE_AREA: 'area'
	    }
	});

	L.CoxcombChartMarker = L.CoxcombChartMarker.extend({
	    initialize: function (centerLatLng, options) {
	        L.Util.setOptions(this, options);

	        L.PieChartMarker.prototype.initialize.call(this, centerLatLng, options);
	    },

	    options: {
	        weight: 1,
	        opacity: 1,
	        color: '#000',
	        fill: true,
	        radius: 10,
	        rotation: 0,
	        numberOfSides: 50,
	        mouseOverExaggeration: 1.2,
	        maxDegrees: 360.0,
	        iconSize: new L.Point(50, 40),
	        sizeMode: L.CoxcombChartMarker.SIZE_MODE_AREA
	    },

	    _loadComponents: function () {
	        var value, minValue, maxValue;
	        var angle = 0;
	        var maxDegrees = this.options.maxDegrees || 360.0;
	        var lastAngle = this.options.rotation;
	        var bar;
	        var options = this.options;
	        var radiusX = 'radiusX' in this.options ? this.options.radiusX : this.options.radius;
	        var radiusY = 'radiusY' in this.options ? this.options.radiusY : this.options.radius;
	        var keys = Object.keys(this.options.data);
	        var count = keys.length;
	        var data = this.options.data;
	        var chartOptions = this.options.chartOptions;
	        var chartOption;

	        angle = maxDegrees / count;

	        var postProcess = function (value) {
	            return Math.sqrt(count * value / Math.PI);
	        };

	        // Iterate through the data values
	        for (var key in data) {
	            value = parseFloat(data[key]) || 0;
	            chartOption = chartOptions[key];

	            minValue = chartOption.minValue || 0;
	            maxValue = chartOption.maxValue;

	            // If the size mode is radius, then we'll just vary the radius proportionally to the value
	            if (this.options.sizeMode === L.CoxcombChartMarker.SIZE_MODE_RADIUS) {
	                var evalFunctionX = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, radiusX));
	                var evalFunctionY = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, radiusY));
	                options.radiusX = evalFunctionX.evaluate(value);
	                options.radiusY = evalFunctionY.evaluate(value);
	            }
	            else {
	                // Otherwise, we'll vary the area proportionally to the value and calculate the radius from the area value
	                var radius = Math.max(radiusX, radiusY);
	                var maxArea = (Math.PI * Math.pow(radius, 2)) / count;

	                var evalFunctionArea = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, maxArea), {
	                    postProcess: postProcess
	                });

	                options.radiusX = evalFunctionArea.evaluate(value);
	                options.radiusY = options.radiusX;
	            }

	            options.startAngle = lastAngle;
	            options.endAngle = lastAngle + angle;
	            options.fillColor = chartOption.fillColor;
	            options.color = chartOption.color || '#000';
	            options.rotation = 0;

	            // Set the key and value for use later
	            options.key = key;
	            options.value = value;
	            options.displayName = chartOption.displayName;
	            options.displayText = chartOption.displayText;

	            bar = new L.RadialBarMarker(this._latlng, options);

	            this._bindMouseEvents(bar);

	            lastAngle = options.endAngle;

	            this.addLayer(bar);
	        }
	    }
	});

	L.coxcombChartMarker = function (centerLatLng, options) {
	    return new L.CoxcombChartMarker(centerLatLng, options);
	};

	/*
	 * 
	 */
	L.RadialBarChartMarker = L.ChartMarker.extend({
	    initialize: function (centerLatLng, options) {
	        L.Util.setOptions(this, options);

	        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
	    },

	    options: {
	        weight: 1,
	        opacity: 1,
	        color: '#000',
	        fill: true,
	        radius: 10,
	        rotation: 0,
	        numberOfSides: 30,
	        offset: 2,
	        barThickness: 5,
	        maxDegrees: 360.0,
	        iconSize: new L.Point(50, 40)
	    },

	    _loadComponents: function () {
	        var value, minValue, maxValue;
	        var angle = this.options.rotation;
	        var maxDegrees = this.options.maxDegrees || 360.0;
	        var bar;
	        var options = this.options;
	        var lastRadiusX = this.options.radiusX || this.options.radius;
	        var lastRadiusY = this.options.radiusY || this.options.radius;
	        var data = this.options.data;
	        var chartOptions = this.options.chartOptions;
	        var chartOption;
	        var barThickness = this.options.barThickness || 4;
	        var offset = this.options.offset || 2;

	        // Iterate through the data values
	        for (var key in data) {
	            value = parseFloat(data[key]);
	            chartOption = chartOptions[key];

	            minValue = chartOption.minValue || 0;
	            maxValue = chartOption.maxValue || 100;

	            var angleFunction = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, maxDegrees));

	            angle = angleFunction.evaluate(value);

	            options.startAngle = this.options.rotation;
	            options.endAngle = this.options.rotation + angle;
	            options.fillColor = chartOption.fillColor;
	            options.radiusX = lastRadiusX;
	            options.radiusY = lastRadiusY;
	            options.barThickness = barThickness;
	            options.rotation = 0;
	            options.key = key;
	            options.value = value;
	            options.displayName = chartOption.displayName;
	            options.displayText = chartOption.displayText;
	            options.weight = this.options.weight || 1;

	            bar = new L.RadialBarMarker(this._latlng, options);

	            this._bindMouseEvents(bar);

	            this.addLayer(bar);

	            lastRadiusX += barThickness + offset;
	            lastRadiusY += barThickness + offset;

	        }
	    }
	});

	L.radialBarChartMarker = function (centerLatLng, options) {
	    return new L.RadialBarChartMarker(centerLatLng, options);
	};

	L.StackedRegularPolygonMarker = L.ChartMarker.extend({
	    options: {
	        iconSize: new L.Point(50, 40)
	    },

	    initialize: function (centerLatLng, options) {
	        L.Util.setOptions(this, options);

	        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
	    },

	    _loadComponents: function () {
	        var value;
	        var lastRadiusX = 0;
	        var lastRadiusY = 0;
	        var bar;
	        var options = this.options;
	        var data = this.options.data;
	        var chartOptions = this.options.chartOptions;
	        var chartOption;
	        var key;
			var minValue, maxValue, minRadius, maxRadius;

	        // Iterate through the data values
	        var bars = [];

	        for (key in data) {
	            value = parseFloat(data[key]);
	            chartOption = chartOptions[key];

	            minValue = chartOption.minValue || 0;
	            maxValue = chartOption.maxValue || 100;

	            // TODO:  Add support for x and y radii
	            minRadius = chartOption.minRadius || 0;
	            maxRadius = chartOption.maxRadius || 10;

	            options.fillColor = chartOption.fillColor || this.options.fillColor;
	            options.value = value;
	            options.minValue = minValue;
	            options.maxValue = maxValue;

	            var evalFunction = new L.LinearFunction(new L.Point(minValue, minRadius), new L.Point(maxValue, maxRadius));

	            var barThickness = evalFunction.evaluate(value);

	            options.radiusX = lastRadiusX + barThickness;
	            options.radiusY = lastRadiusY + barThickness;
	            options.innerRadiusX = lastRadiusX;
	            options.innerRadiusY = lastRadiusY;

	            options.key = key;
	            options.displayName = chartOption.displayName;
	            options.opacity = this.options.opacity || 1.0;
	            options.fillOpacity = this.options.fillOpacity || 0.7;
	            options.weight = this.options.weight || 1;
	            options.color = chartOption.color || this.options.color;
	            options.displayText = chartOption.displayText;

	            bar = new L.RegularPolygonMarker(this._latlng, options);

	            this._bindMouseEvents(bar);

	            lastRadiusX = options.radiusX;
	            lastRadiusY = options.radiusY;

	            if (this.options.drawReverse) {
	                bars.push(bar);
	            }
	            else {
	                this.addLayer(bar);
	            }
	        }

	        if (this.options.drawReverse) {
	            var item = bars.pop();

	            while (item) {
	                this.addLayer(item);
	                item = bars.pop();
	            }
	        }

	    }
	});

	/*
	 * 
	 */
	L.RadialMeterMarker = L.ChartMarker.extend({
	    initialize: function (centerLatLng, options) {
	        L.Util.setOptions(this, options);

	        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
	    },

	    options: {
	        weight: 1,
	        opacity: 1,
	        color: '#000',
	        fill: true,
	        radius: 10,
	        rotation: 180.0,
	        numberOfSides: 30,
	        offset: 2,
	        barThickness: 5,
	        maxDegrees: 180.0,
	        iconSize: new L.Point(50, 40),
	        backgroundStyle: {
	            fill: true,
	            fillColor: '#707070',
	            fillOpacity: 0.2,
	            opacity: 0.8,
	            color: '#505050'
	        }
	    },

	    _loadComponents: function () {
	        var value, minValue, maxValue;
	        var startAngle = this.options.rotation;
	        var maxDegrees = this.options.maxDegrees || 360.0;
	        var bar;
	        var options = this.options;
	        var radiusX = this.options.radiusX || this.options.radius;
	        var radiusY = this.options.radiusY || this.options.radius;
	        var data = this.options.data;
	        var chartOptions = this.options.chartOptions;
	        var chartOption;
	        var barThickness = this.options.barThickness || 4;
	        var lastAngle = startAngle;
	        var numSegments = this.options.numSegments || 10;
	        var angleDelta = maxDegrees / numSegments;
	        var displayOptions;

	        // Iterate through the data values
	        for (var key in data) {
	            value = parseFloat(data[key]);
	            chartOption = chartOptions[key];
	            displayOptions = this.options.displayOptions ? this.options.displayOptions[key] : {};

	            minValue = chartOption.minValue || 0;
	            maxValue = chartOption.maxValue || 100;

	            var range = maxValue - minValue;

	            var angle = (maxDegrees / range) * (value - minValue);

	            var endAngle = startAngle + angle;
	            var maxAngle = startAngle + maxDegrees;

	            var evalFunction = new L.LinearFunction(new L.Point(startAngle, minValue), new L.Point(maxAngle, maxValue));
	            var delta, evalValue;

	            while (lastAngle < endAngle) {
	                options.startAngle = lastAngle;

	                delta = Math.min(angleDelta, endAngle - lastAngle);

	                options.endAngle = lastAngle + delta;
	                options.fillColor = chartOption.fillColor;
	                options.radiusX = radiusX;
	                options.radiusY = radiusY;
	                options.barThickness = barThickness;
	                options.rotation = 0;
	                options.key = key;
	                options.value = value;
	                options.displayName = chartOption.displayName;
	                options.displayText = chartOption.displayText;

	                evalValue = evalFunction.evaluate(lastAngle + delta);

	                for (var displayKey in displayOptions) {
	                    options[displayKey] = displayOptions[displayKey].evaluate ? displayOptions[displayKey].evaluate(evalValue) : displayOptions[displayKey];
	                }

	                bar = new L.RadialBarMarker(this._latlng, options);

	                this._bindMouseEvents(bar);

	                this.addLayer(bar);

	                lastAngle += delta;
	            }

	            // Add a background
	            if (this.options.backgroundStyle) {
	                if (lastAngle < maxAngle) {

	                    delta = maxAngle - lastAngle;

	                    options.endAngle = lastAngle + delta;
	                    options.radiusX = radiusX;
	                    options.radiusY = radiusY;
	                    options.barThickness = barThickness;
	                    options.rotation = 0;
	                    options.key = key;
	                    options.value = value;
	                    options.displayName = chartOption.displayName;
	                    options.displayText = chartOption.displayText;

	                    options.fillColor = null;
	                    options.fill = false;
	                    options.gradient = false;

	                    for (var property in this.options.backgroundStyle) {
	                        options[property] = this.options.backgroundStyle[property];
	                    }

	                    evalValue = evalFunction.evaluate(lastAngle + delta);

	                    bar = new L.RadialBarMarker(this._latlng, options);

	                    this.addLayer(bar);
	                }
	            }
	        }
	    }
	});

}(window, document));