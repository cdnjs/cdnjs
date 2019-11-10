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

mejs.i18n.en['mejs.ad-skip'] = 'Skip ad';
mejs.i18n.en['mejs.ad-skip-info'] = ['Skip in 1 second', 'Skip in %1 seconds'];

Object.assign(mejs.MepDefaults, {
	adsPrerollMediaUrl: [],

	adsPrerollAdUrl: [],

	adsPrerollAdEnableSkip: false,

	adsPrerollAdSkipSeconds: -1,

	indexPreroll: 0
});

Object.assign(MediaElementPlayer.prototype, {
	adsLoaded: false,

	adsDataIsLoading: false,

	adsCurrentMediaUrl: '',
	adsCurrentMediaDuration: 0,

	adsPlayerHasStarted: false,

	buildads: function buildads(player, controls, layers) {

		var t = this;

		if (t.adsLoaded) {
			return;
		} else {
			t.adsLoaded = true;
		}

		player.adsLayer = document.createElement('div');
		player.adsLayer.className = t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'ads';
		player.adsLayer.innerHTML = '<a href="#" target="_blank"></a>' + ('<div class="' + t.options.classPrefix + 'ads-skip-block">') + ('<span class="' + t.options.classPrefix + 'ads-skip-message"></span>') + ('<span class="' + t.options.classPrefix + 'ads-skip-button">' + mejs.i18n.t('mejs.ad-skip') + '</span>') + '</div>';
		player.adsLayer.style.display = 'none';

		layers.insertBefore(player.adsLayer, layers.querySelector('.' + t.options.classPrefix + 'overlay-play'));

		player.adsLayer.querySelector('a').addEventListener('click', t.adsAdClick.bind(t));

		player.adsSkipBlock = player.adsLayer.querySelector('.' + t.options.classPrefix + 'ads-skip-block');
		player.adsSkipBlock.style.display = 'none';
		player.adsSkipMessage = player.adsLayer.querySelector('.' + t.options.classPrefix + 'ads-skip-message');
		player.adsSkipMessage.style.display = 'none';
		player.adsSkipButton = player.adsLayer.querySelector('.' + t.options.classPrefix + 'ads-skip-button');
		player.adsSkipButton.addEventListener('click', t.adsSkipClick.bind(t));

		t.adsMediaTryingToStartProxy = t.adsMediaTryingToStart.bind(t);
		t.adsPrerollStartedProxy = t.adsPrerollStarted.bind(t);
		t.adsPrerollMetaProxy = t.adsPrerollMeta.bind(t);
		t.adsPrerollUpdateProxy = t.adsPrerollUpdate.bind(t);
		t.adsPrerollVolumeProxy = t.adsPrerollVolume.bind(t);
		t.adsPrerollEndedProxy = t.adsPrerollEnded.bind(t);

		t.media.addEventListener('rendererready', function () {
			var iframe = t.media.querySelector('iframe');
			if (iframe) {
				iframe.style.display = 'none';
			}
		});

		t.media.addEventListener('play', t.adsMediaTryingToStartProxy);
		t.media.addEventListener('playing', t.adsMediaTryingToStartProxy);
		t.media.addEventListener('canplay', t.adsMediaTryingToStartProxy);
		t.media.addEventListener('loadedmetadata', t.adsMediaTryingToStartProxy);

		if (t.options.indexPreroll < t.options.adsPrerollMediaUrl.length) {
			t.adsStartPreroll();
		}
	},
	adsMediaTryingToStart: function adsMediaTryingToStart() {

		var t = this;

		if (t.adsDataIsLoading && !t.paused && t.options.indexPreroll < t.options.adsPrerollMediaUrl.length) {
			t.pause();
		}

		t.adsPlayerHasStarted = true;
	},
	adsStartPreroll: function adsStartPreroll() {

		var t = this;

		t.media.addEventListener('loadedmetadata', t.adsPrerollMetaProxy);
		t.media.addEventListener('playing', t.adsPrerollStartedProxy);
		t.media.addEventListener('ended', t.adsPrerollEndedProxy);
		t.media.addEventListener('timeupdate', t.adsPrerollUpdateProxy);
		t.media.addEventListener('volumechange', t.adsPrerollVolumeProxy);

		if (t.options.indexPreroll === 0) {
			t.adsCurrentMediaUrl = t.media.originalNode.src;
			t.adsCurrentMediaDuration = t.duration;
		}

		t.setSrc(t.options.adsPrerollMediaUrl[t.options.indexPreroll]);
		t.load();

		var controlElements = t.container.querySelector('.' + t.options.classPrefix + 'controls').children;
		for (var i = 0, total = controlElements.length; i < total; i++) {
			var target = controlElements[i],
			    button = target.querySelector('button');
			if (button && !mejs.Utils.hasClass(target, t.options.classPrefix + 'playpause-button') && !mejs.Utils.hasClass(target, t.options.classPrefix + 'chromecast-button')) {
				button.disabled = true;
				target.style.pointerEvents = 'none';
			} else if (target.querySelector('.' + t.options.classPrefix + 'time-slider')) {
				target.querySelector('.' + t.options.classPrefix + 'time-slider').style.pointerEvents = 'none';
			}
		}

		if (t.adsPlayerHasStarted) {
			setTimeout(function () {
				t.play();
			}, 100);
		}
	},
	adsPrerollMeta: function adsPrerollMeta() {

		var t = this;

		var newDuration = 0;

		if (t.options.duration > 0) {
			newDuration = t.options.duration;
		} else if (!isNaN(t.adsCurrentMediaDuration)) {
			newDuration = t.adsCurrentMediaDuration;
		}

		if (t.controls.querySelector('.' + t.options.classPrefix + 'duration')) {
			setTimeout(function () {
				t.controls.querySelector('.' + t.options.classPrefix + 'duration').innerHTML = mejs.Utils.secondsToTimeCode(newDuration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength);
			}, 250);
		}

		var event = mejs.Utils.createEvent('mejsprerollinitialized', t.container);
		t.container.dispatchEvent(event);
	},
	adsPrerollStarted: function adsPrerollStarted() {
		var t = this;

		t.media.removeEventListener('playing', t.adsPrerollStartedProxy);

		t.adsLayer.style.display = 'block';
		if (t.options.adsPrerollAdUrl[t.options.indexPreroll]) {
			t.adsLayer.querySelector('a').href = t.options.adsPrerollAdUrl[t.options.indexPreroll];
		} else {
			t.adsLayer.querySelector('a').href = '#';
			t.adsLayer.querySelector('a').setAttribute('target', '');
		}

		if (t.options.adsPrerollAdEnableSkip) {
			t.adsSkipBlock.style.display = 'block';

			if (t.options.adsPrerollAdSkipSeconds > 0) {
				t.adsSkipMessage.innerHTML = mejs.i18n.t('mejs.ad-skip-info', t.options.adsPrerollAdSkipSeconds);
				t.adsSkipMessage.style.display = 'block';
				t.adsSkipButton.style.display = 'none';
			} else {
				t.adsSkipMessage.style.display = 'none';
				t.adsSkipButton.style.display = 'block';
			}
		} else {
			t.adsSkipBlock.style.display = 'none';
		}

		var event = mejs.Utils.createEvent('mejsprerollstarted', t.container);
		t.container.dispatchEvent(event);
	},
	adsPrerollUpdate: function adsPrerollUpdate() {
		var t = this;

		if (t.options.adsPrerollAdEnableSkip && t.options.adsPrerollAdSkipSeconds > 0) {
			if (t.currentTime > t.options.adsPrerollAdSkipSeconds) {
				t.adsSkipButton.style.display = 'block';
				t.adsSkipMessage.style.display = 'none';
			} else {
				t.adsSkipMessage.innerHTML = mejs.i18n.t('mejs.ad-skip-info', Math.round(t.options.adsPrerollAdSkipSeconds - t.currentTime));
			}
		}

		var event = mejs.Utils.createEvent('mejsprerolltimeupdate', t.container);
		event.detail.duration = t.duration;
		event.detail.currentTime = t.currentTime;
		t.container.dispatchEvent(event);
	},
	adsPrerollVolume: function adsPrerollVolume() {
		var t = this;

		var event = mejs.Utils.createEvent('mejsprerollvolumechanged', t.container);
		t.container.dispatchEvent(event);
	},
	adsPrerollEnded: function adsPrerollEnded() {
		var t = this;

		t.media.removeEventListener('ended', t.adsPrerollEndedProxy);

		setTimeout(function () {
			t.options.indexPreroll++;
			if (t.options.indexPreroll < t.options.adsPrerollMediaUrl.length) {
				t.adsStartPreroll();
			} else {
				t.adRestoreMainMedia();
			}

			var event = mejs.Utils.createEvent('mejsprerollended', t.container);
			t.container.dispatchEvent(event);
		}, 0);
	},
	adRestoreMainMedia: function adRestoreMainMedia() {
		var t = this,
		    iframe = t.media.querySelector('iframe');

		if (iframe) {
			iframe.style.display = '';
		}

		t.setSrc(t.adsCurrentMediaUrl);
		setTimeout(function () {
			t.load();
			t.play();
		}, 10);

		var controlElements = t.container.querySelector('.' + t.options.classPrefix + 'controls').children;
		for (var i = 0, total = controlElements.length; i < total; i++) {
			var target = controlElements[i],
			    button = target.querySelector('button');
			if (button && !mejs.Utils.hasClass(target, t.options.classPrefix + 'playpause-button')) {
				target.style.pointerEvents = 'auto';
				button.disabled = false;
			} else if (target.querySelector('.' + t.options.classPrefix + 'time-slider')) {
				target.querySelector('.' + t.options.classPrefix + 'time-slider').style.pointerEvents = 'auto';
			}
		}

		if (t.adsSkipBlock) {
			t.adsSkipBlock.remove();
		}

		t.adsLayer.style.display = 'none';

		t.media.removeEventListener('ended', t.adsPrerollEndedProxy);
		t.media.removeEventListener('loadedmetadata', t.adsPrerollMetaProxy);
		t.media.removeEventListener('timeupdate', t.adsPrerollUpdateProxy);

		var event = mejs.Utils.createEvent('mejsprerollmainstarted', t.container);
		t.container.dispatchEvent(event);
	},
	adsAdClick: function adsAdClick() {
		var t = this;

		if (t.paused) {
			t.play();
		} else {
			t.pause();
		}

		var event = mejs.Utils.createEvent('mejsprerolladsclicked', t.container);
		t.container.dispatchEvent(event);
	},
	adsSkipClick: function adsSkipClick(e) {
		var t = this;

		t.media.removeEventListener('ended', t.adsPrerollEndedProxy);

		var event = mejs.Utils.createEvent('mejsprerollskipclicked', t.container);
		t.container.dispatchEvent(event);

		event = mejs.Utils.createEvent('mejsprerollended', t.container);
		t.container.dispatchEvent(event);

		t.options.indexPreroll++;
		if (t.options.indexPreroll < t.options.adsPrerollMediaUrl.length) {
			t.adsStartPreroll();
		} else {
			t.adRestoreMainMedia();
		}

		e.preventDefault();
		e.stopPropagation();
	},
	prerollAdsFinished: function prerollAdsFinished() {
		var t = this;
		return t.options.indexPreroll === t.options.adsPrerollMediaUrl.length;
	},
	adsLoadUrl: function adsLoadUrl(url) {
		var img = new Image(),
		    rnd = Math.round(Math.random() * 100000);

		img.src = '' + url + (~url.indexOf('?') ? '&' : '?') + 'random' + rnd + '=' + rnd;
		img.loaded = function () {
			img = null;
		};
	}
});

},{}]},{},[1]);
