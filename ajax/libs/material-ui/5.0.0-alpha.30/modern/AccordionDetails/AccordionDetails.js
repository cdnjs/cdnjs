import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getAccordionDetailsUtilityClass } from './accordionDetailsClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const overridesResolver = (props, styles) => {
  return styles.root || {};
};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};

const AccordionDetailsRoot = experimentalStyled('div', {}, {
  name: 'MuiAccordionDetails',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  /* Styles applied to the root element. */
  padding: theme.spacing(1, 2, 2)
}));
const AccordionDetails = /*#__PURE__*/React.forwardRef(function AccordionDetails(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAccordionDetails'
  });

  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className"]); // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed


  const styleProps = _extends({}, props);

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(AccordionDetailsRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? AccordionDetails.propTypes
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default AccordionDetails;