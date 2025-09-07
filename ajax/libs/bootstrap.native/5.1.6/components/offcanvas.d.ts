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

/** Returns a new `Offcanvas` instance. */
declare class Offcanvas extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Offcanvas;
    static getInstance: (element: Element) => Offcanvas | null;
    element: HTMLElement;
    options: OffcanvasOptions;
    triggers: HTMLElement[];
    relatedTarget: EventTarget & HTMLElement | undefined;
    /**
     * @param target usually an `.offcanvas` element
     * @param config instance options
     */
    constructor(target: Element | string, config?: Partial<OffcanvasOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): {
        backdrop: boolean;
        keyboard: boolean;
        scroll: boolean;
    };
    /** Shows or hides the offcanvas from the user. */
    toggle(): void;
    /** Shows the offcanvas to the user. */
    show(): void;
    /** Hides the offcanvas from the user. */
    hide(): void;
    /**
     * Toggles on/off the `click` event listeners.
     *
     * @param self the `Offcanvas` instance
     * @param add when *true*, listeners are added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Offcanvas` from the target element. */
    dispose(): void;
}
export default Offcanvas;

declare interface OffcanvasOptions extends BaseOptions {
    backdrop: boolean | "static";
    keyboard: boolean;
}

export { }
