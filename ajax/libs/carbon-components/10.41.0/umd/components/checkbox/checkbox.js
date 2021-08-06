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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.on);
    global.checkbox = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
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

  var stateChangeTypes = {
    true: 'true',
    false: 'false',
    mixed: 'mixed'
  };

  var Checkbox = /*#__PURE__*/function (_mixin) {
    _inherits(Checkbox, _mixin);

    var _super = _createSuper(Checkbox);
    /**
     * Checkbox UI.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a checkbox UI.
     */


    /**
     * Checkbox UI.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a checkbox UI.
     */
    function Checkbox(element, options) {
      var _this;

      _classCallCheck(this, Checkbox);

      _this = _super.call(this, element, options);

      _this.manage((0, _on.default)(_this.element, 'click', function (event) {
        _this._handleClick(event);
      }));

      _this.manage((0, _on.default)(_this.element, 'focus', function (event) {
        _this._handleFocus(event);
      }));

      _this.manage((0, _on.default)(_this.element, 'blur', function (event) {
        _this._handleBlur(event);
      }));

      _this._indeterminateCheckbox();

      _this._initCheckbox();

      return _this;
    }

    _createClass(Checkbox, [{
      key: "_handleClick",
      value: function _handleClick() {
        if (this.element.checked === true) {
          this.element.setAttribute('checked', '');
          this.element.setAttribute('aria-checked', 'true');
          this.element.checked = true; // nested checkboxes inside labels

          // nested checkboxes inside labels
          if (this.element.parentElement.classList.contains(this.options.classLabel)) {
            this.element.parentElement.setAttribute(this.options.attribContainedCheckboxState, 'true');
          }
        } else if (this.element.checked === false) {
          this.element.removeAttribute('checked');
          this.element.setAttribute('aria-checked', 'false');
          this.element.checked = false; // nested checkboxes inside labels

          // nested checkboxes inside labels
          if (this.element.parentElement.classList.contains(this.options.classLabel)) {
            this.element.parentElement.setAttribute(this.options.attribContainedCheckboxState, 'false');
          }
        }
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        if (this.element.parentElement.classList.contains(this.options.classLabel)) {
          this.element.parentElement.classList.add(this.options.classLabelFocused);
        }
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        if (this.element.parentElement.classList.contains(this.options.classLabel)) {
          this.element.parentElement.classList.remove(this.options.classLabelFocused);
        }
      }
      /**
       * Sets the new checkbox state.
       * @param {boolean|string} [state]
       *   The new checkbox state to set. `mixed` to put checkbox in indeterminate state.
       *   If omitted, this method simply makes the style reflect `aria-checked` attribute.
       */

    }, {
      key: "setState",
      value: function setState(state) {
        if (state === undefined || stateChangeTypes[state] === undefined) {
          throw new TypeError('setState expects a value of true, false or mixed.');
        }

        this.element.setAttribute('aria-checked', state);
        this.element.indeterminate = state === stateChangeTypes.mixed;
        this.element.checked = state === stateChangeTypes.true;
        var container = this.element.closest(this.options.selectorContainedCheckboxState);

        if (container) {
          container.setAttribute(this.options.attribContainedCheckboxState, state);
        }
      }
    }, {
      key: "setDisabled",
      value: function setDisabled(value) {
        if (value === undefined) {
          throw new TypeError('setDisabled expects a boolean value of true or false');
        }

        if (value === true) {
          this.element.setAttribute('disabled', true);
        } else if (value === false) {
          this.element.removeAttribute('disabled');
        }

        var container = this.element.closest(this.options.selectorContainedCheckboxDisabled);

        if (container) {
          container.setAttribute(this.options.attribContainedCheckboxDisabled, value);
        }
      }
    }, {
      key: "_indeterminateCheckbox",
      value: function _indeterminateCheckbox() {
        if (this.element.getAttribute('aria-checked') === 'mixed') {
          this.element.indeterminate = true;
        }

        if (this.element.indeterminate === true) {
          this.element.setAttribute('aria-checked', 'mixed');
        }

        if (this.element.parentElement.classList.contains(this.options.classLabel) && this.element.indeterminate === true) {
          this.element.parentElement.setAttribute(this.options.attribContainedCheckboxState, 'mixed');
        }
      }
    }, {
      key: "_initCheckbox",
      value: function _initCheckbox() {
        if (this.element.checked === true) {
          this.element.setAttribute('aria-checked', 'true');
        }

        if (this.element.parentElement.classList.contains(this.options.classLabel) && this.element.checked) {
          this.element.parentElement.setAttribute(this.options.attribContainedCheckboxState, 'true');
        }

        if (this.element.parentElement.classList.contains(this.options.classLabel)) {
          this.element.parentElement.setAttribute(this.options.attribContainedCheckboxDisabled, 'false');
        }

        if (this.element.parentElement.classList.contains(this.options.classLabel) && this.element.disabled) {
          this.element.parentElement.setAttribute(this.options.attribContainedCheckboxDisabled, 'true');
        }
      }
      /**
       * The map associating DOM element and copy button UI instance.
       * @member Checkbox.components
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor, {@linkcode Checkbox.create .create()}, or {@linkcode Checkbox.init .init()},
       * properties in this object are overriden for the instance being create and how {@linkcode Checkbox.init .init()} works.
       * @member Checkbox.options
       * @type {object}
       * @property {string} selectorInit The data attribute to find copy button UIs.
       * @property {string} selectorContainedCheckboxState The CSS selector to find a container of checkbox preserving checked state.
       * @property {string} selectorContainedCheckboxDisabled
       *   The CSS selector to find a container of checkbox preserving disabled state.
       * @property {string} classLabel The CSS class for the label.
       * @property {string} classLabelFocused The CSS class for the focused label.
       * @property {string} attribContainedCheckboxState The attribute name for the checked state of contained checkbox.
       * @property {string} attribContainedCheckboxDisabled The attribute name for the disabled state of contained checkbox.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: ".".concat(prefix, "--checkbox"),
          selectorContainedCheckboxState: '[data-contained-checkbox-state]',
          selectorContainedCheckboxDisabled: '[data-contained-checkbox-disabled]',
          classLabel: "".concat(prefix, "--checkbox-label"),
          classLabelFocused: "".concat(prefix, "--checkbox-label__focus"),
          attribContainedCheckboxState: 'data-contained-checkbox-state',
          attribContainedCheckboxDisabled: 'data-contained-checkbox-disabled'
        };
      }
    }]);

    Checkbox.components = new WeakMap();
    Checkbox.stateChangeTypes = stateChangeTypes;
    return Checkbox;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = Checkbox;
  _exports.default = _default;
});