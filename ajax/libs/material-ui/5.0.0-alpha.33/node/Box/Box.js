"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _system = require("@material-ui/system");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _jsxRuntime = require("react/jsx-runtime");

const BoxRoot = (0, _experimentalStyled.default)('div', {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})``;
/**
 * @ignore - do not document.
 */

const Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
  const _extendSxProp = (0, _system.unstable_extendSxProp)(inProps),
        {
    className,
    component = 'div'
  } = _extendSxProp,
        other = (0, _objectWithoutPropertiesLoose2.default)(_extendSxProp, ["className", "component"]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(BoxRoot, (0, _extends2.default)({
    as: component,
    ref: ref,
    className: (0, _clsx.default)(className, 'MuiBox-root')
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
  children: _propTypes.default.node,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * @ignore
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Box;
exports.default = _default;