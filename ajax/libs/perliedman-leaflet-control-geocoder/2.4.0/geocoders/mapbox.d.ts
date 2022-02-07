import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface MapboxOptions extends GeocoderOptions {
}
/**
 * Implementation of the [Mapbox Geocoding](https://www.mapbox.com/api-documentation/#geocoding)
 */
export declare class Mapbox implements IGeocoder {
    options: MapboxOptions;
    constructor(options?: Partial<MapboxOptions>);
    _getProperties(loc: any): {
        text: any;
        address: any;
    };
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    suggest(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Mapbox}
 * @param options the options
 */
export declare function mapbox(options?: Partial<MapboxOptions>): Mapbox;
