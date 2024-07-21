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
export interface OffcanvasOptions extends BaseOptions {
	backdrop: boolean | "static";
	keyboard: boolean;
}
/** Returns a new `Offcanvas` instance. */
export default class Offcanvas extends BaseComponent {
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

export as namespace Offcanvas;

export {};
