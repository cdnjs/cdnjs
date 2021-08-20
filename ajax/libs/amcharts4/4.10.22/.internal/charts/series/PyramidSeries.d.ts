/**
 * Defines Pyramid Series.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IFunnelSeriesAdapters, IFunnelSeriesDataFields, IFunnelSeriesEvents, IFunnelSeriesProperties, FunnelSeries, FunnelSeriesDataItem } from "./FunnelSeries";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PyramidSeries]].
 *
 * @see {@link DataItem}
 */
export declare class PyramidSeriesDataItem extends FunnelSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: PyramidSeries;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[PyramidSeries]].
 */
export interface IPyramidSeriesDataFields extends IFunnelSeriesDataFields {
}
/**
 * Defines properties for [[PyramidSeries]].
 */
export interface IPyramidSeriesProperties extends IFunnelSeriesProperties {
    /**
     * Bottom width in pixels or percent
     */
    bottomWidth?: number | Percent;
    /**
     * Top width in pixels or percent
     */
    topWidth?: number | Percent;
    /**
     * Height of pyramid
     */
    pyramidHeight?: number | Percent;
    /**
     * Indicates whether slice value should sould influence its height or area
     * size.
     *
     * @default "area"
     */
    valueIs?: "height" | "area";
}
/**
 * Defines events for [[PyramidSeries]].
 */
export interface IPyramidSeriesEvents extends IFunnelSeriesEvents {
}
/**
 * Defines adapters for [[PyramidSeries]].
 *
 * @see {@link Adapter}
 */
export interface IPyramidSeriesAdapters extends IFunnelSeriesAdapters, IPyramidSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a FunnelSlice series on a [[SlicedChart]].
 *
 * @see {@link IPyramidSeriesEvents} for a list of available Events
 * @see {@link IPyramidSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
export declare class PyramidSeries extends FunnelSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IPyramidSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IPyramidSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPyramidSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IPyramidSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: PyramidSeriesDataItem;
    /**
     * [_nextWidth description]
     *
     * @todo Description
     */
    protected _nextWidth: number;
    protected _pyramidHeight: number;
    protected _pyramidWidth: number;
    /**
     * Constructor
     */
    constructor();
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
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * [getNextValue description]
     *
     * @todo Description
     * @param dataItem [description]
     * @return [description]
     */
    protected getNextValue(dataItem: FunnelSeriesDataItem): number;
    /**
     * [validateDataElements description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    validateDataElements(): void;
    /**
     * [decorateSlice description]
     *
     * @todo Description
     * @param dataItem [description]
     */
    protected decorateSlice(dataItem: this["_dataItem"]): void;
    /**
     * Width of the pyramid's tip in pixels or relative (`Percent`).
     *
     * `0%` (default) means the pyramid will be perfectly pointy.
     * `50%` will have a cut off / blunt top that is half the width of the chart.
     * `100%` will take the whole width of the chart.
     *
     * If you need the downward-pointing pyramid, you might want to `topWidth` to
     * `100%` and `bottomWidth` to `0%`.
     *
     * @default 0%
     * @param {number | Percent}
     */
    /**
    * @return {number | Percent}
    */
    topWidth: number | Percent;
    /**
     * Height of pyramid
     *
     *
     * @default 100%
     * @param {number | Percent}
     */
    /**
    * @return {number | Percent}
    */
    pyramidHeight: number | Percent;
    /**
     * Width of the pyramid's bottom (bsae) in pixels or relative (`Percent`).
     *
     * `0%` means the pyramid's botto will be pointy.
     * `50%` will have a cut off / blunt bottom that is half the width of the chart.
     * `100%` (default) will take the whole width of the chart.
     *
     * If you need the downward-pointing pyramid, you might want to `topWidth` to
     * `100%` and `bottomWidth` to `0%`.
     *
     * @param {number | Percent}
     */
    /**
    * @return {number | Percent}
    */
    bottomWidth: number | Percent;
    /**
     * Indicates how slice's value will influence its size.
     *
     * `"area"` (default) means that the whole area of the pyramid (counting in
     * modifications by `topWidth` and `bottomWidth`) will be divvied up between
     * slices based on their value.
     *
     * With this setting at `"area"` the area of the trapezoids of each slice
     * will represent their value relatively to values of the other slices.
     *
     * This is a correct way to depict "weight" of each slice based on their
     * values.
     *
     * `"height"` means whole height (as opposed to area) of the pyramid will be
     * divvied up between slices. Actual slice width or area is not counted in.
     *
     * From the data-viz standpoint this does not make a lot of sense, since
     * slices with lesser values might appear more prominent if they are placed
     * towards thick end of the pyramid since their areas will be bigger.
     *
     * @default "area"
     * @param {"area" | "height"}
     */
    /**
    * @return {"area" | "height"}
    */
    valueIs: "area" | "height";
}
