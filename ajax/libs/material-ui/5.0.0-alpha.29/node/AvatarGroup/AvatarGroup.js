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

var _reactIs = require("react-is");

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Avatar = _interopRequireDefault(require("../Avatar"));

var _avatarGroupClasses = _interopRequireWildcard(require("./avatarGroupClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const SPACINGS = {
  small: -16,
  medium: null
};

const overridesResolver = (props, styles) => {
  return (0, _utils.deepmerge)({
    [`& .${_avatarGroupClasses.default.avatar}`]: styles.avatar
  }, styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    avatar: ['avatar']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _avatarGroupClasses.getAvatarGroupUtilityClass, classes);
};

const AvatarGroupRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  [`& .MuiAvatar-root`]: {
    border: `2px solid ${theme.palette.background.default}`,
    boxSizing: 'content-box',
    marginLeft: -8,
    '&:last-child': {
      marginLeft: 0
    }
  },

  /* Styles applied to the root element. */
  display: 'flex',
  flexDirection: 'row-reverse'
}));
const AvatarGroupAvatar = (0, _experimentalStyled.default)(_Avatar.default, {}, {
  name: 'MuiAvatarGroup',
  slot: 'Avatar'
})(({
  theme
}) => ({
  border: `2px solid ${theme.palette.background.default}`,
  boxSizing: 'content-box',
  marginLeft: -8,
  '&:last-child': {
    marginLeft: 0
  }
}));
const AvatarGroup = /*#__PURE__*/React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiAvatarGroup'
  });
  const {
    children: childrenProp,
    className,
    max = 5,
    spacing = 'medium',
    variant = 'circular'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "max", "spacing", "variant"]);
  const clampedMax = max < 2 ? 2 : max;
  const styleProps = (0, _extends2.default)({}, props, {
    max,
    spacing,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  const children = React.Children.toArray(childrenProp).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The AvatarGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  });
  const extraAvatars = children.length > clampedMax ? children.length - clampedMax + 1 : 0;
  const marginLeft = spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(AvatarGroupRoot, (0, _extends2.default)({
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    children: [extraAvatars ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(AvatarGroupAvatar, {
      styleProps: styleProps,
      className: classes.avatar,
      style: {
        marginLeft
      },
      variant: variant,
      children: ["+", extraAvatars]
    }) : null, children.slice(0, children.length - extraAvatars).reverse().map(child => {
      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _clsx.default)(child.props.className, classes.avatar),
        style: (0, _extends2.default)({
          marginLeft
        }, child.props.style),
        variant: child.props.variant || variant
      });
    })]
  }));
});
process.env.NODE_ENV !== "production" ? AvatarGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The avatars to stack.
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
   * Max avatars to show before +x.
   * @default 5
   */
  max: (0, _utils.chainPropTypes)(_propTypes.default.number, props => {
    if (props.max < 2) {
      return new Error(['Material-UI: The prop `max` should be equal to 2 or above.', 'A value below is clamped to 2.'].join('\n'));
    }

    return null;
  }),

  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing: _propTypes.default.oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.number]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['circular', 'rounded', 'square']), _propTypes.default.string])
} : void 0;
var _default = AvatarGroup;
exports.default = _default;