import { default as default_2 } from '@thednp/position-observer';
import { MouseEvent as MouseEvent_2 } from '@thednp/shorty';
import { PointerEvent as PointerEvent_2 } from '@thednp/shorty';
import { TouchEvent as TouchEvent_2 } from '@thednp/shorty';

/** Creates a new Alert instance. */
export declare class Alert extends BaseComponent {
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
export declare class Button extends BaseComponent {
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

/** Creates a new `Carousel` instance. */
export declare class Carousel extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Carousel;
    static getInstance: (element: Element) => Carousel | null;
    element: HTMLElement;
    options: CarouselOptions;
    direction: "right" | "left";
    index: number;
    isTouch: boolean;
    slides: HTMLCollectionOf<HTMLElement>;
    controls: HTMLElement[];
    indicator: HTMLElement | null;
    indicators: HTMLElement[];
    /**
     * @param target mostly a `.carousel` element
     * @param config instance options
     */
    constructor(target: Element | string, config?: Partial<CarouselOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): CarouselOptions;
    /**
     * Check if instance is paused.
     */
    get isPaused(): boolean;
    /**
     * Check if instance is animating.
     */
    get isAnimating(): boolean;
    /** Slide automatically through items. */
    cycle(): void;
    /** Pause the automatic cycle. */
    pause(): void;
    /** Slide to the next item. */
    next(): void;
    /** Slide to the previous item. */
    prev(): void;
    /**
     * Jump to the item with the `idx` index.
     *
     * @param idx the index of the item to jump to
     */
    to(idx: number): void;
    /**
     * Toggles all event listeners for the `Carousel` instance.
     *
     * @param add when `TRUE` event listeners are added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Remove `Carousel` component from target. */
    dispose(): void;
}

declare interface CarouselOptions extends BaseOptions {
    pause: boolean | "hover";
    keyboard: boolean;
    touch: boolean;
    interval: number | boolean;
}

/** Returns a new `Colapse` instance. */
export declare class Collapse extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Collapse;
    static getInstance: (element: Element) => Collapse | null;
    element: HTMLElement;
    options: CollapseOptions;
    parent: Element | null;
    triggers: Element[];
    /**
     * @param target and `Element` that matches the selector
     * @param config instance options
     */
    constructor(target: Element | string, config?: Partial<CollapseOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): {
        parent: null;
    };
    /** Hides the collapse. */
    hide(): void;
    /** Shows the collapse. */
    show(): void;
    /** Toggles the visibility of the collapse. */
    toggle(): void;
    /**
     * Toggles on/off the event listener(s) of the `Collapse` instance.
     *
     * @param add when `true`, the event listener is added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Remove the `Collapse` component from the target `Element`. */
    dispose(): void;
}

declare interface CollapseOptions extends BaseOptions {
    parent: string | HTMLElement | null;
}

/** Returns a new Dropdown instance. */
export declare class Dropdown extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Dropdown;
    static getInstance: (element: Element) => Dropdown | null;
    element: HTMLElement;
    options: DropdownOptions;
    open: boolean;
    parentElement: HTMLElement;
    menu: HTMLElement;
    _observer: default_2;
    /**
     * @param target Element or string selector
     * @param config the instance options
     */
    constructor(target: Element | string, config?: Partial<DropdownOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): {
        offset: number;
        display: string;
    };
    /** Shows/hides the dropdown menu to the user. */
    toggle(): void;
    /** Shows the dropdown menu to the user. */
    show(): void;
    /** Hides the dropdown menu from the user. */
    hide(): void;
    /**
     * Toggles on/off the `click` event listener of the `Dropdown`.
     *
     * @param add when `true`, it will add the event listener
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Dropdown` component from the target element. */
    dispose(): void;
}

declare interface DropdownOptions extends BaseOptions {
    offset: number;
    display: string | "dynamic" | "static";
}

/**
 * Initialize all BSN components for a target container.
 *
 * @param context parent `Node`
 */
export declare const initCallback: (context?: ParentNode) => void;

/** Returns a new `Modal` instance. */
export declare class Modal extends BaseComponent {
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

declare interface ModalOptions extends BaseOptions {
    backdrop: boolean | "static";
    keyboard: boolean;
}

/** Returns a new `Offcanvas` instance. */
export declare class Offcanvas extends BaseComponent {
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

declare interface OffcanvasOptions extends BaseOptions {
    backdrop: boolean | "static";
    keyboard: boolean;
}

/** Returns a new `Popover` instance. */
export declare class Popover extends Tooltip {
    static selector: string;
    static init: (element: Element) => Popover;
    static getInstance: (element: Element) => Popover | null;
    static styleTip: (self: Tooltip) => void;
    options: PopoverOptions;
    /**
     * @param target the target element
     * @param config the instance options
     */
    constructor(target: Element | string, config?: Partial<PopoverOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): PopoverOptions;
    show: () => void;
}

declare interface PopoverOptions extends TooltipOptions {
    title: string | HTMLElement;
    content: string | HTMLElement;
    btnClose: string | HTMLElement;
    dismissible: boolean;
}

/**
 * Remove all BSN components for a target container.
 *
 * @param context parent `Node`
 */
export declare const removeDataAPI: (context?: ParentNode) => void;

/** Returns a new `ScrollSpy` instance. */
export declare class ScrollSpy extends BaseComponent {
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

declare interface ScrollSpyOptions extends BaseOptions {
    offset: number;
    target: HTMLElement | string;
    threshold: number | number[];
    rootMargin: string;
}

/** Creates a new `Tab` instance. */
export declare class Tab extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Tab;
    static getInstance: (element: Element) => Tab | null;
    element: HTMLElement;
    nav: HTMLElement | null;
    content: HTMLElement | null;
    tabContent: HTMLElement | null;
    nextContent: HTMLElement | null;
    dropdown: HTMLElement | null;
    /** @param target the target element */
    constructor(target: Element | string);
    /**
     * Returns component name string.
     */
    get name(): string;
    /** Shows the tab to the user. */
    show(): void;
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Tab` component from the target element. */
    dispose(): void;
}

/** Creates a new `Toast` instance. */
export declare class Toast extends BaseComponent {
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

declare interface ToastOptions extends BaseOptions {
    animation: boolean;
    autohide: boolean;
    delay: number;
}

/** Creates a new `Tooltip` instance. */
export declare class Tooltip extends BaseComponent {
    static selector: string;
    static init: (element: Element) => Tooltip;
    static getInstance: (element: Element) => Tooltip | null;
    static styleTip: (self: Tooltip) => void;
    element: Element & HTMLOrSVGElement;
    options: TooltipOptions;
    btn?: HTMLElement;
    tooltip: HTMLElement;
    container: HTMLElement;
    offsetParent: Element | Window;
    arrow: HTMLElement;
    enabled: boolean;
    id: string;
    _observer: default_2;
    /**
     * @param target the target element
     * @param config the instance options
     */
    constructor(target: Element | string, config?: Partial<TooltipOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): TooltipOptions;
    /** Handles the focus event on iOS. */
    handleFocus: () => void;
    /** Shows the tooltip. */
    handleShow: () => void;
    show(): void;
    /** Hides the tooltip. */
    handleHide: () => void;
    hide(): void;
    /** Updates the tooltip position. */
    update: () => void;
    /** Toggles the tooltip visibility. */
    toggle: () => void;
    /** Enables the tooltip. */
    enable(): void;
    /** Disables the tooltip. */
    disable(): void;
    /** Toggles the `disabled` property. */
    toggleEnabled(): void;
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    handleTouch: ({ target }: TouchEvent_2) => void;
    /**
     * Toggles on/off the `Tooltip` event listeners.
     *
     * @param add when `true`, event listeners are added
     */
    _toggleEventListeners: (add?: boolean) => void;
    /** Removes the `Tooltip` from the target element. */
    dispose(): void;
}

declare interface TooltipOptions extends BaseOptions {
    template: string | HTMLElement;
    title: string | HTMLElement;
    customClass: string;
    trigger: string;
    placement: "top" | "bottom" | "left" | "right";
    sanitizeFn?: (str: string) => string;
    animation: boolean;
    delay: number;
    content: string | HTMLElement;
    dismissible: boolean;
    btnClose: string | HTMLElement;
}

export { }
