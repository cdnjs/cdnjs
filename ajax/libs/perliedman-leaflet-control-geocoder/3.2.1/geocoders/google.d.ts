import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
/**
 * Implementation of the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/)
 */
export interface GoogleOptions extends GeocoderOptions {
}
export declare class Google implements IGeocoder {
    options: GoogleOptions;
    constructor(options?: Partial<GoogleOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    private _parseResults;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Google}
 * @param options the options
 */
export declare function google(options?: Partial<GoogleOptions>): Google;
/**
 * @internal
 */
export interface GoogleResponse {
    results: Result[];
    status: string;
}
interface Result {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
}
interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}
interface Geometry {
    bounds: Bounds;
    location: Location;
    location_type: string;
    viewport: Bounds;
}
interface Bounds {
    northeast: Location;
    southwest: Location;
}
interface Location {
    lat: number;
    lng: number;
}
export {};
