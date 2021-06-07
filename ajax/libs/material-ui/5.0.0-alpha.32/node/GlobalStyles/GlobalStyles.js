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

var _styledEngine = require("@material-ui/styled-engine");

var _defaultTheme = _interopRequireDefault(require("../styles/defaultTheme"));

var _jsxRuntime = require("react/jsx-runtime");

function GlobalStyles(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledEngine.GlobalStyles, (0, _extends2.default)({}, props, {
    defaultTheme: _defaultTheme.default
  }));
}

process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The styles you want to apply globally.
   */
  styles: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number, _propTypes.default.object, _propTypes.default.shape({
    __emotion_styles: _propTypes.default.any.isRequired
  }), _propTypes.default.string, _propTypes.default.bool])
} : void 0;
var _default = GlobalStyles;
exports.default = _default;