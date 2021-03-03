/**
 * Graticule (map grid) series functionality.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLineSeries, MapLineSeriesDataItem, IMapLineSeriesProperties, IMapLineSeriesDataFields, IMapLineSeriesAdapters, IMapLineSeriesEvents } from "./MapLineSeries";
import { Graticule } from "./Graticule";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[GraticuleSeries]].
 *
 * @see {@link DataItem}
 */
export declare class GraticuleSeriesDataItem extends MapLineSeriesDataItem {
    /**
     * A [[Graticule]] element related to this data item.
     */
    _mapLine: Graticule;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: GraticuleSeries;
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
 * Defines data fields for [[GraticuleSeries]].
 */
export interface IGraticuleSeriesDataFields extends IMapLineSeriesDataFields {
}
/**
 * Defines properties for [[GraticuleSeries]].
 */
export interface IGraticuleSeriesProperties extends IMapLineSeriesProperties {
    /**
     * Draw a graticule (grid) every X degrees of latitude.
     *
     * @default 10
     */
    latitudeStep?: number;
    /**
     * Draw a graticule (grid) every X degrees of longitude.
     *
     * @default 10
     */
    longitudeStep?: number;
    /**
     * Draw a thicker (major) graticule every X degrees of latitude.
     *
     * @default 90
     */
    /**
     * Draw a thicker (major) graticule every X degrees of longitude.
     *
     * @default 360
     */
    /**
     * Whether to cap graticules (grid) to actual span of the map (`true`), e.g.
     * where there are polygons, or draw full-world grid (`false`).
     *
     * For world maps, using `false` makes sense. For smaller maps - not so much.
     *
     * If set to `false`, the grid will be drawn from this series `east` to
     * `west`, and from `south` to `north` (default values: `east = -180`;
     * `west = 180`; `south =-90`; `north =90`).
     *
     * These can be overridden by setting `GraticuleSeries`' respective
     * properties.
     *
     * @default true
     */
    fitExtent?: boolean;
    /**
     * Whether to draw all the grid as a single element or as separate lines.
     *
     * Setting `true` (default) will result in better performance, whereas
     * `false` allows setting visual properties of each line individually.
     *
     * @default true
     */
    singleSprite?: boolean;
}
/**
 * Defines events for [[GraticuleSeries]].
 */
export interface IGraticuleSeriesEvents extends IMapLineSeriesEvents {
}
/**
 * Defines adapters for [[GraticuleSeries]].
 *
 * @see {@link Adapter}
 */
export interface IGraticuleSeriesAdapters extends IMapLineSeriesAdapters, IGraticuleSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class is used to create a set of graticules (map grid).
 *
 * To enable, create like you would create any regular map series:
 *
 * ```TypeScript
 * let graticule = chart.series.push(new am4maps.GraticuleSeries())
 * graticule.mapLines.template.line.stroke = am4core.color("#000000");
 * graticule.mapLines.template.line.strokeOpacity = 0.1;
 * ```
 * ```JavaScript
 * var graticule = chart.series.push(new am4maps.GraticuleSeries())
 * graticule.mapLines.template.line.stroke = am4core.color("#000000");
 * graticule.mapLines.template.line.strokeOpacity = 0.1;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     "type": "GraticuleSeries",
 *     "mapLines": {
 *       "line": {
 *         "stroke": "#000000",
 *         "strokeOpacity": 0.1
 *       }
 *     }
 *   }]
 * }
 * ```
 *
 * @since 4.3.0
 * @see {@link IGraticuleSeriesEvents} for a list of available Events
 * @see {@link IGraticuleSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class GraticuleSeries extends MapLineSeries {
    /**
     * Defines available data fields.
     */
    _dataFields: IGraticuleSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IGraticuleSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IGraticuleSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IGraticuleSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: GraticuleSeriesDataItem;
    /**
     * Defines the type of the line items in this series.
     */
    _mapLine: Graticule;
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
    validateData(): void;
    /**
     * Returns a new line instance of suitable type.
     *
     * @return New line
     */
    protected createLine(): this["_mapLine"];
    /**
     * Draw a graticule (grid) every X degrees of latitude.
     *
     * @default 10
     * @param  value Step
     */
    /**
    * @return Step
    */
    latitudeStep: number;
    /**
     * Draw a graticule (grid) every X degrees of longitude.
     *
     * @default 10
     * @param  value  Step
     */
    /**
    * @return Step
    */
    longitudeStep: number;
    /**
     * Draw a thicker (major) graticule every X degrees of latitude.
     *
     * @default 90
     * @param  value  Step
     */
    /**
     * @return Step
     */
    /**
     * Draw a thicker (major) graticule every X degrees of longitude.
     *
     * @default 360
     * @param  value  Step
     */
    /**
     * @return Step
     */
    /**
     * Whether to cap graticules (grid) to actual span of the map (`true`), e.g.
     * where there are polygons, or draw full-world grid (`false`).
     *
     * For world maps, using `false` makes sense. For smaller maps - not so much.
     *
     * If set to `false`, the grid will be drawn from this series `east` to
     * `west`, and from `south` to `north` (default values: `east = -180`;
     * `west = 180`; `south =-90`; `north =90`).
     *
     * These can be overridden by setting `GraticuleSeries`' respective
     * properties.
     *
     * @default true
     * @param  value  Fit?
     */
    /**
    * @return Fit?
    */
    fitExtent: boolean;
    /**
     * Whether to draw all the grid as a single element or as separate lines.
     *
     * Setting `true` (default) will result in better performance, whereas
     * `false` allows setting visual properties of each line individually.
     *
     * @default true
     * @param  value  Use single sprite?
     */
    /**
    * @return Use single sprite?
    */
    singleSprite: boolean;
}
