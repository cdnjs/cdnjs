/**
 * Map image series module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapSeries, MapSeriesDataItem, IMapSeriesProperties, IMapSeriesDataFields, IMapSeriesAdapters, IMapSeriesEvents } from "./MapSeries";
import { MapChart } from "../types/MapChart";
import { MapImage } from "./MapImage";
import { ListTemplate } from "../../core/utils/List";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapImageSeries]]
 * @see {@link DataItem}
 */
export declare class MapImageSeriesDataItem extends MapSeriesDataItem {
    /**
     * A [[MapImage]] element related to this data item.
     */
    protected _mapImage: MapImage;
    /**
     * [_point description]
     *
     * @todo Description
     */
    protected _point: [number, number];
    /**
     * Geographical coordinates image is placed at.
     */
    protected _geoPoint: IGeoPoint;
    /**
     * Defines a type of [[Component]] this data item is used for
     */
    _component: MapImageSeries;
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
            type: "Point";
            coordinates: [number, number];
        };
    };
    /**
     * A [[MapImage]] element related to this data item.
     *
     * @return Element
     */
    readonly mapImage: MapImage;
    /**
     * [point description]
     *
     * @todo Description
     * @param point [description]
     */
    /**
    * @return [description]
    */
    point: [number, number];
    /**
     * [point description]
     *
     * @todo Description
     * @param point [description]
     */
    /**
    * @return [description]
    */
    multiPoint: [[number, number]];
    /**
     * Geographical coordinates (lat/long) image is placed at.
     *
     * @param geoPoint Image coordinates
     */
    /**
    * @return Image coordinates
    */
    geoPoint: IGeoPoint;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[MapImageSeries]].
 */
export interface IMapImageSeriesDataFields extends IMapSeriesDataFields {
    /**
     * Field name that holds image point data in pixels.
     */
    point?: string;
    /**
     * Field name that holds multi-image point data in pixels.
     */
    multiPoint?: string;
    /**
     * Field name that holds image point data in Geo coordinates.
     */
    geoPoint?: string;
    /**
     * Field name that holds multi-image point data in Geo coordinates.
     */
    multiGeoPoint?: string;
}
/**
 * Defines properties for [[MapImageSeries]].
 */
export interface IMapImageSeriesProperties extends IMapSeriesProperties {
}
/**
 * Defines events for [[MapImageSeries]].
 */
export interface IMapImageSeriesEvents extends IMapSeriesEvents {
}
/**
 * Defines adapters for [[MapImageSeries]].
 *
 * @see {@link Adapter}
 */
export interface IMapImageSeriesAdapters extends IMapSeriesAdapters, IMapImageSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map image (marker) elements.
 *
 * @see {@link IMapImageSeriesEvents} for a list of available Events
 * @see {@link IMapImageSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class MapImageSeries extends MapSeries {
    /**
     * Defines available data fields.
     */
    _dataFields: IMapImageSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IMapImageSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapImageSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IMapImageSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: MapImageSeriesDataItem;
    /**
     * A related chart/map object, this image is drawn on.
     */
    chart: MapChart;
    /**
     * A list of map images in the series.
     */
    protected _mapImages: ListTemplate<MapImage>;
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
     * (Re)validates the data of the sries, effectively forcing it to redraw
     * all of its elements.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * A list of map images in the series.
     *
     * @return Map images
     */
    readonly mapImages: ListTemplate<MapImage>;
    /**
     * (Re)validates data element, effectively triggering its redrawal.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
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
    getFeatures(): Array<{
        "type": "Feature";
        geometry: {
            type: "Point";
            coordinates: [number, number];
        };
    }>;
    /**
     * returns MapImage by id
     * @param image id
     * @return {MapImage}
     */
    getImageById(id: string): MapImage;
}
