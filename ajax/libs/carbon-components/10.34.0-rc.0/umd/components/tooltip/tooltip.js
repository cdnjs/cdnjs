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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-event", "../../globals/js/mixins/evented-show-hide-state", "../../globals/js/mixins/handles", "../floating-menu/floating-menu", "../../globals/js/misc/get-launching-details", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-event"), require("../../globals/js/mixins/evented-show-hide-state"), require("../../globals/js/mixins/handles"), require("../floating-menu/floating-menu"), require("../../globals/js/misc/get-launching-details"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentByEvent, global.eventedShowHideState, global.handles, global.floatingMenu, global.getLaunchingDetails, global.on);
    global.tooltip = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentByEvent, _eventedShowHideState, _handles, _floatingMenu, _getLaunchingDetails, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentByEvent = _interopRequireDefault(_initComponentByEvent);
  _eventedShowHideState = _interopRequireDefault(_eventedShowHideState);
  _handles = _interopRequireDefault(_handles);
  _floatingMenu = _interopRequireWildcard(_floatingMenu);
  _getLaunchingDetails = _interopRequireDefault(_getLaunchingDetails);
  _on = _interopRequireDefault(_on);

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  /**
   * @param {Element} menuBody The menu body with the menu arrow.
   * @param {string} menuDirection Where the floating menu menu should be placed relative to the trigger button.
   * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
   * @private
   */


  var getMenuOffset = function getMenuOffset(menuBody, menuDirection) {
    var _DIRECTION_LEFT$DIREC, _DIRECTION_LEFT$DIREC2;

    var arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody, ':before');
    var arrowPositionProp = (_DIRECTION_LEFT$DIREC = {}, _defineProperty(_DIRECTION_LEFT$DIREC, _floatingMenu.DIRECTION_LEFT, 'right'), _defineProperty(_DIRECTION_LEFT$DIREC, _floatingMenu.DIRECTION_TOP, 'bottom'), _defineProperty(_DIRECTION_LEFT$DIREC, _floatingMenu.DIRECTION_RIGHT, 'left'), _defineProperty(_DIRECTION_LEFT$DIREC, _floatingMenu.DIRECTION_BOTTOM, 'top'), _DIRECTION_LEFT$DIREC)[menuDirection];
    var menuPositionAdjustmentProp = (_DIRECTION_LEFT$DIREC2 = {}, _defineProperty(_DIRECTION_LEFT$DIREC2, _floatingMenu.DIRECTION_LEFT, 'left'), _defineProperty(_DIRECTION_LEFT$DIREC2, _floatingMenu.DIRECTION_TOP, 'top'), _defineProperty(_DIRECTION_LEFT$DIREC2, _floatingMenu.DIRECTION_RIGHT, 'left'), _defineProperty(_DIRECTION_LEFT$DIREC2, _floatingMenu.DIRECTION_BOTTOM, 'top'), _DIRECTION_LEFT$DIREC2)[menuDirection];
    var values = [arrowPositionProp, 'border-bottom-width'].reduce(function (o, name) {
      return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, name, Number((/^([\d-.]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1])));
    }, {});
    var margin = 0;

    if (menuDirection !== _floatingMenu.DIRECTION_BOTTOM) {
      var style = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody);
      margin = Number((/^([\d-.]+)px$/.exec(style.getPropertyValue('margin-top')) || [])[1]);
    }

    values[arrowPositionProp] = values[arrowPositionProp] || -6; // IE, etc.

    if (Object.keys(values).every(function (name) {
      return !isNaN(values[name]);
    })) {
      var arrowPosition = values[arrowPositionProp],
          borderBottomWidth = values['border-bottom-width'];
      return _defineProperty({
        left: 0,
        top: 0
      }, menuPositionAdjustmentProp, Math.sqrt(Math.pow(borderBottomWidth, 2) * 2) - arrowPosition + margin * (menuDirection === _floatingMenu.DIRECTION_TOP ? 2 : 1));
    }

    return undefined;
  };
  /**
   * Key codes for allowed keys that will trigger opening a tooltip
   * @type {Integer[]}
   * @private
   */


  var allowedOpenKeys = [32, 13];

  var Tooltip = /*#__PURE__*/function (_mixin) {
    _inherits(Tooltip, _mixin);

    var _super = _createSuper(Tooltip);
    /**
     * Tooltip.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     */


    /**
     * Tooltip.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     */
    function Tooltip(element, options) {
      var _this;

      _classCallCheck(this, Tooltip);

      _this = _super.call(this, element, options);
      _this._hasContextMenu = false;

      _this._hookOn(element);

      return _this;
    }
    /**
     * A flag to detect if `oncontextmenu` event is fired right before `focus`/`blur` events.
     * @type {boolean}
     */


    /**
     * A flag to detect if `oncontextmenu` event is fired right before `focus`/`blur` events.
     * @type {boolean}
     */
    _createClass(Tooltip, [{
      key: "createdByEvent",
      value:
      /**
       * A method called when this widget is created upon events.
       * @param {Event} event The event triggering the creation.
       */
      function createdByEvent(event) {
        var relatedTarget = event.relatedTarget,
            type = event.type,
            which = event.which;

        if (type === 'click' || allowedOpenKeys.includes(which)) {
          this._handleClick({
            relatedTarget: relatedTarget,
            type: type,
            details: (0, _getLaunchingDetails.default)(event)
          });
        }
      }
      /**
       * Changes the shown/hidden state.
       * @param {string} state The new state.
       * @param {object} detail The detail of the event trigging this action.
       * @param {Function} callback Callback called when change in state completes.
       */

    }, {
      key: "changeState",
      value: function changeState(state, detail, callback) {
        if (!this.tooltip) {
          var tooltip = this.element.ownerDocument.querySelector(this.element.getAttribute(this.options.attribTooltipTarget));

          if (!tooltip) {
            throw new Error('Cannot find the target tooltip.');
          } // Lazily create a component instance for tooltip


          // Lazily create a component instance for tooltip
          this.tooltip = _floatingMenu.default.create(tooltip, {
            refNode: this.element,
            classShown: this.options.classShown,
            offset: this.options.objMenuOffset,
            contentNode: tooltip.querySelector(this.options.selectorContent)
          });

          this._hookOn(tooltip);

          this.children.push(this.tooltip);
        } // Delegates the action of changing state to the tooltip.
        // (And thus the before/after shown/hidden events are fired from the tooltip)


        // Delegates the action of changing state to the tooltip.
        // (And thus the before/after shown/hidden events are fired from the tooltip)
        this.tooltip.changeState(state, Object.assign(detail, {
          delegatorNode: this.element
        }), callback);
      }
      /**
       * Attaches event handlers to show the tooltip.
       * @param {Element} element The element to attach the events to.
       * @private
       */

    }, {
      key: "_hookOn",
      value: function _hookOn(element) {
        var _this2 = this;
        /**
         * Setup the _handleClick function for displaying a tooltip
         * @param {Event} evt - user initiated event
         * @param {Integer[]} [allowedKeys] - allowed key codes the user may press to open the tooltip
         * @private
         */


        /**
         * Setup the _handleClick function for displaying a tooltip
         * @param {Event} evt - user initiated event
         * @param {Integer[]} [allowedKeys] - allowed key codes the user may press to open the tooltip
         * @private
         */
        var handleClickContextMenu = function handleClickContextMenu(evt, allowedKeys) {
          var relatedTarget = evt.relatedTarget,
              type = evt.type,
              which = evt.which; // Allow user to use `space` or `enter` to open tooltip

          // Allow user to use `space` or `enter` to open tooltip
          if (typeof allowedKeys === 'undefined' || allowedKeys.includes(which)) {
            var hadContextMenu = _this2._hasContextMenu;
            _this2._hasContextMenu = type === 'contextmenu';

            _this2._handleClick({
              relatedTarget: relatedTarget,
              type: type,
              hadContextMenu: hadContextMenu,
              details: (0, _getLaunchingDetails.default)(evt)
            });
          }
        };

        this.manage((0, _on.default)(element, 'click', handleClickContextMenu, false));

        if (this.element.tagName !== 'BUTTON') {
          this.manage((0, _on.default)(this.element, 'keydown', function (event) {
            handleClickContextMenu(event, allowedOpenKeys);
          }, false));
        }
      }
      /**
       * Handles click/focus events.
       * @param {object} params The parameters.
       * @param {Element} params.relatedTarget The element that focus went to. (For `blur` event)
       * @param {string} params.type The event type triggering this method.
       * @param {boolean} params.hadContextMenu
       * @param {object} params.details The event details.
       * @private
       */

    }, {
      key: "_handleClick",
      value: function _handleClick(_ref2) {
        var relatedTarget = _ref2.relatedTarget,
            type = _ref2.type,
            hadContextMenu = _ref2.hadContextMenu,
            details = _ref2.details;
        var state = {
          click: 'shown',
          keydown: 'shown',
          blur: 'hidden',
          touchleave: 'hidden',
          touchcancel: 'hidden'
        }[type];
        var shouldPreventClose;

        if (type === 'blur') {
          // Note: SVGElement in IE11 does not have `.contains()`
          var wentToSelf = relatedTarget && this.element.contains && this.element.contains(relatedTarget) || this.tooltip && this.tooltip.element.contains(relatedTarget);
          shouldPreventClose = hadContextMenu || wentToSelf;
        }

        if (!shouldPreventClose) {
          this.changeState(state, details);
        }
      }
    }], [{
      key: "options",
      get: function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-tooltip-trigger]',
          selectorContent: ".".concat(prefix, "--tooltip__content"),
          classShown: "".concat(prefix, "--tooltip--shown"),
          attribTooltipTarget: 'data-tooltip-target',
          objMenuOffset: getMenuOffset,
          initEventNames: ['click', 'keydown']
        };
      }
    }]);

    Tooltip.components = new WeakMap();
    return Tooltip;
  }((0, _mixin2.default)(_createComponent.default, _initComponentByEvent.default, _eventedShowHideState.default, _handles.default));

  var _default = Tooltip;
  _exports.default = _default;
});