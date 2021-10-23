
/** @public */
export declare class ApiError extends ExternalError {
    /** @internal */
    constructor(message: string);
}

/** @internal */
export declare interface AreaLinkedRect {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

/** @public */
export declare class BindError extends ExternalError {
    /** @internal */
    constructor(message: string);
}

/**
 * Pops a content item out into a new browser window.
 * This is achieved by
 *
 *    - Creating a new configuration with the content item as root element
 *    - Serializing and minifying the configuration
 *    - Opening the current window's URL with the configuration as a GET parameter
 *    - GoldenLayout when opened in the new window will look for the GET parameter
 *      and use it instead of the provided configuration
 * @public
 */
export declare class BrowserPopout extends EventEmitter {
    /** @internal */
    private _config;
    /** @internal */
    private _initialWindowSize;
    /** @internal */
    private _layoutManager;
    /** @internal */
    private _popoutWindow;
    /** @internal */
    private _isInitialised;
    /** @internal */
    private _checkReadyInterval;
    /**
     * @param _config - GoldenLayout item config
     * @param _initialWindowSize - A map with width, height, top and left
     * @internal
     */
    constructor(
    /** @internal */
    _config: ResolvedPopoutLayoutConfig, 
    /** @internal */
    _initialWindowSize: Rect, 
    /** @internal */
    _layoutManager: LayoutManager);
    toConfig(): ResolvedPopoutLayoutConfig;
    getGlInstance(): LayoutManager;
    /**
     * Retrieves the native BrowserWindow backing this popout.
     * Might throw an UnexpectedNullError exception when the window is not initialized yet.
     * @public
     */
    getWindow(): Window;
    close(): void;
    /**
     * Returns the popped out item to its original position. If the original
     * parent isn't available anymore it falls back to the layout's topmost element
     */
    popIn(): void;
    /**
     * Creates the URL and window parameter
     * and opens a new window
     * @internal
     */
    private createWindow;
    /** @internal */
    private checkReady;
    /**
     * Serialises a map of key:values to a window options string
     *
     * @param windowOptions -
     *
     * @returns serialised window options
     * @internal
     */
    private serializeWindowFeatures;
    /**
     * Creates the URL for the new window, including the
     * config GET parameter
     *
     * @returns URL
     * @internal
     */
    private createUrl;
    /**
     * Move the newly created window roughly to
     * where the component used to be.
     * @internal
     */
    private positionWindow;
    /**
     * Callback when the new window is opened and the GoldenLayout instance
     * within it is initialised
     * @internal
     */
    private onInitialised;
    /**
     * Invoked 50ms after the window unload event
     * @internal
     */
    private _onClose;
}

/** @public */
export declare class ComponentContainer extends EventEmitter {
    /** @internal */
    private readonly _config;
    /** @internal */
    private readonly _parent;
    /** @internal */
    private readonly _layoutManager;
    /** @internal */
    private readonly _element;
    /** @internal */
    private readonly _updateItemConfigEvent;
    /** @internal */
    private readonly _showEvent;
    /** @internal */
    private readonly _hideEvent;
    /** @internal */
    private readonly _focusEvent;
    /** @internal */
    private readonly _blurEvent;
    /** @internal */
    private _componentType;
    /** @internal */
    private _boundComponent;
    /** @internal */
    private _width;
    /** @internal */
    private _height;
    /** @internal */
    private _isClosable;
    /** @internal */
    private _initialState;
    /** @internal */
    private _state;
    /** @internal */
    private _visible;
    /** @internal */
    private _isShownWithZeroDimensions;
    /** @internal */
    private _tab;
    /** @internal */
    private _stackMaximised;
    stateRequestEvent: ComponentContainer.StateRequestEventHandler | undefined;
    virtualRectingRequiredEvent: ComponentContainer.VirtualRectingRequiredEvent | undefined;
    virtualVisibilityChangeRequiredEvent: ComponentContainer.VirtualVisibilityChangeRequiredEvent | undefined;
    virtualZIndexChangeRequiredEvent: ComponentContainer.VirtualZIndexChangeRequiredEvent | undefined;
    get width(): number;
    get height(): number;
    get parent(): ComponentItem;
    /** @internal @deprecated use {@link (ComponentContainer:class).componentType} */
    get componentName(): JsonValue;
    get componentType(): JsonValue;
    get virtual(): boolean;
    get component(): ComponentContainer.Component;
    get tab(): Tab;
    get title(): string;
    get layoutManager(): LayoutManager;
    get isHidden(): boolean;
    get visible(): boolean;
    get state(): JsonValue | undefined;
    /** Return the initial component state */
    get initialState(): JsonValue | undefined;
    /** The inner DOM element where the container's content is intended to live in */
    get element(): HTMLElement;
    /** @internal */
    constructor(
    /** @internal */
    _config: ResolvedComponentItemConfig, 
    /** @internal */
    _parent: ComponentItem, 
    /** @internal */
    _layoutManager: LayoutManager, 
    /** @internal */
    _element: HTMLElement, 
    /** @internal */
    _updateItemConfigEvent: ComponentContainer.UpdateItemConfigEventHandler, 
    /** @internal */
    _showEvent: ComponentContainer.ShowEventHandler, 
    /** @internal */
    _hideEvent: ComponentContainer.HideEventHandler, 
    /** @internal */
    _focusEvent: ComponentContainer.FocusEventHandler, 
    /** @internal */
    _blurEvent: ComponentContainer.BlurEventHandler);
    /** @internal */
    destroy(): void;
    /** @deprecated use {@link (ComponentContainer:class).element } */
    getElement(): HTMLElement;
    /**
     * Hides the container's component item (and hence, the container) if not already hidden.
     * Emits hide event prior to hiding the container.
     */
    hide(): void;
    /**
     * Shows the container's component item (and hence, the container) if not visible.
     * Emits show event prior to hiding the container.
     */
    show(): void;
    /**
     * Focus this component in Layout.
     */
    focus(suppressEvent?: boolean): void;
    /**
     * Remove focus from this component in Layout.
     */
    blur(suppressEvent?: boolean): void;
    /**
     * Set the size from within the container. Traverses up
     * the item tree until it finds a row or column element
     * and resizes its items accordingly.
     *
     * If this container isn't a descendant of a row or column
     * it returns false
     * @param width - The new width in pixel
     * @param height - The new height in pixel
     *
     * @returns resizeSuccesful
     *
     * @internal
     */
    setSize(width: number, height: number): boolean;
    /**
     * Closes the container if it is closable. Can be called by
     * both the component within at as well as the contentItem containing
     * it. Emits a close event before the container itself is closed.
     */
    close(): void;
    /** Replaces component without affecting layout */
    replaceComponent(itemConfig: ComponentItemConfig): void;
    /**
     * Returns the initial component state or the latest passed in setState()
     * @returns state
     * @deprecated Use {@link (ComponentContainer:class).initialState}
     */
    getState(): JsonValue | undefined;
    /**
     * Merges the provided state into the current one
     * @deprecated Use {@link (ComponentContainer:class).stateRequestEvent}
     */
    extendState(state: Record<string, unknown>): void;
    /**
     * Sets the component state
     * @deprecated Use {@link (ComponentContainer:class).stateRequestEvent}
     */
    setState(state: JsonValue): void;
    /**
     * Set's the components title
     */
    setTitle(title: string): void;
    /** @internal */
    setTab(tab: Tab): void;
    /** @internal */
    setVisibility(value: boolean): void;
    /**
     * Set the container's size, but considered temporary (for dragging)
     * so don't emit any events.
     * @internal
     */
    enterDragMode(width: number, height: number): void;
    /** @internal */
    exitDragMode(): void;
    /** @internal */
    enterStackMaximised(): void;
    /** @internal */
    exitStackMaximised(): void;
    /** @internal */
    drag(): void;
    /**
     * Sets the container's size. Called by the container's component item.
     * To instead set the size programmatically from within the component itself,
     * use the public setSize method
     * @param width - in px
     * @param height - in px
     * @param force - set even if no change
     * @internal
     */
    setSizeToNodeSize(width: number, height: number, force: boolean): void;
    /** @internal */
    notifyVirtualRectingRequired(): void;
    /** @internal */
    private updateElementPositionPropertyFromBoundComponent;
    /** @internal */
    private addVirtualSizedContainerToLayoutManager;
    /** @internal */
    private checkShownFromZeroDimensions;
    /** @internal */
    private emitShow;
    /** @internal */
    private emitHide;
    /** @internal */
    private releaseComponent;
}

/** @public */
export declare namespace ComponentContainer {
    export type Component = unknown;
    export interface BindableComponent {
        component: Component;
        virtual: boolean;
    }
    export type StateRequestEventHandler = (this: void) => JsonValue | undefined;
    export type VirtualRectingRequiredEvent = (this: void, container: ComponentContainer, width: number, height: number) => void;
    export type VirtualVisibilityChangeRequiredEvent = (this: void, container: ComponentContainer, visible: boolean) => void;
    export type VirtualZIndexChangeRequiredEvent = (this: void, container: ComponentContainer, logicalZIndex: LogicalZIndex, defaultZIndex: string) => void;
    /** @internal */
    export type ShowEventHandler = (this: void) => void;
    /** @internal */
    export type HideEventHandler = (this: void) => void;
    /** @internal */
    export type FocusEventHandler = (this: void, suppressEvent: boolean) => void;
    /** @internal */
    export type BlurEventHandler = (this: void, suppressEvent: boolean) => void;
    /** @internal */
    export type UpdateItemConfigEventHandler = (itemConfig: ResolvedComponentItemConfig) => void;
}

/** @public */
export declare class ComponentItem extends ContentItem {
    /** @internal */
    private _parentItem;
    /** @internal */
    private _reorderEnabled;
    /** @internal */
    private _headerConfig;
    /** @internal */
    private _title;
    /** @internal */
    private readonly _initialWantMaximise;
    /** @internal */
    private _container;
    /** @internal */
    private _tab;
    /** @internal */
    private _focused;
    /** @internal @deprecated use {@link (ComponentItem:class).componentType} */
    get componentName(): JsonValue;
    get componentType(): JsonValue;
    get reorderEnabled(): boolean;
    /** @internal */
    get initialWantMaximise(): boolean;
    get component(): ComponentContainer.Component | undefined;
    get container(): ComponentContainer;
    get parentItem(): ComponentParentableItem;
    get headerConfig(): ResolvedHeaderedItemConfig.Header | undefined;
    get title(): string;
    get tab(): Tab;
    get focused(): boolean;
    /** @internal */
    constructor(layoutManager: LayoutManager, config: ResolvedComponentItemConfig, 
    /** @internal */
    _parentItem: ComponentParentableItem);
    /** @internal */
    destroy(): void;
    applyUpdatableConfig(config: ResolvedComponentItemConfig): void;
    toConfig(): ResolvedComponentItemConfig;
    close(): void;
    /** @internal */
    enterDragMode(width: number, height: number): void;
    /** @internal */
    exitDragMode(): void;
    /** @internal */
    enterStackMaximised(): void;
    /** @internal */
    exitStackMaximised(): void;
    /** @internal */
    drag(): void;
    /** @internal */
    updateSize(): void;
    /** @internal */
    init(): void;
    /**
     * Set this component's title
     *
     * @public
     * @param title -
     */
    setTitle(title: string): void;
    setTab(tab: Tab): void;
    /** @internal */
    hide(): void;
    /** @internal */
    show(): void;
    /**
     * Focuses the item if it is not already focused
     */
    focus(suppressEvent?: boolean): void;
    /** @internal */
    setFocused(suppressEvent: boolean): void;
    /**
     * Blurs (defocuses) the item if it is focused
     */
    blur(suppressEvent?: boolean): void;
    /** @internal */
    setBlurred(suppressEvent: boolean): void;
    /** @internal */
    protected setParent(parent: ContentItem): void;
    /** @internal */
    private handleUpdateItemConfigEvent;
    /** @internal */
    private updateNodeSize;
}

/** @public */
export declare namespace ComponentItem {
    export type Component = ComponentContainer.Component;
}

/** @public */
export declare interface ComponentItemConfig extends HeaderedItemConfig {
    type: 'component';
    readonly content?: [];
    /**
     * The type of the component.
     * @deprecated use {@link (ComponentItemConfig:interface).componentType} instead
     */
    componentName?: string;
    /**
     * The type of the component.
     * `componentType` must be of type `string` if it is registered with any of the following functions:
     * * {@link (GoldenLayout:class).registerComponent} (deprecated)
     * * {@link (GoldenLayout:class).registerComponentConstructor}
     * * {@link (GoldenLayout:class).registerComponentFactoryFunction}
     */
    componentType: JsonValue;
    /**
     * The state information with which a component will be initialised with.
     * Will be passed to the component constructor function and will be the value returned by
     * container.initialState.
     */
    componentState?: JsonValue;
    /**
     * Default: true
     */
    reorderEnabled?: boolean;
}

/** @public */
export declare namespace ComponentItemConfig {
    export function resolve(itemConfig: ComponentItemConfig): ResolvedComponentItemConfig;
    export function componentTypeToTitle(componentType: JsonValue): string;
}

declare abstract class ComponentParentableItem extends ContentItem {
    /** @internal */
    private _focused;
    get focused(): boolean;
    /** @internal */
    setFocusedValue(value: boolean): void;
    abstract setActiveComponentItem(item: ComponentItem, focus: boolean, suppressFocusEvent: boolean): void;
}

/** @public @deprecated - use {@link (LayoutConfig:interface)} */
export declare type Config = LayoutConfig;

/** @public */
export declare class ConfigurationError extends ExternalError {
    readonly node?: string | undefined;
    /** @internal */
    constructor(message: string, node?: string | undefined);
}

/**
 * This is the baseclass that all content items inherit from.
 * Most methods provide a subset of what the sub-classes do.
 *
 * It also provides a number of functions for tree traversal
 * @public
 */
export declare abstract class ContentItem extends EventEmitter {
    readonly layoutManager: LayoutManager;
    /** @internal */
    private _parent;
    /** @internal */
    private readonly _element;
    /** @internal */
    private _type;
    /** @internal */
    private _id;
    /** @internal */
    private _popInParentIds;
    /** @internal */
    private _contentItems;
    /** @internal */
    private _isClosable;
    /** @internal */
    private _pendingEventPropagations;
    /** @internal */
    private _throttledEvents;
    /** @internal */
    private _isInitialised;
    /** @internal */
    width: number;
    /** @internal */
    minWidth: number;
    /** @internal */
    height: number;
    /** @internal */
    minHeight: number;
    isGround: boolean;
    isRow: boolean;
    isColumn: boolean;
    isStack: boolean;
    isComponent: boolean;
    get type(): ItemType;
    get id(): string;
    set id(value: string);
    /** @internal */
    get popInParentIds(): string[];
    get parent(): ContentItem | null;
    get contentItems(): ContentItem[];
    get isClosable(): boolean;
    get element(): HTMLElement;
    get isInitialised(): boolean;
    static isStack(item: ContentItem): item is Stack;
    static isComponentItem(item: ContentItem): item is ComponentItem;
    static isComponentParentableItem(item: ContentItem): item is ComponentParentableItem;
    /** @internal */
    constructor(layoutManager: LayoutManager, config: ResolvedItemConfig, 
    /** @internal */
    _parent: ContentItem | null, 
    /** @internal */
    _element: HTMLElement);
    /**
     * Updaters the size of the component and its children, called recursively
     * @internal
     */
    abstract updateSize(): void;
    /**
     * Removes a child node (and its children) from the tree
     * @param contentItem - The child item to remove
     * @param keepChild - Whether to destroy the removed item
     */
    removeChild(contentItem: ContentItem, keepChild?: boolean): void;
    /**
     * Sets up the tree structure for the newly added child
     * The responsibility for the actual DOM manipulations lies
     * with the concrete item
     *
     * @param contentItem -
     * @param index - If omitted item will be appended
     * @param suspendResize - Used by descendent implementations
     */
    addChild(contentItem: ContentItem, index?: number | null, suspendResize?: boolean): number;
    /**
     * Replaces oldChild with newChild
     * @param oldChild -
     * @param newChild -
     * @internal
     */
    replaceChild(oldChild: ContentItem, newChild: ContentItem, destroyOldChild?: boolean): void;
    /**
     * Convenience method.
     * Shorthand for this.parent.removeChild( this )
     */
    remove(): void;
    /**
     * Removes the component from the layout and creates a new
     * browser window with the component and its children inside
     */
    popout(): BrowserPopout;
    abstract toConfig(): ResolvedItemConfig;
    /** @internal */
    calculateConfigContent(): ResolvedItemConfig[];
    /** @internal */
    highlightDropZone(x: number, y: number, area: AreaLinkedRect): void;
    /** @internal */
    onDrop(contentItem: ContentItem, area: ContentItem.Area): void;
    /** @internal */
    show(): void;
    /**
     * Destroys this item ands its children
     * @internal
     */
    destroy(): void;
    /**
     * Returns the area the component currently occupies
     * @internal
     */
    getElementArea(element?: HTMLElement): ContentItem.Area | null;
    /**
     * The tree of content items is created in two steps: First all content items are instantiated,
     * then init is called recursively from top to bottem. This is the basic init function,
     * it can be used, extended or overwritten by the content items
     *
     * Its behaviour depends on the content item
     * @internal
     */
    init(): void;
    /** @internal */
    protected setParent(parent: ContentItem): void;
    /** @internal */
    addPopInParentId(id: string): void;
    /** @internal */
    protected initContentItems(): void;
    /** @internal */
    protected hide(): void;
    /** @internal */
    protected updateContentItemsSize(): void;
    /**
     * creates all content items for this node at initialisation time
     * PLEASE NOTE, please see addChild for adding contentItems at runtime
     * @internal
     */
    private createContentItems;
    /**
     * Called for every event on the item tree. Decides whether the event is a bubbling
     * event and propagates it to its parent
     *
     * @param name - The name of the event
     * @param event -
     * @internal
     */
    private propagateEvent;
    tryBubbleEvent(name: string, args: unknown[]): void;
    /**
     * All raw events bubble up to the Ground element. Some events that
     * are propagated to - and emitted by - the layoutManager however are
     * only string-based, batched and sanitized to make them more usable
     *
     * @param name - The name of the event
     * @internal
     */
    private scheduleEventPropagationToLayoutManager;
    /**
     * Callback for events scheduled by _scheduleEventPropagationToLayoutManager
     *
     * @param name - The name of the event
     * @internal
     */
    private propagateEventToLayoutManager;
}

/** @public */
export declare namespace ContentItem {
    /** @internal */
    export interface Area extends AreaLinkedRect {
        surface: number;
        contentItem: ContentItem;
    }
}

/** @internal */
declare class DragListener extends EventEmitter {
    private _eElement;
    private _timeout;
    private _allowableTargets;
    private _oDocument;
    private _eBody;
    private _nDelay;
    private _nDistance;
    private _nX;
    private _nY;
    private _nOriginalX;
    private _nOriginalY;
    private _dragging;
    private _pointerTracking;
    private _pointerDownEventListener;
    private _pointerMoveEventListener;
    private _pointerUpEventListener;
    constructor(_eElement: HTMLElement, extraAllowableChildTargets: HTMLElement[]);
    destroy(): void;
    cancelDrag(): void;
    private onPointerDown;
    private processPointerDown;
    private onPointerMove;
    private processDragMove;
    private onPointerUp;
    private processDragStop;
    private checkRemovePointerTrackingEventListeners;
    private startDrag;
    private getPointerCoordinates;
}

/** @internal */
declare namespace DragListener {
    interface PointerCoordinates {
        x: number;
        y: number;
    }
}

/**
 * Allows for any DOM item to create a component on drag
 * start to be dragged into the Layout
 * @public
 */
export declare class DragSource {
    /** @internal */
    private _layoutManager;
    /** @internal */
    private readonly _element;
    /** @internal */
    private readonly _extraAllowableChildTargets;
    /** @internal */
    private _componentTypeOrFtn;
    /** @internal */
    private _componentState;
    /** @internal */
    private _title;
    /** @internal */
    private _dragListener;
    /** @internal */
    private _dummyGroundContainer;
    /** @internal */
    private _dummyGroundContentItem;
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager: LayoutManager, 
    /** @internal */
    _element: HTMLElement, 
    /** @internal */
    _extraAllowableChildTargets: HTMLElement[], 
    /** @internal */
    _componentTypeOrFtn: JsonValue | (() => DragSource.ComponentItemConfig), 
    /** @internal */
    _componentState: JsonValue | undefined, 
    /** @internal */
    _title: string | undefined);
    /**
     * Disposes of the drag listeners so the drag source is not usable any more.
     * @internal
     */
    destroy(): void;
    /**
     * Called initially and after every drag
     * @internal
     */
    private createDragListener;
    /**
     * Callback for the DragListener's dragStart event
     *
     * @param x - The x position of the mouse on dragStart
     * @param y - The x position of the mouse on dragStart
     * @internal
     */
    private onDragStart;
    /** @internal */
    private onDragStop;
    /**
     * Called after every drag and when the drag source is being disposed of.
     * @internal
     */
    private removeDragListener;
}

/** @public */
export declare namespace DragSource {
    export interface ComponentItemConfig {
        type: JsonValue;
        state?: JsonValue;
        title?: string;
    }
}

/** @internal */
declare class DropTargetIndicator {
    private _element;
    constructor();
    destroy(): void;
    highlightArea(area: AreaLinkedRect): void;
    hide(): void;
}

/**
 * A generic and very fast EventEmitter implementation. On top of emitting the actual event it emits an
 * {@link (EventEmitter:namespace).ALL_EVENT} event for every event triggered. This allows to hook into it and proxy events forwards
 * @public
 */
export declare class EventEmitter {
    /** @internal */
    private _allEventSubscriptions;
    /** @internal */
    private _subscriptionsMap;
    tryBubbleEvent(name: string, args: unknown[]): void;
    /**
     * Emit an event and notify listeners
     *
     * @param eventName - The name of the event
     * @param args - Additional arguments that will be passed to the listener
     */
    emit<K extends keyof EventEmitter.EventParamsMap>(eventName: K, ...args: EventEmitter.EventParamsMap[K]): void;
    /** @internal */
    emitUnknown(eventName: string, ...args: EventEmitter.UnknownParams): void;
    emitBaseBubblingEvent<K extends keyof EventEmitter.EventParamsMap>(eventName: K): void;
    /** @internal */
    emitUnknownBubblingEvent(eventName: string): void;
    /**
     * Removes a listener for an event.
     * @param eventName - The name of the event
     * @param callback - The previously registered callback method (optional)
     */
    removeEventListener<K extends keyof EventEmitter.EventParamsMap>(eventName: K, callback: EventEmitter.Callback<K>): void;
    off<K extends keyof EventEmitter.EventParamsMap>(eventName: K, callback: EventEmitter.Callback<K>): void;
    /**
     * Alias for off
     */
    unbind: <K extends keyof EventEmitter.EventParamsMap>(eventName: K, callback: EventEmitter.Callback<K>) => void;
    /**
     * Alias for emit
     */
    trigger: <K extends keyof EventEmitter.EventParamsMap>(eventName: K, ...args: EventEmitter.EventParamsMap[K]) => void;
    /**
     * Listen for events
     *
     * @param eventName - The name of the event to listen to
     * @param callback - The callback to execute when the event occurs
     */
    addEventListener<K extends keyof EventEmitter.EventParamsMap>(eventName: K, callback: EventEmitter.Callback<K>): void;
    on<K extends keyof EventEmitter.EventParamsMap>(eventName: K, callback: EventEmitter.Callback<K>): void;
    /** @internal */
    private addUnknownEventListener;
    /** @internal */
    private removeUnknownEventListener;
    /** @internal */
    private removeSubscription;
    /** @internal */
    private emitAllEvent;
}

/** @public */
export declare namespace EventEmitter {
    /**
     * The name of the event that's triggered for every event
     */
    const ALL_EVENT = "__all";
    const headerClickEventName = "stackHeaderClick";
    const headerTouchStartEventName = "stackHeaderTouchStart";
    /** @internal */
    export type UnknownCallback = (this: void, ...args: UnknownParams) => void;
    export type Callback<K extends keyof EventEmitter.EventParamsMap> = (this: void, ...args: EventParamsMap[K]) => void;
    export interface EventParamsMap {
        "__all": UnknownParams;
        "activeContentItemChanged": ComponentItemParam;
        "close": NoParams;
        "closed": NoParams;
        "destroy": NoParams;
        "drag": DragParams;
        "dragStart": DragStartParams;
        "dragStop": DragStopParams;
        "hide": NoParams;
        "initialised": NoParams;
        "itemDropped": ComponentItemParam;
        "maximised": NoParams;
        "minimised": NoParams;
        "open": NoParams;
        "popIn": NoParams;
        "resize": NoParams;
        "show": NoParams;
        /** @deprecated - use show instead */
        "shown": NoParams;
        "stateChanged": NoParams;
        "tab": TabParam;
        "tabCreated": TabParam;
        "titleChanged": StringParam;
        "windowClosed": PopoutParam;
        "windowOpened": PopoutParam;
        "beforeComponentRelease": BeforeComponentReleaseParams;
        "beforeItemDestroyed": BubblingEventParam;
        "itemCreated": BubblingEventParam;
        "itemDestroyed": BubblingEventParam;
        "focus": BubblingEventParam;
        "blur": BubblingEventParam;
        "stackHeaderClick": ClickBubblingEventParam;
        "stackHeaderTouchStart": TouchStartBubblingEventParam;
        "userBroadcast": UnknownParams;
    }
    export type UnknownParams = unknown[];
    export type NoParams = [];
    export type UnknownParam = [unknown];
    export type PopoutParam = [BrowserPopout];
    export type ComponentItemParam = [ComponentItem];
    export type TabParam = [Tab];
    export type BubblingEventParam = [EventEmitter.BubblingEvent];
    export type StringParam = [string];
    export type DragStartParams = [originalX: number, originalY: number];
    export type DragStopParams = [event: PointerEvent | undefined];
    export type DragParams = [offsetX: number, offsetY: number, event: PointerEvent];
    export type BeforeComponentReleaseParams = [component: unknown];
    export type ClickBubblingEventParam = [ClickBubblingEvent];
    export type TouchStartBubblingEventParam = [TouchStartBubblingEvent];
    export class BubblingEvent {
        /** @internal */
        private readonly _name;
        /** @internal */
        private readonly _target;
        /** @internal */
        private _isPropagationStopped;
        get name(): string;
        get target(): EventEmitter;
        /** @deprecated Use {@link (EventEmitter:namespace).(BubblingEvent:class).target} instead */
        get origin(): EventEmitter;
        get isPropagationStopped(): boolean;
        /** @internal */
        constructor(
        /** @internal */
        _name: string, 
        /** @internal */
        _target: EventEmitter);
        stopPropagation(): void;
    }
    export class ClickBubblingEvent extends BubblingEvent {
        /** @internal */
        private readonly _mouseEvent;
        get mouseEvent(): MouseEvent;
        /** @internal */
        constructor(name: string, target: EventEmitter, 
        /** @internal */
        _mouseEvent: MouseEvent);
    }
    export class TouchStartBubblingEvent extends BubblingEvent {
        /** @internal */
        private readonly _touchEvent;
        get touchEvent(): TouchEvent;
        /** @internal */
        constructor(name: string, target: EventEmitter, 
        /** @internal */
        _touchEvent: TouchEvent);
    }
}

/**
 * An EventEmitter singleton that propagates events
 * across multiple windows. This is a little bit trickier since
 * windows are allowed to open childWindows in their own right.
 *
 * This means that we deal with a tree of windows. Therefore, we do the event propagation in two phases:
 *
 * - Propagate events from this layout to the parent layout
 *   - Repeat until the event arrived at the root layout
 * - Propagate events to this layout and to all children
 *   - Repeat until all layouts got the event
 *
 * **WARNING**: Only userBroadcast events are propagated between windows.
 * This means the you have to take care of propagating state changes between windows yourself.
 *
 * @public
 */
export declare class EventHub extends EventEmitter {
    /** @internal */
    private _layoutManager;
    /** @internal */
    private _childEventListener;
    /**
     * Creates a new EventHub instance
     * @param _layoutManager - the layout manager to synchronize between the windows
     * @internal
     */
    constructor(
    /** @internal */
    _layoutManager: LayoutManager);
    /**
     * Emit an event and notify listeners
     *
     * @param eventName - The name of the event
     * @param args - Additional arguments that will be passed to the listener
     * @public
     */
    emit<K extends keyof EventEmitter.EventParamsMap>(eventName: K, ...args: EventEmitter.EventParamsMap[K]): void;
    /**
     * Broadcasts a message to all other currently opened windows.
     * @public
     */
    emitUserBroadcast(...args: EventEmitter.UnknownParams): void;
    /**
     * Destroys the EventHub
     * @internal
     */
    destroy(): void;
    /**
     * Internal processor to process local events.
     * @internal
     */
    private handleUserBroadcastEvent;
    /**
     * Callback for child events raised on the window
     * @internal
     */
    private onEventFromChild;
    /**
     * Propagates the event to the parent by emitting
     * it on the parent's DOM window
     * @internal
     */
    private propagateToParent;
    /**
     * Propagate events to the whole subtree under this event hub.
     * @internal
     */
    private propagateToThisAndSubtree;
}

/** @public */
export declare namespace EventHub {
    /** @internal */
    const ChildEventName = "gl_child_event";
    /** @internal */
    export type ChildEventDetail = {
        layoutManager: LayoutManager;
        eventName: string;
        args: unknown[];
    };
    /** @internal */
    export type ChildEventInit = CustomEventInit<ChildEventDetail>;
}

/** @public */
export declare abstract class ExternalError extends Error {
    readonly type: string;
    /** @internal */
    constructor(type: string, message: string);
}

/** @public */
export declare class GoldenLayout extends VirtualLayout {
    /** @internal */
    private _componentTypesMap;
    /** @internal */
    private _getComponentConstructorFtn;
    /** @internal */
    private _virtuableComponentMap;
    /** @internal */
    private _goldenLayoutBoundingClientRect;
    /** @internal */
    private _containerVirtualRectingRequiredEventListener;
    /** @internal */
    private _containerVirtualVisibilityChangeRequiredEventListener;
    /** @internal */
    private _containerVirtualZIndexChangeRequiredEventListener;
    /**
     * @param container - A Dom HTML element. Defaults to body
     * @param bindComponentEventHandler - Event handler to bind components
     * @param bindComponentEventHandler - Event handler to unbind components
     * If bindComponentEventHandler is defined, then constructor will be determinate. It will always call the init()
     * function and the init() function will always complete. This means that the bindComponentEventHandler will be called
     * if constructor is for a popout window. Make sure bindComponentEventHandler is ready for events.
     */
    constructor(container?: HTMLElement, bindComponentEventHandler?: VirtualLayout.BindComponentEventHandler, unbindComponentEventHandler?: VirtualLayout.UnbindComponentEventHandler);
    /** @deprecated specify layoutConfig in {@link (LayoutManager:class).loadLayout} */
    constructor(config: LayoutConfig, container?: HTMLElement);
    /**
     * Register a new component type with the layout manager.
     *
     * @deprecated See {@link https://stackoverflow.com/questions/40922531/how-to-check-if-a-javascript-function-is-a-constructor}
     * instead use {@link (GoldenLayout:class).registerComponentConstructor}
     * or {@link (GoldenLayout:class).registerComponentFactoryFunction}
     */
    registerComponent(name: string, componentConstructorOrFactoryFtn: GoldenLayout.ComponentConstructor | GoldenLayout.ComponentFactoryFunction, virtual?: boolean): void;
    /**
     * Register a new component type with the layout manager.
     */
    registerComponentConstructor(typeName: string, componentConstructor: GoldenLayout.ComponentConstructor, virtual?: boolean): void;
    /**
     * Register a new component with the layout manager.
     */
    registerComponentFactoryFunction(typeName: string, componentFactoryFunction: GoldenLayout.ComponentFactoryFunction, virtual?: boolean): void;
    /**
     * Register a component function with the layout manager. This function should
     * return a constructor for a component based on a config.
     * This function will be called if a component type with the required name is not already registered.
     * It is recommended that applications use the {@link (VirtualLayout:class).getComponentEvent} and
     * {@link (VirtualLayout:class).releaseComponentEvent} instead of registering a constructor callback
     * @deprecated use {@link (GoldenLayout:class).registerGetComponentConstructorCallback}
     */
    registerComponentFunction(callback: GoldenLayout.GetComponentConstructorCallback): void;
    /**
     * Register a callback closure with the layout manager which supplies a Component Constructor.
     * This callback should return a constructor for a component based on a config.
     * This function will be called if a component type with the required name is not already registered.
     * It is recommended that applications use the {@link (VirtualLayout:class).getComponentEvent} and
     * {@link (VirtualLayout:class).releaseComponentEvent} instead of registering a constructor callback
     */
    registerGetComponentConstructorCallback(callback: GoldenLayout.GetComponentConstructorCallback): void;
    getRegisteredComponentTypeNames(): string[];
    /**
     * Returns a previously registered component instantiator.  Attempts to utilize registered
     * component type by first, then falls back to the component constructor callback function (if registered).
     * If neither gets an instantiator, then returns `undefined`.
     * Note that `undefined` will return if config.componentType is not a string
     *
     * @param config - The item config
     * @public
     */
    getComponentInstantiator(config: ResolvedComponentItemConfig): GoldenLayout.ComponentInstantiator | undefined;
    /** @internal */
    bindComponent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig): ComponentContainer.BindableComponent;
    /** @internal */
    unbindComponent(container: ComponentContainer, virtual: boolean, component: ComponentContainer.Component | undefined): void;
    fireBeforeVirtualRectingEvent(count: number): void;
    /** @internal */
    private handleContainerVirtualRectingRequiredEvent;
    /** @internal */
    private handleContainerVirtualVisibilityChangeRequiredEvent;
    /** @internal */
    private handleContainerVirtualZIndexChangeRequiredEvent;
}

/** @public */
export declare namespace GoldenLayout {
    export interface VirtuableComponent {
        rootHtmlElement: HTMLElement;
    }
    export type ComponentConstructor = new (container: ComponentContainer, state: JsonValue | undefined, virtual: boolean) => ComponentContainer.Component;
    export type ComponentFactoryFunction = (container: ComponentContainer, state: JsonValue | undefined, virtual: boolean) => ComponentContainer.Component | undefined;
    export type GetComponentConstructorCallback = (this: void, config: ResolvedComponentItemConfig) => ComponentConstructor;
    export interface ComponentInstantiator {
        constructor: ComponentConstructor | undefined;
        factoryFunction: ComponentFactoryFunction | undefined;
        virtual: boolean;
    }
}

/**
 * GroundItem is the ContentItem whose one child is the root ContentItem (Root is planted in Ground).
 * (Previously it was called root however this was incorrect as its child is the root item)
 * There is only one instance of GroundItem and it is automatically created by the Layout Manager
 * @internal
 */
declare class GroundItem extends ComponentParentableItem {
    private readonly _childElementContainer;
    private readonly _containerElement;
    constructor(layoutManager: LayoutManager, rootItemConfig: ResolvedRootItemConfig | undefined, containerElement: HTMLElement);
    init(): void;
    /**
     * Loads a new Layout
     * Internal only.  To load a new layout with API, use {@link (LayoutManager:class).loadLayout}
     */
    loadRoot(rootItemConfig: ResolvedRootItemConfig | undefined): void;
    clearRoot(): void;
    /**
     * Adds a ContentItem child to root ContentItem.
     * Internal only.  To load a add with API, use {@link (LayoutManager:class).addItem}
     * @returns -1 if added as root otherwise index in root ContentItem's content
     */
    addItem(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig, index?: number): number;
    loadComponentAsRoot(itemConfig: ComponentItemConfig): void;
    /**
     * Adds a Root ContentItem.
     * Internal only.  To replace Root ContentItem with API, use {@link (LayoutManager:class).loadLayout}
     */
    addChild(contentItem: ContentItem, index?: number): number;
    /** @internal */
    calculateConfigContent(): ResolvedRootItemConfig[];
    /** @internal */
    setSize(width: number, height: number): void;
    /**
     * Adds a Root ContentItem.
     * Internal only.  To replace Root ContentItem with API, use {@link (LayoutManager:class).updateRootSize}
     */
    updateSize(): void;
    createSideAreas(): GroundItem.Area[];
    highlightDropZone(x: number, y: number, area: AreaLinkedRect): void;
    onDrop(contentItem: ContentItem, area: GroundItem.Area): void;
    dock(): void;
    validateDocking(): void;
    getAllContentItems(): ContentItem[];
    getConfigMaximisedItems(): ContentItem[];
    getItemsByPopInParentId(popInParentId: string): ContentItem[];
    toConfig(): ResolvedItemConfig;
    setActiveComponentItem(item: ComponentItem, focus: boolean, suppressFocusEvent: boolean): void;
    private updateNodeSize;
    private deepGetAllContentItems;
    private deepFilterContentItems;
}

/** @internal */
declare namespace GroundItem {
    interface Area extends ContentItem.Area {
        side: keyof typeof Area.Side;
    }
    namespace Area {
        const enum Side {
            y2 = 0,
            x2 = 1,
            y1 = 2,
            x1 = 3
        }
        type Sides = {
            [side in keyof typeof Side]: keyof typeof Side;
        };
        const oppositeSides: Sides;
    }
    function createElement(document: Document): HTMLDivElement;
}

/**
 * This class represents a header above a Stack ContentItem.
 * @public
 */
export declare class Header extends EventEmitter {
    /** @internal */
    private _layoutManager;
    /** @internal */
    private _parent;
    /** @internal */
    private readonly _configClosable;
    /** @internal */
    private _getActiveComponentItemEvent;
    /** @internal */
    private _popoutEvent;
    /** @internal */
    private _maximiseToggleEvent;
    /** @internal */
    private _clickEvent;
    /** @internal */
    private _touchStartEvent;
    /** @internal */
    private _componentRemoveEvent;
    /** @internal */
    private _componentFocusEvent;
    /** @internal */
    private _componentDragStartEvent;
    /** @internal */
    private readonly _tabsContainer;
    /** @internal */
    private readonly _element;
    /** @internal */
    private readonly _controlsContainerElement;
    /** @internal */
    private readonly _show;
    /** @internal */
    private readonly _popoutEnabled;
    /** @internal */
    private readonly _popoutLabel;
    /** @internal */
    private readonly _maximiseEnabled;
    /** @internal */
    private readonly _maximiseLabel;
    /** @internal */
    private readonly _minimiseEnabled;
    /** @internal */
    private readonly _minimiseLabel;
    /** @internal */
    private readonly _closeEnabled;
    /** @internal */
    private readonly _closeLabel;
    /** @internal */
    private readonly _tabDropdownEnabled;
    /** @internal */
    private readonly _tabDropdownLabel;
    /** @internal */
    private readonly _tabControlOffset;
    /** @internal */
    private readonly _clickListener;
    /** @internal */
    private readonly _touchStartListener;
    /** @internal */
    private readonly _documentMouseUpListener;
    /** @internal */
    private _rowColumnClosable;
    /** @internal */
    private _canRemoveComponent;
    /** @internal */
    private _side;
    /** @internal */
    private _leftRightSided;
    /** @internal */
    private readonly _closeButton;
    /** @internal */
    private readonly _popoutButton;
    /** @internal */
    private readonly _tabDropdownButton;
    /** @internal */
    private readonly _maximiseButton;
    get show(): boolean;
    get side(): Side;
    get leftRightSided(): boolean;
    get layoutManager(): LayoutManager;
    get parent(): Stack;
    get tabs(): Tab[];
    get lastVisibleTabIndex(): number;
    get element(): HTMLElement;
    get tabsContainerElement(): HTMLElement;
    get controlsContainerElement(): HTMLElement;
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager: LayoutManager, 
    /** @internal */
    _parent: Stack, settings: Header.Settings, 
    /** @internal */
    _configClosable: boolean, 
    /** @internal */
    _getActiveComponentItemEvent: Header.GetActiveComponentItemEvent, closeEvent: Header.CloseEvent, 
    /** @internal */
    _popoutEvent: Header.PopoutEvent | undefined, 
    /** @internal */
    _maximiseToggleEvent: Header.MaximiseToggleEvent | undefined, 
    /** @internal */
    _clickEvent: Header.ClickEvent | undefined, 
    /** @internal */
    _touchStartEvent: Header.TouchStartEvent | undefined, 
    /** @internal */
    _componentRemoveEvent: Header.ComponentRemoveEvent | undefined, 
    /** @internal */
    _componentFocusEvent: Header.ComponentFocusEvent | undefined, 
    /** @internal */
    _componentDragStartEvent: Header.ComponentDragStartEvent | undefined);
    /**
     * Destroys the entire header
     * @internal
     */
    destroy(): void;
    /**
     * Creates a new tab and associates it with a contentItem
     * @param index - The position of the tab
     * @internal
     */
    createTab(componentItem: ComponentItem, index: number): void;
    /**
     * Finds a tab based on the contentItem its associated with and removes it.
     * Cannot remove tab if it has the active ComponentItem
     * @internal
     */
    removeTab(componentItem: ComponentItem): void;
    /** @internal */
    processActiveComponentChanged(newActiveComponentItem: ComponentItem): void;
    /** @internal */
    setSide(value: Side): void;
    /**
     * Programmatically set closability.
     * @param value - Whether to enable/disable closability.
     * @returns Whether the action was successful
     * @internal
     */
    setRowColumnClosable(value: boolean): void;
    /**
     * Updates the header's closability. If a stack/header is able
     * to close, but has a non closable component added to it, the stack is no
     * longer closable until all components are closable.
     * @internal
     */
    updateClosability(): void;
    /** @internal */
    applyFocusedValue(value: boolean): void;
    /** @internal */
    processMaximised(): void;
    /** @internal */
    processMinimised(): void;
    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     * @internal
     */
    updateTabSizes(): void;
    /** @internal */
    private handleTabInitiatedComponentRemoveEvent;
    /** @internal */
    private handleTabInitiatedComponentFocusEvent;
    /** @internal */
    private handleTabInitiatedDragStartEvent;
    /** @internal */
    private processTabDropdownActiveChanged;
    /** @internal */
    private handleButtonPopoutEvent;
    /** @internal */
    private handleButtonMaximiseToggleEvent;
    /**
     * Invoked when the header's background is clicked (not it's tabs or controls)
     * @internal
     */
    private onClick;
    /**
     * Invoked when the header's background is touched (not it's tabs or controls)
     * @internal
     */
    private onTouchStart;
    /** @internal */
    private notifyClick;
    /** @internal */
    private notifyTouchStart;
}

/** @public */
export declare namespace Header {
    /** @internal */
    export type GetActiveComponentItemEvent = (this: void) => ComponentItem | undefined;
    /** @internal */
    export type CloseEvent = (this: void) => void;
    /** @internal */
    export type PopoutEvent = (this: void) => void;
    /** @internal */
    export type MaximiseToggleEvent = (this: void) => void;
    /** @internal */
    export type ClickEvent = (this: void, ev: MouseEvent) => void;
    /** @internal */
    export type TouchStartEvent = (this: void, ev: TouchEvent) => void;
    /** @internal */
    export type ComponentRemoveEvent = (this: void, componentItem: ComponentItem) => void;
    /** @internal */
    export type ComponentFocusEvent = (this: void, componentItem: ComponentItem) => void;
    /** @internal */
    export type ComponentDragStartEvent = (this: void, x: number, y: number, dragListener: DragListener, componentItem: ComponentItem) => void;
    /** @internal */
    export type StateChangedEvent = (this: void) => void;
    /** @internal */
    export interface Settings {
        show: boolean;
        side: Side;
        popoutEnabled: boolean;
        popoutLabel: string;
        maximiseEnabled: boolean;
        maximiseLabel: string;
        minimiseEnabled: boolean;
        minimiseLabel: string;
        closeEnabled: boolean;
        closeLabel: string;
        tabDropdownEnabled: boolean;
        tabDropdownLabel: string;
    }
}

/** @public */
export declare interface HeaderedItemConfig extends ItemConfig {
    /** @deprecated use {@link (HeaderedItemConfig:namespace).(Header:interface).show} instead */
    hasHeaders?: boolean;
    header?: HeaderedItemConfig.Header;
    maximised?: boolean;
}

/** @public */
export declare namespace HeaderedItemConfig {
    export interface Header {
        show?: false | Side;
        popout?: false | string;
        dock?: false | string;
        maximise?: false | string;
        close?: string;
        minimise?: string;
        tabDropdown?: false | string;
    }
    export namespace Header {
        export function resolve(header: Header | undefined, hasHeaders: boolean | undefined): ResolvedHeaderedItemConfig.Header | undefined;
    }
    export function resolveIdAndMaximised(config: HeaderedItemConfig): {
        id: string;
        maximised: boolean;
    };
}

/** @public */
export declare const enum I18nStringId {
    PopoutCannotBeCreatedWithGroundItemConfig = 0,
    PleaseRegisterAConstructorFunction = 1,
    ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned = 2,
    ComponentIsAlreadyRegistered = 3,
    ComponentIsNotVirtuable = 4,
    VirtualComponentDoesNotHaveRootHtmlElement = 5,
    ItemConfigIsNotTypeComponent = 6
}

/** @public */
export declare namespace I18nStrings {
    const idCount: number;
    export function checkInitialise(): void;
}

/** @public */
export declare const i18nStrings: string[];

/** @public */
export declare interface ItemConfig {
    /**
     * The type of the item. Possible values are 'row', 'column', 'stack', 'component'.
     */
    type: ItemType;
    /**
     * An array of configurations for items that will be created as children of this item.
     */
    content?: ItemConfig[];
    /**
     * The width of this item, relative to the other children of its parent in percent
     */
    width?: number;
    /**
     * The minimum width of this item in pixels
     * CAUTION - Not tested - do not use
     */
    minWidth?: number;
    /**
     * The height of this item, relative to the other children of its parent in percent
     */
    height?: number;
    /**
     * The minimum height of this item in pixels
     * CAUTION - Not tested - do not use
     */
    minHeight?: number;
    /**
     * A string that can be used to identify a ContentItem.
     * Do NOT assign an array.  This only exists for legacy purposes.  If an array is assigned, the first element
     * will become the id.
     */
    id?: string;
    /**
     * Determines if the item is closable. If false, the x on the items tab will be hidden and container.close()
     * will return false
     * Default: true
     */
    isClosable?: boolean;
    /**
     * The title of the item as displayed on its tab and on popout windows
     * Default: componentType.toString() or ''
     */
    title?: string;
}

/** @public */
export declare namespace ItemConfig {
    export function resolve(itemConfig: ItemConfig): ResolvedItemConfig;
    export function resolveContent(content: ItemConfig[] | undefined): ResolvedItemConfig[];
    export function resolveId(id: string | string[] | undefined): string;
    export function isGround(config: ItemConfig): config is ItemConfig;
    export function isRow(config: ItemConfig): config is ItemConfig;
    export function isColumn(config: ItemConfig): config is ItemConfig;
    export function isStack(config: ItemConfig): config is ItemConfig;
    export function isComponent(config: ItemConfig): config is ComponentItemConfig;
}

/** @public */
export declare type ItemType = 'ground' | 'row' | 'column' | 'stack' | 'component';

/** @public */
export declare namespace ItemType {
    const ground = "ground";
    const row = "row";
    const column = "column";
    const stack = "stack";
    const component = "component";
}

/** @public */
export declare interface Json {
    [name: string]: JsonValue;
}

/** @public */
export declare type JsonValue = string | number | boolean | null | Json | object | JsonValueArray;

/** @public */
export declare namespace JsonValue {
    export function isJson(value: JsonValue): value is Json;
    export function isJsonObject(value: JsonValue): value is Json | object;
}

/** @public */
export declare type JsonValueArray = Array<JsonValue>;

/** @public */
export declare interface LayoutConfig {
    root: RootItemConfig;
    /** @deprecated Use {@link (LayoutConfig:interface).root} */
    content?: (RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig)[];
    openPopouts?: PopoutLayoutConfig[];
    dimensions?: LayoutConfig.Dimensions;
    settings?: LayoutConfig.Settings;
    /** @deprecated use {@link (LayoutConfig:interface).header} instead */
    labels?: LayoutConfig.Labels;
    header?: LayoutConfig.Header;
}

/** Use to specify LayoutConfig with defaults or deserialise a LayoutConfig.
 * Deserialisation will handle backwards compatibility.
 * Note that LayoutConfig should be used for serialisation (not LayoutConfig)
 * @public
 */
export declare namespace LayoutConfig {
    export interface Settings {
        /**
         * @deprecated use ${@link (LayoutConfig:namespace).(Header:interface).show} instead
         */
        hasHeaders?: boolean;
        /**
         * Constrains the area in which items can be dragged to the layout's container. Will be set to false
         * automatically when layout.createDragSource() is called.
         * Default: true
         */
        constrainDragToContainer?: boolean;
        /**
         * If true, the user can re-arrange the layout by dragging items by their tabs to the desired location.
         * Can be overridden by ItemConfig.reorderEnabled for specific ItemConfigs
         * Default: true
         */
        reorderEnabled?: boolean;
        /**
         * Decides what will be opened in a new window if the user clicks the popout icon. If true the entire stack will
         * be transferred to the new window, if false only the active component will be opened.
         * Default: false
         */
        popoutWholeStack?: boolean;
        /**
         * Specifies if an error is thrown when a popout is blocked by the browser (e.g. by opening it programmatically).
         * If false, the popout call will fail silently.
         * Default: true
         */
        blockedPopoutsThrowError?: boolean;
        /**
         * Specifies if all popouts should be closed when the page that created them is closed. Popouts don't have a
         * strong dependency on their parent and can exist on their own, but can be quite annoying to close by hand. In
         * addition, any changes made to popouts won't be stored after the parent is closed.
         * Default: true
         */
        closePopoutsOnUnload?: boolean;
        /**
         * Specifies if the popout icon should be displayed in the header-bar.
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).popout} instead
         */
        showPopoutIcon?: boolean;
        /**
         * Specifies if the maximise icon should be displayed in the header-bar.
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).maximise} instead
         */
        showMaximiseIcon?: boolean;
        /**
         * Specifies if the close icon should be displayed in the header-bar.
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).close} instead
         */
        showCloseIcon?: boolean;
        /**
         * Specifies Responsive Mode (more info needed).
         * Default: none
         */
        responsiveMode?: ResponsiveMode;
        /**
         * Specifies Maximum pixel overlap per tab.
         * Default: 0
         */
        tabOverlapAllowance?: number;
        /**
         *
         * Default: true
         */
        reorderOnTabMenuClick?: boolean;
        /**
         * Default: 10
         */
        tabControlOffset?: number;
        /**
         * Specifies whether to pop in elements when closing a popout window.
         * Default: false
         */
        popInOnClose?: boolean;
    }
    export namespace Settings {
        export function resolve(settings: Settings | undefined): ResolvedLayoutConfig.Settings;
    }
    export interface Dimensions {
        /**
         * The width of the borders between the layout items in pixel. Please note: The actual draggable area is wider
         * than the visible one, making it safe to set this to small values without affecting usability.
         * Default: 5
         */
        borderWidth?: number;
        /**
         * Default: 15
         */
        borderGrabWidth?: number;
        /**
         * The minimum height an item can be resized to (in pixel).
         * Default: 10
         */
        minItemHeight?: number;
        /**
         * The minimum width an item can be resized to (in pixel).
         * Default: 10
         */
        minItemWidth?: number;
        /**
         * The height of the header elements in pixel. This can be changed, but your theme's header css needs to be
         * adjusted accordingly.
         * Default: 20
         */
        headerHeight?: number;
        /**
         * The width of the element that appears when an item is dragged (in pixel).
         * Default: 300
         */
        dragProxyWidth?: number;
        /**
         * The height of the element that appears when an item is dragged (in pixel).
         * Default: 200
         */
        dragProxyHeight?: number;
    }
    export namespace Dimensions {
        export function resolve(dimensions: Dimensions | undefined): ResolvedLayoutConfig.Dimensions;
    }
    export interface Labels {
        /**
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).close} instead
         */
        close?: string;
        /**
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).maximise} instead
         */
        maximise?: string;
        /**
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).minimise} instead
         */
        minimise?: string;
        /**
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).popin} instead
         */
        popin?: string;
        /**
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).popout} instead
         */
        popout?: string;
        /**
         * @deprecated use {@link (LayoutConfig:namespace).(Header:interface).tabDropdown} instead
         */
        tabDropdown?: string;
    }
    export interface Header {
        /**
         * Specifies whether header should be displayed, and if so, on which side.
         * If false, the layout will be displayed with splitters only.
         * Default: 'top'
         */
        show?: false | Side;
        /**
         * The tooltip text that appears when hovering over the popout icon or false if popout button not displayed.
         * Default: 'open in new window'
         */
        popout?: false | string;
        /**
         * The tooltip text that appears when hovering over the popin icon.
         * Default: 'pop in'
         */
        popin?: string;
        /**
         * The tooltip text that appears when hovering over the maximise icon or false if maximised button not displayed.
         * Default: 'maximise'
         */
        maximise?: false | string;
        /**
         * The tooltip text that appears when hovering over the close icon.
         * Default: 'close'
         */
        close?: false | string;
        /**
         * The tooltip text that appears when hovering over the minimise icon.
         * Default: 'minimise'
         */
        minimise?: string;
        /**
         *
         * Default: 'additional tabs'
         */
        tabDropdown?: false | string;
    }
    export namespace Header {
        export function resolve(header: Header | undefined, settings: LayoutConfig.Settings | undefined, labels: LayoutConfig.Labels | undefined): ResolvedLayoutConfig.Header;
    }
    export function isPopout(config: LayoutConfig): config is PopoutLayoutConfig;
    export function resolve(layoutConfig: LayoutConfig): ResolvedLayoutConfig;
    export function fromResolved(config: ResolvedLayoutConfig): LayoutConfig;
    export function isResolved(configOrResolvedConfig: ResolvedLayoutConfig | LayoutConfig): configOrResolvedConfig is ResolvedLayoutConfig;
    export function resolveOpenPopouts(popoutConfigs: PopoutLayoutConfig[] | undefined): ResolvedPopoutLayoutConfig[];
}

/**
 * The main class that will be exposed as GoldenLayout.
 */
/** @public */
export declare abstract class LayoutManager extends EventEmitter {
    /** @internal */
    private _containerElement;
    /** @internal */
    private _isFullPage;
    /** @internal */
    private _isInitialised;
    /** @internal */
    private _groundItem;
    /** @internal */
    private _openPopouts;
    /** @internal */
    private _dropTargetIndicator;
    /** @internal */
    private _transitionIndicator;
    /** @internal */
    private _resizeTimeoutId;
    /** @internal */
    private _itemAreas;
    /** @internal */
    private _maximisedStack;
    /** @internal */
    private _maximisePlaceholder;
    /** @internal */
    private _tabDropPlaceholder;
    /** @internal */
    private _dragSources;
    /** @internal */
    private _updatingColumnsResponsive;
    /** @internal */
    private _firstLoad;
    /** @internal */
    private _eventHub;
    /** @internal */
    private _width;
    /** @internal */
    private _height;
    /** @internal */
    private _focusedComponentItem;
    /** @internal */
    private _virtualSizedContainers;
    /** @internal */
    private _virtualSizedContainerAddingBeginCount;
    /** @internal */
    protected _constructorOrSubWindowLayoutConfig: LayoutConfig | undefined;
    /** @internal */
    private _windowResizeListener;
    /** @internal */
    private _windowUnloadListener;
    /** @internal */
    private _maximisedStackBeforeDestroyedListener;
    readonly isSubWindow: boolean;
    layoutConfig: ResolvedLayoutConfig;
    beforeVirtualRectingEvent: LayoutManager.BeforeVirtualRectingEvent | undefined;
    afterVirtualRectingEvent: LayoutManager.AfterVirtualRectingEvent | undefined;
    get container(): HTMLElement;
    get isInitialised(): boolean;
    /** @internal */
    get groundItem(): GroundItem | undefined;
    /** @internal @deprecated use {@link (LayoutManager:class).groundItem} instead */
    get root(): GroundItem | undefined;
    get openPopouts(): BrowserPopout[];
    /** @internal */
    get dropTargetIndicator(): DropTargetIndicator | null;
    /** @internal @deprecated To be removed */
    get transitionIndicator(): TransitionIndicator | null;
    get width(): number | null;
    get height(): number | null;
    /**
     * Retrieves the {@link (EventHub:class)} instance associated with this layout manager.
     * This can be used to propagate events between the windows
     * @public
     */
    get eventHub(): EventHub;
    get rootItem(): ContentItem | undefined;
    get focusedComponentItem(): ComponentItem | undefined;
    /** @internal */
    get tabDropPlaceholder(): HTMLElement;
    get maximisedStack(): Stack | undefined;
    /** @deprecated indicates deprecated constructor use */
    get deprecatedConstructor(): boolean;
    /**
    * @param container - A Dom HTML element. Defaults to body
    * @internal
    */
    constructor(parameters: LayoutManager.ConstructorParameters);
    /**
     * Destroys the LayoutManager instance itself as well as every ContentItem
     * within it. After this is called nothing should be left of the LayoutManager.
     */
    destroy(): void;
    /**
     * Takes a GoldenLayout configuration object and
     * replaces its keys and values recursively with
     * one letter codes
     * @deprecated use {@link (ResolvedLayoutConfig:namespace).minifyConfig} instead
     */
    minifyConfig(config: ResolvedLayoutConfig): ResolvedLayoutConfig;
    /**
     * Takes a configuration Object that was previously minified
     * using minifyConfig and returns its original version
     * @deprecated use {@link (ResolvedLayoutConfig:namespace).unminifyConfig} instead
     */
    unminifyConfig(config: ResolvedLayoutConfig): ResolvedLayoutConfig;
    /** @internal */
    abstract bindComponent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig): ComponentContainer.BindableComponent;
    /** @internal */
    abstract unbindComponent(container: ComponentContainer, virtual: boolean, component: ComponentContainer.Component | undefined): void;
    /**
     * Called from GoldenLayout class. Finishes of init
     * @internal
     */
    init(): void;
    /**
     * Loads a new layout
     * @param layoutConfig - New layout to be loaded
     */
    loadLayout(layoutConfig: LayoutConfig): void;
    /**
     * Creates a layout configuration object based on the the current state
     *
     * @public
     * @returns GoldenLayout configuration
     */
    saveLayout(): ResolvedLayoutConfig;
    /**
     * Removes any existing layout. Effectively, an empty layout will be loaded.
     */
    clear(): void;
    /**
     * @deprecated Use {@link (LayoutManager:class).saveLayout}
     */
    toConfig(): ResolvedLayoutConfig;
    /**
     * Adds a new ComponentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added
     * @param componentTypeName - Name of component type to be created.
     * @param state - Optional initial state to be assigned to component
     * @returns New ComponentItem created.
     */
    newComponent(componentType: JsonValue, componentState?: JsonValue, title?: string): ComponentItem;
    /**
     * Adds a ComponentItem at the first valid selector location.
     * @param componentTypeName - Name of component type to be created.
     * @param state - Optional initial state to be assigned to component
     * @param locationSelectors - Array of location selectors used to find location in layout where component
     * will be added. First location in array which is valid will be used. If locationSelectors is undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used
     * @returns New ComponentItem created or undefined if no valid location selector was in array.
     */
    newComponentAtLocation(componentType: JsonValue, componentState?: JsonValue, title?: string, locationSelectors?: LayoutManager.LocationSelector[]): ComponentItem | undefined;
    /**
     * Adds a new ComponentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added
     * @param componentType - Type of component to be created.
     * @param state - Optional initial state to be assigned to component
     * @returns Location of new ComponentItem created.
     */
    addComponent(componentType: JsonValue, componentState?: JsonValue, title?: string): LayoutManager.Location;
    /**
     * Adds a ComponentItem at the first valid selector location.
     * @param componentType - Type of component to be created.
     * @param state - Optional initial state to be assigned to component
     * @param locationSelectors - Array of location selectors used to find determine location in layout where component
     * will be added. First location in array which is valid will be used. If undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used.
     * @returns Location of new ComponentItem created or undefined if no valid location selector was in array.
     */
    addComponentAtLocation(componentType: JsonValue, componentState?: JsonValue, title?: string, locationSelectors?: readonly LayoutManager.LocationSelector[]): LayoutManager.Location | undefined;
    /**
     * Adds a new ContentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @returns New ContentItem created.
    */
    newItem(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig): ContentItem;
    /**
     * Adds a new child ContentItem under the root ContentItem.  If a root does not exist, then create root ContentItem instead
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @param locationSelectors - Array of location selectors used to find determine location in layout where ContentItem
     * will be added. First location in array which is valid will be used. If undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used.
     * @returns New ContentItem created or undefined if no valid location selector was in array. */
    newItemAtLocation(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig, locationSelectors?: readonly LayoutManager.LocationSelector[]): ContentItem | undefined;
    /**
     * Adds a new ContentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added.
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @returns Location of new ContentItem created. */
    addItem(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig): LayoutManager.Location;
    /**
     * Adds a ContentItem at the first valid selector location.
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @param locationSelectors - Array of location selectors used to find determine location in layout where ContentItem
     * will be added. First location in array which is valid will be used. If undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used.
     * @returns Location of new ContentItem created or undefined if no valid location selector was in array. */
    addItemAtLocation(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig, locationSelectors?: readonly LayoutManager.LocationSelector[]): LayoutManager.Location | undefined;
    /** Loads the specified component ResolvedItemConfig as root.
     * This can be used to display a Component all by itself.  The layout cannot be changed other than having another new layout loaded.
     * Note that, if this layout is saved and reloaded, it will reload with the Component as a child of a Stack.
    */
    loadComponentAsRoot(itemConfig: ComponentItemConfig): void;
    /** @deprecated Use {@link (LayoutManager:class).setSize} */
    updateSize(width: number, height: number): void;
    /**
     * Updates the layout managers size
     *
     * @param width - Width in pixels
     * @param height - Height in pixels
     */
    setSize(width: number, height: number): void;
    /** @internal */
    updateSizeFromContainer(): void;
    /**
     * Update the size of the root ContentItem.  This will update the size of all contentItems in the tree
     */
    updateRootSize(): void;
    /** @public */
    createAndInitContentItem(config: ResolvedItemConfig, parent: ContentItem): ContentItem;
    /**
     * Recursively creates new item tree structures based on a provided
     * ItemConfiguration object
     *
     * @param config - ResolvedItemConfig
     * @param parent - The item the newly created item should be a child of
     * @internal
     */
    createContentItem(config: ResolvedItemConfig, parent: ContentItem): ContentItem;
    findFirstComponentItemById(id: string): ComponentItem | undefined;
    /**
     * Creates a popout window with the specified content at the specified position
     *
     * @param itemConfigOrContentItem - The content of the popout window's layout manager derived from either
     * a {@link (ContentItem:class)} or {@link (ItemConfig:interface)} or ResolvedItemConfig content (array of {@link (ItemConfig:interface)})
     * @param positionAndSize - The width, height, left and top of Popout window
     * @param parentId -The id of the element this item will be appended to when popIn is called
     * @param indexInParent - The position of this item within its parent element
     */
    createPopout(itemConfigOrContentItem: ContentItem | ResolvedRootItemConfig, positionAndSize: ResolvedPopoutLayoutConfig.Window, parentId: string | null, indexInParent: number | null): BrowserPopout;
    /** @internal */
    createPopoutFromContentItem(item: ContentItem, window: ResolvedPopoutLayoutConfig.Window | undefined, parentId: string | null, indexInParent: number | null | undefined): BrowserPopout;
    /** @internal */
    beginVirtualSizedContainerAdding(): void;
    /** @internal */
    addVirtualSizedContainer(container: ComponentContainer): void;
    /** @internal */
    endVirtualSizedContainerAdding(): void;
    /** @internal */
    fireBeforeVirtualRectingEvent(count: number): void;
    /** @internal */
    fireAfterVirtualRectingEvent(): void;
    /** @internal */
    private createPopoutFromItemConfig;
    /** @internal */
    createPopoutFromPopoutLayoutConfig(config: ResolvedPopoutLayoutConfig): BrowserPopout;
    /**
     * Attaches DragListener to any given DOM element
     * and turns it into a way of creating new ComponentItems
     * by 'dragging' the DOM element into the layout
     *
     * @param element - The HTML element which will be listened to for commencement of drag.
     * @param componentTypeOrItemConfigCallback - Type of component to be created, or a callback which will provide the ItemConfig
     * to be used to create the component.
     * @param componentState - Optional initial state of component.  This will be ignored if componentTypeOrFtn is a function.
     *
     * @returns an opaque object that identifies the DOM element
     *          and the attached itemConfig. This can be used in
     *          removeDragSource() later to get rid of the drag listeners.
     */
    newDragSource(element: HTMLElement, itemConfigCallback: () => DragSource.ComponentItemConfig): DragSource;
    newDragSource(element: HTMLElement, componentType: JsonValue, componentState?: JsonValue, title?: JsonValue): DragSource;
    /**
     * Removes a DragListener added by createDragSource() so the corresponding
     * DOM element is not a drag source any more.
     */
    removeDragSource(dragSource: DragSource): void;
    /** @internal */
    startComponentDrag(x: number, y: number, dragListener: DragListener, componentItem: ComponentItem, stack: Stack): void;
    /**
     * Programmatically focuses an item. This focuses the specified component item
     * and the item emits a focus event
     *
     * @param item - The component item to be focused
     * @param suppressEvent - Whether to emit focus event
     */
    focusComponent(item: ComponentItem, suppressEvent?: boolean): void;
    /**
     * Programmatically blurs (defocuses) the currently focused component.
     * If a component item is focused, then it is blurred and and the item emits a blur event
     *
     * @param item - The component item to be blurred
     * @param suppressEvent - Whether to emit blur event
     */
    clearComponentFocus(suppressEvent?: boolean): void;
    /**
     * Programmatically focuses a component item or removes focus (blurs) from an existing focused component item.
     *
     * @param item - If defined, specifies the component item to be given focus.  If undefined, clear component focus.
     * @param suppressEvents - Whether to emit focus and blur events
     * @internal
     */
    setFocusedComponentItem(item: ComponentItem | undefined, suppressEvents?: boolean): void;
    /** @internal */
    private createContentItemFromConfig;
    /**
     * This should only be called from stack component.
     * Stack will look after docking processing associated with maximise/minimise
     * @internal
     **/
    setMaximisedStack(stack: Stack | undefined): void;
    checkMinimiseMaximisedStack(): void;
    /** @internal */
    private cleanupBeforeMaximisedStackDestroyed;
    /**
     * This method is used to get around sandboxed iframe restrictions.
     * If 'allow-top-navigation' is not specified in the iframe's 'sandbox' attribute
     * (as is the case with codepens) the parent window is forbidden from calling certain
     * methods on the child, such as window.close() or setting document.location.href.
     *
     * This prevented GoldenLayout popouts from popping in in codepens. The fix is to call
     * _$closeWindow on the child window's gl instance which (after a timeout to disconnect
     * the invoking method from the close call) closes itself.
     *
     * @internal
     */
    closeWindow(): void;
    /** @internal */
    getArea(x: number, y: number): ContentItem.Area | null;
    /** @internal */
    calculateItemAreas(): void;
    /**
     * Called as part of loading a new layout (including initial init()).
     * Checks to see layout has a maximised item. If so, it maximises that item.
     * @internal
     */
    private checkLoadedLayoutMaximiseItem;
    /** @internal */
    private processMaximiseStack;
    /** @internal */
    private processMinimiseMaximisedStack;
    /**
     * Iterates through the array of open popout windows and removes the ones
     * that are effectively closed. This is necessary due to the lack of reliably
     * listening for window.close / unload events in a cross browser compatible fashion.
     * @internal
     */
    private reconcilePopoutWindows;
    /**
     * Returns a flattened array of all content items,
     * regardles of level or type
     * @internal
     */
    private getAllContentItems;
    /**
     * Binds to DOM/BOM events on init
     * @internal
     */
    private bindEvents;
    /**
     * Creates Subwindows (if there are any). Throws an error
     * if popouts are blocked.
     * @internal
     */
    private createSubWindows;
    /**
     * Debounces resize events
     * @internal
     */
    private processResizeWithDebounce;
    /**
     * Determines what element the layout will be created in
     * @internal
     */
    private setContainer;
    /**
     * Called when the window is closed or the user navigates away
     * from the page
     * @internal
     */
    private onUnload;
    /**
     * Adjusts the number of columns to be lower to fit the screen and still maintain minItemWidth.
     * @internal
     */
    private adjustColumnsResponsive;
    /**
     * Determines if responsive layout should be used.
     *
     * @returns True if responsive layout should be used; otherwise false.
     * @internal
     */
    private useResponsiveLayout;
    /**
     * Adds all children of a node to another container recursively.
     * @param container - Container to add child content items to.
     * @param node - Node to search for content items.
     * @internal
     */
    private addChildContentItemsToContainer;
    /**
     * Finds all the stacks.
     * @returns The found stack containers.
     * @internal
     */
    private getAllStacks;
    /** @internal */
    private findFirstContentItemType;
    /** @internal */
    private findFirstContentItemTypeRecursive;
    /** @internal */
    private findFirstContentItemTypeByIdRecursive;
    /**
     * Finds all the stack containers.
     *
     * @param stacks - Set of containers to populate.
     * @param node - Current node to process.
     * @internal
     */
    private findAllStacksRecursive;
    /** @internal */
    private findFirstLocation;
    /** @internal */
    private findLocation;
    /** @internal */
    private tryCreateLocationFromParentItem;
}

/** @public */
export declare namespace LayoutManager {
    export type BeforeVirtualRectingEvent = (this: void, count: number) => void;
    export type AfterVirtualRectingEvent = (this: void) => void;
    /** @internal */
    export interface ConstructorParameters {
        constructorOrSubWindowLayoutConfig: LayoutConfig | undefined;
        isSubWindow: boolean;
        containerElement: HTMLElement | undefined;
    }
    /** @internal */
    export function createMaximisePlaceElement(document: Document): HTMLElement;
    /** @internal */
    export function createTabDropPlaceholderElement(document: Document): HTMLElement;
    /**
     * Specifies a location of a ContentItem without referencing the content item.
     * Used to specify where a new item is to be added
     * @public
     */
    export interface Location {
        parentItem: ContentItem;
        index: number;
    }
    /**
     * A selector used to specify a unique location in the layout
     * @public
     */
    export interface LocationSelector {
        /** Specifies selector algorithm */
        typeId: LocationSelector.TypeId;
        /** Used by algorithm to determine index in found ContentItem */
        index?: number;
    }
    /** @public */
    export namespace LocationSelector {
        export const enum TypeId {
            /** Stack with focused Item. Index specifies offset from index of focused item (eg 1 is the position after focused item) */
            FocusedItem = 0,
            /** Stack with focused Item. Index specfies ContentItems index */
            FocusedStack = 1,
            /** First stack found in layout */
            FirstStack = 2,
            /** First Row or Column found in layout (rows are searched first) */
            FirstRowOrColumn = 3,
            /** First Row in layout */
            FirstRow = 4,
            /** First Column in layout */
            FirstColumn = 5,
            /** Finds a location if layout is empty. The found location will be the root ContentItem. */
            Empty = 6,
            /** Finds root if layout is empty, otherwise a child under root */
            Root = 7
        }
    }
    /**
     * Default LocationSelectors array used if none is specified.  Will always find a location.
     * @public
     */
    const defaultLocationSelectors: readonly LocationSelector[];
    /**
     * LocationSelectors to try to get location next to existing focused item
     * @public
     */
    const afterFocusedItemIfPossibleLocationSelectors: readonly LocationSelector[];
}

/** @internal */
export declare interface LeftAndTop {
    left: number;
    top: number;
}

/** @public */
export declare type LogicalZIndex = 'base' | 'drag' | 'stackMaximised';

/** @public */
export declare namespace LogicalZIndex {
    const base = "base";
    const drag = "drag";
    const stackMaximised = "stackMaximised";
}

/** @public */
export declare class PopoutBlockedError extends ExternalError {
    /** @internal */
    constructor(message: string);
}

/** @public */
export declare interface PopoutLayoutConfig extends LayoutConfig {
    /** The id of the element the item will be appended to on popIn
    * If null, append to topmost layout element
    */
    parentId: string | null | undefined;
    /** The position of this element within its parent
    * If null, position is last
    */
    indexInParent: number | null | undefined;
    /** @deprecated use {@link (PopoutLayoutConfig:interface).window} */
    dimensions: PopoutLayoutConfig.Dimensions | undefined;
    window: PopoutLayoutConfig.Window | undefined;
}

/** @public */
export declare namespace PopoutLayoutConfig {
    /** @deprecated use {@link (PopoutLayoutConfig:namespace).(Window:interface)} */
    export interface Dimensions extends LayoutConfig.Dimensions {
        /** @deprecated use {@link (PopoutLayoutConfig:namespace).(Window:interface).width} */
        width: number | null;
        /** @deprecated use {@link (PopoutLayoutConfig:namespace).(Window:interface).height} */
        height: number | null;
        /** @deprecated use {@link (PopoutLayoutConfig:namespace).(Window:interface).left} */
        left: number | null;
        /** @deprecated use {@link (PopoutLayoutConfig:namespace).(Window:interface).top} */
        top: number | null;
    }
    export interface Window {
        width?: number;
        height?: number;
        left?: number;
        top?: number;
    }
    export namespace Window {
        export function resolve(window: Window | undefined, dimensions: Dimensions | undefined): ResolvedPopoutLayoutConfig.Window;
    }
    export function resolve(popoutConfig: PopoutLayoutConfig): ResolvedPopoutLayoutConfig;
}

/** @internal */
export declare interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}

/** @public */
export declare interface ResolvedComponentItemConfig extends ResolvedHeaderedItemConfig {
    readonly type: 'component';
    readonly content: [];
    readonly title: string;
    readonly reorderEnabled: boolean;
    /**
     * The name of the component as specified in layout.registerComponent. Mandatory if type is 'component'.
     */
    readonly componentType: JsonValue;
    readonly componentState?: JsonValue;
}

/** @public */
export declare namespace ResolvedComponentItemConfig {
    const defaultReorderEnabled = true;
    export function resolveComponentTypeName(itemConfig: ResolvedComponentItemConfig): string | undefined;
    export function createCopy(original: ResolvedComponentItemConfig): ResolvedComponentItemConfig;
    export function createDefault(componentType?: JsonValue, componentState?: JsonValue, title?: string): ResolvedComponentItemConfig;
    export function copyComponentType(componentType: JsonValue): JsonValue;
}

/** @internal */
export declare interface ResolvedGroundItemConfig extends ResolvedItemConfig {
    readonly type: 'ground';
    readonly width: 100;
    readonly minWidth: 0;
    readonly height: 100;
    readonly minHeight: 0;
    readonly id: '';
    readonly isClosable: false;
    readonly title: '';
    readonly reorderEnabled: false;
}

/** @internal */
export declare namespace ResolvedGroundItemConfig {
    export function create(rootItemConfig: ResolvedRootItemConfig | undefined): ResolvedGroundItemConfig;
}

/** @public */
export declare interface ResolvedHeaderedItemConfig extends ResolvedItemConfig {
    header: ResolvedHeaderedItemConfig.Header | undefined;
    readonly maximised: boolean;
}

/** @public */
export declare namespace ResolvedHeaderedItemConfig {
    const defaultMaximised = false;
    export interface Header {
        readonly show: false | Side | undefined;
        readonly popout: false | string | undefined;
        readonly maximise: false | string | undefined;
        readonly close: string | undefined;
        readonly minimise: string | undefined;
        readonly tabDropdown: false | string | undefined;
    }
    export namespace Header {
        export function createCopy(original: Header | undefined, show?: false | Side): Header | undefined;
    }
}

/** @public */
export declare interface ResolvedItemConfig {
    readonly type: ItemType;
    readonly content: readonly ResolvedItemConfig[];
    readonly width: number;
    readonly minWidth: number;
    readonly height: number;
    readonly minHeight: number;
    readonly id: string;
    readonly isClosable: boolean;
}

/** @public */
export declare namespace ResolvedItemConfig {
    const defaults: ResolvedItemConfig;
    /** Creates a copy of the original ResolvedItemConfig using an alternative content if specified */
    export function createCopy(original: ResolvedItemConfig, content?: ResolvedItemConfig[]): ResolvedItemConfig;
    export function createDefault(type: ItemType): ResolvedItemConfig;
    export function isComponentItem(itemConfig: ResolvedItemConfig): itemConfig is ResolvedComponentItemConfig;
    export function isStackItem(itemConfig: ResolvedItemConfig): itemConfig is ResolvedStackItemConfig;
    /** @internal */
    export function isGroundItem(itemConfig: ResolvedItemConfig): itemConfig is ResolvedGroundItemConfig;
}

/** @public */
export declare interface ResolvedLayoutConfig {
    readonly root: ResolvedRootItemConfig | undefined;
    readonly openPopouts: ResolvedPopoutLayoutConfig[];
    readonly dimensions: ResolvedLayoutConfig.Dimensions;
    readonly settings: ResolvedLayoutConfig.Settings;
    readonly header: ResolvedLayoutConfig.Header;
    readonly resolved: true;
}

/** @public */
export declare namespace ResolvedLayoutConfig {
    export interface Settings {
        readonly constrainDragToContainer: boolean;
        readonly reorderEnabled: boolean;
        readonly popoutWholeStack: boolean;
        readonly blockedPopoutsThrowError: boolean;
        readonly closePopoutsOnUnload: boolean;
        readonly responsiveMode: ResponsiveMode;
        readonly tabOverlapAllowance: number;
        readonly reorderOnTabMenuClick: boolean;
        readonly tabControlOffset: number;
        readonly popInOnClose: boolean;
    }
    export namespace Settings {
        const defaults: ResolvedLayoutConfig.Settings;
        export function createCopy(original: Settings): Settings;
    }
    export interface Dimensions {
        readonly borderWidth: number;
        readonly borderGrabWidth: number;
        readonly minItemHeight: number;
        readonly minItemWidth: number;
        readonly headerHeight: number;
        readonly dragProxyWidth: number;
        readonly dragProxyHeight: number;
    }
    export namespace Dimensions {
        export function createCopy(original: Dimensions): Dimensions;
        const defaults: ResolvedLayoutConfig.Dimensions;
    }
    export interface Header {
        readonly show: false | Side;
        readonly popout: false | string;
        readonly dock: string;
        readonly maximise: false | string;
        readonly minimise: string;
        readonly close: false | string;
        readonly tabDropdown: false | string;
    }
    export namespace Header {
        export function createCopy(original: Header): Header;
        const defaults: ResolvedLayoutConfig.Header;
    }
    export function isPopout(config: ResolvedLayoutConfig): config is ResolvedPopoutLayoutConfig;
    export function createDefault(): ResolvedLayoutConfig;
    export function createCopy(config: ResolvedLayoutConfig): ResolvedLayoutConfig;
    export function copyOpenPopouts(original: ResolvedPopoutLayoutConfig[]): ResolvedPopoutLayoutConfig[];
    /**
     * Takes a GoldenLayout configuration object and
     * replaces its keys and values recursively with
     * one letter counterparts
     */
    export function minifyConfig(layoutConfig: ResolvedLayoutConfig): ResolvedLayoutConfig;
    /**
     * Takes a configuration Object that was previously minified
     * using minifyConfig and returns its original version
     */
    export function unminifyConfig(minifiedConfig: ResolvedLayoutConfig): ResolvedLayoutConfig;
}

/** @public */
export declare interface ResolvedPopoutLayoutConfig extends ResolvedLayoutConfig {
    readonly parentId: string | null;
    readonly indexInParent: number | null;
    readonly window: ResolvedPopoutLayoutConfig.Window;
}

/** @public */
export declare namespace ResolvedPopoutLayoutConfig {
    export interface Window {
        readonly width: number | null;
        readonly height: number | null;
        readonly left: number | null;
        readonly top: number | null;
    }
    export namespace Window {
        export function createCopy(original: Window): Window;
        const defaults: ResolvedPopoutLayoutConfig.Window;
    }
    export function createCopy(original: ResolvedPopoutLayoutConfig): ResolvedPopoutLayoutConfig;
}

/**
 * RootItemConfig is the topmost ResolvedItemConfig specified by the user.
 * Note that it does not have a corresponding contentItem.  It specifies the one and only child of the Ground ContentItem
 * Note that RootItemConfig can be an ComponentItem itemConfig.  However when the Ground ContentItem's child is created
 * a ComponentItem itemConfig will create a Stack with a child ComponentItem.
 * @public
*/
export declare type ResolvedRootItemConfig = ResolvedRowOrColumnItemConfig | ResolvedStackItemConfig | ResolvedComponentItemConfig;

/** @public */
export declare namespace ResolvedRootItemConfig {
    export function createCopy(config: ResolvedRootItemConfig): ResolvedRootItemConfig;
    export function isRootItemConfig(itemConfig: ResolvedItemConfig): itemConfig is ResolvedRootItemConfig;
}

/** Base for Root or RowOrColumn ItemConfigs
 * @public
 */
export declare interface ResolvedRowOrColumnItemConfig extends ResolvedItemConfig {
    readonly type: 'row' | 'column';
    /** Note that RowOrColumn ResolvedItemConfig contents, can contain ComponentItem itemConfigs.  However
     * when ContentItems are created, these ComponentItem itemConfigs will create a Stack with a child ComponentItem.
     */
    readonly content: readonly (ResolvedRowOrColumnItemConfig | ResolvedStackItemConfig | ResolvedComponentItemConfig)[];
}

/** @public */
export declare namespace ResolvedRowOrColumnItemConfig {
    export type ChildItemConfig = ResolvedRowOrColumnItemConfig | ResolvedStackItemConfig | ResolvedComponentItemConfig;
    export function isChildItemConfig(itemConfig: ResolvedItemConfig): itemConfig is ChildItemConfig;
    export function createCopy(original: ResolvedRowOrColumnItemConfig, content?: ChildItemConfig[]): ResolvedRowOrColumnItemConfig;
    export function copyContent(original: readonly ChildItemConfig[]): ChildItemConfig[];
    export function createDefault(type: 'row' | 'column'): ResolvedRowOrColumnItemConfig;
}

/** @public */
export declare interface ResolvedStackItemConfig extends ResolvedHeaderedItemConfig {
    readonly type: 'stack';
    readonly content: ResolvedComponentItemConfig[];
    /** The index of the active item in the Stack.  Only undefined if the Stack is empty. */
    readonly activeItemIndex: number | undefined;
}

/** @public */
export declare namespace ResolvedStackItemConfig {
    const defaultActiveItemIndex = 0;
    export function createCopy(original: ResolvedStackItemConfig, content?: ResolvedComponentItemConfig[]): ResolvedStackItemConfig;
    export function copyContent(original: ResolvedComponentItemConfig[]): ResolvedComponentItemConfig[];
    export function createDefault(): ResolvedStackItemConfig;
}

/** @public */
export declare type ResponsiveMode = 'none' | 'always' | 'onload';

/** @public */
export declare namespace ResponsiveMode {
    const none = "none";
    const always = "always";
    const onload = "onload";
}

/** @public */
export declare type RootItemConfig = RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig;

/** @public */
export declare namespace RootItemConfig {
    export function isRootItemConfig(itemConfig: ItemConfig): itemConfig is RootItemConfig;
    export function resolve(itemConfig: RootItemConfig | undefined): ResolvedRootItemConfig | undefined;
}

/** @public */
export declare class RowOrColumn extends ContentItem {
    /** @internal */
    private _rowOrColumnParent;
    /** @internal */
    private readonly _childElementContainer;
    /** @internal */
    private readonly _configType;
    /** @internal */
    private readonly _isColumn;
    /** @internal */
    private readonly _splitterSize;
    /** @internal */
    private readonly _splitterGrabSize;
    /** @internal */
    private readonly _dimension;
    /** @internal */
    private readonly _splitter;
    /** @internal */
    private _splitterPosition;
    /** @internal */
    private _splitterMinPosition;
    /** @internal */
    private _splitterMaxPosition;
    /** @internal */
    constructor(isColumn: boolean, layoutManager: LayoutManager, config: ResolvedRowOrColumnItemConfig, 
    /** @internal */
    _rowOrColumnParent: ContentItem);
    newComponent(componentType: JsonValue, componentState?: JsonValue, title?: string, index?: number): ComponentItem;
    addComponent(componentType: JsonValue, componentState?: JsonValue, title?: string, index?: number): number;
    newItem(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig, index?: number): ContentItem;
    addItem(itemConfig: RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig, index?: number): number;
    /**
     * Add a new contentItem to the Row or Column
     *
     * @param contentItem -
     * @param index - The position of the new item within the Row or Column.
     *                If no index is provided the item will be added to the end
     * @param suspendResize - If true the items won't be resized. This will leave the item in
     *                        an inconsistent state and is only intended to be used if multiple
     *                        children need to be added in one go and resize is called afterwards
     *
     * @returns
     */
    addChild(contentItem: ContentItem, index?: number, suspendResize?: boolean): number;
    /**
     * Removes a child of this element
     *
     * @param contentItem -
     * @param keepChild - If true the child will be removed, but not destroyed
     *
     */
    removeChild(contentItem: ContentItem, keepChild: boolean): void;
    /**
     * Replaces a child of this Row or Column with another contentItem
     */
    replaceChild(oldChild: ContentItem, newChild: ContentItem): void;
    /**
     * Called whenever the dimensions of this item or one of its parents change
     */
    updateSize(): void;
    /**
     * Invoked recursively by the layout manager. ContentItem.init appends
     * the contentItem's DOM elements to the container, RowOrColumn init adds splitters
     * in between them
     * @internal
     */
    init(): void;
    toConfig(): ResolvedRowOrColumnItemConfig;
    /** @internal */
    protected setParent(parent: ContentItem): void;
    /** @internal */
    private updateNodeSize;
    /**
     * Turns the relative sizes calculated by calculateRelativeSizes into
     * absolute pixel values and applies them to the children's DOM elements
     *
     * Assigns additional pixels to counteract Math.floor
     * @internal
     */
    private setAbsoluteSizes;
    /**
     * Calculates the absolute sizes of all of the children of this Item.
     * @returns Set with absolute sizes and additional pixels.
     * @internal
     */
    private calculateAbsoluteSizes;
    /**
     * Calculates the relative sizes of all children of this Item. The logic
     * is as follows:
     *
     * - Add up the total size of all items that have a configured size
     *
     * - If the total == 100 (check for floating point errors)
     *        Excellent, job done
     *
     * - If the total is \> 100,
     *        set the size of items without set dimensions to 1/3 and add this to the total
     *        set the size off all items so that the total is hundred relative to their original size
     *
     * - If the total is \< 100
     *        If there are items without set dimensions, distribute the remainder to 100 evenly between them
     *        If there are no items without set dimensions, increase all items sizes relative to
     *        their original size so that they add up to 100
     *
     * @internal
     */
    private calculateRelativeSizes;
    /**
     * Adjusts the column widths to respect the dimensions minItemWidth if set.
     * @internal
     */
    private respectMinItemWidth;
    /**
     * Instantiates a new Splitter, binds events to it and adds
     * it to the array of splitters at the position specified as the index argument
     *
     * What it doesn't do though is append the splitter to the DOM
     *
     * @param index - The position of the splitter
     *
     * @returns
     * @internal
     */
    private createSplitter;
    /**
     * Locates the instance of Splitter in the array of
     * registered splitters and returns a map containing the contentItem
     * before and after the splitters, both of which are affected if the
     * splitter is moved
     *
     * @returns A map of contentItems that the splitter affects
     * @internal
     */
    private getItemsForSplitter;
    /**
     * Gets the minimum dimensions for the given item configuration array
     * @internal
     */
    private getMinimumDimensions;
    /**
     * Invoked when a splitter's dragListener fires dragStart. Calculates the splitters
     * movement area once (so that it doesn't need calculating on every mousemove event)
     * @internal
     */
    private onSplitterDragStart;
    /**
     * Invoked when a splitter's DragListener fires drag. Updates the splitter's DOM position,
     * but not the sizes of the elements the splitter controls in order to minimize resize events
     *
     * @param splitter -
     * @param offsetX - Relative pixel values to the splitter's original position. Can be negative
     * @param offsetY - Relative pixel values to the splitter's original position. Can be negative
     * @internal
     */
    private onSplitterDrag;
    /**
     * Invoked when a splitter's DragListener fires dragStop. Resets the splitters DOM position,
     * and applies the new sizes to the elements before and after the splitter and their children
     * on the next animation frame
     * @internal
     */
    private onSplitterDragStop;
}

/** @public */
export declare namespace RowOrColumn {
    /** @internal */
    export function getElementDimensionSize(element: HTMLElement, dimension: WidthOrHeightPropertyName): number;
    /** @internal */
    export function setElementDimensionSize(element: HTMLElement, dimension: WidthOrHeightPropertyName, value: number): void;
    /** @internal */
    export function createElement(document: Document, isColumn: boolean): HTMLDivElement;
}

/** @public */
export declare interface RowOrColumnItemConfig extends ItemConfig {
    type: 'row' | 'column';
    content: (RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig)[];
}

/** @public */
export declare namespace RowOrColumnItemConfig {
    export type ChildItemConfig = RowOrColumnItemConfig | StackItemConfig | ComponentItemConfig;
    export function isChildItemConfig(itemConfig: ItemConfig): itemConfig is ChildItemConfig;
    export function resolve(itemConfig: RowOrColumnItemConfig): ResolvedRowOrColumnItemConfig;
    export function resolveContent(content: ChildItemConfig[] | undefined): ResolvedRowOrColumnItemConfig.ChildItemConfig[];
}

/** @public */
export declare type Side = 'top' | 'left' | 'right' | 'bottom';

/** @public */
export declare namespace Side {
    const top = "top";
    const left = "left";
    const right = "right";
    const bottom = "bottom";
}

/** @public */
export declare class Stack extends ComponentParentableItem {
    /** @internal */
    private readonly _headerConfig;
    /** @internal */
    private readonly _header;
    /** @internal */
    private readonly _childElementContainer;
    /** @internal */
    private readonly _maximisedEnabled;
    /** @internal */
    private _activeComponentItem;
    /** @internal */
    private _dropSegment;
    /** @internal */
    private _dropIndex;
    /** @internal */
    private _contentAreaDimensions;
    /** @internal */
    private _headerSideChanged;
    /** @internal */
    private readonly _initialWantMaximise;
    /** @internal */
    private _initialActiveItemIndex;
    /** @internal */
    private _resizeListener;
    /** @internal */
    private _maximisedListener;
    /** @internal */
    private _minimisedListener;
    get childElementContainer(): HTMLElement;
    get header(): Header;
    get headerShow(): boolean;
    get headerSide(): Side;
    get headerLeftRightSided(): boolean;
    /** @internal */
    get contentAreaDimensions(): Stack.ContentAreaDimensions | undefined;
    /** @internal */
    get initialWantMaximise(): boolean;
    get isMaximised(): boolean;
    get stackParent(): ContentItem;
    /** @internal */
    constructor(layoutManager: LayoutManager, config: ResolvedStackItemConfig, parent: ContentItem);
    /** @internal */
    updateSize(): void;
    /** @internal */
    init(): void;
    /** @deprecated Use {@link (Stack:class).setActiveComponentItem} */
    setActiveContentItem(item: ContentItem): void;
    setActiveComponentItem(componentItem: ComponentItem, focus: boolean, suppressFocusEvent?: boolean): void;
    /** @deprecated Use {@link (Stack:class).getActiveComponentItem} */
    getActiveContentItem(): ContentItem | null;
    getActiveComponentItem(): ComponentItem | undefined;
    /** @internal */
    focusActiveContentItem(): void;
    /** @internal */
    setFocusedValue(value: boolean): void;
    /** @internal */
    setRowColumnClosable(value: boolean): void;
    newComponent(componentType: JsonValue, componentState?: JsonValue, title?: string, index?: number): ComponentItem;
    addComponent(componentType: JsonValue, componentState?: JsonValue, title?: string, index?: number): number;
    newItem(itemConfig: ComponentItemConfig, index?: number): ContentItem;
    addItem(itemConfig: ComponentItemConfig, index?: number): number;
    addChild(contentItem: ContentItem, index?: number, focus?: boolean): number;
    removeChild(contentItem: ContentItem, keepChild: boolean): void;
    /**
     * Maximises the Item or minimises it if it is already maximised
     */
    toggleMaximise(): void;
    maximise(): void;
    minimise(): void;
    /** @internal */
    destroy(): void;
    toConfig(): ResolvedStackItemConfig;
    /**
     * Ok, this one is going to be the tricky one: The user has dropped a {@link (ContentItem:class)} onto this stack.
     *
     * It was dropped on either the stacks header or the top, right, bottom or left bit of the content area
     * (which one of those is stored in this._dropSegment). Now, if the user has dropped on the header the case
     * is relatively clear: We add the item to the existing stack... job done (might be good to have
     * tab reordering at some point, but lets not sweat it right now)
     *
     * If the item was dropped on the content part things are a bit more complicated. If it was dropped on either the
     * top or bottom region we need to create a new column and place the items accordingly.
     * Unless, of course if the stack is already within a column... in which case we want
     * to add the newly created item to the existing column...
     * either prepend or append it, depending on wether its top or bottom.
     *
     * Same thing for rows and left / right drop segments... so in total there are 9 things that can potentially happen
     * (left, top, right, bottom) * is child of the right parent (row, column) + header drop
     *
     * @internal
     */
    onDrop(contentItem: ContentItem, area: ContentItem.Area): void;
    /**
     * If the user hovers above the header part of the stack, indicate drop positions for tabs.
     * otherwise indicate which segment of the body the dragged item would be dropped on
     *
     * @param x - Absolute Screen X
     * @param y - Absolute Screen Y
     * @internal
     */
    highlightDropZone(x: number, y: number): void;
    /** @internal */
    getArea(): ContentItem.Area | null;
    /**
     * Programmatically operate with header position.
     *
     * @param position -
     *
     * @returns previous header position
     * @internal
     */
    positionHeader(position: Side): void;
    /** @internal */
    private updateNodeSize;
    /** @internal */
    private highlightHeaderDropZone;
    /** @internal */
    private resetHeaderDropZone;
    /** @internal */
    private setupHeaderPosition;
    /** @internal */
    private highlightBodyDropZone;
    /** @internal */
    private handleResize;
    /** @internal */
    private handleMaximised;
    /** @internal */
    private handleMinimised;
    /** @internal */
    private handlePopoutEvent;
    /** @internal */
    private handleHeaderClickEvent;
    /** @internal */
    private handleHeaderTouchStartEvent;
    /** @internal */
    private handleHeaderComponentRemoveEvent;
    /** @internal */
    private handleHeaderComponentFocusEvent;
    /** @internal */
    private handleHeaderComponentStartDragEvent;
    /** @internal */
    private createHeaderConfig;
    /** @internal */
    private emitStateChangedEvent;
}

/** @public */
export declare namespace Stack {
    /** @internal */
    export const enum Segment {
        Header = "header",
        Body = "body",
        Left = "left",
        Right = "right",
        Top = "top",
        Bottom = "bottom"
    }
    /** @internal */
    export interface ContentAreaDimension {
        hoverArea: AreaLinkedRect;
        highlightArea: AreaLinkedRect;
    }
    /** @internal */
    export type ContentAreaDimensions = {
        [segment: string]: ContentAreaDimension;
    };
    /** @internal */
    export function createElement(document: Document): HTMLDivElement;
}

/** @public */
export declare interface StackItemConfig extends HeaderedItemConfig {
    type: 'stack';
    content: ComponentItemConfig[];
    /** The index of the item in content which is to be active*/
    activeItemIndex?: number;
}

/** @public */
export declare namespace StackItemConfig {
    export function resolve(itemConfig: StackItemConfig): ResolvedStackItemConfig;
    export function resolveContent(content: ComponentItemConfig[] | undefined): ResolvedComponentItemConfig[];
}

/** @public */
export declare namespace StyleConstants {
    const defaultComponentBaseZIndex = "auto";
    const defaultComponentDragZIndex = "32";
    const defaultComponentStackMaximisedZIndex = "41";
}

/**
 * Represents an individual tab within a Stack's header
 * @public
 */
export declare class Tab {
    /** @internal */
    private readonly _layoutManager;
    /** @internal */
    private _componentItem;
    /** @internal */
    private _closeEvent;
    /** @internal */
    private _focusEvent;
    /** @internal */
    private _dragStartEvent;
    /** @internal */
    private readonly _element;
    /** @internal */
    private readonly _titleElement;
    /** @internal */
    private readonly _closeElement;
    /** @internal */
    private _dragListener;
    /** @internal */
    private _isActive;
    /** @internal */
    private readonly _tabClickListener;
    /** @internal */
    private readonly _tabTouchStartListener;
    /** @internal */
    private readonly _closeClickListener;
    /** @internal */
    private readonly _closeTouchStartListener;
    /** @internal */
    private readonly _dragStartListener;
    /** @internal */
    private readonly _contentItemDestroyListener;
    /** @internal */
    private readonly _tabTitleChangedListener;
    get isActive(): boolean;
    get componentItem(): ComponentItem;
    /** @deprecated use {@link (Tab:class).componentItem} */
    get contentItem(): ComponentItem;
    get element(): HTMLElement;
    get titleElement(): HTMLElement;
    get closeElement(): HTMLElement | undefined;
    get reorderEnabled(): boolean;
    set reorderEnabled(value: boolean);
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager: LayoutManager, 
    /** @internal */
    _componentItem: ComponentItem, 
    /** @internal */
    _closeEvent: Tab.CloseEvent | undefined, 
    /** @internal */
    _focusEvent: Tab.FocusEvent | undefined, 
    /** @internal */
    _dragStartEvent: Tab.DragStartEvent | undefined);
    /**
     * Sets the tab's title to the provided string and sets
     * its title attribute to a pure text representation (without
     * html tags) of the same string.
     */
    setTitle(title: string): void;
    /**
     * Sets this tab's active state. To programmatically
     * switch tabs, use Stack.setActiveComponentItem( item ) instead.
     */
    setActive(isActive: boolean): void;
    /**
     * Destroys the tab
     * @internal
     */
    destroy(): void;
    /** @internal */
    setBlurred(): void;
    /** @internal */
    setFocused(): void;
    /**
     * Callback for the DragListener
     * @param x - The tabs absolute x position
     * @param y - The tabs absolute y position
     * @internal
     */
    private onDragStart;
    /** @internal */
    private onContentItemDestroy;
    /**
     * Callback when the tab is clicked
     * @internal
     */
    private onTabClickDown;
    /** @internal */
    private onTabTouchStart;
    /**
     * Callback when the tab's close button is clicked
     * @internal
     */
    private onCloseClick;
    /** @internal */
    private onCloseTouchStart;
    /**
     * Callback to capture tab close button mousedown
     * to prevent tab from activating.
     * @internal
     */
    /** @internal */
    private notifyClose;
    /** @internal */
    private notifyFocus;
    /** @internal */
    private enableReorder;
    /** @internal */
    private disableReorder;
}

/** @public */
export declare namespace Tab {
    /** @internal */
    export type CloseEvent = (componentItem: ComponentItem) => void;
    /** @internal */
    export type FocusEvent = (componentItem: ComponentItem) => void;
    /** @internal */
    export type DragStartEvent = (x: number, y: number, dragListener: DragListener, componentItem: ComponentItem) => void;
}

/** @internal @deprecated To be removed */
declare class TransitionIndicator {
    private _element;
    private _toElement;
    private _fromDimensions;
    private _totalAnimationDuration;
    private _animationStartTime;
    constructor();
    destroy(): void;
    transitionElements(fromElement: HTMLElement, toElement: HTMLElement): void;
    private nextAnimationFrame;
    private measure;
}

/** @public */
export declare class VirtualLayout extends LayoutManager {
    /**
     * @deprecated Use {@link (VirtualLayout:class).bindComponentEvent} and
     * {@link (VirtualLayout:class).unbindComponentEvent} with virtual components
     */
    getComponentEvent: VirtualLayout.GetComponentEventHandler | undefined;
    /**
     * @deprecated Use {@link (VirtualLayout:class).bindComponentEvent} and
     * {@link (VirtualLayout:class).unbindComponentEvent} with virtual components
     */
    releaseComponentEvent: VirtualLayout.ReleaseComponentEventHandler | undefined;
    bindComponentEvent: VirtualLayout.BindComponentEventHandler | undefined;
    unbindComponentEvent: VirtualLayout.UnbindComponentEventHandler | undefined;
    /** @internal @deprecated use while constructor is not determinate */
    private _bindComponentEventHanlderPassedInConstructor;
    /** @internal  @deprecated use while constructor is not determinate */
    private _creationTimeoutPassed;
    /**
     * @param container - A Dom HTML element. Defaults to body
     * @param bindComponentEventHandler - Event handler to bind components
     * @param bindComponentEventHandler - Event handler to unbind components
     * If bindComponentEventHandler is defined, then constructor will be determinate. It will always call the init()
     * function and the init() function will always complete. This means that the bindComponentEventHandler will be called
     * if constructor is for a popout window. Make sure bindComponentEventHandler is ready for events.
     */
    constructor(container?: HTMLElement, bindComponentEventHandler?: VirtualLayout.BindComponentEventHandler, unbindComponentEventHandler?: VirtualLayout.UnbindComponentEventHandler);
    /** @deprecated specify layoutConfig in {@link (LayoutManager:class).loadLayout} */
    constructor(config: LayoutConfig, container?: HTMLElement);
    /** @internal */
    constructor(configOrOptionalContainer: LayoutConfig | HTMLElement | undefined, containerOrBindComponentEventHandler: HTMLElement | VirtualLayout.BindComponentEventHandler | undefined, unbindComponentEventHandler: VirtualLayout.UnbindComponentEventHandler | undefined, skipInit: true);
    destroy(): void;
    /**
     * Creates the actual layout. Must be called after all initial components
     * are registered. Recurses through the configuration and sets up
     * the item tree.
     *
     * If called before the document is ready it adds itself as a listener
     * to the document.ready event
     * @deprecated LayoutConfig should not be loaded in {@link (LayoutManager:class)} constructor, but rather in a
     * {@link (LayoutManager:class).loadLayout} call.  If LayoutConfig is not specified in {@link (LayoutManager:class)} constructor,
     * then init() will be automatically called internally and should not be called externally.
     */
    init(): void;
    /**
     * Clears existing HTML and adjusts style to make window suitable to be a popout sub window
     * Curently is automatically called when window is a subWindow and bindComponentEvent is not passed in the constructor
     * If bindComponentEvent is not passed in the constructor, the application must either call this function explicitly or
     * (preferably) make the window suitable as a subwindow.
     * In the future, it is planned that this function is NOT automatically called in any circumstances.  Applications will
     * need to determine whether a window is a Golden Layout popout window and either call this function explicitly or
     * hide HTML not relevant to the popout.
     * See apitest for an example of how HTML is hidden when popout windows are displayed
     */
    clearHtmlAndAdjustStylesForSubWindow(): void;
    /**
     * Will add button if not popinOnClose specified in settings
     * @returns true if added otherwise false
     */
    checkAddDefaultPopinButton(): boolean;
    /** @internal */
    bindComponent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig): ComponentContainer.BindableComponent;
    /** @internal */
    unbindComponent(container: ComponentContainer, virtual: boolean, component: ComponentContainer.Component | undefined): void;
}

/** @public */
export declare namespace VirtualLayout {
    /**
     * @deprecated Use virtual components with {@link (VirtualLayout:class).bindComponentEvent} and
     * {@link (VirtualLayout:class).unbindComponentEvent} events.
     */
    export type GetComponentEventHandler = (this: void, container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) => ComponentContainer.Component;
    /**
     * @deprecated Use virtual components with {@link (VirtualLayout:class).bindComponentEvent} and
     * {@link (VirtualLayout:class).unbindComponentEvent} events.
     */
    export type ReleaseComponentEventHandler = (this: void, container: ComponentContainer, component: ComponentContainer.Component) => void;
    export type BindComponentEventHandler = (this: void, container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) => ComponentContainer.BindableComponent;
    export type UnbindComponentEventHandler = (this: void, container: ComponentContainer) => void;
    export type BeforeVirtualRectingEvent = (this: void) => void;
    /** @internal */
    export function createLayoutManagerConstructorParameters(configOrOptionalContainer: LayoutConfig | HTMLElement | undefined, containerOrBindComponentEventHandler?: HTMLElement | VirtualLayout.BindComponentEventHandler): LayoutManager.ConstructorParameters;
}

/** @internal */
export declare interface WidthAndHeight {
    width: number;
    height: number;
}

/** @internal */
export declare type WidthOrHeightPropertyName = 'width' | 'height';

/** @internal */
export declare namespace WidthOrHeightPropertyName {
    const width = "width";
    const height = "height";
}

export { }
