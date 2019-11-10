(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  vjs.plugin('ga', function(options) {
    var dataSetupOptions, deafultsEventsToTrack, end, error, eventCategory, eventLabel, eventsToTrack, fullscreen, loaded, parsedOptions, pause, percentsAlreadyTracked, percentsPlayedInterval, play, resize, seekEnd, seekStart, seeking, timeupdate, volumeChange;
    dataSetupOptions = {};
    if (this.options()["data-setup"]) {
      parsedOptions = JSON.parse(this.options()["data-setup"]);
      if (parsedOptions.ga) {
        dataSetupOptions = parsedOptions.ga;
      }
    }
    deafultsEventsToTrack = ['loaded', 'percentsPlayed', 'start', 'end', 'seek', 'play', 'pause', 'resize', 'volumeChange', 'error', 'fullscreen'];
    eventsToTrack = options.eventsToTrack || dataSetupOptions.eventsToTrack || deafultsEventsToTrack;
    percentsPlayedInterval = options.percentsPlayedInterval || dataSetupOptions.percentsPlayedInterval || 10;
    eventCategory = options.eventCategory || dataSetupOptions.eventCategory || 'Video';
    eventLabel = options.eventLabel || dataSetupOptions.eventLabel;
    percentsAlreadyTracked = [];
    seekStart = seekEnd = 0;
    seeking = false;
    loaded = function() {
      if (!eventLabel) {
        eventLabel = this.currentSrc().split("/").slice(-1)[0].replace(/\.(\w{3,4})(\?.*)?$/i, '');
      }
      if (__indexOf.call(eventsToTrack, "loadedmetadata") >= 0) {
        _gaq.push(['_trackEvent', eventCategory, 'loadedmetadata', eventLabel]);
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
            _gaq.push(['_trackEvent', eventCategory, "start", eventLabel]);
          } else if (__indexOf.call(eventsToTrack, "percentsPlayed") >= 0 && percentPlayed !== 0) {
            _gaq.push(['_trackEvent', eventCategory, "" + percent + "%", eventLabel]);
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
          _gaq.push(['_trackEvent', eventCategory, 'seek start', eventLabel, seekStart]);
          _gaq.push(['_trackEvent', eventCategory, 'seek end', eventLabel, seekEnd]);
        }
      }
    };
    end = function() {
      _gaq.push(['_trackEvent', eventCategory, "end", eventLabel]);
    };
    play = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      if (currentTime > 0 && !seeking) {
        _gaq.push(['_trackEvent', eventCategory, 'play', eventLabel, currentTime]);
      }
      seeking = true;
    };
    pause = function() {
      var currentTime, duration;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      if (currentTime !== duration && !seeking) {
        _gaq.push(['_trackEvent', eventCategory, 'pause', eventLabel, currentTime]);
      }
    };
    volumeChange = function() {
      var volume;
      volume = this.muted() === true ? 0 : this.volume();
      _gaq.push(['_trackEvent', eventCategory, 'volumeChange', eventLabel, volume]);
    };
    resize = function() {
      _gaq.push(['_trackEvent', eventCategory, 'resize', eventLabel, "" + this.width + "*" + this.height]);
    };
    error = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      _gaq.push(['_trackEvent', eventCategory, 'error', eventLabel, currentTime]);
    };
    fullscreen = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      if (this.isFullScreen) {
        _gaq.push(['_trackEvent', eventCategory, 'enter fullscreen', eventLabel, currentTime]);
      } else {
        _gaq.push(['_trackEvent', eventCategory, 'exit fullscreen', eventLabel, currentTime]);
      }
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
