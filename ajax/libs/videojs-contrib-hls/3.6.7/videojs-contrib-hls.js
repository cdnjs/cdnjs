/**
 * videojs-contrib-hls
 * @version 3.6.7
 * @copyright 2016 Brightcove, Inc
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsContribHls = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file ad-cue-tags.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

/**
 * Searches for an ad cue that overlaps with the given mediaTime
 */
var findAdCue = function findAdCue(track, mediaTime) {
  var cues = track.cues;

  for (var i = 0; i < cues.length; i++) {
    var cue = cues[i];

    if (mediaTime >= cue.adStartTime && mediaTime <= cue.adEndTime) {
      return cue;
    }
  }
  return null;
};

var updateAdCues = function updateAdCues(media, track) {
  var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  if (!media.segments) {
    return;
  }

  var mediaTime = offset;
  var cue = undefined;

  for (var i = 0; i < media.segments.length; i++) {
    var segment = media.segments[i];

    if (!cue) {
      // Since the cues will span for at least the segment duration, adding a fudge
      // factor of half segment duration will prevent duplicate cues from being
      // created when timing info is not exact (e.g. cue start time initialized
      // at 10.006677, but next call mediaTime is 10.003332 )
      cue = findAdCue(track, mediaTime + segment.duration / 2);
    }

    if (cue) {
      if ('cueIn' in segment) {
        // Found a CUE-IN so end the cue
        cue.endTime = mediaTime;
        cue.adEndTime = mediaTime;
        mediaTime += segment.duration;
        cue = null;
        continue;
      }

      if (mediaTime < cue.endTime) {
        // Already processed this mediaTime for this cue
        mediaTime += segment.duration;
        continue;
      }

      // otherwise extend cue until a CUE-IN is found
      cue.endTime += segment.duration;
    } else {
      if ('cueOut' in segment) {
        cue = new _globalWindow2['default'].VTTCue(mediaTime, mediaTime + segment.duration, segment.cueOut);
        cue.adStartTime = mediaTime;
        // Assumes tag format to be
        // #EXT-X-CUE-OUT:30
        cue.adEndTime = mediaTime + parseFloat(segment.cueOut);
        track.addCue(cue);
      }

      if ('cueOutCont' in segment) {
        // Entered into the middle of an ad cue
        var adOffset = undefined;
        var adTotal = undefined;

        // Assumes tag formate to be
        // #EXT-X-CUE-OUT-CONT:10/30

        var _segment$cueOutCont$split$map = segment.cueOutCont.split('/').map(parseFloat);

        var _segment$cueOutCont$split$map2 = _slicedToArray(_segment$cueOutCont$split$map, 2);

        adOffset = _segment$cueOutCont$split$map2[0];
        adTotal = _segment$cueOutCont$split$map2[1];

        cue = new _globalWindow2['default'].VTTCue(mediaTime, mediaTime + segment.duration, '');
        cue.adStartTime = mediaTime - adOffset;
        cue.adEndTime = cue.adStartTime + adTotal;
        track.addCue(cue);
      }
    }
    mediaTime += segment.duration;
  }
};

exports['default'] = {
  updateAdCues: updateAdCues,
  findAdCue: findAdCue
};
module.exports = exports['default'];
},{"global/window":22}],2:[function(require,module,exports){
/**
 * @file bin-utils.js
 */

/**
 * convert a TimeRange to text
 *
 * @param {TimeRange} range the timerange to use for conversion
 * @param {Number} i the iterator on the range to convert
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var textRange = function textRange(range, i) {
  return range.start(i) + '-' + range.end(i);
};

/**
 * format a number as hex string
 *
 * @param {Number} e The number
 * @param {Number} i the iterator
 */
var formatHexString = function formatHexString(e, i) {
  var value = e.toString(16);

  return '00'.substring(0, 2 - value.length) + value + (i % 2 ? ' ' : '');
};
var formatAsciiString = function formatAsciiString(e) {
  if (e >= 0x20 && e < 0x7e) {
    return String.fromCharCode(e);
  }
  return '.';
};

/**
 * utils to help dump binary data to the console
 */
var utils = {
  hexDump: function hexDump(data) {
    var bytes = Array.prototype.slice.call(data);
    var step = 16;
    var result = '';
    var hex = undefined;
    var ascii = undefined;

    for (var j = 0; j < bytes.length / step; j++) {
      hex = bytes.slice(j * step, j * step + step).map(formatHexString).join('');
      ascii = bytes.slice(j * step, j * step + step).map(formatAsciiString).join('');
      result += hex + ' ' + ascii + '\n';
    }
    return result;
  },
  tagDump: function tagDump(tag) {
    return utils.hexDump(tag.bytes);
  },
  textRanges: function textRanges(ranges) {
    var result = '';
    var i = undefined;

    for (i = 0; i < ranges.length; i++) {
      result += textRange(ranges, i) + ' ';
    }
    return result;
  }
};

exports['default'] = utils;
module.exports = exports['default'];
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  GOAL_BUFFER_LENGTH: 30
};
module.exports = exports["default"];
},{}],4:[function(require,module,exports){
(function (global){
/**
 * @file gap-skipper.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ranges = require('./ranges');

var _ranges2 = _interopRequireDefault(_ranges);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// Set of events that reset the gap-skipper logic and clear the timeout
var timerCancelEvents = ['seeking', 'seeked', 'pause', 'playing', 'error'];

/**
 * The gap skipper object handles all scenarios
 * where the player runs into the end of a buffered
 * region and there is a buffered region ahead.
 *
 * It then handles the skipping behavior by setting a
 * timer to the size (in time) of the gap. This gives
 * the hls segment fetcher time to close the gap and
 * resume playing before the timer is triggered and
 * the gap skipper simply seeks over the gap as a
 * last resort to resume playback.
 *
 * @class GapSkipper
 */

var GapSkipper = (function () {
  /**
   * Represents a GapSKipper object.
   * @constructor
   * @param {object} options an object that includes the tech and settings
   */

  function GapSkipper(options) {
    var _this = this;

    _classCallCheck(this, GapSkipper);

    this.tech_ = options.tech;
    this.consecutiveUpdates = 0;
    this.lastRecordedTime = null;
    this.timer_ = null;
    this.checkCurrentTimeTimeout_ = null;

    if (options.debug) {
      this.logger_ = _videoJs2['default'].log.bind(_videoJs2['default'], 'gap-skipper ->');
    }
    this.logger_('initialize');

    var waitingHandler = function waitingHandler() {
      return _this.waiting_();
    };
    var cancelTimerHandler = function cancelTimerHandler() {
      return _this.cancelTimer_();
    };

    this.tech_.on('waiting', waitingHandler);
    this.tech_.on(timerCancelEvents, cancelTimerHandler);
    this.monitorCurrentTime_();

    // Define the dispose function to clean up our events
    this.dispose = function () {
      _this.logger_('dispose');
      _this.tech_.off('waiting', waitingHandler);
      _this.tech_.off(timerCancelEvents, cancelTimerHandler);
      if (_this.checkCurrentTimeTimeout_) {
        clearTimeout(_this.checkCurrentTimeTimeout_);
      }
      _this.cancelTimer_();
    };
  }

  /**
   * Periodically check for timeupdates to see if a gap has been encountered.
   *
   * @private
   */

  _createClass(GapSkipper, [{
    key: 'monitorCurrentTime_',
    value: function monitorCurrentTime_() {
      this.checkCurrentTime_();

      if (this.checkCurrentTimeTimeout_) {
        clearTimeout(this.checkCurrentTimeTimeout_);
      }

      // 42 = 24 fps // 250 is what Webkit uses // FF uses 15
      this.checkCurrentTimeTimeout_ = setTimeout(this.monitorCurrentTime_.bind(this), 250);
    }

    /**
     * Handler for `waiting` events from the player
     *
     * @private
     */
  }, {
    key: 'waiting_',
    value: function waiting_() {
      if (!this.tech_.seeking()) {
        this.setTimer_();
      }
    }

    /**
     * The purpose of this function is to emulate the "waiting" event on
     * browsers that do not emit it when they are waiting for more
     * data to continue playback
     *
     * @private
     */
  }, {
    key: 'checkCurrentTime_',
    value: function checkCurrentTime_() {
      if (this.tech_.paused() || this.tech_.seeking()) {
        return;
      }

      var currentTime = this.tech_.currentTime();

      if (this.consecutiveUpdates === 5 && currentTime === this.lastRecordedTime) {
        this.consecutiveUpdates++;
        this.waiting_();
      } else if (currentTime === this.lastRecordedTime) {
        this.consecutiveUpdates++;
      } else {
        this.consecutiveUpdates = 0;
        this.lastRecordedTime = currentTime;
      }
    }

    /**
     * Cancels any pending timers and resets the 'timeupdate' mechanism
     * designed to detect that we are stalled
     *
     * @private
     */
  }, {
    key: 'cancelTimer_',
    value: function cancelTimer_() {
      this.consecutiveUpdates = 0;

      if (this.timer_) {
        this.logger_('cancelTimer_');
        clearTimeout(this.timer_);
      }

      this.timer_ = null;
    }

    /**
     * Timer callback. If playback still has not proceeded, then we seek
     * to the start of the next buffered region.
     *
     * @private
     */
  }, {
    key: 'skipTheGap_',
    value: function skipTheGap_(scheduledCurrentTime) {
      var buffered = this.tech_.buffered();
      var currentTime = this.tech_.currentTime();
      var nextRange = _ranges2['default'].findNextRange(buffered, currentTime);

      this.consecutiveUpdates = 0;
      this.timer_ = null;

      if (nextRange.length === 0 || currentTime !== scheduledCurrentTime) {
        return;
      }

      this.logger_('skipTheGap_:', 'currentTime:', currentTime, 'scheduled currentTime:', scheduledCurrentTime, 'nextRange start:', nextRange.start(0));

      // only seek if we still have not played
      this.tech_.setCurrentTime(nextRange.start(0) + _ranges2['default'].TIME_FUDGE_FACTOR);
    }
  }, {
    key: 'gapFromVideoUnderflow_',
    value: function gapFromVideoUnderflow_(buffered, currentTime) {
      // At least in Chrome, if there is a gap in the video buffer, the audio will continue
      // playing for ~3 seconds after the video gap starts. This is done to account for
      // video buffer underflow/underrun (note that this is not done when there is audio
      // buffer underflow/underrun -- in that case the video will stop as soon as it
      // encounters the gap, as audio stalls are more noticeable/jarring to a user than
      // video stalls). The player's time will reflect the playthrough of audio, so the
      // time will appear as if we are in a buffered region, even if we are stuck in a
      // "gap."
      //
      // Example:
      // video buffer:   0 => 10.1, 10.2 => 20
      // audio buffer:   0 => 20
      // overall buffer: 0 => 10.1, 10.2 => 20
      // current time: 13
      //
      // Chrome's video froze at 10 seconds, where the video buffer encountered the gap,
      // however, the audio continued playing until it reached ~3 seconds past the gap
      // (13 seconds), at which point it stops as well. Since current time is past the
      // gap, findNextRange will return no ranges.
      //
      // To check for this issue, we see if there is a gap that starts somewhere within
      // a 3 second range (3 seconds +/- 1 second) back from our current time.
      var gaps = _ranges2['default'].findGaps(buffered);

      for (var i = 0; i < gaps.length; i++) {
        var start = gaps.start(i);
        var end = gaps.end(i);

        // gap is starts no more than 4 seconds back
        if (currentTime - start < 4 && currentTime - start > 2) {
          return {
            start: start,
            end: end
          };
        }
      }

      return null;
    }

    /**
     * Set a timer to skip the unbuffered region.
     *
     * @private
     */
  }, {
    key: 'setTimer_',
    value: function setTimer_() {
      var buffered = this.tech_.buffered();
      var currentTime = this.tech_.currentTime();
      var nextRange = _ranges2['default'].findNextRange(buffered, currentTime);

      if (this.timer_ !== null) {
        return;
      }

      if (nextRange.length === 0) {
        // Even if there is no available next range, there is still a possibility we are
        // stuck in a gap due to video underflow.
        var gap = this.gapFromVideoUnderflow_(buffered, currentTime);

        if (gap) {
          this.logger_('setTimer_:', 'Encountered a gap in video', 'from: ', gap.start, 'to: ', gap.end, 'seeking to current time: ', currentTime);
          // Even though the video underflowed and was stuck in a gap, the audio overplayed
          // the gap, leading currentTime into a buffered range. Seeking to currentTime
          // allows the video to catch up to the audio position without losing any audio
          // (only suffering ~3 seconds of frozen video and a pause in audio playback).
          this.tech_.setCurrentTime(currentTime);
        }
        return;
      }

      var difference = nextRange.start(0) - currentTime;

      this.logger_('setTimer_:', 'stopped at:', currentTime, 'setting timer for:', difference, 'seeking to:', nextRange.start(0));

      this.timer_ = setTimeout(this.skipTheGap_.bind(this), difference * 1000, currentTime);
    }

    /**
     * A debugging logger noop that is set to console.log only if debugging
     * is enabled globally
     *
     * @private
     */
  }, {
    key: 'logger_',
    value: function logger_() {}
  }]);

  return GapSkipper;
})();

exports['default'] = GapSkipper;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ranges":8}],5:[function(require,module,exports){
(function (global){
/**
 * @file master-playlist-controller.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _playlistLoader = require('./playlist-loader');

var _playlistLoader2 = _interopRequireDefault(_playlistLoader);

var _segmentLoader = require('./segment-loader');

var _segmentLoader2 = _interopRequireDefault(_segmentLoader);

var _ranges = require('./ranges');

var _ranges2 = _interopRequireDefault(_ranges);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _adCueTags = require('./ad-cue-tags');

var _adCueTags2 = _interopRequireDefault(_adCueTags);

// 5 minute blacklist
var BLACKLIST_DURATION = 5 * 60 * 1000;
var Hls = undefined;

/**
 * determine if an object a is differnt from
 * and object b. both only having one dimensional
 * properties
 *
 * @param {Object} a object one
 * @param {Object} b object two
 * @return {Boolean} if the object has changed or not
 */
var objectChanged = function objectChanged(a, b) {
  if (typeof a !== typeof b) {
    return true;
  }
  // if we have a different number of elements
  // something has changed
  if (Object.keys(a).length !== Object.keys(b).length) {
    return true;
  }

  for (var prop in a) {
    if (a[prop] !== b[prop]) {
      return true;
    }
  }
  return false;
};

/**
 * Parses a codec string to retrieve the number of codecs specified,
 * the video codec and object type indicator, and the audio profile.
 *
 * @private
 */
var parseCodecs = function parseCodecs(codecs) {
  var result = {
    codecCount: 0,
    videoCodec: null,
    videoObjectTypeIndicator: null,
    audioProfile: null
  };
  var parsed = undefined;

  result.codecCount = codecs.split(',').length;
  result.codecCount = result.codecCount || 2;

  // parse the video codec
  parsed = /(^|\s|,)+(avc1)([^ ,]*)/i.exec(codecs);
  if (parsed) {
    result.videoCodec = parsed[2];
    result.videoObjectTypeIndicator = parsed[3];
  }

  // parse the last field of the audio codec
  result.audioProfile = /(^|\s|,)+mp4a.[0-9A-Fa-f]+\.([0-9A-Fa-f]+)/i.exec(codecs);
  result.audioProfile = result.audioProfile && result.audioProfile[2];

  return result;
};

/**
 * Calculates the MIME type strings for a working configuration of
 * SourceBuffers to play variant streams in a master playlist. If
 * there is no possible working configuration, an empty array will be
 * returned.
 *
 * @param master {Object} the m3u8 object for the master playlist
 * @param media {Object} the m3u8 object for the variant playlist
 * @return {Array} the MIME type strings. If the array has more than
 * one entry, the first element should be applied to the video
 * SourceBuffer and the second to the audio SourceBuffer.
 *
 * @private
 */
var mimeTypesForPlaylist_ = function mimeTypesForPlaylist_(master, media) {
  var container = 'mp2t';
  var codecs = {
    videoCodec: 'avc1',
    videoObjectTypeIndicator: '.4d400d',
    audioProfile: '2'
  };
  var audioGroup = [];
  var mediaAttributes = undefined;
  var previousGroup = null;

  if (!media) {
    // not enough information, return an error
    return [];
  }
  // An initialization segment means the media playlists is an iframe
  // playlist or is using the mp4 container. We don't currently
  // support iframe playlists, so assume this is signalling mp4
  // fragments.
  // the existence check for segments can be removed once
  // https://github.com/videojs/m3u8-parser/issues/8 is closed
  if (media.segments && media.segments.length && media.segments[0].map) {
    container = 'mp4';
  }

  // if the codecs were explicitly specified, use them instead of the
  // defaults
  mediaAttributes = media.attributes || {};
  if (mediaAttributes.CODECS) {
    (function () {
      var parsedCodecs = parseCodecs(mediaAttributes.CODECS);

      Object.keys(parsedCodecs).forEach(function (key) {
        codecs[key] = parsedCodecs[key] || codecs[key];
      });
    })();
  }

  if (master.mediaGroups.AUDIO) {
    audioGroup = master.mediaGroups.AUDIO[mediaAttributes.AUDIO];
  }

  // if audio could be muxed or unmuxed, use mime types appropriate
  // for both scenarios
  for (var groupId in audioGroup) {
    if (previousGroup && !!audioGroup[groupId].uri !== !!previousGroup.uri) {
      // one source buffer with muxed video and audio and another for
      // the alternate audio
      return ['video/' + container + '; codecs="' + codecs.videoCodec + codecs.videoObjectTypeIndicator + ', mp4a.40.' + codecs.audioProfile + '"', 'audio/' + container + '; codecs="mp4a.40.' + codecs.audioProfile + '"'];
    }
    previousGroup = audioGroup[groupId];
  }
  // if all video and audio is unmuxed, use two single-codec mime
  // types
  if (previousGroup && previousGroup.uri) {
    return ['video/' + container + '; codecs="' + codecs.videoCodec + codecs.videoObjectTypeIndicator + '"', 'audio/' + container + '; codecs="mp4a.40.' + codecs.audioProfile + '"'];
  }

  // all video and audio are muxed, use a dual-codec mime type
  return ['video/' + container + '; codecs="' + codecs.videoCodec + codecs.videoObjectTypeIndicator + ', mp4a.40.' + codecs.audioProfile + '"'];
};

exports.mimeTypesForPlaylist_ = mimeTypesForPlaylist_;
/**
 * the master playlist controller controller all interactons
 * between playlists and segmentloaders. At this time this mainly
 * involves a master playlist and a series of audio playlists
 * if they are available
 *
 * @class MasterPlaylistController
 * @extends videojs.EventTarget
 */

var MasterPlaylistController = (function (_videojs$EventTarget) {
  _inherits(MasterPlaylistController, _videojs$EventTarget);

  function MasterPlaylistController(options) {
    var _this = this;

    _classCallCheck(this, MasterPlaylistController);

    _get(Object.getPrototypeOf(MasterPlaylistController.prototype), 'constructor', this).call(this);

    var url = options.url;
    var withCredentials = options.withCredentials;
    var mode = options.mode;
    var tech = options.tech;
    var bandwidth = options.bandwidth;
    var externHls = options.externHls;
    var useCueTags = options.useCueTags;

    if (!url) {
      throw new Error('A non-empty playlist URL is required');
    }

    Hls = externHls;

    this.withCredentials = withCredentials;
    this.tech_ = tech;
    this.hls_ = tech.hls;
    this.mode_ = mode;
    this.useCueTags_ = useCueTags;
    if (this.useCueTags_) {
      this.cueTagsTrack_ = this.tech_.addTextTrack('metadata', 'ad-cues');
      this.cueTagsTrack_.inBandMetadataTrackDispatchType = '';
      this.tech_.textTracks().addTrack_(this.cueTagsTrack_);
    }

    this.audioTracks_ = [];
    this.requestOptions_ = {
      withCredentials: this.withCredentials,
      timeout: null
    };

    this.audioGroups_ = {};

    this.mediaSource = new _videoJs2['default'].MediaSource({ mode: mode });
    this.audioinfo_ = null;
    this.mediaSource.on('audioinfo', this.handleAudioinfoUpdate_.bind(this));

    // load the media source into the player
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen_.bind(this));

    var segmentLoaderOptions = {
      hls: this.hls_,
      mediaSource: this.mediaSource,
      currentTime: this.tech_.currentTime.bind(this.tech_),
      seekable: function seekable() {
        return _this.seekable();
      },
      seeking: function seeking() {
        return _this.tech_.seeking();
      },
      setCurrentTime: function setCurrentTime(a) {
        return _this.tech_.setCurrentTime(a);
      },
      hasPlayed: function hasPlayed() {
        return _this.tech_.played().length !== 0;
      },
      bandwidth: bandwidth
    };

    // setup playlist loaders
    this.masterPlaylistLoader_ = new _playlistLoader2['default'](url, this.hls_, this.withCredentials);
    this.setupMasterPlaylistLoaderListeners_();
    this.audioPlaylistLoader_ = null;

    // setup segment loaders
    // combined audio/video or just video when alternate audio track is selected
    this.mainSegmentLoader_ = new _segmentLoader2['default'](segmentLoaderOptions);
    // alternate audio track
    this.audioSegmentLoader_ = new _segmentLoader2['default'](segmentLoaderOptions);
    this.setupSegmentLoaderListeners_();

    this.masterPlaylistLoader_.start();
  }

  /**
   * Register event handlers on the master playlist loader. A helper
   * function for construction time.
   *
   * @private
   */

  _createClass(MasterPlaylistController, [{
    key: 'setupMasterPlaylistLoaderListeners_',
    value: function setupMasterPlaylistLoaderListeners_() {
      var _this2 = this;

      this.masterPlaylistLoader_.on('loadedmetadata', function () {
        var media = _this2.masterPlaylistLoader_.media();
        var requestTimeout = _this2.masterPlaylistLoader_.targetDuration * 1.5 * 1000;

        _this2.requestOptions_.timeout = requestTimeout;

        // if this isn't a live video and preload permits, start
        // downloading segments
        if (media.endList && _this2.tech_.preload() !== 'none') {
          _this2.mainSegmentLoader_.playlist(media, _this2.requestOptions_);
          _this2.mainSegmentLoader_.expired(_this2.masterPlaylistLoader_.expired_);
          _this2.mainSegmentLoader_.load();
        }

        try {
          _this2.setupSourceBuffers_();
        } catch (e) {
          _videoJs2['default'].log.warn('Failed to create SourceBuffers', e);
          return _this2.mediaSource.endOfStream('decode');
        }
        _this2.setupFirstPlay();

        _this2.fillAudioTracks_();
        _this2.setupAudio();
        _this2.trigger('audioupdate');

        _this2.trigger('selectedinitialmedia');
      });

      this.masterPlaylistLoader_.on('loadedplaylist', function () {
        var updatedPlaylist = _this2.masterPlaylistLoader_.media();
        var seekable = undefined;

        if (!updatedPlaylist) {
          // select the initial variant
          _this2.initialMedia_ = _this2.selectPlaylist();
          _this2.masterPlaylistLoader_.media(_this2.initialMedia_);
          return;
        }

        if (_this2.useCueTags_) {
          _this2.updateAdCues_(updatedPlaylist, _this2.masterPlaylistLoader_.expired_);
        }

        // TODO: Create a new event on the PlaylistLoader that signals
        // that the segments have changed in some way and use that to
        // update the SegmentLoader instead of doing it twice here and
        // on `mediachange`
        _this2.mainSegmentLoader_.playlist(updatedPlaylist, _this2.requestOptions_);
        _this2.mainSegmentLoader_.expired(_this2.masterPlaylistLoader_.expired_);
        _this2.updateDuration();

        // update seekable
        seekable = _this2.seekable();
        if (!updatedPlaylist.endList && seekable.length !== 0) {
          _this2.mediaSource.addSeekableRange_(seekable.start(0), seekable.end(0));
        }
      });

      this.masterPlaylistLoader_.on('error', function () {
        _this2.blacklistCurrentPlaylist(_this2.masterPlaylistLoader_.error);
      });

      this.masterPlaylistLoader_.on('mediachanging', function () {
        _this2.mainSegmentLoader_.abort();
        _this2.mainSegmentLoader_.pause();
      });

      this.masterPlaylistLoader_.on('mediachange', function () {
        var media = _this2.masterPlaylistLoader_.media();
        var requestTimeout = _this2.masterPlaylistLoader_.targetDuration * 1.5 * 1000;
        var activeAudioGroup = undefined;
        var activeTrack = undefined;

        // If we don't have any more available playlists, we don't want to
        // timeout the request.
        if (_this2.masterPlaylistLoader_.isLowestEnabledRendition_()) {
          _this2.requestOptions_.timeout = 0;
        } else {
          _this2.requestOptions_.timeout = requestTimeout;
        }

        // TODO: Create a new event on the PlaylistLoader that signals
        // that the segments have changed in some way and use that to
        // update the SegmentLoader instead of doing it twice here and
        // on `loadedplaylist`
        _this2.mainSegmentLoader_.playlist(media, _this2.requestOptions_);
        _this2.mainSegmentLoader_.expired(_this2.masterPlaylistLoader_.expired_);
        _this2.mainSegmentLoader_.load();

        // if the audio group has changed, a new audio track has to be
        // enabled
        activeAudioGroup = _this2.activeAudioGroup();
        activeTrack = activeAudioGroup.filter(function (track) {
          return track.enabled;
        })[0];
        if (!activeTrack) {
          _this2.setupAudio();
          _this2.trigger('audioupdate');
        }

        _this2.tech_.trigger({
          type: 'mediachange',
          bubbles: true
        });
      });
    }

    /**
     * Register event handlers on the segment loaders. A helper function
     * for construction time.
     *
     * @private
     */
  }, {
    key: 'setupSegmentLoaderListeners_',
    value: function setupSegmentLoaderListeners_() {
      var _this3 = this;

      this.mainSegmentLoader_.on('progress', function () {
        // figure out what stream the next segment should be downloaded from
        // with the updated bandwidth information
        _this3.masterPlaylistLoader_.media(_this3.selectPlaylist());

        _this3.trigger('progress');
      });

      this.mainSegmentLoader_.on('error', function () {
        _this3.blacklistCurrentPlaylist(_this3.mainSegmentLoader_.error());
      });

      this.audioSegmentLoader_.on('error', function () {
        _videoJs2['default'].log.warn('Problem encountered with the current alternate audio track' + '. Switching back to default.');
        _this3.audioSegmentLoader_.abort();
        _this3.audioPlaylistLoader_ = null;
        _this3.setupAudio();
      });
    }
  }, {
    key: 'handleAudioinfoUpdate_',
    value: function handleAudioinfoUpdate_(event) {
      if (Hls.supportsAudioInfoChange_() || !this.audioInfo_ || !objectChanged(this.audioInfo_, event.info)) {
        this.audioInfo_ = event.info;
        return;
      }

      var error = 'had different audio properties (channels, sample rate, etc.) ' + 'or changed in some other way.  This behavior is currently ' + 'unsupported in Firefox 48 and below due to an issue: \n\n' + 'https://bugzilla.mozilla.org/show_bug.cgi?id=1247138\n\n';

      var enabledIndex = this.activeAudioGroup().map(function (track) {
        return track.enabled;
      }).indexOf(true);
      var enabledTrack = this.activeAudioGroup()[enabledIndex];
      var defaultTrack = this.activeAudioGroup().filter(function (track) {
        return track.properties_ && track.properties_['default'];
      })[0];

      // they did not switch audiotracks
      // blacklist the current playlist
      if (!this.audioPlaylistLoader_) {
        error = 'The rendition that we tried to switch to ' + error + 'Unfortunately that means we will have to blacklist ' + 'the current playlist and switch to another. Sorry!';
        this.blacklistCurrentPlaylist();
      } else {
        error = 'The audio track \'' + enabledTrack.label + '\' that we tried to ' + ('switch to ' + error + ' Unfortunately this means we will have to ') + ('return you to the main track \'' + defaultTrack.label + '\'. Sorry!');
        defaultTrack.enabled = true;
        this.activeAudioGroup().splice(enabledIndex, 1);
        this.trigger('audioupdate');
      }

      _videoJs2['default'].log.warn(error);
      this.setupAudio();
    }

    /**
     * get the total number of media requests from the `audiosegmentloader_`
     * and the `mainSegmentLoader_`
     *
     * @private
     */
  }, {
    key: 'mediaRequests_',
    value: function mediaRequests_() {
      return this.audioSegmentLoader_.mediaRequests + this.mainSegmentLoader_.mediaRequests;
    }

    /**
     * get the total time that media requests have spent trnasfering
     * from the `audiosegmentloader_` and the `mainSegmentLoader_`
     *
     * @private
     */
  }, {
    key: 'mediaTransferDuration_',
    value: function mediaTransferDuration_() {
      return this.audioSegmentLoader_.mediaTransferDuration + this.mainSegmentLoader_.mediaTransferDuration;
    }

    /**
     * get the total number of bytes transfered during media requests
     * from the `audiosegmentloader_` and the `mainSegmentLoader_`
     *
     * @private
     */
  }, {
    key: 'mediaBytesTransferred_',
    value: function mediaBytesTransferred_() {
      return this.audioSegmentLoader_.mediaBytesTransferred + this.mainSegmentLoader_.mediaBytesTransferred;
    }

    /**
     * fill our internal list of HlsAudioTracks with data from
     * the master playlist or use a default
     *
     * @private
     */
  }, {
    key: 'fillAudioTracks_',
    value: function fillAudioTracks_() {
      var master = this.master();
      var mediaGroups = master.mediaGroups || {};

      // force a default if we have none or we are not
      // in html5 mode (the only mode to support more than one
      // audio track)
      if (!mediaGroups || !mediaGroups.AUDIO || Object.keys(mediaGroups.AUDIO).length === 0 || this.mode_ !== 'html5') {
        // "main" audio group, track name "default"
        mediaGroups.AUDIO = { main: { 'default': { 'default': true } } };
      }

      for (var mediaGroup in mediaGroups.AUDIO) {
        if (!this.audioGroups_[mediaGroup]) {
          this.audioGroups_[mediaGroup] = [];
        }

        for (var label in mediaGroups.AUDIO[mediaGroup]) {
          var properties = mediaGroups.AUDIO[mediaGroup][label];
          var track = new _videoJs2['default'].AudioTrack({
            id: label,
            kind: properties['default'] ? 'main' : 'alternative',
            enabled: false,
            language: properties.language,
            label: label
          });

          track.properties_ = properties;
          this.audioGroups_[mediaGroup].push(track);
        }
      }

      // enable the default active track
      (this.activeAudioGroup().filter(function (audioTrack) {
        return audioTrack.properties_['default'];
      })[0] || this.activeAudioGroup()[0]).enabled = true;
    }

    /**
     * Call load on our SegmentLoaders
     */
  }, {
    key: 'load',
    value: function load() {
      this.mainSegmentLoader_.load();
      if (this.audioPlaylistLoader_) {
        this.audioSegmentLoader_.load();
      }
    }

    /**
     * Returns the audio group for the currently active primary
     * media playlist.
     */
  }, {
    key: 'activeAudioGroup',
    value: function activeAudioGroup() {
      var videoPlaylist = this.masterPlaylistLoader_.media();
      var result = undefined;

      if (videoPlaylist.attributes && videoPlaylist.attributes.AUDIO) {
        result = this.audioGroups_[videoPlaylist.attributes.AUDIO];
      }

      return result || this.audioGroups_.main;
    }

    /**
     * Determine the correct audio rendition based on the active
     * AudioTrack and initialize a PlaylistLoader and SegmentLoader if
     * necessary. This method is called once automatically before
     * playback begins to enable the default audio track and should be
     * invoked again if the track is changed.
     */
  }, {
    key: 'setupAudio',
    value: function setupAudio() {
      var _this4 = this;

      // determine whether seperate loaders are required for the audio
      // rendition
      var audioGroup = this.activeAudioGroup();
      var track = audioGroup.filter(function (audioTrack) {
        return audioTrack.enabled;
      })[0];

      if (!track) {
        track = audioGroup.filter(function (audioTrack) {
          return audioTrack.properties_['default'];
        })[0] || audioGroup[0];
        track.enabled = true;
      }

      // stop playlist and segment loading for audio
      if (this.audioPlaylistLoader_) {
        this.audioPlaylistLoader_.dispose();
        this.audioPlaylistLoader_ = null;
      }
      this.audioSegmentLoader_.pause();
      this.audioSegmentLoader_.clearBuffer();

      if (!track.properties_.resolvedUri) {
        return;
      }

      // startup playlist and segment loaders for the enabled audio
      // track
      this.audioPlaylistLoader_ = new _playlistLoader2['default'](track.properties_.resolvedUri, this.hls_, this.withCredentials);
      this.audioPlaylistLoader_.start();

      this.audioPlaylistLoader_.on('loadedmetadata', function () {
        var audioPlaylist = _this4.audioPlaylistLoader_.media();

        _this4.audioSegmentLoader_.playlist(audioPlaylist, _this4.requestOptions_);

        // if the video is already playing, or if this isn't a live video and preload
        // permits, start downloading segments
        if (!_this4.tech_.paused() || audioPlaylist.endList && _this4.tech_.preload() !== 'none') {
          _this4.audioSegmentLoader_.load();
        }

        if (!audioPlaylist.endList) {
          // trigger the playlist loader to start "expired time"-tracking
          _this4.audioPlaylistLoader_.trigger('firstplay');
        }
      });

      this.audioPlaylistLoader_.on('loadedplaylist', function () {
        var updatedPlaylist = undefined;

        if (_this4.audioPlaylistLoader_) {
          updatedPlaylist = _this4.audioPlaylistLoader_.media();
        }

        if (!updatedPlaylist) {
          // only one playlist to select
          _this4.audioPlaylistLoader_.media(_this4.audioPlaylistLoader_.playlists.master.playlists[0]);
          return;
        }

        _this4.audioSegmentLoader_.playlist(updatedPlaylist, _this4.requestOptions_);
      });

      this.audioPlaylistLoader_.on('error', function () {
        _videoJs2['default'].log.warn('Problem encountered loading the alternate audio track' + '. Switching back to default.');
        _this4.audioSegmentLoader_.abort();
        _this4.setupAudio();
      });
    }

    /**
     * Re-tune playback quality level for the current player
     * conditions. This method may perform destructive actions, like
     * removing already buffered content, to readjust the currently
     * active playlist quickly.
     *
     * @private
     */
  }, {
    key: 'fastQualityChange_',
    value: function fastQualityChange_() {
      var media = this.selectPlaylist();

      if (media !== this.masterPlaylistLoader_.media()) {
        this.masterPlaylistLoader_.media(media);
        this.mainSegmentLoader_.sourceUpdater_.remove(this.tech_.currentTime() + 5, Infinity);
      }
    }

    /**
     * Begin playback.
     */
  }, {
    key: 'play',
    value: function play() {
      if (this.setupFirstPlay()) {
        return;
      }

      if (this.tech_.ended()) {
        this.tech_.setCurrentTime(0);
      }

      this.load();

      // if the viewer has paused and we fell out of the live window,
      // seek forward to the earliest available position
      if (this.tech_.duration() === Infinity) {
        if (this.tech_.currentTime() < this.tech_.seekable().start(0)) {
          return this.tech_.setCurrentTime(this.tech_.seekable().start(0));
        }
      }
    }

    /**
     * Seek to the latest media position if this is a live video and the
     * player and video are loaded and initialized.
     */
  }, {
    key: 'setupFirstPlay',
    value: function setupFirstPlay() {
      var seekable = undefined;
      var media = this.masterPlaylistLoader_.media();

      // check that everything is ready to begin buffering
      // 1) the active media playlist is available
      if (media &&
      // 2) the video is a live stream
      !media.endList &&

      // 3) the player is not paused
      !this.tech_.paused() &&

      // 4) the player has not started playing
      !this.hasPlayed_) {

        // trigger the playlist loader to start "expired time"-tracking
        this.masterPlaylistLoader_.trigger('firstplay');
        this.hasPlayed_ = true;

        // seek to the latest media position for live videos
        seekable = this.seekable();
        if (seekable.length) {
          this.tech_.setCurrentTime(seekable.end(0));
        }

        // now that we seeked to the current time, load the segment
        this.load();

        return true;
      }
      return false;
    }

    /**
     * handle the sourceopen event on the MediaSource
     *
     * @private
     */
  }, {
    key: 'handleSourceOpen_',
    value: function handleSourceOpen_() {
      // Only attempt to create the source buffer if none already exist.
      // handleSourceOpen is also called when we are "re-opening" a source buffer
      // after `endOfStream` has been called (in response to a seek for instance)
      try {
        this.setupSourceBuffers_();
      } catch (e) {
        _videoJs2['default'].log.warn('Failed to create Source Buffers', e);
        return this.mediaSource.endOfStream('decode');
      }

      // if autoplay is enabled, begin playback. This is duplicative of
      // code in video.js but is required because play() must be invoked
      // *after* the media source has opened.
      if (this.tech_.autoplay()) {
        this.tech_.play();
      }

      this.trigger('sourceopen');
    }

    /**
     * Blacklists a playlist when an error occurs for a set amount of time
     * making it unavailable for selection by the rendition selection algorithm
     * and then forces a new playlist (rendition) selection.
     *
     * @param {Object=} error an optional error that may include the playlist
     * to blacklist
     */
  }, {
    key: 'blacklistCurrentPlaylist',
    value: function blacklistCurrentPlaylist() {
      var error = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var currentPlaylist = undefined;
      var nextPlaylist = undefined;

      // If the `error` was generated by the playlist loader, it will contain
      // the playlist we were trying to load (but failed) and that should be
      // blacklisted instead of the currently selected playlist which is likely
      // out-of-date in this scenario
      currentPlaylist = error.playlist || this.masterPlaylistLoader_.media();

      // If there is no current playlist, then an error occurred while we were
      // trying to load the master OR while we were disposing of the tech
      if (!currentPlaylist) {
        this.error = error;
        return this.mediaSource.endOfStream('network');
      }

      // Blacklist this playlist
      currentPlaylist.excludeUntil = Date.now() + BLACKLIST_DURATION;

      // Select a new playlist
      nextPlaylist = this.selectPlaylist();

      if (nextPlaylist) {
        _videoJs2['default'].log.warn('Problem encountered with the current ' + 'HLS playlist. Switching to another playlist.');

        return this.masterPlaylistLoader_.media(nextPlaylist);
      }
      _videoJs2['default'].log.warn('Problem encountered with the current ' + 'HLS playlist. No suitable alternatives found.');
      // We have no more playlists we can select so we must fail
      this.error = error;
      return this.mediaSource.endOfStream('network');
    }

    /**
     * Pause all segment loaders
     */
  }, {
    key: 'pauseLoading',
    value: function pauseLoading() {
      this.mainSegmentLoader_.pause();
      if (this.audioPlaylistLoader_) {
        this.audioSegmentLoader_.pause();
      }
    }

    /**
     * set the current time on all segment loaders
     *
     * @param {TimeRange} currentTime the current time to set
     * @return {TimeRange} the current time
     */
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(currentTime) {
      var buffered = _ranges2['default'].findRange(this.tech_.buffered(), currentTime);

      if (!(this.masterPlaylistLoader_ && this.masterPlaylistLoader_.media())) {
        // return immediately if the metadata is not ready yet
        return 0;
      }

      // it's clearly an edge-case but don't thrown an error if asked to
      // seek within an empty playlist
      if (!this.masterPlaylistLoader_.media().segments) {
        return 0;
      }

      // if the seek location is already buffered, continue buffering as
      // usual
      if (buffered && buffered.length) {
        return currentTime;
      }

      // cancel outstanding requests so we begin buffering at the new
      // location
      this.mainSegmentLoader_.abort();
      if (this.audioPlaylistLoader_) {
        this.audioSegmentLoader_.abort();
      }

      if (!this.tech_.paused()) {
        this.mainSegmentLoader_.load();
        if (this.audioPlaylistLoader_) {
          this.audioSegmentLoader_.load();
        }
      }
    }

    /**
     * get the current duration
     *
     * @return {TimeRange} the duration
     */
  }, {
    key: 'duration',
    value: function duration() {
      if (!this.masterPlaylistLoader_) {
        return 0;
      }

      if (this.mediaSource) {
        return this.mediaSource.duration;
      }

      return Hls.Playlist.duration(this.masterPlaylistLoader_.media());
    }

    /**
     * check the seekable range
     *
     * @return {TimeRange} the seekable range
     */
  }, {
    key: 'seekable',
    value: function seekable() {
      var media = undefined;
      var mainSeekable = undefined;
      var audioSeekable = undefined;

      if (!this.masterPlaylistLoader_) {
        return _videoJs2['default'].createTimeRanges();
      }
      media = this.masterPlaylistLoader_.media();
      if (!media) {
        return _videoJs2['default'].createTimeRanges();
      }

      mainSeekable = Hls.Playlist.seekable(media, this.masterPlaylistLoader_.expired_);
      if (mainSeekable.length === 0) {
        return mainSeekable;
      }

      if (this.audioPlaylistLoader_) {
        audioSeekable = Hls.Playlist.seekable(this.audioPlaylistLoader_.media(), this.audioPlaylistLoader_.expired_);
        if (audioSeekable.length === 0) {
          return audioSeekable;
        }
      }

      if (!audioSeekable) {
        // seekable has been calculated based on buffering video data so it
        // can be returned directly
        return mainSeekable;
      }

      return _videoJs2['default'].createTimeRanges([[audioSeekable.start(0) > mainSeekable.start(0) ? audioSeekable.start(0) : mainSeekable.start(0), audioSeekable.end(0) < mainSeekable.end(0) ? audioSeekable.end(0) : mainSeekable.end(0)]]);
    }

    /**
     * Update the player duration
     */
  }, {
    key: 'updateDuration',
    value: function updateDuration() {
      var _this5 = this;

      var oldDuration = this.mediaSource.duration;
      var newDuration = Hls.Playlist.duration(this.masterPlaylistLoader_.media());
      var buffered = this.tech_.buffered();
      var setDuration = function setDuration() {
        _this5.mediaSource.duration = newDuration;
        _this5.tech_.trigger('durationchange');

        _this5.mediaSource.removeEventListener('sourceopen', setDuration);
      };

      if (buffered.length > 0) {
        newDuration = Math.max(newDuration, buffered.end(buffered.length - 1));
      }

      // if the duration has changed, invalidate the cached value
      if (oldDuration !== newDuration) {
        // update the duration
        if (this.mediaSource.readyState !== 'open') {
          this.mediaSource.addEventListener('sourceopen', setDuration);
        } else {
          setDuration();
        }
      }
    }

    /**
     * dispose of the MasterPlaylistController and everything
     * that it controls
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      this.masterPlaylistLoader_.dispose();
      this.mainSegmentLoader_.dispose();

      this.audioSegmentLoader_.dispose();
    }

    /**
     * return the master playlist object if we have one
     *
     * @return {Object} the master playlist object that we parsed
     */
  }, {
    key: 'master',
    value: function master() {
      return this.masterPlaylistLoader_.master;
    }

    /**
     * return the currently selected playlist
     *
     * @return {Object} the currently selected playlist object that we parsed
     */
  }, {
    key: 'media',
    value: function media() {
      // playlist loader will not return media if it has not been fully loaded
      return this.masterPlaylistLoader_.media() || this.initialMedia_;
    }

    /**
     * setup our internal source buffers on our segment Loaders
     *
     * @private
     */
  }, {
    key: 'setupSourceBuffers_',
    value: function setupSourceBuffers_() {
      var media = this.masterPlaylistLoader_.media();
      var mimeTypes = undefined;

      // wait until a media playlist is available and the Media Source is
      // attached
      if (!media || this.mediaSource.readyState !== 'open') {
        return;
      }

      mimeTypes = mimeTypesForPlaylist_(this.masterPlaylistLoader_.master, media);
      if (mimeTypes.length < 1) {
        this.error = 'No compatible SourceBuffer configuration for the variant stream:' + media.resolvedUri;
        return this.mediaSource.endOfStream('decode');
      }
      this.mainSegmentLoader_.mimeType(mimeTypes[0]);
      if (mimeTypes[1]) {
        this.audioSegmentLoader_.mimeType(mimeTypes[1]);
      }

      // exclude any incompatible variant streams from future playlist
      // selection
      this.excludeIncompatibleVariants_(media);
    }

    /**
     * Blacklist playlists that are known to be codec or
     * stream-incompatible with the SourceBuffer configuration. For
     * instance, Media Source Extensions would cause the video element to
     * stall waiting for video data if you switched from a variant with
     * video and audio to an audio-only one.
     *
     * @param {Object} media a media playlist compatible with the current
     * set of SourceBuffers. Variants in the current master playlist that
     * do not appear to have compatible codec or stream configurations
     * will be excluded from the default playlist selection algorithm
     * indefinitely.
     * @private
     */
  }, {
    key: 'excludeIncompatibleVariants_',
    value: function excludeIncompatibleVariants_(media) {
      var master = this.masterPlaylistLoader_.master;
      var codecCount = 2;
      var videoCodec = null;
      var audioProfile = null;
      var codecs = undefined;

      if (media.attributes && media.attributes.CODECS) {
        codecs = parseCodecs(media.attributes.CODECS);
        videoCodec = codecs.videoCodec;
        audioProfile = codecs.audioProfile;
        codecCount = codecs.codecCount;
      }
      master.playlists.forEach(function (variant) {
        var variantCodecs = {
          codecCount: 2,
          videoCodec: null,
          audioProfile: null
        };

        if (variant.attributes && variant.attributes.CODECS) {
          var codecString = variant.attributes.CODECS;

          variantCodecs = parseCodecs(codecString);
          if (window.MediaSource && window.MediaSource.isTypeSupported && !window.MediaSource.isTypeSupported('video/mp4; codecs="' + codecString + '"')) {
            variant.excludeUntil = Infinity;
          }
        }

        // if the streams differ in the presence or absence of audio or
        // video, they are incompatible
        if (variantCodecs.codecCount !== codecCount) {
          variant.excludeUntil = Infinity;
        }

        // if h.264 is specified on the current playlist, some flavor of
        // it must be specified on all compatible variants
        if (variantCodecs.videoCodec !== videoCodec) {
          variant.excludeUntil = Infinity;
        }
        // HE-AAC ("mp4a.40.5") is incompatible with all other versions of
        // AAC audio in Chrome 46. Don't mix the two.
        if (variantCodecs.audioProfile === '5' && audioProfile !== '5' || audioProfile === '5' && variantCodecs.audioProfile !== '5') {
          variant.excludeUntil = Infinity;
        }
      });
    }
  }, {
    key: 'updateAdCues_',
    value: function updateAdCues_(media) {
      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      _adCueTags2['default'].updateAdCues(media, this.cueTagsTrack_, offset);
    }
  }]);

  return MasterPlaylistController;
})(_videoJs2['default'].EventTarget);

exports.MasterPlaylistController = MasterPlaylistController;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ad-cue-tags":1,"./playlist-loader":6,"./ranges":8,"./segment-loader":11}],6:[function(require,module,exports){
(function (global){
/**
 * @file playlist-loader.js
 *
 * A state machine that manages the loading, caching, and updating of
 * M3U8 playlists.
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _resolveUrl = require('./resolve-url');

var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _m3u8Parser = require('m3u8-parser');

var _m3u8Parser2 = _interopRequireDefault(_m3u8Parser);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

/**
  * Returns a new array of segments that is the result of merging
  * properties from an older list of segments onto an updated
  * list. No properties on the updated playlist will be overridden.
  *
  * @param {Array} original the outdated list of segments
  * @param {Array} update the updated list of segments
  * @param {Number=} offset the index of the first update
  * segment in the original segment list. For non-live playlists,
  * this should always be zero and does not need to be
  * specified. For live playlists, it should be the difference
  * between the media sequence numbers in the original and updated
  * playlists.
  * @return a list of merged segment objects
  */
var updateSegments = function updateSegments(original, update, offset) {
  var result = update.slice();
  var length = undefined;
  var i = undefined;

  offset = offset || 0;
  length = Math.min(original.length, update.length + offset);

  for (i = offset; i < length; i++) {
    result[i - offset] = (0, _videoJs.mergeOptions)(original[i], result[i - offset]);
  }
  return result;
};

/**
  * Returns a new master playlist that is the result of merging an
  * updated media playlist into the original version. If the
  * updated media playlist does not match any of the playlist
  * entries in the original master playlist, null is returned.
  *
  * @param {Object} master a parsed master M3U8 object
  * @param {Object} media a parsed media M3U8 object
  * @return {Object} a new object that represents the original
  * master playlist with the updated media playlist merged in, or
  * null if the merge produced no change.
  */
var updateMaster = function updateMaster(master, media) {
  var changed = false;
  var result = (0, _videoJs.mergeOptions)(master, {});
  var i = master.playlists.length;
  var playlist = undefined;
  var segment = undefined;
  var j = undefined;

  while (i--) {
    playlist = result.playlists[i];
    if (playlist.uri === media.uri) {
      // consider the playlist unchanged if the number of segments
      // are equal and the media sequence number is unchanged
      if (playlist.segments && media.segments && playlist.segments.length === media.segments.length && playlist.mediaSequence === media.mediaSequence) {
        continue;
      }

      result.playlists[i] = (0, _videoJs.mergeOptions)(playlist, media);
      result.playlists[media.uri] = result.playlists[i];

      // if the update could overlap existing segment information,
      // merge the two lists
      if (playlist.segments) {
        result.playlists[i].segments = updateSegments(playlist.segments, media.segments, media.mediaSequence - playlist.mediaSequence);
      }
      // resolve any missing segment and key URIs
      j = 0;
      if (result.playlists[i].segments) {
        j = result.playlists[i].segments.length;
      }
      while (j--) {
        segment = result.playlists[i].segments[j];
        if (!segment.resolvedUri) {
          segment.resolvedUri = (0, _resolveUrl2['default'])(playlist.resolvedUri, segment.uri);
        }
        if (segment.key && !segment.key.resolvedUri) {
          segment.key.resolvedUri = (0, _resolveUrl2['default'])(playlist.resolvedUri, segment.key.uri);
        }
        if (segment.map && !segment.map.resolvedUri) {
          segment.map.resolvedUri = (0, _resolveUrl2['default'])(playlist.resolvedUri, segment.map.uri);
        }
      }
      changed = true;
    }
  }
  return changed ? result : null;
};

/**
 * Load a playlist from a remote loacation
 *
 * @class PlaylistLoader
 * @extends Stream
 * @param {String} srcUrl the url to start with
 * @param {Boolean} withCredentials the withCredentials xhr option
 * @constructor
 */
var PlaylistLoader = function PlaylistLoader(srcUrl, hls, withCredentials) {
  var _this = this;

  /* eslint-disable consistent-this */
  var loader = this;
  /* eslint-enable consistent-this */
  var dispose = undefined;
  var mediaUpdateTimeout = undefined;
  var request = undefined;
  var playlistRequestError = undefined;
  var haveMetadata = undefined;

  PlaylistLoader.prototype.constructor.call(this);

  this.hls_ = hls;

  // a flag that disables "expired time"-tracking this setting has
  // no effect when not playing a live stream
  this.trackExpiredTime_ = false;

  if (!srcUrl) {
    throw new Error('A non-empty playlist URL is required');
  }

  playlistRequestError = function (xhr, url, startingState) {
    loader.setBandwidth(request || xhr);

    // any in-flight request is now finished
    request = null;

    if (startingState) {
      loader.state = startingState;
    }

    loader.error = {
      playlist: loader.master.playlists[url],
      status: xhr.status,
      message: 'HLS playlist request error at URL: ' + url,
      responseText: xhr.responseText,
      code: xhr.status >= 500 ? 4 : 2
    };

    loader.trigger('error');
  };

  // update the playlist loader's state in response to a new or
  // updated playlist.
  haveMetadata = function (xhr, url) {
    var parser = undefined;
    var refreshDelay = undefined;
    var update = undefined;

    loader.setBandwidth(request || xhr);

    // any in-flight request is now finished
    request = null;

    loader.state = 'HAVE_METADATA';

    parser = new _m3u8Parser2['default'].Parser();
    parser.push(xhr.responseText);
    parser.end();
    parser.manifest.uri = url;

    // merge this playlist into the master
    update = updateMaster(loader.master, parser.manifest);
    refreshDelay = (parser.manifest.targetDuration || 10) * 1000;
    loader.targetDuration = parser.manifest.targetDuration;
    if (update) {
      loader.master = update;
      loader.updateMediaPlaylist_(parser.manifest);
    } else {
      // if the playlist is unchanged since the last reload,
      // try again after half the target duration
      refreshDelay /= 2;
    }

    // refresh live playlists after a target duration passes
    if (!loader.media().endList) {
      _globalWindow2['default'].clearTimeout(mediaUpdateTimeout);
      mediaUpdateTimeout = _globalWindow2['default'].setTimeout(function () {
        loader.trigger('mediaupdatetimeout');
      }, refreshDelay);
    }

    loader.trigger('loadedplaylist');
  };

  // initialize the loader state
  loader.state = 'HAVE_NOTHING';

  // track the time that has expired from the live window
  // this allows the seekable start range to be calculated even if
  // all segments with timing information have expired
  this.expired_ = 0;

  // capture the prototype dispose function
  dispose = this.dispose;

  /**
   * Abort any outstanding work and clean up.
   */
  loader.dispose = function () {
    loader.stopRequest();
    _globalWindow2['default'].clearTimeout(mediaUpdateTimeout);
    dispose.call(this);
  };

  loader.stopRequest = function () {
    if (request) {
      var oldRequest = request;

      request = null;
      oldRequest.onreadystatechange = null;
      oldRequest.abort();
    }
  };

  /**
   * Returns the number of enabled playlists on the master playlist object
   *
   * @return {Number} number of eneabled playlists
   */
  loader.enabledPlaylists_ = function () {
    return loader.master.playlists.filter(function (element, index, array) {
      return !element.excludeUntil || element.excludeUntil <= Date.now();
    }).length;
  };

  /**
   * Returns whether the current playlist is the lowest rendition
   *
   * @return {Boolean} true if on lowest rendition
   */
  loader.isLowestEnabledRendition_ = function () {
    var media = loader.media();

    if (!media || !media.attributes) {
      return false;
    }

    var currentBandwidth = loader.media().attributes.BANDWIDTH || 0;

    return !(loader.master.playlists.filter(function (element, index, array) {
      var enabled = typeof element.excludeUntil === 'undefined' || element.excludeUntil <= Date.now();

      if (!enabled) {
        return false;
      }

      var item = element.attributes.BANDWIDTH;

      return item <= currentBandwidth;
    }).length > 1);
  };

  /**
   * When called without any arguments, returns the currently
   * active media playlist. When called with a single argument,
   * triggers the playlist loader to asynchronously switch to the
   * specified media playlist. Calling this method while the
   * loader is in the HAVE_NOTHING causes an error to be emitted
   * but otherwise has no effect.
   *
   * @param {Object=} playlis tthe parsed media playlist
   * object to switch to
   * @return {Playlist} the current loaded media
   */
  loader.media = function (playlist) {
    var startingState = loader.state;
    var mediaChange = undefined;

    // getter
    if (!playlist) {
      return loader.media_;
    }

    // setter
    if (loader.state === 'HAVE_NOTHING') {
      throw new Error('Cannot switch media playlist from ' + loader.state);
    }

    // find the playlist object if the target playlist has been
    // specified by URI
    if (typeof playlist === 'string') {
      if (!loader.master.playlists[playlist]) {
        throw new Error('Unknown playlist URI: ' + playlist);
      }
      playlist = loader.master.playlists[playlist];
    }

    mediaChange = !loader.media_ || playlist.uri !== loader.media_.uri;

    // switch to fully loaded playlists immediately
    if (loader.master.playlists[playlist.uri].endList) {
      // abort outstanding playlist requests
      if (request) {
        request.onreadystatechange = null;
        request.abort();
        request = null;
      }
      loader.state = 'HAVE_METADATA';
      loader.media_ = playlist;

      // trigger media change if the active media has been updated
      if (mediaChange) {
        loader.trigger('mediachanging');
        loader.trigger('mediachange');
      }
      return;
    }

    // switching to the active playlist is a no-op
    if (!mediaChange) {
      return;
    }

    loader.state = 'SWITCHING_MEDIA';

    // there is already an outstanding playlist request
    if (request) {
      if ((0, _resolveUrl2['default'])(loader.master.uri, playlist.uri) === request.url) {
        // requesting to switch to the same playlist multiple times
        // has no effect after the first
        return;
      }
      request.onreadystatechange = null;
      request.abort();
      request = null;
    }

    // request the new playlist
    if (this.media_) {
      this.trigger('mediachanging');
    }
    request = this.hls_.xhr({
      uri: (0, _resolveUrl2['default'])(loader.master.uri, playlist.uri),
      withCredentials: withCredentials
    }, function (error, req) {
      // disposed
      if (!request) {
        return;
      }

      if (error) {
        return playlistRequestError(request, playlist.uri, startingState);
      }

      haveMetadata(req, playlist.uri);

      // fire loadedmetadata the first time a media playlist is loaded
      if (startingState === 'HAVE_MASTER') {
        loader.trigger('loadedmetadata');
      } else {
        loader.trigger('mediachange');
      }
    });
  };

  /**
   * set the bandwidth on an xhr to the bandwidth on the playlist
   */
  loader.setBandwidth = function (xhr) {
    loader.bandwidth = xhr.bandwidth;
  };

  // In a live playlist, don't keep track of the expired time
  // until HLS tells us that "first play" has commenced
  loader.on('firstplay', function () {
    this.trackExpiredTime_ = true;
  });

  // live playlist staleness timeout
  loader.on('mediaupdatetimeout', function () {
    if (loader.state !== 'HAVE_METADATA') {
      // only refresh the media playlist if no other activity is going on
      return;
    }

    loader.state = 'HAVE_CURRENT_METADATA';
    request = this.hls_.xhr({
      uri: (0, _resolveUrl2['default'])(loader.master.uri, loader.media().uri),
      withCredentials: withCredentials
    }, function (error, req) {
      // disposed
      if (!request) {
        return;
      }

      if (error) {
        return playlistRequestError(request, loader.media().uri);
      }
      haveMetadata(request, loader.media().uri);
    });
  });

  /**
   * pause loading of the playlist
   */
  loader.pause = function () {
    loader.stopRequest();
    _globalWindow2['default'].clearTimeout(mediaUpdateTimeout);
  };

  /**
   * start loading of the playlist
   */
  loader.load = function () {
    if (loader.started) {
      if (!loader.media().endList) {
        loader.trigger('mediaupdatetimeout');
      } else {
        loader.trigger('loadedplaylist');
      }
    } else {
      loader.start();
    }
  };

  /**
   * start loading of the playlist
   */
  loader.start = function () {
    loader.started = true;

    // request the specified URL
    request = _this.hls_.xhr({
      uri: srcUrl,
      withCredentials: withCredentials
    }, function (error, req) {
      var parser = undefined;
      var playlist = undefined;
      var i = undefined;

      // disposed
      if (!request) {
        return;
      }

      // clear the loader's request reference
      request = null;

      if (error) {
        loader.error = {
          status: req.status,
          message: 'HLS playlist request error at URL: ' + srcUrl,
          responseText: req.responseText,
          // MEDIA_ERR_NETWORK
          code: 2
        };
        return loader.trigger('error');
      }

      parser = new _m3u8Parser2['default'].Parser();
      parser.push(req.responseText);
      parser.end();

      loader.state = 'HAVE_MASTER';

      parser.manifest.uri = srcUrl;

      // loaded a master playlist
      if (parser.manifest.playlists) {
        loader.master = parser.manifest;

        // setup by-URI lookups and resolve media playlist URIs
        i = loader.master.playlists.length;
        while (i--) {
          playlist = loader.master.playlists[i];
          loader.master.playlists[playlist.uri] = playlist;
          playlist.resolvedUri = (0, _resolveUrl2['default'])(loader.master.uri, playlist.uri);
        }

        // resolve any media group URIs
        for (var groupKey in loader.master.mediaGroups.AUDIO) {
          for (var labelKey in loader.master.mediaGroups.AUDIO[groupKey]) {
            var alternateAudio = loader.master.mediaGroups.AUDIO[groupKey][labelKey];

            if (alternateAudio.uri) {
              alternateAudio.resolvedUri = (0, _resolveUrl2['default'])(loader.master.uri, alternateAudio.uri);
            }
          }
        }

        loader.trigger('loadedplaylist');
        if (!request) {
          // no media playlist was specifically selected so start
          // from the first listed one
          loader.media(parser.manifest.playlists[0]);
        }
        return;
      }

      // loaded a media playlist
      // infer a master playlist if none was previously requested
      loader.master = {
        mediaGroups: {
          'AUDIO': {},
          'VIDEO': {},
          'CLOSED-CAPTIONS': {},
          'SUBTITLES': {}
        },
        uri: _globalWindow2['default'].location.href,
        playlists: [{
          uri: srcUrl
        }]
      };
      loader.master.playlists[srcUrl] = loader.master.playlists[0];
      loader.master.playlists[0].resolvedUri = srcUrl;
      haveMetadata(req, srcUrl);
      return loader.trigger('loadedmetadata');
    });
  };
};

PlaylistLoader.prototype = new _stream2['default']();

/**
 * Update the PlaylistLoader state to reflect the changes in an
 * update to the current media playlist.
 *
 * @param {Object} update the updated media playlist object
 */
PlaylistLoader.prototype.updateMediaPlaylist_ = function (update) {
  var outdated = undefined;
  var i = undefined;
  var segment = undefined;

  outdated = this.media_;
  this.media_ = this.master.playlists[update.uri];

  if (!outdated) {
    return;
  }

  // don't track expired time until this flag is truthy
  if (!this.trackExpiredTime_) {
    return;
  }

  // if the update was the result of a rendition switch do not
  // attempt to calculate expired_ since media-sequences need not
  // correlate between renditions/variants
  if (update.uri !== outdated.uri) {
    return;
  }

  // try using precise timing from first segment of the updated
  // playlist
  if (update.segments.length) {
    if (typeof update.segments[0].start !== 'undefined') {
      this.expired_ = update.segments[0].start;
      return;
    } else if (typeof update.segments[0].end !== 'undefined') {
      this.expired_ = update.segments[0].end - update.segments[0].duration;
      return;
    }
  }

  // calculate expired by walking the outdated playlist
  i = update.mediaSequence - outdated.mediaSequence - 1;

  for (; i >= 0; i--) {
    segment = outdated.segments[i];

    if (!segment) {
      // we missed information on this segment completely between
      // playlist updates so we'll have to take an educated guess
      // once we begin buffering again, any error we introduce can
      // be corrected
      this.expired_ += outdated.targetDuration || 10;
      continue;
    }

    if (typeof segment.end !== 'undefined') {
      this.expired_ = segment.end;
      return;
    }
    if (typeof segment.start !== 'undefined') {
      this.expired_ = segment.start + segment.duration;
      return;
    }
    this.expired_ += segment.duration;
  }
};

exports['default'] = PlaylistLoader;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./resolve-url":10,"./stream":13,"global/window":22,"m3u8-parser":59}],7:[function(require,module,exports){
(function (global){
/**
 * @file playlist.js
 *
 * Playlist related utilities.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var Playlist = {
  /**
   * The number of segments that are unsafe to start playback at in
   * a live stream. Changing this value can cause playback stalls.
   * See HTTP Live Streaming, "Playing the Media Playlist File"
   * https://tools.ietf.org/html/draft-pantos-http-live-streaming-18#section-6.3.3
   */
  UNSAFE_LIVE_SEGMENTS: 3
};

/**
 * walk backward until we find a duration we can use
 * or return a failure
 *
 * @param {Playlist} playlist the playlist to walk through
 * @param {Number} endSequence the mediaSequence to stop walking on
 */

var backwardDuration = function backwardDuration(playlist, endSequence) {
  var result = 0;
  var i = endSequence - playlist.mediaSequence;
  // if a start time is available for segment immediately following
  // the interval, use it
  var segment = playlist.segments[i];

  // Walk backward until we find the latest segment with timeline
  // information that is earlier than endSequence
  if (segment) {
    if (typeof segment.start !== 'undefined') {
      return { result: segment.start, precise: true };
    }
    if (typeof segment.end !== 'undefined') {
      return {
        result: segment.end - segment.duration,
        precise: true
      };
    }
  }
  while (i--) {
    segment = playlist.segments[i];
    if (typeof segment.end !== 'undefined') {
      return { result: result + segment.end, precise: true };
    }

    result += segment.duration;

    if (typeof segment.start !== 'undefined') {
      return { result: result + segment.start, precise: true };
    }
  }
  return { result: result, precise: false };
};

/**
 * walk forward until we find a duration we can use
 * or return a failure
 *
 * @param {Playlist} playlist the playlist to walk through
 * @param {Number} endSequence the mediaSequence to stop walking on
 */
var forwardDuration = function forwardDuration(playlist, endSequence) {
  var result = 0;
  var segment = undefined;
  var i = endSequence - playlist.mediaSequence;
  // Walk forward until we find the earliest segment with timeline
  // information

  for (; i < playlist.segments.length; i++) {
    segment = playlist.segments[i];
    if (typeof segment.start !== 'undefined') {
      return {
        result: segment.start - result,
        precise: true
      };
    }

    result += segment.duration;

    if (typeof segment.end !== 'undefined') {
      return {
        result: segment.end - result,
        precise: true
      };
    }
  }
  // indicate we didn't find a useful duration estimate
  return { result: -1, precise: false };
};

/**
  * Calculate the media duration from the segments associated with a
  * playlist. The duration of a subinterval of the available segments
  * may be calculated by specifying an end index.
  *
  * @param {Object} playlist a media playlist object
  * @param {Number=} endSequence an exclusive upper boundary
  * for the playlist.  Defaults to playlist length.
  * @param {Number} expired the amount of time that has dropped
  * off the front of the playlist in a live scenario
  * @return {Number} the duration between the first available segment
  * and end index.
  */
var intervalDuration = function intervalDuration(playlist, endSequence, expired) {
  var backward = undefined;
  var forward = undefined;

  if (typeof endSequence === 'undefined') {
    endSequence = playlist.mediaSequence + playlist.segments.length;
  }

  if (endSequence < playlist.mediaSequence) {
    return 0;
  }

  // do a backward walk to estimate the duration
  backward = backwardDuration(playlist, endSequence);
  if (backward.precise) {
    // if we were able to base our duration estimate on timing
    // information provided directly from the Media Source, return
    // it
    return backward.result;
  }

  // walk forward to see if a precise duration estimate can be made
  // that way
  forward = forwardDuration(playlist, endSequence);
  if (forward.precise) {
    // we found a segment that has been buffered and so it's
    // position is known precisely
    return forward.result;
  }

  // return the less-precise, playlist-based duration estimate
  return backward.result + expired;
};

/**
  * Calculates the duration of a playlist. If a start and end index
  * are specified, the duration will be for the subset of the media
  * timeline between those two indices. The total duration for live
  * playlists is always Infinity.
  *
  * @param {Object} playlist a media playlist object
  * @param {Number=} endSequence an exclusive upper
  * boundary for the playlist. Defaults to the playlist media
  * sequence number plus its length.
  * @param {Number=} expired the amount of time that has
  * dropped off the front of the playlist in a live scenario
  * @return {Number} the duration between the start index and end
  * index.
  */
var duration = function duration(playlist, endSequence, expired) {
  if (!playlist) {
    return 0;
  }

  if (typeof expired !== 'number') {
    expired = 0;
  }

  // if a slice of the total duration is not requested, use
  // playlist-level duration indicators when they're present
  if (typeof endSequence === 'undefined') {
    // if present, use the duration specified in the playlist
    if (playlist.totalDuration) {
      return playlist.totalDuration;
    }

    // duration should be Infinity for live playlists
    if (!playlist.endList) {
      return _globalWindow2['default'].Infinity;
    }
  }

  // calculate the total duration based on the segment durations
  return intervalDuration(playlist, endSequence, expired);
};

exports.duration = duration;
/**
  * Calculates the interval of time that is currently seekable in a
  * playlist. The returned time ranges are relative to the earliest
  * moment in the specified playlist that is still available. A full
  * seekable implementation for live streams would need to offset
  * these values by the duration of content that has expired from the
  * stream.
  *
  * @param {Object} playlist a media playlist object
  * @param {Number=} expired the amount of time that has
  * dropped off the front of the playlist in a live scenario
  * @return {TimeRanges} the periods of time that are valid targets
  * for seeking
  */
var seekable = function seekable(playlist, expired) {
  var start = undefined;
  var end = undefined;
  var endSequence = undefined;

  if (typeof expired !== 'number') {
    expired = 0;
  }

  // without segments, there are no seekable ranges
  if (!playlist || !playlist.segments) {
    return (0, _videoJs.createTimeRange)();
  }
  // when the playlist is complete, the entire duration is seekable
  if (playlist.endList) {
    return (0, _videoJs.createTimeRange)(0, duration(playlist));
  }

  // live playlists should not expose three segment durations worth
  // of content from the end of the playlist
  // https://tools.ietf.org/html/draft-pantos-http-live-streaming-16#section-6.3.3
  start = intervalDuration(playlist, playlist.mediaSequence, expired);
  endSequence = Math.max(0, playlist.segments.length - Playlist.UNSAFE_LIVE_SEGMENTS);
  end = intervalDuration(playlist, playlist.mediaSequence + endSequence, expired);
  return (0, _videoJs.createTimeRange)(start, end);
};

exports.seekable = seekable;
/**
 * Determine the index of the segment that contains a specified
 * playback position in a media playlist.
 *
 * @param {Object} playlist the media playlist to query
 * @param {Number} time The number of seconds since the earliest
 * possible position to determine the containing segment for
 * @param {Number=} expired the duration of content, in
 * seconds, that has been removed from this playlist because it
 * expired
 * @return {Number} The number of the media segment that contains
 * that time position.
 */
var getMediaIndexForTime_ = function getMediaIndexForTime_(playlist, time, expired) {
  var i = undefined;
  var segment = undefined;
  var originalTime = time;
  var numSegments = playlist.segments.length;
  var lastSegment = numSegments - 1;
  var startIndex = undefined;
  var endIndex = undefined;
  var knownStart = undefined;
  var knownEnd = undefined;

  if (!playlist) {
    return 0;
  }

  // when the requested position is earlier than the current set of
  // segments, return the earliest segment index
  if (time < 0) {
    return 0;
  }

  if (time === 0 && !expired) {
    return 0;
  }

  expired = expired || 0;

  // find segments with known timing information that bound the
  // target time
  for (i = 0; i < numSegments; i++) {
    segment = playlist.segments[i];
    if (segment.end) {
      if (segment.end > time) {
        knownEnd = segment.end;
        endIndex = i;
        break;
      } else {
        knownStart = segment.end;
        startIndex = i + 1;
      }
    }
  }

  // time was equal to or past the end of the last segment in the playlist
  if (startIndex === numSegments) {
    return numSegments;
  }

  // use the bounds we just found and playlist information to
  // estimate the segment that contains the time we are looking for
  if (typeof startIndex !== 'undefined') {
    // We have a known-start point that is before our desired time so
    // walk from that point forwards
    time = time - knownStart;
    for (i = startIndex; i < (endIndex || numSegments); i++) {
      segment = playlist.segments[i];
      time -= segment.duration;

      if (time < 0) {
        return i;
      }
    }

    if (i >= endIndex) {
      // We haven't found a segment but we did hit a known end point
      // so fallback to interpolating between the segment index
      // based on the known span of the timeline we are dealing with
      // and the number of segments inside that span
      return startIndex + Math.floor((originalTime - knownStart) / (knownEnd - knownStart) * (endIndex - startIndex));
    }

    // We _still_ haven't found a segment so load the last one
    return lastSegment;
  } else if (typeof endIndex !== 'undefined') {
    // We _only_ have a known-end point that is after our desired time so
    // walk from that point backwards
    time = knownEnd - time;
    for (i = endIndex; i >= 0; i--) {
      segment = playlist.segments[i];
      time -= segment.duration;

      if (time < 0) {
        return i;
      }
    }

    // We haven't found a segment so load the first one if time is zero
    if (time === 0) {
      return 0;
    }
    return -1;
  }
  // We known nothing so walk from the front of the playlist,
  // subtracting durations until we find a segment that contains
  // time and return it
  time = time - expired;

  if (time < 0) {
    return -1;
  }

  for (i = 0; i < numSegments; i++) {
    segment = playlist.segments[i];
    time -= segment.duration;
    if (time < 0) {
      return i;
    }
  }
  // We are out of possible candidates so load the last one...
  // The last one is the least likely to overlap a buffer and therefore
  // the one most likely to tell us something about the timeline
  return lastSegment;
};

exports.getMediaIndexForTime_ = getMediaIndexForTime_;
Playlist.duration = duration;
Playlist.seekable = seekable;
Playlist.getMediaIndexForTime_ = getMediaIndexForTime_;

// exports
exports['default'] = Playlist;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":22}],8:[function(require,module,exports){
(function (global){
/**
 * ranges
 *
 * Utilities for working with TimeRanges.
 *
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// Fudge factor to account for TimeRanges rounding
var TIME_FUDGE_FACTOR = 1 / 30;

/**
 * Clamps a value to within a range
 * @param {Number} num - the value to clamp
 * @param {Number} start - the start of the range to clamp within, inclusive
 * @param {Number} end - the end of the range to clamp within, inclusive
 * @return {Number}
 */
var clamp = function clamp(num, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var start = _ref2[0];
  var end = _ref2[1];

  return Math.min(Math.max(start, num), end);
};
var filterRanges = function filterRanges(timeRanges, predicate) {
  var results = [];
  var i = undefined;

  if (timeRanges && timeRanges.length) {
    // Search for ranges that match the predicate
    for (i = 0; i < timeRanges.length; i++) {
      if (predicate(timeRanges.start(i), timeRanges.end(i))) {
        results.push([timeRanges.start(i), timeRanges.end(i)]);
      }
    }
  }

  return _videoJs2['default'].createTimeRanges(results);
};

/**
 * Attempts to find the buffered TimeRange that contains the specified
 * time.
 * @param {TimeRanges} buffered - the TimeRanges object to query
 * @param {number} time  - the time to filter on.
 * @returns {TimeRanges} a new TimeRanges object
 */
var findRange = function findRange(buffered, time) {
  return filterRanges(buffered, function (start, end) {
    return start - TIME_FUDGE_FACTOR <= time && end + TIME_FUDGE_FACTOR >= time;
  });
};

/**
 * Returns the TimeRanges that begin later than the specified time.
 * @param {TimeRanges} timeRanges - the TimeRanges object to query
 * @param {number} time - the time to filter on.
 * @returns {TimeRanges} a new TimeRanges object.
 */
var findNextRange = function findNextRange(timeRanges, time) {
  return filterRanges(timeRanges, function (start) {
    return start - TIME_FUDGE_FACTOR >= time;
  });
};

/**
 * Returns gaps within a list of TimeRanges
 * @param {TimeRanges} buffered - the TimeRanges object
 * @return {TimeRanges} a TimeRanges object of gaps
 */
var findGaps = function findGaps(buffered) {
  if (buffered.length < 2) {
    return _videoJs2['default'].createTimeRanges();
  }

  var ranges = [];

  for (var i = 1; i < buffered.length; i++) {
    var start = buffered.end(i - 1);
    var end = buffered.start(i);

    ranges.push([start, end]);
  }

  return _videoJs2['default'].createTimeRanges(ranges);
};

/**
 * Search for a likely end time for the segment that was just appened
 * based on the state of the `buffered` property before and after the
 * append. If we fin only one such uncommon end-point return it.
 * @param {TimeRanges} original - the buffered time ranges before the update
 * @param {TimeRanges} update - the buffered time ranges after the update
 * @returns {Number|null} the end time added between `original` and `update`,
 * or null if one cannot be unambiguously determined.
 */
var findSoleUncommonTimeRangesEnd = function findSoleUncommonTimeRangesEnd(original, update) {
  var i = undefined;
  var start = undefined;
  var end = undefined;
  var result = [];
  var edges = [];

  // In order to qualify as a possible candidate, the end point must:
  //  1) Not have already existed in the `original` ranges
  //  2) Not result from the shrinking of a range that already existed
  //     in the `original` ranges
  //  3) Not be contained inside of a range that existed in `original`
  var overlapsCurrentEnd = function overlapsCurrentEnd(span) {
    return span[0] <= end && span[1] >= end;
  };

  if (original) {
    // Save all the edges in the `original` TimeRanges object
    for (i = 0; i < original.length; i++) {
      start = original.start(i);
      end = original.end(i);

      edges.push([start, end]);
    }
  }

  if (update) {
    // Save any end-points in `update` that are not in the `original`
    // TimeRanges object
    for (i = 0; i < update.length; i++) {
      start = update.start(i);
      end = update.end(i);

      if (edges.some(overlapsCurrentEnd)) {
        continue;
      }

      // at this point it must be a unique non-shrinking end edge
      result.push(end);
    }
  }

  // we err on the side of caution and return null if didn't find
  // exactly *one* differing end edge in the search above
  if (result.length !== 1) {
    return null;
  }

  return result[0];
};

/**
 * Calculate the intersection of two TimeRanges
 * @param {TimeRanges} bufferA
 * @param {TimeRanges} bufferB
 * @returns {TimeRanges} The interesection of `bufferA` with `bufferB`
 */
var bufferIntersection = function bufferIntersection(bufferA, bufferB) {
  var start = null;
  var end = null;
  var arity = 0;
  var extents = [];
  var ranges = [];

  if (!bufferA || !bufferA.length || !bufferB || !bufferB.length) {
    return _videoJs2['default'].createTimeRange();
  }

  // Handle the case where we have both buffers and create an
  // intersection of the two
  var count = bufferA.length;

  // A) Gather up all start and end times
  while (count--) {
    extents.push({ time: bufferA.start(count), type: 'start' });
    extents.push({ time: bufferA.end(count), type: 'end' });
  }
  count = bufferB.length;
  while (count--) {
    extents.push({ time: bufferB.start(count), type: 'start' });
    extents.push({ time: bufferB.end(count), type: 'end' });
  }
  // B) Sort them by time
  extents.sort(function (a, b) {
    return a.time - b.time;
  });

  // C) Go along one by one incrementing arity for start and decrementing
  //    arity for ends
  for (count = 0; count < extents.length; count++) {
    if (extents[count].type === 'start') {
      arity++;

      // D) If arity is ever incremented to 2 we are entering an
      //    overlapping range
      if (arity === 2) {
        start = extents[count].time;
      }
    } else if (extents[count].type === 'end') {
      arity--;

      // E) If arity is ever decremented to 1 we leaving an
      //    overlapping range
      if (arity === 1) {
        end = extents[count].time;
      }
    }

    // F) Record overlapping ranges
    if (start !== null && end !== null) {
      ranges.push([start, end]);
      start = null;
      end = null;
    }
  }

  return _videoJs2['default'].createTimeRanges(ranges);
};

/**
 * Calculates the percentage of `segmentRange` that overlaps the
 * `buffered` time ranges.
 * @param {TimeRanges} segmentRange - the time range that the segment
 * covers adjusted according to currentTime
 * @param {TimeRanges} referenceRange - the original time range that the
 * segment covers
 * @param {Number} currentTime - time in seconds where the current playback
 * is at
 * @param {TimeRanges} buffered - the currently buffered time ranges
 * @returns {Number} percent of the segment currently buffered
 */
var calculateBufferedPercent = function calculateBufferedPercent(adjustedRange, referenceRange, currentTime, buffered) {
  var referenceDuration = referenceRange.end(0) - referenceRange.start(0);
  var adjustedDuration = adjustedRange.end(0) - adjustedRange.start(0);
  var bufferMissingFromAdjusted = referenceDuration - adjustedDuration;
  var adjustedIntersection = bufferIntersection(adjustedRange, buffered);
  var referenceIntersection = bufferIntersection(referenceRange, buffered);
  var adjustedOverlap = 0;
  var referenceOverlap = 0;

  var count = adjustedIntersection.length;

  while (count--) {
    adjustedOverlap += adjustedIntersection.end(count) - adjustedIntersection.start(count);

    // If the current overlap segment starts at currentTime, then increase the
    // overlap duration so that it actually starts at the beginning of referenceRange
    // by including the difference between the two Range's durations
    // This is a work around for the way Flash has no buffer before currentTime
    if (adjustedIntersection.start(count) === currentTime) {
      adjustedOverlap += bufferMissingFromAdjusted;
    }
  }

  count = referenceIntersection.length;

  while (count--) {
    referenceOverlap += referenceIntersection.end(count) - referenceIntersection.start(count);
  }

  // Use whichever value is larger for the percentage-buffered since that value
  // is likely more accurate because the only way
  return Math.max(adjustedOverlap, referenceOverlap) / referenceDuration * 100;
};

/**
 * Return the amount of a range specified by the startOfSegment and segmentDuration
 * overlaps the current buffered content.
 *
 * @param {Number} startOfSegment - the time where the segment begins
 * @param {Number} segmentDuration - the duration of the segment in seconds
 * @param {Number} currentTime - time in seconds where the current playback
 * is at
 * @param {TimeRanges} buffered - the state of the buffer
 * @returns {Number} percentage of the segment's time range that is
 * already in `buffered`
 */
var getSegmentBufferedPercent = function getSegmentBufferedPercent(startOfSegment, segmentDuration, currentTime, buffered) {
  var endOfSegment = startOfSegment + segmentDuration;

  // The entire time range of the segment
  var originalSegmentRange = _videoJs2['default'].createTimeRanges([[startOfSegment, endOfSegment]]);

  // The adjusted segment time range that is setup such that it starts
  // no earlier than currentTime
  // Flash has no notion of a back-buffer so adjustedSegmentRange adjusts
  // for that and the function will still return 100% if a only half of a
  // segment is actually in the buffer as long as the currentTime is also
  // half-way through the segment
  var adjustedSegmentRange = _videoJs2['default'].createTimeRanges([[clamp(startOfSegment, [currentTime, endOfSegment]), endOfSegment]]);

  // This condition happens when the currentTime is beyond the segment's
  // end time
  if (adjustedSegmentRange.start(0) === adjustedSegmentRange.end(0)) {
    return 0;
  }

  var percent = calculateBufferedPercent(adjustedSegmentRange, originalSegmentRange, currentTime, buffered);

  // If the segment is reported as having a zero duration, return 0%
  // since it is likely that we will need to fetch the segment
  if (isNaN(percent) || percent === Infinity || percent === -Infinity) {
    return 0;
  }

  return percent;
};

exports['default'] = {
  findRange: findRange,
  findNextRange: findNextRange,
  findGaps: findGaps,
  findSoleUncommonTimeRangesEnd: findSoleUncommonTimeRangesEnd,
  getSegmentBufferedPercent: getSegmentBufferedPercent,
  TIME_FUDGE_FACTOR: TIME_FUDGE_FACTOR
};
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
/**
 * Enable/disable playlist function. It is intended to have the first two
 * arguments partially-applied in order to create the final per-playlist
 * function.
 *
 * @param {PlaylistLoader} playlist - The rendition or media-playlist
 * @param {Function} changePlaylistFn - A function to be called after a
 * playlist's enabled-state has been changed. Will NOT be called if a
 * playlist's enabled-state is unchanged
 * @param {Boolean=} enable - Value to set the playlist enabled-state to
 * or if undefined returns the current enabled-state for the playlist
 * @return {Boolean} The current enabled-state of the playlist
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var enableFunction = function enableFunction(playlist, changePlaylistFn, enable) {
  var currentlyEnabled = typeof playlist.excludeUntil === 'undefined' || playlist.excludeUntil <= Date.now();

  if (typeof enable === 'undefined') {
    return currentlyEnabled;
  }

  if (enable !== currentlyEnabled) {
    if (enable) {
      delete playlist.excludeUntil;
    } else {
      playlist.excludeUntil = Infinity;
    }

    // Ensure the outside world knows about our changes
    changePlaylistFn();
  }

  return enable;
};

/**
 * The representation object encapsulates the publicly visible information
 * in a media playlist along with a setter/getter-type function (enabled)
 * for changing the enabled-state of a particular playlist entry
 *
 * @class Representation
 */

var Representation = function Representation(hlsHandler, playlist, id) {
  _classCallCheck(this, Representation);

  // Get a reference to a bound version of fastQualityChange_
  var fastChangeFunction = hlsHandler.masterPlaylistController_.fastQualityChange_.bind(hlsHandler.masterPlaylistController_);

  // Carefully descend into the playlist's attributes since most
  // properties are optional
  if (playlist.attributes) {
    var attributes = playlist.attributes;

    if (attributes.RESOLUTION) {
      var resolution = attributes.RESOLUTION;

      this.width = resolution.width;
      this.height = resolution.height;
    }

    this.bandwidth = attributes.BANDWIDTH;
  }

  // The id is simply the ordinality of the media playlist
  // within the master playlist
  this.id = id;

  // Partially-apply the enableFunction to create a playlist-
  // specific variant
  this.enabled = enableFunction.bind(this, playlist, fastChangeFunction);
}

/**
 * A mixin function that adds the `representations` api to an instance
 * of the HlsHandler class
 * @param {HlsHandler} hlsHandler - An instance of HlsHandler to add the
 * representation API into
 */
;

var renditionSelectionMixin = function renditionSelectionMixin(hlsHandler) {
  var playlists = hlsHandler.playlists;

  // Add a single API-specific function to the HlsHandler instance
  hlsHandler.representations = function () {
    return playlists.master.playlists.map(function (e, i) {
      return new Representation(hlsHandler, e, i);
    });
  };
};

exports['default'] = renditionSelectionMixin;
module.exports = exports['default'];
},{}],10:[function(require,module,exports){
/**
 * @file resolve-url.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

/**
 * Constructs a new URI by interpreting a path relative to another
 * URI.
 *
 * @see http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 * @param {String} basePath a relative or absolute URI
 * @param {String} path a path part to combine with the base
 * @return {String} a URI that is equivalent to composing `base`
 * with `path`
 */
var resolveUrl = function resolveUrl(basePath, path) {
  // use the base element to get the browser to handle URI resolution
  var oldBase = _globalDocument2['default'].querySelector('base');
  var docHead = _globalDocument2['default'].querySelector('head');
  var a = _globalDocument2['default'].createElement('a');
  var base = oldBase;
  var oldHref = undefined;
  var result = undefined;

  // prep the document
  if (oldBase) {
    oldHref = oldBase.href;
  } else {
    base = docHead.appendChild(_globalDocument2['default'].createElement('base'));
  }

  base.href = basePath;
  a.href = path;
  result = a.href;

  // clean up
  if (oldBase) {
    oldBase.href = oldHref;
  } else {
    docHead.removeChild(base);
  }
  return result;
};

exports['default'] = resolveUrl;
module.exports = exports['default'];
},{"global/document":21}],11:[function(require,module,exports){
(function (global){
/**
 * @file segment-loader.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ranges = require('./ranges');

var _ranges2 = _interopRequireDefault(_ranges);

var _playlist = require('./playlist');

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _sourceUpdater = require('./source-updater');

var _sourceUpdater2 = _interopRequireDefault(_sourceUpdater);

var _aesDecrypter = require('aes-decrypter');

var _muxJsLibMp4Probe = require('mux.js/lib/mp4/probe');

var _muxJsLibMp4Probe2 = _interopRequireDefault(_muxJsLibMp4Probe);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

// in ms
var CHECK_BUFFER_DELAY = 500;

/**
 * Updates segment with information about its end-point in time and, optionally,
 * the segment duration if we have enough information to determine a segment duration
 * accurately.
 *
 * @param {Object} playlist a media playlist object
 * @param {Number} segmentIndex the index of segment we last appended
 * @param {Number} segmentEnd the known of the segment referenced by segmentIndex
 */
var updateSegmentMetadata = function updateSegmentMetadata(playlist, segmentIndex, segmentEnd) {
  if (!playlist) {
    return false;
  }

  var segment = playlist.segments[segmentIndex];
  var previousSegment = playlist.segments[segmentIndex - 1];

  if (segmentEnd && segment) {
    segment.end = segmentEnd;

    // fix up segment durations based on segment end data
    if (!previousSegment) {
      // first segment is always has a start time of 0 making its duration
      // equal to the segment end
      segment.duration = segment.end;
    } else if (previousSegment.end) {
      segment.duration = segment.end - previousSegment.end;
    }
    return true;
  }
  return false;
};

/**
 * Determines if we should call endOfStream on the media source based
 * on the state of the buffer or if appened segment was the final
 * segment in the playlist.
 *
 * @param {Object} playlist a media playlist object
 * @param {Object} mediaSource the MediaSource object
 * @param {Number} segmentIndex the index of segment we last appended
 * @returns {Boolean} do we need to call endOfStream on the MediaSource
 */
var detectEndOfStream = function detectEndOfStream(playlist, mediaSource, segmentIndex) {
  if (!playlist) {
    return false;
  }

  var segments = playlist.segments;

  // determine a few boolean values to help make the branch below easier
  // to read
  var appendedLastSegment = segmentIndex === segments.length;

  // if we've buffered to the end of the video, we need to call endOfStream
  // so that MediaSources can trigger the `ended` event when it runs out of
  // buffered data instead of waiting for me
  return playlist.endList && mediaSource.readyState === 'open' && appendedLastSegment;
};

/**
 * Turns segment byterange into a string suitable for use in
 * HTTP Range requests
 */
var byterangeStr = function byterangeStr(byterange) {
  var byterangeStart = undefined;
  var byterangeEnd = undefined;

  // `byterangeEnd` is one less than `offset + length` because the HTTP range
  // header uses inclusive ranges
  byterangeEnd = byterange.offset + byterange.length - 1;
  byterangeStart = byterange.offset;
  return 'bytes=' + byterangeStart + '-' + byterangeEnd;
};

/**
 * Defines headers for use in the xhr request for a particular segment.
 */
var segmentXhrHeaders = function segmentXhrHeaders(segment) {
  var headers = {};

  if ('byterange' in segment) {
    headers.Range = byterangeStr(segment.byterange);
  }
  return headers;
};

/**
 * Returns a unique string identifier for a media initialization
 * segment.
 */
var initSegmentId = function initSegmentId(initSegment) {
  var byterange = initSegment.byterange || {
    length: Infinity,
    offset: 0
  };

  return [byterange.length, byterange.offset, initSegment.resolvedUri].join(',');
};

/**
 * An object that manages segment loading and appending.
 *
 * @class SegmentLoader
 * @param {Object} options required and optional options
 * @extends videojs.EventTarget
 */

var SegmentLoader = (function (_videojs$EventTarget) {
  _inherits(SegmentLoader, _videojs$EventTarget);

  function SegmentLoader(options) {
    _classCallCheck(this, SegmentLoader);

    _get(Object.getPrototypeOf(SegmentLoader.prototype), 'constructor', this).call(this);
    var settings = undefined;

    // check pre-conditions
    if (!options) {
      throw new TypeError('Initialization options are required');
    }
    if (typeof options.currentTime !== 'function') {
      throw new TypeError('No currentTime getter specified');
    }
    if (!options.mediaSource) {
      throw new TypeError('No MediaSource specified');
    }
    settings = _videoJs2['default'].mergeOptions(_videoJs2['default'].options.hls, options);

    // public properties
    this.state = 'INIT';
    this.bandwidth = settings.bandwidth;
    this.roundTrip = NaN;
    this.resetStats_();

    // private settings
    this.hasPlayed_ = settings.hasPlayed;
    this.currentTime_ = settings.currentTime;
    this.seekable_ = settings.seekable;
    this.seeking_ = settings.seeking;
    this.setCurrentTime_ = settings.setCurrentTime;
    this.mediaSource_ = settings.mediaSource;

    this.hls_ = settings.hls;

    // private instance variables
    this.checkBufferTimeout_ = null;
    this.error_ = void 0;
    this.expired_ = 0;
    this.timeCorrection_ = 0;
    this.currentTimeline_ = -1;
    this.zeroOffset_ = NaN;
    this.xhr_ = null;
    this.pendingSegment_ = null;
    this.mimeType_ = null;
    this.sourceUpdater_ = null;
    this.xhrOptions_ = null;

    this.activeInitSegmentId_ = null;
    this.initSegments_ = {};
  }

  /**
   * reset all of our media stats
   *
   * @private
   */

  _createClass(SegmentLoader, [{
    key: 'resetStats_',
    value: function resetStats_() {
      this.mediaBytesTransferred = 0;
      this.mediaRequests = 0;
      this.mediaTransferDuration = 0;
    }

    /**
     * dispose of the SegmentLoader and reset to the default state
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      this.state = 'DISPOSED';
      this.abort_();
      if (this.sourceUpdater_) {
        this.sourceUpdater_.dispose();
      }
      this.resetStats_();
    }

    /**
     * abort anything that is currently doing on with the SegmentLoader
     * and reset to a default state
     */
  }, {
    key: 'abort',
    value: function abort() {
      if (this.state !== 'WAITING') {
        return;
      }

      this.abort_();

      // don't wait for buffer check timeouts to begin fetching the
      // next segment
      if (!this.paused()) {
        this.state = 'READY';
        this.fillBuffer_();
      }
    }

    /**
     * set an error on the segment loader and null out any pending segements
     *
     * @param {Error} error the error to set on the SegmentLoader
     * @return {Error} the error that was set or that is currently set
     */
  }, {
    key: 'error',
    value: function error(_error) {
      if (typeof _error !== 'undefined') {
        this.error_ = _error;
      }

      this.pendingSegment_ = null;
      return this.error_;
    }

    /**
     * load a playlist and start to fill the buffer
     */
  }, {
    key: 'load',
    value: function load() {
      // un-pause
      this.monitorBuffer_();

      // if we don't have a playlist yet, keep waiting for one to be
      // specified
      if (!this.playlist_) {
        return;
      }

      // if all the configuration is ready, initialize and begin loading
      if (this.state === 'INIT' && this.mimeType_) {
        return this.init_();
      }

      // if we're in the middle of processing a segment already, don't
      // kick off an additional segment request
      if (!this.sourceUpdater_ || this.state !== 'READY' && this.state !== 'INIT') {
        return;
      }

      this.state = 'READY';
      this.fillBuffer_();
    }

    /**
     * set a playlist on the segment loader
     *
     * @param {PlaylistLoader} media the playlist to set on the segment loader
     */
  }, {
    key: 'playlist',
    value: function playlist(media) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!media) {
        return;
      }

      this.playlist_ = media;
      this.xhrOptions_ = options;

      // if we were unpaused but waiting for a playlist, start
      // buffering now
      if (this.mimeType_ && this.state === 'INIT' && !this.paused()) {
        return this.init_();
      }
    }

    /**
     * Prevent the loader from fetching additional segments. If there
     * is a segment request outstanding, it will finish processing
     * before the loader halts. A segment loader can be unpaused by
     * calling load().
     */
  }, {
    key: 'pause',
    value: function pause() {
      if (this.checkBufferTimeout_) {
        _globalWindow2['default'].clearTimeout(this.checkBufferTimeout_);

        this.checkBufferTimeout_ = null;
      }
    }

    /**
     * Returns whether the segment loader is fetching additional
     * segments when given the opportunity. This property can be
     * modified through calls to pause() and load().
     */
  }, {
    key: 'paused',
    value: function paused() {
      return this.checkBufferTimeout_ === null;
    }

    /**
     * setter for expired time on the SegmentLoader
     *
     * @param {Number} expired the exired time to set
     */
  }, {
    key: 'expired',
    value: function expired(_expired) {
      this.expired_ = _expired;
    }

    /**
     * create/set the following mimetype on the SourceBuffer through a
     * SourceUpdater
     *
     * @param {String} mimeType the mime type string to use
     */
  }, {
    key: 'mimeType',
    value: function mimeType(_mimeType) {
      if (this.mimeType_) {
        return;
      }

      this.mimeType_ = _mimeType;
      // if we were unpaused but waiting for a sourceUpdater, start
      // buffering now
      if (this.playlist_ && this.state === 'INIT' && !this.paused()) {
        this.init_();
      }
    }

    /**
     * As long as the SegmentLoader is in the READY state, periodically
     * invoke fillBuffer_().
     *
     * @private
     */
  }, {
    key: 'monitorBuffer_',
    value: function monitorBuffer_() {
      if (this.state === 'READY') {
        this.fillBuffer_();
      }

      if (this.checkBufferTimeout_) {
        _globalWindow2['default'].clearTimeout(this.checkBufferTimeout_);
      }

      this.checkBufferTimeout_ = _globalWindow2['default'].setTimeout(this.monitorBuffer_.bind(this), CHECK_BUFFER_DELAY);
    }

    /**
     * Determines what segment request should be made, given current
     * playback state.
     *
     * @param {TimeRanges} buffered - the state of the buffer
     * @param {Object} playlist - the playlist object to fetch segments from
     * @param {Number} currentTime - the playback position in seconds
     * @param {Boolean} hasPlayed - if the player has played before
     * @param {Number} expired - the seconds expired off the playlist
     * @param {Number} timeCorrection - correction value to add to current time when
     *  when determining media index to use
     * @returns {Object} a segment info object that describes the
     * request that should be made or null if no request is necessary
     */
  }, {
    key: 'checkBuffer_',
    value: function checkBuffer_(buffered, playlist, currentTime, hasPlayed, expired, timeCorrection) {
      var currentBuffered = _ranges2['default'].findRange(buffered, currentTime);

      // There are times when MSE reports the first segment as starting a
      // little after 0-time so add a fudge factor to try and fix those cases
      // or we end up fetching the same first segment over and over
      if (currentBuffered.length === 0 && currentTime === 0) {
        currentBuffered = _ranges2['default'].findRange(buffered, currentTime + _ranges2['default'].TIME_FUDGE_FACTOR);
      }

      var bufferedTime = undefined;
      var currentBufferedEnd = undefined;
      var mediaIndex = undefined;

      if (!playlist.segments.length) {
        return null;
      }

      if (currentBuffered.length === 0) {
        // find the segment containing currentTime
        mediaIndex = (0, _playlist.getMediaIndexForTime_)(playlist, currentTime + timeCorrection, expired);
      } else {
        // find the segment adjacent to the end of the current
        // buffered region
        currentBufferedEnd = currentBuffered.end(0);
        bufferedTime = Math.max(0, currentBufferedEnd - currentTime);

        // if the video has not yet played only, and we already have
        // one segment downloaded do nothing
        if (!hasPlayed && bufferedTime >= 1) {
          return null;
        }

        // if there is plenty of content buffered, and the video has
        // been played before relax for awhile
        if (hasPlayed && bufferedTime >= _config2['default'].GOAL_BUFFER_LENGTH) {
          return null;
        }
        mediaIndex = (0, _playlist.getMediaIndexForTime_)(playlist, currentBufferedEnd + timeCorrection, expired);
      }

      return mediaIndex;
    }

    /**
     * abort all pending xhr requests and null any pending segements
     *
     * @private
     */
  }, {
    key: 'abort_',
    value: function abort_() {
      if (this.xhr_) {
        this.xhr_.abort();
      }

      // clear out the segment being processed
      this.pendingSegment_ = null;
    }

    /**
     * Once all the starting parameters have been specified, begin
     * operation. This method should only be invoked from the INIT
     * state.
     */
  }, {
    key: 'init_',
    value: function init_() {
      this.state = 'READY';
      this.sourceUpdater_ = new _sourceUpdater2['default'](this.mediaSource_, this.mimeType_);
      this.clearBuffer();
      return this.fillBuffer_();
    }

    /**
     * fill the buffer with segements unless the
     * sourceBuffers are currently updating
     *
     * @private
     */
  }, {
    key: 'fillBuffer_',
    value: function fillBuffer_() {
      if (this.sourceUpdater_.updating()) {
        return;
      }

      var buffered = this.sourceUpdater_.buffered();
      var playlist = this.playlist_;
      var currentTime = this.currentTime_();
      var hasPlayed = this.hasPlayed_();
      var expired = this.expired_;
      var timeCorrection = this.timeCorrection_;

      // see if we need to begin loading immediately
      var requestIndex = this.checkBuffer_(buffered, playlist, currentTime, hasPlayed, expired, timeCorrection);

      if (requestIndex === null) {
        return;
      }

      var isEndOfStream = detectEndOfStream(playlist, this.mediaSource_, requestIndex);

      if (isEndOfStream) {
        this.mediaSource_.endOfStream();
        return;
      }

      if (requestIndex === playlist.segments.length - 1 && this.mediaSource_.readyState === 'ended' && !this.seeking_()) {
        return;
      }

      if (requestIndex < 0 || requestIndex >= playlist.segments.length) {
        return;
      }

      var segment = this.playlist_.segments[requestIndex];

      var request = {
        // resolve the segment URL relative to the playlist
        uri: segment.resolvedUri,
        // the segment's mediaIndex at the time it was requested
        mediaIndex: requestIndex,
        // the segment's playlist
        playlist: playlist,
        // unencrypted bytes of the segment
        bytes: null,
        // when a key is defined for this segment, the encrypted bytes
        encryptedBytes: null,
        // the state of the buffer before a segment is appended will be
        // stored here so that the actual segment duration can be
        // determined after it has been appended
        buffered: null,
        // The target timestampOffset for this segment when we append it
        // to the source buffer
        timestampOffset: NaN,
        // The timeline that the segment is in
        timeline: segment.timeline,
        // The expected duration of the segment in seconds
        duration: segment.duration
      };

      var startOfSegment = (0, _playlist.duration)(playlist, playlist.mediaSequence + request.mediaIndex, expired);

      //   (we are crossing a discontinuity somehow)
      // - The "timestampOffset" for the start of this segment is less than
      //   the currently set timestampOffset
      request.timestampOffset = this.sourceUpdater_.timestampOffset();
      if (segment.timeline !== this.currentTimeline_ || startOfSegment < this.sourceUpdater_.timestampOffset()) {
        request.timestampOffset = startOfSegment;
      }

      // Sanity check the segment-index determining logic by calcuating the
      // percentage of the chosen segment that is buffered. If more than 90%
      // of the segment is buffered then fetching it will likely not help in
      // any way
      var percentBuffered = _ranges2['default'].getSegmentBufferedPercent(startOfSegment, segment.duration, currentTime, buffered);

      if (percentBuffered >= 90) {
        // Increment the timeCorrection_ variable to push the fetcher forward
        // in time and hopefully skip any gaps or flaws in our understanding
        // of the media
        var correctionApplied = this.incrementTimeCorrection_(playlist.targetDuration / 2, 1);

        if (correctionApplied && !this.paused()) {
          this.fillBuffer_();
        }

        return;
      }

      this.loadSegment_(request);
    }

    /**
     * trim the back buffer so we only remove content
     * on segment boundaries
     *
     * @private
     *
     * @param {Object} segmentInfo - the current segment
     * @returns {Number} removeToTime - the end point in time, in seconds
     * that the the buffer should be trimmed.
     */
  }, {
    key: 'trimBuffer_',
    value: function trimBuffer_(segmentInfo) {
      var seekable = this.seekable_();
      var currentTime = this.currentTime_();
      var removeToTime = 0;

      // Chrome has a hard limit of 150mb of
      // buffer and a very conservative "garbage collector"
      // We manually clear out the old buffer to ensure
      // we don't trigger the QuotaExceeded error
      // on the source buffer during subsequent appends

      // If we have a seekable range use that as the limit for what can be removed safely
      // otherwise remove anything older than 1 minute before the current play head
      if (seekable.length && seekable.start(0) > 0 && seekable.start(0) < currentTime) {
        removeToTime = seekable.start(0);
      } else {
        removeToTime = currentTime - 60;
      }

      // If we are going to remove time from the front of the buffer, make
      // sure we aren't discarding a partial segment to avoid throwing
      // PLAYER_ERR_TIMEOUT while trying to read a partially discarded segment
      for (var i = 0; i <= segmentInfo.playlist.segments.length; i++) {
        // Loop through the segments and calculate the duration to compare
        // against the removeToTime
        var removeDuration = (0, _playlist.duration)(segmentInfo.playlist, segmentInfo.playlist.mediaSequence + i, this.expired_);

        // If we are close to next segment begining, remove to end of previous
        // segment instead
        var previousDuration = (0, _playlist.duration)(segmentInfo.playlist, segmentInfo.playlist.mediaSequence + (i - 1), this.expired_);

        if (removeDuration >= removeToTime) {
          removeToTime = previousDuration;
          break;
        }
      }
      return removeToTime;
    }

    /**
     * load a specific segment from a request into the buffer
     *
     * @private
     */
  }, {
    key: 'loadSegment_',
    value: function loadSegment_(segmentInfo) {
      var segment = undefined;
      var keyXhr = undefined;
      var initSegmentXhr = undefined;
      var segmentXhr = undefined;
      var removeToTime = 0;

      removeToTime = this.trimBuffer_(segmentInfo);

      if (removeToTime > 0) {
        this.sourceUpdater_.remove(0, removeToTime);
      }

      segment = segmentInfo.playlist.segments[segmentInfo.mediaIndex];

      // optionally, request the decryption key
      if (segment.key) {
        var keyRequestOptions = _videoJs2['default'].mergeOptions(this.xhrOptions_, {
          uri: segment.key.resolvedUri,
          responseType: 'arraybuffer'
        });

        keyXhr = this.hls_.xhr(keyRequestOptions, this.handleResponse_.bind(this));
      }

      // optionally, request the associated media init segment
      if (segment.map && !this.initSegments_[initSegmentId(segment.map)]) {
        var initSegmentOptions = _videoJs2['default'].mergeOptions(this.xhrOptions_, {
          uri: segment.map.resolvedUri,
          responseType: 'arraybuffer',
          headers: segmentXhrHeaders(segment.map)
        });

        initSegmentXhr = this.hls_.xhr(initSegmentOptions, this.handleResponse_.bind(this));
      }
      this.pendingSegment_ = segmentInfo;

      var segmentRequestOptions = _videoJs2['default'].mergeOptions(this.xhrOptions_, {
        uri: segmentInfo.uri,
        responseType: 'arraybuffer',
        headers: segmentXhrHeaders(segment)
      });

      segmentXhr = this.hls_.xhr(segmentRequestOptions, this.handleResponse_.bind(this));

      this.xhr_ = {
        keyXhr: keyXhr,
        initSegmentXhr: initSegmentXhr,
        segmentXhr: segmentXhr,
        abort: function abort() {
          if (this.segmentXhr) {
            // Prevent error handler from running.
            this.segmentXhr.onreadystatechange = null;
            this.segmentXhr.abort();
            this.segmentXhr = null;
          }
          if (this.initSegmentXhr) {
            // Prevent error handler from running.
            this.initSegmentXhr.onreadystatechange = null;
            this.initSegmentXhr.abort();
            this.initSegmentXhr = null;
          }
          if (this.keyXhr) {
            // Prevent error handler from running.
            this.keyXhr.onreadystatechange = null;
            this.keyXhr.abort();
            this.keyXhr = null;
          }
        }
      };

      this.state = 'WAITING';
    }

    /**
     * triggered when a segment response is received
     *
     * @private
     */
  }, {
    key: 'handleResponse_',
    value: function handleResponse_(error, request) {
      var segmentInfo = undefined;
      var segment = undefined;
      var keyXhrRequest = undefined;
      var view = undefined;

      // timeout of previously aborted request
      if (!this.xhr_ || request !== this.xhr_.segmentXhr && request !== this.xhr_.keyXhr && request !== this.xhr_.initSegmentXhr) {
        return;
      }

      segmentInfo = this.pendingSegment_;
      segment = segmentInfo.playlist.segments[segmentInfo.mediaIndex];

      // if a request times out, reset bandwidth tracking
      if (request.timedout) {
        this.abort_();
        this.bandwidth = 1;
        this.roundTrip = NaN;
        this.state = 'READY';
        return this.trigger('progress');
      }

      // trigger an event for other errors
      if (!request.aborted && error) {
        // abort will clear xhr_
        keyXhrRequest = this.xhr_.keyXhr;
        this.abort_();
        this.error({
          status: request.status,
          message: request === keyXhrRequest ? 'HLS key request error at URL: ' + segment.key.uri : 'HLS segment request error at URL: ' + segmentInfo.uri,
          code: 2,
          xhr: request
        });
        this.state = 'READY';
        this.pause();
        return this.trigger('error');
      }

      // stop processing if the request was aborted
      if (!request.response) {
        this.abort_();
        return;
      }

      if (request === this.xhr_.segmentXhr) {
        // the segment request is no longer outstanding
        this.xhr_.segmentXhr = null;

        // calculate the download bandwidth based on segment request
        this.roundTrip = request.roundTripTime;
        this.bandwidth = request.bandwidth;
        this.mediaBytesTransferred += request.bytesReceived || 0;
        this.mediaRequests += 1;
        this.mediaTransferDuration += request.roundTripTime || 0;

        if (segment.key) {
          segmentInfo.encryptedBytes = new Uint8Array(request.response);
        } else {
          segmentInfo.bytes = new Uint8Array(request.response);
        }
      }

      if (request === this.xhr_.keyXhr) {
        keyXhrRequest = this.xhr_.segmentXhr;
        // the key request is no longer outstanding
        this.xhr_.keyXhr = null;

        if (request.response.byteLength !== 16) {
          this.abort_();
          this.error({
            status: request.status,
            message: 'Invalid HLS key at URL: ' + segment.key.uri,
            code: 2,
            xhr: request
          });
          this.state = 'READY';
          this.pause();
          return this.trigger('error');
        }

        view = new DataView(request.response);
        segment.key.bytes = new Uint32Array([view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12)]);

        // if the media sequence is greater than 2^32, the IV will be incorrect
        // assuming 10s segments, that would be about 1300 years
        segment.key.iv = segment.key.iv || new Uint32Array([0, 0, 0, segmentInfo.mediaIndex + segmentInfo.playlist.mediaSequence]);
      }

      if (request === this.xhr_.initSegmentXhr) {
        // the init segment request is no longer outstanding
        this.xhr_.initSegmentXhr = null;
        segment.map.bytes = new Uint8Array(request.response);
        this.initSegments_[initSegmentId(segment.map)] = segment.map;
      }

      if (!this.xhr_.segmentXhr && !this.xhr_.keyXhr && !this.xhr_.initSegmentXhr) {
        this.xhr_ = null;
        this.processResponse_();
      }
    }

    /**
     * clear anything that is currently in the buffer and throw it away
     */
  }, {
    key: 'clearBuffer',
    value: function clearBuffer() {
      if (this.sourceUpdater_ && this.sourceUpdater_.buffered().length) {
        this.sourceUpdater_.remove(0, Infinity);
      }
    }

    /**
     * Decrypt the segment that is being loaded if necessary
     *
     * @private
     */
  }, {
    key: 'processResponse_',
    value: function processResponse_() {
      var segmentInfo = undefined;
      var segment = undefined;

      this.state = 'DECRYPTING';

      segmentInfo = this.pendingSegment_;
      segment = segmentInfo.playlist.segments[segmentInfo.mediaIndex];

      // some videos don't start from presentation time zero
      // if that is the case, set the timestamp offset on the first
      // segment to adjust them so that it is not necessary to seek
      // before playback can begin
      if (segment.map && isNaN(this.zeroOffset_)) {
        var timescales = _muxJsLibMp4Probe2['default'].timescale(segment.map.bytes);
        var startTime = _muxJsLibMp4Probe2['default'].startTime(timescales, segmentInfo.bytes);

        this.zeroOffset_ = startTime;
        segmentInfo.timestampOffset -= startTime;
      }

      if (segment.key) {
        // this is an encrypted segment
        // incrementally decrypt the segment
        /* eslint-disable no-new, handle-callback-err */
        new _aesDecrypter.Decrypter(segmentInfo.encryptedBytes, segment.key.bytes, segment.key.iv, (function (err, bytes) {
          // err always null
          segmentInfo.bytes = bytes;
          this.handleSegment_();
        }).bind(this));
        /* eslint-enable */
      } else {
          this.handleSegment_();
        }
    }

    /**
     * append a decrypted segement to the SourceBuffer through a SourceUpdater
     *
     * @private
     */
  }, {
    key: 'handleSegment_',
    value: function handleSegment_() {
      var _this = this;

      var segmentInfo = undefined;
      var segment = undefined;

      this.state = 'APPENDING';
      segmentInfo = this.pendingSegment_;
      segmentInfo.buffered = this.sourceUpdater_.buffered();
      segment = segmentInfo.playlist.segments[segmentInfo.mediaIndex];
      this.currentTimeline_ = segmentInfo.timeline;

      if (segmentInfo.timestampOffset !== this.sourceUpdater_.timestampOffset()) {
        this.sourceUpdater_.timestampOffset(segmentInfo.timestampOffset);
      }

      // if the media initialization segment is changing, append it
      // before the content segment
      if (segment.map) {
        (function () {
          var initId = initSegmentId(segment.map);

          if (!_this.activeInitSegmentId_ || _this.activeInitSegmentId_ !== initId) {
            var initSegment = _this.initSegments_[initId];

            _this.sourceUpdater_.appendBuffer(initSegment.bytes, function () {
              _this.activeInitSegmentId_ = initId;
            });
          }
        })();
      }

      this.sourceUpdater_.appendBuffer(segmentInfo.bytes, this.handleUpdateEnd_.bind(this));
    }

    /**
     * callback to run when appendBuffer is finished. detects if we are
     * in a good state to do things with the data we got, or if we need
     * to wait for more
     *
     * @private
     */
  }, {
    key: 'handleUpdateEnd_',
    value: function handleUpdateEnd_() {
      var segmentInfo = this.pendingSegment_;
      var currentTime = this.currentTime_();

      this.pendingSegment_ = null;

      // add segment metadata if it we have gained information during the
      // last append
      var timelineUpdated = this.updateTimeline_(segmentInfo);

      this.trigger('progress');

      var currentMediaIndex = segmentInfo.mediaIndex;

      currentMediaIndex += segmentInfo.playlist.mediaSequence - this.playlist_.mediaSequence;

      var currentBuffered = _ranges2['default'].findRange(this.sourceUpdater_.buffered(), currentTime);

      // any time an update finishes and the last segment is in the
      // buffer, end the stream. this ensures the "ended" event will
      // fire if playback reaches that point.
      var isEndOfStream = detectEndOfStream(segmentInfo.playlist, this.mediaSource_, currentMediaIndex + 1);

      if (isEndOfStream) {
        this.mediaSource_.endOfStream();
      }

      // when seeking to the beginning of the seekable range, it's
      // possible that imprecise timing information may cause the seek to
      // end up earlier than the start of the range
      // in that case, seek again
      var seekable = this.seekable_();
      var next = _ranges2['default'].findNextRange(this.sourceUpdater_.buffered(), currentTime);

      if (this.seeking_() && currentBuffered.length === 0) {
        if (seekable.length && currentTime < seekable.start(0)) {

          if (next.length) {
            _videoJs2['default'].log('tried seeking to', currentTime, 'but that was too early, retrying at', next.start(0));
            this.setCurrentTime_(next.start(0) + _ranges2['default'].TIME_FUDGE_FACTOR);
          }
        }
      }

      this.state = 'READY';

      if (timelineUpdated) {
        this.timeCorrection_ = 0;
        if (!this.paused()) {
          this.fillBuffer_();
        }
        return;
      }

      // the last segment append must have been entirely in the
      // already buffered time ranges. adjust the timeCorrection
      // offset to fetch forward until we find a segment that adds
      // to the buffered time ranges and improves subsequent media
      // index calculations.
      var correctionApplied = this.incrementTimeCorrection_(segmentInfo.duration, 4);

      if (correctionApplied && !this.paused()) {
        this.fillBuffer_();
      }
    }

    /**
     * annotate the segment with any start and end time information
     * added by the media processing
     *
     * @private
     * @param {Object} segmentInfo annotate a segment with time info
     */
  }, {
    key: 'updateTimeline_',
    value: function updateTimeline_(segmentInfo) {
      var segment = undefined;
      var segmentEnd = undefined;
      var timelineUpdated = false;
      var playlist = segmentInfo.playlist;
      var currentMediaIndex = segmentInfo.mediaIndex;

      currentMediaIndex += playlist.mediaSequence - this.playlist_.mediaSequence;
      segment = playlist.segments[currentMediaIndex];

      // Update segment meta-data (duration and end-point) based on timeline
      if (segment && segmentInfo && segmentInfo.playlist.uri === this.playlist_.uri) {
        segmentEnd = _ranges2['default'].findSoleUncommonTimeRangesEnd(segmentInfo.buffered, this.sourceUpdater_.buffered());
        timelineUpdated = updateSegmentMetadata(playlist, currentMediaIndex, segmentEnd);
      }

      return timelineUpdated;
    }

    /**
     * add a number of seconds to the currentTime when determining which
     * segment to fetch in order to force the fetcher to advance in cases
     * where it may get stuck on the same segment due to buffer gaps or
     * missing segment annotation after a rendition switch (especially
     * during a live stream)
     *
     * @private
     * @param {Number} secondsToIncrement number of seconds to add to the
     * timeCorrection_ variable
     * @param {Number} maxSegmentsToWalk maximum number of times we allow this
     * function to walk forward
     */
  }, {
    key: 'incrementTimeCorrection_',
    value: function incrementTimeCorrection_(secondsToIncrement, maxSegmentsToWalk) {
      // If we have already incremented timeCorrection_ beyond the limit,
      // stop searching for a segment and reset timeCorrection_
      if (this.timeCorrection_ >= this.playlist_.targetDuration * maxSegmentsToWalk) {
        this.timeCorrection_ = 0;
        return false;
      }

      this.timeCorrection_ += secondsToIncrement;
      return true;
    }
  }]);

  return SegmentLoader;
})(_videoJs2['default'].EventTarget);

exports['default'] = SegmentLoader;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./config":3,"./playlist":7,"./ranges":8,"./source-updater":12,"aes-decrypter":18,"global/window":22,"mux.js/lib/mp4/probe":77}],12:[function(require,module,exports){
(function (global){
/**
 * @file source-updater.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

/**
 * A queue of callbacks to be serialized and applied when a
 * MediaSource and its associated SourceBuffers are not in the
 * updating state. It is used by the segment loader to update the
 * underlying SourceBuffers when new data is loaded, for instance.
 *
 * @class SourceUpdater
 * @param {MediaSource} mediaSource the MediaSource to create the
 * SourceBuffer from
 * @param {String} mimeType the desired MIME type of the underlying
 * SourceBuffer
 */

var SourceUpdater = (function () {
  function SourceUpdater(mediaSource, mimeType) {
    var _this = this;

    _classCallCheck(this, SourceUpdater);

    var createSourceBuffer = function createSourceBuffer() {
      _this.sourceBuffer_ = mediaSource.addSourceBuffer(mimeType);

      // run completion handlers and process callbacks as updateend
      // events fire
      _this.onUpdateendCallback_ = function () {
        var pendingCallback = _this.pendingCallback_;

        _this.pendingCallback_ = null;

        if (pendingCallback) {
          pendingCallback();
        }

        _this.runCallback_();
      };

      _this.sourceBuffer_.addEventListener('updateend', _this.onUpdateendCallback_);

      _this.runCallback_();
    };

    this.callbacks_ = [];
    this.pendingCallback_ = null;
    this.timestampOffset_ = 0;
    this.mediaSource = mediaSource;

    if (mediaSource.readyState === 'closed') {
      mediaSource.addEventListener('sourceopen', createSourceBuffer);
    } else {
      createSourceBuffer();
    }
  }

  /**
   * Aborts the current segment and resets the segment parser.
   *
   * @param {Function} done function to call when done
   * @see http://w3c.github.io/media-source/#widl-SourceBuffer-abort-void
   */

  _createClass(SourceUpdater, [{
    key: 'abort',
    value: function abort(done) {
      var _this2 = this;

      this.queueCallback_(function () {
        _this2.sourceBuffer_.abort();
      }, done);
    }

    /**
     * Queue an update to append an ArrayBuffer.
     *
     * @param {ArrayBuffer} bytes
     * @param {Function} done the function to call when done
     * @see http://www.w3.org/TR/media-source/#widl-SourceBuffer-appendBuffer-void-ArrayBuffer-data
     */
  }, {
    key: 'appendBuffer',
    value: function appendBuffer(bytes, done) {
      var _this3 = this;

      this.queueCallback_(function () {
        _this3.sourceBuffer_.appendBuffer(bytes);
      }, done);
    }

    /**
     * Indicates what TimeRanges are buffered in the managed SourceBuffer.
     *
     * @see http://www.w3.org/TR/media-source/#widl-SourceBuffer-buffered
     */
  }, {
    key: 'buffered',
    value: function buffered() {
      if (!this.sourceBuffer_) {
        return _videoJs2['default'].createTimeRanges();
      }
      return this.sourceBuffer_.buffered;
    }

    /**
     * Queue an update to set the duration.
     *
     * @param {Double} duration what to set the duration to
     * @see http://www.w3.org/TR/media-source/#widl-MediaSource-duration
     */
  }, {
    key: 'duration',
    value: function duration(_duration) {
      var _this4 = this;

      this.queueCallback_(function () {
        _this4.sourceBuffer_.duration = _duration;
      });
    }

    /**
     * Queue an update to remove a time range from the buffer.
     *
     * @param {Number} start where to start the removal
     * @param {Number} end where to end the removal
     * @see http://www.w3.org/TR/media-source/#widl-SourceBuffer-remove-void-double-start-unrestricted-double-end
     */
  }, {
    key: 'remove',
    value: function remove(start, end) {
      var _this5 = this;

      this.queueCallback_(function () {
        _this5.sourceBuffer_.remove(start, end);
      });
    }

    /**
     * wether the underlying sourceBuffer is updating or not
     *
     * @return {Boolean} the updating status of the SourceBuffer
     */
  }, {
    key: 'updating',
    value: function updating() {
      return !this.sourceBuffer_ || this.sourceBuffer_.updating;
    }

    /**
     * Set/get the timestampoffset on the SourceBuffer
     *
     * @return {Number} the timestamp offset
     */
  }, {
    key: 'timestampOffset',
    value: function timestampOffset(offset) {
      var _this6 = this;

      if (typeof offset !== 'undefined') {
        this.queueCallback_(function () {
          _this6.sourceBuffer_.timestampOffset = offset;
        });
        this.timestampOffset_ = offset;
      }
      return this.timestampOffset_;
    }

    /**
     * que a callback to run
     */
  }, {
    key: 'queueCallback_',
    value: function queueCallback_(callback, done) {
      this.callbacks_.push([callback.bind(this), done]);
      this.runCallback_();
    }

    /**
     * run a queued callback
     */
  }, {
    key: 'runCallback_',
    value: function runCallback_() {
      var callbacks = undefined;

      if (this.sourceBuffer_ && !this.sourceBuffer_.updating && this.callbacks_.length) {
        callbacks = this.callbacks_.shift();
        this.pendingCallback_ = callbacks[1];
        callbacks[0]();
      }
    }

    /**
     * dispose of the source updater and the underlying sourceBuffer
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      this.sourceBuffer_.removeEventListener('updateend', this.onUpdateendCallback_);
      if (this.sourceBuffer_ && this.mediaSource.readyState === 'open') {
        this.sourceBuffer_.abort();
      }
    }
  }]);

  return SourceUpdater;
})();

exports['default'] = SourceUpdater;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
/**
 * @file stream.js
 */
/**
 * A lightweight readable stream implemention that handles event dispatching.
 *
 * @class Stream
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Stream = (function () {
  function Stream() {
    _classCallCheck(this, Stream);

    this.listeners = {};
  }

  /**
   * Add a listener for a specified event type.
   *
   * @param {String} type the event name
   * @param {Function} listener the callback to be invoked when an event of
   * the specified type occurs
   */

  _createClass(Stream, [{
    key: 'on',
    value: function on(type, listener) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(listener);
    }

    /**
     * Remove a listener for a specified event type.
     *
     * @param {String} type the event name
     * @param {Function} listener  a function previously registered for this
     * type of event through `on`
     * @return {Boolean} if we could turn it off or not
     */
  }, {
    key: 'off',
    value: function off(type, listener) {
      var index = undefined;

      if (!this.listeners[type]) {
        return false;
      }
      index = this.listeners[type].indexOf(listener);
      this.listeners[type].splice(index, 1);
      return index > -1;
    }

    /**
     * Trigger an event of the specified type on this stream. Any additional
     * arguments to this function are passed as parameters to event listeners.
     *
     * @param {String} type the event name
     */
  }, {
    key: 'trigger',
    value: function trigger(type) {
      var callbacks = undefined;
      var i = undefined;
      var length = undefined;
      var args = undefined;

      callbacks = this.listeners[type];
      if (!callbacks) {
        return;
      }
      // Slicing the arguments on every invocation of this method
      // can add a significant amount of overhead. Avoid the
      // intermediate object creation for the common case of a
      // single callback argument
      if (arguments.length === 2) {
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].call(this, arguments[1]);
        }
      } else {
        args = Array.prototype.slice.call(arguments, 1);
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].apply(this, args);
        }
      }
    }

    /**
     * Destroys the stream and cleans up.
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      this.listeners = {};
    }

    /**
     * Forwards all `data` events on this stream to the destination stream. The
     * destination stream should provide a method `push` to receive the data
     * events as they arrive.
     *
     * @param {Stream} destination the stream that will receive all `data` events
     * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
     */
  }, {
    key: 'pipe',
    value: function pipe(destination) {
      this.on('data', function (data) {
        destination.push(data);
      });
    }
  }]);

  return Stream;
})();

exports['default'] = Stream;
module.exports = exports['default'];
},{}],14:[function(require,module,exports){
(function (global){
/**
 * @file xhr.js
 */

/**
 * A wrapper for videojs.xhr that tracks bandwidth.
 *
 * @param {Object} options options for the XHR
 * @param {Function} callback the callback to call when done
 * @return {Request} the xhr request that is going to be made
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var xhrFactory = function xhrFactory() {
  var xhr = function XhrFunction(options, callback) {
    // Add a default timeout for all hls requests
    options = (0, _videoJs.mergeOptions)({
      timeout: 45e3
    }, options);

    // Allow an optional user-specified function to modify the option
    // object before we construct the xhr request
    if (XhrFunction.beforeRequest && typeof XhrFunction.beforeRequest === 'function') {
      var newOptions = XhrFunction.beforeRequest(options);

      if (newOptions) {
        options = newOptions;
      }
    }

    var request = (0, _videoJs.xhr)(options, function (error, response) {
      if (!error && request.response) {
        request.responseTime = new Date().getTime();
        request.roundTripTime = request.responseTime - request.requestTime;
        request.bytesReceived = request.response.byteLength || request.response.length;
        if (!request.bandwidth) {
          request.bandwidth = Math.floor(request.bytesReceived / request.roundTripTime * 8 * 1000);
        }
      }

      // videojs.xhr now uses a specific code
      // on the error object to signal that a request has
      // timed out errors of setting a boolean on the request object
      if (error || request.timedout) {
        request.timedout = request.timedout || error.code === 'ETIMEDOUT';
      } else {
        request.timedout = false;
      }

      // videojs.xhr no longer considers status codes outside of 200 and 0
      // (for file uris) to be errors, but the old XHR did, so emulate that
      // behavior. Status 206 may be used in response to byterange requests.
      if (!error && response.statusCode !== 200 && response.statusCode !== 206 && response.statusCode !== 0) {
        error = new Error('XHR Failed with a response of: ' + (request && (request.response || request.responseText)));
      }

      callback(error, request);
    });

    request.requestTime = new Date().getTime();
    return request;
  };

  return xhr;
};

exports['default'] = xhrFactory;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
/**
 * @file aes.js
 *
 * This file contains an adaptation of the AES decryption algorithm
 * from the Standford Javascript Cryptography Library. That work is
 * covered by the following copyright and permissions notice:
 *
 * Copyright 2009-2010 Emily Stark, Mike Hamburg, Dan Boneh.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation
 * are those of the authors and should not be interpreted as representing
 * official policies, either expressed or implied, of the authors.
 */

/**
 * Expand the S-box tables.
 *
 * @private
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var precompute = function precompute() {
  var tables = [[[], [], [], [], []], [[], [], [], [], []]];
  var encTable = tables[0];
  var decTable = tables[1];
  var sbox = encTable[4];
  var sboxInv = decTable[4];
  var i = undefined;
  var x = undefined;
  var xInv = undefined;
  var d = [];
  var th = [];
  var x2 = undefined;
  var x4 = undefined;
  var x8 = undefined;
  var s = undefined;
  var tEnc = undefined;
  var tDec = undefined;

  // Compute double and third tables
  for (i = 0; i < 256; i++) {
    th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
  }

  for (x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
    // Compute sbox
    s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
    s = s >> 8 ^ s & 255 ^ 99;
    sbox[x] = s;
    sboxInv[s] = x;

    // Compute MixColumns
    x8 = d[x4 = d[x2 = d[x]]];
    tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
    tEnc = d[s] * 0x101 ^ s * 0x1010100;

    for (i = 0; i < 4; i++) {
      encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
      decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
    }
  }

  // Compactify. Considerable speedup on Firefox.
  for (i = 0; i < 5; i++) {
    encTable[i] = encTable[i].slice(0);
    decTable[i] = decTable[i].slice(0);
  }
  return tables;
};
var aesTables = null;

/**
 * Schedule out an AES key for both encryption and decryption. This
 * is a low-level class. Use a cipher mode to do bulk encryption.
 *
 * @class AES
 * @param key {Array} The key as an array of 4, 6 or 8 words.
 */

var AES = (function () {
  function AES(key) {
    _classCallCheck(this, AES);

    /**
     * The expanded S-box and inverse S-box tables. These will be computed
     * on the client so that we don't have to send them down the wire.
     *
     * There are two tables, _tables[0] is for encryption and
     * _tables[1] is for decryption.
     *
     * The first 4 sub-tables are the expanded S-box with MixColumns. The
     * last (_tables[01][4]) is the S-box itself.
     *
     * @private
     */
    // if we have yet to precompute the S-box tables
    // do so now
    if (!aesTables) {
      aesTables = precompute();
    }
    // then make a copy of that object for use
    this._tables = [[aesTables[0][0].slice(), aesTables[0][1].slice(), aesTables[0][2].slice(), aesTables[0][3].slice(), aesTables[0][4].slice()], [aesTables[1][0].slice(), aesTables[1][1].slice(), aesTables[1][2].slice(), aesTables[1][3].slice(), aesTables[1][4].slice()]];
    var i = undefined;
    var j = undefined;
    var tmp = undefined;
    var encKey = undefined;
    var decKey = undefined;
    var sbox = this._tables[0][4];
    var decTable = this._tables[1];
    var keyLen = key.length;
    var rcon = 1;

    if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
      throw new Error('Invalid aes key size');
    }

    encKey = key.slice(0);
    decKey = [];
    this._key = [encKey, decKey];

    // schedule encryption keys
    for (i = keyLen; i < 4 * keyLen + 28; i++) {
      tmp = encKey[i - 1];

      // apply sbox
      if (i % keyLen === 0 || keyLen === 8 && i % keyLen === 4) {
        tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

        // shift rows and add rcon
        if (i % keyLen === 0) {
          tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
          rcon = rcon << 1 ^ (rcon >> 7) * 283;
        }
      }

      encKey[i] = encKey[i - keyLen] ^ tmp;
    }

    // schedule decryption keys
    for (j = 0; i; j++, i--) {
      tmp = encKey[j & 3 ? i : i - 4];
      if (i <= 4 || j < 4) {
        decKey[j] = tmp;
      } else {
        decKey[j] = decTable[0][sbox[tmp >>> 24]] ^ decTable[1][sbox[tmp >> 16 & 255]] ^ decTable[2][sbox[tmp >> 8 & 255]] ^ decTable[3][sbox[tmp & 255]];
      }
    }
  }

  /**
   * Decrypt 16 bytes, specified as four 32-bit words.
   *
   * @param {Number} encrypted0 the first word to decrypt
   * @param {Number} encrypted1 the second word to decrypt
   * @param {Number} encrypted2 the third word to decrypt
   * @param {Number} encrypted3 the fourth word to decrypt
   * @param {Int32Array} out the array to write the decrypted words
   * into
   * @param {Number} offset the offset into the output array to start
   * writing results
   * @return {Array} The plaintext.
   */

  _createClass(AES, [{
    key: 'decrypt',
    value: function decrypt(encrypted0, encrypted1, encrypted2, encrypted3, out, offset) {
      var key = this._key[1];
      // state variables a,b,c,d are loaded with pre-whitened data
      var a = encrypted0 ^ key[0];
      var b = encrypted3 ^ key[1];
      var c = encrypted2 ^ key[2];
      var d = encrypted1 ^ key[3];
      var a2 = undefined;
      var b2 = undefined;
      var c2 = undefined;

      // key.length === 2 ?
      var nInnerRounds = key.length / 4 - 2;
      var i = undefined;
      var kIndex = 4;
      var table = this._tables[1];

      // load up the tables
      var table0 = table[0];
      var table1 = table[1];
      var table2 = table[2];
      var table3 = table[3];
      var sbox = table[4];

      // Inner rounds. Cribbed from OpenSSL.
      for (i = 0; i < nInnerRounds; i++) {
        a2 = table0[a >>> 24] ^ table1[b >> 16 & 255] ^ table2[c >> 8 & 255] ^ table3[d & 255] ^ key[kIndex];
        b2 = table0[b >>> 24] ^ table1[c >> 16 & 255] ^ table2[d >> 8 & 255] ^ table3[a & 255] ^ key[kIndex + 1];
        c2 = table0[c >>> 24] ^ table1[d >> 16 & 255] ^ table2[a >> 8 & 255] ^ table3[b & 255] ^ key[kIndex + 2];
        d = table0[d >>> 24] ^ table1[a >> 16 & 255] ^ table2[b >> 8 & 255] ^ table3[c & 255] ^ key[kIndex + 3];
        kIndex += 4;
        a = a2;b = b2;c = c2;
      }

      // Last round.
      for (i = 0; i < 4; i++) {
        out[(3 & -i) + offset] = sbox[a >>> 24] << 24 ^ sbox[b >> 16 & 255] << 16 ^ sbox[c >> 8 & 255] << 8 ^ sbox[d & 255] ^ key[kIndex++];
        a2 = a;a = b;b = c;c = d;d = a2;
      }
    }
  }]);

  return AES;
})();

exports['default'] = AES;
module.exports = exports['default'];
},{}],16:[function(require,module,exports){
/**
 * @file async-stream.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

/**
 * A wrapper around the Stream class to use setTiemout
 * and run stream "jobs" Asynchronously
 *
 * @class AsyncStream
 * @extends Stream
 */

var AsyncStream = (function (_Stream) {
  _inherits(AsyncStream, _Stream);

  function AsyncStream() {
    _classCallCheck(this, AsyncStream);

    _get(Object.getPrototypeOf(AsyncStream.prototype), 'constructor', this).call(this, _stream2['default']);
    this.jobs = [];
    this.delay = 1;
    this.timeout_ = null;
  }

  /**
   * process an async job
   *
   * @private
   */

  _createClass(AsyncStream, [{
    key: 'processJob_',
    value: function processJob_() {
      this.jobs.shift()();
      if (this.jobs.length) {
        this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay);
      } else {
        this.timeout_ = null;
      }
    }

    /**
     * push a job into the stream
     *
     * @param {Function} job the job to push into the stream
     */
  }, {
    key: 'push',
    value: function push(job) {
      this.jobs.push(job);
      if (!this.timeout_) {
        this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay);
      }
    }
  }]);

  return AsyncStream;
})(_stream2['default']);

exports['default'] = AsyncStream;
module.exports = exports['default'];
},{"./stream":19}],17:[function(require,module,exports){
/**
 * @file decrypter.js
 *
 * An asynchronous implementation of AES-128 CBC decryption with
 * PKCS#7 padding.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aes = require('./aes');

var _aes2 = _interopRequireDefault(_aes);

var _asyncStream = require('./async-stream');

var _asyncStream2 = _interopRequireDefault(_asyncStream);

var _pkcs7 = require('pkcs7');

/**
 * Convert network-order (big-endian) bytes into their little-endian
 * representation.
 */
var ntoh = function ntoh(word) {
  return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
};

/**
 * Decrypt bytes using AES-128 with CBC and PKCS#7 padding.
 *
 * @param {Uint8Array} encrypted the encrypted bytes
 * @param {Uint32Array} key the bytes of the decryption key
 * @param {Uint32Array} initVector the initialization vector (IV) to
 * use for the first round of CBC.
 * @return {Uint8Array} the decrypted bytes
 *
 * @see http://en.wikipedia.org/wiki/Advanced_Encryption_Standard
 * @see http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_.28CBC.29
 * @see https://tools.ietf.org/html/rfc2315
 */
var decrypt = function decrypt(encrypted, key, initVector) {
  // word-level access to the encrypted bytes
  var encrypted32 = new Int32Array(encrypted.buffer, encrypted.byteOffset, encrypted.byteLength >> 2);

  var decipher = new _aes2['default'](Array.prototype.slice.call(key));

  // byte and word-level access for the decrypted output
  var decrypted = new Uint8Array(encrypted.byteLength);
  var decrypted32 = new Int32Array(decrypted.buffer);

  // temporary variables for working with the IV, encrypted, and
  // decrypted data
  var init0 = undefined;
  var init1 = undefined;
  var init2 = undefined;
  var init3 = undefined;
  var encrypted0 = undefined;
  var encrypted1 = undefined;
  var encrypted2 = undefined;
  var encrypted3 = undefined;

  // iteration variable
  var wordIx = undefined;

  // pull out the words of the IV to ensure we don't modify the
  // passed-in reference and easier access
  init0 = initVector[0];
  init1 = initVector[1];
  init2 = initVector[2];
  init3 = initVector[3];

  // decrypt four word sequences, applying cipher-block chaining (CBC)
  // to each decrypted block
  for (wordIx = 0; wordIx < encrypted32.length; wordIx += 4) {
    // convert big-endian (network order) words into little-endian
    // (javascript order)
    encrypted0 = ntoh(encrypted32[wordIx]);
    encrypted1 = ntoh(encrypted32[wordIx + 1]);
    encrypted2 = ntoh(encrypted32[wordIx + 2]);
    encrypted3 = ntoh(encrypted32[wordIx + 3]);

    // decrypt the block
    decipher.decrypt(encrypted0, encrypted1, encrypted2, encrypted3, decrypted32, wordIx);

    // XOR with the IV, and restore network byte-order to obtain the
    // plaintext
    decrypted32[wordIx] = ntoh(decrypted32[wordIx] ^ init0);
    decrypted32[wordIx + 1] = ntoh(decrypted32[wordIx + 1] ^ init1);
    decrypted32[wordIx + 2] = ntoh(decrypted32[wordIx + 2] ^ init2);
    decrypted32[wordIx + 3] = ntoh(decrypted32[wordIx + 3] ^ init3);

    // setup the IV for the next round
    init0 = encrypted0;
    init1 = encrypted1;
    init2 = encrypted2;
    init3 = encrypted3;
  }

  return decrypted;
};

exports.decrypt = decrypt;
/**
 * The `Decrypter` class that manages decryption of AES
 * data through `AsyncStream` objects and the `decrypt`
 * function
 *
 * @param {Uint8Array} encrypted the encrypted bytes
 * @param {Uint32Array} key the bytes of the decryption key
 * @param {Uint32Array} initVector the initialization vector (IV) to
 * @param {Function} done the function to run when done
 * @class Decrypter
 */

var Decrypter = (function () {
  function Decrypter(encrypted, key, initVector, done) {
    _classCallCheck(this, Decrypter);

    var step = Decrypter.STEP;
    var encrypted32 = new Int32Array(encrypted.buffer);
    var decrypted = new Uint8Array(encrypted.byteLength);
    var i = 0;

    this.asyncStream_ = new _asyncStream2['default']();

    // split up the encryption job and do the individual chunks asynchronously
    this.asyncStream_.push(this.decryptChunk_(encrypted32.subarray(i, i + step), key, initVector, decrypted));
    for (i = step; i < encrypted32.length; i += step) {
      initVector = new Uint32Array([ntoh(encrypted32[i - 4]), ntoh(encrypted32[i - 3]), ntoh(encrypted32[i - 2]), ntoh(encrypted32[i - 1])]);
      this.asyncStream_.push(this.decryptChunk_(encrypted32.subarray(i, i + step), key, initVector, decrypted));
    }
    // invoke the done() callback when everything is finished
    this.asyncStream_.push(function () {
      // remove pkcs#7 padding from the decrypted bytes
      done(null, (0, _pkcs7.unpad)(decrypted));
    });
  }

  /**
   * a getter for step the maximum number of bytes to process at one time
   *
   * @return {Number} the value of step 32000
   */

  _createClass(Decrypter, [{
    key: 'decryptChunk_',

    /**
     * @private
     */
    value: function decryptChunk_(encrypted, key, initVector, decrypted) {
      return function () {
        var bytes = decrypt(encrypted, key, initVector);

        decrypted.set(bytes, encrypted.byteOffset);
      };
    }
  }], [{
    key: 'STEP',
    get: function get() {
      // 4 * 8000;
      return 32000;
    }
  }]);

  return Decrypter;
})();

exports.Decrypter = Decrypter;
exports['default'] = {
  Decrypter: Decrypter,
  decrypt: decrypt
};
},{"./aes":15,"./async-stream":16,"pkcs7":82}],18:[function(require,module,exports){
/**
 * @file index.js
 *
 * Index module to easily import the primary components of AES-128
 * decryption. Like this:
 *
 * ```js
 * import {Decrypter, decrypt, AsyncStream} from 'aes-decrypter';
 * ```
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decrypter = require('./decrypter');

var _asyncStream = require('./async-stream');

var _asyncStream2 = _interopRequireDefault(_asyncStream);

exports['default'] = {
  decrypt: _decrypter.decrypt,
  Decrypter: _decrypter.Decrypter,
  AsyncStream: _asyncStream2['default']
};
module.exports = exports['default'];
},{"./async-stream":16,"./decrypter":17}],19:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],20:[function(require,module,exports){

},{}],21:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":20}],22:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],23:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],24:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],25:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],26:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],27:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":34}],28:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":55,"./baseFor":27}],29:[function(require,module,exports){
var arrayEach = require('./arrayEach'),
    baseMergeDeep = require('./baseMergeDeep'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike'),
    isTypedArray = require('../lang/isTypedArray'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

module.exports = baseMerge;

},{"../lang/isArray":46,"../lang/isObject":49,"../lang/isTypedArray":52,"../object/keys":54,"./arrayEach":25,"./baseMergeDeep":30,"./isArrayLike":37,"./isObjectLike":42}],30:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isPlainObject = require('../lang/isPlainObject'),
    isTypedArray = require('../lang/isTypedArray'),
    toPlainObject = require('../lang/toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"../lang/isArguments":45,"../lang/isArray":46,"../lang/isPlainObject":50,"../lang/isTypedArray":52,"../lang/toPlainObject":53,"./arrayCopy":24,"./isArrayLike":37}],31:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : toObject(object)[key];
  };
}

module.exports = baseProperty;

},{"./toObject":44}],32:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":58}],33:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall'),
    restParam = require('../function/restParam');

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":23,"./bindCallback":32,"./isIterateeCall":40}],34:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":44}],35:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":31}],36:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":48}],37:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":35,"./isLength":41}],38:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
var isHostObject = (function() {
  try {
    Object({ 'toString': 0 } + '');
  } catch(e) {
    return function() { return false; };
  }
  return function(value) {
    // IE < 9 presents many host objects as `Object` objects that can coerce
    // to strings despite having improperly defined `toString` methods.
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  };
}());

module.exports = isHostObject;

},{}],39:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],40:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":49,"./isArrayLike":37,"./isIndex":39}],41:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],42:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],43:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isString = require('../lang/isString'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object) || isString(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":45,"../lang/isArray":46,"../lang/isString":51,"../object/keysIn":55,"./isIndex":39,"./isLength":41}],44:[function(require,module,exports){
var isObject = require('../lang/isObject'),
    isString = require('../lang/isString'),
    support = require('../support');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  if (support.unindexedChars && isString(value)) {
    var index = -1,
        length = value.length,
        result = Object(value);

    while (++index < length) {
      result[index] = value.charAt(index);
    }
    return result;
  }
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":49,"../lang/isString":51,"../support":57}],45:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":37,"../internal/isObjectLike":42}],46:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":36,"../internal/isLength":41,"../internal/isObjectLike":42}],47:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":49}],48:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('../internal/isHostObject'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{"../internal/isHostObject":38,"../internal/isObjectLike":42,"./isFunction":47}],49:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],50:[function(require,module,exports){
var baseForIn = require('../internal/baseForIn'),
    isArguments = require('./isArguments'),
    isHostObject = require('../internal/isHostObject'),
    isObjectLike = require('../internal/isObjectLike'),
    support = require('../support');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  if (support.ownLast) {
    baseForIn(value, function(subValue, key, object) {
      result = hasOwnProperty.call(object, key);
      return false;
    });
    return result !== false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"../internal/baseForIn":28,"../internal/isHostObject":38,"../internal/isObjectLike":42,"../support":57,"./isArguments":45}],51:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":42}],52:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":41,"../internal/isObjectLike":42}],53:[function(require,module,exports){
var baseCopy = require('../internal/baseCopy'),
    keysIn = require('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":26,"../object/keysIn":55}],54:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys'),
    support = require('../support');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":36,"../internal/isArrayLike":37,"../internal/shimKeys":43,"../lang/isObject":49,"../support":57}],55:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isFunction = require('../lang/isFunction'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    isString = require('../lang/isString'),
    support = require('../support');

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/** Used to fix the JScript `[[DontEnum]]` bug. */
var shadowProps = [
  'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', 'toString', 'valueOf'
];

/** Used for native method references. */
var errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to avoid iterating over non-enumerable properties in IE < 9. */
var nonEnumProps = {};
nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
nonEnumProps[objectTag] = { 'constructor': true };

arrayEach(shadowProps, function(key) {
  for (var tag in nonEnumProps) {
    if (hasOwnProperty.call(nonEnumProps, tag)) {
      var props = nonEnumProps[tag];
      props[key] = hasOwnProperty.call(props, key);
    }
  }
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;

  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object) || isString(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
      isProto = proto === object,
      result = Array(length),
      skipIndexes = length > 0,
      skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
      skipProto = support.enumPrototypes && isFunction(object);

  while (++index < length) {
    result[index] = (index + '');
  }
  // lodash skips the `constructor` property when it infers it's iterating
  // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
  // attribute of an existing property and the `constructor` property of a
  // prototype defaults to non-enumerable.
  for (var key in object) {
    if (!(skipProto && key == 'prototype') &&
        !(skipErrorProps && (key == 'message' || key == 'name')) &&
        !(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  if (support.nonEnumShadows && object !== objectProto) {
    var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
        nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

    if (tag == objectTag) {
      proto = objectProto;
    }
    length = shadowProps.length;
    while (length--) {
      key = shadowProps[length];
      var nonEnum = nonEnums[key];
      if (!(isProto && nonEnum) &&
          (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
        result.push(key);
      }
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/arrayEach":25,"../internal/isIndex":39,"../internal/isLength":41,"../lang/isArguments":45,"../lang/isArray":46,"../lang/isFunction":47,"../lang/isObject":49,"../lang/isString":51,"../support":57}],56:[function(require,module,exports){
var baseMerge = require('../internal/baseMerge'),
    createAssigner = require('../internal/createAssigner');

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it's invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/baseMerge":29,"../internal/createAssigner":33}],57:[function(require,module,exports){
/** Used for native method references. */
var arrayProto = Array.prototype,
    errorProto = Error.prototype,
    objectProto = Object.prototype;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {
  var Ctor = function() { this.x = x; },
      object = { '0': x, 'length': x },
      props = [];

  Ctor.prototype = { 'valueOf': x, 'y': x };
  for (var key in new Ctor) { props.push(key); }

  /**
   * Detect if `name` or `message` properties of `Error.prototype` are
   * enumerable by default (IE < 9, Safari < 5.1).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') ||
    propertyIsEnumerable.call(errorProto, 'name');

  /**
   * Detect if `prototype` properties are enumerable by default.
   *
   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
   * (if the prototype or a property on the prototype has been set)
   * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
   * property to `true`.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

  /**
   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
   *
   * In IE < 9 an object's own properties, shadowing non-enumerable ones,
   * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumShadows = !/valueOf/.test(props);

  /**
   * Detect if own properties are iterated after inherited properties (IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.ownLast = props[0] != 'x';

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects
   * correctly.
   *
   * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
   * `shift()` and `splice()` functions that fail to remove the last element,
   * `value[0]`, of array-like objects even though the "length" property is
   * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
   * while `splice()` is buggy regardless of mode in IE < 9.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

  /**
   * Detect lack of support for accessing string characters by index.
   *
   * IE < 8 can't access characters by index. IE 8 can only access characters
   * by index on string literals, not string objects.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
}(1, 0));

module.exports = support;

},{}],58:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],59:[function(require,module,exports){
/**
 * @file m3u8/index.js
 *
 * Utilities for parsing M3U8 files. If the entire manifest is available,
 * `Parser` will create an object representation with enough detail for managing
 * playback. `ParseStream` and `LineStream` are lower-level parsing primitives
 * that do not assume the entirety of the manifest is ready and expose a
 * ReadableStream-like interface.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lineStream = require('./line-stream');

var _lineStream2 = _interopRequireDefault(_lineStream);

var _parseStream = require('./parse-stream');

var _parseStream2 = _interopRequireDefault(_parseStream);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

exports['default'] = {
  LineStream: _lineStream2['default'],
  ParseStream: _parseStream2['default'],
  Parser: _parser2['default']
};
module.exports = exports['default'];
},{"./line-stream":60,"./parse-stream":61,"./parser":62}],60:[function(require,module,exports){
/**
 * @file m3u8/line-stream.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

/**
 * A stream that buffers string input and generates a `data` event for each
 * line.
 *
 * @class LineStream
 * @extends Stream
 */

var LineStream = (function (_Stream) {
  _inherits(LineStream, _Stream);

  function LineStream() {
    _classCallCheck(this, LineStream);

    _get(Object.getPrototypeOf(LineStream.prototype), 'constructor', this).call(this);
    this.buffer = '';
  }

  /**
   * Add new data to be parsed.
   *
   * @param {String} data the text to process
   */

  _createClass(LineStream, [{
    key: 'push',
    value: function push(data) {
      var nextNewline = undefined;

      this.buffer += data;
      nextNewline = this.buffer.indexOf('\n');

      for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
        this.trigger('data', this.buffer.substring(0, nextNewline));
        this.buffer = this.buffer.substring(nextNewline + 1);
      }
    }
  }]);

  return LineStream;
})(_stream2['default']);

exports['default'] = LineStream;
module.exports = exports['default'];
},{"./stream":63}],61:[function(require,module,exports){
/**
 * @file m3u8/parse-stream.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

/**
 * "forgiving" attribute list psuedo-grammar:
 * attributes -> keyvalue (',' keyvalue)*
 * keyvalue   -> key '=' value
 * key        -> [^=]*
 * value      -> '"' [^"]* '"' | [^,]*
 */
var attributeSeparator = function attributeSeparator() {
  var key = '[^=]*';
  var value = '"[^"]*"|[^,]*';
  var keyvalue = '(?:' + key + ')=(?:' + value + ')';

  return new RegExp('(?:^|,)(' + keyvalue + ')');
};

/**
 * Parse attributes from a line given the seperator
 *
 * @param {String} attributes the attibute line to parse
 */
var parseAttributes = function parseAttributes(attributes) {
  // split the string using attributes as the separator
  var attrs = attributes.split(attributeSeparator());
  var i = attrs.length;
  var result = {};
  var attr = undefined;

  while (i--) {
    // filter out unmatched portions of the string
    if (attrs[i] === '') {
      continue;
    }

    // split the key and value
    attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1);
    // trim whitespace and remove optional quotes around the value
    attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
    result[attr[0]] = attr[1];
  }
  return result;
};

/**
 * A line-level M3U8 parser event stream. It expects to receive input one
 * line at a time and performs a context-free parse of its contents. A stream
 * interpretation of a manifest can be useful if the manifest is expected to
 * be too large to fit comfortably into memory or the entirety of the input
 * is not immediately available. Otherwise, it's probably much easier to work
 * with a regular `Parser` object.
 *
 * Produces `data` events with an object that captures the parser's
 * interpretation of the input. That object has a property `tag` that is one
 * of `uri`, `comment`, or `tag`. URIs only have a single additional
 * property, `line`, which captures the entirety of the input without
 * interpretation. Comments similarly have a single additional property
 * `text` which is the input without the leading `#`.
 *
 * Tags always have a property `tagType` which is the lower-cased version of
 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
 * tags are given the tag type `unknown` and a single additional property
 * `data` with the remainder of the input.
 *
 * @class ParseStream
 * @extends Stream
 */

var ParseStream = (function (_Stream) {
  _inherits(ParseStream, _Stream);

  function ParseStream() {
    _classCallCheck(this, ParseStream);

    _get(Object.getPrototypeOf(ParseStream.prototype), 'constructor', this).call(this);
  }

  /**
   * Parses an additional line of input.
   *
   * @param {String} line a single line of an M3U8 file to parse
   */

  _createClass(ParseStream, [{
    key: 'push',
    value: function push(line) {
      var match = undefined;
      var event = undefined;

      // strip whitespace
      line = line.replace(/^[\u0000\s]+|[\u0000\s]+$/g, '');
      if (line.length === 0) {
        // ignore empty lines
        return;
      }

      // URIs
      if (line[0] !== '#') {
        this.trigger('data', {
          type: 'uri',
          uri: line
        });
        return;
      }

      // Comments
      if (line.indexOf('#EXT') !== 0) {
        this.trigger('data', {
          type: 'comment',
          text: line.slice(1)
        });
        return;
      }

      // strip off any carriage returns here so the regex matching
      // doesn't have to account for them.
      line = line.replace('\r', '');

      // Tags
      match = /^#EXTM3U/.exec(line);
      if (match) {
        this.trigger('data', {
          type: 'tag',
          tagType: 'm3u'
        });
        return;
      }
      match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'inf'
        };
        if (match[1]) {
          event.duration = parseFloat(match[1]);
        }
        if (match[2]) {
          event.title = match[2];
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'targetduration'
        };
        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'totalduration'
        };
        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'version'
        };
        if (match[1]) {
          event.version = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'media-sequence'
        };
        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'discontinuity-sequence'
        };
        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'playlist-type'
        };
        if (match[1]) {
          event.playlistType = match[1];
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'byterange'
        };
        if (match[1]) {
          event.length = parseInt(match[1], 10);
        }
        if (match[2]) {
          event.offset = parseInt(match[2], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'allow-cache'
        };
        if (match[1]) {
          event.allowed = !/NO/.test(match[1]);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-MAP:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'map'
        };

        if (match[1]) {
          var attributes = parseAttributes(match[1]);

          if (attributes.URI) {
            event.uri = attributes.URI;
          }
          if (attributes.BYTERANGE) {
            var _attributes$BYTERANGE$split = attributes.BYTERANGE.split('@');

            var _attributes$BYTERANGE$split2 = _slicedToArray(_attributes$BYTERANGE$split, 2);

            var _length = _attributes$BYTERANGE$split2[0];
            var offset = _attributes$BYTERANGE$split2[1];

            event.byterange = {};
            if (_length) {
              event.byterange.length = parseInt(_length, 10);
            }
            if (offset) {
              event.byterange.offset = parseInt(offset, 10);
            }
          }
        }

        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'stream-inf'
        };
        if (match[1]) {
          event.attributes = parseAttributes(match[1]);

          if (event.attributes.RESOLUTION) {
            var split = event.attributes.RESOLUTION.split('x');
            var resolution = {};

            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }
            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }
            event.attributes.RESOLUTION = resolution;
          }
          if (event.attributes.BANDWIDTH) {
            event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
          }
          if (event.attributes['PROGRAM-ID']) {
            event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
          }
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-MEDIA:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'media'
        };
        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-ENDLIST/.exec(line);
      if (match) {
        this.trigger('data', {
          type: 'tag',
          tagType: 'endlist'
        });
        return;
      }
      match = /^#EXT-X-DISCONTINUITY/.exec(line);
      if (match) {
        this.trigger('data', {
          type: 'tag',
          tagType: 'discontinuity'
        });
        return;
      }
      match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'program-date-time'
        };
        if (match[1]) {
          event.dateTimeString = match[1];
          event.dateTimeObject = new Date(match[1]);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-KEY:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'key'
        };
        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
          // parse the IV string into a Uint32Array
          if (event.attributes.IV) {
            if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
              event.attributes.IV = event.attributes.IV.substring(2);
            }

            event.attributes.IV = event.attributes.IV.match(/.{8}/g);
            event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
            event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
            event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
            event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
            event.attributes.IV = new Uint32Array(event.attributes.IV);
          }
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out-cont'
        };
        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out'
        };
        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-in'
        };
        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }
        this.trigger('data', event);
        return;
      }

      // unknown tag type
      this.trigger('data', {
        type: 'tag',
        data: line.slice(4)
      });
    }
  }]);

  return ParseStream;
})(_stream2['default']);

exports['default'] = ParseStream;
module.exports = exports['default'];
},{"./stream":63}],62:[function(require,module,exports){
/**
 * @file m3u8/parser.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _lineStream = require('./line-stream');

var _lineStream2 = _interopRequireDefault(_lineStream);

var _parseStream = require('./parse-stream');

var _parseStream2 = _interopRequireDefault(_parseStream);

var _lodashCompatObjectMerge = require('lodash-compat/object/merge');

var _lodashCompatObjectMerge2 = _interopRequireDefault(_lodashCompatObjectMerge);

/**
 * A parser for M3U8 files. The current interpretation of the input is
 * exposed as a property `manifest` on parser objects. It's just two lines to
 * create and parse a manifest once you have the contents available as a string:
 *
 * ```js
 * var parser = new m3u8.Parser();
 * parser.push(xhr.responseText);
 * ```
 *
 * New input can later be applied to update the manifest object by calling
 * `push` again.
 *
 * The parser attempts to create a usable manifest object even if the
 * underlying input is somewhat nonsensical. It emits `info` and `warning`
 * events during the parse if it encounters input that seems invalid or
 * requires some property of the manifest object to be defaulted.
 *
 * @class Parser
 * @extends Stream
 */

var Parser = (function (_Stream) {
  _inherits(Parser, _Stream);

  function Parser() {
    _classCallCheck(this, Parser);

    _get(Object.getPrototypeOf(Parser.prototype), 'constructor', this).call(this);
    this.lineStream = new _lineStream2['default']();
    this.parseStream = new _parseStream2['default']();
    this.lineStream.pipe(this.parseStream);
    /* eslint-disable consistent-this */
    var self = this;
    /* eslint-enable consistent-this */
    var uris = [];
    var currentUri = {};
    // if specified, the active EXT-X-MAP definition
    var currentMap = undefined;
    // if specified, the active decryption key
    var _key = undefined;
    var noop = function noop() {};
    var defaultMediaGroups = {
      'AUDIO': {},
      'VIDEO': {},
      'CLOSED-CAPTIONS': {},
      'SUBTITLES': {}
    };
    // group segments into numbered timelines delineated by discontinuities
    var currentTimeline = 0;

    // the manifest is empty until the parse stream begins delivering data
    this.manifest = {
      allowCache: true,
      discontinuityStarts: []
    };

    // update the manifest with the m3u8 entry from the parse stream
    this.parseStream.on('data', function (entry) {
      var mediaGroup = undefined;
      var rendition = undefined;

      ({
        tag: function tag() {
          // switch based on the tag type
          (({
            'allow-cache': function allowCache() {
              this.manifest.allowCache = entry.allowed;
              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            byterange: function byterange() {
              var byterange = {};

              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  this.trigger('info', {
                    message: 'defaulting offset to zero'
                  });
                  entry.offset = 0;
                }
              }
              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }
            },
            endlist: function endlist() {
              this.manifest.endList = true;
            },
            inf: function inf() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }
              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }
              if (entry.duration > 0) {
                currentUri.duration = entry.duration;
              }

              if (entry.duration === 0) {
                currentUri.duration = 0.01;
                this.trigger('info', {
                  message: 'updating zero segment duration to a small value'
                });
              }

              this.manifest.segments = uris;
            },
            key: function key() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              }
              // clear the active encryption key
              if (entry.attributes.METHOD === 'NONE') {
                _key = null;
                return;
              }
              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              }
              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              }

              // setup an encryption key for upcoming segments
              _key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (typeof entry.attributes.IV !== 'undefined') {
                _key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function mediaSequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }
              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function discontinuitySequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }
              this.manifest.discontinuitySequence = entry.number;
              currentTimeline = entry.number;
            },
            'playlist-type': function playlistType() {
              if (!/VOD|EVENT/.test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }
              this.manifest.playlistType = entry.playlistType;
            },
            map: function map() {
              currentMap = {};
              if (entry.uri) {
                currentMap.uri = entry.uri;
              }
              if (entry.byterange) {
                currentMap.byterange = entry.byterange;
              }
            },
            'stream-inf': function streamInf() {
              this.manifest.playlists = uris;
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }
              currentUri.attributes = (0, _lodashCompatObjectMerge2['default'])(currentUri.attributes, entry.attributes);
            },
            media: function media() {
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
                this.trigger('warn', {
                  message: 'ignoring incomplete or missing media group'
                });
                return;
              }

              // find the media group, creating defaults as necessary
              var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];

              mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
              mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']];

              // collect the rendition metadata
              rendition = {
                'default': /yes/i.test(entry.attributes.DEFAULT)
              };
              if (rendition['default']) {
                rendition.autoselect = true;
              } else {
                rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
              }
              if (entry.attributes.LANGUAGE) {
                rendition.language = entry.attributes.LANGUAGE;
              }
              if (entry.attributes.URI) {
                rendition.uri = entry.attributes.URI;
              }
              if (entry.attributes['INSTREAM-ID']) {
                rendition.instreamId = entry.attributes['INSTREAM-ID'];
              }

              // insert the new rendition
              mediaGroup[entry.attributes.NAME] = rendition;
            },
            discontinuity: function discontinuity() {
              currentTimeline += 1;
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'program-date-time': function programDateTime() {
              this.manifest.dateTimeString = entry.dateTimeString;
              this.manifest.dateTimeObject = entry.dateTimeObject;
            },
            targetduration: function targetduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }
              this.manifest.targetDuration = entry.duration;
            },
            totalduration: function totalduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid total duration: ' + entry.duration
                });
                return;
              }
              this.manifest.totalDuration = entry.duration;
            },
            'cue-out': function cueOut() {
              currentUri.cueOut = entry.data;
            },
            'cue-out-cont': function cueOutCont() {
              currentUri.cueOutCont = entry.data;
            },
            'cue-in': function cueIn() {
              currentUri.cueIn = entry.data;
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function uri() {
          currentUri.uri = entry.uri;
          uris.push(currentUri);

          // if no explicit duration was declared, use the target duration
          if (this.manifest.targetDuration && !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          }
          // annotate with encryption information, if necessary
          if (_key) {
            currentUri.key = _key;
          }
          currentUri.timeline = currentTimeline;
          // annotate with initialization segment information, if necessary
          if (currentMap) {
            currentUri.map = currentMap;
          }

          // prepare for the next URI
          currentUri = {};
        },
        comment: function comment() {
          // comments are not important for playback
        }
      })[entry.type].call(self);
    });
  }

  /**
   * Parse the input string and update the manifest object.
   *
   * @param {String} chunk a potentially incomplete portion of the manifest
   */

  _createClass(Parser, [{
    key: 'push',
    value: function push(chunk) {
      this.lineStream.push(chunk);
    }

    /**
     * Flush any remaining input. This can be handy if the last line of an M3U8
     * manifest did not contain a trailing newline but the file has been
     * completely received.
     */
  }, {
    key: 'end',
    value: function end() {
      // flush any buffered input
      this.lineStream.push('\n');
    }
  }]);

  return Parser;
})(_stream2['default']);

exports['default'] = Parser;
module.exports = exports['default'];
},{"./line-stream":60,"./parse-stream":61,"./stream":63,"lodash-compat/object/merge":56}],63:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],64:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2016 Brightcove
 * All rights reserved.
 *
 * A stream-based aac to mp4 converter. This utility can be used to
 * deliver mp4s to a SourceBuffer on platforms that support native
 * Media Source Extensions.
 */
'use strict';
var Stream = require('../utils/stream.js');

// Constants
var AacStream;

/**
 * Splits an incoming stream of binary data into ADTS and ID3 Frames.
 */

AacStream = function() {
  var
    everything = new Uint8Array(),
    timeStamp = 0;

  AacStream.prototype.init.call(this);

  this.setTimestamp = function(timestamp) {
    timeStamp = timestamp;
  };

  this.parseId3TagSize = function(header, byteIndex) {
    var
      returnSize = (header[byteIndex + 6] << 21) |
                   (header[byteIndex + 7] << 14) |
                   (header[byteIndex + 8] << 7) |
                   (header[byteIndex + 9]),
      flags = header[byteIndex + 5],
      footerPresent = (flags & 16) >> 4;

    if (footerPresent) {
      return returnSize + 20;
    }
    return returnSize + 10;
  };

  this.parseAdtsSize = function(header, byteIndex) {
    var
      lowThree = (header[byteIndex + 5] & 0xE0) >> 5,
      middle = header[byteIndex + 4] << 3,
      highTwo = header[byteIndex + 3] & 0x3 << 11;

    return (highTwo | middle) | lowThree;
  };

  this.push = function(bytes) {
    var
      frameSize = 0,
      byteIndex = 0,
      bytesLeft,
      chunk,
      packet,
      tempLength;

    // If there are bytes remaining from the last segment, prepend them to the
    // bytes that were pushed in
    if (everything.length) {
      tempLength = everything.length;
      everything = new Uint8Array(bytes.byteLength + tempLength);
      everything.set(everything.subarray(0, tempLength));
      everything.set(bytes, tempLength);
    } else {
      everything = bytes;
    }

    while (everything.length - byteIndex >= 3) {
      if ((everything[byteIndex] === 'I'.charCodeAt(0)) &&
          (everything[byteIndex + 1] === 'D'.charCodeAt(0)) &&
          (everything[byteIndex + 2] === '3'.charCodeAt(0))) {

        // Exit early because we don't have enough to parse
        // the ID3 tag header
        if (everything.length - byteIndex < 10) {
          break;
        }

        // check framesize
        frameSize = this.parseId3TagSize(everything, byteIndex);

        // Exit early if we don't have enough in the buffer
        // to emit a full packet
        if (frameSize > everything.length) {
          break;
        }
        chunk = {
          type: 'timed-metadata',
          data: everything.subarray(byteIndex, byteIndex + frameSize)
        };
        this.trigger('data', chunk);
        byteIndex += frameSize;
        continue;
      } else if ((everything[byteIndex] & 0xff === 0xff) &&
                 ((everything[byteIndex + 1] & 0xf0) === 0xf0)) {

        // Exit early because we don't have enough to parse
        // the ADTS frame header
        if (everything.length - byteIndex < 7) {
          break;
        }

        frameSize = this.parseAdtsSize(everything, byteIndex);

        // Exit early if we don't have enough in the buffer
        // to emit a full packet
        if (frameSize > everything.length) {
          break;
        }

        packet = {
          type: 'audio',
          data: everything.subarray(byteIndex, byteIndex + frameSize),
          pts: timeStamp,
          dts: timeStamp
        };
        this.trigger('data', packet);
        byteIndex += frameSize;
        continue;
      }
      byteIndex++;
    }
    bytesLeft = everything.length - byteIndex;

    if (bytesLeft > 0) {
      everything = everything.subarray(byteIndex);
    } else {
      everything = new Uint8Array();
    }
  };
};

AacStream.prototype = new Stream();

module.exports = AacStream;

},{"../utils/stream.js":80}],65:[function(require,module,exports){
'use strict';

var Stream = require('../utils/stream.js');

var AdtsStream;

var
  ADTS_SAMPLING_FREQUENCIES = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350
  ];

/*
 * Accepts a ElementaryStream and emits data events with parsed
 * AAC Audio Frames of the individual packets. Input audio in ADTS
 * format is unpacked and re-emitted as AAC frames.
 *
 * @see http://wiki.multimedia.cx/index.php?title=ADTS
 * @see http://wiki.multimedia.cx/?title=Understanding_AAC
 */
AdtsStream = function() {
  var buffer;

  AdtsStream.prototype.init.call(this);

  this.push = function(packet) {
    var
      i = 0,
      frameNum = 0,
      frameLength,
      protectionSkipBytes,
      frameEnd,
      oldBuffer,
      sampleCount,
      adtsFrameDuration;

    if (packet.type !== 'audio') {
      // ignore non-audio data
      return;
    }

    // Prepend any data in the buffer to the input data so that we can parse
    // aac frames the cross a PES packet boundary
    if (buffer) {
      oldBuffer = buffer;
      buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
      buffer.set(oldBuffer);
      buffer.set(packet.data, oldBuffer.byteLength);
    } else {
      buffer = packet.data;
    }

    // unpack any ADTS frames which have been fully received
    // for details on the ADTS header, see http://wiki.multimedia.cx/index.php?title=ADTS
    while (i + 5 < buffer.length) {

      // Loook for the start of an ADTS header..
      if (buffer[i] !== 0xFF || (buffer[i + 1] & 0xF6) !== 0xF0) {
        // If a valid header was not found,  jump one forward and attempt to
        // find a valid ADTS header starting at the next byte
        i++;
        continue;
      }

      // The protection skip bit tells us if we have 2 bytes of CRC data at the
      // end of the ADTS header
      protectionSkipBytes = (~buffer[i + 1] & 0x01) * 2;

      // Frame length is a 13 bit integer starting 16 bits from the
      // end of the sync sequence
      frameLength = ((buffer[i + 3] & 0x03) << 11) |
        (buffer[i + 4] << 3) |
        ((buffer[i + 5] & 0xe0) >> 5);

      sampleCount = ((buffer[i + 6] & 0x03) + 1) * 1024;
      adtsFrameDuration = (sampleCount * 90000) /
        ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2];

      frameEnd = i + frameLength;

      // If we don't have enough data to actually finish this ADTS frame, return
      // and wait for more data
      if (buffer.byteLength < frameEnd) {
        return;
      }

      // Otherwise, deliver the complete AAC frame
      this.trigger('data', {
        pts: packet.pts + (frameNum * adtsFrameDuration),
        dts: packet.dts + (frameNum * adtsFrameDuration),
        sampleCount: sampleCount,
        audioobjecttype: ((buffer[i + 2] >>> 6) & 0x03) + 1,
        channelcount: ((buffer[i + 2] & 1) << 2) |
          ((buffer[i + 3] & 0xc0) >>> 6),
        samplerate: ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2],
        samplingfrequencyindex: (buffer[i + 2] & 0x3c) >>> 2,
        // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
        samplesize: 16,
        data: buffer.subarray(i + 7 + protectionSkipBytes, frameEnd)
      });

      // If the buffer is empty, clear it and return
      if (buffer.byteLength === frameEnd) {
        buffer = undefined;
        return;
      }

      frameNum++;

      // Remove the finished frame from the buffer and start the process again
      buffer = buffer.subarray(frameEnd);
    }
  };
  this.flush = function() {
    this.trigger('done');
  };
};

AdtsStream.prototype = new Stream();

module.exports = AdtsStream;

},{"../utils/stream.js":80}],66:[function(require,module,exports){
'use strict';

var Stream = require('../utils/stream.js');
var ExpGolomb = require('../utils/exp-golomb.js');

var H264Stream, NalByteStream;
var PROFILES_WITH_OPTIONAL_SPS_DATA;

/**
 * Accepts a NAL unit byte stream and unpacks the embedded NAL units.
 */
NalByteStream = function() {
  var
    syncPoint = 0,
    i,
    buffer;
  NalByteStream.prototype.init.call(this);

  this.push = function(data) {
    var swapBuffer;

    if (!buffer) {
      buffer = data.data;
    } else {
      swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
      swapBuffer.set(buffer);
      swapBuffer.set(data.data, buffer.byteLength);
      buffer = swapBuffer;
    }

    // Rec. ITU-T H.264, Annex B
    // scan for NAL unit boundaries

    // a match looks like this:
    // 0 0 1 .. NAL .. 0 0 1
    // ^ sync point        ^ i
    // or this:
    // 0 0 1 .. NAL .. 0 0 0
    // ^ sync point        ^ i

    // advance the sync point to a NAL start, if necessary
    for (; syncPoint < buffer.byteLength - 3; syncPoint++) {
      if (buffer[syncPoint + 2] === 1) {
        // the sync point is properly aligned
        i = syncPoint + 5;
        break;
      }
    }

    while (i < buffer.byteLength) {
      // look at the current byte to determine if we've hit the end of
      // a NAL unit boundary
      switch (buffer[i]) {
      case 0:
        // skip past non-sync sequences
        if (buffer[i - 1] !== 0) {
          i += 2;
          break;
        } else if (buffer[i - 2] !== 0) {
          i++;
          break;
        }

        // deliver the NAL unit if it isn't empty
        if (syncPoint + 3 !== i - 2) {
          this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
        }

        // drop trailing zeroes
        do {
          i++;
        } while (buffer[i] !== 1 && i < buffer.length);
        syncPoint = i - 2;
        i += 3;
        break;
      case 1:
        // skip past non-sync sequences
        if (buffer[i - 1] !== 0 ||
            buffer[i - 2] !== 0) {
          i += 3;
          break;
        }

        // deliver the NAL unit
        this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
        syncPoint = i - 2;
        i += 3;
        break;
      default:
        // the current byte isn't a one or zero, so it cannot be part
        // of a sync sequence
        i += 3;
        break;
      }
    }
    // filter out the NAL units that were delivered
    buffer = buffer.subarray(syncPoint);
    i -= syncPoint;
    syncPoint = 0;
  };

  this.flush = function() {
    // deliver the last buffered NAL unit
    if (buffer && buffer.byteLength > 3) {
      this.trigger('data', buffer.subarray(syncPoint + 3));
    }
    // reset the stream state
    buffer = null;
    syncPoint = 0;
    this.trigger('done');
  };
};
NalByteStream.prototype = new Stream();

// values of profile_idc that indicate additional fields are included in the SPS
// see Recommendation ITU-T H.264 (4/2013),
// 7.3.2.1.1 Sequence parameter set data syntax
PROFILES_WITH_OPTIONAL_SPS_DATA = {
  100: true,
  110: true,
  122: true,
  244: true,
  44: true,
  83: true,
  86: true,
  118: true,
  128: true,
  138: true,
  139: true,
  134: true
};

/**
 * Accepts input from a ElementaryStream and produces H.264 NAL unit data
 * events.
 */
H264Stream = function() {
  var
    nalByteStream = new NalByteStream(),
    self,
    trackId,
    currentPts,
    currentDts,

    discardEmulationPreventionBytes,
    readSequenceParameterSet,
    skipScalingList;

  H264Stream.prototype.init.call(this);
  self = this;

  this.push = function(packet) {
    if (packet.type !== 'video') {
      return;
    }
    trackId = packet.trackId;
    currentPts = packet.pts;
    currentDts = packet.dts;

    nalByteStream.push(packet);
  };

  nalByteStream.on('data', function(data) {
    var
      event = {
        trackId: trackId,
        pts: currentPts,
        dts: currentDts,
        data: data
      };

    switch (data[0] & 0x1f) {
    case 0x05:
      event.nalUnitType = 'slice_layer_without_partitioning_rbsp_idr';
      break;
    case 0x06:
      event.nalUnitType = 'sei_rbsp';
      event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
      break;
    case 0x07:
      event.nalUnitType = 'seq_parameter_set_rbsp';
      event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
      event.config = readSequenceParameterSet(event.escapedRBSP);
      break;
    case 0x08:
      event.nalUnitType = 'pic_parameter_set_rbsp';
      break;
    case 0x09:
      event.nalUnitType = 'access_unit_delimiter_rbsp';
      break;

    default:
      break;
    }
    self.trigger('data', event);
  });
  nalByteStream.on('done', function() {
    self.trigger('done');
  });

  this.flush = function() {
    nalByteStream.flush();
  };

  /**
   * Advance the ExpGolomb decoder past a scaling list. The scaling
   * list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count {number} the number of entries in this scaling list
   * @param expGolombDecoder {object} an ExpGolomb pointed to the
   * start of a scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  skipScalingList = function(count, expGolombDecoder) {
    var
      lastScale = 8,
      nextScale = 8,
      j,
      deltaScale;

    for (j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = expGolombDecoder.readExpGolomb();
        nextScale = (lastScale + deltaScale + 256) % 256;
      }

      lastScale = (nextScale === 0) ? lastScale : nextScale;
    }
  };

  /**
   * Expunge any "Emulation Prevention" bytes from a "Raw Byte
   * Sequence Payload"
   * @param data {Uint8Array} the bytes of a RBSP from a NAL
   * unit
   * @return {Uint8Array} the RBSP without any Emulation
   * Prevention Bytes
   */
  discardEmulationPreventionBytes = function(data) {
    var
      length = data.byteLength,
      emulationPreventionBytesPositions = [],
      i = 1,
      newLength, newData;

    // Find all `Emulation Prevention Bytes`
    while (i < length - 2) {
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
        emulationPreventionBytesPositions.push(i + 2);
        i += 2;
      } else {
        i++;
      }
    }

    // If no Emulation Prevention Bytes were found just return the original
    // array
    if (emulationPreventionBytesPositions.length === 0) {
      return data;
    }

    // Create a new array to hold the NAL unit data
    newLength = length - emulationPreventionBytesPositions.length;
    newData = new Uint8Array(newLength);
    var sourceIndex = 0;

    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === emulationPreventionBytesPositions[0]) {
        // Skip this byte
        sourceIndex++;
        // Remove this position index
        emulationPreventionBytesPositions.shift();
      }
      newData[i] = data[sourceIndex];
    }

    return newData;
  };

  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @param data {Uint8Array} the bytes of a sequence parameter set
   * @return {object} an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  readSequenceParameterSet = function(data) {
    var
      frameCropLeftOffset = 0,
      frameCropRightOffset = 0,
      frameCropTopOffset = 0,
      frameCropBottomOffset = 0,
      sarScale = 1,
      expGolombDecoder, profileIdc, levelIdc, profileCompatibility,
      chromaFormatIdc, picOrderCntType,
      numRefFramesInPicOrderCntCycle, picWidthInMbsMinus1,
      picHeightInMapUnitsMinus1,
      frameMbsOnlyFlag,
      scalingListCount,
      sarRatio,
      aspectRatioIdc,
      i;

    expGolombDecoder = new ExpGolomb(data);
    profileIdc = expGolombDecoder.readUnsignedByte(); // profile_idc
    profileCompatibility = expGolombDecoder.readUnsignedByte(); // constraint_set[0-5]_flag
    levelIdc = expGolombDecoder.readUnsignedByte(); // level_idc u(8)
    expGolombDecoder.skipUnsignedExpGolomb(); // seq_parameter_set_id

    // some profiles have more optional data we don't need
    if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {
      chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();
      if (chromaFormatIdc === 3) {
        expGolombDecoder.skipBits(1); // separate_colour_plane_flag
      }
      expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_luma_minus8
      expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_chroma_minus8
      expGolombDecoder.skipBits(1); // qpprime_y_zero_transform_bypass_flag
      if (expGolombDecoder.readBoolean()) { // seq_scaling_matrix_present_flag
        scalingListCount = (chromaFormatIdc !== 3) ? 8 : 12;
        for (i = 0; i < scalingListCount; i++) {
          if (expGolombDecoder.readBoolean()) { // seq_scaling_list_present_flag[ i ]
            if (i < 6) {
              skipScalingList(16, expGolombDecoder);
            } else {
              skipScalingList(64, expGolombDecoder);
            }
          }
        }
      }
    }

    expGolombDecoder.skipUnsignedExpGolomb(); // log2_max_frame_num_minus4
    picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();

    if (picOrderCntType === 0) {
      expGolombDecoder.readUnsignedExpGolomb(); // log2_max_pic_order_cnt_lsb_minus4
    } else if (picOrderCntType === 1) {
      expGolombDecoder.skipBits(1); // delta_pic_order_always_zero_flag
      expGolombDecoder.skipExpGolomb(); // offset_for_non_ref_pic
      expGolombDecoder.skipExpGolomb(); // offset_for_top_to_bottom_field
      numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();
      for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        expGolombDecoder.skipExpGolomb(); // offset_for_ref_frame[ i ]
      }
    }

    expGolombDecoder.skipUnsignedExpGolomb(); // max_num_ref_frames
    expGolombDecoder.skipBits(1); // gaps_in_frame_num_value_allowed_flag

    picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
    picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();

    frameMbsOnlyFlag = expGolombDecoder.readBits(1);
    if (frameMbsOnlyFlag === 0) {
      expGolombDecoder.skipBits(1); // mb_adaptive_frame_field_flag
    }

    expGolombDecoder.skipBits(1); // direct_8x8_inference_flag
    if (expGolombDecoder.readBoolean()) { // frame_cropping_flag
      frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
      frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
      frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
      frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
    }
    if (expGolombDecoder.readBoolean()) {
      // vui_parameters_present_flag
      if (expGolombDecoder.readBoolean()) {
        // aspect_ratio_info_present_flag
        aspectRatioIdc = expGolombDecoder.readUnsignedByte();
        switch (aspectRatioIdc) {
          case 1: sarRatio = [1, 1]; break;
          case 2: sarRatio = [12, 11]; break;
          case 3: sarRatio = [10, 11]; break;
          case 4: sarRatio = [16, 11]; break;
          case 5: sarRatio = [40, 33]; break;
          case 6: sarRatio = [24, 11]; break;
          case 7: sarRatio = [20, 11]; break;
          case 8: sarRatio = [32, 11]; break;
          case 9: sarRatio = [80, 33]; break;
          case 10: sarRatio = [18, 11]; break;
          case 11: sarRatio = [15, 11]; break;
          case 12: sarRatio = [64, 33]; break;
          case 13: sarRatio = [160, 99]; break;
          case 14: sarRatio = [4, 3]; break;
          case 15: sarRatio = [3, 2]; break;
          case 16: sarRatio = [2, 1]; break;
          case 255: {
            sarRatio = [expGolombDecoder.readUnsignedByte() << 8 |
                        expGolombDecoder.readUnsignedByte(),
                        expGolombDecoder.readUnsignedByte() << 8 |
                        expGolombDecoder.readUnsignedByte() ];
            break;
          }
        }
        if (sarRatio) {
          sarScale = sarRatio[0] / sarRatio[1];
        }
      }
    }
    return {
      profileIdc: profileIdc,
      levelIdc: levelIdc,
      profileCompatibility: profileCompatibility,
      width: Math.ceil((((picWidthInMbsMinus1 + 1) * 16) - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
      height: ((2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16) - (frameCropTopOffset * 2) - (frameCropBottomOffset * 2)
    };
  };

};
H264Stream.prototype = new Stream();

module.exports = {
  H264Stream: H264Stream,
  NalByteStream: NalByteStream
};

},{"../utils/exp-golomb.js":79,"../utils/stream.js":80}],67:[function(require,module,exports){
/**
 * An object that stores the bytes of an FLV tag and methods for
 * querying and manipulating that data.
 * @see http://download.macromedia.com/f4v/video_file_format_spec_v10_1.pdf
 */
'use strict';

var FlvTag;

// (type:uint, extraData:Boolean = false) extends ByteArray
FlvTag = function(type, extraData) {
  var
    // Counter if this is a metadata tag, nal start marker if this is a video
    // tag. unused if this is an audio tag
    adHoc = 0, // :uint

    // The default size is 16kb but this is not enough to hold iframe
    // data and the resizing algorithm costs a bit so we create a larger
    // starting buffer for video tags
    bufferStartSize = 16384,

    // checks whether the FLV tag has enough capacity to accept the proposed
    // write and re-allocates the internal buffers if necessary
    prepareWrite = function(flv, count) {
      var
        bytes,
        minLength = flv.position + count;
      if (minLength < flv.bytes.byteLength) {
        // there's enough capacity so do nothing
        return;
      }

      // allocate a new buffer and copy over the data that will not be modified
      bytes = new Uint8Array(minLength * 2);
      bytes.set(flv.bytes.subarray(0, flv.position), 0);
      flv.bytes = bytes;
      flv.view = new DataView(flv.bytes.buffer);
    },

    // commonly used metadata properties
    widthBytes = FlvTag.widthBytes || new Uint8Array('width'.length),
    heightBytes = FlvTag.heightBytes || new Uint8Array('height'.length),
    videocodecidBytes = FlvTag.videocodecidBytes || new Uint8Array('videocodecid'.length),
    i;

  if (!FlvTag.widthBytes) {
    // calculating the bytes of common metadata names ahead of time makes the
    // corresponding writes faster because we don't have to loop over the
    // characters
    // re-test with test/perf.html if you're planning on changing this
    for (i = 0; i < 'width'.length; i++) {
      widthBytes[i] = 'width'.charCodeAt(i);
    }
    for (i = 0; i < 'height'.length; i++) {
      heightBytes[i] = 'height'.charCodeAt(i);
    }
    for (i = 0; i < 'videocodecid'.length; i++) {
      videocodecidBytes[i] = 'videocodecid'.charCodeAt(i);
    }

    FlvTag.widthBytes = widthBytes;
    FlvTag.heightBytes = heightBytes;
    FlvTag.videocodecidBytes = videocodecidBytes;
  }

  this.keyFrame = false; // :Boolean

  switch (type) {
  case FlvTag.VIDEO_TAG:
    this.length = 16;
    // Start the buffer at 256k
    bufferStartSize *= 6;
    break;
  case FlvTag.AUDIO_TAG:
    this.length = 13;
    this.keyFrame = true;
    break;
  case FlvTag.METADATA_TAG:
    this.length = 29;
    this.keyFrame = true;
    break;
  default:
    throw new Error('Unknown FLV tag type');
  }

  this.bytes = new Uint8Array(bufferStartSize);
  this.view = new DataView(this.bytes.buffer);
  this.bytes[0] = type;
  this.position = this.length;
  this.keyFrame = extraData; // Defaults to false

  // presentation timestamp
  this.pts = 0;
  // decoder timestamp
  this.dts = 0;

  // ByteArray#writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0)
  this.writeBytes = function(bytes, offset, length) {
    var
      start = offset || 0,
      end;
    length = length || bytes.byteLength;
    end = start + length;

    prepareWrite(this, length);
    this.bytes.set(bytes.subarray(start, end), this.position);

    this.position += length;
    this.length = Math.max(this.length, this.position);
  };

  // ByteArray#writeByte(value:int):void
  this.writeByte = function(byte) {
    prepareWrite(this, 1);
    this.bytes[this.position] = byte;
    this.position++;
    this.length = Math.max(this.length, this.position);
  };

  // ByteArray#writeShort(value:int):void
  this.writeShort = function(short) {
    prepareWrite(this, 2);
    this.view.setUint16(this.position, short);
    this.position += 2;
    this.length = Math.max(this.length, this.position);
  };

  // Negative index into array
  // (pos:uint):int
  this.negIndex = function(pos) {
    return this.bytes[this.length - pos];
  };

  // The functions below ONLY work when this[0] == VIDEO_TAG.
  // We are not going to check for that because we dont want the overhead
  // (nal:ByteArray = null):int
  this.nalUnitSize = function() {
    if (adHoc === 0) {
      return 0;
    }

    return this.length - (adHoc + 4);
  };

  this.startNalUnit = function() {
    // remember position and add 4 bytes
    if (adHoc > 0) {
      throw new Error('Attempted to create new NAL wihout closing the old one');
    }

    // reserve 4 bytes for nal unit size
    adHoc = this.length;
    this.length += 4;
    this.position = this.length;
  };

  // (nal:ByteArray = null):void
  this.endNalUnit = function(nalContainer) {
    var
      nalStart, // :uint
      nalLength; // :uint

    // Rewind to the marker and write the size
    if (this.length === adHoc + 4) {
      // we started a nal unit, but didnt write one, so roll back the 4 byte size value
      this.length -= 4;
    } else if (adHoc > 0) {
      nalStart = adHoc + 4;
      nalLength = this.length - nalStart;

      this.position = adHoc;
      this.view.setUint32(this.position, nalLength);
      this.position = this.length;

      if (nalContainer) {
        // Add the tag to the NAL unit
        nalContainer.push(this.bytes.subarray(nalStart, nalStart + nalLength));
      }
    }

    adHoc = 0;
  };

  /**
   * Write out a 64-bit floating point valued metadata property. This method is
   * called frequently during a typical parse and needs to be fast.
   */
  // (key:String, val:Number):void
  this.writeMetaDataDouble = function(key, val) {
    var i;
    prepareWrite(this, 2 + key.length + 9);

    // write size of property name
    this.view.setUint16(this.position, key.length);
    this.position += 2;

    // this next part looks terrible but it improves parser throughput by
    // 10kB/s in my testing

    // write property name
    if (key === 'width') {
      this.bytes.set(widthBytes, this.position);
      this.position += 5;
    } else if (key === 'height') {
      this.bytes.set(heightBytes, this.position);
      this.position += 6;
    } else if (key === 'videocodecid') {
      this.bytes.set(videocodecidBytes, this.position);
      this.position += 12;
    } else {
      for (i = 0; i < key.length; i++) {
        this.bytes[this.position] = key.charCodeAt(i);
        this.position++;
      }
    }

    // skip null byte
    this.position++;

    // write property value
    this.view.setFloat64(this.position, val);
    this.position += 8;

    // update flv tag length
    this.length = Math.max(this.length, this.position);
    ++adHoc;
  };

  // (key:String, val:Boolean):void
  this.writeMetaDataBoolean = function(key, val) {
    var i;
    prepareWrite(this, 2);
    this.view.setUint16(this.position, key.length);
    this.position += 2;
    for (i = 0; i < key.length; i++) {
      // if key.charCodeAt(i) >= 255, handle error
      prepareWrite(this, 1);
      this.bytes[this.position] = key.charCodeAt(i);
      this.position++;
    }
    prepareWrite(this, 2);
    this.view.setUint8(this.position, 0x01);
    this.position++;
    this.view.setUint8(this.position, val ? 0x01 : 0x00);
    this.position++;
    this.length = Math.max(this.length, this.position);
    ++adHoc;
  };

  // ():ByteArray
  this.finalize = function() {
    var
      dtsDelta, // :int
      len; // :int

    switch (this.bytes[0]) {
      // Video Data
    case FlvTag.VIDEO_TAG:
       // We only support AVC, 1 = key frame (for AVC, a seekable
       // frame), 2 = inter frame (for AVC, a non-seekable frame)
      this.bytes[11] = ((this.keyFrame || extraData) ? 0x10 : 0x20) | 0x07;
      this.bytes[12] = extraData ?  0x00 : 0x01;

      dtsDelta = this.pts - this.dts;
      this.bytes[13] = (dtsDelta & 0x00FF0000) >>> 16;
      this.bytes[14] = (dtsDelta & 0x0000FF00) >>>  8;
      this.bytes[15] = (dtsDelta & 0x000000FF) >>>  0;
      break;

    case FlvTag.AUDIO_TAG:
      this.bytes[11] = 0xAF; // 44 kHz, 16-bit stereo
      this.bytes[12] = extraData ? 0x00 : 0x01;
      break;

    case FlvTag.METADATA_TAG:
      this.position = 11;
      this.view.setUint8(this.position, 0x02); // String type
      this.position++;
      this.view.setUint16(this.position, 0x0A); // 10 Bytes
      this.position += 2;
      // set "onMetaData"
      this.bytes.set([0x6f, 0x6e, 0x4d, 0x65,
                      0x74, 0x61, 0x44, 0x61,
                      0x74, 0x61], this.position);
      this.position += 10;
      this.bytes[this.position] = 0x08; // Array type
      this.position++;
      this.view.setUint32(this.position, adHoc);
      this.position = this.length;
      this.bytes.set([0, 0, 9], this.position);
      this.position += 3; // End Data Tag
      this.length = this.position;
      break;
    }

    len = this.length - 11;

    // write the DataSize field
    this.bytes[ 1] = (len & 0x00FF0000) >>> 16;
    this.bytes[ 2] = (len & 0x0000FF00) >>>  8;
    this.bytes[ 3] = (len & 0x000000FF) >>>  0;
    // write the Timestamp
    this.bytes[ 4] = (this.dts & 0x00FF0000) >>> 16;
    this.bytes[ 5] = (this.dts & 0x0000FF00) >>>  8;
    this.bytes[ 6] = (this.dts & 0x000000FF) >>>  0;
    this.bytes[ 7] = (this.dts & 0xFF000000) >>> 24;
    // write the StreamID
    this.bytes[ 8] = 0;
    this.bytes[ 9] = 0;
    this.bytes[10] = 0;

    // Sometimes we're at the end of the view and have one slot to write a
    // uint32, so, prepareWrite of count 4, since, view is uint8
    prepareWrite(this, 4);
    this.view.setUint32(this.length, this.length);
    this.length += 4;
    this.position += 4;

    // trim down the byte buffer to what is actually being used
    this.bytes = this.bytes.subarray(0, this.length);
    this.frameTime = FlvTag.frameTime(this.bytes);
    // if bytes.bytelength isn't equal to this.length, handle error
    return this;
  };
};

FlvTag.AUDIO_TAG = 0x08; // == 8, :uint
FlvTag.VIDEO_TAG = 0x09; // == 9, :uint
FlvTag.METADATA_TAG = 0x12; // == 18, :uint

// (tag:ByteArray):Boolean {
FlvTag.isAudioFrame = function(tag) {
  return FlvTag.AUDIO_TAG === tag[0];
};

// (tag:ByteArray):Boolean {
FlvTag.isVideoFrame = function(tag) {
  return FlvTag.VIDEO_TAG === tag[0];
};

// (tag:ByteArray):Boolean {
FlvTag.isMetaData = function(tag) {
  return FlvTag.METADATA_TAG === tag[0];
};

// (tag:ByteArray):Boolean {
FlvTag.isKeyFrame = function(tag) {
  if (FlvTag.isVideoFrame(tag)) {
    return tag[11] === 0x17;
  }

  if (FlvTag.isAudioFrame(tag)) {
    return true;
  }

  if (FlvTag.isMetaData(tag)) {
    return true;
  }

  return false;
};

// (tag:ByteArray):uint {
FlvTag.frameTime = function(tag) {
  var pts = tag[ 4] << 16; // :uint
  pts |= tag[ 5] <<  8;
  pts |= tag[ 6] <<  0;
  pts |= tag[ 7] << 24;
  return pts;
};

module.exports = FlvTag;

},{}],68:[function(require,module,exports){
module.exports = {
  tag: require('./flv-tag'),
  Transmuxer: require('./transmuxer')
};

},{"./flv-tag":67,"./transmuxer":69}],69:[function(require,module,exports){
'use strict';

var Stream = require('../utils/stream.js');
var FlvTag = require('./flv-tag.js');
var m2ts = require('../m2ts/m2ts.js');
var AdtsStream = require('../codecs/adts.js');
var H264Stream = require('../codecs/h264').H264Stream;

var
  Transmuxer,
  VideoSegmentStream,
  AudioSegmentStream,
  CoalesceStream,
  collectTimelineInfo,
  metaDataTag,
  extraDataTag;

/**
 * Store information about the start and end of the tracka and the
 * duration for each frame/sample we process in order to calculate
 * the baseMediaDecodeTime
 */
collectTimelineInfo = function(track, data) {
  if (typeof data.pts === 'number') {
    if (track.timelineStartInfo.pts === undefined) {
      track.timelineStartInfo.pts = data.pts;
    } else {
      track.timelineStartInfo.pts =
        Math.min(track.timelineStartInfo.pts, data.pts);
    }
  }

  if (typeof data.dts === 'number') {
    if (track.timelineStartInfo.dts === undefined) {
      track.timelineStartInfo.dts = data.dts;
    } else {
      track.timelineStartInfo.dts =
        Math.min(track.timelineStartInfo.dts, data.dts);
    }
  }
};

metaDataTag = function(track, pts) {
  var
    tag = new FlvTag(FlvTag.METADATA_TAG); // :FlvTag

  tag.dts = pts;
  tag.pts = pts;

  tag.writeMetaDataDouble('videocodecid', 7);
  tag.writeMetaDataDouble('width', track.width);
  tag.writeMetaDataDouble('height', track.height);

  return tag;
};

extraDataTag = function(track, pts) {
  var
    i,
    tag = new FlvTag(FlvTag.VIDEO_TAG, true);

  tag.dts = pts;
  tag.pts = pts;

  tag.writeByte(0x01);// version
  tag.writeByte(track.profileIdc);// profile
  tag.writeByte(track.profileCompatibility);// compatibility
  tag.writeByte(track.levelIdc);// level
  tag.writeByte(0xFC | 0x03); // reserved (6 bits), NULA length size - 1 (2 bits)
  tag.writeByte(0xE0 | 0x01); // reserved (3 bits), num of SPS (5 bits)
  tag.writeShort(track.sps[0].length); // data of SPS
  tag.writeBytes(track.sps[0]); // SPS

  tag.writeByte(track.pps.length); // num of PPS (will there ever be more that 1 PPS?)
  for (i = 0; i < track.pps.length; ++i) {
    tag.writeShort(track.pps[i].length); // 2 bytes for length of PPS
    tag.writeBytes(track.pps[i]); // data of PPS
  }

  return tag;
};

/**
 * Constructs a single-track, media segment from AAC data
 * events. The output of this stream can be fed to flash.
 */
AudioSegmentStream = function(track) {
  var
    adtsFrames = [],
    oldExtraData;

  AudioSegmentStream.prototype.init.call(this);

  this.push = function(data) {
    collectTimelineInfo(track, data);

    if (track && track.channelcount === undefined) {
      track.audioobjecttype = data.audioobjecttype;
      track.channelcount = data.channelcount;
      track.samplerate = data.samplerate;
      track.samplingfrequencyindex = data.samplingfrequencyindex;
      track.samplesize = data.samplesize;
      track.extraData = (track.audioobjecttype << 11) |
                        (track.samplingfrequencyindex << 7) |
                        (track.channelcount << 3);
    }

    data.pts = Math.round(data.pts / 90);
    data.dts = Math.round(data.dts / 90);

    // buffer audio data until end() is called
    adtsFrames.push(data);
  };

  this.flush = function() {
    var currentFrame, adtsFrame, lastMetaPts, tags = [];
    // return early if no audio data has been observed
    if (adtsFrames.length === 0) {
      this.trigger('done');
      return;
    }

    lastMetaPts = -Infinity;

    while (adtsFrames.length) {
      currentFrame = adtsFrames.shift();

      // write out metadata tags every 1 second so that the decoder
      // is re-initialized quickly after seeking into a different
      // audio configuration
      if (track.extraData !== oldExtraData || currentFrame.pts - lastMetaPts >= 1000) {
       adtsFrame = new FlvTag(FlvTag.METADATA_TAG);
        adtsFrame.pts = currentFrame.pts;
        adtsFrame.dts = currentFrame.dts;

        // AAC is always 10
        adtsFrame.writeMetaDataDouble('audiocodecid', 10);
        adtsFrame.writeMetaDataBoolean('stereo', track.channelcount === 2);
        adtsFrame.writeMetaDataDouble('audiosamplerate', track.samplerate);
        // Is AAC always 16 bit?
        adtsFrame.writeMetaDataDouble('audiosamplesize', 16);

        tags.push(adtsFrame);

        oldExtraData = track.extraData;

        adtsFrame = new FlvTag(FlvTag.AUDIO_TAG, true);
        // For audio, DTS is always the same as PTS. We want to set the DTS
        // however so we can compare with video DTS to determine approximate
        // packet order
        adtsFrame.pts = currentFrame.pts;
        adtsFrame.dts = currentFrame.dts;

        adtsFrame.view.setUint16(adtsFrame.position, track.extraData);
        adtsFrame.position += 2;
        adtsFrame.length = Math.max(adtsFrame.length, adtsFrame.position);

        tags.push(adtsFrame);

        lastMetaPts = currentFrame.pts;
      }
      adtsFrame = new FlvTag(FlvTag.AUDIO_TAG);
      adtsFrame.pts = currentFrame.pts;
      adtsFrame.dts = currentFrame.dts;

      adtsFrame.writeBytes(currentFrame.data);

      tags.push(adtsFrame);
    }

    oldExtraData = null;
    this.trigger('data', {track: track, tags: tags});

    this.trigger('done');
  };
};
AudioSegmentStream.prototype = new Stream();

/**
 * Store FlvTags for the h264 stream
 * @param track {object} track metadata configuration
 */
VideoSegmentStream = function(track) {
  var
    nalUnits = [],
    config,
    h264Frame;
  VideoSegmentStream.prototype.init.call(this);

  this.finishFrame = function(tags, frame) {
    if (!frame) {
      return;
    }
    // Check if keyframe and the length of tags.
    // This makes sure we write metadata on the first frame of a segment.
    if (config && track && track.newMetadata &&
        (frame.keyFrame || tags.length === 0)) {
      // Push extra data on every IDR frame in case we did a stream change + seek
      tags.push(metaDataTag(config, frame.dts));
      tags.push(extraDataTag(track, frame.dts));
      track.newMetadata = false;
    }

    frame.endNalUnit();
    tags.push(frame);
    h264Frame = null;
  };

  this.push = function(data) {
    collectTimelineInfo(track, data);

    data.pts = Math.round(data.pts / 90);
    data.dts = Math.round(data.dts / 90);

    // buffer video until flush() is called
    nalUnits.push(data);
  };

  this.flush = function() {
    var
      currentNal,
      tags = [];

    // Throw away nalUnits at the start of the byte stream until we find
    // the first AUD
    while (nalUnits.length) {
      if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
        break;
      }
      nalUnits.shift();
    }

    // return early if no video data has been observed
    if (nalUnits.length === 0) {
      this.trigger('done');
      return;
    }

    while (nalUnits.length) {
      currentNal = nalUnits.shift();

      // record the track config
      if (currentNal.nalUnitType === 'seq_parameter_set_rbsp') {
        track.newMetadata = true;
        config = currentNal.config;
        track.width = config.width;
        track.height = config.height;
        track.sps = [currentNal.data];
        track.profileIdc = config.profileIdc;
        track.levelIdc = config.levelIdc;
        track.profileCompatibility = config.profileCompatibility;
        h264Frame.endNalUnit();
      } else if (currentNal.nalUnitType === 'pic_parameter_set_rbsp') {
        track.newMetadata = true;
        track.pps = [currentNal.data];
        h264Frame.endNalUnit();
      } else if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
        if (h264Frame) {
          this.finishFrame(tags, h264Frame);
        }
        h264Frame = new FlvTag(FlvTag.VIDEO_TAG);
        h264Frame.pts = currentNal.pts;
        h264Frame.dts = currentNal.dts;
      } else {
        if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
          // the current sample is a key frame
          h264Frame.keyFrame = true;
        }
        h264Frame.endNalUnit();
      }
      h264Frame.startNalUnit();
      h264Frame.writeBytes(currentNal.data);
    }
    if (h264Frame) {
      this.finishFrame(tags, h264Frame);
    }

    this.trigger('data', {track: track, tags: tags});

    // Continue with the flush process now
    this.trigger('done');
  };
};

VideoSegmentStream.prototype = new Stream();

/**
 * The final stage of the transmuxer that emits the flv tags
 * for audio, video, and metadata. Also tranlates in time and
 * outputs caption data and id3 cues.
 */
CoalesceStream = function(options) {
  // Number of Tracks per output segment
  // If greater than 1, we combine multiple
  // tracks into a single segment
  this.numberOfTracks = 0;
  this.metadataStream = options.metadataStream;

  this.videoTags = [];
  this.audioTags = [];
  this.videoTrack = null;
  this.audioTrack = null;
  this.pendingCaptions = [];
  this.pendingMetadata = [];
  this.pendingTracks = 0;

  CoalesceStream.prototype.init.call(this);

  // Take output from multiple
  this.push = function(output) {
    // buffer incoming captions until the associated video segment
    // finishes
    if (output.text) {
      return this.pendingCaptions.push(output);
    }
    // buffer incoming id3 tags until the final flush
    if (output.frames) {
      return this.pendingMetadata.push(output);
    }

    if (output.track.type === 'video') {
      this.videoTrack = output.track;
      this.videoTags = output.tags;
      this.pendingTracks++;
    }
    if (output.track.type === 'audio') {
      this.audioTrack = output.track;
      this.audioTags = output.tags;
      this.pendingTracks++;
    }
  };
};

CoalesceStream.prototype = new Stream();
CoalesceStream.prototype.flush = function() {
  var
    id3,
    caption,
    i,
    timelineStartPts,
    event = {
      tags: {},
      captions: [],
      metadata: []
    };

  if (this.pendingTracks < this.numberOfTracks) {
    return;
  }

  if (this.videoTrack) {
    timelineStartPts = this.videoTrack.timelineStartInfo.pts;
  } else if (this.audioTrack) {
    timelineStartPts = this.audioTrack.timelineStartInfo.pts;
  }

  event.tags.videoTags = this.videoTags;
  event.tags.audioTags = this.audioTags;

  // Translate caption PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingCaptions.length; i++) {
    caption = this.pendingCaptions[i];
    caption.startTime = caption.startPts - timelineStartPts;
    caption.startTime /= 90e3;
    caption.endTime = caption.endPts - timelineStartPts;
    caption.endTime /= 90e3;
    event.captions.push(caption);
  }

  // Translate ID3 frame PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingMetadata.length; i++) {
    id3 = this.pendingMetadata[i];
    id3.cueTime = id3.pts - timelineStartPts;
    id3.cueTime /= 90e3;
    event.metadata.push(id3);
  }
  // We add this to every single emitted segment even though we only need
  // it for the first
  event.metadata.dispatchType = this.metadataStream.dispatchType;

  // Reset stream state
  this.videoTrack = null;
  this.audioTrack = null;
  this.videoTags = [];
  this.audioTags = [];
  this.pendingCaptions.length = 0;
  this.pendingMetadata.length = 0;
  this.pendingTracks = 0;

  // Emit the final segment
  this.trigger('data', event);

  this.trigger('done');
};

/**
 * An object that incrementally transmuxes MPEG2 Trasport Stream
 * chunks into an FLV.
 */
Transmuxer = function(options) {
  var
    self = this,

    packetStream, parseStream, elementaryStream,
    videoTimestampRolloverStream, audioTimestampRolloverStream,
    timedMetadataTimestampRolloverStream,
    adtsStream, h264Stream,
    videoSegmentStream, audioSegmentStream, captionStream,
    coalesceStream;

  Transmuxer.prototype.init.call(this);

  options = options || {};

  // expose the metadata stream
  this.metadataStream = new m2ts.MetadataStream();

  options.metadataStream = this.metadataStream;

  // set up the parsing pipeline
  packetStream = new m2ts.TransportPacketStream();
  parseStream = new m2ts.TransportParseStream();
  elementaryStream = new m2ts.ElementaryStream();
  videoTimestampRolloverStream = new m2ts.TimestampRolloverStream('video');
  audioTimestampRolloverStream = new m2ts.TimestampRolloverStream('audio');
  timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream('timed-metadata');

  adtsStream = new AdtsStream();
  h264Stream = new H264Stream();
  coalesceStream = new CoalesceStream(options);

  // disassemble MPEG2-TS packets into elementary streams
  packetStream
    .pipe(parseStream)
    .pipe(elementaryStream);

  // !!THIS ORDER IS IMPORTANT!!
  // demux the streams
  elementaryStream
    .pipe(videoTimestampRolloverStream)
    .pipe(h264Stream);
  elementaryStream
    .pipe(audioTimestampRolloverStream)
    .pipe(adtsStream);

  elementaryStream
    .pipe(timedMetadataTimestampRolloverStream)
    .pipe(this.metadataStream)
    .pipe(coalesceStream);
  // if CEA-708 parsing is available, hook up a caption stream
  captionStream = new m2ts.CaptionStream();
  h264Stream.pipe(captionStream)
    .pipe(coalesceStream);

  // hook up the segment streams once track metadata is delivered
  elementaryStream.on('data', function(data) {
    var i, videoTrack, audioTrack;

    if (data.type === 'metadata') {
      i = data.tracks.length;

      // scan the tracks listed in the metadata
      while (i--) {
        if (data.tracks[i].type === 'video') {
          videoTrack = data.tracks[i];
        } else if (data.tracks[i].type === 'audio') {
          audioTrack = data.tracks[i];
        }
      }

      // hook up the video segment stream to the first track with h264 data
      if (videoTrack && !videoSegmentStream) {
        coalesceStream.numberOfTracks++;
        videoSegmentStream = new VideoSegmentStream(videoTrack);

        // Set up the final part of the video pipeline
        h264Stream
          .pipe(videoSegmentStream)
          .pipe(coalesceStream);
      }

      if (audioTrack && !audioSegmentStream) {
        // hook up the audio segment stream to the first track with aac data
        coalesceStream.numberOfTracks++;
        audioSegmentStream = new AudioSegmentStream(audioTrack);

        // Set up the final part of the audio pipeline
        adtsStream
          .pipe(audioSegmentStream)
          .pipe(coalesceStream);
      }
    }
  });

  // feed incoming data to the front of the parsing pipeline
  this.push = function(data) {
    packetStream.push(data);
  };

  // flush any buffered data
  this.flush = function() {
    // Start at the top of the pipeline and flush all pending work
    packetStream.flush();
  };

  // Re-emit any data coming from the coalesce stream to the outside world
  coalesceStream.on('data', function(event) {
    self.trigger('data', event);
  });

  // Let the consumer know we have finished flushing the entire pipeline
  coalesceStream.on('done', function() {
    self.trigger('done');
  });

  // For information on the FLV format, see
  // http://download.macromedia.com/f4v/video_file_format_spec_v10_1.pdf.
  // Technically, this function returns the header and a metadata FLV tag
  // if duration is greater than zero
  // duration in seconds
  // @return {object} the bytes of the FLV header as a Uint8Array
  this.getFlvHeader = function(duration, audio, video) { // :ByteArray {
    var
      headBytes = new Uint8Array(3 + 1 + 1 + 4),
      head = new DataView(headBytes.buffer),
      metadata,
      result,
      metadataLength;

    // default arguments
    duration = duration || 0;
    audio = audio === undefined ? true : audio;
    video = video === undefined ? true : video;

    // signature
    head.setUint8(0, 0x46); // 'F'
    head.setUint8(1, 0x4c); // 'L'
    head.setUint8(2, 0x56); // 'V'

    // version
    head.setUint8(3, 0x01);

    // flags
    head.setUint8(4, (audio ? 0x04 : 0x00) | (video ? 0x01 : 0x00));

    // data offset, should be 9 for FLV v1
    head.setUint32(5, headBytes.byteLength);

    // init the first FLV tag
    if (duration <= 0) {
      // no duration available so just write the first field of the first
      // FLV tag
      result = new Uint8Array(headBytes.byteLength + 4);
      result.set(headBytes);
      result.set([0, 0, 0, 0], headBytes.byteLength);
      return result;
    }

    // write out the duration metadata tag
    metadata = new FlvTag(FlvTag.METADATA_TAG);
    metadata.pts = metadata.dts = 0;
    metadata.writeMetaDataDouble('duration', duration);
    metadataLength = metadata.finalize().length;
    result = new Uint8Array(headBytes.byteLength + metadataLength);
    result.set(headBytes);
    result.set(head.byteLength, metadataLength);

    return result;
  };
};
Transmuxer.prototype = new Stream();

// forward compatibility
module.exports = Transmuxer;

},{"../codecs/adts.js":65,"../codecs/h264":66,"../m2ts/m2ts.js":71,"../utils/stream.js":80,"./flv-tag.js":67}],70:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * Reads in-band caption information from a video elementary
 * stream. Captions must follow the CEA-708 standard for injection
 * into an MPEG-2 transport streams.
 * @see https://en.wikipedia.org/wiki/CEA-708
 */

'use strict';

// -----------------
// Link To Transport
// -----------------

// Supplemental enhancement information (SEI) NAL units have a
// payload type field to indicate how they are to be
// interpreted. CEAS-708 caption content is always transmitted with
// payload type 0x04.
var USER_DATA_REGISTERED_ITU_T_T35 = 4,
    RBSP_TRAILING_BITS = 128,
    Stream = require('../utils/stream');

/**
  * Parse a supplemental enhancement information (SEI) NAL unit.
  * Stops parsing once a message of type ITU T T35 has been found.
  *
  * @param bytes {Uint8Array} the bytes of a SEI NAL unit
  * @return {object} the parsed SEI payload
  * @see Rec. ITU-T H.264, 7.3.2.3.1
  */
var parseSei = function(bytes) {
  var
    i = 0,
    result = {
      payloadType: -1,
      payloadSize: 0
    },
    payloadType = 0,
    payloadSize = 0;

  // go through the sei_rbsp parsing each each individual sei_message
  while (i < bytes.byteLength) {
    // stop once we have hit the end of the sei_rbsp
    if (bytes[i] === RBSP_TRAILING_BITS) {
      break;
    }

    // Parse payload type
    while (bytes[i] === 0xFF) {
      payloadType += 255;
      i++;
    }
    payloadType += bytes[i++];

    // Parse payload size
    while (bytes[i] === 0xFF) {
      payloadSize += 255;
      i++;
    }
    payloadSize += bytes[i++];

    // this sei_message is a 608/708 caption so save it and break
    // there can only ever be one caption message in a frame's sei
    if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) {
      result.payloadType = payloadType;
      result.payloadSize = payloadSize;
      result.payload = bytes.subarray(i, i + payloadSize);
      break;
    }

    // skip the payload and parse the next message
    i += payloadSize;
    payloadType = 0;
    payloadSize = 0;
  }

  return result;
};

// see ANSI/SCTE 128-1 (2013), section 8.1
var parseUserData = function(sei) {
  // itu_t_t35_contry_code must be 181 (United States) for
  // captions
  if (sei.payload[0] !== 181) {
    return null;
  }

  // itu_t_t35_provider_code should be 49 (ATSC) for captions
  if (((sei.payload[1] << 8) | sei.payload[2]) !== 49) {
    return null;
  }

  // the user_identifier should be "GA94" to indicate ATSC1 data
  if (String.fromCharCode(sei.payload[3],
                          sei.payload[4],
                          sei.payload[5],
                          sei.payload[6]) !== 'GA94') {
    return null;
  }

  // finally, user_data_type_code should be 0x03 for caption data
  if (sei.payload[7] !== 0x03) {
    return null;
  }

  // return the user_data_type_structure and strip the trailing
  // marker bits
  return sei.payload.subarray(8, sei.payload.length - 1);
};

// see CEA-708-D, section 4.4
var parseCaptionPackets = function(pts, userData) {
  var results = [], i, count, offset, data;

  // if this is just filler, return immediately
  if (!(userData[0] & 0x40)) {
    return results;
  }

  // parse out the cc_data_1 and cc_data_2 fields
  count = userData[0] & 0x1f;
  for (i = 0; i < count; i++) {
    offset = i * 3;
    data = {
      type: userData[offset + 2] & 0x03,
      pts: pts
    };

    // capture cc data when cc_valid is 1
    if (userData[offset + 2] & 0x04) {
      data.ccData = (userData[offset + 3] << 8) | userData[offset + 4];
      results.push(data);
    }
  }
  return results;
};

var CaptionStream = function() {
  CaptionStream.prototype.init.call(this);

  this.captionPackets_ = [];

  this.field1_ = new Cea608Stream(); // eslint-disable-line no-use-before-define

  // forward data and done events from field1_ to this CaptionStream
  this.field1_.on('data', this.trigger.bind(this, 'data'));
  this.field1_.on('done', this.trigger.bind(this, 'done'));
};
CaptionStream.prototype = new Stream();
CaptionStream.prototype.push = function(event) {
  var sei, userData;

  // only examine SEI NALs
  if (event.nalUnitType !== 'sei_rbsp') {
    return;
  }

  // parse the sei
  sei = parseSei(event.escapedRBSP);

  // ignore everything but user_data_registered_itu_t_t35
  if (sei.payloadType !== USER_DATA_REGISTERED_ITU_T_T35) {
    return;
  }

  // parse out the user data payload
  userData = parseUserData(sei);

  // ignore unrecognized userData
  if (!userData) {
    return;
  }

  // parse out CC data packets and save them for later
  this.captionPackets_ = this.captionPackets_.concat(parseCaptionPackets(event.pts, userData));
};

CaptionStream.prototype.flush = function() {
  // make sure we actually parsed captions before proceeding
  if (!this.captionPackets_.length) {
    this.field1_.flush();
    return;
  }

  // In Chrome, the Array#sort function is not stable so add a
  // presortIndex that we can use to ensure we get a stable-sort
  this.captionPackets_.forEach(function(elem, idx) {
    elem.presortIndex = idx;
  });

  // sort caption byte-pairs based on their PTS values
  this.captionPackets_.sort(function(a, b) {
    if (a.pts === b.pts) {
      return a.presortIndex - b.presortIndex;
    }
    return a.pts - b.pts;
  });

  // Push each caption into Cea608Stream
  this.captionPackets_.forEach(this.field1_.push, this.field1_);

  this.captionPackets_.length = 0;
  this.field1_.flush();
  return;
};
// ----------------------
// Session to Application
// ----------------------

var BASIC_CHARACTER_TRANSLATION = {
  0x2a: 0xe1,
  0x5c: 0xe9,
  0x5e: 0xed,
  0x5f: 0xf3,
  0x60: 0xfa,
  0x7b: 0xe7,
  0x7c: 0xf7,
  0x7d: 0xd1,
  0x7e: 0xf1,
  0x7f: 0x2588
};

var getCharFromCode = function(code) {
  if (code === null) {
    return '';
  }
  code = BASIC_CHARACTER_TRANSLATION[code] || code;
  return String.fromCharCode(code);
};

// Constants for the byte codes recognized by Cea608Stream. This
// list is not exhaustive. For a more comprehensive listing and
// semantics see
// http://www.gpo.gov/fdsys/pkg/CFR-2010-title47-vol1/pdf/CFR-2010-title47-vol1-sec15-119.pdf
var PADDING                    = 0x0000,

    // Pop-on Mode
    RESUME_CAPTION_LOADING     = 0x1420,
    END_OF_CAPTION             = 0x142f,

    // Roll-up Mode
    ROLL_UP_2_ROWS             = 0x1425,
    ROLL_UP_3_ROWS             = 0x1426,
    ROLL_UP_4_ROWS             = 0x1427,
    CARRIAGE_RETURN            = 0x142d,
    // Erasure
    BACKSPACE                  = 0x1421,
    ERASE_DISPLAYED_MEMORY     = 0x142c,
    ERASE_NON_DISPLAYED_MEMORY = 0x142e;

// the index of the last row in a CEA-608 display buffer
var BOTTOM_ROW = 14;
// CEA-608 captions are rendered onto a 34x15 matrix of character
// cells. The "bottom" row is the last element in the outer array.
var createDisplayBuffer = function() {
  var result = [], i = BOTTOM_ROW + 1;
  while (i--) {
    result.push('');
  }
  return result;
};

var Cea608Stream = function() {
  Cea608Stream.prototype.init.call(this);

  this.mode_ = 'popOn';
  // When in roll-up mode, the index of the last row that will
  // actually display captions. If a caption is shifted to a row
  // with a lower index than this, it is cleared from the display
  // buffer
  this.topRow_ = 0;
  this.startPts_ = 0;
  this.displayed_ = createDisplayBuffer();
  this.nonDisplayed_ = createDisplayBuffer();
  this.lastControlCode_ = null;

  this.push = function(packet) {
    // Ignore other channels
    if (packet.type !== 0) {
      return;
    }
    var data, swap, char0, char1;
    // remove the parity bits
    data = packet.ccData & 0x7f7f;

    // ignore duplicate control codes
    if (data === this.lastControlCode_) {
      this.lastControlCode_ = null;
      return;
    }

    // Store control codes
    if ((data & 0xf000) === 0x1000) {
      this.lastControlCode_ = data;
    } else {
      this.lastControlCode_ = null;
    }

    switch (data) {
    case PADDING:
      break;
    case RESUME_CAPTION_LOADING:
      this.mode_ = 'popOn';
      break;
    case END_OF_CAPTION:
      // if a caption was being displayed, it's gone now
      this.flushDisplayed(packet.pts);

      // flip memory
      swap = this.displayed_;
      this.displayed_ = this.nonDisplayed_;
      this.nonDisplayed_ = swap;

      // start measuring the time to display the caption
      this.startPts_ = packet.pts;
      break;

    case ROLL_UP_2_ROWS:
      this.topRow_ = BOTTOM_ROW - 1;
      this.mode_ = 'rollUp';
      break;
    case ROLL_UP_3_ROWS:
      this.topRow_ = BOTTOM_ROW - 2;
      this.mode_ = 'rollUp';
      break;
    case ROLL_UP_4_ROWS:
      this.topRow_ = BOTTOM_ROW - 3;
      this.mode_ = 'rollUp';
      break;
    case CARRIAGE_RETURN:
      this.flushDisplayed(packet.pts);
      this.shiftRowsUp_();
      this.startPts_ = packet.pts;
      break;

    case BACKSPACE:
      if (this.mode_ === 'popOn') {
        this.nonDisplayed_[BOTTOM_ROW] = this.nonDisplayed_[BOTTOM_ROW].slice(0, -1);
      } else {
        this.displayed_[BOTTOM_ROW] = this.displayed_[BOTTOM_ROW].slice(0, -1);
      }
      break;
    case ERASE_DISPLAYED_MEMORY:
      this.flushDisplayed(packet.pts);
      this.displayed_ = createDisplayBuffer();
      break;
    case ERASE_NON_DISPLAYED_MEMORY:
      this.nonDisplayed_ = createDisplayBuffer();
      break;
    default:
      char0 = data >>> 8;
      char1 = data & 0xff;

      // Look for a Channel 1 Preamble Address Code
      if (char0 >= 0x10 && char0 <= 0x17 &&
          char1 >= 0x40 && char1 <= 0x7F &&
          (char0 !== 0x10 || char1 < 0x60)) {
        // Follow Safari's lead and replace the PAC with a space
        char0 = 0x20;
        // we only want one space so make the second character null
        // which will get become '' in getCharFromCode
        char1 = null;
      }

      // Look for special character sets
      if ((char0 === 0x11 || char0 === 0x19) &&
          (char1 >= 0x30 && char1 <= 0x3F)) {
        // Put in eigth note and space
        char0 = 0x266A;
        char1 = '';
      }

      // ignore unsupported control codes
      if ((char0 & 0xf0) === 0x10) {
        return;
      }

      // character handling is dependent on the current mode
      this[this.mode_](packet.pts, char0, char1);
      break;
    }
  };
};
Cea608Stream.prototype = new Stream();
// Trigger a cue point that captures the current state of the
// display buffer
Cea608Stream.prototype.flushDisplayed = function(pts) {
  var content = this.displayed_
    // remove spaces from the start and end of the string
    .map(function(row) {
      return row.trim();
    })
    // remove empty rows
    .filter(function(row) {
      return row.length;
    })
    // combine all text rows to display in one cue
    .join('\n');

  if (content.length) {
    this.trigger('data', {
      startPts: this.startPts_,
      endPts: pts,
      text: content
    });
  }
};

// Mode Implementations
Cea608Stream.prototype.popOn = function(pts, char0, char1) {
  var baseRow = this.nonDisplayed_[BOTTOM_ROW];

  // buffer characters
  baseRow += getCharFromCode(char0);
  baseRow += getCharFromCode(char1);
  this.nonDisplayed_[BOTTOM_ROW] = baseRow;
};

Cea608Stream.prototype.rollUp = function(pts, char0, char1) {
  var baseRow = this.displayed_[BOTTOM_ROW];
  if (baseRow === '') {
    // we're starting to buffer new display input, so flush out the
    // current display
    this.flushDisplayed(pts);

    this.startPts_ = pts;
  }

  baseRow += getCharFromCode(char0);
  baseRow += getCharFromCode(char1);

  this.displayed_[BOTTOM_ROW] = baseRow;
};
Cea608Stream.prototype.shiftRowsUp_ = function() {
  var i;
  // clear out inactive rows
  for (i = 0; i < this.topRow_; i++) {
    this.displayed_[i] = '';
  }
  // shift displayed rows up
  for (i = this.topRow_; i < BOTTOM_ROW; i++) {
    this.displayed_[i] = this.displayed_[i + 1];
  }
  // clear out the bottom row
  this.displayed_[BOTTOM_ROW] = '';
};

// exports
module.exports = {
  CaptionStream: CaptionStream,
  Cea608Stream: Cea608Stream
};

},{"../utils/stream":80}],71:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * A stream-based mp2t to mp4 converter. This utility can be used to
 * deliver mp4s to a SourceBuffer on platforms that support native
 * Media Source Extensions.
 */
'use strict';
var Stream = require('../utils/stream.js'),
  CaptionStream = require('./caption-stream'),
  StreamTypes = require('./stream-types'),
  TimestampRolloverStream = require('./timestamp-rollover-stream').TimestampRolloverStream;

var m2tsStreamTypes = require('./stream-types.js');

// object types
var TransportPacketStream, TransportParseStream, ElementaryStream;

// constants
var
  MP2T_PACKET_LENGTH = 188, // bytes
  SYNC_BYTE = 0x47;

/**
 * Splits an incoming stream of binary data into MPEG-2 Transport
 * Stream packets.
 */
TransportPacketStream = function() {
  var
    buffer = new Uint8Array(MP2T_PACKET_LENGTH),
    bytesInBuffer = 0;

  TransportPacketStream.prototype.init.call(this);

   // Deliver new bytes to the stream.

  this.push = function(bytes) {
    var
      startIndex = 0,
      endIndex = MP2T_PACKET_LENGTH,
      everything;

    // If there are bytes remaining from the last segment, prepend them to the
    // bytes that were pushed in
    if (bytesInBuffer) {
      everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
      everything.set(buffer.subarray(0, bytesInBuffer));
      everything.set(bytes, bytesInBuffer);
      bytesInBuffer = 0;
    } else {
      everything = bytes;
    }

    // While we have enough data for a packet
    while (endIndex < everything.byteLength) {
      // Look for a pair of start and end sync bytes in the data..
      if (everything[startIndex] === SYNC_BYTE && everything[endIndex] === SYNC_BYTE) {
        // We found a packet so emit it and jump one whole packet forward in
        // the stream
        this.trigger('data', everything.subarray(startIndex, endIndex));
        startIndex += MP2T_PACKET_LENGTH;
        endIndex += MP2T_PACKET_LENGTH;
        continue;
      }
      // If we get here, we have somehow become de-synchronized and we need to step
      // forward one byte at a time until we find a pair of sync bytes that denote
      // a packet
      startIndex++;
      endIndex++;
    }

    // If there was some data left over at the end of the segment that couldn't
    // possibly be a whole packet, keep it because it might be the start of a packet
    // that continues in the next segment
    if (startIndex < everything.byteLength) {
      buffer.set(everything.subarray(startIndex), 0);
      bytesInBuffer = everything.byteLength - startIndex;
    }
  };

  this.flush = function() {
    // If the buffer contains a whole packet when we are being flushed, emit it
    // and empty the buffer. Otherwise hold onto the data because it may be
    // important for decoding the next segment
    if (bytesInBuffer === MP2T_PACKET_LENGTH && buffer[0] === SYNC_BYTE) {
      this.trigger('data', buffer);
      bytesInBuffer = 0;
    }
    this.trigger('done');
  };
};
TransportPacketStream.prototype = new Stream();

/**
 * Accepts an MP2T TransportPacketStream and emits data events with parsed
 * forms of the individual transport stream packets.
 */
TransportParseStream = function() {
  var parsePsi, parsePat, parsePmt, self;
  TransportParseStream.prototype.init.call(this);
  self = this;

  this.packetsWaitingForPmt = [];
  this.programMapTable = undefined;

  parsePsi = function(payload, psi) {
    var offset = 0;

    // PSI packets may be split into multiple sections and those
    // sections may be split into multiple packets. If a PSI
    // section starts in this packet, the payload_unit_start_indicator
    // will be true and the first byte of the payload will indicate
    // the offset from the current position to the start of the
    // section.
    if (psi.payloadUnitStartIndicator) {
      offset += payload[offset] + 1;
    }

    if (psi.type === 'pat') {
      parsePat(payload.subarray(offset), psi);
    } else {
      parsePmt(payload.subarray(offset), psi);
    }
  };

  parsePat = function(payload, pat) {
    pat.section_number = payload[7]; // eslint-disable-line camelcase
    pat.last_section_number = payload[8]; // eslint-disable-line camelcase

    // skip the PSI header and parse the first PMT entry
    self.pmtPid = (payload[10] & 0x1F) << 8 | payload[11];
    pat.pmtPid = self.pmtPid;
  };

  /**
   * Parse out the relevant fields of a Program Map Table (PMT).
   * @param payload {Uint8Array} the PMT-specific portion of an MP2T
   * packet. The first byte in this array should be the table_id
   * field.
   * @param pmt {object} the object that should be decorated with
   * fields parsed from the PMT.
   */
  parsePmt = function(payload, pmt) {
    var sectionLength, tableEnd, programInfoLength, offset;

    // PMTs can be sent ahead of the time when they should actually
    // take effect. We don't believe this should ever be the case
    // for HLS but we'll ignore "forward" PMT declarations if we see
    // them. Future PMT declarations have the current_next_indicator
    // set to zero.
    if (!(payload[5] & 0x01)) {
      return;
    }

    // overwrite any existing program map table
    self.programMapTable = {};

    // the mapping table ends at the end of the current section
    sectionLength = (payload[1] & 0x0f) << 8 | payload[2];
    tableEnd = 3 + sectionLength - 4;

    // to determine where the table is, we have to figure out how
    // long the program info descriptors are
    programInfoLength = (payload[10] & 0x0f) << 8 | payload[11];

    // advance the offset to the first entry in the mapping table
    offset = 12 + programInfoLength;
    while (offset < tableEnd) {
      // add an entry that maps the elementary_pid to the stream_type
      self.programMapTable[(payload[offset + 1] & 0x1F) << 8 | payload[offset + 2]] = payload[offset];

      // move to the next table entry
      // skip past the elementary stream descriptors, if present
      offset += ((payload[offset + 3] & 0x0F) << 8 | payload[offset + 4]) + 5;
    }

    // record the map on the packet as well
    pmt.programMapTable = self.programMapTable;

    // if there are any packets waiting for a PMT to be found, process them now
    while (self.packetsWaitingForPmt.length) {
      self.processPes_.apply(self, self.packetsWaitingForPmt.shift());
    }
  };

  /**
   * Deliver a new MP2T packet to the stream.
   */
  this.push = function(packet) {
    var
      result = {},
      offset = 4;

    result.payloadUnitStartIndicator = !!(packet[1] & 0x40);

    // pid is a 13-bit field starting at the last bit of packet[1]
    result.pid = packet[1] & 0x1f;
    result.pid <<= 8;
    result.pid |= packet[2];

    // if an adaption field is present, its length is specified by the
    // fifth byte of the TS packet header. The adaptation field is
    // used to add stuffing to PES packets that don't fill a complete
    // TS packet, and to specify some forms of timing and control data
    // that we do not currently use.
    if (((packet[3] & 0x30) >>> 4) > 0x01) {
      offset += packet[offset] + 1;
    }

    // parse the rest of the packet based on the type
    if (result.pid === 0) {
      result.type = 'pat';
      parsePsi(packet.subarray(offset), result);
      this.trigger('data', result);
    } else if (result.pid === this.pmtPid) {
      result.type = 'pmt';
      parsePsi(packet.subarray(offset), result);
      this.trigger('data', result);
    } else if (this.programMapTable === undefined) {
      // When we have not seen a PMT yet, defer further processing of
      // PES packets until one has been parsed
      this.packetsWaitingForPmt.push([packet, offset, result]);
    } else {
      this.processPes_(packet, offset, result);
    }
  };

  this.processPes_ = function(packet, offset, result) {
    result.streamType = this.programMapTable[result.pid];
    result.type = 'pes';
    result.data = packet.subarray(offset);

    this.trigger('data', result);
  };

};
TransportParseStream.prototype = new Stream();
TransportParseStream.STREAM_TYPES  = {
  h264: 0x1b,
  adts: 0x0f
};

/**
 * Reconsistutes program elementary stream (PES) packets from parsed
 * transport stream packets. That is, if you pipe an
 * mp2t.TransportParseStream into a mp2t.ElementaryStream, the output
 * events will be events which capture the bytes for individual PES
 * packets plus relevant metadata that has been extracted from the
 * container.
 */
ElementaryStream = function() {
  var
    self = this,
    // PES packet fragments
    video = {
      data: [],
      size: 0
    },
    audio = {
      data: [],
      size: 0
    },
    timedMetadata = {
      data: [],
      size: 0
    },
    parsePes = function(payload, pes) {
      var ptsDtsFlags;

      // find out if this packets starts a new keyframe
      pes.dataAlignmentIndicator = (payload[6] & 0x04) !== 0;
      // PES packets may be annotated with a PTS value, or a PTS value
      // and a DTS value. Determine what combination of values is
      // available to work with.
      ptsDtsFlags = payload[7];

      // PTS and DTS are normally stored as a 33-bit number.  Javascript
      // performs all bitwise operations on 32-bit integers but javascript
      // supports a much greater range (52-bits) of integer using standard
      // mathematical operations.
      // We construct a 31-bit value using bitwise operators over the 31
      // most significant bits and then multiply by 4 (equal to a left-shift
      // of 2) before we add the final 2 least significant bits of the
      // timestamp (equal to an OR.)
      if (ptsDtsFlags & 0xC0) {
        // the PTS and DTS are not written out directly. For information
        // on how they are encoded, see
        // http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
        pes.pts = (payload[9] & 0x0E) << 27 |
          (payload[10] & 0xFF) << 20 |
          (payload[11] & 0xFE) << 12 |
          (payload[12] & 0xFF) <<  5 |
          (payload[13] & 0xFE) >>>  3;
        pes.pts *= 4; // Left shift by 2
        pes.pts += (payload[13] & 0x06) >>> 1; // OR by the two LSBs
        pes.dts = pes.pts;
        if (ptsDtsFlags & 0x40) {
          pes.dts = (payload[14] & 0x0E) << 27 |
            (payload[15] & 0xFF) << 20 |
            (payload[16] & 0xFE) << 12 |
            (payload[17] & 0xFF) << 5 |
            (payload[18] & 0xFE) >>> 3;
          pes.dts *= 4; // Left shift by 2
          pes.dts += (payload[18] & 0x06) >>> 1; // OR by the two LSBs
        }
      }
      // the data section starts immediately after the PES header.
      // pes_header_data_length specifies the number of header bytes
      // that follow the last byte of the field.
      pes.data = payload.subarray(9 + payload[8]);
    },
    flushStream = function(stream, type) {
      var
        packetData = new Uint8Array(stream.size),
        event = {
          type: type
        },
        i = 0,
        fragment;

      // do nothing if there is no buffered data
      if (!stream.data.length) {
        return;
      }
      event.trackId = stream.data[0].pid;

      // reassemble the packet
      while (stream.data.length) {
        fragment = stream.data.shift();

        packetData.set(fragment.data, i);
        i += fragment.data.byteLength;
      }

      // parse assembled packet's PES header
      parsePes(packetData, event);

      stream.size = 0;

      self.trigger('data', event);
    };

  ElementaryStream.prototype.init.call(this);

  this.push = function(data) {
    ({
      pat: function() {
        // we have to wait for the PMT to arrive as well before we
        // have any meaningful metadata
      },
      pes: function() {
        var stream, streamType;

        switch (data.streamType) {
        case StreamTypes.H264_STREAM_TYPE:
        case m2tsStreamTypes.H264_STREAM_TYPE:
          stream = video;
          streamType = 'video';
          break;
        case StreamTypes.ADTS_STREAM_TYPE:
          stream = audio;
          streamType = 'audio';
          break;
        case StreamTypes.METADATA_STREAM_TYPE:
          stream = timedMetadata;
          streamType = 'timed-metadata';
          break;
        default:
          // ignore unknown stream types
          return;
        }

        // if a new packet is starting, we can flush the completed
        // packet
        if (data.payloadUnitStartIndicator) {
          flushStream(stream, streamType);
        }

        // buffer this fragment until we are sure we've received the
        // complete payload
        stream.data.push(data);
        stream.size += data.data.byteLength;
      },
      pmt: function() {
        var
          event = {
            type: 'metadata',
            tracks: []
          },
          programMapTable = data.programMapTable,
          k,
          track;

        // translate streams to tracks
        for (k in programMapTable) {
          if (programMapTable.hasOwnProperty(k)) {
            track = {
              timelineStartInfo: {
                baseMediaDecodeTime: 0
              }
            };
            track.id = +k;
            if (programMapTable[k] === m2tsStreamTypes.H264_STREAM_TYPE) {
              track.codec = 'avc';
              track.type = 'video';
            } else if (programMapTable[k] === m2tsStreamTypes.ADTS_STREAM_TYPE) {
              track.codec = 'adts';
              track.type = 'audio';
            }
            event.tracks.push(track);
          }
        }
        self.trigger('data', event);
      }
    })[data.type]();
  };

  /**
   * Flush any remaining input. Video PES packets may be of variable
   * length. Normally, the start of a new video packet can trigger the
   * finalization of the previous packet. That is not possible if no
   * more video is forthcoming, however. In that case, some other
   * mechanism (like the end of the file) has to be employed. When it is
   * clear that no additional data is forthcoming, calling this method
   * will flush the buffered packets.
   */
  this.flush = function() {
    // !!THIS ORDER IS IMPORTANT!!
    // video first then audio
    flushStream(video, 'video');
    flushStream(audio, 'audio');
    flushStream(timedMetadata, 'timed-metadata');
    this.trigger('done');
  };
};
ElementaryStream.prototype = new Stream();

var m2ts = {
  PAT_PID: 0x0000,
  MP2T_PACKET_LENGTH: MP2T_PACKET_LENGTH,
  TransportPacketStream: TransportPacketStream,
  TransportParseStream: TransportParseStream,
  ElementaryStream: ElementaryStream,
  TimestampRolloverStream: TimestampRolloverStream,
  CaptionStream: CaptionStream.CaptionStream,
  Cea608Stream: CaptionStream.Cea608Stream,
  MetadataStream: require('./metadata-stream')
};

for (var type in StreamTypes) {
  if (StreamTypes.hasOwnProperty(type)) {
    m2ts[type] = StreamTypes[type];
  }
}

module.exports = m2ts;

},{"../utils/stream.js":80,"./caption-stream":70,"./metadata-stream":72,"./stream-types":73,"./stream-types.js":73,"./timestamp-rollover-stream":74}],72:[function(require,module,exports){
/**
 * Accepts program elementary stream (PES) data events and parses out
 * ID3 metadata from them, if present.
 * @see http://id3.org/id3v2.3.0
 */
'use strict';
var
  Stream = require('../utils/stream'),
  StreamTypes = require('./stream-types'),
  // return a percent-encoded representation of the specified byte range
  // @see http://en.wikipedia.org/wiki/Percent-encoding
  percentEncode = function(bytes, start, end) {
    var i, result = '';
    for (i = start; i < end; i++) {
      result += '%' + ('00' + bytes[i].toString(16)).slice(-2);
    }
    return result;
  },
  // return the string representation of the specified byte range,
  // interpreted as UTf-8.
  parseUtf8 = function(bytes, start, end) {
    return decodeURIComponent(percentEncode(bytes, start, end));
  },
  // return the string representation of the specified byte range,
  // interpreted as ISO-8859-1.
  parseIso88591 = function(bytes, start, end) {
    return unescape(percentEncode(bytes, start, end)); // jshint ignore:line
  },
  parseSyncSafeInteger = function(data) {
    return (data[0] << 21) |
            (data[1] << 14) |
            (data[2] << 7) |
            (data[3]);
  },
  tagParsers = {
    TXXX: function(tag) {
      var i;
      if (tag.data[0] !== 3) {
        // ignore frames with unrecognized character encodings
        return;
      }

      for (i = 1; i < tag.data.length; i++) {
        if (tag.data[i] === 0) {
          // parse the text fields
          tag.description = parseUtf8(tag.data, 1, i);
          // do not include the null terminator in the tag value
          tag.value = parseUtf8(tag.data, i + 1, tag.data.length - 1);
          break;
        }
      }
      tag.data = tag.value;
    },
    WXXX: function(tag) {
      var i;
      if (tag.data[0] !== 3) {
        // ignore frames with unrecognized character encodings
        return;
      }

      for (i = 1; i < tag.data.length; i++) {
        if (tag.data[i] === 0) {
          // parse the description and URL fields
          tag.description = parseUtf8(tag.data, 1, i);
          tag.url = parseUtf8(tag.data, i + 1, tag.data.length);
          break;
        }
      }
    },
    PRIV: function(tag) {
      var i;

      for (i = 0; i < tag.data.length; i++) {
        if (tag.data[i] === 0) {
          // parse the description and URL fields
          tag.owner = parseIso88591(tag.data, 0, i);
          break;
        }
      }
      tag.privateData = tag.data.subarray(i + 1);
      tag.data = tag.privateData;
    }
  },
  MetadataStream;

MetadataStream = function(options) {
  var
    settings = {
      debug: !!(options && options.debug),

      // the bytes of the program-level descriptor field in MP2T
      // see ISO/IEC 13818-1:2013 (E), section 2.6 "Program and
      // program element descriptors"
      descriptor: options && options.descriptor
    },
    // the total size in bytes of the ID3 tag being parsed
    tagSize = 0,
    // tag data that is not complete enough to be parsed
    buffer = [],
    // the total number of bytes currently in the buffer
    bufferSize = 0,
    i;

  MetadataStream.prototype.init.call(this);

  // calculate the text track in-band metadata track dispatch type
  // https://html.spec.whatwg.org/multipage/embedded-content.html#steps-to-expose-a-media-resource-specific-text-track
  this.dispatchType = StreamTypes.METADATA_STREAM_TYPE.toString(16);
  if (settings.descriptor) {
    for (i = 0; i < settings.descriptor.length; i++) {
      this.dispatchType += ('00' + settings.descriptor[i].toString(16)).slice(-2);
    }
  }

  this.push = function(chunk) {
    var tag, frameStart, frameSize, frame, i, frameHeader;
    if (chunk.type !== 'timed-metadata') {
      return;
    }

    // if data_alignment_indicator is set in the PES header,
    // we must have the start of a new ID3 tag. Assume anything
    // remaining in the buffer was malformed and throw it out
    if (chunk.dataAlignmentIndicator) {
      bufferSize = 0;
      buffer.length = 0;
    }

    // ignore events that don't look like ID3 data
    if (buffer.length === 0 &&
        (chunk.data.length < 10 ||
          chunk.data[0] !== 'I'.charCodeAt(0) ||
          chunk.data[1] !== 'D'.charCodeAt(0) ||
          chunk.data[2] !== '3'.charCodeAt(0))) {
      if (settings.debug) {
        // eslint-disable-next-line no-console
        console.log('Skipping unrecognized metadata packet');
      }
      return;
    }

    // add this chunk to the data we've collected so far

    buffer.push(chunk);
    bufferSize += chunk.data.byteLength;

    // grab the size of the entire frame from the ID3 header
    if (buffer.length === 1) {
      // the frame size is transmitted as a 28-bit integer in the
      // last four bytes of the ID3 header.
      // The most significant bit of each byte is dropped and the
      // results concatenated to recover the actual value.
      tagSize = parseSyncSafeInteger(chunk.data.subarray(6, 10));

      // ID3 reports the tag size excluding the header but it's more
      // convenient for our comparisons to include it
      tagSize += 10;
    }

    // if the entire frame has not arrived, wait for more data
    if (bufferSize < tagSize) {
      return;
    }

    // collect the entire frame so it can be parsed
    tag = {
      data: new Uint8Array(tagSize),
      frames: [],
      pts: buffer[0].pts,
      dts: buffer[0].dts
    };
    for (i = 0; i < tagSize;) {
      tag.data.set(buffer[0].data.subarray(0, tagSize - i), i);
      i += buffer[0].data.byteLength;
      bufferSize -= buffer[0].data.byteLength;
      buffer.shift();
    }

    // find the start of the first frame and the end of the tag
    frameStart = 10;
    if (tag.data[5] & 0x40) {
      // advance the frame start past the extended header
      frameStart += 4; // header size field
      frameStart += parseSyncSafeInteger(tag.data.subarray(10, 14));

      // clip any padding off the end
      tagSize -= parseSyncSafeInteger(tag.data.subarray(16, 20));
    }

    // parse one or more ID3 frames
    // http://id3.org/id3v2.3.0#ID3v2_frame_overview
    do {
      // determine the number of bytes in this frame
      frameSize = parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));
      if (frameSize < 1) {
         // eslint-disable-next-line no-console
        return console.log('Malformed ID3 frame encountered. Skipping metadata parsing.');
      }
      frameHeader = String.fromCharCode(tag.data[frameStart],
                                        tag.data[frameStart + 1],
                                        tag.data[frameStart + 2],
                                        tag.data[frameStart + 3]);


      frame = {
        id: frameHeader,
        data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10)
      };
      frame.key = frame.id;
      if (tagParsers[frame.id]) {
        tagParsers[frame.id](frame);

        // handle the special PRIV frame used to indicate the start
        // time for raw AAC data
        if (frame.owner === 'com.apple.streaming.transportStreamTimestamp') {
          var
            d = frame.data,
            size = ((d[3] & 0x01)  << 30) |
                   (d[4]  << 22) |
                   (d[5] << 14) |
                   (d[6] << 6) |
                   (d[7] >>> 2);

          size *= 4;
          size += d[7] & 0x03;
          frame.timeStamp = size;
          // in raw AAC, all subsequent data will be timestamped based
          // on the value of this frame
          // we couldn't have known the appropriate pts and dts before
          // parsing this ID3 tag so set those values now
          if (tag.pts === undefined && tag.dts === undefined) {
            tag.pts = frame.timeStamp;
            tag.dts = frame.timeStamp;
          }
          this.trigger('timestamp', frame);
        }
      }
      tag.frames.push(frame);

      frameStart += 10; // advance past the frame header
      frameStart += frameSize; // advance past the frame body
    } while (frameStart < tagSize);
    this.trigger('data', tag);
  };
};
MetadataStream.prototype = new Stream();

module.exports = MetadataStream;

},{"../utils/stream":80,"./stream-types":73}],73:[function(require,module,exports){
'use strict';

module.exports = {
  H264_STREAM_TYPE: 0x1B,
  ADTS_STREAM_TYPE: 0x0F,
  METADATA_STREAM_TYPE: 0x15
};

},{}],74:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2016 Brightcove
 * All rights reserved.
 *
 * Accepts program elementary stream (PES) data events and corrects
 * decode and presentation time stamps to account for a rollover
 * of the 33 bit value.
 */

'use strict';

var Stream = require('../utils/stream');

var MAX_TS = 8589934592;

var RO_THRESH = 4294967296;

var handleRollover = function(value, reference) {
  var direction = 1;

  if (value > reference) {
    // If the current timestamp value is greater than our reference timestamp and we detect a
    // timestamp rollover, this means the roll over is happening in the opposite direction.
    // Example scenario: Enter a long stream/video just after a rollover occurred. The reference
    // point will be set to a small number, e.g. 1. The user then seeks backwards over the
    // rollover point. In loading this segment, the timestamp values will be very large,
    // e.g. 2^33 - 1. Since this comes before the data we loaded previously, we want to adjust
    // the time stamp to be `value - 2^33`.
    direction = -1;
  }

  // Note: A seek forwards or back that is greater than the RO_THRESH (2^32, ~13 hours) will
  // cause an incorrect adjustment.
  while (Math.abs(reference - value) > RO_THRESH) {
    value += (direction * MAX_TS);
  }

  return value;
};

var TimestampRolloverStream = function(type) {
  var lastDTS, referenceDTS;

  TimestampRolloverStream.prototype.init.call(this);

  this.type_ = type;

  this.push = function(data) {
    if (data.type !== this.type_) {
      return;
    }

    if (referenceDTS === undefined) {
      referenceDTS = data.dts;
    }

    data.dts = handleRollover(data.dts, referenceDTS);
    data.pts = handleRollover(data.pts, referenceDTS);

    lastDTS = data.dts;

    this.trigger('data', data);
  };

  this.flush = function() {
    referenceDTS = lastDTS;
    this.trigger('done');
  };

};

TimestampRolloverStream.prototype = new Stream();

module.exports = {
  TimestampRolloverStream: TimestampRolloverStream,
  handleRollover: handleRollover
};

},{"../utils/stream":80}],75:[function(require,module,exports){
module.exports = {
  generator: require('./mp4-generator'),
  Transmuxer: require('./transmuxer').Transmuxer,
  AudioSegmentStream: require('./transmuxer').AudioSegmentStream,
  VideoSegmentStream: require('./transmuxer').VideoSegmentStream
};

},{"./mp4-generator":76,"./transmuxer":78}],76:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * Functions that generate fragmented MP4s suitable for use with Media
 * Source Extensions.
 */
'use strict';

var UINT32_MAX = Math.pow(2, 32) - 1;

var box, dinf, esds, ftyp, mdat, mfhd, minf, moof, moov, mvex, mvhd,
    trak, tkhd, mdia, mdhd, hdlr, sdtp, stbl, stsd, traf, trex,
    trun, types, MAJOR_BRAND, MINOR_VERSION, AVC1_BRAND, VIDEO_HDLR,
    AUDIO_HDLR, HDLR_TYPES, VMHD, SMHD, DREF, STCO, STSC, STSZ, STTS;

// pre-calculate constants
(function() {
  var i;
  types = {
    avc1: [], // codingname
    avcC: [],
    btrt: [],
    dinf: [],
    dref: [],
    esds: [],
    ftyp: [],
    hdlr: [],
    mdat: [],
    mdhd: [],
    mdia: [],
    mfhd: [],
    minf: [],
    moof: [],
    moov: [],
    mp4a: [], // codingname
    mvex: [],
    mvhd: [],
    sdtp: [],
    smhd: [],
    stbl: [],
    stco: [],
    stsc: [],
    stsd: [],
    stsz: [],
    stts: [],
    styp: [],
    tfdt: [],
    tfhd: [],
    traf: [],
    trak: [],
    trun: [],
    trex: [],
    tkhd: [],
    vmhd: []
  };

  // In environments where Uint8Array is undefined (e.g., IE8), skip set up so that we
  // don't throw an error
  if (typeof Uint8Array === 'undefined') {
    return;
  }

  for (i in types) {
    if (types.hasOwnProperty(i)) {
      types[i] = [
        i.charCodeAt(0),
        i.charCodeAt(1),
        i.charCodeAt(2),
        i.charCodeAt(3)
      ];
    }
  }

  MAJOR_BRAND = new Uint8Array([
    'i'.charCodeAt(0),
    's'.charCodeAt(0),
    'o'.charCodeAt(0),
    'm'.charCodeAt(0)
  ]);
  AVC1_BRAND = new Uint8Array([
    'a'.charCodeAt(0),
    'v'.charCodeAt(0),
    'c'.charCodeAt(0),
    '1'.charCodeAt(0)
  ]);
  MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);
  VIDEO_HDLR = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x56, 0x69, 0x64, 0x65,
    0x6f, 0x48, 0x61, 0x6e,
    0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
  ]);
  AUDIO_HDLR = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x53, 0x6f, 0x75, 0x6e,
    0x64, 0x48, 0x61, 0x6e,
    0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
  ]);
  HDLR_TYPES = {
    video: VIDEO_HDLR,
    audio: AUDIO_HDLR
  };
  DREF = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version 0
    0x00, 0x00, 0x01 // entry_flags
  ]);
  SMHD = new Uint8Array([
    0x00,             // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00,       // balance, 0 means centered
    0x00, 0x00        // reserved
  ]);
  STCO = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
  ]);
  STSC = STCO;
  STSZ = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00 // sample_count
  ]);
  STTS = STCO;
  VMHD = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphicsmode
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x00 // opcolor
  ]);
}());

box = function(type) {
  var
    payload = [],
    size = 0,
    i,
    result,
    view;

  for (i = 1; i < arguments.length; i++) {
    payload.push(arguments[i]);
  }

  i = payload.length;

  // calculate the total size we need to allocate
  while (i--) {
    size += payload[i].byteLength;
  }
  result = new Uint8Array(size + 8);
  view = new DataView(result.buffer, result.byteOffset, result.byteLength);
  view.setUint32(0, result.byteLength);
  result.set(type, 4);

  // copy the payload into the result
  for (i = 0, size = 8; i < payload.length; i++) {
    result.set(payload[i], size);
    size += payload[i].byteLength;
  }
  return result;
};

dinf = function() {
  return box(types.dinf, box(types.dref, DREF));
};

esds = function(track) {
  return box(types.esds, new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags

    // ES_Descriptor
    0x03, // tag, ES_DescrTag
    0x19, // length
    0x00, 0x00, // ES_ID
    0x00, // streamDependenceFlag, URL_flag, reserved, streamPriority

    // DecoderConfigDescriptor
    0x04, // tag, DecoderConfigDescrTag
    0x11, // length
    0x40, // object type
    0x15,  // streamType
    0x00, 0x06, 0x00, // bufferSizeDB
    0x00, 0x00, 0xda, 0xc0, // maxBitrate
    0x00, 0x00, 0xda, 0xc0, // avgBitrate

    // DecoderSpecificInfo
    0x05, // tag, DecoderSpecificInfoTag
    0x02, // length
    // ISO/IEC 14496-3, AudioSpecificConfig
    // for samplingFrequencyIndex see ISO/IEC 13818-7:2006, 8.1.3.2.2, Table 35
    (track.audioobjecttype << 3) | (track.samplingfrequencyindex >>> 1),
    (track.samplingfrequencyindex << 7) | (track.channelcount << 3),
    0x06, 0x01, 0x02 // GASpecificConfig
  ]));
};

ftyp = function() {
  return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
};

hdlr = function(type) {
  return box(types.hdlr, HDLR_TYPES[type]);
};
mdat = function(data) {
  return box(types.mdat, data);
};
mdhd = function(track) {
  var result = new Uint8Array([
    0x00,                   // version 0
    0x00, 0x00, 0x00,       // flags
    0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x03, // modification_time
    0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second

    (track.duration >>> 24) & 0xFF,
    (track.duration >>> 16) & 0xFF,
    (track.duration >>>  8) & 0xFF,
    track.duration & 0xFF,  // duration
    0x55, 0xc4,             // 'und' language (undetermined)
    0x00, 0x00
  ]);

  // Use the sample rate from the track metadata, when it is
  // defined. The sample rate can be parsed out of an ADTS header, for
  // instance.
  if (track.samplerate) {
    result[12] = (track.samplerate >>> 24) & 0xFF;
    result[13] = (track.samplerate >>> 16) & 0xFF;
    result[14] = (track.samplerate >>>  8) & 0xFF;
    result[15] = (track.samplerate)        & 0xFF;
  }

  return box(types.mdhd, result);
};
mdia = function(track) {
  return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));
};
mfhd = function(sequenceNumber) {
  return box(types.mfhd, new Uint8Array([
    0x00,
    0x00, 0x00, 0x00, // flags
    (sequenceNumber & 0xFF000000) >> 24,
    (sequenceNumber & 0xFF0000) >> 16,
    (sequenceNumber & 0xFF00) >> 8,
    sequenceNumber & 0xFF // sequence_number
  ]));
};
minf = function(track) {
  return box(types.minf,
             track.type === 'video' ? box(types.vmhd, VMHD) : box(types.smhd, SMHD),
             dinf(),
             stbl(track));
};
moof = function(sequenceNumber, tracks) {
  var
    trackFragments = [],
    i = tracks.length;
  // build traf boxes for each track fragment
  while (i--) {
    trackFragments[i] = traf(tracks[i]);
  }
  return box.apply(null, [
    types.moof,
    mfhd(sequenceNumber)
  ].concat(trackFragments));
};
/**
 * Returns a movie box.
 * @param tracks {array} the tracks associated with this movie
 * @see ISO/IEC 14496-12:2012(E), section 8.2.1
 */
moov = function(tracks) {
  var
    i = tracks.length,
    boxes = [];

  while (i--) {
    boxes[i] = trak(tracks[i]);
  }

  return box.apply(null, [types.moov, mvhd(0xffffffff)].concat(boxes).concat(mvex(tracks)));
};
mvex = function(tracks) {
  var
    i = tracks.length,
    boxes = [];

  while (i--) {
    boxes[i] = trex(tracks[i]);
  }
  return box.apply(null, [types.mvex].concat(boxes));
};
mvhd = function(duration) {
  var
    bytes = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01, // creation_time
      0x00, 0x00, 0x00, 0x02, // modification_time
      0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second
      (duration & 0xFF000000) >> 24,
      (duration & 0xFF0000) >> 16,
      (duration & 0xFF00) >> 8,
      duration & 0xFF, // duration
      0x00, 0x01, 0x00, 0x00, // 1.0 rate
      0x01, 0x00, // 1.0 volume
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0xff, 0xff, 0xff, 0xff // next_track_ID
    ]);
  return box(types.mvhd, bytes);
};

sdtp = function(track) {
  var
    samples = track.samples || [],
    bytes = new Uint8Array(4 + samples.length),
    flags,
    i;

  // leave the full box header (4 bytes) all zero

  // write the sample table
  for (i = 0; i < samples.length; i++) {
    flags = samples[i].flags;

    bytes[i + 4] = (flags.dependsOn << 4) |
      (flags.isDependedOn << 2) |
      (flags.hasRedundancy);
  }

  return box(types.sdtp,
             bytes);
};

stbl = function(track) {
  return box(types.stbl,
             stsd(track),
             box(types.stts, STTS),
             box(types.stsc, STSC),
             box(types.stsz, STSZ),
             box(types.stco, STCO));
};

(function() {
  var videoSample, audioSample;

  stsd = function(track) {

    return box(types.stsd, new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01
    ]), track.type === 'video' ? videoSample(track) : audioSample(track));
  };

  videoSample = function(track) {
    var
      sps = track.sps || [],
      pps = track.pps || [],
      sequenceParameterSets = [],
      pictureParameterSets = [],
      i;

    // assemble the SPSs
    for (i = 0; i < sps.length; i++) {
      sequenceParameterSets.push((sps[i].byteLength & 0xFF00) >>> 8);
      sequenceParameterSets.push((sps[i].byteLength & 0xFF)); // sequenceParameterSetLength
      sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i])); // SPS
    }

    // assemble the PPSs
    for (i = 0; i < pps.length; i++) {
      pictureParameterSets.push((pps[i].byteLength & 0xFF00) >>> 8);
      pictureParameterSets.push((pps[i].byteLength & 0xFF));
      pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
    }

    return box(types.avc1, new Uint8Array([
      0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      (track.width & 0xff00) >> 8,
      track.width & 0xff, // width
      (track.height & 0xff00) >> 8,
      track.height & 0xff, // height
      0x00, 0x48, 0x00, 0x00, // horizresolution
      0x00, 0x48, 0x00, 0x00, // vertresolution
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // frame_count
      0x13,
      0x76, 0x69, 0x64, 0x65,
      0x6f, 0x6a, 0x73, 0x2d,
      0x63, 0x6f, 0x6e, 0x74,
      0x72, 0x69, 0x62, 0x2d,
      0x68, 0x6c, 0x73, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // compressorname
      0x00, 0x18, // depth = 24
      0x11, 0x11 // pre_defined = -1
    ]), box(types.avcC, new Uint8Array([
      0x01, // configurationVersion
      track.profileIdc, // AVCProfileIndication
      track.profileCompatibility, // profile_compatibility
      track.levelIdc, // AVCLevelIndication
      0xff // lengthSizeMinusOne, hard-coded to 4 bytes
    ].concat([
      sps.length // numOfSequenceParameterSets
    ]).concat(sequenceParameterSets).concat([
      pps.length // numOfPictureParameterSets
    ]).concat(pictureParameterSets))), // "PPS"
            box(types.btrt, new Uint8Array([
              0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
              0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
              0x00, 0x2d, 0xc6, 0xc0
            ])) // avgBitrate
              );
  };

  audioSample = function(track) {
    return box(types.mp4a, new Uint8Array([

      // SampleEntry, ISO/IEC 14496-12
      0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index

      // AudioSampleEntry, ISO/IEC 14496-12
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      (track.channelcount & 0xff00) >> 8,
      (track.channelcount & 0xff), // channelcount

      (track.samplesize & 0xff00) >> 8,
      (track.samplesize & 0xff), // samplesize
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved

      (track.samplerate & 0xff00) >> 8,
      (track.samplerate & 0xff),
      0x00, 0x00 // samplerate, 16.16

      // MP4AudioSampleEntry, ISO/IEC 14496-14
    ]), esds(track));
  };
}());

tkhd = function(track) {
  var result = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x07, // flags
    0x00, 0x00, 0x00, 0x00, // creation_time
    0x00, 0x00, 0x00, 0x00, // modification_time
    (track.id & 0xFF000000) >> 24,
    (track.id & 0xFF0000) >> 16,
    (track.id & 0xFF00) >> 8,
    track.id & 0xFF, // track_ID
    0x00, 0x00, 0x00, 0x00, // reserved
    (track.duration & 0xFF000000) >> 24,
    (track.duration & 0xFF0000) >> 16,
    (track.duration & 0xFF00) >> 8,
    track.duration & 0xFF, // duration
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, // layer
    0x00, 0x00, // alternate_group
    0x01, 0x00, // non-audio track volume
    0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    (track.width & 0xFF00) >> 8,
    track.width & 0xFF,
    0x00, 0x00, // width
    (track.height & 0xFF00) >> 8,
    track.height & 0xFF,
    0x00, 0x00 // height
  ]);

  return box(types.tkhd, result);
};

/**
 * Generate a track fragment (traf) box. A traf box collects metadata
 * about tracks in a movie fragment (moof) box.
 */
traf = function(track) {
  var trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun,
      sampleDependencyTable, dataOffset,
      upperWordBaseMediaDecodeTime, lowerWordBaseMediaDecodeTime;

  trackFragmentHeader = box(types.tfhd, new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x3a, // flags
    (track.id & 0xFF000000) >> 24,
    (track.id & 0xFF0000) >> 16,
    (track.id & 0xFF00) >> 8,
    (track.id & 0xFF), // track_ID
    0x00, 0x00, 0x00, 0x01, // sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x00, 0x00, 0x00  // default_sample_flags
  ]));

  upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / (UINT32_MAX + 1));
  lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % (UINT32_MAX + 1));

  trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([
    0x01, // version 1
    0x00, 0x00, 0x00, // flags
    // baseMediaDecodeTime
    (upperWordBaseMediaDecodeTime >>> 24) & 0xFF,
    (upperWordBaseMediaDecodeTime >>> 16) & 0xFF,
    (upperWordBaseMediaDecodeTime >>>  8) & 0xFF,
    upperWordBaseMediaDecodeTime & 0xFF,
    (lowerWordBaseMediaDecodeTime >>> 24) & 0xFF,
    (lowerWordBaseMediaDecodeTime >>> 16) & 0xFF,
    (lowerWordBaseMediaDecodeTime >>>  8) & 0xFF,
    lowerWordBaseMediaDecodeTime & 0xFF
  ]));

  // the data offset specifies the number of bytes from the start of
  // the containing moof to the first payload byte of the associated
  // mdat
  dataOffset = (32 + // tfhd
                20 + // tfdt
                8 +  // traf header
                16 + // mfhd
                8 +  // moof header
                8);  // mdat header

  // audio tracks require less metadata
  if (track.type === 'audio') {
    trackFragmentRun = trun(track, dataOffset);
    return box(types.traf,
               trackFragmentHeader,
               trackFragmentDecodeTime,
               trackFragmentRun);
  }

  // video tracks should contain an independent and disposable samples
  // box (sdtp)
  // generate one and adjust offsets to match
  sampleDependencyTable = sdtp(track);
  trackFragmentRun = trun(track,
                          sampleDependencyTable.length + dataOffset);
  return box(types.traf,
             trackFragmentHeader,
             trackFragmentDecodeTime,
             trackFragmentRun,
             sampleDependencyTable);
};

/**
 * Generate a track box.
 * @param track {object} a track definition
 * @return {Uint8Array} the track box
 */
trak = function(track) {
  track.duration = track.duration || 0xffffffff;
  return box(types.trak,
             tkhd(track),
             mdia(track));
};

trex = function(track) {
  var result = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    (track.id & 0xFF000000) >> 24,
    (track.id & 0xFF0000) >> 16,
    (track.id & 0xFF00) >> 8,
    (track.id & 0xFF), // track_ID
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
  ]);
  // the last two bytes of default_sample_flags is the sample
  // degradation priority, a hint about the importance of this sample
  // relative to others. Lower the degradation priority for all sample
  // types other than video.
  if (track.type !== 'video') {
    result[result.length - 1] = 0x00;
  }

  return box(types.trex, result);
};

(function() {
  var audioTrun, videoTrun, trunHeader;

  // This method assumes all samples are uniform. That is, if a
  // duration is present for the first sample, it will be present for
  // all subsequent samples.
  // see ISO/IEC 14496-12:2012, Section 8.8.8.1
  trunHeader = function(samples, offset) {
    var durationPresent = 0, sizePresent = 0,
        flagsPresent = 0, compositionTimeOffset = 0;

    // trun flag constants
    if (samples.length) {
      if (samples[0].duration !== undefined) {
        durationPresent = 0x1;
      }
      if (samples[0].size !== undefined) {
        sizePresent = 0x2;
      }
      if (samples[0].flags !== undefined) {
        flagsPresent = 0x4;
      }
      if (samples[0].compositionTimeOffset !== undefined) {
        compositionTimeOffset = 0x8;
      }
    }

    return [
      0x00, // version 0
      0x00,
      durationPresent | sizePresent | flagsPresent | compositionTimeOffset,
      0x01, // flags
      (samples.length & 0xFF000000) >>> 24,
      (samples.length & 0xFF0000) >>> 16,
      (samples.length & 0xFF00) >>> 8,
      samples.length & 0xFF, // sample_count
      (offset & 0xFF000000) >>> 24,
      (offset & 0xFF0000) >>> 16,
      (offset & 0xFF00) >>> 8,
      offset & 0xFF // data_offset
    ];
  };

  videoTrun = function(track, offset) {
    var bytes, samples, sample, i;

    samples = track.samples || [];
    offset += 8 + 12 + (16 * samples.length);

    bytes = trunHeader(samples, offset);

    for (i = 0; i < samples.length; i++) {
      sample = samples[i];
      bytes = bytes.concat([
        (sample.duration & 0xFF000000) >>> 24,
        (sample.duration & 0xFF0000) >>> 16,
        (sample.duration & 0xFF00) >>> 8,
        sample.duration & 0xFF, // sample_duration
        (sample.size & 0xFF000000) >>> 24,
        (sample.size & 0xFF0000) >>> 16,
        (sample.size & 0xFF00) >>> 8,
        sample.size & 0xFF, // sample_size
        (sample.flags.isLeading << 2) | sample.flags.dependsOn,
        (sample.flags.isDependedOn << 6) |
          (sample.flags.hasRedundancy << 4) |
          (sample.flags.paddingValue << 1) |
          sample.flags.isNonSyncSample,
        sample.flags.degradationPriority & 0xF0 << 8,
        sample.flags.degradationPriority & 0x0F, // sample_flags
        (sample.compositionTimeOffset & 0xFF000000) >>> 24,
        (sample.compositionTimeOffset & 0xFF0000) >>> 16,
        (sample.compositionTimeOffset & 0xFF00) >>> 8,
        sample.compositionTimeOffset & 0xFF // sample_composition_time_offset
      ]);
    }
    return box(types.trun, new Uint8Array(bytes));
  };

  audioTrun = function(track, offset) {
    var bytes, samples, sample, i;

    samples = track.samples || [];
    offset += 8 + 12 + (8 * samples.length);

    bytes = trunHeader(samples, offset);

    for (i = 0; i < samples.length; i++) {
      sample = samples[i];
      bytes = bytes.concat([
        (sample.duration & 0xFF000000) >>> 24,
        (sample.duration & 0xFF0000) >>> 16,
        (sample.duration & 0xFF00) >>> 8,
        sample.duration & 0xFF, // sample_duration
        (sample.size & 0xFF000000) >>> 24,
        (sample.size & 0xFF0000) >>> 16,
        (sample.size & 0xFF00) >>> 8,
        sample.size & 0xFF]); // sample_size
    }

    return box(types.trun, new Uint8Array(bytes));
  };

  trun = function(track, offset) {
    if (track.type === 'audio') {
      return audioTrun(track, offset);
    }

    return videoTrun(track, offset);
  };
}());

module.exports = {
  ftyp: ftyp,
  mdat: mdat,
  moof: moof,
  moov: moov,
  initSegment: function(tracks) {
    var
      fileType = ftyp(),
      movie = moov(tracks),
      result;

    result = new Uint8Array(fileType.byteLength + movie.byteLength);
    result.set(fileType);
    result.set(movie, fileType.byteLength);
    return result;
  }
};

},{}],77:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * Utilities to detect basic properties and metadata about MP4s.
 */
'use strict';

var findBox, parseType, timescale, startTime;

// Find the data for a box specified by its path
findBox = function(data, path) {
  var results = [],
      i, size, type, end, subresults;

  if (!path.length) {
    // short-circuit the search for empty paths
    return null;
  }

  for (i = 0; i < data.byteLength;) {
    size  = data[i]     << 24;
    size |= data[i + 1] << 16;
    size |= data[i + 2] << 8;
    size |= data[i + 3];

    type = parseType(data.subarray(i + 4, i + 8));

    end = size > 1 ? i + size : data.byteLength;

    if (type === path[0]) {
      if (path.length === 1) {
        // this is the end of the path and we've found the box we were
        // looking for
        results.push(data.subarray(i + 8, end));
      } else {
        // recursively search for the next box along the path
        subresults = findBox(data.subarray(i + 8, end), path.slice(1));
        if (subresults.length) {
          results = results.concat(subresults);
        }
      }
    }
    i = end;
  }

  // we've finished searching all of data
  return results;
};

/**
 * Returns the string representation of an ASCII encoded four byte buffer.
 * @param buffer {Uint8Array} a four-byte buffer to translate
 * @return {string} the corresponding string
 */
parseType = function(buffer) {
  var result = '';
  result += String.fromCharCode(buffer[0]);
  result += String.fromCharCode(buffer[1]);
  result += String.fromCharCode(buffer[2]);
  result += String.fromCharCode(buffer[3]);
  return result;
};

/**
 * Parses an MP4 initialization segment and extracts the timescale
 * values for any declared tracks. Timescale values indicate the
 * number of clock ticks per second to assume for time-based values
 * elsewhere in the MP4.
 *
 * To determine the start time of an MP4, you need two pieces of
 * information: the timescale unit and the earliest base media decode
 * time. Multiple timescales can be specified within an MP4 but the
 * base media decode time is always expressed in the timescale from
 * the media header box for the track:
 * ```
 * moov > trak > mdia > mdhd.timescale
 * ```
 * @param init {Uint8Array} the bytes of the init segment
 * @return {object} a hash of track ids to timescale values or null if
 * the init segment is malformed.
 */
timescale = function(init) {
  var
    result = {},
    traks = findBox(init, ['moov', 'trak']);

  // mdhd timescale
  return traks.reduce(function(result, trak) {
    var tkhd, version, index, id, mdhd;

    tkhd = findBox(trak, ['tkhd'])[0];
    if (!tkhd) {
      return null;
    }
    version = tkhd[0];
    index = version === 0 ? 12 : 20;
    id = tkhd[index]     << 24 |
         tkhd[index + 1] << 16 |
         tkhd[index + 2] <<  8 |
         tkhd[index + 3];

    mdhd = findBox(trak, ['mdia', 'mdhd'])[0];
    if (!mdhd) {
      return null;
    }
    version = mdhd[0];
    index = version === 0 ? 12 : 20;
    result[id] = mdhd[index]     << 24 |
                 mdhd[index + 1] << 16 |
                 mdhd[index + 2] <<  8 |
                 mdhd[index + 3];
    return result;
  }, result);
};

/**
 * Determine the base media decode start time, in seconds, for an MP4
 * fragment. If multiple fragments are specified, the earliest time is
 * returned.
 *
 * The base media decode time can be parsed from track fragment
 * metadata:
 * ```
 * moof > traf > tfdt.baseMediaDecodeTime
 * ```
 * It requires the timescale value from the mdhd to interpret.
 *
 * @param timescale {object} a hash of track ids to timescale values.
 * @return {number} the earliest base media decode start time for the
 * fragment, in seconds
 */
startTime = function(timescale, fragment) {
  var trafs, baseTimes, result;

  // we need info from two childrend of each track fragment box
  trafs = findBox(fragment, ['moof', 'traf']);

  // determine the start times for each track
  baseTimes = [].concat.apply([], trafs.map(function(traf) {
    return findBox(traf, ['tfhd']).map(function(tfhd) {
      var id, scale, baseTime;

      // get the track id from the tfhd
      id = tfhd[4] << 24 |
           tfhd[5] << 16 |
           tfhd[6] << 8 |
           tfhd[7];
      // assume a 90kHz clock if no timescale was specified
      scale = timescale[id] || 90e3;

      // get the base media decode time from the tfdt
      baseTime = findBox(traf, ['tfdt']).map(function(tfdt) {
        var version, result;

        version = tfdt[0];
        result = tfdt[4] << 24 |
                 tfdt[5] << 16 |
                 tfdt[6] <<  8 |
                 tfdt[7];
        if (version ===  1) {
          result *= Math.pow(2, 32);
          result += tfdt[8]  << 24 |
                    tfdt[9]  << 16 |
                    tfdt[10] <<  8 |
                    tfdt[11];
        }
        return result;
      })[0];
      baseTime = baseTime || Infinity;

      // convert base time to seconds
      return baseTime / scale;
    });
  }));

  // return the minimum
  result = Math.min.apply(null, baseTimes);
  return isFinite(result) ? result : 0;
};

module.exports = {
  parseType: parseType,
  timescale: timescale,
  startTime: startTime
};

},{}],78:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * A stream-based mp2t to mp4 converter. This utility can be used to
 * deliver mp4s to a SourceBuffer on platforms that support native
 * Media Source Extensions.
 */
'use strict';

var Stream = require('../utils/stream.js');
var mp4 = require('./mp4-generator.js');
var m2ts = require('../m2ts/m2ts.js');
var AdtsStream = require('../codecs/adts.js');
var H264Stream = require('../codecs/h264').H264Stream;
var AacStream = require('../aac');

// constants
var AUDIO_PROPERTIES = [
  'audioobjecttype',
  'channelcount',
  'samplerate',
  'samplingfrequencyindex',
  'samplesize'
];

var VIDEO_PROPERTIES = [
  'width',
  'height',
  'profileIdc',
  'levelIdc',
  'profileCompatibility'
];

// object types
var VideoSegmentStream, AudioSegmentStream, Transmuxer, CoalesceStream;

// Helper functions
var
  createDefaultSample,
  isLikelyAacData,
  collectDtsInfo,
  clearDtsInfo,
  calculateTrackBaseMediaDecodeTime,
  arrayEquals,
  sumFrameByteLengths;

/**
 * Default sample object
 * see ISO/IEC 14496-12:2012, section 8.6.4.3
 */
createDefaultSample = function() {
  return {
    size: 0,
    flags: {
      isLeading: 0,
      dependsOn: 1,
      isDependedOn: 0,
      hasRedundancy: 0,
      degradationPriority: 0
    }
  };
};

isLikelyAacData = function(data) {
  if ((data[0] === 'I'.charCodeAt(0)) &&
      (data[1] === 'D'.charCodeAt(0)) &&
      (data[2] === '3'.charCodeAt(0))) {
    return true;
  }
  return false;
};

/**
 * Compare two arrays (even typed) for same-ness
 */
arrayEquals = function(a, b) {
  var
    i;

  if (a.length !== b.length) {
    return false;
  }

  // compare the value of each element in the array
  for (i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

/**
 * Sum the `byteLength` properties of the data in each AAC frame
 */
sumFrameByteLengths = function(array) {
  var
    i,
    currentObj,
    sum = 0;

  // sum the byteLength's all each nal unit in the frame
  for (i = 0; i < array.length; i++) {
    currentObj = array[i];
    sum += currentObj.data.byteLength;
  }

  return sum;
};

/**
 * Constructs a single-track, ISO BMFF media segment from AAC data
 * events. The output of this stream can be fed to a SourceBuffer
 * configured with a suitable initialization segment.
 */
AudioSegmentStream = function(track) {
  var
    adtsFrames = [],
    sequenceNumber = 0,
    earliestAllowedDts = 0;

  AudioSegmentStream.prototype.init.call(this);

  this.push = function(data) {
    collectDtsInfo(track, data);

    if (track) {
      AUDIO_PROPERTIES.forEach(function(prop) {
        track[prop] = data[prop];
      });
    }

    // buffer audio data until end() is called
    adtsFrames.push(data);
  };

  this.setEarliestDts = function(earliestDts) {
    earliestAllowedDts = earliestDts - track.timelineStartInfo.baseMediaDecodeTime;
  };

  this.flush = function() {
    var
      frames,
      moof,
      mdat,
      boxes;

    // return early if no audio data has been observed
    if (adtsFrames.length === 0) {
      this.trigger('done', 'AudioSegmentStream');
      return;
    }

    frames = this.trimAdtsFramesByEarliestDts_(adtsFrames);

    // we have to build the index from byte locations to
    // samples (that is, adts frames) in the audio data
    track.samples = this.generateSampleTable_(frames);

    // concatenate the audio data to constuct the mdat
    mdat = mp4.mdat(this.concatenateFrameData_(frames));

    adtsFrames = [];

    calculateTrackBaseMediaDecodeTime(track);
    moof = mp4.moof(sequenceNumber, [track]);
    boxes = new Uint8Array(moof.byteLength + mdat.byteLength);

    // bump the sequence number for next time
    sequenceNumber++;

    boxes.set(moof);
    boxes.set(mdat, moof.byteLength);

    clearDtsInfo(track);

    this.trigger('data', {track: track, boxes: boxes});
    this.trigger('done', 'AudioSegmentStream');
  };

  // If the audio segment extends before the earliest allowed dts
  // value, remove AAC frames until starts at or after the earliest
  // allowed DTS so that we don't end up with a negative baseMedia-
  // DecodeTime for the audio track
  this.trimAdtsFramesByEarliestDts_ = function(adtsFrames) {
    if (track.minSegmentDts >= earliestAllowedDts) {
      return adtsFrames;
    }

    // We will need to recalculate the earliest segment Dts
    track.minSegmentDts = Infinity;

    return adtsFrames.filter(function(currentFrame) {
      // If this is an allowed frame, keep it and record it's Dts
      if (currentFrame.dts >= earliestAllowedDts) {
        track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
        track.minSegmentPts = track.minSegmentDts;
        return true;
      }
      // Otherwise, discard it
      return false;
    });
  };

  // generate the track's raw mdat data from an array of frames
  this.generateSampleTable_ = function(frames) {
    var
      i,
      currentFrame,
      samples = [];

    for (i = 0; i < frames.length; i++) {
      currentFrame = frames[i];
      samples.push({
        size: currentFrame.data.byteLength,
        duration: 1024 // For AAC audio, all samples contain 1024 samples
      });
    }
    return samples;
  };

  // generate the track's sample table from an array of frames
  this.concatenateFrameData_ = function(frames) {
    var
      i,
      currentFrame,
      dataOffset = 0,
      data = new Uint8Array(sumFrameByteLengths(frames));

    for (i = 0; i < frames.length; i++) {
      currentFrame = frames[i];

      data.set(currentFrame.data, dataOffset);
      dataOffset += currentFrame.data.byteLength;
    }
    return data;
  };
};

AudioSegmentStream.prototype = new Stream();

/**
 * Constructs a single-track, ISO BMFF media segment from H264 data
 * events. The output of this stream can be fed to a SourceBuffer
 * configured with a suitable initialization segment.
 * @param track {object} track metadata configuration
 */
VideoSegmentStream = function(track) {
  var
    sequenceNumber = 0,
    nalUnits = [],
    config,
    pps;

  VideoSegmentStream.prototype.init.call(this);

  delete track.minPTS;

  this.gopCache_ = [];

  this.push = function(nalUnit) {
    collectDtsInfo(track, nalUnit);

    // record the track config
    if (nalUnit.nalUnitType === 'seq_parameter_set_rbsp' && !config) {
      config = nalUnit.config;
      track.sps = [nalUnit.data];

      VIDEO_PROPERTIES.forEach(function(prop) {
        track[prop] = config[prop];
      }, this);
    }

    if (nalUnit.nalUnitType === 'pic_parameter_set_rbsp' &&
        !pps) {
      pps = nalUnit.data;
      track.pps = [nalUnit.data];
    }

    // buffer video until flush() is called
    nalUnits.push(nalUnit);
  };

  this.flush = function() {
    var
      frames,
      gopForFusion,
      gops,
      moof,
      mdat,
      boxes;

    // Throw away nalUnits at the start of the byte stream until
    // we find the first AUD
    while (nalUnits.length) {
      if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
        break;
      }
      nalUnits.shift();
    }

    // Return early if no video data has been observed
    if (nalUnits.length === 0) {
      this.resetStream_();
      this.trigger('done', 'VideoSegmentStream');
      return;
    }

    // Organize the raw nal-units into arrays that represent
    // higher-level constructs such as frames and gops
    // (group-of-pictures)
    frames = this.groupNalsIntoFrames_(nalUnits);
    gops = this.groupFramesIntoGops_(frames);

    // If the first frame of this fragment is not a keyframe we have
    // a problem since MSE (on Chrome) requires a leading keyframe.
    //
    // We have two approaches to repairing this situation:
    // 1) GOP-FUSION:
    //    This is where we keep track of the GOPS (group-of-pictures)
    //    from previous fragments and attempt to find one that we can
    //    prepend to the current fragment in order to create a valid
    //    fragment.
    // 2) KEYFRAME-PULLING:
    //    Here we search for the first keyframe in the fragment and
    //    throw away all the frames between the start of the fragment
    //    and that keyframe. We then extend the duration and pull the
    //    PTS of the keyframe forward so that it covers the time range
    //    of the frames that were disposed of.
    //
    // #1 is far prefereable over #2 which can cause "stuttering" but
    // requires more things to be just right.
    if (!gops[0][0].keyFrame) {
      // Search for a gop for fusion from our gopCache
      gopForFusion = this.getGopForFusion_(nalUnits[0], track);

      if (gopForFusion) {
        gops.unshift(gopForFusion);
        // Adjust Gops' metadata to account for the inclusion of the
        // new gop at the beginning
        gops.byteLength += gopForFusion.byteLength;
        gops.nalCount += gopForFusion.nalCount;
        gops.pts = gopForFusion.pts;
        gops.dts = gopForFusion.dts;
        gops.duration += gopForFusion.duration;
      } else {
        // If we didn't find a candidate gop fall back to keyrame-pulling
        gops = this.extendFirstKeyFrame_(gops);
      }
    }
    collectDtsInfo(track, gops);

    // First, we have to build the index from byte locations to
    // samples (that is, frames) in the video data
    track.samples = this.generateSampleTable_(gops);

    // Concatenate the video data and construct the mdat
    mdat = mp4.mdat(this.concatenateNalData_(gops));

    // save all the nals in the last GOP into the gop cache
    this.gopCache_.unshift({
      gop: gops.pop(),
      pps: track.pps,
      sps: track.sps
    });

    // Keep a maximum of 6 GOPs in the cache
    this.gopCache_.length = Math.min(6, this.gopCache_.length);

    // Clear nalUnits
    nalUnits = [];

    calculateTrackBaseMediaDecodeTime(track);

    this.trigger('timelineStartInfo', track.timelineStartInfo);

    moof = mp4.moof(sequenceNumber, [track]);

    // it would be great to allocate this array up front instead of
    // throwing away hundreds of media segment fragments
    boxes = new Uint8Array(moof.byteLength + mdat.byteLength);

    // Bump the sequence number for next time
    sequenceNumber++;

    boxes.set(moof);
    boxes.set(mdat, moof.byteLength);

    this.trigger('data', {track: track, boxes: boxes});

    this.resetStream_();

    // Continue with the flush process now
    this.trigger('done', 'VideoSegmentStream');
  };

  this.resetStream_ = function() {
    clearDtsInfo(track);

    // reset config and pps because they may differ across segments
    // for instance, when we are rendition switching
    config = undefined;
    pps = undefined;
  };

  // Search for a candidate Gop for gop-fusion from the gop cache and
  // return it or return null if no good candidate was found
  this.getGopForFusion_ = function(nalUnit) {
    var
      halfSecond = 45000, // Half-a-second in a 90khz clock
      allowableOverlap = 10000, // About 3 frames @ 30fps
      nearestDistance = Infinity,
      dtsDistance,
      nearestGopObj,
      currentGop,
      currentGopObj,
      i;

    // Search for the GOP nearest to the beginning of this nal unit
    for (i = 0; i < this.gopCache_.length; i++) {
      currentGopObj = this.gopCache_[i];
      currentGop = currentGopObj.gop;

      // Reject Gops with different SPS or PPS
      if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) ||
          !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) {
        continue;
      }

      // Reject Gops that would require a negative baseMediaDecodeTime
      if (currentGop.dts < track.timelineStartInfo.dts) {
        continue;
      }

      // The distance between the end of the gop and the start of the nalUnit
      dtsDistance = (nalUnit.dts - currentGop.dts) - currentGop.duration;

      // Only consider GOPS that start before the nal unit and end within
      // a half-second of the nal unit
      if (dtsDistance >= -allowableOverlap &&
          dtsDistance <= halfSecond) {

        // Always use the closest GOP we found if there is more than
        // one candidate
        if (!nearestGopObj ||
            nearestDistance > dtsDistance) {
          nearestGopObj = currentGopObj;
          nearestDistance = dtsDistance;
        }
      }
    }

    if (nearestGopObj) {
      return nearestGopObj.gop;
    }
    return null;
  };

  this.extendFirstKeyFrame_ = function(gops) {
    var currentGop;

    if (!gops[0][0].keyFrame) {
      // Remove the first GOP
      currentGop = gops.shift();

      gops.byteLength -=  currentGop.byteLength;
      gops.nalCount -= currentGop.nalCount;

      // Extend the first frame of what is now the
      // first gop to cover the time period of the
      // frames we just removed
      gops[0][0].dts = currentGop.dts;
      gops[0][0].pts = currentGop.pts;
      gops[0][0].duration += currentGop.duration;
    }

    return gops;
  };

  // Convert an array of nal units into an array of frames with each frame being
  // composed of the nal units that make up that frame
  // Also keep track of cummulative data about the frame from the nal units such
  // as the frame duration, starting pts, etc.
  this.groupNalsIntoFrames_ = function(nalUnits) {
    var
      i,
      currentNal,
      currentFrame = [],
      frames = [];

    currentFrame.byteLength = 0;

    for (i = 0; i < nalUnits.length; i++) {
      currentNal = nalUnits[i];

      // Split on 'aud'-type nal units
      if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
        // Since the very first nal unit is expected to be an AUD
        // only push to the frames array when currentFrame is not empty
        if (currentFrame.length) {
          currentFrame.duration = currentNal.dts - currentFrame.dts;
          frames.push(currentFrame);
        }
        currentFrame = [currentNal];
        currentFrame.byteLength = currentNal.data.byteLength;
        currentFrame.pts = currentNal.pts;
        currentFrame.dts = currentNal.dts;
      } else {
        // Specifically flag key frames for ease of use later
        if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
          currentFrame.keyFrame = true;
        }
        currentFrame.duration = currentNal.dts - currentFrame.dts;
        currentFrame.byteLength += currentNal.data.byteLength;
        currentFrame.push(currentNal);
      }
    }

    // For the last frame, use the duration of the previous frame if we
    // have nothing better to go on
    if (frames.length &&
        (!currentFrame.duration ||
         currentFrame.duration <= 0)) {
      currentFrame.duration = frames[frames.length - 1].duration;
    }

    // Push the final frame
    frames.push(currentFrame);
    return frames;
  };

  // Convert an array of frames into an array of Gop with each Gop being composed
  // of the frames that make up that Gop
  // Also keep track of cummulative data about the Gop from the frames such as the
  // Gop duration, starting pts, etc.
  this.groupFramesIntoGops_ = function(frames) {
    var
      i,
      currentFrame,
      currentGop = [],
      gops = [];

    // We must pre-set some of the values on the Gop since we
    // keep running totals of these values
    currentGop.byteLength = 0;
    currentGop.nalCount = 0;
    currentGop.duration = 0;
    currentGop.pts = frames[0].pts;
    currentGop.dts = frames[0].dts;

    // store some metadata about all the Gops
    gops.byteLength = 0;
    gops.nalCount = 0;
    gops.duration = 0;
    gops.pts = frames[0].pts;
    gops.dts = frames[0].dts;

    for (i = 0; i < frames.length; i++) {
      currentFrame = frames[i];

      if (currentFrame.keyFrame) {
        // Since the very first frame is expected to be an keyframe
        // only push to the gops array when currentGop is not empty
        if (currentGop.length) {
          gops.push(currentGop);
          gops.byteLength += currentGop.byteLength;
          gops.nalCount += currentGop.nalCount;
          gops.duration += currentGop.duration;
        }

        currentGop = [currentFrame];
        currentGop.nalCount = currentFrame.length;
        currentGop.byteLength = currentFrame.byteLength;
        currentGop.pts = currentFrame.pts;
        currentGop.dts = currentFrame.dts;
        currentGop.duration = currentFrame.duration;
      } else {
        currentGop.duration += currentFrame.duration;
        currentGop.nalCount += currentFrame.length;
        currentGop.byteLength += currentFrame.byteLength;
        currentGop.push(currentFrame);
      }
    }

    if (gops.length && currentGop.duration <= 0) {
      currentGop.duration = gops[gops.length - 1].duration;
    }
    gops.byteLength += currentGop.byteLength;
    gops.nalCount += currentGop.nalCount;
    gops.duration += currentGop.duration;

    // push the final Gop
    gops.push(currentGop);
    return gops;
  };

  // generate the track's sample table from an array of gops
  this.generateSampleTable_ = function(gops, baseDataOffset) {
    var
      h, i,
      sample,
      currentGop,
      currentFrame,
      dataOffset = baseDataOffset || 0,
      samples = [];

    for (h = 0; h < gops.length; h++) {
      currentGop = gops[h];

      for (i = 0; i < currentGop.length; i++) {
        currentFrame = currentGop[i];

        sample = createDefaultSample();

        sample.dataOffset = dataOffset;
        sample.compositionTimeOffset = currentFrame.pts - currentFrame.dts;
        sample.duration = currentFrame.duration;
        sample.size = 4 * currentFrame.length; // Space for nal unit size
        sample.size += currentFrame.byteLength;

        if (currentFrame.keyFrame) {
          sample.flags.dependsOn = 2;
        }

        dataOffset += sample.size;

        samples.push(sample);
      }
    }
    return samples;
  };

  // generate the track's raw mdat data from an array of gops
  this.concatenateNalData_ = function(gops) {
    var
      h, i, j,
      currentGop,
      currentFrame,
      currentNal,
      dataOffset = 0,
      nalsByteLength = gops.byteLength,
      numberOfNals = gops.nalCount,
      totalByteLength = nalsByteLength + 4 * numberOfNals,
      data = new Uint8Array(totalByteLength),
      view = new DataView(data.buffer);

    // For each Gop..
    for (h = 0; h < gops.length; h++) {
      currentGop = gops[h];

      // For each Frame..
      for (i = 0; i < currentGop.length; i++) {
        currentFrame = currentGop[i];

        // For each NAL..
        for (j = 0; j < currentFrame.length; j++) {
          currentNal = currentFrame[j];

          view.setUint32(dataOffset, currentNal.data.byteLength);
          dataOffset += 4;
          data.set(currentNal.data, dataOffset);
          dataOffset += currentNal.data.byteLength;
        }
      }
    }
    return data;
  };
};

VideoSegmentStream.prototype = new Stream();

/**
 * Store information about the start and end of the track and the
 * duration for each frame/sample we process in order to calculate
 * the baseMediaDecodeTime
 */
collectDtsInfo = function(track, data) {
  if (typeof data.pts === 'number') {
    if (track.timelineStartInfo.pts === undefined) {
      track.timelineStartInfo.pts = data.pts;
    }

    if (track.minSegmentPts === undefined) {
      track.minSegmentPts = data.pts;
    } else {
      track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
    }

    if (track.maxSegmentPts === undefined) {
      track.maxSegmentPts = data.pts;
    } else {
      track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
    }
  }

  if (typeof data.dts === 'number') {
    if (track.timelineStartInfo.dts === undefined) {
      track.timelineStartInfo.dts = data.dts;
    }

    if (track.minSegmentDts === undefined) {
      track.minSegmentDts = data.dts;
    } else {
      track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
    }

    if (track.maxSegmentDts === undefined) {
      track.maxSegmentDts = data.dts;
    } else {
      track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
    }
  }
};

/**
 * Clear values used to calculate the baseMediaDecodeTime between
 * tracks
 */
clearDtsInfo = function(track) {
  delete track.minSegmentDts;
  delete track.maxSegmentDts;
  delete track.minSegmentPts;
  delete track.maxSegmentPts;
};

/**
 * Calculate the track's baseMediaDecodeTime based on the earliest
 * DTS the transmuxer has ever seen and the minimum DTS for the
 * current track
 */
calculateTrackBaseMediaDecodeTime = function(track) {
  var
    oneSecondInPTS = 90000, // 90kHz clock
    scale,
    // Calculate the distance, in time, that this segment starts from the start
    // of the timeline (earliest time seen since the transmuxer initialized)
    timeSinceStartOfTimeline = track.minSegmentDts - track.timelineStartInfo.dts,
    // Calculate the first sample's effective compositionTimeOffset
    firstSampleCompositionOffset = track.minSegmentPts - track.minSegmentDts;

  // track.timelineStartInfo.baseMediaDecodeTime is the location, in time, where
  // we want the start of the first segment to be placed
  track.baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime;

  // Add to that the distance this segment is from the very first
  track.baseMediaDecodeTime += timeSinceStartOfTimeline;

  // Subtract this segment's "compositionTimeOffset" so that the first frame of
  // this segment is displayed exactly at the `baseMediaDecodeTime` or at the
  // end of the previous segment
  track.baseMediaDecodeTime -= firstSampleCompositionOffset;

  // baseMediaDecodeTime must not become negative
  track.baseMediaDecodeTime = Math.max(0, track.baseMediaDecodeTime);

  if (track.type === 'audio') {
    // Audio has a different clock equal to the sampling_rate so we need to
    // scale the PTS values into the clock rate of the track
    scale = track.samplerate / oneSecondInPTS;
    track.baseMediaDecodeTime *= scale;
    track.baseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime);
  }
};

/**
 * A Stream that can combine multiple streams (ie. audio & video)
 * into a single output segment for MSE. Also supports audio-only
 * and video-only streams.
 */
CoalesceStream = function(options, metadataStream) {
  // Number of Tracks per output segment
  // If greater than 1, we combine multiple
  // tracks into a single segment
  this.numberOfTracks = 0;
  this.metadataStream = metadataStream;

  if (typeof options.remux !== 'undefined') {
    this.remuxTracks = !!options.remux;
  } else {
    this.remuxTracks = true;
  }

  this.pendingTracks = [];
  this.videoTrack = null;
  this.pendingBoxes = [];
  this.pendingCaptions = [];
  this.pendingMetadata = [];
  this.pendingBytes = 0;
  this.emittedTracks = 0;

  CoalesceStream.prototype.init.call(this);

  // Take output from multiple
  this.push = function(output) {
    // buffer incoming captions until the associated video segment
    // finishes
    if (output.text) {
      return this.pendingCaptions.push(output);
    }
    // buffer incoming id3 tags until the final flush
    if (output.frames) {
      return this.pendingMetadata.push(output);
    }

    // Add this track to the list of pending tracks and store
    // important information required for the construction of
    // the final segment
    this.pendingTracks.push(output.track);
    this.pendingBoxes.push(output.boxes);
    this.pendingBytes += output.boxes.byteLength;

    if (output.track.type === 'video') {
      this.videoTrack = output.track;
    }
    if (output.track.type === 'audio') {
      this.audioTrack = output.track;
    }
  };
};

CoalesceStream.prototype = new Stream();
CoalesceStream.prototype.flush = function(flushSource) {
  var
    offset = 0,
    event = {
      captions: [],
      metadata: [],
      info: {}
    },
    caption,
    id3,
    initSegment,
    timelineStartPts = 0,
    i;

  if (this.pendingTracks.length < this.numberOfTracks) {
    if (flushSource !== 'VideoSegmentStream' &&
        flushSource !== 'AudioSegmentStream') {
      // Return because we haven't received a flush from a data-generating
      // portion of the segment (meaning that we have only recieved meta-data
      // or captions.)
      return;
    } else if (this.remuxTracks) {
      // Return until we have enough tracks from the pipeline to remux (if we
      // are remuxing audio and video into a single MP4)
      return;
    } else if (this.pendingTracks.length === 0) {
      // In the case where we receive a flush without any data having been
      // received we consider it an emitted track for the purposes of coalescing
      // `done` events.
      // We do this for the case where there is an audio and video track in the
      // segment but no audio data. (seen in several playlists with alternate
      // audio tracks and no audio present in the main TS segments.)
      this.emittedTracks++;

      if (this.emittedTracks >= this.numberOfTracks) {
        this.trigger('done');
        this.emittedTracks = 0;
      }
      return;
    }
  }

  if (this.videoTrack) {
    timelineStartPts = this.videoTrack.timelineStartInfo.pts;
    VIDEO_PROPERTIES.forEach(function(prop) {
      event.info[prop] = this.videoTrack[prop];
    }, this);
  } else if (this.audioTrack) {
    timelineStartPts = this.audioTrack.timelineStartInfo.pts;
    AUDIO_PROPERTIES.forEach(function(prop) {
      event.info[prop] = this.audioTrack[prop];
    }, this);
  }

  if (this.pendingTracks.length === 1) {
    event.type = this.pendingTracks[0].type;
  } else {
    event.type = 'combined';
  }

  this.emittedTracks += this.pendingTracks.length;

  initSegment = mp4.initSegment(this.pendingTracks);

  // Create a new typed array to hold the init segment
  event.initSegment = new Uint8Array(initSegment.byteLength);

  // Create an init segment containing a moov
  // and track definitions
  event.initSegment.set(initSegment);

  // Create a new typed array to hold the moof+mdats
  event.data = new Uint8Array(this.pendingBytes);

  // Append each moof+mdat (one per track) together
  for (i = 0; i < this.pendingBoxes.length; i++) {
    event.data.set(this.pendingBoxes[i], offset);
    offset += this.pendingBoxes[i].byteLength;
  }

  // Translate caption PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingCaptions.length; i++) {
    caption = this.pendingCaptions[i];
    caption.startTime = (caption.startPts - timelineStartPts);
    caption.startTime /= 90e3;
    caption.endTime = (caption.endPts - timelineStartPts);
    caption.endTime /= 90e3;
    event.captions.push(caption);
  }

  // Translate ID3 frame PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingMetadata.length; i++) {
    id3 = this.pendingMetadata[i];
    id3.cueTime = (id3.pts - timelineStartPts);
    id3.cueTime /= 90e3;
    event.metadata.push(id3);
  }
  // We add this to every single emitted segment even though we only need
  // it for the first
  event.metadata.dispatchType = this.metadataStream.dispatchType;

  // Reset stream state
  this.pendingTracks.length = 0;
  this.videoTrack = null;
  this.pendingBoxes.length = 0;
  this.pendingCaptions.length = 0;
  this.pendingBytes = 0;
  this.pendingMetadata.length = 0;

  // Emit the built segment
  this.trigger('data', event);

  // Only emit `done` if all tracks have been flushed and emitted
  if (this.emittedTracks >= this.numberOfTracks) {
    this.trigger('done');
    this.emittedTracks = 0;
  }
};
/**
 * A Stream that expects MP2T binary data as input and produces
 * corresponding media segments, suitable for use with Media Source
 * Extension (MSE) implementations that support the ISO BMFF byte
 * stream format, like Chrome.
 */
Transmuxer = function(options) {
  var
    self = this,
    hasFlushed = true,
    videoTrack,
    audioTrack;

  Transmuxer.prototype.init.call(this);

  options = options || {};
  this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
  this.transmuxPipeline_ = {};

  this.setupAacPipeline = function() {
    var pipeline = {};
    this.transmuxPipeline_ = pipeline;

    pipeline.type = 'aac';
    pipeline.metadataStream = new m2ts.MetadataStream();

    // set up the parsing pipeline
    pipeline.aacStream = new AacStream();
    pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream('audio');
    pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream('timed-metadata');
    pipeline.adtsStream = new AdtsStream();
    pipeline.coalesceStream = new CoalesceStream(options, pipeline.metadataStream);
    pipeline.headOfPipeline = pipeline.aacStream;

    pipeline.aacStream
      .pipe(pipeline.audioTimestampRolloverStream)
      .pipe(pipeline.adtsStream);
    pipeline.aacStream
      .pipe(pipeline.timedMetadataTimestampRolloverStream)
      .pipe(pipeline.metadataStream)
      .pipe(pipeline.coalesceStream);

    pipeline.metadataStream.on('timestamp', function(frame) {
      pipeline.aacStream.setTimestamp(frame.timeStamp);
    });

    pipeline.aacStream.on('data', function(data) {
      if (data.type === 'timed-metadata' && !pipeline.audioSegmentStream) {
        audioTrack = audioTrack || {
          timelineStartInfo: {
            baseMediaDecodeTime: self.baseMediaDecodeTime
          },
          codec: 'adts',
          type: 'audio'
        };
        // hook up the audio segment stream to the first track with aac data
        pipeline.coalesceStream.numberOfTracks++;
        pipeline.audioSegmentStream = new AudioSegmentStream(audioTrack);
        // Set up the final part of the audio pipeline
        pipeline.adtsStream
          .pipe(pipeline.audioSegmentStream)
          .pipe(pipeline.coalesceStream);
      }
    });

    // Re-emit any data coming from the coalesce stream to the outside world
    pipeline.coalesceStream.on('data', this.trigger.bind(this, 'data'));
    // Let the consumer know we have finished flushing the entire pipeline
    pipeline.coalesceStream.on('done', this.trigger.bind(this, 'done'));
  };

  this.setupTsPipeline = function() {
    var pipeline = {};
    this.transmuxPipeline_ = pipeline;

    pipeline.type = 'ts';
    pipeline.metadataStream = new m2ts.MetadataStream();

    // set up the parsing pipeline
    pipeline.packetStream = new m2ts.TransportPacketStream();
    pipeline.parseStream = new m2ts.TransportParseStream();
    pipeline.elementaryStream = new m2ts.ElementaryStream();
    pipeline.videoTimestampRolloverStream = new m2ts.TimestampRolloverStream('video');
    pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream('audio');
    pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream('timed-metadata');
    pipeline.adtsStream = new AdtsStream();
    pipeline.h264Stream = new H264Stream();
    pipeline.captionStream = new m2ts.CaptionStream();
    pipeline.coalesceStream = new CoalesceStream(options, pipeline.metadataStream);
    pipeline.headOfPipeline = pipeline.packetStream;

    // disassemble MPEG2-TS packets into elementary streams
    pipeline.packetStream
      .pipe(pipeline.parseStream)
      .pipe(pipeline.elementaryStream);

    // !!THIS ORDER IS IMPORTANT!!
    // demux the streams
    pipeline.elementaryStream
      .pipe(pipeline.videoTimestampRolloverStream)
      .pipe(pipeline.h264Stream);
    pipeline.elementaryStream
      .pipe(pipeline.audioTimestampRolloverStream)
      .pipe(pipeline.adtsStream);

    pipeline.elementaryStream
      .pipe(pipeline.timedMetadataTimestampRolloverStream)
      .pipe(pipeline.metadataStream)
      .pipe(pipeline.coalesceStream);

    // Hook up CEA-608/708 caption stream
    pipeline.h264Stream.pipe(pipeline.captionStream)
      .pipe(pipeline.coalesceStream);

    pipeline.elementaryStream.on('data', function(data) {
      var i;

      if (data.type === 'metadata') {
        i = data.tracks.length;

        // scan the tracks listed in the metadata
        while (i--) {
          if (!videoTrack && data.tracks[i].type === 'video') {
            videoTrack = data.tracks[i];
            videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
          } else if (!audioTrack && data.tracks[i].type === 'audio') {
            audioTrack = data.tracks[i];
            audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
          }
        }

        // hook up the video segment stream to the first track with h264 data
        if (videoTrack && !pipeline.videoSegmentStream) {
          pipeline.coalesceStream.numberOfTracks++;
          pipeline.videoSegmentStream = new VideoSegmentStream(videoTrack);

          pipeline.videoSegmentStream.on('timelineStartInfo', function(timelineStartInfo) {
          // When video emits timelineStartInfo data after a flush, we forward that
          // info to the AudioSegmentStream, if it exists, because video timeline
          // data takes precedence.
            if (audioTrack) {
              audioTrack.timelineStartInfo = timelineStartInfo;
              // On the first segment we trim AAC frames that exist before the
              // very earliest DTS we have seen in video because Chrome will
              // interpret any video track with a baseMediaDecodeTime that is
              // non-zero as a gap.
              pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts);
            }
          });

          // Set up the final part of the video pipeline
          pipeline.h264Stream
            .pipe(pipeline.videoSegmentStream)
            .pipe(pipeline.coalesceStream);
        }

        if (audioTrack && !pipeline.audioSegmentStream) {
          // hook up the audio segment stream to the first track with aac data
          pipeline.coalesceStream.numberOfTracks++;
          pipeline.audioSegmentStream = new AudioSegmentStream(audioTrack);

          // Set up the final part of the audio pipeline
          pipeline.adtsStream
            .pipe(pipeline.audioSegmentStream)
            .pipe(pipeline.coalesceStream);
        }
      }
    });

    // Re-emit any data coming from the coalesce stream to the outside world
    pipeline.coalesceStream.on('data', this.trigger.bind(this, 'data'));
    // Let the consumer know we have finished flushing the entire pipeline
    pipeline.coalesceStream.on('done', this.trigger.bind(this, 'done'));
  };

  // hook up the segment streams once track metadata is delivered
  this.setBaseMediaDecodeTime = function(baseMediaDecodeTime) {
    var pipeline = this.transmuxPipeline_;

    this.baseMediaDecodeTime = baseMediaDecodeTime;
    if (audioTrack) {
      audioTrack.timelineStartInfo.dts = undefined;
      audioTrack.timelineStartInfo.pts = undefined;
      clearDtsInfo(audioTrack);
      audioTrack.timelineStartInfo.baseMediaDecodeTime = baseMediaDecodeTime;
    }
    if (videoTrack) {
      if (pipeline.videoSegmentStream) {
        pipeline.videoSegmentStream.gopCache_ = [];
      }
      videoTrack.timelineStartInfo.dts = undefined;
      videoTrack.timelineStartInfo.pts = undefined;
      clearDtsInfo(videoTrack);
      videoTrack.timelineStartInfo.baseMediaDecodeTime = baseMediaDecodeTime;
    }
  };

  // feed incoming data to the front of the parsing pipeline
  this.push = function(data) {
    if (hasFlushed) {
      var isAac = isLikelyAacData(data);

      if (isAac && this.transmuxPipeline_.type !== 'aac') {
        this.setupAacPipeline();
      } else if (!isAac && this.transmuxPipeline_.type !== 'ts') {
        this.setupTsPipeline();
      }
      hasFlushed = false;
    }
    this.transmuxPipeline_.headOfPipeline.push(data);
  };

  // flush any buffered data
  this.flush = function() {
      hasFlushed = true;
    // Start at the top of the pipeline and flush all pending work
    this.transmuxPipeline_.headOfPipeline.flush();
  };
};
Transmuxer.prototype = new Stream();

module.exports = {
  Transmuxer: Transmuxer,
  VideoSegmentStream: VideoSegmentStream,
  AudioSegmentStream: AudioSegmentStream,
  AUDIO_PROPERTIES: AUDIO_PROPERTIES,
  VIDEO_PROPERTIES: VIDEO_PROPERTIES
};

},{"../aac":64,"../codecs/adts.js":65,"../codecs/h264":66,"../m2ts/m2ts.js":71,"../utils/stream.js":80,"./mp4-generator.js":76}],79:[function(require,module,exports){
'use strict';

var ExpGolomb;

/**
 * Parser for exponential Golomb codes, a variable-bitwidth number encoding
 * scheme used by h264.
 */
ExpGolomb = function(workingData) {
  var
    // the number of bytes left to examine in workingData
    workingBytesAvailable = workingData.byteLength,

    // the current word being examined
    workingWord = 0, // :uint

    // the number of bits left to examine in the current word
    workingBitsAvailable = 0; // :uint;

  // ():uint
  this.length = function() {
    return (8 * workingBytesAvailable);
  };

  // ():uint
  this.bitsAvailable = function() {
    return (8 * workingBytesAvailable) + workingBitsAvailable;
  };

  // ():void
  this.loadWord = function() {
    var
      position = workingData.byteLength - workingBytesAvailable,
      workingBytes = new Uint8Array(4),
      availableBytes = Math.min(4, workingBytesAvailable);

    if (availableBytes === 0) {
      throw new Error('no bytes available');
    }

    workingBytes.set(workingData.subarray(position,
                                          position + availableBytes));
    workingWord = new DataView(workingBytes.buffer).getUint32(0);

    // track the amount of workingData that has been processed
    workingBitsAvailable = availableBytes * 8;
    workingBytesAvailable -= availableBytes;
  };

  // (count:int):void
  this.skipBits = function(count) {
    var skipBytes; // :int
    if (workingBitsAvailable > count) {
      workingWord          <<= count;
      workingBitsAvailable -= count;
    } else {
      count -= workingBitsAvailable;
      skipBytes = Math.floor(count / 8);

      count -= (skipBytes * 8);
      workingBytesAvailable -= skipBytes;

      this.loadWord();

      workingWord <<= count;
      workingBitsAvailable -= count;
    }
  };

  // (size:int):uint
  this.readBits = function(size) {
    var
      bits = Math.min(workingBitsAvailable, size), // :uint
      valu = workingWord >>> (32 - bits); // :uint
    // if size > 31, handle error
    workingBitsAvailable -= bits;
    if (workingBitsAvailable > 0) {
      workingWord <<= bits;
    } else if (workingBytesAvailable > 0) {
      this.loadWord();
    }

    bits = size - bits;
    if (bits > 0) {
      return valu << bits | this.readBits(bits);
    }
    return valu;
  };

  // ():uint
  this.skipLeadingZeros = function() {
    var leadingZeroCount; // :uint
    for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) {
      if ((workingWord & (0x80000000 >>> leadingZeroCount)) !== 0) {
        // the first bit of working word is 1
        workingWord <<= leadingZeroCount;
        workingBitsAvailable -= leadingZeroCount;
        return leadingZeroCount;
      }
    }

    // we exhausted workingWord and still have not found a 1
    this.loadWord();
    return leadingZeroCount + this.skipLeadingZeros();
  };

  // ():void
  this.skipUnsignedExpGolomb = function() {
    this.skipBits(1 + this.skipLeadingZeros());
  };

  // ():void
  this.skipExpGolomb = function() {
    this.skipBits(1 + this.skipLeadingZeros());
  };

  // ():uint
  this.readUnsignedExpGolomb = function() {
    var clz = this.skipLeadingZeros(); // :uint
    return this.readBits(clz + 1) - 1;
  };

  // ():int
  this.readExpGolomb = function() {
    var valu = this.readUnsignedExpGolomb(); // :int
    if (0x01 & valu) {
      // the number is odd if the low order bit is set
      return (1 + valu) >>> 1; // add 1 to make it even, and divide by 2
    }
    return -1 * (valu >>> 1); // divide by two then make it negative
  };

  // Some convenience functions
  // :Boolean
  this.readBoolean = function() {
    return this.readBits(1) === 1;
  };

  // ():int
  this.readUnsignedByte = function() {
    return this.readBits(8);
  };

  this.loadWord();
};

module.exports = ExpGolomb;

},{}],80:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2014 Brightcove
 * All rights reserved.
 *
 * A lightweight readable stream implemention that handles event dispatching.
 * Objects that inherit from streams should call init in their constructors.
 */
'use strict';

var Stream = function() {
  this.init = function() {
    var listeners = {};
    /**
     * Add a listener for a specified event type.
     * @param type {string} the event name
     * @param listener {function} the callback to be invoked when an event of
     * the specified type occurs
     */
    this.on = function(type, listener) {
      if (!listeners[type]) {
        listeners[type] = [];
      }
      listeners[type] = listeners[type].concat(listener);
    };
    /**
     * Remove a listener for a specified event type.
     * @param type {string} the event name
     * @param listener {function} a function previously registered for this
     * type of event through `on`
     */
    this.off = function(type, listener) {
      var index;
      if (!listeners[type]) {
        return false;
      }
      index = listeners[type].indexOf(listener);
      listeners[type] = listeners[type].slice();
      listeners[type].splice(index, 1);
      return index > -1;
    };
    /**
     * Trigger an event of the specified type on this stream. Any additional
     * arguments to this function are passed as parameters to event listeners.
     * @param type {string} the event name
     */
    this.trigger = function(type) {
      var callbacks, i, length, args;
      callbacks = listeners[type];
      if (!callbacks) {
        return;
      }
      // Slicing the arguments on every invocation of this method
      // can add a significant amount of overhead. Avoid the
      // intermediate object creation for the common case of a
      // single callback argument
      if (arguments.length === 2) {
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].call(this, arguments[1]);
        }
      } else {
        args = [];
        i = arguments.length;
        for (i = 1; i < arguments.length; ++i) {
          args.push(arguments[i]);
        }
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].apply(this, args);
        }
      }
    };
    /**
     * Destroys the stream and cleans up.
     */
    this.dispose = function() {
      listeners = {};
    };
  };
};

/**
 * Forwards all `data` events on this stream to the destination stream. The
 * destination stream should provide a method `push` to receive the data
 * events as they arrive.
 * @param destination {stream} the stream that will receive all `data` events
 * @param autoFlush {boolean} if false, we will not call `flush` on the destination
 *                            when the current stream emits a 'done' event
 * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
 */
Stream.prototype.pipe = function(destination) {
  this.on('data', function(data) {
    destination.push(data);
  });

  this.on('done', function(flushSource) {
    destination.flush(flushSource);
  });

  return destination;
};

// Default stream functions that are expected to be overridden to perform
// actual work. These are provided by the prototype as a sort of no-op
// implementation so that we don't have to check for their existence in the
// `pipe` function above.
Stream.prototype.push = function(data) {
  this.trigger('data', data);
};

Stream.prototype.flush = function(flushSource) {
  this.trigger('done', flushSource);
};

module.exports = Stream;

},{}],81:[function(require,module,exports){
/*
 * pkcs7.pad
 * https://github.com/brightcove/pkcs7
 *
 * Copyright (c) 2014 Brightcove
 * Licensed under the apache2 license.
 */

'use strict';

var PADDING;

/**
 * Returns a new Uint8Array that is padded with PKCS#7 padding.
 * @param plaintext {Uint8Array} the input bytes before encryption
 * @return {Uint8Array} the padded bytes
 * @see http://tools.ietf.org/html/rfc5652
 */
module.exports = function pad(plaintext) {
  var padding = PADDING[(plaintext.byteLength % 16) || 0],
      result = new Uint8Array(plaintext.byteLength + padding.length);
  result.set(plaintext);
  result.set(padding, plaintext.byteLength);
  return result;
};

// pre-define the padding values
PADDING = [
  [16, 16, 16, 16,
   16, 16, 16, 16,
   16, 16, 16, 16,
   16, 16, 16, 16],

  [15, 15, 15, 15,
   15, 15, 15, 15,
   15, 15, 15, 15,
   15, 15, 15],

  [14, 14, 14, 14,
   14, 14, 14, 14,
   14, 14, 14, 14,
   14, 14],

  [13, 13, 13, 13,
   13, 13, 13, 13,
   13, 13, 13, 13,
   13],

  [12, 12, 12, 12,
   12, 12, 12, 12,
   12, 12, 12, 12],

  [11, 11, 11, 11,
   11, 11, 11, 11,
   11, 11, 11],

  [10, 10, 10, 10,
   10, 10, 10, 10,
   10, 10],

  [9, 9, 9, 9,
   9, 9, 9, 9,
   9],

  [8, 8, 8, 8,
   8, 8, 8, 8],

  [7, 7, 7, 7,
   7, 7, 7],

  [6, 6, 6, 6,
   6, 6],

  [5, 5, 5, 5,
   5],

  [4, 4, 4, 4],

  [3, 3, 3],

  [2, 2],

  [1]
];

},{}],82:[function(require,module,exports){
/*
 * pkcs7
 * https://github.com/brightcove/pkcs7
 *
 * Copyright (c) 2014 Brightcove
 * Licensed under the apache2 license.
 */

'use strict';

exports.pad = require('./pad.js');
exports.unpad = require('./unpad.js');

},{"./pad.js":81,"./unpad.js":83}],83:[function(require,module,exports){
/*
 * pkcs7.unpad
 * https://github.com/brightcove/pkcs7
 *
 * Copyright (c) 2014 Brightcove
 * Licensed under the apache2 license.
 */

'use strict';

/**
 * Returns the subarray of a Uint8Array without PKCS#7 padding.
 * @param padded {Uint8Array} unencrypted bytes that have been padded
 * @return {Uint8Array} the unpadded bytes
 * @see http://tools.ietf.org/html/rfc5652
 */
module.exports = function unpad(padded) {
  return padded.subarray(0, padded.byteLength - padded[padded.byteLength - 1]);
};

},{}],84:[function(require,module,exports){
(function (global){
/**
 * @file add-text-track-data.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

/**
 * Define properties on a cue for backwards compatability,
 * but warn the user that the way that they are using it
 * is depricated and will be removed at a later date.
 *
 * @param {Cue} cue the cue to add the properties on
 * @private
 */
var deprecateOldCue = function deprecateOldCue(cue) {
  Object.defineProperties(cue.frame, {
    id: {
      get: function get() {
        _videoJs2['default'].log.warn('cue.frame.id is deprecated. Use cue.value.key instead.');
        return cue.value.key;
      }
    },
    value: {
      get: function get() {
        _videoJs2['default'].log.warn('cue.frame.value is deprecated. Use cue.value.data instead.');
        return cue.value.data;
      }
    },
    privateData: {
      get: function get() {
        _videoJs2['default'].log.warn('cue.frame.privateData is deprecated. Use cue.value.data instead.');
        return cue.value.data;
      }
    }
  });
};

var durationOfVideo = function durationOfVideo(duration) {
  var dur = undefined;

  if (isNaN(duration) || Math.abs(duration) === Infinity) {
    dur = Number.MAX_VALUE;
  } else {
    dur = duration;
  }
  return dur;
};
/**
 * Add text track data to a source handler given the captions and
 * metadata from the buffer.
 *
 * @param {Object} sourceHandler the flash or virtual source buffer
 * @param {Array} captionArray an array of caption data
 * @param {Array} cue an array of meta data
 * @private
 */
var addTextTrackData = function addTextTrackData(sourceHandler, captionArray, metadataArray) {
  var Cue = _globalWindow2['default'].WebKitDataCue || _globalWindow2['default'].VTTCue;

  if (captionArray) {
    captionArray.forEach(function (caption) {
      this.inbandTextTrack_.addCue(new Cue(caption.startTime + this.timestampOffset, caption.endTime + this.timestampOffset, caption.text));
    }, sourceHandler);
  }

  if (metadataArray) {
    var videoDuration = durationOfVideo(sourceHandler.mediaSource_.duration);

    metadataArray.forEach(function (metadata) {
      var time = metadata.cueTime + this.timestampOffset;

      metadata.frames.forEach(function (frame) {
        var cue = new Cue(time, time, frame.value || frame.url || frame.data || '');

        cue.frame = frame;
        cue.value = frame;
        deprecateOldCue(cue);

        this.metadataTrack_.addCue(cue);
      }, this);
    }, sourceHandler);

    // Updating the metadeta cues so that
    // the endTime of each cue is the startTime of the next cue
    // the endTime of last cue is the duration of the video
    if (sourceHandler.metadataTrack_ && sourceHandler.metadataTrack_.cues && sourceHandler.metadataTrack_.cues.length) {
      var cues = sourceHandler.metadataTrack_.cues;
      var cuesArray = [];

      for (var j = 0; j < cues.length; j++) {
        cuesArray.push(cues[j]);
      }
      cuesArray.sort(function (first, second) {
        return first.startTime - second.startTime;
      });

      for (var i = 0; i < cuesArray.length - 1; i++) {
        if (cuesArray[i].endTime !== cuesArray[i + 1].startTime) {
          cuesArray[i].endTime = cuesArray[i + 1].startTime;
        }
      }
      cuesArray[cuesArray.length - 1].endTime = videoDuration;
    }
  }
};

exports['default'] = {
  addTextTrackData: addTextTrackData,
  durationOfVideo: durationOfVideo
};
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":22}],85:[function(require,module,exports){
/**
 * @file codec-utils.js
 */

/**
 * Check if a codec string refers to an audio codec.
 *
 * @param {String} codec codec string to check
 * @return {Boolean} if this is an audio codec
 * @private
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isAudioCodec = function isAudioCodec(codec) {
  return (/mp4a\.\d+.\d+/i.test(codec)
  );
};

/**
 * Check if a codec string refers to a video codec.
 *
 * @param {String} codec codec string to check
 * @return {Boolean} if this is a video codec
 * @private
 */
var isVideoCodec = function isVideoCodec(codec) {
  return (/avc1\.[\da-f]+/i.test(codec)
  );
};

/**
 * Parse a content type header into a type and parameters
 * object
 *
 * @param {String} type the content type header
 * @return {Object} the parsed content-type
 * @private
 */
var parseContentType = function parseContentType(type) {
  var object = { type: '', parameters: {} };
  var parameters = type.trim().split(';');

  // first parameter should always be content-type
  object.type = parameters.shift().trim();
  parameters.forEach(function (parameter) {
    var pair = parameter.trim().split('=');

    if (pair.length > 1) {
      var _name = pair[0].replace(/"/g, '').trim();
      var value = pair[1].replace(/"/g, '').trim();

      object.parameters[_name] = value;
    }
  });

  return object;
};

exports['default'] = {
  isAudioCodec: isAudioCodec,
  parseContentType: parseContentType,
  isVideoCodec: isVideoCodec
};
module.exports = exports['default'];
},{}],86:[function(require,module,exports){
/**
 * @file create-text-tracks-if-necessary.js
 */

/**
 * Create text tracks on video.js if they exist on a segment.
 *
 * @param {Object} sourceBuffer the VSB or FSB
 * @param {Object} mediaSource the HTML or Flash media source
 * @param {Object} segment the segment that may contain the text track
 * @private
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var createTextTracksIfNecessary = function createTextTracksIfNecessary(sourceBuffer, mediaSource, segment) {
  // create an in-band caption track if one is present in the segment
  if (segment.captions && segment.captions.length && !sourceBuffer.inbandTextTrack_) {
    sourceBuffer.inbandTextTrack_ = mediaSource.player_.addTextTrack('captions', 'cc1');
  }

  if (segment.metadata && segment.metadata.length && !sourceBuffer.metadataTrack_) {
    sourceBuffer.metadataTrack_ = mediaSource.player_.addTextTrack('metadata', 'Timed Metadata');
    sourceBuffer.metadataTrack_.inBandMetadataTrackDispatchType = segment.metadata.dispatchType;
  }
};

exports['default'] = createTextTracksIfNecessary;
module.exports = exports['default'];
},{}],87:[function(require,module,exports){
/**
 * @file flash-constants.js
 */
/**
 * The maximum size in bytes for append operations to the video.js
 * SWF. Calling through to Flash blocks and can be expensive so
 * tuning this parameter may improve playback on slower
 * systems. There are two factors to consider:
 * - Each interaction with the SWF must be quick or you risk dropping
 * video frames. To maintain 60fps for the rest of the page, each append
 * must not  take longer than 16ms. Given the likelihood that the page
 * will be executing more javascript than just playback, you probably
 * want to aim for less than 8ms. We aim for just 4ms.
 * - Bigger appends significantly increase throughput. The total number of
 * bytes over time delivered to the SWF must exceed the video bitrate or
 * playback will stall.
 *
 * We adaptively tune the size of appends to give the best throughput
 * possible given the performance of the system. To do that we try to append
 * as much as possible in TIME_PER_TICK and while tuning the size of appends
 * dynamically so that we only append about 4-times in that 4ms span.
 *
 * The reason we try to keep the number of appends around four is due to
 * externalities such as Flash load and garbage collection that are highly
 * variable and having 4 iterations allows us to exit the loop early if
 * an iteration takes longer than expected.
 *
 * @private
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var flashConstants = {
  TIME_BETWEEN_TICKS: Math.floor(1000 / 500),
  TIME_PER_TICK: Math.floor(1000 / 100),
  // 1kb
  BYTES_PER_CHUNK: 4 * 1024,
  MIN_CHUNK: 4096,
  MAX_CHUNK: 4 * 1024 * 1024
};

exports["default"] = flashConstants;
module.exports = exports["default"];
},{}],88:[function(require,module,exports){
(function (global){
/**
 * @file flash-media-source.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _flashSourceBuffer = require('./flash-source-buffer');

var _flashSourceBuffer2 = _interopRequireDefault(_flashSourceBuffer);

var _flashConstants = require('./flash-constants');

var _flashConstants2 = _interopRequireDefault(_flashConstants);

var _codecUtils = require('./codec-utils');

/**
 * A flash implmentation of HTML MediaSources and a polyfill
 * for browsers that don't support native or HTML MediaSources..
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
 * @class FlashMediaSource
 * @extends videojs.EventTarget
 */

var FlashMediaSource = (function (_videojs$EventTarget) {
  _inherits(FlashMediaSource, _videojs$EventTarget);

  function FlashMediaSource() {
    var _this = this;

    _classCallCheck(this, FlashMediaSource);

    _get(Object.getPrototypeOf(FlashMediaSource.prototype), 'constructor', this).call(this);
    this.sourceBuffers = [];
    this.readyState = 'closed';

    this.on(['sourceopen', 'webkitsourceopen'], function (event) {
      // find the swf where we will push media data
      _this.swfObj = _globalDocument2['default'].getElementById(event.swfId);
      _this.player_ = (0, _videoJs2['default'])(_this.swfObj.parentNode);
      _this.tech_ = _this.swfObj.tech;
      _this.readyState = 'open';

      _this.tech_.on('seeking', function () {
        var i = _this.sourceBuffers.length;

        while (i--) {
          _this.sourceBuffers[i].abort();
        }
      });

      // trigger load events
      if (_this.swfObj) {
        _this.swfObj.vjs_load();
      }
    });
  }

  /**
    * Set or return the presentation duration.
    *
    * @param {Double} value the duration of the media in seconds
    * @param {Double} the current presentation duration
    * @link http://www.w3.org/TR/media-source/#widl-MediaSource-duration
    */

  /**
   * We have this function so that the html and flash interfaces
   * are the same.
   *
   * @private
   */

  _createClass(FlashMediaSource, [{
    key: 'addSeekableRange_',
    value: function addSeekableRange_() {}
    // intentional no-op

    /**
     * Create a new flash source buffer and add it to our flash media source.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/addSourceBuffer
     * @param {String} type the content-type of the source
     * @return {Object} the flash source buffer
     */

  }, {
    key: 'addSourceBuffer',
    value: function addSourceBuffer(type) {
      var parsedType = (0, _codecUtils.parseContentType)(type);
      var sourceBuffer = undefined;

      // if this is an FLV type, we'll push data to flash
      if (parsedType.type === 'video/mp2t') {
        // Flash source buffers
        sourceBuffer = new _flashSourceBuffer2['default'](this);
      } else {
        throw new Error('NotSupportedError (Video.js)');
      }

      this.sourceBuffers.push(sourceBuffer);
      return sourceBuffer;
    }

    /**
     * Signals the end of the stream.
     *
     * @link https://w3c.github.io/media-source/#widl-MediaSource-endOfStream-void-EndOfStreamError-error
     * @param {String=} error Signals that a playback error
     * has occurred. If specified, it must be either "network" or
     * "decode".
     */
  }, {
    key: 'endOfStream',
    value: function endOfStream(error) {
      if (error === 'network') {
        // MEDIA_ERR_NETWORK
        this.tech_.error(2);
      } else if (error === 'decode') {
        // MEDIA_ERR_DECODE
        this.tech_.error(3);
      }
      if (this.readyState !== 'ended') {
        this.readyState = 'ended';
        this.swfObj.vjs_endOfStream();
      }
    }
  }]);

  return FlashMediaSource;
})(_videoJs2['default'].EventTarget);

exports['default'] = FlashMediaSource;
try {
  Object.defineProperty(FlashMediaSource.prototype, 'duration', {
    /**
     * Return the presentation duration.
     *
     * @return {Double} the duration of the media in seconds
     * @link http://www.w3.org/TR/media-source/#widl-MediaSource-duration
     */
    get: function get() {
      if (!this.swfObj) {
        return NaN;
      }
      // get the current duration from the SWF
      return this.swfObj.vjs_getProperty('duration');
    },
    /**
     * Set the presentation duration.
     *
     * @param {Double} value the duration of the media in seconds
     * @return {Double} the duration of the media in seconds
     * @link http://www.w3.org/TR/media-source/#widl-MediaSource-duration
     */
    set: function set(value) {
      var i = undefined;
      var oldDuration = this.swfObj.vjs_getProperty('duration');

      this.swfObj.vjs_setProperty('duration', value);

      if (value < oldDuration) {
        // In MSE, this triggers the range removal algorithm which causes
        // an update to occur
        for (i = 0; i < this.sourceBuffers.length; i++) {
          this.sourceBuffers[i].remove(value, oldDuration);
        }
      }

      return value;
    }
  });
} catch (e) {
  // IE8 throws if defineProperty is called on a non-DOM node. We
  // don't support IE8 but we shouldn't throw an error if loaded
  // there.
  FlashMediaSource.prototype.duration = NaN;
}

for (var property in _flashConstants2['default']) {
  FlashMediaSource[property] = _flashConstants2['default'][property];
}
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./codec-utils":85,"./flash-constants":87,"./flash-source-buffer":89,"global/document":21}],89:[function(require,module,exports){
(function (global){
/**
 * @file flash-source-buffer.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _muxJsLibFlv = require('mux.js/lib/flv');

var _muxJsLibFlv2 = _interopRequireDefault(_muxJsLibFlv);

var _removeCuesFromTrack = require('./remove-cues-from-track');

var _removeCuesFromTrack2 = _interopRequireDefault(_removeCuesFromTrack);

var _createTextTracksIfNecessary = require('./create-text-tracks-if-necessary');

var _createTextTracksIfNecessary2 = _interopRequireDefault(_createTextTracksIfNecessary);

var _addTextTrackData = require('./add-text-track-data');

var _flashConstants = require('./flash-constants');

var _flashConstants2 = _interopRequireDefault(_flashConstants);

/**
 * A wrapper around the setTimeout function that uses
 * the flash constant time between ticks value.
 *
 * @param {Function} func the function callback to run
 * @private
 */
var scheduleTick = function scheduleTick(func) {
  // Chrome doesn't invoke requestAnimationFrame callbacks
  // in background tabs, so use setTimeout.
  _globalWindow2['default'].setTimeout(func, _flashConstants2['default'].TIME_BETWEEN_TICKS);
};

/**
 * Round a number to a specified number of places much like
 * toFixed but return a number instead of a string representation.
 *
 * @param {Number} num A number
 * @param {Number} places The number of decimal places which to
 * round
 * @private
 */
var toDecimalPlaces = function toDecimalPlaces(num, places) {
  if (typeof places !== 'number' || places < 0) {
    places = 0;
  }

  var scale = Math.pow(10, places);

  return Math.round(num * scale) / scale;
};

/**
 * A SourceBuffer implementation for Flash rather than HTML.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
 * @param {Object} mediaSource the flash media source
 * @class FlashSourceBuffer
 * @extends videojs.EventTarget
 */

var FlashSourceBuffer = (function (_videojs$EventTarget) {
  _inherits(FlashSourceBuffer, _videojs$EventTarget);

  function FlashSourceBuffer(mediaSource) {
    var _this = this;

    _classCallCheck(this, FlashSourceBuffer);

    _get(Object.getPrototypeOf(FlashSourceBuffer.prototype), 'constructor', this).call(this);
    var encodedHeader = undefined;

    // Start off using the globally defined value but refine
    // as we append data into flash
    this.chunkSize_ = _flashConstants2['default'].BYTES_PER_CHUNK;

    // byte arrays queued to be appended
    this.buffer_ = [];

    // the total number of queued bytes
    this.bufferSize_ = 0;

    // to be able to determine the correct position to seek to, we
    // need to retain information about the mapping between the
    // media timeline and PTS values
    this.basePtsOffset_ = NaN;

    this.mediaSource_ = mediaSource;

    // indicates whether the asynchronous continuation of an operation
    // is still being processed
    // see https://w3c.github.io/media-source/#widl-SourceBuffer-updating
    this.updating = false;
    this.timestampOffset_ = 0;

    // TS to FLV transmuxer
    this.segmentParser_ = new _muxJsLibFlv2['default'].Transmuxer();
    this.segmentParser_.on('data', this.receiveBuffer_.bind(this));
    encodedHeader = _globalWindow2['default'].btoa(String.fromCharCode.apply(null, Array.prototype.slice.call(this.segmentParser_.getFlvHeader())));
    this.mediaSource_.swfObj.vjs_appendBuffer(encodedHeader);

    this.one('updateend', function () {
      _this.mediaSource_.tech_.trigger('loadedmetadata');
    });

    Object.defineProperty(this, 'timestampOffset', {
      get: function get() {
        return this.timestampOffset_;
      },
      set: function set(val) {
        if (typeof val === 'number' && val >= 0) {
          this.timestampOffset_ = val;
          this.segmentParser_ = new _muxJsLibFlv2['default'].Transmuxer();
          this.segmentParser_.on('data', this.receiveBuffer_.bind(this));
          // We have to tell flash to expect a discontinuity
          this.mediaSource_.swfObj.vjs_discontinuity();
          // the media <-> PTS mapping must be re-established after
          // the discontinuity
          this.basePtsOffset_ = NaN;
        }
      }
    });

    Object.defineProperty(this, 'buffered', {
      get: function get() {
        if (!this.mediaSource_ || !this.mediaSource_.swfObj || !('vjs_getProperty' in this.mediaSource_.swfObj)) {
          return _videoJs2['default'].createTimeRange();
        }

        var buffered = this.mediaSource_.swfObj.vjs_getProperty('buffered');

        if (buffered && buffered.length) {
          buffered[0][0] = toDecimalPlaces(buffered[0][0], 3);
          buffered[0][1] = toDecimalPlaces(buffered[0][1], 3);
        }
        return _videoJs2['default'].createTimeRanges(buffered);
      }
    });

    // On a seek we remove all text track data since flash has no concept
    // of a buffered-range and everything else is reset on seek
    this.mediaSource_.player_.on('seeked', function () {
      (0, _removeCuesFromTrack2['default'])(0, Infinity, _this.metadataTrack_);
      (0, _removeCuesFromTrack2['default'])(0, Infinity, _this.inbandTextTrack_);
    });
  }

  /**
   * Append bytes to the sourcebuffers buffer, in this case we
   * have to append it to swf object.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/appendBuffer
   * @param {Array} bytes
   */

  _createClass(FlashSourceBuffer, [{
    key: 'appendBuffer',
    value: function appendBuffer(bytes) {
      var _this2 = this;

      var error = undefined;
      var chunk = 512 * 1024;
      var i = 0;

      if (this.updating) {
        error = new Error('SourceBuffer.append() cannot be called ' + 'while an update is in progress');
        error.name = 'InvalidStateError';
        error.code = 11;
        throw error;
      }

      this.updating = true;
      this.mediaSource_.readyState = 'open';
      this.trigger({ type: 'update' });

      // this is here to use recursion
      var chunkInData = function chunkInData() {
        _this2.segmentParser_.push(bytes.subarray(i, i + chunk));
        i += chunk;
        if (i < bytes.byteLength) {
          scheduleTick(chunkInData);
        } else {
          scheduleTick(_this2.segmentParser_.flush.bind(_this2.segmentParser_));
        }
      };

      chunkInData();
    }

    /**
     * Reset the parser and remove any data queued to be sent to the SWF.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/abort
     */
  }, {
    key: 'abort',
    value: function abort() {
      this.buffer_ = [];
      this.bufferSize_ = 0;
      this.mediaSource_.swfObj.vjs_abort();

      // report any outstanding updates have ended
      if (this.updating) {
        this.updating = false;
        this.trigger({ type: 'updateend' });
      }
    }

    /**
     * Flash cannot remove ranges already buffered in the NetStream
     * but seeking clears the buffer entirely. For most purposes,
     * having this operation act as a no-op is acceptable.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/remove
     * @param {Double} start start of the section to remove
     * @param {Double} end end of the section to remove
     */
  }, {
    key: 'remove',
    value: function remove(start, end) {
      (0, _removeCuesFromTrack2['default'])(start, end, this.metadataTrack_);
      (0, _removeCuesFromTrack2['default'])(start, end, this.inbandTextTrack_);
      this.trigger({ type: 'update' });
      this.trigger({ type: 'updateend' });
    }

    /**
     * Receive a buffer from the flv.
     *
     * @param {Object} segment
     * @private
     */
  }, {
    key: 'receiveBuffer_',
    value: function receiveBuffer_(segment) {
      var _this3 = this;

      // create an in-band caption track if one is present in the segment
      (0, _createTextTracksIfNecessary2['default'])(this, this.mediaSource_, segment);
      (0, _addTextTrackData.addTextTrackData)(this, segment.captions, segment.metadata);

      // Do this asynchronously since convertTagsToData_ can be time consuming
      scheduleTick(function () {
        var flvBytes = _this3.convertTagsToData_(segment);

        if (_this3.buffer_.length === 0) {
          scheduleTick(_this3.processBuffer_.bind(_this3));
        }

        if (flvBytes) {
          _this3.buffer_.push(flvBytes);
          _this3.bufferSize_ += flvBytes.byteLength;
        }
      });
    }

    /**
     * Append a portion of the current buffer to the SWF.
     *
     * @private
     */
  }, {
    key: 'processBuffer_',
    value: function processBuffer_() {
      var chunk = undefined;
      var i = undefined;
      var length = undefined;
      var binary = undefined;
      var b64str = undefined;
      var startByte = 0;
      var appendIterations = 0;
      var startTime = +new Date();
      var appendTime = undefined;

      if (!this.buffer_.length) {
        if (this.updating !== false) {
          this.updating = false;
          this.trigger({ type: 'updateend' });
        }
        // do nothing if the buffer is empty
        return;
      }

      do {
        appendIterations++;
        // concatenate appends up to the max append size
        chunk = this.buffer_[0].subarray(startByte, startByte + this.chunkSize_);

        // requeue any bytes that won't make it this round
        if (chunk.byteLength < this.chunkSize_ || this.buffer_[0].byteLength === startByte + this.chunkSize_) {
          startByte = 0;
          this.buffer_.shift();
        } else {
          startByte += this.chunkSize_;
        }

        this.bufferSize_ -= chunk.byteLength;

        // base64 encode the bytes
        binary = '';
        length = chunk.byteLength;
        for (i = 0; i < length; i++) {
          binary += String.fromCharCode(chunk[i]);
        }
        b64str = _globalWindow2['default'].btoa(binary);

        // bypass normal ExternalInterface calls and pass xml directly
        // IE can be slow by default
        this.mediaSource_.swfObj.CallFunction('<invoke name="vjs_appendBuffer"' + 'returntype="javascript"><arguments><string>' + b64str + '</string></arguments></invoke>');
        appendTime = new Date() - startTime;
      } while (this.buffer_.length && appendTime < _flashConstants2['default'].TIME_PER_TICK);

      if (this.buffer_.length && startByte) {
        this.buffer_[0] = this.buffer_[0].subarray(startByte);
      }

      if (appendTime >= _flashConstants2['default'].TIME_PER_TICK) {
        // We want to target 4 iterations per time-slot so that gives us
        // room to adjust to changes in Flash load and other externalities
        // such as garbage collection while still maximizing throughput
        this.chunkSize_ = Math.floor(this.chunkSize_ * (appendIterations / 4));
      }

      // We also make sure that the chunk-size doesn't drop below 1KB or
      // go above 1MB as a sanity check
      this.chunkSize_ = Math.max(_flashConstants2['default'].MIN_CHUNK, Math.min(this.chunkSize_, _flashConstants2['default'].MAX_CHUNK));

      // schedule another append if necessary
      if (this.bufferSize_ !== 0) {
        scheduleTick(this.processBuffer_.bind(this));
      } else {
        this.updating = false;
        this.trigger({ type: 'updateend' });
      }
    }

    /**
     * Turns an array of flv tags into a Uint8Array representing the
     * flv data. Also removes any tags that are before the current
     * time so that playback begins at or slightly after the right
     * place on a seek
     *
     * @private
     * @param {Object} segmentData object of segment data
     */
  }, {
    key: 'convertTagsToData_',
    value: function convertTagsToData_(segmentData) {
      var segmentByteLength = 0;
      var tech = this.mediaSource_.tech_;
      var targetPts = 0;
      var i = undefined;
      var j = undefined;
      var segment = undefined;
      var filteredTags = [];
      var tags = this.getOrderedTags_(segmentData);

      // Establish the media timeline to PTS translation if we don't
      // have one already
      if (isNaN(this.basePtsOffset_) && tags.length) {
        this.basePtsOffset_ = tags[0].pts;
      }

      // Trim to currentTime if it's ahead of buffered or buffered doesn't exist
      if (tech.seeking()) {
        targetPts = Math.max(targetPts, tech.currentTime() - this.timestampOffset);
      }

      // PTS values are represented in milliseconds
      targetPts *= 1e3;
      targetPts += this.basePtsOffset_;

      // skip tags with a presentation time less than the seek target
      for (i = 0; i < tags.length; i++) {
        if (tags[i].pts >= targetPts) {
          filteredTags.push(tags[i]);
        }
      }

      if (filteredTags.length === 0) {
        return;
      }

      // concatenate the bytes into a single segment
      for (i = 0; i < filteredTags.length; i++) {
        segmentByteLength += filteredTags[i].bytes.byteLength;
      }
      segment = new Uint8Array(segmentByteLength);
      for (i = 0, j = 0; i < filteredTags.length; i++) {
        segment.set(filteredTags[i].bytes, j);
        j += filteredTags[i].bytes.byteLength;
      }

      return segment;
    }

    /**
     * Assemble the FLV tags in decoder order.
     *
     * @private
     * @param {Object} segmentData object of segment data
     */
  }, {
    key: 'getOrderedTags_',
    value: function getOrderedTags_(segmentData) {
      var videoTags = segmentData.tags.videoTags;
      var audioTags = segmentData.tags.audioTags;
      var tag = undefined;
      var tags = [];

      while (videoTags.length || audioTags.length) {
        if (!videoTags.length) {
          // only audio tags remain
          tag = audioTags.shift();
        } else if (!audioTags.length) {
          // only video tags remain
          tag = videoTags.shift();
        } else if (audioTags[0].dts < videoTags[0].dts) {
          // audio should be decoded next
          tag = audioTags.shift();
        } else {
          // video should be decoded next
          tag = videoTags.shift();
        }

        tags.push(tag.finalize());
      }

      return tags;
    }
  }]);

  return FlashSourceBuffer;
})(_videoJs2['default'].EventTarget);

exports['default'] = FlashSourceBuffer;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./add-text-track-data":84,"./create-text-tracks-if-necessary":86,"./flash-constants":87,"./remove-cues-from-track":91,"global/window":22,"mux.js/lib/flv":68}],90:[function(require,module,exports){
(function (global){
/**
 * @file html-media-source.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _virtualSourceBuffer = require('./virtual-source-buffer');

var _virtualSourceBuffer2 = _interopRequireDefault(_virtualSourceBuffer);

var _addTextTrackData = require('./add-text-track-data');

var _codecUtils = require('./codec-utils');

/**
 * Replace the old apple-style `avc1.<dd>.<dd>` codec string with the standard
 * `avc1.<hhhhhh>`
 *
 * @param {Array} codecs an array of codec strings to fix
 * @return {Array} the translated codec array
 * @private
 */
var translateLegacyCodecs = function translateLegacyCodecs(codecs) {
  return codecs.map(function (codec) {
    return codec.replace(/avc1\.(\d+)\.(\d+)/i, function (orig, profile, avcLevel) {
      var profileHex = ('00' + Number(profile).toString(16)).slice(-2);
      var avcLevelHex = ('00' + Number(avcLevel).toString(16)).slice(-2);

      return 'avc1.' + profileHex + '00' + avcLevelHex;
    });
  });
};

/**
 * Our MediaSource implementation in HTML, mimics native
 * MediaSource where/if possible.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource
 * @class HtmlMediaSource
 * @extends videojs.EventTarget
 */

var HtmlMediaSource = (function (_videojs$EventTarget) {
  _inherits(HtmlMediaSource, _videojs$EventTarget);

  function HtmlMediaSource() {
    var _this = this;

    _classCallCheck(this, HtmlMediaSource);

    _get(Object.getPrototypeOf(HtmlMediaSource.prototype), 'constructor', this).call(this);
    var property = undefined;

    this.nativeMediaSource_ = new _globalWindow2['default'].MediaSource();
    // delegate to the native MediaSource's methods by default
    for (property in this.nativeMediaSource_) {
      if (!(property in HtmlMediaSource.prototype) && typeof this.nativeMediaSource_[property] === 'function') {
        this[property] = this.nativeMediaSource_[property].bind(this.nativeMediaSource_);
      }
    }

    // emulate `duration` and `seekable` until seeking can be
    // handled uniformly for live streams
    // see https://github.com/w3c/media-source/issues/5
    this.duration_ = NaN;
    Object.defineProperty(this, 'duration', {
      get: function get() {
        if (this.duration_ === Infinity) {
          return this.duration_;
        }
        return this.nativeMediaSource_.duration;
      },
      set: function set(duration) {
        this.duration_ = duration;
        if (duration !== Infinity) {
          this.nativeMediaSource_.duration = duration;
          return;
        }
      }
    });
    Object.defineProperty(this, 'seekable', {
      get: function get() {
        if (this.duration_ === Infinity) {
          return _videoJs2['default'].createTimeRanges([[0, this.nativeMediaSource_.duration]]);
        }
        return this.nativeMediaSource_.seekable;
      }
    });

    Object.defineProperty(this, 'readyState', {
      get: function get() {
        return this.nativeMediaSource_.readyState;
      }
    });

    Object.defineProperty(this, 'activeSourceBuffers', {
      get: function get() {
        return this.activeSourceBuffers_;
      }
    });

    // the list of virtual and native SourceBuffers created by this
    // MediaSource
    this.sourceBuffers = [];

    this.activeSourceBuffers_ = [];

    /**
     * update the list of active source buffers based upon various
     * imformation from HLS and video.js
     *
     * @private
     */
    this.updateActiveSourceBuffers_ = function () {
      // Retain the reference but empty the array
      _this.activeSourceBuffers_.length = 0;

      // By default, the audio in the combined virtual source buffer is enabled
      // and the audio-only source buffer (if it exists) is disabled.
      var combined = false;
      var audioOnly = true;

      // TODO: maybe we can store the sourcebuffers on the track objects?
      // safari may do something like this
      for (var i = 0; i < _this.player_.audioTracks().length; i++) {
        var track = _this.player_.audioTracks()[i];

        if (track.enabled && track.kind !== 'main') {
          // The enabled track is an alternate audio track so disable the audio in
          // the combined source buffer and enable the audio-only source buffer.
          combined = true;
          audioOnly = false;
          break;
        }
      }

      // Since we currently support a max of two source buffers, add all of the source
      // buffers (in order).
      _this.sourceBuffers.forEach(function (sourceBuffer) {
        /* eslinst-disable */
        // TODO once codecs are required, we can switch to using the codecs to determine
        //      what stream is the video stream, rather than relying on videoTracks
        /* eslinst-enable */

        sourceBuffer.appendAudioInitSegment_ = true;

        if (sourceBuffer.videoCodec_ && sourceBuffer.audioCodec_) {
          // combined
          sourceBuffer.audioDisabled_ = combined;
        } else if (sourceBuffer.videoCodec_ && !sourceBuffer.audioCodec_) {
          // If the "combined" source buffer is video only, then we do not want
          // disable the audio-only source buffer (this is mostly for demuxed
          // audio and video hls)
          sourceBuffer.audioDisabled_ = true;
          audioOnly = false;
        } else if (!sourceBuffer.videoCodec_ && sourceBuffer.audioCodec_) {
          // audio only
          sourceBuffer.audioDisabled_ = audioOnly;
          if (audioOnly) {
            return;
          }
        }

        _this.activeSourceBuffers_.push(sourceBuffer);
      });
    };

    this.onPlayerMediachange_ = function () {
      _this.sourceBuffers.forEach(function (sourceBuffer) {
        sourceBuffer.appendAudioInitSegment_ = true;
      });
    };

    // Re-emit MediaSource events on the polyfill
    ['sourceopen', 'sourceclose', 'sourceended'].forEach(function (eventName) {
      this.nativeMediaSource_.addEventListener(eventName, this.trigger.bind(this));
    }, this);

    // capture the associated player when the MediaSource is
    // successfully attached
    this.on('sourceopen', function (event) {
      // Get the player this MediaSource is attached to
      var video = _globalDocument2['default'].querySelector('[src="' + _this.url_ + '"]');

      if (!video) {
        return;
      }

      _this.player_ = (0, _videoJs2['default'])(video.parentNode);

      if (_this.player_.audioTracks && _this.player_.audioTracks()) {
        _this.player_.audioTracks().on('change', _this.updateActiveSourceBuffers_);
        _this.player_.audioTracks().on('addtrack', _this.updateActiveSourceBuffers_);
        _this.player_.audioTracks().on('removetrack', _this.updateActiveSourceBuffers_);
      }

      _this.player_.on('mediachange', _this.onPlayerMediachange_);
    });

    this.on('sourceended', function (event) {
      var duration = (0, _addTextTrackData.durationOfVideo)(_this.duration);

      for (var i = 0; i < _this.sourceBuffers.length; i++) {
        var sourcebuffer = _this.sourceBuffers[i];
        var cues = sourcebuffer.metadataTrack_ && sourcebuffer.metadataTrack_.cues;

        if (cues && cues.length) {
          cues[cues.length - 1].endTime = duration;
        }
      }
    });

    // explicitly terminate any WebWorkers that were created
    // by SourceHandlers
    this.on('sourceclose', function (event) {
      this.sourceBuffers.forEach(function (sourceBuffer) {
        if (sourceBuffer.transmuxer_) {
          sourceBuffer.transmuxer_.terminate();
        }
      });
      this.sourceBuffers.length = 0;
      if (!this.player_) {
        return;
      }

      if (this.player_.audioTracks && this.player_.audioTracks()) {
        this.player_.audioTracks().off('change', this.updateActiveSourceBuffers_);
        this.player_.audioTracks().off('addtrack', this.updateActiveSourceBuffers_);
        this.player_.audioTracks().off('removetrack', this.updateActiveSourceBuffers_);
      }

      this.player_.off('mediachange', this.onPlayerMediachange_);
    });
  }

  /**
   * Add a range that that can now be seeked to.
   *
   * @param {Double} start where to start the addition
   * @param {Double} end where to end the addition
   * @private
   */

  _createClass(HtmlMediaSource, [{
    key: 'addSeekableRange_',
    value: function addSeekableRange_(start, end) {
      var error = undefined;

      if (this.duration !== Infinity) {
        error = new Error('MediaSource.addSeekableRange() can only be invoked ' + 'when the duration is Infinity');
        error.name = 'InvalidStateError';
        error.code = 11;
        throw error;
      }

      if (end > this.nativeMediaSource_.duration || isNaN(this.nativeMediaSource_.duration)) {
        this.nativeMediaSource_.duration = end;
      }
    }

    /**
     * Add a source buffer to the media source.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/addSourceBuffer
     * @param {String} type the content-type of the content
     * @return {Object} the created source buffer
     */
  }, {
    key: 'addSourceBuffer',
    value: function addSourceBuffer(type) {
      var buffer = undefined;
      var parsedType = (0, _codecUtils.parseContentType)(type);

      // Create a VirtualSourceBuffer to transmux MPEG-2 transport
      // stream segments into fragmented MP4s
      if (/^(video|audio)\/mp2t$/i.test(parsedType.type)) {
        var codecs = [];

        if (parsedType.parameters && parsedType.parameters.codecs) {
          codecs = parsedType.parameters.codecs.split(',');
          codecs = translateLegacyCodecs(codecs);
          codecs = codecs.filter(function (codec) {
            return (0, _codecUtils.isAudioCodec)(codec) || (0, _codecUtils.isVideoCodec)(codec);
          });
        }

        if (codecs.length === 0) {
          codecs = ['avc1.4d400d', 'mp4a.40.2'];
        }

        buffer = new _virtualSourceBuffer2['default'](this, codecs);

        if (this.sourceBuffers.length !== 0) {
          // If another VirtualSourceBuffer already exists, then we are creating a
          // SourceBuffer for an alternate audio track and therefore we know that
          // the source has both an audio and video track.
          // That means we should trigger the manual creation of the real
          // SourceBuffers instead of waiting for the transmuxer to return data
          this.sourceBuffers[0].createRealSourceBuffers_();
          buffer.createRealSourceBuffers_();

          // Automatically disable the audio on the first source buffer if
          // a second source buffer is ever created
          this.sourceBuffers[0].audioDisabled_ = true;
        }
      } else {
        // delegate to the native implementation
        buffer = this.nativeMediaSource_.addSourceBuffer(type);
      }

      this.sourceBuffers.push(buffer);
      return buffer;
    }
  }]);

  return HtmlMediaSource;
})(_videoJs2['default'].EventTarget);

exports['default'] = HtmlMediaSource;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./add-text-track-data":84,"./codec-utils":85,"./virtual-source-buffer":94,"global/document":21,"global/window":22}],91:[function(require,module,exports){
/**
 * @file remove-cues-from-track.js
 */

/**
 * Remove cues from a track on video.js.
 *
 * @param {Double} start start of where we should remove the cue
 * @param {Double} end end of where the we should remove the cue
 * @param {Object} track the text track to remove the cues from
 * @private
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var removeCuesFromTrack = function removeCuesFromTrack(start, end, track) {
  var i = undefined;
  var cue = undefined;

  if (!track) {
    return;
  }

  i = track.cues.length;

  while (i--) {
    cue = track.cues[i];

    // Remove any overlapping cue
    if (cue.startTime <= end && cue.endTime >= start) {
      track.removeCue(cue);
    }
  }
};

exports["default"] = removeCuesFromTrack;
module.exports = exports["default"];
},{}],92:[function(require,module,exports){
/**
 * @file transmuxer-worker.js
 */

/**
 * videojs-contrib-media-sources
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * Handles communication between the browser-world and the mux.js
 * transmuxer running inside of a WebWorker by exposing a simple
 * message-based interface to a Transmuxer object.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _muxJsLibMp4 = require('mux.js/lib/mp4');

var _muxJsLibMp42 = _interopRequireDefault(_muxJsLibMp4);

/**
 * Re-emits tranmsuxer events by converting them into messages to the
 * world outside the worker.
 *
 * @param {Object} transmuxer the transmuxer to wire events on
 * @private
 */
var wireTransmuxerEvents = function wireTransmuxerEvents(transmuxer) {
  transmuxer.on('data', function (segment) {
    // transfer ownership of the underlying ArrayBuffer
    // instead of doing a copy to save memory
    // ArrayBuffers are transferable but generic TypedArrays are not
    // @link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Passing_data_by_transferring_ownership_(transferable_objects)
    var initArray = segment.initSegment;

    segment.initSegment = {
      data: initArray.buffer,
      byteOffset: initArray.byteOffset,
      byteLength: initArray.byteLength
    };

    var typedArray = segment.data;

    segment.data = typedArray.buffer;
    _globalWindow2['default'].postMessage({
      action: 'data',
      segment: segment,
      byteOffset: typedArray.byteOffset,
      byteLength: typedArray.byteLength
    }, [segment.data]);
  });

  if (transmuxer.captionStream) {
    transmuxer.captionStream.on('data', function (caption) {
      _globalWindow2['default'].postMessage({
        action: 'caption',
        data: caption
      });
    });
  }

  transmuxer.on('done', function (data) {
    _globalWindow2['default'].postMessage({ action: 'done' });
  });
};

/**
 * All incoming messages route through this hash. If no function exists
 * to handle an incoming message, then we ignore the message.
 *
 * @class MessageHandlers
 * @param {Object} options the options to initialize with
 */

var MessageHandlers = (function () {
  function MessageHandlers(options) {
    _classCallCheck(this, MessageHandlers);

    this.options = options || {};
    this.init();
  }

  /**
   * Our web wroker interface so that things can talk to mux.js
   * that will be running in a web worker. the scope is passed to this by
   * webworkify.
   *
   * @param {Object} self the scope for the web worker
   */

  /**
   * initialize our web worker and wire all the events.
   */

  _createClass(MessageHandlers, [{
    key: 'init',
    value: function init() {
      if (this.transmuxer) {
        this.transmuxer.dispose();
      }
      this.transmuxer = new _muxJsLibMp42['default'].Transmuxer(this.options);
      wireTransmuxerEvents(this.transmuxer);
    }

    /**
     * Adds data (a ts segment) to the start of the transmuxer pipeline for
     * processing.
     *
     * @param {ArrayBuffer} data data to push into the muxer
     */
  }, {
    key: 'push',
    value: function push(data) {
      // Cast array buffer to correct type for transmuxer
      var segment = new Uint8Array(data.data, data.byteOffset, data.byteLength);

      this.transmuxer.push(segment);
    }

    /**
     * Recreate the transmuxer so that the next segment added via `push`
     * start with a fresh transmuxer.
     */
  }, {
    key: 'reset',
    value: function reset() {
      this.init();
    }

    /**
     * Set the value that will be used as the `baseMediaDecodeTime` time for the
     * next segment pushed in. Subsequent segments will have their `baseMediaDecodeTime`
     * set relative to the first based on the PTS values.
     *
     * @param {Object} data used to set the timestamp offset in the muxer
     */
  }, {
    key: 'setTimestampOffset',
    value: function setTimestampOffset(data) {
      var timestampOffset = data.timestampOffset || 0;

      this.transmuxer.setBaseMediaDecodeTime(Math.round(timestampOffset * 90000));
    }

    /**
     * Forces the pipeline to finish processing the last segment and emit it's
     * results.
     *
     * @param {Object} data event data, not really used
     */
  }, {
    key: 'flush',
    value: function flush(data) {
      this.transmuxer.flush();
    }
  }]);

  return MessageHandlers;
})();

var Worker = function Worker(self) {
  self.onmessage = function (event) {
    if (event.data.action === 'init' && event.data.options) {
      this.messageHandlers = new MessageHandlers(event.data.options);
      return;
    }

    if (!this.messageHandlers) {
      this.messageHandlers = new MessageHandlers();
    }

    if (event.data && event.data.action && event.data.action !== 'init') {
      if (this.messageHandlers[event.data.action]) {
        this.messageHandlers[event.data.action](event.data);
      }
    }
  };
};

exports['default'] = function (self) {
  return new Worker(self);
};

module.exports = exports['default'];
},{"global/window":22,"mux.js/lib/mp4":75}],93:[function(require,module,exports){
(function (global){
/**
 * @file videojs-contrib-media-sources.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _flashMediaSource = require('./flash-media-source');

var _flashMediaSource2 = _interopRequireDefault(_flashMediaSource);

var _htmlMediaSource = require('./html-media-source');

var _htmlMediaSource2 = _interopRequireDefault(_htmlMediaSource);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var urlCount = 0;

// ------------
// Media Source
// ------------

var defaults = {
  // how to determine the MediaSource implementation to use. There
  // are three available modes:
  // - auto: use native MediaSources where available and Flash
  //   everywhere else
  // - html5: always use native MediaSources
  // - flash: always use the Flash MediaSource polyfill
  mode: 'auto'
};

// store references to the media sources so they can be connected
// to a video element (a swf object)
// TODO: can we store this somewhere local to this module?
_videoJs2['default'].mediaSources = {};

/**
 * Provide a method for a swf object to notify JS that a
 * media source is now open.
 *
 * @param {String} msObjectURL string referencing the MSE Object URL
 * @param {String} swfId the swf id
 */
var open = function open(msObjectURL, swfId) {
  var mediaSource = _videoJs2['default'].mediaSources[msObjectURL];

  if (mediaSource) {
    mediaSource.trigger({ type: 'sourceopen', swfId: swfId });
  } else {
    throw new Error('Media Source not found (Video.js)');
  }
};

/**
 * Check to see if the native MediaSource object exists and supports
 * an MP4 container with both H.264 video and AAC-LC audio.
 *
 * @return {Boolean} if  native media sources are supported
 */
var supportsNativeMediaSources = function supportsNativeMediaSources() {
  return !!_globalWindow2['default'].MediaSource && !!_globalWindow2['default'].MediaSource.isTypeSupported && _globalWindow2['default'].MediaSource.isTypeSupported('video/mp4;codecs="avc1.4d400d,mp4a.40.2"');
};

/**
 * An emulation of the MediaSource API so that we can support
 * native and non-native functionality such as flash and
 * video/mp2t videos. returns an instance of HtmlMediaSource or
 * FlashMediaSource depending on what is supported and what options
 * are passed in.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/MediaSource
 * @param {Object} options options to use during setup.
 */
var MediaSource = function MediaSource(options) {
  var settings = _videoJs2['default'].mergeOptions(defaults, options);

  this.MediaSource = {
    open: open,
    supportsNativeMediaSources: supportsNativeMediaSources
  };

  // determine whether HTML MediaSources should be used
  if (settings.mode === 'html5' || settings.mode === 'auto' && supportsNativeMediaSources()) {
    return new _htmlMediaSource2['default']();
  }

  // otherwise, emulate them through the SWF
  return new _flashMediaSource2['default']();
};

exports.MediaSource = MediaSource;
MediaSource.open = open;
MediaSource.supportsNativeMediaSources = supportsNativeMediaSources;

/**
 * A wrapper around the native URL for our MSE object
 * implementation, this object is exposed under videojs.URL
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 */
var URL = {
  /**
   * A wrapper around the native createObjectURL for our objects.
   * This function maps a native or emulated mediaSource to a blob
   * url so that it can be loaded into video.js
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
   * @param {MediaSource} object the object to create a blob url to
   */
  createObjectURL: function createObjectURL(object) {
    var objectUrlPrefix = 'blob:vjs-media-source/';
    var url = undefined;

    // use the native MediaSource to generate an object URL
    if (object instanceof _htmlMediaSource2['default']) {
      url = _globalWindow2['default'].URL.createObjectURL(object.nativeMediaSource_);
      object.url_ = url;
      return url;
    }
    // if the object isn't an emulated MediaSource, delegate to the
    // native implementation
    if (!(object instanceof _flashMediaSource2['default'])) {
      url = _globalWindow2['default'].URL.createObjectURL(object);
      object.url_ = url;
      return url;
    }

    // build a URL that can be used to map back to the emulated
    // MediaSource
    url = objectUrlPrefix + urlCount;

    urlCount++;

    // setup the mapping back to object
    _videoJs2['default'].mediaSources[url] = object;

    return url;
  }
};

exports.URL = URL;
_videoJs2['default'].MediaSource = MediaSource;
_videoJs2['default'].URL = URL;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./flash-media-source":88,"./html-media-source":90,"global/window":22}],94:[function(require,module,exports){
(function (global){
/**
 * @file virtual-source-buffer.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _createTextTracksIfNecessary = require('./create-text-tracks-if-necessary');

var _createTextTracksIfNecessary2 = _interopRequireDefault(_createTextTracksIfNecessary);

var _removeCuesFromTrack = require('./remove-cues-from-track');

var _removeCuesFromTrack2 = _interopRequireDefault(_removeCuesFromTrack);

var _addTextTrackData = require('./add-text-track-data');

var _webworkify = require('webworkify');

var _webworkify2 = _interopRequireDefault(_webworkify);

var _transmuxerWorker = require('./transmuxer-worker');

var _transmuxerWorker2 = _interopRequireDefault(_transmuxerWorker);

var _codecUtils = require('./codec-utils');

/**
 * VirtualSourceBuffers exist so that we can transmux non native formats
 * into a native format, but keep the same api as a native source buffer.
 * It creates a transmuxer, that works in its own thread (a web worker) and
 * that transmuxer muxes the data into a native format. VirtualSourceBuffer will
 * then send all of that data to the naive sourcebuffer so that it is
 * indestinguishable from a natively supported format.
 *
 * @param {HtmlMediaSource} mediaSource the parent mediaSource
 * @param {Array} codecs array of codecs that we will be dealing with
 * @class VirtualSourceBuffer
 * @extends video.js.EventTarget
 */

var VirtualSourceBuffer = (function (_videojs$EventTarget) {
  _inherits(VirtualSourceBuffer, _videojs$EventTarget);

  function VirtualSourceBuffer(mediaSource, codecs) {
    var _this = this;

    _classCallCheck(this, VirtualSourceBuffer);

    _get(Object.getPrototypeOf(VirtualSourceBuffer.prototype), 'constructor', this).call(this, _videoJs2['default'].EventTarget);
    this.timestampOffset_ = 0;
    this.pendingBuffers_ = [];
    this.bufferUpdating_ = false;
    this.mediaSource_ = mediaSource;
    this.codecs_ = codecs;
    this.audioCodec_ = null;
    this.videoCodec_ = null;
    this.audioDisabled_ = false;
    this.appendAudioInitSegment_ = true;

    var options = {
      remux: false
    };

    this.codecs_.forEach(function (codec) {
      if ((0, _codecUtils.isAudioCodec)(codec)) {
        _this.audioCodec_ = codec;
      } else if ((0, _codecUtils.isVideoCodec)(codec)) {
        _this.videoCodec_ = codec;
      }
    });

    // append muxed segments to their respective native buffers as
    // soon as they are available
    this.transmuxer_ = (0, _webworkify2['default'])(_transmuxerWorker2['default']);
    this.transmuxer_.postMessage({ action: 'init', options: options });

    this.transmuxer_.onmessage = function (event) {
      if (event.data.action === 'data') {
        return _this.data_(event);
      }

      if (event.data.action === 'done') {
        return _this.done_(event);
      }
    };

    // this timestampOffset is a property with the side-effect of resetting
    // baseMediaDecodeTime in the transmuxer on the setter
    Object.defineProperty(this, 'timestampOffset', {
      get: function get() {
        return this.timestampOffset_;
      },
      set: function set(val) {
        if (typeof val === 'number' && val >= 0) {
          this.timestampOffset_ = val;
          this.appendAudioInitSegment_ = true;

          // We have to tell the transmuxer to set the baseMediaDecodeTime to
          // the desired timestampOffset for the next segment
          this.transmuxer_.postMessage({
            action: 'setTimestampOffset',
            timestampOffset: val
          });
        }
      }
    });

    // setting the append window affects both source buffers
    Object.defineProperty(this, 'appendWindowStart', {
      get: function get() {
        return (this.videoBuffer_ || this.audioBuffer_).appendWindowStart;
      },
      set: function set(start) {
        if (this.videoBuffer_) {
          this.videoBuffer_.appendWindowStart = start;
        }
        if (this.audioBuffer_) {
          this.audioBuffer_.appendWindowStart = start;
        }
      }
    });

    // this buffer is "updating" if either of its native buffers are
    Object.defineProperty(this, 'updating', {
      get: function get() {
        return !!(this.bufferUpdating_ || !this.audioDisabled_ && this.audioBuffer_ && this.audioBuffer_.updating || this.videoBuffer_ && this.videoBuffer_.updating);
      }
    });

    // the buffered property is the intersection of the buffered
    // ranges of the native source buffers
    Object.defineProperty(this, 'buffered', {
      get: function get() {
        var start = null;
        var end = null;
        var arity = 0;
        var extents = [];
        var ranges = [];

        // neither buffer has been created yet
        if (!this.videoBuffer_ && !this.audioBuffer_) {
          return _videoJs2['default'].createTimeRange();
        }

        // only one buffer is configured
        if (!this.videoBuffer_) {
          return this.audioBuffer_.buffered;
        }
        if (!this.audioBuffer_) {
          return this.videoBuffer_.buffered;
        }

        // both buffers are configured
        if (this.audioDisabled_) {
          return this.videoBuffer_.buffered;
        }

        // both buffers are empty
        if (this.videoBuffer_.buffered.length === 0 && this.audioBuffer_.buffered.length === 0) {
          return _videoJs2['default'].createTimeRange();
        }

        // Handle the case where we have both buffers and create an
        // intersection of the two
        var videoBuffered = this.videoBuffer_.buffered;
        var audioBuffered = this.audioBuffer_.buffered;
        var count = videoBuffered.length;

        // A) Gather up all start and end times
        while (count--) {
          extents.push({ time: videoBuffered.start(count), type: 'start' });
          extents.push({ time: videoBuffered.end(count), type: 'end' });
        }
        count = audioBuffered.length;
        while (count--) {
          extents.push({ time: audioBuffered.start(count), type: 'start' });
          extents.push({ time: audioBuffered.end(count), type: 'end' });
        }
        // B) Sort them by time
        extents.sort(function (a, b) {
          return a.time - b.time;
        });

        // C) Go along one by one incrementing arity for start and decrementing
        //    arity for ends
        for (count = 0; count < extents.length; count++) {
          if (extents[count].type === 'start') {
            arity++;

            // D) If arity is ever incremented to 2 we are entering an
            //    overlapping range
            if (arity === 2) {
              start = extents[count].time;
            }
          } else if (extents[count].type === 'end') {
            arity--;

            // E) If arity is ever decremented to 1 we leaving an
            //    overlapping range
            if (arity === 1) {
              end = extents[count].time;
            }
          }

          // F) Record overlapping ranges
          if (start !== null && end !== null) {
            ranges.push([start, end]);
            start = null;
            end = null;
          }
        }

        return _videoJs2['default'].createTimeRanges(ranges);
      }
    });
  }

  /**
   * When we get a data event from the transmuxer
   * we call this function and handle the data that
   * was sent to us
   *
   * @private
   * @param {Event} event the data event from the transmuxer
   */

  _createClass(VirtualSourceBuffer, [{
    key: 'data_',
    value: function data_(event) {
      var segment = event.data.segment;

      // Cast ArrayBuffer to TypedArray
      segment.data = new Uint8Array(segment.data, event.data.byteOffset, event.data.byteLength);

      segment.initSegment = new Uint8Array(segment.initSegment.data, segment.initSegment.byteOffset, segment.initSegment.byteLength);

      (0, _createTextTracksIfNecessary2['default'])(this, this.mediaSource_, segment);

      // Add the segments to the pendingBuffers array
      this.pendingBuffers_.push(segment);
      return;
    }

    /**
     * When we get a done event from the transmuxer
     * we call this function and we process all
     * of the pending data that we have been saving in the
     * data_ function
     *
     * @private
     * @param {Event} event the done event from the transmuxer
     */
  }, {
    key: 'done_',
    value: function done_(event) {
      // All buffers should have been flushed from the muxer
      // start processing anything we have received
      this.processPendingSegments_();
      return;
    }

    /**
     * Create our internal native audio/video source buffers and add
     * event handlers to them with the following conditions:
     * 1. they do not already exist on the mediaSource
     * 2. this VSB has a codec for them
     *
     * @private
     */
  }, {
    key: 'createRealSourceBuffers_',
    value: function createRealSourceBuffers_() {
      var _this2 = this;

      var types = ['audio', 'video'];

      types.forEach(function (type) {
        // Don't create a SourceBuffer of this type if we don't have a
        // codec for it
        if (!_this2[type + 'Codec_']) {
          return;
        }

        // Do nothing if a SourceBuffer of this type already exists
        if (_this2[type + 'Buffer_']) {
          return;
        }

        var buffer = null;

        // If the mediasource already has a SourceBuffer for the codec
        // use that
        if (_this2.mediaSource_[type + 'Buffer_']) {
          buffer = _this2.mediaSource_[type + 'Buffer_'];
        } else {
          buffer = _this2.mediaSource_.nativeMediaSource_.addSourceBuffer(type + '/mp4;codecs="' + _this2[type + 'Codec_'] + '"');
          _this2.mediaSource_[type + 'Buffer_'] = buffer;
        }

        _this2[type + 'Buffer_'] = buffer;

        // Wire up the events to the SourceBuffer
        ['update', 'updatestart', 'updateend'].forEach(function (event) {
          buffer.addEventListener(event, function () {
            // if audio is disabled
            if (type === 'audio' && _this2.audioDisabled_) {
              return;
            }

            var shouldTrigger = types.every(function (t) {
              // skip checking audio's updating status if audio
              // is not enabled
              if (t === 'audio' && _this2.audioDisabled_) {
                return true;
              }
              // if the other type if updating we don't trigger
              if (type !== t && _this2[t + 'Buffer_'] && _this2[t + 'Buffer_'].updating) {
                return false;
              }
              return true;
            });

            if (shouldTrigger) {
              return _this2.trigger(event);
            }
          });
        });
      });
    }

    /**
     * Emulate the native mediasource function, but our function will
     * send all of the proposed segments to the transmuxer so that we
     * can transmux them before we append them to our internal
     * native source buffers in the correct format.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/appendBuffer
     * @param {Uint8Array} segment the segment to append to the buffer
     */
  }, {
    key: 'appendBuffer',
    value: function appendBuffer(segment) {
      // Start the internal "updating" state
      this.bufferUpdating_ = true;

      this.transmuxer_.postMessage({
        action: 'push',
        // Send the typed-array of data as an ArrayBuffer so that
        // it can be sent as a "Transferable" and avoid the costly
        // memory copy
        data: segment.buffer,

        // To recreate the original typed-array, we need information
        // about what portion of the ArrayBuffer it was a view into
        byteOffset: segment.byteOffset,
        byteLength: segment.byteLength
      }, [segment.buffer]);
      this.transmuxer_.postMessage({ action: 'flush' });
    }

    /**
     * Emulate the native mediasource function and remove parts
     * of the buffer from any of our internal buffers that exist
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/remove
     * @param {Double} start position to start the remove at
     * @param {Double} end position to end the remove at
     */
  }, {
    key: 'remove',
    value: function remove(start, end) {
      if (this.videoBuffer_) {
        this.videoBuffer_.remove(start, end);
      }
      if (this.audioBuffer_) {
        this.audioBuffer_.remove(start, end);
      }

      // Remove Metadata Cues (id3)
      (0, _removeCuesFromTrack2['default'])(start, end, this.metadataTrack_);

      // Remove Any Captions
      (0, _removeCuesFromTrack2['default'])(start, end, this.inbandTextTrack_);
    }

    /**
     * Process any segments that the muxer has output
     * Concatenate segments together based on type and append them into
     * their respective sourceBuffers
     *
     * @private
     */
  }, {
    key: 'processPendingSegments_',
    value: function processPendingSegments_() {
      var sortedSegments = {
        video: {
          segments: [],
          bytes: 0
        },
        audio: {
          segments: [],
          bytes: 0
        },
        captions: [],
        metadata: []
      };

      // Sort segments into separate video/audio arrays and
      // keep track of their total byte lengths
      sortedSegments = this.pendingBuffers_.reduce(function (segmentObj, segment) {
        var type = segment.type;
        var data = segment.data;
        var initSegment = segment.initSegment;

        segmentObj[type].segments.push(data);
        segmentObj[type].bytes += data.byteLength;

        segmentObj[type].initSegment = initSegment;

        // Gather any captions into a single array
        if (segment.captions) {
          segmentObj.captions = segmentObj.captions.concat(segment.captions);
        }

        if (segment.info) {
          segmentObj[type].info = segment.info;
        }

        // Gather any metadata into a single array
        if (segment.metadata) {
          segmentObj.metadata = segmentObj.metadata.concat(segment.metadata);
        }

        return segmentObj;
      }, sortedSegments);

      // Create the real source buffers if they don't exist by now since we
      // finally are sure what tracks are contained in the source
      if (!this.videoBuffer_ && !this.audioBuffer_) {
        // Remove any codecs that may have been specified by default but
        // are no longer applicable now
        if (sortedSegments.video.bytes === 0) {
          this.videoCodec_ = null;
        }
        if (sortedSegments.audio.bytes === 0) {
          this.audioCodec_ = null;
        }

        this.createRealSourceBuffers_();
      }

      if (sortedSegments.audio.info) {
        this.mediaSource_.trigger({ type: 'audioinfo', info: sortedSegments.audio.info });
      }
      if (sortedSegments.video.info) {
        this.mediaSource_.trigger({ type: 'videoinfo', info: sortedSegments.video.info });
      }

      if (this.appendAudioInitSegment_) {
        if (!this.audioDisabled_ && this.audioBuffer_) {
          sortedSegments.audio.segments.unshift(sortedSegments.audio.initSegment);
          sortedSegments.audio.bytes += sortedSegments.audio.initSegment.byteLength;
        }
        this.appendAudioInitSegment_ = false;
      }

      // Merge multiple video and audio segments into one and append
      if (this.videoBuffer_) {
        sortedSegments.video.segments.unshift(sortedSegments.video.initSegment);
        sortedSegments.video.bytes += sortedSegments.video.initSegment.byteLength;
        this.concatAndAppendSegments_(sortedSegments.video, this.videoBuffer_);
        // TODO: are video tracks the only ones with text tracks?
        (0, _addTextTrackData.addTextTrackData)(this, sortedSegments.captions, sortedSegments.metadata);
      }
      if (!this.audioDisabled_ && this.audioBuffer_) {
        this.concatAndAppendSegments_(sortedSegments.audio, this.audioBuffer_);
      }

      this.pendingBuffers_.length = 0;

      // We are no longer in the internal "updating" state
      this.bufferUpdating_ = false;
    }

    /**
     * Combine all segments into a single Uint8Array and then append them
     * to the destination buffer
     *
     * @param {Object} segmentObj
     * @param {SourceBuffer} destinationBuffer native source buffer to append data to
     * @private
     */
  }, {
    key: 'concatAndAppendSegments_',
    value: function concatAndAppendSegments_(segmentObj, destinationBuffer) {
      var offset = 0;
      var tempBuffer = undefined;

      if (segmentObj.bytes) {
        tempBuffer = new Uint8Array(segmentObj.bytes);

        // Combine the individual segments into one large typed-array
        segmentObj.segments.forEach(function (segment) {
          tempBuffer.set(segment, offset);
          offset += segment.byteLength;
        });

        destinationBuffer.appendBuffer(tempBuffer);
      }
    }

    /**
     * Emulate the native mediasource function. abort any soureBuffer
     * actions and throw out any un-appended data.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/abort
     */
  }, {
    key: 'abort',
    value: function abort() {
      if (this.videoBuffer_) {
        this.videoBuffer_.abort();
      }
      if (this.audioBuffer_) {
        this.audioBuffer_.abort();
      }
      if (this.transmuxer_) {
        this.transmuxer_.postMessage({ action: 'reset' });
      }
      this.pendingBuffers_.length = 0;
      this.bufferUpdating_ = false;
    }
  }]);

  return VirtualSourceBuffer;
})(_videoJs2['default'].EventTarget);

exports['default'] = VirtualSourceBuffer;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./add-text-track-data":84,"./codec-utils":85,"./create-text-tracks-if-necessary":86,"./remove-cues-from-track":91,"./transmuxer-worker":92,"webworkify":95}],95:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn) {
    var keys = [];
    var wkey;
    var cacheKeys = Object.keys(cache);
    
    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        if (cache[key].exports === fn) {
            wkey = key;
            break;
        }
    }
    
    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            Function(['require','module','exports'], '(' + fn + ')(self)'),
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
    
    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        Function(['require'],'require(' + stringify(wkey) + ')(self)'),
        scache
    ];
    
    var src = '(' + bundleFn + ')({'
        + Object.keys(sources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;
    
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    
    return new Worker(URL.createObjectURL(
        new Blob([src], { type: 'text/javascript' })
    ));
};

},{}],96:[function(require,module,exports){
(function (global){
/**
 * @file videojs-contrib-hls.js
 *
 * The main file for the HLS project.
 * License: https://github.com/videojs/videojs-contrib-hls/blob/master/LICENSE
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _playlistLoader = require('./playlist-loader');

var _playlistLoader2 = _interopRequireDefault(_playlistLoader);

var _playlist = require('./playlist');

var _playlist2 = _interopRequireDefault(_playlist);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _aesDecrypter = require('aes-decrypter');

var _binUtils = require('./bin-utils');

var _binUtils2 = _interopRequireDefault(_binUtils);

var _videojsContribMediaSources = require('videojs-contrib-media-sources');

var _m3u8Parser = require('m3u8-parser');

var _m3u8Parser2 = _interopRequireDefault(_m3u8Parser);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _masterPlaylistController = require('./master-playlist-controller');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _renditionMixin = require('./rendition-mixin');

var _renditionMixin2 = _interopRequireDefault(_renditionMixin);

var _gapSkipper = require('./gap-skipper');

var _gapSkipper2 = _interopRequireDefault(_gapSkipper);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var Hls = {
  PlaylistLoader: _playlistLoader2['default'],
  Playlist: _playlist2['default'],
  Decrypter: _aesDecrypter.Decrypter,
  AsyncStream: _aesDecrypter.AsyncStream,
  decrypt: _aesDecrypter.decrypt,
  utils: _binUtils2['default'],
  xhr: (0, _xhr2['default'])()
};

Object.defineProperty(Hls, 'GOAL_BUFFER_LENGTH', {
  get: function get() {
    _videoJs2['default'].log.warn('using Hls.GOAL_BUFFER_LENGTH is UNSAFE be sure ' + 'you know what you are doing');
    return _config2['default'].GOAL_BUFFER_LENGTH;
  },
  set: function set(v) {
    _videoJs2['default'].log.warn('using Hls.GOAL_BUFFER_LENGTH is UNSAFE be sure ' + 'you know what you are doing');
    if (typeof v !== 'number' || v <= 0) {
      _videoJs2['default'].log.warn('value passed to Hls.GOAL_BUFFER_LENGTH ' + 'must be a number and greater than 0');
      return;
    }
    _config2['default'].GOAL_BUFFER_LENGTH = v;
  }
});

// A fudge factor to apply to advertised playlist bitrates to account for
// temporary flucations in client bandwidth
var BANDWIDTH_VARIANCE = 1.2;

/**
 * Returns the CSS value for the specified property on an element
 * using `getComputedStyle`. Firefox has a long-standing issue where
 * getComputedStyle() may return null when running in an iframe with
 * `display: none`.
 *
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 * @param {HTMLElement} el the htmlelement to work on
 * @param {string} the proprety to get the style for
 */
var safeGetComputedStyle = function safeGetComputedStyle(el, property) {
  var result = undefined;

  if (!el) {
    return '';
  }

  result = _globalWindow2['default'].getComputedStyle(el);
  if (!result) {
    return '';
  }

  return result[property];
};

/**
 * Chooses the appropriate media playlist based on the current
 * bandwidth estimate and the player size.
 *
 * @return {Playlist} the highest bitrate playlist less than the currently detected
 * bandwidth, accounting for some amount of bandwidth variance
 */
Hls.STANDARD_PLAYLIST_SELECTOR = function () {
  var effectiveBitrate = undefined;
  var sortedPlaylists = this.playlists.master.playlists.slice();
  var bandwidthPlaylists = [];
  var now = +new Date();
  var i = undefined;
  var variant = undefined;
  var bandwidthBestVariant = undefined;
  var resolutionPlusOne = undefined;
  var resolutionPlusOneAttribute = undefined;
  var resolutionBestVariant = undefined;
  var width = undefined;
  var height = undefined;

  sortedPlaylists.sort(Hls.comparePlaylistBandwidth);

  // filter out any playlists that have been excluded due to
  // incompatible configurations or playback errors
  sortedPlaylists = sortedPlaylists.filter(function (localVariant) {
    if (typeof localVariant.excludeUntil !== 'undefined') {
      return now >= localVariant.excludeUntil;
    }
    return true;
  });

  // filter out any variant that has greater effective bitrate
  // than the current estimated bandwidth
  i = sortedPlaylists.length;
  while (i--) {
    variant = sortedPlaylists[i];

    // ignore playlists without bandwidth information
    if (!variant.attributes || !variant.attributes.BANDWIDTH) {
      continue;
    }

    effectiveBitrate = variant.attributes.BANDWIDTH * BANDWIDTH_VARIANCE;

    if (effectiveBitrate < this.bandwidth) {
      bandwidthPlaylists.push(variant);

      // since the playlists are sorted in ascending order by
      // bandwidth, the first viable variant is the best
      if (!bandwidthBestVariant) {
        bandwidthBestVariant = variant;
      }
    }
  }

  i = bandwidthPlaylists.length;

  // sort variants by resolution
  bandwidthPlaylists.sort(Hls.comparePlaylistResolution);

  // forget our old variant from above,
  // or we might choose that in high-bandwidth scenarios
  // (this could be the lowest bitrate rendition as  we go through all of them above)
  variant = null;

  width = parseInt(safeGetComputedStyle(this.tech_.el(), 'width'), 10);
  height = parseInt(safeGetComputedStyle(this.tech_.el(), 'height'), 10);

  // iterate through the bandwidth-filtered playlists and find
  // best rendition by player dimension
  while (i--) {
    variant = bandwidthPlaylists[i];

    // ignore playlists without resolution information
    if (!variant.attributes || !variant.attributes.RESOLUTION || !variant.attributes.RESOLUTION.width || !variant.attributes.RESOLUTION.height) {
      continue;
    }

    // since the playlists are sorted, the first variant that has
    // dimensions less than or equal to the player size is the best
    var variantResolution = variant.attributes.RESOLUTION;

    if (variantResolution.width === width && variantResolution.height === height) {
      // if we have the exact resolution as the player use it
      resolutionPlusOne = null;
      resolutionBestVariant = variant;
      break;
    } else if (variantResolution.width < width && variantResolution.height < height) {
      // if both dimensions are less than the player use the
      // previous (next-largest) variant
      break;
    } else if (!resolutionPlusOne || variantResolution.width < resolutionPlusOneAttribute.width && variantResolution.height < resolutionPlusOneAttribute.height) {
      // If we still haven't found a good match keep a
      // reference to the previous variant for the next loop
      // iteration

      // By only saving variants if they are smaller than the
      // previously saved variant, we ensure that we also pick
      // the highest bandwidth variant that is just-larger-than
      // the video player
      resolutionPlusOne = variant;
      resolutionPlusOneAttribute = resolutionPlusOne.attributes.RESOLUTION;
    }
  }

  // fallback chain of variants
  return resolutionPlusOne || resolutionBestVariant || bandwidthBestVariant || sortedPlaylists[0];
};

// HLS is a source handler, not a tech. Make sure attempts to use it
// as one do not cause exceptions.
Hls.canPlaySource = function () {
  return _videoJs2['default'].log.warn('HLS is no longer a tech. Please remove it from ' + 'your player\'s techOrder.');
};

/**
 * Whether the browser has built-in HLS support.
 */
Hls.supportsNativeHls = (function () {
  var video = _globalDocument2['default'].createElement('video');

  // native HLS is definitely not supported if HTML5 video isn't
  if (!_videoJs2['default'].getComponent('Html5').isSupported()) {
    return false;
  }

  // HLS manifests can go by many mime-types
  var canPlay = [
  // Apple santioned
  'application/vnd.apple.mpegurl',
  // Apple sanctioned for backwards compatibility
  'audio/mpegurl',
  // Very common
  'audio/x-mpegurl',
  // Very common
  'application/x-mpegurl',
  // Included for completeness
  'video/x-mpegurl', 'video/mpegurl', 'application/mpegurl'];

  return canPlay.some(function (canItPlay) {
    return (/maybe|probably/i.test(video.canPlayType(canItPlay))
    );
  });
})();

/**
 * HLS is a source handler, not a tech. Make sure attempts to use it
 * as one do not cause exceptions.
 */
Hls.isSupported = function () {
  return _videoJs2['default'].log.warn('HLS is no longer a tech. Please remove it from ' + 'your player\'s techOrder.');
};

var USER_AGENT = _globalWindow2['default'].navigator && _globalWindow2['default'].navigator.userAgent || '';

/**
 * Determines whether the browser supports a change in the audio configuration
 * during playback. Currently only Firefox 48 and below do not support this.
 * window.isSecureContext is a propterty that was added to window in firefox 49,
 * so we can use it to detect Firefox 49+.
 *
 * @return {Boolean} Whether the browser supports audio config change during playback
 */
Hls.supportsAudioInfoChange_ = function () {
  if (_videoJs2['default'].browser.IS_FIREFOX) {
    var firefoxVersionMap = /Firefox\/([\d.]+)/i.exec(USER_AGENT);
    var version = parseInt(firefoxVersionMap[1], 10);

    return version >= 49;
  }
  return true;
};

var Component = _videoJs2['default'].getComponent('Component');

/**
 * The Hls Handler object, where we orchestrate all of the parts
 * of HLS to interact with video.js
 *
 * @class HlsHandler
 * @extends videojs.Component
 * @param {Object} source the soruce object
 * @param {Tech} tech the parent tech object
 * @param {Object} options optional and required options
 */

var HlsHandler = (function (_Component) {
  _inherits(HlsHandler, _Component);

  function HlsHandler(source, tech, options) {
    var _this = this;

    _classCallCheck(this, HlsHandler);

    _get(Object.getPrototypeOf(HlsHandler.prototype), 'constructor', this).call(this, tech);

    // tech.player() is deprecated but setup a reference to HLS for
    // backwards-compatibility
    if (tech.options_ && tech.options_.playerId) {
      var _player = (0, _videoJs2['default'])(tech.options_.playerId);

      if (!_player.hasOwnProperty('hls')) {
        Object.defineProperty(_player, 'hls', {
          get: function get() {
            _videoJs2['default'].log.warn('player.hls is deprecated. Use player.tech_.hls instead.');
            return _this;
          }
        });
      }
    }

    this.tech_ = tech;
    this.source_ = source;
    this.stats = {};

    // handle global & Source Handler level options
    this.options_ = _videoJs2['default'].mergeOptions(_videoJs2['default'].options.hls || {}, options.hls);
    this.setOptions_();

    // listen for fullscreenchange events for this player so that we
    // can adjust our quality selection quickly
    this.on(_globalDocument2['default'], ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'], function (event) {
      var fullscreenElement = _globalDocument2['default'].fullscreenElement || _globalDocument2['default'].webkitFullscreenElement || _globalDocument2['default'].mozFullScreenElement || _globalDocument2['default'].msFullscreenElement;

      if (fullscreenElement && fullscreenElement.contains(_this.tech_.el())) {
        _this.masterPlaylistController_.fastQualityChange_();
      }
    });

    this.on(this.tech_, 'seeking', function () {
      this.setCurrentTime(this.tech_.currentTime());
    });
    this.on(this.tech_, 'error', function () {
      if (this.masterPlaylistController_) {
        this.masterPlaylistController_.pauseLoading();
      }
    });

    this.audioTrackChange_ = function () {
      _this.masterPlaylistController_.setupAudio();
    };

    this.on(this.tech_, 'play', this.play);
  }

  /**
   * The Source Handler object, which informs video.js what additional
   * MIME types are supported and sets up playback. It is registered
   * automatically to the appropriate tech based on the capabilities of
   * the browser it is running in. It is not necessary to use or modify
   * this object in normal usage.
   */

  _createClass(HlsHandler, [{
    key: 'setOptions_',
    value: function setOptions_() {
      var _this2 = this;

      // defaults
      this.options_.withCredentials = this.options_.withCredentials || false;

      // start playlist selection at a reasonable bandwidth for
      // broadband internet
      // 0.5 MB/s
      if (typeof this.options_.bandwidth !== 'number') {
        this.options_.bandwidth = 4194304;
      }

      // grab options passed to player.src
      ['withCredentials', 'bandwidth'].forEach(function (option) {
        if (typeof _this2.source_[option] !== 'undefined') {
          _this2.options_[option] = _this2.source_[option];
        }
      });

      this.bandwidth = this.options_.bandwidth;
    }

    /**
     * called when player.src gets called, handle a new source
     *
     * @param {Object} src the source object to handle
     */
  }, {
    key: 'src',
    value: function src(_src) {
      var _this3 = this;

      // do nothing if the src is falsey
      if (!_src) {
        return;
      }
      this.setOptions_();
      // add master playlist controller options
      this.options_.url = this.source_.src;
      this.options_.tech = this.tech_;
      this.options_.externHls = Hls;
      this.masterPlaylistController_ = new _masterPlaylistController.MasterPlaylistController(this.options_);
      this.gapSkipper_ = new _gapSkipper2['default'](this.options_);

      // `this` in selectPlaylist should be the HlsHandler for backwards
      // compatibility with < v2
      this.masterPlaylistController_.selectPlaylist = this.selectPlaylist ? this.selectPlaylist.bind(this) : Hls.STANDARD_PLAYLIST_SELECTOR.bind(this);

      // re-expose some internal objects for backwards compatibility with < v2
      this.playlists = this.masterPlaylistController_.masterPlaylistLoader_;
      this.mediaSource = this.masterPlaylistController_.mediaSource;

      // Proxy assignment of some properties to the master playlist
      // controller. Using a custom property for backwards compatibility
      // with < v2
      Object.defineProperties(this, {
        selectPlaylist: {
          get: function get() {
            return this.masterPlaylistController_.selectPlaylist;
          },
          set: function set(selectPlaylist) {
            this.masterPlaylistController_.selectPlaylist = selectPlaylist.bind(this);
          }
        },
        bandwidth: {
          get: function get() {
            return this.masterPlaylistController_.mainSegmentLoader_.bandwidth;
          },
          set: function set(bandwidth) {
            this.masterPlaylistController_.mainSegmentLoader_.bandwidth = bandwidth;
          }
        }
      });

      Object.defineProperties(this.stats, {
        bandwidth: {
          get: function get() {
            return _this3.bandwidth || 0;
          },
          enumerable: true
        },
        mediaRequests: {
          get: function get() {
            return _this3.masterPlaylistController_.mediaRequests_() || 0;
          },
          enumerable: true
        },
        mediaTransferDuration: {
          get: function get() {
            return _this3.masterPlaylistController_.mediaTransferDuration_() || 0;
          },
          enumerable: true
        },
        mediaBytesTransferred: {
          get: function get() {
            return _this3.masterPlaylistController_.mediaBytesTransferred_() || 0;
          },
          enumerable: true
        }
      });

      this.tech_.one('canplay', this.masterPlaylistController_.setupFirstPlay.bind(this.masterPlaylistController_));

      this.masterPlaylistController_.on('sourceopen', function () {
        _this3.tech_.audioTracks().addEventListener('change', _this3.audioTrackChange_);
      });

      this.masterPlaylistController_.on('selectedinitialmedia', function () {
        // Add the manual rendition mix-in to HlsHandler
        (0, _renditionMixin2['default'])(_this3);
      });

      this.masterPlaylistController_.on('audioupdate', function () {
        // clear current audioTracks
        _this3.tech_.clearTracks('audio');
        _this3.masterPlaylistController_.activeAudioGroup().forEach(function (audioTrack) {
          _this3.tech_.audioTracks().addTrack(audioTrack);
        });
      });

      // the bandwidth of the primary segment loader is our best
      // estimate of overall bandwidth
      this.on(this.masterPlaylistController_, 'progress', function () {
        this.bandwidth = this.masterPlaylistController_.mainSegmentLoader_.bandwidth;
        this.tech_.trigger('progress');
      });

      // do nothing if the tech has been disposed already
      // this can occur if someone sets the src in player.ready(), for instance
      if (!this.tech_.el()) {
        return;
      }

      this.tech_.src(_videoJs2['default'].URL.createObjectURL(this.masterPlaylistController_.mediaSource));
    }

    /**
     * a helper for grabbing the active audio group from MasterPlaylistController
     *
     * @private
     */
  }, {
    key: 'activeAudioGroup_',
    value: function activeAudioGroup_() {
      return this.masterPlaylistController_.activeAudioGroup();
    }

    /**
     * Begin playing the video.
     */
  }, {
    key: 'play',
    value: function play() {
      this.masterPlaylistController_.play();
    }

    /**
     * a wrapper around the function in MasterPlaylistController
     */
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(currentTime) {
      this.masterPlaylistController_.setCurrentTime(currentTime);
    }

    /**
     * a wrapper around the function in MasterPlaylistController
     */
  }, {
    key: 'duration',
    value: function duration() {
      return this.masterPlaylistController_.duration();
    }

    /**
     * a wrapper around the function in MasterPlaylistController
     */
  }, {
    key: 'seekable',
    value: function seekable() {
      return this.masterPlaylistController_.seekable();
    }

    /**
    * Abort all outstanding work and cleanup.
    */
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.masterPlaylistController_) {
        this.masterPlaylistController_.dispose();
      }
      this.gapSkipper_.dispose();
      this.tech_.audioTracks().removeEventListener('change', this.audioTrackChange_);
      _get(Object.getPrototypeOf(HlsHandler.prototype), 'dispose', this).call(this);
    }
  }]);

  return HlsHandler;
})(Component);

var HlsSourceHandler = function HlsSourceHandler(mode) {
  return {
    canHandleSource: function canHandleSource(srcObj) {
      // this forces video.js to skip this tech/mode if its not the one we have been
      // overriden to use, by returing that we cannot handle the source.
      if (_videoJs2['default'].options.hls && _videoJs2['default'].options.hls.mode && _videoJs2['default'].options.hls.mode !== mode) {
        return false;
      }
      return HlsSourceHandler.canPlayType(srcObj.type);
    },
    handleSource: function handleSource(source, tech, options) {
      if (mode === 'flash') {
        // We need to trigger this asynchronously to give others the chance
        // to bind to the event when a source is set at player creation
        tech.setTimeout(function () {
          tech.trigger('loadstart');
        }, 1);
      }

      var settings = _videoJs2['default'].mergeOptions(options, { hls: { mode: mode } });

      tech.hls = new HlsHandler(source, tech, settings);

      tech.hls.xhr = (0, _xhr2['default'])();
      // Use a global `before` function if specified on videojs.Hls.xhr
      // but still allow for a per-player override
      if (_videoJs2['default'].Hls.xhr.beforeRequest) {
        tech.hls.xhr.beforeRequest = _videoJs2['default'].Hls.xhr.beforeRequest;
      }

      tech.hls.src(source.src);
      return tech.hls;
    },
    canPlayType: function canPlayType(type) {
      if (HlsSourceHandler.canPlayType(type)) {
        return 'maybe';
      }
      return '';
    }
  };
};

/**
 * A comparator function to sort two playlist object by bandwidth.
 *
 * @param {Object} left a media playlist object
 * @param {Object} right a media playlist object
 * @return {Number} Greater than zero if the bandwidth attribute of
 * left is greater than the corresponding attribute of right. Less
 * than zero if the bandwidth of right is greater than left and
 * exactly zero if the two are equal.
 */
Hls.comparePlaylistBandwidth = function (left, right) {
  var leftBandwidth = undefined;
  var rightBandwidth = undefined;

  if (left.attributes && left.attributes.BANDWIDTH) {
    leftBandwidth = left.attributes.BANDWIDTH;
  }
  leftBandwidth = leftBandwidth || _globalWindow2['default'].Number.MAX_VALUE;
  if (right.attributes && right.attributes.BANDWIDTH) {
    rightBandwidth = right.attributes.BANDWIDTH;
  }
  rightBandwidth = rightBandwidth || _globalWindow2['default'].Number.MAX_VALUE;

  return leftBandwidth - rightBandwidth;
};

/**
 * A comparator function to sort two playlist object by resolution (width).
 * @param {Object} left a media playlist object
 * @param {Object} right a media playlist object
 * @return {Number} Greater than zero if the resolution.width attribute of
 * left is greater than the corresponding attribute of right. Less
 * than zero if the resolution.width of right is greater than left and
 * exactly zero if the two are equal.
 */
Hls.comparePlaylistResolution = function (left, right) {
  var leftWidth = undefined;
  var rightWidth = undefined;

  if (left.attributes && left.attributes.RESOLUTION && left.attributes.RESOLUTION.width) {
    leftWidth = left.attributes.RESOLUTION.width;
  }

  leftWidth = leftWidth || _globalWindow2['default'].Number.MAX_VALUE;

  if (right.attributes && right.attributes.RESOLUTION && right.attributes.RESOLUTION.width) {
    rightWidth = right.attributes.RESOLUTION.width;
  }

  rightWidth = rightWidth || _globalWindow2['default'].Number.MAX_VALUE;

  // NOTE - Fallback to bandwidth sort as appropriate in cases where multiple renditions
  // have the same media dimensions/ resolution
  if (leftWidth === rightWidth && left.attributes.BANDWIDTH && right.attributes.BANDWIDTH) {
    return left.attributes.BANDWIDTH - right.attributes.BANDWIDTH;
  }
  return leftWidth - rightWidth;
};

HlsSourceHandler.canPlayType = function (type) {
  var mpegurlRE = /^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i;

  // favor native HLS support if it's available
  if (Hls.supportsNativeHls) {
    return false;
  }
  return mpegurlRE.test(type);
};

if (typeof _videoJs2['default'].MediaSource === 'undefined' || typeof _videoJs2['default'].URL === 'undefined') {
  _videoJs2['default'].MediaSource = _videojsContribMediaSources.MediaSource;
  _videoJs2['default'].URL = _videojsContribMediaSources.URL;
}

// register source handlers with the appropriate techs
if (_videojsContribMediaSources.MediaSource.supportsNativeMediaSources()) {
  _videoJs2['default'].getComponent('Html5').registerSourceHandler(HlsSourceHandler('html5'));
}
if (_globalWindow2['default'].Uint8Array) {
  _videoJs2['default'].getComponent('Flash').registerSourceHandler(HlsSourceHandler('flash'));
}

_videoJs2['default'].HlsHandler = HlsHandler;
_videoJs2['default'].HlsSourceHandler = HlsSourceHandler;
_videoJs2['default'].Hls = Hls;
_videoJs2['default'].m3u8 = _m3u8Parser2['default'];
_videoJs2['default'].registerComponent('Hls', Hls);
_videoJs2['default'].options.hls = _videoJs2['default'].options.hls || {};

module.exports = {
  Hls: Hls,
  HlsHandler: HlsHandler,
  HlsSourceHandler: HlsSourceHandler
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bin-utils":2,"./config":3,"./gap-skipper":4,"./master-playlist-controller":5,"./playlist":7,"./playlist-loader":6,"./rendition-mixin":9,"./xhr":14,"aes-decrypter":18,"global/document":21,"global/window":22,"m3u8-parser":59,"videojs-contrib-media-sources":93}]},{},[96])(96)
});