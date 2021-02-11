import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Fade from '../Fade';
import { getBackdropUtilityClass } from './backdropClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, _extends({}, styleProps.invisible && styles.invisible));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      invisible = styleProps.invisible;
  var slots = {
    root: ['root', invisible && 'invisible']
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};

var BackdropRoot = experimentalStyled('div', {}, {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    // Improve scrollable dialog support.
    zIndex: -1,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent'
  }, styleProps.invisible && {
    backgroundColor: 'transparent'
  });
});
var Backdrop = /*#__PURE__*/React.forwardRef(function Backdrop(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiBackdrop'
  });

  var children = props.children,
      className = props.className,
      _props$invisible = props.invisible,
      invisible = _props$invisible === void 0 ? false : _props$invisible,
      open = props.open,
      transitionDuration = props.transitionDuration,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Fade : _props$TransitionComp,
      other = _objectWithoutProperties(props, ["children", "className", "invisible", "open", "transitionDuration", "TransitionComponent"]);

  var styleProps = _extends({}, props, {
    invisible: invisible
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other), /*#__PURE__*/React.createElement(BackdropRoot, {
    className: clsx(classes.root, className),
    "aria-hidden": true,
    ref: ref,
    styleProps: styleProps
  }, children));
});
process.env.NODE_ENV !== "production" ? Backdrop.propTypes = {
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
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
export default Backdrop;