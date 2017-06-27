"use strict";
angular.module("com.2fdevs.videogular", ["ngSanitize"])
	.constant("VG_STATES", {
		PLAY: "play",
		PAUSE: "pause",
		STOP: "stop"
	})
	.constant("VG_EVENTS", {
		ON_PLAY: "onVgPlay",
		ON_PAUSE: "onVgPause",
		ON_PLAY_PAUSE: "onVgPlayPause",
		ON_START_PLAYING: "onVgStartPlaying",
		ON_COMPLETE: "onVgComplete",
		ON_SET_STATE: "onVgSetState",
		ON_SET_VOLUME: "onVgSetVolume",
		ON_TOGGLE_FULLSCREEN: "onVgToggleFullscreen",
		ON_ENTER_FULLSCREEN: "onVgEnterFullscreen",
		ON_EXIT_FULLSCREEN: "onVgExitFullscreen",
		ON_BUFFERING: "onVgBuffering",
		ON_UPDATE_TIME: "onVgUpdateTime",
		ON_SEEK_TIME: "onVgSeekTime",
		ON_UPDATE_SIZE: "onVgUpdateSize",
		ON_UPDATE_THEME: "onVgUpdateTheme",
		ON_PLAYER_READY: "onVgPlayerReady",
		ON_LOAD_POSTER: "onVgLoadPoster"
	})
	.service("VG_UTILS", function() {
		this.fixEventOffset = function($event) {
			/**
			 * There's no offsetX in Firefox, so we fix that.
			 * Solution provided by Jack Moore in this post:
			 * http://www.jacklmoore.com/notes/mouse-position/
			 * @param $event
			 * @returns {*}
			 */
			if (navigator.userAgent.match(/Firefox/i)) {
				var style = $event.target.currentStyle || window.getComputedStyle($event.target, null);
				var borderLeftWidth = parseInt(style['borderLeftWidth'], 10);
				var borderTopWidth = parseInt(style['borderTopWidth'], 10);
				var rect = $event.target.getBoundingClientRect();
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
		this.getZIndex = function() {
			var zIndex = 1;

			$('*')
				.filter(function(){ return $(this).css('zIndex') !== 'auto'; })
				.each(function(){
					var thisZIndex = parseInt($(this).css('zIndex'));
					if (zIndex < thisZIndex) zIndex = thisZIndex + 1;
				});

			return zIndex;
		};

		// Very simple mobile detection, not 100% reliable
		this.isMobileDevice = function() {
			return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
		};

		this.isiOSDevice = function() {
			return (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
		};
	})
	.run(["$window", "VG_UTILS",
		function($window, VG_UTILS) {
			// Native fullscreen polyfill
			var fullScreenAPI;
			var APIs = {
				w3: {
					enabled: "fullscreenEnabled",
					element: "fullscreenElement",
					request: "requestFullscreen",
					exit:    "exitFullscreen",
					onchange: "fullscreenchange",
					onerror:  "fullscreenerror"
				},
				newWebkit: {
					enabled: "webkitFullscreenEnabled",
					element: "webkitFullscreenElement",
					request: "webkitRequestFullscreen",
					exit:    "webkitExitFullscreen",
					onchange: "webkitfullscreenchange",
					onerror:  "webkitfullscreenerror"
				},
				oldWebkit: {
					enabled: "webkitIsFullScreen",
					element: "webkitCurrentFullScreenElement",
					request: "webkitRequestFullScreen",
					exit:    "webkitCancelFullScreen",
					onchange: "webkitfullscreenchange",
					onerror:  "webkitfullscreenerror"
				},
				moz: {
					enabled: "mozFullScreen",
					element: "mozFullScreenElement",
					request: "mozRequestFullScreen",
					exit:    "mozCancelFullScreen",
					onchange: "mozfullscreenchange",
					onerror:  "mozfullscreenerror"
				},
				ios: {
					enabled: "webkitFullscreenEnabled",
					element: "webkitFullscreenElement",
					request: "webkitEnterFullscreen",
					exit: undefined,
					onexit: "webkitendfullscreen",
					onchange: "webkitfullscreenchange",
					onerror:  "webkitfullscreenerror"
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
	.directive(
		"videogular",
		["$window", "VG_STATES", "VG_EVENTS", "VG_UTILS", function($window, VG_STATES, VG_EVENTS, VG_UTILS) {
			return {
				restrict: "E",
				scope: {
					playerWidth: "=vgWidth",
					playerHeight: "=vgHeight",
					theme: "=vgTheme",
					autoPlay: "=vgAutoplay",
					responsive: "=vgResponsive",
					stretch: "=vgStretch",
					vgComplete: "&",
					vgUpdateVolume: "&",
					vgUpdateTime: "&",
					vgUpdateSize: "&",
					vgUpdateState: "&",
					vgPlayerReady: "&"
				},
				controller: function($scope) {
					var currentTheme = null;
					var currentWidth = null;
					var currentHeight = null;
					var currentState = VG_STATES.STOP;
					var currentStretch = $scope.stretch;
					var playerWidth = 0;
					var playerHeight = 0;
					var isFullScreenPressed = false;
					var isFullScreen = false;
					var isMetaDataLoaded = false;
					var isElementReady = false;
					var isVideoReady = false;
					var isPlayerReady = false;
					var isResponsive = false;
					var vg = this;

					var vgCompleteCallBack = $scope.vgComplete();
					var vgUpdateVolumeCallBack = $scope.vgUpdateVolume();
					var vgUpdateTimeCallBack = $scope.vgUpdateTime();
					var vgUpdateSizeCallBack = $scope.vgUpdateSize();
					var vgUpdateStateCallBack = $scope.vgUpdateState();
					var vgPlayerReadyCallBack = $scope.vgPlayerReady();

					// PUBLIC $API
					this.$on = function() {
						$scope.$on.apply($scope, arguments);
					};

					this.isPlayerReady = function() {
						return isPlayerReady;
					};

					this.seekTime = function(time) {
						this.videoElement[0].currentTime = time;
					};

					this.playPause = function() {
						if (this.videoElement[0].paused) {
							this.videoElement[0].play();
							this.setState(VG_STATES.PLAY);
							$scope.$emit(VG_EVENTS.ON_PLAY);
						}
						else {
							this.videoElement[0].pause();
							this.setState(VG_STATES.PAUSE);
							$scope.$emit(VG_EVENTS.ON_PAUSE);
						}
					};

					this.setState = function(newState) {
						if (newState && newState != currentState) {
							if (vgUpdateStateCallBack) vgUpdateStateCallBack(newState);

							currentState = newState;
							$scope.$emit(VG_EVENTS.ON_SET_STATE, [currentState]);
						}

						return currentState;
					};

					this.play = function() {
						this.videoElement[0].play();
						this.setState(VG_STATES.PLAY);
						$scope.$emit(VG_EVENTS.ON_PLAY);
					};

					this.pause = function() {
						this.videoElement[0].pause();
						this.setState(VG_STATES.PAUSE);
						$scope.$emit(VG_EVENTS.ON_PAUSE);
					};

					this.toggleFullScreen = function() {
						// There is no native full screen support
						if (!angular.element($window)[0].fullScreenAPI) {
							if (isFullScreen) {
								this.videogularElement.removeClass("fullscreen");
								this.videogularElement.css("z-index", 0);
							}
							else {
								this.videogularElement.addClass("fullscreen");
								this.videogularElement.css("z-index", VG_UTILS.getZIndex());
							}

							isFullScreen = !isFullScreen;

							$scope.updateSize();
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
											this.enterElementInFullScreen(this.videoElement[0]);
										}
										else {
											isFullScreenPressed = true;
											this.play();
										}
									}
									else {
										this.enterElementInFullScreen(this.videoElement[0]);
									}
								}
								else {
									this.enterElementInFullScreen(this.elementScope[0]);
								}
							}
						}
					};

					this.enterElementInFullScreen = function(element) {
						element[angular.element($window)[0].fullScreenAPI.request]();
					};

					this.setVolume = function(newVolume) {
						if (vgUpdateVolumeCallBack) vgUpdateVolumeCallBack(newVolume);

						this.videoElement[0].volume = newVolume;
						$scope.$emit(VG_EVENTS.ON_SET_VOLUME, [newVolume]);
					};

					this.updateTheme = function(value) {
						if (currentTheme) {
							// Remove previous theme
							var links = document.getElementsByTagName("link");
							for (var i=0, l=links.length; i<l; i++) {
								if (links[i].outerHTML.indexOf(currentTheme) >= 0) {
									links[i].parentNode.removeChild(links[i]);
								}
							}
						}

						var headElem = angular.element(document).find("head");
						headElem.append("<link rel='stylesheet' href='" + value + "'>");

						currentTheme = value;
					};

					this.updateStretch = function(value) {
						currentStretch = value;
						$scope.updateSize();
					};

					this.setSize = function(newWidth, newHeight) {
						currentWidth = newWidth;
						currentHeight = newHeight;

						$scope.updateSize();
					};

					this.getSize = function() {
						return {width: currentWidth, height: currentHeight};
					};

					// PRIVATE FUNCTIONS
					$scope.API = this;

					$scope.init = function() {
						vg.updateTheme($scope.theme);
						$scope.addBindings();

						if ($scope.playerWidth == undefined || $scope.playerHeight == undefined || $scope.responsive == true) {
							isResponsive = true;
							angular.element($window).bind("resize", $scope.onResizeBrowser);
						}
						else {
							playerWidth = $scope.playerWidth;
							playerHeight = $scope.playerHeight;

							vg.setSize(playerWidth, playerHeight);
						}

						if (angular.element($window)[0].fullScreenAPI) {
							document.addEventListener(angular.element($window)[0].fullScreenAPI.onchange, $scope.onFullScreenChange);
						}
					};

					$scope.addBindings = function() {
						$scope.$watch("playerWidth", function(newValue, oldValue) {
							if (newValue != oldValue){
								vg.setSize(newValue, currentHeight);
							}
						});

						$scope.$watch("playerHeight", function(newValue, oldValue) {
							if (newValue != oldValue){
								vg.setSize(currentWidth, newValue);
							}
						});

						$scope.$watch("theme", function(newValue, oldValue) {
							if (newValue != oldValue){
								vg.updateTheme(newValue);
							}
						});

						$scope.$watch("stretch", function(newValue, oldValue) {
							if (newValue != oldValue){
								vg.updateStretch(newValue);
							}
						});

						$scope.$watch("autoPlay", function(newValue, oldValue) {
							if (newValue != oldValue){
								vg.play();
							}
						});

						$scope.$watch("responsive", function(newValue, oldValue) {
							if (newValue != oldValue){
								isResponsive = newValue;

								if (isResponsive) {
									angular.element($window).bind("resize", $scope.onResizeBrowser);
									$scope.onResizeBrowser();
								}
								else {
									angular.element($window).unbind("resize", $scope.onResizeBrowser);
									currentWidth = $scope.playerWidth;
									currentHeight = $scope.playerHeight;
									$scope.updateSize();
								}
							}
						});
					};

					$scope.onElementReady = function() {
						isElementReady = true;

						if (isVideoReady) {
							$scope.onPlayerReady();
						}
					};

					$scope.onVideoReady = function() {
						isVideoReady = true;

						if (isElementReady){
							$scope.onPlayerReady();
						}
					};

					$scope.onPlayerReady = function() {
						vg.videoElement[0].addEventListener("loadedmetadata", $scope.onLoadedMetaData);

						$scope.doPlayerReady();
					};

					$scope.onLoadedMetaData = function() {
						isMetaDataLoaded = true;
						$scope.doPlayerReady();
					};

					$scope.doPlayerReady = function() {
						if (isResponsive) {
							var percentWidth = vg.elementScope[0].parentNode.clientWidth * 100 / vg.videoElement[0].videoWidth;
							var videoHeight = vg.videoElement[0].videoHeight * percentWidth / 100;
							currentWidth = vg.elementScope[0].parentNode.clientWidth;
							currentHeight = videoHeight;
						}

						isPlayerReady = true;
						$scope.updateSize();
						if (vgPlayerReadyCallBack) vgPlayerReadyCallBack(vg);
						$scope.$emit(VG_EVENTS.ON_PLAYER_READY);

						if ($scope.autoPlay && !VG_UTILS.isMobileDevice() || currentState === VG_STATES.PLAY) vg.play();
					};

					$scope.updateSize = function() {
						if (isPlayerReady) {
							var videoSize;
							var videoTop;
							var videoLeft;

							if (angular.element($window)[0].fullScreenAPI && angular.element($window)[0].fullScreenAPI.isFullScreen() || isFullScreen) {
								vg.elementScope.css("width", parseInt(window.screen.width, 10) + "px");
								vg.elementScope.css("height", parseInt(window.screen.height, 10) + "px");

								videoSize = $scope.getVideoSize(window.screen.width, window.screen.height);

								if (isFullScreen) {
									playerWidth = $window.innerWidth;
									playerHeight = $window.innerHeight;
								}
								else {
									playerWidth = $window.screen.width;
									playerHeight = $window.screen.height;
								}
							}
							else {
								vg.elementScope.css("width", parseInt(currentWidth, 10) + "px");
								vg.elementScope.css("height", parseInt(currentHeight, 10) + "px");

								videoSize = $scope.getVideoSize(currentWidth, currentHeight);

								playerWidth = currentWidth;
								playerHeight = currentHeight;
							}

							if (currentHeight == 0 || isNaN(currentHeight)) {
								playerWidth = videoSize.width;
								playerHeight = videoSize.height;
							}

							if (videoSize.width == 0) videoSize.width = currentWidth;
							if (videoSize.height == 0) videoSize.height = currentHeight;

							videoLeft = (playerWidth - videoSize.width) / 2;
							videoTop = (playerHeight - videoSize.height) / 2;

							vg.videoElement.attr("width", parseInt(videoSize.width, 10));
							vg.videoElement.attr("height", parseInt(videoSize.height, 10));
							vg.videoElement.css("width", parseInt(videoSize.width, 10) + "px");
							vg.videoElement.css("height", parseInt(videoSize.height, 10));
							vg.videoElement.css("top", videoTop + "px");
							vg.videoElement.css("left", videoLeft + "px");

							vg.elementScope.css("width", parseInt(playerWidth, 10) + "px");
							vg.elementScope.css("height", parseInt(playerHeight, 10) + "px");

							if (vgUpdateSizeCallBack) vgUpdateSizeCallBack(playerWidth, playerHeight);

							$scope.$emit(VG_EVENTS.ON_UPDATE_SIZE, [playerWidth, playerHeight]);
						}
					};

					$scope.onResizeBrowser = function() {
						var percentWidth = vg.elementScope[0].parentNode.clientWidth * 100 / vg.videoElement[0].videoWidth;
						var videoHeight = vg.videoElement[0].videoHeight * percentWidth / 100;

						currentWidth = vg.elementScope[0].parentNode.clientWidth;
						currentHeight = videoHeight;

						$scope.updateSize();
					};

					$scope.onFullScreenChange = function(event) {
						if (angular.element($window)[0].fullScreenAPI.isFullScreen()) {
							$scope.$emit(VG_EVENTS.ON_ENTER_FULLSCREEN);
						}
						else {
							$scope.$emit(VG_EVENTS.ON_EXIT_FULLSCREEN);
						}

						$scope.updateSize();
						$scope.$apply();
					};

					$scope.onComplete = function(event) {
						if (vgCompleteCallBack) vgCompleteCallBack();

						vg.setState(VG_STATES.STOP);
						$scope.$emit(VG_EVENTS.ON_COMPLETE);
						$scope.$apply();
					};

					$scope.onStartBuffering = function(event) {
						$scope.$emit(VG_EVENTS.ON_BUFFERING);
						$scope.$apply();
					};

					$scope.onStartPlaying = function(event) {
						// Chrome fix: Chrome needs to update the video tag size or it will show a white screen
						event.target.width++;
						event.target.width--;

						$scope.$emit(VG_EVENTS.ON_START_PLAYING, [event.target.duration]);
						$scope.$apply();
					};

					$scope.onUpdateTime = function(event) {
						if (vgUpdateTimeCallBack) vgUpdateTimeCallBack(event.target.currentTime, event.target.duration);

						$scope.$emit(VG_EVENTS.ON_UPDATE_TIME, [event.target.currentTime, event.target.duration]);
						$scope.$apply();
					};

					$scope.getVideoSize = function(w, h) {
						var percentageWidth;
						var percentageHeight;
						var result = {};
						var wider = vg.videoElement[0].videoWidth / vg.videoElement[0].videoHeight > w / h;
						result.width = w;
						result.height = h;

						if (currentStretch == "fit" && wider || currentStretch == "fill" && !wider) {
							percentageWidth = w * 100 / vg.videoElement[0].videoWidth;
							result.height = vg.videoElement[0].videoHeight * percentageWidth / 100;
						} else if (currentStretch == "fill" && wider || currentStretch == "fit" && !wider) {
							percentageHeight = h * 100 / vg.videoElement[0].videoHeight;
							result.width = vg.videoElement[0].videoWidth * percentageHeight / 100;
						} else {
							result.width = vg.videoElement[0].videoWidth;
							result.height = vg.videoElement[0].videoHeight;
						}

						// Metadata has not been loaded or any problem has been happened
						if (result.height == 0 || isNaN(result.height)) {
							result.width = vg.elementScope[0].parentElement.clientWidth;
							result.height = result.width * 9 / 16;
						}

						return result;
					};

					$scope.init();
				},
				link: {
					pre: function(scope, elem, attr, controller) {
						controller.videogularElement = elem;
						controller.elementScope = angular.element(elem);
						controller.videoElement = controller.elementScope.find("video");

						controller.videoElement[0].addEventListener("waiting", scope.onStartBuffering, false);
						controller.videoElement[0].addEventListener("ended", scope.onComplete, false);
						controller.videoElement[0].addEventListener("playing", scope.onStartPlaying, false);
						controller.videoElement[0].addEventListener("timeupdate", scope.onUpdateTime, false);

						controller.elementScope.ready(scope.onElementReady);
						controller.videoElement.ready(scope.onVideoReady);
					}
				}
			}
		}
	]
);
