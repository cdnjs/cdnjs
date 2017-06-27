(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

// VAST ads plugin
// Sponsored by Minoto Video

// 2013/02/01		0.5		research
// 2013/02/09		1.5		build loading mechanism
// 2013/02/10		2.5		events to play preroll, skip function, start/end calls, \
// 2013/02/11		2		click events
// ----
// 2013/02/23		3.5		split into a generic pre-roll plugin

Object.assign(mejs.MepDefaults, {
	// URL to a media file
	adsPrerollMediaUrl: [],

	// URL for clicking ad
	adsPrerollAdUrl: [],

	// if true, allows user to skip the pre-roll ad
	adsPrerollAdEnableSkip: false,

	// if adsPrerollAdEnableSkip=true and this is a positive number, it will only allow skipping after the time has elasped
	adsPrerollAdSkipSeconds: -1,

	// keep track of the index for the preroll ads to be able to show more than one preroll. Used for
	// VAST3.0 Adpods
	indexPreroll: 0

});

Object.assign(MediaElementPlayer.prototype, {

	// allows other plugins to all this one
	adsLoaded: false,

	// prevents playback in until async ad data is ready (e.g. VAST)
	adsDataIsLoading: false,

	// stores the main media URL when an ad is playing
	adsCurrentMediaUrl: '',
	adsCurrentMediaDuration: 0,

	// true when the user clicks play for the first time, or if autoplay is set
	adsPlayerHasStarted: false,

	buildads: function buildads(player, controls, layers) {

		var t = this;

		if (t.adsLoaded) {
			return;
		} else {
			t.adsLoaded = true;
		}

		// add layer for ad links and skipping
		player.adsLayer = $('<div class="' + t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay\n\t\t\t\t' + t.options.classPrefix + 'ads">\n\t\t\t\t\t<a href="#" target="_blank"></a>\n\t\t\t\t\t<div class="' + t.options.classPrefix + 'ads-skip-block">\n\t\t\t\t\t\t<span class="' + t.options.classPrefix + 'ads-skip-message"></span>\n\t\t\t\t\t\t<span class="' + t.options.classPrefix + 'ads-skip-button">' + mejs.i18n.t('mejs.ad-skip') + '</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>').insertBefore(layers.find('.' + t.options.classPrefix + 'overlay-play')).hide();

		player.adsLayer.find('a').on('click', $.proxy(t.adsAdClick, t));

		player.adsSkipBlock = player.adsLayer.find('.' + t.options.classPrefix + 'ads-skip-block').hide();
		player.adsSkipMessage = player.adsLayer.find('.' + t.options.classPrefix + 'ads-skip-message').hide();
		player.adsSkipButton = player.adsLayer.find('.' + t.options.classPrefix + 'ads-skip-button').on('click', $.proxy(t.adsSkipClick, t));

		// create proxies (only needed for events we want to remove later)
		t.adsMediaTryingToStartProxy = $.proxy(t.adsMediaTryingToStart, t);
		t.adsPrerollStartedProxy = $.proxy(t.adsPrerollStarted, t);
		t.adsPrerollMetaProxy = $.proxy(t.adsPrerollMeta, t);
		t.adsPrerollUpdateProxy = $.proxy(t.adsPrerollUpdate, t);
		t.adsPrerollEndedProxy = $.proxy(t.adsPrerollEnded, t);

		// check for start
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

		// make sure to pause until the ad data is loaded
		if (t.adsDataIsLoading && !t.media.paused) {
			t.media.pause();
		}

		t.adsPlayerHasStarted = true;
	},

	adsStartPreroll: function adsStartPreroll() {

		var t = this;

		t.media.addEventListener('loadedmetadata', t.adsPrerollMetaProxy);
		t.media.addEventListener('playing', t.adsPrerollStartedProxy);
		t.media.addEventListener('ended', t.adsPrerollEndedProxy);
		t.media.addEventListener('timeupdate', t.adsPrerollUpdateProxy);

		// change URLs to the preroll ad. Only save the video to be shown on first
		// ad showing.
		if (t.options.indexPreroll === 0) {
			t.adsCurrentMediaUrl = t.media.src;
			t.adsCurrentMediaDuration = t.media.duration;
		}

		t.media.setSrc(t.options.adsPrerollMediaUrl[t.options.indexPreroll]);
		t.media.load();

		// if autoplay was on, or if the user pressed play
		// while the ad data was still loading, then start the ad right away
		if (t.adsPlayerHasStarted) {
			t.media.play();
		}
	},

	adsPrerollMeta: function adsPrerollMeta() {

		var t = this,
		    newDuration = 0;

		// if duration has been set, show that
		if (t.options.duration > 0) {
			newDuration = t.options.duration;
		} else if (!isNaN(t.adsCurrentMediaDuration)) {
			newDuration = t.adsCurrentMediaDuration;
		}

		setTimeout(function () {
			t.controls.find('.' + t.options.classPrefix + 'duration').html(mejs.Utils.secondsToTimeCode(newDuration, t.options.alwaysShowHours));
		}, 250);
	},

	adsPrerollStarted: function adsPrerollStarted() {
		var t = this;
		t.media.removeEventListener('playing', t.adsPrerollStartedProxy);

		// turn off controls until the preroll is done
		t.disableControls();

		// enable clicking through
		t.adsLayer.show();
		if (t.options.adsPrerollAdUrl[t.options.indexPreroll] !== '') {
			t.adsLayer.find('a').attr('href', t.options.adsPrerollAdUrl[t.options.indexPreroll]);
		} else {
			t.adsLayer.find('a').attr('href', '#');
			t.adsLayer.find('a').attr('target', '');
		}

		// possibly allow the skip button to work
		if (t.options.adsPrerollAdEnableSkip) {
			t.adsSkipBlock.show();

			if (t.options.adsPrerollAdSkipSeconds > 0) {

				t.adsSkipMessage.html(mejs.i18n.t('mejs.ad-skip-info').replace('%1', t.options.adsPrerollAdSkipSeconds.toString())).show();
				t.adsSkipButton.hide();
			} else {
				t.adsSkipMessage.hide();
				t.adsSkipButton.show();
			}
		} else {
			t.adsSkipBlock.hide();
		}

		// send click events
		t.container.trigger('mejsprerollstarted');
	},

	adsPrerollUpdate: function adsPrerollUpdate() {
		var t = this;

		if (t.options.adsPrerollAdEnableSkip && t.options.adsPrerollAdSkipSeconds > 0) {
			// update message
			if (t.media.currentTime > t.options.adsPrerollAdSkipSeconds) {
				t.adsSkipButton.show();
				t.adsSkipMessage.hide();
			} else {
				t.adsSkipMessage.html(mejs.i18n.t('mejs.ad-skip-info').replace('%1', Math.round(t.options.adsPrerollAdSkipSeconds - t.media.currentTime).toString()));
			}
		}

		t.container.trigger('mejsprerolltimeupdate');
	},

	adsPrerollEnded: function adsPrerollEnded() {
		var t = this;

		t.container.trigger('mejsprerollended');

		t.options.indexPreroll++;
		if (t.options.indexPreroll < t.options.adsPrerollMediaUrl.length) {
			t.adsStartPreroll();
		} else {
			t.adRestoreMainMedia();
		}
	},

	adRestoreMainMedia: function adRestoreMainMedia() {
		var t = this;

		t.media.setSrc(t.adsCurrentMediaUrl);
		setTimeout(function () {
			t.media.load();
			t.media.play();
		}, 10);

		t.enableControls();

		t.adsLayer.hide();

		t.media.removeEventListener('ended', t.adsPrerollEndedProxy);
		t.media.removeEventListener('loadedmetadata', t.adsPrerollMetaProxy);
		t.media.removeEventListener('timeupdate', t.adsPrerollUpdateProxy);

		t.container.trigger('mejsprerollmainstarted');
	},

	adsAdClick: function adsAdClick() {
		var t = this;

		if (t.media.paused) {
			t.media.play();
		} else {
			t.media.pause();
		}

		t.container.trigger('mejsprerolladsclicked');
	},

	adsSkipClick: function adsSkipClick() {
		var t = this;

		t.container.trigger('mejsprerollskipclicked');
		t.container.trigger('mejsprerollended');

		t.options.indexPreroll++;
		if (t.options.indexPreroll < t.options.adsPrerollMediaUrl.length) {
			t.adsStartPreroll();
		} else {
			t.adRestoreMainMedia();
		}
	},

	// tells calling function if ads have finished running
	prerollAdsFinished: function prerollAdsFinished() {
		var t = this;
		return t.options.indexPreroll === t.options.adsPrerollMediaUrl.length;
	},

	// fires off fake XHR requests
	adsLoadUrl: function adsLoadUrl(url) {
		var img = new Image(),
		    rnd = Math.round(Math.random() * 100000);

		img.src = url + (url.includes('?') ? '&' : '?') + ('random' + rnd + '=' + rnd);
		img.loaded = function () {
			img = null;
		};
	}
});

},{}]},{},[1]);
