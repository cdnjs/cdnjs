/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
'use strict';

var _player = _dereq_(2);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

mejs.i18n.en['mejs.chromecast-legend'] = 'Casting to:';

Object.assign(mejs.MepDefaults, {
	castTitle: null,

	castAppID: null,

	castPolicy: 'origin',

	castEnableTracks: false,

	castIsLive: false

});

Object.assign(MediaElementPlayer.prototype, {
	buildchromecast: function buildchromecast(player, controls, layers, media) {

		var t = this,
		    button = document.createElement('div'),
		    castTitle = mejs.Utils.isString(t.options.castTitle) ? t.options.castTitle : 'Chromecast';

		player.chromecastLayer = document.createElement('div');
		player.chromecastLayer.className = t.options.classPrefix + 'chromecast-layer ' + t.options.classPrefix + 'layer';
		player.chromecastLayer.innerHTML = '<div class="' + t.options.classPrefix + 'chromecast-info"></div>';
		player.chromecastLayer.style.display = 'none';

		layers.insertBefore(player.chromecastLayer, layers.firstChild);

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'chromecast-button';
		button.innerHTML = '<button type="button" is="google-cast-button" aria-controls="' + t.id + '" title="' + castTitle + '" aria-label="' + castTitle + '" tabindex="0"></button>';
		button.style.display = 'none';

		t.addControlElement(button, 'chromecast');
		t.castButton = button;

		player.chromecastLayer.innerHTML = '<div class="' + t.options.classPrefix + 'chromecast-container">' + ('<span class="' + t.options.classPrefix + 'chromecast-icon"></span>') + ('<span class="' + t.options.classPrefix + 'chromecast-info">' + mejs.i18n.t('mejs.chromecast-legend') + ' <span class="device"></span></span>') + '</div>';

		if (media.originalNode.getAttribute('poster')) {
			player.chromecastLayer.innerHTML += '<img src="' + media.originalNode.getAttribute('poster') + '" width="100%" height="100%">';
			player.chromecastLayer.querySelector('img').addEventListener('click', function () {
				if (player.options.clickToPlayPause) {
					var _button = t.container.querySelector('.' + t.options.classPrefix + 'overlay-button'),
					    pressed = _button.getAttribute('aria-pressed');

					if (player.paused) {
						player.play();
					} else {
						player.pause();
					}

					_button.setAttribute('aria-pressed', !!pressed);
					player.container.focus();
				}
			});
		}

		window.__onGCastApiAvailable = function (isAvailable) {
			var mediaType = mejs.Utils.getTypeFromFile(media.originalNode.src).toLowerCase(),
			    canPlay = mediaType && ['application/x-mpegurl', 'application/vnd.apple.mpegurl', 'application/dash+xml', 'video/mp4', 'audio/mp3', 'audio/mp4'].indexOf(mediaType) > -1;

			if (isAvailable && canPlay) {
				t._initializeCastPlayer();
			}
		};

		if (window.cast) {
			var _button2 = t.controls.querySelector('.' + t.options.classPrefix + 'chromecast-button>button');
			if (_button2 && _button2.style.display !== 'none') {
				t.controls.querySelector('.' + t.options.classPrefix + 'chromecast-button').style.display = '';
			}
			t._initializeCastPlayer();
			return;
		}
		mejs.Utils.loadScript('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
	},
	cleanchromecast: function cleanchromecast(player) {
		if (window.cast) {
			var session = cast.framework.CastContext.getInstance().getCurrentSession();
			if (session) {
				session.endSession(true);
			}
		}

		if (player.castButton) {
			player.castButton.remove();
		}

		if (player.chromecastLayer) {
			player.chromecastLayer.remove();
		}
	},
	_initializeCastPlayer: function _initializeCastPlayer() {
		var t = this;

		var origin = void 0;

		switch (this.options.castPolicy) {
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

		var context = cast.framework.CastContext.getInstance(),
		    session = context.getCurrentSession();
		context.setOptions({
			receiverApplicationId: t.options.castAppID || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
			autoJoinPolicy: chrome.cast.AutoJoinPolicy[origin]
		});
		context.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, t._checkCastButtonStatus.bind(t));

		t.remotePlayer = new cast.framework.RemotePlayer();
		t.remotePlayerController = new cast.framework.RemotePlayerController(t.remotePlayer);
		t.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, t._switchToCastPlayer.bind(this));

		if (session) {
			var state = context.getCastState(),
			    button = t.controls.querySelector('.' + t.options.classPrefix + 'chromecast-button');

			if (button && state === cast.framework.CastState.NO_DEVICES_AVAILABLE) {
				button.style.display = 'none';
			} else if (button) {
				if (t.chromecastLayer) {
					t.chromecastLayer.style.display = state === cast.framework.CastState.CONNECTED ? '' : 'none';
				}
				button.style.display = '';
			}
			t._switchToCastPlayer();
		}
	},
	_checkCastButtonStatus: function _checkCastButtonStatus(e) {
		var t = this,
		    button = t.controls.querySelector('.' + t.options.classPrefix + 'chromecast-button');

		if (button && e.castState === cast.framework.CastState.NO_DEVICES_AVAILABLE) {
			button.style.display = 'none';
		} else if (button) {
			if (t.chromecastLayer) {
				t.chromecastLayer.style.display = e.castState === cast.framework.CastState.CONNECTED ? '' : 'none';
			}
			button.style.display = '';
		}

		setTimeout(function () {
			t.setPlayerSize(t.width, t.height);
			t.setControlsSize();
		}, 0);
	},
	_switchToCastPlayer: function _switchToCastPlayer() {
		var t = this;

		if (t.proxy) {
			t.proxy.pause();
		}
		if (cast && cast.framework) {
			var context = cast.framework.CastContext.getInstance();
			context.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, t._checkCastButtonStatus.bind(t));
			if (t.remotePlayer.isConnected) {
				t._setupCastPlayer();
				return;
			}
		}
		t._setDefaultPlayer();
	},
	_setupCastPlayer: function _setupCastPlayer() {
		var t = this,
		    context = cast.framework.CastContext.getInstance(),
		    castSession = context.getCurrentSession(),
		    deviceInfo = t.layers.querySelector('.' + t.options.classPrefix + 'chromecast-info');

		if (t.loadedChromecast === true) {
			return;
		}

		t.loadedChromecast = true;

		t.proxy = new _player2.default(t.remotePlayer, t.remotePlayerController, t.media, t.options);

		if (deviceInfo) deviceInfo.querySelector('.device').innerText = castSession.getCastDevice().friendlyName;
		if (t.chromecastLayer) {
			t.chromecastLayer.style.display = '';
		}

		if (t.options.castEnableTracks === true) {
			(function () {
				var captions = t.captionsButton !== undefined ? t.captionsButton.querySelectorAll('input[type=radio]') : null;

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

		t.media.addEventListener('loadedmetadata', function () {
			if (['SESSION_ENDING', 'SESSION_ENDED', 'NO_SESSION'].indexOf(castSession.getSessionState()) === -1 && t.proxy instanceof DefaultPlayer) {
				t.proxy.pause();
				t.proxy = new _player2.default(t.remotePlayer, t.remotePlayerController, t.media, t.options);
			}
		});

		t.media.addEventListener('timeupdate', function () {
			t.currentMediaTime = t.getCurrentTime();
		});
	}
});

},{"2":2}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChromecastPlayer = function () {
	function ChromecastPlayer(player, controller, media, options) {
		_classCallCheck(this, ChromecastPlayer);

		var t = this;
		t.player = player;
		t.controller = controller;
		t.media = media;
		t.endedMedia = false;
		t.enableTracks = options.castEnableTracks;
		t.isLive = options.castIsLive;

		t.controller.addEventListener(cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED, function () {
			if (t.paused) {
				t.pause();
			} else {
				t.play();
			}
			t.endedMedia = false;
		});
		t.controller.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, function () {
			t.setMuted(t.player.isMuted);
			t.volume = 0;
		});
		t.controller.addEventListener(cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED, function () {
			var event = mejs.Utils.createEvent('loadedmetadata', t.media);
			t.media.dispatchEvent(event);
		});
		t.controller.addEventListener(cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, function () {
			t.volume = t.player.volumeLevel;
			var event = mejs.Utils.createEvent('volumechange', t.media);
			t.media.dispatchEvent(event);
		});
		t.controller.addEventListener(cast.framework.RemotePlayerEventType.DURATION_CHANGED, function () {
			var event = mejs.Utils.createEvent('timeupdate', t.media);
			t.media.dispatchEvent(event);
		});
		t.controller.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED, function () {
			var event = mejs.Utils.createEvent('timeupdate', t.media);
			t.media.dispatchEvent(event);

			if (!t.isLive && t.getCurrentTime() >= t.getDuration()) {
				t.endedMedia = true;
				setTimeout(function () {
					var event = mejs.Utils.createEvent('ended', t.media);
					t.media.dispatchEvent(event);
				}, 50);
			}
		});
		t.controller.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, function () {
			t.setMuted(t.player.isMuted);
		});

		t.load();
		return t;
	}

	_createClass(ChromecastPlayer, [{
		key: 'getSrc',
		value: function getSrc() {
			return this.media.originalNode.src;
		}
	}, {
		key: 'setSrc',
		value: function setSrc(value) {
			this.media.originalNode.src = typeof value === 'string' ? value : value[0].src;
			this.load();
		}
	}, {
		key: 'setCurrentTime',
		value: function setCurrentTime(value) {
			this.player.currentTime = value;
			this.controller.seek();
			var event = mejs.Utils.createEvent('timeupdate', this.media);
			this.media.dispatchEvent(event);
		}
	}, {
		key: 'getCurrentTime',
		value: function getCurrentTime() {
			return this.player.currentTime;
		}
	}, {
		key: 'getDuration',
		value: function getDuration() {
			return this.player.duration;
		}
	}, {
		key: 'setVolume',
		value: function setVolume(value) {
			this.player.volumeLevel = value;
			this.controller.setVolumeLevel();
			var event = mejs.Utils.createEvent('volumechange', this.media);
			this.media.dispatchEvent(event);
		}
	}, {
		key: 'getVolume',
		value: function getVolume() {
			return this.player.volumeLevel;
		}
	}, {
		key: 'play',
		value: function play() {
			if (this.player.isPaused) {
				this.controller.playOrPause();
				var event = mejs.Utils.createEvent('play', this.media);
				this.media.dispatchEvent(event);
			}
		}
	}, {
		key: 'pause',
		value: function pause() {
			if (!this.player.isPaused) {
				this.controller.playOrPause();
				var event = mejs.Utils.createEvent('pause', this.media);
				this.media.dispatchEvent(event);
			}
		}
	}, {
		key: 'load',
		value: function load() {
			var t = this,
			    url = this.media.originalNode.src,
			    type = mejs.Utils.getTypeFromFile(url),
			    mediaInfo = new chrome.cast.media.MediaInfo(url, type),
			    castSession = cast.framework.CastContext.getInstance().getCurrentSession();

			if (url === window.location.href || !castSession) {
				return;
			}

			if (t.enableTracks === true) {
				var tracks = [],
				    children = t.media.originalNode.children;

				var counter = 1;

				for (var i = 0, total = children.length; i < total; i++) {
					var child = children[i],
					    tag = child.tagName.toLowerCase();

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
				mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
				mediaInfo.tracks = tracks;
			}

			mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
			mediaInfo.streamType = t.isLive ? chrome.cast.media.StreamType.LIVE : chrome.cast.media.StreamType.BUFFERED;
			mediaInfo.customData = null;
			mediaInfo.duration = null;
			mediaInfo.currentTime = t.isLive ? Infinity : 0;

			if (t.media.originalNode.getAttribute('data-cast-title')) {
				mediaInfo.metadata.title = t.media.originalNode.getAttribute('data-cast-title');
			}

			if (t.media.originalNode.getAttribute('data-cast-description')) {
				mediaInfo.metadata.subtitle = t.media.originalNode.getAttribute('data-cast-description');
			}

			if (t.media.originalNode.getAttribute('poster') || t.media.originalNode.getAttribute('data-cast-poster')) {
				var poster = t.media.originalNode.getAttribute('poster') || t.media.originalNode.getAttribute('data-cast-poster');
				mediaInfo.metadata.images = [{ 'url': mejs.Utils.absolutizeUrl(poster) }];
			}

			var request = new chrome.cast.media.LoadRequest(mediaInfo);

			castSession.loadMedia(request).then(function () {
				var currentTime = t.media.originalNode.currentTime;
				t.setCurrentTime(currentTime);
				t.play();

				var event = mejs.Utils.createEvent('play', t.media);
				t.media.dispatchEvent(event);
			}, function (error) {
				t._getErrorMessage(error);
			});
		}
	}, {
		key: 'setMuted',
		value: function setMuted(value) {
			var _this = this;

			if (value === true && !this.player.isMuted) {
				this.controller.muteOrUnmute();
			} else if (value === false && this.player.isMuted) {
				this.controller.muteOrUnmute();
			}
			setTimeout(function () {
				var event = mejs.Utils.createEvent('volumechange', _this.media);
				_this.media.dispatchEvent(event);
			}, 50);
		}
	}, {
		key: 'canPlayType',
		value: function canPlayType(type) {
			return ~['application/x-mpegurl', 'vnd.apple.mpegurl', 'application/dash+xml', 'video/mp4'].indexOf(type);
		}
	}, {
		key: '_getErrorMessage',
		value: function _getErrorMessage(error) {

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
					message = 'Unknown error: ' + error;
					break;
			}

			console.error(message);
		}
	}, {
		key: 'paused',
		get: function get() {
			return this.player.isPaused;
		}
	}, {
		key: 'muted',
		set: function set(value) {
			this.setMuted(value);
		},
		get: function get() {
			return this.player.isMuted;
		}
	}, {
		key: 'ended',
		get: function get() {
			return this.endedMedia;
		}
	}, {
		key: 'readyState',
		get: function get() {
			return this.media.originalNode.readyState;
		}
	}, {
		key: 'currentTime',
		set: function set(value) {
			this.setCurrentTime(value);
		},
		get: function get() {
			return this.getCurrentTime();
		}
	}, {
		key: 'duration',
		get: function get() {
			return this.getDuration();
		}
	}, {
		key: 'volume',
		set: function set(value) {
			this.setVolume(value);
		},
		get: function get() {
			return this.getVolume();
		}
	}, {
		key: 'src',
		set: function set(src) {
			this.setSrc(src);
		},
		get: function get() {
			return this.getSrc();
		}
	}]);

	return ChromecastPlayer;
}();

exports.default = ChromecastPlayer;


window.ChromecastPlayer = ChromecastPlayer;

},{}]},{},[1,2]);
