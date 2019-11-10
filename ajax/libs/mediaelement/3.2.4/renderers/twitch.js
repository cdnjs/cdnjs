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
 * Twitch renderer
 *
 * Uses <iframe> approach and uses Twitch API to manipulate it.
 * @see https://github.com/justintv/Twitch-API/blob/master/embed-video.md
 */

var twitchApi = {
	/**
  * @type {Boolean}
  */
	isIframeStarted: false,
	/**
  * @type {Boolean}
  */
	isIframeLoaded: false,
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

		// Check whether Twitch API is already loaded.
		twitchApi.isLoaded = typeof Twitch !== 'undefined';

		if (twitchApi.isLoaded) {
			twitchApi.createIframe(settings);
		} else {
			twitchApi.loadIframeApi();
			twitchApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load Twitch API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {
		if (!twitchApi.isIframeStarted) {
			(function () {

				var script = document.createElement('script'),
				    firstScriptTag = document.getElementsByTagName('script')[0];

				var done = false;

				script.src = '//player.twitch.tv/js/embed/v1.js';

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function () {
					if (!done && (!twitchApi.readyState || twitchApi.readyState === undefined || twitchApi.readyState === "loaded" || twitchApi.readyState === "complete")) {
						done = true;
						twitchApi.iFrameReady();
						script.onload = script.onreadystatechange = null;
					}
				};
				firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
				twitchApi.isIframeStarted = true;
			})();
		}
	},

	/**
  * Process queue of Twitch <iframe> element creation
  *
  */
	iFrameReady: function iFrameReady() {

		twitchApi.isLoaded = true;
		twitchApi.isIframeLoaded = true;

		while (twitchApi.iframeQueue.length > 0) {
			var settings = twitchApi.iframeQueue.pop();
			twitchApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of Twitch API player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {
		var player = new Twitch.Player(settings.id, settings);
		window['__ready__' + settings.id](player);
	},

	/**
  * Extract ID from Twitch to be loaded through API
  * Valid URL format(s):
  *  - https://player.twitch.tv/?video=40464143
  *  - https://www.twitch.tv/40464143
  *  - https://player.twitch.tv/?channel=monserrat
  *  - https://www.twitch.tv/monserrat
  *
  * @param {String} url - Twitch full URL to grab the number Id of the source
  * @return {int}
  */
	getTwitchId: function getTwitchId(url) {

		var twitchId = '';

		if (url.indexOf('?') > 0) {
			twitchId = twitchApi.getTwitchIdFromParam(url);
			if (twitchId === '') {
				twitchId = twitchApi.getTwitchIdFromUrl(url);
			}
		} else {
			twitchId = twitchApi.getTwitchIdFromUrl(url);
		}

		return twitchId;
	},

	/**
  * Get ID from URL with format:
  *  - https://player.twitch.tv/?channel=monserrat
  *  - https://player.twitch.tv/?video=40464143
  *
  * @param {String} url
  * @returns {string}
  */
	getTwitchIdFromParam: function getTwitchIdFromParam(url) {

		if (url === undefined || url === null || !url.trim().length) {
			return null;
		}

		var parts = url.split('?'),
		    parameters = parts[1].split('&');

		var twitchId = '';

		for (var i = 0, total = parameters.length; i < total; i++) {
			var paramParts = parameters[i].split('=');
			if (paramParts[0].includes('channel=')) {
				twitchId = paramParts[1];
				break;
			} else if (paramParts[0].includes('video=')) {
				twitchId = 'v' + paramParts[1];
				break;
			}
		}

		return twitchId;
	},

	/**
  * Get ID from URL with formats:
  *  - https://www.twitch.tv/40464143
  *  - https://www.twitch.tv/monserrat
  *
  * @param {String} url
  * @return {?String}
  */
	getTwitchIdFromUrl: function getTwitchIdFromUrl(url) {

		if (url === undefined || url === null || !url.trim().length) {
			return null;
		}

		var parts = url.split('?');
		url = parts[0];
		var id = url.substring(url.lastIndexOf('/') + 1);
		return id.match(/^\d+$/i) !== null ? 'v' + id : id;
	},

	/**
  * Determine whether media is channel or video based on Twitch ID
  *
  * @see getTwitchId()
  * @param {String} id
  * @returns {String}
  */
	getTwitchType: function getTwitchType(id) {
		return id.match(/^v\d+/i) !== null ? 'video' : 'channel';
	}
};

var TwitchIframeRenderer = {
	name: 'twitch_iframe',

	options: {
		prefix: 'twitch_iframe'
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/twitch', 'video/x-twitch'].includes(type);
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

		// API objects
		var twitch = {},
		    apiStack = [],
		    readyState = 4,
		    twitchId = twitchApi.getTwitchId(mediaFiles[0].src);

		var twitchPlayer = null,
		    paused = true,
		    ended = false,
		    twitchIframe = null,
		    hasStartedPlaying = false,
		    volume = 1,
		    duration = Infinity,
		    time = 0;

		twitch.options = options;
		twitch.id = mediaElement.id + '_' + options.prefix;
		twitch.mediaElement = mediaElement;

		// wrappers for get/set
		var props = mejs.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			twitch['get' + capName] = function () {
				if (twitchPlayer !== null) {
					var value = null;

					// figure out how to get Twitch dta here
					switch (propName) {
						case 'currentTime':
							time = twitchPlayer.getCurrentTime();
							return time;

						case 'duration':
							duration = twitchPlayer.getDuration();
							return duration;

						case 'volume':
							volume = twitchPlayer.getVolume();
							return volume;

						case 'paused':
							paused = twitchPlayer.isPaused();
							return paused;

						case 'ended':
							ended = twitchPlayer.getEnded();
							return ended;

						case 'muted':
							return twitchPlayer.getMuted();

						case 'buffered':
							return {
								start: function start() {
									return 0;
								},
								end: function end() {
									return 0;
								},
								length: 1
							};
						case 'src':

							return twitchApi.getTwitchType(twitchId) === 'channel' ? twitchPlayer.getChannel() : twitchPlayer.getVideo();

						case 'readyState':
							return readyState;
					}

					return value;
				} else {
					return null;
				}
			};

			twitch['set' + capName] = function (value) {

				if (twitchPlayer !== null) {

					// do something
					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src,
							    videoId = twitchApi.getTwitchId(url);

							if (twitchApi.getTwitchType(twitchId) === 'channel') {
								twitchPlayer.setChannel(videoId);
							} else {
								twitchPlayer.setVideo(videoId);
							}
							break;

						case 'currentTime':
							twitchPlayer.seek(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('timeupdate', twitch);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'muted':
							twitchPlayer.setMuted(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', twitch);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							volume = value;
							twitchPlayer.setVolume(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', twitch);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;
						case 'readyState':
							var event = mejs.Utils.createEvent('canplay', twitch);
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
			twitch[methodName] = function () {

				if (twitchPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							paused = false;
							return twitchPlayer.play();
						case 'pause':
							paused = true;
							return twitchPlayer.pause();
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

		/**
   * Dispatch a list of events
   *
   * @private
   * @param {Array} events
   */
		function sendEvents(events) {
			for (var _i2 = 0, _total2 = events.length; _i2 < _total2; _i2++) {
				var event = mejs.Utils.createEvent(events[_i2], twitch);
				mediaElement.dispatchEvent(event);
			}
		}

		// Initial method to register all Twitch events when initializing <iframe>
		window['__ready__' + twitch.id] = function (_twitchPlayer) {

			mediaElement.twitchPlayer = twitchPlayer = _twitchPlayer;

			// do call stack
			if (apiStack.length) {
				for (var _i3 = 0, _total3 = apiStack.length; _i3 < _total3; _i3++) {

					var stackItem = apiStack[_i3];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						twitch['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						twitch[stackItem.methodName]();
					}
				}
			}

			var twitchIframe = document.getElementById(twitch.id).firstChild;
			twitchIframe.style.width = '100%';
			twitchIframe.style.height = '100%';

			// a few more events
			var events = ['mouseover', 'mouseout'];

			var assignEvents = function assignEvents(e) {
				var event = createEvent(e.type, twitch);
				mediaElement.dispatchEvent(event);
			};

			for (var _i4 = 0, _total4 = events.length; _i4 < _total4; _i4++) {
				twitchIframe.addEventListener(events[_i4], assignEvents, false);
			}

			var timer = void 0;

			// Twitch events
			twitchPlayer.addEventListener('ready', function () {
				paused = false;
				ended = false;
				sendEvents(['rendererready', 'loadedmetadata', 'loadeddata', 'canplay']);
			}, false);
			twitchPlayer.addEventListener('play', function () {
				if (!hasStartedPlaying) {
					hasStartedPlaying = true;
				}
				paused = false;
				ended = false;
				sendEvents(['play', 'playing', 'progress']);

				// Workaround to update progress bar
				timer = setInterval(function () {
					twitchPlayer.getCurrentTime();
					sendEvents(['timeupdate']);
				}, 250);
			}, false);
			twitchPlayer.addEventListener('pause', function () {
				paused = true;
				ended = false;
				if (!twitchPlayer.getEnded()) {
					sendEvents(['pause']);
				}
			}, false);
			twitchPlayer.addEventListener('ended', function () {
				paused = true;
				ended = true;
				sendEvents(['ended']);
				clearInterval(timer);
				hasStartedPlaying = false;
				timer = null;
			}, false);
		};

		// CREATE Twitch
		var height = mediaElement.originalNode.height,
		    width = mediaElement.originalNode.width,
		    twitchContainer = document.createElement('div'),
		    type = twitchApi.getTwitchType(twitchId),
		    twitchSettings = {
			id: twitch.id,
			width: width,
			height: height,
			playsinline: false,
			autoplay: false
		};

		twitchSettings[type] = twitchId;
		twitchContainer.id = twitch.id;
		twitchContainer.style.width = '100%';
		twitchContainer.style.height = '100%';

		mediaElement.originalNode.parentNode.insertBefore(twitchContainer, mediaElement.originalNode);
		mediaElement.originalNode.style.display = 'none';

		// send it off for async loading and creation
		twitchApi.enqueueIframe(twitchSettings);

		twitch.setSize = function (width, height) {
			if (twitchApi !== null && !isNaN(width) && !isNaN(height)) {
				twitchContainer.setAttribute('width', width);
				twitchContainer.setAttribute('height', height);
			}
		};
		twitch.hide = function () {
			twitch.pause();
			if (twitchIframe) {
				twitchIframe.style.display = 'none';
			}
		};
		twitch.show = function () {
			if (twitchIframe) {
				twitchIframe.style.display = '';
			}
		};
		twitch.destroy = function () {};

		return twitch;
	}
};

mejs.Utils.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//www.twitch.tv') || url.includes('//player.twitch.tv') ? 'video/x-twitch' : null;
});

mejs.Renderers.add(TwitchIframeRenderer);

},{}]},{},[1]);
