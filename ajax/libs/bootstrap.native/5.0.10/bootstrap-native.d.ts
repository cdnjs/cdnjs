export interface BaseOptions {
	[key: string]: any;
}
declare class BaseComponent {
	element: HTMLElement;
	options?: BaseOptions;
	/**
	 * @param target `HTMLElement` or selector string
	 * @param config component instance options
	 */
	constructor(target: HTMLElement | string, config?: BaseOptions);
	get version(): string;
	get name(): string;
	get defaults(): {};
	/** just to have something to extend from */
	_toggleEventListeners: () => void;
	/** Removes component from target element. */
	dispose(): void;
}
/** Creates a new Alert instance. */
export declare class Alert extends BaseComponent {
	static selector: string;
	static init: <T>(element: HTMLElement) => T;
	static getInstance: (element: HTMLElement) => Alert | null;
	dismiss: HTMLElement | null;
	constructor(target: HTMLElement | string);
	/** Returns component name string. */
	get name(): string;
	/**
	 * Public method that hides the `.alert` element from the user,
	 * disposes the instance once animation is complete, then
	 * removes the element from the DOM.
	 */
	close: () => void;
	/**
	 * Toggle on / off the `click` event listener.
	 *
	 * @param add when `true`, event listener is added
	 */
	_toggleEventListeners: (add?: boolean) => void;
	/** Remove the component from target element. */
	dispose(): void;
}
/** Creates a new `Button` instance. */
export declare class Button extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Button;
	static getInstance: (element: HTMLElement) => Button | null;
	isActive: boolean;
	/**
	 * @param target usually a `.btn` element
	 */
	constructor(target: HTMLElement | string);
	/**
	 * Returns component name string.
	 */
	get name(): string;
	/**
	 * Toggles the state of the target button.
	 *
	 * @param e usually `click` Event object
	 */
	toggle: (e: Event) => void;
	/**
	 * Toggles on/off the `click` event listener.
	 *
	 * @param add when `true`, event listener is added
	 */
	_toggleEventListeners: (add?: boolean) => void;
	/** Removes the `Button` component from the target element. */
	dispose(): void;
}
export interface CarouselOptions extends BaseOptions {
	pause: boolean | "hover";
	keyboard: boolean;
	touch: boolean;
	interval: number | boolean;
}
/** Creates a new `Carousel` instance. */
export declare class Carousel extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Carousel;
	static getInstance: (element: HTMLElement) => Carousel | null;
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
	constructor(target: HTMLElement | string, config?: Partial<CarouselOptions>);
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
export interface CollapseOptions extends BaseOptions {
	parent: HTMLElement | null;
}
/** Returns a new `Colapse` instance. */
export declare class Collapse extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Collapse;
	static getInstance: (element: HTMLElement) => Collapse | null;
	options: CollapseOptions;
	parent: HTMLElement | null;
	triggers: HTMLElement[];
	/**
	 * @param target and `Element` that matches the selector
	 * @param config instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<CollapseOptions>);
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
export interface DropdownOptions extends BaseOptions {
	offset: number;
	display: string | "dynamic" | "static";
}
/** Returns a new Dropdown instance. */
export declare class Dropdown extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Dropdown;
	static getInstance: (element: HTMLElement) => Dropdown | null;
	options: DropdownOptions;
	open: boolean;
	parentElement: HTMLElement;
	menu: HTMLElement;
	/**
	 * @param target Element or string selector
	 * @param config the instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<DropdownOptions>);
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
export interface ModalOptions extends BaseOptions {
	backdrop: boolean | "static";
	keyboard: boolean;
}
/** Returns a new `Modal` instance. */
export declare class Modal extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Modal;
	static getInstance: (element: HTMLElement) => Modal | null;
	options: ModalOptions;
	modalDialog: HTMLElement;
	triggers: HTMLElement[];
	isStatic: boolean;
	hasFade: boolean;
	relatedTarget: HTMLElement | null;
	/**
	 * @param target usually the `.modal` element
	 * @param config instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<ModalOptions>);
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
export interface OffcanvasOptions extends BaseOptions {
	backdrop: boolean | "static";
	keyboard: boolean;
}
/** Returns a new `Offcanvas` instance. */
export declare class Offcanvas extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Offcanvas;
	static getInstance: (element: HTMLElement) => Offcanvas | null;
	options: OffcanvasOptions;
	triggers: HTMLElement[];
	relatedTarget: HTMLElement | null;
	/**
	 * @param target usually an `.offcanvas` element
	 * @param config instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<OffcanvasOptions>);
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
export interface TooltipOptions extends BaseOptions {
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
/** Creates a new `Tooltip` instance. */
export declare class Tooltip extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Tooltip;
	static getInstance: (element: HTMLElement) => Tooltip | null;
	static styleTip: <T extends Tooltip>(self: T) => void;
	options: TooltipOptions;
	btn?: HTMLElement;
	tooltip?: HTMLElement;
	container: ParentNode;
	arrow?: HTMLElement;
	offsetParent?: HTMLElement;
	enabled: boolean;
	id: string;
	/**
	 * @param target the target element
	 * @param config the instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<TooltipOptions>);
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
	handleTouch: ({ target }: TouchEvent) => void;
	/**
	 * Toggles on/off the `Tooltip` event listeners.
	 *
	 * @param add when `true`, event listeners are added
	 */
	_toggleEventListeners: (add?: boolean) => void;
	/** Removes the `Tooltip` from the target element. */
	dispose(): void;
}
export interface PopoverOptions extends TooltipOptions {
	title: string | HTMLElement;
	content: string | HTMLElement;
	btnClose: string | HTMLElement;
	dismissible: boolean;
}
/** Returns a new `Popover` instance. */
export declare class Popover extends Tooltip {
	static selector: string;
	static init: (element: HTMLElement) => Popover;
	static getInstance: (element: HTMLElement) => Popover | null;
	static styleTip: <T extends Tooltip>(self: T) => void;
	options: PopoverOptions;
	/**
	 * @param target the target element
	 * @param config the instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<PopoverOptions>);
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
export interface ScrollSpyOptions extends BaseOptions {
	offset: number;
	target: HTMLElement | string | null;
}
/** Returns a new `ScrollSpy` instance. */
export declare class ScrollSpy extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => ScrollSpy;
	static getInstance: (element: HTMLElement) => ScrollSpy | null;
	options: ScrollSpyOptions;
	target: HTMLElement | null;
	scrollTarget: HTMLElement | Window;
	scrollTop: number;
	maxScroll: number;
	scrollHeight: number;
	activeItem: HTMLElement | null;
	items: HTMLElement[];
	itemsLength: number;
	offsets: number[];
	/**
	 * @param target the target element
	 * @param config the instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<ScrollSpyOptions>);
	/**
	 * Returns component name string.
	 */
	get name(): string;
	/**
	 * Returns component default options.
	 */
	get defaults(): ScrollSpyOptions;
	/** Updates all items. */
	refresh: () => void;
	/**
	 * Toggles on/off the component event listener.
	 *
	 * @param add when `true`, listener is added
	 */
	_toggleEventListeners: (add?: boolean) => void;
	/** Removes `ScrollSpy` from the target element. */
	dispose(): void;
}
/** Creates a new `Tab` instance. */
export declare class Tab extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Tab;
	static getInstance: (element: HTMLElement) => Tab | null;
	nav: HTMLElement | null;
	content: HTMLElement | null;
	tabContent: HTMLElement | null;
	nextContent: HTMLElement | null;
	dropdown: HTMLElement | null;
	/** @param target the target element */
	constructor(target: HTMLElement | string);
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
export interface ToastOptions extends BaseOptions {
	animation: boolean;
	autohide: boolean;
	delay: number;
}
/** Creates a new `Toast` instance. */
export declare class Toast extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Toast;
	static getInstance: (element: HTMLElement) => Toast | null;
	options: ToastOptions;
	dismiss: HTMLElement | null;
	triggers: HTMLElement[];
	relatedTarget: HTMLElement | null;
	/**
	 * @param target the target `.toast` element
	 * @param config the instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<ToastOptions>);
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
/**
 * Initialize all BSN components for a target container.
 *
 * @param context parent `Node`
 */
export declare const initCallback: (context?: ParentNode) => void;
/**
 * Remove all BSN components for a target container.
 *
 * @param context parent `Node`
 */
export declare const removeDataAPI: (context?: ParentNode) => void;

export as namespace BSN;

export {};
