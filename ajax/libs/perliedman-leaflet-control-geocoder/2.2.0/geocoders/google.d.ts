import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
/**
 * Implementation of the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/)
 */
export interface GoogleOptions extends GeocoderOptions {
}
export declare class Google implements IGeocoder {
    options: GoogleOptions;
    constructor(options?: Partial<GoogleOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Google}
 * @param options the options
 */
export declare function google(options?: Partial<GoogleOptions>): Google;
