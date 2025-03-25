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

/** Returns a new `Modal` instance. */
declare class Modal extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Modal;
    static getInstance: (element: Element) => Modal | null;
    element: HTMLElement;
    options: ModalOptions;
    modalDialog: HTMLElement;
    triggers: HTMLElement[];
    isStatic: boolean;
    hasFade: boolean;
    relatedTarget: EventTarget & HTMLElement | null;
    _observer: ResizeObserver;
    /**
     * @param target usually the `.modal` element
     * @param config instance options
     */
    constructor(target: Element | string, config?: Partial<ModalOptions>);
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
    };
    /** Toggles the visibility of the modal. */
    toggle(): void;
    /** Shows the modal to the user. */
    show(): void;
    /** Hide the modal from the user. */
    hide(): void;
    /**
     * Updates the modal layout.
     */
    update: () => void;
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Modal` component from target element. */
    dispose(): void;
}
export default Modal;

declare interface ModalOptions extends BaseOptions {
    backdrop: boolean | "static";
    keyboard: boolean;
}

export { }
