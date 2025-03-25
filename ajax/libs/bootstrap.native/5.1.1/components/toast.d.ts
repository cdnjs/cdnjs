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

/** Creates a new `Toast` instance. */
declare class Toast extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Toast;
    static getInstance: (element: Element) => Toast | null;
    element: HTMLElement;
    options: ToastOptions;
    dismiss: HTMLElement | null;
    triggers: HTMLElement[];
    relatedTarget: HTMLElement | null;
    /**
     * @param target the target `.toast` element
     * @param config the instance options
     */
    constructor(target: Element | string, config?: Partial<ToastOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): {
        animation: boolean;
        autohide: boolean;
        delay: number;
    };
    /**
     * Returns *true* when toast is visible.
     */
    get isShown(): boolean;
    /** Shows the toast. */
    show: () => void;
    /** Hides the toast. */
    hide: () => void;
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, it will add the listener
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Toast` component from the target element. */
    dispose(): void;
}
export default Toast;

declare interface ToastOptions extends BaseOptions {
    animation: boolean;
    autohide: boolean;
    delay: number;
}

export { }
