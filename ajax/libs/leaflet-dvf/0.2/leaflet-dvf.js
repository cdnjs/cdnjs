/*
 @preserve Leaflet Data Visualization Framework, a JavaScript library for creating thematic maps using Leaflet
 (c) 2013-2014, Scott Fairgrieve, HumanGeo
*/
L.LinearFunction = L.Class.extend({
    initialize: function(minPoint, maxPoint, options) {
        this.setOptions(options);
        this.setRange(minPoint, maxPoint);
    },
    _calculateParameters: function(minPoint, maxPoint) {
        if (this._xRange === 0) {
            this._slope = 0;
            this._b = minPoint.y;
        } else {
            this._slope = (maxPoint.y - minPoint.y) / this._xRange;
            this._b = minPoint.y - this._slope * minPoint.x;
        }
    },
    _arrayToPoint: function(array) {
        return {
            x: array[0],
            y: array[1]
        };
    },
    setOptions: function(options) {
        L.Util.setOptions(this, options);
        this._preProcess = this.options.preProcess;
        this._postProcess = this.options.postProcess;
    },
    getBounds: function() {
        var minX = Math.min(this._minPoint.x, this._maxPoint.x);
        var maxX = Math.max(this._minPoint.x, this._maxPoint.x);
        var minY = Math.min(this._minPoint.y, this._maxPoint.y);
        var maxY = Math.max(this._minPoint.y, this._maxPoint.y);
        return [ new L.Point(minX, minY), new L.Point(maxX, maxY) ];
    },
    setRange: function(minPoint, maxPoint) {
        minPoint = minPoint instanceof Array ? this._arrayToPoint(minPoint) : minPoint;
        maxPoint = maxPoint instanceof Array ? this._arrayToPoint(maxPoint) : maxPoint;
        this._minPoint = minPoint;
        this._maxPoint = maxPoint;
        this._xRange = maxPoint.x - minPoint.x;
        this._calculateParameters(minPoint, maxPoint);
        return this;
    },
    setMin: function(point) {
        this.setRange(point, this._maxPoint);
        return this;
    },
    setMax: function(point) {
        this.setRange(this._minPoint, point);
        return this;
    },
    setPreProcess: function(preProcess) {
        this._preProcess = preProcess;
        return this;
    },
    setPostProcess: function(postProcess) {
        this._postProcess = postProcess;
        return this;
    },
    evaluate: function(x) {
        var y;
        if (this._preProcess) {
            x = this._preProcess(x);
        }
        y = Number((this._slope * x).toFixed(6)) + Number(this._b.toFixed(6));
        if (this._postProcess) {
            y = this._postProcess(y);
        }
        return y;
    },
    random: function() {
        var randomX = Math.random() * this._xRange + this._minPoint.x;
        return this.evaluate(randomX);
    },
    sample: function(count) {
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
    samplePoints: function(count) {
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
    getIntersectionPoint: function(otherFunction) {
        var point = null;
        if (this._slope !== otherFunction._slope) {
            var x = (this._b - otherFunction._b) / (otherFunction._slope - this._slope);
            var y = this.evaluate(x);
            point = new L.Point(x, y);
        }
        return point;
    }
});

L.ColorFunction = L.LinearFunction.extend({
    options: {
        alpha: 1,
        includeAlpha: false
    },
    initialize: function(minPoint, maxPoint, options) {
        L.Util.setOptions(this, options);
        this._parts = [];
        this._dynamicPart = null;
        this._outputPrecision = 0;
        this._prefix = null;
        this._formatOutput = function(y) {
            return y.toFixed(this._outputPrecision);
        }, this._mapOutput = function(parts) {
            var outputParts = [];
            for (var i = 0; i < this._parts.length; ++i) {
                var part = this._parts[i];
                outputParts.push(parts[part]);
            }
            if (this.options.includeAlpha) {
                outputParts.push(this.options.alpha);
            }
            return outputParts;
        };
        this._getColorString = function(y) {
            y = this._formatOutput(y);
            this.options[this._dynamicPart] = y;
            var parts = this._mapOutput(this.options);
            return this._writeColor(this._prefix, parts);
        };
        this._writeColor = function(prefix, parts) {
            if (this.options.includeAlpha) {
                prefix += "a";
            }
            return prefix + "(" + parts.join(",") + ")";
        };
        options = this.options;
        var postProcess = function(y) {
            if (options && options.postProcess) {
                y = options.postProcess.call(this, y);
            }
            var colorString = this._getColorString(y);
            if (L.Browser.ie && colorString.indexOf("hsl") > -1 || options.rgb) {
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
    initialize: function(minPoint, maxPoint, options) {
        L.ColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._parts = [ "outputHue", "outputSaturation", "outputLuminosity" ];
        this._prefix = "hsl";
        this._outputPrecision = 2;
    }
});

L.RGBColorFunction = L.ColorFunction.extend({
    initialize: function(minPoint, maxPoint, options) {
        L.ColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._parts = [ "outputRed", "outputBlue", "outputGreen" ];
        this._prefix = "rgb";
        this._outputPrecision = 0;
    }
});

L.RGBRedFunction = L.LinearFunction.extend({
    options: {
        outputGreen: 0,
        outputBlue: 0
    },
    initialize: function(minPoint, maxPoint, options) {
        L.RGBColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._dynamicPart = "outputRed";
    }
});

L.RGBBlueFunction = L.LinearFunction.extend({
    options: {
        outputRed: 0,
        outputGreen: 0
    },
    initialize: function(minPoint, maxPoint, options) {
        L.RGBColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._dynamicPart = "outputBlue";
    }
});

L.RGBGreenFunction = L.LinearFunction.extend({
    options: {
        outputRed: 0,
        outputBlue: 0
    },
    initialize: function(minPoint, maxPoint, options) {
        L.RGBColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._dynamicPart = "outputGreen";
    }
});

L.RGBColorBlendFunction = L.LinearFunction.extend({
    initialize: function(minX, maxX, rgbMinColor, rgbMaxColor) {
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
        this._redFunction = new L.LinearFunction(new L.Point(minX, red1), new L.Point(maxX, red2));
        this._greenFunction = new L.LinearFunction(new L.Point(minX, green1), new L.Point(maxX, green2));
        this._blueFunction = new L.LinearFunction(new L.Point(minX, blue1), new L.Point(maxX, blue2));
    },
    getBounds: function() {
        var redBounds = this._redFunction.getBounds();
        var greenBounds = this._greenFunction.getBounds();
        var blueBounds = this._blueFunction.getBounds();
        var minY = Math.min(redBounds[0].y, greenBounds[0].y, blueBounds[0].y);
        var maxY = Math.max(redBounds[0].y, greenBounds[0].y, blueBounds[0].y);
        return [ new L.Point(redBounds[0].x, minY), new L.Point(redBounds[1].x, maxY) ];
    },
    evaluate: function(x) {
        return new L.RGBColor([ this._redFunction.evaluate(x), this._greenFunction.evaluate(x), this._blueFunction.evaluate(x) ]).toRGBString();
    }
});

L.HSLHueFunction = L.HSLColorFunction.extend({
    options: {
        outputSaturation: "100%",
        outputLuminosity: "50%"
    },
    initialize: function(minPoint, maxPoint, options) {
        L.HSLColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._dynamicPart = "outputHue";
    }
});

L.HSLSaturationFunction = L.LinearFunction.extend({
    options: {
        outputHue: 0,
        outputLuminosity: "50%"
    },
    initialize: function(minPoint, maxPoint, options) {
        L.HSLColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._formatOutput = function(y) {
            return (y * 100).toFixed(this._outputPrecision) + "%";
        };
        this._dynamicPart = "outputSaturation";
    }
});

L.HSLLuminosityFunction = L.LinearFunction.extend({
    options: {
        outputHue: 0,
        outputSaturation: "100%"
    },
    initialize: function(minPoint, maxPoint, options) {
        L.HSLColorFunction.prototype.initialize.call(this, minPoint, maxPoint, options);
        this._formatOutput = function(y) {
            return (y * 100).toFixed(this._outputPrecision) + "%";
        };
        this._dynamicPart = "outputLuminosity";
    }
});

L.HSLColorBlendFunction = L.LinearFunction.extend({
    initialize: function(minX, maxX, hslMinColor, hslMaxColor) {
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
    getBounds: function() {
        var hBounds = this._hueFunction.getBounds();
        var sBounds = this._saturationFunction.getBounds();
        var lBounds = this._luminosityFunction.getBounds();
        var minY = Math.min(hBounds[0].y, sBounds[0].y, lBounds[0].y);
        var maxY = Math.max(hBounds[0].y, sBounds[0].y, lBounds[0].y);
        return [ new L.Point(hBounds[0].x, minY), new L.Point(hBounds[1].x, maxY) ];
    },
    evaluate: function(x) {
        return new L.HSLColor([ this._hueFunction.evaluate(x), this._saturationFunction.evaluate(x), this._luminosityFunction.evaluate(x) ]).toHSLString();
    }
});

L.PiecewiseFunction = L.LinearFunction.extend({
    initialize: function(functions, options) {
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
    _getFunction: function(x) {
        var bounds;
        var startPoint;
        var endPoint;
        var found = false;
        var currentFunction;
        for (var index = 0; index < this._functions.length; ++index) {
            currentFunction = this._functions[index];
            bounds = currentFunction.getBounds();
            startPoint = bounds[0];
            endPoint = bounds[1];
            if (x >= startPoint.x && x < endPoint.x) {
                found = true;
                break;
            }
        }
        return found ? currentFunction : this._functions[this._functions.length - 1];
    },
    evaluate: function(x) {
        var currentFunction;
        var y = null;
        if (this._preProcess) {
            x = this._preProcess(x);
        }
        currentFunction = this._getFunction(x);
        if (currentFunction) {
            y = currentFunction.evaluate(x);
            if (this._postProcess) {
                y = this._postProcess(y);
            }
        }
        return y;
    }
});

L.CustomColorFunction = L.PiecewiseFunction.extend({
    options: {
        interpolate: true
    },
    initialize: function(minX, maxX, colors, options) {
        var range = maxX - minX;
        var xRange = range / (colors.length - 1);
        var functions = [];
        var colorFunction;
        L.Util.setOptions(this, options);
        for (var i = 0; i < colors.length; ++i) {
            var next = Math.min(i + 1, colors.length - 1);
            colorFunction = this.options.interpolate ? new L.RGBColorBlendFunction(minX + xRange * i, minX + xRange * next, colors[i], colors[next]) : new L.RGBColorBlendFunction(minX + xRange * i, minX + xRange * next, colors[i], colors[i]);
            functions.push(colorFunction);
        }
        L.PiecewiseFunction.prototype.initialize.call(this, functions);
    }
});

L.CategoryFunction = L.Class.extend({
    initialize: function(categoryMap, options) {
        L.Util.setOptions(this, options);
        this._categoryKeys = Object.keys(categoryMap);
        this._categoryMap = categoryMap;
        this._preProcess = this.options.preProcess;
        this._postProcess = this.options.postProcess;
    },
    evaluate: function(x) {
        var y;
        if (this._preProcess) {
            x = this._preProcess(x);
        }
        y = this._categoryMap[x];
        if (this._postProcess) {
            y = this._postProcess(y);
        }
        return y;
    },
    getCategories: function() {
        return this._categoryKeys;
    }
});

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = start || 0, j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}

if (!Object.keys) {
    Object.keys = function() {
        var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !{
            toString: null
        }.propertyIsEnumerable("toString"), dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], dontEnumsLength = dontEnums.length;
        return function(obj) {
            var result, prop, i;
            if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
                throw new TypeError("Object.keys called on non-object");
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
    }();
}

L.Util.guid = function() {
    var s4 = function() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    };
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};

L.Util.getProperty = function(obj, property, defaultValue) {
    return property in obj ? obj[property] : defaultValue;
};

L.Util.setFieldValue = function(record, fieldName, value) {
    var keyParts = fieldName.split(".");
    var pointer = record;
    var part;
    for (var i = 0; i < keyParts.length - 1; ++i) {
        part = keyParts[i];
        pointer[part] = pointer[part] || {};
        pointer = pointer[part];
    }
    pointer[keyParts[keyParts.length - 1]] = value;
};

L.Util.getFieldValue = function(record, fieldName) {
    var value = null;
    if (fieldName) {
        var parts = fieldName.split(".");
        var valueField = record;
        var part;
        var searchParts;
        var searchKey;
        var searchValue;
        var testObject;
        var searchPart;
        var bracketIndex = -1;
        var testValue;
        for (var partIndex = 0; partIndex < parts.length; ++partIndex) {
            part = parts[partIndex];
            bracketIndex = part.indexOf("[");
            if (bracketIndex > -1) {
                searchPart = part.substring(bracketIndex);
                part = part.substring(0, bracketIndex);
                searchPart = searchPart.replace("[", "").replace("]", "");
                searchParts = searchPart.split("=");
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
            } else if (valueField && valueField.hasOwnProperty(part)) {
                valueField = valueField[part];
            } else {
                valueField = null;
                break;
            }
        }
        value = valueField;
    } else {
        value = record;
    }
    return value;
};

L.Util.getNumericRange = function(records, fieldName) {
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
    return [ min, max ];
};

L.Util.pointToGeoJSON = function() {
    var feature = {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [ this._latlng[1], this._latlng[0] ]
        },
        properties: {}
    };
    for (var key in this.options) {
        if (this.options.hasOwnProperty(key)) {
            var value = this.options[key];
            if (typeof value !== "function") {
                feature.properties[key] = value;
            }
        }
    }
    return feature;
};

L.Util.updateLayer = function(layer, updateFunction) {
    if (layer.eachLayer && !layer instanceof L.FeatureGroup) {
        layer.eachLayer(function(layer) {
            L.Util.updateLayer(layer, updateFunction);
        });
    } else {
        updateFunction.call(this, layer);
    }
};

L.CategoryLegend = L.Class.extend({
    initialize: function(options) {
        L.Util.setOptions(this, options);
    },
    generate: function(options) {
        options = options || {};
        var container = document.createElement("div");
        var legend = L.DomUtil.create("div", "legend", container);
        var className = options.className;
        var legendOptions = this.options;
        if (className) {
            L.DomUtil.addClass(legend, className);
        }
        if (options.title) {
            L.DomUtil.create("div", "legend-title", legend).innerHTML = options.title;
        }
        for (var key in legendOptions) {
            categoryOptions = legendOptions[key];
            var displayName = categoryOptions.displayName || key;
            var legendElement = L.DomUtil.create("div", "data-layer-legend", legend);
            var legendBox = L.DomUtil.create("div", "legend-box", legendElement);
            L.DomUtil.create("div", "key", legendElement).innerHTML = displayName;
            L.StyleConverter.applySVGStyle(legendBox, categoryOptions);
        }
        return container.innerHTML;
    }
});

L.LegendIcon = L.DivIcon.extend({
    initialize: function(fields, layerOptions, options) {
        var container = document.createElement("div");
        var legendContent = L.DomUtil.create("div", "legend", container);
        var legendTitle = L.DomUtil.create("div", "title", legendContent);
        var legendBox = L.DomUtil.create("div", "legend-box", legendContent);
        var legendValues = L.DomUtil.create("div", "legend-values", legendContent);
        var field;
        var title = layerOptions.title || layerOptions.name;
        if (title) {
            legendTitle.innerHTML = title;
        }
        for (var key in fields) {
            field = fields[key];
            L.DomUtil.create("div", "key", legendValues).innerHTML = field.name || key;
            L.DomUtil.create("div", "value", legendValues).innerHTML = field.value;
        }
        L.StyleConverter.applySVGStyle(legendBox, layerOptions);
        legendBox.style.height = "5px";
        options.html = container.innerHTML;
        options.className = options.className || "legend-icon";
        L.DivIcon.prototype.initialize.call(this, options);
    }
});

L.legendIcon = function(fields, layerOptions, options) {
    return new L.LegendIcon(fields, layerOptions, options);
};

L.GeometryUtils = {
    getName: function(geoJSON) {
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
    getGeoJSONLocation: function(geoJSON, record, locationTextField, recordToLayer) {
        var geoJSONLayer = new L.GeoJSON(geoJSON, {
            pointToLayer: function(feature, latlng) {
                var location = {
                    location: latlng,
                    text: locationTextField ? L.Util.getFieldValue(record, locationTextField) : [ latlng.lat.toFixed(3), latlng.lng.toFixed(3) ].join(", "),
                    center: latlng
                };
                return recordToLayer(location, record);
            }
        });
        var center = null;
        try {
            center = L.GeometryUtils.loadCentroid(geoJSON);
        } catch (ex) {
            console.log("Error loading centroid for " + JSON.stringify(geoJSON));
        }
        return {
            location: geoJSONLayer,
            text: locationTextField ? L.Util.getFieldValue(record, locationTextField) : null,
            center: center
        };
    },
    mergeProperties: function(properties, featureCollection, mergeKey) {
        var features = featureCollection["features"];
        var featureIndex = L.GeometryUtils.indexFeatureCollection(features, mergeKey);
        var property;
        var mergeValue;
        var newFeatureCollection = {
            type: "FeatureCollection",
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
    indexFeatureCollection: function(featureCollection, indexKey) {
        var features = featureCollection.features;
        var feature;
        var properties;
        var featureIndex = {};
        var value;
        for (var index = 0; index < features.length; ++index) {
            feature = features[index];
            properties = feature.properties;
            value = properties[indexKey];
            if (value in featureIndex) {
                var existingFeature = featureIndex[value];
                if (existingFeature.geometry.type !== "GeometryCollection") {
                    featureIndex[value] = {
                        type: "Feature",
                        geometry: {
                            type: "GeometryCollection",
                            geometries: [ feature.geometry, existingFeature.geometry ]
                        }
                    };
                } else {
                    existingFeature.geometry.geometries.push(feature.geometry);
                }
            } else {
                featureIndex[value] = feature;
            }
        }
        return featureIndex;
    },
    arrayToMap: function(array, fromKey, toKey) {
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
    arrayToMaps: function(array, mapLinks) {
        var map;
        var item;
        var from;
        var to;
        var maps = [];
        var mapLink;
        var fromKey;
        var toKey;
        for (var i = 0; i < mapLinks.length; ++i) {
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
    loadCentroid: function(feature) {
        var centroidLatLng = null;
        var centroid;
        var x, y;
        if (feature.geometry && feature.geometry.type === "Point") {
            centroidLatLng = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        } else if (typeof jsts !== "undefined") {
            var parser = new jsts.io.GeoJSONParser();
            var jstsFeature = parser.read(feature);
            if (jstsFeature.getCentroid) {
                centroid = jstsFeature.getCentroid();
                x = centroid.coordinate.x;
                y = centroid.coordinate.y;
            } else if (jstsFeature.features) {
                var totalCentroidX = 0;
                var totalCentroidY = 0;
                for (var i = 0; i < jstsFeature.features.length; ++i) {
                    centroid = jstsFeature.features[i].geometry.getCentroid();
                    totalCentroidX += centroid.coordinate.x;
                    totalCentroidY += centroid.coordinate.y;
                }
                x = totalCentroidX / jstsFeature.features.length;
                y = totalCentroidY / jstsFeature.features.length;
            } else {
                centroid = jstsFeature.geometry.getCentroid();
                x = centroid.coordinate.x;
                y = centroid.coordinate.y;
            }
            centroidLatLng = new L.LatLng(y, x);
        }
        return centroidLatLng;
    },
    loadCentroids: function(dictionary) {
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
    initialize: function(points, innerPoints, options) {
        this._points = points || [];
        this._innerPoints = innerPoints || [];
        L.Util.setOptions(this, options);
    },
    options: {
        closePath: true
    },
    _getPathString: function(points, digits) {
        var pathString = "";
        if (points.length > 0) {
            var point = points[0];
            var digits = digits !== null ? digits : 2;
            var startChar = "M";
            var lineToChar = "L";
            var closePath = "Z";
            if (L.Browser.vml) {
                digits = 0;
                startChar = "m";
                lineToChar = "l";
                closePath = "xe";
            }
            pathString = startChar + point.x.toFixed(digits) + "," + point.y.toFixed(digits);
            for (var index = 1; index < points.length; index++) {
                point = points[index];
                pathString += lineToChar + point.x.toFixed(digits) + "," + point.y.toFixed(digits);
            }
            if (this.options.closePath) {
                pathString += closePath;
            }
        }
        return pathString;
    },
    addPoint: function(point, inner) {
        inner ? this._innerPoints.push(point) : this._points.push(point);
    },
    build: function(digits) {
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
            property: [ "background-color" ],
            valueFunction: function(value) {
                return value;
            }
        },
        color: {
            property: [ "color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color" ],
            valueFunction: function(value) {
                return value;
            }
        },
        weight: {
            property: [ "border-width" ],
            valueFunction: function(value) {
                return Math.ceil(value) + "px";
            }
        },
        stroke: {
            property: [ "border-style" ],
            valueFunction: function(value) {
                return value === true ? "solid" : "none";
            }
        },
        dashArray: {
            property: [ "border-style" ],
            valueFunction: function(value) {
                var style = "solid";
                if (value) {
                    style = "dashed";
                }
                return style;
            }
        },
        barThickness: {
            property: [ "height" ],
            valueFunction: function(value) {
                return value + "px";
            }
        },
        radius: {
            property: [ "height" ],
            valueFunction: function(value) {
                return 2 * value + "px";
            }
        },
        fillOpacity: {
            property: [ "opacity" ],
            valueFunction: function(value) {
                return value;
            }
        }
    },
    applySVGStyle: function(element, svgStyle, additionalKeys) {
        var keyMap = L.StyleConverter.keyMap;
        if (additionalKeys) {
            keyMap = L.Util.extend(keyMap, additionalKeys);
        }
        element.style.borderStyle = "solid";
        for (var property in svgStyle) {
            L.StyleConverter.setCSSProperty(element, property, svgStyle[property], keyMap);
        }
        return element;
    },
    setCSSProperty: function(element, key, value, keyMap) {
        var keyMap = keyMap || L.StyleConverter.keyMap;
        var cssProperty = keyMap[key];
        var cssText = "";
        if (cssProperty) {
            var propertyKey = cssProperty.property;
            for (var propertyIndex = 0, propertyLength = propertyKey.length; propertyIndex < propertyLength; ++propertyIndex) {
                cssText += propertyKey[propertyIndex] + ":" + cssProperty.valueFunction(value) + ";";
            }
        }
        element.style.cssText += cssText;
        return element;
    }
};

L.StylesBuilder = L.Class.extend({
    initialize: function(categories, styleFunctionMap) {
        this._categories = categories;
        this._styleFunctionMap = styleFunctionMap;
        this._buildStyles();
    },
    _buildStyles: function() {
        var map = {};
        var category;
        var styleFunction;
        var styleValue;
        for (var index = 0; index < this._categories.length; ++index) {
            category = this._categories[index];
            map[category] = {};
            for (var property in this._styleFunctionMap) {
                styleFunction = this._styleFunctionMap[property];
                styleValue = styleFunction.evaluate ? styleFunction.evaluate(index) : typeof styleFunction === "function" ? styleFunction(index) : styleFunction;
                map[category][property] = styleValue;
            }
        }
        this._styleMap = map;
    },
    getStyles: function() {
        return this._styleMap;
    }
});

L.PaletteBuilder = L.Class.extend({
    initialize: function(styleFunctionMap) {
        this._styleFunctionMap = styleFunctionMap;
    },
    generate: function(options) {
        options = options || {};
        var container = document.createElement("div");
        var paletteElement = L.DomUtil.create("div", "palette", container);
        var count = options.count || 10;
        var categories = function(count) {
            var categoryArray = [];
            for (var i = 0; i < count; ++i) {
                categoryArray.push(i);
            }
            return categoryArray;
        }(count);
        var styleBuilder = new L.StylesBuilder(categories, this._styleFunctionMap);
        var styles = styleBuilder.getStyles();
        if (options.className) {
            L.DomUtil.addClass(paletteElement, options.className);
        }
        for (var styleKey in styles) {
            var i = L.DomUtil.create("i", "palette-element", paletteElement);
            var style = styles[styleKey];
            L.StyleConverter.applySVGStyle(i, style);
        }
        return container.innerHTML;
    }
});

L.HTMLUtils = {
    buildTable: function(obj, className, ignoreFields) {
        className = className || "table table-condensed table-striped table-bordered";
        var table = L.DomUtil.create("table", className);
        var thead = L.DomUtil.create("thead", "", table);
        var tbody = L.DomUtil.create("tbody", "", table);
        thead.innerHTML = "<tr><th>Name</th><th>Value</th></tr>";
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
                if (typeof value === "object") {
                    var container = document.createElement("div");
                    container.appendChild(L.HTMLUtils.buildTable(value, ignoreFields));
                    value = container.innerHTML;
                }
                tbody.innerHTML += "<tr><td>" + property + "</td><td>" + value + "</td></tr>";
            }
        }
        return table;
    }
};

L.AnimationUtils = {
    animate: function(layer, from, to, options) {
        var delay = options.delay || 0;
        var frames = options.frames || 30;
        var duration = options.duration || 500;
        var linearFunctions = {};
        var easeFunction = options.easeFunction || function(step) {
            return step;
        };
        var complete = options.complete;
        var step = duration / frames;
        for (var key in from) {
            if (key != "color" && key != "fillColor" && to[key]) {
                linearFunctions[key] = new L.LinearFunction([ 0, from[key] ], [ frames - 1, to[key] ]);
            } else if (key == "color" || key == "fillColor") {
                linearFunctions[key] = new L.RGBColorBlendFunction(0, frames - 1, from[key], to[key]);
            }
        }
        var layerOptions = {};
        var frame = 0;
        var updateLayer = function() {
            for (var key in linearFunctions) {
                layerOptions[key] = linearFunctions[key].evaluate(frame);
            }
            layer.options = L.extend({}, layer.options, layerOptions);
            layer.setStyle(layer.options).redraw();
            frame++;
            step = easeFunction(step);
            if (frame < frames) {
                setTimeout(updateLayer, step);
            } else {
                complete();
            }
        };
        setTimeout(updateLayer, delay);
    }
};

L.Color = L.Class.extend({
    initialize: function(colorDef) {
        this._rgb = [ 0, 0, 0 ];
        this._hsl = [ 0, 1, .5 ];
        this._a = 1;
        if (colorDef) {
            this.parseColorDef(colorDef);
        }
    },
    parseColorDef: function(colorDef) {},
    rgbToHSL: function(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > .5 ? d / (2 - max - min) : d / (max + min);
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
        return [ h, s, l ];
    },
    hslToRGB: function(h, s, l) {
        var r, g, b;
        if (s == 0) {
            r = g = b = l;
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            var q = l < .5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ];
    },
    setRGB: function(r, g, b) {
        this._rgb = [ r, g, b ];
        this._hsl = this.rgbToHSL(r, g, b);
        return this;
    },
    setHSL: function(h, s, l) {
        this._hsl = [ h, s, l ];
        this._rgb = this.hslToRGB(h, s, l);
        return this;
    },
    toHSL: function() {
        return this._hsl;
    },
    toHSLString: function() {
        var prefix = "hsl";
        if (this._a < 1) {
            prefix += "a";
        }
        return prefix + "(" + (this._hsl[0] * 360).toFixed(1) + "," + (this._hsl[1] * 100).toFixed(0) + "%," + (this._hsl[2] * 100).toFixed(0) + "%)";
    },
    toRGB: function() {
        return this._rgb;
    },
    toRGBString: function() {
        var rgbString;
        if (this._a < 1) {
            rgbString = "rgba(" + this._rgb[0].toFixed(0) + "," + this._rgb[1].toFixed(0) + "," + this._rgb[2].toFixed(0) + "," + this._a.toFixed(1) + ")";
        } else {
            var parts = [ this._rgb[0].toString(16), this._rgb[1].toString(16), this._rgb[2].toString(16) ];
            for (var i = 0; i < parts.length; ++i) {
                if (parts[i].length === 1) {
                    parts[i] = "0" + parts[i];
                }
            }
            rgbString = "#" + parts.join("");
        }
        return rgbString;
    },
    r: function(newR) {
        if (!arguments.length) return this._rgb[0];
        return this.setRGB(newR, this._rgb[1], this._rgb[2]);
    },
    g: function(newG) {
        if (!arguments.length) return this._rgb[1];
        return this.setRGB(this._rgb[0], newG, this._rgb[2]);
    },
    b: function(newB) {
        if (!arguments.length) return this._rgb[2];
        return this.setRGB(this._rgb[0], this._rgb[1], newB);
    },
    h: function(newH) {
        if (!arguments.length) return this._hsl[0];
        return this.setHSL(newH, this._hsl[1], this._hsl[2]);
    },
    s: function(newS) {
        if (!arguments.length) return this._hsl[1];
        return this.setHSL(this._hsl[0], newS, this._hsl[2]);
    },
    l: function(newL) {
        if (!arguments.length) return this._hsl[2];
        return this.setHSL(this._hsl[0], this._hsl[1], newL);
    },
    a: function(newA) {
        if (!arguments.length) return this._a;
        this._a = newA;
        return this;
    }
});

L.RGBColor = L.Color.extend({
    initialize: function(colorDef) {
        L.Color.prototype.initialize.call(this, colorDef);
    },
    parseColorDef: function(colorDef) {
        var isArray = colorDef instanceof Array;
        var isHex = colorDef.indexOf("#") === 0;
        var parts = [];
        var r, g, b, a;
        if (isArray) {
            r = Math.floor(colorDef[0]);
            g = Math.floor(colorDef[1]);
            b = Math.floor(colorDef[2]);
            a = colorDef.length === 4 ? colorDef[3] : 1;
        } else if (isHex) {
            colorDef = colorDef.replace("#", "");
            r = parseInt(colorDef.substring(0, 2), 16);
            g = parseInt(colorDef.substring(2, 4), 16);
            b = parseInt(colorDef.substring(4, 6), 16);
            a = colorDef.length === 8 ? parseInt(colorDef.substring(6, 8), 16) : 1;
        } else {
            parts = colorDef.replace("rgb", "").replace("a", "").replace(/\s+/g, "").replace("(", "").replace(")", "").split(",");
            r = parseInt(parts[0]);
            g = parseInt(parts[1]);
            b = parseInt(parts[2]);
            a = parts.length === 4 ? parseInt(parts[3]) : 1;
        }
        this.setRGB(r, g, b);
        this._a = a;
    }
});

L.rgbColor = function(colorDef) {
    return new L.RGBColor(colorDef);
};

L.HSLColor = L.Color.extend({
    initialize: function(colorDef) {
        L.Color.prototype.initialize.call(this, colorDef);
    },
    parseColorDef: function(colorDef) {
        var isArray = colorDef instanceof Array;
        var h, s, l, a;
        if (isArray) {
            h = colorDef[0];
            s = colorDef[1];
            l = colorDef[2];
            a = colorDef.length === 4 ? colorDef[3] : 1;
        } else {
            var parts = colorDef.replace("hsl", "").replace("a", "").replace("(", "").replace(/\s+/g, "").replace(/%/g, "").replace(")", "").split(",");
            h = Number(parts[0]) / 360;
            s = Number(parts[1]) / 100;
            l = Number(parts[2]) / 100;
            a = parts.length === 4 ? parseInt(parts[3]) : 1;
        }
        this.setHSL(h, s, l);
        this._a = a;
    }
});

L.hslColor = function(colorDef) {
    return new L.HSLColor(colorDef);
};

L.Animation = L.Class.extend({
    initialize: function(easeFunction, animateFrame) {
        this._easeFunction = easeFunction;
        this._animateFrame = animateFrame;
    },
    run: function(el, options) {
        this.stop();
        this._el = el;
        this._inProgress = true;
        this._duration = options.duration || .25;
        this._animationOptions = options;
        this._startTime = +new Date();
        this.fire("start");
        this._animate();
    },
    stop: function() {
        if (!this._inProgress) {
            return;
        }
        this._step();
        this._complete();
    },
    _animate: function() {
        this._animId = L.Util.requestAnimFrame(this._animate, this);
        this._step();
    },
    _step: function() {
        var elapsed = +new Date() - this._startTime, duration = this._duration * 1e3;
        if (elapsed < duration) {
            this._runFrame(this._easeFunction(elapsed / duration));
        } else {
            this._runFrame(1);
            this._complete();
        }
    },
    _runFrame: function(progress) {
        this._animateFrame(progress);
        this.fire("step");
    },
    _complete: function() {
        L.Util.cancelAnimFrame(this._animId);
        this._inProgress = false;
        this.fire("end");
    }
});

L.ColorBrewer = {
    Sequential: {
        YlGn: {
            3: [ "#f7fcb9", "#addd8e", "#31a354" ],
            4: [ "#ffffcc", "#c2e699", "#78c679", "#238443" ],
            5: [ "#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837" ],
            6: [ "#ffffcc", "#d9f0a3", "#addd8e", "#78c679", "#31a354", "#006837" ],
            7: [ "#ffffcc", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32" ],
            8: [ "#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32" ],
            9: [ "#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529" ]
        },
        YlGnBu: {
            3: [ "#edf8b1", "#7fcdbb", "#2c7fb8" ],
            4: [ "#ffffcc", "#a1dab4", "#41b6c4", "#225ea8" ],
            5: [ "#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494" ],
            6: [ "#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8", "#253494" ],
            7: [ "#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84" ],
            8: [ "#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84" ],
            9: [ "#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58" ]
        },
        GnBu: {
            3: [ "#e0f3db", "#a8ddb5", "#43a2ca" ],
            4: [ "#f0f9e8", "#bae4bc", "#7bccc4", "#2b8cbe" ],
            5: [ "#f0f9e8", "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac" ],
            6: [ "#f0f9e8", "#ccebc5", "#a8ddb5", "#7bccc4", "#43a2ca", "#0868ac" ],
            7: [ "#f0f9e8", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#08589e" ],
            8: [ "#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#08589e" ],
            9: [ "#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081" ]
        },
        BuGn: {
            3: [ "#e5f5f9", "#99d8c9", "#2ca25f" ],
            4: [ "#edf8fb", "#b2e2e2", "#66c2a4", "#238b45" ],
            5: [ "#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c" ],
            6: [ "#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#2ca25f", "#006d2c" ],
            7: [ "#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824" ],
            8: [ "#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824" ],
            9: [ "#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b" ]
        },
        PuBuGn: {
            3: [ "#ece2f0", "#a6bddb", "#1c9099" ],
            4: [ "#f6eff7", "#bdc9e1", "#67a9cf", "#02818a" ],
            5: [ "#f6eff7", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59" ],
            6: [ "#f6eff7", "#d0d1e6", "#a6bddb", "#67a9cf", "#1c9099", "#016c59" ],
            7: [ "#f6eff7", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016450" ],
            8: [ "#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016450" ],
            9: [ "#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636" ]
        },
        PuBu: {
            3: [ "#ece7f2", "#a6bddb", "#2b8cbe" ],
            4: [ "#f1eef6", "#bdc9e1", "#74a9cf", "#0570b0" ],
            5: [ "#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d" ],
            6: [ "#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#2b8cbe", "#045a8d" ],
            7: [ "#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b" ],
            8: [ "#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b" ],
            9: [ "#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858" ]
        },
        BuPu: {
            3: [ "#e0ecf4", "#9ebcda", "#8856a7" ],
            4: [ "#edf8fb", "#b3cde3", "#8c96c6", "#88419d" ],
            5: [ "#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c" ],
            6: [ "#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8856a7", "#810f7c" ],
            7: [ "#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#6e016b" ],
            8: [ "#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#6e016b" ],
            9: [ "#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b" ]
        },
        RdPu: {
            3: [ "#fde0dd", "#fa9fb5", "#c51b8a" ],
            4: [ "#feebe2", "#fbb4b9", "#f768a1", "#ae017e" ],
            5: [ "#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177" ],
            6: [ "#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#c51b8a", "#7a0177" ],
            7: [ "#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177" ],
            8: [ "#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177" ],
            9: [ "#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a" ]
        },
        PuRd: {
            3: [ "#e7e1ef", "#c994c7", "#dd1c77" ],
            4: [ "#f1eef6", "#d7b5d8", "#df65b0", "#ce1256" ],
            5: [ "#f1eef6", "#d7b5d8", "#df65b0", "#dd1c77", "#980043" ],
            6: [ "#f1eef6", "#d4b9da", "#c994c7", "#df65b0", "#dd1c77", "#980043" ],
            7: [ "#f1eef6", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#91003f" ],
            8: [ "#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#91003f" ],
            9: [ "#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f" ]
        },
        OrRd: {
            3: [ "#fee8c8", "#fdbb84", "#e34a33" ],
            4: [ "#fef0d9", "#fdcc8a", "#fc8d59", "#d7301f" ],
            5: [ "#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000" ],
            6: [ "#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#e34a33", "#b30000" ],
            7: [ "#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#990000" ],
            8: [ "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#990000" ],
            9: [ "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000" ]
        },
        YlOrRd: {
            3: [ "#ffeda0", "#feb24c", "#f03b20" ],
            4: [ "#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c" ],
            5: [ "#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026" ],
            6: [ "#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026" ],
            7: [ "#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026" ],
            8: [ "#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026" ],
            9: [ "#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026" ]
        },
        YlOrBr: {
            3: [ "#fff7bc", "#fec44f", "#d95f0e" ],
            4: [ "#ffffd4", "#fed98e", "#fe9929", "#cc4c02" ],
            5: [ "#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404" ],
            6: [ "#ffffd4", "#fee391", "#fec44f", "#fe9929", "#d95f0e", "#993404" ],
            7: [ "#ffffd4", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#8c2d04" ],
            8: [ "#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#8c2d04" ],
            9: [ "#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506" ]
        },
        Purples: {
            3: [ "#efedf5", "#bcbddc", "#756bb1" ],
            4: [ "#f2f0f7", "#cbc9e2", "#9e9ac8", "#6a51a3" ],
            5: [ "#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f" ],
            6: [ "#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f" ],
            7: [ "#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486" ],
            8: [ "#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486" ],
            9: [ "#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d" ]
        },
        Blues: {
            3: [ "#deebf7", "#9ecae1", "#3182bd" ],
            4: [ "#eff3ff", "#bdd7e7", "#6baed6", "#2171b5" ],
            5: [ "#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c" ],
            6: [ "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c" ],
            7: [ "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594" ],
            8: [ "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594" ],
            9: [ "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b" ]
        },
        Greens: {
            3: [ "#e5f5e0", "#a1d99b", "#31a354" ],
            4: [ "#edf8e9", "#bae4b3", "#74c476", "#238b45" ],
            5: [ "#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c" ],
            6: [ "#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#31a354", "#006d2c" ],
            7: [ "#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32" ],
            8: [ "#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32" ],
            9: [ "#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b" ]
        },
        Oranges: {
            3: [ "#fee6ce", "#fdae6b", "#e6550d" ],
            4: [ "#feedde", "#fdbe85", "#fd8d3c", "#d94701" ],
            5: [ "#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603" ],
            6: [ "#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#e6550d", "#a63603" ],
            7: [ "#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#8c2d04" ],
            8: [ "#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#8c2d04" ],
            9: [ "#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704" ]
        },
        Reds: {
            3: [ "#fee0d2", "#fc9272", "#de2d26" ],
            4: [ "#fee5d9", "#fcae91", "#fb6a4a", "#cb181d" ],
            5: [ "#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15" ],
            6: [ "#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15" ],
            7: [ "#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d" ],
            8: [ "#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d" ],
            9: [ "#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d" ]
        },
        Greys: {
            3: [ "#f0f0f0", "#bdbdbd", "#636363" ],
            4: [ "#f7f7f7", "#cccccc", "#969696", "#525252" ],
            5: [ "#f7f7f7", "#cccccc", "#969696", "#636363", "#252525" ],
            6: [ "#f7f7f7", "#d9d9d9", "#bdbdbd", "#969696", "#636363", "#252525" ],
            7: [ "#f7f7f7", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525" ],
            8: [ "#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525" ],
            9: [ "#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000" ]
        }
    },
    Diverging: {
        PuOr: {
            3: [ "#f1a340", "#f7f7f7", "#998ec3" ],
            4: [ "#e66101", "#fdb863", "#b2abd2", "#5e3c99" ],
            5: [ "#e66101", "#fdb863", "#f7f7f7", "#b2abd2", "#5e3c99" ],
            6: [ "#b35806", "#f1a340", "#fee0b6", "#d8daeb", "#998ec3", "#542788" ],
            7: [ "#b35806", "#f1a340", "#fee0b6", "#f7f7f7", "#d8daeb", "#998ec3", "#542788" ],
            8: [ "#b35806", "#e08214", "#fdb863", "#fee0b6", "#d8daeb", "#b2abd2", "#8073ac", "#542788" ],
            9: [ "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788" ],
            10: [ "#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b" ],
            11: [ "#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b" ]
        },
        BrBG: {
            3: [ "#d8b365", "#f5f5f5", "#5ab4ac" ],
            4: [ "#a6611a", "#dfc27d", "#80cdc1", "#018571" ],
            5: [ "#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571" ],
            6: [ "#8c510a", "#d8b365", "#f6e8c3", "#c7eae5", "#5ab4ac", "#01665e" ],
            7: [ "#8c510a", "#d8b365", "#f6e8c3", "#f5f5f5", "#c7eae5", "#5ab4ac", "#01665e" ],
            8: [ "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#c7eae5", "#80cdc1", "#35978f", "#01665e" ],
            9: [ "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e" ],
            10: [ "#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30" ],
            11: [ "#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30" ]
        },
        PRGn: {
            3: [ "#af8dc3", "#f7f7f7", "#7fbf7b" ],
            4: [ "#7b3294", "#c2a5cf", "#a6dba0", "#008837" ],
            5: [ "#7b3294", "#c2a5cf", "#f7f7f7", "#a6dba0", "#008837" ],
            6: [ "#762a83", "#af8dc3", "#e7d4e8", "#d9f0d3", "#7fbf7b", "#1b7837" ],
            7: [ "#762a83", "#af8dc3", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#7fbf7b", "#1b7837" ],
            8: [ "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837" ],
            9: [ "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837" ],
            10: [ "#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b" ],
            11: [ "#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b" ]
        },
        PiYG: {
            3: [ "#e9a3c9", "#f7f7f7", "#a1d76a" ],
            4: [ "#d01c8b", "#f1b6da", "#b8e186", "#4dac26" ],
            5: [ "#d01c8b", "#f1b6da", "#f7f7f7", "#b8e186", "#4dac26" ],
            6: [ "#c51b7d", "#e9a3c9", "#fde0ef", "#e6f5d0", "#a1d76a", "#4d9221" ],
            7: [ "#c51b7d", "#e9a3c9", "#fde0ef", "#f7f7f7", "#e6f5d0", "#a1d76a", "#4d9221" ],
            8: [ "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221" ],
            9: [ "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221" ],
            10: [ "#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419" ],
            11: [ "#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419" ]
        },
        RdBu: {
            3: [ "#ef8a62", "#f7f7f7", "#67a9cf" ],
            4: [ "#ca0020", "#f4a582", "#92c5de", "#0571b0" ],
            5: [ "#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0" ],
            6: [ "#b2182b", "#ef8a62", "#fddbc7", "#d1e5f0", "#67a9cf", "#2166ac" ],
            7: [ "#b2182b", "#ef8a62", "#fddbc7", "#f7f7f7", "#d1e5f0", "#67a9cf", "#2166ac" ],
            8: [ "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac" ],
            9: [ "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac" ],
            10: [ "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061" ],
            11: [ "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061" ]
        },
        RdGy: {
            3: [ "#ef8a62", "#ffffff", "#999999" ],
            4: [ "#ca0020", "#f4a582", "#bababa", "#404040" ],
            5: [ "#ca0020", "#f4a582", "#ffffff", "#bababa", "#404040" ],
            6: [ "#b2182b", "#ef8a62", "#fddbc7", "#e0e0e0", "#999999", "#4d4d4d" ],
            7: [ "#b2182b", "#ef8a62", "#fddbc7", "#ffffff", "#e0e0e0", "#999999", "#4d4d4d" ],
            8: [ "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#e0e0e0", "#bababa", "#878787", "#4d4d4d" ],
            9: [ "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d" ],
            10: [ "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a" ],
            11: [ "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a" ]
        },
        RdYlBu: {
            3: [ "#fc8d59", "#ffffbf", "#91bfdb" ],
            4: [ "#d7191c", "#fdae61", "#abd9e9", "#2c7bb6" ],
            5: [ "#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6" ],
            6: [ "#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4" ],
            7: [ "#d73027", "#fc8d59", "#fee090", "#ffffbf", "#e0f3f8", "#91bfdb", "#4575b4" ],
            8: [ "#d73027", "#f46d43", "#fdae61", "#fee090", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4" ],
            9: [ "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4" ],
            10: [ "#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695" ],
            11: [ "#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695" ]
        },
        Spectral: {
            3: [ "#fc8d59", "#ffffbf", "#99d594" ],
            4: [ "#d7191c", "#fdae61", "#abdda4", "#2b83ba" ],
            5: [ "#d7191c", "#fdae61", "#ffffbf", "#abdda4", "#2b83ba" ],
            6: [ "#d53e4f", "#fc8d59", "#fee08b", "#e6f598", "#99d594", "#3288bd" ],
            7: [ "#d53e4f", "#fc8d59", "#fee08b", "#ffffbf", "#e6f598", "#99d594", "#3288bd" ],
            8: [ "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd" ],
            9: [ "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd" ],
            10: [ "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2" ],
            11: [ "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2" ]
        },
        RdYlGn: {
            3: [ "#fc8d59", "#ffffbf", "#91cf60" ],
            4: [ "#d7191c", "#fdae61", "#a6d96a", "#1a9641" ],
            5: [ "#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641" ],
            6: [ "#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#91cf60", "#1a9850" ],
            7: [ "#d73027", "#fc8d59", "#fee08b", "#ffffbf", "#d9ef8b", "#91cf60", "#1a9850" ],
            8: [ "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850" ],
            9: [ "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850" ],
            10: [ "#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837" ],
            11: [ "#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837" ]
        }
    },
    Qualitative: {
        Accent: {
            3: [ "#7fc97f", "#beaed4", "#fdc086" ],
            4: [ "#7fc97f", "#beaed4", "#fdc086", "#ffff99" ],
            5: [ "#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0" ],
            6: [ "#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f" ],
            7: [ "#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17" ],
            8: [ "#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666" ]
        },
        Dark2: {
            3: [ "#1b9e77", "#d95f02", "#7570b3" ],
            4: [ "#1b9e77", "#d95f02", "#7570b3", "#e7298a" ],
            5: [ "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e" ],
            6: [ "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02" ],
            7: [ "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d" ],
            8: [ "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666" ]
        },
        Paired: {
            3: [ "#a6cee3", "#1f78b4", "#b2df8a" ],
            4: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c" ],
            5: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99" ],
            6: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c" ],
            7: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f" ],
            8: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00" ],
            9: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6" ],
            10: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a" ],
            11: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99" ],
            12: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928" ]
        },
        Pastel1: {
            3: [ "#fbb4ae", "#b3cde3", "#ccebc5" ],
            4: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4" ],
            5: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6" ],
            6: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc" ],
            7: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd" ],
            8: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec" ],
            9: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2" ]
        },
        Pastel2: {
            3: [ "#b3e2cd", "#fdcdac", "#cbd5e8" ],
            4: [ "#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4" ],
            5: [ "#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9" ],
            6: [ "#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae" ],
            7: [ "#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc" ],
            8: [ "#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc" ]
        },
        Set1: {
            3: [ "#e41a1c", "#377eb8", "#4daf4a" ],
            4: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3" ],
            5: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00" ],
            6: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33" ],
            7: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628" ],
            8: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf" ],
            9: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999" ]
        },
        Set2: {
            3: [ "#66c2a5", "#fc8d62", "#8da0cb" ],
            4: [ "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3" ],
            5: [ "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854" ],
            6: [ "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f" ],
            7: [ "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494" ],
            8: [ "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3" ]
        },
        Set3: {
            3: [ "#8dd3c7", "#ffffb3", "#bebada" ],
            4: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072" ],
            5: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3" ],
            6: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462" ],
            7: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69" ],
            8: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5" ],
            9: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9" ],
            10: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd" ],
            11: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5" ],
            12: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f" ]
        }
    }
};

L.Palettes = {
    huePalette: function(min, max, minH, maxH, options) {
        return new L.HSLHueFunction(new L.Point(min, minH), new L.Point(max, maxH), options);
    },
    luminosityPalette: function(min, max, minL, maxL, options) {
        return new L.HSLLuminosityFunction(new L.Point(min, minL), new L.Point(max, maxL), options);
    },
    saturationPalette: function(min, max, minS, maxS, options) {
        return new L.HSLSaturationFunction(new L.Point(min, minS), new L.Point(max, maxS), options);
    },
    rgbBlendPalette: function(min, max, minColor, maxColor, options) {
        return new L.RGBColorBlendFunction(min, max, minColor, maxColor, options);
    },
    hslBlendPalette: function(min, max, minColor, maxColor, options) {
        return new L.HSLColorBlendFunction(min, max, minColor, maxColor, options);
    },
    customColorPalette: function(min, max, colors, options) {
        return new L.CustomColorFunction(min, max, colors, options);
    }
};

L.DynamicColorPalettes = {
    rainbow: {
        text: "Rainbow",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 0, 300, options);
        }
    },
    greentored: {
        text: "Green - Red",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 120, 0, options);
        }
    },
    yellowtored: {
        text: "Yellow - Red",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 60, 0, options);
        }
    },
    orangetored: {
        text: "Orange - Red",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 30, 0, options);
        }
    },
    redtopurple: {
        text: "Red - Purple",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 360, 270, options);
        }
    },
    bluetored: {
        text: "Blue - Red",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 210, 360, options);
        }
    },
    bluetored2: {
        text: "Blue - Red 2",
        getPalette: function(min, max, options) {
            return L.Palettes.huePalette(min, max, 180, 0, options);
        }
    },
    whitetored: {
        text: "White - Red",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 0
            }));
        }
    },
    whitetoorange: {
        text: "White - Orange",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 30
            }));
        }
    },
    whitetoyellow: {
        text: "White - Yellow",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 60
            }));
        }
    },
    whitetogreen: {
        text: "White - Green",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 120
            }));
        }
    },
    whitetoltblue: {
        text: "White - Lt. Blue",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 180
            }));
        }
    },
    whitetoblue: {
        text: "White - Blue",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 240
            }));
        }
    },
    whitetopurple: {
        text: "White - Purple",
        getPalette: function(min, max, options) {
            return L.Palettes.luminosityPalette(min, max, 1, .5, L.Util.extend(option, {
                outputHue: 270
            }));
        }
    },
    graytored: {
        text: "Gray - Red",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 0
            }));
        }
    },
    graytoorange: {
        text: "Gray - Orange",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 30
            }));
        }
    },
    graytoyellow: {
        text: "Gray - Yellow",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 60
            }));
        }
    },
    graytogreen: {
        text: "Gray - Green",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 120
            }));
        }
    },
    graytoltblue: {
        text: "Gray - Lt. Blue",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 180
            }));
        }
    },
    graytoblue: {
        text: "Gray - Blue",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 240
            }));
        }
    },
    graytopurple: {
        text: "Gray - Purple",
        getPalette: function(min, max, options) {
            return L.Palettes.saturationPalette(min, max, 0, 1, L.Util.extend(option, {
                outputHue: 270
            }));
        }
    }
};

L.DynamicPaletteElement = L.Class.extend({
    initialize: function(key, dynamicPalette) {
        this._key = key;
        this._dynamicPalette = dynamicPalette;
    },
    generate: function(options) {
        var paletteElement = L.DomUtil.create("div", "palette");
        var count = options.count;
        var palette = this._dynamicPalette.getPalette(0, count - 1);
        var width = options.width;
        var showText = true;
        if (options.showText != undefined) {
            showText = options.showText;
        }
        paletteElement.setAttribute("data-palette-key", this._key);
        if (this._dynamicPalette.text && showText) {
            L.DomUtil.create("div", "palette-text", paletteElement).innerHTML = '<i class="icon-ok hidden"></i>' + this._dynamicPalette.text;
        }
        var elementWidth = width / count;
        if (options.className) {
            L.DomUtil.addClass(paletteElement, options.className);
        }
        for (var i = 0; i < count; ++i) {
            var i = L.DomUtil.create("i", "palette-element");
            for (var styleKey in palette) {
                var styleValue = palette[styleKey];
                var style = styleValue.evaluate ? styleValue.evaluate(i) : styleValue;
                L.StyleConverter.setCSSProperty(i, styleKey, style);
            }
            i.style.width = elementWidth + "px";
            paletteElement.appendChild(i);
        }
        return paletteElement;
    }
});

L.RegularPolygon = L.Polygon.extend({
    statics: {
        R: 6378.137,
        M_PER_KM: 1e3
    },
    initialize: function(centerLatLng, options) {
        this._centerLatLng = centerLatLng;
        L.Util.setOptions(this, options);
        L.Polygon.prototype.initialize.call(this, this._getLatLngs(), options);
    },
    options: {
        fill: true,
        radius: 1e3,
        numberOfSides: 4,
        rotation: 0,
        maxDegrees: 360
    },
    getLatLng: function() {
        return this._centerLatLng;
    },
    setRadius: function(radius) {
        this.options.radius = radius;
        this._latlngs = this._getLatLngs();
        this.redraw();
    },
    _getLatLngs: function() {
        var maxDegrees = this.options.maxDegrees || 360;
        var angleSize = maxDegrees / Math.max(this.options.numberOfSides, 3);
        var degrees = maxDegrees + this.options.rotation;
        var angle = this.options.rotation;
        var latlngs = [];
        var newLatLng;
        while (angle < degrees) {
            newLatLng = this._getPoint(angle);
            latlngs.push(newLatLng);
            angle += angleSize;
        }
        return latlngs;
    },
    _getPoint: function(angle) {
        var toRad = function(number) {
            return number * L.LatLng.DEG_TO_RAD;
        };
        var toDeg = function(number) {
            return number * L.LatLng.RAD_TO_DEG;
        };
        var angleRadians = toRad(angle);
        var angularDistance = this.options.radius / L.RegularPolygon.M_PER_KM / L.RegularPolygon.R;
        var lat1 = toRad(this._centerLatLng.lat);
        var lon1 = toRad(this._centerLatLng.lng);
        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(angleRadians));
        var lon2 = lon1 + Math.atan2(Math.sin(angleRadians) * Math.sin(angularDistance) * Math.cos(lat1), Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
        lat2 = toDeg(lat2);
        lon2 = toDeg(lon2);
        return new L.LatLng(lat2, lon2);
    },
    toGeoJSON: function() {
        var feature = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [ [], [] ]
            },
            properties: this.options
        };
        for (var i = 0; i < this._latlngs.length; ++i) {
            var latlng = this._latlngs[i];
            feature.coordinates[0].push([ latlng[1], latlng[0] ]);
        }
        return feature;
    }
});

L.regularPolygon = function(centerLatLng, options) {
    return new L.RegularPolygon(centerLatLng, options);
};

L.Path.XLINK_NS = "http://www.w3.org/1999/xlink";

var TextFunctions = TextFunctions || {
    __updatePath: L.Path.prototype._updatePath,
    _updatePath: function() {
        this.__updatePath.call(this);
        if (this.options.text) {
            this._createText(this.options.text);
        }
    },
    _initText: function() {
        if (this.options.text) {
            this._createText(this.options.text);
        }
    },
    getTextAnchor: function() {
        if (this._point) {
            return this._point;
        }
    },
    setTextAnchor: function(anchorPoint) {
        if (this._text) {
            this._text.setAttribute("x", anchorPoint.x);
            this._text.setAttribute("y", anchorPoint.y);
        }
    },
    _createText: function(options) {
        if (this._text) {
            this._container.removeChild(this._text);
        }
        if (this._pathDef) {
            this._defs.removeChild(this._pathDef);
        }
        var setStyle = function(element, style) {
            var styleString = "";
            for (var key in style) {
                styleString += key + ": " + style[key] + ";";
            }
            element.setAttribute("style", styleString);
            return element;
        };
        var setAttr = function(element, attr) {
            for (var key in attr) {
                element.setAttribute(key, attr[key]);
            }
            return element;
        };
        this._text = this._createElement("text");
        var textNode = document.createTextNode(options.text);
        if (options.path) {
            var pathOptions = options.path;
            var pathID = L.Util.guid();
            var clonedPath = this._createElement("path");
            clonedPath.setAttribute("d", this._path.getAttribute("d"));
            clonedPath.setAttribute("id", pathID);
            if (!this._defs) {
                this._defs = this._createElement("defs");
                this._container.appendChild(this._defs);
            }
            this._defs.appendChild(clonedPath);
            this._pathDef = clonedPath;
            var textPath = this._createElement("textPath");
            if (pathOptions.startOffset) {
                textPath.setAttribute("startOffset", pathOptions.startOffset);
            }
            if (pathOptions.attr) {
                setAttr(textPath, pathOptions.attr);
            }
            if (pathOptions.style) {
                setStyle(textPath, pathOptions.style);
            }
            textPath.setAttributeNS(L.Path.XLINK_NS, "xlink:href", "#" + pathID);
            textPath.appendChild(textNode);
            this._text.appendChild(textPath);
        } else {
            this._text.appendChild(textNode);
            var anchorPoint = this.getTextAnchor();
            this.setTextAnchor(anchorPoint);
        }
        if (options.className) {
            this._text.setAttribute("class", options.className);
        } else {
            this._text.setAttribute("class", "leaflet-svg-text");
        }
        if (options.attr) {
            setAttr(this._text, options.attr);
        }
        if (options.style) {
            setStyle(this._text, options.style);
        }
        this._container.appendChild(this._text);
    }
};

var PathFunctions = PathFunctions || {
    __updateStyle: L.Path.prototype._updateStyle,
    _createDefs: function() {
        this._defs = this._createElement("defs");
        this._container.appendChild(this._defs);
    },
    _createGradient: function(options) {
        if (!this._defs) {
            this._createDefs();
        }
        if (this._gradient) {
            this._defs.removeChild(this._gradient);
        }
        var gradient = this._createElement("linearGradient");
        var gradientGuid = L.Util.guid();
        this._gradientGuid = gradientGuid;
        options = options !== true ? L.extend({}, options) : {};
        var vector = options.vector || [ [ "0%", "0%" ], [ "100%", "100%" ] ];
        var vectorOptions = {
            x1: vector[0][0],
            x2: vector[1][0],
            y1: vector[0][1],
            y2: vector[1][1]
        };
        vectorOptions.id = "grad" + gradientGuid;
        var stops = options.stops || [ {
            offset: "0%",
            style: {
                color: "rgb(255, 255, 255)",
                opacity: 1
            }
        }, {
            offset: "60%",
            style: {
                color: this.options.fillColor || this.options.color,
                opacity: 1
            }
        } ];
        for (var key in vectorOptions) {
            gradient.setAttribute(key, vectorOptions[key]);
        }
        for (var i = 0; i < stops.length; ++i) {
            var stop = stops[i];
            var stopElement = this._createElement("stop");
            stop.style = stop.style || {};
            for (var key in stop) {
                var stopProperty = stop[key];
                if (key === "style") {
                    var styleProperty = "";
                    stopProperty.color = stopProperty.color || (this.options.fillColor || this.options.color);
                    stopProperty.opacity = typeof stopProperty.opacity === "undefined" ? 1 : stopProperty.opacity;
                    for (var propKey in stopProperty) {
                        styleProperty += "stop-" + propKey + ":" + stopProperty[propKey] + ";";
                    }
                    stopProperty = styleProperty;
                }
                stopElement.setAttribute(key, stopProperty);
            }
            gradient.appendChild(stopElement);
        }
        this._gradient = gradient;
        this._defs.appendChild(gradient);
    },
    _createDropShadow: function(options) {
        if (!this._defs) {
            this._createDefs();
        }
        if (this._dropShadow) {
            this._defs.removeChild(this._dropShadow);
        }
        var filterGuid = L.Util.guid();
        var filter = this._createElement("filter");
        var feOffset = this._createElement("feOffset");
        var feGaussianBlur = this._createElement("feGaussianBlur");
        var feBlend = this._createElement("feBlend");
        options = options || {
            width: "200%",
            height: "200%"
        };
        options.id = "filter" + filterGuid;
        for (var key in options) {
            filter.setAttribute(key, options[key]);
        }
        var offsetOptions = {
            result: "offOut",
            "in": "SourceAlpha",
            dx: "2",
            dy: "2"
        };
        var blurOptions = {
            result: "blurOut",
            "in": "offOut",
            stdDeviation: "2"
        };
        var blendOptions = {
            "in": "SourceGraphic",
            in2: "blurOut",
            mode: "lighten"
        };
        for (var key in offsetOptions) {
            feOffset.setAttribute(key, offsetOptions[key]);
        }
        for (var key in blurOptions) {
            feGaussianBlur.setAttribute(key, blurOptions[key]);
        }
        for (var key in blendOptions) {
            feBlend.setAttribute(key, blendOptions[key]);
        }
        filter.appendChild(feOffset);
        filter.appendChild(feGaussianBlur);
        filter.appendChild(feBlend);
        this._dropShadow = filter;
        this._defs.appendChild(filter);
    },
    _createCustomElement: function(tag, attributes) {
        var element = this._createElement(tag);
        for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    },
    _createImage: function(imageOptions) {
        var image = this._createElement("image");
        image.setAttribute("width", imageOptions.width);
        image.setAttribute("height", imageOptions.height);
        image.setAttribute("x", imageOptions.x || 0);
        image.setAttribute("y", imageOptions.y || 0);
        image.setAttributeNS(L.Path.XLINK_NS, "xlink:href", imageOptions.url);
        return image;
    },
    _createPattern: function(patternOptions) {
        var pattern = this._createCustomElement("pattern", patternOptions);
        return pattern;
    },
    _createShape: function(type, shapeOptions) {
        var shape = this._createCustomElement(type, shapeOptions);
        return shape;
    },
    _applyCustomStyles: function() {},
    _createFillPattern: function(imageOptions) {
        var patternGuid = L.Util.guid();
        var patternOptions = imageOptions.pattern;
        patternOptions.id = patternGuid;
        patternOptions.patternUnits = patternOptions.patternUnits || "objectBoundingBox";
        var pattern = this._createPattern(patternOptions);
        var image = this._createImage(imageOptions.image);
        image.setAttributeNS(L.Path.XLINK_NS, "xlink:href", imageOptions.url);
        pattern.appendChild(image);
        if (!this._defs) {
            this._createDefs();
        }
        this._defs.appendChild(pattern);
        this._path.setAttribute("fill", "url(#" + patternGuid + ")");
    },
    _getDefaultDiameter: function(radius) {
        return 1.75 * radius;
    },
    _createShapeImage: function(imageOptions) {
        imageOptions = imageOptions || {};
        var patternGuid = L.Util.guid();
        var radius = this.options.radius || Math.max(this.options.radiusX, this.options.radiusY);
        var diameter = this._getDefaultDiameter(radius);
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
        var shapeKeys = Object.keys(shapeOptions);
        var shapeType = shapeKeys.length > 0 ? shapeKeys[0] : "circle";
        shapeOptions[shapeType].fill = "url(#" + patternGuid + ")";
        var shape = this._createShape(shapeType, shapeOptions[shapeType]);
        if (this.options.clickable) {
            shape.setAttribute("class", "leaflet-clickable");
        }
        patternOptions.id = patternGuid;
        patternOptions.patternUnits = patternOptions.patternUnits || "objectBoundingBox";
        var pattern = this._createPattern(patternOptions);
        var imageOptions = imageOptions.image || {
            width: imageSize.x,
            height: imageSize.y,
            x: 0,
            y: 0,
            url: this.options.imageCircleUrl
        };
        var image = this._createImage(imageOptions);
        image.setAttributeNS(L.Path.XLINK_NS, "xlink:href", imageOptions.url);
        pattern.appendChild(image);
        this._defs.appendChild(pattern);
        this._container.insertBefore(shape, this._defs);
        this._shape = shape;
    },
    _updateStyle: function(layer) {
        this.__updateStyle.call(this, layer);
        var context = layer ? layer : this;
        if (context.options.stroke) {
            if (context.options.lineCap) {
                context._path.setAttribute("stroke-linecap", context.options.lineCap);
            }
            if (context.options.lineJoin) {
                context._path.setAttribute("stroke-linejoin", context.options.lineJoin);
            }
        }
        if (context.options.gradient) {
            context._createGradient(context.options.gradient);
            context._path.setAttribute("fill", "url(#" + context._gradient.getAttribute("id") + ")");
        } else if (!context.options.fill) {
            context._path.setAttribute("fill", "none");
        }
        if (context.options.dropShadow) {
            context._createDropShadow();
            context._path.setAttribute("filter", "url(#" + context._dropShadow.getAttribute("id") + ")");
        } else {
            context._path.removeAttribute("filter");
        }
        if (context.options.fillPattern) {
            context._createFillPattern(context.options.fillPattern);
        }
        context._applyCustomStyles();
    }
};

if (L.SVG) {
    var SVGStyleFunctions = L.Util.extend(PathFunctions, {
        __updateStyle: L.SVG.prototype._updateStyle
    });
    var SVGTextFunctions = L.Util.extend(TextFunctions, {
        __updatePath: L.SVG.prototype._updatePath
    });
    L.SVG.include(SVGStyleFunctions);
    L.SVG.include(SVGTextFunctions);
}

var LineTextFunctions = L.extend({}, TextFunctions);

LineTextFunctions.__updatePath = L.Polyline.prototype._updatePath;

LineTextFunctions.getCenter = function() {
    var latlngs = this._latlngs, len = latlngs.length, i, j, p1, p2, f, center;
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

LineTextFunctions.getTextAnchor = function() {
    var center = this.getCenter();
    return this._map.latLngToLayerPoint(center);
};

L.Polyline.include(LineTextFunctions);

L.CircleMarker.include(TextFunctions);

L.Path.include(PathFunctions);

L.Polygon.include(PathFunctions);

L.Polyline.include(PathFunctions);

L.CircleMarker.include(PathFunctions);

L.CircleMarker = L.CircleMarker.extend({
    _applyCustomStyles: function() {
        if (this.options.shapeImage || this.options.imageCircleUrl) {
            this._createShapeImage(this.options.shapeImage);
        }
    }
});

L.Point.prototype.rotate = function(angle, point) {
    var radius = this.distanceTo(point);
    var theta = angle * L.LatLng.DEG_TO_RAD + Math.atan2(this.y - point.y, this.x - point.x);
    this.x = point.x + radius * Math.cos(theta);
    this.y = point.y + radius * Math.sin(theta);
};

L.MapMarker = L.Path.extend({
    includes: TextFunctions,
    initialize: function(centerLatLng, options) {
        L.Path.prototype.initialize.call(this, options);
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
        color: "#000000",
        fillColor: "#0000FF",
        weight: 1,
        gradient: true,
        dropShadow: true,
        clickable: true
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        return this.redraw();
    },
    projectLatlngs: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._points = this._getPoints();
        if (this.options.innerRadius > 0) {
            this._innerPoints = this._getPoints(true).reverse();
        }
    },
    getBounds: function() {
        var map = this._map, height = this.options.radius * 3, point = map.project(this._latlng), swPoint = new L.Point(point.x - this.options.radius, point.y), nePoint = new L.Point(point.x + this.options.radius, point.y - height), sw = map.unproject(swPoint), ne = map.unproject(nePoint);
        return new L.LatLngBounds(sw, ne);
    },
    getLatLng: function() {
        return this._latlng;
    },
    setRadius: function(radius) {
        this.options.radius = radius;
        return this.redraw();
    },
    setInnerRadius: function(innerRadius) {
        this.options.innerRadius = innerRadius;
        return this.redraw();
    },
    setRotation: function(rotation) {
        this.options.rotation = rotation;
        return this.redraw();
    },
    setNumberOfSides: function(numberOfSides) {
        this.options.numberOfSides = numberOfSides;
        return this.redraw();
    },
    getPathString: function() {
        var anchorPoint = this.getTextAnchor();
        if (this._shape) {
            if (this._shape.tagName === "circle" || this._shape.tagName === "ellipse") {
                this._shape.setAttribute("cx", anchorPoint.x);
                this._shape.setAttribute("cy", anchorPoint.y);
            } else {
                var width = this._shape.getAttribute("width");
                var height = this._shape.getAttribute("height");
                this._shape.setAttribute("x", anchorPoint.x - Number(width) / 2);
                this._shape.setAttribute("y", anchorPoint.y - Number(height) / 2);
            }
        }
        this._path.setAttribute("shape-rendering", "geometricPrecision");
        return new L.SVGPathBuilder(this._points, this._innerPoints).build(6);
    },
    getTextAnchor: function() {
        return new L.Point(this._point.x, this._point.y - 2 * this.options.radius);
    },
    _getPoints: function(inner) {
        var maxDegrees = !inner ? 210 : 360;
        var angleSize = !inner ? maxDegrees / 50 : maxDegrees / Math.max(this.options.numberOfSides, 3);
        var degrees = !inner ? maxDegrees : maxDegrees + this.options.rotation;
        var angle = !inner ? -30 : this.options.rotation;
        var points = [];
        var newPoint;
        var angleRadians;
        var radius = this.options.radius;
        var multiplier = Math.sqrt(.75);
        var toRad = function(number) {
            return number * L.LatLng.DEG_TO_RAD;
        };
        var startPoint = this._point;
        if (!inner) {
            points.push(startPoint);
            points.push(new L.Point(startPoint.x + multiplier * radius, startPoint.y - 1.5 * radius));
        }
        while (angle < degrees) {
            angleRadians = toRad(angle);
            newPoint = this._getPoint(angleRadians, radius, inner);
            points.push(newPoint);
            angle += angleSize;
        }
        if (!inner) {
            points.push(new L.Point(startPoint.x - multiplier * radius, startPoint.y - 1.5 * radius));
        }
        return points;
    },
    _getPoint: function(angle, radius, inner) {
        var markerRadius = radius;
        radius = !inner ? radius : this.options.innerRadius;
        return new L.Point(this._point.x + this.options.position.x + radius * Math.cos(angle), this._point.y - 2 * markerRadius + this.options.position.y - radius * Math.sin(angle));
    },
    _applyCustomStyles: function() {
        if (this.options.shapeImage || this.options.imageCircleUrl) {
            this._createShapeImage(this.options.shapeImage);
        }
    },
    toGeoJSON: function() {
        return L.Util.pointToGeoJSON.call(this);
    }
});

L.mapMarker = function(centerLatLng, options) {
    return new L.MapMarker(centerLatLng, options);
};

L.RegularPolygonMarker = L.Path.extend({
    includes: TextFunctions,
    initialize: function(centerLatLng, options) {
        L.Path.prototype.initialize ? L.Path.prototype.initialize.call(this, options) : L.setOptions(this, options);
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
        clickable: true
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        return this.redraw();
    },
    projectLatlngs: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._points = this._getPoints();
        if (this.options.innerRadius || this.options.innerRadiusX && this.options.innerRadiusY) {
            this._innerPoints = this._getPoints(true).reverse();
        }
    },
    getBounds: function() {
        var map = this._map, radiusX = this.options.radius || this.options.radiusX, radiusY = this.options.radius || this.options.radiusY, deltaX = radiusX * Math.cos(Math.PI / 4), deltaY = radiusY * Math.sin(Math.PI / 4), point = map.project(this._latlng), swPoint = new L.Point(point.x - deltaX, point.y + deltaY), nePoint = new L.Point(point.x + deltaX, point.y - deltaY), sw = map.unproject(swPoint), ne = map.unproject(nePoint);
        return new L.LatLngBounds(sw, ne);
    },
    setRadius: function(radius) {
        this.options.radius = radius;
        return this.redraw();
    },
    setRadiusXY: function(radiusX, radiusY) {
        this.options.radius = null;
        this.options.radiusX = radiusX;
        this.options.radiusY = radiusY;
        return this.redraw();
    },
    setInnerRadius: function(innerRadius) {
        this.options.innerRadius = innerRadius;
        return this.redraw();
    },
    setInnerRadiusXY: function(innerRadiusX, innerRadiusY) {
        this.options.innerRadius = null;
        this.options.innerRadiusX = innerRadiusX;
        this.options.innerRadiusY = innerRadiusY;
        return this.redraw();
    },
    setRotation: function(rotation) {
        this.options.rotation = rotation;
        return this.redraw();
    },
    setNumberOfSides: function(numberOfSides) {
        this.options.numberOfSides = numberOfSides;
        return this.redraw();
    },
    getLatLng: function() {
        return this._latlng;
    },
    getPathString: function() {
        var anchorPoint = this.getTextAnchor();
        if (this._shape) {
            if (this._shape.tagName === "circle" || this._shape.tagName === "ellipse") {
                this._shape.setAttribute("cx", anchorPoint.x);
                this._shape.setAttribute("cy", anchorPoint.y);
            } else {
                var width = this._shape.getAttribute("width");
                var height = this._shape.getAttribute("height");
                this._shape.setAttribute("x", anchorPoint.x - Number(width) / 2);
                this._shape.setAttribute("y", anchorPoint.y - Number(height) / 2);
            }
        }
        this._path.setAttribute("shape-rendering", "geometricPrecision");
        return new L.SVGPathBuilder(this._points, this._innerPoints).build(6);
    },
    _getPoints: function(inner) {
        var maxDegrees = this.options.maxDegrees || 360;
        var angleSize = maxDegrees / Math.max(this.options.numberOfSides, 3);
        var degrees = maxDegrees;
        var angle = 0;
        var points = [];
        var newPoint;
        var angleRadians;
        var radiusX = !inner ? this.options.radius || this.options.radiusX : this.options.innerRadius || this.options.innerRadiusX;
        var radiusY = !inner ? this.options.radius || this.options.radiusY : this.options.innerRadius || this.options.innerRadiusY;
        var toRad = function(number) {
            return number * L.LatLng.DEG_TO_RAD;
        };
        while (angle < degrees) {
            angleRadians = toRad(angle);
            newPoint = this._getPoint(angleRadians, radiusX, radiusY);
            points.push(newPoint);
            angle += angleSize;
        }
        return points;
    },
    _getPoint: function(angle, radiusX, radiusY) {
        var startPoint = this.options.position ? this._point.add(new L.Point(this.options.position.x, this.options.position.y)) : this._point;
        var point = new L.Point(startPoint.x + radiusX * Math.cos(angle), startPoint.y + radiusY * Math.sin(angle));
        point.rotate(this.options.rotation, startPoint);
        return point;
    },
    _getDefaultDiameter: function(radius) {
        var angle = Math.PI / this.options.numberOfSides;
        var minLength = radius * Math.cos(angle);
        return 1.75 * minLength;
    },
    _applyCustomStyles: function() {
        if (this.options.shapeImage || this.options.imageCircleUrl) {
            this._createShapeImage(this.options.shapeImage);
        }
    },
    toGeoJSON: function() {
        return L.Util.pointToGeoJSON.call(this);
    }
});

L.regularPolygonMarker = function(centerLatLng, options) {
    return new L.RegularPolygonMarker(centerLatLng, options);
};

L.StarMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfPoints: 5,
        rotation: -15,
        maxDegrees: 360,
        gradient: true,
        dropShadow: true
    },
    setNumberOfPoints: function(numberOfPoints) {
        this.options.numberOfPoints = numberOfPoints;
        return this.redraw();
    },
    _getPoints: function(inner) {
        var maxDegrees = this.options.maxDegrees || 360;
        var angleSize = maxDegrees / this.options.numberOfPoints;
        var degrees = maxDegrees;
        var angle = 0;
        var points = [];
        var newPoint, newPointInner;
        var angleRadians;
        var radiusX = !inner ? this.options.radius || this.options.radiusX : this.options.innerRadius || this.options.innerRadiusX;
        var radiusY = !inner ? this.options.radius || this.options.radiusY : this.options.innerRadius || this.options.innerRadiusY;
        var toRad = function(number) {
            return number * L.LatLng.DEG_TO_RAD;
        };
        while (angle < degrees) {
            angleRadians = toRad(angle);
            newPoint = this._getPoint(angleRadians, radiusX, radiusY);
            newPointInner = this._getPoint(angleRadians + toRad(angleSize) / 2, radiusX / 2, radiusY / 2);
            points.push(newPoint);
            points.push(newPointInner);
            angle += angleSize;
        }
        return points;
    }
});

L.starMarker = function(centerLatLng, options) {
    return new L.StarMarker(centerLatLng, options);
};

L.TriangleMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfSides: 3,
        rotation: 30,
        radius: 5
    }
});

L.triangleMarker = function(centerLatLng, options) {
    return new L.TriangleMarker(centerLatLng, options);
};

L.DiamondMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfSides: 4,
        radiusX: 5,
        radiusY: 10
    }
});

L.diamondMarker = function(centerLatLng, options) {
    return new L.DiamondMarker(centerLatLng, options);
};

L.SquareMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfSides: 4,
        rotation: 45,
        radius: 5
    }
});

L.squareMarker = function(centerLatLng, options) {
    return new L.SquareMarker(centerLatLng, options);
};

L.PentagonMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfSides: 5,
        rotation: -18,
        radius: 5
    }
});

L.pentagonMarker = function(centerLatLng, options) {
    return new L.PentagonMarker(centerLatLng, options);
};

L.HexagonMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfSides: 6,
        rotation: 30,
        radius: 5
    }
});

L.hexagonMarker = function(centerLatLng, options) {
    return new L.HexagonMarker(centerLatLng, options);
};

L.OctagonMarker = L.RegularPolygonMarker.extend({
    options: {
        numberOfSides: 8,
        rotation: 22.5,
        radius: 5
    }
});

L.octagonMarker = function(centerLatLng, options) {
    return new L.OctagonMarker(centerLatLng, options);
};

L.SVGMarker = L.Path.extend({
    initialize: function(latlng, options) {
        L.Path.prototype.initialize.call(this, options);
        this._svg = options.svg;
        if (this._svg.indexOf("<") === 0) {
            this._data = this._svg;
        }
        this._latlng = latlng;
    },
    projectLatlngs: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        this.redraw();
    },
    getLatLng: function() {
        return this._latlng;
    },
    getPathString: function() {
        var me = this;
        var addSVG = function() {
            var g = me._path.parentNode;
            while (g.nodeName.toLowerCase() !== "g") {
                g = g.parentNode;
            }
            if (me.options.clickable) {
                g.setAttribute("class", "leaflet-clickable");
            }
            var data = me._data;
            var svg = data.nodeName.toLowerCase() === "svg" ? data.cloneNode(true) : data.querySelector("svg").cloneNode(true);
            if (me.options.setStyle) {
                me.options.setStyle.call(me, svg);
            }
            var elementWidth = svg.getAttribute("width");
            var elementHeight = svg.getAttribute("height");
            var width = elementWidth ? elementWidth.replace("px", "") : "100%";
            var height = elementHeight ? elementHeight.replace("px", "") : "100%";
            if (width === "100%") {
                width = me.options.size.x;
                height = me.options.size.y;
                svg.setAttribute("width", width + (String(width).indexOf("%") !== -1 ? "" : "px"));
                svg.setAttribute("height", height + (String(height).indexOf("%") !== -1 ? "" : "px"));
            }
            var size = me.options.size || new L.Point(width, height);
            var scaleSize = new L.Point(size.x / width, size.y / height);
            var old = g.getElementsByTagName("svg");
            if (old.length > 0) {
                old[0].parentNode.removeChild(old[0]);
            }
            g.appendChild(svg);
            var transforms = [];
            var anchor = me.options.anchor || new L.Point(-size.x / 2, -size.y / 2);
            var x = me._point.x + anchor.x;
            var y = me._point.y + anchor.y;
            transforms.push("translate(" + x + " " + y + ")");
            transforms.push("scale(" + scaleSize.x + " " + scaleSize.y + ")");
            if (me.options.rotation) {
                transforms.push("rotate(" + me.options.rotation + " " + width / 2 + " " + height / 2 + ")");
            }
            g.setAttribute("transform", transforms.join(" "));
        };
        if (!this._data) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    me._data = this.responseXML;
                    addSVG();
                }
            };
            xhr.open("GET", this._svg, true);
            xhr.send(null);
        } else {
            addSVG();
        }
    },
    toGeoJSON: function() {
        return pointToGeoJSON.call(this);
    }
});

L.MarkerGroup = L.FeatureGroup.extend({
    initialize: function(latlng, markers) {
        L.FeatureGroup.prototype.initialize.call(this, markers);
        this.setLatLng(latlng);
    },
    setStyle: function(style) {
        return this;
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        this.eachLayer(function(layer) {
            if (layer.setLatLng) {
                layer.setLatLng(latlng);
            }
        });
        return this;
    },
    getLatLng: function(latlng) {
        return this._latlng;
    },
    toGeoJSON: function() {
        var featureCollection = {
            type: "FeatureCollection",
            features: []
        };
        var eachLayerFunction = function(featureCollection) {
            return function(layer) {
                featureCollection.features.push(L.Util.pointToGeoJSON.call(layer));
            };
        };
        this.eachLayer(eachLayerFunction(featureCollection));
        return featureCollection;
    }
});

L.BarMarker = L.Path.extend({
    initialize: function(centerLatLng, options) {
        L.Path.prototype.initialize.call(this, options);
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
        color: "#000",
        opacity: 1,
        gradient: true,
        dropShadow: false,
        lineCap: "square",
        lineJoin: "miter"
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        return this.redraw();
    },
    projectLatlngs: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._points = this._getPoints();
    },
    getBounds: function() {
        var map = this._map, point = map.project(this._latlng), halfWidth = this.options.width / 2, swPoint = new L.Point(point.x - halfWidth, point.y), nePoint = new L.Point(point.x + halfWidth, point.y - this.options.maxHeight), sw = map.unproject(swPoint), ne = map.unproject(nePoint);
        return new L.LatLngBounds(sw, ne);
    },
    getLatLng: function() {
        return this._latlng;
    },
    getPathString: function() {
        this._path.setAttribute("shape-rendering", "crispEdges");
        return new L.SVGPathBuilder(this._points).build();
    },
    _getPoints: function() {
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
        points = [ sePoint, nePoint, nwPoint, swPoint ];
        return points;
    }
});

L.barMarker = function(centerLatLng, options) {
    return new L.BarMarker(centerLatLng, options);
};

L.ChartMarker = L.FeatureGroup.extend({
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        this._layers = {};
        this._latlng = centerLatLng;
        this._loadComponents();
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        return this.redraw();
    },
    getLatLng: function() {
        return this._latlng;
    },
    _loadComponents: function() {},
    _highlight: function(options) {
        if (options.weight) {
            options.weight *= 2;
        }
        return options;
    },
    _unhighlight: function(options) {
        if (options.weight) {
            options.weight /= 2;
        }
        return options;
    },
    _bindMouseEvents: function(chartElement) {
        var self = this;
        var tooltipOptions = this.options.tooltipOptions;
        chartElement.on("mouseover", function(e) {
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
            newX = x < 0 ? iconSize.x - x + offset : -x - offset;
            newY = y < 0 ? iconSize.y - y + offset : -y - offset;
            newPoint = new L.Point(newX, newY);
            var legendOptions = {};
            var displayText = currentOptions.displayText ? currentOptions.displayText(value) : value;
            legendOptions[key] = {
                name: currentOptions.displayName,
                value: displayText
            };
            var icon = new L.LegendIcon(legendOptions, currentOptions, {
                className: "leaflet-div-icon",
                iconSize: tooltipOptions ? tooltipOptions.iconSize : iconSize,
                iconAnchor: newPoint
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
        chartElement.on("mouseout", function(e) {
            var currentOptions = this.options;
            currentOptions = self._unhighlight(currentOptions);
            this.initialize(self._latlng, currentOptions);
            this.redraw();
            this.setStyle(currentOptions);
            self.removeLayer(currentOptions.marker);
        });
    },
    bindPopup: function(content, options) {
        this.eachLayer(function(layer) {
            layer.bindPopup(content, options);
        });
    },
    openPopup: function(latlng) {
        for (var i in this._layers) {
            var layer = this._layers[i];
            latlng = latlng || this._latlng;
            layer.openPopup(latlng);
            break;
        }
    },
    closePopup: function() {
        for (var i in this._layers) {
            var layer = this._layers[i];
            latlng = latlng || this._latlng;
            layer.closePopup();
            break;
        }
    },
    redraw: function() {
        this.clearLayers();
        this._loadComponents();
    },
    toGeoJSON: function() {
        return L.Util.pointToGeoJSON.call(this);
    }
});

L.BarChartMarker = L.ChartMarker.extend({
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
    },
    options: {
        weight: 1,
        opacity: 1,
        color: "#000",
        fill: true,
        position: {
            x: 0,
            y: 0
        },
        width: 10,
        offset: 0,
        iconSize: new L.Point(50, 40)
    },
    _loadComponents: function() {
        var value, minValue, maxValue;
        var bar;
        var options = this.options;
        var x;
        var y;
        var keys = Object.keys(this.options.data);
        var count = keys.length;
        var width = this.options.width;
        var offset = this.options.offset || 0;
        var data = this.options.data;
        var chartOptions = this.options.chartOptions;
        var chartOption;
        x = -(width * count + offset * (count - 1)) / 2 + width / 2;
        y = 0;
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
            options.opacity = this.options.opacity || 1;
            options.fillOpacity = this.options.fillOpacity || .7;
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

L.RadialBarMarker = L.Path.extend({
    initialize: function(centerLatLng, options) {
        L.Path.prototype.initialize.call(this, options);
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
    setLatLng: function(latlng) {
        this._latlng = latlng;
        return this.redraw();
    },
    projectLatlngs: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._points = this._getPoints();
    },
    getBounds: function() {
        var map = this._map, radiusX = this.options.radiusX || this.options.radius, radiusY = this.options.radiusY || this.options.radius, deltaX = radiusX * Math.cos(Math.PI / 4), deltaY = radiusY * Math.sin(Math.PI / 4), point = map.project(this._latlng), swPoint = new L.Point(point.x - deltaX, point.y + deltaY), nePoint = new L.Point(point.x + deltaX, point.y - deltaY), sw = map.unproject(swPoint), ne = map.unproject(nePoint);
        return new L.LatLngBounds(sw, ne);
    },
    getLatLng: function() {
        return this._latlng;
    },
    getPathString: function() {
        var angle = this.options.endAngle - this.options.startAngle;
        var largeArc = angle >= 180 ? "1" : "0";
        var radiusX = this.options.radiusX || this.options.radius;
        var radiusY = this.options.radiusY || this.options.radius;
        var path = "M" + this._points[0].x.toFixed(2) + "," + this._points[0].y.toFixed(2) + "A" + radiusX.toFixed(2) + "," + radiusY.toFixed(2) + " 0 " + largeArc + ",1 " + this._points[1].x.toFixed(2) + "," + this._points[1].y.toFixed(2) + "L";
        if (this._innerPoints) {
            path = path + this._innerPoints[0].x.toFixed(2) + "," + this._innerPoints[0].y.toFixed(2);
            path = path + "A" + (radiusX - this.options.barThickness).toFixed(2) + "," + (radiusY - this.options.barThickness).toFixed(2) + " 0 " + largeArc + ",0 " + this._innerPoints[1].x.toFixed(2) + "," + this._innerPoints[1].y.toFixed(2) + "z";
        } else {
            path = path + this._point.x.toFixed(2) + "," + this._point.y.toFixed(2) + "z";
        }
        if (L.Browser.vml) {
            path = Core.SVG.path(path);
        }
        this._path.setAttribute("shape-rendering", "geometricPrecision");
        return path;
    },
    _getPoints: function() {
        var angleDelta = this.options.endAngle - this.options.startAngle;
        var degrees = this.options.endAngle + this.options.rotation;
        var angle = this.options.startAngle + this.options.rotation;
        var points = [];
        var radiusX = "radiusX" in this.options ? this.options.radiusX : this.options.radius;
        var radiusY = "radiusY" in this.options ? this.options.radiusY : this.options.radius;
        var toRad = function(number) {
            return number * L.LatLng.DEG_TO_RAD;
        };
        if (angleDelta === 360) {
            degrees = degrees - .1;
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
    _getPoint: function(angle, radiusX, radiusY) {
        return new L.Point(this._point.x + this.options.position.x + radiusX * Math.cos(angle), this._point.y + this.options.position.y + radiusY * Math.sin(angle));
    }
});

L.radialBarMarker = function(centerLatLng, options) {
    return new L.RadialBarMarker(centerLatLng, options);
};

L.PieChartMarker = L.ChartMarker.extend({
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
    },
    options: {
        weight: 1,
        opacity: 1,
        color: "#000",
        fill: true,
        radius: 10,
        rotation: 0,
        numberOfSides: 50,
        mouseOverExaggeration: 1.2,
        maxDegrees: 360,
        iconSize: new L.Point(50, 40)
    },
    _highlight: function(options) {
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
    _unhighlight: function(options) {
        options.radiusX = options.oldRadiusX;
        options.radiusY = options.oldRadiusY;
        options.barThickness = options.oldBarThickness;
        return options;
    },
    _loadComponents: function() {
        var value;
        var sum = 0;
        var angle = 0;
        var percentage = 0;
        var maxDegrees = this.options.maxDegrees || 360;
        var lastAngle = this.options.rotation;
        var bar;
        var options = this.options;
        var data = this.options.data;
        var chartOptions = this.options.chartOptions;
        var chartOption;
        var key;
        var getValue = function(data, key) {
            var value = 0;
            if (data[key]) {
                value = parseFloat(data[key]);
            }
            return value;
        };
        for (key in data) {
            value = getValue(data, key);
            sum += value;
        }
        if (sum > 0) {
            for (key in data) {
                value = parseFloat(data[key]);
                chartOption = chartOptions[key];
                percentage = value / sum;
                angle = percentage * maxDegrees;
                options.startAngle = lastAngle;
                options.endAngle = lastAngle + angle;
                options.fillColor = chartOption.fillColor;
                options.color = chartOption.color || "#000";
                options.radiusX = this.options.radiusX || this.options.radius;
                options.radiusY = this.options.radiusY || this.options.radius;
                options.rotation = 0;
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

L.pieChartMarker = function(centerLatLng, options) {
    return new L.PieChartMarker(centerLatLng, options);
};

L.CoxcombChartMarker = L.PieChartMarker.extend({
    statics: {
        SIZE_MODE_RADIUS: "radius",
        SIZE_MODE_AREA: "area"
    }
});

L.CoxcombChartMarker = L.CoxcombChartMarker.extend({
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        L.PieChartMarker.prototype.initialize.call(this, centerLatLng, options);
    },
    options: {
        weight: 1,
        opacity: 1,
        color: "#000",
        fill: true,
        radius: 10,
        rotation: 0,
        numberOfSides: 50,
        mouseOverExaggeration: 1.2,
        maxDegrees: 360,
        iconSize: new L.Point(50, 40),
        sizeMode: L.CoxcombChartMarker.SIZE_MODE_AREA
    },
    _loadComponents: function() {
        var value, minValue, maxValue;
        var angle = 0;
        var maxDegrees = this.options.maxDegrees || 360;
        var lastAngle = this.options.rotation;
        var bar;
        var options = this.options;
        var radiusX = "radiusX" in this.options ? this.options.radiusX : this.options.radius;
        var radiusY = "radiusY" in this.options ? this.options.radiusY : this.options.radius;
        var keys = Object.keys(this.options.data);
        var count = keys.length;
        var data = this.options.data;
        var chartOptions = this.options.chartOptions;
        var chartOption;
        angle = maxDegrees / count;
        for (var key in data) {
            value = parseFloat(data[key]);
            chartOption = chartOptions[key];
            var minValue = chartOption.minValue || 0;
            var maxValue = chartOption.maxValue;
            if (this.options.sizeMode === L.CoxcombChartMarker.SIZE_MODE_RADIUS) {
                var evalFunctionX = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, radiusX));
                var evalFunctionY = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, radiusY));
                options.radiusX = evalFunctionX.evaluate(value);
                options.radiusY = evalFunctionY.evaluate(value);
            } else {
                var radius = Math.max(radiusX, radiusY);
                var maxArea = Math.PI * Math.pow(radius, 2) / count;
                var evalFunctionArea = new L.LinearFunction(new L.Point(minValue, 0), new L.Point(maxValue, maxArea), {
                    postProcess: function(value) {
                        return Math.sqrt(count * value / Math.PI);
                    }
                });
                options.radiusX = evalFunctionArea.evaluate(value);
                options.radiusY = options.radiusX;
            }
            options.startAngle = lastAngle;
            options.endAngle = lastAngle + angle;
            options.fillColor = chartOption.fillColor;
            options.color = chartOption.color || "#000";
            options.rotation = 0;
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

L.coxcombChartMarker = function(centerLatLng, options) {
    return new L.CoxcombChartMarker(centerLatLng, options);
};

L.RadialBarChartMarker = L.ChartMarker.extend({
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
    },
    options: {
        weight: 1,
        opacity: 1,
        color: "#000",
        fill: true,
        radius: 10,
        rotation: 0,
        numberOfSides: 30,
        offset: 2,
        barThickness: 5,
        maxDegrees: 360,
        iconSize: new L.Point(50, 40)
    },
    _loadComponents: function() {
        var value, minValue, maxValue;
        var angle = this.options.rotation;
        var maxDegrees = this.options.maxDegrees || 360;
        var bar;
        var options = this.options;
        var lastRadiusX = this.options.radiusX || this.options.radius;
        var lastRadiusY = this.options.radiusY || this.options.radius;
        var data = this.options.data;
        var chartOptions = this.options.chartOptions;
        var chartOption;
        var barThickness = this.options.barThickness || 4;
        var offset = this.options.offset || 2;
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

L.radialBarChartMarker = function(centerLatLng, options) {
    return new L.RadialBarChartMarker(centerLatLng, options);
};

L.StackedRegularPolygonMarker = L.ChartMarker.extend({
    options: {
        iconSize: new L.Point(50, 40)
    },
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
    },
    _loadComponents: function() {
        var value;
        var lastRadiusX = 0;
        var lastRadiusY = 0;
        var bar;
        var options = this.options;
        var data = this.options.data;
        var chartOptions = this.options.chartOptions;
        var chartOption;
        var key;
        var bars = [];
        for (key in data) {
            value = parseFloat(data[key]);
            chartOption = chartOptions[key];
            minValue = chartOption.minValue || 0;
            maxValue = chartOption.maxValue || 100;
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
            options.opacity = this.options.opacity || 1;
            options.fillOpacity = this.options.fillOpacity || .7;
            options.weight = this.options.weight || 1;
            options.color = chartOption.color || this.options.color;
            options.displayText = chartOption.displayText;
            bar = new L.RegularPolygonMarker(this._latlng, options);
            this._bindMouseEvents(bar);
            lastRadiusX = options.radiusX;
            lastRadiusY = options.radiusY;
            if (this.options.drawReverse) {
                bars.push(bar);
            } else {
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

L.RadialMeterMarker = L.ChartMarker.extend({
    initialize: function(centerLatLng, options) {
        L.Util.setOptions(this, options);
        L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
    },
    options: {
        weight: 1,
        opacity: 1,
        color: "#000",
        fill: true,
        radius: 10,
        rotation: 180,
        numberOfSides: 30,
        offset: 2,
        barThickness: 5,
        maxDegrees: 180,
        iconSize: new L.Point(50, 40),
        backgroundStyle: {
            fill: true,
            fillColor: "#707070",
            fillOpacity: .2,
            opacity: .8,
            color: "#505050"
        }
    },
    _loadComponents: function() {
        var value, minValue, maxValue;
        var startAngle = this.options.rotation;
        var maxDegrees = this.options.maxDegrees || 360;
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
        for (var key in data) {
            value = parseFloat(data[key]);
            chartOption = chartOptions[key];
            displayOptions = this.options.displayOptions ? this.options.displayOptions[key] : {};
            minValue = chartOption.minValue || 0;
            maxValue = chartOption.maxValue || 100;
            var range = maxValue - minValue;
            var angle = maxDegrees / range * (value - minValue);
            var endAngle = startAngle + angle;
            var maxAngle = startAngle + maxDegrees;
            var evalFunction = new L.LinearFunction(new L.Point(startAngle, minValue), new L.Point(maxAngle, maxValue));
            while (lastAngle < endAngle) {
                options.startAngle = lastAngle;
                var delta = Math.min(angleDelta, endAngle - lastAngle);
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
                var evalValue = evalFunction.evaluate(lastAngle + delta);
                for (var displayKey in displayOptions) {
                    options[displayKey] = displayOptions[displayKey].evaluate ? displayOptions[displayKey].evaluate(evalValue) : displayOptions[displayKey];
                }
                bar = new L.RadialBarMarker(this._latlng, options);
                this._bindMouseEvents(bar);
                this.addLayer(bar);
                lastAngle += delta;
            }
            if (this.options.backgroundStyle) {
                if (lastAngle < maxAngle) {
                    var delta = maxAngle - lastAngle;
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
                    var evalValue = evalFunction.evaluate(lastAngle + delta);
                    bar = new L.RadialBarMarker(this._latlng, options);
                    this.addLayer(bar);
                }
            }
        }
    }
});

L.LocationModes = {
    LATLNG: function(record, index) {
        var getLocation = function(latitudeField, longitudeField) {
            var latitude = L.Util.getFieldValue(record, latitudeField);
            var longitude = L.Util.getFieldValue(record, longitudeField);
            var location = null;
            if (latitude && longitude) {
                var latlng = new L.LatLng(latitude, longitude);
                location = {
                    location: latlng,
                    text: [ latlng.lat.toFixed(3), latlng.lng.toFixed(3) ].join(", "),
                    center: latlng
                };
            }
            return location;
        };
        var location = getLocation(this.options.latitudeField, this.options.longitudeField);
        if (!location && this.options.fallbackLocationFields) {
            var index = 0;
            var fallbackLocationFields;
            while (!location && index < this.options.fallbackLocationFields.length) {
                fallbackLocationFields = this.options.fallbackLocationFields[index];
                location = getLocation(fallbackLocationFields.latitudeField, fallbackLocationFields.longitudeField);
                index++;
            }
        }
        return location;
    },
    GEOHASH: function(record, index) {
        var geohash = this.options.geohashField ? L.Util.getFieldValue(record, this.options.geohashField) : index;
        var locationInfo = decodeGeoHash(geohash);
        var bounds;
        if (locationInfo.latitude[2] && locationInfo.longitude[2]) {
            bounds = new L.LatLngBounds(new L.LatLng(locationInfo.latitude[0], locationInfo.longitude[0]), new L.LatLng(locationInfo.latitude[1], locationInfo.longitude[1]));
        }
        return {
            location: bounds,
            text: geohash,
            center: bounds.getCenter()
        };
    },
    GWCOUNTRY: function(record, index) {
        var code = this.options.codeField ? L.Util.getFieldValue(record, this.options.codeField) : index;
        var geoJSON;
        var centroid;
        var gwNoLookup = L.gwNoLookup || {};
        var countries = L.countries || {};
        var countryCentroids = L.countryCentroids || {};
        var originalCode = code.toUpperCase();
        code = originalCode;
        var gwNo = originalCode in gwNoLookup;
        if (gwNo) {
            code = gwNoLookup[originalCode] || code;
        }
        if (code) {
            geoJSON = countries[code];
            centroid = countryCentroids[code];
        } else {
            console.log("Code not found: " + originalCode);
        }
        var geoJSONLayer = new L.GeoJSON(geoJSON);
        return {
            location: geoJSONLayer,
            text: L.GeometryUtils.getName(geoJSON) || code,
            center: centroid
        };
    },
    COUNTRY: function(record, index) {
        var code = this.options.codeField ? L.Util.getFieldValue(record, this.options.codeField) : index;
        var geoJSON;
        var centroid;
        var codeLookup = L.codeLookup || {};
        var alpha2Lookup = L.alpha2Lookup || {};
        var fips2Lookup = L.fips2Lookup || {};
        var countries = L.countries || {};
        var countryCentroids = L.countryCentroids || {};
        var originalCode = code.toUpperCase();
        code = originalCode;
        if (code.length === 2) {
            code = alpha2Lookup[originalCode] || fips2Lookup[originalCode];
        } else if (code.length === 3) {
            code = codeLookup[originalCode] || code;
        }
        if (code) {
            geoJSON = countries[code];
            centroid = countryCentroids[code];
        } else {
            console.log("Code not found: " + originalCode);
        }
        var geoJSONLayer = new L.GeoJSON(geoJSON);
        return {
            location: geoJSONLayer,
            text: L.GeometryUtils.getName(geoJSON) || code,
            center: centroid
        };
    },
    STATE: function(record, index) {
        var code = this.options.codeField ? L.Util.getFieldValue(record, this.options.codeField) : index;
        var geoJSON;
        var centroid;
        var states = L.states || {};
        var stateCentroids = L.stateCentroids || {};
        var originalCode = code.toUpperCase();
        code = originalCode;
        geoJSON = states[code];
        centroid = stateCentroids[code];
        var geoJSONLayer = new L.GeoJSON(geoJSON);
        return {
            location: geoJSONLayer,
            text: L.GeometryUtils.getName(geoJSON) || code,
            center: centroid
        };
    },
    GEOJSON: function(record, index) {
        var locationField = this.options.geoJSONField;
        var geoJSON = locationField ? L.Util.getFieldValue(record, locationField) : record;
        var location = null;
        if (geoJSON) {
            var me = this;
            var recordToLayer = function(location, record) {
                return me.recordToLayer(location, record);
            };
            location = L.GeometryUtils.getGeoJSONLocation(geoJSON, record, this.options.locationTextField, recordToLayer);
        }
        return location;
    },
    LOOKUP: function(record, index) {
        var code = this.options.codeField ? L.Util.getFieldValue(record, this.options.codeField) : index;
        this._lookupIndex = this._lookupIndex || L.GeometryUtils.indexFeatureCollection(this.options.locationLookup, this.options.locationIndexField || this.options.codeField);
        var geoJSON = this._lookupIndex[code];
        var location = null;
        if (!geoJSON && code.indexOf("0") === 0) {
            geoJSON = this._lookupIndex[code.substring(1)];
        }
        if (geoJSON) {
            var me = this;
            var recordToLayer = function(location, record) {
                return me.recordToLayer(location, record);
            };
            location = L.GeometryUtils.getGeoJSONLocation(geoJSON, record, this.options.locationTextField, recordToLayer);
        }
        return location;
    },
    CUSTOM: function(record, index) {
        var locationField = this.options.codeField;
        var fieldValue = L.Util.getFieldValue(record, locationField);
        var context = {};
        var location;
        context[fieldValue] = record;
        if (this.options.getLocation) {
            var self = this;
            var callback = function(key, location) {
                self.locationToLayer(location, context[key]);
            };
            location = this.options.getLocation(context, locationField, [ fieldValue ], callback);
        }
        return location;
    }
};

L.DataLayer = L.LayerGroup.extend({
    includes: L.Mixin.Events,
    options: {
        recordsField: "features",
        locationMode: L.LocationModes.LATLNG,
        latitudeField: "geometry.coordinates.1",
        longitudeField: "geometry.coordinates.0",
        displayField: null,
        displayOptions: null,
        layerOptions: {
            numberOfSides: 4,
            radius: 10,
            weight: 1,
            color: "#000"
        },
        showLegendTooltips: true,
        tooltipOptions: {
            iconSize: new L.Point(60, 50),
            iconAnchor: new L.Point(-5, 50),
            mouseOverExaggeration: 2
        },
        setHighlight: function(layerStyle) {
            layerStyle.weight = layerStyle.weight || 1;
            layerStyle.fillOpacity = layerStyle.fillOpacity || .5;
            layerStyle.weight *= 2;
            layerStyle.fillOpacity /= 1.5;
            return layerStyle;
        },
        unsetHighlight: function(layerStyle) {
            layerStyle.weight = layerStyle.weight || 1;
            layerStyle.fillOpacity = layerStyle.fillOpacity || .25;
            layerStyle.weight /= 2;
            layerStyle.fillOpacity *= 1.5;
            return layerStyle;
        }
    },
    initialize: function(data, options) {
        L.Util.setOptions(this, options);
        L.LayerGroup.prototype.initialize.call(this, options);
        data = data || {};
        this._includeFunction = this.options.filter || this.options.includeLayer;
        this._markerFunction = this.options.getMarker || this._getMarker;
        this._addChildLayers();
        this.addData(data);
    },
    _addChildLayers: function() {
        this._boundaryLayer = new L.LayerGroup();
        this.addLayer(this._boundaryLayer);
        this._trackLayer = new L.LayerGroup();
        this.addLayer(this._trackLayer);
    },
    _zoomFunction: function(e) {
        var map = this._map;
        var self = this;
        var zoom = map.getZoom();
        if (this.options.maxZoom && zoom > this.options.maxZoom) {
            this.hiddenLayers = [];
            this.eachLayer(function(layer) {
                self.hiddenLayers.push(layer);
                map.removeLayer(layer);
            });
        } else if (this.hiddenLayers) {
            while (this.hiddenLayers.length > 0) {
                var layer = this.hiddenLayers.pop();
                map.addLayer(layer);
                if (this.options.backgroundLayer && layer.bringToBack) {
                    layer.bringToBack();
                }
            }
            this.hiddenLayers = null;
        }
    },
    onAdd: function(map) {
        L.LayerGroup.prototype.onAdd.call(this, map);
        map.on("zoomend", this._zoomFunction, this);
    },
    onRemove: function(map) {
        L.LayerGroup.prototype.onRemove.call(this, map);
        map.off("zoomend", this._zoomFunction, this);
    },
    bringToBack: function() {
        this.invoke("bringToBack");
        if (this._trackLayer) {
            this._trackLayer.invoke("bringToBack");
        }
        if (this._boundaryLayer) {
            this._boundaryLayer.invoke("bringToBack");
        }
    },
    bringToFront: function() {
        if (this._boundaryLayer) {
            this._boundaryLayer.invoke("bringToFront");
        }
        if (this._trackLayer) {
            this._trackLayer.invoke("bringToFront");
        }
        this.invoke("bringToFront");
    },
    getBounds: function() {
        var bounds;
        this.eachLayer(function(layer) {
            if (layer.getBounds) {
                if (!bounds) {
                    bounds = layer.getBounds();
                } else {
                    bounds.extend(layer.getBounds());
                }
            }
        });
        return bounds;
    },
    _getLocation: function(record, index) {
        return this.options.locationMode.call(this, record, index);
    },
    _processLocation: function(location) {
        var processedLocation = location.center;
        return processedLocation;
    },
    _styleBoundary: function(layer, options, record) {
        if (layer.setStyle) {
            var style;
            if (this.options.boundaryStyle instanceof Function) {
                style = this.options.boundaryStyle.call(this, record, layer);
            }
            style = style || this.options.boundaryStyle || L.extend({}, options, {
                fillOpacity: .2,
                clickable: false
            });
            layer.setStyle(style);
        }
        return layer;
    },
    _addBoundary: function(location, options, record) {
        var layer = location.location;
        var boundaryLayer;
        if (this.options.includeBoundary) {
            if (layer instanceof L.LatLngBounds) {
                layer = new L.Rectangle(layer);
            }
            layer = this._styleBoundary(layer, options, record);
            this._boundaryLayer.addLayer(layer);
            boundaryLayer = layer;
        }
        return boundaryLayer;
    },
    _getLayer: function(location, options, record) {
        var boundaryLayer = this._addBoundary(location, options, record);
        location = this._processLocation(location);
        var markerLayer;
        if (location) {
            markerLayer = this._markerFunction.call(this, location, options, record);
            markerLayer.boundaryLayer = boundaryLayer;
        }
        return markerLayer;
    },
    _getMarker: function(location, options, record) {
        var marker;
        if (location) {
            if (options.numberOfSides >= 30 && !(options.innerRadius || options.innerRadiusX && options.innerRadiusY)) {
                marker = new L.CircleMarker(location, options);
            } else {
                marker = new L.RegularPolygonMarker(location, options);
            }
        }
        return marker;
    },
    _preProcessRecords: function(records) {
        return records;
    },
    _shouldLoadRecord: function(record) {
        return this._includeFunction ? this._includeFunction.call(this, record) : true;
    },
    _loadRecords: function(records) {
        var location;
        records = this._preProcessRecords(records);
        for (var recordIndex in records) {
            if (records.hasOwnProperty(recordIndex)) {
                var record = records[recordIndex];
                record = this.options.deriveProperties ? this.options.deriveProperties(record) : record;
                var includeLayer = this._shouldLoadRecord(record);
                if (includeLayer) {
                    location = this._getLocation(record, recordIndex);
                    this.locationToLayer(location, record);
                }
            }
        }
    },
    _preloadLocations: function(records) {
        var locationField = this.options.codeField;
        var locationValues = [];
        var indexedRecords = {};
        for (var recordIndex in records) {
            if (records.hasOwnProperty(recordIndex)) {
                var record = records[recordIndex];
                var fieldValue = L.Util.getFieldValue(record, locationField);
                indexedRecords[fieldValue] = record;
                locationValues.push(fieldValue);
            }
        }
        if (this.options.getLocation) {
            var self = this;
            var callback = function(key, location) {
                self.locationToLayer(location, indexedRecords[key]);
            };
            this.options.getLocation(indexedRecords, locationField, locationValues, callback);
        }
    },
    setDisplayOptions: function(displayOptions) {
        this.options.displayOptions = displayOptions;
        this.reloadData();
        return this;
    },
    setDisplayOption: function(key, options) {
        this.options.displayOptions = this.options.displayOptions || {};
        if (key in this.options.displayOptions) {
            var existingOption = this.options.displayOptions[key];
            this.options.displayOptions[key] = L.extend({}, existingOption, options);
        } else {
            this.options.displayOptions[key] = options;
        }
        this.reloadData();
        return this;
    },
    setFilter: function(filterFunction) {
        this.options.filter = filterFunction;
        this.reloadData();
        return this;
    },
    setData: function(data) {
        this._data = data;
        this.reloadData();
    },
    reloadData: function() {
        if (!this._layerIndex) {
            this.clearLayers();
            this._addChildLayers();
        }
        if (this._data) {
            this.addData(this._data);
        }
        this.fire("legendChanged", this);
        return this;
    },
    addData: function(data) {
        var records = this.options.recordsField !== null && this.options.recordsField.length > 0 ? L.Util.getFieldValue(data, this.options.recordsField) : data;
        if (this.options.getIndexKey && !this._layerIndex) {
            this._layerIndex = {};
            this._boundaryIndex = {};
        }
        if (this.options.locationMode === L.LocationModes.CUSTOM && this.options.preload) {
            this._preloadLocations(records);
        } else {
            this._loadRecords(records);
        }
        this._data = data;
    },
    locationToLayer: function(location, record) {
        var layer;
        layer = this.recordToLayer(location, record);
        if (layer) {
            this.addLayer(layer);
        }
    },
    _bindMouseEvents: function(layer, layerOptions, legendDetails) {
        var self = this;
        var options = this.options;
        var setHighlight = options.setHighlight;
        var unsetHighlight = options.unsetHighlight;
        var tooltipOptions = options.tooltipOptions;
        var highlight = function(e) {
            var target = e.target;
            var layerOptions = this.options || target.options;
            var icon = new L.LegendIcon(legendDetails, layerOptions, {
                className: tooltipOptions.className || "leaflet-div-icon",
                iconSize: tooltipOptions.iconSize,
                iconAnchor: tooltipOptions.iconAnchor
            });
            var latlng = e.latlng || e.target._latlng;
            var tooltip = new L.Marker(latlng, {
                icon: icon
            });
            self.addLayer(tooltip);
            if (self.tooltip) {
                self.removeLayer(self.tooltip);
                self.tooltip = null;
            }
            self.tooltip = tooltip;
            if (setHighlight) {
                layerOptions = setHighlight(layerOptions);
            }
            if (target.setStyle) {
                target.setStyle(layerOptions);
            }
            target.isHighlighted = true;
        };
        var move = function(e) {
            if (self.tooltip) {
                self.tooltip.setLatLng(e.latlng);
            }
        };
        var unhighlight = function(e) {
            if (!e.target.isHighlighted) {
                return;
            }
            e.target.isHighlighted = false;
            if (self.tooltip) {
                self.removeLayer(self.tooltip);
                self.tooltip = null;
            }
            var target = e.target;
            var layerOptions = this.options || target.options;
            if (unsetHighlight) {
                layerOptions = unsetHighlight(layerOptions);
            }
            if (target.setStyle) {
                target.setStyle(layerOptions);
            }
        };
        var bindLayerEvents = function(layer) {
            layer.off("mouseover");
            layer.off("mouseout");
            layer.off("mousemove");
            layer.on({
                mouseover: highlight,
                mouseout: unhighlight,
                mousemove: move
            });
        };
        var bindEvents = function(layer) {
            if (layer.eachLayer) {
                layer.eachLayer(function(subLayer) {
                    bindEvents(subLayer);
                });
            } else {
                bindLayerEvents(layer);
            }
        };
        bindEvents(layer);
    },
    _getDynamicOptions: function(record) {
        var layerOptions = L.Util.extend({}, this.options.layerOptions);
        var displayOptions = this.options.displayOptions;
        var legendDetails = {};
        if (displayOptions) {
            for (var property in displayOptions) {
                var propertyOptions = displayOptions[property];
                var fieldValue = L.Util.getFieldValue(record, property);
                var valueFunction;
                var displayText = propertyOptions.displayText ? propertyOptions.displayText(fieldValue) : fieldValue;
                legendDetails[property] = {
                    name: propertyOptions.displayName,
                    value: displayText
                };
                if (propertyOptions.styles) {
                    layerOptions = L.Util.extend(layerOptions, propertyOptions.styles[fieldValue]);
                    propertyOptions.styles[fieldValue] = layerOptions;
                } else {
                    for (var layerProperty in propertyOptions) {
                        valueFunction = propertyOptions[layerProperty];
                        layerOptions[layerProperty] = valueFunction.evaluate ? valueFunction.evaluate(fieldValue) : valueFunction.call ? valueFunction.call(this, fieldValue) : valueFunction;
                    }
                }
            }
        }
        return {
            layerOptions: layerOptions,
            legendDetails: legendDetails
        };
    },
    _getIndexedLayer: function(index, location, layerOptions, record) {
        if (this.options.getIndexKey) {
            var indexKey = this.options.getIndexKey.call(this, location, record);
            if (indexKey in index) {
                layer = index[indexKey];
                var updateFunction = function(layer) {
                    if (layerOptions.radius && layer instanceof L.CircleMarker) {
                        layer.setRadius(layerOptions.radius);
                    }
                    layer.setStyle(layerOptions);
                    if (layer.setLatLng && layer.getLatLng() !== location.center) {
                        layer.setLatLng(location.center);
                    } else {
                        layer.redraw();
                    }
                };
                L.Util.updateLayer(layer, updateFunction);
                if (layer.boundaryLayer) {
                    layer.boundaryLayer = this._styleBoundary(layer.boundaryLayer, layerOptions, record);
                }
            } else {
                layer = this._getLayer(location, layerOptions, record);
                index[indexKey] = layer;
            }
            if (this.options.getTrack) {
                var shouldAdd = !layer.trackLayer;
                layer.trackLayer = this.options.getTrack.call(this, layer, location, layer.trackLayer);
                if (shouldAdd) {
                    this._trackLayer.addLayer(layer.trackLayer);
                }
            }
        } else {
            layer = this._getLayer(location, layerOptions, record);
        }
        return layer;
    },
    recordToLayer: function(location, record) {
        var layerOptions = L.Util.extend({}, this.options.layerOptions);
        var layer;
        var legendDetails = {};
        var includeLayer = true;
        var me = this;
        if (this._includeFunction) {
            includeLayer = this._includeFunction.call(this, record);
        }
        if (includeLayer) {
            var dynamicOptions = this._getDynamicOptions(record);
            layerOptions = dynamicOptions.layerOptions;
            legendDetails = dynamicOptions.legendDetails;
            if (location && layerOptions) {
                layerOptions.title = location.text;
                layer = this._getIndexedLayer(this._layerIndex, location, layerOptions, record);
                if (layer) {
                    if (this.options.showLegendTooltips) {
                        this._bindMouseEvents(layer, layerOptions, legendDetails);
                    }
                    if (this.options.onEachRecord) {
                        this.options.onEachRecord.call(this, layer, record, location, this);
                    }
                }
            }
        }
        return layer;
    },
    getLegend: function(legendOptions) {
        return this.options.getLegend ? this.options.getLegend.call(this, legendOptions) : this._getLegend(legendOptions);
    },
    _getLegendElement: function(params) {
        var displayMin;
        var displayMax;
        var i = document.createElement("i");
        var displayProperties = params.displayProperties;
        var layerOptions = params.layerOptions;
        var ignoreProperties = params.ignoreProperties;
        var displayTextFunction = params.displayTextFunction;
        var index = params.index;
        var numSegments = params.numSegments;
        var segmentWidth = params.segmentWidth;
        var minValue = params.minValue;
        var maxValue = params.maxValue;
        L.StyleConverter.applySVGStyle(i, layerOptions);
        for (var property in displayProperties) {
            if (ignoreProperties.indexOf(property) === -1) {
                valueFunction = displayProperties[property];
                if (valueFunction && (valueFunction.getBounds || displayProperties.minValue && displayProperties.maxValue)) {
                    var bounds = valueFunction.getBounds ? valueFunction.getBounds() : null;
                    var minX = bounds ? bounds[0].x : displayProperties.minValue;
                    var maxX = bounds ? bounds[1].x : displayProperties.maxValue;
                    var binFunction = new L.LinearFunction(new L.Point(0, minX), new L.Point(numSegments, maxX));
                    displayMin = minX;
                    displayMax = maxX;
                    if (displayTextFunction) {
                        displayMin = displayTextFunction(minX);
                        displayMax = displayTextFunction(maxX);
                    }
                    if (index === 0) {
                        minValue.innerHTML = displayMin;
                        maxValue.innerHTML = displayMax;
                    }
                    var segmentSize = (maxX - minX) / numSegments;
                    var x = binFunction.evaluate(index);
                    var nextX = binFunction.evaluate(index + 1);
                    var value = valueFunction.evaluate ? valueFunction.evaluate(x) : valueFunction(x);
                    var nextValue = valueFunction.evaluate ? valueFunction.evaluate(nextX) : valueFunction(nextX);
                    L.StyleConverter.setCSSProperty(i, property, value);
                    if (property === "fillColor") {
                        if (params.gradient) {
                            i.style.cssText += "background-image:linear-gradient(left , " + value + " 0%, " + nextValue + " 100%);" + "background-image:-ms-linear-gradient(left , " + value + " 0%, " + nextValue + " 100%);" + "background-image:-moz-linear-gradient(left , " + value + " 0%, " + nextValue + " 100%);" + "background-image:-webkit-linear-gradient(left , " + value + " 0%, " + nextValue + " 100%);";
                        } else {
                            i.style.cssText += "background-color:" + nextValue + ";";
                        }
                    }
                    if (property === "color") {
                        i.style.cssText += "border-top-color:" + value + ";" + "border-bottom-color:" + nextValue + ";" + "border-left-color:" + value + ";" + "border-right-color:" + nextValue + ";";
                    }
                    if (property === "weight") {
                        i.style.cssText += "border-top-width:" + value + ";" + "border-bottom-width:" + nextValue + ";" + "border-left-width:" + value + ";" + "border-right-width:" + nextValue + ";";
                    }
                    var min = segmentSize * index + minX;
                    var max = min + segmentSize;
                    if (displayTextFunction && valueFunction) {
                        min = displayTextFunction(min);
                        max = displayTextFunction(max);
                    }
                    i.setAttribute("title", min + " - " + max);
                }
            }
        }
        i.style.width = segmentWidth + "px";
        return i;
    },
    _getLegend: function(legendOptions) {
        legendOptions = legendOptions || this.options.legendOptions || {};
        var className = legendOptions.className;
        var container = document.createElement("div");
        var legendElement = L.DomUtil.create("div", "legend", container);
        var numSegments = legendOptions.numSegments || 10;
        var legendWidth = legendOptions.width || 100;
        var layerOptions = this.options.layerOptions || {};
        var weight = layerOptions.weight || 0;
        var segmentWidth = legendWidth / numSegments - 2 * weight;
        var displayText;
        var displayOptions = this.options.displayOptions || {};
        if (className) {
            L.DomUtil.addClass(legendElement, className);
        }
        if (legendOptions.title) {
            L.DomUtil.create("legend", "", legendElement).innerHTML = legendOptions.title;
        }
        var defaultFunction = function(value) {
            return value;
        };
        for (var field in displayOptions) {
            var displayProperties = displayOptions[field];
            if (!displayProperties.excludeFromLegend) {
                var displayName = displayProperties.displayName || field;
                displayText = displayProperties.displayText;
                var displayTextFunction = displayText ? displayText : defaultFunction;
                var styles = displayProperties.styles;
                L.DomUtil.create("div", "legend-title", legendElement).innerHTML = displayName;
                if (styles) {
                    legendElement.innerHTML += new L.CategoryLegend(styles).generate();
                } else {
                    var legendItems = L.DomUtil.create("div", "data-layer-legend");
                    var minValue = L.DomUtil.create("div", "min-value", legendItems);
                    var scaleBars = L.DomUtil.create("div", "scale-bars", legendItems);
                    var maxValue = L.DomUtil.create("div", "max-value", legendItems);
                    var ignoreProperties = [ "displayName", "displayText", "minValue", "maxValue" ];
                    for (var index = 0; index < numSegments; ++index) {
                        var legendParams = {
                            displayProperties: displayProperties,
                            layerOptions: layerOptions,
                            ignoreProperties: ignoreProperties,
                            displayTextFunction: displayTextFunction,
                            index: index,
                            numSegments: numSegments,
                            segmentWidth: segmentWidth,
                            minValue: minValue,
                            maxValue: maxValue,
                            gradient: legendOptions.gradient
                        };
                        var element = this._getLegendElement(legendParams);
                        scaleBars.appendChild(element);
                    }
                    legendElement.appendChild(legendItems);
                }
            }
        }
        return container.innerHTML;
    }
});

L.dataLayer = function(data, options) {
    return new L.DataLayer(data, options);
};

L.MapMarkerDataLayer = L.DataLayer.extend({
    _getMarker: function(latLng, layerOptions, record) {
        return new L.MapMarker(latLng, layerOptions);
    }
});

L.mapMarkerDataLayer = function(data, options) {
    return new L.MapMarkerDataLayer(data, options);
};

L.MarkerDataLayer = L.DataLayer.extend({
    initialize: function(data, options) {
        this._markerMap = {};
        L.DataLayer.prototype.initialize.call(this, data, options);
    },
    options: {
        recordsField: "features",
        locationMode: L.LocationModes.LATLNG,
        latitudeField: "latitude",
        longitudeField: "longitude",
        layerOptions: {
            icon: null
        },
        showLegendTooltips: false
    },
    _getMarker: function(latLng, layerOptions, record) {
        if (this.options.setIcon) {
            layerOptions.icon = this.options.setIcon.call(this, record, layerOptions);
        }
        return new L.Marker(latLng, layerOptions);
    },
    _getLegendElement: function(params) {},
    _getLegend: function(options) {
        return "<span>No legend available</span>";
    }
});

L.markerDataLayer = function(data, options) {
    return new L.MarkerDataLayer(data, options);
};

L.PanoramioLayer = L.MarkerDataLayer.extend({
    statics: {
        UPLOAD_DATE_FORMAT: "DD MMM YYYY",
        SIZE_BY_DATE: "date",
        SIZE_BY_POPULARITY: "popularity",
        SIZE_BY_NONE: "none",
        SIZES: {
            square: [ 60, 60 ],
            mini_square: [ 32, 32 ]
        },
        NUM_PHOTOS: 50
    }
});

L.PanoramioLayer = L.PanoramioLayer.extend({
    initialize: function(options) {
        L.MarkerDataLayer.prototype.initialize.call(this, {}, options);
        this._from = 0;
        this._to = L.PanoramioLayer.NUM_PHOTOS;
        this._calls = [];
    },
    options: {
        recordsField: "photos",
        latitudeField: "latitude",
        longitudeField: "longitude",
        locationMode: L.LocationModes.LATLNG,
        showLegendTooltips: false,
        sizeBy: L.PanoramioLayer.SIZE_BY_DATE,
        layerOptions: {
            opacity: 1
        },
        onEachRecord: function(layer, record) {
            var photoUrl = record["photo_file_url"];
            var title = record["photo_title"];
            var me = this;
            var width = record["width"];
            var height = record["height"];
            var offset = 2e4;
            layer.on("click", function(e) {
                var container = document.createElement("div");
                var content = L.DomUtil.create("div", "", container);
                var photo = L.DomUtil.create("img", "photo", content);
                photo.setAttribute("onload", "this.style.opacity=1;");
                photo.setAttribute("src", photoUrl);
                photo.style.width = width + "px";
                var photoInfo = L.DomUtil.create("div", "photo-info", content);
                photoInfo.style.width = width - 20 + "px";
                photoInfo.innerHTML = "<span>" + title + "</span>" + '<a class="photo-link" target="_blank" href="' + record["photo_url"] + '">' + '<img src="http://www.panoramio.com/img/glass/components/logo_bar/panoramio.png" style="height: 14px;"/>' + "</a>";
                var authorLink = L.DomUtil.create("a", "author-link", content);
                authorLink.setAttribute("target", "_blank");
                authorLink.setAttribute("href", record["owner_url"]);
                authorLink.innerHTML = "by " + record["owner_name"];
                var icon = new L.DivIcon({
                    className: "photo-details",
                    html: container.innerHTML,
                    iconAnchor: [ width / 2, height / 2 ]
                });
                var marker = new L.Marker(e.target._latlng, {
                    icon: icon,
                    zIndexOffset: offset
                });
                marker.on("click", function(e) {
                    me.removeLayer(e.target);
                });
                layer.viewedImage = marker;
                me.viewedImage = marker;
                me.addLayer(marker);
            });
            if (this.options.onEachPhoto) {
                this.options.onEachPhoto.call(this, layer, record);
            }
        },
        setIcon: function(record, options) {
            var title = L.Util.getFieldValue(record, "photo_title");
            var size = null;
            if (this._sizeFunction) {
                size = this._sizeFunction.evaluate(record.index);
            }
            var iconSize = size ? new L.Point(size, size) : L.PanoramioLayer.SIZES[this.options.size];
            var url = record["photo_file_url"].replace("/medium/", "/" + this.options.size + "/");
            var icon = new L.DivIcon({
                iconSize: iconSize,
                className: "",
                html: '<img class="photo" onload="this.style.opacity=1" title="' + title + '" src="' + url + '"/>'
            });
            return icon;
        },
        updateInterval: 3e5,
        size: "square",
        attributionText: 'Photos provided by <a href="http://www.panoramio.com"><img src="http://www.panoramio.com/img/glass/components/logo_bar/panoramio.png" style="height: 10px;"/></a>.  Photos provided by <a href="http://www.panoramio.com"><img src="http://www.panoramio.com/img/glass/components/logo_bar/panoramio.png" style="height: 10px;"/></a> are under the copyright of their owners',
        refreshEvents: "moveend",
        photoSet: "public"
    },
    includes: L.Mixin.Events,
    onAdd: function(map) {
        L.DataLayer.prototype.onAdd.call(this, map);
        if (map.attributionControl) {
            map.attributionControl.addAttribution(this.options.attributionText);
        }
        var me = this;
        var resetFunction = function(e) {
            me._from = 0;
            me._to = L.PanoramioLayer.NUM_PHOTOS;
            me.fire("requestingPhotos");
            if (me._call) {
                clearTimeout(me._call);
            }
            var request = function() {
                me.requestPhotos();
            };
            me._call = setTimeout(request, 1e3);
        };
        this.requestPhotos();
        this._interval = setInterval(resetFunction, this.options.updateInterval);
        this._resetFunction = resetFunction;
        map.on(this.options.refreshEvents, resetFunction);
    },
    onRemove: function(map) {
        L.DataLayer.prototype.onRemove.call(this, map);
        if (map.attributionControl) {
            map.attributionControl.removeAttribution(this.options.attributionText);
        }
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
        map.off(this.options.refreshEvents, this._resetFunction);
    },
    calculateSizeByDate: function(data) {
        var photos = data.photos;
        var timestamps = [];
        for (var i = 0; i < photos.length; ++i) {
            var photo = photos[i];
            var timestamp = moment(photo["upload_date"], L.PanoramioLayer.UPLOAD_DATE_FORMAT);
            timestamps.push(timestamp);
            photos[i].index = timestamp;
        }
        timestamps.sort(function(t1, t2) {
            return t1 - t2;
        });
        var size = L.PanoramioLayer.SIZES[this.options.size][0];
        this._sizeFunction = new L.LinearFunction([ timestamps[0], size / 2 ], [ timestamps[timestamps.length - 1], size ]);
        return data;
    },
    calculateSizeByPopularity: function(data) {
        var photos = data.photos;
        for (var i = 0; i < photos.length; ++i) {
            photos[i].index = i;
        }
        var size = L.PanoramioLayer.SIZES[this.options.size][0];
        this._sizeFunction = new L.LinearFunction([ 0, size / 2 ], [ photos.length, size ]);
        return data;
    },
    next: function() {
        this._from = this._to;
        this._to = this._from + L.PanoramioLayer.NUM_PHOTOS;
        this.requestPhotos();
    },
    previous: function() {
        this._to = this._from;
        this._from = this._from - L.PanoramioLayer.NUM_PHOTOS;
        this.requestPhotos();
    },
    requestJsonp: function(url, data, callback) {
        var self = this, key = "function" + new Date().getTime(), params = [];
        data.callback = "window.LeafletDvfJsonpCallbacks." + key;
        for (property in data) {
            if (data.hasOwnProperty(property)) {
                params.push(property + "=" + encodeURIComponent(data[property]));
            }
        }
        url += (url.indexOf("?") > 0 ? "&" : "?") + params.join("&");
        if (typeof window.LeafletDvfJsonpCallbacks === "undefined") {
            window.LeafletDvfJsonpCallbacks = {};
        }
        window.LeafletDvfJsonpCallbacks[key] = function(data) {
            callback.call(self, data);
            delete window.LeafletDvfJsonpCallbacks[key];
        };
        if (this.jsonpScript) {
            document.head.removeChild(this.jsonpScript);
            this.jsonpScript = null;
        }
        this.jsonpScript = document.createElement("script");
        this.jsonpScript.setAttribute("type", "text/javascript");
        this.jsonpScript.setAttribute("async", "true");
        this.jsonpScript.setAttribute("src", url);
        document.head.appendChild(this.jsonpScript);
        return {
            abort: function() {
                if (key in window.LeafletDvfJsonpCallbacks) {
                    window.LeafletDvfJsonpCallbacks[key] = function() {
                        delete window.LeafletDvfJsonpCallbacks[key];
                    };
                }
            }
        };
    },
    requestPhotos: function() {
        var me = this;
        var bounds = this._map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        while (me._calls.length > 0) {
            me._calls.pop().abort();
        }
        var request = this.requestJsonp("http://www.panoramio.com/map/get_panoramas.php", {
            set: this.options.photoSet,
            from: me._from,
            to: me._to,
            minx: southWest.lng,
            miny: southWest.lat,
            maxx: northEast.lng,
            maxy: northEast.lat,
            size: "medium",
            mapfilter: "true"
        }, function(data) {
            me._count = data.count;
            if (moment && me.options.sizeBy === L.PanoramioLayer.SIZE_BY_DATE) {
                data = me.calculateSizeByDate(data);
            } else if (me.options.sizeBy === L.PanoramioLayer.SIZE_BY_POPULARITY) {
                data = me.calculateSizeByPopularity(data);
            }
            me.fire("photosAvailable", data);
            me.clearLayers();
            me.addData(data);
        });
        me._calls.push(request);
    }
});

L.panoramioLayer = function(options) {
    return new L.PanoramioLayer(options);
};

L.GeohashDataLayer = L.DataLayer.extend({
    initialize: function(data, options) {
        L.DataLayer.prototype.initialize.call(this, data, options);
    },
    options: {
        recordsField: "features",
        locationMode: L.LocationModes.GEOHASH,
        geohashField: "geohash",
        displayField: null,
        displayOptions: null,
        layerOptions: {
            weight: 1,
            color: "#000"
        },
        getIndexKey: function(location, record) {
            return location.text;
        }
    },
    _getLayer: function(geohash, layerOptions, record) {
        return new L.Rectangle(geohash.location, layerOptions);
    }
});

L.geohashDataLayer = function(data, options) {
    return new L.GeohashDataLayer(data, options);
};

L.ChoroplethDataLayer = L.DataLayer.extend({
    initialize: function(data, options) {
        L.DataLayer.prototype.initialize.call(this, data, options);
    },
    options: {
        recordsField: "features",
        locationMode: L.LocationModes.COUNTRY,
        codeField: "ISO",
        displayField: null,
        displayOptions: null,
        layerOptions: {
            weight: 1,
            color: "#000"
        },
        maxZoom: 16,
        backgroundLayer: true
    },
    _getLayer: function(location, layerOptions, record) {
        if (location.location instanceof L.LatLng) {
            location.location = this._markerFunction.call(this, location.location, layerOptions, record);
        }
        if (location.location.setStyle) {
            layerOptions.gradient = location.location instanceof L.Polyline ? false : layerOptions.gradient;
            location.location.setStyle(layerOptions);
        }
        return location.location;
    }
});

L.choroplethDataLayer = function(data, options) {
    return new L.ChoroplethDataLayer(data, options);
};

L.ChartDataLayer = L.DataLayer.extend({
    options: {
        showLegendTooltips: false
    },
    initialize: function(data, options) {
        L.DataLayer.prototype.initialize.call(this, data, options);
    },
    _getLayer: function(latLng, layerOptions, record) {
        var boundaryLayer = this._addBoundary(latLng, layerOptions, record);
        latLng = this._processLocation(latLng);
        var chartOptions = this.options.chartOptions;
        var tooltipOptions = this.options.tooltipOptions;
        var options = {};
        options = layerOptions;
        options.data = {};
        options.chartOptions = chartOptions;
        for (var key in this.options.chartOptions) {
            options.data[key] = this.options.getFieldValue ? this.options.getFieldValue.call(this, record, key) : L.Util.getFieldValue(record, key);
        }
        for (var key in tooltipOptions) {
            options[key] = tooltipOptions[key];
        }
        var marker;
        if (latLng) {
            marker = this._getMarker(latLng, options);
            marker.boundaryLayer = boundaryLayer;
        }
        return marker;
    },
    _getMarker: function(latLng, options) {},
    _getLegend: function(legendOptions) {
        var dataLayerLegend = L.DataLayer.prototype._getLegend.call(this, legendOptions);
        var legend = new L.CategoryLegend(this.options.chartOptions);
        legendOptions = legendOptions || this.options.legendOptions;
        return legend.generate(legendOptions);
    }
});

L.BarChartDataLayer = L.ChartDataLayer.extend({
    initialize: function(data, options) {
        L.ChartDataLayer.prototype.initialize.call(this, data, options);
    },
    _getMarker: function(latLng, options) {
        return new L.BarChartMarker(latLng, options);
    }
});

L.barChartDataLayer = function(data, options) {
    return new L.BarChartDataLayer(data, options);
};

L.RadialBarChartDataLayer = L.ChartDataLayer.extend({
    initialize: function(data, options) {
        L.ChartDataLayer.prototype.initialize.call(this, data, options);
    },
    _getMarker: function(latLng, options) {
        return new L.RadialBarChartMarker(latLng, options);
    }
});

L.radialBarChartDataLayer = function(data, options) {
    return new L.RadialBarChartDataLayer(data, options);
};

L.PieChartDataLayer = L.ChartDataLayer.extend({
    initialize: function(data, options) {
        L.ChartDataLayer.prototype.initialize.call(this, data, options);
    },
    _getMarker: function(latLng, options) {
        return new L.PieChartMarker(latLng, options);
    }
});

L.pieChartDataLayer = function(data, options) {
    return new L.PieChartDataLayer(data, options);
};

L.CoxcombChartDataLayer = L.ChartDataLayer.extend({
    initialize: function(data, options) {
        L.ChartDataLayer.prototype.initialize.call(this, data, options);
    },
    _getMarker: function(latLng, options) {
        return new L.CoxcombChartMarker(latLng, options);
    }
});

L.coxcombChartDataLayer = function(data, options) {
    return new L.CoxcombChartDataLayer(data, options);
};

L.StackedRegularPolygonDataLayer = L.ChartDataLayer.extend({
    initialize: function(data, options) {
        L.ChartDataLayer.prototype.initialize.call(this, data, options);
    },
    _getMarker: function(latLng, options) {
        return new L.StackedRegularPolygonMarker(latLng, options);
    }
});

L.stackedRegularPolygonDataLayer = function(data, options) {
    return new L.StackedRegularPolygonDataLayer(data, options);
};

L.StackedPieChartDataLayer = L.ChartDataLayer.extend({
    initialize: function(data, options) {
        L.ChartDataLayer.prototype.initialize.call(this, data, options);
    },
    _getMarker: function(latLng, options) {
        return new L.StackedPieChartMarker(latLng, options);
    }
});

L.stackedPieChartDataLayer = function(data, options) {
    return new L.StackedPieChartDataLayer(data, options);
};

L.RadialMeterMarkerDataLayer = L.DataLayer.extend({
    options: {
        showLegendTooltips: false
    },
    initialize: function(data, options) {
        L.DataLayer.prototype.initialize.call(this, data, options);
    },
    _getLayer: function(latLng, layerOptions, record) {
        this._addBoundary(latLng, layerOptions);
        latLng = this._processLocation(latLng);
        var chartOptions = this.options.chartOptions;
        var tooltipOptions = this.options.tooltipOptions;
        var displayOptions = this.options.displayOptions;
        var options = {};
        options = layerOptions;
        options.data = {};
        options.chartOptions = chartOptions;
        options.displayOptions = displayOptions;
        for (var key in this.options.chartOptions) {
            options.data[key] = L.Util.getFieldValue(record, key);
        }
        for (var key in tooltipOptions) {
            options[key] = tooltipOptions[key];
        }
        var marker;
        if (latLng) {
            marker = this._getMarker(latLng, options);
        }
        return marker;
    },
    _getMarker: function(latLng, options) {
        return new L.RadialMeterMarker(latLng, options);
    }
});

L.radialMeterMarkerDataLayer = function(data, options) {
    return new L.RadialMeterMarkerDataLayer(data, options);
};

L.CalloutLine = L.Path.extend({
    statics: {
        LINESTYLE: {
            ARC: "arc",
            ANGLE: "angle",
            STRAIGHT: "straight"
        },
        DIRECTION: {
            NE: "ne",
            NW: "nw",
            SE: "se",
            SW: "sw"
        }
    }
});

L.CalloutLine = L.CalloutLine.extend({
    initialize: function(latlng, options) {
        L.Util.setOptions(this, options);
        L.Path.prototype.initialize.call(this, options);
        this._latlng = latlng;
    },
    options: {
        size: new L.Point(60, 30),
        position: new L.Point(0, 0),
        color: "#FFFFFF",
        opacity: 1,
        weight: 2,
        fillColor: "#000000",
        fill: false,
        gradient: false,
        dropShadow: false,
        direction: L.CalloutLine.DIRECTION.NE,
        lineStyle: L.CalloutLine.LINESTYLE.ANGLE,
        lineCap: "butt",
        lineJoin: "miter",
        arrow: false
    },
    projectLatlngs: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._points = this._getPoints();
    },
    getEndPoint: function() {
        this.projectLatlngs();
        return this._points[this._points.length - 1];
    },
    _getPathAngle: function() {
        return new L.SVGPathBuilder(this._points, [], {
            closePath: false
        }).build(6);
    },
    _getPathArc: function() {
        var direction = (this.options.direction || L.CalloutLine.DIRECTION.NE).toLowerCase();
        var yDirection = direction[0];
        var yMultiplier = yDirection === "n" ? -1 : 1;
        var point1 = this._points[0];
        var point2 = this._points[this._points.length - 1];
        var parts = [ "M", point1.x, ",", point1.y, " Q", point1.x, ",", point1.y + yMultiplier * this.options.size.y, " ", point2.x, ",", point2.y ];
        return parts.join(" ");
    },
    _getPoints: function() {
        var x = this._point.x + this.options.position.x;
        var y = this._point.y + this.options.position.y;
        var width = this.options.size.x;
        var height = this.options.size.y;
        var direction = (this.options.direction || L.CalloutLine.DIRECTION.NE).toLowerCase();
        var points = [];
        var xDirection = direction[1];
        var yDirection = direction[0];
        var xMultiplier = xDirection === "w" ? -1 : 1;
        var yMultiplier = yDirection === "n" ? -1 : 1;
        points.push(new L.Point(x, y));
        var yEnd = y + yMultiplier * height;
        var halfWidth = width / 2;
        var angle = Math.atan(height / halfWidth);
        if (this.options.lineStyle === L.CalloutLine.LINESTYLE.ARC) {
            angle = Math.atan(Math.pow(height, 2) / halfWidth);
        } else if (this.options.lineStyle === L.CalloutLine.LINESTYLE.STRAIGHT) {
            angle = Math.atan(height / width);
        }
        this._angle = angle;
        if (this.options.lineStyle !== L.CalloutLine.LINESTYLE.STRAIGHT) {
            var elbowPoint = new L.Point(x + xMultiplier * halfWidth, yEnd);
            points.push(elbowPoint);
        }
        var endPoint = new L.Point(x + xMultiplier * width, yEnd);
        points.push(endPoint);
        return points;
    },
    getBounds: function() {
        var map = this._map, point = map.project(this._latlng), swPoint = new L.Point(point.x + this.options.position.x, point.y + this.options.position.y), nePoint = new L.Point(swPoint.x + this.options.size.x, swPoint.y - this.options.size.y), sw = map.unproject(swPoint), ne = map.unproject(nePoint);
        return new L.LatLngBounds(sw, ne);
    },
    setLatLng: function(latlng) {
        this._latlng = latlng;
        this.redraw();
    },
    getLatLng: function() {
        return this._latlng;
    },
    getPathString: function() {
        this._path.setAttribute("shape-rendering", "geometricPrecision");
        var lineStyle = this.options.lineStyle || L.CalloutLine.LINESTYLE.ANGLE;
        var path = "";
        if (lineStyle === L.CalloutLine.LINESTYLE.ANGLE || lineStyle === L.CalloutLine.LINESTYLE.STRAIGHT) {
            path += this._getPathAngle();
        } else {
            path += this._getPathArc();
        }
        return path;
    }
});

L.calloutLine = function(latlng, options) {
    return new L.CalloutLine(latlng, options);
};

L.Callout = L.LayerGroup.extend({
    options: {
        color: "#FFFFFF",
        fillColor: "#FFFFFF"
    },
    initialize: function(latlng, options) {
        L.Util.setOptions(this, options);
        L.LayerGroup.prototype.initialize.call(this, options);
        this._latlng = latlng;
    },
    onAdd: function(map) {
        L.LayerGroup.prototype.onAdd.call(this, map);
        this.addLayers();
    },
    addArrow: function(angle, direction, position) {
        if (this.options.arrow) {
            var angle = L.LatLng.RAD_TO_DEG * angle;
            var numberOfSides = this.options.numberOfSides || 3;
            var radius = this.options.radius || 6;
            var startRotation = 180 / numberOfSides;
            var offsets = {
                se: startRotation + angle,
                sw: 180 + startRotation - angle,
                nw: 180 + startRotation + angle,
                ne: startRotation - angle
            };
            var rotation = offsets[direction];
            var arrow = new L.RegularPolygonMarker(this._latlng, {
                position: position,
                numberOfSides: numberOfSides,
                rotation: rotation,
                fillColor: this.options.fillColor,
                color: this.options.color,
                gradient: this.options.gradient,
                weight: this.options.weight,
                opacity: this.options.opacity,
                fillOpacity: this.options.fillOpacity,
                radius: radius,
                lineCap: "butt",
                lineJoin: "miter"
            });
            this.addLayer(arrow);
        }
    },
    addLine: function() {
        var lineOptions = {};
        for (var key in this.options) {
            if (key !== "icon") {
                lineOptions[key] = this.options[key];
            }
        }
        var calloutLine = new L.CalloutLine(this._latlng, lineOptions);
        this.addLayer(calloutLine);
        return calloutLine;
    },
    addIcon: function(direction, position) {
        var size = this.options.size;
        var icon = this.options.icon;
        var iconSize = icon.options.iconSize;
        var yDirection = direction[0];
        var xDirection = direction[1];
        var xAnchor = xDirection === "w" ? iconSize.x + size.x - position.x : -1 * (size.x + position.x);
        var yAnchor = yDirection === "n" ? iconSize.y / 2 + size.y - position.y : -1 * (-iconSize.y / 2 + size.y + position.y);
        icon.options.iconAnchor = new L.Point(xAnchor, yAnchor);
        var iconMarker = new L.Marker(this._latlng, {
            icon: icon
        });
        this.addLayer(iconMarker);
    },
    addLayers: function() {
        var direction = (this.options.direction || "ne").toLowerCase();
        var position = this.options.position || new L.Point(0, 0);
        var calloutLine;
        calloutLine = this.addLine();
        this.addIcon(direction, position);
        this.addArrow(calloutLine._angle, direction, position);
    }
});

L.callout = function(latlng, options) {
    return new L.Callout(latlng, options);
};

L.FlowLine = L.DataLayer.extend({
    statics: {
        LINE_FUNCTION: function(latlng1, latlng2, options) {
            return new L.Polyline([ latlng1, latlng2 ], options);
        },
        LINE_FUNCTION_INTERPOLATED: function(latlng1, latlng2, options) {
            var point1 = this._map.latlngToLayerPoint(latlng1);
            var point2 = this._map.latlngToLayerPoint(latlng2);
            var lineFunction = new L.LinearFunction(point1, point2);
            var numPoints = Math.ceil(point1.distanceTo(point2) / options.interpolationOptions.segmentLength);
            var points = lineFunction.samplePoints(numPoints);
        }
    }
});

L.FlowLine = L.FlowLine.extend({
    initialize: function(data, options) {
        L.Util.setOptions(this, options);
        L.DataLayer.prototype.initialize.call(this, data, options);
    },
    options: {
        getLine: L.FlowLine.LINE_FUNCTION
    },
    onEachSegment: function(record1, record2, line) {
        var deltas = {};
        if (this.options.timeField) {
            var timeValue1 = L.Util.getFieldValue(record1, this.options.timeField);
            var timeValue2 = L.Util.getFieldValue(record2, this.options.timeField);
            var format = this.options.timeFormat;
            var moment1 = format ? moment(timeValue1, format) : moment(timeValue1);
            var moment2 = format ? moment(timeValue2, format) : moment(timeValue2);
            var deltaTime = moment2.valueOf() - moment1.valueOf();
            deltas.time = deltaTime;
        }
        for (var key in this.options.displayOptions) {
            var value1 = L.Util.getFieldValue(record1, key);
            var value2 = L.Util.getFieldValue(record2, key);
            var change = value2 - value1;
            var percentChange = change / value1 * 100;
            deltas[key] = {
                from: value1,
                to: value2,
                change: change,
                percentChange: percentChange
            };
            if (deltas.time) {
                deltas[key].changeOverTime = change / deltas.time;
            }
        }
        var latlngs = line.getLatLngs();
        var distance = latlngs[0].distanceTo(latlngs[1]);
        var velocity;
        if (deltas.time) {
            velocity = distance / (deltas.time * 1e3);
        }
        if (this.options.onEachSegment) {
            this.options.onEachSegment.call(this, record1, record2, line, deltas, distance, velocity);
        }
    },
    _loadRecords: function(records) {
        var markers = [];
        for (var recordIndex in records) {
            if (records.hasOwnProperty(recordIndex)) {
                var record = records[recordIndex];
                markers = this._addRecord(record, recordIndex, markers);
            }
        }
        while (markers.length > 0) {
            this.addLayer(markers.pop());
        }
    },
    addRecord: function(record) {
        this._addRecord(record);
        return this;
    },
    _addRecord: function(record, recordIndex, markers) {
        var location = this._getLocation(record, recordIndex);
        var options = this.options.layerOptions;
        if (location) {
            var marker = this._getLayer(location, options, record);
            var line;
            var includeLayer = true;
            if (this.options.includeLayer) {
                includeLayer = this.options.includeLayer(record);
            }
            if (this._lastRecord && includeLayer) {
                var options = this._getDynamicOptions(this._lastRecord);
                line = this.options.getLine.call(this, this._lastMarker.getLatLng(), marker.getLatLng(), options.layerOptions);
                this.addLayer(line);
                this.onEachSegment(this._lastRecord, record, line);
            }
            if (includeLayer) {
                this._lastRecord = record;
                this._lastMarker = marker;
            }
        }
        return markers;
    }
});

L.flowLine = function(data, options) {
    return new L.FlowLine(data, options);
};

L.ArcedFlowLine = L.FlowLine.extend({
    options: {
        getLine: function(latlng1, latlng2, options) {
            return new L.ArcedPolyline([ latlng1, latlng2 ], options);
        }
    },
    initialize: function(data, options) {
        L.FlowLine.prototype.initialize.call(this, data, options);
    }
});

L.arcedFlowLine = function(data, options) {
    return new L.ArcedFlowLine(data, options);
};

L.ArcedPolyline = L.Path.extend({
    includes: TextFunctions,
    initialize: function(latlngs, options) {
        L.Path.prototype.initialize.call(this, options);
        this._latlngs = latlngs;
    },
    options: {
        distanceToHeight: new L.LinearFunction([ 0, 5 ], [ 1e3, 200 ]),
        color: "#FFFFFF",
        opacity: 1,
        weight: 1,
        fillColor: "#000000",
        fill: false,
        gradient: false,
        dropShadow: false,
        optimizeSpeed: false
    },
    projectLatlngs: function() {
        this._points = [];
        for (var i = 0; i < this._latlngs.length; ++i) {
            this._points.push(this._map.latLngToLayerPoint(this._latlngs[i]));
        }
    },
    getBounds: function() {
        var bounds = new L.LatLngBounds();
        for (var i = 0; i < this._latlngs.length; ++i) {
            bounds.extend(this._latlngs[i]);
        }
        return bounds;
    },
    setLatLngs: function(latlngs) {
        this._latlngs = latlngs;
        this.redraw();
    },
    getLatLngs: function() {
        return this._latlngs;
    },
    drawSegment: function(point1, point2) {
        var distance = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        var heightOffset = this.options.distanceToHeight.evaluate(distance);
        var parts = [ "M", point1.x, ",", point1.y, " C", point1.x, ",", point1.y - heightOffset, " ", point2.x, ",", point2.y - heightOffset, " ", point2.x, ",", point2.y ];
        return parts.join(" ");
    },
    getPathString: function() {
        if (this.options.optimizeSpeed) {
            this._path.setAttribute("shape-rendering", "optimizeSpeed");
        }
        var parts = [];
        for (var i = 0; i < this._points.length - 1; ++i) {
            parts.push(this.drawSegment(this._points[i], this._points[i + 1]));
        }
        return parts.join("");
    }
});

L.arcedPolyline = function(latlngs, options) {
    return new L.ArcedPolyline(latlngs, options);
};

L.Control.Legend = L.Control.extend({
    options: {
        position: "bottomright",
        autoAdd: true
    },
    onAdd: function(map) {
        var className = "leaflet-control-legend", container = L.DomUtil.create("div", className);
        var self = this;
        if (this.options.autoAdd) {
            map.on("layeradd", function(e) {
                var layer = e.layer;
                self.addLayer(layer);
            });
            map.on("layerremove", function(e) {
                var layer = e.layer;
                self.removeLayer(layer);
            });
        }
        this.toggleSize = L.bind(this.toggleSize, this);
        L.DomEvent.addListener(container, "mouseover", this.toggleSize).addListener(container, "mouseout", this.toggleSize).addListener(container, "click", L.DomEvent.stopPropagation).addListener(container, "click", L.DomEvent.preventDefault);
        return container;
    },
    clear: function() {
        this._container.innerHTML = "";
    },
    toggleSize: function() {
        if (L.DomUtil.hasClass(this._container, "larger")) {
            L.DomUtil.removeClass(this._container, "larger");
        } else {
            L.DomUtil.addClass(this._container, "larger");
        }
    },
    redrawLayer: function(layer) {
        this.removeLayer(layer);
        this.addLayer(layer);
    },
    addLayer: function(layer) {
        var id = L.Util.stamp(layer);
        var me = this;
        if (layer.getLegend) {
            this.addLegend(id, layer.getLegend());
            layer.on("legendChanged", function() {
                me.redrawLayer(layer);
            });
        }
    },
    removeLayer: function(layer) {
        var id = L.Util.stamp(layer);
        if (layer.getLegend) {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
            layer.off("legendChanged");
        }
    },
    addLegend: function(id, html) {
        var container = this._container, legend = document.getElementById(id);
        if (!legend) {
            legend = L.DomUtil.create("div", "", container);
            legend.id = id;
        }
        legend.innerHTML = html;
    }
});

L.control.legend = function(options) {
    return new L.Control.Legend(options);
};