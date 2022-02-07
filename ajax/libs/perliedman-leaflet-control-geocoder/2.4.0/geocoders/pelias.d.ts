import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback, GeocodingResult } from './api';
export interface PeliasOptions extends GeocoderOptions {
}
/**
 * Implementation of the [Pelias](https://pelias.io/), [geocode.earth](https://geocode.earth/) geocoder (formerly Mapzen Search)
 */
export declare class Pelias implements IGeocoder {
    options: PeliasOptions;
    private _lastSuggest;
    constructor(options?: Partial<PeliasOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    suggest(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
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
