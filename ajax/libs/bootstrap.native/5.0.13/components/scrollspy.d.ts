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
export interface ScrollSpyOptions extends BaseOptions {
	offset: number;
	target: HTMLElement | string | null;
}
/** Returns a new `ScrollSpy` instance. */
export default class ScrollSpy extends BaseComponent {
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

export as namespace ScrollSpy;

export {};
