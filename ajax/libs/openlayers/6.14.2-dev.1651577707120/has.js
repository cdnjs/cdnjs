/**
 * @module ol/has
 */
var ua = typeof navigator !== 'undefined' && typeof navigator.userAgent !== 'undefined'
    ? navigator.userAgent.toLowerCase()
    : '';
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
 * https://bugs.webkit.org/show_bug.cgi?id=237906
 * @type {boolean}
 */
export var SAFARI_BUG_237906 = SAFARI &&
    !!(ua.indexOf('version/15.4') >= 0 ||
        ua.match(/cpu (os|iphone os) 15_4 like mac os x/));
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
export var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1;
/**
 * The execution context is a worker with OffscreenCanvas available.
 * @const
 * @type {boolean}
 */
export var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== 'undefined' &&
    typeof OffscreenCanvas !== 'undefined' &&
    self instanceof WorkerGlobalScope; //eslint-disable-line
/**
 * Image.prototype.decode() is supported.
 * @type {boolean}
 */
export var IMAGE_DECODE = typeof Image !== 'undefined' && Image.prototype.decode;
/**
 * @type {boolean}
 */
export var PASSIVE_EVENT_LISTENERS = (function () {
    var passive = false;
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passive = true;
            },
        });
        window.addEventListener('_', null, options);
        window.removeEventListener('_', null, options);
    }
    catch (error) {
        // passive not supported
    }
    return passive;
})();
//# sourceMappingURL=has.js.map