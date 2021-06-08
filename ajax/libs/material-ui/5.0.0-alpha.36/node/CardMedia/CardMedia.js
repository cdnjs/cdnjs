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

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _cardMediaClasses = require("./cardMediaClasses");

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    classes,
    isMediaComponent,
    isImageComponent
  } = styleProps;
  const slots = {
    root: ['root', isMediaComponent && 'media', isImageComponent && 'img']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _cardMediaClasses.getCardMediaUtilityClass, classes);
};

const CardMediaRoot = (0, _styled.default)('div', {
  name: 'MuiCardMedia',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    const {
      isMediaComponent,
      isImageComponent
    } = styleProps;
    return (0, _extends2.default)({}, styles.root, isMediaComponent && styles.media, isImageComponent && styles.img);
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  display: 'block',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}, styleProps.isMediaComponent && {
  width: '100%'
}, styleProps.isImageComponent && {
  // ⚠️ object-fit is not supported by IE11.
  objectFit: 'cover'
}));
const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];
const IMAGE_COMPONENTS = ['picture', 'img'];
const CardMedia = /*#__PURE__*/React.forwardRef(function CardMedia(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCardMedia'
  });
  const {
    children,
    className,
    component = 'div',
    image,
    src,
    style
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "component", "image", "src", "style"]);
  const isMediaComponent = MEDIA_COMPONENTS.indexOf(component) !== -1;
  const composedStyle = !isMediaComponent && image ? (0, _extends2.default)({
    backgroundImage: `url("${image}")`
  }, style) : style;
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    isMediaComponent,
    isImageComponent: IMAGE_COMPONENTS.indexOf(component) !== -1
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CardMediaRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    as: component,
    ref: ref,
    style: composedStyle,
    styleProps: styleProps,
    src: isMediaComponent ? image || src : undefined
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? CardMedia.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: (0, _utils.chainPropTypes)(_propTypes.default.node, props => {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error('Material-UI: Either `children`, `image`, `src` or `component` prop must be specified.');
    }

    return null;
  }),

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
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: _propTypes.default.string,

  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: _propTypes.default.string,

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = CardMedia;
exports.default = _default;