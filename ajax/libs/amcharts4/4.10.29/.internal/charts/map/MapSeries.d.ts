/**
 * Map series module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem, ISeriesProperties, ISeriesDataFields, ISeriesAdapters, ISeriesEvents } from "../series/Series";
import { MapChart } from "../types/MapChart";
import { MapObject } from "./MapObject";
import { IListEvents } from "../../core/utils/List";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
import { DataSource } from "../../core/data/DataSource";
import { ListTemplate } from "../../core/utils/List";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapSeries]].
 *
 * @see {@link DataItem}
 */
export declare class MapSeriesDataItem extends SeriesDataItem {
    /**
     * South-most latitude.
     */
    protected _south: number;
    /**
     * North-most latitude.
     */
    protected _north: number;
    /**
     * East-most longitude.
     */
    protected _east: number;
    /**
     * West-most longitude.
     */
    protected _west: number;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: MapSeries;
    /**
     * Shortcut to either [[MapLine]], [[MapImage]], or [[MapPolygon]].
     */
    mapObject: MapObject;
    /**
     * Constructor
     */
    constructor();
    /**
     * Numeric value of the data item.
     *
     * Value may be used in heat-map calculations.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: number;
    /**
     * When `zoomToMapObject()` is called the map will either calculate suitable
     * zoom level itself or use object's `zoomLevel` if set.
     *
     * @param value  Zoom level
     */
    /**
    * @return Zoom level
    */
    zoomLevel: number;
    /**
     * When `zoomToMapObject()` is called the map will either calculate suitable
     * center position itself or use object's `zoomGeoPoint` if set.
     *
     * @param value  Zoom geo point
     */
    /**
    * @return Zoom geo point
    */
    zoomGeoPoint: IGeoPoint;
    /**
     * Longitude of the East-most point of the element.
     */
    readonly east: number;
    /**
     * Longitude of the West-most point of the element.
     */
    readonly west: number;
    /**
     * Latitude of the South-most point of the element.
     */
    readonly south: number;
    /**
     * Latitude of the North-most point of the element.
     */
    readonly north: number;
    /**
     * Updates the item's bounding coordinates: coordinates of the East, West,
     * North, and South-most points.
     *
     * @ignore Exclude from docs
     */
    updateExtremes(): void;
    getFeature(): any;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * [GEOJSONGeometry description]
 *
 * @todo Description
 */
export declare type GEOJSONGeometry = "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon";
/**
 * Defines data fields for [[MapSeries]].
 *
 * @todo Alllow any number of values?
 */
export interface IMapSeriesDataFields extends ISeriesDataFields {
    /**
     * A field name in data for a numeric value of the map object.
     */
    value?: string;
    /**
     * A field name in data for a `zoomLevel` of the map object.
     */
    zoomLevel?: string;
    /**
     * A field name in data for a `zoomGeoPoint` of the map object.
     */
    zoomGeoPoint?: string;
}
/**
 * Defines properties for [[MapSeries]].
 */
export interface IMapSeriesProperties extends ISeriesProperties {
    /**
     * A flag telling if the series should get data from `geodata` or not
     *
     * @default false
     */
    useGeodata?: boolean;
    /**
     * A list of object ids to include from the series.
     */
    include?: string[];
    /**
     * A list of object ids to exclude from the series.
     */
    exclude?: string[];
    /**
     * Should this series be included when calculating bounds of the map?
     *
     * This affects initial zoom as well as limits for zoom/pan.
     *
     * By default, `MapPolygonSeries` included (true), while `MapImageSeries` and
     * `MapLineSeries` are not (`false`).
     */
    ignoreBounds?: boolean;
    /**
     * Indicates whether GeoJSON geodata supplied to the chart uses
     * ESRI (clockwise) or non-ESRI (counter-clockwise) order of the polygon
     * coordinates.
     *
     * `MapChart` supports only ESRI standard, so if your custom maps appears
     * garbled, try setting `reverseGeodata = true`.
     *
     * @default false
     * @since 4.10.11
     */
    reverseGeodata?: boolean;
}
/**
 * Defines events for [[MapSeries]].
 */
export interface IMapSeriesEvents extends ISeriesEvents {
    geoBoundsChanged: {};
}
/**
 * Defines adapters for [[MapSeries]].
 *
 * @see {@link Adapter}
 */
export interface IMapSeriesAdapters extends ISeriesAdapters, IMapSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for series of map objects.
 *
 * @see {@link IMapSeriesEvents} for a list of available Events
 * @see {@link IMapSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class MapSeries extends Series {
    /**
     * Defines available data fields.
     */
    _dataFields: IMapSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IMapSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IMapSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: MapSeriesDataItem;
    /**
     * The longitude of the East-most point in the series. (out of all elements)
     */
    protected _east: number;
    /**
     * The longitude of the West-most point in the series. (out of all elements)
     */
    protected _west: number;
    /**
     * The latitude of the South-most point in the series. (out of all elements)
     */
    protected _south: number;
    /**
     * The latitude of the North-most point in the series. (out of all elements)
     */
    protected _north: number;
    protected _eastDefined: number;
    protected _westDefined: number;
    protected _southDefined: number;
    protected _northDefined: number;
    /**
     * A chart series belongs to.
     */
    _chart: MapChart;
    /**
     * Map data in GeoJSON format.
     *
     * @see {@link http://geojson.org/} GeoJSON official specification
     */
    protected _geodata: Object;
    protected _mapObjects: ListTemplate<MapObject>;
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
     * Checks whether object should be included in series.
     *
     * @param includes  A list of explicitly included ids
     * @param excludes  A list of explicitly excluded ids
     * @param id        Id of the object
     * @return Include?
     */
    protected checkInclude(includes: string[], excludes: string[], id: string): boolean;
    /**
     * Should the map extract all the data about element from the GeoJSON?
     *
     * This is especially relevant for [[MapPolygonSeries]]. If not set to `true`
     * polygon series will need to contain geographical data in itself in order
     * to be drawn.
     *
     * If this is set to `true`, series will try to extract data for its objects
     * from either chart-level `geodata` or from series' `geodata` which holds
     * map infor in GeoJSON format.
     *
     * @default false
     * @param value  Use GeoJSON data?
     */
    /**
    * @return Use GeoJSON data?
    */
    useGeodata: boolean;
    /**
     * A list of object ids that should be explictly included in the series.
     *
     * If this is not set, the series will automatically include all of the
     * objects, available in the GeoJSON map. (minus the ones listed in
     * `exclude`)
     *
     * If you need to display only specific objects, use `include`. E.g.:
     *
     * `include = ["FR", "ES", "DE"];`
     *
     * The above will show only France, Spain, and Germany out of the whole map.
     *
     * @param value  Included objects
     */
    /**
    * @return Included objects
    */
    include: string[];
    /**
     * @ignore
     */
    protected processIncExc(): void;
    /**
     * Should this series be included when calculating bounds of the map?
     *
     * This affects initial zoom as well as limits for zoom/pan.
     *
     * By default, `MapPolygonSeries` included (true), while `MapImageSeries` and
     * `MapLineSeries` are not (`false`).
     *
     * @since 4.3.0
     * @param  value  Ignore bounds?
     */
    /**
    * @return Ignore bounds?
    */
    ignoreBounds: boolean;
    /**
     * A list of object ids that should be excluded from the series.
     *
     * E.g. you want to include all of the areas from a GeoJSON map, except
     * Antarctica.
     *
     * You'd leave `include` empty, and set `exclude = ["AQ"]`.
     *
     * @param value  Excluded ids
     */
    /**
    * @return Excluded ids
    */
    exclude: string[];
    /**
     * Decorates a newly added object.
     *
     * @param event [description]
     */
    protected handleObjectAdded(event: IListEvents<MapObject>["inserted"]): void;
    /**
     * Map data in GeoJSON format.
     *
     * The series supports the following GeoJSON objects: `Point`, `LineString`,
     * `Polygon`, `MultiPoint`, `MultiLineString`, and `MultiPolygon`.
     *
     * @see {@link http://geojson.org/} Official GeoJSON format specification
     * @param geoJSON GeoJSON data
     */
    /**
    * @return GeoJSON data
    */
    geodata: Object;
    /**
     * Indicates whether GeoJSON geodata supplied to the chart uses
     * ESRI (clockwise) or non-ESRI (counter-clockwise) order of the polygon
     * coordinates.
     *
     * `MapChart` supports only ESRI standard, so if your custom maps appears
     * garbled, try setting `reverseGeodata = true`.
     *
     * @default false
     * @since 4.10.11
     * @param  value  Reverse the order of geodata coordinates?
     */
    /**
    * @returns Reverse the order of geodata coordinates?
    */
    reverseGeodata: boolean;
    /**
     * Sets a [[DataSource]] to be used for loading Component's data.
     *
     * @param value Data source
     */
    /**
    * Returns a [[DataSource]] specifically for loading Component's data.
    *
    * @return Data source
    */
    geodataSource: DataSource;
    /**
     * @ignore
     */
    getFeatures(): {
        "type": "Feature";
        geometry: {
            type: "Point" | "MultiLineString" | "MultiPolygon";
            coordinates: [number, number] | Array<Array<[number, number]>> | Array<Array<Array<[number, number]>>>;
        };
    }[];
    /**
     * @ignore
     */
    validateDataItems(): void;
    /**
     * @ignore
     */
    updateExtremes(): void;
    /**
     * North-most latitude of the series.
     *
     * By default, this holds auto-calculated latitude of the extremity.
     *
     * It can be overridden manually.
     *
     * @param  value  Latitude
     */
    /**
    * @return Latitude
    */
    north: number;
    /**
     * South-most latitude of the series.
     *
     * By default, this holds auto-calculated latitude of the extremity.
     *
     * It can be overridden manually.
     *
     * @param  value  Latitude
     */
    /**
    * @return Latitude
    */
    south: number;
    /**
     * West-most longitude of the series.
     *
     * By default, this holds auto-calculated longitude of the extremity.
     *
     * It can be overridden manually.
     *
     * @param  value  Longitude
     */
    /**
    * @return Longitude
    */
    west: number;
    /**
     * East-most longitude of the series.
     *
     * By default, this holds auto-calculated longitude of the extremity.
     *
     * It can be overridden manually.
     *
     * @param  value  Longitude
     */
    /**
    * @return Longitude
    */
    east: number;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Adds `projection` to "as is" fields.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    protected asIs(field: string): boolean;
    /**
     * @ignore
     */
    updateTooltipBounds(): void;
}
