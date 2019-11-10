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
