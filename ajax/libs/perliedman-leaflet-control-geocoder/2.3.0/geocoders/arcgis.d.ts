import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface ArcGisOptions extends GeocoderOptions {
}
/**
 * Implementation of the [ArcGIS geocoder](https://developers.arcgis.com/features/geocoding/)
 */
export declare class ArcGis implements IGeocoder {
    options: ArcGisOptions;
    constructor(options?: Partial<ArcGisOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    suggest(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link ArcGis}
 * @param options the options
 */
export declare function arcgis(options?: Partial<ArcGisOptions>): ArcGis;
