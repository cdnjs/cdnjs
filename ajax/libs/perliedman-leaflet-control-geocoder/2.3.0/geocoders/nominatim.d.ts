import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface NominatimResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address: NominatimAddress;
}
export interface NominatimAddress {
    building?: string;
    city_district?: string;
    city?: string;
    country_code?: string;
    country?: string;
    county?: string;
    hamlet?: string;
    house_number?: string;
    neighbourhood?: string;
    postcode?: string;
    road?: string;
    state_district?: string;
    state?: string;
    suburb?: string;
    village?: string;
}
export interface NominatimOptions extends GeocoderOptions {
    /**
     * Additional URL parameters (strings) that will be added to geocoding requests; can be used to restrict results to a specific country for example, by providing the [`countrycodes`](https://wiki.openstreetmap.org/wiki/Nominatim#Parameters) parameter to Nominatim
     */
    geocodingQueryParams?: Record<string, unknown>;
    /**
     * A function that takes an GeocodingResult as argument and returns an HTML formatted string that represents the result. Default function breaks up address in parts from most to least specific, in attempt to increase readability compared to Nominatim's naming
     */
    htmlTemplate: (r: NominatimResult) => string;
}
/**
 * Implementation of the [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) geocoder.
 *
 * This is the default geocoding service used by the control, unless otherwise specified in the options.
 *
 * Unless using your own Nominatim installation, please refer to the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/).
 */
export declare class Nominatim implements IGeocoder {
    options: NominatimOptions;
    constructor(options?: Partial<NominatimOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Nominatim}
 * @param options the options
 */
export declare function nominatim(options?: Partial<NominatimOptions>): Nominatim;
