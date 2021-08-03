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
    define(["exports", "./navigation-menu-panel", "../../globals/js/misc/on", "../../globals/js/settings", "../../globals/js/misc/on-focus-by-keyboard"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./navigation-menu-panel"), require("../../globals/js/misc/on"), require("../../globals/js/settings"), require("../../globals/js/misc/on-focus-by-keyboard"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.navigationMenuPanel, global.on, global.settings, global.onFocusByKeyboard);
    global.productSwitcher = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _navigationMenuPanel, _on, _settings, _onFocusByKeyboard) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _navigationMenuPanel = _interopRequireDefault(_navigationMenuPanel);
  _on = _interopRequireDefault(_on);
  _settings = _interopRequireDefault(_settings);
  _onFocusByKeyboard = _interopRequireDefault(_onFocusByKeyboard);

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

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
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

  var seq = 0;

  var ProductSwitcher = /*#__PURE__*/function (_NavigationMenuPanel) {
    _inherits(ProductSwitcher, _NavigationMenuPanel);

    var _super = _createSuper(ProductSwitcher);
    /**
     * A navigation menu.
     * @extends NavigationMenuPanel
     * @param {HTMLElement} element The element working as a selector.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorInit] The CSS class to find product
     * switchers
     * @param {string} [options.attribInitTarget] The attribute name in the
     * launcher buttons to find target product switcher
     * @param {string} [options.classProductSwitcherExpanded] The CSS class
     * for an expanded product switcher
     */


    /**
     * A navigation menu.
     * @extends NavigationMenuPanel
     * @param {HTMLElement} element The element working as a selector.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorInit] The CSS class to find product
     * switchers
     * @param {string} [options.attribInitTarget] The attribute name in the
     * launcher buttons to find target product switcher
     * @param {string} [options.classProductSwitcherExpanded] The CSS class
     * for an expanded product switcher
     */
    function ProductSwitcher(element, options) {
      var _this;

      _classCallCheck(this, ProductSwitcher);

      _this = _super.call(this, element, options);
      _this.current = '';
      _this.triggerButtonIds = new Set();

      _this._handleFocusOut = function (event) {
        if (_this.element.contains(event.relatedTarget)) {
          return;
        }

        var currentTriggerButton = _this.element.ownerDocument.getElementById(_this.current);

        if (currentTriggerButton && event.relatedTarget && !event.relatedTarget.matches(_this.options.selectorFloatingMenus)) {
          currentTriggerButton.focus();
        }
      };

      _this._handleKeyDown = function (event) {
        var isExpanded = !_this.element.hasAttribute('hidden');

        if (event.which === 27 && isExpanded) {
          var triggerButton = _this.current;

          _this.changeState(_this.constructor.SELECT_NONE);

          _this.element.ownerDocument.getElementById(triggerButton).focus();
        }
      };

      _this.createdByLauncher = function (event) {
        var isExpanded = _this.element.classList.contains(_this.options.classProductSwitcherExpanded);

        var launcher = event.delegateTarget;

        if (!launcher.id) {
          launcher.id = "__carbon-product-switcher-launcher-".concat(seq++);
        }

        var current = launcher.id;

        _this.changeState(isExpanded && _this.current === current ? _this.constructor.SELECT_NONE : current);
      };

      _this.shouldStateBeChanged = function (current) {
        return _this.current !== current;
      };

      _this._changeState = function (state, callback) {
        _this.element.classList.toggle(_this.options.classProductSwitcherExpanded, state !== _this.constructor.SELECT_NONE);

        _this.current = state;

        if (_this.current !== _this.constructor.SELECT_NONE) {
          _this.triggerButtonIds.add(_this.current);
        } // deactivate all other trigger buttons


        // deactivate all other trigger buttons
        _this.triggerButtonIds.forEach(function (id) {
          var button = _this.element.ownerDocument.getElementById(id);

          var label = button.getAttribute(_this.options.attribLabelExpand);
          button.classList.remove(_this.options.classNavigationMenuPanelHeaderActionActive);
          button.setAttribute('aria-label', label);
          button.setAttribute('title', label);
        }); // set active trigger button attributes


        // set active trigger button attributes
        var currentTriggerButton = _this.element.ownerDocument.getElementById(_this.current);

        if (currentTriggerButton) {
          var label = currentTriggerButton.getAttribute(_this.options.attribLabelCollapse);
          currentTriggerButton.classList.toggle(_this.options.classNavigationMenuPanelHeaderActionActive);
          currentTriggerButton.setAttribute('aria-label', label);
          currentTriggerButton.setAttribute('title', label);
        }

        if (state !== _this.constructor.SELECT_NONE) {
          _this.element.setAttribute('tabindex', '0');

          _this.element.focus();
        } else {
          _this.element.setAttribute('tabindex', '-1');
        }

        callback();
      };

      _this.manage((0, _on.default)(element, 'keydown', _this._handleKeyDown));

      _this.manage((0, _onFocusByKeyboard.default)(element, 'blur', _this._handleFocusOut));

      return _this;
    }
    /**
     * id of currently active trigger button
     * @type {string}
     */


    /**
     * id of currently active trigger button
     * @type {string}
     */
    _createClass(ProductSwitcher, [{
      key: "release",
      value: function release() {
        this.triggerButtonIds.clear();
        return _get(_getPrototypeOf(ProductSwitcher.prototype), "release", this).call(this);
      }
      /**
       * The map associating DOM element and ProductSwitcher instance.
       * @member ProductSwitcher.components
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * {@linkcode ProductSwitcher.create .create()}, or
       * {@linkcode ProductSwitcher.init .init()},
       * properties in this object are overriden for the instance being create and
       * how {@linkcode ProductSwitcher.init .init()} works.
       * @member ProductSwitcher.options
       * @type {object}
       * @property {string} selectorInit The CSS class to find popup navs.
       * @property {string} attribInitTarget The attribute name in the
       * launcher buttons to find target popup nav.
       * @property {string[]} initEventNames The events that the component
       * will handles
       */
      function get() {
        var prefix = _settings.default.prefix;
        return Object.assign(Object.create(_navigationMenuPanel.default.options), {
          selectorInit: '[data-product-switcher]',
          selectorFloatingMenus: "\n        .".concat(prefix, "--overflow-menu-options,\n        .").concat(prefix, "--overflow-menu-options *,\n        .").concat(prefix, "--tooltip,\n        .").concat(prefix, "--tooltip *,\n        .flatpicker-calendar,\n        .flatpicker-calendar *\n        "),
          attribInitTarget: 'data-product-switcher-target',
          classProductSwitcherExpanded: "".concat(prefix, "--panel--expanded")
        });
      }
    }]);

    ProductSwitcher.SELECT_NONE = '__carbon-product-switcher-launcher-NONE';
    ProductSwitcher.components = new WeakMap();
    return ProductSwitcher;
  }(_navigationMenuPanel.default);

  var _default = ProductSwitcher;
  _exports.default = _default;
});