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
 * Vimeo renderer
 *
 * Uses <iframe> approach and uses Vimeo API to manipulate it.
 * All Vimeo calls return a Promise so this renderer accounts for that
 * to update all the necessary values to interact with MediaElement player.
 * Note: IE8 implements ECMAScript 3 that does not allow bare keywords in dot notation;
 * that's why instead of using .catch ['catch'] is being used.
 * @see https://github.com/vimeo/player.js
 *
 */

var vimeoApi = {

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

		if (vimeoApi.isLoaded) {
			vimeoApi.createIframe(settings);
		} else {
			vimeoApi.loadIframeApi();
			vimeoApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load Vimeo API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {

		if (!vimeoApi.isIframeStarted) {
			(function () {

				var script = document.createElement('script'),
				    firstScriptTag = document.getElementsByTagName('script')[0];

				var done = false;

				script.src = '//player.vimeo.com/api/player.js';

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function () {
					if (!done && (!vimeoApi.readyState || vimeoApi.readyState === undefined || vimeoApi.readyState === "loaded" || vimeoApi.readyState === "complete")) {
						done = true;
						vimeoApi.iFrameReady();
						script.onload = script.onreadystatechange = null;
					}
				};
				firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
				vimeoApi.isIframeStarted = true;
			})();
		}
	},

	/**
  * Process queue of Vimeo <iframe> element creation
  *
  */
	iFrameReady: function iFrameReady() {

		vimeoApi.isLoaded = true;
		vimeoApi.isIframeLoaded = true;

		while (vimeoApi.iframeQueue.length > 0) {
			var settings = vimeoApi.iframeQueue.pop();
			vimeoApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of Vimeo API player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {
		var player = new Vimeo.Player(settings.iframe);
		window['__ready__' + settings.id](player);
	},

	/**
  * Extract numeric value from Vimeo to be loaded through API
  * Valid URL format(s):
  *  - https://player.vimeo.com/video/59777392
  *  - https://vimeo.com/59777392
  *
  * @param {String} url - Vimeo full URL to grab the number Id of the source
  * @return {int}
  */
	getVimeoId: function getVimeoId(url) {
		if (url === undefined || url === null) {
			return null;
		}

		var parts = url.split('?');

		url = parts[0];

		return parseInt(url.substring(url.lastIndexOf('/') + 1));
	}
};

var vimeoIframeRenderer = {

	name: 'vimeo_iframe',

	options: {
		prefix: 'vimeo_iframe'
	},
	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/vimeo', 'video/x-vimeo'].includes(type);
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

		// exposed object
		var apiStack = [],
		    vimeo = {},
		    readyState = 4;

		var paused = true,
		    volume = 1,
		    oldVolume = volume,
		    currentTime = 0,
		    bufferedTime = 0,
		    ended = false,
		    duration = 0,
		    vimeoPlayer = null,
		    url = '';

		vimeo.options = options;
		vimeo.id = mediaElement.id + '_' + options.prefix;
		vimeo.mediaElement = mediaElement;

		/**
   * Generate custom errors for Vimeo based on the API specifications
   *
   * @see https://github.com/vimeo/player.js#error
   * @param {Object} error
   * @param {Object} target
   */
		var errorHandler = function errorHandler(error, target) {
			var event = mejs.Utils.createEvent('error', target);
			event.message = error.name + ': ' + error.message;
			mediaElement.dispatchEvent(event);
		};

		// wrappers for get/set
		var props = mejs.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			vimeo['get' + capName] = function () {
				if (vimeoPlayer !== null) {
					var value = null;

					switch (propName) {
						case 'currentTime':
							return currentTime;

						case 'duration':
							return duration;

						case 'volume':
							return volume;
						case 'muted':
							return volume === 0;
						case 'paused':
							return paused;
						case 'ended':
							return ended;

						case 'src':
							vimeoPlayer.getVideoUrl().then(function (_url) {
								url = _url;
							});

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

			vimeo['set' + capName] = function (value) {

				if (vimeoPlayer !== null) {

					// do something
					switch (propName) {

						case 'src':
							var _url2 = typeof value === 'string' ? value : value[0].src,
							    videoId = vimeoApi.getVimeoId(_url2);

							vimeoPlayer.loadVideo(videoId).then(function () {
								if (mediaElement.getAttribute('autoplay')) {
									vimeoPlayer.play();
								}
							})['catch'](function (error) {
								errorHandler(error, vimeo);
							});
							break;

						case 'currentTime':
							vimeoPlayer.setCurrentTime(value).then(function () {
								currentTime = value;
								setTimeout(function () {
									var event = mejs.Utils.createEvent('timeupdate', vimeo);
									mediaElement.dispatchEvent(event);
								}, 50);
							})['catch'](function (error) {
								errorHandler(error, vimeo);
							});
							break;

						case 'volume':
							vimeoPlayer.setVolume(value).then(function () {
								volume = value;
								oldVolume = volume;
								setTimeout(function () {
									var event = mejs.Utils.createEvent('volumechange', vimeo);
									mediaElement.dispatchEvent(event);
								}, 50);
							})['catch'](function (error) {
								errorHandler(error, vimeo);
							});
							break;

						case 'loop':
							vimeoPlayer.setLoop(value)['catch'](function (error) {
								errorHandler(error, vimeo);
							});
							break;
						case 'muted':
							if (value) {
								vimeoPlayer.setVolume(0).then(function () {
									volume = 0;
									setTimeout(function () {
										var event = mejs.Utils.createEvent('volumechange', vimeo);
										mediaElement.dispatchEvent(event);
									}, 50);
								})['catch'](function (error) {
									errorHandler(error, vimeo);
								});
							} else {
								vimeoPlayer.setVolume(oldVolume).then(function () {
									volume = oldVolume;
									setTimeout(function () {
										var event = mejs.Utils.createEvent('volumechange', vimeo);
										mediaElement.dispatchEvent(event);
									}, 50);
								})['catch'](function (error) {
									errorHandler(error, vimeo);
								});
							}
							break;
						case 'readyState':
							var event = mejs.Utils.createEvent('canplay', vimeo);
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
			vimeo[methodName] = function () {

				if (vimeoPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							paused = false;
							return vimeoPlayer.play();
						case 'pause':
							paused = true;
							return vimeoPlayer.pause();
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

		// Initial method to register all Vimeo events when initializing <iframe>
		window['__ready__' + vimeo.id] = function (_vimeoPlayer) {

			mediaElement.vimeoPlayer = vimeoPlayer = _vimeoPlayer;

			// do call stack
			if (apiStack.length) {
				for (var _i2 = 0, _total2 = apiStack.length; _i2 < _total2; _i2++) {

					var stackItem = apiStack[_i2];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						vimeo['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						vimeo[stackItem.methodName]();
					}
				}
			}

			var vimeoIframe = document.getElementById(vimeo.id);
			var events = void 0;

			// a few more events
			events = ['mouseover', 'mouseout'];

			var assignEvents = function assignEvents(e) {
				var event = mejs.Utils.createEvent(e.type, vimeo);
				mediaElement.dispatchEvent(event);
			};

			for (var _i3 = 0, _total3 = events.length; _i3 < _total3; _i3++) {
				vimeoIframe.addEventListener(events[_i3], assignEvents, false);
			}

			// Vimeo events
			vimeoPlayer.on('loaded', function () {

				vimeoPlayer.getDuration().then(function (loadProgress) {

					duration = loadProgress;

					if (duration > 0) {
						bufferedTime = duration * loadProgress;
					}

					var event = mejs.Utils.createEvent('loadedmetadata', vimeo);
					mediaElement.dispatchEvent(event);
				})['catch'](function (error) {
					errorHandler(error, vimeo);
				});
			});

			vimeoPlayer.on('progress', function () {
				vimeoPlayer.getDuration().then(function (loadProgress) {

					duration = loadProgress;

					if (duration > 0) {
						bufferedTime = duration * loadProgress;
					}

					var event = mejs.Utils.createEvent('progress', vimeo);
					mediaElement.dispatchEvent(event);
				})['catch'](function (error) {
					errorHandler(error, vimeo);
				});
			});
			vimeoPlayer.on('timeupdate', function () {
				vimeoPlayer.getCurrentTime().then(function (seconds) {
					currentTime = seconds;

					var event = mejs.Utils.createEvent('timeupdate', vimeo);
					mediaElement.dispatchEvent(event);
				})['catch'](function (error) {
					errorHandler(error, vimeo);
				});
			});
			vimeoPlayer.on('play', function () {
				paused = false;
				ended = false;
				var event = mejs.Utils.createEvent('play', vimeo);
				mediaElement.dispatchEvent(event);
			});
			vimeoPlayer.on('pause', function () {
				paused = true;
				ended = false;

				var event = mejs.Utils.createEvent('pause', vimeo);
				mediaElement.dispatchEvent(event);
			});
			vimeoPlayer.on('ended', function () {
				paused = false;
				ended = true;

				var event = mejs.Utils.createEvent('ended', vimeo);
				mediaElement.dispatchEvent(event);
			});

			// give initial events
			events = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

			for (var _i4 = 0, _total4 = events.length; _i4 < _total4; _i4++) {
				var event = mejs.Utils.createEvent(events[_i4], vimeo);
				mediaElement.dispatchEvent(event);
			}
		};

		var height = mediaElement.originalNode.height,
		    width = mediaElement.originalNode.width,
		    vimeoContainer = document.createElement('iframe'),
		    standardUrl = '//player.vimeo.com/video/' + vimeoApi.getVimeoId(mediaFiles[0].src),
		    queryArgs = mediaFiles[0].src.includes('?') ? '?' + mediaFiles[0].src.slice(mediaFiles[0].src.indexOf('?') + 1) : '';

		// Create Vimeo <iframe> markup
		vimeoContainer.setAttribute('id', vimeo.id);
		vimeoContainer.setAttribute('width', width);
		vimeoContainer.setAttribute('height', height);
		vimeoContainer.setAttribute('frameBorder', '0');
		vimeoContainer.setAttribute('src', '' + standardUrl + queryArgs);
		vimeoContainer.setAttribute('webkitallowfullscreen', '');
		vimeoContainer.setAttribute('mozallowfullscreen', '');
		vimeoContainer.setAttribute('allowfullscreen', '');

		mediaElement.originalNode.parentNode.insertBefore(vimeoContainer, mediaElement.originalNode);
		mediaElement.originalNode.style.display = 'none';

		vimeoApi.enqueueIframe({
			iframe: vimeoContainer,
			id: vimeo.id
		});

		vimeo.hide = function () {
			vimeo.pause();
			if (vimeoPlayer) {
				vimeoContainer.style.display = 'none';
			}
		};
		vimeo.setSize = function (width, height) {
			vimeoContainer.setAttribute('width', width);
			vimeoContainer.setAttribute('height', height);
		};
		vimeo.show = function () {
			if (vimeoPlayer) {
				vimeoContainer.style.display = '';
			}
		};

		return vimeo;
	}

};

/**
 * Register Vimeo type based on URL structure
 *
 */
mejs.Utils.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//player.vimeo') || url.includes('vimeo.com') ? 'video/x-vimeo' : null;
});

mejs.Renderers.add(vimeoIframeRenderer);

},{}]},{},[1]);
