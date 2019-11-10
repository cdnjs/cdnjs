/*!
 * angularjs-color-picker v2.1.1
 * https://github.com/ruhley/angular-color-picker/
 *
 * Copyright 2016 ruhley
 *
 * 2016-07-14 08:05:35
 *
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AngularjsColorPicker = factory());
}(this, function () { 'use strict';

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
      function AngularColorPickerController(_$scope, _$element, _$document, _$timeout) {
          var _this = this;

          classCallCheck(this, AngularColorPickerController);

          // set angular injected variables
          this.$scope = _$scope;
          this.$element = _$element;
          this.$document = _$document;
          this.$timeout = _$timeout;

          // browser variables
          this.chrome = Boolean(window.chrome);
          var _android_version = window.navigator.userAgent.match(/Android\s([0-9\.]*)/i);
          this.android_version = _android_version && _android_version.length > 1 ? parseFloat(_android_version[1]) : NaN;

          // needed variables
          this.onChangeValue = null;
          this.updateModel = true;

          //---------------------------
          // watchers
          //---------------------------

          // ngModel

          this.$scope.$watch('AngularColorPickerController.ngModel', this.watchNgModel.bind(this));

          // options

          this.$scope.$watch('AngularColorPickerController.options.swatchPos', this.watchSwatchPos.bind(this));

          this.$scope.$watchGroup(['AngularColorPickerController.options.format', 'AngularColorPickerController.options.alpha', 'AngularColorPickerController.options.case'], this.reInitAndUpdate.bind(this));

          this.$scope.$watchGroup(['AngularColorPickerController.options.disabled', 'AngularColorPickerController.options.swatchBootstrap', 'AngularColorPickerController.options.swatchOnly', 'AngularColorPickerController.options.swatch', 'AngularColorPickerController.options.pos', 'AngularColorPickerController.options.inline'], this.reInit.bind(this));

          // api

          this.$scope.$watch('AngularColorPickerController.api', this.watchApi.bind(this));

          // internal

          this.$scope.$watch('AngularColorPickerController.swatchColor', this.updateSwatchBackground.bind(this));

          this.$scope.$watch('AngularColorPickerController.hue', this.hueUpdate.bind(this));

          this.$scope.$watch('AngularColorPickerController.saturation', this.saturationUpdate.bind(this));

          this.$scope.$watch('AngularColorPickerController.lightness', this.lightnessUpdate.bind(this));

          this.$scope.$watch('AngularColorPickerController.opacity', this.opacityUpdate.bind(this));

          //---------------------------
          // destroy
          //---------------------------

          this.$scope.$on('$destroy', function () {
              _this.$document.off('mousedown', _this.onMouseDown);
              _this.$document.off('mouseup', _this.onMouseUp);
              _this.$document.off('mousemove', _this.onMouseMove);

              _this.eventApiDispatch('onDestroy');
          });

          //---------------------------
          // Init
          //---------------------------

          this.init();
      }

      createClass(AngularColorPickerController, [{
          key: 'watchNgModel',
          value: function watchNgModel(newValue, oldValue) {
              var _this2 = this;

              if (this.colorMouse) {
                  return;
              }

              if (newValue !== undefined && newValue !== null && newValue !== oldValue && newValue.length > 4) {
                  var color = tinycolor(newValue);

                  if (color.isValid()) {
                      var hsl = color.toHsv();

                      this.updateModel = false;

                      this.hue = hsl.h;
                      this.saturation = hsl.s * 100;
                      this.lightness = hsl.v * 100;

                      if (this.options.alpha) {
                          this.opacity = hsl.a * 100;
                      }

                      this.$timeout(function () {
                          _this2.updateModel = true;
                      });

                      this.isValid = true;
                  } else {
                      this.isValid = false;
                  }

                  this.$scope.control[0].$setValidity(this.$element.attr('name'), this.isValid);

                  if (oldValue !== undefined && typeof this.$scope.control[0].$setDirty === 'function') {
                      this.$scope.control[0].$setDirty();
                  }
              } else {
                  if (newValue === null || newValue === '') {
                      this.hue = undefined;
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
              var _this3 = this;

              if (newValue !== undefined) {
                  this.initConfig();

                  this.$timeout(function () {
                      _this3.updateSwatchBackground();
                  });
              }
          }
      }, {
          key: 'watchApi',
          value: function watchApi() {
              var _this4 = this;

              if (!this.api) {
                  this.api = {};
              }

              this.api.open = function (event) {
                  // if already visible then don't run show again
                  if (_this4.visible) {
                      return true;
                  }

                  _this4.visible = true;
                  _this4.hueMouse = false;
                  _this4.opacityMouse = false;
                  _this4.colorMouse = false;

                  // force the sliders to re-caculate their position
                  _this4.hueUpdate();
                  _this4.saturationUpdate();
                  _this4.lightnessUpdate();
                  _this4.opacityUpdate();

                  _this4.eventApiDispatch('onOpen', [event]);
              };

              this.api.close = function (event) {
                  if (!_this4.options.inline && (_this4.visible || _this4.$element[0].querySelector('.color-picker-panel').offsetParent !== null)) {

                      _this4.visible = false;
                      _this4.$scope.$apply();

                      _this4.eventApiDispatch('onClose', [event]);
                  }
              };

              this.api.getElement = function () {
                  return _this4.$element;
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
              // if no color provided
              if (this.ngModel === undefined) {
                  this.setDefaults();
              } else {
                  var color = tinycolor(this.ngModel);

                  if (color.isValid()) {
                      var hsl = color.toHsv();
                      this.hue = hsl.h;
                      this.saturation = hsl.s * 100;
                      this.lightness = hsl.v * 100;
                      this.opacity = hsl.a * 100;
                  }
              }

              // set default config settings
              this.initConfig();

              // setup mouse events
              this.$document.on('mousedown', this.onMouseDown.bind(this));
              this.$document.on('mouseup', this.onMouseUp.bind(this));
              this.$document.on('mousemove', this.onMouseMove.bind(this));

              this.find('.color-picker-grid').on('click', this.onColorClick.bind(this));
              this.find('.color-picker-hue').on('click', this.onHueClick.bind(this));
              this.find('.color-picker-opacity').on('click', this.onOpacityClick.bind(this));
          }
      }, {
          key: 'onMouseDown',
          value: function onMouseDown(event) {
              // an element in this picker
              if (!this.options.disabled && this.find(event.target).length > 0) {
                  // mouse event on color grid
                  if (event.target.classList.contains('color-picker-grid-inner') || event.target.classList.contains('color-picker-picker') || event.target.parentNode.classList.contains('color-picker-picker')) {
                      this.colorDown(event);
                      this.$scope.$apply();
                      // mouse event on hue slider
                  } else if (event.target.classList.contains('color-picker-hue') || event.target.parentNode.classList.contains('color-picker-hue')) {
                      this.hueDown(event);
                      this.$scope.$apply();
                      // mouse event on opacity slider
                  } else if (event.target.classList.contains('color-picker-opacity') || event.target.parentNode.classList.contains('color-picker-opacity')) {
                      this.opacityDown(event);
                      this.$scope.$apply();
                  }
              }
          }
      }, {
          key: 'onMouseUp',
          value: function onMouseUp(event) {
              // no current mouse events and not an element in the picker
              if (!this.colorMouse && !this.hueMouse && !this.opacityMouse && this.find(event.target).length === 0) {
                  this.api.close(event);
                  // mouse event on color grid
              } else if (this.colorMouse) {
                  this.colorUp(event);
                  this.$scope.$apply();
                  this.onChange(event);
                  // mouse event on hue slider
              } else if (this.hueMouse) {
                  this.hueUp(event);
                  this.$scope.$apply();
                  this.onChange(event);
                  // mouse event on opacity slider
              } else if (this.opacityMouse) {
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
                  this.colorChange(event);
                  this.$scope.$apply();
                  // mouse event on hue slider
              } else if (this.hueMouse) {
                  this.hueChange(event);
                  this.$scope.$apply();
                  // mouse event on opacity slider
              } else if (this.opacityMouse) {
                  this.opacityChange(event);
                  this.$scope.$apply();
              }
          }
      }, {
          key: 'onColorClick',
          value: function onColorClick(event) {
              if (!this.options.disabled) {
                  this.colorChange(event);
                  this.$scope.$apply();
                  this.onChange(event);
              }
          }
      }, {
          key: 'onHueClick',
          value: function onHueClick(event) {
              if (!this.options.disabled) {
                  this.hueChange(event);
                  this.$scope.$apply();
                  this.onChange(event);
              }
          }
      }, {
          key: 'onOpacityClick',
          value: function onOpacityClick(event) {
              if (!this.options.disabled) {
                  this.opacityChange(event);
                  this.$scope.$apply();
                  this.onChange(event);
              }
          }
      }, {
          key: 'onChange',
          value: function onChange(event) {
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

              this.eventApiDispatch('onBlur', [event]);
          }
      }, {
          key: 'initConfig',
          value: function initConfig() {
              if (!this.options) {
                  this.options = {};
              }

              this.options.disabled = this.options.disabled === undefined ? false : this.options.disabled;
              this.options.alpha = this.options.alpha === undefined ? true : this.options.alpha;
              this.options.case = this.options.case === undefined ? 'upper' : this.options.case;
              this.options.format = this.options.format === undefined ? 'hsl' : this.options.format;
              this.options.pos = this.options.pos === undefined ? 'bottom left' : this.options.pos;
              this.options.swatch = this.options.swatch === undefined ? true : this.options.swatch;
              this.options.swatchOnly = this.options.swatchOnly === undefined ? false : this.options.swatchOnly;
              this.options.swatchPos = this.options.swatchPos === undefined ? 'left' : this.options.swatchPos;
              this.options.swatchBootstrap = this.options.swatchBootstrap === undefined ? true : this.options.swatchBootstrap;
              this.options.inline = this.options.inline === undefined ? false : this.options.inline;

              this.visible = this.options.inline;
          }
      }, {
          key: 'focus',
          value: function focus() {
              this.find('.color-picker-input')[0].focus();
          }
      }, {
          key: 'setDefaults',
          value: function setDefaults() {
              if (this.hue === undefined) {
                  this.hue = 0;
              }

              if (this.saturation === undefined) {
                  this.saturation = 0;
              }

              if (this.lightness === undefined) {
                  this.lightness = 100;
              }

              if (this.opacity === undefined) {
                  this.opacity = 100;
              }
          }
      }, {
          key: 'update',
          value: function update() {
              if (this.hue === undefined && this.saturation === undefined && this.lightness === undefined) {
                  return false;
              }

              this.setDefaults();

              var color = tinycolor({ h: this.hue, s: this.saturation / 100, v: this.lightness / 100 }),
                  colorString;

              if (this.options.alpha) {
                  color.setAlpha(this.opacity / 100);
              }

              this.swatchColor = color.toHslString();

              switch (this.options.format) {
                  case 'rgb':
                      colorString = color.toRgbString();
                      break;

                  case 'hex':
                      colorString = color.toHexString();
                      if (this.options.case === 'lower') {
                          colorString = colorString.toLowerCase();
                      } else {
                          colorString = colorString.toUpperCase();
                      }
                      break;

                  case 'hex8':
                      colorString = color.toHex8String();
                      if (this.options.case === 'lower') {
                          colorString = colorString.toLowerCase();
                      } else {
                          colorString = colorString.toUpperCase();
                      }
                      break;

                  case 'hsv':
                      colorString = color.toHsvString();
                      break;

                  default:
                      colorString = color.toHslString();
                      break;
              }

              if (this.updateModel) {
                  this.ngModel = colorString;
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
              var _this5 = this;

              this.$timeout(function () {
                  var container = _this5.$element[0].querySelector('.color-picker-hue');
                  var el = angular.element(_this5.$element[0].querySelector('.color-picker-hue .color-picker-slider'));
                  var bounding = container.getBoundingClientRect();

                  el.css({
                      'top': bounding.height * _this5.huePos / 100 + 'px'
                  });
              });
          }
      }, {
          key: 'opacityPosUpdate',
          value: function opacityPosUpdate() {
              var _this6 = this;

              this.$timeout(function () {
                  var container = _this6.$element[0].querySelector('.color-picker-opacity');
                  var el = angular.element(_this6.$element[0].querySelector('.color-picker-opacity .color-picker-slider'));
                  var bounding = container.getBoundingClientRect();

                  el.css({
                      'top': bounding.height * _this6.opacityPos / 100 + 'px'
                  });
              });
          }
      }, {
          key: 'lightnessPosUpdate',
          value: function lightnessPosUpdate() {
              var _this7 = this;

              this.$timeout(function () {
                  var container = _this7.$element[0].querySelector('.color-picker-grid');
                  var el = angular.element(_this7.$element[0].querySelector('.color-picker-grid .color-picker-picker'));
                  var bounding = container.getBoundingClientRect();

                  el.css({
                      'top': bounding.height * _this7.lightnessPos / 100 + 'px'
                  });
              });
          }
      }, {
          key: 'saturationPosUpdate',
          value: function saturationPosUpdate() {
              var _this8 = this;

              this.$timeout(function () {
                  var container = _this8.$element[0].querySelector('.color-picker-grid');
                  var el = angular.element(_this8.$element[0].querySelector('.color-picker-grid .color-picker-picker'));
                  var bounding = container.getBoundingClientRect();

                  el.css({
                      'left': bounding.width * _this8.saturationPos / 100 + 'px'
                  });
              });
          }
      }, {
          key: 'gridUpdate',
          value: function gridUpdate() {
              var el = angular.element(this.$element[0].querySelector('.color-picker-grid'));

              el.css({
                  'background-color': this.grid
              });
          }

          //---------------------------
          // hue functions
          //---------------------------

      }, {
          key: 'hueDown',
          value: function hueDown(event) {
              event.stopPropagation();
              event.preventDefault();

              this.hueMouse = true;
          }
      }, {
          key: 'hueUp',
          value: function hueUp(event) {
              event.stopPropagation();
              event.preventDefault();

              this.hueMouse = false;
          }
      }, {
          key: 'hueChange',
          value: function hueChange(event) {
              event.stopPropagation();
              event.preventDefault();

              var el = this.find('.color-picker-hue');
              this.hue = (1 - (event.pageY - this.offset(el).top) / el.prop('offsetHeight')) * 360;

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
                  this.grid = tinycolor({ h: this.hue, s: 100, v: 1 }).toHslString();

                  if (this.huePos < 0) {
                      this.huePos = 0;
                  } else if (this.huePos > 100) {
                      this.huePos = 100;
                  }

                  this.huePosUpdate();
                  this.gridUpdate();
                  this.update();
              }
          }

          //---------------------------
          // opacity functions
          //---------------------------

      }, {
          key: 'opacityDown',
          value: function opacityDown(event) {
              event.stopPropagation();
              event.preventDefault();

              this.opacityMouse = true;
          }
      }, {
          key: 'opacityUp',
          value: function opacityUp(event) {
              event.stopPropagation();
              event.preventDefault();

              this.opacityMouse = false;
          }
      }, {
          key: 'opacityChange',
          value: function opacityChange(event) {
              event.stopPropagation();
              event.preventDefault();

              var el = this.find('.color-picker-opacity');
              this.opacity = (1 - (event.pageY - this.offset(el).top) / el.prop('offsetHeight')) * 100;

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
              event.stopPropagation();
              event.preventDefault();

              this.colorMouse = true;
          }
      }, {
          key: 'colorUp',
          value: function colorUp(event) {
              event.stopPropagation();
              event.preventDefault();

              this.colorMouse = false;
          }
      }, {
          key: 'colorChange',
          value: function colorChange(event) {
              event.stopPropagation();
              event.preventDefault();

              var el = this.find('.color-picker-grid-inner');
              var offset = this.offset(el);

              this.saturation = (event.pageX - offset.left) / el.prop('offsetWidth') * 100;
              this.lightness = (1 - (event.pageY - offset.top) / el.prop('offsetHeight')) * 100;

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
          key: 'saturationUpdate',
          value: function saturationUpdate(oldValue) {
              if (this.saturation !== undefined) {
                  this.saturationPos = this.saturation / 100 * 100;

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
          key: 'lightnessUpdate',
          value: function lightnessUpdate() {
              if (this.lightness !== undefined) {
                  this.lightnessPos = (1 - this.lightness / 100) * 100;

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
          // helper functions
          //---------------------------

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

  AngularColorPickerController.$inject = ['$scope', '$element', '$document', '$timeout'];

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
          }
      };
  }

  function template($templateCache) {
      $templateCache.put('template/color-picker/directive.html', '<div class="color-picker-wrapper" ng-class="{\n' + '\'color-picker-disabled\': AngularColorPickerController.options.disabled,\n' + '\'color-picker-swatch-only\': AngularColorPickerController.options.swatchOnly,\n' + '}">\n' + '   <div class="color-picker-input-wrapper" ng-class="{\'input-group\': AngularColorPickerController.options.swatchBootstrap && AngularColorPickerController.options.swatch}">\n' + '       <span ng-if="AngularColorPickerController.options.swatchPos === \'left\'" class="color-picker-swatch" ng-click="AngularColorPickerController.focus()" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>\n' + '       <input class="color-picker-input form-control" type="text" ng-model="AngularColorPickerController.ngModel" ng-readonly="AngularColorPickerController.options.swatchOnly" ng-disabled="AngularColorPickerController.options.disabled" ng-blur="AngularColorPickerController.onBlur($event)" ng-change="AngularColorPickerController.onChange($event)" size="7" ng-focus="AngularColorPickerController.api.open($event)" ng-class="{\'color-picker-input-swatch\': AngularColorPickerController.options.swatch && !AngularColorPickerController.options.swatchOnly && AngularColorPickerController.options.swatchPos === \'left\'}">\n' + '       <span ng-if="AngularColorPickerController.options.swatchPos === \'right\'" class="color-picker-swatch" ng-click="AngularColorPickerController.focus()" ng-show="AngularColorPickerController.options.swatch" ng-class="{\'color-picker-swatch-left\': AngularColorPickerController.options.swatchPos !== \'right\', \'color-picker-swatch-right\': AngularColorPickerController.options.swatchPos === \'right\', \'input-group-addon\': AngularColorPickerController.options.swatchBootstrap}"></span>\n' + '   </div>\n' + '   <div class="color-picker-panel" ng-show="AngularColorPickerController.visible" ng-class="{\n' + '       \'color-picker-panel-top color-picker-panel-right\': AngularColorPickerController.options.pos === \'top right\',\n' + '       \'color-picker-panel-top color-picker-panel-left\': AngularColorPickerController.options.pos === \'top left\',\n' + '       \'color-picker-panel-bottom color-picker-panel-right\': AngularColorPickerController.options.pos === \'bottom right\',\n' + '       \'color-picker-panel-bottom color-picker-panel-left\': AngularColorPickerController.options.pos === \'bottom left\',\n' + '       \'color-picker-show-alpha\': AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\',\n' + '       \'color-picker-show-inline\': AngularColorPickerController.options.inline,\n' + '   }">\n' + '       <div class="color-picker-row">\n' + '           <div class="color-picker-grid color-picker-sprite">\n' + '               <div class="color-picker-grid-inner"></div>\n' + '               <div class="color-picker-picker">\n' + '                   <div></div>\n' + '               </div>\n' + '           </div>\n' + '           <div class="color-picker-hue color-picker-sprite">\n' + '               <div class="color-picker-slider"></div>\n' + '           </div>\n' + '           <div class="color-picker-opacity color-picker-sprite" ng-show="AngularColorPickerController.options.alpha && AngularColorPickerController.options.format !== \'hex\'">\n' + '               <div class="color-picker-slider"></div>\n' + '           </div>\n' + '       </div>\n' + '   </div>\n' + '</div>');
  }
  template.$inject = ['$templateCache'];

  var colorPicker = angular.module('color.picker', []).directive('colorPicker', colorPickerDirective).run(template);

  return colorPicker;

}));