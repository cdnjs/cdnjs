import * as L from 'leaflet';
import { IGeocoder, GeocodingCallback } from './api';
export interface LatLngOptions {
    /**
     * The next geocoder to use for non-supported queries
     */
    next?: IGeocoder;
    /**
     * The size in meters used for passing to `LatLng.toBounds`
     */
    sizeInMeters: number;
}
/**
 * Parses basic latitude/longitude strings such as `'50.06773 14.37742'`, `'N50.06773 W14.37742'`, `'S 50° 04.064 E 014° 22.645'`, or `'S 50° 4′ 03.828″, W 14° 22′ 38.712″'`
 * @param query the latitude/longitude string to parse
 * @returns the parsed latitude/longitude
 */
export declare function parseLatLng(query: string): L.LatLng | undefined;
/**
 * Parses basic latitude/longitude strings such as `'50.06773 14.37742'`, `'N50.06773 W14.37742'`, `'S 50° 04.064 E 014° 22.645'`, or `'S 50° 4′ 03.828″, W 14° 22′ 38.712″'`
 */
export declare class LatLng implements IGeocoder {
    options: LatLngOptions;
    constructor(options?: Partial<LatLngOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link LatLng}
 * @param options the options
 */
export declare function latLng(options?: Partial<LatLngOptions>): LatLng;
