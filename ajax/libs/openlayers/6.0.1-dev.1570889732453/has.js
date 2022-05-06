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
 * Image.prototype.decode() is supported.
 * @type {boolean}
 */
export var IMAGE_DECODE = typeof Image !== 'undefined' && Image.prototype.decode;
//# sourceMappingURL=has.js.map