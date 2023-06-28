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
	previewMode: false,

	muteOnPreviewMode: true,

	fadeInAudioStart: 0,

	fadeInAudioInterval: 0,

	fadeOutAudioStart: 0,

	fadeOutAudioInterval: 0,

	fadePercent: 0.02,

	pauseOnlyOnPreview: false,

	delayPreview: 0
});

Object.assign(MediaElementPlayer.prototype, {
	buildpreview: function buildpreview(player) {
		var initFadeIn = false,
		    initFadeOut = false,
		    timeout = void 0,
		    mouseOver = false;

		var t = this,
		    fadeInCallback = function fadeInCallback() {
			if (t.options.fadeInAudioInterval) {

				if (Math.floor(t.media.currentTime) < t.options.fadeIntAudioStart) {
					t.media.setVolume(0);
					t.media.setMuted(true);
				}

				if (Math.floor(t.media.currentTime) === t.options.fadeInAudioStart) {

					initFadeIn = true;

					var volume = 0,
					    audioInterval = t.options.fadeInAudioInterval,
					    interval = setInterval(function () {
						if (volume < 1) {
							volume += t.options.fadePercent;
							if (volume > 1) {
								volume = 1;
							}

							t.media.setVolume(volume.toFixed(2));
						} else {
							clearInterval(interval);
							interval = null;
							t.media.setMuted(false);
							setTimeout(function () {
								initFadeIn = false;
							}, 300);
						}
					}, audioInterval);
				}
			}
		},
		    fadeOutCallback = function fadeOutCallback() {
			if (t.options.fadeOutAudioInterval) {

				if (Math.floor(t.media.currentTime) < t.options.fadeOutAudioStart) {
					t.media.setVolume(1);
					t.media.setMuted(false);
				}

				if (Math.floor(t.media.currentTime) === t.options.fadeOutAudioStart) {

					initFadeOut = true;

					var volume = 1,
					    audioInterval = t.options.fadeOutAudioInterval,
					    interval = setInterval(function () {

						if (volume > 0) {
							volume -= t.options.fadePercent;
							if (volume < 0) {
								volume = 0;
							}

							t.media.setVolume(volume.toFixed(2));
						} else {
							clearInterval(interval);
							interval = null;
							t.media.setMuted(false);
							setTimeout(function () {
								initFadeOut = false;
							}, 300);
						}
					}, audioInterval);
				}
			}
		};

		if (t.options.muteOnPreviewMode || t.options.fadeInAudioInterval) {
			t.media.setVolume(0);
			t.media.setMuted(true);
		} else if (t.options.fadeOutAudioInterval) {
			t.media.setVolume(1);
			t.media.setMuted(false);
		}

		t.media.addEventListener('timeupdate', function () {

			if (initFadeIn) {
				t.media.removeEventListener('timeupdate', fadeInCallback);
				return;
			}

			if (initFadeOut) {
				t.media.removeEventListener('timeupdate', fadeOutCallback);
				return;
			}

			fadeInCallback();
			fadeOutCallback();
		});

		if (!player.isVideo) {
			return;
		}

		document.body.addEventListener('mouseover', function (e) {

			if (e.target === t.container || e.target.closest('.' + t.options.classPrefix + 'container')) {
				mouseOver = true;
				t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'flex';
				t.container.querySelector('.' + t.options.classPrefix + 'overlay-play').style.display = 'none';
				if (t.media.paused) {
					timeout = setTimeout(function () {
						if (mouseOver) {
							t.media.play();
						} else {
							clearTimeout(timeout);
							timeout = null;
						}
						t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'none';
					}, t.options.delayPreview);
				} else {
					t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'none';
				}
			} else {
				mouseOver = false;
				clearTimeout(timeout);
				timeout = null;
				if (!t.media.paused) {
					t.media.pause();
				}
				t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'none';
			}
		});
		document.body.addEventListener('mouseout', function (e) {
			if (!(e.target === t.container) && !e.target.closest('.' + t.options.classPrefix + 'container')) {
				mouseOver = false;
				t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'none';
				if (!t.media.paused) {
					t.media.pause();

					if (!t.options.pauseOnlyOnPreview) {
						t.media.setCurrentTime(0);
					}
				}

				clearTimeout(timeout);
				timeout = null;
			}
		});

		window.addEventListener('scroll', function () {
			mouseOver = false;
			t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'none';
			if (!t.media.paused) {
				t.media.pause();
			}
		});
	}
});

},{}]},{},[1]);
