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

(function(factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['video.js', 'videojs-contrib-ads'], function(videojs){ factory(window, document, videojs) });
  } else if (typeof exports === 'object' && typeof module === 'object') {
    var vjs = require('video.js');
    require('videojs-contrib-ads');
    factory(window, document, vjs);
  } else {
    factory(window, document, videojs);
  }
})(function(window, document, videojs) {
  "use strict";

  // support es6 style import
  videojs = videojs.default || videojs;

  var extend = function(obj) {
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
    showControlsForJSAds: true
  };

  var init = function(options, readyCallback) {
    this.ima = new ImaPlugin(this, options, readyCallback);
  };

  var ImaPlugin = function(player, options, readyCallback) {
    this.player = player;

    /**
     * Assigns the unique id and class names to the given element as well as the style class
     * @param element
     * @param controlName
     * @private
     */
    var assignControlAttributes_ = function(element, controlName) {
      element.id = this.controlPrefix + controlName;
      element.className = this.controlPrefix + controlName + ' ' + controlName;
    }.bind(this);

    /**
     * Returns a regular expression to test a string for the given className
     * @param className
     * @returns {RegExp}
     * @private
     */
    var getClassRegexp_ = function(className){
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
    var addClass_ = function(element, classToAdd){
      if(getClassRegexp_(classToAdd).test(element.className)){
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
    var removeClass_ = function(element, classToRemove){
      var classRegexp = getClassRegexp_(classToRemove);

      if(!classRegexp.test(element.className)){
        return element;
      }

      return element.className = element.className.trim().replace(classRegexp, '');
    };

    /**
     * Creates the ad container passed to the IMA SDK.
     * @private
     */
    var createAdContainer_ = function() {
      // The adContainerDiv is the DOM of the element that will house
      // the ads and ad controls.
      this.vjsControls = this.player.getChild('controlBar');
      this.adContainerDiv =
          this.vjsControls.el().parentNode.appendChild(
              document.createElement('div'));
      assignControlAttributes_(this.adContainerDiv, 'ima-ad-container');
      this.adContainerDiv.style.position = "absolute";
      this.adContainerDiv.style.zIndex = 1111;
      this.adContainerDiv.addEventListener(
          'mouseenter',
          showAdControls_,
          false);
      this.adContainerDiv.addEventListener(
          'mouseleave',
          hideAdControls_,
          false);
      createControls_();
      this.adDisplayContainer =
          new google.ima.AdDisplayContainer(this.adContainerDiv, this.contentPlayer);
    }.bind(this);

    /**
     * Creates the controls for the ad.
     * @private
     */
    var createControls_ = function() {
      this.controlsDiv = document.createElement('div');
      assignControlAttributes_(this.controlsDiv, 'ima-controls-div');
      this.controlsDiv.style.width = '100%';
      this.countdownDiv = document.createElement('div');
      assignControlAttributes_(this.countdownDiv, 'ima-countdown-div');
      this.countdownDiv.innerHTML = this.settings.adLabel;
      this.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
      this.seekBarDiv = document.createElement('div');
      assignControlAttributes_(this.seekBarDiv, 'ima-seek-bar-div');
      this.seekBarDiv.style.width = '100%';
      this.progressDiv = document.createElement('div');
      assignControlAttributes_(this.progressDiv, 'ima-progress-div');
      this.playPauseDiv = document.createElement('div');
      assignControlAttributes_(this.playPauseDiv, 'ima-play-pause-div');
      addClass_(this.playPauseDiv, 'ima-playing');
      this.playPauseDiv.addEventListener(
          'click',
          onAdPlayPauseClick_,
          false);
      this.muteDiv = document.createElement('div');
      assignControlAttributes_(this.muteDiv, 'ima-mute-div');
      addClass_(this.muteDiv, 'ima-non-muted');
      this.muteDiv.addEventListener(
          'click',
          onAdMuteClick_,
          false);
      this.sliderDiv = document.createElement('div');
      assignControlAttributes_(this.sliderDiv, 'ima-slider-div');
      this.sliderDiv.addEventListener(
          'mousedown',
          onAdVolumeSliderMouseDown_,
          false);
      this.sliderLevelDiv = document.createElement('div');
      assignControlAttributes_(this.sliderLevelDiv, 'ima-slider-level-div');
      this.fullscreenDiv = document.createElement('div');
      assignControlAttributes_(this.fullscreenDiv, 'ima-fullscreen-div');
      addClass_(this.fullscreenDiv, 'ima-non-fullscreen');
      this.fullscreenDiv.addEventListener(
          'click',
          onAdFullscreenClick_,
          false);
      this.adContainerDiv.appendChild(this.controlsDiv);
      this.controlsDiv.appendChild(this.countdownDiv);
      this.controlsDiv.appendChild(this.seekBarDiv);
      this.controlsDiv.appendChild(this.playPauseDiv);
      this.controlsDiv.appendChild(this.muteDiv);
      this.controlsDiv.appendChild(this.sliderDiv);
      this.controlsDiv.appendChild(this.fullscreenDiv);
      this.seekBarDiv.appendChild(this.progressDiv);
      this.sliderDiv.appendChild(this.sliderLevelDiv);
    }.bind(this);

    /**
     * Initializes the AdDisplayContainer. On mobile, this must be done as a
     * result of user action.
     */
    this.initializeAdDisplayContainer = function() {
      this.adDisplayContainerInitialized = true;
      this.adDisplayContainer.initialize();
    }.bind(this);

    /**
     * Creates the AdsRequest and request ads through the AdsLoader.
     */
    this.requestAds = function() {
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
      adsRequest.nonLinearAdSlotWidth =
          this.settings.nonLinearWidth || this.getPlayerWidth();
      adsRequest.nonLinearAdSlotHeight =
          this.settings.nonLinearHeight || (this.getPlayerHeight() / 3);

      adsRequest.setAdWillAutoPlay(this.settings.adWillAutoPlay);

      this.adsLoader.requestAds(adsRequest);
    }.bind(this);

    /**
     * Listener for the ADS_MANAGER_LOADED event. Creates the AdsManager,
     * sets up event listeners, and triggers the 'adsready' event for
     * videojs-ads-contrib.
     * @private
     */
    var onAdsManagerLoaded_ = function(adsManagerLoadedEvent) {
      this.adsManager = adsManagerLoadedEvent.getAdsManager(
          this.contentPlayheadTracker, this.adsRenderingSettings);

      this.adsManager.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          onAdError_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.AD_BREAK_READY,
          onAdBreakReady_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
          this.onContentPauseRequested_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
          this.onContentResumeRequested_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
          onAllAdsCompleted_);

      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.LOADED,
          onAdLoaded_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.STARTED,
          onAdStarted_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.CLICK,
          onAdPlayPauseClick_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.COMPLETE,
          this.onAdComplete_);
      this.adsManager.addEventListener(
          google.ima.AdEvent.Type.SKIPPED,
          this.onAdComplete_);

      if (this.isMobile) {
        // Show/hide controls on pause and resume (triggered by tap).
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.PAUSED,
            onAdPaused_);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.RESUMED,
            onAdResumed_);
      }

      if (!this.autoPlayAdBreaks) {
        try {
          var initWidth = this.getPlayerWidth();
          var initHeight = this.getPlayerHeight();
          this.adsManagerDimensions.width = initWidth;
          this.adsManagerDimensions.height = initHeight;
          this.adsManager.init(
              initWidth,
              initHeight,
              google.ima.ViewMode.NORMAL);
          this.adsManager.setVolume(this.player.muted() ? 0 : this.player.volume());
        } catch (adError) {
          onAdError_(adError);
        }
      }

      this.player.trigger('adsready');
    }.bind(this);

    /**
     * DEPRECATED: Use startFromReadyCallback
     * Start ad playback, or content video playback in the absence of a
     * pre-roll.
     */
    this.start = function() {
      window.console.log(
          'WARNING: player.ima.start is deprecated. Use ' +
              'player.ima.startFromReadyCallback instead.');
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
    this.startFromReadyCallback = function() {
      if (this.autoPlayAdBreaks) {
        try {
          this.adsManager.init(
              this.getPlayerWidth(),
              this.getPlayerHeight(),
              google.ima.ViewMode.NORMAL);
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
    var onAdsLoaderError_ = function(event) {
      window.console.log('AdsLoader error: ' + event.getError());
      this.adContainerDiv.style.display = 'none';
      if (this.adsManager) {
        this.adsManager.destroy();
      }
      this.player.trigger({type: 'adserror', data: { AdError: event.getError(), AdErrorEvent: event }});
    }.bind(this);

    /**
     * Listener for errors thrown by the AdsManager.
     * @param {google.ima.AdErrorEvent} adErrorEvent The error event thrown by
     *     the AdsManager.
     * @private
     */
    var onAdError_ = function(adErrorEvent) {
      var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
      window.console.log('Ad error: ' + errorMessage);
      this.vjsControls.show();
      this.adsManager.destroy();
      this.adContainerDiv.style.display = 'none';
      this.player.trigger({ type: 'adserror', data: { AdError: errorMessage, AdErrorEvent: adErrorEvent }});
    }.bind(this);

    /**
     * Listener for AD_BREAK_READY. Passes event on to publisher's listener.
     * @param {google.ima.AdEvent} adEvent AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdBreakReady_ = function(adEvent) {
      this.adBreakReadyListener(adEvent);
    }.bind(this);

    /**
     * Called by publishers in manual ad break playback mode to start an ad
     * break.
     */
    this.playAdBreak = function() {
      if (!this.autoPlayAdBreaks) {
        this.adsManager.start();
      }
    }.bind(this);

    /**
     * Pauses the content video and displays the ad container so ads can play.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onContentPauseRequested_ = function(adEvent) {
      this.adsActive = true;
      this.adPlaying = true;
      this.contentSource = this.player.currentSrc();
      this.contentSourceType = this.player.currentType();
      this.player.off('ended', this.localContentEndedListener);
      if (adEvent.getAd().getAdPodInfo().getPodIndex() != -1) {
        // Skip this call for post-roll ads
        this.player.ads.startLinearAdMode();
      }
      this.adContainerDiv.style.display = 'block';

      var contentType = adEvent.getAd().getContentType();
      if ((contentType === 'application/javascript') && !this.settings.showControlsForJSAds) {
        this.controlsDiv.style.display = 'none';
      } else {
        this.controlsDiv.style.display = 'block';
      }

      this.vjsControls.hide();
      showPlayButton();
      this.player.pause();
      hideAdControls_();
    }.bind(this);

    /**
     * Resumes content video and hides the ad container.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onContentResumeRequested_ = function(adEvent) {
      this.adsActive = false;
      this.adPlaying = false;
      this.player.on('ended', this.localContentEndedListener);
      if (this.currentAd == null || // hide for post-roll only playlist
          this.currentAd.isLinear()) { // don't hide for non-linear ads
        this.adContainerDiv.style.display = 'none';
      }
      this.vjsControls.show();
      if (!this.currentAd) {
        // Something went wrong playing the ad
        this.player.ads.endLinearAdMode();
      } else if (!this.contentComplete &&
          // Don't exit linear mode after post-roll or content will auto-replay
          this.currentAd.getAdPodInfo().getPodIndex() != -1 ) {
        this.player.ads.endLinearAdMode();
      }
      // Hide controls in case of future non-linear ads. They'll be unhidden in
      // content_pause_requested.
      this.controlsDiv.style.display = 'none';
      this.countdownDiv.innerHTML = '';
    }.bind(this);

    /**
     * Records that ads have completed and calls contentAndAdsEndedListeners
     * if content is also complete.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAllAdsCompleted_ = function(adEvent) {
      this.allAdsCompleted = true;
      this.adContainerDiv.style.display = 'none';
      if (this.contentComplete == true) {
        if (this.contentPlayer.src != this.contentSource) {
          // Avoid setted autoplay after the post-roll
          this.player.autoplay(false);
          this.player.src({
            src: this.contentSource,
            type: this.contentSourceType
          });
        }
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
   var onAdLoaded_ = function(adEvent) {
      if (!adEvent.getAd().isLinear()) {
        this.player.play();
      }
    }.bind(this);

    /**
     * Starts the interval timer to check the current ad time when an ad starts
     * playing.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdStarted_ = function(adEvent) {
      this.currentAd = adEvent.getAd();
      if (this.currentAd.isLinear()) {
        this.adTrackingTimer = setInterval(
            onAdPlayheadTrackerInterval_, 250);
        // Don't bump container when controls are shown
        removeClass_(this.adContainerDiv, 'bumpable-ima-ad-container');
      } else {
        // Bump container when controls are shown
       addClass_(this.adContainerDiv, 'bumpable-ima-ad-container');
      }
      // For non-linear ads that show after a linear ad.
      this.adContainerDiv.style.display = 'block';
      this.player.trigger('ads-ad-started');
    }.bind(this);

    /**
     * Syncs controls when an ad pauses.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdPaused_ = function(adEvent) {
      showPauseButton();
      showAdControls_();
      this.adPlaying = false;
    }.bind(this);

    /**
     * Syncs controls when an ad resumes.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    var onAdResumed_ = function(adEvent) {
      showPlayButton();
      hideAdControls_();
      this.adPlaying = true;
    }.bind(this);

    /**
     * Clears the interval timer for current ad time when an ad completes.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    this.onAdComplete_ = function(adEvent) {
      if (this.currentAd.isLinear()) {
        clearInterval(this.adTrackingTimer);
      }
    }.bind(this);

    /**
     * Gets the current time and duration of the ad and calls the method to
     * update the ad UI.
     * @private
     */
    var onAdPlayheadTrackerInterval_ = function() {
      var remainingTime = this.adsManager.getRemainingTime();
      var duration =  this.currentAd.getDuration();
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
      var remainingMinutes = Math.floor(remainingTime / 60);
      var remainingSeconds = Math.floor(remainingTime % 60);
      if (remainingSeconds.toString().length < 2) {
        remainingSeconds = '0' + remainingSeconds;
      }
      var podCount = ': ';
      if (isPod && (totalAds > 1)) {
        podCount = ' (' + adPosition + ' of ' + totalAds + '): ';
      }
      this.countdownDiv.innerHTML =
          this.settings.adLabel + podCount +
          remainingMinutes + ':' + remainingSeconds;

      // Update UI
      var playProgressRatio = currentTime / duration;
      var playProgressPercent = playProgressRatio * 100;
      this.progressDiv.style.width = playProgressPercent + '%';
    }.bind(this);

    this.getPlayerWidth = function() {
      var boundingRect = this.player.el().getBoundingClientRect() || {};

      return parseInt(boundingRect.width, 10) || this.player.width();
    }.bind(this);

    this.getPlayerHeight = function() {
      var boundingRect = this.player.el().getBoundingClientRect() || {};

      return parseInt(boundingRect.height, 10) || this.player.height();
    }.bind(this);

    /**
     * Hide the ad controls.
     * @private
     */
    var hideAdControls_ = function() {
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
    var showAdControls_ = function() {
      this.controlsDiv.style.height = '37px';
      this.playPauseDiv.style.display = 'block';
      this.muteDiv.style.display = 'block';
      this.sliderDiv.style.display = 'block';
      this.fullscreenDiv.style.display = 'block';
    }.bind(this);

    /**
     * Show pause and hide play button
     */
    var showPauseButton = function() {
      addClass_(this.playPauseDiv, 'ima-paused');
      removeClass_(this.playPauseDiv, 'ima-playing');
    }.bind(this);

    /**
     * Show play and hide pause button
     */
    var showPlayButton = function() {
      addClass_(this.playPauseDiv, 'ima-playing');
      removeClass_(this.playPauseDiv, 'ima-paused');
    }.bind(this);

    /**
     * Listener for clicks on the play/pause button during ad playback.
     * @private
     */
    var onAdPlayPauseClick_ = function() {
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
    var onAdMuteClick_ = function() {
      if (this.adMuted) {
        addClass_(this.muteDiv, 'ima-non-muted');
        removeClass_(this.muteDiv, 'ima-muted');
        this.adsManager.setVolume(1);
        // Bubble down to content player
        this.player.muted(false);
        this.adMuted = false;
        this.sliderLevelDiv.style.width = this.player.volume() * 100 + "%";
      } else {
        addClass_(this.muteDiv, 'ima-muted');
        removeClass_(this.muteDiv, 'ima-non-muted');
        this.adsManager.setVolume(0);
        // Bubble down to content player
        this.player.muted(true);
        this.adMuted = true;
        this.sliderLevelDiv.style.width = "0%";
      }
    }.bind(this);

    /* Listener for mouse down events during ad playback. Used for volume.
     * @private
     */
    var onAdVolumeSliderMouseDown_ = function() {
       document.addEventListener('mouseup', onMouseUp_, false);
       document.addEventListener('mousemove', onMouseMove_, false);
    };

    /* Mouse movement listener used for volume slider.
     * @private
     */
    var onMouseMove_ = function(event) {
      setVolumeSlider_(event);
    };

    /* Mouse release listener used for volume slider.
     * @private
     */
    var onMouseUp_ = function(event) {
      setVolumeSlider_(event);
      document.removeEventListener('mousemove', onMouseMove_);
      document.removeEventListener('mouseup', onMouseUp_);
    };

    /* Utility function to set volume and associated UI
     * @private
     */
    var setVolumeSlider_ = function(event) {
      var percent =
          (event.clientX - this.sliderDiv.getBoundingClientRect().left) /
              this.sliderDiv.offsetWidth;
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
      }
      else
      {
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
    var onAdFullscreenClick_ = function() {
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
    var onFullscreenChange_ = function() {
      if (this.player.isFullscreen()) {
        addClass_(this.fullscreenDiv, 'ima-fullscreen');
        removeClass_(this.fullscreenDiv, 'ima-non-fullscreen');
        if (this.adsManager) {
          this.adsManager.resize(
              window.screen.width,
              window.screen.height,
              google.ima.ViewMode.FULLSCREEN);
        }
      } else {
        addClass_(this.fullscreenDiv, 'ima-non-fullscreen');
        removeClass_(this.fullscreenDiv, 'ima-fullscreen');
        if (this.adsManager) {
          this.adsManager.resize(
              this.getPlayerWidth(),
              this.getPlayerHeight(),
              google.ima.ViewMode.NORMAL);
        }
      }
    }.bind(this);

    /**
     * Listens for the video.js player to change its volume. This keeps the ad
     * volume in sync with the content volume if the volume of the player is
     * changed while content is playing
     * @private
     */
    var onVolumeChange_ = function() {
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
    var seekContentToZero_ = function() {
      this.player.off('loadedmetadata', seekContentToZero_);
      this.player.currentTime(0);
    }.bind(this);

    /**
     * Seeks content to 00:00:00 and starts playback. This is used as an event
     * handler for the loadedmetadata event, since seeking is not possible until
     * that event has fired.
     * @private
     */
    var playContentFromZero_ = function() {
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
    var resetIMA_ = function() {
      this.adsActive = false;
      this.adPlaying = false;
      this.player.on('ended', this.localContentEndedListener);
      this.vjsControls.show();
      this.player.ads.endLinearAdMode();
      if (this.adTrackingTimer) {
        // If this is called while an ad is playing, stop trying to get that
        // ad's current time.
        clearInterval(this.adTrackingTimer);
      }
      // Reset the content time we give the SDK. Fixes an issue where requesting
      // VMAP followed by VMAP would play the second mid-rolls as pre-rolls if
      // the first playthrough of the video passed the second response's
      // mid-roll time.
      this.contentPlayheadTracker.currentTime = 0;
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
    this.addEventListener = function(event, callback) {
      if (this.adsManager) {
        this.adsManager.addEventListener(event, callback);
      }
    }.bind(this);

    /**
     * Returns the instance of the AdsManager.
     * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
     */
    this.getAdsManager = function() {
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
    this.setContent = function(contentSrc, adTag, playOnLoad) {
      window.console.log(
          'WARNING: player.ima.setContent is deprecated. Use ' +
              'player.ima.setContentWithAdTag instead.');
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
    this.setContentWithAdTag = function(contentSrc, adTag, playOnLoad) {
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
    this.setContentWithAdsResponse = function(contentSrc, adsResponse, playOnLoad) {
      resetIMA_();
      this.settings.adsResponse = adsResponse ? adsResponse : this.settings.adsResponse;
      changeSource_(contentSrc, playOnLoad);
    }.bind(this);

    /**
     * Changes the ad tag. You will need to call requestAds after this method
     * for the new ads to be requested.
     * @param {?string} adTag The ad tag to be requested the next time requestAds
     *     is called.
     */
    this.changeAdTag = function(adTag) {
      resetIMA_();
      this.settings.adTagUrl = adTag;
    }.bind(this);

    /**
     * Changes the player source.
     * @param {?string} contentSrc The URI for the content to be played. Leave
     *     blank to use the existing content.
     * @param {?boolean} playOnLoad True to play the content once it has loaded,
     *     false to only load the content but not start playback.
     * @private
     */
    var changeSource_ = function(contentSrc, playOnLoad) {
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

    /**
     * Adds a listener for the 'ended' event of the video player. This should be
     * used instead of setting an 'ended' listener directly to ensure that the
     * ima can do proper cleanup of the SDK before other event listeners
     * are called.
     * @param {function} listener The listener to be called when content completes.
     */
    this.addContentEndedListener = function(listener) {
      this.contentEndedListeners.push(listener);
    }.bind(this);

    /**
     * Adds a listener that will be called when content and all ads have
     * finished playing.
     * @param {function} listener The listener to be called when content and ads complete.
     */
    this.addContentAndAdsEndedListener = function(listener) {
      this.contentAndAdsEndedListeners.push(listener);
    }.bind(this);

    /**
     * Sets the listener to be called to trigger manual ad break playback.
     * @param {function} listener The listener to be called to trigger manual ad break playback.
     */
    this.setAdBreakReadyListener = function(listener) {
      this.adBreakReadyListener = listener;
    }.bind(this);

    /**
     * Pauses the ad.
     */
    this.pauseAd = function() {
      if (this.adsActive && this.adPlaying) {
        showPauseButton();
        this.adsManager.pause();
        this.adPlaying = false;
      }
    }.bind(this);

    /**
     * Resumes the ad.
     */
    this.resumeAd = function() {
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
    var setUpPlayerIntervals_ = function() {
      this.updateTimeIntervalHandle =
          setInterval(updateCurrentTime_, this.seekCheckInterval);
      this.seekCheckIntervalHandle =
          setInterval(checkForSeeking_, this.seekCheckInterval);
      this.resizeCheckIntervalHandle =
          setInterval(checkForResize_, this.resizeCheckInterval);
    }.bind(this);

    /**
     * Updates the current time of the video
     * @private
     */
    var updateCurrentTime_ = function() {
      if (!this.contentPlayheadTracker.seeking) {
        this.contentPlayheadTracker.currentTime = this.player.currentTime();
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
    var checkForSeeking_ = function() {
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
    var checkForResize_ = function() {
      var currentWidth = this.getPlayerWidth();
      var currentHeight = this.getPlayerHeight();

      if (this.adsManager && (currentWidth != this.adsManagerDimensions.width ||
          currentHeight != this.adsManagerDimensions.height)) {
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
    this.setShowCountdown = function(showCountdownIn) {
      this.showCountdown = showCountdownIn;
      this.countdownDiv.style.display = this.showCountdown ? 'block' : 'none';
    }.bind(this);

    /**
     * Current plugin version.
     */
    this.VERSION = '0.7.0';

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
     * Whether or not we are running on a mobile platform.
     */
    this.isMobile = (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i));

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
    this.adBreakReadyListener = undefined;

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
     * Local content ended listener for contentComplete.
     */
    this.localContentEndedListener = function() {
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
      if(this.player.el()) {
        this.player.one('play', setUpPlayerIntervals_);
      }
    }.bind(this);

    this.playerDisposedListener = function(){
      this.contentEndedListeners = [];
      this.contentAndAdsEndedListeners = [];
      this.contentComplete = true;
      this.player.off('ended', this.localContentEndedListener);

      // Bug fix: https://github.com/googleads/videojs-ima/issues/306
      if (this.player.ads.adTimeoutTimeout) {
        clearTimeout(this.player.ads.adTimeoutTimeout);
      }

      var intervalsToClear = [this.updateTimeIntervalHandle, this.seekCheckIntervalHandle,
        this.adTrackingTimer, this.resizeCheckIntervalHandle];
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

    this.settings = extend({}, ima_defaults, options || {});

    // Currently this isn't used but I can see it being needed in the future, so
    // to avoid implementation problems with later updates I'm requiring it.
    if (!this.settings['id']) {
      window.console.log('Error: must provide id of video.js div');
      return;
    }

    this.controlPrefix = (this.settings.id + '_') || '';

    // Get contentPlayer (tech agnostic)
    this.contentPlayer = document.getElementById(this.settings.id).getElementsByClassName('vjs-tech')[0];

    // Detect inline options
    if(this.contentPlayer.hasAttribute('autoplay')){
      this.settings['adWillAutoPlay'] = this.settings['adWillAutoPlay'] || true;
    }

    // Default showing countdown timer to true.
    this.showCountdown = true;
    if (this.settings['showCountdown'] == false) {
      this.showCountdown = false;
    }

    this.autoPlayAdBreaks = true;
    if (this.settings['autoPlayAdBreaks'] == false) {
      this.autoPlayAdBreaks = false;
    }

    player.one('play', setUpPlayerIntervals_);

    player.on('ended', this.localContentEndedListener);
    player.on('dispose', this.playerDisposedListener);

    var contrib_ads_defaults = {
      debug: this.settings.debug,
      timeout: this.settings.timeout,
      prerollTimeout: this.settings.prerollTimeout
    };

    var ads_plugin_settings =
        extend({}, contrib_ads_defaults, options['contribAdsSettings'] || {});

    player.ads(ads_plugin_settings);

    this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
    this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    if (this.settings['adsRenderingSettings']) {
      for (var setting in this.settings['adsRenderingSettings']) {
        this.adsRenderingSettings[setting] =
            this.settings['adsRenderingSettings'][setting];
      }
    }

    if (this.settings['locale']) {
      google.ima.settings.setLocale(this.settings['locale']);
    }

    if (this.settings['disableFlashAds']) {
      google.ima.settings.setDisableFlashAds(this.settings['disableFlashAds']);
    }

    if (this.settings['disableCustomPlaybackForIOS10Plus']) {
      google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.settings['disableCustomPlaybackForIOS10Plus']);
    }

    createAdContainer_();
    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

    this.adsLoader.getSettings().setVpaidMode(
        google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    if (this.settings.vpaidAllowed == false) {
      this.adsLoader.getSettings().setVpaidMode(
          google.ima.ImaSdkSettings.VpaidMode.DISABLED);
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

    this.adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded_,
      false);
    this.adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdsLoaderError_,
      false);

    if (!readyCallback) {
      readyCallback = this.startFromReadyCallback;
    }
    player.on('readyforpreroll', readyCallback);
    player.ready(function() {
      onVolumeChange_();
      player.on('fullscreenchange', onFullscreenChange_);
      player.on('volumechange', onVolumeChange_);
    });
  };

  // Cross-compatibility for Video.js 5 and 6.
  var registerPlugin = videojs.registerPlugin || videojs.plugin;
  registerPlugin('ima', init);
});
