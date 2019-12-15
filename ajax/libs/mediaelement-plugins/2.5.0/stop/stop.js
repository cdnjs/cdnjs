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

mejs.i18n.en['mejs.stop'] = 'Stop';

Object.assign(mejs.MepDefaults, {
	stopText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildstop: function buildstop(player, controls, layers, media) {
		var t = this,
		    stopTitle = mejs.Utils.isString(t.options.stopText) ? t.options.stopText : mejs.i18n.t('mejs.stop'),
		    button = document.createElement('div');

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'stop-button ' + t.options.classPrefix + 'stop';
		button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + stopTitle + '" aria-label="' + stopTitle + '" tabindex="0"></button>';

		t.addControlElement(button, 'stop');

		button.addEventListener('click', function () {
			if (typeof media.stop === 'function') {
				media.stop();
			} else if (media.readyState > 0) {
				if (!media.paused) {
					media.pause();
				}

				media.setSrc('');
				media.load();

				var playButton = controls.querySelector('.' + t.options.classPrefix + 'playpause-button');
				mejs.Utils.removeClass(playButton, t.options.classPrefix + 'pause');
				mejs.Utils.addClass(playButton, t.options.classPrefix + 'play');

				if (t.container.querySelector('.' + t.options.classPrefix + 'cannotplay')) {
					t.container.querySelector('.' + t.options.classPrefix + 'cannotplay').remove();
					layers.querySelector('.' + t.options.classPrefix + 'overlay-error').parentNode.style.display = 'none';
					layers.querySelector('.' + t.options.classPrefix + 'overlay-error').remove();
				}
			}

			var event = mejs.Utils.createEvent('timeupdate', media);
			media.dispatchEvent(event);
		});
	}
});

},{}]},{},[1]);
