export interface ComponentHooks {
    useMountEffect?(): void;
    useUpdateEffect?(): void;
    useUnmountEffect?(): void;
}

/**
 * Custom hook to use to load style options for a component.
 * @param {string} styles - The style text content.
 * @param {boolean} isUnstyled - Flag removes component related styles in the core.
 * @param config - The component configuration.
 */
export declare function useHandleStyle(styles: string, isUnstyled: () => boolean, config: { name: string; styled?: boolean; hostName?: string }): void;

export interface ComponentBasePassThroughOptions {
    hooks?: ComponentHooks;
}

/**
 * @todo Update all d.ts with it.
 */
export interface ComponentBasePassThroughMethodOptions<P = any, S = any> {
    props?: P | undefined | null;
    state?: S | undefined | null;
}
