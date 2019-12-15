/**
 * @fileoverview Generated externs.  DO NOT EDIT!
 * @externs
 */

/** @const */
var shaka = {};
/** @const */
shaka.media = {};
/** @const */
shaka.hls = {};
/** @const */
shaka.offline = {};
/** @const */
shaka.util = {};
/** @const */
shaka.polyfill = {};
/** @const */
shaka.media.TextEngine = {};
/** @const */
shaka.util.StringUtils = {};
/** @const */
shaka.net = {};
/** @const */
shaka.util.Uint8ArrayUtils = {};
/** @const */
shaka.cast = {};
/** @const */
shaka.abr = {};
/** @const */
shaka.dash = {};
/** @const */
shaka.media.ManifestParser = {};

/**
 * An interface to standardize how objects are destroyed.
 * @interface
 */
shaka.util.IDestroyable = function() {};
/**
 * Destroys the object, releasing all resources and shutting down all
 * operations.  Returns a Promise which is resolved when destruction is
 * complete.  This Promise should never be rejected.
 * @return {!Promise}
 */
shaka.util.IDestroyable.prototype.destroy = function() {};
/**
 * @param {string} mimeType
 * @param {!shakaExtern.TextParserPlugin} plugin
 */
shaka.media.TextEngine.registerParser = function(mimeType, plugin) {};
/**
 * @param {string} mimeType
 */
shaka.media.TextEngine.unregisterParser = function(mimeType) {};
/**
 * Creates a cue using the best platform-specific interface available.
 * @param {number} startTime
 * @param {number} endTime
 * @param {string} payload
 * @return {TextTrackCue} or null if the parameters were invalid.
 */
shaka.media.TextEngine.makeCue = function(startTime, endTime, payload) {};
/**
 * Creates a new Error.
 * @param {shaka.util.Error.Severity} severity
 * @param {shaka.util.Error.Category} category
 * @param {shaka.util.Error.Code} code
 * @param {...*} var_args
 * @constructor
 * @struct
 * @extends {Error}
 */
shaka.util.Error = function(severity, category, code, var_args) {};
/**
 * @type {shaka.util.Error.Severity}
 */
shaka.util.Error.prototype.severity;
/**
 * @const {shaka.util.Error.Category}
 */
shaka.util.Error.prototype.category;
/**
 * @const {shaka.util.Error.Code}
 */
shaka.util.Error.prototype.code;
/**
 * @const {!Array.<*>}
 */
shaka.util.Error.prototype.data;
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
  'STORAGE': 9
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
  'UNKNOWN_DATA_URI_ENCODING': 1005,
  'REQUEST_FILTER_ERROR': 1006,
  'RESPONSE_FILTER_ERROR': 1007,
  'INVALID_TEXT_HEADER': 2000,
  'INVALID_TEXT_CUE': 2001,
  'UNABLE_TO_DETECT_ENCODING': 2003,
  'BAD_ENCODING': 2004,
  'INVALID_XML': 2005,
  'INVALID_MP4_TTML': 2007,
  'INVALID_MP4_VTT': 2008,
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
  'UNPLAYABLE_PERIOD': 4011,
  'RESTRICTIONS_CANNOT_BE_MET': 4012,
  'NO_PERIODS': 4014,
  'HLS_PLAYLIST_HEADER_MISSING': 4015,
  'INVALID_HLS_TAG': 4016,
  'HLS_INVALID_PLAYLIST_HIERARCHY': 4017,
  'DASH_DUPLICATE_REPRESENTATION_ID': 4018,
  'HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND': 4020,
  'HLS_COULD_NOT_GUESS_MIME_TYPE': 4021,
  'HLS_MASTER_PLAYLIST_NOT_PROVIDED': 4022,
  'HLS_REQUIRED_ATTRIBUTE_MISSING': 4023,
  'HLS_REQUIRED_TAG_MISSING': 4024,
  'HLS_COULD_NOT_GUESS_CODECS': 4025,
  'HLS_KEYFORMATS_NOT_SUPPORTED': 4026,
  'HLS_LIVE_CONTENT_NOT_SUPPORTED': 4029,
  'INVALID_STREAMS_CHOSEN': 5005,
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
  'LOAD_INTERRUPTED': 7000,
  'CAST_API_UNAVAILABLE': 8000,
  'NO_CAST_RECEIVERS': 8001,
  'ALREADY_CASTING': 8002,
  'UNEXPECTED_CAST_ERROR': 8003,
  'CAST_CANCELED_BY_USER': 8004,
  'CAST_CONNECTION_TIMED_OUT': 8005,
  'CAST_RECEIVER_APP_UNAVAILABLE': 8006,
  'STORAGE_NOT_SUPPORTED': 9000,
  'INDEXED_DB_ERROR': 9001,
  'OPERATION_ABORTED': 9002,
  'REQUESTED_ITEM_NOT_FOUND': 9003,
  'MALFORMED_OFFLINE_URI': 9004,
  'CANNOT_STORE_LIVE_OFFLINE': 9005,
  'STORE_ALREADY_IN_PROGRESS': 9006,
  'NO_INIT_DATA_FOR_OFFLINE': 9007,
  'LOCAL_PLAYER_INSTANCE_REQUIRED': 9008
};
/**
 * Creates an InitSegmentReference, which provides the location to an
 * initialization segment.
 * @param {function():!Array.<string>} uris
 *   A function that creates the URIs of the resource containing the segment.
 * @param {number} startByte The offset from the start of the resource to the
 *   start of the segment.
 * @param {?number} endByte The offset from the start of the resource to the
 *   end of the segment, inclusive. null indicates that the segment extends
 *   to the end of the resource.
 * @constructor
 * @struct
 */
shaka.media.InitSegmentReference = function(uris, startByte, endByte) {};
/**
 * Creates a SegmentReference, which provides the start time, end time, and
 * location to a media segment.
 * @param {number} position The segment's position within a particular Period.
 *   The following should hold true between any two SegmentReferences from the
 *   same Period, r1 and r2:
 *   IF r2.position > r1.position THEN
 *     [ (r2.startTime > r1.startTime) OR
 *       (r2.startTime == r1.startTime AND r2.endTime >= r1.endTime) ]
 * @param {number} startTime The segment's start time in seconds, relative to
 *   the start of a particular Period.
 * @param {number} endTime The segment's end time in seconds, relative to
 *   the start of a particular Period. The segment ends the instant before
 *   this time, so |endTime| must be strictly greater than |startTime|.
 * @param {function():!Array.<string>} uris
 *   A function that creates the URIs of the resource containing the segment.
 * @param {number} startByte The offset from the start of the resource to the
 *   start of the segment.
 * @param {?number} endByte The offset from the start of the resource to the
 *   end of the segment, inclusive. null indicates that the segment extends
 *   to the end of the resource.
 * @constructor
 * @struct
 */
shaka.media.SegmentReference = function(position, startTime, endTime, uris, startByte, endByte) {};
/**
 * Creates a PresentationTimeline.
 * @param {?number} presentationStartTime The wall-clock time, in seconds,
 *   when the presentation started or will start. Only required for live.
 * @param {number} presentationDelay The delay to give the presentation, in
 *   seconds.  Only required for live.
 * @see {shakaExtern.Manifest}
 * @see {@tutorial architecture}
 * @constructor
 * @struct
 */
shaka.media.PresentationTimeline = function(presentationStartTime, presentationDelay) {};
/**
 * @return {number} The presentation's duration in seconds.
 *   Infinity indicates that the presentation continues indefinitely.
 */
shaka.media.PresentationTimeline.prototype.getDuration = function() {};
/**
 * Sets the presentation's duration.
 * @param {number} duration The presentation's duration in seconds.
 *   Infinity indicates that the presentation continues indefinitely.
 */
shaka.media.PresentationTimeline.prototype.setDuration = function(duration) {};
/**
 * @return {?number} The presentation's start time in seconds.
 */
shaka.media.PresentationTimeline.prototype.getPresentationStartTime = function() {};
/**
 * Sets the clock offset, which is the the difference between the client's clock
 * and the server's clock, in milliseconds (i.e., serverTime = Date.now() +
 * clockOffset).
 * @param {number} offset The clock offset, in ms.
 */
shaka.media.PresentationTimeline.prototype.setClockOffset = function(offset) {};
/**
 * Sets the presentation's static flag.
 * @param {boolean} isStatic If true, the presentation is static, meaning all
 *   segments are available at once.
 */
shaka.media.PresentationTimeline.prototype.setStatic = function(isStatic) {};
/**
 * Gets the presentation's segment availability duration, which is the amount
 * of time, in seconds, that the start of a segment remains available after the
 * live-edge moves past the end of that segment. Infinity indicates that
 * segments remain available indefinitely. For example, if your live
 * presentation has a 5 minute DVR window and your segments are 10 seconds long
 * then the segment availability duration should be 4 minutes and 50 seconds.
 * @return {number} The presentation's segment availability duration.
 */
shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityDuration = function() {};
/**
 * Sets the presentation's segment availability duration. The segment
 * availability duration should only be set for live.
 * @param {number} segmentAvailabilityDuration The presentation's new segment
 *   availability duration in seconds.
 */
shaka.media.PresentationTimeline.prototype.setSegmentAvailabilityDuration = function(segmentAvailabilityDuration) {};
/**
 * Gives PresentationTimeline a Stream's segments so it can size and position
 * the segment availability window, and account for missing segment
 * information. This function should be called once for each Stream (no more,
 * no less).
 * @param {number} periodStartTime
 * @param {!Array.<!shaka.media.SegmentReference>} references
 */
shaka.media.PresentationTimeline.prototype.notifySegments = function(periodStartTime, references) {};
/**
 * Gives PresentationTimeline a Stream's maximum segment duration so it can
 * size and position the segment availability window. This function should be
 * called once for each Stream (no more, no less), but does not have to be
 * called if notifySegments() is called instead for a particular stream.
 * @param {number} maxSegmentDuration The maximum segment duration for a
 *   particular stream.
 */
shaka.media.PresentationTimeline.prototype.notifyMaxSegmentDuration = function(maxSegmentDuration) {};
/**
 * @return {boolean} True if the presentation is live; otherwise, return
 *   false.
 */
shaka.media.PresentationTimeline.prototype.isLive = function() {};
/**
 * @return {boolean} True if the presentation is in progress (meaning not live,
 *   but also not completely available); otherwise, return false.
 */
shaka.media.PresentationTimeline.prototype.isInProgress = function() {};
/**
 * Gets the presentation's current segment availability start time. Segments
 * ending at or before this time should be assumed to be unavailable.
 * @return {number} The current segment availability start time, in seconds,
 *   relative to the start of the presentation.
 */
shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityStart = function() {};
/**
 * Gets the presentation's current segment availability start time, offset by
 * the given amount.  This is used to ensure that we don't "fall" back out of
 * the availability window while we are buffering.
 * @param {number} offset The offset to add to the start time.
 * @return {number} The current segment availability start time, in seconds,
 *   relative to the start of the presentation.
 */
shaka.media.PresentationTimeline.prototype.getSafeAvailabilityStart = function(offset) {};
/**
 * Gets the presentation's current segment availability end time. Segments
 * starting after this time should be assumed to be unavailable.
 * @return {number} The current segment availability end time, in seconds,
 *   relative to the start of the presentation. Always returns the
 *   presentation's duration for video-on-demand.
 */
shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityEnd = function() {};
/**
 * Gets the seek range end.
 * @return {number}
 */
shaka.media.PresentationTimeline.prototype.getSeekRangeEnd = function() {};
/**
 * NetworkingEngine wraps all networking operations.  This accepts plugins that
 * handle the actual request.  A plugin is registered using registerScheme.
 * Each scheme has at most one plugin to handle the request.
 * @param {function(number, number)=} opt_onSegmentDownloaded Called
 *   when a segment is downloaded. Passed the duration, in milliseconds, that
 *   the request took; and the total number of bytes transferred.
 * @struct
 * @constructor
 * @implements {shaka.util.IDestroyable}
 */
shaka.net.NetworkingEngine = function(opt_onSegmentDownloaded) {};
/**
 * Request types.  Allows a filter to decide which requests to read/alter.
 * @enum {number}
 */
shaka.net.NetworkingEngine.RequestType = {
  'MANIFEST': 0,
  'SEGMENT': 1,
  'LICENSE': 2,
  'APP': 3
};
/**
 * Registers a scheme plugin.  This plugin will handle all requests with the
 * given scheme.  If a plugin with the same scheme already exists, it is
 * replaced.
 * @param {string} scheme
 * @param {shakaExtern.SchemePlugin} plugin
 */
shaka.net.NetworkingEngine.registerScheme = function(scheme, plugin) {};
/**
 * Removes a scheme plugin.
 * @param {string} scheme
 */
shaka.net.NetworkingEngine.unregisterScheme = function(scheme) {};
/**
 * Registers a new request filter.  All filters are applied in the order they
 * are registered.
 * @param {shakaExtern.RequestFilter} filter
 */
shaka.net.NetworkingEngine.prototype.registerRequestFilter = function(filter) {};
/**
 * Removes a request filter.
 * @param {shakaExtern.RequestFilter} filter
 */
shaka.net.NetworkingEngine.prototype.unregisterRequestFilter = function(filter) {};
/**
 * Clear all request filters.
 */
shaka.net.NetworkingEngine.prototype.clearAllRequestFilters = function() {};
/**
 * Registers a new response filter.  All filters are applied in the order they
 * are registered.
 * @param {shakaExtern.ResponseFilter} filter
 */
shaka.net.NetworkingEngine.prototype.registerResponseFilter = function(filter) {};
/**
 * Removes a response filter.
 * @param {shakaExtern.ResponseFilter} filter
 */
shaka.net.NetworkingEngine.prototype.unregisterResponseFilter = function(filter) {};
/**
 * Clear all response filters.
 */
shaka.net.NetworkingEngine.prototype.clearAllResponseFilters = function() {};
/**
 * @override
 */
shaka.net.NetworkingEngine.prototype.destroy = function() {};
/**
 * Makes a network request and returns the resulting data.
 * @param {shaka.net.NetworkingEngine.RequestType} type
 * @param {shakaExtern.Request} request
 * @return {!Promise.<shakaExtern.Response>}
 */
shaka.net.NetworkingEngine.prototype.request = function(type, request) {};
/**
 * Creates a string from the given buffer as UTF-8 encoding.
 * @param {?BufferSource} data
 * @return {string}
 * @throws {shaka.util.Error}
 */
shaka.util.StringUtils.fromUTF8 = function(data) {};
/**
 * Creates a string from the given buffer as UTF-16 encoding.
 * @param {?BufferSource} data
 * @param {boolean} littleEndian true to read little endian, false to read big.
 * @param {boolean=} opt_noThrow true to avoid throwing in cases where we may
 *     expect invalid input.  If noThrow is true and the data has an odd length,
 *     it will be truncated.
 * @return {string}
 * @throws {shaka.util.Error}
 */
shaka.util.StringUtils.fromUTF16 = function(data, littleEndian, opt_noThrow) {};
/**
 * Creates a string from the given buffer, auto-detecting the encoding that is
 * being used.  If it cannot detect the encoding, it will throw an exception.
 * @param {?BufferSource} data
 * @return {string}
 * @throws {shaka.util.Error}
 */
shaka.util.StringUtils.fromBytesAutoDetect = function(data) {};
/**
 * Creates a ArrayBuffer from the given string, converting to UTF-8 encoding.
 * @param {string} str
 * @return {!ArrayBuffer}
 */
shaka.util.StringUtils.toUTF8 = function(str) {};
/**
 * Convert a Uint8Array to a base64 string.  The output will always use the
 * alternate encoding/alphabet also known as "base64url".
 * @param {!Uint8Array} arr
 * @param {boolean=} opt_padding If true, pad the output with equals signs.
 *   Defaults to true.
 * @return {string}
 */
shaka.util.Uint8ArrayUtils.toBase64 = function(arr, opt_padding) {};
/**
 * Convert a base64 string to a Uint8Array.  Accepts either the standard
 * alphabet or the alternate "base64url" alphabet.
 * @param {string} str
 * @return {!Uint8Array}
 */
shaka.util.Uint8ArrayUtils.fromBase64 = function(str) {};
/**
 * Convert a hex string to a Uint8Array.
 * @param {string} str
 * @return {!Uint8Array}
 */
shaka.util.Uint8ArrayUtils.fromHex = function(str) {};
/**
 * Convert a Uint8Array to a hex string.
 * @param {!Uint8Array} arr
 * @return {string}
 */
shaka.util.Uint8ArrayUtils.toHex = function(arr) {};
/**
 * Compare two Uint8Arrays for equality.
 * @param {Uint8Array} arr1
 * @param {Uint8Array} arr2
 * @return {boolean}
 */
shaka.util.Uint8ArrayUtils.equal = function(arr1, arr2) {};
/**
 * Concatenate Uint8Arrays.
 * @param {...Uint8Array} var_args
 * @return {Uint8Array}
 */
shaka.util.Uint8ArrayUtils.concat = function(var_args) {};
/**
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
 * After the initial choice (in chooseStreams), this class will call
 * switchCallback() when there is a better choice.  switchCallback() will not
 * be called more than once per
 * ({@link shaka.abr.SimpleAbrManager.SWITCH_INTERVAL_MS}).
 * </p>
 * <p>
 * This does not adapt for text streams, it will always select the first one.
 * </p>
 * @constructor
 * @struct
 * @implements {shakaExtern.AbrManager}
 */
shaka.abr.SimpleAbrManager = function() {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.stop = function() {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.init = function(switchCallback) {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.chooseStreams = function(mediaTypesToUpdate) {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.enable = function() {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.disable = function() {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.segmentDownloaded = function(deltaTimeMs, numBytes) {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.getBandwidthEstimate = function() {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.setDefaultEstimate = function(estimate) {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.setRestrictions = function(restrictions) {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.setVariants = function(variants) {};
/**
 * @override
 */
shaka.abr.SimpleAbrManager.prototype.setTextStreams = function(streams) {};
/**
 * Registers a manifest parser by file extension.
 * @param {string} extension The file extension of the manifest.
 * @param {shakaExtern.ManifestParser.Factory} parserFactory The factory
 *   used to create parser instances.
 */
shaka.media.ManifestParser.registerParserByExtension = function(extension, parserFactory) {};
/**
 * Registers a manifest parser by MIME type.
 * @param {string} mimeType The MIME type of the manifest.
 * @param {shakaExtern.ManifestParser.Factory} parserFactory The factory
 *   used to create parser instances.
 */
shaka.media.ManifestParser.registerParserByMime = function(mimeType, parserFactory) {};
/**
 * Creates a DataViewReader, which abstracts a DataView object.
 * @param {!DataView} dataView The DataView.
 * @param {shaka.util.DataViewReader.Endianness} endianness The endianness.
 * @struct
 * @constructor
 */
shaka.util.DataViewReader = function(dataView, endianness) {};
/**
 * Endianness.
 * @enum {number}
 */
shaka.util.DataViewReader.Endianness = {
  BIG_ENDIAN: 0,
  LITTLE_ENDIAN: 1
};
/**
 * @return {boolean} True if the reader has more data, false otherwise.
 */
shaka.util.DataViewReader.prototype.hasMoreData = function() {};
/**
 * Gets the current byte position.
 * @return {number}
 */
shaka.util.DataViewReader.prototype.getPosition = function() {};
/**
 * Gets the byte length of the DataView.
 * @return {number}
 */
shaka.util.DataViewReader.prototype.getLength = function() {};
/**
 * Reads an unsigned 8 bit integer, and advances the reader.
 * @return {number} The integer.
 * @throws {shaka.util.Error} when reading past the end of the data view.
 */
shaka.util.DataViewReader.prototype.readUint8 = function() {};
/**
 * Reads an unsigned 16 bit integer, and advances the reader.
 * @return {number} The integer.
 * @throws {shaka.util.Error} when reading past the end of the data view.
 */
shaka.util.DataViewReader.prototype.readUint16 = function() {};
/**
 * Reads an unsigned 32 bit integer, and advances the reader.
 * @return {number} The integer.
 * @throws {shaka.util.Error} when reading past the end of the data view.
 */
shaka.util.DataViewReader.prototype.readUint32 = function() {};
/**
 * Reads a signed 32 bit integer, and advances the reader.
 * @return {number} The integer.
 * @throws {shaka.util.Error} when reading past the end of the data view.
 */
shaka.util.DataViewReader.prototype.readInt32 = function() {};
/**
 * Reads an unsigned 64 bit integer, and advances the reader.
 * @return {number} The integer.
 * @throws {shaka.util.Error} when reading past the end of the data view or
 *   when reading an integer too large to store accurately in JavaScript.
 */
shaka.util.DataViewReader.prototype.readUint64 = function() {};
/**
 * Reads the specified number of raw bytes.
 * @param {number} bytes The number of bytes to read.
 * @return {!Uint8Array}
 * @throws {shaka.util.Error} when reading past the end of the data view.
 */
shaka.util.DataViewReader.prototype.readBytes = function(bytes) {};
/**
 * Skips the specified number of bytes.
 * @param {number} bytes The number of bytes to skip.
 * @throws {shaka.util.Error} when skipping past the end of the data view.
 */
shaka.util.DataViewReader.prototype.skip = function(bytes) {};
/**
 * Keeps reading until it reaches a byte that equals to zero.  The text is
 * assumed to be UTF-8.
 * @return {string}
 */
shaka.util.DataViewReader.prototype.readTerminatedString = function() {};
/**
 * Create a new MP4 Parser
 * @struct
 * @constructor
 */
shaka.util.Mp4Parser = function() {};
/**
 * @typedef {{
 *    parser: !shaka.util.Mp4Parser,
 *    start: number,
 *    size: number,
 *    version: ?number,
 *    flags: ?number,
 *    reader: !shaka.util.DataViewReader
 * }}
 * @property {!shaka.util.Mp4Parser} parser
 *    The parser that parsed this box. The parser can be used to parse child
 *    boxes where the configuration of the current parser is needed to parsed
 *    other boxes.
 * @property {number} start
 *    The start of this box (before the header) in the original buffer. This
 *    start position is the absolute position.
 * @property {number} size
 *    The size of this box (including the header).
 * @property {?number} version
 *    The version for a full box, null for basic boxes.
 * @property {?number} flags
 *    The flags for a full box, null for basic boxes.
 * @property {!shaka.util.DataViewReader} reader
 *    The reader for this box is only for this box. Reading or not reading to
 *    the end will have no affect on the parser reading other sibling boxes.
 */
shaka.util.Mp4Parser.ParsedBox;
/**
 * @typedef {function(!shaka.util.Mp4Parser.ParsedBox)}
 */
shaka.util.Mp4Parser.CallbackType;
/**
 * Delcare a box type as a Box.
 * @param {string} type
 * @param {!shaka.util.Mp4Parser.CallbackType} definition
 * @return {!shaka.util.Mp4Parser}
 */
shaka.util.Mp4Parser.prototype.box = function(type, definition) {};
/**
 * Declare a box type as a Full Box.
 * @param {string} type
 * @param {!shaka.util.Mp4Parser.CallbackType} definition
 * @return {!shaka.util.Mp4Parser}
 */
shaka.util.Mp4Parser.prototype.fullBox = function(type, definition) {};
/**
 * Parse the given data using the added callbacks.
 * @param {!ArrayBuffer} data
 */
shaka.util.Mp4Parser.prototype.parse = function(data) {};
/**
 * Parse the next box on the current level.
 * @param {number} absStart The absolute start position in the original
 *    byte array
 * @param {!shaka.util.DataViewReader} reader
 */
shaka.util.Mp4Parser.prototype.parseNext = function(absStart, reader) {};
/**
 * A callback that tells the Mp4 parser to treat the body of a box as a series
 * of boxes. The number of boxes is limited by the size of the parent box.
 * @param {!shaka.util.Mp4Parser.ParsedBox} box
 */
shaka.util.Mp4Parser.children = function(box) {};
/**
 * A callback that tells the Mp4 parser to treat the body of a box as a sample
 * description. A sample description box has a fixed number of children. The
 * number of children is represented by a 4 byte unsigned integer. Each child
 * is a box.
 * @param {!shaka.util.Mp4Parser.ParsedBox} box
 */
shaka.util.Mp4Parser.sampleDescription = function(box) {};
/**
 * Create a callback that tells the Mp4 parser to treat the body of a box as a
 * binary blob and how to handle it.
 * @param {!function(!Uint8Array)} callback
 * @return {!shaka.util.Mp4Parser.CallbackType}
 */
shaka.util.Mp4Parser.allData = function(callback) {};
/**
 * A work-alike for EventTarget.  Only DOM elements may be true EventTargets,
 * but this can be used as a base class to provide event dispatch to non-DOM
 * classes.  Only FakeEvents should be dispatched.
 * @struct
 * @constructor
 * @implements {EventTarget}
 */
shaka.util.FakeEventTarget = function() {};
/**
 * These are the listener types defined in the closure extern for EventTarget.
 * @typedef {EventListener|function(!Event):(boolean|undefined)}
 */
shaka.util.FakeEventTarget.ListenerType;
/**
 * Add an event listener to this object.
 * @param {string} type The event type to listen for.
 * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
 *   listener object to invoke.
 * @param {(!AddEventListenerOptions|boolean)=} opt_options Ignored.
 * @override
 */
shaka.util.FakeEventTarget.prototype.addEventListener = function(type, listener, opt_options) {};
/**
 * Remove an event listener from this object.
 * @param {string} type The event type for which you wish to remove a listener.
 * @param {shaka.util.FakeEventTarget.ListenerType} listener The callback or
 *   listener object to remove.
 * @param {(EventListenerOptions|boolean)=} opt_options Ignored.
 * @override
 */
shaka.util.FakeEventTarget.prototype.removeEventListener = function(type, listener, opt_options) {};
/**
 * Dispatch an event from this object.
 * @param {!Event} event The event to be dispatched from this object.
 * @return {boolean} True if the default action was prevented.
 * @override
 */
shaka.util.FakeEventTarget.prototype.dispatchEvent = function(event) {};
/**
 * Construct a Player.
 * @param {!HTMLMediaElement} video Any existing TextTracks attached to this
 *   element that were not created by Shaka will be disabled.  A new TextTrack
 *   may be created to display captions or subtitles.
 * @param {function(shaka.Player)=} opt_dependencyInjector Optional callback
 *   which is called to inject mocks into the Player. Used for testing.
 * @constructor
 * @struct
 * @implements {shaka.util.IDestroyable}
 * @extends {shaka.util.FakeEventTarget}
 */
shaka.Player = function(video, opt_dependencyInjector) {};
/**
 * After destruction, a Player object cannot be used again.
 * @override
 */
shaka.Player.prototype.destroy = function() {};
/**
 * @const {string}
 */
shaka.Player.version;
/**
 * Registers a plugin callback that will be called with support().  The
 * callback will return the value that will be stored in the return value from
 * support().
 * @param {string} name
 * @param {function():*} callback
 */
shaka.Player.registerSupportPlugin = function(name, callback) {};
/**
 * Return whether the browser provides basic support. If this returns false,
 * Shaka Player cannot be used at all. In this case, do not construct a Player
 * instance and do not use the library.
 * @return {boolean}
 */
shaka.Player.isBrowserSupported = function() {};
/**
 * Probes the browser to determine what features are supported.  This makes a
 * number of requests to EME/MSE/etc which may result in user prompts.  This
 * should only be used for diagnostics.
 * NOTE: This may show a request to the user for permission.
 * @see https://goo.gl/ovYLvl
 * @return {!Promise.<shakaExtern.SupportType>}
 */
shaka.Player.probeSupport = function() {};
/**
 * Load a manifest.
 * @param {string} manifestUri
 * @param {number=} opt_startTime Optional start time, in seconds, to begin
 *   playback.  Defaults to 0 for VOD and to the live edge for live.
 * @param {shakaExtern.ManifestParser.Factory=} opt_manifestParserFactory
 *   Optional manifest parser factory to override auto-detection or use an
 *   unregistered parser.
 * @return {!Promise} Resolved when the manifest has been loaded and playback
 *   has begun; rejected when an error occurs or the call was interrupted by
 *   destroy(), unload() or another call to load().
 */
shaka.Player.prototype.load = function(manifestUri, opt_startTime, opt_manifestParserFactory) {};
/**
 * Configure the Player instance.
 * The config object passed in need not be complete.  It will be merged with
 * the existing Player configuration.
 * Config keys and types will be checked.  If any problems with the config
 * object are found, errors will be reported through logs.
 * @param {!Object} config This should follow the form of
 *   {@link shakaExtern.PlayerConfiguration}, but you may omit any field you do
 *   not wish to change.
 */
shaka.Player.prototype.configure = function(config) {};
/**
 * Return a copy of the current configuration.  Modifications of the returned
 * value will not affect the Player's active configuration.  You must call
 * player.configure() to make changes.
 * @return {shakaExtern.PlayerConfiguration}
 */
shaka.Player.prototype.getConfiguration = function() {};
/**
 * Reset configuration to default.
 */
shaka.Player.prototype.resetConfiguration = function() {};
/**
 * @return {HTMLMediaElement} A reference to the HTML Media Element passed
 *     in during initialization.
 */
shaka.Player.prototype.getMediaElement = function() {};
/**
 * @return {shaka.net.NetworkingEngine} A reference to the Player's networking
 *     engine.  Applications may use this to make requests through Shaka's
 *     networking plugins.
 */
shaka.Player.prototype.getNetworkingEngine = function() {};
/**
 * @return {?string} If a manifest is loaded, returns the manifest URI given in
 *   the last call to load().  Otherwise, returns null.
 */
shaka.Player.prototype.getManifestUri = function() {};
/**
 * @return {boolean} True if the current stream is live.  False otherwise.
 */
shaka.Player.prototype.isLive = function() {};
/**
 * @return {boolean} True if the current stream is in-progress VOD.
 *   False otherwise.
 */
shaka.Player.prototype.isInProgress = function() {};
/**
 * @return {boolean} True for audio-only content.  False otherwise.
 */
shaka.Player.prototype.isAudioOnly = function() {};
/**
 * Get the seekable range for the current stream.
 * @return {{start: number, end: number}}
 */
shaka.Player.prototype.seekRange = function() {};
/**
 * Get the key system currently being used by EME.  This returns the empty
 * string if not using EME.
 * @return {string}
 */
shaka.Player.prototype.keySystem = function() {};
/**
 * Get the DrmInfo used to initialize EME.  This returns null when not using
 * EME.
 * @return {?shakaExtern.DrmInfo}
 */
shaka.Player.prototype.drmInfo = function() {};
/**
 * The next known expiration time for any EME session.  If the sessions never
 * expire, or there are no EME sessions, this returns Infinity.
 * @return {number}
 */
shaka.Player.prototype.getExpiration = function() {};
/**
 * @return {boolean} True if the Player is in a buffering state.
 */
shaka.Player.prototype.isBuffering = function() {};
/**
 * Unload the current manifest and make the Player available for re-use.
 * @return {!Promise} Resolved when streaming has stopped and the previous
 *     content, if any, has been unloaded.
 */
shaka.Player.prototype.unload = function() {};
/**
 * Gets the current effective playback rate.  If using trick play, it will
 * return the current trick play rate; otherwise, it will return the video
 * playback rate.
 * @return {number}
 */
shaka.Player.prototype.getPlaybackRate = function() {};
/**
 * Skip through the content without playing.  Simulated using repeated seeks.
 * Trick play will be canceled automatically if the playhead hits the beginning
 * or end of the seekable range for the content.
 * @param {number} rate The playback rate to simulate.  For example, a rate of
 *     2.5 would result in 2.5 seconds of content being skipped every second.
 *     To trick-play backward, use a negative rate.
 */
shaka.Player.prototype.trickPlay = function(rate) {};
/**
 * Cancel trick-play.
 */
shaka.Player.prototype.cancelTrickPlay = function() {};
/**
 * Return a list of variant and text tracks available for the current Period.
 * If there are multiple Periods, then you must seek to the Period before
 * being able to switch.
 * @return {!Array.<shakaExtern.Track>}
 * @deprecated Use getVariantTracks() or getTextTracks()
 */
shaka.Player.prototype.getTracks = function() {};
/**
 * Select a specific track.  For variant tracks, this disables adaptation.
 * Note that AdaptationEvents are not fired for manual track selections.
 * @param {shakaExtern.Track} track
 * @param {boolean=} opt_clearBuffer
 * @deprecated Use selectVariantTrack() or selectTextTrack()
 */
shaka.Player.prototype.selectTrack = function(track, opt_clearBuffer) {};
/**
 * Return a list of variant tracks available for the current
 * Period.  If there are multiple Periods, then you must seek to the Period
 * before being able to switch.
 * @return {!Array.<shakaExtern.Track>}
 */
shaka.Player.prototype.getVariantTracks = function() {};
/**
 * Return a list of text tracks available for the current
 * Period.  If there are multiple Periods, then you must seek to the Period
 * before being able to switch.
 * @return {!Array.<shakaExtern.Track>}
 */
shaka.Player.prototype.getTextTracks = function() {};
/**
 * Select a specific text track. Note that AdaptationEvents are not
 * fired for manual track selections.
 * @param {shakaExtern.Track} track
 */
shaka.Player.prototype.selectTextTrack = function(track) {};
/**
 * Select a specific track. Note that AdaptationEvents are not fired for manual
 * track selections.
 * @param {shakaExtern.Track} track
 * @param {boolean=} opt_clearBuffer
 */
shaka.Player.prototype.selectVariantTrack = function(track, opt_clearBuffer) {};
/**
 * Return a list of audio languages available for the current
 * Period.
 * @return {!Array.<string>}
 */
shaka.Player.prototype.getAudioLanguages = function() {};
/**
 * Return a list of text languages available for the current
 * Period.
 * @return {!Array.<string>}
 */
shaka.Player.prototype.getTextLanguages = function() {};
/**
 * Sets currentAudioLanguage to the selected language and chooses
 * new variant in that language if need be.
 * @param {!string} language
 * @param {string=} opt_role
 */
shaka.Player.prototype.selectAudioLanguage = function(language, opt_role) {};
/**
 * Sets currentTextLanguage to the selected language and chooses
 * new text stream in that language if need be.
 * @param {!string} language
 * @param {string=} opt_role
 */
shaka.Player.prototype.selectTextLanguage = function(language, opt_role) {};
/**
 * @return {boolean} True if the current text track is visible.
 */
shaka.Player.prototype.isTextTrackVisible = function() {};
/**
 * Set the visibility of the current text track, if any.
 * @param {boolean} on
 */
shaka.Player.prototype.setTextTrackVisibility = function(on) {};
/**
 * Returns current playhead time as a Date.
 * @return {Date}
 */
shaka.Player.prototype.getPlayheadTimeAsDate = function() {};
/**
 * Return playback and adaptation stats.
 * @return {shakaExtern.Stats}
 */
shaka.Player.prototype.getStats = function() {};
/**
 * Adds the given text track to the current Period.  Load() must resolve before
 * calling.  The current Period or the presentation must have a duration.  This
 * returns a Promise that will resolve when the track can be switched to and
 * will resolve with the track that was created.
 * @param {string} uri
 * @param {string} language
 * @param {string} kind
 * @param {string} mime
 * @param {string=} opt_codec
 * @param {string=} opt_label
 * @return {!Promise.<shakaExtern.Track>}
 */
shaka.Player.prototype.addTextTrack = function(uri, language, kind, mime, opt_codec, opt_label) {};
/**
 * Set the maximum resolution that the platform's hardware can handle.
 * This will be called automatically by shaka.cast.CastReceiver to enforce
 * limitations of the Chromecast hardware.
 * @param {number} width
 * @param {number} height
 */
shaka.Player.prototype.setMaxHardwareResolution = function(width, height) {};
/**
 * Creates a SegmentIndex.
 * @param {!Array.<!shaka.media.SegmentReference>} references The list of
 *   SegmentReferences, which must be sorted first by their start times
 *   (ascending) and second by their end times (ascending), and have
 *   continuous, increasing positions.
 * @constructor
 * @struct
 * @implements {shaka.util.IDestroyable}
 */
shaka.media.SegmentIndex = function(references) {};
/**
 * @override
 */
shaka.media.SegmentIndex.prototype.destroy = function() {};
/**
 * Finds the position of the segment for the given time, in seconds, relative
 * to the start of a particular Period. Returns the position of the segment
 * with the largest end time if more than one segment is known for the given
 * time.
 * @param {number} time
 * @return {?number} The position of the segment, or null
 *   if the position of the segment could not be determined.
 */
shaka.media.SegmentIndex.prototype.find = function(time) {};
/**
 * Gets the SegmentReference for the segment at the given position.
 * @param {number} position The position of the segment.
 * @return {shaka.media.SegmentReference} The SegmentReference, or null if
 *   no such SegmentReference exists.
 */
shaka.media.SegmentIndex.prototype.get = function(position) {};
/**
 * Merges the given SegmentReferences.  Supports extending the original
 * references only.  Will not replace old references or interleave new ones.
 * @param {!Array.<!shaka.media.SegmentReference>} references The list of
 *   SegmentReferences, which must be sorted first by their start times
 *   (ascending) and second by their end times (ascending), and have
 *   continuous, increasing positions.
 */
shaka.media.SegmentIndex.prototype.merge = function(references) {};
/**
 * Removes all SegmentReferences that end before the given time.
 * @param {number} time The time in seconds.
 */
shaka.media.SegmentIndex.prototype.evict = function(time) {};
/**
 * @namespace
 * @summary A networking plugin to handle data URIs.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs
 * @param {string} uri
 * @param {shakaExtern.Request} request
 * @return {!Promise.<shakaExtern.Response>}
 */
shaka.net.DataUriPlugin = function(uri, request) {};
/**
 * Creates a new HLS parser.
 * @struct
 * @constructor
 * @implements {shakaExtern.ManifestParser}
 */
shaka.hls.HlsParser = function() {};
/**
 * @override
 */
shaka.hls.HlsParser.prototype.configure = function(config) {};
/**
 * @override
 */
shaka.hls.HlsParser.prototype.start = function(uri, playerInterface) {};
/**
 * @override
 */
shaka.hls.HlsParser.prototype.stop = function() {};
/**
 * @override
 */
shaka.hls.HlsParser.prototype.update = function() {};
/**
 * @override
 */
shaka.hls.HlsParser.prototype.onExpirationUpdated = function(sessionId, expiration) {};
/**
 * @namespace
 * @summary A plugin that handles requests for offline content.
 * @param {string} uri
 * @param {shakaExtern.Request} request
 * @return {!Promise.<shakaExtern.Response>}
 */
shaka.offline.OfflineScheme = function(uri, request) {};
/**
 * Install all polyfills.
 */
shaka.polyfill.installAll = function() {};
/**
 * Registers a new polyfill to be installed.
 * @param {function()} polyfill
 */
shaka.polyfill.register = function(polyfill) {};
/**
 * This manages persistent offline data including storage, listing, and deleting
 * stored manifests.  Playback of offline manifests are done using Player
 * using the special URI (e.g. 'offline:12').
 * First, check support() to see if offline is supported by the platform.
 * Second, configure() the storage object with callbacks to your application.
 * Third, call store(), remove(), or list() as needed.
 * When done, call destroy().
 * @param {shaka.Player} player
 *   The player instance to pull configuration data from.
 * @struct
 * @constructor
 * @implements {shaka.util.IDestroyable}
 */
shaka.offline.Storage = function(player) {};
/**
 * Gets whether offline storage is supported.  Returns true if offline storage
 * is supported for clear content.  Support for offline storage of encrypted
 * content will not be determined until storage is attempted.
 * @return {boolean}
 */
shaka.offline.Storage.support = function() {};
/**
 * @override
 */
shaka.offline.Storage.prototype.destroy = function() {};
/**
 * Sets configuration values for Storage.  This is not associated with
 * Player.configure and will not change Player.
 * There are two important callbacks configured here: one for download progress,
 * and one to decide which tracks to store.
 * The default track selection callback will store the largest SD video track.
 * Provide your own callback to choose the tracks you want to store.
 * @param {shakaExtern.OfflineConfiguration} config
 */
shaka.offline.Storage.prototype.configure = function(config) {};
/**
 * Stores the given manifest.  If the content is encrypted, and encrypted
 * content cannot be stored on this platform, the Promise will be rejected with
 * error code 6001, REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE.
 * @param {string} manifestUri The URI of the manifest to store.
 * @param {!Object} appMetadata An arbitrary object from the application that
 *   will be stored along-side the offline content.  Use this for any
 *   application-specific metadata you need associated with the stored content.
 *   For details on the data types that can be stored here, please refer to
 *   https://goo.gl/h62coS
 * @param {!shakaExtern.ManifestParser.Factory=} opt_manifestParserFactory
 * @return {!Promise.<shakaExtern.StoredContent>}  A Promise to a structure
 *   representing what was stored.  The "offlineUri" member is the URI that
 *   should be given to Player.load() to play this piece of content offline.
 *   The "appMetadata" member is the appMetadata argument you passed to store().
 */
shaka.offline.Storage.prototype.store = function(manifestUri, appMetadata, opt_manifestParserFactory) {};
/**
 * Removes the given stored content.
 * @param {shakaExtern.StoredContent} content
 * @return {!Promise}
 */
shaka.offline.Storage.prototype.remove = function(content) {};
/**
 * Lists all the stored content available.
 * @return {!Promise.<!Array.<shakaExtern.StoredContent>>}  A Promise to an
 *   array of structures representing all stored content.  The "offlineUri"
 *   member of the structure is the URI that should be given to Player.load()
 *   to play this piece of content offline.  The "appMetadata" member is the
 *   appMetadata argument you passed to store().
 */
shaka.offline.Storage.prototype.list = function() {};
/**
 * A proxy to switch between local and remote playback for Chromecast in a way
 * that is transparent to the app's controls.
 * @constructor
 * @struct
 * @param {!HTMLMediaElement} video The local video element associated with the
 *   local Player instance.
 * @param {!shaka.Player} player A local Player instance.
 * @param {string} receiverAppId The ID of the cast receiver application.
 * @implements {shaka.util.IDestroyable}
 * @extends {shaka.util.FakeEventTarget}
 */
shaka.cast.CastProxy = function(video, player, receiverAppId) {};
/**
 * Destroys the proxy and the underlying local Player.
 * @param {boolean=} opt_forceDisconnect If true, force the receiver app to shut
 *   down by disconnecting.  Does nothing if not connected.
 * @override
 */
shaka.cast.CastProxy.prototype.destroy = function(opt_forceDisconnect) {};
/**
 * Get a proxy for the video element that delegates to local and remote video
 * elements as appropriate.
 * @suppress {invalidCasts} to cast proxy Objects to unrelated types
 * @return {HTMLMediaElement}
 */
shaka.cast.CastProxy.prototype.getVideo = function() {};
/**
 * Get a proxy for the Player that delegates to local and remote Player objects
 * as appropriate.
 * @suppress {invalidCasts} to cast proxy Objects to unrelated types
 * @return {shaka.Player}
 */
shaka.cast.CastProxy.prototype.getPlayer = function() {};
/**
 * @return {boolean} True if the cast API is available and there are receivers.
 */
shaka.cast.CastProxy.prototype.canCast = function() {};
/**
 * @return {boolean} True if we are currently casting.
 */
shaka.cast.CastProxy.prototype.isCasting = function() {};
/**
 * @return {string} The name of the Cast receiver device, if isCasting().
 */
shaka.cast.CastProxy.prototype.receiverName = function() {};
/**
 * @return {!Promise} Resolved when connected to a receiver.  Rejected if the
 *   connection fails or is canceled by the user.
 */
shaka.cast.CastProxy.prototype.cast = function() {};
/**
 * Set application-specific data.
 * @param {Object} appData Application-specific data to relay to the receiver.
 */
shaka.cast.CastProxy.prototype.setAppData = function(appData) {};
/**
 * Show a dialog where user can choose to disconnect from the cast connection.
 */
shaka.cast.CastProxy.prototype.suggestDisconnect = function() {};
/**
 * Force the receiver app to shut down by disconnecting.
 */
shaka.cast.CastProxy.prototype.forceDisconnect = function() {};
/**
 * A receiver to communicate between the Chromecast-hosted player and the
 * sender application.
 * @constructor
 * @struct
 * @param {!HTMLMediaElement} video The local video element associated with the
 *   local Player instance.
 * @param {!shaka.Player} player A local Player instance.
 * @param {function(Object)=} opt_appDataCallback A callback to handle
 *   application-specific data passed from the sender.
  * @param {function(string):string=} opt_contentIdCallback A callback to
 *   retrieve manifest URI from the provided content id.
 * @implements {shaka.util.IDestroyable}
 * @extends {shaka.util.FakeEventTarget}
 */
shaka.cast.CastReceiver = function(video, player, opt_appDataCallback, opt_contentIdCallback) {};
/**
 * @return {boolean} True if the cast API is available and there are receivers.
 */
shaka.cast.CastReceiver.prototype.isConnected = function() {};
/**
 * @return {boolean} True if the receiver is not currently doing loading or
 *   playing anything.
 */
shaka.cast.CastReceiver.prototype.isIdle = function() {};
/**
 * Destroys the underlying Player, then terminates the cast receiver app.
 * @override
 */
shaka.cast.CastReceiver.prototype.destroy = function() {};
/**
 * Creates a new DASH parser.
 * @struct
 * @constructor
 * @implements {shakaExtern.ManifestParser}
 */
shaka.dash.DashParser = function() {};
/**
 * @override
 */
shaka.dash.DashParser.prototype.configure = function(config) {};
/**
 * @override
 */
shaka.dash.DashParser.prototype.start = function(uri, playerInterface) {};
/**
 * @override
 */
shaka.dash.DashParser.prototype.stop = function() {};
/**
 * @override
 */
shaka.dash.DashParser.prototype.update = function() {};
/**
 * @override
 */
shaka.dash.DashParser.prototype.onExpirationUpdated = function(sessionId, expiration) {};
/**
 * @namespace
 * @summary A networking plugin to handle http and https URIs via XHR.
 * @param {string} uri
 * @param {shakaExtern.Request} request
 * @return {!Promise.<shakaExtern.Response>}
 */
shaka.net.HttpPlugin = function(uri, request) {};
