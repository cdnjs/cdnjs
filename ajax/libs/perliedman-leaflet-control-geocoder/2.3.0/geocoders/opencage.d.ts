import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface OpenCageOptions extends GeocoderOptions {
}
/**
 * Implementation of the [OpenCage Data API](https://opencagedata.com/)
 */
export declare class OpenCage implements IGeocoder {
    options: OpenCageOptions;
    constructor(options?: Partial<OpenCageOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    suggest(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
export declare function opencage(options?: Partial<OpenCageOptions>): OpenCage;
