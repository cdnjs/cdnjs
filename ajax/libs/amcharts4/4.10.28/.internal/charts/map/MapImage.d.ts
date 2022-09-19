/**
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapObject, IMapObjectProperties, IMapObjectAdapters, IMapObjectEvents } from "./MapObject";
import { MapImageSeriesDataItem, MapImageSeries } from "./MapImageSeries";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[MapImage]].
 */
export interface IMapImageProperties extends IMapObjectProperties {
    /**
     * Latitude of the image location.
     */
    latitude?: number;
    /**
     * Longitude of the mage location.
     */
    longitude?: number;
}
/**
 * Defines events for [[MapImage]].
 */
export interface IMapImageEvents extends IMapObjectEvents {
}
/**
 * Defines adapters for [[MapImage]].
 *
 * @see {@link Adapter}
 */
export interface IMapImageAdapters extends IMapObjectAdapters, IMapImageProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to place an image on the map.
 *
 * @see {@link IMapImageEvents} for a list of available events
 * @see {@link IMapImageAdapters} for a list of available Adapters
 */
export declare class MapImage extends MapObject {
    /**
     * Defines available properties.
     */
    _properties: IMapImageProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapImageAdapters;
    /**
     * Defines available events.
     */
    _events: IMapImageEvents;
    /**
     * A related data item.
     */
    _dataItem: MapImageSeriesDataItem;
    /**
     * A map series this object belongs to.
     */
    series: MapImageSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * Latitude image is placed at.
     *
     * @param value  Latitude
     */
    /**
    * @return Latitude
    */
    latitude: number;
    /**
     * Longitude image is placed on.
     *
     * @param value  Longitude
     */
    /**
    * @return Longitude
    */
    longitude: number;
    /**
     * Repositions the image to it's current position.
     *
     * @ignore Exclude from docs
     */
    validatePosition(): void;
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
}
