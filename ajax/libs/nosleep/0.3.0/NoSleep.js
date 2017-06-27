/**
 * NoSleep.js v0.3.0 - git.io/vfn01
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
    this.noSleepTimer = null;

    // Set up no sleep video element
    if (ua.Android) {
      this.noSleepVideo = document.createElement('video');

      // loop the video
      this.noSleepVideo.addEventListener('ended', function(ev) {
        this.play();
      });

      // Append blank video sources
      addSourceToVideo(this.noSleepVideo, "m4v", "mp4");
      addSourceToVideo(this.noSleepVideo, "webm", "webm");
      addSourceToVideo(this.noSleepVideo, "ogv", "ogg");
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
