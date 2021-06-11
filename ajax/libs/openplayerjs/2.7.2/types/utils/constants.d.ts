/**
 * Reference of Window.Navigator to obtain browser's information.
 *
 * @type Navigator
 * @default
 */
export declare const NAV: any;
/**
 * Browser's user agent.
 *
 * @type string
 * @default
 */
export declare const UA: any;
/**
 * Check if browser's user agent is related to an iPad.
 *
 * @type boolean
 * @default
 */
export declare const IS_IPAD: boolean;
/**
 * Check if browser's user agent is related to an iPhone.
 *
 * @type boolean
 * @default
 */
export declare const IS_IPHONE: boolean;
/**
 * Check if browser's user agent is related to an iPod.
 *
 * @type boolean
 * @default
 */
export declare const IS_IPOD: boolean;
/**
 * Check if browser's user agent is related to an iOS device (iPhone, iPad, iPod).
 *
 * @type boolean
 * @default
 */
export declare const IS_IOS: boolean;
/**
 * Check if browser's user agent is related to an Android device.
 *
 * @type boolean
 * @default
 */
export declare const IS_ANDROID: boolean;
/**
 * Check if current browser is Internet Explorer (any version).
 *
 * @type boolean
 * @default
 */
export declare const IS_IE: boolean;
/**
 * Check if current browser is Microsoft Edge (any version).
 *
 * @type boolean
 * @default
 */
export declare const IS_EDGE: boolean;
/**
 * Check if current browser is Chrome (any version).
 *
 * @type boolean
 * @default
 */
export declare const IS_CHROME: boolean;
/**
 * Check if current browser is Mozilla Firefox (any version).
 *
 * @type boolean
 * @default
 */
export declare const IS_FIREFOX: boolean;
/**
 * Check if current browser is WebKit Safari (any version).
 *
 * @type boolean
 * @default
 */
export declare const IS_SAFARI: boolean;
/**
 * Check if current browser is Android's Stock browser (any version).
 *
 * @type boolean
 * @default
 */
export declare const IS_STOCK_ANDROID: boolean;
/**
 * Check if current browser supports MediaSource API.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
 * @type boolean
 * @default
 */
export declare const HAS_MSE: boolean;
/**
 * Check if current browser supports HLS streaming.
 *
 * @see https://github.com/video-dev/hls.js/blob/master/src/is-supported.js
 * @type boolean
 * @default
 */
export declare const SUPPORTS_HLS: () => boolean;
/**
 * Minimum amount of content in an M3U8 file to determine if DVR mode should be enabled
 */
export declare const DVR_THRESHOLD = 120;
/**
 * Event options to be passed when using `addEventListener` for browser optimizations
 */
export declare const EVENT_OPTIONS: boolean | {
    passive: boolean;
};
