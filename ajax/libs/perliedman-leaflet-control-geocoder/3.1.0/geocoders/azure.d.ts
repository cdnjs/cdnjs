import * as L from 'leaflet';
import { GeocodingResult, IGeocoder } from './api';
export interface AzureMapsOptions {
    apiKey: string;
    serviceUrl: string;
}
/**
 * Implementation of [Azure Maps Geocoding](https://www.microsoft.com/en-us/maps/azure/location-services/geocoding)
 *
 * https://learn.microsoft.com/en-us/rest/api/maps/search?view=rest-maps-1.0
 */
export declare class AzureMaps implements IGeocoder {
    private options;
    constructor(options: Partial<AzureMapsOptions>);
    /**
     * {@inheritdoc}
     * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP
     */
    geocode(query: string): Promise<GeocodingResult[]>;
    /**
     * {@inheritdoc}
     * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address-reverse?view=rest-maps-1.0&tabs=HTTP
     */
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Azure}
 * @param options the options
 */
export declare function azure(options: AzureMapsOptions): AzureMaps;
/**
 * @internal
 */
export interface AzureMapsResponse {
    summary: Summary;
    results: Result[];
}
interface Result {
    type: string;
    id: string;
    score: number;
    address: Address;
    position: Position;
    viewport: Viewport;
    entryPoints: EntryPoint[];
}
interface Address {
    streetNumber: string;
    streetName: string;
    municipalitySubdivision: string;
    municipality: string;
    countrySecondarySubdivision: string;
    countryTertiarySubdivision: string;
    countrySubdivisionCode: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    countrySubdivisionName: string;
}
interface EntryPoint {
    type: string;
    position: Position;
}
interface Position {
    lat: number;
    lon: number;
}
interface Viewport {
    topLeftPoint: Position;
    btmRightPoint: Position;
}
interface Summary {
    query: string;
    queryType: string;
    queryTime: number;
    numResults: number;
    offset: number;
    totalResults: number;
    fuzzyLevel: number;
}
export {};
