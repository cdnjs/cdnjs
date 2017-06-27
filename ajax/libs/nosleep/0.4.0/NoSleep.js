/**
 * NoSleep.js v0.4.0 - git.io/vfn01
 * Rich Tibbett
 * MIT license
 **/
(function(root) {
  // UA matching
  var ua = {
    Android: /Android/ig.test(navigator.userAgent),
    iOS: /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent)
  };

  function addSourceToVideo(element, suffix, type) {
    var source = document.createElement('source');
    source.src = "./resources/blank." + suffix;
    source.type = "video/" + type;
    element.appendChild(source);
  }

  // NoSleep instance constructor
  var NoSleep = function() {
    if (ua.iOS) {
      this.noSleepTimer = null;
    } else if (ua.Android) {
      // Set up no sleep video element
      this.noSleepVideo = document.createElement('video');
      this.noSleepVideo.setAttribute("loop", "");
    }

    return this;
  };

  // Enable NoSleep instance
  NoSleep.prototype.enable = function(duration) {
    if (ua.iOS) {
      this.disable();
      this.noSleepTimer = window.setInterval(function() {
        window.location = window.location;
        window.setTimeout(window.stop, 0);
      }, duration || 15000);
    } else if (ua.Android) {
      // Append blank video sources on first method invocation
      if (!this.videoSourcesLoaded) {
        addSourceToVideo(this.noSleepVideo, "webm", "webm");
        addSourceToVideo(this.noSleepVideo, "mp4", "mp4");
        addSourceToVideo(this.noSleepVideo, "ogv", "ogg");

        this.videoSourcesLoaded = true;
      }

      this.noSleepVideo.play();
    }
  };

  // Disable NoSleep instance
  NoSleep.prototype.disable = function() {
    if (ua.iOS) {
      if (this.noSleepTimer) {
        window.clearInterval(this.noSleepTimer);
        this.noSleepTimer = null;
      }
    } else if (ua.Android) {
      this.noSleepVideo.pause();
    }
  };

  // Append NoSleep API to root object
  root.NoSleep = NoSleep;
})(this);
