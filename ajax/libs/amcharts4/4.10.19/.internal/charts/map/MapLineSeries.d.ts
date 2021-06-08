/**
 * Map line series module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapSeries, MapSeriesDataItem, IMapSeriesProperties, IMapSeriesDataFields, IMapSeriesAdapters, IMapSeriesEvents } from "./MapSeries";
import { MapChart } from "../types/MapChart";
import { MapLine } from "./MapLine";
import { ListTemplate } from "../../core/utils/List";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapLineSeries]]
 * @see {@link DataItem}
 */
export declare class MapLineSeriesDataItem extends MapSeriesDataItem {
    /**
     * A [[MapLine]] element related to this data item.
     */
    _mapLine: MapLine;
    /**
     * A collection of X/Y coordinates for a single-segment line.
     */
    protected _line: Array<[number, number]>;
    /**
     * A collection of X/Y coordinates for a multi-segment line.
     */
    protected _multiLine: Array<Array<[number, number]>>;
    /**
     * A collection of lat/long coordinates for a single-segment line.
     */
    protected _geoLine: Array<IGeoPoint>;
    /**
     * A collection of lat/long coordinates for a multi-segment line.
     */
    protected _multiGeoLine: Array<Array<IGeoPoint>>;
    /**
     * Defines a type of [[Component]] this data item is used for
     */
    _component: MapLineSeries;
    /**
     * Constructor
     */
    constructor();
    getFeature(): {
        "type": "Feature";
        geometry: {
            type: "MultiLineString";
            coordinates: Array<Array<[number, number]>>;
        };
    };
    /**
     * A [[MapLine]] element related to this data item.
     *
     * @readonly
     * @return Element
     */
    readonly mapLine: this["_mapLine"];
    /**
     * A collection of X/Y coordinates for a single-segment line. E.g.:
     *
     * ```JSON
     * [
     *   [ 100, 150 ],
     *   [ 120, 200 ]
     * ]
     * ```
     *
     * @param line  Coordinates
     */
    /**
    * @return Coordinates
    */
    line: Array<[number, number]>;
    /**
     * A collection of X/Y coordinates for a multi-segment line. E.g.:
     *
     * ```JSON
     * [
     *   // Segment 1
     *   [
     *     [ 100, 150 ],
     *     [ 120, 200 ]
     *   ],
     *
     *   // Segment 2
     *   [
     *     [ 120, 200 ],
     *     [ 150, 100 ]
     *   ]
     * ]
     * ```
     *
     * @param multiLine  Coordinates
     */
    /**
    * @return Coordinates
    */
    multiLine: Array<Array<[number, number]>>;
    /**
     * A collection of lat/long coordinates for a single-segment line. E.g.:
     *
     * ```JSON
     * [
     *   { longitude: 3.121, latitude: 0.58 },
     *   { longitude: -5.199, latitude: 21.223 }
     * ]
     * ```
     *
     * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.4} GeoJSON LineString reference
     * @param geoLine  Coordinates
     */
    /**
    * @return Coordinates
    */
    geoLine: Array<IGeoPoint>;
    /**
     * A collection of X/Y coordinates for a multi-segment line. E.g.:
     *
     * ```JSON
     * [
     *   // Segment 1
     *   [
     *     { longitude: 3.121, latitude: 0.58 },
     *     { longitude: -5.199, latitude: 21.223 }
     *   ],
     *
     *   // Segment 2
     *   [
     *     { longitude: -5.199, latitude: 21.223 },
     *     { longitude: -12.9, latitude: 25.85 }
     *   ]
     * ]
     * ```
     *
     * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.5} GeoJSON MultiLineString reference
     * @param multiGeoLine  Coordinates
     */
    /**
    * @return Coordinates
    */
    multiGeoLine: Array<Array<IGeoPoint>>;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[MapLineSeries]].
 */
export interface IMapLineSeriesDataFields extends IMapSeriesDataFields {
    /**
     * Field name that holds line data in pixels.
     */
    line?: string;
    /**
     * Field name that holds multi-line data in pixels.
     */
    multiLine?: string;
    /**
     * Field name that holds line data in Geo coordinates.
     */
    geoLine?: string;
    /**
     * Field name that holds multi-line data in Geo coordinates.
     */
    multiGeoLine?: string;
}
/**
 * Defines properties for [[MapLineSeries]].
 */
export interface IMapLineSeriesProperties extends IMapSeriesProperties {
}
/**
 * Defines events for [[MapLineSeries]].
 */
export interface IMapLineSeriesEvents extends IMapSeriesEvents {
}
/**
 * Defines adapters for [[MapLineSeries]].
 *
 * @see {@link Adapter}
 */
export interface IMapLineSeriesAdapters extends IMapSeriesAdapters, IMapLineSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map line series.
 *
 * @see {@link IMapLineSeriesEvents} for a list of available Events
 * @see {@link IMapLineSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class MapLineSeries extends MapSeries {
    /**
     * Defines available data fields.
     */
    _dataFields: IMapLineSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IMapLineSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapLineSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IMapLineSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: MapLineSeriesDataItem;
    /**
     * A related chart/map object, this element is drawn on.
     */
    chart: MapChart;
    /**
     * Defines the type of the line items in this series.
     */
    _mapLine: MapLine;
    /**
     * A list of map lins in the series.
     */
    protected _mapLines: ListTemplate<this["_mapLine"]>;
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
     * (Re)validates series data, effectively causing the whole series to be
     * redrawn.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * A list of lines in the series.
     *
     * @return Lines
     */
    readonly mapLines: ListTemplate<this["_mapLine"]>;
    /**
     * Returns a new line instance of suitable type.
     *
     * @return New line
     */
    protected createLine(): this["_mapLine"];
    /**
     * (Re)validates the series
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
     * @ignore
     */
    getFeatures(): {
        "type": "Feature";
        geometry: {
            type: "MultiLineString";
            coordinates: Array<Array<[number, number]>>;
        };
    }[];
    /**
     * returns MapLine by id
     * @param line id
     * @return {MapLine}
     */
    getLineById(id: string): MapLine;
}
