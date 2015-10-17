/**
 * @license Videogular v0.7.1 http://videogular.com
 * Two Fucking Developers http://twofuckingdevelopers.com
 * License: MIT
 */
"use strict";
angular.module("com.2fdevs.videogular", ["ngSanitize"])
  .constant("VG_STATES", {
    PLAY: "play",
    PAUSE: "pause",
    STOP: "stop"
  })
  .service("VG_UTILS", function () {
    this.fixEventOffset = function ($event) {
      /**
       * There's no offsetX in Firefox, so we fix that.
       * Solution provided by Jack Moore in this post:
       * http://www.jacklmoore.com/notes/mouse-position/
       * @param $event
       * @returns {*}
       */
      if (navigator.userAgent.match(/Firefox/i)) {
        var style = $event.currentTarget.currentStyle || window.getComputedStyle($event.target, null);
        var borderLeftWidth = parseInt(style['borderLeftWidth'], 10);
        var borderTopWidth = parseInt(style['borderTopWidth'], 10);
        var rect = $event.currentTarget.getBoundingClientRect();
        var offsetX = $event.clientX - borderLeftWidth - rect.left;
        var offsetY = $event.clientY - borderTopWidth - rect.top;

        $event.offsetX = offsetX;
        $event.offsetY = offsetY;
      }

      return $event;
    };

    /**
     * Inspired by Paul Irish
     * https://gist.github.com/paulirish/211209
     * @returns {number}
     */
    this.getZIndex = function () {
      var zIndex = 1;

      angular.element('*')
        .filter(function () {
          return angular.element(this).css('zIndex') !== 'auto';
        })
        .each(function () {
          var thisZIndex = parseInt(angular.element(this).css('zIndex'));
          if (zIndex < thisZIndex) zIndex = thisZIndex + 1;
        });

      return zIndex;
    };

    this.toUTCDate = function(date){
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    };

    this.secondsToDate = function (seconds) {
      var result = new Date();
      result.setTime(seconds * 1000);

      result = this.toUTCDate(result);

      return result;
    };

    // Very simple mobile detection, not 100% reliable
    this.isMobileDevice = function () {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
    };

    this.isiOSDevice = function () {
      return (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
    };
  })
  .run(["$window", "VG_UTILS",
    function ($window, VG_UTILS) {
      // Native fullscreen polyfill
      var fullScreenAPI;
      var APIs = {
        w3: {
          enabled: "fullscreenEnabled",
          element: "fullscreenElement",
          request: "requestFullscreen",
          exit: "exitFullscreen",
          onchange: "fullscreenchange",
          onerror: "fullscreenerror"
        },
        newWebkit: {
          enabled: "webkitFullscreenEnabled",
          element: "webkitFullscreenElement",
          request: "webkitRequestFullscreen",
          exit: "webkitExitFullscreen",
          onchange: "webkitfullscreenchange",
          onerror: "webkitfullscreenerror"
        },
        oldWebkit: {
          enabled: "webkitIsFullScreen",
          element: "webkitCurrentFullScreenElement",
          request: "webkitRequestFullScreen",
          exit: "webkitCancelFullScreen",
          onchange: "webkitfullscreenchange",
          onerror: "webkitfullscreenerror"
        },
        moz: {
          enabled: "mozFullScreen",
          element: "mozFullScreenElement",
          request: "mozRequestFullScreen",
          exit: "mozCancelFullScreen",
          onchange: "mozfullscreenchange",
          onerror: "mozfullscreenerror"
        },
        ios: {
          enabled: "webkitFullscreenEnabled",
          element: "webkitFullscreenElement",
          request: "webkitEnterFullscreen",
          exit: "webkitExitFullscreen",
          onchange: "webkitfullscreenchange",
          onerror: "webkitfullscreenerror"
        },
        ms: {
          enabled: "msFullscreenEnabled",
          element: "msFullscreenElement",
          request: "msRequestFullscreen",
          exit: "msExitFullscreen",
          onchange: "msfullscreenchange",
          onerror: "msfullscreenerror"
        }
      };

      for (var browser in APIs) {
        if (APIs[browser].enabled in document) {
          fullScreenAPI = APIs[browser];
          fullScreenAPI.isFullScreen = function () {
            return (document[this.element] != null);
          };

          break;
        }
      }

      // Override APIs on iOS
      if (VG_UTILS.isiOSDevice()) {
        fullScreenAPI = APIs.ios;
        fullScreenAPI.isFullScreen = function () {
          return (document[this.element] != null);
        };
      }

      angular.element($window)[0].fullScreenAPI = fullScreenAPI;
    }
  ])
/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.videogular
 * @restrict E
 * @description
 * Main directive that must wrap a &lt;vg-video&gt; or &lt;vg-audio&gt; tag and all plugins.
 *
 * &lt;video&gt; tag usually will be above plugin tags, that's because plugins should be in a layer over the &lt;video&gt;.
 *
 * @param {string} vgTheme String with a scope name variable. This directive will inject a CSS link in the header of your page.
 * **This parameter is required.**
 *
 * @param {boolean} [vgAutoplay=false] vgAutoplay Boolean value or a String with a scope name variable to auto start playing video when it is initialized.
 *
 * **This parameter is disabled in mobile devices** because user must click on content to prevent consuming mobile data plans.
 *
 * @param {function} vgComplete Function name in controller's scope to call when video have been completed.
 * @param {function} vgUpdateVolume Function name in controller's scope to call when volume changes. Receives a param with the new volume.
 * @param {function} vgUpdateTime Function name in controller's scope to call when video playback time is updated. Receives two params with current time and duration in milliseconds.
 * @param {function} vgUpdateState Function name in controller's scope to call when video state changes. Receives a param with the new state. Possible values are "play", "stop" or "pause".
 * @param {function} vgPlayerReady Function name in controller's scope to call when video have been initialized. Receives a param with the videogular API.
 * @param {function} vgChangeSource Function name in controller's scope to change current video source. Receives a param with the new video.
 * @param {function} vgError Function name in controller's scope to receive an error from video object. Receives a param with the error event.
 * This is a free parameter and it could be values like "new.mp4", "320" or "sd". This will allow you to use this to change a video or video quality.
 * This callback will not change the video, you should do that by updating your sources scope variable.
 *
 */
  .directive(
  "videogular",
  ["$window", "VG_STATES", "VG_UTILS", function ($window, VG_STATES, VG_UTILS) {
    return {
      restrict: "E",
      scope: {
        theme: "=vgTheme",
        autoPlay: "=vgAutoplay",
        vgComplete: "&",
        vgUpdateVolume: "&",
        vgUpdateTime: "&",
        vgUpdateState: "&",
        vgPlayerReady: "&",
        vgChangeSource: "&",
        vgError: "&"
      },
      controller: ['$scope', '$timeout', function ($scope, $timeout) {
        var currentTheme = null;
        var isFullScreenPressed = false;
        var isMetaDataLoaded = false;

        var vgCompleteCallBack = $scope.vgComplete();
        var vgUpdateVolumeCallBack = $scope.vgUpdateVolume();
        var vgUpdateTimeCallBack = $scope.vgUpdateTime();
        var vgUpdateStateCallBack = $scope.vgUpdateState();
        var vgPlayerReadyCallBack = $scope.vgPlayerReady();
        var vgChangeSourceCallBack = $scope.vgChangeSource();
        var vgError = $scope.vgError();

        // PUBLIC $API
        this.videogularElement = null;

        this.clearMedia = function () {
          $scope.API.mediaElement[0].src = '';
        };

        this.onCanPlay = function(evt) {
          $scope.API.isBuffering = false;
          $scope.$apply();
        };

        this.onVideoReady = function () {
          // Here we're in the video scope, we can't use 'this.'
          $scope.API.isReady = true;
          $scope.API.autoPlay = $scope.autoPlay;
          $scope.API.currentState = VG_STATES.STOP;

          isMetaDataLoaded = true;

          if ($scope.vgPlayerReady()) {
            vgPlayerReadyCallBack = $scope.vgPlayerReady();
            vgPlayerReadyCallBack($scope.API);
          }

          if ($scope.autoPlay && !VG_UTILS.isMobileDevice() || $scope.API.currentState === VG_STATES.PLAY) {
            $timeout(function () {
              $scope.API.play();
            });
          }
        };

        this.onLoadMetaData = function(evt) {
          $scope.API.isBuffering = false;
          $scope.API.onUpdateTime(evt);
        };

        this.onUpdateTime = function (event) {
          $scope.API.currentTime = VG_UTILS.secondsToDate(event.target.currentTime);

          if (event.target.duration != Infinity) {
            $scope.API.totalTime = VG_UTILS.secondsToDate(event.target.duration);
            $scope.API.timeLeft = VG_UTILS.secondsToDate(event.target.duration - event.target.currentTime);
            $scope.API.isLive = false;
          }
          else {
            // It's a live streaming without and end
            $scope.API.isLive = true;
          }

          if ($scope.vgUpdateTime()) {
            vgUpdateTimeCallBack = $scope.vgUpdateTime();
            vgUpdateTimeCallBack(event.target.currentTime, event.target.duration);
          }

          $scope.$apply();
        };

        this.onPlay = function() {
          $scope.API.setState(VG_STATES.PLAY);
          $scope.$apply();
        };

        this.onPause = function() {
          $scope.API.setState(VG_STATES.PAUSE);
          $scope.$apply();
        };

        this.onVolumeChange = function() {
          $scope.API.volume = $scope.API.mediaElement[0].volume;
          $scope.$apply();
        };

        this.seekTime = function (value, byPercent) {
          var second;
          if (byPercent) {
            second = value * $scope.API.mediaElement[0].duration / 100;
            $scope.API.mediaElement[0].currentTime = second;
          }
          else {
            second = value;
            $scope.API.mediaElement[0].currentTime = second;
          }

          $scope.API.currentTime = VG_UTILS.secondsToDate(second);
        };

        this.playPause = function () {
          if ($scope.API.mediaElement[0].paused) {
            this.play();
          }
          else {
            this.pause();
          }
        };

        this.setState = function (newState) {
          if (newState && newState != $scope.API.currentState) {
            if ($scope.vgUpdateState()) {
              vgUpdateStateCallBack = $scope.vgUpdateState();
              vgUpdateStateCallBack(newState);
            }

            $scope.API.currentState = newState;
          }

          return $scope.API.currentState;
        };

        this.play = function () {
          $scope.API.mediaElement[0].play();
          this.setState(VG_STATES.PLAY);
        };

        this.pause = function () {
          $scope.API.mediaElement[0].pause();
          this.setState(VG_STATES.PAUSE);
        };

        this.stop = function () {
          $scope.API.mediaElement[0].pause();
          $scope.API.mediaElement[0].currentTime = 0;
          this.setState(VG_STATES.STOP);
        };

        this.toggleFullScreen = function () {
          // There is no native full screen support
          if (!angular.element($window)[0].fullScreenAPI) {
            if ($scope.API.isFullScreen) {
              $scope.API.videogularElement.removeClass("fullscreen");
              $scope.API.videogularElement.css("z-index", 0);
            }
            else {
              $scope.API.videogularElement.addClass("fullscreen");
              $scope.API.videogularElement.css("z-index", VG_UTILS.getZIndex());
            }

            $scope.API.isFullScreen = !$scope.API.isFullScreen;
          }
          // Perform native full screen support
          else {
            if (angular.element($window)[0].fullScreenAPI.isFullScreen()) {
              if (!VG_UTILS.isMobileDevice()) {
                document[angular.element($window)[0].fullScreenAPI.exit]();
              }
            }
            else {
              // On mobile devices we should make fullscreen only the video object
              if (VG_UTILS.isMobileDevice()) {
                // On iOS we should check if user pressed before fullscreen button
                // and also if metadata is loaded
                if (VG_UTILS.isiOSDevice()) {
                  if (isMetaDataLoaded) {
                    this.enterElementInFullScreen($scope.API.mediaElement[0]);
                  }
                  else {
                    isFullScreenPressed = true;
                    this.play();
                  }
                }
                else {
                  this.enterElementInFullScreen($scope.API.mediaElement[0]);
                }
              }
              else {
                this.enterElementInFullScreen($scope.API.videogularElement[0]);
              }
            }
          }
        };

        this.enterElementInFullScreen = function (element) {
          element[angular.element($window)[0].fullScreenAPI.request]();
        };

        this.changeSource = function (newValue) {
          if ($scope.vgChangeSource()) {
            vgChangeSourceCallBack = $scope.vgChangeSource();
            vgChangeSourceCallBack(newValue);
          }
        };

        this.setVolume = function (newVolume) {
          if ($scope.vgUpdateVolume()) {
            vgUpdateVolumeCallBack = $scope.vgUpdateVolume();
            vgUpdateVolumeCallBack(newVolume);
          }

          $scope.API.mediaElement[0].volume = newVolume;
          $scope.API.volume = newVolume;
        };

        this.updateTheme = function (value) {
          if (currentTheme) {
            // Remove previous theme
            var links = document.getElementsByTagName("link");
            for (var i = 0, l = links.length; i < l; i++) {
              if (links[i].outerHTML.indexOf(currentTheme) >= 0) {
                links[i].parentNode.removeChild(links[i]);
              }
            }
          }

          if (value) {
            var headElem = angular.element(document).find("head");
            headElem.append("<link rel='stylesheet' href='" + value + "'>");

            currentTheme = value;
          }
        };

        this.onStartBuffering = function (event) {
          $scope.API.isBuffering = true;
          $scope.$apply();
        };

        this.onStartPlaying = function (event) {
          $scope.API.isBuffering = false;
          $scope.$apply();
        };

        this.onComplete = function (event) {
          if ($scope.vgComplete()) {
            vgCompleteCallBack = $scope.vgComplete();
            vgCompleteCallBack();
          }

          $scope.API.setState(VG_STATES.STOP);
          $scope.API.isCompleted = true;
          $scope.$apply();
        };

        this.onVideoError = function (event) {
          if ($scope.vgError()) {
            vgError = $scope.vgError();
            vgError(event);
          }
        };

        this.addListeners = function() {
          $scope.API.mediaElement[0].addEventListener("canplay", $scope.API.onCanPlay, false);
          $scope.API.mediaElement[0].addEventListener("loadedmetadata", $scope.API.onLoadMetaData, false);
          $scope.API.mediaElement[0].addEventListener("waiting", $scope.API.onStartBuffering, false);
          $scope.API.mediaElement[0].addEventListener("ended", $scope.API.onComplete, false);
          $scope.API.mediaElement[0].addEventListener("playing", $scope.API.onStartPlaying, false);
          $scope.API.mediaElement[0].addEventListener("play", $scope.API.onPlay, false);
          $scope.API.mediaElement[0].addEventListener("pause", $scope.API.onPause, false);
          $scope.API.mediaElement[0].addEventListener("volumechange", $scope.API.onVolumeChange, false);
          $scope.API.mediaElement[0].addEventListener("timeupdate", $scope.API.onUpdateTime, false);
          $scope.API.mediaElement[0].addEventListener("error", $scope.API.onVideoError, false);
        };

        // FUNCTIONS NOT AVAILABLE THROUGH API
        $scope.API = this;

        $scope.init = function () {
          $scope.API.isReady = false;
          $scope.API.isCompleted = false;
          $scope.API.currentTime = VG_UTILS.secondsToDate(0);
          $scope.API.totalTime = VG_UTILS.secondsToDate(0);
          $scope.API.timeLeft = VG_UTILS.secondsToDate(0);
          $scope.API.isLive = false;

          $scope.API.updateTheme($scope.theme);
          $scope.addBindings();

          if (angular.element($window)[0].fullScreenAPI) {
            document.addEventListener(angular.element($window)[0].fullScreenAPI.onchange, $scope.onFullScreenChange);
          }
        };

        $scope.addBindings = function () {
          $scope.$watch("theme", function (newValue, oldValue) {
            if (newValue != oldValue) {
              $scope.API.updateTheme(newValue);
            }
          });

          $scope.$watch("autoPlay", function (newValue, oldValue) {
            if (newValue != oldValue) {
              if (newValue) $scope.API.play();
            }
          });
        };

        $scope.onFullScreenChange = function (event) {
          $scope.API.isFullScreen = angular.element($window)[0].fullScreenAPI.isFullScreen();
          $scope.$apply();
        };

        // Empty mediaElement on destroy to avoid that Chrome downloads video even when it's not present
        $scope.$on('$destroy', this.clearMedia);

        // Empty mediaElement when router changes
        $scope.$on('$routeChangeStart', this.clearMedia);

        $scope.init();
      }],
      link: {
        pre: function (scope, elem, attr, controller) {
          controller.videogularElement = angular.element(elem);
        }
      }
    }
  }
  ])
/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.vgVideo
 * @restrict E
 * @description
 * Directive to add a source of videos. This directive will create a &lt;video&gt; tag and usually will be above plugin tags.
 *
 * @param {array} vgSrc Bindable array with a list of video sources. A video source is an object with two properties `src` and `type`. The `src` property must contains a trusful url resource.
 * {src: $sce.trustAsResourceUrl("https://dl.dropboxusercontent.com/u/7359898/video/videogular.mp4"), type: "video/mp4"}
 * **This parameter is required.**
 *
 * @param {boolean} [vgLoop=false] vgLoop Boolean value or scope variable name to auto start playing video when it is initialized.
 * @param {string} [vgPreload=false] vgPreload String value or scope variable name to set how to preload the video. **This parameter is disabled in mobile devices** because user must click on content to start data preload.
 * @param {boolean} [vgNativeControls=false] vgNativeControls String value or scope variable name to set native controls visible.
 * @param {array} [vgTracks=false] vgTracks Bindable array with a list of subtitles sources. A track source is an object with five properties: `src`, `kind`, `srclang`, `label` and `default`.
 * {src: "assets/subs/pale-blue-dot.vtt", kind: "subtitles", srclang: "en", label: "English", default: "true/false"}
 *
 */
  .directive("vgVideo",
  ["$compile", "VG_UTILS", function ($compile, VG_UTILS) {
    return {
      restrict: "E",
      require: "^videogular",
      scope: {
        vgSrc: "=",
        vgLoop: "=",
        vgPreload: "=",
        vgNativeControls: "=",
        vgTracks: "="
      },
      link: function (scope, elem, attr, API) {
        var videoTagText = '<video vg-source="vgSrc" ';

        videoTagText += '></video>';

        API.sources = scope.vgSrc;
        API.mediaElement = angular.element(videoTagText);
        var compiled = $compile(API.mediaElement)(scope);

        API.addListeners();

        elem.append(compiled);

        API.onVideoReady();
      }
    }
  }
  ])
/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.vgAudio
 * @restrict E
 * @description
 * Directive to add a source of audios. This directive will create a &lt;audio&gt; tag and usually will be above plugin tags.
 *
 * @param {array} vgSrc Bindable array with a list of audio sources. A video source is an object with two properties `src` and `type`. The `src` property must contains a trusful url resource.
 * {src: $sce.trustAsResourceUrl("https://dl.dropboxusercontent.com/u/7359898/audio/videogular.mp3"), type: "video/mp4"}
 * **This parameter is required.**
 *
 * @param {boolean} [vgLoop=false] vgLoop Boolean value or scope variable name to auto start playing audio when it is initialized.
 * @param {string} [vgPreload=false] vgPreload String value or scope variable name to set how to preload the video. **This parameter is disabled in mobile devices** because user must click on content to start data preload.
 * @param {boolean} [vgNativeControls=false] vgNativeControls String value or scope variable name to set native controls visible.
 * @param {array} [vgTracks=false] vgTracks Bindable array with a list of subtitles sources. A track source is an object with five properties: `src`, `kind`, `srclang`, `label` and `default`.
 * {src: "assets/subs/pale-blue-dot.vtt", kind: "subtitles", srclang: "en", label: "English", default: "true/false"}
 *
 */
  .directive("vgAudio",
  ["$compile", "VG_UTILS", function ($compile, VG_UTILS) {
    return {
      restrict: "E",
      require: "^videogular",
      scope: {
        vgSrc: "=",
        vgLoop: "=",
        vgPreload: "=",
        vgNativeControls: "=",
        vgTracks: "="
      },
      link: function (scope, elem, attr, API) {
        var audioTagText = '<audio vg-source="vgSrc" ';

        audioTagText += '></audio>';

        API.sources = scope.vgSrc;
        API.mediaElement = angular.element(audioTagText);
        var compiled = $compile(API.mediaElement)(scope);

        API.addListeners();

        elem.append(compiled);

        API.onVideoReady();
      }
    }
  }
  ])
  .directive("vgSource",
  [function () {
    return {
      restrict: "A",
      link: {
        pre: function (scope, elem, attr) {
          var sources;
          var canPlay;

          function changeSource() {
            canPlay = "";

            // It's a cool browser
            if (elem[0].canPlayType) {
              for (var i = 0, l = sources.length; i < l; i++) {
                canPlay = elem[0].canPlayType(sources[i].type);

                if (canPlay == "maybe" || canPlay == "probably") {
                  elem.attr("src", sources[i].src);
                  elem.attr("type", sources[i].type);
                  break;
                }
              }
            }
            // It's a crappy browser and it doesn't deserve any respect
            else {
              // Get H264 or the first one
              elem.attr("src", sources[0].src);
              elem.attr("type", sources[0].type);
            }

            if (canPlay == "") {
              // Throw error
            }
          }

          scope.$watch(attr.vgSource, function (newValue, oldValue) {
            if ((!sources || newValue != oldValue) && newValue) {
              sources = newValue;
              changeSource();
            }
          });
        }
      }
    }
  }
  ])
  .directive("vgTracks",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var tracks;
          var trackText;
          var i;
          var l;

          function changeSource() {
            // Remove previous tracks
            var oldTracks = API.mediaElement.children();
            var i;
            var l;

            for (i = 0, l = oldTracks.length; i < l; i++) {
              oldTracks[i].remove();
            }

            // Add new tracks
            if (tracks) {
              for (i = 0, l = tracks.length; i < l; i++) {
                trackText = "";
                trackText += '<track ';

                // Add track properties
                for (var prop in tracks[i]) {
                  trackText += prop + '="' + tracks[i][prop] + '" ';
                }

                trackText += '></track>';

                API.mediaElement.append(trackText);
              }
            }
          }

          scope.$watch(attr.vgTracks, function (newValue, oldValue) {
            if ((!tracks || newValue != oldValue)) {
              tracks = newValue;

              // Add tracks to the API to have it available for other plugins (like controls)
              API.tracks = tracks;
              changeSource();
            }
          });
        }
      }
    }
  }
  ])
  .directive("vgLoop",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var loop;

          scope.$watch(attr.vgLoop, function (newValue, oldValue) {
            if ((!loop || newValue != oldValue) && newValue) {
              loop = newValue;
              API.mediaElement.attr("loop", loop);
            }
            else {
              API.mediaElement.removeAttr("loop");
            }
          });
        }
      }
    }
  }
  ])
  .directive("vgPreload",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var preload;

          scope.$watch(attr.vgPreload, function (newValue, oldValue) {
            if ((!preload || newValue != oldValue) && newValue) {
              preload = newValue;
              API.mediaElement.attr("preload", preload);
            }
            else {
              API.mediaElement.removeAttr("preload");
            }
          });
        }
      }
    }
  }
  ])
  .directive("vgNativeControls",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var controls;

          scope.$watch(attr.vgNativeControls, function (newValue, oldValue) {
            if ((!controls || newValue != oldValue) && newValue) {
              controls = newValue;
              API.mediaElement.attr("controls", "");
            }
            else {
              API.mediaElement.removeAttr("controls");
            }
          });
        }
      }
    }
  }
  ]);
