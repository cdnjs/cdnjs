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
/** Creates a new `Tab` instance. */
export default class Tab extends BaseComponent {
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

export as namespace Tab;

export {};
