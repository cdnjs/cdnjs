/*!
Plottable 0.54.0 (https://github.com/palantir/plottable)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
*/

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
        var Methods;
        (function (Methods) {
            /**
             * Checks if x is between a and b.
             *
             * @param {number} x The value to test if in range
             * @param {number} a The beginning of the (inclusive) range
             * @param {number} b The ending of the (inclusive) range
             * @return {boolean} Whether x is in [a, b]
             */
            function inRange(x, a, b) {
                return (Math.min(a, b) <= x && x <= Math.max(a, b));
            }
            Methods.inRange = inRange;
            /**
             * Clamps x to the range [min, max].
             *
             * @param {number} x The value to be clamped.
             * @param {number} min The minimum value.
             * @param {number} max The maximum value.
             * @return {number} A clamped value in the range [min, max].
             */
            function clamp(x, min, max) {
                return Math.min(Math.max(min, x), max);
            }
            Methods.clamp = clamp;
            /** Print a warning message to the console, if it is available.
             *
             * @param {string} The warnings to print
             */
            function warn(warning) {
                if (!Plottable.Config.SHOW_WARNINGS) {
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
            Methods.warn = warn;
            /**
             * Takes two arrays of numbers and adds them together
             *
             * @param {number[]} alist The first array of numbers
             * @param {number[]} blist The second array of numbers
             * @return {number[]} An array of numbers where x[i] = alist[i] + blist[i]
             */
            function addArrays(alist, blist) {
                if (alist.length !== blist.length) {
                    throw new Error("attempted to add arrays of unequal length");
                }
                return alist.map(function (_, i) { return alist[i] + blist[i]; });
            }
            Methods.addArrays = addArrays;
            /**
             * Takes two sets and returns the intersection
             *
             * Due to the fact that D3.Sets store strings internally, return type is always a string set
             *
             * @param {D3.Set<T>} set1 The first set
             * @param {D3.Set<T>} set2 The second set
             * @return {D3.Set<string>} A set that contains elements that appear in both set1 and set2
             */
            function intersection(set1, set2) {
                var set = d3.set();
                set1.forEach(function (v) {
                    if (set2.has(v)) {
                        set.add(v);
                    }
                });
                return set;
            }
            Methods.intersection = intersection;
            /**
             * Take an accessor object (may be a string to be made into a key, or a value, or a color code)
             * and "activate" it by turning it into a function in (datum, index, metadata)
             */
            function accessorize(accessor) {
                if (typeof (accessor) === "function") {
                    return accessor;
                }
                else if (typeof (accessor) === "string" && accessor[0] !== "#") {
                    return function (d, i, s) { return d[accessor]; };
                }
                else {
                    return function (d, i, s) { return accessor; };
                }
                ;
            }
            Methods.accessorize = accessorize;
            /**
             * Takes two sets and returns the union
             *
             * Due to the fact that D3.Sets store strings internally, return type is always a string set
             *
             * @param {D3.Set<T>} set1 The first set
             * @param {D3.Set<T>} set2 The second set
             * @return {D3.Set<string>} A set that contains elements that appear in either set1 or set2
             */
            function union(set1, set2) {
                var set = d3.set();
                set1.forEach(function (v) { return set.add(v); });
                set2.forEach(function (v) { return set.add(v); });
                return set;
            }
            Methods.union = union;
            /**
             * Populates a map from an array of keys and a transformation function.
             *
             * @param {string[]} keys The array of keys.
             * @param {(string, number) => T} transform A transformation function to apply to the keys.
             * @return {D3.Map<T>} A map mapping keys to their transformed values.
             */
            function populateMap(keys, transform) {
                var map = d3.map();
                keys.forEach(function (key, i) {
                    map.set(key, transform(key, i));
                });
                return map;
            }
            Methods.populateMap = populateMap;
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
                    if (!seen.has(x)) {
                        seen.add(x);
                        result.push(x);
                    }
                });
                return result;
            }
            Methods.uniq = uniq;
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
            Methods.createFilledArray = createFilledArray;
            /**
             * @param {T[][]} a The 2D array that will have its elements joined together.
             * @return {T[]} Every array in a, concatenated together in the order they appear.
             */
            function flatten(a) {
                return Array.prototype.concat.apply([], a);
            }
            Methods.flatten = flatten;
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
            function max(arr, one, two) {
                if (arr.length === 0) {
                    if (typeof (one) !== "function") {
                        return one;
                    }
                    else {
                        return two;
                    }
                }
                /* tslint:disable:ban */
                var acc = typeof (one) === "function" ? one : typeof (two) === "function" ? two : undefined;
                return acc === undefined ? d3.max(arr) : d3.max(arr, acc);
                /* tslint:enable:ban */
            }
            Methods.max = max;
            function min(arr, one, two) {
                if (arr.length === 0) {
                    if (typeof (one) !== "function") {
                        return one;
                    }
                    else {
                        return two;
                    }
                }
                /* tslint:disable:ban */
                var acc = typeof (one) === "function" ? one : typeof (two) === "function" ? two : undefined;
                return acc === undefined ? d3.min(arr) : d3.min(arr, acc);
                /* tslint:enable:ban */
            }
            Methods.min = min;
            /**
             * Returns true **only** if x is NaN
             */
            function isNaN(n) {
                return n !== n;
            }
            Methods.isNaN = isNaN;
            /**
             * Returns true if the argument is a number, which is not NaN
             * Numbers represented as strings do not pass this function
             */
            function isValidNumber(n) {
                return typeof n === "number" && !Plottable._Util.Methods.isNaN(n) && isFinite(n);
            }
            Methods.isValidNumber = isValidNumber;
            /**
             * Creates shallow copy of map.
             * @param {{ [key: string]: any }} oldMap Map to copy
             *
             * @returns {[{ [key: string]: any }} coppied map.
             */
            function copyMap(oldMap) {
                var newMap = {};
                d3.keys(oldMap).forEach(function (key) { return newMap[key] = oldMap[key]; });
                return newMap;
            }
            Methods.copyMap = copyMap;
            function range(start, stop, step) {
                if (step === void 0) { step = 1; }
                if (step === 0) {
                    throw new Error("step cannot be 0");
                }
                var length = Math.max(Math.ceil((stop - start) / step), 0);
                var range = [];
                for (var i = 0; i < length; ++i) {
                    range[i] = start + step * i;
                }
                return range;
            }
            Methods.range = range;
            /** Is like setTimeout, but activates synchronously if time=0
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
            Methods.setTimeout = setTimeout;
            function colorTest(colorTester, className) {
                colorTester.classed(className, true);
                // Use regex to get the text inside the rgb parentheses
                var colorStyle = colorTester.style("background-color");
                if (colorStyle === "transparent") {
                    return null;
                }
                var rgb = /\((.+)\)/.exec(colorStyle)[1].split(",").map(function (colorValue) {
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
            Methods.colorTest = colorTest;
            function lightenColor(color, factor) {
                var hsl = d3.hsl(color).brighter(factor);
                return hsl.rgb().toString();
            }
            Methods.lightenColor = lightenColor;
            function distanceSquared(p1, p2) {
                return Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2);
            }
            Methods.distanceSquared = distanceSquared;
            function isIE() {
                var userAgent = window.navigator.userAgent;
                return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
            }
            Methods.isIE = isIE;
            /**
             * Returns true if the supplied coordinates or Extents intersect or are contained by bbox.
             *
             * @param {number | Extent} xValOrExtent The x coordinate or Extent to test
             * @param {number | Extent} yValOrExtent The y coordinate or Extent to test
             * @param {SVGRect} bbox The bbox
             * @param {number} tolerance Amount by which to expand bbox, in each dimension, before
             * testing intersection
             *
             * @returns {boolean} True if the supplied coordinates or Extents intersect or are
             * contained by bbox, false otherwise.
             */
            function intersectsBBox(xValOrExtent, yValOrExtent, bbox, tolerance) {
                if (tolerance === void 0) { tolerance = 0.5; }
                var xExtent = parseExtent(xValOrExtent);
                var yExtent = parseExtent(yValOrExtent);
                // SVGRects are positioned with sub-pixel accuracy (the default unit
                // for the x, y, height & width attributes), but user selections (e.g. via
                // mouse events) usually have pixel accuracy. A tolerance of half-a-pixel
                // seems appropriate.
                return bbox.x + bbox.width >= xExtent.min - tolerance && bbox.x <= xExtent.max + tolerance && bbox.y + bbox.height >= yExtent.min - tolerance && bbox.y <= yExtent.max + tolerance;
            }
            Methods.intersectsBBox = intersectsBBox;
            /**
             * Create an Extent from a number or an object with "min" and "max" defined.
             *
             * @param {any} input The object to parse
             *
             * @returns {Extent} The generated Extent
             */
            function parseExtent(input) {
                if (typeof (input) === "number") {
                    return { min: input, max: input };
                }
                else if (input instanceof Object && "min" in input && "max" in input) {
                    return input;
                }
                else {
                    throw new Error("input '" + input + "' can't be parsed as an Extent");
                }
            }
            Methods.parseExtent = parseExtent;
        })(Methods = _Util.Methods || (_Util.Methods = {}));
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
// This file contains open source utilities, along with their copyright notices
var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
        var OpenSource;
        (function (OpenSource) {
            function sortedIndex(val, arr, accessor) {
                var low = 0;
                var high = arr.length;
                while (low < high) {
                    /* tslint:disable:no-bitwise */
                    var mid = (low + high) >>> 1;
                    /* tslint:enable:no-bitwise */
                    var x = accessor == null ? arr[mid] : accessor(arr[mid]);
                    if (x < val) {
                        low = mid + 1;
                    }
                    else {
                        high = mid;
                    }
                }
                return low;
            }
            OpenSource.sortedIndex = sortedIndex;
            ;
        })(OpenSource = _Util.OpenSource || (_Util.OpenSource = {}));
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
        /**
         * An associative array that can be keyed by anything (inc objects).
         * Uses pointer equality checks which is why this works.
         * This power has a price: everything is linear time since it is actually backed by an array...
         */
        var StrictEqualityAssociativeArray = (function () {
            function StrictEqualityAssociativeArray() {
                this._keyValuePairs = [];
            }
            /**
             * Set a new key/value pair in the store.
             *
             * @param {any} key Key to set in the store
             * @param {any} value Value to set in the store
             * @return {boolean} True if key already in store, false otherwise
             */
            StrictEqualityAssociativeArray.prototype.set = function (key, value) {
                if (key !== key) {
                    throw new Error("NaN may not be used as a key to the StrictEqualityAssociativeArray");
                }
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i][0] === key) {
                        this._keyValuePairs[i][1] = value;
                        return true;
                    }
                }
                this._keyValuePairs.push([key, value]);
                return false;
            };
            /**
             * Get a value from the store, given a key.
             *
             * @param {any} key Key associated with value to retrieve
             * @return {any} Value if found, undefined otherwise
             */
            StrictEqualityAssociativeArray.prototype.get = function (key) {
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i][0] === key) {
                        return this._keyValuePairs[i][1];
                    }
                }
                return undefined;
            };
            /**
             * Test whether store has a value associated with given key.
             *
             * Will return true if there is a key/value entry,
             * even if the value is explicitly `undefined`.
             *
             * @param {any} key Key to test for presence of an entry
             * @return {boolean} Whether there was a matching entry for that key
             */
            StrictEqualityAssociativeArray.prototype.has = function (key) {
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i][0] === key) {
                        return true;
                    }
                }
                return false;
            };
            /**
             * Return an array of the values in the key-value store
             *
             * @return {any[]} The values in the store
             */
            StrictEqualityAssociativeArray.prototype.values = function () {
                return this._keyValuePairs.map(function (x) { return x[1]; });
            };
            /**
             * Return an array of keys in the key-value store
             *
             * @return {any[]} The keys in the store
             */
            StrictEqualityAssociativeArray.prototype.keys = function () {
                return this._keyValuePairs.map(function (x) { return x[0]; });
            };
            /**
             * Execute a callback for each entry in the array.
             *
             * @param {(key: any, val?: any, index?: number) => any} callback The callback to eecute
             * @return {any[]} The results of mapping the callback over the entries
             */
            StrictEqualityAssociativeArray.prototype.map = function (cb) {
                return this._keyValuePairs.map(function (kv, index) {
                    return cb(kv[0], kv[1], index);
                });
            };
            /**
             * Delete a key from the key-value store. Return whether the key was present.
             *
             * @param {any} The key to remove
             * @return {boolean} Whether a matching entry was found and removed
             */
            StrictEqualityAssociativeArray.prototype.delete = function (key) {
                for (var i = 0; i < this._keyValuePairs.length; i++) {
                    if (this._keyValuePairs[i][0] === key) {
                        this._keyValuePairs.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            return StrictEqualityAssociativeArray;
        })();
        _Util.StrictEqualityAssociativeArray = StrictEqualityAssociativeArray;
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
        var DOM;
        (function (DOM) {
            /**
             * Gets the bounding box of an element.
             * @param {D3.Selection} element
             * @returns {SVGRed} The bounding box.
             */
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
            DOM.POLYFILL_TIMEOUT_MSEC = 1000 / 60; // 60 fps
            function requestAnimationFramePolyfill(fn) {
                if (window.requestAnimationFrame != null) {
                    window.requestAnimationFrame(fn);
                }
                else {
                    setTimeout(fn, DOM.POLYFILL_TIMEOUT_MSEC);
                }
            }
            DOM.requestAnimationFramePolyfill = requestAnimationFramePolyfill;
            function getParsedStyleValue(style, prop) {
                var value = style.getPropertyValue(prop);
                var parsedValue = parseFloat(value);
                if (parsedValue !== parsedValue) {
                    return 0;
                }
                return parsedValue;
            }
            function isSelectionRemovedFromSVG(selection) {
                var n = selection.node();
                while (n !== null && n.nodeName.toLowerCase() !== "svg") {
                    n = n.parentNode;
                }
                return (n == null);
            }
            DOM.isSelectionRemovedFromSVG = isSelectionRemovedFromSVG;
            function getElementWidth(elem) {
                var style = window.getComputedStyle(elem);
                return getParsedStyleValue(style, "width") + getParsedStyleValue(style, "padding-left") + getParsedStyleValue(style, "padding-right") + getParsedStyleValue(style, "border-left-width") + getParsedStyleValue(style, "border-right-width");
            }
            DOM.getElementWidth = getElementWidth;
            function getElementHeight(elem) {
                var style = window.getComputedStyle(elem);
                return getParsedStyleValue(style, "height") + getParsedStyleValue(style, "padding-top") + getParsedStyleValue(style, "padding-bottom") + getParsedStyleValue(style, "border-top-width") + getParsedStyleValue(style, "border-bottom-width");
            }
            DOM.getElementHeight = getElementHeight;
            function getSVGPixelWidth(svg) {
                var width = svg.node().clientWidth;
                if (width === 0) {
                    var widthAttr = svg.attr("width");
                    if (widthAttr.indexOf("%") !== -1) {
                        var ancestorNode = svg.node().parentNode;
                        while (ancestorNode != null && ancestorNode.clientWidth === 0) {
                            ancestorNode = ancestorNode.parentNode;
                        }
                        if (ancestorNode == null) {
                            throw new Error("Could not compute width of element");
                        }
                        width = ancestorNode.clientWidth * parseFloat(widthAttr) / 100;
                    }
                    else {
                        width = parseFloat(widthAttr);
                    }
                }
                return width;
            }
            DOM.getSVGPixelWidth = getSVGPixelWidth;
            function translate(s, x, y) {
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
            DOM.translate = translate;
            function boxesOverlap(boxA, boxB) {
                if (boxA.right < boxB.left) {
                    return false;
                }
                if (boxA.left > boxB.right) {
                    return false;
                }
                if (boxA.bottom < boxB.top) {
                    return false;
                }
                if (boxA.top > boxB.bottom) {
                    return false;
                }
                return true;
            }
            DOM.boxesOverlap = boxesOverlap;
            function boxIsInside(inner, outer) {
                return (Math.floor(outer.left) <= Math.ceil(inner.left) && Math.floor(outer.top) <= Math.ceil(inner.top) && Math.floor(inner.right) <= Math.ceil(outer.right) && Math.floor(inner.bottom) <= Math.ceil(outer.bottom));
            }
            DOM.boxIsInside = boxIsInside;
            function getBoundingSVG(elem) {
                var ownerSVG = elem.ownerSVGElement;
                if (ownerSVG != null) {
                    return ownerSVG;
                }
                if (elem.nodeName.toLowerCase() === "svg") {
                    return elem;
                }
                return null; // not in the DOM
            }
            DOM.getBoundingSVG = getBoundingSVG;
        })(DOM = _Util.DOM || (_Util.DOM = {}));
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
        var Color;
        (function (Color) {
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
                    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
                };
                var r = lum(rgb.r);
                var g = lum(rgb.g);
                var b = lum(rgb.b);
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            }
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
        })(Color = _Util.Color || (_Util.Color = {}));
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    Plottable.MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
    var Formatters;
    (function (Formatters) {
        /**
         * Creates a formatter for currency values.
         *
         * @param {number} [precision] The number of decimal places to show (default 2).
         * @param {string} [symbol] The currency symbol to use (default "$").
         * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
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
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
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
         * [precision] decimal places. All other values are stringified.
         *
         * @param {number} [precision] The number of decimal places to show (default 3).
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
         *
         * @returns {Formatter} A formatter for general values.
         */
        function general(precision) {
            if (precision === void 0) { precision = 3; }
            verifyPrecision(precision);
            return function (d) {
                if (typeof d === "number") {
                    var multiplier = Math.pow(10, precision);
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
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
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
         * Creates a formatter for values that displays [precision] significant figures
         * and puts SI notation.
         *
         * @param {number} [precision] The number of significant figures to show (default 3).
         *
         * @returns {Formatter} A formatter for SI values.
         */
        function siSuffix(precision) {
            if (precision === void 0) { precision = 3; }
            verifyPrecision(precision);
            return function (d) { return d3.format("." + precision + "s")(d); };
        }
        Formatters.siSuffix = siSuffix;
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
        }
    })(Formatters = Plottable.Formatters || (Plottable.Formatters = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var SymbolFactories;
    (function (SymbolFactories) {
        function circle() {
            return function (symbolSize) { return d3.svg.symbol().type("circle").size(Math.PI * Math.pow(symbolSize / 2, 2))(); };
        }
        SymbolFactories.circle = circle;
        function square() {
            return function (symbolSize) { return d3.svg.symbol().type("square").size(Math.pow(symbolSize, 2))(); };
        }
        SymbolFactories.square = square;
        function cross() {
            return function (symbolSize) { return d3.svg.symbol().type("cross").size((5 / 9) * Math.pow(symbolSize, 2))(); };
        }
        SymbolFactories.cross = cross;
        function diamond() {
            return function (symbolSize) { return d3.svg.symbol().type("diamond").size(Math.tan(Math.PI / 6) * Math.pow(symbolSize, 2) / 2)(); };
        }
        SymbolFactories.diamond = diamond;
        function triangleUp() {
            return function (symbolSize) { return d3.svg.symbol().type("triangle-up").size(Math.sqrt(3) * Math.pow(symbolSize / 2, 2))(); };
        }
        SymbolFactories.triangleUp = triangleUp;
        function triangleDown() {
            return function (symbolSize) { return d3.svg.symbol().type("triangle-down").size(Math.sqrt(3) * Math.pow(symbolSize / 2, 2))(); };
        }
        SymbolFactories.triangleDown = triangleDown;
    })(SymbolFactories = Plottable.SymbolFactories || (Plottable.SymbolFactories = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
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
            ClientToSVGTranslator.getTranslator = function (elem) {
                var svg = _Util.DOM.getBoundingSVG(elem);
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
            ClientToSVGTranslator._TRANSLATOR_KEY = "__Plottable_ClientToSVGTranslator";
            return ClientToSVGTranslator;
        })();
        _Util.ClientToSVGTranslator = ClientToSVGTranslator;
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Config;
    (function (Config) {
        /**
         * Specifies if Plottable should show warnings.
         */
        Config.SHOW_WARNINGS = true;
    })(Config = Plottable.Config || (Plottable.Config = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    Plottable.version = "0.54.0";
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Core;
    (function (Core) {
        /**
         * Colors we use as defaults on a number of graphs.
         */
        var Colors = (function () {
            function Colors() {
            }
            Colors.CORAL_RED = "#fd373e";
            Colors.INDIGO = "#5279c7";
            Colors.ROBINS_EGG_BLUE = "#06cccc";
            Colors.FERN = "#63c261";
            Colors.BURNING_ORANGE = "#ff7939";
            Colors.ROYAL_HEATH = "#962565";
            Colors.CONIFER = "#99ce50";
            Colors.CERISE_RED = "#db2e65";
            Colors.BRIGHT_SUN = "#fad419";
            Colors.JACARTA = "#2c2b6f";
            Colors.PLOTTABLE_COLORS = [
                Colors.INDIGO,
                Colors.CORAL_RED,
                Colors.FERN,
                Colors.BRIGHT_SUN,
                Colors.JACARTA,
                Colors.BURNING_ORANGE,
                Colors.CERISE_RED,
                Colors.CONIFER,
                Colors.ROYAL_HEATH,
                Colors.ROBINS_EGG_BLUE,
            ];
            return Colors;
        })();
        Core.Colors = Colors;
    })(Core = Plottable.Core || (Plottable.Core = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Core;
    (function (Core) {
        /**
         * A class most other Plottable classes inherit from, in order to have a
         * unique ID.
         */
        var PlottableObject = (function () {
            function PlottableObject() {
                this._plottableID = PlottableObject._nextID++;
            }
            PlottableObject.prototype.getID = function () {
                return this._plottableID;
            };
            PlottableObject._nextID = 0;
            return PlottableObject;
        })();
        Core.PlottableObject = PlottableObject;
    })(Core = Plottable.Core || (Plottable.Core = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Core;
    (function (Core) {
        /**
         * The Broadcaster holds a reference to a "listenable" object.
         * Third parties can register and deregister listeners from the Broadcaster.
         * When the broadcaster.broadcast() method is called, all registered callbacks
         * are called with the Broadcaster's "listenable", along with optional
         * arguments passed to the `broadcast` method.
         *
         * The listeners are called synchronously.
         */
        var Broadcaster = (function (_super) {
            __extends(Broadcaster, _super);
            /**
             * Constructs a broadcaster, taking a "listenable" object to broadcast about.
             *
             * @constructor
             * @param {L} listenable The listenable object to broadcast.
             */
            function Broadcaster(listenable) {
                _super.call(this);
                this._key2callback = new Plottable._Util.StrictEqualityAssociativeArray();
                this._listenable = listenable;
            }
            /**
             * Registers a callback to be called when the broadcast method is called. Also takes a key which
             * is used to support deregistering the same callback later, by passing in the same key.
             * If there is already a callback associated with that key, then the callback will be replaced.
             * The callback will be passed the Broadcaster's "listenable" as the `this` context.
             *
             * @param key The key associated with the callback. Key uniqueness is determined by deep equality.
             * @param {BroadcasterCallback<L>} callback A callback to be called.
             * @returns {Broadcaster} The calling Broadcaster
             */
            Broadcaster.prototype.registerListener = function (key, callback) {
                this._key2callback.set(key, callback);
                return this;
            };
            /**
             * Call all listening callbacks, optionally with arguments passed through.
             *
             * @param ...args A variable number of optional arguments
             * @returns {Broadcaster} The calling Broadcaster
             */
            Broadcaster.prototype.broadcast = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                args.unshift(this._listenable);
                this._key2callback.values().forEach(function (callback) {
                    callback.apply(_this._listenable, args);
                });
                return this;
            };
            /**
             * Deregisters the callback associated with a key.
             *
             * @param key The key to deregister.
             * @returns {Broadcaster} The calling Broadcaster
             */
            Broadcaster.prototype.deregisterListener = function (key) {
                this._key2callback.delete(key);
                return this;
            };
            /**
             * Gets the keys for all listeners attached to the Broadcaster.
             *
             * @returns {any[]} An array of the keys.
             */
            Broadcaster.prototype.getListenerKeys = function () {
                return this._key2callback.keys();
            };
            /**
             * Deregisters all listeners and callbacks associated with the Broadcaster.
             *
             * @returns {Broadcaster} The calling Broadcaster
             */
            Broadcaster.prototype.deregisterAllListeners = function () {
                this._key2callback = new Plottable._Util.StrictEqualityAssociativeArray();
            };
            return Broadcaster;
        })(Core.PlottableObject);
        Core.Broadcaster = Broadcaster;
    })(Core = Plottable.Core || (Plottable.Core = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Dataset = (function (_super) {
        __extends(Dataset, _super);
        /**
         * Constructs a new set.
         *
         * A Dataset is mostly just a wrapper around an any[], Dataset is the
         * data you're going to plot.
         *
         * @constructor
         * @param {any[]} data The data for this DataSource (default = []).
         * @param {any} metadata An object containing additional information (default = {}).
         */
        function Dataset(data, metadata) {
            if (data === void 0) { data = []; }
            if (metadata === void 0) { metadata = {}; }
            _super.call(this);
            this._data = data;
            this._metadata = metadata;
            this._accessor2cachedExtent = new Plottable._Util.StrictEqualityAssociativeArray();
            this.broadcaster = new Plottable.Core.Broadcaster(this);
        }
        Dataset.prototype.data = function (data) {
            if (data == null) {
                return this._data;
            }
            else {
                this._data = data;
                this._accessor2cachedExtent = new Plottable._Util.StrictEqualityAssociativeArray();
                this.broadcaster.broadcast();
                return this;
            }
        };
        Dataset.prototype.metadata = function (metadata) {
            if (metadata == null) {
                return this._metadata;
            }
            else {
                this._metadata = metadata;
                this._accessor2cachedExtent = new Plottable._Util.StrictEqualityAssociativeArray();
                this.broadcaster.broadcast();
                return this;
            }
        };
        Dataset.prototype._getExtent = function (accessor, typeCoercer, plotMetadata) {
            if (plotMetadata === void 0) { plotMetadata = {}; }
            var cachedExtent = this._accessor2cachedExtent.get(accessor);
            if (cachedExtent === undefined) {
                cachedExtent = this._computeExtent(accessor, typeCoercer, plotMetadata);
                this._accessor2cachedExtent.set(accessor, cachedExtent);
            }
            return cachedExtent;
        };
        Dataset.prototype._computeExtent = function (accessor, typeCoercer, plotMetadata) {
            var _this = this;
            var appliedAccessor = function (d, i) { return accessor(d, i, _this._metadata, plotMetadata); };
            var mappedData = this._data.map(appliedAccessor).map(typeCoercer);
            if (mappedData.length === 0) {
                return [];
            }
            else if (typeof (mappedData[0]) === "string") {
                return Plottable._Util.Methods.uniq(mappedData);
            }
            else {
                var extent = d3.extent(mappedData);
                if (extent[0] == null || extent[1] == null) {
                    return [];
                }
                else {
                    return extent;
                }
            }
        };
        return Dataset;
    })(Plottable.Core.PlottableObject);
    Plottable.Dataset = Dataset;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Core;
    (function (Core) {
        var RenderController;
        (function (RenderController) {
            var RenderPolicy;
            (function (RenderPolicy) {
                /**
                 * Never queue anything, render everything immediately. Useful for
                 * debugging, horrible for performance.
                 */
                var Immediate = (function () {
                    function Immediate() {
                    }
                    Immediate.prototype.render = function () {
                        RenderController.flush();
                    };
                    return Immediate;
                })();
                RenderPolicy.Immediate = Immediate;
                /**
                 * The default way to render, which only tries to render every frame
                 * (usually, 1/60th of a second).
                 */
                var AnimationFrame = (function () {
                    function AnimationFrame() {
                    }
                    AnimationFrame.prototype.render = function () {
                        Plottable._Util.DOM.requestAnimationFramePolyfill(RenderController.flush);
                    };
                    return AnimationFrame;
                })();
                RenderPolicy.AnimationFrame = AnimationFrame;
                /**
                 * Renders with `setTimeout`. This is generally an inferior way to render
                 * compared to `requestAnimationFrame`, but it's still there if you want
                 * it.
                 */
                var Timeout = (function () {
                    function Timeout() {
                        this._timeoutMsec = Plottable._Util.DOM.POLYFILL_TIMEOUT_MSEC;
                    }
                    Timeout.prototype.render = function () {
                        setTimeout(RenderController.flush, this._timeoutMsec);
                    };
                    return Timeout;
                })();
                RenderPolicy.Timeout = Timeout;
            })(RenderPolicy = RenderController.RenderPolicy || (RenderController.RenderPolicy = {}));
        })(RenderController = Core.RenderController || (Core.RenderController = {}));
    })(Core = Plottable.Core || (Plottable.Core = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Core;
    (function (Core) {
        /**
         * The RenderController is responsible for enqueueing and synchronizing
         * layout and render calls for Plottable components.
         *
         * Layouts and renders occur inside an animation callback
         * (window.requestAnimationFrame if available).
         *
         * If you require immediate rendering, call RenderController.flush() to
         * perform enqueued layout and rendering serially.
         *
         * If you want to always have immediate rendering (useful for debugging),
         * call
         * ```typescript
         * Plottable.Core.RenderController.setRenderPolicy(
         *   new Plottable.Core.RenderController.RenderPolicy.Immediate()
         * );
         * ```
         */
        var RenderController;
        (function (RenderController) {
            var _componentsNeedingRender = {};
            var _componentsNeedingComputeLayout = {};
            var _animationRequested = false;
            var _isCurrentlyFlushing = false;
            RenderController._renderPolicy = new RenderController.RenderPolicy.AnimationFrame();
            function setRenderPolicy(policy) {
                if (typeof (policy) === "string") {
                    switch (policy.toLowerCase()) {
                        case "immediate":
                            policy = new RenderController.RenderPolicy.Immediate();
                            break;
                        case "animationframe":
                            policy = new RenderController.RenderPolicy.AnimationFrame();
                            break;
                        case "timeout":
                            policy = new RenderController.RenderPolicy.Timeout();
                            break;
                        default:
                            Plottable._Util.Methods.warn("Unrecognized renderPolicy: " + policy);
                            return;
                    }
                }
                RenderController._renderPolicy = policy;
            }
            RenderController.setRenderPolicy = setRenderPolicy;
            /**
             * If the RenderController is enabled, we enqueue the component for
             * render. Otherwise, it is rendered immediately.
             *
             * @param {AbstractComponent} component Any Plottable component.
             */
            function registerToRender(c) {
                if (_isCurrentlyFlushing) {
                    Plottable._Util.Methods.warn("Registered to render while other components are flushing: request may be ignored");
                }
                _componentsNeedingRender[c.getID()] = c;
                requestRender();
            }
            RenderController.registerToRender = registerToRender;
            /**
             * If the RenderController is enabled, we enqueue the component for
             * layout and render. Otherwise, it is rendered immediately.
             *
             * @param {AbstractComponent} component Any Plottable component.
             */
            function registerToComputeLayout(c) {
                _componentsNeedingComputeLayout[c.getID()] = c;
                _componentsNeedingRender[c.getID()] = c;
                requestRender();
            }
            RenderController.registerToComputeLayout = registerToComputeLayout;
            function requestRender() {
                // Only run or enqueue flush on first request.
                if (!_animationRequested) {
                    _animationRequested = true;
                    RenderController._renderPolicy.render();
                }
            }
            /**
             * Render everything that is waiting to be rendered right now, instead of
             * waiting until the next frame.
             *
             * Useful to call when debugging.
             */
            function flush() {
                if (_animationRequested) {
                    // Layout
                    var toCompute = d3.values(_componentsNeedingComputeLayout);
                    toCompute.forEach(function (c) { return c._computeLayout(); });
                    // Top level render.
                    // Containers will put their children in the toRender queue
                    var toRender = d3.values(_componentsNeedingRender);
                    toRender.forEach(function (c) { return c._render(); });
                    // now we are flushing
                    _isCurrentlyFlushing = true;
                    // Finally, perform render of all components
                    var failed = {};
                    Object.keys(_componentsNeedingRender).forEach(function (k) {
                        try {
                            _componentsNeedingRender[k]._doRender();
                        }
                        catch (err) {
                            // using setTimeout instead of console.log, we get the familiar red
                            // stack trace
                            setTimeout(function () {
                                throw err;
                            }, 0);
                            failed[k] = _componentsNeedingRender[k];
                        }
                    });
                    // Reset queues
                    _componentsNeedingComputeLayout = {};
                    _componentsNeedingRender = failed;
                    _animationRequested = false;
                    _isCurrentlyFlushing = false;
                }
            }
            RenderController.flush = flush;
        })(RenderController = Core.RenderController || (Core.RenderController = {}));
    })(Core = Plottable.Core || (Plottable.Core = {}));
})(Plottable || (Plottable = {}));

var Plottable;
(function (Plottable) {
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Domainer = (function () {
        /**
         * Constructs a new Domainer.
         *
         * @constructor
         * @param {(extents: any[][]) => any[]} combineExtents
         *        If present, this function will be used by the Domainer to merge
         *        all the extents that are present on a scale.
         *
         *        A plot may draw multiple things relative to a scale, e.g.
         *        different stocks over time. The plot computes their extents,
         *        which are a [min, max] pair. combineExtents is responsible for
         *        merging them all into one [min, max] pair. It defaults to taking
         *        the min of the first elements and the max of the second arguments.
         */
        function Domainer(combineExtents) {
            this._doNice = false;
            this._padProportion = 0.0;
            this._paddingExceptions = d3.map();
            this._unregisteredPaddingExceptions = d3.set();
            this._includedValues = d3.map();
            // _includedValues needs to be a map, even unregistered, to support getting un-stringified values back out
            this._unregisteredIncludedValues = d3.map();
            this._combineExtents = combineExtents;
        }
        /**
         * @param {any[][]} extents The list of extents to be reduced to a single
         *        extent.
         * @param {QuantitativeScale} scale
         *        Since nice() must do different things depending on Linear, Log,
         *        or Time scale, the scale must be passed in for nice() to work.
         * @returns {any[]} The domain, as a merging of all exents, as a [min, max]
         *                 pair.
         */
        Domainer.prototype.computeDomain = function (extents, scale) {
            var domain;
            if (this._combineExtents != null) {
                domain = this._combineExtents(extents);
            }
            else if (extents.length === 0) {
                domain = scale._defaultExtent();
            }
            else {
                domain = [Plottable._Util.Methods.min(extents, function (e) { return e[0]; }, 0), Plottable._Util.Methods.max(extents, function (e) { return e[1]; }, 0)];
            }
            domain = this._includeDomain(domain);
            domain = this._padDomain(scale, domain);
            domain = this._niceDomain(scale, domain);
            return domain;
        };
        /**
         * Sets the Domainer to pad by a given ratio.
         *
         * @param {number} padProportion Proportionally how much bigger the
         *         new domain should be (0.05 = 5% larger).
         *
         *         A domainer will pad equal visual amounts on each side.
         *         On a linear scale, this means both sides are padded the same
         *         amount: [10, 20] will be padded to [5, 25].
         *         On a log scale, the top will be padded more than the bottom, so
         *         [10, 100] will be padded to [1, 1000].
         *
         * @returns {Domainer} The calling Domainer.
         */
        Domainer.prototype.pad = function (padProportion) {
            if (padProportion === void 0) { padProportion = 0.05; }
            this._padProportion = padProportion;
            return this;
        };
        /**
         * Adds a padding exception, a value that will not be padded at either end of the domain.
         *
         * Eg, if a padding exception is added at x=0, then [0, 100] will pad to [0, 105] instead of [-2.5, 102.5].
         * If a key is provided, it will be registered under that key with standard map semantics. (Overwrite / remove by key)
         * If a key is not provided, it will be added with set semantics (Can be removed by value)
         *
         * @param {any} exception The padding exception to add.
         * @param {string} key The key to register the exception under.
         * @returns {Domainer} The calling domainer
         */
        Domainer.prototype.addPaddingException = function (exception, key) {
            if (key != null) {
                this._paddingExceptions.set(key, exception);
            }
            else {
                this._unregisteredPaddingExceptions.add(exception);
            }
            return this;
        };
        /**
         * Removes a padding exception, allowing the domain to pad out that value again.
         *
         * If a string is provided, it is assumed to be a key and the exception associated with that key is removed.
         * If a non-string is provdied, it is assumed to be an unkeyed exception and that exception is removed.
         *
         * @param {any} keyOrException The key for the value to remove, or the value to remove
         * @return {Domainer} The calling domainer
         */
        Domainer.prototype.removePaddingException = function (keyOrException) {
            if (typeof (keyOrException) === "string") {
                this._paddingExceptions.remove(keyOrException);
            }
            else {
                this._unregisteredPaddingExceptions.remove(keyOrException);
            }
            return this;
        };
        /**
         * Adds an included value, a value that must be included inside the domain.
         *
         * Eg, if a value exception is added at x=0, then [50, 100] will expand to [0, 100] rather than [50, 100].
         * If a key is provided, it will be registered under that key with standard map semantics. (Overwrite / remove by key)
         * If a key is not provided, it will be added with set semantics (Can be removed by value)
         *
         * @param {any} value The included value to add.
         * @param {string} key The key to register the value under.
         * @returns {Domainer} The calling domainer
         */
        Domainer.prototype.addIncludedValue = function (value, key) {
            if (key != null) {
                this._includedValues.set(key, value);
            }
            else {
                this._unregisteredIncludedValues.set(value, value);
            }
            return this;
        };
        /**
         * Remove an included value, allowing the domain to not include that value gain again.
         *
         * If a string is provided, it is assumed to be a key and the value associated with that key is removed.
         * If a non-string is provdied, it is assumed to be an unkeyed value and that value is removed.
         *
         * @param {any} keyOrException The key for the value to remove, or the value to remove
         * @return {Domainer} The calling domainer
         */
        Domainer.prototype.removeIncludedValue = function (valueOrKey) {
            if (typeof (valueOrKey) === "string") {
                this._includedValues.remove(valueOrKey);
            }
            else {
                this._unregisteredIncludedValues.remove(valueOrKey);
            }
            return this;
        };
        /**
         * Extends the scale's domain so it starts and ends with "nice" values.
         *
         * @param {number} count The number of ticks that should fit inside the new domain.
         * @return {Domainer} The calling Domainer.
         */
        Domainer.prototype.nice = function (count) {
            this._doNice = true;
            this._niceCount = count;
            return this;
        };
        Domainer.prototype._padDomain = function (scale, domain) {
            var min = domain[0];
            var max = domain[1];
            // valueOf accounts for dates properly
            if (min.valueOf() === max.valueOf() && this._padProportion > 0.0) {
                var d = min.valueOf();
                if (min instanceof Date) {
                    return [d - Domainer._ONE_DAY, d + Domainer._ONE_DAY];
                }
                else {
                    return [d - Domainer._PADDING_FOR_IDENTICAL_DOMAIN, d + Domainer._PADDING_FOR_IDENTICAL_DOMAIN];
                }
            }
            var scaleDomain = scale.domain();
            if (scaleDomain[0].valueOf() === scaleDomain[1].valueOf()) {
                return domain;
            }
            var p = this._padProportion / 2;
            // This scaling is done to account for log scales and other non-linear
            // scales. A log scale should be padded more on the max than on the min.
            var newMin = scale.invert(scale.scale(min) - (scale.scale(max) - scale.scale(min)) * p);
            var newMax = scale.invert(scale.scale(max) + (scale.scale(max) - scale.scale(min)) * p);
            var exceptionValues = this._paddingExceptions.values().concat(this._unregisteredPaddingExceptions.values());
            var exceptionSet = d3.set(exceptionValues);
            if (exceptionSet.has(min)) {
                newMin = min;
            }
            if (exceptionSet.has(max)) {
                newMax = max;
            }
            return [newMin, newMax];
        };
        Domainer.prototype._niceDomain = function (scale, domain) {
            if (this._doNice) {
                return scale._niceDomain(domain, this._niceCount);
            }
            else {
                return domain;
            }
        };
        Domainer.prototype._includeDomain = function (domain) {
            var includedValues = this._includedValues.values().concat(this._unregisteredIncludedValues.values());
            return includedValues.reduce(function (domain, value) { return [Math.min(domain[0], value), Math.max(domain[1], value)]; }, domain);
        };
        Domainer._PADDING_FOR_IDENTICAL_DOMAIN = 1;
        Domainer._ONE_DAY = 1000 * 60 * 60 * 24;
        return Domainer;
    })();
    Plottable.Domainer = Domainer;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var AbstractScale = (function (_super) {
            __extends(AbstractScale, _super);
            /**
             * Constructs a new Scale.
             *
             * A Scale is a wrapper around a D3.Scale.Scale. A Scale is really just a
             * function. Scales have a domain (input), a range (output), and a function
             * from domain to range.
             *
             * @constructor
             * @param {D3.Scale.Scale} scale The D3 scale backing the Scale.
             */
            function AbstractScale(scale) {
                _super.call(this);
                this._autoDomainAutomatically = true;
                this._rendererAttrID2Extent = {};
                this._typeCoercer = function (d) { return d; };
                this._domainModificationInProgress = false;
                this._d3Scale = scale;
                this.broadcaster = new Plottable.Core.Broadcaster(this);
            }
            AbstractScale.prototype._getAllExtents = function () {
                return d3.values(this._rendererAttrID2Extent);
            };
            AbstractScale.prototype._getExtent = function () {
                return []; // this should be overwritten
            };
            /**
             * Modifies the domain on the scale so that it includes the extent of all
             * perspectives it depends on. This will normally happen automatically, but
             * if you set domain explicitly with `plot.domain(x)`, you will need to
             * call this function if you want the domain to neccessarily include all
             * the data.
             *
             * Extent: The [min, max] pair for a Scale.Quantitative, all covered
             * strings for a Scale.Category.
             *
             * Perspective: A combination of a Dataset and an Accessor that
             * represents a view in to the data.
             *
             * @returns {Scale} The calling Scale.
             */
            AbstractScale.prototype.autoDomain = function () {
                this._autoDomainAutomatically = true;
                this._setDomain(this._getExtent());
                return this;
            };
            AbstractScale.prototype._autoDomainIfAutomaticMode = function () {
                if (this._autoDomainAutomatically) {
                    this.autoDomain();
                }
            };
            /**
             * Computes the range value corresponding to a given domain value. In other
             * words, apply the function to value.
             *
             * @param {R} value A domain value to be scaled.
             * @returns {R} The range value corresponding to the supplied domain value.
             */
            AbstractScale.prototype.scale = function (value) {
                return this._d3Scale(value);
            };
            AbstractScale.prototype.domain = function (values) {
                if (values == null) {
                    return this._getDomain();
                }
                else {
                    this._autoDomainAutomatically = false;
                    this._setDomain(values);
                    return this;
                }
            };
            AbstractScale.prototype._getDomain = function () {
                return this._d3Scale.domain();
            };
            AbstractScale.prototype._setDomain = function (values) {
                if (!this._domainModificationInProgress) {
                    this._domainModificationInProgress = true;
                    this._d3Scale.domain(values);
                    this.broadcaster.broadcast();
                    this._domainModificationInProgress = false;
                }
            };
            AbstractScale.prototype.range = function (values) {
                if (values == null) {
                    return this._d3Scale.range();
                }
                else {
                    this._d3Scale.range(values);
                    return this;
                }
            };
            /**
             * Constructs a copy of the Scale with the same domain and range but without
             * any registered listeners.
             *
             * @returns {Scale} A copy of the calling Scale.
             */
            AbstractScale.prototype.copy = function () {
                return new AbstractScale(this._d3Scale.copy());
            };
            /**
             * When a renderer determines that the extent of a projector has changed,
             * it will call this function. This function should ensure that
             * the scale has a domain at least large enough to include extent.
             *
             * @param {number} rendererID A unique indentifier of the renderer sending
             *                 the new extent.
             * @param {string} attr The attribute being projected, e.g. "x", "y0", "r"
             * @param {D[]} extent The new extent to be included in the scale.
             */
            AbstractScale.prototype._updateExtent = function (plotProvidedKey, attr, extent) {
                this._rendererAttrID2Extent[plotProvidedKey + attr] = extent;
                this._autoDomainIfAutomaticMode();
                return this;
            };
            AbstractScale.prototype._removeExtent = function (plotProvidedKey, attr) {
                delete this._rendererAttrID2Extent[plotProvidedKey + attr];
                this._autoDomainIfAutomaticMode();
                return this;
            };
            return AbstractScale;
        })(Plottable.Core.PlottableObject);
        Scale.AbstractScale = AbstractScale;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var AbstractQuantitative = (function (_super) {
            __extends(AbstractQuantitative, _super);
            /**
             * Constructs a new QuantitativeScale.
             *
             * A QuantitativeScale is a Scale that maps anys to numbers. It
             * is invertible and continuous.
             *
             * @constructor
             * @param {D3.Scale.QuantitativeScale} scale The D3 QuantitativeScale
             * backing the QuantitativeScale.
             */
            function AbstractQuantitative(scale) {
                _super.call(this, scale);
                this._numTicks = 10;
                this._PADDING_FOR_IDENTICAL_DOMAIN = 1;
                this._userSetDomainer = false;
                this._domainer = new Plottable.Domainer();
                this._typeCoercer = function (d) { return +d; };
                this._tickGenerator = function (scale) { return scale.getDefaultTicks(); };
            }
            AbstractQuantitative.prototype._getExtent = function () {
                return this._domainer.computeDomain(this._getAllExtents(), this);
            };
            /**
             * Retrieves the domain value corresponding to a supplied range value.
             *
             * @param {number} value: A value from the Scale's range.
             * @returns {D} The domain value corresponding to the supplied range value.
             */
            AbstractQuantitative.prototype.invert = function (value) {
                return this._d3Scale.invert(value);
            };
            /**
             * Creates a copy of the QuantitativeScale with the same domain and range but without any registered list.
             *
             * @returns {AbstractQuantitative} A copy of the calling QuantitativeScale.
             */
            AbstractQuantitative.prototype.copy = function () {
                return new AbstractQuantitative(this._d3Scale.copy());
            };
            AbstractQuantitative.prototype.domain = function (values) {
                return _super.prototype.domain.call(this, values); // need to override type sig to enable method chaining :/
            };
            AbstractQuantitative.prototype._setDomain = function (values) {
                var isNaNOrInfinity = function (x) { return x !== x || x === Infinity || x === -Infinity; };
                if (isNaNOrInfinity(values[0]) || isNaNOrInfinity(values[1])) {
                    Plottable._Util.Methods.warn("Warning: QuantitativeScales cannot take NaN or Infinity as a domain value. Ignoring.");
                    return;
                }
                _super.prototype._setDomain.call(this, values);
            };
            AbstractQuantitative.prototype.interpolate = function (factory) {
                if (factory == null) {
                    return this._d3Scale.interpolate();
                }
                this._d3Scale.interpolate(factory);
                return this;
            };
            /**
             * Sets the range of the QuantitativeScale and sets the interpolator to d3.interpolateRound.
             *
             * @param {number[]} values The new range value for the range.
             */
            AbstractQuantitative.prototype.rangeRound = function (values) {
                this._d3Scale.rangeRound(values);
                return this;
            };
            /**
             * Gets ticks generated by the default algorithm.
             */
            AbstractQuantitative.prototype.getDefaultTicks = function () {
                return this._d3Scale.ticks(this.numTicks());
            };
            AbstractQuantitative.prototype.clamp = function (clamp) {
                if (clamp == null) {
                    return this._d3Scale.clamp();
                }
                this._d3Scale.clamp(clamp);
                return this;
            };
            /**
             * Gets a set of tick values spanning the domain.
             *
             * @returns {any[]} The generated ticks.
             */
            AbstractQuantitative.prototype.ticks = function () {
                return this._tickGenerator(this);
            };
            AbstractQuantitative.prototype.numTicks = function (count) {
                if (count == null) {
                    return this._numTicks;
                }
                this._numTicks = count;
                return this;
            };
            /**
             * Given a domain, expands its domain onto "nice" values, e.g. whole
             * numbers.
             */
            AbstractQuantitative.prototype._niceDomain = function (domain, count) {
                return this._d3Scale.copy().domain(domain).nice(count).domain();
            };
            AbstractQuantitative.prototype.domainer = function (domainer) {
                if (domainer == null) {
                    return this._domainer;
                }
                else {
                    this._domainer = domainer;
                    this._userSetDomainer = true;
                    this._autoDomainIfAutomaticMode();
                    return this;
                }
            };
            AbstractQuantitative.prototype._defaultExtent = function () {
                return [0, 1];
            };
            AbstractQuantitative.prototype.tickGenerator = function (generator) {
                if (generator == null) {
                    return this._tickGenerator;
                }
                else {
                    this._tickGenerator = generator;
                    return this;
                }
            };
            return AbstractQuantitative;
        })(Scale.AbstractScale);
        Scale.AbstractQuantitative = AbstractQuantitative;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var Linear = (function (_super) {
            __extends(Linear, _super);
            function Linear(scale) {
                _super.call(this, scale == null ? d3.scale.linear() : scale);
            }
            /**
             * Constructs a copy of the LinearScale with the same domain and range but
             * without any registered listeners.
             *
             * @returns {Linear} A copy of the calling LinearScale.
             */
            Linear.prototype.copy = function () {
                return new Linear(this._d3Scale.copy());
            };
            return Linear;
        })(Scale.AbstractQuantitative);
        Scale.Linear = Linear;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var Log = (function (_super) {
            __extends(Log, _super);
            function Log(scale) {
                _super.call(this, scale == null ? d3.scale.log() : scale);
                if (!Log.warned) {
                    Log.warned = true;
                    Plottable._Util.Methods.warn("Plottable.Scale.Log is deprecated. If possible, use Plottable.Scale.ModifiedLog instead.");
                }
            }
            /**
             * Creates a copy of the Scale.Log with the same domain and range but without any registered listeners.
             *
             * @returns {Log} A copy of the calling Log.
             */
            Log.prototype.copy = function () {
                return new Log(this._d3Scale.copy());
            };
            Log.prototype._defaultExtent = function () {
                return [1, 10];
            };
            Log.warned = false;
            return Log;
        })(Scale.AbstractQuantitative);
        Scale.Log = Log;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var ModifiedLog = (function (_super) {
            __extends(ModifiedLog, _super);
            /**
             * Creates a new Scale.ModifiedLog.
             *
             * A ModifiedLog scale acts as a regular log scale for large numbers.
             * As it approaches 0, it gradually becomes linear. This means that the
             * scale won't freak out if you give it 0 or a negative number, where an
             * ordinary Log scale would.
             *
             * However, it does mean that scale will be effectively linear as values
             * approach 0. If you want very small values on a log scale, you should use
             * an ordinary Scale.Log instead.
             *
             * @constructor
             * @param {number} [base]
             *        The base of the log. Defaults to 10, and must be > 1.
             *
             *        For base <= x, scale(x) = log(x).
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
                _super.call(this, d3.scale.linear());
                this._showIntermediateTicks = false;
                this.base = base;
                this.pivot = this.base;
                this.untransformedDomain = this._defaultExtent();
                this.numTicks(10);
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
            ModifiedLog.prototype.adjustedLog = function (x) {
                var negationFactor = x < 0 ? -1 : 1;
                x *= negationFactor;
                if (x < this.pivot) {
                    x += (this.pivot - x) / this.pivot;
                }
                x = Math.log(x) / Math.log(this.base);
                x *= negationFactor;
                return x;
            };
            ModifiedLog.prototype.invertedAdjustedLog = function (x) {
                var negationFactor = x < 0 ? -1 : 1;
                x *= negationFactor;
                x = Math.pow(this.base, x);
                if (x < this.pivot) {
                    x = (this.pivot * (x - 1)) / (this.pivot - 1);
                }
                x *= negationFactor;
                return x;
            };
            ModifiedLog.prototype.scale = function (x) {
                return this._d3Scale(this.adjustedLog(x));
            };
            ModifiedLog.prototype.invert = function (x) {
                return this.invertedAdjustedLog(this._d3Scale.invert(x));
            };
            ModifiedLog.prototype._getDomain = function () {
                return this.untransformedDomain;
            };
            ModifiedLog.prototype._setDomain = function (values) {
                this.untransformedDomain = values;
                var transformedDomain = [this.adjustedLog(values[0]), this.adjustedLog(values[1])];
                this._d3Scale.domain(transformedDomain);
                this.broadcaster.broadcast();
            };
            ModifiedLog.prototype.ticks = function (count) {
                if (count === void 0) { count = this.numTicks(); }
                // Say your domain is [-100, 100] and your pivot is 10.
                // then we're going to draw negative log ticks from -100 to -10,
                // linear ticks from -10 to 10, and positive log ticks from 10 to 100.
                var middle = function (x, y, z) { return [x, y, z].sort(function (a, b) { return a - b; })[1]; };
                var min = Plottable._Util.Methods.min(this.untransformedDomain, 0);
                var max = Plottable._Util.Methods.max(this.untransformedDomain, 0);
                var negativeLower = min;
                var negativeUpper = middle(min, max, -this.pivot);
                var positiveLower = middle(min, max, this.pivot);
                var positiveUpper = max;
                var negativeLogTicks = this.logTicks(-negativeUpper, -negativeLower).map(function (x) { return -x; }).reverse();
                var positiveLogTicks = this.logTicks(positiveLower, positiveUpper);
                var linearTicks = this._showIntermediateTicks ? d3.scale.linear().domain([negativeUpper, positiveLower]).ticks(this.howManyTicks(negativeUpper, positiveLower)) : [-this.pivot, 0, this.pivot].filter(function (x) { return min <= x && x <= max; });
                var ticks = negativeLogTicks.concat(linearTicks).concat(positiveLogTicks);
                // If you only have 1 tick, you can't tell how big the scale is.
                if (ticks.length <= 1) {
                    ticks = d3.scale.linear().domain([min, max]).ticks(count);
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
            ModifiedLog.prototype.logTicks = function (lower, upper) {
                var _this = this;
                var nTicks = this.howManyTicks(lower, upper);
                if (nTicks === 0) {
                    return [];
                }
                var startLogged = Math.floor(Math.log(lower) / Math.log(this.base));
                var endLogged = Math.ceil(Math.log(upper) / Math.log(this.base));
                var bases = d3.range(endLogged, startLogged, -Math.ceil((endLogged - startLogged) / nTicks));
                var nMultiples = this._showIntermediateTicks ? Math.floor(nTicks / bases.length) : 1;
                var multiples = d3.range(this.base, 1, -(this.base - 1) / nMultiples).map(Math.floor);
                var uniqMultiples = Plottable._Util.Methods.uniq(multiples);
                var clusters = bases.map(function (b) { return uniqMultiples.map(function (x) { return Math.pow(_this.base, b - 1) * x; }); });
                var flattened = Plottable._Util.Methods.flatten(clusters);
                var filtered = flattened.filter(function (x) { return lower <= x && x <= upper; });
                var sorted = filtered.sort(function (x, y) { return x - y; });
                return sorted;
            };
            /**
             * How many ticks does the range [lower, upper] deserve?
             *
             * e.g. if your domain was [10, 1000] and I asked howManyTicks(10, 100),
             * I would get 1/2 of the ticks. The range 10, 100 takes up 1/2 of the
             * distance when plotted.
             */
            ModifiedLog.prototype.howManyTicks = function (lower, upper) {
                var adjustedMin = this.adjustedLog(Plottable._Util.Methods.min(this.untransformedDomain, 0));
                var adjustedMax = this.adjustedLog(Plottable._Util.Methods.max(this.untransformedDomain, 0));
                var adjustedLower = this.adjustedLog(lower);
                var adjustedUpper = this.adjustedLog(upper);
                var proportion = (adjustedUpper - adjustedLower) / (adjustedMax - adjustedMin);
                var ticks = Math.ceil(proportion * this.numTicks());
                return ticks;
            };
            ModifiedLog.prototype.copy = function () {
                return new ModifiedLog(this.base);
            };
            ModifiedLog.prototype._niceDomain = function (domain, count) {
                return domain;
            };
            ModifiedLog.prototype.showIntermediateTicks = function (show) {
                if (show == null) {
                    return this._showIntermediateTicks;
                }
                else {
                    this._showIntermediateTicks = show;
                }
            };
            return ModifiedLog;
        })(Scale.AbstractQuantitative);
        Scale.ModifiedLog = ModifiedLog;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var Category = (function (_super) {
            __extends(Category, _super);
            /**
             * Creates a CategoryScale.
             *
             * A CategoryScale maps strings to numbers. A common use is to map the
             * labels of a bar plot (strings) to their pixel locations (numbers).
             *
             * @constructor
             */
            function Category(scale) {
                if (scale === void 0) { scale = d3.scale.ordinal(); }
                _super.call(this, scale);
                this._range = [0, 1];
                this._typeCoercer = function (d) { return d != null && d.toString ? d.toString() : d; };
                var d3InnerPadding = 0.3;
                this._innerPadding = Category._convertToPlottableInnerPadding(d3InnerPadding);
                this._outerPadding = Category._convertToPlottableOuterPadding(0.5, d3InnerPadding);
            }
            Category.prototype._getExtent = function () {
                var extents = this._getAllExtents();
                return Plottable._Util.Methods.uniq(Plottable._Util.Methods.flatten(extents));
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
             * The step width is defined as the entire space for a band to occupy,
             * including the padding in between the bands.
             *
             * @returns {number} the full band width of the scale
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
                this.broadcaster.broadcast();
                return this;
            };
            Category.prototype.outerPadding = function (outerPadding) {
                if (outerPadding == null) {
                    return this._outerPadding;
                }
                this._outerPadding = outerPadding;
                this.range(this.range());
                this.broadcaster.broadcast();
                return this;
            };
            Category.prototype.copy = function () {
                return new Category(this._d3Scale.copy());
            };
            Category.prototype.scale = function (value) {
                //scale it to the middle
                return _super.prototype.scale.call(this, value) + this.rangeBand() / 2;
            };
            return Category;
        })(Scale.AbstractScale);
        Scale.Category = Category;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var Color = (function (_super) {
            __extends(Color, _super);
            /**
             * Constructs a ColorScale.
             *
             * @constructor
             * @param {string} [scaleType] the type of color scale to create
             *     (Category10/Category20/Category20b/Category20c).
             * See https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors
             */
            function Color(scaleType) {
                var scale;
                switch (scaleType) {
                    case null:
                    case undefined:
                        scale = d3.scale.ordinal().range(Color._getPlottableColors());
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
                _super.call(this, scale);
            }
            // Duplicated from OrdinalScale._getExtent - should be removed in #388
            Color.prototype._getExtent = function () {
                var extents = this._getAllExtents();
                var concatenatedExtents = [];
                extents.forEach(function (e) {
                    concatenatedExtents = concatenatedExtents.concat(e);
                });
                return Plottable._Util.Methods.uniq(concatenatedExtents);
            };
            Color._getPlottableColors = function () {
                var plottableDefaultColors = [];
                var colorTester = d3.select("body").append("plottable-color-tester");
                var defaultColorHex = Plottable._Util.Methods.colorTest(colorTester, "");
                var i = 0;
                var colorHex;
                while ((colorHex = Plottable._Util.Methods.colorTest(colorTester, "plottable-colors-" + i)) !== null && i < this.MAXIMUM_COLORS_FROM_CSS) {
                    if (colorHex === defaultColorHex && colorHex === plottableDefaultColors[plottableDefaultColors.length - 1]) {
                        break;
                    }
                    plottableDefaultColors.push(colorHex);
                    i++;
                }
                colorTester.remove();
                return plottableDefaultColors;
            };
            // Modifying the original scale method so that colors that are looped are lightened according
            // to how many times they are looped.
            Color.prototype.scale = function (value) {
                var color = _super.prototype.scale.call(this, value);
                var index = this.domain().indexOf(value);
                var numLooped = Math.floor(index / this.range().length);
                var modifyFactor = Math.log(numLooped * Color.LOOP_LIGHTEN_FACTOR + 1);
                return Plottable._Util.Methods.lightenColor(color, modifyFactor);
            };
            Color.HEX_SCALE_FACTOR = 20;
            Color.LOOP_LIGHTEN_FACTOR = 1.6;
            //The maximum number of colors we are getting from CSS stylesheets
            Color.MAXIMUM_COLORS_FROM_CSS = 256;
            return Color;
        })(Scale.AbstractScale);
        Scale.Color = Color;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var Time = (function (_super) {
            __extends(Time, _super);
            function Time(scale) {
                // need to cast since d3 time scales do not descend from Quantitative scales
                _super.call(this, scale == null ? d3.time.scale() : scale);
                this._typeCoercer = function (d) { return d && d._isAMomentObject || d instanceof Date ? d : new Date(d); };
            }
            Time.prototype.tickInterval = function (interval, step) {
                // temporarily creats a time scale from our linear scale into a time scale so we can get access to its api
                var tempScale = d3.time.scale();
                tempScale.domain(this.domain());
                tempScale.range(this.range());
                return tempScale.ticks(interval.range, step);
            };
            Time.prototype._setDomain = function (values) {
                // attempt to parse dates
                values = values.map(this._typeCoercer);
                if (values[1] < values[0]) {
                    throw new Error("Scale.Time domain values must be in chronological order");
                }
                return _super.prototype._setDomain.call(this, values);
            };
            Time.prototype.copy = function () {
                return new Time(this._d3Scale.copy());
            };
            Time.prototype._defaultExtent = function () {
                var endTime = new Date().valueOf();
                var startTime = endTime - Plottable.MILLISECONDS_IN_ONE_DAY;
                return [startTime, endTime];
            };
            return Time;
        })(Scale.AbstractQuantitative);
        Scale.Time = Time;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        /**
         * This class implements a color scale that takes quantitive input and
         * interpolates between a list of color values. It returns a hex string
         * representing the interpolated color.
         *
         * By default it generates a linear scale internally.
         */
        var InterpolatedColor = (function (_super) {
            __extends(InterpolatedColor, _super);
            /**
             * Constructs an InterpolatedColorScale.
             *
             * An InterpolatedColorScale maps numbers evenly to color strings.
             *
             * @constructor
             * @param {string|string[]} colorRange the type of color scale to
             *     create. Default is "reds". @see {@link colorRange} for further
             *     options.
             * @param {string} scaleType the type of underlying scale to use
             *     (linear/pow/log/sqrt). Default is "linear". @see {@link scaleType}
             *     for further options.
             */
            function InterpolatedColor(colorRange, scaleType) {
                if (colorRange === void 0) { colorRange = "reds"; }
                if (scaleType === void 0) { scaleType = "linear"; }
                this._colorRange = this._resolveColorValues(colorRange);
                this._scaleType = scaleType;
                _super.call(this, InterpolatedColor._getD3InterpolatedScale(this._colorRange, this._scaleType));
            }
            /**
             * Converts the string array into a d3 scale.
             *
             * @param {string[]} colors an array of strings representing color
             *     values in hex ("#FFFFFF") or keywords ("white").
             * @param {string} scaleType a string representing the underlying scale
             *     type ("linear"/"log"/"sqrt"/"pow")
             * @returns {D3.Scale.QuantitativeScale} The converted Quantitative d3 scale.
             */
            InterpolatedColor._getD3InterpolatedScale = function (colors, scaleType) {
                var scale;
                switch (scaleType) {
                    case "linear":
                        scale = d3.scale.linear();
                        break;
                    case "log":
                        scale = d3.scale.log();
                        break;
                    case "sqrt":
                        scale = d3.scale.sqrt();
                        break;
                    case "pow":
                        scale = d3.scale.pow();
                        break;
                }
                if (scale == null) {
                    throw new Error("unknown Quantitative scale type " + scaleType);
                }
                return scale.range([0, 1]).interpolate(InterpolatedColor._interpolateColors(colors));
            };
            /**
             * Creates a d3 interpolator given the color array.
             *
             * This class implements a scale that maps numbers to strings.
             *
             * @param {string[]} colors an array of strings representing color
             *     values in hex ("#FFFFFF") or keywords ("white").
             * @returns {D3.Transition.Interpolate} The d3 interpolator for colors.
             */
            InterpolatedColor._interpolateColors = function (colors) {
                if (colors.length < 2) {
                    throw new Error("Color scale arrays must have at least two elements.");
                }
                ;
                return function (ignored) {
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
            InterpolatedColor.prototype.colorRange = function (colorRange) {
                if (colorRange == null) {
                    return this._colorRange;
                }
                this._colorRange = this._resolveColorValues(colorRange);
                this._resetScale();
                return this;
            };
            InterpolatedColor.prototype.scaleType = function (scaleType) {
                if (scaleType == null) {
                    return this._scaleType;
                }
                this._scaleType = scaleType;
                this._resetScale();
                return this;
            };
            InterpolatedColor.prototype._resetScale = function () {
                this._d3Scale = InterpolatedColor._getD3InterpolatedScale(this._colorRange, this._scaleType);
                this._autoDomainIfAutomaticMode();
                this.broadcaster.broadcast();
            };
            InterpolatedColor.prototype._resolveColorValues = function (colorRange) {
                if (typeof (colorRange) === "object") {
                    return colorRange;
                }
                else if (InterpolatedColor._COLOR_SCALES[colorRange] != null) {
                    return InterpolatedColor._COLOR_SCALES[colorRange];
                }
                else {
                    return InterpolatedColor._COLOR_SCALES["reds"];
                }
            };
            InterpolatedColor.prototype.autoDomain = function () {
                // unlike other QuantitativeScales, interpolatedColorScale ignores its domainer
                var extents = this._getAllExtents();
                if (extents.length > 0) {
                    this._setDomain([Plottable._Util.Methods.min(extents, function (x) { return x[0]; }, 0), Plottable._Util.Methods.max(extents, function (x) { return x[1]; }, 0)]);
                }
                return this;
            };
            InterpolatedColor._COLOR_SCALES = {
                reds: [
                    "#FFFFFF",
                    "#FFF6E1",
                    "#FEF4C0",
                    "#FED976",
                    "#FEB24C",
                    "#FD8D3C",
                    "#FC4E2A",
                    "#E31A1C",
                    "#B10026"
                ],
                blues: [
                    "#FFFFFF",
                    "#CCFFFF",
                    "#A5FFFD",
                    "#85F7FB",
                    "#6ED3EF",
                    "#55A7E0",
                    "#417FD0",
                    "#2545D3",
                    "#0B02E1"
                ],
                posneg: [
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
                    "#B10026"
                ]
            };
            return InterpolatedColor;
        })(Scale.AbstractScale);
        Scale.InterpolatedColor = InterpolatedColor;
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var _Util;
    (function (_Util) {
        var ScaleDomainCoordinator = (function () {
            /**
             * Constructs a ScaleDomainCoordinator.
             *
             * @constructor
             * @param {Scale[]} scales A list of scales whose domains should be linked.
             */
            function ScaleDomainCoordinator(scales) {
                var _this = this;
                /* This class is responsible for maintaining coordination between linked scales.
                It registers event listeners for when one of its scales changes its domain. When the scale
                does change its domain, it re-propogates the change to every linked scale.
                */
                this._rescaleInProgress = false;
                if (scales == null) {
                    throw new Error("ScaleDomainCoordinator requires scales to coordinate");
                }
                this._scales = scales;
                this._scales.forEach(function (s) { return s.broadcaster.registerListener(_this, function (sx) { return _this.rescale(sx); }); });
            }
            ScaleDomainCoordinator.prototype.rescale = function (scale) {
                if (this._rescaleInProgress) {
                    return;
                }
                this._rescaleInProgress = true;
                var newDomain = scale.domain();
                this._scales.forEach(function (s) { return s.domain(newDomain); });
                this._rescaleInProgress = false;
            };
            return ScaleDomainCoordinator;
        })();
        _Util.ScaleDomainCoordinator = ScaleDomainCoordinator;
    })(_Util = Plottable._Util || (Plottable._Util = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Scale;
    (function (Scale) {
        var TickGenerators;
        (function (TickGenerators) {
            /**
             * Creates a tick generator using the specified interval.
             *
             * Generates ticks at multiples of the interval while also including the domain boundaries.
             *
             * @param {number} interval The interval between two ticks (not including the end ticks).
             *
             * @returns {TickGenerator} A tick generator using the specified interval.
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
                    var middleTicks = Plottable._Util.Methods.range(0, numTicks).map(function (t) { return firstTick + t * interval; });
                    var highTicks = high % interval === 0 ? [] : [high];
                    return lowTicks.concat(middleTicks).concat(highTicks);
                };
            }
            TickGenerators.intervalTickGenerator = intervalTickGenerator;
            /**
             * Creates a tick generator that will filter for only the integers in defaultTicks and return them.
             *
             * Will also include the end ticks.
             *
             * @returns {TickGenerator} A tick generator returning only integer ticks.
             */
            function integerTickGenerator() {
                return function (s) {
                    var defaultTicks = s.getDefaultTicks();
                    return defaultTicks.filter(function (tick, i) { return (tick % 1 === 0) || (i === 0) || (i === defaultTicks.length - 1); });
                };
            }
            TickGenerators.integerTickGenerator = integerTickGenerator;
        })(TickGenerators = Scale.TickGenerators || (Scale.TickGenerators = {}));
    })(Scale = Plottable.Scale || (Plottable.Scale = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var AbstractDrawer = (function () {
            /**
             * Constructs a Drawer
             *
             * @constructor
             * @param{string} key The key associated with this Drawer
             */
            function AbstractDrawer(key) {
                this.key = key;
            }
            /**
             * Sets the class, which needs to be applied to bound elements.
             *
             * @param{string} className The class name to be applied.
             */
            AbstractDrawer.prototype.setClass = function (className) {
                this._className = className;
                return this;
            };
            AbstractDrawer.prototype.setup = function (area) {
                this._renderArea = area;
            };
            /**
             * Removes the Drawer and its renderArea
             */
            AbstractDrawer.prototype.remove = function () {
                if (this._getRenderArea() != null) {
                    this._getRenderArea().remove();
                }
            };
            /**
             * Enter new data to render area and creates binding
             *
             * @param{any[]} data The data to be drawn
             */
            AbstractDrawer.prototype._enterData = function (data) {
                // no-op
            };
            /**
             * Draws data using one step
             *
             * @param{AppliedDrawStep} step The step, how data should be drawn.
             */
            AbstractDrawer.prototype._drawStep = function (step) {
                // no-op
            };
            AbstractDrawer.prototype._numberOfAnimationIterations = function (data) {
                return data.length;
            };
            AbstractDrawer.prototype._applyMetadata = function (attrToProjector, userMetadata, plotMetadata) {
                var modifiedAttrToProjector = {};
                d3.keys(attrToProjector).forEach(function (attr) {
                    modifiedAttrToProjector[attr] = function (datum, index) { return attrToProjector[attr](datum, index, userMetadata, plotMetadata); };
                });
                return modifiedAttrToProjector;
            };
            AbstractDrawer.prototype._prepareDrawSteps = function (drawSteps) {
                // no-op
            };
            AbstractDrawer.prototype._prepareData = function (data, drawSteps) {
                return data;
            };
            /**
             * Draws the data into the renderArea using the spefic steps and metadata
             *
             * @param{any[]} data The data to be drawn
             * @param{DrawStep[]} drawSteps The list of steps, which needs to be drawn
             * @param{any} userMetadata The metadata provided by user
             * @param{any} plotMetadata The metadata provided by plot
             */
            AbstractDrawer.prototype.draw = function (data, drawSteps, userMetadata, plotMetadata) {
                var _this = this;
                var appliedDrawSteps = drawSteps.map(function (dr) {
                    var appliedAttrToProjector = _this._applyMetadata(dr.attrToProjector, userMetadata, plotMetadata);
                    _this._attrToProjector = Plottable._Util.Methods.copyMap(appliedAttrToProjector);
                    return {
                        attrToProjector: appliedAttrToProjector,
                        animator: dr.animator
                    };
                });
                var preparedData = this._prepareData(data, appliedDrawSteps);
                this._prepareDrawSteps(appliedDrawSteps);
                this._enterData(preparedData);
                var numberOfIterations = this._numberOfAnimationIterations(preparedData);
                var delay = 0;
                appliedDrawSteps.forEach(function (drawStep, i) {
                    Plottable._Util.Methods.setTimeout(function () { return _this._drawStep(drawStep); }, delay);
                    delay += drawStep.animator.getTiming(numberOfIterations);
                });
                return delay;
            };
            /**
             * Retrieves the renderArea selection for the drawer
             *
             * @returns {D3.Selection} the renderArea selection
             */
            AbstractDrawer.prototype._getRenderArea = function () {
                return this._renderArea;
            };
            AbstractDrawer.prototype._getSelector = function () {
                return "";
            };
            AbstractDrawer.prototype._getPixelPoint = function (datum, index) {
                return null;
            };
            AbstractDrawer.prototype._getSelection = function (index) {
                var allSelections = this._getRenderArea().selectAll(this._getSelector());
                return d3.select(allSelections[0][index]);
            };
            return AbstractDrawer;
        })();
        _Drawer.AbstractDrawer = AbstractDrawer;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line() {
                _super.apply(this, arguments);
            }
            Line.prototype._enterData = function (data) {
                _super.prototype._enterData.call(this, data);
                this._pathSelection.datum(data);
            };
            Line.prototype.setup = function (area) {
                this._pathSelection = area.append("path").classed(Line.LINE_CLASS, true).style({
                    "fill": "none",
                    "vector-effect": "non-scaling-stroke"
                });
                _super.prototype.setup.call(this, area);
            };
            Line.prototype._createLine = function (xFunction, yFunction, definedFunction) {
                if (!definedFunction) {
                    definedFunction = function (d, i) { return true; };
                }
                return d3.svg.line().x(xFunction).y(yFunction).defined(definedFunction);
            };
            Line.prototype._numberOfAnimationIterations = function (data) {
                return 1;
            };
            Line.prototype._drawStep = function (step) {
                var baseTime = _super.prototype._drawStep.call(this, step);
                var attrToProjector = Plottable._Util.Methods.copyMap(step.attrToProjector);
                var definedFunction = attrToProjector["defined"];
                var xProjector = attrToProjector["x"];
                var yProjector = attrToProjector["y"];
                delete attrToProjector["x"];
                delete attrToProjector["y"];
                if (attrToProjector["defined"]) {
                    delete attrToProjector["defined"];
                }
                attrToProjector["d"] = this._createLine(xProjector, yProjector, definedFunction);
                if (attrToProjector["fill"]) {
                    this._pathSelection.attr("fill", attrToProjector["fill"]); // so colors don't animate
                }
                if (attrToProjector["class"]) {
                    this._pathSelection.attr("class", attrToProjector["class"]);
                    this._pathSelection.classed(Line.LINE_CLASS, true);
                    delete attrToProjector["class"];
                }
                step.animator.animate(this._pathSelection, attrToProjector);
            };
            Line.prototype._getSelector = function () {
                return "." + Line.LINE_CLASS;
            };
            Line.prototype._getPixelPoint = function (datum, index) {
                return { x: this._attrToProjector["x"](datum, index), y: this._attrToProjector["y"](datum, index) };
            };
            Line.prototype._getSelection = function (index) {
                return this._getRenderArea().select(this._getSelector());
            };
            Line.LINE_CLASS = "line";
            return Line;
        })(_Drawer.AbstractDrawer);
        _Drawer.Line = Line;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var Area = (function (_super) {
            __extends(Area, _super);
            function Area() {
                _super.apply(this, arguments);
                this._drawLine = true;
            }
            Area.prototype._enterData = function (data) {
                if (this._drawLine) {
                    _super.prototype._enterData.call(this, data);
                }
                else {
                    // HACKHACK Forced to use anycast to access protected var
                    _Drawer.AbstractDrawer.prototype._enterData.call(this, data);
                }
                this._areaSelection.datum(data);
            };
            /**
             * Sets the value determining if line should be drawn.
             *
             * @param{boolean} draw The value determing if line should be drawn.
             */
            Area.prototype.drawLine = function (draw) {
                this._drawLine = draw;
                return this;
            };
            Area.prototype.setup = function (area) {
                this._areaSelection = area.append("path").classed(Area.AREA_CLASS, true).style({ "stroke": "none" });
                if (this._drawLine) {
                    _super.prototype.setup.call(this, area);
                }
                else {
                    _Drawer.AbstractDrawer.prototype.setup.call(this, area);
                }
            };
            Area.prototype._createArea = function (xFunction, y0Function, y1Function, definedFunction) {
                if (!definedFunction) {
                    definedFunction = function () { return true; };
                }
                return d3.svg.area().x(xFunction).y0(y0Function).y1(y1Function).defined(definedFunction);
            };
            Area.prototype._drawStep = function (step) {
                if (this._drawLine) {
                    _super.prototype._drawStep.call(this, step);
                }
                else {
                    // HACKHACK Forced to use anycast to access protected var
                    _Drawer.AbstractDrawer.prototype._drawStep.call(this, step);
                }
                var attrToProjector = Plottable._Util.Methods.copyMap(step.attrToProjector);
                var xFunction = attrToProjector["x"];
                var y0Function = attrToProjector["y0"];
                var y1Function = attrToProjector["y"];
                var definedFunction = attrToProjector["defined"];
                delete attrToProjector["x"];
                delete attrToProjector["y0"];
                delete attrToProjector["y"];
                if (attrToProjector["defined"]) {
                    delete attrToProjector["defined"];
                }
                attrToProjector["d"] = this._createArea(xFunction, y0Function, y1Function, definedFunction);
                if (attrToProjector["fill"]) {
                    this._areaSelection.attr("fill", attrToProjector["fill"]); // so colors don't animate
                }
                if (attrToProjector["class"]) {
                    this._areaSelection.attr("class", attrToProjector["class"]);
                    this._areaSelection.classed(Area.AREA_CLASS, true);
                    delete attrToProjector["class"];
                }
                step.animator.animate(this._areaSelection, attrToProjector);
            };
            Area.prototype._getSelector = function () {
                return "path";
            };
            Area.AREA_CLASS = "area";
            return Area;
        })(_Drawer.Line);
        _Drawer.Area = Area;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var Element = (function (_super) {
            __extends(Element, _super);
            function Element() {
                _super.apply(this, arguments);
            }
            /**
             * Sets the svg element, which needs to be bind to data
             *
             * @param{string} tag The svg element to be bind
             */
            Element.prototype.svgElement = function (tag) {
                this._svgElement = tag;
                return this;
            };
            Element.prototype._getDrawSelection = function () {
                return this._getRenderArea().selectAll(this._svgElement);
            };
            Element.prototype._drawStep = function (step) {
                _super.prototype._drawStep.call(this, step);
                var drawSelection = this._getDrawSelection();
                if (step.attrToProjector["fill"]) {
                    drawSelection.attr("fill", step.attrToProjector["fill"]); // so colors don't animate
                }
                step.animator.animate(drawSelection, step.attrToProjector);
            };
            Element.prototype._enterData = function (data) {
                _super.prototype._enterData.call(this, data);
                var dataElements = this._getDrawSelection().data(data);
                dataElements.enter().append(this._svgElement);
                if (this._className != null) {
                    dataElements.classed(this._className, true);
                }
                dataElements.exit().remove();
            };
            Element.prototype._filterDefinedData = function (data, definedFunction) {
                return definedFunction ? data.filter(definedFunction) : data;
            };
            // HACKHACK To prevent populating undesired attribute to d3, we delete them here.
            Element.prototype._prepareDrawSteps = function (drawSteps) {
                _super.prototype._prepareDrawSteps.call(this, drawSteps);
                drawSteps.forEach(function (d) {
                    if (d.attrToProjector["defined"]) {
                        delete d.attrToProjector["defined"];
                    }
                });
            };
            Element.prototype._prepareData = function (data, drawSteps) {
                var _this = this;
                return drawSteps.reduce(function (data, drawStep) { return _this._filterDefinedData(data, drawStep.attrToProjector["defined"]); }, _super.prototype._prepareData.call(this, data, drawSteps));
            };
            Element.prototype._getSelector = function () {
                return this._svgElement;
            };
            return Element;
        })(_Drawer.AbstractDrawer);
        _Drawer.Element = Element;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var LABEL_VERTICAL_PADDING = 5;
        var LABEL_HORIZONTAL_PADDING = 5;
        var Rect = (function (_super) {
            __extends(Rect, _super);
            function Rect(key, isVertical) {
                _super.call(this, key);
                this._labelsTooWide = false;
                this.svgElement("rect");
                this._isVertical = isVertical;
            }
            Rect.prototype.setup = function (area) {
                // need to put the bars in a seperate container so we can ensure that they don't cover labels
                _super.prototype.setup.call(this, area.append("g").classed("bar-area", true));
                this._textArea = area.append("g").classed("bar-label-text-area", true);
                this._measurer = new SVGTypewriter.Measurers.CacheCharacterMeasurer(this._textArea);
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer);
            };
            Rect.prototype.removeLabels = function () {
                this._textArea.selectAll("g").remove();
            };
            Rect.prototype._getIfLabelsTooWide = function () {
                return this._labelsTooWide;
            };
            Rect.prototype.drawText = function (data, attrToProjector, userMetadata, plotMetadata) {
                var _this = this;
                var labelTooWide = data.map(function (d, i) {
                    var text = attrToProjector["label"](d, i, userMetadata, plotMetadata).toString();
                    var w = attrToProjector["width"](d, i, userMetadata, plotMetadata);
                    var h = attrToProjector["height"](d, i, userMetadata, plotMetadata);
                    var x = attrToProjector["x"](d, i, userMetadata, plotMetadata);
                    var y = attrToProjector["y"](d, i, userMetadata, plotMetadata);
                    var positive = attrToProjector["positive"](d, i, userMetadata, plotMetadata);
                    var measurement = _this._measurer.measure(text);
                    var color = attrToProjector["fill"](d, i, userMetadata, plotMetadata);
                    var dark = Plottable._Util.Color.contrast("white", color) * 1.6 < Plottable._Util.Color.contrast("black", color);
                    var primary = _this._isVertical ? h : w;
                    var primarySpace = _this._isVertical ? measurement.height : measurement.width;
                    var secondaryAttrTextSpace = _this._isVertical ? measurement.width : measurement.height;
                    var secondaryAttrAvailableSpace = _this._isVertical ? w : h;
                    var tooWide = secondaryAttrTextSpace + 2 * LABEL_HORIZONTAL_PADDING > secondaryAttrAvailableSpace;
                    if (measurement.height <= h && measurement.width <= w) {
                        var offset = Math.min((primary - primarySpace) / 2, LABEL_VERTICAL_PADDING);
                        if (!positive) {
                            offset = offset * -1;
                        }
                        if (_this._isVertical) {
                            y += offset;
                        }
                        else {
                            x += offset;
                        }
                        var g = _this._textArea.append("g").attr("transform", "translate(" + x + "," + y + ")");
                        var className = dark ? "dark-label" : "light-label";
                        g.classed(className, true);
                        var xAlign;
                        var yAlign;
                        if (_this._isVertical) {
                            xAlign = "center";
                            yAlign = positive ? "top" : "bottom";
                        }
                        else {
                            xAlign = positive ? "left" : "right";
                            yAlign = "center";
                        }
                        var writeOptions = {
                            selection: g,
                            xAlign: xAlign,
                            yAlign: yAlign,
                            textRotation: 0
                        };
                        _this._writer.write(text, w, h, writeOptions);
                    }
                    return tooWide;
                });
                this._labelsTooWide = labelTooWide.some(function (d) { return d; });
            };
            Rect.prototype._getPixelPoint = function (datum, index) {
                var rectX = this._attrToProjector["x"](datum, index);
                var rectY = this._attrToProjector["y"](datum, index);
                var rectWidth = this._attrToProjector["width"](datum, index);
                var rectHeight = this._attrToProjector["height"](datum, index);
                var x = this._isVertical ? rectX + rectWidth / 2 : rectX + rectWidth;
                var y = this._isVertical ? rectY : rectY + rectHeight / 2;
                return { x: x, y: y };
            };
            Rect.prototype.draw = function (data, drawSteps, userMetadata, plotMetadata) {
                var attrToProjector = drawSteps[0].attrToProjector;
                var isValidNumber = Plottable._Util.Methods.isValidNumber;
                data = data.filter(function (e, i) {
                    return isValidNumber(attrToProjector["x"](e, null, userMetadata, plotMetadata)) && isValidNumber(attrToProjector["y"](e, null, userMetadata, plotMetadata)) && isValidNumber(attrToProjector["width"](e, null, userMetadata, plotMetadata)) && isValidNumber(attrToProjector["height"](e, null, userMetadata, plotMetadata));
                });
                return _super.prototype.draw.call(this, data, drawSteps, userMetadata, plotMetadata);
            };
            return Rect;
        })(_Drawer.Element);
        _Drawer.Rect = Rect;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var Arc = (function (_super) {
            __extends(Arc, _super);
            function Arc(key) {
                _super.call(this, key);
                this._svgElement = "path";
            }
            Arc.prototype._createArc = function (innerRadiusF, outerRadiusF) {
                return d3.svg.arc().innerRadius(innerRadiusF).outerRadius(outerRadiusF);
            };
            Arc.prototype.retargetProjectors = function (attrToProjector) {
                var retargetedAttrToProjector = {};
                d3.entries(attrToProjector).forEach(function (entry) {
                    retargetedAttrToProjector[entry.key] = function (d, i) { return entry.value(d.data, i); };
                });
                return retargetedAttrToProjector;
            };
            Arc.prototype._drawStep = function (step) {
                var attrToProjector = Plottable._Util.Methods.copyMap(step.attrToProjector);
                attrToProjector = this.retargetProjectors(attrToProjector);
                this._attrToProjector = this.retargetProjectors(this._attrToProjector);
                var innerRadiusAccessor = attrToProjector["inner-radius"];
                var outerRadiusAccessor = attrToProjector["outer-radius"];
                delete attrToProjector["inner-radius"];
                delete attrToProjector["outer-radius"];
                attrToProjector["d"] = this._createArc(innerRadiusAccessor, outerRadiusAccessor);
                return _super.prototype._drawStep.call(this, { attrToProjector: attrToProjector, animator: step.animator });
            };
            Arc.prototype.draw = function (data, drawSteps, userMetadata, plotMetadata) {
                // HACKHACK Applying metadata should be done in base class
                var valueAccessor = function (d, i) { return drawSteps[0].attrToProjector["value"](d, i, userMetadata, plotMetadata); };
                data = data.filter(function (e) { return Plottable._Util.Methods.isValidNumber(+valueAccessor(e, null)); });
                var pie = d3.layout.pie().sort(null).value(valueAccessor)(data);
                drawSteps.forEach(function (s) { return delete s.attrToProjector["value"]; });
                pie.forEach(function (slice) {
                    if (slice.value < 0) {
                        Plottable._Util.Methods.warn("Negative values will not render correctly in a pie chart.");
                    }
                });
                return _super.prototype.draw.call(this, pie, drawSteps, userMetadata, plotMetadata);
            };
            Arc.prototype._getPixelPoint = function (datum, index) {
                var innerRadiusAccessor = this._attrToProjector["inner-radius"];
                var outerRadiusAccessor = this._attrToProjector["outer-radius"];
                var avgRadius = (innerRadiusAccessor(datum, index) + outerRadiusAccessor(datum, index)) / 2;
                var startAngle = +this._getSelection(index).datum().startAngle;
                var endAngle = +this._getSelection(index).datum().endAngle;
                var avgAngle = (startAngle + endAngle) / 2;
                return { x: avgRadius * Math.sin(avgAngle), y: -avgRadius * Math.cos(avgAngle) };
            };
            return Arc;
        })(_Drawer.Element);
        _Drawer.Arc = Arc;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var _Drawer;
    (function (_Drawer) {
        var Symbol = (function (_super) {
            __extends(Symbol, _super);
            function Symbol(key) {
                _super.call(this, key);
                this._svgElement = "path";
                this._className = "symbol";
            }
            Symbol.prototype._drawStep = function (step) {
                var attrToProjector = step.attrToProjector;
                this._attrToProjector = Plottable._Util.Methods.copyMap(step.attrToProjector);
                var xProjector = attrToProjector["x"];
                var yProjector = attrToProjector["y"];
                delete attrToProjector["x"];
                delete attrToProjector["y"];
                var rProjector = attrToProjector["size"];
                delete attrToProjector["size"];
                attrToProjector["transform"] = function (datum, index) { return "translate(" + xProjector(datum, index) + "," + yProjector(datum, index) + ")"; };
                var symbolProjector = attrToProjector["symbol"];
                delete attrToProjector["symbol"];
                attrToProjector["d"] = attrToProjector["d"] || (function (datum, index) { return symbolProjector(datum, index)(rProjector(datum, index)); });
                _super.prototype._drawStep.call(this, step);
            };
            Symbol.prototype._getPixelPoint = function (datum, index) {
                return { x: this._attrToProjector["x"](datum, index), y: this._attrToProjector["y"](datum, index) };
            };
            return Symbol;
        })(_Drawer.Element);
        _Drawer.Symbol = Symbol;
    })(_Drawer = Plottable._Drawer || (Plottable._Drawer = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var AbstractComponent = (function (_super) {
            __extends(AbstractComponent, _super);
            function AbstractComponent() {
                _super.apply(this, arguments);
                this.clipPathEnabled = false;
                this._xAlignProportion = 0; // What % along the free space do we want to position (0 = left, .5 = center, 1 = right)
                this._yAlignProportion = 0;
                this._fixedHeightFlag = false;
                this._fixedWidthFlag = false;
                this._isSetup = false;
                this._isAnchored = false;
                this._interactionsToRegister = [];
                this._boxes = [];
                this._isTopLevelComponent = false;
                this._xOffset = 0; // Offset from Origin, used for alignment and floating positioning
                this._yOffset = 0;
                this._cssClasses = ["component"];
                this._removed = false;
                this._usedLastLayout = false;
            }
            /**
             * Attaches the Component as a child of a given a DOM element. Usually only directly invoked on root-level Components.
             *
             * @param {D3.Selection} element A D3 selection consisting of the element to anchor under.
             */
            AbstractComponent.prototype._anchor = function (element) {
                if (this._removed) {
                    throw new Error("Can't reuse remove()-ed components!");
                }
                if (element.node().nodeName.toLowerCase() === "svg") {
                    // svg node gets the "plottable" CSS class
                    this._rootSVG = element;
                    this._rootSVG.classed("plottable", true);
                    // visible overflow for firefox https://stackoverflow.com/questions/5926986/why-does-firefox-appear-to-truncate-embedded-svgs
                    this._rootSVG.style("overflow", "visible");
                    this._isTopLevelComponent = true;
                }
                if (this._element != null) {
                    // reattach existing element
                    element.node().appendChild(this._element.node());
                }
                else {
                    this._element = element.append("g");
                    this._setup();
                }
                this._isAnchored = true;
            };
            /**
             * Creates additional elements as necessary for the Component to function.
             * Called during _anchor() if the Component's element has not been created yet.
             * Override in subclasses to provide additional functionality.
             */
            AbstractComponent.prototype._setup = function () {
                var _this = this;
                if (this._isSetup) {
                    return;
                }
                this._cssClasses.forEach(function (cssClass) {
                    _this._element.classed(cssClass, true);
                });
                this._cssClasses = null;
                this._backgroundContainer = this._element.append("g").classed("background-container", true);
                this._addBox("background-fill", this._backgroundContainer);
                this._content = this._element.append("g").classed("content", true);
                this._foregroundContainer = this._element.append("g").classed("foreground-container", true);
                this._boxContainer = this._element.append("g").classed("box-container", true);
                if (this.clipPathEnabled) {
                    this._generateClipPath();
                }
                ;
                this._boundingBox = this._addBox("bounding-box");
                this._interactionsToRegister.forEach(function (r) { return _this.registerInteraction(r); });
                this._interactionsToRegister = null;
                this._isSetup = true;
            };
            AbstractComponent.prototype._requestedSpace = function (availableWidth, availableHeight) {
                return { width: 0, height: 0, wantsWidth: false, wantsHeight: false };
            };
            /**
             * Computes the size, position, and alignment from the specified values.
             * If no parameters are supplied and the Component is a root node,
             * they are inferred from the size of the Component's element.
             *
             * @param {number} offeredXOrigin x-coordinate of the origin of the space offered the Component
             * @param {number} offeredYOrigin y-coordinate of the origin of the space offered the Component
             * @param {number} availableWidth available width for the Component to render in
             * @param {number} availableHeight available height for the Component to render in
             */
            AbstractComponent.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                var _this = this;
                if (offeredXOrigin == null || offeredYOrigin == null || availableWidth == null || availableHeight == null) {
                    if (this._element == null) {
                        throw new Error("anchor must be called before computeLayout");
                    }
                    else if (this._isTopLevelComponent) {
                        // we are the root node, retrieve height/width from root SVG
                        offeredXOrigin = 0;
                        offeredYOrigin = 0;
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
                        availableWidth = Plottable._Util.DOM.getElementWidth(elem);
                        availableHeight = Plottable._Util.DOM.getElementHeight(elem);
                    }
                    else {
                        throw new Error("null arguments cannot be passed to _computeLayout() on a non-root node");
                    }
                }
                var size = this._getSize(availableWidth, availableHeight);
                this._width = size.width;
                this._height = size.height;
                this._xOrigin = offeredXOrigin + this._xOffset + (availableWidth - this.width()) * this._xAlignProportion;
                this._yOrigin = offeredYOrigin + this._yOffset + (availableHeight - this.height()) * this._yAlignProportion;
                this._element.attr("transform", "translate(" + this._xOrigin + "," + this._yOrigin + ")");
                this._boxes.forEach(function (b) { return b.attr("width", _this.width()).attr("height", _this.height()); });
            };
            AbstractComponent.prototype._getSize = function (availableWidth, availableHeight) {
                var requestedSpace = this._requestedSpace(availableWidth, availableHeight);
                return {
                    width: this._isFixedWidth() ? Math.min(availableWidth, requestedSpace.width) : availableWidth,
                    height: this._isFixedHeight() ? Math.min(availableHeight, requestedSpace.height) : availableHeight
                };
            };
            AbstractComponent.prototype._render = function () {
                if (this._isAnchored && this._isSetup && this.width() >= 0 && this.height() >= 0) {
                    Plottable.Core.RenderController.registerToRender(this);
                }
            };
            AbstractComponent.prototype._scheduleComputeLayout = function () {
                if (this._isAnchored && this._isSetup) {
                    Plottable.Core.RenderController.registerToComputeLayout(this);
                }
            };
            AbstractComponent.prototype._doRender = function () {
            };
            AbstractComponent.prototype._useLastCalculatedLayout = function (useLast) {
                if (useLast == null) {
                    return this._usedLastLayout;
                }
                else {
                    this._usedLastLayout = useLast;
                    return this;
                }
            };
            AbstractComponent.prototype._invalidateLayout = function () {
                this._useLastCalculatedLayout(false);
                if (this._isAnchored && this._isSetup) {
                    if (this._isTopLevelComponent) {
                        this._scheduleComputeLayout();
                    }
                    else {
                        this._parent()._invalidateLayout();
                    }
                }
            };
            /**
             * Renders the Component into a given DOM element. The element must be as <svg>.
             *
             * @param {String|D3.Selection} element A D3 selection or a selector for getting the element to render into.
             * @returns {Component} The calling component.
             */
            AbstractComponent.prototype.renderTo = function (element) {
                this.detach();
                if (element != null) {
                    var selection;
                    if (typeof (element) === "string") {
                        selection = d3.select(element);
                    }
                    else {
                        selection = element;
                    }
                    if (!selection.node() || selection.node().nodeName.toLowerCase() !== "svg") {
                        throw new Error("Plottable requires a valid SVG to renderTo");
                    }
                    this._anchor(selection);
                }
                if (this._element == null) {
                    throw new Error("If a component has never been rendered before, then renderTo must be given a node to render to, \
          or a D3.Selection, or a selector string");
                }
                this._computeLayout();
                this._render();
                // flush so that consumers can immediately attach to stuff we create in the DOM
                Plottable.Core.RenderController.flush();
                return this;
            };
            /**
             * Causes the Component to recompute layout and redraw.
             *
             * This function should be called when CSS changes could influence the size
             * of the components, e.g. changing the font size.
             *
             * @returns {Component} The calling component.
             */
            AbstractComponent.prototype.redraw = function () {
                this._invalidateLayout();
                return this;
            };
            /**
             * Sets the x alignment of the Component. This will be used if the
             * Component is given more space than it needs.
             *
             * For example, you may want to make a Legend postition itself it the top
             * right, so you would call `legend.xAlign("right")` and
             * `legend.yAlign("top")`.
             *
             * @param {string} alignment The x alignment of the Component (one of ["left", "center", "right"]).
             * @returns {Component} The calling Component.
             */
            AbstractComponent.prototype.xAlign = function (alignment) {
                alignment = alignment.toLowerCase();
                if (alignment === "left") {
                    this._xAlignProportion = 0;
                }
                else if (alignment === "center") {
                    this._xAlignProportion = 0.5;
                }
                else if (alignment === "right") {
                    this._xAlignProportion = 1;
                }
                else {
                    throw new Error("Unsupported alignment");
                }
                this._invalidateLayout();
                return this;
            };
            /**
             * Sets the y alignment of the Component. This will be used if the
             * Component is given more space than it needs.
             *
             * For example, you may want to make a Legend postition itself it the top
             * right, so you would call `legend.xAlign("right")` and
             * `legend.yAlign("top")`.
             *
             * @param {string} alignment The x alignment of the Component (one of ["top", "center", "bottom"]).
             * @returns {Component} The calling Component.
             */
            AbstractComponent.prototype.yAlign = function (alignment) {
                alignment = alignment.toLowerCase();
                if (alignment === "top") {
                    this._yAlignProportion = 0;
                }
                else if (alignment === "center") {
                    this._yAlignProportion = 0.5;
                }
                else if (alignment === "bottom") {
                    this._yAlignProportion = 1;
                }
                else {
                    throw new Error("Unsupported alignment");
                }
                this._invalidateLayout();
                return this;
            };
            /**
             * Sets the x offset of the Component. This will be used if the Component
             * is given more space than it needs.
             *
             * @param {number} offset The desired x offset, in pixels, from the left
             * side of the container.
             * @returns {Component} The calling Component.
             */
            AbstractComponent.prototype.xOffset = function (offset) {
                this._xOffset = offset;
                this._invalidateLayout();
                return this;
            };
            /**
             * Sets the y offset of the Component. This will be used if the Component
             * is given more space than it needs.
             *
             * @param {number} offset The desired y offset, in pixels, from the top
             * side of the container.
             * @returns {Component} The calling Component.
             */
            AbstractComponent.prototype.yOffset = function (offset) {
                this._yOffset = offset;
                this._invalidateLayout();
                return this;
            };
            AbstractComponent.prototype._addBox = function (className, parentElement) {
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
            AbstractComponent.prototype._generateClipPath = function () {
                // The clip path will prevent content from overflowing its component space.
                // HACKHACK: IE <=9 does not respect the HTML base element in SVG.
                // They don't need the current URL in the clip path reference.
                var prefix = /MSIE [5-9]/.test(navigator.userAgent) ? "" : document.location.href;
                prefix = prefix.split("#")[0]; // To fix cases where an anchor tag was used
                this._element.attr("clip-path", "url(\"" + prefix + "#clipPath" + this.getID() + "\")");
                var clipPathParent = this._boxContainer.append("clipPath").attr("id", "clipPath" + this.getID());
                this._addBox("clip-rect", clipPathParent);
            };
            /**
             * Attaches an Interaction to the Component, so that the Interaction will listen for events on the Component.
             *
             * @param {Interaction} interaction The Interaction to attach to the Component.
             * @returns {Component} The calling Component.
             */
            AbstractComponent.prototype.registerInteraction = function (interaction) {
                // Interactions can be registered before or after anchoring. If registered before, they are
                // pushed to this._interactionsToRegister and registered during anchoring. If after, they are
                // registered immediately
                if (this._element) {
                    if (!this._hitBox && interaction._requiresHitbox()) {
                        this._hitBox = this._addBox("hit-box");
                        this._hitBox.style("fill", "#ffffff").style("opacity", 0); // We need to set these so Chrome will register events
                    }
                    interaction._anchor(this, this._hitBox);
                }
                else {
                    this._interactionsToRegister.push(interaction);
                }
                return this;
            };
            AbstractComponent.prototype.classed = function (cssClass, addClass) {
                if (addClass == null) {
                    if (cssClass == null) {
                        return false;
                    }
                    else if (this._element == null) {
                        return (this._cssClasses.indexOf(cssClass) !== -1);
                    }
                    else {
                        return this._element.classed(cssClass);
                    }
                }
                else {
                    if (cssClass == null) {
                        return this;
                    }
                    if (this._element == null) {
                        var classIndex = this._cssClasses.indexOf(cssClass);
                        if (addClass && classIndex === -1) {
                            this._cssClasses.push(cssClass);
                        }
                        else if (!addClass && classIndex !== -1) {
                            this._cssClasses.splice(classIndex, 1);
                        }
                    }
                    else {
                        this._element.classed(cssClass, addClass);
                    }
                    return this;
                }
            };
            /**
             * Checks if the Component has a fixed width or false if it grows to fill available space.
             * Returns false by default on the base Component class.
             *
             * @returns {boolean} Whether the component has a fixed width.
             */
            AbstractComponent.prototype._isFixedWidth = function () {
                return this._fixedWidthFlag;
            };
            /**
             * Checks if the Component has a fixed height or false if it grows to fill available space.
             * Returns false by default on the base Component class.
             *
             * @returns {boolean} Whether the component has a fixed height.
             */
            AbstractComponent.prototype._isFixedHeight = function () {
                return this._fixedHeightFlag;
            };
            AbstractComponent.prototype._merge = function (c, below) {
                var cg;
                if (Plottable.Component.Group.prototype.isPrototypeOf(c)) {
                    cg = c;
                    cg._addComponent(this, below);
                    return cg;
                }
                else {
                    var mergedComponents = below ? [this, c] : [c, this];
                    cg = new Plottable.Component.Group(mergedComponents);
                    return cg;
                }
            };
            /**
             * Merges this Component above another Component, returning a
             * ComponentGroup. This is used to layer Components on top of each other.
             *
             * There are four cases:
             * Component + Component: Returns a ComponentGroup with the first component after the second component.
             * ComponentGroup + Component: Returns the ComponentGroup with the Component prepended.
             * Component + ComponentGroup: Returns the ComponentGroup with the Component appended.
             * ComponentGroup + ComponentGroup: Returns a new ComponentGroup with the first group after the second group.
             *
             * @param {Component} c The component to merge in.
             * @returns {ComponentGroup} The relevant ComponentGroup out of the above four cases.
             */
            AbstractComponent.prototype.above = function (c) {
                return this._merge(c, false);
            };
            /**
             * Merges this Component below another Component, returning a
             * ComponentGroup. This is used to layer Components on top of each other.
             *
             * There are four cases:
             * Component + Component: Returns a ComponentGroup with the first component before the second component.
             * ComponentGroup + Component: Returns the ComponentGroup with the Component appended.
             * Component + ComponentGroup: Returns the ComponentGroup with the Component prepended.
             * ComponentGroup + ComponentGroup: Returns a new ComponentGroup with the first group before the second group.
             *
             * @param {Component} c The component to merge in.
             * @returns {ComponentGroup} The relevant ComponentGroup out of the above four cases.
             */
            AbstractComponent.prototype.below = function (c) {
                return this._merge(c, true);
            };
            /**
             * Detaches a Component from the DOM. The component can be reused.
             *
             * This should only be used if you plan on reusing the calling
             * Components. Otherwise, use remove().
             *
             * @returns The calling Component.
             */
            AbstractComponent.prototype.detach = function () {
                if (this._isAnchored) {
                    this._element.remove();
                }
                var parent = this._parent();
                if (parent != null) {
                    parent._removeComponent(this);
                }
                this._isAnchored = false;
                this._parentElement = null;
                return this;
            };
            AbstractComponent.prototype._parent = function (parentElement) {
                if (parentElement === undefined) {
                    return this._parentElement;
                }
                this.detach();
                this._parentElement = parentElement;
            };
            /**
             * Removes a Component from the DOM and disconnects it from everything it's
             * listening to (effectively destroying it).
             */
            AbstractComponent.prototype.remove = function () {
                this._removed = true;
                this.detach();
            };
            /**
             * Return the width of the component
             *
             * @return {number} width of the component
             */
            AbstractComponent.prototype.width = function () {
                return this._width;
            };
            /**
             * Return the height of the component
             *
             * @return {number} height of the component
             */
            AbstractComponent.prototype.height = function () {
                return this._height;
            };
            /**
             * Gets the origin of the Component relative to its parent.
             *
             * @return {Point} The x-y position of the Component relative to its parent.
             */
            AbstractComponent.prototype.origin = function () {
                return {
                    x: this._xOrigin,
                    y: this._yOrigin
                };
            };
            /**
             * Gets the origin of the Component relative to the root <svg>.
             *
             * @return {Point} The x-y position of the Component relative to the root <svg>
             */
            AbstractComponent.prototype.originToSVG = function () {
                var origin = this.origin();
                var ancestor = this._parent();
                while (ancestor != null) {
                    var ancestorOrigin = ancestor.origin();
                    origin.x += ancestorOrigin.x;
                    origin.y += ancestorOrigin.y;
                    ancestor = ancestor._parent();
                }
                return origin;
            };
            /**
             * Returns the foreground selection for the Component
             * (A selection covering the front of the Component)
             *
             * Will return undefined if the Component has not been anchored.
             *
             * @return {D3.Selection} foreground selection for the Component
             */
            AbstractComponent.prototype.foreground = function () {
                return this._foregroundContainer;
            };
            /**
             * Returns the content selection for the Component
             * (A selection containing the visual elements of the Component)
             *
             * Will return undefined if the Component has not been anchored.
             *
             * @return {D3.Selection} content selection for the Component
             */
            AbstractComponent.prototype.content = function () {
                return this._content;
            };
            /**
             * Returns the background selection for the Component
             * (A selection appearing behind of the Component)
             *
             * Will return undefined if the Component has not been anchored.
             *
             * @return {D3.Selection} background selection for the Component
             */
            AbstractComponent.prototype.background = function () {
                return this._backgroundContainer;
            };
            /**
             * Returns the hitbox selection for the component
             * (A selection in front of the foreground used mainly for interactions)
             *
             * Will return undefined if the component has not been anchored
             *
             * @return {D3.Selection} hitbox selection for the component
             */
            AbstractComponent.prototype.hitBox = function () {
                return this._hitBox;
            };
            return AbstractComponent;
        })(Plottable.Core.PlottableObject);
        Component.AbstractComponent = AbstractComponent;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        /*
         * An abstract ComponentContainer class to encapsulate Table and ComponentGroup's shared functionality.
         * It will not do anything if instantiated directly.
         */
        var AbstractComponentContainer = (function (_super) {
            __extends(AbstractComponentContainer, _super);
            function AbstractComponentContainer() {
                _super.apply(this, arguments);
                this._components = [];
            }
            AbstractComponentContainer.prototype._anchor = function (element) {
                var _this = this;
                _super.prototype._anchor.call(this, element);
                this.components().forEach(function (c) { return c._anchor(_this._content); });
            };
            AbstractComponentContainer.prototype._render = function () {
                this._components.forEach(function (c) { return c._render(); });
            };
            AbstractComponentContainer.prototype._removeComponent = function (c) {
                var removeIndex = this._components.indexOf(c);
                if (removeIndex >= 0) {
                    this.components().splice(removeIndex, 1);
                    this._invalidateLayout();
                }
            };
            AbstractComponentContainer.prototype._addComponent = function (c, prepend) {
                if (prepend === void 0) { prepend = false; }
                if (!c || this._components.indexOf(c) >= 0) {
                    return false;
                }
                if (prepend) {
                    this.components().unshift(c);
                }
                else {
                    this.components().push(c);
                }
                c._parent(this);
                if (this._isAnchored) {
                    c._anchor(this._content);
                }
                this._invalidateLayout();
                return true;
            };
            /**
             * Returns a list of components in the ComponentContainer.
             *
             * @returns {Component[]} the contained Components
             */
            AbstractComponentContainer.prototype.components = function () {
                return this._components;
            };
            /**
             * Returns true iff the ComponentContainer is empty.
             *
             * @returns {boolean} Whether the calling ComponentContainer is empty.
             */
            AbstractComponentContainer.prototype.empty = function () {
                return this._components.length === 0;
            };
            /**
             * Detaches all components contained in the ComponentContainer, and
             * empties the ComponentContainer.
             *
             * @returns {ComponentContainer} The calling ComponentContainer
             */
            AbstractComponentContainer.prototype.detachAll = function () {
                // Calling c.remove() will mutate this._components because the component will call this._parent._removeComponent(this)
                // Since mutating an array while iterating over it is dangerous, we instead iterate over a copy generated by Arr.slice()
                this.components().slice().forEach(function (c) { return c.detach(); });
                return this;
            };
            AbstractComponentContainer.prototype.remove = function () {
                _super.prototype.remove.call(this);
                this.components().slice().forEach(function (c) { return c.remove(); });
            };
            AbstractComponentContainer.prototype._useLastCalculatedLayout = function (calculated) {
                if (calculated != null) {
                    this.components().slice().forEach(function (c) { return c._useLastCalculatedLayout(calculated); });
                }
                return _super.prototype._useLastCalculatedLayout.call(this, calculated);
            };
            return AbstractComponentContainer;
        })(Component.AbstractComponent);
        Component.AbstractComponentContainer = AbstractComponentContainer;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var Group = (function (_super) {
            __extends(Group, _super);
            /**
             * Constructs a Component.Group.
             *
             * A Component.Group is a set of Components that will be rendered on top of
             * each other. When you call Component.above(Component) or Component.below(Component),
             * it creates and returns a Component.Group.
             *
             * Note that the order of the components will determine placement on the z-axis,
             * with the previous items rendered below the later items.
             *
             * @constructor
             * @param {Component[]} components The Components in the resultant Component.Group (default = []).
             */
            function Group(components) {
                var _this = this;
                if (components === void 0) { components = []; }
                _super.call(this);
                this.classed("component-group", true);
                components.forEach(function (c) { return _this._addComponent(c); });
            }
            Group.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var requests = this.components().map(function (c) { return c._requestedSpace(offeredWidth, offeredHeight); });
                return {
                    width: Plottable._Util.Methods.max(requests, function (request) { return request.width; }, 0),
                    height: Plottable._Util.Methods.max(requests, function (request) { return request.height; }, 0),
                    wantsWidth: requests.map(function (r) { return r.wantsWidth; }).some(function (x) { return x; }),
                    wantsHeight: requests.map(function (r) { return r.wantsHeight; }).some(function (x) { return x; })
                };
            };
            Group.prototype._merge = function (c, below) {
                this._addComponent(c, !below);
                return this;
            };
            Group.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                var _this = this;
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
                this.components().forEach(function (c) {
                    c._computeLayout(0, 0, _this.width(), _this.height());
                });
                return this;
            };
            Group.prototype._getSize = function (availableWidth, availableHeight) {
                return {
                    width: availableWidth,
                    height: availableHeight
                };
            };
            Group.prototype._isFixedWidth = function () {
                return this.components().every(function (c) { return c._isFixedWidth(); });
            };
            Group.prototype._isFixedHeight = function () {
                return this.components().every(function (c) { return c._isFixedHeight(); });
            };
            return Group;
        })(Component.AbstractComponentContainer);
        Component.Group = Group;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Axis;
    (function (Axis) {
        var AbstractAxis = (function (_super) {
            __extends(AbstractAxis, _super);
            /**
             * Constructs an axis. An axis is a wrapper around a scale for rendering.
             *
             * @constructor
             * @param {Scale} scale The scale for this axis to render.
             * @param {string} orientation One of ["top", "left", "bottom", "right"];
             * on which side the axis will appear. On most axes, this is either "left"
             * or "bottom".
             * @param {Formatter} Data is passed through this formatter before being
             * displayed.
             */
            function AbstractAxis(scale, orientation, formatter) {
                var _this = this;
                if (formatter === void 0) { formatter = Plottable.Formatters.identity(); }
                _super.call(this);
                this._endTickLength = 5;
                this._tickLength = 5;
                this._tickLabelPadding = 10;
                this._gutter = 15;
                this._showEndTickLabels = false;
                if (scale == null || orientation == null) {
                    throw new Error("Axis requires a scale and orientation");
                }
                this._scale = scale;
                this.orient(orientation);
                this._setDefaultAlignment();
                this.classed("axis", true);
                if (this._isHorizontal()) {
                    this.classed("x-axis", true);
                }
                else {
                    this.classed("y-axis", true);
                }
                this.formatter(formatter);
                this._scale.broadcaster.registerListener(this, function () { return _this._rescale(); });
            }
            AbstractAxis.prototype.remove = function () {
                _super.prototype.remove.call(this);
                this._scale.broadcaster.deregisterListener(this);
            };
            AbstractAxis.prototype._isHorizontal = function () {
                return this._orientation === "top" || this._orientation === "bottom";
            };
            AbstractAxis.prototype._computeWidth = function () {
                // to be overridden by subclass logic
                this._computedWidth = this._maxLabelTickLength();
                return this._computedWidth;
            };
            AbstractAxis.prototype._computeHeight = function () {
                // to be overridden by subclass logic
                this._computedHeight = this._maxLabelTickLength();
                return this._computedHeight;
            };
            AbstractAxis.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var requestedWidth = 0;
                var requestedHeight = 0;
                if (this._isHorizontal()) {
                    if (this._computedHeight == null) {
                        this._computeHeight();
                    }
                    requestedHeight = this._computedHeight + this._gutter;
                }
                else {
                    if (this._computedWidth == null) {
                        this._computeWidth();
                    }
                    requestedWidth = this._computedWidth + this._gutter;
                }
                return {
                    width: requestedWidth,
                    height: requestedHeight,
                    wantsWidth: !this._isHorizontal() && offeredWidth < requestedWidth,
                    wantsHeight: this._isHorizontal() && offeredHeight < requestedHeight
                };
            };
            AbstractAxis.prototype._isFixedHeight = function () {
                return this._isHorizontal();
            };
            AbstractAxis.prototype._isFixedWidth = function () {
                return !this._isHorizontal();
            };
            AbstractAxis.prototype._rescale = function () {
                // default implementation; subclasses may call _invalidateLayout() here
                this._render();
            };
            AbstractAxis.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
                if (this._isHorizontal()) {
                    this._scale.range([0, this.width()]);
                }
                else {
                    this._scale.range([this.height(), 0]);
                }
            };
            AbstractAxis.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._tickMarkContainer = this._content.append("g").classed(AbstractAxis.TICK_MARK_CLASS + "-container", true);
                this._tickLabelContainer = this._content.append("g").classed(AbstractAxis.TICK_LABEL_CLASS + "-container", true);
                this._baseline = this._content.append("line").classed("baseline", true);
            };
            /*
             * Function for generating tick values in data-space (as opposed to pixel values).
             * To be implemented by subclasses.
             */
            AbstractAxis.prototype._getTickValues = function () {
                return [];
            };
            AbstractAxis.prototype._doRender = function () {
                var tickMarkValues = this._getTickValues();
                var tickMarks = this._tickMarkContainer.selectAll("." + AbstractAxis.TICK_MARK_CLASS).data(tickMarkValues);
                tickMarks.enter().append("line").classed(AbstractAxis.TICK_MARK_CLASS, true);
                tickMarks.attr(this._generateTickMarkAttrHash());
                d3.select(tickMarks[0][0]).classed(AbstractAxis.END_TICK_MARK_CLASS, true).attr(this._generateTickMarkAttrHash(true));
                d3.select(tickMarks[0][tickMarkValues.length - 1]).classed(AbstractAxis.END_TICK_MARK_CLASS, true).attr(this._generateTickMarkAttrHash(true));
                tickMarks.exit().remove();
                this._baseline.attr(this._generateBaselineAttrHash());
            };
            AbstractAxis.prototype._generateBaselineAttrHash = function () {
                var baselineAttrHash = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                };
                switch (this._orientation) {
                    case "bottom":
                        baselineAttrHash.x2 = this.width();
                        break;
                    case "top":
                        baselineAttrHash.x2 = this.width();
                        baselineAttrHash.y1 = this.height();
                        baselineAttrHash.y2 = this.height();
                        break;
                    case "left":
                        baselineAttrHash.x1 = this.width();
                        baselineAttrHash.x2 = this.width();
                        baselineAttrHash.y2 = this.height();
                        break;
                    case "right":
                        baselineAttrHash.y2 = this.height();
                        break;
                }
                return baselineAttrHash;
            };
            AbstractAxis.prototype._generateTickMarkAttrHash = function (isEndTickMark) {
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
                var tickLength = isEndTickMark ? this._endTickLength : this._tickLength;
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
            AbstractAxis.prototype._invalidateLayout = function () {
                this._computedWidth = null;
                this._computedHeight = null;
                _super.prototype._invalidateLayout.call(this);
            };
            AbstractAxis.prototype._setDefaultAlignment = function () {
                switch (this._orientation) {
                    case "bottom":
                        this.yAlign("top");
                        break;
                    case "top":
                        this.yAlign("bottom");
                        break;
                    case "left":
                        this.xAlign("right");
                        break;
                    case "right":
                        this.xAlign("left");
                        break;
                }
            };
            AbstractAxis.prototype.formatter = function (formatter) {
                if (formatter === undefined) {
                    return this._formatter;
                }
                this._formatter = formatter;
                this._invalidateLayout();
                return this;
            };
            AbstractAxis.prototype.tickLength = function (length) {
                if (length == null) {
                    return this._tickLength;
                }
                else {
                    if (length < 0) {
                        throw new Error("tick length must be positive");
                    }
                    this._tickLength = length;
                    this._invalidateLayout();
                    return this;
                }
            };
            AbstractAxis.prototype.endTickLength = function (length) {
                if (length == null) {
                    return this._endTickLength;
                }
                else {
                    if (length < 0) {
                        throw new Error("end tick length must be positive");
                    }
                    this._endTickLength = length;
                    this._invalidateLayout();
                    return this;
                }
            };
            AbstractAxis.prototype._maxLabelTickLength = function () {
                if (this.showEndTickLabels()) {
                    return Math.max(this.tickLength(), this.endTickLength());
                }
                else {
                    return this.tickLength();
                }
            };
            AbstractAxis.prototype.tickLabelPadding = function (padding) {
                if (padding == null) {
                    return this._tickLabelPadding;
                }
                else {
                    if (padding < 0) {
                        throw new Error("tick label padding must be positive");
                    }
                    this._tickLabelPadding = padding;
                    this._invalidateLayout();
                    return this;
                }
            };
            AbstractAxis.prototype.gutter = function (size) {
                if (size == null) {
                    return this._gutter;
                }
                else {
                    if (size < 0) {
                        throw new Error("gutter size must be positive");
                    }
                    this._gutter = size;
                    this._invalidateLayout();
                    return this;
                }
            };
            AbstractAxis.prototype.orient = function (newOrientation) {
                if (newOrientation == null) {
                    return this._orientation;
                }
                else {
                    var newOrientationLC = newOrientation.toLowerCase();
                    if (newOrientationLC !== "top" && newOrientationLC !== "bottom" && newOrientationLC !== "left" && newOrientationLC !== "right") {
                        throw new Error("unsupported orientation");
                    }
                    this._orientation = newOrientationLC;
                    this._invalidateLayout();
                    return this;
                }
            };
            AbstractAxis.prototype.showEndTickLabels = function (show) {
                if (show == null) {
                    return this._showEndTickLabels;
                }
                this._showEndTickLabels = show;
                this._render();
                return this;
            };
            /**
             * The css class applied to each end tick mark (the line on the end tick).
             */
            AbstractAxis.END_TICK_MARK_CLASS = "end-tick-mark";
            /**
             * The css class applied to each tick mark (the line on the tick).
             */
            AbstractAxis.TICK_MARK_CLASS = "tick-mark";
            /**
             * The css class applied to each tick label (the text associated with the tick).
             */
            AbstractAxis.TICK_LABEL_CLASS = "tick-label";
            return AbstractAxis;
        })(Plottable.Component.AbstractComponent);
        Axis.AbstractAxis = AbstractAxis;
    })(Axis = Plottable.Axis || (Plottable.Axis = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Axis;
    (function (Axis) {
        var Time = (function (_super) {
            __extends(Time, _super);
            /**
             * Constructs a TimeAxis.
             *
             * A TimeAxis is used for rendering a TimeScale.
             *
             * @constructor
             * @param {TimeScale} scale The scale to base the Axis on.
             * @param {string} orientation The orientation of the Axis (top/bottom)
             */
            function Time(scale, orientation) {
                _super.call(this, scale, orientation);
                this._tierLabelPositions = [];
                this.classed("time-axis", true);
                this.tickLabelPadding(5);
                this.axisConfigurations(Time._DEFAULT_TIME_AXIS_CONFIGURATIONS);
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
                    this._invalidateLayout();
                    return this;
                }
            };
            Time.prototype.axisConfigurations = function (configurations) {
                if (configurations == null) {
                    return this._possibleTimeAxisConfigurations;
                }
                this._possibleTimeAxisConfigurations = configurations;
                this._numTiers = Plottable._Util.Methods.max(this._possibleTimeAxisConfigurations.map(function (config) { return config.length; }), 0);
                if (this._isAnchored) {
                    this._setupDomElements();
                }
                var oldLabelPositions = this.tierLabelPositions();
                var newLabelPositions = [];
                for (var i = 0; i < this._numTiers; i++) {
                    newLabelPositions.push(oldLabelPositions[i] || "between");
                }
                this.tierLabelPositions(newLabelPositions);
                this._invalidateLayout();
                return this;
            };
            /**
             * Gets the index of the most precise TimeAxisConfiguration that will fit in the current width.
             */
            Time.prototype._getMostPreciseConfigurationIndex = function () {
                var _this = this;
                var mostPreciseIndex = this._possibleTimeAxisConfigurations.length;
                this._possibleTimeAxisConfigurations.forEach(function (interval, index) {
                    if (index < mostPreciseIndex && interval.every(function (tier) { return _this._checkTimeAxisTierConfigurationWidth(tier); })) {
                        mostPreciseIndex = index;
                    }
                });
                if (mostPreciseIndex === this._possibleTimeAxisConfigurations.length) {
                    Plottable._Util.Methods.warn("zoomed out too far: could not find suitable interval to display labels");
                    --mostPreciseIndex;
                }
                return mostPreciseIndex;
            };
            Time.prototype.orient = function (orientation) {
                if (orientation && (orientation.toLowerCase() === "right" || orientation.toLowerCase() === "left")) {
                    throw new Error(orientation + " is not a supported orientation for TimeAxis - only horizontal orientations are supported");
                }
                return _super.prototype.orient.call(this, orientation); // maintains getter-setter functionality
            };
            Time.prototype._computeHeight = function () {
                var textHeight = this._measurer.measure().height;
                this._tierHeights = [];
                for (var i = 0; i < this._numTiers; i++) {
                    this._tierHeights.push(textHeight + this.tickLabelPadding() + ((this._tierLabelPositions[i]) === "between" ? 0 : this._maxLabelTickLength()));
                }
                this._computedHeight = d3.sum(this._tierHeights);
                return this._computedHeight;
            };
            Time.prototype._getIntervalLength = function (config) {
                var startDate = this._scale.domain()[0];
                var endDate = config.interval.offset(startDate, config.step);
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
            Time.prototype._getSize = function (availableWidth, availableHeight) {
                // Makes sure that the size it requires is a multiple of tier sizes, such that
                // we have no leftover tiers
                var size = _super.prototype._getSize.call(this, availableWidth, availableHeight);
                size.height = this._tierHeights.reduce(function (prevValue, currValue, index, arr) {
                    return (prevValue + currValue > size.height) ? prevValue : (prevValue + currValue);
                });
                return size;
            };
            Time.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._setupDomElements();
            };
            Time.prototype._setupDomElements = function () {
                this._element.selectAll("." + Time.TIME_AXIS_TIER_CLASS).remove();
                this._tierLabelContainers = [];
                this._tierMarkContainers = [];
                this._tierBaselines = [];
                this._tickLabelContainer.remove();
                this._baseline.remove();
                for (var i = 0; i < this._numTiers; ++i) {
                    var tierContainer = this._content.append("g").classed(Time.TIME_AXIS_TIER_CLASS, true);
                    this._tierLabelContainers.push(tierContainer.append("g").classed(Axis.AbstractAxis.TICK_LABEL_CLASS + "-container", true));
                    this._tierMarkContainers.push(tierContainer.append("g").classed(Axis.AbstractAxis.TICK_MARK_CLASS + "-container", true));
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
                    this._tierLabelContainers[index].selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).remove();
                    this._tierMarkContainers[index].selectAll("." + Axis.AbstractAxis.TICK_MARK_CLASS).remove();
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
                var tickLabels = container.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).data(labelPos, function (d) { return d.valueOf(); });
                var tickLabelsEnter = tickLabels.enter().append("g").classed(Axis.AbstractAxis.TICK_LABEL_CLASS, true);
                tickLabelsEnter.append("text");
                var xTranslate = (this._tierLabelPositions[index] === "center" || config.step === 1) ? 0 : this.tickLabelPadding();
                var markLength = this._measurer.measure().height;
                var yTranslate = this.orient() === "bottom" ? d3.sum(this._tierHeights.slice(0, index + 1)) - this.tickLabelPadding() : this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding();
                var textSelection = tickLabels.selectAll("text");
                if (textSelection.size() > 0) {
                    Plottable._Util.DOM.translate(textSelection, xTranslate, yTranslate);
                }
                tickLabels.exit().remove();
                tickLabels.attr("transform", function (d) { return "translate(" + _this._scale.scale(d) + ",0)"; });
                var anchor = (this._tierLabelPositions[index] === "center" || config.step === 1) ? "middle" : "start";
                tickLabels.selectAll("text").text(config.formatter).style("text-anchor", anchor);
            };
            Time.prototype._renderTickMarks = function (tickValues, index) {
                var tickMarks = this._tierMarkContainers[index].selectAll("." + Axis.AbstractAxis.TICK_MARK_CLASS).data(tickValues);
                tickMarks.enter().append("line").classed(Axis.AbstractAxis.TICK_MARK_CLASS, true);
                var attr = this._generateTickMarkAttrHash();
                var offset = this._tierHeights.slice(0, index).reduce(function (translate, height) { return translate + height; }, 0);
                if (this.orient() === "bottom") {
                    attr["y1"] = offset;
                    attr["y2"] = offset + (this._tierLabelPositions[index] === "center" ? this.tickLength() : this._tierHeights[index]);
                }
                else {
                    attr["y1"] = this.height() - offset;
                    attr["y2"] = this.height() - (offset + (this._tierLabelPositions[index] === "center" ? this.tickLength() : this._tierHeights[index]));
                }
                tickMarks.attr(attr);
                if (this.orient() === "bottom") {
                    attr["y1"] = offset;
                    attr["y2"] = offset + this._tierHeights[index];
                }
                else {
                    attr["y1"] = this.height() - offset;
                    attr["y2"] = this.height() - (offset + this._tierHeights[index]);
                }
                d3.select(tickMarks[0][0]).attr(attr);
                // Add end-tick classes to first and last tick for CSS customization purposes
                d3.select(tickMarks[0][0]).classed(Axis.AbstractAxis.END_TICK_MARK_CLASS, true);
                d3.select(tickMarks[0][tickMarks.size() - 1]).classed(Axis.AbstractAxis.END_TICK_MARK_CLASS, true);
                tickMarks.exit().remove();
            };
            Time.prototype._renderLabellessTickMarks = function (tickValues) {
                var tickMarks = this._tickMarkContainer.selectAll("." + Axis.AbstractAxis.TICK_MARK_CLASS).data(tickValues);
                tickMarks.enter().append("line").classed(Axis.AbstractAxis.TICK_MARK_CLASS, true);
                var attr = this._generateTickMarkAttrHash();
                attr["y2"] = (this.orient() === "bottom") ? this.tickLabelPadding() : this.height() - this.tickLabelPadding();
                tickMarks.attr(attr);
                tickMarks.exit().remove();
            };
            Time.prototype._generateLabellessTicks = function () {
                if (this._mostPreciseConfigIndex < 1) {
                    return [];
                }
                return this._getTickIntervalValues(this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex - 1][0]);
            };
            Time.prototype._doRender = function () {
                var _this = this;
                this._mostPreciseConfigIndex = this._getMostPreciseConfigurationIndex();
                var tierConfigs = this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex];
                this._cleanTiers();
                tierConfigs.forEach(function (config, i) { return _this._renderTierLabels(_this._tierLabelContainers[i], config, i); });
                var tierTicks = tierConfigs.map(function (config, i) { return _this._getTickValuesForConfiguration(config); });
                var baselineOffset = 0;
                for (var i = 0; i < Math.max(tierConfigs.length, 1); ++i) {
                    var attr = this._generateBaselineAttrHash();
                    attr["y1"] += (this.orient() === "bottom") ? baselineOffset : -baselineOffset;
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
                for (i = 0; i < tierConfigs.length; ++i) {
                    this._renderTickMarks(tierTicks[i], i);
                    this._hideOverlappingAndCutOffLabels(i);
                }
                return this;
            };
            Time.prototype._hideOverflowingTiers = function () {
                var _this = this;
                var availableHeight = this.height();
                var usedHeight = 0;
                this._element.selectAll("." + Time.TIME_AXIS_TIER_CLASS).attr("visibility", function (d, i) {
                    usedHeight += _this._tierHeights[i];
                    return usedHeight <= availableHeight ? "inherit" : "hidden";
                });
            };
            Time.prototype._hideOverlappingAndCutOffLabels = function (index) {
                var _this = this;
                var boundingBox = this._element.select(".bounding-box")[0][0].getBoundingClientRect();
                var isInsideBBox = function (tickBox) {
                    return (Math.floor(boundingBox.left) <= Math.ceil(tickBox.left) && Math.floor(boundingBox.top) <= Math.ceil(tickBox.top) && Math.floor(tickBox.right) <= Math.ceil(boundingBox.left + _this.width()) && Math.floor(tickBox.bottom) <= Math.ceil(boundingBox.top + _this.height()));
                };
                var visibleTickMarks = this._tierMarkContainers[index].selectAll("." + Axis.AbstractAxis.TICK_MARK_CLASS).filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return visibility === "visible" || visibility === "inherit";
                });
                // We use the ClientRects because x1/x2 attributes are not comparable to ClientRects of labels
                var visibleTickMarkRects = visibleTickMarks[0].map(function (mark) { return mark.getBoundingClientRect(); });
                var visibleTickLabels = this._tierLabelContainers[index].selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return visibility === "visible" || visibility === "inherit";
                });
                var lastLabelClientRect;
                visibleTickLabels.each(function (d, i) {
                    var clientRect = this.getBoundingClientRect();
                    var tickLabel = d3.select(this);
                    var leadingTickMark = visibleTickMarkRects[i];
                    var trailingTickMark = visibleTickMarkRects[i + 1];
                    if (!isInsideBBox(clientRect) || (lastLabelClientRect != null && Plottable._Util.DOM.boxesOverlap(clientRect, lastLabelClientRect)) || (leadingTickMark.right > clientRect.left || trailingTickMark.left < clientRect.right)) {
                        tickLabel.style("visibility", "hidden");
                    }
                    else {
                        lastLabelClientRect = clientRect;
                        tickLabel.style("visibility", "inherit");
                    }
                });
            };
            /**
             * The css class applied to each time axis tier
             */
            Time.TIME_AXIS_TIER_CLASS = "time-axis-tier";
            /*
             * Default possible axis configurations.
             */
            Time._DEFAULT_TIME_AXIS_CONFIGURATIONS = [
                [
                    { interval: d3.time.second, step: 1, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.second, step: 5, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.second, step: 10, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.second, step: 15, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.second, step: 30, formatter: Plottable.Formatters.time("%I:%M:%S %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.minute, step: 1, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.minute, step: 5, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.minute, step: 10, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.minute, step: 15, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.minute, step: 30, formatter: Plottable.Formatters.time("%I:%M %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.hour, step: 1, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.hour, step: 3, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.hour, step: 6, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.hour, step: 12, formatter: Plottable.Formatters.time("%I %p") },
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%B %e, %Y") }
                ],
                [
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%a %e") },
                    { interval: d3.time.month, step: 1, formatter: Plottable.Formatters.time("%B %Y") }
                ],
                [
                    { interval: d3.time.day, step: 1, formatter: Plottable.Formatters.time("%e") },
                    { interval: d3.time.month, step: 1, formatter: Plottable.Formatters.time("%B %Y") }
                ],
                [
                    { interval: d3.time.month, step: 1, formatter: Plottable.Formatters.time("%B") },
                    { interval: d3.time.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.month, step: 1, formatter: Plottable.Formatters.time("%b") },
                    { interval: d3.time.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.month, step: 3, formatter: Plottable.Formatters.time("%b") },
                    { interval: d3.time.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.month, step: 6, formatter: Plottable.Formatters.time("%b") },
                    { interval: d3.time.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 1, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 1, formatter: Plottable.Formatters.time("%y") }
                ],
                [
                    { interval: d3.time.year, step: 5, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 25, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 50, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 100, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 200, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 500, formatter: Plottable.Formatters.time("%Y") }
                ],
                [
                    { interval: d3.time.year, step: 1000, formatter: Plottable.Formatters.time("%Y") }
                ]
            ];
            Time._LONG_DATE = new Date(9999, 8, 29, 12, 59, 9999);
            return Time;
        })(Axis.AbstractAxis);
        Axis.Time = Time;
    })(Axis = Plottable.Axis || (Plottable.Axis = {}));
})(Plottable || (Plottable = {}));

//<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Axis;
    (function (Axis) {
        var Numeric = (function (_super) {
            __extends(Numeric, _super);
            /**
             * Constructs a NumericAxis.
             *
             * Just as an CategoryAxis is for rendering an OrdinalScale, a NumericAxis
             * is for rendering a QuantitativeScale.
             *
             * @constructor
             * @param {QuantitativeScale} scale The QuantitativeScale to base the axis on.
             * @param {string} orientation The orientation of the QuantitativeScale (top/bottom/left/right)
             * @param {Formatter} formatter A function to format tick labels (default Formatters.general()).
             */
            function Numeric(scale, orientation, formatter) {
                if (formatter === void 0) { formatter = Plottable.Formatters.general(); }
                _super.call(this, scale, orientation, formatter);
                this._tickLabelPositioning = "center";
                // Whether or not first/last tick label will still be displayed even if
                // the label is cut off.
                this._showFirstTickLabel = false;
                this._showLastTickLabel = false;
            }
            Numeric.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._measurer = new SVGTypewriter.Measurers.Measurer(this._tickLabelContainer, Axis.AbstractAxis.TICK_LABEL_CLASS);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper().maxLines(1);
            };
            Numeric.prototype._computeWidth = function () {
                var _this = this;
                var tickValues = this._getTickValues();
                var textLengths = tickValues.map(function (v) {
                    var formattedValue = _this.formatter()(v);
                    return _this._measurer.measure(formattedValue).width;
                });
                var maxTextLength = Plottable._Util.Methods.max(textLengths, 0);
                if (this._tickLabelPositioning === "center") {
                    this._computedWidth = this._maxLabelTickLength() + this.tickLabelPadding() + maxTextLength;
                }
                else {
                    this._computedWidth = Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + maxTextLength);
                }
                return this._computedWidth;
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
                    if (reComputedWidth > this.width() || reComputedWidth < (this.width() - this.gutter())) {
                        this._invalidateLayout();
                        return;
                    }
                }
                this._render();
            };
            Numeric.prototype._doRender = function () {
                var _this = this;
                _super.prototype._doRender.call(this);
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
                switch (this.orient()) {
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
                var tickLabels = this._tickLabelContainer.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).data(tickLabelValues);
                tickLabels.enter().append("text").classed(Axis.AbstractAxis.TICK_LABEL_CLASS, true);
                tickLabels.exit().remove();
                tickLabels.style("text-anchor", tickLabelTextAnchor).style("visibility", "inherit").attr(tickLabelAttrHash).text(function (s) {
                    var formattedText = _this.formatter()(s);
                    if (!_this._isHorizontal()) {
                        var availableTextSpace = _this.width() - _this.tickLabelPadding();
                        availableTextSpace -= _this._tickLabelPositioning === "center" ? _this._maxLabelTickLength() : 0;
                        formattedText = _this._wrapper.wrap(formattedText, _this._measurer, availableTextSpace).wrappedText;
                    }
                    return formattedText;
                });
                var labelGroupTransform = "translate(" + labelGroupTransformX + ", " + labelGroupTransformY + ")";
                this._tickLabelContainer.attr("transform", labelGroupTransform);
                this._showAllTickMarks();
                if (!this.showEndTickLabels()) {
                    this._hideEndTickLabels();
                }
                this._hideOverflowingTickLabels();
                this._hideOverlappingTickLabels();
                if (this._tickLabelPositioning === "bottom" || this._tickLabelPositioning === "top" || this._tickLabelPositioning === "left" || this._tickLabelPositioning === "right") {
                    this._hideTickMarksWithoutLabel();
                }
            };
            Numeric.prototype._showAllTickMarks = function () {
                var visibleTickMarks = this._tickMarkContainer.selectAll("." + Axis.AbstractAxis.TICK_MARK_CLASS).each(function () {
                    d3.select(this).style("visibility", "inherit");
                });
            };
            /**
             * Hides the Tick Marks which have no corresponding Tick Labels
             */
            Numeric.prototype._hideTickMarksWithoutLabel = function () {
                var visibleTickMarks = this._tickMarkContainer.selectAll("." + Axis.AbstractAxis.TICK_MARK_CLASS);
                var visibleTickLabels = this._tickLabelContainer.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).filter(function (d, i) {
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
                    this._invalidateLayout();
                    return this;
                }
            };
            Numeric.prototype.showEndTickLabel = function (orientation, show) {
                if ((this._isHorizontal() && orientation === "left") || (!this._isHorizontal() && orientation === "bottom")) {
                    if (show === undefined) {
                        return this._showFirstTickLabel;
                    }
                    else {
                        this._showFirstTickLabel = show;
                        this._render();
                        return this;
                    }
                }
                else if ((this._isHorizontal() && orientation === "right") || (!this._isHorizontal() && orientation === "top")) {
                    if (show === undefined) {
                        return this._showLastTickLabel;
                    }
                    else {
                        this._showLastTickLabel = show;
                        this._render();
                        return this;
                    }
                }
                else {
                    throw new Error("Attempt to show " + orientation + " tick label on a " + (this._isHorizontal() ? "horizontal" : "vertical") + " axis");
                }
            };
            Numeric.prototype._hideEndTickLabels = function () {
                var boundingBox = this._boundingBox.node().getBoundingClientRect();
                var tickLabels = this._tickLabelContainer.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS);
                if (tickLabels[0].length === 0) {
                    return;
                }
                var firstTickLabel = tickLabels[0][0];
                if (!Plottable._Util.DOM.boxIsInside(firstTickLabel.getBoundingClientRect(), boundingBox)) {
                    d3.select(firstTickLabel).style("visibility", "hidden");
                }
                var lastTickLabel = tickLabels[0][tickLabels[0].length - 1];
                if (!Plottable._Util.DOM.boxIsInside(lastTickLabel.getBoundingClientRect(), boundingBox)) {
                    d3.select(lastTickLabel).style("visibility", "hidden");
                }
            };
            // Responsible for hiding any tick labels that break out of the bounding container
            Numeric.prototype._hideOverflowingTickLabels = function () {
                var boundingBox = this._boundingBox.node().getBoundingClientRect();
                var tickLabels = this._tickLabelContainer.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS);
                if (tickLabels.empty()) {
                    return;
                }
                tickLabels.each(function (d, i) {
                    if (!Plottable._Util.DOM.boxIsInside(this.getBoundingClientRect(), boundingBox)) {
                        d3.select(this).style("visibility", "hidden");
                    }
                });
            };
            Numeric.prototype._hideOverlappingTickLabels = function () {
                var visibleTickLabels = this._tickLabelContainer.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).filter(function (d, i) {
                    var visibility = d3.select(this).style("visibility");
                    return (visibility === "inherit") || (visibility === "visible");
                });
                var lastLabelClientRect;
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
                if (this._tickLabelPositioning === "bottom" || this._tickLabelPositioning === "top" || this._tickLabelPositioning === "left" || this._tickLabelPositioning === "right") {
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
        })(Axis.AbstractAxis);
        Axis.Numeric = Numeric;
    })(Axis = Plottable.Axis || (Plottable.Axis = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Axis;
    (function (Axis) {
        var Category = (function (_super) {
            __extends(Category, _super);
            /**
             * Constructs a CategoryAxis.
             *
             * A CategoryAxis takes a CategoryScale and includes word-wrapping
             * algorithms and advanced layout logic to try to display the scale as
             * efficiently as possible.
             *
             * @constructor
             * @param {CategoryScale} scale The scale to base the Axis on.
             * @param {string} orientation The orientation of the Axis (top/bottom/left/right) (default = "bottom").
             * @param {Formatter} formatter The Formatter for the Axis (default Formatters.identity())
             */
            function Category(scale, orientation, formatter) {
                if (orientation === void 0) { orientation = "bottom"; }
                if (formatter === void 0) { formatter = Plottable.Formatters.identity(); }
                _super.call(this, scale, orientation, formatter);
                this._tickLabelAngle = 0;
                this.classed("category-axis", true);
            }
            Category.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._measurer = new SVGTypewriter.Measurers.CacheCharacterMeasurer(this._tickLabelContainer);
                this._wrapper = new SVGTypewriter.Wrappers.SingleLineWrapper();
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
            };
            Category.prototype._rescale = function () {
                return this._invalidateLayout();
            };
            Category.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var widthRequiredByTicks = this._isHorizontal() ? 0 : this._maxLabelTickLength() + this.tickLabelPadding() + this.gutter();
                var heightRequiredByTicks = this._isHorizontal() ? this._maxLabelTickLength() + this.tickLabelPadding() + this.gutter() : 0;
                if (this._scale.domain().length === 0) {
                    return { width: 0, height: 0, wantsWidth: false, wantsHeight: false };
                }
                var categoryScale = this._scale;
                var fakeScale = categoryScale.copy();
                if (this._isHorizontal()) {
                    fakeScale.range([0, offeredWidth]);
                }
                else {
                    fakeScale.range([offeredHeight, 0]);
                }
                var textResult = this._measureTicks(offeredWidth, offeredHeight, fakeScale, categoryScale.domain());
                return {
                    width: textResult.usedWidth + widthRequiredByTicks,
                    height: textResult.usedHeight + heightRequiredByTicks,
                    wantsWidth: !textResult.textFits,
                    wantsHeight: !textResult.textFits
                };
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
                this._invalidateLayout();
                return this;
            };
            /**
             * Measures the size of the ticks while also writing them to the DOM.
             * @param {D3.Selection} ticks The tick elements to be written to.
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
                        xAlign: xAlign[self.orient()],
                        yAlign: yAlign[self.orient()],
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
                var wrappingResults = ticks.map(function (s) {
                    var bandWidth = scale.stepWidth();
                    // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
                    var width = axisWidth - _this._maxLabelTickLength() - _this.tickLabelPadding(); // default for left/right
                    if (_this._isHorizontal()) {
                        width = bandWidth; // defaults to the band width
                        if (_this._tickLabelAngle !== 0) {
                            width = axisHeight - _this._maxLabelTickLength() - _this.tickLabelPadding(); // use the axis height
                        }
                        // HACKHACK: Wrapper fails under negative circumstances
                        width = Math.max(width, 0);
                    }
                    // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
                    var height = bandWidth; // default for left/right
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
                var widthFn = (this._isHorizontal() && this._tickLabelAngle === 0) ? d3.sum : Plottable._Util.Methods.max;
                var heightFn = (this._isHorizontal() && this._tickLabelAngle === 0) ? Plottable._Util.Methods.max : d3.sum;
                var textFits = wrappingResults.every(function (t) { return !SVGTypewriter.Utils.StringMethods.isNotEmptyString(t.truncatedText) && t.noLines === 1; });
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
            Category.prototype._doRender = function () {
                var _this = this;
                _super.prototype._doRender.call(this);
                var catScale = this._scale;
                var tickLabels = this._tickLabelContainer.selectAll("." + Axis.AbstractAxis.TICK_LABEL_CLASS).data(this._scale.domain(), function (d) { return d; });
                var getTickLabelTransform = function (d, i) {
                    var innerPaddingWidth = catScale.stepWidth() - catScale.rangeBand();
                    var scaledValue = catScale.scale(d) - catScale.rangeBand() / 2 - innerPaddingWidth / 2;
                    var x = _this._isHorizontal() ? scaledValue : 0;
                    var y = _this._isHorizontal() ? 0 : scaledValue;
                    return "translate(" + x + "," + y + ")";
                };
                tickLabels.enter().append("g").classed(Axis.AbstractAxis.TICK_LABEL_CLASS, true);
                tickLabels.exit().remove();
                tickLabels.attr("transform", getTickLabelTransform);
                // erase all text first, then rewrite
                tickLabels.text("");
                this._drawTicks(this.width(), this.height(), catScale, tickLabels);
                var translate = this._isHorizontal() ? [catScale.rangeBand() / 2, 0] : [0, catScale.rangeBand() / 2];
                var xTranslate = this.orient() === "right" ? this._maxLabelTickLength() + this.tickLabelPadding() : 0;
                var yTranslate = this.orient() === "bottom" ? this._maxLabelTickLength() + this.tickLabelPadding() : 0;
                Plottable._Util.DOM.translate(this._tickLabelContainer, xTranslate, yTranslate);
                return this;
            };
            Category.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                // When anyone calls _invalidateLayout, _computeLayout will be called
                // on everyone, including this. Since CSS or something might have
                // affected the size of the characters, clear the cache.
                this._measurer.reset();
                return _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
            };
            return Category;
        })(Axis.AbstractAxis);
        Axis.Category = Category;
    })(Axis = Plottable.Axis || (Plottable.Axis = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var Label = (function (_super) {
            __extends(Label, _super);
            /**
             * Creates a Label.
             *
             * A label is component that renders just text. The most common use of
             * labels is to create a title or axis labels.
             *
             * @constructor
             * @param {string} displayText The text of the Label (default = "").
             * @param {string} orientation The orientation of the Label (horizontal/left/right) (default = "horizontal").
             */
            function Label(displayText, orientation) {
                if (displayText === void 0) { displayText = ""; }
                if (orientation === void 0) { orientation = "horizontal"; }
                _super.call(this);
                this.classed("label", true);
                this.text(displayText);
                this.orient(orientation);
                this.xAlign("center").yAlign("center");
                this._fixedHeightFlag = true;
                this._fixedWidthFlag = true;
                this._padding = 0;
            }
            /**
             * Sets the horizontal side the label will go to given the label is given more space that it needs
             *
             * @param {string} alignment The new setting, one of `["left", "center",
             * "right"]`. Defaults to `"center"`.
             * @returns {Label} The calling Label.
             */
            Label.prototype.xAlign = function (alignment) {
                var alignmentLC = alignment.toLowerCase();
                _super.prototype.xAlign.call(this, alignmentLC);
                this._xAlignment = alignmentLC;
                return this;
            };
            /**
             * Sets the vertical side the label will go to given the label is given more space that it needs
             *
             * @param {string} alignment The new setting, one of `["top", "center",
             * "bottom"]`. Defaults to `"center"`.
             * @returns {Label} The calling Label.
             */
            Label.prototype.yAlign = function (alignment) {
                var alignmentLC = alignment.toLowerCase();
                _super.prototype.yAlign.call(this, alignmentLC);
                this._yAlignment = alignmentLC;
                return this;
            };
            Label.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var desiredWH = this._measurer.measure(this._text);
                var desiredWidth = (this.orient() === "horizontal" ? desiredWH.width : desiredWH.height) + 2 * this.padding();
                var desiredHeight = (this.orient() === "horizontal" ? desiredWH.height : desiredWH.width) + 2 * this.padding();
                return {
                    width: desiredWidth,
                    height: desiredHeight,
                    wantsWidth: desiredWidth > offeredWidth,
                    wantsHeight: desiredHeight > offeredHeight
                };
            };
            Label.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._textContainer = this._content.append("g");
                this._measurer = new SVGTypewriter.Measurers.Measurer(this._textContainer);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
                this.text(this._text);
            };
            Label.prototype.text = function (displayText) {
                if (displayText === undefined) {
                    return this._text;
                }
                else {
                    this._text = displayText;
                    this._invalidateLayout();
                    return this;
                }
            };
            Label.prototype.orient = function (newOrientation) {
                if (newOrientation == null) {
                    return this._orientation;
                }
                else {
                    newOrientation = newOrientation.toLowerCase();
                    if (newOrientation === "horizontal" || newOrientation === "left" || newOrientation === "right") {
                        this._orientation = newOrientation;
                    }
                    else {
                        throw new Error(newOrientation + " is not a valid orientation for LabelComponent");
                    }
                    this._invalidateLayout();
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
                        throw new Error(padAmount + " is not a valid padding value.  Cannot be less than 0.");
                    }
                    this._padding = padAmount;
                    this._invalidateLayout();
                    return this;
                }
            };
            Label.prototype._doRender = function () {
                _super.prototype._doRender.call(this);
                // HACKHACK SVGTypewriter should remove existing content - #21 on SVGTypewriter.
                this._textContainer.selectAll("g").remove();
                var textMeasurement = this._measurer.measure(this._text);
                var heightPadding = Math.max(Math.min((this.height() - textMeasurement.height) / 2, this.padding()), 0);
                var widthPadding = Math.max(Math.min((this.width() - textMeasurement.width) / 2, this.padding()), 0);
                this._textContainer.attr("transform", "translate(" + widthPadding + "," + heightPadding + ")");
                var writeWidth = this.width() - 2 * widthPadding;
                var writeHeight = this.height() - 2 * heightPadding;
                var textRotation = { horizontal: 0, right: 90, left: -90 };
                var writeOptions = {
                    selection: this._textContainer,
                    xAlign: this._xAlignment,
                    yAlign: this._yAlignment,
                    textRotation: textRotation[this.orient()]
                };
                this._writer.write(this._text, writeWidth, writeHeight, writeOptions);
            };
            return Label;
        })(Component.AbstractComponent);
        Component.Label = Label;
        var TitleLabel = (function (_super) {
            __extends(TitleLabel, _super);
            /**
             * Creates a TitleLabel, a type of label made for rendering titles.
             *
             * @constructor
             */
            function TitleLabel(text, orientation) {
                _super.call(this, text, orientation);
                this.classed("title-label", true);
            }
            return TitleLabel;
        })(Label);
        Component.TitleLabel = TitleLabel;
        var AxisLabel = (function (_super) {
            __extends(AxisLabel, _super);
            /**
             * Creates a AxisLabel, a type of label made for rendering axis labels.
             *
             * @constructor
             */
            function AxisLabel(text, orientation) {
                _super.call(this, text, orientation);
                this.classed("axis-label", true);
            }
            return AxisLabel;
        })(Label);
        Component.AxisLabel = AxisLabel;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var Legend = (function (_super) {
            __extends(Legend, _super);
            /**
             * Creates a Legend.
             *
             * The legend consists of a series of legend entries, each with a color and label taken from the `colorScale`.
             * The entries will be displayed in the order of the `colorScale` domain.
             *
             * @constructor
             * @param {Scale.Color} colorScale
             */
            function Legend(colorScale) {
                var _this = this;
                _super.call(this);
                this._padding = 5;
                this.classed("legend", true);
                this.maxEntriesPerRow(1);
                if (colorScale == null) {
                    throw new Error("Legend requires a colorScale");
                }
                this._scale = colorScale;
                this._scale.broadcaster.registerListener(this, function () { return _this._invalidateLayout(); });
                this.xAlign("right").yAlign("top");
                this._fixedWidthFlag = true;
                this._fixedHeightFlag = true;
                this._sortFn = function (a, b) { return _this._scale.domain().indexOf(a) - _this._scale.domain().indexOf(b); };
                this._symbolFactoryAccessor = function () { return Plottable.SymbolFactories.circle(); };
            }
            Legend.prototype._setup = function () {
                _super.prototype._setup.call(this);
                var fakeLegendRow = this._content.append("g").classed(Legend.LEGEND_ROW_CLASS, true);
                var fakeLegendEntry = fakeLegendRow.append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
                fakeLegendEntry.append("text");
                this._measurer = new SVGTypewriter.Measurers.Measurer(fakeLegendRow);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper().maxLines(1);
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper).addTitleElement(true);
            };
            Legend.prototype.maxEntriesPerRow = function (numEntries) {
                if (numEntries == null) {
                    return this._maxEntriesPerRow;
                }
                else {
                    this._maxEntriesPerRow = numEntries;
                    this._invalidateLayout();
                    return this;
                }
            };
            Legend.prototype.sortFunction = function (newFn) {
                if (newFn == null) {
                    return this._sortFn;
                }
                else {
                    this._sortFn = newFn;
                    this._invalidateLayout();
                    return this;
                }
            };
            Legend.prototype.scale = function (scale) {
                var _this = this;
                if (scale != null) {
                    this._scale.broadcaster.deregisterListener(this);
                    this._scale = scale;
                    this._scale.broadcaster.registerListener(this, function () { return _this._invalidateLayout(); });
                    this._invalidateLayout();
                    return this;
                }
                else {
                    return this._scale;
                }
            };
            Legend.prototype.remove = function () {
                _super.prototype.remove.call(this);
                this._scale.broadcaster.deregisterListener(this);
            };
            Legend.prototype._calculateLayoutInfo = function (availableWidth, availableHeight) {
                var _this = this;
                var textHeight = this._measurer.measure().height;
                var availableWidthForEntries = Math.max(0, (availableWidth - this._padding));
                var measureEntry = function (entryText) {
                    var originalEntryLength = (textHeight + _this._measurer.measure(entryText).width + _this._padding);
                    return Math.min(originalEntryLength, availableWidthForEntries);
                };
                var entries = this._scale.domain().slice();
                entries.sort(this.sortFunction());
                var entryLengths = Plottable._Util.Methods.populateMap(entries, measureEntry);
                var rows = this._packRows(availableWidthForEntries, entries, entryLengths);
                var rowsAvailable = Math.floor((availableHeight - 2 * this._padding) / textHeight);
                if (rowsAvailable !== rowsAvailable) {
                    rowsAvailable = 0;
                }
                return {
                    textHeight: textHeight,
                    entryLengths: entryLengths,
                    rows: rows,
                    numRowsToDraw: Math.max(Math.min(rowsAvailable, rows.length), 0)
                };
            };
            Legend.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var _this = this;
                var estimatedLayout = this._calculateLayoutInfo(offeredWidth, offeredHeight);
                var rowLengths = estimatedLayout.rows.map(function (row) {
                    return d3.sum(row, function (entry) { return estimatedLayout.entryLengths.get(entry); });
                });
                var longestRowLength = Plottable._Util.Methods.max(rowLengths, 0);
                var longestUntruncatedEntryLength = Plottable._Util.Methods.max(this._scale.domain(), function (d) { return _this._measurer.measure(d).width; }, 0);
                longestUntruncatedEntryLength += estimatedLayout.textHeight + this._padding;
                var desiredWidth = this._padding + Math.max(longestRowLength, longestUntruncatedEntryLength);
                var acceptableHeight = estimatedLayout.numRowsToDraw * estimatedLayout.textHeight + 2 * this._padding;
                var desiredHeight = estimatedLayout.rows.length * estimatedLayout.textHeight + 2 * this._padding;
                var desiredNumRows = Math.max(Math.ceil(this._scale.domain().length / this._maxEntriesPerRow), 1);
                var wantsFitMoreEntriesInRow = estimatedLayout.rows.length > desiredNumRows;
                return {
                    width: this._padding + longestRowLength,
                    height: acceptableHeight,
                    wantsWidth: offeredWidth < desiredWidth || wantsFitMoreEntriesInRow,
                    wantsHeight: offeredHeight < desiredHeight
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
             * Gets the legend entry under the given pixel position.
             *
             * @param {Point} position The pixel position.
             * @returns {D3.Selection} The selected entry, or null selection if no entry was selected.
             */
            Legend.prototype.getEntry = function (position) {
                if (!this._isSetup) {
                    return d3.select();
                }
                var entry = d3.select();
                var layout = this._calculateLayoutInfo(this.width(), this.height());
                var legendPadding = this._padding;
                this._content.selectAll("g." + Legend.LEGEND_ROW_CLASS).each(function (d, i) {
                    var lowY = i * layout.textHeight + legendPadding;
                    var highY = (i + 1) * layout.textHeight + legendPadding;
                    var lowX = legendPadding;
                    var highX = legendPadding;
                    d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS).each(function (value) {
                        highX += layout.entryLengths.get(value);
                        if (highX >= position.x && lowX <= position.x && highY >= position.y && lowY <= position.y) {
                            entry = d3.select(this);
                        }
                        lowX += layout.entryLengths.get(value);
                    });
                });
                return entry;
            };
            Legend.prototype._doRender = function () {
                var _this = this;
                _super.prototype._doRender.call(this);
                var layout = this._calculateLayoutInfo(this.width(), this.height());
                var rowsToDraw = layout.rows.slice(0, layout.numRowsToDraw);
                var rows = this._content.selectAll("g." + Legend.LEGEND_ROW_CLASS).data(rowsToDraw);
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
                entries.select("path").attr("d", function (d, i) { return _this.symbolFactoryAccessor()(d, i)(layout.textHeight * 0.6); }).attr("transform", "translate(" + (layout.textHeight / 2) + "," + layout.textHeight / 2 + ")").attr("fill", function (value) { return _this._scale.scale(value); }).classed(Legend.LEGEND_SYMBOL_CLASS, true);
                var padding = this._padding;
                var textContainers = entries.select("g.text-container");
                textContainers.text(""); // clear out previous results
                textContainers.append("title").text(function (value) { return value; });
                var self = this;
                textContainers.attr("transform", "translate(" + layout.textHeight + ", 0)").each(function (value) {
                    var container = d3.select(this);
                    var maxTextLength = layout.entryLengths.get(value) - layout.textHeight - padding;
                    var writeOptions = {
                        selection: container,
                        xAlign: "left",
                        yAlign: "top",
                        textRotation: 0
                    };
                    self._writer.write(value, maxTextLength, self.height(), writeOptions);
                });
            };
            Legend.prototype.symbolFactoryAccessor = function (symbolFactoryAccessor) {
                if (symbolFactoryAccessor == null) {
                    return this._symbolFactoryAccessor;
                }
                else {
                    this._symbolFactoryAccessor = symbolFactoryAccessor;
                    this._render();
                    return this;
                }
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
        })(Component.AbstractComponent);
        Component.Legend = Legend;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var InterpolatedColorLegend = (function (_super) {
            __extends(InterpolatedColorLegend, _super);
            /**
             * Creates an InterpolatedColorLegend.
             *
             * The InterpolatedColorLegend consists of a sequence of swatches, showing the
             * associated Scale.InterpolatedColor sampled at various points. Two labels
             * show the maximum and minimum values of the Scale.InterpolatedColor.
             *
             * @constructor
             * @param {Scale.InterpolatedColor} interpolatedColorScale
             * @param {string} orientation (horizontal/left/right).
             * @param {Formatter} The labels are formatted using this function.
             */
            function InterpolatedColorLegend(interpolatedColorScale, orientation, formatter) {
                var _this = this;
                if (orientation === void 0) { orientation = "horizontal"; }
                if (formatter === void 0) { formatter = Plottable.Formatters.general(); }
                _super.call(this);
                this._padding = 5;
                this._numSwatches = 10;
                if (interpolatedColorScale == null) {
                    throw new Error("InterpolatedColorLegend requires a interpolatedColorScale");
                }
                this._scale = interpolatedColorScale;
                this._scale.broadcaster.registerListener(this, function () { return _this._invalidateLayout(); });
                this._formatter = formatter;
                this._orientation = InterpolatedColorLegend._ensureOrientation(orientation);
                this._fixedWidthFlag = true;
                this._fixedHeightFlag = true;
                this.classed("legend", true).classed("interpolated-color-legend", true);
            }
            InterpolatedColorLegend.prototype.remove = function () {
                _super.prototype.remove.call(this);
                this._scale.broadcaster.deregisterListener(this);
            };
            InterpolatedColorLegend.prototype.formatter = function (formatter) {
                if (formatter === undefined) {
                    return this._formatter;
                }
                this._formatter = formatter;
                this._invalidateLayout();
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
            InterpolatedColorLegend.prototype.orient = function (newOrientation) {
                if (newOrientation == null) {
                    return this._orientation;
                }
                else {
                    this._orientation = InterpolatedColorLegend._ensureOrientation(newOrientation);
                    this._invalidateLayout();
                    return this;
                }
            };
            InterpolatedColorLegend.prototype._generateTicks = function () {
                var domain = this._scale.domain();
                var slope = (domain[1] - domain[0]) / this._numSwatches;
                var ticks = [];
                for (var i = 0; i <= this._numSwatches; i++) {
                    ticks.push(domain[0] + slope * i);
                }
                return ticks;
            };
            InterpolatedColorLegend.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._swatchContainer = this._content.append("g").classed("swatch-container", true);
                this._swatchBoundingBox = this._content.append("rect").classed("swatch-bounding-box", true);
                this._lowerLabel = this._content.append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
                this._upperLabel = this._content.append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
                this._measurer = new SVGTypewriter.Measurers.Measurer(this._content);
                this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
                this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
            };
            InterpolatedColorLegend.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var _this = this;
                var textHeight = this._measurer.measure().height;
                var ticks = this._generateTicks();
                var numSwatches = ticks.length;
                var domain = this._scale.domain();
                var labelWidths = domain.map(function (d) { return _this._measurer.measure(_this._formatter(d)).width; });
                var desiredHeight;
                var desiredWidth;
                if (this._isVertical()) {
                    var longestWidth = Plottable._Util.Methods.max(labelWidths, 0);
                    desiredWidth = this._padding + textHeight + this._padding + longestWidth + this._padding;
                    desiredHeight = this._padding + numSwatches * textHeight + this._padding;
                }
                else {
                    desiredHeight = this._padding + textHeight + this._padding;
                    desiredWidth = this._padding + labelWidths[0] + this._padding + numSwatches * textHeight + this._padding + labelWidths[1] + this._padding;
                }
                return {
                    width: desiredWidth,
                    height: desiredHeight,
                    wantsWidth: offeredWidth < desiredWidth,
                    wantsHeight: offeredHeight < desiredHeight
                };
            };
            InterpolatedColorLegend.prototype._isVertical = function () {
                return this._orientation !== "horizontal";
            };
            InterpolatedColorLegend.prototype._doRender = function () {
                var _this = this;
                _super.prototype._doRender.call(this);
                var domain = this._scale.domain();
                var textHeight = this._measurer.measure().height;
                var text0 = this._formatter(domain[0]);
                var text0Width = this._measurer.measure(text0).width;
                var text1 = this._formatter(domain[1]);
                var text1Width = this._measurer.measure(text1).width;
                var ticks = this._generateTicks();
                var numSwatches = ticks.length;
                var padding = this._padding;
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
                    y: padding,
                    width: 0,
                    height: 0
                };
                if (this._isVertical()) {
                    var longestTextWidth = Math.max(text0Width, text1Width);
                    swatchWidth = Math.max((this.width() - 3 * padding - longestTextWidth), 0);
                    swatchHeight = Math.max(((this.height() - 2 * padding) / numSwatches), 0);
                    swatchY = function (d, i) { return padding + (numSwatches - (i + 1)) * swatchHeight; };
                    upperWriteOptions.yAlign = "top";
                    upperLabelShift.y = padding;
                    lowerWriteOptions.yAlign = "bottom";
                    lowerLabelShift.y = -padding;
                    if (this._orientation === "left") {
                        swatchX = function (d, i) { return padding + longestTextWidth + padding; };
                        upperWriteOptions.xAlign = "right";
                        upperLabelShift.x = -(padding + swatchWidth + padding);
                        lowerWriteOptions.xAlign = "right";
                        lowerLabelShift.x = -(padding + swatchWidth + padding);
                    }
                    else {
                        swatchX = function (d, i) { return padding; };
                        upperWriteOptions.xAlign = "left";
                        upperLabelShift.x = padding + swatchWidth + padding;
                        lowerWriteOptions.xAlign = "left";
                        lowerLabelShift.x = padding + swatchWidth + padding;
                    }
                    boundingBoxAttr.width = swatchWidth;
                    boundingBoxAttr.height = numSwatches * swatchHeight;
                }
                else {
                    swatchWidth = Math.max(((this.width() - 4 * padding - text0Width - text1Width) / numSwatches), 0);
                    swatchHeight = Math.max((this.height() - 2 * padding), 0);
                    swatchX = function (d, i) { return (padding + text0Width + padding) + i * swatchWidth; };
                    swatchY = function (d, i) { return padding; };
                    upperWriteOptions.xAlign = "right";
                    upperLabelShift.x = -padding;
                    lowerWriteOptions.xAlign = "left";
                    lowerLabelShift.x = padding;
                    boundingBoxAttr.width = numSwatches * swatchWidth;
                    boundingBoxAttr.height = swatchHeight;
                }
                boundingBoxAttr.x = swatchX(null, 0); // position of the first swatch
                this._upperLabel.text(""); // clear the upper label
                this._writer.write(text1, this.width(), this.height(), upperWriteOptions);
                var upperTranslateString = "translate(" + upperLabelShift.x + ", " + upperLabelShift.y + ")";
                this._upperLabel.attr("transform", upperTranslateString);
                this._lowerLabel.text(""); // clear the lower label
                this._writer.write(text0, this.width(), this.height(), lowerWriteOptions);
                var lowerTranslateString = "translate(" + lowerLabelShift.x + ", " + lowerLabelShift.y + ")";
                this._lowerLabel.attr("transform", lowerTranslateString);
                this._swatchBoundingBox.attr(boundingBoxAttr);
                var swatches = this._swatchContainer.selectAll("rect.swatch").data(ticks);
                swatches.enter().append("rect").classed("swatch", true);
                swatches.exit().remove();
                swatches.attr({
                    "fill": function (d, i) { return _this._scale.scale(d); },
                    "width": swatchWidth,
                    "height": swatchHeight,
                    "x": swatchX,
                    "y": swatchY
                });
            };
            /**
             * The css class applied to the legend labels.
             */
            InterpolatedColorLegend.LEGEND_LABEL_CLASS = "legend-label";
            return InterpolatedColorLegend;
        })(Component.AbstractComponent);
        Component.InterpolatedColorLegend = InterpolatedColorLegend;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var Gridlines = (function (_super) {
            __extends(Gridlines, _super);
            /**
             * Creates a set of Gridlines.
             * @constructor
             *
             * @param {QuantitativeScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
             * @param {QuantitativeScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
             */
            function Gridlines(xScale, yScale) {
                var _this = this;
                if (xScale != null && !(Plottable.Scale.AbstractQuantitative.prototype.isPrototypeOf(xScale))) {
                    throw new Error("xScale needs to inherit from Scale.AbstractQuantitative");
                }
                if (yScale != null && !(Plottable.Scale.AbstractQuantitative.prototype.isPrototypeOf(yScale))) {
                    throw new Error("yScale needs to inherit from Scale.AbstractQuantitative");
                }
                _super.call(this);
                this.classed("gridlines", true);
                this._xScale = xScale;
                this._yScale = yScale;
                if (this._xScale) {
                    this._xScale.broadcaster.registerListener(this, function () { return _this._render(); });
                }
                if (this._yScale) {
                    this._yScale.broadcaster.registerListener(this, function () { return _this._render(); });
                }
            }
            Gridlines.prototype.remove = function () {
                _super.prototype.remove.call(this);
                if (this._xScale) {
                    this._xScale.broadcaster.deregisterListener(this);
                }
                if (this._yScale) {
                    this._yScale.broadcaster.deregisterListener(this);
                }
                return this;
            };
            Gridlines.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._xLinesContainer = this._content.append("g").classed("x-gridlines", true);
                this._yLinesContainer = this._content.append("g").classed("y-gridlines", true);
            };
            Gridlines.prototype._doRender = function () {
                _super.prototype._doRender.call(this);
                this._redrawXLines();
                this._redrawYLines();
            };
            Gridlines.prototype._redrawXLines = function () {
                var _this = this;
                if (this._xScale) {
                    var xTicks = this._xScale.ticks();
                    var getScaledXValue = function (tickVal) { return _this._xScale.scale(tickVal); };
                    var xLines = this._xLinesContainer.selectAll("line").data(xTicks);
                    xLines.enter().append("line");
                    xLines.attr("x1", getScaledXValue).attr("y1", 0).attr("x2", getScaledXValue).attr("y2", this.height()).classed("zeroline", function (t) { return t === 0; });
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
                    yLines.attr("x1", 0).attr("y1", getScaledYValue).attr("x2", this.width()).attr("y2", getScaledYValue).classed("zeroline", function (t) { return t === 0; });
                    yLines.exit().remove();
                }
            };
            return Gridlines;
        })(Component.AbstractComponent);
        Component.Gridlines = Gridlines;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var Table = (function (_super) {
            __extends(Table, _super);
            /**
             * Constructs a Table.
             *
             * A Table is used to combine multiple Components in the form of a grid. A
             * common case is combining a y-axis, x-axis, and the plotted data via
             * ```typescript
             * new Table([[yAxis, plot],
             *            [null,  xAxis]]);
             * ```
             *
             * @constructor
             * @param {Component[][]} [rows] A 2-D array of the Components to place in the table.
             * null can be used if a cell is empty. (default = [])
             */
            function Table(rows) {
                var _this = this;
                if (rows === void 0) { rows = []; }
                _super.call(this);
                this._rowPadding = 0;
                this._colPadding = 0;
                this._rows = [];
                this._rowWeights = [];
                this._colWeights = [];
                this._nRows = 0;
                this._nCols = 0;
                this._calculatedLayout = null;
                this.classed("table", true);
                rows.forEach(function (row, rowIndex) {
                    row.forEach(function (component, colIndex) {
                        if (component != null) {
                            _this.addComponent(rowIndex, colIndex, component);
                        }
                    });
                });
            }
            /**
             * Adds a Component in the specified cell.
             *
             * If the cell is already occupied, there are 3 cases
             *  - Component + Component => Group containing both components
             *  - Component + Group => Component is added to the group
             *  - Group + Component => Component is added to the group
             *
             * For example, instead of calling `new Table([[a, b], [null, c]])`, you
             * could call
             * ```typescript
             * var table = new Table();
             * table.addComponent(0, 0, a);
             * table.addComponent(0, 1, b);
             * table.addComponent(1, 1, c);
             * ```
             *
             * @param {number} row The row in which to add the Component.
             * @param {number} col The column in which to add the Component.
             * @param {Component} component The Component to be added.
             * @returns {Table} The calling Table.
             */
            Table.prototype.addComponent = function (row, col, component) {
                if (component == null) {
                    throw Error("Cannot add null to a table cell");
                }
                var currentComponent = this._rows[row] && this._rows[row][col];
                if (currentComponent) {
                    component = component.above(currentComponent);
                }
                if (this._addComponent(component)) {
                    this._nRows = Math.max(row + 1, this._nRows);
                    this._nCols = Math.max(col + 1, this._nCols);
                    this._padTableToSize(this._nRows, this._nCols);
                    this._rows[row][col] = component;
                }
                return this;
            };
            Table.prototype._removeComponent = function (component) {
                _super.prototype._removeComponent.call(this, component);
                var rowpos;
                var colpos;
                outer: for (var i = 0; i < this._nRows; i++) {
                    for (var j = 0; j < this._nCols; j++) {
                        if (this._rows[i][j] === component) {
                            rowpos = i;
                            colpos = j;
                            break outer;
                        }
                    }
                }
                if (rowpos !== undefined) {
                    this._rows[rowpos][colpos] = null;
                }
            };
            Table.prototype._iterateLayout = function (availableWidth, availableHeight) {
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
                var availableWidthAfterPadding = availableWidth - this._colPadding * (this._nCols - 1);
                var availableHeightAfterPadding = availableHeight - this._rowPadding * (this._nRows - 1);
                var rowWeights = Table._calcComponentWeights(this._rowWeights, rows, function (c) { return (c == null) || c._isFixedHeight(); });
                var colWeights = Table._calcComponentWeights(this._colWeights, cols, function (c) { return (c == null) || c._isFixedWidth(); });
                // To give the table a good starting position to iterate from, we give the fixed-width components half-weight
                // so that they will get some initial space allocated to work with
                var heuristicColWeights = colWeights.map(function (c) { return c === 0 ? 0.5 : c; });
                var heuristicRowWeights = rowWeights.map(function (c) { return c === 0 ? 0.5 : c; });
                var colProportionalSpace = Table._calcProportionalSpace(heuristicColWeights, availableWidthAfterPadding);
                var rowProportionalSpace = Table._calcProportionalSpace(heuristicRowWeights, availableHeightAfterPadding);
                var guaranteedWidths = Plottable._Util.Methods.createFilledArray(0, this._nCols);
                var guaranteedHeights = Plottable._Util.Methods.createFilledArray(0, this._nRows);
                var freeWidth;
                var freeHeight;
                var nIterations = 0;
                while (true) {
                    var offeredHeights = Plottable._Util.Methods.addArrays(guaranteedHeights, rowProportionalSpace);
                    var offeredWidths = Plottable._Util.Methods.addArrays(guaranteedWidths, colProportionalSpace);
                    var guarantees = this._determineGuarantees(offeredWidths, offeredHeights);
                    guaranteedWidths = guarantees.guaranteedWidths;
                    guaranteedHeights = guarantees.guaranteedHeights;
                    var wantsWidth = guarantees.wantsWidthArr.some(function (x) { return x; });
                    var wantsHeight = guarantees.wantsHeightArr.some(function (x) { return x; });
                    var lastFreeWidth = freeWidth;
                    var lastFreeHeight = freeHeight;
                    freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
                    freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
                    var xWeights;
                    if (wantsWidth) {
                        xWeights = guarantees.wantsWidthArr.map(function (x) { return x ? 0.1 : 0; });
                        xWeights = Plottable._Util.Methods.addArrays(xWeights, colWeights);
                    }
                    else {
                        xWeights = colWeights;
                    }
                    var yWeights;
                    if (wantsHeight) {
                        yWeights = guarantees.wantsHeightArr.map(function (x) { return x ? 0.1 : 0; });
                        yWeights = Plottable._Util.Methods.addArrays(yWeights, rowWeights);
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
                return { colProportionalSpace: colProportionalSpace, rowProportionalSpace: rowProportionalSpace, guaranteedWidths: guarantees.guaranteedWidths, guaranteedHeights: guarantees.guaranteedHeights, wantsWidth: wantsWidth, wantsHeight: wantsHeight };
            };
            Table.prototype._determineGuarantees = function (offeredWidths, offeredHeights) {
                var requestedWidths = Plottable._Util.Methods.createFilledArray(0, this._nCols);
                var requestedHeights = Plottable._Util.Methods.createFilledArray(0, this._nRows);
                var layoutWantsWidth = Plottable._Util.Methods.createFilledArray(false, this._nCols);
                var layoutWantsHeight = Plottable._Util.Methods.createFilledArray(false, this._nRows);
                this._rows.forEach(function (row, rowIndex) {
                    row.forEach(function (component, colIndex) {
                        var spaceRequest;
                        if (component != null) {
                            spaceRequest = component._requestedSpace(offeredWidths[colIndex], offeredHeights[rowIndex]);
                        }
                        else {
                            spaceRequest = { width: 0, height: 0, wantsWidth: false, wantsHeight: false };
                        }
                        var allocatedWidth = Math.min(spaceRequest.width, offeredWidths[colIndex]);
                        var allocatedHeight = Math.min(spaceRequest.height, offeredHeights[rowIndex]);
                        requestedWidths[colIndex] = Math.max(requestedWidths[colIndex], allocatedWidth);
                        requestedHeights[rowIndex] = Math.max(requestedHeights[rowIndex], allocatedHeight);
                        layoutWantsWidth[colIndex] = layoutWantsWidth[colIndex] || spaceRequest.wantsWidth;
                        layoutWantsHeight[rowIndex] = layoutWantsHeight[rowIndex] || spaceRequest.wantsHeight;
                    });
                });
                return { guaranteedWidths: requestedWidths, guaranteedHeights: requestedHeights, wantsWidthArr: layoutWantsWidth, wantsHeightArr: layoutWantsHeight };
            };
            Table.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                this._calculatedLayout = this._iterateLayout(offeredWidth, offeredHeight);
                return { width: d3.sum(this._calculatedLayout.guaranteedWidths), height: d3.sum(this._calculatedLayout.guaranteedHeights), wantsWidth: this._calculatedLayout.wantsWidth, wantsHeight: this._calculatedLayout.wantsHeight };
            };
            Table.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                var _this = this;
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
                var layout = this._useLastCalculatedLayout() ? this._calculatedLayout : this._iterateLayout(this.width(), this.height());
                this._useLastCalculatedLayout(true);
                var childYOrigin = 0;
                var rowHeights = Plottable._Util.Methods.addArrays(layout.rowProportionalSpace, layout.guaranteedHeights);
                var colWidths = Plottable._Util.Methods.addArrays(layout.colProportionalSpace, layout.guaranteedWidths);
                this._rows.forEach(function (row, rowIndex) {
                    var childXOrigin = 0;
                    row.forEach(function (component, colIndex) {
                        // recursively compute layout
                        if (component != null) {
                            component._computeLayout(childXOrigin, childYOrigin, colWidths[colIndex], rowHeights[rowIndex]);
                        }
                        childXOrigin += colWidths[colIndex] + _this._colPadding;
                    });
                    childYOrigin += rowHeights[rowIndex] + _this._rowPadding;
                });
            };
            /**
             * Sets the row and column padding on the Table.
             *
             * @param {number} rowPadding The padding above and below each row, in pixels.
             * @param {number} colPadding the padding to the left and right of each column, in pixels.
             * @returns {Table} The calling Table.
             */
            Table.prototype.padding = function (rowPadding, colPadding) {
                this._rowPadding = rowPadding;
                this._colPadding = colPadding;
                this._invalidateLayout();
                return this;
            };
            /**
             * Sets the layout weight of a particular row.
             * Space is allocated to rows based on their weight. Rows with higher weights receive proportionally more space.
             *
             * A common case would be to have one row take up 2/3rds of the space,
             * and the other row take up 1/3rd.
             *
             * Example:
             *
             * ```JavaScript
             * plot = new Plottable.Component.Table([
             *  [row1],
             *  [row2]
             * ]);
             *
             * // assign twice as much space to the first row
             * plot
             *  .rowWeight(0, 2)
             *  .rowWeight(1, 1)
             * ```
             *
             * @param {number} index The index of the row.
             * @param {number} weight The weight to be set on the row.
             * @returns {Table} The calling Table.
             */
            Table.prototype.rowWeight = function (index, weight) {
                this._rowWeights[index] = weight;
                this._invalidateLayout();
                return this;
            };
            /**
             * Sets the layout weight of a particular column.
             * Space is allocated to columns based on their weight. Columns with higher weights receive proportionally more space.
             *
             * Please see `rowWeight` docs for an example.
             *
             * @param {number} index The index of the column.
             * @param {number} weight The weight to be set on the column.
             * @returns {Table} The calling Table.
             */
            Table.prototype.colWeight = function (index, weight) {
                this._colWeights[index] = weight;
                this._invalidateLayout();
                return this;
            };
            Table.prototype._isFixedWidth = function () {
                var cols = d3.transpose(this._rows);
                return Table._fixedSpace(cols, function (c) { return (c == null) || c._isFixedWidth(); });
            };
            Table.prototype._isFixedHeight = function () {
                return Table._fixedSpace(this._rows, function (c) { return (c == null) || c._isFixedHeight(); });
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
                for (j = 0; j < nCols; j++) {
                    if (this._colWeights[j] === undefined) {
                        this._colWeights[j] = null;
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
                    return Plottable._Util.Methods.createFilledArray(0, weights.length);
                }
                else {
                    return weights.map(function (w) { return freeSpace * w / weightSum; });
                }
            };
            Table._fixedSpace = function (componentGroup, fixityAccessor) {
                var all = function (bools) { return bools.reduce(function (a, b) { return a && b; }, true); };
                var group_isFixed = function (components) { return all(components.map(fixityAccessor)); };
                return all(componentGroup.map(group_isFixed));
            };
            return Table;
        })(Component.AbstractComponentContainer);
        Component.Table = Table;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var SelectionBoxLayer = (function (_super) {
            __extends(SelectionBoxLayer, _super);
            function SelectionBoxLayer() {
                _super.call(this);
                this._boxVisible = false;
                this._boxBounds = {
                    topLeft: { x: 0, y: 0 },
                    bottomRight: { x: 0, y: 0 }
                };
                this.classed("selection-box-layer", true);
                this._fixedWidthFlag = true;
                this._fixedHeightFlag = true;
            }
            SelectionBoxLayer.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._box = this._content.append("g").classed("selection-box", true).remove();
                this._boxArea = this._box.append("rect").classed("selection-area", true);
            };
            SelectionBoxLayer.prototype._getSize = function (availableWidth, availableHeight) {
                return {
                    width: availableWidth,
                    height: availableHeight
                };
            };
            SelectionBoxLayer.prototype.bounds = function (newBounds) {
                if (newBounds == null) {
                    return this._boxBounds;
                }
                this._setBounds(newBounds);
                this._render();
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
            SelectionBoxLayer.prototype._doRender = function () {
                if (this._boxVisible) {
                    var t = this._boxBounds.topLeft.y;
                    var b = this._boxBounds.bottomRight.y;
                    var l = this._boxBounds.topLeft.x;
                    var r = this._boxBounds.bottomRight.x;
                    this._boxArea.attr({
                        x: l,
                        y: t,
                        width: r - l,
                        height: b - t
                    });
                    this._content.node().appendChild(this._box.node());
                }
                else {
                    this._box.remove();
                }
            };
            SelectionBoxLayer.prototype.boxVisible = function (show) {
                if (show == null) {
                    return this._boxVisible;
                }
                this._boxVisible = show;
                this._render();
                return this;
            };
            return SelectionBoxLayer;
        })(Component.AbstractComponent);
        Component.SelectionBoxLayer = SelectionBoxLayer;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var AbstractPlot = (function (_super) {
            __extends(AbstractPlot, _super);
            /**
             * Constructs a Plot.
             *
             * Plots render data. Common example include Plot.Scatter, Plot.Bar, and Plot.Line.
             *
             * A bare Plot has a DataSource and any number of projectors, which take
             * data and "project" it onto the Plot, such as "x", "y", "fill", "r".
             *
             * @constructor
             * @param {any[]|Dataset} [dataset] If provided, the data or Dataset to be associated with this Plot.
             */
            function AbstractPlot() {
                _super.call(this);
                this._dataChanged = false;
                this._projections = {};
                this._animate = false;
                this._animators = {};
                this._animateOnNextRender = true;
                this.clipPathEnabled = true;
                this.classed("plot", true);
                this._key2PlotDatasetKey = d3.map();
                this._datasetKeysInOrder = [];
                this._nextSeriesIndex = 0;
            }
            AbstractPlot.prototype._anchor = function (element) {
                _super.prototype._anchor.call(this, element);
                this._animateOnNextRender = true;
                this._dataChanged = true;
                this._updateScaleExtents();
            };
            AbstractPlot.prototype._setup = function () {
                var _this = this;
                _super.prototype._setup.call(this);
                this._renderArea = this._content.append("g").classed("render-area", true);
                // HACKHACK on 591
                this._getDrawersInOrder().forEach(function (d) { return d.setup(_this._renderArea.append("g")); });
            };
            AbstractPlot.prototype.remove = function () {
                var _this = this;
                _super.prototype.remove.call(this);
                this._datasetKeysInOrder.forEach(function (k) { return _this.removeDataset(k); });
                // deregister from all scales
                var properties = Object.keys(this._projections);
                properties.forEach(function (property) {
                    var projector = _this._projections[property];
                    if (projector.scale) {
                        projector.scale.broadcaster.deregisterListener(_this);
                    }
                });
            };
            AbstractPlot.prototype.addDataset = function (keyOrDataset, dataset) {
                if (typeof (keyOrDataset) !== "string" && dataset !== undefined) {
                    throw new Error("invalid input to addDataset");
                }
                if (typeof (keyOrDataset) === "string" && keyOrDataset[0] === "_") {
                    Plottable._Util.Methods.warn("Warning: Using _named series keys may produce collisions with unlabeled data sources");
                }
                var key = typeof (keyOrDataset) === "string" ? keyOrDataset : "_" + this._nextSeriesIndex++;
                var data = typeof (keyOrDataset) !== "string" ? keyOrDataset : dataset;
                dataset = (data instanceof Plottable.Dataset) ? data : new Plottable.Dataset(data);
                this._addDataset(key, dataset);
                return this;
            };
            AbstractPlot.prototype._addDataset = function (key, dataset) {
                var _this = this;
                if (this._key2PlotDatasetKey.has(key)) {
                    this.removeDataset(key);
                }
                ;
                var drawer = this._getDrawer(key);
                var metadata = this._getPlotMetadataForDataset(key);
                var pdk = { drawer: drawer, dataset: dataset, key: key, plotMetadata: metadata };
                this._datasetKeysInOrder.push(key);
                this._key2PlotDatasetKey.set(key, pdk);
                if (this._isSetup) {
                    drawer.setup(this._renderArea.append("g"));
                }
                dataset.broadcaster.registerListener(this, function () { return _this._onDatasetUpdate(); });
                this._onDatasetUpdate();
            };
            AbstractPlot.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.AbstractDrawer(key);
            };
            AbstractPlot.prototype._getAnimator = function (key) {
                if (this._animate && this._animateOnNextRender) {
                    return this._animators[key] || new Plottable.Animator.Null();
                }
                else {
                    return new Plottable.Animator.Null();
                }
            };
            AbstractPlot.prototype._onDatasetUpdate = function () {
                this._updateScaleExtents();
                this._animateOnNextRender = true;
                this._dataChanged = true;
                this._render();
            };
            /**
             * Sets an attribute of every data point.
             *
             * Here's a common use case:
             * ```typescript
             * plot.attr("x", function(d) { return d.foo; }, xScale);
             * ```
             * This will set the x accessor of each datum `d` to be `d.foo`,
             * scaled in accordance with `xScale`
             *
             * @param {string} attrToSet The attribute to set across each data
             * point. Popular examples include "x", "y".
             *
             * @param {Function|string|any} accessor Function to apply to each element
             * of the dataSource. If a Function, use `accessor(d, i)`. If a string,
             * `d[accessor]` is used. If anything else, use `accessor` as a constant
             * across all data points.
             *
             * @param {Scale.AbstractScale} scale If provided, the result of the accessor
             * is passed through the scale, such as `scale.scale(accessor(d, i))`.
             *
             * @returns {Plot} The calling Plot.
             */
            AbstractPlot.prototype.attr = function (attrToSet, accessor, scale) {
                return this.project(attrToSet, accessor, scale);
            };
            /**
             * Identical to plot.attr
             */
            AbstractPlot.prototype.project = function (attrToSet, accessor, scale) {
                var _this = this;
                attrToSet = attrToSet.toLowerCase();
                var currentProjection = this._projections[attrToSet];
                var existingScale = currentProjection && currentProjection.scale;
                if (existingScale) {
                    this._datasetKeysInOrder.forEach(function (key) {
                        existingScale._removeExtent(_this.getID().toString() + "_" + key, attrToSet);
                        existingScale.broadcaster.deregisterListener(_this);
                    });
                }
                if (scale) {
                    scale.broadcaster.registerListener(this, function () { return _this._render(); });
                }
                accessor = Plottable._Util.Methods.accessorize(accessor);
                this._projections[attrToSet] = { accessor: accessor, scale: scale, attribute: attrToSet };
                this._updateScaleExtent(attrToSet);
                this._render(); // queue a re-render upon changing projector
                return this;
            };
            AbstractPlot.prototype._generateAttrToProjector = function () {
                var _this = this;
                var h = {};
                d3.keys(this._projections).forEach(function (a) {
                    var projection = _this._projections[a];
                    var accessor = projection.accessor;
                    var scale = projection.scale;
                    var fn = scale ? function (d, i, u, m) { return scale.scale(accessor(d, i, u, m)); } : accessor;
                    h[a] = fn;
                });
                return h;
            };
            /**
             * Generates a dictionary mapping an attribute to a function that calculate that attribute's value
             * in accordance with the given datasetKey.
             *
             * Note that this will return all of the data attributes, which may not perfectly align to svg attributes
             *
             * @param {datasetKey} the key of the dataset to generate the dictionary for
             * @returns {AttributeToAppliedProjector} A dictionary mapping attributes to functions
             */
            AbstractPlot.prototype.generateProjectors = function (datasetKey) {
                var attrToProjector = this._generateAttrToProjector();
                var plotDatasetKey = this._key2PlotDatasetKey.get(datasetKey);
                var plotMetadata = plotDatasetKey.plotMetadata;
                var userMetadata = plotDatasetKey.dataset.metadata();
                var attrToAppliedProjector = {};
                d3.entries(attrToProjector).forEach(function (keyValue) {
                    attrToAppliedProjector[keyValue.key] = function (datum, index) { return keyValue.value(datum, index, userMetadata, plotMetadata); };
                });
                return attrToAppliedProjector;
            };
            AbstractPlot.prototype._doRender = function () {
                if (this._isAnchored) {
                    this._paint();
                    this._dataChanged = false;
                    this._animateOnNextRender = false;
                }
            };
            /**
             * Enables or disables animation.
             *
             * @param {boolean} enabled Whether or not to animate.
             */
            AbstractPlot.prototype.animate = function (enabled) {
                this._animate = enabled;
                return this;
            };
            AbstractPlot.prototype.detach = function () {
                _super.prototype.detach.call(this);
                // make the domain resize
                this._updateScaleExtents();
                return this;
            };
            /**
             * This function makes sure that all of the scales in this._projections
             * have an extent that includes all the data that is projected onto them.
             */
            AbstractPlot.prototype._updateScaleExtents = function () {
                var _this = this;
                d3.keys(this._projections).forEach(function (attr) { return _this._updateScaleExtent(attr); });
            };
            AbstractPlot.prototype._updateScaleExtent = function (attr) {
                var _this = this;
                var projector = this._projections[attr];
                if (projector.scale) {
                    this._datasetKeysInOrder.forEach(function (key) {
                        var plotDatasetKey = _this._key2PlotDatasetKey.get(key);
                        var dataset = plotDatasetKey.dataset;
                        var plotMetadata = plotDatasetKey.plotMetadata;
                        var extent = dataset._getExtent(projector.accessor, projector.scale._typeCoercer, plotMetadata);
                        var scaleKey = _this.getID().toString() + "_" + key;
                        if (extent.length === 0 || !_this._isAnchored) {
                            projector.scale._removeExtent(scaleKey, attr);
                        }
                        else {
                            projector.scale._updateExtent(scaleKey, attr, extent);
                        }
                    });
                }
            };
            AbstractPlot.prototype.animator = function (animatorKey, animator) {
                if (animator === undefined) {
                    return this._animators[animatorKey];
                }
                else {
                    this._animators[animatorKey] = animator;
                    return this;
                }
            };
            AbstractPlot.prototype.datasetOrder = function (order) {
                if (order === undefined) {
                    return this._datasetKeysInOrder;
                }
                function isPermutation(l1, l2) {
                    var intersection = Plottable._Util.Methods.intersection(d3.set(l1), d3.set(l2));
                    var size = intersection.size(); // HACKHACK pending on borisyankov/definitelytyped/ pr #2653
                    return size === l1.length && size === l2.length;
                }
                if (isPermutation(order, this._datasetKeysInOrder)) {
                    this._datasetKeysInOrder = order;
                    this._onDatasetUpdate();
                }
                else {
                    Plottable._Util.Methods.warn("Attempted to change datasetOrder, but new order is not permutation of old. Ignoring.");
                }
                return this;
            };
            /**
             * Removes a dataset by the given identifier
             *
             * @param {string | Dataset | any[]} datasetIdentifer The identifier as the key of the Dataset to remove
             * If string is inputted, it is interpreted as the dataset key to remove.
             * If Dataset is inputted, the first Dataset in the plot that is the same will be removed.
             * If any[] is inputted, the first data array in the plot that is the same will be removed.
             * @returns {AbstractPlot} The calling AbstractPlot.
             */
            AbstractPlot.prototype.removeDataset = function (datasetIdentifier) {
                var key;
                if (typeof datasetIdentifier === "string") {
                    key = datasetIdentifier;
                }
                else if (typeof datasetIdentifier === "object") {
                    var index = -1;
                    if (datasetIdentifier instanceof Plottable.Dataset) {
                        var datasetArray = this.datasets();
                        index = datasetArray.indexOf(datasetIdentifier);
                    }
                    else if (datasetIdentifier instanceof Array) {
                        var dataArray = this.datasets().map(function (d) { return d.data(); });
                        index = dataArray.indexOf(datasetIdentifier);
                    }
                    if (index !== -1) {
                        key = this._datasetKeysInOrder[index];
                    }
                }
                return this._removeDataset(key);
            };
            AbstractPlot.prototype._removeDataset = function (key) {
                if (key != null && this._key2PlotDatasetKey.has(key)) {
                    var pdk = this._key2PlotDatasetKey.get(key);
                    pdk.drawer.remove();
                    var projectors = d3.values(this._projections);
                    var scaleKey = this.getID().toString() + "_" + key;
                    projectors.forEach(function (p) {
                        if (p.scale != null) {
                            p.scale._removeExtent(scaleKey, p.attribute);
                        }
                    });
                    pdk.dataset.broadcaster.deregisterListener(this);
                    this._datasetKeysInOrder.splice(this._datasetKeysInOrder.indexOf(key), 1);
                    this._key2PlotDatasetKey.remove(key);
                    this._onDatasetUpdate();
                }
                return this;
            };
            AbstractPlot.prototype.datasets = function () {
                var _this = this;
                return this._datasetKeysInOrder.map(function (k) { return _this._key2PlotDatasetKey.get(k).dataset; });
            };
            AbstractPlot.prototype._getDrawersInOrder = function () {
                var _this = this;
                return this._datasetKeysInOrder.map(function (k) { return _this._key2PlotDatasetKey.get(k).drawer; });
            };
            AbstractPlot.prototype._generateDrawSteps = function () {
                return [{ attrToProjector: this._generateAttrToProjector(), animator: new Plottable.Animator.Null() }];
            };
            AbstractPlot.prototype._additionalPaint = function (time) {
                // no-op
            };
            AbstractPlot.prototype._getDataToDraw = function () {
                var _this = this;
                var datasets = d3.map();
                this._datasetKeysInOrder.forEach(function (key) {
                    datasets.set(key, _this._key2PlotDatasetKey.get(key).dataset.data());
                });
                return datasets;
            };
            /**
             * Gets the new plot metadata for new dataset with provided key
             *
             * @param {string} key The key of new dataset
             */
            AbstractPlot.prototype._getPlotMetadataForDataset = function (key) {
                return {
                    datasetKey: key
                };
            };
            AbstractPlot.prototype._paint = function () {
                var _this = this;
                var drawSteps = this._generateDrawSteps();
                var dataToDraw = this._getDataToDraw();
                var drawers = this._getDrawersInOrder();
                // TODO: Use metadata instead of dataToDraw #1297.
                var times = this._datasetKeysInOrder.map(function (k, i) { return drawers[i].draw(dataToDraw.get(k), drawSteps, _this._key2PlotDatasetKey.get(k).dataset.metadata(), _this._key2PlotDatasetKey.get(k).plotMetadata); });
                var maxTime = Plottable._Util.Methods.max(times, 0);
                this._additionalPaint(maxTime);
            };
            /**
             * Retrieves all of the selections of this plot for the specified dataset(s)
             *
             * @param {string | string[]} datasetKeys The dataset(s) to retrieve the selections from.
             * If not provided, all selections will be retrieved.
             * @param {boolean} exclude If set to true, all datasets will be queried excluding the keys referenced
             * in the previous datasetKeys argument (default = false).
             * @returns {D3.Selection} The retrieved selections.
             */
            AbstractPlot.prototype.getAllSelections = function (datasetKeys, exclude) {
                var _this = this;
                if (datasetKeys === void 0) { datasetKeys = this.datasetOrder(); }
                if (exclude === void 0) { exclude = false; }
                var datasetKeyArray = [];
                if (typeof (datasetKeys) === "string") {
                    datasetKeyArray = [datasetKeys];
                }
                else {
                    datasetKeyArray = datasetKeys;
                }
                if (exclude) {
                    var excludedDatasetKeys = d3.set(datasetKeyArray);
                    datasetKeyArray = this.datasetOrder().filter(function (datasetKey) { return !excludedDatasetKeys.has(datasetKey); });
                }
                var allSelections = [];
                datasetKeyArray.forEach(function (datasetKey) {
                    var plotDatasetKey = _this._key2PlotDatasetKey.get(datasetKey);
                    if (plotDatasetKey == null) {
                        return;
                    }
                    var drawer = plotDatasetKey.drawer;
                    drawer._getRenderArea().selectAll(drawer._getSelector()).each(function () {
                        allSelections.push(this);
                    });
                });
                return d3.selectAll(allSelections);
            };
            /**
             * Retrieves all of the PlotData of this plot for the specified dataset(s)
             *
             * @param {string | string[]} datasetKeys The dataset(s) to retrieve the selections from.
             * If not provided, all selections will be retrieved.
             * @returns {PlotData} The retrieved PlotData.
             */
            AbstractPlot.prototype.getAllPlotData = function (datasetKeys) {
                if (datasetKeys === void 0) { datasetKeys = this.datasetOrder(); }
                var datasetKeyArray = [];
                if (typeof (datasetKeys) === "string") {
                    datasetKeyArray = [datasetKeys];
                }
                else {
                    datasetKeyArray = datasetKeys;
                }
                return this._getAllPlotData(datasetKeyArray);
            };
            AbstractPlot.prototype._getAllPlotData = function (datasetKeys) {
                var _this = this;
                var data = [];
                var pixelPoints = [];
                var allElements = [];
                datasetKeys.forEach(function (datasetKey) {
                    var plotDatasetKey = _this._key2PlotDatasetKey.get(datasetKey);
                    if (plotDatasetKey == null) {
                        return;
                    }
                    var drawer = plotDatasetKey.drawer;
                    plotDatasetKey.dataset.data().forEach(function (datum, index) {
                        var pixelPoint = drawer._getPixelPoint(datum, index);
                        if (pixelPoint.x !== pixelPoint.x || pixelPoint.y !== pixelPoint.y) {
                            return;
                        }
                        data.push(datum);
                        pixelPoints.push(pixelPoint);
                        allElements.push(drawer._getSelection(index).node());
                    });
                });
                return { data: data, pixelPoints: pixelPoints, selection: d3.selectAll(allElements) };
            };
            /**
             * Retrieves PlotData with the lowest distance, where distance is defined
             * to be the Euclidiean norm.
             *
             * @param {Point} queryPoint The point to which plot data should be compared
             *
             * @returns {PlotData} The PlotData closest to queryPoint
             */
            AbstractPlot.prototype.getClosestPlotData = function (queryPoint) {
                var _this = this;
                var closestDistanceSquared = Infinity;
                var closestIndex;
                var plotData = this.getAllPlotData();
                plotData.pixelPoints.forEach(function (pixelPoint, index) {
                    var datum = plotData.data[index];
                    var selection = d3.select(plotData.selection[0][index]);
                    if (!_this._isVisibleOnPlot(datum, pixelPoint, selection)) {
                        return;
                    }
                    var distance = Plottable._Util.Methods.distanceSquared(pixelPoint, queryPoint);
                    if (distance < closestDistanceSquared) {
                        closestDistanceSquared = distance;
                        closestIndex = index;
                    }
                });
                if (closestIndex == null) {
                    return { data: [], pixelPoints: [], selection: d3.select() };
                }
                return { data: [plotData.data[closestIndex]], pixelPoints: [plotData.pixelPoints[closestIndex]], selection: d3.select(plotData.selection[0][closestIndex]) };
            };
            AbstractPlot.prototype._isVisibleOnPlot = function (datum, pixelPoint, selection) {
                return !(pixelPoint.x < 0 || pixelPoint.y < 0 || pixelPoint.x > this.width() || pixelPoint.y > this.height());
            };
            return AbstractPlot;
        })(Plottable.Component.AbstractComponent);
        Plot.AbstractPlot = AbstractPlot;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        /*
         * A PiePlot is a plot meant to show how much out of a total an attribute's value is.
         * One usecase is to show how much funding departments are given out of a total budget.
         *
         * Primary projection attributes:
         *   "fill" - Accessor determining the color of each sector
         *   "inner-radius" - Accessor determining the distance from the center to the inner edge of the sector
         *   "outer-radius" - Accessor determining the distance from the center to the outer edge of the sector
         *   "value" - Accessor to extract the value determining the proportion of each slice to the total
         */
        var Pie = (function (_super) {
            __extends(Pie, _super);
            /**
             * Constructs a PiePlot.
             *
             * @constructor
             */
            function Pie() {
                _super.call(this);
                this._colorScale = new Plottable.Scale.Color();
                this.classed("pie-plot", true);
            }
            Pie.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
                this._renderArea.attr("transform", "translate(" + this.width() / 2 + "," + this.height() / 2 + ")");
            };
            Pie.prototype.addDataset = function (keyOrDataset, dataset) {
                if (this._datasetKeysInOrder.length === 1) {
                    Plottable._Util.Methods.warn("Only one dataset is supported in Pie plots");
                    return this;
                }
                _super.prototype.addDataset.call(this, keyOrDataset, dataset);
                return this;
            };
            Pie.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                attrToProjector["inner-radius"] = attrToProjector["inner-radius"] || d3.functor(0);
                attrToProjector["outer-radius"] = attrToProjector["outer-radius"] || d3.functor(Math.min(this.width(), this.height()) / 2);
                var defaultFillFunction = function (d, i) { return _this._colorScale.scale(String(i)); };
                attrToProjector["fill"] = attrToProjector["fill"] || defaultFillFunction;
                return attrToProjector;
            };
            Pie.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Arc(key).setClass("arc");
            };
            Pie.prototype.getAllPlotData = function (datasetKeys) {
                var _this = this;
                var allPlotData = _super.prototype.getAllPlotData.call(this, datasetKeys);
                allPlotData.pixelPoints.forEach(function (pixelPoint) {
                    pixelPoint.x = pixelPoint.x + _this.width() / 2;
                    pixelPoint.y = pixelPoint.y + _this.height() / 2;
                });
                return allPlotData;
            };
            return Pie;
        })(Plot.AbstractPlot);
        Plot.Pie = Pie;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var AbstractXYPlot = (function (_super) {
            __extends(AbstractXYPlot, _super);
            /**
             * Constructs an XYPlot.
             *
             * An XYPlot is a plot from drawing 2-dimensional data. Common examples
             * include Scale.Line and Scale.Bar.
             *
             * @constructor
             * @param {any[]|Dataset} [dataset] The data or Dataset to be associated with this Renderer.
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             */
            function AbstractXYPlot(xScale, yScale) {
                var _this = this;
                _super.call(this);
                this._autoAdjustXScaleDomain = false;
                this._autoAdjustYScaleDomain = false;
                if (xScale == null || yScale == null) {
                    throw new Error("XYPlots require an xScale and yScale");
                }
                this.classed("xy-plot", true);
                this._xScale = xScale;
                this._yScale = yScale;
                this._updateXDomainer();
                xScale.broadcaster.registerListener("yDomainAdjustment" + this.getID(), function () { return _this._adjustYDomainOnChangeFromX(); });
                this._updateYDomainer();
                yScale.broadcaster.registerListener("xDomainAdjustment" + this.getID(), function () { return _this._adjustXDomainOnChangeFromY(); });
            }
            /**
             * @param {string} attrToSet One of ["x", "y"] which determines the point's
             * x and y position in the Plot.
             */
            AbstractXYPlot.prototype.project = function (attrToSet, accessor, scale) {
                var _this = this;
                // We only want padding and nice-ing on scales that will correspond to axes / pixel layout.
                // So when we get an "x" or "y" scale, enable autoNiceing and autoPadding.
                if (attrToSet === "x" && scale) {
                    if (this._xScale) {
                        this._xScale.broadcaster.deregisterListener("yDomainAdjustment" + this.getID());
                    }
                    this._xScale = scale;
                    this._updateXDomainer();
                    scale.broadcaster.registerListener("yDomainAdjustment" + this.getID(), function () { return _this._adjustYDomainOnChangeFromX(); });
                }
                if (attrToSet === "y" && scale) {
                    if (this._yScale) {
                        this._yScale.broadcaster.deregisterListener("xDomainAdjustment" + this.getID());
                    }
                    this._yScale = scale;
                    this._updateYDomainer();
                    scale.broadcaster.registerListener("xDomainAdjustment" + this.getID(), function () { return _this._adjustXDomainOnChangeFromY(); });
                }
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                return this;
            };
            AbstractXYPlot.prototype.remove = function () {
                _super.prototype.remove.call(this);
                if (this._xScale) {
                    this._xScale.broadcaster.deregisterListener("yDomainAdjustment" + this.getID());
                }
                if (this._yScale) {
                    this._yScale.broadcaster.deregisterListener("xDomainAdjustment" + this.getID());
                }
                return this;
            };
            /**
             * Sets the automatic domain adjustment over visible points for y scale.
             *
             * If autoAdjustment is true adjustment is immediately performend.
             *
             * @param {boolean} autoAdjustment The new value for the automatic adjustment domain for y scale.
             * @returns {AbstractXYPlot} The calling AbstractXYPlot.
             */
            AbstractXYPlot.prototype.automaticallyAdjustYScaleOverVisiblePoints = function (autoAdjustment) {
                this._autoAdjustYScaleDomain = autoAdjustment;
                this._adjustYDomainOnChangeFromX();
                return this;
            };
            /**
             * Sets the automatic domain adjustment over visible points for x scale.
             *
             * If autoAdjustment is true adjustment is immediately performend.
             *
             * @param {boolean} autoAdjustment The new value for the automatic adjustment domain for x scale.
             * @returns {AbstractXYPlot} The calling AbstractXYPlot.
             */
            AbstractXYPlot.prototype.automaticallyAdjustXScaleOverVisiblePoints = function (autoAdjustment) {
                this._autoAdjustXScaleDomain = autoAdjustment;
                this._adjustXDomainOnChangeFromY();
                return this;
            };
            AbstractXYPlot.prototype._generateAttrToProjector = function () {
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var positionXFn = attrToProjector["x"];
                var positionYFn = attrToProjector["y"];
                attrToProjector["defined"] = function (d, i, u, m) {
                    var positionX = positionXFn(d, i, u, m);
                    var positionY = positionYFn(d, i, u, m);
                    return positionX != null && positionX === positionX && positionY != null && positionY === positionY;
                };
                return attrToProjector;
            };
            AbstractXYPlot.prototype._computeLayout = function (offeredXOrigin, offeredYOffset, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOffset, availableWidth, availableHeight);
                this._xScale.range([0, this.width()]);
                if (this._yScale instanceof Plottable.Scale.Category) {
                    this._yScale.range([0, this.height()]);
                }
                else {
                    this._yScale.range([this.height(), 0]);
                }
            };
            AbstractXYPlot.prototype._updateXDomainer = function () {
                if (this._xScale instanceof Plottable.Scale.AbstractQuantitative) {
                    var scale = this._xScale;
                    if (!scale._userSetDomainer) {
                        scale.domainer().pad().nice();
                    }
                }
            };
            AbstractXYPlot.prototype._updateYDomainer = function () {
                if (this._yScale instanceof Plottable.Scale.AbstractQuantitative) {
                    var scale = this._yScale;
                    if (!scale._userSetDomainer) {
                        scale.domainer().pad().nice();
                    }
                }
            };
            /**
             * Adjusts both domains' extents to show all datasets.
             *
             * This call does not override auto domain adjustment behavior over visible points.
             */
            AbstractXYPlot.prototype.showAllData = function () {
                this._xScale.autoDomain();
                if (!this._autoAdjustYScaleDomain) {
                    this._yScale.autoDomain();
                }
            };
            AbstractXYPlot.prototype._adjustYDomainOnChangeFromX = function () {
                if (!this._projectorsReady()) {
                    return;
                }
                if (this._autoAdjustYScaleDomain) {
                    this._adjustDomainToVisiblePoints(this._xScale, this._yScale, true);
                }
            };
            AbstractXYPlot.prototype._adjustXDomainOnChangeFromY = function () {
                if (!this._projectorsReady()) {
                    return;
                }
                if (this._autoAdjustXScaleDomain) {
                    this._adjustDomainToVisiblePoints(this._yScale, this._xScale, false);
                }
            };
            AbstractXYPlot.prototype._adjustDomainToVisiblePoints = function (fromScale, toScale, fromX) {
                if (toScale instanceof Plottable.Scale.AbstractQuantitative) {
                    var toScaleQ = toScale;
                    var normalizedData = this._normalizeDatasets(fromX);
                    var filterFn;
                    if (fromScale instanceof Plottable.Scale.AbstractQuantitative) {
                        var fromDomain = fromScale.domain();
                        filterFn = function (a) { return fromDomain[0] <= a && fromDomain[1] >= a; };
                    }
                    else {
                        var fromDomainSet = d3.set(fromScale.domain());
                        filterFn = function (a) { return fromDomainSet.has(a); };
                    }
                    var adjustedDomain = this._adjustDomainOverVisiblePoints(normalizedData, filterFn);
                    if (adjustedDomain.length === 0) {
                        return;
                    }
                    adjustedDomain = toScaleQ.domainer().computeDomain([adjustedDomain], toScaleQ);
                    toScaleQ.domain(adjustedDomain);
                }
            };
            AbstractXYPlot.prototype._normalizeDatasets = function (fromX) {
                var _this = this;
                var aAccessor = this._projections[fromX ? "x" : "y"].accessor;
                var bAccessor = this._projections[fromX ? "y" : "x"].accessor;
                return Plottable._Util.Methods.flatten(this._datasetKeysInOrder.map(function (key) {
                    var dataset = _this._key2PlotDatasetKey.get(key).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(key).plotMetadata;
                    return dataset.data().map(function (d, i) {
                        return { a: aAccessor(d, i, dataset.metadata(), plotMetadata), b: bAccessor(d, i, dataset.metadata(), plotMetadata) };
                    });
                }));
            };
            AbstractXYPlot.prototype._adjustDomainOverVisiblePoints = function (values, filterFn) {
                var bVals = values.filter(function (v) { return filterFn(v.a); }).map(function (v) { return v.b; });
                var retVal = [];
                if (bVals.length !== 0) {
                    retVal = [Plottable._Util.Methods.min(bVals, null), Plottable._Util.Methods.max(bVals, null)];
                }
                return retVal;
            };
            AbstractXYPlot.prototype._projectorsReady = function () {
                return this._projections["x"] && this._projections["y"];
            };
            return AbstractXYPlot;
        })(Plot.AbstractPlot);
        Plot.AbstractXYPlot = AbstractXYPlot;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            /**
             * Constructs a RectanglePlot.
             *
             * A RectanglePlot consists of a bunch of rectangles. The user is required to
             * project the left and right bounds of the rectangle (x1 and x2 respectively)
             * as well as the bottom and top bounds (y1 and y2 respectively)
             *
             * @constructor
             * @param {Scale.AbstractScale} xScale The x scale to use.
             * @param {Scale.AbstractScale} yScale The y scale to use.
             */
            function Rectangle(xScale, yScale) {
                _super.call(this, xScale, yScale);
                this._defaultFillColor = new Plottable.Scale.Color().range()[0];
                this.classed("rectangle-plot", true);
            }
            Rectangle.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Rect(key, true);
            };
            Rectangle.prototype._generateAttrToProjector = function () {
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                // Copy each of the different projectors.
                var x1Attr = attrToProjector["x1"];
                var y1Attr = attrToProjector["y1"];
                var x2Attr = attrToProjector["x2"];
                var y2Attr = attrToProjector["y2"];
                // Generate width based on difference, then adjust for the correct x origin
                attrToProjector["width"] = function (d, i, u, m) { return Math.abs(x2Attr(d, i, u, m) - x1Attr(d, i, u, m)); };
                attrToProjector["x"] = function (d, i, u, m) { return Math.min(x1Attr(d, i, u, m), x2Attr(d, i, u, m)); };
                // Generate height based on difference, then adjust for the correct y origin
                attrToProjector["height"] = function (d, i, u, m) { return Math.abs(y2Attr(d, i, u, m) - y1Attr(d, i, u, m)); };
                attrToProjector["y"] = function (d, i, u, m) { return Math.max(y1Attr(d, i, u, m), y2Attr(d, i, u, m)) - attrToProjector["height"](d, i, u, m); };
                // Clean up the attributes projected onto the SVG elements
                delete attrToProjector["x1"];
                delete attrToProjector["y1"];
                delete attrToProjector["x2"];
                delete attrToProjector["y2"];
                attrToProjector["fill"] = attrToProjector["fill"] || d3.functor(this._defaultFillColor);
                return attrToProjector;
            };
            Rectangle.prototype._generateDrawSteps = function () {
                return [{ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("rectangles") }];
            };
            return Rectangle;
        })(Plot.AbstractXYPlot);
        Plot.Rectangle = Rectangle;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var Scatter = (function (_super) {
            __extends(Scatter, _super);
            /**
             * Constructs a ScatterPlot.
             *
             * @constructor
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             */
            function Scatter(xScale, yScale) {
                _super.call(this, xScale, yScale);
                this._closeDetectionRadius = 5;
                this.classed("scatter-plot", true);
                this._defaultFillColor = new Plottable.Scale.Color().range()[0];
                this.animator("symbols-reset", new Plottable.Animator.Null());
                this.animator("symbols", new Plottable.Animator.Base().duration(250).delay(5));
            }
            Scatter.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Symbol(key);
            };
            Scatter.prototype._generateAttrToProjector = function () {
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                attrToProjector["size"] = attrToProjector["size"] || d3.functor(6);
                attrToProjector["opacity"] = attrToProjector["opacity"] || d3.functor(0.6);
                attrToProjector["fill"] = attrToProjector["fill"] || d3.functor(this._defaultFillColor);
                attrToProjector["symbol"] = attrToProjector["symbol"] || (function () { return Plottable.SymbolFactories.circle(); });
                return attrToProjector;
            };
            Scatter.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._dataChanged && this._animate) {
                    var resetAttrToProjector = this._generateAttrToProjector();
                    resetAttrToProjector["size"] = function () { return 0; };
                    drawSteps.push({ attrToProjector: resetAttrToProjector, animator: this._getAnimator("symbols-reset") });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("symbols") });
                return drawSteps;
            };
            Scatter.prototype._getClosestStruckPoint = function (p, range) {
                var _this = this;
                var attrToProjector = this._generateAttrToProjector();
                var xProjector = attrToProjector["x"];
                var yProjector = attrToProjector["y"];
                var getDistSq = function (d, i, userMetdata, plotMetadata) {
                    var dx = attrToProjector["x"](d, i, userMetdata, plotMetadata) - p.x;
                    var dy = attrToProjector["y"](d, i, userMetdata, plotMetadata) - p.y;
                    return (dx * dx + dy * dy);
                };
                var overAPoint = false;
                var closestElement;
                var closestElementUserMetadata;
                var closestElementPlotMetadata;
                var closestIndex;
                var minDistSq = range * range;
                this._datasetKeysInOrder.forEach(function (key) {
                    var dataset = _this._key2PlotDatasetKey.get(key).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(key).plotMetadata;
                    var drawer = _this._key2PlotDatasetKey.get(key).drawer;
                    drawer._getRenderArea().selectAll("path").each(function (d, i) {
                        var distSq = getDistSq(d, i, dataset.metadata(), plotMetadata);
                        var r = attrToProjector["size"](d, i, dataset.metadata(), plotMetadata) / 2;
                        if (distSq < r * r) {
                            if (!overAPoint || distSq < minDistSq) {
                                closestElement = this;
                                closestIndex = i;
                                minDistSq = distSq;
                                closestElementUserMetadata = dataset.metadata();
                                closestElementPlotMetadata = plotMetadata;
                            }
                            overAPoint = true;
                        }
                        else if (!overAPoint && distSq < minDistSq) {
                            closestElement = this;
                            closestIndex = i;
                            minDistSq = distSq;
                            closestElementUserMetadata = dataset.metadata();
                            closestElementPlotMetadata = plotMetadata;
                        }
                    });
                });
                if (!closestElement) {
                    return {
                        selection: null,
                        pixelPositions: null,
                        data: null
                    };
                }
                var closestSelection = d3.select(closestElement);
                var closestData = closestSelection.data();
                var closestPoint = {
                    x: attrToProjector["x"](closestData[0], closestIndex, closestElementUserMetadata, closestElementPlotMetadata),
                    y: attrToProjector["y"](closestData[0], closestIndex, closestElementUserMetadata, closestElementPlotMetadata)
                };
                return {
                    selection: closestSelection,
                    pixelPositions: [closestPoint],
                    data: closestData
                };
            };
            Scatter.prototype._isVisibleOnPlot = function (datum, pixelPoint, selection) {
                var xRange = { min: 0, max: this.width() };
                var yRange = { min: 0, max: this.height() };
                var translation = d3.transform(selection.attr("transform")).translate;
                var bbox = selection[0][0].getBBox();
                var translatedBbox = {
                    x: bbox.x + translation[0],
                    y: bbox.y + translation[1],
                    width: bbox.width,
                    height: bbox.height
                };
                return Plottable._Util.Methods.intersectsBBox(xRange, yRange, translatedBbox);
            };
            //===== Hover logic =====
            Scatter.prototype._hoverOverComponent = function (p) {
                // no-op
            };
            Scatter.prototype._hoverOutComponent = function (p) {
                // no-op
            };
            Scatter.prototype._doHover = function (p) {
                return this._getClosestStruckPoint(p, this._closeDetectionRadius);
            };
            return Scatter;
        })(Plot.AbstractXYPlot);
        Plot.Scatter = Scatter;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var Grid = (function (_super) {
            __extends(Grid, _super);
            /**
             * Constructs a GridPlot.
             *
             * A GridPlot is used to shade a grid of data. Each datum is a cell on the
             * grid, and the datum can control what color it is.
             *
             * @constructor
             * @param {Scale.AbstractScale} xScale The x scale to use.
             * @param {Scale.AbstractScale} yScale The y scale to use.
             * @param {Scale.Color|Scale.InterpolatedColor} colorScale The color scale
             * to use for each grid cell.
             */
            function Grid(xScale, yScale, colorScale) {
                _super.call(this, xScale, yScale);
                this.classed("grid-plot", true);
                // The x and y scales should render in bands with no padding for category scales
                if (xScale instanceof Plottable.Scale.Category) {
                    xScale.innerPadding(0).outerPadding(0);
                }
                if (yScale instanceof Plottable.Scale.Category) {
                    yScale.innerPadding(0).outerPadding(0);
                }
                this._colorScale = colorScale;
                this.animator("cells", new Plottable.Animator.Null());
            }
            Grid.prototype.addDataset = function (keyOrDataset, dataset) {
                if (this._datasetKeysInOrder.length === 1) {
                    Plottable._Util.Methods.warn("Only one dataset is supported in Grid plots");
                    return this;
                }
                _super.prototype.addDataset.call(this, keyOrDataset, dataset);
                return this;
            };
            Grid.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Rect(key, true);
            };
            /**
             * @param {string} attrToSet One of ["x", "y", "x2", "y2", "fill"]. If "fill" is used,
             * the data should return a valid CSS color.
             */
            Grid.prototype.project = function (attrToSet, accessor, scale) {
                var _this = this;
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                if (attrToSet === "x") {
                    if (scale instanceof Plottable.Scale.Category) {
                        this.project("x1", function (d, i, u, m) {
                            return scale.scale(_this._projections["x"].accessor(d, i, u, m)) - scale.rangeBand() / 2;
                        });
                        this.project("x2", function (d, i, u, m) {
                            return scale.scale(_this._projections["x"].accessor(d, i, u, m)) + scale.rangeBand() / 2;
                        });
                    }
                    if (scale instanceof Plottable.Scale.AbstractQuantitative) {
                        this.project("x1", function (d, i, u, m) {
                            return scale.scale(_this._projections["x"].accessor(d, i, u, m));
                        });
                    }
                }
                if (attrToSet === "y") {
                    if (scale instanceof Plottable.Scale.Category) {
                        this.project("y1", function (d, i, u, m) {
                            return scale.scale(_this._projections["y"].accessor(d, i, u, m)) - scale.rangeBand() / 2;
                        });
                        this.project("y2", function (d, i, u, m) {
                            return scale.scale(_this._projections["y"].accessor(d, i, u, m)) + scale.rangeBand() / 2;
                        });
                    }
                    if (scale instanceof Plottable.Scale.AbstractQuantitative) {
                        this.project("y1", function (d, i, u, m) {
                            return scale.scale(_this._projections["y"].accessor(d, i, u, m));
                        });
                    }
                }
                if (attrToSet === "fill") {
                    this._colorScale = this._projections["fill"].scale;
                }
                return this;
            };
            Grid.prototype._generateDrawSteps = function () {
                return [{ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("cells") }];
            };
            return Grid;
        })(Plot.Rectangle);
        Plot.Grid = Grid;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var Bar = (function (_super) {
            __extends(Bar, _super);
            /**
             * Constructs a BarPlot.
             *
             * @constructor
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             * @param {boolean} isVertical if the plot if vertical.
             */
            function Bar(xScale, yScale, isVertical) {
                if (isVertical === void 0) { isVertical = true; }
                _super.call(this, xScale, yScale);
                this._barAlignmentFactor = 0.5;
                this._barLabelFormatter = Plottable.Formatters.identity();
                this._barLabelsEnabled = false;
                this._hoverMode = "point";
                this._hideBarsIfAnyAreTooWide = true;
                this.classed("bar-plot", true);
                this._defaultFillColor = new Plottable.Scale.Color().range()[0];
                this.animator("bars-reset", new Plottable.Animator.Null());
                this.animator("bars", new Plottable.Animator.Base());
                this.animator("baseline", new Plottable.Animator.Null());
                this._isVertical = isVertical;
                this.baseline(0);
            }
            Bar.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Rect(key, this._isVertical);
            };
            Bar.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._baseline = this._renderArea.append("line").classed("baseline", true);
            };
            Bar.prototype.baseline = function (value) {
                if (value == null) {
                    return this._baselineValue;
                }
                this._baselineValue = value;
                this._updateXDomainer();
                this._updateYDomainer();
                this._render();
                return this;
            };
            /**
             * Sets the bar alignment relative to the independent axis.
             * VerticalBarPlot supports "left", "center", "right"
             * HorizontalBarPlot supports "top", "center", "bottom"
             *
             * @param {string} alignment The desired alignment.
             * @returns {Bar} The calling Bar.
             */
            Bar.prototype.barAlignment = function (alignment) {
                var alignmentLC = alignment.toLowerCase();
                var align2factor = this.constructor._BarAlignmentToFactor;
                if (align2factor[alignmentLC] === undefined) {
                    throw new Error("unsupported bar alignment");
                }
                this._barAlignmentFactor = align2factor[alignmentLC];
                this._render();
                return this;
            };
            Bar.prototype.barLabelsEnabled = function (enabled) {
                if (enabled === undefined) {
                    return this._barLabelsEnabled;
                }
                else {
                    this._barLabelsEnabled = enabled;
                    this._render();
                    return this;
                }
            };
            Bar.prototype.barLabelFormatter = function (formatter) {
                if (formatter == null) {
                    return this._barLabelFormatter;
                }
                else {
                    this._barLabelFormatter = formatter;
                    this._render();
                    return this;
                }
            };
            /**
             * Retrieves the closest PlotData to queryPoint.
             *
             * Bars containing the queryPoint are considered closest. If queryPoint lies outside
             * of all bars, we return the closest in the dominant axis (x for horizontal
             * charts, y for vertical) and break ties using the secondary axis.
             *
             * @param {Point} queryPoint The point to which plot data should be compared
             *
             * @returns {PlotData} The PlotData closest to queryPoint
             */
            Bar.prototype.getClosestPlotData = function (queryPoint) {
                var _this = this;
                var chartXExtent = { min: 0, max: this.width() };
                var chartYExtent = { min: 0, max: this.height() };
                var minPrimaryDist = Infinity;
                var minSecondaryDist = Infinity;
                var closestData = [];
                var closestPixelPoints = [];
                var closestElements = [];
                var queryPtPrimary = this._isVertical ? queryPoint.x : queryPoint.y;
                var queryPtSecondary = this._isVertical ? queryPoint.y : queryPoint.x;
                // SVGRects are positioned with sub-pixel accuracy (the default unit
                // for the x, y, height & width attributes), but user selections (e.g. via
                // mouse events) usually have pixel accuracy. We add a tolerance of 0.5 pixels.
                var tolerance = 0.5;
                this.datasetOrder().forEach(function (key) {
                    var plotData = _this.getAllPlotData(key);
                    plotData.pixelPoints.forEach(function (plotPt, index) {
                        var datum = plotData.data[index];
                        var bar = plotData.selection[0][index];
                        if (!_this._isVisibleOnPlot(datum, plotPt, d3.select(bar))) {
                            return;
                        }
                        var primaryDist = 0;
                        var secondaryDist = 0;
                        // if we're inside a bar, distance in both directions should stay 0
                        var barBBox = bar.getBBox();
                        if (!Plottable._Util.Methods.intersectsBBox(queryPoint.x, queryPoint.y, barBBox, tolerance)) {
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
                        if (primaryDist < minPrimaryDist || primaryDist === minPrimaryDist && secondaryDist < minSecondaryDist) {
                            closestData = [];
                            closestPixelPoints = [];
                            closestElements = [];
                            minPrimaryDist = primaryDist;
                            minSecondaryDist = secondaryDist;
                        }
                        // bars minPrimaryDist away are part of the closest set
                        if (primaryDist === minPrimaryDist && secondaryDist === minSecondaryDist) {
                            closestData.push(datum);
                            closestPixelPoints.push(plotPt);
                            closestElements.push(bar);
                        }
                    });
                });
                return {
                    data: closestData,
                    pixelPoints: closestPixelPoints,
                    selection: d3.selectAll(closestElements)
                };
            };
            Bar.prototype._isVisibleOnPlot = function (datum, pixelPoint, selection) {
                var xRange = { min: 0, max: this.width() };
                var yRange = { min: 0, max: this.height() };
                var barBBox = selection[0][0].getBBox();
                return Plottable._Util.Methods.intersectsBBox(xRange, yRange, barBBox);
            };
            /**
             * Gets the bar under the given pixel position (if [xValOrExtent]
             * and [yValOrExtent] are {number}s), under a given line (if only one
             * of [xValOrExtent] or [yValOrExtent] are {Extent}s) or are under a
             * 2D area (if [xValOrExtent] and [yValOrExtent] are both {Extent}s).
             *
             * @param {number | Extent} xValOrExtent The pixel x position, or range of x values.
             * @param {number | Extent} yValOrExtent The pixel y position, or range of y values.
             * @returns {D3.Selection} The selected bar, or null if no bar was selected.
             */
            Bar.prototype.getBars = function (xValOrExtent, yValOrExtent) {
                var _this = this;
                if (!this._isSetup) {
                    return d3.select();
                }
                // currently, linear scan the bars. If inversion is implemented on non-numeric scales we might be able to do better.
                var bars = this._datasetKeysInOrder.reduce(function (bars, key) { return bars.concat(_this._getBarsFromDataset(key, xValOrExtent, yValOrExtent)); }, []);
                return d3.selectAll(bars);
            };
            Bar.prototype._getBarsFromDataset = function (key, xValOrExtent, yValOrExtent) {
                var bars = [];
                var drawer = this._key2PlotDatasetKey.get(key).drawer;
                drawer._getRenderArea().selectAll("rect").each(function (d) {
                    if (Plottable._Util.Methods.intersectsBBox(xValOrExtent, yValOrExtent, this.getBBox())) {
                        bars.push(this);
                    }
                });
                return bars;
            };
            Bar.prototype._updateDomainer = function (scale) {
                if (scale instanceof Plottable.Scale.AbstractQuantitative) {
                    var qscale = scale;
                    if (!qscale._userSetDomainer) {
                        if (this._baselineValue != null) {
                            qscale.domainer().addPaddingException(this._baselineValue, "BAR_PLOT+" + this.getID()).addIncludedValue(this._baselineValue, "BAR_PLOT+" + this.getID());
                        }
                        else {
                            qscale.domainer().removePaddingException("BAR_PLOT+" + this.getID()).removeIncludedValue("BAR_PLOT+" + this.getID());
                        }
                        qscale.domainer().pad().nice();
                    }
                    // prepending "BAR_PLOT" is unnecessary but reduces likely of user accidentally creating collisions
                    qscale._autoDomainIfAutomaticMode();
                }
            };
            Bar.prototype._updateYDomainer = function () {
                if (this._isVertical) {
                    this._updateDomainer(this._yScale);
                }
                else {
                    _super.prototype._updateYDomainer.call(this);
                }
            };
            Bar.prototype._updateXDomainer = function () {
                if (!this._isVertical) {
                    this._updateDomainer(this._xScale);
                }
                else {
                    _super.prototype._updateXDomainer.call(this);
                }
            };
            Bar.prototype._additionalPaint = function (time) {
                var _this = this;
                var primaryScale = this._isVertical ? this._yScale : this._xScale;
                var scaledBaseline = primaryScale.scale(this._baselineValue);
                var baselineAttr = {
                    "x1": this._isVertical ? 0 : scaledBaseline,
                    "y1": this._isVertical ? scaledBaseline : 0,
                    "x2": this._isVertical ? this.width() : scaledBaseline,
                    "y2": this._isVertical ? scaledBaseline : this.height()
                };
                this._getAnimator("baseline").animate(this._baseline, baselineAttr);
                var drawers = this._getDrawersInOrder();
                drawers.forEach(function (d) { return d.removeLabels(); });
                if (this._barLabelsEnabled) {
                    Plottable._Util.Methods.setTimeout(function () { return _this._drawLabels(); }, time);
                }
            };
            Bar.prototype._drawLabels = function () {
                var _this = this;
                var drawers = this._getDrawersInOrder();
                var attrToProjector = this._generateAttrToProjector();
                var dataToDraw = this._getDataToDraw();
                this._datasetKeysInOrder.forEach(function (k, i) { return drawers[i].drawText(dataToDraw.get(k), attrToProjector, _this._key2PlotDatasetKey.get(k).dataset.metadata(), _this._key2PlotDatasetKey.get(k).plotMetadata); });
                if (this._hideBarsIfAnyAreTooWide && drawers.some(function (d) { return d._getIfLabelsTooWide(); })) {
                    drawers.forEach(function (d) { return d.removeLabels(); });
                }
            };
            Bar.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._dataChanged && this._animate) {
                    var resetAttrToProjector = this._generateAttrToProjector();
                    var primaryScale = this._isVertical ? this._yScale : this._xScale;
                    var scaledBaseline = primaryScale.scale(this._baselineValue);
                    var positionAttr = this._isVertical ? "y" : "x";
                    var dimensionAttr = this._isVertical ? "height" : "width";
                    resetAttrToProjector[positionAttr] = function () { return scaledBaseline; };
                    resetAttrToProjector[dimensionAttr] = function () { return 0; };
                    drawSteps.push({ attrToProjector: resetAttrToProjector, animator: this._getAnimator("bars-reset") });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("bars") });
                return drawSteps;
            };
            Bar.prototype._generateAttrToProjector = function () {
                var _this = this;
                // Primary scale/direction: the "length" of the bars
                // Secondary scale/direction: the "width" of the bars
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var primaryScale = this._isVertical ? this._yScale : this._xScale;
                var secondaryScale = this._isVertical ? this._xScale : this._yScale;
                var primaryAttr = this._isVertical ? "y" : "x";
                var secondaryAttr = this._isVertical ? "x" : "y";
                var scaledBaseline = primaryScale.scale(this._baselineValue);
                var positionF = attrToProjector[secondaryAttr];
                var widthF = attrToProjector["width"];
                if (widthF == null) {
                    widthF = function () { return _this._getBarPixelWidth(); };
                }
                var originalPositionFn = attrToProjector[primaryAttr];
                var heightF = function (d, i, u, m) {
                    return Math.abs(scaledBaseline - originalPositionFn(d, i, u, m));
                };
                attrToProjector["width"] = this._isVertical ? widthF : heightF;
                attrToProjector["height"] = this._isVertical ? heightF : widthF;
                if (secondaryScale instanceof Plottable.Scale.Category) {
                    attrToProjector[secondaryAttr] = function (d, i, u, m) { return positionF(d, i, u, m) - widthF(d, i, u, m) / 2; };
                }
                else {
                    attrToProjector[secondaryAttr] = function (d, i, u, m) { return positionF(d, i, u, m) - widthF(d, i, u, m) * _this._barAlignmentFactor; };
                }
                attrToProjector[primaryAttr] = function (d, i, u, m) {
                    var originalPos = originalPositionFn(d, i, u, m);
                    // If it is past the baseline, it should start at the baselin then width/height
                    // carries it over. If it's not past the baseline, leave it at original position and
                    // then width/height carries it to baseline
                    return (originalPos > scaledBaseline) ? scaledBaseline : originalPos;
                };
                var primaryAccessor = this._projections[primaryAttr].accessor;
                if (this.barLabelsEnabled && this.barLabelFormatter) {
                    attrToProjector["label"] = function (d, i, u, m) {
                        return _this._barLabelFormatter(primaryAccessor(d, i, u, m));
                    };
                    attrToProjector["positive"] = function (d, i, u, m) { return originalPositionFn(d, i, u, m) <= scaledBaseline; };
                }
                attrToProjector["fill"] = attrToProjector["fill"] || d3.functor(this._defaultFillColor);
                return attrToProjector;
            };
            /**
             * Computes the barPixelWidth of all the bars in the plot.
             *
             * If the position scale of the plot is a CategoryScale and in bands mode, then the rangeBands function will be used.
             * If the position scale of the plot is a CategoryScale and in points mode, then
             *   from https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangePoints, the max barPixelWidth is step * padding
             * If the position scale of the plot is a QuantitativeScale, then _getMinimumDataWidth is scaled to compute the barPixelWidth
             */
            Bar.prototype._getBarPixelWidth = function () {
                var _this = this;
                var barPixelWidth;
                var barScale = this._isVertical ? this._xScale : this._yScale;
                if (barScale instanceof Plottable.Scale.Category) {
                    barPixelWidth = barScale.rangeBand();
                }
                else {
                    var barAccessor = this._isVertical ? this._projections["x"].accessor : this._projections["y"].accessor;
                    var numberBarAccessorData = d3.set(Plottable._Util.Methods.flatten(this._datasetKeysInOrder.map(function (k) {
                        var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                        var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                        return dataset.data().map(function (d, i) { return barAccessor(d, i, dataset.metadata(), plotMetadata).valueOf(); });
                    }))).values().map(function (value) { return +value; });
                    numberBarAccessorData.sort(function (a, b) { return a - b; });
                    var barAccessorDataPairs = d3.pairs(numberBarAccessorData);
                    var barWidthDimension = this._isVertical ? this.width() : this.height();
                    barPixelWidth = Plottable._Util.Methods.min(barAccessorDataPairs, function (pair, i) {
                        return Math.abs(barScale.scale(pair[1]) - barScale.scale(pair[0]));
                    }, barWidthDimension * Bar._SINGLE_BAR_DIMENSION_RATIO);
                    var scaledData = numberBarAccessorData.map(function (datum) { return barScale.scale(datum); });
                    var minScaledDatum = Plottable._Util.Methods.min(scaledData, 0);
                    if (this._barAlignmentFactor !== 0 && minScaledDatum > 0) {
                        barPixelWidth = Math.min(barPixelWidth, minScaledDatum / this._barAlignmentFactor);
                    }
                    var maxScaledDatum = Plottable._Util.Methods.max(scaledData, 0);
                    if (this._barAlignmentFactor !== 1 && maxScaledDatum < barWidthDimension) {
                        var margin = barWidthDimension - maxScaledDatum;
                        barPixelWidth = Math.min(barPixelWidth, margin / (1 - this._barAlignmentFactor));
                    }
                    barPixelWidth *= Bar._BAR_WIDTH_RATIO;
                }
                return barPixelWidth;
            };
            Bar.prototype.hoverMode = function (mode) {
                if (mode == null) {
                    return this._hoverMode;
                }
                var modeLC = mode.toLowerCase();
                if (modeLC !== "point" && modeLC !== "line") {
                    throw new Error(mode + " is not a valid hover mode");
                }
                this._hoverMode = modeLC;
                return this;
            };
            Bar.prototype._clearHoverSelection = function () {
                this._getDrawersInOrder().forEach(function (d, i) {
                    d._getRenderArea().selectAll("rect").classed("not-hovered hovered", false);
                });
            };
            //===== Hover logic =====
            Bar.prototype._hoverOverComponent = function (p) {
                // no-op
            };
            Bar.prototype._hoverOutComponent = function (p) {
                this._clearHoverSelection();
            };
            Bar.prototype._doHover = function (p) {
                var _this = this;
                var xPositionOrExtent = p.x;
                var yPositionOrExtent = p.y;
                if (this._hoverMode === "line") {
                    var maxExtent = { min: -Infinity, max: Infinity };
                    if (this._isVertical) {
                        yPositionOrExtent = maxExtent;
                    }
                    else {
                        xPositionOrExtent = maxExtent;
                    }
                }
                var xExtent = Plottable._Util.Methods.parseExtent(xPositionOrExtent);
                var yExtent = Plottable._Util.Methods.parseExtent(yPositionOrExtent);
                var bars = [];
                var points = [];
                var projectors = this._generateAttrToProjector();
                this._datasetKeysInOrder.forEach(function (key) {
                    var dataset = _this._key2PlotDatasetKey.get(key).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(key).plotMetadata;
                    var barsFromDataset = _this._getBarsFromDataset(key, xExtent, yExtent);
                    d3.selectAll(barsFromDataset).each(function (d, i) {
                        if (_this._isVertical) {
                            points.push({
                                x: projectors["x"](d, i, dataset.metadata(), plotMetadata) + projectors["width"](d, i, dataset.metadata(), plotMetadata) / 2,
                                y: projectors["y"](d, i, dataset.metadata(), plotMetadata) + (projectors["positive"](d, i, dataset.metadata(), plotMetadata) ? 0 : projectors["height"](d, i, dataset.metadata(), plotMetadata))
                            });
                        }
                        else {
                            points.push({
                                x: projectors["x"](d, i, dataset.metadata(), plotMetadata) + projectors["height"](d, i, dataset.metadata(), plotMetadata) / 2,
                                y: projectors["y"](d, i, dataset.metadata(), plotMetadata) + (projectors["positive"](d, i, dataset.metadata(), plotMetadata) ? 0 : projectors["width"](d, i, dataset.metadata(), plotMetadata))
                            });
                        }
                    });
                    bars = bars.concat(barsFromDataset);
                });
                var barsSelection = d3.selectAll(bars);
                if (!barsSelection.empty()) {
                    this._getDrawersInOrder().forEach(function (d, i) {
                        d._getRenderArea().selectAll("rect").classed({ "hovered": false, "not-hovered": true });
                    });
                    barsSelection.classed({ "hovered": true, "not-hovered": false });
                }
                else {
                    this._clearHoverSelection();
                    return {
                        data: null,
                        pixelPositions: null,
                        selection: null
                    };
                }
                return {
                    data: barsSelection.data(),
                    pixelPositions: points,
                    selection: barsSelection
                };
            };
            //===== /Hover logic =====
            Bar.prototype._getAllPlotData = function (datasetKeys) {
                var plotData = _super.prototype._getAllPlotData.call(this, datasetKeys);
                var valueScale = this._isVertical ? this._yScale : this._xScale;
                var scaledBaseline = (this._isVertical ? this._yScale : this._xScale).scale(this.baseline());
                var isVertical = this._isVertical;
                var barAlignmentFactor = this._barAlignmentFactor;
                plotData.selection.each(function (datum, index) {
                    var bar = d3.select(this);
                    // Using floored pixel values to account for pixel accuracy inconsistencies across browsers
                    if (isVertical && Math.floor(+bar.attr("y")) >= Math.floor(scaledBaseline)) {
                        plotData.pixelPoints[index].y += +bar.attr("height");
                    }
                    else if (!isVertical && Math.floor(+bar.attr("x")) < Math.floor(scaledBaseline)) {
                        plotData.pixelPoints[index].x -= +bar.attr("width");
                    }
                    if (isVertical) {
                        plotData.pixelPoints[index].x = +bar.attr("x") + +bar.attr("width") * barAlignmentFactor;
                    }
                    else {
                        plotData.pixelPoints[index].y = +bar.attr("y") + +bar.attr("height") * barAlignmentFactor;
                    }
                });
                return plotData;
            };
            Bar._BarAlignmentToFactor = { "left": 0, "center": 0.5, "right": 1 };
            Bar._DEFAULT_WIDTH = 10;
            Bar._BAR_WIDTH_RATIO = 0.95;
            Bar._SINGLE_BAR_DIMENSION_RATIO = 0.4;
            return Bar;
        })(Plot.AbstractXYPlot);
        Plot.Bar = Bar;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var Line = (function (_super) {
            __extends(Line, _super);
            /**
             * Constructs a LinePlot.
             *
             * @constructor
             * @param {QuantitativeScale} xScale The x scale to use.
             * @param {QuantitativeScale} yScale The y scale to use.
             */
            function Line(xScale, yScale) {
                _super.call(this, xScale, yScale);
                this._hoverDetectionRadius = 15;
                this.classed("line-plot", true);
                this.animator("reset", new Plottable.Animator.Null());
                this.animator("main", new Plottable.Animator.Base().duration(600).easing("exp-in-out"));
                this._defaultStrokeColor = new Plottable.Scale.Color().range()[0];
            }
            Line.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._hoverTarget = this.foreground().append("circle").classed("hover-target", true).attr("r", this._hoverDetectionRadius).style("visibility", "hidden");
            };
            Line.prototype._rejectNullsAndNaNs = function (d, i, userMetdata, plotMetadata, accessor) {
                var value = accessor(d, i, userMetdata, plotMetadata);
                return value != null && value === value;
            };
            Line.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Line(key);
            };
            Line.prototype._getResetYFunction = function () {
                // gets the y-value generator for the animation start point
                var yDomain = this._yScale.domain();
                var domainMax = Math.max(yDomain[0], yDomain[1]);
                var domainMin = Math.min(yDomain[0], yDomain[1]);
                // start from zero, or the closest domain value to zero
                // avoids lines zooming on from offscreen.
                var startValue = (domainMax < 0 && domainMax) || (domainMin > 0 && domainMin) || 0;
                var scaledStartValue = this._yScale.scale(startValue);
                return function (d, i, u, m) { return scaledStartValue; };
            };
            Line.prototype._generateDrawSteps = function () {
                var drawSteps = [];
                if (this._dataChanged && this._animate) {
                    var attrToProjector = this._generateAttrToProjector();
                    attrToProjector["y"] = this._getResetYFunction();
                    drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator("reset") });
                }
                drawSteps.push({ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("main") });
                return drawSteps;
            };
            Line.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var wholeDatumAttributes = this._wholeDatumAttributes();
                var isSingleDatumAttr = function (attr) { return wholeDatumAttributes.indexOf(attr) === -1; };
                var singleDatumAttributes = d3.keys(attrToProjector).filter(isSingleDatumAttr);
                singleDatumAttributes.forEach(function (attribute) {
                    var projector = attrToProjector[attribute];
                    attrToProjector[attribute] = function (data, i, u, m) { return data.length > 0 ? projector(data[0], i, u, m) : null; };
                });
                var xFunction = attrToProjector["x"];
                var yFunction = attrToProjector["y"];
                attrToProjector["defined"] = function (d, i, u, m) { return _this._rejectNullsAndNaNs(d, i, u, m, xFunction) && _this._rejectNullsAndNaNs(d, i, u, m, yFunction); };
                attrToProjector["stroke"] = attrToProjector["stroke"] || d3.functor(this._defaultStrokeColor);
                attrToProjector["stroke-width"] = attrToProjector["stroke-width"] || d3.functor("2px");
                return attrToProjector;
            };
            Line.prototype._wholeDatumAttributes = function () {
                return ["x", "y"];
            };
            Line.prototype._getClosestWithinRange = function (p, range) {
                var _this = this;
                var attrToProjector = this._generateAttrToProjector();
                var xProjector = attrToProjector["x"];
                var yProjector = attrToProjector["y"];
                var getDistSq = function (d, i, userMetdata, plotMetadata) {
                    var dx = +xProjector(d, i, userMetdata, plotMetadata) - p.x;
                    var dy = +yProjector(d, i, userMetdata, plotMetadata) - p.y;
                    return (dx * dx + dy * dy);
                };
                var closestOverall;
                var closestPoint;
                var closestDistSq = range * range;
                this._datasetKeysInOrder.forEach(function (key) {
                    var dataset = _this._key2PlotDatasetKey.get(key).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(key).plotMetadata;
                    dataset.data().forEach(function (d, i) {
                        var distSq = getDistSq(d, i, dataset.metadata(), plotMetadata);
                        if (distSq < closestDistSq) {
                            closestOverall = d;
                            closestPoint = {
                                x: xProjector(d, i, dataset.metadata(), plotMetadata),
                                y: yProjector(d, i, dataset.metadata(), plotMetadata)
                            };
                            closestDistSq = distSq;
                        }
                    });
                });
                return {
                    closestValue: closestOverall,
                    closestPoint: closestPoint
                };
            };
            Line.prototype._getAllPlotData = function (datasetKeys) {
                var _this = this;
                var data = [];
                var pixelPoints = [];
                var allElements = [];
                datasetKeys.forEach(function (datasetKey) {
                    var plotDatasetKey = _this._key2PlotDatasetKey.get(datasetKey);
                    if (plotDatasetKey == null) {
                        return;
                    }
                    var drawer = plotDatasetKey.drawer;
                    plotDatasetKey.dataset.data().forEach(function (datum, index) {
                        var pixelPoint = drawer._getPixelPoint(datum, index);
                        if (pixelPoint.x !== pixelPoint.x || pixelPoint.y !== pixelPoint.y) {
                            return;
                        }
                        data.push(datum);
                        pixelPoints.push(pixelPoint);
                    });
                    if (plotDatasetKey.dataset.data().length > 0) {
                        allElements.push(drawer._getSelection(0).node());
                    }
                });
                return { data: data, pixelPoints: pixelPoints, selection: d3.selectAll(allElements) };
            };
            /**
             * Retrieves the closest PlotData to queryPoint.
             *
             * Lines implement an x-dominant notion of distance; points closest in x are
             * tie-broken by y distance.
             *
             * @param {Point} queryPoint The point to which plot data should be compared
             *
             * @returns {PlotData} The PlotData closest to queryPoint
             */
            Line.prototype.getClosestPlotData = function (queryPoint) {
                var _this = this;
                var minXDist = Infinity;
                var minYDist = Infinity;
                var closestData = [];
                var closestPixelPoints = [];
                var closestElements = [];
                this.datasetOrder().forEach(function (key) {
                    var plotData = _this.getAllPlotData(key);
                    plotData.pixelPoints.forEach(function (pixelPoint, index) {
                        var datum = plotData.data[index];
                        var line = plotData.selection[0][0];
                        if (!_this._isVisibleOnPlot(datum, pixelPoint, d3.select(line))) {
                            return;
                        }
                        var xDist = Math.abs(queryPoint.x - pixelPoint.x);
                        var yDist = Math.abs(queryPoint.y - pixelPoint.y);
                        if (xDist < minXDist || xDist === minXDist && yDist < minYDist) {
                            closestData = [];
                            closestPixelPoints = [];
                            closestElements = [];
                            minXDist = xDist;
                            minYDist = yDist;
                        }
                        if (xDist === minXDist && yDist === minYDist) {
                            closestData.push(datum);
                            closestPixelPoints.push(pixelPoint);
                            closestElements.push(line);
                        }
                    });
                });
                return {
                    data: closestData,
                    pixelPoints: closestPixelPoints,
                    selection: d3.selectAll(closestElements)
                };
            };
            //===== Hover logic =====
            Line.prototype._hoverOverComponent = function (p) {
                // no-op
            };
            Line.prototype._hoverOutComponent = function (p) {
                // no-op
            };
            Line.prototype._doHover = function (p) {
                var closestInfo = this._getClosestWithinRange(p, this._hoverDetectionRadius);
                var closestValue = closestInfo.closestValue;
                if (closestValue === undefined) {
                    return {
                        data: null,
                        pixelPositions: null,
                        selection: null
                    };
                }
                var closestPoint = closestInfo.closestPoint;
                this._hoverTarget.attr({
                    "cx": closestInfo.closestPoint.x,
                    "cy": closestInfo.closestPoint.y
                });
                return {
                    data: [closestValue],
                    pixelPositions: [closestPoint],
                    selection: this._hoverTarget
                };
            };
            return Line;
        })(Plot.AbstractXYPlot);
        Plot.Line = Line;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        /**
         * An AreaPlot draws a filled region (area) between the plot's projected "y" and projected "y0" values.
         */
        var Area = (function (_super) {
            __extends(Area, _super);
            /**
             * Constructs an AreaPlot.
             *
             * @constructor
             * @param {QuantitativeScale} xScale The x scale to use.
             * @param {QuantitativeScale} yScale The y scale to use.
             */
            function Area(xScale, yScale) {
                _super.call(this, xScale, yScale);
                this.classed("area-plot", true);
                this.project("y0", 0, yScale); // default
                this.animator("reset", new Plottable.Animator.Null());
                this.animator("main", new Plottable.Animator.Base().duration(600).easing("exp-in-out"));
                this._defaultFillColor = new Plottable.Scale.Color().range()[0];
            }
            Area.prototype._onDatasetUpdate = function () {
                _super.prototype._onDatasetUpdate.call(this);
                if (this._yScale != null) {
                    this._updateYDomainer();
                }
            };
            Area.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Area(key);
            };
            Area.prototype._updateYDomainer = function () {
                var _this = this;
                _super.prototype._updateYDomainer.call(this);
                var constantBaseline;
                var y0Projector = this._projections["y0"];
                var y0Accessor = y0Projector && y0Projector.accessor;
                if (y0Accessor != null) {
                    var extents = this.datasets().map(function (d) { return d._getExtent(y0Accessor, _this._yScale._typeCoercer); });
                    var extent = Plottable._Util.Methods.flatten(extents);
                    var uniqExtentVals = Plottable._Util.Methods.uniq(extent);
                    if (uniqExtentVals.length === 1) {
                        constantBaseline = uniqExtentVals[0];
                    }
                }
                if (!this._yScale._userSetDomainer) {
                    if (constantBaseline != null) {
                        this._yScale.domainer().addPaddingException(constantBaseline, "AREA_PLOT+" + this.getID());
                    }
                    else {
                        this._yScale.domainer().removePaddingException("AREA_PLOT+" + this.getID());
                    }
                    // prepending "AREA_PLOT" is unnecessary but reduces likely of user accidentally creating collisions
                    this._yScale._autoDomainIfAutomaticMode();
                }
            };
            Area.prototype.project = function (attrToSet, accessor, scale) {
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                if (attrToSet === "y0") {
                    this._updateYDomainer();
                }
                return this;
            };
            Area.prototype._getResetYFunction = function () {
                return this._generateAttrToProjector()["y0"];
            };
            Area.prototype._wholeDatumAttributes = function () {
                var wholeDatumAttributes = _super.prototype._wholeDatumAttributes.call(this);
                wholeDatumAttributes.push("y0");
                return wholeDatumAttributes;
            };
            Area.prototype._generateAttrToProjector = function () {
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                attrToProjector["fill-opacity"] = attrToProjector["fill-opacity"] || d3.functor(0.25);
                attrToProjector["fill"] = attrToProjector["fill"] || d3.functor(this._defaultFillColor);
                attrToProjector["stroke"] = attrToProjector["stroke"] || d3.functor(this._defaultFillColor);
                return attrToProjector;
            };
            return Area;
        })(Plot.Line);
        Plot.Area = Area;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var ClusteredBar = (function (_super) {
            __extends(ClusteredBar, _super);
            /**
             * Creates a ClusteredBarPlot.
             *
             * A ClusteredBarPlot is a plot that plots several bar plots next to each
             * other. For example, when plotting life expectancy across each country,
             * you would want each country to have a "male" and "female" bar.
             *
             * @constructor
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             * @param {boolean} isVertical if the plot if vertical.
             */
            function ClusteredBar(xScale, yScale, isVertical) {
                if (isVertical === void 0) { isVertical = true; }
                _super.call(this, xScale, yScale, isVertical);
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
                attrToProjector["x"] = function (d, i, u, m) { return _this._isVertical ? xAttr(d, i, u, m) + m.position : xAttr(d, u, u, m); };
                attrToProjector["y"] = function (d, i, u, m) { return _this._isVertical ? yAttr(d, i, u, m) : yAttr(d, i, u, m) + m.position; };
                return attrToProjector;
            };
            ClusteredBar.prototype._updateClusterPosition = function () {
                var _this = this;
                var innerScale = this._makeInnerScale();
                this._datasetKeysInOrder.forEach(function (key) {
                    var plotMetadata = _this._key2PlotDatasetKey.get(key).plotMetadata;
                    plotMetadata.position = innerScale.scale(key) - innerScale.rangeBand() / 2;
                });
            };
            ClusteredBar.prototype._makeInnerScale = function () {
                var innerScale = new Plottable.Scale.Category();
                innerScale.domain(this._datasetKeysInOrder);
                if (!this._projections["width"]) {
                    innerScale.range([0, this._getBarPixelWidth()]);
                }
                else {
                    var projection = this._projections["width"];
                    var accessor = projection.accessor;
                    var scale = projection.scale;
                    var fn = scale ? function (d, i, u, m) { return scale.scale(accessor(d, i, u, m)); } : accessor;
                    innerScale.range([0, fn(null, 0, null, null)]);
                }
                return innerScale;
            };
            ClusteredBar.prototype._getDataToDraw = function () {
                this._updateClusterPosition();
                return _super.prototype._getDataToDraw.call(this);
            };
            ClusteredBar.prototype._getPlotMetadataForDataset = function (key) {
                var metadata = _super.prototype._getPlotMetadataForDataset.call(this, key);
                metadata.position = 0;
                return metadata;
            };
            return ClusteredBar;
        })(Plot.Bar);
        Plot.ClusteredBar = ClusteredBar;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var AbstractStacked = (function (_super) {
            __extends(AbstractStacked, _super);
            function AbstractStacked() {
                _super.apply(this, arguments);
                this._stackedExtent = [0, 0];
            }
            AbstractStacked.prototype._getPlotMetadataForDataset = function (key) {
                var metadata = _super.prototype._getPlotMetadataForDataset.call(this, key);
                metadata.offsets = d3.map();
                return metadata;
            };
            AbstractStacked.prototype.project = function (attrToSet, accessor, scale) {
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                if (this._projections["x"] && this._projections["y"] && (attrToSet === "x" || attrToSet === "y")) {
                    this._updateStackOffsets();
                }
                return this;
            };
            AbstractStacked.prototype._onDatasetUpdate = function () {
                if (this._projectorsReady()) {
                    this._updateStackOffsets();
                }
                _super.prototype._onDatasetUpdate.call(this);
            };
            AbstractStacked.prototype._updateStackOffsets = function () {
                var dataMapArray = this._generateDefaultMapArray();
                var domainKeys = this._getDomainKeys();
                var positiveDataMapArray = dataMapArray.map(function (dataMap) {
                    return Plottable._Util.Methods.populateMap(domainKeys, function (domainKey) {
                        return { key: domainKey, value: Math.max(0, dataMap.get(domainKey).value) || 0 };
                    });
                });
                var negativeDataMapArray = dataMapArray.map(function (dataMap) {
                    return Plottable._Util.Methods.populateMap(domainKeys, function (domainKey) {
                        return { key: domainKey, value: Math.min(dataMap.get(domainKey).value, 0) || 0 };
                    });
                });
                this._setDatasetStackOffsets(this._stack(positiveDataMapArray), this._stack(negativeDataMapArray));
                this._updateStackExtents();
            };
            AbstractStacked.prototype._updateStackExtents = function () {
                var _this = this;
                var datasets = this.datasets();
                var valueAccessor = this._valueAccessor();
                var keyAccessor = this._keyAccessor();
                var maxStackExtent = Plottable._Util.Methods.max(this._datasetKeysInOrder, function (k) {
                    var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                    return Plottable._Util.Methods.max(dataset.data(), function (datum, i) {
                        return +valueAccessor(datum, i, dataset.metadata(), plotMetadata) + plotMetadata.offsets.get(keyAccessor(datum, i, dataset.metadata(), plotMetadata));
                    }, 0);
                }, 0);
                var minStackExtent = Plottable._Util.Methods.min(this._datasetKeysInOrder, function (k) {
                    var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                    return Plottable._Util.Methods.min(dataset.data(), function (datum, i) {
                        return +valueAccessor(datum, i, dataset.metadata(), plotMetadata) + plotMetadata.offsets.get(keyAccessor(datum, i, dataset.metadata(), plotMetadata));
                    }, 0);
                }, 0);
                this._stackedExtent = [Math.min(minStackExtent, 0), Math.max(0, maxStackExtent)];
            };
            /**
             * Feeds the data through d3's stack layout function which will calculate
             * the stack offsets and use the the function declared in .out to set the offsets on the data.
             */
            AbstractStacked.prototype._stack = function (dataArray) {
                var _this = this;
                var outFunction = function (d, y0, y) {
                    d.offset = y0;
                };
                d3.layout.stack().x(function (d) { return d.key; }).y(function (d) { return +d.value; }).values(function (d) { return _this._getDomainKeys().map(function (domainKey) { return d.get(domainKey); }); }).out(outFunction)(dataArray);
                return dataArray;
            };
            /**
             * After the stack offsets have been determined on each separate dataset, the offsets need
             * to be determined correctly on the overall datasets
             */
            AbstractStacked.prototype._setDatasetStackOffsets = function (positiveDataMapArray, negativeDataMapArray) {
                var _this = this;
                var keyAccessor = this._keyAccessor();
                var valueAccessor = this._valueAccessor();
                this._datasetKeysInOrder.forEach(function (k, index) {
                    var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                    var positiveDataMap = positiveDataMapArray[index];
                    var negativeDataMap = negativeDataMapArray[index];
                    var isAllNegativeValues = dataset.data().every(function (datum, i) { return valueAccessor(datum, i, dataset.metadata(), plotMetadata) <= 0; });
                    dataset.data().forEach(function (datum, datumIndex) {
                        var key = keyAccessor(datum, datumIndex, dataset.metadata(), plotMetadata);
                        var positiveOffset = positiveDataMap.get(key).offset;
                        var negativeOffset = negativeDataMap.get(key).offset;
                        var value = valueAccessor(datum, datumIndex, dataset.metadata(), plotMetadata);
                        var offset;
                        if (!+value) {
                            offset = isAllNegativeValues ? negativeOffset : positiveOffset;
                        }
                        else {
                            offset = value > 0 ? positiveOffset : negativeOffset;
                        }
                        plotMetadata.offsets.set(key, offset);
                    });
                });
            };
            AbstractStacked.prototype._getDomainKeys = function () {
                var _this = this;
                var keyAccessor = this._keyAccessor();
                var domainKeys = d3.set();
                this._datasetKeysInOrder.forEach(function (k) {
                    var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                    dataset.data().forEach(function (datum, index) {
                        domainKeys.add(keyAccessor(datum, index, dataset.metadata(), plotMetadata));
                    });
                });
                return domainKeys.values();
            };
            AbstractStacked.prototype._generateDefaultMapArray = function () {
                var _this = this;
                var keyAccessor = this._keyAccessor();
                var valueAccessor = this._valueAccessor();
                var domainKeys = this._getDomainKeys();
                var dataMapArray = this._datasetKeysInOrder.map(function () {
                    return Plottable._Util.Methods.populateMap(domainKeys, function (domainKey) {
                        return { key: domainKey, value: 0 };
                    });
                });
                this._datasetKeysInOrder.forEach(function (k, datasetIndex) {
                    var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                    dataset.data().forEach(function (datum, index) {
                        var key = keyAccessor(datum, index, dataset.metadata(), plotMetadata);
                        var value = valueAccessor(datum, index, dataset.metadata(), plotMetadata);
                        dataMapArray[datasetIndex].set(key, { key: key, value: value });
                    });
                });
                return dataMapArray;
            };
            AbstractStacked.prototype._updateScaleExtents = function () {
                _super.prototype._updateScaleExtents.call(this);
                var primaryScale = this._isVertical ? this._yScale : this._xScale;
                if (!primaryScale) {
                    return;
                }
                if (this._isAnchored && this._stackedExtent.length > 0) {
                    primaryScale._updateExtent(this.getID().toString(), "_PLOTTABLE_PROTECTED_FIELD_STACK_EXTENT", this._stackedExtent);
                }
                else {
                    primaryScale._removeExtent(this.getID().toString(), "_PLOTTABLE_PROTECTED_FIELD_STACK_EXTENT");
                }
            };
            AbstractStacked.prototype._normalizeDatasets = function (fromX) {
                var _this = this;
                var aAccessor = this._projections[fromX ? "x" : "y"].accessor;
                var bAccessor = this._projections[fromX ? "y" : "x"].accessor;
                var aStackedAccessor = function (d, i, u, m) {
                    var value = aAccessor(d, i, u, m);
                    if (_this._isVertical ? !fromX : fromX) {
                        value += m.offsets.get(bAccessor(d, i, u, m));
                    }
                    return value;
                };
                var bStackedAccessor = function (d, i, u, m) {
                    var value = bAccessor(d, i, u, m);
                    if (_this._isVertical ? fromX : !fromX) {
                        value += m.offsets.get(aAccessor(d, i, u, m));
                    }
                    return value;
                };
                return Plottable._Util.Methods.flatten(this._datasetKeysInOrder.map(function (key) {
                    var dataset = _this._key2PlotDatasetKey.get(key).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(key).plotMetadata;
                    return dataset.data().map(function (d, i) {
                        return {
                            a: aStackedAccessor(d, i, dataset.metadata(), plotMetadata),
                            b: bStackedAccessor(d, i, dataset.metadata(), plotMetadata)
                        };
                    });
                }));
            };
            AbstractStacked.prototype._keyAccessor = function () {
                return this._isVertical ? this._projections["x"].accessor : this._projections["y"].accessor;
            };
            AbstractStacked.prototype._valueAccessor = function () {
                return this._isVertical ? this._projections["y"].accessor : this._projections["x"].accessor;
            };
            return AbstractStacked;
        })(Plot.AbstractXYPlot);
        Plot.AbstractStacked = AbstractStacked;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var StackedArea = (function (_super) {
            __extends(StackedArea, _super);
            /**
             * Constructs a StackedArea plot.
             *
             * @constructor
             * @param {QuantitativeScale} xScale The x scale to use.
             * @param {QuantitativeScale} yScale The y scale to use.
             */
            function StackedArea(xScale, yScale) {
                _super.call(this, xScale, yScale);
                this._baselineValue = 0;
                this.classed("area-plot", true);
                this._isVertical = true;
            }
            StackedArea.prototype._getDrawer = function (key) {
                return new Plottable._Drawer.Area(key).drawLine(false);
            };
            StackedArea.prototype._getAnimator = function (key) {
                return new Plottable.Animator.Null();
            };
            StackedArea.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._baseline = this._renderArea.append("line").classed("baseline", true);
            };
            StackedArea.prototype._additionalPaint = function () {
                var scaledBaseline = this._yScale.scale(this._baselineValue);
                var baselineAttr = {
                    "x1": 0,
                    "y1": scaledBaseline,
                    "x2": this.width(),
                    "y2": scaledBaseline
                };
                this._getAnimator("baseline").animate(this._baseline, baselineAttr);
            };
            StackedArea.prototype._updateYDomainer = function () {
                _super.prototype._updateYDomainer.call(this);
                var scale = this._yScale;
                if (!scale._userSetDomainer) {
                    scale.domainer().addPaddingException(0, "STACKED_AREA_PLOT+" + this.getID()).addIncludedValue(0, "STACKED_AREA_PLOT+" + this.getID());
                    // prepending "AREA_PLOT" is unnecessary but reduces likely of user accidentally creating collisions
                    scale._autoDomainIfAutomaticMode();
                }
            };
            StackedArea.prototype.project = function (attrToSet, accessor, scale) {
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                Plot.AbstractStacked.prototype.project.apply(this, [attrToSet, accessor, scale]);
                return this;
            };
            StackedArea.prototype._onDatasetUpdate = function () {
                _super.prototype._onDatasetUpdate.call(this);
                Plot.AbstractStacked.prototype._onDatasetUpdate.apply(this);
                return this;
            };
            StackedArea.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                if (this._projections["fill-opacity"] == null) {
                    attrToProjector["fill-opacity"] = d3.functor(1);
                }
                var yAccessor = this._projections["y"].accessor;
                var xAccessor = this._projections["x"].accessor;
                attrToProjector["y"] = function (d, i, u, m) { return _this._yScale.scale(+yAccessor(d, i, u, m) + m.offsets.get(xAccessor(d, i, u, m))); };
                attrToProjector["y0"] = function (d, i, u, m) { return _this._yScale.scale(m.offsets.get(xAccessor(d, i, u, m))); };
                return attrToProjector;
            };
            StackedArea.prototype._wholeDatumAttributes = function () {
                return ["x", "y", "defined"];
            };
            //===== Stack logic from AbstractStackedPlot =====
            StackedArea.prototype._updateStackOffsets = function () {
                var _this = this;
                if (!this._projectorsReady()) {
                    return;
                }
                var domainKeys = this._getDomainKeys();
                var keyAccessor = this._isVertical ? this._projections["x"].accessor : this._projections["y"].accessor;
                var keySets = this._datasetKeysInOrder.map(function (k) {
                    var dataset = _this._key2PlotDatasetKey.get(k).dataset;
                    var plotMetadata = _this._key2PlotDatasetKey.get(k).plotMetadata;
                    return d3.set(dataset.data().map(function (datum, i) { return keyAccessor(datum, i, dataset.metadata(), plotMetadata).toString(); })).values();
                });
                if (keySets.some(function (keySet) { return keySet.length !== domainKeys.length; })) {
                    Plottable._Util.Methods.warn("the domains across the datasets are not the same.  Plot may produce unintended behavior.");
                }
                Plot.AbstractStacked.prototype._updateStackOffsets.call(this);
            };
            StackedArea.prototype._updateStackExtents = function () {
                Plot.AbstractStacked.prototype._updateStackExtents.call(this);
            };
            StackedArea.prototype._stack = function (dataArray) {
                return Plot.AbstractStacked.prototype._stack.call(this, dataArray);
            };
            StackedArea.prototype._setDatasetStackOffsets = function (positiveDataMapArray, negativeDataMapArray) {
                Plot.AbstractStacked.prototype._setDatasetStackOffsets.call(this, positiveDataMapArray, negativeDataMapArray);
            };
            StackedArea.prototype._getDomainKeys = function () {
                return Plot.AbstractStacked.prototype._getDomainKeys.call(this);
            };
            StackedArea.prototype._generateDefaultMapArray = function () {
                return Plot.AbstractStacked.prototype._generateDefaultMapArray.call(this);
            };
            StackedArea.prototype._updateScaleExtents = function () {
                Plot.AbstractStacked.prototype._updateScaleExtents.call(this);
            };
            StackedArea.prototype._keyAccessor = function () {
                return Plot.AbstractStacked.prototype._keyAccessor.call(this);
            };
            StackedArea.prototype._valueAccessor = function () {
                return Plot.AbstractStacked.prototype._valueAccessor.call(this);
            };
            StackedArea.prototype._getPlotMetadataForDataset = function (key) {
                return Plot.AbstractStacked.prototype._getPlotMetadataForDataset.call(this, key);
            };
            StackedArea.prototype._normalizeDatasets = function (fromX) {
                return Plot.AbstractStacked.prototype._normalizeDatasets.call(this, fromX);
            };
            return StackedArea;
        })(Plot.Area);
        Plot.StackedArea = StackedArea;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Plot;
    (function (Plot) {
        var StackedBar = (function (_super) {
            __extends(StackedBar, _super);
            /**
             * Constructs a StackedBar plot.
             * A StackedBarPlot is a plot that plots several bar plots stacking on top of each
             * other.
             * @constructor
             * @param {Scale} xScale the x scale of the plot.
             * @param {Scale} yScale the y scale of the plot.
             * @param {boolean} isVertical if the plot if vertical.
             */
            function StackedBar(xScale, yScale, isVertical) {
                if (isVertical === void 0) { isVertical = true; }
                _super.call(this, xScale, yScale, isVertical);
            }
            StackedBar.prototype._getAnimator = function (key) {
                if (this._animate && this._animateOnNextRender) {
                    if (this.animator(key)) {
                        return this.animator(key);
                    }
                    else if (key === "stacked-bar") {
                        var primaryScale = this._isVertical ? this._yScale : this._xScale;
                        var scaledBaseline = primaryScale.scale(this.baseline());
                        return new Plottable.Animator.MovingRect(scaledBaseline, this._isVertical);
                    }
                }
                return new Plottable.Animator.Null();
            };
            StackedBar.prototype._generateAttrToProjector = function () {
                var _this = this;
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var valueAttr = this._isVertical ? "y" : "x";
                var keyAttr = this._isVertical ? "x" : "y";
                var primaryScale = this._isVertical ? this._yScale : this._xScale;
                var primaryAccessor = this._projections[valueAttr].accessor;
                var keyAccessor = this._projections[keyAttr].accessor;
                var getStart = function (d, i, u, m) { return primaryScale.scale(m.offsets.get(keyAccessor(d, i, u, m))); };
                var getEnd = function (d, i, u, m) { return primaryScale.scale(+primaryAccessor(d, i, u, m) + m.offsets.get(keyAccessor(d, i, u, m))); };
                var heightF = function (d, i, u, m) { return Math.abs(getEnd(d, i, u, m) - getStart(d, i, u, m)); };
                var attrFunction = function (d, i, u, m) { return +primaryAccessor(d, i, u, m) < 0 ? getStart(d, i, u, m) : getEnd(d, i, u, m); };
                attrToProjector[valueAttr] = function (d, i, u, m) { return _this._isVertical ? attrFunction(d, i, u, m) : attrFunction(d, i, u, m) - heightF(d, i, u, m); };
                return attrToProjector;
            };
            StackedBar.prototype._generateDrawSteps = function () {
                return [{ attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("stacked-bar") }];
            };
            StackedBar.prototype.project = function (attrToSet, accessor, scale) {
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                Plot.AbstractStacked.prototype.project.apply(this, [attrToSet, accessor, scale]);
                return this;
            };
            StackedBar.prototype._onDatasetUpdate = function () {
                _super.prototype._onDatasetUpdate.call(this);
                Plot.AbstractStacked.prototype._onDatasetUpdate.apply(this);
                return this;
            };
            StackedBar.prototype._getPlotMetadataForDataset = function (key) {
                return Plot.AbstractStacked.prototype._getPlotMetadataForDataset.call(this, key);
            };
            StackedBar.prototype._normalizeDatasets = function (fromX) {
                return Plot.AbstractStacked.prototype._normalizeDatasets.call(this, fromX);
            };
            //===== Stack logic from AbstractStackedPlot =====
            StackedBar.prototype._updateStackOffsets = function () {
                Plot.AbstractStacked.prototype._updateStackOffsets.call(this);
            };
            StackedBar.prototype._updateStackExtents = function () {
                Plot.AbstractStacked.prototype._updateStackExtents.call(this);
            };
            StackedBar.prototype._stack = function (dataArray) {
                return Plot.AbstractStacked.prototype._stack.call(this, dataArray);
            };
            StackedBar.prototype._setDatasetStackOffsets = function (positiveDataMapArray, negativeDataMapArray) {
                Plot.AbstractStacked.prototype._setDatasetStackOffsets.call(this, positiveDataMapArray, negativeDataMapArray);
            };
            StackedBar.prototype._getDomainKeys = function () {
                return Plot.AbstractStacked.prototype._getDomainKeys.call(this);
            };
            StackedBar.prototype._generateDefaultMapArray = function () {
                return Plot.AbstractStacked.prototype._generateDefaultMapArray.call(this);
            };
            StackedBar.prototype._updateScaleExtents = function () {
                Plot.AbstractStacked.prototype._updateScaleExtents.call(this);
            };
            StackedBar.prototype._keyAccessor = function () {
                return Plot.AbstractStacked.prototype._keyAccessor.call(this);
            };
            StackedBar.prototype._valueAccessor = function () {
                return Plot.AbstractStacked.prototype._valueAccessor.call(this);
            };
            return StackedBar;
        })(Plot.Bar);
        Plot.StackedBar = StackedBar;
    })(Plot = Plottable.Plot || (Plottable.Plot = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Animator;
    (function (Animator) {
    })(Animator = Plottable.Animator || (Plottable.Animator = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Animator;
    (function (Animator) {
        /**
         * An animator implementation with no animation. The attributes are
         * immediately set on the selection.
         */
        var Null = (function () {
            function Null() {
            }
            Null.prototype.getTiming = function (selection) {
                return 0;
            };
            Null.prototype.animate = function (selection, attrToProjector) {
                return selection.attr(attrToProjector);
            };
            return Null;
        })();
        Animator.Null = Null;
    })(Animator = Plottable.Animator || (Plottable.Animator = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Animator;
    (function (Animator) {
        /**
         * The base animator implementation with easing, duration, and delay.
         *
         * The maximum delay between animations can be configured with maxIterativeDelay.
         *
         * The maximum total animation duration can be configured with maxTotalDuration.
         * maxTotalDuration does not set actual total animation duration.
         *
         * The actual interval delay is calculated by following formula:
         * min(maxIterativeDelay(),
         *   max(maxTotalDuration() - duration(), 0) / <number of iterations>)
         */
        var Base = (function () {
            /**
             * Constructs the default animator
             *
             * @constructor
             */
            function Base() {
                this._duration = Base.DEFAULT_DURATION_MILLISECONDS;
                this._delay = Base.DEFAULT_DELAY_MILLISECONDS;
                this._easing = Base.DEFAULT_EASING;
                this._maxIterativeDelay = Base.DEFAULT_MAX_ITERATIVE_DELAY_MILLISECONDS;
                this._maxTotalDuration = Base.DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS;
            }
            Base.prototype.getTiming = function (numberOfIterations) {
                var maxDelayForLastIteration = Math.max(this.maxTotalDuration() - this.duration(), 0);
                var adjustedIterativeDelay = Math.min(this.maxIterativeDelay(), maxDelayForLastIteration / Math.max(numberOfIterations - 1, 1));
                var time = adjustedIterativeDelay * numberOfIterations + this.delay() + this.duration();
                return time;
            };
            Base.prototype.animate = function (selection, attrToProjector) {
                var _this = this;
                var numberOfIterations = selection[0].length;
                var maxDelayForLastIteration = Math.max(this.maxTotalDuration() - this.duration(), 0);
                var adjustedIterativeDelay = Math.min(this.maxIterativeDelay(), maxDelayForLastIteration / Math.max(numberOfIterations - 1, 1));
                return selection.transition().ease(this.easing()).duration(this.duration()).delay(function (d, i) { return _this.delay() + adjustedIterativeDelay * i; }).attr(attrToProjector);
            };
            Base.prototype.duration = function (duration) {
                if (duration == null) {
                    return this._duration;
                }
                else {
                    this._duration = duration;
                    return this;
                }
            };
            Base.prototype.delay = function (delay) {
                if (delay == null) {
                    return this._delay;
                }
                else {
                    this._delay = delay;
                    return this;
                }
            };
            Base.prototype.easing = function (easing) {
                if (easing == null) {
                    return this._easing;
                }
                else {
                    this._easing = easing;
                    return this;
                }
            };
            Base.prototype.maxIterativeDelay = function (maxIterDelay) {
                if (maxIterDelay == null) {
                    return this._maxIterativeDelay;
                }
                else {
                    this._maxIterativeDelay = maxIterDelay;
                    return this;
                }
            };
            Base.prototype.maxTotalDuration = function (maxDuration) {
                if (maxDuration == null) {
                    return this._maxTotalDuration;
                }
                else {
                    this._maxTotalDuration = maxDuration;
                    return this;
                }
            };
            /**
             * The default duration of the animation in milliseconds
             */
            Base.DEFAULT_DURATION_MILLISECONDS = 300;
            /**
             * The default starting delay of the animation in milliseconds
             */
            Base.DEFAULT_DELAY_MILLISECONDS = 0;
            /**
             * The default maximum start delay between each start of an animation
             */
            Base.DEFAULT_MAX_ITERATIVE_DELAY_MILLISECONDS = 15;
            /**
             * The default maximum total animation duration
             */
            Base.DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS = 600;
            /**
             * The default easing of the animation
             */
            Base.DEFAULT_EASING = "exp-out";
            return Base;
        })();
        Animator.Base = Base;
    })(Animator = Plottable.Animator || (Plottable.Animator = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Animator;
    (function (Animator) {
        /**
         * The default animator implementation with easing, duration, and delay.
         */
        var Rect = (function (_super) {
            __extends(Rect, _super);
            function Rect(isVertical, isReverse) {
                if (isVertical === void 0) { isVertical = true; }
                if (isReverse === void 0) { isReverse = false; }
                _super.call(this);
                this.isVertical = isVertical;
                this.isReverse = isReverse;
            }
            Rect.prototype.animate = function (selection, attrToProjector) {
                var startAttrToProjector = {};
                Rect.ANIMATED_ATTRIBUTES.forEach(function (attr) { return startAttrToProjector[attr] = attrToProjector[attr]; });
                startAttrToProjector[this._getMovingAttr()] = this._startMovingProjector(attrToProjector);
                startAttrToProjector[this._getGrowingAttr()] = function () { return 0; };
                selection.attr(startAttrToProjector);
                return _super.prototype.animate.call(this, selection, attrToProjector);
            };
            Rect.prototype._startMovingProjector = function (attrToProjector) {
                if (this.isVertical === this.isReverse) {
                    return attrToProjector[this._getMovingAttr()];
                }
                var movingAttrProjector = attrToProjector[this._getMovingAttr()];
                var growingAttrProjector = attrToProjector[this._getGrowingAttr()];
                return function (d, i, u, m) { return movingAttrProjector(d, i, u, m) + growingAttrProjector(d, i, u, m); };
            };
            Rect.prototype._getGrowingAttr = function () {
                return this.isVertical ? "height" : "width";
            };
            Rect.prototype._getMovingAttr = function () {
                return this.isVertical ? "y" : "x";
            };
            Rect.ANIMATED_ATTRIBUTES = ["height", "width", "x", "y", "fill"];
            return Rect;
        })(Animator.Base);
        Animator.Rect = Rect;
    })(Animator = Plottable.Animator || (Plottable.Animator = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Animator;
    (function (Animator) {
        /**
         * A child class of RectAnimator that will move the rectangle
         * as well as animate its growth.
         */
        var MovingRect = (function (_super) {
            __extends(MovingRect, _super);
            /**
             * Constructs a MovingRectAnimator
             *
             * @param {number} basePixel The pixel value to start moving from
             * @param {boolean} isVertical If the movement/animation is vertical
             */
            function MovingRect(startPixelValue, isVertical) {
                if (isVertical === void 0) { isVertical = true; }
                _super.call(this, isVertical);
                this.startPixelValue = startPixelValue;
            }
            MovingRect.prototype._startMovingProjector = function (attrToProjector) {
                return d3.functor(this.startPixelValue);
            };
            return MovingRect;
        })(Animator.Rect);
        Animator.MovingRect = MovingRect;
    })(Animator = Plottable.Animator || (Plottable.Animator = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Dispatcher;
    (function (Dispatcher) {
        var AbstractDispatcher = (function (_super) {
            __extends(AbstractDispatcher, _super);
            function AbstractDispatcher() {
                _super.apply(this, arguments);
                this._event2Callback = {};
                this._broadcasters = [];
                this._connected = false;
            }
            AbstractDispatcher.prototype._hasNoListeners = function () {
                return this._broadcasters.every(function (b) { return b.getListenerKeys().length === 0; });
            };
            AbstractDispatcher.prototype._connect = function () {
                var _this = this;
                if (!this._connected) {
                    Object.keys(this._event2Callback).forEach(function (event) {
                        var callback = _this._event2Callback[event];
                        document.addEventListener(event, callback);
                    });
                    this._connected = true;
                }
            };
            AbstractDispatcher.prototype._disconnect = function () {
                var _this = this;
                if (this._connected && this._hasNoListeners()) {
                    Object.keys(this._event2Callback).forEach(function (event) {
                        var callback = _this._event2Callback[event];
                        document.removeEventListener(event, callback);
                    });
                    this._connected = false;
                }
            };
            /**
             * Creates a wrapped version of the callback that can be registered to a Broadcaster
             */
            AbstractDispatcher.prototype._getWrappedCallback = function (callback) {
                return function () { return callback(); };
            };
            AbstractDispatcher.prototype._setCallback = function (b, key, callback) {
                if (callback === null) {
                    b.deregisterListener(key);
                    this._disconnect();
                }
                else {
                    this._connect();
                    b.registerListener(key, this._getWrappedCallback(callback));
                }
            };
            return AbstractDispatcher;
        })(Plottable.Core.PlottableObject);
        Dispatcher.AbstractDispatcher = AbstractDispatcher;
    })(Dispatcher = Plottable.Dispatcher || (Plottable.Dispatcher = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Dispatcher;
    (function (Dispatcher) {
        var Mouse = (function (_super) {
            __extends(Mouse, _super);
            /**
             * Creates a Dispatcher.Mouse.
             * This constructor not be invoked directly under most circumstances.
             *
             * @param {SVGElement} svg The root <svg> element to attach to.
             */
            function Mouse(svg) {
                var _this = this;
                _super.call(this);
                this.translator = Plottable._Util.ClientToSVGTranslator.getTranslator(svg);
                this._lastMousePosition = { x: -1, y: -1 };
                this._moveBroadcaster = new Plottable.Core.Broadcaster(this);
                var processMoveCallback = function (e) { return _this._measureAndBroadcast(e, _this._moveBroadcaster); };
                this._event2Callback["mouseover"] = processMoveCallback;
                this._event2Callback["mousemove"] = processMoveCallback;
                this._event2Callback["mouseout"] = processMoveCallback;
                this._downBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["mousedown"] = function (e) { return _this._measureAndBroadcast(e, _this._downBroadcaster); };
                this._upBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["mouseup"] = function (e) { return _this._measureAndBroadcast(e, _this._upBroadcaster); };
                this._wheelBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["wheel"] = function (e) { return _this._measureAndBroadcast(e, _this._wheelBroadcaster); };
                this._dblClickBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["dblclick"] = function (e) { return _this._measureAndBroadcast(e, _this._dblClickBroadcaster); };
                this._broadcasters = [this._moveBroadcaster, this._downBroadcaster, this._upBroadcaster, this._wheelBroadcaster, this._dblClickBroadcaster];
            }
            /**
             * Get a Dispatcher.Mouse for the <svg> containing elem. If one already exists
             * on that <svg>, it will be returned; otherwise, a new one will be created.
             *
             * @param {SVGElement} elem A svg DOM element.
             * @return {Dispatcher.Mouse} A Dispatcher.Mouse
             */
            Mouse.getDispatcher = function (elem) {
                var svg = Plottable._Util.DOM.getBoundingSVG(elem);
                var dispatcher = svg[Mouse._DISPATCHER_KEY];
                if (dispatcher == null) {
                    dispatcher = new Mouse(svg);
                    svg[Mouse._DISPATCHER_KEY] = dispatcher;
                }
                return dispatcher;
            };
            Mouse.prototype._getWrappedCallback = function (callback) {
                return function (md, p, e) { return callback(p, e); };
            };
            /**
             * Registers a callback to be called whenever the mouse position changes,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            Mouse.prototype.onMouseMove = function (key, callback) {
                this._setCallback(this._moveBroadcaster, key, callback);
                return this;
            };
            /**
             * Registers a callback to be called whenever a mousedown occurs,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            Mouse.prototype.onMouseDown = function (key, callback) {
                this._setCallback(this._downBroadcaster, key, callback);
                return this;
            };
            /**
             * Registers a callback to be called whenever a mouseup occurs,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            Mouse.prototype.onMouseUp = function (key, callback) {
                this._setCallback(this._upBroadcaster, key, callback);
                return this;
            };
            /**
             * Registers a callback to be called whenever a wheel occurs,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {MouseCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space.
             *                                     Pass `null` to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            Mouse.prototype.onWheel = function (key, callback) {
                this._setCallback(this._wheelBroadcaster, key, callback);
                return this;
            };
            /**
             * Registers a callback to be called whenever a dblClick occurs,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {MouseCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space.
             *                                     Pass `null` to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            Mouse.prototype.onDblClick = function (key, callback) {
                this._setCallback(this._dblClickBroadcaster, key, callback);
                return this;
            };
            /**
             * Computes the mouse position from the given event, and if successful
             * calls broadcast() on the supplied Broadcaster.
             */
            Mouse.prototype._measureAndBroadcast = function (e, b) {
                var newMousePosition = this.translator.computePosition(e.clientX, e.clientY);
                if (newMousePosition != null) {
                    this._lastMousePosition = newMousePosition;
                    b.broadcast(this.getLastMousePosition(), e);
                }
            };
            /**
             * Returns the last computed mouse position.
             *
             * @return {Point} The last known mouse position in <svg> coordinate space.
             */
            Mouse.prototype.getLastMousePosition = function () {
                return this._lastMousePosition;
            };
            Mouse._DISPATCHER_KEY = "__Plottable_Dispatcher_Mouse";
            return Mouse;
        })(Dispatcher.AbstractDispatcher);
        Dispatcher.Mouse = Mouse;
    })(Dispatcher = Plottable.Dispatcher || (Plottable.Dispatcher = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Dispatcher;
    (function (Dispatcher) {
        var Touch = (function (_super) {
            __extends(Touch, _super);
            /**
             * Creates a Dispatcher.Touch.
             * This constructor should not be invoked directly under most circumstances.
             *
             * @param {SVGElement} svg The root <svg> element to attach to.
             */
            function Touch(svg) {
                var _this = this;
                _super.call(this);
                this.translator = Plottable._Util.ClientToSVGTranslator.getTranslator(svg);
                this._startBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["touchstart"] = function (e) { return _this._measureAndBroadcast(e, _this._startBroadcaster); };
                this._moveBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["touchmove"] = function (e) { return _this._measureAndBroadcast(e, _this._moveBroadcaster); };
                this._endBroadcaster = new Plottable.Core.Broadcaster(this);
                this._event2Callback["touchend"] = function (e) { return _this._measureAndBroadcast(e, _this._endBroadcaster); };
                this._broadcasters = [this._moveBroadcaster, this._startBroadcaster, this._endBroadcaster];
            }
            /**
             * Get a Dispatcher.Touch for the <svg> containing elem. If one already exists
             * on that <svg>, it will be returned; otherwise, a new one will be created.
             *
             * @param {SVGElement} elem A svg DOM element.
             * @return {Dispatcher.Touch} A Dispatcher.Touch
             */
            Touch.getDispatcher = function (elem) {
                var svg = Plottable._Util.DOM.getBoundingSVG(elem);
                var dispatcher = svg[Touch._DISPATCHER_KEY];
                if (dispatcher == null) {
                    dispatcher = new Touch(svg);
                    svg[Touch._DISPATCHER_KEY] = dispatcher;
                }
                return dispatcher;
            };
            Touch.prototype._getWrappedCallback = function (callback) {
                return function (td, ids, idToPoint, e) { return callback(ids, idToPoint, e); };
            };
            /**
             * Registers a callback to be called whenever a touch starts,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            Touch.prototype.onTouchStart = function (key, callback) {
                this._setCallback(this._startBroadcaster, key, callback);
                return this;
            };
            /**
             * Registers a callback to be called whenever the touch position changes,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            Touch.prototype.onTouchMove = function (key, callback) {
                this._setCallback(this._moveBroadcaster, key, callback);
                return this;
            };
            /**
             * Registers a callback to be called whenever a touch ends,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The key associated with the callback.
             *                  Key uniqueness is determined by deep equality.
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            Touch.prototype.onTouchEnd = function (key, callback) {
                this._setCallback(this._endBroadcaster, key, callback);
                return this;
            };
            /**
             * Computes the Touch position from the given event, and if successful
             * calls broadcast() on the supplied Broadcaster.
             */
            Touch.prototype._measureAndBroadcast = function (e, b) {
                var touches = e.changedTouches;
                var touchPositions = {};
                var touchIdentifiers = [];
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches[i];
                    var touchID = touch.identifier;
                    var newTouchPosition = this.translator.computePosition(touch.clientX, touch.clientY);
                    if (newTouchPosition != null) {
                        touchPositions[touchID] = newTouchPosition;
                        touchIdentifiers.push(touchID);
                    }
                }
                ;
                if (touchIdentifiers.length > 0) {
                    b.broadcast(touchIdentifiers, touchPositions, e);
                }
            };
            /**
             * Dispatcher.Touch calls callbacks when touch events occur.
             * It reports the (x, y) position of the first Touch relative to the
             * <svg> it is attached to.
             */
            Touch._DISPATCHER_KEY = "__Plottable_Dispatcher_Touch";
            return Touch;
        })(Dispatcher.AbstractDispatcher);
        Dispatcher.Touch = Touch;
    })(Dispatcher = Plottable.Dispatcher || (Plottable.Dispatcher = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Dispatcher;
    (function (Dispatcher) {
        var Key = (function (_super) {
            __extends(Key, _super);
            /**
             * Creates a Dispatcher.Key.
             * This constructor not be invoked directly under most circumstances.
             *
             * @param {SVGElement} svg The root <svg> element to attach to.
             */
            function Key() {
                var _this = this;
                _super.call(this);
                this._event2Callback["keydown"] = function (e) { return _this._processKeydown(e); };
                this._keydownBroadcaster = new Plottable.Core.Broadcaster(this);
                this._broadcasters = [this._keydownBroadcaster];
            }
            /**
             * Get a Dispatcher.Key. If one already exists it will be returned;
             * otherwise, a new one will be created.
             *
             * @return {Dispatcher.Key} A Dispatcher.Key
             */
            Key.getDispatcher = function () {
                var dispatcher = document[Key._DISPATCHER_KEY];
                if (dispatcher == null) {
                    dispatcher = new Key();
                    document[Key._DISPATCHER_KEY] = dispatcher;
                }
                return dispatcher;
            };
            Key.prototype._getWrappedCallback = function (callback) {
                return function (d, e) { return callback(e.keyCode, e); };
            };
            /**
             * Registers a callback to be called whenever a key is pressed,
             * or removes the callback if `null` is passed as the callback.
             *
             * @param {any} key The registration key associated with the callback.
             *                  Registration key uniqueness is determined by deep equality.
             * @param {KeyCallback} callback
             * @return {Dispatcher.Key} The calling Dispatcher.Key.
             */
            Key.prototype.onKeyDown = function (key, callback) {
                this._setCallback(this._keydownBroadcaster, key, callback);
                return this;
            };
            Key.prototype._processKeydown = function (e) {
                this._keydownBroadcaster.broadcast(e);
            };
            Key._DISPATCHER_KEY = "__Plottable_Dispatcher_Key";
            return Key;
        })(Dispatcher.AbstractDispatcher);
        Dispatcher.Key = Key;
    })(Dispatcher = Plottable.Dispatcher || (Plottable.Dispatcher = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var AbstractInteraction = (function (_super) {
            __extends(AbstractInteraction, _super);
            function AbstractInteraction() {
                _super.apply(this, arguments);
            }
            AbstractInteraction.prototype._anchor = function (component, hitBox) {
                this._componentToListenTo = component;
                this._hitBox = hitBox;
            };
            // HACKHACK: After all Interactions use Dispatchers, we won't need hitboxes at all (#1757)
            AbstractInteraction.prototype._requiresHitbox = function () {
                return false;
            };
            /**
             * Translates an <svg>-coordinate-space point to Component-space coordinates.
             *
             * @param {Point} p A Point in <svg>-space coordinates.
             *
             * @return {Point} The same location in Component-space coordinates.
             */
            AbstractInteraction.prototype._translateToComponentSpace = function (p) {
                var origin = this._componentToListenTo.originToSVG();
                return {
                    x: p.x - origin.x,
                    y: p.y - origin.y
                };
            };
            /**
             * Checks whether a Component-coordinate-space Point is inside the Component.
             *
             * @param {Point} p A Point in Coordinate-space coordinates.
             *
             * @return {boolean} Whether or not the point is inside the Component.
             */
            AbstractInteraction.prototype._isInsideComponent = function (p) {
                return 0 <= p.x && 0 <= p.y && p.x <= this._componentToListenTo.width() && p.y <= this._componentToListenTo.height();
            };
            return AbstractInteraction;
        })(Plottable.Core.PlottableObject);
        Interaction.AbstractInteraction = AbstractInteraction;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var Click = (function (_super) {
            __extends(Click, _super);
            function Click() {
                _super.apply(this, arguments);
                this._clickedDown = false;
            }
            Click.prototype._anchor = function (component, hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, component, hitBox);
                this._mouseDispatcher = Plottable.Dispatcher.Mouse.getDispatcher(component.content().node());
                this._mouseDispatcher.onMouseDown("Interaction.Click" + this.getID(), function (p) { return _this._handleClickDown(p); });
                this._mouseDispatcher.onMouseUp("Interaction.Click" + this.getID(), function (p) { return _this._handleClickUp(p); });
                this._touchDispatcher = Plottable.Dispatcher.Touch.getDispatcher(component.content().node());
                this._touchDispatcher.onTouchStart("Interaction.Click" + this.getID(), function (ids, idToPoint) { return _this._handleClickDown(idToPoint[ids[0]]); });
                this._touchDispatcher.onTouchEnd("Interaction.Click" + this.getID(), function (ids, idToPoint) { return _this._handleClickUp(idToPoint[ids[0]]); });
            };
            Click.prototype._handleClickDown = function (p) {
                var translatedPoint = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedPoint)) {
                    this._clickedDown = true;
                }
            };
            Click.prototype._handleClickUp = function (p) {
                var translatedPoint = this._translateToComponentSpace(p);
                if (this._clickedDown && this._isInsideComponent(translatedPoint) && (this._clickCallback != null)) {
                    this._clickCallback(translatedPoint);
                }
                this._clickedDown = false;
            };
            Click.prototype.onClick = function (callback) {
                if (callback === undefined) {
                    return this._clickCallback;
                }
                this._clickCallback = callback;
                return this;
            };
            return Click;
        })(Interaction.AbstractInteraction);
        Interaction.Click = Click;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
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
                _super.apply(this, arguments);
                this._clickState = 0 /* NotClicked */;
                this._clickedDown = false;
            }
            DoubleClick.prototype._anchor = function (component, hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, component, hitBox);
                this._mouseDispatcher = Plottable.Dispatcher.Mouse.getDispatcher(component.content().node());
                this._mouseDispatcher.onMouseDown("Interaction.DoubleClick" + this.getID(), function (p) { return _this._handleClickDown(p); });
                this._mouseDispatcher.onMouseUp("Interaction.DoubleClick" + this.getID(), function (p) { return _this._handleClickUp(p); });
                this._mouseDispatcher.onDblClick("Interaction.DoubleClick" + this.getID(), function (p) { return _this._handleDblClick(); });
                this._touchDispatcher = Plottable.Dispatcher.Touch.getDispatcher(component.content().node());
                this._touchDispatcher.onTouchStart("Interaction.DoubleClick" + this.getID(), function (ids, idToPoint) { return _this._handleClickDown(idToPoint[ids[0]]); });
                this._touchDispatcher.onTouchEnd("Interaction.DoubleClick" + this.getID(), function (ids, idToPoint) { return _this._handleClickUp(idToPoint[ids[0]]); });
            };
            DoubleClick.prototype._handleClickDown = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedP)) {
                    if (!(this._clickState === 1 /* SingleClicked */) || !DoubleClick.pointsEqual(translatedP, this._clickedPoint)) {
                        this._clickState = 0 /* NotClicked */;
                    }
                    this._clickedPoint = translatedP;
                    this._clickedDown = true;
                }
            };
            DoubleClick.prototype._handleClickUp = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (this._clickedDown && DoubleClick.pointsEqual(translatedP, this._clickedPoint)) {
                    this._clickState = this._clickState === 0 /* NotClicked */ ? 1 /* SingleClicked */ : 2 /* DoubleClicked */;
                }
                else {
                    this._clickState = 0 /* NotClicked */;
                }
                this._clickedDown = false;
            };
            DoubleClick.prototype._handleDblClick = function () {
                if (this._clickState === 2 /* DoubleClicked */) {
                    if (this._doubleClickCallback) {
                        this._doubleClickCallback(this._clickedPoint);
                    }
                    this._clickState = 0 /* NotClicked */;
                }
            };
            DoubleClick.pointsEqual = function (p1, p2) {
                return p1.x === p2.x && p1.y === p2.y;
            };
            DoubleClick.prototype.onDoubleClick = function (callback) {
                if (callback === undefined) {
                    return this._doubleClickCallback;
                }
                this._doubleClickCallback = callback;
                return this;
            };
            return DoubleClick;
        })(Interaction.AbstractInteraction);
        Interaction.DoubleClick = DoubleClick;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var Key = (function (_super) {
            __extends(Key, _super);
            function Key() {
                _super.apply(this, arguments);
                this._keyCode2Callback = {};
            }
            Key.prototype._anchor = function (component, hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, component, hitBox);
                this._positionDispatcher = Plottable.Dispatcher.Mouse.getDispatcher(this._componentToListenTo._element.node());
                this._positionDispatcher.onMouseMove("Interaction.Key" + this.getID(), function (p) { return null; }); // HACKHACK: registering a listener
                this._keyDispatcher = Plottable.Dispatcher.Key.getDispatcher();
                this._keyDispatcher.onKeyDown("Interaction.Key" + this.getID(), function (keyCode) { return _this._handleKeyEvent(keyCode); });
            };
            Key.prototype._handleKeyEvent = function (keyCode) {
                var p = this._translateToComponentSpace(this._positionDispatcher.getLastMousePosition());
                if (this._isInsideComponent(p) && this._keyCode2Callback[keyCode]) {
                    this._keyCode2Callback[keyCode]();
                }
            };
            /**
             * Sets a callback to be called when the key with the given keyCode is
             * pressed and the user is moused over the Component.
             *
             * @param {number} keyCode The key code associated with the key.
             * @param {() => void} callback Callback to be called.
             * @returns The calling Interaction.Key.
             */
            Key.prototype.on = function (keyCode, callback) {
                this._keyCode2Callback[keyCode] = callback;
                return this;
            };
            return Key;
        })(Interaction.AbstractInteraction);
        Interaction.Key = Key;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var Pointer = (function (_super) {
            __extends(Pointer, _super);
            function Pointer() {
                _super.apply(this, arguments);
                this._overComponent = false;
            }
            Pointer.prototype._anchor = function (component, hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, component, hitBox);
                this._mouseDispatcher = Plottable.Dispatcher.Mouse.getDispatcher(this._componentToListenTo.content().node());
                this._mouseDispatcher.onMouseMove("Interaction.Pointer" + this.getID(), function (p) { return _this._handlePointerEvent(p); });
                this._touchDispatcher = Plottable.Dispatcher.Touch.getDispatcher(this._componentToListenTo.content().node());
                this._touchDispatcher.onTouchStart("Interaction.Pointer" + this.getID(), function (ids, idToPoint) { return _this._handlePointerEvent(idToPoint[ids[0]]); });
            };
            Pointer.prototype._handlePointerEvent = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedP)) {
                    var wasOverComponent = this._overComponent;
                    this._overComponent = true;
                    if (!wasOverComponent && this._pointerEnterCallback) {
                        this._pointerEnterCallback(translatedP);
                    }
                    if (this._pointerMoveCallback) {
                        this._pointerMoveCallback(translatedP);
                    }
                }
                else if (this._overComponent) {
                    this._overComponent = false;
                    if (this._pointerExitCallback) {
                        this._pointerExitCallback(translatedP);
                    }
                }
            };
            Pointer.prototype.onPointerEnter = function (callback) {
                if (callback === undefined) {
                    return this._pointerEnterCallback;
                }
                this._pointerEnterCallback = callback;
                return this;
            };
            Pointer.prototype.onPointerMove = function (callback) {
                if (callback === undefined) {
                    return this._pointerMoveCallback;
                }
                this._pointerMoveCallback = callback;
                return this;
            };
            Pointer.prototype.onPointerExit = function (callback) {
                if (callback === undefined) {
                    return this._pointerExitCallback;
                }
                this._pointerExitCallback = callback;
                return this;
            };
            return Pointer;
        })(Interaction.AbstractInteraction);
        Interaction.Pointer = Pointer;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var PanZoom = (function (_super) {
            __extends(PanZoom, _super);
            /**
             * Creates a PanZoomInteraction.
             *
             * The allows you to move around and zoom in on a plot, interactively. It
             * does so by changing the xScale and yScales' domains repeatedly.
             *
             * @constructor
             * @param {QuantitativeScale} [xScale] The X scale to update on panning/zooming.
             * @param {QuantitativeScale} [yScale] The Y scale to update on panning/zooming.
             */
            function PanZoom(xScale, yScale) {
                var _this = this;
                _super.call(this);
                if (xScale) {
                    this._xScale = xScale;
                    // HACKHACK #1388: self-register for resetZoom()
                    this._xScale.broadcaster.registerListener("pziX" + this.getID(), function () { return _this.resetZoom(); });
                }
                if (yScale) {
                    this._yScale = yScale;
                    // HACKHACK #1388: self-register for resetZoom()
                    this._yScale.broadcaster.registerListener("pziY" + this.getID(), function () { return _this.resetZoom(); });
                }
            }
            /**
             * Sets the scales back to their original domains.
             */
            PanZoom.prototype.resetZoom = function () {
                var _this = this;
                // HACKHACK #254
                this._zoom = d3.behavior.zoom();
                if (this._xScale) {
                    this._zoom.x(this._xScale._d3Scale);
                }
                if (this._yScale) {
                    this._zoom.y(this._yScale._d3Scale);
                }
                this._zoom.on("zoom", function () { return _this._rerenderZoomed(); });
                this._zoom(this._hitBox);
            };
            PanZoom.prototype._anchor = function (component, hitBox) {
                _super.prototype._anchor.call(this, component, hitBox);
                this.resetZoom();
            };
            PanZoom.prototype._requiresHitbox = function () {
                return true;
            };
            PanZoom.prototype._rerenderZoomed = function () {
                // HACKHACK since the d3.zoom.x modifies d3 scales and not our TS scales, and the TS scales have the
                // event listener machinery, let's grab the domain out of the d3 scale and pipe it back into the TS scale
                if (this._xScale) {
                    var xDomain = this._xScale._d3Scale.domain();
                    this._xScale.domain(xDomain);
                }
                if (this._yScale) {
                    var yDomain = this._yScale._d3Scale.domain();
                    this._yScale.domain(yDomain);
                }
            };
            return PanZoom;
        })(Interaction.AbstractInteraction);
        Interaction.PanZoom = PanZoom;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var Drag = (function (_super) {
            __extends(Drag, _super);
            function Drag() {
                _super.apply(this, arguments);
                this._dragging = false;
                this._constrain = true;
            }
            Drag.prototype._anchor = function (component, hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, component, hitBox);
                this._mouseDispatcher = Plottable.Dispatcher.Mouse.getDispatcher(this._componentToListenTo.content().node());
                this._mouseDispatcher.onMouseDown("Interaction.Drag" + this.getID(), function (p, e) { return _this._startDrag(p, e); });
                this._mouseDispatcher.onMouseMove("Interaction.Drag" + this.getID(), function (p, e) { return _this._doDrag(p, e); });
                this._mouseDispatcher.onMouseUp("Interaction.Drag" + this.getID(), function (p, e) { return _this._endDrag(p, e); });
                this._touchDispatcher = Plottable.Dispatcher.Touch.getDispatcher(this._componentToListenTo.content().node());
                this._touchDispatcher.onTouchStart("Interaction.Drag" + this.getID(), function (ids, idToPoint, e) { return _this._startDrag(idToPoint[ids[0]], e); });
                this._touchDispatcher.onTouchMove("Interaction.Drag" + this.getID(), function (ids, idToPoint, e) { return _this._doDrag(idToPoint[ids[0]], e); });
                this._touchDispatcher.onTouchEnd("Interaction.Drag" + this.getID(), function (ids, idToPoint, e) { return _this._endDrag(idToPoint[ids[0]], e); });
            };
            Drag.prototype._translateAndConstrain = function (p) {
                var translatedP = this._translateToComponentSpace(p);
                if (!this._constrain) {
                    return translatedP;
                }
                return {
                    x: Plottable._Util.Methods.clamp(translatedP.x, 0, this._componentToListenTo.width()),
                    y: Plottable._Util.Methods.clamp(translatedP.y, 0, this._componentToListenTo.height())
                };
            };
            Drag.prototype._startDrag = function (p, e) {
                if (e instanceof MouseEvent && e.button !== 0) {
                    return;
                }
                var translatedP = this._translateToComponentSpace(p);
                if (this._isInsideComponent(translatedP)) {
                    e.preventDefault();
                    this._dragging = true;
                    this._dragOrigin = translatedP;
                    if (this._dragStartCallback) {
                        this._dragStartCallback(this._dragOrigin);
                    }
                }
            };
            Drag.prototype._doDrag = function (p, e) {
                if (this._dragging) {
                    if (this._dragCallback) {
                        var constrainedP = this._translateAndConstrain(p);
                        this._dragCallback(this._dragOrigin, constrainedP);
                    }
                }
            };
            Drag.prototype._endDrag = function (p, e) {
                if (e instanceof MouseEvent && e.button !== 0) {
                    return;
                }
                if (this._dragging) {
                    this._dragging = false;
                    if (this._dragEndCallback) {
                        var constrainedP = this._translateAndConstrain(p);
                        this._dragEndCallback(this._dragOrigin, constrainedP);
                    }
                }
            };
            Drag.prototype.constrainToComponent = function (constrain) {
                if (constrain == null) {
                    return this._constrain;
                }
                this._constrain = constrain;
                return this;
            };
            Drag.prototype.onDragStart = function (cb) {
                if (cb === undefined) {
                    return this._dragStartCallback;
                }
                else {
                    this._dragStartCallback = cb;
                    return this;
                }
            };
            Drag.prototype.onDrag = function (cb) {
                if (cb === undefined) {
                    return this._dragCallback;
                }
                else {
                    this._dragCallback = cb;
                    return this;
                }
            };
            Drag.prototype.onDragEnd = function (cb) {
                if (cb === undefined) {
                    return this._dragEndCallback;
                }
                else {
                    this._dragEndCallback = cb;
                    return this;
                }
            };
            return Drag;
        })(Interaction.AbstractInteraction);
        Interaction.Drag = Drag;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Interaction;
    (function (Interaction) {
        var Hover = (function (_super) {
            __extends(Hover, _super);
            function Hover() {
                _super.call(this);
                this._overComponent = false;
                this._currentHoverData = {
                    data: null,
                    pixelPositions: null,
                    selection: null
                };
                if (!Hover.warned) {
                    Hover.warned = true;
                    Plottable._Util.Methods.warn("Interaction.Hover is deprecated; use Interaction.Pointer in conjunction with getClosestPlotData() instead.");
                }
            }
            Hover.prototype._anchor = function (component, hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, component, hitBox);
                this._mouseDispatcher = Plottable.Dispatcher.Mouse.getDispatcher(this._componentToListenTo._element.node());
                this._mouseDispatcher.onMouseMove("hover" + this.getID(), function (p) { return _this._handlePointerEvent(p); });
                this._touchDispatcher = Plottable.Dispatcher.Touch.getDispatcher(this._componentToListenTo._element.node());
                this._touchDispatcher.onTouchStart("hover" + this.getID(), function (ids, idToPoint) { return _this._handlePointerEvent(idToPoint[ids[0]]); });
            };
            Hover.prototype._handlePointerEvent = function (p) {
                p = this._translateToComponentSpace(p);
                if (this._isInsideComponent(p)) {
                    if (!this._overComponent) {
                        this._componentToListenTo._hoverOverComponent(p);
                    }
                    this.handleHoverOver(p);
                    this._overComponent = true;
                }
                else {
                    this._componentToListenTo._hoverOutComponent(p);
                    this.safeHoverOut(this._currentHoverData);
                    this._currentHoverData = {
                        data: null,
                        pixelPositions: null,
                        selection: null
                    };
                    this._overComponent = false;
                }
            };
            /**
             * Returns a HoverData consisting of all data and selections in a but not in b.
             */
            Hover.diffHoverData = function (a, b) {
                if (a.data == null || b.data == null) {
                    return a;
                }
                var diffData = [];
                var diffPoints = [];
                var diffElements = [];
                a.data.forEach(function (d, i) {
                    if (b.data.indexOf(d) === -1) {
                        diffData.push(d);
                        diffPoints.push(a.pixelPositions[i]);
                        diffElements.push(a.selection[0][i]);
                    }
                });
                if (diffData.length === 0) {
                    return {
                        data: null,
                        pixelPositions: null,
                        selection: null
                    };
                }
                return {
                    data: diffData,
                    pixelPositions: diffPoints,
                    selection: d3.selectAll(diffElements)
                };
            };
            Hover.prototype.handleHoverOver = function (p) {
                var lastHoverData = this._currentHoverData;
                var newHoverData = this._componentToListenTo._doHover(p);
                this._currentHoverData = newHoverData;
                var outData = Hover.diffHoverData(lastHoverData, newHoverData);
                this.safeHoverOut(outData);
                var overData = Hover.diffHoverData(newHoverData, lastHoverData);
                this.safeHoverOver(overData);
            };
            Hover.prototype.safeHoverOut = function (outData) {
                if (this._hoverOutCallback && outData.data) {
                    this._hoverOutCallback(outData);
                }
            };
            Hover.prototype.safeHoverOver = function (overData) {
                if (this._hoverOverCallback && overData.data) {
                    this._hoverOverCallback(overData);
                }
            };
            /**
             * Attaches an callback to be called when the user mouses over an element.
             *
             * @param {(hoverData: HoverData) => any} callback The callback to be called.
             *      The callback will be passed data for newly hovered-over elements.
             * @return {Interaction.Hover} The calling Interaction.Hover.
             */
            Hover.prototype.onHoverOver = function (callback) {
                this._hoverOverCallback = callback;
                return this;
            };
            /**
             * Attaches a callback to be called when the user mouses off of an element.
             *
             * @param {(hoverData: HoverData) => any} callback The callback to be called.
             *      The callback will be passed data from the hovered-out elements.
             * @return {Interaction.Hover} The calling Interaction.Hover.
             */
            Hover.prototype.onHoverOut = function (callback) {
                this._hoverOutCallback = callback;
                return this;
            };
            /**
             * Retrieves the HoverData associated with the elements the user is currently hovering over.
             *
             * @return {HoverData} The data and selection corresponding to the elements
             *                     the user is currently hovering over.
             */
            Hover.prototype.getCurrentHoverData = function () {
                return this._currentHoverData;
            };
            Hover.warned = false;
            return Hover;
        })(Interaction.AbstractInteraction);
        Interaction.Hover = Hover;
    })(Interaction = Plottable.Interaction || (Plottable.Interaction = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var DragBoxLayer = (function (_super) {
            __extends(DragBoxLayer, _super);
            function DragBoxLayer() {
                _super.call(this);
                this._detectionRadius = 3;
                this._resizable = false;
                this._hasCorners = true;
                /*
                 * Enable clipPath to hide _detectionEdge s and _detectionCorner s
                 * that overlap with the edge of the DragBoxLayer. This prevents the
                 * user's cursor from changing outside the DragBoxLayer, where they
                 * wouldn't be able to grab the edges or corners for resizing.
                 */
                this.clipPathEnabled = true;
                this.classed("drag-box-layer", true);
                this._dragInteraction = new Plottable.Interaction.Drag();
                this._setUpCallbacks();
                this.registerInteraction(this._dragInteraction);
            }
            DragBoxLayer.prototype._setUpCallbacks = function () {
                var _this = this;
                var resizingEdges;
                var topLeft;
                var bottomRight;
                var startedNewBox;
                this._dragInteraction.onDragStart(function (s) {
                    resizingEdges = _this._getResizingEdges(s);
                    if (!_this.boxVisible() || (!resizingEdges.top && !resizingEdges.bottom && !resizingEdges.left && !resizingEdges.right)) {
                        _this.bounds({
                            topLeft: s,
                            bottomRight: s
                        });
                        startedNewBox = true;
                    }
                    else {
                        startedNewBox = false;
                    }
                    _this.boxVisible(true);
                    var bounds = _this.bounds();
                    // copy points so changes to topLeft and bottomRight don't mutate bounds
                    topLeft = { x: bounds.topLeft.x, y: bounds.topLeft.y };
                    bottomRight = { x: bounds.bottomRight.x, y: bounds.bottomRight.y };
                    if (_this._dragStartCallback) {
                        _this._dragStartCallback(bounds);
                    }
                });
                this._dragInteraction.onDrag(function (s, e) {
                    if (startedNewBox) {
                        bottomRight.x = e.x;
                        bottomRight.y = e.y;
                    }
                    else {
                        if (resizingEdges.bottom) {
                            bottomRight.y = e.y;
                        }
                        else if (resizingEdges.top) {
                            topLeft.y = e.y;
                        }
                        if (resizingEdges.right) {
                            bottomRight.x = e.x;
                        }
                        else if (resizingEdges.left) {
                            topLeft.x = e.x;
                        }
                    }
                    _this.bounds({
                        topLeft: topLeft,
                        bottomRight: bottomRight
                    });
                    if (_this._dragCallback) {
                        _this._dragCallback(_this.bounds());
                    }
                });
                this._dragInteraction.onDragEnd(function (s, e) {
                    if (startedNewBox && s.x === e.x && s.y === e.y) {
                        _this.boxVisible(false);
                    }
                    if (_this._dragEndCallback) {
                        _this._dragEndCallback(_this.bounds());
                    }
                });
            };
            DragBoxLayer.prototype._setup = function () {
                var _this = this;
                _super.prototype._setup.call(this);
                var createLine = function () { return _this._box.append("line").style({
                    "opacity": 0,
                    "stroke": "pink"
                }); };
                this._detectionEdgeT = createLine().classed("drag-edge-tb", true);
                this._detectionEdgeB = createLine().classed("drag-edge-tb", true);
                this._detectionEdgeL = createLine().classed("drag-edge-lr", true);
                this._detectionEdgeR = createLine().classed("drag-edge-lr", true);
                if (this._hasCorners) {
                    var createCorner = function () { return _this._box.append("circle").style({
                        "opacity": 0,
                        "fill": "pink"
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
            DragBoxLayer.prototype._doRender = function () {
                _super.prototype._doRender.call(this);
                if (this.boxVisible()) {
                    var bounds = this.bounds();
                    var t = bounds.topLeft.y;
                    var b = bounds.bottomRight.y;
                    var l = bounds.topLeft.x;
                    var r = bounds.bottomRight.x;
                    this._detectionEdgeT.attr({
                        x1: l,
                        y1: t,
                        x2: r,
                        y2: t,
                        "stroke-width": this._detectionRadius * 2
                    });
                    this._detectionEdgeB.attr({
                        x1: l,
                        y1: b,
                        x2: r,
                        y2: b,
                        "stroke-width": this._detectionRadius * 2
                    });
                    this._detectionEdgeL.attr({
                        x1: l,
                        y1: t,
                        x2: l,
                        y2: b,
                        "stroke-width": this._detectionRadius * 2
                    });
                    this._detectionEdgeR.attr({
                        x1: r,
                        y1: t,
                        x2: r,
                        y2: b,
                        "stroke-width": this._detectionRadius * 2
                    });
                    if (this._hasCorners) {
                        this._detectionCornerTL.attr({ cx: l, cy: t, r: this._detectionRadius });
                        this._detectionCornerTR.attr({ cx: r, cy: t, r: this._detectionRadius });
                        this._detectionCornerBL.attr({ cx: l, cy: b, r: this._detectionRadius });
                        this._detectionCornerBR.attr({ cx: r, cy: b, r: this._detectionRadius });
                    }
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
                this._render();
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
                this.classed("x-resizable", canResize);
                this.classed("y-resizable", canResize);
            };
            DragBoxLayer.prototype.onDragStart = function (cb) {
                if (cb === undefined) {
                    return this._dragStartCallback;
                }
                else {
                    this._dragStartCallback = cb;
                    return this;
                }
            };
            DragBoxLayer.prototype.onDrag = function (cb) {
                if (cb === undefined) {
                    return this._dragCallback;
                }
                else {
                    this._dragCallback = cb;
                    return this;
                }
            };
            DragBoxLayer.prototype.onDragEnd = function (cb) {
                if (cb === undefined) {
                    return this._dragEndCallback;
                }
                else {
                    this._dragEndCallback = cb;
                    return this;
                }
            };
            return DragBoxLayer;
        })(Component.SelectionBoxLayer);
        Component.DragBoxLayer = DragBoxLayer;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var XDragBoxLayer = (function (_super) {
            __extends(XDragBoxLayer, _super);
            function XDragBoxLayer() {
                _super.call(this);
                this.classed("x-drag-box-layer", true);
                this._hasCorners = false;
            }
            XDragBoxLayer.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
                this.bounds(this.bounds()); // set correct bounds when width/height changes
            };
            XDragBoxLayer.prototype._setBounds = function (newBounds) {
                _super.prototype._setBounds.call(this, {
                    topLeft: { x: newBounds.topLeft.x, y: 0 },
                    bottomRight: { x: newBounds.bottomRight.x, y: this.height() }
                });
            };
            XDragBoxLayer.prototype._setResizableClasses = function (canResize) {
                this.classed("x-resizable", canResize);
            };
            return XDragBoxLayer;
        })(Component.DragBoxLayer);
        Component.XDragBoxLayer = XDragBoxLayer;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    var Component;
    (function (Component) {
        var YDragBoxLayer = (function (_super) {
            __extends(YDragBoxLayer, _super);
            function YDragBoxLayer() {
                _super.call(this);
                this.classed("y-drag-box-layer", true);
                this._hasCorners = false;
            }
            YDragBoxLayer.prototype._computeLayout = function (offeredXOrigin, offeredYOrigin, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, offeredXOrigin, offeredYOrigin, availableWidth, availableHeight);
                this.bounds(this.bounds()); // set correct bounds when width/height changes
            };
            YDragBoxLayer.prototype._setBounds = function (newBounds) {
                _super.prototype._setBounds.call(this, {
                    topLeft: { x: 0, y: newBounds.topLeft.y },
                    bottomRight: { x: this.width(), y: newBounds.bottomRight.y }
                });
            };
            YDragBoxLayer.prototype._setResizableClasses = function (canResize) {
                this.classed("y-resizable", canResize);
            };
            return YDragBoxLayer;
        })(Component.DragBoxLayer);
        Component.YDragBoxLayer = YDragBoxLayer;
    })(Component = Plottable.Component || (Plottable.Component = {}));
})(Plottable || (Plottable = {}));

/*!
SVG Typewriter 0.1.11 (https://github.com/palantir/svg-typewriter)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/svg-typewriter/blob/develop/LICENSE)
*/

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    (function (Utils) {
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
        })(Utils.Methods || (Utils.Methods = {}));
        var Methods = Utils.Methods;
    })(SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
    var Utils = SVGTypewriter.Utils;
})(SVGTypewriter || (SVGTypewriter = {}));

var SVGTypewriter;
(function (SVGTypewriter) {
    (function (Utils) {
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
        })(Utils.DOM || (Utils.DOM = {}));
        var DOM = Utils.DOM;
    })(SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
    var Utils = SVGTypewriter.Utils;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
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
    })(SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
    var Utils = SVGTypewriter.Utils;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
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
    })(SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
    var Utils = SVGTypewriter.Utils;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
    (function (Utils) {
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
        })(Utils.StringMethods || (Utils.StringMethods = {}));
        var StringMethods = Utils.StringMethods;
    })(SVGTypewriter.Utils || (SVGTypewriter.Utils = {}));
    var Utils = SVGTypewriter.Utils;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
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
    })(SVGTypewriter.Animators || (SVGTypewriter.Animators = {}));
    var Animators = SVGTypewriter.Animators;
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
    })(SVGTypewriter.Animators || (SVGTypewriter.Animators = {}));
    var Animators = SVGTypewriter.Animators;
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
    })(SVGTypewriter.Animators || (SVGTypewriter.Animators = {}));
    var Animators = SVGTypewriter.Animators;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
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
    })(SVGTypewriter.Wrappers || (SVGTypewriter.Wrappers = {}));
    var Wrappers = SVGTypewriter.Wrappers;
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
    })(SVGTypewriter.Wrappers || (SVGTypewriter.Wrappers = {}));
    var Wrappers = SVGTypewriter.Wrappers;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
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
                var attr = SVGTypewriter.Utils.DOM.getBBox(selection.select(".text-area"));
                var box = clipPathParent.append("rect");
                box.classed("clip-rect", true).attr(attr);
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
    })(SVGTypewriter.Writers || (SVGTypewriter.Writers = {}));
    var Writers = SVGTypewriter.Writers;
})(SVGTypewriter || (SVGTypewriter = {}));

///<reference path="../reference.ts" />
var SVGTypewriter;
(function (SVGTypewriter) {
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
    })(SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
    var Measurers = SVGTypewriter.Measurers;
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
    })(SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
    var Measurers = SVGTypewriter.Measurers;
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
    })(SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
    var Measurers = SVGTypewriter.Measurers;
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
    })(SVGTypewriter.Measurers || (SVGTypewriter.Measurers = {}));
    var Measurers = SVGTypewriter.Measurers;
})(SVGTypewriter || (SVGTypewriter = {}));
