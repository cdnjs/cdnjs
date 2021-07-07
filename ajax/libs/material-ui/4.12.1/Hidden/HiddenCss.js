"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var styles = function styles(theme) {
  var hidden = {
    display: 'none'
  };
  return theme.breakpoints.keys.reduce(function (acc, key) {
    acc["only".concat((0, _capitalize.default)(key))] = (0, _defineProperty2.default)({}, theme.breakpoints.only(key), hidden);
    acc["".concat(key, "Up")] = (0, _defineProperty2.default)({}, theme.breakpoints.up(key), hidden);
    acc["".concat(key, "Down")] = (0, _defineProperty2.default)({}, theme.breakpoints.down(key), hidden);
    return acc;
  }, {});
};
/**
 * @ignore - internal component.
 */


function HiddenCss(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      only = props.only,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "only"]);
  var theme = (0, _useTheme.default)();

  if (process.env.NODE_ENV !== 'production') {
    var unknownProps = Object.keys(other).filter(function (propName) {
      var isUndeclaredBreakpoint = !theme.breakpoints.keys.some(function (breakpoint) {
        return "".concat(breakpoint, "Up") === propName || "".concat(breakpoint, "Down") === propName;
      });
      return isUndeclaredBreakpoint;
    });

    if (unknownProps.length > 0) {
      console.error("Material-UI: Unsupported props received by `<Hidden implementation=\"css\" />`: ".concat(unknownProps.join(', '), ". Did you forget to wrap this component in a ThemeProvider declaring these breakpoints?"));
    }
  }

  var clsx = [];

  if (className) {
    clsx.push(className);
  }

  for (var i = 0; i < theme.breakpoints.keys.length; i += 1) {
    var breakpoint = theme.breakpoints.keys[i];
    var breakpointUp = props["".concat(breakpoint, "Up")];
    var breakpointDown = props["".concat(breakpoint, "Down")];

    if (breakpointUp) {
      clsx.push(classes["".concat(breakpoint, "Up")]);
    }

    if (breakpointDown) {
      clsx.push(classes["".concat(breakpoint, "Down")]);
    }
  }

  if (only) {
    var onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(function (breakpoint) {
      clsx.push(classes["only".concat((0, _capitalize.default)(breakpoint))]);
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: clsx.join(' ')
  }, children);
}

process.env.NODE_ENV !== "production" ? HiddenCss.propTypes = {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

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

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateHiddenCss'
})(HiddenCss);

exports.default = _default;