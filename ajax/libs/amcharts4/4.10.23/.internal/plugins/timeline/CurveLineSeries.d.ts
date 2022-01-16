/**
 * Curve line series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LineSeries, LineSeriesDataItem, ILineSeriesDataFields, ILineSeriesProperties, ILineSeriesAdapters, ILineSeriesEvents } from "../../charts/series/LineSeries";
import { LineSeriesSegment } from "../../charts/series/LineSeriesSegment";
import { Axis } from "../../charts/axes/Axis";
import { IPoint } from "../../core/defs/IPoint";
import { CurveChart } from "./CurveChart";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveLineSeries]].
 *
 * @see {@link DataItem}
 */
export declare class CurveLineSeriesDataItem extends LineSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: CurveLineSeries;
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
 * Defines data fields for [[CurveLineSeries]].
 */
export interface ICurveLineSeriesDataFields extends ILineSeriesDataFields {
}
/**
 * Defines properties for [[CurveLineSeries]].
 */
export interface ICurveLineSeriesProperties extends ILineSeriesProperties {
    /**
     * Should the last and and first data points be connected, forming a complete
     * closed circle?
     *
     * @default false
     */
    connectEnds?: boolean;
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
 * Defines events for [[CurveLineSeries]].
 */
export interface ICurveLineSeriesEvents extends ILineSeriesEvents {
}
/**
 * Defines adapters for [[CurveLineSeries]].
 *
 * @see {@link Adapter}
 */
export interface ICurveLineSeriesAdapters extends ILineSeriesAdapters, ICurveLineSeriesProperties {
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
 * @see {@link ICurveLineSeriesEvents} for a list of available Events
 * @see {@link ICurveLineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class CurveLineSeries extends LineSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ICurveLineSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICurveLineSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurveLineSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ICurveLineSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: CurveLineSeriesDataItem;
    /**
     * A chart series belongs to.
     */
    _chart: CurveChart;
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
    getPoint(dataItem: CurveLineSeriesDataItem, xKey: string, yKey: string, locationX?: number, locationY?: number, stackKeyX?: string, stackKeyY?: string): {
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
     * @default false
     * @param  value  Connect?
     */
    /**
    * @return Connect?
    */
    connectEnds: boolean;
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
     * @param {Sprite} bullet    [description]
     * @param {number} positionX [description]
     * @param {number} positionY [description]
     */
    protected positionBulletReal(bullet: Sprite, positionX: number, positionY: number): void;
    protected setXAxis(axis: Axis): void;
    protected setYAxis(axis: Axis): void;
    protected updateRendererRefs(): void;
}
