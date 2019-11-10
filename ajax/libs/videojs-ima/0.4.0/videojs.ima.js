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

(function(vjs) {
  'use strict';
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
  },

  ima_defaults = {
    debug: false,
    timeout: 5000,
    prerollTimeout: 100,
    adLabel: 'Advertisement'
  },

  imaPlugin = function(options, readyCallback) {
    var player = this;

    /**
     * Creates the ad container passed to the IMA SDK.
     * @private
     */
    player.ima.createAdContainer_ = function() {
      // The adContainerDiv is the DOM of the element that will house
      // the ads and ad controls.
      vjsControls = player.getChild('controlBar');
      adContainerDiv =
          vjsControls.el().parentNode.appendChild(
              document.createElement('div'));
      adContainerDiv.id = 'ima-ad-container';
      adContainerDiv.style.position = "absolute";
      adContainerDiv.style.zIndex = 1111;
      adContainerDiv.addEventListener(
          'mouseover',
          player.ima.showAdControls_,
          false);
      adContainerDiv.addEventListener(
          'mouseout',
          player.ima.hideAdControls_,
          false);
      player.ima.createControls_();
      adDisplayContainer =
          new google.ima.AdDisplayContainer(adContainerDiv, contentPlayer);
    };

    /**
     * Creates the controls for the ad.
     * @private
     */
    player.ima.createControls_ = function() {
      controlsDiv = document.createElement('div');
      controlsDiv.id = 'ima-controls-div';
      controlsDiv.style.width = '100%';
      countdownDiv = document.createElement('div');
      countdownDiv.id = 'ima-countdown-div';
      countdownDiv.innerHTML = settings.adLabel;
      countdownDiv.style.display = showCountdown ? 'block' : 'none';
      seekBarDiv = document.createElement('div');
      seekBarDiv.id = 'ima-seek-bar-div';
      seekBarDiv.style.width = '100%';
      progressDiv = document.createElement('div');
      progressDiv.id = 'ima-progress-div';
      playPauseDiv = document.createElement('div');
      playPauseDiv.id = 'ima-play-pause-div';
      playPauseDiv.className = 'ima-playing';
      playPauseDiv.addEventListener(
          'click',
          player.ima.onAdPlayPauseClick_,
          false);
      muteDiv = document.createElement('div');
      muteDiv.id = 'ima-mute-div';
      muteDiv.className = 'ima-non-muted';
      muteDiv.addEventListener(
          'click',
          player.ima.onAdMuteClick_,
          false);
      sliderDiv = document.createElement('div');
      sliderDiv.id = 'ima-slider-div';
      sliderDiv.addEventListener(
          'mousedown',
          player.ima.onAdVolumeSliderMouseDown_,
          false);
      sliderLevelDiv = document.createElement('div');
      sliderLevelDiv.id = 'ima-slider-level-div';
      fullscreenDiv = document.createElement('div');
      fullscreenDiv.id = 'ima-fullscreen-div';
      fullscreenDiv.className = 'ima-non-fullscreen';
      fullscreenDiv.addEventListener(
          'click',
          player.ima.onAdFullscreenClick_,
          false);
      adContainerDiv.appendChild(controlsDiv);
      controlsDiv.appendChild(countdownDiv);
      controlsDiv.appendChild(seekBarDiv);
      controlsDiv.appendChild(playPauseDiv);
      controlsDiv.appendChild(muteDiv);
      controlsDiv.appendChild(sliderDiv);
      controlsDiv.appendChild(fullscreenDiv);
      seekBarDiv.appendChild(progressDiv);
      sliderDiv.appendChild(sliderLevelDiv);
    };

    /**
     * Initializes the AdDisplayContainer. On mobile, this must be done as a
     * result of user action.
     */
    player.ima.initializeAdDisplayContainer = function() {
      adDisplayContainerInitialized = true;
      adDisplayContainer.initialize();
    }

    /**
     * Creates the AdsRequest and request ads through the AdsLoader.
     */
    player.ima.requestAds = function() {
      if (!adDisplayContainerInitialized) {
        adDisplayContainer.initialize();
      }
      var adsRequest = new google.ima.AdsRequest();
      adsRequest.adTagUrl = settings.adTagUrl;
      if (settings.forceNonLinearFullSlot) {
        adsRequest.forceNonLinearFullSlot = true;
      }

      adsRequest.linearAdSlotWidth = player.ima.getPlayerWidth();
      adsRequest.linearAdSlotHeight = player.ima.getPlayerHeight();
      adsRequest.nonLinearAdSlotWidth =
          settings.nonLinearWidth || player.ima.getPlayerWidth();
      adsRequest.nonLinearAdSlotHeight =
          settings.nonLinearHeight || (player.ima.getPlayerHeight() / 3);

      adsLoader.requestAds(adsRequest);
    };

    /**
     * Listener for the ADS_MANAGER_LOADED event. Creates the AdsManager,
     * sets up event listeners, and triggers the 'adsready' event for
     * videojs-ads-contrib.
     * @private
     */
    player.ima.onAdsManagerLoaded_ = function(adsManagerLoadedEvent) {
      adsManager = adsManagerLoadedEvent.getAdsManager(
          contentPlayheadTracker, adsRenderingSettings);

      adsManager.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          player.ima.onAdError_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.AD_BREAK_READY,
          player.ima.onAdBreakReady_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
          player.ima.onContentPauseRequested_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
          player.ima.onContentResumeRequested_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
          player.ima.onAllAdsCompleted_);

      adsManager.addEventListener(
          google.ima.AdEvent.Type.LOADED,
          player.ima.onAdLoaded_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.STARTED,
          player.ima.onAdStarted_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.CLICK,
          player.ima.onAdPlayPauseClick_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.COMPLETE,
          player.ima.onAdComplete_);
      adsManager.addEventListener(
          google.ima.AdEvent.Type.SKIPPED,
          player.ima.onAdComplete_);

      if (!autoPlayAdBreaks) {
        try {
          var initWidth = player.ima.getPlayerWidth();
          var initHeight = player.ima.getPlayerHeight();
          adsManagerDimensions.width = initWidth;
          adsManagerDimensions.height = initHeight;
          adsManager.init(
              initWidth,
              initHeight,
              google.ima.ViewMode.NORMAL);
          adsManager.setVolume(player.muted() ? 0 : player.volume());
        } catch (adError) {
          player.ima.onAdError_(adError);
        }
      }

      player.trigger('adsready');
    };

    /**
     * Start ad playback, or content video playback in the absence of a
     * pre-roll.
     */
    player.ima.start = function() {
      if (autoPlayAdBreaks) {
        try {
          adsManager.init(
              player.ima.getPlayerWidth(),
              player.ima.getPlayerHeight(),
              google.ima.ViewMode.NORMAL);
          adsManager.setVolume(player.muted() ? 0 : player.volume());
          adsManager.start();
        } catch (adError) {
          player.ima.onAdError_(adError);
        }
      }
    };

    /**
     * Listener for errors fired by the AdsLoader.
     * @param {google.ima.AdErrorEvent} event The error event thrown by the
     *     AdsLoader. See
     *     https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError.Type
     * @private
     */
    player.ima.onAdsLoaderError_ = function(event) {
      window.console.log('AdsLoader error: ' + event.getError());
      if (adsManager) {
        adsManager.destroy();
      }
      player.trigger('adserror');
    };

    /**
     * Listener for errors thrown by the AdsManager.
     * @param {google.ima.AdErrorEvent} adErrorEvent The error event thrown by
     *     the AdsManager.
     * @private
     */
    player.ima.onAdError_ = function(adErrorEvent) {
      window.console.log('Ad error: ' + adErrorEvent.getError());
      vjsControls.show();
      adsManager.destroy();
      adContainerDiv.style.display = 'none';
      player.trigger('adserror');
    };

    /**
     * Listener for AD_BREAK_READY. Passes event on to publisher's listener.
     * @param {google.ima.AdEvent} adEvent AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onAdBreakReady_ = function(adEvent) {
      adBreakReadyListener(adEvent);
    };

    /**
     * Called by publishers in manual ad break playback mode to start an ad
     * break.
     */
    player.ima.playAdBreak = function() {
      if (!autoPlayAdBreaks) {
        adsManager.start();
      }
    }

    /**
     * Pauses the content video and displays the ad container so ads can play.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onContentPauseRequested_ = function(adEvent) {
      adsActive = true;
      adPlaying = true;
      player.off('ended', localContentEndedListener);
      if (adEvent.getAd().getAdPodInfo().getPodIndex() != -1) {
        // Skip this call for post-roll ads
        player.ads.startLinearAdMode();
      }
      adContainerDiv.style.display = 'block';
      controlsDiv.style.display = 'block';
      vjsControls.hide();
      player.pause();
    };

    /**
     * Resumes content video and hides the ad container.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onContentResumeRequested_ = function(adEvent) {
      adsActive = false;
      adPlaying = false;
      player.on('ended', localContentEndedListener);
      if (currentAd && currentAd.isLinear()) {
        adContainerDiv.style.display = 'none';
      }
      vjsControls.show();
      if (!currentAd) {
        // Something went wrong playing the ad
        player.ads.endLinearAdMode();
      } else if (!contentComplete &&
          // Don't exit linear mode after post-roll or content will auto-replay
          currentAd.getAdPodInfo().getPodIndex() != -1 ) {
        player.ads.endLinearAdMode();
      }
      countdownDiv.innerHTML = '';
    };

    /**
     * Records that ads have completed and calls contentAndAdsEndedListeners
     * if content is also complete.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onAllAdsCompleted_ = function(adEvent) {
      allAdsCompleted = true;
      if (contentComplete == true) {
        for (var index in contentAndAdsEndedListeners) {
          contentAndAdsEndedListeners[index]();
        }
      }
    }

    /**
     * Starts the content video when a non-linear ad is loaded.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onAdLoaded_ = function(adEvent) {
      if (!adEvent.getAd().isLinear()) {
        player.play();
      }
    };

    /**
     * Starts the interval timer to check the current ad time when an ad starts
     * playing.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onAdStarted_ = function(adEvent) {
      currentAd = adEvent.getAd();
      if (currentAd.isLinear()) {
        adTrackingTimer = setInterval(
            player.ima.onAdPlayheadTrackerInterval_, 250);
        // Don't bump container when controls are shown
        adContainerDiv.className = '';
      } else {
        // Bump container when controls are shown
        adContainerDiv.className = 'bumpable-ima-ad-container';
      }
    };

    /**
     * Clears the interval timer for current ad time when an ad completes.
     * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
     * @private
     */
    player.ima.onAdComplete_ = function(adEvent) {
      if (currentAd.isLinear()) {
        clearInterval(adTrackingTimer);
      }
    };

    /**
     * Gets the current time and duration of the ad and calls the method to
     * update the ad UI.
     * @private
     */
    player.ima.onAdPlayheadTrackerInterval_ = function() {
      var remainingTime = adsManager.getRemainingTime();
      var duration =  currentAd.getDuration();
      var currentTime = duration - remainingTime;
      currentTime = currentTime > 0 ? currentTime : 0;
      var isPod = false;
      var adPosition, totalAds;
      if (currentAd.getAdPodInfo()) {
        isPod = true;
        adPosition = currentAd.getAdPodInfo().getAdPosition();
        totalAds = currentAd.getAdPodInfo().getTotalAds();
      }

      // Update countdown timer data
      var remainingMinutes = Math.floor(remainingTime / 60);
      var remainingSeconds = Math.floor(remainingTime % 60);
      if (remainingSeconds.toString().length < 2) {
        remainingSeconds = '0' + remainingSeconds;
      }
      var podCount = ': ';
      if (isPod) {
        podCount = ' (' + adPosition + ' of ' + totalAds + '): ';
      }
      countdownDiv.innerHTML =
          settings.adLabel + podCount +
          remainingMinutes + ':' + remainingSeconds;

      // Update UI
      var playProgressRatio = currentTime / duration;
      var playProgressPercent = playProgressRatio * 100;
      progressDiv.style.width = playProgressPercent + '%';
    };

    player.ima.getPlayerWidth = function() {
      var retVal = parseInt(getComputedStyle(player.el()).width, 10) ||
          player.width();
      return retVal;
    };

    player.ima.getPlayerHeight = function() {
      var retVal = parseInt(getComputedStyle(player.el()).height, 10) ||
          player.height();
      return retVal;
    }

    /**
     * Hides the ad controls on mouseout.
     * @private
     */
    player.ima.hideAdControls_ = function() {
      playPauseDiv.style.display = 'none';
      muteDiv.style.display = 'none';
      fullscreenDiv.style.display = 'none';
      controlsDiv.style.height = '14px';
    };

    /**
     * Shows ad controls on mouseover.
     * @private
     */
    player.ima.showAdControls_ = function() {
      controlsDiv.style.height = '37px';
      playPauseDiv.style.display = 'block';
      muteDiv.style.display = 'block';
      sliderDiv.style.display = 'block';
      fullscreenDiv.style.display = 'block';
    };

    /**
     * Listener for clicks on the play/pause button during ad playback.
     * @private
     */
    player.ima.onAdPlayPauseClick_ = function() {
      if (adPlaying) {
        playPauseDiv.className = 'ima-paused';
        adsManager.pause();
        adPlaying = false;
      } else {
        playPauseDiv.className = 'ima-playing';
        adsManager.resume();
        adPlaying = true;
      }
    };

    /**
     * Listener for clicks on the mute button during ad playback.
     * @private
     */
    player.ima.onAdMuteClick_ = function() {
      if (adMuted) {
        muteDiv.className = 'ima-non-muted';
        adsManager.setVolume(1);
        // Bubble down to content player
        player.muted(false);
        adMuted = false;
        sliderLevelDiv.style.width = player.volume() * 100 + "%";
      } else {
        muteDiv.className = 'ima-muted';
        adsManager.setVolume(0);
        // Bubble down to content player
        player.muted(true);
        adMuted = true;
        sliderLevelDiv.style.width = "0%";
      }
    };

    /* Listener for mouse down events during ad playback. Used for volume.
     * @private
     */
    player.ima.onAdVolumeSliderMouseDown_ = function() {
       document.addEventListener('mouseup', player.ima.onMouseUp_, false);
       document.addEventListener('mousemove', player.ima.onMouseMove_, false);
    }

    /* Mouse movement listener used for volume slider.
     * @private
     */
    player.ima.onMouseMove_ = function(event) {
      player.ima.setVolumeSlider_(event);
    }

    /* Mouse release listener used for volume slider.
     * @private
     */
    player.ima.onMouseUp_ = function(event) {
      player.ima.setVolumeSlider_(event);
      document.removeEventListener('mousemove', player.ima.onMouseMove_);
      document.removeEventListener('mouseup', player.ima.onMouseUp_);
    }

    /* Utility function to set volume and associated UI
     * @private
     */
    player.ima.setVolumeSlider_ = function(event) {
      var percent =
          (event.clientX - sliderDiv.getBoundingClientRect().left) /
              sliderDiv.offsetWidth;
      percent *= 100;
      //Bounds value 0-100 if mouse is outside slider region.
      percent = Math.min(Math.max(percent, 0), 100);
      sliderLevelDiv.style.width = percent + "%";
      player.volume(percent / 100); //0-1
      adsManager.setVolume(percent / 100);
      if (player.volume() == 0) {
        muteDiv.className = 'ima-muted';
        player.muted(true);
        adMuted = true;
      }
      else
      {
        muteDiv.className = 'ima-non-muted';
        player.muted(false);
        adMuted = false;
      }
    }

    /**
     * Listener for clicks on the fullscreen button during ad playback.
     * @private
     */
    player.ima.onAdFullscreenClick_ = function() {
      if (player.isFullscreen()) {
        player.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
    };

    /**
     * Listens for the video.js player to change its fullscreen status. This
     * keeps the fullscreen-ness of the AdContainer in sync with the player.
     * @private
     */
    player.ima.onFullscreenChange_ = function() {
      if (player.isFullscreen()) {
        fullscreenDiv.className = 'ima-fullscreen';
        if (adsManager) {
          adsManager.resize(
              window.screen.width,
              window.screen.height,
              google.ima.ViewMode.FULLSCREEN);
        }
      } else {
        fullscreenDiv.className = 'ima-non-fullscreen';
        if (adsManager) {
          adsManager.resize(
              player.ima.getPlayerWidth(),
              player.ima.getPlayerHeight(),
              google.ima.ViewMode.NORMAL);
        }
      }
    };

    /**
     * Listens for the video.js player to change its volume. This keeps the ad
     * volume in sync with the content volume if the volume of the player is
     * changed while content is playing
     * @private
     */
    player.ima.onVolumeChange_ = function() {
      var newVolume = player.muted() ? 0 : player.volume();
      if (adsManager) {
        adsManager.setVolume(newVolume);
      }
      // Update UI
      if (newVolume == 0) {
        adMuted = true;
        muteDiv.className = 'ima-muted';
        sliderLevelDiv.style.width = '0%';
      } else {
        adMuted = false;
        muteDiv.className = 'ima-non-muted';
        sliderLevelDiv.style.width = newVolume * 100 + '%';
      }
    };

    /**
     * Seeks content to 00:00:00. This is used as an event handler for the
     * loadedmetadata event, since seeking is not possible until that event has
     * fired.
     * @private
     */
    player.ima.seekContentToZero_ = function() {
      player.off('loadedmetadata', player.ima.seekContentToZero_);
      player.currentTime(0);
    };

    /**
     * Seeks content to 00:00:00 and starts playback. This is used as an event
     * handler for the loadedmetadata event, since seeking is not possible until
     * that event has fired.
     * @private
     */
    player.ima.playContentFromZero_ = function() {
      player.off('loadedmetadata', player.ima.playContentFromZero_);
      player.currentTime(0);
      player.play();
    };

    /**
     * Destroys the AdsManager, sets it to null, and calls contentComplete to
     * reset correlators. Once this is done it requests ads again to keep the
     * inventory available.
     * @private
     */
    player.ima.resetIMA_ = function() {
      adsActive = false;
      adPlaying = false;
      player.on('ended', localContentEndedListener);
      if (currentAd && currentAd.isLinear()) {
        adContainerDiv.style.display = 'none';
      }
      vjsControls.show();
      player.ads.endLinearAdMode();
      if (adTrackingTimer) {
        // If this is called while an ad is playing, stop trying to get that
        // ad's current time.
        clearInterval(adTrackingTimer);
      }
      if (adsManager) {
        adsManager.destroy();
        adsManager = null;
      }
      if (adsLoader && !contentComplete) {
        adsLoader.contentComplete();
      }
      contentComplete = false;
      allAdsCompleted = false;
    };

    /**
     * Ads an EventListener to the AdsManager. For a list of available events,
     * see
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
     * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to listen.
     * @param {function} callback The method to call when the event is fired.
     */
    player.ima.addEventListener = function(event, callback) {
      if (adsManager) {
        adsManager.addEventListener(event, callback);
      }
    };

    /**
     * Returns the instance of the AdsManager.
     * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
     */
    player.ima.getAdsManager = function() {
      return adsManager;
    };

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
    player.ima.setContent =
        function(contentSrc, adTag, playOnLoad) {
      player.ima.resetIMA_();
      settings.adTagUrl = adTag ? adTag : settings.adTagUrl;
      //only try to pause the player when initialised with a source already
      if (!!player.currentSrc()) {
        player.currentTime(0);
        player.pause();
      }
      if (contentSrc) {
        player.src(contentSrc);
      }
      if (playOnLoad) {
        player.on('loadedmetadata', player.ima.playContentFromZero_);
      } else {
        player.on('loadedmetadata', player.ima.seekContentToZero_);
      }
    };

    /**
     * Adds a listener for the 'ended' event of the video player. This should be
     * used instead of setting an 'ended' listener directly to ensure that the
     * ima can do proper cleanup of the SDK before other event listeners
     * are called.
     * @param {function} listener The listener to be called when content completes.
     */
    player.ima.addContentEndedListener = function(listener) {
      contentEndedListeners.push(listener);
    };

    /**
     * Adds a listener that will be called when content and all ads have
     * finished playing.
     * @param {function} listener The listener to be called when content and ads complete.
     */
    player.ima.addContentAndAdsEndedListener = function(listener) {
      contentAndAdsEndedListeners.push(listener);
    }

    /**
     * Sets the listener to be called to trigger manual ad break playback.
     * @param {function} listener The listener to be called to trigger manual ad break playback.
     */
    player.ima.setAdBreakReadyListener = function(listener) {
      adBreakReadyListener = listener;
    }

    /**
     * Pauses the ad.
     */
    player.ima.pauseAd = function() {
      if (adsActive && adPlaying) {
        playPauseDiv.className = 'ima-paused';
        adsManager.pause();
        adPlaying = false;
      }
    };

    /**
     * Resumes the ad.
     */
    player.ima.resumeAd = function() {
      if (adsActive && !adPlaying) {
        playPauseDiv.className = 'ima-playing';
        adsManager.resume();
        adPlaying = true;
      }
    };

    /**
     * Set up intervals to check for seeking and update current video time.
     * @private
     */
    player.ima.setUpPlayerIntervals_ = function() {
      updateTimeIntervalHandle =
          setInterval(player.ima.updateCurrentTime_, seekCheckInterval);
      seekCheckIntervalHandle =
          setInterval(player.ima.checkForSeeking_, seekCheckInterval);
      resizeCheckIntervalHandle =
          setInterval(player.ima.checkForResize_, resizeCheckInterval);
    };

    /**
     * Updates the current time of the video
     * @private
     */
    player.ima.updateCurrentTime_ = function() {
      if (!contentPlayheadTracker.seeking) {
        contentPlayheadTracker.currentTime = player.currentTime();
      }
    };

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
    player.ima.checkForSeeking_ = function() {
      var tempCurrentTime = player.currentTime();
      var diff = (tempCurrentTime - contentPlayheadTracker.previousTime) * 1000;
      if (Math.abs(diff) > seekCheckInterval + seekThreshold) {
        contentPlayheadTracker.seeking = true;
      } else {
        contentPlayheadTracker.seeking = false;
      }
      contentPlayheadTracker.previousTime = player.currentTime();
    };

    /**
     * Detects when the player is resized (for fluid support) and resizes the
     * ads manager to match.
     *
     * @private
     */
    player.ima.checkForResize_ = function() {
      var currentWidth = player.ima.getPlayerWidth();
      var currentHeight = player.ima.getPlayerHeight();

      if (adsManager && (currentWidth != adsManagerDimensions.width ||
          currentHeight != adsManagerDimensions.height)) {
        adsManagerDimensions.width = currentWidth;
        adsManagerDimensions.height = currentHeight;
        adsManager.resize(currentWidth, currentHeight, google.ima.ViewMode.NORMAL);
      }
    }

    /**
     * Changes the flag to show or hide the ad countdown timer.
     *
     * @param {boolean} showCountdownIn Show or hide the countdown timer.
     */
    player.ima.setShowCountdown = function(showCountdownIn) {
      showCountdown = showCountdownIn;
      countdownDiv.style.display = showCountdown ? 'block' : 'none';
    };

    /**
     * Current plugin version.
     */
    var VERSION = '0.2.0';

    /**
     * Stores user-provided settings.
     */
    var settings;

    /**
     * Video element playing content.
     */
    var contentPlayer;

    /**
     * Boolean flag to show or hide the ad countdown timer.
     */
    var showCountdown;

    /**
     * Boolena flag to enable manual ad break playback.
     */
    var autoPlayAdBreaks;

    /**
     * Video.js control bar.
     */
    var vjsControls;

    /**
     * Div used as an ad container.
     */
    var adContainerDiv;

    /**
     * Div used to display ad controls.
     */
    var controlsDiv;

    /**
     * Div used to display ad countdown timer.
     */
    var countdownDiv;

    /**
     * Div used to display add seek bar.
     */
    var seekBarDiv;

    /**
     * Div used to display ad progress (in seek bar).
     */
    var progressDiv;

    /**
     * Div used to display ad play/pause button.
     */
    var playPauseDiv;

    /**
     * Div used to display ad mute button.
     */
    var muteDiv;

    /**
     * Div used by the volume slider.
     */
    var sliderDiv;

    /**
     * Volume slider level visuals
     */
    var sliderLevelDiv;

    /**
     * Div used to display ad fullscreen button.
     */
    var fullscreenDiv;

    /**
     * IMA SDK AdDisplayContainer.
     */
    var adDisplayContainer;

    /**
     * True if the AdDisplayContainer has been initialized. False otherwise.
     */
    var adDisplayContainerInitialized = false;

    /**
     * IMA SDK AdsLoader
     */
    var adsLoader;

    /**
     * IMA SDK AdsManager
     */
    var adsManager;

    /**
     * IMA SDK AdsRenderingSettings.
     */
    var adsRenderingSettings = null;

    /**
     * Ad tag URL. Should return VAST, VMAP, or ad rules.
     */
    var adTagUrl;

    /**
     * Current IMA SDK Ad.
     */
    var currentAd;

    /**
     * Timer used to track content progress.
     */
    var contentTrackingTimer;

    /**
     * Timer used to track ad progress.
     */
    var adTrackingTimer;

    /**
     * True if ads are currently displayed, false otherwise.
     * True regardless of ad pause state if an ad is currently being displayed.
     */
    var adsActive = false;

    /**
     * True if ad is currently playing, false if ad is paused or ads are not
     * currently displayed.
     */
    var adPlaying = false;

    /**
     * True if the ad is muted, false otherwise.
     */
    var adMuted = false;

    /**
     * True if our content video has completed, false otherwise.
     */
    var contentComplete = false;

    /**
     * True if ALL_ADS_COMPLETED has fired, false until then.
     */
     var allAdsCompleted = false;

    /**
     * Handle to interval that repeatedly updates current time.
     */
    var updateTimeIntervalHandle;

    /**
     * Handle to interval that repeatedly checks for seeking.
     */
    var seekCheckIntervalHandle;

    /**
     * Interval (ms) on which to check if the user is seeking through the
     * content.
     */
    var seekCheckInterval = 1000;

    /**
     * Handle to interval that repeatedly checks for player resize.
     */
    var resizeCheckIntervalHandle;

    /**
     * Interval (ms) to check for player resize for fluid support.
     */
    var resizeCheckInterval = 250;

    /**
     * Threshold by which to judge user seeking. We check every 1000 ms to see
     * if the user is seeking. In order for us to decide that they are *not*
     * seeking, the content video playhead must only change by 900-1100 ms
     * between checks. Any greater change and we assume the user is seeking
     * through the video.
     */
    var seekThreshold = 100;

    /**
     * Stores data for the content playhead tracker.
     */
    var contentPlayheadTracker = {
      currentTime: 0,
      previousTime: 0,
      seeking: false,
      duration: 0
    };

    /**
     * Stores data for the ad playhead tracker.
     */
    var adPlayheadTracker = {
      currentTime: 0,
      duration: 0,
      isPod: false,
      adPosition: 0,
      totalAds: 0
    };

    /**
     * Stores the dimensions for the ads manager.
     */
    var adsManagerDimensions = {
      width: 0,
      height: 0
    };

    /**
     * Content ended listeners passed by the publisher to the plugin. Publishers
     * should allow the plugin to handle content ended to ensure proper support
     * of custom ad playback.
     */
    var contentEndedListeners = [];

    /**
     * Content and ads ended listeners passed by the publisher to the plugin.
     * These will be called when the plugin detects that content *and all
     * ads* have completed. This differs from the contentEndedListeners in that
     * contentEndedListeners will fire between content ending and a post-roll
     * playing, whereas the contentAndAdsEndedListeners will fire after the
     * post-roll completes.
     */
    var contentAndAdsEndedListeners = [];

     /**
      * Listener to be called to trigger manual ad break playback.
      */
    var adBreakReadyListener = undefined;

    /**
     * Local content ended listener for contentComplete.
     */
    var localContentEndedListener = function() {
      if (adsLoader && !contentComplete) {
        adsLoader.contentComplete();
        contentComplete = true;
      }
      for (var index in contentEndedListeners) {
        contentEndedListeners[index]();
      }
      if (allAdsCompleted) {
        for (var index in contentAndAdsEndedListeners) {
          contentAndAdsEndedListeners[index]();
        }
      }
      clearInterval(updateTimeIntervalHandle);
      clearInterval(seekCheckIntervalHandle);
      clearInterval(resizeCheckIntervalHandle);
      player.one('play', player.ima.setUpPlayerIntervals_);
    };

    settings = extend({}, ima_defaults, options || {});

    // Currently this isn't used but I can see it being needed in the future, so
    // to avoid implementation problems with later updates I'm requiring it.
    if (!settings['id']) {
      window.console.log('Error: must provide id of video.js div');
      return;
    }
    contentPlayer = document.getElementById(settings['id'] + '_html5_api');
    // Default showing countdown timer to true.
    showCountdown = true;
    if (settings['showCountdown'] == false) {
      showCountdown = false;
    }

    autoPlayAdBreaks = true;
    if (settings['autoPlayAdBreaks'] == false) {
      autoPlayAdBreaks = false;
    }

    player.one('play', player.ima.setUpPlayerIntervals_);

    player.on('ended', localContentEndedListener);

    var contrib_ads_defaults = {
      debug: settings.debug,
      timeout: settings.timeout,
      prerollTimeout: settings.prerollTimeout
    };

    var ads_plugin_settings =
        extend({}, contrib_ads_defaults, options['contribAdsSettings'] || {});

    player.ads(ads_plugin_settings);

    adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    if (settings['adsRenderingSettings']) {
      for (var setting in settings['adsRenderingSettings']) {
        adsRenderingSettings[setting] =
            settings['adsRenderingSettings'][setting];
      }
    }

    if (settings['locale']) {
      google.ima.settings.setLocale(settings['locale']);
    }

    player.ima.createAdContainer_();

    adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    adsLoader.getSettings().setVpaidMode(
        google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    if (settings.vpaidAllowed == false) {
      adsLoader.getSettings().setVpaidMode(
          google.ima.ImaSdkSettings.VpaidMode.DISABLED);
    }
    if (settings.vpaidMode) {
      adsLoader.getSettings().setVpaidMode(settings.vpaidMode);
    }

    if (settings.locale) {
      adsLoader.getSettings().setLocale(settings.locale);
    }

    if (settings.numRedirects) {
      adsLoader.getSettings().setNumRedirects(settings.numRedirects);
    }

    adsLoader.getSettings().setPlayerType('videojs-ima');
    adsLoader.getSettings().setPlayerVersion(VERSION);
    adsLoader.getSettings().setAutoPlayAdBreaks(autoPlayAdBreaks);

    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      player.ima.onAdsManagerLoaded_,
      false);
    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      player.ima.onAdsLoaderError_,
      false);

    if (!readyCallback) {
      readyCallback = player.ima.start;
    }
    player.on('readyforpreroll', readyCallback);
    player.ready(function() {
      player.on('fullscreenchange', player.ima.onFullscreenChange_);
      player.on('volumechange', player.ima.onVolumeChange_);
    });
  };

  videojs.plugin('ima', imaPlugin);
}(window.videojs));
