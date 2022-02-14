/**
 * Curve step line series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CurveLineSeries, CurveLineSeriesDataItem, ICurveLineSeriesAdapters, ICurveLineSeriesDataFields, ICurveLineSeriesEvents, ICurveLineSeriesProperties } from "./CurveLineSeries";
import { StepLineSeriesSegment } from "../../charts/series/StepLineSeriesSegment";
import { IPoint } from "../../core/defs/IPoint";
import { CurveChart } from "./CurveChart";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveStepLineSeries]].
 *
 * @see {@link DataItem}
 */
export declare class CurveStepLineSeriesDataItem extends CurveLineSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: CurveStepLineSeries;
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
 * Defines data fields for [[CurveStepLineSeries]].
 */
export interface ICurveStepLineSeriesDataFields extends ICurveLineSeriesDataFields {
}
/**
 * Defines properties for [[CurveStepLineSeries]].
 */
export interface ICurveStepLineSeriesProperties extends ICurveLineSeriesProperties {
    /**
     * Relative location in cell where step should start.
     *
     * @default 0
     */
    startLocation?: number;
    /**
     * Relative location in cell where step should end.
     *
     * @default 1
     */
    endLocation?: number;
}
/**
 * Defines events for [[CurveStepLineSeries]].
 */
export interface ICurveStepLineSeriesEvents extends ICurveLineSeriesEvents {
}
/**
 * Defines adapters for [[CurveStepLineSeries]].
 *
 * @see {@link Adapter}
 */
export interface ICurveStepLineSeriesAdapters extends ICurveLineSeriesAdapters, ICurveStepLineSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a radar graph.
 *
 * @see {@link ICurveStepLineSeriesEvents} for a list of available Events
 * @see {@link ICurveStepLineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class CurveStepLineSeries extends CurveLineSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ICurveStepLineSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICurveStepLineSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurveStepLineSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ICurveStepLineSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: CurveStepLineSeriesDataItem;
    /**
     * A chart series belongs to.
     */
    _chart: CurveChart;
    /**
     * Defines type for segment.
     */
    _segment: StepLineSeriesSegment;
    protected _previousPosition: number;
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
     * @ignore
     * @todo Description
     * @param points    [description]
     * @param dataItem  [description]
     * @param xField    [description]
     * @param yField    [description]
     * @param backwards [description]
     */
    protected addPoints(points: IPoint[], dataItem: this["_dataItem"], xField: string, yField: string, backwards?: boolean): void;
    /**
     * Relative location in cell where step should start.
     *
     * @default 0
     * @param value Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    startLocation: number;
    /**
     * Relative location in cell where step should end.
     *
     * @default 1
     * @param value Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    endLocation: number;
}
