/**
 * Container module
 * @todo Needs description
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents, AMEvent } from "./Sprite";
import { SpriteState } from "./SpriteState";
import { Animation } from "./utils/Animation";
import { List, IListEvents } from "./utils/List";
import { VerticalAlign } from "./defs/VerticalAlign";
import { IDisposer } from "./utils/Disposer";
import { Dictionary } from "./utils/Dictionary";
import { Align } from "./defs/Align";
import { IPoint } from "./defs/IPoint";
import { Preloader } from "./elements/Preloader";
import { DataItem } from "./DataItem";
import { Optional } from "./utils/Type";
import { Paper } from "./rendering/Paper";
import * as $type from "./utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines available font weights.
 */
export declare type FontWeight = "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
/**
 * Defines available text decorations.
 */
export declare type TextDecoration = "none" | "underline" | "overline" | "line-through" | "blink";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines available [[Container]] layout types
 */
export declare type ContainerLayout = "absolute" | "vertical" | "horizontal" | "grid" | "none";
/**
 * Defines properties for [[Container]]
 */
export interface IContainerProperties extends ISpriteProperties {
    /**
     * Container layout.
     *
     * Options: "absolute" (default), "vertical", "horizontal", or "grid".
     *
     * @default "absolute"
     */
    layout?: ContainerLayout;
    /**
     * Default font weight.
     *
     * @default "normal"
     */
    fontWeight?: FontWeight;
    /**
     * Font size for the text.
     */
    fontSize?: number;
    /**
     * Font family for the text.
     */
    fontFamily?: string;
    /**
     * Default font decoration.
     *
     * @default "none"
     */
    textDecoration?: TextDecoration;
    /**
     * Horizontal alignment of Container's items.
     */
    contentAlign?: Align;
    /**
     * Vertical alignment of Container's items.
     *
     * @ignore Exclude from docs
     */
    contentValign?: VerticalAlign;
    /**
     * If set to `true`, all columns of the container with layout type "grid"
     * will be equally sized.
     *
     * @default false
     */
    fixedWidthGrid?: boolean;
    /**
     * Maximum number of columns (when using `"grid"` layout).
     */
    maxColumns?: number;
    /**
     * If set to `true`, the children of the container will be drawn in reverse
     * order.
     *
     * @default false
     */
    reverseOrder?: boolean;
    /**
     * Specifies if, when state is applied on this container, the same state
     * should be applied to container's children as well as `background`.
     *
     * @default false
     */
    setStateOnChildren?: boolean;
}
/**
 * Defines events for the [[Container]]
 */
export interface IContainerEvents extends ISpriteEvents {
    /**
     * Invoked when a child Sprite is added to Container.
     */
    childadded: {
        newValue: Sprite;
    };
    /**
     * Invoked when a child Sprite is removed from
     */
    childremoved: {
        oldValue: Sprite;
    };
    /**
     * invoked when layout of the container is validated
     */
    layoutvalidated: {};
}
/**
 * Defines adapters
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface IContainerAdapters extends ISpriteAdapters, IContainerProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Container can contain multiple sprites and arrange them in various layouts.
 *
 * @see {@link IContainerEvents} for a list of available events
 * @see {@link IContainerAdapters} for a list of available Adapters
 * @important
 */
export declare class Container extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IContainerProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IContainerAdapters;
    /**
     * Defines available events.
     */
    _events: IContainerEvents;
    /**
     * Container children. (sorted by layout)
     *
     * @ignore Exclude from docs
     */
    protected _childrenByLayout: Sprite[];
    /**
     * Available width (px).
     *
     * @ignore Exclude from docs
     */
    protected _availableWidth: $type.Optional<number>;
    /**
     * Available height (px).
     *
     * @ignore Exclude from docs
     */
    protected _availableHeight: $type.Optional<number>;
    /**
     * Container's child elements. (sorded by their `zIndex`)
     *
     * @ignore Exclude from docs
     */
    protected _children: $type.Optional<List<Sprite>>;
    /**
     * Container's disposers for its child elements.
     *
     * @ignore Exclude from docs
     */
    protected _childrenDisposers: Dictionary<string, IDisposer>;
    /**
     * A [[Sprite]] instance to use as Container's background.
     *
     * @todo Make it protected
     */
    _background: Sprite;
    /**
     * A reference to a [[Preloader]] element to show when Container is building
     * itself.
     *
     * @ignore Exclude from docs
     */
    protected _preloader: $type.Optional<Preloader>;
    /**
     * Indicates if this container contains any focused elements, including
     * itself.
     */
    hasFocused: boolean;
    /**
     * A reference to a currently focused item.
     *
     * @since 4.9.29
     */
    focusedElement: $type.Optional<Sprite>;
    /**
     * An array of references to elements the state should be set, when it is set
     * on this element.
     */
    setStateOnSprites: Sprite[];
    layoutInvalid: boolean;
    protected _absoluteWidth: number;
    protected _absoluteHeight: number;
    /**
     * Width (in pixels) of the actual content in the Container.
     *
     * Please note that it might be bigger than width of the Container.
     *
     * @readonly
     */
    contentWidth: number;
    /**
     * Height (in pixels) of the actual content in the Container.
     *
     * Please note that it might be bigger than height of the Container.
     *
     * @readonly
     */
    contentHeight: number;
    /**
     * An array of child Sprites that should be ready before this object can
     * fire a "ready" event.
     */
    protected _shouldBeReady: Sprite[];
    /**
     * Enables touch tap protection.
     */
    protected _tapToActivate: boolean;
    /**
     * Timeout reference for `tapToActivate` functionality.
     */
    protected _tapToActivateTimeout: Optional<IDisposer>;
    /**
     * If `tapToActivate` is used, this setting will determine how long the chart
     * will stay in "active" mode.
     *
     * @default 3000
     * @since 4.4.0
     */
    tapTimeout: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Handles adding of a new child into `children`. Adding new children might
     * affect the whole layout so it needs to be revalidated.
     *
     * @ignore Exclude from docs
     * @param event Event object
     * @todo Throw an exception on adding a disposed object. Of course it's better NOT TO add disposed objects, so that what we should focus on.
     */
    handleChildAdded(event: IListEvents<Sprite>["inserted"]): void;
    /**
     * @ignore
     */
    processChild(child: Sprite): void;
    /**
     * @ignore
     */
    protected sortAndAdd(): void;
    /**
     * Handles child removal. Changing size of the child may change the
     * whole layout of the Container, hence layout needs to be invalidated.
     *
     * @ignore Exclude from docs
     * @param event Event object
     */
    handleChildRemoved(event: IListEvents<Sprite>["removed"]): void;
    /**
     * Handles child transformation. Changing size of the child may change the
     * whole layout of the Container, hence layout needs to be invalidated.
     *
     * @ignore Exclude from docs
     * @param event Event object
     */
    handleChildTransform(event: AMEvent<Sprite, ISpriteEvents>["transformed"] | AMEvent<Sprite, ISpriteEvents>["sizechanged"]): void;
    /**
     * Invalidates Container's layout, causing it to be re-evaluated again.
     *
     * @ignore Exclude from docs
     */
    invalidateLayout(): void;
    /**
     * Invalidates element.
     *
     * Object will be redrawn during the next update cycle.
     *
     * Please note that in most cases elements will auto-invalidate when needed. If
     * everything works, DO NOT use this method. Use it only if some changes do
     * not take otherwise.
     */
    invalidate(): void;
    /**
     * Invalidates the whole element, including layout AND all its child
     * elements.
     *
     * As this will essentially force all elements to redraw, use only if
     * absolutely necessary.
     */
    deepInvalidate(): void;
    /**
     * Returns a list of the child [[Sprite]] elements contained in this
     * Container.
     *
     * @return List of child elements (Sprites)
     */
    readonly children: List<Sprite>;
    /**
     * Minimum width (px) for the Container. A container will not
     * auto-shrink beyond this value, even if child elements are smaller.
     *
     * @param value  Width (px)
     */
    /**
    * @return Width (px)
    */
    minWidth: Optional<number>;
    /**
     * Minimum height (px) for the Container. A container will not
     * auto-shrink beyond this value, even if child elements are smaller.
     *
     * @param value  Height (px)
     */
    /**
    * @return Height (px)
    */
    minHeight: Optional<number>;
    /**
     * Overrides the original `removeElement` so that Container's actual element
     * is not removed. We do not need to remove element of a Container.
     *
     * We do this because remove element each time will fail the `getBBox`.
     *
     * @ignore Exclude from docs
     */
    protected removeElement(): void;
    /**
     * Sorts Container's children: the ones with variable width and height are
     * put at the end of the list (depending on layout type), so that fixed-width
     * ones can be drawn first.
     *
     * @ignore Exclude from docs
     */
    sortChildren(): void;
    /**
     * Calculates relative sizes for all Container's children.
     *
     * @ignore Exclude from docs
     * @todo Make it protected?
     */
    calculateRelativeSize(): void;
    /**
     * Adds all children to Container's SVG element.
     *
     * @ignore Exclude from docs
     */
    protected addChildren(): void;
    /**
     * Creates a new element of specific type and assigns as a child to the
     * Container.
     *
     * @param Class type for the new element
     * @return New element
     */
    createChild<T extends Sprite>(classType: {
        new (): T;
    }): T;
    /**
     * Removes all Container's children without actually destroying them.
     *
     * To destroy children use `disposeChildren()` instead.
     */
    removeChildren(): void;
    /**
     * Removes and destroys all Container's children.
     *
     * To remove children from Container without destroying them, use
     * `removeChildren()`.
     */
    disposeChildren(): void;
    /**
     * An element to use as container background.
     *
     * @param background  Background element
     */
    /**
    * @return Background element
    */
    background: this["_background"];
    /**
     * Handles the situation where parent element is resized.
     *
     * @ignore Exclude from docs
     */
    handleGlobalScale(): void;
    /**
     * Creates and returns a [[Rectangle]] to use as a background for Container.
     *
     * @ignore Exclude from docs
     * @return Background Rectangle element
     */
    createBackground(): this["_background"];
    /**
     * Decorates background element with required properties.
     *
     * @ignore Exclude from docs
     */
    processBackground(): void;
    /**
     * Measures the size of container and informs its children of how much size
     * they can occupy, by setting their relative `maxWidth` and `maxHeight`
     * properties.
     *
     * @ignore Exclude from docs
     */
    validateLayout(): void;
    /**
     * Arranges children according to layout specs and available space / child
     * sizes.
     *
     * @ignore Exclude from docs
     */
    arrange(): void;
    /**
     * Positions element according its center settings.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    updateCenter(): void;
    /**
     * Update the background to fit into specific dimensions.
     *
     * @ignore Exclude from docs
     * @todo Make it protected?
     */
    updateBackground(): void;
    /**
     * Returns widths of all columns in a horizontal Container layout.
     *
     * @ignore Exclude from docs
     * @param columnCount   Number of columns
     * @param maxCellWidth  Maximum width of one grid cell
     * @return An array of column widths
     */
    getColumnWidth(children: Sprite[], columnCount: number, maxCellWidth: number): number[];
    /**
     * Container layout.
     *
     * Options: "absolute" (default), "vertical", "horizontal", "grid", "none". "none" is quite the same as "absolute" - the objects will
     * be positioned at their x, y coordinates, the difference is that with "absolute" you can still use align/valign for children and with "none" you can not.
     * Use "none" as much as you can as it's most cpu-saving layout.
     *
     * @default "absolute"
     * @param value Layout
     */
    /**
    * @return Layout
    */
    layout: ContainerLayout;
    /**
     * Vertical alignment of the elements for the vertical Container.
     *
     * This is used when Container is larger than the height of all its children.
     *
     * @param value vertical alignment
     */
    /**
    * @return Vertical alignment
    */
    contentValign: VerticalAlign;
    /**
     * Horizontal alignment of the elements for the horizontal Container.
     *
     * This is used when Container is larger than the height of all its children.
     *
     * @param value  Horizontal alignment
     */
    /**
    * @return Horizontal alignment
    */
    contentAlign: Align;
    /**
     * Controls if the grid of the Container should use fixed width. Fixed width
     * grid will divide available space to all its columns/rows equally, without
     * adapting to actual child sizes or size requirements.
     *
     * @default false
     * @param value  Should use fixed width grid?
     */
    /**
    * @return Should use fixed width grid?
    */
    fixedWidthGrid: boolean;
    /**
     * Maximum number of columns (when using `"grid"` layout).
     *
     * @param value  Should use fixed width grid?
     */
    /**
    * @return Should use fixed width grid?
    */
    maxColumns: Optional<number>;
    /**
     * If set to `true`, the children of the container will be drawn in reverse
     * order.
     *
     * @default false
     * @param value  Reverse children?
     */
    /**
    * @return Reverse children?
    */
    reverseOrder: Optional<boolean>;
    /**
     * Specifies if, when state is applied on this container, the same state
     * should be applied to container's children as well as `background`.
     *
     * @default false
     * @param value  Set state on children
     */
    /**
    * @return Set state on children
    */
    setStateOnChildren: boolean;
    /**
     * Checks if point is within bounds of a container.
     *
     * @param point  A coordinate to check
     * @return `true` if it fits within container
     */
    fitsToBounds(point: IPoint): boolean;
    /**
     * Copies all properties from different Container, including background
     * clone.
     *
     * @param source  Source Container to copy from
     */
    copyFrom(source: this): void;
    /**
     * A [[Preloader]] instance to be used when Container is busy.
     *
     * @param preloader  Preloader instance
     */
    /**
    * @return Preloader instance
    */
    preloader: $type.Optional<Preloader>;
    /**
     * Sets [[Paper]] instance to use to draw elements.
     * @ignore
     * @param paper Paper
     * @return true if paper was changed, false, if it's the same
     */
    setPaper(paper: Paper): boolean;
    /**
     * Removes Container from the system-wide list of invalid Containers.
     *
     * @ignore Exclude from docs
     */
    protected removeFromInvalids(): void;
    /**
     * Sets a [[DataItem]] to be used as data for the Container.
     *
     * @todo Description
     * @param dataItem DataItem
     */
    protected setDataItem(dataItem: DataItem): void;
    /**
     * Measures the element.
     *
     * @ignore Exclude from docs
     */
    measureElement(): void;
    /**
     * Font family to be used for the text.
     *
     * Parts of the text may override this setting using in-line formatting.
     *
     * @param value Font family value
     */
    /**
    * @return Font family
    */
    fontFamily: string;
    /**
     * Font size to be used for the text. The size can either be numeric, in
     * pixels, or other measurements.
     *
     * Parts of the text may override this setting using in-line formatting.
     *
     * @param value Font size value
     */
    /**
    * @return Font size
    */
    fontSize: any;
    /**
     * When fontSize of fontFamily changes we need to hard-invalidate all Labels of this container to position them properly.
     */
    invalidateLabels(): void;
    /**
     * Font weight to use for text.
     *
     * Parts of the text may override this setting using in-line formatting.
     *
     * @param value Font weight
     */
    /**
    * @return Font weight
    */
    fontWeight: FontWeight;
    /**
     * A text decoration to use for text.
     *
     * Parts of the text may override this setting using in-line formatting.
     *
     * @param value  Decoration
     */
    /**
    * @return Decoration
    */
    textDecoration: TextDecoration;
    /**
     * Disposes (destroys) the element and all its children.
     */
    dispose(): void;
    /**
     * Applies a [[SpriteState]] on this element.
     *
     * The first parameter can either be a name of the state or a [[SpriteState]]
     * instance.
     *
     * When run, this method will apply SVG properties defined in a
     * [[SpriteState]], but only those that are relevant to this particular
     * element, that is are listed in its respective `properties` array.
     *
     * @see {@link SpriteState}
     * @param value               A state - name key or instance
     * @param transitionDuration  Duration of the transition between current and new state
     * @param easing              An easing function
     */
    setState(value: string | SpriteState<this["_properties"], this["_adapter"]>, transitionDuration?: number, easing?: (value: number) => number): $type.Optional<Animation>;
    protected setActive(value: boolean): void;
    /**
     * Dispatches ready event. Dispatches when all children are ready.
     */
    dispatchReady(): void;
    /**
     * Called during the System.update method
     *
     * @ignore Exclude from docs
     */
    _systemUpdate(skippedSprites: Array<Sprite>): void;
    /**
     * Called during the System.validatePositions method
     *
     * @ignore Exclude from docs
     */
    _systemValidatePositions(): void;
    /**
     * Called during the System.validateLayouts method
     *
     * @ignore Exclude from docs
     */
    _systemValidateLayouts(): void;
    /**
     * If set to `true` the chart's regular touch functionality will be suspended
     * so that the whole page it is located in remains scrollable, even when
     * swiping over the chart's body.
     *
     * User will need to tap the chart in order to activate its regular touch
     * functionality.
     *
     * The chart will remain "active" as long as user keeps interacting with the
     * chart. After `tapTimeout` milliseconds the chart will return to its
     * "protected" mode.
     *
     * @default false
     * @since 4.4.0
     * @param  value  Enable touch protection?
     * @see {@link https://www.amcharts.com/docs/v4/concepts/touch/} For more information.
     */
    /**
    * @return Enable touch protection?
    */
    tapToActivate: boolean;
    protected setTapToActivate(value: boolean): void;
    /**
     * @todo Ignore on non-touch events
     */
    protected handleTapToActivate(): void;
    protected handleTapToActivateDeactivation(): void;
    protected initTapTimeout(): void;
    /**
     * Moves the whole chart to other HTML container.
     *
     * `htmlElement` can either be a reference to a DOM element, or an id of
     * such element.
     *
     * @since 4.9.24
     * @param  htmlElement  Target element
     */
    moveHtmlContainer(htmlElement: string | HTMLElement): void;
    /**
     * @ignore
     * @return Has license?
     */
    hasLicense(): boolean;
}
