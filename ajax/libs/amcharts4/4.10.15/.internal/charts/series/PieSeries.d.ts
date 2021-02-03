/**
 * Defines Pie Chart Series.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IPercentSeriesAdapters, IPercentSeriesDataFields, IPercentSeriesEvents, IPercentSeriesProperties, PercentSeries, PercentSeriesDataItem } from "./PercentSeries";
import { ISpriteEvents, AMEvent } from "../../core/Sprite";
import { Slice } from "../../core/elements/Slice";
import { AxisLabelCircular } from "../axes/AxisLabelCircular";
import { PieTick } from "../elements/PieTick";
import { Animation } from "../../core/utils/Animation";
import { Bullet } from "../elements/Bullet";
import { IRectangle } from "../../core/defs/IRectangle";
import { PieChart } from "../types/PieChart";
import * as $type from "../../core/utils/Type";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PieSeries]].
 *
 * @see {@link DataItem}
 */
export declare class PieSeriesDataItem extends PercentSeriesDataItem {
    /**
     * A type of slice used for this series.
     */
    _slice: Slice;
    /**
     * A reference to a slice label element.
     */
    _label: AxisLabelCircular;
    /**
     * A reference to a slice tick element.
     */
    _tick: PieTick;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: PieSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * Slice's radius, if other than default.
     *
     * @param value  Radius
     */
    /**
    * @return Radius
    */
    radiusValue: number;
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    hide(duration?: number, delay?: number, toValue?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    show(duration?: number, delay?: number, fields?: string[]): $type.Optional<Animation>;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[PieSeries]].
 */
export interface IPieSeriesDataFields extends IPercentSeriesDataFields {
    /**
     * Name of the field in data that holds item's radius value.
     */
    radiusValue?: string;
}
/**
 * Defines properties for [[PieSeries]].
 */
export interface IPieSeriesProperties extends IPercentSeriesProperties {
    /**
     * Outer radius for the series' slices in pixels.
     *
     * @ignore Exclude from docs
     */
    radius?: number | Percent;
    /**
     * Inner radius for the series' slices in pixels.
     *
     * @ignore Exclude from docs
     */
    innerRadius?: number | Percent;
    /**
     * Start angle for the series' slices in degrees. (0-360)
     *
     * @ignore Exclude from docs
     * @todo Redo so that users can set it
     */
    startAngle?: number;
    /**
     * End angle for the series' slices in degrees. (0-360)
     *
     * @ignore Exclude from docs
     * @todo Redo so that users can set it
     */
    endAngle?: number;
}
/**
 * Defines events for [[PieSeries]].
 */
export interface IPieSeriesEvents extends IPercentSeriesEvents {
}
/**
 * Defines adapters for [[PieSeries]].
 *
 * @see {@link Adapter}
 */
export interface IPieSeriesAdapters extends IPercentSeriesAdapters, IPieSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a slice series on a Pie chart.
 *
 * @see {@link IPieSeriesEvents} for a list of available Events
 * @see {@link IPieSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class PieSeries extends PercentSeries {
    _slice: Slice;
    _tick: PieTick;
    _label: AxisLabelCircular;
    _chart: PieChart;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IPieSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IPieSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPieSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IPieSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: PieSeriesDataItem;
    /**
     * Holds current angle for the next slice to start on.
     */
    protected _currentStartAngle: number;
    /**
     * Data items that fall to the left side of the pie.
     */
    protected _leftItems: this["_dataItem"][];
    /**
     * Data items that fall to the right side of the pie.
     */
    protected _rightItems: this["_dataItem"][];
    /**
     * [_arcRect description]
     *
     * @todo Description
     */
    protected _arcRect: IRectangle;
    /**
     * [_maxRadiusPercent description]
     *
     * @todo Description
     */
    protected _maxRadiusPercent: number;
    /**
     * [_pixelRadius description]
     *
     * @ignore this is set by pie chart, not by user
     */
    protected _pixelRadius: number;
    /**
     * [_pixelInnerRadius description]
     *
     * @ignore this is set by pie chart, not by user
     */
    protected _pixelInnerRadius: number;
    /**
     * @ignore
     */
    _startAngleInternal: number;
    /**
     * @ignore
     */
    _endAngleInternal: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * creates slice
     */
    protected createSlice(): this["_slice"];
    /**
     * creates tick
     */
    protected createTick(): this["_tick"];
    /**
     * creates label
     */
    protected createLabel(): this["_label"];
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Inits slice.
     *
     * @param slice to init
     */
    protected initSlice(slice: this["_slice"]): void;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * Outer radius for the series' slices in pixels or [[Percent]].
     *
     * @param value  Radius
     */
    /**
    * @return Radius
    */
    radius: number | Percent;
    /**
     * @return Radius
     * @ignore
     */
    /**
    * @ignore
    */
    pixelRadius: number;
    /**
     * @return Pixel inner radius
     * @ignore
     */
    /**
    * @ignore
    */
    pixelInnerRadius: number;
    /**
     * Inner radius for the series' slices in pixels.
     *
     * @ignore Exclude from docs
     * @todo Redo so that users can set it
     * @param value  Radius
     */
    /**
    * @ignore Exclude from docs
    * @return Radius
    */
    innerRadius: number | Percent;
    /**
     * Start angle for the series' slices in degrees. (0-360)
     *
     * @param value  Angle
     */
    /**
    * @return Angle
    */
    startAngle: number;
    /**
     * End angle for the series' slices in degrees. (0-360)
     *
     * @param value  Angle
     */
    /**
    * @return Angle
    */
    endAngle: number;
    /**
     * Positions series bullet.
     *
     * @ignore Exclude from docs
     * @param bullet  Bullet
     */
    positionBullet(bullet: Bullet): void;
    /**
     * Repositions bullet and labels when slice moves.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    protected handleSliceMove(event: AMEvent<this["_slice"], ISpriteEvents>["propertychanged"]): void;
    /**
     * Returns bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    readonly bbox: IRectangle;
}
