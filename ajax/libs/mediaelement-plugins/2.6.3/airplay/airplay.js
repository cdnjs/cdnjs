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
	airPlayText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildairplay: function buildairplay() {
		if (!window.WebKitPlaybackTargetAvailabilityEvent) {
			return;
		}

		var t = this,
		    airPlayTitle = mejs.Utils.isString(t.options.airPlayText) ? t.options.airPlayText : 'AirPlay',
		    button = document.createElement('div');

		button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'airplay-button';
		button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + airPlayTitle + '" aria-label="' + airPlayTitle + '" tabindex="0"></button>';

		button.addEventListener('click', function () {
			t.media.originalNode.webkitShowPlaybackTargetPicker();
		});

		var acceptAirPlay = t.media.originalNode.getAttribute('x-webkit-airplay');
		if (!acceptAirPlay || acceptAirPlay !== 'allow') {
			t.media.originalNode.setAttribute('x-webkit-airplay', 'allow');
		}

		t.media.originalNode.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', function () {
			var name = t.media.originalNode.webkitCurrentPlaybackTargetIsWireless ? 'Started' : 'Stopped',
			    status = t.media.originalNode.webkitCurrentPlaybackTargetIsWireless ? 'active' : '',
			    icon = button.querySelector('button'),
			    event = mejs.Utils.createEvent('airplay' + name, t.media);
			t.media.dispatchEvent(event);

			if (status === 'active') {
				mejs.Utils.addClass(icon, 'active');
			} else {
				mejs.Utils.removeClass(icon, 'active');
			}
		});

		t.media.originalNode.addEventListener('webkitplaybacktargetavailabilitychanged', function (e) {
			if (e.availability === 'available') {
				t.addControlElement(button, 'airplay');
			}
		});
	}
});

},{}]},{},[1]);
