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

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.

  }
};
exports.styles = styles;
var GridList = /*#__PURE__*/React.forwardRef(function GridList(props, ref) {
  var _props$cellHeight = props.cellHeight,
      cellHeight = _props$cellHeight === void 0 ? 180 : _props$cellHeight,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$cols = props.cols,
      cols = _props$cols === void 0 ? 2 : _props$cols,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'ul' : _props$component,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 4 : _props$spacing,
      style = props.style,
      other = (0, _objectWithoutProperties2.default)(props, ["cellHeight", "children", "classes", "className", "cols", "component", "spacing", "style"]);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    style: (0, _extends2.default)({
      margin: -spacing / 2
    }, style)
  }, other), React.Children.map(children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The GridList component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    var childCols = child.props.cols || 1;
    var childRows = child.props.rows || 1;
    return /*#__PURE__*/React.cloneElement(child, {
      style: (0, _extends2.default)({
        width: "".concat(100 / cols * childCols, "%"),
        height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
        padding: spacing / 2
      }, child.props.style)
    });
  }));
});
process.env.NODE_ENV !== "production" ? GridList.propTypes = {
  /**
   * Number of px for one cell height.
   * You can set `'auto'` if you want to let the children determine the height.
   */
  cellHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.oneOf(['auto'])]),

  /**
   * Grid Tiles that will be in Grid List.
   */
  children: _propTypes.default.node.isRequired,

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
   * Number of columns.
   */
  cols: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * Number of px for the spacing between tiles.
   */
  spacing: _propTypes.default.number,

  /**
   * @ignore
   */
  style: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiGridList'
})(GridList);

exports.default = _default;