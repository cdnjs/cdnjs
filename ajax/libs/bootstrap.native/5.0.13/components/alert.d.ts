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
export default class Alert extends BaseComponent {
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

export as namespace Alert;

export {};
