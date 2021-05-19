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
    define(["exports", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/on", "../../globals/js/settings", "../../globals/js/misc/event-matches"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"), require("../../globals/js/settings"), require("../../globals/js/misc/event-matches"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.on, global.settings, global.eventMatches);
    global.headerSubmenu = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _mixin2, _createComponent, _initComponentBySearch, _handles, _on, _settings, _eventMatches) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _handles = _interopRequireDefault(_handles);
  _on = _interopRequireDefault(_on);
  _settings = _interopRequireDefault(_settings);
  _eventMatches = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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

  var forEach = /* #__PURE__ */function () {
    return Array.prototype.forEach;
  }();

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };

  var HeaderSubmenu = /*#__PURE__*/function (_mixin) {
    _inherits(HeaderSubmenu, _mixin);

    var _super = _createSuper(HeaderSubmenu);
    /**
     * Sub menus in header nav.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a submenu in header nav.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorTrigger] The CSS selector to find the trigger button.
     * @param {string} [options.selectorItem] The CSS selector to find the menu items.
     * @param {string} [options.attribExpanded] The attribute that represents the expanded/collapsed state.
     */


    /**
     * Sub menus in header nav.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a submenu in header nav.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorTrigger] The CSS selector to find the trigger button.
     * @param {string} [options.selectorItem] The CSS selector to find the menu items.
     * @param {string} [options.attribExpanded] The attribute that represents the expanded/collapsed state.
     */
    function HeaderSubmenu(element, options) {
      var _this;

      _classCallCheck(this, HeaderSubmenu);

      _this = _super.call(this, element, options);

      _this._getAction = function (event) {
        var isFlyoutMenu = (0, _eventMatches.default)(event, _this.options.selectorFlyoutMenu);

        if (isFlyoutMenu) {
          return _this.constructor.actions.DELEGATE_TO_FLYOUT_MENU;
        }

        switch (event.type) {
          case 'keydown':
            return {
              32: _this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS,
              // space bar
              13: _this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS,
              // enter
              27: _this.constructor.actions.CLOSE_SUBMENU // esc
              // possible arrow keys

            }[event.which];

          case 'click':
            return (0, _eventMatches.default)(event, _this.options.selectorItem) ? _this.constructor.actions.CLOSE_SUBMENU : null;

          case 'blur':
          case 'focusout':
            {
              var isOfSelf = _this.element.contains(event.relatedTarget);

              return isOfSelf ? null : _this.constructor.actions.CLOSE_SUBMENU;
            }

          case 'mouseenter':
            return _this.constructor.actions.OPEN_SUBMENU;

          case 'mouseleave':
            return _this.constructor.actions.CLOSE_SUBMENU;

          default:
            return null;
        }
      };

      _this._getNewState = function (action) {
        var trigger = _this.element.querySelector(_this.options.selectorTrigger);

        var isExpanded = trigger.getAttribute(_this.options.attribExpanded) === 'true';

        switch (action) {
          case _this.constructor.actions.CLOSE_SUBMENU:
            return false;

          case _this.constructor.actions.OPEN_SUBMENU:
            return true;

          case _this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS:
            return !isExpanded;

          default:
            return isExpanded;
        }
      };

      _this._setState = function (_ref) {
        var shouldBeExpanded = _ref.shouldBeExpanded,
            shouldFocusOnOpen = _ref.shouldFocusOnOpen;

        var trigger = _this.element.querySelector(_this.options.selectorTrigger);

        trigger.setAttribute(_this.options.attribExpanded, shouldBeExpanded);
        forEach.call(_this.element.querySelectorAll(_this.options.selectorItem), function (item) {
          item.tabIndex = shouldBeExpanded ? 0 : -1;
        }); // focus first submenu item

        // focus first submenu item
        if (shouldBeExpanded && shouldFocusOnOpen) {
          _this.element.querySelector(_this.options.selectorItem).focus();
        }
      };

      _this.getCurrentNavigation = function () {
        var focused = _this.element.ownerDocument.activeElement;
        return focused.nodeType === Node.ELEMENT_NODE && focused.matches(_this.options.selectorItem) ? focused : null;
      };

      _this.navigate = function (direction) {
        var items = toArray(_this.element.querySelectorAll(_this.options.selectorItem));

        var start = _this.getCurrentNavigation() || _this.element.querySelector(_this.options.selectorItemSelected);

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

        for (var current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
          if (!current.matches(_this.options.selectorItemHidden) && !current.parentNode.matches(_this.options.selectorItemHidden) && !current.matches(_this.options.selectorItemSelected)) {
            current.focus();
            break;
          }
        }
      };

      _this._handleEvent = function (event) {
        var trigger = _this.element.querySelector(_this.options.selectorTrigger);

        if (!trigger) {
          return;
        }

        var action = _this._getAction(event);

        if (action) {
          var shouldBeExpanded = _this._getNewState(action);

          _this._setState({
            shouldBeExpanded: shouldBeExpanded
          });
        }
      };

      _this._handleKeyDown = function (event) {
        var trigger = _this.element.querySelector(_this.options.selectorTrigger);

        if (!trigger) {
          return;
        }

        var action = _this._getAction(event);

        if (event.which === 32) {
          event.preventDefault();
        }

        switch (action) {
          case _this.constructor.actions.DELEGATE_TO_FLYOUT_MENU:
            // currently we do not have a scenario that handles flyout menu
            // handleFlyoutMenu
            break;
          // currently we do not have a scenario that opens a submenu on keydown
          // case this.constructor.actions.OPEN_SUBMENU:

          // currently we do not have a scenario that opens a submenu on keydown
          // case this.constructor.actions.OPEN_SUBMENU:
          case _this.constructor.actions.CLOSE_SUBMENU:
            {
              var shouldBeExpanded = _this._getNewState(action);

              _this._setState({
                shouldBeExpanded: shouldBeExpanded
              });

              break;
            }

          case _this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS:
            {
              var _shouldBeExpanded = _this._getNewState(action);

              _this._setState({
                shouldBeExpanded: _shouldBeExpanded,
                shouldFocusOnOpen: true
              });

              break;
            }

          default:
            {
              var expanded = trigger.getAttribute(_this.options.attribExpanded) === 'true';

              if (expanded) {
                var direction = {
                  38: _this.constructor.NAVIGATE.BACKWARD,
                  40: _this.constructor.NAVIGATE.FORWARD
                }[event.which];

                switch (event.which) {
                  case 35:
                    {
                      // end key
                      event.preventDefault(); // prevents key from scrolling page

                      // prevents key from scrolling page
                      var menuItems = _this.element.querySelectorAll(_this.options.selectorItem);

                      var lastMenuItem = menuItems[menuItems.length - 1];

                      if (lastMenuItem) {
                        lastMenuItem.focus();
                      }

                      break;
                    }

                  case 36:
                    {
                      // home key
                      event.preventDefault(); // prevents key from scrolling page

                      // prevents key from scrolling page
                      var _this$element$querySe = _this.element.querySelectorAll(_this.options.selectorItem),
                          _this$element$querySe2 = _slicedToArray(_this$element$querySe, 1),
                          firstMenuItem = _this$element$querySe2[0];

                      if (firstMenuItem) {
                        firstMenuItem.focus();
                      }

                      break;
                    }

                  case 38: // up arrow

                  // up arrow
                  case 40:
                    // down arrow
                    _this.navigate(direction);

                    event.preventDefault(); // prevents keys from scrolling page

                    // prevents keys from scrolling page
                    break;

                  default:
                    break;
                }
              }

              break;
            }
        }
      };

      var hasFocusOut = ('onfocusout' in window);

      _this.manage((0, _on.default)(_this.element, hasFocusOut ? 'focusout' : 'blur', _this._handleEvent, !hasFocusOut));

      _this.manage((0, _on.default)(_this.element, 'mouseenter', _this._handleEvent));

      _this.manage((0, _on.default)(_this.element, 'mouseleave', _this._handleEvent));

      _this.manage((0, _on.default)(_this.element, 'click', _this._handleEvent));

      _this.manage((0, _on.default)(_this.element, 'keydown', _this._handleKeyDown));

      return _this;
    }
    /**
     * The map associating DOM element and HeaderSubmenu instance.
     * @member HeaderSubmenu.components
     * @type {WeakMap}
     */


    /**
     * The map associating DOM element and HeaderSubmenu instance.
     * @member HeaderSubmenu.components
     * @type {WeakMap}
     */
    _createClass(HeaderSubmenu, null, [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * {@linkcode HeaderSubmenu.create .create()}, or
       * {@linkcode HeaderSubmenu.init .init()},
       * properties in this object are overriden for the instance being create and
       * how {@linkcode HeaderSubmenu.init .init()} works.
       * @member HeaderSubmenu.options
       * @type {object}
       * @property {string} selectorInit The data attribute to find side navs.
       * @property {string} [selectorTrigger] The CSS selector to find the trigger button.
       * @property {string} [selectorItem] The CSS selector to find the menu items.
       * @property {string} [attribExpanded] The attribute that represents the expanded/collapsed state.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-header-submenu]',
          selectorTrigger: ".".concat(prefix, "--header__menu-title"),
          selectorItem: ".".concat(prefix, "--header__menu .").concat(prefix, "--header__menu-item"),
          attribExpanded: 'aria-expanded'
        };
      }
      /**
       * Enum for navigating backward/forward.
       * @readonly
       * @member HeaderSubmenu.NAVIGATE
       * @type {object}
       * @property {number} BACKWARD Navigating backward.
       * @property {number} FORWARD Navigating forward.
       */

    }]);

    HeaderSubmenu.components = new WeakMap();
    HeaderSubmenu.actions = {
      CLOSE_SUBMENU: 'CLOSE_SUBMENU',
      OPEN_SUBMENU: 'OPEN_SUBMENU',
      TOGGLE_SUBMENU_WITH_FOCUS: 'TOGGLE_SUBMENU_WITH_FOCUS',
      DELEGATE_TO_FLYOUT_MENU: 'DELEGATE_TO_FLYOUT_MENU'
    };
    HeaderSubmenu.NAVIGATE = {
      BACKWARD: -1,
      FORWARD: 1
    };
    return HeaderSubmenu;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = HeaderSubmenu;
  _exports.default = _default;
});