/**
 * Provides functionality used to build scrollbars.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
import { IRange } from "../defs/IRange";
import { ISpriteEvents, AMEvent } from "../Sprite";
import { Orientation } from "../defs/Orientation";
import { ResizeButton } from "../elements/ResizeButton";
import { Button } from "../elements/Button";
import { RoundedRectangle } from "../elements/RoundedRectangle";
import { Animation } from "../utils/Animation";
import { IDisposer } from "../utils/Disposer";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Scrollbar]].
 */
export interface IScrollbarProperties extends IContainerProperties {
    /**
     * Duration in milliseconds of Scrollbar animation.
     *
     * This affects how fast Scrollbar elements move/resize. For example when
     * chart zooms or pans, Scrollbar elements' positions need to be adjusted
     * as well. This setting will affect whether they will be relocated
     * instantenously (0), or will animte gradually.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    animationDuration?: number;
    /**
     * An easing function to use when animating (moving/sizing) Scrollbar
     * elements.
     */
    animationEasing?: (value: number) => number;
    /**
     * Orientation of a scrollbar
     */
    orientation?: Orientation;
}
/**
 * Defines events for [[Scrollbar]].
 */
export interface IScrollbarEvents extends IContainerEvents {
    /**
     * Invoked when range of scrollbar selection changes.
     */
    rangechanged: {};
}
/**
 * Defines adapters for [[Scrollbar]].
 */
export interface IScrollbarAdapters extends IContainerAdapters, IScrollbarProperties {
    /**
     * Applied to a position value when it is retrieved.
     */
    positionValue: {
        value: any;
        position: number;
    };
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Scrollbar is a generic control allowing to select a range of values or pan
 * the selection.
 *
 * @see {@link IScrollbarEvents} for a list of available events
 * @see {@link IScrollbarAdapters} for a list of available Adapters
 */
export declare class Scrollbar extends Container {
    /**
     * Defines available properties.
     */
    _properties: IScrollbarProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IScrollbarAdapters;
    /**
     * Defines available events.
     */
    _events: IScrollbarEvents;
    /**
     * Holds a reference to a draggable rectangle that fills the space between
     * two selection grips. It can be used to pan the selection maintaining the
     * distance between start and end grips.
     */
    protected _thumb: $type.Optional<Button>;
    /**
     * Orientation of the scrollbar.
     */
    protected _orientation: Orientation;
    /**
     * A button (grip) instance to be used to select lower range value.
     */
    protected _startGrip: ResizeButton;
    /**
     * A button (grip) instance to be used to select upper range value.
     */
    protected _endGrip: ResizeButton;
    /**
     * Currently selected lower (start) value.
     */
    protected _start: number;
    /**
     * Currently selected upper (end) value.
     */
    protected _end: number;
    /**
     * Previously selected lower (start) value.
     */
    protected _previousStart: $type.Optional<number>;
    /**
     * Previously selected upper (end) value.
     */
    protected _previousEnd: $type.Optional<number>;
    /**
     * An [[Animation]] instance that moves "thumb".
     */
    protected _thumbAnimation: $type.Optional<Animation>;
    /**
     * An [[Animation]] instance that moves zoom grip buttons.
     */
    protected _zoomAnimation: $type.Optional<Animation>;
    /**
     * A value of previously selected lower value, used for doubleclick function.
     */
    protected _prevStart: number;
    /**
     * A value of previously selected upper value, used for doubleclick function.
     */
    protected _prevEnd: number;
    /**
     * Indicates if the Scrollbar is currently "busy" (animating and or
     * performing zoom by user interaction).
     */
    protected _isBusy: boolean;
    /**
     * [_skipRangeEvents description]
     *
     * @todo Description
     */
    protected _skipRangeEvents: boolean;
    /**
     * Holds timeout reference that resets "busy" status.
     */
    protected _unbusyTimeout: $type.Optional<IDisposer>;
    /**
     * [undefined description]
     *
     * @todo Description
     */
    protected _usingGrip: "start" | "end" | undefined;
    /**
     * Sets the type of the element to use as background.
     */
    _background: RoundedRectangle;
    /**
     * Hide grips when not hovered over scrollbar?
     *
     * @default false
     */
    protected _hideGrips: boolean;
    /**
     * A disposer for the hover event.
     */
    protected _overDisposer: $type.Optional<IDisposer>;
    /**
     * A disposer for the out event.
     */
    protected _outDisposer: $type.Optional<IDisposer>;
    /**
     * Update the selection when dragging the grips.
     *
     * If set to `false` selection will be updated only when the grip is
     * released.
     *
     * @default true
     */
    updateWhileMoving: boolean;
    /**
     * Construtor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Validates the layout of the scrollbar's elements.
     *
     * @ignore Exclude from docs
     */
    validateLayout(): void;
    /**
     * Update background for the scrollbar.
     *
     * @ignore Exclude from docs
     */
    processBackground(): void;
    /**
     * Zooms to the particular place when clicked/tapped on the scrollbar
     * background.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    handleBgHit(event: ISpriteEvents["hit"]): void;
    /**
     * Set scrollbar as busy. (currently zooming)
     *
     * @ignore Exclude from docs
     */
    makeBusy(): void;
    /**
     * Stops all animations, currently playing for the scrollbar.
     *
     * @ignore Exclude from docs
     */
    stopAnimations(): void;
    /**
     * Cancels "busy" status of the Scrollbar.
     *
     * @ignore Exclude from docs
     */
    makeUnbusy(): void;
    /**
     * [makeUnbusyReal description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    makeUnbusyReal(): void;
    /**
     * Disptatches rangechanged event if it really changed
     *
     * @ignore Exclude from docs
     */
    protected dispatchRangeChange(): void;
    /**
     * Updates the "thumb" element. A draggable element between the grips.
     */
    protected updateThumb(): void;
    /**
     * Updates extremes of the scrollbar.
     */
    protected updateExtremes(): void;
    /**
     * Updates size of the scrollbar.
     */
    protected updateSize(): void;
    /**
     * Indicates if the Scrollbar is currently "busy" (animating and or
     * performing zoom by user interaction).
     * @return boolean
     */
    readonly isBusy: boolean;
    /**
     * ==========================================================================
     * POSITIONS
     * ==========================================================================
     * @hidden
     */
    /**
     * Relative position (0-1) of the start grip.
     *
     * @param position  Position (0-1)
     */
    /**
    * @return Position (0-1)
    */
    start: number;
    /**
     * [__start description]
     *
     * @todo Description
     * @param position [description]
     */
    /**
    * @return [description]
    */
    protected __start: number;
    /**
     * Relative position (0-1) of the end grip.
     *
     * @param position  Position (0-1)
     */
    /**
    * @return Position (0-1)
    */
    end: number;
    /**
     * [__end description]
     *
     * @todo Description
     * @param position [description]
     */
    /**
    * @return [description]
    */
    protected __end: number;
    /**
     * Current selection range.
     *
     * @readonly
     * @return Range
     */
    readonly range: IRange;
    /**
     * Disables range change events.
     *
     * @ignore Exclude from docs
     */
    skipRangeEvents(): void;
    /**
     * [fixRange description]
     *
     * @todo Description
     * @ignore Exclude from docs
     * @param range  Range
     */
    fixRange(range: IRange): void;
    /**
     * [getPosition description]
     *
     * @todo Description
     * @param position  [description]
     * @return [description]
     */
    protected getPosition(position: number): number;
    /**
     * ==========================================================================
     * MISC
     * ==========================================================================
     * @hidden
     */
    /**
     * Orientation of the scrollbar.
     *
     * Available options: "horizontal" (default) and "vertical".
     *
     * @default "horizontal"
     * @param value  Orientation
     */
    /**
    * @return Orientation
    */
    orientation: Orientation;
    /**
     * @ignore
     */
    protected updateByOrientation(): void;
    /**
     * ==========================================================================
     * GRIPS
     * ==========================================================================
     * @hidden
     */
    /**
     * Start grip element. (button)
     *
     * @param button  Grip element
     */
    /**
    * @return Grip element
    */
    startGrip: ResizeButton;
    /**
     * End grip element. (button)
     *
     * @param button  Grip element
     */
    /**
    * @return Grip element
    */
    endGrip: ResizeButton;
    /**
     * Decorates the grip button with properties and events.
     *
     * @ignore Exclude from docs
     * @param button Grip button
     */
    processGrip(button: ResizeButton): void;
    /**
     * Updates positions of related elements after grip element is dragged.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    handleGripDrag(event: AMEvent<ResizeButton, ISpriteEvents>["drag"]): void;
    /**
     * A "thumb" element.
     *
     * It's a draggable square space between the grips, that can be used to
     * pan the selection.
     *
     * @param thumb  Thumb element
     */
    /**
    * @return Thumb element
    */
    thumb: Button;
    /**
     * Zooms-in and out the selection on double-click of the thumb.
     *
     * @ignore Exclude from docs
     */
    handleDoubleClick(): void;
    /**
     * Updates positions of other elements when thumb is moved.
     *
     * @ignore Exclude from docs
     */
    handleThumbPosition(): void;
    /**
     * Creates a background element for the scrollbar.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    createBackground(): this["_background"];
    /**
     * Use this property to set whether grips should be always visible (`false`),
     * or they should just appear on scrollbar hover (`true`).
     *
     * @param value  Show only on hover?
     */
    /**
    * @return Show only on hover?
    */
    hideGrips: boolean;
    /**
     * Duration in milliseconds of scrollbar animation (happens when user clicks on a background of a scrollbar)
     * @default 0
     * @param value number
     */
    /**
    * @return Orientation
    */
    animationDuration: number;
    /**
     * Animation easing function.
     * @todo: review description and default
     * @default $ease.cubicOut
     * @param value (value: number) => number
     */
    /**
    * @return {Function}
    */
    animationEasing: (value: number) => number;
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    protected asFunction(field: string): boolean;
}
