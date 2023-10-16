export interface ComponentHooks {
    useMountEffect?(): void;
    useUpdateEffect?(): void;
    useUnmountEffect?(): void;
}

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
