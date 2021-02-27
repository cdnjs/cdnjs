"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

const styles = theme => ({
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create()
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main
  },
  vertical: {
    height: '100%',
    width: 2,
    right: 0
  }
});
/**
 * @ignore - internal component.
 */


exports.styles = styles;
const TabIndicator = /*#__PURE__*/React.forwardRef(function TabIndicator(props, ref) {
  const {
    classes,
    className,
    color,
    orientation
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "color", "orientation"]);
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[`color${(0, _capitalize.default)(color)}`], className, orientation === 'vertical' && classes.vertical),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? TabIndicator.propTypes = {
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
   * @ignore
   * The color of the tab indicator.
   */
  color: _propTypes.default.oneOf(['primary', 'secondary']).isRequired,

  /**
   * The component orientation (layout flow direction).
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']).isRequired
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateTabIndicator'
})(TabIndicator);

exports.default = _default;