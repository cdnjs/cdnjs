(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Chromecast renderer/plugin
 *
 * Uses version 3.0 to take advantage of Google Cast Framework, and creates a button to turn on/off Chromecast streaming
 * @see https://developers.google.com/cast/docs/developers
 */

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var CastRenderer = {

	name: 'chromecast',

	options: {
		prefix: 'chromecast'
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @return {Boolean}
  */
	canPlayType: function canPlayType() {
		return true;
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @return {Object}
  */
	create: function create(mediaElement, options) {

		// API objects
		var c = {},
		    readyState = 4,
		    getErrorMessage = function getErrorMessage(error) {

			var description = error.description ? ' : ' + error.description : '.';

			var message = void 0;

			switch (error.code) {
				case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
					message = 'The API is not initialized' + description;
					break;
				case chrome.cast.ErrorCode.CANCEL:
					message = 'The operation was canceled by the user' + description;
					break;
				case chrome.cast.ErrorCode.CHANNEL_ERROR:
					message = 'A channel to the receiver is not available' + description;
					break;
				case chrome.cast.ErrorCode.EXTENSION_MISSING:
					message = 'The Cast extension is not available' + description;
					break;
				case chrome.cast.ErrorCode.INVALID_PARAMETER:
					message = 'The parameters to the operation were not valid' + description;
					break;
				case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
					message = 'No receiver was compatible with the session request' + description;
					break;
				case chrome.cast.ErrorCode.SESSION_ERROR:
					message = 'A session could not be created, or a session was invalid' + description;
					break;
				case chrome.cast.ErrorCode.TIMEOUT:
					message = 'The operation timed out' + description;
					break;
				default:
					message = 'Unknown error: ' + error.code;
					break;
			}

			console.error(message);
		};

		var castPlayer = mediaElement.castPlayer,
		    castPlayerController = mediaElement.castPlayerController,
		    volume = 1;

		c.options = options;
		c.id = mediaElement.id + '_' + options.prefix;
		c.mediaElement = mediaElement;

		// wrappers for get/set
		var props = mejs.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			c['get' + capName] = function () {
				if (castPlayer !== null) {
					var value = null;

					// figure out how to get Twitch dta here
					switch (propName) {
						case 'currentTime':
							return castPlayer.currentTime;

						case 'duration':
							return castPlayer.duration;

						case 'volume':
							volume = castPlayer.volumeLevel;
							return volume;

						case 'paused':
							return castPlayer.isPaused;

						case 'ended':
							return castPlayer.ended;

						case 'muted':
							return castPlayer.isMuted;

						case 'src':
							return mediaElement.originalNode.getAttribute('src');

						case 'readyState':
							return readyState;
					}

					return value;
				} else {
					return null;
				}
			};

			c['set' + capName] = function (value) {

				if (castPlayer !== null) {

					// do something
					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src;
							mediaElement.originalNode.setAttribute('src', url);
							break;

						case 'currentTime':
							castPlayer.currentTime = value;
							castPlayerController.seek();

							setTimeout(function () {
								var event = mejs.Utils.createEvent('timeupdate', c);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'muted':
							if (value === true && !castPlayer.isMuted) {
								castPlayerController.muteOrUnmute();
							} else if (value === false && castPlayer.isMuted) {
								castPlayerController.muteOrUnmute();
							}

							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', c);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							volume = value;
							castPlayer.volumeLevel = value;
							castPlayerController.setVolumeLevel();

							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', c);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;
						case 'readyState':
							var event = mejs.Utils.createEvent('canplay', c);
							mediaElement.dispatchEvent(event);
							break;

						case 'playbackRate':
							mediaElement.originalNode.playbackRate = value;
							break;

						default:
							console.log('Chromecast ' + c.id, propName, 'UNSUPPORTED property');
							break;
					}
				}
			};
		};

		for (var i = 0, total = props.length; i < total; i++) {
			assignGettersSetters(props[i]);
		}

		// add wrappers for native methods
		var methods = mejs.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the native HTMLMediaElement
			c[methodName] = function () {

				if (castPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							if (castPlayer.isPaused) {
								castPlayerController.playOrPause();
								setTimeout(function () {
									var event = mejs.Utils.createEvent('play', c);
									mediaElement.dispatchEvent(event);
								}, 50);
							}
							break;
						case 'pause':
							if (!castPlayer.isPaused) {
								castPlayerController.playOrPause();
								setTimeout(function () {
									var event = mejs.Utils.createEvent('pause', c);
									mediaElement.dispatchEvent(event);
								}, 50);
							}
							break;
						case 'load':

							var url = mediaElement.originalNode.getAttribute('src'),
							    type = mejs.Utils.getTypeFromFile(url),
							    mediaInfo = new chrome.cast.media.MediaInfo(url, type),
							    castSession = cast.framework.CastContext.getInstance().getCurrentSession();

							// Find captions/audioTracks
							if (options.castEnableTracks === true) {
								var tracks = [],
								    children = mediaElement.originalNode.childNodes;

								var counter = 1;

								for (var _i = 0, _total = children.length; _i < _total; _i++) {
									var child = children[_i];

									if (child.nodeType !== Node.TEXT_NODE) {
										var tag = child.tagName.toLowerCase();

										if (tag === 'track' && (child.getAttribute('kind') === 'subtitles' || child.getAttribute('kind') === 'captions')) {
											var el = new chrome.cast.media.Track(counter, chrome.cast.media.TrackType.TEXT);
											el.trackContentId = mejs.Utils.absolutizeUrl(child.getAttribute('src'));
											el.trackContentType = 'text/vtt';
											el.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
											el.name = child.getAttribute('label');
											el.language = child.getAttribute('srclang');
											el.customData = null;
											tracks.push(el);
											counter++;
										}
									}
								}
								mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
								mediaInfo.tracks = tracks;
							}

							mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
							mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;
							mediaInfo.customData = null;
							mediaInfo.duration = null;

							if (mediaElement.originalNode.getAttribute('data-cast-title')) {
								mediaInfo.metadata.title = mediaElement.originalNode.getAttribute('data-cast-title');
							}

							if (mediaElement.originalNode.getAttribute('data-cast-description')) {
								mediaInfo.metadata.subtitle = mediaElement.originalNode.getAttribute('data-cast-description');
							}

							if (mediaElement.originalNode.getAttribute('poster')) {
								mediaInfo.metadata.images = [{ 'url': mejs.Utils.absolutizeUrl(mediaElement.originalNode.getAttribute('poster')) }];
							}

							var request = new chrome.cast.media.LoadRequest(mediaInfo);

							castSession.loadMedia(request).then(function () {
								// Autoplay media in the current position
								var currentTime = mediaElement.originalNode.getCurrentTime();
								c.setCurrentTime(currentTime);
								castPlayerController.playOrPause();

								setTimeout(function () {
									var event = mejs.Utils.createEvent('play', c);
									mediaElement.dispatchEvent(event);
								}, 50);
							}, function (error) {
								getErrorMessage(error);
							});
							break;
					}
				}
			};
		};

		for (var _i2 = 0, _total2 = methods.length; _i2 < _total2; _i2++) {
			assignMethods(methods[_i2]);
		}

		window['__ready__' + c.id] = function () {

			// Add event listeners for player changes which may occur outside sender app
			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED, function () {
				if (castPlayer.isPaused) {
					c.pause();
				} else {
					c.play();
				}
			});

			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, function () {
				return c.setMuted(castPlayer.isMuted);
			});

			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED, function () {
				setTimeout(function () {
					var event = mejs.Utils.createEvent('loadedmetadata', c);
					mediaElement.dispatchEvent(event);
				}, 50);
			});

			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, function () {
				var event = mejs.Utils.createEvent('volumechange', c);
				mediaElement.dispatchEvent(event);
			});

			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.DURATION_CHANGED, function () {
				setTimeout(function () {
					var event = mejs.Utils.createEvent('timeupdate', c);
					mediaElement.dispatchEvent(event);
				}, 50);
			});

			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED, function () {
				setTimeout(function () {
					var event = mejs.Utils.createEvent('timeupdate', c);
					mediaElement.dispatchEvent(event);
				}, 50);

				if (mediaElement.castPlayer.currentTime >= mediaElement.castPlayer.duration) {
					setTimeout(function () {
						var event = mejs.Utils.createEvent('ended', c);
						mediaElement.dispatchEvent(event);
					}, 50);
				}
			});

			castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, function () {
				return c.setMuted(castPlayer.isMuted);
			});

			c.load();
		};

		mediaElement.autoplay = false;

		// send it off for async loading and creation
		window['__ready__' + c.id]();

		c.setSize = function () {};

		c.hide = function () {};

		c.show = function () {};

		c.destroy = function () {
			if (castPlayer !== null) {
				castPlayerController.stop();
			}

			mediaElement.style.display = '';
		};

		return c;
	}
};

// Translations (English required)
mejs.i18n.en['mejs.chromecast-legend'] = 'Casting to:';

// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
  * Title display
  * @type {String}
  */
	castTitle: null,

	/**
  * Chromecast App ID
  * @type {String}
  */
	castAppID: null,

	/**
  * Chromecast type of policy
  * `origin`: Auto connect from same appId and page origin (default)
  * `tab`: Auto connect from same appId, page origin, and tab
  * `page`: No auto connect
  *
  * @type {String}
  */
	castPolicy: 'origin',

	/**
  * Whether to load tracks or not through Chromecast
  *
  * In order to process tracks correctly, `tracks` feature must be enable on the player configuration
  * and user MUST set a custom receiver application.
  * @see https://github.com/googlecast/CastReferencePlayer
  * @see https://developers.google.com/cast/docs/receiver_apps
  * @type {Boolean}
  */
	castEnableTracks: false

});

Object.assign(MediaElementPlayer.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {HTMLElement} controls
  * @param {HTMLElement} layers
  * @param {HTMLElement} media
  */
	buildchromecast: function buildchromecast(player, controls, layers, media) {

		var t = this,
		    button = document.createElement('div'),
		    castTitle = mejs.Utils.isString(t.options.castTitle) ? t.options.castTitle : 'Chromecast';

		if (!player.isVideo) {
			return;
		}

		player.chromecastLayer = document.createElement('div');
		player.chromecastLayer.className = t.options.classPrefix + 'chromecast-layer ' + t.options.classPrefix + 'layer';
		player.chromecastLayer.innerHTML = '<div class="' + t.options.classPrefix + 'chromecast-info"></div>';
		player.chromecastLayer.style.display = 'none';

		layers.insertBefore(player.chromecastLayer, layers.firstChild);

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'chromecast-button';
		button.innerHTML = '<button type="button" is="google-cast-button" aria-controls="' + t.id + '" title="' + castTitle + '" aria-label="' + castTitle + '" tabindex="0"></button>';

		t.addControlElement(button, 'chromecast');
		t.castButton = button;

		// Activate poster layer
		player.chromecastLayer.innerHTML = '<div class="' + t.options.classPrefix + 'chromecast-container">' + ('<span class="' + t.options.classPrefix + 'chromecast-icon"></span>') + ('<span class="' + t.options.classPrefix + 'chromecast-info">' + mejs.i18n.t('mejs.chromecast-legend') + ' <span class="device"></span></span>') + '</div>';

		if (media.originalNode.getAttribute('poster')) {
			player.chromecastLayer.innerHTML += '<img src="' + media.originalNode.getAttribute('poster') + '" width="100%" height="100%">';
		}

		// Search for Chromecast
		var url = media.originalNode.getAttribute('src'),
		    mediaFiles = [{ src: url, type: mejs.Utils.getTypeFromFile(url) }];

		var loadedCastAPI = false;

		if (!loadedCastAPI) {

			// Start SDK
			window.__onGCastApiAvailable = function (isAvailable) {

				if (isAvailable) {

					// Add renderer to the list
					mejs.Renderers.add(CastRenderer);

					button.style.width = '20px';

					setTimeout(function () {
						t.setPlayerSize(t.width, t.height);
						t.setControlsSize();
					}, 0);

					var origin = void 0;

					switch (t.options.castPolicy) {
						case 'tab':
							origin = 'TAB_AND_ORIGIN_SCOPED';
							break;
						case 'page':
							origin = 'PAGE_SCOPED';
							break;
						default:
							origin = 'ORIGIN_SCOPED';
							break;
					}

					cast.framework.CastContext.getInstance().setOptions({
						receiverApplicationId: t.options.castAppID || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
						autoJoinPolicy: chrome.cast.AutoJoinPolicy[origin]
					});

					media.castPlayer = new cast.framework.RemotePlayer();
					media.castPlayerController = new cast.framework.RemotePlayerController(media.castPlayer);

					var currentTime = 0;

					// Set up renderer and device data
					media.castPlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, function () {

						if (cast && cast.framework) {
							if (media.castPlayer.isConnected) {
								var _ret = function () {

									var renderInfo = mejs.Renderers.select(mediaFiles, ['chromecast']);
									media.changeRenderer(renderInfo.rendererName, mediaFiles);

									var castSession = cast.framework.CastContext.getInstance().getCurrentSession(),
									    deviceInfo = layers.querySelector('.' + t.options.classPrefix + 'chromecast-info').querySelector('.device');

									deviceInfo.innerText = castSession.getCastDevice().friendlyName;
									player.chromecastLayer.style.display = 'block';

									if (t.options.castEnableTracks === true) {
										(function () {
											var captions = player.captionsButton !== undefined ? player.captionsButton.querySelectorAll('input[type=radio]') : null;

											if (captions !== null) {
												var _loop = function _loop(i, total) {
													captions[i].addEventListener('click', function () {
														var trackId = parseInt(captions[i].id.replace(/^.*?track_(\d+)_.*$/, "$1")),
														    setTracks = captions[i].value === 'none' ? [] : [trackId],
														    tracksInfo = new chrome.cast.media.EditTracksInfoRequest(setTracks);

														castSession.getMediaSession().editTracksInfo(tracksInfo, function () {}, function (e) {
															console.error(e);
														});
													});
												};

												for (var i = 0, total = captions.length; i < total; i++) {
													_loop(i, total);
												}
											}
										})();
									}

									media.addEventListener('timeupdate', function () {
										currentTime = media.getCurrentTime();
									});

									return {
										v: void 0
									};
								}();

								if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
							}
						}

						player.chromecastLayer.style.display = 'none';
						media.style.display = '';
						var renderInfo = mejs.Renderers.select(mediaFiles, media.renderers);
						media.changeRenderer(renderInfo.rendererName, mediaFiles);
						media.setCurrentTime(currentTime);

						// Continue playing if already started
						if (currentTime > 0 && !mejs.Features.IS_IOS && !mejs.Features.IS_ANDROID) {
							media.play();
						}
					});
				}
			};

			var script = document.createElement('script');
			script.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
			document.body.appendChild(script);
			loadedCastAPI = true;
		}
	},
	clearchromecast: function clearchromecast(player) {

		player.castPlayerController.stop();

		if (player.castButton) {
			player.castButton.remove();
		}

		if (player.chromecastLayer) {
			player.chromecastLayer.remove();
		}
	}
});

},{}]},{},[1]);
