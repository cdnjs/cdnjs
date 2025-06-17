import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingResult } from './api';
export interface ArcGisOptions extends GeocoderOptions {
}
/**
 * Implementation of the [ArcGIS geocoder](https://developers.arcgis.com/features/geocoding/)
 */
export declare class ArcGis implements IGeocoder {
    options: ArcGisOptions;
    constructor(options?: Partial<ArcGisOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    suggest(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<GeocodingResult[]>;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link ArcGis}
 * @param options the options
 */
export declare function arcgis(options?: Partial<ArcGisOptions>): ArcGis;
/**
 * @internal
 */
export interface ArcGisResponse {
    spatialReference: {
        wkid: number;
        latestWkid: number;
    };
    candidates: Candidate[];
}
interface Candidate {
    address: string;
    location: {
        x: number;
        y: number;
    };
    score: number;
    attributes: {
        Addr_Type: string;
    };
    extent: {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    };
}
export {};
