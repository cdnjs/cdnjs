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

var _unstyled = require("@material-ui/unstyled");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _cardActionsClasses = require("./cardActionsClasses");

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    classes,
    disableSpacing
  } = styleProps;
  const slots = {
    root: ['root', !disableSpacing && 'spacing']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _cardActionsClasses.getCardActionsUtilityClass, classes);
};

const CardActionsRoot = (0, _styled.default)('div', {
  name: 'MuiCardActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, styles.root, !styleProps.disableSpacing && styles.spacing);
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  display: 'flex',
  alignItems: 'center',
  padding: 8
}, !styleProps.disableSpacing && {
  '& > :not(:first-of-type)': {
    marginLeft: 8
  }
}));
const CardActions = /*#__PURE__*/React.forwardRef(function CardActions(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCardActions'
  });
  const {
    disableSpacing = false,
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["disableSpacing", "className"]);
  const styleProps = (0, _extends2.default)({}, props, {
    disableSpacing
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CardActionsRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? CardActions.propTypes
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = CardActions;
exports.default = _default;