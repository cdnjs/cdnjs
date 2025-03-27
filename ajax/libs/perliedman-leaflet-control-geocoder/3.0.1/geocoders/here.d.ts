import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface HereOptions extends GeocoderOptions {
    /**
     * Use `apiKey` and the new `HEREv2` geocoder
     * @deprecated
     */
    app_id: string;
    /**
     * Use `apiKey` and the new `HEREv2` geocoder
     * @deprecated
     */
    app_code: string;
    reverseGeocodeProxRadius?: any;
    apiKey: string;
    maxResults: number;
}
/**
 * Implementation of the [HERE Geocoder API](https://developer.here.com/documentation/geocoder/topics/introduction.html)
 */
export declare class HERE implements IGeocoder {
    options: HereOptions;
    constructor(options?: Partial<HereOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    getJSON(url: string, params: any): Promise<GeocodingResult[]>;
}
/**
 * Implementation of the new [HERE Geocoder API](https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html)
 */
export declare class HEREv2 implements IGeocoder {
    options: HereOptions;
    constructor(options?: Partial<HereOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
    getJSON(url: string, params: any): Promise<GeocodingResult[]>;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link HERE}
 * @param options the options
 */
export declare function here(options?: Partial<HereOptions>): HERE | HEREv2;
/**
 * @internal
 */
export interface HEREv2Response {
    items: Item[];
}
interface Item {
    title: string;
    id: string;
    ontologyId: string;
    resultType: string;
    address: Address;
    mapView?: MapView;
    position: Position;
    access: Position[];
    distance: number;
    categories: Category[];
    references: Reference[];
    foodTypes: Category[];
    contacts: Contact[];
    openingHours: OpeningHour[];
}
interface MapView {
    east: number;
    north: number;
    south: number;
    west: number;
}
interface Position {
    lat: number;
    lng: number;
}
interface Address {
    label: string;
    countryCode: string;
    countryName: string;
    stateCode: string;
    state: string;
    county: string;
    city: string;
    district: string;
    street: string;
    postalCode: string;
    houseNumber: string;
}
interface Category {
    id: string;
    name: string;
    primary?: boolean;
}
interface Contact {
    phone: Email[];
    fax: Email[];
    www: Email[];
    email: Email[];
}
interface Email {
    value: string;
}
interface OpeningHour {
    text: string[];
    isOpen: boolean;
    structured: Structured[];
}
interface Structured {
    start: string;
    duration: string;
    recurrence: string;
}
interface Reference {
    supplier: Supplier;
    id: string;
}
interface Supplier {
    id: string;
}
export {};
