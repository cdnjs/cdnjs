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

var _ListContext = _interopRequireDefault(require("../List/ListContext"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _listItemAvatarClasses = require("./listItemAvatarClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    alignItems,
    classes
  } = styleProps;
  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _listItemAvatarClasses.getListItemAvatarUtilityClass, classes);
};

const ListItemAvatarRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiListItemAvatar',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  minWidth: 56,
  flexShrink: 0
}, styleProps.alignItems === 'flex-start' && {
  marginTop: 8
}));
/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */

const ListItemAvatar = /*#__PURE__*/React.forwardRef(function ListItemAvatar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiListItemAvatar'
  });
  const {
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className"]);
  const context = React.useContext(_ListContext.default);
  const styleProps = (0, _extends2.default)({}, props, {
    alignItems: context.alignItems
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ListItemAvatarRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemAvatar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `Avatar`.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = ListItemAvatar;
exports.default = _default;