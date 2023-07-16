(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["ima"],{

/***/ "./plugins/ima/ima.js":
/*!****************************!*\
  !*** ./plugins/ima/ima.js ***!
  \****************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable */
/**
 * Copyright 2014 Google Inc.
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

(function (factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js"), __webpack_require__(/*! videojs-contrib-ads */ "../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (videojs) {
      factory(window, document, videojs["default"] || videojs);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var vjs; }
})(function (window, document, videojs) {
  "use strict";

  var extend = function extend(obj) {
    var arg;
    var index;
    var key;
    for (index = 1; index < arguments.length; index++) {
      arg = arguments[index];
      for (key in arg) {
        if (arg.hasOwnProperty(key)) {
          obj[key] = arg[key];
        }
      }
    }
    return obj;
  };
  var ima_defaults = {
    debug: false,
    timeout: 5000,
    prerollTimeout: 100,
    adLabel: 'Advertisement',
    showControlsForAds: true,
    showControlsForJSAds: true,
    adsRenderingSettings: {
      uiElements: []
    }
  };
  var eventTypes = videojs.browser.IS_ANDROID || videojs.browser.IS_IOS ? {
    click: 'touchend',
    mousedown: 'touchstart',
    mouseup: 'touchend',
    mousemove: 'touchmove'
  } : {
    click: 'click',
    mousedown: 'mousedown',
    mouseup: 'mouseup',
    mousemove: 'mousemove'
  };
  var init = function init(options, readyCallback) {
    this.ima = new ImaPlugin(this, options, readyCallback);
  };
  var ImaPlugin = function ImaPlugin(player, options, readyCallback) {
    this.player = player;

    /**
     * Assigns the unique id and class names to the given element as well as the style class
     * @param element
     * @param controlName
     * @private
     */
    var assignControlAttributes_ = function (element, controlName) {
      element.id = this.controlPrefix + controlName;
      element.className = this.controlPrefix + controlName + ' ' + controlName;
    }.bind(this);

    /**
     * Returns a regular expression to test a string for the given className
     * @param className
     * @returns {RegExp}
     * @private
     */
    var getClassRegexp_ = function getClassRegexp_(className) {
      // Matches on
      // (beginning of string OR NOT word char)
      // classname
      // (negative lookahead word char OR end of string)
      return new RegExp('(^|[^A-Za-z-])' + className + '((?![A-Za-z-])|$)', 'gi');
    };

    /**
     * Adds a class to the given element if it doesn't already have the class
     * @param element
     * @param classToAdd
     * @private
     */
    var addClass_ = function addClass_(element, classToAdd) {
      if (getClassRegexp_(classToAdd).test(element.className)) {
        return element;
      }
      return element.className = element.className.trim() + ' ' + classToAdd;
    };

    /**
     * Removes a class from the given element if it has the given class
     * @param element
     * @param classToRemove
     * @private
     */
    var removeClass_ = function removeClass_(element, classToRemove) {
      var classRegexp = getClassRegexp_(classToRemove);
      if (!classRegexp.test(element.className)) {
        return element;
      }
      return element.className = element.className.trim().replace(classRegexp, '');
    };

    /**
     * Creates the ad container passed to the IMA SDK.
     * @private
     */
    var createAdContainer_ = function () {
      // The adContainerDiv is the DOM of the element that will house
      // the ads and ad controls.
      this.vjsControls = this.player.getChild('controlBar');
      this.adContainerDiv = this.vjsControls.el().parentNode.appendChild(document.createElement('div'));
      assignControlAttributes_(this.adContainerDiv, 'ima-ad-container');
      this.adContainerDiv.style.position = "absolute";
      this.adContainerDiv.addEventListener('mouseenter', showAdControls_, false);
      this.adContainerDiv.addEventListener('mouseleave', hideAdControls_, false);
      createControls_();
      this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerDiv, this.contentPlayer);
      this.showAdContainer(!this.settings.manual);
    }.bind(this);

    /**
     * Creates the controls for the ad.
     * @private
     */
    var createControls_ = function () {
      this.controlsDiv = document.createElement('div');
      assignControlAttributes_(this.controlsDiv, 'ima-controls-div');
      this.controlsDiv.style.width = '100%';
      this.countdownDiv = document.createElement('div');
      assignControlAttributes_(this.countdownDiv, 'ima-countdown-div');
      this.countdownDiv.innerHTML = this.settings.adLabel;
      this.countdownDiv.style.display = this.showCountdown ? '' : 'none';
      this.seekBarDiv = document.createElement('div');
      assignControlAttributes_(this.seekBarDiv, 'ima-seek-bar-div');
      this.seekBarDiv.style.width = '100%';
      this.progressDiv = document.createElement('div');
      assignControlAttributes_(this.progressDiv, 'ima-progress-div');
      this.playPauseDiv = document.createElement('div');
      assignControlAttributes_(this.playPauseDiv, 'ima-play-pause-div');
      addClass_(this.playPauseDiv, 'ima-playing');
      this.playPauseDiv.addEventListener(eventTypes.click, onAdPlayPauseClick_, false);
      this.muteDiv = document.createElement('div');
      assignControlAttributes_(this.muteDiv, 'ima-mute-div');
      addClass_(this.muteDiv, 'ima-non-muted');
      this.muteDiv.addEventListener(eventTypes.click, onAdMuteClick_, false);
      this.sliderDiv = document.createElement('div');
      assignControlAttributes_(this.sliderDiv, 'ima-slider-div');
      this.sliderDiv.addEventListener(eventTypes.mousedown, onAdVolumeSliderMouseDown_, false);
      this.sliderLevelDiv = document.createElement('div');
      assignControlAttributes_(this.sliderLevelDiv, 'ima-slider-level-div');
      this.fullscreenDiv = document.createElement('div');
      assignControlAttributes_(this.fullscreenDiv, 'ima-fullscreen-div');
      addClass_(this.fullscreenDiv, 'ima-non-fullscreen');
      this.fullscreenDiv.addEventListener(eventTypes.click, onAdFullscreenClick_, false);
      this.adContainerDiv.appendChild(this.controlsDiv);
      this.controlsDiv.appendChild(this.seekBarDiv);
      this.controlsDiv.appendChild(this.playPauseDiv);
      this.controlsDiv.appendChild(this.muteDiv);
      this.controlsDiv.appendChild(this.sliderDiv);
      this.controlsDiv.appendChild(this.fullscreenDiv);
      this.seekBarDiv.appendChild(this.progressDiv);
      this.sliderDiv.appendChild(this.sliderLevelDiv);
      if (this.settings.vjsControls) {
        this.initVjsControls();
        this.controlsDiv.style.display = 'none';
        this.vjsControls.el().appendChild(this.countdownDiv);
      } else {
        this.controlsDiv.appendChild(this.countdownDiv);
      }
    }.bind(this);
    this.showAdContainer = function (show) {
      this.adContainerDiv.style.display = show ? 'block' : 'none';
      this.player.toggleClass('vjs-ima-ad', show);
    }.bind(this);

    /**
     * Initializes the AdDisplayContainer. On mobile, this must be done as a
     * result of user action.
     */
    this.initializeAdDisplayContainer = function () {
      this.adDisplayContainerInitialized = true;
      this.adDisplayContainer.initialize();
    }.bind(this);

    /**
     * Creates the AdsRequest and request ads through the AdsLoader.
     */
    this.requestAds = function () {
      if (!this.adDisplayContainerInitialized) {
        this.adDisplayContainer.initialize();
      }
      var adsRequest = new google.ima.AdsRequest();
      if (this.settings.adTagUrl) {
        adsRequest.adTagUrl = this.settings.adTagUrl;
      } else {
        adsRequest.adsResponse = this.settings.adsResponse;
      }
      if (this.settings.forceNonLinearFullSlot) {
        adsRequest.forceNonLinearFullSlot = true;
      }
      adsRequest.linearAdSlotWidth = this.getPlayerWidth();
      adsRequest.linearAdSlotHeight = this.getPlayerHeight();
      adsRequest.nonLinearAdSlotWidth = this.settings.nonLinearWidth || this.getPlayerWidth();
      adsRequest.nonLinearAdSlotHeight = this.settings.nonLinearHeight || this.getPlayerHeight() / 3;
      adsRequest.vastLoadTimeout = Math.max(this.settings.prerollTimeout, this.settings.postrollTimeout);
      this.adsLoader.requestAds(adsRequest);
    }.bind(this);

    /**
     * Listener for the ADS_MANAGER_LOADED event. Creates the AdsManager,
     * sets up event listeners, and triggers the 'adsready' event for
     * videojs-ads-contrib.
     * @private
     */
    var onAdsManagerLoaded_ = function (adsManagerLoadedEvent) {
      this.adsManager = adsManagerLoadedEvent.getAdsManager(this.contentPlayheadTracker, this.adsRenderingSettings);
      this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, onAdBreakReady_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, onAllAdsCompleted_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdLoaded_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdStarted_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, onAdPlayPauseClick_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this.onAdComplete_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, this.onAdPaused_);
      this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, this.onAdResumed_);
      var eventsMap = {
        'load': google.ima.AdEvent.Type.LOADED,
        'ad-started': google.ima.AdEvent.Type.STARTED,
        'click': google.ima.AdEvent.Type.CLICK,
        'ad-ended': google.ima.AdEvent.Type.COMPLETE,
        'ad-skipped': google.ima.AdEvent.Type.SKIPPED,
        'first-quartile': google.ima.AdEvent.Type.FIRST_QUARTILE,
        'midpoint': google.ima.AdEvent.Type.MIDPOINT,
        'third-quartile': google.ima.AdEvent.Type.THIRD_QUARTILE,
        'impression': google.ima.AdEvent.Type.IMPRESSION,
        'pause': google.ima.AdEvent.Type.PAUSED,
        'play': google.ima.AdEvent.Type.RESUMED,
        'mute': google.ima.AdEvent.Type.VOLUME_MUTED,
        'allpods-completed': google.ima.AdEvent.Type.ALL_ADS_COMPLETED
      };
      Object.keys(eventsMap).forEach(function (event) {
        this.adsManager.addEventListener(eventsMap[event], function () {
          this.player.trigger('ads-' + event);
        }.bind(this));
      }.bind(this));
      setAdMuted(this.player.muted());
      if (!this.autoPlayAdBreaks) {
        try {
          var initWidth = this.getPlayerWidth();
          var initHeight = this.getPlayerHeight();
          this.adsManagerDimensions.width = initWidth;
          this.adsManagerDimensions.height = initHeight;
          this.adsManager.init(initWidth, initHeight, google.ima.ViewMode.NORMAL);
          this.adsManager.setVolume(this.player.muted() ? 0 : this.player.volume());
        } catch (adError) {
          onAdError_(adError);
        }
      }
      var cuepoints = this.adsManager.getCuePoints();
      var foundpreroll = !cuepoints.length; // no playlist, just preroll
      var foundpostroll = false;
      ;
      cuepoints.forEach(function (offset) {
        if (!offset) foundpreroll = true;else if (offset == -1) foundpostroll = true;
      });
      if (!foundpreroll) this.player.trigger('nopreroll');
      if (!foundpostroll) this.player.trigger('nopostroll');
      if (cuepoints.length) this.player.trigger('ads-cuepoints', cuepoints);
      this.player.trigger('adsready');
    }.bind(this);

    /**
     * DEPRECATED: Use startFromReadyCallback
     * Start ad playback, or content video playback in the absence of a
     * pre-roll.
     */
    this.start = function () {
      window.console.log('WARNING: player.ima.start is deprecated. Use ' + 'player.ima.startFromReadyCallback instead.');
    };

    /**
     * Start ad playback, or content video playback in the absence of a
     * pre-roll. **NOTE**: This method only needs to be called if you provide
     * your own readyCallback as the second parameter to player.ima(). If you
     * only provide options and do not provide your own readyCallback,
     * **DO NOT** call this method. If you do provide your own readyCallback,
     * you should call this method in the last line of that callback. For more
     * info, see this method's usage in our advanced and playlist examples.
     */
    this.startFromReadyCallback = function () {
      if (this.autoPlayAdBreaks && this.adsManager) {
        try {
          this.adsManager.init(this.getPlayerWidth(), this.getPlayerHeight(), google.ima.ViewMode.NORMAL);
          this.adsManager.setVolume(this.player.muted() ? 0 : this.player.volume());
          this.adsManager.start();
        } catch (adError) {
          onAdError_(adError);
        }
      }
    }.bind(this);

    /**
     * Listener for errors fired by the AdsLoader.
     * @param {google.ima.AdErrorEvent} event The error event thrown by the
     *     AdsLoader. See
     *     https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError.Type
     * @private
     */
    var onAdsLoaderError_ = function (event) {
      console.log('AdsLoader error: ' + event.getError());
      this.showAdContainer(false);
      if (this.adsManager) {
        this.adsManager.destroy();
      }
      this.player.trigger({
        type: 'adserror',
        data: {
          AdError: event.getError(),
          AdErrorEvent: event
        }
      });
    }.bind(this);

    /**
     * Listener for errors thrown by the AdsManager.
     * @param {google.ima.AdErrorEvent} adErrorEvent The error event thrown by
     *     the AdsManager.
     * @private
     */
    var onAdError_ = function (adErrorEvent) {
      var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
      console.log('Ad error: ' + errorMessage);
      this.adsActive = false;
      this.adPlaying = false;
      this.restoreLoop();
      this.vjsControls.show();
      this.adsManager.destroy();
      this.showAdContainer(false);
      this.updateVjsControls();
      this.player.trigger({
        type: 'adserror',
        data: {
          AdError: errorMessage,
          AdErrorEvent: adErrorEvent
        }
      });
    }.bind(this);

    /**
     * Listener for AD_BREAK_READY. Passes event on to publisher's listener.
     * @param {google.ima.AdEvent} adEvent AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdBreakReady_ = function (adEvent) {
      this.adBreakReadyListener(adEvent);
    }.bind(this);

    /**
     * Called by publishers in manual ad break playback mode to start an ad
     * break.
     */
    this.playAdBreak = function () {
      if (!this.autoPlayAdBreaks) {
        this.adsManager.start();
      }
    }.bind(this);
    this.resetLoop = function () {
      this.contentLoop = this.contentPlayer && this.contentPlayer.loop;
      if (this.contentLoop) {
        this.contentPlayer.loop = false;
      }
    }.bind(this);
    this.restoreLoop = function () {
      if (this.contentLoop) {
        this.contentPlayer.loop = true;
        this.contentLoop = false;
      }
    }.bind(this);

    /**
     * Pauses the content video and displays the ad container so ads can play.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onContentPauseRequested_ = function (adEvent) {
      this.contentSource = this.player.currentSrc();
      this.resetLoop();
      this.player.off('contentended', this.localContentEndedListener);
      this.player.ads.startLinearAdMode();
      this.showAdContainer(true);
      var contentType = adEvent.getAd().getContentType();
      if (!this.settings.vjsControls || !this.settings.showControlsForAds) {
        if (!this.settings.showControlsForAds || contentType === 'application/javascript' && !this.settings.showControlsForJSAds) {
          this.controlsDiv.style.display = 'none';
        } else {
          this.controlsDiv.style.display = 'block';
        }
        this.vjsControls.hide();
      }
      showPlayButton();
      this.player.pause();
      this.adsActive = true;
      this.adPlaying = true;
      this.updateVjsControls();
    }.bind(this);

    /**
     * Resumes content video and hides the ad container.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onContentResumeRequested_ = function (adEvent) {
      this.contentResumeTimer = clearTimeout(this.contentResumeTimer);
      this.restoreLoop();
      this.adsActive = false;
      this.adPlaying = false;
      this.player.on('contentended', this.localContentEndedListener);
      if (this.currentAd == null ||
      // hide for post-roll only playlist
      this.currentAd.isLinear()) {
        // don't hide for non-linear ads
        this.showAdContainer(false);
      }
      this.vjsControls.show();
      this.player.ads.endLinearAdMode();
      this.countdownDiv.innerHTML = '';
      this.updateVjsControls();
    }.bind(this);

    /**
     * Records that ads have completed and calls contentAndAdsEndedListeners
     * if content is also complete.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAllAdsCompleted_ = function (adEvent) {
      this.allAdsCompleted = true;
      this.showAdContainer(false);
      if (this.contentComplete == true) {
        if (this.contentPlayer.src && !/^blob:/.test(this.contentPlayer.src) && this.contentSource && this.contentPlayer.src != this.contentSource) {
          this.player.src(this.contentSource);
        }
        this.player.trigger('');
        for (var index in this.contentAndAdsEndedListeners) {
          this.contentAndAdsEndedListeners[index]();
        }
      }
    }.bind(this);

    /**
     * Starts the content video when a non-linear ad is loaded.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdLoaded_ = function (adEvent) {
      if (!adEvent.getAd().isLinear() && !this.player.ended()) {
        this.player.ads.endLinearAdMode();
        this.player.play();
      }
    }.bind(this);

    /**
     * Starts the interval timer to check the current ad time when an ad starts
     * playing.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdStarted_ = function (adEvent) {
      this.currentAd = adEvent.getAd();
      if (this.currentAd.isLinear()) {
        this.adTrackingTimer = setInterval(onAdPlayheadTrackerInterval_, 250);
        // Don't bump container when controls are shown
        removeClass_(this.adContainerDiv, 'bumpable-ima-ad-container');
      } else {
        // Bump container when controls are shown
        addClass_(this.adContainerDiv, 'bumpable-ima-ad-container');
        this.player.addClass('vjs-ima-non-linear');
        this.showAdContainer(true);
      }
    }.bind(this);

    /**
     * Clears the interval timer for current ad time when an ad completes.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onAdComplete_ = function (adEvent) {
      if (this.currentAd.isLinear()) {
        clearInterval(this.adTrackingTimer);
        var pod = this.currentAd.getAdPodInfo();
        if (pod && pod.getAdPosition() < pod.getTotalAds()) {
          this.player.trigger('ads-pod-ended');
          return;
        }

        // this is the final ad so we excpect ima sdk to trigger
        // CONTENT_RESUME_REQUESTED, but for some reason it isn't triggered
        // reliably on iOS, so we fake it

        this.contentResumeTimer = setTimeout(function () {
          this.onContentResumeRequested_(null);
        }.bind(this), 1000);
      } else {
        this.player.removeClass('vjs-ima-non-linear');
      }
    }.bind(this);
    this.onAdPaused_ = function (adEvent) {
      showPauseButton();
      this.adPlaying = false;
    }.bind(this);
    this.onAdResumed_ = function (adEvent) {
      showPlayButton();
      this.adPlaying = true;
    }.bind(this);
    var formatTime = function formatTime(time) {
      var m = Math.floor(time / 60);
      var s = Math.floor(time % 60);
      if (s.toString().length < 2) {
        s = '0' + s;
      }
      return m + ':' + s;
    };

    /**
     * Gets the current time and duration of the ad and calls the method to
     * update the ad UI.
     * @private
     */
    var onAdPlayheadTrackerInterval_ = function () {
      var remainingTime = this.adsManager.getRemainingTime();
      var duration = this.currentAd.getDuration();
      var currentTime = duration - remainingTime;
      currentTime = currentTime > 0 ? currentTime : 0;
      var isPod = false;
      var totalAds = 0;
      var adPosition;
      if (this.currentAd.getAdPodInfo()) {
        isPod = true;
        adPosition = this.currentAd.getAdPodInfo().getAdPosition();
        totalAds = this.currentAd.getAdPodInfo().getTotalAds();
      }

      // Update countdown timer data
      var podCount = ': ';
      if (isPod && totalAds > 1) {
        podCount = ' (' + adPosition + ' of ' + totalAds + '): ';
      }
      this.countdownDiv.innerHTML = this.settings.adLabel + podCount + formatTime(remainingTime);

      // Update UI
      var playProgressRatio = currentTime / duration;
      var playProgressPercent = playProgressRatio * 100;
      this.progressDiv.style.width = playProgressPercent + '%';
      this.updateVjsControls();
    }.bind(this);
    this.getPlayerWidth = function () {
      var retVal = parseInt(getComputedStyle(this.player.el()).width, 10) || this.player.width();
      return retVal;
    }.bind(this);
    this.getPlayerHeight = function () {
      var retVal = parseInt(getComputedStyle(this.player.el()).height, 10) || this.player.height();
      return retVal;
    }.bind(this);

    /**
     * Hides the ad controls on mouseout.
     * @private
     */
    var hideAdControls_ = function () {
      this.controlsDiv.style.height = '14px';
      this.playPauseDiv.style.display = 'none';
      this.muteDiv.style.display = 'none';
      this.sliderDiv.style.display = 'none';
      this.fullscreenDiv.style.display = 'none';
    }.bind(this);

    /**
     * Shows ad controls on mouseover.
     * @private
     */
    var showAdControls_ = function () {
      this.controlsDiv.style.height = '37px';
      this.playPauseDiv.style.display = 'block';
      this.muteDiv.style.display = 'block';
      this.sliderDiv.style.display = 'block';
      this.fullscreenDiv.style.display = 'block';
    }.bind(this);

    /**
     * Show pause and hide play button
     */
    var showPauseButton = function () {
      addClass_(this.playPauseDiv, 'ima-paused');
      removeClass_(this.playPauseDiv, 'ima-playing');
    }.bind(this);

    /**
     * Show play and hide pause button
     */
    var showPlayButton = function () {
      addClass_(this.playPauseDiv, 'ima-playing');
      removeClass_(this.playPauseDiv, 'ima-paused');
    }.bind(this);

    /**
     * Listener for clicks on the play/pause button during ad playback.
     * @private
     */
    var onAdPlayPauseClick_ = function () {
      if (this.adPlaying) {
        showPauseButton();
        this.adsManager.pause();
        this.adPlaying = false;
      } else {
        showPlayButton();
        this.adsManager.resume();
        this.adPlaying = true;
      }
    }.bind(this);

    /**
     * Listener for clicks on the mute button during ad playback.
     * @private
     */
    var onAdMuteClick_ = function () {
      setAdMuted(!this.adMuted);
    }.bind(this);

    /* Listener for mouse down events during ad playback. Used for volume.
     * @private
     */
    var onAdVolumeSliderMouseDown_ = function onAdVolumeSliderMouseDown_() {
      document.addEventListener(eventTypes.mouseup, onMouseUp_, false);
      document.addEventListener(eventTypes.mousemove, onMouseMove_, false);
    };

    /* Mouse movement listener used for volume slider.
     * @private
     */
    var onMouseMove_ = function onMouseMove_(event) {
      setVolumeSlider_(event);
    };

    /* Mouse release listener used for volume slider.
     * @private
     */
    var onMouseUp_ = function onMouseUp_(event) {
      setVolumeSlider_(event);
      document.removeEventListener(eventTypes.mousemove, onMouseMove_);
      document.removeEventListener(eventTypes.mouseup, onMouseUp_);
    };

    /* Utility function to set volume and associated UI
     * @private
     */
    var setVolumeSlider_ = function (event) {
      var clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
      var percent = (clientX - this.sliderDiv.getBoundingClientRect().left) / this.sliderDiv.offsetWidth;
      percent *= 100;
      //Bounds value 0-100 if mouse is outside slider region.
      percent = Math.min(Math.max(percent, 0), 100);
      this.sliderLevelDiv.style.width = percent + "%";
      this.player.volume(percent / 100); //0-1
      this.adsManager.setVolume(percent / 100);
      if (this.player.volume() == 0) {
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.player.muted(true);
        this.adMuted = true;
      } else {
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.player.muted(false);
        this.adMuted = false;
      }
    }.bind(this);

    /**
     * Listener for clicks on the fullscreen button during ad playback.
     * @private
     */
    var onAdFullscreenClick_ = function () {
      if (this.player.isFullscreen()) {
        this.player.exitFullscreen();
      } else {
        this.player.requestFullscreen();
      }
    }.bind(this);

    /**
     * Listens for the video.js player to change its fullscreen status. This
     * keeps the fullscreen-ness of the AdContainer in sync with the player.
     * @private
     */
    var onFullscreenChange_ = function () {
      if (this.player.isFullscreen()) {
        addClass_(this.fullscreenDiv, 'ima-fullscreen');
        removeClass_(this.fullscreenDiv, 'ima-non-fullscreen');
        if (this.adsManager) {
          this.adsManager.resize(window.screen.width, window.screen.height, google.ima.ViewMode.FULLSCREEN);
        }
      } else {
        addClass_(this.fullscreenDiv, 'ima-non-fullscreen');
        removeClass_(this.fullscreenDiv, 'ima-fullscreen');
        if (this.adsManager) {
          this.adsManager.resize(this.getPlayerWidth(), this.getPlayerHeight(), google.ima.ViewMode.NORMAL);
        }
      }
    }.bind(this);

    /**
     * Listens for the video.js player to change its volume. This keeps the ad
     * volume in sync with the content volume if the volume of the player is
     * changed while content is playing
     * @private
     */
    var onVolumeChange_ = function () {
      var newVolume = this.player.muted() ? 0 : this.player.volume();
      if (this.adsManager) {
        this.adsManager.setVolume(newVolume);
      }
      // Update UI
      if (newVolume == 0) {
        this.adMuted = true;
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.sliderLevelDiv.style.width = '0%';
      } else {
        this.adMuted = false;
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.sliderLevelDiv.style.width = newVolume * 100 + '%';
      }
    }.bind(this);

    /**
     * Seeks content to 00:00:00. This is used as an event handler for the
     * loadedmetadata event, since seeking is not possible until that event has
     * fired.
     * @private
     */
    var seekContentToZero_ = function () {
      this.player.off('loadedmetadata', seekContentToZero_);
      this.player.currentTime(0);
    }.bind(this);

    /**
     * Seeks content to 00:00:00 and starts playback. This is used as an event
     * handler for the loadedmetadata event, since seeking is not possible until
     * that event has fired.
     * @private
     */
    var playContentFromZero_ = function () {
      this.player.off('loadedmetadata', playContentFromZero_);
      this.player.currentTime(0);
      this.player.play();
    }.bind(this);

    /**
     * Destroys the AdsManager, sets it to null, and calls contentComplete to
     * reset correlators. Once this is done it requests ads again to keep the
     * inventory available.
     * @private
     */
    var resetIMA_ = function () {
      this.adsActive = false;
      this.adPlaying = false;
      this.restoreLoop();
      this.player.on('contentended', this.localContentEndedListener);
      if (this.currentAd && this.currentAd.isLinear()) {
        this.showAdContainer(false);
      }
      this.vjsControls.show();
      this.player.ads.endLinearAdMode();
      this.contentPlayheadTracker.currentTime = 0;
      this.countdownDiv.innerHTML = '';
      this.updateVjsControls();
      if (this.adTrackingTimer) {
        // If this is called while an ad is playing, stop trying to get that
        // ad's current time.
        clearInterval(this.adTrackingTimer);
      }
      if (this.adsManager) {
        this.adsManager.destroy();
        this.adsManager = null;
      }
      if (this.adsLoader && !this.contentComplete) {
        this.adsLoader.contentComplete();
      }
      this.contentComplete = false;
      this.allAdsCompleted = false;
    }.bind(this);

    /**
     * Ads an EventListener to the AdsManager. For a list of available events,
     * see
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
     * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to listen.
     * @param {function} callback The method to call when the event is fired.
     */
    this.addEventListener = function (event, callback) {
      if (this.adsManager) {
        this.adsManager.addEventListener(event, callback);
      }
    }.bind(this);

    /**
     * Returns the instance of the AdsManager.
     * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
     */
    this.getAdsManager = function () {
      return this.adsManager;
    }.bind(this);

    /**
     * DEPRECATED: Use setContentWithAdTag.
     * Sets the content of the video player. You should use this method instead
     * of setting the content src directly to ensure the proper ad tag is
     * requested when the video content is loaded.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?string} adTag The ad tag to be requested when the content loads.
     *     Leave blank to use the existing ad tag.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     */
    this.setContent = function (contentSrc, adTag, playOnLoad) {
      window.console.log('WARNING: player.ima.setContent is deprecated. Use ' + 'player.ima.setContentWithAdTag instead.');
      this.setContentWithAdTag(contentSrc, adTag, playOnLoad);
    }.bind(this);

    /**
     * Sets the content of the video player. You should use this method instead
     * of setting the content src directly to ensure the proper ad tag is
     * requested when the video content is loaded.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?string} adTag The ad tag to be requested when the content loads.
     *     Leave blank to use the existing ad tag.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     */
    this.setContentWithAdTag = function (contentSrc, adTag, playOnLoad) {
      resetIMA_();
      this.settings.adTagUrl = adTag ? adTag : this.settings.adTagUrl;
      changeSource_(contentSrc, playOnLoad);
    }.bind(this);

    /**
     * Sets the content of the video player. You should use this method instead
     * of setting the content src directly to ensure the proper ads response is
     * used when the video content is loaded.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?string} adsResponse The ads response to be requested when the
     *     content loads. Leave blank to use the existing ads response.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     */
    this.setContentWithAdsResponse = function (contentSrc, adsResponse, playOnLoad) {
      resetIMA_();
      this.settings.adsResponse = adsResponse ? adsResponse : this.settings.adsResponse;
      changeSource_(contentSrc, playOnLoad);
    }.bind(this);

    /**
     * Plays an ad immediately
     * @param {?string} adTag The ad tag to be requested.
     *     Leave blank to use the existing ad tag.
     */
    this.playAd = function (adTag) {
      resetIMA_();
      this.settings.adTagUrl = adTag ? adTag : this.settings.adTagUrl;
      // this.showAdContainer(true);
      // this.vjsControls.hide();
      this.requestAds();
    }.bind(this);

    /**
     * Changes the player source.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     * @private
     */
    var changeSource_ = function (contentSrc, playOnLoad) {
      // Only try to pause the player when initialised with a source already
      if (!!this.player.currentSrc()) {
        this.player.currentTime(0);
        this.player.pause();
      }
      if (contentSrc) {
        this.player.src(contentSrc);
      }
      if (playOnLoad) {
        this.player.on('loadedmetadata', playContentFromZero_);
      } else {
        this.player.on('loadedmetadata', seekContentToZero_);
      }
    }.bind(this);
    var setAdMuted = function (mute) {
      if (mute) {
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.adsManager.setVolume(0);
        // Bubble down to content player
        this.player.muted(true);
        this.adMuted = true;
        this.sliderLevelDiv.style.width = "0%";
      } else {
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.adsManager.setVolume(this.player.volume());
        // Bubble down to content player
        this.player.muted(false);
        this.adMuted = false;
        this.sliderLevelDiv.style.width = this.player.volume() * 100 + "%";
      }
    }.bind(this);
    /**
     * Adds a listener for the 'contentended' event of the video player. This should be
     * used instead of setting an 'contentended' listener directly to ensure that the
     * ima can do proper cleanup of the SDK before other event listeners
     * are called.
     * @param {function} listener The listener to be called when content completes.
     */
    this.addContentEndedListener = function (listener) {
      this.contentEndedListeners.push(listener);
    }.bind(this);

    /**
     * Adds a listener that will be called when content and all ads have
     * finished playing.
     * @param {function} listener The listener to be called when content and ads complete.
     */
    this.addContentAndAdsEndedListener = function (listener) {
      this.contentAndAdsEndedListeners.push(listener);
    }.bind(this);

    /**
     * Sets the listener to be called to trigger manual ad break playback.
     * @param {function} listener The listener to be called to trigger manual ad break playback.
     */
    this.setAdBreakReadyListener = function (listener) {
      this.adBreakReadyListener = listener;
    }.bind(this);

    /**
     * Pauses the ad.
     */
    this.pauseAd = function () {
      if (this.adsActive && this.adPlaying) {
        showPauseButton();
        this.adsManager.pause();
        this.adPlaying = false;
      }
    }.bind(this);

    /**
     * Resumes the ad.
     */
    this.resumeAd = function () {
      if (this.adsActive && !this.adPlaying) {
        showPlayButton();
        this.adsManager.resume();
        this.adPlaying = true;
      }
    }.bind(this);

    /**
     * Set up intervals to check for seeking and update current video time.
     * @private
     */
    var setUpPlayerIntervals_ = function () {
      this.updateTimeIntervalHandle = setInterval(updateCurrentTime_, this.seekCheckInterval);
      this.seekCheckIntervalHandle = setInterval(checkForSeeking_, this.seekCheckInterval);
      this.resizeCheckIntervalHandle = setInterval(checkForResize_, this.resizeCheckInterval);
    }.bind(this);

    /**
     * Updates the start time of the video
     * @private
     */
    var updateStartTime_ = function () {
      var cur = this.player.currentTime();
      if (!cur || this.player.ads.state != 'content-playback') return;
      // first time that isn't zero is our start time, but only if it's
      // more than the 1sec
      if (cur < 1) cur = 0;
      this.contentPlayheadTracker.startTime = cur;
      this.player.off('timeupdate', updateStartTime_);
    }.bind(this);

    /**
     * Updates the current time of the video
     * @private
     */
    var updateCurrentTime_ = function () {
      if (this.player.ads.state == 'content-playback' && !this.contentPlayheadTracker.seeking && this.contentPlayheadTracker.startTime >= 0) {
        this.contentPlayheadTracker.currentTime = this.player.currentTime() - this.contentPlayheadTracker.startTime;
      }
    }.bind(this);

    /**
     * Detects when the user is seeking through a video.
     * This is used to prevent mid-rolls from playing while a user is seeking.
     *
     * There *is* a seeking property of the HTML5 video element, but it's not
     * properly implemented on all platforms (e.g. mobile safari), so we have to
     * check ourselves to be sure.
     *
     * @private
     */
    var checkForSeeking_ = function () {
      if (this.player.ads.state != 'content-playback') return;
      var tempCurrentTime = this.player.currentTime();
      var diff = (tempCurrentTime - this.contentPlayheadTracker.previousTime) * 1000;
      if (Math.abs(diff) > this.seekCheckInterval + this.seekThreshold) {
        this.contentPlayheadTracker.seeking = true;
      } else {
        this.contentPlayheadTracker.seeking = false;
      }
      this.contentPlayheadTracker.previousTime = this.player.currentTime();
    }.bind(this);

    /**
     * Detects when the player is resized (for fluid support) and resizes the
     * ads manager to match.
     *
     * @private
     */
    var checkForResize_ = function () {
      var currentWidth = this.getPlayerWidth();
      var currentHeight = this.getPlayerHeight();
      if (this.adsManager && (currentWidth != this.adsManagerDimensions.width || currentHeight != this.adsManagerDimensions.height)) {
        this.adsManagerDimensions.width = currentWidth;
        this.adsManagerDimensions.height = currentHeight;
        this.adsManager.resize(currentWidth, currentHeight, google.ima.ViewMode.NORMAL);
      }
    }.bind(this);

    /**
     * Changes the flag to show or hide the ad countdown timer.
     *
     * @param {boolean} showCountdownIn Show or hide the countdown timer.
     */
    this.setShowCountdown = function (showCountdownIn) {
      this.showCountdown = showCountdownIn;
      this.countdownDiv.style.display = this.showCountdown ? '' : 'none';
    }.bind(this);

    /**
     * Current plugin version.
     */
    this.VERSION = '0.2.0';

    /**
     * Stores user-provided settings.
     */
    this.settings;

    /**
     * Used to prefix videojs ima
     */
    this.controlPrefix;

    /**
     * Video element playing content.
     */
    this.contentPlayer;

    /**
     * Boolean flag to show or hide the ad countdown timer.
     */
    this.showCountdown;

    /**
     * Boolena flag to enable manual ad break playback.
     */
    this.autoPlayAdBreaks;

    /**
     * Video.js control bar.
     */
    this.vjsControls;

    /**
     * Div used as an ad container.
     */
    this.adContainerDiv;

    /**
     * Div used to display ad controls.
     */
    this.controlsDiv;

    /**
     * Div used to display ad countdown timer.
     */
    this.countdownDiv;

    /**
     * Div used to display add seek bar.
     */
    this.seekBarDiv;

    /**
     * Div used to display ad progress (in seek bar).
     */
    this.progressDiv;

    /**
     * Div used to display ad play/pause button.
     */
    this.playPauseDiv;

    /**
     * Div used to display ad mute button.
     */
    this.muteDiv;

    /**
     * Div used by the volume slider.
     */
    this.sliderDiv;

    /**
     * Volume slider level visuals
     */
    this.sliderLevelDiv;

    /**
     * Div used to display ad fullscreen button.
     */
    this.fullscreenDiv;

    /**
     * IMA SDK AdDisplayContainer.
     */
    this.adDisplayContainer;

    /**
     * True if the AdDisplayContainer has been initialized. False otherwise.
     */
    this.adDisplayContainerInitialized = false;

    /**
     * IMA SDK AdsLoader
     */
    this.adsLoader;

    /**
     * IMA SDK AdsManager
     */
    this.adsManager;

    /**
     * IMA SDK AdsRenderingSettings.
     */
    this.adsRenderingSettings = null;

    /**
     * Ad tag URL. Should return VAST, VMAP, or ad rules.
     */
    this.adTagUrl;

    /**
     * VAST, VMAP, or ad rules response. Used in lieu of fetching a response
     * from an ad tag URL.
     */
    this.adsResponse;

    /**
     * Current IMA SDK Ad.
     */
    this.currentAd;

    /**
     * Timer used to track content progress.
     */
    this.contentTrackingTimer;

    /**
     * Timer used to track ad progress.
     */
    this.adTrackingTimer;

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
     * True if our content video has completed, false otherwise.
     */
    this.contentComplete = false;

    /**
     * True if ALL_ADS_COMPLETED has fired, false until then.
     */
    this.allAdsCompleted = false;

    /**
     * Handle to interval that repeatedly updates current time.
     */
    this.updateTimeIntervalHandle;

    /**
     * Handle to interval that repeatedly checks for seeking.
     */
    this.seekCheckIntervalHandle;

    /**
     * Interval (ms) on which to check if the user is seeking through the
     * content.
     */
    this.seekCheckInterval = 1000;

    /**
     * Handle to interval that repeatedly checks for player resize.
     */
    this.resizeCheckIntervalHandle;

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
     * Stores data for the content playhead tracker.
     */
    this.contentPlayheadTracker = {
      currentTime: 0,
      previousTime: 0,
      seeking: false,
      duration: 0,
      startTime: -1
    };

    /**
     * Stores data for the ad playhead tracker.
     */
    this.adPlayheadTracker = {
      currentTime: 0,
      duration: 0,
      isPod: false,
      adPosition: 0,
      totalAds: 0
    };

    /**
     * Stores the dimensions for the ads manager.
     */
    this.adsManagerDimensions = {
      width: 0,
      height: 0
    };

    /**
     * Content ended listeners passed by the publisher to the plugin. Publishers
     * should allow the plugin to handle content ended to ensure proper support
     * of custom ad playback.
     */
    this.contentEndedListeners = [];

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
     * Listener to be called to trigger manual ad break playback.
     */
    this.adBreakReadyListener = function () {
      console.log('Please set adBreakReadyListener');
    };

    /**
     * Stores the content source so we can re-populate it manually after a
     * post-roll on iOS.
     */
    this.contentSource = '';

    /**
     * Local content ended listener for contentComplete.
     */
    this.localContentEndedListener = function () {
      if (this.adsLoader && !this.contentComplete) {
        this.adsLoader.contentComplete();
        this.contentComplete = true;
      }
      for (var index in this.contentEndedListeners) {
        this.contentEndedListeners[index]();
      }
      if (this.allAdsCompleted) {
        for (var index in this.contentAndAdsEndedListeners) {
          this.contentAndAdsEndedListeners[index]();
        }
      }
      clearInterval(this.updateTimeIntervalHandle);
      clearInterval(this.seekCheckIntervalHandle);
      clearInterval(this.resizeCheckIntervalHandle);
      if (this.player.el()) {
        this.player.one('play', setUpPlayerIntervals_);
      }
    }.bind(this);
    this.playerDisposedListener = function () {
      this.contentEndedListeners, this.contentAndAdsEndedListeners = [], [];
      this.contentComplete = true;
      this.player.off('contentended', this.localContentEndedListener);
      this.player.off('timeupdate', updateStartTime_);

      // Bug fix: https://github.com/googleads/videojs-ima/issues/306
      if (this.player.ads.adTimeoutTimeout) {
        clearTimeout(this.player.ads.adTimeoutTimeout);
      }
      var intervalsToClear = [this.updateTimeIntervalHandle, this.seekCheckIntervalHandle, this.adTrackingTimer, this.resizeCheckIntervalHandle];
      for (var index in intervalsToClear) {
        var interval = intervalsToClear[index];
        if (interval) {
          clearInterval(interval);
        }
      }
      if (this.adsManager) {
        this.adsManager.destroy();
        this.adsManager = null;
      }
    }.bind(this);
    this.initVjsControls = function () {
      var _this = this;
      var override = function override(cls, obj, method, fn, always) {
        var orig = cls.prototype[method];
        return obj[method] = function () {
          return _this.adsActive || always ? fn && fn.apply(this, arguments) : orig && orig.apply(this, arguments);
        };
      };
      var overrideHandler = function overrideHandler(cls, obj, target, event, method, fn, always) {
        var orig = cls.prototype[method];
        var handler = override(cls, obj, method, fn);
        if (target) {
          obj.off(target, event, orig);
          obj.on(target, event, handler);
        } else {
          obj.off(event, orig);
          obj.on(event, handler);
        }
      };
      var PlayToggle = videojs.getComponent('PlayToggle');
      var playToggle = this.vjsControls.playToggle;
      overrideHandler(PlayToggle, playToggle, null, ['tap', 'click'], 'handleClick', function () {
        onAdPlayPauseClick_();
        if (_this.adPlaying) {
          this.handlePlay();
        } else {
          this.handlePause();
        }
      });
      override(PlayToggle, playToggle, 'update', function () {
        var paused = _this.adsActive ? !_this.adPlaying : player.paused();
        this.toggleClass('vjs-play-control-ad', _this.adsActive);
        this.toggleClass('vjs-paused', paused);
        this.toggleClass('vjs-playing', !paused);
        var text = paused ? 'Play' : 'Pause';
        if (text != this.controlText()) this.controlText(text);
      }, true);
      overrideHandler(PlayToggle, playToggle, player, 'play', 'handlePlay', function () {
        this.update();
      }, true);
      overrideHandler(PlayToggle, playToggle, player, 'pause', 'handlePause', function () {
        this.update();
      }, true);
      var SeekBar = videojs.getComponent('SeekBar');
      var DvrSeekBar = videojs.getComponent('DvrSeekBar');
      var seekBar = this.vjsControls.progressControl.seekBar;
      var getPercent = function getPercent() {
        var duration = _this.currentAd && _this.currentAd.getDuration();
        if (!duration || duration < 0) {
          return 0;
        }
        var remainingTime = _this.adsManager.getRemainingTime();
        var currentTime = Math.max(duration - remainingTime, 0);
        return currentTime / duration;
      };
      override(SeekBar, seekBar, 'getPercent', getPercent);
      if (DvrSeekBar) {
        override(DvrSeekBar, seekBar, 'getPercent', getPercent);
      }
      overrideHandler(SeekBar, seekBar, null, ['mousedown', 'touchstart'], 'handleMouseDown', null);
      overrideHandler(SeekBar, seekBar, null, 'focus', 'handleFocus', null);
      var DurationDisplay = videojs.getComponent('DurationDisplay');
      var durationDisplay = this.vjsControls.durationDisplay;
      overrideHandler(DurationDisplay, durationDisplay, player, ['timeupdate', 'loadedmetadata'], 'updateContent', function () {
        var duration = _this.currentAd && _this.currentAd.getDuration();
        if (duration && duration != this.duration_) {
          this.duration_ = duration;
          this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize('Duration Time') + '</span> ' + formatTime(duration);
        }
      });
      var CurrentTimeDisplay = videojs.getComponent('CurrentTimeDisplay');
      var currentTimeDisplay = this.vjsControls.currentTimeDisplay;
      overrideHandler(CurrentTimeDisplay, currentTimeDisplay, player, ['timeupdate', 'loadedmetadata'], 'updateContent', function () {
        var duration = _this.currentAd && _this.currentAd.getDuration();
        if (!duration) {
          return;
        }
        var time = duration - _this.adsManager.getRemainingTime();
        var formattedTime = formatTime(time);
        if (formattedTime !== this.formattedTime_) {
          this.formattedTime_ = formattedTime;
          this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize('Current Time') + '</span> ' + formattedTime;
        }
      });
    }.bind(this);
    this.updateVjsControls = function () {
      if (!this.settings.vjsControls) {
        return;
      }
      this.player.toggleClass('vjs-ad-paused', this.adsActive && !this.adPlaying);
      var controls = this.vjsControls;
      controls.playToggle.update();
      controls.progressControl.seekBar.update();
      controls.durationDisplay.updateContent();
      controls.currentTimeDisplay.updateContent();
      var duration = this.currentAd && this.currentAd.getDuration();
      var display = !this.adsActive || duration && duration >= 0 ? '' : 'none';
      controls.durationDisplay.el().style.display = display;
      controls.currentTimeDisplay.el().style.display = display;
      controls.timeDivider.el().style.display = display;
    }.bind(this);
    var getPosition = function getPosition(el) {
      var box = el.getBoundingClientRect();
      var docEl = document.documentElement;
      var body = document.body;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;
      var scrollLeft = window.pageXOffset || body.scrollLeft;
      var left = box.left + scrollLeft - clientLeft;
      var clientTop = docEl.clientTop || body.clientTop || 0;
      var scrollTop = window.pageYOffset || body.scrollTop;
      var top = box.top + scrollTop - clientTop;
      return {
        left: left,
        top: top,
        width: box.width,
        height: box.height
      };
    };

    // proxy click events to the video element when non-linear ad is active
    this.proxyClickEvents = function () {
      var events = videojs && videojs.browser && videojs.browser.IS_ANDROID || videojs.browser.IS_IOS ? ['touchstart', 'touchend'] : ['click', 'dblclick', 'mousedown', 'mouseup'];
      var player = this.player,
        el = player.el(),
        _this = this;
      events.forEach(function (eventName) {
        el.addEventListener(eventName, function (e) {
          var ad = _this.currentAd,
            t = e.target;
          if (!ad || ad.isLinear() || t.nodeName != 'IFRAME' || e.isTrusted) {
            return;
          }
          // ignore clicks on ad ui elements
          var adWidth = ad.getWidth() || ad.getVastMediaWidth();
          var adHeight = ad.getHeight() || ad.getVastMediaHeight();
          var pos = getPosition(t);
          var touch = e.touches && e.touches[0];
          var x = touch ? touch.pageX : e.clientX;
          var y = touch ? touch.pageY : e.clientY;
          var adRight = pos.left + pos.width - (pos.width - adWidth) / 2;
          var adTop = pos.top + pos.height - adHeight - 4;
          // click on close button
          if (x < adRight && x > adRight - 40 && y > adTop && y < adTop + 30) {
            return;
          }
          // click on recall button
          if (x > pos.left + pos.width / 2 - 15 && x < pos.left + pos.width / 2 + 15 && y > pos.top + pos.height - 15) {
            return;
          }
          var newEvent;
          var opt = {};
          for (var key in e) {
            opt[key] = e[key];
          }
          opt.bubbles = false;
          try {
            newEvent = new e.constructor(e.type, opt);
          } catch (err) {
            // special case for IE11
            newEvent = document.createEvent('MouseEvent');
            newEvent.initMouseEvent(e.type, opt.bubbles, opt.cancelable, opt.view, opt.detail, opt.screenX, opt.screenY, opt.clientX, opt.clientY, opt.ctrlKey, opt.altKey, opt.shiftKey, opt.metaKey, opt.button, null);
          }
          newEvent.stopPropagation();
          player.tech_.trigger(newEvent);
        });
      });
    }.bind(this);
    this.settings = extend({}, ima_defaults, options || {});
    this.settings.adLabel = this.player.localize(this.settings.adLabel);

    // Currently this isn't used but I can see it being needed in the future, so
    // to avoid implementation problems with later updates I'm requiring it.
    if (!this.settings['id']) {
      window.console.log('Error: must provide id of video.js div');
      return;
    }
    this.controlPrefix = this.settings.id + '_' || 0;
    this.contentPlayer = this.player.$('.vjs-tech');
    // Default showing countdown timer to true.
    this.showCountdown = true;
    if (this.settings['showCountdown'] === false) {
      this.showCountdown = false;
    }
    this.autoPlayAdBreaks = true;
    if (this.settings['autoPlayAdBreaks'] === false) {
      this.autoPlayAdBreaks = false;
    }
    var contrib_ads_defaults = {
      debug: this.settings.debug,
      timeout: this.settings.timeout,
      prerollTimeout: this.settings.prerollTimeout,
      postrollTimeout: this.settings.postrollTimeout
    };
    var ads_plugin_settings = extend({}, contrib_ads_defaults, options['contribAdsSettings'] || {});
    player.ads(ads_plugin_settings);
    player.one('play', setUpPlayerIntervals_);
    player.on('contentended', this.localContentEndedListener);
    player.on('dispose', this.playerDisposedListener);
    player.on('timeupdate', updateStartTime_);
    this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
    this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    if (this.settings['adsRenderingSettings']) {
      for (var setting in this.settings['adsRenderingSettings']) {
        this.adsRenderingSettings[setting] = this.settings['adsRenderingSettings'][setting];
      }
    }
    if (this.settings['locale']) {
      google.ima.settings.setLocale(this.settings['locale']);
    }
    createAdContainer_();
    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
    this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    if (this.settings.vpaidAllowed == false) {
      this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.DISABLED);
    }
    if (this.settings.vpaidMode) {
      this.adsLoader.getSettings().setVpaidMode(this.settings.vpaidMode);
    }
    if (this.settings.locale) {
      this.adsLoader.getSettings().setLocale(this.settings.locale);
    }
    if (this.settings.numRedirects) {
      this.adsLoader.getSettings().setNumRedirects(this.settings.numRedirects);
    }
    this.adsLoader.getSettings().setPlayerType('videojs-ima');
    this.adsLoader.getSettings().setPlayerVersion(this.VERSION);
    this.adsLoader.getSettings().setAutoPlayAdBreaks(this.autoPlayAdBreaks);
    this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded_, false);
    this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdsLoaderError_, false);
    if (!readyCallback) {
      readyCallback = this.startFromReadyCallback;
    }
    player.on('readyforpreroll', readyCallback);
    player.ready(function () {
      player.on('fullscreenchange', onFullscreenChange_);
      player.on('volumechange', onVolumeChange_);
    });
    this.proxyClickEvents();
  };
  videojs.registerPlugin('ima', init);
});

/***/ }),

/***/ "../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.min.js":
/*!***************************************************************************!*\
  !*** ../node_modules/videojs-contrib-ads/dist/videojs-contrib-ads.min.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*! @name videojs-contrib-ads @version 6.9.0 @license Apache-2.0 */
!function(e,t){ true?module.exports=t(__webpack_require__(/*! video.js */ "../node_modules/video.js/dist/video.es-exposed.js"),__webpack_require__(/*! global/window */ "../node_modules/global/window.js"),__webpack_require__(/*! global/document */ "../node_modules/global/document.js")):0}(this,function(e,t,n){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n;var a="6.9.0";var o=function(e,t){t.isImmediatePropagationStopped=function(){return!0},t.cancelBubble=!0,t.isPropagationStopped=function(){return!0}},r=function(e,t,n){o(0,n),e.trigger({type:t+n.type,originalEvent:n})},i=function(e,t){e.ads.isInAdMode()&&(e.ads.isContentResuming()?e.ads._contentEnding&&r(e,"content",t):r(e,"ad",t))},s=function(e,t){e.ads.isInAdMode()?e.ads.isContentResuming()?(o(0,t),e.trigger("resumeended")):r(e,"ad",t):e.ads._contentHasEnded||e.ads.stitchedAds()||(r(e,"content",t),e.trigger("readyforpostroll"))},d=function(e,t){if(!("loadstart"===t.type&&!e.ads._hasThereBeenALoadStartDuringPlayerLife||"loadeddata"===t.type&&!e.ads._hasThereBeenALoadedData||"loadedmetadata"===t.type&&!e.ads._hasThereBeenALoadedMetaData))if(e.ads.inAdBreak())r(e,"ad",t);else{if(e.currentSrc()!==e.ads.contentSrc)return;r(e,"content",t)}},l=function(e,t){e.ads.inAdBreak()?r(e,"ad",t):e.ads.isContentResuming()&&r(e,"content",t)};function u(e){"playing"===e.type?i(this,e):"ended"===e.type?s(this,e):"loadstart"===e.type||"loadeddata"===e.type||"loadedmetadata"===e.type?d(this,e):"play"===e.type?l(this,e):this.ads.isInAdMode()&&(this.ads.isContentResuming()?r(this,"content",e):r(this,"ad",e))}var c={},f=function(){!function(n){if(e.dom.isInFrame()&&"function"!=typeof t.__tcfapi){for(var a,o=t,r={};o;){try{if(o.frames.__tcfapiLocator){a=o;break}}catch(e){}if(o===t.top)break;o=o.parent}if(!a)return;t.__tcfapi=function(e,t,n,o){var i=Math.random()+"",s={__tcfapiCall:{command:e,parameter:o,version:t,callId:i}};r[i]=n,a.postMessage(s,"*")},t.addEventListener("message",function(e){var t={};try{t="string"==typeof e.data?JSON.parse(e.data):e.data}catch(e){}var n=t.__tcfapiReturn;n&&"function"==typeof r[n.callId]&&(r[n.callId](n.returnValue,n.success),r[n.callId]=null)},!1)}}(),"function"==typeof t.__tcfapi&&t.__tcfapi("addEventListener",2,function(e,t){t&&(c=e)})},h=function(e,t){return t?encodeURIComponent(e):e},p=function(e,t,n){if(e&&e[n])for(var a=e[n],o=Object.keys(a),r=0;r<o.length;r++){t["{mediainfo."+n+"."+o[r]+"}"]=a[o[r]]}};var g={processMetadataTracks:function(e,t){for(var n=e.textTracks(),a=function(n){"metadata"===n.kind&&(e.ads.cueTextTracks.setMetadataTrackMode(n),t(e,n))},o=0;o<n.length;o++)a(n[o]);n.addEventListener("addtrack",function(e){a(e.track)})},setMetadataTrackMode:function(e){},getSupportedAdCue:function(e,t){return t},isSupportedAdCue:function(e,t){return!0},getCueId:function(e,t){return t.id}},y=function(e,t){return void 0!==t&&e.ads.includedCues[t]},v=function(e,t){void 0!==t&&""!==t&&(e.ads.includedCues[t]=!0)};function m(){!1!==this.ads._shouldBlockPlay&&(this.paused()||(this.ads.debug("Playback was canceled by cancelContentPlay"),this.pause()),this.ads._cancelledPlay=!0)}g.processAdTrack=function(t,n,a,o){t.ads.includedCues={};for(var r=0;r<n.length;r++){var i=n[r],s=this.getSupportedAdCue(t,i);if(!this.isSupportedAdCue(t,i))return void e.log.warn("Skipping as this is not a supported ad cue.",i);var d=this.getCueId(t,i),l=i.startTime;if(y(t,d))return void e.log("Skipping ad already seen with ID "+d);o&&o(t,s,d,l),a(t,s,d,l),v(t,d)}};var A={},S=e;A.isMiddlewareMediatorSupported=function(){return!S.browser.IS_IOS&&!S.browser.IS_ANDROID&&!!(S.use&&S.middleware&&S.middleware.TERMINATOR)},A.playMiddleware=function(t){return{setSource:function(e,t){t(null,e)},callPlay:function(){if(t.ads&&!0===t.ads._shouldBlockPlay)return t.ads.debug("Using playMiddleware to block content playback"),t.ads._playBlocked=!0,S.middleware.TERMINATOR},play:function(n,a){t.ads&&t.ads._playBlocked&&n?(t.ads.debug("Play call to Tech was terminated."),t.trigger("play"),t.addClass("vjs-has-started"),t.ads._playBlocked=!1):a&&a.catch&&a.catch(function(n){"NotAllowedError"!==n.name||e.browser.IS_SAFARI||t.trigger("pause")})}}},A.testHook=function(e){S=e};var _=A.playMiddleware,P=A.isMiddlewareMediatorSupported,b=function(){if(e.getPlugin)return Boolean(e.getPlugin("ads"));var t=e.getComponent("Player");return Boolean(t&&t.prototype.ads)};var k=function(){function e(){}return e.getState=function(t){if(t)return e.states_&&e.states_[t]?e.states_[t]:void 0},e.registerState=function(t,n){if("string"!=typeof t||!t)throw new Error('Illegal state name, "'+t+'"; must be a non-empty string.');return e.states_||(e.states_={}),e.states_[t]=n,n},e}(),C=function(){function t(e){this.player=e}t._getName=function(){return"Anonymous State"};var n=t.prototype;return n.transitionTo=function(e){var t=this.player;this.cleanup(t);var n=new e(t);t.ads._state=n,t.ads.debug(this.constructor._getName()+" -> "+n.constructor._getName());for(var a=arguments.length,o=new Array(a>1?a-1:0),r=1;r<a;r++)o[r-1]=arguments[r];n.init.apply(n,[t].concat(o))},n.init=function(){},n.cleanup=function(){},n.onPlay=function(){},n.onPlaying=function(){},n.onEnded=function(){},n.onAdEnded=function(){},n.onAdsReady=function(){e.log.warn("Unexpected adsready event")},n.onAdsError=function(){},n.onAdsCanceled=function(){},n.onAdTimeout=function(){},n.onAdStarted=function(){},n.onContentChanged=function(){},n.onContentResumed=function(){},n.onReadyForPostroll=function(){e.log.warn("Unexpected readyforpostroll event")},n.onNoPreroll=function(){},n.onNoPostroll=function(){},n.startLinearAdMode=function(){e.log.warn("Unexpected startLinearAdMode invocation (State via "+this.constructor._getName()+")")},n.endLinearAdMode=function(){e.log.warn("Unexpected endLinearAdMode invocation (State via "+this.constructor._getName()+")")},n.skipLinearAdMode=function(){e.log.warn("Unexpected skipLinearAdMode invocation (State via "+this.constructor._getName()+")")},n.isAdState=function(){throw new Error("isAdState unimplemented for "+this.constructor._getName())},n.isWaitingForAdBreak=function(){return!1},n.isContentResuming=function(){return!1},n.inAdBreak=function(){return!1},n.handleEvent=function(e){var t=this.player;"play"===e?this.onPlay(t):"adsready"===e?this.onAdsReady(t):"adserror"===e?this.onAdsError(t):"adscanceled"===e?this.onAdsCanceled(t):"adtimeout"===e?this.onAdTimeout(t):"ads-ad-started"===e?this.onAdStarted(t):"contentchanged"===e?this.onContentChanged(t):"contentresumed"===e?this.onContentResumed(t):"readyforpostroll"===e?this.onReadyForPostroll(t):"playing"===e?this.onPlaying(t):"ended"===e?this.onEnded(t):"nopreroll"===e?this.onNoPreroll(t):"nopostroll"===e?this.onNoPostroll(t):"adended"===e&&this.onAdEnded(t)},t}();function T(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}k.registerState("State",C);var w=function(e){function t(t){var n;return(n=e.call(this,t)||this).contentResuming=!1,n.waitingForAdBreak=!1,n}T(t,e);var n=t.prototype;return n.isAdState=function(){return!0},n.onPlaying=function(){var e=k.getState("ContentPlayback");this.contentResuming&&this.transitionTo(e)},n.onContentResumed=function(){var e=k.getState("ContentPlayback");this.contentResuming&&this.transitionTo(e)},n.isWaitingForAdBreak=function(){return this.waitingForAdBreak},n.isContentResuming=function(){return this.contentResuming},n.inAdBreak=function(){return!0===this.player.ads._inLinearAdMode},t}(C);k.registerState("AdState",w);var R=function(e){function t(){return e.apply(this,arguments)||this}T(t,e);var n=t.prototype;return n.isAdState=function(){return!1},n.onContentChanged=function(e){var t=k.getState("BeforePreroll"),n=k.getState("Preroll");e.ads.debug("Received contentchanged event (ContentState)"),e.paused()?this.transitionTo(t):(this.transitionTo(n,!1),e.pause(),e.ads._pausedOnContentupdate=!0)},t}(C);k.registerState("ContentState",R);var L,B=function(t){function n(){return t.apply(this,arguments)||this}T(n,t),n._getName=function(){return"AdsDone"};var a=n.prototype;return a.init=function(e){e.ads._contentHasEnded=!0,e.trigger("ended")},a.startLinearAdMode=function(){e.log.warn("Unexpected startLinearAdMode invocation (AdsDone)")},n}(k.getState("ContentState"));k.registerState("AdsDone",B);var M={start:function(t){t.ads.debug("Starting ad break"),t.ads._inLinearAdMode=!0,t.trigger("adstart"),t.ads.shouldTakeSnapshots()&&(t.ads.snapshot=function(t){var n;n=e.browser.IS_IOS&&t.ads.isLive(t)&&t.seekable().length>0?t.currentTime()-t.seekable().end(0):t.currentTime();var a=t.$(".vjs-tech"),o=t.textTracks?t.textTracks():[],r=[],i={ended:t.ended(),currentSrc:t.currentSrc(),sources:t.currentSources(),src:t.tech_.src(),currentTime:n,type:t.currentType()};a&&(i.style=a.getAttribute("style"));for(var s=0;s<o.length;s++){var d=o[s];r.push({track:d,mode:d.mode}),d.mode="disabled"}return i.suppressedTracks=r,i}(t)),t.ads.shouldPlayContentBehindAd(t)&&(t.ads.preAdVolume_=t.volume(),t.volume(0)),t.addClass("vjs-ad-playing"),t.hasClass("vjs-live")&&t.removeClass("vjs-live"),t.ads.removeNativePoster()},end:function(t,n){t.ads.debug("Ending ad break"),void 0===n&&(n=function(){}),t.ads.adType=null,t.ads._inLinearAdMode=!1,t.trigger("adend"),t.removeClass("vjs-ad-playing"),t.ads.isLive(t)&&t.addClass("vjs-live"),t.ads.shouldTakeSnapshots()?function(t,n){var a=t.ads.snapshot;if(void 0===n&&(n=function(){}),!0===t.ads.disableNextSnapshotRestore)return t.ads.disableNextSnapshotRestore=!1,delete t.ads.snapshot,void n();var o,r=t.$(".vjs-tech"),i=20,s=a.suppressedTracks,d=function(){for(var e=0;e<s.length;e++)(o=s[e]).track.mode=o.mode},l=function(){var n;if(e.browser.IS_IOS&&t.ads.isLive(t)){if(a.currentTime<0&&(n=t.seekable().length>0?t.seekable().end(0)+a.currentTime:t.currentTime(),t.currentTime(n)),t.paused()){var o=t.play();o&&o.catch&&o.catch(function(t){e.log.warn("Play promise rejected in IOS snapshot resume",t)})}}else if(a.ended)t.currentTime(t.duration());else{t.currentTime(a.currentTime);var r=t.play();r&&r.catch&&r.catch(function(t){e.log.warn("Play promise rejected in snapshot resume",t)})}t.ads.shouldRemoveAutoplay_&&(t.autoplay(!1),t.ads.shouldRemoveAutoplay_=!1)},u=function n(){if(t.off("contentcanplay",n),L&&t.clearTimeout(L),(r=t.el().querySelector(".vjs-tech")).readyState>1)return l();if(void 0===r.seekable)return l();if(r.seekable.length>0)return l();if(i--)t.setTimeout(n,50);else try{l()}catch(t){e.log.warn("Failed to resume the content after an advertisement",t)}};if("style"in a&&r.setAttribute("style",a.style||""),t.ads.videoElementRecycled())t.one("resumeended",function(){delete t.ads.snapshot,n()}),t.one("contentloadedmetadata",d),e.browser.IS_IOS&&!t.autoplay()&&(t.autoplay(!0),t.ads.shouldRemoveAutoplay_=!0),t.src(a.sources),t.one("contentcanplay",u),L=t.setTimeout(u,2e3);else{if(d(),!t.ended()){var c=t.play();c&&c.catch&&c.catch(function(t){e.log.warn("Play promise rejected in snapshot restore",t)})}delete t.ads.snapshot,n()}}(t,n):(t.volume(t.ads.preAdVolume_),n())}},j=function(t){function n(){return t.apply(this,arguments)||this}T(n,t),n._getName=function(){return"Preroll"};var a=n.prototype;return a.init=function(e,t,n){if(this.waitingForAdBreak=!0,e.addClass("vjs-ad-loading"),n||e.ads.nopreroll_)return this.resumeAfterNoPreroll(e);var a=e.ads.settings.timeout;"number"==typeof e.ads.settings.prerollTimeout&&(a=e.ads.settings.prerollTimeout),this._timeout=e.setTimeout(function(){e.trigger("adtimeout")},a),t?this.handleAdsReady():this.adsReady=!1},a.onAdsReady=function(t){t.ads.inAdBreak()?e.log.warn("Unexpected adsready event (Preroll)"):(t.ads.debug("Received adsready event (Preroll)"),this.handleAdsReady())},a.handleAdsReady=function(){this.adsReady=!0,this.readyForPreroll()},a.afterLoadStart=function(e){var t=this.player;t.ads._hasThereBeenALoadStartDuringPlayerLife?e():(t.ads.debug("Waiting for loadstart..."),t.one("loadstart",function(){t.ads.debug("Received loadstart event"),e()}))},a.noPreroll=function(){var e=this;this.afterLoadStart(function(){e.player.ads.debug("Skipping prerolls due to nopreroll event (Preroll)"),e.resumeAfterNoPreroll(e.player)})},a.readyForPreroll=function(){var e=this.player;this.afterLoadStart(function(){e.ads.debug("Triggered readyforpreroll event (Preroll)"),e.trigger("readyforpreroll")})},a.onAdsCanceled=function(e){var t=this;e.ads.debug("adscanceled (Preroll)"),this.afterLoadStart(function(){t.resumeAfterNoPreroll(e)})},a.onAdsError=function(t){var n=this;e.log("adserror (Preroll)"),this.inAdBreak()?t.ads.endLinearAdMode():this.afterLoadStart(function(){n.resumeAfterNoPreroll(t)})},a.startLinearAdMode=function(){var t=this.player;!this.adsReady||t.ads.inAdBreak()||this.isContentResuming()?e.log.warn("Unexpected startLinearAdMode invocation (Preroll)"):(this.clearTimeout(t),t.ads.adType="preroll",this.waitingForAdBreak=!1,M.start(t),t.ads._shouldBlockPlay=!1)},a.onAdStarted=function(e){e.removeClass("vjs-ad-loading")},a.endLinearAdMode=function(){var e=this.player;this.inAdBreak()&&(e.removeClass("vjs-ad-loading"),e.addClass("vjs-ad-content-resuming"),this.contentResuming=!0,M.end(e))},a.skipLinearAdMode=function(){var t=this,n=this.player;n.ads.inAdBreak()||this.isContentResuming()?e.log.warn("Unexpected skipLinearAdMode invocation"):this.afterLoadStart(function(){n.trigger("adskip"),n.ads.debug("skipLinearAdMode (Preroll)"),t.resumeAfterNoPreroll(n)})},a.onAdTimeout=function(e){var t=this;this.afterLoadStart(function(){e.ads.debug("adtimeout (Preroll)"),t.resumeAfterNoPreroll(e)})},a.onNoPreroll=function(t){t.ads.inAdBreak()||this.isContentResuming()?e.log.warn("Unexpected nopreroll event (Preroll)"):this.noPreroll()},a.resumeAfterNoPreroll=function(e){if(this.contentResuming=!0,e.ads._shouldBlockPlay=!1,this.cleanupPartial(e),e.ads._playRequested||e.ads._pausedOnContentupdate)if(e.paused()){e.ads.debug("resumeAfterNoPreroll: attempting to resume playback (Preroll)");var t=e.play();t&&t.then&&t.then(null,function(e){})}else e.ads.debug("resumeAfterNoPreroll: already playing (Preroll)"),e.trigger("play"),e.trigger("playing")},a.cleanup=function(t){t.ads._hasThereBeenALoadStartDuringPlayerLife||e.log.warn("Leaving Preroll state before loadstart event can cause issues."),this.cleanupPartial(t)},a.cleanupPartial=function(e){e.removeClass("vjs-ad-loading"),e.removeClass("vjs-ad-content-resuming"),this.clearTimeout(e)},a.clearTimeout=function(e){e.clearTimeout(this._timeout),this._timeout=null},n}(k.getState("AdState"));k.registerState("Preroll",j);var I=function(e){function t(){return e.apply(this,arguments)||this}T(t,e),t._getName=function(){return"BeforePreroll"};var n=t.prototype;return n.init=function(e){this.adsReady=!1,this.shouldResumeToContent=!1,e.ads._shouldBlockPlay=!e.ads.settings.allowVjsAutoplay||!e.autoplay()},n.onAdsReady=function(e){e.ads.debug("Received adsready event (BeforePreroll)"),this.adsReady=!0},n.onPlay=function(e){var t=k.getState("Preroll");e.ads.debug("Received play event (BeforePreroll)"),this.transitionTo(t,this.adsReady,this.shouldResumeToContent)},n.onAdsCanceled=function(e){e.ads.debug("adscanceled (BeforePreroll)"),this.shouldResumeToContent=!0},n.onAdsError=function(){this.player.ads.debug("adserror (BeforePreroll)"),this.shouldResumeToContent=!0},n.onNoPreroll=function(){this.player.ads.debug("Skipping prerolls due to nopreroll event (BeforePreroll)"),this.shouldResumeToContent=!0},n.skipLinearAdMode=function(){var e=this.player;e.trigger("adskip"),e.ads.debug("skipLinearAdMode (BeforePreroll)"),this.shouldResumeToContent=!0},n.onContentChanged=function(){this.init(this.player)},t}(k.getState("ContentState"));k.registerState("BeforePreroll",I);var N=function(e){function t(){return e.apply(this,arguments)||this}T(t,e),t._getName=function(){return"Midroll"};var n=t.prototype;return n.init=function(e){e.ads.adType="midroll",M.start(e),e.addClass("vjs-ad-loading")},n.onAdStarted=function(e){e.removeClass("vjs-ad-loading")},n.endLinearAdMode=function(){var e=this.player;this.inAdBreak()&&(this.contentResuming=!0,e.addClass("vjs-ad-content-resuming"),e.removeClass("vjs-ad-loading"),M.end(e))},n.onAdsError=function(e){this.inAdBreak()&&e.ads.endLinearAdMode()},n.cleanup=function(e){e.removeClass("vjs-ad-loading"),e.removeClass("vjs-ad-content-resuming")},t}(k.getState("AdState"));k.registerState("Midroll",N);var E=function(t){function n(){return t.apply(this,arguments)||this}T(n,t),n._getName=function(){return"Postroll"};var a=n.prototype;return a.init=function(e){if(this.waitingForAdBreak=!0,e.ads._contentEnding=!0,e.ads.nopostroll_){this.resumeContent(e);var t=k.getState("AdsDone");this.transitionTo(t)}else{e.addClass("vjs-ad-loading");var n=e.ads.settings.timeout;"number"==typeof e.ads.settings.postrollTimeout&&(n=e.ads.settings.postrollTimeout),this._postrollTimeout=e.setTimeout(function(){e.trigger("adtimeout")},n)}},a.startLinearAdMode=function(){var t=this.player;t.ads.inAdBreak()||this.isContentResuming()?e.log.warn("Unexpected startLinearAdMode invocation (Postroll)"):(t.ads.adType="postroll",t.clearTimeout(this._postrollTimeout),this.waitingForAdBreak=!1,M.start(t))},a.onAdStarted=function(e){e.removeClass("vjs-ad-loading")},a.endLinearAdMode=function(){var e=this,t=this.player,n=k.getState("AdsDone");this.inAdBreak()&&(t.removeClass("vjs-ad-loading"),this.resumeContent(t),M.end(t,function(){e.transitionTo(n)}))},a.skipLinearAdMode=function(){var t=this.player;t.ads.inAdBreak()||this.isContentResuming()?e.log.warn("Unexpected skipLinearAdMode invocation"):(t.ads.debug("Postroll abort (skipLinearAdMode)"),t.trigger("adskip"),this.abort(t))},a.onAdTimeout=function(e){e.ads.debug("Postroll abort (adtimeout)"),this.abort(e)},a.onAdsError=function(e){e.ads.debug("Postroll abort (adserror)"),e.ads.inAdBreak()?e.ads.endLinearAdMode():this.abort(e)},a.onContentChanged=function(e){if(this.isContentResuming()){var t=k.getState("BeforePreroll");this.transitionTo(t)}else if(!this.inAdBreak()){var n=k.getState("Preroll");this.transitionTo(n)}},a.onNoPostroll=function(t){this.isContentResuming()||this.inAdBreak()?e.log.warn("Unexpected nopostroll event (Postroll)"):this.abort(t)},a.resumeContent=function(e){this.contentResuming=!0,e.addClass("vjs-ad-content-resuming")},a.abort=function(e){var t=k.getState("AdsDone");this.resumeContent(e),e.removeClass("vjs-ad-loading"),this.transitionTo(t)},a.cleanup=function(e){e.removeClass("vjs-ad-content-resuming"),e.clearTimeout(this._postrollTimeout),e.ads._contentEnding=!1},n}(k.getState("AdState"));k.registerState("Postroll",E);var x=function(e){function t(){return e.apply(this,arguments)||this}T(t,e),t._getName=function(){return"ContentPlayback"};var n=t.prototype;return n.init=function(e){e.ads._shouldBlockPlay=!1},n.onAdsReady=function(e){e.ads.debug("Received adsready event (ContentPlayback)"),e.ads.nopreroll_||(e.ads.debug("Triggered readyforpreroll event (ContentPlayback)"),e.trigger("readyforpreroll"))},n.onReadyForPostroll=function(e){var t=k.getState("Postroll");e.ads.debug("Received readyforpostroll event"),this.transitionTo(t)},n.startLinearAdMode=function(){var e=k.getState("Midroll");this.transitionTo(e)},t}(k.getState("ContentState"));k.registerState("ContentPlayback",x);var D=function(e){function t(){return e.apply(this,arguments)||this}T(t,e),t._getName=function(){return"StitchedContentPlayback"};var n=t.prototype;return n.init=function(){this.player.ads._shouldBlockPlay=!1},n.onContentChanged=function(){this.player.ads.debug("Received contentchanged event ("+this.constructor._getName()+")")},n.startLinearAdMode=function(){var e=k.getState("StitchedAdRoll");this.transitionTo(e)},t}(k.getState("ContentState"));k.registerState("StitchedContentPlayback",D);var O=function(e){function t(){return e.apply(this,arguments)||this}T(t,e),t._getName=function(){return"StitchedAdRoll"};var n=t.prototype;return n.init=function(){this.waitingForAdBreak=!1,this.contentResuming=!1,this.player.ads.adType="stitched",M.start(this.player)},n.onPlaying=function(){},n.onContentResumed=function(){},n.onAdEnded=function(){this.endLinearAdMode(),this.player.trigger("ended")},n.endLinearAdMode=function(){var e=k.getState("StitchedContentPlayback");M.end(this.player),this.transitionTo(e)},t}(k.getState("AdState"));k.registerState("StitchedAdRoll",O);var F=A.isMiddlewareMediatorSupported,U=e.getTech("Html5").Events,V={timeout:5e3,prerollTimeout:void 0,postrollTimeout:void 0,debug:!1,stitchedAds:!1,contentIsLive:void 0,liveCuePoints:!0,allowVjsAutoplay:e.options.normalizeAutoplay||!1},q=function(o){var r=this,i=e.mergeOptions(V,o),s=[];U.concat(["firstplay","loadedalldata"]).forEach(function(e){-1===s.indexOf(e)&&s.push(e)}),r.on(s,u),F()||function(t,n){n&&e.log("Using cancelContentPlay to block content playback"),t.on("play",m)}(r,i.debug),r.setTimeout(function(){r.ads._hasThereBeenALoadStartDuringPlayerLife||""===r.src()||e.log.error("videojs-contrib-ads has not seen a loadstart event 5 seconds after being initialized, but a source is present. This indicates that videojs-contrib-ads was initialized too late. It must be initialized immediately after video.js in the same tick. As a result, some ads will not play and some media events will be incorrect. For more information, see http://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html")},5e3),r.on("ended",function(){r.hasClass("vjs-has-started")||r.addClass("vjs-has-started")}),r.on("contenttimeupdate",function(){r.removeClass("vjs-waiting")}),r.on(["addurationchange","adcanplay"],function(){if(!r.ads.settings.stitchedAds&&!r.hasStarted()&&(!r.ads.snapshot||r.currentSrc()!==r.ads.snapshot.currentSrc)&&r.ads.inAdBreak()){var t=r.play();t&&t.catch&&t.catch(function(t){e.log.warn("Play promise rejected when playing ad",t)})}}),r.on("nopreroll",function(){r.ads.debug("Received nopreroll event"),r.ads.nopreroll_=!0}),r.on("nopostroll",function(){r.ads.debug("Received nopostroll event"),r.ads.nopostroll_=!0}),r.on("playing",function(){r.ads._cancelledPlay=!1,r.ads._pausedOnContentupdate=!1}),r.on("play",function(){r.ads._playRequested=!0}),r.one("loadstart",function(){r.ads._hasThereBeenALoadStartDuringPlayerLife=!0}),r.on("loadeddata",function(){r.ads._hasThereBeenALoadedData=!0}),r.on("loadedmetadata",function(){r.ads._hasThereBeenALoadedMetaData=!0}),r.ads=function(t){return{disableNextSnapshotRestore:!1,_contentEnding:!1,_contentHasEnded:!1,_hasThereBeenALoadStartDuringPlayerLife:!1,_hasThereBeenALoadedData:!1,_hasThereBeenALoadedMetaData:!1,_inLinearAdMode:!1,_shouldBlockPlay:!1,_playBlocked:!1,_playRequested:!1,adType:null,VERSION:a,reset:function(){t.ads.disableNextSnapshotRestore=!1,t.ads._contentEnding=!1,t.ads._contentHasEnded=!1,t.ads.snapshot=null,t.ads.adType=null,t.ads._hasThereBeenALoadedData=!1,t.ads._hasThereBeenALoadedMetaData=!1,t.ads._cancelledPlay=!1,t.ads._shouldBlockPlay=!1,t.ads._playBlocked=!1,t.ads.nopreroll_=!1,t.ads.nopostroll_=!1,t.ads._playRequested=!1},startLinearAdMode:function(){t.ads._state.startLinearAdMode()},endLinearAdMode:function(){t.ads._state.endLinearAdMode()},skipLinearAdMode:function(){t.ads._state.skipLinearAdMode()},stitchedAds:function(t){return void 0!==t&&(e.log.warn("Using player.ads.stitchedAds() as a setter is deprecated, it should be set as an option upon initialization of contrib-ads."),this.settings.stitchedAds=!!t),this.settings.stitchedAds},videoElementRecycled:function(){if(t.ads.shouldPlayContentBehindAd(t))return!1;if(!this.snapshot)throw new Error("You cannot use videoElementRecycled while there is no snapshot.");var e=t.tech_.src()!==this.snapshot.src,n=t.currentSrc()!==this.snapshot.currentSrc;return e||n},isLive:function(n){return void 0===n&&(n=t),"boolean"==typeof n.ads.settings.contentIsLive?n.ads.settings.contentIsLive:n.duration()===1/0||"8"===e.browser.IOS_VERSION&&0===n.duration()},shouldPlayContentBehindAd:function(n){if(void 0===n&&(n=t),n)return!!n.ads.settings.liveCuePoints&&!e.browser.IS_IOS&&!e.browser.IS_ANDROID&&n.duration()===1/0;throw new Error("shouldPlayContentBehindAd requires a player as a param")},shouldTakeSnapshots:function(e){return void 0===e&&(e=t),!this.shouldPlayContentBehindAd(e)&&!this.stitchedAds()},isInAdMode:function(){return this._state.isAdState()},isWaitingForAdBreak:function(){return this._state.isWaitingForAdBreak()},isContentResuming:function(){return this._state.isContentResuming()},isAdPlaying:function(){return this._state.inAdBreak()},inAdBreak:function(){return this._state.inAdBreak()},removeNativePoster:function(){var e=t.$(".vjs-tech");e&&e.removeAttribute("poster")},debug:function(){if(this.settings.debug){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];1===n.length&&"string"==typeof n[0]?e.log("ADS: "+n[0]):e.log.apply(e,["ADS:"].concat(n))}}}}(r),r.ads.settings=i,i.stitchedAds=!!i.stitchedAds,i.stitchedAds?r.ads._state=new(k.getState("StitchedContentPlayback"))(r):r.ads._state=new(k.getState("BeforePreroll"))(r),r.ads._state.init(r),r.ads.cueTextTracks=g,r.ads.adMacroReplacement=function(a,o,r){var i=this,s={};a=a.replace(/{([^}=]+)=([^}]+)}/g,function(e,t,n){return s["{"+t+"}"]=n,"{"+t+"}"}),void 0===o&&(o=!1);var d={};for(var l in void 0!==r&&(d=r),d["{player.id}"]=this.options_["data-player"]||this.id_,d["{player.height}"]=this.currentHeight(),d["{player.width}"]=this.currentWidth(),d["{mediainfo.id}"]=this.mediainfo?this.mediainfo.id:"",d["{mediainfo.name}"]=this.mediainfo?this.mediainfo.name:"",d["{mediainfo.duration}"]=this.mediainfo?this.mediainfo.duration:"",d["{player.duration}"]=this.duration(),d["{player.pageUrl}"]=e.dom.isInFrame()?n.referrer:t.location.href,d["{playlistinfo.id}"]=this.playlistinfo?this.playlistinfo.id:"",d["{playlistinfo.name}"]=this.playlistinfo?this.playlistinfo.name:"",d["{timestamp}"]=(new Date).getTime(),d["{document.referrer}"]=n.referrer,d["{window.location.href}"]=t.location.href,d["{random}"]=Math.floor(1e12*Math.random()),["description","tags","reference_id","ad_keys"].forEach(function(e){i.mediainfo&&i.mediainfo[e]?d["{mediainfo."+e+"}"]=i.mediainfo[e]:s["{mediainfo."+e+"}"]?d["{mediainfo."+e+"}"]=s["{mediainfo."+e+"}"]:d["{mediainfo."+e+"}"]=""}),p(this.mediainfo,d,"custom_fields"),p(this.mediainfo,d,"customFields"),Object.keys(c).forEach(function(e){d["{tcf."+e+"}"]=c[e]}),d["{tcf.gdprAppliesInt}"]=c.gdprApplies?1:0,d)a=a.split(l).join(h(d[l],o));for(var u in a=a.replace(/{pageVariable\.([^}]+)}/g,function(n,a){for(var r,i=t,d=a.split("."),l=0;l<d.length;l++)l===d.length-1?r=i[d[l]]:i=i[d[l]];var u=typeof r;return null===r?"null":void 0===r?s["{pageVariable."+a+"}"]?s["{pageVariable."+a+"}"]:(e.log.warn('Page variable "'+a+'" not found'),""):"string"!==u&&"number"!==u&&"boolean"!==u?(e.log.warn('Page variable "'+a+'" is not a supported type'),""):h(String(r),o)}),s)a=a.replace(u,s[u]);return a}.bind(r),function(e){e.ads.contentSrc=e.currentSrc(),e.ads._seenInitialLoadstart=!1,e.on("loadstart",function(){if(!e.ads.inAdBreak()){var t=e.currentSrc();t!==e.ads.contentSrc&&(e.ads._seenInitialLoadstart&&e.trigger({type:"contentchanged"}),e.trigger({type:"contentupdate",oldValue:e.ads.contentSrc,newValue:t}),e.ads.contentSrc=t),e.ads._seenInitialLoadstart=!0}})}(r),r.on("contentchanged",r.ads.reset);var d=function(){var t=r.textTracks();if(!r.ads.shouldPlayContentBehindAd(r)&&r.ads.inAdBreak()&&r.tech_.featuresNativeTextTracks&&e.browser.IS_IOS&&!Array.isArray(r.textTracks()))for(var n=0;n<t.length;n++){var a=t[n];"showing"===a.mode&&(a.mode="disabled")}};r.ready(function(){r.textTracks().addEventListener("change",d)}),r.on(["play","playing","ended","adsready","adscanceled","adskip","adserror","adtimeout","adended","ads-ad-started","contentchanged","dispose","contentresumed","readyforpostroll","nopreroll","nopostroll"],function(e){r.ads._state.handleEvent(e.type)}),r.on("dispose",function(){r.ads.reset(),r.textTracks().removeEventListener("change",d)}),f(),r.ads.listenToTcf=f};return q.VERSION=a,function(t){!b(e)&&((e.registerPlugin||e.plugin)("ads",t),P()&&!e.usingContribAdsMiddleware_&&(e.use("*",_),e.usingContribAdsMiddleware_=!0,e.log.debug("Play middleware has been registered with videojs")))}(q),q});


/***/ })

}]);
//# sourceMappingURL=ima.js.map