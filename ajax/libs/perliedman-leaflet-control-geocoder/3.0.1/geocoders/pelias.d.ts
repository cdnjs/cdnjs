import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface PeliasOptions extends GeocoderOptions {
}
/**
 * Implementation of the [Pelias](https://pelias.io/), [geocode.earth](https://geocode.earth/) geocoder (formerly Mapzen Search)
 */
export declare class Pelias implements IGeocoder {
    options: PeliasOptions;
    constructor(options?: Partial<PeliasOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    _parseResults(data: any, bboxname: any): GeocodingResult[];
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Pelias}
 * @param options the options
 */
export declare function pelias(options?: Partial<PeliasOptions>): Pelias;
export declare const GeocodeEarth: typeof Pelias;
export declare const geocodeEarth: typeof pelias;
/**
 * r.i.p.
 * @deprecated
 */
export declare const Mapzen: typeof Pelias;
/**
 * r.i.p.
 * @deprecated
 */
export declare const mapzen: typeof pelias;
/**
 * Implementation of the [Openrouteservice](https://openrouteservice.org/dev/#/api-docs/geocode) geocoder
 */
export declare class Openrouteservice extends Pelias {
    constructor(options?: Partial<PeliasOptions>);
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Openrouteservice}
 * @param options the options
 */
export declare function openrouteservice(options?: Partial<PeliasOptions>): Openrouteservice;
/**
 * @internal
 */
export type PeliasResponse = GeoJSON.FeatureCollection<GeoJSON.Geometry, Properties> & {
    geocoding: Geocoding;
};
interface Properties {
    id: string;
    layer: string;
    source_id: string;
    name: string;
    confidence: number;
    match_type: string;
    accuracy: string;
    country: string;
    country_a: string;
    region: string;
    region_a: string;
    county: string;
    county_a: string;
    localadmin: string;
    locality: string;
    continent: string;
    label: string;
}
interface Geocoding {
    version: string;
    attribution: string;
    query: Query;
    warnings: string[];
    engine: Engine;
}
interface Engine {
    name: string;
    author: string;
    version: string;
}
interface Query {
}
export {};
