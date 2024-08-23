import { U as UserConfig } from './types-InlknEYy.mjs';

type NamedUtilityValue = {
    kind: 'named';
    /**
     * bg-red-500
     *    ^^^^^^^
     *
     * w-1/2
     *   ^
     */
    value: string;
    /**
     * w-1/2
     *   ^^^
     */
    fraction: string | null;
};

type Config = UserConfig;
type PluginFn = (api: PluginAPI) => void;
type PluginWithConfig = {
    handler: PluginFn;
    config?: UserConfig;
};
type PluginWithOptions<T> = {
    (options?: T): PluginWithConfig;
    __isOptionsFunction: true;
};
type PluginAPI = {
    addBase(base: CssInJs): void;
    addVariant(name: string, variant: string | string[] | CssInJs): void;
    addUtilities(utilities: Record<string, CssInJs | CssInJs[]> | Record<string, CssInJs | CssInJs[]>[], options?: {}): void;
    matchUtilities(utilities: Record<string, (value: string, extra: {
        modifier: string | null;
    }) => CssInJs | CssInJs[]>, options?: Partial<{
        type: string | string[];
        supportsNegativeValues: boolean;
        values: Record<string, string> & {
            __BARE_VALUE__?: (value: NamedUtilityValue) => string | undefined;
        };
        modifiers: 'any' | Record<string, string>;
    }>): void;
    addComponents(utilities: Record<string, CssInJs> | Record<string, CssInJs>[], options?: {}): void;
    matchComponents(utilities: Record<string, (value: string, extra: {
        modifier: string | null;
    }) => CssInJs>, options?: Partial<{
        type: string | string[];
        supportsNegativeValues: boolean;
        values: Record<string, string> & {
            __BARE_VALUE__?: (value: NamedUtilityValue) => string | undefined;
        };
        modifiers: 'any' | Record<string, string>;
    }>): void;
    theme(path: string, defaultValue?: any): any;
    prefix(className: string): string;
};
type CssInJs = {
    [key: string]: string | CssInJs | CssInJs[];
};

declare function createPlugin(handler: PluginFn, config?: Partial<Config>): PluginWithConfig;
declare namespace createPlugin {
    var withOptions: <T>(pluginFunction: (options?: T) => PluginFn, configFunction?: (options?: T) => Partial<Config>) => PluginWithOptions<T>;
}

export { createPlugin as default };
