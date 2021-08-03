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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch);
    global.progressIndicator = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);

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

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };

  var ProgressIndicator = /*#__PURE__*/function (_mixin) {
    _inherits(ProgressIndicator, _mixin);

    var _super = _createSuper(ProgressIndicator);
    /**
     * ProgressIndicator.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element representing the ProgressIndicator.
     * @param {object} [options] The component options.
     * @property {string} [options.selectorStepElement] The CSS selector to find step elements.
     * @property {string} [options.selectorCurrent] The CSS selector to find the current step element.
     * @property {string} [options.selectorIncomplete] The CSS class to find incomplete step elements.
     * @property {string} [options.selectorComplete] The CSS selector to find completed step elements.
     * @property {string} [options.classStep] The className for a step element.
     * @property {string} [options.classComplete] The className for a completed step element.
     * @property {string} [options.classCurrent] The className for the current step element.
     * @property {string} [options.classIncomplete] The className for a incomplete step element.
     */


    /**
     * ProgressIndicator.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element representing the ProgressIndicator.
     * @param {object} [options] The component options.
     * @property {string} [options.selectorStepElement] The CSS selector to find step elements.
     * @property {string} [options.selectorCurrent] The CSS selector to find the current step element.
     * @property {string} [options.selectorIncomplete] The CSS class to find incomplete step elements.
     * @property {string} [options.selectorComplete] The CSS selector to find completed step elements.
     * @property {string} [options.classStep] The className for a step element.
     * @property {string} [options.classComplete] The className for a completed step element.
     * @property {string} [options.classCurrent] The className for the current step element.
     * @property {string} [options.classIncomplete] The className for a incomplete step element.
     */
    function ProgressIndicator(element, options) {
      var _this;

      _classCallCheck(this, ProgressIndicator);

      _this = _super.call(this, element, options);
      /**
       * The component state.
       * @type {object}
       */

      /**
       * The component state.
       * @type {object}
       */
      _this.state = {
        /**
         * The current step index.
         * @type {number}
         */
        currentIndex: _this.getCurrent().index,

        /**
         * Total number of steps.
         * @type {number}
         */
        totalSteps: _this.getSteps().length
      };

      _this.addOverflowTooltip();

      return _this;
    }
    /**
     * Returns all steps with details about element and index.
     */


    /**
     * Returns all steps with details about element and index.
     */
    _createClass(ProgressIndicator, [{
      key: "getSteps",
      value: function getSteps() {
        return toArray(this.element.querySelectorAll(this.options.selectorStepElement)).map(function (element, index) {
          return {
            element: element,
            index: index
          };
        });
      }
      /**
       * Returns current step; gives detail about element and index.
       */

    }, {
      key: "getCurrent",
      value: function getCurrent() {
        var currentEl = this.element.querySelector(this.options.selectorCurrent);
        return this.getSteps().filter(function (step) {
          return step.element === currentEl;
        })[0];
      }
      /**
       * Sets the current step.
       * * @param {Number} new step index or use default in `this.state.currentIndex`.
       */

    }, {
      key: "setCurrent",
      value: function setCurrent() {
        var _this2 = this;

        var newCurrentStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentIndex;
        var changed = false;

        if (newCurrentStep !== this.state.currentIndex) {
          this.state.currentIndex = newCurrentStep;
          changed = true;
        }

        if (changed) {
          this.getSteps().forEach(function (step) {
            if (step.index < newCurrentStep) {
              _this2._updateStep({
                element: step.element,
                className: _this2.options.classComplete,
                html: _this2._getSVGComplete()
              });
            }

            if (step.index === newCurrentStep) {
              _this2._updateStep({
                element: step.element,
                className: _this2.options.classCurrent,
                html: _this2._getCurrentSVG()
              });
            }

            if (step.index > newCurrentStep) {
              _this2._updateStep({
                element: step.element,
                className: _this2.options.classIncomplete,
                html: _this2._getIncompleteSVG()
              });
            }
          });
        }
      }
      /**
       * Update step with correct inline SVG and className
       * @param {object} args
       * @param {object} [args.element] target element
       * @param {object} [args.className] new className
       * @param {object} [args.html] new inline SVG to insert
       */

    }, {
      key: "_updateStep",
      value: function _updateStep(args) {
        var element = args.element,
            className = args.className,
            html = args.html;

        if (element.firstElementChild) {
          element.removeChild(element.firstElementChild);
        }

        if (!element.classList.contains(className)) {
          element.setAttribute('class', this.options.classStep);
          element.classList.add(className);
        }

        element.insertAdjacentHTML('afterbegin', html);
      }
      /**
       * Returns HTML string for an SVG used to represent a compelted step (checkmark)
       */

    }, {
      key: "_getSVGComplete",
      value: function _getSVGComplete() {
        return "<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n        <circle cx=\"12\" cy=\"12\" r=\"12\"></circle>\n        <polygon points=\"10.3 13.6 7.7 11 6.3 12.4 10.3 16.4 17.8 9 16.4 7.6\"></polygon>\n      </svg>";
      }
      /**
       * Returns HTML string for an SVG used to represent current step (circles, like a radio button, but not.)
       */

    }, {
      key: "_getCurrentSVG",
      value: function _getCurrentSVG() {
        return "<svg>\n        <circle cx=\"12\" cy=\"12\" r=\"12\"></circle>\n        <circle cx=\"12\" cy=\"12\" r=\"6\"></circle>\n      </svg>";
      }
      /**
       * Returns HTML string for an SVG used to represent incomple step (grey empty circle)
       */

    }, {
      key: "_getIncompleteSVG",
      value: function _getIncompleteSVG() {
        return "<svg>\n        <circle cx=\"12\" cy=\"12\" r=\"12\"></circle>\n      </svg>";
      }
    }, {
      key: "addOverflowTooltip",
      value: function addOverflowTooltip() {
        var _this3 = this;

        var stepLabels = toArray(this.element.querySelectorAll(this.options.selectorLabel));
        var tooltips = toArray(this.element.querySelectorAll(this.options.selectorTooltip));
        stepLabels.forEach(function (step) {
          if (step.scrollWidth > _this3.options.maxWidth) {
            step.classList.add(_this3.options.classOverflowLabel);
          }
        });
        tooltips.forEach(function (tooltip) {
          var childText = tooltip.querySelector(_this3.options.selectorTooltipText);

          if (childText.scrollHeight > _this3.options.tooltipMaxHeight) {
            tooltip.classList.add(_this3.options.classTooltipMulti);
          }
        });
      }
    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * {@linkcode ProgressIndicator.create .create()}, or {@linkcode ProgressIndicator.init .init()},
       * properties in this object are overriden for the instance being created.
       * @member ProgressIndicator.options
       * @type {object}
       * @property {string} selectorInit The CSS selector to find content switcher button set.
       * @property {string} [selectorStepElement] The CSS selector to find step elements.
       * @property {string} [selectorCurrent] The CSS selector to find the current step element.
       * @property {string} [selectorIncomplete] The CSS class to find incomplete step elements.
       * @property {string} [selectorComplete] The CSS selector to find completed step elements.
       * @property {string} [classStep] The className for a step element.
       * @property {string} [classComplete] The className for a completed step element.
       * @property {string} [classCurrent] The className for the current step element.
       * @property {string} [classIncomplete] The className for a incomplete step element.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-progress]',
          selectorStepElement: ".".concat(prefix, "--progress-step"),
          selectorCurrent: ".".concat(prefix, "--progress-step--current"),
          selectorIncomplete: ".".concat(prefix, "--progress-step--incomplete"),
          selectorComplete: ".".concat(prefix, "--progress-step--complete"),
          selectorLabel: ".".concat(prefix, "--progress-label"),
          selectorTooltip: ".".concat(prefix, "--tooltip"),
          selectorTooltipText: ".".concat(prefix, "--tooltip__text"),
          classStep: "".concat(prefix, "--progress-step"),
          classComplete: "".concat(prefix, "--progress-step--complete"),
          classCurrent: "".concat(prefix, "--progress-step--current"),
          classIncomplete: "".concat(prefix, "--progress-step--incomplete"),
          classOverflowLabel: "".concat(prefix, "--progress-label-overflow"),
          classTooltipMulti: "".concat(prefix, "--tooltip_multi"),
          maxWidth: 87,
          tooltipMaxHeight: 21
        };
      }
    }]);

    ProgressIndicator.components = new WeakMap();
    return ProgressIndicator;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default));

  var _default = ProgressIndicator;
  _exports.default = _default;
});