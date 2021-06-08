import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import styled from '../styles/experimentalStyled';
import { jsx as _jsx } from "react/jsx-runtime";
var BoxRoot = styled('div', {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
/**
 * @ignore - do not document.
 */

var Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
  var _extendSxProp = extendSxProp(inProps),
      className = _extendSxProp.className,
      _extendSxProp$compone = _extendSxProp.component,
      component = _extendSxProp$compone === void 0 ? 'div' : _extendSxProp$compone,
      other = _objectWithoutProperties(_extendSxProp, ["className", "component"]);

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