/*!
 * angularjs-color-picker v3.2.1
 * https://github.com/ruhley/angular-color-picker/
 *
 * Copyright 2017 ruhley
 *
 * 2017-05-15 02:14:55
 *
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tinycolor2')) :
	typeof define === 'function' && define.amd ? define(['tinycolor2'], factory) :
	(global.AngularjsColorPicker = factory(global.tinycolor));
}(this, (function (tinycolor) { 'use strict';

tinycolor = 'default' in tinycolor ? tinycolor['default'] : tinycolor;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var AngularColorPickerController = function () {
    function AngularColorPickerController(_$scope, _$element, _$document, _$timeout, _ColorPickerOptions) {
        classCallCheck(this, AngularColorPickerController);

        // set angular injected variables
        this.$scope = _$scope;
        this.$element = _$element;
        this.$document = _$document;
        this.$timeout = _$timeout;
        this.ColorPickerOptions = _ColorPickerOptions;

        this.$scope.init = this.init.bind(this);

        this.hue = 0;
        this.saturation = undefined;
        this.lightness = undefined;
        this.opacity = undefined;

        this.pickerDimensions = {
            width: 150,
            height: 150
        };

        this.sliderDimensions = {
            width: 20,
            height: 150
        };
    }

    createClass(AngularColorPickerController, [{
        key: 'watchNgModel',
        value: function watchNgModel(newValue, oldValue) {
            var _this = this;

            if (newValue !== undefined && oldValue !== undefined && !this.hasOwnProperty('initialNgModel')) {
                this.initialNgModel = newValue;
            }

            this.checkDirty(newValue);

            if (this.colorMouse) {
                return;
            }

            if (newValue !== undefined && newValue !== null) {
                var color = tinycolor(newValue);
                var isValid = this.isColorValid(color);

                if (isValid) {
                    var hsl;

                    if (this.options.round) {
                        hsl = color.toHsl();
                        this.lightness = hsl.l * 100;
                    } else {
                        hsl = color.toHsv();
                        this.lightness = hsl.v * 100;
                    }

                    this.hue = hsl.h;
                    this.saturation = hsl.s * 100;

                    this.updateModel = false;

                    if (this.options.alpha) {
                        this.opacity = hsl.a * 100;
                    }

                    this.$timeout(function () {
                        _this.updateModel = true;
                    });
                }

                this.$scope.control[0].$setValidity('color', isValid);
            } else {
                if (newValue === null || newValue === '') {
                    this.hue = 0;
                    this.saturation = undefined;
                    this.lightness = undefined;
                    this.opacity = undefined;
                }

                this.swatchColor = '';
            }
        }
    }, {
        key: 'watchSwatchPos',
        value: function watchSwatchPos(newValue) {
            var _this2 = this;

            if (newValue !== undefined) {
                this.initConfig();

                this.$timeout(function () {
                    _this2.updateSwatchBackground();
                });
            }
        }
    }, {
        key: 'setupApi',
        value: function setupApi() {
            var _this3 = this;

            if (!this.api) {
                this.api = {};
            }

            this.api.open = function (event) {
                // if already open then don't run show again
                if (_this3.is_open) {
                    return true;
                }

                _this3.is_open = true;
                _this3.hueMouse = false;
                _this3.opacityMouse = false;
                _this3.colorMouse = false;

                _this3.$scope.$applyAsync();

                // force the sliders to re-caculate their position
                _this3.hueUpdate();
                _this3.saturationUpdate();
                _this3.lightnessUpdate();
                _this3.opacityUpdate();

                _this3.eventApiDispatch('onOpen', [event]);
            };

            this.api.close = function (event) {
                if (!_this3.options.inline && (_this3.is_open || _this3.$element[0].querySelector('.color-picker-panel').offsetParent !== null)) {
                    _this3.is_open = false;
                    _this3.$scope.$applyAsync();

                    _this3.eventApiDispatch('onClose', [event]);
                }
            };

            this.api.clear = function (event) {
                if (_this3.ngModel !== '') {
                    _this3.ngModel = '';

                    _this3.eventApiDispatch('onClear', [event]);
                }
            };

            this.api.reset = function (event) {
                if (_this3.ngModel !== _this3.initialNgModel) {
                    _this3.ngModel = _this3.initialNgModel;

                    _this3.eventApiDispatch('onReset', [event]);
                }
            };

            this.api.getElement = function () {
                return _this3.$element;
            };

            this.api.getScope = function () {
                return _this3.$scope;
            };
        }
    }, {
        key: 'reInit',
        value: function reInit(newValue) {
            if (newValue !== undefined) {
                this.initConfig();
            }
        }
    }, {
        key: 'reInitAndUpdate',
        value: function reInitAndUpdate(newValue) {
            if (newValue !== undefined) {
                this.initConfig();
                this.update();
            }
        }
    }, {
        key: 'init',
        value: function init() {
            // browser variables
            this.chrome = Boolean(window.chrome);
            var _android_version = window.navigator.userAgent.match(/Android\s([0-9\.]*)/i);
            this.android_version = _android_version && _android_version.length > 1 ? parseFloat(_android_version[1]) : NaN;

            // needed variables
            this.updateModel = true;

            // watchers
            this.initWatchers();

            // set default config settings
            this.initConfig();

            // mouse events
            this.initMouseEvents();
        }
    }, {
        key: 'initWatchers',
        value: function initWatchers() {
            // ngModel

            this.$scope.$watch('AngularColorPickerController.ngModel', this.watchNgModel.bind(this));

            // options

            this.$scope.$watch('AngularColorPickerController.options.swatchPos', this.watchSwatchPos.bind(this));

            this.$scope.$watchGroup(['AngularColorPickerController.options.format', 'AngularColorPickerController.options.alpha', 'AngularColorPickerController.options.case', 'AngularColorPickerController.options.round', 'AngularColorPickerController.options.restrictToFormat', 'AngularColorPickerController.options.allowEmpty'], this.reInitAndUpdate.bind(this));

            this.$scope.$watchGroup(['AngularColorPickerController.options.disabled', 'AngularColorPickerController.options.swatchBootstrap', 'AngularColorPickerController.options.swatchOnly', 'AngularColorPickerController.options.swatch', 'AngularColorPickerController.options.pos', 'AngularColorPickerController.options.inline', 'AngularColorPickerController.options.placeholder'], this.reInit.bind(this));

            // api

            this.$scope.$watch('AngularColorPickerController.api', this.setupApi.bind(this));

            // internal

            this.$scope.$watch('AngularColorPickerController.swatchColor', this.updateSwatchBackground.bind(this));

            this.$scope.$watch('AngularColorPickerController.hue', this.hueUpdate.bind(this));

            this.$scope.$watch('AngularColorPickerController.saturation', this.saturationUpdate.bind(this));

            this.$scope.$watch('AngularColorPickerController.lightness', this.lightnessUpdate.bind(this));

            this.$scope.$watch('AngularColorPickerController.opacity', this.opacityUpdate.bind(this));
        }
    }, {
        key: 'initMouseEvents',
        value: function initMouseEvents() {
            var _this4 = this;

            var eventHandlers = {
                mouseDown: this.onMouseDown.bind(this),
                mouseUp: this.onMouseUp.bind(this),
                mouseMove: this.onMouseMove.bind(this),
                keyUp: this.onKeyUp.bind(this)
            };

            // setup mouse events
            this.$document.on('mousedown', eventHandlers.mouseDown);
            this.$document.on('mouseup', eventHandlers.mouseUp);
            this.$document.on('mousemove', eventHandlers.mouseMove);

            // setup touch events
            this.$document.on('touchstart', eventHandlers.mouseDown);
            this.$document.on('touchend', eventHandlers.mouseUp);
            this.$document.on('touchmove', eventHandlers.mouseMove);

            // setup key events
            this.$document.on('keyup', eventHandlers.keyUp);

            // grid click
            this.find('.color-picker-grid').on('click', this.onColorClick.bind(this));
            this.find('.color-picker-grid').on('touchend', this.onColorClick.bind(this));

            // hue click
            this.find('.color-picker-hue').on('click', this.onHueClick.bind(this));
            this.find('.color-picker-hue').on('touchend', this.onHueClick.bind(this));

            // saturation click
            this.find('.color-picker-saturation').on('click', this.onSaturationClick.bind(this));
            this.find('.color-picker-saturation').on('touchend', this.onSaturationClick.bind(this));

            // lightness click
            this.find('.color-picker-lightness').on('click', this.onLightnessClick.bind(this));
            this.find('.color-picker-lightness').on('touchend', this.onLightnessClick.bind(this));

            // opacity click
            this.find('.color-picker-opacity').on('click', this.onOpacityClick.bind(this));
            this.find('.color-picker-opacity').on('touchend', this.onOpacityClick.bind(this));

            this.find('.color-picker-input').on('focusin', this.onFocus.bind(this));
            this.find('.color-picker-input').on('focusout', this.onBlur.bind(this));

            //---------------------------
            // destroy
            //---------------------------

            this.$scope.$on('$destroy', function () {
                // remove mouse events
                _this4.$document.off('mousedown', eventHandlers.mouseDown);
                _this4.$document.off('mouseup', eventHandlers.mouseUp);
                _this4.$document.off('mousemove', eventHandlers.mouseMove);

                // remove touch events
                _this4.$document.off('touchstart', eventHandlers.mouseDown);
                _this4.$document.off('touchend', eventHandlers.mouseUp);
                _this4.$document.off('touchmove', eventHandlers.mouseMove);

                // remove key events
                _this4.$document.off('keyup', eventHandlers.keyUp);

                _this4.eventApiDispatch('onDestroy');
            });
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            this.has_moused_moved = false;

            // if disabled or not an element in this picker then do nothing
            if (this.options.disabled || this.find(event.target).length === 0) {
                return true;
            }

            // mouse event on color grid
            if (event.target.classList.contains('color-picker-grid-inner') || event.target.classList.contains('color-picker-picker') || event.target.parentNode.classList.contains('color-picker-picker')) {
                this.colorDown(event);
                this.$scope.$apply();
                // mouse event on hue slider
            } else if (event.target.classList.contains('color-picker-hue') || event.target.parentNode.classList.contains('color-picker-hue')) {
                this.hueDown(event);
                this.$scope.$apply();
                // mouse event on saturation slider
            } else if (event.target.classList.contains('color-picker-saturation') || event.target.parentNode.classList.contains('color-picker-saturation')) {
                this.saturationDown(event);
                this.$scope.$apply();
                // mouse event on lightness slider
            } else if (event.target.classList.contains('color-picker-lightness') || event.target.parentNode.classList.contains('color-picker-lightness')) {
                this.lightnessDown(event);
                this.$scope.$apply();
                // mouse event on opacity slider
            } else if (event.target.classList.contains('color-picker-opacity') || event.target.parentNode.classList.contains('color-picker-opacity')) {
                this.opacityDown(event);
                this.$scope.$apply();
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            // no current mouse events and not an element in the picker
            if (!this.colorMouse && !this.hueMouse && !this.opacityMouse && this.find(event.target).length === 0) {
                this.setupApi();
                if (this.options.hide.click) {
                    this.api.close(event);
                }
                this.$scope.$apply();
                // mouse event on color grid
            } else if (this.colorMouse && this.has_moused_moved) {
                this.colorUp(event);
                this.$scope.$apply();
                this.onChange(event);
                // mouse event on hue slider
            } else if (this.hueMouse && this.has_moused_moved) {
                this.hueUp(event);
                this.$scope.$apply();
                this.onChange(event);
                // mouse event on saturation slider
            } else if (this.saturationMouse && this.has_moused_moved) {
                this.saturationUp(event);
                this.$scope.$apply();
                this.onChange(event);
                // mouse event on lightness slider
            } else if (this.lightnessMouse && this.has_moused_moved) {
                this.lightnessUp(event);
                this.$scope.$apply();
                this.onChange(event);
                // mouse event on opacity slider
            } else if (this.opacityMouse && this.has_moused_moved) {
                this.opacityUp(event);
                this.$scope.$apply();
                this.onChange(event);
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            // mouse event on color grid
            if (this.colorMouse) {
                this.has_moused_moved = true;
                this.colorChange(event);
                this.$scope.$apply();
                // mouse event on hue slider
            } else if (this.hueMouse) {
                this.has_moused_moved = true;
                this.hueChange(event);
                this.$scope.$apply();
                // mouse event on saturation slider
            } else if (this.saturationMouse) {
                this.has_moused_moved = true;
                this.saturationChange(event);
                this.$scope.$apply();
                // mouse event on lightness slider
            } else if (this.lightnessMouse) {
                this.has_moused_moved = true;
                this.lightnessChange(event);
                this.$scope.$apply();
                // mouse event on opacity slider
            } else if (this.opacityMouse) {
                this.has_moused_moved = true;
                this.opacityChange(event);
                this.$scope.$apply();
            }
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(event) {
            // escape key
            if (this.options.hide.escape && event.keyCode === 27) {
                this.api.close(event);
            }
        }
    }, {
        key: 'onColorClick',
        value: function onColorClick(event) {
            if (!this.options.disabled && !this.has_moused_moved) {
                this.colorChange(event);
                this.colorUp(event);
                this.$scope.$apply();
                this.onChange(event);
            }
        }
    }, {
        key: 'onHueClick',
        value: function onHueClick(event) {
            if (!this.options.disabled && !this.has_moused_moved) {
                this.hueChange(event);
                this.hueUp(event);
                this.$scope.$apply();
                this.onChange(event);
            }
        }
    }, {
        key: 'onSaturationClick',
        value: function onSaturationClick(event) {
            if (!this.options.disabled && !this.has_moused_moved) {
                this.saturationChange(event);
                this.saturationUp(event);
                this.$scope.$apply();
                this.onChange(event);
            }
        }
    }, {
        key: 'onLightnessClick',
        value: function onLightnessClick(event) {
            if (!this.options.disabled && !this.has_moused_moved) {
                this.lightnessChange(event);
                this.lightnessUp(event);
                this.$scope.$apply();
                this.onChange(event);
            }
        }
    }, {
        key: 'onOpacityClick',
        value: function onOpacityClick(event) {
            if (!this.options.disabled && !this.has_moused_moved) {
                this.opacityChange(event);
                this.opacityUp(event);
                this.$scope.$apply();
                this.onChange(event);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            // don't fire if it hasn't actually changed
            if (this.ngModel !== this.onChangeValue) {
                this.onChangeValue = this.ngModel;

                this.eventApiDispatch('onChange', [event]);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            if (this.ngModel !== this.onChangeValue) {
                this.updateModel = true;
                this.update();
            }

            this.$scope.control[0].$setTouched();

            this.eventApiDispatch('onBlur', [event]);

            // if clicking outside the color picker
            if (this.options.hide.blur && this.find(event.relatedTarget).length === 0) {
                this.api.close(event);
            }
        }
    }, {
        key: 'initConfig',
        value: function initConfig() {
            if (!this.options) {
                this.options = {};
            }

            this.mergeOptions(this.options, this.ColorPickerOptions);

            this.is_open = this.options.inline;

            if (this.options.inline) {
                this.options.close.show = false;
            }
        }
    }, {
        key: 'mergeOptions',
        value: function mergeOptions(options, defaultOptions) {
            for (var attr in defaultOptions) {
                if (defaultOptions.hasOwnProperty(attr)) {
                    if (!options || !options.hasOwnProperty(attr)) {
                        options[attr] = defaultOptions[attr];
                    } else if (_typeof(defaultOptions[attr]) === 'object') {
                        this.mergeOptions(options[attr], defaultOptions[attr]);
                    }
                }
            }
        }
    }, {
        key: 'onSwatchClick',
        value: function onSwatchClick($event) {
            if (this.options.show.swatch) {
                this.api.open($event);
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus($event) {
            if (this.options.show.focus) {
                this.api.open($event);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.hue === undefined || this.saturation === undefined || this.lightness === undefined) {
                return false;
            }

            var color;

            if (this.options.round) {
                color = tinycolor({ h: this.hue, s: this.saturation + '%', l: this.lightness + '%' });
            } else {
                color = tinycolor({ h: this.hue, s: this.saturation + '%', v: this.lightness + '%' });
            }

            if (this.options.alpha) {
                color.setAlpha(this.opacity / 100);
            }

            this.swatchColor = color.toHslString();

            this.updateGridBackground(color);
            this.updateHueBackground(color);
            this.updateSaturationBackground(color);
            this.updateLightnessBackground(color);
            this.updateAlphaBackground(color);

            if (this.updateModel) {
                switch (this.options.format) {
                    case 'rgb':
                        this.ngModel = color.toRgbString();
                        break;

                    case 'hex':
                        if (this.options.case === 'lower') {
                            this.ngModel = color.toHex().toLowerCase();
                        } else {
                            this.ngModel = color.toHex().toUpperCase();
                        }
                        break;

                    case 'hex8':
                        if (this.options.case === 'lower') {
                            this.ngModel = color.toHex8().toLowerCase();
                        } else {
                            this.ngModel = color.toHex8().toUpperCase();
                        }
                        break;

                    case 'hexString':
                        if (this.options.case === 'lower') {
                            this.ngModel = color.toHexString().toLowerCase();
                        } else {
                            this.ngModel = color.toHexString().toUpperCase();
                        }
                        break;

                    case 'hex8String':
                        if (this.options.case === 'lower') {
                            this.ngModel = color.toHex8String().toLowerCase();
                        } else {
                            this.ngModel = color.toHex8String().toUpperCase();
                        }
                        break;

                    case 'hsv':
                        this.ngModel = color.toHsvString();
                        break;

                    case 'raw':
                        this.ngModel = color.clone();
                        break;

                    default:
                        this.ngModel = color.toHslString();
                        break;
                }
            }
        }
    }, {
        key: 'updateSwatchBackground',
        value: function updateSwatchBackground() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-swatch'));
            el.css({
                'background-color': this.swatchColor
            });
        }
    }, {
        key: 'huePosUpdate',
        value: function huePosUpdate() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-hue .color-picker-slider'));

            el.css({
                'top': this.sliderDimensions.height * this.huePos / 100 + 'px'
            });
        }
    }, {
        key: 'saturationPosUpdate',
        value: function saturationPosUpdate() {
            var container, el;

            if (!this.options.round) {
                el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

                el.css({
                    'left': this.pickerDimensions.width * this.saturationPos / 100 + 'px'
                });
            }

            el = angular.element(this.$element[0].querySelector('.color-picker-saturation .color-picker-slider'));

            el.css({
                'top': this.sliderDimensions.height * (100 - this.saturationPos) / 100 + 'px'
            });
        }
    }, {
        key: 'lightnessPosUpdate',
        value: function lightnessPosUpdate() {
            var container, el;

            if (!this.options.round) {
                el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

                el.css({
                    'top': this.pickerDimensions.height * this.lightnessPos / 100 + 'px'
                });
            }

            el = angular.element(this.$element[0].querySelector('.color-picker-lightness .color-picker-slider'));

            el.css({
                'top': this.sliderDimensions.height * this.lightnessPos / 100 + 'px'
            });
        }
    }, {
        key: 'opacityPosUpdate',
        value: function opacityPosUpdate() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-opacity .color-picker-slider'));

            el.css({
                'top': this.sliderDimensions.height * this.opacityPos / 100 + 'px'
            });
        }

        //---------------------------
        // hue functions
        //---------------------------

    }, {
        key: 'hueDown',
        value: function hueDown(event) {
            this.stopEvent(event);

            this.hueMouse = true;
        }
    }, {
        key: 'hueUp',
        value: function hueUp(event) {
            this.stopEvent(event);

            this.hueMouse = false;
        }
    }, {
        key: 'hueChange',
        value: function hueChange(event) {
            this.stopEvent(event);

            var el = this.find('.color-picker-hue');
            var eventPos = this.getEventPos(event);

            this.hue = Math.round((1 - (eventPos.pageY - this.offset(el).top) / el.prop('offsetHeight')) * 360);

            if (this.hue > 360) {
                this.hue = 360;
            } else if (this.hue < 0) {
                this.hue = 0;
            }
        }
    }, {
        key: 'hueUpdate',
        value: function hueUpdate() {
            if (this.hue !== undefined) {
                this.huePos = (1 - this.hue / 360) * 100;

                if (this.huePos < 0) {
                    this.huePos = 0;
                } else if (this.huePos > 100) {
                    this.huePos = 100;
                }

                if (this.options.round) {
                    this.getRoundPos();
                    this.updateRoundPos();
                }

                this.huePosUpdate();
                this.update();
            }
        }

        //---------------------------
        // saturation functions
        //---------------------------

    }, {
        key: 'saturationDown',
        value: function saturationDown(event) {
            this.stopEvent(event);

            this.saturationMouse = true;
        }
    }, {
        key: 'saturationUp',
        value: function saturationUp(event) {
            this.stopEvent(event);

            this.saturationMouse = false;
        }
    }, {
        key: 'saturationChange',
        value: function saturationChange(event) {
            this.stopEvent(event);

            var el = this.find('.color-picker-saturation');
            var eventPos = this.getEventPos(event);

            this.saturation = Math.round((1 - (eventPos.pageY - this.offset(el).top) / el.prop('offsetHeight')) * 100);

            if (this.saturation > 100) {
                this.saturation = 100;
            } else if (this.saturation < 0) {
                this.saturation = 0;
            }
        }
    }, {
        key: 'saturationUpdate',
        value: function saturationUpdate() {
            if (this.saturation !== undefined) {
                if (this.options.round) {
                    this.getRoundPos();
                    this.updateRoundPos();
                }

                this.saturationPos = this.saturation;

                if (this.saturationPos < 0) {
                    this.saturationPos = 0;
                } else if (this.saturationPos > 100) {
                    this.saturationPos = 100;
                }

                this.saturationPosUpdate();
                this.update();
            }
        }
    }, {
        key: 'updateGridBackground',
        value: function updateGridBackground(color) {
            var el = this.find('.color-picker-grid .color-picker-overlay');

            if (this.options.round) {
                var center = tinycolor({
                    h: this.hue,
                    s: 0,
                    l: this.lightness
                });

                el.css({
                    'background-color': center.toRgbString()
                });
            } else {
                var background = tinycolor({
                    h: this.hue,
                    s: 1,
                    v: 1,
                    a: 1
                });

                el.css({
                    'background-color': background.toRgbString()
                });
            }

            el.css({
                'opacity': color.getAlpha()
            });

            this.find('.color-picker-grid .color-picker-grid-inner').css({
                'opacity': color.getAlpha()
            });
        }
    }, {
        key: 'updateHueBackground',
        value: function updateHueBackground(color) {
            var el = this.find('.color-picker-hue .color-picker-overlay');

            var zero_sixths = this.getCurrentColorValue();
            var one_sixths = this.getCurrentColorValue();
            var two_sixths = this.getCurrentColorValue();
            var three_sixths = this.getCurrentColorValue();
            var four_sixths = this.getCurrentColorValue();
            var five_sixths = this.getCurrentColorValue();
            var six_sixths = this.getCurrentColorValue();

            zero_sixths.h = 0;
            one_sixths.h = 60;
            two_sixths.h = 120;
            three_sixths.h = 180;
            four_sixths.h = 240;
            five_sixths.h = 300;
            six_sixths.h = 359;

            el.css({
                'background': 'linear-gradient(to top, ' + tinycolor(zero_sixths).toRgbString() + ' 0%, ' + tinycolor(one_sixths).toRgbString() + ' 17%, ' + tinycolor(two_sixths).toRgbString() + ' 33%, ' + tinycolor(three_sixths).toRgbString() + ' 50%, ' + tinycolor(four_sixths).toRgbString() + ' 67%, ' + tinycolor(five_sixths).toRgbString() + ' 83%, ' + tinycolor(six_sixths).toRgbString() + ' 100%)'
            });
        }
    }, {
        key: 'updateSaturationBackground',
        value: function updateSaturationBackground(color) {
            var el = this.find('.color-picker-saturation .color-picker-overlay');
            var high = this.getCurrentColorValue();
            var low = this.getCurrentColorValue();

            high.s = 100;
            low.s = 0;

            el.css({
                'background': 'linear-gradient(to bottom, ' + tinycolor(high).toRgbString() + ' 0%, ' + tinycolor(low).toRgbString() + ' 100%)'
            });
        }
    }, {
        key: 'updateLightnessBackground',
        value: function updateLightnessBackground(color) {
            var el = this.find('.color-picker-lightness .color-picker-overlay');
            var bright = this.getCurrentColorValue();
            var middle = this.getCurrentColorValue();
            var dark = this.getCurrentColorValue();

            if (this.options.round) {
                bright.l = 100;
                middle.l = 50;
                dark.l = 0;
            } else {
                bright.v = 100;
                middle.v = 50;
                dark.v = 0;
            }

            el.css({
                'background': 'linear-gradient(to bottom, ' + tinycolor(bright).toRgbString() + ' 0%, ' + tinycolor(middle).toRgbString() + ' 50%, ' + tinycolor(dark).toRgbString() + ' 100%)'
            });
        }
    }, {
        key: 'updateAlphaBackground',
        value: function updateAlphaBackground(color) {
            var el = this.find('.color-picker-opacity .color-picker-overlay');
            var opaque = this.getCurrentColorValue();
            var transparent = this.getCurrentColorValue();

            opaque.a = 1;
            transparent.a = 0;

            el.css({
                'background': 'linear-gradient(to bottom, ' + tinycolor(opaque).toRgbString() + ' 0%, ' + tinycolor(transparent).toRgbString() + ' 100%)'
            });
        }

        //---------------------------
        // lightness functions
        //---------------------------

    }, {
        key: 'lightnessDown',
        value: function lightnessDown(event) {
            this.stopEvent(event);

            this.lightnessMouse = true;
        }
    }, {
        key: 'lightnessUp',
        value: function lightnessUp(event) {
            this.stopEvent(event);

            this.lightnessMouse = false;
        }
    }, {
        key: 'lightnessChange',
        value: function lightnessChange(event) {
            this.stopEvent(event);

            var el = this.find('.color-picker-lightness');
            var eventPos = this.getEventPos(event);

            this.lightness = Math.round((1 - (eventPos.pageY - this.offset(el).top) / el.prop('offsetHeight')) * 100);

            if (this.lightness > 100) {
                this.lightness = 100;
            } else if (this.lightness < 0) {
                this.lightness = 0;
            }
        }
    }, {
        key: 'lightnessUpdate',
        value: function lightnessUpdate() {
            if (this.lightness !== undefined) {
                this.lightnessPos = 100 - this.lightness;

                if (this.lightnessPos < 0) {
                    this.lightnessPos = 0;
                } else if (this.lightnessPos > 100) {
                    this.lightnessPos = 100;
                }

                this.lightnessPosUpdate();
                this.update();
            }
        }

        //---------------------------
        // opacity functions
        //---------------------------

    }, {
        key: 'opacityDown',
        value: function opacityDown(event) {
            this.stopEvent(event);

            this.opacityMouse = true;
        }
    }, {
        key: 'opacityUp',
        value: function opacityUp(event) {
            this.stopEvent(event);

            this.opacityMouse = false;
        }
    }, {
        key: 'opacityChange',
        value: function opacityChange(event) {
            this.stopEvent(event);

            var el = this.find('.color-picker-opacity');
            var eventPos = this.getEventPos(event);

            this.opacity = (1 - (eventPos.pageY - this.offset(el).top) / el.prop('offsetHeight')) * 100;

            if (this.opacity > 100) {
                this.opacity = 100;
            } else if (this.opacity < 0) {
                this.opacity = 0;
            }
        }
    }, {
        key: 'opacityUpdate',
        value: function opacityUpdate() {
            if (this.opacity !== undefined) {
                this.opacityPos = (1 - this.opacity / 100) * 100;

                if (this.opacityPos < 0) {
                    this.opacityPos = 0;
                } else if (this.opacityPos > 100) {
                    this.opacityPos = 100;
                }

                this.opacityPosUpdate();
                this.update();
            }
        }

        //---------------------------
        // color functions
        //---------------------------

    }, {
        key: 'colorDown',
        value: function colorDown(event) {
            this.stopEvent(event);

            this.colorMouse = true;
        }
    }, {
        key: 'colorUp',
        value: function colorUp(event) {
            this.stopEvent(event);

            this.colorMouse = false;
        }
    }, {
        key: 'colorChange',
        value: function colorChange(event) {
            this.stopEvent(event);

            var el = this.find('.color-picker-grid-inner');
            var eventPos = this.getEventPos(event);
            var offset = this.offset(el);

            if (this.options.round) {
                var dx = (eventPos.pageX - offset.left) * 2.0 / el.prop('offsetWidth') - 1.0;
                var dy = -((eventPos.pageY - offset.top) * 2.0 / el.prop('offsetHeight')) + 1.0;

                var tmpHue = Math.atan2(dy, dx);
                var degHue = Math.round(tmpHue * 57.29577951308233); // rad to deg
                if (degHue < 0) {
                    degHue += 360;
                }
                this.hue = degHue;

                var tmpSaturation = Math.sqrt(dx * dx + dy * dy);

                if (tmpSaturation > 1) {
                    tmpSaturation = 1;
                } else if (tmpSaturation < 0) {
                    tmpSaturation = 0;
                }

                this.saturation = tmpSaturation * 100;

                if (this.lightness === undefined) {
                    this.lightness = 50;
                }
            } else {
                this.saturation = (eventPos.pageX - offset.left) / el.prop('offsetWidth') * 100;
                this.lightness = (1 - (eventPos.pageY - offset.top) / el.prop('offsetHeight')) * 100;

                if (this.saturation > 100) {
                    this.saturation = 100;
                } else if (this.saturation < 0) {
                    this.saturation = 0;
                }

                if (this.lightness > 100) {
                    this.lightness = 100;
                } else if (this.lightness < 0) {
                    this.lightness = 0;
                }
            }
        }

        //---------------------------
        // helper functions
        //---------------------------

    }, {
        key: 'isColorValid',
        value: function isColorValid(color) {
            var isValid = color.isValid();

            if (isValid && this.options.restrictToFormat) {
                isValid = color.getFormat() === this.options.format;
            }

            if (!isValid && this.options.allowEmpty) {
                var input = color.getOriginalInput();

                if (input === undefined || input === null || input === '') {
                    isValid = true;
                }
            }

            return isValid;
        }
    }, {
        key: 'getCurrentColorValue',
        value: function getCurrentColorValue() {
            if (this.options.round) {
                return {
                    h: this.hue,
                    s: this.saturation,
                    l: this.lightness
                };
            }

            return {
                h: this.hue,
                s: this.saturation,
                v: this.lightness
            };
        }
    }, {
        key: 'checkDirty',
        value: function checkDirty(color) {
            // check dirty/pristine state
            if (this.hasOwnProperty('initialNgModel')) {
                if (color === this.initialNgModel) {
                    if (typeof this.$scope.control[0].$setPristine === 'function') {
                        this.$scope.control[0].$setPristine();
                    }
                } else {
                    if (typeof this.$scope.control[0].$setDirty === 'function') {
                        this.$scope.control[0].$setDirty();
                    }
                }
            }
        }
    }, {
        key: 'stopEvent',
        value: function stopEvent(event) {
            event.stopPropagation();
            event.preventDefault();
        }
    }, {
        key: 'getRoundPos',
        value: function getRoundPos() {
            var angle = this.hue * 0.01745329251994; // deg to rad
            var px = Math.cos(angle) * this.saturation;
            var py = -Math.sin(angle) * this.saturation;

            this.xPos = (px + 100.0) * 0.5;
            this.yPos = (py + 100.0) * 0.5;

            // because it are using percentages this can be half of 100%
            var center = 50;
            // distance of pointer from the center of the circle
            var distance = Math.pow(center - this.xPos, 2) + Math.pow(center - this.yPos, 2);
            // distance of edge of circle from the center of the circle
            var radius = Math.pow(center, 2);

            // if not inside the circle
            if (distance > radius) {
                var rads = Math.atan2(this.yPos - center, this.xPos - center);
                this.xPos = Math.cos(rads) * center + center;
                this.yPos = Math.sin(rads) * center + center;
            }
        }
    }, {
        key: 'updateRoundPos',
        value: function updateRoundPos() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

            el.css({
                left: this.pickerDimensions.width * this.xPos / 100 + 'px',
                top: this.pickerDimensions.height * this.yPos / 100 + 'px'
            });
        }
    }, {
        key: 'getEventPos',
        value: function getEventPos(event) {
            // if a touch event
            if (event.type.search('touch') === 0) {
                // if event modified by angular
                if (event.originalEvent && event.originalEvent.changedTouches) {
                    return event.originalEvent.changedTouches[0];
                    // if a standard js touch event
                } else if (event.changedTouches) {
                    return event.changedTouches[0];
                }
            }

            // return a non-touch event
            return event;
        }
    }, {
        key: 'eventApiDispatch',
        value: function eventApiDispatch(name, args) {
            if (this.eventApi && typeof this.eventApi[name] === 'function') {
                if (!args) {
                    args = [];
                }

                args.unshift(this.ngModel);
                args.unshift(this.api);

                this.eventApi[name].apply(this, args);
            }
        }

        // taken and modified from jQuery's find

    }, {
        key: 'find',
        value: function find(selector) {
            var context = this.wrapper ? this.wrapper[0] : this.$element[0],
                results = [],
                nodeType;

            // Same basic safeguard as Sizzle
            if (!selector) {
                return results;
            }

            if (typeof selector === 'string') {
                // Early return if context is not an element or document
                if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                    return [];
                }

                results = context.querySelectorAll(selector);
            } else {
                if (context.contains(selector)) {
                    results.push(selector);
                }
            }

            return angular.element(results);
        }

        // taken and modified from jQuery's offset

    }, {
        key: 'offset',
        value: function offset(el) {
            var docElem,
                win,
                rect,
                doc,
                elem = el[0];

            if (!elem) {
                return;
            }

            // Support: IE<=11+
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if (!elem.getClientRects().length) {
                return { top: 0, left: 0 };
            }

            rect = elem.getBoundingClientRect();

            // Make sure element is not hidden (display: none)
            if (rect.width || rect.height) {
                doc = elem.ownerDocument;
                win = doc !== null && doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
                docElem = doc.documentElement;

                // hack for small chrome screens not position the clicks properly when the page is scrolled
                if (this.chrome && this.android_version < 6 && screen.width <= 768) {
                    return {
                        top: rect.top - docElem.clientTop,
                        left: rect.left - docElem.clientLeft
                    };
                }

                return {
                    top: rect.top + win.pageYOffset - docElem.clientTop,
                    left: rect.left + win.pageXOffset - docElem.clientLeft
                };
            }

            return rect;
        }
    }]);
    return AngularColorPickerController;
}();

AngularColorPickerController.$inject = ['$scope', '$element', '$document', '$timeout', 'ColorPickerOptions'];

function colorPickerDirective() {
    return {
        restrict: 'E',
        require: ['^ngModel'],
        scope: {
            ngModel: '=',
            options: '=?',
            api: '=?',
            eventApi: '=?'
        },
        bindToController: true,
        templateUrl: 'template/color-picker/directive.html',
        controller: AngularColorPickerController,
        controllerAs: 'AngularColorPickerController',
        link: function link($scope, element, attrs, control) {
            $scope.control = control;
            $scope.init();
        }
    };
}

function template($templateCache) {
    $templateCache.put('template/color-picker/directive.html', '<div class="color-picker-wrapper" ng-class="{' + '\'color-picker-disabled\': AngularColorPickerController.options.disabled,' + '\'color-picker-swatch-only\': AngularColorPickerController.options.swatchOnly,' + '\'color-picker-open\': AngularColorPickerController.is_open,' + '\'color-picker-closed\': !AngularColorPickerController.is_open,' + '}">' + '<div class="color-picker-input-wrapper" ng-class="{\'input-group\': AngularColorPickerController.options.swatchBootstrap && AngularColorPickerController.options.swatch}">' + '<span ng-if="AngularColorPickerController.options.swatchPos === \'left\'" class="color-picker-swatch" ng-click="AngularColorPickerController.onSwatchClick($event)" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>' + '<input ng-attr-id="{{AngularColorPickerController.options.id}}" ng-attr-name="{{AngularColorPickerController.options.name}}" class="color-picker-input {{AngularColorPickerController.options.inputClass}}" type="text" ng-model="AngularColorPickerController.ngModel" ng-readonly="AngularColorPickerController.options.swatchOnly" ng-disabled="AngularColorPickerController.options.disabled" ng-change="AngularColorPickerController.onChange($event)" size="7" ng-class="{\'color-picker-input-swatch\': AngularColorPickerController.options.swatch && !AngularColorPickerController.options.swatchOnly && AngularColorPickerController.options.swatchPos === \'left\'}" placeholder="{{AngularColorPickerController.options.placeholder}}" ng-required="AngularColorPickerController.options.required">' + '<span ng-if="AngularColorPickerController.options.swatchPos === \'right\'" class="color-picker-swatch" ng-click="AngularColorPickerController.onSwatchClick($event)" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>' + '</div>' + '<div class="color-picker-panel" ng-class="{' + '\'color-picker-panel-top color-picker-panel-right\': AngularColorPickerController.options.pos === \'top right\',' + '\'color-picker-panel-top color-picker-panel-left\': AngularColorPickerController.options.pos === \'top left\',' + '\'color-picker-panel-bottom color-picker-panel-right\': AngularColorPickerController.options.pos === \'bottom right\',' + '\'color-picker-panel-bottom color-picker-panel-left\': AngularColorPickerController.options.pos === \'bottom left\',' + '\'color-picker-panel-round\': AngularColorPickerController.options.round,' + '\'color-picker-show-hue\': AngularColorPickerController.options.hue,' + '\'color-picker-show-saturation\': AngularColorPickerController.options.saturation,' + '\'color-picker-show-lightness\': AngularColorPickerController.options.lightness,' + '\'color-picker-show-alpha\': AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\',' + '\'color-picker-show-inline\': AngularColorPickerController.options.inline,' + '}">' + '<div class="color-picker-grid-wrapper">' + '<div class="color-picker-row">' + '<div class="color-picker-grid">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-grid-inner"></div>' + '<div class="color-picker-picker">' + '<div></div>' + '</div>' + '</div>' + '<div class="color-picker-hue" ng-show="AngularColorPickerController.options.hue">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '<div class="color-picker-saturation" ng-show="AngularColorPickerController.options.saturation">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '<div class="color-picker-lightness" ng-show="AngularColorPickerController.options.lightness">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '<div class="color-picker-opacity" ng-show="AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\'">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '</div>' + '</div>' + '<div class="color-picker-actions">' + '<button ' + 'type="button"' + 'class="color-picker-action color-picker-action-clear"' + 'tabindex="-1"' + 'ng-class="AngularColorPickerController.options.clear.class"' + 'ng-show="AngularColorPickerController.options.clear.show"' + 'ng-click="AngularColorPickerController.api.clear($event)"' + '>' + '{{AngularColorPickerController.options.clear.label}}' + '</button>' + '<button ' + 'type="button"' + 'class="color-picker-action color-picker-action-reset"' + 'tabindex="-1"' + 'ng-class="AngularColorPickerController.options.reset.class"' + 'ng-show="AngularColorPickerController.options.reset.show"' + 'ng-click="AngularColorPickerController.api.reset($event)"' + '>' + '{{AngularColorPickerController.options.reset.label}}' + '</button>' + '<button ' + 'type="button"' + 'class="color-picker-action color-picker-action-close"' + 'tabindex="-1"' + 'ng-class="AngularColorPickerController.options.close.class"' + 'ng-show="AngularColorPickerController.options.close.show"' + 'ng-click="AngularColorPickerController.api.close($event)"' + '>' + '{{AngularColorPickerController.options.close.label}}' + '</button>' + '</div>' + '</div>' + '</div>');
}

template.$inject = ['$templateCache'];

var AngularColorPickerOptions = function AngularColorPickerOptions() {
    classCallCheck(this, AngularColorPickerOptions);

    return {
        // input attributes
        id: undefined,
        name: undefined,
        required: false,
        disabled: false,
        placeholder: '',
        inputClass: '',
        // validation
        restrictToFormat: false,
        allowEmpty: false,
        // color
        format: 'hsl',
        case: 'upper',
        hue: true,
        saturation: false,
        lightness: false,
        alpha: true,
        // picker
        round: false,
        pos: 'bottom left',
        inline: false,
        // swatch
        swatch: true,
        swatchOnly: false,
        swatchPos: 'left',
        swatchBootstrap: true,
        // show/hide events
        show: {
            swatch: true,
            focus: true
        },
        hide: {
            blur: true,
            escape: true,
            click: true
        },
        // buttons
        close: {
            show: false,
            label: 'Close',
            class: ''
        },
        clear: {
            show: false,
            label: 'Clear',
            class: ''
        },
        reset: {
            show: false,
            label: 'Reset',
            class: ''
        }
    };
};

var colorPicker = angular.module('color.picker', []).service('ColorPickerOptions', AngularColorPickerOptions).directive('colorPicker', colorPickerDirective).run(template);

return colorPicker;

})));
