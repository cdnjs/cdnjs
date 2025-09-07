import { PointerEvent as PointerEvent_2 } from '@thednp/shorty';

/** Returns a new `BaseComponent` instance. */
declare class BaseComponent {
    element: Element;
    options?: BaseOptions;
    /**
     * @param target `Element` or selector string
     * @param config component instance options
     */
    constructor(target: Element | string, config?: BaseOptions);
    get version(): string;
    get name(): string;
    get defaults(): {};
    /** just to have something to extend from */
    _toggleEventListeners: () => void;
    /** Removes component from target element. */
    dispose(): void;
}

declare interface BaseOptions {
    [key: string]: unknown;
}

/** Creates a new `Button` instance. */
declare class Button extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Button;
    static getInstance: (element: Element) => Button | null;
    isActive: boolean;
    element: HTMLElement;
    /**
     * @param target usually a `.btn` element
     */
    constructor(target: Element | string);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Toggles the state of the target button.
     *
     * @param e usually `click` Event object
     */
    toggle: (e?: PointerEvent_2<HTMLElement>) => void;
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Button` component from the target element. */
    dispose(): void;
}
export default Button;

export { }
