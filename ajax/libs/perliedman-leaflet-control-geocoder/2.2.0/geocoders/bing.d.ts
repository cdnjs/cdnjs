import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface BingOptions extends GeocoderOptions {
}
/**
 * Implementation of the [Bing Locations API](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/)
 */
export declare class Bing implements IGeocoder {
    options: BingOptions;
    constructor(options?: Partial<BingOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Bing}
 * @param options the options
 */
export declare function bing(options?: Partial<BingOptions>): Bing;
