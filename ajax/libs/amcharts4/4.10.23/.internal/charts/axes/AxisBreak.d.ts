/**
 * Axis break module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Axis, AxisDataItem } from "./Axis";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { IWavedShape } from "../../core/defs/IWavedShape";
import { List } from "../../core/utils/List";
import { IPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisBreak]].
 */
export interface IAxisBreakProperties extends IContainerProperties {
    /**
     * A size of the break relative to the actual size of the scope break spans.
     *
     * For example, if `breakSize = 0.1` and unbroken scope of values it spans
     * would be 100 pixels, the break would be 10 pixels wide.
     *
     * 0 means the break will completely collapse and hide the values.
     * 1 means break would be not collapse at all, which would make it
     * effectively useless.
     *
     * @default 0.01
     */
    breakSize?: number;
    /**
     * Starting value.
     */
    startValue?: number;
    /**
     * End value.
     */
    endValue?: number;
}
/**
 * Defines events for [[AxisBreak]].
 */
export interface IAxisBreakEvents extends IContainerEvents {
}
/**
 * Defines [[AxisBreak]] adapters.
 *
 * @see {@link Adapter}
 */
export interface IAxisBreakAdapters extends IContainerAdapters, IAxisBreakProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define "breaks" on axes.
 *
 * @see {@link IAxisBreakEvents} for a list of available events
 * @see {@link IAxisBreakAdapters} for a list of available Adapters
 * @important
 */
export declare class AxisBreak extends Container {
    /**
     * Defines available properties.
     */
    _properties: IAxisBreakProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisBreakAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisBreakEvents;
    /**
     * Defines the type of the Axis this break is used for.
     */
    _axisType: Axis;
    /**
     * Reference to parent Axis.
     */
    protected _axis: MutableValueDisposer<this["_axisType"]>;
    /**
     * A reference to starting line element.
     */
    protected _startLine: IWavedShape;
    /**
     * A reference to ending line element.
     */
    protected _endLine: IWavedShape;
    /**
     * A reference to fill shape.
     */
    protected _fillShape: IWavedShape;
    /**
     * A list of axis data items which fall within this break.
     */
    dataItems: List<AxisDataItem>;
    /**
     * Adjusted start value.
     *
     * Start and end values need to be adjusted so that they do not overlap with
     * adjacent breaks.
     */
    adjustedStartValue: number;
    /**
     * Adjusted end value.
     *
     * Start and end values need to be adjusted so that they do not overlap with
     * adjacent breaks.
     */
    adjustedEndValue: number;
    /**
     * Constructor
     */
    constructor();
    dispose(): void;
    /**
     * An element used for the starting line of the break.
     *
     * @param sprite  Element
     */
    /**
    * @return Element
    */
    startLine: IWavedShape;
    /**
     * An element used for the end line of the break.
     *
     * @param sprite Element
     */
    /**
    * @return Element
    */
    endLine: IWavedShape;
    /**
     * An element used for fill of the break.
     *
     * @param sprite Element
     */
    /**
    * @return Element
    */
    fillShape: IWavedShape;
    /**
     * Adds a break element (e.g. lines, fill) to the break, which is
     * [[Container]].
     *
     * @ignore Exclude from docs
     * @param sprite Element to add
     */
    addBreakSprite(sprite: IWavedShape): void;
    /**
     * An Axis this Break is associated with.
     *
     * @param axis  Axis
     */
    /**
    * @return Axis
    */
    axis: this["_axisType"];
    /**
     * A size of the break relative to the actual size of the scope break spans.
     *
     * For example, if `breakSize = 0.1` and unbroken scope of values it spans
     * would be 100 pixels, the break would be 10 pixels wide.
     *
     * 0 means the break will completely collapse and hide the values.
     * 1 means break would be not collapse at all, which would make it
     * effectively useless.
     *
     * @default 0.01
     * @param value  Relative axis break
     */
    /**
    * @return Relative axis break
    */
    breakSize: number;
    /**
     * Returns pixel coordinates of axis break's start.
     *
     * @return Start point
     */
    readonly startPoint: IPoint;
    /**
     * Returns pixel coordinates of axis break's end.
     *
     * @return End point
     */
    readonly endPoint: IPoint;
    /**
     * Returns a relative position at which axis break starts.
     *
     * This is a calculated position, meaning it shows relative position of the
     * break after break is applied.
     *
     * @return Start position
     */
    readonly startPosition: number;
    /**
     * Returns a relative position at which axis break ends.
     *
     * This is a calculated position, meaning it shows relative position of the
     * break after break is applied.
     *
     * @return End position
     */
    readonly endPosition: number;
    /**
     * Draws the axis break.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * A starting value for the break.
     *
     * @param value  Starting value
     */
    /**
    * @return Starting value
    */
    startValue: number;
    /**
     * An end value for the break.
     *
     * @param value  End value
     */
    /**
    * @return End value
    */
    endValue: number;
}
