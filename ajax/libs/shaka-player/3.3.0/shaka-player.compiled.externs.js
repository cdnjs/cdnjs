/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Generated externs.  DO NOT EDIT!
 * @externs
 * @suppress {duplicate} To prevent compiler errors with the
 *   namespace being declared both here and by goog.provide in the
 *   library.
 */

/** @namespace */
window.shaka = {};
/** @const */
shaka.abr = {};
/** @const */
shaka.ads = {};
/** @const */
shaka.cast = {};
/** @const */
shaka.dash = {};
/** @const */
shaka.hls = {};
/** @const */
shaka.media = {};
/** @const */
shaka.net = {};
/** @const */
shaka.offline = {};
/** @const */
shaka.text = {};
/** @const */
shaka.util = {};
/** @const */
shaka.util.CmcdManager = {};

/**
 * @implements {shaka.extern.Cue}
 */
shaka.text.Cue = class {
  /**
   * @param {number} startTime
   * @param {number} endTime
   * @param {string} payload
   */
  constructor(startTime, endTime, payload) {}
};
/**
     * @override
     */
shaka.text.Cue.prototype.startTime;
/**
     * @override
     */
shaka.text.Cue.prototype.direction;
/**
     * @override
     */
shaka.text.Cue.prototype.endTime;
/**
     * @override
     * @type {string}
     */
shaka.text.Cue.prototype.payload;
/**
     * @override
     */
shaka.text.Cue.prototype.region;
/**
     * @override
     */
shaka.text.Cue.prototype.position;
/**
     * @override
     */
shaka.text.Cue.prototype.positionAlign;
/**
     * @override
     */
shaka.text.Cue.prototype.size;
/**
     * @override
     */
shaka.text.Cue.prototype.textAlign;
/**
     * @override
     */
shaka.text.Cue.prototype.writingMode;
/**
     * @override
     */
shaka.text.Cue.prototype.lineInterpretation;
/**
     * @override
     */
shaka.text.Cue.prototype.line;
/**
     * @override
     */
shaka.text.Cue.prototype.lineHeight;
/**
     * Line Alignment is set to start by default.
     * @override
     */
shaka.text.Cue.prototype.lineAlign;
/**
     * Set the captions at the bottom of the text container by default.
     * @override
     */
shaka.text.Cue.prototype.displayAlign;
/**
     * @override
     */
shaka.text.Cue.prototype.color;
/**
     * @override
     */
shaka.text.Cue.prototype.backgroundColor;
/**
     * @override
     */
shaka.text.Cue.prototype.backgroundImage;
/**
     * @override
     */
shaka.text.Cue.prototype.border;
/**
     * @override
     */
shaka.text.Cue.prototype.textStrokeColor;
/**
     * @override
     */
shaka.text.Cue.prototype.textStrokeWidth;
/**
     * @override
     */
shaka.text.Cue.prototype.fontSize;
/**
     * @override
     */
shaka.text.Cue.prototype.fontWeight;
/**
     * @override
     */
shaka.text.Cue.prototype.fontStyle;
/**
     * @override
     */
shaka.text.Cue.prototype.fontFamily;
/**
     * @override
     */
shaka.text.Cue.prototype.letterSpacing;
/**
     * @override
     */
shaka.text.Cue.prototype.linePadding;
/**
     * @override
     */
shaka.text.Cue.prototype.opacity;
/**
     * @override
     */
shaka.text.Cue.prototype.textDecoration;
/**
     * @override
     */
shaka.text.Cue.prototype.wrapLine;
/**
     * @override
     */
shaka.text.Cue.prototype.id;
/**
     * @override
     */
shaka.text.Cue.prototype.nestedCues;
/**
     * @override
     */
shaka.text.Cue.prototype.lineBreak;
/**
     * @override
     */
shaka.text.Cue.prototype.spacer;
/**
     * @override
     */
shaka.text.Cue.prototype.cellResolution;
/**
 * @enum {string}
 */
shaka.text.Cue.positionAlign = {
  'LEFT': 'line-left',
  'RIGHT': 'line-right',
  'CENTER': 'center',
  'AUTO': 'auto'
};
/**
 * @enum {string}
 */
shaka.text.Cue.textAlign = {
  'LEFT': 'left',
  'RIGHT': 'right',
  'CENTER': 'center',
  'START': 'start',
  'END': 'end'
};
/**
 * Vertical alignments of the cues within their extents.
 * 'BEFORE' means displaying at the top of the captions container box, 'CENTER'
 *  means in the middle, 'AFTER' means at the bottom.
 * @enum {string}
 */
shaka.text.Cue.displayAlign = {
  'BEFORE': 'before',
  'CENTER': 'center',
  'AFTER': 'after'
};
/**
 * @enum {string}
 */
shaka.text.Cue.direction = {
  'HORIZONTAL_LEFT_TO_RIGHT': 'ltr',
  'HORIZONTAL_RIGHT_TO_LEFT': 'rtl'
};
/**
 * @enum {string}
 */
shaka.text.Cue.writingMode = {
  'HORIZONTAL_TOP_TO_BOTTOM': 'horizontal-tb',
  'VERTICAL_LEFT_TO_RIGHT': 'vertical-lr',
  'VERTICAL_RIGHT_TO_LEFT': 'vertical-rl'
};
/**
 * @enum {number}
 */
shaka.text.Cue.lineInterpretation = {
  'LINE_NUMBER': 0,
  'PERCENTAGE': 1
};
/**
 * @enum {string}
 */
shaka.text.Cue.lineAlign = {
  'CENTER': 'center',
  'START': 'start',
  'END': 'end'
};
/**
 * Default text color according to
 * https://w3c.github.io/webvtt/#default-text-color
 * @enum {string}
 */
shaka.text.Cue.defaultTextColor = {
  'white': '#FFF',
  'lime': '#0F0',
  'cyan': '#0FF',
  'red': '#F00',
  'yellow': '#FF0',
  'magenta': '#F0F',
  'blue': '#00F',
  'black': '#000'
};
/**
 * Default text background color according to
 * https://w3c.github.io/webvtt/#default-text-background
 * @enum {string}
 */
shaka.text.Cue.defaultTextBackgroundColor = {
  'bg_white': '#FFF',
  'bg_lime': '#0F0',
  'bg_cyan': '#0FF',
  'bg_red': '#F00',
  'bg_yellow': '#FF0',
  'bg_magenta': '#F0F',
  'bg_blue': '#00F',
  'bg_black': '#000'
};
/**
 * In CSS font weight can be a number, where 400 is normal and 700 is bold.
 * Use these values for the enum for consistency.
 * @enum {number}
 */
shaka.text.Cue.fontWeight = {
  'NORMAL': 400,
  'BOLD': 700
};
/**
 * @enum {string}
 */
shaka.text.Cue.fontStyle = {
  'NORMAL': 'normal',
  'ITALIC': 'italic',
  'OBLIQUE': 'oblique'
};
/**
 * @enum {string}
 */
shaka.text.Cue.textDecoration = {
  'UNDERLINE': 'underline',
  'LINE_THROUGH': 'lineThrough',
  'OVERLINE': 'overline'
};
/**
 * @implements {shaka.extern.CueRegion}
 * @struct
 */
shaka.text.CueRegion = class {
  /** */
  constructor() {}
};
/**
     * @override
     */
shaka.text.CueRegion.prototype.id;
/**
     * @override
     */
shaka.text.CueRegion.prototype.viewportAnchorX;
/**
     * @override
     */
shaka.text.CueRegion.prototype.viewportAnchorY;
/**
     * @override
     */
shaka.text.CueRegion.prototype.regionAnchorX;
/**
     * @override
     */
shaka.text.CueRegion.prototype.regionAnchorY;
/**
     * @override
     */
shaka.text.CueRegion.prototype.width;
/**
     * @override
     */
shaka.text.CueRegion.prototype.height;
/**
     * @override
     */
shaka.text.CueRegion.prototype.heightUnits;
/**
     * @override
     */
shaka.text.CueRegion.prototype.widthUnits;
/**
     * @override
     */
shaka.text.CueRegion.prototype.viewportAnchorUnits;
/**
     * @override
     */
shaka.text.CueRegion.prototype.scroll;
/**
 * @enum {number}
 */
shaka.text.CueRegion.units = {
  'PX': 0,
  'PERCENTAGE': 1,
  'LINES': 2
};
/**
 * @enum {string}
 */
shaka.text.CueRegion.scrollMode = {
  'NONE': '',
  'UP': 'up'
};
/**
 * @summary A set of BufferSource utility functions.
 */
shaka.util.BufferUtils = class {
  /**
   * Compare two buffers for equality.  For buffers of different types, this
   * compares the underlying buffers as binary data.
   * @param {?BufferSource} arr1
   * @param {?BufferSource} arr2
   * @return {boolean}
   */
  static equal(arr1, arr2) {}
  /**
   * Gets an ArrayBuffer that contains the data from the given TypedArray.  Note
   * this will allocate a new ArrayBuffer if the object is a partial view of
   * the data.
   * @param {!BufferSource} view
   * @return {!ArrayBuffer}
   */
  static toArrayBuffer(view) {}
  /**
   * Creates a new Uint8Array view on the same buffer.  This clamps the values
   * to be within the same view (i.e. you can't use this to move past the end
   * of the view, even if the underlying buffer is larger).  However, you can
   * pass a negative offset to access the data before the view.
   * @param {BufferSource} data
   * @param {number=} offset The offset from the beginning of this data's view
   *   to start the new view at.
   * @param {number=} length The byte length of the new view.
   * @return {!Uint8Array}
   */
  static toUint8(data, offset, length) {}
  /**
   * Creates a DataView over the given buffer.
   * @see toUint8
   * @param {BufferSource} buffer
   * @param {number=} offset
   * @param {number=} length
   * @return {!DataView}
   */
  static toDataView(buffer, offset, length) {}
};
/**
 * An interface to standardize how objects are destroyed.
 * @interface
 */
shaka.util.IDestroyable = class {
  /**
   * Request that this object be destroyed, releasing all resources and shutting
   * down all operations. Returns a Promise which is resolved when destruction
   * is complete. This Promise should never be rejected.
   * @return {!Promise}
   */
  destroy() {}
};
/**
 */
shaka.dependencies = class {
  /**
   * Registers a new dependency.
   * @param {shaka.dependencies.Allowed} key which is used for retrieving a
   *   dependency
   * @param {?} dep a dependency
   */
  static add(key, dep) {}
  /**
   * Check if we have a dependency for the key.
   * @param {shaka.dependencies.Allowed} key key
   * @return {boolean}
   */
  static has(key) {}
};
/**
 * @enum {string}
 */
shaka.dependencies.Allowed = {
  muxjs: 'muxjs'
};
/**
 * @summary
 * Describes an error that happened.
 * @description
 * This uses numerical codes to describe
 * which error happened.
 * Some error are caused by errors from the browser.  In these cases, the error
 * object is provided as part of the <code>data</code> field.  System codes come
 * from the browser and may or may not be documented.  Here are some places
 * where the errors may be documented:
 * <ul>
 *   <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaError">MediaError</a>
 *   <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">HTTP Codes</a>
 *   <li><a href="https://hresult.info">Edge/PlayReady errors</a>
 * </ul>
 * @implements {shaka.extern.Error}
 * @extends {Error}
 */
shaka.util.Error = class {
  /**
   * @param {shaka.util.Error.Severity} severity
   * @param {shaka.util.Error.Category} category
   * @param {shaka.util.Error.Code} code
   * @param {...*} varArgs
   */
  constructor(severity, category, code, ...varArgs) {}
};
/**
     * @override
     */
shaka.util.Error.prototype.severity;
/**
     * @override
     */
shaka.util.Error.prototype.category;
/**
     * @override
     */
shaka.util.Error.prototype.code;
/**
     * @override
     */
shaka.util.Error.prototype.data;
/**
     * @override
     */
shaka.util.Error.prototype.handled;
/**
 * @enum {number}
 */
shaka.util.Error.Severity = {
  'RECOVERABLE': 1,
  'CRITICAL': 2
};
/**
 * @enum {number}
 */
shaka.util.Error.Category = {
  'NETWORK': 1,
  'TEXT': 2,
  'MEDIA': 3,
  'MANIFEST': 4,
  'STREAMING': 5,
  'DRM': 6,
  'PLAYER': 7,
  'CAST': 8,
  'STORAGE': 9,
  'ADS': 10
};
/**
 * @enum {number}
 */
shaka.util.Error.Code = {
  'UNSUPPORTED_SCHEME': 1000,
  'BAD_HTTP_STATUS': 1001,
  'HTTP_ERROR': 1002,
  'TIMEOUT': 1003,
  'MALFORMED_DATA_URI': 1004,
  'REQUEST_FILTER_ERROR': 1006,
  'RESPONSE_FILTER_ERROR': 1007,
  'MALFORMED_TEST_URI': 1008,
  'UNEXPECTED_TEST_REQUEST': 1009,
  'ATTEMPTS_EXHAUSTED': 1010,
  'INVALID_TEXT_HEADER': 2000,
  'INVALID_TEXT_CUE': 2001,
  'UNABLE_TO_DETECT_ENCODING': 2003,
  'BAD_ENCODING': 2004,
  'INVALID_XML': 2005,
  'INVALID_MP4_TTML': 2007,
  'INVALID_MP4_VTT': 2008,
  'UNABLE_TO_EXTRACT_CUE_START_TIME': 2009,
  'INVALID_MP4_CEA': 2010,
  'TEXT_COULD_NOT_GUESS_MIME_TYPE': 2011,
  'CANNOT_ADD_EXTERNAL_TEXT_TO_SRC_EQUALS': 2012,
  'TEXT_ONLY_WEBVTT_SRC_EQUALS': 2013,
  'MISSING_TEXT_PLUGIN': 2014,
  'BUFFER_READ_OUT_OF_BOUNDS': 3000,
  'JS_INTEGER_OVERFLOW': 3001,
  'EBML_OVERFLOW': 3002,
  'EBML_BAD_FLOATING_POINT_SIZE': 3003,
  'MP4_SIDX_WRONG_BOX_TYPE': 3004,
  'MP4_SIDX_INVALID_TIMESCALE': 3005,
  'MP4_SIDX_TYPE_NOT_SUPPORTED': 3006,
  'WEBM_CUES_ELEMENT_MISSING': 3007,
  'WEBM_EBML_HEADER_ELEMENT_MISSING': 3008,
  'WEBM_SEGMENT_ELEMENT_MISSING': 3009,
  'WEBM_INFO_ELEMENT_MISSING': 3010,
  'WEBM_DURATION_ELEMENT_MISSING': 3011,
  'WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING': 3012,
  'WEBM_CUE_TIME_ELEMENT_MISSING': 3013,
  'MEDIA_SOURCE_OPERATION_FAILED': 3014,
  'MEDIA_SOURCE_OPERATION_THREW': 3015,
  'VIDEO_ERROR': 3016,
  'QUOTA_EXCEEDED_ERROR': 3017,
  'TRANSMUXING_FAILED': 3018,
  'CONTENT_TRANSFORMATION_FAILED': 3019,
  'UNABLE_TO_GUESS_MANIFEST_TYPE': 4000,
  'DASH_INVALID_XML': 4001,
  'DASH_NO_SEGMENT_INFO': 4002,
  'DASH_EMPTY_ADAPTATION_SET': 4003,
  'DASH_EMPTY_PERIOD': 4004,
  'DASH_WEBM_MISSING_INIT': 4005,
  'DASH_UNSUPPORTED_CONTAINER': 4006,
  'DASH_PSSH_BAD_ENCODING': 4007,
  'DASH_NO_COMMON_KEY_SYSTEM': 4008,
  'DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED': 4009,
  'DASH_CONFLICTING_KEY_IDS': 4010,
  'RESTRICTIONS_CANNOT_BE_MET': 4012,
  'HLS_PLAYLIST_HEADER_MISSING': 4015,
  'INVALID_HLS_TAG': 4016,
  'HLS_INVALID_PLAYLIST_HIERARCHY': 4017,
  'DASH_DUPLICATE_REPRESENTATION_ID': 4018,
  'HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND': 4020,
  'HLS_MASTER_PLAYLIST_NOT_PROVIDED': 4022,
  'HLS_REQUIRED_ATTRIBUTE_MISSING': 4023,
  'HLS_REQUIRED_TAG_MISSING': 4024,
  'HLS_COULD_NOT_GUESS_CODECS': 4025,
  'HLS_KEYFORMATS_NOT_SUPPORTED': 4026,
  'DASH_UNSUPPORTED_XLINK_ACTUATE': 4027,
  'DASH_XLINK_DEPTH_LIMIT': 4028,
  'HLS_COULD_NOT_PARSE_SEGMENT_START_TIME': 4030,
  'CONTENT_UNSUPPORTED_BY_BROWSER': 4032,
  'CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM': 4033,
  'HLS_AES_128_ENCRYPTION_NOT_SUPPORTED': 4034,
  'HLS_INTERNAL_SKIP_STREAM': 4035,
  'NO_VARIANTS': 4036,
  'PERIOD_FLATTENING_FAILED': 4037,
  'INCONSISTENT_DRM_ACROSS_PERIODS': 4038,
  'HLS_VARIABLE_NOT_FOUND': 4039,
  'STREAMING_ENGINE_STARTUP_INVALID_STATE': 5006,
  'NO_RECOGNIZED_KEY_SYSTEMS': 6000,
  'REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE': 6001,
  'FAILED_TO_CREATE_CDM': 6002,
  'FAILED_TO_ATTACH_TO_VIDEO': 6003,
  'INVALID_SERVER_CERTIFICATE': 6004,
  'FAILED_TO_CREATE_SESSION': 6005,
  'FAILED_TO_GENERATE_LICENSE_REQUEST': 6006,
  'LICENSE_REQUEST_FAILED': 6007,
  'LICENSE_RESPONSE_REJECTED': 6008,
  'ENCRYPTED_CONTENT_WITHOUT_DRM_INFO': 6010,
  'NO_LICENSE_SERVER_GIVEN': 6012,
  'OFFLINE_SESSION_REMOVED': 6013,
  'EXPIRED': 6014,
  'SERVER_CERTIFICATE_REQUIRED': 6015,
  'INIT_DATA_TRANSFORM_ERROR': 6016,
  'SERVER_CERTIFICATE_REQUEST_FAILED': 6017,
  'LOAD_INTERRUPTED': 7000,
  'OPERATION_ABORTED': 7001,
  'NO_VIDEO_ELEMENT': 7002,
  'OBJECT_DESTROYED': 7003,
  'CONTENT_NOT_LOADED': 7004,
  'CAST_API_UNAVAILABLE': 8000,
  'NO_CAST_RECEIVERS': 8001,
  'ALREADY_CASTING': 8002,
  'UNEXPECTED_CAST_ERROR': 8003,
  'CAST_CANCELED_BY_USER': 8004,
  'CAST_CONNECTION_TIMED_OUT': 8005,
  'CAST_RECEIVER_APP_UNAVAILABLE': 8006,
  'STORAGE_NOT_SUPPORTED': 9000,
  'INDEXED_DB_ERROR': 9001,
  'DEPRECATED_OPERATION_ABORTED': 9002,
  'REQUESTED_ITEM_NOT_FOUND': 9003,
  'MALFORMED_OFFLINE_URI': 9004,
  'CANNOT_STORE_LIVE_OFFLINE': 9005,
  'NO_INIT_DATA_FOR_OFFLINE': 9007,
  'LOCAL_PLAYER_INSTANCE_REQUIRED': 9008,
  'NEW_KEY_OPERATION_NOT_SUPPORTED': 9011,
  'KEY_NOT_FOUND': 9012,
  'MISSING_STORAGE_CELL': 9013,
  'STORAGE_LIMIT_REACHED': 9014,
  'DOWNLOAD_SIZE_CALLBACK_ERROR': 9015,
  'MODIFY_OPERATION_NOT_SUPPORTED': 9016,
  'CS_IMA_SDK_MISSING': 10000,
  'CS_AD_MANAGER_NOT_INITIALIZED': 10001,
  'SS_IMA_SDK_MISSING': 10002,
  'SS_AD_MANAGER_NOT_INITIALIZED': 10003,
  'CURRENT_DAI_REQUEST_NOT_FINISHED': 10004
};
/**
 * @namespace shaka.util.StringUtils
 * @summary A set of string utility functions.
 */
shaka.util.StringUtils = class {
  /**
   * Creates a string from the given buffer as UTF-8 encoding.
   * @param {?BufferSource} data
   * @return {string}
   */
  static fromUTF8(data) {}
  /**
   * Creates a string from the given buffer as UTF-16 encoding.
   * @param {?BufferSource} data
   * @param {boolean} littleEndian
         true to read little endian, false to read big.
   * @param {boolean=} noThrow true to avoid throwing in cases where we may
   *     expect invalid input.  If noThrow is true and the data has an odd
   *     length,it will be truncated.
   * @return {string}
   */
  static fromUTF16(data, littleEndian, noThrow) {}
  /**
   * Creates a string from the given buffer, auto-detecting the encoding that is
   * being used.  If it cannot detect the encoding, it will throw an exception.
   * @param {?BufferSource} data
   * @return {string}
   */
  static fromBytesAutoDetect(data) {}
  /**
   * Creates a ArrayBuffer from the given string, converting to UTF-8 encoding.
   * @param {string} str
   * @return {!ArrayBuffer}
   */
  static toUTF8(str) {}
  /**
   * Creates a ArrayBuffer from the given string, converting to UTF-16 encoding.
   * @param {string} str
   * @param {boolean} littleEndian
   * @return {!ArrayBuffer}
   */
  static toUTF16(str, littleEndian) {}
  /**
   * Resets the fromCharCode method's implementation.
   * For debug use.
   */
  static resetFromCharCode() {}
};
/**
 * @summary A set of Uint8Array utility functions.
 */
shaka.util.Uint8ArrayUtils = class {
  /**
   * Compare two Uint8Arrays for equality.
   * @param {Uint8Array} arr1
   * @param {Uint8Array} arr2
   * @return {boolean}
   * @deprecated
   */
  static equal(arr1, arr2) {}
  /**
   * Convert a buffer to a base64 string. The output will be standard
   * alphabet as opposed to base64url safe alphabet.
   * @param {BufferSource} data
   * @return {string}
   */
  static toStandardBase64(data) {}
  /**
   * Convert a buffer to a base64 string.  The output will always use the
   * alternate encoding/alphabet also known as "base64url".
   * @param {BufferSource} data
   * @param {boolean=} padding If true, pad the output with equals signs.
   *   Defaults to true.
   * @return {string}
   */
  static toBase64(data, padding) {}
  /**
   * Convert a base64 string to a Uint8Array.  Accepts either the standard
   * alphabet or the alternate "base64url" alphabet.
   * @param {string} str
   * @return {!Uint8Array}
   */
  static fromBase64(str) {}
  /**
   * Convert a hex string to a Uint8Array.
   * @param {string} str
   * @return {!Uint8Array}
   */
  static fromHex(str) {}
  /**
   * Convert a buffer to a hex string.
   * @param {BufferSource} data
   * @return {string}
   */
  static toHex(data) {}
  /**
   * Concatenate buffers.
   * @param {...BufferSource} varArgs
   * @return {!Uint8Array}
   */
  static concat(...varArgs) {}
};
/**
 * @summary Manages text parsers and cues.
 * @implements {shaka.util.IDestroyable}
 */
shaka.text.TextEngine = class {
  /** @param {shaka.extern.TextDisplayer} displayer */
  constructor(displayer) {}
  /**
   * @param {string} mimeType
   * @param {!shaka.extern.TextParserPlugin} plugin
   */
  static registerParser(mimeType, plugin) {}
  /**
   * @param {string} mimeType
   */
  static unregisterParser(mimeType) {}
  /**
   * @return {?shaka.extern.TextParserPlugin}
   */
  static findParser(mimeType) {}
  /**
   * @override
   */
  destroy() {}
};
/**
 * @summary A set of language utility functions.
 * @final
 */
shaka.util.LanguageUtils = class {
  /**
   * Check if |locale1| and |locale2| are locale-compatible.
   * Locale-compatible is defined as all components in each locale match. Since
   * we only respect the language and region components, we only check that
   * the language and region components match.
   * Examples:
   *  Locale A | Locale B | Locale Compatible
   *  ---------------------------------------
   *  en-US    | en-US    | true
   *  en       | en-US    | false
   *  en-US    | en-CA    | false
   * @param {string} locale1
   * @param {string} locale2
   * @return {boolean}
   */
  static areLocaleCompatible(locale1, locale2) {}
  /**
   * Check if |locale1| and |locale2| are language-compatible.
   * Language compatible is when the language component of each locale matches.
   * This means that no matter what region they have (or don't have) as long as
   * the language components match, they are language-compatible.
   * Examples:
   *  Locale A | Locale B | Language-Compatible
   *  -----------------------------------------
   *  en-US    | en-US    | true
   *  en-US    | en       | true
   *  en-US    | en-CA    | true
   *  en-CA    | fr-CA    | false
   * @param {string} locale1
   * @param {string} locale2
   * @return {boolean}
   */
  static areLanguageCompatible(locale1, locale2) {}
  /**
   * Check if |possibleParent| is the parent locale of |possibleChild|. Because
   * we do not support dialects, the parent-child relationship is a lot simpler.
   * In a parent child relationship:
   *    - The parent and child have the same language-component
   *    - The parent has no region-component
   *    - The child has a region-component
   * Example:
   *  Locale A | Locale B | Is A The parent of B?
   *  --------------------------------------------
   *  en-US    | en-US    | no
   *  en-US    | en       | no
   *  en       | en-US    | yes
   *  en       | en       | no
   *  en       | fr       | no
   * @param {string} possibleParent
   * @param {string} possibleChild
   * @return {boolean}
   */
  static isParentOf(possibleParent, possibleChild) {}
  /**
   * Check if |localeA| shares the same parent with |localeB|. Since we don't
   * support dialect, we will only look at language and region. For two locales
   * to be siblings:
   *    - Both must have language-components
   *    - Both must have region-components
   *    - Both must have the same language-component
   * Example:
   *  Locale A | Locale B | Siblings?
   *  --------------------------------------------
   *  en-US    | en-US    | yes
   *  en-US    | en-CA    | yes
   *  en-US    | en       | no
   *  en       | en-US    | no
   *  en       | en       | no
   *  en       | fr       | no
   * @param {string} localeA
   * @param {string} localeB
   * @return {boolean}
   */
  static isSiblingOf(localeA, localeB) {}
  /**
   * Normalize a locale. This will take a locale and canonicalize it to a state
   * that we are prepared to work with.
   * We only support with:
   *   - language
   *   - language-REGION
   * If given a dialect, we will discard it. We will convert any 3-character
   * codes to 2-character codes. We will force language codes to lowercase and
   * region codes to uppercase.
   * @param {string} locale
   * @return {string}
   */
  static normalize(locale) {}
  /**
   * Check if two language codes are siblings. Language codes are siblings if
   * they share the same base language while neither one is the base language.
   * For example, "en-US" and "en-CA" are siblings but "en-US" and "en" are not
   * siblings.
   * @param {string} a
   * @param {string} b
   * @return {boolean}
   */
  static areSiblings(a, b) {}
  /**
   * Compute a numerical relatedness for language codes.  Language codes with a
   * higher relatedness are a better match.  Unrelated language codes have a
   * relatedness score of 0.
   * @param {string} target
   * @param {string} candidate
   * @return {number}
   */
  static relatedness(target, candidate) {}
  /**
   * Get the normalized base language for a language code.
   * @param {string} lang
   * @return {string}
   */
  static getBase(lang) {}
  /**
   * Get the normalized language of the given text stream. Will return 'und' if
   * a language is not found on the text stream.
   * This should always be used to get the language from a text stream.
   * @param {shaka.extern.Stream} stream
   * @return {string}
   */
  static getLocaleForText(stream) {}
  /**
   * Get the normalized locale for the given variant. This will look through
   * the variant to find the locale that represents the content in the variant.
   * This will return 'und' if no language can be found.
   * This should always be used to get the locale from a variant.
   * @param {shaka.extern.Variant} variant
   * @return {string}
   */
  static getLocaleForVariant(variant) {}
  /**
   * Find the locale in |searchSpace| that comes closest to |target|. If no
   * locale is found to be close to |target|, then |null| will be returned.
   * @param {string} target
   * @param {!Iterable.<string>} searchSpace
   * @return {?string}
   */
  static findClosestLocale(target, searchSpace) {}
};
/**
 * A timer allows a single function to be executed at a later time or at
 * regular intervals.
 * @final
 */
shaka.util.Timer = class {
  /**
   * Create a new timer. A timer is committed to a single callback function.
   * While there is no technical reason to do this, it is far easier to
   * understand and use timers when they are connected to one functional idea.
   * @param {function()} onTick
   */
  constructor(onTick) {}
  /**
   * Have the timer call |onTick| now.
   * @return {!shaka.util.Timer}
   */
  tickNow() {}
  /**
   * Have the timer call |onTick| after |seconds| has elapsed unless |stop| is
   * called first.
   * @param {number} seconds
   * @return {!shaka.util.Timer}
   */
  tickAfter(seconds) {}
  /**
   * Have the timer call |onTick| every |seconds| until |stop| is called.
   * @param {number} seconds
   * @return {!shaka.util.Timer}
   */
  tickEvery(seconds) {}
  /**
   * Stop the timer and clear the previous behaviour. The timer is still usable
   * after calling |stop|.
   */
  stop() {}
};
/**
 * @summary
 * <p>
 * This defines the default ABR manager for the Player.  An instance of this
 * class is used when no ABR manager is given.
 * </p>
 * <p>
 * The behavior of this class is to take throughput samples using
 * segmentDownloaded to estimate the current network bandwidth.  Then it will
 * use that to choose the streams that best fit the current bandwidth.  It will
 * always pick the highest bandwidth variant it thinks can be played.
 * </p>
 * <p>
 * After initial choices are made, this class will call switchCallback() when
 * there is a better choice.  switchCallback() will not be called more than once
 * per ({@link shaka.abr.SimpleAbrManager.SWITCH_INTERVAL_MS}).
 * </p>
 * @implements {shaka.extern.AbrManager}
 */
shaka.abr.SimpleAbrManager = class {
  /** */
  constructor() {}
  /**
   * @override
   */
  stop() {}
  /**
   * @override
   */
  init(switchCallback) {}
  /**
   * @override
   */
  chooseVariant() {}
  /**
   * @override
   */
  enable() {}
  /**
   * @override
   */
  disable() {}
  /**
   * @override
   */
  segmentDownloaded(deltaTimeMs, numBytes) {}
  /**
   * @override
   */
  getBandwidthEstimate() {}
  /**
   * @override
   */
  setVariants(variants) {}
  /**
   * @override
   */
  playbackRateChanged(rate) {}
  /**
   * @override
   */
  configure(config) {}
};
/**
 * A utility to wrap abortable operations.  Note that these are not cancelable.
 * Cancelation implies undoing what has been done so far, whereas aborting only
 * means that further work is stopped.
 * @implements {shaka.extern.IAbortableOperation.<T>}
 * @template T
 */
shaka.util.AbortableOperation = class {
  /**
   * @param {!Promise.<T>} promise
   *   A Promise which represents the underlying operation.  It is resolved when
   *   the operation is complete, and rejected if the operation fails or is
   *   aborted.  Aborted operations should be rejected with a shaka.util.Error
   *   object using the error code OPERATION_ABORTED.
   * @param {function():!Promise} onAbort
   *   Will be called by this object to abort the underlying operation.
   *   This is not cancelation, and will not necessarily result in any work
   *   being undone.  abort() should return a Promise which is resolved when the
   *   underlying operation has been aborted.  The returned Promise should never
   *   be rejected.
   */
  constructor(promise, onAbort) {}
  /**
   * @param {!shaka.util.Error} error
   * @return {!shaka.util.AbortableOperation} An operation which has already
   *   failed with the error given by the caller.
   */
  static failed(error) {}
  /**
   * @return {!shaka.util.AbortableOperation} An operation which has already
   *   failed with the error OPERATION_ABORTED.
   */
  static aborted() {}
  /**
   * @param {U} value
   * @return {!shaka.util.AbortableOperation.<U>} An operation which has already
   *   completed with the given value.
   * @template U
   */
  static completed(value) {}
  /**
   * @param {!Promise.<U>} promise
   * @return {!shaka.util.AbortableOperation.<U>} An operation which cannot be
   *   aborted.  It will be completed when the given Promise is resolved, or
   *   will be failed when the given Promise is rejected.
   * @template U
   */
  static notAbortable(promise) {}
  /**
   * @override
   */
  abort() {}
  /**
   * @param {!Array.<!shaka.util.AbortableOperation>} operations
   * @return {!shaka.util.AbortableOperation} An operation which is resolved
   *   when all operations are successful and fails when any operation fails.
   *   For this operation, abort() aborts all given operations.
   */
  static all(operations) {}
  /**
   * @override
   */
  finally(onFinal) {}
  /**
   * @param {(undefined|
   *          function(T):U|
   *          function(T):!Promise.<U>|
   *          function(T):!shaka.util.AbortableOperation.<U>)} onSuccess
   *   A callback to be invoked after this operation is complete, to chain to
   *   another operation.  The callback can return a plain value, a Promise to
   *   an asynchronous value, or another AbortableOperation.
   * @param {function(*)=} onError
   *   An optional callback to be invoked if this operation fails, to perform
   *   some cleanup or error handling.  Analogous to the second parameter of
   *   Promise.prototype.then.
   * @return {!shaka.util.AbortableOperation.<U>} An operation which is resolved
   *   when this operation and the operation started by the callback are both
   *   complete.
   * @template U
   */
  chain(onSuccess, onError) {}
};
/**
 * @const {!Promise.<T>}
 */
shaka.util.AbortableOperation.prototype.promise;
/**
 * @summary Create an Event work-alike object based on the provided dictionary.
 * The event should contain all of the same properties from the dict.
 * @extends {Event}
 */
shaka.util.FakeEvent = class {
  /**
   * @param {string} type
   * @param {Map.<string, Object>=} dict
   */
  constructor(type, dict) {}
};
/**
 * @summary A work-alike for EventTarget.  Only DOM elements may be true
 * EventTargets, but this can be used as a base class to provide event dispatch
 * to non-DOM classes.  Only FakeEvents should be dispatched.
 * @implements {EventTarget}
 */
shaka.util.FakeEventTarget = class {
  /** */
  constructor() {}
  /**
   * Add an event listener to this object.
   * @param {string} type The event type to listen for.
   * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
   *   listener object to invoke.
   * @param {(!AddEventListenerOptions|boolean)=} options Ignored.
   * @override
   */
  addEventListener(type, listener, options) {}
  /**
   * Add an event listener to this object that is invoked for all events types
   * the object fires.
   * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
   *   listener object to invoke.
   */
  listenToAllEvents(listener) {}
  /**
   * Remove an event listener from this object.
   * @param {string} type The event type for which you wish to remove a
   *   listener.
   * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
   *   listener object to remove.
   * @param {(EventListenerOptions|boolean)=} options Ignored.
   * @override
   */
  removeEventListener(type, listener, options) {}
  /**
   * Dispatch an event from this object.
   * @param {!Event} event The event to be dispatched from this object.
   * @return {boolean} True if the default action was prevented.
   * @override
   */
  dispatchEvent(event) {}
};
/**
 * These are the listener types defined in the closure extern for EventTarget.
 * @typedef {EventListener|function(!Event):*}
 */
shaka.util.FakeEventTarget.ListenerType;
/**
 * NetworkingEngine wraps all networking operations.  This accepts plugins that
 * handle the actual request.  A plugin is registered using registerScheme.
 * Each scheme has at most one plugin to handle the request.
 * @implements {shaka.util.IDestroyable}
 */
shaka.net.NetworkingEngine = class extends shaka.util.FakeEventTarget {
  /**
   * @param {function(number, number)=} onProgressUpdated Called when a progress
   *   event is triggered. Passed the duration, in milliseconds, that the
   *   request took, and the number of bytes transferred.
   * @param {shaka.net.NetworkingEngine.OnHeadersReceived=} onHeadersReceived
   *   Called when the headers are received for a download.
   * @param {shaka.net.NetworkingEngine.OnDownloadFailed=} onDownloadFailed
   *   Called when a download fails, for any reason.
   */
  constructor(onProgressUpdated, onHeadersReceived, onDownloadFailed) {}
  /**
   * @param {boolean} forceHTTPS
   */
  setForceHTTPS(forceHTTPS) {}
  /**
   * Registers a scheme plugin.  This plugin will handle all requests with the
   * given scheme.  If a plugin with the same scheme already exists, it is
   * replaced, unless the existing plugin is of higher priority.
   * If no priority is provided, this defaults to the highest priority of
   * APPLICATION.
   * @param {string} scheme
   * @param {shaka.extern.SchemePlugin} plugin
   * @param {number=} priority
   * @param {boolean=} progressSupport
   */
  static registerScheme(scheme, plugin, priority, progressSupport) {}
  /**
   * Removes a scheme plugin.
   * @param {string} scheme
   */
  static unregisterScheme(scheme) {}
  /**
   * Registers a new request filter.  All filters are applied in the order they
   * are registered.
   * @param {shaka.extern.RequestFilter} filter
   */
  registerRequestFilter(filter) {}
  /**
   * Removes a request filter.
   * @param {shaka.extern.RequestFilter} filter
   */
  unregisterRequestFilter(filter) {}
  /**
   * Clears all request filters.
   */
  clearAllRequestFilters() {}
  /**
   * Registers a new response filter.  All filters are applied in the order they
   * are registered.
   * @param {shaka.extern.ResponseFilter} filter
   */
  registerResponseFilter(filter) {}
  /**
   * Removes a response filter.
   * @param {shaka.extern.ResponseFilter} filter
   */
  unregisterResponseFilter(filter) {}
  /**
   * Clears all response filters.
   */
  clearAllResponseFilters() {}
  /**
   * Gets a copy of the default retry parameters.
   * @return {shaka.extern.RetryParameters}
   * NOTE: The implementation moved to shaka.net.Backoff to avoid a circular
   * dependency between the two classes.
   */
  static defaultRetryParameters() {}
  /**
   * Makes a simple network request for the given URIs.
   * @param {!Array.<string>} uris
   * @param {shaka.extern.RetryParameters} retryParams
   * @param {?function(BufferSource):!Promise=} streamDataCallback
   * @return {shaka.extern.Request}
   */
  static makeRequest(uris, retryParams, streamDataCallback) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Makes a network request and returns the resulting data.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Request} request
   * @return {!shaka.net.NetworkingEngine.PendingRequest}
   */
  request(type, request) {}
};
/**
 * A wrapper class for the number of bytes remaining to be downloaded for the
 * request.
 * Instead of using PendingRequest directly, this class is needed to be sent to
 * plugin as a parameter, and a Promise is returned, before PendingRequest is
 * created.
 */
shaka.net.NetworkingEngine.NumBytesRemainingClass = class {
  /**
   * Constructor
   */
  constructor() {}
};
/**
 * A pending network request. This can track the current progress of the
 * download, and allows the request to be aborted if the network is slow.
 * @implements {shaka.extern.IAbortableOperation.<shaka.extern.Response>}
 * @extends {shaka.util.AbortableOperation}
 */
shaka.net.NetworkingEngine.PendingRequest = class extends shaka.util.AbortableOperation {
  /**
   * @param {!Promise} promise
   *   A Promise which represents the underlying operation.  It is resolved
   *   when the operation is complete, and rejected if the operation fails or
   *   is aborted.  Aborted operations should be rejected with a
   *   shaka.util.Error object using the error code OPERATION_ABORTED.
   * @param {function():!Promise} onAbort
   *   Will be called by this object to abort the underlying operation.  This
   *   is not cancelation, and will not necessarily result in any work being
   *   undone.  abort() should return a Promise which is resolved when the
   *   underlying operation has been aborted.  The returned Promise should
   *   never be rejected.
   * @param {shaka.net.NetworkingEngine.NumBytesRemainingClass}
   *   numBytesRemainingObj
   */
  constructor(promise, onAbort, numBytesRemainingObj) {}
};
/**
 * Request types.  Allows a filter to decide which requests to read/alter.
 * @enum {number}
 */
shaka.net.NetworkingEngine.RequestType = {
  'MANIFEST': 0,
  'SEGMENT': 1,
  'LICENSE': 2,
  'APP': 3,
  'TIMING': 4,
  'SERVER_CERTIFICATE': 5
};
/**
 * Priority level for network scheme plugins.
 * If multiple plugins are provided for the same scheme, only the
 * highest-priority one is used.
 * @enum {number}
 */
shaka.net.NetworkingEngine.PluginPriority = {
  'FALLBACK': 1,
  'PREFERRED': 2,
  'APPLICATION': 3
};
/**
 * @typedef {function(
 *    !Object.<string, string>,
 *    !shaka.extern.Request,
 *    !shaka.net.NetworkingEngine.RequestType)}
 * @description
 * A callback function that passes the shaka.extern.HeadersReceived along to
 * the player, plus some extra data.
 */
shaka.net.NetworkingEngine.OnHeadersReceived;
/**
 * @typedef {function(
 *    !shaka.extern.Request,
 *    ?shaka.util.Error,
 *    number,
 *    boolean)}
 * @description
 * A callback function that notifies the player when a download fails, for any
 * reason (e.g. even if the download was aborted).
 */
shaka.net.NetworkingEngine.OnDownloadFailed;
/**
 * An interface to standardize how objects release internal references
 * synchronously. If an object needs to asynchronously release references, then
 * it should use 'shaka.util.IDestroyable'.
 * @interface
 */
shaka.util.IReleasable = class {
  /**
   * Request that this object release all internal references.
   */
  release() {}
};
/**
 * @summary
 * An EventManager maintains a collection of "event
 * bindings" between event targets and event listeners.
 * @implements {shaka.util.IReleasable}
 */
shaka.util.EventManager = class {
  /** */
  constructor() {}
  /**
   * Detaches all event listeners.
   * @override
   */
  release() {}
  /**
   * Attaches an event listener to an event target.
   * @param {EventTarget} target The event target.
   * @param {string} type The event type.
   * @param {shaka.util.EventManager.ListenerType} listener The event listener.
   * @param {(boolean|!AddEventListenerOptions)=} options An object that
   *    specifies characteristics about the event listener.
   *    The passive option, if true, indicates that this function will never
   *    call preventDefault(), which improves scrolling performance.
   */
  listen(target, type, listener, options) {}
  /**
   * Attaches an event listener to an event target.  The listener will be
   * removed when the first instance of the event is fired.
   * @param {EventTarget} target The event target.
   * @param {string} type The event type.
   * @param {shaka.util.EventManager.ListenerType} listener The event listener.
   * @param {(boolean|!AddEventListenerOptions)=} options An object that
   *    specifies characteristics about the event listener.
   *    The passive option, if true, indicates that this function will never
   *    call preventDefault(), which improves scrolling performance.
   */
  listenOnce(target, type, listener, options) {}
  /**
   * Detaches an event listener from an event target.
   * @param {EventTarget} target The event target.
   * @param {string} type The event type.
   * @param {shaka.util.EventManager.ListenerType=} listener The event listener.
   */
  unlisten(target, type, listener) {}
  /**
   * Detaches all event listeners from all targets.
   */
  removeAll() {}
};
/**
 * @typedef {function(!Event)}
 */
shaka.util.EventManager.ListenerType;
/**
 * @summary A set of FairPlay utility functions.
 */
shaka.util.FairPlayUtils = class {
  /**
   * Using the default method, extract a content ID from the init data.  This is
   * based on the FairPlay example documentation.
   * @param {!BufferSource} initData
   * @return {string}
   */
  static defaultGetContentId(initData) {}
  /**
   * Transforms the init data buffer using the given data.  The format is:
   * <pre>
   * [4 bytes] initDataSize
   * [initDataSize bytes] initData
   * [4 bytes] contentIdSize
   * [contentIdSize bytes] contentId
   * [4 bytes] certSize
   * [certSize bytes] cert
   * </pre>
   * @param {!BufferSource} initData
   * @param {!BufferSource|string} contentId
   * @param {?BufferSource} cert  The server certificate; this will throw if not
   *   provided.
   * @return {!Uint8Array}
   */
  static initDataTransform(initData, contentId, cert) {}
};
/**
 * @summary An interface to register manifest parsers.
 */
shaka.media.ManifestParser = class {
  /**
   * Registers a manifest parser by file extension.
   * @param {string} extension The file extension of the manifest.
   * @param {shaka.extern.ManifestParser.Factory} parserFactory The factory
   *   used to create parser instances.
   */
  static registerParserByExtension(extension, parserFactory) {}
  /**
   * Registers a manifest parser by MIME type.
   * @param {string} mimeType The MIME type of the manifest.
   * @param {shaka.extern.ManifestParser.Factory} parserFactory The factory
   *   used to create parser instances.
   */
  static registerParserByMime(mimeType, parserFactory) {}
  /**
   * Unregisters a manifest parser by MIME type.
   * @param {string} mimeType The MIME type of the manifest.
   */
  static unregisterParserByMime(mimeType) {}
};
/**
  * @summary DataViewReader abstracts a DataView object.
  */
shaka.util.DataViewReader = class {
  /**
   * @param {BufferSource} data
   * @param {shaka.util.DataViewReader.Endianness} endianness The endianness.
   */
  constructor(data, endianness) {}
  /**
   * @return {boolean} True if the reader has more data, false otherwise.
   */
  hasMoreData() {}
  /**
   * Gets the current byte position.
   * @return {number}
   */
  getPosition() {}
  /**
   * Gets the byte length of the DataView.
   * @return {number}
   */
  getLength() {}
  /**
   * Reads an unsigned 8 bit integer, and advances the reader.
   * @return {number} The integer.
   */
  readUint8() {}
  /**
   * Reads an unsigned 16 bit integer, and advances the reader.
   * @return {number} The integer.
   */
  readUint16() {}
  /**
   * Reads an unsigned 32 bit integer, and advances the reader.
   * @return {number} The integer.
   */
  readUint32() {}
  /**
   * Reads a signed 32 bit integer, and advances the reader.
   * @return {number} The integer.
   */
  readInt32() {}
  /**
   * Reads an unsigned 64 bit integer, and advances the reader.
   * @return {number} The integer.
   */
  readUint64() {}
  /**
   * Reads the specified number of raw bytes.
   * @param {number} bytes The number of bytes to read.
   * @return {!Uint8Array}
   */
  readBytes(bytes) {}
  /**
   * Skips the specified number of bytes.
   * @param {number} bytes The number of bytes to skip.
   */
  skip(bytes) {}
  /**
   * Rewinds the specified number of bytes.
   * @param {number} bytes The number of bytes to rewind.
   */
  rewind(bytes) {}
  /**
   * Seeks to a specified position.
   * @param {number} position The desired byte position within the DataView.
   */
  seek(position) {}
  /**
   * Keeps reading until it reaches a byte that equals to zero.  The text is
   * assumed to be UTF-8.
   * @return {string}
   */
  readTerminatedString() {}
};
/**
 * Endianness.
 * @enum {number}
 */
shaka.util.DataViewReader.Endianness = {
  'BIG_ENDIAN': 0,
  'LITTLE_ENDIAN': 1
};
/**
 */
shaka.util.Mp4Parser = class {
  /** */
  constructor() {}
  /**
   * Declare a box type as a Box.
   * @param {string} type
   * @param {!shaka.util.Mp4Parser.CallbackType} definition
   * @return {!shaka.util.Mp4Parser}
   */
  box(type, definition) {}
  /**
   * Declare a box type as a Full Box.
   * @param {string} type
   * @param {!shaka.util.Mp4Parser.CallbackType} definition
   * @return {!shaka.util.Mp4Parser}
   */
  fullBox(type, definition) {}
  /**
   * Stop parsing.  Useful for extracting information from partial segments and
   * avoiding an out-of-bounds error once you find what you are looking for.
   */
  stop() {}
  /**
   * Parse the given data using the added callbacks.
   * @param {!BufferSource} data
   * @param {boolean=} partialOkay If true, allow reading partial payloads
   *   from some boxes. If the goal is a child box, we can sometimes find it
   *   without enough data to find all child boxes.
   * @param {boolean=} stopOnPartial If true, stop reading if an incomplete
   *   box is detected.
   */
  parse(data, partialOkay, stopOnPartial) {}
  /**
   * Parse the next box on the current level.
   * @param {number} absStart The absolute start position in the original
   *   byte array.
   * @param {!shaka.util.DataViewReader} reader
   * @param {boolean=} partialOkay If true, allow reading partial payloads
   *   from some boxes. If the goal is a child box, we can sometimes find it
   *   without enough data to find all child boxes.
   * @param {boolean=} stopOnPartial If true, stop reading if an incomplete
   *   box is detected.
   */
  parseNext(absStart, reader, partialOkay, stopOnPartial) {}
  /**
   * A callback that tells the Mp4 parser to treat the body of a box as a series
   * of boxes. The number of boxes is limited by the size of the parent box.
   * @param {!shaka.extern.ParsedBox} box
   */
  static children(box) {}
  /**
   * A callback that tells the Mp4 parser to treat the body of a box as a sample
   * description. A sample description box has a fixed number of children. The
   * number of children is represented by a 4 byte unsigned integer. Each child
   * is a box.
   * @param {!shaka.extern.ParsedBox} box
   */
  static sampleDescription(box) {}
  /**
   * Create a callback that tells the Mp4 parser to treat the body of a box as a
   * binary blob and to parse the body's contents using the provided callback.
   * @param {function(!Uint8Array)} callback
   * @return {!shaka.util.Mp4Parser.CallbackType}
   */
  static allData(callback) {}
  /**
   * Convert an integer type from a box into an ascii string name.
   * Useful for debugging.
   * @param {number} type The type of the box, a uint32.
   * @return {string}
   */
  static typeToString(type) {}
  /**
   * Find the header size of the box.
   * Useful for modifying boxes in place or finding the exact offset of a field.
   * @param {shaka.extern.ParsedBox} box
   * @return {number}
   */
  static headerSize(box) {}
};
/**
 * @typedef {function(!shaka.extern.ParsedBox)}
 */
shaka.util.Mp4Parser.CallbackType;
/**
 * Creates an InitSegmentReference, which provides the location to an
 * initialization segment.
 */
shaka.media.InitSegmentReference = class {
  /**
   * @param {function():!Array.<string>} uris A function that creates the URIs
   *   of the resource containing the segment.
   * @param {number} startByte The offset from the start of the resource to the
   *   start of the segment.
   * @param {?number} endByte The offset from the start of the resource
   *   to the end of the segment, inclusive.  A value of null indicates that the
   *   segment extends to the end of the resource.
   * @param {null|shaka.extern.MediaQualityInfo=} mediaQuality Information about
   *   the quality of the media associated with this init segment.
   */
  constructor(uris, startByte, endByte, mediaQuality) {}
  /**
   * Returns the offset from the start of the resource to the
   * start of the segment.
   * @return {number}
   */
  getStartByte() {}
  /**
   * Returns the offset from the start of the resource to the end of the
   * segment, inclusive.  A value of null indicates that the segment extends
   * to the end of the resource.
   * @return {?number}
   */
  getEndByte() {}
};
/**
 * SegmentReference provides the start time, end time, and location to a media
 * segment.
 */
shaka.media.SegmentReference = class {
  /**
   * @param {number} startTime The segment's start time in seconds.
   * @param {number} endTime The segment's end time in seconds.  The segment
   *   ends the instant before this time, so |endTime| must be strictly greater
   *   than |startTime|.
   * @param {function():!Array.<string>} uris
   *   A function that creates the URIs of the resource containing the segment.
   * @param {number} startByte The offset from the start of the resource to the
   *   start of the segment.
   * @param {?number} endByte The offset from the start of the resource to the
   *   end of the segment, inclusive.  A value of null indicates that the
   *   segment extends to the end of the resource.
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   *   The segment's initialization segment metadata, or null if the segments
   *   are self-initializing.
   * @param {number} timestampOffset
   *   The amount of time, in seconds, that must be added to the segment's
   *   internal timestamps to align it to the presentation timeline.
   *   <br>
   *   For DASH, this value should equal the Period start time minus the first
   *   presentation timestamp of the first frame/sample in the Period.  For
   *   example, for MP4 based streams, this value should equal Period start
   *   minus the first segment's tfdt box's 'baseMediaDecodeTime' field (after
   *   it has been converted to seconds).
   *   <br>
   *   For HLS, this value should be 0 to keep the presentation time at the most
   *   recent discontinuity minus the corresponding media time.
   * @param {number} appendWindowStart
   *   The start of the append window for this reference, relative to the
   *   presentation.  Any content from before this time will be removed by
   *   MediaSource.
   * @param {number} appendWindowEnd
   *   The end of the append window for this reference, relative to the
   *   presentation.  Any content from after this time will be removed by
   *   MediaSource.
   * @param {!Array.<!shaka.media.SegmentReference>=} partialReferences
   *   A list of SegmentReferences for the partial segments.
   * @param {?string=} tilesLayout
   *   The value is a grid-item-dimension consisting of two positive decimal
   *   integers in the format: column-x-row ('4x3'). It describes the
   *   arrangement of Images in a Grid. The minimum valid LAYOUT is '1x1'.
   */
  constructor(startTime, endTime, uris, startByte, endByte, initSegmentReference, timestampOffset, appendWindowStart, appendWindowEnd, partialReferences, tilesLayout) {}
  /**
   * Creates and returns the URIs of the resource containing the segment.
   * @return {!Array.<string>}
   */
  getUris() {}
  /**
   * Returns the segment's start time in seconds.
   * @return {number}
   */
  getStartTime() {}
  /**
   * Returns the segment's end time in seconds.
   * @return {number}
   */
  getEndTime() {}
  /**
   * Returns the offset from the start of the resource to the
   * start of the segment.
   * @return {number}
   */
  getStartByte() {}
  /**
   * Returns the offset from the start of the resource to the end of the
   * segment, inclusive.  A value of null indicates that the segment extends to
   * the end of the resource.
   * @return {?number}
   */
  getEndByte() {}
  /**
   * Returns the segment's tiles layout. Only defined in image segments.
   * @return {?string}
   */
  getTilesLayout() {}
};
/**
 * PresentationTimeline.
 */
shaka.media.PresentationTimeline = class {
  /**
   * @param {?number} presentationStartTime The wall-clock time, in seconds,
   *   when the presentation started or will start. Only required for live.
   * @param {number} presentationDelay The delay to give the presentation, in
   *   seconds.  Only required for live.
   * @param {boolean=} autoCorrectDrift Whether to account for drift when
   *   determining the availability window.
   * @see {shaka.extern.Manifest}
   * @see {@tutorial architecture}
   */
  constructor(presentationStartTime, presentationDelay, autoCorrectDrift) {}
  /**
   * @return {number} The presentation's duration in seconds.
   *   Infinity indicates that the presentation continues indefinitely.
   */
  getDuration() {}
  /**
   * @return {number} The presentation's max segment duration in seconds.
   */
  getMaxSegmentDuration() {}
  /**
   * Sets the presentation's duration.
   * @param {number} duration The presentation's duration in seconds.
   *   Infinity indicates that the presentation continues indefinitely.
   */
  setDuration(duration) {}
  /**
   * @return {?number} The presentation's start time in seconds.
   */
  getPresentationStartTime() {}
  /**
   * Sets the clock offset, which is the difference between the client's clock
   * and the server's clock, in milliseconds (i.e., serverTime = Date.now() +
   * clockOffset).
   * @param {number} offset The clock offset, in ms.
   */
  setClockOffset(offset) {}
  /**
   * Sets the presentation's static flag.
   * @param {boolean} isStatic If true, the presentation is static, meaning all
   *   segments are available at once.
   */
  setStatic(isStatic) {}
  /**
   * Sets the presentation's segment availability duration. The segment
   * availability duration should only be set for live.
   * @param {number} segmentAvailabilityDuration The presentation's new segment
   *   availability duration in seconds.
   */
  setSegmentAvailabilityDuration(segmentAvailabilityDuration) {}
  /**
   * Sets the presentation delay in seconds.
   * @param {number} delay
   */
  setDelay(delay) {}
  /**
   * Gets the presentation delay in seconds.
   * @return {number}
   */
  getDelay() {}
  /**
   * Gives PresentationTimeline a Stream's segments so it can size and position
   * the segment availability window, and account for missing segment
   * information.  This function should be called once for each Stream (no more,
   * no less).
   * @param {!Array.<!shaka.media.SegmentReference>} references
   */
  notifySegments(references) {}
  /**
   * Gives PresentationTimeline a Stream's minimum segment start time.
   * @param {number} startTime
   */
  notifyMinSegmentStartTime(startTime) {}
  /**
   * Gives PresentationTimeline a Stream's maximum segment duration so it can
   * size and position the segment availability window.  This function should be
   * called once for each Stream (no more, no less), but does not have to be
   * called if notifySegments() is called instead for a particular stream.
   * @param {number} maxSegmentDuration The maximum segment duration for a
   *   particular stream.
   */
  notifyMaxSegmentDuration(maxSegmentDuration) {}
  /**
   * Offsets the segment times by the given amount.
   * @param {number} offset The number of seconds to offset by.  A positive
   *   number adjusts the segment times forward.
   */
  offset(offset) {}
  /**
   * @return {boolean} True if the presentation is live; otherwise, return
   *   false.
   */
  isLive() {}
  /**
   * @return {boolean} True if the presentation is in progress (meaning not
   *   live, but also not completely available); otherwise, return false.
   */
  isInProgress() {}
  /**
   * Gets the presentation's current segment availability start time.  Segments
   * ending at or before this time should be assumed to be unavailable.
   * @return {number} The current segment availability start time, in seconds,
   *   relative to the start of the presentation.
   */
  getSegmentAvailabilityStart() {}
  /**
   * Sets the start time of the user-defined seek range.  This is only used for
   * VOD content.
   * @param {number} time
   */
  setUserSeekStart(time) {}
  /**
   * Gets the presentation's current segment availability end time.  Segments
   * starting after this time should be assumed to be unavailable.
   * @return {number} The current segment availability end time, in seconds,
   *   relative to the start of the presentation.  Always returns the
   *   presentation's duration for video-on-demand.
   */
  getSegmentAvailabilityEnd() {}
  /**
   * Gets the seek range start time, offset by the given amount.  This is used
   * to ensure that we don't "fall" back out of the seek window while we are
   * buffering.
   * @param {number} offset The offset to add to the start time for live
   *   streams.
   * @return {number} The current seek start time, in seconds, relative to the
   *   start of the presentation.
   */
  getSafeSeekRangeStart(offset) {}
  /**
   * Gets the seek range start time.
   * @return {number}
   */
  getSeekRangeStart() {}
  /**
   * Gets the seek range end.
   * @return {number}
   */
  getSeekRangeEnd() {}
  /**
   * True if the presentation start time is being used to calculate the live
   * edge.
   * Using the presentation start time means that the stream may be subject to
   * encoder drift.  At runtime, we will avoid using the presentation start time
   * whenever possible.
   * @return {boolean}
   */
  usingPresentationStartTime() {}
  /**
   * Sets the presentation's segment availability time offset. This should be
   * only set for Low Latency Dash.
   * The segments are available earlier for download than the availability start
   * time, so we can move closer to the live edge.
   * @param {number} offset
   */
  setAvailabilityTimeOffset(offset) {}
};
/**
 * SegmentIndex.
 * @implements {shaka.util.IReleasable}
 * @implements {Iterable.<!shaka.media.SegmentReference>}
 */
shaka.media.SegmentIndex = class {
  /**
   * @param {!Array.<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   */
  constructor(references) {}
  /**
   * SegmentIndex used to be an IDestroyable.  Now it is an IReleasable.
   * This method is provided for backward compatibility.
   * @deprecated
   * @return {!Promise}
   */
  destroy() {}
  /**
   * @override
   */
  release() {}
  /**
   * Marks the index as immutable.  Segments cannot be added or removed after
   * this point.  This doesn't affect the references themselves.  This also
   * makes the destroy/release methods do nothing.
   * This is mainly for testing.
   */
  markImmutable() {}
  /**
   * Finds the position of the segment for the given time, in seconds, relative
   * to the start of the presentation.  Returns the position of the segment
   * with the largest end time if more than one segment is known for the given
   * time.
   * @param {number} time
   * @return {?number} The position of the segment, or null if the position of
   *   the segment could not be determined.
   */
  find(time) {}
  /**
   * Gets the SegmentReference for the segment at the given position.
   * @param {number} position The position of the segment as returned by find().
   * @return {shaka.media.SegmentReference} The SegmentReference, or null if
   *   no such SegmentReference exists.
   */
  get(position) {}
  /**
   * Offset all segment references by a fixed amount.
   * @param {number} offset The amount to add to each segment's start and end
   *   times.
   */
  offset(offset) {}
  /**
   * Merges the given SegmentReferences.  Supports extending the original
   * references only.  Will replace old references with equivalent new ones, and
   * keep any unique old ones.
   * Used, for example, by the DASH and HLS parser, where manifests may not list
   * all available references, so we must keep available references in memory to
   * fill the availability window.
   * @param {!Array.<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   * @deprecated Not used directly by our own parsers, so will become private in
   *   v4.  Use mergeAndEvict() instead.
   */
  merge(references) {}
  /**
   * Merges the given SegmentReferences and evicts the ones that end before the
   * given time.  Supports extending the original references only.
   * Will not replace old references or interleave new ones.
   * Used, for example, by the DASH and HLS parser, where manifests may not list
   * all available references, so we must keep available references in memory to
   * fill the availability window.
   * @param {!Array.<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   * @param {number} windowStart The start of the availability window to filter
   *   out the references that are no longer available.
   */
  mergeAndEvict(references, windowStart) {}
  /**
   * Removes all SegmentReferences that end before the given time.
   * @param {number} time The time in seconds.
   */
  evict(time) {}
  /**
   * Drops references that start after windowEnd, or end before windowStart,
   * and contracts the last reference so that it ends at windowEnd.
   * Do not call on the last period of a live presentation (unknown duration).
   * It is okay to call on the other periods of a live presentation, where the
   * duration is known and another period has been added.
   * @param {number} windowStart
   * @param {?number} windowEnd
   * @param {boolean=} isNew Whether this is a new SegmentIndex and we shouldn't
   *   update the number of evicted elements.
   */
  fit(windowStart, windowEnd, isNew) {}
  /**
   * Updates the references every so often.  Stops when the references list
   * returned by the callback is null.
   * @param {number} interval The interval in seconds.
   * @param {function():Array.<shaka.media.SegmentReference>} updateCallback
   */
  updateEvery(interval, updateCallback) {}
  /**
   * Returns a new iterator that initially points to the segment that contains
   * the given time.  Like the normal iterator, next() must be called first to
   * get to the first element. Returns null if we do not find a segment at the
   * requested time.
   * @param {number} time
   * @return {?shaka.media.SegmentIterator}
   */
  getIteratorForTime(time) {}
  /**
   * Create a SegmentIndex for a single segment of the given start time and
   * duration at the given URIs.
   * @param {number} startTime
   * @param {number} duration
   * @param {!Array.<string>} uris
   * @return {!shaka.media.SegmentIndex}
   */
  static forSingleSegment(startTime, duration, uris) {}
};
/**
 * An iterator over a SegmentIndex's references.
 * @implements {Iterator.<shaka.media.SegmentReference>}
 */
shaka.media.SegmentIterator = class {
  /**
   * @param {shaka.media.SegmentIndex} segmentIndex
   * @param {number} index
   * @param {number} partialSegmentIndex
   */
  constructor(segmentIndex, index, partialSegmentIndex) {}
  /**
   * Move the iterator to a given timestamp in the underlying SegmentIndex.
   * @param {number} time
   * @return {shaka.media.SegmentReference}
   * @deprecated Use SegmentIndex.getIteratorForTime instead
   */
  seek(time) {}
  /**
   * @return {shaka.media.SegmentReference}
   */
  current() {}
  /**
   * @override
   */
  next() {}
};
/**
 * A meta-SegmentIndex composed of multiple other SegmentIndexes.
 * Used in constructing multi-Period Streams for DASH.
 * @extends shaka.media.SegmentIndex
 * @implements {shaka.util.IReleasable}
 * @implements {Iterable.<!shaka.media.SegmentReference>}
 */
shaka.media.MetaSegmentIndex = class extends shaka.media.SegmentIndex {
  /** */
  constructor() {}
  /**
   * @override
   */
  release() {}
  /**
   * @override
   */
  find(time) {}
  /**
   * @override
   */
  get(position) {}
  /**
   * @override
   */
  offset(offset) {}
  /**
   * @override
   */
  merge(references) {}
  /**
   * @override
   */
  evict(time) {}
  /**
   * @override
   */
  mergeAndEvict(references, windowStart) {}
  /**
   * @override
   */
  fit(windowStart, windowEnd) {}
  /**
   * @override
   */
  updateEvery(interval, updateCallback) {}
};
/**
 * A text displayer plugin using the browser's native VTTCue interface.
 * @implements {shaka.extern.TextDisplayer}
 */
shaka.text.SimpleTextDisplayer = class {
  /** @param {HTMLMediaElement} video */
  constructor(video) {}
  /**
   * @override
   */
  remove(start, end) {}
  /**
   * @override
   */
  append(cues) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * @override
   */
  isTextVisible() {}
  /**
   * @override
   */
  setTextVisibility(on) {}
};
/**  */
shaka.util.Dom = class {
  /**
   * Remove all of the child nodes of an element.
   * @param {!Element} element
   */
  static removeAllChildren(element) {}
};
/**
 * The text displayer plugin for the Shaka Player UI.  Can also be used directly
 * by providing an appropriate container element.
 * @implements {shaka.extern.TextDisplayer}
 * @final
 */
shaka.text.UITextDisplayer = class {
  /**
   * Constructor.
   * @param {HTMLMediaElement} video
   * @param {HTMLElement} videoContainer
   */
  constructor(video, videoContainer) {}
  /**
   * @override
   */
  append(cues) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * @override
   */
  remove(start, end) {}
  /**
   * @override
   */
  isTextVisible() {}
  /**
   * @override
   */
  setTextVisibility(on) {}
};
/**
 * @summary Manage the conversion to WebVTT.
 */
shaka.text.WebVttGenerator = class {
};
/**
 * @typedef {{
 *   type: string,
 *   init: boolean,
 *   duration: number,
 *   mimeType: string,
 *   codecs: string,
 *   bandwidth: (number|undefined)
 * }}
 * @property {string} type
 *   The media type
 * @property {boolean} init
 *   Flag indicating whether the segment is an init segment
 * @property {number} duration
 *   The duration of the segment in seconds
 * @property {string} mimeType
 *   The segment's mime type
 * @property {string} codecs
 *   The segment's codecs
 * @property {(number|undefined)} bandwidth
 *   The segment's variation bandwidth
 */
shaka.util.CmcdManager.SegmentInfo;
/**
 * @typedef {{
 *   format: shaka.util.CmcdManager.StreamingFormat
 * }}
 * @property {shaka.util.CmcdManager.StreamingFormat} format
 *   The manifest's stream format
 */
shaka.util.CmcdManager.ManifestInfo;
/**
 * @enum {string}
 */
shaka.util.CmcdManager.StreamingFormat = {
  DASH: 'd',
  HLS: 'h',
  SMOOTH: 's',
  OTHER: 'o'
};
/**  */
shaka.util.ConfigUtils = class {
  /**
   * @param {!Object} destination
   * @param {!Object} source
   * @param {!Object} template supplies default values
   * @param {!Object} overrides
   *   Supplies override type checking.  When the current path matches
   *   the key in this object, each sub-value must match the type in this
   *   object. If this contains an Object, it is used as the template.
   * @param {string} path to this part of the config
   * @return {boolean}
   */
  static mergeConfigObjects(destination, source, template, overrides, path) {}
  /**
   * Convert config from ('fieldName', value) format to a partial config object.
   * E. g. from ('manifest.retryParameters.maxAttempts', 1) to
   * { manifest: { retryParameters: { maxAttempts: 1 }}}.
   * @param {string} fieldName
   * @param {*} value
   * @return {!Object}
   */
  static convertToConfigObject(fieldName, value) {}
};
/**
 * @final
 */
shaka.util.PlayerConfiguration = class {
  /**
   * Merges the given configuration changes into the given destination.  This
   * uses the default Player configurations as the template.
   * @param {shaka.extern.PlayerConfiguration} destination
   * @param {!Object} updates
   * @param {shaka.extern.PlayerConfiguration=} template
   * @return {boolean}
   */
  static mergeConfigObjects(destination, updates, template) {}
};
/**
 * @summary The main player object for Shaka Player.
 * @implements {shaka.util.IDestroyable}
 */
shaka.Player = class extends shaka.util.FakeEventTarget {
  /**
   * @param {HTMLMediaElement=} mediaElement
   *    When provided, the player will attach to <code>mediaElement</code>,
   *    similar to calling <code>attach</code>. When not provided, the player
   *    will remain detached.
   * @param {function(shaka.Player)=} dependencyInjector Optional callback
   *   which is called to inject mocks into the Player.  Used for testing.
   */
  constructor(mediaElement, dependencyInjector) {}
  /**
   * After destruction, a Player object cannot be used again.
   * @override
   */
  destroy() {}
  /**
   * Registers a plugin callback that will be called with
   * <code>support()</code>.  The callback will return the value that will be
   * stored in the return value from <code>support()</code>.
   * @param {string} name
   * @param {function():*} callback
   */
  static registerSupportPlugin(name, callback) {}
  /**
   * Set a factory to create an ad manager during player construction time.
   * This method needs to be called bafore instantiating the Player class.
   * @param {!shaka.extern.IAdManager.Factory} factory
   */
  static setAdManagerFactory(factory) {}
  /**
   * Return whether the browser provides basic support.  If this returns false,
   * Shaka Player cannot be used at all.  In this case, do not construct a
   * Player instance and do not use the library.
   * @return {boolean}
   */
  static isBrowserSupported() {}
  /**
   * Probes the browser to determine what features are supported.  This makes a
   * number of requests to EME/MSE/etc which may result in user prompts.  This
   * should only be used for diagnostics.
   * <p>
   * NOTE: This may show a request to the user for permission.
   * @see https://bit.ly/2ywccmH
   * @param {boolean=} promptsOkay
   * @return {!Promise.<shaka.extern.SupportType>}
   */
  static probeSupport(promptsOkay) {}
  /**
   * Tell the player to use <code>mediaElement</code> for all <code>load</code>
   * requests until <code>detach</code> or <code>destroy</code> are called.
   * <p>
   * Calling <code>attach</code> with <code>initializedMediaSource=true</code>
   * will tell the player to take the initial load step and initialize media
   * source.
   * <p>
   * Calls to <code>attach</code> will interrupt any in-progress calls to
   * <code>load</code> but cannot interrupt calls to <code>attach</code>,
   * <code>detach</code>, or <code>unload</code>.
   * @param {!HTMLMediaElement} mediaElement
   * @param {boolean=} initializeMediaSource
   * @return {!Promise}
   */
  attach(mediaElement, initializeMediaSource) {}
  /**
   * Tell the player to stop using its current media element. If the player is:
   * <ul>
   *  <li>detached, this will do nothing,
   *  <li>attached, this will release the media element,
   *  <li>loading, this will abort loading, unload, and release the media
   *      element,
   *  <li>playing content, this will stop playback, unload, and release the
   *      media element.
   * </ul>
   * <p>
   * Calls to <code>detach</code> will interrupt any in-progress calls to
   * <code>load</code> but cannot interrupt calls to <code>attach</code>,
   * <code>detach</code>, or <code>unload</code>.
   * @return {!Promise}
   */
  detach() {}
  /**
   * Tell the player to either return to:
   * <ul>
   *   <li>detached (when it does not have a media element),
   *   <li>attached (when it has a media element and
   *     <code>initializedMediaSource=false</code>)
   *   <li>media source initialized (when it has a media element and
   *     <code>initializedMediaSource=true</code>)
   * </ul>
   * <p>
   * Calls to <code>unload</code> will interrupt any in-progress calls to
   * <code>load</code> but cannot interrupt calls to <code>attach</code>,
   * <code>detach</code>, or <code>unload</code>.
   * @param {boolean=} initializeMediaSource
   * @return {!Promise}
   */
  unload(initializeMediaSource) {}
  /**
   * Provides a way to update the stream start position during the media loading
   * process. Can for example be called from the <code>manifestparsed</code>
   * event handler to update the start position based on information in the
   * manifest.
   * @param {number} startTime
   */
  updateStartTime(startTime) {}
  /**
   * Tell the player to load the content at <code>assetUri</code> and start
   * playback at <code>startTime</code>. Before calling <code>load</code>,
   * a call to <code>attach</code> must have succeeded.
   * <p>
   * Calls to <code>load</code> will interrupt any in-progress calls to
   * <code>load</code> but cannot interrupt calls to <code>attach</code>,
   * <code>detach</code>, or <code>unload</code>.
   * @param {string} assetUri
   * @param {?number=} startTime
   *    When <code>startTime</code> is <code>null</code> or
   *    <code>undefined</code>, playback will start at the default start time (0
   *    for VOD and liveEdge for LIVE).
   * @param {string=} mimeType
   * @return {!Promise}
   */
  load(assetUri, startTime, mimeType) {}
  /**
   * Changes configuration settings on the Player.  This checks the names of
   * keys and the types of values to avoid coding errors.  If there are errors,
   * this logs them to the console and returns false.  Correct fields are still
   * applied even if there are other errors.  You can pass an explicit
   * <code>undefined</code> value to restore the default value.  This has two
   * modes of operation:
   * <p>
   * First, this can be passed a single "plain" object.  This object should
   * follow the {@link shaka.extern.PlayerConfiguration} object.  Not all fields
   * need to be set; unset fields retain their old values.
   * <p>
   * Second, this can be passed two arguments.  The first is the name of the key
   * to set.  This should be a '.' separated path to the key.  For example,
   * <code>'streaming.alwaysStreamText'</code>.  The second argument is the
   * value to set.
   * @param {string|!Object} config This should either be a field name or an
   *   object.
   * @param {*=} value In the second mode, this is the value to set.
   * @return {boolean} True if the passed config object was valid, false if
   *   there were invalid entries.
   */
  configure(config, value) {}
  /**
   * Return a copy of the current configuration.  Modifications of the returned
   * value will not affect the Player's active configuration.  You must call
   * <code>player.configure()</code> to make changes.
   * @return {shaka.extern.PlayerConfiguration}
   */
  getConfiguration() {}
  /**
   * Returns the ratio of video length buffered compared to buffering Goal
   * @return {number}
   */
  getBufferFullness() {}
  /**
   * Reset configuration to default.
   */
  resetConfiguration() {}
  /**
   * Get the current load mode.
   * @return {shaka.Player.LoadMode}
   */
  getLoadMode() {}
  /**
   * Get the media element that the player is currently using to play loaded
   * content. If the player has not loaded content, this will return
   * <code>null</code>.
   * @return {HTMLMediaElement}
   */
  getMediaElement() {}
  /**
   * @return {shaka.net.NetworkingEngine} A reference to the Player's networking
   *     engine.  Applications may use this to make requests through Shaka's
   *     networking plugins.
   */
  getNetworkingEngine() {}
  /**
   * Get the uri to the asset that the player has loaded. If the player has not
   * loaded content, this will return <code>null</code>.
   * @return {?string}
   */
  getAssetUri() {}
  /**
   * Returns a shaka.ads.AdManager instance, responsible for Dynamic
   * Ad Insertion functionality.
   * @return {shaka.extern.IAdManager}
   */
  getAdManager() {}
  /**
   * Get if the player is playing live content. If the player has not loaded
   * content, this will return <code>false</code>.
   * @return {boolean}
   */
  isLive() {}
  /**
   * Get if the player is playing in-progress content. If the player has not
   * loaded content, this will return <code>false</code>.
   * @return {boolean}
   */
  isInProgress() {}
  /**
   * Check if the manifest contains only audio-only content. If the player has
   * not loaded content, this will return <code>false</code>.
   * <p>
   * The player does not support content that contain more than one type of
   * variants (i.e. mixing audio-only, video-only, audio-video). Content will be
   * filtered to only contain one type of variant.
   * @return {boolean}
   */
  isAudioOnly() {}
  /**
   * Get the range of time (in seconds) that seeking is allowed. If the player
   * has not loaded content, this will return a range from 0 to 0.
   * @return {{start: number, end: number}}
   */
  seekRange() {}
  /**
   * Go to live in a live stream.
   */
  goToLive() {}
  /**
   * Get the key system currently used by EME. If EME is not being used, this
   * will return an empty string. If the player has not loaded content, this
   * will return an empty string.
   * @return {string}
   */
  keySystem() {}
  /**
   * Get the drm info used to initialize EME. If EME is not being used, this
   * will return <code>null</code>. If the player is idle or has not initialized
   * EME yet, this will return <code>null</code>.
   * @return {?shaka.extern.DrmInfo}
   */
  drmInfo() {}
  /**
   * Get the next known expiration time for any EME session. If the session
   * never expires, this will return <code>Infinity</code>. If there are no EME
   * sessions, this will return <code>Infinity</code>. If the player has not
   * loaded content, this will return <code>Infinity</code>.
   * @return {number}
   */
  getExpiration() {}
  /**
   * Gets a map of EME key ID to the current key status.
   * @return {!Object<string, string>}
   */
  getKeyStatuses() {}
  /**
   * Check if the player is currently in a buffering state (has too little
   * content to play smoothly). If the player has not loaded content, this will
   * return <code>false</code>.
   * @return {boolean}
   */
  isBuffering() {}
  /**
   * Get the playback rate of what is playing right now. If we are using trick
   * play, this will return the trick play rate.
   * If no content is playing, this will return 0.
   * If content is buffering, this will return the expected playback rate once
   * the video starts playing.
   * <p>
   * If the player has not loaded content, this will return a playback rate of
   * 0.
   * @return {number}
   */
  getPlaybackRate() {}
  /**
   * Enable trick play to skip through content without playing by repeatedly
   * seeking. For example, a rate of 2.5 would result in 2.5 seconds of content
   * being skipped every second. A negative rate will result in moving
   * backwards.
   * <p>
   * If the player has not loaded content or is still loading content this will
   * be a no-op. Wait until <code>load</code> has completed before calling.
   * <p>
   * Trick play will be canceled automatically if the playhead hits the
   * beginning or end of the seekable range for the content.
   * @param {number} rate
   */
  trickPlay(rate) {}
  /**
   * Cancel trick-play. If the player has not loaded content or is still loading
   * content this will be a no-op.
   */
  cancelTrickPlay() {}
  /**
   * Return a list of variant tracks that can be switched to.
   * <p>
   * If the player has not loaded content, this will return an empty list.
   * @return {!Array.<shaka.extern.Track>}
   */
  getVariantTracks() {}
  /**
   * Return a list of text tracks that can be switched to.
   * <p>
   * If the player has not loaded content, this will return an empty list.
   * @return {!Array.<shaka.extern.Track>}
   */
  getTextTracks() {}
  /**
   * Return a list of image tracks that can be switched to.
   * If the player has not loaded content, this will return an empty list.
   * @return {!Array.<shaka.extern.Track>}
   */
  getImageTracks() {}
  /**
   * Return a Thumbnail object from a image track Id and time.
   * If the player has not loaded content, this will return a null.
   * @param {number} trackId
   * @param {number} time
   * @return {!Promise.<?shaka.extern.Thumbnail>}
   */
  getThumbnails(trackId, time) {}
  /**
   * Select a specific text track. <code>track</code> should come from a call to
   * <code>getTextTracks</code>. If the track is not found, this will be a
   * no-op. If the player has not loaded content, this will be a no-op.
   * <p>
   * Note that <code>AdaptationEvents</code> are not fired for manual track
   * selections.
   * @param {shaka.extern.Track} track
   */
  selectTextTrack(track) {}
  /**
   * Select a specific variant track to play.  <code>track</code> should come
   * from a call to <code>getVariantTracks</code>. If <code>track</code> cannot
   * be found, this will be a no-op. If the player has not loaded content, this
   * will be a no-op.
   * <p>
   * Changing variants will take effect once the currently buffered content has
   * been played. To force the change to happen sooner, use
   * <code>clearBuffer</code> with <code>safeMargin</code>. Setting
   * <code>clearBuffer</code> to <code>true</code> will clear all buffered
   * content after <code>safeMargin</code>, allowing the new variant to start
   * playing sooner.
   * <p>
   * Note that <code>AdaptationEvents</code> are not fired for manual track
   * selections.
   * @param {shaka.extern.Track} track
   * @param {boolean=} clearBuffer
   * @param {number=} safeMargin Optional amount of buffer (in seconds) to
   *   retain when clearing the buffer. Useful for switching variant quickly
   *   without causing a buffering event. Defaults to 0 if not provided. Ignored
   *   if clearBuffer is false. Can cause hiccups on some browsers if chosen too
   *   small, e.g. The amount of two segments is a fair minimum to consider as
   *   safeMargin value.
   */
  selectVariantTrack(track, clearBuffer, safeMargin) {}
  /**
   * Return a list of audio language-role combinations available.  If the
   * player has not loaded any content, this will return an empty list.
   * @return {!Array.<shaka.extern.LanguageRole>}
   */
  getAudioLanguagesAndRoles() {}
  /**
   * Return a list of text language-role combinations available.  If the player
   * has not loaded any content, this will be return an empty list.
   * @return {!Array.<shaka.extern.LanguageRole>}
   */
  getTextLanguagesAndRoles() {}
  /**
   * Return a list of audio languages available. If the player has not loaded
   * any content, this will return an empty list.
   * @return {!Array.<string>}
   */
  getAudioLanguages() {}
  /**
   * Return a list of text languages available. If the player has not loaded
   * any content, this will return an empty list.
   * @return {!Array.<string>}
   */
  getTextLanguages() {}
  /**
   * Sets the current audio language and current variant role to the selected
   * language and role, and chooses a new variant if need be. If the player has
   * not loaded any content, this will be a no-op.
   * @param {string} language
   * @param {string=} role
   */
  selectAudioLanguage(language, role) {}
  /**
   * Sets the current text language and current text role to the selected
   * language and role, and chooses a new variant if need be. If the player has
   * not loaded any content, this will be a no-op.
   * @param {string} language
   * @param {string=} role
   * @param {boolean=} forced
   */
  selectTextLanguage(language, role, forced) {}
  /**
   * Select variant tracks that have a given label. This assumes the
   * label uniquely identifies an audio stream, so all the variants
   * are expected to have the same variant.audio.
   * @param {string} label
   */
  selectVariantsByLabel(label) {}
  /**
   * Check if the text displayer is enabled.
   * @return {boolean}
   */
  isTextTrackVisible() {}
  /**
   * Return a list of chapters tracks.
   * @return {!Array.<shaka.extern.Track>}
   */
  getChaptersTracks() {}
  /**
   * This returns the list of chapters.
   * @param {string} language
   * @return {!Array.<shaka.extern.Chapter>}
   */
  getChapters(language) {}
  /**
   * Enable or disable the text displayer.  If the player is in an unloaded
   * state, the request will be applied next time content is loaded.
   * @param {boolean} isVisible
   */
  setTextTrackVisibility(isVisible) {}
  /**
   * Get the current playhead position as a date. This should only be called
   * when the player has loaded a live stream. If the player has not loaded a
   * live stream, this will return <code>null</code>.
   * @return {Date}
   */
  getPlayheadTimeAsDate() {}
  /**
   * Get the presentation start time as a date. This should only be called when
   * the player has loaded a live stream. If the player has not loaded a live
   * stream, this will return <code>null</code>.
   * @return {Date}
   */
  getPresentationStartTimeAsDate() {}
  /**
   * Get information about what the player has buffered. If the player has not
   * loaded content or is currently loading content, the buffered content will
   * be empty.
   * @return {shaka.extern.BufferedInfo}
   */
  getBufferedInfo() {}
  /**
   * Get statistics for the current playback session. If the player is not
   * playing content, this will return an empty stats object.
   * @return {shaka.extern.Stats}
   */
  getStats() {}
  /**
   * Adds the given text track to the loaded manifest.  <code>load()</code> must
   * resolve before calling.  The presentation must have a duration.
   * This returns the created track, which can immediately be selected by the
   * application.  The track will not be automatically selected.
   * @param {string} uri
   * @param {string} language
   * @param {string} kind
   * @param {string=} mimeType
   * @param {string=} codec
   * @param {string=} label
   * @param {boolean=} forced
   * @return {shaka.extern.Track}
   */
  addTextTrack(uri, language, kind, mimeType, codec, label, forced) {}
  /**
   * Adds the given text track to the loaded manifest.  <code>load()</code> must
   * resolve before calling.  The presentation must have a duration.
   * This returns the created track, which can immediately be selected by the
   * application.  The track will not be automatically selected.
   * @param {string} uri
   * @param {string} language
   * @param {string} kind
   * @param {string=} mimeType
   * @param {string=} codec
   * @param {string=} label
   * @param {boolean=} forced
   * @return {!Promise.<shaka.extern.Track>}
   */
  addTextTrackAsync(uri, language, kind, mimeType, codec, label, forced) {}
  /**
   * Adds the given chapters track to the loaded manifest.  <code>load()</code>
   * must resolve before calling.  The presentation must have a duration.
   * This returns the created track.
   * @param {string} uri
   * @param {string} language
   * @param {string=} mimeType
   * @return {!Promise.<shaka.extern.Track>}
   */
  addChaptersTrack(uri, language, mimeType) {}
  /**
   * Set the maximum resolution that the platform's hardware can handle.
   * This will be called automatically by <code>shaka.cast.CastReceiver</code>
   * to enforce limitations of the Chromecast hardware.
   * @param {number} width
   * @param {number} height
   */
  setMaxHardwareResolution(width, height) {}
  /**
   * Retry streaming after a streaming failure has occurred. When the player has
   * not loaded content or is loading content, this will be a no-op and will
   * return <code>false</code>.
   * <p>
   * If the player has loaded content, and streaming has not seen an error, this
   * will return <code>false</code>.
   * <p>
   * If the player has loaded content, and streaming seen an error, but the
   * could not resume streaming, this will return <code>false</code>.
   * @return {boolean}
   */
  retryStreaming() {}
  /**
   * Get the manifest that the player has loaded. If the player has not loaded
   * any content, this will return <code>null</code>.
   * NOTE: This structure is NOT covered by semantic versioning compatibility
   * guarantees.  It may change at any time!
   * This is marked as deprecated to warn Closure Compiler users at compile-time
   * to avoid using this method.
   * @return {?shaka.extern.Manifest}
   * @deprecated
   */
  getManifest() {}
  /**
   * Get the type of manifest parser that the player is using. If the player has
   * not loaded any content, this will return <code>null</code>.
   * @return {?shaka.extern.ManifestParser.Factory}
   */
  getManifestParserFactory() {}
  /**
   * Set the videoContainer to construct UITextDisplayer.
   * @param {HTMLElement} videoContainer
   */
  setVideoContainer(videoContainer) {}
};
/**
 * In order to know what method of loading the player used for some content, we
 * have this enum. It lets us know if content has not been loaded, loaded with
 * media source, or loaded with src equals.
 * This enum has a low resolution, because it is only meant to express the
 * outer limits of the various states that the player is in. For example, when
 * someone calls a public method on player, it should not matter if they have
 * initialized drm engine, it should only matter if they finished loading
 * content.
 * @enum {number}
 */
shaka.Player.LoadMode = {
  'DESTROYED': 0,
  'NOT_LOADED': 1,
  'MEDIA_SOURCE': 2,
  'SRC_EQUALS': 3
};
/**
 * @define {string} A version number taken from git at compile time.
 */
shaka.Player.version;
/**
 * @implements {shaka.extern.IAd}
 */
shaka.ads.ClientSideAd = class {
  /**
   * @param {!google.ima.Ad} imaAd
   * @param {!google.ima.AdsManager} imaAdManager
   */
  constructor(imaAd, imaAdManager) {}
  /**
   * @override
   */
  getDuration() {}
  /**
   * @override
   */
  getMinSuggestedDuration() {}
  /**
   * @override
   */
  getRemainingTime() {}
  /**
   * @override
   */
  isPaused() {}
  /**
   * @override
   */
  isSkippable() {}
  /**
   * @override
   */
  getTimeUntilSkippable() {}
  /**
   * @override
   */
  canSkipNow() {}
  /**
   * @override
   */
  skip() {}
  /**
   * @override
   */
  pause() {}
  /**
   * @override
   */
  play() {}
  /**
   * @override
   */
  getVolume() {}
  /**
   * @override
   */
  setVolume(volume) {}
  /**
   * @override
   */
  isMuted() {}
  /**
   * @override
   */
  isLinear() {}
  /**
   * @override
   */
  resize(width, height) {}
  /**
   * @override
   */
  setMuted(muted) {}
  /**
   * @override
   */
  getSequenceLength() {}
  /**
   * @override
   */
  getPositionInSequence() {}
  /**
   * @override
   */
  release() {}
};
/**
 * @implements {shaka.extern.IAd}
 */
shaka.ads.ServerSideAd = class {
  /**
   * @param {google.ima.dai.api.Ad} imaAd
   * @param {HTMLMediaElement} video
   */
  constructor(imaAd, video) {}
  /**
   * @override
   */
  getDuration() {}
  /**
   * @override
   */
  getMinSuggestedDuration() {}
  /**
   * @override
   */
  getRemainingTime() {}
  /**
   * @override
   */
  isPaused() {}
  /**
   * @override
   */
  isSkippable() {}
  /**
   * @override
   */
  getTimeUntilSkippable() {}
  /**
   * @override
   */
  canSkipNow() {}
  /**
   * @override
   */
  skip() {}
  /**
   * @override
   */
  pause() {}
  /**
   * @override
   */
  play() {}
  /**
   * @override
   */
  getVolume() {}
  /**
   * @override
   */
  setVolume(volume) {}
  /**
   * @override
   */
  isMuted() {}
  /**
   * @override
   */
  isLinear() {}
  /**
   * @override
   */
  resize(width, height) {}
  /**
   * @override
   */
  setMuted(muted) {}
  /**
   * @override
   */
  getSequenceLength() {}
  /**
   * @override
   */
  getPositionInSequence() {}
  /**
   * @override
   */
  release() {}
};
/**
 * A class responsible for ad-related interactions.
 * @implements {shaka.extern.IAdManager}
 * @implements {shaka.util.IReleasable}
 */
shaka.ads.AdManager = class extends shaka.util.FakeEventTarget {
  /** */
  constructor() {}
  /**
   * @override
   */
  setLocale(locale) {}
  /**
   * @override
   */
  initClientSide(adContainer, video) {}
  /**
   * @override
   */
  release() {}
  /**
  * @override
  */
  onAssetUnload() {}
  /**
   * @override
   */
  requestClientSideAds(imaRequest) {}
  /**
   * @override
   */
  initServerSide(adContainer, video) {}
  /**
   * @param {!google.ima.dai.api.StreamRequest} imaRequest
   * @param {string=} backupUrl
   * @return {!Promise.<string>}
   * @override
   */
  requestServerSideStream(imaRequest, backupUrl) {}
  /**
   * @override
   */
  replaceServerSideAdTagParameters(adTagParameters) {}
  /**
   * @return {!Array.<!shaka.extern.AdCuePoint>}
   * @override
   */
  getServerSideCuePoints() {}
  /**
   * @return {shaka.extern.AdsStats}
   * @override
   */
  getStats() {}
  /**
   * @override
   */
  onDashTimedMetadata(region) {}
  /**
   * @override
   */
  onHlsTimedMetadata(metadata, timestamp) {}
  /**
   * @override
   */
  onCueMetadataChange(value) {}
};
/**
 * The event name for when a sequence of ads has been loaded.
 * @const {string}
 */
shaka.ads.AdManager.ADS_LOADED;
/**
 * The event name for when an ad has started playing.
 * @const {string}
 */
shaka.ads.AdManager.AD_STARTED;
/**
 * The event name for when an ad playhead crosses first quartile.
 * @const {string}
 */
shaka.ads.AdManager.AD_FIRST_QUARTILE;
/**
 * The event name for when an ad playhead crosses midpoint.
 * @const {string}
 */
shaka.ads.AdManager.AD_MIDPOINT;
/**
 * The event name for when an ad playhead crosses third quartile.
 * @const {string}
 */
shaka.ads.AdManager.AD_THIRD_QUARTILE;
/**
 * The event name for when an ad has completed playing.
 * @const {string}
 */
shaka.ads.AdManager.AD_COMPLETE;
/**
 * The event name for when an ad has finished playing
 * (played all the way through, was skipped, or was unable to proceed
 * due to an error).
 * @const {string}
 */
shaka.ads.AdManager.AD_STOPPED;
/**
 * The event name for when an ad is skipped by the user..
 * @const {string}
 */
shaka.ads.AdManager.AD_SKIPPED;
/**
 * The event name for when the ad volume has changed.
 * @const {string}
 */
shaka.ads.AdManager.AD_VOLUME_CHANGED;
/**
 * The event name for when the ad was muted.
 * @const {string}
 */
shaka.ads.AdManager.AD_MUTED;
/**
 * The event name for when the ad was paused.
 * @const {string}
 */
shaka.ads.AdManager.AD_PAUSED;
/**
 * The event name for when the ad was resumed after a pause.
 * @const {string}
 */
shaka.ads.AdManager.AD_RESUMED;
/**
 * The event name for when the ad's skip status changes
 * (usually it becomes skippable when it wasn't before).
 * @const {string}
 */
shaka.ads.AdManager.AD_SKIP_STATE_CHANGED;
/**
 * The event name for when the ad's cue points (start/end markers)
 * have changed.
 * @const {string}
 */
shaka.ads.AdManager.CUEPOINTS_CHANGED;
/**
 * The event name for when the native IMA ad manager object has
 * loaded and become available.
 * @const {string}
 */
shaka.ads.AdManager.IMA_AD_MANAGER_LOADED;
/**
 * The event name for when the native IMA stream manager object has
 * loaded and become available.
 * @const {string}
 */
shaka.ads.AdManager.IMA_STREAM_MANAGER_LOADED;
/**
 * The event name for when the ad was clicked.
 * @const {string}
 */
shaka.ads.AdManager.AD_CLICKED;
/**
 * The event name for when there is an update to the current ad's progress.
 * @const {string}
 */
shaka.ads.AdManager.AD_PROGRESS;
/**
 * The event name for when the ad is buffering.
 * @const {string}
 */
shaka.ads.AdManager.AD_BUFFERING;
/**
 * The event name for when the ad's URL was hit.
 * @const {string}
 */
shaka.ads.AdManager.AD_IMPRESSION;
/**
 * The event name for when the ad's duration changed.
 * @const {string}
 */
shaka.ads.AdManager.AD_DURATION_CHANGED;
/**
 * The event name for when the ad was closed by the user.
 * @const {string}
 */
shaka.ads.AdManager.AD_CLOSED;
/**
 * The event name for when the ad data becomes available.
 * @const {string}
 */
shaka.ads.AdManager.AD_LOADED;
/**
 * The event name for when all the ads were completed.
 * @const {string}
 */
shaka.ads.AdManager.ALL_ADS_COMPLETED;
/**
 * The event name for when the ad changes from or to linear.
 * @const {string}
 */
shaka.ads.AdManager.AD_LINEAR_CHANGED;
/**
 * The event name for when the ad's metadata becomes available.
 * @const {string}
 */
shaka.ads.AdManager.AD_METADATA;
/**
 * The event name for when the ad display encountered a recoverable
 * error.
 * @const {string}
 */
shaka.ads.AdManager.AD_RECOVERABLE_ERROR;
/**
 * The event name for when the client side SDK signalled its readiness
 * to play a VPAID ad or an ad rule.
 * @const {string}
 */
shaka.ads.AdManager.AD_BREAK_READY;
/**
 * The event name for when the interaction callback for the ad was
 * triggered.
 * @const {string}
 */
shaka.ads.AdManager.AD_INTERACTION;
/**
 * @summary A proxy to switch between local and remote playback for Chromecast
 * in a way that is transparent to the app's controls.
 * @implements {shaka.util.IDestroyable}
 */
shaka.cast.CastProxy = class extends shaka.util.FakeEventTarget {
  /**
   * @param {!HTMLMediaElement} video The local video element associated with
   *   the local Player instance.
   * @param {!shaka.Player} player A local Player instance.
   * @param {string} receiverAppId The ID of the cast receiver application.
   *   If blank, casting will not be available, but the proxy will still
   *   function otherwise.
   */
  constructor(video, player, receiverAppId) {}
  /**
   * Destroys the proxy and the underlying local Player.
   * @param {boolean=} forceDisconnect If true, force the receiver app to shut
   *   down by disconnecting.  Does nothing if not connected.
   * @override
   */
  destroy(forceDisconnect) {}
  /**
   * Get a proxy for the video element that delegates to local and remote video
   * elements as appropriate.
   * @suppress {invalidCasts} to cast proxy Objects to unrelated types
   * @return {!HTMLMediaElement}
   */
  getVideo() {}
  /**
   * Get a proxy for the Player that delegates to local and remote Player
   * objects as appropriate.
   * @suppress {invalidCasts} to cast proxy Objects to unrelated types
   * @return {!shaka.Player}
   */
  getPlayer() {}
  /**
   * @return {boolean} True if the cast API is available and there are
   *   receivers.
   */
  canCast() {}
  /**
   * @return {boolean} True if we are currently casting.
   */
  isCasting() {}
  /**
   * @return {string} The name of the Cast receiver device, if isCasting().
   */
  receiverName() {}
  /**
   * @return {!Promise} Resolved when connected to a receiver.  Rejected if the
   *   connection fails or is canceled by the user.
   */
  cast() {}
  /**
   * Set application-specific data.
   * @param {Object} appData Application-specific data to relay to the receiver.
   */
  setAppData(appData) {}
  /**
   * Show a dialog where user can choose to disconnect from the cast connection.
   */
  suggestDisconnect() {}
  /**
   * Force the receiver app to shut down by disconnecting.
   */
  forceDisconnect() {}
  /**
   * @param {string} newAppId
   */
  changeReceiverId(newAppId) {}
};
/**
 * A receiver to communicate between the Chromecast-hosted player and the
 * sender application.
 * @implements {shaka.util.IDestroyable}
 */
shaka.cast.CastReceiver = class extends shaka.util.FakeEventTarget {
  /**
   * @param {!HTMLMediaElement} video The local video element associated with
   *   the local Player instance.
   * @param {!shaka.Player} player A local Player instance.
   * @param {function(Object)=} appDataCallback A callback to handle
   *   application-specific data passed from the sender.  This can come either
   *   from a Shaka-based sender through CastProxy.setAppData, or from a
   *   sender using the customData field of the LOAD message of the standard
   *   Cast message namespace.  It can also be null if no such data is sent.
   * @param {function(string):string=} contentIdCallback A callback to
   *   retrieve manifest URI from the provided content id.
   */
  constructor(video, player, appDataCallback, contentIdCallback) {}
  /**
   * @return {boolean} True if the cast API is available and there are
   *   receivers.
   */
  isConnected() {}
  /**
   * @return {boolean} True if the receiver is not currently doing loading or
   *   playing anything.
   */
  isIdle() {}
  /**
   * Set all Cast content metadata, as defined by the Cast SDK.
   * Should be called from an appDataCallback.
   * For a simpler way to set basic metadata, see:
   *  - setContentTitle()
   *  - setContentImage()
   *  - setContentArtist()
   * @param {Object} metadata
   *   A Cast metadata object, one of:
   *    - https://developers.google.com/cast/docs/reference/messages#GenericMediaMetadata
   *    - https://developers.google.com/cast/docs/reference/messages#MovieMediaMetadata
   *    - https://developers.google.com/cast/docs/reference/messages#TvShowMediaMetadata
   *    - https://developers.google.com/cast/docs/reference/messages#MusicTrackMediaMetadata
   */
  setContentMetadata(metadata) {}
  /**
   * Clear all Cast content metadata.
   * Should be called from an appDataCallback.
   */
  clearContentMetadata() {}
  /**
   * Set the Cast content's title.
   * Should be called from an appDataCallback.
   * @param {string} title
   */
  setContentTitle(title) {}
  /**
   * Set the Cast content's thumbnail image.
   * Should be called from an appDataCallback.
   * @param {string} imageUrl
   */
  setContentImage(imageUrl) {}
  /**
   * Set the Cast content's artist.
   * Also sets the metadata type to music.
   * Should be called from an appDataCallback.
   * @param {string} artist
   */
  setContentArtist(artist) {}
  /**
   * Destroys the underlying Player, then terminates the cast receiver app.
   * @override
   */
  destroy() {}
};
/**
 * Creates a new DASH parser.
 * @implements {shaka.extern.ManifestParser}
 */
shaka.dash.DashParser = class {
  /** Creates a new DASH parser. */
  constructor() {}
  /**
   * @override
   */
  configure(config) {}
  /**
   * @override
   */
  start(uri, playerInterface) {}
  /**
   * @override
   */
  stop() {}
  /**
   * @override
   */
  update() {}
  /**
   * @override
   */
  onExpirationUpdated(sessionId, expiration) {}
};
/**
 * @summary A networking plugin to handle data URIs.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs
 */
shaka.net.DataUriPlugin = class {
  /**
   * @param {string} uri
   * @param {shaka.extern.Request} request
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {shaka.extern.ProgressUpdated} progressUpdated Called when a
   *   progress event happened.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   */
  static parse(uri, request, requestType, progressUpdated) {}
};
/**
 * HLS parser.
 * @implements {shaka.extern.ManifestParser}
 */
shaka.hls.HlsParser = class {
  /**
   * Creates an Hls Parser object.
   */
  constructor() {}
  /**
   * @override
   */
  configure(config) {}
  /**
   * @override
   */
  start(uri, playerInterface) {}
  /**
   * @override
   */
  stop() {}
  /**
   * @override
   */
  update() {}
  /**
   * @override
   */
  onExpirationUpdated(sessionId, expiration) {}
};
/**
 * @summary A networking plugin to handle http and https URIs via the Fetch API.
 */
shaka.net.HttpFetchPlugin = class {
  /**
   * @param {string} uri
   * @param {shaka.extern.Request} request
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {shaka.extern.ProgressUpdated} progressUpdated Called when a
   *   progress event happened.
   * @param {shaka.extern.HeadersReceived} headersReceived Called when the
   *   headers for the download are received, but before the body is.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   */
  static parse(uri, request, requestType, progressUpdated, headersReceived) {}
  /**
   * Determine if the Fetch API is supported in the browser. Note: this is
   * deliberately exposed as a method to allow the client app to use the same
   * logic as Shaka when determining support.
   * @return {boolean}
   */
  static isSupported() {}
};
/**
 * @summary A networking plugin to handle http and https URIs via XHR.
 */
shaka.net.HttpXHRPlugin = class {
  /**
   * @param {string} uri
   * @param {shaka.extern.Request} request
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {shaka.extern.ProgressUpdated} progressUpdated Called when a
   *   progress event happened.
   * @param {shaka.extern.HeadersReceived} headersReceived Called when the
   *   headers for the download are received, but before the body is.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   */
  static parse(uri, request, requestType, progressUpdated, headersReceived) {}
};
/**
 * StorageMuxer is responsible for managing StorageMechanisms and addressing
 * cells. The primary purpose of the muxer is to give the caller the correct
 * cell for the operations they want to perform.
 * |findActive| will be used when the caller wants a cell that supports
 * add-operations. This will be used when saving new content to storage.
 * |findAll| will be used when the caller want to look at all the content
 * in storage.
 * |resolvePath| will be used to convert a path (from |findActive| and
 * |findAll|) into a cell, which it then returns.
 * @implements {shaka.util.IDestroyable}
 */
shaka.offline.StorageMuxer = class {
  /** */
  constructor() {}
  /**
   * Free all resources used by the muxer, mechanisms, and cells. This should
   * not affect the stored content.
   * @override
   */
  destroy() {}
  /**
   * Register a storage mechanism for use with the default storage muxer. This
   * will have no effect on any storage muxer already in main memory.
   * @param {string} name
   * @param {function():shaka.extern.StorageMechanism} factory
   */
  static register(name, factory) {}
  /**
   * Unregister a storage mechanism for use with the default storage muxer. This
   * will have no effect on any storage muxer already in main memory.
   * @param {string} name The name that the storage mechanism was registered
   *                      under.
   */
  static unregister(name) {}
};
/**
 * @summary A plugin that handles requests for offline content.
 */
shaka.offline.OfflineScheme = class {
  /**
   * @param {string} uri
   * @param {shaka.extern.Request} request
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {shaka.extern.ProgressUpdated} progressUpdated Called when a
   *   progress event happened.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   */
  static plugin(uri, request, requestType, progressUpdated) {}
};
/**
 * @summary
 * This manages persistent offline data including storage, listing, and deleting
 * stored manifests.  Playback of offline manifests are done through the Player
 * using a special URI (see shaka.offline.OfflineUri).
 * First, check support() to see if offline is supported by the platform.
 * Second, configure() the storage object with callbacks to your application.
 * Third, call store(), remove(), or list() as needed.
 * When done, call destroy().
 * @implements {shaka.util.IDestroyable}
 */
shaka.offline.Storage = class {
  /**
   * @param {!shaka.Player=} player
   *    A player instance to share a networking engine and configuration with.
   *    When initializing with a player, storage is only valid as long as
   *    |destroy| has not been called on the player instance. When omitted,
   *    storage will manage its own networking engine and configuration.
   */
  constructor(player) {}
  /**
   * Gets whether offline storage is supported.  Returns true if offline storage
   * is supported for clear content.  Support for offline storage of encrypted
   * content will not be determined until storage is attempted.
   * @return {boolean}
   */
  static support() {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Sets configuration values for Storage.  This is associated with
   * Player.configure and will change the player instance given at
   * initialization.
   * @param {string|!Object} config This should either be a field name or an
   *   object following the form of {@link shaka.extern.PlayerConfiguration},
   *   where you may omit any field you do not wish to change.
   * @param {*=} value This should be provided if the previous parameter
   *   was a string field name.
   * @return {boolean}
   */
  configure(config, value) {}
  /**
   * Return a copy of the current configuration.  Modifications of the returned
   * value will not affect the Storage instance's active configuration.  You
   * must call storage.configure() to make changes.
   * @return {shaka.extern.PlayerConfiguration}
   */
  getConfiguration() {}
  /**
   * Return the networking engine that storage is using. If storage was
   * initialized with a player instance, then the networking engine returned
   * will be the same as |player.getNetworkingEngine()|.
   * The returned value will only be null if |destroy| was called before
   * |getNetworkingEngine|.
   * @return {shaka.net.NetworkingEngine}
   */
  getNetworkingEngine() {}
  /**
   * Stores the given manifest.  If the content is encrypted, and encrypted
   * content cannot be stored on this platform, the Promise will be rejected
   * with error code 6001, REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE.
   * Multiple assets can be downloaded at the same time, but note that since
   * the storage instance has a single networking engine, multiple storage
   * objects will be necessary if some assets require unique network filters.
   * This snapshots the storage config at the time of the call, so it will not
   * honor any changes to config mid-store operation.
   * @param {string} uri The URI of the manifest to store.
   * @param {!Object=} appMetadata An arbitrary object from the application
   *   that will be stored along-side the offline content.  Use this for any
   *   application-specific metadata you need associated with the stored
   *   content.  For details on the data types that can be stored here, please
   *   refer to {@link https://bit.ly/StructClone}
   * @param {string=} mimeType
   *   The mime type for the content |manifestUri| points to.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.StoredContent>}
   *   An AbortableOperation that resolves with a structure representing what
   *   was stored.  The "offlineUri" member is the URI that should be given to
   *   Player.load() to play this piece of content offline.  The "appMetadata"
   *   member is the appMetadata argument you passed to store().
   *   If you want to cancel this download, call the "abort" method on
   *   AbortableOperation.
   */
  store(uri, appMetadata, mimeType) {}
  /**
   * Returns true if an asset is currently downloading.
   * @return {boolean}
   * @deprecated
   */
  getStoreInProgress() {}
  /**
   * Removes the given stored content.  This will also attempt to release the
   * licenses, if any.
   * @param {string} contentUri
   * @return {!Promise}
   */
  remove(contentUri) {}
  /**
   * Removes any EME sessions that were not successfully removed before.  This
   * returns whether all the sessions were successfully removed.
   * @return {!Promise.<boolean>}
   */
  removeEmeSessions() {}
  /**
   * Lists all the stored content available.
   * @return {!Promise.<!Array.<shaka.extern.StoredContent>>}  A Promise to an
   *   array of structures representing all stored content.  The "offlineUri"
   *   member of the structure is the URI that should be given to Player.load()
   *   to play this piece of content offline.  The "appMetadata" member is the
   *   appMetadata argument you passed to store().
   */
  list() {}
  /**
   * Delete the on-disk storage and all the content it contains. This should not
   * be done in normal circumstances. Only do it when storage is rendered
   * unusable, such as by a version mismatch. No business logic will be run, and
   * licenses will not be released.
   * @return {!Promise}
   */
  static deleteAll() {}
};
/**
 * @summary A one-stop installer for all polyfills.
 * @see http://enwp.org/polyfill
 */
shaka.polyfill = class {
  /**
   * Install all polyfills.
   */
  static installAll() {}
  /**
   * Registers a new polyfill to be installed.
   * @param {function()} polyfill
   * @param {number=} priority An optional number priority.  Higher priorities
   *   will be executed before lower priority ones.  Default is 0.
   */
  static register(polyfill, priority) {}
};
/**
 * @summary A polyfill to add support for the ARIAMixin interface mixin, for
 * browsers that do not implement it (e.g. Firefox).
 * Note that IE also does not support ARIAMixin, but this polyfill does not work
 * for that platform, as it relies on getters and setters.
 * @see https://w3c.github.io/aria/#ARIAMixin
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */
shaka.polyfill.Aria = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to add support for EncryptionScheme queries in EME.
 * @see https://wicg.github.io/encrypted-media-encryption-scheme/
 * @see https://github.com/w3c/encrypted-media/pull/457
 * @see https://github.com/google/eme-encryption-scheme-polyfill
 */
shaka.polyfill.EncryptionScheme = class {
  /**
   * Install the polyfill if needed.
   * @suppress {missingRequire}
   */
  static install() {}
};
/**
 * @summary A polyfill to unify fullscreen APIs across browsers.
 * Many browsers have prefixed fullscreen methods on Element and document.
 * See {@link https://mzl.la/2K0xcHo Using fullscreen mode} on MDN for more
 * information.
 */
shaka.polyfill.Fullscreen = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to patch math round bug on some browsers.
 * @see https://stackoverflow.com/q/12830742
 */
shaka.polyfill.MathRound = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide navigator.mediaCapabilities on all browsers.
 * This is necessary for Tizen 3, Xbox One and possibly others we have yet to
 * discover.
 */
shaka.polyfill.MediaCapabilities = class {
  /**
   * Install the polyfill if needed.
   * @suppress {const}
   */
  static install() {}
};
/**
 * @summary A polyfill to patch MSE bugs.
 */
shaka.polyfill.MediaSource = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill for systems that do not implement screen.orientation.
 * For now, this only handles systems that implement the deprecated
 * window.orientation feature... e.g. iPad.
 */
shaka.polyfill.Orientation = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to implement modern, standardized EME on top of Apple's
 * prefixed EME in Safari.
 */
shaka.polyfill.PatchedMediaKeysApple = class {
  /**
   * Installs the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to implement
 * {@link https://bit.ly/EmeMar15 EME draft 12 March 2015}
 * on top of ms-prefixed
 * {@link https://www.w3.org/TR/2014/WD-encrypted-media-20140218/ EME v20140218}
 */
shaka.polyfill.PatchedMediaKeysMs = class {
  /**
   * Installs the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to stub out
 * {@link https://bit.ly/EmeMar15 EME draft 12 March 2015} on browsers without
 * EME.
 * All methods will fail.
 */
shaka.polyfill.PatchedMediaKeysNop = class {
  /**
   * Installs the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to implement
 * {@link https://bit.ly/EmeMar15 EME draft 12 March 2015} on top of
 * webkit-prefixed {@link https://bit.ly/Eme01b EME v0.1b}.
 */
shaka.polyfill.PatchedMediaKeysWebkit = class {
  /**
   * Installs the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide PiP support in Safari.
 * Note that Safari only supports PiP on video elements, not audio.
 */
shaka.polyfill.PiPWebkit = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide window.crypto.randomUUID in all browsers.
 */
shaka.polyfill.RandomUUID = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide navigator.storage.estimate in old
 * webkit browsers.
 * See: https://developers.google.com/web/updates/2017/08/estimating-available-storage-space#the-present
 */
shaka.polyfill.StorageEstimate = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to silence the play() Promise in HTML5 video.
 */
shaka.polyfill.VideoPlayPromise = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide MSE VideoPlaybackQuality metrics.
 * Many browsers do not yet provide this API, and Chrome currently provides
 * similar data through individual prefixed attributes on HTMLVideoElement.
 */
shaka.polyfill.VideoPlaybackQuality = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide VTTCue.
 */
shaka.polyfill.VTTCue = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * LRC file format: https://en.wikipedia.org/wiki/LRC_(file_format)
 * @implements {shaka.extern.TextParser}
 */
shaka.text.LrcTextParser = class {
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.TtmlTextParser = class {
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.Mp4TtmlParser = class {
  /** */
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.VttTextParser = class {
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.Mp4VttParser = class {
  /** */
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.SbvTextParser = class {
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.SrtTextParser = class {
  /** */
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
  /**
   * Convert a SRT format to WebVTT
   * @param {string} data
   * @return {string}
   */
  static srt2webvtt(data) {}
};
/**
 * Documentation: http://moodub.free.fr/video/ass-specs.doc
 * https://en.wikipedia.org/wiki/SubStation_Alpha
 * @implements {shaka.extern.TextParser}
 */
shaka.text.SsaTextParser = class {
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
