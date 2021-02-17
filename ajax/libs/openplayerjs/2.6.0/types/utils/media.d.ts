import Source from '../interfaces/source';
/**
 * Get media file extension from a URL.
 *
 * @export
 * @param {string} url  The target URL.
 * @returns {string}
 */
export declare function getExtension(url: string): string;
/**
 * Check if URL is an HLS element.
 *
 * @export
 * @param {Source} media  The target media, including URL and type.
 * @returns {boolean}
 */
export declare function isHlsSource(media: Source): boolean;
/**
 * Check if URL is an M3U list.
 *
 * @export
 * @param {Source} media  The target media, including URL and type.
 * @returns {boolean}
 */
export declare function isM3USource(media: Source): boolean;
/**
 * Check if URL is an MPEG-DASH element.
 *
 * @export
 * @param {Source} media  The target media, including URL and type.
 * @returns {boolean}
 */
export declare function isDashSource(media: Source): boolean;
/**
 * Check if URL is an FLV element.
 *
 * @export
 * @param {Source} media  The target media, including URL and type.
 * @returns {boolean}
 */
export declare function isFlvSource(media: Source): boolean;
/**
 * Get a base MIME type using a URL anc hecking its file extension;
 * it will default to `video/mp4` if nothing found
 *
 * @export
 * @param {string} url  The target URL to check media extension from.
 * @returns {string}
 */
export declare function predictType(url: string): string;
/**
 * Test if browser supports autoplay.
 *
 * It also checks if media requires to be muted or not, per browser's constrains.
 * @see https://raw.githubusercontent.com/googleads/googleads-ima-html5/2.11/attempt_to_autoplay/ads.js
 * @see https://github.com/Modernizr/Modernizr/issues/1095#issuecomment-304682473
 * @export
 * @param {HTMLMediaElement} media  Callback to determine if browser can autoplay.
 * @param {function} autoplay  Callback to determine if browser can autoplay.
 * @param {function} muted  Callback to determine if browser requires media to be muted.
 * @param {function} callback  Custom callback after prior checks have been run.
 */
export declare function isAutoplaySupported(media: HTMLMediaElement, autoplay: (n: any) => any, muted: (n: any) => any, callback: () => any): void;
