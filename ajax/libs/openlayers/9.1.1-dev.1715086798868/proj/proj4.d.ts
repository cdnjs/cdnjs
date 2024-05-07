/**
 * @return {boolean} Proj4 has been registered.
 */
export function isRegistered(): boolean;
/**
 * Unsets the shared proj4 previously set with register.
 */
export function unregister(): void;
/**
 * Make projections defined in proj4 (with `proj4.defs()`) available in
 * OpenLayers. Requires proj4 >= 2.8.0.
 *
 * This function should be called whenever changes are made to the proj4
 * registry, e.g. after calling `proj4.defs()`. Existing transforms will not be
 * modified by this function.
 *
 * @param {import("proj4")} proj4 Proj4.
 * @api
 */
export function register(proj4: typeof import("proj4")): void;
/**
 * Set the lookup function for getting proj4 definitions given an EPSG code.
 * By default, the {@link module:ol/proj/proj4.fromEPSGCode} function uses the
 * epsg.io website for proj4 definitions.  This can be changed by providing a
 * different lookup function.
 *
 * @param {function(number):Promise<string>} func The lookup function.
 * @api
 */
export function setEPSGLookup(func: (arg0: number) => Promise<string>): void;
/**
 * Get the current EPSG lookup function.
 *
 * @return {function(number):Promise<string>} The EPSG lookup function.
 */
export function getEPSGLookup(): (arg0: number) => Promise<string>;
/**
 * Get a projection from an EPSG code.  This function fetches the projection
 * definition from the epsg.io website, registers this definition for use with
 * proj4, and returns a configured projection.  You must call import proj4 and
 * call {@link module:ol/proj/proj4.register} before using this function.
 *
 * If the projection definition is already registered with proj4, it will not
 * be fetched again (so it is ok to call this function multiple times with the
 * same code).
 *
 * @param {number|string} code The EPSG code (e.g. 4326 or 'EPSG:4326').
 * @return {Promise<Projection>} The projection.
 * @api
 */
export function fromEPSGCode(code: number | string): Promise<Projection>;
/**
 * Generate an EPSG lookup function which uses the MapTiler Coordinates API to find projection
 * definitions which do not require proj4 to be configured to handle `+nadgrids` parameters.
 * Call {@link module:ol/proj/proj4.setEPSGLookup} use the function for lookups
 * `setEPSGLookup(epsgLookupMapTiler('{YOUR_MAPTILER_API_KEY_HERE}'))`.
 *
 * @param {string} key MapTiler API key.  Get your own API key at https://www.maptiler.com/cloud/.
 * @return {function(number):Promise<string>} The EPSG lookup function.
 * @api
 */
export function epsgLookupMapTiler(key: string): (arg0: number) => Promise<string>;
import Projection from './Projection.js';
//# sourceMappingURL=proj4.d.ts.map