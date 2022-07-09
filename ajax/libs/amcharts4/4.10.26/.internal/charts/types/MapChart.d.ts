/**
 * Map module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, ISerialChartProperties, ISerialChartDataFields, ISerialChartAdapters, ISerialChartEvents, SerialChartDataItem } from "./SerialChart";
import { Sprite, ISpriteEvents, AMEvent } from "../../core/Sprite";
import { IDisposer } from "../../core/utils/Disposer";
import { MapSeries } from "../map/MapSeries";
import { MapObject } from "../map/MapObject";
import { MapPolygonSeries } from "../map/MapPolygonSeries";
import { IPoint } from "../../core/defs/IPoint";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
import { DataSource } from "../../core/data/DataSource";
import { Projection } from "../map/projections/Projection";
import { ZoomControl } from "../map/ZoomControl";
import { Ordering } from "../../core/utils/Order";
import { Circle } from "../../core/elements/Circle";
import { SmallMap } from "../map/SmallMap";
import { Animation } from "../../core/utils/Animation";
import { Paper } from "../../core/rendering/Paper";
import { IListEvents } from "../../core/utils/List";
import { IInteractionEvents } from "../../core/interaction/Interaction";
import { Legend } from "../Legend";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapChart]].
 *
 * @see {@link DataItem}
 */
export declare class MapChartDataItem extends SerialChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: MapChart;
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
 * Defines interface for a map polygon object.
 */
export interface IMapPolygonDataObject {
    /**
     * A unique id of the object.
     */
    id?: string;
    /**
     * Numeric value for heat-map scenarios.
     */
    value?: number;
    /**
     * Single polygon information in X/Y coordinates.
     */
    polygon?: Array<Array<[number, number]>>;
    /**
     * Multi-part polygon information in X/Y coordinates.
     */
    multiPolygon?: Array<Array<Array<[number, number]>>>;
    /**
     * Single polygon information in lat/long geo-coordinates.
     */
    geoPolygon?: Array<Array<IGeoPoint>>;
    /**
     * Multi-part polygon information in lat/long geo-coordinates.
     */
    multiGeoPolygon?: Array<Array<Array<IGeoPoint>>>;
    /**
     * flag indicating whether this data item was created from geo data
     */
    madeFromGeoData?: boolean;
}
/**
 * Defines types of map line.
 */
export declare type MapLineType = "line" | "arc" | "spline" | "realTrajectory";
/**
 * Defines interface for the map line object.
 */
export interface IMapLineDataObject {
    /**
     * A unique id of the object.
     */
    id?: string;
    /**
     * Numeric value for heat-map scenarios.
     */
    value?: number;
    /**
     * Single line information in X/Y coordinates.
     */
    line?: Array<[number, number]>;
    /**
     * Multi-part line information in X/Y coordinates.
     */
    multiLine?: Array<Array<[number, number]>>;
    /**
     * Single line information in lat/long geo-coordinates.
     */
    geoLine?: Array<IGeoPoint>;
    /**
     * Multi-part line information in lat/long geo-coordinates.
     */
    multiGeoLine?: Array<Array<IGeoPoint>>;
    /**
     * flag indicating whether this data item was created from geo data
     */
    madeFromGeoData?: boolean;
}
/**
 * Defines interface for a map image (market) object.
 */
export interface IMapImageDataObject {
    /**
     * A unique id of the object.
     */
    id?: string;
    /**
     * Numeric value for heat-map scenarios.
     */
    value?: number;
    /**
     * Image position information in X/Y coordinates.
     */
    point?: [number, number];
    /**
     * Multi-image position information in X/Y coordinates.
     */
    multiPoint?: Array<[number, number]>;
    /**
     * Image position information in lat/long geo-coordinates.
     */
    geoPoint?: IGeoPoint;
    /**
     * Multi-image position information in lat/long geo-coordinates.
     */
    multiGeoPoint?: Array<IGeoPoint>;
    /**
     * flag indicating whether this data item was created from geo data
     */
    madeFromGeoData?: boolean;
}
/**
 * Defines type suitable for all map objects.
 */
export declare type IMapDataObject = IMapPolygonDataObject | IMapLineDataObject;
/**
 * Defines data fields for [[MapChart]].
 */
export interface IMapChartDataFields extends ISerialChartDataFields {
}
/**
 * Defines properties for [[MapChart]].
 */
export interface IMapChartProperties extends ISerialChartProperties {
    /**
     * Projection to be used when drawing the map.
     */
    projection?: Projection;
    /**
     * Degrees to rotate the map around vertical axis (Y).
     *
     * E.g. if set to -160, the longitude 20 will become a new center, creating
     * a Pacific-centered map.
     */
    deltaLongitude?: number;
    /**
     * Degrees to rotate the map around horizontal axis (X).
     *
     * E.g. setting this to -90 will put Antarctica directly in the center of
     * the map.
     *
     * @since 4.3.0
     */
    deltaLatitude?: number;
    /**
     * Degrees to rotate the map around horizontal "Z" - an axis that goes from
     * the center of the globe directly to the viewer.
     *
     * @since 4.3.0
     */
    deltaGamma?: number;
    /**
     * Maximum portion of the map's width/height to allow panning "off screen".
     *
     * A value of 0 (zero) will prevent any portion of the the map to be panned
     * outside the viewport.
     *
     * 0.5 will allow half of the map to be outside viewable area.
     *
     * @default 0.7
     */
    maxPanOut?: number;
    /**
     * A map will start centered on this geographical point.
     */
    homeGeoPoint?: IGeoPoint;
    /**
     * A map will start zoomed to this level.
     */
    homeZoomLevel?: number;
    /**
     * When user zooms in or out current zoom level is multiplied or divided
     * by value of this setting.
     *
     * @default 2
     */
    zoomStep?: number;
    /**
     * Specifies what should chart do if when mouse wheel is rotated.
     */
    mouseWheelBehavior?: "zoom" | "none";
    /**
     * What "dragging" map does.
     *
     * Available values:
     * * `"move"` (default): changes position of the map.
     * * `"rotateLat"`: changes `deltaLatitude` (rotates the globe vertically).
     * * `"rotateLong"`: changes `deltaLongitude` (rotates the globe horizontally).
     * * `"rotateLongLat"`: changes both `deltaLongitude` and `deltaLatitude` (rotates the globe in any direction).
     *
     * @default "move"
     * @since 4.3.0
     */
    panBehavior?: "move" | "rotateLat" | "rotateLong" | "rotateLongLat";
    /**
     * Specifies if the map should be centered when zooming out
     * @default true
     * @since 4.7.12
     */
    centerMapOnZoomOut?: boolean;
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
 * Defines events for [[MapChart]].
 */
export interface IMapChartEvents extends ISerialChartEvents {
    /**
     * Invoked when map is zoomed in or out.
     */
    zoomlevelchanged: {};
    /**
     * Invoked when map is panned. (moved)
     */
    mappositionchanged: {};
    /**
     * Invoked when scale ratio is changed, e.g when the whole map area is
     * resized and the map needs to be resized to fit it, without changing
     * zoom level.
     */
    scaleratiochanged: {};
}
/**
 * Defines adapters for [[MapChart]].
 *
 * @see {@link Adapter}
 */
export interface IMapChartAdapters extends ISerialChartAdapters, IMapChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a map.
 *
 * @see {@link IMapChartEvents} for a list of available Events
 * @see {@link IMapChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/} for documentation
 */
export declare class MapChart extends SerialChart {
    /**
     * Available data fields.
     */
    _dataFields: IMapChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: IMapChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapChartAdapters;
    /**
     * Defines available events.
     */
    _events: IMapChartEvents;
    /**
     * The East-most longitude point of the map.
     */
    east: number;
    /**
     * The West-most longitude point of the map.
     */
    west: number;
    /**
     * The South-most latitude point of the map.
     */
    south: number;
    /**
     * The North-most latitude point of the map.
     */
    north: number;
    /**
     * A ratio to be used when scaling the map shapes.
     *
     * @readonly
     */
    scaleRatio: number;
    /**
     * A screen point of the map's center.
     *
     * @readonly
     */
    centerPoint: IPoint;
    /**
     * A screen point of the map's left.
     *
     * @readonly
     */
    westPoint: IPoint;
    /**
     * A screen point of the map's right.
     *
     * @readonly
     */
    eastPoint: IPoint;
    /**
     * A screen point of the map's top.
     *
     * @readonly
     */
    northPoint: IPoint;
    /**
     * A screen point of the map's bottom.
     *
     * @readonly
     */
    southPoint: IPoint;
    /**
     * Width of the actual map objects (px).
     */
    seriesWidth: number;
    /**
     * @ignore
     */
    seriesMaxLeft: number;
    /**
     * @ignore
     */
    seriesMaxRight: number;
    /**
     * @ignore
     */
    seriesMaxTop: number;
    /**
     * @ignore
     */
    seriesMaxBottom: number;
    /**
     * Height of the actual map objects (px).
     */
    seriesHeight: number;
    /**
     * Map data in GeoJSON format.
     *
     * @see {@link http://geojson.org/} GeoJSON official specification
     */
    protected _geodata: Object;
    /**
     * Names of geodata items, such as countries, to replace by from loaded
     * geodata.
     *
     * Can be used to override built-in English names for countries.
     *
     * ```TypeScript
     * import am4geodata_lang_ES from '@amcharts4-geodata/lang/es';
     * // ...
     * map.geodataNames = am4geodata_lang_ES;
     * ```
     * ```JavaScript
     * map.geodataNames = am4geodata_lang_ES;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "geodataNames": am4geodata_lang_ES
     * }
     * ```
     *
     * @since 4.7.4
     */
    geodataNames: {
        [index: string]: string;
    };
    /**
     * A reference to a [[ZoomControl]] instance.
     */
    protected _zoomControl: ZoomControl;
    /**
     * A reference to a [[SmallMap]] control instance.
     */
    protected _smallMap: SmallMap;
    /**
     * [_zoomGeoPoint description]
     *
     * @todo Description
     */
    protected _zoomGeoPoint: IGeoPoint;
    /**
     * Default duration of zoom animations (ms).
     */
    zoomDuration: number;
    /**
     * Default zooming animation easing function.
     */
    zoomEasing: (value: number) => number;
    /**
     * Smallest available zoom level. The map will not allow to zoom out past
     * this setting.
     *
     * NOTE: Should be power of 2.
     *
     * @default 1
     */
    minZoomLevel: number;
    /**
     * Biggest available zoom level. The map will not allow to zoom in past
     * this setting.
     *
     * NOTE: Should be power of 2.
     *
     * @default 32
     */
    maxZoomLevel: number;
    /**
     * [_prevZoomLevel description]
     *
     * @todo Description
     */
    protected _prevZoomLevel: number;
    /**
     * [_prevZoomGeoPoint description]
     *
     * @todo Description
     */
    protected _prevZoomGeoPoint: IGeoPoint;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: MapSeries;
    /**
     * A reference to currently playing animation, e.g. zooming.
     */
    protected _mapAnimation: Animation;
    /**
     * @ignore
     */
    protected _mouseWheelDisposer: IDisposer;
    /**
     * @ignore
     */
    _zoomGeoPointReal: IGeoPoint;
    /**
     * @ignore
     */
    protected _centerGeoPoint: IGeoPoint;
    /**
     * @ignore
     */
    protected _fitWidth: number;
    /**
     * @ignore
     */
    protected _fitHeight: number;
    /**
     * @ignore
     */
    panSprite: Circle;
    /**
     * @ignore
     */
    protected _downPointOrig: IPoint;
    /**
     * @ignore
     */
    protected _downDeltaLongitude: number;
    /**
     * @ignore
     */
    protected _downDeltaLatitude: number;
    /**
     * @ignore
     */
    protected _backgroundSeries: MapPolygonSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected handlePanDown(event: IInteractionEvents["down"]): void;
    /**
     * @ignore
     */
    protected handlePanUp(event: IInteractionEvents["down"]): void;
    /**
     * @ignore
     */
    protected handlePanMove(): void;
    /**
     * @ignore
     */
    protected handleAllInited(): void;
    /**
     * @ignore
     */
    updateZoomGeoPoint(): void;
    /**
     * @ignore
     */
    updateCenterGeoPoint(): void;
    /**
     * Prevents map to be dragged out of the container area
     * @ignore
     */
    protected handleDrag(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Handles event when a pointer presses down on the map, e.g. user presses
     * down mouse or touches the map on a screen.
     *
     * Stops all animations currently going on.
     */
    protected handleMapDown(): void;
    /**
     * Handles the event when user doubleclicks or dooubletaps the map: zooms
     * in on the reference point.
     *
     * @param event  Original event
     */
    protected handleDoubleHit(event: AMEvent<Sprite, ISpriteEvents>["doublehit"]): void;
    /**
     * Handles mouse wheel event, e.g. user rotates mouse wheel while over the
     * map: zooms in or out depending on the direction of the wheel turn.
     *
     * @param event  Original event
     */
    protected handleWheel(event: AMEvent<Sprite, ISpriteEvents>["wheel"]): void;
    /**
     * Specifies what should chart do if when mouse wheel is rotated.
     *
     * @see {@link https://www.amcharts.com/docs/v4/reference/sprite/#mouseOptions_property} More information about `mouseOptions`
     * @param mouse wheel behavior
     * @default zoomX
     */
    /**
    * @return mouse wheel behavior
    */
    mouseWheelBehavior: "zoom" | "none";
    /**
     * What "dragging" map does.
     *
     * Available values:
     * * `"move"` (default): changes position of the map.
     * * `"rotateLat"`: changes `deltaLatitude` (rotates the globe vertically).
     * * `"rotateLong"`: changes `deltaLongitude` (rotates the globe horizontally).
     * * `"rotateLongLat"`: changes both `deltaLongitude` and `deltaLatitude` (rotates the globe in any direction).
     *
     * @default "move"
     * @since 4.3.0
     * @param  value  Behavior
     */
    /**
    * @returns Behavior
    */
    panBehavior: "none" | "move" | "rotateLat" | "rotateLong" | "rotateLongLat";
    /**
     * @returns If the map should be centered when zooming out.
     */
    /**
    * Specifies if the map should be centered when zooming out
    * @default true
    * @since 4.7.12
    */
    centerMapOnZoomOut: boolean;
    /**
     * Projection to use for the map.
     *
     * Available projections:
     * * Albers
     * * AlbersUSA
     * * AzimuthalEqualArea
     * * Eckert6
     * * EqualEarth
     * * Mercator
     * * Miller
     * * NaturalEarth
     * * Orthographic
     * * Stereographic
     *
     * ```TypeScript
     * map.projection = new am4maps.projections.Mercator();
     * ```
     * ```JavaScript
     * map.projection = new am4maps.projections.Mercator();
     * ```
     * ```JSON
     * {
     *   // ...
     *   "projection": "Mercator"
     *   // ...
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection} More about projections
     * @param projection  Projection
     */
    /**
    * @return Projection
    */
    projection: Projection;
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * Calculates the longitudes and latitudes of the most distant points from
     * the center in all four directions: West, East, North, and South.
     *
     * @ignore Exclude from docs
     */
    updateExtremes(): void;
    /**
     * (Re)calculates a ratio which should be used to scale the actual map so
     * that it fits perfectly into available space. Helps to avoid redrawing of all the map if container size changes
     * @ignore
     */
    protected updateScaleRatio(): void;
    /**
     * Converts a point within map container to geographical (lat/long)
     * coordinates.
     *
     * @param point  Source point
     * @return Geo-point
     */
    svgPointToGeo(point: IPoint): IGeoPoint;
    /**
     * Converts geographical (lat/long) coordinates to an X/Y point within map's
     * container.
     *
     * @param point  Source geo-point
     * @return Point
     */
    geoPointToSVG(point: IGeoPoint): IPoint;
    /**
     * Converts a point (X/Y) within actual objects of the map to geographical
     * (lat/long) coordinates.
     *
     * @param point  Source point
     * @return Geo-point
     */
    seriesPointToGeo(point: IPoint): IGeoPoint;
    /**
     * Converts geographical (lat/long) coordinates to an X/Y point within
     * actual elements/objects of the maps.
     *
     * @param point  Source geo-point
     * @return Point
     */
    geoPointToSeries(point: IGeoPoint): IPoint;
    /**
     * Map data in GeoJSON format.
     *
     * The Map supports the following GeoJSON objects: `Point`, `LineString`,
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
     * Reverses the order of polygons on a GeoJSON data.
     *
     * @since 4.10.11
     * @param  geodata  Source geodata
     */
    processReverseGeodata(geodata: any): void;
    /**
     * Zooms the map to particular zoom level and centers on a latitude/longitude
     * coordinate.
     *
     * @param point      Center coordinate
     * @param zoomLevel  Zoom level
     * @param center     Center on the given coordinate?
     * @param duration   Duration for zoom animation (ms)
     * @return Zoom animation
     */
    zoomToGeoPoint(point: IGeoPoint, zoomLevel: number, center?: boolean, duration?: number, mapObject?: boolean): Animation;
    /**
     * Zooms the map to a particular map object.
     *
     * @param mapObject  Target map object
     * @param zoomLevel  Zoom level
     * @param center     Center on the given coordinate?
     * @param duration   Duration for zoom animation (ms)
     * @return Zoom animation
     */
    zoomToMapObject(mapObject: MapObject, zoomLevel?: number, center?: boolean, duration?: number): Animation;
    /**
     * Zooms the map to a particular viewport.
     *
     * The `north`, `east`, `south`, and `west` define boundaries of the
     * imaginary viewort we want to zoom the map to.
     *
     * `level` is not actual zoom level. The map will determine the zoom level
     * required to accommodated such zoom, and will adjust it by `level` if set.
     *
     * @param north     Latitude of the North-most boundary
     * @param east      Longitude of the East-most boundary
     * @param south     Latitude of the South-most boundary
     * @param west      Longitude of the West-most boundary
     * @param level     Adjust zoom level
     * @param center    Center on the given coordinate?
     * @param duration  Duration for zoom animation (ms)
     * @return Zoom animation
     */
    zoomToRectangle(north: number, east: number, south: number, west: number, level?: number, center?: boolean, duration?: number): Animation;
    /**
     * Zooms in the map, optionally centering on particular latitude/longitude
     * point.
     *
     * @param geoPoint  Optional center point
     * @param duration  Duration for zoom animation (ms)
     * @return Zoom animation
     */
    zoomIn(geoPoint?: IGeoPoint, duration?: number, sensitivity?: number): Animation;
    /**
     * Zooms out the map, optionally centering on particular latitude/longitude
     * point.
     *
     * @param geoPoint  Optional center point
     * @param duration  Duration for zoom animation (ms)
     * @return Zoom animation
     */
    zoomOut(geoPoint?: IGeoPoint, duration?: number, sensitivity?: number): Animation;
    /**
     * Pans the maps using relative coordinates. E.g.:
     *
     * ```JSON
     * {
     *   x: 0.1,
     *   y: -0.1
     * }
     * ```
     *
     * The above will move the map by 10% to the right, and by 10% upwards.
     *
     * @param shift     Vertical and horizontal shift
     * @param duration  Pan animation duration (ms)
     */
    pan(shift: IPoint, duration?: number): void;
    /**
     * Current lat/long coordinates for the center of the viewport. (default
     * zoom reference point)
     *
     * @readonly
     * @return Coordinates
     */
    readonly zoomGeoPoint: IGeoPoint;
    /**
     * Current zoom level.
     *
     * @readonly
     * @return Zoom level
     */
    /**
    * @return Zoom level
    */
    zoomLevel: number;
    /**
     * Dispatches events after some map transformation, like pan or zoom.
     *
     * @ignore
     */
    protected handleMapTransform(): void;
    /**
     * A [[SmallMap]] to be used on the map.
     *
     * Please note, that accessing this property will NOT create a small map
     * if it has not yet been created. (except in JSON)
     *
     * ```TypeScript
     * // Create a small map
     * map.smallMap = new am4maps.SmallMap();
     * ```
     * ```JavaScript
     * // Create a small map
     * map.smallMap = new am4maps.SmallMap();
     * ```
     * ```JSON
     * {
     *   // ...
     *   "smallMap": {}
     *   // ...
     * }
     * ```
     *
     * @param smallMap  Small map
     */
    /**
    * @return Small map
    */
    smallMap: SmallMap;
    /**
     * A [[ZoomControl]] to be used on the map.
     *
     * Please note, that accessing this property will NOT create a zoom control
     * if it has not yet been created. (except in JSON)
     *
     * ```TypeScript
     * // Create a zoom control
     * map.zoomControl = new am4maps.ZoomControl();
     * ```
     * ```JavaScript
     * // Create a zoom control
     * map.zoomControl = new am4maps.ZoomControl();
     * ```
     * ```JSON
     * {
     *   // ...
     *   "zoomControl": {}
     *   // ...
     * }
     * ```
     *
     * @param zoomControl  Zoom control
     */
    /**
    * @return Zoom control
    */
    zoomControl: ZoomControl;
    /**
     * Creates and returns a map series of appropriate type.
     *
     * @return Map series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * Degrees to rotate the map around vertical axis (Y).
     *
     * E.g. if set to -160, the longitude 20 will become a new center, creating
     * a Pacific-centered map.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Map_rotation} For more info on map rotation.
     * @param  value  Rotation
     */
    /**
    * @return Rotation
    */
    deltaLongitude: number;
    /**
     * Degrees to rotate the map around horizontal axis (X).
     *
     * E.g. setting this to 90 will put Antarctica directly in the center of
     * the map.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Map_rotation} For more info on map rotation.
     * @since 4.3.0
     * @param  value  Rotation
     */
    /**
    * @return Rotation
    */
    deltaLatitude: number;
    /**
     * Degrees to rotate the map around "Z" axis. This is the axis that pierces
     * the globe directly from the viewer's point of view.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/map/#Map_rotation} For more info on map rotation.
     * @since 4.3.0
     * @param  value  Rotation
     */
    /**
    * @return Rotation
    */
    deltaGamma: number;
    /**
     * @ignore
     */
    protected rotateMap(): void;
    /**
     * Maximum portion of the map's width/height to allow panning "off screen".
     *
     * A value of 0 (zero) will prevent any portion of the the map to be panned
     * outside the viewport.
     *
     * 0.5 will allow half of the map to be outside viewable area.
     *
     * @default 0.7
     * @param value  Max pan out
     */
    /**
    * @return Max pan out
    */
    maxPanOut: number;
    /**
     * The geographical point to center map on when it is first loaded.
     *
     * The map will also be centered to this point when you call `goHome()`
     * method.
     *
     * @param value  Home geo point
     */
    /**
    * @return Home geo point
    */
    homeGeoPoint: IGeoPoint;
    /**
     * The zoom level to put the map in when it is first loaded.
     *
     * The map will also be set to this zoom level when you call `goHome()`
     * method.
     *
     * @param value  Home zoom level
     */
    /**
    * @return Home zoom level
    */
    homeZoomLevel: number;
    /**
     * When user zooms in or out current zoom level is multiplied or divided
     * by value of this setting.
     *
     * @default 2
     * @param value  Zoom factor
     */
    /**
    * @return Zoom factor
    */
    zoomStep: number;
    /**
     * Invalidates projection, causing all series to be redrawn.
     *
     * Call this after changing projection or its settings.
     */
    invalidateProjection(): void;
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
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Decorates a new [[Series]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    handleSeriesAdded(event: IListEvents<MapSeries>["inserted"]): void;
    /**
       * This function is used to sort element's JSON config properties, so that
       * some properties that absolutely need to be processed last, can be put at
       * the end.
       *
       * @ignore Exclude from docs
       * @param a  Element 1
       * @param b  Element 2
       * @return Sorting number
       */
    protected configOrder(a: string, b: string): Ordering;
    /**
     * Adds `projection` to "as is" fields.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    protected asIs(field: string): boolean;
    /**
     * Geo point of map center
     *
     * @readonly
     */
    readonly centerGeoPoint: IGeoPoint;
    /**
     * Resets the map to its original position and zoom level.
     *
     * Use the only parameter to set number of milliseconds for the zoom
     * animation to play.
     *
     * @param  duration  Duration (ms)
     */
    goHome(duration?: number): void;
    /**
     * Sets [[Paper]] instance to use to draw elements.
     *
     * @ignore
     * @param   paper  Paper
     * @return         true if paper was changed, false, if it's the same
     */
    setPaper(paper: Paper): boolean;
    /**
     * Background series will create polygons that will fill all the map area
     * with some color (or other fill).
     *
     * This might be useful with non-rectangular projections, like Orthographic,
     * Albers, etc.
     *
     * To change background color/opacity access polygon template.
     *
     * ```TypeScript
     * chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#fff");
     * chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
     * ```
     * ```JavaScript
     * chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#fff");
     * chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
     * ```
     * ```JSON
     * {
     *   "backgroundSeries": {
     *     "mapPolygons": {
     *       "polygon": {
     *         "fill": "#fff",
     *         "fillOpacity": 0.1
     *       }
     *     }
     *   }
     * }
     * ```
     *
     * @since 4.3.0
     */
    readonly backgroundSeries: MapPolygonSeries;
    /**
     * Prepares the legend instance for use in this chart.
     *
     * @param legend  Legend
     */
    protected setLegend(legend: Legend): void;
    /**
     * @param  value  Tap to activate?
     */
    protected setTapToActivate(value: boolean): void;
    protected handleTapToActivate(): void;
    protected handleTapToActivateDeactivation(): void;
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    protected asFunction(field: string): boolean;
    /**
     * @ignore
     * @return Has license?
     */
    hasLicense(): boolean;
}
