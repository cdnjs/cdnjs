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
/** Creates a new `Button` instance. */
export default class Button extends BaseComponent {
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

export as namespace Button;

export {};
