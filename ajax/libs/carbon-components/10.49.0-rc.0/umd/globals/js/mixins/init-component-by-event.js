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
    define(["exports", "../misc/event-matches", "../misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../misc/event-matches"), require("../misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.eventMatches, global.on);
    global.initComponentByEvent = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _eventMatches, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
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

  function _default(ToMix) {
    /**
     * Mix-in class to instantiate components upon events.
     * @class InitComponentByEvent
     */
    var InitComponentByEvent = /*#__PURE__*/function (_ToMix) {
      _inherits(InitComponentByEvent, _ToMix);

      var _super = _createSuper(InitComponentByEvent);

      function InitComponentByEvent() {
        _classCallCheck(this, InitComponentByEvent);

        return _super.apply(this, arguments);
      }

      _createClass(InitComponentByEvent, null, [{
        key: "init",
        value:
        /**
         * `true` suggests that this component is lazily initialized upon an action/event, etc.
         * @type {boolean}
         */

        /**
         * Instantiates this component in the given element.
         * If the given element indicates that it's an component of this class, instantiates it.
         * Otherwise, instantiates this component by clicking on this component in the given node.
         * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
         * @param {object} [options] The component options.
         * @param {string} [options.selectorInit] The CSS selector to find this component.
         * @returns {Handle} The handle to remove the event listener to handle clicking.
         */
        function init() {
          var _this = this;

          var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var effectiveOptions = Object.assign(Object.create(this.options), options);

          if (!target || target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
            throw new TypeError('DOM document or DOM element should be given to search for and initialize this widget.');
          }

          if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
            this.create(target, options);
          } else {
            // To work around non-bubbling `focus` event, use `focusin` event instead of it's available, and "capture mode" otherwise
            var hasFocusin = ('onfocusin' in (target.nodeType === Node.ELEMENT_NODE ? target.ownerDocument : target).defaultView);
            var handles = effectiveOptions.initEventNames.map(function (name) {
              var eventName = name === 'focus' && hasFocusin ? 'focusin' : name;
              return (0, _on.default)(target, eventName, function (event) {
                var element = (0, _eventMatches.default)(event, effectiveOptions.selectorInit); // Instantiated components handles events by themselves

                // Instantiated components handles events by themselves
                if (element && !_this.components.has(element)) {
                  var component = _this.create(element, options);

                  if (typeof component.createdByEvent === 'function') {
                    component.createdByEvent(event);
                  }
                }
              }, name === 'focus' && !hasFocusin);
            });
            return {
              release: function release() {
                for (var handle = handles.pop(); handle; handle = handles.pop()) {
                  handle.release();
                }
              }
            };
          }

          return '';
        }
      }]);

      InitComponentByEvent.forLazyInit = true;
      return InitComponentByEvent;
    }(ToMix);

    return InitComponentByEvent;
  }
});