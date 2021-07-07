"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _TableContext = _interopRequireDefault(require("./TableContext"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'table',
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      '& caption': (0, _extends2.default)({}, theme.typography.body2, {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        captionSide: 'bottom'
      })
    },

    /* Styles applied to the root element if `stickyHeader={true}`. */
    stickyHeader: {
      borderCollapse: 'separate'
    }
  };
};

exports.styles = styles;
var defaultComponent = 'table';
var Table = /*#__PURE__*/React.forwardRef(function Table(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? defaultComponent : _props$component,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? 'normal' : _props$padding,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$stickyHeader = props.stickyHeader,
      stickyHeader = _props$stickyHeader === void 0 ? false : _props$stickyHeader,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "component", "padding", "size", "stickyHeader"]);
  var table = React.useMemo(function () {
    return {
      padding: padding,
      size: size,
      stickyHeader: stickyHeader
    };
  }, [padding, size, stickyHeader]);
  return /*#__PURE__*/React.createElement(_TableContext.default.Provider, {
    value: table
  }, /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    role: Component === defaultComponent ? null : 'table',
    ref: ref,
    className: (0, _clsx.default)(classes.root, className, stickyHeader && classes.stickyHeader)
  }, other)));
});
process.env.NODE_ENV !== "production" ? Table.propTypes = {
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * Allows TableCells to inherit padding of the Table.
   * `default` is deprecated, use `normal` instead.
   */
  padding: (0, _utils.chainPropTypes)(_propTypes.default.oneOf(['normal', 'checkbox', 'none', 'default']), function (props) {
    if (props.padding === 'default') {
      return new Error('Material-UI: padding="default" was renamed to padding="normal" for consistency.');
    }

    return null;
  }),

  /**
   * Allows TableCells to inherit size of the Table.
   */
  size: _propTypes.default.oneOf(['small', 'medium']),

  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE 11.
   */
  stickyHeader: _propTypes.default.bool
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTable'
})(Table);

exports.default = _default;