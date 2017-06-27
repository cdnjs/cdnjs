/**
 * @license Videogular v1.0.1 http://videogular.com
 * Two Fucking Developers http://twofuckingdevelopers.com
 * License: MIT
 */
"use strict";
angular.module("com.2fdevs.videogular", ["ngSanitize"])
  .run(
    ["$templateCache", function($templateCache) {
      $templateCache.put("vg-templates/vg-media-video", "<video></video>");
      $templateCache.put("vg-templates/vg-media-audio", "<audio></audio>");
    }]
  );

/**
 * @ngdoc service
 * @name com.2fdevs.videogular.constant:VG_STATES
 *
 * @description
 * Possible video states:
 *  - VG_STATES.PLAY: "play"
 *  - VG_STATES.PAUSE: "pause"
 *  - VG_STATES.STOP: "stop"
 **/
"use strict";
angular.module("com.2fdevs.videogular")
  .constant("VG_STATES", {
    PLAY: "play",
    PAUSE: "pause",
    STOP: "stop"
  });

"use strict";
/**
 * @ngdoc controller
 * @name com.2fdevs.videogular.controller:vgController
 * @description
 * Videogular controller.
 * This controller offers a public API:
 *
 * Methods
 * - play(): Plays media.
 * - pause(): Pause media.
 * - stop(): Stops media.
 * - playPause(): Toggles play and pause.
 * - seekTime(value, byPercent): Seeks to a specified time position. Param value must be an integer representing the target position in seconds or a percentage. By default seekTime seeks by seconds, if you want to seek by percentage just pass byPercent to true.
 * - setVolume(volume): Sets volume. Param volume must be an integer with a value between 0 and 1.
 * - toggleFullScreen(): Toggles between fullscreen and normal mode.
 * - updateTheme(css-url): Removes previous CSS theme and sets a new one.
 * - clearMedia(): Cleans the current media file.
 * - changeSource(array): Updates current media source. Param `array` must be an array of media source objects.
 * A media source is an object with two properties `src` and `type`. The `src` property must contains a trustful url resource.
 * {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}
 *
 * Properties
 * - config: String with a url to JSON config file.
 * - isReady: Boolean value with current player initialization state.
 * - isBuffering: Boolean value to know if player is buffering media.
 * - isCompleted: Boolean value to know if current media file has been completed.
 * - isLive: Boolean value to know if current media file is a Live Streaming.
 * - playsInline: Boolean value to know if Videogular if fullscreen mode will use native mode or inline playing.
 * - mediaElement: Reference to video/audio object.
 * - videogularElement: Reference to videogular tag.
 * - sources: Array with current sources.
 * - tracks: Array with current tracks.
 * - isFullScreen: Boolean value to know if we’re in fullscreen mode.
 * - currentState: String value with “play”, “pause” or “stop”.
 * - currentTime: Number value with current media time progress.
 * - totalTime: Number value with total media time.
 * - timeLeft: Number value with current media time left.
 * - volume: Number value with current volume between 0 and 1.
 *
 */
angular.module("com.2fdevs.videogular")
  .controller("vgController",
  ['$scope', '$window', 'vgConfigLoader', 'vgFullscreen', 'VG_UTILS', 'VG_STATES', function ($scope, $window, vgConfigLoader, vgFullscreen, VG_UTILS, VG_STATES) {
    var currentTheme = null;
    var isFullScreenPressed = false;
    var isMetaDataLoaded = false;

    // PUBLIC $API
    this.videogularElement = null;

    this.clearMedia = function () {
      $scope.API.mediaElement[0].src = '';
    };

    this.onCanPlay = function (evt) {
      $scope.API.isBuffering = false;
      $scope.$apply();
    };

    this.onVideoReady = function () {
      // Here we're in the video scope, we can't use 'this.'
      $scope.API.isReady = true;
      $scope.API.autoPlay = $scope.vgAutoPlay;
      $scope.API.playsInline = $scope.vgPlaysInline;
      $scope.API.currentState = VG_STATES.STOP;

      isMetaDataLoaded = true;

      if ($scope.vgConfig) {
        vgConfigLoader.loadConfig($scope.vgConfig).then(
          this.onLoadConfig.bind(this)
        );
      }
      else {
        $scope.vgPlayerReady({$API: $scope.API});
      }
    };

    this.onLoadConfig = function(config) {
      $scope.API.config = config;

      $scope.vgTheme = $scope.API.config.theme;
      $scope.vgAutoPlay = $scope.API.config.autoPlay;
      $scope.vgPlaysInline = $scope.API.config.playsInline;

      $scope.vgPlayerReady({$API: $scope.API});
    };

    this.onLoadMetaData = function (evt) {
      $scope.API.isBuffering = false;
      $scope.API.onUpdateTime(evt);
    };

    this.onUpdateTime = function (event) {
      $scope.API.currentTime = 1000 * event.target.currentTime;

      if (event.target.duration != Infinity) {
        $scope.API.totalTime = 1000 * event.target.duration;
        $scope.API.timeLeft = 1000 * (event.target.duration - event.target.currentTime);
        $scope.API.isLive = false;
      }
      else {
        // It's a live streaming without and end
        $scope.API.isLive = true;
      }

      $scope.vgUpdateTime({$currentTime: event.target.currentTime, $duration: event.target.duration});

      $scope.$apply();
    };

    this.onPlay = function () {
      $scope.API.setState(VG_STATES.PLAY);
      $scope.$apply();
    };

    this.onPause = function () {
      $scope.API.setState(VG_STATES.PAUSE);
      $scope.$apply();
    };

    this.onVolumeChange = function () {
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

      $scope.API.currentTime = 1000 * second;
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
        $scope.vgUpdateState({$state: newState});

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
      // There is no native full screen support or we want to play inline
      if (!vgFullscreen.isAvailable || $scope.vgPlaysInline) {
        if ($scope.API.isFullScreen) {
          $scope.API.videogularElement.removeClass("fullscreen");
          $scope.API.videogularElement.css("z-index", "auto");
        }
        else {
          $scope.API.videogularElement.addClass("fullscreen");
          $scope.API.videogularElement.css("z-index", VG_UTILS.getZIndex());
        }

        $scope.API.isFullScreen = !$scope.API.isFullScreen;
      }
      // Perform native full screen support
      else {
        if ($scope.API.isFullScreen) {
          if (!VG_UTILS.isMobileDevice()) {
            vgFullscreen.exit();
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
      vgFullscreen.request(element);
    };

    this.changeSource = function (newValue) {
      $scope.vgChangeSource({$source: newValue});
    };

    this.setVolume = function (newVolume) {
      $scope.vgUpdateVolume({$volume: newVolume});

      $scope.API.mediaElement[0].volume = newVolume;
      $scope.API.volume = newVolume;
    };

    this.updateTheme = function (value) {
      var links = document.getElementsByTagName("link");
      var i;
      var l;

      // Remove previous theme
      if (currentTheme) {
        for (i = 0, l = links.length; i < l; i++) {
          if (links[i].outerHTML.indexOf(currentTheme) >= 0) {
            links[i].parentNode.removeChild(links[i]);
          }
        }
      }

      if (value) {
        var headElem = angular.element(document).find("head");
        var exists = false;

        // Look if theme already exists
        for (i = 0, l = links.length; i < l; i++) {
          exists = (links[i].outerHTML.indexOf(value) >= 0);
          if (exists) break;
        }

        if (!exists) {
          headElem.append("<link rel='stylesheet' href='" + value + "'>");
        }

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
      $scope.vgComplete();

      $scope.API.setState(VG_STATES.STOP);
      $scope.API.isCompleted = true;
      $scope.$apply();
    };

    this.onVideoError = function (event) {
      $scope.vgError({$event: event});
    };

    this.addListeners = function () {
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
      $scope.API.currentTime = 0;
      $scope.API.totalTime = 0;
      $scope.API.timeLeft = 0;
      $scope.API.isLive = false;
      $scope.API.isConfig = ($scope.vgConfig != undefined);

      $scope.API.updateTheme($scope.vgTheme);
      $scope.addBindings();

      if (vgFullscreen.isAvailable) {
        document.addEventListener(vgFullscreen.onchange, $scope.onFullScreenChange);
      }
    };

    $scope.addBindings = function () {
      $scope.$watch("vgTheme", function (newValue, oldValue) {
        if (newValue != oldValue) {
          $scope.API.updateTheme(newValue);
        }
      });

      $scope.$watch("vgAutoPlay", function (newValue, oldValue) {
        if (newValue != oldValue) {
          if (newValue) $scope.API.play();
        }
      });

      $scope.$watch("vgPlaysInline", function (newValue, oldValue) {
        $scope.API.playsInline = $scope.vgPlaysInline;
      });
    };

    $scope.onFullScreenChange = function (event) {
      $scope.API.isFullScreen = vgFullscreen.isFullScreen();
      $scope.$apply();
    };

    // Empty mediaElement on destroy to avoid that Chrome downloads video even when it's not present
    $scope.$on('$destroy', this.clearMedia);

    // Empty mediaElement when router changes
    $scope.$on('$routeChangeStart', this.clearMedia);

    $scope.init();
  }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgLoop
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove loop in media files. Possible values are: "true" and "false"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
  .directive("vgLoop",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var loop;

          scope.setLoop = function setLoop(value) {
            if (value) {
              API.mediaElement.attr("loop", value);
            }
            else {
              API.mediaElement.removeAttr("loop");
            }
          };

          if (API.isConfig) {
            scope.$watch(
              function() {
                return API.config;
              },
              function() {
                if (API.config) {
                  scope.setLoop(API.config.loop);
                }
              }
            );
          }
          else {
            scope.$watch(attr.vgLoop, function (newValue, oldValue) {
              if ((!loop || newValue != oldValue) && newValue) {
                loop = newValue;
                scope.setLoop(loop);
              }
              else {
                scope.setLoop();
              }
            });
          }
        }
      }
    }
  }
  ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.direcitve:vgMedia
 * @restrict E
 * @description
 * Directive to add a source of videos or audios. This directive will create a &lt;video&gt; tag and usually will be above plugin tags.
 *
 * @param {array} vgSrc Bindable array with a list of media sources. A media source is an object with two properties `src` and `type`. The `src` property must contains a trusful url resource.
 * @param {string} vgType String with "video" or "audio" values to set a <video> or <audio> tag inside <vg-media>.
 * ```js
 * {
 *    src: $sce.trustAsResourceUrl("path/to/video/videogular.mp4"),
 *    type: "video/mp4"
 * }
 * ```
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
  .directive("vgMedia",
  ["$timeout", "VG_STATES", function ($timeout, VG_STATES) {
    return {
      restrict: "E",
      require: "^videogular",
      templateUrl: function(elem, attrs) {
        var vgType = attrs.vgType || "video";
        return attrs.vgTemplate || "vg-templates/vg-media-" + vgType;
      },
      scope: {
        vgSrc: "=?",
        vgType: "=?"
      },
      link: function (scope, elem, attrs, API) {
        var sources;

        // what type of media do we want? defaults to 'video'
        if (!attrs.vgType || attrs.vgType === "video") {
          attrs.vgType = "video";
        }
        else {
          attrs.vgType = "audio";
        }

        // FUNCTIONS
        scope.onChangeSource = function onChangeSource(newValue, oldValue) {
          if ((!sources || newValue != oldValue) && newValue) {
            sources = newValue;
            API.sources = sources;
            scope.changeSource();
          }
        };

        scope.changeSource = function changeSource() {
          var canPlay = "";

          // It's a cool browser
          if (API.mediaElement[0].canPlayType) {
            for (var i = 0, l = sources.length; i < l; i++) {
              canPlay = API.mediaElement[0].canPlayType(sources[i].type);

              if (canPlay == "maybe" || canPlay == "probably") {
                API.mediaElement.attr("src", sources[i].src);
                API.mediaElement.attr("type", sources[i].type);
                break;
              }
            }
          }
          // It's a crappy browser and it doesn't deserve any respect
          else {
            // Get H264 or the first one
            API.mediaElement.attr("src", sources[0].src);
            API.mediaElement.attr("type", sources[0].type);
          }

          $timeout(function() {
            if (API.autoPlay && !VG_UTILS.isMobileDevice() || API.currentState === VG_STATES.PLAY) API.play();
          });

          if (canPlay == "") {
            API.onVideoError();
          }
        };

        // INIT
        API.mediaElement = elem.find(attrs.vgType);
        API.sources = scope.vgSrc;

        API.addListeners();
        API.onVideoReady();

        scope.$watch("vgSrc", scope.onChangeSource);

        if (API.isConfig) {
          scope.$watch(
            function() {
              return API.config;
            },
            function() {
              if (API.config) {
                scope.vgSrc = API.config.sources;
              }
            }
          );
        }
      }
    }
  }
  ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgNativeControls
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove the native controls. Possible values are: "true" and "false"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
  .directive("vgNativeControls",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var controls;

          scope.setControls = function setControls(value) {
            if (value) {
              API.mediaElement.attr("controls", value);
            }
            else {
              API.mediaElement.removeAttr("controls");
            }
          };

          if (API.isConfig) {
            scope.$watch(
              function() {
                return API.config;
              },
              function() {
                if (API.config) {
                  scope.setControls(API.config.controls);
                }
              }
            );
          }
          else {
            scope.$watch(attr.vgNativeControls, function (newValue, oldValue) {
              if ((!controls || newValue != oldValue) && newValue) {
                controls = newValue;
                scope.setControls(controls);
              }
              else {
                scope.setControls();
              }
            });
          }
        }
      }
    }
  }
  ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgPreload
 * @restrict A
 * @description
 * Optional directive for `vg-media` to preload media files. Possible values are: "auto", "none" and "preload"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
  .directive("vgPreload",
  [function () {
    return {
      restrict: "A",
      require: "^videogular",
      link: {
        pre: function (scope, elem, attr, API) {
          var preload;

          scope.setPreload = function setPreload(value) {
            if (value) {
              API.mediaElement.attr("preload", value);
            }
            else {
              API.mediaElement.removeAttr("preload");
            }
          };

          if (API.isConfig) {
            scope.$watch(
              function() {
                return API.config;
              },
              function() {
                if (API.config) {
                  scope.setPreload(API.config.preload);
                }
              }
            );
          }
          else {
            scope.$watch(attr.vgPreload, function (newValue, oldValue) {
              if ((!preload || newValue != oldValue) && newValue) {
                preload = newValue;
                scope.setPreload(preload);
              }
              else {
                scope.setPreload();
              }
            });
          }
        }
      }
    }
  }
  ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgTracks
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add a list of tracks.
 *
 * vgTracks Bindable array with a list of subtitles sources. A track source is an object with five properties: src, kind, srclang, label and default.
 * ```js
 * {
 *    src: "assets/subs/pale-blue-dot.vtt",
 *    kind: "subtitles",
 *    srclang: "en",
 *    label: "English",
 *    default: "true/false"
 * }
 * ```
 */
"use strict";
angular.module("com.2fdevs.videogular")
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

          scope.changeSource = function changeSource() {
            // Remove previous tracks
            var oldTracks = API.mediaElement.children();

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
          };

          scope.setTracks = function setTracks(value) {
            // Add tracks to the API to have it available for other plugins (like controls)
            tracks = value;
            API.tracks = value;
            scope.changeSource();
          };

          if (API.isConfig) {
            scope.$watch(
              function() {
                return API.config;
              },
              function() {
                if (API.config) {
                  scope.setTracks(API.config.tracks);
                }
              }
            );
          }
          else {
            scope.$watch(attr.vgTracks, function (newValue, oldValue) {
              if ((!tracks || newValue != oldValue)) {
                scope.setTracks(newValue);
              }
            });
          }
        }
      }
    }
  }
  ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:videogular
 * @restrict E
 * @description
 * Main directive that must wrap a &lt;vg-media&gt; tag and all plugins.
 *
 * &lt;video&gt; tag usually will be above plugin tags, that's because plugins should be in a layer over the &lt;video&gt;.
 *
 * @param {string} vgTheme String with a scope name variable. This directive will inject a CSS link in the header of your page.
 * **This parameter is required.**
 *
 * @param {boolean} [vgAutoPlay=false] vgAutoPlay Boolean value or a String with a scope name variable to auto start playing video when it is initialized.
 *
 * **This parameter is disabled in mobile devices** because user must click on content to prevent consuming mobile data plans.
 *
 * @param {function} vgConfig String with a url to a config file. Config file's must be a JSON file object with the following structure:
 * ```js
{
  "controls": false,
  "loop": false,
  "autoplay": false,
  "preload": "auto",
  "theme": "path/to/videogular.css",
  "sources": [
    {
      "src": "path/to/videogular.mp4",
      "type": "video/mp4"
    },
    {
      "src": "path/to/videogular.webm",
      "type": "video/webm"
    },
    {
      "src": "path/to/videogular.ogg",
      "type": "video/ogg"
    }
  ],
  "tracks": [
    {
      "src": "path/to/pale-blue-dot.vtt",
      "kind": "subtitles",
      "srclang": "en",
      "label": "English",
      "default": ""
    }
  ],
  "plugins": {
    "controls": {
      "autohide": true,
      "autohideTime": 3000
    },
    "poster": {
      "url": "path/to/earth.png"
    },
    "ima-ads": {
      "companion": "companionAd",
      "companionSize": [728, 90],
      "network": "6062",
      "unitPath": "iab_vast_samples",
      "adTagUrl": "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F3510761%2FadRulesSampleTags&ciu_szs=160x600%2C300x250%2C728x90&cust_params=adrule%3Dpremidpostpodandbumpers&impl=s&gdfp_req=1&env=vp&ad_rule=1&vid=47570401&cmsid=481&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]",
      "skipButton": "<div class='skipButton'>skip ad</div>"
    },
    "analytics": {
      "category": "Videogular",
      "label": "Main",
      "events": {
        "ready": true,
        "play": true,
        "pause": true,
        "stop": true,
        "complete": true,
        "progress": 10
      }
    }
  }
}
 * ```
 * @param {function} vgComplete Function name in controller's scope to call when video have been completed.
 * @param {function} vgUpdateVolume Function name in controller's scope to call when volume changes. Receives a param with the new volume.
 * @param {function} vgUpdateTime Function name in controller's scope to call when video playback time is updated. Receives two params with current time and duration in milliseconds.
 * @param {function} vgUpdateState Function name in controller's scope to call when video state changes. Receives a param with the new state. Possible values are "play", "stop" or "pause".
 * @param {function} vgPlayerReady Function name in controller's scope to call when video have been initialized. Receives a param with the videogular API.
 * @param {function} vgChangeSource Function name in controller's scope to change current video source. Receives a param with the new video.
 * @param {function} vgPlaysInline Boolean to disable native fullscreen and plays video inline.
 * @param {function} vgError Function name in controller's scope to receive an error from video object. Receives a param with the error event.
 * This is a free parameter and it could be values like "new.mp4", "320" or "sd". This will allow you to use this to change a video or video quality.
 * This callback will not change the video, you should do that by updating your sources scope variable.
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
  .directive("videogular",
  [function () {
    return {
      restrict: "E",
      scope: {
        vgTheme: "=?",
        vgAutoPlay: "=?",
        vgPlaysInline: "=?",
        vgConfig: "@",
        vgComplete: "&",
        vgUpdateVolume: "&",
        vgUpdateTime: "&",
        vgUpdateState: "&",
        vgPlayerReady: "&",
        vgChangeSource: "&",
        vgError: "&"
      },
      controller: "vgController",
      link: {
        pre: function (scope, elem, attr, controller) {
          controller.videogularElement = angular.element(elem);
        }
      }
    }
  }
  ]);

/**
 * @ngdoc service
 * @name com.2fdevs.videogular.service:vgConfigLoader
 *
 * @description
 * Config loader service:
 *
 * vgConfigLoader.loadConfig(url): Param `url` is a url to a config JSON.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
  .service("vgConfigLoader", ["$http", "$q", "$sce", function($http, $q, $sce) {
    this.loadConfig = function loadConfig(url) {
      var deferred = $q.defer();

      $http({method: 'GET', url: url}).then(
        function success(response) {
          var result = response.data;

          for (var i=0, l=result.sources.length; i<l; i++) {
            result.sources[i].src = $sce.trustAsResourceUrl(result.sources[i].src);
          }

          deferred.resolve(result);
        },
        function reject() {
          deferred.reject();
        }
      );

      return deferred.promise;
    };
  }]);

/**
 * @ngdoc service
 * @name com.2fdevs.videogular.service:vgFullscreen
 *
 * @description
 * Native fullscreen polyfill service.
 *
 * vgFullscreen.onchange: String with the onchange event name.
 * vgFullscreen.onerror: String with the onerror event name.
 * vgFullscreen.isAvailable: Boolean with fullscreen availability.
 * vgFullscreen.isFullScreen: Boolean with current view mode.
 * vgFullscreen.exit: Exit fullscreen function.
 * vgFullscreen.request: Request for fullscreen access function.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
  .service("vgFullscreen", ["VG_UTILS", function (VG_UTILS) {
    // Native fullscreen polyfill
    var fsAPI;
    var polyfill = null;
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
        polyfill = APIs[browser];
        break;
      }
    }

    // Override APIs on iOS
    if (VG_UTILS.isiOSDevice()) {
      polyfill = APIs.ios;
    }

    function isFullScreen() {
      return (document[polyfill.element] != null);
    }

    this.onchange = polyfill.onchange;
    this.onerror = polyfill.onerror;
    this.isAvailable = (polyfill != null);
    this.isFullScreen = isFullScreen;
    this.exit = function () {
      document[polyfill.exit]();
    };
    this.request = function (elem) {
      elem[polyfill.request]();
    };
  }]);

"use strict";
angular.module("com.2fdevs.videogular")
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

      var tags = document.getElementsByTagName('*');

      for (var i=0, l=tags.length; i<l; i++) {
        if (tags[i].style.zIndex && parseInt(tags[i].style.zIndex) > zIndex) {
          zIndex = parseInt(tags[i].style.zIndex) + 1;
        }
      }

      return zIndex;
    };

    // Very simple mobile detection, not 100% reliable
    this.isMobileDevice = function () {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
    };

    this.isiOSDevice = function () {
      return (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
    };
  });
