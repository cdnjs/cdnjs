"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _HiddenJs = _interopRequireDefault(require("./HiddenJs"));

var _HiddenCss = _interopRequireDefault(require("./HiddenCss"));

/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props) {
  var _props$implementation = props.implementation,
      implementation = _props$implementation === void 0 ? 'js' : _props$implementation,
      _props$lgDown = props.lgDown,
      lgDown = _props$lgDown === void 0 ? false : _props$lgDown,
      _props$lgUp = props.lgUp,
      lgUp = _props$lgUp === void 0 ? false : _props$lgUp,
      _props$mdDown = props.mdDown,
      mdDown = _props$mdDown === void 0 ? false : _props$mdDown,
      _props$mdUp = props.mdUp,
      mdUp = _props$mdUp === void 0 ? false : _props$mdUp,
      _props$smDown = props.smDown,
      smDown = _props$smDown === void 0 ? false : _props$smDown,
      _props$smUp = props.smUp,
      smUp = _props$smUp === void 0 ? false : _props$smUp,
      _props$xlDown = props.xlDown,
      xlDown = _props$xlDown === void 0 ? false : _props$xlDown,
      _props$xlUp = props.xlUp,
      xlUp = _props$xlUp === void 0 ? false : _props$xlUp,
      _props$xsDown = props.xsDown,
      xsDown = _props$xsDown === void 0 ? false : _props$xsDown,
      _props$xsUp = props.xsUp,
      xsUp = _props$xsUp === void 0 ? false : _props$xsUp,
      other = (0, _objectWithoutProperties2.default)(props, ["implementation", "lgDown", "lgUp", "mdDown", "mdUp", "smDown", "smUp", "xlDown", "xlUp", "xsDown", "xsUp"]);

  if (implementation === 'js') {
    return /*#__PURE__*/React.createElement(_HiddenJs.default, (0, _extends2.default)({
      lgDown: lgDown,
      lgUp: lgUp,
      mdDown: mdDown,
      mdUp: mdUp,
      smDown: smDown,
      smUp: smUp,
      xlDown: xlDown,
      xlUp: xlUp,
      xsDown: xsDown,
      xsUp: xsUp
    }, other));
  }

  return /*#__PURE__*/React.createElement(_HiddenCss.default, (0, _extends2.default)({
    lgDown: lgDown,
    lgUp: lgUp,
    mdDown: mdDown,
    mdUp: mdUp,
    smDown: smDown,
    smUp: smUp,
    xlDown: xlDown,
    xlUp: xlUp,
    xsDown: xsDown,
    xsUp: xsUp
  }, other));
}

process.env.NODE_ENV !== "production" ? Hidden.propTypes = {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation: _propTypes.default.oneOf(['js', 'css']),

  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty component during the first mount.
   * You might want to use an heuristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * https://caniuse.com/#search=client%20hint
   */
  initialWidth: _propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * If `true`, screens this size and down will be hidden.
   */
  lgDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up will be hidden.
   */
  lgUp: _propTypes.default.bool,

  /**
   * If `true`, screens this size and down will be hidden.
   */
  mdDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up will be hidden.
   */
  mdUp: _propTypes.default.bool,

  /**
   * Hide the given breakpoint(s).
   */
  only: _propTypes.default.oneOfType([_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),

  /**
   * If `true`, screens this size and down will be hidden.
   */
  smDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up will be hidden.
   */
  smUp: _propTypes.default.bool,

  /**
   * If `true`, screens this size and down will be hidden.
   */
  xlDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up will be hidden.
   */
  xlUp: _propTypes.default.bool,

  /**
   * If `true`, screens this size and down will be hidden.
   */
  xsDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up will be hidden.
   */
  xsUp: _propTypes.default.bool
} : void 0;
var _default = Hidden;
exports.default = _default;