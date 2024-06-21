interface WH<T = number> {
    w: T;
    h: T;
}

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : T[P];
};
type StyleObjectKey = Extract<keyof CSSStyleDeclaration, string> | `--${string}`;
type StyleObjectValue = string | number | false | null;
type StyleObject = {
    [Key in StyleObjectKey]?: StyleObjectValue;
};
type OverflowStyle = 'scroll' | 'hidden' | 'visible';

interface XY<T = number> {
    x: T;
    y: T;
}

interface TRBL {
    t: number;
    r: number;
    b: number;
    l: number;
}

interface ScrollCoordinates {
    /** The start (origin) scroll coordinates for each axis. */
    _start: XY<number>;
    /** The end scroll coordinates for each axis. */
    _end: XY<number>;
}

type EventListener$1<EventArgs extends Record<string, any[]>, N extends keyof EventArgs> = (...args: EventArgs[N]) => void;
type EventListeners$1<EventArgs extends Record<string, any[]>> = {
    [K in keyof EventArgs]?: EventListener$1<EventArgs, K> | EventListener$1<EventArgs, K>[] | null;
};

type OptionsField = string;
type OptionsPrimitiveValue = boolean | number | string | Array<any> | ReadonlyArray<any> | [any] | [any, ...any[]] | ((this: any, ...args: any[]) => any) | null;
type OptionsObject = {
    [field: OptionsField]: OptionsPrimitiveValue | OptionsObject;
};
type OptionsObjectFieldNameTuples<T> = T extends OptionsPrimitiveValue ? [] : {
    [K in Extract<keyof T, OptionsField>]: [K, ...OptionsObjectFieldNameTuples<T[K]>];
}[Extract<keyof T, OptionsField>];
type JoinOptionsObjectFieldTuples<T extends OptionsField[], IncompletePath extends boolean = false> = T extends [infer F] ? F : T extends [infer F, ...infer R] ? F extends OptionsField ? (IncompletePath extends true ? F : never) | `${F}.${JoinOptionsObjectFieldTuples<Extract<R, OptionsField[]>>}` : never : OptionsField;
type SplitJoinedOptionsObjectFieldTuples<S extends string> = string extends S ? OptionsField[] : S extends '' ? [] : S extends `${infer T}.${infer U}` ? [T, ...SplitJoinedOptionsObjectFieldTuples<U>] : [S];
type OptionsObjectFieldTuplesType<O, T extends OptionsField[]> = T extends [infer F] ? F extends keyof O ? O[F] : never : T extends [infer F, ...infer R] ? F extends keyof O ? O[F] extends OptionsPrimitiveValue ? O[F] : OptionsObjectFieldTuplesType<O[F], Extract<R, OptionsField[]>> : never : never;
type OptionsObjectFieldPath<O extends OptionsObject> = JoinOptionsObjectFieldTuples<OptionsObjectFieldNameTuples<O>, true>;
type OptionsObjectFieldPathType<O extends OptionsObject, P extends string> = OptionsObjectFieldTuplesType<O, SplitJoinedOptionsObjectFieldTuples<P>>;
/**
 * The overflow behavior of an axis.
 */
type OverflowBehavior = 
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
type ScrollbarsVisibilityBehavior = 
/** The scrollbars are always visible. */
'visible'
/** The scrollbars are always hidden. */
 | 'hidden'
/** The scrollbars are only visibile if there is overflow. */
 | 'auto';
/**
 * The scrollbars auto hide behavior
 */
type ScrollbarsAutoHideBehavior = 
/** The scrollbars are never hidden automatically. */
'never'
/** The scrollbars are hidden unless the user scrolls. */
 | 'scroll'
/** The scrollbars are hidden unless the pointer moves in the host element or the user scrolls. */
 | 'move'
/** The scrollbars are hidden if the pointer leaves the host element or unless the user scrolls. */
 | 'leave';
/**
 * The options of a OverlayScrollbars instance.
 */
type Options = {
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
        /** Whether the scrollbars auto hide behavior is suspended until a scroll happened. */
        autoHideSuspend: boolean;
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
};
type ReadonlyOptions = DeepReadonly<Options>;
type PartialOptions = DeepPartial<Options>;
type OptionsCheckFn<O extends OptionsObject> = <P extends OptionsObjectFieldPath<O>>(path: P) => [value: OptionsObjectFieldPathType<O, P>, changed: boolean];

type PluginModuleInstance = Record<string | number | symbol, any>;
type InstancePluginEvent = {
    /**
     * Adds event listeners to the instance.
     * @param eventListeners An object which contains the added listeners.
     * @returns Returns a function which removes the added listeners.
     */
    (eventListeners: EventListeners): () => void;
    /**
     * Adds a single event listener to the instance.
     * @param name The name of the event.
     * @param listener The listener which is invoked on that event.
     * @returns Returns a function which removes the added listeners.
     */
    <N extends keyof EventListenerArgs>(name: N, listener: EventListener<N>): () => void;
    /**
     * Adds multiple event listeners to the instance.
     * @param name The name of the event.
     * @param listener The listeners which are invoked on that event.
     * @returns Returns a function which removes the added listeners.
     */
    <N extends keyof EventListenerArgs>(name: N, listener: EventListener<N>[]): () => void;
};
/**
 * Describes a OverlayScrollbars plugin module.
 * Plugin modules must be side-effect free and deterministic. (same input produces same output)
 */
type PluginModule<S extends PluginModuleInstance | void = PluginModuleInstance | void, I extends PluginModuleInstance | void = PluginModuleInstance | void> = (S extends PluginModuleInstance ? {
    /**
     * Creates a plugin which is bound to the static object.
     * The function will be called once with the static object as soon as the plugin is registered.
     * The plugin can add new methods or fields to the passed static object.
     * @param osStatic The static object the plugin is bound to.
     * @returns The plugins instance object or a falsy value if the plugin doesn't need any instance object.
     */
    static: (osStatic: OverlayScrollbarsStatic) => S | void;
} : object) & (I extends PluginModuleInstance ? {
    /**
     * Creates a A plugin which is bound to an instance.
     * The function will be called each time a new instance is created.
     * The plugin can add new methods or fields to the passed instance object.
     * @param osInstance The instance object the plugin is bound to.
     * @param event A function which adds events to the instance which can't be removed from outside the plugin. (instance events added with the `on` function can be removed with the optional `pure` parameter)
     * @param osStatic The static object the plugin is bound to.
     * @returns The plugins instance object or a falsy value if the plugin doesn't need any instance object.
     */
    instance: (osInstance: OverlayScrollbars, event: InstancePluginEvent, osStatic: OverlayScrollbarsStatic) => I | void;
} : object);
/**
 * Describes a OverlayScrollbar plugin.
 */
type Plugin<Name extends string = string, S extends PluginModuleInstance | void = PluginModuleInstance | void, I extends PluginModuleInstance | void = PluginModuleInstance | void> = {
    [pluginName in Name]: PluginModule<S, I>;
};
/**
 * Describes a OverlayScrollbar plugin which has only a static module.
 */
type StaticPlugin<Name extends string = string, T extends PluginModuleInstance = PluginModuleInstance> = Plugin<Name, T, void>;
/**
 * Describes a OverlayScrollbar plugin which has only a instance module.
 */
type InstancePlugin<Name extends string = string, T extends PluginModuleInstance = PluginModuleInstance> = Plugin<Name, void, T>;
/**
 * Infers the type of the static modules instance of the passed plugin.
 */
type InferStaticPluginModuleInstance<T extends StaticPlugin> = T extends StaticPlugin<infer Name> ? T[Name]['static'] extends (...args: any[]) => any ? ReturnType<T[Name]['static']> : void : void;
/**
 * Infers the type of the instance modules instance of the passed plugin.
 */
type InferInstancePluginModuleInstance<T extends InstancePlugin> = T extends InstancePlugin<infer Name> ? T[Name]['instance'] extends (...args: any[]) => any ? ReturnType<T[Name]['instance']> : void : void;

declare const SizeObserverPlugin: {
    __osSizeObserverPlugin: {
        static: () => (listenerElement: HTMLElement, onSizeChangedCallback: (appear: boolean) => any, observeAppearChange: boolean | null | undefined) => [appearCallback: () => void, offFns: (() => any)[]];
    };
};

type StaticInitialization = HTMLElement | false | null;
type DynamicInitialization = HTMLElement | boolean | null;
/**
 * Static elements are elements which MUST be present in the final DOM.
 * If an `HTMLElement` is passed the passed element will be taken as the repsective element.
 * With `false`, `null` or `undefined` an appropriate element is generated automatically.
 */
type StaticInitializationElement<Args extends any[]> = 
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
type DynamicInitializationElement<Args extends any[]> = 
/** A function which returns the the DynamicInitialization value. */
((...args: Args) => DynamicInitialization)
/** The DynamicInitialization value. */
 | DynamicInitialization;
/**
 * Describes how a OverlayScrollbar instance should initialize.
 */
type Initialization = {
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
type PartialInitialization = DeepPartial<Initialization>;
/** The initialization target element. */
type InitializationTargetElement = HTMLElement;
/**
 * The initialization target object.
 * OverlayScrollbars({ target: myElement }) is equivalent to OverlayScrollbars(myElement).
 */
type InitializationTargetObject = PartialInitialization & {
    target: InitializationTargetElement;
};
/** The initialization target. */
type InitializationTarget = InitializationTargetElement | InitializationTargetObject;

interface StructureSetupElementsObj {
    _target: InitializationTargetElement;
    _host: HTMLElement;
    _viewport: HTMLElement;
    _padding: HTMLElement | false;
    _content: HTMLElement | false;
    _scrollOffsetElement: HTMLElement;
    _scrollEventElement: HTMLElement | Document;
    _originalScrollOffsetElement: HTMLElement;
    _isTextarea: boolean;
    _isBody: boolean;
    _documentElm: Document;
    _targetIsElm: boolean;
    _viewportIsTarget: boolean;
    _windowElm: () => Window;
    _viewportHasClass: (viewportAttributeClassName: string) => boolean;
    _viewportAddRemoveClass: (viewportAttributeClassName: string, add?: boolean) => () => void;
}

interface ObserversSetupState {
    _heightIntrinsic: boolean;
    _directionIsRTL: boolean;
}

interface StructureSetupState {
    _padding: TRBL;
    _paddingAbsolute: boolean;
    _viewportPaddingStyle: StyleObject;
    _overflowEdge: XY<number>;
    _overflowAmount: XY<number>;
    _overflowStyle: XY<OverflowStyle>;
    _hasOverflow: XY<boolean>;
    _scrollCoordinates: ScrollCoordinates;
}

type EnvironmentEventArgs = {
    r: [scrollbarSizeChanged?: boolean];
};
interface Env {
    readonly _nativeScrollbarsSize: XY;
    readonly _nativeScrollbarsOverlaid: XY<boolean>;
    readonly _nativeScrollbarsHiding: boolean;
    readonly _scrollTimeline: boolean;
    readonly _staticDefaultInitialization: Initialization;
    readonly _staticDefaultOptions: Options;
    _addResizeListener(listener: EventListener$1<EnvironmentEventArgs, 'r'>): () => void;
    _getDefaultInitialization(): Initialization;
    _setDefaultInitialization(newInitialization: PartialInitialization): Initialization;
    _getDefaultOptions(): Options;
    _setDefaultOptions(newDefaultOptions: PartialOptions): Options;
}

interface ViewportOverflowState {
    _overflowScroll: XY<boolean>;
    _overflowStyle: XY<OverflowStyle>;
}

declare const ScrollbarsHidingPlugin: {
    __osScrollbarsHidingPlugin: {
        static: () => {
            _viewportArrangement: (structureSetupElements: StructureSetupElementsObj, structureSetupState: StructureSetupState, observersSetupState: ObserversSetupState, env: Env, checkOptions: OptionsCheckFn<Options>) => {
                _getViewportOverflowHideOffset: (viewportOverflowState: ViewportOverflowState) => {
                    _scrollbarsHideOffset: {
                        x: number;
                        y: number;
                    };
                    _scrollbarsHideOffsetArrange: {
                        x: boolean;
                        y: boolean;
                    };
                };
                _arrangeViewport: (viewportOverflowState: ViewportOverflowState, viewportScrollSize: WH<number>, sizeFraction: WH<number>) => boolean;
                _undoViewportArrange: (viewportOverflowState?: ViewportOverflowState) => readonly [() => void, ViewportOverflowState] | readonly [() => void];
                _hideNativeScrollbars: (viewportOverflowState: ViewportOverflowState, { _directionIsRTL }: ObserversSetupState, viewportArrange: boolean) => StyleObject | undefined;
            };
        };
    };
};

declare const ClickScrollPlugin: {
    __osClickScrollPlugin: {
        static: () => (moveHandleRelative: (deltaMovement: number) => void, getHandleOffset: (handleRect?: DOMRect, trackRect?: DOMRect) => number, startOffset: number, handleLength: number, relativeTrackPointerOffset: number) => (() => void);
    };
};

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
        /** Whether the scroll coordinates changed. */
        scrollCoordinatesChanged: boolean;
        /** Whether an host mutation took place. */
        hostMutation: boolean;
        /** Whether an content mutation took place. */
        contentMutation: boolean;
        /** Whether the host element appeared. */
        appear: boolean;
    };
    /** The changed options. */
    changedOptions: PartialOptions;
    /** Whether the update happened with an force invalidated cache. */
    force: boolean;
}
/**
 * A mapping between event names and their listener arguments.
 */
type EventListenerArgs = {
    /** Dispatched after all elements are initialized and appended. */
    initialized: [instance: OverlayScrollbars];
    /** Dispatched after an update. */
    updated: [instance: OverlayScrollbars, onUpdatedArgs: OnUpdatedEventListenerArgs];
    /** Dispatched after all elements, observers and events are destroyed. */
    destroyed: [instance: OverlayScrollbars, canceled: boolean];
    /** Dispatched on scroll. */
    scroll: [instance: OverlayScrollbars, event: Event];
};
/**
 * An object which describes event listeners.
 * Simplified it looks like:
 * {
 *   [eventName: string]: EventListener | EventListener[]
 * }
 */
type EventListeners = EventListeners$1<EventListenerArgs>;
/** An event listener. */
type EventListener<N extends keyof EventListenerArgs> = EventListener$1<EventListenerArgs, N>;

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
    /** Whether the browser supports the ScrollTimeline API. */
    scrollTimeline: boolean;
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
     * Adds a single plugin.
     * @param plugin The plugin to be added.
     * @returns The plugins static modules instance or `void` if no instance was found.
     */
    plugin<P extends Plugin>(plugin: P): P extends StaticPlugin ? InferStaticPluginModuleInstance<P> : void;
    /**
     * Adds multiple plugins.
     * @param plugins The plugins to be added.
     * @returns The plugins static modules instances or `void` if no instance was found.
     */
    plugin<P extends [Plugin, ...Plugin[]]>(plugins: P): P extends [Plugin, ...Plugin[]] ? {
        [K in keyof P]: P[K] extends StaticPlugin ? InferStaticPluginModuleInstance<P[K]> : void;
    } : void;
    /**
     * Checks whether the passed value is a valid and not destroyed overlayscrollbars instance.
     * @param osInstance The value which shall be checked.
     */
    valid(osInstance: any): osInstance is OverlayScrollbars;
    /**
     * Gets the environment.
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
    /** The scroll coordinates of the viewport. */
    scrollCoordinates: {
        /** The start (origin) scroll coordinates for each axis. */
        start: XY<number>;
        /** The end scroll coordinates for each axis. */
        end: XY<number>;
    };
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
    /** Gets the current options of the instance. */
    options(): Options;
    /**
     * Sets the options of the instance.
     * If the new options are partially filled, they're deeply merged with either the current options or the current default options.
     * @param newOptions The new options which should be applied.
     * @param pure Whether the options should be reset before the new options are added.
     * @returns Returns the current options of the instance.
     */
    options(newOptions: PartialOptions, pure?: boolean): Options;
    /**
     * Adds event listeners to the instance.
     * @param eventListeners An object which contains the added listeners.
     * @param pure Whether all already added event listeners should be removed before the new listeners are added.
     * @returns Returns a function which removes the added listeners.
     */
    on(eventListeners: EventListeners, pure?: boolean): () => void;
    /**
     * Adds a single event listener to the instance.
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
     * Removes a single event listener from the instance.
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
    /** Destroys the instance and removes all added elements. */
    destroy(): void;
    /** Returns the instance of the passed plugin or `undefined` if no instance was found. */
    plugin<P extends InstancePlugin>(osPlugin: P): InferInstancePluginModuleInstance<P> | undefined;
}
declare const OverlayScrollbars: OverlayScrollbarsStatic;

export { ClickScrollPlugin, CloneableScrollbarElements, DynamicInitialization, DynamicInitializationElement, Elements, Environment, EventListener, EventListenerArgs, EventListeners, InferInstancePluginModuleInstance, InferStaticPluginModuleInstance, Initialization, InitializationTarget, InitializationTargetElement, InitializationTargetObject, InstancePlugin, InstancePluginEvent, OnUpdatedEventListenerArgs, Options, OverflowBehavior, OverlayScrollbars, PartialInitialization, PartialOptions, Plugin, PluginModule, PluginModuleInstance, ReadonlyOptions, ScrollbarElements, ScrollbarsAutoHideBehavior, ScrollbarsHidingPlugin, ScrollbarsVisibilityBehavior, SizeObserverPlugin, State, StaticInitialization, StaticInitializationElement, StaticPlugin };
