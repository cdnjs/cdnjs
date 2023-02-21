/**
 *
 * The module includes custom hook methods to create shorthands for users.
 *
 * @module hooks
 *
 */
import * as React from 'react';

/**
 * Custom MousePositionOptions
 */
interface MousePositionOptions {
    /**
     * Position of the mouse for the x-axis.
     */
    x: number;
    /**
     * Position of the mouse for the y-axis.
     */
    y: number;
}

/**
 * Custom MouseDataOptions
 */
declare interface MouseDataOptions extends MousePositionOptions {
    /**
     * Used to reset the mouse position data.
     */
    reset: () => void;
    /**
     * The ref of the element to position.
     */
    ref: React.RefObject<HTMLElement>;
}

/**
 * Custom MouseMoveOptions
 */
declare interface MouseMoveOptions extends MouseDataOptions {
    /**
     * Whether the mouse is touching the element or not.
     */
    active: boolean;
}

/**
 * Custom event options.
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
     * @defaultValue true
     */
    when?: boolean;
}

/**
 * Custom overlay event options.
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
     * @defaultValue true
     */
    when?: boolean;
}

/**
 * Custom resize event options.
 */
interface ResizeEventOptions {
    /**
     * The event listener.
     * @param {Event} event - The browser event object.
     */
    listener?(event: Event): void;
    /**
     * Whether to listen to the event or not.
     * @defaultValue true
     */
    when?: boolean;
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
/**
 * @todo
 * @param {number} [initialValue=0] - The value to counter.
 * @param {{ min: number; max: number; step: number }} [options=&#123; step: 1 &#125;]  - The options of the counter.
 */
export declare function useCounter(initialValue: number, options: { min: number; max: number; step: number }): any;
/**
 * Custom hook to use a debounced value.
 * @param {*} initialValue - The initial value for debounce.
 * @param {number} delay - The delay in milliseconds.
 */
export declare function useDebounce(initialValue: any, delay: number): any[];
/**
 * Custom hook to use to get the current mouse position.
 */
export declare function useMouse(): MouseDataOptions;
/**
 * Custom hook to handles move behavior over any element.
 * @param {'horizontal' | 'vertical' | 'both'} mode - The mode of the move. Valid values are 'horizontal', 'vertical' and 'both'.
 * @param {MousePositionOptions} initialValue - The initial value.
 */
export declare function useMove(mode: 'horizontal' | 'vertical' | 'both', initialValue: MousePositionOptions): MouseMoveOptions;
/**
 * Custom hook to use change the current favicon.
 * @param {string} newIcon - The new favicon url to set.
 * @param {string} rel - The rel attribute of the link element. @defaultValue 'shortcut icon'
 */
export declare function useFavicon(newIcon: string, rel: string): void;
/**
 * Custom hook to use change the current favicon.
 * @param {React.RefObject<Element>} ref - The ref of the element to observe.
 * @param {IntersectionObserver} options - The options of the intersection observer.
 */
export declare function useIntersectionObserver(ref: React.RefObject<Element>, options: IntersectionObserver): void;
/**
 * Custom hook to use detect click outside.
 * @param {React.RefObject<Element>} ref - The ref of the element to detect click outside.
 * @param {*} callback - The callback to run when click outside.
 */
export declare function useClickOutside(ref: React.RefObject<Element>, callback: any): void;
/**
 * Custom hook to detect if window size matches or not.
 * @param {string} query - the media query
 * @param {boolean} when - Whether to listen to the event or not.
 */
export declare function useMatchMedia(query: string, when?: boolean): boolean;
