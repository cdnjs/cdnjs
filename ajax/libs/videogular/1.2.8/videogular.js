/**
 * @license videogular v1.2.8 http://videogular.com
 * Two Fucking Developers http://twofuckingdevelopers.com
 * License: MIT
 */
"use strict";
angular.module("com.2fdevs.videogular", ["ngSanitize"])
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-media-video", "<video></video>");
        $templateCache.put("vg-templates/vg-media-audio", "<audio></audio>");

        // Support for browsers that doesn't have .bind()
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== 'function') {
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {
                    },
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP
                                ? this
                                : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }
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
/**
 * @ngdoc service
 * @name com.2fdevs.videogular.constant:VG_VOLUME_KEY
 *
 * @description localStorage key name for persistent video play volume on a domain.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
    .constant("VG_STATES", {
        PLAY: "play",
        PAUSE: "pause",
        STOP: "stop"
    })
    .constant("VG_VOLUME_KEY", "videogularVolume");

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
 * - setPlayback(playback): Sets playback. Param plaback must be an integer with a value between 0 and 2.
 * - setState(state): Sets a new state. Param state mus be an string with 'play', 'pause' or 'stop'. This method only changes the state of the player, but doesn't plays, pauses or stops the media file.
 * - toggleFullScreen(): Toggles between fullscreen and normal mode.
 * - updateTheme(css-url): Removes previous CSS theme and sets a new one.
 * - clearMedia(): Cleans the current media file.
 * - changeSource(array): Updates current media source. Param `array` must be an array of media source objects.
 * A media source is an object with two properties `src` and `type`. The `src` property must contains a trustful url resource.
 * <pre>{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}</pre>
 *
 * Properties
 * - config: String with a url to JSON config file.
 * - isReady: Boolean value with current player initialization state.
 * - isBuffering: Boolean value to know if player is buffering media.
 * - isCompleted: Boolean value to know if current media file has been completed.
 * - isLive: Boolean value to know if current media file is a Live Streaming.
 * - playsInline: Boolean value to know if Videogular is using inline playing or not.
 * - nativeFullscreen: Boolean value to know if Videogular if fullscreen mode will use native mode or emulated mode.
 * - mediaElement: Reference to video/audio object.
 * - videogularElement: Reference to videogular tag.
 * - sources: Array with current sources.
 * - tracks: Array with current tracks.
 * - cuePoints: Object containing a list of timelines with cue points. Each property in the object represents a timeline, which is an Array of objects with the next definition:
 * <pre>{
 *    timeLapse:{
 *      start: 0,
 *      end: 10
 *    },
 *    onEnter: callback(currentTime, timeLapse, params),
 *    onLeave: callback(currentTime, timeLapse, params),
 *    onUpdate: callback(currentTime, timeLapse, params),
 *    onComplete: callback(currentTime, timeLapse, params),
 *    params: {
 *      // Custom object with desired structure and data
 *    }
 * }</pre>
 *
 *    * **timeLapse:** Object with start and end properties to define in seconds when this timeline is active.\n
 *    * **onEnter:** Callback function that will be called when progress reaches a cue point or being outside a cue point user seeks to a cue point manually.
 *    * **onLeave:** Callback function that will be called when user seeks and the new time doesn't reach to the timeLapse.start property.
 *    * **onUpdate:** Callback function that will be called when the progress is in the middle of timeLapse.start and timeLapse.end.
 *    * **onComplete:** Callback function that will be called when the progress is bigger than timeLapse.end.
 *    * **params:** Custom object with data to pass to the callbacks.
 *
 * - isFullScreen: Boolean value to know if we’re in fullscreen mode.
 * - currentState: String value with “play”, “pause” or “stop”.
 * - currentTime: Number value with current media time progress.
 * - totalTime: Number value with total media time.
 * - timeLeft: Number value with current media time left.
 * - volume: Number value with current volume between 0 and 1.
 * - playback: Number value with current playback between 0 and 2.
 *
 */
angular.module("com.2fdevs.videogular")
    .controller("vgController",
    ['$scope', '$window', 'vgConfigLoader', 'vgFullscreen', 'VG_UTILS', 'VG_STATES', 'VG_VOLUME_KEY', function ($scope, $window, vgConfigLoader, vgFullscreen, VG_UTILS, VG_STATES, VG_VOLUME_KEY) {
        var currentTheme = null;
        var isFullScreenPressed = false;
        var isMetaDataLoaded = false;

        // PUBLIC $API
        this.videogularElement = null;

        this.clearMedia = function () {
            this.mediaElement[0].src = '';
        };

        this.onRouteChange = function() {
            if (this.clearMediaOnNavigate === undefined || this.clearMediaOnNavigate === true) {
                this.clearMedia();
            }
        };

        this.onCanPlay = function (evt) {
            this.isBuffering = false;
            $scope.$apply($scope.vgCanPlay({$event: evt}));
        };

        this.onVideoReady = function () {
            this.isReady = true;
            this.autoPlay = $scope.vgAutoPlay;
            this.playsInline = $scope.vgPlaysInline;
            this.nativeFullscreen = $scope.vgNativeFullscreen || true;
            this.cuePoints = $scope.vgCuePoints;
            this.clearMediaOnNavigate = $scope.vgClearMediaOnNavigate || true;
            this.currentState = VG_STATES.STOP;

            isMetaDataLoaded = true;

            //Set media volume from localStorage if available
            if (VG_UTILS.supportsLocalStorage()) {
                //Default to 100% volume if local storage setting does not exist.
                this.setVolume(parseFloat($window.localStorage.getItem(VG_VOLUME_KEY) || '1'));
            }

            if ($scope.vgConfig) {
                vgConfigLoader.loadConfig($scope.vgConfig).then(
                    this.onLoadConfig.bind(this)
                );
            }
            else {
                $scope.vgPlayerReady({$API: this});
            }
        };

        this.onLoadConfig = function (config) {
            this.config = config;

            $scope.vgTheme = this.config.theme;
            $scope.vgAutoPlay = this.config.autoPlay;
            $scope.vgPlaysInline = this.config.playsInline;
            $scope.vgNativeFullscreen = this.config.nativeFullscreen;
            $scope.vgCuePoints = this.config.cuePoints;
            $scope.vgClearMediaOnNavigate = this.config.clearMediaOnNavigate;

            $scope.vgPlayerReady({$API: this});
        };

        this.onLoadMetaData = function (evt) {
            this.isBuffering = false;
            this.onUpdateTime(evt);
        };

        this.onUpdateTime = function (event) {
            this.currentTime = 1000 * event.target.currentTime;

            if (event.target.duration != Infinity) {
                this.totalTime = 1000 * event.target.duration;
                this.timeLeft = 1000 * (event.target.duration - event.target.currentTime);
                this.isLive = false;
            }
            else {
                // It's a live streaming without and end
                this.isLive = true;
            }

            if (this.cuePoints) {
                this.checkCuePoints(event.target.currentTime);
            }

            $scope.vgUpdateTime({$currentTime: event.target.currentTime, $duration: event.target.duration});

            $scope.$apply();
        };

        this.checkCuePoints = function checkCuePoints(currentTime) {
            for (var tl in this.cuePoints) {
                for (var i = 0, l = this.cuePoints[tl].length; i < l; i++) {
                    var cp = this.cuePoints[tl][i];
                    var currentSecond = parseInt(currentTime, 10);
                    var start = parseInt(cp.timeLapse.start, 10);

                    // If timeLapse.end is not defined we set it as 1 second length
                    if (!cp.timeLapse.end) cp.timeLapse.end = cp.timeLapse.start + 1;

                    if (currentTime < cp.timeLapse.end) cp.$$isCompleted = false;

                    // Fire the onEnter event once reach to the cue point
                    if(!cp.$$isDirty && currentSecond === start && (typeof cp.onEnter == 'function')) {
                        cp.onEnter(currentTime, cp.timeLapse, cp.params);
                        cp.$$isDirty = true;
                    }

                    // Check if we've been reached to the cue point
                    if (currentTime > cp.timeLapse.start) {
                        // We're in the timelapse
                        if (currentTime < cp.timeLapse.end) {
                            // Trigger onUpdate each time we enter here
                            if (cp.onUpdate) cp.onUpdate(currentTime, cp.timeLapse, cp.params);

                            // Trigger onEnter if we enter on the cue point by manually seeking
                            if (!cp.$$isDirty && (typeof cp.onEnter === 'function')) {
                                cp.onEnter(currentTime, cp.timeLapse, cp.params);
                            }

                            cp.$$isDirty = true;
                        }

                        // We've been passed the cue point
                        if (currentTime >= cp.timeLapse.end) {
                            if (cp.onComplete && !cp.$$isCompleted) {
                                cp.$$isCompleted = true;
                                cp.onComplete(currentTime, cp.timeLapse, cp.params);
                            }

                            cp.$$isDirty = false;
                        }
                    }
                    else {
                        if (cp.onLeave && cp.$$isDirty) {
                            cp.onLeave(currentTime, cp.timeLapse, cp.params);
                        }

                        cp.$$isDirty = false;
                    }
                }
            }
        };

        this.onPlay = function () {
            this.setState(VG_STATES.PLAY);
            $scope.$apply();
        };

        this.onPause = function () {
            if (this.mediaElement[0].currentTime == 0) {
                this.setState(VG_STATES.STOP);
            }
            else {
                this.setState(VG_STATES.PAUSE);
            }

            $scope.$apply();
        };

        this.onVolumeChange = function () {
            this.volume = this.mediaElement[0].volume;
            $scope.$apply();
        };

        this.onPlaybackChange = function () {
            this.playback = this.mediaElement[0].playbackRate;
            $scope.$apply();
        };

        this.onSeeking = function (event) {
            $scope.vgSeeking({$currentTime: event.target.currentTime, $duration: event.target.duration});
        };

        this.onSeeked = function (event) {
            $scope.vgSeeked({$currentTime: event.target.currentTime, $duration: event.target.duration});
        };

        this.seekTime = function (value, byPercent) {
            var second;
            if (byPercent) {
                second = value * this.mediaElement[0].duration / 100;
                this.mediaElement[0].currentTime = second;
            }
            else {
                second = value;
                this.mediaElement[0].currentTime = second;
            }

            this.currentTime = 1000 * second;
        };

        this.playPause = function () {
            if (this.mediaElement[0].paused) {
                this.play();
            }
            else {
                this.pause();
            }
        };

        this.setState = function (newState) {
            if (newState && newState != this.currentState) {
                $scope.vgUpdateState({$state: newState});

                this.currentState = newState;
            }

            return this.currentState;
        };

        this.play = function () {
            this.mediaElement[0].play();
            this.setState(VG_STATES.PLAY);
        };

        this.pause = function () {
            this.mediaElement[0].pause();
            this.setState(VG_STATES.PAUSE);
        };

        this.stop = function () {
            try {
                this.mediaElement[0].pause();
                this.mediaElement[0].currentTime = 0;

                this.currentTime = 0;
                this.setState(VG_STATES.STOP);
            }
            catch (e) {
                return e;
            }
        };

        this.toggleFullScreen = function () {
            // There is no native full screen support or we want to play inline
            if (!vgFullscreen.isAvailable || !this.nativeFullscreen) {
                if (this.isFullScreen) {
                    this.videogularElement.removeClass("fullscreen");
                    this.videogularElement.css("z-index", "auto");
                }
                else {
                    this.videogularElement.addClass("fullscreen");
                    this.videogularElement.css("z-index", VG_UTILS.getZIndex());
                }

                this.isFullScreen = !this.isFullScreen;
            }
            // Perform native full screen support
            else {
                if (this.isFullScreen) {
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
                                this.enterElementInFullScreen(this.mediaElement[0]);
                            }
                            else {
                                isFullScreenPressed = true;
                                this.play();
                            }
                        }
                        else {
                            this.enterElementInFullScreen(this.mediaElement[0]);
                        }
                    }
                    else {
                        this.enterElementInFullScreen(this.videogularElement[0]);
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
            newVolume = Math.max(Math.min(newVolume, 1), 0);
            $scope.vgUpdateVolume({$volume: newVolume});

            this.mediaElement[0].volume = newVolume;
            this.volume = newVolume;

            //Push volume updates to localStorage so that future instances resume volume
            if (VG_UTILS.supportsLocalStorage()) {
                //TODO: Improvement: concat key with current page or "video player id" to create separate stored volumes.
                $window.localStorage.setItem(VG_VOLUME_KEY, newVolume.toString());
            }
        };

        this.setPlayback = function (newPlayback) {
            $scope.vgUpdatePlayback({$playBack: newPlayback});

            this.mediaElement[0].playbackRate = newPlayback;
            this.playback = newPlayback;
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
                        break;
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
            this.isBuffering = true;
            $scope.$apply();
        };

        this.onStartPlaying = function (event) {
            this.isBuffering = false;
            $scope.$apply();
        };

        this.onComplete = function (event) {
            $scope.vgComplete();

            this.setState(VG_STATES.STOP);
            this.isCompleted = true;
            $scope.$apply();
        };

        this.onVideoError = function (event) {
            $scope.vgError({$event: event});
        };

        this.addListeners = function () {
            this.mediaElement[0].addEventListener("canplay", this.onCanPlay.bind(this), false);
            this.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            this.mediaElement[0].addEventListener("waiting", this.onStartBuffering.bind(this), false);
            this.mediaElement[0].addEventListener("ended", this.onComplete.bind(this), false);
            this.mediaElement[0].addEventListener("playing", this.onStartPlaying.bind(this), false);
            this.mediaElement[0].addEventListener("play", this.onPlay.bind(this), false);
            this.mediaElement[0].addEventListener("pause", this.onPause.bind(this), false);
            this.mediaElement[0].addEventListener("volumechange", this.onVolumeChange.bind(this), false);
            this.mediaElement[0].addEventListener("playbackchange", this.onPlaybackChange.bind(this), false);
            this.mediaElement[0].addEventListener("timeupdate", this.onUpdateTime.bind(this), false);
            this.mediaElement[0].addEventListener("seeking", this.onSeeking.bind(this), false);
            this.mediaElement[0].addEventListener("seeked", this.onSeeked.bind(this), false);
            this.mediaElement[0].addEventListener("error", this.onVideoError.bind(this), false);
        };

        this.init = function () {
            this.isReady = false;
            this.isCompleted = false;
            this.currentTime = 0;
            this.totalTime = 0;
            this.timeLeft = 0;
            this.isLive = false;
            this.isFullScreen = false;
            this.playback = 1;
            this.isConfig = ($scope.vgConfig != undefined);

            if (vgFullscreen.isAvailable) {
                this.isFullScreen = vgFullscreen.isFullScreen();
            }

            this.updateTheme($scope.vgTheme);
            this.addBindings();

            if (vgFullscreen.isAvailable) {
                document.addEventListener(vgFullscreen.onchange, this.onFullScreenChange.bind(this));
            }
        };

        this.onUpdateTheme = function onUpdateTheme(newValue) {
            this.updateTheme(newValue);
        };

        this.onUpdateAutoPlay = function onUpdateAutoPlay(newValue) {
            if (newValue && !this.autoPlay) {
                this.autoPlay = newValue;
                this.play(this);
            }
        };

        this.onUpdatePlaysInline = function onUpdatePlaysInline(newValue) {
            this.playsInline = newValue;
        };

        this.onUpdateNativeFullscreen = function onUpdateNativeFullscreen(newValue) {
            if (newValue == undefined) newValue = true;

            this.nativeFullscreen = newValue;
        };

        this.onUpdateCuePoints = function onUpdateCuePoints(newValue) {
            this.cuePoints = newValue;
            this.checkCuePoints(this.currentTime);
        };

        this.onUpdateClearMediaOnNavigate = function onUpdateClearMediaOnNavigate(newValue) {
            this.clearMediaOnNavigate = newValue;
        };

        this.addBindings = function () {
            $scope.$watch("vgTheme", this.onUpdateTheme.bind(this));

            $scope.$watch("vgAutoPlay", this.onUpdateAutoPlay.bind(this));

            $scope.$watch("vgPlaysInline", this.onUpdatePlaysInline.bind(this));

            $scope.$watch("vgNativeFullscreen", this.onUpdateNativeFullscreen.bind(this));

            $scope.$watch("vgCuePoints", this.onUpdateCuePoints.bind(this));

            $scope.$watch("vgClearMediaOnNavigate", this.onUpdateClearMediaOnNavigate.bind(this));
        };

        this.onFullScreenChange = function (event) {
            this.isFullScreen = vgFullscreen.isFullScreen();
            $scope.$apply();
        };

        // Empty mediaElement on destroy to avoid that Chrome downloads video even when it's not present
        $scope.$on('$destroy', this.clearMedia.bind(this));

        // Empty mediaElement when router changes
        $scope.$on('$routeChangeStart', this.onRouteChange.bind(this));

        this.init();
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgCrossorigin
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove a crossorigin policy to the video object. Possible values are: "anonymous" and "use-credentials".
 * This feature should be enabled if you want to have your subtitles or video files on a different domain than the video player. Additionally you need
 * to add CORS policies to your video and track files to your server to make it work.
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgCrossorigin",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var crossorigin;

                    scope.setCrossorigin = function setCrossorigin(value) {
                        if (value) {
                            API.mediaElement.attr("crossorigin", value);
                        }
                        else {
                            API.mediaElement.removeAttr("crossorigin");
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setCrossorigin(API.config.crossorigin);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgCrossorigin, function (newValue, oldValue) {
                            if ((!crossorigin || newValue != oldValue) && newValue) {
                                crossorigin = newValue;
                                scope.setCrossorigin(crossorigin);
                            }
                            else {
                                scope.setCrossorigin();
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
                            function () {
                                return API.config;
                            },
                            function () {
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
 * Directive to add a source of videos or audios. This directive will create a &lt;video&gt; or &lt;audio&gt; tag and usually will be above plugin tags.
 *
 * @param {array} vgSrc Bindable array with a list of media sources. A media source is an object with two properties `src` and `type`. The `src` property must contains a trustful url resource.
 * @param {string} vgType String with "video" or "audio" values to set a <video> or <audio> tag inside <vg-media>.
 * <pre>
 * {
 *    src: $sce.trustAsResourceUrl("path/to/video/videogular.mp4"),
 *    type: "video/mp4"
 * }
 * </pre>
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgMedia",
    ["$timeout", "VG_UTILS", "VG_STATES", function ($timeout, VG_UTILS, VG_STATES) {
        return {
            restrict: "E",
            require: "^videogular",
            templateUrl: function (elem, attrs) {
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

                        if (API.currentState !== VG_STATES.PLAY) {
                            API.currentState = VG_STATES.STOP;
                        }

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
                                //Trigger vgChangeSource($source) API callback in vgController
                                API.changeSource(sources[i]);
                                break;
                            }
                        }
                    }
                    // It's a crappy browser and it doesn't deserve any respect
                    else {
                        // Get H264 or the first one
                        API.mediaElement.attr("src", sources[0].src);
                        API.mediaElement.attr("type", sources[0].type);
                        //Trigger vgChangeSource($source) API callback in vgController
                        API.changeSource(sources[0]);
                    }

                    // Android 2.3 support: https://github.com/2fdevs/videogular/issues/187
                    if (VG_UTILS.isMobileDevice()) API.mediaElement[0].load();

                    $timeout(function () {
                        if (API.autoPlay && !VG_UTILS.isMobileDevice()) {
                            API.play();
                        }
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
                scope.$watch(
                    function() {
                        return API.sources;
                    },
                    scope.onChangeSource
                );

                scope.$watch(
                    function() {
                        return API.playsInline;
                    },
                    function (newValue, oldValue) {
                        if (newValue) API.mediaElement.attr("webkit-playsinline", "");
                        else API.mediaElement.removeAttr("webkit-playsinline");
                    }
                );


                if (API.isConfig) {
                    scope.$watch(
                        function () {
                            return API.config;
                        },
                        function () {
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
                            function () {
                                return API.config;
                            },
                            function () {
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
                            function () {
                                return API.config;
                            },
                            function () {
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
 * <pre>
 * {
 *    src: "assets/subs/pale-blue-dot.vtt",
 *    kind: "subtitles",
 *    srclang: "en",
 *    label: "English",
 *    default: "true/false"
 * }
 * </pre>
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
                    var isMetaDataLoaded = false;
                    var tracks;
                    var i;
                    var l;

                    scope.onLoadMetaData = function() {
                        isMetaDataLoaded = true;
                        scope.updateTracks();
                    };

                    scope.updateTracks = function() {
                        // Remove previous tracks
                        var oldTracks = API.mediaElement.children();

                        for (i = 0, l = oldTracks.length; i < l; i++) {
                            if (oldTracks[i].remove) {
                                oldTracks[i].remove();
                            }
                        }

                        // Add new tracks
                        if (tracks) {
                            for (i = 0, l = tracks.length; i < l; i++) {
                                var track = document.createElement('track');
                                for (var prop in tracks[i]) {
                                    track[prop] = tracks[i][prop];
                                }

                                track.addEventListener('load', scope.onLoadTrack.bind(scope, track));

                                API.mediaElement[0].appendChild(track);
                            }
                        }
                    };

                    scope.onLoadTrack = function(track) {
                        if (track.default) track.mode = 'showing';
                        else track.mode = 'hidden';

                        for (var i=0, l=API.mediaElement[0].textTracks.length; i<l; i++) {
                            if (track.label == API.mediaElement[0].textTracks[i].label) {
                                if (track.default) {
                                    API.mediaElement[0].textTracks[i].mode = 'showing';
                                }
                                else {
                                    API.mediaElement[0].textTracks[i].mode = 'disabled';
                                }
                            }

                        }

                        track.removeEventListener('load', scope.onLoadTrack.bind(scope, track));
                    };

                    scope.setTracks = function setTracks(value) {
                        // Add tracks to the API to have it available for other plugins (like controls)
                        tracks = value;
                        API.tracks = value;

                        if (isMetaDataLoaded) {
                            scope.updateTracks();
                        }
                        else {
                            API.mediaElement[0].addEventListener("loadedmetadata", scope.onLoadMetaData.bind(scope), false);
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
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
                        }, true);
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
 * @param {boolean} [vgPlaysInline=false] vgPlaysInline Boolean value or a String with a scope name variable to use native fullscreen (default) or set fullscreen inside browser (true).
 *
 * @param {boolean} [vgClearMediaOnNavigate=true] vgClearMediaOnNavigate Boolean value or a String with a scope name variable to reset the video player when user navigates.
 *
 * This is useful to allow continuous playback between different routes.
 *
 * @param {boolean} [vgAutoPlay=false] vgAutoPlay Boolean value or a String with a scope name variable to auto start playing video when it is initialized.
 *
 * **This parameter is disabled in mobile devices** because user must click on content to prevent consuming mobile data plans.
 *
 * @param {object} vgCuePoints Bindable object containing a list of timelines with cue points objects. A timeline is an array of objects with the following properties:
 * - `timeLapse` is an object with two properties `start` and `end` representing in seconds the period for this cue points.
 * - `onEnter` callback called when user enters on a cue point. callback(currentTime, timeLapse, params)
 * - `onLeave` callback called when user seeks backwards and leave the current cue point or a completed cue point. callback(currentTime, timeLapse, params)
 * - `onUpdate` callback called when the current time is between timeLapse.start and timeLapse.end. callback(currentTime, timeLapse, params)
 * - `onComplete` callback called when the user seek forward or the current time passes timeLapse.end property. callback(currentTime, timeLapse, params)
 * - `params` an object with values available to receive in the callback..
 *
 * @param {function} vgConfig String with a url to a config file. Config file's must be a JSON file object with the following structure:
 * <pre>
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
 * </pre>
 * @param {function} vgCanPlay Function name in controller's scope to call when video is able to begin playback
 * @param {function} vgComplete Function name in controller's scope to call when video have been completed.
 * @param {function} vgUpdateVolume Function name in controller's scope to call when volume changes. Receives a param with the new volume.
 * @param {function} vgUpdatePlayback Function name in controller's scope to call when playback changes. Receives a param with the new playback rate.
 * @param {function} vgUpdateTime Function name in controller's scope to call when video playback time is updated. Receives two params with current time and duration in milliseconds.
 * @param {function} vgUpdateState Function name in controller's scope to call when video state changes. Receives a param with the new state. Possible values are "play", "stop" or "pause".
 * @param {function} vgPlayerReady Function name in controller's scope to call when video have been initialized. Receives a param with the videogular API.
 * @param {function} vgChangeSource Function name in controller's scope to change current video source. Receives a param with the new video.
 * @param {function} vgPlaysInline Boolean to play video inline. Generally used in mobile devices.
 * @param {function} vgNativeFullscreen Boolean to disable native fullscreen.
 * @param {function} vgSeeking Function name in controller's scope to call when the video has finished jumping to a new time. Receives a param with the seeked time and duration in seconds.
 * @param {function} vgSeeked Function name in controller's scope to call when the video is jumping to a new time. Receives two params with the seeked time and duration in seconds.
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
            restrict: "EA",
            scope: {
                vgTheme: "=?",
                vgAutoPlay: "=?",
                vgPlaysInline: "=?",
                vgNativeFullscreen: "=?",
                vgClearMediaOnNavigate: "=?",
                vgCuePoints: "=?",
                vgConfig: "@",
                vgCanPlay: "&",
                vgComplete: "&",
                vgUpdateVolume: "&",
                vgUpdatePlayback: "&",
                vgUpdateTime: "&",
                vgUpdateState: "&",
                vgPlayerReady: "&",
                vgChangeSource: "&",
                vgSeeking: "&",
                vgSeeked: "&",
                vgError: "&"
            },
            controller: "vgController",
            controllerAs: "API",
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
    .service("vgConfigLoader", ["$http", "$q", "$sce", function ($http, $q, $sce) {
        this.loadConfig = function loadConfig(url) {
            var deferred = $q.defer();

            $http({method: 'GET', url: url}).then(
                function success(response) {
                    var result = response.data;

                    for (var i = 0, l = result.sources.length; i < l; i++) {
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
 *    * vgFullscreen.onchange: String with the onchange event name.
 *    * vgFullscreen.onerror: String with the onerror event name.
 *    * vgFullscreen.isAvailable: Boolean with fullscreen availability.
 *    * vgFullscreen.isFullScreen: Boolean with current view mode.
 *    * vgFullscreen.exit: Exit fullscreen function.
 *    * vgFullscreen.request: Request for fullscreen access function.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
    .service("vgFullscreen", ["VG_UTILS", function (VG_UTILS) {
        // Native fullscreen polyfill
        var element;
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
                onchange: "MSFullscreenChange",
                onerror: "MSFullscreenError"
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
            var result = false;

            if (element) {
                result = (document[polyfill.element] != null || element.webkitDisplayingFullscreen)
            }
            else {
                result = (document[polyfill.element] != null)
            }

            return result;
        }

        this.isAvailable = (polyfill != null);

        if (polyfill) {
            this.onchange = polyfill.onchange;
            this.onerror = polyfill.onerror;
            this.isFullScreen = isFullScreen;
            this.exit = function () {
                document[polyfill.exit]();
            };
            this.request = function (elem) {
                element = elem;
                element[polyfill.request]();
            };
        }
    }]);

"use strict";
angular.module("com.2fdevs.videogular")
    .service("VG_UTILS", ["$window", function ($window) {
        this.fixEventOffset = function ($event) {
            /**
             * There's no offsetX in Firefox, so we fix that.
             * Solution provided by Jack Moore in this post:
             * http://www.jacklmoore.com/notes/mouse-position/
             * @param $event
             * @returns {*}
             */
            var matchedFF = navigator.userAgent.match(/Firefox\/(\d+)/i)
            if (matchedFF && Number.parseInt(matchedFF.pop()) < 39) {
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
            var elementZIndex;

            var tags = document.getElementsByTagName('*');

            for (var i = 0, l = tags.length; i < l; i++) {
                elementZIndex = parseInt(window.getComputedStyle(tags[i])["z-index"]);

                if (elementZIndex > zIndex) {
                    zIndex = elementZIndex + 1;
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

        /**
         * Test the browser's support for HTML5 localStorage.
         * @returns {boolean}
         */
        this.supportsLocalStorage = function () {
            var testKey = 'videogular-test-key';
            var storage = $window.sessionStorage;

            try {
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return 'localStorage' in $window && $window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };
    }]);
