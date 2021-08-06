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
    define(["exports", "./navigation-menu-panel", "../../globals/js/misc/on", "../../globals/js/misc/event-matches", "../../globals/js/settings"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./navigation-menu-panel"), require("../../globals/js/misc/on"), require("../../globals/js/misc/event-matches"), require("../../globals/js/settings"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.navigationMenuPanel, global.on, global.eventMatches, global.settings);
    global.navigationMenu = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _navigationMenuPanel, _on, _eventMatches, _settings) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _navigationMenuPanel = _interopRequireDefault(_navigationMenuPanel);
  _on = _interopRequireDefault(_on);
  _eventMatches = _interopRequireDefault(_eventMatches);
  _settings = _interopRequireDefault(_settings);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
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

  var NavigationMenu = /*#__PURE__*/function (_NavigationMenuPanel) {
    _inherits(NavigationMenu, _NavigationMenuPanel);

    var _super = _createSuper(NavigationMenu);
    /**
     * A navigation menu
     * @extends NavigationMenuPanel
     * @param {HTMLElement} element The element working as a selector.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorInit] The CSS class to find navigation
     * menus.
     * @param {string} [options.attribInitTarget] The attribute name in the
     * launcher buttons to find target navigation menu.
     * @param {string} [options.selectorShellNavSubmenu] The CSS selector for a
     * nav submenu
     * @param {string} [options.selectorShellNavLink] The CSS selector for a nav
     * link
     * @param {string} [options.selectorShellNavLinkCurrent] The CSS selector for
     * the current nav link
     * @param {string} [options.selectorShellNavItem] The CSS selector for a nav
     * item
     * @param {string} [options.selectorShellNavCategory] The CSS selector for a
     * nav category
     * @param {string} [options.classShellNavItemActive] The CSS class for the
     * active nav item
     * @param {string} [options.classShellNavLinkCurrent] The CSS class for the
     * current lav link
     * @param {string} [options.classShellNavCategoryExpanded] The CSS class
     * for an expanded nav category
     */


    /**
     * A navigation menu
     * @extends NavigationMenuPanel
     * @param {HTMLElement} element The element working as a selector.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorInit] The CSS class to find navigation
     * menus.
     * @param {string} [options.attribInitTarget] The attribute name in the
     * launcher buttons to find target navigation menu.
     * @param {string} [options.selectorShellNavSubmenu] The CSS selector for a
     * nav submenu
     * @param {string} [options.selectorShellNavLink] The CSS selector for a nav
     * link
     * @param {string} [options.selectorShellNavLinkCurrent] The CSS selector for
     * the current nav link
     * @param {string} [options.selectorShellNavItem] The CSS selector for a nav
     * item
     * @param {string} [options.selectorShellNavCategory] The CSS selector for a
     * nav category
     * @param {string} [options.classShellNavItemActive] The CSS class for the
     * active nav item
     * @param {string} [options.classShellNavLinkCurrent] The CSS class for the
     * current lav link
     * @param {string} [options.classShellNavCategoryExpanded] The CSS class
     * for an expanded nav category
     */
    function NavigationMenu(element, options) {
      var _this;

      _classCallCheck(this, NavigationMenu);

      _this = _super.call(this, element, options);

      _this.getCurrentNavigation = function () {
        return _this.element.ownerDocument.activeElement;
      };

      _this.navigate = function (direction) {
        var items = _toConsumableArray(_this.element.querySelectorAll(_this.options.selectorFocusableNavItems));

        var start = _this.getCurrentNavigation();

        var getNextItem = function getNextItem(old) {
          var handleUnderflow = function handleUnderflow(index, length) {
            return index + (index >= 0 ? 0 : length);
          };

          var handleOverflow = function handleOverflow(index, length) {
            return index - (index < length ? 0 : length);
          }; // `items.indexOf(old)` may be -1 (Scenario of no previous focus)


          // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
          var index = Math.max(items.indexOf(old) + direction, -1);
          return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
        };

        getNextItem(start).focus();
      };

      _this._handleKeyDown = function (event) {
        // handle Esc
        var isExpanded = !_this.element.hasAttribute('hidden');

        if (event.which === 27 && isExpanded) {
          _this.changeState('collapsed');

          if (_this.triggerButton) {
            _this.triggerButton.focus();
          }

          return;
        } // handle up/down arrow keys


        // handle up/down arrow keys
        var matchesNavSubmenu = (0, _eventMatches.default)(event, _this.options.selectorShellNavSubmenu);
        var matchesShellNavLink = (0, _eventMatches.default)(event, _this.options.selectorShellNavLink);

        if (!matchesNavSubmenu && !matchesShellNavLink) {
          return;
        }

        var navigationKeyCodes = {
          38: _this.constructor.NAVIGATE.BACKWARD,
          // up arrow
          40: _this.constructor.NAVIGATE.FORWARD // down arrow

        };
        var navigationKeyCodeMatches = navigationKeyCodes[event.which];

        if (navigationKeyCodeMatches) {
          event.preventDefault(); // prevent arrow keys from scrolling

          // prevent arrow keys from scrolling
          _this.navigate(navigationKeyCodeMatches);
        }
      };

      _this._handleFocusOut = function (event) {
        var nextTargetIsOfSelf = _this.element.contains(event.relatedTarget) || event.relatedTarget === _this.triggerButton || !event.relatedTarget;

        var oldTargetIsOfSelf = _this.element.contains(event.target);

        if (oldTargetIsOfSelf && !nextTargetIsOfSelf) {
          _this.changeState('collapsed');

          _this.triggerButton.focus();
        }
      };

      _this.changeNavSubmenuState = function (_ref) {
        var matchesNavSubmenu = _ref.matchesNavSubmenu,
            shouldBeCollapsed = _ref.shouldBeCollapsed;
        var shellNavCategory = matchesNavSubmenu.closest(_this.options.selectorShellNavCategory);

        if (!shellNavCategory) {
          return;
        }

        matchesNavSubmenu.setAttribute('aria-expanded', !shouldBeCollapsed);
        shellNavCategory.classList.toggle(_this.options.classShellNavCategoryExpanded);
        Array.prototype.forEach.call(shellNavCategory.querySelectorAll(_this.options.selectorShellNavLink), function (item) {
          item.tabIndex = !shouldBeCollapsed ? 0 : -1;
        });
      };

      _this._handleClick = function (event) {
        var matchesNavSubmenu = (0, _eventMatches.default)(event, _this.options.selectorShellNavSubmenu);
        var matchesShellNavLink = (0, _eventMatches.default)(event, _this.options.selectorShellNavLink);
        var matchesNestedShellNavLink = (0, _eventMatches.default)(event, _this.options.selectorShellNestedNavLink);

        if (!matchesNavSubmenu && !matchesShellNavLink) {
          return;
        }

        if (matchesNestedShellNavLink) {
          _toConsumableArray(_this.element.querySelectorAll(_this.options.selectorShellNavLinkCurrent)).forEach(function (el) {
            el.classList.remove(_this.options.classShellNavItemActive, _this.options.classShellNavLinkCurrent);
          });

          matchesNestedShellNavLink.closest(_this.options.selectorShellNavNestedCategory).classList.add(_this.options.classShellNavItemActive);
          return;
        }

        if (matchesNavSubmenu) {
          var isExpanded = matchesNavSubmenu.getAttribute('aria-expanded') === 'true';

          _this.changeNavSubmenuState({
            matchesNavSubmenu: matchesNavSubmenu,
            isExpanded: isExpanded
          });

          return;
        }

        if (matchesShellNavLink) {
          _toConsumableArray(_this.element.querySelectorAll(_this.options.selectorShellNavLinkCurrent)).forEach(function (el) {
            el.classList.remove(_this.options.classShellNavItemActive, _this.options.classShellNavLinkCurrent);
          });

          matchesShellNavLink.closest(_this.options.selectorShellNavItem).classList.add(_this.options.classShellNavItemActive);
        }
      };

      _this.manage((0, _on.default)(element, 'click', _this._handleClick));

      _this.manage((0, _on.default)(element, 'keydown', _this._handleKeyDown));

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'click', function (event) {
        if (!_this.element.hasAttribute('hidden') && !_this.triggerButton.contains(event.target) && !_this.element.contains(event.target)) {
          _this.changeState('collapsed');
        }
      }));

      var hasFocusOut = ('onfocusout' in window);

      _this.manage((0, _on.default)(_this.element, hasFocusOut ? 'focusout' : 'blur', _this._handleFocusOut, !hasFocusOut));

      return _this;
    }
    /**
     * @returns {Element} Currently highlighted element.
     */


    /**
     * @returns {Element} Currently highlighted element.
     */
    _createClass(NavigationMenu, null, [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * {@linkcode NavigationMenu.create .create()}, or
       * {@linkcode NavigationMenu.init .init()},
       * properties in this object are overriden for the instance being create and
       * how {@linkcode NavigationMenu.init .init()} works.
       * @member NavigationMenu.options
       * @type {object}
       * @property {string} selectorInit The CSS class to find navigation menus.
       * @property {string} attribInitTarget The attribute name in the
       * launcher buttons to find target navigation menu.
       * @property {string[]} initEventNames The events that the component
       * will handles
       */
      function get() {
        var prefix = _settings.default.prefix;
        return Object.assign(Object.create(_navigationMenuPanel.default.options), {
          selectorInit: '[data-navigation-menu]',
          attribInitTarget: 'data-navigation-menu-target',
          selectorShellNavSubmenu: ".".concat(prefix, "--navigation__category-toggle"),
          selectorShellNavLink: ".".concat(prefix, "--navigation-link"),
          selectorShellNestedNavLink: ".".concat(prefix, "--navigation__category-item > a.").concat(prefix, "--navigation-link"),
          selectorShellNavLinkCurrent: ".".concat(prefix, "--navigation-item--active,.").concat(prefix, "--navigation__category-item--active"),
          selectorFocusableNavItems: "\n        .".concat(prefix, "--navigation__category-toggle,\n        .").concat(prefix, "--navigation-item > .").concat(prefix, "--navigation-link,\n        .").concat(prefix, "--navigation-link[tabindex=\"0\"]\n      "),
          selectorShellNavItem: ".".concat(prefix, "--navigation-item"),
          selectorShellNavCategory: ".".concat(prefix, "--navigation__category"),
          selectorShellNavNestedCategory: ".".concat(prefix, "--navigation__category-item"),
          classShellNavItemActive: "".concat(prefix, "--navigation-item--active"),
          classShellNavLinkCurrent: "".concat(prefix, "--navigation__category-item--active"),
          classShellNavCategoryExpanded: "".concat(prefix, "--navigation__category--expanded")
        });
      }
      /**
       * Enum for navigating backward/forward.
       * @readonly
       * @member NavigationMenuPanel.NAVIGATE
       * @type {object}
       * @property {number} BACKWARD Navigating backward.
       * @property {number} FORWARD Navigating forward.
       */

    }]);

    NavigationMenu.components = new WeakMap();
    NavigationMenu.NAVIGATE = {
      BACKWARD: -1,
      FORWARD: 1
    };
    return NavigationMenu;
  }(_navigationMenuPanel.default);

  _exports.default = NavigationMenu;
});