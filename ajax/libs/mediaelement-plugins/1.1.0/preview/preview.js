(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Preview feature
 *
 * This feature allows to create a preview effect on videos (playing on hover and with possibility of mute/fade-in/fade-out audio)
 */

// Feature configuration

Object.assign(mejs.MepDefaults, {
	/**
  * Media starts playing when users mouse hovers on it, and resets when leaving player area
  * @type {Boolean}
  */
	previewMode: false,
	/**
  * When playing on preview mode, turn on/off audio completely
  * @type {Boolean}
  */
	muteOnPreviewMode: true,
	/**
  * If fade in set in, time when it starts fading in
  * @type {Number}
  */
	fadeInAudioStart: 0,
	/**
  * When playing media, time interval to fade in audio (must be greater than zero)
  * @type {Number}
  */
	fadeInAudioInterval: 0,
	/**
  * If fade out set in, time when it starts fading out
  * @type {Number}
  */
	fadeOutAudioStart: 0,
	/**
  * When playing media, time interval to fade out audio (must be greater than zero)
  * @type {Number}
  */
	fadeOutAudioInterval: 0,
	/**
  * Percentage in decimals in which media will fade in/out (i.e., 0.02 = 2%)
  * @type {Number}
  */
	fadePercent: 0.02
});

Object.assign(MediaElementPlayer.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildpreview: function buildpreview(player, controls, layers, media) {
		var t = this;

		// fade-in/out should be available for both video/audio
		t.media.addEventListener('timeupdate', function () {
			if (t.options.fadeInAudioInterval && Math.floor(t.media.currentTime) === t.options.fadeInAudioStart) {
				(function () {

					t.media.setVolume(0);

					var volume = 0,
					    audioInterval = t.options.fadeInAudioInterval,
					    interval = setInterval(function () {

						// Increase volume by step as long as it is below 1

						if (volume < 1) {
							volume += t.options.fadePercent;
							if (volume > 1) {
								volume = 1;
							}

							// limit to 2 decimal places
							t.media.setVolume(volume.toFixed(2));
						} else {
							// Stop firing interval when 1 is reached
							clearInterval(interval);
						}
					}, audioInterval);
				})();
			}

			if (t.options.fadeOutAudioInterval && Math.floor(t.media.currentTime) === t.options.fadeOutAudioStart) {
				(function () {

					t.media.setVolume(1);

					var volume = 1,
					    audioInterval = t.options.fadeOutAudioInterval,
					    interval = setInterval(function () {

						// Increase volume by step as long as it is above 0

						if (volume > 0) {
							volume -= t.options.fadePercent;
							if (volume < 0) {
								volume = 0;
							}

							// limit to 2 decimal places
							t.media.setVolume(volume.toFixed(2));
						} else {
							// Stop firing interval when 0 is reached
							clearInterval(interval);
						}
					}, audioInterval);
				})();
			}
		});

		// preview is only for video
		if (!player.isVideo) {
			return;
		}

		// show/hide controls
		$('body').on('mouseover', function (e) {

			if ($(e.target).is(t.container) || $(e.target).closest(t.container).length) {
				if (t.options.muteOnPreviewMode) {
					t.media.setMuted(true);
				}

				if (t.media.paused) {
					t.media.play();
				}
			}
		}).on('mouseout', function (e) {

			if (!$(e.target).is(t.container) && !$(e.target).closest(t.container).length) {
				if (!t.media.paused) {
					t.media.pause();
					t.media.setCurrentTime(0);
				}
			}
		});
	}
});

},{}]},{},[1]);
