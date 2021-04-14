"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _TableContext = _interopRequireDefault(require("./TableContext"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _tableClasses = require("./tableClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.stickyHeader && styles.stickyHeader), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    stickyHeader
  } = styleProps;
  const slots = {
    root: ['root', stickyHeader && 'stickyHeader']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tableClasses.getTableUtilityClass, classes);
};

const TableRoot = (0, _experimentalStyled.default)('table', {}, {
  name: 'MuiTable',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
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
}, styleProps.stickyHeader && {
  borderCollapse: 'separate'
}));
const defaultComponent = 'table';
const Table = /*#__PURE__*/React.forwardRef(function Table(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTable'
  });
  const {
    className,
    component = defaultComponent,
    padding = 'default',
    size = 'medium',
    stickyHeader = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "component", "padding", "size", "stickyHeader"]);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    padding,
    size,
    stickyHeader
  });
  const classes = useUtilityClasses(styleProps);
  const table = React.useMemo(() => ({
    padding,
    size,
    stickyHeader
  }), [padding, size, stickyHeader]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableContext.default.Provider, {
    value: table,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TableRoot, (0, _extends2.default)({
      as: component,
      role: component === defaultComponent ? null : 'table',
      ref: ref,
      className: (0, _clsx.default)(classes.root, className),
      styleProps: styleProps
    }, other))
  });
});
process.env.NODE_ENV !== "production" ? Table.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the table, normally `TableHead` and `TableBody`.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Allows TableCells to inherit padding of the Table.
   * @default 'default'
   */
  padding: _propTypes.default.oneOf(['checkbox', 'default', 'none']),

  /**
   * Allows TableCells to inherit size of the Table.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['medium', 'small']),

  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE11.
   * @default false
   */
  stickyHeader: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Table;
exports.default = _default;