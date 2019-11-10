/*
* videojs-ga - v0.3.0 - 2014-05-23
* Copyright (c) 2014 Michael Bensoussan
* Licensed MIT
*/
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  videojs.plugin('ga', function(options) {
    var dataSetupOptions, defaultsEventsToTrack, end, error, eventCategory, eventLabel, eventsToTrack, fullscreen, gaLibrary, loaded, parsedOptions, pause, percentsAlreadyTracked, percentsPlayedInterval, play, resize, seekEnd, seekStart, seeking, sendbeacon, timeupdate, volumeChange;
    if (options == null) {
      options = {};
    }
    dataSetupOptions = {};
    if (this.options()["data-setup"]) {
      parsedOptions = JSON.parse(this.options()["data-setup"]);
      if (parsedOptions.ga) {
        dataSetupOptions = parsedOptions.ga;
      }
    }
    defaultsEventsToTrack = ['loaded', 'percentsPlayed', 'start', 'srcType', 'end', 'seek', 'play', 'pause', 'resize', 'volumeChange', 'error', 'fullscreen'];
    eventsToTrack = options.eventsToTrack || dataSetupOptions.eventsToTrack || defaultsEventsToTrack;
    percentsPlayedInterval = options.percentsPlayedInterval || dataSetupOptions.percentsPlayedInterval || 10;
    eventCategory = options.eventCategory || dataSetupOptions.eventCategory || 'Video';
    eventLabel = options.eventLabel || dataSetupOptions.eventLabel;
    gaLibrary = options.gaLibrary || dataSetupOptions.gaLibrary || 'ga.js';
    percentsAlreadyTracked = [];
    seekStart = seekEnd = 0;
    seeking = false;
    loaded = function() {
      var sourceType, techName, tmpSrcArray;
      if (!eventLabel) {
        eventLabel = this.currentSrc().split("/").slice(-1)[0].replace(/\.(\w{3,4})(\?.*)?$/i, '');
      }
      if (__indexOf.call(eventsToTrack, "loadedmetadata") >= 0) {
        sendbeacon('loadedmetadata', true);
      }
      if (__indexOf.call(eventsToTrack, "srcType") >= 0) {
        tmpSrcArray = this.currentSrc().split(".");
        sourceType = tmpSrcArray[tmpSrcArray.length - 1];
        techName = this.contentEl().getElementsByClassName("vjs-tech")[0].id;
        sendbeacon('source type - ' + ("" + techName + "/" + sourceType), true);
      }
    };
    timeupdate = function() {
      var currentTime, duration, percent, percentPlayed, _i;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      percentPlayed = Math.round(currentTime / duration * 100);
      for (percent = _i = 0; _i <= 99; percent = _i += percentsPlayedInterval) {
        if (percentPlayed >= percent && __indexOf.call(percentsAlreadyTracked, percent) < 0) {
          if (__indexOf.call(eventsToTrack, "start") >= 0 && percent === 0 && percentPlayed > 0) {
            sendbeacon('start', true);
          } else if (__indexOf.call(eventsToTrack, "percentsPlayed") >= 0 && percentPlayed !== 0) {
            sendbeacon('percent played', true, percent);
          }
          if (percentPlayed > 0) {
            percentsAlreadyTracked.push(percent);
          }
        }
      }
      if (__indexOf.call(eventsToTrack, "seek") >= 0) {
        seekStart = seekEnd;
        seekEnd = currentTime;
        if (Math.abs(seekStart - seekEnd) > 1) {
          seeking = true;
          sendbeacon('seek start', false, seekStart);
          sendbeacon('seek end', false, seekEnd);
        }
      }
    };
    end = function() {
      sendbeacon('end', true);
    };
    play = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      if (currentTime > 0 && !seeking) {
        sendbeacon('play', true, currentTime);
      }
      seeking = true;
    };
    pause = function() {
      var currentTime, duration;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      if (currentTime !== duration && !seeking) {
        sendbeacon('pause', false, currentTime);
      }
    };
    volumeChange = function() {
      var volume;
      volume = this.muted() === true ? 0 : this.volume();
      sendbeacon('volume change', false, volume);
    };
    resize = function() {
      sendbeacon('resize - ' + this.width() + "*" + this.height(), true);
    };
    error = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      sendbeacon('error', true, currentTime);
    };
    fullscreen = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      if (this.isFullscreen()) {
        sendbeacon('enter fullscreen', false, currentTime);
      } else {
        sendbeacon('exit fullscreen', false, currentTime);
      }
    };
    sendbeacon = function(action, nonInteraction, value) {
      try {
        if ('analytics.js' === gaLibrary) {
          ga('send', 'event', {
            'eventCategory': eventCategory,
            'eventAction': action,
            'eventLabel': eventLabel,
            'eventValue': value,
            'nonInteraction': nonInteraction
          });
        } else {
          _gaq.push(['_trackEvent', eventCategory, action, eventLabel, value, nonInteraction]);
        }
      } catch (_error) {}
    };
    this.on("loadedmetadata", loaded);
    this.on("timeupdate", timeupdate);
    if (__indexOf.call(eventsToTrack, "end") >= 0) {
      this.on("ended", end);
    }
    if (__indexOf.call(eventsToTrack, "play") >= 0) {
      this.on("play", play);
    }
    if (__indexOf.call(eventsToTrack, "pause") >= 0) {
      this.on("pause", pause);
    }
    if (__indexOf.call(eventsToTrack, "volumeChange") >= 0) {
      this.on("volumechange", volumeChange);
    }
    if (__indexOf.call(eventsToTrack, "resize") >= 0) {
      this.on("resize", resize);
    }
    if (__indexOf.call(eventsToTrack, "error") >= 0) {
      this.on("error", error);
    }
    if (__indexOf.call(eventsToTrack, "fullscreen") >= 0) {
      this.on("fullscreenchange", fullscreen);
    }
  });

}).call(this);
