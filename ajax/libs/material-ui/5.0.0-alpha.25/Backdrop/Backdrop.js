import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
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

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styleProps.invisible && styles.invisible));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    invisible
  } = styleProps;
  const slots = {
    root: ['root', invisible && 'invisible']
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const BackdropRoot = experimentalStyled('div', {}, {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => _extends({
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
}));
const Backdrop = /*#__PURE__*/React.forwardRef(function Backdrop(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiBackdrop'
  });

  const {
    children,
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Fade
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "className", "invisible", "open", "transitionDuration", "TransitionComponent"]);

  const styleProps = _extends({}, props, {
    invisible
  });

  const classes = useUtilityClasses(styleProps);
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