/**
 * Step line series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LineSeries, LineSeriesDataItem, ILineSeriesDataFields, ILineSeriesProperties, ILineSeriesAdapters, ILineSeriesEvents } from "./LineSeries";
import { StepLineSeriesSegment } from "./StepLineSeriesSegment";
import { IPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[StepLineSeries]].
 *
 * @see {@link DataItem}
 */
export declare class StepLineSeriesDataItem extends LineSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: StepLineSeries;
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
 * Defines data fields for [[StepLineSeries]].
 */
export interface IStepLineSeriesDataFields extends ILineSeriesDataFields {
}
/**
 * Defines properties for [[StepLineSeries]].
 */
export interface IStepLineSeriesProperties extends ILineSeriesProperties {
    noRisers?: boolean;
    startLocation?: number;
    endLocation?: number;
}
/**
 * Defines events for [[StepLineSeries]].
 */
export interface IStepLineSeriesEvents extends ILineSeriesEvents {
}
/**
 * Defines adapters for [[StepLineSeries]].
 *
 * @see {@link Adapter}
 */
export interface IStepLineSeriesAdapters extends ILineSeriesAdapters, IStepLineSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a step line graph.
 *
 * @see {@link IStepLineSeriesEvents} for a list of available Events
 * @see {@link IStepLineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class StepLineSeries extends LineSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IStepLineSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IStepLineSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IStepLineSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IStepLineSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: StepLineSeriesDataItem;
    /**
     * Defines type for segement.
     */
    _segment: StepLineSeriesSegment;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * [addPoints description]
     *
     * @todo Description
     * @param points     [description]
     * @param dataItem   [description]
     * @param xField     [description]
     * @param yField     [description]
     * @param backwards  [description]
     */
    protected addPoints(points: IPoint[], dataItem: this["_dataItem"], xField: string, yField: string, backwards?: boolean): void;
    /**
     * Draws the line segment.
     *
     * @param segment     Segment
     * @param points      Segment points
     * @param closePoints Segment close points
     */
    protected drawSegment(segment: StepLineSeriesSegment, points: IPoint[], closePoints: IPoint[]): void;
    /**
     * @ignore
     */
    protected createSegment(): this["_segment"];
    /**
     * Specifies if step line series should draw only horizontal (or only
     * vertical, depending on base axis) lines, instead of connecting them with
     * vertical (or horizontal) lines.
     *
     * @default false
     * @param value  No risers
     */
    /**
    * @return No risers
    */
    noRisers: boolean;
    /**
     * start location of the step
     *
     * @param value Location (0-1)
     * @default 0
     */
    /**
    * @return Location (0-1)
    */
    startLocation: number;
    /**
     * Step end location.
     *
     * @param value Location (0-1)
     * #default 1
     */
    /**
    * @return Location (0-1)
    */
    endLocation: number;
}
