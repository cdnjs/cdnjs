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
