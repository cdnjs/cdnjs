import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogContentUtilityClass } from './dialogContentClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(_extends({}, styleProps.dividers && styles.dividers), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    dividers
  } = styleProps;
  const slots = {
    root: ['root', dividers && 'dividers']
  };
  return composeClasses(slots, getDialogContentUtilityClass, classes);
};

const DialogContentRoot = experimentalStyled('div', {}, {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  flex: '1 1 auto',
  WebkitOverflowScrolling: 'touch',
  // Add iOS momentum scrolling.
  overflowY: 'auto',
  padding: '8px 24px',
  '&:first-of-type': {
    // dialog without title
    paddingTop: 20
  }
}, styleProps.dividers && {
  padding: '16px 24px',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`
}));
const DialogContent = /*#__PURE__*/React.forwardRef(function DialogContent(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDialogContent'
  });

  const {
    className,
    dividers = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "dividers"]);

  const styleProps = _extends({}, props, {
    dividers
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(DialogContentRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? DialogContent.propTypes
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
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default DialogContent;