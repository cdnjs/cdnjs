(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="typings/jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bricklayer;
(function (Bricklayer) {
    var DEFAULTS = {
        rulerClassName: "bricklayer-column-sizer",
        columnClassName: "bricklayer-column"
    };
    var SimpleElement = (function () {
        function SimpleElement(className) {
            this.element = document.createElement("div");
            this.element.className = className;
        }
        return SimpleElement;
    }());
    var Ruler = (function (_super) {
        __extends(Ruler, _super);
        function Ruler() {
            _super.apply(this, arguments);
        }
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
        function Container(selector, options) {
            if (options === void 0) { options = DEFAULTS; }
            this.options = options;
            this.element = jQuery(selector);
            this.ruler = new Ruler(options.rulerClassName);
            this.element.data('bricklayer', this);
            this.build();
            this.buildResponsive();
        }
        Container.prototype.append = function (item) {
            var _this = this;
            if (jQuery.isArray(item)) {
                item.forEach(function (item) { return _this.append(item); });
                return;
            }
            var column = this.findMinHeightColumn();
            this.elements = jQuery(this.elements.get().concat([item]));
            this.applyPosition('append', column, item);
        };
        Container.prototype.prepend = function (item) {
            var _this = this;
            if (jQuery.isArray(item)) {
                item.forEach(function (item) { return _this.prepend(item); });
                return;
            }
            var column = this.findMinHeightColumn();
            this.elements = jQuery([item].concat(this.elements.get()));
            this.applyPosition('prepend', column, item);
        };
        Container.prototype.onBreakpoint = function (handler) {
            this.element.on('bricklayer.breakpoint', handler);
            return this;
        };
        Container.prototype.onAfterAppend = function (handler) {
            this.element.on('bricklayer.afterAppend', handler);
            return this;
        };
        Container.prototype.onBeforeAppend = function (handler) {
            this.element.on('bricklayer.beforeAppend', handler);
            return this;
        };
        Container.prototype.onAfterPrepend = function (handler) {
            this.element.on('bricklayer.afterPrepend', handler);
            return this;
        };
        Container.prototype.onBeforePrepend = function (handler) {
            this.element.on('bricklayer.beforePrepend', handler);
            return this;
        };
        Container.prototype.build = function () {
            this.elements = this.getElementsInOrder();
            this.element.prepend(this.ruler.element);
        };
        Container.prototype.buildResponsive = function () {
            var _this = this;
            jQuery(window).on("resize", function (e) { return _this.checkColumnCount(); }).trigger("resize");
            this.onBreakpoint(function (e, size) { return _this.reorderElements(size); });
            if (this.columnCount >= 1) {
                this.reorderElements(this.columnCount);
            }
        };
        Container.prototype.getColumns = function () {
            return this.element.find("> ." + this.options.columnClassName);
        };
        Container.prototype.findMinHeightColumn = function () {
            var allColumns = this.getColumns();
            var column = allColumns.get().sort(function (a, b) {
                var aHeight = jQuery(a).height();
                var bHeight = jQuery(b).height();
                return aHeight > bHeight ? 1 : (aHeight == bHeight ? 0 : -1);
            });
            return jQuery(column).eq(0);
        };
        Container.prototype.getElementsInOrder = function () {
            return this.element.find("> *")
                .not("> ." + this.options.columnClassName)
                .not("> ." + this.options.rulerClassName);
        };
        Container.prototype.checkColumnCount = function () {
            var columnCount = this.getColumnCount();
            if (this.columnCount !== columnCount) {
                this.element.trigger('bricklayer.breakpoint', columnCount);
                this.columnCount = columnCount;
            }
        };
        Container.prototype.reorderElements = function (columnCount) {
            var _this = this;
            var elements = this.elements.detach();
            this.getColumns().remove();
            for (var i = 0; i < columnCount; i++) {
                var element = (new Column(this.options.columnClassName)).element;
                this.element.append(element);
            }
            elements.each(function (i, item) {
                var column = _this.findMinHeightColumn();
                column.append(item);
            });
        };
        Container.prototype.getColumnCount = function () {
            var containerWidth = this.element.width();
            var columnWidth = jQuery(this.ruler.element).width();
            return Math.round(containerWidth / columnWidth);
        };
        Container.prototype.applyPosition = function (pos, column, item) {
            var _this = this;
            var trigger = function (timing) {
                var eventName = timing + pos.charAt(0).toUpperCase() + pos.substr(1);
                _this.element.trigger("bricklayer." + eventName, [item, column]);
            };
            trigger('before');
            column[pos](item);
            trigger('after');
        };
        return Container;
    }());
    Bricklayer.Container = Container;
})(Bricklayer || (Bricklayer = {}));
jQuery.fn.bricklayer = function (options) {
    return new Bricklayer.Container(this, options);
};

},{}]},{},[1]);
