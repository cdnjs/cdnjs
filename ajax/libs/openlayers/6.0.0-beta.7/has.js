/**
 * @module ol/has
 */
var ua = typeof navigator !== 'undefined' ?
    navigator.userAgent.toLowerCase() : '';
/**
 * User agent string says we are dealing with Firefox as browser.
 * @type {boolean}
 */
export var FIREFOX = ua.indexOf('firefox') !== -1;
/**
 * User agent string says we are dealing with Safari as browser.
 * @type {boolean}
 */
export var SAFARI = ua.indexOf('safari') !== -1 && ua.indexOf('chrom') == -1;
/**
 * User agent string says we are dealing with a WebKit engine.
 * @type {boolean}
 */
export var WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1;
/**
 * User agent string says we are dealing with a Mac as platform.
 * @type {boolean}
 */
export var MAC = ua.indexOf('macintosh') !== -1;
/**
 * The ratio between physical pixels and device-independent pixels
 * (dips) on the device (`window.devicePixelRatio`).
 * @const
 * @type {number}
 * @api
 */
export var DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
/**
 * Is HTML5 geolocation supported in the current browser?
 * @const
 * @type {boolean}
 * @api
 */
export var GEOLOCATION = 'geolocation' in navigator;
/**
 * True if browser supports touch events.
 * @const
 * @type {boolean}
 * @api
 */
export var TOUCH = 'ontouchstart' in window;
/**
 * True if browser supports pointer events.
 * @const
 * @type {boolean}
 */
export var POINTER = 'PointerEvent' in window;
/**
 * True if browser supports ms pointer events (IE 10).
 * @const
 * @type {boolean}
 */
export var MSPOINTER = !!(navigator.msPointerEnabled);
export { HAS as WEBGL } from './webgl.js';
//# sourceMappingURL=has.js.map