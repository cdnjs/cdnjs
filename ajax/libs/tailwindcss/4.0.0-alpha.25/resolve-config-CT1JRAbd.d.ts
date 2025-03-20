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

interface PluginUtils {
    theme(keypath: string, defaultValue?: any): any;
}

export type { NamedUtilityValue as N, PluginUtils as P };
