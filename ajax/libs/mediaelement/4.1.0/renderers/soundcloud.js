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
 * SoundCloud renderer
 *
 * Uses <iframe> approach and uses SoundCloud Widget API to manipulate it.
 * @see https://developers.soundcloud.com/docs/api/html5-widget
 */

var SoundCloudApi = {
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

		if (SoundCloudApi.isLoaded) {
			SoundCloudApi.createIframe(settings);
		} else {
			SoundCloudApi.loadIframeApi();
			SoundCloudApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load SoundCloud API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {
		if (!SoundCloudApi.isSDKStarted) {

			var head = document.getElementsByTagName("head")[0] || document.documentElement,
			    script = document.createElement("script");

			var done = false;

			script.src = '//w.soundcloud.com/player/api.js';

			// Attach handlers for all browsers
			// Is onload enough now? do IE9 support it?
			script.onload = script.onreadystatechange = function () {
				if (!done && (!SoundCloudApi.readyState || SoundCloudApi.readyState === "loaded" || SoundCloudApi.readyState === "complete")) {
					done = true;
					SoundCloudApi.apiReady();

					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
					script.remove();
				}
			};
			head.appendChild(script);
			SoundCloudApi.isSDKStarted = true;
		}
	},

	/**
  * Process queue of SoundCloud <iframe> element creation
  *
  */
	apiReady: function apiReady() {
		SoundCloudApi.isLoaded = true;
		SoundCloudApi.isSDKLoaded = true;

		while (SoundCloudApi.iframeQueue.length > 0) {
			var settings = SoundCloudApi.iframeQueue.pop();
			SoundCloudApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of SoundCloud Widget player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {
		var player = SC.Widget(settings.iframe);
		window['__ready__' + settings.id](player);
	}
};

var SoundCloudIframeRenderer = {
	name: 'soundcloud_iframe',

	options: {
		prefix: 'soundcloud_iframe'
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/soundcloud', 'video/x-soundcloud'].includes(type);
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

		// create our fake element that allows events and such to work
		var sc = {},
		    apiStack = [],
		    readyState = 4,
		    autoplay = mediaElement.originalNode.autoplay;

		var duration = 0,
		    currentTime = 0,
		    bufferedTime = 0,
		    volume = 1,
		    muted = false,
		    paused = true,
		    ended = false,
		    scPlayer = null,
		    scIframe = null;

		// store main variable
		sc.options = options;
		sc.id = mediaElement.id + '_' + options.prefix;
		sc.mediaElement = mediaElement;

		// wrappers for get/set
		var props = mejs.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = "" + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			sc["get" + capName] = function () {
				if (scPlayer !== null) {
					var value = null;

					// figure out how to get dm dta here
					switch (propName) {
						case 'currentTime':
							return currentTime;

						case 'duration':
							return duration;

						case 'volume':
							return volume;

						case 'paused':
							return paused;

						case 'ended':
							return ended;

						case 'muted':
							return muted; // ?

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
						case 'src':
							return scIframe ? scIframe.src : '';

						case 'readyState':
							return readyState;
					}

					return value;
				} else {
					return null;
				}
			};

			sc["set" + capName] = function (value) {

				if (scPlayer !== null) {

					// do something
					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src;

							scPlayer.load(url);

							if (autoplay) {
								scPlayer.play();
							}
							break;

						case 'currentTime':
							scPlayer.seekTo(value * 1000);
							break;

						case 'muted':
							if (value) {
								scPlayer.setVolume(0); // ?
							} else {
								scPlayer.setVolume(1); // ?
							}
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', sc);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							scPlayer.setVolume(value);
							setTimeout(function () {
								var event = mejs.Utils.createEvent('volumechange', sc);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'readyState':
							var event = mejs.Utils.createEvent('canplay', sc);
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

			// run the method on the Soundcloud API
			sc[methodName] = function () {

				if (scPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return scPlayer.play();
						case 'pause':
							return scPlayer.pause();
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

		// add a ready method that SC can fire
		window['__ready__' + sc.id] = function (_scPlayer) {

			mediaElement.scPlayer = scPlayer = _scPlayer;

			if (autoplay) {
				scPlayer.play();
			}

			// do call stack
			if (apiStack.length) {
				for (var _i2 = 0, _total2 = apiStack.length; _i2 < _total2; _i2++) {

					var stackItem = apiStack[_i2];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = "" + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						sc["set" + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						sc[stackItem.methodName]();
					}
				}
			}

			// SoundCloud properties are async, so we don't fire the event until the property callback fires
			scPlayer.bind(SC.Widget.Events.PLAY_PROGRESS, function () {
				paused = false;
				ended = false;

				scPlayer.getPosition(function (_currentTime) {
					currentTime = _currentTime / 1000;
					var event = mejs.Utils.createEvent('timeupdate', sc);
					mediaElement.dispatchEvent(event);
				});
			});

			scPlayer.bind(SC.Widget.Events.PAUSE, function () {
				paused = true;

				var event = mejs.Utils.createEvent('pause', sc);
				mediaElement.dispatchEvent(event);
			});
			scPlayer.bind(SC.Widget.Events.PLAY, function () {
				paused = false;
				ended = false;

				var event = mejs.Utils.createEvent('play', sc);
				mediaElement.dispatchEvent(event);
			});
			scPlayer.bind(SC.Widget.Events.FINISHED, function () {
				paused = false;
				ended = true;

				var event = mejs.Utils.createEvent('ended', sc);
				mediaElement.dispatchEvent(event);
			});
			scPlayer.bind(SC.Widget.Events.READY, function () {
				scPlayer.getDuration(function (_duration) {
					duration = _duration / 1000;

					var event = mejs.Utils.createEvent('loadedmetadata', sc);
					mediaElement.dispatchEvent(event);
				});
			});
			scPlayer.bind(SC.Widget.Events.LOAD_PROGRESS, function () {
				scPlayer.getDuration(function (loadProgress) {
					if (duration > 0) {
						bufferedTime = duration * loadProgress;

						var event = mejs.Utils.createEvent('progress', sc);
						mediaElement.dispatchEvent(event);
					}
				});
				scPlayer.getDuration(function (_duration) {
					duration = _duration;

					var event = mejs.Utils.createEvent('loadedmetadata', sc);
					mediaElement.dispatchEvent(event);
				});
			});

			// give initial events
			var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

			for (var _i3 = 0, _total3 = initEvents.length; _i3 < _total3; _i3++) {
				var event = mejs.Utils.createEvent(initEvents[_i3], sc);
				mediaElement.dispatchEvent(event);
			}
		};

		// container for API API
		scIframe = document.createElement('iframe');
		scIframe.id = sc.id;
		scIframe.width = 10;
		scIframe.height = 10;
		scIframe.frameBorder = 0;
		scIframe.style.visibility = 'hidden';
		scIframe.src = mediaFiles[0].src;
		scIframe.scrolling = 'no';

		mediaElement.appendChild(scIframe);
		mediaElement.originalNode.style.display = 'none';

		var scSettings = {
			iframe: scIframe,
			id: sc.id
		};

		SoundCloudApi.enqueueIframe(scSettings);

		sc.setSize = function () {};
		sc.hide = function () {
			sc.pause();
			if (scIframe) {
				scIframe.style.display = 'none';
			}
		};
		sc.show = function () {
			if (scIframe) {
				scIframe.style.display = '';
			}
		};
		sc.destroy = function () {
			scPlayer.destroy();
		};

		return sc;
	}
};

/**
 * Register SoundCloud type based on URL structure
 *
 */
mejs.Utils.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//soundcloud.com') || url.includes('//w.soundcloud.com') ? 'video/x-soundcloud' : null;
});

mejs.Renderers.add(SoundCloudIframeRenderer);

},{}]},{},[1]);
