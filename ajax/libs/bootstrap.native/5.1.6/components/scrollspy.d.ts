import { default as default_2 } from '@thednp/position-observer';
import { MouseEvent as MouseEvent_2 } from '@thednp/shorty';

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

/** Returns a new `ScrollSpy` instance. */
declare class ScrollSpy extends BaseComponent {
    static selector: string;
    static init: (element: Element) => ScrollSpy;
    static getInstance: (element: Element) => ScrollSpy | null;
    element: HTMLElement;
    options: ScrollSpyOptions;
    target: HTMLElement;
    scrollTarget: HTMLElement;
    _itemsLength: number;
    _activeItem: HTMLElement | null;
    _observables: Map<HTMLElement, HTMLElement>;
    _observer: default_2;
    /**
     * @param target the target element
     * @param config the instance options
     */
    constructor(target: Element | string, config?: Partial<ScrollSpyOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): Partial<ScrollSpyOptions>;
    /** Updates all items. */
    refresh: () => void;
    /**
     * This method provides an event handle
     * for scrollspy
     * @param e the event listener object
     */
    _scrollTo: (e: MouseEvent_2<HTMLAnchorElement>) => void;
    /**
     * Toggles on/off the component observer.
     *
     * @param self the ScrollSpy instance
     * @param add when `true`, listener is added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes `ScrollSpy` from the target element. */
    dispose(): void;
}
export default ScrollSpy;

declare interface ScrollSpyOptions extends BaseOptions {
    offset: number;
    target: HTMLElement | string;
    threshold: number | number[];
    rootMargin: string;
}

export { }
