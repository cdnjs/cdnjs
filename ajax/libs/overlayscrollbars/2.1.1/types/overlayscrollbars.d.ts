declare type CacheValues<T> = [value: T, changed: boolean, previous?: T];
declare type UpdateCache<Value> = (force?: boolean) => CacheValues<Value>;

interface WH<T = number> {
    w: T;
    h: T;
}

declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};
declare type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : T[P];
};
declare type StyleObject<CustomCssProps = ''> = {
    [Key in keyof CSSStyleDeclaration | (CustomCssProps extends string ? CustomCssProps : '')]?: string | number;
};
declare type OverflowStyle = 'scroll' | 'hidden' | 'visible';

interface TRBL {
    t: number;
    r: number;
    b: number;
    l: number;
}

interface XY<T = number> {
    x: T;
    y: T;
}

declare type EventListener$1<EventArgs extends Record<string, any[]>, N extends keyof EventArgs> = (...args: EventArgs[N]) => void;
declare type EventListeners$1<EventArgs extends Record<string, any[]>> = {
    [K in keyof EventArgs]?: EventListener$1<EventArgs, K> | EventListener$1<EventArgs, K>[] | null;
};

/**
 * The overflow behavior of an axis.
 */
declare type OverflowBehavior = 
/** No scrolling is possible and the content is clipped. */
'hidden'
/** No scrolling is possible and the content isn't clipped. */
 | 'visible'
/** Scrolling is possible if there is an overflow. */
 | 'scroll'
/**
 * If the other axis has no overflow the behavior is similar to `visible`.
 * If the other axis has overflow the behavior is similar to `hidden`.
 */
 | 'visible-hidden'
/**
 * If the other axis has no overflow the behavior is similar to `visible`.
 * If the other axis has overflow the behavior is similar to `scroll`.
 */
 | 'visible-scroll';
/**
 * The scrollbars visibility behavior.
 */
declare type ScrollbarsVisibilityBehavior = 
/** The scrollbars are always visible. */
'visible'
/** The scrollbars are always hidden. */
 | 'hidden'
/** The scrollbars are only visibile if there is overflow. */
 | 'auto';
/**
 * The scrollbars auto hide behavior
 */
declare type ScrollbarsAutoHideBehavior = 
/** The scrollbars are never hidden automatically. */
'never'
/** The scrollbars are hidden unless the user scrolls. */
 | 'scroll'
/** The scrollbars are hidden unless the pointer moves in the host element or the user scrolls. */
 | 'move'
/** The scrollbars are hidden if the pointer leaves the host element or unless the user scrolls. */
 | 'leave';
/**
 * Describes the options of a OverlayScrollbars instance.
 */
interface Options {
    /** Whether the padding shall be absolute. */
    paddingAbsolute: boolean;
    /** Whether to show the native scrollbars. Has only an effect it the native scrollbars are overlaid. */
    showNativeOverlaidScrollbars: boolean;
    /** Customizes the automatic update behavior. */
    update: {
        /**
         * The given Event(s) from the elements with the given selector(s) will trigger an update.
         * Useful for everything the MutationObserver and ResizeObserver can't detect
         * e.g.: and Images `load` event or the `transitionend` / `animationend` events.
         */
        elementEvents: Array<[elementSelector: string, eventNames: string]> | null;
        /**
         * The debounce which is used to detect content changes.
         * If a tuple is provided you can customize the `timeout` and the `maxWait` in milliseconds.
         * If a single number customizes only the `timeout`.
         *
         * If the `timeout` is `0`, a debounce still exists. (its executed via `requestAnimationFrame`).
         */
        debounce: [timeout: number, maxWait: number] | number | null;
        /**
         * HTML attributes which will trigger an update if they're changed.
         * Basic attributes like `id`, `class`, `style` etc. are always observed and doesn't have to be added explicitly.
         */
        attributes: string[] | null;
        /**
         * A function which makes it possible to ignore a content mutation or null if nothing shall be ignored.
         * @param mutation The MutationRecord from the MutationObserver.
         * @returns A Truthy value if the mutation shall be ignored, a falsy value otherwise.
         */
        ignoreMutation: ((mutation: MutationRecord) => any) | null;
    };
    /** Customizes the overflow behavior per axis. */
    overflow: {
        /** The overflow behavior of the horizontal (x) axis. */
        x: OverflowBehavior;
        /** The overflow behavior of the vertical (y) axis. */
        y: OverflowBehavior;
    };
    /** Customizes appearance of the scrollbars. */
    scrollbars: {
        /**
         * The scrollbars theme.
         * The theme value will be added as `class` to all `scrollbar` elements of the instance.
         */
        theme: string | null;
        /** The scrollbars visibility behavior. */
        visibility: ScrollbarsVisibilityBehavior;
        /** The scrollbars auto hide behavior. */
        autoHide: ScrollbarsAutoHideBehavior;
        /** The scrollbars auto hide delay in milliseconds. */
        autoHideDelay: number;
        /** Whether its possible to drag the handle of a scrollbar to scroll the viewport. */
        dragScroll: boolean;
        /** Whether its possible to click the track of a scrollbar to scroll the viewport. */
        clickScroll: boolean;
        /**
         * An array of pointer types which shall be supported.
         * Common pointer types are: `mouse`, `pen` and `touch`.
         * https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType
         */
        pointers: string[] | null;
    };
}
declare type ReadonlyOptions = DeepReadonly<Options>;
declare type PartialOptions = DeepPartial<Options>;

declare type StaticInitialization = HTMLElement | false | null;
declare type DynamicInitialization = HTMLElement | boolean | null;
/**
 * Static elements are elements which MUST be present in the final DOM.
 * If an `HTMLElement` is passed the passed element will be taken as the repsective element.
 * With `false`, `null` or `undefined` an appropriate element is generated automatically.
 */
declare type StaticInitializationElement<Args extends any[]> = 
/** A function which returns the the StaticInitialization value. */
((...args: Args) => StaticInitialization)
/** The StaticInitialization value. */
 | StaticInitialization;
/**
 * Dynamic elements are elements which CAN be present in the final DOM.
 * If an `HTMLElement`is passed the passed element will be taken as the repsective element.
 * With `true` an appropriate element is generated automatically.
 * With `false`, `null` or `undefined` the element won't be in the DOM.
 */
declare type DynamicInitializationElement<Args extends any[]> = 
/** A function which returns the the DynamicInitialization value. */
((...args: Args) => DynamicInitialization)
/** The DynamicInitialization value. */
 | DynamicInitialization;
/**
 * Describes how a OverlayScrollbar instance should initialize.
 */
declare type Initialization = {
    /**
     * Customizes which elements are generated and used.
     * If a function is passed to any of the fields, it receives the `target` element as its argument.
     * Any passed function should be a "pure" function. (same input produces same output)
     */
    elements: {
        /**
         * Assign a custom element as the host element.
         * Only relevant if the target element is a Textarea.
         */
        host: StaticInitializationElement<[target: InitializationTargetElement]>;
        /** Assign a custom element as the viewport element. */
        viewport: StaticInitializationElement<[target: InitializationTargetElement]>;
        /** Assign a custom element as the padding element or force the element not to be generated. */
        padding: DynamicInitializationElement<[target: InitializationTargetElement]>;
        /** Assign a custom element as the content element or force the element not to be generated. */
        content: DynamicInitializationElement<[target: InitializationTargetElement]>;
    };
    /**
     * Customizes elements related to the scrollbars.
     * If a function is passed, it receives the `target`, `host` and `viewport` element as arguments.
     */
    scrollbars: {
        slot: DynamicInitializationElement<[
            target: InitializationTargetElement,
            host: HTMLElement,
            viewport: HTMLElement
        ]>;
    };
    /**
     * Customizes the cancelation behavior.
     */
    cancel: {
        /** Whether the initialization shall be canceled if the native scrollbars are overlaid. */
        nativeScrollbarsOverlaid: boolean;
        /**
         * Whether the initialization shall be canceled if its applied to a body element.
         * With `true` an initialization is always canceled, with `false` its never canceled.
         * With `null` the initialization will only be canceled when the initialization would affect the browsers functionality. (window.scrollTo, mobile browser behavior etc.)
         */
        body: boolean | null;
    };
};
declare type PartialInitialization = DeepPartial<Initialization>;
/** The initialization target element. */
declare type InitializationTargetElement = HTMLElement;
/**
 * The initialization target object.
 * OverlayScrollbars({ target: myElement }) is equivalent to OverlayScrollbars(myElement).
 */
declare type InitializationTargetObject = PartialInitialization & {
    target: InitializationTargetElement;
};
/** The initialization target. */
declare type InitializationTarget = InitializationTargetElement | InitializationTargetObject;

declare type EnvironmentEventArgs = {
    z: [];
    r: [];
};
/**
 * Describes the OverlayScrollbars environment.
 */
interface Environment {
    /** The native scrollbars size of the browser / system. */
    scrollbarsSize: XY<number>;
    /** Whether the native scrollbars are overlaid. */
    scrollbarsOverlaid: XY<boolean>;
    /** Whether the browser supports native scrollbars hiding. */
    scrollbarsHiding: boolean;
    /** The rtl scroll behavior of the browser. */
    rtlScrollBehavior: {
        n: boolean;
        i: boolean;
    };
    /** Whether the browser supports all needed Flexbox features for OverlayScrollbars to work in a more performant way. */
    flexboxGlue: boolean;
    /** Whether the browser supports custom css properties. (also known as css variables) */
    cssCustomProperties: boolean;
    /** The default Initialization to use if nothing else is specified. */
    staticDefaultInitialization: Initialization;
    /** The default Options to use if nothing else is specified. */
    staticDefaultOptions: Options;
    /** Returns the current default Initialization. */
    getDefaultInitialization(): Initialization;
    /** Returns the current default Options. */
    getDefaultOptions(): Options;
    /**
     * Sets a new default Initialization.
     * If the new default Initialization is partially filled, its deeply merged with the current default Initialization.
     * @param newDefaultInitialization The new default Initialization.
     * @returns The current default Initialization.
     */
    setDefaultInitialization(newDefaultInitialization: PartialInitialization): Initialization;
    /**
     * Sets new default Options.
     * If the new default Options are partially filled, they're deeply merged with the current default Options.
     * @param newDefaultOptions The new default Options.
     * @returns The current default options.
     */
    setDefaultOptions(newDefaultOptions: PartialOptions): Options;
}
interface InternalEnvironment {
    readonly _nativeScrollbarsSize: XY;
    readonly _nativeScrollbarsOverlaid: XY<boolean>;
    readonly _nativeScrollbarsHiding: boolean;
    readonly _rtlScrollBehavior: {
        n: boolean;
        i: boolean;
    };
    readonly _flexboxGlue: boolean;
    readonly _cssCustomProperties: boolean;
    readonly _staticDefaultInitialization: Initialization;
    readonly _staticDefaultOptions: Options;
    _addZoomListener(listener: EventListener$1<EnvironmentEventArgs, 'z'>): () => void;
    _addResizeListener(listener: EventListener$1<EnvironmentEventArgs, 'r'>): () => void;
    _getDefaultInitialization(): Initialization;
    _setDefaultInitialization(newInitialization: PartialInitialization): Initialization;
    _getDefaultOptions(): Options;
    _setDefaultOptions(newDefaultOptions: PartialOptions): Options;
}

/** Describes the instance of a OverlayScrollbars plugin. */
declare type PluginInstance = 
/** A `static` plugin. Its neither bound to a instance nor to the static object. */
Record<string, unknown>
/**
 * A plugin which is bound to either a instance or to the static object.
 * The function will be called multiple times. Once with the static object and each time a new instance is created.
 * The plugin then can add new methods or fields to thow objects.
 * These plugins should be side-effect free and deterministic. (same input produces same output)
 */
 | ((staticObj?: OverlayScrollbarsStatic, instanceObj?: OverlayScrollbars) => void);
/** Describes a OverlayScrollbars plugin. */
declare type Plugin<T extends PluginInstance = PluginInstance> = {
    [pluginName: string]: T;
};

declare type SizeObserverPluginInstance = {
    _: (listenerElement: HTMLElement, onSizeChangedCallback: (appear: boolean) => any, observeAppearChange: boolean) => [appearCallback: () => any, offFns: (() => any)[]];
};
declare const SizeObserverPlugin: Plugin<SizeObserverPluginInstance>;

interface StructureSetupState {
    _padding: TRBL;
    _paddingAbsolute: boolean;
    _viewportPaddingStyle: StyleObject;
    _overflowEdge: XY<number>;
    _overflowAmount: XY<number>;
    _overflowStyle: XY<OverflowStyle>;
    _hasOverflow: XY<boolean>;
    _heightIntrinsic: boolean;
    _directionIsRTL: boolean;
}

interface ViewportOverflowState {
    _scrollbarsHideOffset: XY<number>;
    _scrollbarsHideOffsetArrange: XY<boolean>;
    _overflowScroll: XY<boolean>;
    _overflowStyle: XY<OverflowStyle>;
}
declare type GetViewportOverflowState = (showNativeOverlaidScrollbars: boolean, viewportStyleObj?: StyleObject) => ViewportOverflowState;
declare type HideNativeScrollbars = (viewportOverflowState: ViewportOverflowState, directionIsRTL: boolean, viewportArrange: boolean, viewportStyleObj: StyleObject) => void;

declare type ArrangeViewport = (viewportOverflowState: ViewportOverflowState, viewportScrollSize: WH<number>, sizeFraction: WH<number>, directionIsRTL: boolean) => boolean;
declare type UndoViewportArrangeResult = [
    redoViewportArrange: () => void,
    overflowState?: ViewportOverflowState
];
declare type UndoArrangeViewport = (showNativeOverlaidScrollbars: boolean, directionIsRTL: boolean, viewportOverflowState?: ViewportOverflowState) => UndoViewportArrangeResult;
declare type ScrollbarsHidingPluginInstance = {
    _createUniqueViewportArrangeElement(env: InternalEnvironment): HTMLStyleElement | false;
    _overflowUpdateSegment(doViewportArrange: boolean, flexboxGlue: boolean, viewport: HTMLElement, viewportArrange: HTMLStyleElement | false | null | undefined, getState: () => StructureSetupState, getViewportOverflowState: GetViewportOverflowState, hideNativeScrollbars: HideNativeScrollbars): [ArrangeViewport, UndoArrangeViewport];
    _envWindowZoom(): (envInstance: InternalEnvironment, updateNativeScrollbarSizeCache: UpdateCache<XY<number>>, triggerEvent: () => void) => void;
};
declare const ScrollbarsHidingPlugin: Plugin<ScrollbarsHidingPluginInstance>;

declare type ClickScrollPluginInstance = {
    _: (moveHandleRelative: (deltaMovement: number) => void, getHandleOffset: (handleRect?: DOMRect, trackRect?: DOMRect) => number, startOffset: number, handleLength: number, relativeTrackPointerOffset: number) => () => void;
};
declare const ClickScrollPlugin: Plugin<ClickScrollPluginInstance>;

/**
 * Describes the changes that happend due to an update.
 */
interface OnUpdatedEventListenerArgs {
    /** Hints which describe what changed in the DOM.  */
    updateHints: {
        /** Whether the size of the host element changed. */
        sizeChanged: boolean;
        /** Whether the direction of the host element changed. */
        directionChanged: boolean;
        /** Whether the intrinsic height behavior changed. */
        heightIntrinsicChanged: boolean;
        /** Whether the overflow edge (clientWidth / clientHeight) of the viewport element changed. */
        overflowEdgeChanged: boolean;
        /** Whether the overflow amount changed. */
        overflowAmountChanged: boolean;
        /** Whether the overflow style changed. */
        overflowStyleChanged: boolean;
        /** Whether an host mutation took place. */
        hostMutation: boolean;
        /** Whether an content mutation took place. */
        contentMutation: boolean;
    };
    /** The changed options. */
    changedOptions: PartialOptions;
    /** Whether the update happened with and force invalidated cache. */
    force: boolean;
}
/**
 * A mapping between event names and their listener arguments.
 */
declare type EventListenerArgs = {
    /** Triggered after all elements are initialized and appended. */
    initialized: [instance: OverlayScrollbars];
    /** Triggered after an update. */
    updated: [instance: OverlayScrollbars, onUpdatedArgs: OnUpdatedEventListenerArgs];
    /** Triggered after all elements, observers and events are destroyed. */
    destroyed: [instance: OverlayScrollbars, canceled: boolean];
    /** Triggered on scroll. */
    scroll: [instance: OverlayScrollbars, event: Event];
};
/**
 * An object which describes event listeners.
 * Simplified it looks like:
 * {
 *   [eventName: string]: EventListener | EventListener[]
 * }
 */
declare type EventListeners = EventListeners$1<EventListenerArgs>;
/** An event listener. */
declare type EventListener<N extends keyof EventListenerArgs> = EventListener$1<EventListenerArgs, N>;

/**
 * The primary entry point to OverlayScrollbars.
 */
interface OverlayScrollbarsStatic {
    /**
     * Returns the current OverlayScrollbars instance if the target already has an instance.
     * @param target The initialization target to from which the instance shall be returned.
     */
    (target: InitializationTarget): OverlayScrollbars | undefined;
    /**
     * Initializes a new OverlayScrollbars instance to the given target
     * or returns the current OverlayScrollbars instance if the target already has an instance.
     * @param target The target.
     * @param options The options. (Can be just an empty object)
     * @param eventListeners Optional event listeners.
     */
    (target: InitializationTarget, options: PartialOptions, eventListeners?: EventListeners): OverlayScrollbars;
    /**
     * Adds one or multiple plugins.
     * @param plugin Either a signle or an array of plugins to add.
     */
    plugin(plugin: Plugin | Plugin[]): void;
    /**
     * Checks whether the passed value is a valid and not destroyed overlayscrollbars instance.
     * @param osInstance The value which shall be checked.
     */
    valid(osInstance: any): osInstance is OverlayScrollbars;
    /**
     * Returns the overlayscrollbars environment.
     */
    env(): Environment;
}
/**
 * Describes a OverlayScrollbars instances state.
 */
interface State {
    /** Describes the current padding in pixel. */
    padding: TRBL;
    /** Whether the current padding is absolute. */
    paddingAbsolute: boolean;
    /** The client width (x) & height (y) of the viewport in pixel. */
    overflowEdge: XY<number>;
    /** The overflow amount in pixel. */
    overflowAmount: XY<number>;
    /** The css overflow style of the viewport. */
    overflowStyle: XY<OverflowStyle>;
    /** Whether the viewport has an overflow. */
    hasOverflow: XY<boolean>;
    /** Whether the direction is considered rtl. */
    directionRTL: boolean;
    /** Whether the instance is considered destroyed. */
    destroyed: boolean;
}
/**
 * Describes the elements of a scrollbar.
 */
interface ScrollbarElements {
    /**
     * The root element of the scrollbar.
     * The HTML structure looks like this:
     * <scrollbar>
     *   <track>
     *     <handle />
     *   </track>
     * </scrollbar>
     */
    scrollbar: HTMLElement;
    /** The track element of the scrollbar. */
    track: HTMLElement;
    /** The handle element of the scrollbar. */
    handle: HTMLElement;
}
/**
 * Describes the elements of a scrollbar and provides the possibility to clone them.
 */
interface CloneableScrollbarElements extends ScrollbarElements {
    /**
     * Clones the current scrollbar and returns the cloned elements.
     * The returned elements aren't added to the DOM.
     */
    clone(): ScrollbarElements;
}
/**
 * Describes the elements of a OverlayScrollbars instance.
 */
interface Elements {
    /** The element the instance was applied to. */
    target: HTMLElement;
    /** The host element. Its the root of all other elements. */
    host: HTMLElement;
    /**
     * The element which is responsible to apply correct paddings.
     * Depending on the Initialization it can be the same as the viewport element.
     */
    padding: HTMLElement;
    /** The element which is responsible to do any scrolling. */
    viewport: HTMLElement;
    /**
     * The element which is responsible to hold the content.
     * Depending on the Initialization it can be the same as the viewport element.
     */
    content: HTMLElement;
    /**
     * The element through which you can get the current `scrollLeft` or `scrollTop` offset.
     * Depending on the target element it can be the same as the viewport element.
     */
    scrollOffsetElement: HTMLElement;
    /**
     * The element through which you can add `scroll` events.
     * Depending on the target element it can be the same as the viewport element.
     */
    scrollEventElement: HTMLElement | Document;
    /** The horizontal scrollbar elements. */
    scrollbarHorizontal: CloneableScrollbarElements;
    /** The vertical scrollbar elements. */
    scrollbarVertical: CloneableScrollbarElements;
}
/**
 * Describes a OverlayScrollbars instance.
 */
interface OverlayScrollbars {
    /** Get the current options of the instance. */
    options(): Options;
    /**
     * Sets the options of the instance.
     * If the new options are partially filled, they're deeply merged with either the current options or the current default options.
     * @param newOptions The new options.
     * @param pure If true the new options will be merged with the current default options instead of the current options.
     * @returns Returns the current options of the instance.
     */
    options(newOptions: PartialOptions, pure?: boolean): Options;
    /**
     * Adds event listeners to the instance.
     * @param eventListeners An object which contains the added listeners.
     * @param pure If true all already added event listeners will be removed before the new listeners are added.
     * @returns Returns a function which removes the added listeners.
     */
    on(eventListeners: EventListeners, pure?: boolean): () => void;
    /**
     * Adds an event listener to the instance.
     * @param name The name of the event.
     * @param listener The listener which is invoked on that event.
     * @returns Returns a function which removes the added listeners.
     */
    on<N extends keyof EventListenerArgs>(name: N, listener: EventListener<N>): () => void;
    /**
     * Adds multiple event listeners to the instance.
     * @param name The name of the event.
     * @param listener The listeners which are invoked on that event.
     * @returns Returns a function which removes the added listeners.
     */
    on<N extends keyof EventListenerArgs>(name: N, listener: EventListener<N>[]): () => void;
    /**
     * Removes an event listener from the instance.
     * @param name The name of the event.
     * @param listener The listener which shall be removed.
     */
    off<N extends keyof EventListenerArgs>(name: N, listener: EventListener<N>): void;
    /**
     * Removes multiple event listeners from the instance.
     * @param name The name of the event.
     * @param listener The listeners which shall be removed.
     */
    off<N extends keyof EventListenerArgs>(name: N, listener: EventListener<N>[]): void;
    /**
     * Updates the instance.
     * @param force Whether the update should force the cache to be invalidated.
     * @returns A boolean which indicates whether the `update` event was triggered through this update.
     * The update event is only triggered if something changed because of this update.
     */
    update(force?: boolean): boolean;
    /** Returns the state of the instance. */
    state(): State;
    /** Returns the elements of the instance. */
    elements(): Elements;
    /** Destroys the instance. */
    destroy(): void;
}
declare const OverlayScrollbars: OverlayScrollbarsStatic;

export { ClickScrollPlugin, DynamicInitializationElement, EventListener, EventListenerArgs, EventListeners, Initialization, InitializationTarget, InitializationTargetElement, InitializationTargetObject, OnUpdatedEventListenerArgs, Options, OverflowBehavior, OverlayScrollbars, PartialInitialization, PartialOptions, Plugin, PluginInstance, ReadonlyOptions, ScrollbarsAutoHideBehavior, ScrollbarsHidingPlugin, ScrollbarsVisibilityBehavior, SizeObserverPlugin, StaticInitializationElement };
