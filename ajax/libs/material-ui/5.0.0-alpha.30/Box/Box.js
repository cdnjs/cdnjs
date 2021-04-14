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
const BoxInner = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    children,
    clone,
    className,
    component: Component = 'div'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "clone", "className", "component", "sx"]);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      className: clsx(children.props.className, className)
    }, other));
  }

  if (typeof children === 'function') {
    return children(_extends({
      className
    }, other));
  }

  return /*#__PURE__*/_jsx(Component, _extends({
    ref: ref,
    className: className
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? BoxInner.propTypes = {
  children: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  clone: PropTypes.bool,
  component: PropTypes.elementType,
  sx: PropTypes.object
} : void 0;
const BoxRoot = styled(BoxInner, {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})(_t || (_t = _``));
/**
 * @ignore - do not document.
 */

const Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
  const props = extendSxProp(inProps);
  return /*#__PURE__*/_jsx(BoxRoot, _extends({
    ref: ref
  }, props));
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
  children: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * @ignore
   */
  clone: PropTypes.bool,

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