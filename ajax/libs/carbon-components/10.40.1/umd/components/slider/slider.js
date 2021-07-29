function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/evented-state", "../../globals/js/mixins/handles", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/evented-state"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.handles, global.on);
    global.slider = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _handles, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _eventedState = _interopRequireDefault(_eventedState);
  _handles = _interopRequireDefault(_handles);
  _on = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var Slider = /*#__PURE__*/function (_mixin) {
    _inherits(Slider, _mixin);

    var _super = _createSuper(Slider);
    /**
     * Slider.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as an slider.
     */


    /**
     * Slider.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as an slider.
     */
    function Slider(element, options) {
      var _this;

      _classCallCheck(this, Slider);

      _this = _super.call(this, element, options);

      _this._changeState = function (state, detail, callback) {
        callback();
      };

      _this.sliderActive = false;
      _this.dragging = false;
      _this.track = _this.element.querySelector(_this.options.selectorTrack);
      _this.filledTrack = _this.element.querySelector(_this.options.selectorFilledTrack);
      _this.thumb = _this.element.querySelector(_this.options.selectorThumb);
      _this.input = _this.element.querySelector(_this.options.selectorInput);

      if (_this.element.dataset.sliderInputBox) {
        _this.boundInput = _this.element.ownerDocument.querySelector(_this.element.dataset.sliderInputBox);

        _this._updateInput();

        _this.manage((0, _on.default)(_this.boundInput, 'change', function (evt) {
          _this.setValue(evt.target.value);
        }));

        _this.manage((0, _on.default)(_this.boundInput, 'focus', function (evt) {
          evt.target.select();
        })); // workaround for safari


        // workaround for safari
        _this.manage((0, _on.default)(_this.boundInput, 'mouseup', function (evt) {
          evt.preventDefault();
        }));
      }

      _this._updatePosition();

      _this.manage((0, _on.default)(_this.thumb, 'mousedown', function () {
        _this.sliderActive = true;
      }));

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'mouseup', function () {
        _this.sliderActive = false;
      }));

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'mousemove', function (evt) {
        var disabled = _this.element.classList.contains(_this.options.classDisabled);

        if (_this.sliderActive === true && !disabled) {
          _this._updatePosition(evt);
        }
      }));

      _this.manage((0, _on.default)(_this.thumb, 'keydown', function (evt) {
        var disabled = _this.element.classList.contains(_this.options.classDisabled);

        if (!disabled) {
          _this._updatePosition(evt);
        }
      }));

      _this.manage((0, _on.default)(_this.track, 'click', function (evt) {
        var disabled = _this.element.classList.contains(_this.options.classDisabled);

        if (!disabled) {
          _this._updatePosition(evt);
        }
      }));

      return _this;
    }

    _createClass(Slider, [{
      key: "_updatePosition",
      value: function _updatePosition(evt) {
        var _this2 = this;

        var _this$_calcValue = this._calcValue(evt),
            left = _this$_calcValue.left,
            newValue = _this$_calcValue.newValue;

        if (this.dragging) {
          return;
        }

        this.dragging = true;
        requestAnimationFrame(function () {
          _this2.dragging = false;
          _this2.thumb.style.left = "".concat(left, "%");
          _this2.filledTrack.style.transform = "translate(0%, -50%) scaleX(".concat(left / 100, ")");
          _this2.input.value = newValue;

          _this2._updateInput();

          _this2.changeState('slider-value-change', {
            value: newValue
          });
        });
      }
    }, {
      key: "_calcValue",
      value: function _calcValue(evt) {
        var _this$getInputProps = this.getInputProps(),
            value = _this$getInputProps.value,
            min = _this$getInputProps.min,
            max = _this$getInputProps.max,
            step = _this$getInputProps.step;

        var range = max - min;
        var valuePercentage = (value - min) / range * 100;
        var left;
        var newValue;
        left = valuePercentage;
        newValue = value;

        if (evt) {
          var type = evt.type;

          if (type === 'keydown') {
            var direction = {
              40: -1,
              // decreasing
              37: -1,
              // decreasing
              38: 1,
              // increasing
              39: 1 // increasing

            }[evt.which];

            if (direction !== undefined) {
              var multiplier = evt.shiftKey === true ? range / step / this.options.stepMultiplier : 1;
              var stepMultiplied = step * multiplier;
              var stepSize = stepMultiplied / range * 100;
              left = valuePercentage + stepSize * direction;
              newValue = Number(value) + stepMultiplied * direction;
            }
          }

          if (type === 'mousemove' || type === 'click') {
            if (type === 'click') {
              this.element.querySelector(this.options.selectorThumb).classList.add(this.options.classThumbClicked);
            } else {
              this.element.querySelector(this.options.selectorThumb).classList.remove(this.options.classThumbClicked);
            }

            var track = this.track.getBoundingClientRect();
            var unrounded = (evt.clientX - track.left) / track.width;
            var rounded = Math.round(range * unrounded / step) * step;
            left = rounded / range * 100;
            newValue = rounded + min;
          }
        }

        if (newValue <= Number(min)) {
          left = 0;
          newValue = min;
        }

        if (newValue >= Number(max)) {
          left = 100;
          newValue = max;
        }

        return {
          left: left,
          newValue: newValue
        };
      }
    }, {
      key: "_updateInput",
      value: function _updateInput() {
        if (this.boundInput) {
          this.boundInput.value = this.input.value;
        }
      }
    }, {
      key: "getInputProps",
      value: function getInputProps() {
        var values = {
          value: Number(this.input.value),
          min: Number(this.input.min),
          max: Number(this.input.max),
          step: this.input.step ? Number(this.input.step) : 1
        };
        return values;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.input.value = value;

        this._updatePosition();
      }
    }, {
      key: "stepUp",
      value: function stepUp() {
        this.input.stepUp();

        this._updatePosition();
      }
    }, {
      key: "stepDown",
      value: function stepDown() {
        this.input.stepDown();

        this._updatePosition();
      }
      /**
       * The map associating DOM element and Slider UI instance.
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * properties in this object are overriden for the instance being created.
       * @property {string} selectorInit The CSS selector to find slider instances.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-slider]',
          selectorTrack: ".".concat(prefix, "--slider__track"),
          selectorFilledTrack: ".".concat(prefix, "--slider__filled-track"),
          selectorThumb: ".".concat(prefix, "--slider__thumb"),
          selectorInput: ".".concat(prefix, "--slider__input"),
          classDisabled: "".concat(prefix, "--slider--disabled"),
          classThumbClicked: "".concat(prefix, "--slider__thumb--clicked"),
          eventBeforeSliderValueChange: 'slider-before-value-change',
          eventAfterSliderValueChange: 'slider-after-value-change',
          stepMultiplier: 4
        };
      }
    }]);

    Slider.components = new WeakMap();
    return Slider;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _eventedState.default, _handles.default));

  var _default = Slider;
  _exports.default = _default;
});