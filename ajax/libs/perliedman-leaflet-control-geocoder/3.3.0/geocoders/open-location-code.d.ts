import * as L from 'leaflet';
import { IGeocoder, GeocodingResult } from './api';
export interface OpenLocationCodeOptions {
    OpenLocationCode: OpenLocationCodeApi;
    codeLength?: number;
}
export interface OpenLocationCodeApi {
    encode(latitude: number, longitude: number, codeLength?: number): string;
    decode(code: string): CodeArea;
}
export interface CodeArea {
    latitudeLo: number;
    longitudeLo: number;
    latitudeHi: number;
    longitudeHi: number;
    latitudeCenter: number;
    longitudeCenter: number;
    codeLength: number;
}
/**
 * Implementation of the [Plus codes](https://plus.codes/) (formerly OpenLocationCode) (requires [open-location-code](https://www.npmjs.com/package/open-location-code))
 */
export declare class OpenLocationCode implements IGeocoder {
    options: OpenLocationCodeOptions;
    constructor(options?: Partial<OpenLocationCodeOptions>);
    geocode(query: string): Promise<GeocodingResult[]>;
    reverse(location: L.LatLngLiteral, scale: number): Promise<{
        name: string;
        center: L.LatLng;
        bbox: L.LatLngBounds;
    }[]>;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link OpenLocationCode}
 * @param options the options
 */
export declare function openLocationCode(options?: Partial<OpenLocationCodeOptions>): OpenLocationCode;
