import { SC_VERSION } from './constants';
import createGlobalStyle from './constructors/createGlobalStyle';
import css from './constructors/css';
import keyframes from './constructors/keyframes';
import withTheme from './hoc/withTheme';
import useTheme from './hooks/useTheme';
import ServerStyleSheet from './models/ServerStyleSheet';
import StyleSheetManager, { StyleSheetConsumer, StyleSheetContext } from './models/StyleSheetManager';
import ThemeProvider, { ThemeConsumer, ThemeContext } from './models/ThemeProvider';
import isStyledComponent from './utils/isStyledComponent';
declare global {
    interface Window {
        '__styled-components-init__'?: number;
    }
}
export * from './secretInternals';
export { Attrs, DefaultTheme, ShouldForwardProp } from './types';
export { createGlobalStyle, css, isStyledComponent, keyframes, ServerStyleSheet, StyleSheetConsumer, StyleSheetContext, StyleSheetManager, ThemeConsumer, ThemeContext, ThemeProvider, useTheme, SC_VERSION as version, withTheme, };
