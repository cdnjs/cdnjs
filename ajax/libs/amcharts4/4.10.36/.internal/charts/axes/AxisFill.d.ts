/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../../core/Sprite";
import { Axis, AxisItemLocation, AxisDataItem } from "./Axis";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisFill]].
 */
export interface IAxisFillProperties extends ISpriteProperties {
    /**
     * Start position. (0-1)
     */
    startPosition?: number;
    /**
     * End position. (0-1)
     */
    endPosition?: number;
    /**
     * Location within the axis.
     */
    location?: number;
    /**
     * Normally fill goes below series. Set this to `true` to go above.
     *
     * @default false
     */
    above?: boolean;
}
/**
 * Defines events for [[AxisFill]].
 */
export interface IAxisFillEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[AxisFill]].
 *
 * @see {@link Adapter}
 */
export interface IAxisFillAdapters extends ISpriteAdapters, IAxisFillProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * AxisFill is a base class used to defines fill shapes for various
 * type-specific Axes.
 *
 * Axis fills are used to add fills to specific ranges of those axes.
 *
 * @see {@link IAxisFillEvents} for a list of available events
 * @see {@link IAxisFillAdapters} for a list of available Adapters
 * @important
 */
export declare class AxisFill extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IAxisFillProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisFillAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisFillEvents;
    /**
     * A referecent to Axis element this fill is applied to.
     */
    axis: Axis;
    /**
     * An SVG path, used to draw fill shape.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    fillPath: string;
    /**
     * [_dataItem description]
     *
     * Not sure what this is doing here?
     *
     * @todo Description
     */
    _dataItem: AxisDataItem;
    /**
     * Constructor.
     *
     * @param axis Axis
     */
    constructor(axis: Axis);
    /**
     * @ignore
     */
    protected setDisabled(value: boolean): boolean;
    /**
     * Draws the fill element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * An actual starting position of the fill.
     *
     * @param value  Starting position
     */
    /**
    * @return Start position
    */
    startPosition: number;
    /**
     * An actual end position of the fill.
     *
     * @param value End position
     */
    /**
    * @return End position
    */
    endPosition: number;
    /**
     * Relative location of the fill. (0-1)
     *
     * @param value Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    location: AxisItemLocation;
    /**
     * @ignore
     */
    protected setPath(value: string): boolean;
    /**
     * Normally fill goes below series. Set this to `true` to go above.
     *
     * @default false
     * @since 4.5.9
     * @param  value  Draw above series?
     */
    /**
    * @return Draw above series?
    */
    above: boolean;
}
