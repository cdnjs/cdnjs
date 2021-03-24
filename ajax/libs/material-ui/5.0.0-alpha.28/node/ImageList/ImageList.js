"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _imageListClasses = require("./imageListClasses");

var _ImageListContext = _interopRequireDefault(require("./ImageListContext"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styles[styleProps.variant]), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant
  } = styleProps;
  const slots = {
    root: ['root', variant]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _imageListClasses.getImageListUtilityClass, classes);
};

const ImageListRoot = (0, _experimentalStyled.default)('ul', {}, {
  name: 'MuiImageList',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => {
  /* Styles applied to the root element. */
  return (0, _extends2.default)({
    display: 'grid',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch'
  }, styleProps.variant === 'masonry' && {
    display: 'block'
  });
});
const ImageList = /*#__PURE__*/React.forwardRef(function ImageList(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiImageList'
  });
  const {
    children,
    className,
    cols = 2,
    component = 'ul',
    rowHeight = 'auto',
    gap = 4,
    style: styleProp,
    variant = 'standard'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "cols", "component", "rowHeight", "gap", "style", "variant"]);
  const contextValue = React.useMemo(() => ({
    rowHeight,
    gap,
    variant
  }), [rowHeight, gap, variant]);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Detect Internet Explorer 8+
      if (document !== undefined && 'objectFit' in document.documentElement.style === false) {
        console.error(['Material-UI: ImageList v5+ no longer natively supports Internet Explorer.', 'Use v4 of this component instead, or polyfill CSS object-fit.'].join('\n'));
      }
    }
  }, []);
  const style = variant === 'masonry' ? (0, _extends2.default)({
    columnCount: cols,
    columnGap: gap
  }, styleProp) : (0, _extends2.default)({
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap
  }, styleProp);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    gap,
    rowHeight,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ImageListRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, classes[variant], className),
    ref: ref,
    style: style,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageListContext.default.Provider, {
      value: contextValue,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? ImageList.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally `ImageListItem`s.
   */
  children: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Number of columns.
   * @default 2
   */
  cols: _utils.integerPropType,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The gap between items in px.
   * @default 4
   */
  gap: _propTypes.default.number,

  /**
   * The height of one row in px.
   * @default 'auto'
   */
  rowHeight: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['masonry', 'quilted', 'standard', 'woven']), _propTypes.default.string])
} : void 0;
var _default = ImageList;
exports.default = _default;