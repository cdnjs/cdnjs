import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
// A grid component using the following libs as inspiration.
//
// For the implementation:
// - https://getbootstrap.com/docs/4.3/layout/grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import requirePropFactory from '../utils/requirePropFactory';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import gridClasses, { getGridUtilityClass } from './gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";

function getOffset(val) {
  var parse = parseFloat(val);
  return "".concat(parse).concat(String(val).replace(String(parse), '') || 'px');
}

function generateGrid(globalStyles, theme, breakpoint, styleProps) {
  var size = styleProps[breakpoint];
  if (!size) return;
  var styles = {};

  if (size === true) {
    // For the auto layouting
    styles = {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%'
    };
  } else if (size === 'auto') {
    styles = {
      flexBasis: 'auto',
      flexGrow: 0,
      maxWidth: 'none'
    };
  } else {
    // Keep 7 significant numbers.
    var width = "".concat(Math.round(size / 12 * 10e7) / 10e5, "%");
    var more = {};

    if (styleProps.container && styleProps.item && styleProps.spacing !== 0) {
      var themeSpacing = theme.spacing(styleProps.spacing);

      if (themeSpacing !== '0px') {
        var fullWidth = "calc(".concat(width, " + ").concat(getOffset(themeSpacing), ")");
        more = {
          flexBasis: fullWidth,
          maxWidth: fullWidth
        };
      }
    } // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41


    styles = _extends({
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    }, more);
  } // No need for a media query for the first size.


  if (theme.breakpoints.values[breakpoint] === 0) {
    _extends(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateGap(_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var container = styleProps.container,
      spacing = styleProps.spacing;
  var styles = {};

  if (container && spacing !== 0) {
    var themeSpacing = theme.spacing(spacing);

    if (themeSpacing !== '0px') {
      styles = _defineProperty({
        width: "calc(100% + ".concat(getOffset(themeSpacing), ")"),
        marginTop: "-".concat(getOffset(themeSpacing)),
        marginLeft: "-".concat(getOffset(themeSpacing))
      }, "& > .".concat(gridClasses.item), {
        paddingTop: getOffset(themeSpacing),
        paddingLeft: getOffset(themeSpacing)
      });
    }
  }

  return styles;
}

var overridesResolver = function overridesResolver(props, styles) {
  var _props$styleProps = props.styleProps,
      container = _props$styleProps.container,
      direction = _props$styleProps.direction,
      item = _props$styleProps.item,
      lg = _props$styleProps.lg,
      md = _props$styleProps.md,
      sm = _props$styleProps.sm,
      spacing = _props$styleProps.spacing,
      wrap = _props$styleProps.wrap,
      xl = _props$styleProps.xl,
      xs = _props$styleProps.xs,
      zeroMinWidth = _props$styleProps.zeroMinWidth;
  return deepmerge(_extends({}, container && styles.container, item && styles.item, zeroMinWidth && styles.zeroMinWidth, container && spacing !== 0 && styles["spacing-xs-".concat(String(spacing))], direction !== 'row' && styles["direction-xs-".concat(String(direction))], wrap !== 'wrap' && styles["wrap-xs-".concat(String(wrap))], xs !== false && styles["grid-xs-".concat(String(xs))], sm !== false && styles["grid-sm-".concat(String(sm))], md !== false && styles["grid-md-".concat(String(md))], lg !== false && styles["grid-lg-".concat(String(lg))], xl !== false && styles["grid-xl-".concat(String(xl))]), styles.root || {});
}; // Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',


var GridRoot = experimentalStyled('div', {}, {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref2) {
  var styleProps = _ref2.styleProps;
  return _extends({
    boxSizing: 'border-box'
  }, styleProps.container && {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }, styleProps.item && {
    margin: 0 // For instance, it's useful when used with a `figure` element.

  }, styleProps.zeroMinWidth && {
    minWidth: 0
  }, styleProps.direction === 'column' && _defineProperty({
    flexDirection: 'column'
  }, "& > .".concat(gridClasses.item), {
    maxWidth: 'none'
  }), styleProps.direction === 'column-reverse' && _defineProperty({
    flexDirection: 'column-reverse'
  }, "& > .".concat(gridClasses.item), {
    maxWidth: 'none'
  }), styleProps.direction === 'row-reverse' && {
    flexDirection: 'row-reverse'
  }, styleProps.wrap === 'nowrap' && {
    flexWrap: 'nowrap'
  }, styleProps.wrap === 'reverse' && {
    flexWrap: 'wrap-reverse'
  });
}, generateGap, function (_ref5) {
  var theme = _ref5.theme,
      styleProps = _ref5.styleProps;
  return theme.breakpoints.keys.reduce(function (globalStyles, breakpoint) {
    // Use side effect over immutability for better performance.
    generateGrid(globalStyles, theme, breakpoint, styleProps);
    return globalStyles;
  }, {});
});

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      container = styleProps.container,
      direction = styleProps.direction,
      item = styleProps.item,
      lg = styleProps.lg,
      md = styleProps.md,
      sm = styleProps.sm,
      spacing = styleProps.spacing,
      wrap = styleProps.wrap,
      xl = styleProps.xl,
      xs = styleProps.xs,
      zeroMinWidth = styleProps.zeroMinWidth;
  var slots = {
    root: ['root', container && 'container', item && 'item', zeroMinWidth && 'zeroMinWidth', container && spacing !== 0 && "spacing-xs-".concat(String(spacing)), direction !== 'row' && "direction-xs-".concat(String(direction)), wrap !== 'wrap' && "wrap-xs-".concat(String(wrap)), xs !== false && "grid-xs-".concat(String(xs)), sm !== false && "grid-sm-".concat(String(sm)), md !== false && "grid-md-".concat(String(md)), lg !== false && "grid-lg-".concat(String(lg)), xl !== false && "grid-xl-".concat(String(xl))]
  };
  return composeClasses(slots, getGridUtilityClass, classes);
};

var Grid = /*#__PURE__*/React.forwardRef(function Grid(inProps, ref) {
  var themeProps = useThemeProps({
    props: inProps,
    name: 'MuiGrid'
  });
  var props = extendSxProp(themeProps);

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$container = props.container,
      container = _props$container === void 0 ? false : _props$container,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'row' : _props$direction,
      _props$item = props.item,
      item = _props$item === void 0 ? false : _props$item,
      _props$lg = props.lg,
      lg = _props$lg === void 0 ? false : _props$lg,
      _props$md = props.md,
      md = _props$md === void 0 ? false : _props$md,
      _props$sm = props.sm,
      sm = _props$sm === void 0 ? false : _props$sm,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 0 : _props$spacing,
      _props$wrap = props.wrap,
      wrap = _props$wrap === void 0 ? 'wrap' : _props$wrap,
      _props$xl = props.xl,
      xl = _props$xl === void 0 ? false : _props$xl,
      _props$xs = props.xs,
      xs = _props$xs === void 0 ? false : _props$xs,
      _props$zeroMinWidth = props.zeroMinWidth,
      zeroMinWidth = _props$zeroMinWidth === void 0 ? false : _props$zeroMinWidth,
      other = _objectWithoutProperties(props, ["className", "component", "container", "direction", "item", "lg", "md", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"]);

  var styleProps = _extends({}, props, {
    container: container,
    direction: direction,
    item: item,
    lg: lg,
    md: md,
    sm: sm,
    spacing: spacing,
    wrap: wrap,
    xl: xl,
    xs: xs,
    zeroMinWidth: zeroMinWidth
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(GridRoot, _extends({
    styleProps: styleProps,
    className: clsx(classes.root, className),
    as: component,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Grid.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: PropTypes.bool,

  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),

  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item: PropTypes.bool,

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg: PropTypes.oneOfType([PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), PropTypes.bool]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: PropTypes.oneOfType([PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), PropTypes.bool]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: PropTypes.oneOfType([PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), PropTypes.bool]),

  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   * @default false
   */
  xl: PropTypes.oneOfType([PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), PropTypes.bool]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: PropTypes.oneOfType([PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), PropTypes.bool]),

  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth: PropTypes.bool
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  var requireProp = requirePropFactory('Grid', Grid); // eslint-disable-next-line no-useless-concat

  Grid['propTypes' + ''] = _extends({}, Grid.propTypes, {
    direction: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('item')
  });
}

export default Grid;