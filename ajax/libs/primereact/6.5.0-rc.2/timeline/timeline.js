this.primereact = this.primereact || {};
this.primereact.timeline = (function (exports, React, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
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

  var propTypes = {exports: {}};

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = ReactPropTypesSecret_1;

  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  var factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
      );
      err.name = 'Invariant Violation';
      throw err;
    }  shim.isRequired = shim;
    function getShim() {
      return shim;
    }  // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,

      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };

    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    propTypes.exports = factoryWithThrowingShims();
  }

  var PropTypes = propTypes.exports;

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Timeline = /*#__PURE__*/function (_Component) {
    _inherits(Timeline, _Component);

    var _super = _createSuper(Timeline);

    function Timeline() {
      _classCallCheck(this, Timeline);

      return _super.apply(this, arguments);
    }

    _createClass(Timeline, [{
      key: "getKey",
      value: function getKey(item, index) {
        return this.props.dataKey ? utils.ObjectUtils.resolveFieldData(item, this.props.dataKey) : "pr_id__".concat(index);
      }
    }, {
      key: "renderEvents",
      value: function renderEvents() {
        var _this = this;

        return this.props.value && this.props.value.map(function (item, index) {
          var opposite = utils.ObjectUtils.getJSXElement(_this.props.opposite, item, index);
          var marker = utils.ObjectUtils.getJSXElement(_this.props.marker, item, index) || /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-timeline-event-marker"
          });
          var connector = index !== _this.props.value.length - 1 && /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-timeline-event-connector"
          });
          var content = utils.ObjectUtils.getJSXElement(_this.props.content, item, index);
          return /*#__PURE__*/React__default['default'].createElement("div", {
            key: _this.getKey(item, index),
            className: "p-timeline-event"
          }, /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-timeline-event-opposite"
          }, opposite), /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-timeline-event-separator"
          }, marker, connector), /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-timeline-event-content"
          }, content));
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _classNames;

        var containerClassName = utils.classNames('p-timeline p-component', (_classNames = {}, _defineProperty(_classNames, "p-timeline-".concat(this.props.align), true), _defineProperty(_classNames, "p-timeline-".concat(this.props.layout), true), _classNames), this.props.className);
        var events = this.renderEvents();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: containerClassName,
          style: this.props.style
        }, events);
      }
    }]);

    return Timeline;
  }(React.Component);

  _defineProperty(Timeline, "defaultProps", {
    id: null,
    value: null,
    align: 'left',
    layout: 'vertical',
    dataKey: null,
    className: null,
    style: null,
    opposite: null,
    marker: null,
    content: null
  });

  _defineProperty(Timeline, "propTypes", {
    id: PropTypes.string,
    value: PropTypes.array,
    align: PropTypes.string,
    layout: PropTypes.string,
    dataKey: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    opposite: PropTypes.any,
    marker: PropTypes.any,
    content: PropTypes.any
  });

  exports.Timeline = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.utils));
