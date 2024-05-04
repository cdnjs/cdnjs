/*!
 * Video Extension for Jarallax v2.2.1 (https://github.com/nk-o/jarallax)
 * Copyright 2024 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jarallaxVideo = factory());
})(this, (function () { 'use strict';

  /*!
   * Video Worker v2.2.0 (https://github.com/nk-o/video-worker)
   * Copyright 2024 nK <https://nkdev.info>
   * Licensed under MIT (https://github.com/nk-o/video-worker/blob/master/LICENSE)
   */

  var defaults = {
    autoplay: false,
    loop: false,
    mute: false,
    volume: 100,
    showControls: true,
    accessibilityHidden: false,
    // start / end video time in seconds
    startTime: 0,
    endTime: 0
  };

  /**
   * Extend like jQuery.extend
   *
   * @param {Object} out - output object.
   * @param {...any} args - additional objects to extend.
   *
   * @returns {Object}
   */
  function extend(out, ...args) {
    out = out || {};
    Object.keys(args).forEach(i => {
      if (!args[i]) {
        return;
      }
      Object.keys(args[i]).forEach(key => {
        out[key] = args[i][key];
      });
    });
    return out;
  }
  let ID = 0;
  class VideoWorkerBase {
    type = 'none';
    constructor(url, options) {
      const self = this;
      self.url = url;
      self.options_default = {
        ...defaults
      };
      self.options = extend({}, self.options_default, options);

      // check URL
      self.videoID = self.constructor.parseURL(url);

      // init
      if (self.videoID) {
        self.init();
      }
    }
    isValid() {
      return !!this.videoID;
    }
    init() {
      const self = this;
      self.ID = ID;
      ID += 1;
      self.playerID = `VideoWorker-${self.ID}`;
    }

    // events
    on(name, callback) {
      this.userEventsList = this.userEventsList || [];

      // add new callback in events list
      (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
    }
    off(name, callback) {
      if (!this.userEventsList || !this.userEventsList[name]) {
        return;
      }
      if (!callback) {
        delete this.userEventsList[name];
      } else {
        this.userEventsList[name].forEach((val, key) => {
          if (val === callback) {
            this.userEventsList[name][key] = false;
          }
        });
      }
    }
    fire(name, ...args) {
      if (this.userEventsList && typeof this.userEventsList[name] !== 'undefined') {
        this.userEventsList[name].forEach(val => {
          // call with all arguments
          if (val) {
            val.apply(this, args);
          }
        });
      }
    }

    /**
     * Methods used in providers.
     */
    /* eslint-disable */
    static parseURL(url) {
      return false;
    }
    play(start) {}
    pause() {}
    mute() {}
    unmute() {}
    setVolume(volume = false) {}
    getVolume(callback) {}
    getMuted(callback) {}
    setCurrentTime(currentTime = false) {}
    getCurrentTime(callback) {}
    getImageURL(callback) {}
    getVideo(callback) {}
    /* eslint-enable */
  }

  /* eslint-disable import/no-mutable-exports */
  /* eslint-disable no-restricted-globals */
  let win$1;
  if (typeof window !== 'undefined') {
    win$1 = window;
  } else if (typeof global !== 'undefined') {
    win$1 = global;
  } else if (typeof self !== 'undefined') {
    win$1 = self;
  } else {
    win$1 = {};
  }
  var global$1$1 = win$1;

  // Deferred
  // thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery
  function Deferred() {
    this.doneCallbacks = [];
    this.failCallbacks = [];
  }
  Deferred.prototype = {
    execute(list, args) {
      let i = list.length;
      // eslint-disable-next-line no-param-reassign
      args = Array.prototype.slice.call(args);
      while (i) {
        i -= 1;
        list[i].apply(null, args);
      }
    },
    resolve(...args) {
      this.execute(this.doneCallbacks, args);
    },
    reject(...args) {
      this.execute(this.failCallbacks, args);
    },
    done(callback) {
      this.doneCallbacks.push(callback);
    },
    fail(callback) {
      this.failCallbacks.push(callback);
    }
  };
  let YoutubeAPIadded = 0;
  let loadingYoutubePlayer = 0;
  const loadingYoutubeDefer = /*#__PURE__*/new Deferred();
  function loadAPI$1() {
    if (YoutubeAPIadded) {
      return;
    }
    YoutubeAPIadded = true;
    const src = 'https://www.youtube.com/iframe_api';

    // add script in head section
    let tag = document.createElement('script');
    let head = document.getElementsByTagName('head')[0];
    tag.src = src;
    head.appendChild(tag);
    head = null;
    tag = null;
  }
  function onAPIready$1(callback) {
    // Listen for global YT player callback
    if ((typeof global$1$1.YT === 'undefined' || global$1$1.YT.loaded === 0) && !loadingYoutubePlayer) {
      // Prevents Ready event from being called twice
      loadingYoutubePlayer = 1;

      // Creates deferred so, other players know when to wait.
      global$1$1.onYouTubeIframeAPIReady = function () {
        global$1$1.onYouTubeIframeAPIReady = null;
        loadingYoutubeDefer.resolve('done');
        callback();
      };
    } else if (typeof global$1$1.YT === 'object' && global$1$1.YT.loaded === 1) {
      callback();
    } else {
      loadingYoutubeDefer.done(() => {
        callback();
      });
    }
  }
  class VideoWorkerYoutube extends VideoWorkerBase {
    type = 'youtube';
    static parseURL(url) {
      // eslint-disable-next-line no-useless-escape
      const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[1].length === 11 ? match[1] : false;
    }
    init() {
      super.init();
      loadAPI$1();
    }
    play(start) {
      const self = this;
      if (!self.player || !self.player.playVideo) {
        return;
      }
      if (typeof start !== 'undefined') {
        self.player.seekTo(start || 0);
      }
      if (global$1$1.YT.PlayerState.PLAYING !== self.player.getPlayerState()) {
        // Don't play if video is already ended and with no loop.
        if (self.options.endTime && !self.options.loop) {
          self.getCurrentTime(seconds => {
            if (seconds < self.options.endTime) {
              self.player.playVideo();
            }
          });
        } else {
          self.player.playVideo();
        }
      }
    }
    pause() {
      const self = this;
      if (!self.player || !self.player.pauseVideo) {
        return;
      }
      if (global$1$1.YT.PlayerState.PLAYING === self.player.getPlayerState()) {
        self.player.pauseVideo();
      }
    }
    mute() {
      const self = this;
      if (!self.player || !self.player.mute) {
        return;
      }
      self.player.mute();
    }
    unmute() {
      const self = this;
      if (!self.player || !self.player.unMute) {
        return;
      }
      self.player.unMute();
    }
    setVolume(volume = false) {
      const self = this;
      if (!self.player || typeof volume !== 'number' || !self.player.setVolume) {
        return;
      }
      self.player.setVolume(volume);
    }
    getVolume(callback) {
      const self = this;
      if (!self.player) {
        callback(false);
        return;
      }
      if (self.player.getVolume) {
        callback(self.player.getVolume());
      }
    }
    getMuted(callback) {
      const self = this;
      if (!self.player) {
        callback(null);
        return;
      }
      if (self.player.isMuted) {
        callback(self.player.isMuted());
      }
    }
    setCurrentTime(currentTime = false) {
      const self = this;
      if (!self.player || typeof currentTime !== 'number' || !self.player.seekTo) {
        return;
      }
      self.player.seekTo(currentTime);
    }
    getCurrentTime(callback) {
      const self = this;
      if (!self.player || !self.player.getCurrentTime) {
        return;
      }
      callback(self.player.getCurrentTime());
    }
    getImageURL(callback) {
      const self = this;
      if (self.videoImage) {
        callback(self.videoImage);
        return;
      }
      const availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
      let step = 0;
      const tempImg = new Image();
      tempImg.onload = function () {
        // if no thumbnail, youtube add their own image with width = 120px
        if ((this.naturalWidth || this.width) !== 120 || step === availableSizes.length - 1) {
          // ok
          self.videoImage = `https://img.youtube.com/vi/${self.videoID}/${availableSizes[step]}.jpg`;
          callback(self.videoImage);
        } else {
          // try another size
          step += 1;
          this.src = `https://img.youtube.com/vi/${self.videoID}/${availableSizes[step]}.jpg`;
        }
      };
      tempImg.src = `https://img.youtube.com/vi/${self.videoID}/${availableSizes[step]}.jpg`;
    }
    getVideo(callback) {
      const self = this;

      // return generated video block
      if (self.$video) {
        callback(self.$video);
        return;
      }

      // generate new video block
      onAPIready$1(() => {
        let hiddenDiv;
        if (!self.$video) {
          hiddenDiv = document.createElement('div');
          hiddenDiv.style.display = 'none';
        }
        self.playerOptions = {
          // GDPR Compliance.
          host: 'https://www.youtube-nocookie.com',
          videoId: self.videoID,
          playerVars: {
            autohide: 1,
            rel: 0,
            autoplay: 0,
            // autoplay enable on mobile devices
            playsinline: 1
          }
        };

        // hide controls
        if (!self.options.showControls) {
          self.playerOptions.playerVars.iv_load_policy = 3;
          self.playerOptions.playerVars.modestbranding = 1;
          self.playerOptions.playerVars.controls = 0;
          self.playerOptions.playerVars.showinfo = 0;
          self.playerOptions.playerVars.disablekb = 1;
        }

        // events
        let ytStarted;
        let ytProgressInterval;
        self.playerOptions.events = {
          onReady(e) {
            // mute
            if (self.options.mute) {
              e.target.mute();
            } else if (typeof self.options.volume === 'number') {
              e.target.setVolume(self.options.volume);
            }

            // autoplay
            if (self.options.autoplay) {
              self.play(self.options.startTime);
            }
            self.fire('ready', e);

            // For seamless loops, set the endTime to 0.1 seconds less than the video's duration
            // https://github.com/nk-o/video-worker/issues/2
            if (self.options.loop && !self.options.endTime) {
              const secondsOffset = 0.1;
              self.options.endTime = self.player.getDuration() - secondsOffset;
            }

            // volumechange
            setInterval(() => {
              self.getVolume(volume => {
                if (self.options.volume !== volume) {
                  self.options.volume = volume;
                  self.fire('volumechange', e);
                }
              });
            }, 150);
          },
          onStateChange(e) {
            // loop
            if (self.options.loop && e.data === global$1$1.YT.PlayerState.ENDED) {
              self.play(self.options.startTime);
            }
            if (!ytStarted && e.data === global$1$1.YT.PlayerState.PLAYING) {
              ytStarted = 1;
              self.fire('started', e);
            }
            if (e.data === global$1$1.YT.PlayerState.PLAYING) {
              self.fire('play', e);
            }
            if (e.data === global$1$1.YT.PlayerState.PAUSED) {
              self.fire('pause', e);
            }
            if (e.data === global$1$1.YT.PlayerState.ENDED) {
              self.fire('ended', e);
            }

            // progress check
            if (e.data === global$1$1.YT.PlayerState.PLAYING) {
              ytProgressInterval = setInterval(() => {
                self.fire('timeupdate', e);

                // check for end of video and play again or stop
                if (self.options.endTime && self.player.getCurrentTime() >= self.options.endTime) {
                  if (self.options.loop) {
                    self.play(self.options.startTime);
                  } else {
                    self.pause();
                  }
                }
              }, 150);
            } else {
              clearInterval(ytProgressInterval);
            }
          },
          onError(e) {
            self.fire('error', e);
          }
        };
        const firstInit = !self.$video;
        if (firstInit) {
          const div = document.createElement('div');
          div.setAttribute('id', self.playerID);
          hiddenDiv.appendChild(div);
          document.body.appendChild(hiddenDiv);
        }
        self.player = self.player || new global$1$1.YT.Player(self.playerID, self.playerOptions);
        if (firstInit) {
          self.$video = document.getElementById(self.playerID);

          // add accessibility attributes
          if (self.options.accessibilityHidden) {
            self.$video.setAttribute('tabindex', '-1');
            self.$video.setAttribute('aria-hidden', 'true');
          }

          // get video width and height
          self.videoWidth = parseInt(self.$video.getAttribute('width'), 10) || 1280;
          self.videoHeight = parseInt(self.$video.getAttribute('height'), 10) || 720;
        }
        callback(self.$video);
      });
    }
  }
  let VimeoAPIadded = 0;
  let loadingVimeoPlayer = 0;
  const loadingVimeoDefer = /*#__PURE__*/new Deferred();
  function loadAPI() {
    if (VimeoAPIadded) {
      return;
    }
    VimeoAPIadded = true;

    // Useful when Vimeo API added using RequireJS https://github.com/nk-o/video-worker/pull/7
    if (typeof global$1$1.Vimeo !== 'undefined') {
      return;
    }
    const src = 'https://player.vimeo.com/api/player.js';

    // add script in head section
    let tag = document.createElement('script');
    let head = document.getElementsByTagName('head')[0];
    tag.src = src;
    head.appendChild(tag);
    head = null;
    tag = null;
  }
  function onAPIready(callback) {
    if (typeof global$1$1.Vimeo === 'undefined' && !loadingVimeoPlayer) {
      loadingVimeoPlayer = 1;
      const vimeoInterval = setInterval(() => {
        if (typeof global$1$1.Vimeo !== 'undefined') {
          clearInterval(vimeoInterval);
          loadingVimeoDefer.resolve('done');
          callback();
        }
      }, 20);
    } else if (typeof global$1$1.Vimeo !== 'undefined') {
      callback();
    } else {
      loadingVimeoDefer.done(() => {
        callback();
      });
    }
  }
  class VideoWorkerVimeo extends VideoWorkerBase {
    type = 'vimeo';
    static parseURL(url) {
      // eslint-disable-next-line no-useless-escape
      const regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
      const match = url.match(regExp);
      return match && match[3] ? match[3] : false;
    }

    // Try to extract a hash for private videos from the URL.
    // Thanks to https://github.com/sampotts/plyr
    static parseURLHash(url) {
      /* This regex matches a hexadecimal hash if given in any of these forms:
       *  - [https://player.]vimeo.com/video/{id}/{hash}[?params]
       *  - [https://player.]vimeo.com/video/{id}?h={hash}[&params]
       *  - [https://player.]vimeo.com/video/{id}?[params]&h={hash}
       *  - video/{id}/{hash}
       * If matched, the hash is available in capture group 4
       */
      const regex = /^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/;
      const found = url.match(regex);
      return found && found.length === 5 ? found[4] : null;
    }
    init() {
      super.init();
      loadAPI();
    }
    play(start) {
      const self = this;
      if (!self.player) {
        return;
      }
      if (typeof start !== 'undefined') {
        self.player.setCurrentTime(start);
      }
      self.player.getPaused().then(paused => {
        if (paused) {
          // Don't play if video is already ended and with no loop.
          if (self.options.endTime && !self.options.loop) {
            self.getCurrentTime(seconds => {
              if (seconds < self.options.endTime) {
                self.player.play();
              }
            });
          } else {
            self.player.play();
          }
        }
      });
    }
    pause() {
      const self = this;
      if (!self.player) {
        return;
      }
      self.player.getPaused().then(paused => {
        if (!paused) {
          self.player.pause();
        }
      });
    }
    mute() {
      const self = this;
      if (!self.player || !self.player.setVolume) {
        return;
      }
      self.setVolume(0);
    }
    unmute() {
      const self = this;
      if (!self.player || !self.player.setVolume) {
        return;
      }

      // In case the default volume is 0, we have to set 100 when unmute.
      self.setVolume(self.options.volume || 100);
    }
    setVolume(volume = false) {
      const self = this;
      if (!self.player || typeof volume !== 'number' || !self.player.setVolume) {
        return;
      }
      self.player.setVolume(volume / 100);
    }
    getVolume(callback) {
      const self = this;
      if (!self.player) {
        callback(false);
        return;
      }
      if (self.player.getVolume) {
        self.player.getVolume().then(volume => {
          callback(volume * 100);
        });
      }
    }
    getMuted(callback) {
      const self = this;
      if (!self.player) {
        callback(null);
        return;
      }
      if (self.player.getVolume) {
        self.player.getVolume().then(volume => {
          callback(!!volume);
        });
      }
    }
    setCurrentTime(currentTime = false) {
      const self = this;
      if (!self.player || typeof currentTime !== 'number' || !self.player.setCurrentTime) {
        return;
      }
      self.player.setCurrentTime(currentTime);
    }
    getCurrentTime(callback) {
      const self = this;
      if (!self.player || !self.player.getCurrentTime) {
        return;
      }
      self.player.getCurrentTime().then(currentTime => {
        callback(currentTime);
      });
    }
    getImageURL(callback) {
      const self = this;
      if (self.videoImage) {
        callback(self.videoImage);
        return;
      }

      // We should provide width to get HQ thumbnail URL.
      let width = global$1$1.innerWidth || 1920;
      if (global$1$1.devicePixelRatio) {
        width *= global$1$1.devicePixelRatio;
      }
      width = Math.min(width, 1920);
      let request = new XMLHttpRequest();
      // https://vimeo.com/api/oembed.json?url=https://vimeo.com/235212527
      request.open('GET', `https://vimeo.com/api/oembed.json?url=${self.url}&width=${width}`, true);
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            const response = JSON.parse(this.responseText);
            if (response.thumbnail_url) {
              self.videoImage = response.thumbnail_url;
              callback(self.videoImage);
            }
          }
        }
      };
      request.send();
      request = null;
    }
    getVideo(callback) {
      const self = this;

      // return generated video block
      if (self.$video) {
        callback(self.$video);
        return;
      }

      // generate new video block
      onAPIready(() => {
        let hiddenDiv;
        if (!self.$video) {
          hiddenDiv = document.createElement('div');
          hiddenDiv.style.display = 'none';
        }
        self.playerOptions = {
          // GDPR Compliance.
          dnt: 1,
          id: self.videoID,
          autopause: 0,
          transparent: 0,
          autoplay: self.options.autoplay ? 1 : 0,
          loop: self.options.loop ? 1 : 0,
          muted: self.options.mute || self.options.volume === 0 ? 1 : 0
        };

        // private video hash
        const urlHash = self.constructor.parseURLHash(self.url);
        if (urlHash) {
          self.playerOptions.h = urlHash;
        }

        // hide controls
        if (!self.options.showControls) {
          self.playerOptions.controls = 0;
        }

        // enable background option
        if (!self.options.showControls && self.options.loop && self.options.autoplay) {
          self.playerOptions.background = 1;
        }
        if (!self.$video) {
          let playerOptionsString = '';
          Object.keys(self.playerOptions).forEach(key => {
            if (playerOptionsString !== '') {
              playerOptionsString += '&';
            }
            playerOptionsString += `${key}=${encodeURIComponent(self.playerOptions[key])}`;
          });

          // we need to create iframe manually because when we create it using API
          // js events won't triggers after iframe moved to another place
          self.$video = document.createElement('iframe');
          self.$video.setAttribute('id', self.playerID);
          self.$video.setAttribute('src', `https://player.vimeo.com/video/${self.videoID}?${playerOptionsString}`);
          self.$video.setAttribute('frameborder', '0');
          self.$video.setAttribute('mozallowfullscreen', '');
          self.$video.setAttribute('allowfullscreen', '');
          self.$video.setAttribute('title', 'Vimeo video player');

          // add accessibility attributes
          if (self.options.accessibilityHidden) {
            self.$video.setAttribute('tabindex', '-1');
            self.$video.setAttribute('aria-hidden', 'true');
          }
          hiddenDiv.appendChild(self.$video);
          document.body.appendChild(hiddenDiv);
        }
        self.player = self.player || new global$1$1.Vimeo.Player(self.$video, self.playerOptions);

        // Since Vimeo removed the `volume` parameter, we have to set it manually.
        if (!self.options.mute && typeof self.options.volume === 'number') {
          self.setVolume(self.options.volume);
        }

        // set current time for autoplay
        if (self.options.startTime && self.options.autoplay) {
          self.player.setCurrentTime(self.options.startTime);
        }

        // get video width and height
        self.player.getVideoWidth().then(width => {
          self.videoWidth = width || 1280;
        });
        self.player.getVideoHeight().then(height => {
          self.videoHeight = height || 720;
        });

        // events
        let vmStarted;
        self.player.on('timeupdate', e => {
          if (!vmStarted) {
            self.fire('started', e);
            vmStarted = 1;
          }
          self.fire('timeupdate', e);

          // check for end of video and play again or stop
          if (self.options.endTime && e.seconds >= self.options.endTime) {
            if (self.options.loop) {
              self.play(self.options.startTime);
            } else {
              self.pause();
            }
          }
        });
        self.player.on('play', e => {
          self.fire('play', e);

          // check for the start time and start with it
          if (self.options.startTime && e.seconds === 0) {
            self.play(self.options.startTime);
          }
        });
        self.player.on('pause', e => {
          self.fire('pause', e);
        });
        self.player.on('ended', e => {
          self.fire('ended', e);
        });
        self.player.on('loaded', e => {
          self.fire('ready', e);
        });
        self.player.on('volumechange', e => {
          self.getVolume(volume => {
            self.options.volume = volume;
          });
          self.fire('volumechange', e);
        });
        self.player.on('error', e => {
          self.fire('error', e);
        });
        callback(self.$video);
      });
    }
  }
  class VideoWorkerLocal extends VideoWorkerBase {
    type = 'local';
    static parseURL(url) {
      // eslint-disable-next-line no-useless-escape
      const videoFormats = url.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
      const result = {};
      let ready = 0;
      videoFormats.forEach(val => {
        // eslint-disable-next-line no-useless-escape
        const match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
        if (match && match[1] && match[2]) {
          // eslint-disable-next-line prefer-destructuring
          result[match[1] === 'ogv' ? 'ogg' : match[1]] = match[2];
          ready = 1;
        }
      });
      return ready ? result : false;
    }
    play(start) {
      const self = this;
      if (!self.player) {
        return;
      }
      if (typeof start !== 'undefined') {
        self.player.currentTime = start;
      }
      if (self.player.paused) {
        // Don't play if video is already ended and with no loop.
        if (self.options.endTime && !self.options.loop) {
          self.getCurrentTime(seconds => {
            if (seconds < self.options.endTime) {
              self.player.play();
            }
          });
        } else {
          self.player.play();
        }
      }
    }
    pause() {
      const self = this;
      if (!self.player || self.player.paused) {
        return;
      }
      self.player.pause();
    }
    mute() {
      const self = this;
      if (!self.player) {
        return;
      }
      self.$video.muted = true;
    }
    unmute() {
      const self = this;
      if (!self.player) {
        return;
      }
      self.$video.muted = false;
    }
    setVolume(volume = false) {
      const self = this;
      if (!self.player || typeof volume !== 'number') {
        return;
      }
      self.$video.volume = volume / 100;
    }
    getVolume(callback) {
      const self = this;
      if (!self.player) {
        callback(false);
        return;
      }
      callback(self.$video.volume * 100);
    }
    getMuted(callback) {
      const self = this;
      if (!self.player) {
        callback(null);
        return;
      }
      callback(self.$video.muted);
    }
    setCurrentTime(currentTime = false) {
      const self = this;
      if (!self.player || typeof currentTime !== 'number') {
        return;
      }
      self.$video.currentTime = currentTime;
    }
    getCurrentTime(callback) {
      const self = this;
      if (!self.player) {
        return;
      }
      callback(self.player.currentTime);
    }
    getImageURL(callback) {
      const self = this;
      if (self.videoImage) {
        callback(self.videoImage);
      }
    }
    getVideo(callback) {
      const self = this;

      // return generated video block
      if (self.$video) {
        callback(self.$video);
        return;
      }

      // generate new video block
      let hiddenDiv;
      if (!self.$video) {
        hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
      }
      function addSourceElement(element, src, type) {
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        element.appendChild(source);
      }
      if (!self.$video) {
        self.$video = document.createElement('video');
        self.player = self.$video;

        // show controls
        if (self.options.showControls) {
          self.$video.controls = true;
        }

        // set volume
        if (typeof self.options.volume === 'number') {
          self.setVolume(self.options.volume);
        }

        // mute (it is required to mute after the volume set)
        if (self.options.mute) {
          self.mute();
        }

        // loop
        if (self.options.loop) {
          self.$video.loop = true;
        }

        // autoplay enable on mobile devices
        self.$video.setAttribute('playsinline', '');
        self.$video.setAttribute('webkit-playsinline', '');

        // add accessibility attributes
        if (self.options.accessibilityHidden) {
          self.$video.setAttribute('tabindex', '-1');
          self.$video.setAttribute('aria-hidden', 'true');
        }
        self.$video.setAttribute('id', self.playerID);
        hiddenDiv.appendChild(self.$video);
        document.body.appendChild(hiddenDiv);
        Object.keys(self.videoID).forEach(key => {
          addSourceElement(self.$video, self.videoID[key], `video/${key}`);
        });
      }
      let locStarted;
      self.player.addEventListener('playing', e => {
        if (!locStarted) {
          self.fire('started', e);
        }
        locStarted = 1;
      });
      self.player.addEventListener('timeupdate', function (e) {
        self.fire('timeupdate', e);

        // check for end of video and play again or stop
        if (self.options.endTime && this.currentTime >= self.options.endTime) {
          if (self.options.loop) {
            self.play(self.options.startTime);
          } else {
            self.pause();
          }
        }
      });
      self.player.addEventListener('play', e => {
        self.fire('play', e);
      });
      self.player.addEventListener('pause', e => {
        self.fire('pause', e);
      });
      self.player.addEventListener('ended', e => {
        self.fire('ended', e);
      });
      self.player.addEventListener('loadedmetadata', function () {
        // get video width and height
        self.videoWidth = this.videoWidth || 1280;
        self.videoHeight = this.videoHeight || 720;
        self.fire('ready');

        // autoplay
        if (self.options.autoplay) {
          self.play(self.options.startTime);
        }
      });
      self.player.addEventListener('volumechange', e => {
        self.getVolume(volume => {
          self.options.volume = volume;
        });
        self.fire('volumechange', e);
      });
      self.player.addEventListener('error', e => {
        self.fire('error', e);
      });
      callback(self.$video);
    }
  }
  function VideoWorker(url, options) {
    let result = false;
    Object.keys(VideoWorker.providers).forEach(key => {
      if (!result && VideoWorker.providers[key].parseURL(url)) {
        result = new VideoWorker.providers[key](url, options);
      }
    });
    return result || new VideoWorkerBase(url, options);
  }
  VideoWorker.BaseClass = VideoWorkerBase;
  VideoWorker.providers = {
    Youtube: VideoWorkerYoutube,
    Vimeo: VideoWorkerVimeo,
    Local: VideoWorkerLocal
  };

  /**
   * Document ready callback.
   * @param {Function} callback - callback will be fired once Document ready.
   */
  function ready(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Already ready or interactive, execute callback
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback, {
        capture: true,
        once: true,
        passive: true
      });
    }
  }

  /* eslint-disable import/no-mutable-exports */
  /* eslint-disable no-restricted-globals */
  let win;
  if (typeof window !== 'undefined') {
    win = window;
  } else if (typeof global !== 'undefined') {
    win = global;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }
  var global$1 = win;

  function jarallaxVideo(jarallax = global$1.jarallax) {
    if (typeof jarallax === 'undefined') {
      return;
    }
    const Jarallax = jarallax.constructor;

    // append video after when block will be visible.
    const defOnScroll = Jarallax.prototype.onScroll;
    Jarallax.prototype.onScroll = function () {
      const self = this;
      defOnScroll.apply(self);
      const isReady = !self.isVideoInserted && self.video && (!self.options.videoLazyLoading || self.isElementInViewport) && !self.options.disableVideo();
      if (isReady) {
        self.isVideoInserted = true;
        self.video.getVideo(video => {
          const $parent = video.parentNode;
          self.css(video, {
            position: self.image.position,
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            maxHeight: 'none',
            pointerEvents: 'none',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            margin: 0,
            zIndex: -1
          });
          self.$video = video;

          // add Poster attribute to self-hosted video
          if (self.video.type === 'local') {
            if (self.image.src) {
              self.$video.setAttribute('poster', self.image.src);
            } else if (self.image.$item && self.image.$item.tagName === 'IMG' && self.image.$item.src) {
              self.$video.setAttribute('poster', self.image.$item.src);
            }
          }

          // add classname to video element
          if (self.options.videoClass) {
            self.$video.setAttribute('class', `${self.options.videoClass} ${self.options.videoClass}-${self.video.type}`);
          }

          // insert video tag
          self.image.$container.appendChild(video);

          // remove parent video element (created by VideoWorker)
          $parent.parentNode.removeChild($parent);

          // call onVideoInsert event
          if (self.options.onVideoInsert) {
            self.options.onVideoInsert.call(self);
          }
        });
      }
    };

    // cover video
    const defCoverImage = Jarallax.prototype.coverImage;
    Jarallax.prototype.coverImage = function () {
      const self = this;
      const imageData = defCoverImage.apply(self);
      const node = self.image.$item ? self.image.$item.nodeName : false;
      if (imageData && self.video && node && (node === 'IFRAME' || node === 'VIDEO')) {
        let h = imageData.image.height;
        let w = h * self.image.width / self.image.height;
        let ml = (imageData.container.width - w) / 2;
        let mt = imageData.image.marginTop;
        if (imageData.container.width > w) {
          w = imageData.container.width;
          h = w * self.image.height / self.image.width;
          ml = 0;
          mt += (imageData.image.height - h) / 2;
        }

        // add video height over than need to hide controls
        if (node === 'IFRAME') {
          h += 400;
          mt -= 200;
        }
        self.css(self.$video, {
          width: `${w}px`,
          marginLeft: `${ml}px`,
          height: `${h}px`,
          marginTop: `${mt}px`
        });
      }
      return imageData;
    };

    // init video
    const defInitImg = Jarallax.prototype.initImg;
    Jarallax.prototype.initImg = function () {
      const self = this;
      const defaultResult = defInitImg.apply(self);
      if (!self.options.videoSrc) {
        self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
      }
      if (self.options.videoSrc) {
        self.defaultInitImgResult = defaultResult;
        return true;
      }
      return defaultResult;
    };
    const defCanInitParallax = Jarallax.prototype.canInitParallax;
    Jarallax.prototype.canInitParallax = function () {
      const self = this;
      let defaultResult = defCanInitParallax.apply(self);
      if (!self.options.videoSrc) {
        return defaultResult;
      }

      // Init video api
      const video = new VideoWorker(self.options.videoSrc, {
        autoplay: true,
        loop: self.options.videoLoop,
        showControls: false,
        accessibilityHidden: true,
        startTime: self.options.videoStartTime || 0,
        endTime: self.options.videoEndTime || 0,
        mute: !self.options.videoVolume,
        volume: self.options.videoVolume || 0
      });

      // call onVideoWorkerInit event
      if (self.options.onVideoWorkerInit) {
        self.options.onVideoWorkerInit.call(self, video);
      }
      function resetDefaultImage() {
        if (self.image.$default_item) {
          self.image.$item = self.image.$default_item;
          self.image.$item.style.display = 'block';

          // set image width and height
          self.coverImage();
          self.onScroll();
        }
      }
      if (video.isValid()) {
        // Force enable parallax.
        // When the parallax disabled on mobile devices, we still need to display videos.
        // https://github.com/nk-o/jarallax/issues/159
        if (this.options.disableParallax()) {
          defaultResult = true;
          self.image.position = 'absolute';
          self.options.type = 'scroll';
          self.options.speed = 1;
        }

        // if parallax will not be inited, we can add thumbnail on background.
        if (!defaultResult) {
          if (!self.defaultInitImgResult) {
            video.getImageURL(url => {
              // save default user styles
              const curStyle = self.$item.getAttribute('style');
              if (curStyle) {
                self.$item.setAttribute('data-jarallax-original-styles', curStyle);
              }

              // set new background
              self.css(self.$item, {
                'background-image': `url("${url}")`,
                'background-position': 'center',
                'background-size': 'cover'
              });
            });
          }

          // init video
        } else {
          video.on('ready', () => {
            if (self.options.videoPlayOnlyVisible) {
              const oldOnScroll = self.onScroll;
              self.onScroll = function () {
                oldOnScroll.apply(self);
                if (!self.videoError && (self.options.videoLoop || !self.options.videoLoop && !self.videoEnded)) {
                  if (self.isVisible()) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }
              };
            } else {
              video.play();
            }
          });
          video.on('started', () => {
            self.image.$default_item = self.image.$item;
            self.image.$item = self.$video;

            // set video width and height
            self.image.width = self.video.videoWidth || 1280;
            self.image.height = self.video.videoHeight || 720;
            self.coverImage();
            self.onScroll();

            // hide image
            if (self.image.$default_item) {
              self.image.$default_item.style.display = 'none';
            }
          });
          video.on('ended', () => {
            self.videoEnded = true;
            if (!self.options.videoLoop) {
              // show default image if Loop disabled.
              resetDefaultImage();
            }
          });
          video.on('error', () => {
            self.videoError = true;

            // show default image if video loading error.
            resetDefaultImage();
          });
          self.video = video;

          // set image if not exists
          if (!self.defaultInitImgResult) {
            // set empty image on self-hosted video if not defined
            self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            if (video.type !== 'local') {
              video.getImageURL(url => {
                self.image.bgImage = `url("${url}")`;
                self.init();
              });
              return false;
            }
          }
        }
      }
      return defaultResult;
    };

    // Destroy video parallax
    const defDestroy = Jarallax.prototype.destroy;
    Jarallax.prototype.destroy = function () {
      const self = this;
      if (self.image.$default_item) {
        self.image.$item = self.image.$default_item;
        delete self.image.$default_item;
      }
      defDestroy.apply(self);
    };
  }

  jarallaxVideo();

  // data-jarallax-video initialization
  ready(() => {
    if (typeof global$1.jarallax !== 'undefined') {
      global$1.jarallax(document.querySelectorAll('[data-jarallax-video]'));
    }
  });

  // We should add VideoWorker globally, since some project uses it.
  if (!global$1.VideoWorker) {
    global$1.VideoWorker = VideoWorker;
  }

  return jarallaxVideo;

}));
//# sourceMappingURL=jarallax-video.js.map
