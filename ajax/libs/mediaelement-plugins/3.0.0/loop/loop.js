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

mejs.i18n.en['mejs.loop'] = 'Toggle Loop';

Object.assign(mejs.MepDefaults, {
	loopText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildloop: function buildloop(player) {
		var t = this,
		    loopTitle = mejs.Utils.isString(t.options.loopText) ? t.options.loopText : mejs.i18n.t('mejs.loop'),
		    loop = document.createElement('div');

		loop.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'loop-button ' + (player.options.loop ? t.options.classPrefix + 'loop-on' : t.options.classPrefix + 'loop-off');
		loop.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + loopTitle + '" aria-label="' + loopTitle + '" tabindex="0"></button>';

		t.addControlElement(loop, 'loop');

		loop.addEventListener('click', function () {
			player.options.loop = !player.options.loop;
			if (player.options.loop) {
				mejs.Utils.removeClass(loop, t.options.classPrefix + 'loop-off');
				mejs.Utils.addClass(loop, t.options.classPrefix + 'loop-on');
			} else {
				mejs.Utils.removeClass(loop, t.options.classPrefix + 'loop-on');
				mejs.Utils.addClass(loop, t.options.classPrefix + 'loop-off');
			}
		});
	}
});

},{}]},{},[1]);
