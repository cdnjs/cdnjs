/*!
Plottable 0.20.4 (https://github.com/palantir/plottable)
Copyright 2014 Palantir Technologies
Licensed under MIT (https://github.com/palantir/plottable/blob/master/LICENSE)
*/

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
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
                return alist.map(function (_, i) {
                    return alist[i] + blist[i];
                });
            }
            Methods.addArrays = addArrays;

            /**
            * Takes two sets and returns the intersection
            *
            * @param {D3.Set} set1 The first set
            * @param {D3.Set} set2 The second set
            * @return {D3.Set} A set that contains elements that appear in both set1 and set2
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

            function accessorize(accessor) {
                if (typeof (accessor) === "function") {
                    return accessor;
                } else if (typeof (accessor) === "string" && accessor[0] !== "#") {
                    return function (d, i, s) {
                        return d[accessor];
                    };
                } else {
                    return function (d, i, s) {
                        return accessor;
                    };
                }
                ;
            }
            Methods.accessorize = accessorize;

            function applyAccessor(accessor, dataSource) {
                var activatedAccessor = accessorize(accessor);
                return function (d, i) {
                    return activatedAccessor(d, i, dataSource.metadata());
                };
            }
            Methods.applyAccessor = applyAccessor;

            function uniq(strings) {
                var seen = {};
                strings.forEach(function (s) {
                    return seen[s] = true;
                });
                return d3.keys(seen);
            }
            Methods.uniq = uniq;

            /**
            * Creates an array of length `count`, filled with value or (if value is a function), value()
            *
            * @param {any} value The value to fill the array with, or, if a function, a generator for values
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
                var valuesA = keysA.map(function (k) {
                    return a[k];
                });
                var valuesB = keysB.map(function (k) {
                    return b[k];
                });
                return arrayEq(keysA, keysB) && arrayEq(valuesA, valuesB);
            }
            Methods.objEq = objEq;
        })(Util.Methods || (Util.Methods = {}));
        var Methods = Util.Methods;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
// This file contains open source utilities, along with their copyright notices
var Plottable;
(function (Plottable) {
    (function (Util) {
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
                    } else {
                        high = mid;
                    }
                }
                return low;
            }
            OpenSource.sortedIndex = sortedIndex;
            ;
        })(Util.OpenSource || (Util.OpenSource = {}));
        var OpenSource = Util.OpenSource;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        var IDCounter = (function () {
            function IDCounter() {
                this.counter = {};
            }
            IDCounter.prototype.setDefault = function (id) {
                if (this.counter[id] == null) {
                    this.counter[id] = 0;
                }
            };

            IDCounter.prototype.increment = function (id) {
                this.setDefault(id);
                return ++this.counter[id];
            };

            IDCounter.prototype.decrement = function (id) {
                this.setDefault(id);
                return --this.counter[id];
            };

            IDCounter.prototype.get = function (id) {
                this.setDefault(id);
                return this.counter[id];
            };
            return IDCounter;
        })();
        Util.IDCounter = IDCounter;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        /**
        * An associative array that can be keyed by anything (inc objects).
        * Uses pointer equality checks which is why this works.
        * This power has a price: everything is linear time since it is actually backed by an array...
        */
        var StrictEqualityAssociativeArray = (function () {
            function StrictEqualityAssociativeArray() {
                this.keyValuePairs = [];
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
                for (var i = 0; i < this.keyValuePairs.length; i++) {
                    if (this.keyValuePairs[i][0] === key) {
                        this.keyValuePairs[i][1] = value;
                        return true;
                    }
                }
                this.keyValuePairs.push([key, value]);
                return false;
            };

            /**
            * Get a value from the store, given a key.
            *
            * @param {any} key Key associated with value to retrieve
            * @return {any} Value if found, undefined otherwise
            */
            StrictEqualityAssociativeArray.prototype.get = function (key) {
                for (var i = 0; i < this.keyValuePairs.length; i++) {
                    if (this.keyValuePairs[i][0] === key) {
                        return this.keyValuePairs[i][1];
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
                for (var i = 0; i < this.keyValuePairs.length; i++) {
                    if (this.keyValuePairs[i][0] === key) {
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
                return this.keyValuePairs.map(function (x) {
                    return x[1];
                });
            };

            /**
            * Return an array of keys in the key-value store
            *
            * @return {any[]} The keys in the store
            */
            StrictEqualityAssociativeArray.prototype.keys = function () {
                return this.keyValuePairs.map(function (x) {
                    return x[0];
                });
            };

            /**
            * Execute a callback for each entry in the array.
            *
            * @param {(key: any, val?: any, index?: number) => any} callback The callback to eecute
            * @return {any[]} The results of mapping the callback over the entries
            */
            StrictEqualityAssociativeArray.prototype.map = function (cb) {
                return this.keyValuePairs.map(function (kv, index) {
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
                for (var i = 0; i < this.keyValuePairs.length; i++) {
                    if (this.keyValuePairs[i][0] === key) {
                        this.keyValuePairs.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            return StrictEqualityAssociativeArray;
        })();
        Util.StrictEqualityAssociativeArray = StrictEqualityAssociativeArray;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        var Cache = (function () {
            /**
            * @constructor
            *
            * @param {string} compute The function whose results will be cached.
            * @param {string} [canonicalKey] If present, when clear() is called,
            *        this key will be re-computed. If its result hasn't been changed,
            *        the cache will not be cleared.
            * @param {(v: T, w: T) => boolean} [valueEq]
            *        Used to determine if the value of canonicalKey has changed.
            *        If omitted, defaults to === comparision.
            */
            function Cache(compute, canonicalKey, valueEq) {
                if (typeof valueEq === "undefined") { valueEq = function (v, w) {
                    return v === w;
                }; }
                this.cache = d3.map();
                this.canonicalKey = null;
                this.compute = compute;
                this.canonicalKey = canonicalKey;
                this.valueEq = valueEq;
                if (canonicalKey !== undefined) {
                    this.cache.set(this.canonicalKey, this.compute(this.canonicalKey));
                }
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
            * If canonicalKey was provided at construction, compute(canonicalKey)
            * will be re-run. If the result matches what is already in the cache,
            * it will not clear the cache.
            *
            * @return {Cache<T>} The calling Cache.
            */
            Cache.prototype.clear = function () {
                if (this.canonicalKey === undefined || !this.valueEq(this.cache.get(this.canonicalKey), this.compute(this.canonicalKey))) {
                    this.cache = d3.map();
                }
                return this;
            };
            return Cache;
        })();
        Util.Cache = Cache;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        (function (Text) {
            ;

            ;

            /**
            * Returns a quasi-pure function of typesignature (t: string) => Dimensions which measures height and width of text
            *
            * @param {D3.Selection} selection: The selection in which text will be drawn and measured
            * @returns {Dimensions} width and height of the text
            */
            function getTextMeasure(selection) {
                return function (s) {
                    if (s.trim() === "") {
                        return { width: 0, height: 0 };
                    }
                    var bb;
                    if (selection.node().nodeName === "text") {
                        var originalText = selection.text();
                        selection.text(s);
                        bb = Util.DOM.getBBox(selection);
                        selection.text(originalText);
                        return { width: bb.width, height: bb.height };
                    } else {
                        var t = selection.append("text").text(s);
                        bb = Util.DOM.getBBox(t);
                        t.remove();
                        return { width: bb.width, height: bb.height };
                    }
                };
            }
            Text.getTextMeasure = getTextMeasure;

            /**
            * @return {TextMeasurer} A test measurer that will treat all sequences
            *         of consecutive whitespace as a single " ".
            */
            function combineWhitespace(tm) {
                return function (s) {
                    return tm(s.replace(/\s+/g, " "));
                };
            }

            /**
            * Returns a text measure that measures each individual character of the
            * string with tm, then combines all the individual measurements.
            */
            function measureByCharacter(tm) {
                return function (s) {
                    var whs = s.trim().split("").map(tm);
                    return {
                        width: d3.sum(whs, function (wh) {
                            return wh.width;
                        }),
                        height: d3.max(whs, function (wh) {
                            return wh.height;
                        })
                    };
                };
            }

            var CANONICAL_CHR = "a";

            /**
            * Some TextMeasurers get confused when measuring something that's only
            * whitespace: only whitespace in a dom node takes up 0 x 0 space.
            *
            * @return {TextMeasurer} A function that if its argument is all
            *         whitespace, it will wrap its argument in CANONICAL_CHR before
            *         measuring in order to get a non-zero size of the whitespace.
            */
            function wrapWhitespace(tm) {
                return function (s) {
                    if (/^\s*$/.test(s)) {
                        var whs = s.split("").map(function (c) {
                            var wh = tm(CANONICAL_CHR + c + CANONICAL_CHR);
                            var whWrapping = tm(CANONICAL_CHR);
                            return {
                                width: wh.width - 2 * whWrapping.width,
                                height: wh.height
                            };
                        });
                        return {
                            width: d3.sum(whs, function (x) {
                                return x.width;
                            }),
                            height: d3.max(whs, function (x) {
                                return x.height;
                            })
                        };
                    } else {
                        return tm(s);
                    }
                };
            }

            /**
            * This class will measure text by measuring each character individually,
            * then adding up the dimensions. It will also cache the dimensions of each
            * letter.
            */
            var CachingCharacterMeasurer = (function () {
                /**
                * @param {D3.Selection} g The element that will have text inserted into
                *        it in order to measure text. The styles present for text in
                *        this element will to the text being measured.
                */
                function CachingCharacterMeasurer(g) {
                    var _this = this;
                    this.cache = new Util.Cache(getTextMeasure(g), CANONICAL_CHR, Util.Methods.objEq);
                    this.measure = combineWhitespace(measureByCharacter(wrapWhitespace(function (s) {
                        return _this.cache.get(s);
                    })));
                }
                /**
                * Clear the cache, if it seems that the text has changed size.
                */
                CachingCharacterMeasurer.prototype.clear = function () {
                    this.cache.clear();
                    return this;
                };
                return CachingCharacterMeasurer;
            })();
            Text.CachingCharacterMeasurer = CachingCharacterMeasurer;

            /**
            * Gets a truncated version of a sting that fits in the available space, given the element in which to draw the text
            *
            * @param {string} text: The string to be truncated
            * @param {number} availableWidth: The available width, in pixels
            * @param {D3.Selection} element: The text element used to measure the text
            * @returns {string} text - the shortened text
            */
            function getTruncatedText(text, availableWidth, measurer) {
                if (measurer(text).width <= availableWidth) {
                    return text;
                } else {
                    return _addEllipsesToLine(text, availableWidth, measurer);
                }
            }
            Text.getTruncatedText = getTruncatedText;

            /**
            * Gets the height of a text element, as rendered.
            *
            * @param {D3.Selection} textElement
            * @return {number} The height of the text element, in pixels.
            */
            function getTextHeight(selection) {
                return getTextMeasure(selection)("bqpdl").height;
            }
            Text.getTextHeight = getTextHeight;

            /**
            * Gets the width of a text element, as rendered.
            *
            * @param {D3.Selection} textElement
            * @return {number} The width of the text element, in pixels.
            */
            function getTextWidth(textElement, text) {
                return getTextMeasure(textElement)(text).width;
            }
            Text.getTextWidth = getTextWidth;

            /**
            * Takes a line, a width to fit it in, and a text measurer. Will attempt to add ellipses to the end of the line,
            * shortening the line as required to ensure that it fits within width.
            */
            function _addEllipsesToLine(line, width, measureText) {
                var mutatedLine = line.trim();
                var widthMeasure = function (s) {
                    return measureText(s).width;
                };
                var lineWidth = widthMeasure(line);
                var ellipsesWidth = widthMeasure("...");
                if (width < ellipsesWidth) {
                    var periodWidth = widthMeasure(".");
                    var numPeriodsThatFit = Math.floor(width / periodWidth);
                    return "...".substr(0, numPeriodsThatFit);
                }
                while (lineWidth + ellipsesWidth > width) {
                    mutatedLine = mutatedLine.substr(0, mutatedLine.length - 1).trim();
                    lineWidth = widthMeasure(mutatedLine);
                }
                if (widthMeasure(mutatedLine + "...") > width) {
                    throw new Error("_addEllipsesToLine failed :(");
                }
                return mutatedLine + "...";
            }
            Text._addEllipsesToLine = _addEllipsesToLine;

            function writeLineHorizontally(line, g, width, height, xAlign, yAlign) {
                if (typeof xAlign === "undefined") { xAlign = "left"; }
                if (typeof yAlign === "undefined") { yAlign = "top"; }
                var xOffsetFactor = { left: 0, center: 0.5, right: 1 };
                var yOffsetFactor = { top: 0, center: 0.5, bottom: 1 };
                if (xOffsetFactor[xAlign] === undefined || yOffsetFactor[yAlign] === undefined) {
                    throw new Error("unrecognized alignment x:" + xAlign + ", y:" + yAlign);
                }
                var innerG = g.append("g");
                var textEl = innerG.append("text");
                textEl.text(line);
                var bb = Util.DOM.getBBox(textEl);
                var h = bb.height;
                var w = bb.width;
                if (w > width || h > height) {
                    console.log("Insufficient space to fit text");
                    return { width: 0, height: 0 };
                }
                var anchorConverter = { left: "start", center: "middle", right: "end" };
                var anchor = anchorConverter[xAlign];
                var xOff = width * xOffsetFactor[xAlign];
                var yOff = height * yOffsetFactor[yAlign] + h * (1 - yOffsetFactor[yAlign]);
                var ems = -0.4 * (1 - yOffsetFactor[yAlign]);
                textEl.attr("text-anchor", anchor).attr("y", ems + "em");
                Util.DOM.translate(innerG, xOff, yOff);
                return { width: w, height: h };
            }
            Text.writeLineHorizontally = writeLineHorizontally;

            function writeLineVertically(line, g, width, height, xAlign, yAlign, rotation) {
                if (typeof xAlign === "undefined") { xAlign = "left"; }
                if (typeof yAlign === "undefined") { yAlign = "top"; }
                if (typeof rotation === "undefined") { rotation = "right"; }
                if (rotation !== "right" && rotation !== "left") {
                    throw new Error("unrecognized rotation: " + rotation);
                }
                var isRight = rotation === "right";
                var rightTranslator = { left: "bottom", right: "top", center: "center", top: "left", bottom: "right" };
                var leftTranslator = { left: "top", right: "bottom", center: "center", top: "right", bottom: "left" };
                var alignTranslator = isRight ? rightTranslator : leftTranslator;
                var innerG = g.append("g");
                var wh = writeLineHorizontally(line, innerG, height, width, alignTranslator[yAlign], alignTranslator[xAlign]);
                var xForm = d3.transform("");
                xForm.rotate = rotation === "right" ? 90 : -90;
                xForm.translate = [isRight ? width : 0, isRight ? 0 : height];
                innerG.attr("transform", xForm.toString());

                return wh;
            }
            Text.writeLineVertically = writeLineVertically;

            function writeTextHorizontally(brokenText, g, width, height, xAlign, yAlign) {
                if (typeof xAlign === "undefined") { xAlign = "left"; }
                if (typeof yAlign === "undefined") { yAlign = "top"; }
                var h = getTextHeight(g);
                var maxWidth = 0;
                var blockG = g.append("g");
                brokenText.forEach(function (line, i) {
                    var innerG = blockG.append("g");
                    Util.DOM.translate(innerG, 0, i * h);
                    var wh = writeLineHorizontally(line, innerG, width, h, xAlign, yAlign);
                    if (wh.width > maxWidth) {
                        maxWidth = wh.width;
                    }
                });
                var usedSpace = h * brokenText.length;
                var freeSpace = height - usedSpace;
                var translator = { center: 0.5, top: 0, bottom: 1 };
                Util.DOM.translate(blockG, 0, freeSpace * translator[yAlign]);
                return { width: maxWidth, height: usedSpace };
            }
            Text.writeTextHorizontally = writeTextHorizontally;

            function writeTextVertically(brokenText, g, width, height, xAlign, yAlign, rotation) {
                if (typeof xAlign === "undefined") { xAlign = "left"; }
                if (typeof yAlign === "undefined") { yAlign = "top"; }
                if (typeof rotation === "undefined") { rotation = "left"; }
                var h = getTextHeight(g);
                var maxHeight = 0;
                var blockG = g.append("g");
                brokenText.forEach(function (line, i) {
                    var innerG = blockG.append("g");
                    Util.DOM.translate(innerG, i * h, 0);
                    var wh = writeLineVertically(line, innerG, h, height, xAlign, yAlign, rotation);
                    if (wh.height > maxHeight) {
                        maxHeight = wh.height;
                    }
                });
                var usedSpace = h * brokenText.length;
                var freeSpace = width - usedSpace;
                var translator = { center: 0.5, left: 0, right: 1 };
                Util.DOM.translate(blockG, freeSpace * translator[xAlign], 0);

                return { width: usedSpace, height: maxHeight };
            }
            Text.writeTextVertically = writeTextVertically;

            ;

            /**
            * @param {write} [IWriteOptions] If supplied, the text will be written
            *        To the given g. Will align the text vertically if it seems like
            *        that is appropriate.
            * Returns an IWriteTextResult with info on whether the text fit, and how much width/height was used.
            */
            function writeText(text, width, height, tm, horizontally, write) {
                var orientHorizontally = (horizontally != null) ? horizontally : width * 1.1 > height;
                var primaryDimension = orientHorizontally ? width : height;
                var secondaryDimension = orientHorizontally ? height : width;
                var wrappedText = Util.WordWrap.breakTextToFitRect(text, primaryDimension, secondaryDimension, tm);

                if (wrappedText.lines.length === 0) {
                    return { textFits: wrappedText.textFits, usedWidth: 0, usedHeight: 0 };
                }

                var usedWidth, usedHeight;
                if (write == null) {
                    var widthFn = orientHorizontally ? d3.max : d3.sum;
                    var heightFn = orientHorizontally ? d3.sum : d3.max;
                    usedWidth = widthFn(wrappedText.lines, function (line) {
                        return tm(line).width;
                    });
                    usedHeight = heightFn(wrappedText.lines, function (line) {
                        return tm(line).height;
                    });
                } else {
                    var innerG = write.g.append("g").classed("writeText-inner-g", true);

                    // the outerG contains general transforms for positining the whole block, the inner g
                    // will contain transforms specific to orienting the text properly within the block.
                    var writeTextFn = orientHorizontally ? writeTextHorizontally : writeTextVertically;
                    var wh = writeTextFn(wrappedText.lines, innerG, width, height, write.xAlign, write.yAlign);
                    usedWidth = wh.width;
                    usedHeight = wh.height;
                }

                return { textFits: wrappedText.textFits, usedWidth: usedWidth, usedHeight: usedHeight };
            }
            Text.writeText = writeText;
        })(Util.Text || (Util.Text = {}));
        var Text = Util.Text;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        (function (WordWrap) {
            var LINE_BREAKS_BEFORE = /[{\[]/;
            var LINE_BREAKS_AFTER = /[!"%),-.:;?\]}]/;
            var SPACES = /^\s+$/;

            ;

            /**
            * Takes a block of text, a width and height to fit it in, and a 2-d text measurement function.
            * Wraps words and fits as much of the text as possible into the given width and height.
            */
            function breakTextToFitRect(text, width, height, measureText) {
                var widthMeasure = function (s) {
                    return measureText(s).width;
                };
                var lines = breakTextToFitWidth(text, width, widthMeasure);
                var textHeight = measureText("hello world").height;
                var nLinesThatFit = Math.floor(height / textHeight);
                var textFit = nLinesThatFit >= lines.length;
                if (!textFit) {
                    lines = lines.splice(0, nLinesThatFit);
                    if (nLinesThatFit > 0) {
                        // Overwrite the last line to one that has had a ... appended to the end
                        lines[nLinesThatFit - 1] = Util.Text._addEllipsesToLine(lines[nLinesThatFit - 1], width, measureText);
                    }
                }
                return { originalText: text, lines: lines, textFits: textFit };
            }
            WordWrap.breakTextToFitRect = breakTextToFitRect;

            /**
            * Splits up the text so that it will fit in width (or splits into a list of single characters if it is impossible
            * to fit in width). Tries to avoid breaking words on non-linebreak-or-space characters, and will only break a word if
            * the word is too big to fit within width on its own.
            */
            function breakTextToFitWidth(text, width, widthMeasure) {
                var ret = [];
                var paragraphs = text.split("\n");
                for (var i = 0, len = paragraphs.length; i < len; i++) {
                    var paragraph = paragraphs[i];
                    if (paragraph !== null) {
                        ret = ret.concat(breakParagraphToFitWidth(paragraph, width, widthMeasure));
                    } else {
                        ret.push("");
                    }
                }
                return ret;
            }

            /**
            * Determines if it is possible to fit a given text within width without breaking any of the words.
            * Simple algorithm, split the text up into tokens, and make sure that the widest token doesn't exceed
            * allowed width.
            */
            function canWrapWithoutBreakingWords(text, width, widthMeasure) {
                var tokens = tokenize(text);
                var widths = tokens.map(widthMeasure);
                var maxWidth = d3.max(widths);
                return maxWidth <= width;
            }
            WordWrap.canWrapWithoutBreakingWords = canWrapWithoutBreakingWords;

            /**
            * A paragraph is a string of text containing no newlines.
            * Given a paragraph, break it up into lines that are no
            * wider than width.  widthMeasure is a function that takes
            * text as input, and returns the width of the text in pixels.
            */
            function breakParagraphToFitWidth(text, width, widthMeasure) {
                var lines = [];
                var tokens = tokenize(text);
                var curLine = "";
                var i = 0;
                var nextToken;
                while (nextToken || i < tokens.length) {
                    if (typeof nextToken === "undefined" || nextToken === null) {
                        nextToken = tokens[i++];
                    }
                    var brokenToken = breakNextTokenToFitInWidth(curLine, nextToken, width, widthMeasure);

                    var canAdd = brokenToken[0];
                    var leftOver = brokenToken[1];

                    if (canAdd !== null) {
                        curLine += canAdd;
                    }
                    nextToken = leftOver;
                    if (leftOver) {
                        lines.push(curLine);
                        curLine = "";
                    }
                }
                if (curLine) {
                    lines.push(curLine);
                }
                return lines;
            }

            /**
            * Breaks up the next token and so that some part of it can be
            * added to curLine and fits in the width. the return value
            * is an array with 2 elements, the part that can be added
            * and the left over part of the token
            * widthMeasure is a function that takes text as input,
            * and returns the width of the text in pixels.
            */
            function breakNextTokenToFitInWidth(curLine, nextToken, width, widthMeasure) {
                if (isBlank(nextToken)) {
                    return [nextToken, null];
                }
                if (widthMeasure(curLine + nextToken) <= width) {
                    return [nextToken, null];
                }
                if (!isBlank(curLine)) {
                    return [null, nextToken];
                }
                var i = 0;
                while (i < nextToken.length) {
                    if (widthMeasure(curLine + nextToken[i] + "-") <= width) {
                        curLine += nextToken[i++];
                    } else {
                        break;
                    }
                }
                var append = "-";
                if (isBlank(curLine) && i === 0) {
                    i = 1;
                    append = "";
                }
                return [nextToken.substring(0, i) + append, nextToken.substring(i)];
            }

            /**
            * Breaks up into tokens for word wrapping
            * Each token is comprised of either:
            *  1) Only word and non line break characters
            *  2) Only spaces characters
            *  3) Line break characters such as ":" or ";" or ","
            *  (will be single character token, unless there is a repeated linebreak character)
            */
            function tokenize(text) {
                var ret = [];
                var token = "";
                var lastChar = "";
                for (var i = 0, len = text.length; i < len; i++) {
                    var curChar = text[i];
                    if (token === "" || isTokenizedTogether(token[0], curChar, lastChar)) {
                        token += curChar;
                    } else {
                        ret.push(token);
                        token = curChar;
                    }
                    lastChar = curChar;
                }
                if (token) {
                    ret.push(token);
                }
                return ret;
            }

            /**
            * Returns whether a string is blank.
            *
            * @param {string} str: The string to test for blank-ness
            * @returns {boolean} Whether the string is blank
            */
            function isBlank(text) {
                return text == null ? true : text.trim() === "";
            }

            /**
            * Given a token (ie a string of characters that are similar and shouldn't be broken up) and a character, determine
            * whether that character should be added to the token. Groups of characters that don't match the space or line break
            * regex are always tokenzied together. Spaces are always tokenized together. Line break characters are almost always
            * split into their own token, except that two subsequent identical line break characters are put into the same token.
            * For isTokenizedTogether(":", ",") == False but isTokenizedTogether("::") == True.
            */
            function isTokenizedTogether(text, nextChar, lastChar) {
                if (!(text && nextChar)) {
                    false;
                }
                if (SPACES.test(text) && SPACES.test(nextChar)) {
                    return true;
                } else if (SPACES.test(text) || SPACES.test(nextChar)) {
                    return false;
                }
                if (LINE_BREAKS_AFTER.test(lastChar) || LINE_BREAKS_BEFORE.test(nextChar)) {
                    return false;
                }
                return true;
            }
        })(Util.WordWrap || (Util.WordWrap = {}));
        var WordWrap = Util.WordWrap;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

var Plottable;
(function (Plottable) {
    (function (Util) {
        (function (DOM) {
            /**
            * Gets the bounding box of an element.
            * @param {D3.Selection} element
            * @returns {SVGRed} The bounding box.
            */
            function getBBox(element) {
                return element.node().getBBox();
            }
            DOM.getBBox = getBBox;

            DOM.POLYFILL_TIMEOUT_MSEC = 1000 / 60;
            function requestAnimationFramePolyfill(fn) {
                if (window.requestAnimationFrame != null) {
                    window.requestAnimationFrame(fn);
                } else {
                    setTimeout(fn, DOM.POLYFILL_TIMEOUT_MSEC);
                }
            }
            DOM.requestAnimationFramePolyfill = requestAnimationFramePolyfill;

            function _getParsedStyleValue(style, prop) {
                var value = style.getPropertyValue(prop);
                if (value == null) {
                    return 0;
                }
                return parseFloat(value);
            }

            //
            function isSelectionRemovedFromSVG(selection) {
                var n = selection.node();
                while (n !== null && n.nodeName !== "svg") {
                    n = n.parentNode;
                }
                return (n == null);
            }
            DOM.isSelectionRemovedFromSVG = isSelectionRemovedFromSVG;

            function getElementWidth(elem) {
                var style = window.getComputedStyle(elem);
                return _getParsedStyleValue(style, "width") + _getParsedStyleValue(style, "padding-left") + _getParsedStyleValue(style, "padding-right") + _getParsedStyleValue(style, "border-left-width") + _getParsedStyleValue(style, "border-right-width");
            }
            DOM.getElementWidth = getElementWidth;

            function getElementHeight(elem) {
                var style = window.getComputedStyle(elem);
                return _getParsedStyleValue(style, "height") + _getParsedStyleValue(style, "padding-top") + _getParsedStyleValue(style, "padding-bottom") + _getParsedStyleValue(style, "border-top-width") + _getParsedStyleValue(style, "border-bottom-width");
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
                    } else {
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
                } else {
                    y = (y == null) ? 0 : y;
                    xform.translate[0] = x;
                    xform.translate[1] = y;
                    s.attr("transform", xform.toString());
                    return s;
                }
            }
            DOM.translate = translate;
        })(Util.DOM || (Util.DOM = {}));
        var DOM = Util.DOM;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
})(Plottable || (Plottable = {}));

///<reference path="../../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Abstract) {
        var Formatter = (function () {
            function Formatter(precision) {
                this._onlyShowUnchanged = true;
                this.precision(precision);
            }
            /**
            * Format an input value.
            *
            * @param {any} d The value to be formatted.
            * @returns {string} The formatted value.
            */
            Formatter.prototype.format = function (d) {
                var formattedValue = this._formatFunction(d);
                if (this._onlyShowUnchanged && this._valueChanged(d, formattedValue)) {
                    return "";
                }
                return formattedValue;
            };

            Formatter.prototype._valueChanged = function (d, formattedValue) {
                return d !== parseFloat(formattedValue);
            };

            Formatter.prototype.precision = function (value) {
                if (value === undefined) {
                    return this._precision;
                }
                if (value < 0 || value > 20) {
                    throw new RangeError("Formatter precision must be between 0 and 20");
                }
                this._precision = value;
                return this;
            };

            Formatter.prototype.showOnlyUnchangedValues = function (showUnchanged) {
                if (showUnchanged === undefined) {
                    return this._onlyShowUnchanged;
                }
                this._onlyShowUnchanged = showUnchanged;
                return this;
            };
            return Formatter;
        })();
        Abstract.Formatter = Formatter;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Formatter) {
        var Identity = (function (_super) {
            __extends(Identity, _super);
            /**
            * Creates an formatter that simply stringifies the input.
            *
            * @constructor
            */
            function Identity() {
                _super.call(this, null);
                this.showOnlyUnchangedValues(false);
                this._formatFunction = function (d) {
                    return String(d);
                };
            }
            return Identity;
        })(Plottable.Abstract.Formatter);
        Formatter.Identity = Identity;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var General = (function (_super) {
            __extends(General, _super);
            /**
            * Creates a formatter that formats numbers to show no more than
            * [precision] decimal places. All other values are stringified.
            *
            * @constructor
            * @param {number} [precision] The maximum number of decimal places to display.
            */
            function General(precision) {
                if (typeof precision === "undefined") { precision = 3; }
                _super.call(this, precision);
                this._formatFunction = function (d) {
                    if (typeof d === "number") {
                        var multiplier = Math.pow(10, this._precision);
                        return String(Math.round(d * multiplier) / multiplier);
                    } else {
                        return String(d);
                    }
                };
            }
            General.prototype._valueChanged = function (d, formattedValue) {
                if (typeof d === "number") {
                    return d !== parseFloat(formattedValue);
                } else {
                    return false;
                }
            };
            return General;
        })(Plottable.Abstract.Formatter);
        Formatter.General = General;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var Fixed = (function (_super) {
            __extends(Fixed, _super);
            /**
            * Creates a formatter that displays exactly [precision] decimal places.
            *
            * @constructor
            * @param {number} [precision] The number of decimal places to display.
            */
            function Fixed(precision) {
                if (typeof precision === "undefined") { precision = 3; }
                _super.call(this, precision);
                this._formatFunction = function (d) {
                    return d.toFixed(this._precision);
                };
            }
            return Fixed;
        })(Plottable.Abstract.Formatter);
        Formatter.Fixed = Fixed;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var Currency = (function (_super) {
            __extends(Currency, _super);
            /**
            * Creates a formatter for currency values.
            *
            * @param {number} [precision] The number of decimal places to show.
            * @param {string} [symbol] The currency symbol to use.
            * @param {boolean} [prefix] Whether to prepend or append the currency symbol.
            *
            * @returns {IFormatter} A formatter for currency values.
            */
            function Currency(precision, symbol, prefix) {
                if (typeof precision === "undefined") { precision = 2; }
                if (typeof symbol === "undefined") { symbol = "$"; }
                if (typeof prefix === "undefined") { prefix = true; }
                _super.call(this, precision);
                this.symbol = symbol;
                this.prefix = prefix;
            }
            Currency.prototype.format = function (d) {
                var formattedValue = _super.prototype.format.call(this, Math.abs(d));
                if (formattedValue !== "") {
                    if (this.prefix) {
                        formattedValue = this.symbol + formattedValue;
                    } else {
                        formattedValue += this.symbol;
                    }

                    if (d < 0) {
                        formattedValue = "-" + formattedValue;
                    }
                }
                return formattedValue;
            };
            return Currency;
        })(Formatter.Fixed);
        Formatter.Currency = Currency;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var Percentage = (function (_super) {
            __extends(Percentage, _super);
            /**
            * Creates a formatter for percentage values.
            * Multiplies the supplied value by 100 and appends "%".
            *
            * @constructor
            * @param {number} [precision] The number of decimal places to display.
            */
            function Percentage(precision) {
                if (typeof precision === "undefined") { precision = 0; }
                _super.call(this, precision);
            }
            Percentage.prototype.format = function (d) {
                var formattedValue = _super.prototype.format.call(this, d * 100);
                if (formattedValue !== "") {
                    formattedValue += "%";
                }
                return formattedValue;
            };
            return Percentage;
        })(Formatter.Fixed);
        Formatter.Percentage = Percentage;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var SISuffix = (function (_super) {
            __extends(SISuffix, _super);
            /**
            * Creates a formatter for values that displays [precision] significant figures.
            *
            * @constructor
            * @param {number} [precision] The number of significant figures to display.
            */
            function SISuffix(precision) {
                if (typeof precision === "undefined") { precision = 3; }
                _super.call(this, precision);
                this.showOnlyUnchangedValues(false);
            }
            SISuffix.prototype.precision = function (value) {
                var returnValue = _super.prototype.precision.call(this, value);
                this._formatFunction = d3.format("." + this._precision + "s");
                return returnValue;
            };
            return SISuffix;
        })(Plottable.Abstract.Formatter);
        Formatter.SISuffix = SISuffix;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var Custom = (function (_super) {
            __extends(Custom, _super);
            function Custom(customFormatFunction, precision) {
                if (typeof precision === "undefined") { precision = 0; }
                _super.call(this, precision);
                if (customFormatFunction == null) {
                    throw new Error("Custom Formatters require a formatting function");
                }
                this._onlyShowUnchanged = false;
                this._formatFunction = function (d) {
                    return customFormatFunction(d, this);
                };
            }
            return Custom;
        })(Plottable.Abstract.Formatter);
        Formatter.Custom = Custom;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
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
    (function (Formatter) {
        var Time = (function (_super) {
            __extends(Time, _super);
            /**
            * Creates a formatter that displays dates
            *
            * @constructor
            */
            function Time() {
                _super.call(this, null);

                var numFormats = 8;

                // these defaults were taken from d3
                // https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
                var timeFormat = {};

                timeFormat[0] = {
                    format: ".%L",
                    filter: function (d) {
                        return d.getMilliseconds() !== 0;
                    }
                };
                timeFormat[1] = {
                    format: ":%S",
                    filter: function (d) {
                        return d.getSeconds() !== 0;
                    }
                };
                timeFormat[2] = {
                    format: "%I:%M",
                    filter: function (d) {
                        return d.getMinutes() !== 0;
                    }
                };
                timeFormat[3] = {
                    format: "%I %p",
                    filter: function (d) {
                        return d.getHours() !== 0;
                    }
                };
                timeFormat[4] = {
                    format: "%a %d",
                    filter: function (d) {
                        return d.getDay() !== 0 && d.getDate() !== 1;
                    }
                };
                timeFormat[5] = {
                    format: "%b %d",
                    filter: function (d) {
                        return d.getDate() !== 1;
                    }
                };
                timeFormat[6] = {
                    format: "%b",
                    filter: function (d) {
                        return d.getMonth() !== 0;
                    }
                };
                timeFormat[7] = {
                    format: "%Y",
                    filter: function () {
                        return true;
                    }
                };

                this._formatFunction = function (d) {
                    for (var i = 0; i < numFormats; i++) {
                        if (timeFormat[i].filter(d)) {
                            return d3.time.format(timeFormat[i].format)(d);
                        }
                    }
                };
                this.showOnlyUnchangedValues(false);
            }
            return Time;
        })(Plottable.Abstract.Formatter);
        Formatter.Time = Time;
    })(Plottable.Formatter || (Plottable.Formatter = {}));
    var Formatter = Plottable.Formatter;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    Plottable.version = "0.20.4";
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Abstract) {
        var PlottableObject = (function () {
            function PlottableObject() {
                this._plottableID = PlottableObject.nextID++;
            }
            PlottableObject.nextID = 0;
            return PlottableObject;
        })();
        Abstract.PlottableObject = PlottableObject;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Core) {
        var Broadcaster = (function (_super) {
            __extends(Broadcaster, _super);
            function Broadcaster(listenable) {
                _super.call(this);
                this.listener2Callback = new Plottable.Util.StrictEqualityAssociativeArray();
                this.listenable = listenable;
            }
            /**
            * Registers a callback to be called when the broadcast method is called. Also takes a listener which
            * is used to support deregistering the same callback later, by passing in the same listener.
            * If there is already a callback associated with that listener, then the callback will be replaced.
            *
            * This should NOT be called directly by a Component; registerToBroadcaster should be used instead.
            *
            * @param listener The listener associated with the callback.
            * @param {IBroadcasterCallback} callback A callback to be called when the Scale's domain changes.
            * @returns {Broadcaster} this object
            */
            Broadcaster.prototype.registerListener = function (listener, callback) {
                this.listener2Callback.set(listener, callback);
                return this;
            };

            /**
            * Call all listening callbacks, optionally with arguments passed through.
            *
            * @param ...args A variable number of optional arguments
            * @returns {Broadcaster} this object
            */
            Broadcaster.prototype.broadcast = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.listener2Callback.values().forEach(function (callback) {
                    return callback(_this.listenable, args);
                });
                return this;
            };

            /**
            * Deregisters the callback associated with a listener.
            *
            * @param listener The listener to deregister.
            * @returns {Broadcaster} this object
            */
            Broadcaster.prototype.deregisterListener = function (listener) {
                this.listener2Callback.delete(listener);
                return this;
            };

            /**
            * Deregisters all listeners and callbacks associated with the broadcaster.
            *
            * @returns {Broadcaster} this object
            */
            Broadcaster.prototype.deregisterAllListeners = function () {
                this.listener2Callback = new Plottable.Util.StrictEqualityAssociativeArray();
            };
            return Broadcaster;
        })(Plottable.Abstract.PlottableObject);
        Core.Broadcaster = Broadcaster;
    })(Plottable.Core || (Plottable.Core = {}));
    var Core = Plottable.Core;
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
    var DataSource = (function (_super) {
        __extends(DataSource, _super);
        /**
        * Creates a new DataSource.
        *
        * @constructor
        * @param {any[]} data
        * @param {any} metadata An object containing additional information.
        */
        function DataSource(data, metadata) {
            if (typeof data === "undefined") { data = []; }
            if (typeof metadata === "undefined") { metadata = {}; }
            _super.call(this);
            this.broadcaster = new Plottable.Core.Broadcaster(this);
            this._data = data;
            this._metadata = metadata;
            this.accessor2cachedExtent = new Plottable.Util.StrictEqualityAssociativeArray();
        }
        DataSource.prototype.data = function (data) {
            if (data == null) {
                return this._data;
            } else {
                this._data = data;
                this.accessor2cachedExtent = new Plottable.Util.StrictEqualityAssociativeArray();
                this.broadcaster.broadcast();
                return this;
            }
        };

        DataSource.prototype.metadata = function (metadata) {
            if (metadata == null) {
                return this._metadata;
            } else {
                this._metadata = metadata;
                this.accessor2cachedExtent = new Plottable.Util.StrictEqualityAssociativeArray();
                this.broadcaster.broadcast();
                return this;
            }
        };

        DataSource.prototype._getExtent = function (accessor) {
            var cachedExtent = this.accessor2cachedExtent.get(accessor);
            if (cachedExtent === undefined) {
                cachedExtent = this.computeExtent(accessor);
                this.accessor2cachedExtent.set(accessor, cachedExtent);
            }
            return cachedExtent;
        };

        DataSource.prototype.computeExtent = function (accessor) {
            var appliedAccessor = Plottable.Util.Methods.applyAccessor(accessor, this);
            var mappedData = this._data.map(appliedAccessor);
            if (mappedData.length === 0) {
                return [];
            } else if (typeof (mappedData[0]) === "string") {
                return Plottable.Util.Methods.uniq(mappedData);
            } else {
                var extent = d3.extent(mappedData);
                if (extent[0] == null || extent[1] == null) {
                    return [];
                } else {
                    return extent;
                }
            }
        };
        return DataSource;
    })(Plottable.Abstract.PlottableObject);
    Plottable.DataSource = DataSource;
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
    (function (Abstract) {
        var Component = (function (_super) {
            __extends(Component, _super);
            function Component() {
                _super.apply(this, arguments);
                this.interactionsToRegister = [];
                this.boxes = [];
                this.clipPathEnabled = false;
                this.isTopLevelComponent = false;
                this._xOffset = 0;
                this._yOffset = 0;
                this._xAlignProportion = 0;
                this._yAlignProportion = 0;
                this.cssClasses = ["component"];
                this._isSetup = false;
                this._isAnchored = false;
                this.removed = false;
            }
            /**
            * Attaches the Component as a child of a given a DOM element. Usually only directly invoked on root-level Components.
            *
            * @param {D3.Selection} element A D3 selection consisting of the element to anchor under.
            * @returns {Component} The calling component.
            */
            Component.prototype._anchor = function (element) {
                if (this.removed) {
                    throw new Error("Can't reuse remove()-ed components!");
                }

                if (element.node().nodeName === "svg") {
                    // svg node gets the "plottable" CSS class
                    this.rootSVG = element;
                    this.rootSVG.classed("plottable", true);

                    // visible overflow for firefox https://stackoverflow.com/questions/5926986/why-does-firefox-appear-to-truncate-embedded-svgs
                    this.rootSVG.style("overflow", "visible");
                    this.isTopLevelComponent = true;
                }

                if (this.element != null) {
                    // reattach existing element
                    element.node().appendChild(this.element.node());
                } else {
                    this.element = element.append("g");
                    this._setup();
                }
                this._isAnchored = true;
                return this;
            };

            /**
            * Creates additional elements as necessary for the Component to function.
            * Called during _anchor() if the Component's element has not been created yet.
            * Override in subclasses to provide additional functionality.
            *
            * @returns {Component} The calling Component.
            */
            Component.prototype._setup = function () {
                var _this = this;
                if (this._isSetup) {
                    return;
                }
                this.cssClasses.forEach(function (cssClass) {
                    _this.element.classed(cssClass, true);
                });
                this.cssClasses = null;

                this.backgroundContainer = this.element.append("g").classed("background-container", true);
                this.content = this.element.append("g").classed("content", true);
                this.foregroundContainer = this.element.append("g").classed("foreground-container", true);
                this.boxContainer = this.element.append("g").classed("box-container", true);

                if (this.clipPathEnabled) {
                    this.generateClipPath();
                }
                ;

                this.addBox("bounding-box");

                this.interactionsToRegister.forEach(function (r) {
                    return _this.registerInteraction(r);
                });
                this.interactionsToRegister = null;
                if (this.isTopLevelComponent) {
                    this.autoResize(Component.AUTORESIZE_BY_DEFAULT);
                }
                this._isSetup = true;
                return this;
            };

            Component.prototype._requestedSpace = function (availableWidth, availableHeight) {
                return { width: 0, height: 0, wantsWidth: false, wantsHeight: false };
            };

            /**
            * Computes the size, position, and alignment from the specified values.
            * If no parameters are supplied and the component is a root node,
            * they are inferred from the size of the component's element.
            *
            * @param {number} xOrigin
            * @param {number} yOrigin
            * @param {number} availableWidth
            * @param {number} availableHeight
            * @returns {Component} The calling Component.
            */
            Component.prototype._computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
                var _this = this;
                if (xOrigin == null || yOrigin == null || availableWidth == null || availableHeight == null) {
                    if (this.element == null) {
                        throw new Error("anchor must be called before computeLayout");
                    } else if (this.isTopLevelComponent) {
                        // we are the root node, retrieve height/width from root SVG
                        xOrigin = 0;
                        yOrigin = 0;

                        // Set width/height to 100% if not specified, to allow accurate size calculation
                        // see http://www.w3.org/TR/CSS21/visudet.html#block-replaced-width
                        // and http://www.w3.org/TR/CSS21/visudet.html#inline-replaced-height
                        if (this.rootSVG.attr("width") == null) {
                            this.rootSVG.attr("width", "100%");
                        }
                        if (this.rootSVG.attr("height") == null) {
                            this.rootSVG.attr("height", "100%");
                        }

                        var elem = this.rootSVG.node();
                        availableWidth = Plottable.Util.DOM.getElementWidth(elem);
                        availableHeight = Plottable.Util.DOM.getElementHeight(elem);
                    } else {
                        throw new Error("null arguments cannot be passed to _computeLayout() on a non-root node");
                    }
                }
                this.xOrigin = xOrigin;
                this.yOrigin = yOrigin;
                var xPosition = this.xOrigin;
                var yPosition = this.yOrigin;

                var requestedSpace = this._requestedSpace(availableWidth, availableHeight);

                xPosition += (availableWidth - requestedSpace.width) * this._xAlignProportion;
                xPosition += this._xOffset;
                if (this._isFixedWidth()) {
                    // Decrease size so hitbox / bounding box and children are sized correctly
                    availableWidth = Math.min(availableWidth, requestedSpace.width);
                }

                yPosition += (availableHeight - requestedSpace.height) * this._yAlignProportion;
                yPosition += this._yOffset;
                if (this._isFixedHeight()) {
                    availableHeight = Math.min(availableHeight, requestedSpace.height);
                }

                this.availableWidth = availableWidth;
                this.availableHeight = availableHeight;
                this.element.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                this.boxes.forEach(function (b) {
                    return b.attr("width", _this.availableWidth).attr("height", _this.availableHeight);
                });
                return this;
            };

            /**
            * Renders the component.
            *
            * @returns {Component} The calling Component.
            */
            Component.prototype._render = function () {
                if (this._isAnchored && this._isSetup) {
                    Plottable.Core.RenderController.registerToRender(this);
                }
                return this;
            };

            Component.prototype._scheduleComputeLayout = function () {
                if (this._isAnchored && this._isSetup) {
                    Plottable.Core.RenderController.registerToComputeLayout(this);
                }
                return this;
            };

            Component.prototype._doRender = function () {
                return this;
            };

            Component.prototype._invalidateLayout = function () {
                if (this._isAnchored && this._isSetup) {
                    if (this.isTopLevelComponent) {
                        this._scheduleComputeLayout();
                    } else {
                        this._parent._invalidateLayout();
                    }
                }
            };

            /**
            * Renders the Component into a given DOM element.
            *
            * @param {String|D3.Selection} element A D3 selection or a selector for getting the element to render into.
            * @return {Component} The calling component.
            */
            Component.prototype.renderTo = function (element) {
                if (element != null) {
                    var selection;
                    if (typeof (element.node) === "function") {
                        selection = element;
                    } else {
                        selection = d3.select(element);
                    }
                    this._anchor(selection);
                }
                this._computeLayout()._render();
                return this;
            };

            /**
            * Cause the Component to recompute layout and redraw. If passed arguments, will resize the root SVG it lives in.
            *
            * @param {number} [availableWidth]  - the width of the container element
            * @param {number} [availableHeight] - the height of the container element
            */
            Component.prototype.resize = function (width, height) {
                if (!this.isTopLevelComponent) {
                    throw new Error("Cannot resize on non top-level component");
                }
                if (width != null && height != null && this._isAnchored) {
                    this.rootSVG.attr({ width: width, height: height });
                }
                this._invalidateLayout();
                return this;
            };

            /**
            * Enables and disables auto-resize.
            *
            * If enabled, window resizes will enqueue this component for a re-layout
            * and re-render. Animations are disabled during window resizes when auto-
            * resize is enabled.
            *
            * @param {boolean} flag - Enables (true) or disables (false) auto-resize.
            */
            Component.prototype.autoResize = function (flag) {
                if (flag) {
                    Plottable.Core.ResizeBroadcaster.register(this);
                } else {
                    Plottable.Core.ResizeBroadcaster.deregister(this);
                }
                return this;
            };

            /**
            * Sets the x alignment of the Component.
            *
            * @param {string} alignment The x alignment of the Component (one of LEFT/CENTER/RIGHT).
            * @returns {Component} The calling Component.
            */
            Component.prototype.xAlign = function (alignment) {
                alignment = alignment.toLowerCase();
                if (alignment === "left") {
                    this._xAlignProportion = 0;
                } else if (alignment === "center") {
                    this._xAlignProportion = 0.5;
                } else if (alignment === "right") {
                    this._xAlignProportion = 1;
                } else {
                    throw new Error("Unsupported alignment");
                }
                this._invalidateLayout();
                return this;
            };

            /**
            * Sets the y alignment of the Component.
            *
            * @param {string} alignment The y alignment of the Component (one of TOP/CENTER/BOTTOM).
            * @returns {Component} The calling Component.
            */
            Component.prototype.yAlign = function (alignment) {
                alignment = alignment.toLowerCase();
                if (alignment === "top") {
                    this._yAlignProportion = 0;
                } else if (alignment === "center") {
                    this._yAlignProportion = 0.5;
                } else if (alignment === "bottom") {
                    this._yAlignProportion = 1;
                } else {
                    throw new Error("Unsupported alignment");
                }
                this._invalidateLayout();
                return this;
            };

            /**
            * Sets the x offset of the Component.
            *
            * @param {number} offset The desired x offset, in pixels.
            * @returns {Component} The calling Component.
            */
            Component.prototype.xOffset = function (offset) {
                this._xOffset = offset;
                this._invalidateLayout();
                return this;
            };

            /**
            * Sets the y offset of the Component.
            *
            * @param {number} offset The desired y offset, in pixels.
            * @returns {Component} The calling Component.
            */
            Component.prototype.yOffset = function (offset) {
                this._yOffset = offset;
                this._invalidateLayout();
                return this;
            };

            Component.prototype.addBox = function (className, parentElement) {
                if (this.element == null) {
                    throw new Error("Adding boxes before anchoring is currently disallowed");
                }
                var parentElement = parentElement == null ? this.boxContainer : parentElement;
                var box = parentElement.append("rect");
                if (className != null) {
                    box.classed(className, true);
                }
                ;
                this.boxes.push(box);
                if (this.availableWidth != null && this.availableHeight != null) {
                    box.attr("width", this.availableWidth).attr("height", this.availableHeight);
                }
                return box;
            };

            Component.prototype.generateClipPath = function () {
                // The clip path will prevent content from overflowing its component space.
                this.element.attr("clip-path", "url(#clipPath" + this._plottableID + ")");
                var clipPathParent = this.boxContainer.append("clipPath").attr("id", "clipPath" + this._plottableID);
                this.addBox("clip-rect", clipPathParent);
            };

            /**
            * Attaches an Interaction to the Component, so that the Interaction will listen for events on the Component.
            *
            * @param {Interaction} interaction The Interaction to attach to the Component.
            * @return {Component} The calling Component.
            */
            Component.prototype.registerInteraction = function (interaction) {
                // Interactions can be registered before or after anchoring. If registered before, they are
                // pushed to this.interactionsToRegister and registered during anchoring. If after, they are
                // registered immediately
                if (this.element != null) {
                    if (this.hitBox == null) {
                        this.hitBox = this.addBox("hit-box");
                        this.hitBox.style("fill", "#ffffff").style("opacity", 0); // We need to set these so Chrome will register events
                    }
                    interaction._anchor(this.hitBox);
                } else {
                    this.interactionsToRegister.push(interaction);
                }
                return this;
            };

            Component.prototype.classed = function (cssClass, addClass) {
                if (addClass == null) {
                    if (cssClass == null) {
                        return false;
                    } else if (this.element == null) {
                        return (this.cssClasses.indexOf(cssClass) !== -1);
                    } else {
                        return this.element.classed(cssClass);
                    }
                } else {
                    if (cssClass == null) {
                        return this;
                    }
                    if (this.element == null) {
                        var classIndex = this.cssClasses.indexOf(cssClass);
                        if (addClass && classIndex === -1) {
                            this.cssClasses.push(cssClass);
                        } else if (!addClass && classIndex !== -1) {
                            this.cssClasses.splice(classIndex, 1);
                        }
                    } else {
                        this.element.classed(cssClass, addClass);
                    }
                    return this;
                }
            };

            /**
            * Checks if the Component has a fixed width or false if it grows to fill available space.
            * Returns false by default on the base Component class.
            *
            * @return {boolean} Whether the component has a fixed width.
            */
            Component.prototype._isFixedWidth = function () {
                // If you are given -1 pixels and you're happy, clearly you are not fixed size. If you want more, then there is
                // some fixed size you aspire to.
                // Putting 0 doesn't work because sometimes a fixed-size component will still have dimension 0
                // For example a label with an empty string.
                return this._requestedSpace(-1, -1).wantsWidth;
            };

            /**
            * Checks if the Component has a fixed height or false if it grows to fill available space.
            * Returns false by default on the base Component class.
            *
            * @return {boolean} Whether the component has a fixed height.
            */
            Component.prototype._isFixedHeight = function () {
                return this._requestedSpace(-1, -1).wantsHeight;
            };

            /**
            * Merges this Component with another Component, returning a ComponentGroup.
            * There are four cases:
            * Component + Component: Returns a ComponentGroup with both components inside it.
            * ComponentGroup + Component: Returns the ComponentGroup with the Component appended.
            * Component + ComponentGroup: Returns the ComponentGroup with the Component prepended.
            * ComponentGroup + ComponentGroup: Returns a new ComponentGroup with two ComponentGroups inside it.
            *
            * @param {Component} c The component to merge in.
            * @return {ComponentGroup}
            */
            Component.prototype.merge = function (c) {
                var cg;
                if (this._isSetup || this._isAnchored) {
                    throw new Error("Can't presently merge a component that's already been anchored");
                }
                if (Plottable.Component.Group.prototype.isPrototypeOf(c)) {
                    cg = c;
                    cg._addComponent(this, true);
                    return cg;
                } else {
                    cg = new Plottable.Component.Group([this, c]);
                    return cg;
                }
            };

            /**
            * Detaches a Component from the DOM. The component can be reused.
            *
            * @returns The calling Component.
            */
            Component.prototype.detach = function () {
                if (this._isAnchored) {
                    this.element.remove();
                }
                if (this._parent != null) {
                    this._parent._removeComponent(this);
                }
                this._isAnchored = false;
                this._parent = null;
                return this;
            };

            /**
            * Removes a Component from the DOM and disconnects it from everything it's
            * listening to (effectively destroying it).
            */
            Component.prototype.remove = function () {
                this.removed = true;
                this.detach();
                Plottable.Core.ResizeBroadcaster.deregister(this);
            };
            Component.AUTORESIZE_BY_DEFAULT = true;
            return Component;
        })(Abstract.PlottableObject);
        Abstract.Component = Component;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Abstract) {
        var ComponentContainer = (function (_super) {
            __extends(ComponentContainer, _super);
            function ComponentContainer() {
                _super.apply(this, arguments);
                /*
                * An abstract ComponentContainer class to encapsulate Table and ComponentGroup's shared functionality.
                * It will not do anything if instantiated directly.
                */
                this._components = [];
            }
            ComponentContainer.prototype._anchor = function (element) {
                var _this = this;
                _super.prototype._anchor.call(this, element);
                this._components.forEach(function (c) {
                    return c._anchor(_this.content);
                });
                return this;
            };

            ComponentContainer.prototype._render = function () {
                this._components.forEach(function (c) {
                    return c._render();
                });
                return this;
            };

            ComponentContainer.prototype._removeComponent = function (c) {
                var removeIndex = this._components.indexOf(c);
                if (removeIndex >= 0) {
                    this._components.splice(removeIndex, 1);
                    this._invalidateLayout();
                }
                return this;
            };

            ComponentContainer.prototype._addComponent = function (c, prepend) {
                if (typeof prepend === "undefined") { prepend = false; }
                if (c == null || this._components.indexOf(c) >= 0) {
                    return false;
                }

                if (prepend) {
                    this._components.unshift(c);
                } else {
                    this._components.push(c);
                }
                c._parent = this;
                if (this._isAnchored) {
                    c._anchor(this.content);
                }
                this._invalidateLayout();
                return true;
            };

            /**
            * Returns a list of components in the ComponentContainer
            *
            * @returns{Component[]} the contained Components
            */
            ComponentContainer.prototype.components = function () {
                return this._components.slice();
            };

            /**
            * Returns true iff the ComponentContainer is empty.
            *
            * @returns {boolean} Whether the calling ComponentContainer is empty.
            */
            ComponentContainer.prototype.empty = function () {
                return this._components.length === 0;
            };

            /**
            * Detaches all components contained in the ComponentContainer, and
            * empties the ComponentContainer.
            *
            * @returns {ComponentContainer} The calling ComponentContainer
            */
            ComponentContainer.prototype.detachAll = function () {
                // Calling c.remove() will mutate this._components because the component will call this._parent._removeComponent(this)
                // Since mutating an array while iterating over it is dangerous, we instead iterate over a copy generated by Arr.slice()
                this._components.slice().forEach(function (c) {
                    return c.detach();
                });
                return this;
            };

            ComponentContainer.prototype.remove = function () {
                _super.prototype.remove.call(this);
                this._components.slice().forEach(function (c) {
                    return c.remove();
                });
            };
            return ComponentContainer;
        })(Abstract.Component);
        Abstract.ComponentContainer = ComponentContainer;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Component) {
        var Group = (function (_super) {
            __extends(Group, _super);
            /**
            * Creates a ComponentGroup.
            *
            * @constructor
            * @param {Component[]} [components] The Components in the Group.
            */
            function Group(components) {
                if (typeof components === "undefined") { components = []; }
                var _this = this;
                _super.call(this);
                this.classed("component-group", true);
                components.forEach(function (c) {
                    return _this._addComponent(c);
                });
            }
            Group.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var requests = this._components.map(function (c) {
                    return c._requestedSpace(offeredWidth, offeredHeight);
                });
                var isEmpty = this.empty();
                var desiredWidth = isEmpty ? 0 : d3.max(requests, function (l) {
                    return l.width;
                });
                var desiredHeight = isEmpty ? 0 : d3.max(requests, function (l) {
                    return l.height;
                });
                return {
                    width: Math.min(desiredWidth, offeredWidth),
                    height: Math.min(desiredHeight, offeredHeight),
                    wantsWidth: isEmpty ? false : requests.map(function (r) {
                        return r.wantsWidth;
                    }).some(function (x) {
                        return x;
                    }),
                    wantsHeight: isEmpty ? false : requests.map(function (r) {
                        return r.wantsHeight;
                    }).some(function (x) {
                        return x;
                    })
                };
            };

            Group.prototype.merge = function (c) {
                this._addComponent(c);
                return this;
            };

            Group.prototype._computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
                var _this = this;
                _super.prototype._computeLayout.call(this, xOrigin, yOrigin, availableWidth, availableHeight);
                this._components.forEach(function (c) {
                    c._computeLayout(0, 0, _this.availableWidth, _this.availableHeight);
                });
                return this;
            };

            Group.prototype._isFixedWidth = function () {
                return this._components.every(function (c) {
                    return c._isFixedWidth();
                });
            };

            Group.prototype._isFixedHeight = function () {
                return this._components.every(function (c) {
                    return c._isFixedHeight();
                });
            };
            return Group;
        })(Plottable.Abstract.ComponentContainer);
        Component.Group = Group;
    })(Plottable.Component || (Plottable.Component = {}));
    var Component = Plottable.Component;
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
    (function (Component) {
        ;

        var Table = (function (_super) {
            __extends(Table, _super);
            /**
            * Creates a Table.
            *
            * @constructor
            * @param {Component[][]} [rows] A 2-D array of the Components to place in the table.
            * null can be used if a cell is empty.
            */
            function Table(rows) {
                if (typeof rows === "undefined") { rows = []; }
                var _this = this;
                _super.call(this);
                this.rowPadding = 0;
                this.colPadding = 0;
                this.rows = [];
                this.rowWeights = [];
                this.colWeights = [];
                this.nRows = 0;
                this.nCols = 0;
                this.classed("table", true);
                rows.forEach(function (row, rowIndex) {
                    row.forEach(function (component, colIndex) {
                        _this.addComponent(rowIndex, colIndex, component);
                    });
                });
            }
            /**
            * Adds a Component in the specified cell.
            *
            * @param {number} row The row in which to add the Component.
            * @param {number} col The column in which to add the Component.
            * @param {Component} component The Component to be added.
            */
            Table.prototype.addComponent = function (row, col, component) {
                if (this._addComponent(component)) {
                    this.nRows = Math.max(row + 1, this.nRows);
                    this.nCols = Math.max(col + 1, this.nCols);
                    this.padTableToSize(this.nRows, this.nCols);

                    var currentComponent = this.rows[row][col];
                    if (currentComponent != null) {
                        throw new Error("Table.addComponent cannot be called on a cell where a component already exists (for the moment)");
                    }

                    this.rows[row][col] = component;
                }
                return this;
            };

            Table.prototype._removeComponent = function (component) {
                _super.prototype._removeComponent.call(this, component);
                var rowpos;
                var colpos;
                outer:
                for (var i = 0; i < this.nRows; i++) {
                    for (var j = 0; j < this.nCols; j++) {
                        if (this.rows[i][j] === component) {
                            rowpos = i;
                            colpos = j;
                            break outer;
                        }
                    }
                }

                if (rowpos === undefined) {
                    return this;
                }

                this.rows[rowpos][colpos] = null;

                return this;
            };

            Table.prototype.iterateLayout = function (availableWidth, availableHeight) {
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
                var cols = d3.transpose(this.rows);
                var availableWidthAfterPadding = availableWidth - this.colPadding * (this.nCols - 1);
                var availableHeightAfterPadding = availableHeight - this.rowPadding * (this.nRows - 1);

                var rowWeights = Table.calcComponentWeights(this.rowWeights, this.rows, function (c) {
                    return (c == null) || c._isFixedHeight();
                });
                var colWeights = Table.calcComponentWeights(this.colWeights, cols, function (c) {
                    return (c == null) || c._isFixedWidth();
                });

                // To give the table a good starting position to iterate from, we give the fixed-width components half-weight
                // so that they will get some initial space allocated to work with
                var heuristicColWeights = colWeights.map(function (c) {
                    return c === 0 ? 0.5 : c;
                });
                var heuristicRowWeights = rowWeights.map(function (c) {
                    return c === 0 ? 0.5 : c;
                });

                var colProportionalSpace = Table.calcProportionalSpace(heuristicColWeights, availableWidthAfterPadding);
                var rowProportionalSpace = Table.calcProportionalSpace(heuristicRowWeights, availableHeightAfterPadding);

                var guaranteedWidths = Plottable.Util.Methods.createFilledArray(0, this.nCols);
                var guaranteedHeights = Plottable.Util.Methods.createFilledArray(0, this.nRows);

                var freeWidth;
                var freeHeight;

                var nIterations = 0;
                while (true) {
                    var offeredHeights = Plottable.Util.Methods.addArrays(guaranteedHeights, rowProportionalSpace);
                    var offeredWidths = Plottable.Util.Methods.addArrays(guaranteedWidths, colProportionalSpace);
                    var guarantees = this.determineGuarantees(offeredWidths, offeredHeights);
                    guaranteedWidths = guarantees.guaranteedWidths;
                    guaranteedHeights = guarantees.guaranteedHeights;
                    var wantsWidth = guarantees.wantsWidthArr.some(function (x) {
                        return x;
                    });
                    var wantsHeight = guarantees.wantsHeightArr.some(function (x) {
                        return x;
                    });

                    var lastFreeWidth = freeWidth;
                    var lastFreeHeight = freeHeight;
                    freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
                    freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
                    var xWeights;
                    if (wantsWidth) {
                        xWeights = guarantees.wantsWidthArr.map(function (x) {
                            return x ? 0.1 : 0;
                        });
                        xWeights = Plottable.Util.Methods.addArrays(xWeights, colWeights);
                    } else {
                        xWeights = colWeights;
                    }

                    var yWeights;
                    if (wantsHeight) {
                        yWeights = guarantees.wantsHeightArr.map(function (x) {
                            return x ? 0.1 : 0;
                        });
                        yWeights = Plottable.Util.Methods.addArrays(yWeights, rowWeights);
                    } else {
                        yWeights = rowWeights;
                    }

                    colProportionalSpace = Table.calcProportionalSpace(xWeights, freeWidth);
                    rowProportionalSpace = Table.calcProportionalSpace(yWeights, freeHeight);
                    nIterations++;

                    var canImproveWidthAllocation = freeWidth > 0 && wantsWidth && freeWidth !== lastFreeWidth;
                    var canImproveHeightAllocation = freeHeight > 0 && wantsHeight && freeHeight !== lastFreeHeight;

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
                colProportionalSpace = Table.calcProportionalSpace(colWeights, freeWidth);
                rowProportionalSpace = Table.calcProportionalSpace(rowWeights, freeHeight);

                return {
                    colProportionalSpace: colProportionalSpace,
                    rowProportionalSpace: rowProportionalSpace,
                    guaranteedWidths: guarantees.guaranteedWidths,
                    guaranteedHeights: guarantees.guaranteedHeights,
                    wantsWidth: wantsWidth,
                    wantsHeight: wantsHeight };
            };

            Table.prototype.determineGuarantees = function (offeredWidths, offeredHeights) {
                var requestedWidths = Plottable.Util.Methods.createFilledArray(0, this.nCols);
                var requestedHeights = Plottable.Util.Methods.createFilledArray(0, this.nRows);
                var layoutWantsWidth = Plottable.Util.Methods.createFilledArray(false, this.nCols);
                var layoutWantsHeight = Plottable.Util.Methods.createFilledArray(false, this.nRows);
                this.rows.forEach(function (row, rowIndex) {
                    row.forEach(function (component, colIndex) {
                        var spaceRequest;
                        if (component != null) {
                            spaceRequest = component._requestedSpace(offeredWidths[colIndex], offeredHeights[rowIndex]);
                        } else {
                            spaceRequest = { width: 0, height: 0, wantsWidth: false, wantsHeight: false };
                        }

                        var epsilon = 0.001;
                        var epsilonGT = function (a, b) {
                            return a - b - epsilon > 0;
                        };

                        if (epsilonGT(spaceRequest.width, offeredWidths[colIndex]) || epsilonGT(spaceRequest.height, offeredHeights[rowIndex])) {
                            console.log("Invariant Violation: Abstract.Component cannot request more space than is offered");
                        }

                        requestedWidths[colIndex] = Math.max(requestedWidths[colIndex], spaceRequest.width);
                        requestedHeights[rowIndex] = Math.max(requestedHeights[rowIndex], spaceRequest.height);
                        layoutWantsWidth[colIndex] = layoutWantsWidth[colIndex] || spaceRequest.wantsWidth;
                        layoutWantsHeight[rowIndex] = layoutWantsHeight[rowIndex] || spaceRequest.wantsHeight;
                    });
                });
                return {
                    guaranteedWidths: requestedWidths,
                    guaranteedHeights: requestedHeights,
                    wantsWidthArr: layoutWantsWidth,
                    wantsHeightArr: layoutWantsHeight };
            };

            Table.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var layout = this.iterateLayout(offeredWidth, offeredHeight);
                return {
                    width: d3.sum(layout.guaranteedWidths),
                    height: d3.sum(layout.guaranteedHeights),
                    wantsWidth: layout.wantsWidth,
                    wantsHeight: layout.wantsHeight };
            };

            // xOffset is relative to parent element, not absolute
            Table.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
                var _this = this;
                _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
                var layout = this.iterateLayout(this.availableWidth, this.availableHeight);

                var sumPair = function (p) {
                    return p[0] + p[1];
                };
                var rowHeights = Plottable.Util.Methods.addArrays(layout.rowProportionalSpace, layout.guaranteedHeights);
                var colWidths = Plottable.Util.Methods.addArrays(layout.colProportionalSpace, layout.guaranteedWidths);
                var childYOffset = 0;
                this.rows.forEach(function (row, rowIndex) {
                    var childXOffset = 0;
                    row.forEach(function (component, colIndex) {
                        // recursively compute layout
                        if (component != null) {
                            component._computeLayout(childXOffset, childYOffset, colWidths[colIndex], rowHeights[rowIndex]);
                        }
                        childXOffset += colWidths[colIndex] + _this.colPadding;
                    });
                    childYOffset += rowHeights[rowIndex] + _this.rowPadding;
                });
                return this;
            };

            /**
            * Sets the row and column padding on the Table.
            *
            * @param {number} rowPadding The padding above and below each row, in pixels.
            * @param {number} colPadding the padding to the left and right of each column, in pixels.
            * @returns {Table} The calling Table.
            */
            Table.prototype.padding = function (rowPadding, colPadding) {
                this.rowPadding = rowPadding;
                this.colPadding = colPadding;
                this._invalidateLayout();
                return this;
            };

            /**
            * Sets the layout weight of a particular row.
            * Space is allocated to rows based on their weight. Rows with higher weights receive proportionally more space.
            *
            * @param {number} index The index of the row.
            * @param {number} weight The weight to be set on the row.
            * @returns {Table} The calling Table.
            */
            Table.prototype.rowWeight = function (index, weight) {
                this.rowWeights[index] = weight;
                this._invalidateLayout();
                return this;
            };

            /**
            * Sets the layout weight of a particular column.
            * Space is allocated to columns based on their weight. Columns with higher weights receive proportionally more space.
            *
            * @param {number} index The index of the column.
            * @param {number} weight The weight to be set on the column.
            * @returns {Table} The calling Table.
            */
            Table.prototype.colWeight = function (index, weight) {
                this.colWeights[index] = weight;
                this._invalidateLayout();
                return this;
            };

            Table.prototype._isFixedWidth = function () {
                var cols = d3.transpose(this.rows);
                return Table.fixedSpace(cols, function (c) {
                    return (c == null) || c._isFixedWidth();
                });
            };

            Table.prototype._isFixedHeight = function () {
                return Table.fixedSpace(this.rows, function (c) {
                    return (c == null) || c._isFixedHeight();
                });
            };

            Table.prototype.padTableToSize = function (nRows, nCols) {
                for (var i = 0; i < nRows; i++) {
                    if (this.rows[i] === undefined) {
                        this.rows[i] = [];
                        this.rowWeights[i] = null;
                    }
                    for (var j = 0; j < nCols; j++) {
                        if (this.rows[i][j] === undefined) {
                            this.rows[i][j] = null;
                        }
                    }
                }
                for (j = 0; j < nCols; j++) {
                    if (this.colWeights[j] === undefined) {
                        this.colWeights[j] = null;
                    }
                }
            };

            Table.calcComponentWeights = function (setWeights, componentGroups, fixityAccessor) {
                // If the row/col weight was explicitly set, then return it outright
                // If the weight was not explicitly set, then guess it using the heuristic that if all components are fixed-space
                // then weight is 0, otherwise weight is 1
                return setWeights.map(function (w, i) {
                    if (w != null) {
                        return w;
                    }
                    var fixities = componentGroups[i].map(fixityAccessor);
                    var allFixed = fixities.reduce(function (a, b) {
                        return a && b;
                    }, true);
                    return allFixed ? 0 : 1;
                });
            };

            Table.calcProportionalSpace = function (weights, freeSpace) {
                var weightSum = d3.sum(weights);
                if (weightSum === 0) {
                    return Plottable.Util.Methods.createFilledArray(0, weights.length);
                } else {
                    return weights.map(function (w) {
                        return freeSpace * w / weightSum;
                    });
                }
            };

            Table.fixedSpace = function (componentGroup, fixityAccessor) {
                var all = function (bools) {
                    return bools.reduce(function (a, b) {
                        return a && b;
                    }, true);
                };
                var group_isFixed = function (components) {
                    return all(components.map(fixityAccessor));
                };
                return all(componentGroup.map(group_isFixed));
            };
            return Table;
        })(Plottable.Abstract.ComponentContainer);
        Component.Table = Table;
    })(Plottable.Component || (Plottable.Component = {}));
    var Component = Plottable.Component;
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
    (function (Abstract) {
        var Scale = (function (_super) {
            __extends(Scale, _super);
            /**
            * Creates a new Scale.
            *
            * @constructor
            * @param {D3.Scale.Scale} scale The D3 scale backing the Scale.
            */
            function Scale(scale) {
                _super.call(this);
                this.autoDomainAutomatically = true;
                this.broadcaster = new Plottable.Core.Broadcaster(this);
                this._rendererAttrID2Extent = {};
                this._d3Scale = scale;
            }
            Scale.prototype._getAllExtents = function () {
                return d3.values(this._rendererAttrID2Extent);
            };

            Scale.prototype._getExtent = function () {
                return [];
            };

            /**
            * Modify the domain on the scale so that it includes the extent of all
            * perspectives it depends on. Extent: The (min, max) pair for a
            * QuantitiativeScale, all covered strings for an OrdinalScale.
            * Perspective: A combination of a DataSource and an Accessor that
            * represents a view in to the data.
            */
            Scale.prototype.autoDomain = function () {
                this.autoDomainAutomatically = true;
                this._setDomain(this._getExtent());
                return this;
            };

            Scale.prototype._autoDomainIfAutomaticMode = function () {
                if (this.autoDomainAutomatically) {
                    this.autoDomain();
                }
            };

            /**
            * Returns the range value corresponding to a given domain value.
            *
            * @param value {any} A domain value to be scaled.
            * @returns {any} The range value corresponding to the supplied domain value.
            */
            Scale.prototype.scale = function (value) {
                return this._d3Scale(value);
            };

            Scale.prototype.domain = function (values) {
                if (values == null) {
                    return this._d3Scale.domain();
                } else {
                    this.autoDomainAutomatically = false;
                    this._setDomain(values);
                    return this;
                }
            };

            Scale.prototype._setDomain = function (values) {
                this._d3Scale.domain(values);
                this.broadcaster.broadcast();
            };

            Scale.prototype.range = function (values) {
                if (values == null) {
                    return this._d3Scale.range();
                } else {
                    this._d3Scale.range(values);
                    return this;
                }
            };

            /**
            * Creates a copy of the Scale with the same domain and range but without any registered listeners.
            *
            * @returns {Scale} A copy of the calling Scale.
            */
            Scale.prototype.copy = function () {
                return new Scale(this._d3Scale.copy());
            };

            /**
            * When a renderer determines that the extent of a projector has changed,
            * it will call this function. This function should ensure that
            * the scale has a domain at least large enough to include extent.
            *
            * @param {number} rendererID A unique indentifier of the renderer sending
            *                 the new extent.
            * @param {string} attr The attribute being projected, e.g. "x", "y0", "r"
            * @param {any[]} extent The new extent to be included in the scale.
            */
            Scale.prototype.updateExtent = function (rendererID, attr, extent) {
                this._rendererAttrID2Extent[rendererID + attr] = extent;
                this._autoDomainIfAutomaticMode();
                return this;
            };

            Scale.prototype.removeExtent = function (rendererID, attr) {
                delete this._rendererAttrID2Extent[rendererID + attr];
                this._autoDomainIfAutomaticMode();
                return this;
            };
            return Scale;
        })(Abstract.PlottableObject);
        Abstract.Scale = Scale;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Abstract) {
        var Plot = (function (_super) {
            __extends(Plot, _super);
            function Plot(dataset) {
                _super.call(this);
                this._dataChanged = false;
                this._animate = false;
                this._animators = {};
                this._ANIMATION_DURATION = 250;
                this._projectors = {};
                this.animateOnNextRender = true;
                this.clipPathEnabled = true;
                this.classed("renderer", true);

                var dataSource;
                if (dataset != null) {
                    if (typeof dataset.data === "function") {
                        dataSource = dataset;
                    } else {
                        dataSource = dataSource = new Plottable.DataSource(dataset);
                    }
                } else {
                    dataSource = new Plottable.DataSource();
                }
                this.dataSource(dataSource);
            }
            Plot.prototype._anchor = function (element) {
                _super.prototype._anchor.call(this, element);
                this.animateOnNextRender = true;
                this._dataChanged = true;
                this.updateAllProjectors();
                return this;
            };

            Plot.prototype.remove = function () {
                var _this = this;
                _super.prototype.remove.call(this);
                this._dataSource.broadcaster.deregisterListener(this);

                // deregister from all scales
                var properties = Object.keys(this._projectors);
                properties.forEach(function (property) {
                    var projector = _this._projectors[property];
                    if (projector.scale != null) {
                        projector.scale.broadcaster.deregisterListener(_this);
                    }
                });
            };

            Plot.prototype.dataSource = function (source) {
                var _this = this;
                if (source == null) {
                    return this._dataSource;
                }
                var oldSource = this._dataSource;
                if (oldSource != null) {
                    this._dataSource.broadcaster.deregisterListener(this);
                }
                this._dataSource = source;
                this._dataSource.broadcaster.registerListener(this, function () {
                    return _this._onDataSourceUpdate();
                });
                this._onDataSourceUpdate();
                return this;
            };

            Plot.prototype._onDataSourceUpdate = function () {
                this.updateAllProjectors();
                this.animateOnNextRender = true;
                this._dataChanged = true;
                this._render();
            };

            Plot.prototype.project = function (attrToSet, accessor, scale) {
                var _this = this;
                attrToSet = attrToSet.toLowerCase();
                var currentProjection = this._projectors[attrToSet];
                var existingScale = (currentProjection != null) ? currentProjection.scale : null;

                if (existingScale != null) {
                    existingScale.removeExtent(this._plottableID, attrToSet);
                    existingScale.broadcaster.deregisterListener(this);
                }

                if (scale != null) {
                    scale.broadcaster.registerListener(this, function () {
                        return _this._render();
                    });
                }

                this._projectors[attrToSet] = { accessor: accessor, scale: scale };
                this.updateProjector(attrToSet);
                this._render(); // queue a re-render upon changing projector
                return this;
            };

            Plot.prototype._generateAttrToProjector = function () {
                var _this = this;
                var h = {};
                d3.keys(this._projectors).forEach(function (a) {
                    var projector = _this._projectors[a];
                    var accessor = Plottable.Util.Methods.applyAccessor(projector.accessor, _this.dataSource());
                    var scale = projector.scale;
                    var fn = scale == null ? accessor : function (d, i) {
                        return scale.scale(accessor(d, i));
                    };
                    h[a] = fn;
                });
                return h;
            };

            Plot.prototype._doRender = function () {
                if (this.element != null) {
                    this._paint();
                    this._dataChanged = false;
                    this.animateOnNextRender = false;
                }
                return this;
            };

            Plot.prototype._paint = function () {
                // no-op
            };

            Plot.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this.renderArea = this.content.append("g").classed("render-area", true);
                return this;
            };

            /**
            * Enables or disables animation.
            *
            * @param {boolean} enabled Whether or not to animate.
            */
            Plot.prototype.animate = function (enabled) {
                this._animate = enabled;
                return this;
            };

            Plot.prototype.detach = function () {
                _super.prototype.detach.call(this);

                // make the domain resize
                this.updateAllProjectors();
                return this;
            };

            /**
            * This function makes sure that all of the scales in this._projectors
            * have an extent that includes all the data that is projected onto them.
            */
            Plot.prototype.updateAllProjectors = function () {
                var _this = this;
                d3.keys(this._projectors).forEach(function (attr) {
                    return _this.updateProjector(attr);
                });
                return this;
            };

            Plot.prototype.updateProjector = function (attr) {
                var projector = this._projectors[attr];
                if (projector.scale != null) {
                    var extent = this.dataSource()._getExtent(projector.accessor);
                    if (extent.length === 0 || !this._isAnchored) {
                        projector.scale.removeExtent(this._plottableID, attr);
                    } else {
                        projector.scale.updateExtent(this._plottableID, attr, extent);
                    }
                }
                return this;
            };

            /**
            * Apply attributes to the selection.
            *
            * If animation is enabled and a valid animator's key is specified, the
            * attributes are applied with the animator. Otherwise, they are applied
            * immediately to the selection.
            *
            * The animation will not animate during auto-resize renders.
            *
            * @param {D3.Selection} selection The selection of elements to update.
            * @param {string} animatorKey The key for the animator.
            * @param {Abstract.IAttributeToProjector} attrToProjector The set of attributes to set on the selection.
            * @return {D3.Selection} The resulting selection (potentially after the transition)
            */
            Plot.prototype._applyAnimatedAttributes = function (selection, animatorKey, attrToProjector) {
                if (this._animate && this.animateOnNextRender && this._animators[animatorKey] != null) {
                    return this._animators[animatorKey].animate(selection, attrToProjector, this);
                } else {
                    return selection.attr(attrToProjector);
                }
            };

            Plot.prototype.animator = function (animatorKey, animator) {
                if (animator === undefined) {
                    return this._animators[animatorKey];
                } else {
                    this._animators[animatorKey] = animator;
                    return this;
                }
            };
            return Plot;
        })(Abstract.Component);
        Abstract.Plot = Plot;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Core) {
        (function (RenderController) {
            (function (RenderPolicy) {
                var Immediate = (function () {
                    function Immediate() {
                    }
                    Immediate.prototype.render = function () {
                        RenderController.flush();
                    };
                    return Immediate;
                })();
                RenderPolicy.Immediate = Immediate;

                var AnimationFrame = (function () {
                    function AnimationFrame() {
                    }
                    AnimationFrame.prototype.render = function () {
                        Plottable.Util.DOM.requestAnimationFramePolyfill(RenderController.flush);
                    };
                    return AnimationFrame;
                })();
                RenderPolicy.AnimationFrame = AnimationFrame;

                var Timeout = (function () {
                    function Timeout() {
                        this._timeoutMsec = Plottable.Util.DOM.POLYFILL_TIMEOUT_MSEC;
                    }
                    Timeout.prototype.render = function () {
                        setTimeout(RenderController.flush, this._timeoutMsec);
                    };
                    return Timeout;
                })();
                RenderPolicy.Timeout = Timeout;
            })(RenderController.RenderPolicy || (RenderController.RenderPolicy = {}));
            var RenderPolicy = RenderController.RenderPolicy;
        })(Core.RenderController || (Core.RenderController = {}));
        var RenderController = Core.RenderController;
    })(Plottable.Core || (Plottable.Core = {}));
    var Core = Plottable.Core;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
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
        */
        (function (RenderController) {
            var _componentsNeedingRender = {};
            var _componentsNeedingComputeLayout = {};
            var _animationRequested = false;
            RenderController._renderPolicy = new RenderController.RenderPolicy.AnimationFrame();

            function setRenderPolicy(policy) {
                RenderController._renderPolicy = policy;
            }
            RenderController.setRenderPolicy = setRenderPolicy;

            /**
            * If the RenderController is enabled, we enqueue the component for
            * render. Otherwise, it is rendered immediately.
            *
            * @param {Abstract.Component} component Any Plottable component.
            */
            function registerToRender(c) {
                _componentsNeedingRender[c._plottableID] = c;
                requestRender();
            }
            RenderController.registerToRender = registerToRender;

            /**
            * If the RenderController is enabled, we enqueue the component for
            * layout and render. Otherwise, it is rendered immediately.
            *
            * @param {Abstract.Component} component Any Plottable component.
            */
            function registerToComputeLayout(c) {
                _componentsNeedingComputeLayout[c._plottableID] = c;
                _componentsNeedingRender[c._plottableID] = c;
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

            function flush() {
                if (_animationRequested) {
                    // Layout
                    var toCompute = d3.values(_componentsNeedingComputeLayout);
                    toCompute.forEach(function (c) {
                        return c._computeLayout();
                    });

                    // Top level render.
                    // Containers will put their children in the toRender queue
                    var toRender = d3.values(_componentsNeedingRender);
                    toRender.forEach(function (c) {
                        return c._render();
                    });

                    // Finally, perform render of all components
                    toRender = d3.values(_componentsNeedingRender);
                    toRender.forEach(function (c) {
                        return c._doRender();
                    });

                    // Reset queues
                    _componentsNeedingComputeLayout = {};
                    _componentsNeedingRender = {};
                    _animationRequested = false;
                }

                // Reset resize flag regardless of queue'd components
                Core.ResizeBroadcaster.clearResizing();
            }
            RenderController.flush = flush;
        })(Core.RenderController || (Core.RenderController = {}));
        var RenderController = Core.RenderController;
    })(Plottable.Core || (Plottable.Core = {}));
    var Core = Plottable.Core;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Core) {
        /**
        * The ResizeBroadcaster will broadcast a notification to any registered
        * components when the window is resized.
        *
        * The broadcaster and single event listener are lazily constructed.
        *
        * Upon resize, the _resized flag will be set to true until after the next
        * flush of the RenderController. This is used, for example, to disable
        * animations during resize.
        */
        (function (ResizeBroadcaster) {
            var broadcaster;
            var _resizing = false;

            function _lazyInitialize() {
                if (broadcaster === undefined) {
                    broadcaster = new Core.Broadcaster(ResizeBroadcaster);
                    window.addEventListener("resize", _onResize);
                }
            }

            function _onResize() {
                _resizing = true;
                broadcaster.broadcast();
            }

            /**
            * Returns true if the window has been resized and the RenderController
            * has not yet been flushed.
            */
            function resizing() {
                return _resizing;
            }
            ResizeBroadcaster.resizing = resizing;

            function clearResizing() {
                _resizing = false;
            }
            ResizeBroadcaster.clearResizing = clearResizing;

            /**
            * Registers a component.
            *
            * When the window is resized, we invoke ._invalidateLayout() on the
            * component, which will enqueue the component for layout and rendering
            * with the RenderController.
            *
            * @param {Abstract.Component} component Any Plottable component.
            */
            function register(c) {
                _lazyInitialize();
                broadcaster.registerListener(c._plottableID, function () {
                    return c._invalidateLayout();
                });
            }
            ResizeBroadcaster.register = register;

            /**
            * Deregisters the components.
            *
            * The component will no longer receive updates on window resize.
            *
            * @param {Abstract.Component} component Any Plottable component.
            */
            function deregister(c) {
                if (broadcaster) {
                    broadcaster.deregisterListener(c._plottableID);
                }
            }
            ResizeBroadcaster.deregister = deregister;
        })(Core.ResizeBroadcaster || (Core.ResizeBroadcaster = {}));
        var ResizeBroadcaster = Core.ResizeBroadcaster;
    })(Plottable.Core || (Plottable.Core = {}));
    var Core = Plottable.Core;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />

var Plottable;
(function (Plottable) {
    ;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    var Domainer = (function () {
        /**
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
            if (typeof combineExtents === "undefined") { combineExtents = Domainer.defaultCombineExtents; }
            this.doNice = false;
            this.padProportion = 0.0;
            this.paddingExceptions = d3.map();
            this.unregisteredPaddingExceptions = d3.set();
            this.includedValues = d3.map();
            // includedValues needs to be a map, even unregistered, to support getting un-stringified values back out
            this.unregisteredIncludedValues = d3.map();
            this.combineExtents = combineExtents;
        }
        /**
        * @param {any[][]} extents The list of extents to be reduced to a single
        *        extent.
        * @param {Abstract.QuantitiveScale} scale
        *        Since nice() must do different things depending on Linear, Log,
        *        or Time scale, the scale must be passed in for nice() to work.
        * @return {any[]} The domain, as a merging of all exents, as a [min, max]
        *                 pair.
        */
        Domainer.prototype.computeDomain = function (extents, scale) {
            var domain;
            domain = this.combineExtents(extents);
            domain = this.includeDomain(domain);
            domain = this.padDomain(domain);
            domain = this.niceDomain(scale, domain);
            return domain;
        };

        /**
        * Sets the Domainer to pad by a given ratio.
        *
        * @param {number} [padProportion] Proportionally how much bigger the
        *         new domain should be (0.05 = 5% larger).
        * @return {Domainer} The calling Domainer.
        */
        Domainer.prototype.pad = function (padProportion) {
            if (typeof padProportion === "undefined") { padProportion = 0.05; }
            this.padProportion = padProportion;
            return this;
        };

        /**
        * Add a padding exception, a value that will not be padded at either end of the domain.
        *
        * Eg, if a padding exception is added at x=0, then [0, 100] will pad to [0, 105] instead of [-2.5, 102.5].
        * If a key is provided, it will be registered under that key with standard map semantics. (Overwrite / remove by key)
        * If a key is not provided, it will be added with set semantics (Can be removed by value)
        *
        * @param {any} exception The padding exception to add.
        * @param string [key] The key to register the exception under.
        * @return Domainer The calling domainer
        */
        Domainer.prototype.addPaddingException = function (exception, key) {
            if (key != null) {
                this.paddingExceptions.set(key, exception);
            } else {
                this.unregisteredPaddingExceptions.add(exception);
            }
            return this;
        };

        /**
        * Remove a padding exception, allowing the domain to pad out that value again.
        *
        * If a string is provided, it is assumed to be a key and the exception associated with that key is removed.
        * If a non-string is provdied, it is assumed to be an unkeyed exception and that exception is removed.
        *
        * @param {any} keyOrException The key for the value to remove, or the value to remove
        * @return Domainer The calling domainer
        */
        Domainer.prototype.removePaddingException = function (keyOrException) {
            if (typeof (keyOrException) === "string") {
                this.paddingExceptions.remove(keyOrException);
            } else {
                this.unregisteredPaddingExceptions.remove(keyOrException);
            }
            return this;
        };

        /**
        * Add an included value, a value that must be included inside the domain.
        *
        * Eg, if a value exception is added at x=0, then [50, 100] will expand to [0, 100] rather than [50, 100].
        * If a key is provided, it will be registered under that key with standard map semantics. (Overwrite / remove by key)
        * If a key is not provided, it will be added with set semantics (Can be removed by value)
        *
        * @param {any} value The included value to add.
        * @param string [key] The key to register the value under.
        * @return Domainer The calling domainer
        */
        Domainer.prototype.addIncludedValue = function (value, key) {
            if (key != null) {
                this.includedValues.set(key, value);
            } else {
                this.unregisteredIncludedValues.set(value, value);
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
        * @return Domainer The calling domainer
        */
        Domainer.prototype.removeIncludedValue = function (valueOrKey) {
            if (typeof (valueOrKey) === "string") {
                this.includedValues.remove(valueOrKey);
            } else {
                this.unregisteredIncludedValues.remove(valueOrKey);
            }
            return this;
        };

        /**
        * Extends the scale's domain so it starts and ends with "nice" values.
        *
        * @param {number} [count] The number of ticks that should fit inside the new domain.
        * @return {Domainer} The calling Domainer.
        */
        Domainer.prototype.nice = function (count) {
            this.doNice = true;
            this.niceCount = count;
            return this;
        };

        Domainer.defaultCombineExtents = function (extents) {
            if (extents.length === 0) {
                return [0, 1];
            } else {
                return [d3.min(extents, function (e) {
                        return e[0];
                    }), d3.max(extents, function (e) {
                        return e[1];
                    })];
            }
        };

        Domainer.prototype.padDomain = function (domain) {
            if (domain[0] === domain[1] && this.padProportion > 0.0) {
                var d = domain[0].valueOf();
                if (domain[0] instanceof Date) {
                    return [d - Domainer.ONE_DAY, d + Domainer.ONE_DAY];
                } else {
                    return [
                        d - Domainer.PADDING_FOR_IDENTICAL_DOMAIN,
                        d + Domainer.PADDING_FOR_IDENTICAL_DOMAIN];
                }
            }
            var extent = domain[1] - domain[0];
            var newDomain = [
                domain[0].valueOf() - this.padProportion / 2 * extent,
                domain[1].valueOf() + this.padProportion / 2 * extent];

            var exceptionValues = this.paddingExceptions.values().concat(this.unregisteredPaddingExceptions.values());
            var exceptionSet = d3.set(exceptionValues);
            if (exceptionSet.has(domain[0])) {
                newDomain[0] = domain[0];
            }
            if (exceptionSet.has(domain[1])) {
                newDomain[1] = domain[1];
            }
            return newDomain;
        };

        Domainer.prototype.niceDomain = function (scale, domain) {
            if (this.doNice) {
                return scale._niceDomain(domain, this.niceCount);
            } else {
                return domain;
            }
        };

        Domainer.prototype.includeDomain = function (domain) {
            var includedValues = this.includedValues.values().concat(this.unregisteredIncludedValues.values());
            return includedValues.reduce(function (domain, value) {
                return [Math.min(domain[0], value), Math.max(domain[1], value)];
            }, domain);
        };
        Domainer.PADDING_FOR_IDENTICAL_DOMAIN = 1;
        Domainer.ONE_DAY = 1000 * 60 * 60 * 24;
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
    (function (Abstract) {
        var QuantitiveScale = (function (_super) {
            __extends(QuantitiveScale, _super);
            /**
            * Creates a new QuantitiveScale.
            *
            * @constructor
            * @param {D3.Scale.QuantitiveScale} scale The D3 QuantitiveScale backing the QuantitiveScale.
            */
            function QuantitiveScale(scale) {
                _super.call(this, scale);
                this.lastRequestedTickCount = 10;
                this._PADDING_FOR_IDENTICAL_DOMAIN = 1;
                this._userSetDomainer = false;
                this._domainer = new Plottable.Domainer();
            }
            QuantitiveScale.prototype.autoDomain = function () {
                this._setDomain(this._domainer.computeDomain(this._getAllExtents(), this));
                return this;
            };

            /**
            * Retrieves the domain value corresponding to a supplied range value.
            *
            * @param {number} value: A value from the Scale's range.
            * @returns {number} The domain value corresponding to the supplied range value.
            */
            QuantitiveScale.prototype.invert = function (value) {
                return this._d3Scale.invert(value);
            };

            /**
            * Creates a copy of the QuantitiveScale with the same domain and range but without any registered listeners.
            *
            * @returns {QuantitiveScale} A copy of the calling QuantitiveScale.
            */
            QuantitiveScale.prototype.copy = function () {
                return new QuantitiveScale(this._d3Scale.copy());
            };

            QuantitiveScale.prototype.domain = function (values) {
                return _super.prototype.domain.call(this, values);
            };

            QuantitiveScale.prototype._setDomain = function (values) {
                var isNaNOrInfinity = function (x) {
                    return x !== x || x === Infinity || x === -Infinity;
                };
                if (isNaNOrInfinity(values[0]) || isNaNOrInfinity(values[1])) {
                    console.log("Warning: QuantitiveScales cannot take NaN or Infinity as a domain value. Ignoring.");
                    return;
                }
                _super.prototype._setDomain.call(this, values);
            };

            QuantitiveScale.prototype.interpolate = function (factory) {
                if (factory == null) {
                    return this._d3Scale.interpolate();
                }
                this._d3Scale.interpolate(factory);
                return this;
            };

            /**
            * Sets the range of the QuantitiveScale and sets the interpolator to d3.interpolateRound.
            *
            * @param {number[]} values The new range value for the range.
            */
            QuantitiveScale.prototype.rangeRound = function (values) {
                this._d3Scale.rangeRound(values);
                return this;
            };

            QuantitiveScale.prototype.clamp = function (clamp) {
                if (clamp == null) {
                    return this._d3Scale.clamp();
                }
                this._d3Scale.clamp(clamp);
                return this;
            };

            /**
            * Generates tick values.
            *
            * @param {number} [count] The number of ticks to generate.
            * @returns {any[]} The generated ticks.
            */
            QuantitiveScale.prototype.ticks = function (count) {
                if (count != null) {
                    this.lastRequestedTickCount = count;
                }
                return this._d3Scale.ticks(this.lastRequestedTickCount);
            };

            /**
            * Gets a tick formatting function for displaying tick values.
            *
            * @param {number} count The number of ticks to be displayed
            * @param {string} [format] A format specifier string.
            * @returns {(n: number) => string} A formatting function.
            */
            QuantitiveScale.prototype.tickFormat = function (count, format) {
                return this._d3Scale.tickFormat(count, format);
            };

            /**
            * Given a domain, expands its domain onto "nice" values, e.g. whole
            * numbers.
            */
            QuantitiveScale.prototype._niceDomain = function (domain, count) {
                return this._d3Scale.copy().domain(domain).nice(count).domain();
            };

            QuantitiveScale.prototype.domainer = function (domainer) {
                if (domainer == null) {
                    return this._domainer;
                } else {
                    this._domainer = domainer;
                    this._userSetDomainer = true;
                    this._autoDomainIfAutomaticMode();
                    return this;
                }
            };
            return QuantitiveScale;
        })(Abstract.Scale);
        Abstract.QuantitiveScale = QuantitiveScale;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Scale) {
        var Linear = (function (_super) {
            __extends(Linear, _super);
            function Linear(scale) {
                _super.call(this, scale == null ? d3.scale.linear() : scale);
            }
            /**
            * Creates a copy of the LinearScale with the same domain and range but without any registered listeners.
            *
            * @returns {LinearScale} A copy of the calling LinearScale.
            */
            Linear.prototype.copy = function () {
                return new Linear(this._d3Scale.copy());
            };
            return Linear;
        })(Plottable.Abstract.QuantitiveScale);
        Scale.Linear = Linear;
    })(Plottable.Scale || (Plottable.Scale = {}));
    var Scale = Plottable.Scale;
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
    (function (Scale) {
        var Log = (function (_super) {
            __extends(Log, _super);
            function Log(scale) {
                _super.call(this, scale == null ? d3.scale.log() : scale);
            }
            /**
            * Creates a copy of the Scale.Log with the same domain and range but without any registered listeners.
            *
            * @returns {Scale.Log} A copy of the calling Scale.Log.
            */
            Log.prototype.copy = function () {
                return new Log(this._d3Scale.copy());
            };
            return Log;
        })(Plottable.Abstract.QuantitiveScale);
        Scale.Log = Log;
    })(Plottable.Scale || (Plottable.Scale = {}));
    var Scale = Plottable.Scale;
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
    (function (Scale) {
        var Ordinal = (function (_super) {
            __extends(Ordinal, _super);
            /**
            * Creates a new OrdinalScale. Domain and Range are set later.
            *
            * @constructor
            */
            function Ordinal(scale) {
                _super.call(this, scale == null ? d3.scale.ordinal() : scale);
                this._range = [0, 1];
                this._rangeType = "bands";
                // Padding as a proportion of the spacing between domain values
                this._innerPadding = 0.3;
                this._outerPadding = 0.5;
                if (this._innerPadding > this._outerPadding) {
                    throw new Error("outerPadding must be >= innerPadding so cat axis bands work out reasonably");
                }
            }
            Ordinal.prototype._getExtent = function () {
                var extents = this._getAllExtents();
                return Plottable.Util.Methods.uniq(Plottable.Util.Methods.flatten(extents));
            };

            Ordinal.prototype.domain = function (values) {
                return _super.prototype.domain.call(this, values);
            };

            Ordinal.prototype._setDomain = function (values) {
                _super.prototype._setDomain.call(this, values);
                this.range(this.range()); // update range
            };

            Ordinal.prototype.range = function (values) {
                if (values == null) {
                    return this._range;
                } else {
                    this._range = values;
                    if (this._rangeType === "points") {
                        this._d3Scale.rangePoints(values, 2 * this._outerPadding); // d3 scale takes total padding
                    } else if (this._rangeType === "bands") {
                        this._d3Scale.rangeBands(values, this._innerPadding, this._outerPadding);
                    }
                    return this;
                }
            };

            /**
            * Returns the width of the range band. Only valid when rangeType is set to "bands".
            *
            * @returns {number} The range band width or 0 if rangeType isn't "bands".
            */
            Ordinal.prototype.rangeBand = function () {
                return this._d3Scale.rangeBand();
            };

            Ordinal.prototype.innerPadding = function () {
                var d = this.domain();
                if (d.length < 2) {
                    return 0;
                }
                var step = Math.abs(this.scale(d[1]) - this.scale(d[0]));
                return step - this.rangeBand();
            };

            Ordinal.prototype.fullBandStartAndWidth = function (v) {
                var start = this.scale(v) - this.innerPadding() / 2;
                var width = this.rangeBand() + this.innerPadding();
                return [start, width];
            };

            Ordinal.prototype.rangeType = function (rangeType, outerPadding, innerPadding) {
                if (rangeType == null) {
                    return this._rangeType;
                } else {
                    if (!(rangeType === "points" || rangeType === "bands")) {
                        throw new Error("Unsupported range type: " + rangeType);
                    }
                    this._rangeType = rangeType;
                    if (outerPadding != null) {
                        this._outerPadding = outerPadding;
                    }
                    if (innerPadding != null) {
                        this._innerPadding = innerPadding;
                    }
                    this.broadcaster.broadcast();
                    return this;
                }
            };

            /**
            * Creates a copy of the Scale with the same domain and range but without any registered listeners.
            *
            * @returns {Ordinal} A copy of the calling Scale.
            */
            Ordinal.prototype.copy = function () {
                return new Ordinal(this._d3Scale.copy());
            };
            return Ordinal;
        })(Plottable.Abstract.Scale);
        Scale.Ordinal = Ordinal;
    })(Plottable.Scale || (Plottable.Scale = {}));
    var Scale = Plottable.Scale;
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
    (function (Scale) {
        var Color = (function (_super) {
            __extends(Color, _super);
            /**
            * Creates a ColorScale.
            *
            * @constructor
            * @param {string} [scaleType] the type of color scale to create
            *     (Category10/Category20/Category20b/Category20c).
            */
            function Color(scaleType) {
                var scale;
                switch (scaleType) {
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
                    case null:
                    case undefined:
                        scale = d3.scale.ordinal();
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
                return Plottable.Util.Methods.uniq(concatenatedExtents);
            };
            return Color;
        })(Plottable.Abstract.Scale);
        Scale.Color = Color;
    })(Plottable.Scale || (Plottable.Scale = {}));
    var Scale = Plottable.Scale;
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
    (function (Scale) {
        var Time = (function (_super) {
            __extends(Time, _super);
            function Time(scale) {
                // need to cast since d3 time scales do not descend from quantitive scales
                _super.call(this, (scale == null ? d3.time.scale() : scale));
                this._PADDING_FOR_IDENTICAL_DOMAIN = 1000 * 60 * 60 * 24;
            }
            Time.prototype._setDomain = function (values) {
                _super.prototype._setDomain.call(this, values.map(function (d) {
                    return new Date(d);
                }));
            };
            return Time;
        })(Plottable.Abstract.QuantitiveScale);
        Scale.Time = Time;
    })(Plottable.Scale || (Plottable.Scale = {}));
    var Scale = Plottable.Scale;
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
    (function (Scale) {
        ;

        var InterpolatedColor = (function (_super) {
            __extends(InterpolatedColor, _super);
            /**
            * Creates a InterpolatedColorScale.
            *
            * @constructor
            * @param {string|string[]} [colorRange] the type of color scale to
            *     create. Default is "reds". @see {@link colorRange} for further
            *     options.
            * @param {string} [scaleType] the type of underlying scale to use
            *     (linear/pow/log/sqrt). Default is "linear". @see {@link scaleType}
            *     for further options.
            */
            function InterpolatedColor(colorRange, scaleType) {
                if (typeof colorRange === "undefined") { colorRange = "reds"; }
                if (typeof scaleType === "undefined") { scaleType = "linear"; }
                this._colorRange = this._resolveColorValues(colorRange);
                this._scaleType = scaleType;
                _super.call(this, InterpolatedColor.getD3InterpolatedScale(this._colorRange, this._scaleType));
            }
            /**
            * Converts the string array into a d3 scale.
            *
            * @param {string[]} colors an array of strings representing color
            *     values in hex ("#FFFFFF") or keywords ("white").
            * @param {string} scaleType a string representing the underlying scale
            *     type (linear/log/sqrt/pow)
            * @returns a quantitive d3 scale.
            */
            InterpolatedColor.getD3InterpolatedScale = function (colors, scaleType) {
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
                    throw new Error("unknown quantitive scale type " + scaleType);
                }
                return scale.range([0, 1]).interpolate(InterpolatedColor.interpolateColors(colors));
            };

            /**
            * Creates a d3 interpolator given the color array.
            *
            * d3 doesn't accept more than 2 range values unless we use a ordinal
            * scale. So, in order to interpolate smoothly between the full color
            * range, we must override the interpolator and compute the color values
            * manually.
            *
            * @param {string[]} colors an array of strings representing color
            *     values in hex ("#FFFFFF") or keywords ("white").
            */
            InterpolatedColor.interpolateColors = function (colors) {
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
            };

            InterpolatedColor.prototype.scaleType = function (scaleType) {
                if (scaleType == null) {
                    return this._scaleType;
                }
                this._scaleType = scaleType;
                this._resetScale();
            };

            InterpolatedColor.prototype._resetScale = function () {
                this._d3Scale = InterpolatedColor.getD3InterpolatedScale(this._colorRange, this._scaleType);
                this._autoDomainIfAutomaticMode();
                this.broadcaster.broadcast();
            };

            InterpolatedColor.prototype._resolveColorValues = function (colorRange) {
                if (colorRange instanceof Array) {
                    return colorRange;
                } else if (InterpolatedColor.COLOR_SCALES[colorRange] != null) {
                    return InterpolatedColor.COLOR_SCALES[colorRange];
                } else {
                    return InterpolatedColor.COLOR_SCALES["reds"];
                }
            };
            InterpolatedColor.COLOR_SCALES = {
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
        })(Plottable.Abstract.QuantitiveScale);
        Scale.InterpolatedColor = InterpolatedColor;
    })(Plottable.Scale || (Plottable.Scale = {}));
    var Scale = Plottable.Scale;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        var ScaleDomainCoordinator = (function () {
            /**
            * Creates a ScaleDomainCoordinator.
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
                this.rescaleInProgress = false;
                if (scales == null) {
                    throw new Error("ScaleDomainCoordinator requires scales to coordinate");
                }
                this.scales = scales;
                this.scales.forEach(function (s) {
                    return s.broadcaster.registerListener(_this, function (sx) {
                        return _this.rescale(sx);
                    });
                });
            }
            ScaleDomainCoordinator.prototype.rescale = function (scale) {
                if (this.rescaleInProgress) {
                    return;
                }
                this.rescaleInProgress = true;
                var newDomain = scale.domain();
                this.scales.forEach(function (s) {
                    return s.domain(newDomain);
                });
                this.rescaleInProgress = false;
            };
            return ScaleDomainCoordinator;
        })();
        Util.ScaleDomainCoordinator = ScaleDomainCoordinator;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
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
    (function (Abstract) {
        var Axis = (function (_super) {
            __extends(Axis, _super);
            function Axis(scale, orientation, formatter) {
                var _this = this;
                _super.call(this);
                this._width = "auto";
                this._height = "auto";
                this._tickLength = 5;
                this._tickLabelPadding = 3;
                this._showEndTickLabels = false;
                if (scale == null || orientation == null) {
                    throw new Error("Axis requires a scale and orientation");
                }
                this._scale = scale;
                this.orient(orientation);

                this.classed("axis", true);
                if (this._isHorizontal()) {
                    this.classed("x-axis", true);
                } else {
                    this.classed("y-axis", true);
                }

                if (formatter == null) {
                    formatter = new Plottable.Formatter.General();
                    formatter.showOnlyUnchangedValues(false);
                }
                this.formatter(formatter);

                this._scale.broadcaster.registerListener(this, function () {
                    return _this.rescale();
                });
            }
            Axis.prototype.remove = function () {
                _super.prototype.remove.call(this);
                this._scale.broadcaster.deregisterListener(this);
            };

            Axis.prototype._isHorizontal = function () {
                return this._orientation === "top" || this._orientation === "bottom";
            };

            Axis.prototype._computeWidth = function () {
                // to be overridden by subclass logic
                this._computedWidth = this._tickLength;
                return this._computedWidth;
            };

            Axis.prototype._computeHeight = function () {
                // to be overridden by subclass logic
                this._computedHeight = this._tickLength;
                return this._computedHeight;
            };

            Axis.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var requestedWidth = this._width;
                var requestedHeight = this._height;

                if (this._isHorizontal()) {
                    if (this._height === "auto") {
                        if (this._computedHeight == null) {
                            this._computeHeight();
                        }
                        requestedHeight = this._computedHeight;
                    }
                    requestedWidth = 0;
                } else {
                    if (this._width === "auto") {
                        if (this._computedWidth == null) {
                            this._computeWidth();
                        }
                        requestedWidth = this._computedWidth;
                    }
                    requestedHeight = 0;
                }

                return {
                    width: Math.min(offeredWidth, requestedWidth),
                    height: Math.min(offeredHeight, requestedHeight),
                    wantsWidth: !this._isHorizontal() && offeredWidth < requestedWidth,
                    wantsHeight: this._isHorizontal() && offeredHeight < requestedHeight
                };
            };

            Axis.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
                if (this._isHorizontal()) {
                    this._scale.range([0, this.availableWidth]);
                } else {
                    this._scale.range([this.availableHeight, 0]);
                }
                return this;
            };

            Axis.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._tickMarkContainer = this.content.append("g").classed(Axis.TICK_MARK_CLASS + "-container", true);
                this._tickLabelContainer = this.content.append("g").classed(Axis.TICK_LABEL_CLASS + "-container", true);
                this._baseline = this.content.append("line").classed("baseline", true);
                return this;
            };

            /*
            * Function for generating tick values in data-space (as opposed to pixel values).
            * To be implemented by subclasses.
            */
            Axis.prototype._getTickValues = function () {
                return [];
            };

            Axis.prototype._doRender = function () {
                var tickMarkValues = this._getTickValues();
                var tickMarks = this._tickMarkContainer.selectAll("." + Axis.TICK_MARK_CLASS).data(tickMarkValues);
                tickMarks.enter().append("line").classed(Axis.TICK_MARK_CLASS, true);
                tickMarks.attr(this._generateTickMarkAttrHash());
                tickMarks.exit().remove();
                this._baseline.attr(this._generateBaselineAttrHash());

                return this;
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
                        baselineAttrHash.x2 = this.availableWidth;
                        break;

                    case "top":
                        baselineAttrHash.x2 = this.availableWidth;
                        baselineAttrHash.y1 = this.availableHeight;
                        baselineAttrHash.y2 = this.availableHeight;
                        break;

                    case "left":
                        baselineAttrHash.x1 = this.availableWidth;
                        baselineAttrHash.x2 = this.availableWidth;
                        baselineAttrHash.y2 = this.availableHeight;
                        break;

                    case "right":
                        baselineAttrHash.y2 = this.availableHeight;
                        break;
                }

                return baselineAttrHash;
            };

            Axis.prototype._generateTickMarkAttrHash = function () {
                var _this = this;
                var tickMarkAttrHash = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                };

                var scalingFunction = function (d) {
                    return _this._scale.scale(d);
                };
                if (this._isHorizontal()) {
                    tickMarkAttrHash["x1"] = scalingFunction;
                    tickMarkAttrHash["x2"] = scalingFunction;
                } else {
                    tickMarkAttrHash["y1"] = scalingFunction;
                    tickMarkAttrHash["y2"] = scalingFunction;
                }

                switch (this._orientation) {
                    case "bottom":
                        tickMarkAttrHash["y2"] = this._tickLength;
                        break;

                    case "top":
                        tickMarkAttrHash["y1"] = this.availableHeight;
                        tickMarkAttrHash["y2"] = this.availableHeight - this._tickLength;
                        break;

                    case "left":
                        tickMarkAttrHash["x1"] = this.availableWidth;
                        tickMarkAttrHash["x2"] = this.availableWidth - this._tickLength;
                        break;

                    case "right":
                        tickMarkAttrHash["x2"] = this._tickLength;
                        break;
                }

                return tickMarkAttrHash;
            };

            Axis.prototype.rescale = function () {
                return (this.element != null) ? this._render() : null;
            };

            Axis.prototype._invalidateLayout = function () {
                _super.prototype._invalidateLayout.call(this);
                this._computedWidth = null;
                this._computedHeight = null;
            };

            Axis.prototype.width = function (w) {
                if (w == null) {
                    return this.availableWidth;
                } else {
                    if (this._isHorizontal()) {
                        throw new Error("width cannot be set on a horizontal Axis");
                    }
                    if (w !== "auto" && w < 0) {
                        throw new Error("invalid value for width");
                    }
                    this._width = w;
                    this._invalidateLayout();
                    return this;
                }
            };

            Axis.prototype.height = function (h) {
                if (h == null) {
                    return this.availableHeight;
                } else {
                    if (!this._isHorizontal()) {
                        throw new Error("height cannot be set on a vertical Axis");
                    }
                    if (h !== "auto" && h < 0) {
                        throw new Error("invalid value for height");
                    }
                    this._height = h;
                    this._invalidateLayout();
                    return this;
                }
            };

            Axis.prototype.formatter = function (formatter) {
                if (formatter === undefined) {
                    return this._formatter;
                }
                if (typeof (formatter) === "function") {
                    formatter = new Plottable.Formatter.Custom(formatter);
                    formatter.showOnlyUnchangedValues(false);
                }
                this._formatter = formatter;
                this._invalidateLayout();
                return this;
            };

            Axis.prototype.tickLength = function (length) {
                if (length == null) {
                    return this._tickLength;
                } else {
                    if (length < 0) {
                        throw new Error("tick length must be positive");
                    }
                    this._tickLength = length;
                    this._invalidateLayout();
                    return this;
                }
            };

            Axis.prototype.tickLabelPadding = function (padding) {
                if (padding == null) {
                    return this._tickLabelPadding;
                } else {
                    if (padding < 0) {
                        throw new Error("tick label padding must be positive");
                    }
                    this._tickLabelPadding = padding;
                    this._invalidateLayout();
                    return this;
                }
            };

            Axis.prototype.orient = function (newOrientation) {
                if (newOrientation == null) {
                    return this._orientation;
                } else {
                    var newOrientationLC = newOrientation.toLowerCase();
                    if (newOrientationLC !== "top" && newOrientationLC !== "bottom" && newOrientationLC !== "left" && newOrientationLC !== "right") {
                        throw new Error("unsupported orientation");
                    }
                    this._orientation = newOrientationLC;
                    this._invalidateLayout();
                    return this;
                }
            };

            Axis.prototype.showEndTickLabels = function (show) {
                if (show == null) {
                    return this._showEndTickLabels;
                }
                this._showEndTickLabels = show;
                this._render();
                return this;
            };

            Axis.prototype._hideEndTickLabels = function () {
                var _this = this;
                var boundingBox = this.element.select(".bounding-box")[0][0].getBoundingClientRect();

                var isInsideBBox = function (tickBox) {
                    return (Math.floor(boundingBox.left) <= Math.ceil(tickBox.left) && Math.floor(boundingBox.top) <= Math.ceil(tickBox.top) && Math.floor(tickBox.right) <= Math.ceil(boundingBox.left + _this.availableWidth) && Math.floor(tickBox.bottom) <= Math.ceil(boundingBox.top + _this.availableHeight));
                };

                var tickLabels = this._tickLabelContainer.selectAll("." + Abstract.Axis.TICK_LABEL_CLASS);
                var firstTickLabel = tickLabels[0][0];
                if (!isInsideBBox(firstTickLabel.getBoundingClientRect())) {
                    d3.select(firstTickLabel).style("visibility", "hidden");
                }
                var lastTickLabel = tickLabels[0][tickLabels[0].length - 1];
                if (!isInsideBBox(lastTickLabel.getBoundingClientRect())) {
                    d3.select(lastTickLabel).style("visibility", "hidden");
                }
            };

            Axis.prototype._hideOverlappingTickLabels = function () {
                var visibleTickLabels = this._tickLabelContainer.selectAll("." + Abstract.Axis.TICK_LABEL_CLASS).filter(function (d, i) {
                    return d3.select(this).style("visibility") === "visible";
                });
                var lastLabelClientRect;

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

                visibleTickLabels.each(function (d) {
                    var clientRect = this.getBoundingClientRect();
                    var tickLabel = d3.select(this);
                    if (lastLabelClientRect != null && boxesOverlap(clientRect, lastLabelClientRect)) {
                        tickLabel.style("visibility", "hidden");
                    } else {
                        lastLabelClientRect = clientRect;
                        tickLabel.style("visibility", "visible");
                    }
                });
            };
            Axis.TICK_MARK_CLASS = "tick-mark";
            Axis.TICK_LABEL_CLASS = "tick-label";
            return Axis;
        })(Abstract.Component);
        Abstract.Axis = Axis;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Axis) {
        var Numeric = (function (_super) {
            __extends(Numeric, _super);
            /**
            * Creates a NumericAxis.
            *
            * @constructor
            * @param {QuantitiveScale} scale The QuantitiveScale to base the NumericAxis on.
            * @param {string} orientation The orientation of the QuantitiveScale (top/bottom/left/right)
            * @param {Formatter} [formatter] A function to format tick labels.
            */
            function Numeric(scale, orientation, formatter) {
                _super.call(this, scale, orientation, formatter);
                this.tickLabelPositioning = "center";
                // Whether or not first/last tick label will still be displayed even if
                // the label is cut off.
                this.showFirstTickLabel = false;
                this.showLastTickLabel = false;
            }
            Numeric.prototype._computeWidth = function () {
                // generate a test value to measure width
                var tickValues = this._getTickValues();
                var valueLength = function (v) {
                    var logLength = Math.floor(Math.log(Math.abs(v)) / Math.LN10);
                    return (logLength > 0) ? logLength : 1;
                };
                var pow10 = Math.max.apply(null, tickValues.map(valueLength));
                var precision = this._formatter.precision();
                var testValue = -(Math.pow(10, pow10) + Math.pow(10, -precision));

                var testTextEl = this._tickLabelContainer.append("text").classed(Plottable.Abstract.Axis.TICK_LABEL_CLASS, true);
                var formattedTestValue = this._formatter.format(testValue);
                var textLength = testTextEl.text(formattedTestValue).node().getComputedTextLength();
                testTextEl.remove();

                if (this.tickLabelPositioning === "center") {
                    this._computedWidth = this.tickLength() + this.tickLabelPadding() + textLength;
                } else {
                    this._computedWidth = Math.max(this.tickLength(), this.tickLabelPadding() + textLength);
                }

                return this._computedWidth;
            };

            Numeric.prototype._computeHeight = function () {
                var testTextEl = this._tickLabelContainer.append("text").classed(Plottable.Abstract.Axis.TICK_LABEL_CLASS, true);
                var textHeight = Plottable.Util.DOM.getBBox(testTextEl.text("test")).height;
                testTextEl.remove();

                if (this.tickLabelPositioning === "center") {
                    this._computedHeight = this.tickLength() + this.tickLabelPadding() + textHeight;
                } else {
                    this._computedHeight = Math.max(this.tickLength(), this.tickLabelPadding() + textHeight);
                }

                return this._computedHeight;
            };

            Numeric.prototype._getTickValues = function () {
                return this._scale.ticks();
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

                var tickMarkLength = this.tickLength();
                var tickLabelPadding = this.tickLabelPadding();

                var tickLabelTextAnchor = "middle";

                var labelGroupTransformX = 0;
                var labelGroupTransformY = 0;
                var labelGroupShiftX = 0;
                var labelGroupShiftY = 0;
                if (this._isHorizontal()) {
                    switch (this.tickLabelPositioning) {
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
                } else {
                    switch (this.tickLabelPositioning) {
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
                switch (this._orientation) {
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
                var tickLabels = this._tickLabelContainer.selectAll("." + Plottable.Abstract.Axis.TICK_LABEL_CLASS).data(tickLabelValues);
                tickLabels.enter().append("text").classed(Plottable.Abstract.Axis.TICK_LABEL_CLASS, true);
                tickLabels.exit().remove();

                var formatFunction = function (d) {
                    return _this._formatter.format(d);
                };
                tickLabels.style("text-anchor", tickLabelTextAnchor).style("visibility", "visible").attr(tickLabelAttrHash).text(formatFunction);

                var labelGroupTransform = "translate(" + labelGroupTransformX + ", " + labelGroupTransformY + ")";
                this._tickLabelContainer.attr("transform", labelGroupTransform);

                if (!this.showEndTickLabels()) {
                    this._hideEndTickLabels();
                }

                this._hideOverlappingTickLabels();
                return this;
            };

            Numeric.prototype.tickLabelPosition = function (position) {
                if (position == null) {
                    return this.tickLabelPositioning;
                } else {
                    var positionLC = position.toLowerCase();
                    if (this._isHorizontal()) {
                        if (!(positionLC === "left" || positionLC === "center" || positionLC === "right")) {
                            throw new Error(positionLC + " is not a valid tick label position for a horizontal NumericAxis");
                        }
                    } else {
                        if (!(positionLC === "top" || positionLC === "center" || positionLC === "bottom")) {
                            throw new Error(positionLC + " is not a valid tick label position for a vertical NumericAxis");
                        }
                    }
                    this.tickLabelPositioning = positionLC;
                    this._invalidateLayout();
                    return this;
                }
            };

            Numeric.prototype.showEndTickLabel = function (orientation, show) {
                if ((this._isHorizontal() && orientation === "left") || (!this._isHorizontal() && orientation === "bottom")) {
                    if (show === undefined) {
                        return this.showFirstTickLabel;
                    } else {
                        this.showFirstTickLabel = show;
                        return this._render();
                    }
                } else if ((this._isHorizontal() && orientation === "right") || (!this._isHorizontal() && orientation === "top")) {
                    if (show === undefined) {
                        return this.showLastTickLabel;
                    } else {
                        this.showLastTickLabel = show;
                        return this._render();
                    }
                } else {
                    throw new Error("Attempt to show " + orientation + " tick label on a " + (this._isHorizontal() ? "horizontal" : "vertical") + " axis");
                }
            };
            return Numeric;
        })(Plottable.Abstract.Axis);
        Axis.Numeric = Numeric;
    })(Plottable.Axis || (Plottable.Axis = {}));
    var Axis = Plottable.Axis;
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
    (function (Axis) {
        var Category = (function (_super) {
            __extends(Category, _super);
            /**
            * Creates a CategoryAxis.
            *
            * A CategoryAxis takes an OrdinalScale and includes word-wrapping algorithms and advanced layout logic to try to
            * display the scale as efficiently as possible.
            *
            * @constructor
            * @param {OrdinalScale} scale The scale to base the Axis on.
            * @param {string} orientation The orientation of the Axis (top/bottom/left/right)
            * @param {formatter} [formatter] The Formatter for the Axis (default Formatter.Identity)
            */
            function Category(scale, orientation, formatter) {
                if (typeof orientation === "undefined") { orientation = "bottom"; }
                if (typeof formatter === "undefined") { formatter = new Plottable.Formatter.Identity(); }
                var _this = this;
                _super.call(this, scale, orientation, formatter);
                this.classed("category-axis", true);
                if (scale.rangeType() !== "bands") {
                    throw new Error("Only rangeBands category axes are implemented");
                }
                this._scale.broadcaster.registerListener(this, function () {
                    return _this._invalidateLayout();
                });
            }
            Category.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this.measurer = new Plottable.Util.Text.CachingCharacterMeasurer(this._tickLabelContainer);
                return this;
            };

            Category.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var widthRequiredByTicks = this._isHorizontal() ? 0 : this.tickLength() + this.tickLabelPadding();
                var heightRequiredByTicks = this._isHorizontal() ? this.tickLength() + this.tickLabelPadding() : 0;

                if (offeredWidth < 0 || offeredHeight < 0) {
                    return {
                        width: offeredWidth,
                        height: offeredHeight,
                        wantsWidth: !this._isHorizontal(),
                        wantsHeight: this._isHorizontal()
                    };
                }
                if (this._scale.domain().length === 0) {
                    return {
                        width: 0,
                        height: 0,
                        wantsWidth: false,
                        wantsHeight: false
                    };
                }

                var fakeScale = this._scale.copy();
                if (this._isHorizontal()) {
                    fakeScale.range([0, offeredWidth]);
                } else {
                    fakeScale.range([offeredHeight, 0]);
                }
                var textResult = this.measureTicks(offeredWidth, offeredHeight, fakeScale, this._scale.domain());

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

            Category.prototype.measureTicks = function (axisWidth, axisHeight, scale, dataOrTicks) {
                var draw = typeof dataOrTicks[0] !== "string";
                var self = this;
                var textWriteResults = [];
                var tm = function (s) {
                    return self.measurer.measure(s);
                };
                var iterator = draw ? function (f) {
                    return dataOrTicks.each(f);
                } : function (f) {
                    return dataOrTicks.forEach(f);
                };

                iterator(function (d) {
                    var bandWidth = scale.fullBandStartAndWidth(d)[1];
                    var width = self._isHorizontal() ? bandWidth : axisWidth - self.tickLength() - self.tickLabelPadding();
                    var height = self._isHorizontal() ? axisHeight - self.tickLength() - self.tickLabelPadding() : bandWidth;

                    var textWriteResult;
                    var formatter = self._formatter;
                    if (draw) {
                        var d3this = d3.select(this);
                        var xAlign = { left: "right", right: "left", top: "center", bottom: "center" };
                        var yAlign = { left: "center", right: "center", top: "bottom", bottom: "top" };
                        textWriteResult = Plottable.Util.Text.writeText(formatter.format(d), width, height, tm, true, {
                            g: d3this,
                            xAlign: xAlign[self._orientation],
                            yAlign: yAlign[self._orientation]
                        });
                    } else {
                        textWriteResult = Plottable.Util.Text.writeText(formatter.format(d), width, height, tm, true);
                    }

                    textWriteResults.push(textWriteResult);
                });

                var widthFn = this._isHorizontal() ? d3.sum : d3.max;
                var heightFn = this._isHorizontal() ? d3.max : d3.sum;
                return {
                    textFits: textWriteResults.every(function (t) {
                        return t.textFits;
                    }),
                    usedWidth: widthFn(textWriteResults, function (t) {
                        return t.usedWidth;
                    }),
                    usedHeight: heightFn(textWriteResults, function (t) {
                        return t.usedHeight;
                    })
                };
            };

            Category.prototype._doRender = function () {
                var _this = this;
                _super.prototype._doRender.call(this);
                var tickLabels = this._tickLabelContainer.selectAll("." + Plottable.Abstract.Axis.TICK_LABEL_CLASS).data(this._scale.domain(), function (d) {
                    return d;
                });

                var getTickLabelTransform = function (d, i) {
                    var startAndWidth = _this._scale.fullBandStartAndWidth(d);
                    var bandStartPosition = startAndWidth[0];
                    var x = _this._isHorizontal() ? bandStartPosition : 0;
                    var y = _this._isHorizontal() ? 0 : bandStartPosition;
                    return "translate(" + x + "," + y + ")";
                };
                tickLabels.enter().append("g").classed(Plottable.Abstract.Axis.TICK_LABEL_CLASS, true);
                tickLabels.exit().remove();
                tickLabels.attr("transform", getTickLabelTransform);

                // erase all text first, then rewrite
                tickLabels.text("");
                this.measureTicks(this.availableWidth, this.availableHeight, this._scale, tickLabels);
                var translate = this._isHorizontal() ? [this._scale.rangeBand() / 2, 0] : [0, this._scale.rangeBand() / 2];

                var xTranslate = this._orientation === "right" ? this.tickLength() + this.tickLabelPadding() : 0;
                var yTranslate = this._orientation === "bottom" ? this.tickLength() + this.tickLabelPadding() : 0;
                Plottable.Util.DOM.translate(this._tickLabelContainer, xTranslate, yTranslate);
                Plottable.Util.DOM.translate(this._tickMarkContainer, translate[0], translate[1]);
                return this;
            };

            Category.prototype._computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
                // When anyone calls _invalidateLayout, _computeLayout will be called
                // on everyone, including this. Since CSS or something might have
                // affected the size of the characters, clear the cache.
                this.measurer.clear();
                return _super.prototype._computeLayout.call(this, xOrigin, yOrigin, availableWidth, availableHeight);
            };
            return Category;
        })(Plottable.Abstract.Axis);
        Axis.Category = Category;
    })(Plottable.Axis || (Plottable.Axis = {}));
    var Axis = Plottable.Axis;
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
    (function (Component) {
        var Label = (function (_super) {
            __extends(Label, _super);
            /**
            * Creates a Label.
            *
            * @constructor
            * @param {string} [displayText] The text of the Label.
            * @param {string} [orientation] The orientation of the Label (horizontal/vertical-left/vertical-right).
            */
            function Label(displayText, orientation) {
                if (typeof displayText === "undefined") { displayText = ""; }
                if (typeof orientation === "undefined") { orientation = "horizontal"; }
                _super.call(this);
                this.classed("label", true);
                this.text(displayText);
                orientation = orientation.toLowerCase();
                if (orientation === "vertical-left") {
                    orientation = "left";
                }
                if (orientation === "vertical-right") {
                    orientation = "right";
                }
                if (orientation === "horizontal" || orientation === "left" || orientation === "right") {
                    this.orientation = orientation;
                } else {
                    throw new Error(orientation + " is not a valid orientation for LabelComponent");
                }
                this.xAlign("center").yAlign("center");
            }
            Label.prototype.xAlign = function (alignment) {
                var alignmentLC = alignment.toLowerCase();
                _super.prototype.xAlign.call(this, alignmentLC);
                this.xAlignment = alignmentLC;
                return this;
            };
            Label.prototype.yAlign = function (alignment) {
                var alignmentLC = alignment.toLowerCase();
                _super.prototype.yAlign.call(this, alignmentLC);
                this.yAlignment = alignmentLC;
                return this;
            };

            Label.prototype._requestedSpace = function (offeredWidth, offeredHeight) {
                var desiredWH = this.measurer(this._text);
                var desiredWidth = this.orientation === "horizontal" ? desiredWH.width : desiredWH.height;
                var desiredHeight = this.orientation === "horizontal" ? desiredWH.height : desiredWH.width;

                return {
                    width: Math.min(desiredWidth, offeredWidth),
                    height: Math.min(desiredHeight, offeredHeight),
                    wantsWidth: desiredWidth > offeredWidth,
                    wantsHeight: desiredHeight > offeredHeight
                };
            };

            Label.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this.textContainer = this.content.append("g");
                this.measurer = Plottable.Util.Text.getTextMeasure(this.textContainer);
                this.text(this._text);
                return this;
            };

            Label.prototype.text = function (displayText) {
                if (displayText === undefined) {
                    return this._text;
                } else {
                    this._text = displayText;
                    this._invalidateLayout();
                    return this;
                }
            };

            Label.prototype._doRender = function () {
                _super.prototype._doRender.call(this);
                this.textContainer.selectAll("text").remove();
                var dimension = this.orientation === "horizontal" ? this.availableWidth : this.availableHeight;
                var truncatedText = Plottable.Util.Text.getTruncatedText(this._text, dimension, this.measurer);
                if (this.orientation === "horizontal") {
                    Plottable.Util.Text.writeLineHorizontally(truncatedText, this.textContainer, this.availableWidth, this.availableHeight, this.xAlignment, this.yAlignment);
                } else {
                    Plottable.Util.Text.writeLineVertically(truncatedText, this.textContainer, this.availableWidth, this.availableHeight, this.xAlignment, this.yAlignment, this.orientation);
                }
                return this;
            };

            Label.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
                this.measurer = Plottable.Util.Text.getTextMeasure(this.textContainer); // reset it in case fonts have changed
                return this;
            };
            return Label;
        })(Plottable.Abstract.Component);
        Component.Label = Label;

        var TitleLabel = (function (_super) {
            __extends(TitleLabel, _super);
            function TitleLabel(text, orientation) {
                _super.call(this, text, orientation);
                this.classed("title-label", true);
            }
            return TitleLabel;
        })(Label);
        Component.TitleLabel = TitleLabel;

        var AxisLabel = (function (_super) {
            __extends(AxisLabel, _super);
            function AxisLabel(text, orientation) {
                _super.call(this, text, orientation);
                this.classed("axis-label", true);
            }
            return AxisLabel;
        })(Label);
        Component.AxisLabel = AxisLabel;
    })(Plottable.Component || (Plottable.Component = {}));
    var Component = Plottable.Component;
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
    (function (Component) {
        var Legend = (function (_super) {
            __extends(Legend, _super);
            /**
            * Creates a Legend.
            * A legend consists of a series of legend rows, each with a color and label taken from the colorScale.
            * The rows will be displayed in the order of the colorScale domain.
            * This legend also allows interactions, through the functions "toggleCallback" and "hoverCallback"
            * Setting a callback will also put classes on the individual rows.
            *
            * @constructor
            * @param {ColorScale} colorScale
            */
            function Legend(colorScale) {
                _super.call(this);
                this.classed("legend", true);
                this.scale(colorScale);
                this.xAlign("RIGHT").yAlign("TOP");
                this.xOffset(5).yOffset(5);
            }
            Legend.prototype.remove = function () {
                _super.prototype.remove.call(this);
                if (this.colorScale != null) {
                    this.colorScale.broadcaster.deregisterListener(this);
                }
            };

            Legend.prototype.toggleCallback = function (callback) {
                if (callback !== undefined) {
                    this._toggleCallback = callback;
                    this.isOff = d3.set();
                    this.updateListeners();
                    this.updateClasses();
                    return this;
                } else {
                    return this._toggleCallback;
                }
            };

            Legend.prototype.hoverCallback = function (callback) {
                if (callback !== undefined) {
                    this._hoverCallback = callback;
                    this.datumCurrentlyFocusedOn = undefined;
                    this.updateListeners();
                    this.updateClasses();
                    return this;
                } else {
                    return this._hoverCallback;
                }
            };

            Legend.prototype.scale = function (scale) {
                var _this = this;
                if (scale != null) {
                    if (this.colorScale != null) {
                        this.colorScale.broadcaster.deregisterListener(this);
                    }
                    this.colorScale = scale;
                    this.colorScale.broadcaster.registerListener(this, function () {
                        return _this.updateDomain();
                    });
                    this.updateDomain();
                    return this;
                } else {
                    return this.colorScale;
                }
            };

            Legend.prototype.updateDomain = function () {
                if (this._toggleCallback != null) {
                    this.isOff = Plottable.Util.Methods.intersection(this.isOff, d3.set(this.scale().domain()));
                }
                if (this._hoverCallback != null) {
                    this.datumCurrentlyFocusedOn = this.scale().domain().indexOf(this.datumCurrentlyFocusedOn) >= 0 ? this.datumCurrentlyFocusedOn : undefined;
                }
                this._invalidateLayout();
            };

            Legend.prototype._computeLayout = function (xOrigin, yOrigin, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, xOrigin, yOrigin, availableWidth, availableHeight);
                var textHeight = this.measureTextHeight();
                var totalNumRows = this.colorScale.domain().length;
                this.nRowsDrawn = Math.min(totalNumRows, Math.floor(this.availableHeight / textHeight));
                return this;
            };

            Legend.prototype._requestedSpace = function (offeredWidth, offeredY) {
                var textHeight = this.measureTextHeight();
                var totalNumRows = this.colorScale.domain().length;
                var rowsICanFit = Math.min(totalNumRows, Math.floor(offeredY / textHeight));

                var fakeLegendEl = this.content.append("g").classed(Legend.SUBELEMENT_CLASS, true);
                var fakeText = fakeLegendEl.append("text");
                var maxWidth = d3.max(this.colorScale.domain(), function (d) {
                    return Plottable.Util.Text.getTextWidth(fakeText, d);
                });
                fakeLegendEl.remove();
                maxWidth = maxWidth === undefined ? 0 : maxWidth;
                var desiredWidth = maxWidth + textHeight + Legend.MARGIN;
                return {
                    width: Math.min(desiredWidth, offeredWidth),
                    height: rowsICanFit * textHeight,
                    wantsWidth: offeredWidth < desiredWidth,
                    wantsHeight: rowsICanFit < totalNumRows
                };
            };

            Legend.prototype.measureTextHeight = function () {
                // note: can't be called before anchoring atm
                var fakeLegendEl = this.content.append("g").classed(Legend.SUBELEMENT_CLASS, true);
                var textHeight = Plottable.Util.Text.getTextHeight(fakeLegendEl.append("text"));
                fakeLegendEl.remove();
                return textHeight;
            };

            Legend.prototype._doRender = function () {
                _super.prototype._doRender.call(this);
                var domain = this.colorScale.domain().slice(0, this.nRowsDrawn);
                var textHeight = this.measureTextHeight();
                var availableWidth = this.availableWidth - textHeight - Legend.MARGIN;
                var r = textHeight - Legend.MARGIN * 2 - 2;
                var legend = this.content.selectAll("." + Legend.SUBELEMENT_CLASS).data(domain, function (d) {
                    return d;
                });
                var legendEnter = legend.enter().append("g").classed(Legend.SUBELEMENT_CLASS, true);
                legendEnter.append("circle").attr("cx", Legend.MARGIN + r / 2).attr("cy", Legend.MARGIN + r / 2).attr("r", r);
                legendEnter.append("text").attr("x", textHeight).attr("y", Legend.MARGIN + textHeight / 2);
                legend.exit().remove();
                legend.attr("transform", function (d) {
                    return "translate(0," + domain.indexOf(d) * textHeight + ")";
                });
                legend.selectAll("circle").attr("fill", this.colorScale._d3Scale);
                legend.selectAll("text").text(function (d) {
                    var measure = Plottable.Util.Text.getTextMeasure(d3.select(this));
                    return Plottable.Util.Text.getTruncatedText(d, availableWidth, measure);
                });
                this.updateClasses();
                this.updateListeners();
                return this;
            };

            Legend.prototype.updateListeners = function () {
                var _this = this;
                if (!this._isSetup) {
                    return;
                }
                var dataSelection = this.content.selectAll("." + Legend.SUBELEMENT_CLASS);
                if (this._hoverCallback != null) {
                    // tag the element that is being hovered over with the class "focus"
                    // this callback will trigger with the specific element being hovered over.
                    var hoverRow = function (mouseover) {
                        return function (datum) {
                            _this.datumCurrentlyFocusedOn = mouseover ? datum : undefined;
                            _this._hoverCallback(_this.datumCurrentlyFocusedOn);
                            _this.updateClasses();
                        };
                    };
                    dataSelection.on("mouseover", hoverRow(true));
                    dataSelection.on("mouseout", hoverRow(false));
                } else {
                    // remove all mouseover/mouseout listeners
                    dataSelection.on("mouseover", null);
                    dataSelection.on("mouseout", null);
                }

                if (this._toggleCallback != null) {
                    dataSelection.on("click", function (datum) {
                        var turningOn = _this.isOff.has(datum);
                        if (turningOn) {
                            _this.isOff.remove(datum);
                        } else {
                            _this.isOff.add(datum);
                        }
                        _this._toggleCallback(datum, turningOn);
                        _this.updateClasses();
                    });
                } else {
                    // remove all click listeners
                    dataSelection.on("click", null);
                }
            };

            Legend.prototype.updateClasses = function () {
                var _this = this;
                if (!this._isSetup) {
                    return;
                }
                var dataSelection = this.content.selectAll("." + Legend.SUBELEMENT_CLASS);
                if (this._hoverCallback != null) {
                    dataSelection.classed("focus", function (d) {
                        return _this.datumCurrentlyFocusedOn === d;
                    });
                    dataSelection.classed("hover", this.datumCurrentlyFocusedOn !== undefined);
                } else {
                    dataSelection.classed("hover", false);
                    dataSelection.classed("focus", false);
                }
                if (this._toggleCallback != null) {
                    dataSelection.classed("toggled-on", function (d) {
                        return !_this.isOff.has(d);
                    });
                    dataSelection.classed("toggled-off", function (d) {
                        return _this.isOff.has(d);
                    });
                } else {
                    dataSelection.classed("toggled-on", false);
                    dataSelection.classed("toggled-off", false);
                }
            };
            Legend.SUBELEMENT_CLASS = "legend-row";
            Legend.MARGIN = 5;
            return Legend;
        })(Plottable.Abstract.Component);
        Component.Legend = Legend;
    })(Plottable.Component || (Plottable.Component = {}));
    var Component = Plottable.Component;
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
    (function (Component) {
        var Gridlines = (function (_super) {
            __extends(Gridlines, _super);
            /**
            * Creates a set of Gridlines.
            * @constructor
            *
            * @param {QuantitiveScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
            * @param {QuantitiveScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
            */
            function Gridlines(xScale, yScale) {
                var _this = this;
                _super.call(this);
                if (xScale == null && yScale == null) {
                    throw new Error("Gridlines must have at least one scale");
                }
                this.classed("gridlines", true);
                this.xScale = xScale;
                this.yScale = yScale;
                if (this.xScale != null) {
                    this.xScale.broadcaster.registerListener(this, function () {
                        return _this._render();
                    });
                }
                if (this.yScale != null) {
                    this.yScale.broadcaster.registerListener(this, function () {
                        return _this._render();
                    });
                }
            }
            Gridlines.prototype.remove = function () {
                _super.prototype.remove.call(this);
                if (this.xScale != null) {
                    this.xScale.broadcaster.deregisterListener(this);
                }
                if (this.yScale != null) {
                    this.yScale.broadcaster.deregisterListener(this);
                }
                return this;
            };

            Gridlines.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this.xLinesContainer = this.content.append("g").classed("x-gridlines", true);
                this.yLinesContainer = this.content.append("g").classed("y-gridlines", true);
                return this;
            };

            Gridlines.prototype._doRender = function () {
                _super.prototype._doRender.call(this);
                this.redrawXLines();
                this.redrawYLines();
                return this;
            };

            Gridlines.prototype.redrawXLines = function () {
                var _this = this;
                if (this.xScale != null) {
                    var xTicks = this.xScale.ticks();
                    var getScaledXValue = function (tickVal) {
                        return _this.xScale.scale(tickVal);
                    };
                    var xLines = this.xLinesContainer.selectAll("line").data(xTicks);
                    xLines.enter().append("line");
                    xLines.attr("x1", getScaledXValue).attr("y1", 0).attr("x2", getScaledXValue).attr("y2", this.availableHeight);
                    xLines.exit().remove();
                }
            };

            Gridlines.prototype.redrawYLines = function () {
                var _this = this;
                if (this.yScale != null) {
                    var yTicks = this.yScale.ticks();
                    var getScaledYValue = function (tickVal) {
                        return _this.yScale.scale(tickVal);
                    };
                    var yLines = this.yLinesContainer.selectAll("line").data(yTicks);
                    yLines.enter().append("line");
                    yLines.attr("x1", 0).attr("y1", getScaledYValue).attr("x2", this.availableWidth).attr("y2", getScaledYValue);
                    yLines.exit().remove();
                }
            };
            return Gridlines;
        })(Plottable.Abstract.Component);
        Component.Gridlines = Gridlines;
    })(Plottable.Component || (Plottable.Component = {}));
    var Component = Plottable.Component;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Util) {
        (function (Axis) {
            Axis.ONE_DAY = 24 * 60 * 60 * 1000;

            /**
            * Generates a relative date axis formatter.
            *
            * @param {number} baseValue The start date (as epoch time) used in computing relative dates
            * @param {number} increment The unit used in calculating relative date tick values
            * @param {string} label The label to append to tick values
            */
            function generateRelativeDateFormatter(baseValue, increment, label) {
                if (typeof increment === "undefined") { increment = Axis.ONE_DAY; }
                if (typeof label === "undefined") { label = ""; }
                var formatter = function (tickValue) {
                    var relativeDate = Math.round((tickValue.valueOf() - baseValue) / increment);
                    return relativeDate.toString() + label;
                };
                return formatter;
            }
            Axis.generateRelativeDateFormatter = generateRelativeDateFormatter;
        })(Util.Axis || (Util.Axis = {}));
        var Axis = Util.Axis;
    })(Plottable.Util || (Plottable.Util = {}));
    var Util = Plottable.Util;
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
    (function (Abstract) {
        var XYPlot = (function (_super) {
            __extends(XYPlot, _super);
            /**
            * Creates an XYPlot.
            *
            * @constructor
            * @param {any[]|DataSource} [dataset] The data or DataSource to be associated with this Renderer.
            * @param {Scale} xScale The x scale to use.
            * @param {Scale} yScale The y scale to use.
            */
            function XYPlot(dataset, xScale, yScale) {
                _super.call(this, dataset);
                if (xScale == null || yScale == null) {
                    throw new Error("XYPlots require an xScale and yScale");
                }
                this.classed("xy-renderer", true);

                this.project("x", "x", xScale); // default accessor
                this.project("y", "y", yScale); // default accessor
            }
            XYPlot.prototype.project = function (attrToSet, accessor, scale) {
                // We only want padding and nice-ing on scales that will correspond to axes / pixel layout.
                // So when we get an "x" or "y" scale, enable autoNiceing and autoPadding.
                if (attrToSet === "x" && scale != null) {
                    this.xScale = scale;
                    this._updateXDomainer();
                }

                if (attrToSet === "y" && scale != null) {
                    this.yScale = scale;
                    this._updateYDomainer();
                }

                _super.prototype.project.call(this, attrToSet, accessor, scale);

                return this;
            };

            XYPlot.prototype._computeLayout = function (xOffset, yOffset, availableWidth, availableHeight) {
                _super.prototype._computeLayout.call(this, xOffset, yOffset, availableWidth, availableHeight);
                this.xScale.range([0, this.availableWidth]);
                this.yScale.range([this.availableHeight, 0]);
                return this;
            };

            XYPlot.prototype._updateXDomainer = function () {
                if (this.xScale instanceof Abstract.QuantitiveScale) {
                    var scale = this.xScale;
                    if (!scale._userSetDomainer) {
                        scale.domainer().pad().nice();
                    }
                }
                return this;
            };

            XYPlot.prototype._updateYDomainer = function () {
                if (this.yScale instanceof Abstract.QuantitiveScale) {
                    var scale = this.yScale;
                    if (!scale._userSetDomainer) {
                        scale.domainer().pad().nice();
                    }
                }
                return this;
            };
            return XYPlot;
        })(Abstract.Plot);
        Abstract.XYPlot = XYPlot;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Plot) {
        var Scatter = (function (_super) {
            __extends(Scatter, _super);
            /**
            * Creates a ScatterPlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {Scale} xScale The x scale to use.
            * @param {Scale} yScale The y scale to use.
            */
            function Scatter(dataset, xScale, yScale) {
                _super.call(this, dataset, xScale, yScale);
                this._animators = {
                    "circles-reset": new Plottable.Animator.Null(),
                    "circles": new Plottable.Animator.IterativeDelay().duration(250).delay(5)
                };
                this.classed("circle-renderer", true);
                this.project("r", 3); // default
                this.project("fill", function () {
                    return "steelblue";
                }); // default
            }
            Scatter.prototype.project = function (attrToSet, accessor, scale) {
                attrToSet = attrToSet === "cx" ? "x" : attrToSet;
                attrToSet = attrToSet === "cy" ? "y" : attrToSet;
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                return this;
            };

            Scatter.prototype._paint = function () {
                _super.prototype._paint.call(this);

                var attrToProjector = this._generateAttrToProjector();
                attrToProjector["cx"] = attrToProjector["x"];
                attrToProjector["cy"] = attrToProjector["y"];
                delete attrToProjector["x"];
                delete attrToProjector["y"];

                var circles = this.renderArea.selectAll("circle").data(this._dataSource.data());
                circles.enter().append("circle");

                if (this._dataChanged) {
                    var rFunction = attrToProjector["r"];
                    attrToProjector["r"] = function () {
                        return 0;
                    };
                    this._applyAnimatedAttributes(circles, "circles-reset", attrToProjector);
                    attrToProjector["r"] = rFunction;
                }

                this._applyAnimatedAttributes(circles, "circles", attrToProjector);
                circles.exit().remove();
            };
            return Scatter;
        })(Plottable.Abstract.XYPlot);
        Plot.Scatter = Scatter;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
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
    (function (Plot) {
        var Grid = (function (_super) {
            __extends(Grid, _super);
            /**
            * Creates a GridPlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {OrdinalScale} xScale The x scale to use.
            * @param {OrdinalScale} yScale The y scale to use.
            * @param {ColorScale|InterpolatedColorScale} colorScale The color scale to use for each grid
            *     cell.
            */
            function Grid(dataset, xScale, yScale, colorScale) {
                _super.call(this, dataset, xScale, yScale);
                this._animators = {
                    "cells": new Plottable.Animator.Null()
                };
                this.classed("grid-renderer", true);

                // The x and y scales should render in bands with no padding
                this.xScale.rangeType("bands", 0, 0);
                this.yScale.rangeType("bands", 0, 0);

                this.colorScale = colorScale;
                this.project("fill", "value", colorScale); // default
            }
            Grid.prototype.project = function (attrToSet, accessor, scale) {
                _super.prototype.project.call(this, attrToSet, accessor, scale);
                if (attrToSet === "fill") {
                    this.colorScale = this._projectors["fill"].scale;
                }
                return this;
            };

            Grid.prototype._paint = function () {
                _super.prototype._paint.call(this);

                var cells = this.renderArea.selectAll("rect").data(this._dataSource.data());
                cells.enter().append("rect");

                var xStep = this.xScale.rangeBand();
                var yStep = this.yScale.rangeBand();

                var attrToProjector = this._generateAttrToProjector();
                attrToProjector["width"] = function () {
                    return xStep;
                };
                attrToProjector["height"] = function () {
                    return yStep;
                };

                this._applyAnimatedAttributes(cells, "cells", attrToProjector);
                cells.exit().remove();
            };
            return Grid;
        })(Plottable.Abstract.XYPlot);
        Plot.Grid = Grid;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
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
    (function (Abstract) {
        var BarPlot = (function (_super) {
            __extends(BarPlot, _super);
            /**
            * Creates an AbstractBarPlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {Scale} xScale The x scale to use.
            * @param {Scale} yScale The y scale to use.
            */
            function BarPlot(dataset, xScale, yScale) {
                _super.call(this, dataset, xScale, yScale);
                this._baselineValue = 0;
                this._barAlignmentFactor = 0;
                this._animators = {
                    "bars-reset": new Plottable.Animator.Null(),
                    "bars": new Plottable.Animator.IterativeDelay(),
                    "baseline": new Plottable.Animator.Null()
                };
                this.classed("bar-renderer", true);
                this.project("fill", function () {
                    return "steelblue";
                });

                // because this._baselineValue was not initialized during the super()
                // call, we must call this in order to get this._baselineValue
                // to be used by the Domainer.
                this.baseline(this._baselineValue);
            }
            BarPlot.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this._baseline = this.renderArea.append("line").classed("baseline", true);
                this._bars = this.renderArea.selectAll("rect").data([]);
                return this;
            };

            BarPlot.prototype._paint = function () {
                _super.prototype._paint.call(this);
                this._bars = this.renderArea.selectAll("rect").data(this._dataSource.data());
                this._bars.enter().append("rect");

                var primaryScale = this._isVertical ? this.yScale : this.xScale;
                var scaledBaseline = primaryScale.scale(this._baselineValue);
                var positionAttr = this._isVertical ? "y" : "x";
                var dimensionAttr = this._isVertical ? "height" : "width";

                if (this._dataChanged && this._animate) {
                    var resetAttrToProjector = this._generateAttrToProjector();
                    resetAttrToProjector[positionAttr] = function () {
                        return scaledBaseline;
                    };
                    resetAttrToProjector[dimensionAttr] = function () {
                        return 0;
                    };
                    this._applyAnimatedAttributes(this._bars, "bars-reset", resetAttrToProjector);
                }

                var attrToProjector = this._generateAttrToProjector();
                if (attrToProjector["fill"] != null) {
                    this._bars.attr("fill", attrToProjector["fill"]); // so colors don't animate
                }
                this._applyAnimatedAttributes(this._bars, "bars", attrToProjector);

                this._bars.exit().remove();

                var baselineAttr = {
                    "x1": this._isVertical ? 0 : scaledBaseline,
                    "y1": this._isVertical ? scaledBaseline : 0,
                    "x2": this._isVertical ? this.availableWidth : scaledBaseline,
                    "y2": this._isVertical ? scaledBaseline : this.availableHeight
                };

                this._applyAnimatedAttributes(this._baseline, "baseline", baselineAttr);
            };

            /**
            * Sets the baseline for the bars to the specified value.
            *
            * @param {number} value The value to position the baseline at.
            * @return {AbstractBarPlot} The calling AbstractBarPlot.
            */
            BarPlot.prototype.baseline = function (value) {
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
            * @return {AbstractBarPlot} The calling AbstractBarPlot.
            */
            BarPlot.prototype.barAlignment = function (alignment) {
                var alignmentLC = alignment.toLowerCase();
                var align2factor = this.constructor._BarAlignmentToFactor;
                if (align2factor[alignmentLC] === undefined) {
                    throw new Error("unsupported bar alignment");
                }
                this._barAlignmentFactor = align2factor[alignmentLC];

                this._render();
                return this;
            };

            BarPlot.prototype.parseExtent = function (input) {
                if (typeof (input) === "number") {
                    return { min: input, max: input };
                } else if (input instanceof Object && "min" in input && "max" in input) {
                    return input;
                } else {
                    throw new Error("input '" + input + "' can't be parsed as an IExtent");
                }
            };

            BarPlot.prototype.selectBar = function (xValOrExtent, yValOrExtent, select) {
                if (typeof select === "undefined") { select = true; }
                if (!this._isSetup) {
                    return null;
                }

                var selectedBars = [];

                var xExtent = this.parseExtent(xValOrExtent);
                var yExtent = this.parseExtent(yValOrExtent);

                // the SVGRects are positioned with sub-pixel accuracy (the default unit
                // for the x, y, height & width attributes), but user selections (e.g. via
                // mouse events) usually have pixel accuracy. A tolerance of half-a-pixel
                // seems appropriate:
                var tolerance = 0.5;

                // currently, linear scan the bars. If inversion is implemented on non-numeric scales we might be able to do better.
                this._bars.each(function (d) {
                    var bbox = this.getBBox();
                    if (bbox.x + bbox.width >= xExtent.min - tolerance && bbox.x <= xExtent.max + tolerance && bbox.y + bbox.height >= yExtent.min - tolerance && bbox.y <= yExtent.max + tolerance) {
                        selectedBars.push(this);
                    }
                });

                if (selectedBars.length > 0) {
                    var selection = d3.selectAll(selectedBars);
                    selection.classed("selected", select);
                    return selection;
                } else {
                    return null;
                }
            };

            /**
            * Deselects all bars.
            * @return {AbstractBarPlot} The calling AbstractBarPlot.
            */
            BarPlot.prototype.deselectAll = function () {
                if (this._isSetup) {
                    this._bars.classed("selected", false);
                }
                return this;
            };

            BarPlot.prototype._updateDomainer = function (scale) {
                if (scale instanceof Abstract.QuantitiveScale) {
                    var qscale = scale;
                    if (!qscale._userSetDomainer) {
                        if (this._baselineValue != null) {
                            qscale.domainer().addPaddingException(this._baselineValue, "BAR_PLOT+" + this._plottableID).addIncludedValue(this._baselineValue, "BAR_PLOT+" + this._plottableID);
                        } else {
                            qscale.domainer().removePaddingException("BAR_PLOT+" + this._plottableID).removeIncludedValue("BAR_PLOT+" + this._plottableID);
                        }
                    }

                    // prepending "BAR_PLOT" is unnecessary but reduces likely of user accidentally creating collisions
                    qscale._autoDomainIfAutomaticMode();
                }
                return this;
            };

            BarPlot.prototype._generateAttrToProjector = function () {
                var _this = this;
                // Primary scale/direction: the "length" of the bars
                // Secondary scale/direction: the "width" of the bars
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
                var primaryScale = this._isVertical ? this.yScale : this.xScale;
                var secondaryScale = this._isVertical ? this.xScale : this.yScale;
                var primaryAttr = this._isVertical ? "y" : "x";
                var secondaryAttr = this._isVertical ? "x" : "y";
                var bandsMode = (secondaryScale instanceof Plottable.Scale.Ordinal) && secondaryScale.rangeType() === "bands";
                var scaledBaseline = primaryScale.scale(this._baselineValue);
                if (attrToProjector["width"] == null) {
                    var constantWidth = bandsMode ? secondaryScale.rangeBand() : BarPlot.DEFAULT_WIDTH;
                    attrToProjector["width"] = function (d, i) {
                        return constantWidth;
                    };
                }

                var positionF = attrToProjector[secondaryAttr];
                var widthF = attrToProjector["width"];
                if (!bandsMode) {
                    attrToProjector[secondaryAttr] = function (d, i) {
                        return positionF(d, i) - widthF(d, i) * _this._barAlignmentFactor;
                    };
                } else {
                    var bandWidth = secondaryScale.rangeBand();
                    attrToProjector[secondaryAttr] = function (d, i) {
                        return positionF(d, i) - widthF(d, i) / 2 + bandWidth / 2;
                    };
                }

                var originalPositionFn = attrToProjector[primaryAttr];
                attrToProjector[primaryAttr] = function (d, i) {
                    var originalPos = originalPositionFn(d, i);

                    // If it is past the baseline, it should start at the baselin then width/height
                    // carries it over. If it's not past the baseline, leave it at original position and
                    // then width/height carries it to baseline
                    return (originalPos > scaledBaseline) ? scaledBaseline : originalPos;
                };

                attrToProjector["height"] = function (d, i) {
                    return Math.abs(scaledBaseline - originalPositionFn(d, i));
                };

                return attrToProjector;
            };
            BarPlot.DEFAULT_WIDTH = 10;

            BarPlot._BarAlignmentToFactor = {};
            return BarPlot;
        })(Abstract.XYPlot);
        Abstract.BarPlot = BarPlot;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Plot) {
        var VerticalBar = (function (_super) {
            __extends(VerticalBar, _super);
            /**
            * Creates a VerticalBarPlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {Scale} xScale The x scale to use.
            * @param {QuantitiveScale} yScale The y scale to use.
            */
            function VerticalBar(dataset, xScale, yScale) {
                _super.call(this, dataset, xScale, yScale);
                this._isVertical = true;
            }
            VerticalBar.prototype._updateYDomainer = function () {
                this._updateDomainer(this.yScale);
                return this;
            };
            VerticalBar._BarAlignmentToFactor = { "left": 0, "center": 0.5, "right": 1 };
            return VerticalBar;
        })(Plottable.Abstract.BarPlot);
        Plot.VerticalBar = VerticalBar;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
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
    (function (Plot) {
        var HorizontalBar = (function (_super) {
            __extends(HorizontalBar, _super);
            /**
            * Creates a HorizontalBarPlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {QuantitiveScale} xScale The x scale to use.
            * @param {Scale} yScale The y scale to use.
            */
            function HorizontalBar(dataset, xScale, yScale) {
                _super.call(this, dataset, xScale, yScale);
                this.isVertical = false;
            }
            HorizontalBar.prototype._updateXDomainer = function () {
                this._updateDomainer(this.xScale);
                return this;
            };

            HorizontalBar.prototype._generateAttrToProjector = function () {
                var attrToProjector = _super.prototype._generateAttrToProjector.call(this);

                // by convention, for API users the 2ndary dimension of a bar is always called its "width", so
                // the "width" of a horziontal bar plot is actually its "height" from the perspective of a svg rect
                var widthF = attrToProjector["width"];
                attrToProjector["width"] = attrToProjector["height"];
                attrToProjector["height"] = widthF;
                return attrToProjector;
            };
            HorizontalBar._BarAlignmentToFactor = { "top": 0, "center": 0.5, "bottom": 1 };
            return HorizontalBar;
        })(Plottable.Abstract.BarPlot);
        Plot.HorizontalBar = HorizontalBar;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
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
    (function (Plot) {
        var Line = (function (_super) {
            __extends(Line, _super);
            /**
            * Creates a LinePlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {Scale} xScale The x scale to use.
            * @param {Scale} yScale The y scale to use.
            */
            function Line(dataset, xScale, yScale) {
                _super.call(this, dataset, xScale, yScale);
                this._animators = {
                    "line-reset": new Plottable.Animator.Null(),
                    "line": new Plottable.Animator.Default().duration(600).easing("exp-in-out")
                };
                this.classed("line-renderer", true);
                this.project("stroke", function () {
                    return "steelblue";
                }); // default
                this.project("stroke-width", function () {
                    return "2px";
                }); // default
            }
            Line.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this.linePath = this.renderArea.append("path").classed("line", true);
                return this;
            };

            Line.prototype._getResetYFunction = function () {
                // gets the y-value generator for the animation start point
                var yDomain = this.yScale.domain();
                var domainMax = Math.max(yDomain[0], yDomain[1]);
                var domainMin = Math.min(yDomain[0], yDomain[1]);

                // start from zero, or the closest domain value to zero
                // avoids lines zooming on from offscreen.
                var startValue = 0;
                if (domainMax < 0) {
                    startValue = domainMax;
                } else if (domainMin > 0) {
                    startValue = domainMin;
                }
                var scaledStartValue = this.yScale.scale(startValue);
                return function (d, i) {
                    return scaledStartValue;
                };
            };

            Line.prototype._paint = function () {
                _super.prototype._paint.call(this);
                var attrToProjector = this._generateAttrToProjector();
                var xFunction = attrToProjector["x"];
                var yFunction = attrToProjector["y"];
                delete attrToProjector["x"];
                delete attrToProjector["y"];

                this.linePath.datum(this._dataSource.data());

                if (this._dataChanged) {
                    attrToProjector["d"] = d3.svg.line().x(xFunction).y(this._getResetYFunction());
                    this._applyAnimatedAttributes(this.linePath, "line-reset", attrToProjector);
                }

                attrToProjector["d"] = d3.svg.line().x(xFunction).y(yFunction);
                this._applyAnimatedAttributes(this.linePath, "line", attrToProjector);
            };
            return Line;
        })(Plottable.Abstract.XYPlot);
        Plot.Line = Line;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
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
    (function (Plot) {
        var Area = (function (_super) {
            __extends(Area, _super);
            /**
            * Creates an AreaPlot.
            *
            * @constructor
            * @param {IDataset} dataset The dataset to render.
            * @param {Scale} xScale The x scale to use.
            * @param {Scale} yScale The y scale to use.
            */
            function Area(dataset, xScale, yScale) {
                _super.call(this, dataset, xScale, yScale);
                this.classed("area-renderer", true);
                this.project("y0", 0, yScale); // default
                this.project("fill", function () {
                    return "steelblue";
                }); // default
                this.project("fill-opacity", function () {
                    return 0.5;
                }); // default
                this.project("stroke", function () {
                    return "none";
                }); // default
                this._animators["area-reset"] = new Plottable.Animator.Null();
                this._animators["area"] = new Plottable.Animator.Default().duration(600).easing("exp-in-out");
            }
            Area.prototype._setup = function () {
                _super.prototype._setup.call(this);
                this.areaPath = this.renderArea.append("path").classed("area", true);
                return this;
            };

            Area.prototype._onDataSourceUpdate = function () {
                _super.prototype._onDataSourceUpdate.call(this);
                if (this.yScale != null) {
                    this._updateYDomainer();
                }
            };

            Area.prototype._updateYDomainer = function () {
                _super.prototype._updateYDomainer.call(this);
                var scale = this.yScale;

                var y0Projector = this._projectors["y0"];
                var y0Accessor = y0Projector != null ? y0Projector.accessor : null;
                var extent = y0Accessor != null ? this.dataSource()._getExtent(y0Accessor) : [];
                var constantBaseline = (extent.length === 2 && extent[0] === extent[1]) ? extent[0] : null;

                if (!scale._userSetDomainer) {
                    if (constantBaseline != null) {
                        scale.domainer().addPaddingException(constantBaseline, "AREA_PLOT+" + this._plottableID);
                    } else {
                        scale.domainer().removePaddingException("AREA_PLOT+" + this._plottableID);
                    }

                    // prepending "AREA_PLOT" is unnecessary but reduces likely of user accidentally creating collisions
                    scale._autoDomainIfAutomaticMode();
                }
                return this;
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

            Area.prototype._paint = function () {
                _super.prototype._paint.call(this);
                var attrToProjector = this._generateAttrToProjector();
                var xFunction = attrToProjector["x"];
                var y0Function = attrToProjector["y0"];
                var yFunction = attrToProjector["y"];
                delete attrToProjector["x"];
                delete attrToProjector["y0"];
                delete attrToProjector["y"];

                this.areaPath.datum(this._dataSource.data());

                if (this._dataChanged) {
                    attrToProjector["d"] = d3.svg.area().x(xFunction).y0(y0Function).y1(this._getResetYFunction());
                    this._applyAnimatedAttributes(this.areaPath, "area-reset", attrToProjector);
                }

                attrToProjector["d"] = d3.svg.area().x(xFunction).y0(y0Function).y1(yFunction);
                this._applyAnimatedAttributes(this.areaPath, "area", attrToProjector);
            };
            return Area;
        })(Plot.Line);
        Plot.Area = Area;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Animator) {
        /**
        * An animator implementation with no animation. The attributes are
        * immediately set on the selection.
        */
        var Null = (function () {
            function Null() {
            }
            Null.prototype.animate = function (selection, attrToProjector, plot) {
                return selection.attr(attrToProjector);
            };
            return Null;
        })();
        Animator.Null = Null;
    })(Plottable.Animator || (Plottable.Animator = {}));
    var Animator = Plottable.Animator;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Animator) {
        /**
        * The default animator implementation with easing, duration, and delay.
        */
        var Default = (function () {
            function Default() {
                this._durationMsec = 300;
                this._delayMsec = 0;
                this._easing = "exp-out";
            }
            Default.prototype.animate = function (selection, attrToProjector, plot) {
                return selection.transition().ease(this._easing).duration(this._durationMsec).delay(this._delayMsec).attr(attrToProjector);
            };

            Default.prototype.duration = function (duration) {
                if (duration === undefined) {
                    return this._durationMsec;
                } else {
                    this._durationMsec = duration;
                    return this;
                }
            };

            Default.prototype.delay = function (delay) {
                if (delay === undefined) {
                    return this._delayMsec;
                } else {
                    this._delayMsec = delay;
                    return this;
                }
            };

            Default.prototype.easing = function (easing) {
                if (easing === undefined) {
                    return this._easing;
                } else {
                    this._easing = easing;
                    return this;
                }
            };
            return Default;
        })();
        Animator.Default = Default;
    })(Plottable.Animator || (Plottable.Animator = {}));
    var Animator = Plottable.Animator;
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
    (function (Animator) {
        /**
        * An animator that delays the animation of the attributes using the index
        * of the selection data.
        *
        * The delay between animations can be configured with the .delay getter/setter.
        */
        var IterativeDelay = (function (_super) {
            __extends(IterativeDelay, _super);
            function IterativeDelay() {
                _super.apply(this, arguments);
                this._delayMsec = 15;
            }
            IterativeDelay.prototype.animate = function (selection, attrToProjector, plot) {
                var _this = this;
                return selection.transition().ease(this._easing).duration(this._durationMsec).delay(function (d, i) {
                    return i * _this._delayMsec;
                }).attr(attrToProjector);
            };
            return IterativeDelay;
        })(Animator.Default);
        Animator.IterativeDelay = IterativeDelay;
    })(Plottable.Animator || (Plottable.Animator = {}));
    var Animator = Plottable.Animator;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Core) {
        (function (KeyEventListener) {
            var _initialized = false;
            var _callbacks = [];

            function initialize() {
                if (_initialized) {
                    return;
                }
                d3.select(document).on("keydown", processEvent);
                _initialized = true;
            }
            KeyEventListener.initialize = initialize;

            function addCallback(keyCode, cb) {
                if (!_initialized) {
                    initialize();
                }

                if (_callbacks[keyCode] == null) {
                    _callbacks[keyCode] = [];
                }

                _callbacks[keyCode].push(cb);
            }
            KeyEventListener.addCallback = addCallback;

            function processEvent() {
                if (_callbacks[d3.event.keyCode] == null) {
                    return;
                }

                _callbacks[d3.event.keyCode].forEach(function (cb) {
                    cb(d3.event);
                });
            }
        })(Core.KeyEventListener || (Core.KeyEventListener = {}));
        var KeyEventListener = Core.KeyEventListener;
    })(Plottable.Core || (Plottable.Core = {}));
    var Core = Plottable.Core;
})(Plottable || (Plottable = {}));

///<reference path="../reference.ts" />
var Plottable;
(function (Plottable) {
    (function (Abstract) {
        var Interaction = (function () {
            /**
            * Creates an Interaction.
            *
            * @constructor
            * @param {Component} componentToListenTo The component to listen for interactions on.
            */
            function Interaction(componentToListenTo) {
                if (componentToListenTo == null) {
                    throw new Error("Interactions require a component to listen to");
                }
                this.componentToListenTo = componentToListenTo;
            }
            Interaction.prototype._anchor = function (hitBox) {
                this.hitBox = hitBox;
            };

            /**
            * Registers the Interaction on the Component it's listening to.
            * This needs to be called to activate the interaction.
            */
            Interaction.prototype.registerWithComponent = function () {
                this.componentToListenTo.registerInteraction(this);
                return this;
            };
            return Interaction;
        })();
        Abstract.Interaction = Interaction;
    })(Plottable.Abstract || (Plottable.Abstract = {}));
    var Abstract = Plottable.Abstract;
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
    (function (Interaction) {
        var Click = (function (_super) {
            __extends(Click, _super);
            /**
            * Creates a ClickInteraction.
            *
            * @constructor
            * @param {Component} componentToListenTo The component to listen for clicks on.
            */
            function Click(componentToListenTo) {
                _super.call(this, componentToListenTo);
            }
            Click.prototype._anchor = function (hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, hitBox);
                hitBox.on(this._listenTo(), function () {
                    var xy = d3.mouse(hitBox.node());
                    var x = xy[0];
                    var y = xy[1];
                    _this._callback(x, y);
                });
            };

            Click.prototype._listenTo = function () {
                return "click";
            };

            /**
            * Sets an callback to be called when a click is received.
            *
            * @param {(x: number, y: number) => any} cb: Callback to be called. Takes click x and y in pixels.
            */
            Click.prototype.callback = function (cb) {
                this._callback = cb;
                return this;
            };
            return Click;
        })(Plottable.Abstract.Interaction);
        Interaction.Click = Click;

        var DoubleClick = (function (_super) {
            __extends(DoubleClick, _super);
            /**
            * Creates a DoubleClickInteraction.
            *
            * @constructor
            * @param {Component} componentToListenTo The component to listen for clicks on.
            */
            function DoubleClick(componentToListenTo) {
                _super.call(this, componentToListenTo);
            }
            DoubleClick.prototype._listenTo = function () {
                return "dblclick";
            };
            return DoubleClick;
        })(Click);
        Interaction.DoubleClick = DoubleClick;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var Mousemove = (function (_super) {
            __extends(Mousemove, _super);
            function Mousemove(componentToListenTo) {
                _super.call(this, componentToListenTo);
            }
            Mousemove.prototype._anchor = function (hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, hitBox);
                hitBox.on("mousemove", function () {
                    var xy = d3.mouse(hitBox.node());
                    var x = xy[0];
                    var y = xy[1];
                    _this.mousemove(x, y);
                });
            };

            Mousemove.prototype.mousemove = function (x, y) {
                return;
            };
            return Mousemove;
        })(Plottable.Abstract.Interaction);
        Interaction.Mousemove = Mousemove;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var Key = (function (_super) {
            __extends(Key, _super);
            /**
            * Creates a KeyInteraction.
            *
            * @constructor
            * @param {Component} componentToListenTo The component to listen for keypresses on.
            * @param {number} keyCode The key code to listen for.
            */
            function Key(componentToListenTo, keyCode) {
                _super.call(this, componentToListenTo);
                this.activated = false;
                this.keyCode = keyCode;
            }
            Key.prototype._anchor = function (hitBox) {
                var _this = this;
                _super.prototype._anchor.call(this, hitBox);
                hitBox.on("mouseover", function () {
                    _this.activated = true;
                });
                hitBox.on("mouseout", function () {
                    _this.activated = false;
                });

                Plottable.Core.KeyEventListener.addCallback(this.keyCode, function (e) {
                    if (_this.activated && _this._callback != null) {
                        _this._callback();
                    }
                });
            };

            /**
            * Sets an callback to be called when the designated key is pressed.
            *
            * @param {() => any} cb: Callback to be called.
            */
            Key.prototype.callback = function (cb) {
                this._callback = cb;
                return this;
            };
            return Key;
        })(Plottable.Abstract.Interaction);
        Interaction.Key = Key;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var PanZoom = (function (_super) {
            __extends(PanZoom, _super);
            /**
            * Creates a PanZoomInteraction.
            *
            * @constructor
            * @param {Component} componentToListenTo The component to listen for interactions on.
            * @param {QuantitiveScale} xScale The X scale to update on panning/zooming.
            * @param {QuantitiveScale} yScale The Y scale to update on panning/zooming.
            */
            function PanZoom(componentToListenTo, xScale, yScale) {
                var _this = this;
                _super.call(this, componentToListenTo);
                if (xScale == null || yScale == null) {
                    throw new Error("panZoomInteractions require an xScale and yScale");
                }
                this.xScale = xScale;
                this.yScale = yScale;
                this.zoom = d3.behavior.zoom();
                this.zoom.x(this.xScale._d3Scale);
                this.zoom.y(this.yScale._d3Scale);
                this.zoom.on("zoom", function () {
                    return _this.rerenderZoomed();
                });
            }
            PanZoom.prototype.resetZoom = function () {
                var _this = this;
                // HACKHACK #254
                this.zoom = d3.behavior.zoom();
                this.zoom.x(this.xScale._d3Scale);
                this.zoom.y(this.yScale._d3Scale);
                this.zoom.on("zoom", function () {
                    return _this.rerenderZoomed();
                });
                this.zoom(this.hitBox);
            };

            PanZoom.prototype._anchor = function (hitBox) {
                _super.prototype._anchor.call(this, hitBox);
                this.zoom(hitBox);
            };

            PanZoom.prototype.rerenderZoomed = function () {
                // HACKHACK since the d3.zoom.x modifies d3 scales and not our TS scales, and the TS scales have the
                // event listener machinery, let's grab the domain out of the d3 scale and pipe it back into the TS scale
                var xDomain = this.xScale._d3Scale.domain();
                var yDomain = this.yScale._d3Scale.domain();
                this.xScale.domain(xDomain);
                this.yScale.domain(yDomain);
            };
            return PanZoom;
        })(Plottable.Abstract.Interaction);
        Interaction.PanZoom = PanZoom;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var Drag = (function (_super) {
            __extends(Drag, _super);
            /**
            * Creates a Drag.
            *
            * @param {Component} componentToListenTo The component to listen for interactions on.
            */
            function Drag(componentToListenTo) {
                var _this = this;
                _super.call(this, componentToListenTo);
                this.dragInitialized = false;
                this.origin = [0, 0];
                this.location = [0, 0];
                this.dragBehavior = d3.behavior.drag();
                this.dragBehavior.on("dragstart", function () {
                    return _this._dragstart();
                });
                this.dragBehavior.on("drag", function () {
                    return _this._drag();
                });
                this.dragBehavior.on("dragend", function () {
                    return _this._dragend();
                });
            }
            /**
            * Adds a callback to be called when the AreaInteraction triggers.
            *
            * @param {(a: SelectionArea) => any} cb The function to be called. Takes in a SelectionArea in pixels.
            * @returns {AreaInteraction} The calling AreaInteraction.
            */
            Drag.prototype.callback = function (cb) {
                this.callbackToCall = cb;
                return this;
            };

            Drag.prototype._dragstart = function () {
                var availableWidth = this.componentToListenTo.availableWidth;
                var availableHeight = this.componentToListenTo.availableHeight;

                // the constraint functions ensure that the selection rectangle will not exceed the hit box
                var constraintFunction = function (min, max) {
                    return function (x) {
                        return Math.min(Math.max(x, min), max);
                    };
                };
                this.constrainX = constraintFunction(0, availableWidth);
                this.constrainY = constraintFunction(0, availableHeight);
            };

            Drag.prototype._drag = function () {
                if (!this.dragInitialized) {
                    this.origin = [d3.event.x, d3.event.y];
                    this.dragInitialized = true;
                }

                this.location = [this.constrainX(d3.event.x), this.constrainY(d3.event.y)];
            };

            Drag.prototype._dragend = function () {
                if (!this.dragInitialized) {
                    return;
                }
                this.dragInitialized = false;
                this._doDragend();
            };

            Drag.prototype._doDragend = function () {
                // seperated out so it can be over-ridden by dragInteractions that want to pass out diff information
                // eg just x values for an xSelectionInteraction
                if (this.callbackToCall != null) {
                    this.callbackToCall([this.origin, this.location]);
                }
            };

            Drag.prototype._anchor = function (hitBox) {
                _super.prototype._anchor.call(this, hitBox);
                hitBox.call(this.dragBehavior);
                return this;
            };

            Drag.prototype.setupZoomCallback = function (xScale, yScale) {
                var xDomainOriginal = xScale != null ? xScale.domain() : null;
                var yDomainOriginal = yScale != null ? yScale.domain() : null;
                var resetOnNextClick = false;
                function callback(pixelArea) {
                    if (pixelArea == null) {
                        if (resetOnNextClick) {
                            if (xScale != null) {
                                xScale.domain(xDomainOriginal);
                            }
                            if (yScale != null) {
                                yScale.domain(yDomainOriginal);
                            }
                        }
                        resetOnNextClick = !resetOnNextClick;
                        return;
                    }
                    resetOnNextClick = false;
                    if (xScale != null) {
                        xScale.domain([xScale.invert(pixelArea.xMin), xScale.invert(pixelArea.xMax)]);
                    }
                    if (yScale != null) {
                        yScale.domain([yScale.invert(pixelArea.yMax), yScale.invert(pixelArea.yMin)]);
                    }
                    this.clearBox();
                    return;
                }
                this.callback(callback);
                return this;
            };
            return Drag;
        })(Plottable.Abstract.Interaction);
        Interaction.Drag = Drag;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var DragBox = (function (_super) {
            __extends(DragBox, _super);
            function DragBox() {
                _super.apply(this, arguments);
                this.boxIsDrawn = false;
            }
            DragBox.prototype._dragstart = function () {
                _super.prototype._dragstart.call(this);
                if (this.callbackToCall != null) {
                    this.callbackToCall(null);
                }
                this.clearBox();
            };

            /**
            * Clears the highlighted drag-selection box drawn by the AreaInteraction.
            *
            * @returns {AreaInteraction} The calling AreaInteraction.
            */
            DragBox.prototype.clearBox = function () {
                if (this.dragBox == null) {
                    return;
                }
                this.dragBox.attr("height", 0).attr("width", 0);
                this.boxIsDrawn = false;
                return this;
            };

            DragBox.prototype.setBox = function (x0, x1, y0, y1) {
                if (this.dragBox == null) {
                    return;
                }
                var w = Math.abs(x0 - x1);
                var h = Math.abs(y0 - y1);
                var xo = Math.min(x0, x1);
                var yo = Math.min(y0, y1);
                this.dragBox.attr({ x: xo, y: yo, width: w, height: h });
                this.boxIsDrawn = (w > 0 && h > 0);
                return this;
            };

            DragBox.prototype._anchor = function (hitBox) {
                _super.prototype._anchor.call(this, hitBox);
                var cname = DragBox.CLASS_DRAG_BOX;
                var foreground = this.componentToListenTo.foregroundContainer;
                this.dragBox = foreground.append("rect").classed(cname, true).attr("x", 0).attr("y", 0);
                return this;
            };
            DragBox.CLASS_DRAG_BOX = "drag-box";
            return DragBox;
        })(Interaction.Drag);
        Interaction.DragBox = DragBox;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var XDragBox = (function (_super) {
            __extends(XDragBox, _super);
            function XDragBox() {
                _super.apply(this, arguments);
            }
            XDragBox.prototype._drag = function () {
                _super.prototype._drag.call(this);
                this.setBox(this.origin[0], this.location[0]);
            };

            XDragBox.prototype._doDragend = function () {
                if (this.callbackToCall == null) {
                    return;
                }
                var xMin = Math.min(this.origin[0], this.location[0]);
                var xMax = Math.max(this.origin[0], this.location[0]);
                var pixelArea = { xMin: xMin, xMax: xMax };
                this.callbackToCall(pixelArea);
            };

            XDragBox.prototype.setBox = function (x0, x1) {
                _super.prototype.setBox.call(this, x0, x1, 0, this.componentToListenTo.availableHeight);
                return this;
            };
            return XDragBox;
        })(Interaction.DragBox);
        Interaction.XDragBox = XDragBox;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var XYDragBox = (function (_super) {
            __extends(XYDragBox, _super);
            function XYDragBox() {
                _super.apply(this, arguments);
            }
            XYDragBox.prototype._drag = function () {
                _super.prototype._drag.call(this);
                this.setBox(this.origin[0], this.location[0], this.origin[1], this.location[1]);
            };

            XYDragBox.prototype._doDragend = function () {
                if (this.callbackToCall == null) {
                    return;
                }
                var xMin = Math.min(this.origin[0], this.location[0]);
                var xMax = Math.max(this.origin[0], this.location[0]);
                var yMin = Math.min(this.origin[1], this.location[1]);
                var yMax = Math.max(this.origin[1], this.location[1]);
                var pixelArea = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
                this.callbackToCall(pixelArea);
            };
            return XYDragBox;
        })(Interaction.DragBox);
        Interaction.XYDragBox = XYDragBox;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Interaction) {
        var YDragBox = (function (_super) {
            __extends(YDragBox, _super);
            function YDragBox() {
                _super.apply(this, arguments);
            }
            YDragBox.prototype._drag = function () {
                _super.prototype._drag.call(this);
                this.setBox(this.origin[1], this.location[1]);
            };

            YDragBox.prototype._doDragend = function () {
                if (this.callbackToCall == null) {
                    return;
                }
                var yMin = Math.min(this.origin[1], this.location[1]);
                var yMax = Math.max(this.origin[1], this.location[1]);
                var pixelArea = { yMin: yMin, yMax: yMax };
                this.callbackToCall(pixelArea);
            };

            YDragBox.prototype.setBox = function (y0, y1) {
                _super.prototype.setBox.call(this, 0, this.componentToListenTo.availableWidth, y0, y1);
                return this;
            };
            return YDragBox;
        })(Interaction.DragBox);
        Interaction.YDragBox = YDragBox;
    })(Plottable.Interaction || (Plottable.Interaction = {}));
    var Interaction = Plottable.Interaction;
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
    (function (Template) {
        var StandardChart = (function (_super) {
            __extends(StandardChart, _super);
            function StandardChart() {
                _super.call(this);
                this.xTable = new Plottable.Component.Table();
                this.yTable = new Plottable.Component.Table();
                this.centerComponent = new Plottable.Component.Group();
                this.xyTable = new Plottable.Component.Table().addComponent(0, 0, this.yTable).addComponent(1, 1, this.xTable).addComponent(0, 1, this.centerComponent);
                this.addComponent(1, 0, this.xyTable);
            }
            StandardChart.prototype.yAxis = function (y) {
                if (y != null) {
                    if (this._yAxis != null) {
                        throw new Error("yAxis already assigned!");
                    }
                    this._yAxis = y;
                    this.yTable.addComponent(0, 1, this._yAxis);
                    return this;
                } else {
                    return this._yAxis;
                }
            };

            StandardChart.prototype.xAxis = function (x) {
                if (x != null) {
                    if (this._xAxis != null) {
                        throw new Error("xAxis already assigned!");
                    }
                    this._xAxis = x;
                    this.xTable.addComponent(0, 0, this._xAxis);
                    return this;
                } else {
                    return this._xAxis;
                }
            };

            StandardChart.prototype.yLabel = function (y) {
                if (y != null) {
                    if (this._yLabel != null) {
                        if (typeof (y) === "string") {
                            this._yLabel.text(y);
                            return this;
                        } else {
                            throw new Error("yLabel already assigned!");
                        }
                    }
                    if (typeof (y) === "string") {
                        y = new Plottable.Component.AxisLabel(y, "vertical-left");
                    }
                    this._yLabel = y;
                    this.yTable.addComponent(0, 0, this._yLabel);
                    return this;
                } else {
                    return this._yLabel;
                }
            };

            StandardChart.prototype.xLabel = function (x) {
                if (x != null) {
                    if (this._xLabel != null) {
                        if (typeof (x) === "string") {
                            this._xLabel.text(x);
                            return this;
                        } else {
                            throw new Error("xLabel already assigned!");
                        }
                    }
                    if (typeof (x) === "string") {
                        x = new Plottable.Component.AxisLabel(x, "horizontal");
                    }
                    this._xLabel = x;
                    this.xTable.addComponent(1, 0, this._xLabel);
                    return this;
                } else {
                    return this._xLabel;
                }
            };

            StandardChart.prototype.titleLabel = function (x) {
                if (x != null) {
                    if (this._titleLabel != null) {
                        if (typeof (x) === "string") {
                            this._titleLabel.text(x);
                            return this;
                        } else {
                            throw new Error("titleLabel already assigned!");
                        }
                    }
                    if (typeof (x) === "string") {
                        x = new Plottable.Component.TitleLabel(x, "horizontal");
                    }
                    this._titleLabel = x;
                    this.addComponent(0, 0, this._titleLabel);
                    return this;
                } else {
                    return this._titleLabel;
                }
            };

            StandardChart.prototype.center = function (c) {
                this.centerComponent.merge(c);
                return this;
            };
            return StandardChart;
        })(Plottable.Component.Table);
        Template.StandardChart = StandardChart;
    })(Plottable.Template || (Plottable.Template = {}));
    var Template = Plottable.Template;
})(Plottable || (Plottable = {}));
