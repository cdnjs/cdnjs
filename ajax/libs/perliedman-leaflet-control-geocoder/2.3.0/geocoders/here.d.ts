import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface HereOptions extends GeocoderOptions {
    /**
     * Use `apiKey` and the new `HEREv2` geocoder
     * @deprecated
     */
    app_id: string;
    /**
     * Use `apiKey` and the new `HEREv2` geocoder
     * @deprecated
     */
    app_code: string;
    reverseGeocodeProxRadius?: any;
    apiKey: string;
    maxResults: number;
}
/**
 * Implementation of the [HERE Geocoder API](https://developer.here.com/documentation/geocoder/topics/introduction.html)
 */
export declare class HERE implements IGeocoder {
    options: HereOptions;
    constructor(options?: Partial<HereOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
    getJSON(url: string, params: any, cb: GeocodingCallback, context?: any): void;
}
/**
 * Implementation of the new [HERE Geocoder API](https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html)
 */
export declare class HEREv2 implements IGeocoder {
    options: HereOptions;
    constructor(options?: Partial<HereOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
    getJSON(url: string, params: any, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link HERE}
 * @param options the options
 */
export declare function here(options?: Partial<HereOptions>): HERE | HEREv2;
