import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface MapQuestOptions extends GeocoderOptions {
}
/**
 * Implementation of the [MapQuest Geocoding API](http://developer.mapquest.com/web/products/dev-services/geocoding-ws)
 */
export declare class MapQuest implements IGeocoder {
    options: MapQuestOptions;
    constructor(options?: Partial<MapQuestOptions>);
    _formatName(...parts: string[]): string;
    geocode(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    private _parseResults;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link MapQuest}
 * @param options the options
 */
export declare function mapQuest(options?: Partial<MapQuestOptions>): MapQuest;
