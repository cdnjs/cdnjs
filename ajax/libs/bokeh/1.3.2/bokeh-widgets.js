/*!
 * Copyright (c) 2012 - 2018, Anaconda, Inc., and Bokeh Contributors
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of Anaconda nor the names of any contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */
(function(root, factory) {
//  if(typeof exports === 'object' && typeof module === 'object')
//    factory(require("Bokeh"));
//  else if(typeof define === 'function' && define.amd)
//    define(["Bokeh"], factory);
//  else if(typeof exports === 'object')
//    factory(require("Bokeh"));
//  else
    factory(root["Bokeh"]);
})(this, function(Bokeh) {
  var define;
  return (function(modules, aliases, entry) {
    if (Bokeh != null) {
      return Bokeh.register_plugin(modules, aliases, entry);
    } else {
      throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
    }
  })
({
436: /* models/widgets/abstract_button */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var p = require(18) /* ../../core/properties */;
    var dom_1 = require(5) /* ../../core/dom */;
    var build_views_1 = require(4) /* ../../core/build_views */;
    var control_1 = require(445) /* ./control */;
    var buttons_1 = require(304) /* ../../styles/buttons */;
    var AbstractButtonView = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractButtonView, _super);
        function AbstractButtonView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractButtonView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.icon_views = {};
        };
        AbstractButtonView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () { return _this.render(); });
        };
        AbstractButtonView.prototype.remove = function () {
            build_views_1.remove_views(this.icon_views);
            _super.prototype.remove.call(this);
        };
        AbstractButtonView.prototype._render_button = function () {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i] = arguments[_i];
            }
            return dom_1.button.apply(void 0, [{
                    type: "button",
                    disabled: this.model.disabled,
                    class: [buttons_1.bk_btn, buttons_1.bk_btn_type(this.model.button_type)],
                }].concat(children));
        };
        AbstractButtonView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this.button_el = this._render_button(this.model.label);
            this.button_el.addEventListener("click", function () { return _this.click(); });
            var icon = this.model.icon;
            if (icon != null) {
                build_views_1.build_views(this.icon_views, [icon], { parent: this });
                var icon_view = this.icon_views[icon.id];
                icon_view.render();
                dom_1.prepend(this.button_el, icon_view.el, dom_1.nbsp());
            }
            this.group_el = dom_1.div({ class: buttons_1.bk_btn_group }, this.button_el);
            this.el.appendChild(this.group_el);
        };
        AbstractButtonView.prototype.click = function () {
            if (this.model.callback != null)
                this.model.callback.execute(this.model);
        };
        AbstractButtonView.__name__ = "AbstractButtonView";
        return AbstractButtonView;
    }(control_1.ControlView));
    exports.AbstractButtonView = AbstractButtonView;
    var AbstractButton = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractButton, _super);
        function AbstractButton(attrs) {
            return _super.call(this, attrs) || this;
        }
        AbstractButton.initClass = function () {
            this.define({
                label: [p.String, "Button"],
                icon: [p.Instance],
                button_type: [p.ButtonType, "default"],
                callback: [p.Any],
            });
        };
        AbstractButton.__name__ = "AbstractButton";
        return AbstractButton;
    }(control_1.Control));
    exports.AbstractButton = AbstractButton;
    AbstractButton.initClass();
}
,
437: /* models/widgets/abstract_icon */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var model_1 = require(62) /* ../../model */;
    var dom_view_1 = require(6) /* ../../core/dom_view */;
    var AbstractIconView = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractIconView, _super);
        function AbstractIconView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractIconView.__name__ = "AbstractIconView";
        return AbstractIconView;
    }(dom_view_1.DOMView));
    exports.AbstractIconView = AbstractIconView;
    var AbstractIcon = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractIcon, _super);
        function AbstractIcon(attrs) {
            return _super.call(this, attrs) || this;
        }
        AbstractIcon.__name__ = "AbstractIcon";
        return AbstractIcon;
    }(model_1.Model));
    exports.AbstractIcon = AbstractIcon;
}
,
438: /* models/widgets/abstract_slider */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var noUiSlider = require(476) /* nouislider */;
    var p = require(18) /* ../../core/properties */;
    var dom_1 = require(5) /* ../../core/dom */;
    var array_1 = require(24) /* ../../core/util/array */;
    var callback_1 = require(28) /* ../../core/util/callback */;
    var control_1 = require(445) /* ./control */;
    var sliders_1 = require(475) /* ../../styles/widgets/sliders */;
    var prefix = 'bk-noUi-';
    var AbstractBaseSliderView = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractBaseSliderView, _super);
        function AbstractBaseSliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(AbstractBaseSliderView.prototype, "noUiSlider", {
            get: function () {
                return this.slider_el.noUiSlider;
            },
            enumerable: true,
            configurable: true
        });
        AbstractBaseSliderView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._init_callback();
        };
        AbstractBaseSliderView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            var _a = this.model.properties, callback = _a.callback, callback_policy = _a.callback_policy, callback_throttle = _a.callback_throttle;
            this.on_change([callback, callback_policy, callback_throttle], function () { return _this._init_callback(); });
            var _b = this.model.properties, start = _b.start, end = _b.end, value = _b.value, step = _b.step, title = _b.title;
            this.on_change([start, end, value, step], function () {
                var _a = _this._calc_to(), start = _a.start, end = _a.end, value = _a.value, step = _a.step;
                _this.noUiSlider.updateOptions({
                    range: { min: start, max: end },
                    start: value,
                    step: step,
                });
            });
            var bar_color = this.model.properties.bar_color;
            this.on_change(bar_color, function () {
                _this._set_bar_color();
            });
            this.on_change([value, title], function () { return _this._update_title(); });
        };
        AbstractBaseSliderView.prototype._init_callback = function () {
            var _this = this;
            var callback = this.model.callback;
            var fn = function () {
                if (callback != null)
                    callback.execute(_this.model);
                _this.model.value_throttled = _this.model.value;
            };
            switch (this.model.callback_policy) {
                case 'continuous': {
                    this.callback_wrapper = fn;
                    break;
                }
                case 'throttle': {
                    this.callback_wrapper = callback_1.throttle(fn, this.model.callback_throttle);
                    break;
                }
                default:
                    this.callback_wrapper = undefined;
            }
        };
        AbstractBaseSliderView.prototype._update_title = function () {
            var _this = this;
            dom_1.empty(this.title_el);
            var hide_header = this.model.title == null || (this.model.title.length == 0 && !this.model.show_value);
            this.title_el.style.display = hide_header ? "none" : "";
            if (!hide_header) {
                if (this.model.title.length != 0)
                    this.title_el.textContent = this.model.title + ": ";
                if (this.model.show_value) {
                    var value = this._calc_to().value;
                    var pretty = value.map(function (v) { return _this.model.pretty(v); }).join(" .. ");
                    this.title_el.appendChild(dom_1.span({ class: sliders_1.bk_slider_value }, pretty));
                }
            }
        };
        AbstractBaseSliderView.prototype._set_bar_color = function () {
            if (!this.model.disabled) {
                this.slider_el.querySelector("." + prefix + "connect")
                    .style
                    .backgroundColor = this.model.bar_color;
            }
        };
        AbstractBaseSliderView.prototype._keypress_handle = function (e, idx) {
            if (idx === void 0) {
                idx = 0;
            }
            var _a = this._calc_to(), start = _a.start, value = _a.value, end = _a.end, step = _a.step;
            var is_range = value.length == 2;
            var low = start;
            var high = end;
            if (is_range && idx == 0) {
                high = value[1];
            }
            else if (is_range && idx == 1) {
                low = value[0];
            }
            switch (e.which) {
                case 37: {
                    value[idx] = Math.max(value[idx] - step, low);
                    break;
                }
                case 39: {
                    value[idx] = Math.min(value[idx] + step, high);
                    break;
                }
                default:
                    return;
            }
            if (is_range) {
                this.model.value = value;
                this.model.properties.value.change.emit();
            }
            else {
                this.model.value = value[0];
            }
            this.noUiSlider.set(value);
            if (this.callback_wrapper != null)
                this.callback_wrapper();
        };
        AbstractBaseSliderView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            var _a = this._calc_to(), start = _a.start, end = _a.end, value = _a.value, step = _a.step;
            var tooltips; // XXX
            if (this.model.tooltips) {
                var formatter = {
                    to: function (value) { return _this.model.pretty(value); },
                };
                tooltips = array_1.repeat(formatter, value.length);
            }
            else
                tooltips = false;
            if (this.slider_el == null) {
                this.slider_el = dom_1.div();
                noUiSlider.create(this.slider_el, {
                    cssPrefix: prefix,
                    range: { min: start, max: end },
                    start: value,
                    step: step,
                    behaviour: this.model.behaviour,
                    connect: this.model.connected,
                    tooltips: tooltips,
                    orientation: this.model.orientation,
                    direction: this.model.direction,
                }); // XXX: bad typings; no cssPrefix
                this.noUiSlider.on('slide', function (_, __, values) { return _this._slide(values); });
                this.noUiSlider.on('change', function (_, __, values) { return _this._change(values); });
                this._set_keypress_handles();
                var toggleTooltip_1 = function (i, show) {
                    if (!tooltips)
                        return;
                    var handle = _this.slider_el.querySelectorAll("." + prefix + "handle")[i];
                    var tooltip = handle.querySelector("." + prefix + "tooltip");
                    tooltip.style.display = show ? 'block' : '';
                };
                this.noUiSlider.on('start', function (_, i) { return toggleTooltip_1(i, true); });
                this.noUiSlider.on('end', function (_, i) { return toggleTooltip_1(i, false); });
            }
            else {
                this.noUiSlider.updateOptions({
                    range: { min: start, max: end },
                    start: value,
                    step: step,
                });
            }
            this._set_bar_color();
            if (this.model.disabled)
                this.slider_el.setAttribute('disabled', 'true');
            else
                this.slider_el.removeAttribute('disabled');
            this.title_el = dom_1.div({ class: sliders_1.bk_slider_title });
            this._update_title();
            this.group_el = dom_1.div({ class: sliders_1.bk_input_group }, this.title_el, this.slider_el);
            this.el.appendChild(this.group_el);
        };
        AbstractBaseSliderView.prototype._slide = function (values) {
            this.model.value = this._calc_from(values);
            if (this.callback_wrapper != null)
                this.callback_wrapper();
        };
        AbstractBaseSliderView.prototype._change = function (values) {
            this.model.value = this._calc_from(values);
            this.model.value_throttled = this.model.value;
            switch (this.model.callback_policy) {
                case 'mouseup':
                case 'throttle': {
                    if (this.model.callback != null)
                        this.model.callback.execute(this.model);
                    break;
                }
            }
        };
        AbstractBaseSliderView.__name__ = "AbstractBaseSliderView";
        return AbstractBaseSliderView;
    }(control_1.ControlView));
    var AbstractSliderView = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractSliderView, _super);
        function AbstractSliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractSliderView.prototype._calc_to = function () {
            return {
                start: this.model.start,
                end: this.model.end,
                value: [this.model.value],
                step: this.model.step,
            };
        };
        AbstractSliderView.prototype._calc_from = function (_a) {
            var value = _a[0];
            if (Number.isInteger(this.model.start) && Number.isInteger(this.model.end) && Number.isInteger(this.model.step))
                return Math.round(value);
            else
                return value;
        };
        AbstractSliderView.prototype._set_keypress_handles = function () {
            var _this = this;
            // Add single cursor event
            var handle = this.slider_el.querySelector("." + prefix + "handle");
            handle.setAttribute('tabindex', '0');
            handle.addEventListener('keydown', function (e) { return _this._keypress_handle(e); });
        };
        AbstractSliderView.__name__ = "AbstractSliderView";
        return AbstractSliderView;
    }(AbstractBaseSliderView));
    exports.AbstractSliderView = AbstractSliderView;
    var AbstractRangeSliderView = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractRangeSliderView, _super);
        function AbstractRangeSliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractRangeSliderView.prototype._calc_to = function () {
            return {
                start: this.model.start,
                end: this.model.end,
                value: this.model.value,
                step: this.model.step,
            };
        };
        AbstractRangeSliderView.prototype._calc_from = function (values) {
            return values;
        };
        AbstractRangeSliderView.prototype._set_keypress_handles = function () {
            var _this = this;
            var handle_lower = this.slider_el.querySelector("." + prefix + "handle-lower");
            var handle_upper = this.slider_el.querySelector("." + prefix + "handle-upper");
            handle_lower.setAttribute('tabindex', '0');
            handle_lower.addEventListener('keydown', function (e) { return _this._keypress_handle(e, 0); });
            handle_upper.setAttribute('tabindex', '1');
            handle_upper.addEventListener('keydown', function (e) { return _this._keypress_handle(e, 1); });
        };
        AbstractRangeSliderView.__name__ = "AbstractRangeSliderView";
        return AbstractRangeSliderView;
    }(AbstractBaseSliderView));
    exports.AbstractRangeSliderView = AbstractRangeSliderView;
    var AbstractSlider = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractSlider, _super);
        function AbstractSlider(attrs) {
            var _this = _super.call(this, attrs) || this;
            _this.connected = false;
            return _this;
        }
        AbstractSlider.initClass = function () {
            this.define({
                title: [p.String, ""],
                show_value: [p.Boolean, true],
                start: [p.Any],
                end: [p.Any],
                value: [p.Any],
                value_throttled: [p.Any],
                step: [p.Number, 1],
                format: [p.String],
                direction: [p.Any, "ltr"],
                tooltips: [p.Boolean, true],
                callback: [p.Any],
                callback_throttle: [p.Number, 200],
                callback_policy: [p.SliderCallbackPolicy, "throttle"],
                bar_color: [p.Color, "#e6e6e6"],
            });
        };
        AbstractSlider.prototype._formatter = function (value, _format) {
            return "" + value;
        };
        AbstractSlider.prototype.pretty = function (value) {
            return this._formatter(value, this.format);
        };
        AbstractSlider.__name__ = "AbstractSlider";
        return AbstractSlider;
    }(control_1.Control));
    exports.AbstractSlider = AbstractSlider;
    AbstractSlider.initClass();
}
,
439: /* models/widgets/autocomplete_input */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var text_input_1 = require(467) /* ./text_input */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var math_1 = require(34) /* ../../core/util/math */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var menus_1 = require(308) /* ../../styles/menus */;
    var AutocompleteInputView = /** @class */ (function (_super) {
        tslib_1.__extends(AutocompleteInputView, _super);
        function AutocompleteInputView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._open = false;
            _this._last_value = "";
            _this._hover_index = 0;
            return _this;
        }
        AutocompleteInputView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this.input_el.addEventListener("keydown", function (event) { return _this._keydown(event); });
            this.input_el.addEventListener("keyup", function (event) { return _this._keyup(event); });
            this.menu = dom_1.div({ class: [menus_1.bk_menu, mixins_1.bk_below] });
            this.menu.addEventListener("click", function (event) { return _this._menu_click(event); });
            this.menu.addEventListener("mouseover", function (event) { return _this._menu_hover(event); });
            this.el.appendChild(this.menu);
            dom_1.undisplay(this.menu);
        };
        AutocompleteInputView.prototype.change_input = function () {
            if (this._open && this.menu.children.length > 0) {
                this.model.value = this.menu.children[this._hover_index].textContent;
                this.input_el.focus();
                this._hide_menu();
            }
        };
        AutocompleteInputView.prototype._update_completions = function (completions) {
            dom_1.empty(this.menu);
            for (var _i = 0, completions_1 = completions; _i < completions_1.length; _i++) {
                var text = completions_1[_i];
                var item = dom_1.div({}, text);
                this.menu.appendChild(item);
            }
            if (completions.length > 0)
                this.menu.children[0].classList.add(mixins_1.bk_active);
        };
        AutocompleteInputView.prototype._show_menu = function () {
            var _this = this;
            if (!this._open) {
                this._open = true;
                this._hover_index = 0;
                this._last_value = this.model.value;
                dom_1.display(this.menu);
                var listener_1 = function (event) {
                    var target = event.target;
                    if (target instanceof HTMLElement && !_this.el.contains(target)) {
                        document.removeEventListener("click", listener_1);
                        _this._hide_menu();
                    }
                };
                document.addEventListener("click", listener_1);
            }
        };
        AutocompleteInputView.prototype._hide_menu = function () {
            if (this._open) {
                this._open = false;
                dom_1.undisplay(this.menu);
            }
        };
        AutocompleteInputView.prototype._menu_click = function (event) {
            if (event.target != event.currentTarget && event.target instanceof Element) {
                this.model.value = event.target.textContent;
                this.input_el.focus();
                this._hide_menu();
            }
        };
        AutocompleteInputView.prototype._menu_hover = function (event) {
            if (event.target != event.currentTarget && event.target instanceof Element) {
                var i = 0;
                for (i = 0; i < this.menu.children.length; i++) {
                    if (this.menu.children[i].textContent == event.target.textContent)
                        break;
                }
                this._bump_hover(i);
            }
        };
        AutocompleteInputView.prototype._bump_hover = function (new_index) {
            var n_children = this.menu.children.length;
            if (this._open && n_children > 0) {
                this.menu.children[this._hover_index].classList.remove(mixins_1.bk_active);
                this._hover_index = math_1.clamp(new_index, 0, n_children - 1);
                this.menu.children[this._hover_index].classList.add(mixins_1.bk_active);
            }
        };
        AutocompleteInputView.prototype._keydown = function (_event) { };
        AutocompleteInputView.prototype._keyup = function (event) {
            switch (event.keyCode) {
                case dom_1.Keys.Enter: {
                    this.change_input();
                    break;
                }
                case dom_1.Keys.Esc: {
                    this._hide_menu();
                    break;
                }
                case dom_1.Keys.Up: {
                    this._bump_hover(this._hover_index - 1);
                    break;
                }
                case dom_1.Keys.Down: {
                    this._bump_hover(this._hover_index + 1);
                    break;
                }
                default: {
                    var value = this.input_el.value;
                    if (value.length < this.model.min_characters) {
                        this._hide_menu();
                        return;
                    }
                    var completions = [];
                    for (var _i = 0, _a = this.model.completions; _i < _a.length; _i++) {
                        var text = _a[_i];
                        if (text.startsWith(value))
                            completions.push(text);
                    }
                    this._update_completions(completions);
                    if (completions.length == 0)
                        this._hide_menu();
                    else
                        this._show_menu();
                }
            }
        };
        AutocompleteInputView.__name__ = "AutocompleteInputView";
        return AutocompleteInputView;
    }(text_input_1.TextInputView));
    exports.AutocompleteInputView = AutocompleteInputView;
    var AutocompleteInput = /** @class */ (function (_super) {
        tslib_1.__extends(AutocompleteInput, _super);
        function AutocompleteInput(attrs) {
            return _super.call(this, attrs) || this;
        }
        AutocompleteInput.initClass = function () {
            this.prototype.default_view = AutocompleteInputView;
            this.define({
                completions: [p.Array, []],
                min_characters: [p.Int, 2],
            });
        };
        AutocompleteInput.__name__ = "AutocompleteInput";
        return AutocompleteInput;
    }(text_input_1.TextInput));
    exports.AutocompleteInput = AutocompleteInput;
    AutocompleteInput.initClass();
}
,
440: /* models/widgets/button */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var abstract_button_1 = require(436) /* ./abstract_button */;
    var bokeh_events_1 = require(3) /* ../../core/bokeh_events */;
    var p = require(18) /* ../../core/properties */;
    var ButtonView = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonView, _super);
        function ButtonView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonView.prototype.click = function () {
            this.model.clicks = this.model.clicks + 1;
            this.model.trigger_event(new bokeh_events_1.ButtonClick());
            _super.prototype.click.call(this);
        };
        ButtonView.__name__ = "ButtonView";
        return ButtonView;
    }(abstract_button_1.AbstractButtonView));
    exports.ButtonView = ButtonView;
    var Button = /** @class */ (function (_super) {
        tslib_1.__extends(Button, _super);
        function Button(attrs) {
            return _super.call(this, attrs) || this;
        }
        Button.initClass = function () {
            this.prototype.default_view = ButtonView;
            this.define({
                clicks: [p.Number, 0],
            });
            this.override({
                label: "Button",
            });
        };
        Button.__name__ = "Button";
        return Button;
    }(abstract_button_1.AbstractButton));
    exports.Button = Button;
    Button.initClass();
}
,
441: /* models/widgets/button_group */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var control_1 = require(445) /* ./control */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var buttons_1 = require(304) /* ../../styles/buttons */;
    var ButtonGroupView = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonGroupView, _super);
        function ButtonGroupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonGroupView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            var p = this.model.properties;
            this.on_change(p.button_type, function () { return _this.render(); });
            this.on_change(p.labels, function () { return _this.render(); });
            this.on_change(p.active, function () { return _this._update_active(); });
        };
        ButtonGroupView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this._buttons = this.model.labels.map(function (label, i) {
                var button = dom_1.div({
                    class: [buttons_1.bk_btn, buttons_1.bk_btn_type(_this.model.button_type)],
                    disabled: _this.model.disabled,
                }, label);
                button.addEventListener("click", function () { return _this.change_active(i); });
                return button;
            });
            this._update_active();
            var group = dom_1.div({ class: buttons_1.bk_btn_group }, this._buttons);
            this.el.appendChild(group);
        };
        ButtonGroupView.__name__ = "ButtonGroupView";
        return ButtonGroupView;
    }(control_1.ControlView));
    exports.ButtonGroupView = ButtonGroupView;
    var ButtonGroup = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonGroup, _super);
        function ButtonGroup(attrs) {
            return _super.call(this, attrs) || this;
        }
        ButtonGroup.initClass = function () {
            this.define({
                labels: [p.Array, []],
                button_type: [p.ButtonType, "default"],
                callback: [p.Any],
            });
        };
        ButtonGroup.__name__ = "ButtonGroup";
        return ButtonGroup;
    }(control_1.Control));
    exports.ButtonGroup = ButtonGroup;
    ButtonGroup.initClass();
}
,
442: /* models/widgets/checkbox_button_group */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var button_group_1 = require(441) /* ./button_group */;
    var dom_1 = require(5) /* ../../core/dom */;
    var data_structures_1 = require(32) /* ../../core/util/data_structures */;
    var p = require(18) /* ../../core/properties */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var CheckboxButtonGroupView = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxButtonGroupView, _super);
        function CheckboxButtonGroupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CheckboxButtonGroupView.prototype, "active", {
            get: function () {
                return new data_structures_1.Set(this.model.active);
            },
            enumerable: true,
            configurable: true
        });
        CheckboxButtonGroupView.prototype.change_active = function (i) {
            var active = this.active;
            active.toggle(i);
            this.model.active = active.values;
            if (this.model.callback != null)
                this.model.callback.execute(this.model);
        };
        CheckboxButtonGroupView.prototype._update_active = function () {
            var active = this.active;
            this._buttons.forEach(function (button, i) {
                dom_1.classes(button).toggle(mixins_1.bk_active, active.has(i));
            });
        };
        CheckboxButtonGroupView.__name__ = "CheckboxButtonGroupView";
        return CheckboxButtonGroupView;
    }(button_group_1.ButtonGroupView));
    exports.CheckboxButtonGroupView = CheckboxButtonGroupView;
    var CheckboxButtonGroup = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxButtonGroup, _super);
        function CheckboxButtonGroup(attrs) {
            return _super.call(this, attrs) || this;
        }
        CheckboxButtonGroup.initClass = function () {
            this.prototype.default_view = CheckboxButtonGroupView;
            this.define({
                active: [p.Array, []],
            });
        };
        CheckboxButtonGroup.__name__ = "CheckboxButtonGroup";
        return CheckboxButtonGroup;
    }(button_group_1.ButtonGroup));
    exports.CheckboxButtonGroup = CheckboxButtonGroup;
    CheckboxButtonGroup.initClass();
}
,
443: /* models/widgets/checkbox_group */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var input_group_1 = require(453) /* ./input_group */;
    var dom_1 = require(5) /* ../../core/dom */;
    var array_1 = require(24) /* ../../core/util/array */;
    var data_structures_1 = require(32) /* ../../core/util/data_structures */;
    var p = require(18) /* ../../core/properties */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var CheckboxGroupView = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxGroupView, _super);
        function CheckboxGroupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckboxGroupView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            var group = dom_1.div({ class: [inputs_1.bk_input_group, this.model.inline ? mixins_1.bk_inline : null] });
            this.el.appendChild(group);
            var _a = this.model, active = _a.active, labels = _a.labels;
            var _loop_1 = function (i) {
                var checkbox = dom_1.input({ type: "checkbox", value: "" + i });
                checkbox.addEventListener("change", function () { return _this.change_active(i); });
                if (this_1.model.disabled)
                    checkbox.disabled = true;
                if (array_1.includes(active, i))
                    checkbox.checked = true;
                var label_el = dom_1.label({}, checkbox, dom_1.span({}, labels[i]));
                group.appendChild(label_el);
            };
            var this_1 = this;
            for (var i = 0; i < labels.length; i++) {
                _loop_1(i);
            }
        };
        CheckboxGroupView.prototype.change_active = function (i) {
            var active = new data_structures_1.Set(this.model.active);
            active.toggle(i);
            this.model.active = active.values;
            if (this.model.callback != null)
                this.model.callback.execute(this.model);
        };
        CheckboxGroupView.__name__ = "CheckboxGroupView";
        return CheckboxGroupView;
    }(input_group_1.InputGroupView));
    exports.CheckboxGroupView = CheckboxGroupView;
    var CheckboxGroup = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxGroup, _super);
        function CheckboxGroup(attrs) {
            return _super.call(this, attrs) || this;
        }
        CheckboxGroup.initClass = function () {
            this.prototype.default_view = CheckboxGroupView;
            this.define({
                active: [p.Array, []],
                labels: [p.Array, []],
                inline: [p.Boolean, false],
                callback: [p.Any],
            });
        };
        CheckboxGroup.__name__ = "CheckboxGroup";
        return CheckboxGroup;
    }(input_group_1.InputGroup));
    exports.CheckboxGroup = CheckboxGroup;
    CheckboxGroup.initClass();
}
,
444: /* models/widgets/color_picker */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var ColorPickerView = /** @class */ (function (_super) {
        tslib_1.__extends(ColorPickerView, _super);
        function ColorPickerView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorPickerView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.name.change, function () { return _this.input_el.name = _this.model.name || ""; });
            this.connect(this.model.properties.color.change, function () { return _this.input_el.value = _this.model.color; });
            this.connect(this.model.properties.disabled.change, function () { return _this.input_el.disabled = _this.model.disabled; });
        };
        ColorPickerView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this.input_el = dom_1.input({
                type: "color",
                class: inputs_1.bk_input,
                name: this.model.name,
                value: this.model.color,
                disabled: this.model.disabled,
            });
            this.input_el.addEventListener("change", function () { return _this.change_input(); });
            this.group_el.appendChild(this.input_el);
        };
        ColorPickerView.prototype.change_input = function () {
            this.model.color = this.input_el.value;
            _super.prototype.change_input.call(this);
        };
        ColorPickerView.__name__ = "ColorPickerView";
        return ColorPickerView;
    }(input_widget_1.InputWidgetView));
    exports.ColorPickerView = ColorPickerView;
    var ColorPicker = /** @class */ (function (_super) {
        tslib_1.__extends(ColorPicker, _super);
        function ColorPicker(attrs) {
            return _super.call(this, attrs) || this;
        }
        ColorPicker.initClass = function () {
            this.prototype.default_view = ColorPickerView;
            this.define({
                color: [p.Color, "#000000"],
            });
        };
        ColorPicker.__name__ = "ColorPicker";
        return ColorPicker;
    }(input_widget_1.InputWidget));
    exports.ColorPicker = ColorPicker;
    ColorPicker.initClass();
}
,
445: /* models/widgets/control */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var widget_1 = require(487) /* ./widget */;
    var ControlView = /** @class */ (function (_super) {
        tslib_1.__extends(ControlView, _super);
        function ControlView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ControlView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            var p = this.model.properties;
            this.on_change(p.disabled, function () { return _this.render(); });
        };
        ControlView.__name__ = "ControlView";
        return ControlView;
    }(widget_1.WidgetView));
    exports.ControlView = ControlView;
    var Control = /** @class */ (function (_super) {
        tslib_1.__extends(Control, _super);
        function Control(attrs) {
            return _super.call(this, attrs) || this;
        }
        Control.__name__ = "Control";
        return Control;
    }(widget_1.Widget));
    exports.Control = Control;
}
,
446: /* models/widgets/date_picker */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var Pikaday = require(477) /* pikaday */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    require(474) /* ../../styles/widgets/pikaday */;
    Pikaday.prototype.adjustPosition = function () {
        if (this._o.container)
            return;
        this.el.style.position = 'absolute';
        var field = this._o.trigger;
        var width = this.el.offsetWidth;
        var height = this.el.offsetHeight;
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        var clientRect = field.getBoundingClientRect();
        var left = clientRect.left + window.pageXOffset;
        var top = clientRect.bottom + window.pageYOffset;
        // adjust left/top origin to .bk-root
        left -= this.el.parentElement.offsetLeft;
        top -= this.el.parentElement.offsetTop;
        // default position is bottom & left
        if ((this._o.reposition && left + width > viewportWidth) ||
            (this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0))
            left = left - width + field.offsetWidth;
        if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
            (this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0))
            top = top - height - field.offsetHeight;
        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
    };
    var DatePickerView = /** @class */ (function (_super) {
        tslib_1.__extends(DatePickerView, _super);
        function DatePickerView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DatePickerView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () { return _this.render(); });
        };
        DatePickerView.prototype.render = function () {
            var _this = this;
            if (this._picker != null)
                this._picker.destroy();
            _super.prototype.render.call(this);
            this.input_el = dom_1.input({ type: "text", class: inputs_1.bk_input, disabled: this.model.disabled });
            this.group_el.appendChild(this.input_el);
            this._picker = new Pikaday({
                field: this.input_el,
                defaultDate: this._unlocal_date(new Date(this.model.value)),
                setDefaultDate: true,
                minDate: this.model.min_date != null ? this._unlocal_date(new Date(this.model.min_date)) : undefined,
                maxDate: this.model.max_date != null ? this._unlocal_date(new Date(this.model.max_date)) : undefined,
                onSelect: function (date) { return _this._on_select(date); },
            });
            this._root_element.appendChild(this._picker.el);
        };
        DatePickerView.prototype._unlocal_date = function (date) {
            // this sucks but the date comes in as a UTC timestamp and pikaday uses Date's local
            // timezone-converted representation. We want the date to be as given by the user
            var datestr = date.toISOString().substr(0, 10);
            var tup = datestr.split('-');
            return new Date(Number(tup[0]), Number(tup[1]) - 1, Number(tup[2]));
        };
        DatePickerView.prototype._on_select = function (date) {
            // Always use toDateString()!
            // toString() breaks the websocket #4965.
            // toISOString() returns the wrong day (IE on day earlier) #7048
            // XXX: this should be handled by the serializer
            this.model.value = date.toDateString();
            this.change_input();
        };
        DatePickerView.__name__ = "DatePickerView";
        return DatePickerView;
    }(input_widget_1.InputWidgetView));
    exports.DatePickerView = DatePickerView;
    var DatePicker = /** @class */ (function (_super) {
        tslib_1.__extends(DatePicker, _super);
        function DatePicker(attrs) {
            return _super.call(this, attrs) || this;
        }
        DatePicker.initClass = function () {
            this.prototype.default_view = DatePickerView;
            this.define({
                // TODO (bev) types
                value: [p.Any, new Date().toDateString()],
                min_date: [p.Any],
                max_date: [p.Any],
            });
        };
        DatePicker.__name__ = "DatePicker";
        return DatePicker;
    }(input_widget_1.InputWidget));
    exports.DatePicker = DatePicker;
    DatePicker.initClass();
}
,
447: /* models/widgets/date_range_slider */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var tz = require(425) /* timezone */;
    var abstract_slider_1 = require(438) /* ./abstract_slider */;
    var DateRangeSliderView = /** @class */ (function (_super) {
        tslib_1.__extends(DateRangeSliderView, _super);
        function DateRangeSliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DateRangeSliderView.__name__ = "DateRangeSliderView";
        return DateRangeSliderView;
    }(abstract_slider_1.AbstractRangeSliderView));
    exports.DateRangeSliderView = DateRangeSliderView;
    var DateRangeSlider = /** @class */ (function (_super) {
        tslib_1.__extends(DateRangeSlider, _super);
        function DateRangeSlider(attrs) {
            var _this = _super.call(this, attrs) || this;
            _this.behaviour = "drag";
            _this.connected = [false, true, false];
            return _this;
        }
        DateRangeSlider.initClass = function () {
            this.prototype.default_view = DateRangeSliderView;
            this.override({
                format: "%d %b %Y",
            });
        };
        DateRangeSlider.prototype._formatter = function (value, format) {
            return tz(value, format);
        };
        DateRangeSlider.__name__ = "DateRangeSlider";
        return DateRangeSlider;
    }(abstract_slider_1.AbstractSlider));
    exports.DateRangeSlider = DateRangeSlider;
    DateRangeSlider.initClass();
}
,
448: /* models/widgets/date_slider */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var tz = require(425) /* timezone */;
    var abstract_slider_1 = require(438) /* ./abstract_slider */;
    var DateSliderView = /** @class */ (function (_super) {
        tslib_1.__extends(DateSliderView, _super);
        function DateSliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DateSliderView.__name__ = "DateSliderView";
        return DateSliderView;
    }(abstract_slider_1.AbstractSliderView));
    exports.DateSliderView = DateSliderView;
    var DateSlider = /** @class */ (function (_super) {
        tslib_1.__extends(DateSlider, _super);
        function DateSlider(attrs) {
            var _this = _super.call(this, attrs) || this;
            _this.behaviour = "tap";
            _this.connected = [true, false];
            return _this;
        }
        DateSlider.initClass = function () {
            this.prototype.default_view = DateSliderView;
            this.override({
                format: "%d %b %Y",
            });
        };
        DateSlider.prototype._formatter = function (value, format) {
            return tz(value, format);
        };
        DateSlider.__name__ = "DateSlider";
        return DateSlider;
    }(abstract_slider_1.AbstractSlider));
    exports.DateSlider = DateSlider;
    DateSlider.initClass();
}
,
449: /* models/widgets/div */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var markup_1 = require(456) /* ./markup */;
    var p = require(18) /* ../../core/properties */;
    var DivView = /** @class */ (function (_super) {
        tslib_1.__extends(DivView, _super);
        function DivView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DivView.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.model.render_as_text)
                this.markup_el.textContent = this.model.text;
            else
                this.markup_el.innerHTML = this.model.text;
        };
        DivView.__name__ = "DivView";
        return DivView;
    }(markup_1.MarkupView));
    exports.DivView = DivView;
    var Div = /** @class */ (function (_super) {
        tslib_1.__extends(Div, _super);
        function Div(attrs) {
            return _super.call(this, attrs) || this;
        }
        Div.initClass = function () {
            this.prototype.default_view = DivView;
            this.define({
                render_as_text: [p.Boolean, false],
            });
        };
        Div.__name__ = "Div";
        return Div;
    }(markup_1.Markup));
    exports.Div = Div;
    Div.initClass();
}
,
450: /* models/widgets/dropdown */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var abstract_button_1 = require(436) /* ./abstract_button */;
    var bokeh_events_1 = require(3) /* ../../core/bokeh_events */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var types_1 = require(46) /* ../../core/util/types */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var buttons_1 = require(304) /* ../../styles/buttons */;
    var menus_1 = require(308) /* ../../styles/menus */;
    var DropdownView = /** @class */ (function (_super) {
        tslib_1.__extends(DropdownView, _super);
        function DropdownView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._open = false;
            return _this;
        }
        DropdownView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            var caret = dom_1.div({ class: [menus_1.bk_caret, mixins_1.bk_down] });
            if (!this.model.is_split)
                this.button_el.appendChild(caret);
            else {
                var toggle = this._render_button(caret);
                toggle.classList.add(buttons_1.bk_dropdown_toggle);
                toggle.addEventListener("click", function () { return _this._toggle_menu(); });
                this.group_el.appendChild(toggle);
            }
            var items = this.model.menu.map(function (item, i) {
                if (item == null)
                    return dom_1.div({ class: menus_1.bk_divider });
                else {
                    var label = types_1.isString(item) ? item : item[0];
                    var el = dom_1.div({}, label);
                    el.addEventListener("click", function () { return _this._item_click(i); });
                    return el;
                }
            });
            this.menu = dom_1.div({ class: [menus_1.bk_menu, mixins_1.bk_below] }, items);
            this.el.appendChild(this.menu);
            dom_1.undisplay(this.menu);
        };
        DropdownView.prototype._show_menu = function () {
            var _this = this;
            if (!this._open) {
                this._open = true;
                dom_1.display(this.menu);
                var listener_1 = function (event) {
                    var target = event.target;
                    if (target instanceof HTMLElement && !_this.el.contains(target)) {
                        document.removeEventListener("click", listener_1);
                        _this._hide_menu();
                    }
                };
                document.addEventListener("click", listener_1);
            }
        };
        DropdownView.prototype._hide_menu = function () {
            if (this._open) {
                this._open = false;
                dom_1.undisplay(this.menu);
            }
        };
        DropdownView.prototype._toggle_menu = function () {
            if (this._open)
                this._hide_menu();
            else
                this._show_menu();
        };
        DropdownView.prototype.click = function () {
            if (!this.model.is_split)
                this._toggle_menu();
            else {
                this._hide_menu();
                this.model.trigger_event(new bokeh_events_1.ButtonClick());
                this.model.value = this.model.default_value;
                if (this.model.callback != null)
                    this.model.callback.execute(this.model);
                _super.prototype.click.call(this);
            }
        };
        DropdownView.prototype._item_click = function (i) {
            this._hide_menu();
            var item = this.model.menu[i];
            if (item != null) {
                var value_or_callback = types_1.isString(item) ? item : item[1];
                if (types_1.isString(value_or_callback)) {
                    this.model.trigger_event(new bokeh_events_1.MenuItemClick(value_or_callback));
                    this.model.value = value_or_callback;
                    if (this.model.callback != null)
                        this.model.callback.execute(this.model); // XXX: {index: i, item: value_or_callback})
                }
                else {
                    value_or_callback.execute(this.model, { index: i }); // TODO
                    if (this.model.callback != null)
                        this.model.callback.execute(this.model); // XXX: {index: i})
                }
            }
        };
        DropdownView.__name__ = "DropdownView";
        return DropdownView;
    }(abstract_button_1.AbstractButtonView));
    exports.DropdownView = DropdownView;
    var Dropdown = /** @class */ (function (_super) {
        tslib_1.__extends(Dropdown, _super);
        function Dropdown(attrs) {
            return _super.call(this, attrs) || this;
        }
        Dropdown.initClass = function () {
            this.prototype.default_view = DropdownView;
            this.define({
                split: [p.Boolean, false],
                menu: [p.Array, []],
                value: [p.String,],
                default_value: [p.String,],
            });
            this.override({
                label: "Dropdown",
            });
        };
        Object.defineProperty(Dropdown.prototype, "is_split", {
            get: function () {
                return this.split || this.default_value != null;
            },
            enumerable: true,
            configurable: true
        });
        Dropdown.__name__ = "Dropdown";
        return Dropdown;
    }(abstract_button_1.AbstractButton));
    exports.Dropdown = Dropdown;
    Dropdown.initClass();
}
,
451: /* models/widgets/file_input */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var p = require(18) /* ../../core/properties */;
    var widget_1 = require(487) /* ./widget */;
    var FileInputView = /** @class */ (function (_super) {
        tslib_1.__extends(FileInputView, _super);
        function FileInputView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FileInputView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () { return _this.render(); });
            this.connect(this.model.properties.width.change, function () { return _this.render(); });
        };
        FileInputView.prototype.render = function () {
            var _this = this;
            if (this.dialogEl) {
                return;
            }
            this.dialogEl = document.createElement('input');
            this.dialogEl.type = "file";
            this.dialogEl.multiple = false;
            if (this.model.accept != null && this.model.accept != '')
                this.dialogEl.accept = this.model.accept;
            this.dialogEl.style.width = "{this.model.width}px";
            this.dialogEl.onchange = function (e) { return _this.load_file(e); };
            this.el.appendChild(this.dialogEl);
        };
        FileInputView.prototype.load_file = function (e) {
            var _this = this;
            var reader = new FileReader();
            this.model.filename = e.target.files[0].name;
            reader.onload = function (e) { return _this.file(e); };
            reader.readAsDataURL(e.target.files[0]);
        };
        FileInputView.prototype.file = function (e) {
            var file = e.target.result;
            var file_arr = file.split(",");
            var content = file_arr[1];
            var header = file_arr[0].split(":")[1].split(";")[0];
            this.model.value = content;
            this.model.mime_type = header;
        };
        FileInputView.__name__ = "FileInputView";
        return FileInputView;
    }(widget_1.WidgetView));
    exports.FileInputView = FileInputView;
    var FileInput = /** @class */ (function (_super) {
        tslib_1.__extends(FileInput, _super);
        function FileInput(attrs) {
            return _super.call(this, attrs) || this;
        }
        FileInput.initClass = function () {
            this.prototype.type = "FileInput";
            this.prototype.default_view = FileInputView;
            this.define({
                value: [p.String, ''],
                mime_type: [p.String, ''],
                filename: [p.String, ''],
                accept: [p.String, ''],
            });
        };
        FileInput.__name__ = "FileInput";
        return FileInput;
    }(widget_1.Widget));
    exports.FileInput = FileInput;
    FileInput.initClass();
}
,
452: /* models/widgets/index */ function _(require, module, exports) {
    var abstract_button_1 = require(436) /* ./abstract_button */;
    exports.AbstractButton = abstract_button_1.AbstractButton;
    var abstract_icon_1 = require(437) /* ./abstract_icon */;
    exports.AbstractIcon = abstract_icon_1.AbstractIcon;
    var autocomplete_input_1 = require(439) /* ./autocomplete_input */;
    exports.AutocompleteInput = autocomplete_input_1.AutocompleteInput;
    var button_1 = require(440) /* ./button */;
    exports.Button = button_1.Button;
    var checkbox_button_group_1 = require(442) /* ./checkbox_button_group */;
    exports.CheckboxButtonGroup = checkbox_button_group_1.CheckboxButtonGroup;
    var checkbox_group_1 = require(443) /* ./checkbox_group */;
    exports.CheckboxGroup = checkbox_group_1.CheckboxGroup;
    var color_picker_1 = require(444) /* ./color_picker */;
    exports.ColorPicker = color_picker_1.ColorPicker;
    var date_picker_1 = require(446) /* ./date_picker */;
    exports.DatePicker = date_picker_1.DatePicker;
    var date_range_slider_1 = require(447) /* ./date_range_slider */;
    exports.DateRangeSlider = date_range_slider_1.DateRangeSlider;
    var date_slider_1 = require(448) /* ./date_slider */;
    exports.DateSlider = date_slider_1.DateSlider;
    var div_1 = require(449) /* ./div */;
    exports.Div = div_1.Div;
    var dropdown_1 = require(450) /* ./dropdown */;
    exports.Dropdown = dropdown_1.Dropdown;
    var file_input_1 = require(451) /* ./file_input */;
    exports.FileInput = file_input_1.FileInput;
    var input_widget_1 = require(454) /* ./input_widget */;
    exports.InputWidget = input_widget_1.InputWidget;
    var markup_1 = require(456) /* ./markup */;
    exports.Markup = markup_1.Markup;
    var multiselect_1 = require(457) /* ./multiselect */;
    exports.MultiSelect = multiselect_1.MultiSelect;
    var paragraph_1 = require(458) /* ./paragraph */;
    exports.Paragraph = paragraph_1.Paragraph;
    var password_input_1 = require(459) /* ./password_input */;
    exports.PasswordInput = password_input_1.PasswordInput;
    var pretext_1 = require(460) /* ./pretext */;
    exports.PreText = pretext_1.PreText;
    var radio_button_group_1 = require(461) /* ./radio_button_group */;
    exports.RadioButtonGroup = radio_button_group_1.RadioButtonGroup;
    var radio_group_1 = require(462) /* ./radio_group */;
    exports.RadioGroup = radio_group_1.RadioGroup;
    var range_slider_1 = require(463) /* ./range_slider */;
    exports.RangeSlider = range_slider_1.RangeSlider;
    var selectbox_1 = require(464) /* ./selectbox */;
    exports.Select = selectbox_1.Select;
    var slider_1 = require(465) /* ./slider */;
    exports.Slider = slider_1.Slider;
    var spinner_1 = require(466) /* ./spinner */;
    exports.Spinner = spinner_1.Spinner;
    var text_input_1 = require(467) /* ./text_input */;
    exports.TextInput = text_input_1.TextInput;
    var textarea_input_1 = require(468) /* ./textarea_input */;
    exports.TextAreaInput = textarea_input_1.TextAreaInput;
    var toggle_1 = require(469) /* ./toggle */;
    exports.Toggle = toggle_1.Toggle;
    var widget_1 = require(487) /* ./widget */;
    exports.Widget = widget_1.Widget;
}
,
453: /* models/widgets/input_group */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var control_1 = require(445) /* ./control */;
    var InputGroupView = /** @class */ (function (_super) {
        tslib_1.__extends(InputGroupView, _super);
        function InputGroupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InputGroupView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () { return _this.render(); });
        };
        InputGroupView.__name__ = "InputGroupView";
        return InputGroupView;
    }(control_1.ControlView));
    exports.InputGroupView = InputGroupView;
    var InputGroup = /** @class */ (function (_super) {
        tslib_1.__extends(InputGroup, _super);
        function InputGroup(attrs) {
            return _super.call(this, attrs) || this;
        }
        InputGroup.__name__ = "InputGroup";
        return InputGroup;
    }(control_1.Control));
    exports.InputGroup = InputGroup;
}
,
454: /* models/widgets/input_widget */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var control_1 = require(445) /* ./control */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var InputWidgetView = /** @class */ (function (_super) {
        tslib_1.__extends(InputWidgetView, _super);
        function InputWidgetView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InputWidgetView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.title.change, function () {
                _this.label_el.textContent = _this.model.title;
            });
        };
        InputWidgetView.prototype.render = function () {
            _super.prototype.render.call(this);
            var title = this.model.title;
            this.label_el = dom_1.label({ style: { display: title.length == 0 ? "none" : "" } }, title);
            this.group_el = dom_1.div({ class: inputs_1.bk_input_group }, this.label_el);
            this.el.appendChild(this.group_el);
        };
        InputWidgetView.prototype.change_input = function () {
            if (this.model.callback != null)
                this.model.callback.execute(this.model);
        };
        InputWidgetView.__name__ = "InputWidgetView";
        return InputWidgetView;
    }(control_1.ControlView));
    exports.InputWidgetView = InputWidgetView;
    var InputWidget = /** @class */ (function (_super) {
        tslib_1.__extends(InputWidget, _super);
        function InputWidget(attrs) {
            return _super.call(this, attrs) || this;
        }
        InputWidget.initClass = function () {
            this.define({
                title: [p.String, ""],
                callback: [p.Any],
            });
        };
        InputWidget.__name__ = "InputWidget";
        return InputWidget;
    }(control_1.Control));
    exports.InputWidget = InputWidget;
    InputWidget.initClass();
}
,
455: /* models/widgets/main */ function _(require, module, exports) {
    var Widgets = require(452) /* ./index */;
    exports.Widgets = Widgets;
    var base_1 = require(0) /* ../../base */;
    base_1.register_models(Widgets);
}
,
456: /* models/widgets/markup */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var layout_1 = require(13) /* ../../core/layout */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var widget_1 = require(487) /* ./widget */;
    var clearfix_1 = require(471) /* ../../styles/clearfix */;
    var MarkupView = /** @class */ (function (_super) {
        tslib_1.__extends(MarkupView, _super);
        function MarkupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MarkupView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () {
                _this.render();
                _this.root.compute_layout(); // XXX: invalidate_layout?
            });
        };
        MarkupView.prototype._update_layout = function () {
            this.layout = new layout_1.VariadicBox(this.el);
            this.layout.set_sizing(this.box_sizing());
        };
        MarkupView.prototype.render = function () {
            _super.prototype.render.call(this);
            var style = tslib_1.__assign({}, this.model.style, { display: "inline-block" });
            this.markup_el = dom_1.div({ class: clearfix_1.bk_clearfix, style: style });
            this.el.appendChild(this.markup_el);
        };
        MarkupView.__name__ = "MarkupView";
        return MarkupView;
    }(widget_1.WidgetView));
    exports.MarkupView = MarkupView;
    var Markup = /** @class */ (function (_super) {
        tslib_1.__extends(Markup, _super);
        function Markup(attrs) {
            return _super.call(this, attrs) || this;
        }
        Markup.initClass = function () {
            this.define({
                text: [p.String, ''],
                style: [p.Any, {}],
            });
        };
        Markup.__name__ = "Markup";
        return Markup;
    }(widget_1.Widget));
    exports.Markup = Markup;
    Markup.initClass();
}
,
457: /* models/widgets/multiselect */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var dom_1 = require(5) /* ../../core/dom */;
    var types_1 = require(46) /* ../../core/util/types */;
    var data_structures_1 = require(32) /* ../../core/util/data_structures */;
    var p = require(18) /* ../../core/properties */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var MultiSelectView = /** @class */ (function (_super) {
        tslib_1.__extends(MultiSelectView, _super);
        function MultiSelectView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MultiSelectView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.value.change, function () { return _this.render_selection(); });
            this.connect(this.model.properties.options.change, function () { return _this.render(); });
            this.connect(this.model.properties.name.change, function () { return _this.render(); });
            this.connect(this.model.properties.title.change, function () { return _this.render(); });
            this.connect(this.model.properties.size.change, function () { return _this.render(); });
            this.connect(this.model.properties.disabled.change, function () { return _this.render(); });
        };
        MultiSelectView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            var options = this.model.options.map(function (opt) {
                var value, _label;
                if (types_1.isString(opt))
                    value = _label = opt;
                else
                    value = opt[0], _label = opt[1];
                return dom_1.option({ value: value }, _label);
            });
            this.select_el = dom_1.select({
                multiple: true,
                class: inputs_1.bk_input,
                name: this.model.name,
                disabled: this.model.disabled,
            }, options);
            this.select_el.addEventListener("change", function () { return _this.change_input(); });
            this.group_el.appendChild(this.select_el);
            this.render_selection();
        };
        MultiSelectView.prototype.render_selection = function () {
            var selected = new data_structures_1.Set(this.model.value);
            for (var _i = 0, _a = Array.from(this.el.querySelectorAll('option')); _i < _a.length; _i++) {
                var el = _a[_i];
                el.selected = selected.has(el.value);
            }
            // Note that some browser implementations might not reduce
            // the number of visible options for size <= 3.
            this.select_el.size = this.model.size;
        };
        MultiSelectView.prototype.change_input = function () {
            var is_focused = this.el.querySelector('select:focus') != null;
            var values = [];
            for (var _i = 0, _a = Array.from(this.el.querySelectorAll('option')); _i < _a.length; _i++) {
                var el = _a[_i];
                if (el.selected)
                    values.push(el.value);
            }
            this.model.value = values;
            _super.prototype.change_input.call(this);
            // Restore focus back to the <select> afterwards,
            // so that even if python on_change callback is invoked,
            // focus remains on <select> and one can seamlessly scroll
            // up/down.
            if (is_focused)
                this.select_el.focus();
        };
        MultiSelectView.__name__ = "MultiSelectView";
        return MultiSelectView;
    }(input_widget_1.InputWidgetView));
    exports.MultiSelectView = MultiSelectView;
    var MultiSelect = /** @class */ (function (_super) {
        tslib_1.__extends(MultiSelect, _super);
        function MultiSelect(attrs) {
            return _super.call(this, attrs) || this;
        }
        MultiSelect.initClass = function () {
            this.prototype.default_view = MultiSelectView;
            this.define({
                value: [p.Array, []],
                options: [p.Array, []],
                size: [p.Number, 4],
            });
        };
        MultiSelect.__name__ = "MultiSelect";
        return MultiSelect;
    }(input_widget_1.InputWidget));
    exports.MultiSelect = MultiSelect;
    MultiSelect.initClass();
}
,
458: /* models/widgets/paragraph */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var markup_1 = require(456) /* ./markup */;
    var dom_1 = require(5) /* ../../core/dom */;
    var ParagraphView = /** @class */ (function (_super) {
        tslib_1.__extends(ParagraphView, _super);
        function ParagraphView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParagraphView.prototype.render = function () {
            _super.prototype.render.call(this);
            // This overrides default user-agent styling and helps layout work
            var content = dom_1.p({ style: { margin: 0 } }, this.model.text);
            this.markup_el.appendChild(content);
        };
        ParagraphView.__name__ = "ParagraphView";
        return ParagraphView;
    }(markup_1.MarkupView));
    exports.ParagraphView = ParagraphView;
    var Paragraph = /** @class */ (function (_super) {
        tslib_1.__extends(Paragraph, _super);
        function Paragraph(attrs) {
            return _super.call(this, attrs) || this;
        }
        Paragraph.initClass = function () {
            this.prototype.default_view = ParagraphView;
        };
        Paragraph.__name__ = "Paragraph";
        return Paragraph;
    }(markup_1.Markup));
    exports.Paragraph = Paragraph;
    Paragraph.initClass();
}
,
459: /* models/widgets/password_input */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var text_input_1 = require(467) /* ./text_input */;
    var PasswordInputView = /** @class */ (function (_super) {
        tslib_1.__extends(PasswordInputView, _super);
        function PasswordInputView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PasswordInputView.prototype.render = function () {
            _super.prototype.render.call(this);
            this.input_el.type = "password";
        };
        PasswordInputView.__name__ = "PasswordInputView";
        return PasswordInputView;
    }(text_input_1.TextInputView));
    exports.PasswordInputView = PasswordInputView;
    var PasswordInput = /** @class */ (function (_super) {
        tslib_1.__extends(PasswordInput, _super);
        function PasswordInput(attrs) {
            return _super.call(this, attrs) || this;
        }
        PasswordInput.initClass = function () {
            this.prototype.default_view = PasswordInputView;
        };
        PasswordInput.__name__ = "PasswordInput";
        return PasswordInput;
    }(text_input_1.TextInput));
    exports.PasswordInput = PasswordInput;
    PasswordInput.initClass();
}
,
460: /* models/widgets/pretext */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var markup_1 = require(456) /* ./markup */;
    var dom_1 = require(5) /* ../../core/dom */;
    var PreTextView = /** @class */ (function (_super) {
        tslib_1.__extends(PreTextView, _super);
        function PreTextView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreTextView.prototype.render = function () {
            _super.prototype.render.call(this);
            var content = dom_1.pre({ style: { overflow: "auto" } }, this.model.text);
            this.markup_el.appendChild(content);
        };
        PreTextView.__name__ = "PreTextView";
        return PreTextView;
    }(markup_1.MarkupView));
    exports.PreTextView = PreTextView;
    var PreText = /** @class */ (function (_super) {
        tslib_1.__extends(PreText, _super);
        function PreText(attrs) {
            return _super.call(this, attrs) || this;
        }
        PreText.initClass = function () {
            this.prototype.default_view = PreTextView;
        };
        PreText.__name__ = "PreText";
        return PreText;
    }(markup_1.Markup));
    exports.PreText = PreText;
    PreText.initClass();
}
,
461: /* models/widgets/radio_button_group */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var button_group_1 = require(441) /* ./button_group */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var RadioButtonGroupView = /** @class */ (function (_super) {
        tslib_1.__extends(RadioButtonGroupView, _super);
        function RadioButtonGroupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RadioButtonGroupView.prototype.change_active = function (i) {
            if (this.model.active !== i) {
                this.model.active = i;
                if (this.model.callback != null)
                    this.model.callback.execute(this.model);
            }
        };
        RadioButtonGroupView.prototype._update_active = function () {
            var active = this.model.active;
            this._buttons.forEach(function (button, i) {
                dom_1.classes(button).toggle(mixins_1.bk_active, active === i);
            });
        };
        RadioButtonGroupView.__name__ = "RadioButtonGroupView";
        return RadioButtonGroupView;
    }(button_group_1.ButtonGroupView));
    exports.RadioButtonGroupView = RadioButtonGroupView;
    var RadioButtonGroup = /** @class */ (function (_super) {
        tslib_1.__extends(RadioButtonGroup, _super);
        function RadioButtonGroup(attrs) {
            return _super.call(this, attrs) || this;
        }
        RadioButtonGroup.initClass = function () {
            this.prototype.default_view = RadioButtonGroupView;
            this.define({
                active: [p.Any, null],
            });
        };
        RadioButtonGroup.__name__ = "RadioButtonGroup";
        return RadioButtonGroup;
    }(button_group_1.ButtonGroup));
    exports.RadioButtonGroup = RadioButtonGroup;
    RadioButtonGroup.initClass();
}
,
462: /* models/widgets/radio_group */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var dom_1 = require(5) /* ../../core/dom */;
    var string_1 = require(40) /* ../../core/util/string */;
    var p = require(18) /* ../../core/properties */;
    var input_group_1 = require(453) /* ./input_group */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var RadioGroupView = /** @class */ (function (_super) {
        tslib_1.__extends(RadioGroupView, _super);
        function RadioGroupView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RadioGroupView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            var group = dom_1.div({ class: [inputs_1.bk_input_group, this.model.inline ? mixins_1.bk_inline : null] });
            this.el.appendChild(group);
            var name = string_1.uniqueId();
            var _a = this.model, active = _a.active, labels = _a.labels;
            var _loop_1 = function (i) {
                var radio = dom_1.input({ type: "radio", name: name, value: "" + i });
                radio.addEventListener("change", function () { return _this.change_active(i); });
                if (this_1.model.disabled)
                    radio.disabled = true;
                if (i == active)
                    radio.checked = true;
                var label_el = dom_1.label({}, radio, dom_1.span({}, labels[i]));
                group.appendChild(label_el);
            };
            var this_1 = this;
            for (var i = 0; i < labels.length; i++) {
                _loop_1(i);
            }
        };
        RadioGroupView.prototype.change_active = function (i) {
            this.model.active = i;
            if (this.model.callback != null)
                this.model.callback.execute(this.model);
        };
        RadioGroupView.__name__ = "RadioGroupView";
        return RadioGroupView;
    }(input_group_1.InputGroupView));
    exports.RadioGroupView = RadioGroupView;
    var RadioGroup = /** @class */ (function (_super) {
        tslib_1.__extends(RadioGroup, _super);
        function RadioGroup(attrs) {
            return _super.call(this, attrs) || this;
        }
        RadioGroup.initClass = function () {
            this.prototype.default_view = RadioGroupView;
            this.define({
                active: [p.Number,],
                labels: [p.Array, []],
                inline: [p.Boolean, false],
                callback: [p.Any],
            });
        };
        RadioGroup.__name__ = "RadioGroup";
        return RadioGroup;
    }(input_group_1.InputGroup));
    exports.RadioGroup = RadioGroup;
    RadioGroup.initClass();
}
,
463: /* models/widgets/range_slider */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var numbro = require(396) /* numbro */;
    var abstract_slider_1 = require(438) /* ./abstract_slider */;
    var RangeSliderView = /** @class */ (function (_super) {
        tslib_1.__extends(RangeSliderView, _super);
        function RangeSliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RangeSliderView.__name__ = "RangeSliderView";
        return RangeSliderView;
    }(abstract_slider_1.AbstractRangeSliderView));
    exports.RangeSliderView = RangeSliderView;
    var RangeSlider = /** @class */ (function (_super) {
        tslib_1.__extends(RangeSlider, _super);
        function RangeSlider(attrs) {
            var _this = _super.call(this, attrs) || this;
            _this.behaviour = "drag";
            _this.connected = [false, true, false];
            return _this;
        }
        RangeSlider.initClass = function () {
            this.prototype.default_view = RangeSliderView;
            this.override({
                format: "0[.]00",
            });
        };
        RangeSlider.prototype._formatter = function (value, format) {
            return numbro.format(value, format);
        };
        RangeSlider.__name__ = "RangeSlider";
        return RangeSlider;
    }(abstract_slider_1.AbstractSlider));
    exports.RangeSlider = RangeSlider;
    RangeSlider.initClass();
}
,
464: /* models/widgets/selectbox */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var dom_1 = require(5) /* ../../core/dom */;
    var types_1 = require(46) /* ../../core/util/types */;
    var logging_1 = require(17) /* ../../core/logging */;
    var p = require(18) /* ../../core/properties */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var SelectView = /** @class */ (function (_super) {
        tslib_1.__extends(SelectView, _super);
        function SelectView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.change, function () { return _this.render(); });
        };
        SelectView.prototype.build_options = function (values) {
            var _this = this;
            return values.map(function (el) {
                var value, _label;
                if (types_1.isString(el))
                    value = _label = el;
                else
                    value = el[0], _label = el[1];
                var selected = _this.model.value == value;
                return dom_1.option({ selected: selected, value: value }, _label);
            });
        };
        SelectView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            var contents;
            if (types_1.isArray(this.model.options))
                contents = this.build_options(this.model.options);
            else {
                contents = [];
                var options = this.model.options;
                for (var key in options) {
                    var value = options[key];
                    contents.push(dom_1.optgroup({ label: key }, this.build_options(value)));
                }
            }
            this.select_el = dom_1.select({
                class: inputs_1.bk_input,
                id: this.model.id,
                name: this.model.name,
                disabled: this.model.disabled
            }, contents);
            this.select_el.addEventListener("change", function () { return _this.change_input(); });
            this.group_el.appendChild(this.select_el);
        };
        SelectView.prototype.change_input = function () {
            var value = this.select_el.value;
            logging_1.logger.debug("selectbox: value = " + value);
            this.model.value = value;
            _super.prototype.change_input.call(this);
        };
        SelectView.__name__ = "SelectView";
        return SelectView;
    }(input_widget_1.InputWidgetView));
    exports.SelectView = SelectView;
    var Select = /** @class */ (function (_super) {
        tslib_1.__extends(Select, _super);
        function Select(attrs) {
            return _super.call(this, attrs) || this;
        }
        Select.initClass = function () {
            this.prototype.default_view = SelectView;
            this.define({
                value: [p.String, ''],
                options: [p.Any, []],
            });
        };
        Select.__name__ = "Select";
        return Select;
    }(input_widget_1.InputWidget));
    exports.Select = Select;
    Select.initClass();
}
,
465: /* models/widgets/slider */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var numbro = require(396) /* numbro */;
    var abstract_slider_1 = require(438) /* ./abstract_slider */;
    var SliderView = /** @class */ (function (_super) {
        tslib_1.__extends(SliderView, _super);
        function SliderView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SliderView.__name__ = "SliderView";
        return SliderView;
    }(abstract_slider_1.AbstractSliderView));
    exports.SliderView = SliderView;
    var Slider = /** @class */ (function (_super) {
        tslib_1.__extends(Slider, _super);
        function Slider(attrs) {
            var _this = _super.call(this, attrs) || this;
            _this.behaviour = "tap";
            _this.connected = [true, false];
            return _this;
        }
        Slider.initClass = function () {
            this.prototype.default_view = SliderView;
            this.override({
                format: "0[.]00",
            });
        };
        Slider.prototype._formatter = function (value, format) {
            return numbro.format(value, format);
        };
        Slider.__name__ = "Slider";
        return Slider;
    }(abstract_slider_1.AbstractSlider));
    exports.Slider = Slider;
    Slider.initClass();
}
,
466: /* models/widgets/spinner */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var abs = Math.abs, floor = Math.floor, log10 = Math.log10;
    function _get_sig_dig(num) {
        var x = abs(Number(String(num).replace(".", ""))); // remove decimal and make positive
        if (x == 0)
            return 0;
        while (x != 0 && (x % 10 == 0))
            x /= 10; // kill the 0s at the end of n
        return floor(log10(x)) + 1; // get number of digits
    }
    var SpinnerView = /** @class */ (function (_super) {
        tslib_1.__extends(SpinnerView, _super);
        function SpinnerView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpinnerView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.low.change, function () {
                var low = _this.model.low;
                if (low != null)
                    _this.input_el.min = low.toFixed(16);
            });
            this.connect(this.model.properties.high.change, function () {
                var high = _this.model.high;
                if (high != null)
                    _this.input_el.max = high.toFixed(16);
            });
            this.connect(this.model.properties.step.change, function () {
                var step = _this.model.step;
                _this.input_el.step = step.toFixed(16);
            });
            this.connect(this.model.properties.value.change, function () {
                var _a = _this.model, value = _a.value, step = _a.step;
                _this.input_el.value = value.toFixed(_get_sig_dig(step));
            });
            this.connect(this.model.properties.disabled.change, function () {
                _this.input_el.disabled = _this.model.disabled;
            });
        };
        SpinnerView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this.input_el = dom_1.input({
                type: "number",
                class: inputs_1.bk_input,
                name: this.model.name,
                min: this.model.low,
                max: this.model.high,
                value: this.model.value,
                step: this.model.step,
                disabled: this.model.disabled,
            });
            this.input_el.addEventListener("change", function () { return _this.change_input(); });
            //this.input_el.addEventListener("input", () => this.change_input())
            this.group_el.appendChild(this.input_el);
        };
        SpinnerView.prototype.change_input = function () {
            var step = this.model.step;
            var new_value = Number(this.input_el.value);
            this.model.value = Number(new_value.toFixed(_get_sig_dig(step)));
            if (this.model.value != new_value) {
                // this is needed when the current value in the input is already at bounded value
                // and we enter a value outside these bounds. We emit a model change to update
                // the input text value.
                this.model.change.emit();
            }
            _super.prototype.change_input.call(this);
        };
        SpinnerView.__name__ = "SpinnerView";
        return SpinnerView;
    }(input_widget_1.InputWidgetView));
    exports.SpinnerView = SpinnerView;
    var Spinner = /** @class */ (function (_super) {
        tslib_1.__extends(Spinner, _super);
        function Spinner(attrs) {
            return _super.call(this, attrs) || this;
        }
        Spinner.initClass = function () {
            this.prototype.default_view = SpinnerView;
            this.define({
                value: [p.Number, 0],
                low: [p.Number, null],
                high: [p.Number, null],
                step: [p.Number, 1],
            });
        };
        Spinner.__name__ = "Spinner";
        return Spinner;
    }(input_widget_1.InputWidget));
    exports.Spinner = Spinner;
    Spinner.initClass();
}
,
467: /* models/widgets/text_input */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var TextInputView = /** @class */ (function (_super) {
        tslib_1.__extends(TextInputView, _super);
        function TextInputView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextInputView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.name.change, function () { return _this.input_el.name = _this.model.name || ""; });
            this.connect(this.model.properties.value.change, function () { return _this.input_el.value = _this.model.value; });
            this.connect(this.model.properties.value_input.change, function () { return _this.input_el.value = _this.model.value_input; });
            this.connect(this.model.properties.disabled.change, function () { return _this.input_el.disabled = _this.model.disabled; });
            this.connect(this.model.properties.placeholder.change, function () { return _this.input_el.placeholder = _this.model.placeholder; });
        };
        TextInputView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this.input_el = dom_1.input({
                type: "text",
                class: inputs_1.bk_input,
                name: this.model.name,
                value: this.model.value,
                disabled: this.model.disabled,
                placeholder: this.model.placeholder,
            });
            this.input_el.addEventListener("change", function () { return _this.change_input(); });
            this.input_el.addEventListener("input", function () { return _this.change_input_oninput(); });
            this.group_el.appendChild(this.input_el);
        };
        TextInputView.prototype.change_input = function () {
            this.model.value = this.input_el.value;
            _super.prototype.change_input.call(this);
        };
        TextInputView.prototype.change_input_oninput = function () {
            this.model.value_input = this.input_el.value;
            _super.prototype.change_input.call(this);
        };
        TextInputView.__name__ = "TextInputView";
        return TextInputView;
    }(input_widget_1.InputWidgetView));
    exports.TextInputView = TextInputView;
    var TextInput = /** @class */ (function (_super) {
        tslib_1.__extends(TextInput, _super);
        function TextInput(attrs) {
            return _super.call(this, attrs) || this;
        }
        TextInput.initClass = function () {
            this.prototype.default_view = TextInputView;
            this.define({
                value: [p.String, ""],
                value_input: [p.String, ""],
                placeholder: [p.String, ""],
            });
        };
        TextInput.__name__ = "TextInput";
        return TextInput;
    }(input_widget_1.InputWidget));
    exports.TextInput = TextInput;
    TextInput.initClass();
}
,
468: /* models/widgets/textarea_input */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var text_input_1 = require(467) /* ./text_input */;
    var input_widget_1 = require(454) /* ./input_widget */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var inputs_1 = require(472) /* ../../styles/widgets/inputs */;
    var TextAreaInputView = /** @class */ (function (_super) {
        tslib_1.__extends(TextAreaInputView, _super);
        function TextAreaInputView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextAreaInputView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.name.change, function () { return _this.input_el.name = _this.model.name || ""; });
            this.connect(this.model.properties.value.change, function () { return _this.input_el.value = _this.model.value; });
            this.connect(this.model.properties.disabled.change, function () { return _this.input_el.disabled = _this.model.disabled; });
            this.connect(this.model.properties.placeholder.change, function () { return _this.input_el.placeholder = _this.model.placeholder; });
            this.connect(this.model.properties.rows.change, function () { return _this.input_el.rows = _this.model.rows; });
            this.connect(this.model.properties.cols.change, function () { return _this.input_el.cols = _this.model.cols; });
            this.connect(this.model.properties.max_length.change, function () { return _this.input_el.maxLength = _this.model.max_length; });
        };
        TextAreaInputView.prototype.render = function () {
            var _this = this;
            _super.prototype.render.call(this);
            this.input_el = dom_1.textarea({
                class: inputs_1.bk_input,
                name: this.model.name,
                disabled: this.model.disabled,
                placeholder: this.model.placeholder,
                cols: this.model.cols,
                rows: this.model.rows,
                maxLength: this.model.max_length,
            });
            this.input_el.textContent = this.model.value;
            this.input_el.addEventListener("change", function () { return _this.change_input(); });
            this.group_el.appendChild(this.input_el);
        };
        TextAreaInputView.prototype.change_input = function () {
            this.model.value = this.input_el.value;
            _super.prototype.change_input.call(this);
        };
        TextAreaInputView.__name__ = "TextAreaInputView";
        return TextAreaInputView;
    }(input_widget_1.InputWidgetView));
    exports.TextAreaInputView = TextAreaInputView;
    var TextAreaInput = /** @class */ (function (_super) {
        tslib_1.__extends(TextAreaInput, _super);
        function TextAreaInput(attrs) {
            return _super.call(this, attrs) || this;
        }
        TextAreaInput.initClass = function () {
            this.prototype.default_view = TextAreaInputView;
            this.define({
                cols: [p.Number, 20],
                rows: [p.Number, 2],
                max_length: [p.Number, 500],
            });
        };
        TextAreaInput.__name__ = "TextAreaInput";
        return TextAreaInput;
    }(text_input_1.TextInput));
    exports.TextAreaInput = TextAreaInput;
    TextAreaInput.initClass();
}
,
469: /* models/widgets/toggle */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var abstract_button_1 = require(436) /* ./abstract_button */;
    var dom_1 = require(5) /* ../../core/dom */;
    var p = require(18) /* ../../core/properties */;
    var mixins_1 = require(309) /* ../../styles/mixins */;
    var ToggleView = /** @class */ (function (_super) {
        tslib_1.__extends(ToggleView, _super);
        function ToggleView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ToggleView.prototype.connect_signals = function () {
            var _this = this;
            _super.prototype.connect_signals.call(this);
            this.connect(this.model.properties.active.change, function () { return _this._update_active(); });
        };
        ToggleView.prototype.render = function () {
            _super.prototype.render.call(this);
            this._update_active();
        };
        ToggleView.prototype.click = function () {
            this.model.active = !this.model.active;
            _super.prototype.click.call(this);
        };
        ToggleView.prototype._update_active = function () {
            dom_1.classes(this.button_el).toggle(mixins_1.bk_active, this.model.active);
        };
        ToggleView.__name__ = "ToggleView";
        return ToggleView;
    }(abstract_button_1.AbstractButtonView));
    exports.ToggleView = ToggleView;
    var Toggle = /** @class */ (function (_super) {
        tslib_1.__extends(Toggle, _super);
        function Toggle(attrs) {
            return _super.call(this, attrs) || this;
        }
        Toggle.initClass = function () {
            this.prototype.default_view = ToggleView;
            this.define({
                active: [p.Boolean, false],
            });
            this.override({
                label: "Toggle",
            });
        };
        Toggle.__name__ = "Toggle";
        return Toggle;
    }(abstract_button_1.AbstractButton));
    exports.Toggle = Toggle;
    Toggle.initClass();
}
,
487: /* models/widgets/widget */ function _(require, module, exports) {
    var tslib_1 = require(426) /* tslib */;
    var html_box_1 = require(164) /* ../layouts/html_box */;
    var p = require(18) /* ../../core/properties */;
    var WidgetView = /** @class */ (function (_super) {
        tslib_1.__extends(WidgetView, _super);
        function WidgetView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WidgetView.prototype._width_policy = function () {
            return this.model.orientation == "horizontal" ? _super.prototype._width_policy.call(this) : "fixed";
        };
        WidgetView.prototype._height_policy = function () {
            return this.model.orientation == "horizontal" ? "fixed" : _super.prototype._height_policy.call(this);
        };
        WidgetView.prototype.box_sizing = function () {
            var sizing = _super.prototype.box_sizing.call(this);
            if (this.model.orientation == "horizontal") {
                if (sizing.width == null)
                    sizing.width = this.model.default_size;
            }
            else {
                if (sizing.height == null)
                    sizing.height = this.model.default_size;
            }
            return sizing;
        };
        WidgetView.__name__ = "WidgetView";
        return WidgetView;
    }(html_box_1.HTMLBoxView));
    exports.WidgetView = WidgetView;
    var Widget = /** @class */ (function (_super) {
        tslib_1.__extends(Widget, _super);
        function Widget(attrs) {
            return _super.call(this, attrs) || this;
        }
        Widget.initClass = function () {
            this.define({
                orientation: [p.Orientation, "horizontal"],
                default_size: [p.Number, 300],
            });
            this.override({
                margin: [5, 5, 5, 5],
            });
        };
        Widget.__name__ = "Widget";
        return Widget;
    }(html_box_1.HTMLBox));
    exports.Widget = Widget;
    Widget.initClass();
}
,
471: /* styles/clearfix */ function _(require, module, exports) {
    require(311) /* ./root */;
    var _a = require(5) /* ../core/dom */;
    _a.styles.append(".bk-root .bk-clearfix:before,\n.bk-root .bk-clearfix:after {\n  content: \"\";\n  display: table;\n}\n.bk-root .bk-clearfix:after {\n  clear: both;\n}\n");
    exports.bk_clearfix = "bk-clearfix";
}
,
472: /* styles/widgets/inputs */ function _(require, module, exports) {
    require(311) /* ../root */;
    var _a = require(5) /* ../../core/dom */;
    _a.styles.append(".bk-root .bk-input {\n  display: inline-block;\n  width: 100%;\n  flex-grow: 1;\n  -webkit-flex-grow: 1;\n  min-height: 31px;\n  padding: 0 12px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.bk-root .bk-input:focus {\n  border-color: #66afe9;\n  outline: 0;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n.bk-root .bk-input::placeholder,\n.bk-root .bk-input:-ms-input-placeholder,\n.bk-root .bk-input::-moz-placeholder,\n.bk-root .bk-input::-webkit-input-placeholder {\n  color: #999;\n  opacity: 1;\n}\n.bk-root .bk-input[disabled],\n.bk-root .bk-input[readonly] {\n  cursor: not-allowed;\n  background-color: #eee;\n  opacity: 1;\n}\n.bk-root select[multiple].bk-input,\n.bk-root select[size].bk-input,\n.bk-root textarea.bk-input {\n  height: auto;\n}\n.bk-root .bk-input-group {\n  width: 100%;\n  height: 100%;\n  display: inline-flex;\n  display: -webkit-inline-flex;\n  flex-wrap: nowrap;\n  -webkit-flex-wrap: nowrap;\n  align-items: start;\n  -webkit-align-items: start;\n  flex-direction: column;\n  -webkit-flex-direction: column;\n  white-space: nowrap;\n}\n.bk-root .bk-input-group.bk-inline {\n  flex-direction: row;\n  -webkit-flex-direction: row;\n}\n.bk-root .bk-input-group.bk-inline > *:not(:first-child) {\n  margin-left: 5px;\n}\n.bk-root .bk-input-group input[type=\"checkbox\"] + span,\n.bk-root .bk-input-group input[type=\"radio\"] + span {\n  position: relative;\n  top: -2px;\n  margin-left: 3px;\n}\n");
    exports.bk_input = "bk-input";
    exports.bk_input_group = "bk-input-group";
}
,
473: /* styles/widgets/nouislider */ function _(require, module, exports) {
    require(311) /* ../root */;
    var _a = require(5) /* ../../core/dom */;
    _a.styles.append(".bk-root {\n  /* Functional styling;\n * These styles are required for noUiSlider to function.\n * You don't need to change these rules to apply your design.\n */\n  /* Painting and performance;\n * Browsers can paint handles in their own layer.\n */\n  /* Slider size and handle placement;\n */\n  /* Styling;\n */\n  /* Handles and cursors;\n */\n  /* Handle stripes;\n */\n  /* Disabled state;\n */\n  /* Base;\n *\n */\n  /* Values;\n *\n */\n  /* Markings;\n *\n */\n  /* Horizontal layout;\n *\n */\n  /* Vertical layout;\n *\n */\n}\n.bk-root .bk-noUi-target,\n.bk-root .bk-noUi-target * {\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-user-select: none;\n  -ms-touch-action: none;\n  touch-action: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.bk-root .bk-noUi-target {\n  position: relative;\n  direction: ltr;\n}\n.bk-root .bk-noUi-base {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  z-index: 1;\n  /* Fix 401 */\n}\n.bk-root .bk-noUi-connect {\n  position: absolute;\n  right: 0;\n  top: 0;\n  left: 0;\n  bottom: 0;\n}\n.bk-root .bk-noUi-origin {\n  position: absolute;\n  height: 0;\n  width: 0;\n}\n.bk-root .bk-noUi-handle {\n  position: relative;\n  z-index: 1;\n}\n.bk-root .bk-noUi-state-tap .bk-noUi-connect,\n.bk-root .bk-noUi-state-tap .bk-noUi-origin {\n  -webkit-transition: top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\n  transition: top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\n}\n.bk-root .bk-noUi-state-drag * {\n  cursor: inherit !important;\n}\n.bk-root .bk-noUi-base,\n.bk-root .bk-noUi-handle {\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.bk-root .bk-noUi-horizontal {\n  height: 18px;\n}\n.bk-root .bk-noUi-horizontal .bk-noUi-handle {\n  width: 34px;\n  height: 28px;\n  left: -17px;\n  top: -6px;\n}\n.bk-root .bk-noUi-vertical {\n  width: 18px;\n}\n.bk-root .bk-noUi-vertical .bk-noUi-handle {\n  width: 28px;\n  height: 34px;\n  left: -6px;\n  top: -17px;\n}\n.bk-root .bk-noUi-target {\n  background: #FAFAFA;\n  border-radius: 4px;\n  border: 1px solid #D3D3D3;\n  box-shadow: inset 0 1px 1px #F0F0F0, 0 3px 6px -5px #BBB;\n}\n.bk-root .bk-noUi-connect {\n  background: #3FB8AF;\n  border-radius: 4px;\n  box-shadow: inset 0 0 3px rgba(51, 51, 51, 0.45);\n  -webkit-transition: background 450ms;\n  transition: background 450ms;\n}\n.bk-root .bk-noUi-draggable {\n  cursor: ew-resize;\n}\n.bk-root .bk-noUi-vertical .bk-noUi-draggable {\n  cursor: ns-resize;\n}\n.bk-root .bk-noUi-handle {\n  border: 1px solid #D9D9D9;\n  border-radius: 3px;\n  background: #FFF;\n  cursor: default;\n  box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;\n}\n.bk-root .bk-noUi-active {\n  box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #DDD, 0 3px 6px -3px #BBB;\n}\n.bk-root .bk-noUi-handle:before,\n.bk-root .bk-noUi-handle:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  height: 14px;\n  width: 1px;\n  background: #E8E7E6;\n  left: 14px;\n  top: 6px;\n}\n.bk-root .bk-noUi-handle:after {\n  left: 17px;\n}\n.bk-root .bk-noUi-vertical .bk-noUi-handle:before,\n.bk-root .bk-noUi-vertical .bk-noUi-handle:after {\n  width: 14px;\n  height: 1px;\n  left: 6px;\n  top: 14px;\n}\n.bk-root .bk-noUi-vertical .bk-noUi-handle:after {\n  top: 17px;\n}\n.bk-root [disabled] .bk-noUi-connect {\n  background: #B8B8B8;\n}\n.bk-root [disabled].bk-noUi-target,\n.bk-root [disabled].bk-noUi-handle,\n.bk-root [disabled] .bk-noUi-handle {\n  cursor: not-allowed;\n}\n.bk-root .bk-noUi-pips,\n.bk-root .bk-noUi-pips * {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.bk-root .bk-noUi-pips {\n  position: absolute;\n  color: #999;\n}\n.bk-root .bk-noUi-value {\n  position: absolute;\n  white-space: nowrap;\n  text-align: center;\n}\n.bk-root .bk-noUi-value-sub {\n  color: #ccc;\n  font-size: 10px;\n}\n.bk-root .bk-noUi-marker {\n  position: absolute;\n  background: #CCC;\n}\n.bk-root .bk-noUi-marker-sub {\n  background: #AAA;\n}\n.bk-root .bk-noUi-marker-large {\n  background: #AAA;\n}\n.bk-root .bk-noUi-pips-horizontal {\n  padding: 10px 0;\n  height: 80px;\n  top: 100%;\n  left: 0;\n  width: 100%;\n}\n.bk-root .bk-noUi-value-horizontal {\n  -webkit-transform: translate3d(-50%, 50%, 0);\n  transform: translate3d(-50%, 50%, 0);\n}\n.bk-root .bk-noUi-marker-horizontal.bk-noUi-marker {\n  margin-left: -1px;\n  width: 2px;\n  height: 5px;\n}\n.bk-root .bk-noUi-marker-horizontal.bk-noUi-marker-sub {\n  height: 10px;\n}\n.bk-root .bk-noUi-marker-horizontal.bk-noUi-marker-large {\n  height: 15px;\n}\n.bk-root .bk-noUi-pips-vertical {\n  padding: 0 10px;\n  height: 100%;\n  top: 0;\n  left: 100%;\n}\n.bk-root .bk-noUi-value-vertical {\n  -webkit-transform: translate3d(0, 50%, 0);\n  transform: translate3d(0, 50%, 0);\n  padding-left: 25px;\n}\n.bk-root .bk-noUi-marker-vertical.bk-noUi-marker {\n  width: 5px;\n  height: 2px;\n  margin-top: -1px;\n}\n.bk-root .bk-noUi-marker-vertical.bk-noUi-marker-sub {\n  width: 10px;\n}\n.bk-root .bk-noUi-marker-vertical.bk-noUi-marker-large {\n  width: 15px;\n}\n.bk-root .bk-noUi-tooltip {\n  display: block;\n  position: absolute;\n  border: 1px solid #D9D9D9;\n  border-radius: 3px;\n  background: #fff;\n  color: #000;\n  padding: 5px;\n  text-align: center;\n  white-space: nowrap;\n}\n.bk-root .bk-noUi-horizontal .bk-noUi-tooltip {\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  left: 50%;\n  bottom: 120%;\n}\n.bk-root .bk-noUi-vertical .bk-noUi-tooltip {\n  -webkit-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n  top: 50%;\n  right: 120%;\n}\n.bk-root .bk-noUi-handle {\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n.bk-root .bk-noUi-handle.bk-noUi-active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n.bk-root .bk-noUi-tooltip {\n  display: none;\n  white-space: nowrap;\n}\n.bk-root .bk-noUi-handle:hover .bk-noUi-tooltip {\n  display: block;\n}\n.bk-root .bk-noUi-horizontal {\n  width: 100%;\n  height: 10px;\n}\n.bk-root .bk-noUi-horizontal.bk-noUi-target {\n  margin: 5px 0px;\n}\n.bk-root .bk-noUi-horizontal .bk-noUi-handle {\n  width: 14px;\n  height: 18px;\n  left: -7px;\n  top: -5px;\n}\n.bk-root .bk-noUi-vertical {\n  width: 10px;\n  height: 100%;\n}\n.bk-root .bk-noUi-vertical.bk-noUi-target {\n  margin: 0px 5px;\n}\n.bk-root .bk-noUi-vertical .bk-noUi-handle {\n  width: 18px;\n  height: 14px;\n  left: -5px;\n  top: -7px;\n}\n.bk-root .bk-noUi-handle:after,\n.bk-root .bk-noUi-handle:before {\n  display: none;\n}\n.bk-root .bk-noUi-connect {\n  box-shadow: none;\n}\n");
}
,
474: /* styles/widgets/pikaday */ function _(require, module, exports) {
    require(311) /* ../root */;
    var _a = require(5) /* ../../core/dom */;
    _a.styles.append(".bk-root {\n  @charset \"UTF-8\";\n  /*!\n * Pikaday\n * Copyright \u00A9 2014 David Bushell | BSD & MIT license | https://dbushell.com/\n */\n  /*\nclear child float (pika-lendar), using the famous micro clearfix hack\nhttp://nicolasgallagher.com/micro-clearfix-hack/\n*/\n  /* styling for abbr */\n}\n.bk-root .pika-single {\n  z-index: 9999;\n  display: block;\n  position: relative;\n  color: #333;\n  background: #fff;\n  border: 1px solid #ccc;\n  border-bottom-color: #bbb;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.bk-root .pika-single:before,\n.bk-root .pika-single:after {\n  content: \" \";\n  display: table;\n}\n.bk-root .pika-single:after {\n  clear: both;\n}\n.bk-root .pika-single.is-hidden {\n  display: none;\n}\n.bk-root .pika-single.is-bound {\n  position: absolute;\n  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);\n}\n.bk-root .pika-lendar {\n  float: left;\n  width: 240px;\n  margin: 8px;\n}\n.bk-root .pika-title {\n  position: relative;\n  text-align: center;\n}\n.bk-root .pika-label {\n  display: inline-block;\n  position: relative;\n  z-index: 9999;\n  overflow: hidden;\n  margin: 0;\n  padding: 5px 3px;\n  font-size: 14px;\n  line-height: 20px;\n  font-weight: bold;\n  background-color: #fff;\n}\n.bk-root .pika-title select {\n  cursor: pointer;\n  position: absolute;\n  z-index: 9998;\n  margin: 0;\n  left: 0;\n  top: 5px;\n  opacity: 0;\n}\n.bk-root .pika-prev,\n.bk-root .pika-next {\n  display: block;\n  cursor: pointer;\n  position: relative;\n  outline: none;\n  border: 0;\n  padding: 0;\n  width: 20px;\n  height: 30px;\n  /* hide text using text-indent trick, using width value (it's enough) */\n  text-indent: 20px;\n  white-space: nowrap;\n  overflow: hidden;\n  background-color: transparent;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: 75% 75%;\n  opacity: 0.5;\n}\n.bk-root .pika-prev:hover,\n.bk-root .pika-next:hover {\n  opacity: 1;\n}\n.bk-root .pika-prev,\n.bk-root .is-rtl .pika-next {\n  float: left;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');\n}\n.bk-root .pika-next,\n.bk-root .is-rtl .pika-prev {\n  float: right;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');\n}\n.bk-root .pika-prev.is-disabled,\n.bk-root .pika-next.is-disabled {\n  cursor: default;\n  opacity: 0.2;\n}\n.bk-root .pika-select {\n  display: inline-block;\n}\n.bk-root .pika-table {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  border: 0;\n}\n.bk-root .pika-table th,\n.bk-root .pika-table td {\n  width: 14.28571429%;\n  padding: 0;\n}\n.bk-root .pika-table th {\n  color: #999;\n  font-size: 12px;\n  line-height: 25px;\n  font-weight: bold;\n  text-align: center;\n}\n.bk-root .pika-button {\n  cursor: pointer;\n  display: block;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  outline: none;\n  border: 0;\n  margin: 0;\n  width: 100%;\n  padding: 5px;\n  color: #666;\n  font-size: 12px;\n  line-height: 15px;\n  text-align: right;\n  background: #f5f5f5;\n}\n.bk-root .pika-week {\n  font-size: 11px;\n  color: #999;\n}\n.bk-root .is-today .pika-button {\n  color: #33aaff;\n  font-weight: bold;\n}\n.bk-root .is-selected .pika-button,\n.bk-root .has-event .pika-button {\n  color: #fff;\n  font-weight: bold;\n  background: #33aaff;\n  box-shadow: inset 0 1px 3px #178fe5;\n  border-radius: 3px;\n}\n.bk-root .has-event .pika-button {\n  background: #005da9;\n  box-shadow: inset 0 1px 3px #0076c9;\n}\n.bk-root .is-disabled .pika-button,\n.bk-root .is-inrange .pika-button {\n  background: #D5E9F7;\n}\n.bk-root .is-startrange .pika-button {\n  color: #fff;\n  background: #6CB31D;\n  box-shadow: none;\n  border-radius: 3px;\n}\n.bk-root .is-endrange .pika-button {\n  color: #fff;\n  background: #33aaff;\n  box-shadow: none;\n  border-radius: 3px;\n}\n.bk-root .is-disabled .pika-button {\n  pointer-events: none;\n  cursor: default;\n  color: #999;\n  opacity: 0.3;\n}\n.bk-root .is-outside-current-month .pika-button {\n  color: #999;\n  opacity: 0.3;\n}\n.bk-root .is-selection-disabled {\n  pointer-events: none;\n  cursor: default;\n}\n.bk-root .pika-button:hover,\n.bk-root .pika-row.pick-whole-week:hover .pika-button {\n  color: #fff;\n  background: #ff8000;\n  box-shadow: none;\n  border-radius: 3px;\n}\n.bk-root .pika-table abbr {\n  border-bottom: none;\n  cursor: help;\n}\n");
}
,
475: /* styles/widgets/sliders */ function _(require, module, exports) {
    require(311) /* ../root */;
    require(473) /* ./nouislider */;
    var _a = require(5) /* ../../core/dom */;
    _a.styles.append(".bk-root .bk-slider-title {\n  white-space: nowrap;\n}\n.bk-root .bk-slider-value {\n  font-weight: 600;\n}\n");
    exports.bk_slider_value = "bk-slider-value";
    exports.bk_slider_title = "bk-slider-title";
    exports.bk_input_group = "bk-input-group";
}
,
476: /* nouislider/distribute/nouislider */ function _(require, module, exports) {
    /*! nouislider - 10.1.0 - 2017-07-28 17:11:18 */
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define([], factory);
        }
        else if (typeof exports === 'object') {
            // Node/CommonJS
            module.exports = factory();
        }
        else {
            // Browser globals
            window.noUiSlider = factory();
        }
    }(function () {
        'use strict';
        var VERSION = '10.1.0';
        function isValidFormatter(entry) {
            return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
        }
        function removeElement(el) {
            el.parentElement.removeChild(el);
        }
        // Bindable version
        function preventDefault(e) {
            e.preventDefault();
        }
        // Removes duplicates from an array.
        function unique(array) {
            return array.filter(function (a) {
                return !this[a] ? this[a] = true : false;
            }, {});
        }
        // Round a value to the closest 'to'.
        function closest(value, to) {
            return Math.round(value / to) * to;
        }
        // Current position of an element relative to the document.
        function offset(elem, orientation) {
            var rect = elem.getBoundingClientRect();
            var doc = elem.ownerDocument;
            var docElem = doc.documentElement;
            var pageOffset = getPageOffset(doc);
            // getBoundingClientRect contains left scroll in Chrome on Android.
            // I haven't found a feature detection that proves this. Worst case
            // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
            if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
                pageOffset.x = 0;
            }
            return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
        }
        // Checks whether a value is numerical.
        function isNumeric(a) {
            return typeof a === 'number' && !isNaN(a) && isFinite(a);
        }
        // Sets a class and removes it after [duration] ms.
        function addClassFor(element, className, duration) {
            if (duration > 0) {
                addClass(element, className);
                setTimeout(function () {
                    removeClass(element, className);
                }, duration);
            }
        }
        // Limits a value to 0 - 100
        function limit(a) {
            return Math.max(Math.min(a, 100), 0);
        }
        // Wraps a variable as an array, if it isn't one yet.
        // Note that an input array is returned by reference!
        function asArray(a) {
            return Array.isArray(a) ? a : [a];
        }
        // Counts decimals
        function countDecimals(numStr) {
            numStr = String(numStr);
            var pieces = numStr.split(".");
            return pieces.length > 1 ? pieces[1].length : 0;
        }
        // http://youmightnotneedjquery.com/#add_class
        function addClass(el, className) {
            if (el.classList) {
                el.classList.add(className);
            }
            else {
                el.className += ' ' + className;
            }
        }
        // http://youmightnotneedjquery.com/#remove_class
        function removeClass(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            }
            else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
        // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
        function hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
        function getPageOffset(doc) {
            var supportPageOffset = window.pageXOffset !== undefined;
            var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
            var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
            var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
            return {
                x: x,
                y: y
            };
        }
        // we provide a function to compute constants instead
        // of accessing window.* as soon as the module needs it
        // so that we do not compute anything if not needed
        function getActions() {
            // Determine the events to bind. IE11 implements pointerEvents without
            // a prefix, which breaks compatibility with the IE10 implementation.
            return window.navigator.pointerEnabled ? {
                start: 'pointerdown',
                move: 'pointermove',
                end: 'pointerup'
            } : window.navigator.msPointerEnabled ? {
                start: 'MSPointerDown',
                move: 'MSPointerMove',
                end: 'MSPointerUp'
            } : {
                start: 'mousedown touchstart',
                move: 'mousemove touchmove',
                end: 'mouseup touchend'
            };
        }
        // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
        // Issue #785
        function getSupportsPassive() {
            var supportsPassive = false;
            try {
                var opts = Object.defineProperty({}, 'passive', {
                    get: function () {
                        supportsPassive = true;
                    }
                });
                window.addEventListener('test', null, opts);
            }
            catch (e) { }
            return supportsPassive;
        }
        function getSupportsTouchActionNone() {
            return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
        }
        // Value calculation
        // Determine the size of a sub-range in relation to a full range.
        function subRangeRatio(pa, pb) {
            return (100 / (pb - pa));
        }
        // (percentage) How many percent is this value of this range?
        function fromPercentage(range, value) {
            return (value * 100) / (range[1] - range[0]);
        }
        // (percentage) Where is this value on this range?
        function toPercentage(range, value) {
            return fromPercentage(range, range[0] < 0 ?
                value + Math.abs(range[0]) :
                value - range[0]);
        }
        // (value) How much is this percentage on this range?
        function isPercentage(range, value) {
            return ((value * (range[1] - range[0])) / 100) + range[0];
        }
        // Range conversion
        function getJ(value, arr) {
            var j = 1;
            while (value >= arr[j]) {
                j += 1;
            }
            return j;
        }
        // (percentage) Input a value, find where, on a scale of 0-100, it applies.
        function toStepping(xVal, xPct, value) {
            if (value >= xVal.slice(-1)[0]) {
                return 100;
            }
            var j = getJ(value, xVal), va, vb, pa, pb;
            va = xVal[j - 1];
            vb = xVal[j];
            pa = xPct[j - 1];
            pb = xPct[j];
            return pa + (toPercentage([va, vb], value) / subRangeRatio(pa, pb));
        }
        // (value) Input a percentage, find where it is on the specified range.
        function fromStepping(xVal, xPct, value) {
            // There is no range group that fits 100
            if (value >= 100) {
                return xVal.slice(-1)[0];
            }
            var j = getJ(value, xPct), va, vb, pa, pb;
            va = xVal[j - 1];
            vb = xVal[j];
            pa = xPct[j - 1];
            pb = xPct[j];
            return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
        }
        // (percentage) Get the step that applies at a certain value.
        function getStep(xPct, xSteps, snap, value) {
            if (value === 100) {
                return value;
            }
            var j = getJ(value, xPct), a, b;
            // If 'snap' is set, steps are used as fixed points on the slider.
            if (snap) {
                a = xPct[j - 1];
                b = xPct[j];
                // Find the closest position, a or b.
                if ((value - a) > ((b - a) / 2)) {
                    return b;
                }
                return a;
            }
            if (!xSteps[j - 1]) {
                return value;
            }
            return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
        }
        // Entry parsing
        function handleEntryPoint(index, value, that) {
            var percentage;
            // Wrap numerical input in an array.
            if (typeof value === "number") {
                value = [value];
            }
            // Reject any invalid input, by testing whether value is an array.
            if (Object.prototype.toString.call(value) !== '[object Array]') {
                throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
            }
            // Covert min/max syntax to 0 and 100.
            if (index === 'min') {
                percentage = 0;
            }
            else if (index === 'max') {
                percentage = 100;
            }
            else {
                percentage = parseFloat(index);
            }
            // Check for correct input.
            if (!isNumeric(percentage) || !isNumeric(value[0])) {
                throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
            }
            // Store values.
            that.xPct.push(percentage);
            that.xVal.push(value[0]);
            // NaN will evaluate to false too, but to keep
            // logging clear, set step explicitly. Make sure
            // not to override the 'step' setting with false.
            if (!percentage) {
                if (!isNaN(value[1])) {
                    that.xSteps[0] = value[1];
                }
            }
            else {
                that.xSteps.push(isNaN(value[1]) ? false : value[1]);
            }
            that.xHighestCompleteStep.push(0);
        }
        function handleStepPoint(i, n, that) {
            // Ignore 'false' stepping.
            if (!n) {
                return true;
            }
            // Factor to range ratio
            that.xSteps[i] = fromPercentage([
                that.xVal[i],
                that.xVal[i + 1]
            ], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
            var totalSteps = (that.xVal[i + 1] - that.xVal[i]) / that.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);
            that.xHighestCompleteStep[i] = step;
        }
        // Interface
        function Spectrum(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [singleStep || false];
            this.xNumSteps = [false];
            this.xHighestCompleteStep = [];
            this.snap = snap;
            var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */];
            // Map the object keys to an array.
            for (index in entry) {
                if (entry.hasOwnProperty(index)) {
                    ordered.push([entry[index], index]);
                }
            }
            // Sort all entries by value (numeric sort).
            if (ordered.length && typeof ordered[0][0] === "object") {
                ordered.sort(function (a, b) { return a[0][0] - b[0][0]; });
            }
            else {
                ordered.sort(function (a, b) { return a[0] - b[0]; });
            }
            // Convert all entries to subranges.
            for (index = 0; index < ordered.length; index++) {
                handleEntryPoint(ordered[index][1], ordered[index][0], this);
            }
            // Store the actual step values.
            // xSteps is sorted in the same order as xPct and xVal.
            this.xNumSteps = this.xSteps.slice(0);
            // Convert all numeric steps to the percentage of the subrange they represent.
            for (index = 0; index < this.xNumSteps.length; index++) {
                handleStepPoint(index, this.xNumSteps[index], this);
            }
        }
        Spectrum.prototype.getMargin = function (value) {
            var step = this.xNumSteps[0];
            if (step && ((value / step) % 1) !== 0) {
                throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
            }
            return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
        };
        Spectrum.prototype.toStepping = function (value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
        };
        Spectrum.prototype.fromStepping = function (value) {
            return fromStepping(this.xVal, this.xPct, value);
        };
        Spectrum.prototype.getStep = function (value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
        };
        Spectrum.prototype.getNearbySteps = function (value) {
            var j = getJ(value, this.xPct);
            return {
                stepBefore: { startValue: this.xVal[j - 2], step: this.xNumSteps[j - 2], highestStep: this.xHighestCompleteStep[j - 2] },
                thisStep: { startValue: this.xVal[j - 1], step: this.xNumSteps[j - 1], highestStep: this.xHighestCompleteStep[j - 1] },
                stepAfter: { startValue: this.xVal[j - 0], step: this.xNumSteps[j - 0], highestStep: this.xHighestCompleteStep[j - 0] }
            };
        };
        Spectrum.prototype.countStepDecimals = function () {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
        };
        // Outside testing
        Spectrum.prototype.convert = function (value) {
            return this.getStep(this.toStepping(value));
        };
        /*	Every input option is tested and parsed. This'll prevent
            endless validation in internal methods. These tests are
            structured with an item for every option available. An
            option can be marked as required by setting the 'r' flag.
            The testing function is provided with three arguments:
                - The provided value for the option;
                - A reference to the options object;
                - The name for the option;
        
            The testing function returns false when an error is detected,
            or true when everything is OK. It can also modify the option
            object, to make sure all values can be correctly looped elsewhere. */
        var defaultFormatter = { 'to': function (value) {
                return value !== undefined && value.toFixed(2);
            }, 'from': Number };
        function validateFormat(entry) {
            // Any object with a to and from method is supported.
            if (isValidFormatter(entry)) {
                return true;
            }
            throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
        }
        function testStep(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
            }
            // The step option can still be used to set stepping
            // for linear sliders. Overwritten if set in 'range'.
            parsed.singleStep = entry;
        }
        function testRange(parsed, entry) {
            // Filter incorrect input.
            if (typeof entry !== 'object' || Array.isArray(entry)) {
                throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
            }
            // Catch missing start or end.
            if (entry.min === undefined || entry.max === undefined) {
                throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
            }
            // Catch equal start or end.
            if (entry.min === entry.max) {
                throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
            }
            parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
        }
        function testStart(parsed, entry) {
            entry = asArray(entry);
            // Validate input. Values aren't tested, as the public .val method
            // will always provide a valid location.
            if (!Array.isArray(entry) || !entry.length) {
                throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
            }
            // Store the number of handles.
            parsed.handles = entry.length;
            // When the slider is initialized, the .val method will
            // be called with the start options.
            parsed.start = entry;
        }
        function testSnap(parsed, entry) {
            // Enforce 100% stepping within subranges.
            parsed.snap = entry;
            if (typeof entry !== 'boolean') {
                throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
            }
        }
        function testAnimate(parsed, entry) {
            // Enforce 100% stepping within subranges.
            parsed.animate = entry;
            if (typeof entry !== 'boolean') {
                throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
            }
        }
        function testAnimationDuration(parsed, entry) {
            parsed.animationDuration = entry;
            if (typeof entry !== 'number') {
                throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
            }
        }
        function testConnect(parsed, entry) {
            var connect = [false];
            var i;
            // Map legacy options
            if (entry === 'lower') {
                entry = [true, false];
            }
            else if (entry === 'upper') {
                entry = [false, true];
            }
            // Handle boolean options
            if (entry === true || entry === false) {
                for (i = 1; i < parsed.handles; i++) {
                    connect.push(entry);
                }
                connect.push(false);
            }
            // Reject invalid input
            else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
                throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
            }
            else {
                connect = entry;
            }
            parsed.connect = connect;
        }
        function testOrientation(parsed, entry) {
            // Set orientation to an a numerical value for easy
            // array selection.
            switch (entry) {
                case 'horizontal':
                    parsed.ort = 0;
                    break;
                case 'vertical':
                    parsed.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
            }
        }
        function testMargin(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
            }
            // Issue #582
            if (entry === 0) {
                return;
            }
            parsed.margin = parsed.spectrum.getMargin(entry);
            if (!parsed.margin) {
                throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
            }
        }
        function testLimit(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
            }
            parsed.limit = parsed.spectrum.getMargin(entry);
            if (!parsed.limit || parsed.handles < 2) {
                throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
            }
        }
        function testPadding(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric.");
            }
            if (entry === 0) {
                return;
            }
            parsed.padding = parsed.spectrum.getMargin(entry);
            if (!parsed.padding) {
                throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
            }
            if (parsed.padding < 0) {
                throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number.");
            }
            if (parsed.padding >= 50) {
                throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be less than half the range.");
            }
        }
        function testDirection(parsed, entry) {
            // Set direction as a numerical value for easy parsing.
            // Invert connection for RTL sliders, so that the proper
            // handles get the connect/background classes.
            switch (entry) {
                case 'ltr':
                    parsed.dir = 0;
                    break;
                case 'rtl':
                    parsed.dir = 1;
                    break;
                default:
                    throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
            }
        }
        function testBehaviour(parsed, entry) {
            // Make sure the input is a string.
            if (typeof entry !== 'string') {
                throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
            }
            // Check if the string contains any keywords.
            // None are required.
            var tap = entry.indexOf('tap') >= 0;
            var drag = entry.indexOf('drag') >= 0;
            var fixed = entry.indexOf('fixed') >= 0;
            var snap = entry.indexOf('snap') >= 0;
            var hover = entry.indexOf('hover') >= 0;
            if (fixed) {
                if (parsed.handles !== 2) {
                    throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
                }
                // Use margin to enforce fixed state
                testMargin(parsed, parsed.start[1] - parsed.start[0]);
            }
            parsed.events = {
                tap: tap || snap,
                drag: drag,
                fixed: fixed,
                snap: snap,
                hover: hover
            };
        }
        function testMultitouch(parsed, entry) {
            parsed.multitouch = entry;
            if (typeof entry !== 'boolean') {
                throw new Error("noUiSlider (" + VERSION + "): 'multitouch' option must be a boolean.");
            }
        }
        function testTooltips(parsed, entry) {
            if (entry === false) {
                return;
            }
            else if (entry === true) {
                parsed.tooltips = [];
                for (var i = 0; i < parsed.handles; i++) {
                    parsed.tooltips.push(true);
                }
            }
            else {
                parsed.tooltips = asArray(entry);
                if (parsed.tooltips.length !== parsed.handles) {
                    throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
                }
                parsed.tooltips.forEach(function (formatter) {
                    if (typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function')) {
                        throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
                    }
                });
            }
        }
        function testAriaFormat(parsed, entry) {
            parsed.ariaFormat = entry;
            validateFormat(entry);
        }
        function testFormat(parsed, entry) {
            parsed.format = entry;
            validateFormat(entry);
        }
        function testCssPrefix(parsed, entry) {
            if (entry !== undefined && typeof entry !== 'string' && entry !== false) {
                throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
            }
            parsed.cssPrefix = entry;
        }
        function testCssClasses(parsed, entry) {
            if (entry !== undefined && typeof entry !== 'object') {
                throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
            }
            if (typeof parsed.cssPrefix === 'string') {
                parsed.cssClasses = {};
                for (var key in entry) {
                    if (!entry.hasOwnProperty(key)) {
                        continue;
                    }
                    parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                }
            }
            else {
                parsed.cssClasses = entry;
            }
        }
        function testUseRaf(parsed, entry) {
            if (entry === true || entry === false) {
                parsed.useRequestAnimationFrame = entry;
            }
            else {
                throw new Error("noUiSlider (" + VERSION + "): 'useRequestAnimationFrame' option should be true (default) or false.");
            }
        }
        // Test all developer settings and parse to assumption-safe values.
        function testOptions(options) {
            // To prove a fix for #537, freeze options here.
            // If the object is modified, an error will be thrown.
            // Object.freeze(options);
            var parsed = {
                margin: 0,
                limit: 0,
                padding: 0,
                animate: true,
                animationDuration: 300,
                ariaFormat: defaultFormatter,
                format: defaultFormatter
            };
            // Tests are executed in the order they are presented here.
            var tests = {
                'step': { r: false, t: testStep },
                'start': { r: true, t: testStart },
                'connect': { r: true, t: testConnect },
                'direction': { r: true, t: testDirection },
                'snap': { r: false, t: testSnap },
                'animate': { r: false, t: testAnimate },
                'animationDuration': { r: false, t: testAnimationDuration },
                'range': { r: true, t: testRange },
                'orientation': { r: false, t: testOrientation },
                'margin': { r: false, t: testMargin },
                'limit': { r: false, t: testLimit },
                'padding': { r: false, t: testPadding },
                'behaviour': { r: true, t: testBehaviour },
                'multitouch': { r: true, t: testMultitouch },
                'ariaFormat': { r: false, t: testAriaFormat },
                'format': { r: false, t: testFormat },
                'tooltips': { r: false, t: testTooltips },
                'cssPrefix': { r: false, t: testCssPrefix },
                'cssClasses': { r: false, t: testCssClasses },
                'useRequestAnimationFrame': { r: false, t: testUseRaf }
            };
            var defaults = {
                'connect': false,
                'direction': 'ltr',
                'behaviour': 'tap',
                'multitouch': false,
                'orientation': 'horizontal',
                'cssPrefix': 'noUi-',
                'cssClasses': {
                    target: 'target',
                    base: 'base',
                    origin: 'origin',
                    handle: 'handle',
                    handleLower: 'handle-lower',
                    handleUpper: 'handle-upper',
                    horizontal: 'horizontal',
                    vertical: 'vertical',
                    background: 'background',
                    connect: 'connect',
                    ltr: 'ltr',
                    rtl: 'rtl',
                    draggable: 'draggable',
                    drag: 'state-drag',
                    tap: 'state-tap',
                    active: 'active',
                    tooltip: 'tooltip',
                    pips: 'pips',
                    pipsHorizontal: 'pips-horizontal',
                    pipsVertical: 'pips-vertical',
                    marker: 'marker',
                    markerHorizontal: 'marker-horizontal',
                    markerVertical: 'marker-vertical',
                    markerNormal: 'marker-normal',
                    markerLarge: 'marker-large',
                    markerSub: 'marker-sub',
                    value: 'value',
                    valueHorizontal: 'value-horizontal',
                    valueVertical: 'value-vertical',
                    valueNormal: 'value-normal',
                    valueLarge: 'value-large',
                    valueSub: 'value-sub'
                },
                'useRequestAnimationFrame': true
            };
            // AriaFormat defaults to regular format, if any.
            if (options.format && !options.ariaFormat) {
                options.ariaFormat = options.format;
            }
            // Run all options through a testing mechanism to ensure correct
            // input. It should be noted that options might get modified to
            // be handled properly. E.g. wrapping integers in arrays.
            Object.keys(tests).forEach(function (name) {
                // If the option isn't set, but it is required, throw an error.
                if (options[name] === undefined && defaults[name] === undefined) {
                    if (tests[name].r) {
                        throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
                    }
                    return true;
                }
                tests[name].t(parsed, options[name] === undefined ? defaults[name] : options[name]);
            });
            // Forward pips options
            parsed.pips = options.pips;
            var styles = [['left', 'top'], ['right', 'bottom']];
            // Pre-define the styles.
            parsed.style = styles[parsed.dir][parsed.ort];
            parsed.styleOposite = styles[parsed.dir ? 0 : 1][parsed.ort];
            return parsed;
        }
        function closure(target, options, originalOptions) {
            var actions = getActions();
            var supportsTouchActionNone = getSupportsTouchActionNone();
            var supportsPassive = supportsTouchActionNone && getSupportsPassive();
            // All variables local to 'closure' are prefixed with 'scope_'
            var scope_Target = target;
            var scope_Locations = [];
            var scope_Base;
            var scope_Handles;
            var scope_HandleNumbers = [];
            var scope_ActiveHandlesCount = 0;
            var scope_Connects;
            var scope_Spectrum = options.spectrum;
            var scope_Values = [];
            var scope_Events = {};
            var scope_Self;
            var scope_Pips;
            var scope_Document = target.ownerDocument;
            var scope_DocumentElement = scope_Document.documentElement;
            var scope_Body = scope_Document.body;
            // Creates a node, adds it to target, returns the new node.
            function addNodeTo(target, className) {
                var div = scope_Document.createElement('div');
                if (className) {
                    addClass(div, className);
                }
                target.appendChild(div);
                return div;
            }
            // Append a origin to the base
            function addOrigin(base, handleNumber) {
                var origin = addNodeTo(base, options.cssClasses.origin);
                var handle = addNodeTo(origin, options.cssClasses.handle);
                handle.setAttribute('data-handle', handleNumber);
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                // 0 = focusable and reachable
                handle.setAttribute('tabindex', '0');
                handle.setAttribute('role', 'slider');
                handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');
                if (handleNumber === 0) {
                    addClass(handle, options.cssClasses.handleLower);
                }
                else if (handleNumber === options.handles - 1) {
                    addClass(handle, options.cssClasses.handleUpper);
                }
                return origin;
            }
            // Insert nodes for connect elements
            function addConnect(base, add) {
                if (!add) {
                    return false;
                }
                return addNodeTo(base, options.cssClasses.connect);
            }
            // Add handles to the slider base.
            function addElements(connectOptions, base) {
                scope_Handles = [];
                scope_Connects = [];
                scope_Connects.push(addConnect(base, connectOptions[0]));
                // [::::O====O====O====]
                // connectOptions = [0, 1, 1, 1]
                for (var i = 0; i < options.handles; i++) {
                    // Keep a list of all added handles.
                    scope_Handles.push(addOrigin(base, i));
                    scope_HandleNumbers[i] = i;
                    scope_Connects.push(addConnect(base, connectOptions[i + 1]));
                }
            }
            // Initialize a single slider.
            function addSlider(target) {
                // Apply classes and data to the target.
                addClass(target, options.cssClasses.target);
                if (options.dir === 0) {
                    addClass(target, options.cssClasses.ltr);
                }
                else {
                    addClass(target, options.cssClasses.rtl);
                }
                if (options.ort === 0) {
                    addClass(target, options.cssClasses.horizontal);
                }
                else {
                    addClass(target, options.cssClasses.vertical);
                }
                scope_Base = addNodeTo(target, options.cssClasses.base);
            }
            function addTooltip(handle, handleNumber) {
                if (!options.tooltips[handleNumber]) {
                    return false;
                }
                return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
            }
            // The tooltips option is a shorthand for using the 'update' event.
            function tooltips() {
                // Tooltips are added with options.tooltips in original order.
                var tips = scope_Handles.map(addTooltip);
                bindEvent('update', function (values, handleNumber, unencoded) {
                    if (!tips[handleNumber]) {
                        return;
                    }
                    var formattedValue = values[handleNumber];
                    if (options.tooltips[handleNumber] !== true) {
                        formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                    }
                    tips[handleNumber].innerHTML = formattedValue;
                });
            }
            function aria() {
                bindEvent('update', function (values, handleNumber, unencoded, tap, positions) {
                    // Update Aria Values for all handles, as a change in one changes min and max values for the next.
                    scope_HandleNumbers.forEach(function (handleNumber) {
                        var handle = scope_Handles[handleNumber];
                        var min = checkHandlePosition(scope_Locations, handleNumber, 0, true, true, true);
                        var max = checkHandlePosition(scope_Locations, handleNumber, 100, true, true, true);
                        var now = positions[handleNumber];
                        var text = options.ariaFormat.to(unencoded[handleNumber]);
                        handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
                        handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
                        handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
                        handle.children[0].setAttribute('aria-valuetext', text);
                    });
                });
            }
            function getGroup(mode, values, stepped) {
                // Use the range.
                if (mode === 'range' || mode === 'steps') {
                    return scope_Spectrum.xVal;
                }
                if (mode === 'count') {
                    if (!values) {
                        throw new Error("noUiSlider (" + VERSION + "): 'values' required for mode 'count'.");
                    }
                    // Divide 0 - 100 in 'count' parts.
                    var spread = (100 / (values - 1));
                    var v;
                    var i = 0;
                    values = [];
                    // List these parts and have them handled as 'positions'.
                    while ((v = i++ * spread) <= 100) {
                        values.push(v);
                    }
                    mode = 'positions';
                }
                if (mode === 'positions') {
                    // Map all percentages to on-range values.
                    return values.map(function (value) {
                        return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                    });
                }
                if (mode === 'values') {
                    // If the value must be stepped, it needs to be converted to a percentage first.
                    if (stepped) {
                        return values.map(function (value) {
                            // Convert to percentage, apply step, return to value.
                            return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                        });
                    }
                    // Otherwise, we can simply use the values.
                    return values;
                }
            }
            function generateSpread(density, mode, group) {
                function safeIncrement(value, increment) {
                    // Avoid floating point variance by dropping the smallest decimal places.
                    return (value + increment).toFixed(7) / 1;
                }
                var indexes = {};
                var firstInRange = scope_Spectrum.xVal[0];
                var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                var ignoreFirst = false;
                var ignoreLast = false;
                var prevPct = 0;
                // Create a copy of the group, sort it and filter away all duplicates.
                group = unique(group.slice().sort(function (a, b) { return a - b; }));
                // Make sure the range starts with the first element.
                if (group[0] !== firstInRange) {
                    group.unshift(firstInRange);
                    ignoreFirst = true;
                }
                // Likewise for the last one.
                if (group[group.length - 1] !== lastInRange) {
                    group.push(lastInRange);
                    ignoreLast = true;
                }
                group.forEach(function (current, index) {
                    // Get the current step and the lower + upper positions.
                    var step;
                    var i;
                    var q;
                    var low = current;
                    var high = group[index + 1];
                    var newPct;
                    var pctDifference;
                    var pctPos;
                    var type;
                    var steps;
                    var realSteps;
                    var stepsize;
                    // When using 'steps' mode, use the provided steps.
                    // Otherwise, we'll step on to the next subrange.
                    if (mode === 'steps') {
                        step = scope_Spectrum.xNumSteps[index];
                    }
                    // Default to a 'full' step.
                    if (!step) {
                        step = high - low;
                    }
                    // Low can be 0, so test for false. If high is undefined,
                    // we are at the last subrange. Index 0 is already handled.
                    if (low === false || high === undefined) {
                        return;
                    }
                    // Make sure step isn't 0, which would cause an infinite loop (#654)
                    step = Math.max(step, 0.0000001);
                    // Find all steps in the subrange.
                    for (i = low; i <= high; i = safeIncrement(i, step)) {
                        // Get the percentage value for the current step,
                        // calculate the size for the subrange.
                        newPct = scope_Spectrum.toStepping(i);
                        pctDifference = newPct - prevPct;
                        steps = pctDifference / density;
                        realSteps = Math.round(steps);
                        // This ratio represents the ammount of percentage-space a point indicates.
                        // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
                        // Round the percentage offset to an even number, then divide by two
                        // to spread the offset on both sides of the range.
                        stepsize = pctDifference / realSteps;
                        // Divide all points evenly, adding the correct number to this subrange.
                        // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                        for (q = 1; q <= realSteps; q += 1) {
                            // The ratio between the rounded value and the actual size might be ~1% off.
                            // Correct the percentage offset by the number of points
                            // per subrange. density = 1 will result in 100 points on the
                            // full range, 2 for 50, 4 for 25, etc.
                            pctPos = prevPct + (q * stepsize);
                            indexes[pctPos.toFixed(5)] = ['x', 0];
                        }
                        // Determine the point type.
                        type = (group.indexOf(i) > -1) ? 1 : (mode === 'steps' ? 2 : 0);
                        // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                        if (!index && ignoreFirst) {
                            type = 0;
                        }
                        if (!(i === high && ignoreLast)) {
                            // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                            indexes[newPct.toFixed(5)] = [i, type];
                        }
                        // Update the percentage count.
                        prevPct = newPct;
                    }
                });
                return indexes;
            }
            function addMarking(spread, filterFunc, formatter) {
                var element = scope_Document.createElement('div');
                var valueSizeClasses = [
                    options.cssClasses.valueNormal,
                    options.cssClasses.valueLarge,
                    options.cssClasses.valueSub
                ];
                var markerSizeClasses = [
                    options.cssClasses.markerNormal,
                    options.cssClasses.markerLarge,
                    options.cssClasses.markerSub
                ];
                var valueOrientationClasses = [
                    options.cssClasses.valueHorizontal,
                    options.cssClasses.valueVertical
                ];
                var markerOrientationClasses = [
                    options.cssClasses.markerHorizontal,
                    options.cssClasses.markerVertical
                ];
                addClass(element, options.cssClasses.pips);
                addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
                function getClasses(type, source) {
                    var a = source === options.cssClasses.value;
                    var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                    var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                    return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
                }
                function addSpread(offset, values) {
                    // Apply the filter function, if it is set.
                    values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];
                    // Add a marker for every point
                    var node = addNodeTo(element, false);
                    node.className = getClasses(values[1], options.cssClasses.marker);
                    node.style[options.style] = offset + '%';
                    // Values are only appended for points marked '1' or '2'.
                    if (values[1]) {
                        node = addNodeTo(element, false);
                        node.className = getClasses(values[1], options.cssClasses.value);
                        node.style[options.style] = offset + '%';
                        node.innerText = formatter.to(values[0]);
                    }
                }
                // Append all points.
                Object.keys(spread).forEach(function (a) {
                    addSpread(a, spread[a]);
                });
                return element;
            }
            function removePips() {
                if (scope_Pips) {
                    removeElement(scope_Pips);
                    scope_Pips = null;
                }
            }
            function pips(grid) {
                // Fix #669
                removePips();
                var mode = grid.mode;
                var density = grid.density || 1;
                var filter = grid.filter || false;
                var values = grid.values || false;
                var stepped = grid.stepped || false;
                var group = getGroup(mode, values, stepped);
                var spread = generateSpread(density, mode, group);
                var format = grid.format || {
                    to: Math.round
                };
                scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
                return scope_Pips;
            }
            // Shorthand for base dimensions.
            function baseSize() {
                var rect = scope_Base.getBoundingClientRect(), alt = 'offset' + ['Width', 'Height'][options.ort];
                return options.ort === 0 ? (rect.width || scope_Base[alt]) : (rect.height || scope_Base[alt]);
            }
            // Handler for attaching events trough a proxy.
            function attachEvent(events, element, callback, data) {
                // This function can be used to 'filter' events to the slider.
                // element is a node, not a nodeList
                var method = function (e) {
                    if (scope_Target.hasAttribute('disabled')) {
                        return false;
                    }
                    // Stop if an active 'tap' transition is taking place.
                    if (hasClass(scope_Target, options.cssClasses.tap)) {
                        return false;
                    }
                    e = fixEvent(e, data.pageOffset, data.target || element);
                    // Handle reject of multitouch
                    if (!e) {
                        return false;
                    }
                    // Ignore right or middle clicks on start #454
                    if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                        return false;
                    }
                    // Ignore right or middle clicks on start #454
                    if (data.hover && e.buttons) {
                        return false;
                    }
                    // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                    // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                    // touch-action: manipulation, but that allows panning, which breaks
                    // sliders after zooming/on non-responsive pages.
                    // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                    if (!supportsPassive) {
                        e.preventDefault();
                    }
                    e.calcPoint = e.points[options.ort];
                    // Call the event handler with the event [ and additional data ].
                    callback(e, data);
                };
                var methods = [];
                // Bind a closure on the target for every event type.
                events.split(' ').forEach(function (eventName) {
                    element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
                    methods.push([eventName, method]);
                });
                return methods;
            }
            // Provide a clean event with standardized offset values.
            function fixEvent(e, pageOffset, target) {
                // Filter the event to register the type, which can be
                // touch, mouse or pointer. Offset changes need to be
                // made on an event specific basis.
                var touch = e.type.indexOf('touch') === 0;
                var mouse = e.type.indexOf('mouse') === 0;
                var pointer = e.type.indexOf('pointer') === 0;
                var x;
                var y;
                // IE10 implemented pointer events with a prefix;
                if (e.type.indexOf('MSPointer') === 0) {
                    pointer = true;
                }
                // In the event that multitouch is activated, the only thing one handle should be concerned
                // about is the touches that originated on top of it.
                if (touch && options.multitouch) {
                    // Returns true if a touch originated on the target.
                    var isTouchOnTarget = function (touch) {
                        return touch.target === target || target.contains(touch.target);
                    };
                    // In the case of touchstart events, we need to make sure there is still no more than one
                    // touch on the target so we look amongst all touches.
                    if (e.type === 'touchstart') {
                        var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                        // Do not support more than one touch per handle.
                        if (targetTouches.length > 1) {
                            return false;
                        }
                        x = targetTouches[0].pageX;
                        y = targetTouches[0].pageY;
                    }
                    else {
                        // In the other cases, find on changedTouches is enough.
                        var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                        // Cancel if the target touch has not moved.
                        if (!targetTouch) {
                            return false;
                        }
                        x = targetTouch.pageX;
                        y = targetTouch.pageY;
                    }
                }
                else if (touch) {
                    // Fix bug when user touches with two or more fingers on mobile devices.
                    // It's useful when you have two or more sliders on one page,
                    // that can be touched simultaneously.
                    // #649, #663, #668
                    if (e.touches.length > 1) {
                        return false;
                    }
                    // noUiSlider supports one movement at a time,
                    // so we can select the first 'changedTouch'.
                    x = e.changedTouches[0].pageX;
                    y = e.changedTouches[0].pageY;
                }
                pageOffset = pageOffset || getPageOffset(scope_Document);
                if (mouse || pointer) {
                    x = e.clientX + pageOffset.x;
                    y = e.clientY + pageOffset.y;
                }
                e.pageOffset = pageOffset;
                e.points = [x, y];
                e.cursor = mouse || pointer; // Fix #435
                return e;
            }
            // Translate a coordinate in the document to a percentage on the slider
            function calcPointToPercentage(calcPoint) {
                var location = calcPoint - offset(scope_Base, options.ort);
                var proposal = (location * 100) / baseSize();
                return options.dir ? 100 - proposal : proposal;
            }
            // Find handle closest to a certain percentage on the slider
            function getClosestHandle(proposal) {
                var closest = 100;
                var handleNumber = false;
                scope_Handles.forEach(function (handle, index) {
                    // Disabled handles are ignored
                    if (handle.hasAttribute('disabled')) {
                        return;
                    }
                    var pos = Math.abs(scope_Locations[index] - proposal);
                    if (pos < closest) {
                        handleNumber = index;
                        closest = pos;
                    }
                });
                return handleNumber;
            }
            // Moves handle(s) by a percentage
            // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
            function moveHandles(upward, proposal, locations, handleNumbers) {
                var proposals = locations.slice();
                var b = [!upward, upward];
                var f = [upward, !upward];
                // Copy handleNumbers so we don't change the dataset
                handleNumbers = handleNumbers.slice();
                // Check to see which handle is 'leading'.
                // If that one can't move the second can't either.
                if (upward) {
                    handleNumbers.reverse();
                }
                // Step 1: get the maximum percentage that any of the handles can move
                if (handleNumbers.length > 1) {
                    handleNumbers.forEach(function (handleNumber, o) {
                        var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);
                        // Stop if one of the handles can't move.
                        if (to === false) {
                            proposal = 0;
                        }
                        else {
                            proposal = to - proposals[handleNumber];
                            proposals[handleNumber] = to;
                        }
                    });
                }
                // If using one handle, check backward AND forward
                else {
                    b = f = [true];
                }
                var state = false;
                // Step 2: Try to set the handles with the found percentage
                handleNumbers.forEach(function (handleNumber, o) {
                    state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
                });
                // Step 3: If a handle moved, fire events
                if (state) {
                    handleNumbers.forEach(function (handleNumber) {
                        fireEvent('update', handleNumber);
                        fireEvent('slide', handleNumber);
                    });
                }
            }
            // External event handling
            function fireEvent(eventName, handleNumber, tap) {
                Object.keys(scope_Events).forEach(function (targetEvent) {
                    var eventType = targetEvent.split('.')[0];
                    if (eventName === eventType) {
                        scope_Events[targetEvent].forEach(function (callback) {
                            callback.call(
                            // Use the slider public API as the scope ('this')
                            scope_Self, 
                            // Return values as array, so arg_1[arg_2] is always valid.
                            scope_Values.map(options.format.to), 
                            // Handle index, 0 or 1
                            handleNumber, 
                            // Unformatted slider values
                            scope_Values.slice(), 
                            // Event is fired by tap, true or false
                            tap || false, 
                            // Left offset of the handle, in relation to the slider
                            scope_Locations.slice());
                        });
                    }
                });
            }
            // Fire 'end' when a mouse or pen leaves the document.
            function documentLeave(event, data) {
                if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
                    eventEnd(event, data);
                }
            }
            // Handle movement on document for handle and range drag.
            function eventMove(event, data) {
                // Fix #498
                // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
                // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
                // IE9 has .buttons and .which zero on mousemove.
                // Firefox breaks the spec MDN defines.
                if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
                    return eventEnd(event, data);
                }
                // Check if we are moving up or down
                var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
                // Convert the movement into a percentage of the slider width/height
                var proposal = (movement * 100) / data.baseSize;
                moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
            }
            // Unbind move events on document, call callbacks.
            function eventEnd(event, data) {
                // The handle is no longer active, so remove the class.
                if (data.handle) {
                    removeClass(data.handle, options.cssClasses.active);
                    scope_ActiveHandlesCount -= 1;
                }
                // Unbind the move and end events, which are added on 'start'.
                data.listeners.forEach(function (c) {
                    scope_DocumentElement.removeEventListener(c[0], c[1]);
                });
                if (scope_ActiveHandlesCount === 0) {
                    // Remove dragging class.
                    removeClass(scope_Target, options.cssClasses.drag);
                    setZindex();
                    // Remove cursor styles and text-selection events bound to the body.
                    if (event.cursor) {
                        scope_Body.style.cursor = '';
                        scope_Body.removeEventListener('selectstart', preventDefault);
                    }
                }
                data.handleNumbers.forEach(function (handleNumber) {
                    fireEvent('change', handleNumber);
                    fireEvent('set', handleNumber);
                    fireEvent('end', handleNumber);
                });
            }
            // Bind move events on document.
            function eventStart(event, data) {
                var handle;
                if (data.handleNumbers.length === 1) {
                    var handleOrigin = scope_Handles[data.handleNumbers[0]];
                    // Ignore 'disabled' handles
                    if (handleOrigin.hasAttribute('disabled')) {
                        return false;
                    }
                    handle = handleOrigin.children[0];
                    scope_ActiveHandlesCount += 1;
                    // Mark the handle as 'active' so it can be styled.
                    addClass(handle, options.cssClasses.active);
                }
                // A drag should never propagate up to the 'tap' event.
                event.stopPropagation();
                // Record the event listeners.
                var listeners = [];
                // Attach the move and end events.
                var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                    // The event target has changed so we need to propagate the original one so that we keep
                    // relying on it to extract target touches.
                    target: event.target,
                    handle: handle,
                    listeners: listeners,
                    startCalcPoint: event.calcPoint,
                    baseSize: baseSize(),
                    pageOffset: event.pageOffset,
                    handleNumbers: data.handleNumbers,
                    buttonsProperty: event.buttons,
                    locations: scope_Locations.slice()
                });
                var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                    target: event.target,
                    handle: handle,
                    listeners: listeners,
                    handleNumbers: data.handleNumbers
                });
                var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                    target: event.target,
                    handle: handle,
                    listeners: listeners,
                    handleNumbers: data.handleNumbers
                });
                // We want to make sure we pushed the listeners in the listener list rather than creating
                // a new one as it has already been passed to the event handlers.
                listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
                // Text selection isn't an issue on touch devices,
                // so adding cursor styles can be skipped.
                if (event.cursor) {
                    // Prevent the 'I' cursor and extend the range-drag cursor.
                    scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                    // Mark the target with a dragging state.
                    if (scope_Handles.length > 1) {
                        addClass(scope_Target, options.cssClasses.drag);
                    }
                    // Prevent text selection when dragging the handles.
                    // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                    // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                    // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                    // The 'cursor' flag is false.
                    // See: http://caniuse.com/#search=selectstart
                    scope_Body.addEventListener('selectstart', preventDefault, false);
                }
                data.handleNumbers.forEach(function (handleNumber) {
                    fireEvent('start', handleNumber);
                });
            }
            // Move closest handle to tapped location.
            function eventTap(event) {
                // The tap event shouldn't propagate up
                event.stopPropagation();
                var proposal = calcPointToPercentage(event.calcPoint);
                var handleNumber = getClosestHandle(proposal);
                // Tackle the case that all handles are 'disabled'.
                if (handleNumber === false) {
                    return false;
                }
                // Flag the slider as it is now in a transitional state.
                // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
                if (!options.events.snap) {
                    addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                }
                setHandle(handleNumber, proposal, true, true);
                setZindex();
                fireEvent('slide', handleNumber, true);
                fireEvent('update', handleNumber, true);
                fireEvent('change', handleNumber, true);
                fireEvent('set', handleNumber, true);
                if (options.events.snap) {
                    eventStart(event, { handleNumbers: [handleNumber] });
                }
            }
            // Fires a 'hover' event for a hovered mouse/pen position.
            function eventHover(event) {
                var proposal = calcPointToPercentage(event.calcPoint);
                var to = scope_Spectrum.getStep(proposal);
                var value = scope_Spectrum.fromStepping(to);
                Object.keys(scope_Events).forEach(function (targetEvent) {
                    if ('hover' === targetEvent.split('.')[0]) {
                        scope_Events[targetEvent].forEach(function (callback) {
                            callback.call(scope_Self, value);
                        });
                    }
                });
            }
            // Attach events to several slider parts.
            function bindSliderEvents(behaviour) {
                // Attach the standard drag event to the handles.
                if (!behaviour.fixed) {
                    scope_Handles.forEach(function (handle, index) {
                        // These events are only bound to the visual handle
                        // element, not the 'real' origin element.
                        attachEvent(actions.start, handle.children[0], eventStart, {
                            handleNumbers: [index]
                        });
                    });
                }
                // Attach the tap event to the slider base.
                if (behaviour.tap) {
                    attachEvent(actions.start, scope_Base, eventTap, {});
                }
                // Fire hover events
                if (behaviour.hover) {
                    attachEvent(actions.move, scope_Base, eventHover, { hover: true });
                }
                // Make the range draggable.
                if (behaviour.drag) {
                    scope_Connects.forEach(function (connect, index) {
                        if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                            return;
                        }
                        var handleBefore = scope_Handles[index - 1];
                        var handleAfter = scope_Handles[index];
                        var eventHolders = [connect];
                        addClass(connect, options.cssClasses.draggable);
                        // When the range is fixed, the entire range can
                        // be dragged by the handles. The handle in the first
                        // origin will propagate the start event upward,
                        // but it needs to be bound manually on the other.
                        if (behaviour.fixed) {
                            eventHolders.push(handleBefore.children[0]);
                            eventHolders.push(handleAfter.children[0]);
                        }
                        eventHolders.forEach(function (eventHolder) {
                            attachEvent(actions.start, eventHolder, eventStart, {
                                handles: [handleBefore, handleAfter],
                                handleNumbers: [index - 1, index]
                            });
                        });
                    });
                }
            }
            // Split out the handle positioning logic so the Move event can use it, too
            function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
                // For sliders with multiple handles, limit movement to the other handle.
                // Apply the margin option by adding it to the handle positions.
                if (scope_Handles.length > 1) {
                    if (lookBackward && handleNumber > 0) {
                        to = Math.max(to, reference[handleNumber - 1] + options.margin);
                    }
                    if (lookForward && handleNumber < scope_Handles.length - 1) {
                        to = Math.min(to, reference[handleNumber + 1] - options.margin);
                    }
                }
                // The limit option has the opposite effect, limiting handles to a
                // maximum distance from another. Limit must be > 0, as otherwise
                // handles would be unmoveable.
                if (scope_Handles.length > 1 && options.limit) {
                    if (lookBackward && handleNumber > 0) {
                        to = Math.min(to, reference[handleNumber - 1] + options.limit);
                    }
                    if (lookForward && handleNumber < scope_Handles.length - 1) {
                        to = Math.max(to, reference[handleNumber + 1] - options.limit);
                    }
                }
                // The padding option keeps the handles a certain distance from the
                // edges of the slider. Padding must be > 0.
                if (options.padding) {
                    if (handleNumber === 0) {
                        to = Math.max(to, options.padding);
                    }
                    if (handleNumber === scope_Handles.length - 1) {
                        to = Math.min(to, 100 - options.padding);
                    }
                }
                to = scope_Spectrum.getStep(to);
                // Limit percentage to the 0 - 100 range
                to = limit(to);
                // Return false if handle can't move
                if (to === reference[handleNumber] && !getValue) {
                    return false;
                }
                return to;
            }
            function toPct(pct) {
                return pct + '%';
            }
            // Updates scope_Locations and scope_Values, updates visual state
            function updateHandlePosition(handleNumber, to) {
                // Update locations.
                scope_Locations[handleNumber] = to;
                // Convert the value to the slider stepping/range.
                scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
                // Called synchronously or on the next animationFrame
                var stateUpdate = function () {
                    scope_Handles[handleNumber].style[options.style] = toPct(to);
                    updateConnect(handleNumber);
                    updateConnect(handleNumber + 1);
                };
                // Set the handle to the new position.
                // Use requestAnimationFrame for efficient painting.
                // No significant effect in Chrome, Edge sees dramatic performace improvements.
                // Option to disable is useful for unit tests, and single-step debugging.
                if (window.requestAnimationFrame && options.useRequestAnimationFrame) {
                    window.requestAnimationFrame(stateUpdate);
                }
                else {
                    stateUpdate();
                }
            }
            function setZindex() {
                scope_HandleNumbers.forEach(function (handleNumber) {
                    // Handles before the slider middle are stacked later = higher,
                    // Handles after the middle later is lower
                    // [[7] [8] .......... | .......... [5] [4]
                    var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
                    var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
                    scope_Handles[handleNumber].childNodes[0].style.zIndex = zIndex;
                });
            }
            // Test suggested values and apply margin, step.
            function setHandle(handleNumber, to, lookBackward, lookForward) {
                to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);
                if (to === false) {
                    return false;
                }
                updateHandlePosition(handleNumber, to);
                return true;
            }
            // Updates style attribute for connect nodes
            function updateConnect(index) {
                // Skip connects set to false
                if (!scope_Connects[index]) {
                    return;
                }
                var l = 0;
                var h = 100;
                if (index !== 0) {
                    l = scope_Locations[index - 1];
                }
                if (index !== scope_Connects.length - 1) {
                    h = scope_Locations[index];
                }
                scope_Connects[index].style[options.style] = toPct(l);
                scope_Connects[index].style[options.styleOposite] = toPct(100 - h);
            }
            // ...
            function setValue(to, handleNumber) {
                // Setting with null indicates an 'ignore'.
                // Inputting 'false' is invalid.
                if (to === null || to === false) {
                    return;
                }
                // If a formatted number was passed, attemt to decode it.
                if (typeof to === 'number') {
                    to = String(to);
                }
                to = options.format.from(to);
                // Request an update for all links if the value was invalid.
                // Do so too if setting the handle fails.
                if (to !== false && !isNaN(to)) {
                    setHandle(handleNumber, scope_Spectrum.toStepping(to), false, false);
                }
            }
            // Set the slider value.
            function valueSet(input, fireSetEvent) {
                var values = asArray(input);
                var isInit = scope_Locations[0] === undefined;
                // Event fires by default
                fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);
                values.forEach(setValue);
                // Animation is optional.
                // Make sure the initial values were set before using animated placement.
                if (options.animate && !isInit) {
                    addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                }
                // Now that all base values are set, apply constraints
                scope_HandleNumbers.forEach(function (handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, false);
                });
                setZindex();
                scope_HandleNumbers.forEach(function (handleNumber) {
                    fireEvent('update', handleNumber);
                    // Fire the event only for handles that received a new value, as per #579
                    if (values[handleNumber] !== null && fireSetEvent) {
                        fireEvent('set', handleNumber);
                    }
                });
            }
            // Reset slider to initial values
            function valueReset(fireSetEvent) {
                valueSet(options.start, fireSetEvent);
            }
            // Get the slider value.
            function valueGet() {
                var values = scope_Values.map(options.format.to);
                // If only one handle is used, return a single value.
                if (values.length === 1) {
                    return values[0];
                }
                return values;
            }
            // Removes classes from the root and empties it.
            function destroy() {
                for (var key in options.cssClasses) {
                    if (!options.cssClasses.hasOwnProperty(key)) {
                        continue;
                    }
                    removeClass(scope_Target, options.cssClasses[key]);
                }
                while (scope_Target.firstChild) {
                    scope_Target.removeChild(scope_Target.firstChild);
                }
                delete scope_Target.noUiSlider;
            }
            // Get the current step size for the slider.
            function getCurrentStep() {
                // Check all locations, map them to their stepping point.
                // Get the step point, then find it in the input list.
                return scope_Locations.map(function (location, index) {
                    var nearbySteps = scope_Spectrum.getNearbySteps(location);
                    var value = scope_Values[index];
                    var increment = nearbySteps.thisStep.step;
                    var decrement = null;
                    // If the next value in this step moves into the next step,
                    // the increment is the start of the next step - the current value
                    if (increment !== false) {
                        if (value + increment > nearbySteps.stepAfter.startValue) {
                            increment = nearbySteps.stepAfter.startValue - value;
                        }
                    }
                    // If the value is beyond the starting point
                    if (value > nearbySteps.thisStep.startValue) {
                        decrement = nearbySteps.thisStep.step;
                    }
                    else if (nearbySteps.stepBefore.step === false) {
                        decrement = false;
                    }
                    // If a handle is at the start of a step, it always steps back into the previous step first
                    else {
                        decrement = value - nearbySteps.stepBefore.highestStep;
                    }
                    // Now, if at the slider edges, there is not in/decrement
                    if (location === 100) {
                        increment = null;
                    }
                    else if (location === 0) {
                        decrement = null;
                    }
                    // As per #391, the comparison for the decrement step can have some rounding issues.
                    var stepDecimals = scope_Spectrum.countStepDecimals();
                    // Round per #391
                    if (increment !== null && increment !== false) {
                        increment = Number(increment.toFixed(stepDecimals));
                    }
                    if (decrement !== null && decrement !== false) {
                        decrement = Number(decrement.toFixed(stepDecimals));
                    }
                    return [decrement, increment];
                });
            }
            // Attach an event to this slider, possibly including a namespace
            function bindEvent(namespacedEvent, callback) {
                scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                scope_Events[namespacedEvent].push(callback);
                // If the event bound is 'update,' fire it immediately for all handles.
                if (namespacedEvent.split('.')[0] === 'update') {
                    scope_Handles.forEach(function (a, index) {
                        fireEvent('update', index);
                    });
                }
            }
            // Undo attachment of event
            function removeEvent(namespacedEvent) {
                var event = namespacedEvent && namespacedEvent.split('.')[0];
                var namespace = event && namespacedEvent.substring(event.length);
                Object.keys(scope_Events).forEach(function (bind) {
                    var tEvent = bind.split('.')[0], tNamespace = bind.substring(tEvent.length);
                    if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                        delete scope_Events[bind];
                    }
                });
            }
            // Updateable: margin, limit, padding, step, range, animate, snap
            function updateOptions(optionsToUpdate, fireSetEvent) {
                // Spectrum is created using the range, snap, direction and step options.
                // 'snap' and 'step' can be updated.
                // If 'snap' and 'step' are not passed, they should remain unchanged.
                var v = valueGet();
                var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];
                // Only change options that we're actually passed to update.
                updateAble.forEach(function (name) {
                    if (optionsToUpdate[name] !== undefined) {
                        originalOptions[name] = optionsToUpdate[name];
                    }
                });
                var newOptions = testOptions(originalOptions);
                // Load new options into the slider state
                updateAble.forEach(function (name) {
                    if (optionsToUpdate[name] !== undefined) {
                        options[name] = newOptions[name];
                    }
                });
                scope_Spectrum = newOptions.spectrum;
                // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
                options.margin = newOptions.margin;
                options.limit = newOptions.limit;
                options.padding = newOptions.padding;
                // Update pips, removes existing.
                if (options.pips) {
                    pips(options.pips);
                }
                // Invalidate the current positioning so valueSet forces an update.
                scope_Locations = [];
                valueSet(optionsToUpdate.start || v, fireSetEvent);
            }
            // Throw an error if the slider was already initialized.
            if (scope_Target.noUiSlider) {
                throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
            }
            // Create the base element, initialise HTML and set classes.
            // Add handles and connect elements.
            addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            scope_Self = {
                destroy: destroy,
                steps: getCurrentStep,
                on: bindEvent,
                off: removeEvent,
                get: valueGet,
                set: valueSet,
                reset: valueReset,
                // Exposed for unit testing, don't use this in your application.
                __moveHandles: function (a, b, c) { moveHandles(a, b, scope_Locations, c); },
                options: originalOptions,
                updateOptions: updateOptions,
                target: scope_Target,
                removePips: removePips,
                pips: pips // Issue #594
            };
            // Attach user events.
            bindSliderEvents(options.events);
            // Use the public value method to set the start values.
            valueSet(options.start);
            if (options.pips) {
                pips(options.pips);
            }
            if (options.tooltips) {
                tooltips();
            }
            aria();
            return scope_Self;
        }
        // Run the standard initializer
        function initialize(target, originalOptions) {
            if (!target || !target.nodeName) {
                throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
            }
            // Test the options and create the slider environment;
            var options = testOptions(originalOptions, target);
            var api = closure(target, options, originalOptions);
            target.noUiSlider = api;
            return api;
        }
        // Use an object instead of a function for future expansibility;
        return {
            version: VERSION,
            create: initialize
        };
    }));
}
,
477: /* pikaday/pikaday */ function _(require, module, exports) {
    /**
     * feature detection and helper functions
     */
    var addEvent = function (el, e, callback, capture) {
        el.addEventListener(e, callback, !!capture);
    }, removeEvent = function (el, e, callback, capture) {
        el.removeEventListener(e, callback, !!capture);
    }, trim = function (str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    }, hasClass = function (el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    }, addClass = function (el, cn) {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    }, removeClass = function (el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    }, isArray = function (obj) {
        return (/Array/).test(Object.prototype.toString.call(obj));
    }, isDate = function (obj) {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    }, isWeekend = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }, isLeapYear = function (year) {
        // solution lifted from date.js (MIT license): https://github.com/datejs/Datejs
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }, getDaysInMonth = function (year, month) {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }, setToStartOfDay = function (date) {
        if (isDate(date))
            date.setHours(0, 0, 0, 0);
    }, compareDates = function (a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    }, extend = function (to, from, overwrite) {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                }
                else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            }
            else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    }, fireEvent = function (el, eventName, data) {
        var ev;
        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        }
        else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    }, adjustCalendar = function (calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month) / 12);
            calendar.month -= 12;
        }
        return calendar;
    }, 
    /**
     * defaults and localisation
     */
    defaults = {
        // bind the picker to a form field
        field: null,
        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,
        // data-attribute on the input field with an aria assistance tekst (only applied when `bound` is set)
        ariaLabel: 'Use the arrow keys to pick a date',
        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',
        // automatically fit in the viewport even if it means repositioning from the position option
        reposition: true,
        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',
        // the toString function which gets passed a current date object and format
        // and returns a string
        toString: null,
        // used to create date object from current input string
        parse: null,
        // the initial date to view when first opened
        defaultDate: null,
        // make the `defaultDate` the initial selected value
        setDefaultDate: false,
        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,
        // the default flag for moment's strict date parsing
        formatStrict: false,
        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,
        // number of years either side, or array of upper/lower range
        yearRange: 10,
        // show week numbers at head of row
        showWeekNumber: false,
        // Week picker mode
        pickWholeWeek: false,
        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,
        startRange: null,
        endRange: null,
        isRTL: false,
        // Additional text to append to the year in the calendar title
        yearSuffix: '',
        // Render the month after year in the calendar title
        showMonthAfterYear: false,
        // Render days of the calendar grid that fall in the next or previous month
        showDaysInNextAndPreviousMonths: false,
        // Allows user to select days that fall in the next or previous month
        enableSelectionDaysInNextAndPreviousMonths: false,
        // how many months are visible
        numberOfMonths: 1,
        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',
        // Specify a DOM element to render the calendar in
        container: undefined,
        // Blur field when date is selected
        blurFieldOnSelect: true,
        // internationalization
        i18n: {
            previousMonth: 'Previous Month',
            nextMonth: 'Next Month',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        // Theme Classname
        theme: null,
        // events array
        events: [],
        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null,
        // Enable keyboard input
        keyboardInput: true
    }, 
    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function (opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    }, renderDay = function (opts) {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
            if (opts.showDaysInNextAndPreviousMonths) {
                arr.push('is-outside-current-month');
                if (!opts.enableSelectionDaysInNextAndPreviousMonths) {
                    arr.push('is-selection-disabled');
                }
            }
            else {
                return '<td class="is-empty"></td>';
            }
        }
        if (opts.isDisabled) {
            arr.push('is-disabled');
        }
        if (opts.isToday) {
            arr.push('is-today');
        }
        if (opts.isSelected) {
            arr.push('is-selected');
            ariaSelected = 'true';
        }
        if (opts.hasEvent) {
            arr.push('has-event');
        }
        if (opts.isInRange) {
            arr.push('is-inrange');
        }
        if (opts.isStartRange) {
            arr.push('is-startrange');
        }
        if (opts.isEndRange) {
            arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
            '<button class="pika-button pika-day" type="button" ' +
            'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
            opts.day +
            '</button>' +
            '</td>';
    }, isoWeek = function (date) {
        // Ensure we're at the start of the day.
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year because January 4th
        // is always in the first week according to ISO8601.
        var yearDay = date.getDate(), weekDay = date.getDay(), dayInFirstWeek = 4 // January 4th
        , dayShift = dayInFirstWeek - 1 // counting starts at 0
        , daysPerWeek = 7, prevWeekDay = function (day) { return (day + daysPerWeek - 1) % daysPerWeek; };
        // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
        date.setDate(yearDay + dayShift - prevWeekDay(weekDay));
        var jan4th = new Date(date.getFullYear(), 0, dayInFirstWeek), msPerDay = 24 * 60 * 60 * 1000, daysBetween = (date.getTime() - jan4th.getTime()) / msPerDay, weekNum = 1 + Math.round((daysBetween - dayShift + prevWeekDay(jan4th.getDay())) / daysPerWeek);
        return weekNum;
    }, renderWeek = function (d, m, y) {
        var date = new Date(y, m, d), week = isoWeek(date);
        return '<td class="pika-week">' + week + '</td>';
    }, renderRow = function (days, isRTL, pickWholeWeek, isRowSelected) {
        return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    }, renderBody = function (rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
    }, renderHead = function (opts) {
        var i, arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    }, renderTitle = function (instance, c, year, month, refYear, randId) {
        var i, j, arr, opts = instance._o, isMinYear = year === opts.minYear, isMaxYear = year === opts.maxYear, html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">', monthHtml, yearHtml, prev = true, next = true;
        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected="selected"' : '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? ' disabled="disabled"' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';
        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        }
        else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }
        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';
        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        }
        else {
            html += monthHtml + yearHtml;
        }
        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }
        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }
        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === (instance._o.numberOfMonths - 1)) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }
        return html += '</div>';
    }, renderTable = function (opts, data, randId) {
        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
    }, 
    /**
     * Pikaday constructor
     */
    Pikaday = function (options) {
        var self = this, opts = self.config(options);
        self._onMouseDown = function (e) {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        setTimeout(function () {
                            self.hide();
                            if (opts.blurFieldOnSelect && opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                // if this is touch event prevent mouse events emulation
                if (e.preventDefault) {
                    e.preventDefault();
                }
                else {
                    e.returnValue = false;
                    return false;
                }
            }
            else {
                self._c = true;
            }
        };
        self._onChange = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };
        self._onKeyChange = function (e) {
            e = e || window.event;
            if (self.isVisible()) {
                switch (e.keyCode) {
                    case 13:
                    case 27:
                        if (opts.field) {
                            opts.field.blur();
                        }
                        break;
                    case 37:
                        self.adjustDate('subtract', 1);
                        break;
                    case 38:
                        self.adjustDate('subtract', 7);
                        break;
                    case 39:
                        self.adjustDate('add', 1);
                        break;
                    case 40:
                        self.adjustDate('add', 7);
                        break;
                    case 8:
                    case 46:
                        self.setDate(null);
                        break;
                }
            }
        };
        self._parseFieldValue = function () {
            if (opts.parse) {
                return opts.parse(opts.field.value, opts.format);
            }
            else {
                return new Date(Date.parse(opts.field.value));
            }
        };
        self._onInputChange = function (e) {
            var date;
            if (e.firedBy === self) {
                return;
            }
            date = self._parseFieldValue();
            if (isDate(date)) {
                self.setDate(date);
            }
            if (!self._v) {
                self.show();
            }
        };
        self._onInputFocus = function () {
            self.show();
        };
        self._onInputClick = function () {
            self.show();
        };
        self._onInputBlur = function () {
            // IE allows pika div to gain focus; catch blur the input field
            var pEl = document.activeElement;
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            } while ((pEl = pEl.parentNode));
            if (!self._c) {
                self._b = setTimeout(function () {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };
        self._onClick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement, pEl = target;
            if (!target) {
                return;
            }
            do {
                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                    return;
                }
            } while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                self.hide();
            }
        };
        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');
        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'touchend', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);
        if (opts.keyboardInput) {
            addEvent(document, 'keydown', self._onKeyChange);
        }
        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            }
            else if (opts.bound) {
                document.body.appendChild(self.el);
            }
            else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);
            if (!opts.defaultDate) {
                opts.defaultDate = self._parseFieldValue();
                opts.setDefaultDate = true;
            }
        }
        var defDate = opts.defaultDate;
        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            }
            else {
                self.gotoDate(defDate);
            }
        }
        else {
            self.gotoDate(new Date());
        }
        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        }
        else {
            this.show();
        }
    };
    /**
     * public Pikaday API
     */
    Pikaday.prototype = {
        /**
         * configure functionality
         */
        config: function (options) {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }
            var opts = extend(this._o, options, true);
            opts.isRTL = !!opts.isRTL;
            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;
            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;
            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);
            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;
            opts.disableWeekends = !!opts.disableWeekends;
            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;
            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;
            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }
            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            }
            else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }
            return opts;
        },
        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function (format) {
            format = format || this._o.format;
            if (!isDate(this._d)) {
                return '';
            }
            if (this._o.toString) {
                return this._o.toString(this._d, format);
            }
            return this._d.toDateString();
        },
        /**
         * return a Date object of the current selection
         */
        getDate: function () {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },
        /**
         * set the current selection
         */
        setDate: function (date, preventOnSelect) {
            if (!date) {
                this._d = null;
                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }
                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }
            var min = this._o.minDate, max = this._o.maxDate;
            if (isDate(min) && date < min) {
                date = min;
            }
            else if (isDate(max) && date > max) {
                date = max;
            }
            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);
            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },
        /**
         * clear and reset the date
         */
        clear: function () {
            this.setDate(null);
        },
        /**
         * change view to a specific date
         */
        gotoDate: function (date) {
            var newCalendar = true;
            if (!isDate(date)) {
                return;
            }
            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1), lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1), visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
                lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }
            if (newCalendar) {
                this.calendars = [{
                        month: date.getMonth(),
                        year: date.getFullYear()
                    }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }
            this.adjustCalendars();
        },
        adjustDate: function (sign, days) {
            var day = this.getDate() || new Date();
            var difference = parseInt(days) * 24 * 60 * 60 * 1000;
            var newDay;
            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            }
            else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }
            this.setDate(newDay);
        },
        adjustCalendars: function () {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },
        gotoToday: function () {
            this.gotoDate(new Date());
        },
        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function (month) {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },
        nextMonth: function () {
            this.calendars[0].month++;
            this.adjustCalendars();
        },
        prevMonth: function () {
            this.calendars[0].month--;
            this.adjustCalendars();
        },
        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function (year) {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },
        /**
         * change the minDate
         */
        setMinDate: function (value) {
            if (value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear = value.getFullYear();
                this._o.minMonth = value.getMonth();
            }
            else {
                this._o.minDate = defaults.minDate;
                this._o.minYear = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }
            this.draw();
        },
        /**
         * change the maxDate
         */
        setMaxDate: function (value) {
            if (value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            }
            else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }
            this.draw();
        },
        setStartRange: function (value) {
            this._o.startRange = value;
        },
        setEndRange: function (value) {
            this._o.endRange = value;
        },
        /**
         * refresh the HTML
         */
        draw: function (force) {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o, minYear = opts.minYear, maxYear = opts.maxYear, minMonth = opts.minMonth, maxMonth = opts.maxMonth, html = '', randId;
            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }
            for (var c = 0; c < opts.numberOfMonths; c++) {
                randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }
            this.el.innerHTML = html;
            if (opts.bound) {
                if (opts.field.type !== 'hidden') {
                    setTimeout(function () {
                        opts.trigger.focus();
                    }, 1);
                }
            }
            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }
            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', opts.ariaLabel);
            }
        },
        adjustPosition: function () {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect, leftAligned, bottomAligned;
            if (this._o.container)
                return;
            this.el.style.position = 'absolute';
            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            leftAligned = true;
            bottomAligned = true;
            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            }
            else {
                left = pEl.offsetLeft;
                top = pEl.offsetTop + pEl.offsetHeight;
                while ((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top += pEl.offsetTop;
                }
            }
            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
                (this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0)) {
                left = left - width + field.offsetWidth;
                leftAligned = false;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
                (this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0)) {
                top = top - height - field.offsetHeight;
                bottomAligned = false;
            }
            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
            addClass(this.el, leftAligned ? 'left-aligned' : 'right-aligned');
            addClass(this.el, bottomAligned ? 'bottom-aligned' : 'top-aligned');
            removeClass(this.el, !leftAligned ? 'left-aligned' : 'right-aligned');
            removeClass(this.el, !bottomAligned ? 'bottom-aligned' : 'top-aligned');
        },
        /**
         * render HTML for a particular month
         */
        render: function (year, month, randId) {
            var opts = this._o, now = new Date(), days = getDaysInMonth(year, month), before = new Date(year, month, 1).getDay(), data = [], row = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1, nextMonth = month === 11 ? 0 : month + 1, yearOfPreviousMonth = month === 0 ? year - 1 : year, yearOfNextMonth = month === 11 ? year + 1 : year, daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before, after = cells;
            while (after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            var isWeekSelected = false;
            for (var i = 0, r = 0; i < cells; i++) {
                var day = new Date(year, month, 1 + (i - before)), isSelected = isDate(this._d) ? compareDates(day, this._d) : false, isToday = compareDates(day, now), hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false, isEmpty = i < before || i >= (days + before), dayNumber = 1 + (i - before), monthNumber = month, yearNumber = year, isStartRange = opts.startRange && compareDates(opts.startRange, day), isEndRange = opts.endRange && compareDates(opts.endRange, day), isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange, isDisabled = (opts.minDate && day < opts.minDate) ||
                    (opts.maxDate && day > opts.maxDate) ||
                    (opts.disableWeekends && isWeekend(day)) ||
                    (opts.disableDayFn && opts.disableDayFn(day));
                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    }
                    else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }
                var dayConfig = {
                    day: dayNumber,
                    month: monthNumber,
                    year: yearNumber,
                    hasEvent: hasEvent,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange,
                    showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
                    enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
                };
                if (opts.pickWholeWeek && isSelected) {
                    isWeekSelected = true;
                }
                row.push(renderDay(dayConfig));
                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
                    row = [];
                    r = 0;
                    isWeekSelected = false;
                }
            }
            return renderTable(opts, data, randId);
        },
        isVisible: function () {
            return this._v;
        },
        show: function () {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                removeClass(this.el, 'is-hidden');
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },
        hide: function () {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },
        /**
         * GAME OVER
         */
        destroy: function () {
            var opts = this._o;
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (opts.keyboardInput) {
                removeEvent(document, 'keydown', this._onKeyChange);
            }
            if (opts.field) {
                removeEvent(opts.field, 'change', this._onInputChange);
                if (opts.bound) {
                    removeEvent(opts.trigger, 'click', this._onInputClick);
                    removeEvent(opts.trigger, 'focus', this._onInputFocus);
                    removeEvent(opts.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }
    };
    module.exports = Pikaday;
}

}, {"models/widgets/abstract_button":436,"models/widgets/abstract_icon":437,"models/widgets/abstract_slider":438,"models/widgets/autocomplete_input":439,"models/widgets/button":440,"models/widgets/button_group":441,"models/widgets/checkbox_button_group":442,"models/widgets/checkbox_group":443,"models/widgets/color_picker":444,"models/widgets/control":445,"models/widgets/date_picker":446,"models/widgets/date_range_slider":447,"models/widgets/date_slider":448,"models/widgets/div":449,"models/widgets/dropdown":450,"models/widgets/file_input":451,"models/widgets/index":452,"models/widgets/input_group":453,"models/widgets/input_widget":454,"models/widgets/main":455,"models/widgets/markup":456,"models/widgets/multiselect":457,"models/widgets/paragraph":458,"models/widgets/password_input":459,"models/widgets/pretext":460,"models/widgets/radio_button_group":461,"models/widgets/radio_group":462,"models/widgets/range_slider":463,"models/widgets/selectbox":464,"models/widgets/slider":465,"models/widgets/spinner":466,"models/widgets/text_input":467,"models/widgets/textarea_input":468,"models/widgets/toggle":469,"models/widgets/widget":487,"styles/clearfix":471,"styles/widgets/inputs":472,"styles/widgets/nouislider":473,"styles/widgets/pikaday":474,"styles/widgets/sliders":475}, 455, null);
})

//# sourceMappingURL=bokeh-widgets.js.map
