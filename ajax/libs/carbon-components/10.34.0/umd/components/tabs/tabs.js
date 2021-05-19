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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/event-matches", "../content-switcher/content-switcher", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/event-matches"), require("../content-switcher/content-switcher"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.eventMatches, global.contentSwitcher, global.on);
    global.tabs = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _eventMatches, _contentSwitcher, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _eventMatches = _interopRequireDefault(_eventMatches);
  _contentSwitcher = _interopRequireDefault(_contentSwitcher);
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

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };

  var Tab = /*#__PURE__*/function (_ContentSwitcher) {
    _inherits(Tab, _ContentSwitcher);

    var _super = _createSuper(Tab);
    /**
     * Container of tabs.
     * @extends ContentSwitcher
     * @param {HTMLElement} element The element working as a container of tabs.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
     * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
     * @param {string} [options.selectorTriggerText]
     *   The CSS selector to find the element used in narrow mode showing the selected tab item.
     * @param {string} [options.selectorButton] The CSS selector to find tab containers.
     * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
     * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
     * @param {string} [options.classActive] The CSS class for tab's selected state.
     * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a tab is selected.
     *   Cancellation of this event stops selection of tab.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
     */


    /**
     * Container of tabs.
     * @extends ContentSwitcher
     * @param {HTMLElement} element The element working as a container of tabs.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
     * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
     * @param {string} [options.selectorTriggerText]
     *   The CSS selector to find the element used in narrow mode showing the selected tab item.
     * @param {string} [options.selectorButton] The CSS selector to find tab containers.
     * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
     * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
     * @param {string} [options.classActive] The CSS class for tab's selected state.
     * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a tab is selected.
     *   Cancellation of this event stops selection of tab.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
     */
    function Tab(element, options) {
      var _this;

      _classCallCheck(this, Tab);

      _this = _super.call(this, element, options);

      _this.manage((0, _on.default)(_this.element, 'keydown', function (event) {
        _this._handleKeyDown(event);
      }));

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'click', function (event) {
        _this._handleDocumentClick(event);
      }));

      var selected = _this.element.querySelector(_this.options.selectorButtonSelected);

      if (selected) {
        _this._updateTriggerText(selected);
      }

      return _this;
    }
    /**
     * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
     * @private
     * @param {object} detail The detail of the event trigging this action.
     * @param {HTMLElement} detail.item The tab item to be selected.
     * @param {Function} callback Callback called when change in state completes.
     */


    /**
     * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
     * @private
     * @param {object} detail The detail of the event trigging this action.
     * @param {HTMLElement} detail.item The tab item to be selected.
     * @param {Function} callback Callback called when change in state completes.
     */
    _createClass(Tab, [{
      key: "_changeState",
      value: function _changeState(detail, callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Tab.prototype), "_changeState", this).call(this, detail, function (error) {
          if (!error) {
            _this2._updateTriggerText(detail.item);
          }

          for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            data[_key - 1] = arguments[_key];
          }

          callback.apply(void 0, [error].concat(data));
        });
      }
      /**
       * Handles click on tab container.
       * * If the click is on a tab, activates it.
       * * If the click is on the button to open the drop down menu, does so.
       * @param {Event} event The event triggering this method.
       */

    }, {
      key: "_handleClick",
      value: function _handleClick(event) {
        var button = (0, _eventMatches.default)(event, this.options.selectorButton);
        var trigger = (0, _eventMatches.default)(event, this.options.selectorTrigger);

        if (button && !button.classList.contains(this.options.classButtonDisabled)) {
          _get(_getPrototypeOf(Tab.prototype), "_handleClick", this).call(this, event);

          this._updateMenuState(false);
        }

        if (trigger) {
          this._updateMenuState();
        }
      }
      /**
       * Handles click on document.
       * @param {Event} event The triggering event.
       * @private
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(event) {
        var element = this.element;
        var isOfSelf = element.contains(event.target);

        if (isOfSelf) {
          return;
        }

        this._updateMenuState(false);
      }
      /**
       * Handles arrow keys on tab container.
       * * Left keys are used to go to previous tab.
       * * Right keys are used to go to next tab.
       * @param {Event} event The event triggering this method.
       */

    }, {
      key: "_handleKeyDown",
      value: function _handleKeyDown(event) {
        var _this3 = this;

        var triggerNode = (0, _eventMatches.default)(event, this.options.selectorTrigger);

        if (triggerNode) {
          if (event.which === 13) {
            this._updateMenuState();
          }

          return;
        }

        var direction = {
          37: this.constructor.NAVIGATE.BACKWARD,
          39: this.constructor.NAVIGATE.FORWARD
        }[event.which];

        if (direction) {
          var buttons = toArray(this.element.querySelectorAll(this.options.selectorButtonEnabled));
          var button = this.element.querySelector(this.options.selectorButtonSelected);
          var nextIndex = Math.max(buttons.indexOf(button) + direction, -1
          /* For `button` not found in `buttons` */
          );
          var nextIndexLooped = nextIndex >= 0 && nextIndex < buttons.length ? nextIndex : nextIndex - Math.sign(nextIndex) * buttons.length;
          this.setActive(buttons[nextIndexLooped], function (error, item) {
            if (item) {
              var link = item.querySelector(_this3.options.selectorLink);

              if (link) {
                link.focus();
              }
            }
          });
          event.preventDefault();
        }
      }
      /**
       * Shows/hides the drop down menu used in narrow mode.
       * @param {boolean} [force] `true` to show the menu, `false` to hide the menu, otherwise toggles the menu.
       */

    }, {
      key: "_updateMenuState",
      value: function _updateMenuState(force) {
        var menu = this.element.querySelector(this.options.selectorMenu);
        var trigger = this.element.querySelector(this.options.selectorTrigger);

        if (menu) {
          menu.classList.toggle(this.options.classHidden, typeof force === 'undefined' ? force : !force);

          if (menu.classList.contains(this.options.classHidden)) {
            trigger.classList.remove(this.options.classOpen);
          } else {
            trigger.classList.add(this.options.classOpen);
          }
        }
      }
      /**
       * Updates the text indicating the currently selected tab item.
       * @param {HTMLElement} target The newly selected tab item.
       */

    }, {
      key: "_updateTriggerText",
      value: function _updateTriggerText(target) {
        var triggerText = this.element.querySelector(this.options.selectorTriggerText);

        if (triggerText) {
          triggerText.textContent = target.textContent;
        }
      }
      /**
       * The map associating DOM element and tab container instance.
       * @member Tab.components
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode Tab.init .init()},
       * properties in this object are overriden for the instance being create and how {@linkcode Tab.init .init()} works.
       * @member Tab.options
       * @type {object}
       * @property {string} selectorInit The CSS selector to find tab containers.
       * @property {string} [selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
       * @property {string} [selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
       * @property {string} [selectorTriggerText]
       *   The CSS selector to find the element used in narrow mode showing the selected tab item.
       * @property {string} [selectorButton] The CSS selector to find tab containers.
       * @property {string} [selectorButtonSelected] The CSS selector to find the selected tab.
       * @property {string} [selectorLink] The CSS selector to find the links in tabs.
       * @property {string} [classActive] The CSS class for tab's selected state.
       * @property {string} [classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
       * @property {string} [eventBeforeSelected]
       *   The name of the custom event fired before a tab is selected.
       *   Cancellation of this event stops selection of tab.
       * @property {string} [eventAfterSelected] The name of the custom event fired after a tab is selected.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return Object.assign(Object.create(_contentSwitcher.default.options), {
          selectorInit: '[data-tabs]',
          selectorMenu: ".".concat(prefix, "--tabs__nav"),
          selectorTrigger: ".".concat(prefix, "--tabs-trigger"),
          selectorTriggerText: ".".concat(prefix, "--tabs-trigger-text"),
          selectorButton: ".".concat(prefix, "--tabs__nav-item"),
          selectorButtonEnabled: ".".concat(prefix, "--tabs__nav-item:not(.").concat(prefix, "--tabs__nav-item--disabled)"),
          selectorButtonSelected: ".".concat(prefix, "--tabs__nav-item--selected"),
          selectorLink: ".".concat(prefix, "--tabs__nav-link"),
          classActive: "".concat(prefix, "--tabs__nav-item--selected"),
          classHidden: "".concat(prefix, "--tabs__nav--hidden"),
          classOpen: "".concat(prefix, "--tabs-trigger--open"),
          classButtonDisabled: "".concat(prefix, "--tabs__nav-item--disabled"),
          eventBeforeSelected: 'tab-beingselected',
          eventAfterSelected: 'tab-selected'
        });
      }
      /**
       * Enum for navigating backward/forward.
       * @readonly
       * @member Tab.NAVIGATE
       * @type {object}
       * @property {number} BACKWARD Navigating backward.
       * @property {number} FORWARD Navigating forward.
       */

    }]);

    Tab.components = new WeakMap();
    Tab.NAVIGATE = {
      BACKWARD: -1,
      FORWARD: 1
    };
    return Tab;
  }(_contentSwitcher.default);

  var _default = Tab;
  _exports.default = _default;
});