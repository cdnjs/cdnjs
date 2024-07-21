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
export default class Tooltip extends BaseComponent {
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

export as namespace Tooltip;

export {};
