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

mejs.i18n.en['mejs.time-jump-forward'] = ['Jump forward 1 second', 'Jump forward %1 seconds'];

Object.assign(mejs.MepDefaults, {
	jumpForwardInterval: 30,

	jumpForwardText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildjumpforward: function buildjumpforward(player, controls, layers, media) {

		var t = this,
		    defaultTitle = mejs.i18n.t('mejs.time-jump-forward', t.options.jumpForwardInterval),
		    forwardTitle = mejs.Utils.isString(t.options.jumpForwardText) ? t.options.jumpForwardText.replace('%1', t.options.jumpForwardInterval) : defaultTitle,
		    button = document.createElement('div');

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'jump-forward-button';
		button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + forwardTitle + '" aria-label="' + forwardTitle + '" tabindex="0">' + t.options.jumpForwardInterval + '</button>';

		t.addControlElement(button, 'jumpforward');

		button.addEventListener('click', function () {
			var duration = !isNaN(media.duration) ? media.duration : t.options.jumpForwardInterval;
			if (duration) {
				var current = media.currentTime === Infinity ? 0 : media.currentTime;
				media.setCurrentTime(Math.min(current + t.options.jumpForwardInterval, duration));
				this.querySelector('button').blur();
			}
		});
	}
});

},{}]},{},[1]);
