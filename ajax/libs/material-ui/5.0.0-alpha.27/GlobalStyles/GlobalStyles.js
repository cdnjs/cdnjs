import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as StyledEngineGlobalStyles } from '@material-ui/styled-engine';
import defaultTheme from '../styles/defaultTheme';
/**
 * @ignore - do not document.
 */

export default function GlobalStyles(props) {
  return /*#__PURE__*/React.createElement(StyledEngineGlobalStyles, _extends({}, props, {
    defaultTheme: defaultTheme
  }));
}
process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func])
} : void 0;