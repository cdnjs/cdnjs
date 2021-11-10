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
    define(["exports", "./evented-state", "../misc/get-launching-details"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./evented-state"), require("../misc/get-launching-details"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.eventedState, global.getLaunchingDetails);
    global.eventedShowHideState = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _eventedState, _getLaunchingDetails) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _eventedState = _interopRequireDefault(_eventedState);
  _getLaunchingDetails = _interopRequireDefault(_getLaunchingDetails);

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

  function eventedShowHideState(ToMix) {
    /**
     * Mix-in class to launch a floating menu.
     * @class EventedShowHideState
     */
    var EventedShowHideState = /*#__PURE__*/function (_ToMix) {
      _inherits(EventedShowHideState, _ToMix);

      var _super = _createSuper(EventedShowHideState);

      function EventedShowHideState() {
        _classCallCheck(this, EventedShowHideState);

        return _super.apply(this, arguments);
      }

      _createClass(EventedShowHideState, [{
        key: "show",
        value:
        /**
         */

        /**
         * Switch to 'shown' state.
         * @param [evtOrElem] The launching event or element.
         * @param {EventedState~changeStateCallback} [callback] The callback.
         */
        function show(evtOrElem, callback) {
          if (!evtOrElem || typeof evtOrElem === 'function') {
            callback = evtOrElem; // eslint-disable-line no-param-reassign
          }

          this.changeState('shown', (0, _getLaunchingDetails.default)(evtOrElem), callback);
        }
        /**
         * Switch to 'hidden' state.
         * @param [evtOrElem] The launching event or element.
         * @param {EventedState~changeStateCallback} [callback] The callback.
         */

      }, {
        key: "hide",
        value: function hide(evtOrElem, callback) {
          if (!evtOrElem || typeof evtOrElem === 'function') {
            callback = evtOrElem; // eslint-disable-line no-param-reassign
          }

          this.changeState('hidden', (0, _getLaunchingDetails.default)(evtOrElem), callback);
        }
      }]);

      return EventedShowHideState;
    }(ToMix);

    return EventedShowHideState;
  }

  var exports = [_eventedState.default, eventedShowHideState];
  var _default = exports;
  _exports.default = _default;
});