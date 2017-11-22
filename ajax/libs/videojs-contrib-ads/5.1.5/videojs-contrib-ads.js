/*
 * videojs-contrib-ads
 * @version 5.1.5
 * @copyright 2017 Brightcove, Inc.
 * @license Apache-2.0
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
	typeof define === 'function' && define.amd ? define(['video.js'], factory) :
	(global.videojsContribAds = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

var window_1 = win;

/*
The goal of this feature is to make player events work as an integrator would
expect despite the presense of ads. For example, an integrator would expect
an `ended` event to happen once the content is ended. If an `ended` event is sent
as a result of a preroll ending, that is a bug. The `redispatch` method should recognize
such `ended` events and prefix them so they are sent as `adended`, and so on with
all other player events.
*/

// Cancel an event.
// Video.js wraps native events. This technique stops propagation for the Video.js event
// (AKA player event or wrapper event) while native events continue propagating.
var cancelEvent = function cancelEvent(player, event) {
  event.isImmediatePropagationStopped = function () {
    return true;
  };
  event.cancelBubble = true;
  event.isPropagationStopped = function () {
    return true;
  };
};

// Redispatch an event with a prefix.
// Cancels the event, then sends a new event with the type of the original
// event with the given prefix added.
// The inclusion of the "state" property should be removed in a future
// major version update with instructions to migrate any code that relies on it.
// It is an implementation detail and relying on it creates fragility.
var prefixEvent = function prefixEvent(player, prefix, event) {
  cancelEvent(player, event);
  player.trigger({
    type: prefix + event.type,
    state: player.ads.state,
    originalEvent: event
  });
};

// Playing event
// Requirements:
// * Normal playing event when there is no preroll
// * No playing event before preroll
// * At least one playing event after preroll
// * A single adplaying event when an ad begins
var handlePlaying = function handlePlaying(player, event) {
  if (player.ads.isInAdMode()) {

    if (player.ads.isContentResuming()) {

      // Prefix playing event when switching back to content after postroll.
      if (player.ads._contentEnding) {
        prefixEvent(player, 'content', event);
      }

      // adplaying was already sent due to cancelContentPlay. Avoid sending another.
    } else if (player.ads._cancelledPlay) {
      cancelEvent(player, event);

      // Prefix all other playing events during ads.
    } else {
      prefixEvent(player, 'ad', event);
    }
  }
};

// Ended event
// Requirements:
// * A single ended event when there is no postroll
// * No ended event before postroll
// * A single ended event after postroll
var handleEnded = function handleEnded(player, event) {
  if (player.ads.isInAdMode()) {

    // The true ended event fired by plugin.js either after the postroll
    // or because there was no postroll.
    if (player.ads.isContentResuming()) {
      return;
    }

    // Prefix ended due to ad ending.
    prefixEvent(player, 'ad', event);
  } else {

    // Prefix ended due to content ending.
    prefixEvent(player, 'content', event);
  }
};

// handleLoadEvent is used for loadstart, loadeddata, and loadedmetadata
// Requirements:
// * Initial event is not prefixed
// * Event due to ad loading is prefixed
// * Event due to content source change is not prefixed
// * Event due to content resuming is prefixed
var handleLoadEvent = function handleLoadEvent(player, event) {

  // Initial event
  if (event.type === 'loadstart' && !player.ads._hasThereBeenALoadStartDuringPlayerLife || event.type === 'loadeddata' && !player.ads._hasThereBeenALoadedData || event.type === 'loadedmetadata' && !player.ads._hasThereBeenALoadedMetaData) {
    return;

    // Ad playing
  } else if (player.ads.isAdPlaying()) {
    prefixEvent(player, 'ad', event);

    // Source change
  } else if (player.currentSrc() !== player.ads.contentSrc) {
    return;

    // Content resuming
  } else {
    prefixEvent(player, 'content', event);
  }
};

// Play event
// Requirements:
// * Play events have the "ad" prefix when an ad is playing
// * Play events have the "content" prefix when content is resuming
// Play requests are unique because they represent user intention to play. They happen
// because the user clicked play, or someone called player.play(), etc. It could happen
// multiple times during ad loading, regardless of where we are in the process. With our
// current architecture, this will always cause the content to play. Therefor, contrib-ads
// must always cancelContentPlay if there is any possible chance the play caused the
// content to play, even if we are technically in ad mode. In order for that to happen,
// play events need to be unprefixed until the last possible moment. A better solution
// would be to have a way to intercept play events rather than "cancel" them by pausing
// after each one. To be continued...
var handlePlay = function handlePlay(player, event) {
  var resumingAfterNoPreroll = player.ads._cancelledPlay && !player.ads.isInAdMode();

  if (player.ads.isAdPlaying()) {
    prefixEvent(player, 'ad', event);
  } else if (player.ads.isContentResuming() || resumingAfterNoPreroll) {
    prefixEvent(player, 'content', event);
  }
};

// Handle a player event, either by redispatching it with a prefix, or by
// letting it go on its way without any meddling.
function redispatch(event) {

  // Events with special treatment
  if (event.type === 'playing') {
    handlePlaying(this, event);
  } else if (event.type === 'ended') {
    handleEnded(this, event);
  } else if (event.type === 'loadstart' || event.type === 'loadeddata' || event.type === 'loadedmetadata') {
    handleLoadEvent(this, event);
  } else if (event.type === 'play') {
    handlePlay(this, event);

    // Standard handling for all other events
  } else if (this.ads.isInAdMode()) {
    if (this.ads.isContentResuming()) {

      // Event came from snapshot restore after an ad, use "content" prefix
      prefixEvent(this, 'content', event);
    } else {

      // Event came from ad playback, use "ad" prefix
      prefixEvent(this, 'ad', event);
    }
  }
}

/*
The snapshot feature is responsible for saving the player state before an ad, then
restoring the player state after an ad.
*/

/*
 * Returns an object that captures the portions of player state relevant to
 * video playback. The result of this function can be passed to
 * restorePlayerSnapshot with a player to return the player to the state it
 * was in when this function was invoked.
 * @param {Object} player The videojs player object
 */
function getPlayerSnapshot(player) {
  var currentTime = void 0;

  if (videojs.browser.IS_IOS && player.ads.isLive(player)) {
    // Record how far behind live we are
    if (player.seekable().length > 0) {
      currentTime = player.currentTime() - player.seekable().end(0);
    } else {
      currentTime = player.currentTime();
    }
  } else {
    currentTime = player.currentTime();
  }

  var tech = player.$('.vjs-tech');
  var remoteTracks = player.remoteTextTracks ? player.remoteTextTracks() : [];
  var tracks = player.textTracks ? player.textTracks() : [];
  var suppressedRemoteTracks = [];
  var suppressedTracks = [];
  var snapshotObject = {
    ended: player.ended(),
    currentSrc: player.currentSrc(),
    src: player.tech_.src(),
    currentTime: currentTime,
    type: player.currentType()
  };

  if (tech) {
    snapshotObject.nativePoster = tech.poster;
    snapshotObject.style = tech.getAttribute('style');
  }

  for (var i = 0; i < remoteTracks.length; i++) {
    var track = remoteTracks[i];

    suppressedRemoteTracks.push({
      track: track,
      mode: track.mode
    });
    track.mode = 'disabled';
  }
  snapshotObject.suppressedRemoteTracks = suppressedRemoteTracks;

  for (var _i = 0; _i < tracks.length; _i++) {
    var _track = tracks[_i];

    suppressedTracks.push({
      track: _track,
      mode: _track.mode
    });
    _track.mode = 'disabled';
  }
  snapshotObject.suppressedTracks = suppressedTracks;

  return snapshotObject;
}

/*
 * Attempts to modify the specified player so that its state is equivalent to
 * the state of the snapshot.
 * @param {Object} player - the videojs player object
 * @param {Object} snapshotObject - the player state to apply
 */
function restorePlayerSnapshot(player, snapshotObject) {
  if (player.ads.disableNextSnapshotRestore === true) {
    player.ads.disableNextSnapshotRestore = false;
    return;
  }

  // The playback tech
  var tech = player.$('.vjs-tech');

  // the number of[ remaining attempts to restore the snapshot
  var attempts = 20;

  var suppressedRemoteTracks = snapshotObject.suppressedRemoteTracks;
  var suppressedTracks = snapshotObject.suppressedTracks;

  var trackSnapshot = void 0;
  var restoreTracks = function restoreTracks() {
    for (var i = 0; i < suppressedRemoteTracks.length; i++) {
      trackSnapshot = suppressedRemoteTracks[i];
      trackSnapshot.track.mode = trackSnapshot.mode;
    }

    for (var _i2 = 0; _i2 < suppressedTracks.length; _i2++) {
      trackSnapshot = suppressedTracks[_i2];
      trackSnapshot.track.mode = trackSnapshot.mode;
    }
  };

  // finish restoring the playback state
  var resume = function resume() {
    var currentTime = void 0;

    if (videojs.browser.IS_IOS && player.ads.isLive(player)) {
      if (snapshotObject.currentTime < 0) {
        // Playback was behind real time, so seek backwards to match
        if (player.seekable().length > 0) {
          currentTime = player.seekable().end(0) + snapshotObject.currentTime;
        } else {
          currentTime = player.currentTime();
        }
        player.currentTime(currentTime);
      }
    } else if (snapshotObject.ended) {
      player.currentTime(player.duration());
    } else {
      player.currentTime(snapshotObject.currentTime);
    }

    // Resume playback if this wasn't a postroll
    if (!snapshotObject.ended) {
      player.play();
    }

    // if we added autoplay to force content loading on iOS, remove it now
    // that it has served its purpose
    if (player.ads.shouldRemoveAutoplay_) {
      player.autoplay(false);
      player.ads.shouldRemoveAutoplay_ = false;
    }
  };

  // determine if the video element has loaded enough of the snapshot source
  // to be ready to apply the rest of the state
  var tryToResume = function tryToResume() {

    // tryToResume can either have been called through the `contentcanplay`
    // event or fired through setTimeout.
    // When tryToResume is called, we should make sure to clear out the other
    // way it could've been called by removing the listener and clearing out
    // the timeout.
    player.off('contentcanplay', tryToResume);
    if (player.ads.tryToResumeTimeout_) {
      player.clearTimeout(player.ads.tryToResumeTimeout_);
      player.ads.tryToResumeTimeout_ = null;
    }

    // Tech may have changed depending on the differences in sources of the
    // original video and that of the ad
    tech = player.el().querySelector('.vjs-tech');

    if (tech.readyState > 1) {
      // some browsers and media aren't "seekable".
      // readyState greater than 1 allows for seeking without exceptions
      return resume();
    }

    if (tech.seekable === undefined) {
      // if the tech doesn't expose the seekable time ranges, try to
      // resume playback immediately
      return resume();
    }

    if (tech.seekable.length > 0) {
      // if some period of the video is seekable, resume playback
      return resume();
    }

    // delay a bit and then check again unless we're out of attempts
    if (attempts--) {
      window_1.setTimeout(tryToResume, 50);
    } else {
      try {
        resume();
      } catch (e) {
        videojs.log.warn('Failed to resume the content after an advertisement', e);
      }
    }
  };

  if (snapshotObject.nativePoster) {
    tech.poster = snapshotObject.nativePoster;
  }

  if ('style' in snapshotObject) {
    // overwrite all css style properties to restore state precisely
    tech.setAttribute('style', snapshotObject.style || '');
  }

  // Determine whether the player needs to be restored to its state
  // before ad playback began. With a custom ad display or burned-in
  // ads, the content player state hasn't been modified and so no
  // restoration is required

  if (player.ads.videoElementRecycled()) {
    // on ios7, fiddling with textTracks too early will cause safari to crash
    player.one('contentloadedmetadata', restoreTracks);

    // adding autoplay guarantees that Safari will load the content so we can
    // seek back to the correct time after ads
    if (videojs.browser.IS_IOS && !player.autoplay()) {
      player.autoplay(true);

      // if we get here, the player was not originally configured to autoplay,
      // so we should remove it after it has served its purpose
      player.ads.shouldRemoveAutoplay_ = true;
    }

    // if the src changed for ad playback, reset it
    player.src({ src: snapshotObject.currentSrc, type: snapshotObject.type });

    // and then resume from the snapshots time once the original src has loaded
    // in some browsers (firefox) `canplay` may not fire correctly.
    // Reace the `canplay` event with a timeout.
    player.one('contentcanplay', tryToResume);
    player.ads.tryToResumeTimeout_ = player.setTimeout(tryToResume, 2000);
  } else if (!player.ended() || !snapshotObject.ended) {
    // if we didn't change the src, just restore the tracks
    restoreTracks();
    // the src didn't change and this wasn't a postroll
    // just resume playback at the current time.
    player.play();
  }
}

/*
This feature sends a `contentupdate` event when the player source changes.
*/

// Start sending contentupdate events
function initializeContentupdate(player) {

  // Keep track of the current content source
  // If you want to change the src of the video without triggering
  // the ad workflow to restart, you can update this variable before
  // modifying the player's source
  player.ads.contentSrc = player.currentSrc();

  // Check if a new src has been set, if so, trigger contentupdate
  var checkSrc = function checkSrc() {
    if (player.ads.state !== 'ad-playback') {
      var src = player.currentSrc();

      if (src !== player.ads.contentSrc) {
        player.trigger({
          type: 'contentupdate',
          oldValue: player.ads.contentSrc,
          newValue: src
        });
        player.ads.contentSrc = src;
      }
    }
  };

  // loadstart reliably indicates a new src has been set
  player.on('loadstart', checkSrc);
  // check immediately in case we missed the loadstart
  window_1.setTimeout(checkSrc, 1);
}

/*
This feature makes sure the player is paused during ad loading.

It does this by pausing the player immediately after a "play" where ads will be requested,
then signalling that we should play after the ad is done.
*/

function cancelContentPlay(player) {
  if (player.ads.cancelPlayTimeout) {
    // another cancellation is already in flight, so do nothing
    return;
  }

  // The timeout is necessary because pausing a video element while processing a `play`
  // event on iOS can cause the video element to continuously toggle between playing and
  // paused states.
  player.ads.cancelPlayTimeout = window_1.setTimeout(function () {
    // deregister the cancel timeout so subsequent cancels are scheduled
    player.ads.cancelPlayTimeout = null;

    // pause playback so ads can be handled.
    if (!player.paused()) {
      player.pause();
    }

    // When the 'content-playback' state is entered, this will let us know to play.
    // This is needed if there is no preroll or if it errors, times out, etc.
    player.ads._cancelledPlay = true;
  }, 1);
}

var empty = {};


var empty$1 = (Object.freeze || Object)({
	'default': empty
});

var minDoc = ( empty$1 && empty ) || empty$1;

var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
    typeof window !== 'undefined' ? window : {};


var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

var document_1 = doccy;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
This feature provides an optional method for ad integrations to insert run-time values
into an ad server URL or configuration.
*/

// Return URI encoded version of value if uriEncode is true
var uriEncodeIfNeeded = function uriEncodeIfNeeded(value, uriEncode) {
  if (uriEncode) {
    return encodeURIComponent(value);
  }
  return value;
};

// Add custom field macros to macros object
// based on given name for custom fields property of mediainfo object.
var customFields = function customFields(mediainfo, macros, customFieldsName) {
  if (mediainfo && mediainfo[customFieldsName]) {
    var fields = mediainfo[customFieldsName];
    var fieldNames = Object.keys(fields);

    for (var i = 0; i < fieldNames.length; i++) {
      var tag = '{mediainfo.' + customFieldsName + '.' + fieldNames[i] + '}';

      macros[tag] = fields[fieldNames[i]];
    }
  }
};

// Public method that integrations use for ad macros.
// "string" is any string with macros to be replaced
// "uriEncode" if true will uri encode macro values when replaced
// "customMacros" is a object with custom macros and values to map them to
//  - For example: {'{five}': 5}
// Return value is is "string" with macros replaced
//  - For example: adMacroReplacement('{player.id}') returns a string of the player id
function adMacroReplacement(string, uriEncode, customMacros) {

  if (uriEncode === undefined) {
    uriEncode = false;
  }

  var macros = {};

  if (customMacros !== undefined) {
    macros = customMacros;
  }

  // Static macros
  macros['{player.id}'] = this.options_['data-player'];
  macros['{mediainfo.id}'] = this.mediainfo ? this.mediainfo.id : '';
  macros['{mediainfo.name}'] = this.mediainfo ? this.mediainfo.name : '';
  macros['{mediainfo.description}'] = this.mediainfo ? this.mediainfo.description : '';
  macros['{mediainfo.tags}'] = this.mediainfo ? this.mediainfo.tags : '';
  macros['{mediainfo.reference_id}'] = this.mediainfo ? this.mediainfo.reference_id : '';
  macros['{mediainfo.duration}'] = this.mediainfo ? this.mediainfo.duration : '';
  macros['{mediainfo.ad_keys}'] = this.mediainfo ? this.mediainfo.ad_keys : '';
  macros['{player.duration}'] = this.duration();
  macros['{timestamp}'] = new Date().getTime();
  macros['{document.referrer}'] = document_1.referrer;
  macros['{window.location.href}'] = window_1.location.href;
  macros['{random}'] = Math.floor(Math.random() * 1000000000000);

  // Custom fields in mediainfo
  customFields(this.mediainfo, macros, 'custom_fields');
  customFields(this.mediainfo, macros, 'customFields');

  // Go through all the replacement macros and apply them to the string.
  // This will replace all occurrences of the replacement macros.
  for (var i in macros) {
    string = string.split(i).join(uriEncodeIfNeeded(macros[i], uriEncode));
  }

  // Page variables
  string = string.replace(/{pageVariable\.([^}]+)}/g, function (match, name) {
    var value = void 0;
    var context = window_1;
    var names = name.split('.');

    // Iterate down multiple levels of selector without using eval
    // This makes things like pageVariable.foo.bar work
    for (var _i = 0; _i < names.length; _i++) {
      if (_i === names.length - 1) {
        value = context[names[_i]];
      } else {
        context = context[names[_i]];
      }
    }

    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

    // Only allow certain types of values. Anything else is probably a mistake.
    if (value === null) {
      return 'null';
    } else if (value === undefined) {
      videojs.log.warn('Page variable "' + name + '" not found');
      return '';
    } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
      videojs.log.warn('Page variable "' + name + '" is not a supported type');
      return '';
    }

    return uriEncodeIfNeeded(String(value), uriEncode);
  });

  return string;
}

/*
* This feature allows metadata text tracks to be manipulated once available
* @see processMetadataTracks.
* It also allows ad implementations to leverage ad cues coming through
* text tracks, @see processAdTrack
**/

var cueTextTracks = {};

/*
* This feature allows metadata text tracks to be manipulated once they are available,
* usually after the 'loadstart' event is observed on the player
* @param player A reference to a player
* @param processMetadataTrack A callback that performs some operations on a
* metadata text track
**/
cueTextTracks.processMetadataTracks = function (player, processMetadataTrack) {
  var tracks = player.textTracks();
  var setModeAndProcess = function setModeAndProcess(track) {
    if (track.kind === 'metadata') {
      player.ads.cueTextTracks.setMetadataTrackMode(track);
      processMetadataTrack(player, track);
    }
  };

  // Text tracks are available
  for (var i = 0; i < tracks.length; i++) {
    setModeAndProcess(tracks[i]);
  }

  // Wait until text tracks are added
  tracks.addEventListener('addtrack', function (event) {
    setModeAndProcess(event.track);
  });
};

/*
* Sets the track mode to one of 'disabled', 'hidden' or 'showing'
* @see https://github.com/videojs/video.js/blob/master/docs/guides/text-tracks.md
* Default behavior is to do nothing, @override if this is not desired
* @param track The text track to set the mode on
*/
cueTextTracks.setMetadataTrackMode = function (track) {
  return;
};

/*
* Determines whether cue is an ad cue and returns the cue data.
* @param player A reference to the player
* @param cue The full cue object
* Returns the given cue by default @override if futher processing is required
* @return {Object} a useable ad cue or null if not supported
**/
cueTextTracks.getSupportedAdCue = function (player, cue) {
  return cue;
};

/*
* Defines whether a cue is supported or not, potentially
* based on the player settings
* @param player A reference to the player
* @param cue The cue to be checked
* Default behavior is to return true, @override if this is not desired
* @return {Boolean}
*/
cueTextTracks.isSupportedAdCue = function (player, cue) {
  return true;
};

/*
* Gets the id associated with a cue.
* @param cue The cue to extract an ID from
* @returns The first occurance of 'id' in the object,
* @override if this is not the desired cue id
**/
cueTextTracks.getCueId = function (player, cue) {
  return cue.id;
};

/*
* Checks whether a cue has already been used
* @param cueId The Id associated with a cue
**/
var cueAlreadySeen = function cueAlreadySeen(player, cueId) {
  return cueId !== undefined && player.ads.includedCues[cueId];
};

/*
* Indicates that a cue has been used
* @param cueId The Id associated with a cue
**/
var setCueAlreadySeen = function setCueAlreadySeen(player, cueId) {
  if (cueId !== undefined && cueId !== '') {
    player.ads.includedCues[cueId] = true;
  }
};

/*
* This feature allows ad metadata tracks to be manipulated in ad implementations
* @param player A reference to the player
* @param cues The set of cues to work with
* @param processCue A method that uses a cue to make some
* ad request in the ad implementation
* @param [cancelAdsHandler] A method that dynamically cancels ads in the ad implementation
**/
cueTextTracks.processAdTrack = function (player, cues, processCue, cancelAdsHandler) {
  player.ads.includedCues = {};

  // loop over set of cues
  for (var i = 0; i < cues.length; i++) {
    var cue = cues[i];
    var cueData = this.getSupportedAdCue(player, cue);

    // Exit if this is not a supported cue
    if (!this.isSupportedAdCue(player, cue)) {
      videojs.log.warn('Skipping as this is not a supported ad cue.', cue);
      return;
    }

    // Continue processing supported cue
    var cueId = this.getCueId(player, cue);
    var startTime = cue.startTime;

    // Skip ad if cue was already used
    if (cueAlreadySeen(player, cueId)) {
      videojs.log('Skipping ad already seen with ID ' + cueId);
      return;
    }

    // Optional dynamic ad cancellation
    if (cancelAdsHandler) {
      cancelAdsHandler(player, cueData, cueId, startTime);
    }

    // Process cue as an ad cue
    processCue(player, cueData, cueId, startTime);

    // Indicate that this cue has been used
    setCueAlreadySeen(player, cueId);
  }
};

/*
This main plugin file is responsible for integration logic and enabling the features
that live in in separate files.
*/

var VIDEO_EVENTS = videojs.getTech('Html5').Events;

/*
 * Remove the poster attribute from the video element tech, if present. When
 * reusing a video element for multiple videos, the poster image will briefly
 * reappear while the new source loads. Removing the attribute ahead of time
 * prevents the poster from showing up between videos.
 *
 * @param {Object} player The videojs player object
 */
var removeNativePoster = function removeNativePoster(player) {
  var tech = player.$('.vjs-tech');

  if (tech) {
    tech.removeAttribute('poster');
  }
};

// ---------------------------------------------------------------------------
// Ad Framework
// ---------------------------------------------------------------------------

// default framework settings
var defaults = {
  // maximum amount of time in ms to wait to receive `adsready` from the ad
  // implementation after play has been requested. Ad implementations are
  // expected to load any dynamic libraries and make any requests to determine
  // ad policies for a video during this time.
  timeout: 5000,

  // maximum amount of time in ms to wait for the ad implementation to start
  // linear ad mode after `readyforpreroll` has fired. This is in addition to
  // the standard timeout.
  prerollTimeout: 100,

  // maximum amount of time in ms to wait for the ad implementation to start
  // linear ad mode after `contentended` has fired.
  postrollTimeout: 100,

  // when truthy, instructs the plugin to output additional information about
  // plugin state to the video.js log. On most devices, the video.js log is
  // the same as the developer console.
  debug: false,

  // set this to true when using ads that are part of the content video
  stitchedAds: false
};

var contribAdsPlugin = function contribAdsPlugin(options) {

  var player = this; // eslint-disable-line consistent-this

  var settings = videojs.mergeOptions(defaults, options);

  // prefix all video element events during ad playback
  // if the video element emits ad-related events directly,
  // plugins that aren't ad-aware will break. prefixing allows
  // plugins that wish to handle ad events to do so while
  // avoiding the complexity for common usage
  var videoEvents = VIDEO_EVENTS.concat(['firstplay', 'loadedalldata', 'playing']);

  // Set up redispatching of player events
  player.on(videoEvents, redispatch);

  // If we haven't seen a loadstart after 5 seconds, the plugin was not initialized
  // correctly.
  window_1.setTimeout(function () {
    if (!player.ads._hasThereBeenALoadStartDuringPlayerLife && player.src() !== '') {
      videojs.log.error('videojs-contrib-ads has not seen a loadstart event 5 seconds ' + 'after being initialized, but a source is present. This indicates that ' + 'videojs-contrib-ads was initialized too late. It must be initialized ' + 'immediately after video.js in the same tick. As a result, some ads will not ' + 'play and some media events will be incorrect. For more information, see ' + 'https://github.com/videojs/videojs-contrib-ads#important-note-about-initialization');
    }
  }, 5000);

  // "vjs-has-started" should be present at the end of a video. This makes sure it's
  // always there.
  player.on('ended', function () {
    if (!player.hasClass('vjs-has-started')) {
      player.addClass('vjs-has-started');
    }
  });

  // We now auto-play when an ad gets loaded if we're playing ads in the same video
  // element as the content.
  // The problem is that in IE11, we cannot play in addurationchange but in iOS8, we
  // cannot play from adcanplay.
  // This will prevent ad-integrations from needing to do this themselves.
  player.on(['addurationchange', 'adcanplay'], function () {
    if (player.ads.snapshot && player.currentSrc() === player.ads.snapshot.currentSrc) {
      return;
    }

    // If an ad isn't playing, don't try to play an ad. This could result from prefixed
    // events when the player is blocked by a preroll check, but there is no preroll.
    if (!player.ads.isAdPlaying()) {
      return;
    }

    player.play();
  });

  player.on('nopreroll', function () {
    player.ads.nopreroll_ = true;
  });

  player.on('nopostroll', function () {
    player.ads.nopostroll_ = true;
  });

  // Remove ad-loading class when ad plays or when content plays (in case there was no ad)
  // If you remove this class too soon you can get a flash of content!
  player.on(['ads-ad-started', 'playing'], function () {
    player.removeClass('vjs-ad-loading');
  });

  // Restart the cancelContentPlay process.
  player.on('playing', function () {
    player.ads._cancelledPlay = false;
  });

  player.one('loadstart', function () {
    player.ads._hasThereBeenALoadStartDuringPlayerLife = true;
  });

  player.on('loadeddata', function () {
    player.ads._hasThereBeenALoadedData = true;
  });

  player.on('loadedmetadata', function () {
    player.ads._hasThereBeenALoadedMetaData = true;
  });

  // Replace the plugin constructor with the ad namespace
  player.ads = {
    state: 'content-set',
    disableNextSnapshotRestore: false,

    // This is true if we have finished actual content playback but haven't
    // dealt with postrolls and officially ended yet
    _contentEnding: false,

    // This is set to true if the content has officially ended at least once.
    // After that, the user can seek backwards and replay content, but _contentHasEnded
    // remains true.
    _contentHasEnded: false,

    // Tracks if loadstart has happened yet for the initial source. It is not reset
    // on source changes because loadstart is the event that signals to the ad plugin
    // that the source has changed. Therefore, no special signaling is needed to know
    // that there has been one for subsequent sources.
    _hasThereBeenALoadStartDuringPlayerLife: false,

    // Tracks if loadeddata has happened yet for the current source.
    _hasThereBeenALoadedData: false,

    // Tracks if loadedmetadata has happened yet for the current source.
    _hasThereBeenALoadedMetaData: false,

    // Are we after startLinearAdMode and before endLinearAdMode?
    _inLinearAdMode: false,

    // This is an estimation of the current ad type being played
    // This is experimental currently. Do not rely on its presence or behavior!
    adType: null,

    VERSION: '__VERSION__',

    // TODO reset state to content-set here instead of in every contentupdate case
    reset: function reset() {
      player.ads.disableNextSnapshotRestore = false;
      player.ads._contentEnding = false;
      player.ads._contentHasEnded = false;
      player.ads.snapshot = null;
      player.ads.adType = null;
      player.ads._hasThereBeenALoadedData = false;
      player.ads._hasThereBeenALoadedMetaData = false;
      player.ads._cancelledPlay = false;
    },


    // Call this when an ad response has been received and there are
    // linear ads ready to be played.
    startLinearAdMode: function startLinearAdMode() {
      if (player.ads.state === 'preroll?' || player.ads.state === 'content-playback' || player.ads.state === 'postroll?') {
        player.ads._inLinearAdMode = true;
        player.trigger('adstart');
      }
    },


    // Call this when a linear ad pod has finished playing.
    endLinearAdMode: function endLinearAdMode() {
      if (player.ads.state === 'ad-playback') {
        player.ads._inLinearAdMode = false;
        player.trigger('adend');
        // In the case of an empty ad response, we want to make sure that
        // the vjs-ad-loading class is always removed. We could probably check for
        // duration on adPlayer for an empty ad but we remove it here just to make sure
        player.removeClass('vjs-ad-loading');
      }
    },


    // Call this when an ad response has been received but there are no
    // linear ads to be played (i.e. no ads available, or overlays).
    // This has no effect if we are already in a linear ad mode.  Always
    // use endLinearAdMode() to exit from linear ad-playback state.
    skipLinearAdMode: function skipLinearAdMode() {
      if (player.ads.state !== 'ad-playback') {
        player.trigger('adskip');
      }
    },
    stitchedAds: function stitchedAds(arg) {
      if (arg !== undefined) {
        this._stitchedAds = !!arg;
      }
      return this._stitchedAds;
    },


    // Returns whether the video element has been modified since the
    // snapshot was taken.
    // We test both src and currentSrc because changing the src attribute to a URL that
    // AdBlocker is intercepting doesn't update currentSrc.
    videoElementRecycled: function videoElementRecycled() {
      if (player.ads.shouldPlayContentBehindAd(player)) {
        return false;
      }

      if (!this.snapshot) {
        throw new Error('You cannot use videoElementRecycled while there is no snapshot.');
      }

      var srcChanged = player.tech_.src() !== this.snapshot.src;
      var currentSrcChanged = player.currentSrc() !== this.snapshot.currentSrc;

      return srcChanged || currentSrcChanged;
    },


    // Returns a boolean indicating if given player is in live mode.
    // Can be replaced when this is fixed: https://github.com/videojs/video.js/issues/3262
    isLive: function isLive(somePlayer) {
      if (somePlayer.duration() === Infinity) {
        return true;
      } else if (videojs.browser.IOS_VERSION === '8' && somePlayer.duration() === 0) {
        return true;
      }
      return false;
    },


    // Return true if content playback should mute and continue during ad breaks.
    // This is only done during live streams on platforms where it's supported.
    // This improves speed and accuracy when returning from an ad break.
    shouldPlayContentBehindAd: function shouldPlayContentBehindAd(somePlayer) {
      return !videojs.browser.IS_IOS && !videojs.browser.IS_ANDROID && somePlayer.duration() === Infinity;
    },


    // Returns true if player is in ad mode.
    //
    // Ad mode definition:
    // If content playback is blocked by the ad plugin.
    //
    // Examples of ad mode:
    //
    // * Waiting to find out if an ad is going to play while content would normally be
    //   playing.
    // * Waiting for an ad to start playing while content would normally be playing.
    // * An ad is playing (even if content is also playing)
    // * An ad has completed and content is about to resume, but content has not resumed
    //   yet.
    //
    // Examples of not ad mode:
    //
    // * Content playback has not been requested
    // * Content playback is paused
    // * An asynchronous ad request is ongoing while content is playing
    // * A non-linear ad is active
    isInAdMode: function isInAdMode() {

      // Saw "play" but not "adsready"
      return player.ads.state === 'ads-ready?' ||

      // Waiting to learn about preroll
      player.ads.state === 'preroll?' ||

      // A linear ad is active
      player.ads.state === 'ad-playback' ||

      // Content is not playing again yet
      player.ads.state === 'content-resuming';
    },


    // Returns true if content is resuming after an ad. This is part of ad mode.
    isContentResuming: function isContentResuming() {
      return player.ads.state === 'content-resuming';
    },


    // Returns true if a linear ad is playing. This is part of ad mode.
    // This relies on startLinearAdMode and endLinearAdMode because that is the
    // most authoritative way of determinining if an ad is playing.
    isAdPlaying: function isAdPlaying() {
      return this._inLinearAdMode;
    }
  };

  player.ads.stitchedAds(settings.stitchedAds);

  player.ads.cueTextTracks = cueTextTracks;
  player.ads.adMacroReplacement = adMacroReplacement.bind(player);

  // Start sending contentupdate events for this player
  initializeContentupdate(player);

  // Global contentupdate handler for resetting plugin state
  player.on('contentupdate', player.ads.reset);

  // Ad Playback State Machine
  var states = {
    'content-set': {
      events: {
        adscanceled: function adscanceled() {
          this.state = 'content-playback';
        },
        adsready: function adsready() {
          this.state = 'ads-ready';
        },
        play: function play() {
          this.state = 'ads-ready?';
          cancelContentPlay(player);
          // remove the poster so it doesn't flash between videos
          removeNativePoster(player);
        },
        adserror: function adserror() {
          this.state = 'content-playback';
        },
        adskip: function adskip() {
          this.state = 'content-playback';
        }
      }
    },
    'ads-ready': {
      events: {
        play: function play() {
          this.state = 'preroll?';
          cancelContentPlay(player);
        },
        adskip: function adskip() {
          this.state = 'content-playback';
        },
        adserror: function adserror() {
          this.state = 'content-playback';
        }
      }
    },
    'preroll?': {
      enter: function enter() {
        if (player.ads.nopreroll_) {
          // This will start the ads manager in case there are later ads
          player.trigger('readyforpreroll');

          // If we don't wait a tick, entering content-playback will cancel
          // cancelPlayTimeout, causing the video to not pause for the ad
          window_1.setTimeout(function () {
            // Don't wait for a preroll
            player.trigger('nopreroll');
          }, 1);
        } else {
          // Change class to show that we're waiting on ads
          player.addClass('vjs-ad-loading');
          // Schedule an adtimeout event to fire if we waited too long
          player.ads.adTimeoutTimeout = window_1.setTimeout(function () {
            player.trigger('adtimeout');
          }, settings.prerollTimeout);

          // Signal to ad plugin that it's their opportunity to play a preroll
          if (player.ads._hasThereBeenALoadStartDuringPlayerLife) {
            player.trigger('readyforpreroll');

            // Don't play preroll before loadstart, otherwise the content loadstart event
            // will get misconstrued as an ad loadstart. This is only a concern for the
            // initial source; for source changes the whole ad process is kicked off by
            // loadstart so it has to have happened already.
          } else {
            player.one('loadstart', function () {
              player.trigger('readyforpreroll');
            });
          }
        }
      },
      leave: function leave() {
        window_1.clearTimeout(player.ads.adTimeoutTimeout);
      },

      events: {
        play: function play() {
          cancelContentPlay(player);
        },
        adstart: function adstart() {
          this.state = 'ad-playback';
          player.ads.adType = 'preroll';
        },
        adskip: function adskip() {
          this.state = 'content-playback';
        },
        adtimeout: function adtimeout() {
          this.state = 'content-playback';
        },
        adserror: function adserror() {
          this.state = 'content-playback';
        },
        nopreroll: function nopreroll() {
          this.state = 'content-playback';
        }
      }
    },
    'ads-ready?': {
      enter: function enter() {
        player.addClass('vjs-ad-loading');
        player.ads.adTimeoutTimeout = window_1.setTimeout(function () {
          player.trigger('adtimeout');
        }, settings.timeout);
      },
      leave: function leave() {
        window_1.clearTimeout(player.ads.adTimeoutTimeout);
        player.removeClass('vjs-ad-loading');
      },

      events: {
        play: function play() {
          cancelContentPlay(player);
        },
        adscanceled: function adscanceled() {
          this.state = 'content-playback';
        },
        adsready: function adsready() {
          this.state = 'preroll?';
        },
        adskip: function adskip() {
          this.state = 'content-playback';
        },
        adtimeout: function adtimeout() {
          this.state = 'content-playback';
        },
        adserror: function adserror() {
          this.state = 'content-playback';
        }
      }
    },
    'ad-playback': {
      enter: function enter() {
        // capture current player state snapshot (playing, currentTime, src)
        if (!player.ads.shouldPlayContentBehindAd(player)) {
          this.snapshot = getPlayerSnapshot(player);
        }

        // Mute the player behind the ad
        if (player.ads.shouldPlayContentBehindAd(player)) {
          this.preAdVolume_ = player.volume();
          player.volume(0);
        }

        // add css to the element to indicate and ad is playing.
        player.addClass('vjs-ad-playing');

        // We should remove the vjs-live class if it has been added in order to
        // show the adprogress control bar on Android devices for falsely
        // determined LIVE videos due to the duration incorrectly reported as Infinity
        if (player.hasClass('vjs-live')) {
          player.removeClass('vjs-live');
        }

        // remove the poster so it doesn't flash between ads
        removeNativePoster(player);

        // We no longer need to supress play events once an ad is playing.
        // Clear it if we were.
        if (player.ads.cancelPlayTimeout) {
          // If we don't wait a tick, we could cancel the pause for cancelContentPlay,
          // resulting in content playback behind the ad
          window_1.setTimeout(function () {
            window_1.clearTimeout(player.ads.cancelPlayTimeout);
            player.ads.cancelPlayTimeout = null;
          }, 1);
        }
      },
      leave: function leave() {
        player.removeClass('vjs-ad-playing');

        // We should add the vjs-live class back if the video is a LIVE video
        // If we dont do this, then for a LIVE Video, we will get an incorrect
        // styled control, which displays the time for the video
        if (player.ads.isLive(player)) {
          player.addClass('vjs-live');
        }
        if (!player.ads.shouldPlayContentBehindAd(player)) {
          restorePlayerSnapshot(player, this.snapshot);
        }

        // Reset the volume to pre-ad levels
        if (player.ads.shouldPlayContentBehindAd(player)) {
          player.volume(this.preAdVolume_);
        }
      },

      events: {
        adend: function adend() {
          this.state = 'content-resuming';
          player.ads.adType = null;
        },
        adserror: function adserror() {
          player.ads.endLinearAdMode();
        }
      }
    },
    'content-resuming': {
      enter: function enter() {
        if (this._contentHasEnded) {
          window_1.clearTimeout(player.ads._fireEndedTimeout);
          // in some cases, ads are played in a swf or another video element
          // so we do not get an ended event in this state automatically.
          // If we don't get an ended event we can use, we need to trigger
          // one ourselves or else we won't actually ever end the current video.
          player.ads._fireEndedTimeout = window_1.setTimeout(function () {
            player.trigger('ended');
          }, 1000);
        }
      },
      leave: function leave() {
        window_1.clearTimeout(player.ads._fireEndedTimeout);
      },

      events: {
        contentupdate: function contentupdate() {
          this.state = 'content-set';
        },


        // This is for stitched ads only.
        contentresumed: function contentresumed() {
          this.state = 'content-playback';
        },
        playing: function playing() {
          this.state = 'content-playback';
        },
        ended: function ended() {
          this.state = 'content-playback';
        }
      }
    },
    'postroll?': {
      enter: function enter() {
        player.ads._contentEnding = true;
        this.snapshot = getPlayerSnapshot(player);
        if (player.ads.nopostroll_) {
          window_1.setTimeout(function () {
            // content-resuming happens after the timeout for backward-compatibility
            // with plugins that relied on a postrollTimeout before nopostroll was
            // implemented
            player.ads.state = 'content-resuming';
            player.trigger('ended');
          }, 1);
        } else {
          player.addClass('vjs-ad-loading');

          player.ads.adTimeoutTimeout = window_1.setTimeout(function () {
            player.trigger('adtimeout');
          }, settings.postrollTimeout);
        }
      },
      leave: function leave() {
        window_1.clearTimeout(player.ads.adTimeoutTimeout);
        player.removeClass('vjs-ad-loading');
      },

      events: {
        adstart: function adstart() {
          this.state = 'ad-playback';
          player.ads.adType = 'postroll';
        },
        adskip: function adskip() {
          this.state = 'content-resuming';
          window_1.setTimeout(function () {
            player.trigger('ended');
          }, 1);
        },
        adtimeout: function adtimeout() {
          this.state = 'content-resuming';
          window_1.setTimeout(function () {
            player.trigger('ended');
          }, 1);
        },
        adserror: function adserror() {
          this.state = 'content-resuming';
          window_1.setTimeout(function () {
            player.trigger('ended');
          }, 1);
        },
        contentupdate: function contentupdate() {
          this.state = 'ads-ready?';
        }
      }
    },
    'content-playback': {
      enter: function enter() {
        // make sure that any cancelPlayTimeout is cleared
        if (player.ads.cancelPlayTimeout) {
          window_1.clearTimeout(player.ads.cancelPlayTimeout);
          player.ads.cancelPlayTimeout = null;
        }

        // This was removed because now that "playing" is fixed to only play after
        // preroll, any integration should just use the "playing" event. However,
        // we found out some 3rd party code relied on this event, so we've temporarily
        // added it back in to give people more time to update their code.
        player.trigger({
          type: 'contentplayback',
          triggerevent: player.ads.triggerevent
        });

        // Play the content if cancelContentPlay happened and we haven't played yet.
        // This happens if there was no preroll or if it errored, timed out, etc.
        // Otherwise snapshot restore would play.
        if (player.ads._cancelledPlay) {
          if (player.paused()) {
            player.play();
          }
        }
      },

      events: {
        // In the case of a timeout, adsready might come in late.
        // This assumes the behavior that if an ad times out, it could still
        // interrupt the content and start playing. An integration could
        // still decide to behave otherwise.
        adsready: function adsready() {
          player.trigger('readyforpreroll');
        },
        adstart: function adstart() {
          this.state = 'ad-playback';
          // This is a special case in which preroll is specifically set
          if (player.ads.adType !== 'preroll') {
            player.ads.adType = 'midroll';
          }
        },
        contentupdate: function contentupdate() {
          if (player.paused()) {
            this.state = 'content-set';
          } else {
            this.state = 'ads-ready?';
          }
        },
        contentended: function contentended() {

          // If _contentHasEnded is true it means we already checked for postrolls and
          // played postrolls if needed, so now we're ready to send an ended event
          if (this._contentHasEnded) {
            // Causes ended event to trigger in content-resuming.enter.
            // From there, the ended event event is not redispatched.
            // Then we end up back in content-playback state.
            this.state = 'content-resuming';
            return;
          }

          this._contentEnding = false;
          this._contentHasEnded = true;
          this.state = 'postroll?';
        }
      }
    }
  };

  var processEvent = function processEvent(event) {

    var state = player.ads.state;

    // Execute the current state's handler for this event
    var eventHandlers = states[state].events;

    if (eventHandlers) {
      var handler = eventHandlers[event.type];

      if (handler) {
        handler.apply(player.ads);
      }
    }

    // If the state has changed...
    if (state !== player.ads.state) {
      var previousState = state;
      var newState = player.ads.state;

      // Record the event that caused the state transition
      player.ads.triggerevent = event.type;

      // Execute "leave" method for the previous state
      if (states[previousState].leave) {
        states[previousState].leave.apply(player.ads);
      }

      // Execute "enter" method for the new state
      if (states[newState].enter) {
        states[newState].enter.apply(player.ads);
      }

      // Debug log message for state changes
      if (settings.debug) {
        videojs.log('ads', player.ads.triggerevent + ' triggered: ' + previousState + ' -> ' + newState);
      }
    }
  };

  // A utility method for textTrackChangeHandler to define the conditions
  // when text tracks should be disabled.
  // Currently this includes:
  //  - on iOS with native text tracks, during an ad playing
  var shouldDisableTracks = function shouldDisableTracks() {
    // If the platform matches iOS with native text tracks
    // and this occurs during ad playback, we should disable tracks again.
    // If shouldPlayContentBehindAd, no special handling is needed.
    return !player.ads.shouldPlayContentBehindAd(player) && player.ads.isAdPlaying() && player.tech_.featuresNativeTextTracks && videojs.browser.IS_IOS &&
    // older versions of video.js did not use an emulated textTrackList
    !Array.isArray(player.textTracks());
  };

  /*
   * iOS Safari will change caption mode to 'showing' if a user previously
   * turned captions on manually for that video source, so this TextTrackList
   * 'change' event handler will re-disable them in case that occurs during ad playback
   */
  var textTrackChangeHandler = function textTrackChangeHandler() {
    var textTrackList = player.textTracks();

    if (shouldDisableTracks()) {
      // We must double check all tracks
      for (var i = 0; i < textTrackList.length; i++) {
        var track = textTrackList[i];

        if (track.mode === 'showing') {
          track.mode = 'disabled';
        }
      }
    }
  };

  // Add the listener to the text track list
  player.ready(function () {
    player.textTracks().addEventListener('change', textTrackChangeHandler);
  });

  // Register our handler for the events that the state machine will process
  player.on(VIDEO_EVENTS.concat([
  // Events emitted by this plugin
  'adtimeout', 'contentupdate', 'contentplaying', 'contentended', 'contentresumed',
  // Triggered by startLinearAdMode()
  'adstart',
  // Triggered by endLinearAdMode()
  'adend',
  // Triggered by skipLinearAdMode()
  'adskip',

  // Events emitted by integrations
  'adsready', 'adserror', 'adscanceled', 'nopreroll']), processEvent);

  // Clear timeouts and handlers when player is disposed
  player.on('dispose', function () {
    if (player.ads.adTimeoutTimeout) {
      window_1.clearTimeout(player.ads.adTimeoutTimeout);
    }

    if (player.ads._fireEndedTimeout) {
      window_1.clearTimeout(player.ads._fireEndedTimeout);
    }

    if (player.ads.cancelPlayTimeout) {
      window_1.clearTimeout(player.ads.cancelPlayTimeout);
    }

    if (player.ads.tryToResumeTimeout_) {
      player.clearTimeout(player.ads.tryToResumeTimeout_);
    }

    player.textTracks().removeEventListener('change', textTrackChangeHandler);
  });

  // If we're autoplaying, the state machine will immidiately process
  // a synthetic play event
  if (!player.paused()) {
    processEvent({ type: 'play' });
  }
};

var registerPlugin = videojs.registerPlugin || videojs.plugin;

// Register this plugin with videojs
registerPlugin('ads', contribAdsPlugin);

return contribAdsPlugin;

})));
