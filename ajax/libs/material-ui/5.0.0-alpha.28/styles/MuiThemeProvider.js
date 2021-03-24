import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
/**
 * @ignore - internal component.
 *
 * TODO v5: remove
 */

import { jsx as _jsx } from "react/jsx-runtime";
export default function MuiThemeProvider(props) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(['Material-UI: You have imported a private module.', '', "Please replace the '@material-ui/core/styles/MuiThemeProvider' import with:", "`import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';`", '', 'See https://github.com/mui-org/material-ui/issues/17900 for more detail.'].join('\n'));
  }

  return /*#__PURE__*/_jsx(ThemeProvider, _extends({}, props));
}