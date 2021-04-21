/**
 * Radar column series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, IColumnSeriesProperties, IColumnSeriesDataFields, IColumnSeriesAdapters, IColumnSeriesEvents, ColumnSeriesDataItem } from "../series/ColumnSeries";
import { Sprite } from "../../core/Sprite";
import { RadarChart } from "../types/RadarChart";
import { Axis } from "../axes/Axis";
import { RadarColumn } from "../elements/RadarColumn";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarColumnSeries]].
 *
 * @see {@link DataItem}
 */
export declare class RadarColumnSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * A sprite used to draw the column.
     */
    _column: RadarColumn;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: RadarColumnSeries;
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
 * Defines data fields for [[RadarColumnSeries]].
 */
export interface IRadarColumnSeriesDataFields extends IColumnSeriesDataFields {
}
/**
 * Defines properties for [[RadarColumnSeries]].
 */
export interface IRadarColumnSeriesProperties extends IColumnSeriesProperties {
}
/**
 * Defines events for [[RadarColumnSeries]].
 */
export interface IRadarColumnSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[RadarColumnSeries]].
 *
 * @see {@link Adapter}
 */
export interface IRadarColumnSeriesAdapters extends IColumnSeriesAdapters, IRadarColumnSeriesProperties {
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
 * @see {@link IRadarColumnSeriesEvents} for a list of available Events
 * @see {@link IRadarColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class RadarColumnSeries extends ColumnSeries {
    /**
     * Type of data item.
     */
    _dataItem: RadarColumnSeriesDataItem;
    /**
     * Type of column.
     */
    _column: RadarColumn;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IRadarColumnSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IRadarColumnSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IRadarColumnSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IRadarColumnSeriesEvents;
    /**
     * A chart series belongs to.
     */
    _chart: RadarChart;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates and returns a RadarColumn element to use as column in radar chart.
     *
     * @return RadarColumn.
     */
    protected createColumnTemplate(): this["_column"];
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * @ignore
     */
    protected disableUnusedColumns(dataItem: ColumnSeriesDataItem): void;
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
    getPoint(dataItem: RadarColumnSeriesDataItem, xKey: string, yKey: string, locationX?: number, locationY?: number, stackKeyX?: string, stackKeyY?: string): {
        x: number;
        y: number;
    };
    /**
     * Returns an SVG path to be used as a mask for the series.
     *
     * @return SVG path
     */
    protected getMaskPath(): string;
    protected positionBulletReal(bullet: Sprite, positionX: number, positionY: number): void;
    protected setXAxis(axis: Axis): void;
    protected setYAxis(axis: Axis): void;
    protected updateRendererRefs(): void;
}
