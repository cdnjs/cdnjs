/**
 * Appends query parameters to a URI.
 *
 * @param {string} uri The original URI, which may already have query data.
 * @param {!Object} params An object where keys are URI-encoded parameter keys,
 *     and the values are arbitrary types or arrays.
 * @return {string} The new URI.
 */
export function appendParams(uri: string, params: any): string;
/**
 * @param {string} template The URL template.  Should have `{x}`, `{y}`, and `{z}` placeholders.  If
 * the template has a `{-y}` placeholder, the `maxY` parameter must be supplied.
 * @param {number} z The tile z coordinate.
 * @param {number} x The tile x coordinate.
 * @param {number} y The tile y coordinate.
 * @param {number} [maxY] The maximum y coordinate at the given z level.
 * @return {string} The URL.
 */
export function renderXYZTemplate(template: string, z: number, x: number, y: number, maxY?: number): string;
/**
 * @param {Array<string>} urls List of URLs.
 * @param {number} z The tile z coordinate.
 * @param {number} x The tile x coordinate.
 * @param {number} y The tile y coordinate.
 * @return {string} The chosen URL.
 */
export function pickUrl(urls: Array<string>, z: number, x: number, y: number): string;
/**
 * @param {string} url URL.
 * @return {Array<string>} Array of urls.
 */
export function expandUrl(url: string): Array<string>;
//# sourceMappingURL=uri.d.ts.map