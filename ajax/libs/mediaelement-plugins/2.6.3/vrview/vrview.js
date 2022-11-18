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

var VrAPI = {
	isMediaStarted: false,

	isMediaLoaded: false,

	creationQueue: [],

	prepareSettings: function prepareSettings(settings) {
		if (VrAPI.isLoaded) {
			VrAPI.createInstance(settings);
		} else {
			VrAPI.loadScript(settings);
			VrAPI.creationQueue.push(settings);
		}
	},

	loadScript: function loadScript(settings) {
		if (!VrAPI.isMediaStarted) {

			if (typeof VRView !== 'undefined') {
				VrAPI.createInstance(settings);
			} else {
				var script = document.createElement('script'),
				    firstScriptTag = document.getElementsByTagName('script')[0];

				var done = false;

				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : 'https://googlevr.github.io/vrview/build/vrview.min.js';

				script.src = settings.options.path;

				script.onload = script.onreadystatechange = function () {
					if (!done && (!this.readyState || this.readyState === undefined || this.readyState === 'loaded' || this.readyState === 'complete')) {
						done = true;
						VrAPI.mediaReady();
						script.onload = script.onreadystatechange = null;
					}
				};

				firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
			}
			VrAPI.isMediaStarted = true;
		}
	},

	mediaReady: function mediaReady() {
		VrAPI.isLoaded = true;
		VrAPI.isMediaLoaded = true;

		while (VrAPI.creationQueue.length > 0) {
			var settings = VrAPI.creationQueue.pop();
			VrAPI.createInstance(settings);
		}
	},

	createInstance: function createInstance(settings) {
		var player = new VRView.Player('#' + settings.id, settings.options);
		window['__ready__' + settings.id](player);
	}
};

var VrRenderer = {
	name: 'vrview',

	options: {
		prefix: 'vrview'
	},

	canPlayType: function canPlayType(type) {
		return ~['video/mp4', 'application/x-mpegurl', 'vnd.apple.mpegurl', 'application/dash+xml'].indexOf(type.toLowerCase());
	},

	create: function create(mediaElement, options, mediaFiles) {
		var stack = [],
		    vr = {},
		    readyState = 4;

		var vrPlayer = null,
		    paused = true,
		    volume = 1,
		    oldVolume = volume,
		    bufferedTime = 0,
		    ended = false,
		    duration = 0,
		    url = '';

		vr.options = options;
		vr.id = mediaElement.id + '_' + options.prefix;
		vr.mediaElement = mediaElement;

		var props = mejs.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			var capName = propName.substring(0, 1).toUpperCase() + propName.substring(1);

			vr['get' + capName] = function () {
				if (vrPlayer !== null) {
					var value = null;

					switch (propName) {
						case 'currentTime':
							return vrPlayer.getCurrentTime();
						case 'duration':
							return vrPlayer.getDuration();
						case 'volume':
							volume = vrPlayer.getVolume();
							return volume;
						case 'muted':
							return volume === 0;
						case 'paused':
							paused = vrPlayer.isPaused;
							return paused;
						case 'ended':
							return ended;
						case 'src':
							return url;
						case 'buffered':
							return {
								start: function start() {
									return 0;
								},
								end: function end() {
									return bufferedTime * duration;
								},
								length: 1
							};
						case 'readyState':
							return readyState;
					}

					return value;
				} else {
					return null;
				}
			};

			vr['set' + capName] = function (value) {

				if (vrPlayer !== null) {
					switch (propName) {

						case 'src':
							var _url = typeof value === 'string' ? value : value[0].src;
							vrPlayer.setContentInfo({ video: _url });
							break;

						case 'currentTime':
							vrPlayer.setCurrentTime(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('timeupdate', vr);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							vrPlayer.setVolume(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', vr);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;
						case 'muted':
							volume = value ? 0 : oldVolume;
							vrPlayer.setVolume(volume);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', vr);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;
						case 'readyState':
							var event = mejs.Utils.createEvent('canplay', vr);
							mediaElement.dispatchEvent(event);
							break;
						default:
							console.log('VRView ' + vr.id, propName, 'UNSUPPORTED property');
							break;
					}
				} else {
					stack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};
		for (var i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		var methods = mejs.html5media.methods,
		    assignMethods = function assignMethods(methodName) {
			vr[methodName] = function () {

				if (vrPlayer !== null) {
					switch (methodName) {
						case 'play':
							return vrPlayer.play();
						case 'pause':
							return vrPlayer.pause();
						case 'load':
							return null;

					}
				} else {
					stack.push({ type: 'call', methodName: methodName });
				}
			};
		};
		for (var _i = 0, _il = methods.length; _i < _il; _i++) {
			assignMethods(methods[_i]);
		}

		var vrContainer = document.createElement('div');
		vrContainer.setAttribute('id', vr.id);
		vrContainer.style.width = '100%';
		vrContainer.style.height = '100%';

		window['__ready__' + vr.id] = function (_vrPlayer) {

			mediaElement.vrPlayer = vrPlayer = _vrPlayer;

			var iframe = vrContainer.querySelector('iframe');
			iframe.style.width = '100%';
			iframe.style.height = '100%';

			if (stack.length) {
				for (var _i2 = 0, _il2 = stack.length; _i2 < _il2; _i2++) {

					var stackItem = stack[_i2];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						vr['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						vr[stackItem.methodName]();
					}
				}
			}

			vrPlayer.on('ready', function () {

				var events = mejs.html5media.events.concat(['mouseover', 'mouseout']);

				var _loop = function _loop(_i3, _il3) {
					vrPlayer.on(events[_i3], function () {
						var event = mejs.Utils.createEvent(events[_i3], vr);
						mediaElement.dispatchEvent(event);
					});
				};

				for (var _i3 = 0, _il3 = events.length; _i3 < _il3; _i3++) {
					_loop(_i3, _il3);
				}
			});
		};

		mediaElement.originalNode.parentNode.insertBefore(vrContainer, mediaElement.originalNode);
		mediaElement.originalNode.style.display = 'none';

		var vrSettings = {
			path: options.vrPath,
			is_stereo: options.vrIsStereo,
			is_autopan_off: options.vrIsAutopanOff,
			is_debug: options.vrDebug,
			default_yaw: options.vrDefaultYaw,
			is_yaw_only: options.vrIsYawOnly,
			loop: options.loop
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (var _i4 = 0, _il4 = mediaFiles.length; _i4 < _il4; _i4++) {
				if (mejs.Renderers.renderers[options.prefix].canPlayType(mediaFiles[_i4].type)) {
					vrSettings.video = mediaFiles[_i4].src;
					vrSettings.width = '100%';
					vrSettings.height = '100%';
					break;
				}
			}
		}

		VrAPI.prepareSettings({
			options: vrSettings,
			id: vr.id
		});

		vr.hide = function () {
			vr.pause();
			if (vrPlayer) {
				vrContainer.style.display = 'none';
			}
		};

		vr.setSize = function () {};

		vr.show = function () {
			if (vrPlayer) {
				vrContainer.style.display = '';
			}
		};

		return vr;
	}
};

mejs.Renderers.add(VrRenderer);

Object.assign(mejs.MepDefaults, {
	vrPath: null,

	vrIsStereo: true,

	vrIsAutopanOff: true,

	vrDebug: false,

	vrDefaultYaw: 0,

	vrIsYawOnly: false
});

Object.assign(MediaElementPlayer.prototype, {
	buildvrview: function buildvrview(player, controls, layers, media) {

		var t = this;

		if (!t.isVideo || t.isVideo && t.media.rendererName !== null && !t.media.rendererName.match(/(native\_(dash|hls)|html5)/)) {
			return;
		}

		var button = document.createElement('div');

		player.detectFullscreenMode();

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'vrview-button';
		button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="VR" aria-label="VR" tabindex="0"></button>';
		button.addEventListener('click', function () {
			var isFullScreen = mejs.Features.HAS_TRUE_NATIVE_FULLSCREEN && mejs.Features.IS_FULLSCREEN || player.isFullScreen;

			if (isFullScreen) {
				player.exitFullScreen();
			} else {
				player.enterFullScreen();
			}
		});

		t.globalBind('keydown', function (e) {
			var key = e.which || e.keyCode || 0;
			if (key === 27 && (mejs.Features.HAS_TRUE_NATIVE_FULLSCREEN && mejs.Features.IS_FULLSCREEN || player.isFullScreen)) {
				player.exitFullScreen();
			}
		});

		t.addControlElement(button, 'vrview');

		var url = media.getSrc(),
		    mediaFiles = [{ src: url, type: mejs.Utils.getTypeFromFile(url) }],
		    renderInfo = mejs.Renderers.select(mediaFiles, ['vrview']);

		media.changeRenderer(renderInfo.rendererName, mediaFiles);
	}
});

},{}]},{},[1]);
