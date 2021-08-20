/**
 * Map polygon series module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapSeries, MapSeriesDataItem, IMapSeriesProperties, IMapSeriesDataFields, IMapSeriesAdapters, IMapSeriesEvents } from "./MapSeries";
import { MapChart } from "../types/MapChart";
import { MapPolygon } from "./MapPolygon";
import { ListTemplate } from "../../core/utils/List";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapPolygonSeries]]
 * @see {@link DataItem}
 */
export declare class MapPolygonSeriesDataItem extends MapSeriesDataItem {
    /**
     * A [[MapPolygon]] element related to this data item.
     */
    protected _mapPolygon: MapPolygon;
    /**
     * A collection of X/Y coordinates for a single polygon.
     */
    protected _polygon: Array<Array<[number, number]>>;
    /**
     * A collection of X/Y coordinates for a multi-part polygon.
     */
    protected _multiPolygon: Array<Array<Array<[number, number]>>>;
    /**
     * A collection of lat/long coordinates for a single polygon.
     */
    protected _geoPolygon: [Array<IGeoPoint>, Array<IGeoPoint>];
    /**
     * A collection of lat/long coordinates for a multi-part polygon.
     */
    protected _multiGeoPolygon: Array<[Array<IGeoPoint>, Array<IGeoPoint>]>;
    /**
     * Defines a type of [[Component]] this data item is used for
     */
    _component: MapPolygonSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    getFeature(): {
        "type": "Feature";
        geometry: {
            type: "MultiPolygon";
            coordinates: Array<Array<Array<[number, number]>>>;
        };
    };
    /**
     * A [[MapPolygon]] element related to this data item.
     *
     * @readonly
     * @return Element
     */
    readonly mapPolygon: MapPolygon;
    /**
     * A collection of X/Y coordinates for a single polygon. E.g.:
     *
     * ```JSON
     * [
     *   [
     *     [ 100, 150 ],
     *     [ 120, 200 ],
     *     [ 150, 200 ],
     *     [ 170, 240 ],
     *     [ 100, 150 ]
     *   ]
     * ]
     * ```
     *
     * @param polygon  Coordinates
     */
    /**
    * @return Coordinates
    */
    polygon: Array<Array<[number, number]>>;
    /**
     * A collection of X/Y coordinates for a multi-part polygon. E.g.:
     *
     * ```JSON
     * [
     *   // Part 1
     *   [
     *     [
     *       [ 100, 150 ],
     *       [ 120, 200 ],
     *       [ 150, 220 ],
     *       [ 170, 240 ],
     *       [ 100, 150 ]
     *     ]
     *   ],
     *
     *   // Part 2
     *   [
     *     [
     *       [ 300, 350 ],
     *       [ 320, 400 ],
     *       [ 350, 420 ],
     *       [ 370, 440 ],
     *       [ 300, 350 ]
     *     ]
     *   ]
     * ]
     * ```
     *
     * @param multiPolygon  Coordinates
     */
    /**
    * @return Coordinates
    */
    multiPolygon: Array<Array<Array<[number, number]>>>;
    /**
     * A collection of lat/long coordinates for a single polygon. E.g.:
     *
     * ```JSON
     * [
     *   [
     *     { latitude: -10.0, longitude: -10.0 },
     *     { latitude: 10.0, longitude: -10.0 },
     *     { latitude: 10.0, longitude: 10.0 },
     *     { latitude: -10.0, longitude: -10.0 }
     *   ]
     * ]
     * ```
     *
     * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.6} GeoJSON Polygon reference
     * @param geoPolygon  Coordinates
     */
    /**
    * @return Coordinates
    */
    geoPolygon: [Array<IGeoPoint>, Array<IGeoPoint>];
    /**
     * A collection of lat/long coordinates for a multi-part polygon. E.g.:
     *
     * ```JSON
     * [
     *   [
     *     [
     *       { longitude: 180.0, latitude: 40.0 },
     *       { longitude: 180.0, latitude: 50.0 },
     *       { longitude: 170.0, latitude: 50.0 },
     *       { longitude: 170.0, latitude: 40.0 },
     *       { longitude: 180.0, latitude: 40.0 }
     *     ]
     *   ],
     *   [
     *     [
     *       { longitude: -170.0, latitude: 40.0 },
     *       { longitude: -170.0, latitude: 50.0 },
     *       { longitude: -180.0, latitude: 50.0 },
     *       { longitude: -180.0, latitude: 40.0 },
     *       { longitude: -170.0, latitude: 40.0 }
     *     ]
     *   ]
     * ]
     * ```
     *
     * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.7} GeoJSON MultiPolygon reference
     * @param multiGeoPolygon  Coordinates
     */
    /**
    * @return Coordinates
    */
    multiGeoPolygon: Array<[Array<IGeoPoint>, Array<IGeoPoint>]>;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[MapPolygonSeries]].
 */
export interface IMapPolygonSeriesDataFields extends IMapSeriesDataFields {
    /**
     * Field name that holds polygon pixels.
     */
    polygon?: string;
    /**
     * Field name that holds multi-polygon pixels.
     */
    multiPolygon?: string;
    /**
     * Field name that holds polygon data in Geo coordinates.
     */
    geoPolygon?: string;
    /**
     * Field name that holds poly-polygon data in Geo coordinates.
     */
    multiGeoPolygon?: string;
}
/**
 * Defines properties for [[MapPolygonSeries]].
 */
export interface IMapPolygonSeriesProperties extends IMapSeriesProperties {
    /**
     * How to order polygons in actual SVG document. Affects selection order
     * using TAB key.
     *
     * @since 4.9.36
     */
    sortPolygonsBy: "area" | "name" | "longitude" | "latitude" | "id" | "none";
    /**
     * If `sortPolygonsBy` is set to something other than `"none"`, polygons
     * will be sorted by the given parameter, using natural sort direction.
     *
     * Setting `sortPolygonsReversed = true` will reverse this direction.
     *
     * @since 4.9.36
     */
    sortPolygonsReversed: boolean;
}
/**
 * Defines events for [[MapPolygonSeries]].
 */
export interface IMapPolygonSeriesEvents extends IMapSeriesEvents {
}
/**
 * Defines adapters for [[MapPolygonSeries]].
 *
 * @see {@link Adapter}
 */
export interface IMapPolygonSeriesAdapters extends IMapSeriesAdapters, IMapPolygonSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map polygon elements.
 *
 * @see {@link IMapPolygonSeriesEvents} for a list of available Events
 * @see {@link IMapPolygonSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class MapPolygonSeries extends MapSeries {
    /**
     * Defines available data fields.
     */
    _dataFields: IMapPolygonSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IMapPolygonSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapPolygonSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IMapPolygonSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: MapPolygonSeriesDataItem;
    /**
     * A related chart/map object, this element is drawn on.
     */
    chart: MapChart;
    /**
     * A list of map polygons in the series.
     */
    protected _mapPolygons: ListTemplate<MapPolygon>;
    /**
     * Indicates if series should automatically calculate visual center of the
     * polygons (accessible via `visualLongitude` and `visualLatitude` properties
     * of the [[MapPolygon]]).
     *
     * @default false
     * @since 4.3.0
     */
    calculateVisualCenter: boolean;
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
     * @ignore
     */
    protected processIncExc(): void;
    /**
     * (Re)validates series data, effectively causing the whole series to be
     * redrawn.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * (Re)validates the series
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * List of polygon elements in the series.
     *
     * @return Polygon list
     */
    readonly mapPolygons: ListTemplate<MapPolygon>;
    /**
     * returns MapPolygon by id in geoJSON file
     * @param polygon id
     * @return {MapPolygon}
     */
    getPolygonById(id: string): MapPolygon;
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
            type: "MultiPolygon";
            coordinates: Array<Array<Array<[number, number]>>>;
        };
    }[];
    /**
     * How to order polygons in actual SVG document. Affects selection order
     * using TAB key.
     *
     * Available options: `"area"` (default), `"name"`, `"longitude"`,
     * `"latitude"`, `"id"`, and `"none"`.
     *
     * @default area
     * @since 4.9.36
     * @param value  How to sort map polygons
     */
    /**
    * @return How to sort map polygons
    */
    sortPolygonsBy: "area" | "name" | "longitude" | "latitude" | "id" | "none";
    /**
     * If `sortPolygonsBy` is set to something other than `"none"`, polygons
     * will be sorted by the given parameter, using natural sort direction.
     *
     * Setting `sortPolygonsReversed = true` will reverse this direction.
     *
     * @default false
     * @since 4.9.36
     * @param value  Reverse polygon sort direction
     */
    /**
    * @return Reverse polygon sort direction
    */
    sortPolygonsReversed: boolean;
}
