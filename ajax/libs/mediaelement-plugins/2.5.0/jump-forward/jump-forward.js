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
