import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface MapboxOptions extends GeocoderOptions {
}
/**
 * Implementation of the [Mapbox Geocoding](https://www.mapbox.com/api-documentation/#geocoding)
 */
export declare class Mapbox implements IGeocoder {
    options: MapboxOptions;
    constructor(options?: Partial<MapboxOptions>);
    _getProperties(loc: Feature): {
        text: string;
        address: string;
    };
    geocode(query: string): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    private _parseResults;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Mapbox}
 * @param options the options
 */
export declare function mapbox(options?: Partial<MapboxOptions>): Mapbox;
/**
 * @internal
 */
export interface MapboxResponse {
    type: string;
    query: string[];
    features: Feature[];
    attribution: string;
}
interface Feature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Properties;
    text: string;
    place_name: string;
    matching_text: string;
    matching_place_name: string;
    center: [number, number];
    bbox?: [number, number, number, number];
    geometry: Geometry;
    address: string;
    context: Context[];
}
interface Context {
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
}
interface Geometry {
    type: string;
    coordinates: number[];
    interpolated: boolean;
    omitted: boolean;
}
interface Properties {
}
export {};
