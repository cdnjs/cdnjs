(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["ima"],{

/***/ "./plugins/ima/ima.js":
/*!****************************!*\
  !*** ./plugins/ima/ima.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var videojs_contrib_ads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! videojs-contrib-ads */ "../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.es.js");
/* harmony import */ var videojs_ima__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! videojs-ima */ "../node_modules/videojs-ima/dist/videojs.ima.es.js");
/* harmony import */ var videojs_ima_dist_videojs_ima_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! videojs-ima/dist/videojs.ima.scss */ "../node_modules/videojs-ima/dist/videojs.ima.scss");




/***/ }),

/***/ "../node_modules/global/document.js":
/*!******************************************!*\
  !*** ../node_modules/global/document.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var topLevel = typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(/*! min-document */ "?9835");

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;


/***/ }),

/***/ "../node_modules/global/window.js":
/*!****************************************!*\
  !*** ../node_modules/global/window.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
    win = __webpack_require__.g;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),

/***/ "../node_modules/videojs-ima/dist/videojs.ima.scss":
/*!*********************************************************!*\
  !*** ../node_modules/videojs-ima/dist/videojs.ima.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.es.js":
/*!**************************************************************************!*\
  !*** ../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.es.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! global/window */ "../node_modules/global/window.js");
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global_window__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var global_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! global/document */ "../node_modules/global/document.js");
/* harmony import */ var global_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(global_document__WEBPACK_IMPORTED_MODULE_2__);
/*! @name videojs-contrib-ads @version 7.3.3 @license Apache-2.0 */




var version = "7.3.3";

/*
 * Implements the public API available in `player.ads` as well as application state.
 */
function getAds(player) {
  return {
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
    // Should we block calls to play on the content player?
    _shouldBlockPlay: false,
    // Was play blocked by the plugin's playMiddleware feature?
    _playBlocked: false,
    // Tracks whether play has been requested for this source,
    // either by the play method or user interaction
    _playRequested: false,
    // This is an estimation of the current ad type being played
    // This is experimental currently. Do not rely on its presence or behavior!
    adType: null,
    VERSION: version,
    reset: function reset() {
      player.ads.disableNextSnapshotRestore = false;
      player.ads._contentEnding = false;
      player.ads._contentHasEnded = false;
      player.ads.snapshot = null;
      player.ads.adType = null;
      player.ads._hasThereBeenALoadedData = false;
      player.ads._hasThereBeenALoadedMetaData = false;
      player.ads._cancelledPlay = false;
      player.ads._shouldBlockPlay = false;
      player.ads._playBlocked = false;
      player.ads.nopreroll_ = false;
      player.ads.nopostroll_ = false;
      player.ads._playRequested = false;
    },
    // Call this when an ad response has been received and there are
    // linear ads ready to be played.
    startLinearAdMode: function startLinearAdMode() {
      player.ads._state.startLinearAdMode();
    },
    // Call this when a linear ad pod has finished playing.
    endLinearAdMode: function endLinearAdMode() {
      player.ads._state.endLinearAdMode();
    },
    // Call this when an ad response has been received but there are no
    // linear ads to be played (i.e. no ads available, or overlays).
    // This has no effect if we are already in an ad break.  Always
    // use endLinearAdMode() to exit from linear ad-playback state.
    skipLinearAdMode: function skipLinearAdMode() {
      player.ads._state.skipLinearAdMode();
    },
    // With no arguments, returns a boolean value indicating whether or not
    // contrib-ads is set to treat ads as stitched with content in a single
    // stream. With arguments, treated as a setter, but this behavior is
    // deprecated.
    stitchedAds: function stitchedAds(arg) {
      if (arg !== undefined) {
        video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Using player.ads.stitchedAds() as a setter is deprecated, ' + 'it should be set as an option upon initialization of contrib-ads.');

        // Keep the private property and the settings in sync. When this
        // setter is removed, we can probably stop using the private property.
        this.settings.stitchedAds = !!arg;
      }
      return this.settings.stitchedAds;
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
    // One reason for this: https://github.com/videojs/video.js/issues/3262
    // Also, some live content can have a duration.
    isLive: function isLive(somePlayer) {
      if (somePlayer === void 0) {
        somePlayer = player;
      }
      if (typeof somePlayer.ads.settings.contentIsLive === 'boolean') {
        return somePlayer.ads.settings.contentIsLive;
      } else if (somePlayer.duration() === Infinity) {
        return true;
      } else if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IOS_VERSION === '8' && somePlayer.duration() === 0) {
        return true;
      }
      return false;
    },
    // Return true if content playback should mute and continue during ad breaks.
    // This is only done during live streams on platforms where it's supported.
    // This improves speed and accuracy when returning from an ad break.
    shouldPlayContentBehindAd: function shouldPlayContentBehindAd(somePlayer) {
      if (somePlayer === void 0) {
        somePlayer = player;
      }
      if (!somePlayer) {
        throw new Error('shouldPlayContentBehindAd requires a player as a param');
      } else if (!somePlayer.ads.settings.liveCuePoints) {
        return false;
      } else {
        return !(video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_IOS && !(video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_ANDROID && somePlayer.duration() === Infinity;
      }
    },
    // Return true if the ads plugin should save and restore snapshots of the
    // player state when moving into and out of ad mode.
    shouldTakeSnapshots: function shouldTakeSnapshots(somePlayer) {
      if (somePlayer === void 0) {
        somePlayer = player;
      }
      return !this.shouldPlayContentBehindAd(somePlayer) && !this.stitchedAds();
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
      return this._state.isAdState();
    },
    // Returns true if in ad mode but an ad break hasn't started yet.
    isWaitingForAdBreak: function isWaitingForAdBreak() {
      return this._state.isWaitingForAdBreak();
    },
    // Returns true if content is resuming after an ad. This is part of ad mode.
    isContentResuming: function isContentResuming() {
      return this._state.isContentResuming();
    },
    // Deprecated because the name was misleading. Use inAdBreak instead.
    isAdPlaying: function isAdPlaying() {
      return this._state.inAdBreak();
    },
    // Returns true if an ad break is ongoing. This is part of ad mode.
    // An ad break is the time between startLinearAdMode and endLinearAdMode.
    inAdBreak: function inAdBreak() {
      return this._state.inAdBreak();
    },
    /*
     * Remove the poster attribute from the video element tech, if present. When
     * reusing a video element for multiple videos, the poster image will briefly
     * reappear while the new source loads. Removing the attribute ahead of time
     * prevents the poster from showing up between videos.
     *
     * @param {Object} player The videojs player object
     */
    removeNativePoster: function removeNativePoster() {
      var tech = player.$('.vjs-tech');
      if (tech) {
        tech.removeAttribute('poster');
      }
    },
    debug: function debug() {
      if (this.settings.debug) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (args.length === 1 && typeof args[0] === 'string') {
          video_js__WEBPACK_IMPORTED_MODULE_0___default().log('ADS: ' + args[0]);
        } else {
          video_js__WEBPACK_IMPORTED_MODULE_0___default().log.apply((video_js__WEBPACK_IMPORTED_MODULE_0___default()), ['ADS:'].concat(args));
        }
      }
    }
  };
}

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
    originalEvent: event
  });
};

// Playing event
// Requirements:
// * Normal playing event when there is no preroll
// * No playing event before preroll
// * At least one playing event after preroll
var handlePlaying = function handlePlaying(player, event) {
  if (player.ads.isInAdMode()) {
    if (player.ads.isContentResuming()) {
      // Prefix playing event when switching back to content after postroll.
      if (player.ads._contentEnding) {
        prefixEvent(player, 'content', event);
      }

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
    // Cancel ended events during content resuming. Normally we would
    // prefix them, but `contentended` has a special meaning. In the
    // future we'd like to rename the existing `contentended` to
    // `readyforpostroll`, then we could remove the special `resumeended`
    // and do a conventional content prefix here.
    if (player.ads.isContentResuming()) {
      cancelEvent(player, event);

      // Important: do not use this event outside of videojs-contrib-ads.
      // It will be removed and your code will break.
      // Ideally this would simply be `contentended`, but until
      // `contentended` no longer has a special meaning it cannot be
      // changed.
      player.trigger('resumeended');

      // Ad prefix in ad mode
    } else {
      prefixEvent(player, 'ad', event);
    }

    // Prefix ended due to content ending before postroll check
  } else if (!player.ads._contentHasEnded && !player.ads.stitchedAds()) {
    // This will change to cancelEvent after the contentended deprecation
    // period (contrib-ads 7)
    prefixEvent(player, 'content', event);

    // Content ended for the first time, time to check for postrolls
    player.trigger('readyforpostroll');
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
  } else if (player.ads.inAdBreak()) {
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
// current architecture, this could cause the content to start playing.
// Therefore, contrib-ads must always either:
//   - cancelContentPlay if there is any possible chance the play caused the
//     content to start playing, even if we are technically in ad mode. In order for
//     that to happen, play events need to be unprefixed until the last possible moment.
//   - use playMiddleware to stop the play from reaching the Tech so there is no risk
//     of the content starting to play.
// Currently, playMiddleware is only supported on desktop browsers with
// video.js after version 6.7.1.
var handlePlay = function handlePlay(player, event) {
  if (player.ads.inAdBreak()) {
    prefixEvent(player, 'ad', event);

    // Content resuming
  } else if (player.ads.isContentResuming()) {
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
This feature sends a `contentupdate` event when the player source changes.
*/

// Start sending contentupdate events
function initializeContentupdate(player) {
  // Keep track of the current content source
  // If you want to change the src of the video without triggering
  // the ad workflow to restart, you can update this variable before
  // modifying the player's source
  player.ads.contentSrc = player.currentSrc();
  player.ads._seenInitialLoadstart = false;

  // Check if a new src has been set, if so, trigger contentupdate
  var checkSrc = function checkSrc() {
    if (!player.ads.inAdBreak()) {
      var src = player.currentSrc();
      if (src !== player.ads.contentSrc) {
        if (player.ads._seenInitialLoadstart) {
          player.trigger({
            type: 'contentchanged'
          });
        }
        player.trigger({
          type: 'contentupdate',
          oldValue: player.ads.contentSrc,
          newValue: src
        });
        player.ads.contentSrc = src;
      }
      player.ads._seenInitialLoadstart = true;
    }
  };

  // loadstart reliably indicates a new src has been set
  player.on('loadstart', checkSrc);
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/**
 * Current tcfData returned from CMP
 * Updated on event listener rather than having to make an asyc
 * check within the macro resolver
 */
var tcData = {};

/**
 * Sets up a proxy for the TCF API in an iframed player, if a parent frame
 * that has implemented the TCF API is detected
 * https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#is-there-a-sample-iframe-script-call-to-the-cmp-api
 */
var proxyTcfApi = function proxyTcfApi(_) {
  if (video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.isInFrame() && typeof (global_window__WEBPACK_IMPORTED_MODULE_1___default().__tcfapi) !== 'function') {
    var frame = (global_window__WEBPACK_IMPORTED_MODULE_1___default());
    var cmpFrame;
    var cmpCallbacks = {};
    while (frame) {
      try {
        if (frame.frames.__tcfapiLocator) {
          cmpFrame = frame;
          break;
        }
      } catch (ignore) {
        // empty
      }
      if (frame === (global_window__WEBPACK_IMPORTED_MODULE_1___default().top)) {
        break;
      }
      frame = frame.parent;
    }
    if (!cmpFrame) {
      return;
    }
    (global_window__WEBPACK_IMPORTED_MODULE_1___default().__tcfapi) = function (cmd, version, callback, arg) {
      var callId = Math.random() + '';
      var msg = {
        __tcfapiCall: {
          command: cmd,
          parameter: arg,
          version: version,
          callId: callId
        }
      };
      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');
    };
    global_window__WEBPACK_IMPORTED_MODULE_1___default().addEventListener('message', function (event) {
      var json = {};
      try {
        json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch (ignore) {
        // empty
      }
      var payload = json.__tcfapiReturn;
      if (payload) {
        if (typeof cmpCallbacks[payload.callId] === 'function') {
          cmpCallbacks[payload.callId](payload.returnValue, payload.success);
          cmpCallbacks[payload.callId] = null;
        }
      }
    }, false);
  }
};

/**
 * Sets up event listener for changes to consent data.
 */
var listenToTcf = function listenToTcf() {
  proxyTcfApi();
  if (typeof (global_window__WEBPACK_IMPORTED_MODULE_1___default().__tcfapi) === 'function') {
    global_window__WEBPACK_IMPORTED_MODULE_1___default().__tcfapi('addEventListener', 2, function (data, success) {
      if (success) {
        tcData = data;
      }
    });
  }
};

var findUspApiLocatorWindow = function findUspApiLocatorWindow(windowObj) {
  var targetWindow = windowObj.parent;
  while (targetWindow !== windowObj.top) {
    try {
      if (targetWindow.frames && targetWindow.frames.__uspapiLocator) {
        return targetWindow;
      }
    } catch (ignore) {
      // do nothing
    }
    targetWindow = targetWindow.parent;
  }

  // Check for the __uspapiLocator frame in the top window
  try {
    if (windowObj.top.frames && windowObj.top.frames.__uspapiLocator) {
      return windowObj.top;
    }
  } catch (ignore) {
    // do nothing
  }

  // Return null if no __uspapiLocator frame is found in any window
  return null;
};
var uspString = '';
var getCurrentUspString = function getCurrentUspString() {
  return uspString;
};

// Call the USP API to get the US Privacy String, either by invoking it directly or via postMessage() if inside an iframe.
// In the former case the callback is synchronous, if the latter it is asynchronous, so to be safe it should always be
// assumed to be asynchronous.
// The window is passable as an argument for ease of testing
var obtainUsPrivacyString = function obtainUsPrivacyString(callback, windowObj) {
  if (windowObj === void 0) {
    windowObj = (global_window__WEBPACK_IMPORTED_MODULE_1___default());
  }
  if (windowObj.__uspapi) {
    windowObj.__uspapi('getUSPData', 1, function (uspData, success) {
      var privacyString = success ? uspData.uspString : null;
      uspString = privacyString;
      callback(privacyString);
    });
  } else {
    var targetWindow = findUspApiLocatorWindow(windowObj);

    // If no __uspapiLocator frame is found, execute the callback with a null privacy string
    if (!targetWindow) {
      callback(null);
      return;
    }
    var uniqueId = Math.random().toString(36).substring(2);
    var message = {
      __uspapiCall: {
        command: 'getUSPData',
        version: 1,
        callId: uniqueId
      }
    };
    var handleMessageEvent = function handleMessageEvent(event) {
      if (event && event.data && event.data.__uspapiReturn && event.data.__uspapiReturn.callId === uniqueId) {
        windowObj.removeEventListener('message', handleMessageEvent, false);
        var _event$data$__uspapiR = event.data.__uspapiReturn,
          returnValue = _event$data$__uspapiR.returnValue,
          success = _event$data$__uspapiR.success;
        var privacyString = success ? returnValue.uspString : null;
        uspString = privacyString;
        callback(privacyString);
      }
    };
    windowObj.addEventListener('message', handleMessageEvent, false);
    targetWindow.postMessage(message, '*');
  }
};

var uriEncodeIfNeeded = function uriEncodeIfNeeded(value, uriEncode) {
  return uriEncode ? encodeURIComponent(value) : value;
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
var getMediaInfoMacros = function getMediaInfoMacros(mediainfo, defaults) {
  var macros = {};
  ['description', 'tags', 'reference_id', 'ad_keys'].forEach(function (prop) {
    if (mediainfo && mediainfo[prop]) {
      macros["{mediainfo." + prop + "}"] = mediainfo[prop];
    } else if (defaults["{mediainfo." + prop + "}"]) {
      macros["{mediainfo." + prop + "}"] = defaults["{mediainfo." + prop + "}"];
    } else {
      macros["{mediainfo." + prop + "}"] = '';
    }
  });
  ['custom_fields', 'customFields'].forEach(function (customFieldProp) {
    customFields(mediainfo, macros, customFieldProp);
  });
  return macros;
};
var getDefaultValues = function getDefaultValues(string) {
  var defaults = {};
  var modifiedString = string.replace(/{([^}=]+)=([^}]*)}/g, function (match, name, defaultVal) {
    defaults["{" + name + "}"] = defaultVal;
    return "{" + name + "}";
  });
  return {
    defaults: defaults,
    modifiedString: modifiedString
  };
};
var getStaticMacros = function getStaticMacros(player) {
  return {
    '{player.id}': player.options_['data-player'] || player.id_,
    '{player.height}': player.currentHeight(),
    '{player.width}': player.currentWidth(),
    '{player.heightInt}': Math.round(player.currentHeight()),
    '{player.widthInt}': Math.round(player.currentWidth()),
    '{player.autoplay}': player.autoplay() ? 1 : 0,
    '{player.muted}': player.muted() ? 1 : 0,
    '{player.language}': player.language() || '',
    '{mediainfo.id}': player.mediainfo ? player.mediainfo.id : '',
    '{mediainfo.name}': player.mediainfo ? player.mediainfo.name : '',
    '{mediainfo.duration}': player.mediainfo ? player.mediainfo.duration : '',
    '{player.duration}': player.duration(),
    '{player.durationInt}': Math.round(player.duration()),
    '{player.live}': player.duration() === Infinity ? 1 : 0,
    '{player.pageUrl}': video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.isInFrame() ? (global_document__WEBPACK_IMPORTED_MODULE_2___default().referrer) : (global_window__WEBPACK_IMPORTED_MODULE_1___default().location).href,
    '{playlistinfo.id}': player.playlistinfo ? player.playlistinfo.id : '',
    '{playlistinfo.name}': player.playlistinfo ? player.playlistinfo.name : '',
    '{timestamp}': new Date().getTime(),
    '{document.referrer}': (global_document__WEBPACK_IMPORTED_MODULE_2___default().referrer),
    '{window.location.href}': (global_window__WEBPACK_IMPORTED_MODULE_1___default().location).href,
    '{random}': Math.floor(Math.random() * 1000000000000)
  };
};
var getTcfMacros = function getTcfMacros(tcDataObj) {
  var tcfMacros = {};
  Object.keys(tcDataObj).forEach(function (key) {
    tcfMacros["{tcf." + key + "}"] = tcDataObj[key];
  });
  tcfMacros['{tcf.gdprAppliesInt}'] = tcDataObj.gdprApplies ? 1 : 0;
  return tcfMacros;
};
var getUspMacros = function getUspMacros() {
  return {
    '{usp.uspString}': getCurrentUspString()
  };
};

// This extracts and evaluates variables from the `window` object for macro replacement. While replaceMacros() handles generic macro name
// overriding for other macro types, this function also needs to reference the overrides in order to map custom macro names in the string
// to their corresponding default pageVariable names, so they can be evaluated on the `window` and stored for later replacement in replaceMacros().
var getPageVariableMacros = function getPageVariableMacros(string, defaults, macroNameOverrides) {
  var pageVarRegex = new RegExp('{pageVariable\\.([^}]+)}', 'g');
  var pageVariablesMacros = {};

  // Aggregate any default pageVariable macros found in the string with any pageVariable macros that have custom names specified in
  // macroNameOverrides.
  var pageVariables = (string.match(pageVarRegex) || []).concat(Object.keys(macroNameOverrides).filter(function (macroName) {
    return pageVarRegex.test(macroName) && string.includes(macroNameOverrides[macroName]);
  }));
  if (!pageVariables) {
    return;
  }
  pageVariables.forEach(function (pageVar) {
    var key = pageVar;
    var name = pageVar.slice(14, -1);
    var names = name.split('.');
    var context = (global_window__WEBPACK_IMPORTED_MODULE_1___default());
    var value;

    // Iterate down multiple levels of selector without using eval
    // This makes things like pageVariable.foo.bar work
    for (var i = 0; i < names.length; i++) {
      if (i === names.length - 1) {
        value = context[names[i]];
      } else {
        context = context[names[i]];
        if (typeof context === 'undefined') {
          break;
        }
      }
    }
    var type = typeof value;

    // Only allow certain types of values. Anything else is probably a mistake.
    if (value === null) {
      pageVariablesMacros[key] = 'null';
    } else if (value === undefined) {
      if (defaults[key]) {
        pageVariablesMacros[key] = defaults[key];
      } else {
        video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn("Page variable \"" + name + "\" not found");
        pageVariablesMacros[key] = '';
      }
    } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn("Page variable \"" + name + "\" is not a supported type");
      pageVariablesMacros[key] = '';
    } else {
      pageVariablesMacros[key] = value;
    }
  });
  return pageVariablesMacros;
};
var replaceMacros = function replaceMacros(string, macros, uriEncode, overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  for (var macroName in macros) {
    // The resolvedMacroName is the macro as it is expected to appear in the actual string, or regex if it has been provided.
    var resolvedMacroName = overrides.hasOwnProperty(macroName) ? overrides[macroName] : macroName;
    if (resolvedMacroName.startsWith('r:')) {
      try {
        var regex = new RegExp(resolvedMacroName.slice(2), 'g');
        string = string.replace(regex, uriEncodeIfNeeded(macros[macroName], uriEncode));
      } catch (error) {
        video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn("Unable to replace macro with regex \"" + resolvedMacroName + "\". The provided regex may be invalid.");
      }
    } else {
      string = string.split(resolvedMacroName).join(uriEncodeIfNeeded(macros[macroName], uriEncode));
    }
  }
  return string;
};

/**
 *
 * @param {string} string
 *                 Any string with macros to be replaced
 * @param {boolean} uriEncode
 *                  A Boolean value indicating whether the macros should be replaced with URI-encoded values
 * @param {object} customMacros
 *                 An object with custom macros and values to map them to. For example: {'{five}': 5}
 * @param {boolean} customMacros.disableDefaultMacros
 *                  A boolean indicating whether replacement of default macros should be forgone in favor of only customMacros
 * @param {object} customMacros.macroNameOverrides
 *                 An object that specifies custom names for default macros, following the following format:
 *                 // {'{default-macro-name}': '{new-macro-name}'}
 *                 {'{player.id}': '{{PLAYER_ID}}', ...}
 * @returns {string}
 *          The provided string with all macros replaced. For example: adMacroReplacement('{player.id}') returns a string of the player id
 */
function adMacroReplacement(string, uriEncode, customMacros) {
  if (uriEncode === void 0) {
    uriEncode = false;
  }
  if (customMacros === void 0) {
    customMacros = {};
  }
  var disableDefaultMacros = customMacros.disableDefaultMacros || false;
  var macroNameOverrides = customMacros.macroNameOverrides || {};

  // Remove special properties from customMacros
  delete customMacros.disableDefaultMacros;
  delete customMacros.macroNameOverrides;
  var macros = customMacros;
  if (disableDefaultMacros) {
    return replaceMacros(string, macros, uriEncode, macroNameOverrides);
  }

  // Get macros with defaults e.g. {x=y}, store the values in `defaults` and replace with standard macros in the string
  var _getDefaultValues = getDefaultValues(string),
    defaults = _getDefaultValues.defaults,
    modifiedString = _getDefaultValues.modifiedString;
  string = modifiedString;

  // Get all macro values
  _extends(macros, getStaticMacros(this), getMediaInfoMacros(this.mediainfo, defaults), getTcfMacros(tcData), getUspMacros(), getPageVariableMacros(string, defaults, macroNameOverrides));

  // Perform macro replacement
  string = replaceMacros(string, macros, uriEncode, macroNameOverrides);

  // Replace any remaining default values that have not already been replaced. This includes mediainfo custom fields.
  for (var macro in defaults) {
    string = string.replace(macro, defaults[macro]);
  }
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
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Skipping as this is not a supported ad cue.', cue);
      return;
    }

    // Continue processing supported cue
    var cueId = this.getCueId(player, cue);
    var startTime = cue.startTime;

    // Skip ad if cue was already used
    if (cueAlreadySeen(player, cueId)) {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log('Skipping ad already seen with ID ' + cueId);
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

function initCancelContentPlay(player, debug) {
  if (debug) {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log('Using cancelContentPlay to block content playback');
  }

  // Listen to play events to "cancel" them afterward
  player.on('play', cancelContentPlay);
}

/*
This feature makes sure the player is paused during ad loading.

It does this by pausing the player immediately after a "play" where ads will be requested,
then signalling that we should play after the ad is done.
*/

function cancelContentPlay() {
  // this function is in the player's context

  if (this.ads._shouldBlockPlay === false) {
    // Only block play if the ad plugin is in a state when content
    // playback should be blocked. This currently means during
    // BeforePrerollState and PrerollState.
    return;
  }

  // pause playback so ads can be handled.
  if (!this.paused()) {
    this.ads.debug('Playback was canceled by cancelContentPlay');
    this.pause();
  }

  // When the 'content-playback' state is entered, this will let us know to play.
  // This is needed if there is no preroll or if it errors, times out, etc.
  this.ads._cancelledPlay = true;
}

var obj = {};
// This reference allows videojs to be mocked in unit tests
// while still using the available videojs import in the source code
// @see obj.testHook
var videojsReference = (video_js__WEBPACK_IMPORTED_MODULE_0___default());

/**
 * Checks if middleware mediators are available and
 * can be used on this platform.
 * Currently we can only use mediators on desktop platforms.
 */
obj.isMiddlewareMediatorSupported = function () {
  if (videojsReference.browser.IS_IOS || videojsReference.browser.IS_ANDROID) {
    return false;
  } else if (
  // added when middleware was introduced in video.js
  videojsReference.use &&
  // added when mediators were introduced in video.js
  videojsReference.middleware && videojsReference.middleware.TERMINATOR) {
    return true;
  }
  return false;
};
obj.playMiddleware = function (player) {
  return {
    setSource: function setSource(srcObj, next) {
      next(null, srcObj);
    },
    callPlay: function callPlay() {
      // Block play calls while waiting for an ad, only if this is an
      // ad supported player
      if (player.ads && player.ads._shouldBlockPlay === true) {
        player.ads.debug('Using playMiddleware to block content playback');
        player.ads._playBlocked = true;
        return videojsReference.middleware.TERMINATOR;
      }
    },
    play: function play(terminated, playPromise) {
      if (player.ads && player.ads._playBlocked && terminated) {
        player.ads.debug('Play call to Tech was terminated.');
        // Trigger play event to match the user's intent to play.
        // The call to play on the Tech has been blocked, so triggering
        // the event on the Player will not affect the Tech's playback state.
        player.trigger('play');
        // At this point the player has technically started
        player.addClass('vjs-has-started');
        // Reset playBlocked
        player.ads._playBlocked = false;

        // Safari issues a pause event when autoplay is blocked but other browsers
        // do not, so we send a pause for consistency in those cases. This keeps the
        // play button in the correct state if play is rejected.
      } else if (playPromise && playPromise.catch) {
        playPromise.catch(function (e) {
          if (e.name === 'NotAllowedError' && !(video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_SAFARI) {
            player.trigger('pause');
          }
        });
      }
    }
  };
};
obj.testHook = function (testVjs) {
  videojsReference = testVjs;
};

var playMiddleware = obj.playMiddleware,
  isMiddlewareMediatorSupported = obj.isMiddlewareMediatorSupported;

/**
 * Whether or not this copy of Video.js has the ads plugin.
 *
 * @return {boolean}
 *         If `true`, has the plugin. `false` otherwise.
 */
var hasAdsPlugin = function hasAdsPlugin() {
  // Video.js 6 and 7 have a getPlugin method.
  if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin)) {
    return Boolean(video_js__WEBPACK_IMPORTED_MODULE_0___default().getPlugin('ads'));
  }

  // Video.js 5 does not have a getPlugin method, so check the player prototype.
  var Player = video_js__WEBPACK_IMPORTED_MODULE_0___default().getComponent('Player');
  return Boolean(Player && Player.prototype.ads);
};

/**
 * Register contrib-ads with Video.js, but provide protection for duplicate
 * copies of the plugin. This could happen if, for example, a stitched ads
 * plugin and a client-side ads plugin are included simultaneously with their
 * own copies of contrib-ads.
 *
 * If contrib-ads detects a pre-existing duplicate, it will not register
 * itself.
 *
 * Ad plugins using contrib-ads and anticipating that this could come into
 * effect should verify that the contrib-ads they are using is of a compatible
 * version.
 *
 * @param  {Function} contribAdsPlugin
 *         The plugin function.
 *
 * @return {boolean}
 *         When `true`, the plugin was registered. When `false`, the plugin
 *         was not registered.
 */
function register(contribAdsPlugin) {
  // If the ads plugin already exists, do not overwrite it.
  if (hasAdsPlugin((video_js__WEBPACK_IMPORTED_MODULE_0___default()))) {
    return false;
  }

  // Cross-compatibility with Video.js 6/7 and 5.
  var registerPlugin = (video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin) || (video_js__WEBPACK_IMPORTED_MODULE_0___default().plugin);

  // Register this plugin with Video.js.
  registerPlugin('ads', contribAdsPlugin);

  // Register the play middleware with Video.js on script execution,
  // to avoid a new playMiddleware factory being added for each player.
  // The `usingContribAdsMiddleware_` flag is used to ensure that we only ever
  // register the middleware once - despite the ability to de-register and
  // re-register the plugin itself.
  if (isMiddlewareMediatorSupported() && !(video_js__WEBPACK_IMPORTED_MODULE_0___default().usingContribAdsMiddleware_)) {
    // Register the play middleware
    video_js__WEBPACK_IMPORTED_MODULE_0___default().use('*', playMiddleware);
    (video_js__WEBPACK_IMPORTED_MODULE_0___default().usingContribAdsMiddleware_) = true;
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.debug('Play middleware has been registered with videojs');
  }
  return true;
}

var States = /*#__PURE__*/function () {
  function States() {}
  States.getState = function getState(name) {
    if (!name) {
      return;
    }
    if (States.states_ && States.states_[name]) {
      return States.states_[name];
    }
  };
  States.registerState = function registerState(name, StateToRegister) {
    if (typeof name !== 'string' || !name) {
      throw new Error("Illegal state name, \"" + name + "\"; must be a non-empty string.");
    }
    if (!States.states_) {
      States.states_ = {};
    }
    States.states_[name] = StateToRegister;
    return StateToRegister;
  };
  return States;
}();

var State = /*#__PURE__*/function () {
  State._getName = function _getName() {
    return 'Anonymous State';
  };
  function State(player) {
    this.player = player;
  }

  /*
   * This is the only allowed way to perform state transitions. State transitions usually
   * happen in player event handlers. They can also happen recursively in `init`. They
   * should _not_ happen in `cleanup`.
   */
  var _proto = State.prototype;
  _proto.transitionTo = function transitionTo(NewState) {
    var player = this.player;

    // Since State is an abstract class, this will refer to
    // the state that is extending this class
    this.cleanup(player);
    var newState = new NewState(player);
    player.ads._state = newState;
    player.ads.debug(this.constructor._getName() + ' -> ' + newState.constructor._getName());
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    newState.init.apply(newState, [player].concat(args));
  }

  /*
   * Implemented by subclasses to provide initialization logic when transitioning
   * to a new state.
   */;
  _proto.init = function init() {}

  /*
   * Implemented by subclasses to provide cleanup logic when transitioning
   * to a new state.
   */;
  _proto.cleanup = function cleanup() {}

  /*
   * Default event handlers. Different states can override these to provide behaviors.
   */;
  _proto.onPlay = function onPlay() {};
  _proto.onPlaying = function onPlaying() {};
  _proto.onEnded = function onEnded() {};
  _proto.onAdEnded = function onAdEnded() {};
  _proto.onAdsReady = function onAdsReady() {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected adsready event');
  };
  _proto.onAdsError = function onAdsError() {};
  _proto.onAdsCanceled = function onAdsCanceled() {};
  _proto.onAdTimeout = function onAdTimeout() {};
  _proto.onAdStarted = function onAdStarted() {};
  _proto.onAdSkipped = function onAdSkipped() {};
  _proto.onContentChanged = function onContentChanged() {};
  _proto.onContentResumed = function onContentResumed() {};
  _proto.onReadyForPostroll = function onReadyForPostroll() {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected readyforpostroll event');
  };
  _proto.onNoPreroll = function onNoPreroll() {};
  _proto.onNoPostroll = function onNoPostroll() {}

  /*
   * Method handlers. Different states can override these to provide behaviors.
   */;
  _proto.startLinearAdMode = function startLinearAdMode() {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected startLinearAdMode invocation ' + '(State via ' + this.constructor._getName() + ')');
  };
  _proto.endLinearAdMode = function endLinearAdMode() {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected endLinearAdMode invocation ' + '(State via ' + this.constructor._getName() + ')');
  };
  _proto.skipLinearAdMode = function skipLinearAdMode() {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected skipLinearAdMode invocation ' + '(State via ' + this.constructor._getName() + ')');
  }

  /*
   * Overridden by ContentState and AdState. Should not be overriden elsewhere.
   */;
  _proto.isAdState = function isAdState() {
    throw new Error('isAdState unimplemented for ' + this.constructor._getName());
  }

  /*
   * Overridden by Preroll and Postroll. Midrolls jump right into the ad break
   * so there is no "waiting" state for them.
   */;
  _proto.isWaitingForAdBreak = function isWaitingForAdBreak() {
    return false;
  }

  /*
   * Overridden by Preroll, Midroll, and Postroll.
   */;
  _proto.isContentResuming = function isContentResuming() {
    return false;
  };
  _proto.inAdBreak = function inAdBreak() {
    return false;
  }

  /*
   * Invoke event handler methods when events come in.
   */;
  _proto.handleEvent = function handleEvent(type) {
    var player = this.player;
    if (type === 'play') {
      this.onPlay(player);
    } else if (type === 'adsready') {
      this.onAdsReady(player);
    } else if (type === 'adserror') {
      this.onAdsError(player);
    } else if (type === 'adscanceled') {
      this.onAdsCanceled(player);
    } else if (type === 'adtimeout') {
      this.onAdTimeout(player);
    } else if (type === 'ads-ad-started') {
      this.onAdStarted(player);
    } else if (type === 'ads-ad-skipped') {
      this.onAdSkipped(player);
    } else if (type === 'contentchanged') {
      this.onContentChanged(player);
    } else if (type === 'contentresumed') {
      this.onContentResumed(player);
    } else if (type === 'readyforpostroll') {
      this.onReadyForPostroll(player);
    } else if (type === 'playing') {
      this.onPlaying(player);
    } else if (type === 'ended') {
      this.onEnded(player);
    } else if (type === 'nopreroll') {
      this.onNoPreroll(player);
    } else if (type === 'nopostroll') {
      this.onNoPostroll(player);
    } else if (type === 'adended') {
      this.onAdEnded(player);
    }
  };
  return State;
}();
States.registerState('State', State);

/*
 * This class contains logic for all ads, be they prerolls, midrolls, or postrolls.
 * Primarily, this involves handling startLinearAdMode and endLinearAdMode.
 * It also handles content resuming.
 */
var AdState = /*#__PURE__*/function (_State) {
  _inheritsLoose(AdState, _State);
  function AdState(player) {
    var _this;
    _this = _State.call(this, player) || this;
    _this.contentResuming = false;
    _this.waitingForAdBreak = false;
    return _this;
  }

  /*
   * Overrides State.isAdState
   */
  var _proto = AdState.prototype;
  _proto.isAdState = function isAdState() {
    return true;
  }

  /*
   * We end the content-resuming process on the playing event because this is the exact
   * moment that content playback is no longer blocked by ads.
   */;
  _proto.onPlaying = function onPlaying() {
    var ContentPlayback = States.getState('ContentPlayback');
    if (this.contentResuming) {
      this.transitionTo(ContentPlayback);
    }
  }

  /*
   * If the ad plugin does not result in a playing event when resuming content after an
   * ad, they should instead trigger a contentresumed event to signal that content should
   * resume. The main use case for this is when ads are stitched into the content video.
   */;
  _proto.onContentResumed = function onContentResumed() {
    var ContentPlayback = States.getState('ContentPlayback');
    if (this.contentResuming) {
      this.transitionTo(ContentPlayback);
    }
  }

  /*
   * Check if we are in an ad state waiting for the ad plugin to start
   * an ad break.
   */;
  _proto.isWaitingForAdBreak = function isWaitingForAdBreak() {
    return this.waitingForAdBreak;
  }

  /*
   * Allows you to check if content is currently resuming after an ad break.
   */;
  _proto.isContentResuming = function isContentResuming() {
    return this.contentResuming;
  }

  /*
   * Allows you to check if an ad break is in progress.
   */;
  _proto.inAdBreak = function inAdBreak() {
    return this.player.ads._inLinearAdMode === true;
  };
  return AdState;
}(State);
States.registerState('AdState', AdState);

var ContentState = /*#__PURE__*/function (_State) {
  _inheritsLoose(ContentState, _State);
  function ContentState() {
    return _State.apply(this, arguments) || this;
  }
  var _proto = ContentState.prototype;
  /*
   * Overrides State.isAdState
   */
  _proto.isAdState = function isAdState() {
    return false;
  }

  /*
   * Source change sends you back to preroll checks. contentchanged does not
   * fire during ad breaks, so we don't need to worry about that.
   */;
  _proto.onContentChanged = function onContentChanged(player) {
    var BeforePreroll = States.getState('BeforePreroll');
    var Preroll = States.getState('Preroll');
    player.ads.debug('Received contentchanged event (ContentState)');
    if (player.paused()) {
      this.transitionTo(BeforePreroll);
    } else {
      this.transitionTo(Preroll, false);
      player.pause();
      player.ads._pausedOnContentupdate = true;
    }
  };
  return ContentState;
}(State);
States.registerState('ContentState', ContentState);

var ContentState$1 = States.getState('ContentState');
var AdsDone = /*#__PURE__*/function (_ContentState) {
  _inheritsLoose(AdsDone, _ContentState);
  function AdsDone() {
    return _ContentState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  AdsDone._getName = function _getName() {
    return 'AdsDone';
  }

  /*
   * For state transitions to work correctly, initialization should
   * happen here, not in a constructor.
   */;
  var _proto = AdsDone.prototype;
  _proto.init = function init(player) {
    // From now on, `ended` events won't be redispatched
    player.ads._contentHasEnded = true;
    player.trigger('ended');
  }

  /*
   * Midrolls do not play after ads are done.
   */;
  _proto.startLinearAdMode = function startLinearAdMode() {
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected startLinearAdMode invocation (AdsDone)');
  };
  return AdsDone;
}(ContentState$1);
States.registerState('AdsDone', AdsDone);

/*
The snapshot feature is responsible for saving the player state before an ad, then
restoring the player state after an ad.
*/
var tryToResumeTimeout_;

/*
 * Returns an object that captures the portions of player state relevant to
 * video playback. The result of this function can be passed to
 * restorePlayerSnapshot with a player to return the player to the state it
 * was in when this function was invoked.
 * @param {Object} player The videojs player object
 */
function getPlayerSnapshot(player) {
  var currentTime;
  if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_IOS && player.ads.isLive(player)) {
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
  var tracks = player.textTracks ? player.textTracks() : [];
  var suppressedTracks = [];
  var snapshotObject = {
    ended: player.ended(),
    currentSrc: player.currentSrc(),
    sources: player.currentSources(),
    src: player.tech_.src(),
    currentTime: currentTime,
    type: player.currentType()
  };
  if (tech) {
    snapshotObject.style = tech.getAttribute('style');
  }
  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    suppressedTracks.push({
      track: track,
      mode: track.mode
    });
    track.mode = 'disabled';
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
function restorePlayerSnapshot(player, callback) {
  var snapshotObject = player.ads.snapshot;
  if (callback === undefined) {
    callback = function callback() {};
  }
  if (player.ads.disableNextSnapshotRestore === true) {
    player.ads.disableNextSnapshotRestore = false;
    delete player.ads.snapshot;
    callback();
    return;
  }

  // The playback tech
  var tech = player.$('.vjs-tech');

  // the number of[ remaining attempts to restore the snapshot
  var attempts = 20;
  var suppressedTracks = snapshotObject.suppressedTracks;
  var trackSnapshot;
  var restoreTracks = function restoreTracks() {
    for (var i = 0; i < suppressedTracks.length; i++) {
      trackSnapshot = suppressedTracks[i];
      trackSnapshot.track.mode = trackSnapshot.mode;
    }
  };

  // Finish restoring the playback state.
  // This only happens if the content video element was reused for ad playback.
  var resume = function resume() {
    var currentTime;

    // Live video on iOS has special logic to try to seek to the right place after
    // an ad.
    if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_IOS && player.ads.isLive(player)) {
      if (snapshotObject.currentTime < 0) {
        // Playback was behind real time, so seek backwards to match
        if (player.seekable().length > 0) {
          currentTime = player.seekable().end(0) + snapshotObject.currentTime;
        } else {
          currentTime = player.currentTime();
        }
        player.currentTime(currentTime);
      }

      // iOS live play after restore if player was paused (would not be paused if
      // ad played muted behind ad)
      if (player.paused()) {
        var playPromise = player.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function (error) {
            video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Play promise rejected in IOS snapshot resume', error);
          });
        }
      }

      // Restore the video position after an ad.
      // We check snapshotObject.ended because the content starts at the beginning again
      // after being restored.
    } else if (snapshotObject.ended) {
      // For postrolls, seek to the player's current duration.
      // It could be different from the snapshot's currentTime due to
      // inaccuracy in HLS.
      player.currentTime(player.duration());
    } else {
      // Prerolls and midrolls, just seek to the player time before the ad.
      player.currentTime(snapshotObject.currentTime);
      var _playPromise = player.play();
      if (_playPromise && _playPromise.catch) {
        _playPromise.catch(function (error) {
          video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Play promise rejected in snapshot resume', error);
        });
      }
    }

    // if we added autoplay to force content loading on iOS, remove it now
    // that it has served its purpose
    if (player.ads.shouldRemoveAutoplay_) {
      player.autoplay(false);
      player.ads.shouldRemoveAutoplay_ = false;
    }
  };

  // Determine if the video element has loaded enough of the snapshot source
  // to be ready to apply the rest of the state.
  // This only happens if the content video element was reused for ad playback.
  var tryToResume = function tryToResume() {
    // tryToResume can either have been called through the `contentcanplay`
    // event or fired through setTimeout.
    // When tryToResume is called, we should make sure to clear out the other
    // way it could've been called by removing the listener and clearing out
    // the timeout.
    player.off('contentcanplay', tryToResume);
    if (tryToResumeTimeout_) {
      player.clearTimeout(tryToResumeTimeout_);
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
      player.setTimeout(tryToResume, 50);
    } else {
      try {
        resume();
      } catch (e) {
        video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Failed to resume the content after an advertisement', e);
      }
    }
  };
  if ('style' in snapshotObject) {
    // overwrite all css style properties to restore state precisely
    tech.setAttribute('style', snapshotObject.style || '');
  }

  // Determine whether the player needs to be restored to its state
  // before ad playback began. With a custom ad display or burned-in
  // ads, the content player state hasn't been modified and so no
  // restoration is required

  if (player.ads.videoElementRecycled()) {
    // Snapshot restore is done, so now we're really finished.
    player.one('resumeended', function () {
      delete player.ads.snapshot;
      callback();
    });

    // on ios7, fiddling with textTracks too early will cause safari to crash
    player.one('contentloadedmetadata', restoreTracks);

    // adding autoplay guarantees that Safari will load the content so we can
    // seek back to the correct time after ads.
    // This is done directly on the html5 tech because if the integration has set
    // normalizeAutoplay to true, the async play request via autoplay -> manualAutoplay_
    // causes a visible skipback of the content after the ad break
    if ((video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_IOS && !player.autoplay() && typeof player.techCall_ === 'function') {
      player.techCall_('setAutoplay', true);

      // if we get here, the player was not originally configured to autoplay,
      // so we should remove it after it has served its purpose
      player.ads.shouldRemoveAutoplay_ = true;
    }

    // if the src changed for ad playback, reset it
    player.src(snapshotObject.sources);

    // and then resume from the snapshots time once the original src has loaded
    // in some browsers (firefox) `canplay` may not fire correctly.
    // Reace the `canplay` event with a timeout.
    player.one('contentcanplay', tryToResume);
    tryToResumeTimeout_ = player.setTimeout(tryToResume, 2000);
  } else {
    // if we didn't change the src, just restore the tracks
    restoreTracks();

    // we don't need to check snapshotObject.ended here because the content video
    // element wasn't recycled
    if (!player.ended()) {
      // the src didn't change and this wasn't a postroll
      // just resume playback at the current time.
      var playPromise = player.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function (error) {
          video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Play promise rejected in snapshot restore', error);
        });
      }
    }

    // snapshot restore is complete
    delete player.ads.snapshot;
    callback();
  }
}

/*
 * Encapsulates logic for starting and ending ad breaks. An ad break
 * is the time between startLinearAdMode and endLinearAdMode. The ad
 * plugin may play 0 or more ads during this time.
 */
function start(player) {
  player.ads.debug('Starting ad break');
  player.ads._inLinearAdMode = true;

  // No longer does anything, used to move us to ad-playback
  player.trigger('adstart');

  // Capture current player state snapshot
  if (player.ads.shouldTakeSnapshots()) {
    player.ads.snapshot = getPlayerSnapshot(player);
  }

  // Mute the player behind the ad
  if (player.ads.shouldPlayContentBehindAd(player)) {
    player.ads.preAdVolume_ = player.volume();
    player.volume(0);
  }

  // Add css to the element to indicate and ad is playing.
  player.addClass('vjs-ad-playing');

  // We should remove the vjs-live class if it has been added in order to
  // show the adprogress control bar on Android devices for falsely
  // determined LIVE videos due to the duration incorrectly reported as Infinity
  if (player.hasClass('vjs-live')) {
    player.removeClass('vjs-live');
  }

  // This removes the native poster so the ads don't show the content
  // poster if content element is reused for ad playback.
  player.ads.removeNativePoster();

  // Ensure ads are watched at x1 speed and speed cannot be changed for the duration of the ad
  player.ads.preAdPlaybackRate_ = player.playbackRate();
  player.playbackRate(1);
  if (player.controlBar && player.controlBar.playbackRateMenuButton && player.controlBar.playbackRateMenuButton.playbackRateSupported && !player.controlBar.playbackRateMenuButton.hasClass('vjs-hidden')) {
    player.controlBar.playbackRateMenuButton.hide();
    player.ads.showPlaybackMenuOnAdEnd_ = true;
  } else {
    player.ads.showPlaybackMenuOnAdEnd_ = false;
  }
}
function end(player, callback) {
  player.ads.debug('Ending ad break');
  if (callback === undefined) {
    callback = function callback() {};
  }
  player.ads.adType = null;
  player.ads._inLinearAdMode = false;

  // Signals the end of the ad break to anyone listening.
  player.trigger('adend');
  player.removeClass('vjs-ad-playing');

  // We should add the vjs-live class back if the video is a LIVE video
  // If we dont do this, then for a LIVE Video, we will get an incorrect
  // styled control, which displays the time for the video
  if (player.ads.isLive(player)) {
    player.addClass('vjs-live');
  }

  // Restore snapshot
  if (player.ads.shouldTakeSnapshots()) {
    restorePlayerSnapshot(player, callback);

    // Reset the volume to pre-ad levels
  } else {
    player.volume(player.ads.preAdVolume_);
    callback();
  }

  // Reset playback
  player.playbackRate(player.ads.preAdPlaybackRate_);
  if (player.ads.showPlaybackMenuOnAdEnd_) {
    player.controlBar.playbackRateMenuButton.show();
  }
}
var obj$1 = {
  start: start,
  end: end
};

var AdState$1 = States.getState('AdState');

/*
 * This state encapsulates waiting for prerolls, preroll playback, and
 * content restoration after a preroll.
 */
var Preroll = /*#__PURE__*/function (_AdState) {
  _inheritsLoose(Preroll, _AdState);
  function Preroll() {
    return _AdState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  Preroll._getName = function _getName() {
    return 'Preroll';
  }

  /*
   * For state transitions to work correctly, initialization should
   * happen here, not in a constructor.
   */;
  var _proto = Preroll.prototype;
  _proto.init = function init(player, adsReady, shouldResumeToContent) {
    this.waitingForAdBreak = true;

    // Loading spinner from now until ad start or end of ad break.
    player.addClass('vjs-ad-loading');

    // If adserror, adscanceled, nopreroll or skipLinearAdMode already
    // ocurred, resume to content immediately
    if (shouldResumeToContent || player.ads.nopreroll_) {
      return this.resumeAfterNoPreroll(player);
    }

    // Determine preroll timeout based on plugin settings
    var timeout = player.ads.settings.timeout;
    if (typeof player.ads.settings.prerollTimeout === 'number') {
      timeout = player.ads.settings.prerollTimeout;
    }

    // Start the clock ticking for ad timeout
    this._timeout = player.setTimeout(function () {
      player.trigger('adtimeout');
    }, timeout);

    // If adsready already happened, lets get started. Otherwise,
    // wait until onAdsReady.
    if (adsReady) {
      this.handleAdsReady();
    } else {
      this.adsReady = false;
    }
  }

  /*
   * Adsready event after play event.
   */;
  _proto.onAdsReady = function onAdsReady(player) {
    if (!player.ads.inAdBreak()) {
      player.ads.debug('Received adsready event (Preroll)');
      this.handleAdsReady();
    } else {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected adsready event (Preroll)');
    }
  }

  /*
   * Ad plugin is ready. Let's get started on this preroll.
   */;
  _proto.handleAdsReady = function handleAdsReady() {
    this.adsReady = true;
    this.readyForPreroll();
  }

  /*
   * Helper to call a callback only after a loadstart event.
   * If we start content or ads before loadstart, loadstart
   * will not be prefixed correctly.
   */;
  _proto.afterLoadStart = function afterLoadStart(callback) {
    var player = this.player;
    if (player.ads._hasThereBeenALoadStartDuringPlayerLife) {
      callback();
    } else {
      player.ads.debug('Waiting for loadstart...');
      player.one('loadstart', function () {
        player.ads.debug('Received loadstart event');
        callback();
      });
    }
  }

  /*
   * If there is no preroll, play content instead.
   */;
  _proto.noPreroll = function noPreroll() {
    var _this = this;
    this.afterLoadStart(function () {
      _this.player.ads.debug('Skipping prerolls due to nopreroll event (Preroll)');
      _this.resumeAfterNoPreroll(_this.player);
    });
  }

  /*
   * Fire the readyforpreroll event. If loadstart hasn't happened yet,
   * wait until loadstart first.
   */;
  _proto.readyForPreroll = function readyForPreroll() {
    var player = this.player;
    this.afterLoadStart(function () {
      player.ads.debug('Triggered readyforpreroll event (Preroll)');
      player.trigger('readyforpreroll');
    });
  }

  /*
   * adscanceled cancels all ads for the source. Play content now.
   */;
  _proto.onAdsCanceled = function onAdsCanceled(player) {
    var _this2 = this;
    player.ads.debug('adscanceled (Preroll)');
    this.afterLoadStart(function () {
      _this2.resumeAfterNoPreroll(player);
    });
  }

  /*
   * An ad error occured. Play content instead.
   */;
  _proto.onAdsError = function onAdsError(player) {
    var _this3 = this;
    video_js__WEBPACK_IMPORTED_MODULE_0___default().log('adserror (Preroll)');
    // In the future, we may not want to do this automatically.
    // Ad plugins should be able to choose to continue the ad break
    // if there was an error.
    if (this.inAdBreak()) {
      player.ads.endLinearAdMode();
    } else {
      this.afterLoadStart(function () {
        _this3.resumeAfterNoPreroll(player);
      });
    }
  }
  /*
   * Ad plugin invoked startLinearAdMode, the ad break starts now.
   */;
  _proto.startLinearAdMode = function startLinearAdMode() {
    var player = this.player;
    if (this.adsReady && !player.ads.inAdBreak() && !this.isContentResuming()) {
      this.clearTimeout(player);
      player.ads.adType = 'preroll';
      this.waitingForAdBreak = false;
      obj$1.start(player);

      // We don't need to block play calls anymore
      player.ads._shouldBlockPlay = false;
    } else {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected startLinearAdMode invocation (Preroll)');
    }
  }

  /*
   * An ad has actually started playing.
   * Remove the loading spinner.
   */;
  _proto.onAdStarted = function onAdStarted(player) {
    player.removeClass('vjs-ad-loading');
  }

  /*
   * Ad plugin invoked endLinearAdMode, the ad break ends now.
   */;
  _proto.endLinearAdMode = function endLinearAdMode() {
    var player = this.player;
    if (this.inAdBreak()) {
      player.removeClass('vjs-ad-loading');
      player.addClass('vjs-ad-content-resuming');
      this.contentResuming = true;
      obj$1.end(player);
    }
  }

  /*
   * Ad skipped by ad plugin. Play content instead.
   */;
  _proto.skipLinearAdMode = function skipLinearAdMode() {
    var _this4 = this;
    var player = this.player;
    if (player.ads.inAdBreak() || this.isContentResuming()) {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected skipLinearAdMode invocation');
    } else {
      this.afterLoadStart(function () {
        player.trigger('adskip');
        player.ads.debug('skipLinearAdMode (Preroll)');
        _this4.resumeAfterNoPreroll(player);
      });
    }
  }

  /*
   * Prerolls took too long! Play content instead.
   */;
  _proto.onAdTimeout = function onAdTimeout(player) {
    var _this5 = this;
    this.afterLoadStart(function () {
      player.ads.debug('adtimeout (Preroll)');
      _this5.resumeAfterNoPreroll(player);
    });
  }

  /*
   * Check if nopreroll event was too late before handling it.
   */;
  _proto.onNoPreroll = function onNoPreroll(player) {
    if (player.ads.inAdBreak() || this.isContentResuming()) {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected nopreroll event (Preroll)');
    } else {
      this.noPreroll();
    }
  };
  _proto.resumeAfterNoPreroll = function resumeAfterNoPreroll(player) {
    // Resume to content and unblock play as there is no preroll ad
    this.contentResuming = true;
    player.ads._shouldBlockPlay = false;
    this.cleanupPartial(player);

    // Play the content if we had requested play or we paused on 'contentupdate'
    // and we haven't played yet. This happens if there was no preroll or if it
    // errored, timed out, etc. Otherwise snapshot restore would play.
    if (player.ads._playRequested || player.ads._pausedOnContentupdate) {
      if (player.paused()) {
        player.ads.debug('resumeAfterNoPreroll: attempting to resume playback (Preroll)');
        var playPromise = player.play();
        if (playPromise && playPromise.then) {
          playPromise.then(null, function (e) {});
        }
      } else {
        player.ads.debug('resumeAfterNoPreroll: already playing (Preroll)');
        player.trigger('play');
        player.trigger('playing');
      }
    }
  }

  /*
   * Cleanup timeouts and spinner.
   */;
  _proto.cleanup = function cleanup(player) {
    if (!player.ads._hasThereBeenALoadStartDuringPlayerLife) {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Leaving Preroll state before loadstart event can cause issues.');
    }
    this.cleanupPartial(player);
  }

  /*
   * Performs cleanup tasks without depending on a state transition. This is
   * used mainly in cases where a preroll failed.
   */;
  _proto.cleanupPartial = function cleanupPartial(player) {
    player.removeClass('vjs-ad-loading');
    player.removeClass('vjs-ad-content-resuming');
    this.clearTimeout(player);
  }

  /*
   * Clear the preroll timeout and nulls out the pointer.
   */;
  _proto.clearTimeout = function clearTimeout(player) {
    player.clearTimeout(this._timeout);
    this._timeout = null;
  };
  return Preroll;
}(AdState$1);
States.registerState('Preroll', Preroll);

var ContentState$2 = States.getState('ContentState');

/*
 * This is the initial state for a player with an ad plugin. Normally, it remains in this
 * state until a "play" event is seen. After that, we enter the Preroll state to check for
 * prerolls. This happens regardless of whether or not any prerolls ultimately will play.
 * Errors and other conditions may lead us directly from here to ContentPlayback.
 */
var BeforePreroll = /*#__PURE__*/function (_ContentState) {
  _inheritsLoose(BeforePreroll, _ContentState);
  function BeforePreroll() {
    return _ContentState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  BeforePreroll._getName = function _getName() {
    return 'BeforePreroll';
  }

  /*
   * For state transitions to work correctly, initialization should
   * happen here, not in a constructor.
   */;
  var _proto = BeforePreroll.prototype;
  _proto.init = function init(player) {
    this.adsReady = false;
    this.shouldResumeToContent = false;

    // Content playback should be blocked by callPlay() middleware if the allowVjsAutoplay
    // option hasn't been provided and autoplay is not desired.
    player.ads._shouldBlockPlay = player.ads.settings.allowVjsAutoplay ? !player.autoplay() : true;
  }

  /*
   * The ad plugin may trigger adsready before the play request. If so,
   * we record that adsready already happened so the Preroll state will know.
   */;
  _proto.onAdsReady = function onAdsReady(player) {
    player.ads.debug('Received adsready event (BeforePreroll)');
    this.adsReady = true;
  }

  /*
   * Ad mode officially begins on the play request, because at this point
   * content playback is blocked by the ad plugin.
   */;
  _proto.onPlay = function onPlay(player) {
    var Preroll = States.getState('Preroll');
    player.ads.debug('Received play event (BeforePreroll)');

    // Check for prerolls
    this.transitionTo(Preroll, this.adsReady, this.shouldResumeToContent);
  }

  /*
   * All ads for the entire video are canceled.
   */;
  _proto.onAdsCanceled = function onAdsCanceled(player) {
    player.ads.debug('adscanceled (BeforePreroll)');
    this.shouldResumeToContent = true;
  }

  /*
   * An ad error occured. Play content instead.
   */;
  _proto.onAdsError = function onAdsError() {
    this.player.ads.debug('adserror (BeforePreroll)');
    this.shouldResumeToContent = true;
  }

  /*
   * If there is no preroll, don't wait for a play event to move forward.
   */;
  _proto.onNoPreroll = function onNoPreroll() {
    this.player.ads.debug('Skipping prerolls due to nopreroll event (BeforePreroll)');
    this.shouldResumeToContent = true;
  }

  /*
   * Prerolls skipped by ad plugin. Play content instead.
   */;
  _proto.skipLinearAdMode = function skipLinearAdMode() {
    var player = this.player;
    player.trigger('adskip');
    player.ads.debug('skipLinearAdMode (BeforePreroll)');
    this.shouldResumeToContent = true;
  };
  _proto.onContentChanged = function onContentChanged() {
    this.init(this.player);
  };
  return BeforePreroll;
}(ContentState$2);
States.registerState('BeforePreroll', BeforePreroll);

var AdState$2 = States.getState('AdState');
var Midroll = /*#__PURE__*/function (_AdState) {
  _inheritsLoose(Midroll, _AdState);
  function Midroll() {
    return _AdState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  Midroll._getName = function _getName() {
    return 'Midroll';
  }

  /*
   * Midroll breaks happen when the ad plugin calls startLinearAdMode,
   * which can happen at any time during content playback.
   */;
  var _proto = Midroll.prototype;
  _proto.init = function init(player) {
    player.ads.adType = 'midroll';
    obj$1.start(player);
    player.addClass('vjs-ad-loading');
  }

  /*
   * An ad has actually started playing.
   * Remove the loading spinner.
   */;
  _proto.onAdStarted = function onAdStarted(player) {
    player.removeClass('vjs-ad-loading');
  }

  /*
   * Midroll break is done.
   */;
  _proto.endLinearAdMode = function endLinearAdMode() {
    var player = this.player;
    if (this.inAdBreak()) {
      this.contentResuming = true;
      player.addClass('vjs-ad-content-resuming');
      player.removeClass('vjs-ad-loading');
      obj$1.end(player);
    }
  }

  /*
   * End midroll break if there is an error.
   */;
  _proto.onAdsError = function onAdsError(player) {
    // In the future, we may not want to do this automatically.
    // Ad plugins should be able to choose to continue the ad break
    // if there was an error.
    if (this.inAdBreak()) {
      player.ads.endLinearAdMode();
    }
  }

  /*
   * Cleanup CSS classes.
   */;
  _proto.cleanup = function cleanup(player) {
    player.removeClass('vjs-ad-loading');
    player.removeClass('vjs-ad-content-resuming');
  };
  return Midroll;
}(AdState$2);
States.registerState('Midroll', Midroll);

var AdState$3 = States.getState('AdState');
var Postroll = /*#__PURE__*/function (_AdState) {
  _inheritsLoose(Postroll, _AdState);
  function Postroll() {
    return _AdState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  Postroll._getName = function _getName() {
    return 'Postroll';
  }

  /*
   * For state transitions to work correctly, initialization should
   * happen here, not in a constructor.
   */;
  var _proto = Postroll.prototype;
  _proto.init = function init(player) {
    this.waitingForAdBreak = true;

    // Legacy name that now simply means "handling postrolls".
    player.ads._contentEnding = true;

    // Start postroll process.
    if (!player.ads.nopostroll_) {
      player.addClass('vjs-ad-loading');

      // Determine postroll timeout based on plugin settings
      var timeout = player.ads.settings.timeout;
      if (typeof player.ads.settings.postrollTimeout === 'number') {
        timeout = player.ads.settings.postrollTimeout;
      }
      this._postrollTimeout = player.setTimeout(function () {
        player.trigger('adtimeout');
      }, timeout);

      // No postroll, ads are done
    } else {
      this.resumeContent(player);
      var AdsDone = States.getState('AdsDone');
      this.transitionTo(AdsDone);
    }
  }

  /*
   * Start the postroll if it's not too late.
   */;
  _proto.startLinearAdMode = function startLinearAdMode() {
    var player = this.player;
    if (!player.ads.inAdBreak() && !this.isContentResuming()) {
      player.ads.adType = 'postroll';
      player.clearTimeout(this._postrollTimeout);
      this.waitingForAdBreak = false;
      obj$1.start(player);
    } else {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected startLinearAdMode invocation (Postroll)');
    }
  }

  /*
   * An ad has actually started playing.
   * Remove the loading spinner.
   */;
  _proto.onAdStarted = function onAdStarted(player) {
    player.removeClass('vjs-ad-loading');
  }

  /*
   * Ending a postroll triggers the ended event.
   */;
  _proto.endLinearAdMode = function endLinearAdMode() {
    var _this = this;
    var player = this.player;
    var AdsDone = States.getState('AdsDone');
    if (this.inAdBreak()) {
      player.removeClass('vjs-ad-loading');
      this.resumeContent(player);
      obj$1.end(player, function () {
        _this.transitionTo(AdsDone);
      });
    }
  }

  /*
   * Postroll skipped, time to clean up.
   */;
  _proto.skipLinearAdMode = function skipLinearAdMode() {
    var player = this.player;
    if (player.ads.inAdBreak() || this.isContentResuming()) {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected skipLinearAdMode invocation');
    } else {
      player.ads.debug('Postroll abort (skipLinearAdMode)');
      player.trigger('adskip');
      this.abort(player);
    }
  }

  /*
   * Postroll timed out, time to clean up.
   */;
  _proto.onAdTimeout = function onAdTimeout(player) {
    player.ads.debug('Postroll abort (adtimeout)');
    this.abort(player);
  }

  /*
   * Postroll errored out, time to clean up.
   */;
  _proto.onAdsError = function onAdsError(player) {
    player.ads.debug('Postroll abort (adserror)');

    // In the future, we may not want to do this automatically.
    // Ad plugins should be able to choose to continue the ad break
    // if there was an error.
    if (player.ads.inAdBreak()) {
      player.ads.endLinearAdMode();
    } else {
      this.abort(player);
    }
  }

  /*
   * Handle content change if we're not in an ad break.
   */;
  _proto.onContentChanged = function onContentChanged(player) {
    // Content resuming after Postroll. Content is paused
    // at this point, since it is done playing.
    if (this.isContentResuming()) {
      var BeforePreroll = States.getState('BeforePreroll');
      this.transitionTo(BeforePreroll);

      // Waiting for postroll to start. Content is considered playing
      // at this point, since it had to be playing to start the postroll.
    } else if (!this.inAdBreak()) {
      var Preroll = States.getState('Preroll');
      this.transitionTo(Preroll);
    }
  }

  /*
   * Wrap up if there is no postroll.
   */;
  _proto.onNoPostroll = function onNoPostroll(player) {
    if (!this.isContentResuming() && !this.inAdBreak()) {
      this.abort(player);
    } else {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Unexpected nopostroll event (Postroll)');
    }
  };
  _proto.resumeContent = function resumeContent(player) {
    this.contentResuming = true;
    player.addClass('vjs-ad-content-resuming');
  }

  /*
   * Helper for ending Postrolls. In the future we may want to
   * refactor this class so that `cleanup` handles all of this.
   */;
  _proto.abort = function abort(player) {
    var AdsDone = States.getState('AdsDone');
    this.resumeContent(player);
    player.removeClass('vjs-ad-loading');
    this.transitionTo(AdsDone);
  }

  /*
   * Cleanup timeouts and state.
   */;
  _proto.cleanup = function cleanup(player) {
    player.removeClass('vjs-ad-content-resuming');
    player.clearTimeout(this._postrollTimeout);
    player.ads._contentEnding = false;
  };
  return Postroll;
}(AdState$3);
States.registerState('Postroll', Postroll);

var ContentState$3 = States.getState('ContentState');

/*
 * This state represents content playback the first time through before
 * content ends. After content has ended once, we check for postrolls and
 * move on to the AdsDone state rather than returning here.
 */
var ContentPlayback = /*#__PURE__*/function (_ContentState) {
  _inheritsLoose(ContentPlayback, _ContentState);
  function ContentPlayback() {
    return _ContentState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  ContentPlayback._getName = function _getName() {
    return 'ContentPlayback';
  }

  /*
   * For state transitions to work correctly, initialization should
   * happen here, not in a constructor.
   */;
  var _proto = ContentPlayback.prototype;
  _proto.init = function init(player) {
    // Don't block calls to play in content playback
    player.ads._shouldBlockPlay = false;
  }

  /*
   * In the case of a timeout, adsready might come in late. This assumes the behavior
   * that if an ad times out, it could still interrupt the content and start playing.
   * An ad plugin could behave otherwise by ignoring this event.
   */;
  _proto.onAdsReady = function onAdsReady(player) {
    player.ads.debug('Received adsready event (ContentPlayback)');
    if (!player.ads.nopreroll_) {
      player.ads.debug('Triggered readyforpreroll event (ContentPlayback)');
      player.trigger('readyforpreroll');
    }
  }

  /*
   * Content ended before postroll checks.
   */;
  _proto.onReadyForPostroll = function onReadyForPostroll(player) {
    var Postroll = States.getState('Postroll');
    player.ads.debug('Received readyforpostroll event');
    this.transitionTo(Postroll);
  }

  /*
   * This is how midrolls start.
   */;
  _proto.startLinearAdMode = function startLinearAdMode() {
    var Midroll = States.getState('Midroll');
    this.transitionTo(Midroll);
  };
  return ContentPlayback;
}(ContentState$3);
States.registerState('ContentPlayback', ContentPlayback);

var ContentState$4 = States.getState('ContentState');

/*
 * This state represents content playback when stitched ads are in play.
 */
var StitchedContentPlayback = /*#__PURE__*/function (_ContentState) {
  _inheritsLoose(StitchedContentPlayback, _ContentState);
  function StitchedContentPlayback() {
    return _ContentState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  StitchedContentPlayback._getName = function _getName() {
    return 'StitchedContentPlayback';
  }

  /*
   * For state transitions to work correctly, initialization should
   * happen here, not in a constructor.
   */;
  var _proto = StitchedContentPlayback.prototype;
  _proto.init = function init() {
    // Don't block calls to play in stitched ad players, ever.
    this.player.ads._shouldBlockPlay = false;
  }

  /*
   * Source change does not do anything for stitched ad players.
   * contentchanged does not fire during ad breaks, so we don't need to
   * worry about that.
   */;
  _proto.onContentChanged = function onContentChanged() {
    this.player.ads.debug("Received contentchanged event (" + this.constructor._getName() + ")");
  }

  /*
   * This is how stitched ads start.
   */;
  _proto.startLinearAdMode = function startLinearAdMode() {
    var StitchedAdRoll = States.getState('StitchedAdRoll');
    this.transitionTo(StitchedAdRoll);
  };
  return StitchedContentPlayback;
}(ContentState$4);
States.registerState('StitchedContentPlayback', StitchedContentPlayback);

var AdState$4 = States.getState('AdState');
var StitchedAdRoll = /*#__PURE__*/function (_AdState) {
  _inheritsLoose(StitchedAdRoll, _AdState);
  function StitchedAdRoll() {
    return _AdState.apply(this, arguments) || this;
  }
  /*
   * Allows state name to be logged even after minification.
   */
  StitchedAdRoll._getName = function _getName() {
    return 'StitchedAdRoll';
  }

  /*
   * StitchedAdRoll breaks happen when the ad plugin calls startLinearAdMode,
   * which can happen at any time during content playback.
   */;
  var _proto = StitchedAdRoll.prototype;
  _proto.init = function init() {
    this.waitingForAdBreak = false;
    this.contentResuming = false;
    this.player.ads.adType = 'stitched';
    obj$1.start(this.player);
  }

  /*
   * For stitched ads, there is no "content resuming" scenario, so a "playing"
   * event is not relevant.
   */;
  _proto.onPlaying = function onPlaying() {}

  /*
   * For stitched ads, there is no "content resuming" scenario, so a
   * "contentresumed" event is not relevant.
   */;
  _proto.onContentResumed = function onContentResumed() {}

  /*
   * When we see an "adended" event, it means that we are in a postroll that
   * has ended (because the media ended and we are still in an ad state).
   *
   * In these cases, we transition back to content mode and fire ended.
   */;
  _proto.onAdEnded = function onAdEnded() {
    this.endLinearAdMode();
    this.player.trigger('ended');
  }

  /*
   * StitchedAdRoll break is done.
   */;
  _proto.endLinearAdMode = function endLinearAdMode() {
    var StitchedContentPlayback = States.getState('StitchedContentPlayback');
    obj$1.end(this.player);
    this.transitionTo(StitchedContentPlayback);
  };
  return StitchedAdRoll;
}(AdState$4);
States.registerState('StitchedAdRoll', StitchedAdRoll);

/*
This main plugin file is responsible for the public API and enabling the features
that live in in separate files.
*/
var isMiddlewareMediatorSupported$1 = obj.isMiddlewareMediatorSupported;
var VIDEO_EVENTS = video_js__WEBPACK_IMPORTED_MODULE_0___default().getTech('Html5').Events;

// Default settings
var defaults = {
  // Maximum amount of time in ms to wait to receive `adsready` from the ad
  // implementation after play has been requested. Ad implementations are
  // expected to load any dynamic libraries and make any requests to determine
  // ad policies for a video during this time.
  timeout: 5000,
  // Maximum amount of time in ms to wait for the ad implementation to start
  // linear ad mode after `readyforpreroll` has fired. This is in addition to
  // the standard timeout.
  prerollTimeout: undefined,
  // Maximum amount of time in ms to wait for the ad implementation to start
  // linear ad mode after `readyforpostroll` has fired.
  postrollTimeout: undefined,
  // When truthy, instructs the plugin to output additional information about
  // plugin state to the video.js log. On most devices, the video.js log is
  // the same as the developer console.
  debug: false,
  // Set this to true when using ads that are part of the content video
  stitchedAds: false,
  // Force content to be treated as live or not live
  // if not defined, the code will try to infer if content is live,
  // which can have limitations.
  contentIsLive: undefined,
  // If set to true, content will play muted behind ads on supported platforms. This is
  // to support ads on video metadata cuepoints during a live stream. It also results in
  // more precise resumes after ads during a live stream.
  liveCuePoints: true,
  // If set to true, callPlay middleware will not terminate the first play request in
  // BeforePreroll if the player intends to autoplay. This allows the manual autoplay
  // attempt made by video.js to resolve/reject naturally and trigger an 'autoplay-success'
  // or 'autoplay-failure' event with which other plugins can interface.
  allowVjsAutoplay: (video_js__WEBPACK_IMPORTED_MODULE_0___default().options).normalizeAutoplay || false
};
var contribAdsPlugin = function contribAdsPlugin(options) {
  var player = this; // eslint-disable-line consistent-this

  var settings = video_js__WEBPACK_IMPORTED_MODULE_0___default().obj.merge(defaults, options);

  // Prefix all video element events during ad playback
  // if the video element emits ad-related events directly,
  // plugins that aren't ad-aware will break. prefixing allows
  // plugins that wish to handle ad events to do so while
  // avoiding the complexity for common usage
  var videoEvents = [];

  // dedupe event names
  VIDEO_EVENTS.concat(['firstplay', 'loadedalldata']).forEach(function (eventName) {
    if (videoEvents.indexOf(eventName) === -1) {
      videoEvents.push(eventName);
    }
  });

  // Set up redispatching of player events
  player.on(videoEvents, redispatch);

  // Set up features to block content playback while waiting for ads.
  // Play middleware is only supported on later versions of video.js
  // and on desktop currently(as the user-gesture requirement on mobile
  // will disallow calling play once play blocking is lifted)
  // The middleware must also be registered outside of the plugin,
  // to avoid a middleware factory being created for each player
  if (!isMiddlewareMediatorSupported$1()) {
    initCancelContentPlay(player, settings.debug);
  }

  // If we haven't seen a loadstart after 5 seconds, the plugin was not initialized
  // correctly.
  player.setTimeout(function () {
    if (!player.ads._hasThereBeenALoadStartDuringPlayerLife && player.src() !== '') {
      video_js__WEBPACK_IMPORTED_MODULE_0___default().log.error('videojs-contrib-ads has not seen a loadstart event 5 seconds ' + 'after being initialized, but a source is present. This indicates that ' + 'videojs-contrib-ads was initialized too late. It must be initialized ' + 'immediately after video.js in the same tick. As a result, some ads will not ' + 'play and some media events will be incorrect. For more information, see ' + 'http://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html');
    }
  }, 5000);

  // "vjs-has-started" should be present at the end of a video. This makes sure it's
  // always there.
  player.on('ended', function () {
    if (!player.hasClass('vjs-has-started')) {
      player.addClass('vjs-has-started');
    }
  });

  // video.js removes the vjs-waiting class on timeupdate. We want
  // to make sure this still happens during content restoration.
  player.on('contenttimeupdate', function () {
    player.removeClass('vjs-waiting');
  });

  // We now auto-play when an ad gets loaded if we're playing ads in the same video
  // element as the content.
  // The problem is that in IE11, we cannot play in addurationchange but in iOS8, we
  // cannot play from adcanplay.
  // This will prevent ad plugins from needing to do this themselves.
  player.on(['addurationchange', 'adcanplay'], function () {
    // We don't need to handle this for stitched ads because
    // linear ads in such cases are stitched into the content.
    if (player.ads.settings.stitchedAds) {
      return;
    }
    // Some techs may retrigger canplay after playback has begun.
    // So we want to procceed only if playback hasn't started.
    if (player.hasStarted()) {
      return;
    }
    if (player.ads.snapshot && player.currentSrc() === player.ads.snapshot.currentSrc) {
      return;
    }

    // If an ad isn't playing, don't try to play an ad. This could result from prefixed
    // events when the player is blocked by a preroll check, but there is no preroll.
    if (!player.ads.inAdBreak()) {
      return;
    }
    var playPromise = player.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function (error) {
        video_js__WEBPACK_IMPORTED_MODULE_0___default().log.warn('Play promise rejected when playing ad', error);
      });
    }
  });
  player.on('nopreroll', function () {
    player.ads.debug('Received nopreroll event');
    player.ads.nopreroll_ = true;
  });
  player.on('nopostroll', function () {
    player.ads.debug('Received nopostroll event');
    player.ads.nopostroll_ = true;
  });

  // Restart the cancelContentPlay process.
  player.on('playing', function () {
    player.ads._cancelledPlay = false;
    player.ads._pausedOnContentupdate = false;
  });

  // Keep track of whether a play event has happened
  player.on('play', function () {
    player.ads._playRequested = true;
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
  player.ads = getAds(player);
  player.ads.settings = settings;

  // Set the stitched ads state. This needs to happen before the `_state` is
  // initialized below - BeforePreroll needs to know whether contrib-ads is
  // playing stitched ads or not.
  // The setter is deprecated, so this does not use it.
  // But first, cast to boolean.
  settings.stitchedAds = !!settings.stitchedAds;
  if (settings.stitchedAds) {
    player.ads._state = new (States.getState('StitchedContentPlayback'))(player);
  } else {
    player.ads._state = new (States.getState('BeforePreroll'))(player);
  }
  player.ads._state.init(player);
  player.ads.cueTextTracks = cueTextTracks;
  player.ads.adMacroReplacement = adMacroReplacement.bind(player);

  // Start sending contentupdate and contentchanged events for this player
  initializeContentupdate(player);

  // Global contentchanged handler for resetting plugin state
  player.on('contentchanged', player.ads.reset);

  // A utility method for textTrackChangeHandler to define the conditions
  // when text tracks should be disabled.
  // Currently this includes:
  //  - on iOS with native text tracks, during an ad playing
  var shouldDisableTracks = function shouldDisableTracks() {
    // If the platform matches iOS with native text tracks
    // and this occurs during ad playback, we should disable tracks again.
    // If shouldPlayContentBehindAd, no special handling is needed.
    return !player.ads.shouldPlayContentBehindAd(player) && player.ads.inAdBreak() && player.tech_.featuresNativeTextTracks && (video_js__WEBPACK_IMPORTED_MODULE_0___default().browser).IS_IOS &&
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

  // Event handling for the current state.
  player.on(['play', 'playing', 'ended', 'adsready', 'adscanceled', 'adskip', 'adserror', 'adtimeout', 'adended', 'ads-ad-started', 'ads-ad-skipped', 'contentchanged', 'dispose', 'contentresumed', 'readyforpostroll', 'nopreroll', 'nopostroll'], function (e) {
    player.ads._state.handleEvent(e.type);
  });

  // Clear timeouts and handlers when player is disposed
  player.on('dispose', function () {
    player.ads.reset();
    player.textTracks().removeEventListener('change', textTrackChangeHandler);
  });

  // Listen to TCF changes
  listenToTcf();

  // Initialize the US Privacy string
  obtainUsPrivacyString(function () {});

  // Can be called for testing, or if the TCF CMP has loaded late
  player.ads.listenToTcf = listenToTcf;

  // Expose so the US privacy string can be updated as needed
  player.ads.updateUsPrivacyString = function (callback) {
    return obtainUsPrivacyString(callback);
  };
};

// Expose the contrib-ads version before it is initialized. Will be replaced
// after initialization in ads.js
contribAdsPlugin.VERSION = version;

// Attempt to register the plugin, if we can.
register(contribAdsPlugin);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (contribAdsPlugin);


/***/ }),

/***/ "../node_modules/videojs-ima/dist/videojs.ima.es.js":
/*!**********************************************************!*\
  !*** ../node_modules/videojs-ima/dist/videojs.ima.es.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiveStream: () => (/* binding */ LiveStream),
/* harmony export */   VodStream: () => (/* binding */ VodStream),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);


function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/**
 * Wraps the video.js player for the plugin.
 *
 * @param {Object} player Video.js player instance.
 * @param {Object} adsPluginSettings Settings for the contrib-ads plugin.
 * @param {Controller} controller Reference to the parent controller.
 */
var PlayerWrapper = function PlayerWrapper(player, adsPluginSettings, controller) {
  /**
   * Instance of the video.js player.
   */
  this.vjsPlayer = player;

  /**
   * Plugin controller.
   */
  this.controller = controller;

  /**
   * Timer used to track content progress.
   */
  this.contentTrackingTimer = null;

  /**
   * True if our content video has completed, false otherwise.
   */
  this.contentComplete = false;

  /**
   * Handle to interval that repeatedly updates current time.
   */
  this.updateTimeIntervalHandle = null;

  /**
   * Interval (ms) to check for player resize for fluid support.
   */
  this.updateTimeInterval = 1000;

  /**
   * Handle to interval that repeatedly checks for seeking.
   */
  this.seekCheckIntervalHandle = null;

  /**
   * Interval (ms) on which to check if the user is seeking through the
   * content.
   */
  this.seekCheckInterval = 1000;

  /**
   * Handle to interval that repeatedly checks for player resize.
   */
  this.resizeCheckIntervalHandle = null;

  /**
   * Interval (ms) to check for player resize for fluid support.
   */
  this.resizeCheckInterval = 250;

  /**
   * Threshold by which to judge user seeking. We check every 1000 ms to see
   * if the user is seeking. In order for us to decide that they are *not*
   * seeking, the content video playhead must only change by 900-1100 ms
   * between checks. Any greater change and we assume the user is seeking
   * through the video.
   */
  this.seekThreshold = 100;

  /**
   * Content ended listeners passed by the publisher to the plugin. Publishers
   * should allow the plugin to handle content ended to ensure proper support
   * of custom ad playback.
   */
  this.contentEndedListeners = [];

  /**
   * Stores the content source so we can re-populate it manually after a
   * post-roll on iOS.
   */
  this.contentSource = '';

  /**
   * Stores the content source type so we can re-populate it manually after a
   * post-roll.
   */
  this.contentSourceType = '';

  /**
   * Stores data for the content playhead tracker.
   */
  this.contentPlayheadTracker = {
    currentTime: 0,
    previousTime: 0,
    seeking: false,
    duration: 0
  };

  /**
   * Player dimensions. Used in our resize check.
   */
  this.vjsPlayerDimensions = {
    width: this.getPlayerWidth(),
    height: this.getPlayerHeight()
  };

  /**
   * Video.js control bar.
   */
  this.vjsControls = this.vjsPlayer.getChild('controlBar');

  /**
   * Vanilla HTML5 video player underneath the video.js player.
   */
  this.h5Player = null;
  this.vjsPlayer.one('play', this.setUpPlayerIntervals.bind(this));
  this.boundContentEndedListener = this.localContentEndedListener.bind(this);
  this.vjsPlayer.on('contentended', this.boundContentEndedListener);
  this.vjsPlayer.on('dispose', this.playerDisposedListener.bind(this));
  this.vjsPlayer.on('readyforpreroll', this.onReadyForPreroll.bind(this));
  this.vjsPlayer.on('adtimeout', this.onAdTimeout.bind(this));
  this.vjsPlayer.ready(this.onPlayerReady.bind(this));
  if (this.controller.getSettings().requestMode === 'onPlay') {
    this.vjsPlayer.one('play', this.controller.requestAds.bind(this.controller));
  }
  if (!this.vjsPlayer.ads) {
    window.console.warn('You may be using a version of videojs-contrib-ads ' + 'that is not compatible with your version of video.js.');
  }
  this.vjsPlayer.ads(adsPluginSettings);
};

/**
 * Set up the intervals we use on the player.
 */
PlayerWrapper.prototype.setUpPlayerIntervals = function () {
  /**
   * Clear old interval handers in case the method was called more than once
   */
  if (this.updateTimeIntervalHandle) {
    clearInterval(this.updateTimeIntervalHandle);
  }
  if (this.seekCheckIntervalHandle) {
    clearInterval(this.seekCheckIntervalHandle);
  }
  if (this.resizeCheckIntervalHandle) {
    clearInterval(this.resizeCheckIntervalHandle);
  }
  this.updateTimeIntervalHandle = setInterval(this.updateCurrentTime.bind(this), this.updateTimeInterval);
  this.seekCheckIntervalHandle = setInterval(this.checkForSeeking.bind(this), this.seekCheckInterval);
  this.resizeCheckIntervalHandle = setInterval(this.checkForResize.bind(this), this.resizeCheckInterval);
};

/**
 * Updates the current time of the video
 */
PlayerWrapper.prototype.updateCurrentTime = function () {
  if (!this.contentPlayheadTracker.seeking) {
    this.contentPlayheadTracker.currentTime = this.vjsPlayer.currentTime();
  }
};

/**
 * Detects when the user is seeking through a video.
 * This is used to prevent mid-rolls from playing while a user is seeking.
 *
 * There *is* a seeking property of the HTML5 video element, but it's not
 * properly implemented on all platforms (e.g. mobile safari), so we have to
 * check ourselves to be sure.
 */
PlayerWrapper.prototype.checkForSeeking = function () {
  var tempCurrentTime = this.vjsPlayer.currentTime();
  var diff = (tempCurrentTime - this.contentPlayheadTracker.previousTime) * 1000;
  if (Math.abs(diff) > this.seekCheckInterval + this.seekThreshold) {
    this.contentPlayheadTracker.seeking = true;
  } else {
    this.contentPlayheadTracker.seeking = false;
  }
  this.contentPlayheadTracker.previousTime = this.vjsPlayer.currentTime();
};

/**
 * Detects when the player is resized (for fluid support) and resizes the
 * ads manager to match.
 */
PlayerWrapper.prototype.checkForResize = function () {
  var currentWidth = this.getPlayerWidth();
  var currentHeight = this.getPlayerHeight();
  if (currentWidth != this.vjsPlayerDimensions.width || currentHeight != this.vjsPlayerDimensions.height) {
    this.vjsPlayerDimensions.width = currentWidth;
    this.vjsPlayerDimensions.height = currentHeight;
    this.controller.onPlayerResize(currentWidth, currentHeight);
  }
};

/**
 * Local content ended listener for contentComplete.
 */
PlayerWrapper.prototype.localContentEndedListener = function () {
  if (!this.contentComplete) {
    this.contentComplete = true;
    this.controller.onContentComplete();
  }
  for (var index in this.contentEndedListeners) {
    if (typeof this.contentEndedListeners[index] === 'function') {
      this.contentEndedListeners[index]();
    }
  }
  if (this.vjsPlayer.el()) {
    this.vjsPlayer.one('play', this.setUpPlayerIntervals.bind(this));
  }
};

/**
 * Called when it's time to play a post-roll but we don't have one to play.
 */
PlayerWrapper.prototype.onNoPostroll = function () {
  this.vjsPlayer.trigger('nopostroll');
};

/**
 * Detects when the video.js player has been disposed.
 */
PlayerWrapper.prototype.playerDisposedListener = function () {
  this.contentEndedListeners = [];
  this.controller.onPlayerDisposed();
  this.contentComplete = true;
  this.vjsPlayer.off('contentended', this.boundContentEndedListener);

  // Bug fix: https://github.com/googleads/videojs-ima/issues/306
  if (this.vjsPlayer.ads.adTimeoutTimeout) {
    clearTimeout(this.vjsPlayer.ads.adTimeoutTimeout);
  }
  var intervalsToClear = [this.updateTimeIntervalHandle, this.seekCheckIntervalHandle, this.resizeCheckIntervalHandle];
  for (var index in intervalsToClear) {
    if (intervalsToClear[index]) {
      clearInterval(intervalsToClear[index]);
    }
  }
};

/**
 * Start ad playback, or content video playback in the absence of a
 * pre-roll.
 */
PlayerWrapper.prototype.onReadyForPreroll = function () {
  this.controller.onPlayerReadyForPreroll();
};

/**
 * Detects if the ad has timed out.
 */
PlayerWrapper.prototype.onAdTimeout = function () {
  this.controller.onAdTimeout();
};

/**
 * Called when the player fires its 'ready' event.
 */
PlayerWrapper.prototype.onPlayerReady = function () {
  this.h5Player = document.getElementById(this.getPlayerId()).getElementsByClassName('vjs-tech')[0];

  // Detect inline options
  if (this.h5Player.hasAttribute('autoplay')) {
    this.controller.setSetting('adWillAutoPlay', true);
  }

  // Sync ad volume with player volume.
  this.onVolumeChange();
  this.vjsPlayer.on('fullscreenchange', this.onFullscreenChange.bind(this));
  this.vjsPlayer.on('volumechange', this.onVolumeChange.bind(this));
  this.controller.onPlayerReady();
};

/**
 * Listens for the video.js player to change its fullscreen status. This
 * keeps the fullscreen-ness of the AdContainer in sync with the player.
 */
PlayerWrapper.prototype.onFullscreenChange = function () {
  if (this.vjsPlayer.isFullscreen()) {
    this.controller.onPlayerEnterFullscreen();
  } else {
    this.controller.onPlayerExitFullscreen();
  }
};

/**
 * Listens for the video.js player to change its volume. This keeps the ad
 * volume in sync with the content volume if the volume of the player is
 * changed while content is playing.
 */
PlayerWrapper.prototype.onVolumeChange = function () {
  var newVolume = this.vjsPlayer.muted() ? 0 : this.vjsPlayer.volume();
  this.controller.onPlayerVolumeChanged(newVolume);
};

/**
 * Inject the ad container div into the DOM.
 *
 * @param{HTMLElement} adContainerDiv The ad container div.
 */
PlayerWrapper.prototype.injectAdContainerDiv = function (adContainerDiv) {
  this.vjsControls.el().parentNode.appendChild(adContainerDiv);
};

/**
 * @return {Object} The content player.
 */
PlayerWrapper.prototype.getContentPlayer = function () {
  return this.h5Player;
};

/**
 * @return {number} The volume, 0-1.
 */
PlayerWrapper.prototype.getVolume = function () {
  return this.vjsPlayer.muted() ? 0 : this.vjsPlayer.volume();
};

/**
 * Set the volume of the player. 0-1.
 *
 * @param {number} volume The new volume.
 */
PlayerWrapper.prototype.setVolume = function (volume) {
  this.vjsPlayer.volume(volume);
  if (volume == 0) {
    this.vjsPlayer.muted(true);
  } else {
    this.vjsPlayer.muted(false);
  }
};

/**
 * Ummute the player.
 */
PlayerWrapper.prototype.unmute = function () {
  this.vjsPlayer.muted(false);
};

/**
 * Mute the player.
 */
PlayerWrapper.prototype.mute = function () {
  this.vjsPlayer.muted(true);
};

/**
 * Play the video.
 */
PlayerWrapper.prototype.play = function () {
  this.vjsPlayer.play();
};

/**
 * Toggles playback of the video.
 */
PlayerWrapper.prototype.togglePlayback = function () {
  if (this.vjsPlayer.paused()) {
    this.vjsPlayer.play();
  } else {
    this.vjsPlayer.pause();
  }
};

/**
 * Get the player width.
 *
 * @return {number} The player's width.
 */
PlayerWrapper.prototype.getPlayerWidth = function () {
  var width = (getComputedStyle(this.vjsPlayer.el()) || {}).width;
  if (!width || parseFloat(width) === 0) {
    width = (this.vjsPlayer.el().getBoundingClientRect() || {}).width;
  }
  return parseFloat(width) || this.vjsPlayer.width();
};

/**
 * Get the player height.
 *
 * @return {number} The player's height.
 */
PlayerWrapper.prototype.getPlayerHeight = function () {
  var height = (getComputedStyle(this.vjsPlayer.el()) || {}).height;
  if (!height || parseFloat(height) === 0) {
    height = (this.vjsPlayer.el().getBoundingClientRect() || {}).height;
  }
  return parseFloat(height) || this.vjsPlayer.height();
};

/**
 * @return {Object} The vjs player's options object.
 */
PlayerWrapper.prototype.getPlayerOptions = function () {
  return this.vjsPlayer.options_;
};

/**
 * Returns the instance of the player id.
 * @return {string} The player id.
 */
PlayerWrapper.prototype.getPlayerId = function () {
  return this.vjsPlayer.id();
};

/**
 * Toggle fullscreen state.
 */
PlayerWrapper.prototype.toggleFullscreen = function () {
  if (this.vjsPlayer.isFullscreen()) {
    this.vjsPlayer.exitFullscreen();
  } else {
    this.vjsPlayer.requestFullscreen();
  }
};

/**
 * Returns the content playhead tracker.
 *
 * @return {Object} The content playhead tracker.
 */
PlayerWrapper.prototype.getContentPlayheadTracker = function () {
  return this.contentPlayheadTracker;
};

/**
 * Handles ad errors.
 *
 * @param {Object} adErrorEvent The ad error event thrown by the IMA SDK.
 */
PlayerWrapper.prototype.onAdError = function (adErrorEvent) {
  this.vjsControls.show();
  var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
  this.vjsPlayer.trigger({
    type: 'adserror',
    data: {
      AdError: errorMessage,
      AdErrorEvent: adErrorEvent
    }
  });
};

/**
 * Handles ad log messages.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the IMA SDK.
 */
PlayerWrapper.prototype.onAdLog = function (adEvent) {
  var adData = adEvent.getAdData();
  var errorMessage = adData['adError'] !== undefined ? adData['adError'].getMessage() : undefined;
  this.vjsPlayer.trigger({
    type: 'adslog',
    data: {
      AdError: errorMessage,
      AdEvent: adEvent
    }
  });
};

/**
 * Handles ad break starting.
 */
PlayerWrapper.prototype.onAdBreakStart = function () {
  this.contentSource = this.vjsPlayer.currentSrc();
  this.contentSourceType = this.vjsPlayer.currentType();
  this.vjsPlayer.off('contentended', this.boundContentEndedListener);
  this.vjsPlayer.ads.startLinearAdMode();
  this.vjsControls.hide();
  this.vjsPlayer.pause();
};

/**
 * Handles ad break ending.
 */
PlayerWrapper.prototype.onAdBreakEnd = function () {
  this.vjsPlayer.on('contentended', this.boundContentEndedListener);
  if (this.vjsPlayer.ads.inAdBreak()) {
    this.vjsPlayer.ads.endLinearAdMode();
  }
  this.vjsControls.show();
};

/**
 * Handles an individual ad start.
 */
PlayerWrapper.prototype.onAdStart = function () {
  this.vjsPlayer.trigger('ads-ad-started');
};

/**
 * Handles when all ads have finished playing.
 */
PlayerWrapper.prototype.onAllAdsCompleted = function () {
  if (this.contentComplete == true) {
    // The null check on this.contentSource was added to fix
    // an error when the post-roll was an empty VAST tag.
    if (this.contentSource && this.vjsPlayer.currentSrc() != this.contentSource) {
      this.vjsPlayer.src({
        src: this.contentSource,
        type: this.contentSourceType
      });
    }
    this.controller.onContentAndAdsCompleted();
  }
};

/**
 * Triggers adsready for contrib-ads.
 */
PlayerWrapper.prototype.onAdsReady = function () {
  this.vjsPlayer.trigger('adsready');
};

/**
 * Changes the player source.
 * @param {?string} contentSrc The URI for the content to be played. Leave
 *     blank to use the existing content.
 */
PlayerWrapper.prototype.changeSource = function (contentSrc) {
  // Only try to pause the player when initialised with a source already
  if (this.vjsPlayer.currentSrc()) {
    this.vjsPlayer.currentTime(0);
    this.vjsPlayer.pause();
  }
  if (contentSrc) {
    this.vjsPlayer.src(contentSrc);
  }
  this.vjsPlayer.one('loadedmetadata', this.seekContentToZero.bind(this));
};

/**
 * Seeks content to 00:00:00. This is used as an event handler for the
 * loadedmetadata event, since seeking is not possible until that event has
 * fired.
 */
PlayerWrapper.prototype.seekContentToZero = function () {
  this.vjsPlayer.currentTime(0);
};

/**
 * Triggers an event on the VJS player
 * @param  {string} name The event name.
 * @param  {Object} data The event data.
 */
PlayerWrapper.prototype.triggerPlayerEvent = function (name, data) {
  this.vjsPlayer.trigger(name, data);
};

/**
 * Listener JSDoc for ESLint. This listener can be passed to
 * addContentEndedListener.
 * @callback listener
 */

/**
 * Adds a listener for the 'contentended' event of the video player. This should
 * be used instead of setting an 'contentended' listener directly to ensure that
 * the ima can do proper cleanup of the SDK before other event listeners are
 * called.
 * @param {listener} listener The listener to be called when content
 *     completes.
 */
PlayerWrapper.prototype.addContentEndedListener = function (listener) {
  this.contentEndedListeners.push(listener);
};

/**
 * Reset the player.
 */
PlayerWrapper.prototype.reset = function () {
  // Attempts to remove the contentEndedListener before adding it.
  // This is to prevent an error where an erroring video caused multiple
  // contentEndedListeners to be added.
  this.vjsPlayer.off('contentended', this.boundContentEndedListener);
  this.vjsPlayer.on('contentended', this.boundContentEndedListener);
  this.vjsControls.show();
  if (this.vjsPlayer.ads.inAdBreak()) {
    this.vjsPlayer.ads.endLinearAdMode();
  }
  // Reset the content time we give the SDK. Fixes an issue where requesting
  // VMAP followed by VMAP would play the second mid-rolls as pre-rolls if
  // the first playthrough of the video passed the second response's
  // mid-roll time.
  this.contentPlayheadTracker.currentTime = 0;
  this.contentComplete = false;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/**
 * Ad UI implementation.
 *
 * @param {Controller} controller Plugin controller.
 * @constructor
 * @struct
 * @final
 */
var AdUi = function AdUi(controller) {
  /**
   * Plugin controller.
   */
  this.controller = controller;

  /**
   * Div used as an ad container.
   */
  this.adContainerDiv = document.createElement('div');

  /**
   * Div used to display ad controls.
   */
  this.controlsDiv = document.createElement('div');

  /**
   * Div used to display ad countdown timer.
   */
  this.countdownDiv = document.createElement('div');

  /**
   * Div used to display add seek bar.
   */
  this.seekBarDiv = document.createElement('div');

  /**
   * Div used to display ad progress (in seek bar).
   */
  this.progressDiv = document.createElement('div');

  /**
   * Div used to display ad play/pause button.
   */
  this.playPauseDiv = document.createElement('div');

  /**
   * Div used to display ad mute button.
   */
  this.muteDiv = document.createElement('div');

  /**
   * Div used by the volume slider.
   */
  this.sliderDiv = document.createElement('div');

  /**
   * Volume slider level visuals
   */
  this.sliderLevelDiv = document.createElement('div');

  /**
   * Div used to display ad fullscreen button.
   */
  this.fullscreenDiv = document.createElement('div');

  /**
   * Bound event handler for onMouseUp.
   */
  this.boundOnMouseUp = this.onMouseUp.bind(this);

  /**
   * Bound event handler for onMouseMove.
   */
  this.boundOnMouseMove = this.onMouseMove.bind(this);

  /**
   * Stores data for the ad playhead tracker.
   */
  this.adPlayheadTracker = {
    'currentTime': 0,
    'duration': 0,
    'isPod': false,
    'adPosition': 0,
    'totalAds': 0
  };

  /**
   * Used to prefix videojs ima controls.
   */
  this.controlPrefix = this.controller.getPlayerId() + '_';

  /**
   * Boolean flag to show or hide the ad countdown timer.
   */
  this.showCountdown = true;
  if (this.controller.getSettings().showCountdown === false) {
    this.showCountdown = false;
  }

  /**
   * Boolean flag if the current ad is nonlinear.
   */
  this.isAdNonlinear = false;
  this.createAdContainer();
};

/**
 * Creates the ad container.
 */
AdUi.prototype.createAdContainer = function () {
  this.assignControlAttributes(this.adContainerDiv, 'ima-ad-container');
  this.adContainerDiv.style.position = 'absolute';
  this.adContainerDiv.style.zIndex = 1111;
  this.adContainerDiv.addEventListener('mouseenter', this.showAdControls.bind(this), false);
  this.adContainerDiv.addEventListener('mouseleave', this.hideAdControls.bind(this), false);
  this.adContainerDiv.addEventListener('click', this.onAdContainerClick.bind(this), false);
  this.createControls();
  this.controller.injectAdContainerDiv(this.adContainerDiv);
};

/**
 * Create the controls.
 */
AdUi.prototype.createControls = function () {
  this.assignControlAttributes(this.controlsDiv, 'ima-controls-div');
  this.controlsDiv.style.width = '100%';
  if (!this.controller.getIsMobile()) {
    this.assignControlAttributes(this.countdownDiv, 'ima-countdown-div');
    this.countdownDiv.innerHTML = this.controller.getSettings().adLabel;
    this.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
  } else {
    this.countdownDiv.style.display = 'none';
  }
  this.assignControlAttributes(this.seekBarDiv, 'ima-seek-bar-div');
  this.seekBarDiv.style.width = '100%';
  this.assignControlAttributes(this.progressDiv, 'ima-progress-div');
  this.assignControlAttributes(this.playPauseDiv, 'ima-play-pause-div');
  this.addClass(this.playPauseDiv, 'ima-playing');
  this.playPauseDiv.addEventListener('click', this.onAdPlayPauseClick.bind(this), false);
  this.assignControlAttributes(this.muteDiv, 'ima-mute-div');
  this.addClass(this.muteDiv, 'ima-non-muted');
  this.muteDiv.addEventListener('click', this.onAdMuteClick.bind(this), false);
  this.assignControlAttributes(this.sliderDiv, 'ima-slider-div');
  this.sliderDiv.addEventListener('mousedown', this.onAdVolumeSliderMouseDown.bind(this), false);

  // Hide volume slider controls on iOS as they aren't supported.
  if (this.controller.getIsIos()) {
    this.sliderDiv.style.display = 'none';
  }
  this.assignControlAttributes(this.sliderLevelDiv, 'ima-slider-level-div');
  this.assignControlAttributes(this.fullscreenDiv, 'ima-fullscreen-div');
  this.addClass(this.fullscreenDiv, 'ima-non-fullscreen');
  this.fullscreenDiv.addEventListener('click', this.onAdFullscreenClick.bind(this), false);
  this.adContainerDiv.appendChild(this.controlsDiv);
  this.controlsDiv.appendChild(this.countdownDiv);
  this.controlsDiv.appendChild(this.seekBarDiv);
  this.controlsDiv.appendChild(this.playPauseDiv);
  this.controlsDiv.appendChild(this.muteDiv);
  this.controlsDiv.appendChild(this.sliderDiv);
  this.controlsDiv.appendChild(this.fullscreenDiv);
  this.seekBarDiv.appendChild(this.progressDiv);
  this.sliderDiv.appendChild(this.sliderLevelDiv);
};

/**
 * Listener for clicks on the play/pause button during ad playback.
 */
AdUi.prototype.onAdPlayPauseClick = function () {
  this.controller.onAdPlayPauseClick();
};

/**
 * Listener for clicks on the play/pause button during ad playback.
 */
AdUi.prototype.onAdMuteClick = function () {
  this.controller.onAdMuteClick();
};

/**
 * Listener for clicks on the fullscreen button during ad playback.
 */
AdUi.prototype.onAdFullscreenClick = function () {
  this.controller.toggleFullscreen();
};

/**
 * Show pause and hide play button
 */
AdUi.prototype.onAdsPaused = function () {
  this.controller.sdkImpl.adPlaying = false;
  this.addClass(this.playPauseDiv, 'ima-paused');
  this.removeClass(this.playPauseDiv, 'ima-playing');
  this.showAdControls();
};

/**
 * Show pause and hide play button
 */
AdUi.prototype.onAdsResumed = function () {
  this.onAdsPlaying();
  this.showAdControls();
};

/**
 * Show play and hide pause button
 */
AdUi.prototype.onAdsPlaying = function () {
  this.controller.sdkImpl.adPlaying = true;
  this.addClass(this.playPauseDiv, 'ima-playing');
  this.removeClass(this.playPauseDiv, 'ima-paused');
};

/**
 * Takes data from the controller to update the UI.
 *
 * @param {number} currentTime Current time of the ad.
 * @param {number} remainingTime Remaining time of the ad.
 * @param {number} duration Duration of the ad.
 * @param {number} adPosition Index of the ad in the pod.
 * @param {number} totalAds Total number of ads in the pod.
 */
AdUi.prototype.updateAdUi = function (currentTime, remainingTime, duration, adPosition, totalAds) {
  // Update countdown timer data
  var remainingMinutes = Math.floor(remainingTime / 60);
  var remainingSeconds = Math.floor(remainingTime % 60);
  if (remainingSeconds.toString().length < 2) {
    remainingSeconds = '0' + remainingSeconds;
  }
  var podCount = ': ';
  if (totalAds > 1) {
    podCount = ' (' + adPosition + ' ' + this.controller.getSettings().adLabelNofN + ' ' + totalAds + '): ';
  }
  this.countdownDiv.innerHTML = this.controller.getSettings().adLabel + podCount + remainingMinutes + ':' + remainingSeconds;

  // Update UI
  var playProgressRatio = currentTime / duration;
  var playProgressPercent = playProgressRatio * 100;
  this.progressDiv.style.width = playProgressPercent + '%';
};

/**
 * Handles UI changes when the ad is unmuted.
 */
AdUi.prototype.unmute = function () {
  this.addClass(this.muteDiv, 'ima-non-muted');
  this.removeClass(this.muteDiv, 'ima-muted');
  this.sliderLevelDiv.style.width = this.controller.getPlayerVolume() * 100 + '%';
};

/**
 * Handles UI changes when the ad is muted.
 */
AdUi.prototype.mute = function () {
  this.addClass(this.muteDiv, 'ima-muted');
  this.removeClass(this.muteDiv, 'ima-non-muted');
  this.sliderLevelDiv.style.width = '0%';
};

/*
 * Listener for mouse down events during ad playback. Used for volume.
 */
AdUi.prototype.onAdVolumeSliderMouseDown = function () {
  document.addEventListener('mouseup', this.boundOnMouseUp, false);
  document.addEventListener('mousemove', this.boundOnMouseMove, false);
};

/*
 * Mouse movement listener used for volume slider.
 */
AdUi.prototype.onMouseMove = function (event) {
  this.changeVolume(event);
};

/*
 * Mouse release listener used for volume slider.
 */
AdUi.prototype.onMouseUp = function (event) {
  this.changeVolume(event);
  document.removeEventListener('mouseup', this.boundOnMouseUp);
  document.removeEventListener('mousemove', this.boundOnMouseMove);
};

/*
 * Utility function to set volume and associated UI
 */
AdUi.prototype.changeVolume = function (event) {
  var percent = (event.clientX - this.sliderDiv.getBoundingClientRect().left) / this.sliderDiv.offsetWidth;
  percent *= 100;
  // Bounds value 0-100 if mouse is outside slider region.
  percent = Math.min(Math.max(percent, 0), 100);
  this.sliderLevelDiv.style.width = percent + '%';
  if (this.percent == 0) {
    this.addClass(this.muteDiv, 'ima-muted');
    this.removeClass(this.muteDiv, 'ima-non-muted');
  } else {
    this.addClass(this.muteDiv, 'ima-non-muted');
    this.removeClass(this.muteDiv, 'ima-muted');
  }
  this.controller.setVolume(percent / 100); // 0-1
};

/**
 * Show the ad container.
 */
AdUi.prototype.showAdContainer = function () {
  this.adContainerDiv.style.display = 'block';
};

/**
 * Hide the ad container
 */
AdUi.prototype.hideAdContainer = function () {
  this.adContainerDiv.style.display = 'none';
};

/**
 * Handles clicks on the ad container
 */
AdUi.prototype.onAdContainerClick = function () {
  if (this.isAdNonlinear) {
    this.controller.togglePlayback();
  }
};

/**
 * Resets the state of the ad ui.
 */
AdUi.prototype.reset = function () {
  this.hideAdContainer();
};

/**
 * Handles ad errors.
 */
AdUi.prototype.onAdError = function () {
  this.hideAdContainer();
};

/**
 * Handles ad break starting.
 *
 * @param {Object} adEvent The event fired by the IMA SDK.
 */
AdUi.prototype.onAdBreakStart = function (adEvent) {
  this.showAdContainer();
  var contentType = adEvent.getAd().getContentType();
  if (contentType === 'application/javascript' && !this.controller.getSettings().showControlsForJSAds) {
    this.controlsDiv.style.display = 'none';
  } else {
    this.controlsDiv.style.display = 'block';
  }
  this.onAdsPlaying();
  // Start with the ad controls minimized.
  this.hideAdControls();
};

/**
 * Handles ad break ending.
 */
AdUi.prototype.onAdBreakEnd = function () {
  var currentAd = this.controller.getCurrentAd();
  if (currentAd == null ||
  // hide for post-roll only playlist
  currentAd.isLinear()) {
    // don't hide for non-linear ads
    this.hideAdContainer();
  }
  this.controlsDiv.style.display = 'none';
  this.countdownDiv.innerHTML = '';
};

/**
 * Handles when all ads have finished playing.
 */
AdUi.prototype.onAllAdsCompleted = function () {
  this.hideAdContainer();
};

/**
 * Handles when a linear ad starts.
 */
AdUi.prototype.onLinearAdStart = function () {
  // Don't bump container when controls are shown
  this.removeClass(this.adContainerDiv, 'bumpable-ima-ad-container');
  this.isAdNonlinear = false;
};

/**
 * Handles when a non-linear ad starts.
 */
AdUi.prototype.onNonLinearAdLoad = function () {
  // For non-linear ads that show after a linear ad. For linear ads, we show the
  // ad container in onAdBreakStart to prevent blinking in pods.
  this.adContainerDiv.style.display = 'block';
  // Bump container when controls are shown
  this.addClass(this.adContainerDiv, 'bumpable-ima-ad-container');
  this.isAdNonlinear = true;
};
AdUi.prototype.onPlayerEnterFullscreen = function () {
  this.addClass(this.fullscreenDiv, 'ima-fullscreen');
  this.removeClass(this.fullscreenDiv, 'ima-non-fullscreen');
};
AdUi.prototype.onPlayerExitFullscreen = function () {
  this.addClass(this.fullscreenDiv, 'ima-non-fullscreen');
  this.removeClass(this.fullscreenDiv, 'ima-fullscreen');
};

/**
 * Called when the player volume changes.
 *
 * @param {number} volume The new player volume.
 */
AdUi.prototype.onPlayerVolumeChanged = function (volume) {
  if (volume == 0) {
    this.addClass(this.muteDiv, 'ima-muted');
    this.removeClass(this.muteDiv, 'ima-non-muted');
    this.sliderLevelDiv.style.width = '0%';
  } else {
    this.addClass(this.muteDiv, 'ima-non-muted');
    this.removeClass(this.muteDiv, 'ima-muted');
    this.sliderLevelDiv.style.width = volume * 100 + '%';
  }
};

/**
 * Shows ad controls on mouseover.
 */
AdUi.prototype.showAdControls = function () {
  var _this$controller$getS = this.controller.getSettings(),
    disableAdControls = _this$controller$getS.disableAdControls;
  if (!disableAdControls) {
    this.addClass(this.controlsDiv, 'ima-controls-div-showing');
  }
};

/**
 * Hide the ad controls.
 */
AdUi.prototype.hideAdControls = function () {
  this.removeClass(this.controlsDiv, 'ima-controls-div-showing');
};

/**
 * Assigns the unique id and class names to the given element as well as the
 * style class.
 * @param {HTMLElement} element Element that needs the controlName assigned.
 * @param {string} controlName Control name to assign.
 */
AdUi.prototype.assignControlAttributes = function (element, controlName) {
  element.id = this.controlPrefix + controlName;
  element.className = this.controlPrefix + controlName + ' ' + controlName;
};

/**
 * Returns a regular expression to test a string for the given className.
 *
 * @param {string} className The name of the class.
 * @return {RegExp} The regular expression used to test for that class.
 */
AdUi.prototype.getClassRegexp = function (className) {
  // Matches on
  // (beginning of string OR NOT word char)
  // classname
  // (negative lookahead word char OR end of string)
  return new RegExp('(^|[^A-Za-z-])' + className + '((?![A-Za-z-])|$)', 'gi');
};

/**
 * Returns whether or not the provided element has the provied class in its
 * className.
 * @param {HTMLElement} element Element to tes.t
 * @param {string} className Class to look for.
 * @return {boolean} True if element has className in class list. False
 *     otherwise.
 */
AdUi.prototype.elementHasClass = function (element, className) {
  var classRegexp = this.getClassRegexp(className);
  return classRegexp.test(element.className);
};

/**
 * Adds a class to the given element if it doesn't already have the class
 * @param {HTMLElement} element Element to which the class will be added.
 * @param {string} classToAdd Class to add.
 */
AdUi.prototype.addClass = function (element, classToAdd) {
  element.className = element.className.trim() + ' ' + classToAdd;
};

/**
 * Removes a class from the given element if it has the given class
 *
 * @param {HTMLElement} element Element from which the class will be removed.
 * @param {string} classToRemove Class to remove.
 */
AdUi.prototype.removeClass = function (element, classToRemove) {
  var classRegexp = this.getClassRegexp(classToRemove);
  element.className = element.className.trim().replace(classRegexp, '');
};

/**
 * @return {HTMLElement} The div for the ad container.
 */
AdUi.prototype.getAdContainerDiv = function () {
  return this.adContainerDiv;
};

/**
 * Changes the flag to show or hide the ad countdown timer.
 *
 * @param {boolean} showCountdownIn Show or hide the countdown timer.
 */
AdUi.prototype.setShowCountdown = function (showCountdownIn) {
  this.showCountdown = showCountdownIn;
  this.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
};

var name = "videojs-ima";
var version = "2.3.0";
var license = "Apache-2.0";
var main = "./dist/videojs.ima.js";
var module$1 = "./dist/videojs.ima.es.js";
var author = {
	name: "Google Inc."
};
var engines = {
	node: ">=0.8.0"
};
var scripts = {
	contBuild: "watch 'npm run rollup:max' src",
	predevServer: "echo \"Starting up server on localhost:8000.\"",
	devServer: "npm-run-all -p testServer contBuild",
	lint: "eslint \"src/**/*.js\"",
	rollup: "npm-run-all rollup:*",
	"rollup:max": "rollup -c configs/rollup.config.js",
	"rollup:es": "rollup -c configs/rollup.config.es.js",
	"rollup:min": "rollup -c configs/rollup.config.min.js",
	pretest: "npm run rollup",
	start: "npm run devServer",
	test: "npm-run-all test:*",
	"test:vjs6": "npm install video.js@6 --no-save && npm-run-all -p -r testServer webdriver",
	"test:vjs7": "npm install video.js@7 --no-save && npm-run-all -p -r testServer webdriver",
	testServer: "http-server --cors -p 8000 --silent",
	preversion: "node scripts/preversion.js && npm run lint && npm test",
	version: "node scripts/version.js",
	postversion: "node scripts/postversion.js",
	webdriver: "mocha test/webdriver/*.js --no-timeouts"
};
var repository = {
	type: "git",
	url: "https://github.com/googleads/videojs-ima"
};
var files = [
	"CHANGELOG.md",
	"LICENSE",
	"README.md",
	"dist/",
	"src/"
];
var peerDependencies = {
	"video.js": "^5.19.2 || ^6 || ^7 || ^8"
};
var dependencies = {
	"@hapi/cryptiles": "^5.1.0",
	"can-autoplay": "^3.0.2",
	extend: ">=3.0.2",
	"videojs-contrib-ads": "^6.9.0"
};
var devDependencies = {
	axios: "^1.6.4",
	"@babel/core": "^7.23.7",
	"@babel/preset-env": "^7.23.7",
	child_process: "^1.0.2",
	chromedriver: "^120.0.1",
	"conventional-changelog-cli": "^2.2.2",
	"conventional-changelog-videojs": "^3.0.2",
	ecstatic: "^4.1.4",
	eslint: "^8.8.0",
	"eslint-config-google": "^0.9.1",
	"eslint-plugin-jsdoc": "^3.15.1",
	geckodriver: "^4.3.0",
	"http-server": "^14.1.1",
	ini: ">=1.3.7",
	mocha: "^9.2.0",
	"npm-run-all": "^4.1.5",
	path: "^0.12.7",
	protractor: "^7.0.0",
	rimraf: "^2.7.1",
	rollup: "^0.60.0",
	"rollup-plugin-babel": "^4.4.0",
	"rollup-plugin-copy": "^0.2.3",
	"rollup-plugin-json": "^4.0.0",
	"rollup-plugin-uglify": "^2.0.1",
	"selenium-webdriver": "^4.16.0",
	"shell-quote": "^1.8.1",
	"uglify-es": "^3.3.9",
	"video.js": "^7.17.0",
	watch: "^0.13.0",
	"webdriver-manager": "^12.1.7",
	"@xmldom/xmldom": "^0.8.10"
};
var keywords = [
	"videojs",
	"videojs-plugin"
];
var pkg = {
	name: name,
	version: version,
	license: license,
	main: main,
	module: module$1,
	author: author,
	engines: engines,
	scripts: scripts,
	repository: repository,
	files: files,
	peerDependencies: peerDependencies,
	dependencies: dependencies,
	devDependencies: devDependencies,
	keywords: keywords
};

/**
 * Implementation of the IMA SDK for the plugin.
 *
 * @param {Object} controller Reference to the parent controller.
 *
 * @constructor
 * @struct
 * @final
 */
var SdkImpl = function SdkImpl(controller) {
  /**
   * Plugin controller.
   */
  this.controller = controller;

  /**
   * IMA SDK AdDisplayContainer.
   */
  this.adDisplayContainer = null;

  /**
   * True if the AdDisplayContainer has been initialized. False otherwise.
   */
  this.adDisplayContainerInitialized = false;

  /**
   * IMA SDK AdsLoader
   */
  this.adsLoader = null;

  /**
   * IMA SDK AdsManager
   */
  this.adsManager = null;

  /**
   * IMA SDK AdsRenderingSettings.
   */
  this.adsRenderingSettings = null;

  /**
   * VAST, VMAP, or ad rules response. Used in lieu of fetching a response
   * from an ad tag URL.
   */
  this.adsResponse = null;

  /**
   * Current IMA SDK Ad.
   */
  this.currentAd = null;

  /**
   * Timer used to track ad progress.
   */
  this.adTrackingTimer = null;

  /**
   * True if ALL_ADS_COMPLETED has fired, false until then.
   */
  this.allAdsCompleted = false;

  /**
   * True if ads are currently displayed, false otherwise.
   * True regardless of ad pause state if an ad is currently being displayed.
   */
  this.adsActive = false;

  /**
   * True if ad is currently playing, false if ad is paused or ads are not
   * currently displayed.
   */
  this.adPlaying = false;

  /**
   * True if the ad is muted, false otherwise.
   */
  this.adMuted = false;

  /**
   * Listener to be called to trigger manual ad break playback.
   */
  this.adBreakReadyListener = undefined;

  /**
   * Tracks whether or not we have already called adsLoader.contentComplete().
   */
  this.contentCompleteCalled = false;

  /**
   * True if the ad has timed out.
   */
  this.isAdTimedOut = false;

  /**
   * Stores the dimensions for the ads manager.
   */
  this.adsManagerDimensions = {
    width: 0,
    height: 0
  };

  /**
   * Boolean flag to enable manual ad break playback.
   */
  this.autoPlayAdBreaks = true;
  if (this.controller.getSettings().autoPlayAdBreaks === false) {
    this.autoPlayAdBreaks = false;
  }

  // Set SDK settings from plugin settings.
  if (this.controller.getSettings().locale) {
    /* eslint no-undef: 'error' */
    /* global google */
    google.ima.settings.setLocale(this.controller.getSettings().locale);
  }
  if (this.controller.getSettings().disableFlashAds) {
    google.ima.settings.setDisableFlashAds(this.controller.getSettings().disableFlashAds);
  }
  if (this.controller.getSettings().disableCustomPlaybackForIOS10Plus) {
    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.controller.getSettings().disableCustomPlaybackForIOS10Plus);
  }
  if (this.controller.getSettings().ppid) {
    google.ima.settings.setPpid(this.controller.getSettings().ppid);
  }
  if (this.controller.getSettings().featureFlags) {
    google.ima.settings.setFeatureFlags(this.controller.getSettings().featureFlags);
  }
};

/**
 * Creates and initializes the IMA SDK objects.
 */
SdkImpl.prototype.initAdObjects = function () {
  this.adDisplayContainer = new google.ima.AdDisplayContainer(this.controller.getAdContainerDiv(), this.controller.getContentPlayer());
  this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
  this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
  if (this.controller.getSettings().vpaidAllowed == false) {
    this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.DISABLED);
  }
  if (this.controller.getSettings().vpaidMode !== undefined) {
    this.adsLoader.getSettings().setVpaidMode(this.controller.getSettings().vpaidMode);
  }
  if (this.controller.getSettings().locale) {
    this.adsLoader.getSettings().setLocale(this.controller.getSettings().locale);
  }
  if (this.controller.getSettings().numRedirects) {
    this.adsLoader.getSettings().setNumRedirects(this.controller.getSettings().numRedirects);
  }
  if (this.controller.getSettings().sessionId) {
    this.adsLoader.getSettings().setSessionId(this.controller.getSettings().sessionId);
  }
  this.adsLoader.getSettings().setPlayerType('videojs-ima');
  this.adsLoader.getSettings().setPlayerVersion(pkg.version);
  this.adsLoader.getSettings().setAutoPlayAdBreaks(this.autoPlayAdBreaks);
  this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
  this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdsLoaderError.bind(this), false);
  this.controller.playerWrapper.vjsPlayer.trigger({
    type: 'ads-loader',
    adsLoader: this.adsLoader
  });
};

/**
 * Creates the AdsRequest and request ads through the AdsLoader.
 */
SdkImpl.prototype.requestAds = function () {
  var adsRequest = new google.ima.AdsRequest();
  if (this.controller.getSettings().adTagUrl) {
    adsRequest.adTagUrl = this.controller.getSettings().adTagUrl;
  } else {
    adsRequest.adsResponse = this.controller.getSettings().adsResponse;
  }
  if (this.controller.getSettings().forceNonLinearFullSlot) {
    adsRequest.forceNonLinearFullSlot = true;
  }
  if (this.controller.getSettings().vastLoadTimeout) {
    adsRequest.vastLoadTimeout = this.controller.getSettings().vastLoadTimeout;
  }
  if (this.controller.getSettings().omidMode) {
    window.console.warn('The additional setting `omidMode` has been removed. ' + 'Use `omidVendorAccess` instead.');
  }
  if (this.controller.getSettings().omidVendorAccess) {
    adsRequest.omidAccessModeRules = {};
    var omidVendorValues = this.controller.getSettings().omidVendorAccess;
    Object.keys(omidVendorValues).forEach(function (vendorKey) {
      adsRequest.omidAccessModeRules[vendorKey] = omidVendorValues[vendorKey];
    });
  }
  adsRequest.linearAdSlotWidth = this.controller.getPlayerWidth();
  adsRequest.linearAdSlotHeight = this.controller.getPlayerHeight();
  adsRequest.nonLinearAdSlotWidth = this.controller.getSettings().nonLinearWidth || this.controller.getPlayerWidth();
  adsRequest.nonLinearAdSlotHeight = this.controller.getSettings().nonLinearHeight || this.controller.getPlayerHeight();
  adsRequest.setAdWillAutoPlay(this.controller.adsWillAutoplay());
  adsRequest.setAdWillPlayMuted(this.controller.adsWillPlayMuted());

  // Populate the adsRequestproperties with those provided in the AdsRequest
  // object in the settings.
  var providedAdsRequest = this.controller.getSettings().adsRequest;
  if (providedAdsRequest && _typeof(providedAdsRequest) === 'object') {
    Object.keys(providedAdsRequest).forEach(function (key) {
      adsRequest[key] = providedAdsRequest[key];
    });
  }
  this.adsLoader.requestAds(adsRequest);
  this.controller.playerWrapper.vjsPlayer.trigger({
    type: 'ads-request',
    AdsRequest: adsRequest
  });
};

/**
 * Listener for the ADS_MANAGER_LOADED event. Creates the AdsManager,
 * sets up event listeners, and triggers the 'adsready' event for
 * videojs-ads-contrib.
 *
 * @param {google.ima.AdsManagerLoadedEvent} adsManagerLoadedEvent Fired when
 *     the AdsManager loads.
 */
SdkImpl.prototype.onAdsManagerLoaded = function (adsManagerLoadedEvent) {
  this.createAdsRenderingSettings();
  this.adsManager = adsManagerLoadedEvent.getAdsManager(this.controller.getContentPlayheadTracker(), this.adsRenderingSettings);
  this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, this.onAdBreakReady.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAllAdsCompleted.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.onAdLoaded.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.onAdStarted.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this.onAdComplete.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.LOG, this.onAdLog.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, this.onAdPaused.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, this.onAdResumed.bind(this));
  this.controller.playerWrapper.vjsPlayer.trigger({
    type: 'ads-manager',
    adsManager: this.adsManager
  });
  if (!this.autoPlayAdBreaks) {
    this.initAdsManager();
  }
  var _this$controller$getS = this.controller.getSettings(),
    preventLateAdStart = _this$controller$getS.preventLateAdStart;
  if (!preventLateAdStart) {
    this.controller.onAdsReady();
  } else if (preventLateAdStart && !this.isAdTimedOut) {
    this.controller.onAdsReady();
  }
  if (this.controller.getSettings().adsManagerLoadedCallback) {
    this.controller.getSettings().adsManagerLoadedCallback();
  }
};

/**
 * Listener for errors fired by the AdsLoader.
 * @param {google.ima.AdErrorEvent} event The error event thrown by the
 *     AdsLoader. See
 *     https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdError#.Type
 */
SdkImpl.prototype.onAdsLoaderError = function (event) {
  window.console.warn('AdsLoader error: ' + event.getError());
  this.controller.onErrorLoadingAds(event);
  if (this.adsManager) {
    this.adsManager.destroy();
  }
};

/**
 * Initialize the ads manager.
 */
SdkImpl.prototype.initAdsManager = function () {
  try {
    var initWidth = this.controller.getPlayerWidth();
    var initHeight = this.controller.getPlayerHeight();
    this.adsManagerDimensions.width = initWidth;
    this.adsManagerDimensions.height = initHeight;
    this.adsManager.init(initWidth, initHeight, google.ima.ViewMode.NORMAL);
    this.adsManager.setVolume(this.controller.getPlayerVolume());
    this.initializeAdDisplayContainer();
  } catch (adError) {
    this.onAdError(adError);
  }
};

/**
 * Create AdsRenderingSettings for the IMA SDK.
 */
SdkImpl.prototype.createAdsRenderingSettings = function () {
  this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
  this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  if (this.controller.getSettings().adsRenderingSettings) {
    for (var setting in this.controller.getSettings().adsRenderingSettings) {
      if (setting !== '') {
        this.adsRenderingSettings[setting] = this.controller.getSettings().adsRenderingSettings[setting];
      }
    }
  }
};

/**
 * Listener for errors thrown by the AdsManager.
 * @param {google.ima.AdErrorEvent} adErrorEvent The error event thrown by
 *     the AdsManager.
 */
SdkImpl.prototype.onAdError = function (adErrorEvent) {
  var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
  window.console.warn('Ad error: ' + errorMessage);
  this.adsManager.destroy();
  this.controller.onAdError(adErrorEvent);

  // reset these so consumers don't think we are still in an ad break,
  // but reset them after any prior cleanup happens
  this.adsActive = false;
  this.adPlaying = false;
};

/**
 * Listener for AD_BREAK_READY. Passes event on to publisher's listener.
 * @param {google.ima.AdEvent} adEvent AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdBreakReady = function (adEvent) {
  this.adBreakReadyListener(adEvent);
};

/**
 * Pauses the content video and displays the ad container so ads can play.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onContentPauseRequested = function (adEvent) {
  this.adsActive = true;
  this.adPlaying = true;
  this.controller.onAdBreakStart(adEvent);
};

/**
 * Resumes content video and hides the ad container.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onContentResumeRequested = function (adEvent) {
  this.adsActive = false;
  this.adPlaying = false;
  this.controller.onAdBreakEnd();
  // Hide controls in case of future non-linear ads. They'll be unhidden in
  // content_pause_requested.
};

/**
 * Records that ads have completed and calls contentAndAdsEndedListeners
 * if content is also complete.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAllAdsCompleted = function (adEvent) {
  this.allAdsCompleted = true;
  this.controller.onAllAdsCompleted();
};

/**
 * Starts the content video when a non-linear ad is loaded.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdLoaded = function (adEvent) {
  if (!adEvent.getAd().isLinear()) {
    this.controller.onNonLinearAdLoad();
    this.controller.playContent();
  }
};

/**
 * Starts the interval timer to check the current ad time when an ad starts
 * playing.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdStarted = function (adEvent) {
  this.currentAd = adEvent.getAd();
  if (this.currentAd.isLinear()) {
    this.adTrackingTimer = setInterval(this.onAdPlayheadTrackerInterval.bind(this), 250);
    this.controller.onLinearAdStart();
  } else {
    this.controller.onNonLinearAdStart();
  }
};

/**
 * Handles an ad click. Puts the player UI in a paused state.
 */
SdkImpl.prototype.onAdPaused = function () {
  this.controller.onAdsPaused();
};

/**
 * Syncs controls when an ad resumes.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdResumed = function (adEvent) {
  this.controller.onAdsResumed();
};

/**
 * Clears the interval timer for current ad time when an ad completes.
 */
SdkImpl.prototype.onAdComplete = function () {
  if (this.currentAd.isLinear()) {
    clearInterval(this.adTrackingTimer);
  }
};

/**
 * Handles ad log messages.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdLog = function (adEvent) {
  this.controller.onAdLog(adEvent);
};

/**
 * Gets the current time and duration of the ad and calls the method to
 * update the ad UI.
 */
SdkImpl.prototype.onAdPlayheadTrackerInterval = function () {
  if (this.adsManager === null) return;
  var remainingTime = this.adsManager.getRemainingTime();
  var duration = this.currentAd.getDuration();
  var currentTime = duration - remainingTime;
  currentTime = currentTime > 0 ? currentTime : 0;
  var totalAds = 0;
  var adPosition;
  if (this.currentAd.getAdPodInfo()) {
    adPosition = this.currentAd.getAdPodInfo().getAdPosition();
    totalAds = this.currentAd.getAdPodInfo().getTotalAds();
  }
  this.controller.onAdPlayheadUpdated(currentTime, remainingTime, duration, adPosition, totalAds);
};

/**
 * Called by the player wrapper when content completes.
 */
SdkImpl.prototype.onContentComplete = function () {
  if (this.adsLoader) {
    this.adsLoader.contentComplete();
    this.contentCompleteCalled = true;
  }
  if (this.adsManager && this.adsManager.getCuePoints() && !this.adsManager.getCuePoints().includes(-1) || !this.adsManager) {
    this.controller.onNoPostroll();
  }
  if (this.allAdsCompleted) {
    this.controller.onContentAndAdsCompleted();
  }
};

/**
 * Called when the player is disposed.
 */
SdkImpl.prototype.onPlayerDisposed = function () {
  if (this.adTrackingTimer) {
    clearInterval(this.adTrackingTimer);
  }
  if (this.adsManager) {
    this.adsManager.destroy();
    this.adsManager = null;
  }
};
SdkImpl.prototype.onPlayerReadyForPreroll = function () {
  if (this.autoPlayAdBreaks) {
    this.initAdsManager();
    try {
      this.controller.showAdContainer();
      // Sync ad volume with content volume.
      this.adsManager.setVolume(this.controller.getPlayerVolume());
      this.adsManager.start();
    } catch (adError) {
      this.onAdError(adError);
    }
  }
};
SdkImpl.prototype.onAdTimeout = function () {
  this.isAdTimedOut = true;
};
SdkImpl.prototype.onPlayerReady = function () {
  this.initAdObjects();
  if ((this.controller.getSettings().adTagUrl || this.controller.getSettings().adsResponse) && this.controller.getSettings().requestMode === 'onLoad') {
    this.requestAds();
  }
};
SdkImpl.prototype.onPlayerEnterFullscreen = function () {
  if (this.adsManager) {
    this.adsManager.resize(window.screen.width, window.screen.height, google.ima.ViewMode.FULLSCREEN);
  }
};
SdkImpl.prototype.onPlayerExitFullscreen = function () {
  if (this.adsManager) {
    this.adsManager.resize(this.controller.getPlayerWidth(), this.controller.getPlayerHeight(), google.ima.ViewMode.NORMAL);
  }
};

/**
 * Called when the player volume changes.
 *
 * @param {number} volume The new player volume.
 */
SdkImpl.prototype.onPlayerVolumeChanged = function (volume) {
  if (this.adsManager) {
    this.adsManager.setVolume(volume);
  }
  if (volume == 0) {
    this.adMuted = true;
  } else {
    this.adMuted = false;
  }
};

/**
 * Called when the player wrapper detects that the player has been resized.
 *
 * @param {number} width The post-resize width of the player.
 * @param {number} height The post-resize height of the player.
 */
SdkImpl.prototype.onPlayerResize = function (width, height) {
  if (this.adsManager) {
    this.adsManagerDimensions.width = width;
    this.adsManagerDimensions.height = height;
    /* eslint no-undef: 'error' */
    this.adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
  }
};

/**
 * @return {Object} The current ad.
 */
SdkImpl.prototype.getCurrentAd = function () {
  return this.currentAd;
};

/**
 * Listener JSDoc for ESLint. This listener can be passed to
 * setAdBreakReadyListener.
 * @callback listener
 */

/**
 * Sets the listener to be called to trigger manual ad break playback.
 * @param {listener} listener The listener to be called to trigger manual ad
 *     break playback.
 */
SdkImpl.prototype.setAdBreakReadyListener = function (listener) {
  this.adBreakReadyListener = listener;
};

/**
 * @return {boolean} True if an ad is currently playing. False otherwise.
 */
SdkImpl.prototype.isAdPlaying = function () {
  return this.adPlaying;
};

/**
 * @return {boolean} True if an ad is currently playing. False otherwise.
 */
SdkImpl.prototype.isAdMuted = function () {
  return this.adMuted;
};

/**
 * Pause ads.
 */
SdkImpl.prototype.pauseAds = function () {
  this.adsManager.pause();
  this.adPlaying = false;
};

/**
 * Resume ads.
 */
SdkImpl.prototype.resumeAds = function () {
  this.adsManager.resume();
  this.adPlaying = true;
};

/**
 * Unmute ads.
 */
SdkImpl.prototype.unmute = function () {
  this.adsManager.setVolume(1);
  this.adMuted = false;
};

/**
 * Mute ads.
 */
SdkImpl.prototype.mute = function () {
  this.adsManager.setVolume(0);
  this.adMuted = true;
};

/**
 * Set the volume of the ads. 0-1.
 *
 * @param {number} volume The new volume.
 */
SdkImpl.prototype.setVolume = function (volume) {
  this.adsManager.setVolume(volume);
  if (volume == 0) {
    this.adMuted = true;
  } else {
    this.adMuted = false;
  }
};

/**
 * Initializes the AdDisplayContainer. On mobile, this must be done as a
 * result of user action.
 */
SdkImpl.prototype.initializeAdDisplayContainer = function () {
  if (this.adDisplayContainer) {
    if (!this.adDisplayContainerInitialized) {
      this.adDisplayContainer.initialize();
      this.adDisplayContainerInitialized = true;
    }
  }
};

/**
 * Called by publishers in manual ad break playback mode to start an ad
 * break.
 */
SdkImpl.prototype.playAdBreak = function () {
  if (!this.autoPlayAdBreaks) {
    this.controller.showAdContainer();
    // Sync ad volume with content volume.
    this.adsManager.setVolume(this.controller.getPlayerVolume());
    this.adsManager.start();
  }
};

/**
 * Callback JSDoc for ESLint. This callback can be passed to addEventListener.
 * @callback callback
 */

/**
 * Ads an EventListener to the AdsManager. For a list of available events,
 * see
 * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdEvent#.Type
 * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to
 *     listen.
 * @param {callback} callback The method to call when the event is fired.
 */
SdkImpl.prototype.addEventListener = function (event, callback) {
  if (this.adsManager) {
    this.adsManager.addEventListener(event, callback);
  }
};

/**
 * Returns the instance of the AdsManager.
 * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
 */
SdkImpl.prototype.getAdsManager = function () {
  return this.adsManager;
};

/**
 * Reset the SDK implementation.
 */
SdkImpl.prototype.reset = function () {
  this.adsActive = false;
  this.adPlaying = false;
  if (this.adTrackingTimer) {
    // If this is called while an ad is playing, stop trying to get that
    // ad's current time.
    clearInterval(this.adTrackingTimer);
  }
  if (this.adsManager) {
    this.adsManager.destroy();
    this.adsManager = null;
  }
  if (this.adsLoader && !this.contentCompleteCalled) {
    this.adsLoader.contentComplete();
  }
  this.contentCompleteCalled = false;
  this.allAdsCompleted = false;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/**
 * The grand coordinator of the plugin. Facilitates communication between all
 * other plugin classes.
 *
 * @param {Object} player Instance of the video.js player.
 * @param {Object} options Options provided by the implementation.
 * @constructor
 * @struct
 * @final
 */
var Controller = function Controller(player, options) {
  /**
   * Stores user-provided settings.
   * @type {Object}
   */
  this.settings = {};

  /**
   * Content and ads ended listeners passed by the publisher to the plugin.
   * These will be called when the plugin detects that content *and all
   * ads* have completed. This differs from the contentEndedListeners in that
   * contentEndedListeners will fire between content ending and a post-roll
   * playing, whereas the contentAndAdsEndedListeners will fire after the
   * post-roll completes.
   */
  this.contentAndAdsEndedListeners = [];

  /**
   * Whether or not we are running on a mobile platform.
   */
  this.isMobile = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i);

  /**
   * Whether or not we are running on an iOS platform.
   */
  this.isIos = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i);
  this.initWithSettings(options);

  /**
   * Stores contrib-ads default settings.
   */
  var contribAdsDefaults = {
    debug: this.settings.debug,
    timeout: this.settings.timeout,
    prerollTimeout: this.settings.prerollTimeout
  };
  var adsPluginSettings = Object.assign({}, contribAdsDefaults, options.contribAdsSettings || {});
  this.playerWrapper = new PlayerWrapper(player, adsPluginSettings, this);
  this.adUi = new AdUi(this);
  this.sdkImpl = new SdkImpl(this);
};
Controller.IMA_DEFAULTS = {
  adLabel: 'Advertisement',
  adLabelNofN: 'of',
  debug: false,
  disableAdControls: false,
  prerollTimeout: 1000,
  preventLateAdStart: false,
  requestMode: 'onLoad',
  showControlsForJSAds: true,
  timeout: 5000
};

/**
 * Extends the settings to include user-provided settings.
 *
 * @param {Object} options Options to be used in initialization.
 */
Controller.prototype.initWithSettings = function (options) {
  this.settings = Object.assign({}, Controller.IMA_DEFAULTS, options || {});
  this.warnAboutDeprecatedSettings();

  // Default showing countdown timer to true.
  this.showCountdown = true;
  if (this.settings.showCountdown === false) {
    this.showCountdown = false;
  }
};

/**
 * Logs console warnings when deprecated settings are used.
 */
Controller.prototype.warnAboutDeprecatedSettings = function () {
  var _this = this;
  var deprecatedSettings = ['adWillAutoplay', 'adsWillAutoplay', 'adWillPlayMuted', 'adsWillPlayMuted'];
  deprecatedSettings.forEach(function (setting) {
    if (_this.settings[setting] !== undefined) {
      console.warn('WARNING: videojs.ima setting ' + setting + ' is deprecated');
    }
  });
};

/**
 * Return the settings object.
 *
 * @return {Object} The settings object.
 */
Controller.prototype.getSettings = function () {
  return this.settings;
};

/**
 * Return whether or not we're in a mobile environment.
 *
 * @return {boolean} True if running on mobile, false otherwise.
 */
Controller.prototype.getIsMobile = function () {
  return this.isMobile;
};

/**
 * Return whether or not we're in an iOS environment.
 *
 * @return {boolean} True if running on iOS, false otherwise.
 */
Controller.prototype.getIsIos = function () {
  return this.isIos;
};

/**
 * Inject the ad container div into the DOM.
 *
 * @param{HTMLElement} adContainerDiv The ad container div.
 */
Controller.prototype.injectAdContainerDiv = function (adContainerDiv) {
  this.playerWrapper.injectAdContainerDiv(adContainerDiv);
};

/**
 * @return {HTMLElement} The div for the ad container.
 */
Controller.prototype.getAdContainerDiv = function () {
  return this.adUi.getAdContainerDiv();
};

/**
 * @return {Object} The content player.
 */
Controller.prototype.getContentPlayer = function () {
  return this.playerWrapper.getContentPlayer();
};

/**
 * Returns the content playhead tracker.
 *
 * @return {Object} The content playhead tracker.
 */
Controller.prototype.getContentPlayheadTracker = function () {
  return this.playerWrapper.getContentPlayheadTracker();
};

/**
 * Requests ads.
 */
Controller.prototype.requestAds = function () {
  this.sdkImpl.requestAds();
};

/**
 * Add or modify a setting.
 *
 * @param {string} key Key to modify
 * @param {Object} value Value to set at key.
 */
Controller.prototype.setSetting = function (key, value) {
  this.settings[key] = value;
};

/**
 * Called when there is an error loading ads.
 *
 * @param {Object} adErrorEvent The ad error event thrown by the IMA SDK.
 */
Controller.prototype.onErrorLoadingAds = function (adErrorEvent) {
  this.adUi.onAdError();
  this.playerWrapper.onAdError(adErrorEvent);
};

/**
 * Called by the ad UI when the play/pause button is clicked.
 */
Controller.prototype.onAdPlayPauseClick = function () {
  if (this.sdkImpl.isAdPlaying()) {
    this.adUi.onAdsPaused();
    this.sdkImpl.pauseAds();
  } else {
    this.adUi.onAdsPlaying();
    this.sdkImpl.resumeAds();
  }
};

/**
 * Called by the ad UI when the mute button is clicked.
 *
 */
Controller.prototype.onAdMuteClick = function () {
  if (this.sdkImpl.isAdMuted()) {
    this.playerWrapper.unmute();
    this.adUi.unmute();
    this.sdkImpl.unmute();
  } else {
    this.playerWrapper.mute();
    this.adUi.mute();
    this.sdkImpl.mute();
  }
};

/**
 * Set the volume of the player and ads. 0-1.
 *
 * @param {number} volume The new volume.
 */
Controller.prototype.setVolume = function (volume) {
  this.playerWrapper.setVolume(volume);
  this.sdkImpl.setVolume(volume);
};

/**
 * @return {number} The volume of the content player.
 */
Controller.prototype.getPlayerVolume = function () {
  return this.playerWrapper.getVolume();
};

/**
 * Toggle fullscreen state.
 */
Controller.prototype.toggleFullscreen = function () {
  this.playerWrapper.toggleFullscreen();
};

/**
 * Relays ad errors to the player wrapper.
 *
 * @param {Object} adErrorEvent The ad error event thrown by the IMA SDK.
 */
Controller.prototype.onAdError = function (adErrorEvent) {
  this.adUi.onAdError();
  this.playerWrapper.onAdError(adErrorEvent);
};

/**
 * Handles ad break starting.
 *
 * @param {Object} adEvent The event fired by the IMA SDK.
 */
Controller.prototype.onAdBreakStart = function (adEvent) {
  this.playerWrapper.onAdBreakStart();
  this.adUi.onAdBreakStart(adEvent);
};

/**
 * Show the ad container.
 */
Controller.prototype.showAdContainer = function () {
  this.adUi.showAdContainer();
};

/**
 * Handles ad break ending.
 */
Controller.prototype.onAdBreakEnd = function () {
  this.playerWrapper.onAdBreakEnd();
  this.adUi.onAdBreakEnd();
};

/**
 * Handles when all ads have finished playing.
 */
Controller.prototype.onAllAdsCompleted = function () {
  this.adUi.onAllAdsCompleted();
  this.playerWrapper.onAllAdsCompleted();
};

/**
 * Handles the SDK firing an ad paused event.
 */
Controller.prototype.onAdsPaused = function () {
  this.adUi.onAdsPaused();
};

/**
 * Handles the SDK firing an ad resumed event.
 */
Controller.prototype.onAdsResumed = function () {
  this.adUi.onAdsResumed();
};

/**
 * Takes data from the sdk impl and passes it to the ad UI to update the UI.
 *
 * @param {number} currentTime Current time of the ad.
 * @param {number} remainingTime Remaining time of the ad.
 * @param {number} duration Duration of the ad.
 * @param {number} adPosition Index of the ad in the pod.
 * @param {number} totalAds Total number of ads in the pod.
 */
Controller.prototype.onAdPlayheadUpdated = function (currentTime, remainingTime, duration, adPosition, totalAds) {
  this.adUi.updateAdUi(currentTime, remainingTime, duration, adPosition, totalAds);
};

/**
 * Handles ad log messages.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the IMA SDK.
 */
Controller.prototype.onAdLog = function (adEvent) {
  this.playerWrapper.onAdLog(adEvent);
};

/**
 * @return {Object} The current ad.
 */
Controller.prototype.getCurrentAd = function () {
  return this.sdkImpl.getCurrentAd();
};

/**
 * Play content.
 */
Controller.prototype.playContent = function () {
  this.playerWrapper.play();
};

/**
 * Handles when a linear ad starts.
 */
Controller.prototype.onLinearAdStart = function () {
  this.adUi.onLinearAdStart();
  this.playerWrapper.onAdStart();
};

/**
 * Handles when a non-linear ad loads.
 */
Controller.prototype.onNonLinearAdLoad = function () {
  this.adUi.onNonLinearAdLoad();
};

/**
 * Handles when a non-linear ad starts.
 */
Controller.prototype.onNonLinearAdStart = function () {
  this.adUi.onNonLinearAdLoad();
  this.playerWrapper.onAdStart();
};

/**
 * Get the player width.
 *
 * @return {number} The width of the player.
 */
Controller.prototype.getPlayerWidth = function () {
  return this.playerWrapper.getPlayerWidth();
};

/**
 * Get the player height.
 *
 * @return {number} The height of the player.
 */
Controller.prototype.getPlayerHeight = function () {
  return this.playerWrapper.getPlayerHeight();
};

/**
 * Tells the player wrapper that ads are ready.
 */
Controller.prototype.onAdsReady = function () {
  this.playerWrapper.onAdsReady();
};

/**
 * Called when the player wrapper detects that the player has been resized.
 *
 * @param {number} width The post-resize width of the player.
 * @param {number} height The post-resize height of the player.
 */
Controller.prototype.onPlayerResize = function (width, height) {
  this.sdkImpl.onPlayerResize(width, height);
};

/**
 * Called by the player wrapper when content completes.
 */
Controller.prototype.onContentComplete = function () {
  this.sdkImpl.onContentComplete();
};

/**
 * Called by the player wrapper when it's time to play a post-roll but we don't
 * have one to play.
 */
Controller.prototype.onNoPostroll = function () {
  this.playerWrapper.onNoPostroll();
};

/**
 * Called when content and all ads have completed.
 */
Controller.prototype.onContentAndAdsCompleted = function () {
  for (var index in this.contentAndAdsEndedListeners) {
    if (typeof this.contentAndAdsEndedListeners[index] === 'function') {
      this.contentAndAdsEndedListeners[index]();
    }
  }
};

/**
 * Called when the player is disposed.
 */
Controller.prototype.onPlayerDisposed = function () {
  this.contentAndAdsEndedListeners = [];
  this.sdkImpl.onPlayerDisposed();
};

/**
 * Called when the player is ready to play a pre-roll.
 */
Controller.prototype.onPlayerReadyForPreroll = function () {
  this.sdkImpl.onPlayerReadyForPreroll();
};

/**
 * Called if the ad times out.
 */
Controller.prototype.onAdTimeout = function () {
  this.sdkImpl.onAdTimeout();
};

/**
 * Called when the player is ready.
 */
Controller.prototype.onPlayerReady = function () {
  this.sdkImpl.onPlayerReady();
};

/**
 * Called when the player enters fullscreen.
 */
Controller.prototype.onPlayerEnterFullscreen = function () {
  this.adUi.onPlayerEnterFullscreen();
  this.sdkImpl.onPlayerEnterFullscreen();
};

/**
 * Called when the player exits fullscreen.
 */
Controller.prototype.onPlayerExitFullscreen = function () {
  this.adUi.onPlayerExitFullscreen();
  this.sdkImpl.onPlayerExitFullscreen();
};

/**
 * Called when the player volume changes.
 *
 * @param {number} volume The new player volume.
 */
Controller.prototype.onPlayerVolumeChanged = function (volume) {
  this.adUi.onPlayerVolumeChanged(volume);
  this.sdkImpl.onPlayerVolumeChanged(volume);
};

/**
 * Sets the content of the video player. You should use this method instead
 * of setting the content src directly to ensure the proper ad tag is
 * requested when the video content is loaded.
 * @param {?string} contentSrc The URI for the content to be played. Leave
 *     blank to use the existing content.
 * @param {?string} adTag The ad tag to be requested when the content loads.
 *     Leave blank to use the existing ad tag.
 */
Controller.prototype.setContentWithAdTag = function (contentSrc, adTag) {
  this.reset();
  this.settings.adTagUrl = adTag ? adTag : this.settings.adTagUrl;
  this.playerWrapper.changeSource(contentSrc);
};

/**
 * Sets the content of the video player. You should use this method instead
 * of setting the content src directly to ensure the proper ads response is
 * used when the video content is loaded.
 * @param {?string} contentSrc The URI for the content to be played. Leave
 *     blank to use the existing content.
 * @param {?string} adsResponse The ads response to be requested when the
 *     content loads. Leave blank to use the existing ads response.
 */
Controller.prototype.setContentWithAdsResponse = function (contentSrc, adsResponse) {
  this.reset();
  this.settings.adsResponse = adsResponse ? adsResponse : this.settings.adsResponse;
  this.playerWrapper.changeSource(contentSrc);
};

/**
 * Sets the content of the video player. You should use this method instead
 * of setting the content src directly to ensure the proper ads request is
 * used when the video content is loaded.
 * @param {?string} contentSrc The URI for the content to be played. Leave
 *     blank to use the existing content.
 * @param {?Object} adsRequest The ads request to be requested when the
 *     content loads. Leave blank to use the existing ads request.
 */
Controller.prototype.setContentWithAdsRequest = function (contentSrc, adsRequest) {
  this.reset();
  this.settings.adsRequest = adsRequest ? adsRequest : this.settings.adsRequest;
  this.playerWrapper.changeSource(contentSrc);
};

/**
 * Resets the state of the plugin.
 */
Controller.prototype.reset = function () {
  this.sdkImpl.reset();
  this.playerWrapper.reset();
  this.adUi.reset();
};

/**
 * Listener JSDoc for ESLint. This listener can be passed to
 * (add|remove)ContentEndedListener.
 * @callback listener
 */

/**
 * Adds a listener for the 'contentended' event of the video player. This should
 * be used instead of setting an 'contentended' listener directly to ensure that
 * the ima can do proper cleanup of the SDK before other event listeners are
 * called.
 * @param {listener} listener The listener to be called when content
 *     completes.
 */
Controller.prototype.addContentEndedListener = function (listener) {
  this.playerWrapper.addContentEndedListener(listener);
};

/**
 * Adds a listener that will be called when content and all ads have
 * finished playing.
 * @param {listener} listener The listener to be called when content and ads
 *     complete.
 */
Controller.prototype.addContentAndAdsEndedListener = function (listener) {
  this.contentAndAdsEndedListeners.push(listener);
};

/**
 * Sets the listener to be called to trigger manual ad break playback.
 * @param {listener} listener The listener to be called to trigger manual ad
 *     break playback.
 */
Controller.prototype.setAdBreakReadyListener = function (listener) {
  this.sdkImpl.setAdBreakReadyListener(listener);
};

/**
 * Changes the flag to show or hide the ad countdown timer.
 *
 * @param {boolean} showCountdownIn Show or hide the countdown timer.
 */
Controller.prototype.setShowCountdown = function (showCountdownIn) {
  this.adUi.setShowCountdown(showCountdownIn);
  this.showCountdown = showCountdownIn;
  this.adUi.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
};

/**
 * Initializes the AdDisplayContainer. On mobile, this must be done as a
 * result of user action.
 */
Controller.prototype.initializeAdDisplayContainer = function () {
  this.sdkImpl.initializeAdDisplayContainer();
};

/**
 * Called by publishers in manual ad break playback mode to start an ad
 * break.
 */
Controller.prototype.playAdBreak = function () {
  this.sdkImpl.playAdBreak();
};

/**
 * Callback JSDoc for ESLint. This callback can be passed to addEventListener.
 * @callback callback
 */

/**
 * Ads an EventListener to the AdsManager. For a list of available events,
 * see
 * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdEvent#.Type
 * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to
 *     listen.
 * @param {callback} callback The method to call when the event is fired.
 */
Controller.prototype.addEventListener = function (event, callback) {
  this.sdkImpl.addEventListener(event, callback);
};

/**
 * Returns the instance of the AdsManager.
 * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
 */
Controller.prototype.getAdsManager = function () {
  return this.sdkImpl.getAdsManager();
};

/**
 * Returns the instance of the player id.
 * @return {string} The player id.
 */
Controller.prototype.getPlayerId = function () {
  return this.playerWrapper.getPlayerId();
};

/**
 * Changes the ad tag. You will need to call requestAds after this method
 * for the new ads to be requested.
 * @param {?string} adTag The ad tag to be requested the next time
 *     requestAds is called.
 */
Controller.prototype.changeAdTag = function (adTag) {
  this.reset();
  this.settings.adTagUrl = adTag;
};

/**
 * Pauses the ad.
 */
Controller.prototype.pauseAd = function () {
  this.adUi.onAdsPaused();
  this.sdkImpl.pauseAds();
};

/**
 * Resumes the ad.
 */
Controller.prototype.resumeAd = function () {
  this.adUi.onAdsPlaying();
  this.sdkImpl.resumeAds();
};

/**
 * Toggles video/ad playback.
 */
Controller.prototype.togglePlayback = function () {
  this.playerWrapper.togglePlayback();
};

/**
 * @return {boolean} true if we expect that ads will autoplay. false otherwise.
 */
Controller.prototype.adsWillAutoplay = function () {
  if (this.settings.adsWillAutoplay !== undefined) {
    return this.settings.adsWillAutoplay;
  } else if (this.settings.adWillAutoplay !== undefined) {
    return this.settings.adWillAutoplay;
  } else {
    return !!this.playerWrapper.getPlayerOptions().autoplay;
  }
};

/**
 * @return {boolean} true if we expect that ads will autoplay. false otherwise.
 */
Controller.prototype.adsWillPlayMuted = function () {
  if (this.settings.adsWillPlayMuted !== undefined) {
    return this.settings.adsWillPlayMuted;
  } else if (this.settings.adWillPlayMuted !== undefined) {
    return this.settings.adWillPlayMuted;
  } else if (this.playerWrapper.getPlayerOptions().muted !== undefined) {
    return this.playerWrapper.getPlayerOptions().muted;
  } else {
    return this.playerWrapper.getVolume() == 0;
  }
};

/**
 * Triggers an event on the VJS player
 * @param  {string} name The event name.
 * @param  {Object} data The event data.
 */
Controller.prototype.triggerPlayerEvent = function (name, data) {
  this.playerWrapper.triggerPlayerEvent(name, data);
};

/**
 * Copyright 2021 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/**
 * Wraps the video.js stream player for the plugin.
 *
 * @param {!Object} player Video.js player instance.
 * @param {!Object} adsPluginSettings Settings for the contrib-ads plugin.
 * @param {!DaiController} daiController Reference to the parent controller.
 */
var PlayerWrapper$1 = function PlayerWrapper(player, adsPluginSettings, daiController) {
  /**
   * Instance of the video.js player.
   */
  this.vjsPlayer = player;

  /**
   * Plugin DAI controller.
   */
  this.daiController = daiController;

  /**
   * Video.js control bar.
   */
  this.vjsControls = this.vjsPlayer.getChild('controlBar');

  /**
   * Vanilla HTML5 video player underneath the video.js player.
   */
  this.h5Player = null;
  this.vjsPlayer.on('dispose', this.playerDisposedListener.bind(this));
  this.vjsPlayer.on('pause', this.onPause.bind(this));
  this.vjsPlayer.on('play', this.onPlay.bind(this));
  this.vjsPlayer.on('seeked', this.onSeekEnd.bind(this));
  this.vjsPlayer.ready(this.onPlayerReady.bind(this));
  if (!this.vjsPlayer.ads) {
    window.console.warn('You may be using a version of videojs-contrib-ads ' + 'that is not compatible with your version of video.js.');
  }
  this.vjsPlayer.ads(adsPluginSettings);
};

/**
 * Called in response to the video.js player's 'disposed' event.
 */
PlayerWrapper$1.prototype.playerDisposedListener = function () {
  this.contentEndedListeners = [];
  this.daiController.onPlayerDisposed();
};

/**
 * Called on the player 'pause' event. Handles displaying controls during
 * paused ad breaks.
 */
PlayerWrapper$1.prototype.onPause = function () {
  // This code will run if the stream is paused during an ad break. Since
  // controls are usually hidden during ads, they will now show to allow
  // users to resume ad playback.
  if (this.daiController.isInAdBreak()) {
    this.vjsControls.show();
  }
};

/**
 * Called on the player 'play' event. Handles hiding controls during
 * ad breaks while playing.
 */
PlayerWrapper$1.prototype.onPlay = function () {
  if (this.daiController.isInAdBreak()) {
    this.vjsControls.hide();
  }
};

/**
 * Called on the player's 'seeked' event. Sets up handling for ad break
 * snapback for VOD streams.
 */
PlayerWrapper$1.prototype.onSeekEnd = function () {
  this.daiController.onSeekEnd(this.vjsPlayer.currentTime());
};

/**
 * Called on the player's 'ready' event to begin initiating IMA.
 */
PlayerWrapper$1.prototype.onPlayerReady = function () {
  this.h5Player = document.getElementById(this.getPlayerId()).getElementsByClassName('vjs-tech')[0];
  this.daiController.onPlayerReady();
};

/**
 * @return {!Object} The stream player.
 */
PlayerWrapper$1.prototype.getStreamPlayer = function () {
  return this.h5Player;
};

/**
 * @return {!Object} The video.js player.
 */
PlayerWrapper$1.prototype.getVjsPlayer = function () {
  return this.vjsPlayer;
};

/**
 * @return {!Object} The vjs player's options object.
 */
PlayerWrapper$1.prototype.getPlayerOptions = function () {
  return this.vjsPlayer.options_;
};

/**
 * Returns the instance of the player id.
 * @return {string} The player id.
 */
PlayerWrapper$1.prototype.getPlayerId = function () {
  return this.vjsPlayer.id();
};

/**
 * Handles ad errors.
 *
 * @param {!Object} adErrorEvent The ad error event thrown by the IMA SDK.
 */
PlayerWrapper$1.prototype.onAdError = function (adErrorEvent) {
  this.vjsControls.show();
  var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
  this.vjsPlayer.trigger({
    type: 'adserror',
    data: {
      AdError: errorMessage,
      AdErrorEvent: adErrorEvent
    }
  });
};

/**
 * Handles ad break starting.
 */
PlayerWrapper$1.prototype.onAdBreakStart = function () {
  this.vjsControls.hide();
};

/**
 * Handles ad break ending.
 */
PlayerWrapper$1.prototype.onAdBreakEnd = function () {
  this.vjsControls.show();
};

/**
 * Reset the player.
 */
PlayerWrapper$1.prototype.reset = function () {
  this.vjsControls.show();
};

/**
 * Copyright 2021 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/**
 * Implementation of the IMA DAI SDK for the plugin.
 *
 * @param {DaiController!} daiController Reference to the parent DAI
 * controller.
 *
 * @constructor
 * @struct
 * @final
 */
var SdkImpl$1 = function SdkImpl(daiController) {
  /**
   * Plugin DAI controller.
   */
  this.daiController = daiController;

  /**
   * The html5 stream player.
   */
  this.streamPlayer = null;

  /**
   * The videoJS stream player.
   */
  this.vjsPlayer = null;

  /**
   * IMA SDK StreamManager
   */
  this.streamManager = null;

  /**
   * IMA stream UI settings.
   */
  /* eslint no-undef: 'error' */
  /* global google */
  this.uiSettings = new google.ima.dai.api.UiSettings();

  /**
   * If the stream is currently in an ad break.
   */
  this.isAdBreak = false;

  /**
   * If the stream is currently seeking from a snapback.
   */
  this.isSnapback = false;

  /**
   * Originally seeked to time, to return stream to after ads.
   */
  this.snapForwardTime = 0;

  /**
   * Timed metadata for the stream.
   */
  this.timedMetadata;

  /**
   * Timed metadata record.
   */
  this.metadataLoaded = {};
  this.SOURCE_TYPES = {
    hls: 'application/x-mpegURL',
    dash: 'application/dash+xml'
  };
};

/**
 * Creates and initializes the IMA DAI SDK objects.
 */
SdkImpl$1.prototype.initImaDai = function () {
  this.streamPlayer = this.daiController.getStreamPlayer();
  this.vjsPlayer = this.daiController.getVjsPlayer();
  this.createAdUiDiv();
  if (this.daiController.getSettings().locale) {
    this.uiSettings.setLocale(this.daiController.getSettings().locale);
  }
  this.streamManager = new google.ima.dai.api.StreamManager(this.streamPlayer, this.adUiDiv, this.uiSettings);
  this.streamPlayer.addEventListener('pause', this.onStreamPause);
  this.streamPlayer.addEventListener('play', this.onStreamPlay);
  this.streamManager.addEventListener([google.ima.dai.api.StreamEvent.Type.LOADED, google.ima.dai.api.StreamEvent.Type.ERROR, google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED, google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED], this.onStreamEvent.bind(this), false);
  this.vjsPlayer.textTracks().onaddtrack = this.onAddTrack.bind(this);
  this.vjsPlayer.trigger({
    type: 'stream-manager',
    StreamManager: this.streamManager
  });
  this.requestStream();
};

/**
 * Called when the video player has metadata to process.
 * @param {Event!} event The event that triggered this call.
 */
SdkImpl$1.prototype.onAddTrack = function (event) {
  var _this = this;
  var track = event.track;
  if (track.kind === 'metadata') {
    track.mode = 'hidden';
    track.addEventListener('cuechange', function (e) {
      var _iterator = _createForOfIteratorHelper(track.activeCues_),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cue = _step.value;
          var metadata = {};
          metadata[cue.value.key] = cue.value.data;
          _this.streamManager.onTimedMetadata(metadata);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  }
};

/**
 * Creates the ad UI container.
 */
SdkImpl$1.prototype.createAdUiDiv = function () {
  var uiDiv = document.createElement('div');
  uiDiv.id = 'ad-ui';
  // 3em is the height of the control bar.
  uiDiv.style.height = 'calc(100% - 3em)';
  this.streamPlayer.parentNode.appendChild(uiDiv);
  this.adUiDiv = uiDiv;
};

/**
 * Called on pause to update the ad UI.
 */
SdkImpl$1.prototype.onStreamPause = function () {
  if (this.isAdBreak) {
    this.adUiDiv.style.display = 'none';
  }
};

/**
 * Called on play to update the ad UI.
 */
SdkImpl$1.prototype.onStreamPlay = function () {
  if (this.isAdBreak) {
    this.adUiDiv.style.display = 'block';
  }
};

/**
 * Called on play to update the ad UI.
 * @param {number} currentTime the current time of the stream.
 */
SdkImpl$1.prototype.onSeekEnd = function (currentTime) {
  var streamType = this.daiController.getSettings().streamType;
  if (streamType === 'live') {
    return;
  }
  if (this.isSnapback) {
    this.isSnapback = false;
    return;
  }
  var previousCuePoint = this.streamManager.previousCuePointForStreamTime(currentTime);
  if (previousCuePoint && !previousCuePoint.played) {
    this.isSnapback = true;
    this.snapForwardTime = currentTime;
    this.vjsPlayer.currentTime(previousCuePoint.start);
  }
};

/**
 * Handles IMA events.
 * @param {google.ima.StreamEvent!} event the IMA event
 */
SdkImpl$1.prototype.onStreamEvent = function (event) {
  switch (event.type) {
    case google.ima.dai.api.StreamEvent.Type.LOADED:
      this.loadUrl(event.getStreamData().url);
      break;
    case google.ima.dai.api.StreamEvent.Type.ERROR:
      window.console.warn('Error loading stream, attempting to play backup ' + 'stream. ' + event.getStreamData().errorMessage);
      this.daiController.onErrorLoadingAds(event);
      if (this.daiController.getSettings().fallbackStreamUrl) {
        this.loadurl(this.daiController.getSettings().fallbackStreamUrl);
      }
      break;
    case google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED:
      this.isAdBreak = true;
      this.adUiDiv.style.display = 'block';
      this.daiController.onAdBreakStart();
      break;
    case google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED:
      this.isAdBreak = false;
      this.adUiDiv.style.display = 'none';
      this.daiController.onAdBreakEnd();
      if (this.snapForwardTime && this.snapForwardTime > this.vjsPlayer.currentTime()) {
        this.vjsPlayer.currentTime(this.snapForwardTime);
        this.snapForwardTime = 0;
      }
      break;
    default:
      break;
  }
};

/**
 * Loads the stream URL .
 * @param {string} streamUrl the URL for the stream being loaded.
 */
SdkImpl$1.prototype.loadUrl = function (streamUrl) {
  this.vjsPlayer.ready(function () {
    var streamFormat = this.daiController.getSettings().streamFormat;
    this.vjsPlayer.src({
      src: streamUrl,
      type: this.SOURCE_TYPES[streamFormat]
    });
    var bookmarkTime = this.daiController.getSettings().bookmarkTime;
    if (bookmarkTime) {
      var startTime = this.streamManager.streamTimeForContentTime(bookmarkTime);
      // Seeking on load triggers the onSeekEnd event, so treat this seek as
      // if it's snapback. Without this, resuming at a bookmark kicks you
      // back to the ad before the bookmark.
      this.isSnapback = true;
      this.vjsPlayer.currentTime(startTime);
    }
  }.bind(this));
};

/**
 * Creates the AdsRequest and request ads through the AdsLoader.
 */
SdkImpl$1.prototype.requestStream = function () {
  var streamRequest;
  var streamType = this.daiController.getSettings().streamType;
  if (streamType === 'vod') {
    streamRequest = new google.ima.dai.api.VODStreamRequest();
    streamRequest.contentSourceId = this.daiController.getSettings().cmsId;
    streamRequest.videoId = this.daiController.getSettings().videoId;
  } else if (streamType === 'live') {
    streamRequest = new google.ima.dai.api.LiveStreamRequest();
    streamRequest.assetKey = this.daiController.getSettings().assetKey;
  } else {
    window.console.warn('No valid stream type selected');
  }
  streamRequest.format = this.daiController.getSettings().streamFormat;
  if (this.daiController.getSettings().apiKey) {
    streamRequest.apiKey = this.daiController.getSettings().apiKey;
  }
  if (this.daiController.getSettings().authToken) {
    streamRequest.authToken = this.daiController.getSettings().authToken;
  }
  if (this.daiController.getSettings().adTagParameters) {
    streamRequest.adTagParameters = this.daiController.getSettings().adTagParameters;
  }
  if (this.daiController.getSettings().streamActivityMonitorId) {
    streamRequest.streamActivityMonitorId = this.daiController.getSettings().streamActivityMonitorId;
  }
  if (this.daiController.getSettings().omidMode) {
    streamRequest.omidAccessModeRules = {};
    var omidValues = this.daiController.getSettings().omidMode;
    if (omidValues.FULL) {
      streamRequest.omidAccessModeRules[google.ima.OmidAccessMode.FULL] = omidValues.FULL;
    }
    if (omidValues.DOMAIN) {
      streamRequest.omidAccessModeRules[google.ima.OmidAccessMode.DOMAIN] = omidValues.DOMAIN;
    }
    if (omidValues.LIMITED) {
      streamRequest.omidAccessModeRules[google.ima.OmidAccessMode.LIMITED] = omidValues.LIMITED;
    }
  }
  this.streamManager.requestStream(streamRequest);
  this.vjsPlayer.trigger({
    type: 'stream-request',
    StreamRequest: streamRequest
  });
};

/**
 * Initiates IMA when the player is ready.
 */
SdkImpl$1.prototype.onPlayerReady = function () {
  this.initImaDai();
};

/**
 * Reset the StreamManager when the player is disposed.
 */
SdkImpl$1.prototype.onPlayerDisposed = function () {
  if (this.streamManager) {
    this.streamManager.reset();
  }
};

/**
 * Returns the instance of the StreamManager.
 * @return {google.ima.StreamManager!} The StreamManager being used by the
 * plugin.
 */
SdkImpl$1.prototype.getStreamManager = function () {
  return this.StreamManager;
};

/**
 * Reset the SDK implementation.
 */
SdkImpl$1.prototype.reset = function () {
  if (this.StreamManager) {
    this.StreamManager.reset();
  }
};

/**
 * Copyright 2021 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/**
 * The coordinator for the DAI portion of the plugin. Facilitates
 * communication between all other plugin classes.
 *
 * @param {Object!} player Instance of the video.js player.
 * @param {Object!} options Options provided by the implementation.
 * @constructor
 * @struct
 * @final
 */
var DaiController = function DaiController(player, options) {
  /**
  * If the stream is currently in an ad break.
  * @type {boolean}
  */
  this.inAdBreak = false;

  /**
  * Stores user-provided settings.
  * @type {Object!}
  */
  this.settings = {};

  /**
  * Whether or not we are running on a mobile platform.
  */
  this.isMobile = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i);

  /**
  * Whether or not we are running on an iOS platform.
  */
  this.isIos = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i);
  this.initWithSettings(options);

  /**
  * Stores contrib-ads default settings.
  */
  var contribAdsDefaults = {
    debug: this.settings.debug,
    timeout: this.settings.timeout,
    prerollTimeout: this.settings.prerollTimeout
  };
  var adsPluginSettings = Object.assign({}, contribAdsDefaults, options.contribAdsSettings || {});
  this.playerWrapper = new PlayerWrapper$1(player, adsPluginSettings, this);
  this.sdkImpl = new SdkImpl$1(this);
};
DaiController.IMA_DEFAULTS = {
  adLabel: 'Advertisement',
  adLabelNofN: 'of',
  debug: false,
  disableAdControls: false,
  showControlsForJSAds: true
};

/**
 * Extends the settings to include user-provided settings.
 *
 * @param {Object!} options Options to be used in initialization.
 */
DaiController.prototype.initWithSettings = function (options) {
  this.settings = Object.assign({}, DaiController.IMA_DEFAULTS, options || {});
  this.warnAboutDeprecatedSettings();

  // Default showing countdown timer to true.
  this.showCountdown = true;
  if (this.settings.showCountdown === false) {
    this.showCountdown = false;
  }
};

/**
 * Logs console warnings when deprecated settings are used.
 */
DaiController.prototype.warnAboutDeprecatedSettings = function () {
  var _this = this;
  var deprecatedSettings = [
    // Currently no DAI plugin settings are deprecated.
  ];
  deprecatedSettings.forEach(function (setting) {
    if (_this.settings[setting] !== undefined) {
      console.warn('WARNING: videojs.imaDai setting ' + setting + ' is deprecated');
    }
  });
};

/**
 * Return the settings object.
 *
 * @return {Object!} The settings object.
 */
DaiController.prototype.getSettings = function () {
  return this.settings;
};

/**
 * Return whether or not we're in a mobile environment.
 *
 * @return {boolean} True if running on mobile, false otherwise.
 */
DaiController.prototype.getIsMobile = function () {
  return this.isMobile;
};

/**
 * Return whether or not we're in an iOS environment.
 *
 * @return {boolean} True if running on iOS, false otherwise.
 */
DaiController.prototype.getIsIos = function () {
  return this.isIos;
};

/**
 * @return {Object!} The html5 player.
 */
DaiController.prototype.getStreamPlayer = function () {
  return this.playerWrapper.getStreamPlayer();
};

/**
 * @return {Object!} The video.js player.
 */
DaiController.prototype.getVjsPlayer = function () {
  return this.playerWrapper.getVjsPlayer();
};

/**
 * Requests the stream.
 */
DaiController.prototype.requestStream = function () {
  this.sdkImpl.requestStream();
};

/**
 * Add or modify a setting.
 *
 * @param {string} key Key to modify
 * @param {Object!} value Value to set at key.
*/
DaiController.prototype.setSetting = function (key, value) {
  this.settings[key] = value;
};

/**
 * Called when there is an error loading ads.
 *
 * @param {Object!} adErrorEvent The ad error event thrown by the IMA SDK.
 */
DaiController.prototype.onErrorLoadingAds = function (adErrorEvent) {
  this.playerWrapper.onAdError(adErrorEvent);
};

/**
 * Relays ad errors to the player wrapper.
 *
 * @param {Object!} adErrorEvent The ad error event thrown by the IMA SDK.
 */
DaiController.prototype.onAdError = function (adErrorEvent) {
  this.playerWrapper.onAdError(adErrorEvent);
};

/**
 * Signals player that an ad break has started.
 */
DaiController.prototype.onAdBreakStart = function () {
  this.inAdBreak = true;
  this.playerWrapper.onAdBreakStart();
};

/**
 * Signals player that an ad break has ended.
 */
DaiController.prototype.onAdBreakEnd = function () {
  this.inAdBreak = false;
  this.playerWrapper.onAdBreakEnd();
};

/**
 * Called when the player is disposed.
 */
DaiController.prototype.onPlayerDisposed = function () {
  this.contentAndAdsEndedListeners = [];
  this.sdkImpl.onPlayerDisposed();
};

/**
 * Returns if the stream is currently in an ad break.
 * @return {boolean} If the stream is currently in an ad break.
 */
DaiController.prototype.isInAdBreak = function () {
  return this.inAdBreak;
};

/**
 * Called on seek end to check for ad snapback.
 * @param {number} currentTime the current time of the stream.
 */
DaiController.prototype.onSeekEnd = function (currentTime) {
  this.sdkImpl.onSeekEnd(currentTime);
};

/**
 * Called when the player is ready.
 */
DaiController.prototype.onPlayerReady = function () {
  this.sdkImpl.onPlayerReady();
};

/**
 * Resets the state of the plugin.
 */
DaiController.prototype.reset = function () {
  this.sdkImpl.reset();
  this.playerWrapper.reset();
};

/**
 * Adds an EventListener to the StreamManager. For a list of available events,
 * see
 * https://developers.google.com/ad-manager/dynamic-ad-insertion/sdk/html5/reference/js/StreamEvent
 * @param {google.ima.StreamEvent.Type!} event The AdEvent.Type for which to
 *     listen.
 * @param {callback!} callback The method to call when the event is fired.
 */
DaiController.prototype.addEventListener = function (event, callback) {
  this.sdkImpl.addEventListener(event, callback);
};

/**
 * Returns the instance of the StreamManager.
 * @return {google.ima.StreamManager!} The StreamManager being used by the
 * plugin.
 */
DaiController.prototype.getStreamManager = function () {
  return this.sdkImpl.getStreamManager();
};

/**
 * Returns the instance of the player id.
 * @return {string} The player id.
 */
DaiController.prototype.getPlayerId = function () {
  return this.playerWrapper.getPlayerId();
};

/**
 * @return {boolean} true if we expect that the stream will autoplay. false
 * otherwise.
 */
DaiController.prototype.streamWillAutoplay = function () {
  if (this.settings.streamWillAutoplay !== undefined) {
    return this.settings.streamWillAutoplay;
  } else {
    return !!this.playerWrapper.getPlayerOptions().autoplay;
  }
};

/**
 * Triggers an event on the VJS player
 * @param  {string} name The event name.
 * @param  {Object!} data The event data.
 */
DaiController.prototype.triggerPlayerEvent = function (name, data) {
  this.playerWrapper.triggerPlayerEvent(name, data);
};

/**
 * Exposes the ImaPlugin to a publisher implementation.
 *
 * @param {Object} player Instance of the video.js player to which this plugin
 *     will be added.
 * @param {Object} options Options provided by the implementation.
 * @constructor
 * @struct
 * @final
 */
var ImaPlugin = function ImaPlugin(player, options) {
  this.controller = new Controller(player, options);

  /**
   * Listener JSDoc for ESLint. This listener can be passed to
   * addContent(AndAds)EndedListener.
   * @callback listener
   */

  /**
   * Adds a listener that will be called when content and all ads have
   * finished playing.
   * @param {listener} listener The listener to be called when content and ads
   *     complete.
   */
  this.addContentAndAdsEndedListener = function (listener) {
    this.controller.addContentAndAdsEndedListener(listener);
  }.bind(this);

  /**
   * Adds a listener for the 'contentended' event of the video player. This
   * should be used instead of setting an 'contentended' listener directly to
   * ensure that the ima can do proper cleanup of the SDK before other event
   * listeners are called.
   * @param {listener} listener The listener to be called when content
   *     completes.
   */
  this.addContentEndedListener = function (listener) {
    this.controller.addContentEndedListener(listener);
  }.bind(this);

  /**
   * Callback JSDoc for ESLint. This callback can be passed to addEventListener.
   * @callback callback
   */

  /**
   * Ads an EventListener to the AdsManager. For a list of available events,
   * see
   * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdEvent#.Type
   * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to
   *     listen.
   * @param {callback} callback The method to call when the event is fired.
   */
  this.addEventListener = function (event, callback) {
    this.controller.addEventListener(event, callback);
  }.bind(this);

  /**
   * Changes the ad tag. You will need to call requestAds after this method
   * for the new ads to be requested.
   * @param {?string} adTag The ad tag to be requested the next time requestAds
   *     is called.
   */
  this.changeAdTag = function (adTag) {
    this.controller.changeAdTag(adTag);
  }.bind(this);

  /**
   * Returns the instance of the AdsManager.
   * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
   */
  this.getAdsManager = function () {
    return this.controller.getAdsManager();
  }.bind(this);

  /**
   * Initializes the AdDisplayContainer. On mobile, this must be done as a
   * result of user action.
   */
  this.initializeAdDisplayContainer = function () {
    this.controller.initializeAdDisplayContainer();
  }.bind(this);

  /**
   * Pauses the ad.
   */
  this.pauseAd = function () {
    this.controller.pauseAd();
  }.bind(this);

  /**
   * Called by publishers in manual ad break playback mode to start an ad
   * break.
   */
  this.playAdBreak = function () {
    this.controller.playAdBreak();
  }.bind(this);

  /**
   * Creates the AdsRequest and request ads through the AdsLoader.
   */
  this.requestAds = function () {
    this.controller.requestAds();
  }.bind(this);

  /**
   * Resumes the ad.
   */
  this.resumeAd = function () {
    this.controller.resumeAd();
  }.bind(this);

  /**
   * Sets the listener to be called to trigger manual ad break playback.
   * @param {listener} listener The listener to be called to trigger manual ad
   *     break playback.
   */
  this.setAdBreakReadyListener = function (listener) {
    this.controller.setAdBreakReadyListener(listener);
  }.bind(this);

  /**
   * Sets the content of the video player. You should use this method instead
   * of setting the content src directly to ensure the proper ad tag is
   * requested when the video content is loaded.
   * @param {?string} contentSrc The URI for the content to be played. Leave
   *     blank to use the existing content.
   * @param {?string} adTag The ad tag to be requested when the content loads.
   *     Leave blank to use the existing ad tag.
   */
  this.setContentWithAdTag = function (contentSrc, adTag) {
    this.controller.setContentWithAdTag(contentSrc, adTag);
  }.bind(this);

  /**
   * Sets the content of the video player. You should use this method instead
   * of setting the content src directly to ensure the proper ads response is
   * used when the video content is loaded.
   * @param {?string} contentSrc The URI for the content to be played. Leave
   *     blank to use the existing content.
   * @param {?string} adsResponse The ads response to be requested when the
   *     content loads. Leave blank to use the existing ads response.
   */
  this.setContentWithAdsResponse = function (contentSrc, adsResponse) {
    this.controller.setContentWithAdsResponse(contentSrc, adsResponse);
  }.bind(this);

  /**
   * Sets the content of the video player. You should use this method instead
   * of setting the content src directly to ensure the proper ads request is
   * used when the video content is loaded.
   * @param {?string} contentSrc The URI for the content to be played. Leave
   *     blank to use the existing content.
   * @param {?Object} adsRequest The ads request to be requested when the
   *     content loads. Leave blank to use the existing ads request.
   */
  this.setContentWithAdsRequest = function (contentSrc, adsRequest) {
    this.controller.setContentWithAdsRequest(contentSrc, adsRequest);
  }.bind(this);

  /**
   * Changes the flag to show or hide the ad countdown timer.
   *
   * @param {boolean} showCountdownIn Show or hide the countdown timer.
   */
  this.setShowCountdown = function (showCountdownIn) {
    this.controller.setShowCountdown(showCountdownIn);
  }.bind(this);
};

/**
 * Exposes the ImaDaiPlugin to a publisher implementation.
 *
 * @param {Object} player Instance of the video.js player to which this plugin
 *     will be added.
 * @param {Object} options Options provided by the implementation.
 * @constructor
 * @struct
 * @final
 */
var ImaDaiPlugin = function ImaDaiPlugin(player, options) {
  this.controller = new DaiController(player, options);

  /**
   * Adds a listener that will be called when content and all ads in the
   * stream have finished playing. VOD stream only.
   * @param {listener} listener The listener to be called when content and ads
   *     complete.
   */
  this.streamEndedListener = function (listener) {
    this.controller.addStreamEndedListener(listener);
  }.bind(this);

  /**
   * Adds an EventListener to the StreamManager.
   * @param {google.ima.StreamEvent.Type} event The StreamEvent.Type for which
   * to listen.
   * @param {callback} callback The method to call when the event is fired.
   */
  this.addEventListener = function (event, callback) {
    this.controller.addEventListener(event, callback);
  }.bind(this);

  /**
   * Returns the instance of the StreamManager.
   * @return {google.ima.StreamManager} The StreamManager being used by the
   * plugin.
   */
  this.getStreamManager = function () {
    return this.controller.getStreamManager();
  }.bind(this);
};

/**
 * Initializes the plugin for client-side ads.
 * @param {Object} options Plugin option set on initiation.
 */
var init = function init(options) {
  /* eslint no-invalid-this: 'off' */
  this.ima = new ImaPlugin(this, options);
};

/**
 * LiveStream class used for DAI live streams.
 */
var LiveStream = /*#__PURE__*/_createClass(
/**
 * LiveStream class constructor used for DAI live streams.
 * @param {string} streamFormat stream format, plugin currently supports only
 * 'hls' streams.
 * @param {string} assetKey live stream's asset key.
 */
function LiveStream(streamFormat, assetKey) {
  _classCallCheck(this, LiveStream);
  streamFormat = streamFormat.toLowerCase();
  if (streamFormat !== 'hls' && streamFormat !== 'dash') {
    window.console.error('VodStream error: incorrect streamFormat.');
    return;
  } else if (streamFormat === 'dash') {
    window.console.error('streamFormat error: DASH streams are not' + 'currently supported by this plugin.');
    return;
  } else if (typeof assetKey !== 'string') {
    window.console.error('assetKey error: value must be string.');
    return;
  }
  this.streamFormat = streamFormat;
  this.assetKey = assetKey;
});
/**
 * VodStream class used for DAI VOD streams.
 */
var VodStream = /*#__PURE__*/_createClass(
/**
 * VodStream class constructor used for DAI VOD streams.
 * @param {string} streamFormat stream format, plugin currently supports only
 * 'hls' streams.
 * @param {string} cmsId VOD stream's CMS ID.
 * @param {string} videoId VOD stream's video ID.
 */
function VodStream(streamFormat, cmsId, videoId) {
  _classCallCheck(this, VodStream);
  streamFormat = streamFormat.toLowerCase();
  if (streamFormat !== 'hls' && streamFormat !== 'dash') {
    window.console.error('VodStream error: incorrect streamFormat.');
    return;
  } else if (streamFormat === 'dash') {
    window.console.error('streamFormat error: DASH streams are not' + 'currently supported by this plugin.');
    return;
  } else if (typeof cmsId !== 'string') {
    window.console.error('cmsId error: value must be string.');
    return;
  } else if (typeof videoId !== 'string') {
    window.console.error('videoId error: value must be string.');
    return;
  }
  this.streamFormat = streamFormat;
  this.cmsId = cmsId;
  this.videoId = videoId;
});
/**
 * Initializes the plugin for DAI ads.
 * @param {Object} stream Accepts either an instance of the LiveStream or
 * VodStream classes.
 * @param {Object} options Plugin option set on initiation.
 */
var initDai = function initDai(stream, options) {
  if (stream instanceof LiveStream) {
    options.streamType = 'live';
    options.assetKey = stream.assetKey;
  } else if (stream instanceof VodStream) {
    options.streamType = 'vod';
    options.cmsId = stream.cmsId;
    options.videoId = stream.videoId;
  } else {
    window.console.error('initDai() first parameter must be an instance of LiveStream or ' + 'VodStream.');
    return;
  }
  options.streamFormat = stream.streamFormat;
  /* eslint no-invalid-this: 'off' */
  this.imaDai = new ImaDaiPlugin(this, options);
};
var registerPlugin = (video_js__WEBPACK_IMPORTED_MODULE_0___default().registerPlugin) || (video_js__WEBPACK_IMPORTED_MODULE_0___default().plugin);
registerPlugin('ima', init);
registerPlugin('imaDai', initDai);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImaPlugin);



/***/ }),

/***/ "?9835":
/*!******************************!*\
  !*** min-document (ignored) ***!
  \******************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=ima.light.js.map