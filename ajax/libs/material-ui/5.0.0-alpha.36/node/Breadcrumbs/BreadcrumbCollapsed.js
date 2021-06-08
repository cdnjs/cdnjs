"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _colorManipulator = require("../styles/colorManipulator");

var _MoreHoriz = _interopRequireDefault(require("../internal/svg-icons/MoreHoriz"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _jsxRuntime = require("react/jsx-runtime");

const BreadcrumbCollapsedButton = (0, _styled.default)(_ButtonBase.default, {
  skipSx: true
})(({
  theme
}) => (0, _extends2.default)({
  display: 'flex',
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5)
}, theme.palette.mode === 'light' ? {
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700]
} : {
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.grey[100]
}, {
  borderRadius: 2,
  '&:hover, &:focus': (0, _extends2.default)({}, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[200]
  } : {
    backgroundColor: theme.palette.grey[600]
  }),
  '&:active': (0, _extends2.default)({
    boxShadow: theme.shadows[0]
  }, theme.palette.mode === 'light' ? {
    backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.grey[200], 0.12)
  } : {
    backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.grey[600], 0.12)
  })
}));
const BreadcrumbCollapsedIcon = (0, _styled.default)(_MoreHoriz.default)({
  width: 24,
  height: 16
});
/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props) {
  const styleProps = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbCollapsedButton, (0, _extends2.default)({
      focusRipple: true
    }, props, {
      styleProps: styleProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbCollapsedIcon, {
        styleProps: styleProps
      })
    }))
  });
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = BreadcrumbCollapsed;
exports.default = _default;