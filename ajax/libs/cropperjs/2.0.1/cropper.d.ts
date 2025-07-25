export declare const ACTION_MOVE = "move";

export declare const ACTION_NONE = "none";

export declare const ACTION_RESIZE_EAST = "e-resize";

export declare const ACTION_RESIZE_NORTH = "n-resize";

export declare const ACTION_RESIZE_NORTHEAST = "ne-resize";

export declare const ACTION_RESIZE_NORTHWEST = "nw-resize";

export declare const ACTION_RESIZE_SOUTH = "s-resize";

export declare const ACTION_RESIZE_SOUTHEAST = "se-resize";

export declare const ACTION_RESIZE_SOUTHWEST = "sw-resize";

export declare const ACTION_RESIZE_WEST = "w-resize";

export declare const ACTION_ROTATE = "rotate";

export declare const ACTION_SCALE = "scale";

export declare const ACTION_SELECT = "select";

export declare const ACTION_TRANSFORM = "transform";

export declare const ATTRIBUTE_ACTION = "action";

declare class Cropper {
    static version: string;
    element: HTMLImageElement | HTMLCanvasElement;
    options: CropperOptions;
    container: Element;
    constructor(element: HTMLImageElement | HTMLCanvasElement | string, options?: CropperOptions);
    getCropperCanvas(): CropperCanvas | null;
    getCropperImage(): CropperImage | null;
    getCropperSelection(): CropperSelection | null;
    getCropperSelections(): NodeListOf<CropperSelection> | null;
}
export default Cropper;

export declare const CROPPER_CANVAS = "cropper-canvas";

export declare const CROPPER_CROSSHAIR = "cropper-crosshair";

export declare const CROPPER_GIRD = "cropper-grid";

export declare const CROPPER_HANDLE = "cropper-handle";

export declare const CROPPER_IMAGE = "cropper-image";

export declare const CROPPER_SELECTION = "cropper-selection";

export declare const CROPPER_SHADE = "cropper-shade";

export declare const CROPPER_VIEWER = "cropper-viewer";

export declare class CropperCanvas extends CropperElement_2 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperCanvas_2 extends CropperElement_2_2 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperCanvas_2_2 extends CropperElement_3_2 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperCanvas_3 extends CropperElement_2_3 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperCanvas_3_2 extends CropperElement_2_3_2 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperCanvas_4 extends CropperElement_2_4 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperCanvas_5 extends CropperElement_2_2_2 {
    static $name: string;
    static $version: string;
    protected $onPointerDown: EventListener | null;
    protected $onPointerMove: EventListener | null;
    protected $onPointerUp: EventListener | null;
    protected $onWheel: EventListener | null;
    protected $wheeling: boolean;
    protected readonly $pointers: Map<number, any>;
    protected $style: string;
    protected $action: string;
    background: boolean;
    disabled: boolean;
    scaleStep: number;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected $bind(): void;
    protected $unbind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

export declare class CropperCrosshair extends CropperElement_8 {
    static $name: string;
    static $version: string;
    protected $style: string;
    centered: boolean;
    slottable: boolean;
    themeColor: string;
    protected static get observedAttributes(): string[];
}

export declare class CropperElement extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2_2 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2_2_2 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2_3 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2_3_2 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2_4 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_2_5 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_3 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_3_2 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_4 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_4_2 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_5 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_6 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_7 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_8 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

declare class CropperElement_9 extends HTMLElement {
    static $name: string;
    static $version: string;
    protected $style?: string;
    protected $template?: string;
    protected get $sharedStyle(): string;
    shadowRootMode: ShadowRootMode;
    slottable: boolean;
    themeColor?: string;
    constructor();
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getTagNameOf(name: string): string;
    protected $setStyles(properties: Record<string, any>): this;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name?: string | ElementDefinitionOptions, options?: ElementDefinitionOptions): void;
}

export declare class CropperGrid extends CropperElement_7 {
    static $name: string;
    static $version: string;
    protected $style: string;
    bordered: boolean;
    columns: number;
    covered: boolean;
    rows: number;
    slottable: boolean;
    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected $render(): void;
}

export declare class CropperHandle extends CropperElement_5 {
    static $name: string;
    static $version: string;
    protected $onCanvasCropEnd: EventListener | null;
    protected $onCanvasCropStart: EventListener | null;
    protected $style: string;
    action: string;
    plain: boolean;
    slottable: boolean;
    themeColor: string;
    protected static get observedAttributes(): string[];
}

export declare class CropperImage extends CropperElement_3 {
    static $name: string;
    static $version: string;
    protected $matrix: number[];
    protected $onLoad: EventListener | null;
    protected $onCanvasAction: EventListener | null;
    protected $onCanvasActionEnd: EventListener | null;
    protected $onCanvasActionStart: EventListener | null;
    protected $actionStartTarget: EventTarget | null;
    protected $style: string;
    readonly $image: HTMLImageElement;
    initialCenterSize: string;
    rotatable: boolean;
    scalable: boolean;
    skewable: boolean;
    slottable: boolean;
    translatable: boolean;
    protected set $canvas(element: CropperCanvas_2);
    protected get $canvas(): CropperCanvas_2;
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $handleLoad(): void;
    protected $handleAction(event: Event | CustomEvent): void;
    /**
     * Defers the callback to execute after successfully loading the image.
     * @param {Function} [callback] The callback to execute after successfully loading the image.
     * @returns {Promise} Returns a promise that resolves to the image element.
     */
    $ready(callback?: (image: HTMLImageElement) => unknown): Promise<HTMLImageElement>;
    /**
     * Aligns the image to the center of its parent element.
     * @param {string} [size] The size of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $center(size?: string): this;
    /**
     * Moves the image.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the image to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    /**
     * Rotates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
     * @param {number|string} angle The rotation angle (in radians).
     * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $rotate(angle: number | string, x?: number, y?: number): this;
    /**
     * Zooms the image.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    /**
     * Scales the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
     * @param {number} x The scaling factor in the horizontal direction.
     * @param {number} [y] The scaling factor in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $scale(x: number, y?: number): this;
    /**
     * Skews the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number|string} x The skewing angle in the horizontal direction.
     * @param {number|string} [y] The skewing angle in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $skew(x: number | string, y?: number | string): this;
    /**
     * Translates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
     * @param {number} x The translating distance in the horizontal direction.
     * @param {number} [y] The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $translate(x: number, y?: number): this;
    /**
     * Transforms the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $transform(a: number, b: number, c: number, d: number, e: number, f: number): this;
    /**
     * Resets (overrides) the current transform to the specific identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
     * @param {number|Array} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $setTransform(a: number | number[], b?: number, c?: number, d?: number, e?: number, f?: number): this;
    /**
     * Retrieves the current transformation matrix being applied to the element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
     * @returns {Array} Returns the readonly transformation matrix.
     */
    $getTransform(): number[];
    /**
     * Resets the current transform to the initial identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $resetTransform(): this;
}

declare class CropperImage_2 extends CropperElement_2_5 {
    static $name: string;
    static $version: string;
    protected $matrix: number[];
    protected $onLoad: EventListener | null;
    protected $onCanvasAction: EventListener | null;
    protected $onCanvasActionEnd: EventListener | null;
    protected $onCanvasActionStart: EventListener | null;
    protected $actionStartTarget: EventTarget | null;
    protected $style: string;
    readonly $image: HTMLImageElement;
    initialCenterSize: string;
    rotatable: boolean;
    scalable: boolean;
    skewable: boolean;
    slottable: boolean;
    translatable: boolean;
    protected set $canvas(element: CropperCanvas_5);
    protected get $canvas(): CropperCanvas_5;
    protected static get observedAttributes(): string[];
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $handleLoad(): void;
    protected $handleAction(event: Event | CustomEvent): void;
    /**
     * Defers the callback to execute after successfully loading the image.
     * @param {Function} [callback] The callback to execute after successfully loading the image.
     * @returns {Promise} Returns a promise that resolves to the image element.
     */
    $ready(callback?: (image: HTMLImageElement) => unknown): Promise<HTMLImageElement>;
    /**
     * Aligns the image to the center of its parent element.
     * @param {string} [size] The size of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $center(size?: string): this;
    /**
     * Moves the image.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the image to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    /**
     * Rotates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
     * @param {number|string} angle The rotation angle (in radians).
     * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $rotate(angle: number | string, x?: number, y?: number): this;
    /**
     * Zooms the image.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    /**
     * Scales the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
     * @param {number} x The scaling factor in the horizontal direction.
     * @param {number} [y] The scaling factor in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $scale(x: number, y?: number): this;
    /**
     * Skews the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number|string} x The skewing angle in the horizontal direction.
     * @param {number|string} [y] The skewing angle in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $skew(x: number | string, y?: number | string): this;
    /**
     * Translates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
     * @param {number} x The translating distance in the horizontal direction.
     * @param {number} [y] The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $translate(x: number, y?: number): this;
    /**
     * Transforms the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $transform(a: number, b: number, c: number, d: number, e: number, f: number): this;
    /**
     * Resets (overrides) the current transform to the specific identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
     * @param {number|Array} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $setTransform(a: number | number[], b?: number, c?: number, d?: number, e?: number, f?: number): this;
    /**
     * Retrieves the current transformation matrix being applied to the element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
     * @returns {Array} Returns the readonly transformation matrix.
     */
    $getTransform(): number[];
    /**
     * Resets the current transform to the initial identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $resetTransform(): this;
}

export declare interface CropperOptions {
    container?: Element | string;
    template?: string;
}

export declare class CropperSelection extends CropperElement_6 {
    static $name: string;
    static $version: string;
    protected $onCanvasAction: EventListener | null;
    protected $onCanvasActionStart: EventListener | null;
    protected $onCanvasActionEnd: EventListener | null;
    protected $onDocumentKeyDown: EventListener | null;
    protected $action: string;
    protected $actionStartTarget: EventTarget | null;
    protected $changing: boolean;
    protected $style: string;
    private $initialSelection;
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: number;
    initialAspectRatio: number;
    initialCoverage: number;
    active: boolean;
    linked: boolean;
    dynamic: boolean;
    movable: boolean;
    resizable: boolean;
    zoomable: boolean;
    multiple: boolean;
    keyboard: boolean;
    outlined: boolean;
    precise: boolean;
    protected set $canvas(element: CropperCanvas_4);
    protected get $canvas(): CropperCanvas_4;
    protected static get observedAttributes(): string[];
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getSelections(): CropperSelection[];
    protected $initSelection(center?: boolean, resize?: boolean): void;
    protected $createSelection(): CropperSelection;
    protected $removeSelection(selection?: CropperSelection): void;
    protected $handleActionStart(event: Event): void;
    protected $handleAction(event: Event): void;
    protected $handleActionEnd(): void;
    protected $handleKeyDown(event: Event): void;
    /**
     * Aligns the selection to the center of its parent element.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $center(): this;
    /**
     * Moves the selection.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the selection to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    /**
     * Adjusts the size the selection on a specific side or corner.
     * @param {string} action Indicates the side or corner to resize.
     * @param {number} [offsetX] The horizontal offset of the specific side or corner.
     * @param {number} [offsetY] The vertical offset of the specific side or corner.
     * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $resize(action: string, offsetX?: number, offsetY?: number, aspectRatio?: number): this;
    /**
     * Zooms the selection.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    /**
     * Changes the position and/or size of the selection.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @param {number} [aspectRatio] The new aspect ratio for this change only.
     * @param {number} [_force] Force change.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $change(x: number, y: number, width?: number, height?: number, aspectRatio?: number, _force?: boolean): this;
    /**
     * Resets the selection to its initial position and size.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $reset(): this;
    /**
     * Clears the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $clear(): this;
    /**
     * Refreshes the position or size of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $render(): this;
    /**
     * Generates a real canvas element, with the image (selected area only) draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

declare class CropperSelection_2 extends CropperElement_4_2 {
    static $name: string;
    static $version: string;
    protected $onCanvasAction: EventListener | null;
    protected $onCanvasActionStart: EventListener | null;
    protected $onCanvasActionEnd: EventListener | null;
    protected $onDocumentKeyDown: EventListener | null;
    protected $action: string;
    protected $actionStartTarget: EventTarget | null;
    protected $changing: boolean;
    protected $style: string;
    private $initialSelection;
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: number;
    initialAspectRatio: number;
    initialCoverage: number;
    active: boolean;
    linked: boolean;
    dynamic: boolean;
    movable: boolean;
    resizable: boolean;
    zoomable: boolean;
    multiple: boolean;
    keyboard: boolean;
    outlined: boolean;
    precise: boolean;
    protected set $canvas(element: CropperCanvas_3_2);
    protected get $canvas(): CropperCanvas_3_2;
    protected static get observedAttributes(): string[];
    protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $getSelections(): CropperSelection_2[];
    protected $initSelection(center?: boolean, resize?: boolean): void;
    protected $createSelection(): CropperSelection_2;
    protected $removeSelection(selection?: CropperSelection_2): void;
    protected $handleActionStart(event: Event): void;
    protected $handleAction(event: Event): void;
    protected $handleActionEnd(): void;
    protected $handleKeyDown(event: Event): void;
    /**
     * Aligns the selection to the center of its parent element.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $center(): this;
    /**
     * Moves the selection.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the selection to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    /**
     * Adjusts the size the selection on a specific side or corner.
     * @param {string} action Indicates the side or corner to resize.
     * @param {number} [offsetX] The horizontal offset of the specific side or corner.
     * @param {number} [offsetY] The vertical offset of the specific side or corner.
     * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $resize(action: string, offsetX?: number, offsetY?: number, aspectRatio?: number): this;
    /**
     * Zooms the selection.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    /**
     * Changes the position and/or size of the selection.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @param {number} [aspectRatio] The new aspect ratio for this change only.
     * @param {number} [_force] Force change.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $change(x: number, y: number, width?: number, height?: number, aspectRatio?: number, _force?: boolean): this;
    /**
     * Resets the selection to its initial position and size.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $reset(): this;
    /**
     * Clears the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $clear(): this;
    /**
     * Refreshes the position or size of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $render(): this;
    /**
     * Generates a real canvas element, with the image (selected area only) draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
        width?: number;
        height?: number;
        beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    }): Promise<HTMLCanvasElement>;
}

export declare class CropperShade extends CropperElement_4 {
    static $name: string;
    static $version: string;
    protected $onCanvasChange: EventListener | null;
    protected $onCanvasActionEnd: EventListener | null;
    protected $onCanvasActionStart: EventListener | null;
    protected $style: string;
    x: number;
    y: number;
    width: number;
    height: number;
    slottable: boolean;
    themeColor: string;
    protected set $canvas(element: CropperCanvas_3);
    protected get $canvas(): CropperCanvas_3;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    /**
     * Changes the position and/or size of the shade.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $change(x: number, y: number, width?: number, height?: number): this;
    /**
     * Resets the shade to its initial position and size.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $reset(): this;
    /**
     * Refreshes the position or size of the shade.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $render(): this;
}

export declare class CropperViewer extends CropperElement_9 {
    static $name: string;
    static $version: string;
    protected $onSelectionChange: EventListener | null;
    protected $onSourceImageLoad: EventListener | null;
    protected $onSourceImageTransform: EventListener | null;
    protected $scale: number;
    protected $style: string;
    resize: string;
    selection: string;
    slottable: boolean;
    protected set $image(element: CropperImage_2);
    protected get $image(): CropperImage_2;
    protected set $sourceImage(element: CropperImage_2);
    protected get $sourceImage(): CropperImage_2;
    protected set $canvas(element: CropperCanvas_2_2);
    protected get $canvas(): CropperCanvas_2_2;
    set $selection(element: CropperSelection_2);
    get $selection(): CropperSelection_2;
    protected static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected $handleSelectionChange(event: Event): void;
    protected $handleSourceImageLoad(): void;
    protected $handleSourceImageTransform(event?: Event): void;
    protected $render(selection?: Selection_2, matrix?: number[]): void;
    protected $transformImageByOffset(matrix: number[], x: number, y: number): void;
}

export declare const DEFAULT_TEMPLATE: string;

/**
 * Dispatch event on the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent}
 * @param {EventTarget} target The target of the event.
 * @param {string} type The name of the event.
 * @param {*} [detail] The data passed when initializing the event.
 * @param {CustomEventInit} [options] The other event options.
 * @returns {boolean} Returns the result value.
 */
export declare function emit(target: EventTarget, type: string, detail?: unknown, options?: CustomEventInit): boolean;

export declare const EVENT_ACTION = "action";

export declare const EVENT_ACTION_END = "actionend";

export declare const EVENT_ACTION_MOVE = "actionmove";

export declare const EVENT_ACTION_START = "actionstart";

export declare const EVENT_CHANGE = "change";

export declare const EVENT_ERROR = "error";

export declare const EVENT_KEYDOWN = "keydown";

export declare const EVENT_LOAD = "load";

export declare const EVENT_POINTER_DOWN: string;

export declare const EVENT_POINTER_MOVE: string;

export declare const EVENT_POINTER_UP: string;

export declare const EVENT_RESIZE = "resize";

export declare const EVENT_TOUCH_END: string;

export declare const EVENT_TOUCH_MOVE: string;

export declare const EVENT_TOUCH_START: string;

export declare const EVENT_TRANSFORM = "transform";

export declare const EVENT_WHEEL = "wheel";

/**
 * Get the max sizes in a rectangle under the given aspect ratio.
 * @param {object} data The original sizes.
 * @param {string} [type] The adjust type.
 * @returns {object} Returns the result sizes.
 */
export declare function getAdjustedSizes(data: SizeAdjustmentData | SizeAdjustmentDataWithoutWidth | SizeAdjustmentDataWithoutHeight, type?: SizeAdjustmentType): {
    width: number;
    height: number;
};

/**
 * Get the offset base on the document.
 * @param {Element} element The target element.
 * @returns {object} The offset data.
 */
export declare function getOffset(element: Element): {
    left: number;
    top: number;
};

export declare const HAS_POINTER_EVENT: boolean;

export declare const IS_BROWSER: boolean;

export declare const IS_TOUCH_DEVICE: boolean;

/**
 * Check if the given node is an element.
 * @param {*} node The node to check.
 * @returns {boolean} Returns `true` if the given node is an element; otherwise, `false`.
 */
export declare function isElement(node: unknown): node is Element;

/**
 * Check if the given value is a function.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
export declare function isFunction(value: unknown): value is (...args: unknown[]) => unknown;

/**
 * Check if the given value is not a number.
 */
declare const isNaN_2: (number: unknown) => boolean;
export { isNaN_2 as isNaN }

/**
 * Check if the given value is a number.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
export declare function isNumber(value: unknown): value is number;

/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
export declare function isObject(value: unknown): value is Record<string, unknown>;

/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */
export declare function isPlainObject(value: unknown): value is Record<string, unknown>;

/**
 * Check if the given value is a positive number.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
 */
export declare function isPositiveNumber(value: unknown): value is number;

/**
 * Check if the given value is a string.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */
export declare function isString(value: unknown): value is string;

/**
 * Check if the given value is undefined.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
export declare function isUndefined(value: unknown): value is undefined;

/**
 * Multiply multiple matrices.
 * @param {Array} matrix The first matrix.
 * @param {Array} args The rest matrices.
 * @returns {Array} Returns the result matrix.
 */
export declare function multiplyMatrices(matrix: number[], ...args: number[][]): number[];

export declare const NAMESPACE = "cropper";

/**
 * Defers the callback to be executed after the next DOM update cycle.
 * @param {*} [context] The `this` context.
 * @param {Function} [callback] The callback to execute after the next DOM update cycle.
 * @returns {Promise} A promise that resolves to nothing.
 */
export declare function nextTick(context?: unknown, callback?: () => void): Promise<void>;

/**
 * Remove event listener from the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {EventListenerOptions} [options] The options specify characteristics about the event listener.
 */
export declare function off(target: EventTarget, types: string, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions): void;

/**
 * Add event listener to the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
 */
export declare function on(target: EventTarget, types: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): void;

/**
 * Add once event listener to the event target.
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
 */
export declare function once(target: EventTarget, types: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): void;

declare interface Selection_2 {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare interface SizeAdjustmentData {
    aspectRatio: number;
    height: number;
    width: number;
}

declare interface SizeAdjustmentDataWithoutHeight {
    aspectRatio: number;
    width: number;
}

declare interface SizeAdjustmentDataWithoutWidth {
    aspectRatio: number;
    height: number;
}

declare type SizeAdjustmentType = 'contain' | 'cover';

/**
 * Convert an angle to a radian number.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/angle}
 * @param {number|string} angle The angle to convert.
 * @returns {number} Returns the radian number.
 */
export declare function toAngleInRadian(angle: number | string): number;

/**
 * Transform the given string from kebab-case to camelCase.
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
export declare function toCamelCase(value: string): string;

/**
 * Transform the given string from camelCase to kebab-case.
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
export declare function toKebabCase(value: string): string;

export declare const WINDOW: any;

export { }
