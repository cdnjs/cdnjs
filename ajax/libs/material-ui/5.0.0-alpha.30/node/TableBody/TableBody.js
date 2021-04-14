"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _Tablelvl2Context = _interopRequireDefault(require("../Table/Tablelvl2Context"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _tableBodyClasses = require("./tableBodyClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => styles.root || {};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tableBodyClasses.getTableBodyUtilityClass, classes);
};

const TableBodyRoot = (0, _experimentalStyled.default)('tbody', {}, {
  name: 'MuiTableBody',
  slot: 'Root',
  overridesResolver
})({
  /* Styles applied to the root element. */
  display: 'table-row-group'
});
const tablelvl2 = {
  variant: 'body'
};
const defaultComponent = 'tbody';
const TableBody = /*#__PURE__*/React.forwardRef(function TableBody(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTableBody'
  });
  const {
    className,
    component = defaultComponent
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "component"]);
  const styleProps = (0, _extends2.default)({}, props, {
    component
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tablelvl2Context.default.Provider, {
    value: tablelvl2,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TableBodyRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, className),
      as: component,
      ref: ref,
      role: component === defaultComponent ? null : 'rowgroup',
      styleProps: styleProps
    }, other))
  });
});
process.env.NODE_ENV !== "production" ? TableBody.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally `TableRow`.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = TableBody;
exports.default = _default;