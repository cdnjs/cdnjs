"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/styles");

var _utils = require("@material-ui/utils");

var _styledEngine = require("@material-ui/styled-engine");

var _useTheme = _interopRequireDefault(require("./useTheme"));

function InnerThemeProvider(props) {
  const theme = (0, _useTheme.default)();
  return /*#__PURE__*/React.createElement(_styledEngine.ThemeContext.Provider, {
    value: typeof theme === 'object' ? theme : {}
  }, props.children);
}

process.env.NODE_ENV !== "production" ? InnerThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: _propTypes.default.node
} : void 0;
/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */

function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return /*#__PURE__*/React.createElement(_styles.ThemeProvider, {
    theme: localTheme
  }, /*#__PURE__*/React.createElement(InnerThemeProvider, null, children));
}

process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: _propTypes.default.node,

  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]).isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = (0, _utils.exactProp)(ThemeProvider.propTypes) : void 0;
}

var _default = ThemeProvider;
exports.default = _default;