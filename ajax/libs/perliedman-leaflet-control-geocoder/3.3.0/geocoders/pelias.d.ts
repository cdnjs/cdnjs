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
    _parseResults(data: GeoJSON.FeatureCollection<GeoJSON.Point>): GeocodingResult[];
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
interface Identity {
    id: string;
    gid: string;
    layer: string;
    source: string;
    source_id: string;
}
interface Labels {
    name: string;
    label: string;
    category?: string[];
}
interface Hierarchy {
    country_code?: string;
    ocean?: string;
    ocean_gid?: string;
    ocean_a?: string;
    marinearea?: string;
    marinearea_gid?: string;
    marinearea_a?: string;
    continent?: string;
    continent_gid?: string;
    continent_a?: string;
    empire?: string;
    empire_gid?: string;
    empire_a?: string;
    country?: string;
    country_gid?: string;
    country_a?: string;
    dependency?: string;
    dependency_gid?: string;
    dependency_a?: string;
    macroregion?: string;
    macroregion_gid?: string;
    macroregion_a?: string;
    region?: string;
    region_gid?: string;
    region_a?: string;
    macrocounty?: string;
    macrocounty_gid?: string;
    macrocounty_a?: string;
    county?: string;
    county_gid?: string;
    county_a?: string;
    localadmin?: string;
    localadmin_gid?: string;
    localadmin_a?: string;
    locality?: string;
    locality_gid?: string;
    locality_a?: string;
    borough?: string;
    borough_gid?: string;
    borough_a?: string;
    neighbourhood?: string;
    neighbourhood_gid?: string;
    neighbourhood_a?: string;
    postalcode?: string;
    postalcode_gid?: string;
    postalcode_a?: string;
}
interface Address {
    unit?: string;
    housenumber?: string;
    street?: string;
    postalcode?: string;
}
interface Scoring {
    accuracy: string;
    confidence?: number;
    distance?: number;
    match_type?: string;
}
interface Addendum {
    addendum?: Record<string, Object>;
}
interface Properties extends Identity, Labels, Scoring, Address, Hierarchy, Addendum {
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
    size: number;
    lang: {
        name: string;
        iso6391: string;
        iso6393: string;
        via: string;
        defaulted: boolean;
    };
    text?: string;
    parser?: string;
    parsed_text?: Record<string, string>;
    sources?: string[];
    layers?: string[];
}
export {};
