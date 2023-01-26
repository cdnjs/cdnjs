/**
 *
 * The module includes custom hook methods to create shorthands for users.
 *
 * @module hooks
 *
 */
import * as React from 'react';

/**
 * Custom event options.
 * @group Misc
 */
interface EventOptions {
    /**
     * The target element to listen to.
     */
    target?: 'document' | 'window' | React.Ref<HTMLElement>;
    /**
     * The event type to listen to.
     */
    type?: string;
    /**
     * The event listener.
     */
    listener?(event: Event): void;
    /**
     * The event options.
     */
    options?: any;
    /**
     * Whether to listen to the event or not.
     */
    when?: boolean;
}

/**
 * Custom overlay event options.
 * @group Misc
 */
interface OverlayEventOptions {
    /**
     * The target element to listen to.
     */
    target?: 'document' | 'window' | React.Ref<HTMLElement> | undefined;
    /**
     * The overlay element to listen to.
     */
    overlay?: 'document' | 'window' | React.Ref<HTMLElement> | undefined;
    /**
     * The event listener.
     */
    listener?(event: Event, type?: string): void;
    /**
     * Whether to listen to the event or not.
     */
    when?: boolean;
}

/**
 * Custom resize event options.
 * @group Misc
 */
interface ResizeEventOptions {
    /**
     * The event listener.
     * @param {Event} event - The browser event object.
     */
    listener?(event: Event): void;
}

/**
 * Custom hook to get the previous value of a property.
 * @param {*} value - The value to compare.
 */
export declare function usePrevious(value: any): any;
/**
 * Custom hook to run a mount effect only once.
 * @param {React.EffectCallback} effect - The effect to run.
 */
export declare function useMountEffect(effect: React.EffectCallback): void;
/**
 * Custom hook to run an update effect.
 * @param {React.EffectCallback} effect - The effect to run.
 * @param {React.DependencyList} deps - The dependencies.
 */
export declare function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
/**
 * Custom hook to run an unmount effect.
 * @param {React.EffectCallback} effect - The effect to run.
 */
export declare function useUnmountEffect(effect: React.EffectCallback): void;
/**
 * Custom hook to listen to an event.
 * @param {EventOptions} options - The event options.
 */
export declare function useEventListener(options: EventOptions): any[];
/**
 * Custom hook to listen to overlay event. It can be used when an overlay is desired to behave like the overlays in PrimeReact.
 * @param {OverlayEventOptions} options - The event options.
 */
export declare function useOverlayListener(options: OverlayEventOptions): any[];
/**
 * Custom hook to listen to overlay scroll. It can be used when an overlay is desired to behave like the overlays in PrimeReact.
 * @param {EventOptions} options - The event options.
 */
export declare function useOverlayScrollListener(options: EventOptions): any[];
/**
 * Custom hook to listen to a resize event.
 * @param {ResizeEventOptions} options - The event options.
 */
export declare function useResizeListener(options: ResizeEventOptions): any[];
/**
 * Custom hook to use an interval.
 * @param {*} fn - The function that will be executed after the delay.
 * @param {number} delay - Delay in milliseconds.
 * @param {boolean} when - Whether to listen to the event or not.
 */
export declare function useInterval(fn: any, delay?: number, when?: boolean): any[];
/**
 * Custom hook to use a timeout.
 * @param {*} fn - The function that will be executed after the delay.
 * @param {number} delay - Delay in milliseconds.
 * @param {boolean} when - Whether to listen to the event or not.
 */
export declare function useTimeout(fn: any, delay?: number, when?: boolean): any[];
/**
 * Custom hook to use storage such as local and session storage.
 * @param {*} initialValue - The initial value.
 * @param {string} key - The key to store the value.
 * @param {string} storage - The storage type. Valid values are 'local' and 'session'.
 */
export declare function useStorage<S, K extends string = string>(initialValue: S, key: K, storage?: 'local' | 'session'): [S, React.Dispatch<React.SetStateAction<S>>];
/**
 * Custom hook to use local storage.
 * @param {*} initialValue - The initial value.
 * @param {string} key - The key to store the value in local storage.
 */
export declare function useLocalStorage<S, K extends string = string>(initialValue: S, key: K): [S, React.Dispatch<React.SetStateAction<S>>];
/**
 * Custom hook to use session storage.
 * @param {*} initialValue - The initial value.
 * @param {string} key - The key to store the value in session storage. */
export declare function useSessionStorage<S, K extends string = string>(initialValue: S, key: K): [S, React.Dispatch<React.SetStateAction<S>>];
