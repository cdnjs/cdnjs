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
export interface CarouselOptions extends BaseOptions {
	pause: boolean | "hover";
	keyboard: boolean;
	touch: boolean;
	interval: number | boolean;
}
/** Creates a new `Carousel` instance. */
export default class Carousel extends BaseComponent {
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

export as namespace Carousel;

export {};
