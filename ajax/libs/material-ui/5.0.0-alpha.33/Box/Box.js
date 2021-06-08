import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

let _ = t => t,
    _t;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import styled from '../styles/experimentalStyled';
import { jsx as _jsx } from "react/jsx-runtime";
const BoxRoot = styled('div', {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})(_t || (_t = _``));
/**
 * @ignore - do not document.
 */

const Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
  const _extendSxProp = extendSxProp(inProps),
        {
    className,
    component = 'div'
  } = _extendSxProp,
        other = _objectWithoutPropertiesLoose(_extendSxProp, ["className", "component"]);

  return /*#__PURE__*/_jsx(BoxRoot, _extends({
    as: component,
    ref: ref,
    className: clsx(className, 'MuiBox-root')
  }, other));
});
process.env.NODE_ENV !== "production" ? Box.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * @ignore
   */
  sx: PropTypes.object
} : void 0;
export default Box;