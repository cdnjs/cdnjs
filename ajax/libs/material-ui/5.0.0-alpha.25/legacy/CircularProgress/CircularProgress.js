import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { keyframes } from '@material-ui/styled-engine';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import circularProgressClasses, { getCircularProgressUtilityClass } from './circularProgressClasses';
var SIZE = 44;
var circularRotateKeyframe = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n0% {\n  transform: rotate(0deg);\n}\n100% {\n  transform: rotate(360deg);\n}\n"])));
var circularDashKeyframe = keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n0% {\n  stroke-dasharray: 1px, 200px;\n  stroke-dashoffset: 0px;\n}\n50% {\n  stroke-dasharray: 100px, 200px;\n  stroke-dashoffset: -15px;\n}\n100% {\n  stroke-dasharray: 100px, 200px;\n  stroke-dashoffset: -125px;\n}\n"])));

var overridesResolver = function overridesResolver(props, styles) {
  var _extends2;

  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, _extends({}, styles[styleProps.variant], styles["color".concat(capitalize(styleProps.color))], (_extends2 = {}, _defineProperty(_extends2, "& .".concat(circularProgressClasses.svg), styles.svg), _defineProperty(_extends2, "& .".concat(circularProgressClasses.circle), _extends({}, styles.circle, styles["circle".concat(capitalize(styleProps.variant))], styleProps.disableShrink && styles.circleDisableShrink)), _extends2)));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant,
      color = styleProps.color,
      disableShrink = styleProps.disableShrink;
  var slots = {
    root: ['root', variant, "color".concat(capitalize(color))],
    svg: ['svg'],
    circle: ['circle', "circle".concat(capitalize(variant)), disableShrink && 'circleDisableShrink']
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
}; // This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.


var CircularProgressRoot = experimentalStyled('span', {}, {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: overridesResolver
})(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: inline-block;\n\n  transition: ", ";\n\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-timing-function: ", ";\n  animation-iteration-count: ", ";\n    \n  color: ", ";\n"])), function (_ref) {
  var styleProps = _ref.styleProps,
      theme = _ref.theme;
  return styleProps.variant === 'determinate' ? theme.transitions.create('transform') : undefined;
}, function (_ref2) {
  var styleProps = _ref2.styleProps;
  return styleProps.variant === 'indeterminate' && circularRotateKeyframe;
}, function (_ref3) {
  var styleProps = _ref3.styleProps;
  return styleProps.variant === 'indeterminate' && '1.4s';
}, function (_ref4) {
  var styleProps = _ref4.styleProps;
  return styleProps.variant === 'indeterminate' && 'linear';
}, function (_ref5) {
  var styleProps = _ref5.styleProps;
  return styleProps.variant === 'indeterminate' && 'infinite';
}, function (_ref6) {
  var styleProps = _ref6.styleProps,
      theme = _ref6.theme;
  return styleProps.color === 'primary' || styleProps.color === 'secondary' ? theme.palette[styleProps.color].main : undefined;
});
var CircularProgressSVG = experimentalStyled('svg', {}, {
  name: 'MuiCircularProgress',
  slot: 'Svg'
})({
  /* Styles applied to the svg element. */
  display: 'block' // Keeps the progress centered

}); // This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.

var CircularProgressCircle = experimentalStyled('circle', {}, {
  name: 'MuiCircularProgress',
  slot: 'Circle'
})(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  stroke: currentColor;\n\n  transition: ", ";\n\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-timing-function: ", ";\n  animation-iteration-count: ", ";\n  stroke-dasharray: ", ";\n  stroke-dashoffset: ", ";\n"])), function (_ref7) {
  var styleProps = _ref7.styleProps,
      theme = _ref7.theme;
  return styleProps.variant === 'determinate' ? theme.transitions.create('stroke-dashoffset') : undefined;
}, function (_ref8) {
  var styleProps = _ref8.styleProps;

  if (styleProps.disableShrink) {
    return 'none';
  }

  return styleProps.variant === 'indeterminate' ? circularDashKeyframe : undefined;
}, function (_ref9) {
  var styleProps = _ref9.styleProps;
  return styleProps.variant === 'indeterminate' && '1.4s';
}, function (_ref10) {
  var styleProps = _ref10.styleProps;
  return styleProps.variant === 'indeterminate' && 'ease-in-out';
}, function (_ref11) {
  var styleProps = _ref11.styleProps;
  return styleProps.variant === 'indeterminate' && 'infinite';
}, function (_ref12) {
  var styleProps = _ref12.styleProps;
  return styleProps.variant === 'indeterminate' && '80px, 200px';
}, function (_ref13) {
  var styleProps = _ref13.styleProps;
  return styleProps.variant === 'indeterminate' && '0px';
});
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

var CircularProgress = /*#__PURE__*/React.forwardRef(function CircularProgress(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCircularProgress'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$disableShrink = props.disableShrink,
      disableShrink = _props$disableShrink === void 0 ? false : _props$disableShrink,
      _props$size = props.size,
      size = _props$size === void 0 ? 40 : _props$size,
      style = props.style,
      _props$thickness = props.thickness,
      thickness = _props$thickness === void 0 ? 3.6 : _props$thickness,
      _props$value = props.value,
      value = _props$value === void 0 ? 0 : _props$value,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'indeterminate' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"]);

  var styleProps = _extends({}, props, {
    color: color,
    disableShrink: disableShrink,
    size: size,
    thickness: thickness,
    value: value,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var circleStyle = {};
  var rootStyle = {};
  var rootProps = {};

  if (variant === 'determinate') {
    var circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = "".concat(((100 - value) / 100 * circumference).toFixed(3), "px");
    rootStyle.transform = 'rotate(-90deg)';
  }

  return /*#__PURE__*/React.createElement(CircularProgressRoot, _extends({
    className: clsx(classes.root, className),
    style: _extends({
      width: size,
      height: size
    }, rootStyle, style),
    styleProps: styleProps,
    ref: ref,
    role: "progressbar"
  }, rootProps, other), /*#__PURE__*/React.createElement(CircularProgressSVG, {
    className: classes.svg,
    styleProps: styleProps,
    viewBox: "".concat(SIZE / 2, " ").concat(SIZE / 2, " ").concat(SIZE, " ").concat(SIZE)
  }, /*#__PURE__*/React.createElement(CircularProgressCircle, {
    className: classes.circle,
    style: circleStyle,
    styleProps: styleProps,
    cx: SIZE,
    cy: SIZE,
    r: (SIZE - thickness) / 2,
    fill: "none",
    strokeWidth: thickness
  })));
});
process.env.NODE_ENV !== "production" ? CircularProgress.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),

  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, function (props) {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error('Material-UI: You have provided the `disableShrink` prop ' + 'with a variant other than `indeterminate`. This will have no effect.');
    }

    return null;
  }),

  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: PropTypes.number,

  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number,

  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate'])
} : void 0;
export default CircularProgress;