import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

var _templateObject;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import styled from '../styles/experimentalStyled';
import { jsx as _jsx } from "react/jsx-runtime";
var BoxInner = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
      clone = props.clone,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      sx = props.sx,
      other = _objectWithoutProperties(props, ["children", "clone", "className", "component", "sx"]);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      className: clsx(children.props.className, className)
    }, other));
  }

  if (typeof children === 'function') {
    return children(_extends({
      className: className
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
var BoxRoot = styled(BoxInner, {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
/**
 * @ignore - do not document.
 */

var Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
  var props = extendSxProp(inProps);
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