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
	markerColor: '#E9BC3D',

	markerWidth: 1,

	markers: [],
	markerCallback: function markerCallback() {}
});

Object.assign(MediaElementPlayer.prototype, {
	buildmarkers: function buildmarkers(player, controls, layers, media) {

		if (!player.options.markers.length) {
			return;
		}

		var t = this,
		    currentPos = -1,
		    currentMarker = -1,
		    lastPlayPos = -1,
		    lastMarkerCallBack = -1;

		for (var i = 0, total = player.options.markers.length; i < total; ++i) {
			var marker = document.createElement('span');
			marker.className = t.options.classPrefix + 'time-marker';
			controls.querySelector('.' + t.options.classPrefix + 'time-total').appendChild(marker);
		}

		media.addEventListener('durationchange', function () {
			player.setmarkers(controls);
		});
		media.addEventListener('timeupdate', function () {
			currentPos = Math.floor(media.currentTime);
			if (lastPlayPos > currentPos) {
				if (lastMarkerCallBack > currentPos) {
					lastMarkerCallBack = -1;
				}
			} else {
				lastPlayPos = currentPos;
			}

			if (player.options.markers.length) {
				for (var _i = 0, _total = player.options.markers.length; _i < _total; ++_i) {
					currentMarker = Math.floor(player.options.markers[_i]);
					if (currentPos === currentMarker && currentMarker !== lastMarkerCallBack) {
						player.options.markerCallback(media, media.currentTime);
						lastMarkerCallBack = currentMarker;
					}
				}
			}
		}, false);
	},
	setmarkers: function setmarkers(controls) {

		var t = this,
		    markers = controls.querySelectorAll('.' + t.options.classPrefix + 'time-marker');

		for (var i = 0, total = t.options.markers.length; i < total; ++i) {
			if (Math.floor(t.options.markers[i]) <= t.media.duration && Math.floor(t.options.markers[i]) >= 0) {
				var left = 100 * Math.floor(t.options.markers[i]) / t.media.duration,
				    marker = markers[i];

				marker.style.width = t.options.markerWidth + 'px';
				marker.style.left = left + '%';
				marker.style.background = t.options.markerColor;
			}
		}
	}
});

},{}]},{},[1]);
