(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "warning"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("warning"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.warning);
    global.removedComponent = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _warning) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _warning = _interopRequireDefault(_warning);

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
  /**
   * @param {string} name The component name.
   * @returns {Function} A stub of removed component.
   */


  var removedComponent = function removedComponent(name) {
    var _class, _temp;

    var didWarnAboutRemoval = false;

    var warn = function warn() {
      if (process.env.NODE_ENV !== "production") {
        process.env.NODE_ENV !== "production" ? (0, _warning.default)(didWarnAboutRemoval, "The `".concat(name, "` component has been removed.")) : void 0;
        didWarnAboutRemoval = true;
      }
    };

    return _temp = _class = /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);

        warn();
      }

      _createClass(_class, null, [{
        key: "create",
        value: function create() {
          warn();
        }
      }, {
        key: "init",
        value: function init() {
          warn();
        }
      }]);

      return _class;
    }(), _class.components
    /* #__PURE_CLASS_PROPERTY__ */
    = new WeakMap(), _class.options
    /* #__PURE_CLASS_PROPERTY__ */
    = {}, _temp;
  };

  var _default = removedComponent;
  _exports.default = _default;
});