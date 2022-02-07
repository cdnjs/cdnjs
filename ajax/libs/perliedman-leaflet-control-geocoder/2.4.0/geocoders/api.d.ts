import * as L from 'leaflet';
/**
 * An object that represents a result from a geocoding query
 */
export interface GeocodingResult {
    /**
     * Name of found location
     */
    name: string;
    /**
     * The bounds of the location
     */
    bbox: L.LatLngBounds;
    /**
     * The center coordinate of the location
     */
    center: L.LatLng;
    /**
     * URL for icon representing result; optional
     */
    icon?: string;
    /**
     * HTML formatted representation of the name
     */
    html?: string;
    /**
     * Additional properties returned by the geocoder
     */
    properties?: any;
}
/**
 * A callback function used in {@link IGeocoder.geocode} and {@link IGeocoder.suggest} and {@link IGeocoder.reverse}
 */
export declare type GeocodingCallback = (result: GeocodingResult[]) => void;
/**
 * An interface implemented to respond to geocoding queries
 */
export interface IGeocoder {
    /**
     * Performs a geocoding query and returns the results to the callback in the provided context
     * @param query the query
     * @param cb the callback function
     * @param context the `this` context in the callback
     */
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    /**
     * Performs a geocoding query suggestion (this happens while typing) and returns the results to the callback in the provided context
     * @param query the query
     * @param cb the callback function
     * @param context the `this` context in the callback
     */
    suggest?(query: string, cb: GeocodingCallback, context?: any): void;
    /**
     * Performs a reverse geocoding query and returns the results to the callback in the provided context
     * @param location the coordinate to reverse geocode
     * @param scale the map scale possibly used for reverse geocoding
     * @param cb the callback function
     * @param context the `this` context in the callback
     */
    reverse?(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
export interface GeocoderOptions {
    /**
     * URL of the service
     */
    serviceUrl: string;
    /**
     * Additional URL parameters (strings) that will be added to geocoding requests
     */
    geocodingQueryParams?: Record<string, unknown>;
    /**
     * Additional URL parameters (strings) that will be added to reverse geocoding requests
     */
    reverseQueryParams?: Record<string, unknown>;
    /**
     * API key to use this service
     */
    apiKey?: string;
}
/**
 * @internal
 */
export declare function geocodingParams(options: GeocoderOptions, params: Record<string, unknown>): Record<string, unknown>;
/**
 * @internal
 */
export declare function reverseParams(options: GeocoderOptions, params: Record<string, unknown>): Record<string, unknown>;
