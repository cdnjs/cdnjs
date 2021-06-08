"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var _setRef = _interopRequireDefault(require("../utils/setRef"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [FAQ: How can I access the DOM element?](/getting-started/faq/#how-can-i-access-the-dom-element)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * function MyComponent() {
 *   const domRef = React.useRef();
 *
 *   React.useEffect(() => {
 *     console.log(domRef.current); // DOM node
 *   }, []);
 *
 *   return (
 *     <RootRef rootRef={domRef}>
 *       <SomeChildComponent />
 *     </RootRef>
 *   );
 * }
 * ```
 */
var RootRef = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(RootRef, _React$Component);

  var _super = _createSuper(RootRef);

  function RootRef() {
    (0, _classCallCheck2.default)(this, RootRef);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(RootRef, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ref = ReactDOM.findDOMNode(this);
      (0, _setRef.default)(this.props.rootRef, this.ref);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ref = ReactDOM.findDOMNode(this);

      if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
        if (prevProps.rootRef !== this.props.rootRef) {
          (0, _setRef.default)(prevProps.rootRef, null);
        }

        this.ref = ref;
        (0, _setRef.default)(this.props.rootRef, this.ref);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ref = null;
      (0, _setRef.default)(this.props.rootRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return RootRef;
}(React.Component);

process.env.NODE_ENV !== "production" ? RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: _propTypes.default.element.isRequired,

  /**
   * A ref that points to the first DOM node of the wrapped element.
   */
  rootRef: _utils.refType.isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? RootRef.propTypes = (0, _utils.exactProp)(RootRef.propTypes) : void 0;
}

var _default = RootRef;
exports.default = _default;