/**
 * videojs-contrib-ads
 * @version 4.0.0-0
 * @copyright 2016 Brightcove
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsContribAds = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
This feature makes sure the player is paused during ad loading.

It does this by pausing the player immediately after a "play" where ads will be requested,
then signalling that we should play after the ad is done.
*/

var cancelContentPlay = function cancelContentPlay(player) {
  if (player.ads.cancelPlayTimeout) {
    // another cancellation is already in flight, so do nothing
    return;
  }

  // Avoid content flash on non-iPad iOS
  if (videojs.browser.IS_IOS) {
    (function () {

      var width = player.currentWidth ? player.currentWidth() : player.width();
      var height = player.currentHeight ? player.currentHeight() : player.height();

      // A placeholder black box will be shown in the document while the player is hidden.
      var placeholder = document.createElement('div');

      placeholder.style.width = width + 'px';
      placeholder.style.height = height + 'px';
      placeholder.style.background = 'black';
      player.el_.parentNode.insertBefore(placeholder, player.el_);

      // Hide the player. While in full-screen video playback mode on iOS, this
      // makes the player show a black screen instead of content flash.
      player.el_.style.display = 'none';

      // Unhide the player and remove the placeholder once we're ready to move on.
      player.one(['adplaying', 'adtimeout', 'adserror', 'adscanceled', 'adskip', 'playing'], function () {
        player.el_.style.display = 'block';
        placeholder.remove();
      });
    })();
  }

  // The timeout is necessary because pausing a video element while processing a `play`
  // event on iOS can cause the video element to continuously toggle between playing and
  // paused states.
  player.ads.cancelPlayTimeout = window.setTimeout(function () {
    // deregister the cancel timeout so subsequent cancels are scheduled
    player.ads.cancelPlayTimeout = null;

    // pause playback so ads can be handled.
    if (!player.paused()) {
      player.pause();
    }

    // When the 'content-playback' state is entered, this will let us know to play
    player.ads.cancelledPlay = true;
  }, 1);
};

module.exports = cancelContentPlay;
},{}],2:[function(require,module,exports){
'use strict';

/*
This feature sends a `contentupdate` event when the player source changes.
*/

// Start sending contentupdate events
var initializeContentupdate = function initializeContentupdate(player) {

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
  window.setTimeout(checkSrc, 1);
};

module.exports = initializeContentupdate;
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Stop propogation for an event, then send a new event with the type of the original
// event with the given prefix added.
var prefixEvent = function prefixEvent(player, prefix, event) {
  // Pretend we called stopImmediatePropagation because we want the native
  // element events to continue propagating
  event.isImmediatePropagationStopped = function () {
    return true;
  };
  event.cancelBubble = true;
  event.isPropagationStopped = function () {
    return true;
  };
  player.trigger({
    type: prefix + event.type,
    state: player.ads.state,
    originalEvent: event
  });
};

// Handle a player event, either by redispatching it with a prefix, or by
// letting it go on its way without any meddling.
/*
The goal of this feature is to make player events work as an integrator would
expect despite the presense of ads. For example, an integrator would expect
an `ended` event to happen once the content is ended. If an `ended` event is sent
as a result of an ad ending, that is a bug. The `redispatch` method should recognize
such `ended` events and prefix them so they are sent as `adended`, and so on with
all other player events.
*/

var redispatch = function redispatch(event) {

  // We do a quick play/pause before we check for prerolls. This creates a "playing"
  // event. This conditional block prefixes that event so it's "adplaying" if it
  // happens while we're in the "preroll?" state. Not every browser is in the
  // "preroll?" state for this event, so the following browsers come through here:
  //  * iPad
  //  * iPhone
  //  * Android
  //  * Safari
  // This is too soon to check videoElementRecycled because there is no snapshot
  // yet. We rely on the coincidence that all browsers for which
  // videoElementRecycled would be true also happen to send their initial playing
  // event during "preroll?"
  if (event.type === 'playing' && this.ads.state === 'preroll?') {
    prefixEvent(this, 'ad', event);

    // Here we send "adplaying" for browsers that send their initial "playing" event
    // (caused by the the initial play/pause) during the "ad-playback" state.
    // The following browsers come through here:
    // * Chrome
    // * IE11
    // If the ad plays in the content tech (aka videoElementRecycled) there will be
    // another playing event when the ad starts. We check videoElementRecycled to
    // avoid a second adplaying event. Thankfully, at this point a snapshot exists
    // so we can safely check videoElementRecycled.
  } else if (event.type === 'playing' && this.ads.state === 'ad-playback' && !this.ads.videoElementRecycled()) {
    prefixEvent(this, 'ad', event);

    // If the ad takes a long time to load, "playing" caused by play/pause can happen
    // during "ads-ready?" instead of "preroll?" or "ad-playback", skipping the
    // other conditions that would normally catch it
  } else if (event.type === 'playing' && this.ads.state === 'ads-ready?') {
    prefixEvent(this, 'ad', event);

    // When an ad is playing in content tech, we would normally prefix
    // "playing" with "ad" to send "adplaying". However, when we did a play/pause
    // before the preroll, we already sent "adplaying". This condition prevents us
    // from sending another.
  } else if (event.type === 'playing' && this.ads.state === 'ad-playback' && this.ads.videoElementRecycled()) {

    // Triggering an event prevents the unprefixed one from firing.
    // "adcontentplaying" is only seen in this very specific condition.
    prefixEvent(this, 'adcontent', event);
    return;

    // When ad is playing in content tech, prefix everything with "ad".
    // This block catches many events such as emptied, play, timeupdate, and ended.
  } else if (this.ads.state === 'ad-playback') {
    if (this.ads.videoElementRecycled() || this.ads.stitchedAds()) {
      prefixEvent(this, 'ad', event);
    }

    // Send contentended if ended happens during content.
    // We will make sure an ended event is sent after postrolls.
  } else if (this.ads.state === 'content-playback' && event.type === 'ended') {
    prefixEvent(this, 'content', event);

    // Event prefixing during content resuming is complicated
  } else if (this.ads.state === 'content-resuming') {

    // This does not happen during normal circumstances. I wasn't able to reproduce
    // it, but the working theory is that it handles cases where restoring the
    // snapshot takes a long time, such as in iOS7 and older Firefox.
    if (this.ads.snapshot && this.currentSrc() !== this.ads.snapshot.currentSrc) {

      // Don't prefix `loadstart` event
      if (event.type === 'loadstart') {
        return;
      }

      // All other events get "content" prefix
      return prefixEvent(this, 'content', event);

      // Content resuming after postroll
    } else if (this.ads.snapshot && this.ads.snapshot.ended) {

      // Don't prefix `pause` and `ended` events
      // They don't always happen during content-resuming, but they might.
      // It seems to happen most often on iOS and Android.
      if (event.type === 'pause' || event.type === 'ended') {
        return;
      }

      // All other events get "content" prefix
      return prefixEvent(this, 'content', event);
    }

    // Content resuming after preroll or midroll
    // Events besides "playing" get "content" prefix
    if (event.type !== 'playing') {
      prefixEvent(this, 'content', event);
    }
  }
};

module.exports = redispatch;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var snapshot = {};

/**
 * Returns an object that captures the portions of player state relevant to
 * video playback. The result of this function can be passed to
 * restorePlayerSnapshot with a player to return the player to the state it
 * was in when this function was invoked.
 * @param {object} player The videojs player object
 */
/*
The snapshot feature is responsible for saving the player state before an ad, then
restoring the player state after an ad.
*/

snapshot.getPlayerSnapshot = function (player) {

  var currentTime = void 0;

  if (_video2.default.browser.IS_IOS && player.ads.isLive(player)) {
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
  var tracks = player.remoteTextTracks ? player.remoteTextTracks() : [];
  var suppressedTracks = [];
  var snapshot = {
    ended: player.ended(),
    currentSrc: player.currentSrc(),
    src: player.src(),
    currentTime: currentTime,
    type: player.currentType()
  };

  if (tech) {
    snapshot.nativePoster = tech.poster;
    snapshot.style = tech.getAttribute('style');
  }

  for (var i = tracks.length; i > 0; i--) {
    var track = tracks[i];

    suppressedTracks.push({
      track: track,
      mode: track.mode
    });
    track.mode = 'disabled';
  }
  snapshot.suppressedTracks = suppressedTracks;

  return snapshot;
};

/**
 * Attempts to modify the specified player so that its state is equivalent to
 * the state of the snapshot.
 * @param {object} snapshot - the player state to apply
 */
snapshot.restorePlayerSnapshot = function (player, snapshot) {

  if (player.ads.disableNextSnapshotRestore === true) {
    player.ads.disableNextSnapshotRestore = false;
    return;
  }

  // The playback tech
  var tech = player.$('.vjs-tech');

  // the number of[ remaining attempts to restore the snapshot
  var attempts = 20;

  var suppressedTracks = snapshot.suppressedTracks;
  var trackSnapshot = void 0;
  var restoreTracks = function restoreTracks() {
    for (var i = suppressedTracks.length; i > 0; i--) {
      trackSnapshot = suppressedTracks[i];
      trackSnapshot.track.mode = trackSnapshot.mode;
    }
  };

  // finish restoring the playback state
  var resume = function resume() {
    var currentTime = void 0;

    if (_video2.default.browser.IS_IOS && player.ads.isLive(player)) {
      if (snapshot.currentTime < 0) {
        // Playback was behind real time, so seek backwards to match
        if (player.seekable().length > 0) {
          currentTime = player.seekable().end(0) + snapshot.currentTime;
        } else {
          currentTime = player.currentTime();
        }
        player.currentTime(currentTime);
      }
    } else {
      player.currentTime(snapshot.ended ? player.duration() : snapshot.currentTime);
    }

    // Resume playback if this wasn't a postroll
    if (!snapshot.ended) {
      player.play();
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
      window.setTimeout(tryToResume, 50);
    } else {
      try {
        resume();
      } catch (e) {
        _video2.default.log.warn('Failed to resume the content after an advertisement', e);
      }
    }
  };

  if (snapshot.nativePoster) {
    tech.poster = snapshot.nativePoster;
  }

  if ('style' in snapshot) {
    // overwrite all css style properties to restore state precisely
    tech.setAttribute('style', snapshot.style || '');
  }

  // Determine whether the player needs to be restored to its state
  // before ad playback began. With a custom ad display or burned-in
  // ads, the content player state hasn't been modified and so no
  // restoration is required

  if (player.ads.videoElementRecycled()) {
    // on ios7, fiddling with textTracks too early will cause safari to crash
    player.one('contentloadedmetadata', restoreTracks);

    // if the src changed for ad playback, reset it
    player.src({ src: snapshot.currentSrc, type: snapshot.type });
    // safari requires a call to `load` to pick up a changed source
    player.load();
    // and then resume from the snapshots time once the original src has loaded
    // in some browsers (firefox) `canplay` may not fire correctly.
    // Reace the `canplay` event with a timeout.
    player.one('contentcanplay', tryToResume);
    player.ads.tryToResumeTimeout_ = player.setTimeout(tryToResume, 2000);
  } else if (!player.ended() || !snapshot.ended) {
    // if we didn't change the src, just restore the tracks
    restoreTracks();
    // the src didn't change and this wasn't a postroll
    // just resume playback at the current time.
    player.play();
  }
};

module.exports = snapshot;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _redispatch = require('./redispatch.js');

var _redispatch2 = _interopRequireDefault(_redispatch);

var _snapshot = require('./snapshot.js');

var _snapshot2 = _interopRequireDefault(_snapshot);

var _contentupdate = require('./contentupdate.js');

var _contentupdate2 = _interopRequireDefault(_contentupdate);

var _cancelContentPlay = require('./cancelContentPlay.js');

var _cancelContentPlay2 = _interopRequireDefault(_cancelContentPlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VIDEO_EVENTS = _video2.default.getComponent('Html5').Events;

/**
 * Remove the poster attribute from the video element tech, if present. When
 * reusing a video element for multiple videos, the poster image will briefly
 * reappear while the new source loads. Removing the attribute ahead of time
 * prevents the poster from showing up between videos.
 * @param {object} player The videojs player object
 */
/*
This main plugin file is responsible for integration logic and enabling the features
that live in in separate files.
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

  var settings = _video2.default.mergeOptions(defaults, options);

  // prefix all video element events during ad playback
  // if the video element emits ad-related events directly,
  // plugins that aren't ad-aware will break. prefixing allows
  // plugins that wish to handle ad events to do so while
  // avoiding the complexity for common usage
  var videoEvents = VIDEO_EVENTS.concat(['firstplay', 'loadedalldata', 'playing']);

  // Set up redispatching of player events
  player.on(videoEvents, _redispatch2.default);

  // "vjs-has-started" should be present at the end of a video. In this case we need
  // to re-add it manually.
  // Not sure why this happens on pause, I've never seen a case where that is needed.
  player.on(['pause', 'ended'], function () {
    if (player.ads.state === 'content-resuming' && player.ads.snapshot && player.ads.snapshot.ended) {
      player.addClass('vjs-has-started');
    }
  });

  // We now auto-play when an ad gets loaded if we're playing ads in the same video
  // element as the content.
  // The problem is that in IE11, we cannot play in addurationchange but in iOS8, we
  // cannot play from adcanplay.
  // This will prevent ad-integrations from needing to do this themselves.
  player.on(['addurationchange', 'adcanplay'], function () {
    if (player.currentSrc() === player.ads.snapshot.currentSrc) {
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

  // replace the ad initializer with the ad namespace
  player.ads = {
    state: 'content-set',
    disableNextSnapshotRestore: false,

    // Call this when an ad response has been received and there are
    // linear ads ready to be played.
    startLinearAdMode: function startLinearAdMode() {
      if (player.ads.state === 'preroll?' || player.ads.state === 'content-playback' || player.ads.state === 'postroll?') {
        player.trigger('adstart');
      }
    },


    // Call this when a linear ad pod has finished playing.
    endLinearAdMode: function endLinearAdMode() {
      if (player.ads.state === 'ad-playback') {
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
      var srcChanged = void 0;
      var currentSrcChanged = void 0;

      if (!this.snapshot) {
        throw new Error('You cannot use videoElementRecycled while there is no snapshot.');
      }

      srcChanged = player.src() !== this.snapshot.src;
      currentSrcChanged = player.currentSrc() !== this.snapshot.currentSrc;

      return srcChanged || currentSrcChanged;
    },


    // Returns a boolean indicating if given player is in live mode.
    // Can be replaced when this is fixed: https://github.com/videojs/video.js/issues/3262
    isLive: function isLive(somePlayer) {
      if (somePlayer.duration() === Infinity) {
        return true;
      } else if (_video2.default.browser.IOS_VERSION === '8' && somePlayer.duration() === 0) {
        return true;
      }
      return false;
    },


    // Return true if content playback should mute and continue during ad breaks.
    // This is only done during live streams on platforms where it's supported.
    // This improves speed and accuracy when returning from an ad break.
    shouldPlayContentBehindAd: function shouldPlayContentBehindAd(somePlayer) {
      return !_video2.default.browser.IS_IOS && !_video2.default.browser.IS_ANDROID && somePlayer.duration() === Infinity;
    }
  };

  player.ads.stitchedAds(settings.stitchedAds);

  // Start sending contentupdate events for this player
  (0, _contentupdate2.default)(player);

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
          (0, _cancelContentPlay2.default)(player);
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
          (0, _cancelContentPlay2.default)(player);
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
          window.setTimeout(function () {
            // Don't wait for a preroll
            player.trigger('nopreroll');
          }, 1);
        } else {
          // change class to show that we're waiting on ads
          player.addClass('vjs-ad-loading');
          // schedule an adtimeout event to fire if we waited too long
          player.ads.adTimeoutTimeout = window.setTimeout(function () {
            player.trigger('adtimeout');
          }, settings.prerollTimeout);
          // signal to ad plugin that it's their opportunity to play a preroll
          player.trigger('readyforpreroll');
        }
      },
      leave: function leave() {
        window.clearTimeout(player.ads.adTimeoutTimeout);
      },

      events: {
        play: function play() {
          (0, _cancelContentPlay2.default)(player);
        },
        adstart: function adstart() {
          this.state = 'ad-playback';
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
        player.ads.adTimeoutTimeout = window.setTimeout(function () {
          player.trigger('adtimeout');
        }, settings.timeout);
      },
      leave: function leave() {
        window.clearTimeout(player.ads.adTimeoutTimeout);
        player.removeClass('vjs-ad-loading');
      },

      events: {
        play: function play() {
          (0, _cancelContentPlay2.default)(player);
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
          this.snapshot = _snapshot2.default.getPlayerSnapshot(player);
        }

        // Mute the player behind the ad
        if (player.ads.shouldPlayContentBehindAd(player)) {
          this.preAdVolume_ = player.volume();
          player.volume(0);
        }

        // add css to the element to indicate and ad is playing.
        player.addClass('vjs-ad-playing');

        // remove the poster so it doesn't flash between ads
        removeNativePoster(player);

        // We no longer need to supress play events once an ad is playing.
        // Clear it if we were.
        if (player.ads.cancelPlayTimeout) {
          // If we don't wait a tick, we could cancel the pause for cancelContentPlay,
          // resulting in content playback behind the ad
          window.setTimeout(function () {
            window.clearTimeout(player.ads.cancelPlayTimeout);
            player.ads.cancelPlayTimeout = null;
          }, 1);
        }
      },
      leave: function leave() {
        player.removeClass('vjs-ad-playing');
        if (!player.ads.shouldPlayContentBehindAd(player)) {
          _snapshot2.default.restorePlayerSnapshot(player, this.snapshot);
        }

        // Reset the volume to pre-ad levels
        if (player.ads.shouldPlayContentBehindAd(player)) {
          player.volume(this.preAdVolume_);
        }
      },

      events: {
        adend: function adend() {
          this.state = 'content-resuming';
        },
        adserror: function adserror() {
          this.state = 'content-resuming';
          // Trigger 'adend' to notify that we are exiting 'ad-playback'
          player.trigger('adend');
        }
      }
    },
    'content-resuming': {
      enter: function enter() {
        if (this.snapshot && this.snapshot.ended) {
          window.clearTimeout(player.ads._fireEndedTimeout);
          // in some cases, ads are played in a swf or another video element
          // so we do not get an ended event in this state automatically.
          // If we don't get an ended event we can use, we need to trigger
          // one ourselves or else we won't actually ever end the current video.
          player.ads._fireEndedTimeout = window.setTimeout(function () {
            player.trigger('ended');
          }, 1000);
        }
      },
      leave: function leave() {
        window.clearTimeout(player.ads._fireEndedTimeout);
      },

      events: {
        contentupdate: function contentupdate() {
          this.state = 'content-set';
        },
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
        this.snapshot = _snapshot2.default.getPlayerSnapshot(player);
        if (player.ads.nopostroll_) {
          window.setTimeout(function () {
            // content-resuming happens after the timeout for backward-compatibility
            // with plugins that relied on a postrollTimeout before nopostroll was
            // implemented
            player.ads.state = 'content-resuming';
            player.trigger('ended');
          }, 1);
        } else {
          player.addClass('vjs-ad-loading');

          player.ads.adTimeoutTimeout = window.setTimeout(function () {
            player.trigger('adtimeout');
          }, settings.postrollTimeout);
        }
      },
      leave: function leave() {
        window.clearTimeout(player.ads.adTimeoutTimeout);
        player.removeClass('vjs-ad-loading');
      },

      events: {
        adstart: function adstart() {
          this.state = 'ad-playback';
        },
        adskip: function adskip() {
          this.state = 'content-resuming';
          window.setTimeout(function () {
            player.trigger('ended');
          }, 1);
        },
        adtimeout: function adtimeout() {
          this.state = 'content-resuming';
          window.setTimeout(function () {
            player.trigger('ended');
          }, 1);
        },
        adserror: function adserror() {
          this.state = 'content-resuming';
          window.setTimeout(function () {
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
          window.clearTimeout(player.ads.cancelPlayTimeout);
          player.ads.cancelPlayTimeout = null;
        }
        // Play the content
        if (player.ads.cancelledPlay) {
          player.ads.cancelledPlay = false;
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
        },
        contentupdate: function contentupdate() {
          if (player.paused()) {
            this.state = 'content-set';
          } else {
            this.state = 'ads-ready?';
          }
          // When a new source is loaded into the player, we should remove the snapshot
          // to avoid confusing player state with the new content's state
          // i.e When new content is set, the player should fire the ended event
          if (this.snapshot && this.snapshot.ended) {
            this.snapshot = null;
          }
        },
        contentended: function contentended() {
          if (player.ads.snapshot && player.ads.snapshot.ended) {
            // player has already been here. content has really ended. good-bye
            return;
          }
          this.state = 'postroll?';
        },
        play: function play() {
          if (player.currentSrc() !== player.ads.contentSrc) {
            (0, _cancelContentPlay2.default)(player);
          }
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
        _video2.default.log('ads', player.ads.triggerevent + ' triggered: ' + previousState + ' -> ' + newState);
      }
    }
  };

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

  // If we're autoplaying, the state machine will immidiately process
  // a synthetic play event
  if (!player.paused()) {
    processEvent({ type: 'play' });
  }
};

// Register this plugin with videojs
_video2.default.plugin('ads', contribAdsPlugin);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cancelContentPlay.js":1,"./contentupdate.js":2,"./redispatch.js":3,"./snapshot.js":4}]},{},[5])(5)
});