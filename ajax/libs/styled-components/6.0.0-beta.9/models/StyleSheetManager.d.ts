import React from 'react';
import StyleSheet from '../sheet';
import { Stringifier } from '../types';
export declare type IStyleSheetContext = StyleSheet | void;
export declare const StyleSheetContext: React.Context<IStyleSheetContext>;
export declare const StyleSheetConsumer: React.Consumer<IStyleSheetContext>;
export declare type IStylisContext = Stringifier | void;
export declare const StylisContext: React.Context<IStylisContext>;
export declare const StylisConsumer: React.Consumer<IStylisContext>;
export declare const mainSheet: StyleSheet;
export declare const mainStylis: Stringifier;
export declare function useStyleSheet(): StyleSheet;
export declare function useStylis(): Stringifier;
export declare type IStyleSheetManager = React.PropsWithChildren<{
    /**
     * If desired, you can pass this prop to disable "speedy" insertion mode, which
     * uses the browser [CSSOM APIs](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet).
     * When disabled, rules are inserted as simple text into style blocks.
     */
    disableCSSOMInjection?: boolean;
    /**
     * If you are working exclusively with modern browsers, vendor prefixes can often be omitted
     * to reduce the weight of CSS on the page.
     */
    disableVendorPrefixes?: boolean;
    /**
     * Provide an optional selector to be prepended to all generated style rules.
     */
    namespace?: string;
    /**
     * Create and provide your own `StyleSheet` if necessary for advanced SSR scenarios.
     */
    sheet?: StyleSheet;
    /**
     * An array of plugins to be run by stylis (style processor) during compilation.
     * Check out [what's available on npm*](https://www.npmjs.com/search?q=keywords%3Astylis).
     *
     * \* The plugin(s) must be compatible with stylis v4 or above.
     */
    stylisPlugins?: stylis.Middleware[];
    /**
     * Provide an alternate DOM node to host generated styles; useful for iframes.
     */
    target?: HTMLElement;
}>;
export declare function StyleSheetManager(props: IStyleSheetManager): JSX.Element;
