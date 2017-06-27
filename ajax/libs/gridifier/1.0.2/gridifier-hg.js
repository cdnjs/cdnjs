/* Gridifier v1.0.2
 * Async Responsive HTML Grids
 * http://gridifier.io
 * 
 * Gridifier is dual-licensed:
 *   GPLV3 per non-commercial usage; 
 *   Commercial license per commercial usage.
 * Read http://gridifier.io/license for details.
 * Copyright 2015 nTech
 */

(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define([], b);
    } else if (typeof exports === "object" && exports) {
        module.exports = b();
    } else {
        a.Gridifier = b();
    }
})(this, function() {
    var a = {
        getComputedCSS: null,
        propertiesToGet: {
            forOuterWidth: [ "paddingLeft", "paddingRight", "marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth" ],
            forOuterHeight: [ "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth" ],
            forPositionLeft: [ "marginLeft" ],
            forPositionTop: [ "marginTop" ]
        },
        maybePrefixedProperties: {
            boxSizing: null
        },
        borderBoxSizingStrategy: null,
        borderBoxSizingStrategies: {
            OUTER: 0,
            INNER: 1
        },
        percentageCSSValuesCalcStrategy: null,
        percentageCSSValuesCalcStrategies: {
            BROWSER_NATIVE: 0,
            RECALCULATE: 1
        },
        recalculatePercentageWidthFunction: function(a, b, c, d) {
            return this.outerWidth(a, b, c, d);
        },
        recalculatePercentageHeightFunction: function(a, b, c, d) {
            return this.outerHeight(a, b, c, d);
        },
        lastRecalculatedDOMElRawWidth: null,
        lastRecalculatedDOMElRawHeight: null,
        lastRecalculatedDOMElBorderWidth: null,
        lastRecalculatedDOMElBorderHeight: null,
        hasLastRecalculatedDOMElBorderBoxBS: false,
        init: function() {
            this.getComputedCSS = this.getComputedCSSFunction();
            this.determineMaybePrefixedProperties();
            this.determineBorderBoxComputedSizesCalculationStrategy();
            this.determinePercentageCSSValuesCalcStrategy();
        },
        clearRecursiveSubcallsData: function() {
            this.lastRecalculatedDOMElRawWidth = null;
            this.lastRecalculatedDOMElRawHeight = null;
            this.lastRecalculatedDOMElBorderWidth = null;
            this.lastRecalculatedDOMElBorderHeight = null;
            this.hasLastRecalculatedDOMElBorderBoxBS = false;
        },
        isBrowserNativePercentageCSSValuesCalcStrategy: function() {
            return this.percentageCSSValuesCalcStrategy == this.percentageCSSValuesCalcStrategies.BROWSER_NATIVE;
        },
        isRecalculatePercentageCSSValuesCalcStrategy: function() {
            return this.percentageCSSValuesCalcStrategy == this.percentageCSSValuesCalcStrategies.RECALCULATE;
        },
        _isPercentageCSSValue: function(a) {
            var b = new RegExp("(.*\\d)%$");
            if (b.test(a)) return true;
            return false;
        },
        getComputedCSSWithMaybePercentageSizes: function(a) {
            return this._getComputedCSSWithMaybePercentageSizes(a);
        },
        _getComputedCSSWithMaybePercentageSizes: function(a) {
            var b = a.parentNode.cloneNode();
            var c = a.cloneNode();
            b.appendChild(c);
            b.style.display = "none";
            if (a.parentNode.nodeName == "HTML") var d = a.parentNode; else var d = a.parentNode.parentNode;
            d.appendChild(b);
            var e = this.getComputedCSS(c);
            var f = {};
            var g = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "width", "height" ];
            for (var h = 0; h < g.length; h++) {
                f[g[h]] = e[g[h]];
            }
            d.removeChild(b);
            return f;
        },
        _ensureHasParentNode: function(a) {
            if (a.parentNode == null || !d.hasDOMElemOwnProperty(a.parentNode, "innerHTML")) {
                var b = "";
                b += "SizesResolver error: ";
                b += "Can't resolve element parentNode per element: ";
                b += a;
                throw new Error(b);
            }
        },
        _ensureComputedCSSHasProperty: function(a, b) {
            if (!(b in a)) {
                var c = "";
                c += "SizesResolver error: ";
                c += "Can't find property '" + b + "' in elementComputedCSS. ";
                c += "Element computed CSS: ";
                c += a;
                throw new Error(c);
            }
        },
        hasPercentageCSSValue: function(a, b, c) {
            this._ensureHasParentNode(b);
            var c = c || this._getComputedCSSWithMaybePercentageSizes(b);
            this._ensureComputedCSSHasProperty(c, a);
            return this._isPercentageCSSValue(c[a]);
        },
        getPercentageCSSValue: function(a, b, c) {
            this._ensureHasParentNode(b);
            var c = c || this._getComputedCSSWithMaybePercentageSizes(b);
            this._ensureComputedCSSHasProperty(c, a);
            return c[a];
        },
        _recalculateTwoSidePropertyWithPercentageValues: function(a, b, c, d, e, f) {
            if (f == "horizontal") {
                var g = "Left";
                var h = "Right";
            } else if (f == "vertical") {
                var g = "Top";
                var h = "Bottom";
            } else {
                throw new Error("SizesResolver error: wrong direction in twoSideProperty recalculation.");
            }
            if (e != "margin" && e != "padding") {
                throw new Error("SizesResolver error: unknown CSSProperty in twoSideProperty recalculation.");
            }
            var i = e + g;
            var j = e + h;
            var k = c[i];
            var l = c[j];
            if (this.hasPercentageCSSValue(i, a, d)) {
                var m = parseFloat(this.getPercentageCSSValue(i, a, d));
                k = b / 100 * m;
            }
            if (this.hasPercentageCSSValue(j, a, d)) {
                var n = parseFloat(this.getPercentageCSSValue(j, a, d));
                l = b / 100 * n;
            }
            return k + l;
        },
        _recalculateWidthWithPercentageValue: function(a, b, c) {
            var d = parseFloat(this.getPercentageCSSValue("width", a, c));
            return b / 100 * d;
        },
        _recalculateHeightWithPercentageValue: function(a, b, c) {
            var d = parseFloat(this.getPercentageCSSValue("height", a, c));
            return b / 100 * d;
        },
        positionLeft: function(a) {
            var b = this.getComputedCSS(a);
            if (b.display == "none") return 0;
            var c = this.getComputedProperties("forPositionLeft", b, a);
            return a.offsetLeft - c.marginLeft;
        },
        positionTop: function(a) {
            var b = this.getComputedCSS(a);
            if (b.display == "none") return 0;
            var c = this.getComputedProperties("forPositionTop", b, a);
            return a.offsetTop - c.marginTop;
        },
        offsetLeft: function(a) {
            var b = a.getBoundingClientRect();
            var c = window.pageXOffset || document.documentElement.scrollLeft;
            return b.left + c;
        },
        offsetTop: function(a) {
            var b = a.getBoundingClientRect();
            var c = window.pageYOffset || document.documentElement.scrollTop;
            return b.top + c;
        },
        getComputedProperty: function(a, b) {
            var c = this.getComputedCSS(a);
            return c[b];
        },
        isBoxSizingBorderBox: function(a) {
            var b = this.maybePrefixedProperties.boxSizing;
            if (b && a[b] && a[b] === "border-box") return true;
            return false;
        },
        isOuterBorderBoxSizing: function() {
            return this.borderBoxSizingStrategy === this.borderBoxSizingStrategies.OUTER ? true : false;
        },
        isCascadedCSSValue: function(a) {
            return window.getComputedStyle || a.indexOf("px") !== -1 ? false : true;
        },
        transformFromCascadedToComputedStyle: function(a, b, c) {
            var d = new RegExp("(?=.*\\d)");
            if (!d.test(b)) return b;
            var e = a.style;
            var f = a.runtimeStyle;
            var g = e.left;
            var h = f && f.left;
            if (h) f.left = c.left;
            e.left = b;
            b = e.pixelLeft;
            e.left = g;
            if (h) f.left = h;
            return b;
        },
        normalizeComputedCSSSizeValue: function(a) {
            var b = parseFloat(a);
            var c = a.indexOf("%") === -1 && !isNaN(b);
            return c ? b : false;
        },
        getComputedProperties: function(a, b, c) {
            var d = {};
            for (var e = 0; e < this.propertiesToGet[a].length; e++) {
                var f = this.propertiesToGet[a][e];
                var g = b[f];
                if (this.isCascadedCSSValue(g)) g = this.transformFromCascadedToComputedStyle(c, g, b);
                g = parseFloat(g);
                g = isNaN(g) ? 0 : g;
                d[f] = g;
            }
            return d;
        },
        cloneComputedStyle: function(a, b) {
            var c = function(a) {
                return a.replace(/-+(.)?/g, function(a, b) {
                    return b ? b.toUpperCase() : "";
                });
            };
            var d = this.getComputedCSS(a);
            for (var e in d) {
                if (e == "cssText") continue;
                var f = c(e);
                if (b.style[f] != d[f]) b.style[f] = d[f];
            }
            var g = [ "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor", "borderLeftStyle", "borderRightStyle", "borderTopStyle", "borderBottomStyle", "font", "fontSize", "fontWeight", "lineHeight" ];
            for (var h = 0; h < g.length; h++) {
                var f = g[h];
                if (typeof d[f] != "undefined" && b.style[f] != d[f]) b.style[f] = d[f];
            }
        }
    };
    a.getComputedCSSFunction = function() {
        if (window.getComputedStyle) {
            return function(a) {
                return window.getComputedStyle(a, null);
            };
        } else {
            return function(a) {
                return a.currentStyle;
            };
        }
    };
    a.determineMaybePrefixedProperties = function() {
        this.maybePrefixedProperties.boxSizing = c.get("boxSizing");
    };
    a.determineBorderBoxComputedSizesCalculationStrategy = function() {
        var a = document.createElement("div");
        a.style.width = "100px";
        a.style.padding = "10px 20px";
        a.style.borderWidth = "10px 20px";
        a.style.borderStyle = "solid";
        var b = this.maybePrefixedProperties.boxSizing;
        a.style[b] = "border-box";
        var c = document.body || document.documentElement;
        c.appendChild(a);
        var d = this.getComputedCSS(a);
        if (this.normalizeComputedCSSSizeValue(d.width) === 100) this.borderBoxSizingStrategy = this.borderBoxSizingStrategies.OUTER; else this.borderBoxSizingStrategy = this.borderBoxSizingStrategies.INNER;
        c.removeChild(a);
    };
    a.determinePercentageCSSValuesCalcStrategy = function() {
        var a = document.createElement("div");
        a.style.width = "1178px";
        a.style.height = "300px";
        a.style.position = "absolute";
        a.style.left = "-9000px";
        a.style.top = "0px";
        a.style.visibility = "hidden";
        var b = document.body || document.documentElement;
        b.appendChild(a);
        var c = document.createElement("div");
        c.style.width = "10%";
        c.style.height = "200px";
        a.appendChild(c);
        var d = 117.796875;
        var e = parseFloat(this.outerWidth(c, true));
        if (d.toFixed(1) == e.toFixed(1)) this.percentageCSSValuesCalcStrategy = this.percentageCSSValuesCalcStrategies.BROWSER_NATIVE; else this.percentageCSSValuesCalcStrategy = this.percentageCSSValuesCalcStrategies.RECALCULATE;
        b.removeChild(a);
    };
    a.outerWidth = function(a, b, c, d) {
        var b = b || false;
        var c = c || false;
        var d = d || false;
        var e = this.getComputedCSS(a);
        if (c) var f = false; else if (this.isBrowserNativePercentageCSSValuesCalcStrategy()) var f = false; else if (this.isRecalculatePercentageCSSValuesCalcStrategy()) {
            this._ensureHasParentNode(a);
            if (this.hasPercentageCSSValue("width", a)) var f = true; else var f = false;
        }
        if (e.display === "none") return 0;
        var g = this.getComputedProperties("forOuterWidth", e, a);
        var h = g.paddingLeft + g.paddingRight;
        var i = g.marginLeft + g.marginRight;
        var j = g.borderLeftWidth + g.borderRightWidth;
        var k = 0;
        var l = this.normalizeComputedCSSSizeValue(e.width);
        if (l !== false) k = l;
        var m = null;
        var n = null;
        if (f) {
            m = this._getComputedCSSWithMaybePercentageSizes(a);
            if (a.parentNode.nodeName == "HTML") var o = true; else var o = false;
            n = this.recalculatePercentageWidthFunction.call(this, a.parentNode, false, o, true);
            if (this.hasLastRecalculatedDOMElBorderBoxBS && this.hasPercentageCSSValue("width", a, m)) {
                n -= this.lastRecalculatedDOMElBorderWidth;
            }
        }
        if (f && (this.hasPercentageCSSValue("paddingLeft", a, m) || this.hasPercentageCSSValue("paddingRight", a, m))) {
            h = this._recalculateTwoSidePropertyWithPercentageValues(a, n, g, m, "padding", "horizontal");
        }
        if (f && this.hasPercentageCSSValue("width", a, m)) {
            k = this._recalculateWidthWithPercentageValue(a, n, m);
        }
        if (!this.isBoxSizingBorderBox(e) || this.isBoxSizingBorderBox(e) && !this.isOuterBorderBoxSizing()) {
            this.lastRecalculatedDOMElRawWidth = k;
            k += h;
            if (!d) k += j;
            this.hasLastRecalculatedDOMElBorderBoxBS = false;
        } else {
            this.hasLastRecalculatedDOMElBorderBoxBS = true;
            this.lastRecalculatedDOMElRawWidth = k;
            this.lastRecalculatedDOMElBorderWidth = j;
        }
        if (b) {
            if (f && (this.hasPercentageCSSValue("marginLeft", a, m) || this.hasPercentageCSSValue("marginRight", a, m))) {
                i = this._recalculateTwoSidePropertyWithPercentageValues(a, n, g, m, "margin", "horizontal");
            }
            k += i;
        }
        return k;
    };
    a.outerHeight = function(a, b, c, d) {
        var b = b || false;
        var c = c || false;
        var d = d || false;
        var e = this.getComputedCSS(a);
        if (c) var f = false; else if (this.isBrowserNativePercentageCSSValuesCalcStrategy()) var f = false; else if (this.isRecalculatePercentageCSSValuesCalcStrategy()) {
            this._ensureHasParentNode(a);
            if (this.hasPercentageCSSValue("height", a)) var f = true; else var f = false;
        }
        if (e.display === "none") return 0;
        var g = this.getComputedProperties("forOuterHeight", e, a);
        var h = g.paddingTop + g.paddingBottom;
        var i = g.marginTop + g.marginBottom;
        var j = g.borderTopWidth + g.borderBottomWidth;
        var k = 0;
        var l = this.normalizeComputedCSSSizeValue(e.height);
        if (l !== false) k = l;
        var m = null;
        var n = null;
        var o = null;
        if (f) {
            m = this._getComputedCSSWithMaybePercentageSizes(a);
            if (a.parentNode.nodeName == "HTML") var p = true; else var p = false;
            n = this.recalculatePercentageWidthFunction.call(this, a.parentNode, false, p, true);
            if (this.hasLastRecalculatedDOMElBorderBoxBS) {
                n -= this.lastRecalculatedDOMElBorderWidth;
            }
            o = this.recalculatePercentageHeightFunction.call(this, a.parentNode, false, p, true);
            if (this.hasLastRecalculatedDOMElBorderBoxBS && this.hasPercentageCSSValue("height", a, m)) {
                o -= this.lastRecalculatedDOMElBorderHeight;
            }
        }
        if (f && (this.hasPercentageCSSValue("paddingTop", a, m) || this.hasPercentageCSSValue("paddingBottom", a, m))) {
            h = this._recalculateTwoSidePropertyWithPercentageValues(a, n, g, m, "padding", "vertical");
        }
        if (f && this.hasPercentageCSSValue("height", a, m)) {
            k = this._recalculateHeightWithPercentageValue(a, o, m);
        }
        if (!this.isBoxSizingBorderBox(e) || this.isBoxSizingBorderBox(e) && !this.isOuterBorderBoxSizing()) {
            this.lastRecalculatedDOMElRawHeight = k;
            k += h;
            if (!d) k += j;
            this.hasLastRecalculatedDOMElBorderBoxBS = false;
        } else {
            this.hasLastRecalculatedDOMElBorderBoxBS = true;
            this.lastRecalculatedDOMElRawHeight = k;
            this.lastRecalculatedDOMElBorderHeight = j;
        }
        if (b) {
            if (f && (this.hasPercentageCSSValue("marginTop", a, m) || this.hasPercentageCSSValue("marginBottom", a, m))) {
                i = this._recalculateTwoSidePropertyWithPercentageValues(a, n, g, m, "margin", "vertical");
            }
            k += i;
        }
        return k;
    };
    var b = function() {
        var a = 0;
        function c(a) {
            a = a || window.event;
            if (a.isFixed) {
                return a;
            }
            a.isFixed = true;
            a.preventDefault = a.preventDefault || function() {
                this.returnValue = false;
            };
            a.stopPropagation = a.stopPropagation || function() {
                this.cancelBubble = true;
            };
            if (!a.target) {
                a.target = a.srcElement;
            }
            if (!a.relatedTarget && a.fromElement) {
                a.relatedTarget = a.fromElement == a.target ? a.toElement : a.fromElement;
            }
            if (a.pageX == null && a.clientX != null) {
                var b = document.documentElement, c = document.body;
                a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0);
            }
            if (!a.which && a.button) {
                a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            }
            return a;
        }
        function d(a) {
            a = c(a);
            var b = this.events[a.type];
            for (var d in b) {
                var e = b[d].call(this, a);
                if (e === false) {
                    a.preventDefault();
                    a.stopPropagation();
                } else if (e !== undefined) {
                    a.result = e;
                }
                if (a.stopNow) break;
            }
        }
        return {
            add: function(c, e, f) {
                if (c.setInterval && (c != window && !c.frameElement)) {
                    c = window;
                }
                if (!f.guid) {
                    f.guid = ++a;
                }
                if (!c.events) {
                    c.events = {};
                    c.handle = function(a) {
                        if (typeof b !== "undefined") {
                            return d.call(c, a);
                        }
                    };
                }
                if (!c.events[e]) {
                    c.events[e] = {};
                    if (c.addEventListener) c.addEventListener(e, c.handle, false); else if (c.attachEvent) c.attachEvent("on" + e, c.handle);
                }
                c.events[e][f.guid] = f;
            },
            remove: function(a, b, c) {
                var d = a.events && a.events[b];
                if (!d) return;
                if (!c) {
                    for (var e in d) {
                        delete a.events[b][e];
                    }
                    return;
                } else {
                    delete d[c.guid];
                    for (var f in d) return;
                }
                if (a.removeEventListener) a.removeEventListener(b, a.handle, false); else if (a.detachEvent) a.detachEvent("on" + b, a.handle);
                delete a.events[b];
                for (var f in a.events) return;
                try {
                    delete a.handle;
                    delete a.events;
                } catch (g) {
                    a.removeAttribute("handle");
                    a.removeAttribute("events");
                }
            }
        };
    }();
    var c = {
        prefixes: [ "Moz", "Webkit", "ms", "Ms", "Khtml", "O" ],
        init: function() {
        },
        get: function(a, b) {
            b = b || document.documentElement;
            var c = b.style;
            if (typeof c[a] === "string") {
                return a;
            }
            var a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var d = 0; d < this.prefixes.length; d++) {
                var e = this.prefixes[d] + a;
                if (typeof c[e] === "string") return e;
            }
        },
        getForCSS: function(a, b) {
            b = b || document.documentElement;
            var c = b.style;
            if (typeof c[a] === "string") {
                return a;
            }
            var d = a;
            var a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var e = 0; e < this.prefixes.length; e++) {
                var f = this.prefixes[e] + a;
                if (typeof c[f] === "string") return "-" + this.prefixes[e].toLowerCase() + "-" + d;
            }
        }
    };
    var d = {
        hasDOMElemOwnPropertyFunction: null,
        _isBrowserSupportingTransitions: null,
        init: function() {
            this.createTrimFunction();
            this.createHasDOMElemOwnPropertyFunction();
            this._determineIfBrowserIsSupportingTransitions();
            this.browsers.init();
        },
        createTrimFunction: function() {
            if (typeof String.prototype.gridifierTrim !== "function") {
                String.prototype.gridifierTrim = function() {
                    return this.replace(/^\s+|\s+$/g, "");
                };
            }
        },
        createHasDOMElemOwnPropertyFunction: function() {
            var a = document.createElement("div");
            var b = document.body || document.documentElement;
            b.appendChild(a);
            if (Object.prototype.hasOwnProperty.call(a, "innerHTML")) {
                this.hasDOMElemOwnPropertyFunction = function(a, b) {
                    return Object.prototype.hasOwnProperty.call(a, b);
                };
            } else {
                this.hasDOMElemOwnPropertyFunction = function(a, b) {
                    for (var c in a) {
                        if (c == b) return true;
                    }
                    return false;
                };
            }
            b.removeChild(a);
        },
        _determineIfBrowserIsSupportingTransitions: function() {
            var a = document.createElement("div");
            var b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            this._isBrowserSupportingTransitions = false;
            for (var c in b) {
                if (a.style[c] !== undefined) this._isBrowserSupportingTransitions = true;
            }
        },
        toInt: function(a) {
            return parseInt(a, 10);
        },
        isJqueryObject: function(a) {
            if (typeof jQuery == "undefined") return false;
            return a && a instanceof jQuery;
        },
        isNativeDOMObject: function(a) {
            if (typeof a != "undefined" && typeof a.tagName != "undefined" && typeof a.nodeName != "undefined" && typeof a.ownerDocument != "undefined" && typeof a.removeAttribute != "undefined") return true; else return false;
        },
        isArray: function(a) {
            return Object.prototype.toString.call(a) == "[object Array]";
        },
        isChildOf: function(a, b) {
            var c = a.parentNode;
            while (c != undefined) {
                if (c == b) return true;
                if (c == document.body) break;
                c = c.parentNode;
            }
            return false;
        },
        hasAttribute: function(a, b) {
            if (a.getAttribute(b) === null || a.getAttribute(b) === "") return false;
            return true;
        },
        isBrowserSupportingTransitions: function() {
            return this._isBrowserSupportingTransitions;
        },
        hasDOMElemOwnProperty: function(a, b) {
            return this.hasDOMElemOwnPropertyFunction(a, b);
        },
        toFixed: function(a, b) {
            return parseFloat(+(Math.round(+(a.toString() + "e" + b)).toString() + "e" + -b));
        },
        areRoundedOrFlooredValuesEqual: function(a, b) {
            return Math.round(a) == Math.round(b) || Math.floor(a) == Math.floor(b);
        },
        areRoundedOrCeiledValuesEqual: function(a, b) {
            return Math.round(a) == Math.round(b) || Math.ceil(a) == Math.ceil(b);
        },
        browsers: {
            _navigator: null,
            init: function() {
                this._navigator = typeof navigator != "undefined" ? navigator.userAgent : "";
            },
            isAndroid: function() {
                return /android/i.test(this._navigator);
            },
            isAndroidFirefox: function() {
                if (!this.isAndroid()) return false;
                return /firefox|iceweasel/i.test(this._navigator);
            },
            isAndroidUCBrowser: function() {
                if (!this.isAndroid()) return false;
                return /UCBrowser/i.test(this._navigator);
            }
        },
        css: {
            set: function(a, b) {
                if (!d.isNativeDOMObject(a)) throw new Error("Dom abstraction layer error: DOMElem must be a scalar value.");
                for (var c in b) a.style[c] = b[c];
            },
            hasClass: function(a, b) {
                var c = a.getAttribute("class");
                if (c == null || c.length == 0) return false;
                var d = c.split(" ");
                for (var e = 0; e < d.length; e++) {
                    d[e] = d[e].gridifierTrim();
                    if (d[e] == b) return true;
                }
                return false;
            },
            addClass: function(a, b) {
                var c = a.getAttribute("class");
                if (c == null || c.length == 0) var d = b; else var d = c + " " + b;
                a.setAttribute("class", d);
            },
            removeClass: function(a, b) {
                var c = a.getAttribute("class").split(" ");
                var d = "";
                for (var e = 0; e < c.length; e++) {
                    if (c[e].gridifierTrim() != b) d += c[e] + " ";
                }
                d = d.substring(0, d.length - 1);
                a.setAttribute("class", d);
            }
        },
        css3: {
            prefixedTransitionProps: [ "WebkitTransition", "MozTransition", "MsTransition", "OTransition", "transition" ],
            prefixedTransformProps: [ "WebkitTransform", "MozTransform", "OTransform", "MsTransform", "transform" ],
            prefixedPerspectiveProps: [ "WebkitPerspective", "perspective", "MozPerspective" ],
            prefixedTransformStyleProps: [ "transformStyle", "WebkitTransformStyle", "MozTransformStyle" ],
            prefixedBackfaceVisibilityProps: [ "WebkitBackfaceVisibility", "MozBackfaceVisibility", "backfaceVisibility" ],
            prefixedTransformOriginProps: [ "webkitTransformOrigin", "mozTransformOrigin", "oTransformOrigin", "msTransformOrigin", "transformOrigin" ],
            transition: function(a, b) {
                a.style[c.get("transition", a)] = b;
            },
            transitionProperty: function(a, b) {
                var d = a.style[c.get("transition", a)];
                if (d.length == 0) {
                    a.style[c.get("transition", a)] = b;
                    return;
                }
                var e = function(a) {
                    return a.replace(/cubic-bezier\([^\)]+/g, function(a) {
                        return a.replace(/,/g, ";");
                    });
                };
                var f = function(a) {
                    return a.replace(/cubic-bezier\([^\)]+/g, function(a) {
                        return a.replace(/;/g, ",");
                    });
                };
                var g = e(b);
                d = e(d);
                var h = d.split(",");
                for (var i = 0; i < h.length; i++) {
                    var j = h[i].gridifierTrim();
                    if (j.length == 0) continue;
                    var k = j.split(" ");
                    var l = k[0];
                    if (g.search(l) === -1) {
                        g += ", " + j;
                    }
                }
                a.style[c.get("transition", a)] = f(g).gridifierTrim();
            },
            transform: function(a, b) {
                a.style[c.get("transform", a)] = b;
            },
            transformProperty: function(a, b, d) {
                var e = a.style[c.get("transform", a)];
                if (e.length == 0) {
                    a.style[c.get("transform", a)] = b + "(" + d + ")";
                    return;
                }
                var f = "";
                var g = e.split(/\)/);
                var h = false;
                for (var i = 0; i < g.length; i++) {
                    var j = g[i].gridifierTrim();
                    if (j.gridifierTrim().length == 0) continue;
                    if (j.search(b) !== -1) {
                        f += " " + b + "(" + d + ")";
                        h = true;
                    } else {
                        f += " " + j + ")";
                    }
                }
                if (!h) f += " " + b + "(" + d + ")";
                a.style[c.get("transform", a)] = f.gridifierTrim();
            },
            opacity: function(a, b) {
                var c = [ "-webkit-opacity", "-moz-opacity", "opacity" ];
                for (var d = 0; d < c.length; d++) a.style[c[d]] = b;
            },
            perspective: function(a, b) {
                for (var c = 0; c < this.prefixedPerspectiveProps.length; c++) a.style[this.prefixedPerspectiveProps[c]] = b;
            },
            transformStyle: function(a, b) {
                for (var c = 0; c < this.prefixedTransformStyleProps.length; c++) a.style[this.prefixedTransformStyleProps[c]] = b;
            },
            backfaceVisibility: function(a, b) {
                for (var c = 0; c < this.prefixedBackfaceVisibilityProps.length; c++) a.style[this.prefixedBackfaceVisibilityProps[c]] = b;
            },
            transformOrigin: function(a, b) {
                for (var c = 0; c < this.prefixedTransformOriginProps.length; c++) {
                    if (typeof a.style[this.prefixedTransformOriginProps[c]] != "undefined") a.style[this.prefixedTransformOriginProps[c]] = b;
                }
            }
        },
        get: {
            byId: function(a) {
                return document.getElementById(a);
            },
            byClass: function(a, b) {
                return a.querySelectorAll("." + b);
            },
            byQuery: function(a, b) {
                var c = b.gridifierTrim()[0];
                if (c == ">") {
                    var d = b.substr(2, b.length - 1);
                    var e = a.querySelectorAll(d);
                    var f = [];
                    for (var g = 0; g < e.length; g++) {
                        if (e[g].parentNode == a) f.push(e[g]);
                    }
                    return f;
                }
                return a.querySelectorAll(b);
            }
        },
        remove: {
            byQuery: function(a, b) {
                var c = d.get.byQuery(a, b);
                for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    f.parentNode.removeChild(f);
                }
            }
        }
    };
    d.init();
    a.init();
    var e = function(a, c) {
        var d = this;
        this._grid = null;
        this._gridSizesUpdater = null;
        this._settings = null;
        this._collector = null;
        this._guid = null;
        this._eventEmitter = null;
        this._operation = null;
        this._resorter = null;
        this._filtrator = null;
        this._disconnector = null;
        this._sizesResolverManager = null;
        this._lifecycleCallbacks = null;
        this._itemClonesManager = null;
        this._responsiveClassesManager = null;
        this._imagesResolver = null;
        this._connectors = null;
        this._connections = null;
        this._connectionsSorter = null;
        this._iterator = null;
        this._renderer = null;
        this._silentRenderer = null;
        this._sizesTransformer = null;
        this._normalizer = null;
        this._prepender = null;
        this._reversedPrepender = null;
        this._appender = null;
        this._reversedAppender = null;
        this._operationsQueue = null;
        this._toggleOperation = null;
        this._transformOperation = null;
        this._dragifier = null;
        this._resizeEventHandler = null;
        this._css = {};
        this._construct = function() {
            if (typeof c == "undefined") c = {};
            d._sizesResolverManager = new e.SizesResolverManager();
            d._grid = new e.Grid(a, d._sizesResolverManager);
            d._eventEmitter = new e.EventEmitter(d);
            d._guid = new e.GUID();
            d._settings = new e.Settings(c, d, d._guid, d._eventEmitter, d._sizesResolverManager);
            d._collector = new e.Collector(d._settings, d.getGrid(), d._sizesResolverManager);
            d._settings.setCollectorInstance(d._collector);
            d._normalizer = new e.Normalizer(d, d._sizesResolverManager);
            d._operation = new e.Operation();
            d._lifecycleCallbacks = new e.LifecycleCallbacks(d._collector);
            d._grid.setCollectorInstance(d._collector);
            if (d._settings.shouldResolveImages()) {
                d._imagesResolver = new e.ImagesResolver(d);
            }
            if (d._settings.isVerticalGrid()) {
                d._connections = new e.VerticalGrid.Connections(d, d._guid, d._settings, d._sizesResolverManager, d._eventEmitter);
                d._connectionsSorter = new e.VerticalGrid.ConnectionsSorter(d._connections, d._settings, d._guid);
            } else if (d._settings.isHorizontalGrid()) {
                d._connections = new e.HorizontalGrid.Connections(d, d._guid, d._settings, d._sizesResolverManager, d._eventEmitter);
                d._connectionsSorter = new e.HorizontalGrid.ConnectionsSorter(d._connections, d._settings, d._guid);
            }
            d._itemClonesManager = new e.ItemClonesManager(d._grid, d._collector, d._connections, d._sizesResolverManager);
            d._responsiveClassesManager = new e.ResponsiveClassesManager(d, d._settings, d._collector, d._guid, d._eventEmitter, d._itemClonesManager);
            d._iterator = new e.Iterator(d._settings, d._collector, d._connections, d._connectionsSorter, d._guid);
            d._gridSizesUpdater = new e.GridSizesUpdater(d, d._grid, d._connections, d._settings, d._eventEmitter);
            d._connectors = new e.Connectors(d._guid, d._connections);
            d._renderer = new e.Renderer(d, d._connections, d._settings, d._normalizer);
            if (d._settings.isVerticalGrid()) {
                d._prepender = new e.VerticalGrid.Prepender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
                d._reversedPrepender = new e.VerticalGrid.ReversedPrepender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
                d._appender = new e.VerticalGrid.Appender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
                d._reversedAppender = new e.VerticalGrid.ReversedAppender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
            } else if (d._settings.isHorizontalGrid()) {
                d._prepender = new e.HorizontalGrid.Prepender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
                d._reversedPrepender = new e.HorizontalGrid.ReversedPrepender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
                d._appender = new e.HorizontalGrid.Appender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
                d._reversedAppender = new e.HorizontalGrid.ReversedAppender(d, d._settings, d._sizesResolverManager, d._connectors, d._connections, d._guid, d._renderer, d._normalizer, d._operation);
            }
            d._resorter = new e.Resorter(d, d._collector, d._connections, d._settings, d._guid);
            d._disconnector = new e.Disconnector(d, d._collector, d._connections, d._connectionsSorter, d._connectors, d._settings, d._guid, d._appender, d._reversedAppender);
            d._filtrator = new e.Filtrator(d, d._collector, d._connections, d._settings, d._guid, d._disconnector);
            d._sizesTransformer = new e.SizesTransformer.Core(d, d._settings, d._collector, d._connectors, d._connections, d._connectionsSorter, d._guid, d._appender, d._reversedAppender, d._normalizer, d._operation, d._sizesResolverManager, d._eventEmitter);
            d._connections.setSizesTransformerInstance(d._sizesTransformer);
            d._toggleOperation = new e.TransformerOperations.Toggle(d, d._collector, d._connections, d._guid, d._sizesTransformer, d._sizesResolverManager);
            d._transformOperation = new e.TransformerOperations.Transform(d, d._collector, d._connections, d._guid, d._sizesTransformer, d._sizesResolverManager);
            d._operationsQueue = new e.Operations.Queue(d._gridSizesUpdater, d._collector, d._connections, d._connectionsSorter, d._guid, d._settings, d._prepender, d._reversedPrepender, d._appender, d._reversedAppender, d._sizesTransformer, d._sizesResolverManager, d._eventEmitter);
            d._silentRenderer = new e.SilentRenderer(d, d._collector, d._connections, d._operationsQueue, d._renderer, d._renderer.getRendererConnections(), d._sizesResolverManager);
            d._renderer.setSilentRendererInstance(d._silentRenderer);
            d._dragifier = new e.Dragifier(d, d._appender, d._reversedAppender, d._collector, d._connections, d._connectors, d._guid, d._settings, d._sizesResolverManager, d._eventEmitter);
            d._settings.parseAntialiasingSettings();
            d._bindEvents();
        };
        this._bindEvents = function() {
            var a = d._settings.getResizeTimeout();
            var c = null;
            d._resizeEventHandler = function() {
                if (a == null) {
                    d.triggerResize();
                    return;
                }
                if (c != null) {
                    clearTimeout(c);
                    c = null;
                }
                c = setTimeout(function() {
                    d.triggerResize();
                }, a);
            };
            b.add(window, "resize", d._resizeEventHandler);
        };
        this._unbindEvents = function() {
            b.remove(window, "resize");
        };
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.prototype.addToGrid = function(a) {
        this._grid.addToGrid(a);
        return this;
    };
    e.prototype.getGridX2 = function() {
        return this._grid.getGridX2();
    };
    e.prototype.getGridY2 = function() {
        return this._grid.getGridY2();
    };
    e.prototype.getGrid = function() {
        return this._grid.getGrid();
    };
    e.prototype.getCalculatedGridWidth = function() {
        return this._connections.getMaxX2();
    };
    e.prototype.getCalculatedGridHeight = function() {
        return this._connections.getMaxY2();
    };
    e.prototype.getGridWidth = function() {
        return Math.round(this.getGridX2() + 1);
    };
    e.prototype.getGridHeight = function() {
        return Math.round(this.getGridY2() + 1);
    };
    e.prototype.getCollector = function() {
        return this._collector;
    };
    e.prototype.getRenderer = function() {
        return this._renderer;
    };
    e.prototype.getTransformOperation = function() {
        return this._transformOperation;
    };
    e.prototype.getResponsiveClassesManager = function() {
        return this._responsiveClassesManager;
    };
    e.prototype.splitToBatches = function(a, b) {
        return this._operationsQueue.splitItemsToBatches(a, b);
    };
    e.prototype.markAsGridItem = function(a) {
        this._grid.markAsGridItem(a);
        return this;
    };
    e.prototype.scheduleGridSizesUpdate = function() {
        this._gridSizesUpdater.scheduleGridSizesUpdate();
    };
    e.prototype.triggerResize = function() {
        this.retransformAllSizes();
    };
    e.prototype.toggleBy = function(a) {
        this._settings.setToggle(a);
        return this;
    };
    e.prototype.sortBy = function(a) {
        this._settings.setSort(a);
        return this;
    };
    e.prototype.setRetransformSort = function(a) {
        this._settings.setRetransformSort(a);
        this.retransformAllSizes();
        return this;
    };
    e.prototype.setRepackSize = function(a) {
        this._settings.setCustomRepackSize(a);
        return this;
    };
    e.prototype.filterBy = function(a) {
        this._sizesTransformer.stopRetransformAllConnectionsQueue();
        this._settings.setFilter(a);
        this._filtrator.filter();
        this.retransformAllSizes();
        return this;
    };
    e.prototype.resort = function() {
        this._sizesTransformer.stopRetransformAllConnectionsQueue();
        this._resorter.resort();
        this.retransformAllSizes();
        return this;
    };
    e.prototype.collect = function() {
        return this._collector.collect();
    };
    e.prototype.collectAllConnectedItems = function() {
        return this._collector.collectAllConnectedItems();
    };
    e.prototype.collectAllDisconnectedItems = function() {
        return this._collector.collectAllDisconnectedItems();
    };
    e.prototype.getFirst = function() {
        return this._iterator.getFirst();
    };
    e.prototype.getLast = function() {
        return this._iterator.getLast();
    };
    e.prototype.getNext = function(a) {
        return this._iterator.getNext(a);
    };
    e.prototype.getPrev = function(a) {
        return this._iterator.getPrev(a);
    };
    e.prototype.getAll = function() {
        return this._iterator.getAll();
    };
    e.prototype.pop = function() {
        var a = this._iterator.getFirst();
        if (a != null) this.disconnect(a);
        return a;
    };
    e.prototype.shift = function() {
        var a = this._iterator.getLast();
        if (a != null) this.disconnect(a);
        return a;
    };
    e.prototype.disconnect = function(a) {
        var b = this;
        a = b._itemClonesManager.unfilterClones(a);
        a = b._collector.filterOnlyConnectedItems(a);
        b._lifecycleCallbacks.executePreDisconnectCallbacks(a);
        var c = function() {
            this._sizesTransformer.stopRetransformAllConnectionsQueue();
            this._disconnector.disconnect(a, e.Disconnector.DISCONNECT_TYPES.HARD);
            this.retransformAllSizes();
        };
        setTimeout(function() {
            c.call(b);
        }, e.REFLOW_OPTIMIZATION_TIMEOUT);
        return this;
    };
    e.prototype.setCoordsChanger = function(a) {
        this._settings.setCoordsChanger(a);
        return this;
    };
    e.prototype.setSizesChanger = function(a) {
        this._settings.setSizesChanger(a);
        return this;
    };
    e.prototype.setDraggableItemDecorator = function(a) {
        this._settings.setDraggableItemDecorator(a);
        return this;
    };
    e.prototype.setItemWidthPercentageAntialias = function(a) {
        this._normalizer.bindZIndexesUpdates();
        this._normalizer.setItemWidthAntialiasPercentageValue(a);
        return this;
    };
    e.prototype.setItemHeightPercentageAntialias = function(a) {
        this._normalizer.bindZIndexesUpdates();
        this._normalizer.setItemHeightAntialiasPercentageValue(a);
        return this;
    };
    e.prototype.setItemWidthPxAntialias = function(a) {
        this._normalizer.bindZIndexesUpdates();
        this._normalizer.setItemWidthAntialiasPxValue(a);
        return this;
    };
    e.prototype.setItemHeightPxAntialias = function(a) {
        this._normalizer.bindZIndexesUpdates();
        this._normalizer.setItemHeightAntialiasPxValue(a);
        return this;
    };
    e.prototype.disableZIndexesUpdates = function() {
        this._normalizer.disableZIndexesUpdates();
        return this;
    };
    e.prototype.setToggleAnimationMsDuration = function(a) {
        this._settings.setToggleAnimationMsDuration(a);
        return this;
    };
    e.prototype.setCoordsChangeAnimationMsDuration = function(a) {
        this._settings.setCoordsChangeAnimationMsDuration(a);
        return this;
    };
    e.prototype.setToggleTransitionTiming = function(a) {
        this._settings.setToggleTransitionTiming(a);
        return this;
    };
    e.prototype.setCoordsChangeTransitionTiming = function(a) {
        this._settings.setCoordsChangeTransitionTiming(a);
        return this;
    };
    e.prototype.setAlignmentType = function(a) {
        this._settings.setAlignmentType(a);
        this.retransformAllSizes();
        return this;
    };
    e.prototype.setRotatePerspective = function(a) {
        this._settings.setRotatePerspective(a);
        return this;
    };
    e.prototype.setRotateBackface = function(a) {
        this._settings.setRotateBackface(a);
        return this;
    };
    e.prototype.enableRotateBackface = function() {
        this._settings.setRotateBackface(true);
        return this;
    };
    e.prototype.disableRotateBackface = function() {
        this._settings.setRotateBackface(false);
        return this;
    };
    e.prototype.setRotateAngles = function(a) {
        this._settings.setRotateAngles(a);
        return this;
    };
    e.prototype.setSortDispersionValue = function(a) {
        this._settings.setSortDispersionValue(a);
        return this;
    };
    e.prototype.setDefaultIntersectionStrategy = function() {
        this._settings.setDefaultIntersectionStrategy();
        this.retransformAllSizes();
        return this;
    };
    e.prototype.setNoIntersectionStrategy = function() {
        this._settings.setNoIntersectionStrategy();
        this.retransformAllSizes();
        return this;
    };
    e.prototype.setRetransformQueueBatchSize = function(a) {
        this._settings.setRetransformQueueBatchSize(a);
        return this;
    };
    e.prototype.setRetransformQueueBatchTimeout = function(a) {
        this._settings.setRetransformQueueBatchTimeout(a);
        return this;
    };
    e.prototype.prepend = function(a, b, c) {
        if (this._settings.shouldResolveImages()) {
            this._imagesResolver.scheduleImagesResolve(this._collector.toDOMCollection(a), e.ImagesResolver.OPERATIONS.PREPEND, {
                batchSize: b,
                batchTimeout: c
            });
        } else {
            this.executePrepend(a, b, c);
        }
        return this;
    };
    e.prototype.executePrepend = function(a, b, c) {
        if (this._settings.isMirroredPrepend()) {
            this.insertBefore(a, null, b, c);
            return this;
        }
        this._lifecycleCallbacks.executePreInsertCallbacks(a);
        var d = function() {
            this._operationsQueue.schedulePrependOperation(a, b, c);
        };
        var f = this;
        setTimeout(function() {
            d.call(f);
        }, e.REFLOW_OPTIMIZATION_TIMEOUT);
    };
    e.prototype.append = function(a, b, c) {
        if (this._settings.shouldResolveImages()) {
            this._imagesResolver.scheduleImagesResolve(this._collector.toDOMCollection(a), e.ImagesResolver.OPERATIONS.APPEND, {
                batchSize: b,
                batchTimeout: c
            });
        } else {
            this.executeAppend(a, b, c);
        }
        return this;
    };
    e.prototype.executeAppend = function(a, b, c) {
        this._lifecycleCallbacks.executePreInsertCallbacks(a);
        var d = function() {
            this._operationsQueue.scheduleAppendOperation(a, b, c);
        };
        var f = this;
        setTimeout(function() {
            d.call(f);
        }, e.REFLOW_OPTIMIZATION_TIMEOUT);
    };
    e.prototype.silentAppend = function(a, b, c) {
        if (this._settings.shouldResolveImages()) {
            this._imagesResolver.scheduleImagesResolve(this._collector.toDOMCollection(a), e.ImagesResolver.OPERATIONS.SILENT_APPEND, {
                batchSize: b,
                batchTimeout: c
            });
        } else {
            this.executeSilentAppend(a, b, c);
        }
        return this;
    };
    e.prototype.executeSilentAppend = function(a, b, c) {
        this._silentRenderer.scheduleForSilentRender(this._collector.toDOMCollection(a));
        this.executeAppend(a, b, c);
    };
    e.prototype.silentRender = function(a, b, c) {
        this._silentRenderer.execute(a, b, c);
        return this;
    };
    e.prototype.getScheduledForSilentRenderItems = function(a) {
        return this._silentRenderer.getScheduledForSilentRenderItems(a);
    };
    e.prototype.insertBefore = function(a, b, c, d) {
        if (this._settings.shouldResolveImages()) {
            this._imagesResolver.scheduleImagesResolve(this._collector.toDOMCollection(a), e.ImagesResolver.OPERATIONS.INSERT_BEFORE, {
                batchSize: c,
                batchTimeout: d,
                beforeItem: b
            });
        } else {
            this.executeInsertBefore(a, b, c, d);
        }
        return this;
    };
    e.prototype.executeInsertBefore = function(a, b, c, d) {
        this._lifecycleCallbacks.executePreInsertCallbacks(a);
        var f = function() {
            this._operationsQueue.scheduleInsertBeforeOperation(a, b, c, d);
        };
        var g = this;
        setTimeout(function() {
            f.call(g);
        }, e.REFLOW_OPTIMIZATION_TIMEOUT);
    };
    e.prototype.insertAfter = function(a, b, c, d) {
        if (this._settings.shouldResolveImages()) {
            this._imagesResolver.scheduleImagesResolve(this._collector.toDOMCollection(a), e.ImagesResolver.OPERATIONS.INSERT_AFTER, {
                batchSize: c,
                batchTimeout: d,
                afterItem: b
            });
        } else {
            this.executeInsertAfter(a, b, c, d);
        }
        return this;
    };
    e.prototype.executeInsertAfter = function(a, b, c, d) {
        this._lifecycleCallbacks.executePreInsertCallbacks(a);
        var f = function() {
            this._operationsQueue.scheduleInsertAfterOperation(a, b, c, d);
        };
        var g = this;
        setTimeout(function() {
            f.call(g);
        }, e.REFLOW_OPTIMIZATION_TIMEOUT);
    };
    e.prototype.triggerRotate = function(a, b, c, d) {
        var e = this;
        this.setToggle(b);
        var f = this._collector.toDOMCollection(a);
        if (typeof c == "undefined") {
            this._renderer.rotateItems(f);
            return this;
        }
        this._operationsQueue.scheduleAsyncFnExecutionByBatches(f, c, d, function(a) {
            e._renderer.rotateItems(a);
        });
        return this;
    };
    e.prototype.retransformAllSizes = function() {
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.executeRetransformAllSizes();
        return this;
    };
    e.prototype.toggleSizes = function(a, b, c) {
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.schedule(this._toggleOperation.prepare(a, b, c, false));
        return this;
    };
    e.prototype.transformSizes = function(a, b, c) {
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.schedule(this._transformOperation.prepare(a, b, c, false));
        return this;
    };
    e.prototype.toggleSizesWithPaddingBottom = function(a, b, c) {
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.schedule(this._toggleOperation.prepare(a, b, c, true));
        return this;
    };
    e.prototype.transformSizesWithPaddingBottom = function(a, b, c) {
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.schedule(this._transformOperation.prepare(a, b, c, true));
        return this;
    };
    e.prototype.toggleResponsiveClasses = function(a, b) {
        var c = this._responsiveClassesManager.toggleResponsiveClasses(a, b);
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.executeRetransformFromFirstSortedConnection(c);
        return this;
    };
    e.prototype.addResponsiveClasses = function(a, b) {
        var c = this._responsiveClassesManager.addResponsiveClasses(a, b);
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.executeRetransformFromFirstSortedConnection(c);
        return this;
    };
    e.prototype.removeResponsiveClasses = function(a, b) {
        var c = this._responsiveClassesManager.removeResponsiveClasses(a, b);
        this._normalizer.updateItemAntialiasValues();
        this._transformOperation.executeRetransformFromFirstSortedConnection(c);
        return this;
    };
    e.prototype.bindDragifierEvents = function() {
        this._dragifier.bindDragifierEvents();
        return this;
    };
    e.prototype.unbindDragifierEvents = function() {
        this._dragifier.unbindDragifierEvents();
        return this;
    };
    e.prototype.isDragifierEnabled = function() {
        return this._dragifier.isDragifierEnabled();
    };
    e.prototype.isItemConnected = function(a) {
        return this._collector.isItemConnected(a);
    };
    e.prototype.addPreInsertLifecycleCallback = function(a) {
        this._lifecycleCallbacks.addPreInsertCallback(a);
        return this;
    };
    e.prototype.addPreDisconnectLifecycleCallback = function(a) {
        this._lifecycleCallbacks.addPreDisconnectCallback(a);
        return this;
    };
    e.prototype.setItemClonesManagerLifecycleCallbacks = function() {
        var a = this;
        this.addPreInsertLifecycleCallback(function(b) {
            for (var c = 0; c < b.length; c++) {
                a._itemClonesManager.createClone(b[c]);
            }
        });
        this.addPreDisconnectLifecycleCallback(function(b) {
            setTimeout(function() {
                for (var c = 0; c < b.length; c++) {
                    a._itemClonesManager.destroyClone(b[c]);
                }
            }, a._settings.getToggleAnimationMsDuration());
        });
        return this;
    };
    e.prototype.getItemClonesManager = function() {
        return this._itemClonesManager;
    };
    e.prototype.hasItemBindedClone = function(a) {
        var b = this._collector.toDOMCollection(a);
        var a = b[0];
        return this._itemClonesManager.hasBindedClone(a);
    };
    e.prototype.isItemClone = function(a) {
        var b = this._collector.toDOMCollection(a);
        var a = b[0];
        return this._itemClonesManager.isItemClone(a);
    };
    e.prototype.getItemClone = function(a) {
        var b = this._collector.toDOMCollection(a);
        var a = b[0];
        if (!this._itemClonesManager.hasBindedClone(a)) new Error("Gridifier error: item has no binded clone.(Wrong item?). Item = ", a);
        return this._itemClonesManager.getBindedClone(a);
    };
    e.prototype.getOriginalItemFromClone = function(a) {
        var b = this._collector.toDOMCollection(a);
        var c = b[0];
        return this._itemClonesManager.getOriginalItemFromClone(c);
    };
    e.prototype.getConnectedItems = function() {
        var a = this._connections.get();
        var b = [];
        for (var c = 0; c < a.length; c++) b.push(a[c].item);
        return b;
    };
    e.prototype.hasConnectedItemAtPoint = function(a, b) {
        var c = this._itemClonesManager.getConnectionItemAtPoint(a, b);
        if (c == null) return false;
        return true;
    };
    e.prototype.getConnectedItemAtPoint = function(a, b) {
        return this._itemClonesManager.getConnectionItemAtPoint(a, b);
    };
    e.prototype.setToggle = e.prototype.toggleBy;
    e.prototype.setSort = e.prototype.sortBy;
    e.prototype.setFilter = e.prototype.filterBy;
    e.prototype.collectNew = e.prototype.collectAllDisconnectedItems;
    e.prototype.appendNew = function(a, b) {
        this.append(this.collectNew(), a, b);
        return this;
    };
    e.prototype.prependNew = function(a, b) {
        this.prepend(this.collectNew(), a, b);
        return this;
    };
    e.prototype.collectConnected = e.prototype.collectAllConnectedItems;
    e.prototype.getForSilentRender = e.prototype.getScheduledForSilentRenderItems;
    e.prototype.setAlign = e.prototype.setAlignmentType;
    e.prototype.enableIntersections = e.prototype.setDefaultIntersectionStrategy;
    e.prototype.disableIntersections = e.prototype.setNoIntersectionStrategy;
    e.prototype.setToggleDuration = e.prototype.setToggleAnimationMsDuration;
    e.prototype.setCoordsChangeDuration = e.prototype.setCoordsChangeAnimationMsDuration;
    e.prototype.setItemWidthPtAntialias = e.prototype.setItemWidthPercentageAntialias;
    e.prototype.setItemHeightPtAntialias = e.prototype.setItemHeightPercentageAntialias;
    e.prototype.setWidthPxAntialias = e.prototype.setItemWidthPxAntialias;
    e.prototype.setHeightPxAntialias = e.prototype.setItemHeightPxAntialias;
    e.prototype.setWidthPtAntialias = e.prototype.setItemWidthPercentageAntialias;
    e.prototype.setHeightPtAntialias = e.prototype.setItemHeightPercentageAntialias;
    e.prototype.retransformGrid = e.prototype.retransformAllSizes;
    e.prototype.setDragDecorator = e.prototype.setDraggableItemDecorator;
    e.prototype.add = e.prototype.addToGrid;
    e.prototype.enableDragifier = e.prototype.bindDragifierEvents;
    e.prototype.disableDragifier = e.prototype.unbindDragifierEvents;
    e.Api = {};
    e.HorizontalGrid = {};
    e.VerticalGrid = {};
    e.Operations = {};
    e.TransformerOperations = {};
    e.SizesTransformer = {};
    e.REFLOW_OPTIMIZATION_TIMEOUT = 0;
    e.GRID_TYPES = {
        VERTICAL_GRID: "verticalGrid",
        HORIZONTAL_GRID: "horizontalGrid",
        VERTICAL_GRID_SHORT: "vertical",
        HORIZONTAL_GRID_SHORT: "horizontal"
    };
    e.PREPEND_TYPES = {
        MIRRORED_PREPEND: "mirroredPrepend",
        DEFAULT_PREPEND: "defaultPrepend",
        REVERSED_PREPEND: "reversedPrepend",
        MIRRORED_PREPEND_SHORT: "mirrored",
        DEFAULT_PREPEND_SHORT: "default",
        REVERSED_PREPEND_SHORT: "reversed"
    };
    e.APPEND_TYPES = {
        DEFAULT_APPEND: "defaultAppend",
        REVERSED_APPEND: "reversedAppend",
        DEFAULT_APPEND_SHORT: "default",
        REVERSED_APPEND_SHORT: "reversed"
    };
    e.INTERSECTION_STRATEGIES = {
        DEFAULT: "default",
        NO_INTERSECTIONS: "noIntersections",
        DEFAULT_SHORT: "yes",
        NO_INTERSECTIONS_SHORT: "no"
    };
    e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES = {
        FOR_VERTICAL_GRID: {
            TOP: "top",
            CENTER: "center",
            BOTTOM: "bottom"
        },
        FOR_HORIZONTAL_GRID: {
            LEFT: "left",
            CENTER: "center",
            RIGHT: "right"
        }
    };
    e.SORT_DISPERSION_MODES = {
        DISABLED: "disabled",
        CUSTOM: "custom",
        CUSTOM_ALL_EMPTY_SPACE: "customAllEmptySpace",
        CUSTOM_ALL_EMPTY_SPACE_SHORT: "allGrid"
    };
    e.GRID_ITEM_MARKING_STRATEGIES = {
        BY_CLASS: "class",
        BY_DATA_ATTR: "data",
        BY_QUERY: "query"
    };
    e.GRID_ITEM_MARKING_DEFAULTS = {
        CLASS: "gridifier-item",
        DATA_ATTR: "data-gridifier-item",
        QUERY: "div > div"
    };
    e.DRAGIFIER_MODES = {
        INTERSECTION: "intersection",
        DISCRETIZATION: "discretization"
    };
    e.OPERATIONS = {
        PREPEND: 0,
        REVERSED_PREPEND: 1,
        APPEND: 2,
        REVERSED_APPEND: 3,
        MIRRORED_PREPEND: 4
    };
    e.DEFAULT_TOGGLE_ANIMATION_MS_DURATION = 500;
    e.DEFAULT_COORDS_CHANGE_ANIMATION_MS_DURATION = 300;
    e.DEFAULT_TOGGLE_TRANSITION_TIMING = "ease";
    e.DEFAULT_COORDS_CHANGE_TRANSITION_TIMING = "ease";
    e.DEFAULT_ROTATE_PERSPECTIVE = "200px";
    e.DEFAULT_ROTATE_BACKFACE = true;
    e.DEFAULT_ROTATE_ANGLES = {
        FRONT_FRAME_INIT: 0,
        BACK_FRAME_INIT: -180,
        FRONT_FRAME_TARGET: 180,
        BACK_FRAME_TARGET: 0
    };
    e.GRID_TRANSFORM_TYPES = {
        EXPAND: "expand",
        FIT: "fit",
        DISABLED: "disabled"
    };
    e.DEFAULT_GRID_TRANSFORM_TIMEOUT = 100;
    e.RETRANSFORM_QUEUE_DEFAULT_BATCH_SIZE = 12;
    e.RETRANSFORM_QUEUE_DEFAULT_BATCH_TIMEOUT = 25;
    e.Connections = function(a, b, c, d, f) {
        var g = this;
        this._gridifier = null;
        this._connections = null;
        this._guid = null;
        this._sizesTransformer = null;
        this._connectionsSorter = null;
        this._sizesResolverManager = null;
        this._connectedItemMarker = null;
        this._css = {};
        this._construct = function() {
            g._gridifier = a;
            g._connections = b;
            g._guid = c;
            g._connectionsSorter = d;
            g._sizesResolverManager = f;
            g._connectedItemMarker = new e.ConnectedItemMarker();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            g._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Connections.prototype.getMaxX2 = function() {
        var a = this._connections.get();
        if (a.length == 0) return 0;
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            if (a[c].x2 > b) b = a[c].x2;
        }
        return b;
    };
    e.Connections.prototype.getMaxY2 = function() {
        var a = this._connections.get();
        if (a.length == 0) return 0;
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            if (a[c].y2 > b) b = a[c].y2;
        }
        return b;
    };
    e.Connections.prototype.setSizesTransformerInstance = function(a) {
        this._sizesTransformer = a;
    };
    e.Connections.prototype.findConnectionByItem = function(a, b) {
        var c = this._connections.get();
        if (!b) {
            if (c.length == 0) new e.Error(e.Error.ERROR_TYPES.CONNECTIONS.NO_CONNECTIONS);
        }
        var d = this._guid.getItemGUID(a);
        var f = null;
        for (var g = 0; g < c.length; g++) {
            if (d == c[g].itemGUID) {
                f = c[g];
                break;
            }
        }
        if (f == null) {
            if (!this._sizesTransformer.isTransformerQueueEmpty()) {
                var h = this._sizesTransformer.getQueuedConnectionsPerTransform();
                for (var g = 0; g < h.length; g++) {
                    if (d == h[g].itemGUID) {
                        f = h[g];
                        break;
                    }
                }
            }
        }
        if (!b) {
            if (f == null) {
                new e.Error(e.Error.ERROR_TYPES.CONNECTIONS.CONNECTION_BY_ITEM_NOT_FOUND, {
                    item: a,
                    connections: c
                });
            }
        }
        return f;
    };
    e.Connections.prototype.remapAllItemGUIDS = function() {
        this._guid.reinit();
        var a = this._connectionsSorter.sortConnectionsPerReappend(this._connections.get());
        for (var b = 0; b < a.length; b++) {
            var c = this._guid.markNextAppendedItem(a[b].item);
            a[b].itemGUID = c;
        }
    };
    e.Connections.prototype.remapAllItemGUIDSInSortedConnections = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = this._guid.markNextAppendedItem(a[b].item);
            a[b].itemGUID = c;
        }
    };
    e.Connections.prototype.getConnectionsByItemGUIDS = function(a) {
        var b = this._connections.get();
        var c = [];
        for (var d = 0; d < b.length; d++) {
            for (var e = 0; e < a.length; e++) {
                if (b[d].itemGUID == a[e]) {
                    c.push(b[d]);
                    break;
                }
            }
        }
        return c;
    };
    e.Connections.prototype.createItemConnection = function(a, b) {
        var c = b;
        b.x1 = d.toFixed(b.x1, 2);
        b.x2 = d.toFixed(b.x2, 2);
        b.y1 = d.toFixed(b.y1, 2);
        b.y2 = d.toFixed(b.y2, 2);
        c.item = a;
        c.itemGUID = d.toInt(this._guid.getItemGUID(a));
        if (!c.hasOwnProperty("horizontalOffset")) c.horizontalOffset = 0;
        if (!c.hasOwnProperty("verticalOffset")) c.verticalOffset = 0;
        if (!c.hasOwnProperty(e.SizesTransformer.RESTRICT_CONNECTION_COLLECT)) c[e.SizesTransformer.RESTRICT_CONNECTION_COLLECT] = false;
        if (!this._connectedItemMarker.isItemConnected(a)) this._connectedItemMarker.markItemAsConnected(a);
        return c;
    };
    e.Connections.prototype.syncConnectionParams = function(a) {
        var b = this._connections.get();
        for (var c = 0; c < a.length; c++) {
            for (var d = 0; d < b.length; d++) {
                if (b[d].itemGUID == a[c].itemGUID) {
                    var f = e.SizesTransformer.RESTRICT_CONNECTION_COLLECT;
                    b[d][f] = a[c][f];
                    b[d].verticalOffset = a[c].verticalOffset;
                    b[d].horizontalOffset = a[c].horizontalOffset;
                    b[d].x1 = a[c].x1;
                    b[d].x2 = a[c].x2;
                    b[d].y1 = a[c].y1;
                    b[d].y2 = a[c].y2;
                    break;
                }
            }
        }
    };
    e.Connections.prototype.getMinConnectionWidth = function() {
        var a = this._connections.get();
        if (a.length == 0) return 0;
        var b = this;
        var c = this._gridifier.getGridX2();
        var d = function(d) {
            if (a[d].x1 >= a[d].x2 || a[d].x1 < 0 || a[d].x2 > c) {
                var e = b._sizesResolverManager.outerWidth(a[d].item, true);
            } else {
                var e = a[d].x2 - a[d].x1 + 1;
            }
            return e;
        };
        var e = d(0);
        for (var f = 1; f < a.length; f++) {
            var g = d(f);
            if (g < e) e = g;
        }
        return e;
    };
    e.Connections.prototype.getMinConnectionHeight = function() {
        var a = this._connections.get();
        if (a.length == 0) return 0;
        var b = this;
        var c = this._gridifier.getGridY2();
        var d = function(d) {
            if (a[d].y1 >= a[d].y2 || a[d].y1 < 0 || a[d].y2 > c) {
                var e = b._sizesResolverManager.outerHeight(a[d].item, true);
            } else {
                var e = a[d].y2 - a[d].y1 + 1;
            }
            return e;
        };
        var e = d(0);
        for (var f = 1; f < a.length; f++) {
            var g = d(f);
            if (g < e) e = g;
        }
        return e;
    };
    e.Connections.prototype.isAnyConnectionItemGUIDSmallerThan = function(a, b) {
        var c = this._guid.getItemGUID(b);
        for (var d = 0; d < a.length; d++) {
            var e = this._guid.getItemGUID(a[d].item);
            if (e < c) return true;
        }
        return false;
    };
    e.Connections.prototype.isAnyConnectionItemGUIDBiggerThan = function(a, b) {
        var c = this._guid.getItemGUID(b);
        for (var d = 0; d < a.length; d++) {
            var e = this._guid.getItemGUID(a[d].item);
            if (e > c) return true;
        }
        return false;
    };
    e.ConnectionsIntersector = function(a) {
        var b = this;
        this._connections = null;
        this._css = {};
        this._construct = function() {
            b._connections = a;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ConnectionsIntersector.prototype.isIntersectingAnyConnection = function(a, b) {
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            var e = b.y1 < d.y1 && b.y2 < d.y1;
            var f = b.y1 > d.y2 && b.y2 > d.y2;
            var g = b.x1 < d.x1 && b.x2 < d.x1;
            var h = b.x1 > d.x2 && b.x2 > d.x2;
            if (!e && !f && !g && !h) return true;
        }
        return false;
    };
    e.ConnectionsIntersector.prototype.getAllConnectionsWithIntersectedCenter = function(a) {
        var b = this._connections.get();
        var c = [];
        for (var d = 0; d < b.length; d++) {
            var e = b[d].x2 - b[d].x1 + 1;
            var f = b[d].y2 - b[d].y1 + 1;
            var g = {
                x1: b[d].x1 + e / 2,
                x2: b[d].x1 + e / 2,
                y1: b[d].y1 + f / 2,
                y2: b[d].y1 + f / 2
            };
            if (this.isIntersectingAnyConnection([ g ], a)) {
                c.push(b[d]);
            }
        }
        return c;
    };
    e.Connectors = function(a, b) {
        var c = this;
        this._guid = null;
        this._connections = null;
        this._connectors = [];
        this._nextFlushCallback = null;
        this._css = {};
        this._construct = function() {
            c._guid = a;
            c._connections = b;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Connectors.INITIAL_CONNECTOR_ITEM_GUID = -1;
    e.Connectors.TYPES = {
        APPEND: {
            DEFAULT: "appendDefault",
            REVERSED: "appendReversed"
        },
        PREPEND: {
            DEFAULT: "prependDefault",
            REVERSED: "prependReversed"
        }
    };
    e.Connectors.SIDES = {
        LEFT: {
            TOP: "leftTop",
            BOTTOM: "leftBottom"
        },
        BOTTOM: {
            RIGHT: "bottomRight",
            LEFT: "bottomLeft"
        },
        RIGHT: {
            TOP: "rightTop",
            BOTTOM: "rightBottom"
        },
        TOP: {
            LEFT: "topLeft",
            RIGHT: "topRight"
        }
    };
    e.Connectors.isLeftTopSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.LEFT.TOP;
    };
    e.Connectors.isLeftBottomSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.LEFT.BOTTOM;
    };
    e.Connectors.isBottomRightSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.BOTTOM.RIGHT;
    };
    e.Connectors.isBottomLeftSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.BOTTOM.LEFT;
    };
    e.Connectors.isRightTopSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.RIGHT.TOP;
    };
    e.Connectors.isRightBottomSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.RIGHT.BOTTOM;
    };
    e.Connectors.isTopLeftSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.TOP.LEFT;
    };
    e.Connectors.isTopRightSideConnector = function(a) {
        return a.side == e.Connectors.SIDES.TOP.RIGHT;
    };
    e.Connectors.isInitialConnector = function(a) {
        return a.itemGUID == e.Connectors.INITIAL_CONNECTOR_ITEM_GUID;
    };
    e.Connectors.prototype._addConnector = function(a, b, c, f, g) {
        if (typeof g == "undefined") var g = e.Connectors.INITIAL_CONNECTOR_ITEM_GUID;
        this._connectors.push({
            type: a,
            side: b,
            x: d.toFixed(c, 2),
            y: d.toFixed(f, 2),
            itemGUID: g
        });
    };
    e.Connectors.prototype.addAppendConnector = function(a, b, c, d) {
        this._addConnector(e.Connectors.TYPES.APPEND.DEFAULT, a, b, c, d);
    };
    e.Connectors.prototype.addReversedAppendConnector = function(a, b, c, d) {
        this._addConnector(e.Connectors.TYPES.APPEND.REVERSED, a, b, c, d);
    };
    e.Connectors.prototype.addPrependConnector = function(a, b, c, d) {
        this._addConnector(e.Connectors.TYPES.PREPEND.DEFAULT, a, b, c, d);
    };
    e.Connectors.prototype.addReversedPrependConnector = function(a, b, c, d) {
        this._addConnector(e.Connectors.TYPES.PREPEND.REVERSED, a, b, c, d);
    };
    e.Connectors.prototype.count = function() {
        return this._connectors.length;
    };
    e.Connectors.prototype.setNextFlushCallback = function(a) {
        this._nextFlushCallback = a;
    };
    e.Connectors.prototype.flush = function() {
        this._connectors = [];
        if (typeof this._nextFlushCallback == "function") {
            this._nextFlushCallback();
            this._nextFlushCallback = null;
        }
    };
    e.Connectors.prototype.get = function() {
        return this._connectors;
    };
    e.Connectors.prototype.set = function(a) {
        this._connectors = a;
    };
    e.Connectors.prototype.getClone = function() {
        var a = [];
        for (var b = 0; b < this._connectors.length; b++) {
            a.push({
                type: this._connectors[b].type,
                side: this._connectors[b].side,
                x: this._connectors[b].x,
                y: this._connectors[b].y,
                itemGUID: this._connectors[b].itemGUID,
                connectorIndex: b
            });
        }
        return a;
    };
    e.ConnectorsIntersector = function(a, b) {
        var c = this;
        this._connections = null;
        this._settings = null;
        this._css = {};
        this._construct = function() {
            c._connections = a;
            c._settings = b;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ConnectorsIntersector.prototype.getMostLeftFromIntersectedRightItems = function(a) {
        var b = this._connections.get();
        var c = null;
        var d = function(b) {
            if (a.y >= b.y1 && a.y <= b.y2 && a.x < b.x1) {
                if (c == null) c = b; else {
                    if (b.x1 < c.x1) c = b;
                }
            }
        };
        if (this._settings.isVerticalGrid()) {
            var e = this._connections.getAllHorizontallyIntersectedConnections(a);
            for (var f = 0; f < e.length; f++) {
                d(b[e[f]]);
            }
        } else if (this._settings.isHorizontalGrid()) {
            var e = this._connections.getAllVerticallyIntersectedAndRightConnections(a);
            for (var f = 0; f < e.length; f++) {
                for (var g = 0; g < e[f].length; g++) {
                    d(b[e[f][g]]);
                }
            }
        }
        return c;
    };
    e.ConnectorsIntersector.prototype.getMostBottomFromIntersectedTopOrTopLeftItems = function(a) {
        var b = this._connections.get();
        var c = null;
        if (this._settings.isVerticalGrid()) var d = this._connections.getAllHorizontallyIntersectedAndUpperConnections(a); else if (this._settings.isHorizontalGrid()) var d = this._connections.getAllVerticallyIntersectedAndLeftConnections(a);
        for (var e = 0; e < d.length; e++) {
            for (var f = 0; f < d[e].length; f++) {
                var g = b[d[e][f]];
                if ((a.x >= g.x1 && a.x <= g.x2 || a.x > g.x2) && a.y > g.y2) {
                    if (c == null) c = g; else {
                        if (g.y2 > c.y2) c = g;
                    }
                }
            }
        }
        return c;
    };
    e.ConnectorsIntersector.prototype.getMostBottomFromIntersectedTopOrTopRightItems = function(a) {
        var b = this._connections.get();
        var c = null;
        if (this._settings.isVerticalGrid()) var d = this._connections.getAllHorizontallyIntersectedAndUpperConnections(a); else if (this._settings.isHorizontalGrid()) var d = this._connections.getAllVerticallyIntersectedAndRightConnections(a);
        for (var e = 0; e < d.length; e++) {
            for (var f = 0; f < d[e].length; f++) {
                var g = b[d[e][f]];
                if ((a.x >= g.x1 && a.x <= g.x2 || a.x < g.x1) && a.y > g.y2) {
                    if (c == null) c = g; else {
                        if (g.y2 > c.y2) c = g;
                    }
                }
            }
        }
        return c;
    };
    e.ConnectorsIntersector.prototype.getMostRightFromIntersectedLeftItems = function(a) {
        var b = this._connections.get();
        var c = null;
        var d = function(b) {
            if (a.y >= b.y1 && a.y <= b.y2 && a.x > b.x2) {
                if (c == null) c = b; else {
                    if (b.x1 > c.x2) c = b;
                }
            }
        };
        if (this._settings.isVerticalGrid()) {
            var e = this._connections.getAllHorizontallyIntersectedConnections(a);
            for (var f = 0; f < e.length; f++) {
                d(b[e[f]]);
            }
        } else if (this._settings.isHorizontalGrid()) {
            var e = this._connections.getAllVerticallyIntersectedAndLeftConnections(a);
            for (var f = 0; f < e.length; f++) {
                for (var g = 0; g < e[f].length; g++) {
                    d(b[e[f][g]]);
                }
            }
        }
        return c;
    };
    e.ConnectorsIntersector.prototype.getMostTopFromIntersectedBottomOrBottomRightItems = function(a) {
        var b = this._connections.get();
        var c = null;
        if (this._settings.isVerticalGrid()) var d = this._connections.getAllHorizontallyIntersectedAndLowerConnections(a); else if (this._settings.isHorizontalGrid()) var d = this._connections.getAllVerticallyIntersectedAndRightConnections(a);
        for (var e = 0; e < d.length; e++) {
            for (var f = 0; f < d[e].length; f++) {
                var g = b[d[e][f]];
                if ((a.x >= g.x1 && a.x <= g.x2 || a.x < g.x1) && a.y < g.y1) {
                    if (c == null) c = g; else {
                        if (g.y1 < c.y1) c = g;
                    }
                }
            }
        }
        return c;
    };
    e.ConnectorsIntersector.prototype.getMostTopFromIntersectedBottomOrBottomLeftItems = function(a) {
        var b = this._connections.get();
        var c = null;
        if (this._settings.isVerticalGrid()) var d = this._connections.getAllHorizontallyIntersectedAndLowerConnections(a); else if (this._settings.isHorizontalGrid()) var d = this._connections.getAllVerticallyIntersectedAndLeftConnections(a);
        for (var e = 0; e < d.length; e++) {
            for (var f = 0; f < d[e].length; f++) {
                var g = b[d[e][f]];
                if ((a.x >= g.x1 && a.x <= g.x2 || a.x > g.x2) && a.y < g.y1) {
                    if (c == null) c = g; else {
                        if (g.y1 < c.y1) c = g;
                    }
                }
            }
        }
        return c;
    };
    e.ConnectorsNormalizer = function(a, b, c) {
        var d = this;
        this._connections = null;
        this._connectors = null;
        this._settings = null;
        this._css = {};
        this._construct = function() {
            d._connections = a;
            d._connectors = b;
            d._settings = c;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ConnectorsNormalizer.prototype.applyConnectionRoundingPerConnector = function(a, b) {
        a.originalX1 = a.x1;
        a.originalX2 = a.x2;
        a.originalY1 = a.y1;
        a.originalY2 = a.y2;
        if (e.Connectors.isBottomLeftSideConnector(b) || e.Connectors.isRightTopSideConnector(b)) {
            a.x1 = Math.floor(a.x1);
            a.y1 = Math.floor(a.y1);
        } else if (e.Connectors.isLeftTopSideConnector(b) || e.Connectors.isBottomRightSideConnector(b)) {
            a.x2 = Math.ceil(a.x2);
            a.y1 = Math.floor(a.y1);
        } else if (e.Connectors.isLeftBottomSideConnector(b) || e.Connectors.isTopRightSideConnector(b)) {
            a.x2 = Math.ceil(a.x2);
            a.y2 = Math.ceil(a.y2);
        } else if (e.Connectors.isTopLeftSideConnector(b) || e.Connectors.isRightBottomSideConnector(b)) {
            a.x1 = Math.floor(a.x1);
            a.y2 = Math.ceil(a.y2);
        }
    };
    e.ConnectorsNormalizer.prototype.unapplyConnectionRoundingPerConnector = function(a, b) {
        a.x1 = a.originalX1;
        a.y1 = a.originalY1;
        a.x2 = a.originalX2;
        a.y2 = a.originalY2;
    };
    e.ConnectorsShifter = function(a, b, c) {
        var d = this;
        this._gridifier = null;
        this._connections = null;
        this._settings = null;
        this._connectorsIntersector = null;
        this._ci = null;
        this._connectors = null;
        this._shiftedConnectors = [];
        this._allConnectors = [];
        this._css = {};
        this._construct = function() {
            d._gridifier = a;
            d._connections = b;
            d._settings = c;
            d._connectorsIntersector = new e.ConnectorsIntersector(d._connections, d._settings);
            d._ci = d._connectorsIntersector;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ConnectorsShifter.SIDE = "shifted";
    e.ConnectorsShifter.prototype.attachConnectors = function(a) {
        this._connectors = a;
        this._shifterConnectors = [];
        this._allConnectors = [];
    };
    e.ConnectorsShifter.prototype.getAllConnectors = function() {
        return this._allConnectors;
    };
    e.ConnectorsShifter.prototype._createShiftedConnector = function(a, b, c) {
        var f = {
            type: c.type,
            side: e.ConnectorsShifter.SIDE,
            x: parseFloat(a),
            y: parseFloat(b),
            itemGUID: d.toInt(c.itemGUID)
        };
        this._shiftedConnectors.push(f);
        this._allConnectors.push(f);
    };
    e.ConnectorsShifter.prototype.shiftAllConnectors = function() {
        for (var a = 0; a < this._connectors.length; a++) {
            this._allConnectors.push(this._connectors[a]);
            if (e.Connectors.isLeftTopSideConnector(this._connectors[a])) {
                this._shiftLeftTopConnector(this._connectors[a]);
            } else if (e.Connectors.isLeftBottomSideConnector(this._connectors[a])) {
                this._shiftLeftBottomConnector(this._connectors[a]);
            } else if (e.Connectors.isBottomRightSideConnector(this._connectors[a])) {
                this._shiftBottomRightConnector(this._connectors[a]);
            } else if (e.Connectors.isBottomLeftSideConnector(this._connectors[a])) {
                this._shiftTopLeftConnector(this._connectors[a]);
            } else if (e.Connectors.isTopLeftSideConnector(this._connectors[a])) {
                this._shiftTopLeftConnector(this._connectors[a]);
            } else if (e.Connectors.isTopRightSideConnector(this._connectors[a])) {
                this._shiftBottomRightConnector(this._connectors[a]);
            } else if (e.Connectors.isRightBottomSideConnector(this._connectors[a])) {
                this._shiftRightBottomConnector(this._connectors[a]);
            } else if (e.Connectors.isRightTopSideConnector(this._connectors[a])) {
                this._shiftRightTopConnector(this._connectors[a]);
            }
        }
    };
    e.ConnectorsShifter.prototype._shiftLeftTopConnector = function(a) {
        var b = this._ci.getMostBottomFromIntersectedTopOrTopLeftItems(a);
        if (b != null) {
            if (b.y2 + 1 != a.y) this._createShiftedConnector(a.x, b.y2 + 1, a);
        } else {
            if (a.y != 0) this._createShiftedConnector(a.x, 0, a);
        }
    };
    e.ConnectorsShifter.prototype._shiftLeftBottomConnector = function(a) {
        var b = this._ci.getMostTopFromIntersectedBottomOrBottomLeftItems(a);
        if (b != null) {
            if (b.y1 - 1 != a.y) this._createShiftedConnector(a.x, b.y1 - 1, a);
        } else {
            var c = this._connections.getMaxYFromAllConnections();
            if (c != 0) {
                if (c - 1 != a.y) this._createShiftedConnector(a.x, c - 1, a);
            }
        }
    };
    e.ConnectorsShifter.prototype._shiftBottomRightConnector = function(a) {
        var b = this._ci.getMostLeftFromIntersectedRightItems(a);
        if (b != null) {
            if (b.x1 - 1 != a.x) this._createShiftedConnector(b.x1 - 1, a.y, a);
        } else {
            if (this._settings.isHorizontalGrid() && a.type == e.Connectors.TYPES.PREPEND.DEFAULT) return;
            if (a.x != this._gridifier.getGridX2()) this._createShiftedConnector(this._gridifier.getGridX2(), a.y, a);
        }
    };
    e.ConnectorsShifter.prototype._shiftTopLeftConnector = function(a) {
        var b = this._ci.getMostRightFromIntersectedLeftItems(a);
        if (b != null) {
            if (b.x2 + 1 != a.x) this._createShiftedConnector(b.x2 + 1, a.y, a);
        } else {
            if (a.x != 0) this._createShiftedConnector(0, a.y, a);
        }
    };
    e.ConnectorsShifter.prototype._shiftRightBottomConnector = function(a) {
        var b = this._ci.getMostTopFromIntersectedBottomOrBottomRightItems(a);
        if (b != null) {
            if (b.y1 - 1 != a.y) this._createShiftedConnector(a.x, b.y1 - 1, a);
        } else {
            var c = this._connections.getMaxYFromAllConnections();
            if (c != 0) {
                if (c - 1 != a.y) this._createShiftedConnector(a.x, c - 1, a);
            }
        }
    };
    e.ConnectorsShifter.prototype._shiftRightTopConnector = function(a) {
        var b = this._ci.getMostBottomFromIntersectedTopOrTopRightItems(a);
        if (b != null) {
            if (b.y2 + 1 != a.y) this._createShiftedConnector(a.x, b.y2 + 1, a);
        } else {
            if (a.y != 0) {
                this._createShiftedConnector(a.x, 0, a);
            }
        }
    };
    e.ConnectorsShifter.prototype.shiftAllWithSpecifiedSideToRightGridCorner = function(a) {
        this._allConnectors = this._connectors;
        for (var b = 0; b < this._allConnectors.length; b++) {
            if (this._allConnectors[b].side == a) this._allConnectors[b].x = this._gridifier.getGridX2();
        }
    };
    e.ConnectorsShifter.prototype.shiftAllWithSpecifiedSideToLeftGridCorner = function(a) {
        this._allConnectors = this._connectors;
        for (var b = 0; b < this._allConnectors.length; b++) {
            if (this._allConnectors[b].side == a) this._allConnectors[b].x = 0;
        }
    };
    e.ConnectorsShifter.prototype.shiftAllWithSpecifiedSideToTopGridCorner = function(a) {
        this._allConnectors = this._connectors;
        for (var b = 0; b < this._allConnectors.length; b++) {
            if (this._allConnectors[b].side == a) this._allConnectors[b].y = 0;
        }
    };
    e.ConnectorsShifter.prototype.shiftAllWithSpecifiedSideToBottomGridCorner = function(a) {
        this._allConnectors = this._connectors;
        for (var b = 0; b < this._allConnectors.length; b++) {
            if (this._allConnectors[b].side == a) this._allConnectors[b].y = this._gridifier.getGridY2();
        }
    };
    e.TransformerConnectors = function(a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = this;
        this._gridifier = null;
        this._settings = null;
        this._connectors = null;
        this._connections = null;
        this._guid = null;
        this._appender = null;
        this._reversedAppender = null;
        this._normalizer = null;
        this._sizesTransformer = null;
        this._connectorsCleaner = null;
        this._transformedItemMarker = null;
        this._itemsReappender = null;
        this._operation = null;
        this._css = {};
        this._construct = function() {
            m._gridifier = a;
            m._settings = b;
            m._connectors = c;
            m._connections = d;
            m._guid = e;
            m._appender = f;
            m._reversedAppender = g;
            m._normalizer = h;
            m._sizesTransformer = i;
            m._connectorsCleaner = j;
            m._transformedItemMarker = k;
            m._operation = l;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            m._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.TransformerConnectors.prototype.setItemsReappenderInstance = function(a) {
        this._itemsReappender = a;
    };
    e.TransformerConnectors.prototype.recreateConnectorsPerFirstItemReappendOnTransform = function(a, b) {
        if (this._itemsReappender.isReversedAppendShouldBeUsedPerItemInsert(a)) {
            this._operation.setLastOperation(e.OPERATIONS.REVERSED_APPEND);
            this._recreateConnectorsPerReversedItemReappend(a, b);
        } else {
            this._operation.setLastOperation(e.OPERATIONS.APPEND);
            this._recreateConnectorsPerDefaultItemReappend(a, b);
        }
    };
    e.TransformerConnectors.prototype._recreateConnectorsPerReversedItemReappend = function(a, b) {
        this._connections.reinitRanges();
        this._reversedAppender.recreateConnectorsPerAllConnectedItems();
        if (this._settings.isVerticalGrid()) {
            this._connectorsCleaner.deleteAllIntersectedFromBottomConnectors();
        } else if (this._settings.isHorizontalGrid()) {
            this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
        }
    };
    e.TransformerConnectors.prototype._recreateConnectorsPerDefaultItemReappend = function(a, b) {
        this._connections.reinitRanges();
        this._appender.recreateConnectorsPerAllConnectedItems();
        if (this._settings.isVerticalGrid()) {
            this._connectorsCleaner.deleteAllIntersectedFromBottomConnectors();
        } else if (this._settings.isHorizontalGrid()) {
            this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
        }
    };
    e.Collector = function(a, b, c) {
        var d = this;
        this._settings = null;
        this._grid = null;
        this._sizesResolverManager = null;
        this._collectorFunction = null;
        this._markingFunction = null;
        this._connectedItemMarker = null;
        this._css = {};
        this._construct = function() {
            d._settings = a;
            d._grid = b;
            d._sizesResolverManager = c;
            d._createCollectorFunction();
            d._createMarkingFunction();
            d._connectedItemMarker = new e.ConnectedItemMarker();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Collector.ITEM_SORTING_INDEX_DATA_ATTR = "data-gridifier-original-item-sorting-index";
    e.Collector.RESTRICT_ITEM_COLLECT_DATA_ATTR = "data-gridifier-item-restrict-collect";
    e.Collector.prototype._createCollectorFunction = function() {
        var a = this._settings.getGridItemMarkingType();
        var b = this;
        if (this._settings.isByClassGridItemMarkingStrategy()) {
            this._collectorFunction = function(c) {
                var e = d.get.byQuery(c, "." + a);
                return b.filterNotRestrictedToCollectItems(e);
            };
        } else if (this._settings.isByDataAttrGridItemMarkingStrategy()) {
            this._collectorFunction = function(c) {
                var e = d.get.byQuery(c, "[" + a + "]");
                return b.filterNotRestrictedToCollectItems(e);
            };
        } else if (this._settings.isByQueryGridItemMarkingStrategy()) {
            this._collectorFunction = function(c) {
                var e = d.get.byQuery(c, a);
                return b.filterNotRestrictedToCollectItems(e);
            };
        }
    };
    e.Collector.prototype._createMarkingFunction = function() {
        var a = this._settings.getGridItemMarkingType();
        if (this._settings.isByClassGridItemMarkingStrategy()) {
            this._markingFunction = function(b) {
                if (!d.css.hasClass(b, a)) d.css.addClass(b, a);
            };
        } else if (this._settings.isByDataAttrGridItemMarkingStrategy()) {
            this._markingFunction = function(b) {
                b.setAttribute(e.GRID_ITEM_MARKING_DEFAULTS.DATA_ATTR, a);
            };
        } else if (this._settings.isByQueryGridItemMarkingStrategy()) {
            this._markingFunction = function(a) {
            };
        }
    };
    e.Collector.prototype.attachToGrid = function(a) {
        if (!d.isArray(a)) var a = [ a ];
        for (var b = 0; b < a.length; b++) {
            if (!this._settings.shouldDisableItemHideOnGridAttach()) d.css.set(a[b], {
                visibility: "hidden"
            });
        }
        for (var b = 0; b < a.length; b++) this._markingFunction(a[b]);
    };
    e.Collector.prototype.ensureAllItemsAreAttachedToGrid = function(a) {
        for (var b = 0; b < a.length; b++) {
            if (!d.isChildOf(a[b], this._grid)) {
                new e.Error(e.Error.ERROR_TYPES.COLLECTOR.ITEM_NOT_ATTACHED_TO_GRID, a[b]);
            }
        }
    };
    e.Collector.prototype.ensureAllItemsAreConnectedToGrid = function(a) {
        for (var b = 0; b < a.length; b++) {
            if (!this._connectedItemMarker.isItemConnected(a[b])) {
                new e.Error(e.Error.ERROR_TYPES.COLLECTOR.ITEM_NOT_CONNECTED_TO_GRID, a[b]);
            }
        }
    };
    e.Collector.prototype._isItemWiderThanGridWidth = function(a) {
        return Math.floor(this._sizesResolverManager.outerWidth(a, true)) > this._sizesResolverManager.outerWidth(this._grid, false, true);
    };
    e.Collector.prototype._isItemTallerThanGridHeight = function(a) {
        return Math.floor(this._sizesResolverManager.outerHeight(a, true)) > this._sizesResolverManager.outerHeight(this._grid, false, true);
    };
    e.Collector.prototype.canItemBeAttachedToGrid = function(a) {
        if (this._settings.isVerticalGrid()) return !this._isItemWiderThanGridWidth(a); else if (this._settings.isHorizontalGrid()) return !this._isItemTallerThanGridHeight(a);
    };
    e.Collector.prototype.throwWrongItemSizesError = function(a) {
        if (this._settings.isVerticalGrid()) {
            var b = {
                item: a,
                itemWidth: this._sizesResolverManager.outerWidth(a, true),
                gridWidth: this._sizesResolverManager.outerWidth(this._grid, false, true)
            };
            var c = e.Error.ERROR_TYPES.COLLECTOR.ITEM_WIDER_THAN_GRID_WIDTH;
        } else if (this._settings.isHorizontalGrid()) {
            var b = {
                item: a,
                itemHeight: this._sizesResolverManager.outerHeight(a, true),
                gridHeight: this._sizesResolverManager.outerHeight(this._grid, false, true)
            };
            var c = e.Error.ERROR_TYPES.COLLECTOR.ITEM_TALLER_THAN_GRID_HEIGHT;
        }
        new e.Error(c, b);
    };
    e.Collector.prototype.ensureAllItemsCanBeAttachedToGrid = function(a) {
        for (var b = 0; b < a.length; b++) {
            if (!this.canItemBeAttachedToGrid(a[b])) {
                this.throwWrongItemSizesError(a[b]);
            }
        }
    };
    e.Collector.prototype.collect = function() {
        var a = this._collectorFunction(this._grid);
        return a;
    };
    e.Collector.prototype.collectByQuery = function(a) {
        var b = d.get.byQuery(this._grid, a);
        return this.filterNotRestrictedToCollectItems(b);
    };
    e.Collector.prototype.collectAllConnectedItems = function() {
        var a = this._collectorFunction(this._grid);
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (this._connectedItemMarker.isItemConnected(a[c])) b.push(a[c]);
        }
        return b;
    };
    e.Collector.prototype.collectAllDisconnectedItems = function() {
        var a = this._collectorFunction(this._grid);
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (!this._connectedItemMarker.isItemConnected(a[c])) b.push(a[c]);
        }
        return b;
    };
    e.Collector.prototype.toDOMCollection = function(a) {
        var b = function(a) {
            new e.Error(e.Error.ERROR_TYPES.COLLECTOR.NOT_DOM_ELEMENT, a);
        };
        if (d.isJqueryObject(a)) {
            var c = [];
            for (var f = 0; f < a.length; f++) c.push(a.get(f));
            return c;
        }
        if (d.isNativeDOMObject(a)) {
            var c = [];
            c.push(a);
            return c;
        }
        if (d.isArray(a)) {
            for (var f = 0; f < a.length; f++) {
                if (d.isJqueryObject(a[f])) a[f] = a[f].get(0);
                if (!d.isNativeDOMObject(a[f])) {
                    b(a[f]);
                }
            }
            return a;
        } else {
            b(a);
        }
    };
    e.Collector.prototype.filterCollection = function(a) {
        var b = this._settings.getFilter();
        var c = a;
        for (var d = 0; d < b.length; d++) {
            var e = [];
            for (var f = 0; f < c.length; f++) {
                if (b[d](c[f])) {
                    e.push(c[f]);
                }
            }
            c = e;
        }
        return c;
    };
    e.Collector.prototype.sortCollection = function(a) {
        var b = this._settings.getSortApi().getSortComparatorTools();
        var c = this._settings.getSort();
        b.saveOriginalOrder(a);
        a.sort(function(a, d) {
            return c(a, d, b);
        });
        b.flushOriginalOrder(a);
        return a;
    };
    e.Collector.prototype.filterNotRestrictedToCollectItems = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (d.hasAttribute(a[c], e.Collector.RESTRICT_ITEM_COLLECT_DATA_ATTR)) continue;
            b.push(a[c]);
        }
        return b;
    };
    e.Collector.prototype.markItemAsRestrictedToCollect = function(a) {
        a.setAttribute(e.Collector.RESTRICT_ITEM_COLLECT_DATA_ATTR, "restricted");
    };
    e.Collector.prototype.unmarkItemAsRestrictedToCollect = function(a) {
        if (d.hasAttribute(a, e.Collector.RESTRICT_ITEM_COLLECT_DATA_ATTR)) a.removeAttribute(e.Collector.RESTRICT_ITEM_COLLECT_DATA_ATTR);
    };
    e.Collector.prototype.isItemRestrictedToCollect = function(a) {
        return d.hasAttribute(a, e.Collector.RESTRICT_ITEM_COLLECT_DATA_ATTR);
    };
    e.Collector.prototype.filterOnlyConnectedItems = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (this._connectedItemMarker.isItemConnected(a[c])) b.push(a[c]);
        }
        return b;
    };
    e.Collector.prototype.filterOnlyNotConnectedItems = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (!this._connectedItemMarker.isItemConnected(a[c])) b.push(a[c]);
        }
        return b;
    };
    e.Collector.prototype.isItemConnected = function(a) {
        return this._connectedItemMarker.isItemConnected(a);
    };
    e.ConnectedItemMarker = function() {
        var a = this;
        this._css = {};
        this._construct = function() {};
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ConnectedItemMarker.CONNECTED_ITEM_DATA_CLASS = "gridifier-connected-item";
    e.ConnectedItemMarker.prototype.markItemAsConnected = function(a) {
        d.css.addClass(a, e.ConnectedItemMarker.CONNECTED_ITEM_DATA_CLASS);
    };
    e.ConnectedItemMarker.prototype.isItemConnected = function(a) {
        return d.css.hasClass(a, e.ConnectedItemMarker.CONNECTED_ITEM_DATA_CLASS);
    };
    e.ConnectedItemMarker.prototype.unmarkItemAsConnected = function(a) {
        d.css.removeClass(a, e.ConnectedItemMarker.CONNECTED_ITEM_DATA_CLASS);
    };
    e.Disconnector = function(a, b, c, d, f, g, h, i, j) {
        var k = this;
        this._gridifier = null;
        this._collector = null;
        this._connections = null;
        this._connectionsSorter = null;
        this._connectors = null;
        this._settings = null;
        this._guid = null;
        this._connectedItemMarker = null;
        this._appender = null;
        this._reversedAppender = null;
        this._css = {};
        this._construct = function() {
            k._gridifier = a;
            k._collector = b;
            k._connections = c;
            k._connectionsSorter = d;
            k._connectors = f;
            k._settings = g;
            k._guid = h;
            k._connectedItemMarker = new e.ConnectedItemMarker();
            k._appender = i;
            k._reversedAppender = j;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            k._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Disconnector.DISCONNECT_TYPES = {
        SOFT: 0,
        HARD: 1
    };
    e.Disconnector.prototype.disconnect = function(a, b) {
        var a = this._collector.toDOMCollection(a);
        this._collector.ensureAllItemsAreConnectedToGrid(a);
        var b = b || e.Disconnector.DISCONNECT_TYPES.SOFT;
        if (b == e.Disconnector.DISCONNECT_TYPES.HARD) {
            for (var c = 0; c < a.length; c++) this._collector.markItemAsRestrictedToCollect(a[c]);
        }
        var d = this._findConnectionsToDisconnect(a);
        for (var c = 0; c < d.length; c++) {
            this._connections.removeConnection(d[c]);
            this._guid.removeItemGUID(d[c].item);
        }
        if (this._connections.get().length == 0) this._recreateConnectors();
        for (var c = 0; c < d.length; c++) this._connectedItemMarker.unmarkItemAsConnected(d[c].item);
        this._connections.reinitRanges();
        this._scheduleDisconnectedItemsRender(d);
    };
    e.Disconnector.prototype._findConnectionsToDisconnect = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            var d = this._connections.findConnectionByItem(a[c]);
            b.push(d);
        }
        return this._connectionsSorter.sortConnectionsPerReappend(b);
    };
    e.Disconnector.prototype._recreateConnectors = function() {
        this._connectors.flush();
        if (this._settings.isDefaultAppend()) {
            this._appender.createInitialConnector();
        } else if (this._settings.isReversedAppend()) {
            this._reversedAppender.createInitialConnector();
        }
    };
    e.Disconnector.prototype._scheduleDisconnectedItemsRender = function(a) {
        var b = this._gridifier.getRenderer();
        var c = this._gridifier.splitToBatches(a, 12);
        var d = [];
        for (var e = 0; e < c.length; e++) {
            for (var f = 0; f < c[e].length; f++) d.push(c[e][f].item);
        }
        b.markItemsAsScheduledToHide(d);
        for (var e = 0; e < c.length; e++) {
            (function(a, c) {
                setTimeout(function() {
                    b.hideConnections(a);
                }, 60 * c);
            })(c[e], e);
        }
    };
    e.EventEmitter = function(a) {
        var b = this;
        b._gridifier = null;
        b._showCallbacks = [];
        b._hideCallbacks = [];
        b._gridSizesChangeCallbacks = [];
        b._transformCallbacks = [];
        b._responsiveTransformCallbacks = [];
        b._gridRetransformCallbacks = [];
        b._connectionCreateCallbacks = [];
        b._disconnectCallbacks = [];
        b._insertCallbacks = [];
        b._insertEventTimeout = null;
        b._dragEndCallbacks = [];
        b._kernelCallbacks = {
            itemsReappendExecutionEndPerDragifier: null,
            beforeItemShowPerRetransformSorter: null
        };
        this._css = {};
        this._construct = function() {
            b._gridifier = a;
            b._bindEmitterToGridifier();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.EventEmitter.prototype._bindEmitterToGridifier = function() {
        var a = this;
        this._gridifier.onShow = function(b) {
            a.onShow.call(a, b);
        };
        this._gridifier.onHide = function(b) {
            a.onHide.call(a, b);
        };
        this._gridifier.onGridSizesChange = function(b) {
            a.onGridSizesChange.call(a, b);
        };
        this._gridifier.onTransform = function(b) {
            a.onTransform.call(a, b);
        };
        this._gridifier.onResponsiveTransform = function(b) {
            a.onResponsiveTransform.call(a, b);
        };
        this._gridifier.onGridRetransform = function(b) {
            a.onGridRetransform.call(a, b);
        };
        this._gridifier.onConnectionCreate = function(b) {
            a.onConnectionCreate.call(a, b);
        };
        this._gridifier.onDisconnect = function(b) {
            a.onDisconnect.call(a, b);
        };
        this._gridifier.onInsert = function(b) {
            a.onInsert.call(a, b);
        };
        this._gridifier.onDragEnd = function(b) {
            a.onDragEnd.call(a, b);
        };
    };
    e.EventEmitter.prototype.onShow = function(a) {
        this._showCallbacks.push(a);
    };
    e.EventEmitter.prototype.onHide = function(a) {
        this._hideCallbacks.push(a);
    };
    e.EventEmitter.prototype.onTransform = function(a) {
        this._transformCallbacks.push(a);
    };
    e.EventEmitter.prototype.onResponsiveTransform = function(a) {
        this._responsiveTransformCallbacks.push(a);
    };
    e.EventEmitter.prototype.onGridRetransform = function(a) {
        this._gridRetransformCallbacks.push(a);
    };
    e.EventEmitter.prototype.onGridSizesChange = function(a) {
        this._gridSizesChangeCallbacks.push(a);
    };
    e.EventEmitter.prototype.onConnectionCreate = function(a) {
        this._connectionCreateCallbacks.push(a);
    };
    e.EventEmitter.prototype.onDisconnect = function(a) {
        this._disconnectCallbacks.push(a);
    };
    e.EventEmitter.prototype.onInsert = function(a) {
        this._insertCallbacks.push(a);
    };
    e.EventEmitter.prototype.onDragEnd = function(a) {
        this._dragEndCallbacks.push(a);
    };
    e.EventEmitter.prototype.onItemsReappendExecutionEndPerDragifier = function(a) {
        this._kernelCallbacks.itemsReappendExecutionEndPerDragifier = a;
    };
    e.EventEmitter.prototype.onBeforeShowPerRetransformSorter = function(a) {
        this._kernelCallbacks.beforeItemShowPerRetransformSorter = a;
    };
    e.EventEmitter.prototype.emitShowEvent = function(a) {
        for (var b = 0; b < this._showCallbacks.length; b++) {
            this._showCallbacks[b](a);
            if (this._gridifier.hasItemBindedClone(a)) {
                var c = this._gridifier.getItemClone(a);
                this._showCallbacks[b](a);
            }
        }
    };
    e.EventEmitter.prototype.emitHideEvent = function(a) {
        for (var b = 0; b < this._hideCallbacks.length; b++) {
            this._hideCallbacks[b](a);
            if (this._gridifier.hasItemBindedClone(a)) {
                var c = this._gridifier.getItemClone(a);
                this._hideCallbacks[b](a);
            }
        }
        var d = this._gridifier.getCollector();
        if (d.isItemRestrictedToCollect(a)) {
            for (var e = 0; e < this._disconnectCallbacks.length; e++) this._disconnectCallbacks[e](a);
        }
    };
    e.EventEmitter.prototype.emitGridSizesChangeEvent = function() {
        for (var a = 0; a < this._gridSizesChangeCallbacks.length; a++) {
            this._gridSizesChangeCallbacks[a]();
        }
    };
    e.EventEmitter.prototype.emitResponsiveTransformEvent = function(a, b, c) {
        for (var d = 0; d < this._responsiveTransformCallbacks.length; d++) {
            this._responsiveTransformCallbacks[d](a, b, c);
        }
    };
    e.EventEmitter.prototype.emitTransformEvent = function(a, b, c, d, e) {
        for (var f = 0; f < this._transformCallbacks.length; f++) {
            this._transformCallbacks[f](a, b, c, d, e);
        }
    };
    e.EventEmitter.prototype.emitGridRetransformEvent = function() {
        for (var a = 0; a < this._gridRetransformCallbacks.length; a++) {
            this._gridRetransformCallbacks[a]();
        }
    };
    e.EventEmitter.prototype.emitConnectionCreateEvent = function(a) {
        for (var b = 0; b < this._connectionCreateCallbacks.length; b++) {
            (function(a, b) {
                setTimeout(function() {
                    a(b);
                }, 0);
            })(this._connectionCreateCallbacks[b], a);
        }
    };
    e.EventEmitter.prototype.emitInsertEvent = function() {
        var a = function() {
            for (var a = 0; a < this._insertCallbacks.length; a++) {
                this._insertCallbacks[a]();
            }
        };
        if (this._insertEventTimeout != null) {
            clearTimeout(this._insertEventTimeout);
            this._insertEventTimeout = null;
        }
        var b = this;
        this._insertEventTimeout = setTimeout(function() {
            a.call(b);
        }, 20);
    };
    e.EventEmitter.prototype.emitDragEndEvent = function(a) {
        for (var b = 0; b < this._dragEndCallbacks.length; b++) {
            this._dragEndCallbacks[b](a);
        }
    };
    e.EventEmitter.prototype.emitItemsReappendExecutionEndPerDragifier = function() {
        if (this._kernelCallbacks.itemsReappendExecutionEndPerDragifier != null) {
            this._kernelCallbacks.itemsReappendExecutionEndPerDragifier();
            this._kernelCallbacks.itemsReappendExecutionEndPerDragifier = null;
        }
    };
    e.EventEmitter.prototype.emitBeforeShowPerRetransformSortEvent = function() {
        if (this._kernelCallbacks.beforeItemShowPerRetransformSorter != null) this._kernelCallbacks.beforeItemShowPerRetransformSorter();
    };
    e.Filtrator = function(a, b, c, d, f, g) {
        var h = this;
        this._gridifier = null;
        this._collector = null;
        this._connections = null;
        this._settings = null;
        this._guid = null;
        this._connectedItemMarker = null;
        this._disconnector = null;
        this._css = {};
        this._construct = function() {
            h._gridifier = a;
            h._collector = b;
            h._connections = c;
            h._settings = d;
            h._guid = f;
            h._connectedItemMarker = new e.ConnectedItemMarker();
            h._disconnector = g;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            h._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Filtrator.prototype.filter = function() {
        var a = this._collector.collect();
        var b = this._collector.collectAllConnectedItems();
        var c = this._collector.collectAllDisconnectedItems();
        var d = this._collector.sortCollection(this._collector.filterCollection(a));
        var e = this._collector.filterCollection(b);
        var f = this._collector.filterCollection(c);
        var g = this._findConnectedItemsToHide(b);
        this._disconnector.disconnect(g);
        this._recreateGUIDS(d);
        this._recreateConnections(d);
    };
    e.Filtrator.prototype._findConnectedItemsToHide = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            var d = this._collector.filterCollection([ a[c] ]);
            if (d.length == 0) b.push(a[c]);
        }
        return b;
    };
    e.Filtrator.prototype._recreateGUIDS = function(a) {
        this._guid.reinit();
        for (var b = 0; b < a.length; b++) {
            this._guid.markNextAppendedItem(a[b]);
        }
    };
    e.Filtrator.prototype._recreateConnections = function(a) {
        var b = this._connections.get();
        b.splice(0, b.length);
        if (this._settings.isHorizontalGrid()) {
            this._recreateAllHorizontalGridConnectionsPerReappend(a);
        } else if (this._settings.isVerticalGrid()) {
            this._recreateAllVerticalGridConnectionsPerReappend(a);
        }
    };
    e.Filtrator.prototype._recreateAllHorizontalGridConnectionsPerReappend = function(a) {
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            var d = {};
            d.x1 = b;
            d.x2 = b;
            d.y1 = 0;
            d.y2 = 0;
            this._connections.add(a[c], d);
            b++;
        }
    };
    e.Filtrator.prototype._recreateAllVerticalGridConnectionsPerReappend = function(a) {
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            var d = {};
            d.x1 = 0;
            d.x2 = 0;
            d.y1 = b;
            d.y2 = b;
            this._connections.add(a[c], d);
            b++;
        }
    };
    e.GUID = function() {
        var a = this;
        this._maxItemGUID = 9999;
        this._minItemGUID = 1e4;
        this._firstPrependedItemGUID = null;
        this._css = {};
        this._construct = function() {};
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.GUID.GUID_DATA_ATTR = "data-gridifier-item-id";
    e.GUID.prototype.reinit = function() {
        this._maxItemGUID = 9999;
        this._minItemGUID = 1e4;
    };
    e.GUID.prototype.reinitMaxGUID = function(a) {
        if (typeof a == "undefined" || a == null) this._maxItemGUID = 9999; else this._maxItemGUID = a;
    };
    e.GUID.prototype.getItemGUID = function(a) {
        return d.toInt(a.getAttribute(e.GUID.GUID_DATA_ATTR));
    };
    e.GUID.prototype.setItemGUID = function(a, b) {
        return a.setAttribute(e.GUID.GUID_DATA_ATTR, b);
    };
    e.GUID.prototype.removeItemGUID = function(a) {
        a.removeAttribute(e.GUID.GUID_DATA_ATTR);
    };
    e.GUID.prototype.markNextAppendedItem = function(a) {
        this._maxItemGUID++;
        a.setAttribute(e.GUID.GUID_DATA_ATTR, this._maxItemGUID);
        return this._maxItemGUID;
    };
    e.GUID.prototype.markNextPrependedItem = function(a) {
        this._minItemGUID--;
        a.setAttribute(e.GUID.GUID_DATA_ATTR, this._minItemGUID);
        return this._minItemGUID;
    };
    e.GUID.prototype.markAsPrependedItem = function(a) {
        if (this._firstPrependedItemGUID != null) return;
        this._firstPrependedItemGUID = a.getAttribute(e.GUID.GUID_DATA_ATTR);
    };
    e.GUID.prototype.unmarkAllPrependedItems = function() {
        this._firstPrependedItemGUID = null;
    };
    e.GUID.prototype.wasItemPrepended = function(a) {
        if (this._firstPrependedItemGUID == null) return false;
        return d.toInt(a) <= this._firstPrependedItemGUID;
    };
    e.ItemClonesManager = function(a, b, c, d) {
        var e = this;
        this._grid = null;
        this._collector = null;
        this._connections = null;
        this._sizesResolverManager = null;
        this._itemClones = [];
        this._nextBindingId = 0;
        this._css = {};
        this._construct = function() {
            e._grid = a;
            e._collector = b;
            e._connections = c;
            e._sizesResolverManager = d;
            e._itemClones = [];
            e._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            e._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ItemClonesManager.ITEM_CLONE_MARKING_DATA_ATTR = "data-gridifier-clones-manager-item-clone";
    e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR = "data-gridifier-clones-manager-binding";
    e.ItemClonesManager.prototype.createClone = function(a) {
        var b = a.cloneNode(true);
        b.setAttribute(e.ItemClonesManager.ITEM_CLONE_MARKING_DATA_ATTR, "item-clone");
        b.style.visibility = "hidden";
        this._collector.markItemAsRestrictedToCollect(b);
        this._grid.getGrid().appendChild(b);
        if (a.style.zIndex.length == 0) {
            b.style.zIndex = 0;
            a.style.zIndex = 1;
        } else {
            var c = a.style.zIndex;
            if (c == 0) {
                b.style.zIndex = 0;
                a.style.zIndex = 1;
            } else {
                b.style.zIndex = 0;
            }
        }
        this._nextBindingId++;
        a.setAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR, this._nextBindingId);
        b.setAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR, this._nextBindingId);
        this._itemClones.push(b);
    };
    e.ItemClonesManager.prototype.unfilterClones = function(a) {
        a = this._collector.toDOMCollection(a);
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (this.isItemClone(a[c])) continue;
            b.push(a[c]);
        }
        return b;
    };
    e.ItemClonesManager.prototype.isItemClone = function(a) {
        return d.hasAttribute(a, e.ItemClonesManager.ITEM_CLONE_MARKING_DATA_ATTR);
    };
    e.ItemClonesManager.prototype.hasBindedClone = function(a) {
        return d.hasAttribute(a, e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR);
    };
    e.ItemClonesManager.prototype.getBindedClone = function(a) {
        var b = null;
        for (var c = 0; c < this._itemClones.length; c++) {
            if (this._itemClones[c].getAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR) == a.getAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR)) {
                b = this._itemClones[c];
                break;
            }
        }
        if (b == null) throw new Error("Gridifier error: binded clone not found(on bind). (Did you forgot to call setItemClonesManagerLifecycleCallbacks()?", a);
        return b;
    };
    e.ItemClonesManager.prototype.getOriginalItemFromClone = function(a) {
        var b = this._connections.get();
        for (var c = 0; c < b.length; c++) {
            if (b[c].item.getAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR) == a.getAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR)) return b[c].item;
        }
        return null;
    };
    e.ItemClonesManager.prototype.destroyClone = function(a) {
        var b = null;
        for (var c = 0; c < this._itemClones.length; c++) {
            if (this._itemClones[c].getAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR) == a.getAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR)) {
                b = this._itemClones[c];
                this._itemClones.splice(c, 1);
                break;
            }
        }
        if (b == null) throw new Error("Gridifier error: binded clone not found(on destroy). ", a);
        this._grid.getGrid().removeChild(b);
        a.removeAttribute(e.ItemClonesManager.CLONES_MANAGER_BINDING_DATA_ATTR);
    };
    e.ItemClonesManager.prototype.lockCloneOnToggle = function(a) {
        if (!this.hasBindedClone(a)) return this;
        var b = this.getBindedClone(a);
        b.setAttribute(e.Api.CoordsChanger.CSS3_TRANSLATE_3D_CLONES_RESTRICT_CLONE_SHOW_DATA_ATTR, "yes");
        return this;
    };
    e.ItemClonesManager.prototype.unlockCloneOnToggle = function(a) {
        if (!this.hasBindedClone(a)) return this;
        var b = this.getBindedClone(a);
        b.removeAttribute(e.Api.CoordsChanger.CSS3_TRANSLATE_3D_CLONES_RESTRICT_CLONE_SHOW_DATA_ATTR);
        return this;
    };
    e.ItemClonesManager.prototype.hideCloneOnToggle = function(a) {
        if (!this.hasBindedClone(a)) return;
        var b = this.getBindedClone(a);
        if (b.style.visibility == "visible") b.style.visibility = "hidden";
        return this;
    };
    e.ItemClonesManager.prototype.getConnectionItemAtPoint = function(a, b) {
        a = parseFloat(a) - this._sizesResolverManager.offsetLeft(this._grid.getGrid());
        b = parseFloat(b) - this._sizesResolverManager.offsetTop(this._grid.getGrid());
        var c = this._connections.get();
        for (var d = 0; d < c.length; d++) {
            if (a >= c[d].x1 && a <= c[d].x2 && b >= c[d].y1 && b <= c[d].y2) return c[d].item;
        }
        return null;
    };
    e.Iterator = function(a, b, c, d, e) {
        var f = this;
        this._settings = null;
        this._collector = null;
        this._connections = null;
        this._connectionsSorter = null;
        this._guid = null;
        this._css = {};
        this._construct = function() {
            f._settings = a;
            f._collector = b;
            f._connections = c;
            f._connectionsSorter = d;
            f._guid = e;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            f._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Iterator.prototype.getFirst = function() {
        var a = this._connections.get();
        if (a.length == 0) return null;
        a = this._connectionsSorter.sortConnectionsPerReappend(a);
        return a[0].item;
    };
    e.Iterator.prototype.getLast = function() {
        var a = this._connections.get();
        if (a.length == 0) return null;
        a = this._connectionsSorter.sortConnectionsPerReappend(a);
        return a[a.length - 1].item;
    };
    e.Iterator.prototype.getNext = function(a) {
        var b = this._collector.toDOMCollection(a);
        a = b[0];
        var c = this._connections.get();
        if (c.length == 0) return null;
        c = this._connectionsSorter.sortConnectionsPerReappend(c);
        for (var d = 0; d < c.length; d++) {
            if (this._guid.getItemGUID(c[d].item) == this._guid.getItemGUID(a)) {
                if (d + 1 > c.length - 1) return null;
                return c[d + 1].item;
            }
        }
        return null;
    };
    e.Iterator.prototype.getPrev = function(a) {
        var b = this._collector.toDOMCollection(a);
        a = b[0];
        var c = this._connections.get();
        if (c.length == 0) return null;
        c = this._connectionsSorter.sortConnectionsPerReappend(c);
        for (var d = c.length - 1; d >= 0; d--) {
            if (this._guid.getItemGUID(c[d].item) == this._guid.getItemGUID(a)) {
                if (d - 1 < 0) return null;
                return c[d - 1].item;
            }
        }
        return null;
    };
    e.Iterator.prototype.getAll = function() {
        var a = this._connections.get();
        if (a.length == 0) return [];
        var b = this._connectionsSorter.sortConnectionsPerReappend(a);
        var c = [];
        for (var d = 0; d < b.length; d++) c.push(b[d].item);
        return c;
    };
    e.LifecycleCallbacks = function(a) {
        var b = this;
        this._collector = null;
        this._preInsertCallbacks = [];
        this._preDisconnectCallbacks = [];
        this._css = {};
        this._construct = function() {
            b._collector = a;
            b._insertCallbacks = [];
            b._disconnectCallbacks = [];
            this._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.LifecycleCallbacks.prototype.addPreInsertCallback = function(a) {
        this._preInsertCallbacks.push(a);
    };
    e.LifecycleCallbacks.prototype.addPreDisconnectCallback = function(a) {
        this._preDisconnectCallbacks.push(a);
    };
    e.LifecycleCallbacks.prototype.executePreInsertCallbacks = function(a) {
        var a = this._collector.toDOMCollection(a);
        for (var b = 0; b < this._preInsertCallbacks.length; b++) {
            this._preInsertCallbacks[b](a);
        }
    };
    e.LifecycleCallbacks.prototype.executePreDisconnectCallbacks = function(a) {
        var a = this._collector.toDOMCollection(a);
        for (var b = 0; b < this._preDisconnectCallbacks.length; b++) {
            this._preDisconnectCallbacks[b](a);
        }
    };
    e.Normalizer = function(a, b) {
        var c = this;
        this._gridifier = null;
        this._sizesResolverManager = null;
        this._roundingNormalizationValue = 1;
        this._itemWidthAntialiasPercentageValue = 0;
        this._itemWidthAntialiasPxValue = 0;
        this._itemHeightAntialiasPercentageValue = 0;
        this._itemHeightAntialiasPxValue = 0;
        this._areZIndexesUpdatesEnabled = true;
        this._areZIndexesUpdatesBinded = false;
        this._css = {};
        this._construct = function() {
            c._gridifier = a;
            c._sizesResolverManager = b;
            c.setItemWidthAntialiasPercentageValue(c._itemWidthAntialiasPercentageValue);
            c.setItemHeightAntialiasPercentageValue(c._itemHeightAntialiasPercentageValue);
            c.setItemWidthAntialiasPxValue(c._itemWidthAntialiasPxValue);
            c.setItemHeightAntialiasPxValue(c._itemHeightAntialiasPxValue);
            c._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Normalizer.prototype.normalizeLowRounding = function(a) {
        return a - this._roundingNormalizationValue;
    };
    e.Normalizer.prototype.normalizeHighRounding = function(a) {
        return a + this._roundingNormalizationValue;
    };
    e.Normalizer.prototype.setItemWidthAntialiasPercentageValue = function(a) {
        this._itemWidthAntialiasPercentageValue = a;
        this.updateItemWidthAntialiasPxValue();
    };
    e.Normalizer.prototype.setItemWidthAntialiasPxValue = function(a) {
        this._itemWidthAntialiasPxValue = a;
        this.updateItemWidthAntialiasPxValue();
    };
    e.Normalizer.prototype.setItemHeightAntialiasPercentageValue = function(a) {
        this._itemHeightAntialiasPercentageValue = a;
        this.updateItemHeightAntialiasPxValue();
    };
    e.Normalizer.prototype.setItemHeightAntialiasPxValue = function(a) {
        this._itemHeightAntialiasPxValue = a;
        this.updateItemHeightAntialiasPxValue();
    };
    e.Normalizer.prototype.updateItemWidthAntialiasPxValue = function() {
        if (this._itemWidthAntialiasPercentageValue == 0 && this._itemWidthAntialiasPxValue == 0) {
            this._sizesResolverManager.setOuterWidthAntialiasValue(0);
            return;
        }
        if (this._itemWidthAntialiasPercentageValue != 0) var a = (this._gridifier.getGridX2() + 1) * (this._itemWidthAntialiasPercentageValue / 100); else var a = this._itemWidthAntialiasPxValue;
        this._sizesResolverManager.setOuterWidthAntialiasValue(a);
    };
    e.Normalizer.prototype.updateItemHeightAntialiasPxValue = function() {
        if (this._itemHeightAntialiasPercentageValue == 0 && this._itemHeightAntialiasPxValue == 0) {
            this._sizesResolverManager.setOuterHeightAntialiasValue(0);
            return;
        }
        if (this._itemHeightAntialiasPercentageValue != 0) var a = (this._gridifier.getGridY2() + 1) * (this._itemHeightAntialiasPercentageValue / 100); else var a = this._itemHeightAntialiasPxValue;
        this._sizesResolverManager.setOuterHeightAntialiasValue(a);
    };
    e.Normalizer.prototype.updateItemAntialiasValues = function() {
        this.updateItemWidthAntialiasPxValue();
        this.updateItemHeightAntialiasPxValue();
    };
    e.Normalizer.prototype.disableZIndexesUpdates = function() {
        this._areZIndexesUpdatesEnabled = false;
    };
    e.Normalizer.prototype.bindZIndexesUpdates = function() {
        if (!this._areZIndexesUpdatesEnabled || this._areZIndexesUpdatesBinded) return;
        var a = this;
        var b = null;
        this._gridifier.onConnectionCreate(function(c) {
            var e = function() {
                var b = function(a) {
                    for (var b = 0; b < a.length; b++) {
                        a[b].tmpWidth = Math.abs(a[b].x2 - a[b].x1) + 1;
                        a[b].tmpHeight = Math.abs(a[b].y2 - a[b].y1) + 1;
                        a[b].tmpWidth += parseFloat(a[b].horizontalOffset);
                        a[b].tmpHeight += parseFloat(a[b].verticalOffset);
                        a[b].tmpArea = Math.round(a[b].tmpWidth * a[b].tmpHeight);
                    }
                };
                var e = -1;
                var f = function(a, b) {
                    if (a.tmpArea > b.tmpArea) return -1 * e; else if (a.tmpArea < b.tmpArea) return 1 * e; else if (a.tmpArea == b.tmpArea) return 0;
                };
                var g = function(a) {
                    var b = {};
                    for (var c = 0; c < a.length; c++) {
                        if (typeof b[a[c].tmpArea] == "undefined") {
                            b[a[c].tmpArea] = [];
                        }
                        b[a[c].tmpArea].push(a[c]);
                    }
                    return b;
                };
                var h = c.get();
                b(h);
                h.sort(f);
                var i = g(h);
                var j = c.getConnectionsSorter();
                var k = [];
                for (var l in i) {
                    i[l] = j.sortConnectionsPerReappend(i[l]);
                    k.push(l);
                }
                k.sort(function(a, b) {
                    if (d.toInt(a) > d.toInt(b)) return -1 * e; else if (d.toInt(a) < d.toInt(b)) return 1 * e; else if (d.toInt(a) == d.toInt(b)) return 0;
                });
                var m = 1;
                for (var n = 0; n < k.length; n++) {
                    for (var o = 0; o < i[k[n]].length; o++) {
                        var p = i[k[n]][o];
                        p.item.style.zIndex = m;
                        if (a._gridifier.hasItemBindedClone(p.item)) {
                            var q = a._gridifier.getItemClone(p.item);
                            q.style.zIndex = m - 1;
                        }
                        m++;
                    }
                }
            };
            if (b != null) {
                clearTimeout(b);
                b = null;
            }
            b = setTimeout(function() {
                e();
            }, 100);
        });
        this._areZIndexesUpdatesBinded = true;
    };
    e.Operation = function() {
        var a = this;
        this._lastOperation = null;
        this._css = {};
        this._construct = function() {};
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Operation.prototype.isInitialOperation = function(a) {
        if (this._lastOperation == null) {
            this._lastOperation = a;
            return true;
        }
        return false;
    };
    e.Operation.prototype.isCurrentOperationSameAsPrevious = function(a) {
        if (this._lastOperation != a) {
            this._lastOperation = a;
            return false;
        }
        return true;
    };
    e.Operation.prototype.setLastOperation = function(a) {
        this._lastOperation = a;
    };
    e.Resorter = function(a, b, c, d, e) {
        var f = this;
        this._gridifier = null;
        this._collector = null;
        this._connections = null;
        this._settings = null;
        this._guid = null;
        this._css = {};
        this._construct = function() {
            f._gridifier = a;
            f._collector = b;
            f._connections = c;
            f._settings = d;
            f._guid = e;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            f._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Resorter.prototype.resort = function() {
        var a = this._collector.sortCollection(this._collector.collectAllConnectedItems());
        if (this._settings.isCustomAllEmptySpaceSortDispersion()) {
            if (this._settings.isHorizontalGrid()) {
                this._resortAllHorizontalGridConnectionsPerReappend(a);
            } else if (this._settings.isVerticalGrid()) {
                this._resortAllVerticalGridConnectionsPerReappend(a);
            }
        }
        this._guid.reinit();
        for (var b = 0; b < a.length; b++) {
            this._guid.markNextAppendedItem(a[b]);
        }
    };
    e.Resorter.prototype._resortAllHorizontalGridConnectionsPerReappend = function(a) {
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            var d = this._connections.findConnectionByItem(a[c]);
            d.x1 = b;
            d.x2 = b;
            d.y1 = 0;
            d.y2 = 0;
            b++;
        }
    };
    e.Resorter.prototype._resortAllVerticalGridConnectionsPerReappend = function(a) {
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            var d = this._connections.findConnectionByItem(a[c]);
            d.x1 = 0;
            d.x2 = 0;
            d.y1 = b;
            d.y2 = b;
            b++;
        }
    };
    e.ResponsiveClassesManager = function(a, b, c, d, e, f) {
        var g = this;
        this._gridifier = null;
        this._settings = null;
        this._collector = null;
        this._guid = null;
        this._eventEmitter = null;
        this._itemClonesManager = null;
        this._eventsData = [];
        this._css = {};
        this._construct = function() {
            g._gridifier = a;
            g._settings = b;
            g._collector = c;
            g._guid = d;
            g._eventEmitter = e;
            g._itemClonesManager = f;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            g._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ResponsiveClassesManager.prototype._saveTransformDataPerEvent = function(a, b, c) {
        var d = this._guid.getItemGUID(a);
        var e = null;
        for (var f = 0; f < this._eventsData.length; f++) {
            if (this._eventsData[f].itemGUID == d) {
                e = this._eventsData[f];
                break;
            }
        }
        if (e == null) {
            e = {};
            this._eventsData.push(e);
        }
        e.itemGUID = d;
        e.addedClasses = b;
        e.removedClasses = c;
    };
    e.ResponsiveClassesManager.prototype.emitTransformEvents = function(a) {
        if (this._eventsData.length == 0) return;
        var b = this;
        for (var c = 0; c < a.length; c++) {
            for (var e = 0; e < this._eventsData.length; e++) {
                if (d.toInt(a[c].itemGUID) == this._eventsData[e].itemGUID) {
                    (function(a, c, d) {
                        setTimeout(function() {
                            b._eventEmitter.emitResponsiveTransformEvent(a, c, d);
                        }, b._settings.getCoordsChangeAnimationMsDuration());
                    })(a[c].item, this._eventsData[e].addedClasses, this._eventsData[e].removedClasses);
                    this._eventsData.splice(e, 1);
                    break;
                }
            }
        }
    };
    e.ResponsiveClassesManager.prototype.toggleResponsiveClasses = function(a, b) {
        var c = this._itemClonesManager.unfilterClones(a);
        this._collector.ensureAllItemsAreConnectedToGrid(c);
        if (!d.isArray(b)) var e = [ b ]; else var e = b;
        for (var f = 0; f < c.length; f++) {
            if (this._gridifier.hasItemBindedClone(c[f])) var g = this._gridifier.getItemClone(c[f]); else var g = null;
            var h = [];
            var i = [];
            for (var j = 0; j < e.length; j++) {
                if (d.css.hasClass(c[f], e[j])) {
                    i.push(e[j]);
                    d.css.removeClass(c[f], e[j]);
                    if (g != null) d.css.removeClass(g, e[j]);
                } else {
                    h.push(e[j]);
                    d.css.addClass(c[f], e[j]);
                    if (g != null) d.css.addClass(g, e[j]);
                }
            }
            this._saveTransformDataPerEvent(c[f], h, i);
        }
        return c;
    };
    e.ResponsiveClassesManager.prototype.addResponsiveClasses = function(a, b) {
        var c = this._itemClonesManager.unfilterClones(a);
        this._collector.ensureAllItemsAreConnectedToGrid(c);
        if (!d.isArray(b)) var e = [ b ]; else var e = b;
        for (var f = 0; f < c.length; f++) {
            if (this._gridifier.hasItemBindedClone(c[f])) var g = this._gridifier.getItemClone(c[f]); else var g = null;
            var h = [];
            for (var i = 0; i < e.length; i++) {
                if (!d.css.hasClass(c[f], e[i])) {
                    h.push(e[i]);
                    d.css.addClass(c[f], e[i]);
                    if (g != null) d.css.addClass(g, b[i]);
                }
            }
            this._saveTransformDataPerEvent(c[f], h, []);
        }
        return c;
    };
    e.ResponsiveClassesManager.prototype.removeResponsiveClasses = function(a, b) {
        var c = this._itemClonesManager.unfilterClones(a);
        this._collector.ensureAllItemsAreConnectedToGrid(c);
        if (!d.isArray(b)) var e = [ b ]; else var e = b;
        for (var f = 0; f < c.length; f++) {
            if (this._gridifier.hasItemBindedClone(c[f])) var g = this._gridifier.getItemClone(c[f]); else var g = null;
            var h = [];
            for (var i = 0; i < e.length; i++) {
                if (d.css.hasClass(c[f], e[i])) {
                    h.push(e[i]);
                    d.css.removeClass(c[f], e[i]);
                    if (g != null) d.css.removeClass(g, e[i]);
                }
            }
            this._saveTransformDataPerEvent(c[f], [], h);
        }
        return c;
    };
    e.SizesResolverManager = function() {
        var a = this;
        this._outerWidthCache = [];
        this._outerHeightCache = [];
        this._nextCachedItemGUIDPerOuterWidth = 0;
        this._nextCachedItemGUIDPerOuterHeight = 0;
        this._isCachingTransactionActive = false;
        this._outerWidthAntialiasValue = 0;
        this._outerHeightAntialiasValue = 0;
        this._css = {};
        this._construct = function() {};
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesResolverManager.CACHED_PER_OUTERWIDTH_ITEM_GUID_DATA_ATTR = "data-gridifier-cached-per-outerwidth-guid";
    e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_ITEM_GUID_DATA_ATTR = "data-gridifier-cached-per-outerheight-guid";
    e.SizesResolverManager.CACHED_PER_OUTERWIDTH_DATA_ATTR = "data-gridifier-cached-per-outerwidth";
    e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_DATA_ATTR = "data-gridifier-cached-per-outerheight";
    e.SizesResolverManager.EMPTY_DATA_ATTR_VALUE = "gridifier-empty-data";
    e.SizesResolverManager.prototype.setOuterWidthAntialiasValue = function(a) {
        this._outerWidthAntialiasValue = a;
    };
    e.SizesResolverManager.prototype.setOuterHeightAntialiasValue = function(a) {
        this._outerHeightAntialiasValue = a;
    };
    e.SizesResolverManager.prototype._markAsCachedPerOuterWidth = function(a, b) {
        a.setAttribute(e.SizesResolverManager.CACHED_PER_OUTERWIDTH_DATA_ATTR, e.SizesResolverManager.EMPTY_DATA_ATTR_VALUE);
        a.setAttribute(e.SizesResolverManager.CACHED_PER_OUTERWIDTH_ITEM_GUID_DATA_ATTR, b);
    };
    e.SizesResolverManager.prototype._markAsCachedPerOuterHeight = function(a, b) {
        a.setAttribute(e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_DATA_ATTR, e.SizesResolverManager.EMPTY_DATA_ATTR_VALUE);
        a.setAttribute(e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_ITEM_GUID_DATA_ATTR, b);
    };
    e.SizesResolverManager.prototype.unmarkAsCached = function(a) {
        if (d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERWIDTH_DATA_ATTR)) a.removeAttribute(e.SizesResolverManager.CACHED_PER_OUTERWIDTH_DATA_ATTR);
        if (d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERWIDTH_ITEM_GUID_DATA_ATTR)) a.removeAttribute(e.SizesResolverManager.CACHED_PER_OUTERWIDTH_ITEM_GUID_DATA_ATTR);
        if (d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_DATA_ATTR)) a.removeAttribute(e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_DATA_ATTR);
        if (d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_ITEM_GUID_DATA_ATTR)) a.removeAttribute(e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_ITEM_GUID_DATA_ATTR);
    };
    e.SizesResolverManager.prototype._getOuterWidthCachedItemEntry = function(a) {
        var b = e.SizesResolverManager.CACHED_PER_OUTERWIDTH_ITEM_GUID_DATA_ATTR;
        var c = a.getAttribute(b);
        for (var d = 0; d < this._outerWidthCache.length; d++) {
            if (parseInt(this._outerWidthCache[d].cachedItemGUID) == parseInt(c)) return this._outerWidthCache[d];
        }
    };
    e.SizesResolverManager.prototype._getOuterHeightCachedItemEntry = function(a) {
        var b = e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_ITEM_GUID_DATA_ATTR;
        var c = a.getAttribute(b);
        for (var d = 0; d < this._outerHeightCache.length; d++) {
            if (parseInt(this._outerHeightCache[d].cachedItemGUID) == parseInt(c)) return this._outerHeightCache[d];
        }
    };
    e.SizesResolverManager.prototype._isOuterWidthCallWithSuchParamsCached = function(a, b) {
        if (!d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERWIDTH_DATA_ATTR)) return false;
        var c = this._getOuterWidthCachedItemEntry(a);
        if (b) return c.cachedReturnedValues.withIncludeMarginsParam != null ? true : false; else return c.cachedReturnedValues.withoutIncludeMarginsParam != null ? true : false;
    };
    e.SizesResolverManager.prototype._isOuterHeightCallWithSuchParamsCached = function(a, b) {
        if (!d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_DATA_ATTR)) return false;
        var c = this._getOuterHeightCachedItemEntry(a);
        if (b) return c.cachedReturnedValues.withIncludeMarginsParam != null ? true : false; else return c.cachedReturnedValues.withoutIncludeMarginsParam ? true : false;
    };
    e.SizesResolverManager.prototype.startCachingTransaction = function() {
        this._isCachingTransactionActive = true;
    };
    e.SizesResolverManager.prototype.stopCachingTransaction = function() {
        this._isCachingTransactionActive = false;
        for (var a = 0; a < this._outerWidthCache.length; a++) this.unmarkAsCached(this._outerWidthCache[a].DOMElem);
        for (var a = 0; a < this._outerHeightCache.length; a++) this.unmarkAsCached(this._outerHeightCache[a].DOMElem);
        this._outerWidthCache = [];
        this._outerHeightCache = [];
        this._nextCachedItemGUIDPerOuterWidth = 0;
        this._nextCachedItemGUIDPerOuterHeight = 0;
    };
    e.SizesResolverManager.prototype.outerWidth = function(a, b, c, f, g, h) {
        var c = c || false;
        var h = h || false;
        if (!this._isCachingTransactionActive) {
            return this._callRealOuterWidth(a, b, c, f, g, h);
        }
        if (this._isOuterWidthCallWithSuchParamsCached(a, b)) {
            var i = this._getOuterWidthCachedItemEntry(a);
            if (b) return i.cachedReturnedValues.withIncludeMarginsParam; else return i.cachedReturnedValues.withoutIncludeMarginsParam;
        }
        var j = this._callRealOuterWidth(a, b, c, f, g, h);
        if (d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERWIDTH_DATA_ATTR)) {
            var i = this._getOuterWidthCachedItemEntry(a);
            if (b) i.cachedReturnedValues.withIncludeMarginsParam = j; else i.cachedReturnedValues.withoutIncludeMarginsParam = j;
        } else {
            this._nextCachedItemGUIDPerOuterWidth++;
            this._markAsCachedPerOuterWidth(a, this._nextCachedItemGUIDPerOuterWidth);
            var k = {};
            k.withIncludeMarginsParam = b ? j : null;
            k.withoutIncludeMarginsParam = !b ? j : null;
            this._outerWidthCache.push({
                cachedItemGUID: this._nextCachedItemGUIDPerOuterWidth,
                DOMElem: a,
                cachedReturnedValues: k
            });
        }
        return j;
    };
    e.SizesResolverManager.prototype._callRealOuterWidth = function(b, c, d, e, f, g) {
        var h = this;
        var i = a.recalculatePercentageWidthFunction;
        a.recalculatePercentageWidthFunction = function(a, b, c, d) {
            return h.outerWidth(a, b, true, c, d, true);
        };
        if (!g) a.clearRecursiveSubcallsData();
        var j = a.outerWidth(b, c, e, f);
        if (!d) j -= this._outerWidthAntialiasValue;
        a.recalculatePercentageWidthFunction = i;
        return j;
    };
    e.SizesResolverManager.prototype.outerHeight = function(a, b, c, f, g, h) {
        var c = c || false;
        var h = h || false;
        if (!this._isCachingTransactionActive) {
            return this._callRealOuterHeight(a, b, c, f, g, h);
        }
        if (this._isOuterHeightCallWithSuchParamsCached(a, b)) {
            var i = this._getOuterHeightCachedItemEntry(a);
            if (b) return i.cachedReturnedValues.withIncludeMarginsParam; else return i.cachedReturnedValues.withoutIncludeMarginsParam;
        }
        var j = this._callRealOuterHeight(a, b, c, f, g, h);
        if (d.hasAttribute(a, e.SizesResolverManager.CACHED_PER_OUTERHEIGHT_DATA_ATTR)) {
            var i = this._getOuterHeightCachedItemEntry(a);
            if (b) i.cachedReturnedValues.withIncludeMarginsParam = j; else i.cachedReturnedValues.withoutIncludeMarginsParam = j;
        } else {
            this._nextCachedItemGUIDPerOuterHeight++;
            this._markAsCachedPerOuterHeight(a, this._nextCachedItemGUIDPerOuterHeight);
            var k = {};
            k.withIncludeMarginsParam = b ? j : null;
            k.withoutIncludeMarginsParam = !b ? j : null;
            this._outerHeightCache.push({
                cachedItemGUID: this._nextCachedItemGUIDPerOuterHeight,
                DOMElem: a,
                cachedReturnedValues: k
            });
        }
        return j;
    };
    e.SizesResolverManager.prototype._callRealOuterHeight = function(b, c, d, e, f, g) {
        var h = this;
        var i = a.recalculatePercentageWidthFunction;
        var j = a.recalculatePercentageHeightFunction;
        a.recalculatePercentageWidthFunction = function(a, b, c, d) {
            return h.outerWidth(a, b, true, c, d, true);
        };
        a.recalculatePercentageHeightFunction = function(a, b, c, d) {
            return h.outerHeight(a, b, true, c, d, true);
        };
        if (!g) a.clearRecursiveSubcallsData();
        var k = a.outerHeight(b, c, e, f);
        if (!d) k -= this._outerHeightAntialiasValue;
        a.recalculatePercentageWidthFunction = i;
        a.recalculatePercentageHeightFunction = j;
        return k;
    };
    e.SizesResolverManager.prototype.positionTop = function(b) {
        return a.positionTop(b);
    };
    e.SizesResolverManager.prototype.positionLeft = function(b) {
        return a.positionLeft(b);
    };
    e.SizesResolverManager.prototype.offsetLeft = function(b, c) {
        var c = c || false;
        if (c) {
            var d = this.outerWidth(b);
            var e = this.outerWidth(b, true);
            var f = e - d;
            var g = f / 2;
            var h = a.offsetLeft(b) - g;
        } else {
            var h = a.offsetLeft(b);
        }
        return h;
    };
    e.SizesResolverManager.prototype.offsetTop = function(b, c) {
        var c = c || false;
        if (c) {
            var d = this.outerHeight(b);
            var e = this.outerHeight(b, true);
            var f = e - d;
            var g = f / 2;
            var h = a.offsetTop(b) - g;
        } else {
            var h = a.offsetTop(b);
        }
        return h;
    };
    e.SizesResolverManager.prototype.viewportWidth = function() {
        return document.documentElement.clientWidth;
    };
    e.SizesResolverManager.prototype.viewportHeight = function() {
        return document.documentElement.clientHeight;
    };
    e.SizesResolverManager.prototype.viewportScrollLeft = function() {
        return window.pageXOffset || document.documentElement.scrollLeft;
    };
    e.SizesResolverManager.prototype.viewportScrollTop = function() {
        return window.pageYOffset || document.documentElement.scrollTop;
    };
    e.SizesResolverManager.prototype.viewportDocumentCoords = function() {
        return {
            x1: this.viewportScrollLeft(),
            x2: this.viewportScrollLeft() + this.viewportWidth() - 1,
            y1: this.viewportScrollTop(),
            y2: this.viewportScrollTop() + this.viewportHeight() - 1
        };
    };
    e.SizesResolverManager.prototype.copyComputedStyle = function(b, c) {
        var e = this;
        var f = function(b, c) {
            a.cloneComputedStyle(b, c);
            for (var g = 0; g < b.childNodes.length; g++) {
                if (b.childNodes[g].nodeType == 1) {
                    f(b.childNodes[g], c.childNodes[g]);
                    var h = a.getComputedCSS(b.childNodes[g]);
                    if (/.*px.*/.test(h.left)) c.childNodes[g].style.left = e.positionLeft(b.childNodes[g]) + "px";
                    if (/.*px.*/.test(h.top)) c.childNodes[g].style.top = e.positionTop(b.childNodes[g]) + "px";
                    var i = a.getComputedCSSWithMaybePercentageSizes(b.childNodes[g]);
                    c.childNodes[g].style.width = e.outerWidth(b.childNodes[g]) + "px";
                    if (d.toInt(i.height) != 0) c.childNodes[g].style.height = e.outerHeight(b.childNodes[g]) + "px";
                }
            }
        };
        f(b, c);
    };
    e.Discretizer = function(a, b, c, d) {
        var f = this;
        this._gridifier = null;
        this._connections = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._discretizerCore = null;
        this._discretizationDemonstrator = null;
        this._showDemonstrator = false;
        this._cells = [];
        this._css = {};
        this._construct = function() {
            f._gridifier = a;
            f._connections = b;
            f._settings = c;
            f._sizesResolverManager = d;
            if (f._settings.isVerticalGrid()) {
                f._discretizerCore = new e.Discretizer.VerticalCore(f._gridifier, f._settings, f._sizesResolverManager);
            } else if (f._settings.isHorizontalGrid()) {
                f._discretizerCore = new e.Discretizer.HorizontalCore(f._gridifier, f._settings, f._sizesResolverManager);
            }
            if (f._showDemonstrator) {
                f._discretizationDemonstrator = new e.Discretizer.Demonstrator(f._gridifier, f._settings);
            } else {
                f._discretizationDemonstrator = {
                    create: function() {
                        return;
                    },
                    update: function() {
                        return;
                    },
                    "delete": function() {
                        return;
                    }
                };
            }
            f._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            f._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Discretizer.IS_INTERSECTED_BY_ITEM = "isIntersectedByItem";
    e.Discretizer.CELL_CENTER_X = "centerX";
    e.Discretizer.CELL_CENTER_Y = "centerY";
    e.Discretizer.prototype.discretizeGrid = function() {
        var a = this._connections.getMinConnectionWidth();
        var b = this._connections.getMinConnectionHeight();
        if (this._settings.isDefaultAppend()) {
            this._cells = this._discretizerCore.discretizeGridWithDefaultAppend(a, b);
        } else if (this._settings.isReversedAppend()) {
            this._cells = this._discretizerCore.discretizeGridWithReversedAppend(a, b);
        }
    };
    e.Discretizer.prototype.intersectedCellsToCoords = function(a) {
        var b = {
            x1: a[0].x1,
            x2: a[0].x2,
            y1: a[0].y1,
            y2: a[0].y2
        };
        for (var c = 1; c < a.length; c++) {
            if (a[c].x1 < b.x1) b.x1 = a[c].x1;
            if (a[c].x2 > b.x2) b.x2 = a[c].x2;
            if (a[c].y1 < b.y1) b.y1 = a[c].y1;
            if (a[c].y2 > b.y2) b.y2 = a[c].y2;
        }
        return b;
    };
    e.Discretizer.prototype.markCellsIntersectedByItem = function(a, b) {
        for (var c = 0; c < this._cells.length; c++) {
            for (var d = 0; d < this._cells[c].length; d++) {
                var f = {
                    x1: this._cells[c][d][e.Discretizer.CELL_CENTER_X],
                    x2: this._cells[c][d][e.Discretizer.CELL_CENTER_X],
                    y1: this._cells[c][d][e.Discretizer.CELL_CENTER_Y],
                    y2: this._cells[c][d][e.Discretizer.CELL_CENTER_Y]
                };
                if (this._isCellIntersectedBy(f, b)) this._cells[c][d][e.Discretizer.IS_INTERSECTED_BY_ITEM] = true; else this._cells[c][d][e.Discretizer.IS_INTERSECTED_BY_ITEM] = false;
            }
        }
    };
    e.Discretizer.prototype.getAllCellsWithIntersectedCenterData = function(a) {
        var b = [];
        var c = 0;
        var d = 0;
        var f = [];
        var g = function(a) {
            for (var b = 0; b < f.length; b++) {
                if (f[b] == a) return true;
            }
            return false;
        };
        for (var h = 0; h < this._cells.length; h++) {
            var i = false;
            var j = [];
            for (var k = 0; k < this._cells[h].length; k++) {
                var l = {
                    x1: this._cells[h][k][e.Discretizer.CELL_CENTER_X],
                    x2: this._cells[h][k][e.Discretizer.CELL_CENTER_X],
                    y1: this._cells[h][k][e.Discretizer.CELL_CENTER_Y],
                    y2: this._cells[h][k][e.Discretizer.CELL_CENTER_Y]
                };
                if (this._isCellIntersectedBy(l, a)) {
                    j.push(this._cells[h][k]);
                    if (!i) {
                        c++;
                        i = true;
                    }
                    if (!g(k)) {
                        d++;
                        f.push(k);
                    }
                }
            }
            if (j.length > 0) b.push(j);
        }
        return {
            cellsWithIntersectedCenter: b,
            intersectedRowsCount: c,
            intersectedColsCount: d
        };
    };
    e.Discretizer.prototype._isCellIntersectedBy = function(a, b) {
        var c = b.y1 < a.y1 && b.y2 < a.y1;
        var d = b.y1 > a.y2 && b.y2 > a.y2;
        var e = b.x1 < a.x1 && b.x2 < a.x1;
        var f = b.x1 > a.x2 && b.x2 > a.x2;
        if (!c && !d && !e && !f) return true; else return false;
    };
    e.Discretizer.prototype.normalizeItemNewConnectionHorizontalCoords = function(a, b) {
        return this._discretizerCore.normalizeItemNewConnectionHorizontalCoords(a, b);
    };
    e.Discretizer.prototype.normalizeItemNewConnectionVerticalCoords = function(a, b) {
        return this._discretizerCore.normalizeItemNewConnectionVerticalCoords(a, b);
    };
    e.Discretizer.prototype.createDemonstrator = function() {
        this._discretizationDemonstrator.create(this._cells);
    };
    e.Discretizer.prototype.updateDemonstrator = function() {
        this._discretizationDemonstrator.update(this._cells);
    };
    e.Discretizer.prototype.deleteDemonstrator = function() {
        this._discretizationDemonstrator["delete"].call(this);
    };
    e.Discretizer.HorizontalCore = function(a, b, c) {
        var d = this;
        this._gridifier = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            d._gridifier = a;
            d._settings = b;
            d._sizesResolverManager = c;
            d._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Discretizer.HorizontalCore.prototype._transposeCells = function(a) {
        var b = [];
        var c = 0;
        for (var d = 0; d < a.length; d++) {
            if (a[d].length > c) c = a[d].length;
        }
        var e = 0;
        for (var f = 0; f < c; f++) {
            var g = [];
            for (var h = 0; h < a.length; h++) {
                if (typeof a[h][e] != "undefined") g.push(a[h][e]);
            }
            b.push(g);
            e++;
        }
        return b;
    };
    e.Discretizer.HorizontalCore.prototype.discretizeGridWithDefaultAppend = function(a, b) {
        var c = [];
        var d = this._gridifier.getGridX2();
        var f = this._gridifier.getGridY2();
        var g = -1;
        var h = true;
        while (h) {
            var i = [];
            var j = -1;
            var k = true;
            while (k) {
                j += b;
                var l = j - b + 1;
                if (j > f) {
                    k = false;
                } else {
                    var m = {
                        x1: g + 1,
                        x2: g + a,
                        y1: l,
                        y2: j
                    };
                    m[e.Discretizer.IS_INTERSECTED_BY_ITEM] = false;
                    var n = m.x2 - m.x1 + 1;
                    var o = m.y2 - m.y1 + 1;
                    m[e.Discretizer.CELL_CENTER_X] = m.x1 + n / 2;
                    m[e.Discretizer.CELL_CENTER_Y] = m.y1 + o / 2;
                    i.push(m);
                }
            }
            c.push(i);
            g += a;
            if (g + a > d) h = false;
        }
        return this._transposeCells(c);
    };
    e.Discretizer.HorizontalCore.prototype.discretizeGridWithReversedAppend = function(a, b) {
        var c = [];
        var d = this._gridifier.getGridX2();
        var f = this._gridifier.getGridY2();
        var g = -1;
        var h = true;
        while (h) {
            var i = [];
            var j = f + 1;
            var k = true;
            while (k) {
                j -= b;
                if (j < 0) {
                    k = false;
                } else {
                    var l = {
                        x1: g + 1,
                        x2: g + a,
                        y1: j,
                        y2: j + b - 1
                    };
                    l[e.Discretizer.IS_INTERSECTED_BY_ITEM] = false;
                    var m = l.x2 - l.x1 + 1;
                    var n = l.y2 - l.y1 + 1;
                    l[e.Discretizer.CELL_CENTER_X] = l.x1 + m / 2;
                    l[e.Discretizer.CELL_CENTER_Y] = l.y1 + n / 2;
                    i.unshift(l);
                }
            }
            c.push(i);
            g += a;
            if (g + a > d) h = false;
        }
        return this._transposeCells(c);
    };
    e.Discretizer.HorizontalCore.prototype.normalizeItemNewConnectionHorizontalCoords = function(a, b) {
        var c = b.x2 - b.x1 + 1;
        var d = this._sizesResolverManager.outerWidth(a, true);
        if (c < d) {
            b.x2 = b.x1 + d - 1;
        }
        if (d < c) {
            b.x2 = b.x1 + d - 1;
        }
        if (b.x1 < 0) {
            b.x1 = 0;
            b.x2 = d - 1;
        }
        if (b.x2 > this._gridifier.getGridX2()) {
            b.x2 = this._gridifier.getGridX2();
            b.x1 = b.x2 - d + 1;
        }
        return b;
    };
    e.Discretizer.HorizontalCore.prototype.normalizeItemNewConnectionVerticalCoords = function(a, b) {
        var c = b.y2 - b.y1 + 1;
        var d = this._sizesResolverManager.outerHeight(a, true);
        if (c < d) {
            if (this._settings.isDefaultAppend()) {
                b.y1 = b.y2 - d + 1;
            } else if (this._settings.isReversedAppend()) {
                b.y2 = b.y1 + d - 1;
            }
        }
        if (d < c) {
            if (this._settings.isDefaultAppend()) {
                b.y1 = b.y2 - d + 1;
            } else if (this._settings.isReversedAppend()) {
                b.y2 = b.y1 + d - 1;
            }
        }
        if (b.y1 < 0) {
            b.y1 = 0;
            b.y2 = d - 1;
        }
        if (b.y2 > this._gridifier.getGridY2()) {
            b.y2 = this._gridifier.getGridY2();
            b.y1 = b.y2 - d + 1;
        }
        return b;
    };
    e.Discretizer.VerticalCore = function(a, b, c) {
        var d = this;
        this._gridifier = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            d._gridifier = a;
            d._settings = b;
            d._sizesResolverManager = c;
            d._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Discretizer.VerticalCore.prototype.discretizeGridWithDefaultAppend = function(a, b) {
        var c = [];
        var d = this._gridifier.getGridX2();
        var f = this._gridifier.getGridY2();
        var g = -1;
        var h = true;
        while (h) {
            var i = [];
            var j = d + 1;
            var k = true;
            while (k) {
                j -= a;
                if (j < 0) {
                    k = false;
                } else {
                    var l = {
                        x1: j,
                        x2: j + a - 1,
                        y1: g + 1,
                        y2: g + b
                    };
                    l[e.Discretizer.IS_INTERSECTED_BY_ITEM] = false;
                    var m = l.x2 - l.x1 + 1;
                    var n = l.y2 - l.y1 + 1;
                    l[e.Discretizer.CELL_CENTER_X] = l.x1 + m / 2;
                    l[e.Discretizer.CELL_CENTER_Y] = l.y1 + n / 2;
                    i.unshift(l);
                }
            }
            c.push(i);
            g += b;
            if (g + b > f) h = false;
        }
        return c;
    };
    e.Discretizer.VerticalCore.prototype.discretizeGridWithReversedAppend = function(a, b) {
        var c = [];
        var d = this._gridifier.getGridX2();
        var f = this._gridifier.getGridY2();
        var g = -1;
        var h = true;
        while (h) {
            var i = [];
            var j = -1;
            var k = true;
            while (k) {
                j += a;
                if (j > d) {
                    k = false;
                } else {
                    var l = {
                        x1: j - a + 1,
                        x2: j,
                        y1: g + 1,
                        y2: g + b
                    };
                    l[e.Discretizer.IS_INTERSECTED_BY_ITEM] = false;
                    var m = l.x2 - l.x1 + 1;
                    var n = l.y2 - l.y1 + 1;
                    l[e.Discretizer.CELL_CENTER_X] = l.x1 + m / 2;
                    l[e.Discretizer.CELL_CENTER_Y] = l.y1 + n / 2;
                    i.push(l);
                }
            }
            c.push(i);
            g += b;
            if (g + b > f) h = false;
        }
        return c;
    };
    e.Discretizer.VerticalCore.prototype.normalizeItemNewConnectionHorizontalCoords = function(a, b) {
        var c = b.x2 - b.x1 + 1;
        var d = this._sizesResolverManager.outerWidth(a, true);
        if (c < d) {
            if (this._settings.isDefaultAppend()) {
                b.x1 = b.x2 - d + 1;
            } else if (this._settings.isReversedAppend()) {
                b.x2 = b.x1 + d - 1;
            }
        }
        if (d < c) {
            if (this._settings.isDefaultAppend()) {
                b.x1 = b.x2 - d + 1;
            } else if (this._settings.isReversedAppend()) {
                b.x2 = b.x1 + d - 1;
            }
        }
        if (b.x1 < 0) {
            b.x1 = 0;
            b.x2 = d - 1;
        }
        if (b.x2 > this._gridifier.getGridX2()) {
            b.x2 = this._gridifier.getGridX2();
            b.x1 = b.x2 - d + 1;
        }
        return b;
    };
    e.Discretizer.VerticalCore.prototype.normalizeItemNewConnectionVerticalCoords = function(a, b) {
        var c = b.y2 - b.y1 + 1;
        var d = this._sizesResolverManager.outerHeight(a, true);
        if (c < d) {
            b.y2 = b.y1 + d - 1;
        }
        if (d < c) {
            b.y2 = b.y1 + d - 1;
        }
        if (b.y1 < 0) {
            b.y1 = 0;
            b.y2 = d - 1;
        }
        if (b.y2 > this._gridifier.getGridY2()) {
            b.y2 = this._gridifier.getGridY2();
            b.y1 = b.y2 - d + 1;
        }
        return b;
    };
    e.Discretizer.Demonstrator = function(a, b) {
        var c = this;
        this._gridifier = null;
        this._settings = null;
        this._demonstrator = null;
        this._demonstratorClickHandler = null;
        this._css = {};
        this._construct = function() {
            c._gridifier = a;
            c._settings = b;
            c._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Discretizer.Demonstrator.prototype.create = function(a) {
        this._createDemonstrator();
        this._decorateDemonstrator();
        this._bindDemonstratorDeleteOnClick();
        this._createCells(a);
    };
    e.Discretizer.Demonstrator.prototype._createDemonstrator = function() {
        this._demonstrator = document.createElement("div");
        this._gridifier.getGrid().appendChild(this._demonstrator);
        d.css.set(this._demonstrator, {
            width: this._gridifier.getGridX2() + 1 + "px",
            height: this._gridifier.getGridY2() + 1 + "px",
            position: "absolute",
            left: "0px",
            top: "0px"
        });
    };
    e.Discretizer.Demonstrator.prototype._decorateDemonstrator = function() {
        d.css.set(this._demonstrator, {
            background: "rgb(235,235,235)",
            zIndex: "100",
            opacity: "0.8"
        });
    };
    e.Discretizer.Demonstrator.prototype._bindDemonstratorDeleteOnClick = function() {
        var a = this;
        this._demonstratorClickHandler = function() {
            b.remove(a._demonstrator, "click", a._demonstratorClickHandler);
            a["delete"].call(a);
        };
        b.add(this._demonstrator, "click", this._demonstratorClickHandler);
    };
    e.Discretizer.Demonstrator.prototype.update = function(a) {
        if (this._demonstrator != null) this["delete"].call(this);
        this.create(a);
    };
    e.Discretizer.Demonstrator.prototype["delete"] = function() {
        if (this._demonstrator == null) return;
        this._demonstrator.parentNode.removeChild(this._demonstrator);
        this._demonstrator = null;
    };
    e.Discretizer.Demonstrator.prototype._createCells = function(a) {
        var b = [ "gridFirstBorderColor", "gridSecondBorderColor", "gridThirdBorderColor", "gridFourthBorderColor", "gridFifthBorderColor" ];
        var c = -1;
        for (var f = 0; f < a.length; f++) {
            for (var g = 0; g < a[f].length; g++) {
                var h = document.createElement("div");
                var i = a[f][g].x2 - a[f][g].x1 + 1;
                var j = a[f][g].y2 - a[f][g].y1 + 1;
                c++;
                if (c == 5) {
                    b.reverse();
                    c = 0;
                }
                h.setAttribute("class", b[c]);
                d.css.set(h, {
                    position: "absolute",
                    boxSizing: "border-box",
                    left: a[f][g].x1 + "px",
                    top: a[f][g].y1 + "px",
                    width: i + "px",
                    height: j + "px",
                    border: "5px dashed"
                });
                if (a[f][g][e.Discretizer.IS_INTERSECTED_BY_ITEM]) {
                    h.style.background = "red";
                    h.style.opacity = "1";
                }
                this._demonstrator.appendChild(h);
                var k = document.createElement("div");
                d.css.set(k, {
                    position: "absolute",
                    left: a[f][g][e.Discretizer.CELL_CENTER_X] + "px",
                    top: a[f][g][e.Discretizer.CELL_CENTER_Y] + "px",
                    width: "5px",
                    height: "5px",
                    background: "black"
                });
                this._demonstrator.appendChild(k);
            }
        }
    };
    e.Dragifier = function(a, b, c, f, g, h, i, j, k, l) {
        var m = this;
        this._gridifier = null;
        this._appender = null;
        this._reversedAppender = null;
        this._collector = null;
        this._connections = null;
        this._connectors = null;
        this._guid = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._connectedItemMarker = null;
        this._touchStartHandler = null;
        this._touchMoveHandler = null;
        this._touchEndHandler = null;
        this._mouseDownHandler = null;
        this._mouseMoveHandler = null;
        this._mouseUpHandler = null;
        this._draggableItems = [];
        this._isDragging = false;
        this._areDragifierEventsBinded = false;
        this._originalRetransformQueueBatchSize = null;
        this._css = {};
        this._construct = function() {
            m._gridifier = a;
            m._appender = b;
            m._reversedAppender = c;
            m._collector = f;
            m._connections = g;
            m._connectors = h;
            m._guid = i;
            m._settings = j;
            m._sizesResolverManager = k;
            m._eventEmitter = l;
            m._connectedItemMarker = new e.ConnectedItemMarker();
            m._dragifierApi = new e.Api.Dragifier();
            m._bindEvents();
            if (m._settings.shouldEnableDragifierOnInit()) {
                m.bindDragifierEvents();
            }
        };
        this._bindEvents = function() {
            m._touchStartHandler = function(a) {
                var b = m._findClosestConnectedItem(a.target);
                if (b == null) return;
                m._disableRetransformQueue();
                a.preventDefault();
                m._disableUserSelect();
                m._sizesResolverManager.startCachingTransaction();
                m._isDragging = true;
                if (m._isAlreadyDraggable(b)) {
                    var c = a.changedTouches[0];
                    var d = m._findAlreadyDraggableItem(b);
                    d.addDragIdentifier(c.identifier);
                    return;
                }
                var e = m._createDraggableItem();
                var f = a.changedTouches[0];
                e.bindDraggableItem(b, f.pageX, f.pageY);
                e.addDragIdentifier(f.identifier);
                m._draggableItems.push(e);
            };
            m._touchEndHandler = function(a) {
                if (!m._isDragging) return;
                a.preventDefault();
                setTimeout(function() {
                    if (!m._isDragging) return;
                    var b = a.changedTouches;
                    for (var c = 0; c < b.length; c++) {
                        var d = m._findDraggableItemByIdentifier(b[c].identifier, true);
                        if (d.item == null) continue;
                        d.item.removeDragIdentifier(b[c].identifier);
                        if (d.item.getDragIdentifiersCount() == 0) {
                            d.item.unbindDraggableItem();
                            m._draggableItems.splice(d.itemIndex, 1);
                        }
                    }
                    if (m._draggableItems.length == 0) {
                        m._enableUserSelect();
                        m._enableRetransformQueue();
                        m._isDragging = false;
                        m._sizesResolverManager.stopCachingTransaction();
                    }
                }, 0);
            };
            m._touchMoveHandler = function(a) {
                if (!m._isDragging) return;
                a.preventDefault();
                setTimeout(function() {
                    if (!m._isDragging) return;
                    m._syncRetransformQueueSizeIfDisabled();
                    var b = a.changedTouches;
                    for (var c = 0; c < b.length; c++) {
                        var d = m._findDraggableItemByIdentifier(b[c].identifier);
                        if (d == null) continue;
                        d.processDragMove(b[c].pageX, b[c].pageY);
                    }
                }, 0);
            };
            m._mouseDownHandler = function(a) {
                var b = m._findClosestConnectedItem(a.target);
                if (b == null || d.browsers.isAndroidUCBrowser()) return;
                m._disableRetransformQueue();
                a.preventDefault();
                m._disableUserSelect();
                m._sizesResolverManager.startCachingTransaction();
                m._isDragging = true;
                var c = m._createDraggableItem();
                c.bindDraggableItem(b, a.pageX, a.pageY);
                m._draggableItems.push(c);
            };
            m._mouseUpHandler = function() {
                setTimeout(function() {
                    if (!m._isDragging || d.browsers.isAndroidUCBrowser()) return;
                    m._enableRetransformQueue();
                    m._enableUserSelect();
                    m._draggableItems[0].unbindDraggableItem();
                    m._draggableItems.splice(0, 1);
                    m._isDragging = false;
                    m._sizesResolverManager.stopCachingTransaction();
                }, 0);
            };
            m._mouseMoveHandler = function(a) {
                setTimeout(function() {
                    if (!m._isDragging || d.browsers.isAndroidUCBrowser()) return;
                    m._syncRetransformQueueSizeIfDisabled();
                    m._draggableItems[0].processDragMove(a.pageX, a.pageY);
                }, 0);
            };
        };
        this._unbindEvents = function() {};
        this.destruct = function() {
            m._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Dragifier.IS_DRAGGABLE_ITEM_DATA_ATTR = "data-gridifier-is-draggable-item";
    e.Dragifier.prototype.bindDragifierEvents = function() {
        if (this._areDragifierEventsBinded) return;
        this._areDragifierEventsBinded = true;
        b.add(this._gridifier.getGrid(), "mousedown", this._mouseDownHandler);
        b.add(document.body, "mouseup", this._mouseUpHandler);
        b.add(document.body, "mousemove", this._mouseMoveHandler);
        b.add(this._gridifier.getGrid(), "touchstart", this._touchStartHandler);
        b.add(document.body, "touchend", this._touchEndHandler);
        b.add(document.body, "touchmove", this._touchMoveHandler);
    };
    e.Dragifier.prototype.unbindDragifierEvents = function() {
        if (!this._areDragifierEventsBinded) return;
        this._areDragifierEventsBinded = false;
        b.remove(this._gridifier.getGrid(), "mousedown", this._mouseDownHandler);
        b.remove(document.body, "mouseup", this._mouseUpHandler);
        b.remove(document.body, "mousemove", this._mouseMoveHandler);
        b.remove(this._gridifier.getGrid(), "touchstart", this._touchStartHandler);
        b.remove(document.body, "touchend", this._touchEndHandler);
        b.remove(document.body, "touchmove", this._touchMoveHandler);
    };
    e.Dragifier.prototype.isDragifierEnabled = function() {
        return this._areDragifierEventsBinded;
    };
    e.Dragifier.prototype._disableRetransformQueue = function() {
        if (!this._settings.shouldDisableRetransformQueueOnDrags()) return;
        this._originalRetransformQueueBatchSize = this._settings.getRetransformQueueBatchSize();
        this._syncRetransformQueueSizeIfDisabled();
    };
    e.Dragifier.prototype._syncRetransformQueueSizeIfDisabled = function() {
        if (!this._settings.shouldDisableRetransformQueueOnDrags()) return;
        this._settings.setRetransformQueueBatchSize(this._gridifier.getAll().length);
    };
    e.Dragifier.prototype._enableRetransformQueue = function() {
        if (!this._settings.shouldDisableRetransformQueueOnDrags()) return;
        this._settings.setRetransformQueueBatchSize(this._originalRetransformQueueBatchSize);
    };
    e.Dragifier.prototype._disableUserSelect = function() {
        var a = this._settings.getDragifierUserSelectToggler();
        a.disableSelect();
    };
    e.Dragifier.prototype._enableUserSelect = function() {
        var a = this._settings.getDragifierUserSelectToggler();
        a.enableSelect();
    };
    e.Dragifier.prototype._findClosestConnectedItem = function(a) {
        var b = this._gridifier.getGrid();
        var c = this._settings.getDragifierItemSelector();
        if (a == b) return null;
        if (typeof c == "boolean" && !c) var e = false; else var e = true;
        var f = null;
        var g = null;
        var h = false;
        while (f == null && g != b) {
            if (g == null) g = a; else g = g.parentNode;
            if (e) {
                if (d.css.hasClass(g, c)) h = true;
            }
            if (this._connectedItemMarker.isItemConnected(g)) f = g;
        }
        if (f == null || e && !h) {
            return null;
        }
        return f;
    };
    e.Dragifier.prototype._createDraggableItem = function() {
        if (this._settings.isIntersectionDragifierMode()) {
            var a = new e.Dragifier.ConnectionIntersectionDraggableItem(this._gridifier, this._appender, this._reversedAppender, this._collector, this._connections, this._connectors, this._guid, this._settings, this._sizesResolverManager, this._eventEmitter);
        } else if (this._settings.isDiscretizationDragifierMode()) {
            var a = new e.Dragifier.GridDiscretizationDraggableItem(this._gridifier, this._appender, this._reversedAppender, this._collector, this._connections, this._connectors, this._guid, this._settings, this._sizesResolverManager, this._eventEmitter);
        }
        return a;
    };
    e.Dragifier.prototype._isAlreadyDraggable = function(a) {
        for (var b = 0; b < this._draggableItems.length; b++) {
            var c = this._draggableItems[b].getDraggableItem();
            if (this._guid.getItemGUID(c) == this._guid.getItemGUID(a)) return true;
        }
        return false;
    };
    e.Dragifier.prototype._findAlreadyDraggableItem = function(a) {
        for (var b = 0; b < this._draggableItems.length; b++) {
            var c = this._draggableItems[b].getDraggableItem();
            if (this._guid.getItemGUID(c) == this._guid.getItemGUID(a)) return this._draggableItems[b];
        }
        throw new Error("Draggable item not found");
    };
    e.Dragifier.prototype._findDraggableItemByIdentifier = function(a, b) {
        var b = b || false;
        var c = null;
        var d = null;
        for (var e = 0; e < this._draggableItems.length; e++) {
            if (this._draggableItems[e].hasDragIdentifier(a)) {
                c = this._draggableItems[e];
                d = e;
                break;
            }
        }
        if (b) {
            return {
                item: c,
                itemIndex: d
            };
        } else {
            return c;
        }
    };
    e.Dragifier.Core = function(a, b, c, d, f, g, h, i, j, k, l) {
        var m = this;
        this._gridifier = null;
        this._appender = null;
        this._reversedAppender = null;
        this._collector = null;
        this._connectors = null;
        this._connections = null;
        this._settings = null;
        this._guid = null;
        this._dragifierRenderer = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._connectionsSorter = null;
        this._cursorOffsetXFromDraggableItemCenter = null;
        this._cursorOffsetYFromDraggableItemCenter = null;
        this._gridOffsetLeft = null;
        this._gridOffsetTop = null;
        this._executeGridRetransformTimeout = null;
        this._css = {};
        this._construct = function() {
            m._gridifier = a;
            m._appender = b;
            m._reversedAppender = c;
            m._collector = d;
            m._connectors = f;
            m._connections = g;
            m._settings = h;
            m._guid = i;
            m._dragifierRenderer = j;
            m._sizesResolverManager = k;
            m._eventEmitter = l;
            if (m._settings.isVerticalGrid()) {
                m._connectionsSorter = new e.VerticalGrid.ConnectionsSorter(m._connections, m._settings, m._guid);
            } else if (m._settings.isHorizontalGrid()) {
                m._connectionsSorter = new e.HorizontalGrid.ConnectionsSorter(m._connections, m._settings, m._guid);
            }
            m._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            m._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Dragifier.Core.prototype.determineGridOffsets = function() {
        this._gridOffsetLeft = this._sizesResolverManager.offsetLeft(this._gridifier.getGrid());
        this._gridOffsetTop = this._sizesResolverManager.offsetTop(this._gridifier.getGrid());
    };
    e.Dragifier.Core.prototype._getDraggableItemOffsetLeft = function(a, b) {
        var b = b || false;
        var c = this._connections.findConnectionByItem(a);
        if (this._settings.isNoIntersectionsStrategy() && this._settings.isHorizontalGrid()) var d = c.horizontalOffset; else var d = 0;
        if (b) {
            var e = this._sizesResolverManager.outerWidth(a);
            var f = this._sizesResolverManager.outerWidth(a, true);
            var g = f - e;
            var h = g / 2;
            return this._gridOffsetLeft + c.x1 - h + d;
        } else {
            return this._gridOffsetLeft + c.x1 + d;
        }
    };
    e.Dragifier.Core.prototype._getDraggableItemOffsetTop = function(a, b) {
        var b = b || false;
        var c = this._connections.findConnectionByItem(a);
        if (this._settings.isNoIntersectionsStrategy() && this._settings.isVerticalGrid()) var d = c.verticalOffset; else var d = 0;
        if (b) {
            var e = this._sizesResolverManager.outerHeight(a);
            var f = this._sizesResolverManager.outerHeight(a, true);
            var g = f - e;
            var h = g / 2;
            return this._gridOffsetTop + c.y1 - h + d;
        } else {
            return this._gridOffsetTop + c.y1 + d;
        }
    };
    e.Dragifier.Core.prototype.determineInitialCursorOffsetsFromDraggableItemCenter = function(a, b, c) {
        var d = this._getDraggableItemOffsetLeft(a);
        var e = this._getDraggableItemOffsetTop(a);
        var f = this._sizesResolverManager.outerWidth(a, true);
        var g = this._sizesResolverManager.outerHeight(a, true);
        var h = d + f / 2;
        var i = e + g / 2;
        this._cursorOffsetXFromDraggableItemCenter = h - b;
        this._cursorOffsetYFromDraggableItemCenter = i - c;
    };
    e.Dragifier.Core.prototype._getMaxConnectionItemZIndex = function() {
        var a = null;
        var b = this._connections.get();
        for (var c = 0; c < b.length; c++) {
            if (a == null) {
                a = d.toInt(b[c].item.style.zIndex);
            } else {
                if (d.toInt(b[c].item.style.zIndex) > a) a = d.toInt(b[c].item.style.zIndex);
            }
        }
        return d.toInt(a);
    };
    e.Dragifier.Core.prototype.createDraggableItemClone = function(b) {
        var c = b.cloneNode(true);
        this._collector.markItemAsRestrictedToCollect(c);
        var e = this._settings.getDraggableItemDecorator();
        e(c, b, this._sizesResolverManager);
        if (d.isBrowserSupportingTransitions()) {
            d.css3.transform(c, "");
            d.css3.transition(c, "none");
        }
        c.style.zIndex = this._getMaxConnectionItemZIndex() + 1;
        var f = this._sizesResolverManager.outerWidth(b);
        var g = this._sizesResolverManager.outerHeight(b);
        c.style.width = f + "px";
        c.style.height = g + "px";
        var h = a.getComputedCSS(b);
        c.style.marginLeft = h.marginLeft;
        c.style.marginTop = h.marginTop;
        c.style.marginRight = h.marginRight;
        c.style.marginBottom = h.marginBottom;
        document.body.appendChild(c);
        var i = this._getDraggableItemOffsetLeft(b);
        var j = this._getDraggableItemOffsetTop(b);
        c.style.left = i + "px";
        c.style.top = j + "px";
        this._dragifierRenderer.render(c, i, j);
        return c;
    };
    e.Dragifier.Core.prototype.createDraggableItemPointer = function(b) {
        var c = this._getDraggableItemOffsetLeft(b, true);
        var e = this._getDraggableItemOffsetTop(b, true);
        var f = document.createElement("div");
        d.css.set(f, {
            width: this._sizesResolverManager.outerWidth(b, true) + "px",
            height: this._sizesResolverManager.outerHeight(b, true) + "px",
            position: "absolute",
            left: c - this._gridOffsetLeft + "px",
            top: e - this._gridOffsetTop + "px"
        });
        var g = a.getComputedCSS(b);
        var h = g.marginLeft;
        var i = g.marginTop;
        this._gridifier.getGrid().appendChild(f);
        var j = this._settings.getDraggableItemPointerDecorator();
        j(f);
        this._dragifierRenderer.render(f, c - this._gridOffsetLeft + parseFloat(h), e - this._gridOffsetTop + parseFloat(i));
        return f;
    };
    e.Dragifier.Core.prototype.calculateDraggableItemCloneNewDocumentPosition = function(a, b, c) {
        var d = this._sizesResolverManager.outerWidth(a, true) / 2;
        var e = this._sizesResolverManager.outerHeight(a, true) / 2;
        return {
            x: b - d - this._cursorOffsetXFromDraggableItemCenter * -1,
            y: c - e - this._cursorOffsetYFromDraggableItemCenter * -1
        };
    };
    e.Dragifier.Core.prototype.calculateDraggableItemCloneNewGridPosition = function(a, b) {
        var c = {
            x1: b.x,
            x2: b.x + this._sizesResolverManager.outerWidth(a, true) - 1,
            y1: b.y,
            y2: b.y + this._sizesResolverManager.outerHeight(a, true) - 1
        };
        c.x1 -= this._gridOffsetLeft;
        c.x2 -= this._gridOffsetLeft;
        c.y1 -= this._gridOffsetTop;
        c.y2 -= this._gridOffsetTop;
        return c;
    };
    e.Dragifier.Core.prototype.reappendGridItems = function() {
        var a = this;
        if (this._settings.isDefaultAppend()) {
            this._connectors.setNextFlushCallback(function() {
                a._appender.createInitialConnector();
            });
        } else if (this._settings.isReversedAppend()) {
            this._connectors.setNextFlushCallback(function() {
                a._reversedAppender.createInitialConnector();
            });
        }
        this._eventEmitter.onItemsReappendExecutionEndPerDragifier(function() {
            var b = a._connectionsSorter.sortConnectionsPerReappend(a._connections.get());
            var c = [];
            for (var d = 0; d < b.length; d++) {
                c.push(b[d].item);
            }
            a._eventEmitter.emitDragEndEvent(c);
        });
        this._executeGridRetransform();
    };
    e.Dragifier.Core.EXECUTE_GRID_RETRANSFORM_MS_TIMEOUT = 20;
    e.Dragifier.Core.prototype._executeGridRetransform = function() {
        var a = this;
        if (!d.browsers.isAndroidFirefox() && !d.browsers.isAndroidUCBrowser()) {
            this._gridifier.retransformAllSizes();
            return;
        }
        if (typeof this._executeGridRetransformTimeout != null) {
            clearTimeout(this._executeGridRetransformTimeout);
            this._executeGridRetransformTimeout = null;
        }
        this._executeGridRetransformTimeout = setTimeout(function() {
            a._gridifier.retransformAllSizes();
        }, e.Dragifier.Core.EXECUTE_GRID_RETRANSFORM_MS_TIMEOUT);
    };
    e.Dragifier.Renderer = function(a, b) {
        var c = this;
        this._settings = null;
        this._coordsChanger = null;
        this._css = {};
        this._construct = function() {
            c._settings = a;
            c._setRenderFunction();
            c._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Dragifier.Renderer.prototype._setRenderFunction = function() {
        this._coordsChanger = this._settings.getDraggableItemCoordsChanger();
    };
    e.Dragifier.Renderer.prototype.render = function(a, b, c) {
        this._coordsChanger(a, b, c);
    };
    e.Dragifier.ConnectionIntersectionDraggableItem = function(a, b, c, d, f, g, h, i, j, k) {
        var l = this;
        this._gridifier = null;
        this._appender = null;
        this._reversedAppender = null;
        this._collector = null;
        this._connections = null;
        this._connectors = null;
        this._connectionsIntersector = null;
        this._guid = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._dragifierCore = null;
        this._dragifierRenderer = null;
        this._dragIdentifiers = [];
        this._draggableItem = null;
        this._draggableItemClone = null;
        this._connectionsSorter = null;
        this._css = {};
        this._construct = function() {
            l._gridifier = a;
            l._appender = b;
            l._reversedAppender = c;
            l._collector = d;
            l._connections = f;
            l._connectors = g;
            l._guid = h;
            l._settings = i;
            l._sizesResolverManager = j;
            l._eventEmitter = k;
            l._dragIdentifiers = [];
            l._connectionsIntersector = new e.ConnectionsIntersector(l._connections);
            l._dragifierRenderer = new e.Dragifier.Renderer(l._settings);
            l._dragifierCore = new e.Dragifier.Core(l._gridifier, l._appender, l._reversedAppender, l._collector, l._connectors, l._connections, l._settings, l._guid, l._dragifierRenderer, l._sizesResolverManager, l._eventEmitter);
            if (l._settings.isVerticalGrid()) {
                l._connectionsSorter = new e.VerticalGrid.ConnectionsSorter(l._connections, l._settings, l._guid);
            } else if (l._settings.isHorizontalGrid()) {
                l._connectionsSorter = new e.HorizontalGrid.ConnectionsSorter(l._connections, l._settings, l._guid);
            }
            l._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            l._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.bindDraggableItem = function(a, b, c) {
        this._initDraggableItem(a);
        this._dragifierCore.determineGridOffsets();
        this._dragifierCore.determineInitialCursorOffsetsFromDraggableItemCenter(this._draggableItem, b, c);
        this._draggableItemClone = this._dragifierCore.createDraggableItemClone(this._draggableItem);
        this._hideDraggableItem();
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.getDraggableItem = function() {
        return this._draggableItem;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.addDragIdentifier = function(a) {
        this._dragIdentifiers.push(a);
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.hasDragIdentifier = function(a) {
        for (var b = 0; b < this._dragIdentifiers.length; b++) {
            if (this._dragIdentifiers[b] == a) return true;
        }
        return false;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.removeDragIdentifier = function(a) {
        for (var b = 0; b < this._dragIdentifiers.length; b++) {
            if (this._dragIdentifiers[b] == a) {
                this._dragIdentifiers.splice(b, 1);
                break;
            }
        }
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.getDragIdentifiersCount = function() {
        return this._dragIdentifiers.length;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype._initDraggableItem = function(a) {
        this._draggableItem = a;
        if (d.isBrowserSupportingTransitions()) d.css3.transitionProperty(this._draggableItem, "Visibility 0ms ease");
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype._hideDraggableItem = function() {
        this._draggableItem.style.visibility = "hidden";
        this._draggableItem.setAttribute(e.Dragifier.IS_DRAGGABLE_ITEM_DATA_ATTR, "yes");
        var a = this._gridifier.getItemClonesManager();
        if (a.hasBindedClone(this._draggableItem)) {
            var b = a.getBindedClone(this._draggableItem);
            b.style.visibility = "hidden";
        }
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.processDragMove = function(a, b) {
        var c = this._dragifierCore.calculateDraggableItemCloneNewDocumentPosition(this._draggableItem, a, b);
        this._dragifierRenderer.render(this._draggableItemClone, c.x, c.y);
        var d = this._dragifierCore.calculateDraggableItemCloneNewGridPosition(this._draggableItem, c);
        var e = this._getNewIntersectedConnections(d);
        if (e.length == 0) return;
        if (this._settings.isDisabledSortDispersion() || this._settings.isCustomSortDispersion()) {
            this._swapItemGUIDS(e);
            this._dragifierCore.reappendGridItems();
        } else if (this._settings.isCustomAllEmptySpaceSortDispersion()) {
            if (this._swapItemPositions(e)) this._dragifierCore.reappendGridItems();
        }
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype._getNewIntersectedConnections = function(a) {
        var b = this._guid.getItemGUID(this._draggableItem);
        var c = this._connectionsIntersector.getAllConnectionsWithIntersectedCenter(a);
        var d = [];
        for (var e = 0; e < c.length; e++) {
            if (c[e].itemGUID != b) {
                d.push(c[e]);
            }
        }
        return d;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype._swapItemGUIDS = function(a) {
        var b = this._guid.getItemGUID(this._draggableItem);
        var c = a[0];
        for (var d = 0; d < a.length; d++) {
            if (a[d].itemGUID < c) c = a[d];
        }
        this._guid.setItemGUID(this._draggableItem, c.itemGUID);
        this._guid.setItemGUID(this._draggableItemClone, c.itemGUID);
        this._guid.setItemGUID(c.item, b);
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype._swapItemPositions = function(a) {
        var b = this._connections.findConnectionByItem(this._draggableItem, true);
        if (b == null) return false;
        if (this._settings.isVerticalGrid()) {
            a = this._connectionsSorter.sortConnectionsPerReappend(a);
        } else if (this._settings.isHorizontalGrid()) {
            a = this._connectionsSorter.sortConnectionsPerReappend(a);
        }
        var c = a[0];
        var d = this._guid.getItemGUID(this._draggableItem);
        var e = this._guid.getItemGUID(c.item);
        this._guid.setItemGUID(this._draggableItem, e);
        this._guid.setItemGUID(c.item, d);
        var f = b.item;
        b.item = c.item;
        c.item = f;
        var g = b.itemGUID;
        b.itemGUID = e;
        c.itemGUID = g;
        return true;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype.unbindDraggableItem = function() {
        document.body.removeChild(this._draggableItemClone);
        this._showDraggableItem();
        this._draggableItem = null;
        this._draggableItem = null;
    };
    e.Dragifier.ConnectionIntersectionDraggableItem.prototype._showDraggableItem = function() {
        this._draggableItem.removeAttribute(e.Dragifier.IS_DRAGGABLE_ITEM_DATA_ATTR);
        this._draggableItem.style.visibility = "visible";
    };
    e.Dragifier.Cells = function(a) {
        var b = this;
        this._discretizer = null;
        this._css = {};
        this._construct = function() {
            b._discretizer = a;
            b._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Dragifier.Cells.prototype.getIntersectedByDraggableItemCellCentersData = function(a) {
        var b = this._discretizer.getAllCellsWithIntersectedCenterData(a);
        if (b.intersectedColsCount == 0 && b.intersectedRowsCount == 0) {
            b.intersectedRowsCount = 1;
            b.intersectedColsCount = 1;
        }
        return b;
    };
    e.Dragifier.Cells.prototype.isAtLeastOneOfIntersectedCellCentersEmpty = function(a) {
        var b = a.cellsWithIntersectedCenter;
        var c = false;
        for (var d = 0; d < b.length; d++) {
            for (var f = 0; f < b[d].length; f++) {
                if (!b[d][f][e.Discretizer.IS_INTERSECTED_BY_ITEM]) c = true;
            }
        }
        return c;
    };
    e.Dragifier.Cells.prototype.isIntersectingEnoughRowsAndCols = function(a, b) {
        if (b.intersectedRowsCount < a.intersectedRowsCount || b.intersectedColsCount < a.intersectedColsCount) {
            return false;
        }
        return true;
    };
    e.Dragifier.Cells.prototype.normalizeCellsWithMaybeIntersectionOverflows = function(a, b, c) {
        if (c.intersectedRowsCount > b.intersectedRowsCount) {
            var d = c.intersectedRowsCount - b.intersectedRowsCount;
            for (var e = 0; e < d; e++) {
                a.pop();
            }
        }
        if (c.intersectedColsCount > b.intersectedColsCount) {
            var f = c.intersectedColsCount - b.intersectedColsCount;
            for (var g = 0; g < a.length; g++) {
                for (var e = 0; e < f; e++) {
                    a[g].pop();
                }
            }
        }
        var h = [];
        for (var g = 0; g < a.length; g++) {
            for (var i = 0; i < a[g].length; i++) {
                h.push(a[g][i]);
            }
        }
        return h;
    };
    e.Dragifier.GridDiscretizationDraggableItem = function(a, b, c, d, f, g, h, i, j, k) {
        var l = this;
        this._gridifier = null;
        this._appender = null;
        this._reversedAppender = null;
        this._collector = null;
        this._connections = null;
        this._connectors = null;
        this._guid = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._dragifierCore = null;
        this._discretizer = null;
        this._dragifierCells = null;
        this._dragifierRenderer = null;
        this._dragIdentifiers = [];
        this._draggableItem = null;
        this._draggableItemConnection = null;
        this._draggableItemClone = null;
        this._draggableItemPointer = null;
        this._css = {};
        this._construct = function() {
            l._gridifier = a;
            l._appender = b;
            l._reversedAppender = c;
            l._collector = d;
            l._connections = f;
            l._connectors = g;
            l._guid = h;
            l._settings = i;
            l._sizesResolverManager = j;
            l._eventEmitter = k;
            l._dragIdentifiers = [];
            l._dragifierRenderer = new e.Dragifier.Renderer(l._settings);
            l._dragifierCore = new e.Dragifier.Core(l._gridifier, l._appender, l._reversedAppender, l._collector, l._connectors, l._connections, l._settings, l._guid, l._dragifierRenderer, l._sizesResolverManager, l._eventEmitter);
            l._discretizer = new e.Discretizer(l._gridifier, l._connections, l._settings, l._sizesResolverManager);
            l._dragifierCells = new e.Dragifier.Cells(l._discretizer);
            l._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            l._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Dragifier.GridDiscretizationDraggableItem.REAPPEND_GRID_ITEMS_DELAY = 100;
    e.Dragifier.GridDiscretizationDraggableItem.prototype.bindDraggableItem = function(a, b, c) {
        this._initDraggableItem(a);
        this._initDraggableItemConnection();
        this._dragifierCore.determineGridOffsets();
        this._dragifierCore.determineInitialCursorOffsetsFromDraggableItemCenter(this._draggableItem, b, c);
        this._draggableItemClone = this._dragifierCore.createDraggableItemClone(this._draggableItem);
        this._draggableItemPointer = this._dragifierCore.createDraggableItemPointer(this._draggableItem);
        this._discretizer.discretizeGrid();
        this._discretizer.markCellsIntersectedByItem(this._draggableItem, this._draggableItemConnection);
        this._discretizer.createDemonstrator();
        this._hideDraggableItem();
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.getDraggableItem = function() {
        return this._draggableItem;
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.addDragIdentifier = function(a) {
        this._dragIdentifiers.push(a);
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.hasDragIdentifier = function(a) {
        for (var b = 0; b < this._dragIdentifiers.length; b++) {
            if (this._dragIdentifiers[b] == a) return true;
        }
        return false;
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.removeDragIdentifier = function(a) {
        for (var b = 0; b < this._dragIdentifiers.length; b++) {
            if (this._dragIdentifiers[b] == a) {
                this._dragIdentifiers.splice(b, 1);
                break;
            }
        }
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.getDragIdentifiersCount = function() {
        return this._dragIdentifiers.length;
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype._initDraggableItem = function(a) {
        this._draggableItem = a;
        if (d.isBrowserSupportingTransitions()) d.css3.transitionProperty(this._draggableItem, "Visibility 0ms ease");
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype._initDraggableItemConnection = function() {
        this._draggableItemConnection = this._connections.findConnectionByItem(this._draggableItem);
        this._draggableItemConnection[e.SizesTransformer.RESTRICT_CONNECTION_COLLECT] = true;
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype._hideDraggableItem = function() {
        this._draggableItem.style.visibility = "hidden";
        this._draggableItem.setAttribute(e.Dragifier.IS_DRAGGABLE_ITEM_DATA_ATTR, "yes");
        var a = this._gridifier.getItemClonesManager();
        if (a.hasBindedClone(this._draggableItem)) {
            var b = a.getBindedClone(this._draggableItem);
            b.style.visibility = "hidden";
        }
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.processDragMove = function(a, b) {
        var c = this._dragifierCore.calculateDraggableItemCloneNewDocumentPosition(this._draggableItem, a, b);
        this._dragifierRenderer.render(this._draggableItemClone, c.x, c.y);
        var d = this._dragifierCore.calculateDraggableItemCloneNewGridPosition(this._draggableItem, c);
        var e = this._dragifierCells.getIntersectedByDraggableItemCellCentersData(this._draggableItemConnection);
        var f = this._discretizer.getAllCellsWithIntersectedCenterData(d);
        if (!this._dragifierCells.isAtLeastOneOfIntersectedCellCentersEmpty(f)) return;
        if (!this._dragifierCells.isIntersectingEnoughRowsAndCols(e, f)) return;
        this._transformGrid(this._dragifierCells.normalizeCellsWithMaybeIntersectionOverflows(f.cellsWithIntersectedCenter, e, f));
        this._discretizer.updateDemonstrator();
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype._transformGrid = function(a) {
        var b = this._discretizer.intersectedCellsToCoords(a);
        b = this._discretizer.normalizeItemNewConnectionHorizontalCoords(this._draggableItem, b);
        b = this._discretizer.normalizeItemNewConnectionVerticalCoords(this._draggableItem, b);
        this._adjustDraggableItemPositions(b);
        this._discretizer.markCellsIntersectedByItem(this._draggableItem, b);
        var c = this;
        setTimeout(function() {
            c._dragifierCore.reappendGridItems();
        }, e.Dragifier.GridDiscretizationDraggableItem.REAPPEND_GRID_ITEMS_DELAY);
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype._adjustDraggableItemPositions = function(a) {
        this._draggableItemConnection.x1 = a.x1;
        this._draggableItemConnection.x2 = a.x2;
        this._draggableItemConnection.y1 = a.y1;
        this._draggableItemConnection.y2 = a.y2;
        var b = this._settings.getCoordsChanger();
        var c = this._settings.getCoordsChangeAnimationMsDuration();
        var d = this._settings.getEventEmitter();
        b(this._draggableItem, a.x1 + "px", a.y1 + "px", c, d, false);
        this._dragifierRenderer.render(this._draggableItemPointer, a.x1, a.y1);
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype.unbindDraggableItem = function() {
        document.body.removeChild(this._draggableItemClone);
        this._gridifier.getGrid().removeChild(this._draggableItemPointer);
        this._draggableItemConnection[e.SizesTransformer.RESTRICT_CONNECTION_COLLECT] = false;
        this._showDraggableItem();
        this._draggableItem = null;
        this._discretizer.deleteDemonstrator();
    };
    e.Dragifier.GridDiscretizationDraggableItem.prototype._showDraggableItem = function() {
        this._draggableItem.style.visibility = "visible";
        this._draggableItem.removeAttribute(e.Dragifier.IS_DRAGGABLE_ITEM_DATA_ATTR);
    };
    e.ApiSettingsErrors = function(a, b) {
        var c = this;
        this._error = null;
        this._isApiSettingsError = false;
        this._errorMsg = "";
        this._css = {};
        this._construct = function() {
            c._error = a;
            c._isApiSettingsError = false;
            c._errorMsg = "";
            c._parseIfIsApiSettingsError(b);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ApiSettingsErrors.prototype.isApiSettingsError = function() {
        return this._isApiSettingsError;
    };
    e.ApiSettingsErrors.prototype.getErrorMessage = function() {
        return this._errorMsg;
    };
    e.ApiSettingsErrors.prototype._parseIfIsApiSettingsError = function(a) {
        var b = e.Error.ERROR_TYPES.SETTINGS;
        if (a == b.INVALID_ONE_OF_TOGGLE_PARAMS) {
            this._markAsApiSettingsError();
            this._invalidOneOfToggleParamsError();
        } else if (a == b.INVALID_ONE_OF_SORT_FUNCTION_TYPES || a == b.INVALID_ONE_OF_RETRANSFORM_SORT_FUNCTION_TYPES || a == b.INVALID_ONE_OF_FILTER_FUNCTION_TYPES || a == b.INVALID_ONE_OF_COORDS_CHANGER_FUNCTION_TYPES || a == b.INVALID_ONE_OF_SIZES_CHANGER_FUNCTION_TYPES || a == b.INVALID_ONE_OF_DRAGGABLE_ITEM_DECORATOR_FUNCTION_TYPES) {
            this._markAsApiSettingsError();
            if (a == b.INVALID_ONE_OF_SORT_FUNCTION_TYPES) {
                var c = "sort";
            } else if (a == b.INVALID_ONE_OF_RETRANSFORM_SORT_FUNCTION_TYPES) {
                var c = "retransformSort";
            } else if (a == b.INVALID_ONE_OF_FILTER_FUNCTION_TYPES) {
                var c = "filter";
            } else if (a == b.INVALID_ONE_OF_COORDS_CHANGER_FUNCTION_TYPES) {
                var c = "coordsChanger";
            } else if (a == b.INVALID_ONE_OF_SIZES_CHANGER_FUNCTION_TYPES) {
                var c = "sizesChanger";
            } else if (a == b.INVALID_ONE_OF_DRAGGABLE_ITEM_DECORATOR_FUNCTION_TYPES) {
                var c = "draggableItemDecorator";
            }
            this._invalidOneOfFunctionTypesError(c);
        } else if (a == b.INVALID_TOGGLE_PARAM_VALUE || a == b.INVALID_SORT_PARAM_VALUE || a == b.INVALID_RETRANSFORM_SORT_PARAM_VALUE || a == b.INVALID_FILTER_PARAM_VALUE || a == b.INVALID_COORDS_CHANGER_PARAM_VALUE || a == b.INVALID_SIZES_CHANGER_PARAM_VALUE || a == b.INVALID_DRAGGABLE_ITEM_DECORATOR_PARAM_VALUE) {
            this._markAsApiSettingsError();
            if (a == b.INVALID_TOGGLE_PARAM_VALUE) {
                var c = "toggle";
            } else if (a == b.INVALID_SORT_PARAM_VALUE) {
                var c = "sort";
            } else if (a == b.INVALID_RETRANSFORM_SORT_PARAM_VALUE) {
                var c = "retransformSort";
            } else if (a == b.INVALID_FILTER_PARAM_VALUE) {
                var c = "filter";
            } else if (a == b.INVALID_COORDS_CHANGER_PARAM_VALUE) {
                var c = "coordsChanger";
            } else if (a == b.INVALID_SIZES_CHANGER_PARAM_VALUE) {
                var c = "sizesChanger";
            } else if (a == b.INVALID_DRAGGABLE_ITEM_DECORATOR_PARAM_VALUE) {
                var c = "draggableItemDecorator";
            }
            this._invalidParamValueError(c);
        } else if (a == b.SET_TOGGLE_INVALID_PARAM || a == b.SET_FILTER_INVALID_PARAM || a == b.SET_SORT_INVALID_PARAM || a == b.SET_RETRANSFORM_SORT_INVALID_PARAM || a == b.SET_COORDS_CHANGER_INVALID_PARAM || a == b.SET_SIZES_CHANGER_INVALID_PARAM || a == b.SET_DRAGGABLE_ITEM_DECORATOR_INVALID_PARAM) {
            this._markAsApiSettingsError();
            if (a == b.SET_TOGGLE_INVALID_PARAM) {
                var d = "toggle";
            } else if (a == b.SET_FILTER_INVALID_PARAM) {
                var d = "filter";
            } else if (a == b.SET_SORT_INVALID_PARAM) {
                var d = "sort";
            } else if (a == b.SET_RETRANSFORM_SORT_INVALID_PARAM) {
                var d = "retransformSort";
            } else if (a == b.SET_COORDS_CHANGER_INVALID_PARAM) {
                var d = "coordsChanger";
            } else if (a == b.SET_SIZES_CHANGER_INVALID_PARAM) {
                var d = "sizesChanger";
            } else if (a == b.SET_DRAGGABLE_ITEM_DECORATOR_INVALID_PARAM) {
                var d = "draggableItemDecorator";
            }
            this._invalidSetterParamError(d);
        }
    };
    e.ApiSettingsErrors.prototype._markAsApiSettingsError = function() {
        this._isApiSettingsError = true;
    };
    e.ApiSettingsErrors.prototype._invalidOneOfToggleParamsError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong one of the 'toggle' params. It must be an object with show and hide function definitions.";
        a += " Got: '" + this._error.getErrorParam() + "'.";
        this._errorMsg = a;
    };
    e.ApiSettingsErrors.prototype._invalidOneOfFunctionTypesError = function(a) {
        var b = this._error.getErrorMsgPrefix();
        b += "Wrong one of the '" + a + "' functions. It must be a function. Got: '" + this._error.getErrorParam() + "'.";
        this._errorMsg = b;
    };
    e.ApiSettingsErrors.prototype._invalidParamValueError = function(a) {
        var b = this._error.getErrorMsgPrefix();
        b += "Wrong '" + a + "' param value. It must be a function(which will be used by default), ";
        b += "or an object with key(function name)-value(function body) pairs. Got: '" + this._error.getErrorParam() + "'.";
        this._errorMsg = b;
    };
    e.ApiSettingsErrors.prototype._invalidSetterParamError = function(a) {
        var b = this._error.getErrorMsgPrefix();
        b += "Can't set '" + a + "' with name '" + this._error.getErrorParam() + "'.";
        b += " It is not registred in Gridifier.";
        this._errorMsg = b;
    };
    e.CollectorErrors = function(a, b) {
        var c = this;
        this._error = null;
        this._isCollectorError = false;
        this._errorMsg = "";
        this._css = {};
        this._construct = function() {
            c._error = a;
            c._isCollectorError = false;
            c._errorMsg = "";
            c._parseIfIsCollectorError(b);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.CollectorErrors.prototype.isCollectorError = function() {
        return this._isCollectorError;
    };
    e.CollectorErrors.prototype.getErrorMessage = function() {
        return this._errorMsg;
    };
    e.CollectorErrors.prototype._parseIfIsCollectorError = function(a) {
        var b = e.Error.ERROR_TYPES.COLLECTOR;
        if (a == b.NOT_DOM_ELEMENT) {
            this._markAsCollectorError();
            this._notDomElementError();
        } else if (a == b.ITEM_NOT_ATTACHED_TO_GRID) {
            this._markAsCollectorError();
            this._itemNotAttachedToGridError();
        } else if (a == b.ITEM_NOT_CONNECTED_TO_GRID) {
            this._markAsCollectorError();
            this._itemNotConnectedToGridError();
        } else if (a == b.ITEM_WIDER_THAN_GRID_WIDTH) {
            this._markAsCollectorError();
            this._itemWiderThanGridWidthError();
        } else if (a == b.ITEM_TALLER_THAN_GRID_HEIGHT) {
            this._markAsCollectorError();
            this._itemTallerThanGridHeightError();
        }
    };
    e.CollectorErrors.prototype._markAsCollectorError = function() {
        this._isCollectorError = true;
    };
    e.CollectorErrors.prototype._notDomElementError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "One of the added elements to Gridifier is not DOM Element. Got: '";
        a += this._error.getErrorParam() + "'.";
        this._errorMsg = a;
    };
    e.CollectorErrors.prototype._itemNotAttachedToGridError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "One of the appended/prepended items is not attached to grid. Item: '";
        a += this._error.getErrorParam() + "'.";
        this._errorMsg = a;
    };
    e.CollectorErrors.prototype._itemNotConnectedToGridError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "One of items is not connected to grid. Item: '";
        a += this._error.getErrorParam() + "'.";
        this._errorMsg = a;
    };
    e.CollectorErrors.prototype._itemWiderThanGridWidthError = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorObjectParam();
        a += "Item '" + b.item + "' is wider than grid. Grid type: 'Vertical Grid'. ";
        a += "Grid width: '" + b.gridWidth + "px'. Item width: '" + b.itemWidth + "px'.";
        this._errorMsg = a;
    };
    e.CollectorErrors.prototype._itemTallerThanGridHeightError = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorObjectParam();
        a += "Item '" + b.item + "' is taller than grid. Grid type: 'Horizontal Grid'. ";
        a += "Grid height: '" + b.gridHeight + "px'. Item height: '" + b.itemHeight + "px'.";
        this._errorMsg = a;
    };
    e.CoreErrors = function(a, b) {
        var c = this;
        this._error = null;
        this._isCoreError = false;
        this._errorMsg = "";
        this._css = {};
        this._construct = function() {
            c._error = a;
            c._isCoreError = false;
            c._errorMsg = "";
            c._parseIfIsCoreError(b);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.CoreErrors.prototype.isCoreError = function() {
        return this._isCoreError;
    };
    e.CoreErrors.prototype.getErrorMessage = function() {
        return this._errorMsg;
    };
    e.CoreErrors.prototype._parseIfIsCoreError = function(a) {
        var b = e.Error.ERROR_TYPES;
        if (a == b.EXTRACT_GRID) {
            this._markAsCoreError();
            this._notDomElementError();
        } else if (a == b.CONNECTIONS.NO_CONNECTIONS) {
            this._markAsCoreError();
            this._noConnectionsError();
        } else if (a == b.CONNECTIONS.CONNECTION_BY_ITEM_NOT_FOUND) {
            this._markAsCoreError();
            this._connectionByItemNotFoundError();
        } else if (a == b.SIZES_TRANSFORMER.WRONG_TARGET_TRANSFORMATION_SIZES) {
            this._markAsCoreError();
            this._wrongTargetTransformationSizesError();
        } else if (a == b.APPENDER.WRONG_INSERT_BEFORE_TARGET_ITEM) {
            this._markAsCoreError();
            this._wrongInsertBeforeTargetItem();
        } else if (a == b.APPENDER.WRONG_INSERT_AFTER_TARGET_ITEM) {
            this._markAsCoreError();
            this._wrongInsertAfterTargetItem();
        } else if (a == b.INSERTER.TOO_WIDE_ITEM_ON_VERTICAL_GRID_INSERT) {
            this._markAsCoreError();
            this._tooWideItemOnVerticalGridInsert();
        } else if (a == b.INSERTER.TOO_TALL_ITEM_ON_HORIZONTAL_GRID_INSERT) {
            this._markAsCoreError();
            this._tooTallItemOnHorizontalGridInsert();
        }
    };
    e.CoreErrors.prototype._markAsCoreError = function() {
        this._isCoreError = true;
    };
    e.CoreErrors.prototype._notDomElementError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Can't get grid layout DOM element. Currently gridifier supports ";
        a += "native DOM elements, as well as jQuery objects. ";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._noConnectionsError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Can't find any item, that was processed by Gridifier.";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._connectionByItemNotFoundError = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorObjectParam();
        a += "Can't find connection by item.\n";
        a += "Item: \n" + b.item + "\n";
        a += "Connections:\n";
        for (var c = 0; c < b.connections.length; c++) a += b.connections[c] + "\n";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._wrongTargetTransformationSizesError = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorParam();
        a += "Wrong target transformation sizes. 'transformSizes' and 'toggleSizes' functions accepts 4 types of values:\n";
        a += "    gridifier.transformSizes(item, '100px', '60%'); // px or % values\n";
        a += "    gridifier.transformSizes(item, 100, 200.5); // values without postfix will be parsed as px value.";
        a += "    gridifier.transformSizes(item, '*2', '/0.5'); // values with multiplication or division expressions.";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._wrongInsertBeforeTargetItem = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorParam();
        a += "Wrong target item passed to the insertBefore function. It must be item, which was processed by gridifier. ";
        a += "Got: " + b + ".";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._wrongInsertAfterTargetItem = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorParam();
        a += "Wrong target item passed to the insertAfter function. It must be item, which was processed by gridifier. ";
        a += "Got: " + b + ".";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._tooWideItemOnVerticalGridInsert = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorParam();
        a += "Can't insert item '" + b + "'. Probably it has px based width and it's width is wider than grid width. ";
        a += "This can happen in such cases:\n";
        a += "    1. Px-width item is wider than grid from start.(Before attaching to gridifier)\n";
        a += "    2. Px-width item became wider than grid after grid resize.\n";
        a += "    3. Px-width item became wider after applying transform/toggle operation.\n";
        this._errorMsg = a;
    };
    e.CoreErrors.prototype._tooTallItemOnHorizontalGridInsert = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = this._error.getErrorParam();
        a += "Can't insert item '" + b + "'. Probably it has px based height and it's height is taller than grid height. ";
        a += "This can happend in such cases:\n";
        a += "    1. Px-height item is taller than grid from start.(Before attaching to gridifier)\n";
        a += "    2. Px-height item became taller than grid after grid resize.\n";
        a += "    3. Px-height item became taller after applying transform/toggle operation.\n";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors = function(a, b) {
        var c = this;
        this._error = null;
        this._isCoreSettingsError = false;
        this._errorMsg = "";
        this._css = {};
        this._construct = function() {
            c._error = a;
            c._isCoreSettingsError = false;
            c._errorMsg = "";
            c._parseIfIsCoreSettingsError(b);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.CoreSettingsErrors.prototype.isCoreSettingsError = function() {
        return this._isCoreSettingsError;
    };
    e.CoreSettingsErrors.prototype.getErrorMessage = function() {
        return this._errorMsg;
    };
    e.CoreSettingsErrors.prototype._parseIfIsCoreSettingsError = function(a) {
        var b = e.Error.ERROR_TYPES.SETTINGS;
        if (a == b.INVALID_GRID_TYPE) {
            this._markAsCoreSettingsError();
            this._invalidGridTypeError();
        } else if (a == b.INVALID_PREPEND_TYPE) {
            this._markAsCoreSettingsError();
            this._invalidPrependTypeError();
        } else if (a == b.INVALID_APPEND_TYPE) {
            this._markAsCoreSettingsError();
            this._invalidAppendTypeError();
        } else if (a == b.INVALID_INTERSECTION_STRATEGY) {
            this._markAsCoreSettingsError();
            this._invalidIntersectionStrategyError();
        } else if (a == b.INVALID_ALIGNMENT_TYPE) {
            this._markAsCoreSettingsError();
            this._invalidAlignmentTypeError();
        } else if (a == b.INVALID_SORT_DISPERSION_MODE) {
            this._markAsCoreSettingsError();
            this._invalidSortDispersionModeError();
        } else if (a == b.MISSING_SORT_DISPERSION_VALUE) {
            this._markAsCoreSettingsError();
            this._missingSortDispersionValueError();
        } else if (a == b.INVALID_SORT_DISPERSION_VALUE) {
            this._markAsCoreSettingsError();
            this._invalidSortDispersionValueError();
        } else if (a == b.INVALID_DRAGIFIER_DISCRETIZATION_MODE) {
            this._markAsCoreSettingsError();
            this._invalidDragifierDiscretizationModeError();
        }
    };
    e.CoreSettingsErrors.prototype._markAsCoreSettingsError = function() {
        this._isCoreSettingsError = true;
    };
    e.CoreSettingsErrors.prototype._invalidGridTypeError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong 'gridType' param value. Got: '" + this._error.getErrorParam() + "'. ";
        a += "Available types: " + e.GRID_TYPES.VERTICAL_GRID;
        a += ", " + e.GRID_TYPES.HORIZONTAL_GRID + ".";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidPrependTypeError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong 'prependType' param value. Got: '" + this._error.getErrorParam() + "'. ";
        a += "Available types: " + e.PREPEND_TYPES.MIRRORED_PREPEND;
        a += " , " + e.PREPEND_TYPES.DEFAULT_PREPEND;
        a += " , " + e.PREPEND_TYPES.REVERSED_PREPEND + ".";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidAppendTypeError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong 'appendType' param value. Got: '" + this._error.getErrorParam() + "'. ";
        a += "Available types: " + e.APPEND_TYPES.DEFAULT_APPEND;
        a += " , " + e.APPEND_TYPES.REVERSED_APPEND + ".";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidIntersectionStrategyError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong 'intersectionStrategy' param value. Got: '" + this._error.getErrorParam() + "'. ";
        a += "Available strategies: " + e.INTERSECTION_STRATEGIES.DEFAULT;
        a += " , " + e.INTERSECTION_STRATEGIES.REVERSED;
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidAlignmentTypeError = function() {
        var a = this._error.getErrorMsgPrefix();
        var b = e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES;
        var c = b.FOR_VERTICAL_GRID;
        var d = b.FOR_HORIZONTAL_GRID;
        a += "Wrong 'alignmentType' param value. Got: '" + this._error.getErrorParam() + "'. ";
        a += "Available values: ";
        a += c.TOP + ", ";
        a += c.CENTER + ", ";
        a += c.BOTTOM + "(For vertical grids), ";
        a += d.LEFT + ", ";
        a += d.CENTER + ", ";
        a += d.RIGHT + "(For horizontal grids). ";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidSortDispersionModeError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong 'sortDispersionMode' param value. Got: '" + this._error.getErrorParam() + "'. ";
        a += "Available modes: " + e.SORT_DISPERSION_MODES.DISABLED;
        a += " , " + e.SORT_DISPERSION_MODES.CUSTOM;
        a += " , " + e.SORT_DISPERSION_MODES.CUSTOM_ALL_EMPTY_SPACE;
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._missingSortDispersionModeError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "You have chosen custom sort dispersion mode, but didn't provided required 'sortDispersionValue' param.";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidSortDispersionValueError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Wrong 'sortDispersionValue' param value. It must be a string with number as prefix, ";
        a += "and px as postfix.(100px). Got: '" + this._error.getErrorParam() + "'.";
        this._errorMsg = a;
    };
    e.CoreSettingsErrors.prototype._invalidDragifierDiscretizationModeError = function() {
        var a = this._error.getErrorMsgPrefix();
        a += "Can't combine 'gridDiscretization' dragifier algorithm param with following settings: \n";
        a += "    1. 'discretization' dragifier mode doesn't support noIntersections strategy.\n";
        a += "    2. 'discretization' dragifier mode requires 'sortDispersion' parameter to be equal to the 'customAllEmptySpace' value.";
        a += " (This mode must have all grid space available per drags.)";
        this._errorMsg = a;
    };
    e.Error = function(a, b) {
        var c = this;
        this._errorParam = null;
        this._coreErrors = null;
        this._collectorErrors = null;
        this._apiSettingsErrors = null;
        this._coreSettingsErrors = null;
        this._css = {};
        this._construct = function() {
            c._errorParam = b || null;
            c._coreErrors = new e.CoreErrors(c, a);
            c._collectorErrors = new e.CollectorErrors(c, a);
            c._apiSettingsErrors = new e.ApiSettingsErrors(c, a);
            c._coreSettingsErrors = new e.CoreSettingsErrors(c, a);
            if (c._coreErrors.isCoreError()) {
                var d = c._coreErrors.getErrorMessage();
            } else if (c._collectorErrors.isCollectorError()) {
                var d = c._collectorErrors.getErrorMessage();
            } else if (c._apiSettingsErrors.isApiSettingsError()) {
                var d = c._apiSettingsErrors.getErrorMessage();
            } else if (c._coreSettingsErrors.isCoreSettingsError()) {
                var d = c._coreSettingsErrors.getErrorMessage();
            } else {
                throw new Error("Gridifier Error -> Wrong error type: " + a);
            }
            throw new Error(d);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Error.ERROR_TYPES = {
        EXTRACT_GRID: 0,
        SETTINGS: {
            INVALID_GRID_TYPE: 1,
            INVALID_PREPEND_TYPE: 2,
            INVALID_APPEND_TYPE: 3,
            INVALID_INTERSECTION_STRATEGY: 4,
            INVALID_ALIGNMENT_TYPE: 5,
            INVALID_SORT_DISPERSION_MODE: 6,
            MISSING_SORT_DISPERSION_VALUE: 7,
            INVALID_SORT_DISPERSION_VALUE: 8,
            INVALID_SORT_PARAM_VALUE: 9,
            INVALID_ONE_OF_SORT_FUNCTION_TYPES: 10,
            INVALID_RETRANSFORM_SORT_PARAM_VALUE: 41,
            INVALID_ONE_OF_RETRANSFORM_SORT_FUNCTION_TYPES: 42,
            INVALID_FILTER_PARAM_VALUE: 11,
            INVALID_ONE_OF_FILTER_FUNCTION_TYPES: 12,
            INVALID_TOGGLE_PARAM_VALUE: 13,
            INVALID_ONE_OF_TOGGLE_PARAMS: 14,
            INVALID_COORDS_CHANGER_PARAM_VALUE: 15,
            INVALID_ONE_OF_COORDS_CHANGER_FUNCTION_TYPES: 16,
            INVALID_SIZES_CHANGER_PARAM_VALUE: 17,
            INVALID_ONE_OF_SIZES_CHANGER_FUNCTION_TYPES: 18,
            INVALID_DRAGGABLE_ITEM_DECORATOR_PARAM_VALUE: 37,
            INVALID_ONE_OF_DRAGGABLE_ITEM_DECORATOR_FUNCTION_TYPES: 38,
            SET_TOGGLE_INVALID_PARAM: 19,
            SET_FILTER_INVALID_PARAM: 20,
            SET_SORT_INVALID_PARAM: 21,
            SET_RETRANSFORM_SORT_INVALID_PARAM: 43,
            SET_COORDS_CHANGER_INVALID_PARAM: 22,
            SET_SIZES_CHANGER_INVALID_PARAM: 23,
            SET_DRAGGABLE_ITEM_DECORATOR_INVALID_PARAM: 36,
            INVALID_DRAGIFIER_DISCRETIZATION_MODE: 40
        },
        COLLECTOR: {
            NOT_DOM_ELEMENT: 24,
            ITEM_NOT_ATTACHED_TO_GRID: 25,
            ITEM_NOT_CONNECTED_TO_GRID: 26,
            ITEM_WIDER_THAN_GRID_WIDTH: 27,
            ITEM_TALLER_THAN_GRID_HEIGHT: 28
        },
        CONNECTIONS: {
            NO_CONNECTIONS: 29,
            CONNECTION_BY_ITEM_NOT_FOUND: 30
        },
        SIZES_TRANSFORMER: {
            WRONG_TARGET_TRANSFORMATION_SIZES: 31
        },
        APPENDER: {
            WRONG_INSERT_BEFORE_TARGET_ITEM: 32,
            WRONG_INSERT_AFTER_TARGET_ITEM: 33
        },
        INSERTER: {
            TOO_WIDE_ITEM_ON_VERTICAL_GRID_INSERT: 34,
            TOO_TALL_ITEM_ON_HORIZONTAL_GRID_INSERT: 35
        }
    };
    e.Error.prototype.getErrorMsgPrefix = function() {
        return "Gridifier error: ";
    };
    e.Error.prototype.getErrorApiUrlPrefix = function() {
        return "http://gridifier.io/api/errors/";
    };
    e.Error.prototype.getErrorParam = function() {
        return this._errorParam + "(" + typeof this._errorParam + ")";
    };
    e.Error.prototype.getErrorObjectParam = function() {
        return this._errorParam;
    };
    e.Grid = function(a, b) {
        var c = this;
        this._grid = null;
        this._collector = null;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            c._grid = a;
            c._sizesResolverManager = b;
            c._extractGrid(a);
            c._adjustGridCss();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Grid.prototype.setCollectorInstance = function(a) {
        this._collector = a;
    };
    e.Grid.prototype._extractGrid = function(a) {
        if (d.isJqueryObject(a)) this._grid = a.get(0); else if (d.isNativeDOMObject(a)) this._grid = a; else if (d.isArray(a) && d.isNativeDOMObject(a[0])) this._grid = a[0]; else new e.Error(e.Error.ERROR_TYPES.EXTRACT_GRID);
    };
    e.Grid.prototype._adjustGridCss = function() {
        var b = a.getComputedCSS(this._grid);
        if (b.position != "relative" && b.position != "absolute") d.css.set(this._grid, {
            position: "relative"
        });
    };
    e.Grid.prototype.getGrid = function() {
        return this._grid;
    };
    e.Grid.prototype.getGridX2 = function() {
        return this._sizesResolverManager.outerWidth(this._grid, false, true) - 1;
    };
    e.Grid.prototype.getGridY2 = function() {
        return this._sizesResolverManager.outerHeight(this._grid, false, true) - 1;
    };
    e.Grid.prototype.addToGrid = function(a) {
        var a = this._collector.toDOMCollection(a);
        for (var b = 0; b < a.length; b++) {
            this._grid.appendChild(a[b]);
        }
        this._collector.attachToGrid(a);
    };
    e.Grid.prototype.markAsGridItem = function(a) {
        var a = this._collector.toDOMCollection(a);
        this._collector.attachToGrid(a);
    };
    e.GridSizesUpdater = function(a, b, c, d, e) {
        var f = this;
        f._gridifier = null;
        f._grid = null;
        f._connections = null;
        f._settings = null;
        f._eventEmitter = null;
        f._gridSizesUpdateTimeout = null;
        this._css = {};
        this._construct = function() {
            f._gridifier = a;
            f._grid = b;
            f._connections = c;
            f._settings = d;
            f._eventEmitter = e;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            f._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.GridSizesUpdater.prototype.scheduleGridSizesUpdate = function() {
        var a = this;
        if (this._gridSizesUpdateTimeout != null) {
            clearTimeout(this._gridSizesUpdateTimeout);
            this._gridSizesUpdateTimeout = null;
        }
        var b = function() {
            if (a._settings.isVerticalGrid()) {
                a._updateVerticalGridSizes.call(a);
            } else if (a._settings.isHorizontalGrid()) {
                a._updateHorizontalGridSizes.call(a);
            }
        };
        this._gridSizesUpdateTimeout = setTimeout(function() {
            if (!a._gridifier._sizesTransformer._itemsReappender.isReappendQueueEmpty()) {
                a.scheduleGridSizesUpdate();
                return;
            }
            b.call(a);
        }, this._settings.getGridTransformTimeout());
    };
    e.GridSizesUpdater.prototype._updateVerticalGridSizes = function() {
        var a = this._connections.get();
        if (a.length == 0) return;
        var b = a[0].y2;
        for (var c = 1; c < a.length; c++) {
            if (a[c].y2 > b) b = a[c].y2;
        }
        if (this._settings.isExpandGridTransformType()) {
            if (this._grid.getGridY2() < b) d.css.set(this._grid.getGrid(), {
                height: b + 1 + "px"
            });
        } else if (this._settings.isFitGridTransformType()) {
            d.css.set(this._grid.getGrid(), {
                height: b + 1 + "px"
            });
        }
        this._eventEmitter.emitGridSizesChangeEvent(this._grid.getGrid(), this._grid.getGridX2() + 1, b + 1);
    };
    e.GridSizesUpdater.prototype._updateHorizontalGridSizes = function() {
        var a = this._connections.get();
        if (a.length == 0) return;
        var b = a[0].x2;
        for (var c = 1; c < a.length; c++) {
            if (a[c].x2 > b) b = a[c].x2;
        }
        if (this._settings.isExpandGridTransformType()) {
            if (this._grid.getGridX2() < b) d.css.set(this._grid.getGrid(), {
                width: b + 1 + "px"
            });
        } else if (this._settings.isFitGridTransformType()) {
            d.css.set(this._grid.getGrid(), {
                width: b + 1 + "px"
            });
        }
        this._eventEmitter.emitGridSizesChangeEvent(this._grid.getGrid(), b + 1, this._grid.getGridY2() + 1);
    };
    e.HorizontalGrid.Appender = function(a, b, c, d, f, g, h, i, j) {
        var k = this;
        this._gridifier = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._guid = null;
        this._renderer = null;
        this._normalizer = null;
        this._operation = null;
        this._connectors = null;
        this._connections = null;
        this._connectorsCleaner = null;
        this._connectorsShifter = null;
        this._connectorsSelector = null;
        this._connectorsSorter = null;
        this._itemCoordsExtractor = null;
        this._connectionsIntersector = null;
        this._css = {};
        this._construct = function() {
            k._gridifier = a;
            k._settings = b;
            k._sizesResolverManager = c;
            k._guid = g;
            k._renderer = h;
            k._normalizer = i;
            k._operation = j;
            k._connectors = d;
            k._connections = f;
            k._connectorsCleaner = new e.HorizontalGrid.ConnectorsCleaner(k._connectors, k._connections, k._settings);
            k._connectorsShifter = new e.ConnectorsShifter(k._gridifier, k._connections, k._settings);
            k._connectorsSelector = new e.HorizontalGrid.ConnectorsSelector(k._guid);
            k._connectorsSorter = new e.HorizontalGrid.ConnectorsSorter();
            k._itemCoordsExtractor = new e.HorizontalGrid.ItemCoordsExtractor(k._gridifier, k._sizesResolverManager);
            k._connectionsIntersector = new e.HorizontalGrid.ConnectionsIntersector(k._connections);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            k._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.Appender.prototype.append = function(a) {
        this._initConnectors();
        var b = this._createConnectionPerItem(a);
        this._connections.attachConnectionToRanges(b);
        this._connectorsCleaner.deleteAllTooLeftConnectorsFromMostRightConnector();
        this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
        if (this._settings.isDefaultIntersectionStrategy()) this._renderer.showConnections(b); else if (this._settings.isNoIntersectionsStrategy()) {
            var c = this._connections.getLastColHorizontallyExpandedConnections();
            for (var d = 0; d < c.length; d++) {
                if (c[d].itemGUID == b.itemGUID) {
                    c.splice(d, 1);
                    d--;
                }
            }
            this._renderer.renderConnectionsAfterDelay(c);
            this._renderer.showConnections(b);
        }
    };
    e.HorizontalGrid.Appender.prototype._initConnectors = function() {
        if (this._operation.isInitialOperation(e.OPERATIONS.APPEND)) {
            this.createInitialConnector();
            return;
        }
        if (!this._operation.isCurrentOperationSameAsPrevious(e.OPERATIONS.APPEND)) {
            this.recreateConnectorsPerAllConnectedItems();
            this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
            this._connectorsCleaner.deleteAllTooLeftConnectorsFromMostRightConnector();
        }
    };
    e.HorizontalGrid.Appender.prototype.createInitialConnector = function() {
        this._connectors.addAppendConnector(e.Connectors.SIDES.RIGHT.TOP, 0, 0);
    };
    e.HorizontalGrid.Appender.prototype.recreateConnectorsPerAllConnectedItems = function(a) {
        var a = a || false;
        if (!a) this._connectors.flush();
        var b = this._connections.get();
        for (var c = 0; c < b.length; c++) {
            this._addItemConnectors(b[c], b[c].itemGUID);
        }
        if (this._connectors.count() == 0) this.createInitialConnector();
    };
    e.HorizontalGrid.Appender.prototype._addItemConnectors = function(a, b) {
        if (a.y2 + 1 <= this._gridifier.getGridY2()) {
            this._connectors.addAppendConnector(e.Connectors.SIDES.BOTTOM.LEFT, parseFloat(a.x1), parseFloat(a.y2 + 1), d.toInt(b));
        }
        this._connectors.addAppendConnector(e.Connectors.SIDES.RIGHT.TOP, parseFloat(a.x2 + 1), parseFloat(a.y1), d.toInt(b));
    };
    e.HorizontalGrid.Appender.prototype._createConnectionPerItem = function(a) {
        var b = this._filterConnectorsPerNextConnection();
        var c = this._findItemConnectionCoords(a, b);
        var d = this._connections.add(a, c);
        if (this._settings.isNoIntersectionsStrategy()) {
            this._connections.expandHorizontallyAllColConnectionsToMostWide(d);
        }
        this._addItemConnectors(c, this._guid.getItemGUID(a));
        return d;
    };
    e.HorizontalGrid.Appender.prototype._filterConnectorsPerNextConnection = function() {
        var a = this._connectors.getClone();
        this._connectorsSelector.attachConnectors(a);
        this._connectorsSelector.selectOnlySpecifiedSideConnectorsOnPrependedItems(e.Connectors.SIDES.RIGHT.TOP);
        a = this._connectorsSelector.getSelectedConnectors();
        if (this._settings.isDefaultIntersectionStrategy()) {
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllConnectors();
            a = this._connectorsShifter.getAllConnectors();
        } else if (this._settings.isNoIntersectionsStrategy()) {
            var b = e.Connectors.SIDES.RIGHT.TOP;
            this._connectorsSelector.attachConnectors(a);
            this._connectorsSelector.selectOnlyMostRightConnectorFromSide(b);
            a = this._connectorsSelector.getSelectedConnectors();
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllWithSpecifiedSideToTopGridCorner(b);
            a = this._connectorsShifter.getAllConnectors();
        }
        this._connectorsSorter.attachConnectors(a);
        this._connectorsSorter.sortConnectorsForAppend(e.APPEND_TYPES.DEFAULT_APPEND);
        return this._connectorsSorter.getConnectors();
    };
    e.HorizontalGrid.Appender.prototype._findItemConnectionCoords = function(a, b) {
        var c = null;
        for (var d = 0; d < b.length; d++) {
            var f = this._itemCoordsExtractor.connectorToAppendedItemCoords(a, b[d]);
            if (f.y2 > this._normalizer.normalizeHighRounding(this._gridifier.getGridY2())) {
                continue;
            }
            var g = this._connectionsIntersector.findAllMaybeIntersectableConnectionsOnAppend(b[d]);
            if (this._connectionsIntersector.isIntersectingAnyConnection(g, f)) {
                continue;
            }
            c = f;
            var h = this._connections.getAllConnectionsBehindX(f.x2);
            if (this._connections.isAnyConnectionItemGUIDSmallerThan(h, a)) {
                continue;
            }
            if (this._settings.isNoIntersectionsStrategy()) {
                if (this._connections.isIntersectingMoreThanOneConnectionItemHorizontally(c)) {
                    c = null;
                }
            }
            if (c != null) {
                break;
            }
        }
        if (c == null) {
            var i = e.Error.ERROR_TYPES.INSERTER.TOO_TALL_ITEM_ON_HORIZONTAL_GRID_INSERT;
            new e.Error(i, a);
        }
        return c;
    };
    e.HorizontalGrid.ItemCoordsExtractor = function(a, b) {
        var c = this;
        this._gridifier = null;
        this._sizesResolverManager = null;
        this._transformedItemMarker = null;
        this._css = {};
        this._construct = function() {
            c._gridifier = a;
            c._sizesResolverManager = b;
            c._transformedItemMarker = new e.SizesTransformer.TransformedItemMarker();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ItemCoordsExtractor.prototype._getItemSizesPerAppend = function(a) {
        if (this._transformedItemMarker.isTransformedItem(a)) {
            var b = this._transformedItemMarker.getTransformedItemTargetPxSizes(a);
            return {
                targetWidth: parseFloat(b.targetPxWidth),
                targetHeight: parseFloat(b.targetPxHeight)
            };
        } else {
            return {
                targetWidth: this._sizesResolverManager.outerWidth(a, true),
                targetHeight: this._sizesResolverManager.outerHeight(a, true)
            };
        }
    };
    e.HorizontalGrid.ItemCoordsExtractor.prototype.getItemTargetSizes = function(a) {
        return this._getItemSizesPerAppend(a);
    };
    e.HorizontalGrid.ItemCoordsExtractor.prototype.connectorToAppendedItemCoords = function(a, b) {
        var c = this._getItemSizesPerAppend(a);
        return {
            x1: parseFloat(b.x),
            x2: parseFloat(b.x + c.targetWidth - 1),
            y1: parseFloat(b.y),
            y2: parseFloat(b.y + c.targetHeight - 1)
        };
    };
    e.HorizontalGrid.ItemCoordsExtractor.prototype.connectorToReversedAppendedItemCoords = function(a, b) {
        var c = this._getItemSizesPerAppend(a);
        return {
            x1: parseFloat(b.x),
            x2: parseFloat(b.x + c.targetWidth - 1),
            y1: parseFloat(b.y - c.targetHeight + 1),
            y2: parseFloat(b.y)
        };
    };
    e.HorizontalGrid.ItemCoordsExtractor.prototype.connectorToPrependedItemCoords = function(a, b) {
        var c = this._getItemSizesPerAppend(a);
        return {
            x1: parseFloat(b.x - c.targetWidth + 1),
            x2: parseFloat(b.x),
            y1: parseFloat(b.y - c.targetHeight + 1),
            y2: parseFloat(b.y)
        };
    };
    e.HorizontalGrid.ItemCoordsExtractor.prototype.connectorToReversedPrependedItemCoords = function(a, b) {
        var c = this._getItemSizesPerAppend(a);
        return {
            x1: parseFloat(b.x - c.targetWidth + 1),
            x2: parseFloat(b.x),
            y1: parseFloat(b.y),
            y2: parseFloat(b.y + c.targetHeight - 1)
        };
    };
    e.HorizontalGrid.Prepender = function(a, b, c, d, f, g, h, i, j) {
        var k = this;
        this._gridifier = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._guid = null;
        this._renderer = null;
        this._normalizer = null;
        this._operation = null;
        this._connectors = null;
        this._connections = null;
        this._connectorsCleaner = null;
        this._connectorsShifter = null;
        this._connectorsSelector = null;
        this._connectorsSorter = null;
        this._itemCoordsExtractor = null;
        this._connectionsIntersector = null;
        this._css = {};
        this._construct = function() {
            k._gridifier = a;
            k._settings = b;
            k._sizesResolverManager = c;
            k._guid = g;
            k._renderer = h;
            k._normalizer = i;
            k._operation = j;
            k._connectors = d;
            k._connections = f;
            k._connectorsCleaner = new e.HorizontalGrid.ConnectorsCleaner(k._connectors, k._connections, k._settings);
            k._connectorsShifter = new e.ConnectorsShifter(k._gridifier, k._connections, k._settings);
            k._connectorsSelector = new e.HorizontalGrid.ConnectorsSelector(k._guid);
            k._connectorsSorter = new e.HorizontalGrid.ConnectorsSorter();
            k._itemCoordsExtractor = new e.HorizontalGrid.ItemCoordsExtractor(k._gridifier, k._sizesResolverManager);
            k._connectionsIntersector = new e.HorizontalGrid.ConnectionsIntersector(k._connections);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            k._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.Prepender.prototype.prepend = function(a) {
        this._initConnectors();
        var b = this._createConnectionPerItem(a);
        var c = this._connections.normalizeHorizontalPositionsOfAllConnectionsAfterPrepend(b, this._connectors.get());
        this._connections.attachConnectionToRanges(b);
        this._connectorsCleaner.deleteAllTooRightConnectorsFromMostLeftConnector();
        this._connectorsCleaner.deleteAllIntersectedFromLeftConnectors();
        if (c) {
            this._renderer.renderConnections(this._connections.get(), [ b ]);
        }
        if (this._settings.isDefaultIntersectionStrategy()) this._renderer.showConnections(b); else if (this._settings.isNoIntersectionsStrategy()) {
            var d = this._connections.getLastColHorizontallyExpandedConnections();
            for (var e = 0; e < d.length; e++) {
                if (d[e].itemGUID == b.itemGUID) {
                    d.splice(e, 1);
                    e--;
                }
            }
            this._renderer.renderConnectionsAfterDelay(d);
            this._renderer.showConnections(b);
        }
    };
    e.HorizontalGrid.Prepender.prototype._initConnectors = function() {
        if (this._operation.isInitialOperation(e.OPERATIONS.PREPEND)) {
            this.createInitialConnector();
            return;
        }
        if (!this._operation.isCurrentOperationSameAsPrevious(e.OPERATIONS.PREPEND)) {
            this.recreateConnectorsPerAllConnectedItems();
            this._connectorsCleaner.deleteAllIntersectedFromLeftConnectors();
            this._connectorsCleaner.deleteAllTooRightConnectorsFromMostLeftConnector();
        }
    };
    e.HorizontalGrid.Prepender.prototype.createInitialConnector = function() {
        this._connectors.addPrependConnector(e.Connectors.SIDES.TOP.RIGHT, 0, this._gridifier.getGridY2());
    };
    e.HorizontalGrid.Prepender.prototype.recreateConnectorsPerAllConnectedItems = function(a) {
        var a = a || false;
        if (!a) this._connectors.flush();
        var b = this._connections.get();
        for (var c = 0; c < b.length; c++) {
            this._addItemConnectors(b[c], b[c].itemGUID);
        }
        if (this._connectors.count() == 0) this.createInitialConnector();
    };
    e.HorizontalGrid.Prepender.prototype._addItemConnectors = function(a, b) {
        if (a.y1 - 1 >= 0) {
            this._connectors.addPrependConnector(e.Connectors.SIDES.TOP.RIGHT, parseFloat(a.x2), parseFloat(a.y1 - 1), d.toInt(b));
        }
        this._connectors.addPrependConnector(e.Connectors.SIDES.LEFT.BOTTOM, parseFloat(a.x1 - 1), parseFloat(a.y2), d.toInt(b));
    };
    e.HorizontalGrid.Prepender.prototype._createConnectionPerItem = function(a) {
        var b = this._filterConnectorsPerNextConnection();
        var c = this._findItemConnectionCoords(a, b);
        var d = this._connections.add(a, c);
        if (this._settings.isNoIntersectionsStrategy()) {
            this._connections.expandHorizontallyAllColConnectionsToMostWide(d);
        }
        this._addItemConnectors(c, this._guid.getItemGUID(a));
        this._guid.markAsPrependedItem(a);
        return d;
    };
    e.HorizontalGrid.Prepender.prototype._filterConnectorsPerNextConnection = function() {
        var a = this._connectors.getClone();
        this._connectorsSelector.attachConnectors(a);
        this._connectorsSelector.selectOnlySpecifiedSideConnectorsOnAppendedItems(e.Connectors.SIDES.LEFT.BOTTOM);
        a = this._connectorsSelector.getSelectedConnectors();
        if (this._settings.isDefaultIntersectionStrategy()) {
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllConnectors();
            a = this._connectorsShifter.getAllConnectors();
        } else if (this._settings.isNoIntersectionsStrategy()) {
            var b = e.Connectors.SIDES.LEFT.BOTTOM;
            this._connectorsSelector.attachConnectors(a);
            this._connectorsSelector.selectOnlyMostLeftConnectorFromSide(b);
            a = this._connectorsSelector.getSelectedConnectors();
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllWithSpecifiedSideToBottomGridCorner(b);
            a = this._connectorsShifter.getAllConnectors();
        }
        this._connectorsSorter.attachConnectors(a);
        this._connectorsSorter.sortConnectorsForPrepend(e.PREPEND_TYPES.DEFAULT_PREPEND);
        return this._connectorsSorter.getConnectors();
    };
    e.HorizontalGrid.Prepender.prototype._findItemConnectionCoords = function(a, b) {
        var c = null;
        for (var d = 0; d < b.length; d++) {
            var f = this._itemCoordsExtractor.connectorToPrependedItemCoords(a, b[d]);
            if (f.y1 < this._normalizer.normalizeLowRounding(0)) {
                continue;
            }
            var g = this._connectionsIntersector.findAllMaybeIntersectableConnectionsOnPrepend(b[d]);
            if (this._connectionsIntersector.isIntersectingAnyConnection(g, f)) {
                continue;
            }
            c = f;
            var h = this._connections.getAllConnectionsBeforeX(f.x1);
            if (this._connections.isAnyConnectionItemGUIDBiggerThan(h, a)) {
                continue;
            }
            if (this._settings.isNoIntersectionsStrategy()) {
                if (this._connections.isIntersectingMoreThanOneConnectionItemHorizontally(c)) {
                    c = null;
                }
            }
            if (c != null) {
                break;
            }
        }
        if (c == null) {
            var i = e.Error.ERROR_TYPES.INSERTER.TOO_TALL_ITEM_ON_HORIZONTAL_GRID_INSERT;
            new e.Error(i, a);
        }
        return c;
    };
    e.HorizontalGrid.ReversedAppender = function(a, b, c, d, f, g, h, i, j) {
        var k = this;
        this._gridifier = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._guid = null;
        this._renderer = null;
        this._normalizer = null;
        this._operation = null;
        this._connectors = null;
        this._connections = null;
        this._connectorsCleaner = null;
        this._connectorsShifter = null;
        this._connectorsSelector = null;
        this._connectorsSorter = null;
        this._itemCoordsExtractor = null;
        this._connectionsIntersector = null;
        this._css = {};
        this._construct = function() {
            k._gridifier = a;
            k._settings = b;
            k._sizesResolverManager = c;
            k._guid = g;
            k._renderer = h;
            k._normalizer = i;
            k._operation = j;
            k._connectors = d;
            k._connections = f;
            k._connectorsCleaner = new e.HorizontalGrid.ConnectorsCleaner(k._connectors, k._connections, k._settings);
            k._connectorsShifter = new e.ConnectorsShifter(k._gridifier, k._connections, k._settings);
            k._connectorsSelector = new e.HorizontalGrid.ConnectorsSelector(k._guid);
            k._connectorsSorter = new e.HorizontalGrid.ConnectorsSorter();
            k._itemCoordsExtractor = new e.HorizontalGrid.ItemCoordsExtractor(k._gridifier, k._sizesResolverManager);
            k._connectionsIntersector = new e.HorizontalGrid.ConnectionsIntersector(k._connections);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            k._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ReversedAppender.prototype.reversedAppend = function(a) {
        this._initConnectors();
        var b = this._createConnectionPerItem(a);
        this._connections.attachConnectionToRanges(b);
        this._connectorsCleaner.deleteAllTooLeftConnectorsFromMostRightConnector();
        this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
        if (this._settings.isDefaultIntersectionStrategy()) this._renderer.showConnections(b); else if (this._settings.isNoIntersectionsStrategy()) {
            var c = this._connections.getLastColHorizontallyExpandedConnections();
            for (var d = 0; d < c.length; d++) {
                if (c[d].itemGUID == b.itemGUID) {
                    c.splice(d, 1);
                    d--;
                }
            }
            this._renderer.renderConnectionsAfterDelay(c);
            this._renderer.showConnections(b);
        }
    };
    e.HorizontalGrid.ReversedAppender.prototype._initConnectors = function() {
        if (this._operation.isInitialOperation(e.OPERATIONS.REVERSED_APPEND)) {
            this.createInitialConnector();
            return;
        }
        if (!this._operation.isCurrentOperationSameAsPrevious(e.OPERATIONS.REVERSED_APPEND)) {
            this.recreateConnectorsPerAllConnectedItems();
            this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
            this._connectorsCleaner.deleteAllTooLeftConnectorsFromMostRightConnector();
        }
    };
    e.HorizontalGrid.ReversedAppender.prototype.createInitialConnector = function() {
        this._connectors.addAppendConnector(e.Connectors.SIDES.TOP.LEFT, 0, parseFloat(this._gridifier.getGridY2()));
    };
    e.HorizontalGrid.ReversedAppender.prototype.recreateConnectorsPerAllConnectedItems = function(a) {
        var a = a || false;
        if (!a) this._connectors.flush();
        var b = this._connections.get();
        for (var c = 0; c < b.length; c++) {
            this._addItemConnectors(b[c], b[c].itemGUID);
        }
        if (this._connectors.count() == 0) this.createInitialConnector();
    };
    e.HorizontalGrid.ReversedAppender.prototype._addItemConnectors = function(a, b) {
        if (a.y1 - 1 >= 0) {
            this._connectors.addAppendConnector(e.Connectors.SIDES.TOP.LEFT, parseFloat(a.x1), parseFloat(a.y1 - 1), d.toInt(b));
        }
        this._connectors.addAppendConnector(e.Connectors.SIDES.RIGHT.BOTTOM, parseFloat(a.x2 + 1), parseFloat(a.y2), d.toInt(b));
    };
    e.HorizontalGrid.ReversedAppender.prototype._createConnectionPerItem = function(a) {
        var b = this._filterConnectorsPerNextConnection();
        var c = this._findItemConnectionCoords(a, b);
        var d = this._connections.add(a, c);
        if (this._settings.isNoIntersectionsStrategy()) {
            this._connections.expandHorizontallyAllColConnectionsToMostWide(d);
        }
        this._addItemConnectors(c, this._guid.getItemGUID(a));
        return d;
    };
    e.HorizontalGrid.ReversedAppender.prototype._filterConnectorsPerNextConnection = function() {
        var a = this._connectors.getClone();
        this._connectorsSelector.attachConnectors(a);
        this._connectorsSelector.selectOnlySpecifiedSideConnectorsOnPrependedItems(e.Connectors.SIDES.RIGHT.BOTTOM);
        a = this._connectorsSelector.getSelectedConnectors();
        if (this._settings.isDefaultIntersectionStrategy()) {
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllConnectors();
            a = this._connectorsShifter.getAllConnectors();
        } else if (this._settings.isNoIntersectionsStrategy()) {
            var b = e.Connectors.SIDES.RIGHT.BOTTOM;
            this._connectorsSelector.attachConnectors(a);
            this._connectorsSelector.selectOnlyMostRightConnectorFromSide(b);
            a = this._connectorsSelector.getSelectedConnectors();
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllWithSpecifiedSideToBottomGridCorner(b);
            a = this._connectorsShifter.getAllConnectors();
        }
        this._connectorsSorter.attachConnectors(a);
        this._connectorsSorter.sortConnectorsForAppend(e.APPEND_TYPES.REVERSED_APPEND);
        return this._connectorsSorter.getConnectors();
    };
    e.HorizontalGrid.ReversedAppender.prototype._findItemConnectionCoords = function(a, b) {
        var c = null;
        for (var d = 0; d < b.length; d++) {
            var f = this._itemCoordsExtractor.connectorToReversedAppendedItemCoords(a, b[d]);
            if (f.y1 < this._normalizer.normalizeLowRounding(0)) {
                continue;
            }
            var g = this._connectionsIntersector.findAllMaybeIntersectableConnectionsOnAppend(b[d]);
            if (this._connectionsIntersector.isIntersectingAnyConnection(g, f)) {
                continue;
            }
            c = f;
            var h = this._connections.getAllConnectionsBehindX(f.x2);
            if (this._connections.isAnyConnectionItemGUIDSmallerThan(h, a)) {
                continue;
            }
            if (this._settings.isNoIntersectionsStrategy()) {
                if (this._connections.isIntersectingMoreThanOneConnectionItemHorizontally(c)) {
                    c = null;
                }
            }
            if (c != null) {
                break;
            }
        }
        if (c == null) {
            var i = e.Error.ERROR_TYPES.INSERTER.TOO_TALL_ITEM_ON_HORIZONTAL_GRID_INSERT;
            new e.Error(i, a);
        }
        return c;
    };
    e.HorizontalGrid.ReversedPrepender = function(a, b, c, d, f, g, h, i, j) {
        var k = this;
        this._gridifier = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._guid = null;
        this._renderer = null;
        this._normalizer = null;
        this._operation = null;
        this._connectors = null;
        this._connections = null;
        this._connectorsCleaner = null;
        this._connectorsShifter = null;
        this._connectorsSelector = null;
        this._connectorsSorter = null;
        this._itemCoordsExtractor = null;
        this._connectionsIntersector = null;
        this._css = {};
        this._construct = function() {
            k._gridifier = a;
            k._settings = b;
            k._sizesResolverManager = c;
            k._guid = g;
            k._renderer = h;
            k._normalizer = i;
            k._operation = j;
            k._connectors = d;
            k._connections = f;
            k._connectorsCleaner = new e.HorizontalGrid.ConnectorsCleaner(k._connectors, k._connections, k._settings);
            k._connectorsShifter = new e.ConnectorsShifter(k._gridifier, k._connections, k._settings);
            k._connectorsSelector = new e.HorizontalGrid.ConnectorsSelector(k._guid);
            k._connectorsSorter = new e.HorizontalGrid.ConnectorsSorter();
            k._itemCoordsExtractor = new e.HorizontalGrid.ItemCoordsExtractor(k._gridifier, k._sizesResolverManager);
            k._connectionsIntersector = new e.HorizontalGrid.ConnectionsIntersector(k._connections);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            k._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ReversedPrepender.prototype.reversedPrepend = function(a) {
        this._initConnectors();
        var b = this._createConnectionPerItem(a);
        var c = this._connections.normalizeHorizontalPositionsOfAllConnectionsAfterPrepend(b, this._connectors.get());
        this._connections.attachConnectionToRanges(b);
        this._connectorsCleaner.deleteAllTooRightConnectorsFromMostLeftConnector();
        this._connectorsCleaner.deleteAllIntersectedFromLeftConnectors();
        if (c) {
            this._renderer.renderConnections(this._connections.get(), [ b ]);
        }
        if (this._settings.isDefaultIntersectionStrategy()) this._renderer.showConnections(b); else if (this._settings.isNoIntersectionsStrategy()) {
            var d = this._connections.getLastColHorizontallyExpandedConnections();
            for (var e = 0; e < d.length; e++) {
                if (d[e].itemGUID == b.itemGUID) {
                    d.splice(e, 1);
                    e--;
                }
            }
            this._renderer.renderConnectionsAfterDelay(d);
            this._renderer.showConnections(b);
        }
    };
    e.HorizontalGrid.ReversedPrepender.prototype._initConnectors = function() {
        if (this._operation.isInitialOperation(e.OPERATIONS.REVERSED_PREPEND)) {
            this.createInitialConnector();
            return;
        }
        if (!this._operation.isCurrentOperationSameAsPrevious(e.OPERATIONS.REVERSED_PREPEND)) {
            this.recreateConnectorsPerAllConnectedItems();
            this._connectorsCleaner.deleteAllIntersectedFromLeftConnectors();
            this._connectorsCleaner.deleteAllTooRightConnectorsFromMostLeftConnector();
        }
    };
    e.HorizontalGrid.ReversedPrepender.prototype.createInitialConnector = function() {
        this._connectors.addPrependConnector(e.Connectors.SIDES.LEFT.TOP, 0, 0);
    };
    e.HorizontalGrid.ReversedPrepender.prototype.recreateConnectorsPerAllConnectedItems = function(a) {
        var a = a || false;
        if (!a) this._connectors.flush();
        var b = this._connections.get();
        for (var c = 0; c < b.length; c++) {
            this._addItemConnectors(b[c], b[c].itemGUID);
        }
        if (this._connectors.count() == 0) this.createInitialConnector();
    };
    e.HorizontalGrid.ReversedPrepender.prototype._addItemConnectors = function(a, b) {
        if (a.y2 + 1 <= this._gridifier.getGridY2()) {
            this._connectors.addPrependConnector(e.Connectors.SIDES.BOTTOM.RIGHT, parseFloat(a.x2), parseFloat(a.y2 + 1), d.toInt(b));
        }
        this._connectors.addPrependConnector(e.Connectors.SIDES.LEFT.TOP, parseFloat(a.x1 - 1), parseFloat(a.y1), d.toInt(b));
    };
    e.HorizontalGrid.ReversedPrepender.prototype._createConnectionPerItem = function(a) {
        var b = this._filterConnectorsPerNextConnection();
        var c = this._findItemConnectionCoords(a, b);
        var d = this._connections.add(a, c);
        if (this._settings.isNoIntersectionsStrategy()) {
            this._connections.expandHorizontallyAllColConnectionsToMostWide(d);
        }
        this._addItemConnectors(c, this._guid.getItemGUID(a));
        this._guid.markAsPrependedItem(a);
        return d;
    };
    e.HorizontalGrid.ReversedPrepender.prototype._filterConnectorsPerNextConnection = function() {
        var a = this._connectors.getClone();
        this._connectorsSelector.attachConnectors(a);
        this._connectorsSelector.selectOnlySpecifiedSideConnectorsOnAppendedItems(e.Connectors.SIDES.LEFT.TOP);
        a = this._connectorsSelector.getSelectedConnectors();
        if (this._settings.isDefaultIntersectionStrategy()) {
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllConnectors();
            a = this._connectorsShifter.getAllConnectors();
        } else if (this._settings.isNoIntersectionsStrategy()) {
            var b = e.Connectors.SIDES.LEFT.TOP;
            this._connectorsSelector.attachConnectors(a);
            this._connectorsSelector.selectOnlyMostLeftConnectorFromSide(b);
            a = this._connectorsSelector.getSelectedConnectors();
            this._connectorsShifter.attachConnectors(a);
            this._connectorsShifter.shiftAllWithSpecifiedSideToTopGridCorner(b);
            a = this._connectorsShifter.getAllConnectors();
        }
        this._connectorsSorter.attachConnectors(a);
        this._connectorsSorter.sortConnectorsForPrepend(e.PREPEND_TYPES.REVERSED_PREPEND);
        return this._connectorsSorter.getConnectors();
    };
    e.HorizontalGrid.ReversedPrepender.prototype._findItemConnectionCoords = function(a, b) {
        var c = null;
        for (var d = 0; d < b.length; d++) {
            var f = this._itemCoordsExtractor.connectorToReversedPrependedItemCoords(a, b[d]);
            if (f.y2 > this._normalizer.normalizeHighRounding(this._gridifier.getGridY2())) {
                continue;
            }
            var g = this._connectionsIntersector.findAllMaybeIntersectableConnectionsOnPrepend(b[d]);
            if (this._connectionsIntersector.isIntersectingAnyConnection(g, f)) {
                continue;
            }
            c = f;
            var h = this._connections.getAllConnectionsBeforeX(f.x1);
            if (this._connections.isAnyConnectionItemGUIDBiggerThan(h, a)) {
                continue;
            }
            if (this._settings.isNoIntersectionsStrategy()) {
                if (this._connections.isIntersectingMoreThanOneConnectionItemHorizontally(c)) {
                    c = null;
                }
            }
            if (c != null) {
                break;
            }
        }
        if (c == null) {
            var i = e.Error.ERROR_TYPES.INSERTER.TOO_TALL_ITEM_ON_HORIZONTAL_GRID_INSERT;
            new e.Error(i, a);
        }
        return c;
    };
    e.HorizontalGrid.Connections = function(a, b, c, d, f) {
        var g = this;
        this._gridifier = null;
        this._guid = null;
        this._settings = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._itemCoordsExtractor = null;
        this._sizesTransformer = null;
        this._connectionsCore = null;
        this._connectionsHorizontalIntersector = null;
        this._connections = [];
        this._ranges = null;
        this._sorter = null;
        this._css = {};
        this._construct = function() {
            g._gridifier = a;
            g._guid = b;
            g._settings = c;
            g._sizesResolverManager = d;
            g._eventEmitter = f;
            g._ranges = new e.HorizontalGrid.ConnectionsRanges(g);
            g._ranges.init();
            g._sorter = new e.HorizontalGrid.ConnectionsSorter(g, g._settings, g._guid);
            g._itemCoordsExtractor = new e.HorizontalGrid.ItemCoordsExtractor(g._gridifier, g._sizesResolverManager);
            g._connectionsCore = new e.Connections(g._gridifier, g, g._guid, g._sorter, g._sizesResolverManager);
            g._connectionsHorizontalIntersector = new e.HorizontalGrid.ConnectionsHorizontalIntersector(g, g._settings, g._itemCoordsExtractor);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            g._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.Connections.prototype.getConnectionsSorter = function() {
        return this._sorter;
    };
    e.HorizontalGrid.Connections.prototype.setSizesTransformerInstance = function(a) {
        this._sizesTransformer = a;
        this._connectionsCore.setSizesTransformerInstance(a);
    };
    e.HorizontalGrid.Connections.prototype.attachConnectionToRanges = function(a) {
        this._ranges.attachConnection(a, this._connections.length - 1);
    };
    e.HorizontalGrid.Connections.prototype.reinitRanges = function() {
        this._ranges.init();
    };
    e.HorizontalGrid.Connections.prototype.getAllVerticallyIntersectedAndLeftConnections = function(a) {
        return this._ranges.getAllConnectionsFromIntersectedAndLeftRanges(a.x);
    };
    e.HorizontalGrid.Connections.prototype.getAllVerticallyIntersectedConnections = function(a) {
        return this._ranges.getAllConnectionsFromIntersectedRange(a.x);
    };
    e.HorizontalGrid.Connections.prototype.getAllVerticallyIntersectedAndRightConnections = function(a) {
        return this._ranges.getAllConnectionsFromIntersectedAndRightRanges(a.x);
    };
    e.HorizontalGrid.Connections.prototype.mapAllIntersectedAndRightConnectionsPerEachConnector = function(a) {
        return this._ranges.mapAllIntersectedAndRightConnectionsPerEachConnector(a);
    };
    e.HorizontalGrid.Connections.prototype.mapAllIntersectedAndLeftConnectionsPerEachConnector = function(a) {
        return this._ranges.mapAllIntersectedAndLeftConnectionsPerEachConnector(a);
    };
    e.HorizontalGrid.Connections.prototype.getLastColHorizontallyExpandedConnections = function() {
        return this._connectionsHorizontalIntersector.getLastColHorizontallyExpandedConnections();
    };
    e.HorizontalGrid.Connections.prototype.get = function() {
        return this._connections;
    };
    e.HorizontalGrid.Connections.prototype.count = function() {
        return this._connections.length;
    };
    e.HorizontalGrid.Connections.prototype.restore = function(a) {
        this._connections = this._connections.concat(a);
    };
    e.HorizontalGrid.Connections.prototype.restoreOnCustomSortDispersionMode = function(a) {
        var b = this._sorter.sortConnectionsPerReappend(this._connections);
        var c = b[b.length - 1];
        if (this._settings.isDefaultAppend()) {
            var d = c.y2;
            var e = c.x1;
            var f = d + 1;
            for (var g = 0; g < a.length; g++) {
                a[g].x1 = e;
                a[g].x2 = e;
                a[g].y1 = f;
                a[g].y2 = f;
                f++;
            }
        } else if (this._settings.isReversedAppend()) {
            var h = c.y1;
            var e = c.x1;
            var f = h - 1;
            for (var g = 0; g < a.length; g++) {
                a[g].x1 = e;
                a[g].x2 = e;
                a[g].y1 = f;
                a[g].y2 = f;
                f--;
            }
        }
        this.restore(a);
    };
    e.HorizontalGrid.Connections.prototype.getMaxX2 = function() {
        return this._connectionsCore.getMaxX2();
    };
    e.HorizontalGrid.Connections.prototype.getMaxY2 = function() {
        return this._connectionsCore.getMaxY2();
    };
    e.HorizontalGrid.Connections.prototype.findConnectionByItem = function(a, b) {
        var b = b || false;
        return this._connectionsCore.findConnectionByItem(a, b);
    };
    e.HorizontalGrid.Connections.prototype.remapAllItemGUIDS = function() {
        this._connectionsCore.remapAllItemGUIDS();
    };
    e.HorizontalGrid.Connections.prototype.remapAllItemGUIDSInSortedConnections = function(a) {
        this._connectionsCore.remapAllItemGUIDSInSortedConnections(a);
    };
    e.HorizontalGrid.Connections.prototype.add = function(a, b) {
        var c = this._connectionsCore.createItemConnection(a, b);
        this._connections.push(c);
        this._eventEmitter.emitConnectionCreateEvent(this);
        return c;
    };
    e.HorizontalGrid.Connections.prototype.removeConnection = function(a) {
        for (var b = 0; b < this._connections.length; b++) {
            if (this._guid.getItemGUID(a.item) == this._guid.getItemGUID(this._connections[b].item)) {
                this._connections.splice(b, 1);
                return;
            }
        }
    };
    e.HorizontalGrid.Connections.prototype.getConnectionsByItemGUIDS = function(a) {
        return this._connectionsCore.getConnectionsByItemGUIDS(a);
    };
    e.HorizontalGrid.Connections.prototype.syncConnectionParams = function(a) {
        this._connectionsCore.syncConnectionParams(a);
    };
    e.HorizontalGrid.Connections.prototype.getMinConnectionWidth = function() {
        return this._connectionsCore.getMinConnectionWidth();
    };
    e.HorizontalGrid.Connections.prototype.getMinConnectionHeight = function() {
        return this._connectionsCore.getMinConnectionHeight();
    };
    e.HorizontalGrid.Connections.prototype.isAnyConnectionItemGUIDSmallerThan = function(a, b) {
        return this._connectionsCore.isAnyConnectionItemGUIDSmallerThan(a, b);
    };
    e.HorizontalGrid.Connections.prototype.isAnyConnectionItemGUIDBiggerThan = function(a, b) {
        return this._connectionsCore.isAnyConnectionItemGUIDBiggerThan(a, b);
    };
    e.HorizontalGrid.Connections.prototype.getAllConnectionsBehindX = function(a) {
        var b = [];
        for (var c = 0; c < this._connections.length; c++) {
            if (this._settings.isDisabledSortDispersion()) {
                if (this._connections[c].x1 > a) b.push(this._connections[c]);
            } else if (this._settings.isCustomSortDispersion()) {
                var d = this._settings.getSortDispersionValue();
                if (this._connections[c].x1 - d > a) b.push(this._connections[c]);
            } else if (this._settings.isCustomAllEmptySpaceSortDispersion()) {
            }
        }
        return b;
    };
    e.HorizontalGrid.Connections.prototype.getAllConnectionsBeforeX = function(a) {
        var b = [];
        for (var c = 0; c < this._connections.length; c++) {
            if (this._settings.isDisabledSortDispersion()) {
                if (this._connections[c].x2 < a) b.push(this._connections[c]);
            } else if (this._settings.isCustomSortDispersion()) {
                var d = this._settings.getSortDispersionValue();
                if (this._connections[c].x2 + d < a) b.push(this._connections[c]);
            } else if (this._settings.isCustomAllEmptySpaceSortDispersion()) {
            }
        }
        return b;
    };
    e.HorizontalGrid.Connections.prototype.getMaxYFromAllConnections = function() {
        var a = 0;
        for (var b = 0; b < this._connections.length; b++) {
            if (this._connections[b].y2 > a) a = this._connections[b].y2;
        }
        return a;
    };
    e.HorizontalGrid.Connections.prototype.isIntersectingMoreThanOneConnectionItemHorizontally = function(a) {
        return this._connectionsHorizontalIntersector.isIntersectingMoreThanOneConnectionItemHorizontally(a);
    };
    e.HorizontalGrid.Connections.prototype.getMostWideFromAllHorizontallyIntersectedConnections = function(a) {
        return this._connectionsHorizontalIntersector.getMostWideFromAllHorizontallyIntersectedConnections(a);
    };
    e.HorizontalGrid.Connections.prototype.getAllHorizontallyIntersectedConnections = function(a) {
        return this._connectionsHorizontalIntersector.getAllHorizontallyIntersectedConnections(a);
    };
    e.HorizontalGrid.Connections.prototype.expandHorizontallyAllColConnectionsToMostWide = function(a) {
        this._connectionsHorizontalIntersector.expandHorizontallyAllColConnectionsToMostWide(a);
    };
    e.HorizontalGrid.Connections.prototype.normalizeHorizontalPositionsOfAllConnectionsAfterPrepend = function(a, b) {
        if (a.x1 >= 0) return false;
        var c = Math.round(Math.abs(a.x1));
        a.x2 = Math.abs(a.x1 - a.x2);
        a.x1 = 0;
        for (var d = 0; d < this._connections.length; d++) {
            if (a.itemGUID == this._connections[d].itemGUID) continue;
            this._connections[d].x1 += c;
            this._connections[d].x2 += c;
        }
        for (var d = 0; d < b.length; d++) b[d].x += c;
        this._ranges.shiftAllRangesBy(c);
        this._ranges.createPrependedRange(a.x1, a.x2);
        return true;
    };
    e.HorizontalGrid.ConnectionsHorizontalIntersector = function(a, b, c) {
        var d = this;
        this._connections = null;
        this._settings = null;
        this._itemCoordsExtractor = null;
        this._lastColHorizontallyExpandedConnections = [];
        this._css = {};
        this._construct = function() {
            d._connections = a;
            d._settings = b;
            d._itemCoordsExtractor = c;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectionsHorizontalIntersector.prototype.getLastColHorizontallyExpandedConnections = function() {
        return this._lastColHorizontallyExpandedConnections;
    };
    e.HorizontalGrid.ConnectionsHorizontalIntersector.prototype.isIntersectingMoreThanOneConnectionItemHorizontally = function(a) {
        var b = this;
        var c = this._connections.get();
        var d = [];
        var e = function(a) {
            if (d.length == 0) return false;
            for (var b = 0; b < d.length; b++) {
                var e = c[d[b]];
                var f = e.x1;
                var g = e.x2;
                e.x1 = Math.ceil(e.x1);
                e.x2 = Math.floor(e.x2);
                var h = a.x1 < e.x1 && a.x2 < e.x1;
                var i = a.x1 > e.x2 && a.x2 > e.x2;
                e.x1 = f;
                e.x2 = g;
                if (!h && !i) return true;
            }
            return false;
        };
        var f = 0;
        for (var g = 0; g < c.length; g++) {
            var h = c[g];
            var i = a.x1 < h.x1 && a.x2 < h.x1;
            var j = a.x1 > h.x2 && a.x2 > h.x2;
            if (!i && !j && !e(h)) {
                d.push(g);
                f++;
            }
        }
        return f > 1;
    };
    e.HorizontalGrid.ConnectionsHorizontalIntersector.prototype.getMostWideFromAllHorizontallyIntersectedConnections = function(a) {
        var b = this;
        var c = this._connections.get();
        var d = null;
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            var g = a.x1 < f.x1 && a.x2 < f.x1;
            var h = a.x1 > f.x2 && a.x2 > f.x2;
            if (!g && !h) {
                if (d == null) d = f; else {
                    var i = Math.abs(f.x2 - f.x1);
                    var j = Math.abs(d.x2 - d.x1);
                    if (i > j) d = f;
                }
            }
        }
        return d;
    };
    e.HorizontalGrid.ConnectionsHorizontalIntersector.prototype.getAllHorizontallyIntersectedConnections = function(a) {
        var b = this;
        var c = this._connections.get();
        var d = [];
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            var g = a.x1 < f.x1 && a.x2 < f.x1;
            var h = a.x1 > f.x2 && a.x2 > f.x2;
            if (!g && !h) d.push(f);
        }
        return d;
    };
    e.HorizontalGrid.ConnectionsHorizontalIntersector.prototype.expandHorizontallyAllColConnectionsToMostWide = function(a) {
        var b = this.getMostWideFromAllHorizontallyIntersectedConnections(a);
        if (b == null) return;
        var c = this.getAllHorizontallyIntersectedConnections(a);
        var d = [];
        for (var e = 0; e < c.length; e++) {
            c[e].x1 = b.x1;
            c[e].x2 = b.x2;
            if (this._settings.isHorizontalGridLeftAlignmentType()) {
                if (c[e].horizontalOffset != 0) d.push(c[e]);
                c[e].horizontalOffset = 0;
            } else if (this._settings.isHorizontalGridCenterAlignmentType()) {
                var f = c[e].x1;
                var g = c[e].x2;
                var h = this._itemCoordsExtractor.getItemTargetSizes(c[e].item);
                var i = h.targetWidth;
                var j = Math.abs(g - f + 1) / 2 - i / 2;
                if (c[e].horizontalOffset != j) {
                    c[e].horizontalOffset = j;
                    d.push(c[e]);
                }
            } else if (this._settings.isHorizontalGridRightAlignmentType()) {
                var f = c[e].x1;
                var g = c[e].x2;
                var h = this._itemCoordsExtractor.getItemTargetSizes(c[e].item);
                var i = h.targetWidth;
                var j = Math.abs(g - f + 1) - i;
                if (c[e].horizontalOffset != j) {
                    c[e].horizontalOffset = j;
                    d.push(c[e]);
                }
            }
        }
        this._lastColHorizontallyExpandedConnections = d;
    };
    e.HorizontalGrid.ConnectionsIntersector = function(a) {
        var b = this;
        this._connections = null;
        this._intersectorCore = null;
        this._css = {};
        this._construct = function() {
            b._connections = a;
            b._intersectorCore = new e.ConnectionsIntersector(b._connections);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectionsIntersector.prototype.isIntersectingAnyConnection = function(a, b) {
        return this._intersectorCore.isIntersectingAnyConnection(a, b);
    };
    e.HorizontalGrid.ConnectionsIntersector.prototype.getAllConnectionsWithIntersectedCenter = function(a) {
        return this._intersectorCore.getAllConnectionsWithIntersectedCenter(a);
    };
    e.HorizontalGrid.ConnectionsIntersector.prototype.findAllMaybeIntersectableConnectionsOnAppend = function(a) {
        var b = this._connections.get();
        var c = [];
        for (var d = 0; d < b.length; d++) {
            if (a.x > b[d].x2) continue;
            c.push(b[d]);
        }
        return c;
    };
    e.HorizontalGrid.ConnectionsIntersector.prototype.findAllMaybeIntersectableConnectionsOnPrepend = function(a) {
        var b = this._connections.get();
        var c = [];
        for (var d = 0; d < b.length; d++) {
            if (a.x < b[d].x1) continue;
            c.push(b[d]);
        }
        return c;
    };
    e.HorizontalGrid.ConnectionsRanges = function(a) {
        var b = this;
        this._connections = null;
        this._ranges = null;
        this._css = {};
        this._construct = function() {
            b._connections = a;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectionsRanges.RANGE_PX_WIDTH = 500;
    e.HorizontalGrid.ConnectionsRanges.prototype.init = function() {
        this._ranges = [];
        this._ranges.push({
            x1: -1,
            x2: e.HorizontalGrid.ConnectionsRanges.RANGE_PX_WIDTH,
            connectionIndexes: []
        });
        this._attachAllConnections();
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.shiftAllRangesBy = function(a) {
        for (var b = 0; b < this._ranges.length; b++) {
            this._ranges[b].x1 += a;
            this._ranges[b].x2 += a;
        }
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.createPrependedRange = function(a, b) {
        this._ranges.unshift({
            x1: -1,
            x2: b,
            connectionIndexes: []
        });
    };
    e.HorizontalGrid.ConnectionsRanges.prototype._createNextRange = function() {
        var a = this._ranges[this._ranges.length - 1].x2 + 1;
        this._ranges.push({
            x1: a,
            x2: a + e.HorizontalGrid.ConnectionsRanges.RANGE_PX_WIDTH,
            connectionIndexes: []
        });
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.attachConnection = function(a, b) {
        while (a.x2 + 1 > this._ranges[this._ranges.length - 1].x2) {
            this._createNextRange();
        }
        var c = false;
        for (var d = 0; d < this._ranges.length; d++) {
            var e = a.x2 < this._ranges[d].x1;
            var f = a.x1 > this._ranges[d].x2;
            if (!e && !f) {
                this._ranges[d].connectionIndexes.push(b);
                c = true;
            }
        }
        if (!c) throw new Error("Gridifier core error: connection was not connected to any range: " + a.itemGUID);
    };
    e.HorizontalGrid.ConnectionsRanges.prototype._attachAllConnections = function() {
        var a = this._connections.get();
        for (var b = 0; b < a.length; b++) this.attachConnection(a[b], b);
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.mapAllIntersectedAndLeftConnectionsPerEachConnector = function(a) {
        var b = this._ranges.length - 1;
        var c = [];
        for (var d = 0; d < a.length; d++) {
            var e = false;
            if (b == this._ranges.length - 1) var f = false; else var f = true;
            while (!e) {
                if (b > this._ranges.length - 1 || b < 0) {
                    b = this._ranges.length - 1;
                    break;
                }
                if (a[d].x >= this._ranges[b].x1 && a[d].x <= this._ranges[b].x2) {
                    e = true;
                } else {
                    b--;
                    f = false;
                }
            }
            if (!f) {
                c = [];
                for (var g = b; g >= 0; g--) c.push(this._ranges[g].connectionIndexes);
            }
            a[d].connectionIndexes = c;
        }
        return a;
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.getAllConnectionsFromIntersectedAndRightRanges = function(a) {
        var b = [];
        var c = null;
        for (var d = 0; d < this._ranges.length; d++) {
            if (a >= this._ranges[d].x1 && a <= this._ranges[d].x2) {
                c = d;
                break;
            }
        }
        if (c == null) c = 0;
        for (var d = c; d < this._ranges.length; d++) {
            b.push(this._ranges[d].connectionIndexes);
        }
        return b;
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.mapAllIntersectedAndRightConnectionsPerEachConnector = function(a) {
        var b = 0;
        var c = [];
        for (var d = 0; d < a.length; d++) {
            var e = false;
            if (b == 0) var f = false; else var f = true;
            while (!e) {
                if (b > this._ranges.length - 1 || b < 0) {
                    b = 0;
                    break;
                }
                if (a[d].x >= this._ranges[b].x1 && a[d].x <= this._ranges[b].x2) {
                    e = true;
                } else {
                    b++;
                    f = false;
                }
            }
            if (!f) {
                c = [];
                for (var g = b; g < this._ranges.length; g++) c.push(this._ranges[g].connectionIndexes);
            }
            a[d].connectionIndexes = c;
        }
        return a;
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.getAllConnectionsFromIntersectedRange = function(a) {
        for (var b = 0; b < this._ranges.length; b++) {
            if (a >= this._ranges[b].x1 && a <= this._ranges[b].x2) return this._ranges[b].connectionIndexes;
        }
        var c = function(a, b) {
            for (var c = 0; c < a.length; c++) {
                if (a[c] == b) return true;
            }
            return false;
        };
        var d = [];
        for (var b = 0; b < this._ranges.length; b++) {
            for (var e = 0; e < this._ranges[b].connectionIndexes.length; e++) {
                if (!c(d, this._ranges[b].connectionIndexes[e])) d.push(this._ranges[b].connectionIndexes[e]);
            }
        }
        return d;
    };
    e.HorizontalGrid.ConnectionsRanges.prototype.getAllConnectionsFromIntersectedAndLeftRanges = function(a) {
        var b = [];
        var c = null;
        for (var d = this._ranges.length - 1; d >= 0; d--) {
            if (a >= this._ranges[d].x1 && a <= this._ranges[d].x2) {
                c = d;
                break;
            }
        }
        if (c == null) c = this._ranges.length - 1;
        for (var d = c; d >= 0; d--) {
            b.push(this._ranges[d].connectionIndexes);
        }
        return b;
    };
    e.HorizontalGrid.ConnectionsSorter = function(a, b, c) {
        var d = this;
        this._connections = null;
        this._settings = null;
        this._guid = null;
        this._css = {};
        this._construct = function() {
            d._connections = a;
            d._settings = b;
            d._guid = c;
        };
        this._bindEvents = function() {
        };
        this._unbindEvents = function() {
        };
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectionsSorter.prototype.sortConnectionsPerReappend = function(a) {
        var b = this;
        if (this._settings.isDisabledSortDispersion()) {
            a.sort(function(a, c) {
                if (b._guid.getItemGUID(a.item) > b._guid.getItemGUID(c.item)) return 1;
                return -1;
            });
        } else if (this._settings.isCustomSortDispersion() || this._settings.isCustomAllEmptySpaceSortDispersion()) {
            if (this._settings.isDefaultAppend()) {
                a.sort(function(a, b) {
                    if (d.areRoundedOrFlooredValuesEqual(a.x1, b.x1)) {
                        if (a.y2 < b.y2) return -1; else return 1;
                    } else {
                        if (a.x1 < b.x1) return -1; else return 1;
                    }
                });
            } else if (this._settings.isReversedAppend()) {
                a.sort(function(a, b) {
                    if (d.areRoundedOrFlooredValuesEqual(a.x1, b.x1)) {
                        if (a.y1 > b.y1) return -1; else return 1;
                    } else {
                        if (a.x1 < b.x1) return -1; else return 1;
                    }
                });
            }
        }
        if (this._settings.isCustomAllEmptySpaceSortDispersion()) {
            var c = this._settings.getRetransformSort();
            a = c(a);
        }
        return a;
    };
    e.HorizontalGrid.ConnectorsCleaner = function(a, b, c) {
        var d = this;
        this._connectors = null;
        this._connections = null;
        this._settings = null;
        this._connectionItemIntersectionStrategy = null;
        this._css = {};
        this._construct = function() {
            d._connectors = a;
            d._connections = b;
            d._settings = c;
            d._connectorsNormalizer = new e.ConnectorsNormalizer(d._connections, d._connectors, d._settings);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectorsCleaner.CONNECTION_ITEM_INTERSECTION_STRATEGIES = {
        CONNECTOR_INSIDE_CONNECTION_ITEM: 0,
        CONNECTOR_INSIDE_OR_BEFORE_CONNECTION_ITEM: 1
    };
    e.HorizontalGrid.ConnectorsCleaner.MAX_VALID_HORIZONTAL_DISTANCE = {
        FROM_MOST_RIGHT_CONNECTOR: 3e3,
        FROM_MOST_LEFT_CONNECTOR: 3e3
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.setConnectorInsideItemIntersectionStrategy = function() {
        var a = e.HorizontalGrid.ConnectorsCleaner.CONNECTION_ITEM_INTERSECTION_STRATEGIES;
        this._connectionItemIntersectionStrategy = a.CONNECTOR_INSIDE_CONNECTION_ITEM;
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.setConnectorInsideOrBeforeItemIntersectionStrategy = function() {
        var a = e.HorizontalGrid.ConnectorsCleaner.CONNECTION_ITEM_INTERSECTION_STRATEGIES;
        this._connectionItemIntersectionStrategy = a.CONNECTOR_INSIDE_OR_BEFORE_CONNECTION_ITEM;
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype._updateConnectorIntersectionStrategy = function() {
        if (this._settings.isDisabledSortDispersion()) {
            this.setConnectorInsideOrBeforeItemIntersectionStrategy();
        } else if (this._settings.isCustomSortDispersion() || this._settings.isCustomAllEmptySpaceSortDispersion()) {
            this.setConnectorInsideItemIntersectionStrategy();
        }
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.isConnectorInsideItemIntersectionStrategy = function() {
        this._updateConnectorIntersectionStrategy();
        var a = e.HorizontalGrid.ConnectorsCleaner.CONNECTION_ITEM_INTERSECTION_STRATEGIES;
        return this._connectionItemIntersectionStrategy == a.CONNECTOR_INSIDE_CONNECTION_ITEM;
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.isConnectorInsideOrBeforeItemIntersectionStrategy = function() {
        this._updateConnectorIntersectionStrategy();
        var a = e.HorizontalGrid.ConnectorsCleaner.CONNECTION_ITEM_INTERSECTION_STRATEGIES;
        return this._connectionItemIntersectionStrategy == a.CONNECTOR_INSIDE_OR_BEFORE_CONNECTION_ITEM;
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype._isMappedConnectorIntersectingAnyLeftConnectionItem = function(a) {
        var b = this._connections.get();
        for (var c = 0; c < a.connectionIndexes.length; c++) {
            for (var d = 0; d < a.connectionIndexes[c].length; d++) {
                var e = b[a.connectionIndexes[c][d]];
                this._connectorsNormalizer.applyConnectionRoundingPerConnector(e, a);
                if (this.isConnectorInsideOrBeforeItemIntersectionStrategy()) var f = a.x >= e.x1; else if (this.isConnectorInsideItemIntersectionStrategy()) var f = a.x >= e.x1 && a.x <= e.x2;
                if (a.y >= e.y1 && a.y <= e.y2 && f) {
                    this._connectorsNormalizer.unapplyConnectionRoundingPerConnector(e, a);
                    return true;
                }
                this._connectorsNormalizer.unapplyConnectionRoundingPerConnector(e, a);
            }
        }
        return false;
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.deleteAllIntersectedFromLeftConnectors = function() {
        var a = this._connectors.get();
        var b = this._connectors.getClone();
        b.sort(function(a, b) {
            if (a.x == b.x) return 0; else if (a.x > b.x) return -1; else return 1;
        });
        b = this._connections.mapAllIntersectedAndLeftConnectionsPerEachConnector(b);
        for (var c = 0; c < b.length; c++) {
            if (this._isMappedConnectorIntersectingAnyLeftConnectionItem(b[c])) a[b[c].connectorIndex].isIntersected = true; else a[b[c].connectorIndex].isIntersected = false;
        }
        for (var c = 0; c < a.length; c++) {
            if (a[c].isIntersected) {
                a.splice(c, 1);
                c--;
            }
        }
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.deleteAllTooRightConnectorsFromMostLeftConnector = function() {
        var a = this._connectors.get();
        if (a.length == 0) return;
        var b = a[0];
        for (var c = 1; c < a.length; c++) {
            if (a[c].x < b.x) b = a[c];
        }
        var d = e.HorizontalGrid.ConnectorsCleaner;
        var f = b.x + this._settings.getMaxInsertionRange();
        for (var c = 0; c < a.length; c++) {
            if (a[c].x > f) {
                a.splice(c, 1);
                c--;
            }
        }
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype._isMappedConnectorIntersectingAnyRightConnectionItem = function(a) {
        var b = this._connections.get();
        for (var c = 0; c < a.connectionIndexes.length; c++) {
            for (var d = 0; d < a.connectionIndexes[c].length; d++) {
                var e = b[a.connectionIndexes[c][d]];
                this._connectorsNormalizer.applyConnectionRoundingPerConnector(e, a);
                if (this.isConnectorInsideOrBeforeItemIntersectionStrategy()) var f = a.x <= e.x2; else if (this.isConnectorInsideItemIntersectionStrategy()) var f = a.x <= e.x2 && a.x >= e.x1;
                if (a.y >= e.y1 && a.y <= e.y2 && f) {
                    this._connectorsNormalizer.unapplyConnectionRoundingPerConnector(e, a);
                    return true;
                }
                this._connectorsNormalizer.unapplyConnectionRoundingPerConnector(e, a);
            }
        }
        return false;
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.deleteAllIntersectedFromRightConnectors = function() {
        var a = this._connectors.get();
        var b = this._connectors.getClone();
        b.sort(function(a, b) {
            if (a.x == b.x) return 0; else if (a.x < b.x) return -1; else return 1;
        });
        b = this._connections.mapAllIntersectedAndRightConnectionsPerEachConnector(b);
        for (var c = 0; c < b.length; c++) {
            if (this._isMappedConnectorIntersectingAnyRightConnectionItem(b[c])) a[b[c].connectorIndex].isIntersected = true; else a[b[c].connectorIndex].isIntersected = false;
        }
        for (var c = 0; c < a.length; c++) {
            if (a[c].isIntersected) {
                a.splice(c, 1);
                c--;
            }
        }
    };
    e.HorizontalGrid.ConnectorsCleaner.prototype.deleteAllTooLeftConnectorsFromMostRightConnector = function() {
        var a = this._connectors.get();
        if (a.length == 0) return;
        var b = a[0];
        for (var c = 1; c < a.length; c++) {
            if (a[c].x > b.x) b = a[c];
        }
        var d = e.HorizontalGrid.ConnectorsCleaner;
        var f = b.x - this._settings.getMaxInsertionRange();
        for (var c = 0; c < a.length; c++) {
            if (a[c].x < f) {
                a.splice(c, 1);
                c--;
            }
        }
    };
    e.HorizontalGrid.ConnectorsSelector = function(a) {
        var b = this;
        this._connectors = null;
        this._guid = null;
        this._css = {};
        this._construct = function() {
            b._guid = a;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectorsSelector.prototype.attachConnectors = function(a) {
        this._connectors = a;
    };
    e.HorizontalGrid.ConnectorsSelector.prototype.getSelectedConnectors = function() {
        return this._connectors;
    };
    e.HorizontalGrid.ConnectorsSelector.prototype.selectOnlyMostRightConnectorFromSide = function(a) {
        var b = null;
        var c = null;
        var d = this._connectors.length;
        while (d--) {
            if (this._connectors[d].side == a) {
                if (b == null || this._connectors[d].x > c) {
                    b = this._connectors[d].itemGUID;
                    c = this._connectors[d].x;
                }
            }
        }
        if (b == null) return;
        var d = this._connectors.length;
        while (d--) {
            if (this._connectors[d].side == a && this._connectors[d].itemGUID != b) this._connectors.splice(d, 1);
        }
    };
    e.HorizontalGrid.ConnectorsSelector.prototype.selectOnlyMostLeftConnectorFromSide = function(a) {
        var b = null;
        var c = null;
        var d = this._connectors.length;
        while (d--) {
            if (this._connectors[d].side == a) {
                if (b == null || this._connectors[d].x < c) {
                    b = this._connectors[d].itemGUID;
                    c = this._connectors[d].x;
                }
            }
        }
        if (b == null) return;
        var d = this._connectors.length;
        while (d--) {
            if (this._connectors[d].side == a && this._connectors[d].itemGUID != b) this._connectors.splice(d, 1);
        }
    };
    e.HorizontalGrid.ConnectorsSelector.prototype._isInitialConnector = function(a) {
        return a.itemGUID == e.Connectors.INITIAL_CONNECTOR_ITEM_GUID;
    };
    e.HorizontalGrid.ConnectorsSelector.prototype.selectOnlySpecifiedSideConnectorsOnAppendedItems = function(a) {
        for (var b = 0; b < this._connectors.length; b++) {
            if (!this._isInitialConnector(this._connectors[b]) && !this._guid.wasItemPrepended(this._connectors[b].itemGUID) && a != this._connectors[b].side) {
                this._connectors.splice(b, 1);
                b--;
            }
        }
    };
    e.HorizontalGrid.ConnectorsSelector.prototype.selectOnlySpecifiedSideConnectorsOnPrependedItems = function(a) {
        for (var b = 0; b < this._connectors.length; b++) {
            if (!this._isInitialConnector(this._connectors[b]) && this._guid.wasItemPrepended(this._connectors[b].itemGUID) && a != this._connectors[b].side) {
                this._connectors.splice(b, 1);
                b--;
            }
        }
    };
    e.HorizontalGrid.ConnectorsSorter = function() {
        var a = this;
        this._connectors = null;
        this._css = {};
        this._construct = function() {};
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.HorizontalGrid.ConnectorsSorter.prototype.attachConnectors = function(a) {
        this._connectors = a;
    };
    e.HorizontalGrid.ConnectorsSorter.prototype.getConnectors = function() {
        return this._connectors;
    };
    e.HorizontalGrid.ConnectorsSorter.prototype.sortConnectorsForPrepend = function(a) {
        var b = this;
        this._connectors.sort(function(b, c) {
            if (d.areRoundedOrCeiledValuesEqual(b.x, c.x)) {
                if (a == e.PREPEND_TYPES.DEFAULT_PREPEND) {
                    if (b.y < c.y) return 1; else return -1;
                } else if (a == e.PREPEND_TYPES.REVERSED_PREPEND) {
                    if (b.y > c.y) return 1; else return -1;
                }
            } else {
                if (b.x < c.x) return 1; else return -1;
            }
        });
    };
    e.HorizontalGrid.ConnectorsSorter.prototype.sortConnectorsForAppend = function(a) {
        var b = this;
        this._connectors.sort(function(b, c) {
            if (d.areRoundedOrFlooredValuesEqual(b.x, c.x)) {
                if (a == e.APPEND_TYPES.DEFAULT_APPEND) {
                    if (b.y < c.y) return -1; else return 1;
                } else if (a == e.APPEND_TYPES.REVERSED_APPEND) {
                    if (b.y > c.y) return -1; else return 1;
                }
            } else {
                if (b.x < c.x) return -1; else return 1;
            }
        });
    };
    e.ImagesResolver = function(a) {
        var b = this;
        this._gridifier = null;
        this._batchesToResolve = [];
        this._alreadyResolved = [];
        this._construct = function() {
            b._gridifier = a;
            b._bindEvents();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {
        };
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ImagesResolver.OPERATIONS = {
        APPEND: 0,
        SILENT_APPEND: 1,
        PREPEND: 2,
        INSERT_BEFORE: 3,
        INSERT_AFTER: 4
    };
    e.ImagesResolver.prototype.scheduleImagesResolve = function(a, b, c) {
        if (a.length == 0) {
            this._batchesToResolve.push({
                items: a,
                images: [],
                operation: b,
                data: c
            });
            this._emitResolveEvent();
            return;
        }
        var d = this._findImages(a);
        this._batchesToResolve.push({
            items: a,
            images: d,
            operation: b,
            data: c
        });
        if (d.length == 0) {
            this._emitResolveEvent();
            return;
        }
        for (var e = 0; e < d.length; e++) d[e].scheduleResolve();
    };
    e.ImagesResolver.prototype._findImages = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (a[c].nodeName == "IMG") {
                if (!this._isAlreadyResolved(a[c])) b.push(new e.ImagesResolver.ResolvedImage(this, a[c]));
                continue;
            }
            if (!this._isValidNode(a[c])) continue;
            var d = a[c].querySelectorAll("img");
            for (var f = 0; f < d.length; f++) {
                if (!this._isAlreadyResolved(d[f])) b.push(new e.ImagesResolver.ResolvedImage(this, d[f]));
            }
        }
        return b;
    };
    e.ImagesResolver.prototype._isAlreadyResolved = function(a) {
        for (var b = 0; b < this._alreadyResolved.length; b++) {
            if (this._alreadyResolved[b] === a.src) return true;
        }
        if (a.src.length == 0) return true;
        return false;
    };
    e.ImagesResolver.prototype._isValidNode = function(a) {
        return a.nodeType && (a.nodeType == 1 || a.nodeType == 9 || a.nodeType == 11);
    };
    e.ImagesResolver.prototype.onResolve = function(a, b) {
        this._alreadyResolved.push(b.src);
        this._emitResolveEvent();
    };
    e.ImagesResolver.prototype._emitResolveEvent = function() {
        for (var a = 0; a < this._batchesToResolve.length; a++) {
            var b = true;
            var c = this._batchesToResolve[a].images;
            for (var d = 0; d < c.length; d++) {
                if (!c[d].isImageResolved()) {
                    b = false;
                    break;
                }
            }
            if (b) {
                for (var d = 0; d < c.length; d++) c[d].destruct();
                this._batchesToResolve[a].images = [];
                var f = this._batchesToResolve[a].items;
                var g = this._batchesToResolve[a].data;
                var h = e.ImagesResolver.OPERATIONS;
                switch (this._batchesToResolve[a].operation) {
                  case h.APPEND:
                    this._gridifier.executeAppend(f, g.batchSize, g.batchTimeout);
                    break;

                  case h.SILENT_APPEND:
                    this._gridifier.executeSilentAppend(f, g.batchSize, g.batchTimeout);
                    break;

                  case h.PREPEND:
                    this._gridifier.executePrepend(f, g.batchSize, g.batchTimeout);
                    break;

                  case h.INSERT_BEFORE:
                    this._gridifier.executeInsertBefore(f, g.beforeItem, g.batchSize, g.batchTimeout);
                    break;

                  case h.INSERT_AFTER:
                    this._gridifier.executeInsertAfter(f, g.afterItem, g.batchSize, g.batchTimeout);
                    break;

                  default:
                    console.log("Gridifier ERROR: Unknown images resolver operation.");
                    break;
                }
                this._batchesToResolve.splice(a, 1);
                a--;
            } else {
                break;
            }
        }
    };
    e.ImagesResolver.ResolvedImage = function(a, c) {
        var d = this;
        this._image = null;
        this._imagesResolver = null;
        this._resolvedImage = null;
        this._isResolved = false;
        this._loadCallback = null;
        this._errorCallback = null;
        this._construct = function() {
            d._image = c;
            d._imagesResolver = a;
        };
        this._bindEvents = function() {
            d._loadCallback = function() {
                d._onLoad.call(d);
            };
            d._errorCallback = function() {
                d._onError.call(d);
            };
            b.add(d._resolvedImage, "load", d._loadCallback);
            b.add(d._resolvedImage, "error", d._errorCallback);
        };
        this._unbindEvents = function() {
            if (d._loadCallback != null) b.remove(d._resolvedImage, "load", d._loadCallback);
            if (d._errorCallback != null) b.remove(d._resolvedImage, "error", d._errorCallback);
        };
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ImagesResolver.ResolvedImage.prototype.scheduleResolve = function() {
        if (this._isAlreadyResolved()) {
            this._isResolved = true;
            this._imagesResolver.onResolve(this, this._image);
            return;
        }
        this._resolvedImage = new Image();
        this._bindEvents();
        this._resolvedImage.src = this._image.src;
    };
    e.ImagesResolver.ResolvedImage.prototype.isImageResolved = function() {
        return this._isResolved;
    };
    e.ImagesResolver.ResolvedImage.prototype._isAlreadyResolved = function() {
        return this._image.complete && this._image.naturalWidth !== undefined && this._image.naturalWidth !== 0;
    };
    e.ImagesResolver.ResolvedImage.prototype._onLoad = function() {
        this._isResolved = true;
        this._imagesResolver.onResolve(this, this._image);
    };
    e.ImagesResolver.ResolvedImage.prototype._onError = function() {
        this._isResolved = true;
        this._imagesResolver.onResolve(this, this._image);
    };
    e.Operations.Append = function(a, b, c, d, e, f, g, h, i, j, k) {
        var l = this;
        this._gridSizesUpdater = null;
        this._collector = null;
        this._connections = null;
        this._connectionsSorter = null;
        this._guid = null;
        this._settings = null;
        this._appender = null;
        this._reversedAppender = null;
        this._sizesTransformer = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._css = {};
        this._construct = function() {
            l._gridSizesUpdater = a;
            l._collector = b;
            l._connections = c;
            l._connectionsSorter = d;
            l._guid = e;
            l._settings = f;
            l._appender = g;
            l._reversedAppender = h;
            l._sizesTransformer = i;
            l._sizesResolverManager = j;
            l._eventEmitter = k;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            l._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Operations.Append.prototype.execute = function(a) {
        var a = this._collector.filterOnlyNotConnectedItems(this._collector.toDOMCollection(a));
        if (a.length == 0) return;
        this._sizesResolverManager.startCachingTransaction();
        this._collector.ensureAllItemsAreAttachedToGrid(a);
        this._collector.ensureAllItemsCanBeAttachedToGrid(a);
        a = this._collector.filterCollection(a);
        a = this._collector.sortCollection(a);
        for (var b = 0; b < a.length; b++) {
            this._collector.unmarkItemAsRestrictedToCollect(a[b]);
            this._collector.attachToGrid(a[b]);
            this._guid.markNextAppendedItem(a[b]);
            this._append(a[b]);
        }
        this._sizesResolverManager.stopCachingTransaction();
        this._gridSizesUpdater.scheduleGridSizesUpdate();
        this._eventEmitter.emitInsertEvent();
    };
    e.Operations.Append.prototype._append = function(a) {
        if (this._settings.isDefaultAppend()) {
            this._appender.append(a);
        } else if (this._settings.isReversedAppend()) {
            this._reversedAppender.reversedAppend(a);
        }
    };
    e.Operations.Append.prototype.executeInsertBefore = function(a, b) {
        var a = this._collector.filterOnlyNotConnectedItems(this._collector.toDOMCollection(a));
        if (a.length == 0) return;
        var c = this._connections.get();
        if (c.length == 0) {
            this.execute(a);
            return;
        }
        var d = [];
        c = this._connectionsSorter.sortConnectionsPerReappend(c);
        if (typeof b == "undefined" || b == null) {
            var b = c[0].item;
        } else {
            var b = this._collector.toDOMCollection(b)[0];
            if (typeof b == "undefined" || b == null) var b = c[0].item;
        }
        var f = null;
        var g = false;
        for (var h = 0; h < c.length; h++) {
            if (this._guid.getItemGUID(c[h].item) == this._guid.getItemGUID(b)) {
                g = true;
                f = c[h].itemGUID;
                d = d.concat(c.splice(h, c.length - h));
                break;
            }
        }
        if (!g) {
            new e.Error(e.Error.ERROR_TYPES.APPENDER.WRONG_INSERT_BEFORE_TARGET_ITEM, b);
            return;
        }
        this._connections.reinitRanges();
        this._guid.reinitMaxGUID(f - 1);
        if (this._settings.isDefaultAppend()) this._appender.recreateConnectorsPerAllConnectedItems(); else if (this._settings.isReversedAppend()) this._reversedAppender.recreateConnectorsPerAllConnectedItems();
        this.execute(a);
        if (this._settings.isDisabledSortDispersion()) {
            this._connections.restore(d);
            this._connections.remapAllItemGUIDSInSortedConnections(d);
        } else if (this._settings.isCustomSortDispersion() || this._settings.isCustomAllEmptySpaceSortDispersion()) {
            this._connections.restoreOnCustomSortDispersionMode(d);
            this._connections.remapAllItemGUIDS();
        }
        this._sizesTransformer.retransformFrom(d[0]);
    };
    e.Operations.Append.prototype.executeInsertAfter = function(a, b) {
        var a = this._collector.filterOnlyNotConnectedItems(this._collector.toDOMCollection(a));
        if (a.length == 0) return;
        var c = this._connections.get();
        if (c.length == 0) {
            this.execute(a);
            return;
        }
        var d = [];
        c = this._connectionsSorter.sortConnectionsPerReappend(c);
        if (typeof b == "undefined" || b == null) {
            var b = c[c.length - 1].item;
        } else {
            var b = this._collector.toDOMCollection(b)[0];
            if (typeof b == "undefined" || b == null) var b = c[c.length - 1].item;
        }
        var f = null;
        var g = false;
        for (var h = 0; h < c.length; h++) {
            if (this._guid.getItemGUID(c[h].item) == this._guid.getItemGUID(b)) {
                g = true;
                f = c[h].itemGUID;
                d = d.concat(c.splice(h + 1, c.length - h - 1));
                break;
            }
        }
        if (!g) {
            new e.Error(e.Error.ERROR_TYPES.APPENDER.WRONG_INSERT_AFTER_TARGET_ITEM, b);
            return;
        }
        this._connections.reinitRanges();
        this._guid.reinitMaxGUID(f + 1);
        if (this._settings.isDefaultAppend()) this._appender.recreateConnectorsPerAllConnectedItems(); else if (this._settings.isReversedAppend()) this._reversedAppender.recreateConnectorsPerAllConnectedItems();
        this.execute(a);
        if (this._settings.isDisabledSortDispersion()) {
            this._connections.restore(d);
            this._connections.remapAllItemGUIDSInSortedConnections(d);
        } else if (this._settings.isCustomSortDispersion() || this._settings.isCustomAllEmptySpaceSortDispersion()) {
            this._connections.restoreOnCustomSortDispersionMode(d);
            this._connections.remapAllItemGUIDS();
        }
        if (d.length > 0) this._sizesTransformer.retransformFrom(d[0]);
    };
    e.Operations.Prepend = function(a, b, c, d, e, f, g, h) {
        var i = this;
        this._gridSizesUpdater = null;
        this._collector = null;
        this._guid = null;
        this._settings = null;
        this._prepender = null;
        this._reversedPrepender = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._css = {};
        this._construct = function() {
            i._gridSizesUpdater = a;
            i._collector = b;
            i._guid = c;
            i._settings = d;
            i._prepender = e;
            i._reversedPrepender = f;
            i._sizesResolverManager = g;
            i._eventEmitter = h;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            i._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Operations.Prepend.prototype.execute = function(a) {
        var a = this._collector.filterOnlyNotConnectedItems(this._collector.toDOMCollection(a));
        if (a.length == 0) return;
        this._sizesResolverManager.startCachingTransaction();
        this._collector.ensureAllItemsAreAttachedToGrid(a);
        this._collector.ensureAllItemsCanBeAttachedToGrid(a);
        a = this._collector.filterCollection(a);
        a = this._collector.sortCollection(a);
        for (var b = 0; b < a.length; b++) {
            this._collector.unmarkItemAsRestrictedToCollect(a[b]);
            this._collector.attachToGrid(a[b]);
            this._guid.markNextPrependedItem(a[b]);
            this._prepend(a[b]);
        }
        this._sizesResolverManager.stopCachingTransaction();
        this._gridSizesUpdater.scheduleGridSizesUpdate();
        this._eventEmitter.emitInsertEvent();
    };
    e.Operations.Prepend.prototype._prepend = function(a) {
        if (this._settings.isDefaultPrepend()) {
            this._prepender.prepend(a);
        } else if (this._settings.isReversedPrepend()) {
            this._reversedPrepender.reversedPrepend(a);
        }
    };
    e.Operations.Queue = function(a, b, c, d, f, g, h, i, j, k, l, m, n) {
        var o = this;
        this._gridSizesUpdater = null;
        this._collector = null;
        this._connections = null;
        this._connectionsSorter = null;
        this._guid = null;
        this._settings = null;
        this._prepender = null;
        this._reversedPrepender = null;
        this._appender = null;
        this._reversedAppender = null;
        this._sizesTransformer = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._operationsQueue = null;
        this._queuedOperations = [];
        this._isWaitingForTransformerQueueRelease = false;
        this._prependOperation = null;
        this._appendOperation = null;
        this._css = {};
        this._construct = function() {
            o._gridSizesUpdater = a;
            o._collector = b;
            o._connections = c;
            o._connectionsSorter = d;
            o._guid = f;
            o._settings = g;
            o._prepender = h;
            o._reversedPrepender = i;
            o._appender = j;
            o._reversedAppender = k;
            o._sizesTransformer = l;
            o._sizesResolverManager = m;
            o._eventEmitter = n;
            o._prependOperation = new e.Operations.Prepend(o._gridSizesUpdater, o._collector, o._guid, o._settings, o._prepender, o._reversedPrepender, o._sizesResolverManager, o._eventEmitter);
            o._appendOperation = new e.Operations.Append(o._gridSizesUpdater, o._collector, o._connections, o._connectionsSorter, o._guid, o._settings, o._appender, o._reversedAppender, o._sizesTransformer, o._sizesResolverManager, o._eventEmitter);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            o._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Operations.Queue.QUEUED_OPERATION_TYPES = {
        PREPEND: 0,
        APPEND: 1,
        INSERT_BEFORE: 2,
        INSERT_AFTER: 3
    };
    e.Operations.Queue.PROCESS_QUEUED_OPERATIONS_TIMEOUT = 100;
    e.Operations.Queue.DEFAULT_BATCH_TIMEOUT = 100;
    e.Operations.Queue.prototype.schedulePrependOperation = function(a, b, c) {
        var d = this;
        var f = function(a) {
            setTimeout(function() {
                if (d._sizesTransformer.isTransformerQueueEmpty()) {
                    d._executePrependOperation.call(d, a);
                } else {
                    d._queuedOperations.push({
                        queuedOperationType: e.Operations.Queue.QUEUED_OPERATION_TYPES.PREPEND,
                        items: a
                    });
                    if (d._isWaitingForTransformerQueueRelease) return;
                    setTimeout(function() {
                        d._isWaitingForTransformerQueueRelease = true;
                        d._processQueuedOperations.call(d);
                    }, e.Operations.Queue.PROCESS_QUEUED_OPERATIONS_TIMEOUT);
                }
            }, 0);
        };
        if (typeof b == "undefined") {
            f.call(d, a);
            return;
        }
        var c = c || e.Operations.Queue.DEFAULT_BATCH_TIMEOUT;
        var g = this._packItemsToBatches(a, b);
        for (var h = 0; h < g.length; h++) {
            (function(a, b) {
                setTimeout(function() {
                    f.call(d, a);
                }, c * b);
            })(g[h], h);
        }
    };
    e.Operations.Queue.prototype.scheduleAppendOperation = function(a, b, c) {
        var d = this;
        var f = function(a) {
            setTimeout(function() {
                if (d._sizesTransformer.isTransformerQueueEmpty()) {
                    d._executeAppendOperation.call(d, a);
                } else {
                    d._queuedOperations.push({
                        queuedOperationType: e.Operations.Queue.QUEUED_OPERATION_TYPES.APPEND,
                        items: a
                    });
                    if (d._isWaitingForTransformerQueueRelease) return;
                    setTimeout(function() {
                        d._isWaitingForTransformerQueueRelease = true;
                        d._processQueuedOperations.call(d);
                    }, e.Operations.Queue.PROCESS_QUEUED_OPERATIONS_TIMEOUT);
                }
            }, 0);
        };
        if (typeof b == "undefined") {
            f.call(d, a);
            return;
        }
        var c = c || e.Operations.Queue.DEFAULT_BATCH_TIMEOUT;
        var g = this._packItemsToBatches(a, b);
        for (var h = 0; h < g.length; h++) {
            (function(a, b) {
                setTimeout(function() {
                    f.call(d, a);
                }, c * b);
            })(g[h], h);
        }
    };
    e.Operations.Queue.prototype.scheduleInsertBeforeOperation = function(a, b, c, d) {
        var f = this;
        var g = function(a, b) {
            setTimeout(function() {
                if (f._sizesTransformer.isTransformerQueueEmpty()) {
                    f._executeInsertBeforeOperation.call(f, a, b);
                } else {
                    f._queuedOperations.push({
                        queuedOperationType: e.Operations.Queue.QUEUED_OPERATION_TYPES.INSERT_BEFORE,
                        items: a,
                        beforeItem: b
                    });
                    if (f._isWaitingForTransformerQueueRelease) return;
                    setTimeout(function() {
                        f._isWaitingForTransformerQueueRelease = true;
                        f._processQueuedOperations.call(f);
                    }, e.Operations.Queue.PROCESS_QUEUED_OPERATIONS_TIMEOUT);
                }
            }, 0);
        };
        if (typeof c == "undefined") {
            g.call(f, a, b);
            return;
        }
        var d = d || e.Operations.Queue.DEFAULT_BATCH_TIMEOUT;
        var h = this._packItemsToBatches(a, c);
        for (var i = 0; i < h.length; i++) {
            (function(a, c) {
                setTimeout(function() {
                    g.call(f, a, b);
                }, d * c);
            })(h[i], i);
        }
    };
    e.Operations.Queue.prototype.scheduleInsertAfterOperation = function(a, b, c, d) {
        var f = this;
        var g = function(a, b) {
            setTimeout(function() {
                if (f._sizesTransformer.isTransformerQueueEmpty()) {
                    f._executeInsertAfterOperation.call(f, a, b);
                } else {
                    f._queuedOperations.push({
                        queuedOperationType: e.Operations.Queue.QUEUED_OPERATION_TYPES.INSERT_AFTER,
                        items: a,
                        afterItem: b
                    });
                    if (f._isWaitingForTransformerQueueRelease) return;
                    setTimeout(function() {
                        f._isWaitingForTransformerQueueRelease = true;
                        f._processQueuedOperations.call(f);
                    }, e.Operations.Queue.PROCESS_QUEUED_OPERATIONS_TIMEOUT);
                }
            }, 0);
        };
        if (typeof c == "undefined") {
            g.call(f, a, b);
            return;
        }
        var d = d || e.Operations.Queue.DEFAULT_BATCH_TIMEOUT;
        var h = this._packItemsToBatches(a, c);
        for (var i = 0; i < h.length; i++) {
            (function(a, c) {
                setTimeout(function() {
                    g.call(f, a, b);
                }, d * c);
            })(h[i], i);
        }
    };
    e.Operations.Queue.prototype._packItemsToBatches = function(a, b) {
        var a = this._collector.toDOMCollection(a);
        return this.splitItemsToBatches(a, b);
    };
    e.Operations.Queue.prototype.splitItemsToBatches = function(a, b) {
        var c = [];
        var d = 0;
        var e = [];
        var f = false;
        for (var g = 0; g < a.length; g++) {
            e.push(a[g]);
            f = false;
            d++;
            if (d == b) {
                c.push(e);
                e = [];
                f = true;
                d = 0;
            }
        }
        if (!f) c.push(e);
        return c;
    };
    e.Operations.Queue.prototype._processQueuedOperations = function() {
        var a = this;
        var b = true;
        for (var c = 0; c < this._queuedOperations.length; c++) {
            if (!this._sizesTransformer.isTransformerQueueEmpty()) {
                setTimeout(function() {
                    a._processQueuedOperations.call(a);
                }, e.Operations.Queue.PROCESS_QUEUED_OPERATIONS_TIMEOUT);
                b = false;
                break;
            }
            var d = e.Operations.Queue.QUEUED_OPERATION_TYPES;
            if (this._queuedOperations[c].queuedOperationType == d.APPEND) {
                this._executeAppendOperation(this._queuedOperations[c].items);
            } else if (this._queuedOperations[c].queuedOperationType == d.PREPEND) {
                this._executePrependOperation(this._queuedOperations[c].items);
            } else if (this._queuedOperations[c].queuedOperationType == d.INSERT_BEFORE) {
                this._executeInsertBeforeOperation(this._queuedOperations[c].items, this._queuedOperations[c].beforeItem);
            } else if (this._queuedOperations[c].queuedOperationType == d.INSERT_AFTER) {
                this._executeInsertAfterOperation(this._queuedOperations[c].items, this._queuedOperations[c].afterItem);
            } else {
                var f = this._queuedOperations[c].queuedOperationType;
                throw new Error("Unknown queued operation type = '" + f + "'");
            }
            this._queuedOperations.shift();
            c--;
        }
        if (b) this._isWaitingForTransformerQueueRelease = false;
    };
    e.Operations.Queue.prototype._executePrependOperation = function(a) {
        this._prependOperation.execute(a);
    };
    e.Operations.Queue.prototype._executeAppendOperation = function(a) {
        this._appendOperation.execute(a);
    };
    e.Operations.Queue.prototype._executeInsertBeforeOperation = function(a, b) {
        this._appendOperation.executeInsertBefore(a, b);
    };
    e.Operations.Queue.prototype._executeInsertAfterOperation = function(a, b) {
        this._appendOperation.executeInsertAfter(a, b);
    };
    e.Operations.Queue.prototype.scheduleAsyncFnExecutionByBatches = function(a, b, c, d) {
        var f = this.splitItemsToBatches(a, b);
        c = typeof c != "undefined" ? c : e.Operations.Queue.DEFAULT_BATCH_TIMEOUT;
        for (var g = 0; g < f.length; g++) {
            (function(a, b) {
                setTimeout(function() {
                    d(a);
                }, c * b);
            })(f[g], g);
        }
    };
    e.Renderer = function(a, b, c, d) {
        var f = this;
        this._gridifier = null;
        this._connections = null;
        this._settings = null;
        this._normalizer = null;
        this._transformedItemMarker = null;
        this._rendererSchedulator = null;
        this._rendererConnections = null;
        this._css = {};
        this._construct = function() {
            f._gridifier = a;
            f._connections = b;
            f._settings = c;
            f._normalizer = d;
            f._transformedItemMarker = new e.SizesTransformer.TransformedItemMarker();
            f._rendererConnections = new e.Renderer.Connections(f._settings);
            f._rendererSchedulator = new e.Renderer.Schedulator(f._gridifier, f._settings, f._connections, f, f._rendererConnections);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            f._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Renderer.SCHEDULED_ITEM_TO_HIDE_DATA_ATTR = "data-gridifier-scheduled-to-hide";
    e.Renderer.SCHEDULED_ITEM_TO_HIDE_DATA_ATTR_VALUE = "yes";
    e.Renderer.prototype.getRendererConnections = function() {
        return this._rendererConnections;
    };
    e.Renderer.prototype.setSilentRendererInstance = function(a) {
        this._rendererSchedulator.setSilentRendererInstance(a);
    };
    e.Renderer.prototype.showConnections = function(a) {
        var b = this;
        if (!d.isArray(a)) var a = [ a ];
        for (var c = 0; c < a.length; c++) {
            this.unmarkItemAsScheduledToHide(a[c].item);
            if (this._rendererConnections.isConnectionItemRendered(a[c])) continue;
            var e = this._rendererConnections.getCssLeftPropertyValuePerConnection(a[c]);
            var f = this._rendererConnections.getCssTopPropertyValuePerConnection(a[c]);
            this._rendererConnections.markConnectionItemAsRendered(a[c]);
            this._rendererSchedulator.reinit();
            this._rendererSchedulator.scheduleShow(a[c], e, f);
        }
    };
    e.Renderer.prototype.markItemsAsScheduledToHide = function(a) {
        for (var b = 0; b < a.length; b++) {
            a[b].setAttribute(e.Renderer.SCHEDULED_ITEM_TO_HIDE_DATA_ATTR, e.Renderer.SCHEDULED_ITEM_TO_HIDE_DATA_ATTR_VALUE);
        }
    };
    e.Renderer.prototype.unmarkItemAsScheduledToHide = function(a) {
        a.removeAttribute(e.Renderer.SCHEDULED_ITEM_TO_HIDE_DATA_ATTR);
    };
    e.Renderer.prototype.wasItemScheduledToHide = function(a) {
        return d.hasAttribute(a, e.Renderer.SCHEDULED_ITEM_TO_HIDE_DATA_ATTR);
    };
    e.Renderer.prototype.hideConnections = function(a) {
        var b = this;
        if (!d.isArray(a)) var a = [ a ];
        for (var c = 0; c < a.length; c++) {
            if (!this.wasItemScheduledToHide(a[c].item)) {
                continue;
            }
            var e = this._rendererConnections.getCssLeftPropertyValuePerConnection(a[c]);
            var f = this._rendererConnections.getCssTopPropertyValuePerConnection(a[c]);
            this._rendererConnections.unmarkConnectionItemAsRendered(a[c]);
            this._rendererSchedulator.reinit();
            this._rendererSchedulator.scheduleHide(a[c], e, f);
        }
    };
    e.Renderer.prototype.renderTransformedConnections = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = this._rendererConnections.getCssLeftPropertyValuePerConnection(a[b]);
            var d = this._rendererConnections.getCssTopPropertyValuePerConnection(a[b]);
            this._rendererSchedulator.reinit();
            if (this._transformedItemMarker.isTransformedItem(a[b].item)) {
                var e = this._transformedItemMarker.getTransformedItemTargetRawSizes(a[b].item);
                this._rendererSchedulator.scheduleRenderTransformed(a[b], c, d, e.targetRawWidth, e.targetRawHeight);
                this._transformedItemMarker.unmarkItemAsTransformed(a[b].item);
            } else if (this._transformedItemMarker.isDependedItem(a[b].item)) {
                this._rendererSchedulator.scheduleRenderDepended(a[b], c, d);
                this._transformedItemMarker.unmarkItemAsDepended(a[b].item);
            }
        }
    };
    e.Renderer.prototype.renderConnections = function(a, b) {
        var b = b || false;
        for (var c = 0; c < a.length; c++) {
            if (b) {
                var d = false;
                for (var e = 0; e < b.length; e++) {
                    if (a[c].itemGUID == b[e].itemGUID) {
                        d = true;
                        break;
                    }
                }
                if (d) continue;
            }
            var f = this._rendererConnections.getCssLeftPropertyValuePerConnection(a[c]);
            var g = this._rendererConnections.getCssTopPropertyValuePerConnection(a[c]);
            this._rendererSchedulator.reinit();
            this._rendererSchedulator.scheduleRender(a[c], f, g);
        }
    };
    e.Renderer.prototype.renderConnectionsAfterDelay = function(a, b) {
        var c = this;
        var b = b || 40;
        for (var d = 0; d < a.length; d++) {
            this._rendererSchedulator.reinit();
            this._rendererSchedulator.scheduleDelayedRender(a[d], null, null, b);
        }
    };
    e.Renderer.prototype.rotateItems = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (this._gridifier.hasItemBindedClone(a[c])) {
                var d = this._gridifier.getItemClone(a[c]);
                d.style.visibility = "hidden";
            }
            var e = this._connections.findConnectionByItem(a[c]);
            this._rendererConnections.unmarkConnectionItemAsRendered(e);
            b.push(e);
        }
        this.showConnections(b);
    };
    e.Renderer.Connections = function(a) {
        var b = this;
        this._settings = null;
        this._css = {};
        this._construct = function() {
            b._settings = a;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Renderer.Connections.CONNECTION_RENDERED_ITEM_DATA_CLASS = "gridifier-connection-rendered";
    e.Renderer.Connections.prototype.isConnectionItemRendered = function(a) {
        return d.css.hasClass(a.item, e.Renderer.Connections.CONNECTION_RENDERED_ITEM_DATA_CLASS);
    };
    e.Renderer.Connections.prototype.markConnectionItemAsRendered = function(a) {
        d.css.addClass(a.item, e.Renderer.Connections.CONNECTION_RENDERED_ITEM_DATA_CLASS);
    };
    e.Renderer.Connections.prototype.unmarkConnectionItemAsRendered = function(a) {
        d.css.removeClass(a.item, e.Renderer.Connections.CONNECTION_RENDERED_ITEM_DATA_CLASS);
    };
    e.Renderer.Connections.prototype.getCssLeftPropertyValuePerConnection = function(a) {
        if (this._settings.isVerticalGrid()) {
            var b = a.x1 + "px";
        } else if (this._settings.isHorizontalGrid()) {
            if (this._settings.isDefaultIntersectionStrategy()) {
                var b = a.x1 + "px";
            } else if (this._settings.isNoIntersectionsStrategy()) {
                var b = a.x1 + a.horizontalOffset + "px";
            }
        }
        return b;
    };
    e.Renderer.Connections.prototype.getCssTopPropertyValuePerConnection = function(a) {
        if (this._settings.isVerticalGrid()) {
            if (this._settings.isDefaultIntersectionStrategy()) {
                var b = a.y1 + "px";
            } else if (this._settings.isNoIntersectionsStrategy()) {
                var b = a.y1 + a.verticalOffset + "px";
            }
        } else if (this._settings.isHorizontalGrid()) {
            var b = a.y1 + "px";
        }
        return b;
    };
    e.Renderer.Schedulator = function(a, b, c, d, f) {
        var g = this;
        this._gridifier = null;
        this._settings = null;
        this._connections = null;
        this._renderer = null;
        this._rendererConnections = null;
        this._silentRenderer = null;
        this._connectedItemMarker = null;
        this._scheduledConnectionsToProcessData = null;
        this._processScheduledConnectionsTimeout = null;
        this._css = {};
        this._construct = function() {
            g._gridifier = a;
            g._settings = b;
            g._connections = c;
            g._renderer = d;
            g._rendererConnections = f;
            g._connectedItemMarker = new e.ConnectedItemMarker();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            g._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Renderer.Schedulator.PROCESS_SCHEDULED_CONNECTIONS_TIMEOUT = 20;
    e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES = {
        SHOW: 0,
        HIDE: 1,
        RENDER: 2,
        RENDER_TRANSFORMED: 3,
        RENDER_DEPENDED: 4,
        DELAYED_RENDER: 5
    };
    e.Renderer.Schedulator.prototype.setSilentRendererInstance = function(a) {
        this._silentRenderer = a;
    };
    e.Renderer.Schedulator.prototype.reinit = function() {
        if (this._scheduledConnectionsToProcessData == null) {
            this._scheduledConnectionsToProcessData = [];
        } else {
            clearTimeout(this._processScheduledConnectionsTimeout);
            this._processScheduledConnectionsTimeout = null;
        }
    };
    e.Renderer.Schedulator.prototype.scheduleShow = function(a, b, c) {
        if (this._silentRenderer.isScheduledForSilentRender(a.item)) return;
        this._scheduledConnectionsToProcessData.push({
            connection: a,
            processingType: e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.SHOW,
            left: b,
            top: c
        });
        this._schedule();
    };
    e.Renderer.Schedulator.prototype.scheduleHide = function(a, b, c) {
        this._scheduledConnectionsToProcessData.push({
            connection: a,
            processingType: e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.HIDE,
            left: b,
            top: c
        });
        this._schedule();
    };
    e.Renderer.Schedulator.prototype.scheduleRender = function(a, b, c) {
        this._scheduledConnectionsToProcessData.push({
            connection: a,
            processingType: e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.RENDER,
            left: b,
            top: c
        });
        this._schedule();
    };
    e.Renderer.Schedulator.prototype.scheduleDelayedRender = function(a, b, c, d) {
        this._scheduledConnectionsToProcessData.push({
            connection: a,
            processingType: e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.DELAYED_RENDER,
            left: b,
            top: c,
            delay: d
        });
        this._schedule();
    };
    e.Renderer.Schedulator.prototype.scheduleRenderTransformed = function(a, b, c, d, f) {
        this._scheduledConnectionsToProcessData.push({
            connection: a,
            processingType: e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.RENDER_TRANSFORMED,
            left: b,
            top: c,
            targetWidth: d,
            targetHeight: f
        });
        this._schedule();
    };
    e.Renderer.Schedulator.prototype.scheduleRenderDepended = function(a, b, c) {
        this._scheduledConnectionsToProcessData.push({
            connection: a,
            processingType: e.Renderer.Schedulator.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.RENDER_DEPENDED,
            left: b,
            top: c
        });
        this._schedule();
    };
    e.Renderer.Schedulator.prototype._schedule = function() {
        var a = this;
        this._processScheduledConnectionsTimeout = setTimeout(function() {
            a._processScheduledConnections.call(a);
        }, e.Renderer.Schedulator.PROCESS_SCHEDULED_CONNECTIONS_TIMEOUT);
    };
    e.Renderer.Schedulator.prototype._processScheduledConnections = function() {
        var a = this;
        var b = e.Renderer.Schedulator;
        for (var c = 0; c < this._scheduledConnectionsToProcessData.length; c++) {
            var f = this._scheduledConnectionsToProcessData[c].connection;
            var g = this._scheduledConnectionsToProcessData[c].processingType;
            var h = this._scheduledConnectionsToProcessData[c].left;
            var i = this._scheduledConnectionsToProcessData[c].top;
            if (this._silentRenderer.isScheduledForSilentRender(f.item)) continue;
            if (g == b.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.SHOW) {
                if (!this._connectedItemMarker.isItemConnected(f.item)) continue;
                d.css.set(f.item, {
                    position: "absolute",
                    left: h,
                    top: i
                });
                if (this._gridifier.hasItemBindedClone(f.item)) {
                    var j = this._gridifier.getItemClone(f.item);
                    d.css.set(j, {
                        position: "absolute",
                        left: h,
                        top: i
                    });
                }
                var k = this._settings.getToggle();
                var l = this._settings.getToggleTimeouter();
                var m = this._settings.getEventEmitter();
                var n = this._settings.getToggleAnimationMsDuration();
                var o = this._settings.getSizesResolverManager();
                var p = this._settings.getCoordsChanger();
                var q = this._settings.getCollector();
                var r = this._settings.getCoordsChangerApi();
                var s = this._gridifier.getItemClonesManager();
                var t = this._settings.getToggleTransitionTiming();
                var u = function(b) {
                    k.show(f.item, a._gridifier.getGrid(), n, l, m, o, p, q, h, i, r, s, t);
                };
                if (this._gridifier.hasItemBindedClone(f.item)) {
                    var j = this._gridifier.getItemClone(f.item);
                    p(j, h, i, n, m, false, false, false, true);
                } else {
                    p(f.item, h, i, n, m, false, false, false, true);
                }
                m.emitBeforeShowPerRetransformSortEvent();
                u(f.item);
            } else if (g == b.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.HIDE) {
                this._renderer.unmarkItemAsScheduledToHide(f.item);
                var k = this._settings.getToggle();
                var l = this._settings.getToggleTimeouter();
                var m = this._settings.getEventEmitter();
                var n = this._settings.getToggleAnimationMsDuration();
                var o = this._settings.getSizesResolverManager();
                var p = this._settings.getCoordsChanger();
                var q = this._settings.getCollector();
                var r = this._settings.getCoordsChangerApi();
                var s = this._gridifier.getItemClonesManager();
                var t = this._settings.getToggleTransitionTiming();
                var v = function(b) {
                    k.hide(b, a._gridifier.getGrid(), n, l, m, o, p, q, h, i, r, s, t);
                };
                v(f.item);
            } else if (g == b.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.DELAYED_RENDER) {
                var w = this._scheduledConnectionsToProcessData[c].delay;
                var p = this._settings.getCoordsChanger();
                var m = this._settings.getEventEmitter();
                if (d.hasAttribute(f.item, e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING)) {
                    var n = this._settings.getToggleAnimationMsDuration();
                    var x = this._settings.getToggleTransitionTiming();
                } else {
                    var n = this._settings.getCoordsChangeAnimationMsDuration();
                    var x = this._settings.getCoordsChangeTransitionTiming();
                }
                var a = this;
                (function(b, c, d, e, f) {
                    setTimeout(function() {
                        var f = a._connections.findConnectionByItem(b, true);
                        if (f == null) return;
                        p(b, a._rendererConnections.getCssLeftPropertyValuePerConnection(f), a._rendererConnections.getCssTopPropertyValuePerConnection(f), c, d, false, false, false, false, e);
                    }, f);
                })(f.item, n, m, x, w);
            } else if (g == b.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.RENDER || g == b.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.RENDER_DEPENDED) {
                var p = this._settings.getCoordsChanger();
                var m = this._settings.getEventEmitter();
                if (d.hasAttribute(f.item, e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING)) {
                    var n = this._settings.getToggleAnimationMsDuration();
                    var x = this._settings.getToggleTransitionTiming();
                } else {
                    var n = this._settings.getCoordsChangeAnimationMsDuration();
                    var x = this._settings.getCoordsChangeTransitionTiming();
                }
                p(f.item, h, i, n, m, false, false, false, false, x);
            } else if (g == b.SCHEDULED_CONNECTIONS_PROCESSING_TYPES.RENDER_TRANSFORMED) {
                var y = this._scheduledConnectionsToProcessData[c].targetWidth;
                var z = this._scheduledConnectionsToProcessData[c].targetHeight;
                var A = this._settings.getSizesChanger();
                A(f.item, y, z);
                var p = this._settings.getCoordsChanger();
                var n = this._settings.getCoordsChangeAnimationMsDuration();
                var m = this._settings.getEventEmitter();
                var x = this._settings.getCoordsChangeTransitionTiming();
                p(f.item, h, i, n, m, true, y, z, false, x);
            }
        }
        this._gridifier.scheduleGridSizesUpdate();
        this._scheduledConnectionsToProcessData = null;
        this._processScheduledConnectionsTimeout = null;
    };
    e.SilentRenderer = function(a, b, c, d, e, f, g) {
        var h = this;
        this._gridifier = null;
        this._collector = null;
        this._connections = null;
        this._operationsQueue = null;
        this._renderer = null;
        this._rendererConnections = null;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            h._gridifier = a;
            h._collector = b;
            h._connections = c;
            h._operationsQueue = d;
            h._renderer = e;
            h._rendererConnections = f;
            h._sizesResolverManager = g;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            h._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SilentRenderer.SILENT_RENDER_DATA_ATTR = "data-gridifier-scheduled-for-silent-render";
    e.SilentRenderer.SILENT_RENDER_DATA_ATTR_VALUE = "silentRender";
    e.SilentRenderer.prototype.scheduleForSilentRender = function(a) {
        for (var b = 0; b < a.length; b++) {
            a[b].setAttribute(e.SilentRenderer.SILENT_RENDER_DATA_ATTR, e.SilentRenderer.SILENT_RENDER_DATA_ATTR_VALUE);
        }
    };
    e.SilentRenderer.prototype._preUnscheduleForSilentRender = function(a) {
        for (var b = 0; b < a.length; b++) {
            a[b].removeAttribute(e.SilentRenderer.SILENT_RENDER_DATA_ATTR);
        }
    };
    e.SilentRenderer.prototype.unscheduleForSilentRender = function(a, b) {
        for (var c = 0; c < a.length; c++) {
            a[c].removeAttribute(e.SilentRenderer.SILENT_RENDER_DATA_ATTR);
            this._rendererConnections.unmarkConnectionItemAsRendered(b[c]);
        }
    };
    e.SilentRenderer.prototype.isScheduledForSilentRender = function(a) {
        return d.hasAttribute(a, e.SilentRenderer.SILENT_RENDER_DATA_ATTR);
    };
    e.SilentRenderer.prototype.getScheduledForSilentRenderItems = function(a) {
        var b = a || false;
        var c = this._collector.collectByQuery("[" + e.SilentRenderer.SILENT_RENDER_DATA_ATTR + "=" + e.SilentRenderer.SILENT_RENDER_DATA_ATTR_VALUE + "]");
        if (c.length == 0) return [];
        if (!b) return c;
        var d = this._sizesResolverManager.offsetLeft(this._gridifier.getGrid());
        var f = this._sizesResolverManager.offsetTop(this._gridifier.getGrid());
        var g = this._sizesResolverManager.viewportDocumentCoords();
        var h = [];
        for (var i = 0; i < c.length; i++) {
            var j = this._connections.findConnectionByItem(c[i], true);
            if (j == null) continue;
            var k = false;
            var l = d + j.x1;
            var m = d + j.x2;
            var n = f + j.y1;
            var o = f + j.y2;
            var p = n < g.y1 && o < g.y1;
            var q = n > g.y2 && o > g.y2;
            var r = l < g.x1 && m < g.x1;
            var s = l > g.x2 && m > g.x2;
            if (p || q || r || s) k = true;
            if (!k) h.push(c[i]);
        }
        return h;
    };
    e.SilentRenderer.prototype.execute = function(a, b, c) {
        var d = function(a, b) {
            this.unscheduleForSilentRender(a, b);
            this._renderer.showConnections(b);
        };
        var f = this;
        if (typeof a != "undefined" && a != null && a) {
            a = this._collector.toDOMCollection(a);
            var g = [];
            for (var h = 0; h < a.length; h++) {
                if (this.isScheduledForSilentRender(a[h])) g.push(a[h]);
            }
            a = g;
            this._preUnscheduleForSilentRender(a);
        }
        var i = function(a, b, c) {
            if (typeof a == "undefined" || a == null || !a) {
                var e = this.getScheduledForSilentRenderItems();
            } else {
                var e = a;
            }
            if (e.length == 0) return;
            this._preUnscheduleForSilentRender(e);
            var g = [];
            for (var h = 0; h < e.length; h++) {
                var i = this._connections.findConnectionByItem(e[h], true);
                if (i != null) g.push(i);
            }
            var j = this._connections.getConnectionsSorter();
            g = j.sortConnectionsPerReappend(g);
            e = [];
            for (var h = 0; h < g.length; h++) e.push(g[h].item);
            if (typeof b == "undefined") {
                d.call(f, e, g);
                return;
            }
            if (typeof c == "undefined") var c = 100;
            var k = this._operationsQueue.splitItemsToBatches(e, b);
            var l = this._operationsQueue.splitItemsToBatches(g, b);
            for (var h = 0; h < k.length; h++) {
                (function(a, b, e) {
                    setTimeout(function() {
                        d.call(f, a, e);
                    }, c * b);
                })(k[h], h, l[h]);
            }
        };
        setTimeout(function() {
            i.call(f, a, b, c);
        }, e.REFLOW_OPTIMIZATION_TIMEOUT);
    };
    e.ApiSettingsParser = function(a, b) {
        var c = this;
        this._settingsCore = null;
        this._settings = null;
        this._css = {};
        this._construct = function() {
            c._settingsCore = a;
            c._settings = b;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.ApiSettingsParser.INITIAL_SETTING_MARKER = "initial";
    e.ApiSettingsParser.prototype.parseToggleOptions = function(a) {
        if (!this._settings.hasOwnProperty("toggle")) {
            a.setToggleFunction("scale");
            return;
        }
        if (typeof this._settings.toggle == "string" || this._settings.toggle instanceof String) {
            a.setToggleFunction(this._settings.toggle);
            return;
        }
        if (typeof this._settings.toggle != "object") {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_TOGGLE_PARAM_VALUE, this._settings.toggle);
        }
        for (var b in this._settings.toggle) {
            if (b == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
            var c = this._settings.toggle[b];
            if (typeof c != "object" || typeof c.show == "undefined" || typeof c.hide == "undefined") {
                new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_TOGGLE_PARAMS, c);
            }
            a.addToggleFunction(b, c);
        }
        if (this._settings.toggle.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setToggleFunction(this._settings.toggle[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setToggleFunction("scale");
    };
    e.ApiSettingsParser.prototype.parseSortOptions = function(a) {
        if (!this._settings.hasOwnProperty("sort")) {
            a.setSortFunction("default");
            return;
        }
        if (typeof this._settings.sort == "string" || this._settings.sort instanceof String) {
            a.setSortFunction(this._settings.sort);
            return;
        } else if (typeof this._settings.sort == "function") {
            a.addSortFunction("clientDefault", this._settings.sort);
            a.setSortFunction("clientDefault");
            return;
        } else if (typeof this._settings.sort == "object") {
            for (var b in this._settings.sort) {
                if (b == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
                var c = this._settings.sort[b];
                if (typeof c != "function") {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_SORT_FUNCTION_TYPES, c);
                }
                a.addSortFunction(b, c);
            }
            if (this._settings.sort.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setSortFunction(this._settings.sort[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setSortFunction("default");
            return;
        } else {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_SORT_PARAM_VALUE, this._settings.sort);
        }
    };
    e.ApiSettingsParser.prototype.parseRetransformSortOptions = function(a) {
        if (!this._settings.hasOwnProperty("retransformSort")) {
            a.setRetransformSortFunction("default");
            return;
        }
        if (!this._settingsCore.isCustomAllEmptySpaceSortDispersion()) {
            var b = "Gridifier error: retransformSort option is supported only with ";
            b += "'customAllEmptySpace' sortDispersion param.";
            throw new Error(b);
        }
        if (typeof this._settings.retransformSort == "string" || this._settings.retransformSort instanceof String) {
            a.setRetransformSortFunction(this._settings.retransformSort);
            return;
        } else if (typeof this._settings.retransformSort == "function") {
            a.addRetransformSortFunction("clientDefault", this._settings.retransformSort);
            a.setRetransformSortFunction("clientDefault");
            return;
        } else if (typeof this._settings.retransformSort == "object") {
            for (var c in this._settings.retransformSort) {
                if (c == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
                var d = this._settings.retransformSort[c];
                if (typeof d != "function") {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_RETRANSFORM_SORT_FUNCTION_TYPES, d);
                }
                a.addRetransformSortFunction(c, d);
            }
            if (this._settings.retransformSort.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setRetransformSortFunction(this._settings.retransformSort[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setRetransformSortFunction("default");
            return;
        } else {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_RETRANSFORM_SORT_PARAM_VALUE, this._settings.retransformSort);
        }
    };
    e.ApiSettingsParser.prototype.parseFilterOptions = function(a) {
        if (!this._settings.hasOwnProperty("filter")) {
            a.setFilterFunction("all");
            return;
        }
        if (typeof this._settings.filter == "string" || this._settings.filter instanceof String || d.isArray(this._settings.filter)) {
            a.setFilterFunction(this._settings.filter);
            return;
        } else if (typeof this._settings.filter == "function") {
            a.addFilterFunction("clientDefault", this._settings.filter);
            a.setFilterFunction("clientDefault");
            return;
        } else if (typeof this._settings.filter == "object") {
            for (var b in this._settings.filter) {
                if (b == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
                var c = this._settings.filter[b];
                if (typeof c != "function") {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_FILTER_FUNCTION_TYPES, c);
                }
                a.addFilterFunction(b, c);
            }
            if (this._settings.filter.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setFilterFunction(this._settings.filter[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setFilterFunction("all");
            return;
        } else {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_FILTER_PARAM_VALUE, this._settings.filter);
        }
    };
    e.ApiSettingsParser.prototype.parseCoordsChangerOptions = function(a) {
        if (!this._settings.hasOwnProperty("coordsChanger")) {
            a.setCoordsChangerFunction("CSS3Translate3DWithRounding");
            return;
        }
        if (typeof this._settings.coordsChanger == "string" || this._settings.coordsChanger instanceof String) {
            a.setCoordsChangerFunction(this._settings.coordsChanger);
            return;
        } else if (typeof this._settings.coordsChanger == "function") {
            a.addCoordsChangerFunction("clientDefault", this._settings.coordsChanger);
            a.setCoordsChangerFunction("clientDefault");
        } else if (typeof this._settings.coordsChanger == "object") {
            for (var b in this._settings.coordsChanger) {
                if (b == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
                var c = this._settings.coordsChanger[b];
                if (typeof c != "function") {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_COORDS_CHANGER_FUNCTION_TYPES, c);
                }
                a.addCoordsChangerFunction(b, c);
            }
            if (this._settings.coordsChanger.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setCoordsChangerFunction(this._settings.coordsChanger[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setCoordsChangerFunction("CSS3Translate3DWithRounding");
        } else {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_COORDS_CHANGER_PARAM_VALUE, this._settings.coordsChanger);
        }
    };
    e.ApiSettingsParser.prototype.parseSizesChangerOptions = function(a) {
        if (!this._settings.hasOwnProperty("sizesChanger")) {
            a.setSizesChangerFunction("default");
            return;
        }
        if (typeof this._settings.sizesChanger == "string" || this._settings.sizesChanger instanceof String) {
            a.setSizesChangerFunction(this._settings.sizesChanger);
            return;
        } else if (typeof this._settings.sizesChanger == "function") {
            a.addSizesChangerFunction("clientDefault", this._settings.sizesChanger);
            a.setSizesChangerFunction("clientDefault");
            return;
        } else if (typeof this._settings.sizesChanger == "object") {
            for (var b in this._settings.sizesChanger) {
                if (b == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
                var c = this._settings.sizesChanger[b];
                if (typeof c != "function") {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_SIZES_CHANGER_FUNCTION_TYPES, c);
                }
                a.addSizesChangerFunction(b, c);
            }
            if (this._settings.sizesChanger.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setSizesChangerFunction(this._settings.sizesChanger[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setSizesChangerFunction("default");
            return;
        } else {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_SIZES_CHANGER_PARAM_VALUE, this._settings.sizesChanger);
        }
    };
    e.ApiSettingsParser.prototype.parseDraggableItemDecoratorOptions = function(a) {
        if (!this._settings.hasOwnProperty("draggableItemDecorator") && !this._settings.hasOwnProperty("dragDecorator")) {
            a.setDraggableItemDecoratorFunction("cloneCSS");
            return;
        }
        if (this._settings.hasOwnProperty("dragDecorator")) this._settings.draggableItemDecorator = this._settings.dragDecorator;
        if (typeof this._settings.draggableItemDecorator == "string" || this._settings.draggableItemDecorator instanceof String) {
            a.setDraggableItemDecoratorFunction(this._settings.draggableItemDecorator);
            return;
        } else if (typeof this._settings.draggableItemDecorator == "function") {
            a.addDraggableItemDecoratorFunction("clientDefault", this._settings.draggableItemDecorator);
            a.setDraggableItemDecoratorFunction("clientDefault");
            return;
        } else if (typeof this._settings.draggableItemDecorator == "object") {
            for (var b in this._settings.draggableItemDecorator) {
                if (b == e.ApiSettingsParser.INITIAL_SETTING_MARKER) continue;
                var c = this._settings.draggableItemDecorator[b];
                if (typeof c != "function") {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ONE_OF_DRAGGABLE_ITEM_DECORATOR_FUNCTION_TYPES, c);
                }
                a.addDraggableItemDecoratorFunction(b, c);
            }
            if (this._settings.draggableItemDecorator.hasOwnProperty(e.ApiSettingsParser.INITIAL_SETTING_MARKER)) a.setDraggableItemDecoratorFunction(this._settings.draggableItemDecorator[e.ApiSettingsParser.INITIAL_SETTING_MARKER]); else a.setDraggableItemDecoratorFunction("cloneCSS");
            return;
        } else {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_DRAGGABLE_ITEM_DECORATOR_PARAM_VALUE, this._settings.draggableItemDecorator);
        }
    };
    e.CoreSettingsParser = function(a, b) {
        var c = this;
        this._settingsCore = null;
        this._settings = null;
        this._css = {};
        this._construct = function() {
            c._settingsCore = a;
            c._settings = b;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.CoreSettingsParser.prototype.parseGridType = function() {
        if (!this._settings.hasOwnProperty("gridType") && !this._settings.hasOwnProperty("grid")) {
            var a = e.GRID_TYPES.VERTICAL_GRID;
            return a;
        }
        if (this._settings.hasOwnProperty("grid")) this._settings.gridType = this._settings.grid;
        if (this._settings.gridType != e.GRID_TYPES.VERTICAL_GRID && this._settings.gridType != e.GRID_TYPES.HORIZONTAL_GRID && this._settings.gridType != e.GRID_TYPES.VERTICAL_GRID_SHORT && this._settings.gridType != e.GRID_TYPES.HORIZONTAL_GRID_SHORT) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_GRID_TYPE, this._settings.gridType);
        }
        var a = this._settings.gridType;
        return a;
    };
    e.CoreSettingsParser.prototype.parsePrependType = function() {
        if (!this._settings.hasOwnProperty("prependType") && !this._settings.hasOwnProperty("prepend")) {
            var a = e.PREPEND_TYPES.MIRRORED_PREPEND;
            return a;
        }
        if (this._settings.hasOwnProperty("prepend")) this._settings.prependType = this._settings.prepend;
        if (this._settings.prependType != e.PREPEND_TYPES.DEFAULT_PREPEND && this._settings.prependType != e.PREPEND_TYPES.REVERSED_PREPEND && this._settings.prependType != e.PREPEND_TYPES.MIRRORED_PREPEND && this._settings.prependType != e.PREPEND_TYPES.DEFAULT_PREPEND_SHORT && this._settings.prependType != e.PREPEND_TYPES.REVERSED_PREPEND_SHORT && this._settings.prependType != e.PREPEND_TYPES.MIRRORED_PREPEND_SHORT) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_PREPEND_TYPE, this._settings.prependType);
        }
        var a = this._settings.prependType;
        return a;
    };
    e.CoreSettingsParser.prototype.parseAppendType = function() {
        if (!this._settings.hasOwnProperty("appendType") && !this._settings.hasOwnProperty("append")) {
            if (this._settingsCore.isVerticalGrid()) var a = e.APPEND_TYPES.REVERSED_APPEND; else if (this._settingsCore.isHorizontalGrid()) var a = e.APPEND_TYPES.DEFAULT_APPEND;
            return a;
        }
        if (this._settings.hasOwnProperty("append")) this._settings.appendType = this._settings.append;
        if (this._settings.appendType != e.APPEND_TYPES.DEFAULT_APPEND && this._settings.appendType != e.APPEND_TYPES.REVERSED_APPEND && this._settings.appendType != e.APPEND_TYPES.DEFAULT_APPEND_SHORT && this._settings.appendType != e.APPEND_TYPES.REVERSED_APPEND_SHORT) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_APPEND_TYPE, this._settings.appendType);
        }
        if (this._settingsCore.isHorizontalGrid()) var a = this._settings.appendType; else if (this._settingsCore.isVerticalGrid()) {
            if (this._settings.appendType == e.APPEND_TYPES.DEFAULT_APPEND || this._settings.appendType == e.APPEND_TYPES.DEFAULT_APPEND_SHORT) a = e.APPEND_TYPES.REVERSED_APPEND; else if (this._settings.appendType == e.APPEND_TYPES.REVERSED_APPEND || this._settings.appendType == e.APPEND_TYPES.REVERSED_APPEND_SHORT) a = e.APPEND_TYPES.DEFAULT_APPEND;
        }
        return a;
    };
    e.CoreSettingsParser.prototype.parseIntersectionStrategy = function() {
        if (!this._settings.hasOwnProperty("intersectionStrategy") && !this._settings.hasOwnProperty("intersections") && !this._settings.hasOwnProperty("alignmentType") && !this._settings.hasOwnProperty("align")) {
            var a = e.INTERSECTION_STRATEGIES.DEFAULT;
            return a;
        }
        if (this._settings.hasOwnProperty("intersections")) this._settings.intersectionStrategy = this._settings.intersections;
        if (this._settings.hasOwnProperty("intersectionStrategy")) {
            if (this._settings.intersectionStrategy != e.INTERSECTION_STRATEGIES.DEFAULT && this._settings.intersectionStrategy != e.INTERSECTION_STRATEGIES.NO_INTERSECTIONS && this._settings.intersectionStrategy != e.INTERSECTION_STRATEGIES.DEFAULT_SHORT && this._settings.intersectionStrategy != e.INTERSECTION_STRATEGIES.NO_INTERSECTIONS_SHORT) {
                new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_INTERSECTION_STRATEGY, this._settings.intersectionStrategy);
            }
        }
        if (this._settings.hasOwnProperty("intersectionStrategy")) var a = this._settings.intersectionStrategy; else if (this._settings.hasOwnProperty("alignmentType") || this._settings.hasOwnProperty("align")) var a = e.INTERSECTION_STRATEGIES.NO_INTERSECTIONS; else var a = e.INTERSECTION_STRATEGIES.DEFAULT;
        return a;
    };
    e.CoreSettingsParser.prototype.parseIntersectionStrategyAlignmentType = function() {
        var a = e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES;
        if (!this._settings.hasOwnProperty("alignmentType") && !this._settings.hasOwnProperty("align")) {
            if (this._settingsCore.isVerticalGrid()) var b = a.FOR_VERTICAL_GRID.TOP; else if (this._settingsCore.isHorizontalGrid()) var b = a.FOR_HORIZONTAL_GRID.LEFT;
            return b;
        }
        if (this._settings.hasOwnProperty("alignmentType")) {
            this.ensureIsValidAlignmentType(this._settings.alignmentType);
            return this._settings.alignmentType;
        } else if (this._settings.hasOwnProperty("align")) {
            this.ensureIsValidAlignmentType(this._settings.align);
            return this._settings.align;
        }
    };
    e.CoreSettingsParser.prototype.ensureIsValidAlignmentType = function(a) {
        var b = e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES;
        if (this._settingsCore.isVerticalGrid()) {
            var c = [ b.FOR_VERTICAL_GRID.TOP, b.FOR_VERTICAL_GRID.CENTER, b.FOR_VERTICAL_GRID.BOTTOM ];
        } else if (this._settingsCore.isHorizontalGrid()) {
            var c = [ b.FOR_HORIZONTAL_GRID.LEFT, b.FOR_HORIZONTAL_GRID.CENTER, b.FOR_HORIZONTAL_GRID.RIGHT ];
        }
        var d = false;
        for (var f = 0; f < c.length; f++) {
            if (c[f] == a) return;
        }
        new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_ALIGNMENT_TYPE, a);
    };
    e.CoreSettingsParser.prototype.parseSortDispersionMode = function() {
        if (!this._settings.hasOwnProperty("sortDispersionMode") && !this._settings.hasOwnProperty("sortDispersion")) {
            var a = e.SORT_DISPERSION_MODES.DISABLED;
            return a;
        }
        if (this._settings.hasOwnProperty("sortDispersion")) this._settings.sortDispersionMode = this._settings.sortDispersion;
        if (this._settings.sortDispersionMode != e.SORT_DISPERSION_MODES.DISABLED && this._settings.sortDispersionMode != e.SORT_DISPERSION_MODES.CUSTOM && this._settings.sortDispersionMode != e.SORT_DISPERSION_MODES.CUSTOM_ALL_EMPTY_SPACE && this._settings.sortDispersionMode != e.SORT_DISPERSION_MODES.CUSTOM_ALL_EMPTY_SPACE_SHORT) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_SORT_DISPERSION_MODE, this._settings.sortDispersionMode);
        }
        var a = this._settings.sortDispersionMode;
        return a;
    };
    e.CoreSettingsParser.prototype.parseSortDispersionValue = function() {
        if (!this._settingsCore.isCustomSortDispersion()) return "";
        if (!this._settings.hasOwnProperty("sortDispersionValue")) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.MISSING_SORT_DISPERSION_VALUE);
        }
        var a = new RegExp(/[\d]+(px)/);
        if (!a.test(this._settings.sortDispersionValue)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_SORT_DISPERSION_VALUE, this._settings.sortDispersionValue);
        }
        var b = this._settings.sortDispersionValue;
        return b;
    };
    e.CoreSettingsParser.prototype.parseMaxInsertionRange = function() {
        if (!this._settings.hasOwnProperty("maxInsertionRange")) return e.VerticalGrid.ConnectorsCleaner.MAX_VALID_VERTICAL_DISTANCE.FROM_MOST_TOP_CONNECTOR;
        return this._settings.maxInsertionRange;
    };
    e.CoreSettingsParser.prototype.parseResizeTimeoutValue = function() {
        if (!this._settings.hasOwnProperty("resizeTimeout")) return null;
        return d.toInt(this._settings.resizeTimeout);
    };
    e.CoreSettingsParser.prototype.parseDisableItemHideOnGridAttachValue = function() {
        if (!this._settings.hasOwnProperty("disableItemHideOnGridAttach") && !this._settings.hasOwnProperty("hideItems")) return false;
        if (this._settings.hasOwnProperty("hideItems")) return this._settings.hideItems ? false : true;
        return this._settings.disableItemHideOnGridAttach;
    };
    e.CoreSettingsParser.prototype.parseToggleAnimationMsDuration = function() {
        if (!this._settings.hasOwnProperty("toggleAnimationMsDuration") && !this._settings.hasOwnProperty("toggleDuration")) return e.DEFAULT_TOGGLE_ANIMATION_MS_DURATION;
        if (this._settings.hasOwnProperty("toggleDuration")) this._settings.toggleAnimationMsDuration = this._settings.toggleDuration;
        return this._settings.toggleAnimationMsDuration;
    };
    e.CoreSettingsParser.prototype.parseCoordsChangeAnimationMsDuration = function() {
        if (!this._settings.hasOwnProperty("coordsChangeAnimationMsDuration") && !this._settings.hasOwnProperty("coordsChangeDuration")) return e.DEFAULT_COORDS_CHANGE_ANIMATION_MS_DURATION;
        if (this._settings.hasOwnProperty("coordsChangeDuration")) this._settings.coordsChangeAnimationMsDuration = this._settings.coordsChangeDuration;
        return this._settings.coordsChangeAnimationMsDuration;
    };
    e.CoreSettingsParser.prototype.parseToggleTransitionTiming = function() {
        if (!this._settings.hasOwnProperty("toggleTransitionTiming")) return e.DEFAULT_TOGGLE_TRANSITION_TIMING;
        return this._settings.toggleTransitionTiming;
    };
    e.CoreSettingsParser.prototype.parseCoordsChangeTransitionTiming = function() {
        if (!this._settings.hasOwnProperty("coordsChangeTransitionTiming")) return e.DEFAULT_COORDS_CHANGE_TRANSITION_TIMING;
        return this._settings.coordsChangeTransitionTiming;
    };
    e.CoreSettingsParser.prototype.parseRotatePerspective = function() {
        if (!this._settings.hasOwnProperty("rotatePerspective")) return e.DEFAULT_ROTATE_PERSPECTIVE;
        return this._settings.rotatePerspective;
    };
    e.CoreSettingsParser.prototype.parseRotateBackface = function() {
        if (!this._settings.hasOwnProperty("rotateBackface")) return e.DEFAULT_ROTATE_BACKFACE;
        return this._settings.rotateBackface;
    };
    e.CoreSettingsParser.prototype.parseRotateAngles = function() {
        if (!this._settings.hasOwnProperty("rotateAngles") || !d.isArray(this._settings.rotateAngles)) {
            return [ e.DEFAULT_ROTATE_ANGLES.FRONT_FRAME_INIT, e.DEFAULT_ROTATE_ANGLES.BACK_FRAME_INIT, e.DEFAULT_ROTATE_ANGLES.FRONT_FRAME_TARGET, e.DEFAULT_ROTATE_ANGLES.BACK_FRAME_TARGET ];
        }
        return this.parseRotateAnglesArray(this._settings.rotateAngles);
    };
    e.CoreSettingsParser.prototype.parseRotateAnglesArray = function(a) {
        return [ typeof a[0] != "undefined" ? a[0] : e.DEFAULT_ROTATE_ANGLES.FRONT_FRAME_INIT, typeof a[1] != "undefined" ? a[1] : e.DEFAULT_ROTATE_ANGLES.BACK_FRAME_INIT, typeof a[2] != "undefined" ? a[2] : e.DEFAULT_ROTATE_ANGLES.FRONT_FRAME_TARGET, typeof a[3] != "undefined" ? a[3] : e.DEFAULT_ROTATE_ANGLES.BACK_FRAME_TARGET ];
    };
    e.CoreSettingsParser.prototype.parseGridTransformType = function() {
        if (!this._settings.hasOwnProperty("gridTransformType")) return e.GRID_TRANSFORM_TYPES.FIT;
        if (this._settings.gridTransformType == e.GRID_TRANSFORM_TYPES.EXPAND) return e.GRID_TRANSFORM_TYPES.EXPAND; else if (this._settings.gridTransformType == e.GRID_TRANSFORM_TYPES.DISABLED) return e.GRID_TRANSFORM_TYPES.DISABLED; else return e.GRID_TRANSFORM_TYPES.FIT;
    };
    e.CoreSettingsParser.prototype.parseGridTransformTimeout = function() {
        if (!this._settings.hasOwnProperty("gridTransformTimeout")) return e.DEFAULT_GRID_TRANSFORM_TIMEOUT;
        return this._settings.gridTransformTimeout;
    };
    e.CoreSettingsParser.prototype.parseRetransformQueueBatchSize = function() {
        if (!this._settings.hasOwnProperty("retransformQueueBatchSize")) return e.RETRANSFORM_QUEUE_DEFAULT_BATCH_SIZE;
        return this._settings.retransformQueueBatchSize;
    };
    e.CoreSettingsParser.prototype.parseRetransformQueueBatchTimeout = function() {
        if (!this._settings.hasOwnProperty("retransformQueueBatchTimeout")) return e.RETRANSFORM_QUEUE_DEFAULT_BATCH_TIMEOUT;
        return this._settings.retransformQueueBatchTimeout;
    };
    e.CoreSettingsParser.prototype.parseGridItemMarkingStrategy = function() {
        if (!this._settings.hasOwnProperty(e.GRID_ITEM_MARKING_STRATEGIES.BY_CLASS) && !this._settings.hasOwnProperty(e.GRID_ITEM_MARKING_STRATEGIES.BY_DATA_ATTR) && !this._settings.hasOwnProperty(e.GRID_ITEM_MARKING_STRATEGIES.BY_QUERY)) {
            return {
                gridItemMarkingStrategyType: e.GRID_ITEM_MARKING_STRATEGIES.BY_DATA_ATTR,
                gridItemMarkingValue: e.GRID_ITEM_MARKING_DEFAULTS.DATA_ATTR
            };
        }
        if (this._settings.hasOwnProperty(e.GRID_ITEM_MARKING_STRATEGIES.BY_CLASS)) {
            return {
                gridItemMarkingStrategyType: e.GRID_ITEM_MARKING_STRATEGIES.BY_CLASS,
                gridItemMarkingValue: this._settings[e.GRID_ITEM_MARKING_STRATEGIES.BY_CLASS]
            };
        } else if (this._settings.hasOwnProperty(e.GRID_ITEM_MARKING_STRATEGIES.BY_DATA_ATTR)) {
            return {
                gridItemMarkingStrategyType: e.GRID_ITEM_MARKING_STRATEGIES.BY_DATA_ATTR,
                gridItemMarkingValue: this._settings[e.GRID_ITEM_MARKING_STRATEGIES.BY_DATA_ATTR]
            };
        } else if (this._settings.hasOwnProperty(e.GRID_ITEM_MARKING_STRATEGIES.BY_QUERY)) {
            return {
                gridItemMarkingStrategyType: e.GRID_ITEM_MARKING_STRATEGIES.BY_QUERY,
                gridItemMarkingValue: this._settings[e.GRID_ITEM_MARKING_STRATEGIES.BY_QUERY]
            };
        }
    };
    e.CoreSettingsParser.prototype.parseDragifierMode = function() {
        if (this._settings.hasOwnProperty("dragifierMode") && (this._settings.dragifierMode == e.DRAGIFIER_MODES.INTERSECTION || this._settings.dragifierMode == e.DRAGIFIER_MODES.DISCRETIZATION)) {
            if (this._settings.dragifierMode == e.DRAGIFIER_MODES.DISCRETIZATION) {
                if (this._settingsCore.isNoIntersectionsStrategy() || !this._settingsCore.isCustomAllEmptySpaceSortDispersion()) {
                    new e.Error(e.Error.ERROR_TYPES.SETTINGS.INVALID_DRAGIFIER_DISCRETIZATION_MODE);
                }
            }
            return this._settings.dragifierMode;
        }
        return e.DRAGIFIER_MODES.INTERSECTION;
    };
    e.CoreSettingsParser.prototype.parseDragifierSettings = function() {
        if (this._settings.hasOwnProperty("dragifier") && this._settings.dragifier) {
            var a = true;
            if (typeof this._settings.dragifier == "boolean") {
                var b = false;
            } else {
                var b = this._settings.dragifier;
            }
            return {
                shouldEnableDragifierOnInit: a,
                dragifierItemSelector: b
            };
        }
        var a = false;
        var b = false;
        return {
            shouldEnableDragifierOnInit: a,
            dragifierItemSelector: b
        };
    };
    e.CoreSettingsParser.prototype.parseDisableRetransformQueueOnDrags = function() {
        if (!this._settings.hasOwnProperty("disableRetransformQueueOnDrags")) {
            if (this._settingsCore.isIntersectionDragifierMode()) return true; else if (this._settingsCore.isDiscretizationDragifierMode()) return false;
        }
        return this._settings.disableRetransformQueueOnDrags;
    };
    e.CoreSettingsParser.prototype.parseCustomRepackSize = function() {
        if (!this._settings.hasOwnProperty("repackSize")) return null;
        return this._settings.repackSize;
    };
    e.CoreSettingsParser.prototype.parseResolveImages = function() {
        if (!this._settings.hasOwnProperty("resolveImages")) return false;
        return this._settings.resolveImages;
    };
    e.Settings = function(a, b, c, d, f) {
        var g = this;
        this._settings = null;
        this._gridifier = null;
        this._guid = null;
        this._collector = null;
        this._eventEmitter = null;
        this._sizesResolverManager = null;
        this._coreSettingsParser = null;
        this._apiSettingsParser = null;
        this._gridType = null;
        this._prependType = null;
        this._appendType = null;
        this._intersectionStrategy = null;
        this._alignmentType = null;
        this._sortDispersionMode = null;
        this._sortDispersionValue = null;
        this._maxInsertionRange = null;
        this._toggleApi = null;
        this._toggleTimeouterApi = null;
        this._sortApi = null;
        this._filterApi = null;
        this._coordsChangerApi = null;
        this._sizesChangerApi = null;
        this._dragifierApi = null;
        this._resizeTimeout = null;
        this._gridItemMarkingStrategyType = null;
        this._gridItemMarkingValue = null;
        this._dragifierMode = null;
        this._shouldEnableDragifierOnInit = false;
        this._dragifierItemSelector = null;
        this._shouldDisableItemHideOnGridAttach = false;
        this._toggleAnimationMsDuration = null;
        this._coordsChangeAnimationMsDuration = null;
        this._toggleTransitionTiming = null;
        this._coordsChangeTransitionTiming = null;
        this._rotatePerspective = null;
        this._rotateBackface = null;
        this._rotateAngles = null;
        this._gridTransformType = null;
        this._gridTransformTimeout = null;
        this._retransformQueueBatchSize = null;
        this._retransformQueueBatchTimeout = null;
        this._disableRetransformQueueOnDrags = false;
        this._repackSize = null;
        this._resolveImages = false;
        this._css = {};
        this._construct = function() {
            g._settings = a;
            g._gridifier = b;
            g._guid = c;
            g._eventEmitter = d;
            g._sizesResolverManager = f;
            g._coreSettingsParser = new e.CoreSettingsParser(g, g._settings);
            g._apiSettingsParser = new e.ApiSettingsParser(g, g._settings);
            g._toggleApi = new e.Api.Toggle(g, g._gridifier, g._eventEmitter, g._sizesResolverManager);
            g._toggleTimeouterApi = new e.Api.ToggleTimeouter();
            g._sortApi = new e.Api.Sort(g, g._gridifier, g._eventEmitter);
            g._filterApi = new e.Api.Filter(g, g._eventEmitter);
            g._coordsChangerApi = new e.Api.CoordsChanger(g, g._gridifier, g._eventEmitter);
            g._sizesChangerApi = new e.Api.SizesChanger(g, g._eventEmitter);
            g._dragifierApi = new e.Api.Dragifier();
            g._parse();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            g._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Settings.prototype.setCollectorInstance = function(a) {
        this._toggleApi.setCollectorInstance(a);
        this._collector = a;
    };
    e.Settings.prototype._parse = function() {
        this._gridType = this._coreSettingsParser.parseGridType();
        this._prependType = this._coreSettingsParser.parsePrependType();
        this._appendType = this._coreSettingsParser.parseAppendType();
        this._intersectionStrategy = this._coreSettingsParser.parseIntersectionStrategy();
        this._alignmentType = this._coreSettingsParser.parseIntersectionStrategyAlignmentType();
        this._sortDispersionMode = this._coreSettingsParser.parseSortDispersionMode();
        this._sortDispersionValue = this._coreSettingsParser.parseSortDispersionValue();
        this._maxInsertionRange = this._coreSettingsParser.parseMaxInsertionRange();
        this._resizeTimeout = this._coreSettingsParser.parseResizeTimeoutValue();
        this._shouldDisableItemHideOnGridAttach = this._coreSettingsParser.parseDisableItemHideOnGridAttachValue();
        this._toggleAnimationMsDuration = this._coreSettingsParser.parseToggleAnimationMsDuration();
        this._coordsChangeAnimationMsDuration = this._coreSettingsParser.parseCoordsChangeAnimationMsDuration();
        this._toggleTransitionTiming = this._coreSettingsParser.parseToggleTransitionTiming();
        this._coordsChangeTransitionTiming = this._coreSettingsParser.parseCoordsChangeTransitionTiming();
        this._rotatePerspective = this._coreSettingsParser.parseRotatePerspective();
        this._rotateBackface = this._coreSettingsParser.parseRotateBackface();
        this._rotateAngles = this._coreSettingsParser.parseRotateAngles();
        this._gridTransformType = this._coreSettingsParser.parseGridTransformType();
        this._gridTransformTimeout = this._coreSettingsParser.parseGridTransformTimeout();
        this._retransformQueueBatchSize = this._coreSettingsParser.parseRetransformQueueBatchSize();
        this._retransformQueueBatchTimeout = this._coreSettingsParser.parseRetransformQueueBatchTimeout();
        this._apiSettingsParser.parseToggleOptions(this._toggleApi);
        this._apiSettingsParser.parseSortOptions(this._sortApi);
        this._apiSettingsParser.parseRetransformSortOptions(this._sortApi);
        this._apiSettingsParser.parseFilterOptions(this._filterApi);
        this._apiSettingsParser.parseCoordsChangerOptions(this._coordsChangerApi);
        this._apiSettingsParser.parseSizesChangerOptions(this._sizesChangerApi);
        this._apiSettingsParser.parseDraggableItemDecoratorOptions(this._dragifierApi);
        var a = this._coreSettingsParser.parseGridItemMarkingStrategy();
        this._gridItemMarkingStrategyType = a.gridItemMarkingStrategyType;
        this._gridItemMarkingValue = a.gridItemMarkingValue;
        this._dragifierMode = this._coreSettingsParser.parseDragifierMode();
        var b = this._coreSettingsParser.parseDragifierSettings();
        this._shouldEnableDragifierOnInit = b.shouldEnableDragifierOnInit;
        this._dragifierItemSelector = b.dragifierItemSelector;
        this._disableRetransformQueueOnDrags = this._coreSettingsParser.parseDisableRetransformQueueOnDrags();
        this._repackSize = this._coreSettingsParser.parseCustomRepackSize();
        this._resolveImages = this._coreSettingsParser.parseResolveImages();
        var c = this;
        this._gridifier.setDefaultPrepend = function() {
            c.setDefaultPrepend.call(c);
        };
        this._gridifier.setReversedPrepend = function() {
            c.setReversedPrepend.call(c);
        };
        this._gridifier.setMirroredPrepend = function() {
            c.setMirroredPrepend.call(c);
        };
        this._gridifier.setDefaultAppend = function() {
            c.setDefaultAppend.call(c);
        };
        this._gridifier.setReversedAppend = function() {
            c.setReversedAppend.call(c);
        };
        this._gridifier.setDisabledSortDispersion = function() {
            c._sortDispersionMode = e.SORT_DISPERSION_MODES.DISABLED;
        };
        this._gridifier.setAllGridSortDispersion = function() {
            c._sortDispersionMode = e.SORT_DISPERSION_MODES.CUSTOM_ALL_EMPTY_SPACE_SHORT;
        };
    };
    e.Settings.prototype.parseAntialiasingSettings = function() {
        if (this._settings.hasOwnProperty("widthPtAntialias")) this._gridifier.setWidthPtAntialias(this._settings.widthPtAntialias);
        if (this._settings.hasOwnProperty("heightPtAntialias")) this._gridifier.setHeightPtAntialias(this._settings.heightPtAntialias);
        if (this._settings.hasOwnProperty("widthPxAntialias")) this._gridifier.setWidthPxAntialias(this._settings.widthPxAntialias);
        if (this._settings.hasOwnProperty("heightPxAntialias")) this._gridifier.setHeightPxAntialias(this._settings.heightPxAntialias);
    };
    e.Settings.prototype.setDefaultPrepend = function() {
        this._prependType = e.PREPEND_TYPES.DEFAULT_PREPEND;
    };
    e.Settings.prototype.setReversedPrepend = function() {
        this._prependType = e.PREPEND_TYPES.REVERSED_PREPEND;
    };
    e.Settings.prototype.setMirroredPrepend = function() {
        this._prependType = e.PREPEND_TYPES.MIRRORED_PREPEND;
    };
    e.Settings.prototype.setDefaultAppend = function() {
        if (this.isVerticalGrid()) this._appendType = e.APPEND_TYPES.REVERSED_APPEND; else if (this.isHorizontalGrid()) this._appendType = e.APPEND_TYPES.DEFAULT_APPEND;
    };
    e.Settings.prototype.setReversedAppend = function() {
        if (this.isVerticalGrid()) this._appendType = e.APPEND_TYPES.DEFAULT_APPEND; else if (this.isHorizontalGrid()) this._appendType = e.APPEND_TYPES.REVERSED_APPEND;
    };
    e.Settings.prototype.getCollector = function() {
        return this._collector;
    };
    e.Settings.prototype.getEventEmitter = function() {
        return this._eventEmitter;
    };
    e.Settings.prototype.getSizesResolverManager = function() {
        return this._sizesResolverManager;
    };
    e.Settings.prototype.getCoordsChangerApi = function() {
        return this._coordsChangerApi;
    };
    e.Settings.prototype.getSortApi = function() {
        return this._sortApi;
    };
    e.Settings.prototype.getResizeTimeout = function() {
        return this._resizeTimeout;
    };
    e.Settings.prototype.getToggleAnimationMsDuration = function() {
        return this._toggleAnimationMsDuration;
    };
    e.Settings.prototype.getCoordsChangeAnimationMsDuration = function() {
        return this._coordsChangeAnimationMsDuration;
    };
    e.Settings.prototype.getToggleTransitionTiming = function() {
        return this._toggleTransitionTiming;
    };
    e.Settings.prototype.getCoordsChangeTransitionTiming = function() {
        return this._coordsChangeTransitionTiming;
    };
    e.Settings.prototype.setToggleTransitionTiming = function(a) {
        this._toggleTransitionTiming = a;
    };
    e.Settings.prototype.setCoordsChangeTransitionTiming = function(a) {
        this._coordsChangeTransitionTiming = a;
    };
    e.Settings.prototype.setToggleAnimationMsDuration = function(a) {
        this._toggleAnimationMsDuration = a;
    };
    e.Settings.prototype.setCoordsChangeAnimationMsDuration = function(a) {
        this._coordsChangeAnimationMsDuration = a;
    };
    e.Settings.prototype.getRotatePerspective = function() {
        return this._rotatePerspective;
    };
    e.Settings.prototype.getRotateBackface = function() {
        return this._rotateBackface;
    };
    e.Settings.prototype.getRotateAngles = function() {
        return this._rotateAngles;
    };
    e.Settings.prototype.setRotatePerspective = function(a) {
        this._rotatePerspective = a;
    };
    e.Settings.prototype.setRotateAngles = function(a) {
        this._rotateAngles = this._coreSettingsParser.parseRotateAnglesArray(a);
    };
    e.Settings.prototype.setRotateBackface = function(a) {
        this._rotateBackface = a;
    };
    e.Settings.prototype.setSortDispersionValue = function(a) {
        this._sortDispersionValue = a;
    };
    e.Settings.prototype.getMaxInsertionRange = function() {
        return this._maxInsertionRange;
    };
    e.Settings.prototype.isExpandGridTransformType = function() {
        return this._gridTransformType == e.GRID_TRANSFORM_TYPES.EXPAND;
    };
    e.Settings.prototype.isFitGridTransformType = function() {
        return this._gridTransformType == e.GRID_TRANSFORM_TYPES.FIT;
    };
    e.Settings.prototype.getGridTransformTimeout = function() {
        return this._gridTransformTimeout;
    };
    e.Settings.prototype.getRetransformQueueBatchSize = function() {
        return this._retransformQueueBatchSize;
    };
    e.Settings.prototype.getRetransformQueueBatchTimeout = function() {
        return this._retransformQueueBatchTimeout;
    };
    e.Settings.prototype.setRetransformQueueBatchSize = function(a) {
        this._retransformQueueBatchSize = a;
    };
    e.Settings.prototype.setRetransformQueueTimeout = function(a) {
        this._retransformQueueTimeout = a;
    };
    e.Settings.prototype.shouldDisableRetransformQueueOnDrags = function() {
        return this._disableRetransformQueueOnDrags;
    };
    e.Settings.prototype.getToggleTimeouter = function() {
        return this._toggleTimeouterApi;
    };
    e.Settings.prototype.getDraggableItemCoordsChanger = function() {
        return this._dragifierApi.getDraggableItemCoordsChanger();
    };
    e.Settings.prototype.getDraggableItemPointerDecorator = function() {
        return this._dragifierApi.getDraggableItemPointerDecorator();
    };
    e.Settings.prototype.getDragifierUserSelectToggler = function() {
        return this._dragifierApi.getDragifierUserSelectToggler();
    };
    e.Settings.prototype.isVerticalGrid = function() {
        return this._gridType == e.GRID_TYPES.VERTICAL_GRID || this._gridType == e.GRID_TYPES.VERTICAL_GRID_SHORT;
    };
    e.Settings.prototype.isHorizontalGrid = function() {
        return this._gridType == e.GRID_TYPES.HORIZONTAL_GRID || this._gridType == e.GRID_TYPES.HORIZONTAL_GRID_SHORT;
    };
    e.Settings.prototype.isDefaultPrepend = function() {
        return this._prependType == e.PREPEND_TYPES.DEFAULT_PREPEND || this._prependType == e.PREPEND_TYPES.DEFAULT_PREPEND_SHORT;
    };
    e.Settings.prototype.isReversedPrepend = function() {
        return this._prependType == e.PREPEND_TYPES.REVERSED_PREPEND || this._prependType == e.PREPEND_TYPES.REVERSED_PREPEND_SHORT;
    };
    e.Settings.prototype.isMirroredPrepend = function() {
        return this._prependType == e.PREPEND_TYPES.MIRRORED_PREPEND || this._prependType == e.PREPEND_TYPES.MIRRORED_PREPEND_SHORT;
    };
    e.Settings.prototype.isDefaultAppend = function() {
        return this._appendType == e.APPEND_TYPES.DEFAULT_APPEND || this._appendType == e.APPEND_TYPES.DEFAULT_APPEND_SHORT;
    };
    e.Settings.prototype.isReversedAppend = function() {
        return this._appendType == e.APPEND_TYPES.REVERSED_APPEND || this._appendType == e.APPEND_TYPES.REVERSED_APPEND_SHORT;
    };
    e.Settings.prototype.isDefaultIntersectionStrategy = function() {
        return this._intersectionStrategy == e.INTERSECTION_STRATEGIES.DEFAULT || this._intersectionStrategy == e.INTERSECTION_STRATEGIES.DEFAULT_SHORT;
    };
    e.Settings.prototype.isNoIntersectionsStrategy = function() {
        return this._intersectionStrategy == e.INTERSECTION_STRATEGIES.NO_INTERSECTIONS || this._intersectionStrategy == e.INTERSECTION_STRATEGIES.NO_INTERSECTIONS_SHORT;
    };
    e.Settings.prototype.isVerticalGridTopAlignmentType = function() {
        return this._alignmentType == e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES.FOR_VERTICAL_GRID.TOP;
    };
    e.Settings.prototype.isVerticalGridCenterAlignmentType = function() {
        return this._alignmentType == e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES.FOR_VERTICAL_GRID.CENTER;
    };
    e.Settings.prototype.isVerticalGridBottomAlignmentType = function() {
        return this._alignmentType == e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES.FOR_VERTICAL_GRID.BOTTOM;
    };
    e.Settings.prototype.isHorizontalGridLeftAlignmentType = function() {
        return this._alignmentType == e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES.FOR_HORIZONTAL_GRID.LEFT;
    };
    e.Settings.prototype.isHorizontalGridCenterAlignmentType = function() {
        return this._alignmentType == e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES.FOR_HORIZONTAL_GRID.CENTER;
    };
    e.Settings.prototype.isHorizontalGridRightAlignmentType = function() {
        return this._alignmentType == e.INTERSECTION_STRATEGY_ALIGNMENT_TYPES.FOR_HORIZONTAL_GRID.RIGHT;
    };
    e.Settings.prototype.isDisabledSortDispersion = function() {
        return this._sortDispersionMode == e.SORT_DISPERSION_MODES.DISABLED;
    };
    e.Settings.prototype.isCustomSortDispersion = function() {
        return this._sortDispersionMode == e.SORT_DISPERSION_MODES.CUSTOM;
    };
    e.Settings.prototype.isCustomAllEmptySpaceSortDispersion = function() {
        return this._sortDispersionMode == e.SORT_DISPERSION_MODES.CUSTOM_ALL_EMPTY_SPACE || this._sortDispersionMode == e.SORT_DISPERSION_MODES.CUSTOM_ALL_EMPTY_SPACE_SHORT;
    };
    e.Settings.prototype.getSortDispersionValue = function() {
        return this._sortDispersionValue;
    };
    e.Settings.prototype.shouldDisableItemHideOnGridAttach = function() {
        return this._shouldDisableItemHideOnGridAttach;
    };
    e.Settings.prototype.setToggle = function(a) {
        this._toggleApi.setToggleFunction(a);
    };
    e.Settings.prototype.setFilter = function(a) {
        this._filterApi.setFilterFunction(a);
    };
    e.Settings.prototype.setSort = function(a) {
        this._sortApi.setSortFunction(a);
    };
    e.Settings.prototype.setRetransformSort = function(a) {
        this._sortApi.setRetransformSortFunction(a);
    };
    e.Settings.prototype.getToggle = function() {
        return this._toggleApi.getToggleFunction();
    };
    e.Settings.prototype.getSort = function() {
        return this._sortApi.getSortFunction();
    };
    e.Settings.prototype.getRetransformSort = function() {
        return this._sortApi.getRetransformSortFunction();
    };
    e.Settings.prototype.getFilter = function() {
        return this._filterApi.getFilterFunction();
    };
    e.Settings.prototype.setCoordsChanger = function(a) {
        this._coordsChangerApi.setCoordsChangerFunction(a);
    };
    e.Settings.prototype.setSizesChanger = function(a) {
        this._sizesChangerApi.setSizesChangerFunction(a);
    };
    e.Settings.prototype.setDraggableItemDecorator = function(a) {
        this._dragifierApi.setDraggableItemDecoratorFunction(a);
    };
    e.Settings.prototype.getCoordsChanger = function() {
        return this._coordsChangerApi.getCoordsChangerFunction();
    };
    e.Settings.prototype.getSizesChanger = function() {
        return this._sizesChangerApi.getSizesChangerFunction();
    };
    e.Settings.prototype.getDraggableItemDecorator = function() {
        return this._dragifierApi.getDraggableItemDecoratorFunction();
    };
    e.Settings.prototype.isByClassGridItemMarkingStrategy = function() {
        return this._gridItemMarkingStrategyType == e.GRID_ITEM_MARKING_STRATEGIES.BY_CLASS;
    };
    e.Settings.prototype.isByDataAttrGridItemMarkingStrategy = function() {
        return this._gridItemMarkingStrategyType == e.GRID_ITEM_MARKING_STRATEGIES.BY_DATA_ATTR;
    };
    e.Settings.prototype.isByQueryGridItemMarkingStrategy = function() {
        return this._gridItemMarkingStrategyType == e.GRID_ITEM_MARKING_STRATEGIES.BY_QUERY;
    };
    e.Settings.prototype.getGridItemMarkingType = function() {
        return this._gridItemMarkingValue;
    };
    e.Settings.prototype.getGridItemMarkingValue = function() {
        return this._gridItemMarkingValue;
    };
    e.Settings.prototype.isIntersectionDragifierMode = function() {
        return this._dragifierMode == e.DRAGIFIER_MODES.INTERSECTION;
    };
    e.Settings.prototype.isDiscretizationDragifierMode = function() {
        return this._dragifierMode == e.DRAGIFIER_MODES.DISCRETIZATION;
    };
    e.Settings.prototype.shouldEnableDragifierOnInit = function() {
        return this._shouldEnableDragifierOnInit;
    };
    e.Settings.prototype.getDragifierItemSelector = function() {
        return this._dragifierItemSelector;
    };
    e.Settings.prototype.setNoIntersectionStrategy = function() {
        if (this._dragifierMode == e.DRAGIFIER_MODES.DISCRETIZATION) {
            throw new Error("Gridifier error: discretization dragifier is not compatible with no insersections strategy");
            return;
        }
        this._intersectionStrategy = e.INTERSECTION_STRATEGIES.NO_INTERSECTIONS;
    };
    e.Settings.prototype.setDefaultIntersectionStrategy = function() {
        this._intersectionStrategy = e.INTERSECTION_STRATEGIES.DEFAULT;
    };
    e.Settings.prototype.setAlignmentType = function(a) {
        this._coreSettingsParser.ensureIsValidAlignmentType(a);
        this._alignmentType = a;
    };
    e.Settings.prototype.setCustomRepackSize = function(a) {
        this._repackSize = a;
    };
    e.Settings.prototype.hasCustomRepackSize = function() {
        return this._repackSize != null;
    };
    e.Settings.prototype.getCustomRepackSize = function() {
        return this._repackSize;
    };
    e.Settings.prototype.shouldResolveImages = function() {
        return this._resolveImages;
    };
    e.SizesTransformer.EmptySpaceNormalizer = function(a, b, c) {
        var d = this;
        this._connections = null;
        this._connectors = null;
        this._settings = null;
        this._css = {};
        this._construct = function() {
            d._connections = a;
            d._connectors = b;
            d._settings = c;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.EmptySpaceNormalizer.prototype.normalizeFreeSpace = function() {
        if (this._settings.isVerticalGrid()) this._applyNoIntersectionsStrategyTopFreeSpaceFixOnPrependedItemTransform(); else if (this._settings.isHorizontalGrid()) this._applyNoIntersectionsStrategyLeftFreeSpaceFixOnPrependedItemTransform();
    };
    e.SizesTransformer.EmptySpaceNormalizer.prototype._applyNoIntersectionsStrategyTopFreeSpaceFixOnPrependedItemTransform = function() {
        var a = this._connections.get();
        for (var b = 0; b < a.length; b++) {
            if (a[b].y1 == 0) return;
        }
        var c = null;
        for (var b = 0; b < a.length; b++) {
            if (c == null) c = a[b].y1; else {
                if (a[b].y1 < c) c = a[b].y1;
            }
        }
        var d = c;
        for (var b = 0; b < a.length; b++) {
            a[b].y1 -= d;
            a[b].y2 -= d;
        }
    };
    e.SizesTransformer.EmptySpaceNormalizer.prototype._applyNoIntersectionsStrategyLeftFreeSpaceFixOnPrependedItemTransform = function() {
    };
    e.SizesTransformer.ItemNewPxSizesFinder = function(a, b, c, d) {
        var e = this;
        e._gridifier = null;
        e._collector = null;
        e._connections = null;
        e._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            e._gridifier = a;
            e._collector = b;
            e._connections = c;
            e._sizesResolverManager = d;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            e._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.ItemNewPxSizesFinder.prototype.calculateNewPxSizesPerAllTransformedItems = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = this._calculateNewPxSizesPerConnectionItem(a[b].connectionToTransform.item, a[b].widthToTransform, a[b].heightToTransform, a[b].usePaddingBottomInsteadHeight);
            a[b].pxWidthToTransform = c.width;
            a[b].pxHeightToTransform = c.height;
        }
        return a;
    };
    e.SizesTransformer.ItemNewPxSizesFinder.prototype._calculateNewPxSizesPerConnectionItem = function(a, b, c, e) {
        var f = a.cloneNode();
        this._collector.markItemAsRestrictedToCollect(f);
        this._sizesResolverManager.unmarkAsCached(f);
        d.css.set(f, {
            position: "absolute",
            top: "0px",
            left: "-90000px",
            visibility: "hidden",
            width: b,
            height: e ? 0 : c
        });
        if (e) f.style.paddingBottom = c;
        this._gridifier.getGrid().appendChild(f);
        var g = {
            width: this._sizesResolverManager.outerWidth(f, true),
            height: this._sizesResolverManager.outerHeight(f, true)
        };
        this._gridifier.getGrid().removeChild(f);
        return g;
    };
    e.SizesTransformer.ItemNewRawSizesFinder = function(a) {
        var b = this;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            b._sizesResolverManager = a;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.ItemNewRawSizesFinder.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_DATA_ATTR = "data-toggle-sizes-item-sizes-are-toggled";
    e.SizesTransformer.ItemNewRawSizesFinder.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_CLASS = "gridifier-toggled-item";
    e.SizesTransformer.ItemNewRawSizesFinder.TOGGLE_SIZES_ORIGINAL_WIDTH_DATA_ATTR = "data-toggle-sizes-original-width";
    e.SizesTransformer.ItemNewRawSizesFinder.TOGGLE_SIZES_ORIGINAL_HEIGHT_DATA_ATTR = "data-toggle-sizes-original-height";
    e.SizesTransformer.ItemNewRawSizesFinder.EMPTY_DATA_ATTR_VALUE = "gridifier-data";
    e.SizesTransformer.ItemNewRawSizesFinder.prototype.initConnectionTransform = function(a, b, c, f) {
        var g = {};
        var h = {
            width: 0,
            height: 1,
            paddingBottom: 2
        };
        var i = this;
        var j = function(b, c) {
            var f = new RegExp(/^\*(\d*\.?\d*)$/);
            var g = new RegExp(/^\/(\d*\.?\d*)$/);
            var j = new RegExp(/(^\d*\.?\d*)(px|%)$/);
            var k = new RegExp(/^\d*\.?\d*$/);
            if (typeof b != "undefined" && typeof b != "boolean" && typeof b != null) {
                var l = 0;
                if (b.search(",") !== -1) {
                    var m = b.split(",");
                    b = m[0];
                    l = d.toInt(m[1]);
                }
                if (f.test(b)) {
                    var n = i._getItemRawSize(a.item, c, h);
                    var o = j.exec(n);
                    var p = f.exec(b)[1];
                    return o[1] * p + l + o[2];
                }
                if (g.test(b)) {
                    var n = i._getItemRawSize(a.item, c, h);
                    var o = j.exec(n);
                    var q = g.exec(b)[1];
                    return o[1] / q + l + o[2];
                }
                if (j.test(b)) return b;
                if (k.test(b)) return b + "px";
                new e.Error(e.Error.ERROR_TYPES.SIZES_TRANSFORMER.WRONG_TARGET_TRANSFORMATION_SIZES, b);
            }
            return i._getItemRawSize(a.item, c, h);
        };
        g.targetWidth = j(b, h.width);
        if (!f) g.targetHeight = j(c, h.height); else g.targetHeight = j(c, h.paddingBottom);
        return g;
    };
    e.SizesTransformer.ItemNewRawSizesFinder.prototype._getItemRawSize = function(b, c, d) {
        var e = a.getComputedCSSWithMaybePercentageSizes(b);
        if (c == d.width) {
            if (a.hasPercentageCSSValue("width", b, e)) return a.getPercentageCSSValue("width", b, e); else return this._sizesResolverManager.outerWidth(b) + "px";
        } else if (c == d.height) {
            if (a.hasPercentageCSSValue("height", b, e)) return a.getPercentageCSSValue("height", b, e); else return this._sizesResolverManager.outerHeight(b) + "px";
        } else if (c == d.paddingBottom) {
            if (a.hasPercentageCSSValue("paddingBottom", b, e)) return a.getPercentageCSSValue("paddingBottom", b, e); else return e.paddingBottom;
        }
    };
    e.SizesTransformer.ItemNewRawSizesFinder.prototype.areConnectionSizesToggled = function(a) {
        var b = e.SizesTransformer.ItemNewRawSizesFinder;
        if (d.hasAttribute(a.item, b.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_DATA_ATTR)) return true;
        return false;
    };
    e.SizesTransformer.ItemNewRawSizesFinder.prototype.getConnectionSizesPerUntoggle = function(a) {
        var b = e.SizesTransformer.ItemNewRawSizesFinder;
        var c = {};
        c.targetWidth = a.item.getAttribute(b.TOGGLE_SIZES_ORIGINAL_WIDTH_DATA_ATTR);
        c.targetHeight = a.item.getAttribute(b.TOGGLE_SIZES_ORIGINAL_HEIGHT_DATA_ATTR);
        return c;
    };
    e.SizesTransformer.ItemNewRawSizesFinder.prototype.markConnectionPerToggle = function(a, b) {
        var c = e.SizesTransformer.ItemNewRawSizesFinder;
        a.item.setAttribute(c.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_DATA_ATTR, c.EMPTY_DATA_ATTR_VALUE);
        d.css.addClass(a.item, c.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_CLASS);
        var f = {
            width: 0,
            height: 1,
            paddingBottom: 2
        };
        var g = this._getItemRawSize(a.item, f.width, f);
        if (!b) var h = this._getItemRawSize(a.item, f.height, f); else var h = this._getItemRawSize(a.item, f.paddingBottom, f);
        a.item.setAttribute(c.TOGGLE_SIZES_ORIGINAL_WIDTH_DATA_ATTR, g);
        a.item.setAttribute(c.TOGGLE_SIZES_ORIGINAL_HEIGHT_DATA_ATTR, h);
    };
    e.SizesTransformer.ItemNewRawSizesFinder.prototype.unmarkConnectionPerToggle = function(a) {
        var b = e.SizesTransformer.ItemNewRawSizesFinder;
        a.item.removeAttribute(b.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_DATA_ATTR);
        a.item.removeAttribute(b.TOGGLE_SIZES_ORIGINAL_WIDTH_DATA_ATTR);
        a.item.removeAttribute(b.TOGGLE_SIZES_ORIGINAL_HEIGHT_DATA_ATTR);
        d.css.removeClass(a.item, b.TOGGLE_SIZES_TOGGLED_ITEM_SIZES_CLASS);
    };
    e.SizesTransformer.ItemsReappender = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        var o = this;
        this._gridifier = null;
        this._appender = null;
        this._reversedAppender = null;
        this._connections = null;
        this._connectors = null;
        this._connectorsCleaner = null;
        this._connectorsSelector = null;
        this._transformerConnectors = null;
        this._settings = null;
        this._guid = null;
        this._transformedItemMarker = null;
        this._emptySpaceNormalizer = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._reappendQueue = null;
        this._reappendNextQueuedItemsBatchTimeout = null;
        this._reappendedQueueData = null;
        this._reappendStartGridX2 = 0;
        this._reappendStartGridY2 = 0;
        this._reappendStartViewportWidth = null;
        this._reappendStartViewportHeight = null;
        this._css = {};
        this._construct = function() {
            o._gridifier = a;
            o._appender = b;
            o._reversedAppender = c;
            o._connections = d;
            o._connectors = e;
            o._connectorsCleaner = f;
            o._connectorsSelector = g;
            o._transformerConnectors = h;
            o._settings = i;
            o._guid = j;
            o._transformedItemMarker = k;
            o._emptySpaceNormalizer = l;
            o._sizesResolverManager = m;
            o._eventEmitter = n;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            o._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.ItemsReappender.prototype.isReversedAppendShouldBeUsedPerItemInsert = function(a) {
        if (this._settings.isDefaultAppend()) return false; else if (this._settings.isReversedAppend()) return true;
    };
    e.SizesTransformer.ItemsReappender.prototype.createReappendQueue = function(a, b) {
        this._reappendQueue = [];
        this._reappendedQueueData = [];
        for (var c = 0; c < b.length; c++) {
            this._reappendQueue.push({
                itemToReappend: a[c],
                connectionToReappend: b[c]
            });
        }
    };
    e.SizesTransformer.ItemsReappender.prototype.isReappendQueueEmpty = function() {
        return this._reappendNextQueuedItemsBatchTimeout == null ? true : false;
    };
    e.SizesTransformer.ItemsReappender.prototype.stopReappendingQueuedItems = function() {
        clearTimeout(this._reappendNextQueuedItemsBatchTimeout);
        this._reappendNextQueuedItemsBatchTimeout = null;
        return {
            reappendQueue: this._reappendQueue,
            reappendedQueueData: this._reappendedQueueData
        };
    };
    e.SizesTransformer.ItemsReappender.prototype.getQueuedConnectionsPerTransform = function() {
        var a = [];
        for (var b = 0; b < this._reappendQueue.length; b++) {
            a.push(this._reappendQueue[b].connectionToReappend);
        }
        return a;
    };
    e.SizesTransformer.ItemsReappender.prototype.startReappendingQueuedItems = function() {
        this._reappendStartGridX2 = this._gridifier.getGridX2();
        this._reappendStartGridY2 = this._gridifier.getGridY2();
        this._reappendStartViewportWidth = this._sizesResolverManager.viewportWidth();
        this._reappendStartViewportHeight = this._sizesResolverManager.viewportHeight();
        this._reappendNextQueuedItemsBatch();
    };
    e.SizesTransformer.ItemsReappender.prototype._reappendNextQueuedItemsBatch = function(a) {
        var b = this._settings.getRetransformQueueBatchSize();
        if (b > this._reappendQueue.length) b = this._reappendQueue.length;
        this._sizesResolverManager.startCachingTransaction();
        var c = a || false;
        var d = true;
        if (c) {
            if (this._settings.isVerticalGrid()) {
                if (this._reappendStartGridX2 != this._gridifier.getGridX2()) d = false;
                if (this._sizesResolverManager.viewportWidth() != this._reappendStartViewportWidth) d = false;
            } else if (this._settings.isHorizontalGrid()) {
                if (this._reappendStartGridY2 != this._gridifier.getGridY2()) {
                    d = false;
                }
                if (this._sizesResolverManager.viewportHeight() != this._reappendStartViewportHeight) d = false;
            }
        }
        if (!d) {
            this._sizesResolverManager.stopCachingTransaction();
            return;
        }
        var f = [];
        for (var g = 0; g < b; g++) {
            var h = this._reappendQueue[g].itemToReappend;
            if (this.isReversedAppendShouldBeUsedPerItemInsert(h)) var i = e.APPEND_TYPES.REVERSED_APPEND; else var i = e.APPEND_TYPES.DEFAULT_APPEND;
            this._reappendItem(i, h);
            if (this._settings.isVerticalGrid()) this._connectorsCleaner.deleteAllIntersectedFromBottomConnectors(); else if (this._settings.isHorizontalGrid()) this._connectorsCleaner.deleteAllIntersectedFromRightConnectors();
            f.push(this._guid.getItemGUID(h));
        }
        this._sizesResolverManager.stopCachingTransaction();
        var j = this._connections.getConnectionsByItemGUIDS(f);
        this._gridifier.getResponsiveClassesManager().emitTransformEvents(j);
        this._gridifier.getRenderer().renderTransformedConnections(j);
        this._reappendedQueueData = this._reappendedQueueData.concat(this._reappendQueue.splice(0, b));
        if (this._reappendQueue.length == 0) {
            this._eventEmitter.emitItemsReappendExecutionEndPerDragifier();
            this._eventEmitter.emitGridRetransformEvent();
            this._reappendNextQueuedItemsBatchTimeout = null;
            return;
        }
        var k = this;
        var l = this._settings.getRetransformQueueBatchTimeout();
        this._reappendNextQueuedItemsBatchTimeout = setTimeout(function() {
            k._reappendNextQueuedItemsBatch.call(k, true);
        }, l);
    };
    e.SizesTransformer.ItemsReappender.prototype._reappendItem = function(a, b) {
        if (a == e.APPEND_TYPES.REVERSED_APPEND) {
            this._reversedAppender.reversedAppend(b);
        } else if (a == e.APPEND_TYPES.DEFAULT_APPEND) {
            this._appender.append(b);
        }
    };
    e.SizesTransformer.ItemsToReappendFinder = function(a, b, c) {
        var d = this;
        d._connections = null;
        d._connectionsSorter = null;
        d._settings = null;
        this._css = {};
        this._construct = function() {
            d._connections = a;
            d._connectionsSorter = b;
            d._settings = c;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.ItemsToReappendFinder.prototype.findAllOnSizesTransform = function(a, b) {
        var c = this._connections.get();
        for (var d = 0; d < c.length; d++) {
            if (c[d][e.SizesTransformer.RESTRICT_CONNECTION_COLLECT]) continue;
            if (this._settings.isDisabledSortDispersion() && this._settings.isDefaultIntersectionStrategy()) {
                if (c[d].itemGUID >= b.itemGUID) {
                    a.push(c[d]);
                    c.splice(d, 1);
                    d--;
                }
            } else if (this._settings.isNoIntersectionsStrategy()) {
                if (this._settings.isVerticalGrid()) {
                    var f = c[d].y2 >= b.y1;
                } else if (this._settings.isHorizontalGrid()) {
                    var f = c[d].x2 >= b.x1;
                }
                if (f) {
                    a.push(c[d]);
                    c.splice(d, 1);
                    d--;
                }
            } else if (this._settings.isCustomSortDispersion() || this._settings.isCustomAllEmptySpaceSortDispersion()) {
                if (this._settings.isVerticalGrid()) {
                    if (this._settings.isDefaultAppend()) {
                        var f = c[d].y1 > b.y1 || c[d].y1 == b.y1 && c[d].x1 <= b.x2;
                    } else if (this._settings.isReversedAppend()) {
                        var f = c[d].y1 > b.y1 || c[d].y1 == b.y1 && c[d].x1 >= b.x1;
                    }
                } else if (this._settings.isHorizontalGrid()) {
                    if (this._settings.isDefaultAppend()) {
                        var f = c[d].x1 > b.x1 || c[d].x1 == b.x1 && c[d].y1 >= b.y1;
                    } else if (this._settings.isReversedAppend()) {
                        var f = c[d].x1 > b.x1 || c[d].x1 == b.x1 && c[d].y1 <= b.y2;
                    }
                }
                if (f) {
                    a.push(c[d]);
                    c.splice(d, 1);
                    d--;
                }
            }
        }
        var g = this._connectionsSorter.sortConnectionsPerReappend(a);
        var h = [];
        for (var d = 0; d < g.length; d++) {
            h.push(g[d].item);
        }
        return {
            itemsToReappend: h,
            connectionsToReappend: a,
            firstConnectionToReappend: g[0]
        };
    };
    e.SizesTransformer.Core = function(a, b, c, d, f, g, h, i, j, k, l, m, n) {
        var o = this;
        this._gridifier = null;
        this._settings = null;
        this._collector = null;
        this._connectors = null;
        this._connections = null;
        this._connectionsSorter = null;
        this._guid = null;
        this._appender = null;
        this._reversedAppender = null;
        this._normalizer = null;
        this._operation = null;
        this._sizesResolverManager = null;
        this._eventEmitter = null;
        this._connectorsCleaner = null;
        this._connectorsSelector = null;
        this._transformerConnectors = null;
        this._transformedConnectionsSorter = null;
        this._itemNewPxSizesFinder = null;
        this._transformedItemMarker = null;
        this._itemsToReappendFinder = null;
        this._itemsReappender = null;
        this._emptySpaceNormalizer = null;
        this._css = {};
        this._construct = function() {
            o._gridifier = a;
            o._settings = b;
            o._collector = c;
            o._connectors = d;
            o._connections = f;
            o._connectionsSorter = g;
            o._guid = h;
            o._appender = i;
            o._reversedAppender = j;
            o._normalizer = k;
            o._operation = l;
            o._sizesResolverManager = m;
            o._eventEmitter = n;
            if (o._settings.isVerticalGrid()) {
                o._connectorsCleaner = new e.VerticalGrid.ConnectorsCleaner(o._connectors, o._connections, o._settings);
            } else if (o._settings.isHorizontalGrid()) {
                o._connectorsCleaner = new e.HorizontalGrid.ConnectorsCleaner(o._connectors, o._connections, o._settings);
            }
            o._connectorsSelector = new e.VerticalGrid.ConnectorsSelector(o._guid);
            o._transformedConnectionsSorter = new e.SizesTransformer.TransformedConnectionsSorter(o._connectionsSorter);
            o._itemNewPxSizesFinder = new e.SizesTransformer.ItemNewPxSizesFinder(o._gridifier, o._collector, o._connections, o._sizesResolverManager);
            o._transformedItemMarker = new e.SizesTransformer.TransformedItemMarker();
            o._itemsToReappendFinder = new e.SizesTransformer.ItemsToReappendFinder(o._connections, o._connectionsSorter, o._settings);
            o._transformerConnectors = new e.TransformerConnectors(o._gridifier, o._settings, o._connectors, o._connections, o._guid, o._appender, o._reversedAppender, o._normalizer, o, o._connectorsCleaner, o._transformedItemMarker, o._operation);
            o._emptySpaceNormalizer = new e.SizesTransformer.EmptySpaceNormalizer(o._connections, o._connectors, o._settings);
            o._itemsReappender = new e.SizesTransformer.ItemsReappender(o._gridifier, o._appender, o._reversedAppender, o._connections, o._connectors, o._connectorsCleaner, o._connectorsSelector, o._transformerConnectors, o._settings, o._guid, o._transformedItemMarker, o._emptySpaceNormalizer, o._sizesResolverManager, o._eventEmitter);
            o._transformerConnectors.setItemsReappenderInstance(o._itemsReappender);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            o._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.RESTRICT_CONNECTION_COLLECT = "restrictConnectionCollect";
    e.SizesTransformer.Core.prototype.isTransformerQueueEmpty = function() {
        return this._itemsReappender.isReappendQueueEmpty();
    };
    e.SizesTransformer.Core.prototype.getQueuedConnectionsPerTransform = function() {
        return this._itemsReappender.getQueuedConnectionsPerTransform();
    };
    e.SizesTransformer.Core.prototype.transformConnectionSizes = function(a) {
        a = this._transformedConnectionsSorter.sortTransformedConnections(a);
        a = this._itemNewPxSizesFinder.calculateNewPxSizesPerAllTransformedItems(a);
        var b = function() {
            this._guid.unmarkAllPrependedItems();
            this._transformedItemMarker.markEachConnectionItemWithTransformData(a);
            var b = [];
            if (!this._itemsReappender.isReappendQueueEmpty()) {
                var c = this._itemsReappender.stopReappendingQueuedItems();
                for (var d = 0; d < c.reappendQueue.length; d++) {
                    var f = c.reappendQueue[d].connectionToReappend;
                    if (f[e.SizesTransformer.RESTRICT_CONNECTION_COLLECT]) continue;
                    b.push(f);
                }
            }
            var g = this._itemsToReappendFinder.findAllOnSizesTransform(b, a[0].connectionToTransform);
            var h = g.itemsToReappend;
            var b = g.connectionsToReappend;
            var i = g.firstConnectionToReappend;
            this._transformedItemMarker.markAllTransformDependedItems(h);
            this._transformerConnectors.recreateConnectorsPerFirstItemReappendOnTransform(h[0], i);
            this._itemsReappender.createReappendQueue(h, b);
            this._itemsReappender.startReappendingQueuedItems();
        };
        var c = this;
        setTimeout(function() {
            b.call(c);
        }, 0);
    };
    e.SizesTransformer.Core.prototype.stopRetransformAllConnectionsQueue = function() {
        var a = this._connections.get();
        if (!this._itemsReappender.isReappendQueueEmpty()) {
            var b = this._itemsReappender.stopReappendingQueuedItems();
            var c = [];
            for (var d = 0; d < b.reappendedQueueData.length; d++) c.push(b.reappendedQueueData[d].connectionToReappend);
            this._connections.syncConnectionParams(c);
            for (var d = 0; d < b.reappendQueue.length; d++) a.push(b.reappendQueue[d].connectionToReappend);
        }
    };
    e.SizesTransformer.Core.prototype.retransformAllConnections = function() {
        this.stopRetransformAllConnectionsQueue();
        var a = this;
        var b = this._connections.get();
        if (b.length == 0) return;
        var c = function() {
            b = this._connectionsSorter.sortConnectionsPerReappend(b);
            this._guid.unmarkAllPrependedItems();
            var a = [];
            var c = [];
            var d = [];
            for (var f = 0; f < b.length; f++) {
                if (!b[f][e.SizesTransformer.RESTRICT_CONNECTION_COLLECT]) {
                    a.push(b[f].item);
                    d.push(b[f]);
                } else {
                    c.push(b[f]);
                }
            }
            var g = null;
            if (c.length == 0) {
                g = b[0];
                b.splice(0, b.length);
            } else {
                for (var f = 0; f < b.length; f++) {
                    var h = true;
                    for (var i = 0; i < c.length; i++) {
                        if (c[i].itemGUID == b[f].itemGUID) {
                            h = false;
                            break;
                        }
                    }
                    if (h) {
                        g = b[f];
                        break;
                    }
                }
                b.splice(0, b.length);
                for (var f = 0; f < c.length; f++) b.push(c[f]);
            }
            this._transformedItemMarker.markAllTransformDependedItems(a);
            this._transformerConnectors.recreateConnectorsPerFirstItemReappendOnTransform(g.item, g);
            this._itemsReappender.createReappendQueue(a, d);
            this._itemsReappender.startReappendingQueuedItems();
        };
        var d = this._syncAllScheduledToTransformItemSizes(b);
        if (!d) {
            c.call(this);
        } else {
            var a = this;
            setTimeout(function() {
                c.call(a);
            }, 0);
        }
    };
    e.SizesTransformer.Core.prototype._syncAllScheduledToTransformItemSizes = function(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            if (this._transformedItemMarker.isTransformedItem(a[c].item)) {
                var d = this._transformedItemMarker.getTransformedItemTargetRawSizes(a[c].item);
                b.push({
                    connectionToTransform: a[c],
                    widthToTransform: d.targetRawWidth,
                    heightToTransform: d.targetRawHeight
                });
            }
        }
        if (b.length == 0) return false;
        b = this._itemNewPxSizesFinder.calculateNewPxSizesPerAllTransformedItems(b);
        this._transformedItemMarker.markEachConnectionItemWithTransformData(b);
        return true;
    };
    e.SizesTransformer.Core.prototype.retransformFrom = function(a) {
        var b = [];
        if (!this._itemsReappender.isReappendQueueEmpty()) {
            var c = this._itemsReappender.stopReappendingQueuedItems();
            for (var d = 0; d < c.reappendQueue.length; d++) {
                var f = c.reappendQueue[d].connectionToReappend;
                if (f[e.SizesTransformer.RESTRICT_CONNECTION_COLLECT]) continue;
                b.push(f);
            }
        }
        this._guid.unmarkAllPrependedItems();
        var g = this._itemsToReappendFinder.findAllOnSizesTransform(b, a);
        var h = g.itemsToReappend;
        var b = g.connectionsToReappend;
        var i = g.firstConnectionToReappend;
        this._transformedItemMarker.markAllTransformDependedItems(h);
        this._transformerConnectors.recreateConnectorsPerFirstItemReappendOnTransform(h[0], i);
        this._itemsReappender.createReappendQueue(h, b);
        this._itemsReappender.startReappendingQueuedItems();
    };
    e.SizesTransformer.Core.prototype.retransformFromFirstSortedConnection = function(a) {
        var b = [];
        if (!this._itemsReappender.isReappendQueueEmpty()) {
            var c = this._itemsReappender.stopReappendingQueuedItems();
            for (var d = 0; d < c.reappendQueue.length; d++) {
                var f = c.reappendQueue[d].connectionToReappend;
                if (f[e.SizesTransformer.RESTRICT_CONNECTION_COLLECT]) continue;
                b.push(f);
            }
        }
        var g = this._connections.get();
        var h = [];
        for (var d = 0; d < a.length; d++) {
            for (var i = 0; i < g.length; i++) {
                if (this._guid.getItemGUID(g[i].item) == this._guid.getItemGUID(a[d])) {
                    h.push(g[i]);
                    continue;
                }
            }
            for (var i = 0; i < b.length; i++) {
                if (this._guid.getItemGUID(b[i].item) == this._guid.getItemGUID(a[d])) {
                    h.push(b[i]);
                    continue;
                }
            }
        }
        var j = this._connectionsSorter.sortConnectionsPerReappend(h);
        var k = j[0];
        this._guid.unmarkAllPrependedItems();
        var l = this._itemsToReappendFinder.findAllOnSizesTransform(b, k);
        var m = l.itemsToReappend;
        var b = l.connectionsToReappend;
        var n = l.firstConnectionToReappend;
        this._transformedItemMarker.markAllTransformDependedItems(m);
        this._transformerConnectors.recreateConnectorsPerFirstItemReappendOnTransform(m[0], n);
        this._itemsReappender.createReappendQueue(m, b);
        this._itemsReappender.startReappendingQueuedItems();
    };
    e.SizesTransformer.TransformedConnectionsSorter = function(a) {
        var b = this;
        b._connectionsSorter = null;
        this._css = {};
        this._construct = function() {
            b._connectionsSorter = a;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            b._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.TransformedConnectionsSorter.prototype.sortTransformedConnections = function(a) {
        var b = this;
        var c = [];
        for (var d = 0; d < a.length; d++) c.push(a[d].connectionToTransform);
        var e = 1;
        var f = this._connectionsSorter.sortConnectionsPerReappend(c);
        for (var d = 0; d < f.length; d++) {
            for (var g = 0; g < a.length; g++) {
                if (f[d].itemGUID == a[g].connectionToTransform.itemGUID) {
                    a[g].sortNumber = e;
                    e++;
                    break;
                }
            }
        }
        a.sort(function(a, b) {
            if (a.sortNumber > b.sortNumber) return 1;
            return -1;
        });
        return a;
    };
    e.SizesTransformer.TransformedItemMarker = function() {
        var a = this;
        this._css = {};
        this._construct = function() {};
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_DATA_ATTR = "data-transformed-item";
    e.SizesTransformer.TransformedItemMarker.DEPENDED_ITEM_DATA_ATTR = "data-depended-item";
    e.SizesTransformer.TransformedItemMarker.TRANSFORMER_EMPTY_DATA_ATTR_VALUE = "gridifier-data";
    e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_RAW_TARGET_WIDTH_DATA_ATTR = "data-transformed-item-raw-target-width";
    e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_RAW_TARGET_HEIGHT_DATA_ATTR = "data-transformed-item-raw-target-height";
    e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_PX_TARGET_WIDTH_DATA_ATTR = "data-transformed-item-px-target-width";
    e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_PX_TARGET_HEIGHT_DATA_ATTR = "data-transformed-item-px-target-height";
    e.SizesTransformer.TransformedItemMarker.prototype.markEachConnectionItemWithTransformData = function(a) {
        var b = e.SizesTransformer.TransformedItemMarker;
        for (var c = 0; c < a.length; c++) {
            var d = a[c].connectionToTransform.item;
            d.setAttribute(b.TRANSFORMED_ITEM_DATA_ATTR, b.TRANSFORMER_EMPTY_DATA_ATTR_VALUE);
            d.setAttribute(b.TRANSFORMED_ITEM_RAW_TARGET_WIDTH_DATA_ATTR, a[c].widthToTransform);
            d.setAttribute(b.TRANSFORMED_ITEM_RAW_TARGET_HEIGHT_DATA_ATTR, a[c].heightToTransform);
            d.setAttribute(b.TRANSFORMED_ITEM_PX_TARGET_WIDTH_DATA_ATTR, a[c].pxWidthToTransform);
            d.setAttribute(b.TRANSFORMED_ITEM_PX_TARGET_HEIGHT_DATA_ATTR, a[c].pxHeightToTransform);
        }
    };
    e.SizesTransformer.TransformedItemMarker.prototype.isTransformedItem = function(a) {
        return d.hasAttribute(a, e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_DATA_ATTR);
    };
    e.SizesTransformer.TransformedItemMarker.prototype.unmarkItemAsTransformed = function(a) {
        a.removeAttribute(e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_DATA_ATTR);
        a.removeAttribute(e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_RAW_TARGET_WIDTH_DATA_ATTR);
        a.removeAttribute(e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_RAW_TARGET_HEIGHT_DATA_ATTR);
        a.removeAttribute(e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_PX_TARGET_WIDTH_DATA_ATTR);
        a.removeAttribute(e.SizesTransformer.TransformedItemMarker.TRANSFORMED_ITEM_PX_TARGET_HEIGHT_DATA_ATTR);
    };
    e.SizesTransformer.TransformedItemMarker.prototype.getTransformedItemTargetRawSizes = function(a) {
        var b = e.SizesTransformer.TransformedItemMarker;
        return {
            targetRawWidth: a.getAttribute(b.TRANSFORMED_ITEM_RAW_TARGET_WIDTH_DATA_ATTR),
            targetRawHeight: a.getAttribute(b.TRANSFORMED_ITEM_RAW_TARGET_HEIGHT_DATA_ATTR)
        };
    };
    e.SizesTransformer.TransformedItemMarker.prototype.getTransformedItemTargetPxSizes = function(a) {
        var b = e.SizesTransformer.TransformedItemMarker;
        return {
            targetPxWidth: parseFloat(a.getAttribute(b.TRANSFORMED_ITEM_PX_TARGET_WIDTH_DATA_ATTR)),
            targetPxHeight: parseFloat(a.getAttribute(b.TRANSFORMED_ITEM_PX_TARGET_HEIGHT_DATA_ATTR))
        };
    };
    e.SizesTransformer.TransformedItemMarker.prototype.markAllTransformDependedItems = function(a) {
        for (var b = 0; b < a.length; b++) {
            if (this.isTransformedItem(a[b])) continue;
            a[b].setAttribute(e.SizesTransformer.TransformedItemMarker.DEPENDED_ITEM_DATA_ATTR, e.SizesTransformer.TransformedItemMarker.TRANSFORMER_EMPTY_DATA_ATTR_VALUE);
        }
    };
    e.SizesTransformer.TransformedItemMarker.prototype.isDependedItem = function(a) {
        return d.hasAttribute(a, e.SizesTransformer.TransformedItemMarker.DEPENDED_ITEM_DATA_ATTR);
    };
    e.SizesTransformer.TransformedItemMarker.prototype.unmarkItemAsDepended = function(a) {
        a.removeAttribute(e.SizesTransformer.TransformedItemMarker.DEPENDED_ITEM_DATA_ATTR);
    };
    e.TransformerOperations.OptionsParser = function(a, b) {
        var c = this;
        this._collector = null;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            c._collector = a;
            c._sizesResolverManager = b;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.TransformerOperations.OptionsParser.prototype.parseItemsToTransform = function(a) {
        var b = [];
        if (d.isArray(a)) {
            for (var c = 0; c < a.length; c++) {
                b.push(a[c][0]);
            }
        } else {
            b.push(a);
        }
        b = this._collector.toDOMCollection(b);
        this._sizesResolverManager.startCachingTransaction();
        this._collector.ensureAllItemsAreAttachedToGrid(b);
        this._collector.ensureAllItemsCanBeAttachedToGrid(b);
        return b;
    };
    e.TransformerOperations.OptionsParser.prototype.parseSizesToTransform = function(a, b, c) {
        var e = [];
        if (d.isArray(a)) {
            for (var f = 0; f < a.length; f++) {
                e.push([ a[f][1], a[f][2] ]);
            }
        } else {
            e.push([ b, c ]);
        }
        return e;
    };
    e.TransformerOperations.Toggle = function(a, b, c, d, f, g) {
        var h = this;
        this._gridifier = null;
        this._collector = null;
        this._connections = null;
        this._guid = null;
        this._sizesTransformer = null;
        this._sizesResolverManager = null;
        this._optionsParser = null;
        this._css = {};
        this._construct = function() {
            h._gridifier = a;
            h._collector = b;
            h._connections = c;
            h._guid = d;
            h._sizesTransformer = f;
            h._sizesResolverManager = g;
            h._optionsParser = new e.TransformerOperations.OptionsParser(h._collector, h._sizesResolverManager);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            h._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.TransformerOperations.Toggle.prototype.prepare = function(a, b, c, d) {
        var e = this._optionsParser.parseItemsToTransform(a);
        var f = this._optionsParser.parseSizesToTransform(a, b, c);
        var g = this._parseTransformationData(e, f, d);
        if (g.length == 0) return [];
        return g;
    };
    e.TransformerOperations.Toggle.prototype._parseTransformationData = function(a, b, c) {
        var d = new e.SizesTransformer.ItemNewRawSizesFinder(this._sizesResolverManager);
        var f = [];
        for (var g = 0; g < a.length; g++) {
            if (this._gridifier.isItemClone(a[g])) continue;
            var h = this._connections.findConnectionByItem(a[g]);
            var i = null;
            if (d.areConnectionSizesToggled(h)) {
                i = d.getConnectionSizesPerUntoggle(h);
                d.unmarkConnectionPerToggle(h);
            } else {
                d.markConnectionPerToggle(h, c);
                i = d.initConnectionTransform(h, b[g][0], b[g][1], c);
            }
            f.push({
                connectionToTransform: h,
                widthToTransform: i.targetWidth,
                heightToTransform: i.targetHeight,
                usePaddingBottomInsteadHeight: c
            });
        }
        return f;
    };
    e.TransformerOperations.Transform = function(a, b, c, d, f, g) {
        var h = this;
        this._gridifier = null;
        this._collector = null;
        this._connections = null;
        this._guid = null;
        this._sizesTransformer = null;
        this._sizesResolverManager = null;
        this._optionsParser = null;
        this._transformationData = [];
        this._executeTransformOperationTimeout = null;
        this._css = {};
        this._construct = function() {
            h._gridifier = a;
            h._collector = b;
            h._connections = c;
            h._guid = d;
            h._sizesTransformer = f;
            h._sizesResolverManager = g;
            h._optionsParser = new e.TransformerOperations.OptionsParser(h._collector, h._sizesResolverManager);
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            h._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.TransformerOperations.Transform.prototype.prepare = function(a, b, c, d) {
        var e = this._optionsParser.parseItemsToTransform(a);
        var f = this._optionsParser.parseSizesToTransform(a, b, c);
        var g = this._parseTransformationData(e, f, d);
        if (g.length == 0) return [];
        return g;
    };
    e.TransformerOperations.Transform.prototype._parseTransformationData = function(a, b, c) {
        var d = new e.SizesTransformer.ItemNewRawSizesFinder(this._sizesResolverManager);
        var f = [];
        for (var g = 0; g < a.length; g++) {
            if (this._gridifier.isItemClone(a[g])) continue;
            var h = this._connections.findConnectionByItem(a[g]);
            var i = null;
            i = d.initConnectionTransform(h, b[g][0], b[g][1], c);
            f.push({
                connectionToTransform: h,
                widthToTransform: i.targetWidth,
                heightToTransform: i.targetHeight,
                usePaddingBottomInsteadHeight: c
            });
        }
        return f;
    };
    e.TransformerOperations.Transform.prototype.schedule = function(a) {
        if (a.length == 0) return;
        if (this._executeTransformOperationTimeout == null) {
            this._transformationData = a;
        } else {
            clearTimeout(this._executeTransformOperationTimeout);
            this._executeTransformOperationTimeout = null;
            for (var b = 0; b < a.length; b++) {
                var c = false;
                for (var d = 0; d < this._transformationData.length; d++) {
                    if (this._transformationData[d].connectionToTransform.itemGUID == a[b].connectionToTransform.itemGUID) {
                        this._transformationData[d] = a[b];
                        c = true;
                        break;
                    }
                }
                if (!c) this._transformationData.push(a[b]);
            }
        }
        var e = this;
        this._executeTransformOperationTimeout = setTimeout(function() {
            e._execute.call(e, e._transformationData);
            e._transformationData = [];
        }, 40);
    };
    e.TransformerOperations.Transform.prototype._execute = function(a) {
        this._sizesResolverManager.startCachingTransaction();
        this._sizesTransformer.transformConnectionSizes(a);
        this._sizesResolverManager.stopCachingTransaction();
    };
    e.TransformerOperations.Transform.prototype.executeRetransformAllSizes = function() {
        this._sizesResolverManager.startCachingTransaction();
        this._sizesTransformer.retransformAllConnections();
        this._sizesResolverManager.stopCachingTransaction();
    };
    e.TransformerOperations.Transform.prototype.executeRetransformFromFirstSortedConnection = function(a) {
        this._sizesResolverManager.startCachingTransaction();
        this._sizesTransformer.retransformFromFirstSortedConnection(a);
        this._sizesResolverManager.stopCachingTransaction();
    };
    e.Api.CoordsChanger = function(a, b, c) {
        var d = this;
        this._settings = null;
        this._gridifier = null;
        this._eventEmitter = null;
        this._coordsChangerFunction = null;
        this._coordsChangerFunctions = {};
        this._css = {};
        this._construct = function() {
            d._settings = a;
            d._gridifier = b;
            d._eventEmitter = c;
            d._coordsChangerFunctions = {};
            d._addDefaultCoordsChanger();
            d._addCSS3PositionCoordsChanger();
            d._addCSS3TranslateCoordsChanger();
            d._addCSS3Translate3DCoordsChanger();
            d._addCSS3Translate3DClonesCoordsChanger();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.CoordsChanger.prototype.setCoordsChangerFunction = function(a) {
        if (!this._coordsChangerFunctions.hasOwnProperty(a)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_COORDS_CHANGER_INVALID_PARAM, a);
            return;
        }
        this._coordsChangerFunction = this._coordsChangerFunctions[a];
    };
    e.Api.CoordsChanger.prototype.addCoordsChangerFunction = function(a, b) {
        this._coordsChangerFunctions[a] = b;
    };
    e.Api.CoordsChanger.prototype.getCoordsChangerFunction = function() {
        return this._coordsChangerFunction;
    };
    e.Api.CoordsChanger.prototype._addDefaultCoordsChanger = function() {
        this._coordsChangerFunctions["default"] = function(a, b, c, e, f, g, h, i, j, k) {
            var j = j || false;
            if (j) {
                return;
            }
            if (b != a.style.left) d.css.set(a, {
                left: b
            });
            if (c != a.style.top) d.css.set(a, {
                top: c
            });
            if (g) {
                f.emitTransformEvent(a, h, i, b, c);
            }
        };
    };
    e.Api.CoordsChanger.prototype._addCSS3PositionCoordsChanger = function() {
        var a = this;
        this._coordsChangerFunctions.CSS3Position = function(b, c, e, f, g, h, i, j, k, l) {
            if (!d.isBrowserSupportingTransitions()) {
                a._coordsChangerFunctions["default"](b, c, e, f, g, h, i, j);
                return;
            }
            c = parseFloat(c) + "px";
            e = parseFloat(e) + "px";
            var k = k || false;
            if (k) {
                d.css3.transform(b, "scale3d(1,1,1)");
                return;
            }
            if (c != b.style.left) {
                d.css3.transitionProperty(b, "left " + f + "ms " + l);
                d.css.set(b, {
                    left: c
                });
            }
            if (e != b.style.top) {
                d.css3.transitionProperty(b, "top " + f + "ms " + l);
                d.css.set(b, {
                    top: e
                });
            }
            if (h) {
                setTimeout(function() {
                    g.emitTransformEvent(b, i, j, c, e);
                }, f + 20);
            }
        };
    };
    e.Api.CoordsChanger.prototype._addCSS3TranslateCoordsChanger = function() {
        var a = this;
        var b = function(b, e, f) {
            return function(g, h, i, j, k, l, m, n, o, p) {
                if (!d.isBrowserSupportingTransitions()) {
                    a._coordsChangerFunctions["default"](g, h, i, j, k, l, m, n);
                    return;
                }
                var o = o || false;
                if (o) {
                    f(g, h, i);
                    d.css3.transform(g, "scale3d(1,1,1) translate(0px,0px)");
                    return;
                }
                var h = parseFloat(h);
                var i = parseFloat(i);
                var q = parseFloat(g.style.left);
                var r = parseFloat(g.style.top);
                if (h > q) var s = h - q; else if (h < q) var s = (q - h) * -1; else var s = 0;
                if (i > r) var t = i - r; else if (i < r) var t = (r - i) * -1; else var t = 0;
                var u = /.*translate\((.*)\).*/;
                var v = u.exec(g.style[c.get("transform")]);
                if (v == null || typeof v[1] == "undefined" || v[1] == null) {
                    var w = true;
                } else {
                    var x = v[1].split(",");
                    var y = x[0].gridifierTrim();
                    var z = x[1].gridifierTrim();
                    if (y == s + "px" && z == t + "px") var w = false; else var w = true;
                }
                if (w) {
                    d.css3.transitionProperty(g, c.getForCSS("transform", g) + " " + j + "ms " + p);
                    s = b(s);
                    t = e(t);
                    d.css3.transformProperty(g, "translate", s + "px," + t + "px");
                }
                if (l) {
                    setTimeout(function() {
                        k.emitTransformEvent(g, m, n, h, i);
                    }, j + 20);
                }
            };
        };
        var e = function(a) {
            return a;
        };
        var f = function(a, b, c) {
            return;
        };
        this._coordsChangerFunctions.CSS3Translate = b(e, e, f);
        this._coordsChangerFunctions.CSS3TranslateWithRounding = b(function(a) {
            return Math.round(a);
        }, function(a) {
            return Math.round(a);
        }, function(a, b, c) {
            d.css.set(a, {
                left: Math.round(parseFloat(b)) + "px",
                top: Math.round(parseFloat(c)) + "px"
            });
        });
    };
    e.Api.CoordsChanger.prototype._addCSS3Translate3DCoordsChanger = function() {
        var a = this;
        var b = function(b, e, f) {
            return function(g, h, i, j, k, l, m, n, o, p) {
                if (!d.isBrowserSupportingTransitions()) {
                    a._coordsChangerFunctions["default"](g, h, i, j, k, l, m, n);
                    return;
                }
                var o = o || false;
                if (o) {
                    f(g, h, i);
                    d.css3.transform(g, "scale3d(1,1,1) translate3d(0px,0px,0px)");
                    return;
                }
                var h = parseFloat(h);
                var i = parseFloat(i);
                var q = parseFloat(g.style.left);
                var r = parseFloat(g.style.top);
                if (h > q) var s = h - q; else if (h < q) var s = (q - h) * -1; else var s = 0;
                if (i > r) var t = i - r; else if (i < r) var t = (r - i) * -1; else var t = 0;
                var u = /.*translate3d\((.*)\).*/;
                var v = u.exec(g.style[c.get("transform")]);
                if (v == null || typeof v[1] == "undefined" || v[1] == null) {
                    var w = true;
                } else {
                    var x = v[1].split(",");
                    var y = x[0].gridifierTrim();
                    var z = x[1].gridifierTrim();
                    if (y == s + "px" && z == t + "px") var w = false; else var w = true;
                }
                if (w) {
                    d.css3.transitionProperty(g, c.getForCSS("transform", g) + " " + j + "ms " + p);
                    s = b(s);
                    t = e(t);
                    d.css3.perspective(g, "1000");
                    d.css3.backfaceVisibility(g, "hidden");
                    d.css3.transformProperty(g, "translate3d", s + "px," + t + "px,0px");
                }
                if (l) {
                    setTimeout(function() {
                        k.emitTransformEvent(g, m, n, h, i);
                    }, j + 20);
                }
            };
        };
        var e = function(a) {
            return a;
        };
        var f = function(a, b, c) {
            return;
        };
        this._coordsChangerFunctions.CSS3Translate3D = b(e, e, f);
        this._coordsChangerFunctions.CSS3Translate3DWithRounding = b(function(a) {
            return Math.round(a);
        }, function(a) {
            return Math.round(a);
        }, function(a, b, c) {
            d.css.set(a, {
                left: Math.round(parseFloat(b)) + "px",
                top: Math.round(parseFloat(c)) + "px"
            });
        });
    };
    e.Api.CoordsChanger.CSS3_TRANSLATE_3D_CLONES_RESTRICT_CLONE_SHOW_DATA_ATTR = "gridifier-clones-coords-changer-restrict-show";
    e.Api.CoordsChanger.prototype._addCSS3Translate3DClonesCoordsChanger = function() {
        var a = this;
        var b = "data-gridifier-item-shown";
        this._gridifier.onShow(function(c) {
            var d = a._gridifier.getItemClonesManager();
            if (!d.hasBindedClone(c)) return;
            c.setAttribute(b, "yes");
        });
        this._gridifier.onHide(function(a) {
            if (d.hasAttribute(a, b)) a.removeAttribute(b);
        });
        var c = [];
        this._coordsChangerFunctions.CSS3Translate3DClones = function(f, g, h, i, j, k, l, m, n, o) {
            if (!d.isBrowserSupportingTransitions()) {
                a._coordsChangerFunctions["default"](f, g, h, i, j, k, l, m);
                return;
            }
            var n = n || false;
            if (n) {
                d.css3.transform(f, "scale3d(1,1,1) translate3d(0px,0px,0px)");
                return;
            }
            g = parseFloat(g) + "px";
            h = parseFloat(h) + "px";
            if (d.hasAttribute(f, e.Dragifier.IS_DRAGGABLE_ITEM_DATA_ATTR)) var p = true; else var p = false;
            var q = a._gridifier.getItemClonesManager();
            var r = q.getBindedClone(f);
            var s = f.getAttribute(e.GUID.GUID_DATA_ATTR);
            if (typeof c[s] == "undefined") {
                c[s] = null;
            }
            var t = e.Api.CoordsChanger;
            if (!p && !d.hasAttribute(r, t.CSS3_TRANSLATE_3D_CLONES_RESTRICT_CLONE_SHOW_DATA_ATTR)) {
                if (r.style.visibility != "visible") r.style.visibility = "visible";
            }
            if (d.hasAttribute(f, b)) {
                if (f.style.visibility != "hidden") f.style.visibility = "hidden";
            }
            if (k) {
                var u = a._settings.getSizesChanger();
                u(r, l, m);
                setTimeout(function() {
                    j.emitTransformEvent(r, l, m, g, h);
                }, i + 20);
            }
            if (g != f.style.left) d.css.set(f, {
                left: g
            });
            if (h != f.style.top) d.css.set(f, {
                top: h
            });
            var v = o;
            a._coordsChangerFunctions.CSS3Translate3D(r, g, h, i, j, k, l, m, false, v);
            if (c[s] != null) {
                clearTimeout(c[s]);
                c[s] = null;
            }
            c[s] = setTimeout(function() {
                if (d.hasAttribute(f, b) && !p) {
                    if (f.style.visibility != "visible") f.style.visibility = "visible";
                    if (r.style.visibility != "hidden") r.style.visibility = "hidden";
                }
            }, i);
        };
    };
    e.Api.CoordsChanger.prototype.hasTranslateOrTranslate3DTransformSet = function(a) {
        var b = /.*translate\((.*)\).*/;
        var d = /.*translate3d\((.*)\).*/;
        if (b.test(a.style[c.get("transform", a)]) || d.test(a.style[c.get("transform", a)])) return true;
        return false;
    };
    e.Api.CoordsChanger.prototype.setTransformOriginAccordingToCurrentTranslate = function(a, b, c, e, f) {
        var g = parseFloat(b);
        var h = parseFloat(c);
        var i = parseFloat(a.style.left);
        var j = parseFloat(a.style.top);
        if (g > i) var k = g - i; else if (g < i) var k = (i - g) * -1; else var k = 0;
        if (h > j) var l = h - j; else if (h < j) var l = (j - h) * -1; else var l = 0;
        d.css3.transformOrigin(a, k + e / 2 + "px " + (l + f / 2) + "px");
    };
    e.Api.CoordsChanger.prototype.resetTransformOrigin = function(a) {
        d.css3.transformOrigin(a, "50% 50%");
    };
    e.Api.Dragifier = function() {
        var a = this;
        this._draggableItemDecoratorFunction = null;
        this._draggableItemDecoratorFunctions = {};
        this._dragifierUserSelectToggler = null;
        this._css = {};
        this._construct = function() {
            a._bindEvents();
            a._addCloneCSSDecoratorFunction();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.Dragifier.prototype.setDraggableItemDecoratorFunction = function(a) {
        if (!this._draggableItemDecoratorFunctions.hasOwnProperty(a)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_DRAGGABLE_ITEM_DECORATOR_INVALID_PARAM, a);
            return;
        }
        this._draggableItemDecoratorFunction = this._draggableItemDecoratorFunctions[a];
    };
    e.Api.Dragifier.prototype.addDraggableItemDecoratorFunction = function(a, b) {
        this._draggableItemDecoratorFunctions[a] = b;
    };
    e.Api.Dragifier.prototype.getDraggableItemDecoratorFunction = function() {
        return this._draggableItemDecoratorFunction;
    };
    e.Api.Dragifier.prototype.getDraggableItemCoordsChanger = function() {
        return function(a, b, c) {
            if (!d.isBrowserSupportingTransitions()) {
                d.css.set(a, {
                    left: b,
                    top: c
                });
                return;
            }
            var b = parseFloat(b);
            var c = parseFloat(c);
            var e = parseFloat(a.style.left);
            var f = parseFloat(a.style.top);
            if (b > e) var g = b - e; else if (b < e) var g = (e - b) * -1; else var g = 0;
            if (c > f) var h = c - f; else if (c < f) var h = (f - c) * -1; else var h = 0;
            d.css3.transitionProperty(a, "none");
            d.css3.perspective(a, "1000");
            d.css3.backfaceVisibility(a, "hidden");
            d.css3.transformProperty(a, "translate3d", g + "px," + h + "px, 0px");
        };
    };
    e.Api.Dragifier.prototype.getDraggableItemPointerDecorator = function() {
        return function(a) {
            d.css.addClass(a, "gridifier-draggable-item-pointer");
            a.style.backgroundColor = "red";
        };
    };
    e.Api.Dragifier.prototype.getDragifierUserSelectToggler = function() {
        if (this._dragifierUserSelectToggler != null) return this._dragifierUserSelectToggler;
        this._dragifierUserSelectToggler = {
            _setToNoneOriginalSelectProps: {},
            _hasSelectProp: function(a) {
                return typeof document.body.style[a] != "undefined";
            },
            _selectProps: [ "webkitTouchCallout", "webkitUserSelect", "khtmlUserSelect", "mozUserSelect", "msUserSelect", "userSelect" ],
            disableSelect: function() {
                for (var a = 0; a < this._selectProps.length; a++) {
                    if (this._hasSelectProp(this._selectProps[a])) {
                        this._setToNoneOriginalSelectProps[this._selectProps[a]] = document.body.style[this._selectProps[a]];
                        document.body.style[this._selectProps[a]] = "none";
                    }
                }
            },
            enableSelect: function() {
                for (var a in this._setToNoneOriginalSelectProps) {
                    document.body.style[a] = this._setToNoneOriginalSelectProps[a];
                }
                this._setToNoneOriginalSelectProps = {};
            }
        };
        return this._dragifierUserSelectToggler;
    };
    e.Api.Dragifier.prototype._addCloneCSSDecoratorFunction = function() {
        this._draggableItemDecoratorFunctions["cloneCSS"] = function(a, b, c) {
            c.copyComputedStyle(b, a);
        };
    };
    e.Api.Filter = function(a, b) {
        var c = this;
        this._settings = null;
        this._eventEmitter = null;
        this._filters = null;
        this._filterFunctions = {};
        this._css = {};
        this._construct = function() {
            c._settings = a;
            c._eventEmitter = b;
            c._filterFunctions = {};
            c._addAllFilter();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.Filter.prototype.setFilterFunction = function(a) {
        if (!d.isArray(a)) var b = [ a ]; else var b = a;
        this._filters = [];
        for (var c = 0; c < b.length; c++) {
            if (!this._filterFunctions.hasOwnProperty(b[c])) {
                new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_FILTER_INVALID_PARAM, b[c]);
                return;
            }
            this._filters.push(this._filterFunctions[b[c]]);
        }
    };
    e.Api.Filter.prototype.addFilterFunction = function(a, b) {
        this._filterFunctions[a] = b;
    };
    e.Api.Filter.prototype.getFilterFunction = function() {
        return this._filters;
    };
    e.Api.Filter.prototype._addAllFilter = function() {
        this._filterFunctions.all = function(a) {
            return true;
        };
    };
    e.Api.Rotate = function(a, b, c) {
        var d = this;
        this._settings = null;
        this._eventEmitter = null;
        this._sizesResolverManager = null;
        this._collector = null;
        this._rotateFadeType = null;
        this._transitionTiming = null;
        this._css = {};
        this._construct = function() {
            d._settings = a;
            d._eventEmitter = b;
            d._sizesResolverManager = c;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.Rotate.ROTATE_MATRIX_TYPES = {
        X: 0,
        Y: 1,
        Z: 2,
        XY: 3,
        XZ: 4,
        YZ: 5,
        XYZ: 6
    };
    e.Api.Rotate.ROTATE_FUNCTION_TYPES = {
        X: 0,
        Y: 1,
        Z: 2
    };
    e.Api.Rotate.ROTATE_FADE_TYPES = {
        NONE: 0,
        FULL: 1,
        ON_HIDE_MIDDLE: 2
    };
    e.Api.Rotate.prototype.setCollectorInstance = function(a) {
        this._collector = a;
    };
    e.Api.Rotate.prototype._getRotateMatrix = function(a) {
        if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.X) return "1, 0, 0, "; else if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.Y) return "0, 1, 0, "; else if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.Z) return "0, 0, 1, "; else if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.XY) return "1, 1, 0, "; else if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.XZ) return "1, 0, 1, "; else if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.YZ) return "0, 1, 1, "; else if (a == e.Api.Rotate.ROTATE_MATRIX_TYPES.XYZ) return "1, 1, 1, ";
        throw new Error("Gridifier error: wrong rotate matrix type = " + a);
    };
    e.Api.Rotate.prototype._getRotateFunction = function(a) {
        if (a == e.Api.Rotate.ROTATE_FUNCTION_TYPES.X) return "rotateX"; else if (a == e.Api.Rotate.ROTATE_FUNCTION_TYPES.Y) return "rotateY"; else if (a == e.Api.Rotate.ROTATE_FUNCTION_TYPES.Z) return "rotateZ";
        throw new Error("Gridifier error: wrong rotate function type = " + a);
    };
    e.Api.Rotate.prototype.setRotateFadeType = function(a) {
        this._rotateFadeType = a;
    };
    e.Api.Rotate.prototype.setTransitionTiming = function(a) {
        this._transitionTiming = a;
    };
    e.Api.Rotate.prototype.show3d = function(a, b, c, d, e, f, g) {
        var h = "rotate3d";
        this._rotate(a, b, h, false, d, this._getRotateMatrix(c), e, f, g);
    };
    e.Api.Rotate.prototype.hide3d = function(a, b, c, d, e, f, g) {
        var h = "rotate3d";
        this._rotate(a, b, h, true, d, this._getRotateMatrix(c), e, f, g);
    };
    e.Api.Rotate.prototype.show = function(a, b, c, d, e, f, g) {
        var h = this._getRotateFunction(c);
        this._rotate(a, b, h, false, d, "", e, f, g);
    };
    e.Api.Rotate.prototype.hide = function(a, b, c, d, e, f, g) {
        var h = this._getRotateFunction(c);
        this._rotate(a, b, h, true, d, "", e, f, g);
    };
    e.Api.Rotate.prototype._rotate = function(a, b, f, g, h, i, j, k, l) {
        if (!g) {
            var m = true;
            var n = false;
        } else {
            var m = false;
            var n = true;
        }
        var o = this._createScene(a, b, j, k);
        var p = this._createFrames(o);
        var q = this._createItemClone(a);
        a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
        l.lockCloneOnToggle(a);
        var r = this._createFrontFrame(p, f, i);
        var s = this._createBackFrame(p, f, i);
        if (m) {
            s.appendChild(q);
            a.style.visibility = "hidden";
        } else if (n) {
            r.appendChild(q);
            a.style.visibility = "hidden";
        }
        var t = this._settings.getToggleAnimationMsDuration();
        d.css3.transitionProperty(r, c.getForCSS("transform", r) + " " + t + "ms " + this._transitionTiming);
        d.css3.transitionProperty(s, c.getForCSS("transform", s) + " " + t + "ms " + this._transitionTiming);
        var u = this;
        var v = this._settings.getRotateAngles();
        var w = setTimeout(function() {
            d.css3.transformProperty(r, f, i + v[2] + "deg");
            d.css3.transformProperty(s, f, i + v[3] + "deg");
        }, 40);
        this._initFadeEffect(o, m, n, t);
        var x = setTimeout(function() {
            o.parentNode.removeChild(o);
            a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
            if (m) {
                l.unlockCloneOnToggle(a);
                a.style.visibility = "visible";
                u._eventEmitter.emitShowEvent(a);
            } else if (n) {
                l.unlockCloneOnToggle(a).hideCloneOnToggle(a);
                a.style.visibility = "hidden";
                u._eventEmitter.emitHideEvent(a);
            }
        }, t + 40);
    };
    e.Api.Rotate.prototype._createScene = function(b, c, e, f) {
        var g = document.createElement("div");
        var h = a.getComputedCSSWithMaybePercentageSizes(b);
        d.css.set(g, {
            width: this._sizesResolverManager.outerWidth(b) + "px",
            height: this._sizesResolverManager.outerHeight(b) + "px",
            position: "absolute",
            left: e,
            top: f,
            marginLeft: h.marginLeft,
            marginRight: h.marginRight,
            marginTop: h.marginTop,
            marginBottom: h.marginBottom
        });
        d.css3.perspective(g, this._settings.getRotatePerspective());
        c.appendChild(g);
        return g;
    };
    e.Api.Rotate.prototype._createFrames = function(a) {
        var b = document.createElement("div");
        d.css.set(b, {
            width: "100%",
            height: "100%",
            position: "absolute"
        });
        d.css3.transformStyle(b, "preserve-3d");
        d.css3.perspective(b, this._settings.getRotatePerspective());
        a.appendChild(b);
        return b;
    };
    e.Api.Rotate.prototype._createItemClone = function(b) {
        var c = b.cloneNode(true);
        this._collector.markItemAsRestrictedToCollect(c);
        var e = a.getComputedCSSWithMaybePercentageSizes(b);
        var f = parseInt(e.height);
        d.css.set(c, {
            left: "0px",
            top: "0px",
            visibility: "visible",
            width: this._sizesResolverManager.outerWidth(b) + "px",
            height: this._sizesResolverManager.outerHeight(b) + "px",
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0
        });
        d.css3.transition(c, "");
        d.css3.transform(c, "");
        if (f == 0) {
            d.css.set(c, {
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0
            });
        }
        return c;
    };
    e.Api.Rotate.prototype._addFrameCss = function(a) {
        d.css.set(a, {
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%"
        });
        if (!this._settings.getRotateBackface()) d.css3.backfaceVisibility(a, "hidden");
    };
    e.Api.Rotate.prototype._createFrontFrame = function(a, b, e) {
        var f = document.createElement("div");
        this._addFrameCss(f);
        a.appendChild(f);
        d.css.set(f, {
            zIndex: 2
        });
        d.css3.transitionProperty(f, c.getForCSS("transform", f) + " 0ms " + this._transitionTiming);
        d.css3.transformProperty(f, b, e + this._settings.getRotateAngles()[0] + "deg");
        return f;
    };
    e.Api.Rotate.prototype._createBackFrame = function(a, b, e) {
        var f = document.createElement("div");
        this._addFrameCss(f);
        a.appendChild(f);
        d.css3.transitionProperty(f, c.getForCSS("transform", f) + " 0ms " + this._transitionTiming);
        d.css3.transformProperty(f, b, e + this._settings.getRotateAngles()[1] + "deg");
        return f;
    };
    e.Api.Rotate.prototype._initFadeEffect = function(a, b, f, g) {
        var h = this;
        if (this._rotateFadeType == e.Api.Rotate.ROTATE_FADE_TYPES.NONE) return; else if (this._rotateFadeType == e.Api.Rotate.ROTATE_FADE_TYPES.FULL) {
            if (b) {
                d.css3.transition(a, "none");
                d.css3.opacity(a, 0);
                var i = 1;
            } else if (f) {
                d.css3.transition(a, "none");
                d.css3.opacity(a, 1);
                var i = 0;
            }
            setTimeout(function() {
                d.css3.transition(a, c.getForCSS("opacity", a) + " " + g + "ms " + h._transitionTiming);
                d.css3.opacity(a, i);
            }, 40);
        } else if (this._rotateFadeType == e.Api.Rotate.ROTATE_FADE_TYPES.ON_HIDE_MIDDLE) {
            if (!f) return;
            setTimeout(function() {
                d.css3.transition(a, c.getForCSS("opacity", a) + " " + g / 2 + "ms " + h._transitionTiming);
                d.css3.opacity(a, 0);
            }, g / 2);
        }
    };
    e.Api.SizesChanger = function(a, b) {
        var c = this;
        this._settings = null;
        this._eventEmitter = null;
        this._sizesChangerFunction = null;
        this._sizesChangerFunctions = {};
        this._css = {};
        this._construct = function() {
            c._settings = a;
            c._eventEmitter = b;
            c._sizesChangerFunctions = {};
            c._addDefaultSizesChanger();
            c._addDefaultPaddingBottomSizesChanger();
            c._addCSS3TransitionSizesChanger();
            c._addCSS3PaddingBottomTransitionSizesChanger();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            c._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.SizesChanger.prototype.setSizesChangerFunction = function(a) {
        if (!this._sizesChangerFunctions.hasOwnProperty(a)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_SIZES_CHANGER_INVALID_PARAM, a);
            return;
        }
        this._sizesChangerFunction = this._sizesChangerFunctions[a];
    };
    e.Api.SizesChanger.prototype.addSizesChangerFunction = function(a, b) {
        this._sizesChangerFunctions[a] = b;
    };
    e.Api.SizesChanger.prototype.getSizesChangerFunction = function() {
        return this._sizesChangerFunction;
    };
    e.Api.SizesChanger.prototype._addDefaultSizesChanger = function() {
        this._sizesChangerFunctions["default"] = function(a, b, c) {
            if (d.isBrowserSupportingTransitions()) {
                d.css3.transitionProperty(a, "width 0ms ease");
                d.css3.transitionProperty(a, "height 0ms ease");
            }
            d.css.set(a, {
                width: b,
                height: c
            });
        };
    };
    e.Api.SizesChanger.prototype._addDefaultPaddingBottomSizesChanger = function() {
        this._sizesChangerFunctions["defaultPaddingBottom"] = function(a, b, c) {
            if (d.isBrowserSupportingTransitions()) {
                d.css3.transitionProperty(a, "width 0ms ease");
                d.css3.transitionProperty(a, "padding-bottom 0ms ease");
            }
            d.css.set(a, {
                width: b,
                paddingBottom: c
            });
        };
    };
    e.Api.SizesChanger.prototype._addCSS3TransitionSizesChanger = function() {
        this._sizesChangerFunctions.css3 = function(a, b, c) {
            if (d.isBrowserSupportingTransitions()) {
                d.css3.transitionProperty(a, "width 200ms ease");
                d.css3.transitionProperty(a, "height 200ms ease");
            }
            d.css.set(a, {
                width: b,
                height: c
            });
        };
    };
    e.Api.SizesChanger.prototype._addCSS3PaddingBottomTransitionSizesChanger = function() {
        this._sizesChangerFunctions.css3PaddingBottom = function(a, b, c) {
            if (d.isBrowserSupportingTransitions()) {
                d.css3.transitionProperty(a, "width 200ms ease");
                d.css3.transitionProperty(a, "padding-bottom 200ms ease");
            }
            d.css.set(a, {
                width: b,
                "padding-bottom": c
            });
        };
    };
    e.Api.Slide = function(a, b, c, d) {
        var e = this;
        this._settings = null;
        this._gridifier = null;
        this._eventEmitter = null;
        this._sizesResolverManager = null;
        this._css = {};
        this._construct = function() {
            e._settings = a;
            e._gridifier = b;
            e._eventEmitter = c;
            e._sizesResolverManager = d;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            e._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.Slide.prototype._executeSlideShow = function(a, b, f, g, h, i, j, k, l, m, n, o, p) {
        var q = this;
        var r = m;
        var s = n;
        this._markAsToggleAnimationWithCoordsChange(a);
        if (p) var t = this._gridifier.hasItemBindedClone(a) ? this._gridifier.getItemClone(a) : a;
        if (!a.hasAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING)) {
            if (p) {
                d.css3.transition(t, "none");
                d.css3.opacity(t, 0);
                d.css3.transition(t, "");
            }
            i(a, k, l, 0, h, false, false, false, false, o);
            a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
        }
        var u = setTimeout(function() {
            if (!q._gridifier.hasItemBindedClone(a)) a.style.visibility = "visible";
            if (p) {
                d.css3.transitionProperty(t, c.getForCSS("opacity", t) + " " + f + "ms " + o);
                d.css3.opacity(t, 1);
            }
            i(a, r, s, f, h, false, false, false, false, o);
        }, 40);
        g.add(a, u);
        var v = setTimeout(function() {
            q._unmarkAsToggleAnimationWithCoordsChange(a);
            a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
            h.emitShowEvent(a);
            if (q._gridifier.hasItemBindedClone(a)) {
                i(a, a.style.left, a.style.top, 0, h, false, false, false, false, o);
            }
        }, f + 60);
        g.add(a, v);
    };
    e.Api.Slide.prototype._executeSlideHide = function(a, b, f, g, h, i, j, k, l, m, n, o, p) {
        a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
        this._markAsToggleAnimationWithCoordsChange(a);
        if (p) {
            var q = this._gridifier.hasItemBindedClone(a) ? this._gridifier.getItemClone(a) : a;
            d.css3.transition(q, c.getForCSS("opacity", q) + " " + f + "ms " + o);
            d.css3.opacity(q, 0);
        }
        i(a, k, l, f, h, false, false, false, false, o);
        var r = this;
        var s = setTimeout(function() {
            a.style.visibility = "hidden";
            if (r._gridifier.hasItemBindedClone(a)) {
                var b = r._gridifier.getItemClone(a);
                b.style.visibility = "hidden";
            }
        }, f);
        g.add(a, s);
        var t = setTimeout(function() {
            if (p) {
                d.css3.transitionProperty(q, c.getForCSS("opacity", q) + " 0ms " + o);
                d.css3.opacity(q, 1);
            }
            r._unmarkAsToggleAnimationWithCoordsChange(a);
            a.style.visibility = "hidden";
            a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
            h.emitHideEvent(a);
        }, f + 20);
        g.add(a, t);
    };
    e.Api.Slide.prototype._markAsToggleAnimationWithCoordsChange = function(a) {
        a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING, "yes");
        if (this._gridifier.hasItemBindedClone(a)) {
            this._gridifier.getItemClone(a).setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING, "yes");
        }
    };
    e.Api.Slide.prototype._unmarkAsToggleAnimationWithCoordsChange = function(a) {
        a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING);
        if (this._gridifier.hasItemBindedClone(a)) {
            this._gridifier.getItemClone(a).removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING);
        }
    };
    e.Api.Slide.prototype.createHorizontalSlideToggler = function(a, b, c, e) {
        var f = this;
        var a = a || false;
        var b = b || false;
        var g = !c;
        var h = c;
        var i = function(a, b) {
            if (g) return f._sizesResolverManager.outerWidth(a, true) * -1; else if (h) return f._sizesResolverManager.outerWidth(b) + f._sizesResolverManager.outerWidth(a, true);
        };
        return {
            show: function(c, g, h, j, k, l, m, n, o, p, q, r, s) {
                j.flush(c);
                if (!d.isBrowserSupportingTransitions()) {
                    c.style.visibility = "visible";
                    k.emitShowEvent(c);
                    return;
                }
                if (a) var t = 0; else if (b) var t = l.outerHeight(g) + l.outerHeight(c, true); else var t = c.style.top;
                f._executeSlideShow(c, g, h, j, k, m, n, i(c, g) + "px", t + "px", o, p, s, e || false);
            },
            hide: function(c, g, h, j, k, l, m, n, o, p, q, r, s) {
                j.flush(c);
                if (!d.isBrowserSupportingTransitions()) {
                    c.style.visibility = "hidden";
                    k.emitHideEvent(c);
                    return;
                }
                if (a) var t = 0; else if (b) var t = l.outerHeight(g) + l.outerHeight(c, true); else var t = c.style.top;
                f._executeSlideHide(c, g, h, j, k, m, n, i(c, g) + "px", t + "px", o, p, s, e || false);
            }
        };
    };
    e.Api.Slide.prototype.createVerticalSlideToggler = function(a, b, c, e) {
        var f = this;
        var a = a || false;
        var b = b || false;
        var g = !c;
        var h = c;
        var i = function(a, b) {
            if (g) return f._sizesResolverManager.outerHeight(a, true) * -1; else if (h) return f._sizesResolverManager.outerHeight(b) + f._sizesResolverManager.outerHeight(a, true);
        };
        return {
            show: function(c, g, h, j, k, l, m, n, o, p, q, r, s) {
                j.flush(c);
                if (!d.isBrowserSupportingTransitions()) {
                    c.style.visibility = "visible";
                    k.emitShowEvent(c);
                    return;
                }
                if (a) var t = 0; else if (b) var t = l.outerWidth(g) + l.outerWidth(c, true); else var t = c.style.left;
                f._executeSlideShow(c, g, h, j, k, m, n, t + "px", i(c, g) + "px", o, p, s, e || false);
            },
            hide: function(c, g, h, j, k, l, m, n, o, p, q, r, s) {
                j.flush(c);
                if (!d.isBrowserSupportingTransitions()) {
                    c.style.visibility = "hidden";
                    k.emitHideEvent(c);
                    return;
                }
                if (a) var t = 0; else if (b) var t = l.outerWidth(g) + l.outerWidth(c, true); else var t = c.style.left;
                f._executeSlideHide(c, g, h, j, k, m, n, t + "px", i(c, g) + "px", o, p, s, e || false);
            }
        };
    };
    e.Api.Slide.prototype.createCycledSlider = function(a) {
        var b = 1;
        return {
            show: function(c, d, e, f, g, h, i, j, k, l, m, n, o) {
                b++;
                var p = b % a.length;
                var q = a[p];
                q.show(c, d, e, f, g, h, i, j, k, l, m, n, o);
            },
            hide: function(c, d, e, f, g, h, i, j, k, l, m, n, o) {
                b++;
                var p = b % a.length;
                var q = a[p];
                q.hide(c, d, e, f, g, h, i, j, k, l, m, n, o);
            }
        };
    };
    e.Api.Sort = function(a, b, c) {
        var d = this;
        this._settings = null;
        this._gridifier = null;
        this._eventEmitter = null;
        this._sortComparatorTools = null;
        this._sortFunction = null;
        this._sortFunctions = {};
        this._areRetransformFunctionsCreated = false;
        this._retransformSortFunction = null;
        this._retransformSortFunctions = {};
        this._retransformSortGridRefreshTimeout = null;
        this._css = {};
        this._construct = function() {
            d._settings = a;
            d._gridifier = b;
            d._eventEmitter = c;
            d._sortFunctions = {};
            d._addDefaultSort();
            d._addDefaultRetransformSort();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            d._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.Sort.prototype.getSortComparatorTools = function() {
        if (this._sortComparatorTools == null) {
            var a = function(a, b) {
                for (var c = 0; c < b.length; c++) a = a.replace(b[c][0], b[c][1]);
                return a;
            };
            this._sortComparatorTools = {
                comparatorFns: {
                    byData: function(b, c, d) {
                        var e = b.getAttribute(c);
                        return !d ? e : a(e, d);
                    },
                    byDataInt: function(b, c, e) {
                        var f = b.getAttribute(c);
                        return !e ? d.toInt(f) : d.toInt(a(f, e));
                    },
                    byDataFloat: function(b, c, d) {
                        var e = b.getAttribute(c);
                        return !d ? parseFloat(e) : parseFloat(a(e, d));
                    },
                    byContent: function(b, c, d) {
                        var e = b.innerHTML;
                        return !d ? e : a(e, d);
                    },
                    byContentInt: function(b, c, e) {
                        var f = b.innerHTML;
                        return !e ? d.toInt(f) : d.toInt(a(f, e));
                    },
                    byContentFloat: function(b, c, d) {
                        var e = b.innerHTML;
                        return !d ? parseFloat(e) : parseFloat(a(e, d));
                    },
                    byQuery: function(b, c, e) {
                        var f = d.get.byQuery(b, c)[0].innerHTML;
                        return !e ? f : a(f, e);
                    },
                    byQueryInt: function(b, c, e) {
                        var f = d.get.byQuery(b, c)[0].innerHTML;
                        return !e ? d.toInt(f) : d.toInt(a(f, e));
                    },
                    byQueryFloat: function(b, c, e) {
                        var f = d.get.byQuery(b, c)[0].innerHTML;
                        return !e ? parseFloat(f) : parseFloat(a(f, e));
                    }
                },
                saveOriginalOrder: function(a) {
                    for (var b = 0; b < a.length; b++) {
                        a[b].setAttribute(e.Collector.ITEM_SORTING_INDEX_DATA_ATTR, b + 1);
                    }
                },
                flushOriginalOrder: function(a) {
                    for (var b = 0; b < a.length; b++) {
                        a[b].removeAttribute(e.Collector.ITEM_SORTING_INDEX_DATA_ATTR);
                    }
                },
                byOriginalPos: function(a, b) {
                    var c = a.getAttribute(e.Collector.ITEM_SORTING_INDEX_DATA_ATTR);
                    var f = b.getAttribute(e.Collector.ITEM_SORTING_INDEX_DATA_ATTR);
                    if (d.toInt(c) > d.toInt(f)) return 1; else if (d.toInt(c) < d.toInt(f)) return -1;
                },
                byComparator: function(a, b, c) {
                    var d = c ? -1 : 1;
                    if (a > b) return 1 * d; else if (a < b) return -1 * d;
                    return 0;
                },
                byMultipleComparators: function(a, b, c) {
                    for (var d = 0; d < c.length; d++) {
                        var e = this.byComparator(c[d].forFirstItem, c[d].forSecondItem, c[d].reverseOrder);
                        if (e == 0) {
                            if (d == c.length - 1) return this.byOriginalPos(a, b);
                            continue;
                        }
                        return e;
                    }
                },
                buildComparators: function(a, b, c, e, f, g) {
                    if (typeof e == "undefined") throw new Error("Gridifier error: sort comparator param is undefined.");
                    if (!d.isArray(e)) {
                        var h = [ [ e, g ] ];
                    } else {
                        var h = [];
                        for (var i = 0; i < e.length; i++) {
                            var g = false;
                            if (e[i].indexOf("|desc") !== -1) {
                                g = true;
                                e[i] = e[i].replace("|desc", "");
                            }
                            h.push([ e[i], g ]);
                        }
                    }
                    var j = [];
                    for (var i = 0; i < h.length; i++) {
                        j.push({
                            forFirstItem: c(a, h[i][0], f),
                            forSecondItem: c(b, h[i][0], f),
                            reverseOrder: h[i][1]
                        });
                    }
                    return j;
                },
                sortBy: function(a, b, c, d, e, f) {
                    return this.byMultipleComparators(a, b, this.buildComparators(a, b, c, d, f || false, e || false));
                },
                byData: function(a, b, c, d, e) {
                    return this.sortBy(a, b, this.comparatorFns.byData, c, d, e);
                },
                byDataInt: function(a, b, c, d, e) {
                    return this.sortBy(a, b, this.comparatorFns.byDataInt, c, d, e);
                },
                byDataFloat: function(a, b, c, d, e) {
                    return this.sortBy(a, b, this.comparatorFns.byDataFloat, c, d, e);
                },
                byContent: function(a, b, c, d) {
                    return this.sortBy(a, b, this.comparatorFns.byContent, null, c, d);
                },
                byContentInt: function(a, b, c, d) {
                    return this.sortBy(a, b, this.comparatorFns.byContentInt, null, c, d);
                },
                byContentFloat: function(a, b, c, d) {
                    return this.sortBy(a, b, this.comparatorFns.byContentFloat, null, c, d);
                },
                byQuery: function(a, b, c, d, e) {
                    return this.sortBy(a, b, this.comparatorFns.byQuery, c, d, e);
                },
                byQueryInt: function(a, b, c, d, e) {
                    return this.sortBy(a, b, this.comparatorFns.byQueryInt, c, d, e);
                },
                byQueryFloat: function(a, b, c, d, e) {
                    return this.sortBy(a, b, this.comparatorFns.byQueryFloat, c, d, e);
                }
            };
        }
        return this._sortComparatorTools;
    };
    e.Api.Sort.prototype.setSortFunction = function(a) {
        if (!this._sortFunctions.hasOwnProperty(a)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_SORT_INVALID_PARAM, a);
            return;
        }
        this._sortFunction = this._sortFunctions[a];
    };
    e.Api.Sort.prototype.addSortFunction = function(a, b) {
        this._sortFunctions[a] = b;
    };
    e.Api.Sort.prototype.getSortFunction = function() {
        return this._sortFunction;
    };
    e.Api.Sort.prototype._addDefaultSort = function() {
        this._sortFunctions["default"] = function(a, b) {
            var c = a.getAttribute(e.Collector.ITEM_SORTING_INDEX_DATA_ATTR);
            var d = b.getAttribute(e.Collector.ITEM_SORTING_INDEX_DATA_ATTR);
            return parseInt(c, 10) - parseInt(d, 10);
        };
    };
    e.Api.Sort.RETRANSFORM_SORT_GRID_REFRESH_TIMEOUT = 20;
    e.Api.Sort.prototype.setRetransformSortFunction = function(a) {
        var b = this;
        if (a != "default") {
            this._createRetransformSortFunctions();
        }
        if (!this._retransformSortFunctions.hasOwnProperty(a)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_RETRANSFORM_SORT_INVALID_PARAM, a);
            return;
        }
        if (a == "default") {
            this._eventEmitter.onBeforeShowPerRetransformSorter(null);
        } else {
            this._eventEmitter.onBeforeShowPerRetransformSorter(function() {
                if (b._retransformSortGridRefreshTimeout != null) {
                    clearTimeout(b._retransformSortGridRefreshTimeout);
                    b._retransformSortGridRefreshTimeout = null;
                }
                b._retransformSortGridRefreshTimeout = setTimeout(function() {
                    if (b._settings.hasCustomRepackSize()) {
                        var a = b._settings.getCustomRepackSize();
                        var c = b._gridifier.getAll();
                        if (c.length < a) b._gridifier.triggerResize(); else {
                            var d = c[c.length - a];
                            var e = b._gridifier.getTransformOperation();
                            e.executeRetransformFromFirstSortedConnection([ d ]);
                        }
                    } else {
                        b._gridifier.triggerResize();
                    }
                }, e.Api.Sort.RETRANSFORM_SORT_GRID_REFRESH_TIMEOUT);
            });
        }
        this._retransformSortFunction = this._retransformSortFunctions[a];
    };
    e.Api.Sort.prototype._createRetransformSortFunctions = function() {
        if (this._areRetransformSortFunctionsCreated) return;
        this._areRetransformSortFunctionsCreated = true;
        this._addBySizesRetransformSort();
    };
    e.Api.Sort.prototype.addRetransformSortFunction = function(a, b) {
        this._retransformSortFunctions[a] = b;
    };
    e.Api.Sort.prototype.getRetransformSortFunction = function() {
        return this._retransformSortFunction;
    };
    e.Api.Sort.prototype._addDefaultRetransformSort = function() {
        this._retransformSortFunctions["default"] = function(a) {
            return a;
        };
    };
    e.Api.Sort.RETRANSFORM_SORT_SINGLE_BATCH_MARKER = 1e5;
    e.Api.Sort.prototype._addBySizesRetransformSort = function() {
        var a = this;
        var b = function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = Math.abs(a[b].x2 - a[b].x1) + 1;
                var d = Math.abs(a[b].y2 - a[b].y1) + 1;
                var e = Math.round(c * d);
                a[b].area = e;
                if (c >= d) a[b].isLandscape = true; else a[b].isLandscape = false;
            }
        };
        var c = function(a) {
            var b = [];
            for (var c = 0; c < a.length; c++) {
                var d = a[c].area;
                var e = false;
                for (var f = 0; f < b.length; f++) {
                    if (b[f].area == d) {
                        b[f].connections.push(a[c]);
                        e = true;
                        break;
                    }
                }
                if (!e) {
                    b.push({
                        area: d,
                        connections: [ a[c] ]
                    });
                }
            }
            return b;
        };
        var d = function(a) {
            var b = [ {
                area: "landscape",
                connections: []
            }, {
                area: "portrait",
                connections: []
            } ];
            for (var c = 0; c < a.length; c++) {
                if (a[c].isLandscape) b[0].connections.push(a[c]); else if (!a[c].isLandscape) b[1].connections.push(a[c]);
            }
            return b;
        };
        var f = function(a, b, e) {
            e = e || false;
            if (!e) {
                var f = c(a);
                f.sort(function(a, b) {
                    return parseFloat(a.area) - parseFloat(b).area;
                });
            } else {
                var f = d(a);
            }
            var g = [];
            var h = false;
            while (!h) {
                var i = true;
                for (var j = 0; j < f.length; j++) {
                    if (f[j].connections.length != 0) {
                        if (j == 0) {
                            for (var k = 0; k < b; k++) {
                                if (f[j].connections.length != 0) g.push(f[j].connections.shift());
                            }
                        } else {
                            g.push(f[j].connections.shift());
                        }
                        i = false;
                    }
                }
                if (i) h = true;
            }
            return g;
        };
        var g = function(a) {
            var b = 0;
            for (var c = 0; c < a.length; c++) {
                b++;
                a[c].retransformSortPosition = b;
            }
        };
        var h = function(a, b) {
            var c = [];
            var d = [];
            for (var e = 0; e < a.length; e++) {
                d.push(a[e]);
                if ((e + 1) % b == 0) {
                    c.push(d);
                    d = [];
                }
            }
            if (d.length != 0) c.push(d);
            return c;
        };
        var i = function(a, b) {
            a.splice(0, a.length);
            for (var c = 0; c < b.length; c++) {
                for (var d = 0; d < b[c].length; d++) {
                    a.push(b[c][d]);
                }
            }
            return a;
        };
        var j = function(a, c) {
            return function(d) {
                b(d);
                g(d);
                var e = h(d, a);
                for (var j = 0; j < e.length; j++) e[j] = f(e[j], c);
                return i(d, e);
            };
        };
        this._retransformSortFunctions["areaEvenly"] = j(e.Api.Sort.RETRANSFORM_SORT_SINGLE_BATCH_MARKER, 1);
        var k = e.Api.Sort.RETRANSFORM_SORT_SINGLE_BATCH_MARKER;
        var l = [ [ "areaEvenlyAll-2", k, 2 ], [ "areaEvenlyAll-3", k, 3 ], [ "areaEvenlyAll-4", k, 4 ], [ "areaEvenlyAll-5", k, 5 ] ];
        for (var m = 5; m <= 50; m += 5) {
            for (var n = 1; n <= 5; n++) {
                l.push([ "areaEvenly" + m + "-" + n, m, n ]);
            }
        }
        for (var m = 0; m < l.length; m++) {
            this._retransformSortFunctions[l[m][0]] = j(l[m][1], l[m][2]);
        }
        var o = function(a) {
            if (a) var c = -1; else var c = 1;
            return function(a) {
                b(a);
                g(a);
                var d = h(a, e.Api.Sort.RETRANSFORM_SORT_SINGLE_BATCH_MARKER);
                for (var f = 0; f < d.length; f++) {
                    d[f].sort(function(a, b) {
                        if (a.area > b.area) return -1 * c; else if (a.area < b.area) return 1 * c; else return a.retransformSortPosition - b.retransformSortPosition;
                    });
                }
                return i(a, d);
            };
        };
        this._retransformSortFunctions["areaDesc"] = o(false);
        this._retransformSortFunctions["areaAsc"] = o(true);
        this._retransformSortFunctions["orientationEvenly"] = function(a) {
            b(a);
            g(a);
            var c = h(a, e.Api.Sort.RETRANSFORM_SORT_SINGLE_BATCH_MARKER);
            for (var d = 0; d < c.length; d++) c[d] = f(c[d], 1, true);
            return i(a, c);
        };
    };
    e.Api.Toggle = function(a, b, c, d) {
        var f = this;
        this._settings = null;
        this._gridifier = null;
        this._eventEmitter = null;
        this._sizesResolverManager = null;
        this._slideApi = null;
        this._rotateApi = null;
        this._toggleFunction = null;
        this._toggleFunctions = {};
        this._css = {};
        this._construct = function() {
            f._settings = a;
            f._gridifier = b;
            f._eventEmitter = c;
            f._sizesResolverManager = d;
            f._slideApi = new e.Api.Slide(f._settings, f._gridifier, f._eventEmitter, f._sizesResolverManager);
            f._rotateApi = new e.Api.Rotate(f._settings, f._eventEmitter, f._sizesResolverManager);
            f._toggleFunctions = {};
            f._addSlides();
            f._addRotates();
            f._addScale();
            f._addFade();
            f._addVisibility();
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            f._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING = "data-gridifier-toggle-animation-is-running";
    e.Api.Toggle.IS_TOGGLE_ANIMATION_WITH_COORDS_CHANGE_RUNNING = "data-gridifier-toggle-animation-with-coords-change-is-running";
    e.Api.Toggle.prototype.setCollectorInstance = function(a) {
        this._rotateApi.setCollectorInstance(a);
    };
    e.Api.Toggle.prototype.setToggleFunction = function(a) {
        if (!this._toggleFunctions.hasOwnProperty(a)) {
            new e.Error(e.Error.ERROR_TYPES.SETTINGS.SET_TOGGLE_INVALID_PARAM, a);
            return;
        }
        this._toggleFunction = this._toggleFunctions[a];
    };
    e.Api.Toggle.prototype.addToggleFunction = function(a, b) {
        this._toggleFunctions[a] = b;
    };
    e.Api.Toggle.prototype.getToggleFunction = function() {
        return this._toggleFunction;
    };
    e.Api.Toggle.prototype._addSlides = function() {
        var a = this;
        var b = [ "slideLeft", "slideLeftTop", "slideLeftBottom", "slideRight", "slideRightTop", "slideRightBottom", "slideTop", "slideTopLeft", "slideTopRight", "slideBottom", "slideBottomLeft", "slideBottomRight" ];
        var c = function(a, b) {
            this._toggleFunctions[a[0]] = this._slideApi.createHorizontalSlideToggler(false, false, false, b);
            this._toggleFunctions[a[1]] = this._slideApi.createHorizontalSlideToggler(true, false, false, b);
            this._toggleFunctions[a[2]] = this._slideApi.createHorizontalSlideToggler(false, true, false, b);
            this._toggleFunctions[a[3]] = this._slideApi.createHorizontalSlideToggler(false, false, true, b);
            this._toggleFunctions[a[4]] = this._slideApi.createHorizontalSlideToggler(true, false, true, b);
            this._toggleFunctions[a[5]] = this._slideApi.createHorizontalSlideToggler(false, true, true, b);
            this._toggleFunctions[a[6]] = this._slideApi.createVerticalSlideToggler(false, false, false, b);
            this._toggleFunctions[a[7]] = this._slideApi.createVerticalSlideToggler(true, false, false, b);
            this._toggleFunctions[a[8]] = this._slideApi.createVerticalSlideToggler(false, true, false, b);
            this._toggleFunctions[a[9]] = this._slideApi.createVerticalSlideToggler(false, false, true, b);
            this._toggleFunctions[a[10]] = this._slideApi.createVerticalSlideToggler(true, false, true, b);
            this._toggleFunctions[a[11]] = this._slideApi.createVerticalSlideToggler(false, true, true, b);
        };
        c.call(this, b, false);
        for (var d = 0; d < b.length; d++) b[d] += "WithFade";
        c.call(this, b, true);
        var e = [ [ "slideLeftThanSlideRight", "slideLeft", "slideRight" ], [ "slideTopThanSlideBottom", "slideTop", "slideBottom" ], [ "slideLeftTopThanSlideRightTop", "slideLeftTop", "slideRightTop" ], [ "slideTopLeftThanSlideBottomLeft", "slideTopLeft", "slideBottomLeft" ], [ "slideLeftBottomThanSlideRightBottom", "slideLeftBottom", "slideRightBottom" ], [ "slideTopRightThanSlideBottomRight", "slideTopRight", "slideBottomRight" ] ];
        for (var d = 0; d < e.length; d++) {
            this._toggleFunctions[e[d][0]] = this._slideApi.createCycledSlider([ this._toggleFunctions[e[d][1]], this._toggleFunctions[e[d][2]] ]);
            this._toggleFunctions[e[d][0] + "WithFade"] = this._slideApi.createCycledSlider([ this._toggleFunctions[e[d][1] + "WithFade"], this._toggleFunctions[e[d][2] + "WithFade"] ]);
        }
        var f = [ [ "slideClockwiseFromCenters", "slideLeft", "slideTop", "slideRight", "slideBottom" ], [ "slideClockwiseFromSides", "slideLeft", "slideTop", "slideRight", "slideBottom" ], [ "slideClockwiseFromCorners", "slideLeftTop", "slideRightTop", "slideRightBottom", "slideLeftBottom" ] ];
        for (var d = 0; d < f.length; d++) {
            this._toggleFunctions[f[d][0]] = this._slideApi.createCycledSlider([ this._toggleFunctions[f[d][1]], this._toggleFunctions[f[d][2]], this._toggleFunctions[f[d][3]], this._toggleFunctions[f[d][4]] ]);
            this._toggleFunctions[f[d][0] + "WithFade"] = this._slideApi.createCycledSlider([ this._toggleFunctions[f[d][1] + "WithFade"], this._toggleFunctions[f[d][2] + "WithFade"], this._toggleFunctions[f[d][3] + "WithFade"], this._toggleFunctions[f[d][4] + "WithFade"] ]);
        }
    };
    e.Api.Toggle.prototype._createRotator = function(a, b, c, e, f) {
        var g = this;
        this._toggleFunctions[a] = {
            show: function(a, c, h, i, j, k, l, m, n, o, p, q, r) {
                i.flush(a);
                if (!d.isBrowserSupportingTransitions()) {
                    a.style.visibility = "visible";
                    j.emitShowEvent(a);
                    return;
                }
                g._rotateApi.setRotateFadeType(f);
                g._rotateApi.setTransitionTiming(r);
                g._rotateApi[b](a, c, e, i, n, o, q);
            },
            hide: function(a, b, h, i, j, k, l, m, n, o, p, q, r) {
                i.flush(a);
                if (!d.isBrowserSupportingTransitions()) {
                    a.style.visibility = "hidden";
                    j.emitHideEvent(a);
                    return;
                }
                g._rotateApi.setRotateFadeType(f);
                g._rotateApi.setTransitionTiming(r);
                g._rotateApi[c](a, b, e, i, n, o, q);
            }
        };
    };
    e.Api.Toggle.prototype._addRotates = function() {
        var a = [ "", "WithFade", "WithFadeOut" ];
        var b = [ e.Api.Rotate.ROTATE_FADE_TYPES.NONE, e.Api.Rotate.ROTATE_FADE_TYPES.FULL, e.Api.Rotate.ROTATE_FADE_TYPES.ON_HIDE_MIDDLE ];
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            var f = b[c];
            this._createRotator("rotate3dX" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.X, f);
            this._createRotator("rotate3dY" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.Y, f);
            this._createRotator("rotate3dZ" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.Z, f);
            this._createRotator("rotate3dXY" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.XY, f);
            this._createRotator("rotate3dXZ" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.XZ, f);
            this._createRotator("rotate3dYZ" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.YZ, f);
            this._createRotator("rotate3dXYZ" + d, "show3d", "hide3d", e.Api.Rotate.ROTATE_MATRIX_TYPES.XYZ, f);
            this._createRotator("rotateX" + d, "show", "hide", e.Api.Rotate.ROTATE_FUNCTION_TYPES.X, f);
            this._createRotator("rotateY" + d, "show", "hide", e.Api.Rotate.ROTATE_FUNCTION_TYPES.Y, f);
            this._createRotator("rotateZ" + d, "show", "hide", e.Api.Rotate.ROTATE_FUNCTION_TYPES.Z, f);
        }
    };
    e.Api.Toggle.prototype._addScale = function() {
        var a = this;
        var b = function(a, b, f, g) {
            return {
                show: function(f, g, h, i, j, k, l, m, n, o, p, q, r) {
                    i.flush(f);
                    if (!d.isBrowserSupportingTransitions()) {
                        f.style.visibility = "visible";
                        j.emitShowEvent(f);
                        return;
                    }
                    q.lockCloneOnToggle(f);
                    if (p.hasTranslateOrTranslate3DTransformSet(f)) {
                        p.setTransformOriginAccordingToCurrentTranslate(f, n, o, k.outerWidth(f, true), k.outerHeight(f, true));
                    }
                    if (!f.hasAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING)) {
                        d.css3.transition(f, "none");
                        a(f, h, r);
                        d.css3.transformProperty(f, "scale3d", "0,0,0");
                        f.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
                    }
                    var s = setTimeout(function() {
                        f.style.visibility = "visible";
                        d.css3.transition(f, c.getForCSS("transform", f) + " " + h + "ms " + r);
                        d.css3.transformProperty(f, "scale3d", "1,1,1");
                        b(f, h, r);
                    }, 40);
                    i.add(f, s);
                    var t = setTimeout(function() {
                        q.unlockCloneOnToggle(f);
                        p.resetTransformOrigin(f);
                        f.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
                        j.emitShowEvent(f);
                    }, h + 60);
                    i.add(f, t);
                },
                hide: function(a, b, h, i, j, k, l, m, n, o, p, q, r) {
                    i.flush(a);
                    if (!d.isBrowserSupportingTransitions()) {
                        a.style.visibility = "hidden";
                        j.emitHideEvent(a);
                        return;
                    }
                    q.lockCloneOnToggle(a);
                    if (p.hasTranslateOrTranslate3DTransformSet(a)) {
                        p.setTransformOriginAccordingToCurrentTranslate(a, n, o, k.outerWidth(a, true), k.outerHeight(a, true));
                    }
                    d.css3.transition(a, c.getForCSS("transform", a) + " " + h + "ms " + r);
                    a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
                    d.css3.transformProperty(a, "scale3d", "0,0,0");
                    f(a, h, r);
                    if (h > 200) var s = h - 100; else var s = h - 50;
                    if (s < 0) s = 0;
                    var t = setTimeout(function() {
                        a.style.visibility = "hidden";
                    }, s);
                    i.add(a, t);
                    var u = setTimeout(function() {
                        q.unlockCloneOnToggle(a).hideCloneOnToggle(a);
                        a.style.visibility = "hidden";
                        d.css3.transition(a, "none");
                        d.css3.transformProperty(a, "scale3d", "1,1,1");
                        g(a, h, r);
                        d.css3.transition(a, "");
                        p.resetTransformOrigin(a);
                        a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
                        j.emitHideEvent(a);
                    }, h + 20);
                    i.add(a, u);
                }
            };
        };
        var f = function(a, b) {
        };
        this._toggleFunctions.scale = b(f, f, f, f);
        this._toggleFunctions.scaleWithFade = b(function(a, b, c) {
            d.css3.opacity(a, "0");
        }, function(a, b, e) {
            d.css3.transitionProperty(a, c.getForCSS("opacity", a) + " " + b + "ms " + e);
            d.css3.opacity(a, 1);
        }, function(a, b, e) {
            d.css3.transitionProperty(a, c.getForCSS("opacity", a) + " " + b + "ms " + e);
            d.css3.opacity(a, "0");
        }, function(a, b, c) {
            d.css3.opacity(a, "1");
        });
    };
    e.Api.Toggle.prototype._addFade = function() {
        var a = this;
        this._toggleFunctions.fade = {
            show: function(a, b, f, g, h, i, j, k, l, m, n, o, p) {
                g.flush(a);
                if (!d.isBrowserSupportingTransitions()) {
                    a.style.visibility = "visible";
                    h.emitShowEvent(a);
                    return;
                }
                o.lockCloneOnToggle(a);
                if (!a.hasAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING)) {
                    d.css3.transition(a, "none");
                    d.css3.opacity(a, "0");
                    a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
                }
                var q = setTimeout(function() {
                    a.style.visibility = "visible";
                    d.css3.transition(a, c.getForCSS("opacity", a) + " " + f + "ms " + p);
                    d.css3.opacity(a, 1);
                }, 40);
                g.add(a, q);
                var r = setTimeout(function() {
                    o.unlockCloneOnToggle(a);
                    a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
                    h.emitShowEvent(a);
                }, f + 60);
                g.add(a, r);
            },
            hide: function(a, b, f, g, h, i, j, k, l, m, n, o, p) {
                g.flush(a);
                if (!d.isBrowserSupportingTransitions()) {
                    a.style.visibility = "hidden";
                    h.emitHideEvent(a);
                    return;
                }
                o.lockCloneOnToggle(a);
                d.css3.transition(a, c.getForCSS("opacity", a) + " " + f + "ms " + p);
                a.setAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING, "yes");
                d.css3.opacity(a, "0");
                var q = setTimeout(function() {
                    o.unlockCloneOnToggle(a).hideCloneOnToggle(a);
                    a.removeAttribute(e.Api.Toggle.IS_TOGGLE_ANIMATION_RUNNING);
                    a.style.visibility = "hidden";
                    d.css3.transition(a, "none");
                    d.css3.opacity(a, "1");
                    d.css3.transition(a, "");
                    h.emitHideEvent(a);
                }, f + 20);
                g.add(a, q);
            }
        };
    };
    e.Api.Toggle.prototype._addVisibility = function() {
        var a = this;
        this._toggleFunctions.visibility = {
            show: function(a, b, c, d, e, f) {
                d.flush(a);
                a.style.visibility = "visible";
                e.emitShowEvent(a);
            },
            hide: function(a, b, c, d, e, f) {
                d.flush(a);
                a.style.visibility = "hidden";
                e.emitHideEvent(a);
            }
        };
    };
    e.Api.ToggleTimeouter = function() {
        var a = this;
        this._css = {};
        this._toggleTimeouts = {};
        this._nextToggleTimeouterItemId = 0;
        this._construct = function() {
            a._toggleTimeouts = {};
            a._nextToggleTimeouterItemId = 0;
        };
        this._bindEvents = function() {};
        this._unbindEvents = function() {};
        this.destruct = function() {
            a._unbindEvents();
        };
        this._construct();
        return this;
    };
    e.Api.ToggleTimeouter.TOGGLE_TIMEOUTER_ITEM_ID_DATA_ATTR = "data-gridifier-toggle-timeouter-id";
    e.Api.ToggleTimeouter.prototype._markItemWithToggleTimeouterId = function(a) {
        this._nextToggleTimeouterItemId++;
        a.setAttribute(e.Api.ToggleTimeouter.TOGGLE_TIMEOUTER_ITEM_ID_DATA_ATTR, this._nextToggleTimeouterItemId);
    };
    e.Api.ToggleTimeouter.prototype._isItemMarkedWithToggleTimeouterId = function(a) {
        return d.hasAttribute(a, e.Api.ToggleTimeouter.TOGGLE_TIMEOUTER_ITEM_ID_DATA_ATTR);
    };
    e.Api.ToggleTimeouter.prototype._getToggleTimeouterItemId = function(a) {
        if (this._isItemMarkedWithToggleTimeouterId(a)) return a.getAttribute(e.Api.ToggleTimeouter.TOGGLE_TIMEOUTER_ITEM_ID_DATA_ATTR);
        this._markItemWithToggleTimeouterId(a);
        return a.getAttribute(e.Api.ToggleTimeouter.TOGGLE_TIMEOUTER_ITEM_ID_DATA_ATTR);
    };
    e.Api.ToggleTimeouter.prototype.add = function(a, b) {
        var c = this._getToggleTimeouterItemId(a);
        if (!this._toggleTimeouts.hasOwnProperty(c)) this._toggleTimeouts[c] = [];
        this._toggleTimeouts[c].push(b);
    };
    e.Api.ToggleTimeouter.prototype.flush = function(a) {
        var b = this._getToggleTimeouterItemId(a);
        if (this._toggleTimeouts.hasOwnProperty(b)) {
            for (var c = 0; c < this._toggleTimeouts[b].length; c++) {
                clearTimeout(this._toggleTimeouts[b][c]);
            }
            this._toggleTimeouts[b] = [];
        }
    };
    e.Bridge = {};
    e.Bridge.SizesResolver = a;
    e.Bridge.Prefixer = c;
    e.Bridge.Dom = d;
    return e;
});