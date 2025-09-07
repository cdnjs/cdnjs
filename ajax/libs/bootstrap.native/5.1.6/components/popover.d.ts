import { default as default_2 } from '@thednp/position-observer';
import { TouchEvent as TouchEvent_2 } from '@thednp/shorty';

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

/** Returns a new `Popover` instance. */
declare class Popover extends Tooltip {
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
export default Popover;

declare interface PopoverOptions extends TooltipOptions {
    title: string | HTMLElement;
    content: string | HTMLElement;
    btnClose: string | HTMLElement;
    dismissible: boolean;
}

/** Creates a new `Tooltip` instance. */
declare class Tooltip extends BaseComponent {
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
