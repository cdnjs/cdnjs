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
	facebookPixelTitle: '',

	facebookPixelCategory: 'Videos'
});

Object.assign(MediaElementPlayer.prototype, {
	buildfacebookpixel: function buildfacebookpixel(player, controls, layers, media) {
		player.fbPixelPlay = function () {
			if (typeof fbq !== 'undefined') {
				fbq('trackCustom', player.options.facebookPixelCategory, {
					Event: 'Play',
					Title: player.options.facebookPixelTitle === '' ? player.media.currentSrc : player.options.facebookPixelTitle
				});
			}
		};
		player.fbPixelPause = function () {
			if (typeof fbq !== 'undefined') {
				fbq('trackCustom', player.options.facebookPixelCategory, {
					Event: 'Pause',
					Title: player.options.facebookPixelTitle === '' ? player.media.currentSrc : player.options.facebookPixelTitle
				});
			}
		};
		player.fbPixelEnded = function () {
			if (typeof fbq !== 'undefined') {
				fbq('trackCustom', player.options.facebookPixelCategory, {
					Event: 'Ended',
					Title: player.options.facebookPixelTitle === '' ? player.media.currentSrc : player.options.facebookPixelTitle
				});
			}
		};

		media.addEventListener('play', player.fbPixelPlay);
		media.addEventListener('pause', player.fbPixelPause);
		media.addEventListener('ended', player.fbPixelEnded);
	},
	cleanfacebookpixel: function cleanfacebookpixel(player, controls, layers, media) {
		media.removeEventListener('play', player.fbPixelPlay);
		media.removeEventListener('pause', player.fbPixelPause);
		media.removeEventListener('ended', player.fbPixelEnded);
	}
});

},{}]},{},[1]);
