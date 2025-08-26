/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Generated externs.  DO NOT EDIT!
 * @externs
 * @suppress {constantProperty, duplicate} To prevent compiler
 *   errors with the namespace being declared both here and by
 *   goog.provide in the library.
 */

/** @namespace */
window.shaka = {};
/** @const */
shaka.abr = {};
/** @const */
shaka.cea = {};
/** @const */
shaka.config = {};
/** @const */
shaka.drm = {};
/** @const */
shaka.hls = {};
/** @const */
shaka.lcevc = {};
/** @const */
shaka.media = {};
/** @const */
shaka.media.SegmentPrefetch = {};
/** @const */
shaka.net = {};
/** @const */
shaka.text = {};
/** @const */
shaka.transmuxer = {};
/** @const */
shaka.util = {};
/** @const */
shaka.util.CmcdManager = {};

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
 * @enum {number}
 */
shaka.config.AutoShowText = {
  'NEVER': 0,
  'ALWAYS': 1,
  'IF_PREFERRED_TEXT_LANGUAGE': 2,
  'IF_SUBTITLES_MAY_BE_NEEDED': 3
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
   * @suppress {strictMissingProperties}
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
   * Creates a new Uint16Array view on the same buffer.  This clamps the values
   * to be within the same view (i.e. you can't use this to move past the end
   * of the view, even if the underlying buffer is larger).  However, you can
   * pass a negative offset to access the data before the view.
   * @param {BufferSource} data
   * @param {number=} offset The offset from the beginning of this data's view
   *   to start the new view at.
   * @param {number=} length The byte length of the new view.
   * @return {!Uint16Array}
   */
  static toUint16(data, offset, length) {}
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
  'SEGMENT_MISSING': 1011,
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
  'UNSUPPORTED_EXTERNAL_THUMBNAILS_URI': 2017,
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
  'MSS_MISSING_DATA_FOR_TRANSMUXING': 3020,
  'MSS_TRANSMUXING_FAILED': 3022,
  'TRANSMUXING_NO_VIDEO_DATA': 3023,
  'STREAMING_NOT_ALLOWED': 3024,
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
  'HLS_REQUIRED_ATTRIBUTE_MISSING': 4023,
  'HLS_REQUIRED_TAG_MISSING': 4024,
  'HLS_COULD_NOT_GUESS_CODECS': 4025,
  'HLS_KEYFORMATS_NOT_SUPPORTED': 4026,
  'DASH_UNSUPPORTED_XLINK_ACTUATE': 4027,
  'DASH_XLINK_DEPTH_LIMIT': 4028,
  'CONTENT_UNSUPPORTED_BY_BROWSER': 4032,
  'CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM': 4033,
  'NO_VARIANTS': 4036,
  'PERIOD_FLATTENING_FAILED': 4037,
  'INCONSISTENT_DRM_ACROSS_PERIODS': 4038,
  'HLS_VARIABLE_NOT_FOUND': 4039,
  'HLS_MSE_ENCRYPTED_MP2T_NOT_SUPPORTED': 4040,
  'HLS_MSE_ENCRYPTED_LEGACY_APPLE_MEDIA_KEYS_NOT_SUPPORTED': 4041,
  'NO_WEB_CRYPTO_API': 4042,
  'CANNOT_ADD_EXTERNAL_THUMBNAILS_TO_LIVE_STREAM': 4045,
  'MSS_INVALID_XML': 4046,
  'MSS_LIVE_CONTENT_NOT_SUPPORTED': 4047,
  'AES_128_INVALID_IV_LENGTH': 4048,
  'AES_128_INVALID_KEY_LENGTH': 4049,
  'DASH_CONFLICTING_AES_128': 4050,
  'DASH_UNSUPPORTED_AES_128': 4051,
  'DASH_INVALID_PATCH': 4052,
  'HLS_EMPTY_MEDIA_PLAYLIST': 4053,
  'DASH_MSE_ENCRYPTED_LEGACY_APPLE_MEDIA_KEYS_NOT_SUPPORTED': 4054,
  'CANNOT_ADD_EXTERNAL_CHAPTERS_TO_LIVE_STREAM': 4054,
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
  'MIN_HDCP_VERSION_NOT_MATCH': 6018,
  'ERROR_CHECKING_HDCP_VERSION': 6019,
  'MISSING_EME_SUPPORT': 6020,
  'LOAD_INTERRUPTED': 7000,
  'OPERATION_ABORTED': 7001,
  'NO_VIDEO_ELEMENT': 7002,
  'OBJECT_DESTROYED': 7003,
  'CONTENT_NOT_LOADED': 7004,
  'SRC_EQUALS_PRELOAD_NOT_SUPPORTED': 7005,
  'PRELOAD_DESTROYED': 7006,
  'QUEUE_INDEX_OUT_OF_BOUNDS': 7007,
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
  'INDEXED_DB_INIT_TIMED_OUT': 9017,
  'CS_IMA_SDK_MISSING': 10000,
  'CS_AD_MANAGER_NOT_INITIALIZED': 10001,
  'SS_IMA_SDK_MISSING': 10002,
  'SS_AD_MANAGER_NOT_INITIALIZED': 10003,
  'CURRENT_DAI_REQUEST_NOT_FINISHED': 10004,
  'MT_AD_MANAGER_NOT_INITIALIZED': 10005,
  'INTERSTITIAL_AD_MANAGER_NOT_INITIALIZED': 10006,
  'VAST_INVALID_XML': 10007
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
 * @summary
 *  lcevcDec - (MPEG-5 Part 2 LCEVC - Decoder) provides
 *  all the operations related to the enhancement and rendering
 *  of LCEVC enabled streams and on to a canvas.
 * @implements {shaka.util.IReleasable}
 */
shaka.lcevc.Dec = class {
  /**
   * @param {HTMLVideoElement} media The video element that will be attached to
   * LCEVC Decoder for input.
   * @param {HTMLCanvasElement} canvas The canvas element that will be attached
   * to LCEVC Decoder to render the enhanced frames.
   * @param {shaka.extern.LcevcConfiguration} lcevcConfig LCEVC configuration
   * object to initialize the LCEVC Decoder.
   * @param {boolean} isDualTrack
   */
  constructor(media, canvas, lcevcConfig, isDualTrack) {}
  /**
   * Close LCEVC Decoder.
   * @override
   */
  release() {}
};
/**
 * The IClosedCaptionParser defines the interface to provide all operations for
 * parsing the closed captions embedded in Dash videos streams.
 * TODO: Remove this interface and move method definitions
 * directly to ClosedCaptionParser.
 * @interface
 */
shaka.media.IClosedCaptionParser = class {
};
/**
 * Closed Caption Parser provides all operations for parsing the closed captions
 * embedded in Dash videos streams.
 * @implements {shaka.media.IClosedCaptionParser}
 * @final
 */
shaka.media.ClosedCaptionParser = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @param {string} mimeType
   * @param {!shaka.extern.CeaParserPlugin} plugin
   */
  static registerParser(mimeType, plugin) {}
  /**
   * @param {string} mimeType
   */
  static unregisterParser(mimeType) {}
  /**
   * @param {string} mimeType
   * @return {?shaka.extern.CeaParserPlugin}
   */
  static findParser(mimeType) {}
  /**
   * @param {!shaka.extern.CaptionDecoderPlugin} plugin
   */
  static registerDecoder(plugin) {}
  /**
   */
  static unregisterDecoder() {}
  /**
   * @return {?shaka.extern.CaptionDecoderPlugin}
   */
  static findDecoder() {}
};
/**
 */
shaka.text.CueRegion = class {
  constructor() {}
};
/**
     * Region identifier.
     * @type {string}
     */
shaka.text.CueRegion.prototype.id;
/**
     * The X offset to start the rendering area in viewportAnchorUnits of the
     * video width.
     * @type {number}
     */
shaka.text.CueRegion.prototype.viewportAnchorX;
/**
     * The X offset to start the rendering area in viewportAnchorUnits of the
     * video height.
     * @type {number}
     */
shaka.text.CueRegion.prototype.viewportAnchorY;
/**
     * The X offset to start the rendering area in percentage (0-100) of this
     * region width.
     * @type {number}
     */
shaka.text.CueRegion.prototype.regionAnchorX;
/**
     * The Y offset to start the rendering area in percentage (0-100) of the
     * region height.
     * @type {number}
     */
shaka.text.CueRegion.prototype.regionAnchorY;
/**
     * The width of the rendering area in widthUnits.
     * @type {number}
     */
shaka.text.CueRegion.prototype.width;
/**
     * The width of the rendering area in heightUnits.
     * @type {number}
     */
shaka.text.CueRegion.prototype.height;
/**
     * The units (percentage, pixels or lines) the region height is in.
     * @type {shaka.text.CueRegion.units}
     */
shaka.text.CueRegion.prototype.heightUnits;
/**
     * The units (percentage or pixels) the region width is in.
     * @type {shaka.text.CueRegion.units}
     */
shaka.text.CueRegion.prototype.widthUnits;
/**
     * The units (percentage or pixels) the region viewportAnchors are in.
     * @type {shaka.text.CueRegion.units}
     */
shaka.text.CueRegion.prototype.viewportAnchorUnits;
/**
     * If scroll=UP, it means that cues in the region will be added to the
     * bottom of the region and will push any already displayed cues in the
     * region up.  Otherwise (scroll=NONE) cues will stay fixed at the location
     * they were first painted in.
     * @type {shaka.text.CueRegion.scrollMode}
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
/**  */
shaka.util.ObjectUtils = class {
  /**
   * Performs a deep clone of the given simple object.  This does not copy
   * prototypes, custom properties (e.g. read-only), or multiple references to
   * the same object.  If the caller needs these fields, it will need to set
   * them after this returns.
   * @template T
   * @param {T} arg
   * @return {T}
   */
  static cloneObject(arg) {}
  /**
   * Performs a shallow clone of the given simple object.  This does not copy
   * prototypes or custom properties (e.g. read-only).
   * @template T
   * @param {T} original
   * @return {T}
   */
  static shallowCloneObject(original) {}
  /**
   * Constructs a string out of a value, similar to the JSON.stringify method.
   * Unlike that method, this guarantees that the order of the keys in an
   * object is alphabetical, so it can be used as a way to reliably compare two
   * objects.
   * @param {?} value
   * @return {string}
   */
  static alphabeticalKeyOrderStringify(value) {}
};
/**
 */
shaka.text.Cue = class {
  /**
   * @param {number} startTime
   * @param {number} endTime
   * @param {string} payload
   */
  constructor(startTime, endTime, payload) {}
  /**
   * Create a copy of the cue with the same properties.
   * @return {!shaka.text.Cue}
   * @suppress {checkTypes} since we must use [] and "in" with a struct type.
   */
  clone() {}
  /**
   * Check if two Cues have all the same values in all properties.
   * @param {!shaka.text.Cue} cue1
   * @param {!shaka.text.Cue} cue2
   * @return {boolean}
   * @suppress {checkTypes} since we must use [] and "in" with a struct type.
   */
  static equal(cue1, cue2) {}
  /**
   * Parses cue payload, searches for styling entities and, if needed,
   * modifies original payload and creates nested cues to better represent
   * styling found in payload. All changes are done in-place.
   * @param {!shaka.text.Cue} cue
   * @param {!Map<string, !shaka.text.Cue>=} styles
   */
  static parseCuePayload(cue, styles) {}
};
/**
     * The start time of the cue in seconds, relative to the start of the
     * presentation.
     * @type {number}
     */
shaka.text.Cue.prototype.startTime;
/**
     * The end time of the cue in seconds, relative to the start of the
     * presentation.
     * @type {number}
     */
shaka.text.Cue.prototype.endTime;
/**
     * The text payload of the cue.  If nestedCues is non-empty, this should be
     * empty.  Top-level block containers should have no payload of their own.
     * @type {string}
     */
shaka.text.Cue.prototype.payload;
/**
     * The region to render the cue into.  Only supported on top-level cues,
     * because nested cues are inline elements.
     * @type {shaka.text.CueRegion}
     */
shaka.text.Cue.prototype.region;
/**
     * The indent (in percent) of the cue box in the direction defined by the
     * writing direction.
     * @type {?number}
     */
shaka.text.Cue.prototype.position;
/**
     * Position alignment of the cue.
     * @type {shaka.text.Cue.positionAlign}
     */
shaka.text.Cue.prototype.positionAlign;
/**
     * Size of the cue box (in percents), where 0 means "auto".
     * @type {number}
     */
shaka.text.Cue.prototype.size;
/**
     * Alignment of the text inside the cue box.
     * @type {shaka.text.Cue.textAlign}
     */
shaka.text.Cue.prototype.textAlign;
/**
     * Text direction of the cue.
     * @type {shaka.text.Cue.direction}
     */
shaka.text.Cue.prototype.direction;
/**
     * Text writing mode of the cue.
     * @type {shaka.text.Cue.writingMode}
     */
shaka.text.Cue.prototype.writingMode;
/**
     * The way to interpret line field. (Either as an integer line number or
     * percentage from the display box).
     * @type {shaka.text.Cue.lineInterpretation}
     */
shaka.text.Cue.prototype.lineInterpretation;
/**
     * The offset from the display box in either number of lines or
     * percentage depending on the value of lineInterpretation.
     * @type {?number}
     */
shaka.text.Cue.prototype.line;
/**
     * Separation between line areas inside the cue box in px or em
     * (e.g. '100px'/'100em'). If not specified, this should be no less than
     * the largest font size applied to the text in the cue.
     * @type {string}.
     */
shaka.text.Cue.prototype.lineHeight;
/**
     * Line alignment of the cue box.
     * Start alignment means the cue box’s top side (for horizontal cues), left
     * side (for vertical growing right), or right side (for vertical growing
     * left) is aligned at the line.
     * Center alignment means the cue box is centered at the line.
     * End alignment The cue box’s bottom side (for horizontal cues), right side
     * (for vertical growing right), or left side (for vertical growing left) is
     * aligned at the line.
     * @type {shaka.text.Cue.lineAlign}
     */
shaka.text.Cue.prototype.lineAlign;
/**
     * Vertical alignments of the cues within their extents.
     * 'BEFORE' means displaying the captions at the top of the text display
     * container box, 'CENTER' means in the middle, 'AFTER' means at the bottom.
     * @type {shaka.text.Cue.displayAlign}
     */
shaka.text.Cue.prototype.displayAlign;
/**
     * Text color as a CSS color, e.g. "#FFFFFF" or "white".
     * @type {string}
     */
shaka.text.Cue.prototype.color;
/**
     * Text background color as a CSS color, e.g. "#FFFFFF" or "white".
     * @type {string}
     */
shaka.text.Cue.prototype.backgroundColor;
/**
     * The URL of the background image, e.g. "data:[mime type];base64,[data]".
     * @type {string}
     */
shaka.text.Cue.prototype.backgroundImage;
/**
     * The border around this cue as a CSS border.
     * @type {string}
     */
shaka.text.Cue.prototype.border;
/**
     * Text font size in px or em (e.g. '100px'/'100em').
     * @type {string}
     */
shaka.text.Cue.prototype.fontSize;
/**
     * Text font weight. Either normal or bold.
     * @type {shaka.text.Cue.fontWeight}
     */
shaka.text.Cue.prototype.fontWeight;
/**
     * Text font style. Normal, italic or oblique.
     * @type {shaka.text.Cue.fontStyle}
     */
shaka.text.Cue.prototype.fontStyle;
/**
     * Text font family.
     * @type {string}
     */
shaka.text.Cue.prototype.fontFamily;
/**
     * Text letter spacing as a CSS letter-spacing value.
     * @type {string}
     */
shaka.text.Cue.prototype.letterSpacing;
/**
     * Text line padding as a CSS line-padding value.
     * @type {string}
     */
shaka.text.Cue.prototype.linePadding;
/**
     * Opacity of the cue element, from 0-1.
     * @type {number}
     */
shaka.text.Cue.prototype.opacity;
/**
     * Text combine upright as a CSS text-combine-upright value.
     * @type {string}
     */
shaka.text.Cue.prototype.textCombineUpright;
/**
     * Text decoration. A combination of underline, overline
     * and line through. Empty array means no decoration.
     * @type {!Array<!shaka.text.Cue.textDecoration>}
     */
shaka.text.Cue.prototype.textDecoration;
/**
     * Text shadow color as a CSS text-shadow value.
     * @type {string}
     */
shaka.text.Cue.prototype.textShadow;
/**
     * Text stroke color as a CSS color, e.g. "#FFFFFF" or "white".
     * @type {string}
     */
shaka.text.Cue.prototype.textStrokeColor;
/**
     * Text stroke width as a CSS stroke-width value.
     * @type {string}
     */
shaka.text.Cue.prototype.textStrokeWidth;
/**
     * Whether or not line wrapping should be applied to the cue.
     * @type {boolean}
     */
shaka.text.Cue.prototype.wrapLine;
/**
     * Id of the cue.
     * @type {string}
     */
shaka.text.Cue.prototype.id;
/**
     * Nested cues, which should be laid out horizontally in one block.
     * Top-level cues are blocks, and nested cues are inline elements.
     * Cues can be nested arbitrarily deeply.
     * @type {!Array<!shaka.text.Cue>}
     */
shaka.text.Cue.prototype.nestedCues;
/**
     * If true, this represents a container element that is "above" the main
     * cues. For example, the <body> and <div> tags that contain the <p> tags
     * in a TTML file. This controls the flow of the final cues; any nested cues
     * within an "isContainer" cue will be laid out as separate lines.
     * @type {boolean}
     */
shaka.text.Cue.prototype.isContainer;
/**
     * Whether or not the cue only acts as a line break between two nested cues.
     * Should only appear in nested cues.
     * @type {boolean}
     */
shaka.text.Cue.prototype.lineBreak;
/**
     * Used to indicate the type of ruby tag that should be used when rendering
     * the cue. Valid values: ruby, rp, rt.
     * @type {?string}
     */
shaka.text.Cue.prototype.rubyTag;
/**
     * The number of horizontal and vertical cells into which the Root Container
     * Region area is divided.
     * @type {{ columns: number, rows: number }}
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
  'white': 'white',
  'lime': 'lime',
  'cyan': 'cyan',
  'red': 'red',
  'yellow': 'yellow',
  'magenta': 'magenta',
  'blue': 'blue',
  'black': 'black'
};
/**
 * Default text background color according to
 * https://w3c.github.io/webvtt/#default-text-background
 * @enum {string}
 */
shaka.text.Cue.defaultTextBackgroundColor = {
  'bg_white': 'white',
  'bg_lime': 'lime',
  'bg_cyan': 'cyan',
  'bg_red': 'red',
  'bg_yellow': 'yellow',
  'bg_magenta': 'magenta',
  'bg_blue': 'blue',
  'bg_black': 'black'
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
 * @summary Manages transmuxer plugins.
 * @implements {shaka.util.IDestroyable}
 */
shaka.transmuxer.TransmuxerEngine = class {
  /**
   * @override
   */
  destroy() {}
  /**
   * @param {string} mimeType
   * @param {!shaka.extern.TransmuxerPlugin} plugin
   * @param {number} priority
   */
  static registerTransmuxer(mimeType, plugin, priority) {}
  /**
   * @param {string} mimeType
   * @param {number} priority
   */
  static unregisterTransmuxer(mimeType, priority) {}
  /**
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {?shaka.extern.TransmuxerPlugin}
   */
  static findTransmuxer(mimeType, contentType) {}
};
/**
 * Priority level for transmuxer plugins.
 * If multiple plugins are provided for the same mime type, only the
 * highest-priority one is used.
 * @enum {number}
 */
shaka.transmuxer.TransmuxerEngine.PluginPriority = {
  'FALLBACK': 1,
  'PREFERRED_SECONDARY': 2,
  'PREFERRED': 3,
  'APPLICATION': 4
};
/**
 * @summary A set of utility functions for dealing with MIME types.
 */
shaka.util.MimeUtils = class {
  /**
   * Takes a MIME type and optional codecs string and produces the full MIME
   * type. Also remove the codecs for raw formats.
   * @param {string} mimeType
   * @param {string=} codecs
   * @return {string}
   */
  static getFullType(mimeType, codecs) {}
  /**
   * Takes a MIME type and optional codecs string and produces the full MIME
   * type.
   * @param {string} mimeType
   * @param {string=} codecs
   * @return {string}
   */
  static getFullTypeWithAllCodecs(mimeType, codecs) {}
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
   * @param {!Iterable<string>} searchSpace
   * @return {?string}
   */
  static findClosestLocale(target, searchSpace) {}
};
/**
 * @summary A set of utility functions for dealing with Streams and Manifests.
 */
shaka.util.StreamUtils = class {
  /**
   * @param {shaka.extern.Variant} variant
   * @param {shaka.extern.Restrictions} restrictions
   *   Configured restrictions from the user.
   * @param {shaka.extern.Resolution} maxHwRes
   *   The maximum resolution the hardware can handle.
   *   This is applied separately from user restrictions because the setting
   *   should not be easily replaced by the user's configuration.
   * @return {boolean}
   */
  static meetsRestrictions(variant, restrictions, maxHwRes) {}
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
 * @implements {shaka.util.IReleasable}
 */
shaka.abr.SimpleAbrManager = class {
  constructor() {}
  /**
   * @override
   */
  stop() {}
  /**
   * @override
   */
  release() {}
  /**
   * @override
   */
  init(switchCallback) {}
  /**
   * @param {boolean=} preferFastSwitching
   * @return {shaka.extern.Variant}
   * @override
   */
  chooseVariant(preferFastSwitching) {}
  /**
   * @override
   */
  enable() {}
  /**
   * @override
   */
  disable() {}
  /**
   * @param {number} deltaTimeMs The duration, in milliseconds, that the request
   *     took to complete.
   * @param {number} numBytes The total number of bytes transferred.
   * @param {boolean} allowSwitch Indicate if the segment is allowed to switch
   *     to another stream.
   * @param {shaka.extern.Request=} request
   *     A reference to the request
   * @param {shaka.extern.RequestContext=} context
   *     A reference to the request context
   * @override
   */
  segmentDownloaded(deltaTimeMs, numBytes, allowSwitch, request, context) {}
  /**
   * @override
   */
  trySuggestStreams() {}
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
  setMediaElement(mediaElement) {}
  /**
   * @override
   */
  setCmsdManager(cmsdManager) {}
  /**
   * @override
   */
  configure(config) {}
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
 * CEA-X08 captions decoder.
 * @implements {shaka.extern.ICaptionDecoder}
 */
shaka.cea.CeaDecoder = class {
  constructor() {}
};
/**
 */
shaka.util.Mp4Parser = class {
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
   * A callback that tells the Mp4 parser to treat the body of a box as a visual
   * sample entry.  A visual sample entry has some fixed-sized fields
   * describing the video codec parameters, followed by an arbitrary number of
   * appended children.  Each child is a box.
   * @param {!shaka.extern.ParsedBox} box
   */
  static visualSampleEntry(box) {}
  /**
   * A callback that tells the Mp4 parser to treat the body of a box as a audio
   * sample entry.  A audio sample entry has some fixed-sized fields
   * describing the audio codec parameters, followed by an arbitrary number of
   * appended children.  Each child is a box.
   * @param {!shaka.extern.ParsedBox} box
   */
  static audioSampleEntry(box) {}
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
 * MPEG4 stream parser used for extracting 708 closed captions data.
 * @implements {shaka.extern.ICeaParser}
 */
shaka.cea.Mp4CeaParser = class {
  constructor() {}
};
/**
 * @summary
 * Parser for exponential Golomb codes, a variable-bit width number encoding
 * scheme used by h264.
 * Based on https://github.com/videojs/mux.js/blob/main/lib/utils/exp-golomb.js
 */
shaka.util.ExpGolomb = class {
  /**
   * @param {!Uint8Array} data
   * @param {boolean=} convertEbsp2rbsp
   */
  constructor(data, convertEbsp2rbsp) {}
};
/**
 * @summary A set of Id3Utils utility functions.
 */
shaka.util.Id3Utils = class {
  /**
   * Returns an array of ID3 frames found in all the ID3 tags in the id3Data
   * @param {Uint8Array} id3Data - The ID3 data containing one or more ID3 tags
   * @return {!Array<shaka.extern.MetadataFrame>}
   */
  static getID3Frames(id3Data) {}
  /**
   * Returns any adjacent ID3 tags found in data starting at offset, as one
   * block of data
   * @param {Uint8Array} id3Data - The ID3 data containing one or more ID3 tags
   * @param {number=} offset - The offset at which to start searching
   * @return {!Uint8Array}
   */
  static getID3Data(id3Data, offset) {}
};
/**
 * @see https://en.wikipedia.org/wiki/MPEG_transport_stream
 */
shaka.util.TsParser = class {
  constructor() {}
  /**
   * Clear previous data
   */
  clearData() {}
  /**
   * Set the current discontinuity sequence number.
   * @param {number} discontinuitySequence
   */
  setDiscontinuitySequence(discontinuitySequence) {}
  /**
   * Parse the given data
   * @param {Uint8Array} data
   * @return {!shaka.util.TsParser}
   */
  parse(data) {}
  /**
   * Parse AVC Nalus
   * The code is based on hls.js
   * Credit to https://github.com/video-dev/hls.js/blob/master/src/demux/tsdemuxer.ts
   * @param {shaka.extern.MPEG_PES} pes
   * @param {?shaka.extern.MPEG_PES=} nextPes
   * @return {!Array<shaka.extern.VideoNalu>}
   */
  parseAvcNalus(pes, nextPes) {}
  /**
   * Parse AVC and HVC Nalus
   * The code is based on hls.js
   * Credit to https://github.com/video-dev/hls.js/blob/master/src/demux/tsdemuxer.ts
   * @param {shaka.extern.MPEG_PES} pes
   * @param {{nalu: ?shaka.extern.VideoNalu, state: ?number}} lastInfo
   * @return {!Array<shaka.extern.VideoNalu>}
   */
  parseNalus(pes, lastInfo) {}
  /**
   * Return the ID3 metadata
   * @return {!Array<shaka.extern.ID3Metadata>}
   */
  getMetadata() {}
  /**
   * Return the audio data
   * @return {!Array<shaka.extern.MPEG_PES>}
   */
  getAudioData() {}
  /**
   * Return the video data
   * @param {boolean=} naluProcessing
   * @return {!Array<shaka.extern.MPEG_PES>}
   */
  getVideoData(naluProcessing) {}
  /**
   * Return the start time for the audio and video
   * @param {string} contentType
   * @return {?number}
   */
  getStartTime(contentType) {}
  /**
   * Return the audio and video codecs
   * @return {{audio: ?string, video: ?string}}
   */
  getCodecs() {}
  /**
   * Return the video data
   * @return {!Array<shaka.extern.VideoNalu>}
   */
  getVideoNalus() {}
  /**
   * Return the video resolution
   * @return {{height: ?string, width: ?string}}
   */
  getVideoResolution() {}
  /**
   * Return the video information
   * @return {{
   *   height: ?string,
   *   width: ?string,
   *   codec: ?string,
   *   frameRate: ?string,
   * }}
   */
  getVideoInfo() {}
  /**
   * Check if the passed data corresponds to an MPEG2-TS
   * @param {Uint8Array} data
   * @return {boolean}
   */
  static probe(data) {}
  /**
   * Returns the synchronization offset
   * @param {Uint8Array} data
   * @return {number}
   */
  static syncOffset(data) {}
};
/**
 * @const {number}
 */
shaka.util.TsParser.Timescale;
/**
 * MPEG TS CEA parser.
 * @implements {shaka.extern.ICeaParser}
 */
shaka.cea.TsCeaParser = class {
  constructor() {}
};
/**
 * @enum {string}
 */
shaka.config.CodecSwitchingStrategy = {
  'RELOAD': 'reload',
  'SMOOTH': 'smooth'
};
/**
 * @enum {string}
 */
shaka.config.CrossBoundaryStrategy = {
  'KEEP': 'keep',
  'RESET': 'reset',
  'RESET_TO_ENCRYPTED': 'reset_to_encrypted',
  'RESET_ON_ENCRYPTION_CHANGE': 'RESET_ON_ENCRYPTION_CHANGE'
};
/**
 * @enum {number}
 */
shaka.config.RepeatMode = {
  'OFF': 0,
  'ALL': 1,
  'SINGLE': 2
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
  muxjs: 'muxjs',
  ISOBoxer: 'ISOBoxer'
};
/**  */
shaka.util.Dom = class {
  /**
   * Remove all source elements and src attribute from a video element.
   * Returns true if any change was made.
   * @param {!HTMLMediaElement} video
   * @return {boolean}
   */
  static clearSourceFromVideo(video) {}
  /**
   * Remove all of the child nodes of an element.
   * @param {!Element} element
   */
  static removeAllChildren(element) {}
};
/**
 * A utility to wrap abortable operations.  Note that these are not cancelable.
 * Cancellation implies undoing what has been done so far, whereas aborting only
 * means that further work is stopped.
 * @implements {shaka.extern.IAbortableOperation<T>}
 * @template T
 */
shaka.util.AbortableOperation = class {
  /**
   * @param {!Promise<T>} promise
   *   A Promise which represents the underlying operation.  It is resolved when
   *   the operation is complete, and rejected if the operation fails or is
   *   aborted.  Aborted operations should be rejected with a shaka.util.Error
   *   object using the error code OPERATION_ABORTED.
   * @param {function():!Promise} onAbort
   *   Will be called by this object to abort the underlying operation.
   *   This is not cancellation, and will not necessarily result in any work
   *   being undone.  abort() should return a Promise which is resolved when the
   *   underlying operation has been aborted.  The returned Promise should never
   *   be rejected.
   */
  constructor(promise, onAbort) {}
  /**
   * @return {boolean} True if the operation has been aborted.
   */
  aborted() {}
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
   * @param {!Promise<U>} promise
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
   * @param {!Array<!shaka.util.AbortableOperation>} operations
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
   *          function(T):!Promise<U>|
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
 * @const {!Promise<T>}
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
   * @param {Map<string, Object>=} dict
   */
  constructor(type, dict) {}
};
/**
 * @summary A work-alike for EventTarget.  Only DOM elements may be true
 * EventTargets, but this can be used as a base class to provide event dispatch
 * to non-DOM classes.  Only FakeEvents should be dispatched.
 * @implements {EventTarget}
 * @implements {shaka.util.IReleasable}
 */
shaka.util.FakeEventTarget = class {
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
  /**
   * @override
   */
  release() {}
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
   * @param {shaka.net.NetworkingEngine.onProgressUpdated=} onProgressUpdated
   *   Called when
   *   a progress event is triggered. Passed the duration, in milliseconds,
   *   that the request took, the number of bytes transferred, and the boolean
   *   of whether the switching is allowed.
   * @param {shaka.net.NetworkingEngine.OnHeadersReceived=} onHeadersReceived
   *   Called when the headers are received for a download.
   * @param {shaka.net.NetworkingEngine.OnDownloadCompleted=
   *        } onDownloadCompleted Called when a download completed successfully.
   * @param {shaka.net.NetworkingEngine.OnDownloadFailed=} onDownloadFailed
   *   Called when a download fails, for any reason.
   * @param {shaka.net.NetworkingEngine.OnRequest=} onRequest
   *   Called when a request is made
   * @param {shaka.net.NetworkingEngine.OnRetry=} onRetry
   *   Called when a request retry is made
   * @param {shaka.net.NetworkingEngine.OnResponse=} onResponse
   *   Called when receive the response
   */
  constructor(onProgressUpdated, onHeadersReceived, onDownloadCompleted, onDownloadFailed, onRequest, onRetry, onResponse) {}
  /**
   * @param {shaka.extern.NetworkingConfiguration} config
   */
  configure(config) {}
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
   * Clears Common Access Token map.
   */
  clearCommonAccessTokenMap() {}
  /**
   * Gets a copy of the default retry parameters.
   * @return {shaka.extern.RetryParameters}
   * NOTE: The implementation moved to shaka.net.Backoff to avoid a circular
   * dependency between the two classes.
   */
  static defaultRetryParameters() {}
  /**
   * Makes a simple network request for the given URIs.
   * @param {!Array<string>} uris
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
   * @param {shaka.extern.RequestContext=} context
   * @return {!shaka.net.NetworkingEngine.PendingRequest}
   */
  request(type, request, context) {}
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
   *   is not cancellation, and will not necessarily result in any work being
   *   undone.  abort() should return a Promise which is resolved when the
   *   underlying operation has been aborted.  The returned Promise should
   *   never be rejected.
   * @param {shaka.net.NetworkingEngine.NumBytesRemainingClass
   *        } numBytesRemainingObj
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
  'SERVER_CERTIFICATE': 5,
  'KEY': 6,
  'ADS': 7,
  'CONTENT_STEERING': 8,
  'CMCD': 9
};
/**
 * A more advanced form of the RequestType structure, meant to describe
 * sub-types of basic request types.
 * For example, an INIT_SEGMENT is a sub-type of SEGMENT.
 * This is meant to allow for more specificity to be added to the request type
 * data, without breaking backwards compatibility.
 * @enum {number}
 */
shaka.net.NetworkingEngine.AdvancedRequestType = {
  'INIT_SEGMENT': 0,
  'MEDIA_SEGMENT': 1,
  'MEDIA_PLAYLIST': 2,
  'MASTER_PLAYLIST': 3,
  'MPD': 4,
  'MSS': 5,
  'MPD_PATCH': 6,
  'MEDIATAILOR_SESSION_INFO': 7,
  'MEDIATAILOR_TRACKING_INFO': 8,
  'MEDIATAILOR_STATIC_RESOURCE': 9,
  'MEDIATAILOR_TRACKING_EVENT': 10,
  'INTERSTITIAL_ASSET_LIST': 11,
  'INTERSTITIAL_AD_URL': 12
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
 *    !Object<string, string>,
 *    !shaka.extern.Request,
 *    !shaka.net.NetworkingEngine.RequestType)}
 * @description
 * A callback function that passes the shaka.extern.HeadersReceived along to
 * the player, plus some extra data.
 */
shaka.net.NetworkingEngine.OnHeadersReceived;
/**
 * @typedef {function(
 *    number,
 *    number,
 *    boolean,
 *    shaka.extern.Request=,
 *    shaka.extern.RequestContext=)}
 * @description
 * A callback that is passed the duration, in milliseconds,
 * that the request took, the number of bytes transferred, a boolean
 * representing whether the switching is allowed and a ref to the
 * original request.
 */
shaka.net.NetworkingEngine.onProgressUpdated;
/**
 * @typedef {function(
 *    !shaka.extern.Request,
 *    !shaka.extern.Response)}
 * @description
 * A callback function that notifies the player when a download completed
 * successfully.
 */
shaka.net.NetworkingEngine.OnDownloadCompleted;
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
 * @typedef {function(
 *    !shaka.net.NetworkingEngine.RequestType,
 *    !shaka.extern.Request,
 *    (shaka.extern.RequestContext|undefined))}
 * @description
 * A callback function called on every request
 */
shaka.net.NetworkingEngine.OnRequest;
/**
 * @typedef {function(
 *    !shaka.net.NetworkingEngine.RequestType,
 *    (shaka.extern.RequestContext|undefined),
 *    string,
 *    string)}
 * @description
 * A callback function called on every request retry. The first string is the
 * new URI and the second string is the old URI.
 */
shaka.net.NetworkingEngine.OnRetry;
/**
 * @typedef {function(
 *    !shaka.net.NetworkingEngine.RequestType,
 *    !shaka.extern.Response,
 *    (shaka.extern.RequestContext|undefined))}
 * @description
 * A callback function called on every request
 */
shaka.net.NetworkingEngine.OnResponse;
/**
 * @summary A set of FairPlay utility functions.
 */
shaka.drm.FairPlay = class {
  /**
   * Check if FairPlay is supported.
   * @return {!Promise<boolean>}
   */
  static isFairPlaySupported() {}
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
  /**
   * Verimatrix initDataTransform configuration.
   * @param {!Uint8Array} initData
   * @param {string} initDataType
   * @param {?shaka.extern.DrmInfo} drmInfo
   * @return {!Uint8Array}
   */
  static verimatrixInitDataTransform(initData, initDataType, drmInfo) {}
  /**
   * EZDRM initDataTransform configuration.
   * @param {!Uint8Array} initData
   * @param {string} initDataType
   * @param {?shaka.extern.DrmInfo} drmInfo
   * @return {!Uint8Array}
   */
  static ezdrmInitDataTransform(initData, initDataType, drmInfo) {}
  /**
   * Conax initDataTransform configuration.
   * @param {!Uint8Array} initData
   * @param {string} initDataType
   * @param {?shaka.extern.DrmInfo} drmInfo
   * @return {!Uint8Array}
   */
  static conaxInitDataTransform(initData, initDataType, drmInfo) {}
  /**
   * ExpressPlay initDataTransform configuration.
   * @param {!Uint8Array} initData
   * @param {string} initDataType
   * @param {?shaka.extern.DrmInfo} drmInfo
   * @return {!Uint8Array}
   */
  static expressplayInitDataTransform(initData, initDataType, drmInfo) {}
  /**
   * Mux initDataTransform configuration.
   * @param {!Uint8Array} initData
   * @param {string} initDataType
   * @param {?shaka.extern.DrmInfo} drmInfo
   * @return {!Uint8Array}
   */
  static muxInitDataTransform(initData, initDataType, drmInfo) {}
  /**
   * Verimatrix FairPlay request.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Request} request
   * @param {shaka.extern.RequestContext=} context
   */
  static verimatrixFairPlayRequest(type, request, context) {}
  /**
   * EZDRM FairPlay request.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Request} request
   * @param {shaka.extern.RequestContext=} context
   */
  static ezdrmFairPlayRequest(type, request, context) {}
  /**
   * Conax FairPlay request.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Request} request
   * @param {shaka.extern.RequestContext=} context
   */
  static conaxFairPlayRequest(type, request, context) {}
  /**
   * ExpressPlay FairPlay request.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Request} request
   * @param {shaka.extern.RequestContext=} context
   */
  static expressplayFairPlayRequest(type, request, context) {}
  /**
   * Mux FairPlay request.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Request} request
   * @param {shaka.extern.RequestContext=} context
   */
  static muxFairPlayRequest(type, request, context) {}
  /**
   * Common FairPlay response transform for some DRMs providers.
   * @param {shaka.net.NetworkingEngine.RequestType} type
   * @param {shaka.extern.Response} response
   * @param {shaka.extern.RequestContext=} context
   */
  static commonFairPlayResponse(type, response, context) {}
};
/**
 * Creates an InitSegmentReference, which provides the location to an
 * initialization segment.
 */
shaka.media.InitSegmentReference = class {
  /**
   * @param {function(): !Array<string>} uris A function that creates the URIs
   *   of the resource containing the segment.
   * @param {number} startByte The offset from the start of the resource to the
   *   start of the segment.
   * @param {?number} endByte The offset from the start of the resource
   *   to the end of the segment, inclusive.  A value of null indicates that the
   *   segment extends to the end of the resource.
   * @param {null|shaka.extern.MediaQualityInfo=} mediaQuality Information about
   *   the quality of the media associated with this init segment.
   * @param {(null|number)=} timescale
   * @param {(null|BufferSource)=} segmentData
   * @param {?shaka.extern.aesKey=} aesKey
   *  The segment's AES-128-CBC full segment encryption key and iv.
   * @param {boolean=} encrypted
   */
  constructor(uris, startByte, endByte, mediaQuality, timescale, segmentData, aesKey, encrypted) {}
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
   * @param {function(): !Array<string>} uris
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
   *   For HLS, this value should be the start time of the most recent
   *   discontinuity, or 0 if there is no preceding discontinuity. Only used
   *   in segments mode.
   * @param {number} appendWindowStart
   *   The start of the append window for this reference, relative to the
   *   presentation.  Any content from before this time will be removed by
   *   MediaSource.
   * @param {number} appendWindowEnd
   *   The end of the append window for this reference, relative to the
   *   presentation.  Any content from after this time will be removed by
   *   MediaSource.
   * @param {!Array<!shaka.media.SegmentReference>=} partialReferences
   *   A list of SegmentReferences for the partial segments.
   * @param {?string=} tilesLayout
   *   The value is a grid-item-dimension consisting of two positive decimal
   *   integers in the format: column-x-row ('4x3'). It describes the
   *   arrangement of Images in a Grid. The minimum valid LAYOUT is '1x1'.
   * @param {?number=} tileDuration
   *  The explicit duration of an individual tile within the tiles grid.
   *  If not provided, the duration should be automatically calculated based on
   *  the duration of the reference.
   * @param {?number=} syncTime
   *  A time value, expressed in seconds since 1970, which is used to
   *  synchronize between streams.  Both produced and consumed by the HLS
   *  parser.  Other components should not need this value.
   * @param {shaka.media.SegmentReference.Status=} status
   *  The segment status is used to indicate that a segment does not exist or is
   *  not available.
   * @param {?shaka.extern.aesKey=} aesKey
   *  The segment's AES-128-CBC full segment encryption key and iv.
   * @param {boolean=} allPartialSegments
   *  Indicate if the segment has all partial segments
   */
  constructor(startTime, endTime, uris, startByte, endByte, initSegmentReference, timestampOffset, appendWindowStart, appendWindowEnd, partialReferences, tilesLayout, tileDuration, syncTime, status, aesKey, allPartialSegments) {}
  /**
   * Creates and returns the URIs of the resource containing the segment.
   * @return {!Array<string>}
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
  /**
   * Returns the segment's explicit tile duration.
   * Only defined in image segments.
   * @return {?number}
   */
  getTileDuration() {}
  /**
   * Returns the segment's status.
   * @return {shaka.media.SegmentReference.Status}
   */
  getStatus() {}
  /**
   * Mark the reference as unavailable.
   */
  markAsUnavailable() {}
  /**
   * Mark the reference as preload.
   */
  markAsPreload() {}
  /**
   * Returns true if the segment is preloaded.
   * @return {boolean}
   */
  isPreload() {}
  /**
   * Mark the reference as non-independent.
   */
  markAsNonIndependent() {}
  /**
   * Returns true if the segment is independent.
   * @return {boolean}
   */
  isIndependent() {}
  /**
   * Mark the reference as partial.
   */
  markAsPartial() {}
  /**
   * Returns true if the segment is partial.
   * @return {boolean}
   */
  isPartial() {}
  /**
   * Mark the reference as being the last part of the full segment
   */
  markAsLastPartial() {}
  /**
   * Returns true if reference as being the last part of the full segment.
   * @return {boolean}
   */
  isLastPartial() {}
  /**
   * Mark the reference as byterange optimization.
   * The "byterange optimization" means that it is playable using MP4 low
   * latency streaming with chunked data.
   */
  markAsByterangeOptimization() {}
  /**
   * Returns true if the segment has a byterange optimization.
   * @return {boolean}
   */
  hasByterangeOptimization() {}
  /**
   * Set the segment's thumbnail sprite.
   * @param {shaka.extern.ThumbnailSprite} thumbnailSprite
   */
  setThumbnailSprite(thumbnailSprite) {}
  /**
   * Returns the segment's thumbnail sprite.
   * @return {?shaka.extern.ThumbnailSprite}
   */
  getThumbnailSprite() {}
  /**
   * Offset the segment reference by a fixed amount.
   * @param {number} offset The amount to add to the segment's start and end
   *   times.
   */
  offset(offset) {}
  /**
   * Sync this segment against a particular sync time that will serve as "0" in
   * the presentation timeline.
   * @param {number} lowestSyncTime
   */
  syncAgainst(lowestSyncTime) {}
  /**
   * Set the segment data.
   * @param {!BufferSource} segmentData
   * @param {boolean=} singleUse
   */
  setSegmentData(segmentData, singleUse) {}
  /**
   * Return the segment data.
   * @param {boolean=} allowDeleteOnSingleUse
   * @return {?BufferSource}
   */
  getSegmentData(allowDeleteOnSingleUse) {}
};
/**
 * Rather than using booleans to communicate what the state of the reference,
 * we have this enum.
 * @enum {number}
 */
shaka.media.SegmentReference.Status = {
  AVAILABLE: 0,
  UNAVAILABLE: 1,
  MISSING: 2
};
/**
 * @typedef {{
 *   height: number,
 *   positionX: number,
 *   positionY: number,
 *   width: number,
 * }}
 * @property {number} height
 *    The thumbnail height in px.
 * @property {number} positionX
 *    The thumbnail left position in px.
 * @property {number} positionY
 *    The thumbnail top position in px.
 * @property {number} width
 *    The thumbnail width in px.
 */
shaka.media.SegmentReference.ThumbnailSprite;
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
 * @enum {string}
 */
shaka.media.ManifestParser.AccessibilityPurpose = {
  VISUALLY_IMPAIRED: 'visually impaired',
  HARD_OF_HEARING: 'hard of hearing',
  SPOKEN_SUBTITLES: 'spoken subtitles'
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
   * Sets the presentation's start time.
   * @param {number} presentationStartTime The wall-clock time, in seconds,
   *   when the presentation started or will start. Only required for live.
   */
  setPresentationStartTime(presentationStartTime) {}
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
   * Gets the presentation's segment availability duration.
   * @return {number}
   */
  getSegmentAvailabilityDuration() {}
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
   * Gives PresentationTimeline a Stream's timeline so it can size and position
   * the segment availability window, and account for missing segment
   * information.
   * @param {!Array<shaka.media.PresentationTimeline.TimeRange>} timeline
   * @param {number} startOffset
   */
  notifyTimeRange(timeline, startOffset) {}
  /**
   * Gives PresentationTimeline an array of segments so it can size and position
   * the segment availability window, and account for missing segment
   * information.  These segments do not necessarily need to all be from the
   * same stream.
   * @param {!Array<!shaka.media.SegmentReference>} references
   */
  notifySegments(references) {}
  /**
   * Gives PresentationTimeline an startTime and endTime of the period.
   * This should be only set for Dash.
   * @param {number} startTime
   * @param {number} endTime
   */
  notifyPeriodDuration(startTime, endTime) {}
  /**
   * Gets the end time of the last available segment.
   * @return {?number}
   */
  getMaxSegmentEndTime() {}
  /**
   * Lock the presentation timeline's start time.  After this is called, no
   * further adjustments to presentationStartTime_ will be permitted.
   * This should be called after all Periods have been parsed, and all calls to
   * notifySegments() from the initial manifest parse have been made.
   * Without this, we can get assertion failures in SegmentIndex for certain
   * DAI content.  If DAI adds ad segments to the manifest faster than
   * real-time, adjustments to presentationStartTime_ can cause availability
   * windows to jump around on updates.
   */
  lockStartTime() {}
  /**
   * Returns if the presentation timeline's start time is locked.
   * @return {boolean}
   */
  isStartTimeLocked() {}
  /**
   * Sets the initial program date time.
   * @param {number} initialProgramDateTime
   */
  setInitialProgramDateTime(initialProgramDateTime) {}
  /**
   * @return {?number} The initial program date time in seconds.
   */
  getInitialProgramDateTime() {}
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
   *   relative to the start of the presentation.  For VOD, the availability
   *   end time is the content's duration.  If the Player's playRangeEnd
   *   configuration is used, this can override the duration.
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
  /**
   * Gets the presentation's segment availability time offset. This should be
   * only configured for Low Latency Dash.
   * @return {number} availabilityTimeOffset parameter
   */
  getAvailabilityTimeOffset() {}
};
/**
 * @typedef {{
 *   start: number,
 *   unscaledStart: number,
 *   end: number,
 *   partialSegments: number,
 *   segmentPosition: number,
 * }}
 * @description
 * Defines a time range of a media segment.  Times are in seconds.
 * @property {number} start
 *   The start time of the range.
 * @property {number} unscaledStart
 *   The start time of the range in representation timescale units.
 * @property {number} end
 *   The end time (exclusive) of the range.
 * @property {number} partialSegments
 *   The number of partial segments
 * @property {number} segmentPosition
 *   The segment position of the timeline entry as it appears in the manifest
 */
shaka.media.PresentationTimeline.TimeRange;
/**
 * SegmentIndex.
 * @implements {shaka.extern.SegmentIndex}
 * @implements {shaka.util.IReleasable}
 * @implements {Iterable<?shaka.media.SegmentReference>}
 */
shaka.media.SegmentIndex = class {
  /**
   * @param {!Array<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   */
  constructor(references) {}
  /**
   * @override
   */
  getNumReferences() {}
  /**
   * @override
   */
  getNumEvicted() {}
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
   * @override
   */
  find(time) {}
  /**
   * @override
   */
  get(position) {}
  /**
   * Offset all segment references by a fixed amount.
   * @param {number} offset The amount to add to each segment's start and end
   *   times.
   */
  offset(offset) {}
  /**
   * Merges the given SegmentReferences and evicts the ones that end before the
   * given time.  Supports extending the original references only.
   * Will not replace old references or interleave new ones.
   * Used, for example, by the DASH and HLS parser, where manifests may not list
   * all available references, so we must keep available references in memory to
   * fill the availability window.
   * @param {!Array<!shaka.media.SegmentReference>} references The list of
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
   * @param {function(): Array<shaka.media.SegmentReference>} updateCallback
   */
  updateEvery(interval, updateCallback) {}
  /**
   * @return {!shaka.media.SegmentIterator}
   * @override
   */
  [Symbol.iterator]() {}
  /**
   * Returns a new iterator that initially points to the segment that contains
   * the given time, or the nearest independent segment before it.
   * Like the normal iterator, next() must be called first to get to the first
   * element. Returns null if we do not find a segment at the
   * requested time.
   * The first segment returned by the iterator _MUST_ be an independent
   * segment.  Assumes that only partial references can be dependent, based on
   * RFC 8216 rev 13, section 8.1: "Each (non-Partial) Media Segment in a Media
   * Playlist will contain at least one independent frame."
   * @param {number} time
   * @param {boolean=} allowNonIndependent
   * @param {boolean=} reverse
   * @return {?shaka.media.SegmentIterator}
   */
  getIteratorForTime(time, allowNonIndependent, reverse) {}
  /**
   * Create a SegmentIndex for a single segment of the given start time and
   * duration at the given URIs.
   * @param {number} startTime
   * @param {number} duration
   * @param {!Array<string>} uris
   * @return {!shaka.media.SegmentIndex}
   */
  static forSingleSegment(startTime, duration, uris) {}
};
/**
 * An iterator over a SegmentIndex's references.
 * @implements {Iterator<?shaka.media.SegmentReference>}
 */
shaka.media.SegmentIterator = class {
  /**
   * @param {!shaka.media.SegmentIndex} segmentIndex
   * @param {number} index
   * @param {number} partialSegmentIndex
   * @param {boolean} reverse
   */
  constructor(segmentIndex, index, partialSegmentIndex, reverse) {}
  /**
   * @param {boolean} reverse
   */
  setReverse(reverse) {}
  /**
   * @return {number}
   */
  currentPosition() {}
  /**
   * @return {?shaka.media.SegmentReference}
   */
  current() {}
  /**
   * @override
   * @return {!IIterableResult<?shaka.media.SegmentReference>}
   */
  next() {}
  /**
   */
  resetToLastIndependent() {}
};
/**
 * A meta-SegmentIndex composed of multiple other SegmentIndexes.
 * Used in constructing multi-Period Streams for DASH.
 * @extends {shaka.media.SegmentIndex}
 * @implements {shaka.util.IReleasable}
 * @implements {Iterable<?shaka.media.SegmentReference>}
 */
shaka.media.MetaSegmentIndex = class extends shaka.media.SegmentIndex {
  constructor() {}
  /**
   * @override
   */
  release() {}
  /**
   * @override
   */
  forEachTopLevelReference(fn) {}
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
   * @param {shaka.extern.ManifestConfiguration} config
   * @param {(function():boolean)=} isPreloadFn
   * @override
   */
  configure(config, isPreloadFn) {}
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
  /**
   * @override
   */
  onInitialVariantChosen(variant) {}
  /**
   * @override
   */
  banLocation(uri) {}
  /**
   * @override
   */
  setMediaElement(mediaElement) {}
};
/**
 * A set of variants that we want to adapt between.
 * @final
 */
shaka.media.AdaptationSet = class {
  /**
   * @param {shaka.extern.Variant} root
   *    The variant that all other variants will be tested against when being
   *    added to the adaptation set. If a variant is not compatible with the
   *    root, it will not be added.
   * @param {!Iterable<shaka.extern.Variant>=} candidates
   *    Variants that may be compatible with the root and should be added if
   *    compatible. If a candidate is not compatible, it will not end up in the
   *    adaptation set.
   * @param {boolean=} compareCodecs
   */
  constructor(root, candidates, compareCodecs) {}
};
/**
 * @typedef {function(
 *  !(shaka.media.InitSegmentReference|shaka.media.SegmentReference),
 *  shaka.extern.Stream,
 *  ?function(BufferSource):!Promise=
 * ):!shaka.net.NetworkingEngine.PendingRequest}
 * @description
 * A callback function that fetches a segment.
 */
shaka.media.SegmentPrefetch.FetchDispatcher;
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
  /**
   * @param {!Object} object
   * @param {!Object} base
   * @return {!Object}
   */
  static getDifferenceFromConfigObjects(object, base) {}
};
/**
 * @final
 */
shaka.util.PlayerConfiguration = class {
  /**
   * @return {shaka.extern.PlayerConfiguration}
   */
  static createDefault() {}
  /**
   * @return {!Object}
   */
  static createDefaultForLL() {}
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
 * @implements {shaka.util.IDestroyable}
 */
shaka.media.PreloadManager = class extends shaka.util.FakeEventTarget {
  /**
   * @param {string} assetUri
   * @param {?string} mimeType
   * @param {?number|Date} startTime
   * @param {*} playerInterface
   */
  constructor(assetUri, mimeType, startTime, playerInterface) {}
  /**
   * Gets the preloaded variant track if it exists.
   * @return {?shaka.extern.Track}
   */
  getPrefetchedVariantTrack() {}
  /**
   * Gets the preloaded text track if it exists.
   * @return {?shaka.extern.TextTrack}
   */
  getPrefetchedTextTrack() {}
  /**
   * Waits for the loading to be finished (or to fail with an error).
   * @return {!Promise}
   */
  waitForFinish() {}
  /**
   * Releases or stops all non-entrusted resources.
   * @override
   */
  destroy() {}
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
   * @param {shaka.extern.SchemePluginConfig} config
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   */
  static parse(uri, request, requestType, progressUpdated, headersReceived, config) {}
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
   * @param {shaka.extern.SchemePluginConfig} config
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   */
  static parse(uri, request, requestType, progressUpdated, headersReceived, config) {}
};
/**
 * A text displayer plugin using the browser's native VTTCue interface.
 * @implements {shaka.extern.TextDisplayer}
 */
shaka.text.NativeTextDisplayer = class {
  /**
   * @param {shaka.Player} player
   */
  constructor(player) {}
  /**
   * @override
   */
  configure(config) {}
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
  /**
   * @override
   */
  setTextLanguage(language) {}
  /**
   * @override
   */
  enableTextDisplayer() {}
};
/**
 * A text displayer plugin using the browser's native VTTCue interface.
 * @implements {shaka.extern.TextDisplayer}
 * @deprecated
 */
shaka.text.SimpleTextDisplayer = class {
  /**
   * @param {HTMLMediaElement} video
   * @param {string} label
   */
  constructor(video, label) {}
  /**
   * @override
   */
  configure(config) {}
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
  /**
   * @override
   */
  setTextLanguage(language) {}
  /**
   * @override
   */
  enableTextDisplayer() {}
};
/**
 * A stub text displayer plugin that does nothing
 * @implements {shaka.extern.TextDisplayer}
 */
shaka.text.StubTextDisplayer = class {
  /**
   * @override
   */
  configure(config) {}
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
  /**
   * @override
   */
  setTextLanguage(language) {}
  /**
   * @override
   */
  enableTextDisplayer() {}
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
  configure(config) {}
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
  /**
   * @override
   */
  setTextLanguage(language) {}
  /**
   * @override
   */
  enableTextDisplayer() {}
};
/**
 * @summary Manage the conversion to WebVTT.
 */
shaka.text.WebVttGenerator = class {
};
/**
 * @enum {string}
 */
shaka.util.CmcdManager.StreamingFormat = {
  DASH: 'd',
  LOW_LATENCY_DASH: 'ld',
  HLS: 'h',
  LOW_LATENCY_HLS: 'lh',
  SMOOTH: 's',
  OTHER: 'o'
};
/**
 * @summary
 * A CmsdManager maintains CMSD state as well as a collection of utility
 * functions.
 */
shaka.util.CmsdManager = class {
  /**
   * @param {shaka.extern.CmsdConfiguration} config
   */
  constructor(config) {}
  /**
   * Returns the max bitrate in bits per second. If there is no max bitrate or
   * it's not enabled, it returns null.
   * @return {?number}
   */
  getMaxBitrate() {}
  /**
   * Returns the estimated throughput in bits per second. If there is no
   * estimated throughput or it's not enabled, it returns null.
   * @return {?number}
   */
  getEstimatedThroughput() {}
  /**
   * Returns the response delay in milliseconds. If there is no response delay
   * or it's not enabled, it returns null.
   * @return {?number}
   */
  getResponseDelay() {}
  /**
   * Returns the RTT in milliseconds. If there is no RTT or it's not enabled,
   * it returns null.
   * @return {?number}
   */
  getRoundTripTime() {}
  /**
   * Gets the current bandwidth estimate.
   * @param {number} defaultEstimate
   * @return {number} The bandwidth estimate in bits per second.
   */
  getBandwidthEstimate(defaultEstimate) {}
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
   * @param {HTMLElement=} videoContainer
   *    The videoContainer to construct UITextDisplayer
   * @param {function(shaka.Player)=} dependencyInjector Optional callback
   *   which is called to inject mocks into the Player.  Used for testing.
   */
  constructor(mediaElement, videoContainer, dependencyInjector) {}
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
   * This method needs to be called before instantiating the Player class.
   * @param {!shaka.extern.IAdManager.Factory} factory
   */
  static setAdManagerFactory(factory) {}
  /**
   * Set a factory to create an queue manager during player construction time.
   * This method needs to be called before instantiating the Player class.
   * @param {!shaka.extern.IQueueManager.Factory} factory
   */
  static setQueueManagerFactory(factory) {}
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
   * @return {!Promise<shaka.extern.SupportType>}
   */
  static probeSupport(promptsOkay) {}
  /**
   * Attaches the player to a media element.
   * If the player was already attached to a media element, first detaches from
   * that media element.
   * @param {!HTMLMediaElement} mediaElement
   * @param {boolean=} initializeMediaSource
   * @return {!Promise}
   */
  attach(mediaElement, initializeMediaSource) {}
  /**
   * Calling <code>attachCanvas</code> will tell the player to set canvas
   * element for LCEVC decoding.
   * @param {HTMLCanvasElement} canvas
   */
  attachCanvas(canvas) {}
  /**
   * Detach the player from the current media element. Leaves the player in a
   * state where it cannot play media, until it has been attached to something
   * else.
   * @param {boolean=} keepAdManager
   * @return {!Promise}
   */
  detach(keepAdManager) {}
  /**
   * Unloads the currently playing stream, if any.
   * @param {boolean=} initializeMediaSource
   * @param {boolean=} keepAdManager
   * @return {!Promise}
   */
  unload(initializeMediaSource, keepAdManager) {}
  /**
   * Provides a way to update the stream start position during the media loading
   * process. Can for example be called from the <code>manifestparsed</code>
   * event handler to update the start position based on information in the
   * manifest.
   * @param {number|Date} startTime
   */
  updateStartTime(startTime) {}
  /**
   * Loads a new stream.
   * If another stream was already playing, first unloads that stream.
   * @param {string|shaka.media.PreloadManager} assetUriOrPreloader
   * @param {?number|Date=} startTime
   *    When <code>startTime</code> is <code>null</code> or
   *    <code>undefined</code>, playback will start at the default start time (0
   *    for VOD and liveEdge for LIVE).
   * @param {?string=} mimeType
   * @return {!Promise}
   */
  load(assetUriOrPreloader, startTime, mimeType) {}
  /**
   * Unloads the currently playing stream, if any, and returns a PreloadManager
   * that contains the loaded manifest of that asset, if any.
   * Allows for the asset to be re-loaded by this player faster, in the future.
   * When in src= mode, this unloads but does not make a PreloadManager.
   * @param {boolean=} initializeMediaSource
   * @param {boolean=} keepAdManager
   * @return {!Promise<?shaka.media.PreloadManager>}
   */
  unloadAndSavePreload(initializeMediaSource, keepAdManager) {}
  /**
   * Detach the player from the current media element, if any, and returns a
   * PreloadManager that contains the loaded manifest of that asset, if any.
   * Allows for the asset to be re-loaded by this player faster, in the future.
   * When in src= mode, this detach but does not make a PreloadManager.
   * Leaves the player in a state where it cannot play media, until it has been
   * attached to something else.
   * @param {boolean=} keepAdManager
   * @param {boolean=} saveLivePosition
   * @return {!Promise<?shaka.media.PreloadManager>}
   */
  detachAndSavePreload(keepAdManager, saveLivePosition) {}
  /**
   * Starts to preload a given asset, and returns a PreloadManager object that
   * represents that preloading process.
   * The PreloadManager will load the manifest for that asset, as well as the
   * initialization segment. It will not preload anything more than that;
   * this feature is intended for reducing start-time latency, not for fully
   * downloading assets before playing them (for that, use
   * |shaka.offline.Storage|).
   * You can pass that PreloadManager object in to the |load| method on this
   * Player instance to finish loading that particular asset, or you can call
   * the |destroy| method on the manager if the preload is no longer necessary.
   * If this returns null rather than a PreloadManager, that indicates that the
   * asset must be played with src=, which cannot be preloaded.
   * @param {string} assetUri
   * @param {?number|Date=} startTime
   *    When <code>startTime</code> is <code>null</code> or
   *    <code>undefined</code>, playback will start at the default start time (0
   *    for VOD and liveEdge for LIVE).
   * @param {?string=} mimeType
   * @param {?shaka.extern.PlayerConfiguration=} config
   * @return {!Promise<?shaka.media.PreloadManager>}
   */
  preload(assetUri, startTime, mimeType, config) {}
  /**
   * Calls |destroy| on each PreloadManager object this player has created.
   */
  destroyAllPreloads() {}
  /**
   * Releases all of the mutexes of the player. Meant for use by the tests.
   */
  releaseAllMutexes() {}
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
   * Changes low latency configuration settings on the Player.
   * @param {!Object} config This object should follow the
   *    {@link shaka.extern.PlayerConfiguration} object.  Not all fields
   *    need to be set; unset fields retain their old values.
   */
  configurationForLowLatency(config) {}
  /**
   * Return a copy of the current configuration.  Modifications of the returned
   * value will not affect the Player's active configuration.  You must call
   * <code>player.configure()</code> to make changes.
   * @return {shaka.extern.PlayerConfiguration}
   */
  getConfiguration() {}
  /**
   * Return a copy of the current configuration for low latency.
   * @return {!Object}
   */
  getConfigurationForLowLatency() {}
  /**
   * Return a copy of the current non default configuration.  Modifications of
   * the returned value will not affect the Player's active configuration.
   * You must call <code>player.configure()</code> to make changes.
   * @return {!Object}
   */
  getNonDefaultConfiguration() {}
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
   * Get the current manifest type.
   * @return {?string}
   */
  getManifestType() {}
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
   * Returns a shaka.queue.QueueManager instance, responsible for queue
   * management.
   * @return {shaka.extern.IQueueManager}
   */
  getQueueManager() {}
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
   * Check if the manifest contains only video-only content. If the player has
   * not loaded content, this will return <code>false</code>.
   * <p>
   * The player does not support content that contain more than one type of
   * variants (i.e. mixing audio-only, video-only, audio-video). Content will be
   * filtered to only contain one type of variant.
   * @return {boolean}
   */
  isVideoOnly() {}
  /**
   * Get the range of time (in seconds) that seeking is allowed. If the player
   * has not loaded content and the manifest is HLS, this will return a range
   * from 0 to 0.
   * @return {{start: number, end: number}}
   */
  seekRange() {}
  /**
   * Go to live in a live stream.
   */
  goToLive() {}
  /**
   * Indicates if the player has fully loaded the stream.
   * @return {boolean}
   */
  isFullyLoaded() {}
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
   * Returns the active sessions metadata
   * @return {!Array<shaka.extern.DrmSessionMetadata>}
   */
  getActiveSessionsMetadata() {}
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
   * Enable or disable trick play track if the currently loaded content
   * has it.
   * @param {boolean} on
   */
  useTrickPlayTrackIfAvailable(on) {}
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
   * @param {boolean=} useTrickPlayTrack
   */
  trickPlay(rate, useTrickPlayTrack) {}
  /**
   * Cancel trick-play. If the player has not loaded content or is still loading
   * content this will be a no-op.
   */
  cancelTrickPlay() {}
  /**
   * Return a list of variant tracks that can be switched to.
   * <p>
   * If the player has not loaded content, this will return an empty list.
   * @return {!Array<shaka.extern.Track>}
   */
  getVariantTracks() {}
  /**
   * Return a list of text tracks that can be switched to.
   * <p>
   * If the player has not loaded content, this will return an empty list.
   * @return {!Array<shaka.extern.TextTrack>}
   */
  getTextTracks() {}
  /**
   * Return a list of image tracks that can be switched to.
   * If the player has not loaded content, this will return an empty list.
   * @return {!Array<shaka.extern.ImageTrack>}
   */
  getImageTracks() {}
  /**
   * Returns Thumbnail objects for each thumbnail.
   * If the player has not loaded content, this will return a null.
   * @param {?number=} trackId
   * @return {!Promise<?Array<!shaka.extern.Thumbnail>>}
   */
  getAllThumbnails(trackId) {}
  /**
   * Return a Thumbnail object from a time.
   * If the player has not loaded content, this will return a null.
   * @param {?number} trackId
   * @param {number} time
   * @return {!Promise<?shaka.extern.Thumbnail>}
   */
  getThumbnails(trackId, time) {}
  /**
   * Select a specific text track. <code>track</code> should come from a call to
   * <code>getTextTracks</code>. If the track is not found, this will be a
   * no-op. If the player has not loaded content, this will be a no-op.
   * <p>
   * Note that <code>AdaptationEvents</code> are not fired for manual track
   * selections.
   * @param {shaka.extern.TextTrack} track
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
   * Select an audio track compatible with the current video track.
   * If the player has not loaded any content, this will be a no-op.
   * @param {shaka.extern.AudioTrack} audioTrack
   * @param {number=} safeMargin Optional amount of buffer (in seconds) to
   *   retain when clearing the buffer. Useful for switching quickly
   *   without causing a buffering event. Defaults to 0 if not provided. Can
   *   cause hiccups on some browsers if chosen too small, e.g. The amount of
   *   two segments is a fair minimum to consider as safeMargin value.
   */
  selectAudioTrack(audioTrack, safeMargin) {}
  /**
   * Return a list of audio tracks compatible with the current video track.
   * @return {!Array<shaka.extern.AudioTrack>}
   */
  getAudioTracks() {}
  /**
   * Select a video track compatible with the current audio track.
   * If the player has not loaded any content, this will be a no-op.
   * @param {shaka.extern.VideoTrack} videoTrack
   * @param {boolean=} clearBuffer
   * @param {number=} safeMargin Optional amount of buffer (in seconds) to
   *   retain when clearing the buffer. Useful for switching quickly
   *   without causing a buffering event. Defaults to 0 if not provided. Can
   *   cause hiccups on some browsers if chosen too small, e.g. The amount of
   *   two segments is a fair minimum to consider as safeMargin value.
   */
  selectVideoTrack(videoTrack, clearBuffer, safeMargin) {}
  /**
   * Return a list of video tracks compatible with the current audio track.
   * @return {!Array<shaka.extern.VideoTrack>}
   */
  getVideoTracks() {}
  /**
   * Return a list of audio language-role combinations available.  If the
   * player has not loaded any content, this will return an empty list.
   * <br>
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getAudioTracks` and `selectAudioTrack`.
   * @return {!Array<shaka.extern.LanguageRole>}
   * @deprecated
   */
  getAudioLanguagesAndRoles() {}
  /**
   * Return a list of text language-role combinations available.  If the player
   * has not loaded any content, this will be return an empty list.
   * <br>
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getTextTracks` and `selectTextTrack`.
   * @return {!Array<shaka.extern.LanguageRole>}
   * @deprecated
   */
  getTextLanguagesAndRoles() {}
  /**
   * Return a list of audio languages available. If the player has not loaded
   * any content, this will return an empty list.
   * <br>
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getAudioTracks` and `selectAudioTrack`.
   * @return {!Array<string>}
   * @deprecated
   */
  getAudioLanguages() {}
  /**
   * Return a list of text languages available. If the player has not loaded
   * any content, this will return an empty list.
   * <br>
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getTextTracks` and `selectTextTrack`.
   * @return {!Array<string>}
   * @deprecated
   */
  getTextLanguages() {}
  /**
   * Sets the current audio language and current variant role to the selected
   * language, role and channel count, and chooses a new variant if need be.
   * If the player has not loaded any content, this will be a no-op.
   * <br>
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getAudioTracks` and `selectAudioTrack`.
   * @param {string} language
   * @param {string=} role
   * @param {number=} channelsCount
   * @param {number=} safeMargin
   * @param {string=} codec
   * @param {boolean=} spatialAudio
   * @param {string=} label
   * @deprecated
   */
  selectAudioLanguage(language, role, channelsCount, safeMargin, codec, spatialAudio, label) {}
  /**
   * Sets the current text language and current text role to the selected
   * language and role, and chooses a new variant if need be. If the player has
   * not loaded any content, this will be a no-op.
   * <br>
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getTextTracks` and `selectTextTrack`.
   * @param {string} language
   * @param {string=} role
   * @param {boolean=} forced
   * @deprecated
   */
  selectTextLanguage(language, role, forced) {}
  /**
   * Select variant tracks that have a given label. This assumes the
   * label uniquely identifies an audio stream, so all the variants
   * are expected to have the same variant.audio.
   * This API is deprecated and will be removed in version 5.0, please migrate
   * to using `getAudioTracks` and `selectAudioTrack`.
   * @param {string} label
   * @param {boolean=} clearBuffer Optional clear buffer or not when
   *  switch to new variant
   *  Defaults to true if not provided
   * @param {number=} safeMargin Optional amount of buffer (in seconds) to
   *   retain when clearing the buffer.
   *   Defaults to 0 if not provided. Ignored if clearBuffer is false.
   * @deprecated
   */
  selectVariantsByLabel(label, clearBuffer, safeMargin) {}
  /**
   * Check if the text displayer is enabled.
   * @return {boolean}
   */
  isTextTrackVisible() {}
  /**
   * Return a list of chapters tracks.
   * @return {!Array<shaka.extern.TextTrack>}
   */
  getChaptersTracks() {}
  /**
   * This returns the list of chapters.
   * @param {string} language
   * @return {!Array<shaka.extern.Chapter>}
   */
  getChapters(language) {}
  /**
   * This returns the list of chapters.
   * @param {string} language
   * @return {!Promise<!Array<shaka.extern.Chapter>>}
   */
  getChaptersAsync(language) {}
  /**
   * Enable or disable the text displayer.  If the player is in an unloaded
   * state, the request will be applied next time content is loaded.
   * @param {boolean} isVisible
   */
  setTextTrackVisibility(isVisible) {}
  /**
   * Get the current playhead position as a date.
   * @return {Date}
   */
  getPlayheadTimeAsDate() {}
  /**
   * Get the presentation start time as a date.
   * @return {(Date|null)}
   */
  getPresentationStartTimeAsDate() {}
  /**
   * Get the presentation segment availability duration. This should only be
   * called when the player has loaded a live stream. If the player has not
   * loaded a live stream, this will return <code>null</code>.
   * @return {?number}
   */
  getSegmentAvailabilityDuration() {}
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
   * @return {!Promise<shaka.extern.TextTrack>}
   */
  addTextTrackAsync(uri, language, kind, mimeType, codec, label, forced) {}
  /**
   * Adds the given thumbnails track to the loaded manifest.
   * <code>load()</code> must resolve before calling.  The presentation must
   * have a duration.
   * This returns the created track, which can immediately be used by the
   * application.
   * @param {string} uri
   * @param {string=} mimeType
   * @return {!Promise<shaka.extern.ImageTrack>}
   */
  addThumbnailsTrack(uri, mimeType) {}
  /**
   * Adds the given chapters track to the loaded manifest.  <code>load()</code>
   * must resolve before calling.  The presentation must have a duration.
   * This returns the created track.
   * @param {string} uri
   * @param {string} language
   * @param {string=} mimeType
   * @return {!Promise<shaka.extern.TextTrack>}
   */
  addChaptersTrack(uri, language, mimeType) {}
  /**
   * Set the maximum resolution that the platform's hardware can handle.
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
   * @param {number=} retryDelaySeconds
   * @return {boolean}
   */
  retryStreaming(retryDelaySeconds) {}
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
   * Gets information about the currently fetched video, audio, and text.
   * In the case of a multi-codec or multi-mimeType manifest, this can let you
   * determine the exact codecs and mimeTypes being fetched at the moment.
   * @return {!shaka.extern.PlaybackInfo}
   */
  getFetchedPlaybackInfo() {}
  /**
   * Set the videoContainer to construct UITextDisplayer.
   * @param {HTMLElement} videoContainer
   */
  setVideoContainer(videoContainer) {}
  /**
   * Load a new font on the page. If the font was already loaded, it does
   * nothing.
   * @param {string} name
   * @param {string} url
   * @return {!Promise<void>}
   */
  addFont(name, url) {}
  /**
   * Indicate if we are using remote playback.
   * @return {boolean}
   */
  isRemotePlayback() {}
  /**
   * Indicate if the video has ended.
   * @return {boolean}
   */
  isEnded() {}
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
 * A polyfill to add support for EncryptionScheme queries in EME.
 * Because this polyfill can't know what schemes the UA or CDM actually support,
 * it assumes support for the historically-supported schemes of each well-known
 * key system.
 * @see https://wicg.github.io/encrypted-media-encryption-scheme/
 * @see https://github.com/w3c/encrypted-media/pull/457
 */
shaka.polyfill.EmeEncryptionScheme = class {
  /**
   * Installs the polyfill.  To avoid the possibility of extra user prompts,
   * this will shim EME so long as it exists, without checking support for
   * encryptionScheme upfront.  The support check will happen on-demand the
   * first time EME is used.
   */
  static install() {}
};
/**
 * A polyfill to add support for EncryptionScheme queries in MediaCapabilities.
 * Because this polyfill can't know what schemes the UA or CDM actually support,
 * it assumes support for the historically-supported schemes of each well-known
 * key system.
 * @see https://wicg.github.io/encrypted-media-encryption-scheme/
 * @see https://github.com/w3c/encrypted-media/pull/457
 */
shaka.polyfill.MCapEncryptionScheme = class {
  /**
   * Installs the polyfill.  To avoid the possibility of extra user prompts,
   * this will shim MC so long as it exists, without checking support for
   * encryptionScheme upfront.  The support check will happen on-demand the
   * first time MC is used.
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
 * A copy of the MediaCapabilities instance, to prevent Safari from
 * garbage-collecting the polyfilled method on it. We make it public and export
 * it to ensure that it is not stripped out by the compiler.
 * @type {MediaCapabilities}
 */
shaka.polyfill.MediaCapabilities.originalMcap;
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
 * @summary A polyfill to implement modern, standardized EME on top of Apple's
 * prefixed EME in Safari.
 */
shaka.polyfill.PatchedMediaKeysApple = class {
  /**
   * Installs the polyfill if needed.
   * @param {boolean=} enableUninstall enables uninstalling the polyfill
   */
  static install(enableUninstall) {}
  /**
   * Uninstalls the polyfill if needed and enabled.
   */
  static uninstall() {}
};
/**
 * @summary A polyfill to fix setServerCertificate implementation on
 * older platforms which claim to support modern EME.
 */
shaka.polyfill.PatchedMediaKeysCert = class {
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
 * @summary A polyfill to provide window.crypto.randomUUID in all browsers.
 */
shaka.polyfill.RandomUUID = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide Symbol.prototype.description in all browsers.
 * See: https://caniuse.com/mdn-javascript_builtins_symbol_description
 */
shaka.polyfill.Symbol = class {
  /**
   * Install the polyfill if needed.
   */
  static install() {}
};
/**
 * @summary A polyfill to provide missing TypedArray methods for older
 * browsers (indexOf/lastIndexOf/includes).
 */
shaka.polyfill.TypedArray = class {
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
 * @implements {shaka.extern.TextParser}
 */
shaka.text.TtmlTextParser = class {
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  setSequenceMode(sequenceMode) {}
  /**
   * @override
   */
  setManifestType(manifestType) {}
  /**
   * @override
   */
  parseMedia(data, time, uri, images) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.Mp4TtmlParser = class {
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  setSequenceMode(sequenceMode) {}
  /**
   * @override
   */
  setManifestType(manifestType) {}
  /**
   * @override
   */
  parseMedia(data, time, uri) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.VttTextParser = class {
  /** Constructs a VTT parser. */
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  setSequenceMode(sequenceMode) {}
  /**
   * @override
   */
  setManifestType(manifestType) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.TextParser}
 */
shaka.text.Mp4VttParser = class {
  constructor() {}
  /**
   * @override
   */
  parseInit(data) {}
  /**
   * @override
   */
  setSequenceMode(sequenceMode) {}
  /**
   * @override
   */
  setManifestType(manifestType) {}
  /**
   * @override
   */
  parseMedia(data, time) {}
};
/**
 * @implements {shaka.extern.Transmuxer}
 */
shaka.transmuxer.AacTransmuxer = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Check if the mime type and the content type is supported.
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {boolean}
   * @override
   */
  isSupported(mimeType, contentType) {}
  /**
   * @override
   */
  convertCodecs(contentType, mimeType) {}
  /**
   * @override
   */
  getOriginalMimeType() {}
  /**
   * @override
   */
  transmux(data, stream, reference, duration) {}
};
/**
 * @implements {shaka.extern.Transmuxer}
 */
shaka.transmuxer.Ac3Transmuxer = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Check if the mime type and the content type is supported.
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {boolean}
   * @override
   */
  isSupported(mimeType, contentType) {}
  /**
   * @override
   */
  convertCodecs(contentType, mimeType) {}
  /**
   * @override
   */
  getOriginalMimeType() {}
  /**
   * @override
   */
  transmux(data, stream, reference, duration) {}
};
/**
 * @implements {shaka.extern.Transmuxer}
 */
shaka.transmuxer.Ec3Transmuxer = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Check if the mime type and the content type is supported.
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {boolean}
   * @override
   */
  isSupported(mimeType, contentType) {}
  /**
   * @override
   */
  convertCodecs(contentType, mimeType) {}
  /**
   * @override
   */
  getOriginalMimeType() {}
  /**
   * @override
   */
  transmux(data, stream, reference, duration) {}
};
/**
 * @implements {shaka.extern.Transmuxer}
 */
shaka.transmuxer.Mp3Transmuxer = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Check if the mime type and the content type is supported.
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {boolean}
   * @override
   */
  isSupported(mimeType, contentType) {}
  /**
   * @override
   */
  convertCodecs(contentType, mimeType) {}
  /**
   * @override
   */
  getOriginalMimeType() {}
  /**
   * @override
   */
  transmux(data, stream, reference, duration) {}
};
/**
 * @implements {shaka.extern.Transmuxer}
 */
shaka.transmuxer.MpegTsTransmuxer = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Check if the mime type and the content type is supported.
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {boolean}
   * @override
   */
  isSupported(mimeType, contentType) {}
  /**
   * @override
   */
  convertCodecs(contentType, mimeType) {}
  /**
   * @override
   */
  getOriginalMimeType() {}
  /**
   * @override
   */
  transmux(data, stream, reference, duration, contentType) {}
};
/**
 * @implements {shaka.extern.Transmuxer}
 */
shaka.transmuxer.TsTransmuxer = class {
  /**
   * @param {string} mimeType
   */
  constructor(mimeType) {}
  /**
   * @override
   */
  destroy() {}
  /**
   * Check if the mime type and the content type is supported.
   * @param {string} mimeType
   * @param {string=} contentType
   * @return {boolean}
   * @override
   */
  isSupported(mimeType, contentType) {}
  /**
   * @override
   */
  convertCodecs(contentType, mimeType) {}
  /**
   * @override
   */
  getOriginalMimeType() {}
  /**
   * @override
   */
  transmux(data, stream, reference, duration, contentType) {}
};
/**
 * @summary A set of FairPlay utility functions. DEPRECATED: Please use
 *          shaka.drm.FairPlay instead.
 * @deprecated
 */
shaka.util.FairPlayUtils = class extends shaka.drm.FairPlay {
};
/**
 * A utility to combine streams across periods.
 * @implements {shaka.util.IReleasable}
 * @final
 */
shaka.util.PeriodCombiner = class {
  constructor() {}
  /**
   * @return {!Array<shaka.extern.Variant>}
   */
  getVariants() {}
  /**
   * @return {!Array<shaka.extern.Stream>}
   */
  getTextStreams() {}
  /**
   * @return {!Array<shaka.extern.Stream>}
   */
  getImageStreams() {}
  /**
   * Deletes a stream from matchedStreams because it is no longer needed
   * @param {?shaka.extern.Stream} stream
   * @param {string} periodId
   */
  deleteStream(stream, periodId) {}
  /**
   * @param {!Array<shaka.extern.Period>} periods
   * @param {boolean} isDynamic
   * @param {boolean=} isPatchUpdate
   * @return {!Promise}
   */
  combinePeriods(periods, isDynamic, isPatchUpdate) {}
  /**
   * @param {boolean} useOnce if true, stream will be used only once in period
   *   flattening algorithm.
   */
  setUseStreamOnce(useOnce) {}
};
