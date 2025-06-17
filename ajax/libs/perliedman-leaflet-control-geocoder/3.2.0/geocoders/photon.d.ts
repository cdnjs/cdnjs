import * as L from 'leaflet';
import { GeocoderOptions, GeocodingContext, GeocodingResult, IGeocoder } from './api';
export interface PhotonOptions extends GeocoderOptions {
    reverseUrl: string;
    nameProperties: string[];
    htmlTemplate?: (r: any) => string;
}
/**
 * Implementation of the [Photon](http://photon.komoot.io/) geocoder
 */
export declare class Photon implements IGeocoder {
    options: PhotonOptions;
    constructor(options?: Partial<PhotonOptions>);
    geocode(query: string, context?: GeocodingContext): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(latLng: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    _parseResults(data: GeoJSON.FeatureCollection<GeoJSON.Point>): GeocodingResult[];
    _decodeFeatureName(f: GeoJSON.Feature): string;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Photon}
 * @param options the options
 */
export declare function photon(options?: Partial<PhotonOptions>): Photon;
/**
 * @internal
 */
export type PhotonResponse = GeoJSON.FeatureCollection<GeoJSON.Geometry, PhotonProperties>;
interface PhotonProperties {
    osm_id: number;
    osm_type: string;
    extent?: number[];
    country: string;
    osm_key: string;
    city: string;
    countrycode: string;
    osm_value: string;
    name: string;
    state: string;
    type: string;
    postcode?: string;
    housenumber?: string;
    street?: string;
    district?: string;
}
export {};
