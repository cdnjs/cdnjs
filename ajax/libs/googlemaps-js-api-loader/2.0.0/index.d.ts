/**
 * @deprecated Use the new functional API: `setOptions()` and `importLibrary()`.
 * See the migration guide for more details: MIGRATION.md
 */
declare class Loader {
    constructor(...args: any[]);
}

type APIOptions = {
    key?: string;
    v?: string;
    language?: string;
    region?: string;
    libraries?: string[];
    authReferrerPolicy?: string;
    mapIds?: string[];
    channel?: string;
    solutionChannel?: string;
};
interface APILibraryMap {
    core: google.maps.CoreLibrary;
    drawing: google.maps.DrawingLibrary;
    elevation: google.maps.ElevationLibrary;
    geocoding: google.maps.GeocodingLibrary;
    geometry: google.maps.GeometryLibrary;
    journeySharing: google.maps.JourneySharingLibrary;
    maps: google.maps.MapsLibrary;
    maps3d: google.maps.Maps3DLibrary;
    marker: google.maps.MarkerLibrary;
    places: google.maps.PlacesLibrary;
    routes: google.maps.RoutesLibrary;
    streetView: google.maps.StreetViewLibrary;
    visualization: google.maps.VisualizationLibrary;
}
type APILibraryName = keyof APILibraryMap;
/**
 * Sets the options for the Maps JavaScript API.
 *
 * Has to be called before any library is loaded.
 *
 * See https://developers.google.com/maps/documentation/javascript/load-maps-js-api#required_parameters
 * for the full documentation of available options.
 *
 * @param options The options to set.
 */
declare function setOptions(options: APIOptions): void;
/**
 * Imports the specified library from the Maps JavaScript API.
 *
 * The first call to this function will start actually loading the Maps
 * JavaScript API.
 *
 * @param libraryName The name of the library to load.
 * @returns A promise that resolves with the loaded library. In case of an
 *   error (due to poor network conditions, browser extensions, etc.), the
 *   returned promise is rejected with an error.
 */
declare function importLibrary<TLibraryName extends APILibraryName>(libraryName: TLibraryName): Promise<APILibraryMap[TLibraryName]>;
declare function importLibrary(...parameters: Parameters<typeof google.maps.importLibrary>): ReturnType<typeof google.maps.importLibrary>;

export { Loader, importLibrary, setOptions };
export type { APIOptions };
