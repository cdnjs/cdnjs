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
