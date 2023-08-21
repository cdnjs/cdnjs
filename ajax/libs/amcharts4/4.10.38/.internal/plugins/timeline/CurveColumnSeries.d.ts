/**
 * Curve column series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, IColumnSeriesProperties, IColumnSeriesDataFields, IColumnSeriesAdapters, IColumnSeriesEvents, ColumnSeriesDataItem } from "../../charts/series/ColumnSeries";
import { Sprite } from "../../core/Sprite";
import { CurveChart } from "./CurveChart";
import { Axis } from "../../charts/axes/Axis";
import { CurveColumn } from "./CurveColumn";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveColumnSeries]].
 *
 * @see {@link DataItem}
 */
export declare class CurveColumnSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * A sprite used to draw the column.
     */
    _column: CurveColumn;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: CurveColumnSeries;
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
 * Defines data fields for [[CurveColumnSeries]].
 */
export interface ICurveColumnSeriesDataFields extends IColumnSeriesDataFields {
}
/**
 * Defines properties for [[CurveColumnSeries]].
 */
export interface ICurveColumnSeriesProperties extends IColumnSeriesProperties {
    /**
     * A relative part of an series elements allowed outside of the outer edge of
     * the "plot area".
     */
    topOffset?: number;
    /**
     * A relative part of an series elements allowed outside of the inner edge of
     * the "plot area".
     */
    bottomOffset?: number;
}
/**
 * Defines events for [[CurveColumnSeries]].
 */
export interface ICurveColumnSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[CurveColumnSeries]].
 *
 * @see {@link Adapter}
 */
export interface ICurveColumnSeriesAdapters extends IColumnSeriesAdapters, ICurveColumnSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a 3D column graph.
 *
 * @see {@link ICurveColumnSeriesEvents} for a list of available Events
 * @see {@link ICurveColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class CurveColumnSeries extends ColumnSeries {
    /**
     */
    _dataItem: CurveColumnSeriesDataItem;
    /**
     */
    _column: CurveColumn;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ICurveColumnSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICurveColumnSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurveColumnSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ICurveColumnSeriesEvents;
    /**
     * A chart series belongs to.
     */
    _chart: CurveChart;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates and returns a CurveColumn element to use as column in radar chart.
     *
     * @return CurveColumn.
     */
    protected createColumnTemplate(): this["_column"];
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElementReal(dataItem: this["_dataItem"]): void;
    /**
     * Returns an [[IPoint]] coordinates of the specific Serie's data point.
     *
     * @param    dataItem   Data item
     * @param    xKey       Name of X data field
     * @param    yKey       Name of Y data field
     * @param    locationX  X location
     * @param    locationY  Y location
     * @param    stackKeyX  ?
     * @param    stackKeyY  ?
     * @returns             Coordinates
     */
    getPoint(dataItem: CurveColumnSeriesDataItem, xKey: string, yKey: string, locationX?: number, locationY?: number, stackKeyX?: string, stackKeyY?: string): {
        x: number;
        y: number;
    };
    /**
     * Returns an SVG path to be used as a mask for the series.
     *
     * @return SVG path
     */
    protected getMaskPath(): string;
    /**
     * A relative part of an series elements allowed outside of the outer edge of
     * the "plot area".
     *
     * @default 0.2
     * @param  value  Top offset
     */
    /**
    * @return Top offset
    */
    topOffset: number;
    /**
     * A relative part of an series elements allowed outside of the inner edge of
     * the "plot area".
     *
     * @default 0.2
     * @param  value  Bottom offset
     */
    /**
    * @return Bottom offset
    */
    bottomOffset: number;
    /**
     * [positionBulletReal description]
     *
     * @ignore
     * @param {Sprite} bullet    [description]
     * @param {number} positionX [description]
     * @param {number} positionY [description]
     */
    protected positionBulletReal(bullet: Sprite, positionX: number, positionY: number): void;
    protected setXAxis(axis: Axis): void;
    protected setYAxis(axis: Axis): void;
    protected updateRendererRefs(): void;
}
