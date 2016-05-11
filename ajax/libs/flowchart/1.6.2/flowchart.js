// flowchart.js, v1.6.2
// Copyright (c)yyyy Adriano Raiano (adrai).
// Distributed under MIT license
// http://adrai.github.io/flowchart.js

!function(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(require("Raphael")); else if ("function" == typeof define && define.amd) define([ "Raphael" ], factory); else {
        var a = factory("object" == typeof exports ? require("Raphael") : root.Raphael);
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
    }
}(this, function(__WEBPACK_EXTERNAL_MODULE_15__) {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /*!******************!*\
  !*** ./index.js ***!
  \******************/
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(/*! ./src/flowchart.shim */ 8);
        var parse = __webpack_require__(/*! ./src/flowchart.parse */ 4);
        __webpack_require__(/*! ./src/jquery-plugin */ 14);
        var FlowChart = {
            parse: parse
        };
        "undefined" != typeof window && (window.flowchart = FlowChart), module.exports = FlowChart;
    }, /* 1 */
    /*!**********************************!*\
  !*** ./src/flowchart.helpers.js ***!
  \**********************************/
    /***/
    function(module, exports) {
        function _defaults(options, defaultOptions) {
            if (!options || "function" == typeof options) return defaultOptions;
            var merged = {};
            for (var attrname in defaultOptions) merged[attrname] = defaultOptions[attrname];
            for (attrname in options) options[attrname] && ("object" == typeof merged[attrname] ? merged[attrname] = _defaults(merged[attrname], options[attrname]) : merged[attrname] = options[attrname]);
            return merged;
        }
        function _inherits(ctor, superCtor) {
            if ("function" == typeof Object.create) // implementation from standard node.js 'util' module
            ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }); else {
                // old school shim for old browsers
                ctor.super_ = superCtor;
                var TempCtor = function() {};
                TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
            }
        }
        // move dependent functions to a container so that
        // they can be overriden easier in no jquery environment (node.js)
        module.exports = {
            defaults: _defaults,
            inherits: _inherits
        };
    }, /* 2 */
    /*!*********************************!*\
  !*** ./src/flowchart.symbol.js ***!
  \*********************************/
    /***/
    function(module, exports, __webpack_require__) {
        function Symbol(chart, options, symbol) {
            this.chart = chart, this.group = this.chart.paper.set(), this.symbol = symbol, this.connectedTo = [], 
            this.symbolType = options.symbolType, this.flowstate = options.flowstate || "future", 
            this.next_direction = options.next && options.direction_next ? options.direction_next : void 0, 
            this.text = this.chart.paper.text(0, 0, options.text), //Raphael does not support the svg group tag so setting the text node id to the symbol node id plus t
            options.key && (this.text.node.id = options.key + "t"), this.text.node.setAttribute("class", this.getAttr("class") + "t"), 
            this.text.attr({
                "text-anchor": "start",
                x: this.getAttr("text-margin"),
                fill: this.getAttr("font-color"),
                "font-size": this.getAttr("font-size")
            });
            var font = this.getAttr("font"), fontF = this.getAttr("font-family"), fontW = this.getAttr("font-weight");
            font && this.text.attr({
                font: font
            }), fontF && this.text.attr({
                "font-family": fontF
            }), fontW && this.text.attr({
                "font-weight": fontW
            }), options.link && this.text.attr("href", options.link), options.target && this.text.attr("target", options.target);
            var maxWidth = this.getAttr("maxWidth");
            if (maxWidth) {
                for (var words = options.text.split(" "), tempText = "", i = 0, ii = words.length; ii > i; i++) {
                    var word = words[i];
                    this.text.attr("text", tempText + " " + word), tempText += this.text.getBBox().width > maxWidth ? "\n" + word : " " + word;
                }
                this.text.attr("text", tempText.substring(1));
            }
            if (this.group.push(this.text), symbol) {
                var tmpMargin = this.getAttr("text-margin");
                symbol.attr({
                    fill: this.getAttr("fill"),
                    stroke: this.getAttr("element-color"),
                    "stroke-width": this.getAttr("line-width"),
                    width: this.text.getBBox().width + 2 * tmpMargin,
                    height: this.text.getBBox().height + 2 * tmpMargin
                }), symbol.node.setAttribute("class", this.getAttr("class")), options.link && symbol.attr("href", options.link), 
                options.target && symbol.attr("target", options.target), options.key && (symbol.node.id = options.key), 
                this.group.push(symbol), symbol.insertBefore(this.text), this.text.attr({
                    y: symbol.getBBox().height / 2
                }), this.initialize();
            }
        }
        var drawAPI = __webpack_require__(/*! ./flowchart.functions */ 3), drawLine = drawAPI.drawLine, checkLineIntersection = drawAPI.checkLineIntersection;
        /* Gets the attribute based on Flowstate, Symbol-Name and default, first found wins */
        Symbol.prototype.getAttr = function(attName) {
            if (this.chart) {
                var opt1, opt3 = this.chart.options ? this.chart.options[attName] : void 0, opt2 = this.chart.options.symbols ? this.chart.options.symbols[this.symbolType][attName] : void 0;
                return this.chart.options.flowstate && this.chart.options.flowstate[this.flowstate] && (opt1 = this.chart.options.flowstate[this.flowstate][attName]), 
                opt1 || opt2 || opt3;
            }
        }, Symbol.prototype.initialize = function() {
            this.group.transform("t" + this.getAttr("line-width") + "," + this.getAttr("line-width")), 
            this.width = this.group.getBBox().width, this.height = this.group.getBBox().height;
        }, Symbol.prototype.getCenter = function() {
            return {
                x: this.getX() + this.width / 2,
                y: this.getY() + this.height / 2
            };
        }, Symbol.prototype.getX = function() {
            return this.group.getBBox().x;
        }, Symbol.prototype.getY = function() {
            return this.group.getBBox().y;
        }, Symbol.prototype.shiftX = function(x) {
            this.group.transform("t" + (this.getX() + x) + "," + this.getY());
        }, Symbol.prototype.setX = function(x) {
            this.group.transform("t" + x + "," + this.getY());
        }, Symbol.prototype.shiftY = function(y) {
            this.group.transform("t" + this.getX() + "," + (this.getY() + y));
        }, Symbol.prototype.setY = function(y) {
            this.group.transform("t" + this.getX() + "," + y);
        }, Symbol.prototype.getTop = function() {
            var y = this.getY(), x = this.getX() + this.width / 2;
            return {
                x: x,
                y: y
            };
        }, Symbol.prototype.getBottom = function() {
            var y = this.getY() + this.height, x = this.getX() + this.width / 2;
            return {
                x: x,
                y: y
            };
        }, Symbol.prototype.getLeft = function() {
            var y = this.getY() + this.group.getBBox().height / 2, x = this.getX();
            return {
                x: x,
                y: y
            };
        }, Symbol.prototype.getRight = function() {
            var y = this.getY() + this.group.getBBox().height / 2, x = this.getX() + this.group.getBBox().width;
            return {
                x: x,
                y: y
            };
        }, Symbol.prototype.render = function() {
            if (this.next) {
                var lineLength = this.getAttr("line-length");
                if ("right" === this.next_direction) {
                    var rightPoint = this.getRight();
                    if (!this.next.isPositioned) {
                        this.next.setY(rightPoint.y - this.next.height / 2), this.next.shiftX(this.group.getBBox().x + this.width + lineLength);
                        var self = this;
                        !function shift() {
                            for (var symb, hasSymbolUnder = !1, i = 0, len = self.chart.symbols.length; len > i; i++) {
                                symb = self.chart.symbols[i];
                                var diff = Math.abs(symb.getCenter().x - self.next.getCenter().x);
                                if (symb.getCenter().y > self.next.getCenter().y && diff <= self.next.width / 2) {
                                    hasSymbolUnder = !0;
                                    break;
                                }
                            }
                            hasSymbolUnder && (self.next.setX(symb.getX() + symb.width + lineLength), shift());
                        }(), this.next.isPositioned = !0, this.next.render();
                    }
                } else {
                    var bottomPoint = this.getBottom();
                    this.next.isPositioned || (this.next.shiftY(this.getY() + this.height + lineLength), 
                    this.next.setX(bottomPoint.x - this.next.width / 2), this.next.isPositioned = !0, 
                    this.next.render());
                }
            }
        }, Symbol.prototype.renderLines = function() {
            this.next && (this.next_direction ? this.drawLineTo(this.next, "", this.next_direction) : this.drawLineTo(this.next));
        }, Symbol.prototype.drawLineTo = function(symbol, text, origin) {
            this.connectedTo.indexOf(symbol) < 0 && this.connectedTo.push(symbol);
            var line, x = this.getCenter().x, y = this.getCenter().y, right = this.getRight(), bottom = this.getBottom(), left = this.getLeft(), symbolX = symbol.getCenter().x, symbolY = symbol.getCenter().y, symbolTop = symbol.getTop(), symbolRight = symbol.getRight(), symbolLeft = symbol.getLeft(), isOnSameColumn = x === symbolX, isOnSameLine = y === symbolY, isUnder = symbolY > y, isUpper = y > symbolY, isLeft = x > symbolX, isRight = symbolX > x, maxX = 0, lineLength = this.getAttr("line-length"), lineWith = this.getAttr("line-width");
            if (origin && "bottom" !== origin || !isOnSameColumn || !isUnder) if (origin && "right" !== origin || !isOnSameLine || !isRight) if (origin && "left" !== origin || !isOnSameLine || !isLeft) if (origin && "right" !== origin || !isOnSameColumn || !isUpper) if (origin && "right" !== origin || !isOnSameColumn || !isUnder) if (origin && "bottom" !== origin || !isLeft) if (origin && "bottom" !== origin || !isRight) if (origin && "right" === origin && isLeft) line = drawLine(this.chart, right, [ {
                x: right.x + lineLength / 2,
                y: right.y
            }, {
                x: right.x + lineLength / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.rightStart = !0, symbol.topEnd = !0, maxX = right.x + lineLength / 2; else if (origin && "right" === origin && isRight) line = drawLine(this.chart, right, [ {
                x: symbolTop.x,
                y: right.y
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.rightStart = !0, symbol.topEnd = !0, maxX = right.x + lineLength / 2; else if (origin && "bottom" === origin && isOnSameColumn && isUpper) line = drawLine(this.chart, bottom, [ {
                x: bottom.x,
                y: bottom.y + lineLength / 2
            }, {
                x: right.x + lineLength / 2,
                y: bottom.y + lineLength / 2
            }, {
                x: right.x + lineLength / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.bottomStart = !0, symbol.topEnd = !0, maxX = bottom.x + lineLength / 2; else if ("left" === origin && isOnSameColumn && isUpper) {
                var diffX = left.x - lineLength / 2;
                symbolLeft.x < left.x && (diffX = symbolLeft.x - lineLength / 2), line = drawLine(this.chart, left, [ {
                    x: diffX,
                    y: left.y
                }, {
                    x: diffX,
                    y: symbolTop.y - lineLength / 2
                }, {
                    x: symbolTop.x,
                    y: symbolTop.y - lineLength / 2
                }, {
                    x: symbolTop.x,
                    y: symbolTop.y
                } ], text), this.leftStart = !0, symbol.topEnd = !0, maxX = left.x;
            } else "left" === origin && (line = drawLine(this.chart, left, [ {
                x: symbolTop.x + (left.x - symbolTop.x) / 2,
                y: left.y
            }, {
                x: symbolTop.x + (left.x - symbolTop.x) / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.leftStart = !0, symbol.topEnd = !0, maxX = left.x); else line = drawLine(this.chart, bottom, [ {
                x: bottom.x,
                y: bottom.y + lineLength / 2
            }, {
                x: bottom.x + (bottom.x - symbolTop.x) / 2,
                y: bottom.y + lineLength / 2
            }, {
                x: bottom.x + (bottom.x - symbolTop.x) / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.bottomStart = !0, symbol.topEnd = !0, maxX = bottom.x + (bottom.x - symbolTop.x) / 2; else line = this.leftEnd && isUpper ? drawLine(this.chart, bottom, [ {
                x: bottom.x,
                y: bottom.y + lineLength / 2
            }, {
                x: bottom.x + (bottom.x - symbolTop.x) / 2,
                y: bottom.y + lineLength / 2
            }, {
                x: bottom.x + (bottom.x - symbolTop.x) / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text) : drawLine(this.chart, bottom, [ {
                x: bottom.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.bottomStart = !0, symbol.topEnd = !0, maxX = bottom.x + (bottom.x - symbolTop.x) / 2; else line = drawLine(this.chart, right, [ {
                x: right.x + lineLength / 2,
                y: right.y
            }, {
                x: right.x + lineLength / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.rightStart = !0, symbol.topEnd = !0, maxX = right.x + lineLength / 2; else line = drawLine(this.chart, right, [ {
                x: right.x + lineLength / 2,
                y: right.y
            }, {
                x: right.x + lineLength / 2,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y - lineLength / 2
            }, {
                x: symbolTop.x,
                y: symbolTop.y
            } ], text), this.rightStart = !0, symbol.topEnd = !0, maxX = right.x + lineLength / 2; else line = drawLine(this.chart, left, symbolRight, text), 
            this.leftStart = !0, symbol.rightEnd = !0, maxX = symbolRight.x; else line = drawLine(this.chart, right, symbolLeft, text), 
            this.rightStart = !0, symbol.leftEnd = !0, maxX = symbolLeft.x; else line = drawLine(this.chart, bottom, symbolTop, text), 
            this.bottomStart = !0, symbol.topEnd = !0, maxX = bottom.x;
            if (line) {
                for (var l = 0, llen = this.chart.lines.length; llen > l; l++) for (var len, otherLine = this.chart.lines[l], ePath = otherLine.attr("path"), lPath = line.attr("path"), iP = 0, lenP = ePath.length - 1; lenP > iP; iP++) {
                    var newPath = [];
                    newPath.push([ "M", ePath[iP][1], ePath[iP][2] ]), newPath.push([ "L", ePath[iP + 1][1], ePath[iP + 1][2] ]);
                    for (var line1_from_x = newPath[0][1], line1_from_y = newPath[0][2], line1_to_x = newPath[1][1], line1_to_y = newPath[1][2], lP = 0, lenlP = lPath.length - 1; lenlP > lP; lP++) {
                        var newLinePath = [];
                        newLinePath.push([ "M", lPath[lP][1], lPath[lP][2] ]), newLinePath.push([ "L", lPath[lP + 1][1], lPath[lP + 1][2] ]);
                        var line2_from_x = newLinePath[0][1], line2_from_y = newLinePath[0][2], line2_to_x = newLinePath[1][1], line2_to_y = newLinePath[1][2], res = checkLineIntersection(line1_from_x, line1_from_y, line1_to_x, line1_to_y, line2_from_x, line2_from_y, line2_to_x, line2_to_y);
                        if (res.onLine1 && res.onLine2) {
                            var newSegment;
                            line2_from_y === line2_to_y ? line2_from_x > line2_to_x ? (newSegment = [ "L", res.x + 2 * lineWith, line2_from_y ], 
                            lPath.splice(lP + 1, 0, newSegment), newSegment = [ "C", res.x + 2 * lineWith, line2_from_y, res.x, line2_from_y - 4 * lineWith, res.x - 2 * lineWith, line2_from_y ], 
                            lPath.splice(lP + 2, 0, newSegment), line.attr("path", lPath)) : (newSegment = [ "L", res.x - 2 * lineWith, line2_from_y ], 
                            lPath.splice(lP + 1, 0, newSegment), newSegment = [ "C", res.x - 2 * lineWith, line2_from_y, res.x, line2_from_y - 4 * lineWith, res.x + 2 * lineWith, line2_from_y ], 
                            lPath.splice(lP + 2, 0, newSegment), line.attr("path", lPath)) : line2_from_y > line2_to_y ? (newSegment = [ "L", line2_from_x, res.y + 2 * lineWith ], 
                            lPath.splice(lP + 1, 0, newSegment), newSegment = [ "C", line2_from_x, res.y + 2 * lineWith, line2_from_x + 4 * lineWith, res.y, line2_from_x, res.y - 2 * lineWith ], 
                            lPath.splice(lP + 2, 0, newSegment), line.attr("path", lPath)) : (newSegment = [ "L", line2_from_x, res.y - 2 * lineWith ], 
                            lPath.splice(lP + 1, 0, newSegment), newSegment = [ "C", line2_from_x, res.y - 2 * lineWith, line2_from_x + 4 * lineWith, res.y, line2_from_x, res.y + 2 * lineWith ], 
                            lPath.splice(lP + 2, 0, newSegment), line.attr("path", lPath)), lP += 2, len += 2;
                        }
                    }
                }
                this.chart.lines.push(line);
            }
            (!this.chart.maxXFromLine || this.chart.maxXFromLine && maxX > this.chart.maxXFromLine) && (this.chart.maxXFromLine = maxX);
        }, module.exports = Symbol;
    }, /* 3 */
    /*!************************************!*\
  !*** ./src/flowchart.functions.js ***!
  \************************************/
    /***/
    function(module, exports) {
        function drawPath(chart, location, points) {
            var i, len, path = "M{0},{1}";
            for (i = 2, len = 2 * points.length + 2; len > i; i += 2) path += " L{" + i + "},{" + (i + 1) + "}";
            var pathValues = [ location.x, location.y ];
            for (i = 0, len = points.length; len > i; i++) pathValues.push(points[i].x), pathValues.push(points[i].y);
            var symbol = chart.paper.path(path, pathValues);
            symbol.attr("stroke", chart.options["element-color"]), symbol.attr("stroke-width", chart.options["line-width"]);
            var font = chart.options.font, fontF = chart.options["font-family"], fontW = chart.options["font-weight"];
            return font && symbol.attr({
                font: font
            }), fontF && symbol.attr({
                "font-family": fontF
            }), fontW && symbol.attr({
                "font-weight": fontW
            }), symbol;
        }
        function drawLine(chart, from, to, text) {
            var i, len;
            "[object Array]" !== Object.prototype.toString.call(to) && (to = [ to ]);
            var path = "M{0},{1}";
            for (i = 2, len = 2 * to.length + 2; len > i; i += 2) path += " L{" + i + "},{" + (i + 1) + "}";
            var pathValues = [ from.x, from.y ];
            for (i = 0, len = to.length; len > i; i++) pathValues.push(to[i].x), pathValues.push(to[i].y);
            var line = chart.paper.path(path, pathValues);
            line.attr({
                stroke: chart.options["line-color"],
                "stroke-width": chart.options["line-width"],
                "arrow-end": chart.options["arrow-end"]
            });
            var font = chart.options.font, fontF = chart.options["font-family"], fontW = chart.options["font-weight"];
            if (font && line.attr({
                font: font
            }), fontF && line.attr({
                "font-family": fontF
            }), fontW && line.attr({
                "font-weight": fontW
            }), text) {
                var centerText = !1, textPath = chart.paper.text(0, 0, text), isHorizontal = !1, firstTo = to[0];
                from.y === firstTo.y && (isHorizontal = !0);
                var x = 0, y = 0;
                centerText ? (x = from.x > firstTo.x ? from.x - (from.x - firstTo.x) / 2 : firstTo.x - (firstTo.x - from.x) / 2, 
                y = from.y > firstTo.y ? from.y - (from.y - firstTo.y) / 2 : firstTo.y - (firstTo.y - from.y) / 2, 
                isHorizontal ? (x -= textPath.getBBox().width / 2, y -= chart.options["text-margin"]) : (x += chart.options["text-margin"], 
                y -= textPath.getBBox().height / 2)) : (x = from.x, y = from.y, isHorizontal ? (x += chart.options["text-margin"] / 2, 
                y -= chart.options["text-margin"]) : (x += chart.options["text-margin"] / 2, y += chart.options["text-margin"])), 
                textPath.attr({
                    "text-anchor": "start",
                    "font-size": chart.options["font-size"],
                    fill: chart.options["font-color"],
                    x: x,
                    y: y
                }), font && textPath.attr({
                    font: font
                }), fontF && textPath.attr({
                    "font-family": fontF
                }), fontW && textPath.attr({
                    "font-weight": fontW
                });
            }
            return line;
        }
        function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
            // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
            var denominator, a, b, numerator1, numerator2, result = {
                x: null,
                y: null,
                onLine1: !1,
                onLine2: !1
            };
            // if we cast these lines infinitely in both directions, they intersect here:
            /*
	  // it is worth noting that this should be the same as:
	  x = line2StartX + (b * (line2EndX - line2StartX));
	  y = line2StartX + (b * (line2EndY - line2StartY));
	  */
            // if line1 is a segment and line2 is infinite, they intersect if:
            // if line2 is a segment and line1 is infinite, they intersect if:
            return denominator = (line2EndY - line2StartY) * (line1EndX - line1StartX) - (line2EndX - line2StartX) * (line1EndY - line1StartY), 
            0 === denominator ? result : (a = line1StartY - line2StartY, b = line1StartX - line2StartX, 
            numerator1 = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b, numerator2 = (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b, 
            a = numerator1 / denominator, b = numerator2 / denominator, result.x = line1StartX + a * (line1EndX - line1StartX), 
            result.y = line1StartY + a * (line1EndY - line1StartY), a > 0 && 1 > a && (result.onLine1 = !0), 
            b > 0 && 1 > b && (result.onLine2 = !0), result);
        }
        module.exports = {
            drawPath: drawPath,
            drawLine: drawLine,
            checkLineIntersection: checkLineIntersection
        };
    }, /* 4 */
    /*!********************************!*\
  !*** ./src/flowchart.parse.js ***!
  \********************************/
    /***/
    function(module, exports, __webpack_require__) {
        function parse(input) {
            function getSymbol(s) {
                var startIndex = s.indexOf("(") + 1, endIndex = s.indexOf(")");
                return startIndex >= 0 && endIndex >= 0 ? chart.symbols[s.substring(0, startIndex - 1)] : chart.symbols[s];
            }
            function getNextPath(s) {
                var next = "next", startIndex = s.indexOf("(") + 1, endIndex = s.indexOf(")");
                return startIndex >= 0 && endIndex >= 0 && (next = flowSymb.substring(startIndex, endIndex), 
                next.indexOf(",") < 0 && "yes" !== next && "no" !== next && (next = "next, " + next)), 
                next;
            }
            input = input || "", input = input.trim();
            for (var chart = {
                symbols: {},
                start: null,
                drawSVG: function(container, options) {
                    function getDisplaySymbol(s) {
                        if (dispSymbols[s.key]) return dispSymbols[s.key];
                        switch (s.symbolType) {
                          case "start":
                            dispSymbols[s.key] = new Start(diagram, s);
                            break;

                          case "end":
                            dispSymbols[s.key] = new End(diagram, s);
                            break;

                          case "operation":
                            dispSymbols[s.key] = new Operation(diagram, s);
                            break;

                          case "inputoutput":
                            dispSymbols[s.key] = new InputOutput(diagram, s);
                            break;

                          case "subroutine":
                            dispSymbols[s.key] = new Subroutine(diagram, s);
                            break;

                          case "condition":
                            dispSymbols[s.key] = new Condition(diagram, s);
                            break;

                          default:
                            return new Error("Wrong symbol type!");
                        }
                        return dispSymbols[s.key];
                    }
                    var self = this;
                    this.diagram && this.diagram.clean();
                    var diagram = new FlowChart(container, options);
                    this.diagram = diagram;
                    var dispSymbols = {};
                    !function constructChart(s, prevDisp, prev) {
                        var dispSymb = getDisplaySymbol(s);
                        return self.start === s ? diagram.startWith(dispSymb) : prevDisp && prev && !prevDisp.pathOk && (prevDisp instanceof Condition ? (prev.yes === s && prevDisp.yes(dispSymb), 
                        prev.no === s && prevDisp.no(dispSymb)) : prevDisp.then(dispSymb)), dispSymb.pathOk ? dispSymb : (dispSymb instanceof Condition ? (s.yes && constructChart(s.yes, dispSymb, s), 
                        s.no && constructChart(s.no, dispSymb, s)) : s.next && constructChart(s.next, dispSymb, s), 
                        dispSymb);
                    }(this.start), diagram.render();
                },
                clean: function() {
                    this.diagram.clean();
                }
            }, lines = [], prevBreak = 0, i0 = 1, i0len = input.length; i0len > i0; i0++) if ("\n" === input[i0] && "\\" !== input[i0 - 1]) {
                var line0 = input.substring(prevBreak, i0);
                prevBreak = i0 + 1, lines.push(line0.replace(/\\\n/g, "\n"));
            }
            prevBreak < input.length && lines.push(input.substr(prevBreak));
            for (var l = 1, len = lines.length; len > l; ) {
                var currentLine = lines[l];
                currentLine.indexOf("->") < 0 && currentLine.indexOf("=>") < 0 ? (lines[l - 1] += "\n" + currentLine, 
                lines.splice(l, 1), len--) : l++;
            }
            for (;lines.length > 0; ) {
                var line = lines.splice(0, 1)[0];
                if (line.indexOf("=>") >= 0) {
                    // definition
                    var sub, parts = line.split("=>"), symbol = {
                        key: parts[0],
                        symbolType: parts[1],
                        text: null,
                        link: null,
                        target: null,
                        flowstate: null
                    };
                    /* adding support for links */
                    if (symbol.symbolType.indexOf(": ") >= 0 && (sub = symbol.symbolType.split(": "), 
                    symbol.symbolType = sub.shift(), symbol.text = sub.join(": ")), symbol.text && symbol.text.indexOf(":>") >= 0 ? (sub = symbol.text.split(":>"), 
                    symbol.text = sub.shift(), symbol.link = sub.join(":>")) : symbol.symbolType.indexOf(":>") >= 0 && (sub = symbol.symbolType.split(":>"), 
                    symbol.symbolType = sub.shift(), symbol.link = sub.join(":>")), symbol.symbolType.indexOf("\n") >= 0 && (symbol.symbolType = symbol.symbolType.split("\n")[0]), 
                    symbol.link) {
                        var startIndex = symbol.link.indexOf("[") + 1, endIndex = symbol.link.indexOf("]");
                        startIndex >= 0 && endIndex >= 0 && (symbol.target = symbol.link.substring(startIndex, endIndex), 
                        symbol.link = symbol.link.substring(0, startIndex - 1));
                    }
                    /* end of link support */
                    /* adding support for flowstates */
                    if (symbol.text && symbol.text.indexOf("|") >= 0) {
                        var txtAndState = symbol.text.split("|");
                        symbol.flowstate = txtAndState.pop().trim(), symbol.text = txtAndState.join("|");
                    }
                    /* end of flowstate support */
                    chart.symbols[symbol.key] = symbol;
                } else if (line.indexOf("->") >= 0) for (var flowSymbols = line.split("->"), i = 0, lenS = flowSymbols.length; lenS > i; i++) {
                    var flowSymb = flowSymbols[i], realSymb = getSymbol(flowSymb), next = getNextPath(flowSymb), direction = null;
                    if (next.indexOf(",") >= 0) {
                        var condOpt = next.split(",");
                        next = condOpt[0], direction = condOpt[1].trim();
                    }
                    if (chart.start || (chart.start = realSymb), lenS > i + 1) {
                        var nextSymb = flowSymbols[i + 1];
                        realSymb[next] = getSymbol(nextSymb), realSymb["direction_" + next] = direction, 
                        direction = null;
                    }
                }
            }
            return chart;
        }
        var FlowChart = __webpack_require__(/*! ./flowchart.chart */ 6), Start = __webpack_require__(/*! ./flowchart.symbol.start */ 12), End = __webpack_require__(/*! ./flowchart.symbol.end */ 9), Operation = __webpack_require__(/*! ./flowchart.symbol.operation */ 11), InputOutput = __webpack_require__(/*! ./flowchart.symbol.inputoutput */ 10), Subroutine = __webpack_require__(/*! ./flowchart.symbol.subroutine */ 13), Condition = __webpack_require__(/*! ./flowchart.symbol.condition */ 5);
        module.exports = parse;
    }, /* 5 */
    /*!*******************************************!*\
  !*** ./src/flowchart.symbol.condition.js ***!
  \*******************************************/
    /***/
    function(module, exports, __webpack_require__) {
        function Condition(chart, options) {
            options = options || {}, Symbol.call(this, chart, options), this.textMargin = this.getAttr("text-margin"), 
            this.yes_direction = "bottom", this.no_direction = "right", options.yes && options.direction_yes && options.no && !options.direction_no ? "right" === options.direction_yes ? (this.no_direction = "bottom", 
            this.yes_direction = "right") : (this.no_direction = "right", this.yes_direction = "bottom") : options.yes && !options.direction_yes && options.no && options.direction_no ? "right" === options.direction_no ? (this.yes_direction = "bottom", 
            this.no_direction = "right") : (this.yes_direction = "right", this.no_direction = "bottom") : (this.yes_direction = "bottom", 
            this.no_direction = "right"), this.yes_direction = this.yes_direction || "bottom", 
            this.no_direction = this.no_direction || "right", this.text.attr({
                x: 2 * this.textMargin
            });
            var width = this.text.getBBox().width + 3 * this.textMargin;
            width += width / 2;
            var height = this.text.getBBox().height + 2 * this.textMargin;
            height += height / 2, height = Math.max(.5 * width, height);
            var startX = width / 4, startY = height / 4;
            this.text.attr({
                x: startX + this.textMargin / 2
            });
            var start = {
                x: startX,
                y: startY
            }, points = [ {
                x: startX - width / 4,
                y: startY + height / 4
            }, {
                x: startX - width / 4 + width / 2,
                y: startY + height / 4 + height / 2
            }, {
                x: startX - width / 4 + width,
                y: startY + height / 4
            }, {
                x: startX - width / 4 + width / 2,
                y: startY + height / 4 - height / 2
            }, {
                x: startX - width / 4,
                y: startY + height / 4
            } ], symbol = drawPath(chart, start, points);
            symbol.attr({
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                fill: this.getAttr("fill")
            }), options.link && symbol.attr("href", options.link), options.target && symbol.attr("target", options.target), 
            options.key && (symbol.node.id = options.key), symbol.node.setAttribute("class", this.getAttr("class")), 
            this.text.attr({
                y: symbol.getBBox().height / 2
            }), this.group.push(symbol), symbol.insertBefore(this.text), this.initialize();
        }
        var Symbol = __webpack_require__(/*! ./flowchart.symbol */ 2), inherits = __webpack_require__(/*! ./flowchart.helpers */ 1).inherits, drawAPI = __webpack_require__(/*! ./flowchart.functions */ 3), drawPath = drawAPI.drawPath;
        inherits(Condition, Symbol), Condition.prototype.render = function() {
            this.yes_direction && (this[this.yes_direction + "_symbol"] = this.yes_symbol), 
            this.no_direction && (this[this.no_direction + "_symbol"] = this.no_symbol);
            var lineLength = this.getAttr("line-length");
            if (this.bottom_symbol) {
                var bottomPoint = this.getBottom();
                this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + lineLength), 
                this.bottom_symbol.setX(bottomPoint.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, 
                this.bottom_symbol.render());
            }
            if (this.right_symbol) {
                var rightPoint = this.getRight();
                if (!this.right_symbol.isPositioned) {
                    this.right_symbol.setY(rightPoint.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + lineLength);
                    var self = this;
                    !function shift() {
                        for (var symb, hasSymbolUnder = !1, i = 0, len = self.chart.symbols.length; len > i; i++) {
                            symb = self.chart.symbols[i];
                            var diff = Math.abs(symb.getCenter().x - self.right_symbol.getCenter().x);
                            if (symb.getCenter().y > self.right_symbol.getCenter().y && diff <= self.right_symbol.width / 2) {
                                hasSymbolUnder = !0;
                                break;
                            }
                        }
                        hasSymbolUnder && (self.right_symbol.setX(symb.getX() + symb.width + lineLength), 
                        shift());
                    }(), this.right_symbol.isPositioned = !0, this.right_symbol.render();
                }
            }
        }, Condition.prototype.renderLines = function() {
            this.yes_symbol && this.drawLineTo(this.yes_symbol, this.getAttr("yes-text"), this.yes_direction), 
            this.no_symbol && this.drawLineTo(this.no_symbol, this.getAttr("no-text"), this.no_direction);
        }, module.exports = Condition;
    }, /* 6 */
    /*!********************************!*\
  !*** ./src/flowchart.chart.js ***!
  \********************************/
    /***/
    function(module, exports, __webpack_require__) {
        function FlowChart(container, options) {
            options = options || {}, this.paper = new Raphael(container), this.options = defaults(options, defaultOptions), 
            this.symbols = [], this.lines = [], this.start = null;
        }
        var Raphael = __webpack_require__(/*! raphael */ 15), defaults = __webpack_require__(/*! ./flowchart.helpers */ 1).defaults, defaultOptions = __webpack_require__(/*! ./flowchart.defaults */ 7), Condition = __webpack_require__(/*! ./flowchart.symbol.condition */ 5);
        FlowChart.prototype.handle = function(symbol) {
            this.symbols.indexOf(symbol) <= -1 && this.symbols.push(symbol);
            var flowChart = this;
            return symbol instanceof Condition ? (symbol.yes = function(nextSymbol) {
                return symbol.yes_symbol = nextSymbol, symbol.no_symbol && (symbol.pathOk = !0), 
                flowChart.handle(nextSymbol);
            }, symbol.no = function(nextSymbol) {
                return symbol.no_symbol = nextSymbol, symbol.yes_symbol && (symbol.pathOk = !0), 
                flowChart.handle(nextSymbol);
            }) : symbol.then = function(nextSymbol) {
                return symbol.next = nextSymbol, symbol.pathOk = !0, flowChart.handle(nextSymbol);
            }, symbol;
        }, FlowChart.prototype.startWith = function(symbol) {
            return this.start = symbol, this.handle(symbol);
        }, FlowChart.prototype.render = function() {
            var symbol, line, maxWidth = 0, maxHeight = 0, i = 0, len = 0, maxX = 0, maxY = 0, minX = 0, minY = 0;
            for (i = 0, len = this.symbols.length; len > i; i++) symbol = this.symbols[i], symbol.width > maxWidth && (maxWidth = symbol.width), 
            symbol.height > maxHeight && (maxHeight = symbol.height);
            for (i = 0, len = this.symbols.length; len > i; i++) symbol = this.symbols[i], symbol.shiftX(this.options.x + (maxWidth - symbol.width) / 2 + this.options["line-width"]), 
            symbol.shiftY(this.options.y + (maxHeight - symbol.height) / 2 + this.options["line-width"]);
            // for (i = 0, len = this.symbols.length; i < len; i++) {
            //   symbol = this.symbols[i];
            //   symbol.render();
            // }
            for (this.start.render(), i = 0, len = this.symbols.length; len > i; i++) symbol = this.symbols[i], 
            symbol.renderLines();
            for (maxX = this.maxXFromLine, i = 0, len = this.symbols.length; len > i; i++) {
                symbol = this.symbols[i];
                var x = symbol.getX() + symbol.width, y = symbol.getY() + symbol.height;
                x > maxX && (maxX = x), y > maxY && (maxY = y);
            }
            for (i = 0, len = this.lines.length; len > i; i++) {
                line = this.lines[i].getBBox();
                var x = line.x, y = line.y, x2 = line.x2, y2 = line.y2;
                minX > x && (minX = x), minY > y && (minY = y), x2 > maxX && (maxX = x2), y2 > maxY && (maxY = y2);
            }
            var scale = this.options.scale, lineWidth = this.options["line-width"];
            0 > minX && (minX -= lineWidth), 0 > minY && (minY -= lineWidth);
            var width = maxX + lineWidth - minX, height = maxY + lineWidth - minY;
            this.paper.setSize(width * scale, height * scale), this.paper.setViewBox(minX, minY, width, height, !0);
        }, FlowChart.prototype.clean = function() {
            if (this.paper) {
                var paperDom = this.paper.canvas;
                paperDom.parentNode.removeChild(paperDom);
            }
        }, module.exports = FlowChart;
    }, /* 7 */
    /*!***********************************!*\
  !*** ./src/flowchart.defaults.js ***!
  \***********************************/
    /***/
    function(module, exports) {
        // defaults
        module.exports = {
            x: 0,
            y: 0,
            "line-width": 3,
            "line-length": 50,
            "text-margin": 10,
            "font-size": 14,
            "font-color": "black",
            // 'font': 'normal',
            // 'font-family': 'calibri',
            // 'font-weight': 'normal',
            "line-color": "black",
            "element-color": "black",
            fill: "white",
            "yes-text": "yes",
            "no-text": "no",
            "arrow-end": "block",
            "class": "flowchart",
            scale: 1,
            symbols: {
                start: {},
                end: {},
                condition: {},
                inputoutput: {},
                operation: {},
                subroutine: {}
            }
        };
    }, /* 8 */
    /*!*******************************!*\
  !*** ./src/flowchart.shim.js ***!
  \*******************************/
    /***/
    function(module, exports) {
        // add indexOf to non ECMA-262 standard compliant browsers
        Array.prototype.indexOf || (Array.prototype.indexOf = function(searchElement) {
            "use strict";
            if (null === this) throw new TypeError();
            var t = Object(this), len = t.length >>> 0;
            if (0 === len) return -1;
            var n = 0;
            if (arguments.length > 0 && (n = Number(arguments[1]), n != n ? n = 0 : 0 !== n && n != 1 / 0 && n != -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), 
            n >= len) return -1;
            for (var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); len > k; k++) if (k in t && t[k] === searchElement) return k;
            return -1;
        }), // add lastIndexOf to non ECMA-262 standard compliant browsers
        Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(searchElement) {
            "use strict";
            if (null === this) throw new TypeError();
            var t = Object(this), len = t.length >>> 0;
            if (0 === len) return -1;
            var n = len;
            arguments.length > 1 && (n = Number(arguments[1]), n != n ? n = 0 : 0 !== n && n != 1 / 0 && n != -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n))));
            for (var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) if (k in t && t[k] === searchElement) return k;
            return -1;
        }), String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "");
        });
    }, /* 9 */
    /*!*************************************!*\
  !*** ./src/flowchart.symbol.end.js ***!
  \*************************************/
    /***/
    function(module, exports, __webpack_require__) {
        function End(chart, options) {
            var symbol = chart.paper.rect(0, 0, 0, 0, 20);
            options = options || {}, options.text = options.text || "End", Symbol.call(this, chart, options, symbol);
        }
        var Symbol = __webpack_require__(/*! ./flowchart.symbol */ 2), inherits = __webpack_require__(/*! ./flowchart.helpers */ 1).inherits;
        inherits(End, Symbol), module.exports = End;
    }, /* 10 */
    /*!*********************************************!*\
  !*** ./src/flowchart.symbol.inputoutput.js ***!
  \*********************************************/
    /***/
    function(module, exports, __webpack_require__) {
        function InputOutput(chart, options) {
            options = options || {}, Symbol.call(this, chart, options), this.textMargin = this.getAttr("text-margin"), 
            this.text.attr({
                x: 3 * this.textMargin
            });
            var width = this.text.getBBox().width + 4 * this.textMargin, height = this.text.getBBox().height + 2 * this.textMargin, startX = this.textMargin, startY = height / 2, start = {
                x: startX,
                y: startY
            }, points = [ {
                x: startX - this.textMargin,
                y: height
            }, {
                x: startX - this.textMargin + width,
                y: height
            }, {
                x: startX - this.textMargin + width + 2 * this.textMargin,
                y: 0
            }, {
                x: startX - this.textMargin + 2 * this.textMargin,
                y: 0
            }, {
                x: startX,
                y: startY
            } ], symbol = drawPath(chart, start, points);
            symbol.attr({
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                fill: this.getAttr("fill")
            }), options.link && symbol.attr("href", options.link), options.target && symbol.attr("target", options.target), 
            options.key && (symbol.node.id = options.key), symbol.node.setAttribute("class", this.getAttr("class")), 
            this.text.attr({
                y: symbol.getBBox().height / 2
            }), this.group.push(symbol), symbol.insertBefore(this.text), this.initialize();
        }
        var Symbol = __webpack_require__(/*! ./flowchart.symbol */ 2), inherits = __webpack_require__(/*! ./flowchart.helpers */ 1).inherits, drawAPI = __webpack_require__(/*! ./flowchart.functions */ 3), drawPath = drawAPI.drawPath;
        inherits(InputOutput, Symbol), InputOutput.prototype.getLeft = function() {
            var y = this.getY() + this.group.getBBox().height / 2, x = this.getX() + this.textMargin;
            return {
                x: x,
                y: y
            };
        }, InputOutput.prototype.getRight = function() {
            var y = this.getY() + this.group.getBBox().height / 2, x = this.getX() + this.group.getBBox().width - this.textMargin;
            return {
                x: x,
                y: y
            };
        }, module.exports = InputOutput;
    }, /* 11 */
    /*!*******************************************!*\
  !*** ./src/flowchart.symbol.operation.js ***!
  \*******************************************/
    /***/
    function(module, exports, __webpack_require__) {
        function Operation(chart, options) {
            var symbol = chart.paper.rect(0, 0, 0, 0);
            options = options || {}, Symbol.call(this, chart, options, symbol);
        }
        var Symbol = __webpack_require__(/*! ./flowchart.symbol */ 2), inherits = __webpack_require__(/*! ./flowchart.helpers */ 1).inherits;
        inherits(Operation, Symbol), module.exports = Operation;
    }, /* 12 */
    /*!***************************************!*\
  !*** ./src/flowchart.symbol.start.js ***!
  \***************************************/
    /***/
    function(module, exports, __webpack_require__) {
        function Start(chart, options) {
            var symbol = chart.paper.rect(0, 0, 0, 0, 20);
            options = options || {}, options.text = options.text || "Start", Symbol.call(this, chart, options, symbol);
        }
        var Symbol = __webpack_require__(/*! ./flowchart.symbol */ 2), inherits = __webpack_require__(/*! ./flowchart.helpers */ 1).inherits;
        inherits(Start, Symbol), module.exports = Start;
    }, /* 13 */
    /*!********************************************!*\
  !*** ./src/flowchart.symbol.subroutine.js ***!
  \********************************************/
    /***/
    function(module, exports, __webpack_require__) {
        function Subroutine(chart, options) {
            var symbol = chart.paper.rect(0, 0, 0, 0);
            options = options || {}, Symbol.call(this, chart, options, symbol), symbol.attr({
                width: this.text.getBBox().width + 4 * this.getAttr("text-margin")
            }), this.text.attr({
                x: 2 * this.getAttr("text-margin")
            });
            var innerWrap = chart.paper.rect(0, 0, 0, 0);
            innerWrap.attr({
                x: this.getAttr("text-margin"),
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
                height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
                fill: this.getAttr("fill")
            }), options.key && (innerWrap.node.id = options.key + "i");
            var font = this.getAttr("font"), fontF = this.getAttr("font-family"), fontW = this.getAttr("font-weight");
            font && innerWrap.attr({
                font: font
            }), fontF && innerWrap.attr({
                "font-family": fontF
            }), fontW && innerWrap.attr({
                "font-weight": fontW
            }), options.link && innerWrap.attr("href", options.link), options.target && innerWrap.attr("target", options.target), 
            this.group.push(innerWrap), innerWrap.insertBefore(this.text), this.initialize();
        }
        var Symbol = __webpack_require__(/*! ./flowchart.symbol */ 2), inherits = __webpack_require__(/*! ./flowchart.helpers */ 1).inherits;
        inherits(Subroutine, Symbol), module.exports = Subroutine;
    }, /* 14 */
    /*!******************************!*\
  !*** ./src/jquery-plugin.js ***!
  \******************************/
    /***/
    function(module, exports, __webpack_require__) {
        if ("undefined" != typeof jQuery) {
            var parse = __webpack_require__(/*! ./flowchart.parse */ 4);
            !function($) {
                $.fn.flowChart = function(options) {
                    return this.each(function() {
                        var $this = $(this), chart = parse($this.text());
                        $this.html(""), chart.drawSVG(this, options);
                    });
                };
            }(jQuery);
        }
    }, /* 15 */
    /*!**************************!*\
  !*** external "Raphael" ***!
  \**************************/
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_15__;
    } ]);
});
//# sourceMappingURL=flowchart.js.map