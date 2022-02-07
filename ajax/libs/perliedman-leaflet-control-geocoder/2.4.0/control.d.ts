import * as L from 'leaflet';
import { IGeocoder, GeocodingResult } from './geocoders/api';
export interface GeocoderControlOptions extends L.ControlOptions {
    /**
     * Collapse control unless hovered/clicked
     */
    collapsed: boolean;
    /**
     * How to expand a collapsed control: `touch` or `click` or `hover`
     */
    expand: 'touch' | 'click' | 'hover';
    /**
     * Placeholder text for text input
     */
    placeholder: string;
    /**
     * Message when no result found / geocoding error occurs
     */
    errorMessage: string;
    /**
     * Accessibility label for the search icon used by screen readers
     */
    iconLabel: string;
    /**
     * Object to perform the actual geocoding queries
     */
    geocoder?: IGeocoder;
    /**
     * Immediately show the unique result without prompting for alternatives
     */
    showUniqueResult: boolean;
    /**
     * Show icons for geocoding results (if available); supported by Nominatim
     */
    showResultIcons: boolean;
    /**
     * Minimum number characters before suggest functionality is used (if available from geocoder)
     */
    suggestMinLength: number;
    /**
     * Number of milliseconds after typing stopped before suggest functionality is used (if available from geocoder)
     */
    suggestTimeout: number;
    /**
     * Initial query string for text input
     */
    query: string;
    /**
     * Minimum number of characters in search text before performing a query
     */
    queryMinLength: number;
    /**
     * Whether to mark a geocoding result on the map by default
     */
    defaultMarkGeocode: boolean;
}
/**
 * Event is fired when selecting a geocode result.
 * By default, the control will center the map on it and place a marker at its location.
 * To remove the control's default handler for marking a result, set {@link GeocoderControlOptions.defaultMarkGeocode} to `false`.
 */
export declare type MarkGeocodeEvent = {
    geocode: GeocodingResult;
};
export declare type MarkGeocodeEventHandlerFn = (event: MarkGeocodeEvent) => void;
/**
 * Event is fired before invoking {@link IGeocoder.geocode} (or {@link IGeocoder.suggest}).
 * The event data contains the query string as `input`.
 */
export declare type StartGeocodeEvent = {
    input: string;
};
export declare type StartGeocodeEventHandlerFn = (event: StartGeocodeEvent) => void;
/**
 * Event is fired before after receiving results from {@link IGeocoder.geocode} (or {@link IGeocoder.suggest}).
 * The event data contains the query string as `input` and the geocoding `results`.
 */
export declare type FinishGeocodeEvent = {
    input: string;
    results: GeocodingResult[];
};
export declare type FinishGeocodeEventHandlerFn = (event: FinishGeocodeEvent) => void;
declare module 'leaflet' {
    interface Evented {
        on(type: 'markgeocode', fn: MarkGeocodeEventHandlerFn, context?: any): this;
        on(type: 'startgeocode', fn: StartGeocodeEventHandlerFn, context?: any): this;
        on(type: 'startsuggest', fn: StartGeocodeEventHandlerFn, context?: any): this;
        on(type: 'finishsuggest', fn: FinishGeocodeEventHandlerFn, context?: any): this;
        on(type: 'finishgeocode', fn: FinishGeocodeEventHandlerFn, context?: any): this;
    }
}
/**
 * Leaflet mixins https://leafletjs.com/reference-1.7.1.html#class-includes
 * for TypeScript https://www.typescriptlang.org/docs/handbook/mixins.html
 * @internal
 */
declare class EventedControl {
    constructor(...args: any[]);
}
/**
 * @internal
 */
interface EventedControl extends L.Control, L.Evented {
}
/**
 * This is the geocoder control. It works like any other [Leaflet control](https://leafletjs.com/reference.html#control), and is added to the map.
 */
export declare class GeocoderControl extends EventedControl {
    options: GeocoderControlOptions;
    private _alts;
    private _container;
    private _errorElement;
    private _form;
    private _geocodeMarker;
    private _input;
    private _lastGeocode;
    private _map;
    private _preventBlurCollapse;
    private _requestCount;
    private _results;
    private _selection;
    private _suggestTimeout;
    /**
     * Instantiates a geocoder control (to be invoked using `new`)
     * @param options the options
     */
    constructor(options?: Partial<GeocoderControlOptions>);
    addThrobberClass(): void;
    removeThrobberClass(): void;
    /**
     * Returns the container DOM element for the control and add listeners on relevant map events.
     * @param map the map instance
     * @see https://leafletjs.com/reference.html#control-onadd
     */
    onAdd(map: L.Map): HTMLDivElement;
    /**
     * Sets the query string on the text input
     * @param string the query string
     */
    setQuery(string: string): this;
    private _geocodeResult;
    /**
     * Marks a geocoding result on the map
     * @param result the geocoding result
     */
    markGeocode(event: MarkGeocodeEvent): this;
    private _geocode;
    private _geocodeResultSelected;
    private _toggle;
    private _expand;
    private _collapse;
    private _clearResults;
    private _createAlt;
    private _keydown;
    private _change;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link GeocoderControl}
 * @param options the options
 */
export declare function geocoder(options?: Partial<GeocoderControlOptions>): GeocoderControl;
export {};
