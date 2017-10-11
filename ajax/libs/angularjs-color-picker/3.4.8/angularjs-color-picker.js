/*!
 * angularjs-color-picker v3.4.8
 * https://github.com/ruhley/angular-color-picker/
 *
 * Copyright 2017 ruhley
 *
 * 2017-10-06 09:51:57
 *
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tinycolor2')) :
	typeof define === 'function' && define.amd ? define(['tinycolor2'], factory) :
	(global.AngularjsColorPicker = factory(global.tinycolor));
}(this, (function (tinycolor) { 'use strict';

tinycolor = tinycolor && tinycolor.hasOwnProperty('default') ? tinycolor['default'] : tinycolor;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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

        // make the init function available from the $scope (for the directive link function)
        this.$scope.init = this.init.bind(this);

        // set default values
        this.ngModelOptions = {};
        this.hue = 0;
        this.saturation = undefined;
        this.lightness = undefined;
        this.opacity = undefined;

        this.basicEventTypes = ['hue', 'saturation', 'lightness', 'opacity'];
        this.fullEventTypes = ['color', 'hue', 'saturation', 'lightness', 'opacity'];
    }

    //---------------------------
    // init functions
    //---------------------------

    createClass(AngularColorPickerController, [{
        key: 'init',
        value: function init() {

            // ng model options
            if (this.$scope.control[0].$options && this.$scope.control[0].$options.$$options) {
                this.ngModelOptions = this.$scope.control[0].$options.$$options;
            }

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

            this.pickerDimensions = {
                width: 150,
                height: 150
            };

            this.sliderDimensions = {
                width: this.options.horizontal ? this.pickerDimensions.width : 20,
                height: this.options.horizontal ? 20 : this.pickerDimensions.height
            };
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

        //---------------------------
        // watcher functions
        //---------------------------

    }, {
        key: 'initWatchers',
        value: function initWatchers() {
            var _this = this;

            // ngModel

            this.$scope.$watch('AngularColorPickerController.internalNgModel', this.watchInternalNgModel.bind(this));
            this.$scope.$watch('AngularColorPickerController.ngModel', this.watchNgModel.bind(this));

            // options

            this.$scope.$watch('AngularColorPickerController.options.swatchPos', function (newValue) {
                if (newValue !== undefined) {
                    _this.initConfig();

                    _this.$timeout(function () {
                        _this.updateSwatchBackground();
                    });
                }
            });

            this.$scope.$watchGroup(['AngularColorPickerController.options.format', 'AngularColorPickerController.options.alpha', 'AngularColorPickerController.options.case', 'AngularColorPickerController.options.round', 'AngularColorPickerController.options.restrictToFormat', 'AngularColorPickerController.options.preserveInputFormat', 'AngularColorPickerController.options.allowEmpty', 'AngularColorPickerController.options.horizontal', 'AngularColorPickerController.options.dynamicHue', 'AngularColorPickerController.options.dynamicSaturation', 'AngularColorPickerController.options.dynamicLightness', 'AngularColorPickerController.options.dynamicAlpha'], function (newValue) {
                if (newValue !== undefined) {
                    _this.initConfig();
                    _this.update();
                }
            });

            this.$scope.$watchGroup(['AngularColorPickerController.options.disabled', 'AngularColorPickerController.options.swatchBootstrap', 'AngularColorPickerController.options.swatchOnly', 'AngularColorPickerController.options.swatch', 'AngularColorPickerController.options.pos', 'AngularColorPickerController.options.inline', 'AngularColorPickerController.options.placeholder'], function (newValue) {
                if (newValue !== undefined) {
                    _this.initConfig();
                }
            });

            // api

            this.$scope.$watch('AngularColorPickerController.api', this.setupApi.bind(this));

            // internal

            this.$scope.$watch('AngularColorPickerController.swatchColor', this.updateSwatchBackground.bind(this));

            this.$scope.$watch('AngularColorPickerController.hue', function () {
                _this.valueUpdate('hue');
            });

            this.$scope.$watch('AngularColorPickerController.saturation', function () {
                _this.valueUpdate('saturation');
            });

            this.$scope.$watch('AngularColorPickerController.lightness', function () {
                _this.valueUpdate('lightness');
            });

            this.$scope.$watch('AngularColorPickerController.opacity', function () {
                _this.valueUpdate('opacity');
            });
        }
    }, {
        key: 'watchInternalNgModel',
        value: function watchInternalNgModel(newValue, oldValue) {
            // the mouse is still moving so don't do anything yet
            if (this.colorMouse) {
                return;
            }

            // calculate and set color values
            this.watchNgModelSet(newValue);
        }

        /** Triggered on change to internal or external ngModel value */

    }, {
        key: 'watchNgModel',
        value: function watchNgModel(newValue, oldValue) {
            // set initial value if not already set
            if (newValue !== undefined && !this.hasOwnProperty('initialNgModel')) {
                this.initialNgModel = newValue;
            }

            // sets the field to pristine or dirty for angular
            this.checkDirty(newValue);

            // update the internal model from external model
            this.internalNgModel = this.ngModelOptions.getterSetter ? this.ngModel() : this.ngModel;

            // the mouse is still moving so don't do anything yet
            if (this.colorMouse) {
                return;
            }

            // calculate and set color values
            this.watchNgModelSet(newValue);
        }

        /** Helper for watchNgModel to set internal values and validity */

    }, {
        key: 'watchNgModelSet',
        value: function watchNgModelSet(newValue) {
            var _this2 = this;

            if (newValue !== undefined && newValue !== null) {
                var color = tinycolor(newValue);
                var isValid = this.isColorValid(color);

                if (isValid) {
                    this.setColorValue(color);

                    this.updateModel = false;

                    this.$timeout(function () {
                        _this2.updateModel = true;
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

        //---------------------------
        // mouse/touch event functions
        //---------------------------

    }, {
        key: 'initMouseEvents',
        value: function initMouseEvents() {
            var _this3 = this;

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
            this.find('.color-picker-grid').on('click', function (event) {
                _this3.onClick('color', event);
            });
            this.find('.color-picker-grid').on('touchend', function (event) {
                _this3.onClick('color', event);
            });

            // hue click
            this.find('.color-picker-hue').on('click', function (event) {
                _this3.onClick('hue', event);
            });
            this.find('.color-picker-hue').on('touchend', function (event) {
                _this3.onClick('hue', event);
            });

            // saturation click
            this.find('.color-picker-saturation').on('click', function (event) {
                _this3.onClick('saturation', event);
            });
            this.find('.color-picker-saturation').on('touchend', function (event) {
                _this3.onClick('saturation', event);
            });

            // lightness click
            this.find('.color-picker-lightness').on('click', function (event) {
                _this3.onClick('lightness', event);
            });
            this.find('.color-picker-lightness').on('touchend', function (event) {
                _this3.onClick('lightness', event);
            });

            // opacity click
            this.find('.color-picker-opacity').on('click', function (event) {
                _this3.onClick('opacity', event);
            });
            this.find('.color-picker-opacity').on('touchend', function (event) {
                _this3.onClick('opacity', event);
            });

            this.find('.color-picker-input').on('focusin', this.onFocus.bind(this));
            this.find('.color-picker-input').on('focusout', this.onBlur.bind(this));

            //---------------------------
            // destroy
            //---------------------------

            this.$scope.$on('$destroy', function () {
                // remove mouse events
                _this3.$document.off('mousedown', eventHandlers.mouseDown);
                _this3.$document.off('mouseup', eventHandlers.mouseUp);
                _this3.$document.off('mousemove', eventHandlers.mouseMove);

                // remove touch events
                _this3.$document.off('touchstart', eventHandlers.mouseDown);
                _this3.$document.off('touchend', eventHandlers.mouseUp);
                _this3.$document.off('touchmove', eventHandlers.mouseMove);

                // remove key events
                _this3.$document.off('keyup', eventHandlers.keyUp);

                _this3.eventApiDispatch('onDestroy');
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

            for (var i = 0; i < this.fullEventTypes.length; i++) {
                this.onMouseDownType(this.fullEventTypes[i], event);
            }
        }
    }, {
        key: 'onMouseDownType',
        value: function onMouseDownType(type, event) {
            if (type === 'color' && (event.target.classList.contains('color-picker-grid-inner') || event.target.classList.contains('color-picker-picker') || event.target.parentNode.classList.contains('color-picker-picker'))) {
                this.mouseEventToggle(type, false, event);
            } else if (event.target.classList.contains('color-picker-' + type) || event.target.parentNode.classList.contains('color-picker-' + type)) {
                this.mouseEventToggle(type, false, event);
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            // no current mouse events and not an element in the picker
            if (!this.anyMouseEvents() && this.find(event.target).length === 0) {
                this.setupApi();
                if (this.options.hide.click) {
                    this.api.close(event);
                }
                this.$scope.$apply();
            } else {
                for (var i = 0; i < this.fullEventTypes.length; i++) {
                    this.onMouseUpType(this.fullEventTypes[i], event);
                }
            }
        }
    }, {
        key: 'onMouseUpType',
        value: function onMouseUpType(type, event) {
            if (this[type + 'Mouse'] && this.has_moused_moved) {
                this.mouseEventToggle(type, true, event);
                this.onChange(event);
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            for (var i = 0; i < this.fullEventTypes.length; i++) {
                this.onMouseMoveType(this.fullEventTypes[i], event);
            }
        }
    }, {
        key: 'onMouseMoveType',
        value: function onMouseMoveType(type, event) {
            if (this[type + 'Mouse']) {
                this.has_moused_moved = true;
                this.valueChange(type, event);
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
        key: 'onClick',
        value: function onClick(type, event) {
            if (!this.options.disabled && !this.has_moused_moved) {
                this.valueChange(type, event);
                this.mouseEventToggle(type, true, event);
                this.onChange(event);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            // don't fire if it hasn't actually changed
            if (this.internalNgModel !== this.onChangeValue) {
                this.onChangeValue = this.internalNgModel;

                this.eventApiDispatch('onChange', [event]);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            if (this.internalNgModel !== this.onChangeValue) {
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
        key: 'onSwatchClick',
        value: function onSwatchClick($event) {
            if (this.options.show.swatch && !this.options.disabled) {
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

        //---------------------------
        // api functions
        //---------------------------

        /** Sets up the external api */

    }, {
        key: 'setupApi',
        value: function setupApi() {
            var _this4 = this;

            if (!this.api) {
                this.api = {};
            }

            this.api.open = function (event) {
                // if already open then don't run show again
                if (_this4.is_open) {
                    return true;
                }

                _this4.is_open = true;
                _this4.hueMouse = false;
                _this4.opacityMouse = false;
                _this4.colorMouse = false;

                // force redraw
                _this4.$scope.$applyAsync();

                // force the sliders to re-caculate their position
                for (var i = 0; i < _this4.basicEventTypes.length; i++) {
                    _this4.valueUpdate(_this4.basicEventTypes[i]);
                }

                _this4.eventApiDispatch('onOpen', [event]);
            };

            this.api.close = function (event) {
                // check that it is not already closed
                if (!_this4.options.inline && (_this4.is_open || _this4.$element[0].querySelector('.color-picker-panel').offsetParent !== null)) {
                    _this4.is_open = false;
                    _this4.$scope.$applyAsync();

                    _this4.update();
                    _this4.eventApiDispatch('onClose', [event]);
                }
            };

            this.api.clear = function (event) {
                _this4.setNgModel(null);

                _this4.eventApiDispatch('onClear', [event]);
            };

            this.api.reset = function (event) {
                if (_this4.internalNgModel !== _this4.initialNgModel) {
                    _this4.setNgModel(_this4.initialNgModel);

                    _this4.eventApiDispatch('onReset', [event]);
                }
            };

            this.api.getElement = function () {
                return _this4.$element;
            };

            this.api.getScope = function () {
                return _this4.$scope;
            };
        }

        //---------------------------
        // model functions
        //---------------------------

        /** Sets the internal and external ngModel values */

    }, {
        key: 'setNgModel',
        value: function setNgModel(value) {
            this.internalNgModel = value;

            if (this.ngModelOptions.getterSetter) {
                this.ngModel(value);
            } else {
                this.ngModel = value;
            }
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.areAllValuesSet()) {
                return false;
            }

            var color = tinycolor(this.getColorValue());

            this.swatchColor = color.toHslString();

            this.updateGridBackground(color);
            this.updateHueBackground(color);
            this.huePosUpdate();
            this.updateSaturationBackground(color);
            this.saturationPosUpdate();
            this.updateLightnessBackground(color);
            this.lightnessPosUpdate();
            this.updateOpacityBackground(color);
            this.opacityPosUpdate();

            var skipUpdate = this.options.preserveInputFormat && tinycolor(this.internalNgModel).toHsvString() === color.toHsvString();

            if (this.updateModel && !skipUpdate) {
                var formats = {
                    rgb: 'toRgbString',
                    hex: 'toHex',
                    hex8: 'toHex8',
                    hexstring: 'toHexString',
                    hex8string: 'toHex8String',
                    hsv: 'toHsvString',
                    hsl: 'toHslString',
                    raw: 'clone'
                };

                var value = color[formats[this.options.format.toLowerCase()]]();

                if (this.options.format.match(/hex/i)) {
                    value = this.options.case === 'upper' ? value.toUpperCase() : value.toLowerCase();
                }

                this.setNgModel(value);
            }
        }

        //---------------------------
        // generic value functions
        //---------------------------

    }, {
        key: 'mouseEventToggle',
        value: function mouseEventToggle(type, up, event) {
            this.stopEvent(event);
            this[type + 'Mouse'] = !up;
            this.$scope.$apply();
        }
    }, {
        key: 'valueChange',
        value: function valueChange(type, event) {
            this.stopEvent(event);

            if (type === 'color') {
                return this.colorChange(event);
            }

            var el = this.find('.color-picker-' + type);
            var eventPos = this.getEventPos(event);
            var max = this.getMaxFromType(type);

            this[type] = this.calculateSliderPos(el, eventPos, max);

            if (this[type] > max) {
                this[type] = max;
            } else if (this[type] < 0) {
                this[type] = 0;
            }
        }
    }, {
        key: 'valueUpdate',
        value: function valueUpdate(type) {
            if (this[type] !== undefined) {
                if (type === 'saturation') {
                    this[type + 'Pos'] = this[type];
                } else {
                    var max = this.getMaxFromType(type);
                    this[type + 'Pos'] = (1 - this[type] / max) * 100;
                }

                if (this[type + 'Pos'] < 0) {
                    this[type + 'Pos'] = 0;
                } else if (this[type + 'Pos'] > 100) {
                    this[type + 'Pos'] = 100;
                }

                if (this.options.round) {
                    this.getRoundPos();
                    this.updateRoundPos();
                }

                this[type + 'PosUpdate']();
                this.update();
            }
        }

        //---------------------------
        // hue functions
        //---------------------------

    }, {
        key: 'huePosUpdate',
        value: function huePosUpdate() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-hue .color-picker-slider'));

            if (this.options.horizontal) {
                el.css({
                    'left': this.sliderDimensions.width * this.huePos / 100 + 'px',
                    'top': 0
                });
            } else {
                el.css({
                    'left': 0,
                    'top': this.sliderDimensions.height * this.huePos / 100 + 'px'
                });
            }
        }
    }, {
        key: 'updateHueBackground',
        value: function updateHueBackground(color) {
            var el = this.find('.color-picker-hue .color-picker-overlay');
            var direction = this.options.horizontal ? 'left' : 'top';

            var zero_sixths = this.getColorValue(this.options.dynamicHue);
            var one_sixths = this.getColorValue(this.options.dynamicHue);
            var two_sixths = this.getColorValue(this.options.dynamicHue);
            var three_sixths = this.getColorValue(this.options.dynamicHue);
            var four_sixths = this.getColorValue(this.options.dynamicHue);
            var five_sixths = this.getColorValue(this.options.dynamicHue);
            var six_sixths = this.getColorValue(this.options.dynamicHue);

            zero_sixths.h = 0;
            one_sixths.h = 60;
            two_sixths.h = 120;
            three_sixths.h = 180;
            four_sixths.h = 240;
            five_sixths.h = 300;
            six_sixths.h = 359;

            el.css({
                'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(zero_sixths).toRgbString() + ' 0%, ' + tinycolor(one_sixths).toRgbString() + ' 17%, ' + tinycolor(two_sixths).toRgbString() + ' 33%, ' + tinycolor(three_sixths).toRgbString() + ' 50%, ' + tinycolor(four_sixths).toRgbString() + ' 67%, ' + tinycolor(five_sixths).toRgbString() + ' 83%, ' + tinycolor(six_sixths).toRgbString() + ' 100%)'
            });
        }

        //---------------------------
        // saturation functions
        //---------------------------

    }, {
        key: 'saturationPosUpdate',
        value: function saturationPosUpdate() {
            var el;

            if (!this.options.round) {
                el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

                el.css({
                    'left': this.pickerDimensions.height * this.saturationPos / 100 + 'px'
                });
            }

            el = angular.element(this.$element[0].querySelector('.color-picker-saturation .color-picker-slider'));

            if (this.options.horizontal) {
                el.css({
                    'left': this.sliderDimensions.width * (100 - this.saturationPos) / 100 + 'px',
                    'top': 0
                });
            } else {
                el.css({
                    'left': 0,
                    'top': this.sliderDimensions.height * (100 - this.saturationPos) / 100 + 'px'
                });
            }
        }
    }, {
        key: 'updateSaturationBackground',
        value: function updateSaturationBackground(color) {
            var el = this.find('.color-picker-saturation .color-picker-overlay');
            var direction = this.options.horizontal ? 'right' : 'bottom';
            var high = this.getColorValue(this.options.dynamicSaturation);
            var low = this.getColorValue(this.options.dynamicSaturation);

            high.s = '100%';
            low.s = '0%';

            el.css({
                'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(high).toRgbString() + ' 0%, ' + tinycolor(low).toRgbString() + ' 100%)'
            });
        }

        //---------------------------
        // lightness functions
        //---------------------------

    }, {
        key: 'lightnessPosUpdate',
        value: function lightnessPosUpdate() {
            var el;

            if (!this.options.round) {
                el = angular.element(this.$element[0].querySelector('.color-picker-grid .color-picker-picker'));

                el.css({
                    'top': this.pickerDimensions.width * this.lightnessPos / 100 + 'px'
                });
            }

            el = angular.element(this.$element[0].querySelector('.color-picker-lightness .color-picker-slider'));

            if (this.options.horizontal) {
                el.css({
                    'left': this.sliderDimensions.width * this.lightnessPos / 100 + 'px',
                    'top': 0
                });
            } else {
                el.css({
                    'left': 0,
                    'top': this.sliderDimensions.height * this.lightnessPos / 100 + 'px'
                });
            }
        }
    }, {
        key: 'updateLightnessBackground',
        value: function updateLightnessBackground(color) {
            var el = this.find('.color-picker-lightness .color-picker-overlay');
            var direction = this.options.horizontal ? 'right' : 'bottom';
            var bright = this.getColorValue(this.options.dynamicLightness);
            var middle = this.getColorValue(this.options.dynamicLightness);
            var dark = this.getColorValue(this.options.dynamicLightness);

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
                'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(bright).toRgbString() + ' 0%, ' + tinycolor(middle).toRgbString() + ' 50%, ' + tinycolor(dark).toRgbString() + ' 100%)'
            });
        }

        //---------------------------
        // opacity functions
        //---------------------------

    }, {
        key: 'opacityPosUpdate',
        value: function opacityPosUpdate() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-opacity .color-picker-slider'));

            if (this.options.horizontal) {
                el.css({
                    'left': this.sliderDimensions.width * this.opacityPos / 100 + 'px',
                    'top': 0
                });
            } else {
                el.css({
                    'left': 0,
                    'top': this.sliderDimensions.height * this.opacityPos / 100 + 'px'
                });
            }
        }
    }, {
        key: 'updateOpacityBackground',
        value: function updateOpacityBackground(color) {
            var el = this.find('.color-picker-opacity .color-picker-overlay');
            var direction = this.options.horizontal ? 'right' : 'bottom';
            var opaque = this.getColorValue(this.options.dynamicAlpha);
            var transparent = this.getColorValue(this.options.dynamicAlpha);

            opaque.a = 1;
            transparent.a = 0;

            el.css({
                'background': 'linear-gradient(to ' + direction + ', ' + tinycolor(opaque).toRgbString() + ' 0%, ' + tinycolor(transparent).toRgbString() + ' 100%)'
            });
        }

        //---------------------------
        // color functions
        //---------------------------

    }, {
        key: 'colorChange',
        value: function colorChange(event) {
            this.stopEvent(event);

            var el = this.find('.color-picker-grid-inner');
            var eventPos = this.getEventPos(event);
            var offset = this.offset(el);

            if (this.options.round) {
                this.colorChangeRound(el, offset, eventPos);
            } else {
                this.colorChangeSquare(el, offset, eventPos);
            }
        }
    }, {
        key: 'colorChangeRound',
        value: function colorChangeRound(el, offset, eventPos) {
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
        }
    }, {
        key: 'colorChangeSquare',
        value: function colorChangeSquare(el, offset, eventPos) {
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
    }, {
        key: 'updateGridBackground',
        value: function updateGridBackground(color) {
            var el = this.find('.color-picker-grid .color-picker-overlay');
            var background = this.getColorValue();

            if (this.options.round) {
                background.s = '0%';
            } else {
                background.s = '100%';
                background.v = '100%';
                background.a = 1;
            }

            el.css({
                'background-color': tinycolor(background).toRgbString(),
                'opacity': color.getAlpha()
            });

            this.find('.color-picker-grid .color-picker-grid-inner').css({
                'opacity': color.getAlpha()
            });
        }
    }, {
        key: 'updateSwatchBackground',
        value: function updateSwatchBackground() {
            var el = angular.element(this.$element[0].querySelector('.color-picker-swatch'));
            el.css({
                'background-color': this.swatchColor
            });
        }

        //---------------------------
        // helper functions
        //---------------------------

    }, {
        key: 'isColorValid',
        value: function isColorValid(color) {
            var isValid = color.isValid();

            if (isValid && this.options.restrictToFormat) {
                isValid = color.getFormat() === this.getTinyColorFormat();
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
        key: 'getTinyColorFormat',
        value: function getTinyColorFormat() {
            if (this.options.format === 'hexString') {
                return 'hex';
            } else if (this.options.format === 'hex8String') {
                return 'hex8';
            }

            return this.options.format;
        }
    }, {
        key: 'areAllValuesSet',
        value: function areAllValuesSet() {
            if (this.hue === undefined || this.saturation === undefined || this.lightness === undefined) {
                return false;
            }

            return true;
        }
    }, {
        key: 'getColorValue',
        value: function getColorValue() {
            var dynamicValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var includeOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var value = {
                h: this.hue,
                s: dynamicValues ? this.saturation + '%' : '100%',
                v: dynamicValues ? this.lightness + '%' : '100%'
            };

            if (this.options.round) {
                value = {
                    h: this.hue,
                    s: dynamicValues ? this.saturation + '%' : '100%',
                    l: dynamicValues ? this.lightness + '%' : '50%'
                };
            }

            if (includeOpacity) {
                value.a = dynamicValues ? this.opacity / 100 : 1;
            }

            return value;
        }

        /* eslint-disable complexity */

    }, {
        key: 'setColorValue',
        value: function setColorValue(color) {
            var noMouseEvents = !this.anyMouseEvents();
            var hsl = this.options.round ? color.toHsl() : color.toHsv();

            if (noMouseEvents || this.hueMouse) {
                this.hue = hsl.h;
            }

            if (noMouseEvents || this.saturationMouse) {
                this.saturation = hsl.s * 100;
            }

            if (noMouseEvents || this.lightnessMouse) {
                this.lightness = (this.options.round ? hsl.l : hsl.v) * 100;
            }

            if (this.options.alpha && (noMouseEvents || this.opacityMouse)) {
                this.opacity = hsl.a * 100;
            }
        }
        /* eslint-enable complexity */

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
        key: 'calculateSliderPos',
        value: function calculateSliderPos(el, eventPos, multiplier) {
            if (this.options.horizontal) {
                return Math.round((1 - (eventPos.pageX - this.offset(el).left) / el.prop('offsetWidth')) * multiplier);
            }

            return Math.round((1 - (eventPos.pageY - this.offset(el).top) / el.prop('offsetHeight')) * multiplier);
        }
    }, {
        key: 'eventApiDispatch',
        value: function eventApiDispatch(name, args) {
            if (this.eventApi && typeof this.eventApi[name] === 'function') {
                if (!args) {
                    args = [];
                }

                args.unshift(this.internalNgModel);
                args.unshift(this.api);

                this.eventApi[name].apply(this, args);
            }
        }

        /** taken and modified from jQuery's find */

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

        /** taken and modified from jQuery's offset */

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
                return {
                    top: 0,
                    left: 0
                };
            }

            rect = elem.getBoundingClientRect();

            // Make sure element is not hidden (display: none)
            if (rect.width || rect.height) {
                doc = elem.ownerDocument;
                win = this.getWindowElements(doc);
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
    }, {
        key: 'getWindowElements',
        value: function getWindowElements(doc) {
            return doc !== null && doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
        }
    }, {
        key: 'anyMouseEvents',
        value: function anyMouseEvents() {
            return this.colorMouse || this.hueMouse || this.saturationMouse || this.lightnessMouse || this.opacityMouse;
        }
    }, {
        key: 'getMaxFromType',
        value: function getMaxFromType(type) {
            return type === 'hue' ? 360 : 100;
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
    $templateCache.put('template/color-picker/directive.html', '<div class="color-picker-wrapper" ng-class="{' + '\'color-picker-disabled\': AngularColorPickerController.options.disabled,' + '\'color-picker-swatch-only\': AngularColorPickerController.options.swatchOnly,' + '\'color-picker-open\': AngularColorPickerController.is_open,' + '\'color-picker-closed\': !AngularColorPickerController.is_open,' + '\'color-picker-horizontal\': AngularColorPickerController.options.horizontal,' + '}">' + '<div class="color-picker-input-wrapper" ng-class="{\'input-group\': AngularColorPickerController.options.swatchBootstrap && AngularColorPickerController.options.swatch}">' + '<span ng-if="AngularColorPickerController.options.swatchPos === \'left\'" class="color-picker-swatch" ng-click="AngularColorPickerController.onSwatchClick($event)" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>' + '<input ng-attr-id="{{AngularColorPickerController.options.id}}" ng-attr-name="{{AngularColorPickerController.options.name}}" class="color-picker-input {{AngularColorPickerController.options.inputClass}}" type="text" ng-model="AngularColorPickerController.internalNgModel" ng-model-options="AngularColorPickerController.ngModelOptions" ng-readonly="AngularColorPickerController.options.swatchOnly" ng-disabled="AngularColorPickerController.options.disabled" ng-change="AngularColorPickerController.onChange($event)" size="7" ng-class="{\'color-picker-input-swatch\': AngularColorPickerController.options.swatch && !AngularColorPickerController.options.swatchOnly && AngularColorPickerController.options.swatchPos === \'left\'}" placeholder="{{AngularColorPickerController.options.placeholder}}" ng-required="AngularColorPickerController.options.required">' + '<span ng-if="AngularColorPickerController.options.swatchPos === \'right\'" class="color-picker-swatch" ng-click="AngularColorPickerController.onSwatchClick($event)" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>' + '</div>' + '<div class="color-picker-panel" ng-class="{' + '\'color-picker-panel-top color-picker-panel-right\': AngularColorPickerController.options.pos === \'top right\',' + '\'color-picker-panel-top color-picker-panel-left\': AngularColorPickerController.options.pos === \'top left\',' + '\'color-picker-panel-bottom color-picker-panel-right\': AngularColorPickerController.options.pos === \'bottom right\',' + '\'color-picker-panel-bottom color-picker-panel-left\': AngularColorPickerController.options.pos === \'bottom left\',' + '\'color-picker-panel-round\': AngularColorPickerController.options.round,' + '\'color-picker-show-hue\': AngularColorPickerController.options.hue,' + '\'color-picker-show-saturation\': AngularColorPickerController.options.saturation,' + '\'color-picker-show-lightness\': AngularColorPickerController.options.lightness,' + '\'color-picker-show-alpha\': AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\',' + '\'color-picker-show-inline\': AngularColorPickerController.options.inline,' + '}">' + '<div class="color-picker-grid-wrapper">' + '<div class="color-picker-row">' + '<div class="color-picker-grid">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-grid-inner"></div>' + '<div class="color-picker-picker">' + '<div></div>' + '</div>' + '</div>' + '<div class="color-picker-hue" ng-show="AngularColorPickerController.options.hue">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '<div class="color-picker-saturation" ng-show="AngularColorPickerController.options.saturation">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '<div class="color-picker-lightness" ng-show="AngularColorPickerController.options.lightness">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '<div class="color-picker-opacity" ng-show="AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\'">' + '<div class="color-picker-overlay"></div>' + '<div class="color-picker-slider"></div>' + '</div>' + '</div>' + '</div>' + '<div class="color-picker-actions">' + '<button ' + 'type="button"' + 'class="color-picker-action color-picker-action-clear"' + 'tabindex="-1"' + 'ng-class="AngularColorPickerController.options.clear.class"' + 'ng-show="AngularColorPickerController.options.clear.show"' + 'ng-click="AngularColorPickerController.api.clear($event)"' + '>' + '{{AngularColorPickerController.options.clear.label}}' + '</button>' + '<button ' + 'type="button"' + 'class="color-picker-action color-picker-action-reset"' + 'tabindex="-1"' + 'ng-class="AngularColorPickerController.options.reset.class"' + 'ng-show="AngularColorPickerController.options.reset.show"' + 'ng-click="AngularColorPickerController.api.reset($event)"' + '>' + '{{AngularColorPickerController.options.reset.label}}' + '</button>' + '<button ' + 'type="button"' + 'class="color-picker-action color-picker-action-close"' + 'tabindex="-1"' + 'ng-class="AngularColorPickerController.options.close.class"' + 'ng-show="AngularColorPickerController.options.close.show"' + 'ng-click="AngularColorPickerController.api.close($event)"' + '>' + '{{AngularColorPickerController.options.close.label}}' + '</button>' + '</div>' + '</div>' + '</div>');
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
        preserveInputFormat: false,
        allowEmpty: false,
        // color
        format: 'hsl',
        case: 'upper',
        // sliders
        hue: true,
        saturation: false,
        lightness: false,
        alpha: true,
        dynamicHue: true,
        dynamicSaturation: true,
        dynamicLightness: true,
        dynamicAlpha: true,
        // picker
        round: false,
        pos: 'bottom left',
        inline: false,
        horizontal: false,
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
