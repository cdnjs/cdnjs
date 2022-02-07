import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback, GeocodingResult } from './api';
export interface PhotonOptions extends GeocoderOptions {
    reverseUrl: string;
    nameProperties: string[];
    htmlTemplate?: (r: any) => string;
}
/**
 * Implementation of the [Photon](http://photon.komoot.de/) geocoder
 */
export declare class Photon implements IGeocoder {
    options: PhotonOptions;
    constructor(options?: Partial<PhotonOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    suggest(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(latLng: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
    _decodeFeatures(data: GeoJSON.FeatureCollection<GeoJSON.Point>): GeocodingResult[];
    _decodeFeatureName(f: GeoJSON.Feature): string;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Photon}
 * @param options the options
 */
export declare function photon(options?: Partial<PhotonOptions>): Photon;
