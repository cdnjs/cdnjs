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
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * DailyMotion renderer
 *
 * Uses <iframe> approach and uses DailyMotion API to manipulate it.
 * @see https://developer.dailymotion.com/player
 *
 */

var DailyMotionApi = {
	/**
  * @type {Boolean}
  */
	isSDKStarted: false,
	/**
  * @type {Boolean}
  */
	isSDKLoaded: false,
	/**
  * @type {Array}
  */
	iframeQueue: [],

	/**
  * Create a queue to prepare the creation of <iframe>
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	enqueueIframe: function enqueueIframe(settings) {

		if (DailyMotionApi.isLoaded) {
			DailyMotionApi.createIframe(settings);
		} else {
			DailyMotionApi.loadIframeApi();
			DailyMotionApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load DailyMotion API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {
		if (!DailyMotionApi.isSDKStarted) {
			var e = document.createElement('script');
			e.async = true;
			e.src = '//api.dmcdn.net/all.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(e, s);
			DailyMotionApi.isSDKStarted = true;
		}
	},

	/**
  * Process queue of DailyMotion <iframe> element creation
  *
  */
	apiReady: function apiReady() {

		DailyMotionApi.isLoaded = true;
		DailyMotionApi.isSDKLoaded = true;

		while (DailyMotionApi.iframeQueue.length > 0) {
			var settings = DailyMotionApi.iframeQueue.pop();
			DailyMotionApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of DailyMotion API player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {

		var player = DM.player(settings.container, {
			height: settings.height || '100%',
			width: settings.width || '100%',
			video: settings.videoId,
			params: Object.assign({ api: true }, settings.params),
			origin: location.host
		});

		player.addEventListener('apiready', function () {
			window['__ready__' + settings.id](player, { paused: true, ended: false });
		});
	},

	/**
  * Extract ID from DailyMotion's URL to be loaded through API
  * Valid URL format(s):
  * - http://www.dailymotion.com/embed/video/x35yawy
  * - http://dai.ly/x35yawy
  *
  * @param {String} url
  * @return {String}
  */
	getDailyMotionId: function getDailyMotionId(url) {
		var parts = url.split('/'),
		    lastPart = parts[parts.length - 1],
		    dashParts = lastPart.split('_');

		return dashParts[0];
	}
};

var DailyMotionIframeRenderer = {
	name: 'dailymotion_iframe',

	options: {
		prefix: 'dailymotion_iframe',

		dailymotion: {
			width: '100%',
			height: '100%',
			params: {
				autoplay: false,
				chromeless: 1,
				info: 0,
				logo: 0,
				related: 0
			}
		}
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/dailymotion', 'video/x-dailymotion'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var dm = {},
		    apiStack = [],
		    readyState = 4;

		var events = void 0,
		    dmPlayer = null,
		    dmIframe = null;

		dm.options = options;
		dm.id = mediaElement.id + '_' + options.prefix;
		dm.mediaElement = mediaElement;

		// wrappers for get/set
		var props = mejs.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			dm['get' + capName] = function () {
				if (dmPlayer !== null) {
					var value = null;

					// figure out how to get dm dta here
					switch (propName) {
						case 'currentTime':
							return dmPlayer.currentTime;

						case 'duration':
							return isNaN(dmPlayer.duration) ? 0 : dmPlayer.duration;

						case 'volume':
							return dmPlayer.volume;

						case 'paused':
							return dmPlayer.paused;

						case 'ended':
							return dmPlayer.ended;

						case 'muted':
							return dmPlayer.muted;

						case 'buffered':
							var percentLoaded = dmPlayer.bufferedTime,
							    duration = dmPlayer.duration;
							return {
								start: function start() {
									return 0;
								},
								end: function end() {
									return percentLoaded / duration;
								},
								length: 1
							};
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

			dm['set' + capName] = function (value) {
				if (dmPlayer !== null) {

					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src;

							dmPlayer.load(DailyMotionApi.getDailyMotionId(url));
							break;

						case 'currentTime':
							dmPlayer.seek(value);
							break;

						case 'muted':
							if (value) {
								dmPlayer.setMuted(true);
							} else {
								dmPlayer.setMuted(false);
							}
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', dm);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							dmPlayer.setVolume(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', dm);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'readyState':
							var event = mejs.Utils.createEvent('canplay', dm);
							mediaElement.dispatchEvent(event);
							break;

						default:
							
							break;
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
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
			dm[methodName] = function () {
				if (dmPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return dmPlayer.play();
						case 'pause':
							return dmPlayer.pause();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (var _i = 0, _total = methods.length; _i < _total; _i++) {
			assignMethods(methods[_i]);
		}

		// Initial method to register all DailyMotion events when initializing <iframe>
		window['__ready__' + dm.id] = function (_dmPlayer) {

			mediaElement.dmPlayer = dmPlayer = _dmPlayer;

			// do call stack
			if (apiStack.length) {
				for (var _i2 = 0, _total2 = apiStack.length; _i2 < _total2; _i2++) {

					var stackItem = apiStack[_i2];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						dm['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						dm[stackItem.methodName]();
					}
				}
			}

			dmIframe = document.getElementById(dm.id);

			// a few more events
			events = ['mouseover', 'mouseout'];
			var assignEvents = function assignEvents(e) {
				var event = mejs.Utils.createEvent(e.type, dm);
				mediaElement.dispatchEvent(event);
			};

			for (var _i3 = 0, _total3 = events.length; _i3 < _total3; _i3++) {
				dmIframe.addEventListener(events[_i3], assignEvents, false);
			}

			// BUBBLE EVENTS up
			events = mejs.html5media.events;
			events = events.concat(['click', 'mouseover', 'mouseout']);
			var assignNativeEvents = function assignNativeEvents(eventName) {

				// Deprecated event; not consider it
				if (eventName !== 'ended') {

					dmPlayer.addEventListener(eventName, function (e) {
						var event = mejs.Utils.createEvent(e.type, dmPlayer);
						mediaElement.dispatchEvent(event);
					});
				}
			};

			for (var _i4 = 0, _total4 = events.length; _i4 < _total4; _i4++) {
				assignNativeEvents(events[_i4]);
			}

			// Custom DailyMotion events
			dmPlayer.addEventListener('ad_start', function () {
				var event = mejs.Utils.createEvent('play', dmPlayer);
				mediaElement.dispatchEvent(event);

				event = mejs.Utils.createEvent('progress', dmPlayer);
				mediaElement.dispatchEvent(event);

				event = mejs.Utils.createEvent('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('ad_timeupdate', function () {
				var event = mejs.Utils.createEvent('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('ad_pause', function () {
				var event = mejs.Utils.createEvent('pause', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('ad_end', function () {
				var event = mejs.Utils.createEvent('ended', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('video_start', function () {
				var event = mejs.Utils.createEvent('play', dmPlayer);
				mediaElement.dispatchEvent(event);

				event = mejs.Utils.createEvent('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('video_end', function () {
				var event = mejs.Utils.createEvent('ended', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('progress', function () {
				var event = mejs.Utils.createEvent('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('durationchange', function () {
				var event = mejs.Utils.createEvent('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});

			// give initial events
			var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

			for (var _i5 = 0, _total5 = initEvents.length; _i5 < _total5; _i5++) {
				var event = mejs.Utils.createEvent(initEvents[_i5], dm);
				mediaElement.dispatchEvent(event);
			}
		};

		var dmContainer = document.createElement('div');
		dmContainer.id = dm.id;
		mediaElement.appendChild(dmContainer);
		if (mediaElement.originalNode) {
			dmContainer.style.width = mediaElement.originalNode.style.width;
			dmContainer.style.height = mediaElement.originalNode.style.height;
		}
		mediaElement.originalNode.style.display = 'none';

		var videoId = DailyMotionApi.getDailyMotionId(mediaFiles[0].src),
		    dmSettings = Object.assign({
			id: dm.id,
			container: dmContainer,
			videoId: videoId,
			autoplay: mediaElement.originalNode.autoplay
		}, dm.options.dailymotion);

		DailyMotionApi.enqueueIframe(dmSettings);

		dm.hide = function () {
			dm.stopInterval();
			dm.pause();
			if (dmIframe) {
				dmIframe.style.display = 'none';
			}
		};
		dm.show = function () {
			if (dmIframe) {
				dmIframe.style.display = '';
			}
		};
		dm.setSize = function (width, height) {
			dmIframe.width = width;
			dmIframe.height = height;
		};
		dm.destroy = function () {
			dmPlayer.destroy();
		};
		dm.interval = null;

		dm.startInterval = function () {
			dm.interval = setInterval(function () {
				DailyMotionApi.sendEvent(dm.id, dmPlayer, 'timeupdate', {
					paused: false,
					ended: false
				});
			}, 250);
		};
		dm.stopInterval = function () {
			if (dm.interval) {
				clearInterval(dm.interval);
			}
		};

		return dm;
	}
};

/*
 * Register DailyMotion event globally
 *
 */
mejs.Utils.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//dailymotion.com') || url.includes('www.dailymotion.com') || url.includes('//dai.ly') ? 'video/x-dailymotion' : null;
});

window.dmAsyncInit = function () {
	DailyMotionApi.apiReady();
};

mejs.Renderers.add(DailyMotionIframeRenderer);

},{}]},{},[1]);
