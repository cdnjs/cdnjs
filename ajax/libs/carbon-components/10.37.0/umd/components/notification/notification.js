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
    define(["exports", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/evented-state", "../../globals/js/mixins/handles", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/evented-state"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.handles, global.on);
    global.notification = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _handles, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
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

  var Notification = /*#__PURE__*/function (_mixin) {
    _inherits(Notification, _mixin);

    var _super = _createSuper(Notification);
    /**
     * InlineNotification.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a InlineNotification.
     */


    /**
     * InlineNotification.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a InlineNotification.
     */
    function Notification(element, options) {
      var _this;

      _classCallCheck(this, Notification);

      _this = _super.call(this, element, options);

      _this._changeState = function (state, callback) {
        if (state === 'delete-notification') {
          _this.element.parentNode.removeChild(_this.element);

          _this.release();
        }

        callback();
      };

      _this.button = element.querySelector(_this.options.selectorButton);

      if (_this.button) {
        _this.manage((0, _on.default)(_this.button, 'click', function (evt) {
          if (evt.currentTarget === _this.button) {
            _this.remove();
          }
        }));
      }

      return _this;
    }

    _createClass(Notification, [{
      key: "remove",
      value: function remove() {
        this.changeState('delete-notification');
      }
      /**
       * The map associating DOM element and accordion UI instance.
       * @type {WeakMap}
       */

    }]);

    Notification.components = new WeakMap();
    Notification.options = {
      selectorInit: '[data-notification]',
      selectorButton: '[data-notification-btn]',
      eventBeforeDeleteNotification: 'notification-before-delete',
      eventAfterDeleteNotification: 'notification-after-delete'
    };
    return Notification;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _eventedState.default, _handles.default));

  var _default = Notification;
  _exports.default = _default;
});