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

Object.assign(mejs.MepDefaults, {
	googleAnalyticsTitle: '',

	googleAnalyticsCategory: 'Videos',

	googleAnalyticsEventPlay: 'Play',

	googleAnalyticsEventPause: 'Pause',

	googleAnalyticsEventEnded: 'Ended',

	googleAnalyticsEventTime: 'Time'
});

Object.assign(MediaElementPlayer.prototype, {
	buildgoogleanalytics: function buildgoogleanalytics(player, controls, layers, media) {

		media.addEventListener('play', function () {
			if (typeof ga !== 'undefined') {
				ga('send', 'event', player.options.googleAnalyticsCategory, player.options.googleAnalyticsEventPlay, player.options.googleAnalyticsTitle === '' ? player.media.currentSrc : player.options.googleAnalyticsTitle);
			}
		}, false);

		media.addEventListener('pause', function () {
			if (typeof ga !== 'undefined') {
				ga('send', 'event', player.options.googleAnalyticsCategory, player.options.googleAnalyticsEventPause, player.options.googleAnalyticsTitle === '' ? player.media.currentSrc : player.options.googleAnalyticsTitle);
			}
		}, false);

		media.addEventListener('ended', function () {
			if (typeof ga !== 'undefined') {
				ga('send', 'event', player.options.googleAnalyticsCategory, player.options.googleAnalyticsEventEnded, player.options.googleAnalyticsTitle === '' ? player.media.currentSrc : player.options.googleAnalyticsTitle);
			}
		}, false);
	}
});

},{}]},{},[1]);
