/*!
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.1
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = function (callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready or interactive, execute callback
    callback.call();
  } else if (document.attachEvent) {
    // Old browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') callback.call();
    });
  } else if (document.addEventListener) {
    // Modern browsers
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/***/ }),
/* 2 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
  win = __webpack_require__.g;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

module.exports = win;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VideoWorker; }
/* harmony export */ });
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Deferred
// thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery

function Deferred() {
  this.doneCallbacks = [];
  this.failCallbacks = [];
}

Deferred.prototype = {
  execute: function execute(list, args) {
    var i = list.length;
    args = Array.prototype.slice.call(args);

    while (i) {
      i -= 1;
      list[i].apply(null, args);
    }
  },
  resolve: function resolve() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.execute(this.doneCallbacks, args);
  },
  reject: function reject() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.execute(this.failCallbacks, args);
  },
  done: function done(callback) {
    this.doneCallbacks.push(callback);
  },
  fail: function fail(callback) {
    this.failCallbacks.push(callback);
  }
};
var ID = 0;
var YoutubeAPIadded = 0;
var VimeoAPIadded = 0;
var loadingYoutubePlayer = 0;
var loadingVimeoPlayer = 0;
var loadingYoutubeDefer = new Deferred();
var loadingVimeoDefer = new Deferred();

var VideoWorker = /*#__PURE__*/function () {
  function VideoWorker(url, options) {
    _classCallCheck(this, VideoWorker);

    var self = this;
    self.url = url;
    self.options_default = {
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
    self.options = self.extend({}, self.options_default, options); // Fix wrong option name.
    // Thanks to https://github.com/nk-o/video-worker/issues/13.

    if ('undefined' !== typeof self.options.showContols) {
      self.options.showControls = self.options.showContols;
      delete self.options.showContols;
    } // check URL


    self.videoID = self.parseURL(url); // init

    if (self.videoID) {
      self.ID = ID;
      ID += 1;
      self.loadAPI();
      self.init();
    }
  } // Extend like jQuery.extend
  // eslint-disable-next-line class-methods-use-this


  _createClass(VideoWorker, [{
    key: "extend",
    value: function extend() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var out = args[0] || {};
      Object.keys(args).forEach(function (i) {
        if (!args[i]) {
          return;
        }

        Object.keys(args[i]).forEach(function (key) {
          out[key] = args[i][key];
        });
      });
      return out;
    }
  }, {
    key: "parseURL",
    value: function parseURL(url) {
      // parse youtube ID
      function getYoutubeID(ytUrl) {
        // eslint-disable-next-line no-useless-escape
        var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        var match = ytUrl.match(regExp);
        return match && 11 === match[1].length ? match[1] : false;
      } // parse vimeo ID


      function getVimeoID(vmUrl) {
        // eslint-disable-next-line no-useless-escape
        var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
        var match = vmUrl.match(regExp);
        return match && match[3] ? match[3] : false;
      } // parse local string


      function getLocalVideos(locUrl) {
        // eslint-disable-next-line no-useless-escape
        var videoFormats = locUrl.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
        var result = {};
        var ready = 0;
        videoFormats.forEach(function (val) {
          // eslint-disable-next-line no-useless-escape
          var match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);

          if (match && match[1] && match[2]) {
            // eslint-disable-next-line prefer-destructuring
            result['ogv' === match[1] ? 'ogg' : match[1]] = match[2];
            ready = 1;
          }
        });
        return ready ? result : false;
      }

      var Youtube = getYoutubeID(url);
      var Vimeo = getVimeoID(url);
      var Local = getLocalVideos(url);

      if (Youtube) {
        this.type = 'youtube';
        return Youtube;
      }

      if (Vimeo) {
        this.type = 'vimeo';
        return Vimeo;
      }

      if (Local) {
        this.type = 'local';
        return Local;
      }

      return false;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return !!this.videoID;
    } // events

  }, {
    key: "on",
    value: function on(name, callback) {
      this.userEventsList = this.userEventsList || []; // add new callback in events list

      (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      var _this = this;

      if (!this.userEventsList || !this.userEventsList[name]) {
        return;
      }

      if (!callback) {
        delete this.userEventsList[name];
      } else {
        this.userEventsList[name].forEach(function (val, key) {
          if (val === callback) {
            _this.userEventsList[name][key] = false;
          }
        });
      }
    }
  }, {
    key: "fire",
    value: function fire(name) {
      var _this2 = this;

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      if (this.userEventsList && 'undefined' !== typeof this.userEventsList[name]) {
        this.userEventsList[name].forEach(function (val) {
          // call with all arguments
          if (val) {
            val.apply(_this2, args);
          }
        });
      }
    }
  }, {
    key: "play",
    value: function play(start) {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.playVideo) {
        if ('undefined' !== typeof start) {
          self.player.seekTo(start || 0);
        }

        if ((global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.PLAYING) !== self.player.getPlayerState()) {
          self.player.playVideo();
        }
      }

      if ('vimeo' === self.type) {
        if ('undefined' !== typeof start) {
          self.player.setCurrentTime(start);
        }

        self.player.getPaused().then(function (paused) {
          if (paused) {
            self.player.play();
          }
        });
      }

      if ('local' === self.type) {
        if ('undefined' !== typeof start) {
          self.player.currentTime = start;
        }

        if (self.player.paused) {
          self.player.play();
        }
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.pauseVideo) {
        if ((global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.PLAYING) === self.player.getPlayerState()) {
          self.player.pauseVideo();
        }
      }

      if ('vimeo' === self.type) {
        self.player.getPaused().then(function (paused) {
          if (!paused) {
            self.player.pause();
          }
        });
      }

      if ('local' === self.type) {
        if (!self.player.paused) {
          self.player.pause();
        }
      }
    }
  }, {
    key: "mute",
    value: function mute() {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.mute) {
        self.player.mute();
      }

      if ('vimeo' === self.type && self.player.setVolume) {
        self.player.setVolume(0);
      }

      if ('local' === self.type) {
        self.$video.muted = true;
      }
    }
  }, {
    key: "unmute",
    value: function unmute() {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.mute) {
        self.player.unMute();
      }

      if ('vimeo' === self.type && self.player.setVolume) {
        self.player.setVolume(self.options.volume);
      }

      if ('local' === self.type) {
        self.$video.muted = false;
      }
    }
  }, {
    key: "setVolume",
    value: function setVolume() {
      var volume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var self = this;

      if (!self.player || !volume) {
        return;
      }

      if ('youtube' === self.type && self.player.setVolume) {
        self.player.setVolume(volume);
      }

      if ('vimeo' === self.type && self.player.setVolume) {
        self.player.setVolume(volume);
      }

      if ('local' === self.type) {
        self.$video.volume = volume / 100;
      }
    }
  }, {
    key: "getVolume",
    value: function getVolume(callback) {
      var self = this;

      if (!self.player) {
        callback(false);
        return;
      }

      if ('youtube' === self.type && self.player.getVolume) {
        callback(self.player.getVolume());
      }

      if ('vimeo' === self.type && self.player.getVolume) {
        self.player.getVolume().then(function (volume) {
          callback(volume);
        });
      }

      if ('local' === self.type) {
        callback(self.$video.volume * 100);
      }
    }
  }, {
    key: "getMuted",
    value: function getMuted(callback) {
      var self = this;

      if (!self.player) {
        callback(null);
        return;
      }

      if ('youtube' === self.type && self.player.isMuted) {
        callback(self.player.isMuted());
      }

      if ('vimeo' === self.type && self.player.getVolume) {
        self.player.getVolume().then(function (volume) {
          callback(!!volume);
        });
      }

      if ('local' === self.type) {
        callback(self.$video.muted);
      }
    }
  }, {
    key: "getImageURL",
    value: function getImageURL(callback) {
      var self = this;

      if (self.videoImage) {
        callback(self.videoImage);
        return;
      }

      if ('youtube' === self.type) {
        var availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
        var step = 0;
        var tempImg = new Image();

        tempImg.onload = function () {
          // if no thumbnail, youtube add their own image with width = 120px
          if (120 !== (this.naturalWidth || this.width) || step === availableSizes.length - 1) {
            // ok
            self.videoImage = "https://img.youtube.com/vi/".concat(self.videoID, "/").concat(availableSizes[step], ".jpg");
            callback(self.videoImage);
          } else {
            // try another size
            step += 1;
            this.src = "https://img.youtube.com/vi/".concat(self.videoID, "/").concat(availableSizes[step], ".jpg");
          }
        };

        tempImg.src = "https://img.youtube.com/vi/".concat(self.videoID, "/").concat(availableSizes[step], ".jpg");
      }

      if ('vimeo' === self.type) {
        var request = new XMLHttpRequest();
        request.open('GET', "https://vimeo.com/api/v2/video/".concat(self.videoID, ".json"), true);

        request.onreadystatechange = function () {
          if (4 === this.readyState) {
            if (200 <= this.status && 400 > this.status) {
              // Success!
              var response = JSON.parse(this.responseText);
              self.videoImage = response[0].thumbnail_large;
              callback(self.videoImage);
            } else {// Error :(
            }
          }
        };

        request.send();
        request = null;
      }
    } // fallback to the old version.

  }, {
    key: "getIframe",
    value: function getIframe(callback) {
      this.getVideo(callback);
    }
  }, {
    key: "getVideo",
    value: function getVideo(callback) {
      var self = this; // return generated video block

      if (self.$video) {
        callback(self.$video);
        return;
      } // generate new video block


      self.onAPIready(function () {
        var hiddenDiv;

        if (!self.$video) {
          hiddenDiv = document.createElement('div');
          hiddenDiv.style.display = 'none';
        } // Youtube


        if ('youtube' === self.type) {
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
          }; // hide controls

          if (!self.options.showControls) {
            self.playerOptions.playerVars.iv_load_policy = 3;
            self.playerOptions.playerVars.modestbranding = 1;
            self.playerOptions.playerVars.controls = 0;
            self.playerOptions.playerVars.showinfo = 0;
            self.playerOptions.playerVars.disablekb = 1;
          } // events


          var ytStarted;
          var ytProgressInterval;
          self.playerOptions.events = {
            onReady: function onReady(e) {
              // mute
              if (self.options.mute) {
                e.target.mute();
              } else if (self.options.volume) {
                e.target.setVolume(self.options.volume);
              } // autoplay


              if (self.options.autoplay) {
                self.play(self.options.startTime);
              }

              self.fire('ready', e); // For seamless loops, set the endTime to 0.1 seconds less than the video's duration
              // https://github.com/nk-o/video-worker/issues/2

              if (self.options.loop && !self.options.endTime) {
                var secondsOffset = 0.1;
                self.options.endTime = self.player.getDuration() - secondsOffset;
              } // volumechange


              setInterval(function () {
                self.getVolume(function (volume) {
                  if (self.options.volume !== volume) {
                    self.options.volume = volume;
                    self.fire('volumechange', e);
                  }
                });
              }, 150);
            },
            onStateChange: function onStateChange(e) {
              // loop
              if (self.options.loop && e.data === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.ENDED)) {
                self.play(self.options.startTime);
              }

              if (!ytStarted && e.data === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.PLAYING)) {
                ytStarted = 1;
                self.fire('started', e);
              }

              if (e.data === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.PLAYING)) {
                self.fire('play', e);
              }

              if (e.data === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.PAUSED)) {
                self.fire('pause', e);
              }

              if (e.data === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.ENDED)) {
                self.fire('ended', e);
              } // progress check


              if (e.data === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.PlayerState.PLAYING)) {
                ytProgressInterval = setInterval(function () {
                  self.fire('timeupdate', e); // check for end of video and play again or stop

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
            onError: function onError(e) {
              self.fire('error', e);
            }
          };
          var firstInit = !self.$video;

          if (firstInit) {
            var div = document.createElement('div');
            div.setAttribute('id', self.playerID);
            hiddenDiv.appendChild(div);
            document.body.appendChild(hiddenDiv);
          }

          self.player = self.player || new (global__WEBPACK_IMPORTED_MODULE_0___default().YT.Player)(self.playerID, self.playerOptions);

          if (firstInit) {
            self.$video = document.getElementById(self.playerID); // add accessibility attributes

            if (self.options.accessibilityHidden) {
              self.$video.setAttribute('tabindex', '-1');
              self.$video.setAttribute('aria-hidden', 'true');
            } // get video width and height


            self.videoWidth = parseInt(self.$video.getAttribute('width'), 10) || 1280;
            self.videoHeight = parseInt(self.$video.getAttribute('height'), 10) || 720;
          }
        } // Vimeo


        if ('vimeo' === self.type) {
          self.playerOptions = {
            // GDPR Compliance.
            dnt: 1,
            id: self.videoID,
            autopause: 0,
            transparent: 0,
            autoplay: self.options.autoplay ? 1 : 0,
            loop: self.options.loop ? 1 : 0,
            muted: self.options.mute ? 1 : 0
          };

          if (self.options.volume) {
            self.playerOptions.volume = self.options.volume;
          } // hide controls


          if (!self.options.showControls) {
            self.playerOptions.badge = 0;
            self.playerOptions.byline = 0;
            self.playerOptions.portrait = 0;
            self.playerOptions.title = 0;
            self.playerOptions.background = 1;
          }

          if (!self.$video) {
            var playerOptionsString = '';
            Object.keys(self.playerOptions).forEach(function (key) {
              if ('' !== playerOptionsString) {
                playerOptionsString += '&';
              }

              playerOptionsString += "".concat(key, "=").concat(encodeURIComponent(self.playerOptions[key]));
            }); // we need to create iframe manually because when we create it using API
            // js events won't triggers after iframe moved to another place

            self.$video = document.createElement('iframe');
            self.$video.setAttribute('id', self.playerID);
            self.$video.setAttribute('src', "https://player.vimeo.com/video/".concat(self.videoID, "?").concat(playerOptionsString));
            self.$video.setAttribute('frameborder', '0');
            self.$video.setAttribute('mozallowfullscreen', '');
            self.$video.setAttribute('allowfullscreen', '');
            self.$video.setAttribute('title', 'Vimeo video player'); // add accessibility attributes

            if (self.options.accessibilityHidden) {
              self.$video.setAttribute('tabindex', '-1');
              self.$video.setAttribute('aria-hidden', 'true');
            }

            hiddenDiv.appendChild(self.$video);
            document.body.appendChild(hiddenDiv);
          }

          self.player = self.player || new (global__WEBPACK_IMPORTED_MODULE_0___default().Vimeo.Player)(self.$video, self.playerOptions); // set current time for autoplay

          if (self.options.startTime && self.options.autoplay) {
            self.player.setCurrentTime(self.options.startTime);
          } // get video width and height


          self.player.getVideoWidth().then(function (width) {
            self.videoWidth = width || 1280;
          });
          self.player.getVideoHeight().then(function (height) {
            self.videoHeight = height || 720;
          }); // events

          var vmStarted;
          self.player.on('timeupdate', function (e) {
            if (!vmStarted) {
              self.fire('started', e);
              vmStarted = 1;
            }

            self.fire('timeupdate', e); // check for end of video and play again or stop

            if (self.options.endTime) {
              if (self.options.endTime && e.seconds >= self.options.endTime) {
                if (self.options.loop) {
                  self.play(self.options.startTime);
                } else {
                  self.pause();
                }
              }
            }
          });
          self.player.on('play', function (e) {
            self.fire('play', e); // check for the start time and start with it

            if (self.options.startTime && 0 === e.seconds) {
              self.play(self.options.startTime);
            }
          });
          self.player.on('pause', function (e) {
            self.fire('pause', e);
          });
          self.player.on('ended', function (e) {
            self.fire('ended', e);
          });
          self.player.on('loaded', function (e) {
            self.fire('ready', e);
          });
          self.player.on('volumechange', function (e) {
            self.fire('volumechange', e);
          });
          self.player.on('error', function (e) {
            self.fire('error', e);
          });
        } // Local


        function addSourceToLocal(element, src, type) {
          var source = document.createElement('source');
          source.src = src;
          source.type = type;
          element.appendChild(source);
        }

        if ('local' === self.type) {
          if (!self.$video) {
            self.$video = document.createElement('video'); // show controls

            if (self.options.showControls) {
              self.$video.controls = true;
            } // mute


            if (self.options.mute) {
              self.$video.muted = true;
            } else if (self.$video.volume) {
              self.$video.volume = self.options.volume / 100;
            } // loop


            if (self.options.loop) {
              self.$video.loop = true;
            } // autoplay enable on mobile devices


            self.$video.setAttribute('playsinline', '');
            self.$video.setAttribute('webkit-playsinline', ''); // add accessibility attributes

            if (self.options.accessibilityHidden) {
              self.$video.setAttribute('tabindex', '-1');
              self.$video.setAttribute('aria-hidden', 'true');
            }

            self.$video.setAttribute('id', self.playerID);
            hiddenDiv.appendChild(self.$video);
            document.body.appendChild(hiddenDiv);
            Object.keys(self.videoID).forEach(function (key) {
              addSourceToLocal(self.$video, self.videoID[key], "video/".concat(key));
            });
          }

          self.player = self.player || self.$video;
          var locStarted;
          self.player.addEventListener('playing', function (e) {
            if (!locStarted) {
              self.fire('started', e);
            }

            locStarted = 1;
          });
          self.player.addEventListener('timeupdate', function (e) {
            self.fire('timeupdate', e); // check for end of video and play again or stop

            if (self.options.endTime) {
              if (self.options.endTime && this.currentTime >= self.options.endTime) {
                if (self.options.loop) {
                  self.play(self.options.startTime);
                } else {
                  self.pause();
                }
              }
            }
          });
          self.player.addEventListener('play', function (e) {
            self.fire('play', e);
          });
          self.player.addEventListener('pause', function (e) {
            self.fire('pause', e);
          });
          self.player.addEventListener('ended', function (e) {
            self.fire('ended', e);
          });
          self.player.addEventListener('loadedmetadata', function () {
            // get video width and height
            self.videoWidth = this.videoWidth || 1280;
            self.videoHeight = this.videoHeight || 720;
            self.fire('ready'); // autoplay

            if (self.options.autoplay) {
              self.play(self.options.startTime);
            }
          });
          self.player.addEventListener('volumechange', function (e) {
            self.getVolume(function (volume) {
              self.options.volume = volume;
            });
            self.fire('volumechange', e);
          });
          self.player.addEventListener('error', function (e) {
            self.fire('error', e);
          });
        }

        callback(self.$video);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      self.playerID = "VideoWorker-".concat(self.ID);
    }
  }, {
    key: "loadAPI",
    value: function loadAPI() {
      var self = this;

      if (YoutubeAPIadded && VimeoAPIadded) {
        return;
      }

      var src = ''; // load Youtube API

      if ('youtube' === self.type && !YoutubeAPIadded) {
        YoutubeAPIadded = 1;
        src = 'https://www.youtube.com/iframe_api';
      } // load Vimeo API


      if ('vimeo' === self.type && !VimeoAPIadded) {
        VimeoAPIadded = 1; // Useful when Vimeo API added using RequireJS https://github.com/nk-o/video-worker/pull/7

        if ('undefined' !== typeof (global__WEBPACK_IMPORTED_MODULE_0___default().Vimeo)) {
          return;
        }

        src = 'https://player.vimeo.com/api/player.js';
      }

      if (!src) {
        return;
      } // add script in head section


      var tag = document.createElement('script');
      var head = document.getElementsByTagName('head')[0];
      tag.src = src;
      head.appendChild(tag);
      head = null;
      tag = null;
    }
  }, {
    key: "onAPIready",
    value: function onAPIready(callback) {
      var self = this; // Youtube

      if ('youtube' === self.type) {
        // Listen for global YT player callback
        if (('undefined' === typeof (global__WEBPACK_IMPORTED_MODULE_0___default().YT) || 0 === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.loaded)) && !loadingYoutubePlayer) {
          // Prevents Ready event from being called twice
          loadingYoutubePlayer = 1; // Creates deferred so, other players know when to wait.

          window.onYouTubeIframeAPIReady = function () {
            window.onYouTubeIframeAPIReady = null;
            loadingYoutubeDefer.resolve('done');
            callback();
          };
        } else if ('object' === _typeof((global__WEBPACK_IMPORTED_MODULE_0___default().YT)) && 1 === (global__WEBPACK_IMPORTED_MODULE_0___default().YT.loaded)) {
          callback();
        } else {
          loadingYoutubeDefer.done(function () {
            callback();
          });
        }
      } // Vimeo


      if ('vimeo' === self.type) {
        if ('undefined' === typeof (global__WEBPACK_IMPORTED_MODULE_0___default().Vimeo) && !loadingVimeoPlayer) {
          loadingVimeoPlayer = 1;
          var vimeoInterval = setInterval(function () {
            if ('undefined' !== typeof (global__WEBPACK_IMPORTED_MODULE_0___default().Vimeo)) {
              clearInterval(vimeoInterval);
              loadingVimeoDefer.resolve('done');
              callback();
            }
          }, 20);
        } else if ('undefined' !== typeof (global__WEBPACK_IMPORTED_MODULE_0___default().Vimeo)) {
          callback();
        } else {
          loadingVimeoDefer.done(function () {
            callback();
          });
        }
      } // Local


      if ('local' === self.type) {
        callback();
      }
    }
  }]);

  return VideoWorker;
}();



/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ jarallaxVideo; }
/* harmony export */ });
/* harmony import */ var video_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);


function jarallaxVideo() {
  var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (global__WEBPACK_IMPORTED_MODULE_1___default().jarallax);

  if ('undefined' === typeof jarallax) {
    return;
  }

  var Jarallax = jarallax.constructor; // append video after when block will be visible.

  var defOnScroll = Jarallax.prototype.onScroll;

  Jarallax.prototype.onScroll = function () {
    var self = this;
    defOnScroll.apply(self);
    var isReady = !self.isVideoInserted && self.video && (!self.options.videoLazyLoading || self.isElementInViewport) && !self.options.disableVideo();

    if (isReady) {
      self.isVideoInserted = true;
      self.video.getVideo(function (video) {
        var $parent = video.parentNode;
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
          willChange: 'transform,opacity',
          margin: 0,
          zIndex: -1
        });
        self.$video = video; // add Poster attribute to self-hosted video

        if ('local' === self.video.type) {
          if (self.image.src) {
            self.$video.setAttribute('poster', self.image.src);
          } else if (self.image.$item && 'IMG' === self.image.$item.tagName && self.image.$item.src) {
            self.$video.setAttribute('poster', self.image.$item.src);
          }
        } // insert video tag


        self.image.$container.appendChild(video); // remove parent video element (created by VideoWorker)

        $parent.parentNode.removeChild($parent);
      });
    }
  }; // cover video


  var defCoverImage = Jarallax.prototype.coverImage;

  Jarallax.prototype.coverImage = function () {
    var self = this;
    var imageData = defCoverImage.apply(self);
    var node = self.image.$item ? self.image.$item.nodeName : false;

    if (imageData && self.video && node && ('IFRAME' === node || 'VIDEO' === node)) {
      var h = imageData.image.height;
      var w = h * self.image.width / self.image.height;
      var ml = (imageData.container.width - w) / 2;
      var mt = imageData.image.marginTop;

      if (imageData.container.width > w) {
        w = imageData.container.width;
        h = w * self.image.height / self.image.width;
        ml = 0;
        mt += (imageData.image.height - h) / 2;
      } // add video height over than need to hide controls


      if ('IFRAME' === node) {
        h += 400;
        mt -= 200;
      }

      self.css(self.$video, {
        width: "".concat(w, "px"),
        marginLeft: "".concat(ml, "px"),
        height: "".concat(h, "px"),
        marginTop: "".concat(mt, "px")
      });
    }

    return imageData;
  }; // init video


  var defInitImg = Jarallax.prototype.initImg;

  Jarallax.prototype.initImg = function () {
    var self = this;
    var defaultResult = defInitImg.apply(self);

    if (!self.options.videoSrc) {
      self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
    }

    if (self.options.videoSrc) {
      self.defaultInitImgResult = defaultResult;
      return true;
    }

    return defaultResult;
  };

  var defCanInitParallax = Jarallax.prototype.canInitParallax;

  Jarallax.prototype.canInitParallax = function () {
    var self = this;
    var defaultResult = defCanInitParallax.apply(self);

    if (!self.options.videoSrc) {
      return defaultResult;
    } // Init video api


    var video = new video_worker__WEBPACK_IMPORTED_MODULE_0__["default"](self.options.videoSrc, {
      autoplay: true,
      loop: self.options.videoLoop,
      showControls: false,
      accessibilityHidden: true,
      startTime: self.options.videoStartTime || 0,
      endTime: self.options.videoEndTime || 0,
      mute: self.options.videoVolume ? 0 : 1,
      volume: self.options.videoVolume || 0
    });

    function resetDefaultImage() {
      if (self.image.$default_item) {
        self.image.$item = self.image.$default_item;
        self.image.$item.style.display = 'block'; // set image width and height

        self.coverImage();
        self.clipContainer();
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
      } // if parallax will not be inited, we can add thumbnail on background.


      if (!defaultResult) {
        if (!self.defaultInitImgResult) {
          video.getImageURL(function (url) {
            // save default user styles
            var curStyle = self.$item.getAttribute('style');

            if (curStyle) {
              self.$item.setAttribute('data-jarallax-original-styles', curStyle);
            } // set new background


            self.css(self.$item, {
              'background-image': "url(\"".concat(url, "\")"),
              'background-position': 'center',
              'background-size': 'cover'
            });
          });
        } // init video

      } else {
        video.on('ready', function () {
          if (self.options.videoPlayOnlyVisible) {
            var oldOnScroll = self.onScroll;

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
        video.on('started', function () {
          self.image.$default_item = self.image.$item;
          self.image.$item = self.$video; // set video width and height

          self.image.width = self.video.videoWidth || 1280;
          self.image.height = self.video.videoHeight || 720;
          self.coverImage();
          self.clipContainer();
          self.onScroll(); // hide image

          if (self.image.$default_item) {
            self.image.$default_item.style.display = 'none';
          }
        });
        video.on('ended', function () {
          self.videoEnded = true;

          if (!self.options.videoLoop) {
            // show default image if Loop disabled.
            resetDefaultImage();
          }
        });
        video.on('error', function () {
          self.videoError = true; // show default image if video loading error.

          resetDefaultImage();
        });
        self.video = video; // set image if not exists

        if (!self.defaultInitImgResult) {
          // set empty image on self-hosted video if not defined
          self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

          if ('local' !== video.type) {
            video.getImageURL(function (url) {
              self.image.bgImage = "url(\"".concat(url, "\")");
              self.init();
            });
            return false;
          }
        }
      }
    }

    return defaultResult;
  }; // Destroy video parallax


  var defDestroy = Jarallax.prototype.destroy;

  Jarallax.prototype.destroy = function () {
    var self = this;

    if (self.image.$default_item) {
      self.image.$item = self.image.$default_item;
      delete self.image.$default_item;
    }

    defDestroy.apply(self);
  };
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jarallax_video_esm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);



 // add video worker globally to fallback jarallax < 1.10 versions

(global__WEBPACK_IMPORTED_MODULE_1___default().VideoWorker) = (global__WEBPACK_IMPORTED_MODULE_1___default().VideoWorker) || video_worker__WEBPACK_IMPORTED_MODULE_0__["default"];
(0,_jarallax_video_esm__WEBPACK_IMPORTED_MODULE_3__["default"])(); // data-jarallax-video initialization

lite_ready__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  if ('undefined' !== typeof (global__WEBPACK_IMPORTED_MODULE_1___default().jarallax)) {
    global__WEBPACK_IMPORTED_MODULE_1___default().jarallax(document.querySelectorAll('[data-jarallax-video]'));
  }
});
}();
/******/ })()
;