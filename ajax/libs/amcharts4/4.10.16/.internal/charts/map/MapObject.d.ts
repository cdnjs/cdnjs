/**
 * Map object module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { MapSeries, MapSeriesDataItem } from "./MapSeries";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
import { IPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines propeties for [[MapObject]].
 */
export interface IMapObjectProperties extends IContainerProperties {
    /**
     * A custom zoom level to use when `zoomToMapObject()` is called on this
     * map object.
     */
    zoomLevel?: number;
    /**
     * A custom point to use when `zoomToMapObject()` is called on this map
     * object.
     */
    zoomGeoPoint?: IGeoPoint;
}
/**
 * Defines events for [[MapObject]].
 */
export interface IMapObjectEvents extends IContainerEvents {
    geoBoundsChanged: {};
}
/**
 * Defines adapters for [[MapObject]].
 *
 * @see {@link Adapter}
 */
export interface IMapObjectAdapters extends IContainerAdapters, IMapObjectProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all map objects: lines, images, etc.
 *
 * @see {@link IMapObjectEvents} for a list of available events
 * @see {@link IMapObjectAdapters} for a list of available Adapters
 */
export declare class MapObject extends Container {
    /**
     * Defines available properties.
     */
    _properties: IMapObjectProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapObjectAdapters;
    /**
     * Defines available events.
     */
    _events: IMapObjectEvents;
    /**
     * A map series this object belongs to.
     */
    series: MapSeries;
    _dataItem: MapSeriesDataItem;
    /**
     * Longitude of the East-most point of the element.
     */
    protected _east: number;
    /**
     * Longitude of the West-most point of the element.
     */
    protected _west: number;
    /**
     * Latitude of the South-most point of the element.
     */
    protected _south: number;
    /**
     * Latitude of the North-most point of the element.
     */
    protected _north: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)validates this object, forcing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Updates the item's bounding coordinates: coordinates of the East, West,
     * North, and South-most points.
     *
     * @ignore Exclude from docs
     */
    updateExtremes(): void;
    /**
     * @ignore
     */
    getFeature(): any;
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
     * Shows the element's [[Tooltip]].
     *
     * A tooltip will be populated using text templates in either `tooltipHTML` or
     * `tooltipText` as well as data in `tooltipDataItem`.
     *
     * @see {@link Tooltip}
     * @param optional point (sprite-related) to which tooltip must point.
     * @return returns true if the tooltip was shown and false if it wasn't (no text was found)
     */
    showTooltip(point?: IPoint): boolean;
    protected handleTooltipMove(ev: any): void;
    /**
     * Sets a [[DataItem]].
     * @param dataItem DataItem
     */
    protected setDataItem(dataItem: MapSeriesDataItem): void;
}
