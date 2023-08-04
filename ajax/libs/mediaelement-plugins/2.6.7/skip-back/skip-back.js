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

mejs.i18n.en['mejs.time-skip-back'] = ['Skip back 1 second', 'Skip back %1 seconds'];

Object.assign(mejs.MepDefaults, {
	skipBackInterval: 30,

	skipBackText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildskipback: function buildskipback(player, controls, layers, media) {
		var t = this,
		    defaultTitle = mejs.i18n.t('mejs.time-skip-back', t.options.skipBackInterval),
		    skipTitle = mejs.Utils.isString(t.options.skipBackText) ? t.options.skipBackText.replace('%1', t.options.skipBackInterval) : defaultTitle,
		    button = document.createElement('div');

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'skip-back-button';
		button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + skipTitle + '" aria-label="' + skipTitle + '" tabindex="0">' + t.options.skipBackInterval + '</button>';

		t.addControlElement(button, 'skipback');

		button.addEventListener('click', function () {
			var duration = !isNaN(media.duration) ? media.duration : t.options.skipBackInterval;
			if (duration) {
				var current = media.currentTime === Infinity ? 0 : media.currentTime;
				media.setCurrentTime(Math.max(current - t.options.skipBackInterval, 0));
				this.querySelector('button').blur();
			}
		});
	}
});

},{}]},{},[1]);
