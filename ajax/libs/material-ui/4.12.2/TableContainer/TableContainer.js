"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    overflowX: 'auto'
  }
};
exports.styles = styles;
var TableContainer = /*#__PURE__*/React.forwardRef(function TableContainer(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "component"]);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? TableContainer.propTypes = {
  /**
   * The table itself, normally `<Table />`
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .elementType
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTableContainer'
})(TableContainer);

exports.default = _default;