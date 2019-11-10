/*!
Plottable 1.16.1 (https://github.com/palantir/plottable)
Copyright 2014-2015 Palantir Technologies
Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
*/

(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root['Plottable'] = factory(req, exp, mod);
    }
}(this, function(require, exports, module) {
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var Math;
        (function (Math) {
            var nativeMath = window.Math;
            /**
             * Checks if x is between a and b.
             *
             * @param {number} x The value to test if in range
             * @param {number} a The beginning of the (inclusive) range
             * @param {number} b The ending of the (inclusive) range
             * @return {boolean} Whether x is in [a, b]
             */
            function inRange(x, a, b) {
                return (nativeMath.min(a, b) <= x && x <= nativeMath.max(a, b));
            }
            Math.inRange = inRange;
            /**
             * Clamps x to the range [min, max].
             *
             * @param {number} x The value to be clamped.
             * @param {number} min The minimum value.
             * @param {number} max The maximum value.
             * @return {number} A clamped value in the range [min, max].
             */
            function clamp(x, min, max) {
                return nativeMath.min(nativeMath.max(min, x), max);
            }
            Math.clamp = clamp;
            function max(array, firstArg, secondArg) {
                var accessor = typeof (firstArg) === "function" ? firstArg : null;
                var defaultValue = accessor == null ? firstArg : secondArg;
                /* tslint:disable:ban */
                var maxValue = accessor == null ? d3.max(array) : d3.max(array, accessor);
                /* tslint:enable:ban */
                return maxValue !== undefined ? maxValue : defaultValue;
            }
            Math.max = max;
            function min(array, firstArg, secondArg) {
                var accessor = typeof (firstArg) === "function" ? firstArg : null;
                var defaultValue = accessor == null ? firstArg : secondArg;
                /* tslint:disable:ban */
                var minValue = accessor == null ? d3.min(array) : d3.min(array, accessor);
                /* tslint:enable:ban */
                return minValue !== undefined ? minValue : defaultValue;
            }
            Math.min = min;
            /**
             * Returns true **only** if x is NaN
             */
            function isNaN(n) {
                return n !== n;
            }
            Math.isNaN = isNaN;
            /**
             * Returns true if the argument is a number, which is not NaN
             * Numbers represented as strings do not pass this function
             */
            function isValidNumber(n) {
                return typeof n === "number" && !Plottable.Utils.Math.isNaN(n) && isFinite(n);
            }
            Math.isValidNumber = isValidNumber;
            /**
             * Generates an array of consecutive, strictly increasing numbers
             * in the range [start, stop) separeted by step
             */
            function range(start, stop, step) {
                if (step === void 0) { step = 1; }
                if (step === 0) {
                    throw new Error("step cannot be 0");
                }
                var length = nativeMath.max(nativeMath.ceil((stop - start) / step), 0);
                var range = [];
                for (var i = 0; i < length; ++i) {
                    range[i] = start + step * i;
                }
                return range;
            }
            Math.range = range;
            /**
             * Returns the square of the distance between two points
             *
             * @param {Point} p1
             * @param {Point} p2
             * @return {number} dist(p1, p2)^2
             */
            function distanceSquared(p1, p2) {
                return nativeMath.pow(p2.y - p1.y, 2) + nativeMath.pow(p2.x - p1.x, 2);
            }
            Math.distanceSquared = distanceSquared;
            function degreesToRadians(degree) {
                return degree / 360 * nativeMath.PI * 2;
            }
            Math.degreesToRadians = degreesToRadians;
        })(Math = Utils.Math || (Utils.Math = {}));
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        /**
         * Shim for ES6 map.
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
         */
        var Map = (function () {
            function Map() {
                if (typeof window.Map === "function") {
                    this._es6Map = new window.Map();
                }
                else {
                    this._keyValuePairs = [];
                }
            }
            Map.prototype.set = function (key, value) {
                if (Utils.Math.isNaN(key)) {
                    throw new Error("NaN may not be used as a key to the Map");
                }
                if (this._es6Map != null) {
                    this._es6Map.set(key, value);
                    return this;
                }
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i].key === key) {
                        this._keyValuePairs[i].value = value;
                        return this;
                    }
                }
                this._keyValuePairs.push({ key: key, value: value });
                return this;
            };
            Map.prototype.get = function (key) {
                if (this._es6Map != null) {
                    return this._es6Map.get(key);
                }
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i].key === key) {
                        return this._keyValuePairs[i].value;
                    }
                }
                return undefined;
            };
            Map.prototype.has = function (key) {
                if (this._es6Map != null) {
                    return this._es6Map.has(key);
                }
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i].key === key) {
                        return true;
                    }
                }
                return false;
            };
            Map.prototype.forEach = function (callbackFn, thisArg) {
                var _this = this;
                if (this._es6Map != null) {
                    var callbackWrapper = function (value, key) { return callbackFn.call(thisArg, value, key, _this); };
                    this._es6Map.forEach(callbackWrapper, thisArg);
                    return;
                }
                this._keyValuePairs.forEach(function (keyValuePair) {
                    callbackFn.call(thisArg, keyValuePair.value, keyValuePair.key, _this);
                });
            };
            Map.prototype.delete = function (key) {
                if (this._es6Map != null) {
                    return this._es6Map.delete(key);
                }
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i].key === key) {
                        this._keyValuePairs.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            return Map;
        })();
        Utils.Map = Map;
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        /**
         * Shim for ES6 set.
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
         */
        var Set = (function () {
            function Set() {
                if (typeof window.Set === "function") {
                    this._es6Set = new window.Set();
                }
                else {
                    this._values = [];
                }
                this.size = 0;
            }
            Set.prototype.add = function (value) {
                if (this._es6Set != null) {
                    this._es6Set.add(value);
                    this.size = this._es6Set.size;
                    return this;
                }
                if (!this.has(value)) {
                    this._values.push(value);
                    this.size = this._values.length;
                }
                return this;
            };
            Set.prototype.delete = function (value) {
                if (this._es6Set != null) {
                    var deleted = this._es6Set.delete(value);
                    this.size = this._es6Set.size;
                    return deleted;
                }
                var index = this._values.indexOf(value);
                if (index !== -1) {
                    this._values.splice(index, 1);
                    this.size = this._values.length;
                    return true;
                }
                return false;
            };
            Set.prototype.has = function (value) {
                if (this._es6Set != null) {
                    return this._es6Set.has(value);
                }
                return this._values.indexOf(value) !== -1;
            };
            Set.prototype.forEach = function (callback, thisArg) {
                var _this = this;
                if (this._es6Set != null) {
                    var callbackWrapper = function (value, value2) { return callback.call(thisArg, value, value2, _this); };
                    this._es6Set.forEach(callbackWrapper, thisArg);
                    return;
                }
                this._values.forEach(function (value) {
                    callback.call(thisArg, value, value, _this);
                });
            };
            return Set;
        })();
        Utils.Set = Set;
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var DOM;
        (function (DOM) {
            var nativeMath = window.Math;
            /**
             * Gets the bounding box of an element.
             * @param {d3.Selection} element
             * @returns {SVGRed} The bounding box.
             */
            function elementBBox(element) {
                var bbox;
                // HACKHACK: Firefox won't correctly measure nodes with style "display: none" or their descendents (FF Bug 612118).
                try {
                    bbox = element.node().getBBox();
                }
                catch (err) {
                    bbox = { x: 0, y: 0, width: 0, height: 0 };
                }
                return bbox;
            }
            DOM.elementBBox = elementBBox;
            /**
             * Screen refresh rate which is assumed to be 60fps
             */
            DOM.SCREEN_REFRESH_RATE_MILLISECONDS = 1000 / 60;
            /**
             * Polyfill for `window.requestAnimationFrame`.
             * If the function exists, then we use the function directly.
             * Otherwise, we set a timeout on `SCREEN_REFRESH_RATE_MILLISECONDS` and then perform the function.
             *
             * @param {() => void} callback The callback to call in the next animation frame
             */
            function requestAnimationFramePolyfill(callback) {
                if (window.requestAnimationFrame != null) {
                    window.requestAnimationFrame(callback);
                }
                else {
                    setTimeout(callback, DOM.SCREEN_REFRESH_RATE_MILLISECONDS);
                }
            }
            DOM.requestAnimationFramePolyfill = requestAnimationFramePolyfill;
            /**
             * Calculates the width of the element.
             * The width includes the padding and the border on the element's left and right sides.
             *
             * @param {Element} element The element to query
             * @returns {number} The width of the element.
             */
            function elementWidth(element) {
                var style = window.getComputedStyle(element);
                return _parseStyleValue(style, "width")
                    + _parseStyleValue(style, "padding-left")
                    + _parseStyleValue(style, "padding-right")
                    + _parseStyleValue(style, "border-left-width")
                    + _parseStyleValue(style, "border-right-width");
            }
            DOM.elementWidth = elementWidth;
            /**
             * Calculates the height of the element.
             * The height includes the padding the and the border on the element's top and bottom sides.
             *
             * @param {Element} element The element to query
             * @returns {number} The height of the element
             */
            function elementHeight(element) {
                var style = window.getComputedStyle(element);
                return _parseStyleValue(style, "height")
                    + _parseStyleValue(style, "padding-top")
                    + _parseStyleValue(style, "padding-bottom")
                    + _parseStyleValue(style, "border-top-width")
                    + _parseStyleValue(style, "border-bottom-width");
            }
            DOM.elementHeight = elementHeight;
            function translate(selection, x, y) {
                var transformMatrix = d3.transform(selection.attr("transform"));
                if (x == null) {
                    return transformMatrix.translate;
                }
                y = (y == null) ? 0 : y;
                transformMatrix.translate[0] = x;
                transformMatrix.translate[1] = y;
                selection.attr("transform", transformMatrix.toString());
                return selection;
            }
            DOM.translate = translate;
            /**
             * Checks if the first ClientRect overlaps the second.
             *
             * @param {ClientRect} clientRectA The first ClientRect
             * @param {ClientRect} clientRectB The second ClientRect
             * @returns {boolean} If the ClientRects overlap each other.
             */
            function clientRectsOverlap(clientRectA, clientRectB) {
                if (nativeMath.floor(clientRectA.right) <= nativeMath.ceil(clientRectB.left)) {
                    return false;
                }
                if (nativeMath.ceil(clientRectA.left) >= nativeMath.floor(clientRectB.right)) {
                    return false;
                }
                if (nativeMath.floor(clientRectA.bottom) <= nativeMath.ceil(clientRectB.top)) {
                    return false;
                }
                if (nativeMath.ceil(clientRectA.top) >= nativeMath.floor(clientRectB.bottom)) {
                    return false;
                }
                return true;
            }
            DOM.clientRectsOverlap = clientRectsOverlap;
            /**
             * Returns true if and only if innerClientRect is inside outerClientRect.
             *
             * @param {ClientRect} innerClientRect The first ClientRect
             * @param {ClientRect} outerClientRect The second ClientRect
             * @returns {boolean} If and only if the innerClientRect is inside outerClientRect.
             */
            function clientRectInside(innerClientRect, outerClientRect) {
                return (nativeMath.floor(outerClientRect.left) <= nativeMath.ceil(innerClientRect.left) &&
                    nativeMath.floor(outerClientRect.top) <= nativeMath.ceil(innerClientRect.top) &&
                    nativeMath.floor(innerClientRect.right) <= nativeMath.ceil(outerClientRect.right) &&
                    nativeMath.floor(innerClientRect.bottom) <= nativeMath.ceil(outerClientRect.bottom));
            }
            DOM.clientRectInside = clientRectInside;
            /**
             * Retrieves the bounding svg of the input element
             *
             * @param {SVGElement} element The element to query
             * @returns {SVGElement} The bounding svg
             */
            function boundingSVG(element) {
                var ownerSVG = element.ownerSVGElement;
                if (ownerSVG != null) {
                    return ownerSVG;
                }
                if (element.nodeName.toLowerCase() === "svg") {
                    return element;
                }
                return null; // not in the DOM
            }
            DOM.boundingSVG = boundingSVG;
            var _latestClipPathId = 0;
            /**
             * Generates a ClipPath ID that is unique for this instance of Plottable
             */
            function generateUniqueClipPathId() {
                return "plottableClipPath" + ++_latestClipPathId;
            }
            DOM.generateUniqueClipPathId = generateUniqueClipPathId;
            /**
             * Returns true if the supplied coordinates or Ranges intersect or are contained by bbox.
             *
             * @param {number | Range} xValOrRange The x coordinate or Range to test
             * @param {number | Range} yValOrRange The y coordinate or Range to test
             * @param {SVGRect} bbox The bbox
             * @param {number} tolerance Amount by which to expand bbox, in each dimension, before
             * testing intersection
             *
             * @returns {boolean} True if the supplied coordinates or Ranges intersect or are
             * contained by bbox, false otherwise.
             */
            function intersectsBBox(xValOrRange, yValOrRange, bbox, tolerance) {
                if (tolerance === void 0) { tolerance = 0.5; }
                var xRange = _parseRange(xValOrRange);
                var yRange = _parseRange(yValOrRange);
                // SVGRects are positioned with sub-pixel accuracy (the default unit
                // for the x, y, height & width attributes), but user selections (e.g. via
                // mouse events) usually have pixel accuracy. A tolerance of half-a-pixel
                // seems appropriate.
                return bbox.x + bbox.width >= xRange.min - tolerance &&
                    bbox.x <= xRange.max + tolerance &&
                    bbox.y + bbox.height >= yRange.min - tolerance &&
                    bbox.y <= yRange.max + tolerance;
            }
            DOM.intersectsBBox = intersectsBBox;
            /**
             * Create a Range from a number or an object with "min" and "max" defined.
             *
             * @param {any} input The object to parse
             *
             * @returns {Range} The generated Range
             */
            function _parseRange(input) {
                if (typeof (input) === "number") {
                    var value = input;
                    return { min: value, max: value };
                }
                var range = input;
                if (range instanceof Object && "min" in range && "max" in range) {
                    return range;
                }
                throw new Error("input '" + input + "' can't be parsed as an Range");
            }
            function _parseStyleValue(style, property) {
                var value = style.getPropertyValue(property);
                var parsedValue = parseFloat(value);
                return parsedValue || 0;
            }
        })(DOM = Utils.DOM || (Utils.DOM = {}));
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var Color;
        (function (Color) {
            var nativeMath = window.Math;
            /**
             * Return contrast ratio between two colors
             * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
             * chroma.js may be found here: https://github.com/gka/chroma.js
             * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
             * see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
             */
            function contrast(a, b) {
                var l1 = luminance(a) + 0.05;
                var l2 = luminance(b) + 0.05;
                return l1 > l2 ? l1 / l2 : l2 / l1;
            }
            Color.contrast = contrast;
            /**
             * Returns a brighter copy of this color. Each channel is multiplied by 0.7 ^ -factor.
             * Channel values are capped at the maximum value of 255, and the minimum value of 30.
             */
            function lightenColor(color, factor) {
                var hsl = d3.hsl(color).brighter(factor);
                return hsl.rgb().toString();
            }
            Color.lightenColor = lightenColor;
            /**
             * Gets the Hex Code of the color resulting by applying the className CSS class to the
             * colorTester selection. Returns null if the tester is transparent.
             *
             * @param {d3.Selection<void>} colorTester The d3 selection to apply the CSS class to
             * @param {string} className The name of the class to be applied
             * @return {string} The hex code of the computed color
             */
            function colorTest(colorTester, className) {
                colorTester.classed(className, true);
                // Use regex to get the text inside the rgb parentheses
                var colorStyle = colorTester.style("background-color");
                if (colorStyle === "transparent") {
                    return null;
                }
                var rgb = /\((.+)\)/.exec(colorStyle)[1]
                    .split(",")
                    .map(function (colorValue) {
                    var colorNumber = +colorValue;
                    var hexValue = colorNumber.toString(16);
                    return colorNumber < 16 ? "0" + hexValue : hexValue;
                });
                if (rgb.length === 4 && rgb[3] === "00") {
                    return null;
                }
                var hexCode = "#" + rgb.join("");
                colorTester.classed(className, false);
                return hexCode;
            }
            Color.colorTest = colorTest;
            /**
             * Return relative luminance (defined here: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef)
             * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
             * chroma.js may be found here: https://github.com/gka/chroma.js
             * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
             */
            function luminance(color) {
                var rgb = d3.rgb(color);
                var lum = function (x) {
                    x = x / 255;
                    return x <= 0.03928 ? x / 12.92 : nativeMath.pow((x + 0.055) / 1.055, 2.4);
                };
                var r = lum(rgb.r);
                var g = lum(rgb.g);
                var b = lum(rgb.b);
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            }
        })(Color = Utils.Color || (Utils.Color = {}));
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var Array;
        (function (Array) {
            var nativeArray = window.Array;
            /**
             * Takes two arrays of numbers and adds them together
             *
             * @param {number[]} aList The first array of numbers
             * @param {number[]} bList The second array of numbers
             * @return {number[]} An array of numbers where x[i] = aList[i] + bList[i]
             */
            function add(aList, bList) {
                if (aList.length !== bList.length) {
                    throw new Error("attempted to add arrays of unequal length");
                }
                return aList.map(function (_, i) { return aList[i] + bList[i]; });
            }
            Array.add = add;
            /**
             * Take an array of values, and return the unique values.
             * Will work iff ∀ a, b, a.toString() == b.toString() => a == b; will break on Object inputs
             *
             * @param {T[]} values The values to find uniqueness for
             * @return {T[]} The unique values
             */
            function uniq(arr) {
                var seen = d3.set();
                var result = [];
                arr.forEach(function (x) {
                    if (!seen.has(String(x))) {
                        seen.add(String(x));
                        result.push(x);
                    }
                });
                return result;
            }
            Array.uniq = uniq;
            /**
             * @param {T[][]} a The 2D array that will have its elements joined together.
             * @return {T[]} Every array in a, concatenated together in the order they appear.
             */
            function flatten(a) {
                return nativeArray.prototype.concat.apply([], a);
            }
            Array.flatten = flatten;
            /**
             * Creates an array of length `count`, filled with value or (if value is a function), value()
             *
             * @param {T | ((index?: number) => T)} value The value to fill the array with or a value generator (called with index as arg)
             * @param {number} count The length of the array to generate
             * @return {any[]}
             */
            function createFilledArray(value, count) {
                var out = [];
                for (var i = 0; i < count; i++) {
                    out[i] = typeof (value) === "function" ? value(i) : value;
                }
                return out;
            }
            Array.createFilledArray = createFilledArray;
        })(Array = Utils.Array || (Utils.Array = {}));
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        /**
         * A set of callbacks which can be all invoked at once.
         * Each callback exists at most once in the set (based on reference equality).
         * All callbacks should have the same signature.
         */
        var CallbackSet = (function (_super) {
            __extends(CallbackSet, _super);
            function CallbackSet() {
                _super.apply(this, arguments);
            }
            CallbackSet.prototype.callCallbacks = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.forEach(function (callback) {
                    callback.apply(_this, args);
                });
                return this;
            };
            return CallbackSet;
        })(Utils.Set);
        Utils.CallbackSet = CallbackSet;
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var Stacking;
        (function (Stacking) {
            var nativeMath = window.Math;
            /**
             * Computes the StackingResult (value and offset) for each data point in each Dataset.
             *
             * @param {Dataset[]} datasets The Datasets to be stacked on top of each other in the order of stacking
             * @param {Accessor<any>} keyAccessor Accessor for the key of the data
             * @param {Accessor<number>} valueAccessor Accessor for the value of the data
             * @return {StackingResult} value and offset for each datapoint in each Dataset
             */
            function stack(datasets, keyAccessor, valueAccessor) {
                var positiveOffsets = d3.map();
                var negativeOffsets = d3.map();
                var datasetToKeyToStackedDatum = new Utils.Map();
                datasets.forEach(function (dataset) {
                    var keyToStackedDatum = new Utils.Map();
                    dataset.data().forEach(function (datum, index) {
                        var key = normalizeKey(keyAccessor(datum, index, dataset));
                        var value = +valueAccessor(datum, index, dataset);
                        var offset;
                        var offsetMap = (value >= 0) ? positiveOffsets : negativeOffsets;
                        if (offsetMap.has(key)) {
                            offset = offsetMap.get(key);
                            offsetMap.set(key, offset + value);
                        }
                        else {
                            offset = 0;
                            offsetMap.set(key, value);
                        }
                        keyToStackedDatum.set(key, {
                            value: value,
                            offset: offset
                        });
                    });
                    datasetToKeyToStackedDatum.set(dataset, keyToStackedDatum);
                });
                return datasetToKeyToStackedDatum;
            }
            Stacking.stack = stack;
            /**
             * Computes the total extent over all data points in all Datasets, taking stacking into consideration.
             *
             * @param {StackingResult} stackingResult The value and offset information for each datapoint in each dataset
             * @oaram {Accessor<any>} keyAccessor Accessor for the key of the data existent in the stackingResult
             * @param {Accessor<boolean>} filter A filter for data to be considered when computing the total extent
             * @return {[number, number]} The total extent
             */
            function stackedExtent(stackingResult, keyAccessor, filter) {
                var extents = [];
                stackingResult.forEach(function (stackedDatumMap, dataset) {
                    dataset.data().forEach(function (datum, index) {
                        if (filter != null && !filter(datum, index, dataset)) {
                            return;
                        }
                        var stackedDatum = stackedDatumMap.get(normalizeKey(keyAccessor(datum, index, dataset)));
                        extents.push(stackedDatum.value + stackedDatum.offset);
                    });
                });
                var maxStackExtent = Utils.Math.max(extents, 0);
                var minStackExtent = Utils.Math.min(extents, 0);
                return [nativeMath.min(minStackExtent, 0), nativeMath.max(0, maxStackExtent)];
            }
            Stacking.stackedExtent = stackedExtent;
            /**
             * Normalizes a key used for stacking
             *
             * @param {any} key The key to be normalized
             * @return {string} The stringified key
             */
            function normalizeKey(key) {
                return String(key);
            }
            Stacking.normalizeKey = normalizeKey;
        })(Stacking = Utils.Stacking || (Utils.Stacking = {}));
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var Window;
        (function (Window) {
            /**
             * Print a warning message to the console, if it is available.
             *
             * @param {string} The warnings to print
             */
            function warn(warning) {
                if (!Plottable.Configs.SHOW_WARNINGS) {
                    return;
                }
                /* tslint:disable:no-console */
                if (window.console != null) {
                    if (window.console.warn != null) {
                        console.warn(warning);
                    }
                    else if (window.console.log != null) {
                        console.log(warning);
                    }
                }
                /* tslint:enable:no-console */
            }
            Window.warn = warn;
            /**
             * Is like setTimeout, but activates synchronously if time=0
             * We special case 0 because of an observed issue where calling setTimeout causes visible flickering.
             * We believe this is because when requestAnimationFrame calls into the paint function, as soon as that function finishes
             * evaluating, the results are painted to the screen. As a result, if we want something to occur immediately but call setTimeout
             * with time=0, then it is pushed to the call stack and rendered in the next frame, so the component that was rendered via
             * setTimeout appears out-of-sync with the rest of the plot.
             */
            function setTimeout(f, time) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                if (time === 0) {
                    f(args);
                    return -1;
                }
                else {
                    return window.setTimeout(f, time, args);
                }
            }
            Window.setTimeout = setTimeout;
            /**
             * Sends a deprecation warning to the console. The warning includes the name of the deprecated method,
             * version number of the deprecation, and an optional message.
             *
             * To be used in the first line of a deprecated method.
             *
             * @param {string} callingMethod The name of the method being deprecated
             * @param {string} version The version when the tagged method became obsolete
             * @param {string?} message Optional message to be shown with the warning
             */
            function deprecated(callingMethod, version, message) {
                if (message === void 0) { message = ""; }
                Utils.Window.warn("Method " + callingMethod + " has been deprecated in version " + version +
                    ". Please refer to the release notes. " + message);
            }
            Window.deprecated = deprecated;
        })(Window = Utils.Window || (Utils.Window = {}));
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Utils;
    (function (Utils) {
        var ClientToSVGTranslator = (function () {
            function ClientToSVGTranslator(svg) {
                this._svg = svg;
                this._measureRect = document.createElementNS(svg.namespaceURI, "rect");
                this._measureRect.setAttribute("class", "measure-rect");
                this._measureRect.setAttribute("style", "opacity: 0; visibility: hidden;");
                this._measureRect.setAttribute("width", "1");
                this._measureRect.setAttribute("height", "1");
                this._svg.appendChild(this._measureRect);
            }
            /**
             * Returns the ClientToSVGTranslator for the <svg> containing elem.
             * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
             */
            ClientToSVGTranslator.getTranslator = function (elem) {
                var svg = Utils.DOM.boundingSVG(elem);
                var translator = svg[ClientToSVGTranslator._TRANSLATOR_KEY];
                if (translator == null) {
                    translator = new ClientToSVGTranslator(svg);
                    svg[ClientToSVGTranslator._TRANSLATOR_KEY] = translator;
                }
                return translator;
            };
            /**
             * Computes the position relative to the <svg> in svg-coordinate-space.
             */
            ClientToSVGTranslator.prototype.computePosition = function (clientX, clientY) {
                // get the origin
                this._measureRect.setAttribute("x", "0");
                this._measureRect.setAttribute("y", "0");
                var mrBCR = this._measureRect.getBoundingClientRect();
                var origin = { x: mrBCR.left, y: mrBCR.top };
                // calculate the scale
                var sampleDistance = 100;
                this._measureRect.setAttribute("x", String(sampleDistance));
                this._measureRect.setAttribute("y", String(sampleDistance));
                mrBCR = this._measureRect.getBoundingClientRect();
                var testPoint = { x: mrBCR.left, y: mrBCR.top };
                // invalid measurements -- SVG might not be in the DOM
                if (origin.x === testPoint.x || origin.y === testPoint.y) {
                    return null;
                }
                var scaleX = (testPoint.x - origin.x) / sampleDistance;
                var scaleY = (testPoint.y - origin.y) / sampleDistance;
                // get the true cursor position
                this._measureRect.setAttribute("x", String((clientX - origin.x) / scaleX));
                this._measureRect.setAttribute("y", String((clientY - origin.y) / scaleY));
                mrBCR = this._measureRect.getBoundingClientRect();
                var trueCursorPosition = { x: mrBCR.left, y: mrBCR.top };
                var scaledPosition = {
                    x: (trueCursorPosition.x - origin.x) / scaleX,
                    y: (trueCursorPosition.y - origin.y) / scaleY
                };
                return scaledPosition;
            };
            /**
             * Checks whether event happened inside <svg> element.
             */
            ClientToSVGTranslator.prototype.insideSVG = function (e) {
                return Utils.DOM.boundingSVG(e.target) === this._svg;
            };
            ClientToSVGTranslator._TRANSLATOR_KEY = "__Plottable_ClientToSVGTranslator";
            return ClientToSVGTranslator;
        })();
        Utils.ClientToSVGTranslator = ClientToSVGTranslator;
    })(Utils = Plottable.Utils || (Plottable.Utils = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Configs;
    (function (Configs) {
        /**
         * Specifies if Plottable should show warnings.
         */
        Configs.SHOW_WARNINGS = true;
        /**
         * Specifies if Plottable should add <title> elements to text.
         */
        Configs.ADD_TITLE_ELEMENTS = true;
    })(Configs = Plottable.Configs || (Plottable.Configs = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    Plottable.version = "1.16.1";
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Dataset = (function () {
        /**
         * A Dataset contains an array of data and some metadata.
         * Changes to the data or metadata will cause anything subscribed to the Dataset to update.
         *
         * @constructor
         * @param {any[]} [data=[]] The data for this Dataset.
         * @param {any} [metadata={}] An object containing additional information.
         */
        function Dataset(data, metadata) {
            if (data === void 0) { data = []; }
            if (metadata === void 0) { metadata = {}; }
            this._data = data;
            this._metadata = metadata;
            this._callbacks = new Plottable.Utils.CallbackSet();
        }
        /**
         * Adds a callback to be called when the Dataset updates.
         *
         * @param {DatasetCallback} callback.
         * @returns {Dataset} The calling Dataset.
         */
        Dataset.prototype.onUpdate = function (callback) {
            this._callbacks.add(callback);
            return this;
        };
        /**
         * Removes a callback that would be called when the Dataset updates.
         *
         * @param {DatasetCallback} callback
         * @returns {Dataset} The calling Dataset.
         */
        Dataset.prototype.offUpdate = function (callback) {
            this._callbacks.delete(callback);
            return this;
        };
        Dataset.prototype.data = function (data) {
            if (data == null) {
                return this._data;
            }
            else {
                this._data = data;
                this._callbacks.callCallbacks(this);
                return this;
            }
        };
        Dataset.prototype.metadata = function (metadata) {
            if (metadata == null) {
                return this._metadata;
            }
            else {
                this._metadata = metadata;
                this._callbacks.callCallbacks(this);
                return this;
            }
        };
        return Dataset;
    })();
    Plottable.Dataset = Dataset;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var RenderPolicies;
    (function (RenderPolicies) {
        /**
         * Renders Components immediately after they are enqueued.
         * Useful for debugging, horrible for performance.
         */
        var Immediate = (function () {
            function Immediate() {
            }
            Immediate.prototype.render = function () {
                Plottable.RenderController.flush();
            };
            return Immediate;
        })();
        RenderPolicies.Immediate = Immediate;
        /**
         * The default way to render, which only tries to render every frame
         * (usually, 1/60th of a second).
         */
        var AnimationFrame = (function () {
            function AnimationFrame() {
            }
            AnimationFrame.prototype.render = function () {
                Plottable.Utils.DOM.requestAnimationFramePolyfill(Plottable.RenderController.flush);
            };
            return AnimationFrame;
        })();
        RenderPolicies.AnimationFrame = AnimationFrame;
        /**
         * Renders with `setTimeout()`.
         * Generally an inferior way to render compared to `requestAnimationFrame`,
         * but useful for browsers that don't suppoort `requestAnimationFrame`.
         */
        var Timeout = (function () {
            function Timeout() {
                this._timeoutMsec = Plottable.Utils.DOM.SCREEN_REFRESH_RATE_MILLISECONDS;
            }
            Timeout.prototype.render = function () {
                setTimeout(Plottable.RenderController.flush, this._timeoutMsec);
            };
            return Timeout;
        })();
        RenderPolicies.Timeout = Timeout;
    })(RenderPolicies = Plottable.RenderPolicies || (Plottable.RenderPolicies = {}));
})(Plottable || (Plottable = {}));
/**
 * The RenderController is responsible for enqueueing and synchronizing
 * layout and render calls for Components.
 *
 * Layout and render calls occur inside an animation callback
 * (window.requestAnimationFrame if available).
 *
 * RenderController.flush() immediately lays out and renders all Components currently enqueued.
 *
 * To always have immediate rendering (useful for debugging), call
 * ```typescript
 * Plottable.RenderController.setRenderPolicy(
 *   new Plottable.RenderPolicies.Immediate()
 * );
 * ```
 */
var Plottable;
(function (Plottable) {
    var RenderController;
    (function (RenderController) {
        var _componentsNeedingRender = new Plottable.Utils.Set();
        var _componentsNeedingComputeLayout = new Plottable.Utils.Set();
        var _animationRequested = false;
        var _isCurrentlyFlushing = false;
        var Policy;
        (function (Policy) {
            Policy.IMMEDIATE = "immediate";
            Policy.ANIMATION_FRAME = "animationframe";
            Policy.TIMEOUT = "timeout";
        })(Policy = RenderController.Policy || (RenderController.Policy = {}));
        var _renderPolicy = new Plottable.RenderPolicies.AnimationFrame();
        function renderPolicy(renderPolicy) {
            if (renderPolicy == null) {
                return _renderPolicy;
            }
            switch (renderPolicy.toLowerCase()) {
                case Policy.IMMEDIATE:
                    _renderPolicy = new Plottable.RenderPolicies.Immediate();
                    break;
                case Policy.ANIMATION_FRAME:
                    _renderPolicy = new Plottable.RenderPolicies.AnimationFrame();
                    break;
                case Policy.TIMEOUT:
                    _renderPolicy = new Plottable.RenderPolicies.Timeout();
                    break;
                default:
                    Plottable.Utils.Window.warn("Unrecognized renderPolicy: " + renderPolicy);
            }
        }
        RenderController.renderPolicy = renderPolicy;
        /**
         * Enqueues the Component for rendering.
         *
         * @param {Component} component
         */
        function registerToRender(component) {
            if (_isCurrentlyFlushing) {
                Plottable.Utils.Window.warn("Registered to render while other components are flushing: request may be ignored");
            }
            _componentsNeedingRender.add(component);
            requestRender();
        }
        RenderController.registerToRender = registerToRender;
        /**
         * Enqueues the Component for layout and rendering.
         *
         * @param {Component} component
         */
        function registerToComputeLayout(component) {
            _componentsNeedingComputeLayout.add(component);
            _componentsNeedingRender.add(component);
            requestRender();
        }
        RenderController.registerToComputeLayout = registerToComputeLayout;
        function requestRender() {
            // Only run or enqueue flush on first request.
            if (!_animationRequested) {
                _animationRequested = true;
                _renderPolicy.render();
            }
        }
        /**
         * Renders all Components waiting to be rendered immediately
         * instead of waiting until the next frame.
         *
         * Useful to call when debugging.
         */
        function flush() {
            if (_animationRequested) {
                // Layout
                _componentsNeedingComputeLayout.forEach(function (component) { return component.computeLayout(); });
                // Top level render; Containers will put their children in the toRender queue
                _componentsNeedingRender.forEach(function (component) { return component.render(); });
                _isCurrentlyFlushing = true;
                var failed = new Plottable.Utils.Set();
                _componentsNeedingRender.forEach(function (component) {
                    try {
                        component.renderImmediately();
                    }
                    catch (err) {
                        // throw error with timeout to avoid interrupting further renders
                        window.setTimeout(function () { throw err; }, 0);
                        failed.add(component);
                    }
                });
                _componentsNeedingComputeLayout = new Plottable.Utils.Set();
                _componentsNeedingRender = failed;
                _animationRequested = false;
                _isCurrentlyFlushing = false;
            }
        }
        RenderController.flush = flush;
    })(RenderController = Plottable.RenderController || (Plottable.RenderController = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    /**
     * This field is deprecated and will be removed in v2.0.0.
     *
     * The number of milliseconds between midnight one day and the next is
     * not a fixed quantity.
     *
     * Use date.setDate(date.getDate() + number_of_days) instead.
     *
     */
    Plottable.MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Formatters;
    (function (Formatters) {
        /**
         * Creates a formatter for currency values.
         *
         * @param {number} [precision] The number of decimal places to show (default 2).
         * @param {string} [symbol] The currency symbol to use (default "$").
         * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
         *
         * @returns {Formatter} A formatter for currency values.
         */
        function currency(precision, symbol, prefix) {
            if (precision === void 0) { precision = 2; }
            if (symbol === void 0) { symbol = "$"; }
            if (prefix === void 0) { prefix = true; }
            var fixedFormatter = Formatters.fixed(precision);
            return function (d) {
                var formattedValue = fixedFormatter(Math.abs(d));
                if (formattedValue !== "") {
                    if (prefix) {
                        formattedValue = symbol + formattedValue;
                    }
                    else {
                        formattedValue += symbol;
                    }
                    if (d < 0) {
                        formattedValue = "-" + formattedValue;
                    }
                }
                return formattedValue;
            };
        }
        Formatters.currency = currency;
        /**
         * Creates a formatter that displays exactly [precision] decimal places.
         *
         * @param {number} [precision] The number of decimal places to show (default 3).
         *
         * @returns {Formatter} A formatter that displays exactly [precision] decimal places.
         */
        function fixed(precision) {
            if (precision === void 0) { precision = 3; }
            verifyPrecision(precision);
            return function (d) { return d.toFixed(precision); };
        }
        Formatters.fixed = fixed;
        /**
         * Creates a formatter that formats numbers to show no more than
         * [maxNumberOfDecimalPlaces] decimal places. All other values are stringified.
         *
         * @param {number} [maxNumberOfDecimalPlaces] The number of decimal places to show (default 3).
         *
         * @returns {Formatter} A formatter for general values.
         */
        function general(maxNumberOfDecimalPlaces) {
            if (maxNumberOfDecimalPlaces === void 0) { maxNumberOfDecimalPlaces = 3; }
            verifyPrecision(maxNumberOfDecimalPlaces);
            return function (d) {
                if (typeof d === "number") {
                    var multiplier = Math.pow(10, maxNumberOfDecimalPlaces);
                    return String(Math.round(d * multiplier) / multiplier);
                }
                else {
                    return String(d);
                }
            };
        }
        Formatters.general = general;
        /**
         * Creates a formatter that stringifies its input.
         *
         * @returns {Formatter} A formatter that stringifies its input.
         */
        function identity() {
            return function (d) { return String(d); };
        }
        Formatters.identity = identity;
        /**
         * Creates a formatter for percentage values.
         * Multiplies the input by 100 and appends "%".
         *
         * @param {number} [precision] The number of decimal places to show (default 0).
         *
         * @returns {Formatter} A formatter for percentage values.
         */
        function percentage(precision) {
            if (precision === void 0) { precision = 0; }
            var fixedFormatter = Formatters.fixed(precision);
            return function (d) {
                var valToFormat = d * 100;
                // Account for float imprecision
                var valString = d.toString();
                var integerPowerTen = Math.pow(10, valString.length - (valString.indexOf(".") + 1));
                valToFormat = parseInt((valToFormat * integerPowerTen).toString(), 10) / integerPowerTen;
                return fixedFormatter(valToFormat) + "%";
            };
        }
        Formatters.percentage = percentage;
        /**
         * Creates a formatter for values that displays [numberOfSignificantFigures] significant figures
         * and puts SI notation.
         *
         * @param {number} [numberOfSignificantFigures] The number of significant figures to show (default 3).
         *
         * @returns {Formatter} A formatter for SI values.
         */
        function siSuffix(numberOfSignificantFigures) {
            if (numberOfSignificantFigures === void 0) { numberOfSignificantFigures = 3; }
            verifyPrecision(numberOfSignificantFigures);
            return function (d) { return d3.format("." + numberOfSignificantFigures + "s")(d); };
        }
        Formatters.siSuffix = siSuffix;
        /**
         * Creates a formatter for values that displays abbreviated values
         * and uses standard short scale suffixes
         * - K - thousands - 10 ^ 3
         * - M - millions - 10 ^ 6
         * - B - billions - 10 ^ 9
         * - T - trillions - 10 ^ 12
         * - Q - quadrillions - 10 ^ 15
         *
         * Numbers with a magnitude outside of (10 ^ (-precision), 10 ^ 15) are shown using
         * scientific notation to avoid creating extremely long decimal strings.
         *
         * @param {number} [precision] the number of decimal places to show (default 3)
         * @returns {Formatter} A formatter with short scale formatting
         */
        function shortScale(precision) {
            if (precision === void 0) { precision = 3; }
            verifyPrecision(precision);
            var suffixes = "KMBTQ";
            var exponentFormatter = d3.format("." + precision + "e");
            var fixedFormatter = d3.format("." + precision + "f");
            var max = Math.pow(10, (3 * (suffixes.length + 1)));
            var min = Math.pow(10, -precision);
            return function (num) {
                var absNum = Math.abs(num);
                if ((absNum < min || absNum >= max) && absNum !== 0) {
                    return exponentFormatter(num);
                }
                var idx = -1;
                while (absNum >= Math.pow(1000, idx + 2) && idx < (suffixes.length - 1)) {
                    idx++;
                }
                var output = "";
                if (idx === -1) {
                    output = fixedFormatter(num);
                }
                else {
                    output = fixedFormatter(num / Math.pow(1000, idx + 1)) + suffixes[idx];
                }
                // catch rounding by the underlying d3 formatter
                if ((num > 0 && output.substr(0, 4) === "1000") || (num < 0 && output.substr(0, 5) === "-1000")) {
                    if (idx < suffixes.length - 1) {
                        idx++;
                        output = fixedFormatter(num / Math.pow(1000, idx + 1)) + suffixes[idx];
                    }
                    else {
                        output = exponentFormatter(num);
                    }
                }
                return output;
            };
        }
        Formatters.shortScale = shortScale;
        /**
         * Creates a multi time formatter that displays dates.
         *
         * @returns {Formatter} A formatter for time/date values.
         */
        function multiTime() {
            var numFormats = 8;
            // these defaults were taken from d3
            // https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
            var timeFormat = {};
            timeFormat[0] = {
                format: ".%L",
                filter: function (d) { return d.getMilliseconds() !== 0; }
            };
            timeFormat[1] = {
                format: ":%S",
                filter: function (d) { return d.getSeconds() !== 0; }
            };
            timeFormat[2] = {
                format: "%I:%M",
                filter: function (d) { return d.getMinutes() !== 0; }
            };
            timeFormat[3] = {
                format: "%I %p",
                filter: function (d) { return d.getHours() !== 0; }
            };
            timeFormat[4] = {
                format: "%a %d",
                filter: function (d) { return d.getDay() !== 0 && d.getDate() !== 1; }
            };
            timeFormat[5] = {
                format: "%b %d",
                filter: function (d) { return d.getDate() !== 1; }
            };
            timeFormat[6] = {
                format: "%b",
                filter: function (d) { return d.getMonth() !== 0; }
            };
            timeFormat[7] = {
                format: "%Y",
                filter: function () { return true; }
            };
            return function (d) {
                for (var i = 0; i < numFormats; i++) {
                    if (timeFormat[i].filter(d)) {
                        return d3.time.format(timeFormat[i].format)(d);
                    }
                }
            };
        }
        Formatters.multiTime = multiTime;
        /**
         * Creates a time formatter that displays time/date using given specifier.
         *
         * List of directives can be found on: https://github.com/mbostock/d3/wiki/Time-Formatting#format
         *
         * @param {string} [specifier] The specifier for the formatter.
         *
         * @returns {Formatter} A formatter for time/date values.
         */
        function time(specifier) {
            return d3.time.format(specifier);
        }
        Formatters.time = time;
        /**
         * @deprecated As of release v1.3.0, not safe for use with time zones.
         *
         * Creates a formatter for relative dates.
         *
         * @param {number} baseValue The start date (as epoch time) used in computing relative dates (default 0)
         * @param {number} increment The unit used in calculating relative date values (default MILLISECONDS_IN_ONE_DAY)
         * @param {string} label The label to append to the formatted string (default "")
         *
         * @returns {Formatter} A formatter for time/date values.
         */
        function relativeDate(baseValue, increment, label) {
            if (baseValue === void 0) { baseValue = 0; }
            if (increment === void 0) { increment = Plottable.MILLISECONDS_IN_ONE_DAY; }
            if (label === void 0) { label = ""; }
            Plottable.Utils.Window.deprecated("relativeDate()", "v1.3.0", "Not safe for use with time zones.");
            return function (d) {
                var relativeDate = Math.round((d.valueOf() - baseValue) / increment);
                return relativeDate.toString() + label;
            };
        }
        Formatters.relativeDate = relativeDate;
        function verifyPrecision(precision) {
            if (precision < 0 || precision > 20) {
                throw new RangeError("Formatter precision must be between 0 and 20");
            }
            if (precision !== Math.floor(precision)) {
                throw new RangeError("Formatter precision must be an integer");
            }
        }
    })(Formatters = Plottable.Formatters || (Plottable.Formatters = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var SymbolFactories;
    (function (SymbolFactories) {
        function circle() {
            return function (symbolSize) { return d3.svg.symbol().type("circle").size(Math.PI * Math.pow(symbolSize / 2, 2))(null); };
        }
        SymbolFactories.circle = circle;
        function square() {
            return function (symbolSize) { return d3.svg.symbol().type("square").size(Math.pow(symbolSize, 2))(null); };
        }
        SymbolFactories.square = square;
        function cross() {
            return function (symbolSize) { return d3.svg.symbol().type("cross").size((5 / 9) * Math.pow(symbolSize, 2))(null); };
        }
        SymbolFactories.cross = cross;
        function diamond() {
            return function (symbolSize) { return d3.svg.symbol().type("diamond").size(Math.tan(Math.PI / 6) * Math.pow(symbolSize, 2) / 2)(null); };
        }
        SymbolFactories.diamond = diamond;
        function triangleUp() {
            return function (symbolSize) { return d3.svg.symbol().type("triangle-up").size(Math.sqrt(3) * Math.pow(symbolSize / 2, 2))(null); };
        }
        SymbolFactories.triangleUp = triangleUp;
        function triangleDown() {
            return function (symbolSize) { return d3.svg.symbol().type("triangle-down").size(Math.sqrt(3) * Math.pow(symbolSize / 2, 2))(null); };
        }
        SymbolFactories.triangleDown = triangleDown;
    })(SymbolFactories = Plottable.SymbolFactories || (Plottable.SymbolFactories = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scale = (function () {
        /**
         * A Scale is a function (in the mathematical sense) that maps values from a domain to a range.
         *
         * @constructor
         */
        function Scale() {
            this._autoDomainAutomatically = true;
            this._domainModificationInProgress = false;
            this._callbacks = new Plottable.Utils.CallbackSet();
            this._includedValuesProviders = new Plottable.Utils.Set();
        }
        /**
         * Given an array of potential domain values, computes the extent of those values.
         *
         * @param {D[]} values
         * @returns {D[]} The extent of the input values.
         */
        Scale.prototype.extentOfValues = function (values) {
            return []; // this should be overwritten
        };
        Scale.prototype._getAllIncludedValues = function () {
            var _this = this;
            var providerArray = [];
            this._includedValuesProviders.forEach(function (provider) {
                var extents = provider(_this);
                providerArray = providerArray.concat(extents);
            });
            return providerArray;
        };
        Scale.prototype._getExtent = function () {
            return []; // this should be overwritten
        };
        /**
         * Adds a callback to be called when the Scale updates.
         *
         * @param {ScaleCallback} callback.
         * @returns {Scale} The calling Scale.
         */
        Scale.prototype.onUpdate = function (callback) {
            this._callbacks.add(callback);
            return this;
        };
        /**
         * Removes a callback that would be called when the Scale updates.
         *
         * @param {ScaleCallback} callback.
         * @returns {Scale} The calling Scale.
         */
        Scale.prototype.offUpdate = function (callback) {
            this._callbacks.delete(callback);
            return this;
        };
        Scale.prototype._dispatchUpdate = function () {
            this._callbacks.callCallbacks(this);
        };
        /**
         * Sets the Scale's domain so that it spans the Extents of all its ExtentsProviders.
         *
         * @returns {Scale} The calling Scale.
         */
        Scale.prototype.autoDomain = function () {
            this._autoDomainAutomatically = true;
            this._setDomain(this._getExtent());
            return this;
        };
        Scale.prototype._autoDomainIfAutomaticMode = function () {
            if (this._autoDomainAutomatically) {
                this.autoDomain();
            }
        };
        /**
         * Computes the range value corresponding to a given domain value.
         *
         * @param {D} value
         * @returns {R} The range value corresponding to the supplied domain value.
         */
        Scale.prototype.scale = function (value) {
            throw new Error("Subclasses should override scale");
        };
        Scale.prototype.domain = function (values) {
            if (values == null) {
                return this._getDomain();
            }
            else {
                this._autoDomainAutomatically = false;
                this._setDomain(values);
                return this;
            }
        };
        Scale.prototype._getDomain = function () {
            throw new Error("Subclasses should override _getDomain");
        };
        Scale.prototype._setDomain = function (values) {
            if (!this._domainModificationInProgress) {
                this._domainModificationInProgress = true;
                this._setBackingScaleDomain(values);
                this._dispatchUpdate();
                this._domainModificationInProgress = false;
            }
        };
        Scale.prototype._setBackingScaleDomain = function (values) {
            throw new Error("Subclasses should override _setBackingDomain");
        };
        Scale.prototype.range = function (values) {
            if (values == null) {
                return this._getRange();
            }
            else {
                this._setRange(values);
                return this;
            }
        };
        Scale.prototype._getRange = function () {
            throw new Error("Subclasses should override _getRange");
        };
        Scale.prototype._setRange = function (values) {
            throw new Error("Subclasses should override _setRange");
        };
        /**
         * Adds an IncludedValuesProvider to the Scale.
         *
         * @param {Scales.IncludedValuesProvider} provider
         * @returns {Scale} The calling Scale.
         */
        Scale.prototype.addIncludedValuesProvider = function (provider) {
            this._includedValuesProviders.add(provider);
            this._autoDomainIfAutomaticMode();
            return this;
        };
        /**
         * Removes the IncludedValuesProvider from the Scale.
         *
         * @param {Scales.IncludedValuesProvider} provider
         * @returns {Scale} The calling Scale.
         */
        Scale.prototype.removeIncludedValuesProvider = function (provider) {
            this._includedValuesProviders.delete(provider);
            this._autoDomainIfAutomaticMode();
            return this;
        };
        return Scale;
    })();
    Plottable.Scale = Scale;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var QuantitativeScale = (function (_super) {
        __extends(QuantitativeScale, _super);
        /**
         * A QuantitativeScale is a Scale that maps number-like values to numbers.
         * It is invertible and continuous.
         *
         * @constructor
         */
        function QuantitativeScale() {
            _super.call(this);
            this._tickGenerator = function (scale) { return scale.defaultTicks(); };
            this._padProportion = 0.05;
            this._snappingDomainEnabled = true;
            this._paddingExceptionsProviders = new Plottable.Utils.Set();
        }
        QuantitativeScale.prototype.autoDomain = function () {
            this._domainMin = null;
            this._domainMax = null;
            _super.prototype.autoDomain.call(this);
            return this;
        };
        QuantitativeScale.prototype._autoDomainIfAutomaticMode = function () {
            if (this._domainMin != null && this._domainMax != null) {
                this._setDomain([this._domainMin, this._domainMax]);
                return;
            }
            var computedExtent = this._getExtent();
            if (this._domainMin != null) {
                var maxValue = computedExtent[1];
                if (this._domainMin >= maxValue) {
                    maxValue = this._expandSingleValueDomain([this._domainMin, this._domainMin])[1];
                }
                this._setDomain([this._domainMin, maxValue]);
                return;
            }
            if (this._domainMax != null) {
                var minValue = computedExtent[0];
                if (this._domainMax <= minValue) {
                    minValue = this._expandSingleValueDomain([this._domainMax, this._domainMax])[0];
                }
                this._setDomain([minValue, this._domainMax]);
                return;
            }
            _super.prototype._autoDomainIfAutomaticMode.call(this);
        };
        QuantitativeScale.prototype._getExtent = function () {
            var includedValues = this._getAllIncludedValues();
            var extent = this._defaultExtent();
            if (includedValues.length !== 0) {
                var combinedExtent = [
                    Plottable.Utils.Math.min(includedValues, extent[0]),
                    Plottable.Utils.Math.max(includedValues, extent[1])
                ];
                extent = this._padDomain(combinedExtent);
            }
            if (this._domainMin != null) {
                extent[0] = this._domainMin;
            }
            if (this._domainMax != null) {
                extent[1] = this._domainMax;
            }
            return extent;
        };
        /**
         * Adds a padding exception provider.
         * If one end of the domain is set to an excepted value as a result of autoDomain()-ing,
         * that end of the domain will not be padded.
         *
         * @param {Scales.PaddingExceptionProvider<D>} provider The provider function.
         * @returns {QuantitativeScale} The calling QuantitativeScale.
         */
        QuantitativeScale.prototype.addPaddingExceptionsProvider = function (provider) {
            this._paddingExceptionsProviders.add(provider);
            this._autoDomainIfAutomaticMode();
            return this;
        };
        /**
         * Removes the padding exception provider.
         *
         * @param {Scales.PaddingExceptionProvider<D>} provider The provider function.
         * @returns {QuantitativeScale} The calling QuantitativeScale.
         */
        QuantitativeScale.prototype.removePaddingExceptionsProvider = function (provider) {
            this._paddingExceptionsProviders.delete(provider);
            this._autoDomainIfAutomaticMode();
            return this;
        };
        QuantitativeScale.prototype.padProportion = function (padProportion) {
            if (padProportion == null) {
                return this._padProportion;
            }
            if (padProportion < 0) {
                throw new Error("padProportion must be non-negative");
            }
            this._padProportion = padProportion;
            this._autoDomainIfAutomaticMode();
            return this;
        };
        QuantitativeScale.prototype._padDomain = function (domain) {
            var _this = this;
            if (domain[0].valueOf() === domain[1].valueOf()) {
                return this._expandSingleValueDomain(domain);
            }
            if (this._padProportion === 0) {
                return domain;
            }
            var p = this._padProportion / 2;
            var min = domain[0];
            var max = domain[1];
            var minExistsInExceptions = false;
            var maxExistsInExceptions = false;
            this._paddingExceptionsProviders.forEach(function (provider) {
                var values = provider(_this);
                values.forEach(function (value) {
                    if (value.valueOf() === min.valueOf()) {
                        minExistsInExceptions = true;
                    }
                    if (value.valueOf() === max.valueOf()) {
                        maxExistsInExceptions = true;
                    }
                });
            });
            var newMin = minExistsInExceptions ? min : this.invert(this.scale(min) - (this.scale(max) - this.scale(min)) * p);
            var newMax = maxExistsInExceptions ? max : this.invert(this.scale(max) + (this.scale(max) - this.scale(min)) * p);
            if (this._snappingDomainEnabled) {
                return this._niceDomain([newMin, newMax]);
            }
            return ([newMin, newMax]);
        };
        QuantitativeScale.prototype.snappingDomainEnabled = function (snappingDomainEnabled) {
            if (snappingDomainEnabled == null) {
                return this._snappingDomainEnabled;
            }
            this._snappingDomainEnabled = snappingDomainEnabled;
            this._autoDomainIfAutomaticMode();
            return this;
        };
        QuantitativeScale.prototype._expandSingleValueDomain = function (singleValueDomain) {
            return singleValueDomain;
        };
        /**
         * Computes the domain value corresponding to a supplied range value.
         *
         * @param {number} value: A value from the Scale's range.
         * @returns {D} The domain value corresponding to the supplied range value.
         */
        QuantitativeScale.prototype.invert = function (value) {
            throw new Error("Subclasses should override invert");
        };
        QuantitativeScale.prototype.domain = function (values) {
            if (values != null) {
                this._domainMin = values[0];
                this._domainMax = values[1];
            }
            return _super.prototype.domain.call(this, values);
        };
        QuantitativeScale.prototype.domainMin = function (domainMin) {
            if (domainMin == null) {
                return this.domain()[0];
            }
            this._domainMin = domainMin;
            this._autoDomainIfAutomaticMode();
            return this;
        };
        QuantitativeScale.prototype.domainMax = function (domainMax) {
            if (domainMax == null) {
                return this.domain()[1];
            }
            this._domainMax = domainMax;
            this._autoDomainIfAutomaticMode();
            return this;
        };
        QuantitativeScale.prototype.extentOfValues = function (values) {
            // HACKHACK: TS1.4 doesn't consider numbers to be Number-like (valueOf() returning number), so D can't be typed correctly
            var extent = d3.extent(values.filter(function (value) { return Plottable.Utils.Math.isValidNumber(+value); }));
            if (extent[0] == null || extent[1] == null) {
                return [];
            }
            else {
                return extent;
            }
        };
        QuantitativeScale.prototype._setDomain = function (values) {
            var isNaNOrInfinity = function (x) { return Plottable.Utils.Math.isNaN(x) || x === Infinity || x === -Infinity; };
            if (isNaNOrInfinity(values[0]) || isNaNOrInfinity(values[1])) {
                Plottable.Utils.Window.warn("Warning: QuantitativeScales cannot take NaN or Infinity as a domain value. Ignoring.");
                return;
            }
            _super.prototype._setDomain.call(this, values);
        };
        /**
         * Gets the array of tick values generated by the default algorithm.
         */
        QuantitativeScale.prototype.defaultTicks = function () {
            throw new Error("Subclasses should override _getDefaultTicks");
        };
        /**
         * Gets an array of tick values spanning the domain.
         *
         * @returns {D[]}
         */
        QuantitativeScale.prototype.ticks = function () {
            return this._tickGenerator(this);
        };
        /**
         * Given a domain, expands its domain onto "nice" values, e.g. whole
         * numbers.
         */
        QuantitativeScale.prototype._niceDomain = function (domain, count) {
            throw new Error("Subclasses should override _niceDomain");
        };
        QuantitativeScale.prototype._defaultExtent = function () {
            throw new Error("Subclasses should override _defaultExtent");
        };
        QuantitativeScale.prototype.tickGenerator = function (generator) {
            if (generator == null) {
                return this._tickGenerator;
            }
            else {
                this._tickGenerator = generator;
                return this;
            }
        };
        QuantitativeScale._DEFAULT_NUM_TICKS = 10;
        return QuantitativeScale;
    })(Plottable.Scale);
    Plottable.QuantitativeScale = QuantitativeScale;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var Linear = (function (_super) {
            __extends(Linear, _super);
            /**
             * @constructor
             */
            function Linear() {
                _super.call(this);
                this._d3Scale = d3.scale.linear();
            }
            Linear.prototype._defaultExtent = function () {
                return [0, 1];
            };
            Linear.prototype._expandSingleValueDomain = function (singleValueDomain) {
                if (singleValueDomain[0] === singleValueDomain[1]) {
                    return [singleValueDomain[0] - 1, singleValueDomain[1] + 1];
                }
                return singleValueDomain;
            };
            Linear.prototype.scale = function (value) {
                return this._d3Scale(value);
            };
            Linear.prototype._getDomain = function () {
                return this._d3Scale.domain();
            };
            Linear.prototype._setBackingScaleDomain = function (values) {
                this._d3Scale.domain(values);
            };
            Linear.prototype._getRange = function () {
                return this._d3Scale.range();
            };
            Linear.prototype._setRange = function (values) {
                this._d3Scale.range(values);
            };
            Linear.prototype.invert = function (value) {
                return this._d3Scale.invert(value);
            };
            Linear.prototype.defaultTicks = function () {
                return this._d3Scale.ticks(Scales.Linear._DEFAULT_NUM_TICKS);
            };
            Linear.prototype._niceDomain = function (domain, count) {
                return this._d3Scale.copy().domain(domain).nice(count).domain();
            };
            return Linear;
        })(Plottable.QuantitativeScale);
        Scales.Linear = Linear;
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var ModifiedLog = (function (_super) {
            __extends(ModifiedLog, _super);
            /**
             * A ModifiedLog Scale acts as a regular log scale for large numbers.
             * As it approaches 0, it gradually becomes linear.
             * Consequently, a ModifiedLog Scale can process 0 and negative numbers.
             *
             * @constructor
             * @param {number} [base=10]
             *        The base of the log. Must be > 1.
             *
             *        For x <= base, scale(x) = log(x).
             *
             *        For 0 < x < base, scale(x) will become more and more
             *        linear as it approaches 0.
             *
             *        At x == 0, scale(x) == 0.
             *
             *        For negative values, scale(-x) = -scale(x).
             */
            function ModifiedLog(base) {
                if (base === void 0) { base = 10; }
                _super.call(this);
                this._d3Scale = d3.scale.linear();
                this._base = base;
                this._pivot = this._base;
                this._setDomain(this._defaultExtent());
                if (base <= 1) {
                    throw new Error("ModifiedLogScale: The base must be > 1");
                }
            }
            /**
             * Returns an adjusted log10 value for graphing purposes.  The first
             * adjustment is that negative values are changed to positive during
             * the calculations, and then the answer is negated at the end.  The
             * second is that, for values less than 10, an increasingly large
             * (0 to 1) scaling factor is added such that at 0 the value is
             * adjusted to 1, resulting in a returned result of 0.
             */
            ModifiedLog.prototype._adjustedLog = function (x) {
                var negationFactor = x < 0 ? -1 : 1;
                x *= negationFactor;
                if (x < this._pivot) {
                    x += (this._pivot - x) / this._pivot;
                }
                x = Math.log(x) / Math.log(this._base);
                x *= negationFactor;
                return x;
            };
            ModifiedLog.prototype._invertedAdjustedLog = function (x) {
                var negationFactor = x < 0 ? -1 : 1;
                x *= negationFactor;
                x = Math.pow(this._base, x);
                if (x < this._pivot) {
                    x = (this._pivot * (x - 1)) / (this._pivot - 1);
                }
                x *= negationFactor;
                return x;
            };
            ModifiedLog.prototype.scale = function (x) {
                return this._d3Scale(this._adjustedLog(x));
            };
            ModifiedLog.prototype.invert = function (x) {
                return this._invertedAdjustedLog(this._d3Scale.invert(x));
            };
            ModifiedLog.prototype._getDomain = function () {
                return this._untransformedDomain;
            };
            ModifiedLog.prototype._setDomain = function (values) {
                this._untransformedDomain = values;
                var transformedDomain = [this._adjustedLog(values[0]), this._adjustedLog(values[1])];
                _super.prototype._setDomain.call(this, transformedDomain);
            };
            ModifiedLog.prototype._setBackingScaleDomain = function (values) {
                this._d3Scale.domain(values);
            };
            ModifiedLog.prototype.ticks = function () {
                // Say your domain is [-100, 100] and your pivot is 10.
                // then we're going to draw negative log ticks from -100 to -10,
                // linear ticks from -10 to 10, and positive log ticks from 10 to 100.
                var middle = function (x, y, z) { return [x, y, z].sort(function (a, b) { return a - b; })[1]; };
                var min = Plottable.Utils.Math.min(this._untransformedDomain, 0);
                var max = Plottable.Utils.Math.max(this._untransformedDomain, 0);
                var negativeLower = min;
                var negativeUpper = middle(min, max, -this._pivot);
                var positiveLower = middle(min, max, this._pivot);
                var positiveUpper = max;
                var negativeLogTicks = this._logTicks(-negativeUpper, -negativeLower).map(function (x) { return -x; }).reverse();
                var positiveLogTicks = this._logTicks(positiveLower, positiveUpper);
                var linearMin = Math.max(min, -this._pivot);
                var linearMax = Math.min(max, this._pivot);
                var linearTicks = d3.scale.linear().domain([linearMin, linearMax]).ticks(this._howManyTicks(linearMin, linearMax));
                var ticks = negativeLogTicks.concat(linearTicks).concat(positiveLogTicks);
                // If you only have 1 tick, you can't tell how big the scale is.
                if (ticks.length <= 1) {
                    ticks = d3.scale.linear().domain([min, max]).ticks(Scales.ModifiedLog._DEFAULT_NUM_TICKS);
                }
                return ticks;
            };
            /**
             * Return an appropriate number of ticks from lower to upper.
             *
             * This will first try to fit as many powers of this.base as it can from
             * lower to upper.
             *
             * If it still has ticks after that, it will generate ticks in "clusters",
             * e.g. [20, 30, ... 90, 100] would be a cluster, [200, 300, ... 900, 1000]
             * would be another cluster.
             *
             * This function will generate clusters as large as it can while not
             * drastically exceeding its number of ticks.
             */
            ModifiedLog.prototype._logTicks = function (lower, upper) {
                var _this = this;
                var nTicks = this._howManyTicks(lower, upper);
                if (nTicks === 0) {
                    return [];
                }
                var startLogged = Math.floor(Math.log(lower) / Math.log(this._base));
                var endLogged = Math.ceil(Math.log(upper) / Math.log(this._base));
                var bases = d3.range(endLogged, startLogged, -Math.ceil((endLogged - startLogged) / nTicks));
                var multiples = d3.range(this._base, 1, -(this._base - 1)).map(Math.floor);
                var uniqMultiples = Plottable.Utils.Array.uniq(multiples);
                var clusters = bases.map(function (b) { return uniqMultiples.map(function (x) { return Math.pow(_this._base, b - 1) * x; }); });
                var flattened = Plottable.Utils.Array.flatten(clusters);
                var filtered = flattened.filter(function (x) { return lower <= x && x <= upper; });
                var sorted = filtered.sort(function (x, y) { return x - y; });
                return sorted;
            };
            /**
             * How many ticks does the range [lower, upper] deserve?
             *
             * e.g. if your domain was [10, 1000] and I asked _howManyTicks(10, 100),
             * I would get 1/2 of the ticks. The range 10, 100 takes up 1/2 of the
             * distance when plotted.
             */
            ModifiedLog.prototype._howManyTicks = function (lower, upper) {
                var adjustedMin = this._adjustedLog(Plottable.Utils.Math.min(this._untransformedDomain, 0));
                var adjustedMax = this._adjustedLog(Plottable.Utils.Math.max(this._untransformedDomain, 0));
                var adjustedLower = this._adjustedLog(lower);
                var adjustedUpper = this._adjustedLog(upper);
                var proportion = (adjustedUpper - adjustedLower) / (adjustedMax - adjustedMin);
                var ticks = Math.ceil(proportion * Scales.ModifiedLog._DEFAULT_NUM_TICKS);
                return ticks;
            };
            ModifiedLog.prototype._niceDomain = function (domain, count) {
                return domain;
            };
            ModifiedLog.prototype._defaultExtent = function () {
                return [0, this._base];
            };
            ModifiedLog.prototype._expandSingleValueDomain = function (singleValueDomain) {
                if (singleValueDomain[0] === singleValueDomain[1]) {
                    var singleValue = singleValueDomain[0];
                    if (singleValue > 0) {
                        return [singleValue / this._base, singleValue * this._base];
                    }
                    else if (singleValue === 0) {
                        return [-this._base, this._base];
                    }
                    else {
                        return [singleValue * this._base, singleValue / this._base];
                    }
                }
                return singleValueDomain;
            };
            ModifiedLog.prototype._getRange = function () {
                return this._d3Scale.range();
            };
            ModifiedLog.prototype._setRange = function (values) {
                this._d3Scale.range(values);
            };
            ModifiedLog.prototype.defaultTicks = function () {
                return this._d3Scale.ticks(Scales.ModifiedLog._DEFAULT_NUM_TICKS);
            };
            return ModifiedLog;
        })(Plottable.QuantitativeScale);
        Scales.ModifiedLog = ModifiedLog;
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var Category = (function (_super) {
            __extends(Category, _super);
            /**
             * A Category Scale maps strings to numbers.
             *
             * @constructor
             */
            function Category() {
                _super.call(this);
                this._range = [0, 1];
                this._d3Scale = d3.scale.ordinal();
                var d3InnerPadding = 0.3;
                this._innerPadding = Category._convertToPlottableInnerPadding(d3InnerPadding);
                this._outerPadding = Category._convertToPlottableOuterPadding(0.5, d3InnerPadding);
            }
            Category.prototype.extentOfValues = function (values) {
                return Plottable.Utils.Array.uniq(values);
            };
            Category.prototype._getExtent = function () {
                return Plottable.Utils.Array.uniq(this._getAllIncludedValues());
            };
            Category.prototype.domain = function (values) {
                return _super.prototype.domain.call(this, values);
            };
            Category.prototype._setDomain = function (values) {
                _super.prototype._setDomain.call(this, values);
                this.range(this.range()); // update range
            };
            Category.prototype.range = function (values) {
                if (values == null) {
                    return this._range;
                }
                else {
                    this._range = values;
                    var d3InnerPadding = 1 - 1 / (1 + this.innerPadding());
                    var d3OuterPadding = this.outerPadding() / (1 + this.innerPadding());
                    this._d3Scale.rangeBands(values, d3InnerPadding, d3OuterPadding);
                    return this;
                }
            };
            Category._convertToPlottableInnerPadding = function (d3InnerPadding) {
                return 1 / (1 - d3InnerPadding) - 1;
            };
            Category._convertToPlottableOuterPadding = function (d3OuterPadding, d3InnerPadding) {
                return d3OuterPadding / (1 - d3InnerPadding);
            };
            /**
             * Returns the width of the range band.
             *
             * @returns {number} The range band width
             */
            Category.prototype.rangeBand = function () {
                return this._d3Scale.rangeBand();
            };
            /**
             * Returns the step width of the scale.
             *
             * The step width is the pixel distance between adjacent values in the domain.
             *
             * @returns {number}
             */
            Category.prototype.stepWidth = function () {
                return this.rangeBand() * (1 + this.innerPadding());
            };
            Category.prototype.innerPadding = function (innerPadding) {
                if (innerPadding == null) {
                    return this._innerPadding;
                }
                this._innerPadding = innerPadding;
                this.range(this.range());
                this._dispatchUpdate();
                return this;
            };
            Category.prototype.outerPadding = function (outerPadding) {
                if (outerPadding == null) {
                    return this._outerPadding;
                }
                this._outerPadding = outerPadding;
                this.range(this.range());
                this._dispatchUpdate();
                return this;
            };
            Category.prototype.scale = function (value) {
                // scale it to the middle
                return this._d3Scale(value) + this.rangeBand() / 2;
            };
            Category.prototype._getDomain = function () {
                return this._d3Scale.domain();
            };
            Category.prototype._setBackingScaleDomain = function (values) {
                this._d3Scale.domain(values);
            };
            Category.prototype._getRange = function () {
                return this._d3Scale.range();
            };
            Category.prototype._setRange = function (values) {
                this._d3Scale.range(values);
            };
            return Category;
        })(Plottable.Scale);
        Scales.Category = Category;
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var Color = (function (_super) {
            __extends(Color, _super);
            /**
             * A Color Scale maps string values to color hex values expressed as a string.
             *
             * @constructor
             * @param {string} [scaleType] One of "Category10"/"Category20"/"Category20b"/"Category20c".
             *   (see https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors)
             *   If not supplied, reads the colors defined using CSS -- see plottable.css.
             */
            function Color(scaleType) {
                _super.call(this);
                var scale;
                switch (scaleType) {
                    case null:
                    case undefined:
                        if (Color._plottableColorCache == null) {
                            Color._plottableColorCache = Color._getPlottableColors();
                        }
                        scale = d3.scale.ordinal().range(Color._plottableColorCache);
                        break;
                    case "Category10":
                    case "category10":
                    case "10":
                        scale = d3.scale.category10();
                        break;
                    case "Category20":
                    case "category20":
                    case "20":
                        scale = d3.scale.category20();
                        break;
                    case "Category20b":
                    case "category20b":
                    case "20b":
                        scale = d3.scale.category20b();
                        break;
                    case "Category20c":
                    case "category20c":
                    case "20c":
                        scale = d3.scale.category20c();
                        break;
                    default:
                        throw new Error("Unsupported ColorScale type");
                }
                this._d3Scale = scale;
            }
            Color.prototype.extentOfValues = function (values) {
                return Plottable.Utils.Array.uniq(values);
            };
            // Duplicated from OrdinalScale._getExtent - should be removed in #388
            Color.prototype._getExtent = function () {
                return Plottable.Utils.Array.uniq(this._getAllIncludedValues());
            };
            Color.invalidateColorCache = function () {
                Color._plottableColorCache = null;
            };
            Color._getPlottableColors = function () {
                var plottableDefaultColors = [];
                var colorTester = d3.select("body").append("plottable-color-tester");
                var defaultColorHex = Plottable.Utils.Color.colorTest(colorTester, "");
                var i = 0;
                var colorHex;
                while ((colorHex = Plottable.Utils.Color.colorTest(colorTester, "plottable-colors-" + i)) !== null &&
                    i < this._MAXIMUM_COLORS_FROM_CSS) {
                    if (colorHex === defaultColorHex && colorHex === plottableDefaultColors[plottableDefaultColors.length - 1]) {
                        break;
                    }
                    plottableDefaultColors.push(colorHex);
                    i++;
                }
                colorTester.remove();
                return plottableDefaultColors;
            };
            /**
             * Returns the color-string corresponding to a given string.
             * If there are not enough colors in the range(), a lightened version of an existing color will be used.
             *
             * @param {string} value
             * @returns {string}
             */
            Color.prototype.scale = function (value) {
                var color = this._d3Scale(value);
                var index = this.domain().indexOf(value);
                var numLooped = Math.floor(index / this.range().length);
                var modifyFactor = Math.log(numLooped * Color._LOOP_LIGHTEN_FACTOR + 1);
                return Plottable.Utils.Color.lightenColor(color, modifyFactor);
            };
            Color.prototype._getDomain = function () {
                return this._d3Scale.domain();
            };
            Color.prototype._setBackingScaleDomain = function (values) {
                this._d3Scale.domain(values);
            };
            Color.prototype._getRange = function () {
                return this._d3Scale.range();
            };
            Color.prototype._setRange = function (values) {
                this._d3Scale.range(values);
            };
            Color._LOOP_LIGHTEN_FACTOR = 1.6;
            // The maximum number of colors we are getting from CSS stylesheets
            Color._MAXIMUM_COLORS_FROM_CSS = 256;
            return Color;
        })(Plottable.Scale);
        Scales.Color = Color;
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var Time = (function (_super) {
            __extends(Time, _super);
            /**
             * A Time Scale maps Date objects to numbers.
             *
             * @constructor
             */
            function Time() {
                _super.call(this);
                this._d3Scale = d3.time.scale();
                this.autoDomain();
            }
            /**
             * Returns an array of ticks values separated by the specified interval.
             *
             * @param {string} interval A string specifying the interval unit.
             * @param {number?} [step] The number of multiples of the interval between consecutive ticks.
             * @return {Date[]}
             */
            Time.prototype.tickInterval = function (interval, step) {
                // temporarily creats a time scale from our linear scale into a time scale so we can get access to its api
                var tempScale = d3.time.scale();
                var d3Interval = Time.timeIntervalToD3Time(interval);
                tempScale.domain(this.domain());
                tempScale.range(this.range());
                return tempScale.ticks(d3Interval, step);
            };
            Time.prototype._setDomain = function (values) {
                if (values[1] < values[0]) {
                    throw new Error("Scale.Time domain values must be in chronological order");
                }
                return _super.prototype._setDomain.call(this, values);
            };
            Time.prototype._defaultExtent = function () {
                return [new Date("1970-01-01"), new Date("1970-01-02")];
            };
            Time.prototype._expandSingleValueDomain = function (singleValueDomain) {
                var startTime = singleValueDomain[0].getTime();
                var endTime = singleValueDomain[1].getTime();
                if (startTime === endTime) {
                    var startDate = new Date(startTime);
                    startDate.setDate(startDate.getDate() - 1);
                    var endDate = new Date(endTime);
                    endDate.setDate(endDate.getDate() + 1);
                    return [startDate, endDate];
                }
                return singleValueDomain;
            };
            Time.prototype.scale = function (value) {
                return this._d3Scale(value);
            };
            Time.prototype._getDomain = function () {
                return this._d3Scale.domain();
            };
            Time.prototype._setBackingScaleDomain = function (values) {
                this._d3Scale.domain(values);
            };
            Time.prototype._getRange = function () {
                return this._d3Scale.range();
            };
            Time.prototype._setRange = function (values) {
                this._d3Scale.range(values);
            };
            Time.prototype.invert = function (value) {
                return this._d3Scale.invert(value);
            };
            Time.prototype.defaultTicks = function () {
                return this._d3Scale.ticks(Scales.Time._DEFAULT_NUM_TICKS);
            };
            Time.prototype._niceDomain = function (domain) {
                return this._d3Scale.copy().domain(domain).nice().domain();
            };
            /**
             * Transforms the Plottable TimeInterval string into a d3 time interval equivalent.
             * If the provided TimeInterval is incorrect, the default is d3.time.year
             */
            Time.timeIntervalToD3Time = function (timeInterval) {
                switch (timeInterval) {
                    case Plottable.TimeInterval.second:
                        return d3.time.second;
                    case Plottable.TimeInterval.minute:
                        return d3.time.minute;
                    case Plottable.TimeInterval.hour:
                        return d3.time.hour;
                    case Plottable.TimeInterval.day:
                        return d3.time.day;
                    case Plottable.TimeInterval.week:
                        return d3.time.week;
                    case Plottable.TimeInterval.month:
                        return d3.time.month;
                    case Plottable.TimeInterval.year:
                        return d3.time.year;
                    default:
                        throw Error("TimeInterval specified does not exist: " + timeInterval);
                }
            };
            return Time;
        })(Plottable.QuantitativeScale);
        Scales.Time = Time;
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var InterpolatedColor = (function (_super) {
            __extends(InterpolatedColor, _super);
            /**
             * An InterpolatedColor Scale maps numbers to color hex values, expressed as strings.
             *
             * @param {string} [scaleType="linear"] One of "linear"/"log"/"sqrt"/"pow".
             */
            function InterpolatedColor(scaleType) {
                if (scaleType === void 0) { scaleType = "linear"; }
                _super.call(this);
                switch (scaleType) {
                    case "linear":
                        this._colorScale = d3.scale.linear();
                        break;
                    case "log":
                        this._colorScale = d3.scale.log();
                        break;
                    case "sqrt":
                        this._colorScale = d3.scale.sqrt();
                        break;
                    case "pow":
                        this._colorScale = d3.scale.pow();
                        break;
                }
                if (this._colorScale == null) {
                    throw new Error("unknown QuantitativeScale scale type " + scaleType);
                }
                this.range(InterpolatedColor.REDS);
            }
            InterpolatedColor.prototype.extentOfValues = function (values) {
                var extent = d3.extent(values);
                if (extent[0] == null || extent[1] == null) {
                    return [];
                }
                else {
                    return extent;
                }
            };
            /**
             * Generates the converted QuantitativeScale.
             */
            InterpolatedColor.prototype._d3InterpolatedScale = function () {
                return this._colorScale.range([0, 1]).interpolate(this._interpolateColors());
            };
            /**
             * Generates the d3 interpolator for colors.
             */
            InterpolatedColor.prototype._interpolateColors = function () {
                var colors = this._colorRange;
                if (colors.length < 2) {
                    throw new Error("Color scale arrays must have at least two elements.");
                }
                ;
                return function (a, b) {
                    return function (t) {
                        // Clamp t parameter to [0,1]
                        t = Math.max(0, Math.min(1, t));
                        // Determine indices for colors
                        var tScaled = t * (colors.length - 1);
                        var i0 = Math.floor(tScaled);
                        var i1 = Math.ceil(tScaled);
                        var frac = (tScaled - i0);
                        // Interpolate in the L*a*b color space
                        return d3.interpolateLab(colors[i0], colors[i1])(frac);
                    };
                };
            };
            InterpolatedColor.prototype._resetScale = function () {
                this._d3Scale = this._d3InterpolatedScale();
                this._autoDomainIfAutomaticMode();
                this._dispatchUpdate();
            };
            InterpolatedColor.prototype.autoDomain = function () {
                // InterpolatedColorScales do not pad
                var includedValues = this._getAllIncludedValues();
                if (includedValues.length > 0) {
                    this._setDomain([Plottable.Utils.Math.min(includedValues, 0), Plottable.Utils.Math.max(includedValues, 0)]);
                }
                return this;
            };
            InterpolatedColor.prototype.scale = function (value) {
                return this._d3Scale(value);
            };
            InterpolatedColor.prototype._getDomain = function () {
                return this._d3Scale.domain();
            };
            InterpolatedColor.prototype._setBackingScaleDomain = function (values) {
                this._d3Scale.domain(values);
            };
            InterpolatedColor.prototype._getRange = function () {
                return this._colorRange;
            };
            InterpolatedColor.prototype._setRange = function (range) {
                this._colorRange = range;
                this._resetScale();
            };
            InterpolatedColor.REDS = [
                "#FFFFFF",
                "#FFF6E1",
                "#FEF4C0",
                "#FED976",
                "#FEB24C",
                "#FD8D3C",
                "#FC4E2A",
                "#E31A1C",
                "#B10026" // red
            ];
            InterpolatedColor.BLUES = [
                "#FFFFFF",
                "#CCFFFF",
                "#A5FFFD",
                "#85F7FB",
                "#6ED3EF",
                "#55A7E0",
                "#417FD0",
                "#2545D3",
                "#0B02E1" // blue
            ];
            InterpolatedColor.POSNEG = [
                "#0B02E1",
                "#2545D3",
                "#417FD0",
                "#55A7E0",
                "#6ED3EF",
                "#85F7FB",
                "#A5FFFD",
                "#CCFFFF",
                "#FFFFFF",
                "#FFF6E1",
                "#FEF4C0",
                "#FED976",
                "#FEB24C",
                "#FD8D3C",
                "#FC4E2A",
                "#E31A1C",
                "#B10026" // red
            ];
            return InterpolatedColor;
        })(Plottable.Scale);
        Scales.InterpolatedColor = InterpolatedColor;
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Scales;
    (function (Scales) {
        var TickGenerators;
        (function (TickGenerators) {
            /**
             * Creates a TickGenerator using the specified interval.
             *
             * Generates ticks at multiples of the interval while also including the domain boundaries.
             *
             * @param {number} interval
             * @returns {TickGenerator}
             */
            function intervalTickGenerator(interval) {
                if (interval <= 0) {
                    throw new Error("interval must be positive number");
                }
                return function (s) {
                    var domain = s.domain();
                    var low = Math.min(domain[0], domain[1]);
                    var high = Math.max(domain[0], domain[1]);
                    var firstTick = Math.ceil(low / interval) * interval;
                    var numTicks = Math.floor((high - firstTick) / interval) + 1;
                    var lowTicks = low % interval === 0 ? [] : [low];
                    var middleTicks = Plottable.Utils.Math.range(0, numTicks).map(function (t) { return firstTick + t * interval; });
                    var highTicks = high % interval === 0 ? [] : [high];
                    return lowTicks.concat(middleTicks).concat(highTicks);
                };
            }
            TickGenerators.intervalTickGenerator = intervalTickGenerator;
            /**
             * Creates a TickGenerator returns only integer tick values.
             *
             * @returns {TickGenerator}
             */
            function integerTickGenerator() {
                return function (s) {
                    var defaultTicks = s.defaultTicks();
                    return defaultTicks.filter(function (tick, i) { return (tick % 1 === 0) || (i === 0) || (i === defaultTicks.length - 1); });
                };
            }
            TickGenerators.integerTickGenerator = integerTickGenerator;
        })(TickGenerators = Scales.TickGenerators || (Scales.TickGenerators = {}));
    })(Scales = Plottable.Scales || (Plottable.Scales = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawer = (function () {
        /**
         * A Drawer draws svg elements based on the input Dataset.
         *
         * @constructor
         * @param {Dataset} dataset The dataset associated with this Drawer
         */
        function Drawer(dataset) {
            this._cachedSelectionValid = false;
            this._dataset = dataset;
        }
        Drawer.prototype.renderArea = function (area) {
            if (area == null) {
                return this._renderArea;
            }
            this._renderArea = area;
            this._cachedSelectionValid = false;
            return this;
        };
        /**
         * Removes the Drawer and its renderArea
         */
        Drawer.prototype.remove = function () {
            if (this.renderArea() != null) {
                this.renderArea().remove();
            }
        };
        /**
         * Binds data to selection
         *
         * @param{any[]} data The data to be drawn
         */
        Drawer.prototype._bindSelectionData = function (data) {
            var dataElements = this.selection().data(data);
            dataElements.enter().append(this._svgElementName);
            dataElements.exit().remove();
            this._applyDefaultAttributes(dataElements);
        };
        Drawer.prototype._applyDefaultAttributes = function (selection) {
            if (this._className != null) {
                selection.classed(this._className, true);
            }
        };
        /**
         * Draws data using one step
         *
         * @param{AppliedDrawStep} step The step, how data should be drawn.
         */
        Drawer.prototype._drawStep = function (step) {
            var selection = this.selection();
            var colorAttributes = ["fill", "stroke"];
            colorAttributes.forEach(function (colorAttribute) {
                if (step.attrToAppliedProjector[colorAttribute] != null) {
                    selection.attr(colorAttribute, step.attrToAppliedProjector[colorAttribute]);
                }
            });
            step.animator.animate(selection, step.attrToAppliedProjector);
            if (this._className != null) {
                this.selection().classed(this._className, true);
            }
        };
        Drawer.prototype._appliedProjectors = function (attrToProjector) {
            var _this = this;
            var modifiedAttrToProjector = {};
            Object.keys(attrToProjector).forEach(function (attr) {
                modifiedAttrToProjector[attr] =
                    function (datum, index) { return attrToProjector[attr](datum, index, _this._dataset); };
            });
            return modifiedAttrToProjector;
        };
        /**
         * Calculates the total time it takes to use the input drawSteps to draw the input data
         *
         * @param {any[]} data The data that would have been drawn
         * @param {Drawers.DrawStep[]} drawSteps The DrawSteps to use
         * @returns {number} The total time it takes to draw
         */
        Drawer.prototype.totalDrawTime = function (data, drawSteps) {
            var delay = 0;
            drawSteps.forEach(function (drawStep, i) {
                delay += drawStep.animator.totalTime(data.length);
            });
            return delay;
        };
        /**
         * Draws the data into the renderArea using the spefic steps and metadata
         *
         * @param{any[]} data The data to be drawn
         * @param{DrawStep[]} drawSteps The list of steps, which needs to be drawn
         */
        Drawer.prototype.draw = function (data, drawSteps) {
            var _this = this;
            var appliedDrawSteps = drawSteps.map(function (dr) {
                var attrToAppliedProjector = _this._appliedProjectors(dr.attrToProjector);
                return {
                    attrToAppliedProjector: attrToAppliedProjector,
                    animator: dr.animator
                };
            });
            this._bindSelectionData(data);
            this._cachedSelectionValid = false;
            var delay = 0;
            appliedDrawSteps.forEach(function (drawStep, i) {
                Plottable.Utils.Window.setTimeout(function () { return _this._drawStep(drawStep); }, delay);
                delay += drawStep.animator.totalTime(data.length);
            });
            return this;
        };
        Drawer.prototype.selection = function () {
            if (!this._cachedSelectionValid) {
                this._cachedSelection = this.renderArea().selectAll(this.selector());
                this._cachedSelectionValid = true;
            }
            return this._cachedSelection;
        };
        /**
         * Returns the CSS selector for this Drawer's visual elements.
         */
        Drawer.prototype.selector = function () {
            return this._svgElementName;
        };
        /**
         * Returns the D3 selection corresponding to the datum with the specified index.
         */
        Drawer.prototype.selectionForIndex = function (index) {
            return d3.select(this.selection()[0][index]);
        };
        return Drawer;
    })();
    Plottable.Drawer = Drawer;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line(dataset) {
                _super.call(this, dataset);
                this._className = "line";
                this._svgElementName = "path";
            }
            Line.prototype._applyDefaultAttributes = function (selection) {
                _super.prototype._applyDefaultAttributes.call(this, selection);
                selection.style("fill", "none");
            };
            Line.prototype.selectionForIndex = function (index) {
                return d3.select(this.selection()[0][0]);
            };
            return Line;
        })(Plottable.Drawer);
        Drawers.Line = Line;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var Area = (function (_super) {
            __extends(Area, _super);
            function Area(dataset) {
                _super.call(this, dataset);
                this._className = "area";
                this._svgElementName = "path";
            }
            Area.prototype._applyDefaultAttributes = function (selection) {
                _super.prototype._applyDefaultAttributes.call(this, selection);
                selection.style("stroke", "none");
            };
            Area.prototype.selectionForIndex = function (index) {
                return d3.select(this.selection()[0][0]);
            };
            return Area;
        })(Plottable.Drawer);
        Drawers.Area = Area;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(dataset) {
                _super.call(this, dataset);
                this._svgElementName = "rect";
            }
            return Rectangle;
        })(Plottable.Drawer);
        Drawers.Rectangle = Rectangle;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var Arc = (function (_super) {
            __extends(Arc, _super);
            function Arc(dataset) {
                _super.call(this, dataset);
                this._className = "arc fill";
                this._svgElementName = "path";
            }
            Arc.prototype._applyDefaultAttributes = function (selection) {
                _super.prototype._applyDefaultAttributes.call(this, selection);
                selection.style("stroke", "none");
            };
            return Arc;
        })(Plottable.Drawer);
        Drawers.Arc = Arc;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var ArcOutline = (function (_super) {
            __extends(ArcOutline, _super);
            function ArcOutline(dataset) {
                _super.call(this, dataset);
                this._className = "arc outline";
                this._svgElementName = "path";
            }
            ArcOutline.prototype._applyDefaultAttributes = function (selection) {
                _super.prototype._applyDefaultAttributes.call(this, selection);
                selection.style("fill", "none");
            };
            return ArcOutline;
        })(Plottable.Drawer);
        Drawers.ArcOutline = ArcOutline;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var Symbol = (function (_super) {
            __extends(Symbol, _super);
            function Symbol(dataset) {
                _super.call(this, dataset);
                this._svgElementName = "path";
                this._className = "symbol";
            }
            return Symbol;
        })(Plottable.Drawer);
        Drawers.Symbol = Symbol;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Drawers;
    (function (Drawers) {
        var Segment = (function (_super) {
            __extends(Segment, _super);
            function Segment(dataset) {
                _super.call(this, dataset);
                this._svgElementName = "line";
            }
            return Segment;
        })(Plottable.Drawer);
        Drawers.Segment = Segment;
    })(Drawers = Plottable.Drawers || (Plottable.Drawers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var Alignment = (function () {
            function Alignment() {
            }
            Alignment.TOP = "top";
            Alignment.BOTTOM = "bottom";
            Alignment.LEFT = "left";
            Alignment.RIGHT = "right";
            Alignment.CENTER = "center";
            return Alignment;
        })();
        Components.Alignment = Alignment;
    })(Components = Plottable.Components || (Plottable.Components = {}));
    var Component = (function () {
        function Component() {
            this._clipPathEnabled = false;
            this._origin = { x: 0, y: 0 }; // Origin of the coordinate space for the Component.
            this._xAlignment = "left";
            this._yAlignment = "top";
            this._isSetup = false;
            this._isAnchored = false;
            this._boxes = [];
            this._isTopLevelComponent = false;
            this._cssClasses = new Plottable.Utils.Set();
            this._destroyed = false;
            this._onAnchorCallbacks = new Plottable.Utils.CallbackSet();
            this._onDetachCallbacks = new Plottable.Utils.CallbackSet();
            this._cssClasses.add("component");
        }
        /**
         * Attaches the Component as a child of a given d3 Selection.
         *
         * @param {d3.Selection} selection.
         * @returns {Component} The calling Component.
         */
        Component.prototype.anchor = function (selection) {
            if (this._destroyed) {
                throw new Error("Can't reuse destroy()-ed Components!");
            }
            if (selection.node().nodeName.toLowerCase() === "svg") {
                // svg node gets the "plottable" CSS class
                this._rootSVG = selection;
                this._rootSVG.classed("plottable", true);
                // visible overflow for firefox https://stackoverflow.com/questions/5926986/why-does-firefox-appear-to-truncate-embedded-svgs
                this._rootSVG.style("overflow", "visible");
                this._isTopLevelComponent = true;
            }
            if (this._element != null) {
                // reattach existing element
                selection.node().appendChild(this._element.node());
            }
            else {
                this._element = selection.append("g");
                this._setup();
            }
            this._isAnchored = true;
            this._onAnchorCallbacks.callCallbacks(this);
            return this;
        };
        /**
         * Adds a callback to be called on anchoring the Component to the DOM.
         * If the Component is already anchored, the callback is called immediately.
         *
         * @param {ComponentCallback} callback
         * @return {Component}
         */
        Component.prototype.onAnchor = function (callback) {
            if (this._isAnchored) {
                callback(this);
            }
            this._onAnchorCallbacks.add(callback);
            return this;
        };
        /**
         * Removes a callback that would be called on anchoring the Component to the DOM.
         * The callback is identified by reference equality.
         *
         * @param {ComponentCallback} callback
         * @return {Component}
         */
        Component.prototype.offAnchor = function (callback) {
            this._onAnchorCallbacks.delete(callback);
            return this;
        };
        /**
         * Creates additional elements as necessary for the Component to function.
         * Called during anchor() if the Component's element has not been created yet.
         * Override in subclasses to provide additional functionality.
         */
        Component.prototype._setup = function () {
            var _this = this;
            if (this._isSetup) {
                return;
            }
            this._cssClasses.forEach(function (cssClass) {
                _this._element.classed(cssClass, true);
            });
            this._cssClasses = new Plottable.Utils.Set();
            this._backgroundContainer = this._element.append("g").classed("background-container", true);
            this._addBox("background-fill", this._backgroundContainer);
            this._content = this._element.append("g").classed("content", true);
            this._foregroundContainer = this._element.append("g").classed("foreground-container", true);
            this._boxContainer = this._element.append("g").classed("box-container", true);
            if (this._clipPathEnabled) {
                this._generateClipPath();
            }
            ;
            this._boundingBox = this._addBox("bounding-box");
            this._isSetup = true;
        };
        /**
         * Given available space in pixels, returns the minimum width and height this Component will need.
         *
         * @param {number} availableWidth
         * @param {number} availableHeight
         * @returns {SpaceRequest}
         */
        Component.prototype.requestedSpace = function (availableWidth, availableHeight) {
            return {
                minWidth: 0,
                minHeight: 0
            };
        };
        /**
         * Computes and sets the size, position, and alignment of the Component from the specified values.
         * If no parameters are supplied and the Component is a root node,
         * they are inferred from the size of the Component's element.
         *
         * @param {Point} [origin] Origin of the space offered to the Component.
         * @param {number} [availableWidth] Available width in pixels.
         * @param {number} [availableHeight] Available height in pixels.
         * @returns {Component} The calling Component.
         */
        Component.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
            var _this = this;
            if (origin == null || availableWidth == null || availableHeight == null) {
                if (this._element == null) {
                    throw new Error("anchor() must be called before computeLayout()");
                }
                else if (this._isTopLevelComponent) {
                    // we are the root node, retrieve height/width from root SVG
                    origin = { x: 0, y: 0 };
                    // Set width/height to 100% if not specified, to allow accurate size calculation
                    // see http://www.w3.org/TR/CSS21/visudet.html#block-replaced-width
                    // and http://www.w3.org/TR/CSS21/visudet.html#inline-replaced-height
                    if (this._rootSVG.attr("width") == null) {
                        this._rootSVG.attr("width", "100%");
                    }
                    if (this._rootSVG.attr("height") == null) {
                        this._rootSVG.attr("height", "100%");
                    }
                    var elem = this._rootSVG.node();
                    availableWidth = Plottable.Utils.DOM.elementWidth(elem);
                    availableHeight = Plottable.Utils.DOM.elementHeight(elem);
                }
                else {
                    throw new Error("null arguments cannot be passed to computeLayout() on a non-root node");
                }
            }
            var size = this._sizeFromOffer(availableWidth, availableHeight);
            this._width = size.width;
            this._height = size.height;
            var xAlignProportion = Component._xAlignToProportion[this._xAlignment];
            var yAlignProportion = Component._yAlignToProportion[this._yAlignment];
            this._origin = {
                x: origin.x + (availableWidth - this.width()) * xAlignProportion,
                y: origin.y + (availableHeight - this.height()) * yAlignProportion
            };
            this._element.attr("transform", "translate(" + this._origin.x + "," + this._origin.y + ")");
            this._boxes.forEach(function (b) { return b.attr("width", _this.width()).attr("height", _this.height()); });
            return this;
        };
        Component.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
            var requestedSpace = this.requestedSpace(availableWidth, availableHeight);
            return {
                width: this.fixedWidth() ? Math.min(availableWidth, requestedSpace.minWidth) : availableWidth,
                height: this.fixedHeight() ? Math.min(availableHeight, requestedSpace.minHeight) : availableHeight
            };
        };
        /**
         * Queues the Component for rendering.
         *
         * @returns {Component} The calling Component.
         */
        Component.prototype.render = function () {
            if (this._isAnchored && this._isSetup && this.width() >= 0 && this.height() >= 0) {
                Plottable.RenderController.registerToRender(this);
            }
            return this;
        };
        Component.prototype._scheduleComputeLayout = function () {
            if (this._isAnchored && this._isSetup) {
                Plottable.RenderController.registerToComputeLayout(this);
            }
        };
        /**
         * Renders the Component without waiting for the next frame.
         */
        Component.prototype.renderImmediately = function () {
            if (this._clipPathEnabled) {
                this._updateClipPath();
            }
            return this;
        };
        /**
         * Causes the Component to re-layout and render.
         *
         * This function should be called when a CSS change has occured that could
         * influence the layout of the Component, such as changing the font size.
         *
         * @returns {Component} The calling Component.
         */
        Component.prototype.redraw = function () {
            if (this._isAnchored && this._isSetup) {
                if (this._isTopLevelComponent) {
                    this._scheduleComputeLayout();
                }
                else {
                    this.parent().redraw();
                }
            }
            return this;
        };
        /**
         * Renders the Component to a given <svg>.
         *
         * @param {String|d3.Selection} element A selector-string for the <svg>, or a d3 selection containing an <svg>.
         * @returns {Component} The calling Component.
         */
        Component.prototype.renderTo = function (element) {
            this.detach();
            if (element != null) {
                var selection;
                if (typeof (element) === "string") {
                    selection = d3.select(element);
                }
                else if (element instanceof Element) {
                    selection = d3.select(element);
                }
                else {
                    selection = element;
                }
                if (!selection.node() || selection.node().nodeName.toLowerCase() !== "svg") {
                    throw new Error("Plottable requires a valid SVG to renderTo");
                }
                this.anchor(selection);
            }
            if (this._element == null) {
                throw new Error("If a Component has never been rendered before, then renderTo must be given a node to render to, " +
                    "or a d3.Selection, or a selector string");
            }
            this.computeLayout();
            this.render();
            // flush so that consumers can immediately attach to stuff we create in the DOM
            Plottable.RenderController.flush();
            return this;
        };
        Component.prototype.xAlignment = function (xAlignment) {
            if (xAlignment == null) {
                return this._xAlignment;
            }
            xAlignment = xAlignment.toLowerCase();
            if (Component._xAlignToProportion[xAlignment] == null) {
                throw new Error("Unsupported alignment: " + xAlignment);
            }
            this._xAlignment = xAlignment;
            this.redraw();
            return this;
        };
        Component.prototype.yAlignment = function (yAlignment) {
            if (yAlignment == null) {
                return this._yAlignment;
            }
            yAlignment = yAlignment.toLowerCase();
            if (Component._yAlignToProportion[yAlignment] == null) {
                throw new Error("Unsupported alignment: " + yAlignment);
            }
            this._yAlignment = yAlignment;
            this.redraw();
            return this;
        };
        Component.prototype._addBox = function (className, parentElement) {
            if (this._element == null) {
                throw new Error("Adding boxes before anchoring is currently disallowed");
            }
            parentElement = parentElement == null ? this._boxContainer : parentElement;
            var box = parentElement.append("rect");
            if (className != null) {
                box.classed(className, true);
            }
            this._boxes.push(box);
            if (this.width() != null && this.height() != null) {
                box.attr("width", this.width()).attr("height", this.height());
            }
            return box;
        };
        Component.prototype._generateClipPath = function () {
            // The clip path will prevent content from overflowing its Component space.
            this._clipPathID = Plottable.Utils.DOM.generateUniqueClipPathId();
            var clipPathParent = this._boxContainer.append("clipPath").attr("id", this._clipPathID);
            this._addBox("clip-rect", clipPathParent);
            this._updateClipPath();
        };
        Component.prototype._updateClipPath = function () {
            // HACKHACK: IE <= 9 does not respect the HTML base element in SVG.
            // They don't need the current URL in the clip path reference.
            var prefix = /MSIE [5-9]/.test(navigator.userAgent) ? "" : document.location.href;
            prefix = prefix.split("#")[0]; // To fix cases where an anchor tag was used
            this._element.attr("clip-path", "url(\"" + prefix + "#" + this._clipPathID + "\")");
        };
        /**
         * Checks if the Component has a given CSS class.
         *
         * @param {string} cssClass The CSS class to check for.
         */
        Component.prototype.hasClass = function (cssClass) {
            if (cssClass == null) {
                return false;
            }
            if (this._element == null) {
                return this._cssClasses.has(cssClass);
            }
            else {
                return this._element.classed(cssClass);
            }
        };
        /**
         * Adds a given CSS class to the Component.
         *
         * @param {string} cssClass The CSS class to add.
         * @returns {Component} The calling Component.
         */
        Component.prototype.addClass = function (cssClass) {
            if (cssClass == null) {
                return this;
            }
            if (this._element == null) {
                this._cssClasses.add(cssClass);
            }
            else {
                this._element.classed(cssClass, true);
            }
            return this;
        };
        /**
         * Removes a given CSS class from the Component.
         *
         * @param {string} cssClass The CSS class to remove.
         * @returns {Component} The calling Component.
         */
        Component.prototype.removeClass = function (cssClass) {
            if (cssClass == null) {
                return this;
            }
            if (this._element == null) {
                this._cssClasses.delete(cssClass);
            }
            else {
                this._element.classed(cssClass, false);
            }
            return this;
        };
        /**
         * Checks if the Component has a fixed width or if it grows to fill available space.
         * Returns false by default on the base Component class.
         */
        Component.prototype.fixedWidth = function () {
            return false;
        };
        /**
         * Checks if the Component has a fixed height or if it grows to fill available space.
         * Returns false by default on the base Component class.
         */
        Component.prototype.fixedHeight = function () {
            return false;
        };
        /**
         * Detaches a Component from the DOM. The Component can be reused.
         *
         * This should only be used if you plan on reusing the calling Component. Otherwise, use destroy().
         *
         * @returns The calling Component.
         */
        Component.prototype.detach = function () {
            this.parent(null);
            if (this._isAnchored) {
                this._element.remove();
            }
            this._isAnchored = false;
            this._onDetachCallbacks.callCallbacks(this);
            return this;
        };
        /**
         * Adds a callback to be called when the Component is detach()-ed.
         *
         * @param {ComponentCallback} callback
         * @return {Component} The calling Component.
         */
        Component.prototype.onDetach = function (callback) {
            this._onDetachCallbacks.add(callback);
            return this;
        };
        /**
         * Removes a callback to be called when the Component is detach()-ed.
         * The callback is identified by reference equality.
         *
         * @param {ComponentCallback} callback
         * @return {Component} The calling Component.
         */
        Component.prototype.offDetach = function (callback) {
            this._onDetachCallbacks.delete(callback);
            return this;
        };
        Component.prototype.parent = function (parent) {
            if (parent === undefined) {
                return this._parent;
            }
            if (parent !== null && !parent.has(this)) {
                throw new Error("Passed invalid parent");
            }
            this._parent = parent;
            return this;
        };
        /**
         * Removes a Component from the DOM and disconnects all listeners.
         */
        Component.prototype.destroy = function () {
            this._destroyed = true;
            this.detach();
        };
        /**
         * Gets the width of the Component in pixels.
         */
        Component.prototype.width = function () {
            return this._width;
        };
        /**
         * Gets the height of the Component in pixels.
         */
        Component.prototype.height = function () {
            return this._height;
        };
        /**
         * Gets the origin of the Component relative to its parent.
         *
         * @return {Point}
         */
        Component.prototype.origin = function () {
            return {
                x: this._origin.x,
                y: this._origin.y
            };
        };
        /**
         * Gets the origin of the Component relative to the root <svg>.
         *
         * @return {Point}
         */
        Component.prototype.originToSVG = function () {
            var origin = this.origin();
            var ancestor = this.parent();
            while (ancestor != null) {
                var ancestorOrigin = ancestor.origin();
                origin.x += ancestorOrigin.x;
                origin.y += ancestorOrigin.y;
                ancestor = ancestor.parent();
            }
            return origin;
        };
        /**
         * Gets the Selection containing the <g> in front of the visual elements of the Component.
         *
         * Will return undefined if the Component has not been anchored.
         *
         * @return {d3.Selection}
         */
        Component.prototype.foreground = function () {
            return this._foregroundContainer;
        };
        /**
         * Gets a Selection containing a <g> that holds the visual elements of the Component.
         *
         * Will return undefined if the Component has not been anchored.
         *
         * @return {d3.Selection} content selection for the Component
         */
        Component.prototype.content = function () {
            return this._content;
        };
        /**
         * Gets the Selection containing the <g> behind the visual elements of the Component.
         *
         * Will return undefined if the Component has not been anchored.
         *
         * @return {d3.Selection} background selection for the Component
         */
        Component.prototype.background = function () {
            return this._backgroundContainer;
        };
        Component._xAlignToProportion = {
            "left": 0,
            "center": 0.5,
            "right": 1
        };
        Component._yAlignToProportion = {
            "top": 0,
            "center": 0.5,
            "bottom": 1
        };
        return Component;
    })();
    Plottable.Component = Component;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    /*
     * ComponentContainer class encapsulates Table and ComponentGroup's shared functionality.
     * It will not do anything if instantiated directly.
     */
    var ComponentContainer = (function (_super) {
        __extends(ComponentContainer, _super);
        function ComponentContainer() {
            var _this = this;
            _super.call(this);
            this._detachCallback = function (component) { return _this.remove(component); };
        }
        ComponentContainer.prototype.anchor = function (selection) {
            var _this = this;
            _super.prototype.anchor.call(this, selection);
            this._forEach(function (c) { return c.anchor(_this.content()); });
            return this;
        };
        ComponentContainer.prototype.render = function () {
            this._forEach(function (c) { return c.render(); });
            return this;
        };
        /**
         * Checks whether the specified Component is in the ComponentContainer.
         */
        ComponentContainer.prototype.has = function (component) {
            throw new Error("has() is not implemented on ComponentContainer");
        };
        ComponentContainer.prototype._adoptAndAnchor = function (component) {
            component.parent(this);
            component.onDetach(this._detachCallback);
            if (this._isAnchored) {
                component.anchor(this.content());
            }
        };
        /**
         * Removes the specified Component from the ComponentContainer.
         */
        ComponentContainer.prototype.remove = function (component) {
            if (this.has(component)) {
                component.offDetach(this._detachCallback);
                this._remove(component);
                component.detach();
                this.redraw();
            }
            return this;
        };
        /**
         * Carry out the actual removal of a Component.
         * Implementation dependent on the type of container.
         *
         * @return {boolean} true if the Component was successfully removed, false otherwise.
         */
        ComponentContainer.prototype._remove = function (component) {
            return false;
        };
        /**
         * Invokes a callback on each Component in the ComponentContainer.
         */
        ComponentContainer.prototype._forEach = function (callback) {
            throw new Error("_forEach() is not implemented on ComponentContainer");
        };
        /**
         * Destroys the ComponentContainer and all Components within it.
         */
        ComponentContainer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._forEach(function (c) { return c.destroy(); });
        };
        return ComponentContainer;
    })(Plottable.Component);
    Plottable.ComponentContainer = ComponentContainer;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var Group = (function (_super) {
            __extends(Group, _super);
            /**
             * Constructs a Group.
             *
             * A Group contains Components that will be rendered on top of each other.
             * Components added later will be rendered above Components already in the Group.
             *
             * @constructor
             * @param {Component[]} [components=[]] Components to be added to the Group.
             */
            function Group(components) {
                var _this = this;
                if (components === void 0) { components = []; }
                _super.call(this);
                this._components = [];
                this.addClass("component-group");
                components.forEach(function (c) { return _this.append(c); });
            }
            Group.prototype._forEach = function (callback) {
                this.components().forEach(callback);
            };
            /**
             * Checks whether the specified Component is in the Group.
             */
            Group.prototype.has = function (component) {
                return this._components.indexOf(component) >= 0;
            };
            Group.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
                var requests = this._components.map(function (c) { return c.requestedSpace(offeredWidth, offeredHeight); });
                return {
                    minWidth: Plottable.Utils.Math.max(requests, function (request) { return request.minWidth; }, 0),
                    minHeight: Plottable.Utils.Math.max(requests, function (request) { return request.minHeight; }, 0)
                };
            };
            Group.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                var _this = this;
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                this._forEach(function (component) {
                    component.computeLayout({ x: 0, y: 0 }, _this.width(), _this.height());
                });
                return this;
            };
            Group.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
                return {
                    width: availableWidth,
                    height: availableHeight
                };
            };
            Group.prototype.fixedWidth = function () {
                return this._components.every(function (c) { return c.fixedWidth(); });
            };
            Group.prototype.fixedHeight = function () {
                return this._components.every(function (c) { return c.fixedHeight(); });
            };
            /**
             * @return {Component[]} The Components in this Group.
             */
            Group.prototype.components = function () {
                return this._components.slice();
            };
            /**
             * Adds a Component to this Group.
             * The added Component will be rendered above Components already in the Group.
             */
            Group.prototype.append = function (component) {
                if (component != null && !this.has(component)) {
                    component.detach();
                    this._components.push(component);
                    this._adoptAndAnchor(component);
                    this.redraw();
                }
                return this;
            };
            Group.prototype._remove = function (component) {
                var removeIndex = this._components.indexOf(component);
                if (removeIndex >= 0) {
                    this._components.splice(removeIndex, 1);
                    return true;
                }
                return false;
            };
            return Group;
        })(Plottable.ComponentContainer);
        Components.Group = Group;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Axis = (function (_super) {
        __extends(Axis, _super);
        /**
         * Constructs an Axis.
         * An Axis is a visual representation of a Scale.
         *
         * @constructor
         * @param {Scale} scale
         * @param {string} orientation One of "top"/"bottom"/"left"/"right".
         */
        function Axis(scale, orientation) {
            var _this = this;
            _super.call(this);
            this._endTickLength = 5;
            this._innerTickLength = 5;
            this._tickLabelPadding = 10;
            this._margin = 15;
            this._showEndTickLabels = false;
            this._annotationsEnabled = false;
            this._annotationTierCount = 1;
            if (scale == null || orientation == null) {
                throw new Error("Axis requires a scale and orientation");
            }
            this._scale = scale;
            this.orientation(orientation);
            this._setDefaultAlignment();
            this.addClass("axis");
            if (this._isHorizontal()) {
                this.addClass("x-axis");
            }
            else {
                this.addClass("y-axis");
            }
            this.formatter(Plottable.Formatters.identity());
            this._rescaleCallback = function (scale) { return _this._rescale(); };
            this._scale.onUpdate(this._rescaleCallback);
            this._annotatedTicks = [];
            this._annotationFormatter = Plottable.Formatters.identity();
        }
        Axis.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._scale.offUpdate(this._rescaleCallback);
        };
        Axis.prototype._isHorizontal = function () {
            return this._orientation === "top" || this._orientation === "bottom";
        };
        Axis.prototype._computeWidth = function () {
            // to be overridden by subclass logic
            this._computedWidth = this._maxLabelTickLength();
            return this._computedWidth;
        };
        Axis.prototype._computeHeight = function () {
            // to be overridden by subclass logic
            this._computedHeight = this._maxLabelTickLength();
            return this._computedHeight;
        };
        Axis.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
            var requestedWidth = 0;
            var requestedHeight = 0;
            if (this._isHorizontal()) {
                requestedHeight = this._computeHeight() + this._margin;
                if (this.annotationsEnabled()) {
                    var tierHeight = this._annotationMeasurer.measure().height + 2 * Axis._ANNOTATION_LABEL_PADDING;
                    requestedHeight += tierHeight * this.annotationTierCount();
                }
            }
            else {
                requestedWidth = this._computeWidth() + this._margin;
                if (this.annotationsEnabled()) {
                    var tierHeight = this._annotationMeasurer.measure().height + 2 * Axis._ANNOTATION_LABEL_PADDING;
                    requestedWidth += tierHeight * this.annotationTierCount();
                }
            }
            return {
                minWidth: requestedWidth,
                minHeight: requestedHeight
            };
        };
        Axis.prototype.fixedHeight = function () {
            return this._isHorizontal();
        };
        Axis.prototype.fixedWidth = function () {
            return !this._isHorizontal();
        };
        Axis.prototype._rescale = function () {
            // default implementation; subclasses may call redraw() here
            this.render();
        };
        Axis.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
            _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
            if (this._isHorizontal()) {
                this._scale.range([0, this.width()]);
            }
            else {
                this._scale.range([this.height(), 0]);
            }
            return this;
        };
        Axis.prototype._setup = function () {
            _super.prototype._setup.call(this);
            this._tickMarkContainer = this.content().append("g")
                .classed(Axis.TICK_MARK_CLASS + "-container", true);
            this._tickLabelContainer = this.content().append("g")
                .classed(Axis.TICK_LABEL_CLASS + "-container", true);
            this._baseline = this.content().append("line").classed("baseline", true);
            this._annotationContainer = this.content().append("g")
                .classed("annotation-container", true);
            this._annotationContainer.append("g").classed("annotation-line-container", true);
            this._annotationContainer.append("g").classed("annotation-circle-container", true);
            this._annotationContainer.append("g").classed("annotation-rect-container", true);
            var annotationLabelContainer = this._annotationContainer.append("g").classed("annotation-label-container", true);
            this._annotationMeasurer = new SVGTypewriter.Measurers.Measurer(annotationLabelContainer);
            this._annotationWriter = new SVGTypewriter.Writers.Writer(this._annotationMeasurer);
        };
        /*
         * Function for generating tick values in data-space (as opposed to pixel values).
         * To be implemented by subclasses.
         */
        Axis.prototype._getTickValues = function () {
            return [];
        };
        Axis.prototype.renderImmediately = function () {
            var tickMarkValues = this._getTickValues();
            var tickMarks = this._tickMarkContainer.selectAll("." + Axis.TICK_MARK_CLASS).data(tickMarkValues);
            tickMarks.enter().append("line").classed(Axis.TICK_MARK_CLASS, true);
            tickMarks.attr(this._generateTickMarkAttrHash());
            d3.select(tickMarks[0][0]).classed(Axis.END_TICK_MARK_CLASS, true)
                .attr(this._generateTickMarkAttrHash(true));
            d3.select(tickMarks[0][tickMarkValues.length - 1]).classed(Axis.END_TICK_MARK_CLASS, true)
                .attr(this._generateTickMarkAttrHash(true));
            tickMarks.exit().remove();
            this._baseline.attr(this._generateBaselineAttrHash());
            if (this.annotationsEnabled()) {
                this._drawAnnotations();
            }
            else {
                this._removeAnnotations();
            }
            return this;
        };
        Axis.prototype.annotatedTicks = function (annotatedTicks) {
            if (annotatedTicks == null) {
                return this._annotatedTicks;
            }
            this._annotatedTicks = annotatedTicks;
            this.render();
            return this;
        };
        Axis.prototype.annotationFormatter = function (annotationFormatter) {
            if (annotationFormatter == null) {
                return this._annotationFormatter;
            }
            this._annotationFormatter = annotationFormatter;
            this.render();
            return this;
        };
        Axis.prototype.annotationsEnabled = function (annotationsEnabled) {
            if (annotationsEnabled == null) {
                return this._annotationsEnabled;
            }
            this._annotationsEnabled = annotationsEnabled;
            this.redraw();
            return this;
        };
        Axis.prototype.annotationTierCount = function (annotationTierCount) {
            if (annotationTierCount == null) {
                return this._annotationTierCount;
            }
            if (annotationTierCount < 0) {
                throw new Error("annotationTierCount cannot be negative");
            }
            this._annotationTierCount = annotationTierCount;
            this.redraw();
            return this;
        };
        Axis.prototype._drawAnnotations = function () {
            var _this = this;
            var labelPadding = Axis._ANNOTATION_LABEL_PADDING;
            var measurements = new Plottable.Utils.Map();
            var annotatedTicks = this._annotatedTicksToRender();
            annotatedTicks.forEach(function (annotatedTick) {
                var measurement = _this._annotationMeasurer.measure(_this.annotationFormatter()(annotatedTick));
                var paddedMeasurement = { width: measurement.width + 2 * labelPadding, height: measurement.height + 2 * labelPadding };
                measurements.set(annotatedTick, paddedMeasurement);
            });
            var tierHeight = this._annotationMeasurer.measure().height + 2 * labelPadding;
            var annotationToTier = this._annotationToTier(measurements);
            var hiddenAnnotations = new Plottable.Utils.Set();
            var axisHeight = this._isHorizontal() ? this.height() : this.width();
            var axisHeightWithoutMarginAndAnnotations = this._coreSize();
            var numTiers = Math.min(this.annotationTierCount(), Math.floor((axisHeight - axisHeightWithoutMarginAndAnnotations) / tierHeight));
            annotationToTier.forEach(function (tier, annotation) {
                if (tier === -1 || tier >= numTiers) {
                    hiddenAnnotations.add(annotation);
                }
            });
            var bindElements = function (selection, elementName, className) {
                var elements = selection.selectAll("." + className).data(annotatedTicks);
                elements.enter().append(elementName).classed(className, true);
                elements.exit().remove();
                return elements;
            };
            var offsetF = function (d) {
                switch (_this.orientation()) {
                    case "bottom":
                    case "right":
                        return annotationToTier.get(d) * tierHeight + axisHeightWithoutMarginAndAnnotations;
                    case "top":
                    case "left":
                        return axisHeight - axisHeightWithoutMarginAndAnnotations - annotationToTier.get(d) * tierHeight;
                }
            };
            var positionF = function (d) { return _this._scale.scale(d); };
            var visibilityF = function (d) { return hiddenAnnotations.has(d) ? "hidden" : "visible"; };
            var secondaryPosition;
            switch (this.orientation()) {
                case "bottom":
                case "right":
                    secondaryPosition = 0;
                    break;
                case "top":
                    secondaryPosition = this.height();
                    break;
                case "left":
                    secondaryPosition = this.width();
                    break;
            }
            var isHorizontal = this._isHorizontal();
            bindElements(this._annotationContainer.select(".annotation-line-container"), "line", Axis.ANNOTATION_LINE_CLASS)
                .attr({
                x1: isHorizontal ? positionF : secondaryPosition,
                x2: isHorizontal ? positionF : offsetF,
                y1: isHorizontal ? secondaryPosition : positionF,
                y2: isHorizontal ? offsetF : positionF,
                visibility: visibilityF
            });
            bindElements(this._annotationContainer.select(".annotation-circle-container"), "circle", Axis.ANNOTATION_CIRCLE_CLASS)
                .attr({
                cx: isHorizontal ? positionF : secondaryPosition,
                cy: isHorizontal ? secondaryPosition : positionF,
                r: 3
            });
            var rectangleOffsetF = function (d) {
                switch (_this.orientation()) {
                    case "bottom":
                    case "right":
                        return offsetF(d);
                    case "top":
                    case "left":
                        return offsetF(d) - measurements.get(d).height;
                }
            };
            bindElements(this._annotationContainer.select(".annotation-rect-container"), "rect", Axis.ANNOTATION_RECT_CLASS)
                .attr({
                x: isHorizontal ? positionF : rectangleOffsetF,
                y: isHorizontal ? rectangleOffsetF : positionF,
                width: isHorizontal ? function (d) { return measurements.get(d).width; } : function (d) { return measurements.get(d).height; },
                height: isHorizontal ? function (d) { return measurements.get(d).height; } : function (d) { return measurements.get(d).width; },
                visibility: visibilityF
            });
            var annotationWriter = this._annotationWriter;
            var annotationFormatter = this.annotationFormatter();
            var annotationLabels = bindElements(this._annotationContainer.select(".annotation-label-container"), "g", Axis.ANNOTATION_LABEL_CLASS);
            annotationLabels.selectAll(".text-container").remove();
            annotationLabels.attr({
                transform: function (d) {
                    var xTranslate = isHorizontal ? positionF(d) : rectangleOffsetF(d);
                    var yTranslate = isHorizontal ? rectangleOffsetF(d) : positionF(d);
                    return "translate(" + xTranslate + "," + yTranslate + ")";
                },
                visibility: visibilityF
            })
                .each(function (annotationLabel) {
                var writeOptions = {
                    selection: d3.select(this),
                    xAlign: "center",
                    yAlign: "center",
                    textRotation: isHorizontal ? 0 : 90
                };
                annotationWriter.write(annotationFormatter(annotationLabel), isHorizontal ? measurements.get(annotationLabel).width : measurements.get(annotationLabel).height, isHorizontal ? measurements.get(annotationLabel).height : measurements.get(annotationLabel).width, writeOptions);
            });
        };
        Axis.prototype._annotatedTicksToRender = function () {
            var _this = this;
            var scaleRange = this._scale.range();
            return Plottable.Utils.Array.uniq(this.annotatedTicks().filter(function (tick) {
                if (tick == null) {
                    return false;
                }
                return Plottable.Utils.Math.inRange(_this._scale.scale(tick), scaleRange[0], scaleRange[1]);
            }));
        };
        /**
         * Retrieves the size of the core pieces.
         *
         * The core pieces include the labels, the end tick marks, the inner tick marks, and the tick label padding.
         */
        Axis.prototype._coreSize = function () {
            var relevantDimension = this._isHorizontal() ? this.height() : this.width();
            var axisHeightWithoutMargin = this._isHorizontal() ? this._computeHeight() : this._computeWidth();
            return Math.min(axisHeightWithoutMargin, relevantDimension);
        };
        Axis.prototype._annotationTierHeight = function () {
            return this._annotationMeasurer.measure().height + 2 * Axis._ANNOTATION_LABEL_PADDING;
        };
        Axis.prototype._annotationToTier = function (measurements) {
            var _this = this;
            var annotationTiers = [[]];
            var annotationToTier = new Plottable.Utils.Map();
            var dimension = this._isHorizontal() ? this.width() : this.height();
            this._annotatedTicksToRender().forEach(function (annotatedTick) {
                var position = _this._scale.scale(annotatedTick);
                var length = measurements.get(annotatedTick).width;
                if (position < 0 || position + length > dimension) {
                    annotationToTier.set(annotatedTick, -1);
                    return;
                }
                var tierHasCollision = function (testTier) { return annotationTiers[testTier].some(function (testTick) {
                    var testPosition = _this._scale.scale(testTick);
                    var testLength = measurements.get(testTick).width;
                    return position + length >= testPosition && position <= testPosition + testLength;
                }); };
                var tier = 0;
                while (tierHasCollision(tier)) {
                    tier++;
                    if (annotationTiers.length === tier) {
                        annotationTiers.push([]);
                    }
                }
                annotationTiers[tier].push(annotatedTick);
                annotationToTier.set(annotatedTick, tier);
            });
            return annotationToTier;
        };
        Axis.prototype._removeAnnotations = function () {
            this._annotationContainer.selectAll(".annotation-line").remove();
            this._annotationContainer.selectAll(".annotation-circle").remove();
            this._annotationContainer.selectAll(".annotation-rect").remove();
            this._annotationContainer.selectAll(".annotation-label").remove();
        };
        Axis.prototype._generateBaselineAttrHash = function () {
            var baselineAttrHash = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            };
            switch (this._orientation) {
                case "bottom":
                    baselineAttrHash["x2"] = this.width();
                    break;
                case "top":
                    baselineAttrHash["x2"] = this.width();
                    baselineAttrHash["y1"] = this.height();
                    baselineAttrHash["y2"] = this.height();
                    break;
                case "left":
                    baselineAttrHash["x1"] = this.width();
                    baselineAttrHash["x2"] = this.width();
                    baselineAttrHash["y2"] = this.height();
                    break;
                case "right":
                    baselineAttrHash["y2"] = this.height();
                    break;
            }
            return baselineAttrHash;
        };
        Axis.prototype._generateTickMarkAttrHash = function (isEndTickMark) {
            var _this = this;
            if (isEndTickMark === void 0) { isEndTickMark = false; }
            var tickMarkAttrHash = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            };
            var scalingFunction = function (d) { return _this._scale.scale(d); };
            if (this._isHorizontal()) {
                tickMarkAttrHash["x1"] = scalingFunction;
                tickMarkAttrHash["x2"] = scalingFunction;
            }
            else {
                tickMarkAttrHash["y1"] = scalingFunction;
                tickMarkAttrHash["y2"] = scalingFunction;
            }
            var tickLength = isEndTickMark ? this._endTickLength : this._innerTickLength;
            switch (this._orientation) {
                case "bottom":
                    tickMarkAttrHash["y2"] = tickLength;
                    break;
                case "top":
                    tickMarkAttrHash["y1"] = this.height();
                    tickMarkAttrHash["y2"] = this.height() - tickLength;
                    break;
                case "left":
                    tickMarkAttrHash["x1"] = this.width();
                    tickMarkAttrHash["x2"] = this.width() - tickLength;
                    break;
                case "right":
                    tickMarkAttrHash["x2"] = tickLength;
                    break;
            }
            return tickMarkAttrHash;
        };
        Axis.prototype._setDefaultAlignment = function () {
            switch (this._orientation) {
                case "bottom":
                    this.yAlignment("top");
                    break;
                case "top":
                    this.yAlignment("bottom");
                    break;
                case "left":
                    this.xAlignment("right");
                    break;
                case "right":
                    this.xAlignment("left");
                    break;
            }
        };
        Axis.prototype.formatter = function (formatter) {
            if (formatter == null) {
                return this._formatter;
            }
            this._formatter = formatter;
            this.redraw();
            return this;
        };
        Axis.prototype.tickLength = function (length) {
            Plottable.Utils.Window.deprecated("tickLength()", "v1.3.0", "Replaced by innerTickLength()");
            return this.innerTickLength(length);
        };
        Axis.prototype.innerTickLength = function (length) {
            if (length == null) {
                return this._innerTickLength;
            }
            else {
                if (length < 0) {
                    throw new Error("inner tick length must be positive");
                }
                this._innerTickLength = length;
                this.redraw();
                return this;
            }
        };
        Axis.prototype.endTickLength = function (length) {
            if (length == null) {
                return this._endTickLength;
            }
            else {
                if (length < 0) {
                    throw new Error("end tick length must be positive");
                }
                this._endTickLength = length;
                this.redraw();
                return this;
            }
        };
        Axis.prototype._maxLabelTickLength = function () {
            if (this.showEndTickLabels()) {
                return Math.max(this.innerTickLength(), this.endTickLength());
            }
            else {
                return this.innerTickLength();
            }
        };
        Axis.prototype.tickLabelPadding = function (padding) {
            if (padding == null) {
                return this._tickLabelPadding;
            }
            else {
                if (padding < 0) {
                    throw new Error("tick label padding must be positive");
                }
                this._tickLabelPadding = padding;
                this.redraw();
                return this;
            }
        };
        Axis.prototype.margin = function (size) {
            if (size == null) {
                return this._margin;
            }
            else {
                if (size < 0) {
                    throw new Error("margin size must be positive");
                }
                this._margin = size;
                this.redraw();
                return this;
            }
        };
        Axis.prototype.orientation = function (orientation) {
            if (orientation == null) {
                return this._orientation;
            }
            else {
                var newOrientationLC = orientation.toLowerCase();
                if (newOrientationLC !== "top" &&
                    newOrientationLC !== "bottom" &&
                    newOrientationLC !== "left" &&
                    newOrientationLC !== "right") {
                    throw new Error("unsupported orientation");
                }
                this._orientation = newOrientationLC;
                this.redraw();
                return this;
            }
        };
        Axis.prototype.showEndTickLabels = function (show) {
            if (show == null) {
                return this._showEndTickLabels;
            }
            this._showEndTickLabels = show;
            this.render();
            return this;
        };
        /**
         * The css class applied to each end tick mark (the line on the end tick).
         */
        Axis.END_TICK_MARK_CLASS = "end-tick-mark";
        /**
         * The css class applied to each tick mark (the line on the tick).
         */
        Axis.TICK_MARK_CLASS = "tick-mark";
        /**
         * The css class applied to each tick label (the text associated with the tick).
         */
        Axis.TICK_LABEL_CLASS = "tick-label";
        /**
         * The css class applied to each annotation line, which extends from the axis to the rect.
         */
        Axis.ANNOTATION_LINE_CLASS = "annotation-line";
        /**
         * The css class applied to each annotation rect, which surrounds the annotation label.
         */
        Axis.ANNOTATION_RECT_CLASS = "annotation-rect";
        /**
         * The css class applied to each annotation circle, which denotes which tick is being annotated.
         */
        Axis.ANNOTATION_CIRCLE_CLASS = "annotation-circle";
        /**
         * The css class applied to each annotation label, which shows the formatted annotation text.
         */
        Axis.ANNOTATION_LABEL_CLASS = "annotation-label";
        Axis._ANNOTATION_LABEL_PADDING = 4;
        return Axis;
    })(Plottable.Component);
    Plottable.Axis = Axis;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var TimeInterval;
    (function (TimeInterval) {
        TimeInterval.second = "second";
        TimeInterval.minute = "minute";
        TimeInterval.hour = "hour";
        TimeInterval.day = "day";
        TimeInterval.week = "week";
        TimeInterval.month = "month";
        TimeInterval.year = "year";
    })(TimeInterval = Plottable.TimeInterval || (Plottable.TimeInterval = {}));
    ;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Axes;
    (function (Axes) {
        var Time = (function (_super) {
            __extends(Time, _super);
            /**
             * Constructs a Time Axis.
             *
             * A Time Axis is a visual representation of a Time Scale.
             *
             * @constructor
             * @param {Scales.Time} scale
             * @param {string} orientation One of "top"/"bottom".
             */
            function Time(scale, orientation) {
                _super.call(this, scale, orientation);
                this._tierLabelPositions = [];
                this.addClass("time-axis");
                this.tickLabelPadding(5);
                this.axisConfigurations(Time._DEFAULT_TIME_AXIS_CONFIGURATIONS);
                this.annotationFormatter(Plottable.Formatters.time("%a %b %d, %Y"));
            }
            Time.prototype.tierLabelPositions = function (newPositions) {
                if (newPositions == null) {
                    return this._tierLabelPositions;
                }
                else {
                    if (!newPositions.every(function (pos) { return pos.toLowerCase() === "between" || pos.toLowerCase() === "center"; })) {
                        throw new Error("Unsupported position for tier labels");
                    }
                    this._tierLabelPositions = newPositions;
                    this.redraw();
                    return this;
                }
            };
            Time.prototype.axisConfigurations = function (configurations) {
                if (configurations == null) {
                    return this._possibleTimeAxisConfigurations;
                }
                this._possibleTimeAxisConfigurations = configurations;
                this._numTiers = Plottable.Utils.Math.max(this._possibleTimeAxisConfigurations.map(function (config) { return config.length; }), 0);
                if (this._isAnchored) {
                    this._setupDomElements();
                }
                var oldLabelPositions = this.tierLabelPositions();
                var newLabelPositions = [];
                for (var i = 0; i < this._numTiers; i++) {
                    newLabelPositions.push(oldLabelPositions[i] || "between");
                }
                this.tierLabelPositions(newLabelPositions);
                this.redraw();
                return this;
            };
            /**
             * Gets the index of the most precise TimeAxisConfiguration that will fit in the current width.
             */
            Time.prototype._getMostPreciseConfigurationIndex = function () {
                var _this = this;
                var mostPreciseIndex = this._possibleTimeAxisConfigurations.length;
                this._possibleTimeAxisConfigurations.forEach(function (interval, index) {
                    if (index < mostPreciseIndex && interval.every(function (tier) {
                        return _this._checkTimeAxisTierConfigurationWidth(tier);
                    })) {
                        mostPreciseIndex = index;
                    }
                });
                if (mostPreciseIndex === this._possibleTimeAxisConfigurations.length) {
                    Plottable.Utils.Window.warn("zoomed out too far: could not find suitable interval to display labels");
                    --mostPreciseIndex;
                }
                return mostPreciseIndex;
            };
            Time.prototype.orientation = function (orientation) {
                if (orientation && (orientation.toLowerCase() === "right" || orientation.toLowerCase() === "left")) {
                    throw new Error(orientation + " is not a supported orientation for TimeAxis - only horizontal orientations are supported");
                }
                return _super.prototype.orientation.call(this, orientation); // maintains getter-setter functionality
            };
            Time.prototype._computeHeight = function () {
                var textHeight = this._measurer.measure().height;
                this._tierHeights = [];
                for (var i = 0; i < this._numTiers; i++) {
                    this._tierHeights.push(textHeight + this.tickLabelPadding() +
                        ((this._tierLabelPositions[i]) === "between" ? 0 : this._maxLabelTickLength()));
                }
                this._computedHeight = d3.sum(this._tierHeights);
                return this._computedHeight;
            };
            Time.prototype._getIntervalLength = function (config) {
                var startDate = this._scale.domain()[0];
                var d3Interval = Plottable.Scales.Time.timeIntervalToD3Time(config.interval);
                var endDate = d3Interval.offset(startDate, config.step);
                if (endDate > this._scale.domain()[1]) {
                    // this offset is too large, so just return available width
                    return this.width();
                }
                // measure how much space one date can get
                var stepLength = Math.abs(this._scale.scale(endDate) - this._scale.scale(startDate));
                return stepLength;
            };
            Time.prototype._maxWidthForInterval = function (config) {
                return this._measurer.measure(config.formatter(Time._LONG_DATE)).width;
            };
            /**
             * Check if tier configuration fits in the current width.
             */
            Time.prototype._checkTimeAxisTierConfigurationWidth = function (config) {
                var worstWidth = this._maxWidthForInterval(config) + 2 * this.tickLabelPadding();
                return Math.min(this._getIntervalLength(config), this.width()) >= worstWidth;
            };
            Time.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
                // Makes sure that the size it requires is a multiple of tier sizes, such that
                // we have no leftover tiers
                var size = _super.prototype._sizeFromOffer.call(this, availableWidth, availableHeight);
                var tierHeights = this._tierHeights.reduce(function (prevValue, currValue, index, arr) {
                    return (prevValue + currValue > size.height) ? prevValue : (prevValue + currValue);
                });
                var nonCoreHeight = this.margin() + (this.annotationsEnabled() ? this.annotationTierCount() * this._annotationTierHeight() : 0);
                size.height = Math.min(size.height, tierHeights + nonCoreHeight);
                return size;
            };
            Time.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._setupDomElements();
            };
            Time.prototype._setupDomElements = function () {
                this.content().selectAll("." + Time.TIME_AXIS_TIER_CLASS).remove();
                this._tierLabelContainers = [];
                this._tierMarkContainers = [];
                this._tierBaselines = [];
                this._tickLabelContainer.remove();
                this._baseline.remove();
                for (var i = 0; i < this._numTiers; ++i) {
                    var tierContainer = this.content().append("g").classed(Time.TIME_AXIS_TIER_CLASS, true);
                    this._tierLabelContainers.push(tierContainer.append("g").classed(Plottable.Axis.TICK_LABEL_CLASS + "-container", true));
                    this._tierMarkContainers.push(tierContainer.append("g").classed(Plottable.Axis.TICK_MARK_CLASS + "-container", true));
                    this._tierBaselines.push(tierContainer.append("line").classed("baseline", true));
                }
                this._measurer = new SVGTypewriter.Measurers.Measurer(this._tierLabelContainers[0]);
            };
            Time.prototype._getTickIntervalValues = function (config) {
                return this._scale.tickInterval(config.interval, config.step);
            };
            Time.prototype._getTickValues = function () {
                var _this = this;
                return this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex].reduce(function (ticks, config) { return ticks.concat(_this._getTickIntervalValues(config)); }, []);
            };
            Time.prototype._cleanTiers = function () {
                for (var index = 0; index < this._tierLabelContainers.length; index++) {
                    this._tierLabelContainers[index].selectAll("." + Plottable.Axis.TICK_LABEL_CLASS).remove();
                    this._tierMarkContainers[index].selectAll("." + Plottable.Axis.TICK_MARK_CLASS).remove();
                    this._tierBaselines[index].style("visibility", "hidden");
                }
            };
            Time.prototype._getTickValuesForConfiguration = function (config) {
                var tickPos = this._scale.tickInterval(config.interval, config.step);
                var domain = this._scale.domain();
                var tickPosValues = tickPos.map(function (d) { return d.valueOf(); }); // can't indexOf with objects
                if (tickPosValues.indexOf(domain[0].valueOf()) === -1) {
                    tickPos.unshift(domain[0]);
                }
                if (tickPosValues.indexOf(domain[1].valueOf()) === -1) {
                    tickPos.push(domain[1]);
                }
                return tickPos;
            };
            Time.prototype._renderTierLabels = function (container, config, index) {
                var _this = this;
                var tickPos = this._getTickValuesForConfiguration(config);
                var labelPos = [];
                if (this._tierLabelPositions[index] === "between" && config.step === 1) {
                    tickPos.map(function (datum, index) {
                        if (index + 1 >= tickPos.length) {
                            return;
                        }
                        labelPos.push(new Date((tickPos[index + 1].valueOf() - tickPos[index].valueOf()) / 2 + tickPos[index].valueOf()));
                    });
                }
                else {
                    labelPos = tickPos;
                }
                var tickLabels = container.selectAll("." + Plottable.Axis.TICK_LABEL_CLASS).data(labelPos, function (d) { return String(d.valueOf()); });
                var tickLabelsEnter = tickLabels.enter().append("g").classed(Plottable.Axis.TICK_LABEL_CLASS, true);
                tickLabelsEnter.append("text");
                var xTranslate = (this._tierLabelPositions[index] === "center" || config.step === 1) ? 0 : this.tickLabelPadding();
                var yTranslate;
                if (this.orientation() === "bottom") {
                    yTranslate = d3.sum(this._tierHeights.slice(0, index + 1)) - this.tickLabelPadding();
                }
                else {
                    if (this._tierLabelPositions[index] === "center") {
                        yTranslate = this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding() - this._maxLabelTickLength();
                    }
                    else {
                        yTranslate = this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding();
                    }
                }
                var textSelection = tickLabels.selectAll("text");
                if (textSelection.size() > 0) {
                    Plottable.Utils.DOM.translate(textSelection, xTranslate, yTranslate);
                }
                tickLabels.exit().remove();
                tickLabels.attr("transform", function (d) { return "translate(" + _this._scale.scale(d) + ",0)"; });
                var anchor = (this._tierLabelPositions[index] === "center" || config.step === 1) ? "middle" : "start";
                tickLabels.selectAll("text").text(config.formatter).style("text-anchor", anchor);
            };
            Time.prototype._renderTickMarks = function (tickValues, index) {
                var tickMarks = this._tierMarkContainers[index].selectAll("." + Plottable.Axis.TICK_MARK_CLASS).data(tickValues);
                tickMarks.enter().append("line").classed(Plottable.Axis.TICK_MARK_CLASS, true);
                var attr = this._generateTickMarkAttrHash();
                var offset = this._tierHeights.slice(0, index).reduce(function (translate, height) { return translate + height; }, 0);
                if (this.orientation() === "bottom") {
                    attr["y1"] = offset;
                    attr["y2"] = offset + (this._tierLabelPositions[index] === "center" ? this.innerTickLength() : this._tierHeights[index]);
                }
                else {
                    attr["y1"] = this.height() - offset;
                    attr["y2"] = this.height() - (offset + (this._tierLabelPositions[index] === "center" ?
                        this.innerTickLength() : this._tierHeights[index]));
                }
                tickMarks.attr(attr);
                if (this.orientation() === "bottom") {
                    attr["y1"] = offset;
                    attr["y2"] = offset + (this._tierLabelPositions[index] === "center" ? this.endTickLength() : this._tierHeights[index]);
                }
                else {
                    attr["y1"] = this.height() - offset;
                    attr["y2"] = this.height() - (offset + (this._tierLabelPositions[index] === "center" ?
                        this.endTickLength() : this._tierHeights[index]));
                }
                d3.select(tickMarks[0][0]).attr(attr);
                d3.select(tickMarks[0][tickMarks.size() - 1]).attr(attr);
                // Add end-tick classes to first and last tick for CSS customization purposes
                d3.select(tickMarks[0][0]).classed(Plottable.Axis.END_TICK_MARK_CLASS, true);
                d3.select(tickMarks[0][tickMarks.size() - 1]).classed(Plottable.Axis.END_TICK_MARK_CLASS, true);
                tickMarks.exit().remove();
            };
            Time.prototype._renderLabellessTickMarks = function (tickValues) {
                var tickMarks = this._tickMarkContainer.selectAll("." + Plottable.Axis.TICK_MARK_CLASS).data(tickValues);
                tickMarks.enter().append("line").classed(Plottable.Axis.TICK_MARK_CLASS, true);
                var attr = this._generateTickMarkAttrHash();
                attr["y2"] = (this.orientation() === "bottom") ? this.tickLabelPadding() : this.height() - this.tickLabelPadding();
                tickMarks.attr(attr);
                tickMarks.exit().remove();
            };
            Time.prototype._generateLabellessTicks = function () {
                if (this._mostPreciseConfigIndex < 1) {
                    return [];
                }
                return this._getTickIntervalValues(this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex - 1][0]);
            };
            Time.prototype.renderImmediately = function () {
                var _this = this;
                this._mostPreciseConfigIndex = this._getMostPreciseConfigurationIndex();
                var tierConfigs = this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex];
                this._cleanTiers();
                tierConfigs.forEach(function (config, i) {
                    return _this._renderTierLabels(_this._tierLabelContainers[i], config, i);
                });
                var tierTicks = tierConfigs.map(function (config, i) {
                    return _this._getTickValuesForConfiguration(config);
                });
                var baselineOffset = 0;
                for (var i = 0; i < Math.max(tierConfigs.length, 1); ++i) {
                    var attr = this._generateBaselineAttrHash();
                    attr["y1"] += (this.orientation() === "bottom") ? baselineOffset : -baselineOffset;
                    attr["y2"] = attr["y1"];
                    this._tierBaselines[i].attr(attr).style("visibility", "inherit");
                    baselineOffset += this._tierHeights[i];
                }
                var labelLessTicks = [];
                var domain = this._scale.domain();
                var totalLength = this._scale.scale(domain[1]) - this._scale.scale(domain[0]);
                if (this._getIntervalLength(tierConfigs[0]) * 1.5 >= totalLength) {
                    labelLessTicks = this._generateLabellessTicks();
                }
                this._renderLabellessTickMarks(labelLessTicks);
                this._hideOverflowingTiers();
                for (var i = 0; i < tierConfigs.length; ++i) {
                    this._renderTickMarks(tierTicks[i], i);
                    this._hideOverlappingAndCutOffLabels(i);
                }
                if (this.annotationsEnabled()) {
                    this._drawAnnotations();
                }
                else {
                    this._removeAnnotations();
                }
                return this;
            };
            Time.prototype._hideOverflowingTiers = function () {
                var _this = this;
                var availableHeight = this.height();
                var usedHeight = 0;
                this.content()
                    .selectAll("." + Time.TIME_AXIS_TIER_CLASS)
                    .attr("visibility", function (d, i) {
                    usedHeight += _this._tierHeights[i];
                    return usedHeight <= availableHeight ? "inherit" : "hidden";
                });
            };
            Time.prototype._hideOverlappingAndCutOffLabels = function (index) {
                var _this = this;
                var boundingBox = this._boundingBox.node().getBoundingClientRect();
                var isInsideBBox = function (tickBox) {
                    return (Math.floor(boundingBox.left) <= Math.ceil(tickBox.left) &&
                        Math.floor(boundingBox.top) <= Math.ceil(tickBox.top) &&
                        Math.floor(tickBox.right) <= Math.ceil(boundingBox.left + _this.width()) &&
                        Math.floor(tickBox.bottom) <= Math.ceil(boundingBox.top + _this.height()));
                };
                var visibleTickMarks = this._tierMarkContainers[index]
                    .selectAll("." + Plottable.Axis.TICK_MARK_CLASS)
                    .filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return visibility === "visible" || visibility === "inherit";
                });
                // We use the ClientRects because x1/x2 attributes are not comparable to ClientRects of labels
                var visibleTickMarkRects = visibleTickMarks[0].map(function (mark) { return mark.getBoundingClientRect(); });
                var visibleTickLabels = this._tierLabelContainers[index]
                    .selectAll("." + Plottable.Axis.TICK_LABEL_CLASS)
                    .filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return visibility === "visible" || visibility === "inherit";
                });
                var lastLabelClientRect;
                visibleTickLabels.each(function (d, i) {
                    var clientRect = this.getBoundingClientRect();
                    var tickLabel = d3.select(this);
                    var leadingTickMark = visibleTickMarkRects[i];
                    var trailingTickMark = visibleTickMarkRects[i + 1];
                    var isOverlappingLastLabel = (lastLabelClientRect != null && Plottable.Utils.DOM.clientRectsOverlap(clientRect, lastLabelClientRect));
                    var isOverlappingLeadingTickMark = (leadingTickMark != null && Plottable.Utils.DOM.clientRectsOverlap(clientRect, leadingTickMark));
                    var isOverlappingTrailingTickMark = (trailingTickMark != null && Plottable.Utils.DOM.clientRectsOverlap(clientRect, trailingTickMark));
                    if (!isInsideBBox(clientRect) || isOverlappingLastLabel || isOverlappingLeadingTickMark || isOverlappingTrailingTickMark) {
                        tickLabel.style("visibility", "hidden");
                    }
                    else {
                        lastLabelClientRect = clientRect;
                        tickLabel.style("visibility", "inherit");
                    }
                });
            };
            /**
             * The CSS class applied to each Time Axis tier
             */
            Time.TIME_AXIS_TIER_CLASS = "time-axis-tier";
            Time._DEFAULT_TIME_AXIS_CONFIGURATIONS = [
                [
                    { interval: Plottable.TimeInterval.second, step: 1, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.second, step: 5, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.second, step: 10, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.second, step: 15, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.second, step: 30, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.minute, step: 1, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.minute, step: 5, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.minute, step: 10, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.minute, step: 15, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.minute, step: 30, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.hour, step: 1, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.hour, step: 3, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.hour, step: 6, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.hour, step: 12, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%a %e") },
                    { interval: Plottable.TimeInterval.month, step: 1, formatter: Plottable.Formatters.time("%B %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.day, step: 1, formatter: Plottable.Formatters.time("%e") },
                    { interval: Plottable.TimeInterval.month, step: 1, formatter: Plottable.Formatters.time("%B %Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.month, step: 1, formatter: Plottable.Formatters.time("%B") },
                    { interval: Plottable.TimeInterval.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.month, step: 1, formatter: Plottable.Formatters.time("%b") },
                    { interval: Plottable.TimeInterval.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.month, step: 3, formatter: Plottable.Formatters.time("%b") },
                    { interval: Plottable.TimeInterval.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.month, step: 6, formatter: Plottable.Formatters.time("%b") },
                    { interval: Plottable.TimeInterval.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 1, formatter: Plottable.Formatters.time("%y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 5, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 25, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 50, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 100, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 200, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 500, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: Plottable.TimeInterval.year, step: 1000, formatter: Plottable.Formatters.time("%Y") }
                ]
            ];
            Time._LONG_DATE = new Date(9999, 8, 29, 12, 59, 9999);
            return Time;
        })(Plottable.Axis);
        Axes.Time = Time;
    })(Axes = Plottable.Axes || (Plottable.Axes = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Axes;
    (function (Axes) {
        var Numeric = (function (_super) {
            __extends(Numeric, _super);
            /**
             * Constructs a Numeric Axis.
             *
             * A Numeric Axis is a visual representation of a QuantitativeScale.
             *
             * @constructor
             * @param {QuantitativeScale} scale
             * @param {string} orientation One of "top"/"bottom"/"left"/"right".
             */
            function Numeric(scale, orientation) {
                _super.call(this, scale, orientation);
                this._tickLabelPositioning = "center";
                this._usesTextWidthApproximation = false;
                this.formatter(Plottable.Formatters.general());
            }
            Numeric.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._measurer = new SVGTypewriter.Measurers.Measurer(this._tickLabelContainer, Plottable.Axis.TICK_LABEL_CLASS);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper().maxLines(1);
            };
            Numeric.prototype._computeWidth = function () {
                var maxTextWidth = this._usesTextWidthApproximation ? this._computeApproximateTextWidth() : this._computeExactTextWidth();
                if (this._tickLabelPositioning === "center") {
                    this._computedWidth = this._maxLabelTickLength() + this.tickLabelPadding() + maxTextWidth;
                }
                else {
                    this._computedWidth = Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + maxTextWidth);
                }
                return this._computedWidth;
            };
            Numeric.prototype._computeExactTextWidth = function () {
                var _this = this;
                var tickValues = this._getTickValues();
                var textLengths = tickValues.map(function (v) {
                    var formattedValue = _this.formatter()(v);
                    return _this._measurer.measure(formattedValue).width;
                });
                return Plottable.Utils.Math.max(textLengths, 0);
            };
            Numeric.prototype._computeApproximateTextWidth = function () {
                var _this = this;
                var tickValues = this._getTickValues();
                var mWidth = this._measurer.measure("M").width;
                var textLengths = tickValues.map(function (v) {
                    var formattedValue = _this.formatter()(v);
                    return formattedValue.length * mWidth;
                });
                return Plottable.Utils.Math.max(textLengths, 0);
            };
            Numeric.prototype._computeHeight = function () {
                var textHeight = this._measurer.measure().height;
                if (this._tickLabelPositioning === "center") {
                    this._computedHeight = this._maxLabelTickLength() + this.tickLabelPadding() + textHeight;
                }
                else {
                    this._computedHeight = Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + textHeight);
                }
                return this._computedHeight;
            };
            Numeric.prototype._getTickValues = function () {
                var scale = this._scale;
                var domain = scale.domain();
                var min = domain[0] <= domain[1] ? domain[0] : domain[1];
                var max = domain[0] >= domain[1] ? domain[0] : domain[1];
                if (min === domain[0]) {
                    return scale.ticks().filter(function (i) { return i >= min && i <= max; });
                }
                else {
                    return scale.ticks().filter(function (i) { return i >= min && i <= max; }).reverse();
                }
            };
            Numeric.prototype._rescale = function () {
                if (!this._isSetup) {
                    return;
                }
                if (!this._isHorizontal()) {
                    var reComputedWidth = this._computeWidth();
                    if (reComputedWidth > this.width() || reComputedWidth < (this.width() - this.margin())) {
                        this.redraw();
                        return;
                    }
                }
                this.render();
            };
            Numeric.prototype.renderImmediately = function () {
                var _this = this;
                _super.prototype.renderImmediately.call(this);
                var tickLabelAttrHash = {
                    x: 0,
                    y: 0,
                    dx: "0em",
                    dy: "0.3em"
                };
                var tickMarkLength = this._maxLabelTickLength();
                var tickLabelPadding = this.tickLabelPadding();
                var tickLabelTextAnchor = "middle";
                var labelGroupTransformX = 0;
                var labelGroupTransformY = 0;
                var labelGroupShiftX = 0;
                var labelGroupShiftY = 0;
                if (this._isHorizontal()) {
                    switch (this._tickLabelPositioning) {
                        case "left":
                            tickLabelTextAnchor = "end";
                            labelGroupTransformX = -tickLabelPadding;
                            labelGroupShiftY = tickLabelPadding;
                            break;
                        case "center":
                            labelGroupShiftY = tickMarkLength + tickLabelPadding;
                            break;
                        case "right":
                            tickLabelTextAnchor = "start";
                            labelGroupTransformX = tickLabelPadding;
                            labelGroupShiftY = tickLabelPadding;
                            break;
                    }
                }
                else {
                    switch (this._tickLabelPositioning) {
                        case "top":
                            tickLabelAttrHash["dy"] = "-0.3em";
                            labelGroupShiftX = tickLabelPadding;
                            labelGroupTransformY = -tickLabelPadding;
                            break;
                        case "center":
                            labelGroupShiftX = tickMarkLength + tickLabelPadding;
                            break;
                        case "bottom":
                            tickLabelAttrHash["dy"] = "1em";
                            labelGroupShiftX = tickLabelPadding;
                            labelGroupTransformY = tickLabelPadding;
                            break;
                    }
                }
                var tickMarkAttrHash = this._generateTickMarkAttrHash();
                switch (this.orientation()) {
                    case "bottom":
                        tickLabelAttrHash["x"] = tickMarkAttrHash["x1"];
                        tickLabelAttrHash["dy"] = "0.95em";
                        labelGroupTransformY = tickMarkAttrHash["y1"] + labelGroupShiftY;
                        break;
                    case "top":
                        tickLabelAttrHash["x"] = tickMarkAttrHash["x1"];
                        tickLabelAttrHash["dy"] = "-.25em";
                        labelGroupTransformY = tickMarkAttrHash["y1"] - labelGroupShiftY;
                        break;
                    case "left":
                        tickLabelTextAnchor = "end";
                        labelGroupTransformX = tickMarkAttrHash["x1"] - labelGroupShiftX;
                        tickLabelAttrHash["y"] = tickMarkAttrHash["y1"];
                        break;
                    case "right":
                        tickLabelTextAnchor = "start";
                        labelGroupTransformX = tickMarkAttrHash["x1"] + labelGroupShiftX;
                        tickLabelAttrHash["y"] = tickMarkAttrHash["y1"];
                        break;
                }
                var tickLabelValues = this._getTickValues();
                var tickLabels = this._tickLabelContainer
                    .selectAll("." + Plottable.Axis.TICK_LABEL_CLASS)
                    .data(tickLabelValues);
                tickLabels.enter().append("text").classed(Plottable.Axis.TICK_LABEL_CLASS, true);
                tickLabels.exit().remove();
                tickLabels.style("text-anchor", tickLabelTextAnchor)
                    .style("visibility", "inherit")
                    .attr(tickLabelAttrHash)
                    .text(function (s) { return _this.formatter()(s); });
                var labelGroupTransform = "translate(" + labelGroupTransformX + ", " + labelGroupTransformY + ")";
                this._tickLabelContainer.attr("transform", labelGroupTransform);
                this._showAllTickMarks();
                if (!this.showEndTickLabels()) {
                    this._hideEndTickLabels();
                }
                this._hideOverflowingTickLabels();
                this._hideOverlappingTickLabels();
                if (this._tickLabelPositioning === "bottom" ||
                    this._tickLabelPositioning === "top" ||
                    this._tickLabelPositioning === "left" ||
                    this._tickLabelPositioning === "right") {
                    this._hideTickMarksWithoutLabel();
                }
                return this;
            };
            Numeric.prototype._showAllTickMarks = function () {
                this._tickMarkContainer.selectAll("." + Plottable.Axis.TICK_MARK_CLASS)
                    .each(function () {
                    d3.select(this).style("visibility", "inherit");
                });
            };
            /**
             * Hides the Tick Marks which have no corresponding Tick Labels
             */
            Numeric.prototype._hideTickMarksWithoutLabel = function () {
                var visibleTickMarks = this._tickMarkContainer.selectAll("." + Plottable.Axis.TICK_MARK_CLASS);
                var visibleTickLabels = this._tickLabelContainer
                    .selectAll("." + Plottable.Axis.TICK_LABEL_CLASS)
                    .filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return (visibility === "inherit") || (visibility === "visible");
                });
                var labelNumbersShown = [];
                visibleTickLabels.each(function (labelNumber) { return labelNumbersShown.push(labelNumber); });
                visibleTickMarks.each(function (e, i) {
                    if (labelNumbersShown.indexOf(e) === -1) {
                        d3.select(this).style("visibility", "hidden");
                    }
                });
            };
            Numeric.prototype.tickLabelPosition = function (position) {
                if (position == null) {
                    return this._tickLabelPositioning;
                }
                else {
                    var positionLC = position.toLowerCase();
                    if (this._isHorizontal()) {
                        if (!(positionLC === "left" || positionLC === "center" || positionLC === "right")) {
                            throw new Error(positionLC + " is not a valid tick label position for a horizontal NumericAxis");
                        }
                    }
                    else {
                        if (!(positionLC === "top" || positionLC === "center" || positionLC === "bottom")) {
                            throw new Error(positionLC + " is not a valid tick label position for a vertical NumericAxis");
                        }
                    }
                    this._tickLabelPositioning = positionLC;
                    this.redraw();
                    return this;
                }
            };
            Numeric.prototype.usesTextWidthApproximation = function (enable) {
                if (enable == null) {
                    return this._usesTextWidthApproximation;
                }
                else {
                    this._usesTextWidthApproximation = enable;
                    return this;
                }
            };
            Numeric.prototype._hideEndTickLabels = function () {
                var boundingBox = this._boundingBox.node().getBoundingClientRect();
                var tickLabels = this._tickLabelContainer.selectAll("." + Plottable.Axis.TICK_LABEL_CLASS);
                if (tickLabels[0].length === 0) {
                    return;
                }
                var firstTickLabel = tickLabels[0][0];
                if (!Plottable.Utils.DOM.clientRectInside(firstTickLabel.getBoundingClientRect(), boundingBox)) {
                    d3.select(firstTickLabel).style("visibility", "hidden");
                }
                var lastTickLabel = tickLabels[0][tickLabels[0].length - 1];
                if (!Plottable.Utils.DOM.clientRectInside(lastTickLabel.getBoundingClientRect(), boundingBox)) {
                    d3.select(lastTickLabel).style("visibility", "hidden");
                }
            };
            // Responsible for hiding any tick labels that break out of the bounding container
            Numeric.prototype._hideOverflowingTickLabels = function () {
                var boundingBox = this._boundingBox.node().getBoundingClientRect();
                var tickLabels = this._tickLabelContainer.selectAll("." + Plottable.Axis.TICK_LABEL_CLASS);
                if (tickLabels.empty()) {
                    return;
                }
                tickLabels.each(function (d, i) {
                    if (!Plottable.Utils.DOM.clientRectInside(this.getBoundingClientRect(), boundingBox)) {
                        d3.select(this).style("visibility", "hidden");
                    }
                });
            };
            Numeric.prototype._hideOverlappingTickLabels = function () {
                var visibleTickLabels = this._tickLabelContainer
                    .selectAll("." + Plottable.Axis.TICK_LABEL_CLASS)
                    .filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return (visibility === "inherit") || (visibility === "visible");
                });
                var visibleTickLabelRects = visibleTickLabels[0].map(function (label) { return label.getBoundingClientRect(); });
                var interval = 1;
                while (!this._hasOverlapWithInterval(interval, visibleTickLabelRects) && interval < visibleTickLabelRects.length) {
                    interval += 1;
                }
                visibleTickLabels.each(function (d, i) {
                    var tickLabel = d3.select(this);
                    if (i % interval !== 0) {
                        tickLabel.style("visibility", "hidden");
                    }
                });
            };
            /**
             * The method is responsible for evenly spacing the labels on the axis.
             * @return test to see if taking every `interval` recrangle from `rects`
             *         will result in labels not overlapping
             *
             * For top, bottom, left, right positioning of the thicks, we want the padding
             * between the labels to be 3x, such that the label will be  `padding` distance
             * from the tick and 2 * `padding` distance (or more) from the next tick
             *
             */
            Numeric.prototype._hasOverlapWithInterval = function (interval, rects) {
                var padding = this.tickLabelPadding();
                if (this._tickLabelPositioning === "bottom" ||
                    this._tickLabelPositioning === "top" ||
                    this._tickLabelPositioning === "left" ||
                    this._tickLabelPositioning === "right") {
                    padding *= 3;
                }
                for (var i = 0; i < rects.length - (interval); i += interval) {
                    var currRect = rects[i];
                    var nextRect = rects[i + interval];
                    if (this._isHorizontal()) {
                        if (currRect.right + padding >= nextRect.left) {
                            return false;
                        }
                    }
                    else {
                        if (currRect.top - padding <= nextRect.bottom) {
                            return false;
                        }
                    }
                }
                return true;
            };
            return Numeric;
        })(Plottable.Axis);
        Axes.Numeric = Numeric;
    })(Axes = Plottable.Axes || (Plottable.Axes = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Axes;
    (function (Axes) {
        var Category = (function (_super) {
            __extends(Category, _super);
            /**
             * Constructs a Category Axis.
             *
             * A Category Axis is a visual representation of a Category Scale.
             *
             * @constructor
             * @param {Scales.Category} scale
             * @param {string} [orientation="bottom"] One of "top"/"bottom"/"left"/"right".
             */
            function Category(scale, orientation) {
                _super.call(this, scale, orientation);
                this._tickLabelAngle = 0;
                this.addClass("category-axis");
            }
            Category.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._measurer = new SVGTypewriter.Measurers.CacheCharacterMeasurer(this._tickLabelContainer);
                this._wrapper = new SVGTypewriter.Wrappers.SingleLineWrapper();
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
            };
            Category.prototype._rescale = function () {
                return this.redraw();
            };
            Category.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
                var widthRequiredByTicks = this._isHorizontal() ? 0 : this._maxLabelTickLength() + this.tickLabelPadding() + this.margin();
                var heightRequiredByTicks = this._isHorizontal() ? this._maxLabelTickLength() + this.tickLabelPadding() + this.margin() : 0;
                if (this._scale.domain().length === 0) {
                    return {
                        minWidth: 0,
                        minHeight: 0
                    };
                }
                if (this.annotationsEnabled()) {
                    var tierTotalHeight = this._annotationTierHeight() * this.annotationTierCount();
                    if (this._isHorizontal()) {
                        heightRequiredByTicks += tierTotalHeight;
                    }
                    else {
                        widthRequiredByTicks += tierTotalHeight;
                    }
                }
                var categoryScale = this._scale;
                var measureResult = this._measureTicks(offeredWidth, offeredHeight, categoryScale, categoryScale.domain());
                return {
                    minWidth: measureResult.usedWidth + widthRequiredByTicks,
                    minHeight: measureResult.usedHeight + heightRequiredByTicks
                };
            };
            Category.prototype._coreSize = function () {
                var relevantDimension = this._isHorizontal() ? this.height() : this.width();
                var relevantRequestedSpaceDimension = this._isHorizontal() ?
                    this.requestedSpace(this.width(), this.height()).minHeight :
                    this.requestedSpace(this.width(), this.height()).minWidth;
                var marginAndAnnotationSize = this.margin() + this._annotationTierHeight();
                var axisHeightWithoutMargin = relevantRequestedSpaceDimension - marginAndAnnotationSize;
                return Math.min(axisHeightWithoutMargin, relevantDimension);
            };
            Category.prototype._getTickValues = function () {
                return this._scale.domain();
            };
            Category.prototype.tickLabelAngle = function (angle) {
                if (angle == null) {
                    return this._tickLabelAngle;
                }
                if (angle !== 0 && angle !== 90 && angle !== -90) {
                    throw new Error("Angle " + angle + " not supported; only 0, 90, and -90 are valid values");
                }
                this._tickLabelAngle = angle;
                this.redraw();
                return this;
            };
            /**
             * Measures the size of the ticks while also writing them to the DOM.
             * @param {d3.Selection} ticks The tick elements to be written to.
             */
            Category.prototype._drawTicks = function (axisWidth, axisHeight, scale, ticks) {
                var self = this;
                var xAlign;
                var yAlign;
                switch (this.tickLabelAngle()) {
                    case 0:
                        xAlign = { left: "right", right: "left", top: "center", bottom: "center" };
                        yAlign = { left: "center", right: "center", top: "bottom", bottom: "top" };
                        break;
                    case 90:
                        xAlign = { left: "center", right: "center", top: "right", bottom: "left" };
                        yAlign = { left: "top", right: "bottom", top: "center", bottom: "center" };
                        break;
                    case -90:
                        xAlign = { left: "center", right: "center", top: "left", bottom: "right" };
                        yAlign = { left: "bottom", right: "top", top: "center", bottom: "center" };
                        break;
                }
                ticks.each(function (d) {
                    var bandWidth = scale.stepWidth();
                    var width = self._isHorizontal() ? bandWidth : axisWidth - self._maxLabelTickLength() - self.tickLabelPadding();
                    var height = self._isHorizontal() ? axisHeight - self._maxLabelTickLength() - self.tickLabelPadding() : bandWidth;
                    var writeOptions = {
                        selection: d3.select(this),
                        xAlign: xAlign[self.orientation()],
                        yAlign: yAlign[self.orientation()],
                        textRotation: self.tickLabelAngle()
                    };
                    self._writer.write(self.formatter()(d), width, height, writeOptions);
                });
            };
            /**
             * Measures the size of the ticks without making any (permanent) DOM
             * changes.
             *
             * @param {string[]} ticks The strings that will be printed on the ticks.
             */
            Category.prototype._measureTicks = function (axisWidth, axisHeight, scale, ticks) {
                var _this = this;
                var axisSpace = this._isHorizontal() ? axisWidth : axisHeight;
                var totalOuterPaddingRatio = 2 * scale.outerPadding();
                var totalInnerPaddingRatio = (ticks.length - 1) * scale.innerPadding();
                var expectedRangeBand = axisSpace / (totalOuterPaddingRatio + totalInnerPaddingRatio + ticks.length);
                var stepWidth = expectedRangeBand * (1 + scale.innerPadding());
                var wrappingResults = ticks.map(function (s) {
                    // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
                    var width = axisWidth - _this._maxLabelTickLength() - _this.tickLabelPadding(); // default for left/right
                    if (_this._isHorizontal()) {
                        width = stepWidth; // defaults to the band width
                        if (_this._tickLabelAngle !== 0) {
                            width = axisHeight - _this._maxLabelTickLength() - _this.tickLabelPadding(); // use the axis height
                        }
                        // HACKHACK: Wrapper fails under negative circumstances
                        width = Math.max(width, 0);
                    }
                    // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
                    var height = stepWidth; // default for left/right
                    if (_this._isHorizontal()) {
                        height = axisHeight - _this._maxLabelTickLength() - _this.tickLabelPadding();
                        if (_this._tickLabelAngle !== 0) {
                            height = axisWidth - _this._maxLabelTickLength() - _this.tickLabelPadding();
                        }
                        // HACKHACK: Wrapper fails under negative circumstances
                        height = Math.max(height, 0);
                    }
                    return _this._wrapper.wrap(_this.formatter()(s), _this._measurer, width, height);
                });
                // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
                var widthFn = (this._isHorizontal() && this._tickLabelAngle === 0) ? d3.sum : Plottable.Utils.Math.max;
                var heightFn = (this._isHorizontal() && this._tickLabelAngle === 0) ? Plottable.Utils.Math.max : d3.sum;
                var textFits = wrappingResults.every(function (t) {
                    return !SVGTypewriter.Utils.StringMethods.isNotEmptyString(t.truncatedText) && t.noLines === 1;
                });
                var usedWidth = widthFn(wrappingResults, function (t) { return _this._measurer.measure(t.wrappedText).width; }, 0);
                var usedHeight = heightFn(wrappingResults, function (t) { return _this._measurer.measure(t.wrappedText).height; }, 0);
                // If the tick labels are rotated, reverse usedWidth and usedHeight
                // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
                if (this._tickLabelAngle !== 0) {
                    var tempHeight = usedHeight;
                    usedHeight = usedWidth;
                    usedWidth = tempHeight;
                }
                return {
                    textFits: textFits,
                    usedWidth: usedWidth,
                    usedHeight: usedHeight
                };
            };
            Category.prototype.renderImmediately = function () {
                var _this = this;
                _super.prototype.renderImmediately.call(this);
                var catScale = this._scale;
                var tickLabels = this._tickLabelContainer.selectAll("." + Plottable.Axis.TICK_LABEL_CLASS).data(this._scale.domain(), function (d) { return d; });
                var getTickLabelTransform = function (d, i) {
                    var innerPaddingWidth = catScale.stepWidth() - catScale.rangeBand();
                    var scaledValue = catScale.scale(d) - catScale.rangeBand() / 2 - innerPaddingWidth / 2;
                    var x = _this._isHorizontal() ? scaledValue : 0;
                    var y = _this._isHorizontal() ? 0 : scaledValue;
                    return "translate(" + x + "," + y + ")";
                };
                tickLabels.enter().append("g").classed(Plottable.Axis.TICK_LABEL_CLASS, true);
                tickLabels.exit().remove();
                tickLabels.attr("transform", getTickLabelTransform);
                // erase all text first, then rewrite
                tickLabels.text("");
                this._drawTicks(this.width(), this.height(), catScale, tickLabels);
                var xTranslate = this.orientation() === "right" ? this._maxLabelTickLength() + this.tickLabelPadding() : 0;
                var yTranslate = this.orientation() === "bottom" ? this._maxLabelTickLength() + this.tickLabelPadding() : 0;
                Plottable.Utils.DOM.translate(this._tickLabelContainer, xTranslate, yTranslate);
                return this;
            };
            Category.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                // When anyone calls redraw(), computeLayout() will be called
                // on everyone, including this. Since CSS or something might have
                // affected the size of the characters, clear the cache.
                this._measurer.reset();
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                if (!this._isHorizontal()) {
                    this._scale.range([0, this.height()]);
                }
                return this;
            };
            return Category;
        })(Plottable.Axis);
        Axes.Category = Category;
    })(Axes = Plottable.Axes || (Plottable.Axes = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var Label = (function (_super) {
            __extends(Label, _super);
            /**
             * A Label is a Component that displays a single line of text.
             *
             * @constructor
             * @param {string} [displayText=""] The text of the Label.
             * @param {number} [angle=0] The angle of the Label in degrees (-90/0/90). 0 is horizontal.
             */
            function Label(displayText, angle) {
                if (displayText === void 0) { displayText = ""; }
                if (angle === void 0) { angle = 0; }
                _super.call(this);
                this.addClass("label");
                this.text(displayText);
                this.angle(angle);
                this.xAlignment("center").yAlignment("center");
                this._padding = 0;
            }
            Label.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
                var desiredWH = this._measurer.measure(this._text);
                var desiredWidth = (this.angle() === 0 ? desiredWH.width : desiredWH.height) + 2 * this.padding();
                var desiredHeight = (this.angle() === 0 ? desiredWH.height : desiredWH.width) + 2 * this.padding();
                return {
                    minWidth: desiredWidth,
                    minHeight: desiredHeight
                };
            };
            Label.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._textContainer = this.content().append("g");
                this._measurer = new SVGTypewriter.Measurers.Measurer(this._textContainer);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
                this.text(this._text);
            };
            Label.prototype.text = function (displayText) {
                if (displayText == null) {
                    return this._text;
                }
                else {
                    if (typeof displayText !== "string") {
                        throw new Error("Label.text() only takes strings as input");
                    }
                    this._text = displayText;
                    this.redraw();
                    return this;
                }
            };
            Label.prototype.angle = function (angle) {
                if (angle == null) {
                    return this._angle;
                }
                else {
                    angle %= 360;
                    if (angle > 180) {
                        angle -= 360;
                    }
                    else if (angle < -180) {
                        angle += 360;
                    }
                    if (angle === -90 || angle === 0 || angle === 90) {
                        this._angle = angle;
                    }
                    else {
                        throw new Error(angle + " is not a valid angle for Label");
                    }
                    this.redraw();
                    return this;
                }
            };
            Label.prototype.padding = function (padAmount) {
                if (padAmount == null) {
                    return this._padding;
                }
                else {
                    padAmount = +padAmount;
                    if (padAmount < 0) {
                        throw new Error(padAmount + " is not a valid padding value. Cannot be less than 0.");
                    }
                    this._padding = padAmount;
                    this.redraw();
                    return this;
                }
            };
            Label.prototype.fixedWidth = function () {
                return true;
            };
            Label.prototype.fixedHeight = function () {
                return true;
            };
            Label.prototype.renderImmediately = function () {
                _super.prototype.renderImmediately.call(this);
                // HACKHACK SVGTypewriter should remove existing content - #21 on SVGTypewriter.
                this._textContainer.selectAll("g").remove();
                var textMeasurement = this._measurer.measure(this._text);
                var heightPadding = Math.max(Math.min((this.height() - textMeasurement.height) / 2, this.padding()), 0);
                var widthPadding = Math.max(Math.min((this.width() - textMeasurement.width) / 2, this.padding()), 0);
                this._textContainer.attr("transform", "translate(" + widthPadding + "," + heightPadding + ")");
                var writeWidth = this.width() - 2 * widthPadding;
                var writeHeight = this.height() - 2 * heightPadding;
                var writeOptions = {
                    selection: this._textContainer,
                    xAlign: this.xAlignment(),
                    yAlign: this.yAlignment(),
                    textRotation: this.angle()
                };
                this._writer.write(this._text, writeWidth, writeHeight, writeOptions);
                return this;
            };
            return Label;
        })(Plottable.Component);
        Components.Label = Label;
        var TitleLabel = (function (_super) {
            __extends(TitleLabel, _super);
            /**
             * @constructor
             * @param {string} [text]
             * @param {number} [angle] One of -90/0/90. 0 is horizontal.
             */
            function TitleLabel(text, angle) {
                _super.call(this, text, angle);
                this.addClass(TitleLabel.TITLE_LABEL_CLASS);
            }
            TitleLabel.TITLE_LABEL_CLASS = "title-label";
            return TitleLabel;
        })(Label);
        Components.TitleLabel = TitleLabel;
        var AxisLabel = (function (_super) {
            __extends(AxisLabel, _super);
            /**
             * @constructor
             * @param {string} [text]
             * @param {number} [angle] One of -90/0/90. 0 is horizontal.
             */
            function AxisLabel(text, angle) {
                _super.call(this, text, angle);
                this.addClass(AxisLabel.AXIS_LABEL_CLASS);
            }
            AxisLabel.AXIS_LABEL_CLASS = "axis-label";
            return AxisLabel;
        })(Label);
        Components.AxisLabel = AxisLabel;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var Legend = (function (_super) {
            __extends(Legend, _super);
            /**
             * The Legend consists of a series of entries, each with a color and label taken from the Color Scale.
             *
             * @constructor
             * @param {Scale.Color} scale
             */
            function Legend(colorScale) {
                var _this = this;
                _super.call(this);
                this._padding = 5;
                this.addClass("legend");
                this.maxEntriesPerRow(1);
                if (colorScale == null) {
                    throw new Error("Legend requires a colorScale");
                }
                this._colorScale = colorScale;
                this._redrawCallback = function (scale) { return _this.redraw(); };
                this._colorScale.onUpdate(this._redrawCallback);
                this._formatter = Plottable.Formatters.identity();
                this.xAlignment("right").yAlignment("top");
                this.comparator(function (a, b) {
                    var formattedText = _this._colorScale.domain().slice().map(function (d) { return _this._formatter(d); });
                    return formattedText.indexOf(a) - formattedText.indexOf(b);
                });
                this._symbolFactoryAccessor = function () { return Plottable.SymbolFactories.circle(); };
                this._symbolOpacityAccessor = function () { return 1; };
            }
            Legend.prototype._setup = function () {
                _super.prototype._setup.call(this);
                var fakeLegendRow = this.content().append("g").classed(Legend.LEGEND_ROW_CLASS, true);
                var fakeLegendEntry = fakeLegendRow.append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
                fakeLegendEntry.append("text");
                this._measurer = new SVGTypewriter.Measurers.Measurer(fakeLegendRow);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper().maxLines(1);
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper).addTitleElement(Plottable.Configs.ADD_TITLE_ELEMENTS);
            };
            Legend.prototype.formatter = function (formatter) {
                if (formatter == null) {
                    return this._formatter;
                }
                this._formatter = formatter;
                this.redraw();
                return this;
            };
            Legend.prototype.maxEntriesPerRow = function (maxEntriesPerRow) {
                if (maxEntriesPerRow == null) {
                    return this._maxEntriesPerRow;
                }
                else {
                    this._maxEntriesPerRow = maxEntriesPerRow;
                    this.redraw();
                    return this;
                }
            };
            Legend.prototype.comparator = function (comparator) {
                if (comparator == null) {
                    return this._comparator;
                }
                else {
                    this._comparator = comparator;
                    this.redraw();
                    return this;
                }
            };
            Legend.prototype.colorScale = function (colorScale) {
                if (colorScale != null) {
                    this._colorScale.offUpdate(this._redrawCallback);
                    this._colorScale = colorScale;
                    this._colorScale.onUpdate(this._redrawCallback);
                    this.redraw();
                    return this;
                }
                else {
                    return this._colorScale;
                }
            };
            Legend.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                this._colorScale.offUpdate(this._redrawCallback);
            };
            Legend.prototype._calculateLayoutInfo = function (availableWidth, availableHeight) {
                var _this = this;
                var textHeight = this._measurer.measure().height;
                var availableWidthForEntries = Math.max(0, (availableWidth - this._padding));
                var entryNames = this._colorScale.domain().slice().sort(function (a, b) { return _this._comparator(_this._formatter(a), _this._formatter(b)); });
                var entryLengths = d3.map();
                var untruncatedEntryLengths = d3.map();
                entryNames.forEach(function (entryName) {
                    var untruncatedEntryLength = textHeight + _this._measurer.measure(_this._formatter(entryName)).width + _this._padding;
                    var entryLength = Math.min(untruncatedEntryLength, availableWidthForEntries);
                    entryLengths.set(entryName, entryLength);
                    untruncatedEntryLengths.set(entryName, untruncatedEntryLength);
                });
                var rows = this._packRows(availableWidthForEntries, entryNames, entryLengths);
                var rowsAvailable = Math.floor((availableHeight - 2 * this._padding) / textHeight);
                if (rowsAvailable !== rowsAvailable) {
                    rowsAvailable = 0;
                }
                return {
                    textHeight: textHeight,
                    entryLengths: entryLengths,
                    untruncatedEntryLengths: untruncatedEntryLengths,
                    rows: rows,
                    numRowsToDraw: Math.max(Math.min(rowsAvailable, rows.length), 0)
                };
            };
            Legend.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
                var estimatedLayout = this._calculateLayoutInfo(offeredWidth, offeredHeight);
                var untruncatedRowLengths = estimatedLayout.rows.map(function (row) {
                    return d3.sum(row, function (entry) { return estimatedLayout.untruncatedEntryLengths.get(entry); });
                });
                var longestUntruncatedRowLength = Plottable.Utils.Math.max(untruncatedRowLengths, 0);
                return {
                    minWidth: this._padding + longestUntruncatedRowLength,
                    minHeight: estimatedLayout.rows.length * estimatedLayout.textHeight + 2 * this._padding
                };
            };
            Legend.prototype._packRows = function (availableWidth, entries, entryLengths) {
                var _this = this;
                var rows = [];
                var currentRow = [];
                var spaceLeft = availableWidth;
                entries.forEach(function (e) {
                    var entryLength = entryLengths.get(e);
                    if (entryLength > spaceLeft || currentRow.length === _this._maxEntriesPerRow) {
                        rows.push(currentRow);
                        currentRow = [];
                        spaceLeft = availableWidth;
                    }
                    currentRow.push(e);
                    spaceLeft -= entryLength;
                });
                if (currentRow.length !== 0) {
                    rows.push(currentRow);
                }
                return rows;
            };
            /**
             * Gets the Entities (representing Legend entries) at a particular point.
             * Returns an empty array if no Entities are present at that location.
             *
             * @param {Point} p
             * @returns {Entity<Legend>[]}
             */
            Legend.prototype.entitiesAt = function (p) {
                if (!this._isSetup) {
                    return [];
                }
                var entities = [];
                var layout = this._calculateLayoutInfo(this.width(), this.height());
                var legendPadding = this._padding;
                var legend = this;
                this.content().selectAll("g." + Legend.LEGEND_ROW_CLASS).each(function (d, i) {
                    var lowY = i * layout.textHeight + legendPadding;
                    var highY = (i + 1) * layout.textHeight + legendPadding;
                    var symbolY = (lowY + highY) / 2;
                    var lowX = legendPadding;
                    var highX = legendPadding;
                    d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS).each(function (value) {
                        highX += layout.entryLengths.get(value);
                        var symbolX = lowX + layout.textHeight / 2;
                        if (highX >= p.x && lowX <= p.x &&
                            highY >= p.y && lowY <= p.y) {
                            var entrySelection = d3.select(this);
                            var datum = entrySelection.datum();
                            entities.push({
                                datum: datum,
                                position: { x: symbolX, y: symbolY },
                                selection: entrySelection,
                                component: legend
                            });
                        }
                        lowX += layout.entryLengths.get(value);
                    });
                });
                return entities;
            };
            Legend.prototype.renderImmediately = function () {
                var _this = this;
                _super.prototype.renderImmediately.call(this);
                var layout = this._calculateLayoutInfo(this.width(), this.height());
                var rowsToDraw = layout.rows.slice(0, layout.numRowsToDraw);
                var rows = this.content().selectAll("g." + Legend.LEGEND_ROW_CLASS).data(rowsToDraw);
                rows.enter().append("g").classed(Legend.LEGEND_ROW_CLASS, true);
                rows.exit().remove();
                rows.attr("transform", function (d, i) { return "translate(0, " + (i * layout.textHeight + _this._padding) + ")"; });
                var entries = rows.selectAll("g." + Legend.LEGEND_ENTRY_CLASS).data(function (d) { return d; });
                var entriesEnter = entries.enter().append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
                entriesEnter.append("path");
                entriesEnter.append("g").classed("text-container", true);
                entries.exit().remove();
                var legendPadding = this._padding;
                rows.each(function (values) {
                    var xShift = legendPadding;
                    var entriesInRow = d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS);
                    entriesInRow.attr("transform", function (value, i) {
                        var translateString = "translate(" + xShift + ", 0)";
                        xShift += layout.entryLengths.get(value);
                        return translateString;
                    });
                });
                entries.select("path").attr("d", function (d, i, j) { return _this.symbol()(d, j)(layout.textHeight * 0.6); })
                    .attr("transform", "translate(" + (layout.textHeight / 2) + "," + layout.textHeight / 2 + ")")
                    .attr("fill", function (value) { return _this._colorScale.scale(value); })
                    .attr("opacity", function (d, i, j) { return _this.symbolOpacity()(d, j); })
                    .classed(Legend.LEGEND_SYMBOL_CLASS, true);
                var padding = this._padding;
                var textContainers = entries.select("g.text-container");
                textContainers.text(""); // clear out previous results
                var self = this;
                textContainers.attr("transform", "translate(" + layout.textHeight + ", 0)")
                    .each(function (value) {
                    var container = d3.select(this);
                    var maxTextLength = layout.entryLengths.get(value) - layout.textHeight - padding;
                    var writeOptions = {
                        selection: container,
                        xAlign: "left",
                        yAlign: "top",
                        textRotation: 0
                    };
                    self._writer.write(self._formatter(value), maxTextLength, self.height(), writeOptions);
                });
                return this;
            };
            Legend.prototype.symbol = function (symbol) {
                if (symbol == null) {
                    return this._symbolFactoryAccessor;
                }
                else {
                    this._symbolFactoryAccessor = symbol;
                    this.render();
                    return this;
                }
            };
            Legend.prototype.symbolOpacity = function (symbolOpacity) {
                if (symbolOpacity == null) {
                    return this._symbolOpacityAccessor;
                }
                else if (typeof symbolOpacity === "number") {
                    this._symbolOpacityAccessor = function () { return symbolOpacity; };
                }
                else {
                    this._symbolOpacityAccessor = symbolOpacity;
                }
                this.render();
                return this;
            };
            Legend.prototype.fixedWidth = function () {
                return true;
            };
            Legend.prototype.fixedHeight = function () {
                return true;
            };
            /**
             * The css class applied to each legend row
             */
            Legend.LEGEND_ROW_CLASS = "legend-row";
            /**
             * The css class applied to each legend entry
             */
            Legend.LEGEND_ENTRY_CLASS = "legend-entry";
            /**
             * The css class applied to each legend symbol
             */
            Legend.LEGEND_SYMBOL_CLASS = "legend-symbol";
            return Legend;
        })(Plottable.Component);
        Components.Legend = Legend;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var InterpolatedColorLegend = (function (_super) {
            __extends(InterpolatedColorLegend, _super);
            /**
             * Creates an InterpolatedColorLegend.
             *
             * The InterpolatedColorLegend consists of a sequence of swatches that show the
             * associated InterpolatedColor Scale sampled at various points.
             * Two labels show the maximum and minimum values of the InterpolatedColor Scale.
             *
             * @constructor
             * @param {Scales.InterpolatedColor} interpolatedColorScale
             */
            function InterpolatedColorLegend(interpolatedColorScale) {
                var _this = this;
                _super.call(this);
                this._textPadding = 5;
                if (interpolatedColorScale == null) {
                    throw new Error("InterpolatedColorLegend requires a interpolatedColorScale");
                }
                this._scale = interpolatedColorScale;
                this._redrawCallback = function (scale) { return _this.redraw(); };
                this._scale.onUpdate(this._redrawCallback);
                this._formatter = Plottable.Formatters.general();
                this._orientation = "horizontal";
                this._expands = false;
                this.addClass("legend");
                this.addClass("interpolated-color-legend");
            }
            InterpolatedColorLegend.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                this._scale.offUpdate(this._redrawCallback);
            };
            InterpolatedColorLegend.prototype.formatter = function (formatter) {
                if (formatter === undefined) {
                    return this._formatter;
                }
                this._formatter = formatter;
                this.redraw();
                return this;
            };
            InterpolatedColorLegend.prototype.expands = function (expands) {
                if (expands == null) {
                    return this._expands;
                }
                this._expands = expands;
                this.redraw();
                return this;
            };
            InterpolatedColorLegend._ensureOrientation = function (orientation) {
                orientation = orientation.toLowerCase();
                if (orientation === "horizontal" || orientation === "left" || orientation === "right") {
                    return orientation;
                }
                else {
                    throw new Error("\"" + orientation + "\" is not a valid orientation for InterpolatedColorLegend");
                }
            };
            InterpolatedColorLegend.prototype.orientation = function (orientation) {
                if (orientation == null) {
                    return this._orientation;
                }
                else {
                    this._orientation = InterpolatedColorLegend._ensureOrientation(orientation);
                    this.redraw();
                    return this;
                }
            };
            InterpolatedColorLegend.prototype.fixedWidth = function () {
                return !this.expands() || this._isVertical();
            };
            InterpolatedColorLegend.prototype.fixedHeight = function () {
                return !this.expands() || !this._isVertical();
            };
            InterpolatedColorLegend.prototype._generateTicks = function (numSwatches) {
                if (numSwatches === void 0) { numSwatches = InterpolatedColorLegend._DEFAULT_NUM_SWATCHES; }
                var domain = this._scale.domain();
                if (numSwatches === 1) {
                    return [domain[0]];
                }
                var slope = (domain[1] - domain[0]) / (numSwatches - 1);
                var ticks = [];
                for (var i = 0; i < numSwatches; i++) {
                    ticks.push(domain[0] + slope * i);
                }
                return ticks;
            };
            InterpolatedColorLegend.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._swatchContainer = this.content().append("g").classed("swatch-container", true);
                this._swatchBoundingBox = this.content().append("rect").classed("swatch-bounding-box", true);
                this._lowerLabel = this.content().append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
                this._upperLabel = this.content().append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
                this._measurer = new SVGTypewriter.Measurers.Measurer(this.content());
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
            };
            InterpolatedColorLegend.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
                var _this = this;
                var textHeight = this._measurer.measure().height;
                var padding = textHeight;
                var domain = this._scale.domain();
                var labelWidths = domain.map(function (d) { return _this._measurer.measure(_this._formatter(d)).width; });
                var desiredHeight;
                var desiredWidth;
                var numSwatches = InterpolatedColorLegend._DEFAULT_NUM_SWATCHES;
                if (this._isVertical()) {
                    var longestWidth = Plottable.Utils.Math.max(labelWidths, 0);
                    desiredWidth = padding + textHeight + this._textPadding + longestWidth + this._textPadding;
                    desiredHeight = numSwatches * textHeight;
                }
                else {
                    desiredHeight = padding + textHeight + padding;
                    desiredWidth = this._textPadding + labelWidths[0] + numSwatches * textHeight
                        + labelWidths[1] + this._textPadding;
                }
                return {
                    minWidth: desiredWidth,
                    minHeight: desiredHeight
                };
            };
            InterpolatedColorLegend.prototype._isVertical = function () {
                return this._orientation !== "horizontal";
            };
            InterpolatedColorLegend.prototype.renderImmediately = function () {
                var _this = this;
                _super.prototype.renderImmediately.call(this);
                var domain = this._scale.domain();
                var text0 = this._formatter(domain[0]);
                var text0Width = this._measurer.measure(text0).width;
                var text1 = this._formatter(domain[1]);
                var text1Width = this._measurer.measure(text1).width;
                var textHeight = this._measurer.measure().height;
                var textPadding = this._textPadding;
                var upperLabelShift = { x: 0, y: 0 };
                var lowerLabelShift = { x: 0, y: 0 };
                var lowerWriteOptions = {
                    selection: this._lowerLabel,
                    xAlign: "center",
                    yAlign: "center",
                    textRotation: 0
                };
                var upperWriteOptions = {
                    selection: this._upperLabel,
                    xAlign: "center",
                    yAlign: "center",
                    textRotation: 0
                };
                var swatchWidth;
                var swatchHeight;
                var swatchX;
                var swatchY;
                var boundingBoxAttr = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                var padding;
                var numSwatches;
                if (this._isVertical()) {
                    numSwatches = Math.floor(this.height());
                    var longestTextWidth = Math.max(text0Width, text1Width);
                    padding = (this.width() - longestTextWidth - 2 * this._textPadding) / 2;
                    swatchWidth = Math.max(this.width() - padding - 2 * textPadding - longestTextWidth, 0);
                    swatchHeight = 1;
                    swatchY = function (d, i) { return _this.height() - (i + 1); };
                    upperWriteOptions.yAlign = "top";
                    upperLabelShift.y = 0;
                    lowerWriteOptions.yAlign = "bottom";
                    lowerLabelShift.y = 0;
                    if (this._orientation === "left") {
                        swatchX = function (d, i) { return textPadding + longestTextWidth + textPadding; };
                        upperWriteOptions.xAlign = "right";
                        upperLabelShift.x = -(padding + swatchWidth + textPadding);
                        lowerWriteOptions.xAlign = "right";
                        lowerLabelShift.x = -(padding + swatchWidth + textPadding);
                    }
                    else {
                        swatchX = function (d, i) { return padding; };
                        upperWriteOptions.xAlign = "left";
                        upperLabelShift.x = padding + swatchWidth + textPadding;
                        lowerWriteOptions.xAlign = "left";
                        lowerLabelShift.x = padding + swatchWidth + textPadding;
                    }
                    boundingBoxAttr["width"] = swatchWidth;
                    boundingBoxAttr["height"] = numSwatches * swatchHeight;
                }
                else {
                    padding = Math.max(textPadding, (this.height() - textHeight) / 2);
                    numSwatches = Math.max(Math.floor(this.width() - textPadding * 4 - text0Width - text1Width), 0);
                    swatchWidth = 1;
                    swatchHeight = Math.max((this.height() - 2 * padding), 0);
                    swatchX = function (d, i) { return Math.floor(text0Width + 2 * textPadding) + i; };
                    swatchY = function (d, i) { return padding; };
                    upperWriteOptions.xAlign = "right";
                    upperLabelShift.x = -textPadding;
                    lowerWriteOptions.xAlign = "left";
                    lowerLabelShift.x = textPadding;
                    boundingBoxAttr["y"] = padding;
                    boundingBoxAttr["width"] = numSwatches * swatchWidth;
                    boundingBoxAttr["height"] = swatchHeight;
                }
                boundingBoxAttr["x"] = swatchX(null, 0); // position of the first swatch
                this._upperLabel.text(""); // clear the upper label
                this._writer.write(text1, this.width(), this.height(), upperWriteOptions);
                var upperTranslateString = "translate(" + upperLabelShift.x + ", " + upperLabelShift.y + ")";
                this._upperLabel.attr("transform", upperTranslateString);
                this._lowerLabel.text(""); // clear the lower label
                this._writer.write(text0, this.width(), this.height(), lowerWriteOptions);
                var lowerTranslateString = "translate(" + lowerLabelShift.x + ", " + lowerLabelShift.y + ")";
                this._lowerLabel.attr("transform", lowerTranslateString);
                this._swatchBoundingBox.attr(boundingBoxAttr);
                var ticks = this._generateTicks(numSwatches);
                var swatches = this._swatchContainer.selectAll("rect.swatch").data(ticks);
                var rects = swatches.enter().append("rect").classed("swatch", true);
                swatches.exit().remove();
                swatches.attr({
                    "fill": function (d, i) { return _this._scale.scale(d); },
                    "width": swatchWidth,
                    "height": swatchHeight,
                    "x": swatchX,
                    "y": swatchY,
                    "shape-rendering": "crispEdges"
                });
                if (Plottable.Configs.ADD_TITLE_ELEMENTS) {
                    rects.append("title").text(function (d) { return _this._formatter(d); });
                }
                return this;
            };
            InterpolatedColorLegend._DEFAULT_NUM_SWATCHES = 11;
            /**
             * The css class applied to the legend labels.
             */
            InterpolatedColorLegend.LEGEND_LABEL_CLASS = "legend-label";
            return InterpolatedColorLegend;
        })(Plottable.Component);
        Components.InterpolatedColorLegend = InterpolatedColorLegend;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var Gridlines = (function (_super) {
            __extends(Gridlines, _super);
            /**
             * @constructor
             * @param {QuantitativeScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
             * @param {QuantitativeScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
             */
            function Gridlines(xScale, yScale) {
                var _this = this;
                if (xScale != null && !(Plottable.QuantitativeScale.prototype.isPrototypeOf(xScale))) {
                    throw new Error("xScale needs to inherit from Scale.QuantitativeScale");
                }
                if (yScale != null && !(Plottable.QuantitativeScale.prototype.isPrototypeOf(yScale))) {
                    throw new Error("yScale needs to inherit from Scale.QuantitativeScale");
                }
                _super.call(this);
                this.addClass("gridlines");
                this._xScale = xScale;
                this._yScale = yScale;
                this._renderCallback = function (scale) { return _this.render(); };
                if (this._xScale) {
                    this._xScale.onUpdate(this._renderCallback);
                }
                if (this._yScale) {
                    this._yScale.onUpdate(this._renderCallback);
                }
            }
            Gridlines.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                if (this._xScale) {
                    this._xScale.offUpdate(this._renderCallback);
                }
                if (this._yScale) {
                    this._yScale.offUpdate(this._renderCallback);
                }
                return this;
            };
            Gridlines.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._xLinesContainer = this.content().append("g").classed("x-gridlines", true);
                this._yLinesContainer = this.content().append("g").classed("y-gridlines", true);
            };
            Gridlines.prototype.renderImmediately = function () {
                _super.prototype.renderImmediately.call(this);
                this._redrawXLines();
                this._redrawYLines();
                return this;
            };
            Gridlines.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                if (this._xScale != null) {
                    this._xScale.range([0, this.width()]);
                }
                if (this._yScale != null) {
                    this._yScale.range([this.height(), 0]);
                }
                return this;
            };
            Gridlines.prototype._redrawXLines = function () {
                var _this = this;
                if (this._xScale) {
                    var xTicks = this._xScale.ticks();
                    var getScaledXValue = function (tickVal) { return _this._xScale.scale(tickVal); };
                    var xLines = this._xLinesContainer.selectAll("line").data(xTicks);
                    xLines.enter().append("line");
                    xLines.attr("x1", getScaledXValue)
                        .attr("y1", 0)
                        .attr("x2", getScaledXValue)
                        .attr("y2", this.height())
                        .classed("zeroline", function (t) { return t === 0; });
                    xLines.exit().remove();
                }
            };
            Gridlines.prototype._redrawYLines = function () {
                var _this = this;
                if (this._yScale) {
                    var yTicks = this._yScale.ticks();
                    var getScaledYValue = function (tickVal) { return _this._yScale.scale(tickVal); };
                    var yLines = this._yLinesContainer.selectAll("line").data(yTicks);
                    yLines.enter().append("line");
                    yLines.attr("x1", 0)
                        .attr("y1", getScaledYValue)
                        .attr("x2", this.width())
                        .attr("y2", getScaledYValue)
                        .classed("zeroline", function (t) { return t === 0; });
                    yLines.exit().remove();
                }
            };
            return Gridlines;
        })(Plottable.Component);
        Components.Gridlines = Gridlines;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var Table = (function (_super) {
            __extends(Table, _super);
            /**
             * A Table combines Components in the form of a grid. A
             * common case is combining a y-axis, x-axis, and the plotted data via
             * ```typescript
             * new Table([[yAxis, plot],
             *            [null,  xAxis]]);
             * ```
             *
             * @constructor
             * @param {Component[][]} [rows=[]] A 2-D array of Components to be added to the Table.
             *   null can be used if a cell is empty.
             */
            function Table(rows) {
                var _this = this;
                if (rows === void 0) { rows = []; }
                _super.call(this);
                this._rowPadding = 0;
                this._columnPadding = 0;
                this._rows = [];
                this._rowWeights = [];
                this._columnWeights = [];
                this._nRows = 0;
                this._nCols = 0;
                this._calculatedLayout = null;
                this.addClass("table");
                rows.forEach(function (row, rowIndex) {
                    row.forEach(function (component, colIndex) {
                        if (component != null) {
                            _this.add(component, rowIndex, colIndex);
                        }
                    });
                });
            }
            Table.prototype._forEach = function (callback) {
                for (var r = 0; r < this._nRows; r++) {
                    for (var c = 0; c < this._nCols; c++) {
                        if (this._rows[r][c] != null) {
                            callback(this._rows[r][c]);
                        }
                    }
                }
            };
            /**
             * Checks whether the specified Component is in the Table.
             */
            Table.prototype.has = function (component) {
                for (var r = 0; r < this._nRows; r++) {
                    for (var c = 0; c < this._nCols; c++) {
                        if (this._rows[r][c] === component) {
                            return true;
                        }
                    }
                }
                return false;
            };
            /**
             * Returns the Component at the specified row and column index.
             *
             * @param {number} rowIndex
             * @param {number} columnIndex
             * @returns {Component} The Component at the specified position, or null if no Component is there.
             */
            Table.prototype.componentAt = function (rowIndex, columnIndex) {
                if (rowIndex < 0 || rowIndex >= this._nRows || columnIndex < 0 || columnIndex >= this._nCols) {
                    return null;
                }
                return this._rows[rowIndex][columnIndex];
            };
            ;
            /**
             * Adds a Component in the specified row and column position.
             *
             * For example, instead of calling `new Table([[a, b], [null, c]])`, you
             * could call
             * var table = new Plottable.Components.Table();
             * table.add(a, 0, 0);
             * table.add(b, 0, 1);
             * table.add(c, 1, 1);
             *
             * @param {Component} component The Component to be added.
             * @param {number} row
             * @param {number} col
             * @returns {Table} The calling Table.
             */
            Table.prototype.add = function (component, row, col) {
                if (component == null) {
                    throw Error("Cannot add null to a table cell");
                }
                if (!this.has(component)) {
                    var currentComponent = this._rows[row] && this._rows[row][col];
                    if (currentComponent != null) {
                        throw new Error("cell is occupied");
                    }
                    component.detach();
                    this._nRows = Math.max(row + 1, this._nRows);
                    this._nCols = Math.max(col + 1, this._nCols);
                    this._padTableToSize(this._nRows, this._nCols);
                    this._rows[row][col] = component;
                    this._adoptAndAnchor(component);
                    this.redraw();
                }
                return this;
            };
            Table.prototype._remove = function (component) {
                for (var r = 0; r < this._nRows; r++) {
                    for (var c = 0; c < this._nCols; c++) {
                        if (this._rows[r][c] === component) {
                            this._rows[r][c] = null;
                            return true;
                        }
                    }
                }
                return false;
            };
            Table.prototype._iterateLayout = function (availableWidth, availableHeight, isFinalOffer) {
                if (isFinalOffer === void 0) { isFinalOffer = false; }
                /*
                 * Given availableWidth and availableHeight, figure out how to allocate it between rows and columns using an iterative algorithm.
                 *
                 * For both dimensions, keeps track of "guaranteedSpace", which the fixed-size components have requested, and
                 * "proportionalSpace", which is being given to proportionally-growing components according to the weights on the table.
                 * Here is how it works (example uses width but it is the same for height). First, columns are guaranteed no width, and
                 * the free width is allocated to columns based on their colWeights. Then, in determineGuarantees, every component is
                 * offered its column's width and may request some amount of it, which increases that column's guaranteed
                 * width. If there are some components that were not satisfied with the width they were offered, and there is free
                 * width that has not already been guaranteed, then the remaining width is allocated to the unsatisfied columns and the
                 * algorithm runs again. If all components are satisfied, then the remaining width is allocated as proportional space
                 * according to the colWeights.
                 *
                 * The guaranteed width for each column is monotonically increasing as the algorithm iterates. Since it is deterministic
                 * and monotonically increasing, if the freeWidth does not change during an iteration it implies that no further progress
                 * is possible, so the algorithm will not continue iterating on that dimension's account.
                 *
                 * If the algorithm runs more than 5 times, we stop and just use whatever we arrived at. It's not clear under what
                 * circumstances this will happen or if it will happen at all. A message will be printed to the console if this occurs.
                 *
                 */
                var rows = this._rows;
                var cols = d3.transpose(this._rows);
                var availableWidthAfterPadding = availableWidth - this._columnPadding * (this._nCols - 1);
                var availableHeightAfterPadding = availableHeight - this._rowPadding * (this._nRows - 1);
                var rowWeights = Table._calcComponentWeights(this._rowWeights, rows, function (c) { return (c == null) || c.fixedHeight(); });
                var colWeights = Table._calcComponentWeights(this._columnWeights, cols, function (c) { return (c == null) || c.fixedWidth(); });
                // To give the table a good starting position to iterate from, we give the fixed-width components half-weight
                // so that they will get some initial space allocated to work with
                var heuristicColWeights = colWeights.map(function (c) { return c === 0 ? 0.5 : c; });
                var heuristicRowWeights = rowWeights.map(function (c) { return c === 0 ? 0.5 : c; });
                var colProportionalSpace = Table._calcProportionalSpace(heuristicColWeights, availableWidthAfterPadding);
                var rowProportionalSpace = Table._calcProportionalSpace(heuristicRowWeights, availableHeightAfterPadding);
                var guaranteedWidths = Plottable.Utils.Array.createFilledArray(0, this._nCols);
                var guaranteedHeights = Plottable.Utils.Array.createFilledArray(0, this._nRows);
                var freeWidth;
                var freeHeight;
                var nIterations = 0;
                var guarantees;
                var wantsWidth;
                var wantsHeight;
                while (true) {
                    var offeredHeights = Plottable.Utils.Array.add(guaranteedHeights, rowProportionalSpace);
                    var offeredWidths = Plottable.Utils.Array.add(guaranteedWidths, colProportionalSpace);
                    guarantees = this._determineGuarantees(offeredWidths, offeredHeights, isFinalOffer);
                    guaranteedWidths = guarantees.guaranteedWidths;
                    guaranteedHeights = guarantees.guaranteedHeights;
                    wantsWidth = guarantees.wantsWidthArr.some(function (x) { return x; });
                    wantsHeight = guarantees.wantsHeightArr.some(function (x) { return x; });
                    var lastFreeWidth = freeWidth;
                    var lastFreeHeight = freeHeight;
                    freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
                    freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
                    var xWeights = void 0;
                    if (wantsWidth) {
                        xWeights = guarantees.wantsWidthArr.map(function (x) { return x ? 0.1 : 0; });
                        xWeights = Plottable.Utils.Array.add(xWeights, colWeights);
                    }
                    else {
                        xWeights = colWeights;
                    }
                    var yWeights = void 0;
                    if (wantsHeight) {
                        yWeights = guarantees.wantsHeightArr.map(function (x) { return x ? 0.1 : 0; });
                        yWeights = Plottable.Utils.Array.add(yWeights, rowWeights);
                    }
                    else {
                        yWeights = rowWeights;
                    }
                    colProportionalSpace = Table._calcProportionalSpace(xWeights, freeWidth);
                    rowProportionalSpace = Table._calcProportionalSpace(yWeights, freeHeight);
                    nIterations++;
                    var canImproveWidthAllocation = freeWidth > 0 && freeWidth !== lastFreeWidth;
                    var canImproveHeightAllocation = freeHeight > 0 && freeHeight !== lastFreeHeight;
                    if (!(canImproveWidthAllocation || canImproveHeightAllocation)) {
                        break;
                    }
                    if (nIterations > 5) {
                        break;
                    }
                }
                // Redo the proportional space one last time, to ensure we use the real weights not the wantsWidth/Height weights
                freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
                freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
                colProportionalSpace = Table._calcProportionalSpace(colWeights, freeWidth);
                rowProportionalSpace = Table._calcProportionalSpace(rowWeights, freeHeight);
                return { colProportionalSpace: colProportionalSpace,
                    rowProportionalSpace: rowProportionalSpace,
                    guaranteedWidths: guarantees.guaranteedWidths,
                    guaranteedHeights: guarantees.guaranteedHeights,
                    wantsWidth: wantsWidth,
                    wantsHeight: wantsHeight };
            };
            Table.prototype._determineGuarantees = function (offeredWidths, offeredHeights, isFinalOffer) {
                if (isFinalOffer === void 0) { isFinalOffer = false; }
                var requestedWidths = Plottable.Utils.Array.createFilledArray(0, this._nCols);
                var requestedHeights = Plottable.Utils.Array.createFilledArray(0, this._nRows);
                var columnNeedsWidth = Plottable.Utils.Array.createFilledArray(false, this._nCols);
                var rowNeedsHeight = Plottable.Utils.Array.createFilledArray(false, this._nRows);
                this._rows.forEach(function (row, rowIndex) {
                    row.forEach(function (component, colIndex) {
                        var spaceRequest;
                        if (component != null) {
                            spaceRequest = component.requestedSpace(offeredWidths[colIndex], offeredHeights[rowIndex]);
                        }
                        else {
                            spaceRequest = {
                                minWidth: 0,
                                minHeight: 0
                            };
                        }
                        var columnWidth = isFinalOffer ? Math.min(spaceRequest.minWidth, offeredWidths[colIndex]) : spaceRequest.minWidth;
                        requestedWidths[colIndex] = Math.max(requestedWidths[colIndex], columnWidth);
                        var rowHeight = isFinalOffer ? Math.min(spaceRequest.minHeight, offeredHeights[rowIndex]) : spaceRequest.minHeight;
                        requestedHeights[rowIndex] = Math.max(requestedHeights[rowIndex], rowHeight);
                        var componentNeedsWidth = spaceRequest.minWidth > offeredWidths[colIndex];
                        columnNeedsWidth[colIndex] = columnNeedsWidth[colIndex] || componentNeedsWidth;
                        var componentNeedsHeight = spaceRequest.minHeight > offeredHeights[rowIndex];
                        rowNeedsHeight[rowIndex] = rowNeedsHeight[rowIndex] || componentNeedsHeight;
                    });
                });
                return {
                    guaranteedWidths: requestedWidths,
                    guaranteedHeights: requestedHeights,
                    wantsWidthArr: columnNeedsWidth,
                    wantsHeightArr: rowNeedsHeight
                };
            };
            Table.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
                this._calculatedLayout = this._iterateLayout(offeredWidth, offeredHeight);
                return {
                    minWidth: d3.sum(this._calculatedLayout.guaranteedWidths),
                    minHeight: d3.sum(this._calculatedLayout.guaranteedHeights)
                };
            };
            Table.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                var _this = this;
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                var lastLayoutWidth = d3.sum(this._calculatedLayout.guaranteedWidths);
                var lastLayoutHeight = d3.sum(this._calculatedLayout.guaranteedHeights);
                var layout = this._calculatedLayout;
                if (lastLayoutWidth > this.width() || lastLayoutHeight > this.height()) {
                    layout = this._iterateLayout(this.width(), this.height(), true);
                }
                var childYOrigin = 0;
                var rowHeights = Plottable.Utils.Array.add(layout.rowProportionalSpace, layout.guaranteedHeights);
                var colWidths = Plottable.Utils.Array.add(layout.colProportionalSpace, layout.guaranteedWidths);
                this._rows.forEach(function (row, rowIndex) {
                    var childXOrigin = 0;
                    row.forEach(function (component, colIndex) {
                        // recursively compute layout
                        if (component != null) {
                            component.computeLayout({ x: childXOrigin, y: childYOrigin }, colWidths[colIndex], rowHeights[rowIndex]);
                        }
                        childXOrigin += colWidths[colIndex] + _this._columnPadding;
                    });
                    childYOrigin += rowHeights[rowIndex] + _this._rowPadding;
                });
                return this;
            };
            Table.prototype.rowPadding = function (rowPadding) {
                if (rowPadding == null) {
                    return this._rowPadding;
                }
                this._rowPadding = rowPadding;
                this.redraw();
                return this;
            };
            Table.prototype.columnPadding = function (columnPadding) {
                if (columnPadding == null) {
                    return this._columnPadding;
                }
                this._columnPadding = columnPadding;
                this.redraw();
                return this;
            };
            Table.prototype.rowWeight = function (index, weight) {
                if (weight == null) {
                    return this._rowWeights[index];
                }
                this._rowWeights[index] = weight;
                this.redraw();
                return this;
            };
            Table.prototype.columnWeight = function (index, weight) {
                if (weight == null) {
                    return this._columnWeights[index];
                }
                this._columnWeights[index] = weight;
                this.redraw();
                return this;
            };
            Table.prototype.fixedWidth = function () {
                var cols = d3.transpose(this._rows);
                return Table._fixedSpace(cols, function (c) { return (c == null) || c.fixedWidth(); });
            };
            Table.prototype.fixedHeight = function () {
                return Table._fixedSpace(this._rows, function (c) { return (c == null) || c.fixedHeight(); });
            };
            Table.prototype._padTableToSize = function (nRows, nCols) {
                for (var i = 0; i < nRows; i++) {
                    if (this._rows[i] === undefined) {
                        this._rows[i] = [];
                        this._rowWeights[i] = null;
                    }
                    for (var j = 0; j < nCols; j++) {
                        if (this._rows[i][j] === undefined) {
                            this._rows[i][j] = null;
                        }
                    }
                }
                for (var j = 0; j < nCols; j++) {
                    if (this._columnWeights[j] === undefined) {
                        this._columnWeights[j] = null;
                    }
                }
            };
            Table._calcComponentWeights = function (setWeights, componentGroups, fixityAccessor) {
                // If the row/col weight was explicitly set, then return it outright
                // If the weight was not explicitly set, then guess it using the heuristic that if all components are fixed-space
                // then weight is 0, otherwise weight is 1
                return setWeights.map(function (w, i) {
                    if (w != null) {
                        return w;
                    }
                    var fixities = componentGroups[i].map(fixityAccessor);
                    var allFixed = fixities.reduce(function (a, b) { return a && b; }, true);
                    return allFixed ? 0 : 1;
                });
            };
            Table._calcProportionalSpace = function (weights, freeSpace) {
                var weightSum = d3.sum(weights);
                if (weightSum === 0) {
                    return Plottable.Utils.Array.createFilledArray(0, weights.length);
                }
                else {
                    return weights.map(function (w) { return freeSpace * w / weightSum; });
                }
            };
            Table._fixedSpace = function (componentGroup, fixityAccessor) {
                var all = function (bools) { return bools.reduce(function (a, b) { return a && b; }, true); };
                var groupIsFixed = function (components) { return all(components.map(fixityAccessor)); };
                return all(componentGroup.map(groupIsFixed));
            };
            return Table;
        })(Plottable.ComponentContainer);
        Components.Table = Table;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        (function (PropertyMode) {
            PropertyMode[PropertyMode["VALUE"] = 0] = "VALUE";
            PropertyMode[PropertyMode["PIXEL"] = 1] = "PIXEL";
        })(Components.PropertyMode || (Components.PropertyMode = {}));
        var PropertyMode = Components.PropertyMode;
        ;
        var SelectionBoxLayer = (function (_super) {
            __extends(SelectionBoxLayer, _super);
            function SelectionBoxLayer() {
                var _this = this;
                _super.call(this);
                this._boxVisible = false;
                this._boxBounds = {
                    topLeft: { x: 0, y: 0 },
                    bottomRight: { x: 0, y: 0 }
                };
                this._xBoundsMode = PropertyMode.PIXEL;
                this._yBoundsMode = PropertyMode.PIXEL;
                this.addClass("selection-box-layer");
                this._adjustBoundsCallback = function () {
                    _this.render();
                };
                this._clipPathEnabled = true;
                this._xExtent = [undefined, undefined];
                this._yExtent = [undefined, undefined];
            }
            SelectionBoxLayer.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._box = this.content().append("g").classed("selection-box", true).remove();
                this._boxArea = this._box.append("rect").classed("selection-area", true);
            };
            SelectionBoxLayer.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
                return {
                    width: availableWidth,
                    height: availableHeight
                };
            };
            SelectionBoxLayer.prototype.bounds = function (newBounds) {
                if (newBounds == null) {
                    return this._getBounds();
                }
                this._setBounds(newBounds);
                this._xBoundsMode = PropertyMode.PIXEL;
                this._yBoundsMode = PropertyMode.PIXEL;
                this.render();
                return this;
            };
            SelectionBoxLayer.prototype._setBounds = function (newBounds) {
                var topLeft = {
                    x: Math.min(newBounds.topLeft.x, newBounds.bottomRight.x),
                    y: Math.min(newBounds.topLeft.y, newBounds.bottomRight.y)
                };
                var bottomRight = {
                    x: Math.max(newBounds.topLeft.x, newBounds.bottomRight.x),
                    y: Math.max(newBounds.topLeft.y, newBounds.bottomRight.y)
                };
                this._boxBounds = {
                    topLeft: topLeft,
                    bottomRight: bottomRight
                };
            };
            SelectionBoxLayer.prototype._getBounds = function () {
                return {
                    topLeft: {
                        x: this._xBoundsMode === PropertyMode.PIXEL ?
                            this._boxBounds.topLeft.x :
                            (this._xScale == null ?
                                0 :
                                Math.min(this.xScale().scale(this.xExtent()[0]), this.xScale().scale(this.xExtent()[1]))),
                        y: this._yBoundsMode === PropertyMode.PIXEL ?
                            this._boxBounds.topLeft.y :
                            (this._yScale == null ?
                                0 :
                                Math.min(this.yScale().scale(this.yExtent()[0]), this.yScale().scale(this.yExtent()[1])))
                    },
                    bottomRight: {
                        x: this._xBoundsMode === PropertyMode.PIXEL ?
                            this._boxBounds.bottomRight.x :
                            (this._xScale == null ?
                                0 :
                                Math.max(this.xScale().scale(this.xExtent()[0]), this.xScale().scale(this.xExtent()[1]))),
                        y: this._yBoundsMode === PropertyMode.PIXEL ?
                            this._boxBounds.bottomRight.y :
                            (this._yScale == null ?
                                0 :
                                Math.max(this.yScale().scale(this.yExtent()[0]), this.yScale().scale(this.yExtent()[1])))
                    }
                };
            };
            SelectionBoxLayer.prototype.renderImmediately = function () {
                _super.prototype.renderImmediately.call(this);
                if (this._boxVisible) {
                    var bounds = this.bounds();
                    var t = bounds.topLeft.y;
                    var b = bounds.bottomRight.y;
                    var l = bounds.topLeft.x;
                    var r = bounds.bottomRight.x;
                    if (!(Plottable.Utils.Math.isValidNumber(t) &&
                        Plottable.Utils.Math.isValidNumber(b) &&
                        Plottable.Utils.Math.isValidNumber(l) &&
                        Plottable.Utils.Math.isValidNumber(r))) {
                        throw new Error("bounds have not been properly set");
                    }
                    this._boxArea.attr({
                        x: l, y: t, width: r - l, height: b - t
                    });
                    this.content().node().appendChild(this._box.node());
                }
                else {
                    this._box.remove();
                }
                return this;
            };
            SelectionBoxLayer.prototype.boxVisible = function (show) {
                if (show == null) {
                    return this._boxVisible;
                }
                this._boxVisible = show;
                this.render();
                return this;
            };
            SelectionBoxLayer.prototype.fixedWidth = function () {
                return true;
            };
            SelectionBoxLayer.prototype.fixedHeight = function () {
                return true;
            };
            SelectionBoxLayer.prototype.xScale = function (xScale) {
                if (xScale == null) {
                    return this._xScale;
                }
                if (this._xScale != null) {
                    this._xScale.offUpdate(this._adjustBoundsCallback);
                }
                this._xScale = xScale;
                this._xBoundsMode = PropertyMode.VALUE;
                this._xScale.onUpdate(this._adjustBoundsCallback);
                this.render();
                return this;
            };
            SelectionBoxLayer.prototype.yScale = function (yScale) {
                if (yScale == null) {
                    return this._yScale;
                }
                if (this._yScale != null) {
                    this._yScale.offUpdate(this._adjustBoundsCallback);
                }
                this._yScale = yScale;
                this._yBoundsMode = PropertyMode.VALUE;
                this._yScale.onUpdate(this._adjustBoundsCallback);
                this.render();
                return this;
            };
            SelectionBoxLayer.prototype.xExtent = function (xExtent) {
                // Explicit typing for Typescript 1.4
                if (xExtent == null) {
                    return this._getXExtent();
                }
                this._setXExtent(xExtent);
                this._xBoundsMode = PropertyMode.VALUE;
                this.render();
                return this;
            };
            SelectionBoxLayer.prototype._getXExtent = function () {
                return this._xBoundsMode === PropertyMode.VALUE ?
                    this._xExtent :
                    (this._xScale == null ?
                        [undefined, undefined] :
                        [this._xScale.invert(this._boxBounds.topLeft.x),
                            this._xScale.invert(this._boxBounds.bottomRight.x)]);
            };
            SelectionBoxLayer.prototype._setXExtent = function (xExtent) {
                this._xExtent = xExtent;
            };
            SelectionBoxLayer.prototype.yExtent = function (yExtent) {
                // Explicit typing for Typescript 1.4
                if (yExtent == null) {
                    return this._getYExtent();
                }
                this._setYExtent(yExtent);
                this._yBoundsMode = PropertyMode.VALUE;
                this.render();
                return this;
            };
            SelectionBoxLayer.prototype._getYExtent = function () {
                return this._yBoundsMode === PropertyMode.VALUE ?
                    this._yExtent :
                    (this._yScale == null ?
                        [undefined, undefined] :
                        [this._yScale.invert(this._boxBounds.topLeft.y),
                            this._yScale.invert(this._boxBounds.bottomRight.y)]);
            };
            SelectionBoxLayer.prototype._setYExtent = function (yExtent) {
                this._yExtent = yExtent;
            };
            SelectionBoxLayer.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                if (this._xScale != null) {
                    this.xScale().offUpdate(this._adjustBoundsCallback);
                }
                if (this._yScale != null) {
                    this.yScale().offUpdate(this._adjustBoundsCallback);
                }
            };
            return SelectionBoxLayer;
        })(Plottable.Component);
        Components.SelectionBoxLayer = SelectionBoxLayer;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var PropertyMode;
        (function (PropertyMode) {
            PropertyMode[PropertyMode["VALUE"] = 0] = "VALUE";
            PropertyMode[PropertyMode["PIXEL"] = 1] = "PIXEL";
        })(PropertyMode || (PropertyMode = {}));
        ;
        var GuideLineLayer = (function (_super) {
            __extends(GuideLineLayer, _super);
            function GuideLineLayer(orientation) {
                var _this = this;
                _super.call(this);
                this._mode = PropertyMode.VALUE;
                if (orientation !== GuideLineLayer.ORIENTATION_VERTICAL && orientation !== GuideLineLayer.ORIENTATION_HORIZONTAL) {
                    throw new Error(orientation + " is not a valid orientation for GuideLineLayer");
                }
                this._orientation = orientation;
                this._clipPathEnabled = true;
                this.addClass("guide-line-layer");
                if (this._isVertical()) {
                    this.addClass("vertical");
                }
                else {
                    this.addClass("horizontal");
                }
                this._scaleUpdateCallback = function () {
                    _this._syncPixelPositionAndValue();
                    _this.render();
                };
            }
            GuideLineLayer.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._guideLine = this.content().append("line").classed("guide-line", true);
            };
            GuideLineLayer.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
                return {
                    width: availableWidth,
                    height: availableHeight
                };
            };
            GuideLineLayer.prototype._isVertical = function () {
                return this._orientation === GuideLineLayer.ORIENTATION_VERTICAL;
            };
            GuideLineLayer.prototype.fixedWidth = function () {
                return true;
            };
            GuideLineLayer.prototype.fixedHeight = function () {
                return true;
            };
            GuideLineLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                if (this.scale() != null) {
                    if (this._isVertical()) {
                        this.scale().range([0, this.width()]);
                    }
                    else {
                        this.scale().range([this.height(), 0]);
                    }
                }
                return this;
            };
            GuideLineLayer.prototype.renderImmediately = function () {
                _super.prototype.renderImmediately.call(this);
                this._syncPixelPositionAndValue();
                this._guideLine.attr({
                    x1: this._isVertical() ? this.pixelPosition() : 0,
                    y1: this._isVertical() ? 0 : this.pixelPosition(),
                    x2: this._isVertical() ? this.pixelPosition() : this.width(),
                    y2: this._isVertical() ? this.height() : this.pixelPosition()
                });
                return this;
            };
            // sets pixelPosition() or value() based on the other, depending on which was the last one set
            GuideLineLayer.prototype._syncPixelPositionAndValue = function () {
                if (this.scale() == null) {
                    return;
                }
                if (this._mode === PropertyMode.VALUE && this.value() != null) {
                    this._pixelPosition = this.scale().scale(this.value());
                }
                else if (this._mode === PropertyMode.PIXEL && this.pixelPosition() != null) {
                    this._value = this.scale().invert(this.pixelPosition());
                }
            };
            GuideLineLayer.prototype._setPixelPositionWithoutChangingMode = function (pixelPosition) {
                this._pixelPosition = pixelPosition;
                if (this.scale() != null) {
                    this._value = this.scale().invert(this.pixelPosition());
                }
                this.render();
            };
            GuideLineLayer.prototype.scale = function (scale) {
                if (scale == null) {
                    return this._scale;
                }
                var previousScale = this._scale;
                if (previousScale != null) {
                    previousScale.offUpdate(this._scaleUpdateCallback);
                }
                this._scale = scale;
                this._scale.onUpdate(this._scaleUpdateCallback);
                this._syncPixelPositionAndValue();
                this.redraw();
                return this;
            };
            GuideLineLayer.prototype.value = function (value) {
                if (value == null) {
                    return this._value;
                }
                this._value = value;
                this._mode = PropertyMode.VALUE;
                this._syncPixelPositionAndValue();
                this.render();
                return this;
            };
            GuideLineLayer.prototype.pixelPosition = function (pixelPosition) {
                if (pixelPosition == null) {
                    return this._pixelPosition;
                }
                if (!Plottable.Utils.Math.isValidNumber(pixelPosition)) {
                    throw new Error("pixelPosition must be a finite number");
                }
                this._pixelPosition = pixelPosition;
                this._mode = PropertyMode.PIXEL;
                this._syncPixelPositionAndValue();
                this.render();
                return this;
            };
            GuideLineLayer.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                if (this.scale() != null) {
                    this.scale().offUpdate(this._scaleUpdateCallback);
                }
            };
            GuideLineLayer.ORIENTATION_VERTICAL = "vertical";
            GuideLineLayer.ORIENTATION_HORIZONTAL = "horizontal";
            return GuideLineLayer;
        })(Plottable.Component);
        Components.GuideLineLayer = GuideLineLayer;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Animator;
        (function (Animator) {
            Animator.MAIN = "main";
            Animator.RESET = "reset";
        })(Animator = Plots.Animator || (Plots.Animator = {}));
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plot = (function (_super) {
        __extends(Plot, _super);
        /**
         * A Plot draws some visualization of the inputted Datasets.
         *
         * @constructor
         */
        function Plot() {
            var _this = this;
            _super.call(this);
            this._dataChanged = false;
            this._animate = false;
            this._animators = {};
            this._clipPathEnabled = true;
            this.addClass("plot");
            this._datasetToDrawer = new Plottable.Utils.Map();
            this._attrBindings = d3.map();
            this._attrExtents = d3.map();
            this._includedValuesProvider = function (scale) { return _this._includedValuesForScale(scale); };
            this._renderCallback = function (scale) { return _this.render(); };
            this._onDatasetUpdateCallback = function () { return _this._onDatasetUpdate(); };
            this._propertyBindings = d3.map();
            this._propertyExtents = d3.map();
            var mainAnimator = new Plottable.Animators.Easing().maxTotalDuration(Plot._ANIMATION_MAX_DURATION);
            this.animator(Plottable.Plots.Animator.MAIN, mainAnimator);
            this.animator(Plottable.Plots.Animator.RESET, new Plottable.Animators.Null());
        }
        Plot.prototype.anchor = function (selection) {
            _super.prototype.anchor.call(this, selection);
            this._dataChanged = true;
            this._updateExtents();
            return this;
        };
        Plot.prototype._setup = function () {
            var _this = this;
            _super.prototype._setup.call(this);
            this._renderArea = this.content().append("g").classed("render-area", true);
            this.datasets().forEach(function (dataset) { return _this._createNodesForDataset(dataset); });
        };
        Plot.prototype.destroy = function () {
            var _this = this;
            _super.prototype.destroy.call(this);
            this._scales().forEach(function (scale) { return scale.offUpdate(_this._renderCallback); });
            this.datasets([]);
        };
        Plot.prototype._createNodesForDataset = function (dataset) {
            var drawer = this._datasetToDrawer.get(dataset);
            drawer.renderArea(this._renderArea.append("g"));
            return drawer;
        };
        Plot.prototype._createDrawer = function (dataset) {
            return new Plottable.Drawer(dataset);
        };
        Plot.prototype._getAnimator = function (key) {
            if (this._animateOnNextRender()) {
                return this._animators[key] || new Plottable.Animators.Null();
            }
            else {
                return new Plottable.Animators.Null();
            }
        };
        Plot.prototype._onDatasetUpdate = function () {
            this._updateExtents();
            this._dataChanged = true;
            this.render();
        };
        Plot.prototype.attr = function (attr, attrValue, scale) {
            if (attrValue == null) {
                return this._attrBindings.get(attr);
            }
            this._bindAttr(attr, attrValue, scale);
            this.render(); // queue a re-render upon changing projector
            return this;
        };
        Plot.prototype._bindProperty = function (property, value, scale) {
            var binding = this._propertyBindings.get(property);
            var oldScale = binding != null ? binding.scale : null;
            this._propertyBindings.set(property, { accessor: d3.functor(value), scale: scale });
            this._updateExtentsForProperty(property);
            if (oldScale != null) {
                this._uninstallScaleForKey(oldScale, property);
            }
            if (scale != null) {
                this._installScaleForKey(scale, property);
            }
        };
        Plot.prototype._bindAttr = function (attr, value, scale) {
            var binding = this._attrBindings.get(attr);
            var oldScale = binding != null ? binding.scale : null;
            this._attrBindings.set(attr, { accessor: d3.functor(value), scale: scale });
            this._updateExtentsForAttr(attr);
            if (oldScale != null) {
                this._uninstallScaleForKey(oldScale, attr);
            }
            if (scale != null) {
                this._installScaleForKey(scale, attr);
            }
        };
        Plot.prototype._generateAttrToProjector = function () {
            var h = {};
            this._attrBindings.forEach(function (attr, binding) {
                var accessor = binding.accessor;
                var scale = binding.scale;
                var fn = scale ? function (d, i, dataset) { return scale.scale(accessor(d, i, dataset)); } : accessor;
                h[attr] = fn;
            });
            var propertyProjectors = this._propertyProjectors();
            Object.keys(propertyProjectors).forEach(function (key) {
                if (h[key] == null) {
                    h[key] = propertyProjectors[key];
                }
            });
            return h;
        };
        Plot.prototype.renderImmediately = function () {
            _super.prototype.renderImmediately.call(this);
            if (this._isAnchored) {
                this._paint();
                this._dataChanged = false;
            }
            return this;
        };
        Plot.prototype.animated = function (willAnimate) {
            if (willAnimate == null) {
                return this._animate;
            }
            this._animate = willAnimate;
            return this;
        };
        Plot.prototype.detach = function () {
            _super.prototype.detach.call(this);
            // make the domain resize
            this._updateExtents();
            return this;
        };
        /**
         * @returns {Scale[]} A unique array of all scales currently used by the Plot.
         */
        Plot.prototype._scales = function () {
            var scales = [];
            this._attrBindings.forEach(function (attr, binding) {
                var scale = binding.scale;
                if (scale != null && scales.indexOf(scale) === -1) {
                    scales.push(scale);
                }
            });
            this._propertyBindings.forEach(function (property, binding) {
                var scale = binding.scale;
                if (scale != null && scales.indexOf(scale) === -1) {
                    scales.push(scale);
                }
            });
            return scales;
        };
        /**
         * Updates the extents associated with each attribute, then autodomains all scales the Plot uses.
         */
        Plot.prototype._updateExtents = function () {
            var _this = this;
            this._attrBindings.forEach(function (attr) { return _this._updateExtentsForAttr(attr); });
            this._propertyExtents.forEach(function (property) { return _this._updateExtentsForProperty(property); });
            this._scales().forEach(function (scale) { return scale.addIncludedValuesProvider(_this._includedValuesProvider); });
        };
        Plot.prototype._updateExtentsForAttr = function (attr) {
            // Filters should never be applied to attributes
            this._updateExtentsForKey(attr, this._attrBindings, this._attrExtents, null);
        };
        Plot.prototype._updateExtentsForProperty = function (property) {
            this._updateExtentsForKey(property, this._propertyBindings, this._propertyExtents, this._filterForProperty(property));
        };
        Plot.prototype._filterForProperty = function (property) {
            return null;
        };
        Plot.prototype._updateExtentsForKey = function (key, bindings, extents, filter) {
            var _this = this;
            var accScaleBinding = bindings.get(key);
            if (accScaleBinding == null || accScaleBinding.accessor == null) {
                return;
            }
            extents.set(key, this.datasets().map(function (dataset) { return _this._computeExtent(dataset, accScaleBinding, filter); }));
        };
        Plot.prototype._computeExtent = function (dataset, accScaleBinding, filter) {
            var accessor = accScaleBinding.accessor;
            var scale = accScaleBinding.scale;
            if (scale == null) {
                return [];
            }
            var data = dataset.data();
            if (filter != null) {
                data = data.filter(function (d, i) { return filter(d, i, dataset); });
            }
            var appliedAccessor = function (d, i) { return accessor(d, i, dataset); };
            var mappedData = data.map(appliedAccessor);
            return scale.extentOfValues(mappedData);
        };
        /**
         * Override in subclass to add special extents, such as included values
         */
        Plot.prototype._extentsForProperty = function (property) {
            return this._propertyExtents.get(property);
        };
        Plot.prototype._includedValuesForScale = function (scale) {
            var _this = this;
            if (!this._isAnchored) {
                return [];
            }
            var includedValues = [];
            this._attrBindings.forEach(function (attr, binding) {
                if (binding.scale === scale) {
                    var extents = _this._attrExtents.get(attr);
                    if (extents != null) {
                        includedValues = includedValues.concat(d3.merge(extents));
                    }
                }
            });
            this._propertyBindings.forEach(function (property, binding) {
                if (binding.scale === scale) {
                    var extents = _this._extentsForProperty(property);
                    if (extents != null) {
                        includedValues = includedValues.concat(d3.merge(extents));
                    }
                }
            });
            return includedValues;
        };
        Plot.prototype.animator = function (animatorKey, animator) {
            if (animator === undefined) {
                return this._animators[animatorKey];
            }
            else {
                this._animators[animatorKey] = animator;
                return this;
            }
        };
        /**
         * Adds a Dataset to the Plot.
         *
         * @param {Dataset} dataset
         * @returns {Plot} The calling Plot.
         */
        Plot.prototype.addDataset = function (dataset) {
            this._addDataset(dataset);
            this._onDatasetUpdate();
            return this;
        };
        Plot.prototype._addDataset = function (dataset) {
            this._removeDataset(dataset);
            var drawer = this._createDrawer(dataset);
            this._datasetToDrawer.set(dataset, drawer);
            if (this._isSetup) {
                this._createNodesForDataset(dataset);
            }
            dataset.onUpdate(this._onDatasetUpdateCallback);
            return this;
        };
        /**
         * Removes a Dataset from the Plot.
         *
         * @param {Dataset} dataset
         * @returns {Plot} The calling Plot.
         */
        Plot.prototype.removeDataset = function (dataset) {
            this._removeDataset(dataset);
            this._onDatasetUpdate();
            return this;
        };
        Plot.prototype._removeDataset = function (dataset) {
            if (this.datasets().indexOf(dataset) === -1) {
                return this;
            }
            this._removeDatasetNodes(dataset);
            dataset.offUpdate(this._onDatasetUpdateCallback);
            this._datasetToDrawer.delete(dataset);
            return this;
        };
        Plot.prototype._removeDatasetNodes = function (dataset) {
            var drawer = this._datasetToDrawer.get(dataset);
            drawer.remove();
        };
        Plot.prototype.datasets = function (datasets) {
            var _this = this;
            var currentDatasets = [];
            this._datasetToDrawer.forEach(function (drawer, dataset) { return currentDatasets.push(dataset); });
            if (datasets == null) {
                return currentDatasets;
            }
            currentDatasets.forEach(function (dataset) { return _this._removeDataset(dataset); });
            datasets.forEach(function (dataset) { return _this._addDataset(dataset); });
            this._onDatasetUpdate();
            return this;
        };
        Plot.prototype._getDrawersInOrder = function () {
            var _this = this;
            return this.datasets().map(function (dataset) { return _this._datasetToDrawer.get(dataset); });
        };
        Plot.prototype._generateDrawSteps = function () {
            return [{ attrToProjector: this._generateAttrToProjector(), animator: new Plottable.Animators.Null() }];
        };
        Plot.prototype._additionalPaint = function (time) {
            // no-op
        };
        Plot.prototype._getDataToDraw = function () {
            var dataToDraw = new Plottable.Utils.Map();
            this.datasets().forEach(function (dataset) { return dataToDraw.set(dataset, dataset.data()); });
            return dataToDraw;
        };
        Plot.prototype._paint = function () {
            var drawSteps = this._generateDrawSteps();
            var dataToDraw = this._getDataToDraw();
            var drawers = this._getDrawersInOrder();
            this.datasets().forEach(function (ds, i) { return drawers[i].draw(dataToDraw.get(ds), drawSteps); });
            var times = this.datasets().map(function (ds, i) { return drawers[i].totalDrawTime(dataToDraw.get(ds), drawSteps); });
            var maxTime = Plottable.Utils.Math.max(times, 0);
            this._additionalPaint(maxTime);
        };
        /**
         * Retrieves Selections of this Plot for the specified Datasets.
         *
         * @param {Dataset[]} [datasets] The Datasets to retrieve the Selections for.
         *   If not provided, Selections will be retrieved for all Datasets on the Plot.
         * @returns {d3.Selection}
         */
        Plot.prototype.selections = function (datasets) {
            var _this = this;
            if (datasets === void 0) { datasets = this.datasets(); }
            var selections = [];
            datasets.forEach(function (dataset) {
                var drawer = _this._datasetToDrawer.get(dataset);
                if (drawer == null) {
                    return;
                }
                drawer.renderArea().selectAll(drawer.selector()).each(function () {
                    selections.push(this);
                });
            });
            return d3.selectAll(selections);
        };
        /**
         * Gets the Entities associated with the specified Datasets.
         *
         * @param {dataset[]} datasets The Datasets to retrieve the Entities for.
         *   If not provided, returns defaults to all Datasets on the Plot.
         * @return {Plots.PlotEntity[]}
         */
        Plot.prototype.entities = function (datasets) {
            var _this = this;
            if (datasets === void 0) { datasets = this.datasets(); }
            return this._lightweightEntities(datasets).map(function (entity) { return _this._lightweightPlotEntityToPlotEntity(entity); });
        };
        Plot.prototype._lightweightEntities = function (datasets) {
            var _this = this;
            if (datasets === void 0) { datasets = this.datasets(); }
            var lightweightEntities = [];
            datasets.forEach(function (dataset) {
                var drawer = _this._datasetToDrawer.get(dataset);
                var validDatumIndex = 0;
                dataset.data().forEach(function (datum, datasetIndex) {
                    var position = _this._pixelPoint(datum, datasetIndex, dataset);
                    if (Plottable.Utils.Math.isNaN(position.x) || Plottable.Utils.Math.isNaN(position.y)) {
                        return;
                    }
                    lightweightEntities.push({
                        datum: datum,
                        index: datasetIndex,
                        dataset: dataset,
                        position: position,
                        component: _this,
                        drawer: drawer,
                        validDatumIndex: validDatumIndex
                    });
                    validDatumIndex++;
                });
            });
            return lightweightEntities;
        };
        Plot.prototype._lightweightPlotEntityToPlotEntity = function (entity) {
            var plotEntity = {
                datum: entity.datum,
                position: entity.position,
                dataset: entity.dataset,
                index: entity.index,
                component: entity.component,
                selection: entity.drawer.selectionForIndex(entity.validDatumIndex)
            };
            return plotEntity;
        };
        /**
         * Returns the PlotEntity nearest to the query point by the Euclidian norm, or undefined if no PlotEntity can be found.
         *
         * @param {Point} queryPoint
         * @returns {Plots.PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
         */
        Plot.prototype.entityNearest = function (queryPoint) {
            var _this = this;
            var closestDistanceSquared = Infinity;
            var closestPointEntity;
            var entities = this._lightweightEntities();
            entities.forEach(function (entity) {
                if (!_this._entityVisibleOnPlot(entity.position, entity.datum, entity.index, entity.dataset)) {
                    return;
                }
                var distanceSquared = Plottable.Utils.Math.distanceSquared(entity.position, queryPoint);
                if (distanceSquared < closestDistanceSquared) {
                    closestDistanceSquared = distanceSquared;
                    closestPointEntity = entity;
                }
            });
            return this._lightweightPlotEntityToPlotEntity(closestPointEntity);
        };
        /**
         * @deprecated As of release v1.1.0, replaced by _entityVisibleOnPlot()
         */
        Plot.prototype._visibleOnPlot = function (datum, pixelPoint, selection) {
            Plottable.Utils.Window.deprecated("Plot._visibleOnPlot()", "v1.1.0", "replaced by _entityVisibleOnPlot()");
            return !(pixelPoint.x < 0 || pixelPoint.y < 0 ||
                pixelPoint.x > this.width() || pixelPoint.y > this.height());
        };
        Plot.prototype._entityVisibleOnPlot = function (pixelPoint, datum, index, dataset) {
            return !(pixelPoint.x < 0 || pixelPoint.y < 0 ||
                pixelPoint.x > this.width() || pixelPoint.y > this.height());
        };
        Plot.prototype._uninstallScaleForKey = function (scale, key) {
            scale.offUpdate(this._renderCallback);
            scale.removeIncludedValuesProvider(this._includedValuesProvider);
        };
        Plot.prototype._installScaleForKey = function (scale, key) {
            scale.onUpdate(this._renderCallback);
            scale.addIncludedValuesProvider(this._includedValuesProvider);
        };
        Plot.prototype._propertyProjectors = function () {
            return {};
        };
        Plot._scaledAccessor = function (binding) {
            return binding.scale == null ?
                binding.accessor :
                function (d, i, ds) { return binding.scale.scale(binding.accessor(d, i, ds)); };
        };
        Plot.prototype._pixelPoint = function (datum, index, dataset) {
            return { x: 0, y: 0 };
        };
        Plot.prototype._animateOnNextRender = function () {
            return this._animate && this._dataChanged;
        };
        Plot._ANIMATION_MAX_DURATION = 600;
        return Plot;
    })(Plottable.Component);
    Plottable.Plot = Plot;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Pie = (function (_super) {
            __extends(Pie, _super);
            /**
             * @constructor
             */
            function Pie() {
                var _this = this;
                _super.call(this);
                this._labelFormatter = Plottable.Formatters.identity();
                this._labelsEnabled = false;
                this.innerRadius(0);
                this.outerRadius(function () { return Math.min(_this.width(), _this.height()) / 2; });
                this.addClass("pie-plot");
                this.attr("fill", function (d, i) { return String(i); }, new Plottable.Scales.Color());
                this._strokeDrawers = new Plottable.Utils.Map();
            }
            Pie.prototype._setup = function () {
                var _this = this;
                _super.prototype._setup.call(this);
                this._strokeDrawers.forEach(function (d) { return d.renderArea(_this._renderArea.append("g")); });
            };
            Pie.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                this._renderArea.attr("transform", "translate(" + this.width() / 2 + "," + this.height() / 2 + ")");
                var radiusLimit = Math.min(this.width(), this.height()) / 2;
                if (this.innerRadius().scale != null) {
                    this.innerRadius().scale.range([0, radiusLimit]);
                }
                if (this.outerRadius().scale != null) {
                    this.outerRadius().scale.range([0, radiusLimit]);
                }
                return this;
            };
            Pie.prototype.addDataset = function (dataset) {
                _super.prototype.addDataset.call(this, dataset);
                return this;
            };
            Pie.prototype._addDataset = function (dataset) {
                if (this.datasets().length === 1) {
                    Plottable.Utils.Window.warn("Only one dataset is supported in Pie plots");
                    return this;
                }
                this._updatePieAngles();
                var strokeDrawer = new Plottable.Drawers.ArcOutline(dataset);
                if (this._isSetup) {
                    strokeDrawer.renderArea(this._renderArea.append("g"));
                }
                this._strokeDrawers.set(dataset, strokeDrawer);
                _super.prototype._addDataset.call(this, dataset);
                return this;
            };
            Pie.prototype.removeDataset = function (dataset) {
                _super.prototype.removeDataset.call(this, dataset);
                return this;
            };
            Pie.prototype._removeDatasetNodes = function (dataset) {
                _super.prototype._removeDatasetNodes.call(this, dataset);
                this._strokeDrawers.get(dataset).remove();
            };
            Pie.prototype._removeDataset = function (dataset) {
                _super.prototype._removeDataset.call(this, dataset);
                this._startAngles = [];
                this._endAngles = [];
                return this;
            };
            Pie.prototype.selections = function (datasets) {
                var _this = this;
                if (datasets === void 0) { datasets = this.datasets(); }
                var allSelections = _super.prototype.selections.call(this, datasets)[0];
                datasets.forEach(function (dataset) {
                    var drawer = _this._strokeDrawers.get(dataset);
                    if (drawer == null) {
                        return;
                    }
                    drawer.renderArea().selectAll(drawer.selector()).each(function () {
                        allSelections.push(this);
                    });
                });
                return d3.selectAll(allSelections);
            };
            Pie.prototype._onDatasetUpdate = function () {
                this._updatePieAngles();
                _super.prototype._onDatasetUpdate.call(this);
            };
            Pie.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Arc(dataset);
            };
            Pie.prototype.entities = function (datasets) {
                var _this = this;
                if (datasets === void 0) { datasets = this.datasets(); }
                var entities = _super.prototype.entities.call(this, datasets);
                entities.forEach(function (entity) {
                    entity.position.x += _this.width() / 2;
                    entity.position.y += _this.height() / 2;
                    var stroke = _this._strokeDrawers.get(entity.dataset).selectionForIndex(entity.index);
                    entity.selection[0].push(stroke[0][0]);
                });
                return entities;
            };
            Pie.prototype.sectorValue = function (sectorValue, scale) {
                if (sectorValue == null) {
                    return this._propertyBindings.get(Pie._SECTOR_VALUE_KEY);
                }
                this._bindProperty(Pie._SECTOR_VALUE_KEY, sectorValue, scale);
                this._updatePieAngles();
                this.render();
                return this;
            };
            Pie.prototype.innerRadius = function (innerRadius, scale) {
                if (innerRadius == null) {
                    return this._propertyBindings.get(Pie._INNER_RADIUS_KEY);
                }
                this._bindProperty(Pie._INNER_RADIUS_KEY, innerRadius, scale);
                this.render();
                return this;
            };
            Pie.prototype.outerRadius = function (outerRadius, scale) {
                if (outerRadius == null) {
                    return this._propertyBindings.get(Pie._OUTER_RADIUS_KEY);
                }
                this._bindProperty(Pie._OUTER_RADIUS_KEY, outerRadius, scale);
                this.render();
                return this;
            };
            Pie.prototype.labelsEnabled = function (enabled) {
                if (enabled == null) {
                    return this._labelsEnabled;
                }
                else {
                    this._labelsEnabled = enabled;
                    this.render();
                    return this;
                }
            };
            Pie.prototype.labelFormatter = function (formatter) {
                if (formatter == null) {
                    return this._labelFormatter;
                }
                else {
                    this._labelFormatter = formatter;
                    this.render();
                    return this;
                }
            };
            /*
             * Gets the Entities at a particular Point.
             *
             * @param {Point} p
             * @param {PlotEntity[]}
             */
            Pie.prototype.entitiesAt = function (queryPoint) {
                var center = { x: this.width() / 2, y: this.height() / 2 };
                var adjustedQueryPoint = { x: queryPoint.x - center.x, y: queryPoint.y - center.y };
                var index = this._sliceIndexForPoint(adjustedQueryPoint);
                return index == null ? [] : [this.entities()[index]];
            };
            Pie.prototype._propertyProjectors = function () {
                var _this = this;
                var attrToProjector = _super.prototype._propertyProjectors.call(this);
                var innerRadiusAccessor = Plottable.Plot._scaledAccessor(this.innerRadius());
                var outerRadiusAccessor = Plottable.Plot._scaledAccessor(this.outerRadius());
                attrToProjector["d"] = function (datum, index, ds) {
                    return d3.svg.arc().innerRadius(innerRadiusAccessor(datum, index, ds))
                        .outerRadius(outerRadiusAccessor(datum, index, ds))
                        .startAngle(_this._startAngles[index])
                        .endAngle(_this._endAngles[index])(datum, index);
                };
                return attrToProjector;
            };
            Pie.prototype._updatePieAngles = function () {
                if (this.sectorValue() == null) {
                    return;
                }
                if (this.datasets().length === 0) {
                    return;
                }
                var sectorValueAccessor = Plottable.Plot._scaledAccessor(this.sectorValue());
                var dataset = this.datasets()[0];
                var data = this._getDataToDraw().get(dataset);
                var pie = d3.layout.pie().sort(null).value(function (d, i) { return sectorValueAccessor(d, i, dataset); })(data);
                this._startAngles = pie.map(function (slice) { return slice.startAngle; });
                this._endAngles = pie.map(function (slice) { return slice.endAngle; });
            };
            Pie.prototype._getDataToDraw = function () {
                var dataToDraw = _super.prototype._getDataToDraw.call(this);
                if (this.datasets().length === 0) {
                    return dataToDraw;
                }
                var sectorValueAccessor = Plottable.Plot._scaledAccessor(this.sectorValue());
                var ds = this.datasets()[0];
                var data = dataToDraw.get(ds);
                var filteredData = data.filter(function (d, i) { return Pie._isValidData(sectorValueAccessor(d, i, ds)); });
                dataToDraw.set(ds, filteredData);
                return dataToDraw;
            };
            Pie._isValidData = function (value) {
                return Plottable.Utils.Math.isValidNumber(value) && value >= 0;
            };
            Pie.prototype._pixelPoint = function (datum, index, dataset) {
                var scaledValueAccessor = Plottable.Plot._scaledAccessor(this.sectorValue());
                if (!Pie._isValidData(scaledValueAccessor(datum, index, dataset))) {
                    return { x: NaN, y: NaN };
                }
                var innerRadius = Plottable.Plot._scaledAccessor(this.innerRadius())(datum, index, dataset);
                var outerRadius = Plottable.Plot._scaledAccessor(this.outerRadius())(datum, index, dataset);
                var avgRadius = (innerRadius + outerRadius) / 2;
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d, i) {
                    var value = scaledValueAccessor(d, i, dataset);
                    return Pie._isValidData(value) ? value : 0;
                })(dataset.data());
                var startAngle = pie[index].startAngle;
                var endAngle = pie[index].endAngle;
                var avgAngle = (startAngle + endAngle) / 2;
                return { x: avgRadius * Math.sin(avgAngle), y: -avgRadius * Math.cos(avgAngle) };
            };
            Pie.prototype._additionalPaint = function (time) {
                var _this = this;
                this._renderArea.select(".label-area").remove();
                if (this._labelsEnabled) {
                    Plottable.Utils.Window.setTimeout(function () { return _this._drawLabels(); }, time);
                }
                var drawSteps = this._generateStrokeDrawSteps();
                var dataToDraw = this._getDataToDraw();
                this.datasets().forEach(function (dataset) { return _this._strokeDrawers.get(dataset).draw(dataToDraw.get(dataset), drawSteps); });
            };
            Pie.prototype._generateStrokeDrawSteps = function () {
                var attrToProjector = this._generateAttrToProjector();
                return [{ attrToProjector: attrToProjector, animator: new Plottable.Animators.Null() }];
            };
            Pie.prototype._sliceIndexForPoint = function (p) {
                var pointRadius = Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
                var pointAngle = Math.acos(-p.y / pointRadius);
                if (p.x < 0) {
                    pointAngle = Math.PI * 2 - pointAngle;
                }
                var index;
                for (var i = 0; i < this._startAngles.length; i++) {
                    if (this._startAngles[i] < pointAngle && this._endAngles[i] > pointAngle) {
                        index = i;
                        break;
                    }
                }
                if (index !== undefined) {
                    var dataset = this.datasets()[0];
                    var datum = dataset.data()[index];
                    var innerRadius = this.innerRadius().accessor(datum, index, dataset);
                    var outerRadius = this.outerRadius().accessor(datum, index, dataset);
                    if (pointRadius > innerRadius && pointRadius < outerRadius) {
                        return index;
                    }
                }
                return null;
            };
            Pie.prototype._drawLabels = function () {
                var _this = this;
                var attrToProjector = this._generateAttrToProjector();
                var labelArea = this._renderArea.append("g").classed("label-area", true);
                var measurer = new SVGTypewriter.Measurers.Measurer(labelArea);
                var writer = new SVGTypewriter.Writers.Writer(measurer);
                var dataset = this.datasets()[0];
                var data = this._getDataToDraw().get(dataset);
                data.forEach(function (datum, datumIndex) {
                    var value = _this.sectorValue().accessor(datum, datumIndex, dataset);
                    if (!Plottable.Utils.Math.isValidNumber(value)) {
                        return;
                    }
                    value = _this._labelFormatter(value);
                    var measurement = measurer.measure(value);
                    var theta = (_this._endAngles[datumIndex] + _this._startAngles[datumIndex]) / 2;
                    var outerRadius = _this.outerRadius().accessor(datum, datumIndex, dataset);
                    if (_this.outerRadius().scale) {
                        outerRadius = _this.outerRadius().scale.scale(outerRadius);
                    }
                    var innerRadius = _this.innerRadius().accessor(datum, datumIndex, dataset);
                    if (_this.innerRadius().scale) {
                        innerRadius = _this.innerRadius().scale.scale(innerRadius);
                    }
                    var labelRadius = (outerRadius + innerRadius) / 2;
                    var x = Math.sin(theta) * labelRadius - measurement.width / 2;
                    var y = -Math.cos(theta) * labelRadius - measurement.height / 2;
                    var corners = [
                        { x: x, y: y },
                        { x: x, y: y + measurement.height },
                        { x: x + measurement.width, y: y },
                        { x: x + measurement.width, y: y + measurement.height }
                    ];
                    var showLabel = corners.every(function (corner) {
                        return Math.abs(corner.x) <= _this.width() / 2 && Math.abs(corner.y) <= _this.height() / 2;
                    });
                    if (showLabel) {
                        var sliceIndices = corners.map(function (corner) { return _this._sliceIndexForPoint(corner); });
                        showLabel = sliceIndices.every(function (index) { return index === datumIndex; });
                    }
                    var color = attrToProjector["fill"](datum, datumIndex, dataset);
                    var dark = Plottable.Utils.Color.contrast("white", color) * 1.6 < Plottable.Utils.Color.contrast("black", color);
                    var g = labelArea.append("g").attr("transform", "translate(" + x + "," + y + ")");
                    var className = dark ? "dark-label" : "light-label";
                    g.classed(className, true);
                    g.style("visibility", showLabel ? "inherit" : "hidden");
                    writer.write(value, measurement.width, measurement.height, {
                        selection: g,
                        xAlign: "center",
                        yAlign: "center",
                        textRotation: 0
                    });
                });
            };
            Pie._INNER_RADIUS_KEY = "inner-radius";
            Pie._OUTER_RADIUS_KEY = "outer-radius";
            Pie._SECTOR_VALUE_KEY = "sector-value";
            return Pie;
        })(Plottable.Plot);
        Plots.Pie = Pie;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var XYPlot = (function (_super) {
        __extends(XYPlot, _super);
        /**
         * An XYPlot is a Plot that displays data along two primary directions, X and Y.
         *
         * @constructor
         * @param {Scale} xScale The x scale to use.
         * @param {Scale} yScale The y scale to use.
         */
        function XYPlot() {
            var _this = this;
            _super.call(this);
            this._autoAdjustXScaleDomain = false;
            this._autoAdjustYScaleDomain = false;
            this._deferredRendering = false;
            this._cachedDomainX = [null, null];
            this._cachedDomainY = [null, null];
            this.addClass("xy-plot");
            this._adjustYDomainOnChangeFromXCallback = function (scale) { return _this._adjustYDomainOnChangeFromX(); };
            this._adjustXDomainOnChangeFromYCallback = function (scale) { return _this._adjustXDomainOnChangeFromY(); };
            var _deltaX = 0;
            var _deltaY = 0;
            var _scalingX = 1;
            var _scalingY = 1;
            var _lastSeenDomainX = [null, null];
            var _lastSeenDomainY = [null, null];
            var _timeoutReference = 0;
            var _deferredRenderingTimeout = 500;
            var _registerDeferredRendering = function () {
                if (_this._renderArea == null) {
                    return;
                }
                _this._renderArea.attr("transform", "translate(" + _deltaX + ", " + _deltaY + ")" +
                    "scale(" + _scalingX + ", " + _scalingY + ")");
                clearTimeout(_timeoutReference);
                _timeoutReference = setTimeout(function () {
                    _this._cachedDomainX = _lastSeenDomainX;
                    _this._cachedDomainY = _lastSeenDomainY;
                    _deltaX = 0;
                    _deltaY = 0;
                    _scalingX = 1;
                    _scalingY = 1;
                    _this.render();
                    _this._renderArea.attr("transform", "translate(0, 0) scale(1, 1)");
                }, _deferredRenderingTimeout);
            };
            var _lazyDomainChangeCallbackX = function (scale) {
                if (!_this._isAnchored) {
                    return;
                }
                _lastSeenDomainX = scale.domain();
                _scalingX = (scale.scale(_this._cachedDomainX[1]) - scale.scale(_this._cachedDomainX[0])) /
                    (scale.scale(_lastSeenDomainX[1]) - scale.scale(_lastSeenDomainX[0])) || 1;
                _deltaX = scale.scale(_this._cachedDomainX[0]) - scale.scale(_lastSeenDomainX[0]) || 0;
                _registerDeferredRendering();
            };
            var _lazyDomainChangeCallbackY = function (scale) {
                if (!_this._isAnchored) {
                    return;
                }
                _lastSeenDomainY = scale.domain();
                _scalingY = (scale.scale(_this._cachedDomainY[1]) - scale.scale(_this._cachedDomainY[0])) /
                    (scale.scale(_lastSeenDomainY[1]) - scale.scale(_lastSeenDomainY[0])) || 1;
                _deltaY = scale.scale(_this._cachedDomainY[0]) - scale.scale(_lastSeenDomainY[0]) * _scalingY || 0;
                _registerDeferredRendering();
            };
            this._renderCallback = function (scale) {
                if (_this.deferredRendering() && _this.x() && _this.x().scale === scale) {
                    _lazyDomainChangeCallbackX(scale);
                }
                else if (_this.deferredRendering() && _this.y() && _this.y().scale === scale) {
                    _lazyDomainChangeCallbackY(scale);
                }
                else {
                    _this.render();
                }
            };
        }
        XYPlot.prototype.deferredRendering = function (deferredRendering) {
            if (deferredRendering == null) {
                return this._deferredRendering;
            }
            if (deferredRendering && this._isAnchored) {
                if (this.x() && this.x().scale) {
                    this._cachedDomainX = this.x().scale.domain();
                }
                if (this.y() && this.y().scale) {
                    this._cachedDomainY = this.y().scale.domain();
                }
            }
            this._deferredRendering = deferredRendering;
            return this;
        };
        XYPlot.prototype.x = function (x, xScale) {
            if (x == null) {
                return this._propertyBindings.get(XYPlot._X_KEY);
            }
            this._bindProperty(XYPlot._X_KEY, x, xScale);
            var width = this.width();
            if (xScale != null && width != null) {
                xScale.range([0, width]);
            }
            if (this._autoAdjustYScaleDomain) {
                this._updateYExtentsAndAutodomain();
            }
            this.render();
            return this;
        };
        XYPlot.prototype.y = function (y, yScale) {
            if (y == null) {
                return this._propertyBindings.get(XYPlot._Y_KEY);
            }
            this._bindProperty(XYPlot._Y_KEY, y, yScale);
            var height = this.height();
            if (yScale != null && height != null) {
                if (yScale instanceof Plottable.Scales.Category) {
                    yScale.range([0, height]);
                }
                else {
                    yScale.range([height, 0]);
                }
            }
            if (this._autoAdjustXScaleDomain) {
                this._updateXExtentsAndAutodomain();
            }
            this.render();
            return this;
        };
        XYPlot.prototype._filterForProperty = function (property) {
            if (property === "x" && this._autoAdjustXScaleDomain) {
                return this._makeFilterByProperty("y");
            }
            else if (property === "y" && this._autoAdjustYScaleDomain) {
                return this._makeFilterByProperty("x");
            }
            return null;
        };
        XYPlot.prototype._makeFilterByProperty = function (property) {
            var binding = this._propertyBindings.get(property);
            if (binding != null) {
                var accessor = binding.accessor;
                var scale = binding.scale;
                if (scale != null) {
                    return function (datum, index, dataset) {
                        var range = scale.range();
                        return Plottable.Utils.Math.inRange(scale.scale(accessor(datum, index, dataset)), range[0], range[1]);
                    };
                }
            }
            return null;
        };
        XYPlot.prototype._uninstallScaleForKey = function (scale, key) {
            _super.prototype._uninstallScaleForKey.call(this, scale, key);
            var adjustCallback = key === XYPlot._X_KEY ? this._adjustYDomainOnChangeFromXCallback
                : this._adjustXDomainOnChangeFromYCallback;
            scale.offUpdate(adjustCallback);
        };
        XYPlot.prototype._installScaleForKey = function (scale, key) {
            _super.prototype._installScaleForKey.call(this, scale, key);
            var adjustCallback = key === XYPlot._X_KEY ? this._adjustYDomainOnChangeFromXCallback
                : this._adjustXDomainOnChangeFromYCallback;
            scale.onUpdate(adjustCallback);
        };
        XYPlot.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.x().scale) {
                this.x().scale.offUpdate(this._adjustYDomainOnChangeFromXCallback);
            }
            if (this.y().scale) {
                this.y().scale.offUpdate(this._adjustXDomainOnChangeFromYCallback);
            }
            return this;
        };
        XYPlot.prototype.autorangeMode = function (autorangeMode) {
            if (autorangeMode == null) {
                if (this._autoAdjustXScaleDomain) {
                    return "x";
                }
                if (this._autoAdjustYScaleDomain) {
                    return "y";
                }
                return "none";
            }
            switch (autorangeMode) {
                case "x":
                    this._autoAdjustXScaleDomain = true;
                    this._autoAdjustYScaleDomain = false;
                    this._adjustXDomainOnChangeFromY();
                    break;
                case "y":
                    this._autoAdjustXScaleDomain = false;
                    this._autoAdjustYScaleDomain = true;
                    this._adjustYDomainOnChangeFromX();
                    break;
                case "none":
                    this._autoAdjustXScaleDomain = false;
                    this._autoAdjustYScaleDomain = false;
                    break;
                default:
                    throw new Error("Invalid scale name '" + autorangeMode + "', must be 'x', 'y' or 'none'");
            }
            return this;
        };
        XYPlot.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
            _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
            var xBinding = this.x();
            var xScale = xBinding && xBinding.scale;
            if (xScale != null) {
                xScale.range([0, this.width()]);
            }
            var yBinding = this.y();
            var yScale = yBinding && yBinding.scale;
            if (yScale != null) {
                if (yScale instanceof Plottable.Scales.Category) {
                    yScale.range([0, this.height()]);
                }
                else {
                    yScale.range([this.height(), 0]);
                }
            }
            return this;
        };
        XYPlot.prototype._updateXExtentsAndAutodomain = function () {
            this._updateExtentsForProperty("x");
            var xScale = this.x().scale;
            if (xScale != null) {
                xScale.autoDomain();
            }
        };
        XYPlot.prototype._updateYExtentsAndAutodomain = function () {
            this._updateExtentsForProperty("y");
            var yScale = this.y().scale;
            if (yScale != null) {
                yScale.autoDomain();
            }
        };
        /**
         * Adjusts the domains of both X and Y scales to show all data.
         * This call does not override the autorange() behavior.
         *
         * @returns {XYPlot} The calling XYPlot.
         */
        XYPlot.prototype.showAllData = function () {
            this._updateXExtentsAndAutodomain();
            this._updateYExtentsAndAutodomain();
            return this;
        };
        XYPlot.prototype._adjustYDomainOnChangeFromX = function () {
            if (!this._projectorsReady()) {
                return;
            }
            if (this._autoAdjustYScaleDomain) {
                this._updateYExtentsAndAutodomain();
            }
        };
        XYPlot.prototype._adjustXDomainOnChangeFromY = function () {
            if (!this._projectorsReady()) {
                return;
            }
            if (this._autoAdjustXScaleDomain) {
                this._updateXExtentsAndAutodomain();
            }
        };
        XYPlot.prototype._projectorsReady = function () {
            var xBinding = this.x();
            var yBinding = this.y();
            return xBinding != null &&
                xBinding.accessor != null &&
                yBinding != null &&
                yBinding.accessor != null;
        };
        XYPlot.prototype._pixelPoint = function (datum, index, dataset) {
            var xProjector = Plottable.Plot._scaledAccessor(this.x());
            var yProjector = Plottable.Plot._scaledAccessor(this.y());
            return { x: xProjector(datum, index, dataset), y: yProjector(datum, index, dataset) };
        };
        XYPlot.prototype._getDataToDraw = function () {
            var _this = this;
            var dataToDraw = _super.prototype._getDataToDraw.call(this);
            var definedFunction = function (d, i, dataset) {
                var positionX = Plottable.Plot._scaledAccessor(_this.x())(d, i, dataset);
                var positionY = Plottable.Plot._scaledAccessor(_this.y())(d, i, dataset);
                return Plottable.Utils.Math.isValidNumber(positionX) &&
                    Plottable.Utils.Math.isValidNumber(positionY);
            };
            this.datasets().forEach(function (dataset) {
                dataToDraw.set(dataset, dataToDraw.get(dataset).filter(function (d, i) { return definedFunction(d, i, dataset); }));
            });
            return dataToDraw;
        };
        XYPlot._X_KEY = "x";
        XYPlot._Y_KEY = "y";
        return XYPlot;
    })(Plottable.Plot);
    Plottable.XYPlot = XYPlot;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            /**
             * A Rectangle Plot displays rectangles based on the data.
             * The left and right edges of each rectangle can be set with x() and x2().
             *   If only x() is set the Rectangle Plot will attempt to compute the correct left and right edge positions.
             * The top and bottom edges of each rectangle can be set with y() and y2().
             *   If only y() is set the Rectangle Plot will attempt to compute the correct top and bottom edge positions.
             *
             * @constructor
             * @param {Scale.Scale} xScale
             * @param {Scale.Scale} yScale
             */
            function Rectangle() {
                _super.call(this);
                this._labelsEnabled = false;
                this._label = null;
                this.animator("rectangles", new Plottable.Animators.Null());
                this.addClass("rectangle-plot");
                this.attr("fill", new Plottable.Scales.Color().range()[0]);
            }
            Rectangle.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Rectangle(dataset);
            };
            Rectangle.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                // Copy each of the different projectors.
                var xAttr = Plottable.Plot._scaledAccessor(this.x());
                var x2Attr = attrToProjector[Rectangle._X2_KEY];
                var yAttr = Plottable.Plot._scaledAccessor(this.y());
                var y2Attr = attrToProjector[Rectangle._Y2_KEY];
                var xScale = this.x().scale;
                var yScale = this.y().scale;
                if (x2Attr != null) {
                    attrToProjector["width"] = function (d, i, dataset) { return Math.abs(x2Attr(d, i, dataset) - xAttr(d, i, dataset)); };
                    attrToProjector["x"] = function (d, i, dataset) { return Math.min(x2Attr(d, i, dataset), xAttr(d, i, dataset)); };
                }
                else {
                    attrToProjector["width"] = function (d, i, dataset) { return _this._rectangleWidth(xScale); };
                    attrToProjector["x"] = function (d, i, dataset) { return xAttr(d, i, dataset) - 0.5 * attrToProjector["width"](d, i, dataset); };
                }
                if (y2Attr != null) {
                    attrToProjector["height"] = function (d, i, dataset) { return Math.abs(y2Attr(d, i, dataset) - yAttr(d, i, dataset)); };
                    attrToProjector["y"] = function (d, i, dataset) {
                        return Math.max(y2Attr(d, i, dataset), yAttr(d, i, dataset)) - attrToProjector["height"](d, i, dataset);
                    };
                }
                else {
                    attrToProjector["height"] = function (d, i, dataset) { return _this._rectangleWidth(yScale); };
                    attrToProjector["y"] = function (d, i, dataset) { return yAttr(d, i, dataset) - 0.5 * attrToProjector["height"](d, i, dataset); };
                }
                // Clean up the attributes projected onto the SVG elements
                delete attrToProjector[Rectangle._X2_KEY];
                delete attrToProjector[Rectangle._Y2_KEY];
                return attrToProjector;
            };
            Rectangle.prototype._generateDrawSteps = function () {
                return [{ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("rectangles") }];
            };
            Rectangle.prototype._updateExtentsForProperty = function (property) {
                _super.prototype._updateExtentsForProperty.call(this, property);
                if (property === "x") {
                    _super.prototype._updateExtentsForProperty.call(this, "x2");
                }
                else if (property === "y") {
                    _super.prototype._updateExtentsForProperty.call(this, "y2");
                }
            };
            Rectangle.prototype._filterForProperty = function (property) {
                if (property === "x2") {
                    return _super.prototype._filterForProperty.call(this, "x");
                }
                else if (property === "y2") {
                    return _super.prototype._filterForProperty.call(this, "y");
                }
                return _super.prototype._filterForProperty.call(this, property);
            };
            Rectangle.prototype.x = function (x, xScale) {
                if (x == null) {
                    return _super.prototype.x.call(this);
                }
                if (xScale == null) {
                    _super.prototype.x.call(this, x);
                }
                else {
                    _super.prototype.x.call(this, x, xScale);
                }
                if (xScale != null) {
                    var x2Binding = this.x2();
                    var x2 = x2Binding && x2Binding.accessor;
                    if (x2 != null) {
                        this._bindProperty(Rectangle._X2_KEY, x2, xScale);
                    }
                }
                // The x and y scales should render in bands with no padding for category scales
                if (xScale instanceof Plottable.Scales.Category) {
                    xScale.innerPadding(0).outerPadding(0);
                }
                return this;
            };
            Rectangle.prototype.x2 = function (x2) {
                if (x2 == null) {
                    return this._propertyBindings.get(Rectangle._X2_KEY);
                }
                var xBinding = this.x();
                var xScale = xBinding && xBinding.scale;
                this._bindProperty(Rectangle._X2_KEY, x2, xScale);
                this.render();
                return this;
            };
            Rectangle.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                if (yScale == null) {
                    _super.prototype.y.call(this, y);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                }
                if (yScale != null) {
                    var y2Binding = this.y2();
                    var y2 = y2Binding && y2Binding.accessor;
                    if (y2 != null) {
                        this._bindProperty(Rectangle._Y2_KEY, y2, yScale);
                    }
                }
                // The x and y scales should render in bands with no padding for category scales
                if (yScale instanceof Plottable.Scales.Category) {
                    yScale.innerPadding(0).outerPadding(0);
                }
                return this;
            };
            Rectangle.prototype.y2 = function (y2) {
                if (y2 == null) {
                    return this._propertyBindings.get(Rectangle._Y2_KEY);
                }
                var yBinding = this.y();
                var yScale = yBinding && yBinding.scale;
                this._bindProperty(Rectangle._Y2_KEY, y2, yScale);
                this.render();
                return this;
            };
            /**
             * Gets the PlotEntities at a particular Point.
             *
             * @param {Point} point The point to query.
             * @returns {PlotEntity[]} The PlotEntities at the particular point
             */
            Rectangle.prototype.entitiesAt = function (point) {
                var attrToProjector = this._generateAttrToProjector();
                return this.entities().filter(function (entity) {
                    var datum = entity.datum;
                    var index = entity.index;
                    var dataset = entity.dataset;
                    var x = attrToProjector["x"](datum, index, dataset);
                    var y = attrToProjector["y"](datum, index, dataset);
                    var width = attrToProjector["width"](datum, index, dataset);
                    var height = attrToProjector["height"](datum, index, dataset);
                    return x <= point.x && point.x <= x + width && y <= point.y && point.y <= y + height;
                });
            };
            Rectangle.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
                var dataXRange;
                var dataYRange;
                if (yRange == null) {
                    var bounds = xRangeOrBounds;
                    dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
                    dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
                }
                else {
                    dataXRange = xRangeOrBounds;
                    dataYRange = yRange;
                }
                return this._entitiesIntersecting(dataXRange, dataYRange);
            };
            Rectangle.prototype._entityBBox = function (datum, index, dataset, attrToProjector) {
                return {
                    x: attrToProjector["x"](datum, index, dataset),
                    y: attrToProjector["y"](datum, index, dataset),
                    width: attrToProjector["width"](datum, index, dataset),
                    height: attrToProjector["height"](datum, index, dataset)
                };
            };
            Rectangle.prototype._entitiesIntersecting = function (xValOrRange, yValOrRange) {
                var _this = this;
                var intersected = [];
                var attrToProjector = this._generateAttrToProjector();
                this.entities().forEach(function (entity) {
                    if (Plottable.Utils.DOM.intersectsBBox(xValOrRange, yValOrRange, _this._entityBBox(entity.datum, entity.index, entity.dataset, attrToProjector))) {
                        intersected.push(entity);
                    }
                });
                return intersected;
            };
            Rectangle.prototype.label = function (label) {
                if (label == null) {
                    return this._label;
                }
                this._label = label;
                this.render();
                return this;
            };
            Rectangle.prototype.labelsEnabled = function (enabled) {
                if (enabled == null) {
                    return this._labelsEnabled;
                }
                else {
                    this._labelsEnabled = enabled;
                    this.render();
                    return this;
                }
            };
            Rectangle.prototype._propertyProjectors = function () {
                var attrToProjector = _super.prototype._propertyProjectors.call(this);
                if (this.x2() != null) {
                    attrToProjector["x2"] = Plottable.Plot._scaledAccessor(this.x2());
                }
                if (this.y2() != null) {
                    attrToProjector["y2"] = Plottable.Plot._scaledAccessor(this.y2());
                }
                return attrToProjector;
            };
            Rectangle.prototype._pixelPoint = function (datum, index, dataset) {
                var attrToProjector = this._generateAttrToProjector();
                var rectX = attrToProjector["x"](datum, index, dataset);
                var rectY = attrToProjector["y"](datum, index, dataset);
                var rectWidth = attrToProjector["width"](datum, index, dataset);
                var rectHeight = attrToProjector["height"](datum, index, dataset);
                var x = rectX + rectWidth / 2;
                var y = rectY + rectHeight / 2;
                return { x: x, y: y };
            };
            Rectangle.prototype._rectangleWidth = function (scale) {
                if (scale instanceof Plottable.Scales.Category) {
                    return scale.rangeBand();
                }
                else {
                    var accessor = scale === this.x().scale ? this.x().accessor : this.y().accessor;
                    var accessorData = d3.set(Plottable.Utils.Array.flatten(this.datasets().map(function (dataset) {
                        return dataset.data().map(function (d, i) { return accessor(d, i, dataset).valueOf(); });
                    }))).values().map(function (value) { return +value; });
                    // Get the absolute difference between min and max
                    var min = Plottable.Utils.Math.min(accessorData, 0);
                    var max = Plottable.Utils.Math.max(accessorData, 0);
                    var scaledMin = scale.scale(min);
                    var scaledMax = scale.scale(max);
                    return (scaledMax - scaledMin) / Math.abs(max - min);
                }
            };
            Rectangle.prototype._getDataToDraw = function () {
                var dataToDraw = new Plottable.Utils.Map();
                var attrToProjector = this._generateAttrToProjector();
                this.datasets().forEach(function (dataset) {
                    var data = dataset.data().filter(function (d, i) { return Plottable.Utils.Math.isValidNumber(attrToProjector["x"](d, i, dataset)) &&
                        Plottable.Utils.Math.isValidNumber(attrToProjector["y"](d, i, dataset)) &&
                        Plottable.Utils.Math.isValidNumber(attrToProjector["width"](d, i, dataset)) &&
                        Plottable.Utils.Math.isValidNumber(attrToProjector["height"](d, i, dataset)); });
                    dataToDraw.set(dataset, data);
                });
                return dataToDraw;
            };
            Rectangle.prototype._additionalPaint = function (time) {
                var _this = this;
                this._renderArea.selectAll(".label-area").remove();
                if (this._labelsEnabled && this.label() != null) {
                    Plottable.Utils.Window.setTimeout(function () { return _this._drawLabels(); }, time);
                }
            };
            Rectangle.prototype._drawLabels = function () {
                var _this = this;
                var dataToDraw = this._getDataToDraw();
                this.datasets().forEach(function (dataset, i) { return _this._drawLabel(dataToDraw, dataset, i); });
            };
            Rectangle.prototype._drawLabel = function (dataToDraw, dataset, datasetIndex) {
                var _this = this;
                var attrToProjector = this._generateAttrToProjector();
                var labelArea = this._renderArea.append("g").classed("label-area", true);
                var measurer = new SVGTypewriter.Measurers.Measurer(labelArea);
                var writer = new SVGTypewriter.Writers.Writer(measurer);
                var xRange = this.x().scale.range();
                var yRange = this.y().scale.range();
                var xMin = Math.min.apply(null, xRange);
                var xMax = Math.max.apply(null, xRange);
                var yMin = Math.min.apply(null, yRange);
                var yMax = Math.max.apply(null, yRange);
                var data = dataToDraw.get(dataset);
                data.forEach(function (datum, datumIndex) {
                    var label = "" + _this.label()(datum, datumIndex, dataset);
                    var measurement = measurer.measure(label);
                    var x = attrToProjector["x"](datum, datumIndex, dataset);
                    var y = attrToProjector["y"](datum, datumIndex, dataset);
                    var width = attrToProjector["width"](datum, datumIndex, dataset);
                    var height = attrToProjector["height"](datum, datumIndex, dataset);
                    if (measurement.height <= height && measurement.width <= width) {
                        var horizontalOffset = (width - measurement.width) / 2;
                        var verticalOffset = (height - measurement.height) / 2;
                        x += horizontalOffset;
                        y += verticalOffset;
                        var xLabelRange = { min: x, max: x + measurement.width };
                        var yLabelRange = { min: y, max: y + measurement.height };
                        if (xLabelRange.min < xMin || xLabelRange.max > xMax || yLabelRange.min < yMin || yLabelRange.max > yMax) {
                            return;
                        }
                        if (_this._overlayLabel(xLabelRange, yLabelRange, datumIndex, datasetIndex, dataToDraw)) {
                            return;
                        }
                        var color = attrToProjector["fill"](datum, datumIndex, dataset);
                        var dark = Plottable.Utils.Color.contrast("white", color) * 1.6 < Plottable.Utils.Color.contrast("black", color);
                        var g = labelArea.append("g").attr("transform", "translate(" + x + "," + y + ")");
                        var className = dark ? "dark-label" : "light-label";
                        g.classed(className, true);
                        writer.write(label, measurement.width, measurement.height, {
                            selection: g,
                            xAlign: "center",
                            yAlign: "center",
                            textRotation: 0
                        });
                    }
                });
            };
            Rectangle.prototype._overlayLabel = function (labelXRange, labelYRange, datumIndex, datasetIndex, dataToDraw) {
                var attrToProjector = this._generateAttrToProjector();
                var datasets = this.datasets();
                for (var i = datasetIndex; i < datasets.length; i++) {
                    var dataset = datasets[i];
                    var data = dataToDraw.get(dataset);
                    for (var j = (i === datasetIndex ? datumIndex + 1 : 0); j < data.length; j++) {
                        if (Plottable.Utils.DOM.intersectsBBox(labelXRange, labelYRange, this._entityBBox(data[j], j, dataset, attrToProjector))) {
                            return true;
                        }
                    }
                }
                return false;
            };
            Rectangle._X2_KEY = "x2";
            Rectangle._Y2_KEY = "y2";
            return Rectangle;
        })(Plottable.XYPlot);
        Plots.Rectangle = Rectangle;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Scatter = (function (_super) {
            __extends(Scatter, _super);
            /**
             * A Scatter Plot draws a symbol at each data point.
             *
             * @constructor
             */
            function Scatter() {
                _super.call(this);
                this.addClass("scatter-plot");
                var animator = new Plottable.Animators.Easing();
                animator.startDelay(5);
                animator.stepDuration(250);
                animator.maxTotalDuration(Plottable.Plot._ANIMATION_MAX_DURATION);
                this.animator(Plots.Animator.MAIN, animator);
                this.attr("opacity", 0.6);
                this.attr("fill", new Plottable.Scales.Color().range()[0]);
                this.size(6);
                var circleSymbolFactory = Plottable.SymbolFactories.circle();
                this.symbol(function () { return circleSymbolFactory; });
            }
            Scatter.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Symbol(dataset);
            };
            Scatter.prototype.size = function (size, scale) {
                if (size == null) {
                    return this._propertyBindings.get(Scatter._SIZE_KEY);
                }
                this._bindProperty(Scatter._SIZE_KEY, size, scale);
                this.render();
                return this;
            };
            Scatter.prototype.symbol = function (symbol) {
                if (symbol == null) {
                    return this._propertyBindings.get(Scatter._SYMBOL_KEY);
                }
                this._propertyBindings.set(Scatter._SYMBOL_KEY, { accessor: symbol });
                this.render();
                return this;
            };
            Scatter.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._animateOnNextRender()) {
                    var resetAttrToProjector = this._generateAttrToProjector();
                    resetAttrToProjector["d"] = function () { return ""; };
                    drawSteps.push({ attrToProjector: resetAttrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator(Plots.Animator.MAIN) });
                return drawSteps;
            };
            /**
             * @deprecated As of release v1.1.0, replaced by _entityVisibleOnPlot()
             */
            Scatter.prototype._visibleOnPlot = function (datum, pixelPoint, selection) {
                Plottable.Utils.Window.deprecated("Scatter._visibleOnPlot()", "v1.1.0", "replaced by _entityVisibleOnPlot()");
                var xRange = { min: 0, max: this.width() };
                var yRange = { min: 0, max: this.height() };
                var translation = d3.transform(selection.attr("transform")).translate;
                var bbox = Plottable.Utils.DOM.elementBBox(selection);
                var translatedBbox = {
                    x: bbox.x + translation[0],
                    y: bbox.y + translation[1],
                    width: bbox.width,
                    height: bbox.height
                };
                return Plottable.Utils.DOM.intersectsBBox(xRange, yRange, translatedBbox);
            };
            Scatter.prototype._entityVisibleOnPlot = function (pixelPoint, datum, index, dataset) {
                var xRange = { min: 0, max: this.width() };
                var yRange = { min: 0, max: this.height() };
                var diameter = Plottable.Plot._scaledAccessor(this.size())(datum, index, dataset);
                var translatedBbox = {
                    x: pixelPoint.x - diameter,
                    y: pixelPoint.y - diameter,
                    width: diameter,
                    height: diameter
                };
                return Plottable.Utils.DOM.intersectsBBox(xRange, yRange, translatedBbox);
            };
            Scatter.prototype._propertyProjectors = function () {
                var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
                var xProjector = Plottable.Plot._scaledAccessor(this.x());
                var yProjector = Plottable.Plot._scaledAccessor(this.y());
                var sizeProjector = Plottable.Plot._scaledAccessor(this.size());
                propertyToProjectors["transform"] = function (datum, index, dataset) {
                    return "translate(" + xProjector(datum, index, dataset) + "," + yProjector(datum, index, dataset) + ")";
                };
                var symbolProjector = Plottable.Plot._scaledAccessor(this.symbol());
                propertyToProjectors["d"] = function (datum, index, dataset) {
                    return symbolProjector(datum, index, dataset)(sizeProjector(datum, index, dataset));
                };
                return propertyToProjectors;
            };
            Scatter.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
                var dataXRange;
                var dataYRange;
                if (yRange == null) {
                    var bounds = xRangeOrBounds;
                    dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
                    dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
                }
                else {
                    dataXRange = xRangeOrBounds;
                    dataYRange = yRange;
                }
                var xProjector = Plottable.Plot._scaledAccessor(this.x());
                var yProjector = Plottable.Plot._scaledAccessor(this.y());
                return this.entities().filter(function (entity) {
                    var datum = entity.datum;
                    var index = entity.index;
                    var dataset = entity.dataset;
                    var x = xProjector(datum, index, dataset);
                    var y = yProjector(datum, index, dataset);
                    return dataXRange.min <= x && x <= dataXRange.max && dataYRange.min <= y && y <= dataYRange.max;
                });
            };
            /**
             * Gets the Entities at a particular Point.
             *
             * @param {Point} p
             * @returns {PlotEntity[]}
             */
            Scatter.prototype.entitiesAt = function (p) {
                var xProjector = Plottable.Plot._scaledAccessor(this.x());
                var yProjector = Plottable.Plot._scaledAccessor(this.y());
                var sizeProjector = Plottable.Plot._scaledAccessor(this.size());
                return this.entities().filter(function (entity) {
                    var datum = entity.datum;
                    var index = entity.index;
                    var dataset = entity.dataset;
                    var x = xProjector(datum, index, dataset);
                    var y = yProjector(datum, index, dataset);
                    var size = sizeProjector(datum, index, dataset);
                    return x - size / 2 <= p.x && p.x <= x + size / 2 && y - size / 2 <= p.y && p.y <= y + size / 2;
                });
            };
            Scatter._SIZE_KEY = "size";
            Scatter._SYMBOL_KEY = "symbol";
            return Scatter;
        })(Plottable.XYPlot);
        Plots.Scatter = Scatter;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Bar = (function (_super) {
            __extends(Bar, _super);
            /**
             * A Bar Plot draws bars growing out from a baseline to some value
             *
             * @constructor
             * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
             */
            function Bar(orientation) {
                var _this = this;
                if (orientation === void 0) { orientation = Bar.ORIENTATION_VERTICAL; }
                _super.call(this);
                this._labelFormatter = Plottable.Formatters.identity();
                this._labelsEnabled = false;
                this._hideBarsIfAnyAreTooWide = true;
                this._barPixelWidth = 0;
                this.addClass("bar-plot");
                if (orientation !== Bar.ORIENTATION_VERTICAL && orientation !== Bar.ORIENTATION_HORIZONTAL) {
                    throw new Error(orientation + " is not a valid orientation for Plots.Bar");
                }
                this._isVertical = orientation === Bar.ORIENTATION_VERTICAL;
                this.animator("baseline", new Plottable.Animators.Null());
                this.attr("fill", new Plottable.Scales.Color().range()[0]);
                this.attr("width", function () { return _this._barPixelWidth; });
                this._labelConfig = new Plottable.Utils.Map();
                this._baselineValueProvider = function () { return [_this.baselineValue()]; };
                this._updateBarPixelWidthCallback = function () { return _this._updateBarPixelWidth(); };
            }
            Bar.prototype.x = function (x, xScale) {
                if (x == null) {
                    return _super.prototype.x.call(this);
                }
                if (xScale == null) {
                    _super.prototype.x.call(this, x);
                }
                else {
                    _super.prototype.x.call(this, x, xScale);
                    xScale.onUpdate(this._updateBarPixelWidthCallback);
                }
                this._updateValueScale();
                return this;
            };
            Bar.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                if (yScale == null) {
                    _super.prototype.y.call(this, y);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                    yScale.onUpdate(this._updateBarPixelWidthCallback);
                }
                this._updateValueScale();
                return this;
            };
            /**
             * Gets the orientation of the plot
             *
             * @return "vertical" | "horizontal"
             */
            Bar.prototype.orientation = function () {
                return this._isVertical ? Bar.ORIENTATION_VERTICAL : Bar.ORIENTATION_HORIZONTAL;
            };
            Bar.prototype.render = function () {
                this._updateBarPixelWidth();
                this._updateExtents();
                _super.prototype.render.call(this);
                return this;
            };
            Bar.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Rectangle(dataset);
            };
            Bar.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._baseline = this._renderArea.append("line").classed("baseline", true);
            };
            Bar.prototype.baselineValue = function (value) {
                if (value == null) {
                    if (this._baselineValue != null) {
                        return this._baselineValue;
                    }
                    if (!this._projectorsReady()) {
                        return 0;
                    }
                    var valueScale = this._isVertical ? this.y().scale : this.x().scale;
                    if (!valueScale) {
                        return 0;
                    }
                    if (valueScale instanceof Plottable.Scales.Time) {
                        return new Date(0);
                    }
                    return 0;
                }
                this._baselineValue = value;
                this._updateValueScale();
                this.render();
                return this;
            };
            Bar.prototype.addDataset = function (dataset) {
                _super.prototype.addDataset.call(this, dataset);
                this._updateBarPixelWidth();
                return this;
            };
            Bar.prototype._addDataset = function (dataset) {
                dataset.onUpdate(this._updateBarPixelWidthCallback);
                _super.prototype._addDataset.call(this, dataset);
                return this;
            };
            Bar.prototype.removeDataset = function (dataset) {
                dataset.offUpdate(this._updateBarPixelWidthCallback);
                _super.prototype.removeDataset.call(this, dataset);
                this._updateBarPixelWidth();
                return this;
            };
            Bar.prototype._removeDataset = function (dataset) {
                dataset.offUpdate(this._updateBarPixelWidthCallback);
                _super.prototype._removeDataset.call(this, dataset);
                return this;
            };
            Bar.prototype.datasets = function (datasets) {
                if (datasets == null) {
                    return _super.prototype.datasets.call(this);
                }
                _super.prototype.datasets.call(this, datasets);
                this._updateBarPixelWidth();
                return this;
            };
            Bar.prototype.labelsEnabled = function (enabled) {
                if (enabled == null) {
                    return this._labelsEnabled;
                }
                else {
                    this._labelsEnabled = enabled;
                    this.render();
                    return this;
                }
            };
            Bar.prototype.labelFormatter = function (formatter) {
                if (formatter == null) {
                    return this._labelFormatter;
                }
                else {
                    this._labelFormatter = formatter;
                    this.render();
                    return this;
                }
            };
            Bar.prototype._createNodesForDataset = function (dataset) {
                var drawer = _super.prototype._createNodesForDataset.call(this, dataset);
                drawer.renderArea().classed(Bar._BAR_AREA_CLASS, true);
                var labelArea = this._renderArea.append("g").classed(Bar._LABEL_AREA_CLASS, true);
                var measurer = new SVGTypewriter.Measurers.CacheCharacterMeasurer(labelArea);
                var writer = new SVGTypewriter.Writers.Writer(measurer);
                this._labelConfig.set(dataset, { labelArea: labelArea, measurer: measurer, writer: writer });
                return drawer;
            };
            Bar.prototype._removeDatasetNodes = function (dataset) {
                _super.prototype._removeDatasetNodes.call(this, dataset);
                var labelConfig = this._labelConfig.get(dataset);
                if (labelConfig != null) {
                    labelConfig.labelArea.remove();
                    this._labelConfig.delete(dataset);
                }
            };
            /**
             * Returns the PlotEntity nearest to the query point according to the following algorithm:
             *   - If the query point is inside a bar, returns the PlotEntity for that bar.
             *   - Otherwise, gets the nearest PlotEntity by the primary direction (X for vertical, Y for horizontal),
             *     breaking ties with the secondary direction.
             * Returns undefined if no PlotEntity can be found.
             *
             * @param {Point} queryPoint
             * @returns {PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
             */
            Bar.prototype.entityNearest = function (queryPoint) {
                var _this = this;
                var minPrimaryDist = Infinity;
                var minSecondaryDist = Infinity;
                var queryPtPrimary = this._isVertical ? queryPoint.x : queryPoint.y;
                var queryPtSecondary = this._isVertical ? queryPoint.y : queryPoint.x;
                // SVGRects are positioned with sub-pixel accuracy (the default unit
                // for the x, y, height & width attributes), but user selections (e.g. via
                // mouse events) usually have pixel accuracy. We add a tolerance of 0.5 pixels.
                var tolerance = 0.5;
                var closest;
                this.entities().forEach(function (entity) {
                    if (!_this._entityVisibleOnPlot(entity.position, entity.datum, entity.index, entity.dataset)) {
                        return;
                    }
                    var primaryDist = 0;
                    var secondaryDist = 0;
                    var plotPt = entity.position;
                    // if we're inside a bar, distance in both directions should stay 0
                    var barBBox = Plottable.Utils.DOM.elementBBox(entity.selection);
                    if (!Plottable.Utils.DOM.intersectsBBox(queryPoint.x, queryPoint.y, barBBox, tolerance)) {
                        var plotPtPrimary = _this._isVertical ? plotPt.x : plotPt.y;
                        primaryDist = Math.abs(queryPtPrimary - plotPtPrimary);
                        // compute this bar's min and max along the secondary axis
                        var barMinSecondary = _this._isVertical ? barBBox.y : barBBox.x;
                        var barMaxSecondary = barMinSecondary + (_this._isVertical ? barBBox.height : barBBox.width);
                        if (queryPtSecondary >= barMinSecondary - tolerance && queryPtSecondary <= barMaxSecondary + tolerance) {
                            // if we're within a bar's secondary axis span, it is closest in that direction
                            secondaryDist = 0;
                        }
                        else {
                            var plotPtSecondary = _this._isVertical ? plotPt.y : plotPt.x;
                            secondaryDist = Math.abs(queryPtSecondary - plotPtSecondary);
                        }
                    }
                    // if we find a closer bar, record its distance and start new closest lists
                    if (primaryDist < minPrimaryDist
                        || primaryDist === minPrimaryDist && secondaryDist < minSecondaryDist) {
                        closest = entity;
                        minPrimaryDist = primaryDist;
                        minSecondaryDist = secondaryDist;
                    }
                });
                return closest;
            };
            /**
             * @deprecated As of release v1.1.0, replaced by _entityVisibleOnPlot()
             */
            Bar.prototype._visibleOnPlot = function (datum, pixelPoint, selection) {
                Plottable.Utils.Window.deprecated("Bar._visibleOnPlot()", "v1.1.0", "replaced by _entityVisibleOnPlot()");
                var xRange = { min: 0, max: this.width() };
                var yRange = { min: 0, max: this.height() };
                var barBBox = Plottable.Utils.DOM.elementBBox(selection);
                return Plottable.Utils.DOM.intersectsBBox(xRange, yRange, barBBox);
            };
            Bar.prototype._entityVisibleOnPlot = function (pixelPoint, datum, index, dataset) {
                var xRange = { min: 0, max: this.width() };
                var yRange = { min: 0, max: this.height() };
                var attrToProjector = this._generateAttrToProjector();
                var barBBox = {
                    x: attrToProjector["x"](datum, index, dataset),
                    y: attrToProjector["y"](datum, index, dataset),
                    width: attrToProjector["width"](datum, index, dataset),
                    height: attrToProjector["height"](datum, index, dataset)
                };
                return Plottable.Utils.DOM.intersectsBBox(xRange, yRange, barBBox);
            };
            /**
             * Gets the Entities at a particular Point.
             *
             * @param {Point} p
             * @returns {PlotEntity[]}
             */
            Bar.prototype.entitiesAt = function (p) {
                return this._entitiesIntersecting(p.x, p.y);
            };
            Bar.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
                var dataXRange;
                var dataYRange;
                if (yRange == null) {
                    var bounds = xRangeOrBounds;
                    dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
                    dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
                }
                else {
                    dataXRange = xRangeOrBounds;
                    dataYRange = yRange;
                }
                return this._entitiesIntersecting(dataXRange, dataYRange);
            };
            Bar.prototype._entitiesIntersecting = function (xValOrRange, yValOrRange) {
                var intersected = [];
                this.entities().forEach(function (entity) {
                    if (Plottable.Utils.DOM.intersectsBBox(xValOrRange, yValOrRange, Plottable.Utils.DOM.elementBBox(entity.selection))) {
                        intersected.push(entity);
                    }
                });
                return intersected;
            };
            Bar.prototype._updateValueScale = function () {
                if (!this._projectorsReady()) {
                    return;
                }
                var valueScale = this._isVertical ? this.y().scale : this.x().scale;
                if (valueScale instanceof Plottable.QuantitativeScale) {
                    var qscale = valueScale;
                    qscale.addPaddingExceptionsProvider(this._baselineValueProvider);
                    qscale.addIncludedValuesProvider(this._baselineValueProvider);
                }
            };
            Bar.prototype._additionalPaint = function (time) {
                var _this = this;
                var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
                var scaledBaseline = primaryScale.scale(this.baselineValue());
                var baselineAttr = {
                    "x1": this._isVertical ? 0 : scaledBaseline,
                    "y1": this._isVertical ? scaledBaseline : 0,
                    "x2": this._isVertical ? this.width() : scaledBaseline,
                    "y2": this._isVertical ? scaledBaseline : this.height()
                };
                this._getAnimator("baseline").animate(this._baseline, baselineAttr);
                this.datasets().forEach(function (dataset) { return _this._labelConfig.get(dataset).labelArea.selectAll("g").remove(); });
                if (this._labelsEnabled) {
                    Plottable.Utils.Window.setTimeout(function () { return _this._drawLabels(); }, time);
                }
            };
            /**
             * Makes sure the extent takes into account the widths of the bars
             */
            Bar.prototype._extentsForProperty = function (property) {
                var _this = this;
                var extents = _super.prototype._extentsForProperty.call(this, property);
                var accScaleBinding;
                if (property === "x" && this._isVertical) {
                    accScaleBinding = this.x();
                }
                else if (property === "y" && !this._isVertical) {
                    accScaleBinding = this.y();
                }
                else {
                    return extents;
                }
                if (!(accScaleBinding && accScaleBinding.scale && accScaleBinding.scale instanceof Plottable.QuantitativeScale)) {
                    return extents;
                }
                var scale = accScaleBinding.scale;
                // To account for inverted domains
                extents = extents.map(function (extent) { return d3.extent([
                    scale.invert(scale.scale(extent[0]) - _this._barPixelWidth / 2),
                    scale.invert(scale.scale(extent[0]) + _this._barPixelWidth / 2),
                    scale.invert(scale.scale(extent[1]) - _this._barPixelWidth / 2),
                    scale.invert(scale.scale(extent[1]) + _this._barPixelWidth / 2)
                ]); });
                return extents;
            };
            Bar.prototype._drawLabels = function () {
                var _this = this;
                var dataToDraw = this._getDataToDraw();
                var labelsTooWide = false;
                this.datasets().forEach(function (dataset) { return labelsTooWide = labelsTooWide || _this._drawLabel(dataToDraw.get(dataset), dataset); });
                if (this._hideBarsIfAnyAreTooWide && labelsTooWide) {
                    this.datasets().forEach(function (dataset) { return _this._labelConfig.get(dataset).labelArea.selectAll("g").remove(); });
                }
            };
            Bar.prototype._drawLabel = function (data, dataset) {
                var _this = this;
                var attrToProjector = this._generateAttrToProjector();
                var labelConfig = this._labelConfig.get(dataset);
                var labelArea = labelConfig.labelArea;
                var measurer = labelConfig.measurer;
                var writer = labelConfig.writer;
                var drawLabel = function (d, i) {
                    var valueAccessor = _this._isVertical ? _this.y().accessor : _this.x().accessor;
                    var value = valueAccessor(d, i, dataset);
                    var valueScale = _this._isVertical ? _this.y().scale : _this.x().scale;
                    var scaledValue = valueScale != null ? valueScale.scale(value) : value;
                    var scaledBaseline = valueScale != null ? valueScale.scale(_this.baselineValue()) : _this.baselineValue();
                    var barWidth = attrToProjector["width"](d, i, dataset);
                    var barHeight = attrToProjector["height"](d, i, dataset);
                    var text = _this._labelFormatter(valueAccessor(d, i, dataset));
                    var measurement = measurer.measure(text);
                    var xAlignment = "center";
                    var yAlignment = "center";
                    var labelContainerOrigin = {
                        x: attrToProjector["x"](d, i, dataset),
                        y: attrToProjector["y"](d, i, dataset)
                    };
                    var containerWidth = barWidth;
                    var containerHeight = barHeight;
                    var labelOrigin = {
                        x: labelContainerOrigin.x,
                        y: labelContainerOrigin.y
                    };
                    var showLabelOnBar;
                    if (_this._isVertical) {
                        labelOrigin.x += containerWidth / 2 - measurement.width / 2;
                        var barY = attrToProjector["y"](d, i, dataset);
                        var effectiveBarHeight = barHeight;
                        if (barY + barHeight > _this.height()) {
                            effectiveBarHeight = _this.height() - barY;
                        }
                        else if (barY < 0) {
                            effectiveBarHeight = barY + barHeight;
                        }
                        var offset = Bar._LABEL_VERTICAL_PADDING;
                        showLabelOnBar = measurement.height + 2 * offset <= effectiveBarHeight;
                        if (showLabelOnBar) {
                            if (scaledValue < scaledBaseline) {
                                labelContainerOrigin.y += offset;
                                yAlignment = "top";
                                labelOrigin.y += offset;
                            }
                            else {
                                labelContainerOrigin.y -= offset;
                                yAlignment = "bottom";
                                labelOrigin.y += containerHeight - offset - measurement.height;
                            }
                        }
                        else {
                            containerHeight = barHeight + offset + measurement.height;
                            if (scaledValue <= scaledBaseline) {
                                labelContainerOrigin.y -= offset + measurement.height;
                                yAlignment = "top";
                                labelOrigin.y -= offset + measurement.height;
                            }
                            else {
                                yAlignment = "bottom";
                                labelOrigin.y += barHeight + offset;
                            }
                        }
                    }
                    else {
                        labelOrigin.y += containerHeight / 2 - measurement.height / 2;
                        var barX = attrToProjector["x"](d, i, dataset);
                        var effectiveBarWidth = barWidth;
                        if (barX + barWidth > _this.width()) {
                            effectiveBarWidth = _this.width() - barX;
                        }
                        else if (barX < 0) {
                            effectiveBarWidth = barX + barWidth;
                        }
                        var offset = Bar._LABEL_HORIZONTAL_PADDING;
                        showLabelOnBar = measurement.width + 2 * offset <= effectiveBarWidth;
                        if (showLabelOnBar) {
                            if (scaledValue < scaledBaseline) {
                                labelContainerOrigin.x += offset;
                                xAlignment = "left";
                                labelOrigin.x += offset;
                            }
                            else {
                                labelContainerOrigin.x -= offset;
                                xAlignment = "right";
                                labelOrigin.x += containerWidth - offset - measurement.width;
                            }
                        }
                        else {
                            containerWidth = barWidth + offset + measurement.width;
                            if (scaledValue < scaledBaseline) {
                                labelContainerOrigin.x -= offset + measurement.width;
                                xAlignment = "left";
                                labelOrigin.x -= offset + measurement.width;
                            }
                            else {
                                xAlignment = "right";
                                labelOrigin.x += barWidth + offset;
                            }
                        }
                    }
                    var labelContainer = labelArea.append("g").attr("transform", "translate(" + labelContainerOrigin.x + ", " + labelContainerOrigin.y + ")");
                    if (showLabelOnBar) {
                        labelContainer.classed("on-bar-label", true);
                        var color = attrToProjector["fill"](d, i, dataset);
                        var dark = Plottable.Utils.Color.contrast("white", color) * 1.6 < Plottable.Utils.Color.contrast("black", color);
                        labelContainer.classed(dark ? "dark-label" : "light-label", true);
                    }
                    else {
                        labelContainer.classed("off-bar-label", true);
                    }
                    var hideLabel = labelOrigin.x < 0 ||
                        labelOrigin.y < 0 ||
                        labelOrigin.x + measurement.width > _this.width() ||
                        labelOrigin.y + measurement.height > _this.height();
                    labelContainer.style("visibility", hideLabel ? "hidden" : "inherit");
                    var writeOptions = {
                        selection: labelContainer,
                        xAlign: xAlignment,
                        yAlign: yAlignment,
                        textRotation: 0
                    };
                    writer.write(text, containerWidth, containerHeight, writeOptions);
                    var tooWide = _this._isVertical ? barWidth < measurement.width : barHeight < measurement.height;
                    return tooWide;
                };
                var labelTooWide = data.map(drawLabel);
                return labelTooWide.some(function (d) { return d; });
            };
            Bar.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._animateOnNextRender()) {
                    var resetAttrToProjector = this._generateAttrToProjector();
                    var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
                    var scaledBaseline = primaryScale.scale(this.baselineValue());
                    var positionAttr = this._isVertical ? "y" : "x";
                    var dimensionAttr = this._isVertical ? "height" : "width";
                    resetAttrToProjector[positionAttr] = function () { return scaledBaseline; };
                    resetAttrToProjector[dimensionAttr] = function () { return 0; };
                    drawSteps.push({ attrToProjector: resetAttrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator(Plots.Animator.MAIN) });
                return drawSteps;
            };
            Bar.prototype._generateAttrToProjector = function () {
                // Primary scale/direction: the "length" of the bars
                // Secondary scale/direction: the "width" of the bars
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
                var primaryAttr = this._isVertical ? "y" : "x";
                var secondaryAttr = this._isVertical ? "x" : "y";
                var scaledBaseline = primaryScale.scale(this.baselineValue());
                var positionF = this._isVertical ? Plottable.Plot._scaledAccessor(this.x()) : Plottable.Plot._scaledAccessor(this.y());
                var widthF = attrToProjector["width"];
                var originalPositionFn = this._isVertical ? Plottable.Plot._scaledAccessor(this.y()) : Plottable.Plot._scaledAccessor(this.x());
                var heightF = function (d, i, dataset) {
                    return Math.abs(scaledBaseline - originalPositionFn(d, i, dataset));
                };
                attrToProjector["width"] = this._isVertical ? widthF : heightF;
                attrToProjector["height"] = this._isVertical ? heightF : widthF;
                attrToProjector[secondaryAttr] = function (d, i, dataset) {
                    return positionF(d, i, dataset) - widthF(d, i, dataset) / 2;
                };
                attrToProjector[primaryAttr] = function (d, i, dataset) {
                    var originalPos = originalPositionFn(d, i, dataset);
                    // If it is past the baseline, it should start at the baselin then width/height
                    // carries it over. If it's not past the baseline, leave it at original position and
                    // then width/height carries it to baseline
                    return (originalPos > scaledBaseline) ? scaledBaseline : originalPos;
                };
                return attrToProjector;
            };
            /**
             * Computes the barPixelWidth of all the bars in the plot.
             *
             * If the position scale of the plot is a CategoryScale and in bands mode, then the rangeBands function will be used.
             * If the position scale of the plot is a QuantitativeScale, then the bar width is equal to the smallest distance between
             * two adjacent data points, padded for visualisation.
             */
            Bar.prototype._getBarPixelWidth = function () {
                if (!this._projectorsReady()) {
                    return 0;
                }
                var barPixelWidth;
                var barScale = this._isVertical ? this.x().scale : this.y().scale;
                if (barScale instanceof Plottable.Scales.Category) {
                    barPixelWidth = barScale.rangeBand();
                }
                else {
                    var barAccessor = this._isVertical ? this.x().accessor : this.y().accessor;
                    var numberBarAccessorData = d3.set(Plottable.Utils.Array.flatten(this.datasets().map(function (dataset) {
                        return dataset.data().map(function (d, i) { return barAccessor(d, i, dataset); })
                            .filter(function (d) { return d != null; })
                            .map(function (d) { return d.valueOf(); });
                    }))).values().map(function (value) { return +value; });
                    numberBarAccessorData.sort(function (a, b) { return a - b; });
                    var scaledData = numberBarAccessorData.map(function (datum) { return barScale.scale(datum); });
                    var barAccessorDataPairs = d3.pairs(scaledData);
                    var barWidthDimension = this._isVertical ? this.width() : this.height();
                    barPixelWidth = Plottable.Utils.Math.min(barAccessorDataPairs, function (pair, i) {
                        return Math.abs(pair[1] - pair[0]);
                    }, barWidthDimension * Bar._SINGLE_BAR_DIMENSION_RATIO);
                    barPixelWidth *= Bar._BAR_WIDTH_RATIO;
                }
                return barPixelWidth;
            };
            Bar.prototype._updateBarPixelWidth = function () {
                this._barPixelWidth = this._getBarPixelWidth();
            };
            Bar.prototype.entities = function (datasets) {
                if (datasets === void 0) { datasets = this.datasets(); }
                if (!this._projectorsReady()) {
                    return [];
                }
                var entities = _super.prototype.entities.call(this, datasets);
                return entities;
            };
            Bar.prototype._pixelPoint = function (datum, index, dataset) {
                var attrToProjector = this._generateAttrToProjector();
                var rectX = attrToProjector["x"](datum, index, dataset);
                var rectY = attrToProjector["y"](datum, index, dataset);
                var rectWidth = attrToProjector["width"](datum, index, dataset);
                var rectHeight = attrToProjector["height"](datum, index, dataset);
                var x;
                var y;
                var originalPosition = (this._isVertical ? Plottable.Plot._scaledAccessor(this.y()) : Plottable.Plot._scaledAccessor(this.x()))(datum, index, dataset);
                var scaledBaseline = (this._isVertical ? this.y().scale : this.x().scale).scale(this.baselineValue());
                if (this._isVertical) {
                    x = rectX + rectWidth / 2;
                    y = originalPosition <= scaledBaseline ? rectY : rectY + rectHeight;
                }
                else {
                    x = originalPosition >= scaledBaseline ? rectX + rectWidth : rectX;
                    y = rectY + rectHeight / 2;
                }
                return { x: x, y: y };
            };
            Bar.prototype._uninstallScaleForKey = function (scale, key) {
                scale.offUpdate(this._updateBarPixelWidthCallback);
                _super.prototype._uninstallScaleForKey.call(this, scale, key);
            };
            Bar.prototype._getDataToDraw = function () {
                var dataToDraw = new Plottable.Utils.Map();
                var attrToProjector = this._generateAttrToProjector();
                this.datasets().forEach(function (dataset) {
                    var data = dataset.data().filter(function (d, i) { return Plottable.Utils.Math.isValidNumber(attrToProjector["x"](d, i, dataset)) &&
                        Plottable.Utils.Math.isValidNumber(attrToProjector["y"](d, i, dataset)) &&
                        Plottable.Utils.Math.isValidNumber(attrToProjector["width"](d, i, dataset)) &&
                        Plottable.Utils.Math.isValidNumber(attrToProjector["height"](d, i, dataset)); });
                    dataToDraw.set(dataset, data);
                });
                return dataToDraw;
            };
            Bar.ORIENTATION_VERTICAL = "vertical";
            Bar.ORIENTATION_HORIZONTAL = "horizontal";
            Bar._BAR_WIDTH_RATIO = 0.95;
            Bar._SINGLE_BAR_DIMENSION_RATIO = 0.4;
            Bar._BAR_AREA_CLASS = "bar-area";
            Bar._LABEL_AREA_CLASS = "bar-label-text-area";
            Bar._LABEL_VERTICAL_PADDING = 5;
            Bar._LABEL_HORIZONTAL_PADDING = 5;
            return Bar;
        })(Plottable.XYPlot);
        Plots.Bar = Bar;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Line = (function (_super) {
            __extends(Line, _super);
            /**
             * A Line Plot draws line segments starting from the first data point to the next.
             *
             * @constructor
             */
            function Line() {
                _super.call(this);
                this._interpolator = "linear";
                this._autorangeSmooth = false;
                this._croppedRenderingEnabled = true;
                this._downsamplingEnabled = false;
                this.addClass("line-plot");
                var animator = new Plottable.Animators.Easing();
                animator.stepDuration(Plottable.Plot._ANIMATION_MAX_DURATION);
                animator.easingMode("exp-in-out");
                animator.maxTotalDuration(Plottable.Plot._ANIMATION_MAX_DURATION);
                this.animator(Plots.Animator.MAIN, animator);
                this.attr("stroke", new Plottable.Scales.Color().range()[0]);
                this.attr("stroke-width", "2px");
            }
            Line.prototype.x = function (x, xScale) {
                if (x == null) {
                    return _super.prototype.x.call(this);
                }
                else {
                    if (xScale == null) {
                        _super.prototype.x.call(this, x);
                    }
                    else {
                        _super.prototype.x.call(this, x, xScale);
                    }
                    this._setScaleSnapping();
                    return this;
                }
            };
            Line.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                    this._setScaleSnapping();
                    return this;
                }
            };
            Line.prototype.autorangeMode = function (autorangeMode) {
                if (autorangeMode == null) {
                    return _super.prototype.autorangeMode.call(this);
                }
                _super.prototype.autorangeMode.call(this, autorangeMode);
                this._setScaleSnapping();
                return this;
            };
            Line.prototype.autorangeSmooth = function (autorangeSmooth) {
                if (autorangeSmooth == null) {
                    return this._autorangeSmooth;
                }
                this._autorangeSmooth = autorangeSmooth;
                this._setScaleSnapping();
                return this;
            };
            Line.prototype._setScaleSnapping = function () {
                if (this.autorangeMode() === "x" && this.x() && this.x().scale && this.x().scale instanceof Plottable.QuantitativeScale) {
                    this.x().scale.snappingDomainEnabled(!this.autorangeSmooth());
                }
                if (this.autorangeMode() === "y" && this.y() && this.y().scale && this.y().scale instanceof Plottable.QuantitativeScale) {
                    this.y().scale.snappingDomainEnabled(!this.autorangeSmooth());
                }
            };
            Line.prototype.interpolator = function (interpolator) {
                if (interpolator == null) {
                    return this._interpolator;
                }
                this._interpolator = interpolator;
                this.render();
                return this;
            };
            Line.prototype.downsamplingEnabled = function (downsampling) {
                if (downsampling == null) {
                    return this._downsamplingEnabled;
                }
                this._downsamplingEnabled = downsampling;
                return this;
            };
            Line.prototype.croppedRenderingEnabled = function (croppedRendering) {
                if (croppedRendering == null) {
                    return this._croppedRenderingEnabled;
                }
                this._croppedRenderingEnabled = croppedRendering;
                this.render();
                return this;
            };
            Line.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Line(dataset);
            };
            Line.prototype._extentsForProperty = function (property) {
                var extents = _super.prototype._extentsForProperty.call(this, property);
                if (!this._autorangeSmooth) {
                    return extents;
                }
                if (this.autorangeMode() !== property) {
                    return extents;
                }
                if (this.autorangeMode() !== "x" && this.autorangeMode() !== "y") {
                    return extents;
                }
                var edgeIntersectionPoints = this._getEdgeIntersectionPoints();
                var includedValues;
                if (this.autorangeMode() === "y") {
                    includedValues = edgeIntersectionPoints.left.concat(edgeIntersectionPoints.right).map(function (point) { return point.y; });
                }
                else {
                    includedValues = edgeIntersectionPoints.top.concat(edgeIntersectionPoints.bottom).map(function (point) { return point.x; });
                }
                return extents.map(function (extent) { return d3.extent(d3.merge([extent, includedValues])); });
            };
            Line.prototype._getEdgeIntersectionPoints = function () {
                var _this = this;
                if (!(this.y().scale instanceof Plottable.QuantitativeScale && this.x().scale instanceof Plottable.QuantitativeScale)) {
                    return {
                        left: [],
                        right: [],
                        top: [],
                        bottom: []
                    };
                }
                var yScale = this.y().scale;
                var xScale = this.x().scale;
                var intersectionPoints = {
                    left: [],
                    right: [],
                    top: [],
                    bottom: []
                };
                var leftX = xScale.scale(xScale.domain()[0]);
                var rightX = xScale.scale(xScale.domain()[1]);
                var bottomY = yScale.scale(yScale.domain()[0]);
                var topY = yScale.scale(yScale.domain()[1]);
                this.datasets().forEach(function (dataset) {
                    var data = dataset.data();
                    var x1, x2, y1, y2;
                    var prevX, prevY, currX, currY;
                    for (var i = 1; i < data.length; i++) {
                        prevX = currX || xScale.scale(_this.x().accessor(data[i - 1], i - 1, dataset));
                        prevY = currY || yScale.scale(_this.y().accessor(data[i - 1], i - 1, dataset));
                        currX = xScale.scale(_this.x().accessor(data[i], i, dataset));
                        currY = yScale.scale(_this.y().accessor(data[i], i, dataset));
                        // If values crossed left edge
                        if ((prevX < leftX) === (leftX <= currX)) {
                            x1 = leftX - prevX;
                            x2 = currX - prevX;
                            y2 = currY - prevY;
                            y1 = x1 * y2 / x2;
                            intersectionPoints.left.push({
                                x: leftX,
                                y: yScale.invert(prevY + y1)
                            });
                        }
                        // If values crossed right edge
                        if ((prevX < rightX) === (rightX <= currX)) {
                            x1 = rightX - prevX;
                            x2 = currX - prevX;
                            y2 = currY - prevY;
                            y1 = x1 * y2 / x2;
                            intersectionPoints.right.push({
                                x: rightX,
                                y: yScale.invert(prevY + y1)
                            });
                        }
                        // If values crossed upper edge
                        if ((prevY < topY) === (topY <= currY)) {
                            x2 = currX - prevX;
                            y1 = topY - prevY;
                            y2 = currY - prevY;
                            x1 = y1 * x2 / y2;
                            intersectionPoints.top.push({
                                x: xScale.invert(prevX + x1),
                                y: topY
                            });
                        }
                        // If values crossed lower edge
                        if ((prevY < bottomY) === (bottomY <= currY)) {
                            x2 = currX - prevX;
                            y1 = bottomY - prevY;
                            y2 = currY - prevY;
                            x1 = y1 * x2 / y2;
                            intersectionPoints.bottom.push({
                                x: xScale.invert(prevX + x1),
                                y: bottomY
                            });
                        }
                    }
                    ;
                });
                return intersectionPoints;
            };
            Line.prototype._getResetYFunction = function () {
                // gets the y-value generator for the animation start point
                var yDomain = this.y().scale.domain();
                var domainMax = Math.max(yDomain[0], yDomain[1]);
                var domainMin = Math.min(yDomain[0], yDomain[1]);
                // start from zero, or the closest domain value to zero
                // avoids lines zooming on from offscreen.
                var startValue = (domainMax < 0 && domainMax) || (domainMin > 0 && domainMin) || 0;
                var scaledStartValue = this.y().scale.scale(startValue);
                return function (d, i, dataset) { return scaledStartValue; };
            };
            Line.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._animateOnNextRender()) {
                    var attrToProjector = this._generateAttrToProjector();
                    attrToProjector["d"] = this._constructLineProjector(Plottable.Plot._scaledAccessor(this.x()), this._getResetYFunction());
                    drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator(Plots.Animator.MAIN) });
                return drawSteps;
            };
            Line.prototype._generateAttrToProjector = function () {
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                Object.keys(attrToProjector).forEach(function (attribute) {
                    if (attribute === "d") {
                        return;
                    }
                    var projector = attrToProjector[attribute];
                    attrToProjector[attribute] = function (data, i, dataset) {
                        return data.length > 0 ? projector(data[0], i, dataset) : null;
                    };
                });
                return attrToProjector;
            };
            /**
             * Returns the PlotEntity nearest to the query point by X then by Y, or undefined if no PlotEntity can be found.
             *
             * @param {Point} queryPoint
             * @returns {PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
             */
            Line.prototype.entityNearest = function (queryPoint) {
                var _this = this;
                var minXDist = Infinity;
                var minYDist = Infinity;
                var closest;
                this.entities().forEach(function (entity) {
                    if (!_this._entityVisibleOnPlot(entity.position, entity.datum, entity.index, entity.dataset)) {
                        return;
                    }
                    var xDist = Math.abs(queryPoint.x - entity.position.x);
                    var yDist = Math.abs(queryPoint.y - entity.position.y);
                    if (xDist < minXDist || xDist === minXDist && yDist < minYDist) {
                        closest = entity;
                        minXDist = xDist;
                        minYDist = yDist;
                    }
                });
                return closest;
            };
            Line.prototype._propertyProjectors = function () {
                var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
                propertyToProjectors["d"] = this._constructLineProjector(Plottable.Plot._scaledAccessor(this.x()), Plottable.Plot._scaledAccessor(this.y()));
                return propertyToProjectors;
            };
            Line.prototype._constructLineProjector = function (xProjector, yProjector) {
                var _this = this;
                var definedProjector = function (d, i, dataset) {
                    var positionX = Plottable.Plot._scaledAccessor(_this.x())(d, i, dataset);
                    var positionY = Plottable.Plot._scaledAccessor(_this.y())(d, i, dataset);
                    return positionX != null && !Plottable.Utils.Math.isNaN(positionX) &&
                        positionY != null && !Plottable.Utils.Math.isNaN(positionY);
                };
                return function (datum, index, dataset) {
                    return d3.svg.line()
                        .x(function (innerDatum, innerIndex) { return xProjector(innerDatum, innerIndex, dataset); })
                        .y(function (innerDatum, innerIndex) { return yProjector(innerDatum, innerIndex, dataset); })
                        .interpolate(_this.interpolator())
                        .defined(function (innerDatum, innerIndex) { return definedProjector(innerDatum, innerIndex, dataset); })(datum);
                };
            };
            Line.prototype._getDataToDraw = function () {
                var _this = this;
                var dataToDraw = new Plottable.Utils.Map();
                this.datasets().forEach(function (dataset) {
                    var data = dataset.data();
                    if (!_this._croppedRenderingEnabled && !_this._downsamplingEnabled) {
                        dataToDraw.set(dataset, [data]);
                        return;
                    }
                    var filteredDataIndices = data.map(function (d, i) { return i; });
                    if (_this._croppedRenderingEnabled) {
                        filteredDataIndices = _this._filterCroppedRendering(dataset, filteredDataIndices);
                    }
                    if (_this._downsamplingEnabled) {
                        filteredDataIndices = _this._filterDownsampling(dataset, filteredDataIndices);
                    }
                    dataToDraw.set(dataset, [filteredDataIndices.map(function (d, i) { return data[d]; })]);
                });
                return dataToDraw;
            };
            Line.prototype._filterCroppedRendering = function (dataset, indices) {
                var _this = this;
                var xProjector = Plottable.Plot._scaledAccessor(this.x());
                var yProjector = Plottable.Plot._scaledAccessor(this.y());
                var data = dataset.data();
                var filteredDataIndices = [];
                var pointInViewport = function (x, y) {
                    return Plottable.Utils.Math.inRange(x, 0, _this.width()) &&
                        Plottable.Utils.Math.inRange(y, 0, _this.height());
                };
                for (var i = 0; i < indices.length; i++) {
                    var currXPoint = xProjector(data[indices[i]], indices[i], dataset);
                    var currYPoint = yProjector(data[indices[i]], indices[i], dataset);
                    var shouldShow = pointInViewport(currXPoint, currYPoint);
                    if (!shouldShow && indices[i - 1] != null && data[indices[i - 1]] != null) {
                        var prevXPoint = xProjector(data[indices[i - 1]], indices[i - 1], dataset);
                        var prevYPoint = yProjector(data[indices[i - 1]], indices[i - 1], dataset);
                        shouldShow = shouldShow || pointInViewport(prevXPoint, prevYPoint);
                    }
                    if (!shouldShow && indices[i + 1] != null && data[indices[i + 1]] != null) {
                        var nextXPoint = xProjector(data[indices[i + 1]], indices[i + 1], dataset);
                        var nextYPoint = yProjector(data[indices[i + 1]], indices[i + 1], dataset);
                        shouldShow = shouldShow || pointInViewport(nextXPoint, nextYPoint);
                    }
                    if (shouldShow) {
                        filteredDataIndices.push(indices[i]);
                    }
                }
                return filteredDataIndices;
            };
            Line.prototype._filterDownsampling = function (dataset, indices) {
                if (indices.length === 0) {
                    return [];
                }
                var data = dataset.data();
                var scaledXAccessor = Plottable.Plot._scaledAccessor(this.x());
                var scaledYAccessor = Plottable.Plot._scaledAccessor(this.y());
                var filteredIndices = [indices[0]];
                var indexOnCurrentSlope = function (i, currentSlope) {
                    var p1x = scaledXAccessor(data[indices[i]], indices[i], dataset);
                    var p1y = scaledYAccessor(data[indices[i]], indices[i], dataset);
                    var p2x = scaledXAccessor(data[indices[i + 1]], indices[i + 1], dataset);
                    var p2y = scaledYAccessor(data[indices[i + 1]], indices[i + 1], dataset);
                    if (currentSlope === Infinity) {
                        return Math.floor(p1x) === Math.floor(p2x);
                    }
                    else {
                        var expectedP2y = p1y + (p2x - p1x) * currentSlope;
                        return Math.floor(p2y) === Math.floor(expectedP2y);
                    }
                };
                for (var i = 0; i < indices.length - 1;) {
                    var indexFirst = indices[i];
                    var p1x = scaledXAccessor(data[indices[i]], indices[i], dataset);
                    var p1y = scaledYAccessor(data[indices[i]], indices[i], dataset);
                    var p2x = scaledXAccessor(data[indices[i + 1]], indices[i + 1], dataset);
                    var p2y = scaledYAccessor(data[indices[i + 1]], indices[i + 1], dataset);
                    var currentSlope = (Math.floor(p1x) === Math.floor(p2x)) ? Infinity : (p2y - p1y) / (p2x - p1x);
                    var indexMin = indices[i];
                    var minScaledValue = (currentSlope === Infinity) ? p1y : p1x;
                    var indexMax = indexMin;
                    var maxScaledValue = minScaledValue;
                    var firstIndexOnCurrentSlope = true;
                    while (i < indices.length - 1 && (firstIndexOnCurrentSlope || indexOnCurrentSlope(i, currentSlope))) {
                        i++;
                        firstIndexOnCurrentSlope = false;
                        var currScaledValue = currentSlope === Infinity ? scaledYAccessor(data[indices[i]], indices[i], dataset) :
                            scaledXAccessor(data[indices[i]], indices[i], dataset);
                        if (currScaledValue > maxScaledValue) {
                            maxScaledValue = currScaledValue;
                            indexMax = indices[i];
                        }
                        if (currScaledValue < minScaledValue) {
                            minScaledValue = currScaledValue;
                            indexMin = indices[i];
                        }
                    }
                    var indexLast = indices[i];
                    if (indexMin !== indexFirst) {
                        filteredIndices.push(indexMin);
                    }
                    if (indexMax !== indexMin && indexMax !== indexFirst) {
                        filteredIndices.push(indexMax);
                    }
                    if (indexLast !== indexFirst && indexLast !== indexMin && indexLast !== indexMax) {
                        filteredIndices.push(indexLast);
                    }
                }
                return filteredIndices;
            };
            return Line;
        })(Plottable.XYPlot);
        Plots.Line = Line;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Area = (function (_super) {
            __extends(Area, _super);
            /**
             * An Area Plot draws a filled region (area) between Y and Y0.
             *
             * @constructor
             */
            function Area() {
                _super.call(this);
                this.addClass("area-plot");
                this.y0(0); // default
                this.attr("fill-opacity", 0.25);
                this.attr("fill", new Plottable.Scales.Color().range()[0]);
                this._lineDrawers = new Plottable.Utils.Map();
            }
            Area.prototype._setup = function () {
                var _this = this;
                _super.prototype._setup.call(this);
                this._lineDrawers.forEach(function (d) { return d.renderArea(_this._renderArea.append("g")); });
            };
            Area.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                if (yScale == null) {
                    _super.prototype.y.call(this, y);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                }
                if (yScale != null) {
                    var y0 = this.y0().accessor;
                    if (y0 != null) {
                        this._bindProperty(Area._Y0_KEY, y0, yScale);
                    }
                    this._updateYScale();
                }
                return this;
            };
            Area.prototype.y0 = function (y0) {
                if (y0 == null) {
                    return this._propertyBindings.get(Area._Y0_KEY);
                }
                var yBinding = this.y();
                var yScale = yBinding && yBinding.scale;
                this._bindProperty(Area._Y0_KEY, y0, yScale);
                this._updateYScale();
                this.render();
                return this;
            };
            Area.prototype._onDatasetUpdate = function () {
                _super.prototype._onDatasetUpdate.call(this);
                this._updateYScale();
            };
            Area.prototype.addDataset = function (dataset) {
                _super.prototype.addDataset.call(this, dataset);
                return this;
            };
            Area.prototype._addDataset = function (dataset) {
                var lineDrawer = new Plottable.Drawers.Line(dataset);
                if (this._isSetup) {
                    lineDrawer.renderArea(this._renderArea.append("g"));
                }
                this._lineDrawers.set(dataset, lineDrawer);
                _super.prototype._addDataset.call(this, dataset);
                return this;
            };
            Area.prototype._removeDatasetNodes = function (dataset) {
                _super.prototype._removeDatasetNodes.call(this, dataset);
                this._lineDrawers.get(dataset).remove();
            };
            Area.prototype._additionalPaint = function () {
                var _this = this;
                var drawSteps = this._generateLineDrawSteps();
                var dataToDraw = this._getDataToDraw();
                this.datasets().forEach(function (dataset) { return _this._lineDrawers.get(dataset).draw(dataToDraw.get(dataset), drawSteps); });
            };
            Area.prototype._generateLineDrawSteps = function () {
                var drawSteps = [];
                if (this._animateOnNextRender()) {
                    var attrToProjector = this._generateLineAttrToProjector();
                    attrToProjector["d"] = this._constructLineProjector(Plottable.Plot._scaledAccessor(this.x()), this._getResetYFunction());
                    drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
                }
                drawSteps.push({ attrToProjector: this._generateLineAttrToProjector(), animator: this._getAnimator(Plots.Animator.MAIN) });
                return drawSteps;
            };
            Area.prototype._generateLineAttrToProjector = function () {
                var lineAttrToProjector = this._generateAttrToProjector();
                lineAttrToProjector["d"] = this._constructLineProjector(Plottable.Plot._scaledAccessor(this.x()), Plottable.Plot._scaledAccessor(this.y()));
                return lineAttrToProjector;
            };
            Area.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Area(dataset);
            };
            Area.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._animateOnNextRender()) {
                    var attrToProjector = this._generateAttrToProjector();
                    attrToProjector["d"] = this._constructAreaProjector(Plottable.Plot._scaledAccessor(this.x()), this._getResetYFunction(), Plottable.Plot._scaledAccessor(this.y0()));
                    drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator(Plots.Animator.MAIN) });
                return drawSteps;
            };
            Area.prototype._updateYScale = function () {
                var extents = this._propertyExtents.get("y0");
                var extent = Plottable.Utils.Array.flatten(extents);
                var uniqExtentVals = Plottable.Utils.Array.uniq(extent);
                var constantBaseline = uniqExtentVals.length === 1 ? uniqExtentVals[0] : null;
                var yBinding = this.y();
                var yScale = (yBinding && yBinding.scale);
                if (yScale == null) {
                    return;
                }
                if (this._constantBaselineValueProvider != null) {
                    yScale.removePaddingExceptionsProvider(this._constantBaselineValueProvider);
                    this._constantBaselineValueProvider = null;
                }
                if (constantBaseline != null) {
                    this._constantBaselineValueProvider = function () { return [constantBaseline]; };
                    yScale.addPaddingExceptionsProvider(this._constantBaselineValueProvider);
                }
            };
            Area.prototype._getResetYFunction = function () {
                return Plottable.Plot._scaledAccessor(this.y0());
            };
            Area.prototype._propertyProjectors = function () {
                var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
                propertyToProjectors["d"] = this._constructAreaProjector(Plottable.Plot._scaledAccessor(this.x()), Plottable.Plot._scaledAccessor(this.y()), Plottable.Plot._scaledAccessor(this.y0()));
                return propertyToProjectors;
            };
            Area.prototype.selections = function (datasets) {
                var _this = this;
                if (datasets === void 0) { datasets = this.datasets(); }
                var allSelections = _super.prototype.selections.call(this, datasets)[0];
                var lineDrawers = datasets.map(function (dataset) { return _this._lineDrawers.get(dataset); })
                    .filter(function (drawer) { return drawer != null; });
                lineDrawers.forEach(function (ld, i) { return allSelections.push(ld.selectionForIndex(i).node()); });
                return d3.selectAll(allSelections);
            };
            Area.prototype._constructAreaProjector = function (xProjector, yProjector, y0Projector) {
                var _this = this;
                var definedProjector = function (d, i, dataset) {
                    var positionX = Plottable.Plot._scaledAccessor(_this.x())(d, i, dataset);
                    var positionY = Plottable.Plot._scaledAccessor(_this.y())(d, i, dataset);
                    return Plottable.Utils.Math.isValidNumber(positionX) && Plottable.Utils.Math.isValidNumber(positionY);
                };
                return function (datum, index, dataset) {
                    var areaGenerator = d3.svg.area()
                        .x(function (innerDatum, innerIndex) { return xProjector(innerDatum, innerIndex, dataset); })
                        .y1(function (innerDatum, innerIndex) { return yProjector(innerDatum, innerIndex, dataset); })
                        .y0(function (innerDatum, innerIndex) { return y0Projector(innerDatum, innerIndex, dataset); })
                        .interpolate(_this.interpolator())
                        .defined(function (innerDatum, innerIndex) { return definedProjector(innerDatum, innerIndex, dataset); });
                    return areaGenerator(datum);
                };
            };
            Area._Y0_KEY = "y0";
            return Area;
        })(Plots.Line);
        Plots.Area = Area;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var ClusteredBar = (function (_super) {
            __extends(ClusteredBar, _super);
            /**
             * A ClusteredBar Plot groups bars across Datasets based on the primary value of the bars.
             *   On a vertical ClusteredBar Plot, the bars with the same X value are grouped.
             *   On a horizontal ClusteredBar Plot, the bars with the same Y value are grouped.
             *
             * @constructor
             * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
             */
            function ClusteredBar(orientation) {
                if (orientation === void 0) { orientation = Plots.Bar.ORIENTATION_VERTICAL; }
                _super.call(this, orientation);
                this._clusterOffsets = new Plottable.Utils.Map();
            }
            ClusteredBar.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                // the width is constant, so set the inner scale range to that
                var innerScale = this._makeInnerScale();
                var innerWidthF = function (d, i) { return innerScale.rangeBand(); };
                attrToProjector["width"] = this._isVertical ? innerWidthF : attrToProjector["width"];
                attrToProjector["height"] = !this._isVertical ? innerWidthF : attrToProjector["height"];
                var xAttr = attrToProjector["x"];
                var yAttr = attrToProjector["y"];
                attrToProjector["x"] = this._isVertical ?
                    function (d, i, ds) { return xAttr(d, i, ds) + _this._clusterOffsets.get(ds); } :
                    function (d, i, ds) { return xAttr(d, i, ds); };
                attrToProjector["y"] = this._isVertical ?
                    function (d, i, ds) { return yAttr(d, i, ds); } :
                    function (d, i, ds) { return yAttr(d, i, ds) + _this._clusterOffsets.get(ds); };
                return attrToProjector;
            };
            ClusteredBar.prototype._updateClusterPosition = function () {
                var _this = this;
                var innerScale = this._makeInnerScale();
                this.datasets().forEach(function (d, i) { return _this._clusterOffsets.set(d, innerScale.scale(String(i)) - innerScale.rangeBand() / 2); });
            };
            ClusteredBar.prototype._makeInnerScale = function () {
                var innerScale = new Plottable.Scales.Category();
                innerScale.domain(this.datasets().map(function (d, i) { return String(i); }));
                var widthProjector = Plottable.Plot._scaledAccessor(this.attr("width"));
                innerScale.range([0, widthProjector(null, 0, null)]);
                return innerScale;
            };
            ClusteredBar.prototype._getDataToDraw = function () {
                this._updateClusterPosition();
                return _super.prototype._getDataToDraw.call(this);
            };
            return ClusteredBar;
        })(Plots.Bar);
        Plots.ClusteredBar = ClusteredBar;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var StackedArea = (function (_super) {
            __extends(StackedArea, _super);
            /**
             * @constructor
             */
            function StackedArea() {
                var _this = this;
                _super.call(this);
                this._baselineValue = 0;
                this.addClass("stacked-area-plot");
                this.attr("fill-opacity", 1);
                this._stackingResult = new Plottable.Utils.Map();
                this._stackedExtent = [];
                this._baselineValueProvider = function () { return [_this._baselineValue]; };
            }
            StackedArea.prototype._getAnimator = function (key) {
                return new Plottable.Animators.Null();
            };
            StackedArea.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._baseline = this._renderArea.append("line").classed("baseline", true);
            };
            StackedArea.prototype.x = function (x, xScale) {
                if (x == null) {
                    return _super.prototype.x.call(this);
                }
                if (xScale == null) {
                    _super.prototype.x.call(this, x);
                }
                else {
                    _super.prototype.x.call(this, x, xScale);
                }
                this._updateStackExtentsAndOffsets();
                return this;
            };
            StackedArea.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                if (yScale == null) {
                    _super.prototype.y.call(this, y);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                }
                this._updateStackExtentsAndOffsets();
                return this;
            };
            StackedArea.prototype.downsamplingEnabled = function (downsampling) {
                if (downsampling == null) {
                    return _super.prototype.downsamplingEnabled.call(this);
                }
                Plottable.Utils.Window.warn("Warning: Stacked Area Plot does not support downsampling");
                return this;
            };
            StackedArea.prototype._additionalPaint = function () {
                var scaledBaseline = this.y().scale.scale(this._baselineValue);
                var baselineAttr = {
                    "x1": 0,
                    "y1": scaledBaseline,
                    "x2": this.width(),
                    "y2": scaledBaseline
                };
                this._getAnimator("baseline").animate(this._baseline, baselineAttr);
            };
            StackedArea.prototype._updateYScale = function () {
                var yBinding = this.y();
                var scale = (yBinding && yBinding.scale);
                if (scale == null) {
                    return;
                }
                scale.addPaddingExceptionsProvider(this._baselineValueProvider);
                scale.addIncludedValuesProvider(this._baselineValueProvider);
            };
            StackedArea.prototype._onDatasetUpdate = function () {
                this._updateStackExtentsAndOffsets();
                _super.prototype._onDatasetUpdate.call(this);
                return this;
            };
            StackedArea.prototype._updateExtentsForProperty = function (property) {
                _super.prototype._updateExtentsForProperty.call(this, property);
                if ((property === "x" || property === "y") && this._projectorsReady()) {
                    this._updateStackExtentsAndOffsets();
                }
            };
            StackedArea.prototype._extentsForProperty = function (attr) {
                var primaryAttr = "y";
                if (attr === primaryAttr) {
                    return [this._stackedExtent];
                }
                else {
                    return _super.prototype._extentsForProperty.call(this, attr);
                }
            };
            StackedArea.prototype._updateStackExtentsAndOffsets = function () {
                if (!this._projectorsReady()) {
                    return;
                }
                var datasets = this.datasets();
                var keyAccessor = this.x().accessor;
                var valueAccessor = this.y().accessor;
                var filter = this._filterForProperty("y");
                this._checkSameDomain(datasets, keyAccessor);
                this._stackingResult = Plottable.Utils.Stacking.stack(datasets, keyAccessor, valueAccessor);
                this._stackedExtent = Plottable.Utils.Stacking.stackedExtent(this._stackingResult, keyAccessor, filter);
            };
            StackedArea.prototype._checkSameDomain = function (datasets, keyAccessor) {
                var keySets = datasets.map(function (dataset) {
                    return d3.set(dataset.data().map(function (datum, i) { return keyAccessor(datum, i, dataset).toString(); })).values();
                });
                var domainKeys = StackedArea._domainKeys(datasets, keyAccessor);
                if (keySets.some(function (keySet) { return keySet.length !== domainKeys.length; })) {
                    Plottable.Utils.Window.warn("the domains across the datasets are not the same. Plot may produce unintended behavior.");
                }
            };
            /**
             * Given an array of Datasets and the accessor function for the key, computes the
             * set reunion (no duplicates) of the domain of each Dataset. The keys are stringified
             * before being returned.
             *
             * @param {Dataset[]} datasets The Datasets for which we extract the domain keys
             * @param {Accessor<any>} keyAccessor The accessor for the key of the data
             * @return {string[]} An array of stringified keys
             */
            StackedArea._domainKeys = function (datasets, keyAccessor) {
                var domainKeys = d3.set();
                datasets.forEach(function (dataset) {
                    dataset.data().forEach(function (datum, index) {
                        domainKeys.add(keyAccessor(datum, index, dataset));
                    });
                });
                return domainKeys.values();
            };
            StackedArea.prototype._propertyProjectors = function () {
                var _this = this;
                var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
                var yAccessor = this.y().accessor;
                var xAccessor = this.x().accessor;
                var normalizedXAccessor = function (datum, index, dataset) {
                    return Plottable.Utils.Stacking.normalizeKey(xAccessor(datum, index, dataset));
                };
                var stackYProjector = function (d, i, dataset) {
                    return _this.y().scale.scale(+yAccessor(d, i, dataset) + _this._stackingResult.get(dataset).get(normalizedXAccessor(d, i, dataset)).offset);
                };
                var stackY0Projector = function (d, i, dataset) {
                    return _this.y().scale.scale(_this._stackingResult.get(dataset).get(normalizedXAccessor(d, i, dataset)).offset);
                };
                propertyToProjectors["d"] = this._constructAreaProjector(Plottable.Plot._scaledAccessor(this.x()), stackYProjector, stackY0Projector);
                return propertyToProjectors;
            };
            StackedArea.prototype._pixelPoint = function (datum, index, dataset) {
                var pixelPoint = _super.prototype._pixelPoint.call(this, datum, index, dataset);
                var xValue = this.x().accessor(datum, index, dataset);
                var yValue = this.y().accessor(datum, index, dataset);
                var scaledYValue = this.y().scale.scale(+yValue + this._stackingResult.get(dataset).get(Plottable.Utils.Stacking.normalizeKey(xValue)).offset);
                return { x: pixelPoint.x, y: scaledYValue };
            };
            return StackedArea;
        })(Plots.Area);
        Plots.StackedArea = StackedArea;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var StackedBar = (function (_super) {
            __extends(StackedBar, _super);
            /**
             * A StackedBar Plot stacks bars across Datasets based on the primary value of the bars.
             *   On a vertical StackedBar Plot, the bars with the same X value are stacked.
             *   On a horizontal StackedBar Plot, the bars with the same Y value are stacked.
             *
             * @constructor
             * @param {Scale} xScale
             * @param {Scale} yScale
             * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
             */
            function StackedBar(orientation) {
                if (orientation === void 0) { orientation = Plots.Bar.ORIENTATION_VERTICAL; }
                _super.call(this, orientation);
                this.addClass("stacked-bar-plot");
                this._stackingResult = new Plottable.Utils.Map();
                this._stackedExtent = [];
            }
            StackedBar.prototype.x = function (x, xScale) {
                if (x == null) {
                    return _super.prototype.x.call(this);
                }
                if (xScale == null) {
                    _super.prototype.x.call(this, x);
                }
                else {
                    _super.prototype.x.call(this, x, xScale);
                }
                this._updateStackExtentsAndOffsets();
                return this;
            };
            StackedBar.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                if (yScale == null) {
                    _super.prototype.y.call(this, y);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                }
                this._updateStackExtentsAndOffsets();
                return this;
            };
            StackedBar.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var valueAttr = this._isVertical ? "y" : "x";
                var keyAttr = this._isVertical ? "x" : "y";
                var primaryScale = this._isVertical ? this.y().scale : this.x().scale;
                var primaryAccessor = this._propertyBindings.get(valueAttr).accessor;
                var keyAccessor = this._propertyBindings.get(keyAttr).accessor;
                var normalizedKeyAccessor = function (datum, index, dataset) {
                    return Plottable.Utils.Stacking.normalizeKey(keyAccessor(datum, index, dataset));
                };
                var getStart = function (d, i, dataset) {
                    return primaryScale.scale(_this._stackingResult.get(dataset).get(normalizedKeyAccessor(d, i, dataset)).offset);
                };
                var getEnd = function (d, i, dataset) {
                    return primaryScale.scale(+primaryAccessor(d, i, dataset) +
                        _this._stackingResult.get(dataset).get(normalizedKeyAccessor(d, i, dataset)).offset);
                };
                var heightF = function (d, i, dataset) {
                    return Math.abs(getEnd(d, i, dataset) - getStart(d, i, dataset));
                };
                attrToProjector[this._isVertical ? "height" : "width"] = heightF;
                var attrFunction = function (d, i, dataset) {
                    return +primaryAccessor(d, i, dataset) < 0 ? getStart(d, i, dataset) : getEnd(d, i, dataset);
                };
                attrToProjector[valueAttr] = function (d, i, dataset) {
                    return _this._isVertical ? attrFunction(d, i, dataset) : attrFunction(d, i, dataset) - heightF(d, i, dataset);
                };
                return attrToProjector;
            };
            StackedBar.prototype._onDatasetUpdate = function () {
                this._updateStackExtentsAndOffsets();
                _super.prototype._onDatasetUpdate.call(this);
                return this;
            };
            StackedBar.prototype._updateExtentsForProperty = function (property) {
                _super.prototype._updateExtentsForProperty.call(this, property);
                if ((property === "x" || property === "y") && this._projectorsReady()) {
                    this._updateStackExtentsAndOffsets();
                }
            };
            StackedBar.prototype._extentsForProperty = function (attr) {
                var primaryAttr = this._isVertical ? "y" : "x";
                if (attr === primaryAttr) {
                    return [this._stackedExtent];
                }
                else {
                    return _super.prototype._extentsForProperty.call(this, attr);
                }
            };
            StackedBar.prototype._updateStackExtentsAndOffsets = function () {
                if (!this._projectorsReady()) {
                    return;
                }
                var datasets = this.datasets();
                var keyAccessor = this._isVertical ? this.x().accessor : this.y().accessor;
                var valueAccessor = this._isVertical ? this.y().accessor : this.x().accessor;
                var filter = this._filterForProperty(this._isVertical ? "y" : "x");
                this._stackingResult = Plottable.Utils.Stacking.stack(datasets, keyAccessor, valueAccessor);
                this._stackedExtent = Plottable.Utils.Stacking.stackedExtent(this._stackingResult, keyAccessor, filter);
            };
            return StackedBar;
        })(Plots.Bar);
        Plots.StackedBar = StackedBar;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Segment = (function (_super) {
            __extends(Segment, _super);
            /**
             * A Segment Plot displays line segments based on the data.
             *
             * @constructor
             */
            function Segment() {
                _super.call(this);
                this.addClass("segment-plot");
                this.attr("stroke", new Plottable.Scales.Color().range()[0]);
                this.attr("stroke-width", "2px");
            }
            Segment.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Segment(dataset);
            };
            Segment.prototype._generateDrawSteps = function () {
                return [{ attrToProjector: this._generateAttrToProjector(), animator: new Plottable.Animators.Null() }];
            };
            Segment.prototype._updateExtentsForProperty = function (property) {
                _super.prototype._updateExtentsForProperty.call(this, property);
                if (property === "x") {
                    _super.prototype._updateExtentsForProperty.call(this, "x2");
                }
                else if (property === "y") {
                    _super.prototype._updateExtentsForProperty.call(this, "y2");
                }
            };
            Segment.prototype._filterForProperty = function (property) {
                if (property === "x2") {
                    return _super.prototype._filterForProperty.call(this, "x");
                }
                else if (property === "y2") {
                    return _super.prototype._filterForProperty.call(this, "y");
                }
                return _super.prototype._filterForProperty.call(this, property);
            };
            Segment.prototype.x = function (x, xScale) {
                if (x == null) {
                    return _super.prototype.x.call(this);
                }
                if (xScale == null) {
                    _super.prototype.x.call(this, x);
                }
                else {
                    _super.prototype.x.call(this, x, xScale);
                    var x2Binding = this.x2();
                    var x2 = x2Binding && x2Binding.accessor;
                    if (x2 != null) {
                        this._bindProperty(Segment._X2_KEY, x2, xScale);
                    }
                }
                return this;
            };
            Segment.prototype.x2 = function (x2) {
                if (x2 == null) {
                    return this._propertyBindings.get(Segment._X2_KEY);
                }
                var xBinding = this.x();
                var xScale = xBinding && xBinding.scale;
                this._bindProperty(Segment._X2_KEY, x2, xScale);
                this.render();
                return this;
            };
            Segment.prototype.y = function (y, yScale) {
                if (y == null) {
                    return _super.prototype.y.call(this);
                }
                if (yScale == null) {
                    _super.prototype.y.call(this, y);
                }
                else {
                    _super.prototype.y.call(this, y, yScale);
                    var y2Binding = this.y2();
                    var y2 = y2Binding && y2Binding.accessor;
                    if (y2 != null) {
                        this._bindProperty(Segment._Y2_KEY, y2, yScale);
                    }
                }
                return this;
            };
            Segment.prototype.y2 = function (y2) {
                if (y2 == null) {
                    return this._propertyBindings.get(Segment._Y2_KEY);
                }
                var yBinding = this.y();
                var yScale = yBinding && yBinding.scale;
                this._bindProperty(Segment._Y2_KEY, y2, yScale);
                this.render();
                return this;
            };
            Segment.prototype._propertyProjectors = function () {
                var attrToProjector = _super.prototype._propertyProjectors.call(this);
                attrToProjector["x1"] = Plottable.Plot._scaledAccessor(this.x());
                attrToProjector["x2"] = this.x2() == null ? Plottable.Plot._scaledAccessor(this.x()) : Plottable.Plot._scaledAccessor(this.x2());
                attrToProjector["y1"] = Plottable.Plot._scaledAccessor(this.y());
                attrToProjector["y2"] = this.y2() == null ? Plottable.Plot._scaledAccessor(this.y()) : Plottable.Plot._scaledAccessor(this.y2());
                return attrToProjector;
            };
            Segment.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
                var dataXRange;
                var dataYRange;
                if (yRange == null) {
                    var bounds = xRangeOrBounds;
                    dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
                    dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
                }
                else {
                    dataXRange = xRangeOrBounds;
                    dataYRange = yRange;
                }
                return this._entitiesIntersecting(dataXRange, dataYRange);
            };
            Segment.prototype._entitiesIntersecting = function (xRange, yRange) {
                var _this = this;
                var intersected = [];
                var attrToProjector = this._generateAttrToProjector();
                this.entities().forEach(function (entity) {
                    if (_this._lineIntersectsBox(entity, xRange, yRange, attrToProjector)) {
                        intersected.push(entity);
                    }
                });
                return intersected;
            };
            Segment.prototype._lineIntersectsBox = function (entity, xRange, yRange, attrToProjector) {
                var _this = this;
                var x1 = attrToProjector["x1"](entity.datum, entity.index, entity.dataset);
                var x2 = attrToProjector["x2"](entity.datum, entity.index, entity.dataset);
                var y1 = attrToProjector["y1"](entity.datum, entity.index, entity.dataset);
                var y2 = attrToProjector["y2"](entity.datum, entity.index, entity.dataset);
                // check if any of end points of the segment is inside the box
                if ((xRange.min <= x1 && x1 <= xRange.max && yRange.min <= y1 && y1 <= yRange.max) ||
                    (xRange.min <= x2 && x2 <= xRange.max && yRange.min <= y2 && y2 <= yRange.max)) {
                    return true;
                }
                var startPoint = { x: x1, y: y1 };
                var endPoint = { x: x2, y: y2 };
                var corners = [
                    { x: xRange.min, y: yRange.min },
                    { x: xRange.min, y: yRange.max },
                    { x: xRange.max, y: yRange.max },
                    { x: xRange.max, y: yRange.min }];
                var intersections = corners.filter(function (point, index) {
                    if (index !== 0) {
                        // return true if border formed by conecting current corner and previous corner intersects with the segment
                        return _this._lineIntersectsSegment(startPoint, endPoint, point, corners[index - 1]) &&
                            _this._lineIntersectsSegment(point, corners[index - 1], startPoint, endPoint);
                    }
                });
                return intersections.length > 0;
            };
            Segment.prototype._lineIntersectsSegment = function (point1, point2, point3, point4) {
                var calcOrientation = function (point1, point2, point) {
                    return (point2.x - point1.x) * (point.y - point2.y) - (point2.y - point1.y) * (point.x - point2.x);
                };
                // point3 and point4 are on different sides of line formed by point1 and point2
                return calcOrientation(point1, point2, point3) * calcOrientation(point1, point2, point4) < 0;
            };
            Segment._X2_KEY = "x2";
            Segment._Y2_KEY = "y2";
            return Segment;
        })(Plottable.XYPlot);
        Plots.Segment = Segment;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Waterfall = (function (_super) {
            __extends(Waterfall, _super);
            function Waterfall() {
                _super.call(this);
                this._connectorsEnabled = false;
                this.addClass("waterfall-plot");
            }
            Waterfall.prototype.connectorsEnabled = function (enabled) {
                if (enabled == null) {
                    return this._connectorsEnabled;
                }
                this._connectorsEnabled = enabled;
                return this;
            };
            Waterfall.prototype.total = function (total) {
                if (total == null) {
                    return this._propertyBindings.get(Waterfall._TOTAL_KEY);
                }
                this._bindProperty(Waterfall._TOTAL_KEY, total, null);
                return this;
            };
            Waterfall.prototype._additionalPaint = function (time) {
                var _this = this;
                this._connectorArea.selectAll("line").remove();
                if (this._connectorsEnabled) {
                    Plottable.Utils.Window.setTimeout(function () { return _this._drawConnectors(); }, time);
                }
            };
            Waterfall.prototype._createNodesForDataset = function (dataset) {
                var drawer = _super.prototype._createNodesForDataset.call(this, dataset);
                this._connectorArea = this._renderArea.append("g").classed(Waterfall._CONNECTOR_AREA_CLASS, true);
                return drawer;
            };
            Waterfall.prototype._extentsForProperty = function (attr) {
                var primaryAttr = "y";
                if (attr === primaryAttr) {
                    return [this._extent];
                }
                else {
                    return _super.prototype._extentsForProperty.call(this, attr);
                }
            };
            Waterfall.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var yScale = this.y().scale;
                var totalAccessor = Plottable.Plot._scaledAccessor(this.total());
                var yAttr = this.attr("y");
                if (yAttr == null) {
                    attrToProjector["y"] = function (d, i, dataset) {
                        var currentValue = _this.y().accessor(d, i, dataset);
                        var isTotal = totalAccessor(d, i, dataset);
                        if (isTotal) {
                            return Math.min(yScale.scale(currentValue), yScale.scale(0));
                        }
                        else {
                            var currentSubtotal = _this._subtotals[i];
                            if (i === 0) {
                                if (currentValue < 0) {
                                    return yScale.scale(currentSubtotal - currentValue);
                                }
                                else {
                                    return yScale.scale(currentSubtotal);
                                }
                            }
                            var priorSubtotal = _this._subtotals[i - 1];
                            if (currentSubtotal > priorSubtotal) {
                                return yScale.scale(currentSubtotal);
                            }
                            else {
                                return yScale.scale(priorSubtotal);
                            }
                        }
                    };
                }
                var heightAttr = this.attr("height");
                if (heightAttr == null) {
                    attrToProjector["height"] = function (d, i, dataset) {
                        var isTotal = totalAccessor(d, i, dataset);
                        var currentValue = _this.y().accessor(d, i, dataset);
                        if (isTotal) {
                            return Math.abs(yScale.scale(currentValue) - yScale.scale(0));
                        }
                        else {
                            var currentSubtotal = _this._subtotals[i];
                            if (i === 0) {
                                return Math.abs(yScale.scale(currentSubtotal) - yScale.scale(currentSubtotal - currentValue));
                            }
                            else {
                                var priorSubtotal = _this._subtotals[i - 1];
                                return Math.abs(yScale.scale(currentSubtotal) - yScale.scale(priorSubtotal));
                            }
                        }
                    };
                }
                attrToProjector["class"] = function (d, i, dataset) {
                    var baseClass = "";
                    if (_this.attr("class") != null) {
                        baseClass = _this.attr("class").accessor(d, i, dataset) + " ";
                    }
                    var isTotal = totalAccessor(d, i, dataset);
                    if (isTotal) {
                        return baseClass + Waterfall._BAR_TOTAL_CLASS;
                    }
                    else {
                        var delta = _this.y().accessor(d, i, dataset);
                        return baseClass + (delta > 0 ? Waterfall._BAR_GROWTH_CLASS : Waterfall._BAR_DECLINE_CLASS);
                    }
                };
                return attrToProjector;
            };
            Waterfall.prototype._onDatasetUpdate = function () {
                this._updateSubtotals();
                _super.prototype._onDatasetUpdate.call(this);
                return this;
            };
            Waterfall.prototype._calculateSubtotalsAndExtent = function (dataset) {
                var _this = this;
                var min = Number.MAX_VALUE;
                var max = Number.MIN_VALUE;
                var total = 0;
                var hasStarted = false;
                dataset.data().forEach(function (datum, index) {
                    var currentValue = _this.y().accessor(datum, index, dataset);
                    var isTotal = _this.total().accessor(datum, index, dataset);
                    if (!isTotal || index === 0) {
                        total += currentValue;
                    }
                    _this._subtotals.push(total);
                    if (total < min) {
                        min = total;
                    }
                    if (total > max) {
                        max = total;
                    }
                    if (isTotal) {
                        if (currentValue < min) {
                            min = currentValue;
                        }
                        if (currentValue > max) {
                            max = currentValue;
                        }
                    }
                    if (!hasStarted && isTotal) {
                        var startTotal = currentValue - total;
                        for (var i = 0; i < _this._subtotals.length; i++) {
                            _this._subtotals[i] += startTotal;
                        }
                        hasStarted = true;
                        total += startTotal;
                        min += startTotal;
                        max += startTotal;
                    }
                });
                this._extent = [min, max];
            };
            Waterfall.prototype._drawConnectors = function () {
                var attrToProjector = this._generateAttrToProjector();
                var dataset = this.datasets()[0];
                for (var datumIndex = 1; datumIndex < dataset.data().length; datumIndex++) {
                    var prevIndex = datumIndex - 1;
                    var datum = dataset.data()[datumIndex];
                    var prevDatum = dataset.data()[prevIndex];
                    var x = attrToProjector["x"](prevDatum, prevIndex, dataset);
                    var x2 = attrToProjector["x"](datum, datumIndex, dataset) + attrToProjector["width"](datum, datumIndex, dataset);
                    var y = attrToProjector["y"](datum, datumIndex, dataset);
                    if ((this._subtotals[datumIndex] > 0 && this._subtotals[datumIndex] > this._subtotals[prevIndex]) ||
                        (this._subtotals[datumIndex] < 0 && this._subtotals[datumIndex] >= this._subtotals[prevIndex])) {
                        y = attrToProjector["y"](datum, datumIndex, dataset) + attrToProjector["height"](datum, datumIndex, dataset);
                    }
                    this._connectorArea.append("line").classed(Waterfall._CONNECTOR_CLASS, true)
                        .attr("x1", x).attr("x2", x2).attr("y1", y).attr("y2", y);
                }
            };
            Waterfall.prototype._updateSubtotals = function () {
                var datasets = this.datasets();
                if (datasets.length > 0) {
                    var dataset = datasets[datasets.length - 1];
                    this._subtotals = new Array();
                    this._calculateSubtotalsAndExtent(dataset);
                }
            };
            Waterfall._BAR_DECLINE_CLASS = "waterfall-decline";
            Waterfall._BAR_GROWTH_CLASS = "waterfall-growth";
            Waterfall._BAR_TOTAL_CLASS = "waterfall-total";
            Waterfall._CONNECTOR_CLASS = "connector";
            Waterfall._CONNECTOR_AREA_CLASS = "connector-area";
            Waterfall._TOTAL_KEY = "total";
            return Waterfall;
        })(Plots.Bar);
        Plots.Waterfall = Waterfall;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Plots;
    (function (Plots) {
        var Wheel = (function (_super) {
            __extends(Wheel, _super);
            /**
             * @constructor
             */
            function Wheel() {
                _super.call(this);
                this.addClass("wheel-plot");
                this.attr("fill", new Plottable.Scales.Color().range()[0]);
            }
            Wheel.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                this._renderArea.attr("transform", "translate(" + this.width() / 2 + "," + this.height() / 2 + ")");
                var radiusLimit = Math.min(this.width(), this.height()) / 2;
                if (this.r() != null && this.r().scale != null) {
                    this.r().scale.range([0, radiusLimit]);
                }
                if (this.r2() != null && this.r2().scale != null) {
                    this.r2().scale.range([0, radiusLimit]);
                }
                return this;
            };
            Wheel.prototype._createDrawer = function (dataset) {
                return new Plottable.Drawers.Arc(dataset);
            };
            Wheel.prototype.entities = function (datasets) {
                var _this = this;
                if (datasets === void 0) { datasets = this.datasets(); }
                var entities = _super.prototype.entities.call(this, datasets);
                entities.forEach(function (entity) {
                    entity.position.x += _this.width() / 2;
                    entity.position.y += _this.height() / 2;
                });
                return entities;
            };
            Wheel.prototype._getDataToDraw = function () {
                var dataToDraw = _super.prototype._getDataToDraw.call(this);
                if (this.datasets().length === 0) {
                    return dataToDraw;
                }
                var tAccessor = Plottable.Plot._scaledAccessor(this.t());
                var t2Accessor = Plottable.Plot._scaledAccessor(this.t2());
                var rAccessor = Plottable.Plot._scaledAccessor(this.r());
                var r2Accessor = Plottable.Plot._scaledAccessor(this.r2());
                var ds = this.datasets()[0];
                var data = dataToDraw.get(ds);
                var filteredData = data.filter(function (d, i) {
                    return Plottable.Utils.Math.isValidNumber(tAccessor(d, i, ds)) &&
                        Plottable.Utils.Math.isValidNumber(t2Accessor(d, i, ds)) &&
                        Plottable.Utils.Math.isValidNumber(rAccessor(d, i, ds)) &&
                        Plottable.Utils.Math.isValidNumber(r2Accessor(d, i, ds)) &&
                        rAccessor(d, i, ds) >= 0 && r2Accessor(d, i, ds) >= 0;
                });
                dataToDraw.set(ds, filteredData);
                return dataToDraw;
            };
            Wheel.prototype._propertyProjectors = function () {
                var attrToProjector = _super.prototype._propertyProjectors.call(this);
                var rAccessor = Plottable.Plot._scaledAccessor(this.r());
                var r2Accessor = Plottable.Plot._scaledAccessor(this.r2());
                var tAccessor = Plottable.Plot._scaledAccessor(this.t());
                var t2Accessor = Plottable.Plot._scaledAccessor(this.t2());
                attrToProjector["d"] = function (datum, index, ds) {
                    var t = tAccessor(datum, index, ds);
                    var t2 = t2Accessor(datum, index, ds);
                    if (t2 < t) {
                        t2 += (Math.floor((t - t2) / 360) + 1) * 360;
                    }
                    return d3.svg.arc().innerRadius(rAccessor(datum, index, ds))
                        .outerRadius(r2Accessor(datum, index, ds))
                        .startAngle(Plottable.Utils.Math.degreesToRadians(t))
                        .endAngle(Plottable.Utils.Math.degreesToRadians(t2))(datum, index);
                };
                return attrToProjector;
            };
            Wheel.prototype.t = function (t, scale) {
                if (t == null) {
                    return this._propertyBindings.get(Wheel._T_KEY);
                }
                if (scale != null) {
                    if (!Plottable.QuantitativeScale.prototype.isPrototypeOf(scale)) {
                        throw new Error("scale needs to inherit from Scale.QuantitativeScale");
                    }
                    scale.range([0, 360]);
                    scale.padProportion(0);
                }
                var t2Binding = this.t2();
                var t2Accessor = t2Binding && t2Binding.accessor;
                if (t2Accessor != null) {
                    this._bindProperty(Wheel._T2_KEY, t2Accessor, scale);
                }
                this._bindProperty(Wheel._T_KEY, t, scale);
                this.render();
                return this;
            };
            Wheel.prototype.t2 = function (t2) {
                if (t2 == null) {
                    return this._propertyBindings.get(Wheel._T2_KEY);
                }
                var tBinding = this.t();
                var angleScale = tBinding && tBinding.scale;
                this._bindProperty(Wheel._T2_KEY, t2, angleScale);
                this.render();
                return this;
            };
            Wheel.prototype.r = function (r, scale) {
                if (r == null) {
                    return this._propertyBindings.get(Wheel._R_KEY);
                }
                if (scale != null && !Plottable.QuantitativeScale.prototype.isPrototypeOf(scale)) {
                    throw new Error("scale needs to inherit from Scale.QuantitativeScale");
                }
                var r2Binding = this.r2();
                var r2Accessor = r2Binding && r2Binding.accessor;
                if (r2Accessor != null) {
                    this._bindProperty(Wheel._R2_KEY, r2Accessor, scale);
                }
                this._bindProperty(Wheel._R_KEY, r, scale);
                this.render();
                return this;
            };
            Wheel.prototype.r2 = function (r2) {
                if (r2 == null) {
                    return this._propertyBindings.get(Wheel._R2_KEY);
                }
                var rBinding = this.r();
                var radiusScale = rBinding && rBinding.scale;
                this._bindProperty(Wheel._R2_KEY, r2, radiusScale);
                this.render();
                return this;
            };
            Wheel.prototype._pixelPoint = function (datum, index, dataset) {
                var r = Plottable.Plot._scaledAccessor(this.r())(datum, index, dataset);
                var r2 = Plottable.Plot._scaledAccessor(this.r2())(datum, index, dataset);
                var avgRadius = r >= 0 && r2 >= 0 ? (r + r2) / 2 : NaN;
                var t = Plottable.Plot._scaledAccessor(this.t())(datum, index, dataset);
                var t2 = Plottable.Plot._scaledAccessor(this.t2())(datum, index, dataset);
                var avgAngle = Plottable.Utils.Math.degreesToRadians((t + t2) / 2);
                return { x: avgRadius * Math.sin(avgAngle), y: -avgRadius * Math.cos(avgAngle) };
            };
            Wheel._R_KEY = "r";
            Wheel._R2_KEY = "r2";
            Wheel._T_KEY = "t";
            Wheel._T2_KEY = "t2";
            return Wheel;
        })(Plottable.Plot);
        Plots.Wheel = Wheel;
    })(Plots = Plottable.Plots || (Plottable.Plots = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Animators;
    (function (Animators) {
        /**
         * An animator implementation with no animation. The attributes are
         * immediately set on the selection.
         */
        var Null = (function () {
            function Null() {
            }
            Null.prototype.totalTime = function (selection) {
                return 0;
            };
            Null.prototype.animate = function (selection, attrToAppliedProjector) {
                return selection.attr(attrToAppliedProjector);
            };
            return Null;
        })();
        Animators.Null = Null;
    })(Animators = Plottable.Animators || (Plottable.Animators = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Animators;
    (function (Animators) {
        /**
         * An Animator with easing and configurable durations and delays.
         */
        var Easing = (function () {
            /**
             * Constructs the default animator
             *
             * @constructor
             */
            function Easing() {
                this._startDelay = Easing._DEFAULT_START_DELAY_MILLISECONDS;
                this._stepDuration = Easing._DEFAULT_STEP_DURATION_MILLISECONDS;
                this._stepDelay = Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS;
                this._maxTotalDuration = Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS;
                this._easingMode = Easing._DEFAULT_EASING_MODE;
            }
            Easing.prototype.totalTime = function (numberOfSteps) {
                var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
                return this.startDelay() + adjustedIterativeDelay * (Math.max(numberOfSteps - 1, 0)) + this.stepDuration();
            };
            Easing.prototype.animate = function (selection, attrToAppliedProjector) {
                var _this = this;
                var numberOfSteps = selection[0].length;
                var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
                return selection.transition()
                    .ease(this.easingMode())
                    .duration(this.stepDuration())
                    .delay(function (d, i) { return _this.startDelay() + adjustedIterativeDelay * i; })
                    .attr(attrToAppliedProjector);
            };
            Easing.prototype.startDelay = function (startDelay) {
                if (startDelay == null) {
                    return this._startDelay;
                }
                else {
                    this._startDelay = startDelay;
                    return this;
                }
            };
            Easing.prototype.stepDuration = function (stepDuration) {
                if (stepDuration == null) {
                    return Math.min(this._stepDuration, this._maxTotalDuration);
                }
                else {
                    this._stepDuration = stepDuration;
                    return this;
                }
            };
            Easing.prototype.stepDelay = function (stepDelay) {
                if (stepDelay == null) {
                    return this._stepDelay;
                }
                else {
                    this._stepDelay = stepDelay;
                    return this;
                }
            };
            Easing.prototype.maxTotalDuration = function (maxTotalDuration) {
                if (maxTotalDuration == null) {
                    return this._maxTotalDuration;
                }
                else {
                    this._maxTotalDuration = maxTotalDuration;
                    return this;
                }
            };
            Easing.prototype.easingMode = function (easingMode) {
                if (easingMode == null) {
                    return this._easingMode;
                }
                else {
                    this._easingMode = easingMode;
                    return this;
                }
            };
            /**
             * Adjust the iterative delay, such that it takes into account the maxTotalDuration constraint
             */
            Easing.prototype._getAdjustedIterativeDelay = function (numberOfSteps) {
                var stepStartTimeInterval = this.maxTotalDuration() - this.stepDuration();
                stepStartTimeInterval = Math.max(stepStartTimeInterval, 0);
                var maxPossibleIterativeDelay = stepStartTimeInterval / Math.max(numberOfSteps - 1, 1);
                return Math.min(this.stepDelay(), maxPossibleIterativeDelay);
            };
            /**
             * The default starting delay of the animation in milliseconds
             */
            Easing._DEFAULT_START_DELAY_MILLISECONDS = 0;
            /**
             * The default duration of one animation step in milliseconds
             */
            Easing._DEFAULT_STEP_DURATION_MILLISECONDS = 300;
            /**
             * The default maximum start delay between each step of an animation
             */
            Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS = 15;
            /**
             * The default maximum total animation duration
             */
            Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS = Infinity;
            /**
             * The default easing of the animation
             */
            Easing._DEFAULT_EASING_MODE = "exp-out";
            return Easing;
        })();
        Animators.Easing = Easing;
    })(Animators = Plottable.Animators || (Plottable.Animators = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Dispatcher = (function () {
        function Dispatcher() {
            this._eventToCallback = {};
            this._callbacks = [];
            this._connected = false;
        }
        Dispatcher.prototype._hasNoListeners = function () {
            return this._callbacks.every(function (cbs) { return cbs.size === 0; });
        };
        Dispatcher.prototype._connect = function () {
            var _this = this;
            if (this._connected) {
                return;
            }
            Object.keys(this._eventToCallback).forEach(function (event) {
                var callback = _this._eventToCallback[event];
                document.addEventListener(event, callback);
            });
            this._connected = true;
        };
        Dispatcher.prototype._disconnect = function () {
            var _this = this;
            if (this._connected && this._hasNoListeners()) {
                Object.keys(this._eventToCallback).forEach(function (event) {
                    var callback = _this._eventToCallback[event];
                    document.removeEventListener(event, callback);
                });
                this._connected = false;
            }
        };
        Dispatcher.prototype._setCallback = function (callbackSet, callback) {
            this._connect();
            callbackSet.add(callback);
        };
        Dispatcher.prototype._unsetCallback = function (callbackSet, callback) {
            callbackSet.delete(callback);
            this._disconnect();
        };
        return Dispatcher;
    })();
    Plottable.Dispatcher = Dispatcher;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Dispatchers;
    (function (Dispatchers) {
        var Mouse = (function (_super) {
            __extends(Mouse, _super);
            /**
             * This constructor not be invoked directly.
             *
             * @constructor
             * @param {SVGElement} svg The root <svg> to attach to.
             */
            function Mouse(svg) {
                var _this = this;
                _super.call(this);
                this._translator = Plottable.Utils.ClientToSVGTranslator.getTranslator(svg);
                this._lastMousePosition = { x: -1, y: -1 };
                this._moveCallbacks = new Plottable.Utils.CallbackSet();
                this._downCallbacks = new Plottable.Utils.CallbackSet();
                this._upCallbacks = new Plottable.Utils.CallbackSet();
                this._wheelCallbacks = new Plottable.Utils.CallbackSet();
                this._dblClickCallbacks = new Plottable.Utils.CallbackSet();
                this._callbacks = [this._moveCallbacks, this._downCallbacks, this._upCallbacks, this._wheelCallbacks,
                    this._dblClickCallbacks];
                var processMoveCallback = function (e) { return _this._measureAndDispatch(e, _this._moveCallbacks, "page"); };
                this._eventToCallback["mouseover"] = processMoveCallback;
                this._eventToCallback["mousemove"] = processMoveCallback;
                this._eventToCallback["mouseout"] = processMoveCallback;
                this._eventToCallback["mousedown"] = function (e) { return _this._measureAndDispatch(e, _this._downCallbacks); };
                this._eventToCallback["mouseup"] = function (e) { return _this._measureAndDispatch(e, _this._upCallbacks, "page"); };
                this._eventToCallback["wheel"] = function (e) { return _this._measureAndDispatch(e, _this._wheelCallbacks); };
                this._eventToCallback["dblclick"] = function (e) { return _this._measureAndDispatch(e, _this._dblClickCallbacks); };
            }
            /**
             * Get a Mouse Dispatcher for the <svg> containing elem.
             * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
             *
             * @param {SVGElement} elem
             * @return {Dispatchers.Mouse}
             */
            Mouse.getDispatcher = function (elem) {
                var svg = Plottable.Utils.DOM.boundingSVG(elem);
                var dispatcher = svg[Mouse._DISPATCHER_KEY];
                if (dispatcher == null) {
                    dispatcher = new Mouse(svg);
                    svg[Mouse._DISPATCHER_KEY] = dispatcher;
                }
                return dispatcher;
            };
            /**
             * Registers a callback to be called when the mouse position changes.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.onMouseMove = function (callback) {
                this._setCallback(this._moveCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the mouse position changes.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.offMouseMove = function (callback) {
                this._unsetCallback(this._moveCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when a mousedown occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.onMouseDown = function (callback) {
                this._setCallback(this._downCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a mousedown occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.offMouseDown = function (callback) {
                this._unsetCallback(this._downCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when a mouseup occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.onMouseUp = function (callback) {
                this._setCallback(this._upCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a mouseup occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.offMouseUp = function (callback) {
                this._unsetCallback(this._upCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when a wheel event occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.onWheel = function (callback) {
                this._setCallback(this._wheelCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a wheel event occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.offWheel = function (callback) {
                this._unsetCallback(this._wheelCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when a dblClick occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.onDblClick = function (callback) {
                this._setCallback(this._dblClickCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a dblClick occurs.
             *
             * @param {MouseCallback} callback
             * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
             */
            Mouse.prototype.offDblClick = function (callback) {
                this._unsetCallback(this._dblClickCallbacks, callback);
                return this;
            };
            /**
             * Computes the mouse position from the given event, and if successful
             * calls all the callbacks in the provided callbackSet.
             */
            Mouse.prototype._measureAndDispatch = function (event, callbackSet, scope) {
                if (scope === void 0) { scope = "element"; }
                if (scope !== "page" && scope !== "element") {
                    throw new Error("Invalid scope '" + scope + "', must be 'element' or 'page'");
                }
                if (scope === "page" || this.eventInsideSVG(event)) {
                    var newMousePosition = this._translator.computePosition(event.clientX, event.clientY);
                    if (newMousePosition != null) {
                        this._lastMousePosition = newMousePosition;
                        callbackSet.callCallbacks(this.lastMousePosition(), event);
                    }
                }
            };
            Mouse.prototype.eventInsideSVG = function (event) {
                return this._translator.insideSVG(event);
            };
            /**
             * Returns the last computed mouse position in <svg> coordinate space.
             *
             * @return {Point}
             */
            Mouse.prototype.lastMousePosition = function () {
                return this._lastMousePosition;
            };
            Mouse._DISPATCHER_KEY = "__Plottable_Dispatcher_Mouse";
            return Mouse;
        })(Plottable.Dispatcher);
        Dispatchers.Mouse = Mouse;
    })(Dispatchers = Plottable.Dispatchers || (Plottable.Dispatchers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Dispatchers;
    (function (Dispatchers) {
        var Touch = (function (_super) {
            __extends(Touch, _super);
            /**
             * This constructor should not be invoked directly.
             *
             * @constructor
             * @param {SVGElement} svg The root <svg> to attach to.
             */
            function Touch(svg) {
                var _this = this;
                _super.call(this);
                this._translator = Plottable.Utils.ClientToSVGTranslator.getTranslator(svg);
                this._startCallbacks = new Plottable.Utils.CallbackSet();
                this._moveCallbacks = new Plottable.Utils.CallbackSet();
                this._endCallbacks = new Plottable.Utils.CallbackSet();
                this._cancelCallbacks = new Plottable.Utils.CallbackSet();
                this._callbacks = [this._moveCallbacks, this._startCallbacks, this._endCallbacks, this._cancelCallbacks];
                this._eventToCallback["touchstart"] = function (e) { return _this._measureAndDispatch(e, _this._startCallbacks, "page"); };
                this._eventToCallback["touchmove"] = function (e) { return _this._measureAndDispatch(e, _this._moveCallbacks, "page"); };
                this._eventToCallback["touchend"] = function (e) { return _this._measureAndDispatch(e, _this._endCallbacks, "page"); };
                this._eventToCallback["touchcancel"] = function (e) { return _this._measureAndDispatch(e, _this._cancelCallbacks, "page"); };
            }
            /**
             * Gets a Touch Dispatcher for the <svg> containing elem.
             * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
             *
             * @param {SVGElement} elem
             * @return {Dispatchers.Touch}
             */
            Touch.getDispatcher = function (elem) {
                var svg = Plottable.Utils.DOM.boundingSVG(elem);
                var dispatcher = svg[Touch._DISPATCHER_KEY];
                if (dispatcher == null) {
                    dispatcher = new Touch(svg);
                    svg[Touch._DISPATCHER_KEY] = dispatcher;
                }
                return dispatcher;
            };
            /**
             * Registers a callback to be called when a touch starts.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.onTouchStart = function (callback) {
                this._setCallback(this._startCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a touch starts.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.offTouchStart = function (callback) {
                this._unsetCallback(this._startCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when the touch position changes.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.onTouchMove = function (callback) {
                this._setCallback(this._moveCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the touch position changes.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.offTouchMove = function (callback) {
                this._unsetCallback(this._moveCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when a touch ends.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.onTouchEnd = function (callback) {
                this._setCallback(this._endCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a touch ends.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.offTouchEnd = function (callback) {
                this._unsetCallback(this._endCallbacks, callback);
                return this;
            };
            /**
             * Registers a callback to be called when a touch is cancelled.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.onTouchCancel = function (callback) {
                this._setCallback(this._cancelCallbacks, callback);
                return this;
            };
            /**
             * Removes a callback that would be called when a touch is cancelled.
             *
             * @param {TouchCallback} callback
             * @return {Dispatchers.Touch} The calling Touch Dispatcher.
             */
            Touch.prototype.offTouchCancel = function (callback) {
                this._unsetCallback(this._cancelCallbacks, callback);
                return this;
            };
            /**
             * Computes the Touch position from the given event, and if successful
             * calls all the callbacks in the provided callbackSet.
             */
            Touch.prototype._measureAndDispatch = function (event, callbackSet, scope) {
                if (scope === void 0) { scope = "element"; }
                if (scope !== "page" && scope !== "element") {
                    throw new Error("Invalid scope '" + scope + "', must be 'element' or 'page'");
                }
                if (scope === "element" && !this.eventInsideSVG(event)) {
                    return;
                }
                var touches = event.changedTouches;
                var touchPositions = {};
                var touchIdentifiers = [];
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches[i];
                    var touchID = touch.identifier;
                    var newTouchPosition = this._translator.computePosition(touch.clientX, touch.clientY);
                    if (newTouchPosition != null) {
                        touchPositions[touchID] = newTouchPosition;
                        touchIdentifiers.push(touchID);
                    }
                }
                ;
                if (touchIdentifiers.length > 0) {
                    callbackSet.callCallbacks(touchIdentifiers, touchPositions, event);
                }
            };
            Touch.prototype.eventInsideSVG = function (event) {
                return this._translator.insideSVG(event);
            };
            Touch._DISPATCHER_KEY = "__Plottable_Dispatcher_Touch";
            return Touch;
        })(Plottable.Dispatcher);
        Dispatchers.Touch = Touch;
    })(Dispatchers = Plottable.Dispatchers || (Plottable.Dispatchers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Dispatchers;
    (function (Dispatchers) {
        var Key = (function (_super) {
            __extends(Key, _super);
            /**
             * This constructor should not be invoked directly.
             *
             * @constructor
             */
            function Key() {
                var _this = this;
                _super.call(this);
                this._eventToCallback["keydown"] = function (e) { return _this._processKeydown(e); };
                this._eventToCallback["keyup"] = function (e) { return _this._processKeyup(e); };
                this._keydownCallbacks = new Plottable.Utils.CallbackSet();
                this._keyupCallbacks = new Plottable.Utils.CallbackSet();
                this._callbacks = [this._keydownCallbacks, this._keyupCallbacks];
            }
            /**
             * Gets a Key Dispatcher. If one already exists it will be returned;
             * otherwise, a new one will be created.
             *
             * @return {Dispatchers.Key}
             */
            Key.getDispatcher = function () {
                var dispatcher = document[Key._DISPATCHER_KEY];
                if (dispatcher == null) {
                    dispatcher = new Key();
                    document[Key._DISPATCHER_KEY] = dispatcher;
                }
                return dispatcher;
            };
            /**
             * Registers a callback to be called whenever a key is pressed.
             *
             * @param {KeyCallback} callback
             * @return {Dispatchers.Key} The calling Key Dispatcher.
             */
            Key.prototype.onKeyDown = function (callback) {
                this._setCallback(this._keydownCallbacks, callback);
                return this;
            };
            /**
             * Removes the callback to be called whenever a key is pressed.
             *
             * @param {KeyCallback} callback
             * @return {Dispatchers.Key} The calling Key Dispatcher.
             */
            Key.prototype.offKeyDown = function (callback) {
                this._unsetCallback(this._keydownCallbacks, callback);
                return this;
            };
            /** Registers a callback to be called whenever a key is released.
             *
             * @param {KeyCallback} callback
             * @return {Dispatchers.Key} The calling Key Dispatcher.
             */
            Key.prototype.onKeyUp = function (callback) {
                this._setCallback(this._keyupCallbacks, callback);
                return this;
            };
            /**
             * Removes the callback to be called whenever a key is released.
             *
             * @param {KeyCallback} callback
             * @return {Dispatchers.Key} The calling Key Dispatcher.
             */
            Key.prototype.offKeyUp = function (callback) {
                this._unsetCallback(this._keyupCallbacks, callback);
                return this;
            };
            Key.prototype._processKeydown = function (event) {
                this._keydownCallbacks.callCallbacks(event.keyCode, event);
            };
            Key.prototype._processKeyup = function (event) {
                this._keyupCallbacks.callCallbacks(event.keyCode, event);
            };
            Key._DISPATCHER_KEY = "__Plottable_Dispatcher_Key";
            return Key;
        })(Plottable.Dispatcher);
        Dispatchers.Key = Key;
    })(Dispatchers = Plottable.Dispatchers || (Plottable.Dispatchers = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interaction = (function () {
        function Interaction() {
            var _this = this;
            this._anchorCallback = function (component) { return _this._anchor(component); };
            this._enabled = true;
        }
        Interaction.prototype._anchor = function (component) {
            this._isAnchored = true;
        };
        Interaction.prototype._unanchor = function () {
            this._isAnchored = false;
        };
        /**
         * Attaches this Interaction to a Component.
         * If the Interaction was already attached to a Component, it first detaches itself from the old Component.
         *
         * @param {Component} component
         * @returns {Interaction} The calling Interaction.
         */
        Interaction.prototype.attachTo = function (component) {
            this._disconnect();
            this._componentAttachedTo = component;
            this._connect();
            return this;
        };
        Interaction.prototype._connect = function () {
            if (this.enabled() && this._componentAttachedTo != null && !this._isAnchored) {
                this._componentAttachedTo.onAnchor(this._anchorCallback);
            }
        };
        /**
         * Detaches this Interaction from the Component.
         * This Interaction can be reused.
         *
         * @param {Component} component
         * @returns {Interaction} The calling Interaction.
         */
        Interaction.prototype.detachFrom = function (component) {
            this._disconnect();
            this._componentAttachedTo = null;
            return this;
        };
        Interaction.prototype._disconnect = function () {
            if (this._isAnchored) {
                this._unanchor();
            }
            if (this._componentAttachedTo != null) {
                this._componentAttachedTo.offAnchor(this._anchorCallback);
            }
        };
        Interaction.prototype.enabled = function (enabled) {
            if (enabled == null) {
                return this._enabled;
            }
            this._enabled = enabled;
            if (this._enabled) {
                this._connect();
            }
            else {
                this._disconnect();
            }
            return this;
        };
        /**
         * Translates an <svg>-coordinate-space point to Component-space coordinates.
         *
         * @param {Point} p A Point in <svg>-space coordinates.
         * @return {Point} The same location in Component-space coordinates.
         */
        Interaction.prototype._translateToComponentSpace = function (p) {
            var origin = this._componentAttachedTo.originToSVG();
            return {
                x: p.x - origin.x,
                y: p.y - origin.y
            };
        };
        /**
         * Checks whether a Component-coordinate-space Point is inside the Component.
         *
         * @param {Point} p A Point in Compoennt-space coordinates.
         * @return {boolean} Whether or not the point is inside the Component.
         */
        Interaction.prototype._isInsideComponent = function (p) {
            return 0 <= p.x && 0 <= p.y
                && p.x <= this._componentAttachedTo.width()
                && p.y <= this._componentAttachedTo.height();
        };
        return Interaction;
    })();
    Plottable.Interaction = Interaction;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interactions;
    (function (Interactions) {
        var Click = (function (_super) {
            __extends(Click, _super);
            function Click() {
                var _this = this;
                _super.apply(this, arguments);
                this._clickedDown = false;
                this._onClickCallbacks = new Plottable.Utils.CallbackSet();
                this._mouseDownCallback = function (p) { return _this._handleClickDown(p); };
                this._mouseUpCallback = function (p) { return _this._handleClickUp(p); };
                this._touchStartCallback = function (ids, idToPoint) { return _this._handleClickDown(idToPoint[ids[0]]); };
                this._touchEndCallback = function (ids, idToPoint) { return _this._handleClickUp(idToPoint[ids[0]]); };
                this._touchCancelCallback = function (ids, idToPoint) { return _this._clickedDown = false; };
            }
            Click.prototype._anchor = function (component) {
                _super.prototype._anchor.call(this, component);
                this._mouseDispatcher = Plottable.Dispatchers.Mouse.getDispatcher(component.content().node());
                this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
                this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
                this._touchDispatcher = Plottable.Dispatchers.Touch.getDispatcher(component.content().node());
                this._touchDispatcher.onTouchStart(this._touchStartCallback);
                this._touchDispatcher.onTouchEnd(this._touchEndCallback);
                this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
            };
            Click.prototype._unanchor = function () {
                _super.prototype._unanchor.call(this);
                this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
                this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
                this._mouseDispatcher = null;
                this._touchDispatcher.offTouchStart(this._touchStartCallback);
                this._touchDispatcher.offTouchEnd(this._touchEndCallback);
                this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
                this._touchDispatcher = null;
            };
            Click.prototype._handleClickDown = function (p) {
                var translatedPoint = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedPoint)) {
                    this._clickedDown = true;
                }
            };
            Click.prototype._handleClickUp = function (p) {
                var translatedPoint = this._translateToComponentSpace(p);
                if (this._clickedDown && this._isInsideComponent(translatedPoint)) {
                    this._onClickCallbacks.callCallbacks(translatedPoint);
                }
                this._clickedDown = false;
            };
            /**
             * Adds a callback to be called when the Component is clicked.
             *
             * @param {ClickCallback} callback
             * @return {Interactions.Click} The calling Click Interaction.
             */
            Click.prototype.onClick = function (callback) {
                this._onClickCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the Component is clicked.
             *
             * @param {ClickCallback} callback
             * @return {Interactions.Click} The calling Click Interaction.
             */
            Click.prototype.offClick = function (callback) {
                this._onClickCallbacks.delete(callback);
                return this;
            };
            return Click;
        })(Plottable.Interaction);
        Interactions.Click = Click;
    })(Interactions = Plottable.Interactions || (Plottable.Interactions = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interactions;
    (function (Interactions) {
        var ClickState;
        (function (ClickState) {
            ClickState[ClickState["NotClicked"] = 0] = "NotClicked";
            ClickState[ClickState["SingleClicked"] = 1] = "SingleClicked";
            ClickState[ClickState["DoubleClicked"] = 2] = "DoubleClicked";
        })(ClickState || (ClickState = {}));
        ;
        var DoubleClick = (function (_super) {
            __extends(DoubleClick, _super);
            function DoubleClick() {
                var _this = this;
                _super.apply(this, arguments);
                this._clickState = ClickState.NotClicked;
                this._clickedDown = false;
                this._onDoubleClickCallbacks = new Plottable.Utils.CallbackSet();
                this._mouseDownCallback = function (p) { return _this._handleClickDown(p); };
                this._mouseUpCallback = function (p) { return _this._handleClickUp(p); };
                this._dblClickCallback = function (p) { return _this._handleDblClick(); };
                this._touchStartCallback = function (ids, idToPoint) { return _this._handleClickDown(idToPoint[ids[0]]); };
                this._touchEndCallback = function (ids, idToPoint) { return _this._handleClickUp(idToPoint[ids[0]]); };
                this._touchCancelCallback = function (ids, idToPoint) { return _this._handleClickCancel(); };
            }
            DoubleClick.prototype._anchor = function (component) {
                _super.prototype._anchor.call(this, component);
                this._mouseDispatcher = Plottable.Dispatchers.Mouse.getDispatcher(component.content().node());
                this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
                this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
                this._mouseDispatcher.onDblClick(this._dblClickCallback);
                this._touchDispatcher = Plottable.Dispatchers.Touch.getDispatcher(component.content().node());
                this._touchDispatcher.onTouchStart(this._touchStartCallback);
                this._touchDispatcher.onTouchEnd(this._touchEndCallback);
                this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
            };
            DoubleClick.prototype._unanchor = function () {
                _super.prototype._unanchor.call(this);
                this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
                this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
                this._mouseDispatcher.offDblClick(this._dblClickCallback);
                this._mouseDispatcher = null;
                this._touchDispatcher.offTouchStart(this._touchStartCallback);
                this._touchDispatcher.offTouchEnd(this._touchEndCallback);
                this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
                this._touchDispatcher = null;
            };
            DoubleClick.prototype._handleClickDown = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedP)) {
                    if (!(this._clickState === ClickState.SingleClicked) || !DoubleClick._pointsEqual(translatedP, this._clickedPoint)) {
                        this._clickState = ClickState.NotClicked;
                    }
                    this._clickedPoint = translatedP;
                    this._clickedDown = true;
                }
            };
            DoubleClick.prototype._handleClickUp = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (this._clickedDown && DoubleClick._pointsEqual(translatedP, this._clickedPoint)) {
                    this._clickState = this._clickState === ClickState.NotClicked ? ClickState.SingleClicked : ClickState.DoubleClicked;
                }
                else {
                    this._clickState = ClickState.NotClicked;
                }
                this._clickedDown = false;
            };
            DoubleClick.prototype._handleDblClick = function () {
                if (this._clickState === ClickState.DoubleClicked) {
                    this._onDoubleClickCallbacks.callCallbacks(this._clickedPoint);
                    this._clickState = ClickState.NotClicked;
                }
            };
            DoubleClick.prototype._handleClickCancel = function () {
                this._clickState = ClickState.NotClicked;
                this._clickedDown = false;
            };
            DoubleClick._pointsEqual = function (p1, p2) {
                return p1.x === p2.x && p1.y === p2.y;
            };
            /**
             * Adds a callback to be called when the Component is double-clicked.
             *
             * @param {ClickCallback} callback
             * @return {Interactions.DoubleClick} The calling DoubleClick Interaction.
             */
            DoubleClick.prototype.onDoubleClick = function (callback) {
                this._onDoubleClickCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the Component is double-clicked.
             *
             * @param {ClickCallback} callback
             * @return {Interactions.DoubleClick} The calling DoubleClick Interaction.
             */
            DoubleClick.prototype.offDoubleClick = function (callback) {
                this._onDoubleClickCallbacks.delete(callback);
                return this;
            };
            return DoubleClick;
        })(Plottable.Interaction);
        Interactions.DoubleClick = DoubleClick;
    })(Interactions = Plottable.Interactions || (Plottable.Interactions = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interactions;
    (function (Interactions) {
        var Key = (function (_super) {
            __extends(Key, _super);
            function Key() {
                var _this = this;
                _super.apply(this, arguments);
                this._keyPressCallbacks = {};
                this._keyReleaseCallbacks = {};
                this._mouseMoveCallback = function (point) { return false; }; // HACKHACK: registering a listener
                this._downedKeys = new Plottable.Utils.Set();
                this._keyDownCallback = function (keyCode, event) { return _this._handleKeyDownEvent(keyCode, event); };
                this._keyUpCallback = function (keyCode) { return _this._handleKeyUpEvent(keyCode); };
            }
            Key.prototype._anchor = function (component) {
                _super.prototype._anchor.call(this, component);
                this._positionDispatcher = Plottable.Dispatchers.Mouse.getDispatcher(this._componentAttachedTo._element.node());
                this._positionDispatcher.onMouseMove(this._mouseMoveCallback);
                this._keyDispatcher = Plottable.Dispatchers.Key.getDispatcher();
                this._keyDispatcher.onKeyDown(this._keyDownCallback);
                this._keyDispatcher.onKeyUp(this._keyUpCallback);
            };
            Key.prototype._unanchor = function () {
                _super.prototype._unanchor.call(this);
                this._positionDispatcher.offMouseMove(this._mouseMoveCallback);
                this._positionDispatcher = null;
                this._keyDispatcher.offKeyDown(this._keyDownCallback);
                this._keyDispatcher.offKeyUp(this._keyUpCallback);
                this._keyDispatcher = null;
            };
            Key.prototype._handleKeyDownEvent = function (keyCode, event) {
                var p = this._translateToComponentSpace(this._positionDispatcher.lastMousePosition());
                if (this._isInsideComponent(p) && !event.repeat) {
                    if (this._keyPressCallbacks[keyCode]) {
                        this._keyPressCallbacks[keyCode].callCallbacks(keyCode);
                    }
                    this._downedKeys.add(keyCode);
                }
            };
            Key.prototype._handleKeyUpEvent = function (keyCode) {
                if (this._downedKeys.has(keyCode) && this._keyReleaseCallbacks[keyCode]) {
                    this._keyReleaseCallbacks[keyCode].callCallbacks(keyCode);
                }
                this._downedKeys.delete(keyCode);
            };
            /**
             * Adds a callback to be called when the key with the given keyCode is
             * pressed and the user is moused over the Component.
             *
             * @param {number} keyCode
             * @param {KeyCallback} callback
             * @returns {Interactions.Key} The calling Key Interaction.
             */
            Key.prototype.onKeyPress = function (keyCode, callback) {
                if (!this._keyPressCallbacks[keyCode]) {
                    this._keyPressCallbacks[keyCode] = new Plottable.Utils.CallbackSet();
                }
                this._keyPressCallbacks[keyCode].add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the key with the given keyCode is
             * pressed and the user is moused over the Component.
             *
             * @param {number} keyCode
             * @param {KeyCallback} callback
             * @returns {Interactions.Key} The calling Key Interaction.
             */
            Key.prototype.offKeyPress = function (keyCode, callback) {
                this._keyPressCallbacks[keyCode].delete(callback);
                if (this._keyPressCallbacks[keyCode].size === 0) {
                    delete this._keyPressCallbacks[keyCode];
                }
                return this;
            };
            /**
             * Adds a callback to be called when the key with the given keyCode is
             * released if the key was pressed with the mouse inside of the Component.
             *
             * @param {number} keyCode
             * @param {KeyCallback} callback
             * @returns {Interactions.Key} The calling Key Interaction.
             */
            Key.prototype.onKeyRelease = function (keyCode, callback) {
                if (!this._keyReleaseCallbacks[keyCode]) {
                    this._keyReleaseCallbacks[keyCode] = new Plottable.Utils.CallbackSet();
                }
                this._keyReleaseCallbacks[keyCode].add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the key with the given keyCode is
             * released if the key was pressed with the mouse inside of the Component.
             *
             * @param {number} keyCode
             * @param {KeyCallback} callback
             * @returns {Interactions.Key} The calling Key Interaction.
             */
            Key.prototype.offKeyRelease = function (keyCode, callback) {
                this._keyReleaseCallbacks[keyCode].delete(callback);
                if (this._keyReleaseCallbacks[keyCode].size === 0) {
                    delete this._keyReleaseCallbacks[keyCode];
                }
                return this;
            };
            return Key;
        })(Plottable.Interaction);
        Interactions.Key = Key;
    })(Interactions = Plottable.Interactions || (Plottable.Interactions = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interactions;
    (function (Interactions) {
        var Pointer = (function (_super) {
            __extends(Pointer, _super);
            function Pointer() {
                var _this = this;
                _super.apply(this, arguments);
                this._overComponent = false;
                this._pointerEnterCallbacks = new Plottable.Utils.CallbackSet();
                this._pointerMoveCallbacks = new Plottable.Utils.CallbackSet();
                this._pointerExitCallbacks = new Plottable.Utils.CallbackSet();
                this._mouseMoveCallback = function (p) { return _this._handlePointerEvent(p); };
                this._touchStartCallback = function (ids, idToPoint) { return _this._handlePointerEvent(idToPoint[ids[0]]); };
            }
            Pointer.prototype._anchor = function (component) {
                _super.prototype._anchor.call(this, component);
                this._mouseDispatcher = Plottable.Dispatchers.Mouse.getDispatcher(this._componentAttachedTo.content().node());
                this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);
                this._touchDispatcher = Plottable.Dispatchers.Touch.getDispatcher(this._componentAttachedTo.content().node());
                this._touchDispatcher.onTouchStart(this._touchStartCallback);
            };
            Pointer.prototype._unanchor = function () {
                _super.prototype._unanchor.call(this);
                this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
                this._mouseDispatcher = null;
                this._touchDispatcher.offTouchStart(this._touchStartCallback);
                this._touchDispatcher = null;
            };
            Pointer.prototype._handlePointerEvent = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                var overComponent = this._isInsideComponent(translatedP);
                if (overComponent) {
                    if (!this._overComponent) {
                        this._pointerEnterCallbacks.callCallbacks(translatedP);
                    }
                    this._pointerMoveCallbacks.callCallbacks(translatedP);
                }
                else if (this._overComponent) {
                    this._pointerExitCallbacks.callCallbacks(translatedP);
                }
                this._overComponent = overComponent;
            };
            /**
             * Adds a callback to be called when the pointer enters the Component.
             *
             * @param {PointerCallback} callback
             * @return {Interactions.Pointer} The calling Pointer Interaction.
             */
            Pointer.prototype.onPointerEnter = function (callback) {
                this._pointerEnterCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the pointer enters the Component.
             *
             * @param {PointerCallback} callback
             * @return {Interactions.Pointer} The calling Pointer Interaction.
             */
            Pointer.prototype.offPointerEnter = function (callback) {
                this._pointerEnterCallbacks.delete(callback);
                return this;
            };
            /**
             * Adds a callback to be called when the pointer moves within the Component.
             *
             * @param {PointerCallback} callback
             * @return {Interactions.Pointer} The calling Pointer Interaction.
             */
            Pointer.prototype.onPointerMove = function (callback) {
                this._pointerMoveCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the pointer moves within the Component.
             *
             * @param {PointerCallback} callback
             * @return {Interactions.Pointer} The calling Pointer Interaction.
             */
            Pointer.prototype.offPointerMove = function (callback) {
                this._pointerMoveCallbacks.delete(callback);
                return this;
            };
            /**
             * Adds a callback to be called when the pointer exits the Component.
             *
             * @param {PointerCallback} callback
             * @return {Interactions.Pointer} The calling Pointer Interaction.
             */
            Pointer.prototype.onPointerExit = function (callback) {
                this._pointerExitCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when the pointer exits the Component.
             *
             * @param {PointerCallback} callback
             * @return {Interactions.Pointer} The calling Pointer Interaction.
             */
            Pointer.prototype.offPointerExit = function (callback) {
                this._pointerExitCallbacks.delete(callback);
                return this;
            };
            return Pointer;
        })(Plottable.Interaction);
        Interactions.Pointer = Pointer;
    })(Interactions = Plottable.Interactions || (Plottable.Interactions = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interactions;
    (function (Interactions) {
        var PanZoom = (function (_super) {
            __extends(PanZoom, _super);
            /**
             * A PanZoom Interaction updates the domains of an x-scale and/or a y-scale
             * in response to the user panning or zooming.
             *
             * @constructor
             * @param {QuantitativeScale} [xScale] The x-scale to update on panning/zooming.
             * @param {QuantitativeScale} [yScale] The y-scale to update on panning/zooming.
             */
            function PanZoom(xScale, yScale) {
                var _this = this;
                _super.call(this);
                this._wheelCallback = function (p, e) { return _this._handleWheelEvent(p, e); };
                this._touchStartCallback = function (ids, idToPoint, e) { return _this._handleTouchStart(ids, idToPoint, e); };
                this._touchMoveCallback = function (ids, idToPoint, e) { return _this._handlePinch(ids, idToPoint, e); };
                this._touchEndCallback = function (ids, idToPoint, e) { return _this._handleTouchEnd(ids, idToPoint, e); };
                this._touchCancelCallback = function (ids, idToPoint, e) { return _this._handleTouchEnd(ids, idToPoint, e); };
                this._xScales = new Plottable.Utils.Set();
                this._yScales = new Plottable.Utils.Set();
                this._dragInteraction = new Interactions.Drag();
                this._setupDragInteraction();
                this._touchIds = d3.map();
                this._minDomainExtents = new Plottable.Utils.Map();
                this._maxDomainExtents = new Plottable.Utils.Map();
                if (xScale != null) {
                    this.addXScale(xScale);
                }
                if (yScale != null) {
                    this.addYScale(yScale);
                }
            }
            PanZoom.prototype._anchor = function (component) {
                _super.prototype._anchor.call(this, component);
                this._dragInteraction.attachTo(component);
                this._mouseDispatcher = Plottable.Dispatchers.Mouse.getDispatcher(this._componentAttachedTo.content().node());
                this._mouseDispatcher.onWheel(this._wheelCallback);
                this._touchDispatcher = Plottable.Dispatchers.Touch.getDispatcher(this._componentAttachedTo.content().node());
                this._touchDispatcher.onTouchStart(this._touchStartCallback);
                this._touchDispatcher.onTouchMove(this._touchMoveCallback);
                this._touchDispatcher.onTouchEnd(this._touchEndCallback);
                this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
            };
            PanZoom.prototype._unanchor = function () {
                _super.prototype._unanchor.call(this);
                this._mouseDispatcher.offWheel(this._wheelCallback);
                this._mouseDispatcher = null;
                this._touchDispatcher.offTouchStart(this._touchStartCallback);
                this._touchDispatcher.offTouchMove(this._touchMoveCallback);
                this._touchDispatcher.offTouchEnd(this._touchEndCallback);
                this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
                this._touchDispatcher = null;
                this._dragInteraction.detachFrom(this._componentAttachedTo);
            };
            PanZoom.prototype._handleTouchStart = function (ids, idToPoint, e) {
                for (var i = 0; i < ids.length && this._touchIds.size() < 2; i++) {
                    var id = ids[i];
                    this._touchIds.set(id.toString(), this._translateToComponentSpace(idToPoint[id]));
                }
            };
            PanZoom.prototype._handlePinch = function (ids, idToPoint, e) {
                var _this = this;
                if (this._touchIds.size() < 2) {
                    return;
                }
                var oldPoints = this._touchIds.values();
                if (!this._isInsideComponent(this._translateToComponentSpace(oldPoints[0])) ||
                    !this._isInsideComponent(this._translateToComponentSpace(oldPoints[1]))) {
                    return;
                }
                var oldCornerDistance = PanZoom._pointDistance(oldPoints[0], oldPoints[1]);
                if (oldCornerDistance === 0) {
                    return;
                }
                ids.forEach(function (id) {
                    if (_this._touchIds.has(id.toString())) {
                        _this._touchIds.set(id.toString(), _this._translateToComponentSpace(idToPoint[id]));
                    }
                });
                var points = this._touchIds.values();
                var newCornerDistance = PanZoom._pointDistance(points[0], points[1]);
                if (newCornerDistance === 0) {
                    return;
                }
                var magnifyAmount = oldCornerDistance / newCornerDistance;
                var normalizedPointDiffs = points.map(function (point, i) {
                    return { x: (point.x - oldPoints[i].x) / magnifyAmount, y: (point.y - oldPoints[i].y) / magnifyAmount };
                });
                this.xScales().forEach(function (xScale) {
                    magnifyAmount = _this._constrainedZoomAmount(xScale, magnifyAmount);
                });
                this.yScales().forEach(function (yScale) {
                    magnifyAmount = _this._constrainedZoomAmount(yScale, magnifyAmount);
                });
                var constrainedPoints = oldPoints.map(function (oldPoint, i) {
                    return {
                        x: normalizedPointDiffs[i].x * magnifyAmount + oldPoint.x,
                        y: normalizedPointDiffs[i].y * magnifyAmount + oldPoint.y
                    };
                });
                var oldCenterPoint = PanZoom._centerPoint(oldPoints[0], oldPoints[1]);
                var translateAmountX = oldCenterPoint.x - ((constrainedPoints[0].x + constrainedPoints[1].x) / 2);
                this.xScales().forEach(function (xScale) {
                    _this._magnifyScale(xScale, magnifyAmount, oldCenterPoint.x);
                    _this._translateScale(xScale, translateAmountX);
                });
                var translateAmountY = oldCenterPoint.y - ((constrainedPoints[0].y + constrainedPoints[1].y) / 2);
                this.yScales().forEach(function (yScale) {
                    _this._magnifyScale(yScale, magnifyAmount, oldCenterPoint.y);
                    _this._translateScale(yScale, translateAmountY);
                });
            };
            PanZoom._centerPoint = function (point1, point2) {
                var leftX = Math.min(point1.x, point2.x);
                var rightX = Math.max(point1.x, point2.x);
                var topY = Math.min(point1.y, point2.y);
                var bottomY = Math.max(point1.y, point2.y);
                return { x: (leftX + rightX) / 2, y: (bottomY + topY) / 2 };
            };
            PanZoom._pointDistance = function (point1, point2) {
                var leftX = Math.min(point1.x, point2.x);
                var rightX = Math.max(point1.x, point2.x);
                var topY = Math.min(point1.y, point2.y);
                var bottomY = Math.max(point1.y, point2.y);
                return Math.sqrt(Math.pow(rightX - leftX, 2) + Math.pow(bottomY - topY, 2));
            };
            PanZoom.prototype._handleTouchEnd = function (ids, idToPoint, e) {
                var _this = this;
                ids.forEach(function (id) {
                    _this._touchIds.remove(id.toString());
                });
            };
            PanZoom.prototype._magnifyScale = function (scale, magnifyAmount, centerValue) {
                var magnifyTransform = function (rangeValue) { return scale.invert(centerValue - (centerValue - rangeValue) * magnifyAmount); };
                scale.domain(scale.range().map(magnifyTransform));
            };
            PanZoom.prototype._translateScale = function (scale, translateAmount) {
                var translateTransform = function (rangeValue) { return scale.invert(rangeValue + translateAmount); };
                scale.domain(scale.range().map(translateTransform));
            };
            PanZoom.prototype._handleWheelEvent = function (p, e) {
                var _this = this;
                var translatedP = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedP)) {
                    e.preventDefault();
                    var deltaPixelAmount = e.deltaY * (e.deltaMode ? PanZoom._PIXELS_PER_LINE : 1);
                    var zoomAmount = Math.pow(2, deltaPixelAmount * .002);
                    this.xScales().forEach(function (xScale) {
                        zoomAmount = _this._constrainedZoomAmount(xScale, zoomAmount);
                    });
                    this.yScales().forEach(function (yScale) {
                        zoomAmount = _this._constrainedZoomAmount(yScale, zoomAmount);
                    });
                    this.xScales().forEach(function (xScale) {
                        _this._magnifyScale(xScale, zoomAmount, translatedP.x);
                    });
                    this.yScales().forEach(function (yScale) {
                        _this._magnifyScale(yScale, zoomAmount, translatedP.y);
                    });
                }
            };
            PanZoom.prototype._constrainedZoomAmount = function (scale, zoomAmount) {
                var extentIncreasing = zoomAmount > 1;
                var boundingDomainExtent = extentIncreasing ? this.maxDomainExtent(scale) : this.minDomainExtent(scale);
                if (boundingDomainExtent == null) {
                    return zoomAmount;
                }
                var scaleDomain = scale.domain();
                var domainExtent = Math.abs(scaleDomain[1] - scaleDomain[0]);
                var compareF = extentIncreasing ? Math.min : Math.max;
                return compareF(zoomAmount, boundingDomainExtent / domainExtent);
            };
            PanZoom.prototype._setupDragInteraction = function () {
                var _this = this;
                this._dragInteraction.constrainedToComponent(false);
                var lastDragPoint;
                this._dragInteraction.onDragStart(function () { return lastDragPoint = null; });
                this._dragInteraction.onDrag(function (startPoint, endPoint) {
                    if (_this._touchIds.size() >= 2) {
                        return;
                    }
                    var translateAmountX = (lastDragPoint == null ? startPoint.x : lastDragPoint.x) - endPoint.x;
                    _this.xScales().forEach(function (xScale) {
                        _this._translateScale(xScale, translateAmountX);
                    });
                    var translateAmountY = (lastDragPoint == null ? startPoint.y : lastDragPoint.y) - endPoint.y;
                    _this.yScales().forEach(function (yScale) {
                        _this._translateScale(yScale, translateAmountY);
                    });
                    lastDragPoint = endPoint;
                });
            };
            PanZoom.prototype._nonLinearScaleWithExtents = function (scale) {
                return this.minDomainExtent(scale) != null && this.maxDomainExtent(scale) != null &&
                    !(scale instanceof Plottable.Scales.Linear) && !(scale instanceof Plottable.Scales.Time);
            };
            PanZoom.prototype.xScales = function (xScales) {
                var _this = this;
                if (xScales == null) {
                    var scales = [];
                    this._xScales.forEach(function (xScale) {
                        scales.push(xScale);
                    });
                    return scales;
                }
                this._xScales = new Plottable.Utils.Set();
                xScales.forEach(function (xScale) {
                    _this.addXScale(xScale);
                });
                return this;
            };
            PanZoom.prototype.yScales = function (yScales) {
                var _this = this;
                if (yScales == null) {
                    var scales = [];
                    this._yScales.forEach(function (yScale) {
                        scales.push(yScale);
                    });
                    return scales;
                }
                this._yScales = new Plottable.Utils.Set();
                yScales.forEach(function (yScale) {
                    _this.addYScale(yScale);
                });
                return this;
            };
            /**
             * Adds an x scale to this PanZoom Interaction
             *
             * @param {QuantitativeScale<any>} An x scale to add
             * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
             */
            PanZoom.prototype.addXScale = function (xScale) {
                this._xScales.add(xScale);
                return this;
            };
            /**
             * Removes an x scale from this PanZoom Interaction
             *
             * @param {QuantitativeScale<any>} An x scale to remove
             * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
             */
            PanZoom.prototype.removeXScale = function (xScale) {
                this._xScales.delete(xScale);
                this._minDomainExtents.delete(xScale);
                this._maxDomainExtents.delete(xScale);
                return this;
            };
            /**
             * Adds a y scale to this PanZoom Interaction
             *
             * @param {QuantitativeScale<any>} A y scale to add
             * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
             */
            PanZoom.prototype.addYScale = function (yScale) {
                this._yScales.add(yScale);
                return this;
            };
            /**
             * Removes a y scale from this PanZoom Interaction
             *
             * @param {QuantitativeScale<any>} A y scale to remove
             * @returns {Interactions.PanZoom} The calling PanZoom Interaction.
             */
            PanZoom.prototype.removeYScale = function (yScale) {
                this._yScales.delete(yScale);
                this._minDomainExtents.delete(yScale);
                this._maxDomainExtents.delete(yScale);
                return this;
            };
            PanZoom.prototype.minDomainExtent = function (quantitativeScale, minDomainExtent) {
                if (minDomainExtent == null) {
                    return this._minDomainExtents.get(quantitativeScale);
                }
                if (minDomainExtent.valueOf() < 0) {
                    throw new Error("extent must be non-negative");
                }
                var maxExtentForScale = this.maxDomainExtent(quantitativeScale);
                if (maxExtentForScale != null && maxExtentForScale.valueOf() < minDomainExtent.valueOf()) {
                    throw new Error("minDomainExtent must be smaller than maxDomainExtent for the same Scale");
                }
                if (this._nonLinearScaleWithExtents(quantitativeScale)) {
                    Plottable.Utils.Window.warn("Panning and zooming with extents on a nonlinear scale may have unintended behavior.");
                }
                this._minDomainExtents.set(quantitativeScale, minDomainExtent);
                return this;
            };
            PanZoom.prototype.maxDomainExtent = function (quantitativeScale, maxDomainExtent) {
                if (maxDomainExtent == null) {
                    return this._maxDomainExtents.get(quantitativeScale);
                }
                if (maxDomainExtent.valueOf() <= 0) {
                    throw new Error("extent must be positive");
                }
                var minExtentForScale = this.minDomainExtent(quantitativeScale);
                if (minExtentForScale != null && maxDomainExtent.valueOf() < minExtentForScale.valueOf()) {
                    throw new Error("maxDomainExtent must be larger than minDomainExtent for the same Scale");
                }
                if (this._nonLinearScaleWithExtents(quantitativeScale)) {
                    Plottable.Utils.Window.warn("Panning and zooming with extents on a nonlinear scale may have unintended behavior.");
                }
                this._maxDomainExtents.set(quantitativeScale, maxDomainExtent);
                return this;
            };
            /**
             * The number of pixels occupied in a line.
             */
            PanZoom._PIXELS_PER_LINE = 120;
            return PanZoom;
        })(Plottable.Interaction);
        Interactions.PanZoom = PanZoom;
    })(Interactions = Plottable.Interactions || (Plottable.Interactions = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Interactions;
    (function (Interactions) {
        var Drag = (function (_super) {
            __extends(Drag, _super);
            function Drag() {
                var _this = this;
                _super.apply(this, arguments);
                this._dragging = false;
                this._constrainedToComponent = true;
                this._dragStartCallbacks = new Plottable.Utils.CallbackSet();
                this._dragCallbacks = new Plottable.Utils.CallbackSet();
                this._dragEndCallbacks = new Plottable.Utils.CallbackSet();
                this._mouseDownCallback = function (p, e) { return _this._startDrag(p, e); };
                this._mouseMoveCallback = function (p, e) { return _this._doDrag(p, e); };
                this._mouseUpCallback = function (p, e) { return _this._endDrag(p, e); };
                this._touchStartCallback = function (ids, idToPoint, e) { return _this._startDrag(idToPoint[ids[0]], e); };
                this._touchMoveCallback = function (ids, idToPoint, e) { return _this._doDrag(idToPoint[ids[0]], e); };
                this._touchEndCallback = function (ids, idToPoint, e) { return _this._endDrag(idToPoint[ids[0]], e); };
            }
            Drag.prototype._anchor = function (component) {
                _super.prototype._anchor.call(this, component);
                this._mouseDispatcher = Plottable.Dispatchers.Mouse.getDispatcher(this._componentAttachedTo.content().node());
                this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
                this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);
                this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
                this._touchDispatcher = Plottable.Dispatchers.Touch.getDispatcher(this._componentAttachedTo.content().node());
                this._touchDispatcher.onTouchStart(this._touchStartCallback);
                this._touchDispatcher.onTouchMove(this._touchMoveCallback);
                this._touchDispatcher.onTouchEnd(this._touchEndCallback);
            };
            Drag.prototype._unanchor = function () {
                _super.prototype._unanchor.call(this);
                this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
                this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
                this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
                this._mouseDispatcher = null;
                this._touchDispatcher.offTouchStart(this._touchStartCallback);
                this._touchDispatcher.offTouchMove(this._touchMoveCallback);
                this._touchDispatcher.offTouchEnd(this._touchEndCallback);
                this._touchDispatcher = null;
            };
            Drag.prototype._translateAndConstrain = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (!this._constrainedToComponent) {
                    return translatedP;
                }
                return {
                    x: Plottable.Utils.Math.clamp(translatedP.x, 0, this._componentAttachedTo.width()),
                    y: Plottable.Utils.Math.clamp(translatedP.y, 0, this._componentAttachedTo.height())
                };
            };
            Drag.prototype._startDrag = function (point, event) {
                if (event instanceof MouseEvent && event.button !== 0) {
                    return;
                }
                var translatedP = this._translateToComponentSpace(point);
                if (this._isInsideComponent(translatedP)) {
                    event.preventDefault();
                    this._dragging = true;
                    this._dragOrigin = translatedP;
                    this._dragStartCallbacks.callCallbacks(this._dragOrigin);
                }
            };
            Drag.prototype._doDrag = function (point, event) {
                if (this._dragging) {
                    this._dragCallbacks.callCallbacks(this._dragOrigin, this._translateAndConstrain(point));
                }
            };
            Drag.prototype._endDrag = function (point, event) {
                if (event instanceof MouseEvent && event.button !== 0) {
                    return;
                }
                if (this._dragging) {
                    this._dragging = false;
                    this._dragEndCallbacks.callCallbacks(this._dragOrigin, this._translateAndConstrain(point));
                }
            };
            Drag.prototype.constrainedToComponent = function (constrainedToComponent) {
                if (constrainedToComponent == null) {
                    return this._constrainedToComponent;
                }
                this._constrainedToComponent = constrainedToComponent;
                return this;
            };
            /**
             * Adds a callback to be called when dragging starts.
             *
             * @param {DragCallback} callback
             * @returns {Drag} The calling Drag Interaction.
             */
            Drag.prototype.onDragStart = function (callback) {
                this._dragStartCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when dragging starts.
             *
             * @param {DragCallback} callback
             * @returns {Drag} The calling Drag Interaction.
             */
            Drag.prototype.offDragStart = function (callback) {
                this._dragStartCallbacks.delete(callback);
                return this;
            };
            /**
             * Adds a callback to be called during dragging.
             *
             * @param {DragCallback} callback
             * @returns {Drag} The calling Drag Interaction.
             */
            Drag.prototype.onDrag = function (callback) {
                this._dragCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called during dragging.
             *
             * @param {DragCallback} callback
             * @returns {Drag} The calling Drag Interaction.
             */
            Drag.prototype.offDrag = function (callback) {
                this._dragCallbacks.delete(callback);
                return this;
            };
            /**
             * Adds a callback to be called when dragging ends.
             *
             * @param {DragCallback} callback
             * @returns {Drag} The calling Drag Interaction.
             */
            Drag.prototype.onDragEnd = function (callback) {
                this._dragEndCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when dragging ends.
             *
             * @param {DragCallback} callback
             * @returns {Drag} The calling Drag Interaction.
             */
            Drag.prototype.offDragEnd = function (callback) {
                this._dragEndCallbacks.delete(callback);
                return this;
            };
            return Drag;
        })(Plottable.Interaction);
        Interactions.Drag = Drag;
    })(Interactions = Plottable.Interactions || (Plottable.Interactions = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var DragBoxLayer = (function (_super) {
            __extends(DragBoxLayer, _super);
            /**
             * Constructs a DragBoxLayer.
             *
             * A DragBoxLayer is a SelectionBoxLayer with a built-in Drag Interaction.
             * A drag gesture will set the Bounds of the box.
             * If resizing is enabled using resizable(true), the edges of box can be repositioned.
             *
             * @constructor
             */
            function DragBoxLayer() {
                _super.call(this);
                this._detectionRadius = 3;
                this._resizable = false;
                this._movable = false;
                this._hasCorners = true;
                this.addClass("drag-box-layer");
                this._dragInteraction = new Plottable.Interactions.Drag();
                this._setUpCallbacks();
                this._dragInteraction.attachTo(this);
                this._dragStartCallbacks = new Plottable.Utils.CallbackSet();
                this._dragCallbacks = new Plottable.Utils.CallbackSet();
                this._dragEndCallbacks = new Plottable.Utils.CallbackSet();
            }
            DragBoxLayer.prototype._setUpCallbacks = function () {
                var _this = this;
                var resizingEdges;
                var topLeft;
                var bottomRight;
                var lastEndPoint;
                var DRAG_MODES = {
                    newBox: 0,
                    resize: 1,
                    move: 2
                };
                var mode = DRAG_MODES.newBox;
                var onDragStartCallback = function (startPoint) {
                    resizingEdges = _this._getResizingEdges(startPoint);
                    var bounds = _this.bounds();
                    var isInsideBox = bounds.topLeft.x <= startPoint.x && startPoint.x <= bounds.bottomRight.x &&
                        bounds.topLeft.y <= startPoint.y && startPoint.y <= bounds.bottomRight.y;
                    if (_this.boxVisible() && (resizingEdges.top || resizingEdges.bottom || resizingEdges.left || resizingEdges.right)) {
                        mode = DRAG_MODES.resize;
                    }
                    else if (_this.boxVisible() && _this.movable() && isInsideBox) {
                        mode = DRAG_MODES.move;
                    }
                    else {
                        mode = DRAG_MODES.newBox;
                        _this._setBounds({
                            topLeft: startPoint,
                            bottomRight: startPoint
                        });
                        if (_this._xBoundsMode === Components.PropertyMode.VALUE && _this.xScale() != null) {
                            _this._setXExtent([_this.xScale().invert(startPoint.x), _this.xScale().invert(startPoint.x)]);
                        }
                        if (_this._yBoundsMode === Components.PropertyMode.VALUE && _this.yScale() != null) {
                            _this._setYExtent([_this.yScale().invert(startPoint.y), _this.yScale().invert(startPoint.y)]);
                        }
                        _this.render();
                    }
                    _this.boxVisible(true);
                    bounds = _this.bounds();
                    // copy points so changes to topLeft and bottomRight don't mutate bounds
                    topLeft = { x: bounds.topLeft.x, y: bounds.topLeft.y };
                    bottomRight = { x: bounds.bottomRight.x, y: bounds.bottomRight.y };
                    lastEndPoint = startPoint;
                    _this._dragStartCallbacks.callCallbacks(bounds);
                };
                var onDragCallback = function (startPoint, endPoint) {
                    switch (mode) {
                        case DRAG_MODES.newBox:
                            bottomRight.x = endPoint.x;
                            bottomRight.y = endPoint.y;
                            break;
                        case DRAG_MODES.resize:
                            if (resizingEdges.bottom) {
                                bottomRight.y = endPoint.y;
                            }
                            else if (resizingEdges.top) {
                                topLeft.y = endPoint.y;
                            }
                            if (resizingEdges.right) {
                                bottomRight.x = endPoint.x;
                            }
                            else if (resizingEdges.left) {
                                topLeft.x = endPoint.x;
                            }
                            break;
                        case DRAG_MODES.move:
                            var dx = endPoint.x - lastEndPoint.x;
                            var dy = endPoint.y - lastEndPoint.y;
                            topLeft.x += dx;
                            topLeft.y += dy;
                            bottomRight.x += dx;
                            bottomRight.y += dy;
                            lastEndPoint = endPoint;
                            break;
                    }
                    _this._setBounds({
                        topLeft: topLeft,
                        bottomRight: bottomRight
                    });
                    if (_this._xBoundsMode === Components.PropertyMode.VALUE && _this.xScale() != null) {
                        _this._setXExtent([_this.xScale().invert(topLeft.x), _this.xScale().invert(bottomRight.x)]);
                    }
                    if (_this._yBoundsMode === Components.PropertyMode.VALUE && _this.yScale() != null) {
                        _this._setYExtent([_this.yScale().invert(topLeft.y), _this.yScale().invert(bottomRight.y)]);
                    }
                    _this.render();
                    _this._dragCallbacks.callCallbacks(_this.bounds());
                };
                var onDragEndCallback = function (startPoint, endPoint) {
                    if (mode === DRAG_MODES.newBox && startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
                        _this.boxVisible(false);
                    }
                    _this._dragEndCallbacks.callCallbacks(_this.bounds());
                };
                this._dragInteraction.onDragStart(onDragStartCallback);
                this._dragInteraction.onDrag(onDragCallback);
                this._dragInteraction.onDragEnd(onDragEndCallback);
                this._disconnectInteraction = function () {
                    _this._dragInteraction.offDragStart(onDragStartCallback);
                    _this._dragInteraction.offDrag(onDragCallback);
                    _this._dragInteraction.offDragEnd(onDragEndCallback);
                    _this._dragInteraction.detachFrom(_this);
                };
            };
            DragBoxLayer.prototype._setup = function () {
                var _this = this;
                _super.prototype._setup.call(this);
                var createLine = function () { return _this._box.append("line").style({
                    "opacity": 0,
                    "stroke": "pink",
                    "pointer-events": "visibleStroke"
                }); };
                this._detectionEdgeT = createLine().classed("drag-edge-tb", true);
                this._detectionEdgeB = createLine().classed("drag-edge-tb", true);
                this._detectionEdgeL = createLine().classed("drag-edge-lr", true);
                this._detectionEdgeR = createLine().classed("drag-edge-lr", true);
                if (this._hasCorners) {
                    var createCorner = function () { return _this._box.append("circle")
                        .style({
                        "opacity": 0,
                        "fill": "pink",
                        "pointer-events": "visibleFill"
                    }); };
                    this._detectionCornerTL = createCorner().classed("drag-corner-tl", true);
                    this._detectionCornerTR = createCorner().classed("drag-corner-tr", true);
                    this._detectionCornerBL = createCorner().classed("drag-corner-bl", true);
                    this._detectionCornerBR = createCorner().classed("drag-corner-br", true);
                }
            };
            DragBoxLayer.prototype._getResizingEdges = function (p) {
                var edges = {
                    top: false,
                    bottom: false,
                    left: false,
                    right: false
                };
                if (!this.resizable()) {
                    return edges;
                }
                var bounds = this.bounds();
                var t = bounds.topLeft.y;
                var b = bounds.bottomRight.y;
                var l = bounds.topLeft.x;
                var r = bounds.bottomRight.x;
                var rad = this._detectionRadius;
                if (l - rad <= p.x && p.x <= r + rad) {
                    edges.top = (t - rad <= p.y && p.y <= t + rad);
                    edges.bottom = (b - rad <= p.y && p.y <= b + rad);
                }
                if (t - rad <= p.y && p.y <= b + rad) {
                    edges.left = (l - rad <= p.x && p.x <= l + rad);
                    edges.right = (r - rad <= p.x && p.x <= r + rad);
                }
                return edges;
            };
            DragBoxLayer.prototype.renderImmediately = function () {
                _super.prototype.renderImmediately.call(this);
                if (this.boxVisible()) {
                    var bounds = this.bounds();
                    var t = bounds.topLeft.y;
                    var b = bounds.bottomRight.y;
                    var l = bounds.topLeft.x;
                    var r = bounds.bottomRight.x;
                    this._detectionEdgeT.attr({
                        x1: l, y1: t, x2: r, y2: t,
                        "stroke-width": this._detectionRadius * 2
                    });
                    this._detectionEdgeB.attr({
                        x1: l, y1: b, x2: r, y2: b,
                        "stroke-width": this._detectionRadius * 2
                    });
                    this._detectionEdgeL.attr({
                        x1: l, y1: t, x2: l, y2: b,
                        "stroke-width": this._detectionRadius * 2
                    });
                    this._detectionEdgeR.attr({
                        x1: r, y1: t, x2: r, y2: b,
                        "stroke-width": this._detectionRadius * 2
                    });
                    if (this._hasCorners) {
                        this._detectionCornerTL.attr({ cx: l, cy: t, r: this._detectionRadius });
                        this._detectionCornerTR.attr({ cx: r, cy: t, r: this._detectionRadius });
                        this._detectionCornerBL.attr({ cx: l, cy: b, r: this._detectionRadius });
                        this._detectionCornerBR.attr({ cx: r, cy: b, r: this._detectionRadius });
                    }
                    return this;
                }
            };
            DragBoxLayer.prototype.detectionRadius = function (r) {
                if (r == null) {
                    return this._detectionRadius;
                }
                if (r < 0) {
                    throw new Error("detection radius cannot be negative.");
                }
                this._detectionRadius = r;
                this.render();
                return this;
            };
            DragBoxLayer.prototype.resizable = function (canResize) {
                if (canResize == null) {
                    return this._resizable;
                }
                this._resizable = canResize;
                this._setResizableClasses(canResize);
                return this;
            };
            // Sets resizable classes. Overridden by subclasses that only resize in one dimension.
            DragBoxLayer.prototype._setResizableClasses = function (canResize) {
                if (canResize && this.enabled()) {
                    this.addClass("x-resizable");
                    this.addClass("y-resizable");
                }
                else {
                    this.removeClass("x-resizable");
                    this.removeClass("y-resizable");
                }
            };
            DragBoxLayer.prototype.movable = function (movable) {
                if (movable == null) {
                    return this._movable;
                }
                this._movable = movable;
                this._setMovableClass();
                return this;
            };
            DragBoxLayer.prototype._setMovableClass = function () {
                if (this.movable() && this.enabled()) {
                    this.addClass("movable");
                }
                else {
                    this.removeClass("movable");
                }
            };
            /**
             * Sets the callback to be called when dragging starts.
             *
             * @param {DragBoxCallback} callback
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            DragBoxLayer.prototype.onDragStart = function (callback) {
                this._dragStartCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback to be called when dragging starts.
             *
             * @param {DragBoxCallback} callback
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            DragBoxLayer.prototype.offDragStart = function (callback) {
                this._dragStartCallbacks.delete(callback);
                return this;
            };
            /**
             * Sets a callback to be called during dragging.
             *
             * @param {DragBoxCallback} callback
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            DragBoxLayer.prototype.onDrag = function (callback) {
                this._dragCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback to be called during dragging.
             *
             * @param {DragBoxCallback} callback
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            DragBoxLayer.prototype.offDrag = function (callback) {
                this._dragCallbacks.delete(callback);
                return this;
            };
            /**
             * Sets a callback to be called when dragging ends.
             *
             * @param {DragBoxCallback} callback
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            DragBoxLayer.prototype.onDragEnd = function (callback) {
                this._dragEndCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback to be called when dragging ends.
             *
             * @param {DragBoxCallback} callback
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            DragBoxLayer.prototype.offDragEnd = function (callback) {
                this._dragEndCallbacks.delete(callback);
                return this;
            };
            /**
             * Gets the internal Interactions.Drag of the DragBoxLayer.
             */
            DragBoxLayer.prototype.dragInteraction = function () {
                return this._dragInteraction;
            };
            DragBoxLayer.prototype.enabled = function (enabled) {
                if (enabled == null) {
                    return this._dragInteraction.enabled();
                }
                this._dragInteraction.enabled(enabled);
                this._setResizableClasses(this.resizable());
                this._setMovableClass();
                return this;
            };
            DragBoxLayer.prototype.destroy = function () {
                var _this = this;
                _super.prototype.destroy.call(this);
                this._dragStartCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
                this._dragCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
                this._dragEndCallbacks.forEach(function (callback) { return _this._dragEndCallbacks.delete(callback); });
                this._disconnectInteraction();
            };
            DragBoxLayer.prototype.detach = function () {
                this._resetState();
                this._dragInteraction.detachFrom(this);
                return _super.prototype.detach.call(this);
            };
            DragBoxLayer.prototype.anchor = function (selection) {
                this._dragInteraction.attachTo(this);
                return _super.prototype.anchor.call(this, selection);
            };
            DragBoxLayer.prototype._resetState = function () {
                this.bounds({
                    topLeft: { x: 0, y: 0 },
                    bottomRight: { x: 0, y: 0 }
                });
            };
            return DragBoxLayer;
        })(Components.SelectionBoxLayer);
        Components.DragBoxLayer = DragBoxLayer;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var XDragBoxLayer = (function (_super) {
            __extends(XDragBoxLayer, _super);
            /**
             * An XDragBoxLayer is a DragBoxLayer whose size can only be set in the X-direction.
             * The y-values of the bounds() are always set to 0 and the height() of the XDragBoxLayer.
             *
             * @constructor
             */
            function XDragBoxLayer() {
                _super.call(this);
                this.addClass("x-drag-box-layer");
                this._hasCorners = false;
            }
            XDragBoxLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                // set correct bounds when width/height changes
                this._setBounds(this.bounds());
                return this;
            };
            XDragBoxLayer.prototype._setBounds = function (newBounds) {
                _super.prototype._setBounds.call(this, {
                    topLeft: { x: newBounds.topLeft.x, y: 0 },
                    bottomRight: { x: newBounds.bottomRight.x, y: this.height() }
                });
            };
            XDragBoxLayer.prototype._setResizableClasses = function (canResize) {
                if (canResize && this.enabled()) {
                    this.addClass("x-resizable");
                }
                else {
                    this.removeClass("x-resizable");
                }
            };
            XDragBoxLayer.prototype.yScale = function (yScale) {
                if (yScale == null) {
                    return _super.prototype.yScale.call(this);
                }
                throw new Error("yScales cannot be set on an XDragBoxLayer");
            };
            XDragBoxLayer.prototype.yExtent = function (yExtent) {
                if (yExtent == null) {
                    return _super.prototype.yExtent.call(this);
                }
                throw new Error("XDragBoxLayer has no yExtent");
            };
            return XDragBoxLayer;
        })(Components.DragBoxLayer);
        Components.XDragBoxLayer = XDragBoxLayer;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var YDragBoxLayer = (function (_super) {
            __extends(YDragBoxLayer, _super);
            /**
             * A YDragBoxLayer is a DragBoxLayer whose size can only be set in the Y-direction.
             * The x-values of the bounds() are always set to 0 and the width() of the YDragBoxLayer.
             *
             * @constructor
             */
            function YDragBoxLayer() {
                _super.call(this);
                this.addClass("y-drag-box-layer");
                this._hasCorners = false;
            }
            YDragBoxLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
                _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
                // set correct bounds when width/height changes
                this._setBounds(this.bounds());
                return this;
            };
            YDragBoxLayer.prototype._setBounds = function (newBounds) {
                _super.prototype._setBounds.call(this, {
                    topLeft: { x: 0, y: newBounds.topLeft.y },
                    bottomRight: { x: this.width(), y: newBounds.bottomRight.y }
                });
            };
            YDragBoxLayer.prototype._setResizableClasses = function (canResize) {
                if (canResize && this.enabled()) {
                    this.addClass("y-resizable");
                }
                else {
                    this.removeClass("y-resizable");
                }
            };
            YDragBoxLayer.prototype.xScale = function (xScale) {
                if (xScale == null) {
                    return _super.prototype.xScale.call(this);
                }
                throw new Error("xScales cannot be set on an YDragBoxLayer");
            };
            YDragBoxLayer.prototype.xExtent = function (xExtent) {
                if (xExtent == null) {
                    return _super.prototype.xExtent.call(this);
                }
                throw new Error("YDragBoxLayer has no xExtent");
            };
            return YDragBoxLayer;
        })(Components.DragBoxLayer);
        Components.YDragBoxLayer = YDragBoxLayer;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    ;
})(Plottable || (Plottable = {}));
var Plottable;
(function (Plottable) {
    var Components;
    (function (Components) {
        var DragLineLayer = (function (_super) {
            __extends(DragLineLayer, _super);
            function DragLineLayer(orientation) {
                var _this = this;
                _super.call(this, orientation);
                this._detectionRadius = 3;
                this._enabled = true;
                this.addClass("drag-line-layer");
                this.addClass("enabled");
                this._dragInteraction = new Plottable.Interactions.Drag();
                this._dragInteraction.attachTo(this);
                var onLine = function (p) {
                    return (_this._isVertical() &&
                        _this.pixelPosition() - _this.detectionRadius() <= p.x &&
                        p.x <= _this.pixelPosition() + _this.detectionRadius()) ||
                        (!_this._isVertical() &&
                            _this.pixelPosition() - _this.detectionRadius() <= p.y &&
                            p.y <= _this.pixelPosition() + _this.detectionRadius());
                };
                var dragging = false;
                var interactionDragStartCallback = function (start) {
                    if (onLine(start)) {
                        dragging = true;
                        _this._dragStartCallbacks.callCallbacks(_this);
                    }
                };
                this._dragInteraction.onDragStart(interactionDragStartCallback);
                var interactionDragCallback = function (start, end) {
                    if (dragging) {
                        _this._setPixelPositionWithoutChangingMode(_this._isVertical() ? end.x : end.y);
                        _this._dragCallbacks.callCallbacks(_this);
                    }
                };
                this._dragInteraction.onDrag(interactionDragCallback);
                var interactionDragEndCallback = function (start, end) {
                    if (dragging) {
                        dragging = false;
                        _this._dragEndCallbacks.callCallbacks(_this);
                    }
                };
                this._dragInteraction.onDragEnd(interactionDragEndCallback);
                this._disconnectInteraction = function () {
                    _this._dragInteraction.offDragStart(interactionDragStartCallback);
                    _this._dragInteraction.offDrag(interactionDragCallback);
                    _this._dragInteraction.offDragEnd(interactionDragEndCallback);
                    _this._dragInteraction.detachFrom(_this);
                };
                this._dragStartCallbacks = new Plottable.Utils.CallbackSet();
                this._dragCallbacks = new Plottable.Utils.CallbackSet();
                this._dragEndCallbacks = new Plottable.Utils.CallbackSet();
            }
            DragLineLayer.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._detectionEdge = this.content().append("line").style({
                    "opacity": 0,
                    "stroke": "pink",
                    "pointer-events": "visibleStroke"
                }).classed("drag-edge", true);
            };
            DragLineLayer.prototype.renderImmediately = function () {
                _super.prototype.renderImmediately.call(this);
                this._detectionEdge.attr({
                    x1: this._isVertical() ? this.pixelPosition() : 0,
                    y1: this._isVertical() ? 0 : this.pixelPosition(),
                    x2: this._isVertical() ? this.pixelPosition() : this.width(),
                    y2: this._isVertical() ? this.height() : this.pixelPosition(),
                    "stroke-width": this._detectionRadius * 2
                });
                return this;
            };
            DragLineLayer.prototype.detectionRadius = function (detectionRadius) {
                if (detectionRadius == null) {
                    return this._detectionRadius;
                }
                if (detectionRadius < 0) {
                    throw new Error("detection radius cannot be negative.");
                }
                this._detectionRadius = detectionRadius;
                this.render();
                return this;
            };
            DragLineLayer.prototype.enabled = function (enabled) {
                if (enabled == null) {
                    return this._enabled;
                }
                this._enabled = enabled;
                if (enabled) {
                    this.addClass("enabled");
                }
                else {
                    this.removeClass("enabled");
                }
                this._dragInteraction.enabled(enabled);
                return this;
            };
            /**
             * Sets the callback to be called when dragging starts.
             * The callback will be passed the calling DragLineLayer.
             *
             * @param {DragLineCallback<D>} callback
             * @returns {DragLineLayer<D>} The calling DragLineLayer.
             */
            DragLineLayer.prototype.onDragStart = function (callback) {
                this._dragStartCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when dragging starts.
             *
             * @param {DragLineCallback<D>} callback
             * @returns {DragLineLayer<D>} The calling DragLineLayer.
             */
            DragLineLayer.prototype.offDragStart = function (callback) {
                this._dragStartCallbacks.delete(callback);
                return this;
            };
            /**
             * Sets a callback to be called during dragging.
             * The callback will be passed the calling DragLineLayer.
             *
             * @param {DragLineCallback<D>} callback
             * @returns {DragLineLayer<D>} The calling DragLineLayer.
             */
            DragLineLayer.prototype.onDrag = function (callback) {
                this._dragCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called during dragging.
             *
             * @param {DragLineCallback<D>} callback
             * @returns {DragLineLayer<D>} The calling DragLineLayer.
             */
            DragLineLayer.prototype.offDrag = function (callback) {
                this._dragCallbacks.delete(callback);
                return this;
            };
            /**
             * Sets a callback to be called when dragging ends.
             * The callback will be passed the calling DragLineLayer.
             *
             * @param {DragLineCallback<D>} callback
             * @returns {DragLineLayer<D>} The calling DragLineLayer.
             */
            DragLineLayer.prototype.onDragEnd = function (callback) {
                this._dragEndCallbacks.add(callback);
                return this;
            };
            /**
             * Removes a callback that would be called when dragging ends.
             *
             * @param {DragLineCallback<D>} callback
             * @returns {DragLineLayer<D>} The calling DragLineLayer.
             */
            DragLineLayer.prototype.offDragEnd = function (callback) {
                this._dragEndCallbacks.delete(callback);
                return this;
            };
            DragLineLayer.prototype.destroy = function () {
                var _this = this;
                _super.prototype.destroy.call(this);
                this._dragStartCallbacks.forEach(function (callback) { return _this._dragStartCallbacks.delete(callback); });
                this._dragCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
                this._dragEndCallbacks.forEach(function (callback) { return _this._dragEndCallbacks.delete(callback); });
                this._disconnectInteraction();
            };
            return DragLineLayer;
        })(Components.GuideLineLayer);
        Components.DragLineLayer = DragLineLayer;
    })(Components = Plottable.Components || (Plottable.Components = {}));
})(Plottable || (Plottable = {}));

/*!
SVG Typewriter 0.3.0 (https://github.com/palantir/svg-typewriter)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/svg-typewriter/blob/develop/LICENSE)
*/

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Utils;
    (function (Utils) {
        var Methods;
        (function (Methods) {
            /**
             * Check if two arrays are equal by strict equality.
             */
            function arrayEq(a, b) {
                // Technically, null and undefined are arrays too
                if (a == null || b == null) {
                    return a === b;
                }
                if (a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }
                return true;
            }
            Methods.arrayEq = arrayEq;
            /**
             * @param {any} a Object to check against b for equality.
             * @param {any} b Object to check against a for equality.
             *
             * @returns {boolean} whether or not two objects share the same keys, and
             *          values associated with those keys. Values will be compared
             *          with ===.
             */
            function objEq(a, b) {
                if (a == null || b == null) {
                    return a === b;
                }
                var keysA = Object.keys(a).sort();
                var keysB = Object.keys(b).sort();
                var valuesA = keysA.map(function (k) { return a[k]; });
                var valuesB = keysB.map(function (k) { return b[k]; });
                return arrayEq(keysA, keysB) && arrayEq(valuesA, valuesB);
            }
            Methods.objEq = objEq;
        })(Methods = Utils.Methods || (Utils.Methods = {}));
    })(Utils = SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

var SVGTypewriter;
(function (SVGTypewriter) {
    var Utils;
    (function (Utils) {
        var DOM;
        (function (DOM) {
            function transform(s, x, y) {
                var xform = d3.transform(s.attr("transform"));
                if (x == null) {
                    return xform.translate;
                }
                else {
                    y = (y == null) ? 0 : y;
                    xform.translate[0] = x;
                    xform.translate[1] = y;
                    s.attr("transform", xform.toString());
                    return s;
                }
            }
            DOM.transform = transform;
            function getBBox(element) {
                var bbox;
                try {
                    bbox = element.node().getBBox();
                }
                catch (err) {
                    bbox = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                }
                return bbox;
            }
            DOM.getBBox = getBBox;
        })(DOM = Utils.DOM || (Utils.DOM = {}));
    })(Utils = SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Utils;
    (function (Utils) {
        var Cache = (function () {
            /**
             * @constructor
             *
             * @param {string} compute The function whose results will be cached.
             * @param {(v: T, w: T) => boolean} [valueEq]
             *        Used to determine if the value of canonicalKey has changed.
             *        If omitted, defaults to === comparision.
             */
            function Cache(compute, valueEq) {
                if (valueEq === void 0) { valueEq = function (v, w) { return v === w; }; }
                this.cache = d3.map();
                this.compute = compute;
                this.valueEq = valueEq;
            }
            /**
             * Attempt to look up k in the cache, computing the result if it isn't
             * found.
             *
             * @param {string} k The key to look up in the cache.
             * @return {T} The value associated with k; the result of compute(k).
             */
            Cache.prototype.get = function (k) {
                if (!this.cache.has(k)) {
                    this.cache.set(k, this.compute(k));
                }
                return this.cache.get(k);
            };
            /**
             * Reset the cache empty.
             *
             * @return {Cache<T>} The calling Cache.
             */
            Cache.prototype.clear = function () {
                this.cache = d3.map();
                return this;
            };
            return Cache;
        })();
        Utils.Cache = Cache;
    })(Utils = SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Utils;
    (function (Utils) {
        var Tokenizer = (function () {
            function Tokenizer() {
                this.WordDividerRegExp = new RegExp("\\W");
                this.WhitespaceRegExp = new RegExp("\\s");
            }
            Tokenizer.prototype.tokenize = function (line) {
                var _this = this;
                return line.split("").reduce(function (tokens, c) { return tokens.slice(0, -1).concat(_this.shouldCreateNewToken(tokens[tokens.length - 1], c)); }, [""]);
            };
            Tokenizer.prototype.shouldCreateNewToken = function (token, newCharacter) {
                if (!token) {
                    return [newCharacter];
                }
                var lastCharacter = token[token.length - 1];
                if (this.WhitespaceRegExp.test(lastCharacter) && this.WhitespaceRegExp.test(newCharacter)) {
                    return [token + newCharacter];
                }
                else if (this.WhitespaceRegExp.test(lastCharacter) || this.WhitespaceRegExp.test(newCharacter)) {
                    return [token, newCharacter];
                }
                else if (!(this.WordDividerRegExp.test(lastCharacter) || this.WordDividerRegExp.test(newCharacter))) {
                    return [token + newCharacter];
                }
                else if (lastCharacter === newCharacter) {
                    return [token + newCharacter];
                }
                else {
                    return [token, newCharacter];
                }
            };
            return Tokenizer;
        })();
        Utils.Tokenizer = Tokenizer;
    })(Utils = SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Utils;
    (function (Utils) {
        var StringMethods;
        (function (StringMethods) {
            /**
             * Treat all sequences of consecutive whitespace as a single " ".
             */
            function combineWhitespace(str) {
                return str.replace(/\s+/g, " ");
            }
            StringMethods.combineWhitespace = combineWhitespace;
            function isNotEmptyString(str) {
                return str && str.trim() !== "";
            }
            StringMethods.isNotEmptyString = isNotEmptyString;
            function trimStart(str, c) {
                if (!str) {
                    return str;
                }
                var chars = str.split("");
                var reduceFunction = c ? function (s) { return s.split(c).some(isNotEmptyString); } : isNotEmptyString;
                return chars.reduce(function (s, c) { return reduceFunction(s + c) ? s + c : s; }, "");
            }
            StringMethods.trimStart = trimStart;
            function trimEnd(str, c) {
                if (!str) {
                    return str;
                }
                var reversedChars = str.split("");
                reversedChars.reverse();
                reversedChars = trimStart(reversedChars.join(""), c).split("");
                reversedChars.reverse();
                return reversedChars.join("");
            }
            StringMethods.trimEnd = trimEnd;
        })(StringMethods = Utils.StringMethods || (Utils.StringMethods = {}));
    })(Utils = SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Animators;
    (function (Animators) {
        var BaseAnimator = (function () {
            function BaseAnimator() {
                this.duration(BaseAnimator.DEFAULT_DURATION_MILLISECONDS);
                this.delay(0);
                this.easing(BaseAnimator.DEFAULT_EASING);
                this.moveX(0);
                this.moveY(0);
            }
            BaseAnimator.prototype.animate = function (selection) {
                var xForm = d3.transform("");
                xForm.translate = [this.moveX(), this.moveY()];
                selection.attr("transform", xForm.toString());
                xForm.translate = [0, 0];
                return this._animate(selection, { transform: xForm.toString() });
            };
            BaseAnimator.prototype._animate = function (selection, attr) {
                return selection.transition().ease(this.easing()).duration(this.duration()).delay(this.delay()).attr(attr);
            };
            BaseAnimator.prototype.duration = function (duration) {
                if (duration == null) {
                    return this._duration;
                }
                else {
                    this._duration = duration;
                    return this;
                }
            };
            BaseAnimator.prototype.moveX = function (shift) {
                if (shift == null) {
                    return this._moveX;
                }
                else {
                    this._moveX = shift;
                    return this;
                }
            };
            BaseAnimator.prototype.moveY = function (shift) {
                if (shift == null) {
                    return this._moveY;
                }
                else {
                    this._moveY = shift;
                    return this;
                }
            };
            BaseAnimator.prototype.delay = function (delay) {
                if (delay == null) {
                    return this._delay;
                }
                else {
                    this._delay = delay;
                    return this;
                }
            };
            BaseAnimator.prototype.easing = function (easing) {
                if (easing == null) {
                    return this._easing;
                }
                else {
                    this._easing = easing;
                    return this;
                }
            };
            /**
             * The default duration of the animation in milliseconds
             */
            BaseAnimator.DEFAULT_DURATION_MILLISECONDS = 300;
            /**
             * The default easing of the animation
             */
            BaseAnimator.DEFAULT_EASING = "exp-out";
            return BaseAnimator;
        })();
        Animators.BaseAnimator = BaseAnimator;
    })(Animators = SVGTypewriter.Animators || (SVGTypewriter.Animators = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVGTypewriter;
(function (SVGTypewriter) {
    var Animators;
    (function (Animators) {
        var UnveilAnimator = (function (_super) {
            __extends(UnveilAnimator, _super);
            function UnveilAnimator() {
                this.direction("bottom");
                _super.call(this);
            }
            UnveilAnimator.prototype.direction = function (direction) {
                if (direction == null) {
                    return this._direction;
                }
                else {
                    if (UnveilAnimator.SupportedDirections.indexOf(direction) === -1) {
                        throw new Error("unsupported direction - " + direction);
                    }
                    this._direction = direction;
                    return this;
                }
            };
            UnveilAnimator.prototype.animate = function (selection) {
                var attr = SVGTypewriter.Utils.DOM.getBBox(selection);
                var mask = selection.select(".clip-rect");
                mask.attr("width", 0);
                mask.attr("height", 0);
                switch (this._direction) {
                    case "top":
                        mask.attr("y", attr.y + attr.height);
                        mask.attr("x", attr.x);
                        mask.attr("width", attr.width);
                        break;
                    case "bottom":
                        mask.attr("y", attr.y);
                        mask.attr("x", attr.x);
                        mask.attr("width", attr.width);
                        break;
                    case "left":
                        mask.attr("y", attr.y);
                        mask.attr("x", attr.x);
                        mask.attr("height", attr.height);
                        break;
                    case "right":
                        mask.attr("y", attr.y);
                        mask.attr("x", attr.x + attr.width);
                        mask.attr("height", attr.height);
                        break;
                }
                this._animate(mask, attr);
                return _super.prototype.animate.call(this, selection);
            };
            UnveilAnimator.SupportedDirections = ["top", "bottom", "left", "right"];
            return UnveilAnimator;
        })(Animators.BaseAnimator);
        Animators.UnveilAnimator = UnveilAnimator;
    })(Animators = SVGTypewriter.Animators || (SVGTypewriter.Animators = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVGTypewriter;
(function (SVGTypewriter) {
    var Animators;
    (function (Animators) {
        var OpacityAnimator = (function (_super) {
            __extends(OpacityAnimator, _super);
            function OpacityAnimator() {
                _super.apply(this, arguments);
            }
            OpacityAnimator.prototype.animate = function (selection) {
                var area = selection.select(".text-area");
                area.attr("opacity", 0);
                var attr = {
                    opacity: 1
                };
                this._animate(area, attr);
                return _super.prototype.animate.call(this, selection);
            };
            return OpacityAnimator;
        })(Animators.BaseAnimator);
        Animators.OpacityAnimator = OpacityAnimator;
    })(Animators = SVGTypewriter.Animators || (SVGTypewriter.Animators = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Wrappers;
    (function (Wrappers) {
        var Wrapper = (function () {
            function Wrapper() {
                this.maxLines(Infinity);
                this.textTrimming("ellipsis");
                this.allowBreakingWords(true);
                this._tokenizer = new SVGTypewriter.Utils.Tokenizer();
                this._breakingCharacter = "-";
            }
            Wrapper.prototype.maxLines = function (noLines) {
                if (noLines == null) {
                    return this._maxLines;
                }
                else {
                    this._maxLines = noLines;
                    return this;
                }
            };
            Wrapper.prototype.textTrimming = function (option) {
                if (option == null) {
                    return this._textTrimming;
                }
                else {
                    if (option !== "ellipsis" && option !== "none") {
                        throw new Error(option + " - unsupported text trimming option.");
                    }
                    this._textTrimming = option;
                    return this;
                }
            };
            Wrapper.prototype.allowBreakingWords = function (allow) {
                if (allow == null) {
                    return this._allowBreakingWords;
                }
                else {
                    this._allowBreakingWords = allow;
                    return this;
                }
            };
            Wrapper.prototype.wrap = function (text, measurer, width, height) {
                var _this = this;
                if (height === void 0) { height = Infinity; }
                var initialWrappingResult = {
                    originalText: text,
                    wrappedText: "",
                    noLines: 0,
                    noBrokeWords: 0,
                    truncatedText: ""
                };
                var state = {
                    wrapping: initialWrappingResult,
                    currentLine: "",
                    availableWidth: width,
                    availableLines: Math.min(Math.floor(height / measurer.measure().height), this._maxLines),
                    canFitText: true
                };
                var lines = text.split("\n");
                return lines.reduce(function (state, line, i) { return _this.breakLineToFitWidth(state, line, i !== lines.length - 1, measurer); }, state).wrapping;
            };
            Wrapper.prototype.breakLineToFitWidth = function (state, line, hasNextLine, measurer) {
                var _this = this;
                if (!state.canFitText && state.wrapping.truncatedText !== "") {
                    state.wrapping.truncatedText += "\n";
                }
                var tokens = this._tokenizer.tokenize(line);
                state = tokens.reduce(function (state, token) { return _this.wrapNextToken(token, state, measurer); }, state);
                var wrappedText = SVGTypewriter.Utils.StringMethods.trimEnd(state.currentLine);
                state.wrapping.noLines += +(wrappedText !== "");
                if (state.wrapping.noLines === state.availableLines && this._textTrimming !== "none" && hasNextLine) {
                    var ellipsisResult = this.addEllipsis(wrappedText, state.availableWidth, measurer);
                    state.wrapping.wrappedText += ellipsisResult.wrappedToken;
                    state.wrapping.truncatedText += ellipsisResult.remainingToken;
                    state.canFitText = false;
                }
                else {
                    state.wrapping.wrappedText += wrappedText;
                }
                state.currentLine = "\n";
                return state;
            };
            Wrapper.prototype.canFitToken = function (token, width, measurer) {
                var _this = this;
                var possibleBreaks = this._allowBreakingWords ? token.split("").map(function (c, i) { return (i !== token.length - 1) ? c + _this._breakingCharacter : c; }) : [token];
                return (measurer.measure(token).width <= width) || possibleBreaks.every(function (c) { return measurer.measure(c).width <= width; });
            };
            Wrapper.prototype.addEllipsis = function (line, width, measurer) {
                if (this._textTrimming === "none") {
                    return {
                        wrappedToken: line,
                        remainingToken: ""
                    };
                }
                var truncatedLine = line.substring(0).trim();
                var lineWidth = measurer.measure(truncatedLine).width;
                var ellipsesWidth = measurer.measure("...").width;
                var prefix = (line.length > 0 && line[0] === "\n") ? "\n" : "";
                if (width <= ellipsesWidth) {
                    var periodWidth = ellipsesWidth / 3;
                    var numPeriodsThatFit = Math.floor(width / periodWidth);
                    return {
                        wrappedToken: prefix + "...".substr(0, numPeriodsThatFit),
                        remainingToken: line
                    };
                }
                while (lineWidth + ellipsesWidth > width) {
                    truncatedLine = SVGTypewriter.Utils.StringMethods.trimEnd(truncatedLine.substr(0, truncatedLine.length - 1));
                    lineWidth = measurer.measure(truncatedLine).width;
                }
                return {
                    wrappedToken: prefix + truncatedLine + "...",
                    remainingToken: SVGTypewriter.Utils.StringMethods.trimEnd(line.substring(truncatedLine.length), "-").trim()
                };
            };
            Wrapper.prototype.wrapNextToken = function (token, state, measurer) {
                if (!state.canFitText || state.availableLines === state.wrapping.noLines || !this.canFitToken(token, state.availableWidth, measurer)) {
                    return this.finishWrapping(token, state, measurer);
                }
                var remainingToken = token;
                while (remainingToken) {
                    var result = this.breakTokenToFitInWidth(remainingToken, state.currentLine, state.availableWidth, measurer);
                    state.currentLine = result.line;
                    remainingToken = result.remainingToken;
                    if (remainingToken != null) {
                        state.wrapping.noBrokeWords += +result.breakWord;
                        ++state.wrapping.noLines;
                        if (state.availableLines === state.wrapping.noLines) {
                            var ellipsisResult = this.addEllipsis(state.currentLine, state.availableWidth, measurer);
                            state.wrapping.wrappedText += ellipsisResult.wrappedToken;
                            state.wrapping.truncatedText += ellipsisResult.remainingToken + remainingToken;
                            state.currentLine = "\n";
                            return state;
                        }
                        else {
                            state.wrapping.wrappedText += SVGTypewriter.Utils.StringMethods.trimEnd(state.currentLine);
                            state.currentLine = "\n";
                        }
                    }
                }
                return state;
            };
            Wrapper.prototype.finishWrapping = function (token, state, measurer) {
                // Token is really long, but we have a space to put part of the word.
                if (state.canFitText && state.availableLines !== state.wrapping.noLines && this._allowBreakingWords && this._textTrimming !== "none") {
                    var res = this.addEllipsis(state.currentLine + token, state.availableWidth, measurer);
                    state.wrapping.wrappedText += res.wrappedToken;
                    state.wrapping.truncatedText += res.remainingToken;
                    state.wrapping.noBrokeWords += +(res.remainingToken.length < token.length);
                    state.wrapping.noLines += +(res.wrappedToken.length > 0);
                    state.currentLine = "";
                }
                else {
                    state.wrapping.truncatedText += token;
                }
                state.canFitText = false;
                return state;
            };
            /**
             * Breaks single token to fit current line.
             * If token contains only whitespaces then they will not be populated to next line.
             */
            Wrapper.prototype.breakTokenToFitInWidth = function (token, line, availableWidth, measurer, breakingCharacter) {
                if (breakingCharacter === void 0) { breakingCharacter = this._breakingCharacter; }
                if (measurer.measure(line + token).width <= availableWidth) {
                    return {
                        remainingToken: null,
                        line: line + token,
                        breakWord: false
                    };
                }
                if (token.trim() === "") {
                    return {
                        remainingToken: "",
                        line: line,
                        breakWord: false
                    };
                }
                if (!this._allowBreakingWords) {
                    return {
                        remainingToken: token,
                        line: line,
                        breakWord: false
                    };
                }
                var fitTokenLength = 0;
                while (fitTokenLength < token.length) {
                    if (measurer.measure(line + token.substring(0, fitTokenLength + 1) + breakingCharacter).width <= availableWidth) {
                        ++fitTokenLength;
                    }
                    else {
                        break;
                    }
                }
                var suffix = "";
                if (fitTokenLength > 0) {
                    suffix = breakingCharacter;
                }
                return {
                    remainingToken: token.substring(fitTokenLength),
                    line: line + token.substring(0, fitTokenLength) + suffix,
                    breakWord: fitTokenLength > 0
                };
            };
            return Wrapper;
        })();
        Wrappers.Wrapper = Wrapper;
    })(Wrappers = SVGTypewriter.Wrappers || (SVGTypewriter.Wrappers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVGTypewriter;
(function (SVGTypewriter) {
    var Wrappers;
    (function (Wrappers) {
        var SingleLineWrapper = (function (_super) {
            __extends(SingleLineWrapper, _super);
            function SingleLineWrapper() {
                _super.apply(this, arguments);
            }
            SingleLineWrapper.prototype.wrap = function (text, measurer, width, height) {
                var _this = this;
                if (height === void 0) { height = Infinity; }
                var lines = text.split("\n");
                if (lines.length > 1) {
                    throw new Error("SingleLineWrapper is designed to work only on single line");
                }
                var wrapFN = function (w) { return _super.prototype.wrap.call(_this, text, measurer, w, height); };
                var result = wrapFN(width);
                if (result.noLines < 2) {
                    return result;
                }
                var left = 0;
                var right = width;
                for (var i = 0; i < SingleLineWrapper.NO_WRAP_ITERATIONS && right > left; ++i) {
                    var currentWidth = (right + left) / 2;
                    var currentResult = wrapFN(currentWidth);
                    if (this.areSameResults(result, currentResult)) {
                        right = currentWidth;
                        result = currentResult;
                    }
                    else {
                        left = currentWidth;
                    }
                }
                return result;
            };
            SingleLineWrapper.prototype.areSameResults = function (one, two) {
                return one.noLines === two.noLines && one.truncatedText === two.truncatedText;
            };
            SingleLineWrapper.NO_WRAP_ITERATIONS = 5;
            return SingleLineWrapper;
        })(Wrappers.Wrapper);
        Wrappers.SingleLineWrapper = SingleLineWrapper;
    })(Wrappers = SVGTypewriter.Wrappers || (SVGTypewriter.Wrappers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Writers;
    (function (Writers) {
        var Writer = (function () {
            function Writer(measurer, wrapper) {
                this._writerID = Writer.nextID++;
                this._elementID = 0;
                this.measurer(measurer);
                if (wrapper) {
                    this.wrapper(wrapper);
                }
                this.addTitleElement(false);
            }
            Writer.prototype.measurer = function (newMeasurer) {
                this._measurer = newMeasurer;
                return this;
            };
            Writer.prototype.wrapper = function (newWrapper) {
                this._wrapper = newWrapper;
                return this;
            };
            Writer.prototype.addTitleElement = function (add) {
                this._addTitleElement = add;
                return this;
            };
            Writer.prototype.writeLine = function (line, g, width, xAlign, yOffset) {
                var textEl = g.append("text");
                textEl.text(line);
                var xOffset = width * Writer.XOffsetFactor[xAlign];
                var anchor = Writer.AnchorConverter[xAlign];
                textEl.attr("text-anchor", anchor).classed("text-line", true);
                SVGTypewriter.Utils.DOM.transform(textEl, xOffset, yOffset).attr("y", "-0.25em");
                ;
            };
            Writer.prototype.writeText = function (text, writingArea, width, height, xAlign, yAlign) {
                var _this = this;
                var lines = text.split("\n");
                var lineHeight = this._measurer.measure().height;
                var yOffset = Writer.YOffsetFactor[yAlign] * (height - lines.length * lineHeight);
                lines.forEach(function (line, i) {
                    _this.writeLine(line, writingArea, width, xAlign, (i + 1) * lineHeight + yOffset);
                });
            };
            Writer.prototype.write = function (text, width, height, options) {
                if (Writer.SupportedRotation.indexOf(options.textRotation) === -1) {
                    throw new Error("unsupported rotation - " + options.textRotation);
                }
                var orientHorizontally = Math.abs(Math.abs(options.textRotation) - 90) > 45;
                var primaryDimension = orientHorizontally ? width : height;
                var secondaryDimension = orientHorizontally ? height : width;
                var textContainer = options.selection.append("g").classed("text-container", true);
                if (this._addTitleElement) {
                    textContainer.append("title").text(text);
                }
                var textArea = textContainer.append("g").classed("text-area", true);
                var wrappedText = this._wrapper ? this._wrapper.wrap(text, this._measurer, primaryDimension, secondaryDimension).wrappedText : text;
                this.writeText(wrappedText, textArea, primaryDimension, secondaryDimension, options.xAlign, options.yAlign);
                var xForm = d3.transform("");
                var xForm2 = d3.transform("");
                xForm.rotate = options.textRotation;
                switch (options.textRotation) {
                    case 90:
                        xForm.translate = [width, 0];
                        xForm2.rotate = -90;
                        xForm2.translate = [0, 200];
                        break;
                    case -90:
                        xForm.translate = [0, height];
                        xForm2.rotate = 90;
                        xForm2.translate = [width, 0];
                        break;
                    case 180:
                        xForm.translate = [width, height];
                        xForm2.translate = [width, height];
                        xForm2.rotate = 180;
                        break;
                }
                textArea.attr("transform", xForm.toString());
                this.addClipPath(textContainer, xForm2);
                if (options.animator) {
                    options.animator.animate(textContainer);
                }
            };
            Writer.prototype.addClipPath = function (selection, transform) {
                var elementID = this._elementID++;
                var prefix = /MSIE [5-9]/.test(navigator.userAgent) ? "" : document.location.href;
                prefix = prefix.split("#")[0]; // To fix cases where an anchor tag was used
                var clipPathID = "clipPath" + this._writerID + "_" + elementID;
                selection.select(".text-area").attr("clip-path", "url(\"" + prefix + "#" + clipPathID + "\")");
                var clipPathParent = selection.append("clipPath").attr("id", clipPathID);
                var bboxAttrs = SVGTypewriter.Utils.DOM.getBBox(selection.select(".text-area"));
                var box = clipPathParent.append("rect");
                box.classed("clip-rect", true).attr({
                    x: bboxAttrs.x,
                    y: bboxAttrs.y,
                    width: bboxAttrs.width,
                    height: bboxAttrs.height
                });
            };
            Writer.nextID = 0;
            Writer.SupportedRotation = [-90, 0, 180, 90];
            Writer.AnchorConverter = {
                left: "start",
                center: "middle",
                right: "end"
            };
            Writer.XOffsetFactor = {
                left: 0,
                center: 0.5,
                right: 1
            };
            Writer.YOffsetFactor = {
                top: 0,
                center: 0.5,
                bottom: 1
            };
            return Writer;
        })();
        Writers.Writer = Writer;
    })(Writers = SVGTypewriter.Writers || (SVGTypewriter.Writers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    var Measurers;
    (function (Measurers) {
        ;
        var AbstractMeasurer = (function () {
            function AbstractMeasurer(area, className) {
                this.textMeasurer = this.getTextMeasurer(area, className);
            }
            AbstractMeasurer.prototype.checkSelectionIsText = function (d) {
                return d[0][0].tagName === "text" || !d.select("text").empty();
            };
            AbstractMeasurer.prototype.getTextMeasurer = function (area, className) {
                var _this = this;
                if (!this.checkSelectionIsText(area)) {
                    var textElement = area.append("text");
                    if (className) {
                        textElement.classed(className, true);
                    }
                    textElement.remove();
                    return function (text) {
                        area.node().appendChild(textElement.node());
                        var areaDimension = _this.measureBBox(textElement, text);
                        textElement.remove();
                        return areaDimension;
                    };
                }
                else {
                    var parentNode = area.node().parentNode;
                    var textSelection;
                    if (area[0][0].tagName === "text") {
                        textSelection = area;
                    }
                    else {
                        textSelection = area.select("text");
                    }
                    area.remove();
                    return function (text) {
                        parentNode.appendChild(area.node());
                        var areaDimension = _this.measureBBox(textSelection, text);
                        area.remove();
                        return areaDimension;
                    };
                }
            };
            AbstractMeasurer.prototype.measureBBox = function (d, text) {
                d.text(text);
                var bb = SVGTypewriter.Utils.DOM.getBBox(d);
                return { width: bb.width, height: bb.height };
            };
            AbstractMeasurer.prototype.measure = function (text) {
                if (text === void 0) { text = AbstractMeasurer.HEIGHT_TEXT; }
                return this.textMeasurer(text);
            };
            AbstractMeasurer.HEIGHT_TEXT = "bqpdl";
            return AbstractMeasurer;
        })();
        Measurers.AbstractMeasurer = AbstractMeasurer;
    })(Measurers = SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVGTypewriter;
(function (SVGTypewriter) {
    var Measurers;
    (function (Measurers) {
        var Measurer = (function (_super) {
            __extends(Measurer, _super);
            function Measurer(area, className, useGuards) {
                if (className === void 0) { className = null; }
                if (useGuards === void 0) { useGuards = false; }
                _super.call(this, area, className);
                this.useGuards = useGuards;
            }
            // Guards assures same line height and width of whitespaces on both ends.
            Measurer.prototype._addGuards = function (text) {
                return Measurers.AbstractMeasurer.HEIGHT_TEXT + text + Measurers.AbstractMeasurer.HEIGHT_TEXT;
            };
            Measurer.prototype.getGuardWidth = function () {
                if (this.guardWidth == null) {
                    this.guardWidth = _super.prototype.measure.call(this).width;
                }
                return this.guardWidth;
            };
            Measurer.prototype._measureLine = function (line) {
                var measuredLine = this.useGuards ? this._addGuards(line) : line;
                var measuredLineDimensions = _super.prototype.measure.call(this, measuredLine);
                measuredLineDimensions.width -= this.useGuards ? (2 * this.getGuardWidth()) : 0;
                return measuredLineDimensions;
            };
            Measurer.prototype.measure = function (text) {
                var _this = this;
                if (text === void 0) { text = Measurers.AbstractMeasurer.HEIGHT_TEXT; }
                if (text.trim() === "") {
                    return { width: 0, height: 0 };
                }
                var linesDimensions = text.trim().split("\n").map(function (line) { return _this._measureLine(line); });
                return {
                    width: d3.max(linesDimensions, function (dim) { return dim.width; }),
                    height: d3.sum(linesDimensions, function (dim) { return dim.height; })
                };
            };
            return Measurer;
        })(Measurers.AbstractMeasurer);
        Measurers.Measurer = Measurer;
    })(Measurers = SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVGTypewriter;
(function (SVGTypewriter) {
    var Measurers;
    (function (Measurers) {
        var CharacterMeasurer = (function (_super) {
            __extends(CharacterMeasurer, _super);
            function CharacterMeasurer() {
                _super.apply(this, arguments);
            }
            CharacterMeasurer.prototype._measureCharacter = function (c) {
                return _super.prototype._measureLine.call(this, c);
            };
            CharacterMeasurer.prototype._measureLine = function (line) {
                var _this = this;
                var charactersDimensions = line.split("").map(function (c) { return _this._measureCharacter(c); });
                return {
                    width: d3.sum(charactersDimensions, function (dim) { return dim.width; }),
                    height: d3.max(charactersDimensions, function (dim) { return dim.height; })
                };
            };
            return CharacterMeasurer;
        })(Measurers.Measurer);
        Measurers.CharacterMeasurer = CharacterMeasurer;
    })(Measurers = SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SVGTypewriter;
(function (SVGTypewriter) {
    var Measurers;
    (function (Measurers) {
        var CacheCharacterMeasurer = (function (_super) {
            __extends(CacheCharacterMeasurer, _super);
            function CacheCharacterMeasurer(area, className) {
                var _this = this;
                _super.call(this, area, className);
                this.cache = new SVGTypewriter.Utils.Cache(function (c) { return _this._measureCharacterNotFromCache(c); }, SVGTypewriter.Utils.Methods.objEq);
            }
            CacheCharacterMeasurer.prototype._measureCharacterNotFromCache = function (c) {
                return _super.prototype._measureCharacter.call(this, c);
            };
            CacheCharacterMeasurer.prototype._measureCharacter = function (c) {
                return this.cache.get(c);
            };
            CacheCharacterMeasurer.prototype.reset = function () {
                this.cache.clear();
            };
            return CacheCharacterMeasurer;
        })(Measurers.CharacterMeasurer);
        Measurers.CacheCharacterMeasurer = CacheCharacterMeasurer;
    })(Measurers = SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
})(SVGTypewriter || (SVGTypewriter = {}));

return Plottable;
}));
