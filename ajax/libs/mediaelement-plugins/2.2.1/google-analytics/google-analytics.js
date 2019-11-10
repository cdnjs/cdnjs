(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Google Analytics Plugin
 *
 * This feature enables GA to send certain events, such as play, pause, ended, etc. It requires previous configuration
 * on GA to send events properly.
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 */

// Feature configuration

Object.assign(mejs.MepDefaults, {
	/**
  * @type {String}
  */
	googleAnalyticsTitle: '',
	/**
  * @type {String}
  */
	googleAnalyticsCategory: 'Videos',
	/**
  * @type {String}
  */
	googleAnalyticsEventPlay: 'Play',
	/**
  * @type {String}
  */
	googleAnalyticsEventPause: 'Pause',
	/**
  * @type {String}
  */
	googleAnalyticsEventEnded: 'Ended',
	/**
  * @type {String}
  */
	googleAnalyticsEventTime: 'Time'
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
