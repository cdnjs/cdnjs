"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MuiThemeProvider;

var React = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/styles");

/**
 * @ignore - internal component.
 *
 * TODO v5: remove
 */
function MuiThemeProvider(props) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(['Material-UI: You have imported a private module.', '', "Please replace the '@material-ui/core/styles/MuiThemeProvider' import with:", "`import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';`", '', 'See https://github.com/mui-org/material-ui/issues/17900 for more detail.'].join('\n'));
  }

  return /*#__PURE__*/React.createElement(_styles.ThemeProvider, props);
}