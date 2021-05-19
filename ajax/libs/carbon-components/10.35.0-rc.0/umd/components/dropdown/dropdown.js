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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/track-blur", "../../globals/js/misc/event-matches", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/track-blur"), require("../../globals/js/misc/event-matches"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.trackBlur, global.eventMatches, global.on);
    global.dropdown = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _trackBlur, _eventMatches, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _trackBlur = _interopRequireDefault(_trackBlur);
  _eventMatches = _interopRequireDefault(_eventMatches);
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

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };

  var Dropdown = /*#__PURE__*/function (_mixin) {
    _inherits(Dropdown, _mixin);

    var _super = _createSuper(Dropdown);
    /**
     * A selector with drop downs.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends TrackBlur
     * @param {HTMLElement} element The element working as a selector.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
     * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
     * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
     * @param {string} [options.classOpen] The CSS class for the open state.
     * @param {string} [options.classDisabled] The CSS class for the disabled state.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a drop down item is selected.
     *   Cancellation of this event stops selection of drop down item.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
     */


    /**
     * A selector with drop downs.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends TrackBlur
     * @param {HTMLElement} element The element working as a selector.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
     * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
     * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
     * @param {string} [options.classOpen] The CSS class for the open state.
     * @param {string} [options.classDisabled] The CSS class for the disabled state.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a drop down item is selected.
     *   Cancellation of this event stops selection of drop down item.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
     */
    function Dropdown(element, options) {
      var _this;

      _classCallCheck(this, Dropdown);

      _this = _super.call(this, element, options);

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'click', function (event) {
        _this._toggle(event);
      }));

      _this.manage((0, _on.default)(_this.element, 'keydown', function (event) {
        _this._handleKeyDown(event);
      }));

      _this.manage((0, _on.default)(_this.element, 'click', function (event) {
        var item = (0, _eventMatches.default)(event, _this.options.selectorItem);

        if (item) {
          _this.select(item);
        }
      })); // When using the active descendant approach we use a class to give focus styles during keyboard (up/down arrows)
      // navigation instead of relying on the :focus selector. This leaves the potential to have multiple items when
      // switching interactions between keyboard and mouse users. To more closely align with Carbon React implementation,
      // we want the focus class to move as the user hovers over items. This also updates the location of focus based on
      // the last hovered item if the user switches back to using the keyboard.


      // When using the active descendant approach we use a class to give focus styles during keyboard (up/down arrows)
      // navigation instead of relying on the :focus selector. This leaves the potential to have multiple items when
      // switching interactions between keyboard and mouse users. To more closely align with Carbon React implementation,
      // we want the focus class to move as the user hovers over items. This also updates the location of focus based on
      // the last hovered item if the user switches back to using the keyboard.
      if ( // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
      _this.element.querySelector(_this.options.selectorTrigger) && _this.element.querySelector(_this.options.selectorMenu)) {
        // Using the latest HTML structure that supports the aria-activedescendant attribute
        _this.manage((0, _on.default)(_this.element, 'mouseover', function (event) {
          var item = (0, _eventMatches.default)(event, _this.options.selectorItem);

          if (item) {
            _this._updateFocus(item);
          }
        }));
      }

      return _this;
    }
    /**
     * Handles keydown event.
     * @param {Event} event The event triggering this method.
     */


    /**
     * Handles keydown event.
     * @param {Event} event The event triggering this method.
     */
    _createClass(Dropdown, [{
      key: "_handleKeyDown",
      value: function _handleKeyDown(event) {
        var isOpen = this.element.classList.contains(this.options.classOpen);
        var direction = {
          38: this.constructor.NAVIGATE.BACKWARD,
          40: this.constructor.NAVIGATE.FORWARD
        }[event.which];

        if (isOpen && direction !== undefined) {
          this.navigate(direction);
          event.preventDefault(); // Prevents up/down keys from scrolling container
        } else {
          // get selected item
          // in v10.0, the anchor elements fire click events on Enter keypress when a dropdown item is selected
          // in v10.5 (#3586), focus is no longer placed on the dropdown items and is instead kept fixed on the ul menu
          // so we need to manually call getCurrentNavigation and select the item
          var item = this.getCurrentNavigation();

          if (item && isOpen && (event.which === 13 || event.which === 32) && !this.element.ownerDocument.activeElement.matches(this.options.selectorItem)) {
            event.preventDefault();
            this.select(item);
          }

          this._toggle(event);
        }
      }
      /**
       * When using aria-activedescendant we want to make sure attributes and classes
       * are properly cleaned up when the dropdown is closed
       * @private
       */

    }, {
      key: "_focusCleanup",
      value: function _focusCleanup() {
        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
        var triggerNode = this.element.querySelector(this.options.selectorTrigger); // only want to grab the listNode IF it's using the latest a11y HTML structure

        // only want to grab the listNode IF it's using the latest a11y HTML structure
        var listNode = triggerNode ? this.element.querySelector(this.options.selectorMenu) : null;

        if (listNode) {
          listNode.removeAttribute('aria-activedescendant');
          var focusedItem = this.element.querySelector(this.options.selectorItemFocused);

          if (focusedItem) {
            focusedItem.classList.remove(this.options.classFocused);
          }
        }
      }
      /**
       * Update focus using aria-activedescendant HTML structure
       * @param {HTMLElement} itemToFocus The element to be focused.
       */

    }, {
      key: "_updateFocus",
      value: function _updateFocus(itemToFocus) {
        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
        var triggerNode = this.element.querySelector(this.options.selectorTrigger); // only want to grab the listNode IF it's using the latest a11y HTML structure

        // only want to grab the listNode IF it's using the latest a11y HTML structure
        var listNode = triggerNode ? this.element.querySelector(this.options.selectorMenu) : null;
        var previouslyFocused = listNode.querySelector(this.options.selectorItemFocused);
        itemToFocus.classList.add(this.options.classFocused);
        listNode.setAttribute('aria-activedescendant', itemToFocus.id);

        if (previouslyFocused) {
          previouslyFocused.classList.remove(this.options.classFocused);
        }
      }
      /**
       * Opens and closes the dropdown menu.
       * @param {Event} [event] The event triggering this method.
       *
       * @todo https://github.com/carbon-design-system/carbon/issues/3641
       */

    }, {
      key: "_toggle",
      value: function _toggle(event) {
        var _this2 = this;

        var isDisabled = this.element.classList.contains(this.options.classDisabled);

        if (isDisabled) {
          return;
        } // NOTE: `selectorTrigger` does NOT match the trigger button in older markup


        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
        var triggerNode = this.element.querySelector(this.options.selectorTrigger);

        if ( // User presses down arrow
        event.which === 40 && !event.target.matches(this.options.selectorItem) || // User presses space or enter and the trigger is not a button OR event is not fired by trigger
        (!triggerNode || !triggerNode.contains(event.target)) && [13, 32].indexOf(event.which) >= 0 && !event.target.matches(this.options.selectorItem) || // User presses esc
        event.which === 27 || // User clicks
        event.type === 'click') {
          var isOpen = this.element.classList.contains(this.options.classOpen);
          var isOfSelf = this.element.contains(event.target); // Determine if the open className should be added, removed, or toggled

          // Determine if the open className should be added, removed, or toggled
          var actions = {
            add: isOfSelf && event.which === 40 && !isOpen,
            remove: (!isOfSelf || event.which === 27) && isOpen,
            toggle: isOfSelf && event.which !== 27 && event.which !== 40
          };
          var changedState = false;
          Object.keys(actions).forEach(function (action) {
            if (actions[action]) {
              changedState = true;

              _this2.element.classList[action](_this2.options.classOpen);
            }
          });
          var listItems = toArray(this.element.querySelectorAll(this.options.selectorItem)); // only want to grab the listNode IF it's using the latest a11y HTML structure

          // only want to grab the listNode IF it's using the latest a11y HTML structure
          var listNode = triggerNode ? this.element.querySelector(this.options.selectorMenu) : null; // @todo remove conditionals for elements existing once legacy structure is depreciated

          // @todo remove conditionals for elements existing once legacy structure is depreciated
          if (changedState && this.element.classList.contains(this.options.classOpen)) {
            // toggled open
            if (triggerNode) {
              triggerNode.setAttribute('aria-expanded', 'true');
            }

            (listNode || this.element).focus();

            if (listNode) {
              var selectedNode = listNode.querySelector(this.options.selectorLinkSelected);
              listNode.setAttribute('aria-activedescendant', (selectedNode || listItems[0]).id);
              (selectedNode || listItems[0]).classList.add(this.options.classFocused);
            }
          } else if (changedState && (isOfSelf || actions.remove)) {
            // toggled close
            // timer is used to call focus AFTER the click event on
            // trigger button (which is caused by keypress e.g. during keyboard navigation)
            setTimeout(function () {
              return (triggerNode || _this2.element).focus();
            }, 0);

            if (triggerNode) {
              triggerNode.setAttribute('aria-expanded', 'false');
            }

            this._focusCleanup();
          } // @todo remove once legacy structure is depreciated


          // @todo remove once legacy structure is depreciated
          if (!triggerNode) {
            listItems.forEach(function (item) {
              if (_this2.element.classList.contains(_this2.options.classOpen)) {
                item.tabIndex = 0;
              } else {
                item.tabIndex = -1;
              }
            });
          }

          var menuListNode = this.element.querySelector(this.options.selectorMenu);

          if (menuListNode) {
            menuListNode.tabIndex = this.element.classList.contains(this.options.classOpen) ? '0' : '-1';
          }
        }
      }
      /**
       * @returns {Element} Currently highlighted element.
       */

    }, {
      key: "getCurrentNavigation",
      value: function getCurrentNavigation() {
        var focusedNode; // Using the latest semantic markup structure where trigger is a button
        // @todo remove conditional once legacy structure is depreciated
        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup

        // Using the latest semantic markup structure where trigger is a button
        // @todo remove conditional once legacy structure is depreciated
        // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
        if (this.element.querySelector(this.options.selectorTrigger)) {
          var listNode = this.element.querySelector(this.options.selectorMenu);
          var focusedId = listNode.getAttribute('aria-activedescendant');
          focusedNode = focusedId ? listNode.querySelector("#".concat(focusedId)) : null;
        } else {
          var focused = this.element.ownerDocument.activeElement;
          focusedNode = focused.nodeType === Node.ELEMENT_NODE && focused.matches(this.options.selectorItem) ? focused : null;
        }

        return focusedNode;
      }
      /**
       * Moves up/down the focus.
       * @param {number} direction The direction of navigating.
       */
      // @todo create issue it's a better UX to move the focus when the user hovers so they stay in sync

    }, {
      key: "navigate",
      value: function navigate(direction) {
        var items = toArray(this.element.querySelectorAll(this.options.selectorItem));
        var start = this.getCurrentNavigation() || this.element.querySelector(this.options.selectorLinkSelected);

        var getNextItem = function getNextItem(old) {
          var handleUnderflow = function handleUnderflow(i, l) {
            return i + (i >= 0 ? 0 : l);
          };

          var handleOverflow = function handleOverflow(i, l) {
            return i - (i < l ? 0 : l);
          }; // `items.indexOf(old)` may be -1 (Scenario of no previous focus)


          // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
          var index = Math.max(items.indexOf(old) + direction, -1);
          return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
        };

        var isShowSelected = this.element.classList.contains(this.options.classShowSelected);

        for (var current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
          if (!current.matches(this.options.selectorItemHidden) && !current.parentNode.matches(this.options.selectorItemHidden) && (isShowSelected || !isShowSelected && !current.parentElement.matches(this.options.selectorItemSelected))) {
            // Using the latest semantic markup structure where trigger is a button
            // @todo remove conditional once legacy structure is depreciated
            // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
            if (this.element.querySelector(this.options.selectorTrigger)) {
              this._updateFocus(current);
            } else {
              current.focus();
            }

            break;
          }
        }
      }
      /**
       * Handles clicking on the dropdown options, doing the following:
       * * Change Dropdown text to selected option.
       * * Remove selected option from options when selected.
       * * Emit custom events.
       * @param {HTMLElement} itemToSelect The element to be activated.
       */

    }, {
      key: "select",
      value: function select(itemToSelect) {
        var _this3 = this;

        var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
          bubbles: true,
          cancelable: true,
          detail: {
            item: itemToSelect
          }
        });

        if (this.element.dispatchEvent(eventStart)) {
          if (this.element.dataset.dropdownType !== 'navigation') {
            // NOTE: `selectorTrigger` does NOT match the trigger button in older markup
            var selectorText = !this.element.querySelector(this.options.selectorTrigger) && this.element.dataset.dropdownType !== 'inline' ? this.options.selectorText : this.options.selectorTextInner;
            var text = this.element.querySelector(selectorText);

            if (text) {
              text.innerHTML = itemToSelect.innerHTML;
            }

            itemToSelect.parentElement.classList.add(this.options.classSelected);
          }

          this.element.dataset.value = itemToSelect.parentElement.dataset.value;
          toArray(this.element.querySelectorAll(this.options.selectorLinkSelected)).forEach(function (item) {
            if (itemToSelect !== item) {
              item.parentElement.classList.remove(_this3.options.classSelected);
            }
          });
          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
            bubbles: true,
            cancelable: true,
            detail: {
              item: itemToSelect
            }
          }));
        }
      }
      /**
       * Closes the dropdown menu if this component loses focus.
       */

    }, {
      key: "handleBlur",
      value: function handleBlur() {
        this.element.classList.remove(this.options.classOpen);

        this._focusCleanup();
      }
      /**
       * The map associating DOM element and selector instance.
       * @member Dropdown.components
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor, {@linkcode Dropdown.create .create()}, or {@linkcode Dropdown.init .init()},
       * properties in this object are overridden for the instance being create and how {@linkcode Dropdown.init .init()} works.
       * @member Dropdown.options
       * @type {object}
       * @property {string} selectorInit The CSS selector to find selectors.
       * @property {string} [selectorTrigger]
       *   The CSS selector to find the trigger button when using a11y compliant markup.
       *   NOTE: Does NOT match the trigger button in older markup.
       * @property {string} [selectorMenu] The CSS selector to find menu list when using a11y compliant markup.
       * @property {string} [selectorText] The CSS selector to find the element showing the selected item.
       * @property {string} [selectorTextInner] The CSS selector to find the element showing the selected item, used for inline mode.
       * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
       * @property {string} [selectorItemHidden]
       *   The CSS selector to find hidden dropdown items.
       *   Used to skip dropdown items for keyboard navigation.
       * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
       * @property {string} [selectorItemFocused] The CSS selector to find the clickable area in the focused dropdown item.
       * @property {string} [selectorLinkSelected] The CSS selector to target the link node of the selected dropdown item.
       * @property {string} [classShowSelected] The CSS class for the show selected modifier of the dropdown.
       * @property {string} [classSelected] The CSS class for the selected dropdown item.
       * @property {string} [classFocused] The CSS class for the focused dropdown item.
       * @property {string} [classOpen] The CSS class for the open state.
       * @property {string} [classDisabled] The CSS class for the disabled state.
       * @property {string} [eventBeforeSelected]
       *   The name of the custom event fired before a drop down item is selected.
       *   Cancellation of this event stops selection of drop down item.
       * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-dropdown]',
          selectorTrigger: "button.".concat(prefix, "--dropdown-text"),
          // NOTE: Does NOT match the trigger button in older markup.
          selectorMenu: ".".concat(prefix, "--dropdown-list"),
          selectorText: ".".concat(prefix, "--dropdown-text"),
          selectorTextInner: ".".concat(prefix, "--dropdown-text__inner"),
          selectorItem: ".".concat(prefix, "--dropdown-link"),
          selectorItemSelected: ".".concat(prefix, "--dropdown--selected"),
          selectorItemFocused: ".".concat(prefix, "--dropdown--focused"),
          selectorItemHidden: "[hidden],[aria-hidden=\"true\"]",
          selectorLinkSelected: ".".concat(prefix, "--dropdown--selected .").concat(prefix, "--dropdown-link"),
          classShowSelected: "".concat(prefix, "--dropdown--show-selected"),
          classSelected: "".concat(prefix, "--dropdown--selected"),
          classFocused: "".concat(prefix, "--dropdown--focused"),
          classOpen: "".concat(prefix, "--dropdown--open"),
          classDisabled: "".concat(prefix, "--dropdown--disabled"),
          eventBeforeSelected: 'dropdown-beingselected',
          eventAfterSelected: 'dropdown-selected'
        };
      }
      /**
       * Enum for navigating backward/forward.
       * @readonly
       * @member Dropdown.NAVIGATE
       * @type {object}
       * @property {number} BACKWARD Navigating backward.
       * @property {number} FORWARD Navigating forward.
       */

    }]);

    Dropdown.components = new WeakMap();
    Dropdown.NAVIGATE = {
      BACKWARD: -1,
      FORWARD: 1
    };
    return Dropdown;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _trackBlur.default));

  var _default = Dropdown;
  _exports.default = _default;
});