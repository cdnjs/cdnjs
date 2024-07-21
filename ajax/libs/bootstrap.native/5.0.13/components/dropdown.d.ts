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
export interface DropdownOptions extends BaseOptions {
	offset: number;
	display: string | "dynamic" | "static";
}
/** Returns a new Dropdown instance. */
export default class Dropdown extends BaseComponent {
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

export as namespace Dropdown;

export {};
