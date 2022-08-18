/**
 * This is the main class that encapsulates every object on the chart.
 *
 * If it's an element that is to be displayed on the screen at some point, its
 * class must extend [[Sprite]] class.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SpriteState } from "./SpriteState";
import { ISpriteEvents, SpriteEventDispatcher, AMEvent } from "./SpriteEvents";
export { ISpriteEvents, SpriteEventDispatcher, AMEvent };
import { BaseObjectEvents } from "./Base";
import { Adapter } from "./utils/Adapter";
import { ITheme } from "../themes/ITheme";
import { Dictionary, IDictionaryEvents, DictionaryTemplate } from "./utils/Dictionary";
import { ListTemplate, List } from "./utils/List";
import { EventDispatcher } from "./utils/EventDispatcher";
import { MultiDisposer, IDisposer, MutableValueDisposer } from "./utils/Disposer";
import { Animation, IAnimatable } from "./utils/Animation";
import { Optional } from "./utils/Type";
import { Group } from "./rendering/Group";
import { Paper } from "./rendering/Paper";
import { DataItem } from "./DataItem";
import { Container } from "./Container";
import { Pattern } from "./rendering/fills/Pattern";
import { LinearGradient } from "./rendering/fills/LinearGradient";
import { RadialGradient } from "./rendering/fills/RadialGradient";
import { SVGContainer } from "./rendering/SVGContainer";
import { Align } from "./defs/Align";
import { Roles, AriaLive } from "./defs/Accessibility";
import { IPlugin } from "./utils/Plugin";
import { Popup } from "./elements/Popup";
import { Modal } from "./elements/Modal";
import { Color } from "./utils/Color";
import { Ordering } from "./utils/Order";
import { HorizontalCenter } from "./defs/HorizontalCenter";
import { VerticalCenter } from "./defs/VerticalCenter";
import { VerticalAlign } from "./defs/VerticalAlign";
import { ShapeRendering } from "./defs/ShapeRendering";
import { AMElement } from "./rendering/AMElement";
import { Filter } from "./rendering/filters/Filter";
import { ColorModifier } from "./rendering/fills/ColorModifier";
import { InteractionObject } from "./interaction/InteractionObject";
import { IInertiaOptions, ISwipeOptions, IHitOptions, IHoverOptions, ICursorOptions, IKeyboardOptions, IMouseOptions } from "./interaction/InteractionOptions";
import { IPointer } from "./interaction/Pointer";
import { InertiaTypes } from "./interaction/Inertia";
import { IStyleProperty } from "./defs/IStyleProperty";
import { IPoint } from "./defs/IPoint";
import { IRectangle } from "./defs/IRectangle";
import { Tooltip } from "./elements/Tooltip";
import { NumberFormatter } from "./formatters/NumberFormatter";
import { DateFormatter } from "./formatters/DateFormatter";
import { DurationFormatter } from "./formatters/DurationFormatter";
import { Language } from "./utils/Language";
import { Export } from "./export/Export";
import { AmChartsLogo } from "./elements/AmChartsLogo";
import { ISVGAttribute } from "./rendering/AMElement";
import * as $type from "./utils/Type";
import { Percent } from "./utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Sprite]]
 */
export interface ISpriteProperties {
    disabled?: boolean;
    x?: number | Percent;
    y?: number | Percent;
    width?: number | Percent;
    height?: number | Percent;
    scale?: number;
    rotation?: number;
    pixelPerfect?: boolean;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    fillOpacity?: number;
    fill?: Color | LinearGradient | RadialGradient | Pattern;
    opacity?: number;
    stroke?: Color | LinearGradient | RadialGradient | Pattern;
    strokeOpacity?: number;
    strokeWidth?: number;
    strokeDasharray?: string;
    strokeDashoffset?: number;
    strokeLinecap?: "butt" | "square" | "round";
    strokeLinejoin?: "miter" | "round" | "bevel";
    shapeRendering?: ShapeRendering;
    draggable?: boolean;
    inert?: boolean;
    resizable?: boolean;
    swipeable?: boolean;
    trackable?: boolean;
    hoverable?: boolean;
    clickable?: boolean;
    togglable?: boolean;
    wheelable?: boolean;
    focusable?: boolean;
    tabindex?: number;
    contextMenuDisabled?: boolean;
    visible?: boolean;
    tooltipText?: string;
    tooltipHTML?: string;
    tooltipX?: number | Percent;
    tooltipY?: number | Percent;
    alwaysShowTooltip?: boolean;
    tooltipPosition?: "fixed" | "pointer";
    showTooltipOn?: "hover" | "hit" | "always";
    interactionsEnabled?: boolean;
    horizontalCenter?: HorizontalCenter;
    verticalCenter?: VerticalCenter;
    align?: Align;
    valign?: VerticalAlign;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
    dx?: number;
    dy?: number;
    role?: Roles;
    readerDescribedBy?: string;
    readerLabelledBy?: string;
    readerLive?: AriaLive;
    readerControls?: string;
    readerChecked?: boolean;
    readerHidden?: boolean;
    readerDescription?: string;
    readerTitle?: string;
    readerOrientation?: string;
    readerValueNow?: string;
    readerValueText?: string;
    nonScaling?: boolean;
    nonScalingStroke?: boolean;
    zIndex?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    fillModifier?: ColorModifier;
    strokeModifier?: ColorModifier;
    hoverOnFocus?: boolean;
    path?: string;
    urlTarget?: string;
    url?: string;
    hidden?: boolean;
    showOnInit?: boolean;
    id?: string;
    isActive?: boolean;
    isHover?: boolean;
    userClassName?: string;
}
/**
 * Defines animation options
 */
export interface ISpriteAnimationOptions {
    from?: Percent | Color | number | string;
    to: Percent | Color | number | string;
    property: any;
}
/**
 * Defines list ofvisual properties
 */
export declare const visualProperties: (keyof ISpriteProperties)[];
/**
 * Represents a list of available adapters for [[Sprite]]
 */
export interface ISpriteAdapters extends ISpriteProperties {
    pixelHeight: number;
    pixelWidth: number;
    relativeHeight: number;
    relativeWidth: number;
    measuredHeight: number;
    measuredWidth: number;
    outerHeight: number;
    outerWidth: number;
    innerHeight: number;
    innerWidth: number;
    globalScale: number;
    pixelMarginRight: number;
    relativeMarginRight: number;
    pixelMarginLeft: number;
    relativeMarginLeft: number;
    pixelMarginTop: number;
    relativeMarginTop: number;
    pixelMarginBottom: number;
    relativeMarginBottom: number;
    pixelX: number;
    relativeX: number;
    pixelY: number;
    relativeY: number;
    mask: Sprite;
    populateString: string;
    inertiaOptions: Dictionary<InertiaTypes, IInertiaOptions>;
    hitOptions: IHitOptions;
    hoverOptions: IHoverOptions;
    swipeOptions: ISwipeOptions;
    keyboardOptions: IKeyboardOptions;
    mouseOptions: IMouseOptions;
    cursorOptions: ICursorOptions;
    criticalError: Error;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Sprite represents any displayable element.
 *
 * This is the main class that encapsulates every object on the chart.
 *
 * If it's an element that is to be displayed on the screen at some point, its
 * class must extend [[Sprite]] class.
 *
 * [[Sprite]] class represents the a hierarchical structure. Every object that
 * extends [[Sprite]] can have children, that would inherit their properties,
 * such as language, formatters, etc.
 *
 * @see {@link SpriteState}
 * @see {@link ISpriteEvents} for a list of available events
 * @see {@link ISpriteAdapters} for a list of available Adapters
 *
 * @todo Review child elements that need to go into `_disposers`
 * @important
 */
export declare class Sprite extends BaseObjectEvents implements IAnimatable {
    /**
     * Defines property types.
     */
    _properties: ISpriteProperties;
    /**
     * Defines state type.
     *
     * @ignore Exclude from docs
     */
    /**
     * Defines type used in the Sprite.
     */
    _adapter: ISpriteAdapters;
    /**
     * Holds values for Sprite's properties.
     */
    properties: this["_properties"];
    /**
     * Defines available events.
     */
    _events: ISpriteEvents;
    /**
     * @ignore
     */
    _eventDispatcher: SpriteEventDispatcher<AMEvent<this, this["_events"]>>;
    /**
     * Event dispatcher.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/event-listeners/} for more info about Events
     */
    readonly events: SpriteEventDispatcher<AMEvent<this, this["_events"]>>;
    /**
     * @ignore
     */
    _adapterO: Adapter<this, this["_adapter"]>;
    /**
     * Holds Adapter.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/adapters/} for more info about Adapters
     */
    readonly adapter: Adapter<this, this["_adapter"]>;
    /**
     * @ignore Exclude from docs
     * @todo Description
     */
    private _bindings;
    /**
     * Holds indicator if this Sprite is a "template" to be used for creating
     * other Sprites from and should not be treated as full-fledged element.
     *
     * @ignore Exclude from docs
     */
    protected _isTemplate: boolean;
    protected _isPath: boolean;
    /**
     * Holds collection of Sprite States.
     */
    _states: $type.Optional<DictionaryTemplate<string, SpriteState<this["_properties"], this["_adapter"]>>>;
    /**
     * Holds indicator whether this sprite was already initialized.
     *
     * @ignore Exclude from docs
     */
    protected _inited: boolean;
    /**
     * Holds indicator whether this sprite was already initialized and ready.
     *
     * @ignore Exclude from docs
     */
    protected _ready: boolean;
    /**
     * A reference to a Tooltip for this Sprite.
     *
     * @ignore Exclude from docs
     */
    protected _tooltip: $type.Optional<Tooltip>;
    /**
     * A special data item which tooltip will use when formatting data. In case
     * it is not set, dataItem will be used.
     *
     * @ignore Exclude from docs
     */
    protected _tooltipDataItem: $type.Optional<DataItem>;
    /**
     * A reference to another sprite or sprite template from which tooltip should take colors if getFillFromObject or getStrokeFromObject are set to true.
     * Mostly used when we need to adjust tooltip color for a series, depending on column or bullet color.
     *
     * @ignore Exclude from docs
     */
    protected _tooltipColorSource: $type.Optional<Sprite>;
    /**
     * If `sprite.hide()` is called and we have "hidden" state and
     * `transitionDuration > 0`, we set `isHiding` flag to `true` in order to
     * avoid restarting animations in case `hide()` method is called multiple
     * times.
     */
    isHiding: boolean;
    /**
     * If `sprite.hide()` is called, we set isHidden to true when sprite is hidden.
     * This was added becaus hidden state might have visibility set to true and so
     * there would not be possible to find out if a sprite is technically hidden or not.
     */
    protected _isHidden: boolean;
    /**
     * This property indicates if Sprite is currently being revealed from hidden
     * state. This is used to prevent multiple calls to `sprite.show()` to
     * restart reveal animation. (if enabled)
     */
    isShowing: boolean;
    /**
     * Indicates if this element is a standalone instance. A "standalone
     * instance" means this is a autonomous object which maintains its own
     * set of controls like Preloader, Export, etc.
     *
     * @ignore Exclude from docs
     */
    isStandaloneInstance: boolean;
    /**
     * Indicates if togglable Sprite is currently active (toggled on).
     *
     * @ignore Exclude from docs
     */
    protected _isActive: boolean;
    /**
     * A Sprite element to use as a mask for this Sprite.
     *
     * @ignore Exclude from docs
     */
    protected _mask: MutableValueDisposer<Sprite>;
    /**
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _clipPath: Optional<Group>;
    /**
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _clipElement: $type.Optional<AMElement>;
    /**
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _positionPrecision: number;
    /**
     * Holds reference to Sprite's [[InteractionObject]]. Sprite does not
     * perform any user interactions directly, it happens via [[InteractionObject]].
     *
     * @ignore Exclude from docs
     */
    protected _interaction: $type.Optional<InteractionObject>;
    /**
     * An instance of [[Language]].
     *
     * @ignore Exclude from docs
     */
    protected _language: MutableValueDisposer<Language>;
    /**
     * An instance of [[NumberFormatter]].
     *
     * @ignore Exclude from docs
     */
    protected _numberFormatter: $type.Optional<NumberFormatter>;
    /**
     * An instance of [[DateFormatter]].
     *
     * @ignore Exclude from docs
     */
    protected _dateFormatter: $type.Optional<DateFormatter>;
    /**
     * An instance of [[DurationFormatter]].
     *
     * @ignore Exclude from docs
     */
    protected _durationFormatter: $type.Optional<DurationFormatter>;
    /**
     * An HTML element to which [[svgContainer]] is added.
     *
     * @ignore Exclude from docs
     */
    protected _htmlContainer: $type.Optional<HTMLElement>;
    /**
     * An HTML element to which all chart elements are added.
     *
     * @ignore Exclude from docs
     */
    protected _svgContainer: $type.Optional<SVGContainer>;
    /**
     * A [[Container]] instance to place this element's [[Tooltip]] elements in
     *
     * @ignore Exclude from docs
     */
    protected _tooltipContainer: $type.Optional<Container>;
    protected _urlDisposer: $type.Optional<IDisposer>;
    /**
     * Should this element be measured when measuring its parent container's
     * dimentions?
     *
     * @ignore Exclude from docs
     */
    protected _isMeasured: $type.Optional<boolean>;
    /**
     * Indicates if the chart should follow right-to-left rules.
     *
     * @ignore Exclude from docs
     */
    protected _rtl: boolean;
    /**
     * Holds [[Export]] object.
     *
     * @ignore Exclude from docs
     */
    protected _exporting: MutableValueDisposer<Export>;
    /**
     * Should this Sprite be included when exporting?
     */
    protected _exportable: boolean;
    /**
     * A reference to a top-level SVG node for this Sprite element.
     *
     * @ignore Exclude from docs
     */
    protected _element: Optional<AMElement>;
    /**
     * Holds Sprite's main SVG group (`<g>`) element. Other Sprite's elements
     * are all placed in this group.
     */
    group: Group;
    /**
     * A reference to [[Paper]] SVG renderer used to create SVG nodes.
     *
     * @ignore Exclude from docs
     */
    protected _paper: $type.Optional<Paper>;
    /**
     * Elements's top-level [[Container]].
     *
     *
     * @return Top-level ascendant
     */
    protected _topParent: Optional<Container>;
    /**
     * Data item assigned to the sprite. It might contain information defining
     * some style properties.
     */
    _dataItem: $type.Optional<DataItem>;
    /**
     * Parent container.
     *
     * @ignore Exclude from docs
     */
    protected _parent: Container;
    /**
     * Sprite's "virtual" parent.
     *
     * @ignore Exclude from docs
     */
    protected _virtualParent: Sprite;
    /**
     * Defines bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    protected _bbox: IRectangle;
    /**
     * Base tab index for the Sprite. Used for TAB-key selection order.
     *
     * Use accessors `tabIndex` to set and retrieve.
     *
     * @ignore Exclude from docs
     */
    protected _tabindex: $type.Optional<number>;
    /**
     * Should system tooltips be allowed to be displayed if the element has
     * `readerTitle` set?
     *
     * Use accessors `showSystemTooltip` to set and retrieve.
     *
     * This is an accessibility feature.
     *
     * @ignore Exclude from docs
     */
    protected _showSystemTooltip: $type.Optional<boolean>;
    /**
     * List of animations currently playing for this Sprite.
     *
     * @ignore Exclude from docs
     */
    protected _animations: $type.Optional<Array<Animation>>;
    /**
     * A link to [[Disposer]] for event handler which is attached to hide
     * animation. In some cases we need to cancel this event. This property is
     * used to hold the reference to disposer of this event so that we can
     * cancel it by calling its `dispose()` method.
     *
     * @ignore Exclude from docs
     */
    protected _showHideDisposer: $type.Optional<IDisposer>;
    /**
     * If element is currently hiding, this property will hold a reference to
     * [[Animation]] instance, which is handling hiding animation.
     *
     * @ignore Exclude from docs
     */
    protected _hideAnimation: $type.Optional<Animation>;
    /**
     * List of [[Filter]] items that are currently applied to the element.
     *
     * @ignore Exclude from docs
     */
    protected _filters: $type.Optional<List<Filter>>;
    /**
     * A shortcut to the special "Focus" filter which is applied when the element
     * gains focus.
     *
     * This is an accessibility feature.
     *
     * @ignore Exclude from docs
     */
    protected _focusFilter: $type.Optional<Filter>;
    /**
     * Indicates if this element is invalid and should be re-validated (redrawn).
     *
     * @ignore Exclude from docs
     */
    invalid: boolean;
    /**
     * Indicates if this elements position is invalid and should be repositioned
     *
     * @ignore Exclude from docs
     */
    positionInvalid: boolean;
    /**
     * A collection of key/value pairs that can be used to bind specific Sprite
     * properties to [[DataItem]].
     *
     * For example: `fill` property can be bound to `myCustomColor` field in
     * DataItem. The Sprite will automatically get the value for `fill` from its
     * DataItem.
     *
     * Can be set for each [[SpriteState]] individually to override default
     * bindings.
     *
     * @see {@link SpriteState}
     */
    propertyFields: {
        [index in keyof this["_properties"]]?: string;
    };
    /**
     * Element's relative width.
     *
     * Do not set this property directly. Use `width` accessor with [[Percent]]
     * value instead.
     *
     * @ignore Exclude from docs
     */
    percentWidth: $type.Optional<number>;
    /**
     * Element's relative height.
     *
     * Do not set this property directly. Use `height` accessor with [[Percent]]
     * value instead.
     *
     * @ignore Exclude from docs
     */
    percentHeight: $type.Optional<number>;
    /**
     * An SVG group element that is used to put all SVG filters to.
     *
     * @ignore Exclude from docs
     */
    filterElement: $type.Optional<Group>;
    /**
     * A field in data context of element's `dataItem` that holds config values
     * for this element.
     *
     * This is a very powerful feature, allowing changing virtually any setting,
     * including those for element's children, for the element via data.
     *
     * Example data:
     *
     * ```JSON
     * {
     *   "value": 100,
     *   "config": {
     *     "fill": "#F00"
     *   }
     * }
     * ```
     *
     * If you set element's `configField = "config"`, the element for this
     * specific data point will have a red fill.
     */
    configField: $type.Optional<string>;
    /**
     * Reference to element's `<title>` element.
     *
     * @ignore Exclude from docs
     */
    protected _titleElement: Optional<AMElement>;
    /**
     * Reference to element's `<description>` element.
     *
     * @ignore Exclude from docs
     */
    protected _descriptionElement: Optional<AMElement>;
    /**
     * Specifies if property changes on this object should be propagated to the
     * objects cloned from this object.
     *
     * This setting affects property changes *after* cloning, since at the moment
     * of cloning all of properties from source object are copied to the clone
     * anyway.
     *
     * @default false
     */
    applyOnClones: boolean;
    /**
     * a reference to an object which should be used when populating string. used for tooltip label mostly.
     * @ignore
     */
    populateStringFrom: any;
    /**
     * Internal storage properties.
     *
     * @ignore Exclude from docs
     */
    protected _measuredWidth: number;
    protected _measuredHeight: number;
    protected _measuredWidthSelf: number;
    protected _measuredHeightSelf: number;
    protected _prevMeasuredWidth: number;
    protected _prevMeasuredHeight: number;
    protected _pixelWidth: $type.Optional<number>;
    protected _pixelHeight: $type.Optional<number>;
    protected _relativeWidth: $type.Optional<number>;
    protected _relativeHeight: $type.Optional<number>;
    /**
     * @ignore
     */
    maxLeft: number;
    /**
     * @ignore
     */
    maxRight: number;
    /**
     * @ignore
     */
    maxTop: number;
    /**
     * @ignore
     */
    maxBottom: number;
    /**
     * @ignore
     */
    maxLeftSelf: number;
    /**
     * @ignore
     */
    maxRightSelf: number;
    /**
     * @ignore
     */
    maxTopSelf: number;
    /**
     * @ignore
     */
    maxBottomSelf: number;
    protected _isDragged: boolean;
    protected _isResized: boolean;
    /**
     * @deprecated Moved to [[SpriteProperties]]
     */
    protected _disabled: boolean;
    protected _internalDisabled: boolean;
    protected _updateDisabled: boolean;
    protected _maskRectangle: $type.Optional<IRectangle>;
    protected _internalDefaultsApplied: boolean;
    protected _interactionDisposer: $type.Optional<IDisposer>;
    /**
     * You can set bbox from outside if you know what size your element must be (used in radar chart for example)
     * @ignore
     */
    definedBBox: IRectangle;
    /**
     * Time in milliseconds after which rollout event happens when user rolls-out of the sprite. This helps to avoid flickering in some cases.
     */
    rollOutDelay: number;
    /**
     * @ignore
     */
    protected _outTimeout: $type.Optional<IDisposer>;
    /**
     * This flag is set to `true` for the initial sprite you create and place
     * to the div so that we could clear all additional
     * sprites/containers when this sprite is disposed.
     *
     * @ignore
     */
    isBaseSprite: boolean;
    /**
     * Indicates whether this sprite should be cloned when cloning its parent
     * container. We set this to `false` in those cases when a sprite is created
     * by the class, so that when cloning a duplicate sprite would not appear.
     */
    shouldClone: boolean;
    /**
     * A property which you can use to store any data you want.
     */
    dummyData: any;
    /**
     * A reference to a real fill object. Sometimes might be useful to modify
     * gradient (when fill is color but we have FillModifier).
     */
    realFill: Color | Pattern | LinearGradient | RadialGradient;
    /**
     * A reference to a real stroke object. Sometimes might be useful to modify
     * gradient (when fill is color but we have a FillModifier).
     */
    realStroke: Color | Pattern | LinearGradient | RadialGradient;
    /**
     * A reference to amCharts logo element.
     *
     * @ignore
     */
    logo: AmChartsLogo;
    /**
     * [_baseId description]
     *
     * @todo Description
     */
    protected _baseId: string;
    /**
     * A read-only flag which indicates if a sprite has completed its initial
     * animation (if `showOnInit = true`).
     *
     * In case `showOnInit = false`, `appeared` is set to `true` on init.
     *
     * @readonly
     */
    appeared: boolean;
    /**
     * [ex description]
     *
     * @todo Description
     * @ignore
     */
    ex: number;
    /**
     * [ey description]
     *
     * @todo Description
     * @ignore
     */
    ey: number;
    /**
     * [_showOnInitDisposer description]
     *
     * @todo Description
     */
    protected _showOnInitDisposer: MultiDisposer;
    /**
     * Holds the list of plugins attached to this Sprite.
     */
    protected _plugins: $type.Optional<List<IPlugin>>;
    /**
     * Indicates if the sprite can be moved around when resizing it with two fingers (will only work if draggable = false)
     * @ignore
     */
    dragWhileResize: boolean;
    /**
     * @ignore
     */
    vpDisposer: MultiDisposer;
    protected _alwaysShowDisposers: IDisposer[];
    /**
     *  @ignore
     */
    measureFailed: boolean;
    /**
     * If this flag is set to true, calling show() will not reveal the sprite.
     *
     * @ignore
     */
    preventShow: boolean;
    /**
     * When cloning a sprite, if the template has it's own tooltip assigned, this tooltip is also cloned by default.
     * This is not good for cpu and sometimes you might only need one single tooltip for all clones. Set this to false in order not to clone tooltip.
     */
    cloneTooltip: boolean;
    /**
     * Constructor:
     * * Creates initial node
     * * Sets default properties
     * * Creates required default states
     * * Inits accessibility
     */
    constructor();
    /**
     * ==========================================================================
     * ELEMENT VALIDATION, INIT, AND DRAWING STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Applies properties from all assigned themes.
     *
     * We do this here so that we can apply class names as well.
     *
     * @ignore Exclude from docs
     */
    applyTheme(): void;
    /**
     * Returns theme(s) used by this object either set explicitly on this
     * element, inherited from parent, or inherited from [[System]].
     *
     * @return An array of theme references
     */
    getCurrentThemes(): ITheme[];
    /**
     * Called just before element's validation, this function allows setting
     * defaults.
     *
     * @ignore Exclude from docs
     */
    protected applyInternalDefaults(): void;
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
     * Validates element:
     * * Triggers events
     * * Redraws the element
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Invalidates element's position.
     *
     * @ignore Exclude from docs
     */
    invalidatePosition(): void;
    /**
     * Transforms the element.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    validatePosition(): void;
    /**
     * A placeholder method that is called **before** element begins to be drawn.
     *
     * @ignore Exclude from docs
     */
    protected beforeDraw(): void;
    /**
     * A placeholder method that draws the element.
     *
     * @ignore Exclude from docs
     */
    protected draw(): void;
    /**
     * A placeholder method that is called **after** element finishes drawing
     * itself.
     *
     * @ignore Exclude from docs
     */
    protected afterDraw(): void;
    /**
     * Dispatches `"ready"` event. Sprite dispatches it right after `"inited"` event.
     *
     * @ignore
     */
    dispatchReady(): void;
    /**
     * Triggers a re-initialization of this element.
     *
     * Will result in complete redrawing of the element.
     *
     * @ignore Exclude from docs
     */
    reinit(): void;
    /**
     * Handles the situation where parent element is resized.
     *
     * @ignore Exclude from docs
     */
    handleGlobalScale(): void;
    /**
     * Updates filter properties which might depend on scale
     *
     * @ignore Exclude from docs
     */
    protected updateFilterScale(): void;
    /**
     * Removes itself from system's invalid lists.
     *
     * @ignore Exclude from docs
     */
    protected removeFromInvalids(): void;
    /**
     * Copies all parameters from another [[Sprite]].
     *
     * @param source Source Sprite
     */
    copyFrom(source: this): void;
    /**
     * Destroys this object and all related data.
     */
    dispose(): void;
    /**
     * Indicates if this element is a "template".
     *
     * Template Sprites act only as a holders for config for other "real"
     * elements to be cloned from.
     *
     * Templates are treated differently, as they are not validated, redrawn, or
     * otherwise are processed.
     *
     * @ignore Exclude from docs
     * @param value Is template?
     */
    /**
    * @ignore Exclude from docs
    * @return Is template?
    */
    isTemplate: boolean;
    /**
     * Indicates whether the element should attempt to construct itself in a way
     * so that system tooltip is shown if its `readerTitle` is set.
     *
     * @param value Show system tooltip?
     */
    /**
    * @return Show system tooltip?
    */
    showSystemTooltip: boolean;
    /**
     * ==========================================================================
     * HIERARCHY AND STRUCTURE RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Sprites's top-level [[Container]].
     *
     * Please note that in most cases it won't be the chart element.
     *
     * To access base chart element, use `baseSprite` instead.
     *
     * @return Top-level ascendant
     */
    /**
    * @ignore
    * @param value {Container} top parent of a sprite
    */
    topParent: Optional<Container>;
    /**
     * Elements' parent [[Container]].
     *
     * @param parent  Parent container
     */
    /**
    * @return Parent container
    */
    parent: Optional<Container>;
    /**
     * @ignore
     */
    protected handleAlwaysShow(): void;
    /**
     * @ignore
     */
    protected handleAlwaysShowTooltip(): void;
    /**
     * Element's "virtual" parent.
     *
     * This is required in ordere to maintain proper inheritance (like
     * formatters).
     *
     * Sometimes an element is a "logical" parent, even though it's not a direct
     * ascendant.
     *
     * Example: a bullet is not a child of the axis, but it would make sense
     * for it to inherit series' formatters.
     *
     * @ignore Exclude from docs
     * @param value  Virtual parent
     */
    /**
    * @return Virtual parent
    */
    virtualParent: Sprite;
    /**
     * Moves `<defs>` to correct place in DOM.
     *
     * Some elements are initially created in "ghost" container. When moving
     * those into proper place in DOM, their respective `<defs>` need to be moved
     * as well.
     *
     * @ignore Exclude from docs
     */
    appendDefs(): void;
    /**
     * Returns a [[Dictionary]] which maps object ids with their respective
     * objects.
     *
     * Can be used to retrieve any object by id, e.g.:
     *
     * ```TypeScript
     * console.log(mySprite.map.getKey("myid"));
     * ```
     * ```JavaScript
     * console.log(mySprite.map.getKey("myid"));
     * ```
     *
     * @return Map collection
     */
    readonly map: Dictionary<string, any>;
    /**
     * @ignore
     * @return Map collection
     */
    readonly delayedMap: Dictionary<string, any>;
    /**
     * Element's user-defined ID.
     *
     * Will throw an Error if there already is an object with the same ID.
     *
     * Please note that above check will be performed withing the scope of the
     * current chart instance. It will not do checks across other chart instances
     * or in globally in DOM.
     *
     * Make sure the IDs are unique.
     *
     * @param value ID
     */
    /**
    * @return ID
    */
    id: string;
    /**
     * ==========================================================================
     * ELEMENT AND DOM TREE MANIPULATION AND MEASURING
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns DOM element reference associated with this element.
     *
     * @readonly
     * @return DOM element
     */
    readonly dom: SVGSVGElement;
    /**
     * A [[Paper]] instance to place elements on.
     *
     * If there's no Paper set for this element, it goes up the ascendant tree
     * until it finds one.
     *
     * This method is used by important `addChild()` method, so it's essential
     * to have a [[Paper]] instance.
     *
     * If this element has a separate `htmlContainer` set, it will have a
     * [[Paper]] instance itself.
     *
     * @ignore Exclude from docs
     * @param paper  Paper
     */
    /**
    * @ignore Exclude from docs
    * @return Paper
    */
    paper: Paper;
    /**
     * Sets [[Paper]] instance to use to draw elements.
     * @ignore
     * @param paper Paper
     * @return true if paper was changed, false, if it's the same
     */
    setPaper(paper: Paper): boolean;
    /**
     * An HTML element to be used when placing wrapper element (`<div>`)
     * for the whole chart.
     *
     * This is the same for **all** elements within the same chart.
     *
     * @param htmlContainer HTML element
     */
    /**
    * @return HTML element
    */
    htmlContainer: $type.Optional<HTMLElement>;
    /**
     * Creates (if not yet created) and returns element's `<title>` element.
     *
     * @ignore Exclude from docs
     * @return Title element
     */
    readonly titleElement: AMElement;
    /**
     * Creates (if not yet created) and returns element's `<desc>` element.
     *
     * @ignore Exclude from docs
     * @return Desc element
     */
    readonly descriptionElement: AMElement;
    /**
     * Returns list of SVG filters (effects) applied to element. If the filter
     * list is not yet initilized, creates and returns an empty one.
     * Note, not all filters combine well with one another. We recommend using one filter per sprite.
     *
     * @return List of filters
     */
    readonly filters: List<Filter>;
    /**
     * Sets required SVG attributes. Must be called every time an element is
     * redrawn so that attributes are (re)applied.
     *
     * @ignore Exclude from docs
     */
    protected setSVGAttributes(): void;
    /**
     * Sets an attribute directly on an SVG element.
     *
     * @ignore Exclude from docs
     * @param attribute Attribute object
     */
    protected setSVGAttribute(attribute: ISVGAttribute): void;
    /**
     * Removes an attribute directly from SVG element.
     *
     * @param attribute Attribute key to remove
     */
    protected removeSVGAttribute(attribute: string): void;
    /**
     * Sets `class` attribute of the elements SVG node.
     *
     * Uses `am4core.options.classNamePrefix`.
     *
     * @ignore Exclude from docs
     */
    setClassName(): void;
    /**
     * Adds an `id` attribute the the element and returns the id.
     *
     * @ignore Exclude from docs
     * @return Element's ID
     */
    uidAttr(): string;
    /**
     * [updateClipPath description]
     *
     * @todo Description
     */
    protected updateClipPath(): void;
    /**
     * @ignore
     */
    protected createClipPath(): void;
    /**
     * Applies the mask Sprite.
     *
     * @ignore Exclude from docs
     */
    protected applyMask(): void;
    /**
     * Applies filters to the element.
     *
     * @ignore Exclude from docs
     */
    protected applyFilters(): void;
    /**
     * [removeClipPath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected removeClipPath(): void;
    /**
     * [setElement description]
     *
     * @ignore
     * @todo Description
     * @param element [description]
     */
    setElement(element: AMElement): void;
    /**
     * The main element for this Sprite, usually an SVG `<g>`.
     *
     * All other sub-elements are created in it.
     *
     * @param element  Element
     */
    /**
    * @return Element
    */
    element: Optional<AMElement>;
    /**
     * HTML container (`<div>`) which is used to place chart's `<svg>` element
     * in.
     *
     * @return Container for chart elements
     */
    /**
    * Sets HTML container to add SVG and other chart elements to.
    *
    * @param svgContainer Container for chart elements
    */
    svgContainer: $type.Optional<SVGContainer>;
    /**
     * Measures main element.
     *
     * Saves measurements into private `_bbox` property.
     *
     * @ignore Exclude from docs
     */
    protected measureElement(): void;
    /**
     * Positions element according its center settings.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    updateCenter(): void;
    /**
     * Measures the whole element.
     *
     * Returns `true` if the size has changed from the last measurement.
     *
     * @ignore Exclude from docs
     * @return Did the size changed from the last measurement?
     */
    measure(): boolean;
    /**
     * Insert this element before sibling element.
     *
     * @param sprite  Target element
     * @return This element
     */
    insertBefore(sprite: Sprite): Sprite;
    /**
     * Insert this element after sibling element.
     *
     * @param sprite  Target element
     * @return This element
     */
    insertAfter(sprite: Sprite): Sprite;
    /**
     * Removes the main SVG element.
     *
     * This does not destroy the whole Sprite element. To do that use
     * `dispose()` instead.
     *
     * @ignore Exclude from docs
     */
    protected removeElement(): void;
    /**
     * Returns relative (percent) value of the X coordindate within this element.
     *
     * A relative value is a hundredth of a percent. So 100% would result in a 1
     * as relative value.
     *
     * @param value  Absolute or relative X coordinate
     * @return Relative value
     */
    getRelativeX(value: number | Percent): number;
    /**
     * Returns relative (percent) value of the Y coordindate within this element.
     *
     * A relative value is a hundredth of a percent. So 100% would result in a 1
     * as relative value.
     *
     * @param value  Absolute or relative Y coordinate
     * @return Relative value
     */
    getRelativeY(value: number | Percent): number;
    /**
     * Returns an X coordinate in pixel within the element.
     *
     * If number is passed in as parameter, the same number will be returned
     * back.
     *
     * If [[Percent]] is passed in, it will be recalculated to pixels.
     *
     * @param value  Absolute or relative X coordinate
     * @return X coordinate in pixels
     */
    getPixelX(value: number | Percent): number;
    /**
     * Returns an Y coordinate in pixel within the element.
     *
     * If number is passed in as parameter, the same number will be returned
     * back.
     *
     * If [[Percent]] is passed in, it will be recalculated to pixels.
     *
     * @param value  Absolute or relative Y coordinate
     * @return Y coordinate in pixels
     */
    getPixelY(value: number | Percent): number;
    /**
     * Moves the element to a specified coordinates.
     *
     * Using this method is preferred method of moving element, as it saves some
     * CPU processing power over setting `x` and `y` properties separately.
     *
     * The method respects element's center settings. The element will be
     * positioned so that `point` coordinates come in whatever "center" of the
     * element is, as set in `horizontalCenter` and `verticalCenter`.
     *
     * Besides moving the element, you can also at the same time scale and
     * rotate the element.
     *
     * @param point     New coordinates
     * @param rotation  New rotation
     * @param scale     New Scale
     */
    moveTo(point: IPoint, rotation?: number, scale?: number, isDragged?: boolean): void;
    /**
     * Sets another [[Sprite]] element as this elements mask.
     *
     * @ignore Exclude from docs
     * @param mask A [[Sprite]] to use as mask
     */
    /**
    * Returns [[Sprite]] element currently used as mask for this element.
    *
    * @ignore Exclude from docs
    * @return A [[Sprite]] to use as mask
    */
    mask: Optional<Sprite>;
    /**
     * Instead of creating a [[Sprite]] for mask, you can just use a
     * [[Rectangle]] by setting this accessor.
     *
     * Please note that the element will not monitor any changes to the mask
     * rectangle.
     *
     * @ignore Exclude from docs
     * @param rect Mask Rectangle
     */
    /**
    * @ignore Exclude from docs
    * @return Mask Rectangle
    */
    maskRectangle: IRectangle;
    /**
     * Indicates if this element was already measured.
     *
     * @ignore Exclude from docs
     * @param value Was element already measured?
     */
    /**
    * @ignore Exclude from docs
    * @return Was element already measured?
    */
    isMeasured: boolean;
    /**
     * Checks if the this element has any of its parts overlapping with another
     * element.
     *
     * @todo Description (review)
     * @param sprite  Second element to test again
     * @return Overlapping?
     */
    hitTest(sprite: Sprite): boolean;
    /**
     * ==========================================================================
     * STATE-RELATED
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns `true` if Sprite has already finished initializing.
     *
     * @return Initialized?
     */
    readonly inited: boolean;
    /**
     * Returns `true` if Sprite has already finished initializing and is ready.
     *
     * If this object is a [[Container]] it will wait for all of its children
     * are ready before becoming ready itself and firing a `"ready"` event.
     *
     * @return is ready?
     */
    isReady(): boolean;
    /**
     * Returns a collection of element's available [[SpriteState]] entries.
     *
     * @see {@link SpriteState}
     * @return States
     */
    readonly states: DictionaryTemplate<string, SpriteState<this["_properties"], this["_adapter"]>>;
    /**
     * Returns a [[SpriteState]] object for "hidden" state.
     *
     * This is a shortcut to `this.states.getKey("hidden")`.
     *
     * @return Hidden state
     */
    readonly hiddenState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * Returns a [[SpriteState]] object for "default" state.
     *
     * This is a shortcut to `this.states.getKey("default")`.
     *
     * @return Hidden state
     */
    readonly defaultState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * Checks if some key states are defined and updates Sprite properties
     * accordingly.
     *
     * For example if there's a state "down" defined for Sprite, we automatically
     * make it "clickable".
     *
     * @ignore Exclude from docs
     * @param event An event which caused state list update
     */
    protected processState(event: IDictionaryEvents<string, SpriteState<this["_properties"], this["_adapter"]>>["insertKey" | "setKey"]): void;
    /**
     * Returns a list elements's animations currently being played.
     *
     * If the list has not been initialized it is created.
     *
     * @return List of animations
     */
    readonly animations: Array<Animation>;
    /**
     * Converts element's local coordinates to the coordinates within the main
     * chart container.
     *
     * @param point  Local point
     * @return Global point
     */
    getSvgPoint(point: IPoint): IPoint;
    /**
     * Creates and starts an [[Animation]] with given `animationOptions`.
     *
     * @see {@link Animation} for additional information about available options
     * @param animationOptions  Animation options
     * @param duration          Duration in milliseconds
     * @param easing            Easing function
     * @return Animation instance
     */
    animate(animationOptions: ISpriteAnimationOptions[] | ISpriteAnimationOptions, duration: number, easing?: (value: number) => number): Animation;
    /**
     * Applies a [[SpriteState]] on this element.
     *
     * The first parameter can either be a name state or a [[SpriteState]]
     * instance.
     *
     * When run, this method will apply SVG properties defined in a
     * [[SpriteState]], but only those that are relevant to this particular
     * element, i.e. are in the `properties` array.
     *
     * @see {@link SpriteState}
     * @param value               A state - name key or instance
     * @param transitionDuration  Duration of the transition between current and new state
     * @param easing              An easing function
     */
    setState(value: string | SpriteState<this["_properties"], this["_adapter"]>, transitionDuration?: number, easing?: (value: number) => number): $type.Optional<Animation>;
    /**
     * Applies proper state based on the condition of the element. A condition is
     * deducted in this order:
     * * "hover" if Sprite has currently any pointers over it
     * * "down" if Sprite has any pointers (touch or mouse) currently pressed over it
     * * "focus" if Sprite has currently got focus (accessibility)
     * * "hidden" if Sprite is currently hidden
     *
     * Returns an [[Animation]] object, which is handling gradual transition from
     * current values of properties, to the new target state(s).
     *
     * @param duration  Duration for the animation (ms)
     * @return [[Animation]] object which is handling the transition
     */
    applyCurrentState(duration?: number): $type.Optional<Animation>;
    /**
     * Starts an [[Animation]] of the properties to specific values as they are
     * set in `state`.
     *
     * @ignore Exclude from docs
     * @param state     Target State
     * @param duration  Duration in milliseconds
     * @param easing    Easing function
     * @return Transition Animation
     */
    protected transitTo(state: SpriteState<this["_properties"], this["_adapter"]>, duration: number, easing?: (value: number) => number): Optional<Animation>;
    /**
     * Returns `true` if Sprite is currently transiting from one state/value to
     * another.
     *
     * @return Is in transition?
     */
    isInTransition(): boolean;
    /**
     * Indicates if this element has a mouse pointer currently hovering
     * over it, or if it has any touch pointers pressed on it.
     *
     * You can force element to be "hovered" manually, by setting this property
     * to `true`.
     *
     * @param value Is hovered?
     */
    /**
    * @return Is hovered?
    */
    isHover: boolean;
    /**
     * Returns indicator if this element is being dragged at the moment.
     *
     * @return Is dragged?
     */
    readonly isDragged: boolean;
    /**
     * Returns indicator if this element is being resized at the moment.
     *
     * @return Is resized?
     */
    readonly isResized: boolean;
    /**
     * Indicates if this element has any pointers (mouse or touch) pressing down
     * on it.
     *
     * @param value Is down?
     */
    /**
    * @return Is down?
    */
    isDown: boolean;
    /**
     * Indicates if this element is focused (possibly by tab navigation).
     *
     * @param value Is focused?
     */
    /**
    * @return Is focused?
    */
    isFocused: boolean;
    /**
     * Indicates if this element is currently active (toggled on) or not
     * (toggled off).
     *
     * @param value Is active?
     */
    /**
    * @return Is active?
    */
    isActive: boolean;
    protected setActive(value: boolean): void;
    /**
     * Controls if element is disabled.
     *
     * A disabled element is hidden, and is removed from any processing, layout
     * calculations, and generally treated as if it does not exist.
     *
     * The element itself is not destroyed, though. Setting this back to `false`,
     * will "resurrect" the element.
     *
     * @param value  Disabled?
     */
    /**
    * @return Disabled?
    */
    disabled: boolean;
    protected setDisabled(value: boolean): boolean;
    /**
     * Internal disable method.
     *
     * Do not use it for disabling elements. Use `disabled` accessor instead.
     *
     * @ignore Exclude from docs
     * @param value Disabled?
     */
    /**
    * @ignore
    * @return Disabled?
    */
    __disabled: boolean;
    /**
     * ==========================================================================
     * FORMATTERS AND OTHER EXTERNAL HELPERS
     * ==========================================================================
     * @hidden
     */
    /**
     * A [[NumberFormatter]] instance.
     *
     * This is used to format numbers.
     *
     * ```TypeScript
     * chart.numberFormatter.numberFormat = "#,###.#####";
     * ```
     * ```JavaScript
     * chart.numberFormatter.numberFormat = "#,###.#####";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "numberFormatter": {
     *     "numberFormat": "#,###.#####"
     *   }
     * }
     * ```
     *
     * You can set a separate instance of formatter for each
     * individual element. However that would be unnecessary overhead as
     * all elements would automatically inherit formatter from their parents,
     * all the way up to the chart itself.
     *
     *
     * @see {@link NumberFormatter} for more info on formatting numbers
     * @param value  An instance of NumberFormatter
     */
    /**
    * @return A [[NumberFormatter]] instance to be used
    */
    numberFormatter: NumberFormatter;
    /**
     * A [[DateFormatter]] instance.
     *
     * This is used to format dates, e.g. on a date axes, balloons, etc.
     *
     * ```TypeScript
     * chart.dateFormatter.dateFormat = "yyyy-MM-dd";
     * ```
     * ```JavaScript
     * chart.dateFormatter.dateFormat = "yyyy-MM-dd";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "dateFormatter": {
     *     "dateFormat": "yyyy-MM-dd"
     *   }
     * }
     * ```
     *
     * You can set a separate instance of formatter for each
     * individual element. However that would be unnecessary overhead as
     * all elements would automatically inherit formatter from their parents,
     * all the way up to the chart itself.
     *
     * @see {@link DateFormatter} for more info on dates formatting
     * @param value  An instance of DateFormatter
     */
    /**
    * @return An instance of DateFormatter
    */
    dateFormatter: DateFormatter;
    /**
     * A [[DurationFormatter]] instance.
     *
     * This is used to format numbers as durations, e.g. on a value axes.
     *
     * You can set a separate instance of formatter for each
     * individual element. However that would be unnecessary overhead as
     * all elements would automatically inherit formatter from their parents,
     * all the way up to the chart itself.
     *
     * @see {@link DurationFormatter} for more info on durations
     * @param value  An instance of DurationFormatter
     */
    /**
    * @return An instance of DurationFormatter
    */
    durationFormatter: DurationFormatter;
    /**
     * A [[Language]] instance to use for translations.
     *
     * Normally it is enough to set language for the top-most element - chart.
     *
     * All other element child elements will automatically re-use that language
     * object.
     *
     * @param value  An instance of Language
     */
    /**
    * @return An instance of Language
    */
    language: Language;
    /**
     * ==========================================================================
     * DATA-RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Parses the string for meta tags `{tag}` and replaces them with a real
     * value. Supports straight up tags referring to the field in data, i.e.
     * `{value}` or tags with additional formatting info. E.g.:
     *
     * ```Text
     * {myfield.formatDate("yyyy-MM-dd")}
     * {myfield.formatDate()}
     * {myfield.formatNumber("#,####.00")}
     * {myfield.formatNumber()}
     * {myField.formatDuration("mm:ss")}
     * ```
     *
     * Etc.
     *
     * This method Will automatically detect and use proper formatter for the
     * value.
     *
     * The source value will be looked up in various places: (in order)
     * * Sprite's own `dataItem`
     * * Sprite's properties
     * * Parent's `dataItem`
     * * Parent's properties
     *
     * @ignore Exclude from docs
     * @param string            A string to format
     * @param dataItem          DataItem
     * @return Formatted string
     */
    populateString(string: string, dataItem?: DataItem): string;
    /**
     * Gets the value from data item and formats it according to specified format.
     *
     * If `format` is specified, it will use its contents to choose formatter for
     * the value. Otherwise it will select formatter accordingly to actual value
     * type.
     *
     * @ignore Exclude from docs
     * @todo Ability to force certain formatter on known numeric and date values
     * @see {@link NumberFormatter}
     * @see {@link DateFormatter}
     * @see {@link DurationFormatter}
     * @param tagName           Tag name to replace
     * @param format            Format to use
     * @param dataItem          DataItem
     * @return Formatted value
     */
    getTagValue(tagName: string, format?: string, dataItem?: DataItem): string;
    /**
     * Tries to retrieve values from properties of any object, then applies
     * proper formatting to it.
     *
     * @ignore Exclude from docs
     * @todo Description (improve)
     * @param parts   Properties ant methods to access
     * @param object  Source object
     * @param format  A specific format to apply
     * @return Formatted value
     */
    getTagValueFromObject(parts: any[], object: any, format?: string): any;
    /**
     * A [[DataItem]] to use as element's data source.
     *
     * @todo Review type
     * @param dataItem  DataItem
     */
    /**
    * @return [[DataItem]]
    */
    dataItem: this["_dataItem"];
    /**
     * Sets currently used [[DataItem]].
     *
     * If the element has also `configField` set, it will also look for any
     * config in DataItem's data context to apply to this element.
     *
     * @param dataItem DataItem
     */
    protected setDataItem(dataItem: DataItem): void;
    /**
     * ==========================================================================
     * PROPERTY UTILITIES
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns element's property value.
     *
     * Will check if there are any bindings with [[DataItem]].
     *
     * Will also apply any adapters bound to `propertyName`.
     *
     * @param propertyName  Property name
     * @return Property value
     */
    getPropertyValue<Key extends keyof this["_properties"]>(propertyName: Key): this["_properties"][Key];
    protected setColorProperty<Key extends keyof this["properties"]>(property: Key, value: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>, invalidate?: boolean): boolean;
    protected setPercentProperty<Key extends keyof this["properties"]>(property: Key, value: Percent | number, invalidate?: boolean, transform?: boolean, precision?: number, floor?: boolean): boolean;
    /**
     * Sets elements's property value. Will also propagate the same property value
     * on all element's clones.
     *
     * @param property    Property
     * @param value       Value
     * @param invalidate  Should the sprite be invalidated, cause it's re-rendering
     * @param transform   Re-apply positioning of the element
     * @return Did the value change? It will return `true` if the new value and the old value of the property are not the same
     * @todo Review propagation to clones. Right now we simply check if clone is disposed before setting the same property on it. It's better to remove from clone list altogether.
     */
    setPropertyValue<Key extends keyof this["properties"]>(property: Key, value: any, invalidate?: boolean, transform?: boolean): boolean;
    /**
     * @ignore Exclude from docs
     * @todo Verify this
     */
    bind<S extends {
        cloneId: string;
        events: EventDispatcher<{
            propertychanged: {
                property: string;
            };
        }>;
    }, From extends (keyof S & keyof this), To extends keyof this>(property: To, source: S, bindToProperty: From, modifier?: (value: this[From]) => this[To]): void;
    bind<S extends {
        cloneId: string;
        events: EventDispatcher<{
            propertychanged: {
                property: string;
            };
        }>;
    }, Key extends (keyof S & keyof this)>(property: Key, source: S, modifier?: (value: this[Key]) => this[Key]): void;
    /**
     * Sets up and obeserver function to monitor changes in particular property
     * or properties.
     *
     * @ignore Exclude from docs
     * @param property  Element's property name
     * @param listener  Handler function
     * @param context   Context for handler function
     * @returns Event Disposer
     */
    observe<C>(property: string | string[], listener: (this: C, event: AMEvent<this, ISpriteEvents>["propertychanged"]) => void, context?: C, shouldClone?: boolean): IDisposer;
    /**
     * ==========================================================================
     * ACCESSIBILITY-RELATED PROPERTIES
     * ==========================================================================
     * @hidden
     */
    /**
     * Applies accessibility to the SVG element.
     *
     * Adds `<title>` and `<description>` elements as well as `aria-labelledby`
     * and `role` properties.
     *
     * @ignore Exclude from docs
     */
    protected applyAccessibility(): void;
    /**
     * Screen reader title of the element.
     *
     * @param value Title
     */
    /**
    * @return Title
    */
    readerTitle: string;
    /**
     * Screen reader description of the element.
     *
     * @param value Description
     */
    /**
    * @return Description
    */
    readerDescription: string;
    /**
     * A WAI-ARIA role for the element.
     *
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#role_definitions} for more information on WAI-ARIA roles
     * @param value  Role
     */
    /**
    * @return Role
    */
    role: Roles;
    /**
     * Controls if element should be hidden from screen readers.
     *
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-hidden} for more information
     * @param value  Hidden?
     */
    /**
    * @return Hidden?
    */
    readerHidden: boolean;
    /**
     * Controls if element is currently marked as "checked".
     *
     * @ignore Exclude from docs
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-checked} for more information
     * @param value Checked?
     */
    /**
    * @ignore Exclude from docs
    * @return Checked?
    */
    readerChecked: boolean;
    /**
     * A `uid` of an element this element controls.
     *
     * @ignore Exclude from docs
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-controls} for more information
     * @param value Setting value
     */
    /**
    * @ignore Exclude from docs
    * @return Setting value
    */
    readerControls: string;
    /**
     * Controls accessibility setting "aria-live" for the element.
     *
     * @ignore Exclude from docs
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions} for more information
     * @param value Setting value
     */
    /**
    * @ignore Exclude from docs
    * @return Setting value
    */
    readerLive: AriaLive;
    /**
     * A `uid` of an element that describes this element.
     *
     * @ignore Exclude from docs
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby} for more information
     * @param value Target element
     */
    /**
    * @ignore Exclude from docs
    * @return Target element
    */
    readerLabelledBy: string;
    /**
     * A `uid` of an element that describes this element.
     *
     * @ignore Exclude from docs
     * @see {@link https://www.w3.org/TR/wai-aria-1.1/#aria-describedby} for more information
     * @param value Target element
     */
    /**
    * @ignore Exclude from docs
    * @return Target element
    */
    readerDescribedBy: string;
    /**
     * Orientation of the element.
     *
     * @since 4.7.16
     * @param value Orientation
     */
    /**
    * @return Orientation
    */
    readerOrientation: string;
    /**
     * Current value of the element.
     *
     * @since 4.7.16
     * @param value Current value
     */
    /**
    * @return Current value
    */
    readerValueNow: string;
    /**
     * Text representation of the current value of the element.
     *
     * @since 4.7.16
     * @param value Current value (text)
     */
    /**
    * @return Current value (text)
    */
    readerValueText: string;
    /**
     * ==========================================================================
     * USER INTERACTIONS
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns elements keyboard options.
     *
     * @return Keyboard options
     */
    readonly keyboardOptions: IKeyboardOptions;
    /**
     * Mouse options.
     *
     * Enables controlling options related to the mouse, for example sensitivity
     * of its mouse wheel.
     *
     * E.g. the below will reduce chart's wheel-zoom speed to half its default
     * speed:
     *
     * ```TypeScript
     * chart.plotContainer.mouseOptions.sensitivity = 0.5;
     * ```
     * ```JavaScript
     * chart.plotContainer.mouseOptions.sensitivity = 0.5;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "plotContainer": {
     *     "mouseOptions": {
     *       "sensitivity": 0.5
     *     }
     *   }
     * }
     * ```
     *
     * @return Mouse options
     */
    readonly mouseOptions: IMouseOptions;
    /**
     * Returns (creates if necessary) an [[InteractionObject]] associated with
     * this element.
     *
     * [[InteractionObject]] is used to attach all kinds of user-interactions to
     * the element, e.g. click/touch, dragging, hovering, and similar events.
     *
     * @return Interaction object
     */
    readonly interactions: InteractionObject;
    /**
     * Returns true if interactions object was created. Mostly used just to avoid creating interactions object if not needed.
     * @return Is Sprite interactive?
     */
    isInteractive(): boolean;
    /**
     * ==========================================================================
     * ELEMENT FOCUS-RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Controls if the element can gain focus.
     *
     * Focusable element will be selectable via TAB key.
     *
     * Please note, clicking it with a mouse or touching will not add focus to
     * it.
     *
     * Focused element will show a system-specific highlight, which might ruin
     * the overal look. This is why we don't focus element on click/touch.
     *
     * A default setting varies for different elements. By default all elements
     * are not focusable, except certain items like buttons, legend items, etc.
     *
     * @default undefined (auto)
     * @param value  Can element be focused?
     */
    /**
    * @return Can element be focused?
    */
    focusable: Optional<boolean>;
    /**
     * Applies filters (if set) when element gains focus.
     *
     * @ignore Exclude from docs
     * @param ev Original event
     */
    handleFocus(ev?: AMEvent<Sprite, ISpriteEvents>["focus"]): void;
    /**
     * Removes focus filter (if set) when elementloses focus.
     *
     * @ignore Exclude from docs
     * @param ev Original event
     */
    handleBlur(ev?: AMEvent<Sprite, ISpriteEvents>["blur"]): void;
    /**
     * A reference to a [[Filter]] to apply to element when it gains focus.
     *
     * Normally, browsers will draw a default ugly square around focused element,
     * which totally makes sense because its purpose is to help identify active
     * element for visually impaired people.
     *
     * However, if you would rather apply a filter, so you can modify how focused
     * element looks like, use `focusFilter`.
     *
     * Simply set it to an anstance of [[FocusFilter]], or any other filter
     * object.
     *
     * ```TypeScript
     * chart.focusFilter = new am4core.FocusFilter();
     * ```
     * ```JavaScript
     * chart.focusFilter = new am4core.FocusFilter();
     * ```
     * ```JSON
     * {
     *   // ...
     *   "focusFilter": {
     *     "type": "FocusFilter"
     *   },
     *   // ...
     * }
     * ```
     *
     * @see {@link Filter}
     * @see {@link https://www.amcharts.com/docs/v4/concepts/accessibility/} more about accessibility
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/changing-appearance-of-focused-items/} cusomizing focus appearance
     * @ignore Exclude from docs
     * @return Focused element filter
     */
    /**
    * @see {@link Filter}
    * @ignore Exclude from docs
    * @todo This is still experimental, don't use it
    */
    focusFilter: $type.Optional<Filter>;
    /**
     * If set to `true`, this element will also trigger `"over"` event with all
     * the related consequences, like "hover" state being applied and tooltip
     * being shown.
     *
     * Useful as an accessibility feature to display rollover tooltips on items
     * selected via keyboard.
     *
     * @param value  Trigger hover on focus?
     * @default false
     */
    /**
    * @return Trigger hover on focus?
    */
    hoverOnFocus: boolean;
    /**
     * Sets or returns TAB index.
     *
     * Tab index maintains the order in which focusable elements gain focus when
     * TAB key is pressed.
     *
     * Please note, tab index is not local to the chart. It affects the whole
     * of the page, including non-SVG elements. Maintain extreme causion when
     * setting tab indexes, as it affects the user experience for the whole
     * web page.
     *
     * @param value TAB index
     */
    /**
    * @return TAB index
    */
    tabindex: number;
    /**
     * ==========================================================================
     * DRAGGING AND RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns element's options to be used for inertia. This setting is
     * inheritable, meaning that if not set directly, it will search in all its
     * ascendants until very top.
     *
     * Inertia is used only if element's `inert` is set to `true`.
     *
     * "Inert" element, when dragged and released, will carry the momentum of the
     * movement, and will continue moving in the same drag direction, gradually
     * reducing in speed until finally stops.
     *
     * Check [[IInertiaOptions]] for how you tweak inertia animations.
     *
     * @return Inertia options
     */
    readonly inertiaOptions: Dictionary<InertiaTypes, IInertiaOptions>;
    /**
     * Controls if the element is draggable.
     *
     * @param value  `true` if element can be dragged
     */
    /**
    * @return `true` if element can be dragged
    */
    draggable: boolean;
    /**
     * Executes when dragged element is being started to drag.
     *
     * @ignore Exclude from docs
     */
    protected handleDragStart(ev: AMEvent<Sprite, ISpriteEvents>["dragstart"]): void;
    /**
     * Tell this element to start being dragged. This is useful if you want to
     * drag items by interactions performed not directly on the target element.
     *
     * Parameter `pointer` is highly recommended. By passing in the Pointer you
     * will ensure that movement is tracked for the pointer that you want. If not
     * supplied, the system will try to determine the most logical pointer.
     *
     * However this may fail if you have more than one pointer active, which
     * might happen if you have several objects being dragged on a touch device.
     *
     * @ignore Exclude from docs
     * @param pointer Pointer to use for movement
     */
    dragStart(pointer?: IPointer): void;
    /**
     * Executes when dragged element is being dropped.
     *
     * @ignore Exclude from docs
     */
    protected handleDragStop(ev: AMEvent<Sprite, ISpriteEvents>["dragstop"]): void;
    /**
     * Stops manually initiated dragging of the element.
     *
     * @ignore Exclude from docs
     * @param pointer Pointer to use as a reference
     */
    dragStop(pointer?: IPointer, cancelled?: boolean): void;
    /**
     * Executes when {Sprite} is being dragged.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     * @todo Implement parent position offset calculation
     */
    handleDragMove(ev: AMEvent<Sprite, ISpriteEvents>["drag"]): void;
    /**
     * Controls if the element should use inertia when interacted with.
     *
     * "Inert" element, when dragged and released, will carry the momentum of the
     * movement, and will continue moving in the same drag direction, gradually
     * reducing in speed until finally stops.
     *
     * @default false
     * @param value `true` if element should use inertia when animated
     */
    /**
    * @return `true` if element should use inertia when animated
    */
    inert: boolean;
    /**
     * ==========================================================================
     * HOVERING
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns Sprite's hover options.
     *
     * @see {@link IHoverOptions} for available options.
     * @return Options
     */
    readonly hoverOptions: IHoverOptions;
    /**
     * Controls if the element is hoverable (hover events are registered).
     *
     * Use `over` and `out` events, to watch for those respective actions.
     *
     * @default false
     * @param value `true` if element can be hovered
     */
    /**
    * @return `true` if element is hoverable
    */
    hoverable: boolean;
    /**
     * Handles tasks when element becomes hovered:
     * * Shows [[Tooltip]] if applicable
     * * Applies "hover" state
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleOver(ev?: AMEvent<Sprite, ISpriteEvents>["over"]): void;
    /**
     * Handles tasks when element loses hover:
     *
     * * Hides [[Tooltip]]
     * * Applies default state
     *
     * @ignore Exclude from docs
     * @param ev [description]
     */
    handleOut(ev?: AMEvent<Sprite, ISpriteEvents>["out"]): void;
    /**
     * [handleOutReal description]
     *
     * @ignore
     * @todo description
     */
    handleOutReal(): void;
    /**
     * ==========================================================================
     * CLICKING/TAPPING AND TOGGLING STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns Sprite's click (hit) options.
     *
     * Click (hit) options control things like double-click, timeouts, etc.
     *
     * @see {@link IHitOptions} for available options.
     * @return Options
     */
    readonly hitOptions: IHitOptions;
    /**
     * Prepares element's after `down` event.
     *
     * @ignore Exclude from docs
     * @param ev Event
     */
    handleDown(ev?: AMEvent<Sprite, ISpriteEvents>["down"]): void;
    /**
     * Prepares element's after `up` event.
     *
     * @ignore Exclude from docs
     * @param ev Event
     */
    handleUp(ev?: AMEvent<Sprite, ISpriteEvents>["up"]): void;
    /**
     * Indicates if the element is clickable.
     *
     * Some type of the elements, like buttons are clickable by default.
     *
     * Most of the elements are not clickable by default.
     *
     * Use `hit`, `doublehit`, `up`, `down`, `toggled` events to watch for
     * respective click/touch actions.
     *
     * @param value `true` if element can be clicked
     */
    /**
    * @return {boolean}
    */
    clickable: boolean;
    /**
     * Indicates if element can be toggled on and off by subsequent clicks/taps.
     *
     * Togglable element will alternate its `isActive` property between `true`
     * and `false` with each click.
     *
     * @param value Is togglable?
     */
    /**
    * @return Is togglable?
    */
    togglable: boolean;
    /**
     * Handles toggling of the element.
     *
     * @ignore Exclude from docs
     * @param ev Event
     */
    handleToggle(ev: AMEvent<Sprite, ISpriteEvents>["hit"]): void;
    /**
     * Should element prevent context menu to be displayed, e.g. when
     * right-clicked?
     *
     * @default false
     * @param value Context menu disabled?
     */
    /**
    * @return Context menu disabled?
    */
    contextMenuDisabled: boolean;
    /**
     * Click-through URL for this element.
     *
     * If set, clicking/tapping this element will open the new URL in a target
     * window/tab as set by `urlTarget`.
     *
     * Please note that URL will be parsed by data placeholders in curly
     * brackets, to be populated from data. E.g.:
     *
     * ```TypeScript
     * series.columns.template.url = "https://www.google.com/search?q={category.urlEncode()}";
     * ```
     * ```JavaScript
     * series.columns.template.url = "https://www.google.com/search?q={category.urlEncode()}";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "columns": {
     *       "url": "https://www.google.com/search?q={category.urlEncode()}"
     *     }
     *   }]
     * }
     * ```
     *
     * @param value URL
     */
    /**
    * @return URL
    */
    url: $type.Optional<string>;
    /**
     * [baseId description]
     *
     * @ignore
     * @param  value  [description]
     */
    /**
    * [baseId description]
    *
    * @ignore
    * @return [description]
    */
    baseId: string;
    protected setBaseId(value: string): void;
    /**
     * Returns the mail chart object that this element belongs to.
     *
     * In most cases it will mean the chart object.
     *
     * Can be used to retrieve chart object in various events and adapters.
     *
     * ```TypeScript
     * chart.seriesContainer.events.on("hit", function(ev) {
     *   console.log(ev.target.baseSprite);
     * });
     * ```
     * ```JavaScript
     * chart.seriesContainer.events.on("hit", function(ev) {
     *   console.log(ev.target.baseSprite);
     * });
     * ```
     * ```JSON
     * {
     *   // ...
     *   "seriesContainer": {
     *     "events": {
     *       "hit": function(ev) {
     *         console.log(ev.target.baseSprite);
     *       }
     *     }
     *   }
     * }
     * ```
     *
     * @readonly
     * @return  Base chart object
     */
    readonly baseSprite: $type.Optional<Sprite>;
    /**
     * Target to use for URL clicks:
     *
     * * _blank
     * * _self (default)
     * * _parent
     * * _top
     * * Name of the window/frame
     *
     * Ignored if `url` is not set.
     *
     * @param value URL target
     */
    /**
    * @return URL target
    */
    urlTarget: string;
    /**
     * Handles URL transition on element click.
     *
     * @ignore Exclude from docs
     * @param ev An event object
     */
    urlHandler(ev: AMEvent<Sprite, ISpriteEvents>["hit"]): void;
    /**
     * ==========================================================================
     * SWIPING GESTURE TRACKING
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns element's swipe gesture options.
     *
     * @return Swipe gesture options
     */
    readonly swipeOptions: ISwipeOptions;
    /**
     * Controls if element is swipeable.
     *
     * Swipable element will invoke `swipe`, `swipeleft` and `swiperight` events,
     * when quick horizontal drag action is performed with either mouse or touch.
     *
     * Please note that combining swipe and drag is possible, however will incur
     * a slight but noticeable delay in drag start.
     *
     * @param value  Element swipable?
     */
    /**
    * @return Element swipable?
    */
    swipeable: boolean;
    /**
     * ==========================================================================
     * POINTER TRACKING
     * ==========================================================================
     * @hidden
     */
    /**
     * Indicates if the element is trackable (mouse position over it is reported to
     * event listeners).
     *
     * Will invoke `track` events whenever pointer (cursor) changes position
     * while over element.
     *
     * Please note, touch devices will also invoke `track` events when touch
     * point is moved while holding down on a trackable element.
     *
     * @param value Track cursor movement over element?
     */
    /**
    * @return Track cursor movement over element?
    */
    trackable: boolean;
    /**
     * ==========================================================================
     * MOUSE-WHEEL RELATED
     * ==========================================================================
     * @hidden
     */
    /**
     * Indicates if the element can be interacted with mouse wheel.
     *
     * Will invoke `wheel`, `wheelup`, `wheeldown`, `wheelleft`, and `wheelright`
     * events when using mouse wheel over the element.
     *
     * @param value Mouse wheel events enabled?
     */
    /**
    * @return Mouse wheel events enabled?
    */
    wheelable: boolean;
    /**
     * ==========================================================================
     * RESIZE
     * ==========================================================================
     * @hidden
     */
    /**
     * Indicates if this element is resizable.
     *
     * Enabling resize will turn on various interactions on the element. Their
     * actual functionality will depend on other properties.
     *
     * If the element also `draggable`, resize will only happen with two points
     * of contact on a touch device.
     *
     * If the element is not draggable, resize can be performed with just one
     * point of contact, touch or mouse.
     *
     * Will invoke `resize` event every time the size of the element changes.
     *
     * @param value  Element resizable?
     */
    /**
    * @return Element resizable?
    */
    resizable: boolean;
    /**
     * Handles resize intermediate step.
     *
     * By default this method resizes actual element. Each element, can override
     * this method to implement their own resize logic.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleResize(ev: AMEvent<Sprite, ISpriteEvents>["resize"]): void;
    /**
     * ==========================================================================
     * MOUSE-RELATED
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns element's cursor options.
     *
     * Cursor options usually define cursor style for various states of the
     * hovered element.
     *
     * Elements inherit `cursorOptions` from their parents if they don't have
     * them set explicitly.
     *
     * @see {@link ICursorOptions} for a list of available options
     * @return Cursor options
     */
    readonly cursorOptions: ICursorOptions;
    /**
     * A shortcut to setting mouse cursor on hover.
     *
     * Example:
     *
     * ```TypeScript
     * series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
     * ```
     * ```JavaScript
     * series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": {
     *     // ...
     *     "slices": {
     *       "cursorOverStyle": "pointer"
     *     }
     *   }
     * }
     * ```
     *
     * @param style An array of styles to apply onhover
     */
    cursorOverStyle: Array<IStyleProperty>;
    /**
     * A shortcut to setting mouse cursor when button is pressed down.
     *
     * Example:
     *
     * ```TypeScript
     * series.slices.template.cursorDownStyle = am4core.MouseCursorStyle.grabbing;
     * ```
     * ```JavaScript
     * series.slices.template.cursorDownStyle = am4core.MouseCursorStyle.grabbing;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": {
     *     // ...
     *     "slices": {
     *       "cursorDownStyle": "grabbing"
     *     }
     *   }
     * }
     * ```
     *
     * @param style An array of styles to apply onhover
     */
    cursorDownStyle: Array<IStyleProperty>;
    /**
     * Applies default cursor styles for interactable elements.
     *
     * @ignore Exclude from docs
     * @todo Determine if this is necessary. Maybe let's not apply any cursor styles by default
     */
    applyCursorStyle(): void;
    /**
     * Setting this to `false` will effectively disable all interactivity on the
     * element.
     *
     * @param value  Is interaction enabled for this element?
     */
    /**
    * @return Is interaction enabled for this element?
    */
    interactionsEnabled: boolean;
    /**
     * ==========================================================================
     * EXPORT-RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * An [[Export]] instance.
     *
     * Used to access API of the chart export functionality.
     *
     * If `exporting` is not set, the element inherits [[Export]] instance from
     * its parents.
     *
     * Upon request, if no parent has such instance, a new one is created, using
     * default settings, what in most cases is just enough.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/exporting/} for more info about exporting
     * @param exp  Export
     */
    /**
    * @return Export instance
    */
    exporting: Export;
    /**
     * This is here as a method so that inheriting classes could override it.
     *
     * @return Export instance
     */
    protected getExporting(): Export;
    /**
     * If set to `false` this element will be omitted when exporting the chart
     * to an image.
     *
     * @default true
     * @param value  Export?
     */
    /**
    * @return Export?
    */
    exportable: boolean;
    /**
     * ==========================================================================
     * MODAL/POPUP RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Private method to be used for "classPrefix" adapter for modals/popups.
     *
     * @param value  Prefix
     */
    private modalPrefix;
    /**
     * Returns a [[Modal]] instance, associated with this chart.
     * (elements top parent)
     *
     * Accessing modal does not make it appear. To make a modal appear, use
     * `showModal()` method.
     *
     * @see {@link Modal} for more information about using Modal windows
     * @return Modal instance
     */
    readonly modal: Optional<Modal>;
    /**
     * Opens a modal window with specific content (`text` parameter) and,
     * optionally, `title`.
     *
     * The `text` parameter can contain HTML content.
     *
     * @see {@link Modal} for more information about using Modal windows
     * @param text   Modal contents
     * @param title  Title for the modal window
     */
    openModal(text: string, title?: string): Optional<Modal>;
    /**
     * Hides modal window if there is one currently open.
     */
    closeModal(): void;
    /**
     * A list of popups for this chart.
     *
     * @return Popups
     */
    readonly popups: Optional<ListTemplate<Popup>>;
    /**
     * Creates, opens, and returns a new [[Popup]] window.
     *
     * `text` can be any valid HTML.
     *
     * `title` is currently not supported.
     *
     * @param text   Popup contents
     * @param title  Popup title
     * @return Popup instance
     */
    openPopup(text: string, title?: string): Optional<Popup>;
    /**
     * Closes all currently open popup windows
     */
    closeAllPopups(): void;
    /**
     * ==========================================================================
     * POSITIONAL PROPERTIES AND RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Element's absolute or relative X coordinate.
     *
     * If setting both X and Y, please consider using `moveTo()` method instead,
     * as it will be faster to set both coordinates at once.
     *
     * @param value X coordinate
     */
    /**
    * @return X coordinate
    */
    x: number | Percent;
    /**
     * Returns element's current absolute X coordinate in pixels.
     *
     * @readonly
     * @return X coordinate (px)
     */
    readonly pixelX: number;
    /**
     * Returns element's current relative X coordinate in [[Percent]].
     *
     * @return X coordinate ([[Percent]])
     */
    readonly relativeX: number;
    /**
     * The smallest allowable absolute X coordinate for this element.
     *
     * This is used to contain element movement within certain boundaries.
     *
     * @ignore Exclude from docs
     * @param value Min X (px)
     */
    /**
    * @ignore Exclude from docs
    * @return Min X (px)
    */
    minX: number;
    /**
     * The biggest allowable absolute X coordinate for this element.
     *
     * This is used to contain element movement within certain boundaries.
     *
     * @ignore Exclude from docs
     * @param value Max X (px)
     */
    /**
    * @ignore Exclude from docs
    * @return Max X (px)
    */
    maxX: number;
    /**
     * Element's absolute or relative Y coordinate.
     *
     * If setting both X and Y, please consider using `moveTo()` method instead,
     * as it will be faster to set both coordinates at once.
     *
     * @param value  Y coordinate
     */
    /**
    * @return Y coordinate
    */
    y: number | Percent;
    /**
     * Returns element's current absolute Y coordinate in pixels.
     *
     * @readonly
     * @return Y coordinate (px)
     */
    readonly pixelY: number;
    /**
     * Returns element's current relative Y coordinate in [[Percent]].
     *
     * @readonly
     * @return Y coordinate ([[Percent]])
     */
    readonly relativeY: number;
    /**
     * The smallest allowable absolute Y coordinate for this element.
     *
     * This is used to contain element movement within certain boundaries.
     *
     * @ignore Exclude from docs
     * @param value Min Y (px)
     */
    /**
    * @ignore Exclude from docs
    * @return Min Y (px)
    */
    minY: number;
    /**
     * The biggest allowable absolute Y coordinate for this element.
     *
     * This is used to contain element movement within certain boundaries.
     *
     * @ignore Exclude from docs
     * @param value  Max Y (px)
     */
    /**
    * @ignore Exclude from docs
    * @return Max Y (px)
    */
    maxY: number;
    /**
     * A horizontal offset for the element in pixels.
     *
     * Can be negative value for offset to the left.
     *
     * @param value  Horizontal offset (px)
     */
    /**
    * @return Horizontal offset (px)
    */
    dx: number;
    /**
     * A vertical offset for the element in pixels.
     *
     * Can be negative value for offset upwards.
     *
     * @param value  Vertical offset (px)
     */
    /**
    * @return Vertical offset (px)
    */
    dy: number;
    /**
     * Rotation of the element in degrees. (0-360)
     *
     * Note: For convenience purposes, negative values (for counter-clockwise
     * rotation) and values exceeding 360 can also be used.
     *
     * @param value  Rotation (0-360)
     */
    /**
    * @return Rotation (0-360)
    */
    rotation: number;
    /**
     * Controls horizontal alignment of the element.
     *
     * This is used by parent [[Container]] when layouting its children.
     *
     * @param value  Horizontal align
     */
    /**
    * @return Horizontal align
    */
    align: Align;
    /**
     * Controls vertical alignment of the element.
     *
     * This is used by parent [[Container]] when layouting its children.
     *
     * @param value  Vertical align
     */
    /**
    * @return Vertical align
    */
    valign: VerticalAlign;
    /**
     * Controls which part of the element to treat as a horizontal center.
     *
     * The setting will be used when positioning, resizing and rotating the
     * element.
     *
     * @param value  Horizontal center
     */
    /**
    * @return Horizontal center
    */
    horizontalCenter: HorizontalCenter;
    /**
     * Controls which part of the element to treat as a vertical center.
     *
     * The setting will be used when positioning, resizing and rotating the
     * element.
     *
     * @param value  Vertical center
     */
    /**
    * @return Vertical center
    */
    verticalCenter: VerticalCenter;
    /**
     * ==========================================================================
     * DIMENSIONAL PROPERTIES AND RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Maximum allowed width for the element in pixels.
     *
     * @param value  Maximum width (px)
     */
    /**
    * @return Maximum width (px)
    */
    maxWidth: number;
    protected setMaxWidth(value: number): void;
    /**
     * Maximum allowed height for the element in pixels.
     *
     * @param value  Maximum height (px)
     */
    /**
    * @return Maximum height (px)
    */
    maxHeight: number;
    protected setMaxHeight(value: number): void;
    /**
     * Minimum width of the element in pixels.
     *
     * Set to `undefined` to remove the limit.
     *
     * @param value  Minimum width (px)
     */
    /**
    * @return Minimum width (px)
    */
    minWidth: Optional<number>;
    /**
     * Minimum height for the element in pixels.
     *
     * Set to `undefined` to remove the limit.
     *
     * @param value  Minimum height (px)
     */
    /**
    * @return Minimum height (px)
    */
    minHeight: Optional<number>;
    /**
     * Element's absolute or relative width.
     *
     * The width can either be absolute, set in numeric pixels, or relative, set
     * in [[Percent]].
     *
     * Relative width will be calculated using closest measured ancestor
     * [[Container]].
     *
     * NOTE: `width` is an accessor, which allows setting width in pixels or
     * percent. It is a sort of a "shortcut" for the users. Actual renderer does
     * not ever use it. It uses either `pixelWidth` or `percentWidth`, so if
     * you need to add an adapter for width add it for either of the two
     * properties - whichever suits your requirements.
     *
     * @param value  Width (numeric in pixels or relative)
     */
    /**
    * @return Width (absolute or relative)
    */
    width: number | Percent;
    /**
     * Element's absolute or relative height.
     *
     * The height can either be absolute, set in numeric pixels, or relative, set
     * in [[Percent]].
     *
     * Relative height will be calculated using closest measured ancestor
     * [[Container]].
     *
     * NOTE: `height` is an accessor, which allows setting height in pixels or
     * percent. It is a sort of a "shortcut" for the users. Actual renderer does
     * not ever use it. It uses either `pixelHeight` or `percentHeight`, so if
     * you need to add an adapter for height add it for either of the two
     * properties - whichever suits your requirements.
     *
     * @param value  Height (numeric in pixels or relative)
     */
    /**
    * @return height (absolute or relative)
    */
    height: number | Percent;
    /**
     * Returns element's width in pixels, if width was set. For actual width use measuredWidth property.
     *
     * @readonly
     * @return Width (px)
     */
    readonly pixelWidth: number;
    /**
     * Returns element's height in pixels. For actual height use measuredHeight property.
     *
     * @readonly
     * @return Height (px)
     */
    readonly pixelHeight: number;
    /**
     * Element's relative width in [[Percent]].
     * @ignore
     *
     * @param value  Relative width
     */
    /**
    * @return Relative width
    * @ignore
    */
    relativeWidth: $type.Optional<number>;
    /**
     * Element's relative height in [[Percent]].
     *
     * @param value  Relative height
     * @ignore
     */
    /**
    * @return Relative height
    * @ignore
    */
    relativeHeight: $type.Optional<number>;
    /**
     * Returns element's measured width in pixels.
     *
     * A measured width is actual width of contents plus `paddingRight` and* `paddingLeft`, relative to sprite parent, meaning that
     * rotation and scale is taken into account.
     *
     * @readonly
     * @return Width (px)
     */
    readonly measuredWidth: number;
    /**
     * Returns elements's measured height in pixels.
     *
     * A measured height is actual height of contents plus `paddingTop` and `paddingBottom`, relative to sprite parent, meaning that
     * rotation and scale taken into account.
     *
     * @readonly
     * @return Height (px)
     */
    readonly measuredHeight: number;
    /**
     * Returns element's measured width plus its left and right margins in
     * pixels.
     *
     * @readonly
     * @return Outer width (px)
     */
    readonly outerWidth: number;
    /**
     * Returns element's measured height plus its top and bottom margins in
     * pixels.
     *
     * @readonly
     * @return Outer height (px)
     */
    readonly outerHeight: number;
    /**
     * Returns element's measured inner width in pixels.
     *
     * Inner width is actual available space for content, e.g. element's width
     * minus horizontal padding.
     *
     * @readonly
     * @return Inner width (px)
     */
    readonly innerWidth: number;
    /**
     * Returns element's measured inner height in pixels.
     *
     * Inner height is actual available space for content, e.g. element's height
     * minus vertical padding.
     *
     * @readonly
     * @return Inner height (px)
     */
    readonly innerHeight: number;
    /**
     * Returns element's current "global" scale.
     *
     * Scale values accumulate over hierarchy of elements.
     *
     * E.g. if a [[Container]] has `scale = 2` and it's child has a `scale = 2`,
     * the child's `globalScale` will be 4. (a multitude of `2 x 2`)
     *
     * @readonly
     * @return Global scale
     */
    readonly globalScale: number;
    /**
     * Scale of the element.
     *
     * The scale is set from 0 (element reduced to nothing) to 1 (default size).
     * * 2 will mean element is increased twice.
     * * 0.5 - reduced by 50%.
     *
     * Etc.
     *
     * @param value  Scale (0-1)
     */
    /**
    * @return Scale (0-1)
    */
    scale: number;
    /**
     * Sets all four margins for the element at once.
     *
     * Margins are set in pixels.
     *
     * @param top     Top margin
     * @param right   Right margin
     * @param bottom  Bottom margin
     * @param left    Left margin
     * @return Current element
     */
    margin(top: number, right: number, bottom: number, left: number): Sprite;
    /**
     * Left margin - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Margin value
     */
    /**
    * @return Margin value
    */
    marginLeft: number | Percent;
    /**
     * Right margin - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Margin value
     */
    /**
    * @return Margin value
    */
    marginRight: number | Percent;
    /**
     * Top margin - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Margin value
     */
    /**
    * @return Margin value
    */
    marginTop: number | Percent;
    /**
     * Bottom margin - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Margin value
     */
    /**
    * @return Margin value
    */
    marginBottom: number | Percent;
    /**
     * Returns current right margin in pixels.
     *
     * @readonly
     * @return Right margin (px)
     */
    readonly pixelMarginRight: number;
    /**
     * Returns current relative right margin.
     *
     * @readonly
     * @return Relative right margin
     */
    readonly relativeMarginRight: number;
    /**
     * Returns current left margin in pixels.
     *
     * @readonly
     * @return Left margin (px)
     */
    readonly pixelMarginLeft: number;
    /**
     * Returns current relative left margin.
     *
     * @readonly
     * @return Relative left margin
     */
    readonly relativeMarginLeft: number;
    /**
     * Returns current top margin in pixels.
     *
     * @readonly
     * @return Top margin (px)
     */
    readonly pixelMarginTop: number;
    /**
     * Returns current relative top margin.
     *
     * @readonly
     * @return Relative top margin
     */
    readonly relativeMarginTop: number;
    /**
     * Returns current bottom margin in pixels.
     *
     * @readonly
     * @return Bottom margin (px)
     */
    readonly pixelMarginBottom: number;
    /**
     * Returns current relative bottom margin.
     *
     * @readonly
     * @return Relative bottom margin
     */
    readonly relativeMarginBottom: number;
    /**
     * Sets padding for the element in pixels.
     *
     * @param top     Top padding (px)
     * @param right   Right padding (px)
     * @param bottom  Bottom padding (px)
     * @param left    Left padding (px)
     * @return Element
     */
    padding(top: number, right: number, bottom: number, left: number): Sprite;
    /**
     * Left padding - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Padding value
     */
    /**
    * @return Padding value
    */
    paddingLeft: number | Percent;
    /**
     * Right padding - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Padding value
     */
    /**
    * @return Padding value
    */
    paddingRight: number | Percent;
    /**
     * Top padding - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Padding value
     */
    /**
    * @return Padding value
    */
    paddingTop: number | Percent;
    /**
     * Bottom padding - absolute (px) or relative ([[Percent]]).
     *
     * @param value  Padding value
     */
    /**
    * @return Padding value
    */
    paddingBottom: number | Percent;
    /**
     * Returns current right padding in pixels.
     *
     * @readonly
     * @return Right padding (px)
     */
    readonly pixelPaddingRight: number;
    /**
     * Returns current relative right padding.
     *
     * @readonly
     * @return Relative right padding
     */
    readonly relativePaddingRight: number;
    /**
     * Returns current left padding in pixels.
     *
     * @readonly
     * @return Left padding (px)
     */
    readonly pixelPaddingLeft: number;
    /**
     * Returns current relative left padding.
     *
     * @readonly
     * @return Relative left padding
     */
    readonly relativePaddingLeft: number;
    /**
     * Returns current top padding in pixels.
     *
     * @readonly
     * @return Top padding (px)
     */
    readonly pixelPaddingTop: number;
    /**
     * Returns current relative top padding.
     *
     * @readonly
     * @return Relative top padding
     */
    readonly relativePaddingTop: number;
    /**
     * Returns current bottom padding in pixels.
     *
     * @readonly
     * @return Bottom padding (px)
     */
    readonly pixelPaddingBottom: number;
    /**
     * Returns current relative bottom padding.
     *
     * @readonly
     * @return Relative bottom padding
     */
    readonly relativePaddingBottom: number;
    /**
     * ==========================================================================
     * APPEARANCE-RELATED PROPERTIES AND RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Path of Sprite element
     */
    /**
    * @return Path of a Sprite element
    */
    path: string;
    /**
     * @ignore
     */
    protected setPath(value: string): boolean;
    /**
     * [[ColorModifier]] that can be used to modify color and pattern of the
     * element's fill, e.g. create gradients.
     *
     * @param value  Fill color modifiier
     */
    /**
    * @return Fill color modifier
    */
    fillModifier: ColorModifier;
    /**
     * [[ColorModifier]] that can be used to modify color and pattern of the
     * element's stroke (outline), e.g. create gradients.
     *
     * @param value  Stroke color modifier
     */
    /**
    * @return Stroke color modifier
    */
    strokeModifier: ColorModifier;
    /**
     * Element's fill opacity.
     *
     * Opacity ranges from 0 (fully transparent) to 1 (fully opaque).
     *
     * @param value  Opacity (0-1)
     */
    /**
    * @return Opacity (0-9)
    */
    fillOpacity: number;
    /**
     * Element's fill color or pattern.
     *
     * @param value  Fill
     */
    /**
    * @return Fill
    */
    fill: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>;
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    protected setFill(value: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>): void;
    /**
     * Element's opacity.
     *
     * Opacity setting can range from 0 (fully transparent) to 1 (fully opaque).
     *
     * ATTENTION: It is highly not recommended to use `opacity` directly on the
     * element. The charts use `opacity` to hide/show elements, so your setting
     * might be lost if element is hidden and then later shown.
     *
     * Instead use methods `hide()` and `show()` to completely toggle off and on
     * the element.
     *
     * Or, use properties `fillOpacity` and `strokeOpacity`, if you need to make
     * the element semi-transparent.
     *
     * @param value Opacity (0-1)
     */
    /**
    * @return Opacity (0-1)
    */
    opacity: number;
    /**
     * Element's stroke (outline) color or pattern.
     *
     * @param value  Stroke setting
     */
    /**
    * @return Stroke setting
    */
    stroke: Color | Pattern | LinearGradient | RadialGradient;
    /**
     * Sets actual `stroke` property on the SVG element, including applicable
     * color modifiers.
     *
     * @ignore Exclude from docs
     * @param value Stroke setting
     */
    protected setStroke(value: Color | Pattern | LinearGradient | RadialGradient): void;
    /**
     * Stroke (outline) opacity.
     *
     * The values may range from 0 (fully transparent) to 1 (fully opaque).
     *
     * @param value  Opacity (0-1)
     */
    /**
    * @return Opacity (0-1)
    */
    strokeOpacity: number;
    /**
     * Controls if the element's stroke (outline) should remain keep constant
     * thicnkess and do not scale when the whole element is resized.
     *
     * @param value  Do not scale stroke (outline)
     */
    /**
    * @return Do not scale stroke (outline)
    */
    nonScalingStroke: boolean;
    /**
     * Controls if element should keep constant size and not scale even if there is
     * space available, or it does not fit.
     *
     * @param value  Is element scaleable?
     */
    /**
    * @return Is element scaleable?
    */
    nonScaling: boolean;
    /**
     * Stroke (outline) thickness in pixels.
     *
     * @param value  Thickness (px)
     */
    /**
    * @return Thickness (px)
    */
    strokeWidth: number;
    /**
     * A `stroke-dasharray` for the stroke (outline).
     *
     * "Dasharray" allows setting rules to make lines dashed, dotted, etc.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more info on `stroke-dasharray`
     * @param value  `stroke-dasharray`
     */
    /**
    * @return `stroke-dasharray`
    */
    strokeDasharray: string;
    /**
     * A `stroke-dashoffset` for the stroke (outline).
     *
     * "Dashoffset" allows setting the start position of the dashes if
     * `strokeDasharray` is used.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset} for more info on `stroke-dashoffset`
     * @param value  `stroke-dashoffset`
     */
    /**
    * @return `stroke-dashoffset`
    */
    strokeDashoffset: number;
    /**
     * A `stroke-linecap` to indicate how line ends are drawn.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes#Stroke} for more info on `stroke-linecap`
     * @param value  `stroke-linecap`
     */
    /**
    * @return `stroke-linecap`
    */
    strokeLinecap: "butt" | "square" | "round";
    /**
     * A `stroke-linejoin` to indicate how line ends are drawn.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes#Stroke} for more info on `stroke-linejoin`
     * @param value  `stroke-linejoin`
     */
    /**
    * @return `stroke-linejoin`
    */
    strokeLinejoin: "miter" | "round" | "bevel";
    /**
     * An SVG-specific `shape-rendering` value.
     *
     * `shape-rendering` controls how vector graphics are drawn and rendered.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering} for more information about `shape-rendering`
     * @default "auto"
     * @param value  'shape-rendering' value
     */
    /**
    * @return 'shape-rendering' value
    */
    shapeRendering: ShapeRendering;
    /**
     * Controls if SVG vectors should be drawn with "pixel" precision, producing
     * perfectly crisp lines on retina displays.
     *
     * Setting this to `true` might improve visual quality, but may have a
     * negative effect on performance.
     *
     * Different elements use different default setting for `pixelPerfect`.
     *
     * We recommend leaving this at their default settings, unless there's a
     * specific need.
     *
     * @param value  Use pixel perfect?
     */
    /**
    * @return Use pixel perfect?
    */
    pixelPerfect: boolean;
    /**
     * An RTL (right-to-left) setting.
     *
     * RTL may affect alignment, text, and other visual properties.
     *
     * If you set this on a top-level chart object, it will be used for all
     * child elements, e.g. labels, unless they have their own `rtl` setting
     * set directly on them.
     *
     * @param value  `true` for to use RTL
     */
    /**
    * @return RTL?
    */
    rtl: boolean;
    /**
     * ==========================================================================
     * VISIBILITY AND ORDER PROPERTIES AND RELATED STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * Reveals hidden element.
     *
     * Has no effect if element is already visible.
     *
     * If `duration` is not specified, it will use default.
     *
     * @param duration  Fade in duration (ms)
     * @return Animation object if such object was created
     */
    show(duration?: number): $type.Optional<Animation>;
    /**
     * Performs actual operations to reveal this element.
     *
     * @ignore Exclude from docs
     * @param duration Fade in duration (ms)
     * @return Fade in duration (ms)
     */
    protected showReal(duration?: number): $type.Optional<Animation>;
    /**
     * Initiates hiding of Sprite.
     * When called it will fade out the the Sprite to transparency, then make it
     * invisible.
     * @param duration Duration in millisecons
     */
    /**
     * Hides the element, by applying `hidden` state.
     *
     * Has no effect if element is already hidden.
     *
     * If `duration` is not specified, it will use default.
     *
     * While element is fading out, its `isHiding` property will resolve to
     * `true`.
     *
     * When element is hidden, its `visible` property will resolve to `false`.
     *
     * @param duration  Fade out duration (ms)
     * @return hide Animation object if such object was created
     */
    hide(duration?: number): $type.Optional<Animation>;
    /**
     * Hides actual SVG elements and handles hiding animations.
     *
     * @param duration  Fade out duration (ms)
     * @return Fade out duration (ms)
     * @ignore
     */
    protected hideReal(duration?: number): $type.Optional<Animation>;
    /**
     * Indicates if element is current visible (`true`) or hidden (`false`).
     *
     * @param value Visible?
     */
    /**
    * @return Visible?
    */
    visible: boolean;
    /**
     * Returns visibility value
     * @ignore
     */
    protected getVisibility(): boolean;
    /**
     * Sets `visibility` property:
     *
     * * `true` - visible
     * * `false` - hidden
     *
     * @param value  true - visible, false - hidden
     * @return Current visibility
     */
    setVisibility(value: boolean): void;
    /**
     * A "zIndex" of the element.
     *
     * "zIndex" determines the order of how elements are placed over each other.
     *
     * Higher "zIndex" will mean the element will be draw on top of elements
     * with lower "zIndexes".
     *
     * @param value  zIndex
     */
    /**
    * @return zIndex
    */
    zIndex: number;
    /**
     * Moves the element to the very top in element order, so that it appears
     * in front of other elements.
     */
    toFront(): void;
    /**
     * Moves the element to the very bottom in the element order, so that it
     * appears behind other elements.
     */
    toBack(): void;
    /**
     * A custom class name to set on the element.
     *
     * If set, the value will be added to element's `class` attribute.
     *
     * @since 4.9.11
     * @param  value  Class name
     */
    /**
    * @return Class name
    */
    userClassName: string;
    /**
     * ==========================================================================
     * TOOLTIP-RELATED PROPERTIES STUFF
     * ==========================================================================
     * @hidden
     */
    /**
     * A [[Tooltip]] object to be used when displayed rollover information for
     * the element.
     *
     * @param tooltip  Tooltip
     */
    /**
    * @return Tooltip
    */
    tooltip: $type.Optional<Tooltip>;
    /**
     * A [[DataItem]] to use when populating content for the element's
     * [[Tooltip]].
     *
     * @see {@link Tooltip}
     * @see {@link DataItem}
     * @param value  Tooltip data item
     */
    /**
    * @return Tooltip data item
    */
    tooltipDataItem: DataItem;
    /**
     * A [[Sprite]] or sprite template to use when getting colors for tooltip. If a template is set,
     * tooltip will look for a clone in tooltipDataItem.sprites. If no clone is found, then template colors will be used.
     *
     * @see {@link Tooltip}
     * @see {@link Sprite}
     * @param sprite Sprite
     */
    /**
    * @return Tooltip color source
    */
    tooltipColorSource: $type.Optional<Sprite>;
    /**
     * Shows the element's [[Tooltip]].
     *
     * A tooltip will be populated using text templates in either `tooltipHTML` or
     * `tooltipText` as well as data in `tooltipDataItem`.
     *
     * @see {@link Tooltip}
     * @param optional point (sprite-related) to which tooltip must point.
     * @return returns true if the tooltip was shown and false if it wasn't (no text was found)
     */
    showTooltip(point?: IPoint): boolean;
    /**
     * @ignore
     */
    protected updateTooltipPosition(point?: IPoint): boolean;
    /**
     * Sets the point the [[Tooltip]] should point to.
     *
     * @param point      Coordinates to point to
     * @param instantly  Move instantly without animation
     */
    protected pointTooltipTo(point: IPoint, instantly?: boolean): boolean;
    /**
     * Hides element's [[Tooltip]].
     *
     * @see {@link Tooltip}
     */
    hideTooltip(duration?: number): void;
    /**
     * An HTML template to be used to populate [[Tooltip]] contents.
     *
     * If element has `tooltipDataItem` or `dataItem` set, this will be parsed
     * for any data values to be replaced with the values from respective data
     * items.
     *
     * @param value Tooltip HTML content template
     */
    /**
    * @return Tooltip HTML content template
    */
    tooltipHTML: string;
    /**
     * A text template to be used to populate Tooltip's contents.
     *
     * If element has `tooltipDataItem` or `dataItem` set, this will be parsed
     * for any data values to be replaced with the values from respective data
     * items.
     *
     * This template will also be parsed for any special formatting tags.
     *
     * @param value Tooltip content template
     * @see {@link TextFormatter}
     */
    /**
    * @return Tooltip content template
    */
    tooltipText: string;
    /**
     * A container reference that should be used to place element's
     * [[Tooltip]] in.
     *
     * Will use parent's container if does not have one set.
     *
     * @ignore Exclude from docs
     * @param value Container
     * @todo Dispose of the old _tooltipContainer ?
     */
    /**
    * @ignore Exclude from docs
    * @return Container
    */
    tooltipContainer: $type.Optional<Container>;
    /**
     * X coordinate the [[Tooltip]] should be shown at.
     *
     * @param value  Tooltip X (px)
     */
    /**
    * @return Tooltip X (px)
    */
    tooltipX: number | Percent;
    /**
     * DEPRECATION NOTICE: This setting is deprecated in favor of a more flexible
     * setting: `showTooltipOn`. Please use `showTooltipOn = "always"` instead.
     *
     * Indicates if this element should display a tooltip permanently.
     *
     * Useful, if you want to show permanent tooltips on some items.
     *
     * @default false
     * @since 4.5.4
     * @deprecated Use `showTooltipOn = "always"` instead
     * @param  value  Always show tooltip?
     */
    /**
    * @return Always show tooltip?
    */
    alwaysShowTooltip: boolean;
    /**
     * Indicates when tooltip needs to be shown on this element:
     *
     * * `"hover"` (default) - Tooltip will be shown when element is hovered on.
     * * `"hit"` - Tooltip will be shown when element is clicked/tapped. Tooltip will be hidden when clicked/tapped anywhere else.
     * * `"always"` - Tooltip will be shown on the element permanently.
     *
     * For example, if you would like to show tooltips on all of the columns of
     * a [[ColumnSeries]]:
     *
     * ```TypeScript
     * series.columns.template.showTooltipOn = "always";
     * ```
     * ```JavaScript
     * series.columns.template.showTooltipOn = "always";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "columns": {
     *       "showTooltipOn": "always"
     *     }
     *   }]
     * }
     * ```
     *
     * It can even be set to display on a selected columns via `propertyFields`:
     *
     * ```TypeScript
     * series.columns.template.propertyFields.showTooltipOn = "tooltip";
     * ```
     * ```JavaScript
     * series.columns.template.propertyFields.showTooltipOn = "tooltip";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "columns": {
     *       "propertyFields": {
     *         "showTooltipOn": "tooltip"
     *       }
     *     }
     *   }]
     * }
     * ```
     *
     * @default "hover"
     * @since 4.7.9
     * @param  value  When to show tooltip
     */
    /**
    * @return When to show tooltip
    */
    showTooltipOn: "hover" | "hit" | "always";
    /**
     * Specifies if [[Tooltip]] should follow the mouse or touch pointer or stay
     * at the fixed position.
     *
     * @param value  Position
     */
    /**
    * Position
    */
    tooltipPosition: "fixed" | "pointer";
    /**
     * Y coordinate the [[Tooltip]] should be shown at.
     *
     * @param value  Tooltip Y (px)
     */
    /**
    * @return Tooltip Y (px)
    */
    tooltipY: number | Percent;
    /**
     * Returns Tooltip X coordinate if it's set, or middle of the element.
     *
     * @ignore Exclude from docs
     * @return X (px)
     */
    getTooltipX(): number;
    /**
     * Returns Tooltip Y coordinate if it's set, or middle of the element.
     *
     * @ignore Exclude from docs
     * @return Y (px)
     */
    getTooltipY(): number;
    /**
     * Displays a modal or console message with error, and halts any further
     * processing of this item.
     *
     * @ignore Exclude from docs
     * @param e Error
     * @todo Implement from applying further actions to this item
     */
    raiseCriticalError(e: Error, closable?: boolean): void;
    /**
 * Processes JSON-based config before it is applied to the object.
 *
 * @ignore Exclude from docs
 * @param config  Config
 */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Converts string name of the cursor into actual [[MouseCursorStyle]].
     *
     * @param style  Cursor type
     * @return Cursor definition
     */
    private getCursorStyle;
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    protected configOrder(a: string, b: string): Ordering;
    /**
     * If `sprite.hide()` is called, we set isHidden to true when sprite is hidden.
     * This was added becaus hidden state might have visibility set to true and so
     * there would not be possible to find out if a sprite is technically hidden or not.
     */
    readonly isHidden: boolean;
    /**
     * If this is set to `true`, Sprite, when inited will be instantly hidden
     * ("hidden" state applied) and then shown ("default" state applied).
     *
     * If your "default" state's `transitionDuration > 0` this will result in
     * initial animation from "hidden" state to "default" state.
     *
     * If you need a Sprite which has `showOnInit = true` not to be shown
     * initially, set `sprite.hidden = true`. Setting `sprite.visible = false`
     * will not prevent the animation and the sprite will be shown.
     *
     * @param value show on init?
     */
    /**
    * @return Show on init?
    */
    showOnInit: boolean;
    /**
     * @ignore
     */
    protected setShowOnInit(value: boolean): void;
    /**
     * @ignore
     */
    protected hideInitially(): void;
    /**
     * Hides the chart instantly and then shows it. If defaultState.transitionDuration > 0, this will result an animation in which properties of hidden state will animate to properties of visible state.
     */
    appear(): void;
    /**
     * If a sprite has `showOnInit = true`, it will animate from "hidden" to
     * "default" state when initialized. To prevent this but keep
     * `showOnInit = true`, you can set `sprite.hidden = true`.
     *
     * @param value initially hidden?
     */
    /**
    * @return Is initially hidden?
    */
    hidden: boolean;
    /**
     * Returns bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    readonly bbox: IRectangle;
    /**
     * A list of plugins (objects that implement [[IPlugin]] interface) attached
     * to this object.
     *
     * @since 4.2.2
     * @return List of plugins
     */
    readonly plugins: List<IPlugin>;
    /**
     * Called during the System.update method
     *
     * @ignore Exclude from docs
     */
    _systemUpdate(skippedSprites: Array<Sprite>): void;
    /**
     * Called during the System.update method
     *
     * @ignore Exclude from docs
     */
    _systemCheckIfValidate(): boolean;
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
}
