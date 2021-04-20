import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepConnectorClasses, { getStepConnectorUtilityClass } from './stepConnectorClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel, styleProps.completed && styles.completed, _defineProperty({}, "& .".concat(stepConnectorClasses.line), _extends({}, styles.line, styles["line".concat(capitalize(styleProps.orientation))]))), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation,
      alternativeLabel = styleProps.alternativeLabel,
      active = styleProps.active,
      completed = styleProps.completed,
      disabled = styleProps.disabled;
  var slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', active && 'active', completed && 'completed', disabled && 'disabled'],
    line: ['line', "line".concat(capitalize(orientation))]
  };
  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};

var StepConnectorRoot = experimentalStyled('div', {}, {
  name: 'MuiStepConnector',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    flex: '1 1 auto'
  }, styleProps.orientation === 'vertical' && {
    marginLeft: 12 // half icon

  }, styleProps.alternativeLabel && {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  });
});
var StepConnectorLine = experimentalStyled('span', {}, {
  name: 'MuiStepConnector',
  slot: 'Line'
})(function (_ref2) {
  var styleProps = _ref2.styleProps,
      theme = _ref2.theme;
  return _extends({
    /* Styles applied to the line element. */
    display: 'block',
    borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  }, styleProps.orientation === 'horizontal' && {
    borderTopStyle: 'solid',
    borderTopWidth: 1
  }, styleProps.orientation === 'vertical' && {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24
  });
});
var StepConnector = /*#__PURE__*/React.forwardRef(function StepConnector(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepConnector'
  });

  var className = props.className,
      other = _objectWithoutProperties(props, ["className"]);

  var _React$useContext = React.useContext(StepperContext),
      alternativeLabel = _React$useContext.alternativeLabel,
      _React$useContext$ori = _React$useContext.orientation,
      orientation = _React$useContext$ori === void 0 ? 'horizontal' : _React$useContext$ori;

  var _React$useContext2 = React.useContext(StepContext),
      active = _React$useContext2.active,
      disabled = _React$useContext2.disabled,
      completed = _React$useContext2.completed;

  var styleProps = _extends({}, props, {
    alternativeLabel: alternativeLabel,
    orientation: orientation,
    active: active,
    completed: completed,
    disabled: disabled
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(StepConnectorRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/_jsx(StepConnectorLine, {
      className: classes.line,
      styleProps: styleProps
    })
  }));
});
process.env.NODE_ENV !== "production" ? StepConnector.propTypes
/* remove-proptypes */
= {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default StepConnector;