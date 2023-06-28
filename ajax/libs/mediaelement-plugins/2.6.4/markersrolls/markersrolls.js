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
	markersRollsColor: '#E9BC3D',

	markersRollsWidth: 1,

	markersRolls: {}
});

Object.assign(MediaElementPlayer.prototype, {
	buildmarkersrolls: function buildmarkersrolls(player, controls, layers, media) {
		var currentPosition = -1,
		    lastPlayedPosition = -1,
		    lastMarkerRollCallback = -1,
		    markersCount = Object.keys(player.options.markersRolls).length;

		if (!markersCount) {
			return;
		}

		for (var i = 0, total = markersCount; i < total; ++i) {
			var marker = document.createElement('span');

			marker.className = this.options.classPrefix + 'time-marker';
			controls.querySelector('.' + this.options.classPrefix + 'time-total').appendChild(marker);
		}

		var markersRollsLayer = document.createElement('iframe');
		markersRollsLayer.frameBorder = '0';
		markersRollsLayer.className = this.options.classPrefix + 'markersrolls-layer' + ' ' + (this.options.classPrefix + 'overlay') + ' ' + (this.options.classPrefix + 'layer');
		markersRollsLayer.style.display = 'none';
		markersRollsLayer.style.backgroundColor = '#9F9F9F';
		markersRollsLayer.style.border = '0 none';
		markersRollsLayer.style.boxShadow = '#B0B0B0 0px 0px 20px -10px inset';
		markersRollsLayer.style.paddingBottom = '40px';

		layers.appendChild(markersRollsLayer);

		media.addEventListener('durationchange', function () {
			player.setmarkersrolls(controls);
		});
		media.addEventListener('timeupdate', function () {
			currentPosition = Math.floor(media.currentTime);

			if (lastPlayedPosition > currentPosition) {
				if (lastMarkerRollCallback > currentPosition) {
					lastMarkerRollCallback = -1;
				}
			} else {
				lastPlayedPosition = currentPosition;
			}

			if (0 === markersCount || !player.options.markersRolls[currentPosition] || currentPosition === lastMarkerRollCallback) {
				return;
			}

			lastMarkerRollCallback = currentPosition;

			media.pause();

			markersRollsLayer.src = player.options.markersRolls[currentPosition];
			markersRollsLayer.style.display = 'block';
		}, false);
		media.addEventListener('play', function () {
			markersRollsLayer.style.display = 'none';
			markersRollsLayer.src = '';
		}, false);
	},
	setmarkersrolls: function setmarkersrolls(controls) {
		var markersRolls = controls.querySelectorAll('.' + this.options.classPrefix + 'time-marker');

		var i = 0;

		for (var position in this.options.markersRolls) {
			if (!this.options.markersRolls.hasOwnProperty(position)) {
				continue;
			}

			position = parseInt(position);

			if (position >= this.media.duration || position < 0) {
				continue;
			}

			var left = 100 * position / this.media.duration,
			    marker = markersRolls[i];

			marker.style.width = this.options.markersRollsWidth + 'px';
			marker.style.left = left + '%';
			marker.style.background = this.options.markersRollsColor;

			i++;
		}
	}
});

},{}]},{},[1]);
