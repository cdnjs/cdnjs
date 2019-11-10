(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bricklayer;
(function (Bricklayer) {
    // Helper Functions
    function toArray(arrayLike) {
        return [].slice.call(arrayLike);
    }
    function triggerEvent(el, eventName, data) {
        if (window["CustomEvent"]) {
            var event = new CustomEvent(eventName, { detail: data });
        }
        else {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, data);
        }
        return el.dispatchEvent(event);
    }
    var DEFAULTS = {
        rulerClassName: "bricklayer-column-sizer",
        columnClassName: "bricklayer-column"
    };
    var SimpleElement = (function () {
        function SimpleElement(className) {
            this.element = document.createElement("div");
            this.element.className = className;
        }
        SimpleElement.prototype.destroy = function () {
            this.element.parentNode.removeChild(this.element);
        };
        return SimpleElement;
    }());
    var Ruler = (function (_super) {
        __extends(Ruler, _super);
        function Ruler() {
            _super.apply(this, arguments);
        }
        Ruler.prototype.getWidth = function () {
            this.element.setAttribute('style', "\n        display: block;\n        visibility: hidden !important;\n        top: -1000px !important;\n      ");
            var width = this.element.offsetWidth;
            this.element.removeAttribute('style');
            return width;
        };
        return Ruler;
    }(SimpleElement));
    var Column = (function (_super) {
        __extends(Column, _super);
        function Column() {
            _super.apply(this, arguments);
        }
        return Column;
    }(SimpleElement));
    var Container = (function () {
        function Container(element, options) {
            if (options === void 0) { options = DEFAULTS; }
            this.element = element;
            this.options = options;
            this.build();
            this.buildResponsive();
        }
        Container.prototype.append = function (item) {
            var _this = this;
            if (Array.isArray(item)) {
                item.forEach(function (item) { return _this.append(item); });
                return;
            }
            var column = this.findMinHeightColumn();
            this.elements = toArray(this.elements).concat([item]);
            this.applyPosition('append', column, item);
        };
        Container.prototype.prepend = function (item) {
            var _this = this;
            if (Array.isArray(item)) {
                item.forEach(function (item) { return _this.prepend(item); });
                return;
            }
            var column = this.findMinHeightColumn();
            this.elements = [item].concat(toArray(this.elements));
            this.applyPosition('prepend', column, item);
        };
        Container.prototype.on = function (eventName, handler) {
            // eventName may be:
            // - breakpoint
            // - afterAppend
            // - beforeAppend
            // - afterPrepend
            // - beforePrepend
            this.element.addEventListener("bricklayer." + eventName, handler);
            return this;
        };
        Container.prototype.redraw = function () {
            var columnCount = this.columnCount;
            this.checkColumnCount(false);
            this.reorderElements(columnCount);
            triggerEvent(this.element, "bricklayer.redraw", { columnCount: columnCount });
        };
        Container.prototype.destroy = function () {
            var _this = this;
            this.ruler.destroy();
            toArray(this.elements).forEach(function (el) { return _this.element.appendChild(el); });
            toArray(this.getColumns()).forEach(function (el) { return el.parentNode.removeChild(el); });
            triggerEvent(this.element, "bricklayer.destroy", {});
        };
        Container.prototype.build = function () {
            this.ruler = new Ruler(this.options.rulerClassName);
            this.elements = this.getElementsInOrder();
            this.element.insertBefore(this.ruler.element, this.element.firstChild);
        };
        Container.prototype.buildResponsive = function () {
            var _this = this;
            window.addEventListener("resize", function (e) { return _this.checkColumnCount(); });
            this.checkColumnCount();
            this.on("breakpoint", function (e) { return _this.reorderElements(e.detail.columnCount); });
            if (this.columnCount >= 1) {
                this.reorderElements(this.columnCount);
            }
        };
        Container.prototype.getColumns = function () {
            return this.element.querySelectorAll(":scope > ." + this.options.columnClassName);
        };
        Container.prototype.findMinHeightColumn = function () {
            var allColumns = toArray(this.getColumns());
            var heights = allColumns.map(function (column) { return column.offsetHeight; });
            var minHeight = Math.min.apply(null, heights);
            return allColumns[heights.indexOf(minHeight)];
        };
        Container.prototype.getElementsInOrder = function () {
            return this.element.querySelectorAll(":scope > *:not(." + this.options.columnClassName + "):not(." + this.options.rulerClassName + ")");
        };
        Container.prototype.checkColumnCount = function (publish) {
            if (publish === void 0) { publish = true; }
            var columnCount = this.getColumnCount();
            if (this.columnCount !== columnCount) {
                if (publish) {
                    triggerEvent(this.element, "bricklayer.breakpoint", { columnCount: columnCount });
                }
                this.columnCount = columnCount;
            }
        };
        Container.prototype.reorderElements = function (columnCount) {
            var _this = this;
            if (columnCount === void 0) { columnCount = 1; }
            var elements = toArray(this.elements).map(function (item) {
                var element = item.parentNode ? item.parentNode.removeChild(item) : item;
                return element;
            });
            var columns = this.getColumns();
            for (var i = 0; i < columns.length; i++) {
                columns[i].parentNode.removeChild(columns[i]);
            }
            for (var i = 0; i < columnCount; i++) {
                var element = (new Column(this.options.columnClassName)).element;
                this.element.appendChild(element);
            }
            elements.forEach(function (item) {
                var column = _this.findMinHeightColumn();
                column.appendChild(item);
            });
        };
        Container.prototype.getColumnCount = function () {
            var containerWidth = this.element.offsetWidth;
            var columnWidth = this.ruler.getWidth();
            if (columnWidth == 0) {
                return 1;
            }
            return Math.round(containerWidth / columnWidth);
        };
        Container.prototype.applyPosition = function (pos, column, item) {
            var _this = this;
            var trigger = function (timing) {
                var eventName = timing + pos.charAt(0).toUpperCase() + pos.substr(1);
                triggerEvent(_this.element, "bricklayer." + eventName, { item: item, column: column });
            };
            trigger('before');
            switch (pos) {
                case 'append':
                    column.appendChild(item);
                    break;
                case 'prepend':
                    column.insertBefore(item, column.firstChild);
                    break;
            }
            trigger('after');
        };
        return Container;
    }());
    Bricklayer.Container = Container;
})(Bricklayer || (Bricklayer = {}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () { return factory(); });
    }
    else if (typeof window !== "undefined" && root === window) {
        root.Bricklayer = factory();
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    return Bricklayer.Container;
}));

},{}]},{},[1]);
