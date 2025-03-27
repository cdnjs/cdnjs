import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface NeutrinoOptions extends GeocoderOptions {
    userId: string;
}
/**
 * Implementation of the [Neutrino API](https://www.neutrinoapi.com/api/geocode-address/)
 */
export declare class Neutrino implements IGeocoder {
    options: NeutrinoOptions;
    constructor(options?: Partial<NeutrinoOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Neutrino}
 * @param options the options
 */
export declare function neutrino(options?: Partial<NeutrinoOptions>): Neutrino;
