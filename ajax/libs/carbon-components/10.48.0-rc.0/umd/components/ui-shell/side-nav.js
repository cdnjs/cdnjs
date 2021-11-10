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
    define(["exports", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/settings", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/on", "../../globals/js/misc/event-matches"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/settings"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"), require("../../globals/js/misc/event-matches"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mixin, global.createComponent, global.settings, global.initComponentBySearch, global.handles, global.on, global.eventMatches);
    global.sideNav = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _mixin2, _createComponent, _settings, _initComponentBySearch, _handles, _on, _eventMatches) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _settings = _interopRequireDefault(_settings);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _handles = _interopRequireDefault(_handles);
  _on = _interopRequireDefault(_on);
  _eventMatches = _interopRequireDefault(_eventMatches);

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

  var prefix = _settings.default.prefix;

  var SideNav = /*#__PURE__*/function (_mixin) {
    _inherits(SideNav, _mixin);

    var _super = _createSuper(SideNav);
    /**
     * The map associating DOM element and copy button UI instance.
     * @member SideNav.components
     * @type {WeakMap}
     */

    /**
     * Side nav.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a side nav.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorSideNavToggle]
     *   The CSS selector to find the toggle button.
     * @param {string} [options.selectorSideNavSubmenu] The CSS selector to find the trigger buttons for sub nav items.
     * @param {string} [options.selectorSideNavItem] The CSS selector to find the nav items.
     * @param {string} [options.selectorSideNavLink] The CSS selector to find the interactive potions in non-nested nav items.
     * @param {string} [options.selectorSideNavLinkCurrent]
     *   The CSS selector to find the interactive potion in active non-nested nav item.
     * @param {string} [options.classSideNavExpanded] The CSS class for the expanded state.
     * @param {string} [options.classSideNavItemActive]
     *   The CSS class for the active/inactive state for nav items.
     * @param {string} [options.classSideNavLinkCurrent]
     *   The CSS class for the active/inactive state of the interactive potion in non-nested nav items.
     */


    /**
     * The map associating DOM element and copy button UI instance.
     * @member SideNav.components
     * @type {WeakMap}
     */

    /**
     * Side nav.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a side nav.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorSideNavToggle]
     *   The CSS selector to find the toggle button.
     * @param {string} [options.selectorSideNavSubmenu] The CSS selector to find the trigger buttons for sub nav items.
     * @param {string} [options.selectorSideNavItem] The CSS selector to find the nav items.
     * @param {string} [options.selectorSideNavLink] The CSS selector to find the interactive potions in non-nested nav items.
     * @param {string} [options.selectorSideNavLinkCurrent]
     *   The CSS selector to find the interactive potion in active non-nested nav item.
     * @param {string} [options.classSideNavExpanded] The CSS class for the expanded state.
     * @param {string} [options.classSideNavItemActive]
     *   The CSS class for the active/inactive state for nav items.
     * @param {string} [options.classSideNavLinkCurrent]
     *   The CSS class for the active/inactive state of the interactive potion in non-nested nav items.
     */
    function SideNav(element, options) {
      var _this;

      _classCallCheck(this, SideNav);

      _this = _super.call(this, element, options);

      _this._handleClick = function (evt) {
        var matchesToggle = (0, _eventMatches.default)(evt, _this.options.selectorSideNavToggle);
        var matchesNavSubmenu = (0, _eventMatches.default)(evt, _this.options.selectorSideNavSubmenu);
        var matchesSideNavLink = (0, _eventMatches.default)(evt, _this.options.selectorSideNavLink);

        if (!matchesToggle && !matchesNavSubmenu && !matchesSideNavLink) {
          return;
        }

        if (matchesToggle) {
          _this.changeState(!_this.isNavExpanded() ? _this.constructor.state.EXPANDED : _this.constructor.state.COLLAPSED);

          return;
        }

        if (matchesNavSubmenu) {
          var isSubmenuExpanded = matchesNavSubmenu.getAttribute('aria-expanded') === 'true';
          matchesNavSubmenu.setAttribute('aria-expanded', "".concat(!isSubmenuExpanded));
          return;
        }

        if (matchesSideNavLink) {
          _toConsumableArray(_this.element.querySelectorAll(_this.options.selectorSideNavLinkCurrent)).forEach(function (el) {
            el.classList.remove(_this.options.classSideNavItemActive, _this.options.classSideNavLinkCurrent);
            el.removeAttribute('aria-current');
          });

          matchesSideNavLink.classList.add(_this.options.classSideNavLinkCurrent);
          var closestSideNavItem = matchesSideNavLink.closest(_this.options.selectorSideNavItem);

          if (closestSideNavItem) {
            closestSideNavItem.classList.add(_this.options.classSideNavItemActive);
          }
        }
      };

      _this.manage((0, _on.default)(element, 'click', _this._handleClick));

      return _this;
    }
    /**
     * Enum for toggling side nav visibility
     * @readonly
     * @member SideNav.state
     * @type {object}
     * @property {string} EXPANDED Opening/visible
     * @property {string} COLLAPSED Closing/hidden
     */


    /**
     * Enum for toggling side nav visibility
     * @readonly
     * @member SideNav.state
     * @type {object}
     * @property {string} EXPANDED Opening/visible
     * @property {string} COLLAPSED Closing/hidden
     */
    _createClass(SideNav, [{
      key: "isNavExpanded",
      value:
      /**
       * @returns {boolean} `true` if the nav is expanded.
       */
      function isNavExpanded() {
        return this.element.classList.contains(this.options.classSideNavExpanded);
      }
      /**
       * Changes the expanded/collapsed state.
       */

    }, {
      key: "changeState",
      value: function changeState(state) {
        this.element.classList.toggle(this.options.classSideNavExpanded, state === this.constructor.state.EXPANDED);
      }
    }]);

    SideNav.components = new WeakMap();
    SideNav.state = {
      EXPANDED: 'expanded',
      COLLAPSED: 'collapsed'
    };
    SideNav.options = {
      selectorInit: '[data-side-nav]',
      selectorSideNavToggle: ".".concat(prefix, "--side-nav__toggle"),
      selectorSideNavSubmenu: ".".concat(prefix, "--side-nav__submenu"),
      selectorSideNavItem: ".".concat(prefix, "--side-nav__item"),
      selectorSideNavLink: ".".concat(prefix, "--side-nav__link"),
      selectorSideNavLinkCurrent: "[aria-current=\"page\"],.".concat(prefix, "--side-nav__link--current,.").concat(prefix, "--side-nav__item--active"),
      classSideNavExpanded: "".concat(prefix, "--side-nav--expanded"),
      classSideNavItemActive: "".concat(prefix, "--side-nav__item--active"),
      classSideNavLinkCurrent: "".concat(prefix, "--side-nav__link--current")
    };
    return SideNav;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = SideNav;
  _exports.default = _default;
});