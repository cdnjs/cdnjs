(function(root) {
  // UA matching
  var ua = {
    Android: /Android/ig.test(navigator.userAgent),
    iOS: /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent)
  };

  function addSourceToVideo(element, src, type) {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
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
      for (var i = 0; i < 3; i++) {
        var prefix, type;
        switch (i) {
          case 0:
            prefix = "m4v";
            type = "mp4";
            break;
          case 1:
            prefix = type = "webm";
            break;
          case 2:
            prefix = "ogv";
            type = "ogg";
            break;
        }

        addSourceToVideo(this.noSleepVideo, "./resources/blank." + prefix, "video/" + type);
      }
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
