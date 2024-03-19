/*! @name videojs-contrib-ads @version 7.5.0 @license Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js'), require('global/window'), require('global/document')) :
  typeof define === 'function' && define.amd ? define(['video.js', 'global/window', 'global/document'], factory) :
  (global = global || self, global.videojsContribAds = factory(global.videojs, global.window, global.document));
}(this, function (videojs, window, document) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;
  window = window && window.hasOwnProperty('default') ? window['default'] : window;
  document = document && document.hasOwnProperty('default') ? document['default'] : document;

  var version = "7.5.0";

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
      // Contains error information when an error occurs in contrib-ads.
      // When set, will contain an object with a type and metadata.
      _error: null,
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
        player.ads._error = null;
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
          videojs.log.warn('Using player.ads.stitchedAds() as a setter is deprecated, ' + 'it should be set as an option upon initialization of contrib-ads.');

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
        } else if (videojs.browser.IOS_VERSION === '8' && somePlayer.duration() === 0) {
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
          return !videojs.browser.IS_IOS && !videojs.browser.IS_ANDROID && somePlayer.duration() === Infinity;
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
            videojs.log('ADS: ' + args[0]);
          } else {
            videojs.log.apply(videojs, ['ADS:'].concat(args));
          }
        }
      },
      /**
       * Set or get the current ads error.
       *
       * @fires Player#vjsadserror
       *
       * @param {import('video.js/dist/types/media-error').ErrorMetadata|null} [err]
       *      The error to be set. This can either be a string
       *      of the error type, or it can be an object containing the
       *      type, along with error metadata.
       *      If nothing is passed in, this function will return the current error.
       * @param {string} err.errorType The error type.
       *
       * @return {Object|null|undefined}
       *      The current ads error. The function will return undefined if the function
       *      is used to set an error. It will return null if there is no error.
       */
      error: function error(err) {
        // If `err` doesn't exist, return the current error.
        if (err === undefined) {
          return this._error || null;
        }

        // If `err` is null or not a valid error, reset the ads error.
        if (err === null || !err.errorType) {
          this._error = null;
          return;
        }
        this._error = err;
        videojs.log.error("An error with Ads occured. Type: " + err.errorType + ".");

        /**
         * @event Player#vjsadserror
         * @type {Event}
         */
        player.trigger({
          type: 'vjsadserror',
          error: this._error
        });
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
    if (videojs.dom.isInFrame() && typeof window.__tcfapi !== 'function') {
      var frame = window;
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
        if (frame === window.top) {
          break;
        }
        frame = frame.parent;
      }
      if (!cmpFrame) {
        return;
      }
      window.__tcfapi = function (cmd, version, callback, arg) {
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
      window.addEventListener('message', function (event) {
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
    if (typeof window.__tcfapi === 'function') {
      window.__tcfapi('addEventListener', 2, function (data, success) {
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
      windowObj = window;
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
      '{player.pageUrl}': videojs.dom.isInFrame() ? document.referrer : window.location.href,
      '{playlistinfo.id}': player.playlistinfo ? player.playlistinfo.id : '',
      '{playlistinfo.name}': player.playlistinfo ? player.playlistinfo.name : '',
      '{timestamp}': new Date().getTime(),
      '{document.referrer}': document.referrer,
      '{window.location.href}': window.location.href,
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
      var context = window;
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
          videojs.log.warn("Page variable \"" + name + "\" not found");
          pageVariablesMacros[key] = '';
        }
      } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
        videojs.log.warn("Page variable \"" + name + "\" is not a supported type");
        pageVariablesMacros[key] = '';
      } else {
        pageVariablesMacros[key] = value;
      }
    });
    return pageVariablesMacros;
  };
  var replaceMacros = function replaceMacros(string, macros, uriEncode, overrides, player) {
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
          player.ads.error({
            errorType: videojs.Error.AdsMacroReplacementFailed,
            macro: macroName,
            error: error
          });
          videojs.log.warn("Unable to replace macro with regex \"" + resolvedMacroName + "\". The provided regex may be invalid.");
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
    string = replaceMacros(string, macros, uriEncode, macroNameOverrides, this);

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

  function initCancelContentPlay(player, debug) {
    if (debug) {
      videojs.log('Using cancelContentPlay to block content playback');
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
  var videojsReference = videojs;

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
            if (e.name === 'NotAllowedError' && !videojs.browser.IS_SAFARI) {
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
    if (videojs.getPlugin) {
      return Boolean(videojs.getPlugin('ads'));
    }

    // Video.js 5 does not have a getPlugin method, so check the player prototype.
    var Player = videojs.getComponent('Player');
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
    if (hasAdsPlugin(videojs)) {
      return false;
    }

    // Cross-compatibility with Video.js 6/7 and 5.
    var registerPlugin = videojs.registerPlugin || videojs.plugin;

    // Register this plugin with Video.js.
    registerPlugin('ads', contribAdsPlugin);

    // Register the play middleware with Video.js on script execution,
    // to avoid a new playMiddleware factory being added for each player.
    // The `usingContribAdsMiddleware_` flag is used to ensure that we only ever
    // register the middleware once - despite the ability to de-register and
    // re-register the plugin itself.
    if (isMiddlewareMediatorSupported() && !videojs.usingContribAdsMiddleware_) {
      // Register the play middleware
      videojs.use('*', playMiddleware);
      videojs.usingContribAdsMiddleware_ = true;
      videojs.log.debug('Play middleware has been registered with videojs');
    }
    return true;
  }

  var OUTSTREAM_VIDEO = {
    src: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAMFbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAACgAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAjB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAABQAAAALQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAoAAAAAAABAAAAAAGobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAyAAAAAgBVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAARNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAABQAC0ABIAAAASAAAAAAAAAABFExhdmM2MC4zLjEwMCBsaWJ4MjY0AAAAAAAAAAAAAAAAGP//AAAANWF2Y0MBZAAf/+EAGGdkAB/zZQFAFuhAAAADAEAAAAyDxgxlgAEABmjr48siwPz4+AAAAAAUYnRydAAAAAAAArEQAAKxEAAAABhzdHRzAAAAAAAAAAEAAAABAAACAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAANyAAAAAQAAABRzdGNvAAAAAAAAAAEAAAM1AAAAYXVkdGEAAABZbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAsaWxzdAAAACSpdG9vAAAAHGRhdGEAAAABAAAAAExhdmY2MC4zLjEwMAAAAAhmcmVlAAADem1kYXQAAAKvBgX//6vcRem95tlIt5Ys2CDZI+7veDI2NCAtIGNvcmUgMTY0IHIzMDk1IGJhZWU0MDAgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDIyIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MSByZWY9MyBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgzOjB4MTEzIG1lPWhleCBzdWJtZT03IHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTAgdHJlbGxpcz0xIDh4OGRjdD0xIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MTIgbG9va2FoZWFkX3RocmVhZHM9MiBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAu2WIhAAr//712/Msrm6aNt72NzYJPxaInwAZmgAAAwAAAwAAAwAAFmhoUruNAYyHgAAAAwAAHDAAjoAFsABLAATIAGCACcgA/QAbAAN4AISAFoADHAAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwAASUE=',
    type: 'video/mp4'
  };

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
      videojs.log.warn('Unexpected adsready event');
    };
    _proto.onAdsError = function onAdsError() {};
    _proto.onAdsCanceled = function onAdsCanceled() {};
    _proto.onAdTimeout = function onAdTimeout() {};
    _proto.onAdStarted = function onAdStarted() {};
    _proto.onAdSkipped = function onAdSkipped() {};
    _proto.onContentChanged = function onContentChanged() {};
    _proto.onContentResumed = function onContentResumed() {};
    _proto.onReadyForPostroll = function onReadyForPostroll() {
      videojs.log.warn('Unexpected readyforpostroll event');
    };
    _proto.onNoPreroll = function onNoPreroll() {};
    _proto.onNoPostroll = function onNoPostroll() {}

    /*
     * Method handlers. Different states can override these to provide behaviors.
     */;
    _proto.startLinearAdMode = function startLinearAdMode() {
      videojs.log.warn('Unexpected startLinearAdMode invocation ' + '(State via ' + this.constructor._getName() + ')');
    };
    _proto.endLinearAdMode = function endLinearAdMode() {
      videojs.log.warn('Unexpected endLinearAdMode invocation ' + '(State via ' + this.constructor._getName() + ')');
    };
    _proto.skipLinearAdMode = function skipLinearAdMode() {
      videojs.log.warn('Unexpected skipLinearAdMode invocation ' + '(State via ' + this.constructor._getName() + ')');
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
      videojs.log.warn('Unexpected startLinearAdMode invocation (AdsDone)');
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

        // iOS live play after restore if player was paused (would not be paused if
        // ad played muted behind ad)
        if (player.paused()) {
          var playPromise = player.play();
          if (playPromise && playPromise.catch) {
            playPromise.catch(function (error) {
              videojs.log.warn('Play promise rejected in IOS snapshot resume', error);
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
            videojs.log.warn('Play promise rejected in snapshot resume', error);
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
          player.ads.error({
            errorType: videojs.Error.AdsResumeContentFailed,
            error: e
          });
          videojs.log.warn('Failed to resume the content after an advertisement', e);
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
      if (videojs.browser.IS_IOS && !player.autoplay() && typeof player.techCall_ === 'function') {
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
            videojs.log.warn('Play promise rejected in snapshot restore', error);
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
    if (player.ads.shouldPlayContentBehindAd(player) && !player.ads.settings.stitchedAds) {
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
      if (player.ads.preAdVolume_) {
        player.volume(player.ads.preAdVolume_);
      }
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
        videojs.log.warn('Unexpected adsready event (Preroll)');
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
      videojs.log('adserror (Preroll)');
      player.ads.error({
        errorType: videojs.Error.AdsPrerollError
      });

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
        videojs.log.warn('Unexpected startLinearAdMode invocation (Preroll)');
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
        videojs.log.warn('Unexpected skipLinearAdMode invocation');
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
        videojs.log.warn('Unexpected nopreroll event (Preroll)');
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
        videojs.log.warn('Leaving Preroll state before loadstart event can cause issues.');
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
      this.player.ads.error({
        errorType: videojs.Error.BeforePrerollError
      });
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
      player.ads.error({
        errorType: videojs.Error.AdsMidrollError
      });

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
        videojs.log.warn('Unexpected startLinearAdMode invocation (Postroll)');
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
        videojs.log.warn('Unexpected skipLinearAdMode invocation');
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
      player.ads.error({
        errorType: videojs.Error.AdsPostrollError
      });

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
        videojs.log.warn('Unexpected nopostroll event (Postroll)');
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

  var AdState$5 = States.getState('AdState');

  /**
   * This is the initial state for a player in outstream mode. Once a 'play' event
   * is seen, we enter the OutstreamPlayback state. If any errors occur, we go
   * straight from OutstreamPlayback to OutstreamDone.
   */
  var OutstreamPending = /*#__PURE__*/function (_AdState) {
    _inheritsLoose(OutstreamPending, _AdState);
    function OutstreamPending() {
      return _AdState.apply(this, arguments) || this;
    }
    /**
     * Allows state name to be logged after minification
     */
    OutstreamPending._getName = function _getName() {
      return 'OutstreamPending';
    }

    /*
     * For state transitions to work correctly, initialization should
     * happen here, not in a constructor.
     */;
    var _proto = OutstreamPending.prototype;
    _proto.init = function init(player) {
      this.adsReady = false;
    };
    _proto.onPlay = function onPlay(player) {
      var OutstreamPlayback = States.getState('OutstreamPlayback');
      player.ads.debug('Received play event (OutstreamPending)');
      this.transitionTo(OutstreamPlayback, this.adsReady);
    };
    _proto.onAdsReady = function onAdsReady(player) {
      player.ads.debug('Received adsready event (OutstreamPending)');
      this.adsReady = true;
    };
    _proto.onAdsError = function onAdsError() {
      this.player.ads.debug('adserror (OutstreamPending)');
      this.adsReady = false;
    };
    return OutstreamPending;
  }(AdState$5);
  States.registerState('OutstreamPending', OutstreamPending);

  var AdState$6 = States.getState('AdState');

  /**
   * This state is for waiting for ads in an outstream player,
   * playing ads, and transitioning to OutstreamDone after ads have played.
   */
  var OutstreamPlayback = /*#__PURE__*/function (_AdState) {
    _inheritsLoose(OutstreamPlayback, _AdState);
    function OutstreamPlayback() {
      return _AdState.apply(this, arguments) || this;
    }
    /**
     * Allows state name to be logged after minification
     */
    OutstreamPlayback._getName = function _getName() {
      return 'OutstreamPlayback';
    }

    /*
     * For state transitions to work correctly, initialization should
     * happen here, not in a constructor.
     */;
    var _proto = OutstreamPlayback.prototype;
    _proto.init = function init(player, adsReady) {
      player.addClass('vjs-ad-loading');
      if (adsReady) {
        this.handleAdsReady();
      } else {
        this.abort(player);
      }
    };
    _proto.onAdsReady = function onAdsReady(player) {
      if (!player.ads.inAdBreak()) {
        player.ads.debug('Received adsready event (Preroll)');
        this.handleAdsReady();
      } else {
        videojs.log.warn('Unexpected adsready event (Preroll)');
      }
    };
    _proto.abort = function abort(player) {
      var OutstreamDone = States.getState('OutstreamDone');
      player.removeClass('vjs-ad-loading');
      this.transitionTo(OutstreamDone);
    }

    /*
     * An ad has actually started playing.
     * Remove the loading spinner.
     */;
    _proto.onAdStarted = function onAdStarted(player) {
      player.removeClass('vjs-ad-loading');
    };
    _proto.handleAdsReady = function handleAdsReady() {
      this.adsReady = true;
      this.readyForOutstreamPlayback();
    };
    _proto.readyForOutstreamPlayback = function readyForOutstreamPlayback() {
      var player = this.player;
      this.afterLoadStart(function () {
        player.trigger('readyforoutstream');
      });
    };
    _proto.startLinearAdMode = function startLinearAdMode() {
      var player = this.player;
      if (this.adsReady && !player.ads.inAdBreak()) {
        obj$1.start(player);
      }
    }

    /*
     * Cleanup timeouts and spinner.
     */;
    _proto.cleanup = function cleanup(player) {
      if (!player.ads._hasThereBeenALoadStartDuringPlayerLife) {
        videojs.log.warn('Leaving OutstreamPlayback state before loadstart event can cause issues.');
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
     * Clear the outstream ad timeout and nulls out the pointer.
     */;
    _proto.clearTimeout = function clearTimeout(player) {
      player.clearTimeout(this._timeout);
      this._timeout = null;
    };
    _proto.onAdStarted = function onAdStarted(player) {
      player.removeClass('vjs-ad-loading');
    }

    /*
     * An ad error occured. Transition straight to OutstreamDone
     */;
    _proto.onAdsError = function onAdsError(player) {
      var _this = this;
      videojs.log('adserror (OutstreamPlayback)');
      if (this.inAdBreak()) {
        player.ads.endLinearAdMode();
      } else {
        this.afterLoadStart(function () {
          _this.abort(player);
        });
      }
    }

    /*
     * Outstream ad took too long! Play content instead.
     */;
    _proto.onAdTimeout = function onAdTimeout(player) {
      var _this2 = this;
      this.afterLoadStart(function () {
        player.ads.debug('adtimeout (OutstreamPlayback)');
        _this2.abort(player);
      });
    };
    _proto.onAdsCanceled = function onAdsCanceled(player) {
      var _this3 = this;
      player.ads.debug('adscanceled (OutstreamPlaybac)');
      this.afterLoadStart(function () {
        _this3.abort(player);
      });
    };
    _proto.endLinearAdMode = function endLinearAdMode() {
      var _this4 = this;
      if (this.inAdBreak()) {
        this.player.removeClass('vjs-ad-loading');
        var OutstreamDone = States.getState('OutstreamDone');
        obj$1.end(this.player, function () {
          _this4.transitionTo(OutstreamDone);
        });
      }
    };
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

    /**
     * Ad plugin has skipped ad - transition to OutstreamDone
     */;
    _proto.skipLinearAdMode = function skipLinearAdMode() {
      var _this5 = this;
      var player = this.player;
      var OutstreamDone = States.getState('OutstreamDone');
      if (this.inAdBreak()) {
        videojs.log.warn('Unexpected skipLinearAdMode invocation');
      } else {
        this.afterLoadStart(function () {
          player.trigger('adskip');
          player.ads.debug('skipLinearAdMode (OutstreamPlayback)');
          _this5.transitionTo(OutstreamDone);
        });
      }
    };
    return OutstreamPlayback;
  }(AdState$6);
  States.registerState('OutstreamPlayback', OutstreamPlayback);

  var AdState$7 = States.getState('AdState');

  /**
   * This is the final state for a player in outstream mode. There
   * should be no more ads playing once the player has transitioned
   * to this state.
   */
  var OutstreamDone = /*#__PURE__*/function (_AdState) {
    _inheritsLoose(OutstreamDone, _AdState);
    function OutstreamDone() {
      return _AdState.apply(this, arguments) || this;
    }
    /**
     * Allows state name to be logged after minification
     */
    OutstreamDone._getName = function _getName() {
      return 'OutstreamDone';
    }

    /*
     * For state transitions to work correctly, initialization should
     * happen here, not in a constructor.
     */;
    var _proto = OutstreamDone.prototype;
    _proto.init = function init(player) {
      player.trigger('ended');
    }

    /*
     * No more ads should play after this state.
     */;
    _proto.startLinearAdMode = function startLinearAdMode() {
      videojs.log.warn('Unexpected startLinearAdMode invocation (OutstreamDone)');
    };
    return OutstreamDone;
  }(AdState$7);
  States.registerState('OutstreamDone', OutstreamDone);

  /*
  This main plugin file is responsible for the public API and enabling the features
  that live in in separate files.
  */
  var isMiddlewareMediatorSupported$1 = obj.isMiddlewareMediatorSupported;
  var VIDEO_EVENTS = videojs.getTech('Html5').Events;

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
    allowVjsAutoplay: videojs.options.normalizeAutoplay || false
  };
  var contribAdsPlugin = function contribAdsPlugin(options) {
    var player = this; // eslint-disable-line consistent-this

    var settings = videojs.obj.merge(defaults, options);

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
        videojs.log.error('videojs-contrib-ads has not seen a loadstart event 5 seconds ' + 'after being initialized, but a source is present. This indicates that ' + 'videojs-contrib-ads was initialized too late. It must be initialized ' + 'immediately after video.js in the same tick. As a result, some ads will not ' + 'play and some media events will be incorrect. For more information, see ' + 'http://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html');
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
          videojs.log.warn('Play promise rejected when playing ad', error);
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
    if (settings.playerMode === 'outstream') {
      // Set a 0s mp4 file to enable ads to play
      player.src(OUTSTREAM_VIDEO);
      player.ads._state = new (States.getState('OutstreamPending'))(player);
    } else if (settings.stitchedAds) {
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
      return !player.ads.shouldPlayContentBehindAd(player) && player.ads.inAdBreak() && player.tech_.featuresNativeTextTracks && videojs.browser.IS_IOS &&
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

  return contribAdsPlugin;

}));
