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
export interface ToastOptions extends BaseOptions {
	animation: boolean;
	autohide: boolean;
	delay: number;
}
/** Creates a new `Toast` instance. */
export default class Toast extends BaseComponent {
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

export as namespace Toast;

export {};
