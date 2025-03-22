import { _ as _default } from './colors-DW5ZbNUm.js';

type NamedUtilityValue = {
    kind: 'named';
    /**
     * ```
     * bg-red-500
     *    ^^^^^^^
     *
     * w-1/2
     *   ^
     * ```
     */
    value: string;
    /**
     * ```
     * w-1/2
     *   ^^^
     * ```
     */
    fraction: string | null;
};

type PluginUtils = {
    theme: (keypath: string, defaultValue?: any) => any;
    colors: typeof _default;
};

export type { NamedUtilityValue as N, PluginUtils as P };
