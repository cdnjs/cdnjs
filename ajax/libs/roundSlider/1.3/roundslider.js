/*!
 * roundSlider v1.3 | (c) 2015-2016, Soundar
 * MIT license | http://roundsliderui.com/licence.html
 */

(function ($, window, undefined) {
    "use strict";
    /*jslint nomen: true */

    var pluginName = "roundSlider";

    // The plugin initialization
    $.fn[pluginName] = function (options) {
        return CreateRoundSlider.call(this, options, arguments);
    };

    RoundSlider.prototype = {

        pluginName: pluginName,
        version: "1.3",

        // after the control initialization the updated default values
        // are merged into the options
        options: {},

        // default properties of the plugin. while add a new property,
        // that type should be included in the "_props:" for validation
        defaults: {
            min: 0,
            max: 100,
            step: 1,
            value: null,
            radius: 85,
            width: 18,
            handleSize: "+0",
            startAngle: 0,
            endAngle: "+360",
            animation: true,
            showTooltip: true,
            editableTooltip: true,
            readOnly: false,
            disabled: false,
            keyboardAction: true,
            mouseScrollAction: false,
            lineCap: "square",
            sliderType: "default",
            circleShape: "full",
            handleShape: "round",

            // events
            beforeCreate: null,
            create: null,
            start: null,
            drag: null,
            change: null,
            stop: null,
            tooltipFormat: null
        },
        _props: function () {
            return {
                numberType: ["min", "max", "step", "radius", "width", "startAngle"],
                booleanType: ["animation", "showTooltip", "editableTooltip", "readOnly", "disabled",
                    "keyboardAction", "mouseScrollAction"],
                stringType: ["sliderType", "circleShape", "handleShape", "lineCap"]
            };
        },
        control: null,
        _init: function () {
            this._isBrowserSupport = this._isBrowserSupported();
            this._isKO = false;
            this._isAngular = false;
            if (this.control.is("input")) {
                this._isInputType = true;
                this._hiddenField = this.control;
                this.control = createElement("div");
                this.control.insertAfter(this._hiddenField);
                this.options.value = this._hiddenField.val() || this.options.value;
                var that = this;
                this._checkKO() && setTimeout(function () { that._checkKO(); }, 1);
                this._checkAngular();
            }
            this._bindOnDrag = false;
            var _updateOn = this._dataElement().attr("data-updateon");
            if (typeof _updateOn == "string") { if (_updateOn == "drag") this._bindOnDrag = true; }
            else if (this._isAngular) this._bindOnDrag = true;

            this._onInit();
        },
        _onInit: function () {
            this._initialize();
            this._update();
            this._render();
        },
        _initialize: function () {
            if (!this._isBrowserSupport) return;
            this._isReadOnly = false;
            this._checkDataType();
            this._refreshCircleShape();
        },
        _render: function () {
            this.container = createElement("div.rs-container");
            this.innerContainer = createElement("div.rs-inner-container");
            this.block = createElement("div.rs-block rs-outer rs-border");
            this.container.append(this.innerContainer.append(this.block));
            this.control.addClass("rs-control").empty().append(this.container);

            this._setRadius();
            if (this._isBrowserSupport) {
                this._createLayers();
                this._setProperties();
                this._setValue();
                this._updateTooltipPos();
                this._bindControlEvents("_bind");
                this._checkIE();
            }
            else {
                var msg = createElement("div.rs-msg");
                msg.html(typeof this._throwError === "function" ? this._throwError() : this._throwError);
                this.control.empty().addClass("rs-error").append(msg);
                if (this._isInputType) this.control.append(this._dataElement());
            }
        },
        _update: function () {
            this._validateSliderType();
            this._updateStartEnd();
            this._validateStartEnd();
            this._handle1 = this._handle2 = this._handleDefaults();
            this._analyzeModelValue();
            this._validateModelValue();
        },
        _createLayers: function () {
            var padd = this.options.width, start = this._start, path;
            path = createElement("div.rs-path rs-transition");

            if (this._rangeSlider || this._showRange) {
                this.block1 = path.clone().addClass("rs-range-color").rsRotate(start);
                this.block2 = path.clone().addClass("rs-range-color").css("opacity", "0").rsRotate(start);
                this.block3 = path.clone().addClass("rs-path-color").rsRotate(start);
                this.block4 = path.addClass("rs-path-color").css({ "opacity": "1", "z-index": "1" }).rsRotate(start - 180);

                this.block.append(this.block1, this.block2, this.block3, this.block4).addClass("rs-split");
            }
            else this.block.append(path.addClass("rs-path-color"));

            this.lastBlock = createElement("span.rs-block").css({ "padding": padd });
            this.innerBlock = createElement("div.rs-inner rs-bg-color rs-border");
            this.lastBlock.append(this.innerBlock);
            this.block.append(this.lastBlock);
            this._appendHandle();
            this._appendOverlay();
            this._appendHiddenField();
        },
        _setProperties: function () {
            this._updatePre();
            this._setHandleShape();
            this._addAnimation();
            this._appendTooltip();
            if (!this.options.showTooltip) this._removeTooltip();
            if (this.options.disabled) this.disable();
            else if (this.options.readOnly) this._readOnly(true);
            if (this.options.mouseScrollAction) this._bindScrollEvents("_bind");
        },
        _updatePre: function () {
            this._prechange = this._predrag = this.options.value;
        },
        _setValue: function () {
            if (this._rangeSlider) {
                this._setHandleValue(1);
                this._setHandleValue(2);
            }
            else {
                if (this._showRange) this._setHandleValue(1);
                var index = (this.options.sliderType == "default") ? (this._active || 1) : parseFloat(this.bar.children().attr("index"));
                this._setHandleValue(index);
            }
        },
        _appendTooltip: function () {
            if (this.container.children(".rs-tooltip").length !== 0) return;
            this.tooltip = createElement("span.rs-tooltip rs-tooltip-text");
            this.container.append(this.tooltip);
            this._tooltipEditable();
            this._updateTooltip();
        },
        _removeTooltip: function () {
            if (this.container.children(".rs-tooltip").length == 0) return;
            this.tooltip && this.tooltip.remove();
        },
        _tooltipEditable: function () {
            if (!this.tooltip || !this.options.showTooltip) return;
            var hook;
            if (this.options.editableTooltip) {
                this.tooltip.addClass("edit");
                hook = "_bind";
            }
            else {
                this.tooltip.removeClass("edit");
                hook = "_unbind";
            }
            this[hook](this.tooltip, "click", this._editTooltip);
        },
        _editTooltip: function (e) {
            if (!this.tooltip.hasClass("edit") || this._isReadOnly) return;
            var border = parseFloat(this.tooltip.css("border-left-width")) * 2;
            this.input = createElement("input.rs-input rs-tooltip-text").css({
                height: this.tooltip.outerHeight() - border,
                width: this.tooltip.outerWidth() - border
            });
            this.tooltip.html(this.input).removeClass("edit").addClass("hover");

            this.input.focus().val(this._getTooltipValue(true));

            this._bind(this.input, "blur", this._focusOut);
            this._bind(this.input, "change", this._focusOut);
        },
        _focusOut: function (e) {
            if (e.type == "change") {
                this.options.value = this.input.val().replace("-", ",");
                this._analyzeModelValue();
                this._validateModelValue();
                this._setValue();
                this.input.val(this._getTooltipValue(true));
            }
            else {
                this.tooltip.addClass("edit").removeClass("hover");
                this._updateTooltip();
            }
            this._raiseEvent("change");
        },
        _setHandleShape: function () {
            var type = this.options.handleShape;
            this._handles().removeClass("rs-handle-dot rs-handle-square");
            if (type == "dot") this._handles().addClass("rs-handle-dot");
            else if (type == "square") this._handles().addClass("rs-handle-square");
            else this.options.handleShape = this.defaults.handleShape;
        },
        _setHandleValue: function (index) {
            this._active = index;
            var handle = this["_handle" + index];
            if (this.options.sliderType != "min-range") this.bar = this._activeHandleBar();
            this._changeSliderValue(handle.value, handle.angle);
        },
        _setAnimation: function () {
            if (this.options.animation) this._addAnimation();
            else this._removeAnimation();
        },
        _addAnimation: function () {
            if (this.options.animation) this.control.addClass("rs-animation");
        },
        _removeAnimation: function () {
            this.control.removeClass("rs-animation");
        },
        _setRadius: function () {
            var r = this.options.radius, d = r * 2;
            var circleShape = this.options.circleShape, height = d, width = d;
            this.container.removeClass().addClass("rs-container");

            if (circleShape.indexOf("half") === 0) {
                switch (circleShape) {
                    case "half-top":
                    case "half-bottom":
                        height = r; width = d; break;
                    case "half-left":
                    case "half-right":
                        height = d; width = r; break;
                }
                this.container.addClass(circleShape.replace("half-", "") + " half");
            }
            else if (circleShape.indexOf("quarter") === 0) {
                height = width = r;
                var s = circleShape.split("-");
                this.container.addClass(s[0] + " " + s[1] + " " + s[2]);
            }
            else this.container.addClass("full " + circleShape);

            var style = { "height": height, "width": width };
            this.control.css(style);
            this.container.css(style);
        },
        _border: function (seperator) {
            if (seperator) return parseFloat(this._startLine.children().css("border-bottom-width"));
            return parseFloat(this.block.css("border-top-width")) * 2;
        },
        _appendHandle: function () {
            if (this._rangeSlider || !this._showRange) this._createHandle(1);
            if (this._rangeSlider || this._showRange) this._createHandle(2);
            this._startLine = this._addSeperator(this._start, "rs-start");
            this._endLine = this._addSeperator(this._start + this._end, "rs-end");
            this._refreshSeperator();
        },
        _addSeperator: function (pos, cls) {
            var line = createElement("span.rs-seperator rs-border"), width = this.options.width, _border = this._border();
            var lineWrap = createElement("span.rs-bar rs-transition " + cls).append(line).rsRotate(pos);
            this.container.append(lineWrap);
            return lineWrap;
        },
        _refreshSeperator: function () {
            var bars = this._startLine.add(this._endLine), seperators = bars.children().removeAttr("style");
            var opt = this.options, width = opt.width, _border = this._border(), size = width + _border;
            if (opt.lineCap == "round" && opt.circleShape != "full") {
                bars.addClass("rs-rounded");
                seperators.css({ width: size, height: (size / 2) + 1 });
                this._startLine.children().css("margin-top", -1).addClass(opt.sliderType == "min-range" ? "rs-range-color" : "rs-path-color");
                this._endLine.children().css("margin-top", size / -2).addClass("rs-path-color");
            }
            else {
                bars.removeClass("rs-rounded");
                seperators.css({ "width": size, "margin-top": this._border(true) / -2 }).removeClass("rs-range-color rs-path-color");
            }
        },
        _updateSeperator: function () {
            this._startLine.rsRotate(this._start);
            this._endLine.rsRotate(this._start + this._end);
        },
        _createHandle: function (index) {
            var handle = createElement("div.rs-handle rs-move"), o = this.options, hs;
            if ((hs = o.handleShape) != "round") handle.addClass("rs-handle-" + hs);
            handle.attr({ "index": index, "tabIndex": "0" });

            var id = this._dataElement()[0].id, id = id ? id + "_" : "";
            var label = id + "handle" + (o.sliderType == "range" ? "_" + (index == 1 ? "start" : "end") : "");
            handle.attr({ "role": "slider", "aria-label": label });     // WAI-ARIA support

            var bar = createElement("div.rs-bar rs-transition").css("z-index", "7").append(handle).rsRotate(this._start);
            bar.addClass(o.sliderType == "range" && index == 2 ? "rs-second" : "rs-first");
            this.container.append(bar);
            this._refreshHandle();

            this.bar = bar;
            this._active = index;
            if (index != 1 && index != 2) this["_handle" + index] = this._handleDefaults();
            this._bind(handle, "focus", this._handleFocus);
            this._bind(handle, "blur", this._handleBlur);
            return handle;
        },
        _refreshHandle: function () {
            var hSize = this.options.handleSize, h, w, isSquare = true;
            if (typeof hSize === "string" && isNumber(hSize)) {
                if (hSize.charAt(0) === "+" || hSize.charAt(0) === "-") {
                    try { hSize = eval(this.options.width + hSize.charAt(0) + Math.abs(parseFloat(hSize))); }
                    catch (e) { console.warn(e); }
                }
                else if (hSize.indexOf(",")) {
                    var s = hSize.split(",");
                    if (isNumber(s[0]) && isNumber(s[1])) w = parseFloat(s[0]), h = parseFloat(s[1]), isSquare = false;
                }
            }
            if (isSquare) h = w = isNumber(hSize) ? parseFloat(hSize) : this.options.width;
            var diff = (this.options.width + this._border() - w) / 2;
            this._handles().css({ height: h, width: w, "margin": -h / 2 + "px 0 0 " + diff + "px" });
        },
        _handleDefaults: function () {
            return { angle: this._valueToAngle(this.options.min), value: this.options.min };
        },
        _handles: function () {
            return this.container.children("div.rs-bar").find(".rs-handle");
        },
        _activeHandleBar: function (index) {
            index = (index != undefined) ? index : this._active;
            return $(this.container.children("div.rs-bar")[index - 1]);
        },
        _handleArgs: function (index) {
            index = (index != undefined) ? index : this._active;
            var _handle = this["_handle" + index];
            return {
                element: this._activeHandleBar(index).children(),
                index: index,
                isActive: index == this._active,
                value: _handle ? _handle.value : null,
                angle: _handle ? _handle.angle : null
            };
        },
        _dataElement: function () {
            return this._isInputType ? this._hiddenField : this.control;
        },
        _raiseEvent: function (event) {
            var preValue = this["_pre" + event];
            if (preValue !== this.options.value) {
                this["_pre" + event] = this.options.value;
                this._updateTooltip();
                if ((event == "change") || (this._bindOnDrag && event == "drag")) this._updateHidden();
                return this._raise(event, { value: this.options.value, preValue: preValue, "handle": this._handleArgs() });
            }
        },

        // Events handlers
        _elementDown: function (e) {
            if (this._isReadOnly) return;
            var $target = $(e.target);

            if ($target.hasClass("rs-handle")) {
                this._handleDown(e);
            }
            else {
                var point = this._getXY(e), center = this._getCenterPoint();
                var distance = getdistance(point, center);
                var outerDistance = this.block.outerWidth() / 2;
                var innerDistance = outerDistance - (this.options.width + this._border());

                if (distance >= innerDistance && distance <= outerDistance) {
                    e.preventDefault();
                    var handle = this.control.find(".rs-handle.rs-focus"), angle, value;
                    //if (handle.length == 0)
                    this.control.attr("tabindex", "0").focus().removeAttr("tabindex");
                    if ($target.hasClass("rs-seperator")) {
                        value = $target.parent().hasClass("rs-start") ? this.options.min : this.options.max;
                        angle = this._valueToAngle(value);
                    }
                    else {
                        var d = this._getAngleValue(point, center);
                        angle = d.angle, value = d.value;
                    }
                    if (this._rangeSlider) {
                        handle = this.control.find(".rs-handle.rs-focus");
                        if (handle.length == 1) this._active = parseFloat(handle.attr("index"));
                        else this._active = (this._handle2.value - value) < (value - this._handle1.value) ? 2 : 1;
                        this.bar = this._activeHandleBar();
                    }

                    this._changeSliderValue(value, angle);
                    this._raiseEvent("change");
                }
            }
        },
        _handleDown: function (e) {
            e.preventDefault();
            var $target = $(e.target);
            $target.focus();
            this._removeAnimation();
            this._bindMouseEvents("_bind");
            this.bar = $target.parent();
            this._active = parseFloat($target.attr("index"));
            this._handles().removeClass("rs-move");
            this._raise("start", { value: this.options.value, "handle": this._handleArgs() });
        },
        _handleMove: function (e) {
            e.preventDefault();
            var point = this._getXY(e), center = this._getCenterPoint();
            var d = this._getAngleValue(point, center, true), angle, value;
            angle = d.angle, value = d.value;

            this._changeSliderValue(value, angle);
            this._raiseEvent("drag");
        },
        _handleUp: function (e) {
            this._handles().addClass("rs-move");
            this._bindMouseEvents("_unbind");
            this._addAnimation();
            this._raiseEvent("change");
            this._raise("stop", { value: this.options.value, "handle": this._handleArgs() });
        },
        _handleFocus: function (e) {
            if (this._isReadOnly) return;
            var $target = $(e.target);
            this._handles().removeClass("rs-focus");
            $target.addClass("rs-focus");
            this.bar = $target.parent();
            this._active = parseFloat($target.attr("index"));
            if (this.options.keyboardAction) {
                this._bindKeyboardEvents("_unbind");
                this._bindKeyboardEvents("_bind");
            }

            // updates the class for change z-index
            this.control.find("div.rs-bar").css("z-index", "7");
            this.bar.css("z-index", "8");
        },
        _handleBlur: function (e) {
            this._handles().removeClass("rs-focus");
            if (this.options.keyboardAction) this._bindKeyboardEvents("_unbind");
        },
        _handleKeyDown: function (e) {
            if (this._isReadOnly) return;
            var key = e.keyCode;
            if (key == 27) this._handles().blur();
            if (!(key >= 35 && key <= 40)) return;
            if (key >= 37 && key <= 40) this._removeAnimation();
            var h = this["_handle" + this._active], val, ang;

            e.preventDefault();
            if (key == 38 || key == 37) val = this._round(this._limitValue(h.value + this.options.step));  // Up || Left Key
            else if (key == 39 || key == 40) val = this._round(this._limitValue(h.value - this._getMinusStep(h.value))); // Right || Down Key
            else if (key == 36) val = this._getKeyValue("Home"); // Home Key
            else if (key == 35) val = this._getKeyValue("End"); // End Key

            ang = this._valueToAngle(val);
            this._changeSliderValue(val, ang);
            this._raiseEvent("change");
        },
        _handleKeyUp: function (e) {
            this._addAnimation();
        },
        _getMinusStep: function (val) {
            if (val == this.options.max) {
                var step = (this.options.max - this.options.min) % this.options.step;
                return step == 0 ? this.options.step : step;
            }
            return this.options.step;
        },
        _getKeyValue: function (key) {
            if (this._rangeSlider) {
                if (key == "Home") return (this._active == 1) ? this.options.min : this._handle1.value;
                else return (this._active == 1) ? this._handle2.value : this.options.max;
            }
            return (key == "Home") ? this.options.min : this.options.max;
        },
        _elementScroll: function (event) {
            if (this._isReadOnly) return;
            event.preventDefault();
            var e = event.originalEvent || event, h, val, ang, delta;
            delta = e.wheelDelta ? e.wheelDelta / 60 : (e.detail ? -e.detail / 2 : 0);
            if (delta == 0) return;

            this._updateActiveHandle(event);
            h = this["_handle" + this._active];
            val = h.value + (delta > 0 ? this.options.step : -this._getMinusStep(h.value));
            val = this._limitValue(val);
            ang = this._valueToAngle(val);

            this._removeAnimation();
            this._changeSliderValue(val, ang);
            this._raiseEvent("change");
            this._addAnimation();
        },
        _updateActiveHandle: function (e) {
            var $target = $(e.target);
            if ($target.hasClass("rs-handle") && $target.parent().parent()[0] == this.control[0]) {
                this.bar = $target.parent();
                this._active = parseFloat($target.attr("index"));
            }
            if (!this.bar.find(".rs-handle").hasClass("rs-focus")) this.bar.find(".rs-handle").focus();
        },

        // Events binding
        _bindControlEvents: function (hook) {
            this[hook](this.control, "mousedown", this._elementDown);
            this[hook](this.control, "touchstart", this._elementDown);
        },
        _bindScrollEvents: function (hook) {
            this[hook](this.control, "mousewheel", this._elementScroll);
            this[hook](this.control, "DOMMouseScroll", this._elementScroll);
        },
        _bindMouseEvents: function (hook) {
            this[hook]($(document), "mousemove", this._handleMove);
            this[hook]($(document), "mouseup", this._handleUp);
            this[hook]($(document), "mouseleave", this._handleUp);

            // *** for Touch support *** //
            this[hook]($(document), "touchmove", this._handleMove);
            this[hook]($(document), "touchend", this._handleUp);
            this[hook]($(document), "touchcancel", this._handleUp);
        },
        _bindKeyboardEvents: function (hook) {
            this[hook]($(document), "keydown", this._handleKeyDown);
            this[hook]($(document), "keyup", this._handleKeyUp);
        },

        // internal methods
        _changeSliderValue: function (value, angle) {
            var oAngle = this._oriAngle(angle), lAngle = this._limitAngle(angle);
            if (!this._rangeSlider && !this._showRange) {

                this["_handle" + this._active] = { angle: angle, value: value };
                this.options.value = value;
                this.bar.rsRotate(lAngle);
                this._updateARIA(value);
            }
            else if ((this._active == 1 && oAngle <= this._oriAngle(this._handle2.angle)) ||
                    (this._active == 2 && oAngle >= this._oriAngle(this._handle1.angle)) || this._invertRange) {

                this["_handle" + this._active] = { angle: angle, value: value };
                this.options.value = this._rangeSlider ? this._handle1.value + "," + this._handle2.value : value;
                this.bar.rsRotate(lAngle);
                this._updateARIA(value);

                var dAngle = this._oriAngle(this._handle2.angle) - this._oriAngle(this._handle1.angle), o2 = "1", o3 = "0";
                if (dAngle <= 180 && !(dAngle < 0 && dAngle > -180)) o2 = "0", o3 = "1";
                this.block2.css("opacity", o2);
                this.block3.css("opacity", o3);

                (this._active == 1 ? this.block4 : this.block2).rsRotate(lAngle - 180);
                (this._active == 1 ? this.block1 : this.block3).rsRotate(lAngle);
            }
        },
        // WAI-ARIA support
        _updateARIA: function (value) {
            var min = this.options.min, max = this.options.max;
            this.bar.children().attr({ "aria-valuenow": value });
            if (this.options.sliderType == "range") {
                var handles = this._handles();
                handles.eq(0).attr({ "aria-valuemin": min });
                handles.eq(1).attr({ "aria-valuemax": max });

                if (this._active == 1) handles.eq(1).attr({ "aria-valuemin": value });
                else handles.eq(0).attr({ "aria-valuemax": value });
            }
            else this.bar.children().attr({ "aria-valuemin": min, "aria-valuemax": max });
        },
        // Listener for KO binding
        _checkKO: function () {
            var _data = this._dataElement().data("bind");
            if (typeof _data == "string" && typeof ko == "object") {
                var _vm = ko.dataFor(this._dataElement()[0]);
                if (typeof _vm == "undefined") return true;
                var _all = _data.split(","), _handler;
                for (var i = 0; i < _all.length; i++) {
                    var d = _all[i].split(":");
                    if ($.trim(d[0]) == "value") {
                        _handler = $.trim(d[1]);
                        break;
                    }
                }
                if (_handler) {
                    this._isKO = true;
                    ko.computed(function () { this.option("value", _vm[_handler]()); }, this);
                }
            }
        },
        // Listener for Angular binding
        _checkAngular: function () {
            if (typeof angular == "object" && typeof angular.element == "function") {
                this._ngName = this._dataElement().attr("ng-model");
                if (typeof this._ngName == "string") {
                    this._isAngular = true; var that = this;
                    this._scope().$watch(this._ngName, function (newValue, oldValue) { that.option("value", newValue); });
                }
            }
        },
        _scope: function () {
            return angular.element(this._dataElement()).scope();
        },
        _getXY: function (e) {
            if (e.type.indexOf("mouse") == -1) e = (e.originalEvent || e).changedTouches[0];
            return { x: e.pageX, y: e.pageY };
        },
        _getCenterPoint: function () {
            var offset = this.block.offset(), center;
            center = {
                x: offset.left + (this.block.outerWidth() / 2),
                y: offset.top + (this.block.outerHeight() / 2)
            };
            return center;
        },
        _getAngleValue: function (point, center, isDrag) {
            var deg = Math.atan2(point.y - center.y, center.x - point.x);
            var angle = (-deg / (Math.PI / 180));
            if (angle < this._start) angle += 360;
            angle = this._checkAngle(angle, isDrag);
            return this._processStepByAngle(angle);;
        },
        _checkAngle: function (angle, isDrag) {
            var o_angle = this._oriAngle(angle),
                preAngle = this["_handle" + this._active].angle,
                o_preAngle = this._oriAngle(preAngle);

            if (o_angle > this._end) {
                if (!isDrag) return preAngle;
                angle = this._start + (o_preAngle <= this._end - o_preAngle ? 0 : this._end);
            }
            else if (isDrag) {
                var d = this._handleDragDistance;
                if (isNumber(d)) if (Math.abs(o_angle - o_preAngle) > d) return preAngle;
            }
            return angle;
        },
        _processStepByAngle: function (angle) {
            var value = this._angleToValue(angle);
            return this._processStepByValue(value);
        },
        _processStepByValue: function (value) {
            var step = this.options.step, remain, currVal, nextVal, preVal, val, ang;
            remain = (value - this.options.min) % step;
            currVal = value - remain;
            nextVal = this._limitValue(currVal + step);
            preVal = this._limitValue(currVal - step);

            if (value >= currVal) val = (value - currVal < nextVal - value) ? currVal : nextVal;
            else val = (currVal - value > value - preVal) ? currVal : preVal;

            val = this._round(val), ang = this._valueToAngle(val);
            return { value: val, angle: ang };
        },
        _round: function (val) {
            var s = this.options.step.toString().split(".");
            return s[1] ? parseFloat(val.toFixed(s[1].length)) : Math.round(val);
        },
        _oriAngle: function (angle) {
            var ang = angle - this._start;
            if (ang < 0) ang += 360;
            return ang;
        },
        _limitAngle: function (angle) {
            if (angle > 360 + this._start) angle -= 360;
            if (angle < this._start) angle += 360;
            return angle;
        },
        _limitValue: function (value) {
            if (value < this.options.min) value = this.options.min;
            if (value > this.options.max) value = this.options.max;
            return value;
        },
        _angleToValue: function (angle) {
            var m = this.options, value;
            value = (this._oriAngle(angle) / this._end) * (m.max - m.min) + m.min;
            return value;
        },
        _valueToAngle: function (value) {
            var m = this.options, angle;
            angle = (((value - m.min) / (m.max - m.min)) * this._end) + this._start;
            return angle;
        },
        _appendHiddenField: function () {
            this._hiddenField = this._hiddenField || createElement("input");
            this._hiddenField.attr({
                "type": "hidden", "name": this._dataElement()[0].id || ""
            });
            this.control.append(this._hiddenField);
            this._updateHidden();
        },
        _updateHidden: function () {
            var val = this.options.value;
            this._hiddenField.val(val);
            if (this._isKO || this._isAngular) this._hiddenField.trigger("change");
            if (this._isAngular) this._scope()[this._ngName] = val;
        },
        _updateTooltip: function () {
            if (this.tooltip && !this.tooltip.hasClass("hover"))
                this.tooltip.html(this._getTooltipValue());
            this._updateTooltipPos();
        },
        _updateTooltipPos: function () {
            this.tooltip && this.tooltip.css(this._getTooltipPos());
        },
        _getTooltipPos: function () {
            var circleShape = this.options.circleShape, pos;
            if (circleShape == "full" || circleShape == "pie" || circleShape.indexOf("custom") === 0)
                return {
                    "margin-top": -this.tooltip.outerHeight() / 2,
                    "margin-left": -this.tooltip.outerWidth() / 2
                };
            else if (circleShape.indexOf("half") != -1) {
                switch (circleShape) {
                    case "half-top":
                    case "half-bottom":
                        pos = { "margin-left": -this.tooltip.outerWidth() / 2 }; break;
                    case "half-left":
                    case "half-right":
                        pos = { "margin-top": -this.tooltip.outerHeight() / 2 }; break;
                }
                return pos;
            }
            return {};
        },
        _getTooltipValue: function (isNormal) {
            if (this._rangeSlider) {
                var p = this.options.value.split(",");
                if (isNormal) return p[0] + " - " + p[1];
                return this._tooltipValue(p[0], 1) + " - " + this._tooltipValue(p[1], 2);
            }
            if (isNormal) return this.options.value;
            return this._tooltipValue(this.options.value);
        },
        _tooltipValue: function (value, index) {
            var val = this._raise("tooltipFormat", { value: value, "handle": this._handleArgs(index) });
            return (val != null && typeof val !== "boolean") ? val : value;
        },
        _validateStartAngle: function () {
            var start = this.options.startAngle;
            start = (isNumber(start) ? parseFloat(start) : 0) % 360;
            if (start < 0) start += 360;
            this.options.startAngle = start;
            return start;
        },
        _validateEndAngle: function () {
            var end = this.options.endAngle;
            if (typeof end === "string" && isNumber(end) && (end.charAt(0) === "+" || end.charAt(0) === "-")) {
                try { end = eval(this.options.startAngle + end.charAt(0) + Math.abs(parseFloat(end))); }
                catch (e) { console.warn(e); }
            }
            end = (isNumber(end) ? parseFloat(end) : 360) % 360;
            if (end <= this.options.startAngle) end += 360;
            return end;
        },
        _refreshCircleShape: function () {
            var circleShape = this.options.circleShape;
            var circel_shapes = ["half-top", "half-bottom", "half-left", "half-right",
                "quarter-top-left", "quarter-top-right", "quarter-bottom-right", "quarter-bottom-left",
                "pie", "custom-half", "custom-quarter"];
            var shape_codes = ["h1", "h2", "h3", "h4", "q1", "q2", "q3", "q4", "3/4", "ch", "cq"];

            if (circel_shapes.indexOf(circleShape) == -1) {
                var index = shape_codes.indexOf(circleShape);
                if (index != -1) circleShape = circel_shapes[index];
                else if (circleShape == "half") circleShape = "half-top";
                else if (circleShape == "quarter") circleShape = "quarter-top-left";
                else circleShape = "full";
            }
            this.options.circleShape = circleShape;
        },
        _appendOverlay: function () {
            var shape = this.options.circleShape;
            if (shape == "pie")
                this._checkOverlay(".rs-overlay", 270);
            else if (shape == "custom-half" || shape == "custom-quarter") {
                this._checkOverlay(".rs-overlay1", 180);
                if (shape == "custom-quarter")
                    this._checkOverlay(".rs-overlay2", this._end);
            }
        },
        _checkOverlay: function (cls, angle) {
            var overlay = this.container.children(cls);
            if (overlay.length == 0) {
                overlay = createElement("div" + cls + " rs-transition rs-bg-color");
                this.container.append(overlay);
            }
            overlay.rsRotate(this._start + angle);
        },
        _checkDataType: function () {
            var m = this.options, i, prop, value, props = this._props();
            // to check number datatype
            for (i in props.numberType) {
                prop = props.numberType[i], value = m[prop];
                if (!isNumber(value)) m[prop] = this.defaults[prop];
                else m[prop] = parseFloat(value);
            }
            // to check input string
            for (i in props.booleanType) {
                prop = props.booleanType[i], value = m[prop];
                m[prop] = (value == "false") ? false : !!value;
            }
            // to check boolean datatype
            for (i in props.stringType) {
                prop = props.stringType[i], value = m[prop];
                m[prop] = ("" + value).toLowerCase();
            }
        },
        _validateSliderType: function () {
            var type = this.options.sliderType.toLowerCase();
            this._rangeSlider = this._showRange = false;
            if (type == "range") this._rangeSlider = this._showRange = true;
            else if (type.indexOf("min") != -1) {
                this._showRange = true;
                type = "min-range";
            }
            else type = "default";
            this.options.sliderType = type;
        },
        _updateStartEnd: function () {
            var circle = this.options.circleShape;
            if (circle != "full") {
                if (circle.indexOf("quarter") != -1) this.options.endAngle = "+90";
                else if (circle.indexOf("half") != -1) this.options.endAngle = "+180";
                else if (circle == "pie") this.options.endAngle = "+270";

                if (circle == "quarter-top-left" || circle == "half-top") this.options.startAngle = 0;
                else if (circle == "quarter-top-right" || circle == "half-right") this.options.startAngle = 90;
                else if (circle == "quarter-bottom-right" || circle == "half-bottom") this.options.startAngle = 180;
                else if (circle == "quarter-bottom-left" || circle == "half-left") this.options.startAngle = 270;
            }
        },
        _validateStartEnd: function () {
            this._start = this._validateStartAngle();
            this._end = this._validateEndAngle();

            var add = (this._start < this._end) ? 0 : 360;
            this._end += add - this._start;
        },
        _analyzeModelValue: function () {
            var val = this.options.value, min = this.options.min, max = this.options.max, last, t;
            if (val instanceof Array) val = val.toString();
            var parts = (typeof val == "string") ? val.split(",") : [val];

            if (this._rangeSlider) {
                if (typeof val == "string") {
                    if (parts.length >= 2) t = (isNumber(parts[0]) ? parts[0] : min) + "," +
                        (isNumber(parts[1]) ? parts[1] : max);
                    else t = isNumber(parts[0]) ? min + "," + parts[0] : min + "," + min;
                }
                else t = isNumber(val) ? min + "," + val : min + "," + min;
            }
            else {
                if (typeof val == "string") last = parts.pop(), t = isNumber(last) ? parseFloat(last) : min;
                else t = isNumber(val) ? parseFloat(val) : min;
            }
            this.options.value = t;
        },
        _validateModelValue: function () {
            var val = this.options.value;
            if (this._rangeSlider) {
                var parts = val.split(","), val1 = parseFloat(parts[0]), val2 = parseFloat(parts[1]);
                val1 = this._limitValue(val1);
                val2 = this._limitValue(val2);
                if (!this._invertRange) if (val1 > val2) val2 = val1;

                this._handle1 = this._processStepByValue(val1);
                this._handle2 = this._processStepByValue(val2);
                this.options.value = this._handle1.value + "," + this._handle2.value;
            }
            else {
                var index = this._showRange ? 2 : (this._active || 1);
                this["_handle" + index] = this._processStepByValue(this._limitValue(val));
                if (this._showRange) this._handle1 = this._handleDefaults();
                this.options.value = this["_handle" + index].value;
            }
        },

        // common core methods
        _isBrowserSupported: function () {
            var properties = ["borderRadius", "WebkitBorderRadius", "MozBorderRadius",
	            "OBorderRadius", "msBorderRadius", "KhtmlBorderRadius"];
            for (var i = 0; i < properties.length; i++) {
                if (document.body.style[properties[i]] !== undefined) return true;
            }
        },
        _throwError: function () {
            return "This browser doesn't support the border-radious property.";
        },
        _checkIE: function () {
            var ua = window.navigator.userAgent;
            if (ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0)
                this.control.css({ "-ms-touch-action": "none", "touch-action": "none" });
        },
        _raise: function (event, args) {
            var o = this.options, fn = o[event], val = true;
            args = args || { value: o.value };
            args["options"] = o;
            if (fn) {
                args["type"] = event;
                if (typeof fn === "string") fn = window[fn];
                if ($.isFunction(fn)) {
                    val = fn.call(this, args);
                    val = val === false ? false : val;
                }
            }
            this.control.trigger($.Event ? $.Event(event, args) : event);
            return val;
        },
        _bind: function (element, _event, handler) {
            $(element).bind(_event, $proxy(handler, this));
        },
        _unbind: function (element, _event, handler) {
            if ($.proxy) $(element).unbind(_event, $.proxy(handler, this));
            else $(element).unbind(_event);
        },
        _getInstance: function () {
            return $data(this._dataElement()[0], pluginName);
        },
        _removeData: function () {
            var control = this._dataElement()[0];
            $.removeData && $.removeData(control, pluginName);
            if (control.id) delete window[control.id];
        },
        _destroyControl: function () {
            if (this._isInputType) this._dataElement().insertAfter(this.control).attr("type", "text");
            this.control.empty().removeClass("rs-control").height("").width("");
            this._removeAnimation();
            this._bindControlEvents("_unbind");
        },

        // methods to dynamic options updation (through option)
        _updateWidth: function () {
            this.lastBlock.css("padding", this.options.width);
            this._refreshHandle();
        },
        _readOnly: function (bool) {
            this._isReadOnly = bool;
            this.container.removeClass("rs-readonly");
            if (bool) this.container.addClass("rs-readonly");
        },

        // get & set for the properties
        _get: function (property) {
            return this.options[property];
        },
        _set: function (property, value) {
            var props = this._props();
            if ($.inArray(property, props.numberType) != -1) {          // to check number datatype
                if (!isNumber(value)) return;
                value = parseFloat(value);
            }
            else if ($.inArray(property, props.booleanType) != -1) {    // to check boolean datatype
                value = (value == "false") ? false : !!value;
            }
            else if ($.inArray(property, props.stringType) != -1) {     // to check input string
                value = value.toLowerCase();
            }

            if (this.options[property] == value) return;
            this.options[property] = value;
            switch (property) {
                case "startAngle":
                case "endAngle":
                    this._validateStartEnd();
                    this._updateSeperator();
                    this._appendOverlay();
                case "min":
                case "max":
                case "step":
                case "value":
                    this._analyzeModelValue();
                    this._validateModelValue();
                    this._setValue();
                    this._updatePre();
                    this._updateHidden();
                    this._updateTooltip();
                    break;
                case "radius":
                    this._setRadius();
                    this._updateTooltipPos();
                    break;
                case "width":
                    this._removeAnimation();
                    this._updateWidth();
                    this._updateTooltipPos();
                    this._addAnimation();
                    this._refreshSeperator();
                    break;
                case "handleSize":
                    this._refreshHandle();
                    break;
                case "handleShape":
                    this._setHandleShape();
                    break;
                case "animation":
                    this._setAnimation();
                    break;
                case "showTooltip":
                    this.options.showTooltip ? this._appendTooltip() : this._removeTooltip();
                    break;
                case "editableTooltip":
                    this._tooltipEditable();
                    this._updateTooltipPos();
                    break;
                case "disabled":
                    this.options.disabled ? this.disable() : this.enable();
                    break;
                case "readOnly":
                    this.options.readOnly ? this._readOnly(true) : (!this.options.disabled && this._readOnly(false));
                    break;
                case "mouseScrollAction":
                    this._bindScrollEvents(this.options.mouseScrollAction ? "_bind" : "_unbind");
                    break;
                case "lineCap":
                    this._refreshSeperator();
                    break;
                case "circleShape":
                    this._refreshCircleShape();
                    if (this.options.circleShape == "full") {
                        this.options.startAngle = 0;
                        this.options.endAngle = "+360";
                    }
                case "sliderType":
                    this._destroyControl();
                    this._onInit();
                    break;
            }
            return this;
        },

        // public methods
        option: function (property, value) {
            if (!this._getInstance() || !this._isBrowserSupport) return;
            if ($isPlainObject(property)) {
                if (property["min"] !== undefined || property["max"] !== undefined) {
                    if (property["min"] !== undefined) {
                        this.options.min = property["min"];
                        delete property["min"];
                    }
                    if (property["max"] !== undefined) {
                        this.options.max = property["max"];
                        delete property["max"];
                    }
                    if (property["value"] == undefined) {
                        this._set("value", this.options.value);
                    }
                }
                for (var prop in property) {
                    this._set(prop, property[prop]);
                }
            }
            else if (property && typeof property == "string") {
                if (value === undefined) return this._get(property);
                this._set(property, value);
            }
            return this;
        },
        getValue: function (index) {
            if (this.options.sliderType == "range" && isNumber(index)) {
                var i = parseFloat(index);
                if (i == 1 || i == 2)
                    return this["_handle" + i].value;
            }
            return this._get("value");
        },
        setValue: function (value, index) {
            if (isNumber(value)) {
                if (isNumber(index)) {
                    if (this.options.sliderType == "range") {
                        var i = parseFloat(index), val = parseFloat(value);
                        if (i == 1) value = val + "," + this._handle2.value;
                        else if (i == 2) value = this._handle1.value + "," + val;
                    }
                    else if (this.options.sliderType == "default") this._active = index;
                }
                this._set("value", value);
            }
        },
        disable: function () {
            this.options.disabled = true;
            this.container.addClass("rs-disabled");
            this._readOnly(true);
        },
        enable: function () {
            this.options.disabled = false;
            this.container.removeClass("rs-disabled");
            if (!this.options.readOnly) this._readOnly(false);
        },
        destroy: function () {
            if (!this._getInstance()) return;
            this._destroyControl();
            this._removeData();
            if (this._isInputType) this.control.remove();
        }
    };

    $.fn.rsRotate = function (degree) {
        return setTransform(this, degree);
    }

    if (typeof $.fn.outerHeight == "undefined") {
        $.fn.outerHeight = function () { return this[0].offsetHeight; }
        $.fn.outerWidth = function () { return this[0].offsetWidth; }
    }
    if (typeof $.fn.hasClass === "undefined") {
        $.fn.hasClass = function (name) {
            return this[0].className.split(" ").indexOf(name) !== -1;
        }
    }
    if (typeof $.fn.offset === "undefined") {
        $.fn.offset = function () {
            return { left: this[0].offsetLeft, top: this[0].offsetTop };
        }
    }

    function $proxy(fn, that) {
        if (typeof $.proxy === "function") return $.proxy(fn, that);
        return function (e) { fn.call(that, e); };
    }
    function $data(ele, name, data) {
        if (typeof $.data === "function") return $.data(ele, name, data);
        else if (!data) return $(ele).hasClass("rs-control");
    }
    function $isPlainObject(obj) {
        if (typeof $.isPlainObject === "function") return $.isPlainObject(obj);
        else {
            var str = JSON.stringify(obj);
            return typeof obj === "object" && obj.length === undefined &&
            str.length > 2 && str.substr(0, 1) === "{" && str.substr(str.length - 1) === "}";
        }
    }

    //core functions
    function isNumber(number) {
        number = parseFloat(number);
        return typeof number === "number" && !isNaN(number);
    }
    function createElement(tag) {
        var t = tag.split('.');
        return $(document.createElement(t[0])).addClass(t[1] || "");
    }
    function getdistance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }
    function setTransform(control, value) {
        control.css('-webkit-transform', "rotate(" + value + "deg)");
        control.css('-moz-transform', "rotate(" + value + "deg)");
        control.css('-ms-transform', "rotate(" + value + "deg)");
        control.css('-o-transform', "rotate(" + value + "deg)");
        control.css('transform', "rotate(" + value + "deg)");
        return control;
    }

    // The plugin constructor
    function RoundSlider(control, options) {
        if (control.id) window[control.id] = this;
        this.control = $(control);

        // the options value holds the updated defaults value
        this.options = $.extend({}, this.defaults, options);
        if (this._raise("beforeCreate") !== false) {
            this._init();
            this._raise("create");
        }
        else this._removeData();
    }

    // The plugin wrapper, prevents multiple instantiations
    function CreateRoundSlider(options, args) {

        for (var i = 0; i < this.length; i++) {
            var that = this[i], instance = $data(that, pluginName);
            if (!instance) {
                $data(that, pluginName, new RoundSlider(that, options));
            }
            else if ($isPlainObject(options)) {
                if (typeof instance.option === "function") instance.option(options);
                else if (that.id && window[that.id] && typeof window[that.id].option === "function") {
                    window[that.id].option(options);
                }
            }
            else if (typeof options === "string") {
                if (typeof instance[options] === "function") {
                    if ((options === "option" || options.indexOf("get") === 0) && args[2] === undefined) {
                        return instance[options](args[1]);
                    }
                    instance[options](args[1], args[2]);
                }
            }
        }
        return this;
    }

    $.fn[pluginName].prototype = RoundSlider.prototype;

})(jQuery, window);
