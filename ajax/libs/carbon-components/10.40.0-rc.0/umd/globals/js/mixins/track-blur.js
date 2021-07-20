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
    define(["exports", "../misc/on", "./handles"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../misc/on"), require("./handles"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.on, global.handles);
    global.trackBlur = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _on, _handles) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _on = _interopRequireDefault(_on);
  _handles = _interopRequireDefault(_handles);

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

  function trackBlur(ToMix) {
    var TrackBlur = /*#__PURE__*/function (_ToMix) {
      _inherits(TrackBlur, _ToMix);

      var _super = _createSuper(TrackBlur);
      /**
       * Mix-in class to add an handler for losing focus.
       * @extends Handles
       * @param {HTMLElement} element The element working as this component.
       * @param {object} [options] The component options.
       */


      function TrackBlur(element, options) {
        var _this;

        _classCallCheck(this, TrackBlur);

        _this = _super.call(this, element, options);
        var hasFocusin = ('onfocusin' in window);
        var focusinEventName = hasFocusin ? 'focusin' : 'focus';
        var focusoutEventName = hasFocusin ? 'focusout' : 'blur';

        _this.manage((0, _on.default)(_this.element.ownerDocument, focusinEventName, function (event) {
          if (!(_this.options.contentNode || _this.element).contains(event.target)) {
            _this.handleBlur(event);
          }
        }, !hasFocusin));

        _this.manage((0, _on.default)(_this.element.ownerDocument, focusoutEventName, function (event) {
          if (!event.relatedTarget) {
            _this.handleBlur(event);
          }
        }, !hasFocusin));

        return _this;
      }
      /**
       * The method called when this component loses focus.
       * @abstract
       */


      _createClass(TrackBlur, [{
        key: "handleBlur",
        value: function handleBlur() {
          throw new Error('Components inheriting TrackBlur mix-in must implement handleBlur() method.');
        }
      }]);

      return TrackBlur;
    }(ToMix);

    return TrackBlur;
  }

  var exports = [_handles.default, trackBlur];
  var _default = exports;
  _exports.default = _default;
});