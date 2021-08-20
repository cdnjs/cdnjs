/**
 * Map polygon module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapObject, IMapObjectProperties, IMapObjectAdapters, IMapObjectEvents } from "./MapObject";
import { MapPolygonSeriesDataItem, MapPolygonSeries } from "./MapPolygonSeries";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
import { Polygon } from "../../core/elements/Polygon";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[MapPolygon]].
 */
export interface IMapPolygonProperties extends IMapObjectProperties {
    /**
     * Set of geographical coordinates for the polygon.
     */
    multiGeoPolygon?: Array<[Array<IGeoPoint>, Array<IGeoPoint>]>;
    /**
     * Set of screen coordinates for the polygon.
     */
    multiPolygon?: Array<Array<Array<[number, number]>>>;
    /**
     * Latitude of the visual center of the polygon.
     */
    visualLatitude?: number;
    /**
     * Longitude of the visual center of the polygon.
     */
    visualLongitude?: number;
    /**
     * When polygon's sides are plotted, they are bent according to the used
     * projection, to depict the shortest distance how it would go on the actual
     * land.
     *
     * `precision` introduces a setting which can control when such bending
     * occurs.
     *
     * If the distance (in degrees) between two points of polygon's side is less
     * than `precision`, no bending will take place and the line will be straight.
     *
     * Set to large number (e.g. 10000) for perfectly straight lines on all
     * polygon's sides.
     *
     * @since 4.9.1
     * @default 0.5
     */
    precision?: number;
}
/**
 * Defines events for [[MapPolygon]].
 */
export interface IMapPolygonEvents extends IMapObjectEvents {
}
/**
 * Defines adapters for [[MapPolygon]].
 *
 * @see {@link Adapter}
 */
export interface IMapPolygonAdapters extends IMapObjectAdapters, IMapPolygonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a polygon on the map.
 *
 * @see {@link IMapPolygonEvents} for a list of available events
 * @see {@link IMapPolygonAdapters} for a list of available Adapters
 */
export declare class MapPolygon extends MapObject {
    /**
     * Defines available properties.
     */
    _properties: IMapPolygonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapPolygonAdapters;
    /**
     * Defines available events.
     */
    _events: IMapPolygonEvents;
    /**
     * A visual polygon element.
     */
    polygon: Polygon;
    /**
     * A related data item.
     */
    _dataItem: MapPolygonSeriesDataItem;
    /**
     * A map series this object belongs to.
     */
    series: MapPolygonSeries;
    /**
     * Latitude of the visual center of the polygon.
     */
    protected _visualLatitude: number;
    /**
     * Longitude of the visual center of the polygon.
     */
    protected _visualLongitude: number;
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
     * Set of coordinates for the polygon.
     *
     * @param multiGeoPolygon  Polygon coordinates
     */
    /**
    * @return Polygon coordinates
    */
    multiGeoPolygon: Array<[Array<IGeoPoint>, Array<IGeoPoint>]>;
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
     * (Re)validates the polygon, effectively redrawing it.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * @ignore Exclude from docs
     */
    measureElement(): void;
    /**
     * Latitude of the geometrical center of the polygon.
     *
     * @readonly
     * @return Center latitude
     */
    readonly latitude: number;
    /**
     * Longitude of the geometrical center of the polygon.
     *
     * @readonly
     * @return Center longitude
     */
    readonly longitude: number;
    /**
     * Latitude of the visual center of the polygon.
     *
     * It may (and probably won't) coincide with geometrical center.
     *
     * @since 4.3.0
     * @param  value  Latitude
     */
    /**
    * @return  Latitude
    */
    visualLatitude: number;
    /**
     * Longitude of the visual center of the polygon.
     *
     * It may (and probably won't) coincide with geometrical center.
     *
     * @since 4.3.0
     * @param  value  Longitude
     */
    /**
    * @return  Longitude
    */
    visualLongitude: number;
    /**
     * Not 100% sure about this, as if we add something to MapPolygon this
     * won't be true, but otherwise we will get all 0 and the tooltip won't
     * be positioned properly
     * @hidden
     */
    /**
     * Element's width in pixels.
     *
     * @readonly
     * @return Width (px)
     */
    readonly pixelWidth: number;
    /**
     * Element's height in pixels.
     *
     * @readonly
     * @return Width (px)
     */
    readonly pixelHeight: number;
    /**
     * Copies all properties from another instance of [[MapPolygon]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
     * @ignore
     */
    updateExtremes(): void;
    /**
     * @ignore
     * used to sorth polygons from big to small
     */
    readonly boxArea: number;
    /**
     * X coordinate for the slice tooltip.
     *
     * @ignore
     * @return X
     */
    getTooltipX(): number;
    /**
     * Y coordinate for the slice tooltip.
     *
     * @ignore
     * @return Y
     */
    getTooltipY(): number;
    /**
     * When polygon's sides are plotted, they are bent according to the used
     * projection.
     *
     * `precision` introduces a setting which can control when such bending
     * occurs.
     *
     * If the distance (in degrees) between two points of polygon's side is less
     * than `precision`, no bending will take place and the line will be straight.
     *
     * Set to large number (e.g. 10000) for perfectly straight lines on all
     * polygon's sides.
     *
     * @since 4.9.1
     * @default 0.5
     * @param  value  Precision
     */
    precision: number;
}
