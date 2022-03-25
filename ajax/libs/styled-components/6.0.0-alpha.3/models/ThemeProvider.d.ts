import React from 'react';
export interface DefaultTheme {
    [key: string]: any;
}
declare type ThemeFn = (outerTheme?: DefaultTheme) => DefaultTheme;
declare type ThemeArgument = DefaultTheme | ThemeFn;
declare type Props = {
    children?: React.ReactChild;
    theme: ThemeArgument;
};
export declare const ThemeContext: React.Context<DefaultTheme | undefined>;
export declare const ThemeConsumer: React.Consumer<DefaultTheme | undefined>;
/**
 * Provide a theme to an entire react component tree via context
 */
export default function ThemeProvider(props: Props): JSX.Element | null;
export {};
