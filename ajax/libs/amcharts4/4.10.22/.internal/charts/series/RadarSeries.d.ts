/**
 * Radar series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LineSeries, LineSeriesDataItem, ILineSeriesDataFields, ILineSeriesProperties, ILineSeriesAdapters, ILineSeriesEvents } from "./LineSeries";
import { LineSeriesSegment } from "./LineSeriesSegment";
import { IPoint } from "../../core/defs/IPoint";
import { Axis } from "../axes/Axis";
import { RadarChart } from "../types/RadarChart";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarSeries]].
 *
 * @see {@link DataItem}
 */
export declare class RadarSeriesDataItem extends LineSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: RadarSeries;
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
 * Defines data fields for [[RadarSeries]].
 */
export interface IRadarSeriesDataFields extends ILineSeriesDataFields {
}
/**
 * Defines properties for [[RadarSeries]].
 */
export interface IRadarSeriesProperties extends ILineSeriesProperties {
    /**
     * Should the last and and first data points be connected, forming a complete
     * closed circle?
     *
     * @default true
     */
    connectEnds?: boolean;
}
/**
 * Defines events for [[RadarSeries]].
 */
export interface IRadarSeriesEvents extends ILineSeriesEvents {
}
/**
 * Defines adapters for [[RadarSeries]].
 *
 * @see {@link Adapter}
 */
export interface IRadarSeriesAdapters extends ILineSeriesAdapters, IRadarSeriesProperties {
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
 * @see {@link IRadarSeriesEvents} for a list of available Events
 * @see {@link IRadarSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class RadarSeries extends LineSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IRadarSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IRadarSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IRadarSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IRadarSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: RadarSeriesDataItem;
    /**
     * A chart series belongs to.
     */
    _chart: RadarChart;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
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
    getPoint(dataItem: RadarSeriesDataItem, xKey: string, yKey: string, locationX?: number, locationY?: number, stackKeyX?: string, stackKeyY?: string): {
        x: number;
        y: number;
    };
    /**
     * [addPoints description]
     *
     * @todo Description
     * @param points    [description]
     * @param dataItem  [description]
     * @param xField    [description]
     * @param yField    [description]
     * @param backwards [description]
     */
    protected addPoints(points: IPoint[], dataItem: this["_dataItem"], xField: string, yField: string, backwards?: boolean): void;
    /**
     * Returns an SVG path to be used as a mask for the series.
     *
     * @return SVG path
     */
    protected getMaskPath(): string;
    /**
     * [drawSegment description]
     *
     * @todo Description
     * @param segment      [description]
     * @param points       [description]
     * @param closePoints  [description]
     */
    protected drawSegment(segment: LineSeriesSegment, points: IPoint[], closePoints: IPoint[]): void;
    /**
     * Should the last and and first data points be connected, forming a complete
     * closed circle?
     *
     * @default true
     * @param value  Connect?
     */
    /**
    * @return Connect?
    */
    connectEnds: boolean;
    protected positionBulletReal(bullet: Sprite, positionX: number, positionY: number): void;
    protected setXAxis(axis: Axis): void;
    protected setYAxis(axis: Axis): void;
    protected updateRendererRefs(): void;
}
