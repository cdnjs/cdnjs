import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface OpenCageOptions extends GeocoderOptions {
}
/**
 * Implementation of the [OpenCage Data API](https://opencagedata.com/)
 */
export declare class OpenCage implements IGeocoder {
    options: OpenCageOptions;
    constructor(options?: Partial<OpenCageOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    private _parseResults;
}
export declare function opencage(options?: Partial<OpenCageOptions>): OpenCage;
