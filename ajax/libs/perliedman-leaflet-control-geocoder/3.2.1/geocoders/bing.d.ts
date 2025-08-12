import * as L from 'leaflet';
import { GeocoderOptions, GeocodingResult, IGeocoder } from './api';
export interface BingOptions extends GeocoderOptions {
}
/**
 * Implementation of the [Bing Locations API](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/)
 *
 * Bing Maps for Enterprise is deprecated and will be retired.
 * Free (Basic) account customers can continue to use Bing Maps for Enterprise services until June 30th, 2025.
 * Enterprise account customers can continue to use Bing Maps for Enterprise services until June 30th, 2028.
 */
export declare class Bing implements IGeocoder {
    options: BingOptions;
    constructor(options?: Partial<BingOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    private _parseResults;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Bing}
 * @param options the options
 */
export declare function bing(options?: Partial<BingOptions>): Bing;
