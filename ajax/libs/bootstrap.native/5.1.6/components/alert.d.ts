import { PointerEvent as PointerEvent_2 } from '@thednp/shorty';

/** Creates a new Alert instance. */
declare class Alert extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Alert;
    static getInstance: (element: Element) => Alert | null;
    dismiss: HTMLElement | null;
    constructor(target: Element | string);
    /** Returns component name string. */
    get name(): string;
    /**
     * Public method that hides the `.alert` element from the user,
     * disposes the instance once animation is complete, then
     * removes the element from the DOM.
     */
    close: (e: PointerEvent_2<HTMLElement>) => void;
    /**
     * Toggle on / off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Remove the component from target element. */
    dispose(): void;
}
export default Alert;

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

export { }
