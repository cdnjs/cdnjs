import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface What3WordsOptions extends GeocoderOptions {
}
/**
 * Implementation of the What3Words service
 */
export declare class What3Words implements IGeocoder {
    options: What3WordsOptions;
    constructor(options: Partial<What3WordsOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link What3Words}
 * @param options the options
 */
export declare function what3words(options: Partial<What3WordsOptions>): What3Words;
