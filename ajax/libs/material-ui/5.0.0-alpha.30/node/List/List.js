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

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _ListContext = _interopRequireDefault(require("./ListContext"));

var _listClasses = require("./listClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, !styleProps.disablePadding && styles.padding, styleProps.dense && styles.dense, styleProps.subheader && styles.subheader), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = styleProps;
  const slots = {
    root: ['root', !disablePadding && 'padding', dense && 'dense', subheader && 'subheader']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _listClasses.getListUtilityClass, classes);
};

const ListRoot = (0, _experimentalStyled.default)('ul', {}, {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative'
}, !styleProps.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, styleProps.subheader && {
  paddingTop: 0
}));
const List = /*#__PURE__*/React.forwardRef(function List(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiList'
  });
  const {
    children,
    className,
    component = 'ul',
    dense = false,
    disablePadding = false,
    subheader
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "component", "dense", "disablePadding", "subheader"]);
  const context = React.useMemo(() => ({
    dense
  }), [dense]);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    dense,
    disablePadding
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.default.Provider, {
    value: context,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ListRoot, (0, _extends2.default)({
      as: component,
      className: (0, _clsx.default)(classes.root, className),
      ref: ref,
      styleProps: styleProps
    }, other, {
      children: [subheader, children]
    }))
  });
});
process.env.NODE_ENV !== "production" ? List.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
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
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: _propTypes.default.bool,

  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: _propTypes.default.bool,

  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = List;
exports.default = _default;