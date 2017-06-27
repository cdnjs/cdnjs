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

// Translations (English required)

mejs.i18n.en["mejs.ad-skip"] = "Skip ad";
mejs.i18n.en["mejs.ad-skip-info"] = ["Skip in 1 second", "Skip in %1 seconds"];

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
		player.adsLayer = document.createElement('div');
		player.adsLayer.className = t.options.classPrefix + "layer " + t.options.classPrefix + "overlay " + t.options.classPrefix + "ads";
		player.adsLayer.innerHTML = "<a href=\"#\" target=\"_blank\"></a>" + ("<div class=\"" + t.options.classPrefix + "ads-skip-block\">") + ("<span class=\"" + t.options.classPrefix + "ads-skip-message\"></span>") + ("<span class=\"" + t.options.classPrefix + "ads-skip-button\">" + mejs.i18n.t('mejs.ad-skip') + "</span>") + "</div>";
		player.adsLayer.style.display = 'none';

		layers.insertBefore(player.adsLayer, layers.querySelector("." + t.options.classPrefix + "overlay-play"));

		player.adsLayer.querySelector('a').addEventListener('click', t.adsAdClick.bind(t));

		player.adsSkipBlock = player.adsLayer.querySelector("." + t.options.classPrefix + "ads-skip-block");
		player.adsSkipBlock.style.display = 'none';
		player.adsSkipMessage = player.adsLayer.querySelector("." + t.options.classPrefix + "ads-skip-message");
		player.adsSkipMessage.style.display = 'none';
		player.adsSkipButton = player.adsLayer.querySelector("." + t.options.classPrefix + "ads-skip-button");
		player.adsSkipButton.addEventListener('click', t.adsSkipClick.bind(t));

		// create proxies (only needed for events we want to remove later)
		t.adsMediaTryingToStartProxy = t.adsMediaTryingToStart.bind(t);
		t.adsPrerollStartedProxy = t.adsPrerollStarted.bind(t);
		t.adsPrerollMetaProxy = t.adsPrerollMeta.bind(t);
		t.adsPrerollUpdateProxy = t.adsPrerollUpdate.bind(t);
		t.adsPrerollEndedProxy = t.adsPrerollEnded.bind(t);

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

		var t = this;

		var newDuration = 0;

		// if duration has been set, show that
		if (t.options.duration > 0) {
			newDuration = t.options.duration;
		} else if (!isNaN(t.adsCurrentMediaDuration)) {
			newDuration = t.adsCurrentMediaDuration;
		}

		setTimeout(function () {
			t.controls.querySelector("." + t.options.classPrefix + "duration").innerHTML = mejs.Utils.secondsToTimeCode(newDuration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength);
		}, 250);

		// send initialization events
		var event = mejs.Utils.createEvent('mejsprerollinitialized', t.container);
		t.container.dispatchEvent(event);
	},
	adsPrerollStarted: function adsPrerollStarted() {
		var t = this;

		t.media.removeEventListener('playing', t.adsPrerollStartedProxy);

		// turn off controls until the preroll is done
		t.disableControls();

		// enable clicking through
		t.adsLayer.style.display = 'block';
		if (t.options.adsPrerollAdUrl[t.options.indexPreroll]) {
			t.adsLayer.querySelector('a').href = t.options.adsPrerollAdUrl[t.options.indexPreroll];
		} else {
			t.adsLayer.querySelector('a').href = '#';
			t.adsLayer.querySelector('a').setAttribute('target', '');
		}

		// possibly allow the skip button to work
		if (t.options.adsPrerollAdEnableSkip) {
			t.adsSkipBlock.style.display = 'block';

			if (t.options.adsPrerollAdSkipSeconds > 0) {
				t.adsSkipMessage.innerHTML = mejs.i18n.t('mejs.ad-skip-info').replace('%1', t.options.adsPrerollAdSkipSeconds.toString());
				t.adsSkipMessage.style.display = 'block';
				t.adsSkipButton.style.display = 'none';
			} else {
				t.adsSkipMessage.style.display = 'none';
				t.adsSkipButton.style.display = 'block';
			}
		} else {
			t.adsSkipBlock.style.display = 'none';
		}

		// send click events
		var event = mejs.Utils.createEvent('mejsprerollstarted', t.container);
		t.container.dispatchEvent(event);
	},
	adsPrerollUpdate: function adsPrerollUpdate() {
		var t = this;

		if (t.options.adsPrerollAdEnableSkip && t.options.adsPrerollAdSkipSeconds > 0) {
			// update message
			if (t.media.currentTime > t.options.adsPrerollAdSkipSeconds) {
				t.adsSkipButton.style.display = 'block';
				t.adsSkipMessage.style.display = 'none';
			} else {
				t.adsSkipMessage.innerHTML = mejs.i18n.t('mejs.ad-skip-info').replace('%1', Math.round(t.options.adsPrerollAdSkipSeconds - t.media.currentTime).toString());
			}
		}

		var event = mejs.Utils.createEvent('mejsprerolltimeupdate', t.container);
		event.detail.duration = t.media.duration;
		event.detail.currentTime = t.media.currentTime;
		t.container.dispatchEvent(event);
	},
	adsPrerollEnded: function adsPrerollEnded() {
		var t = this;

		var event = mejs.Utils.createEvent('mejsprerollended', t.container);
		t.container.dispatchEvent(event);

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

		t.adsLayer.style.display = 'none';

		t.media.removeEventListener('ended', t.adsPrerollEndedProxy);
		t.media.removeEventListener('loadedmetadata', t.adsPrerollMetaProxy);
		t.media.removeEventListener('timeupdate', t.adsPrerollUpdateProxy);

		var event = mejs.Utils.createEvent('mejsprerollmainstarted', t.container);
		t.container.dispatchEvent(event);
	},
	adsAdClick: function adsAdClick() {
		var t = this;

		if (t.media.paused) {
			t.media.play();
		} else {
			t.media.pause();
		}

		var event = mejs.Utils.createEvent('mejsprerolladsclicked', t.container);
		t.container.dispatchEvent(event);
	},
	adsSkipClick: function adsSkipClick() {
		var t = this;

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

		img.src = "" + url + (url.includes('?') ? '&' : '?') + "random" + rnd + "=" + rnd;
		img.loaded = function () {
			img = null;
		};
	}
});

},{}]},{},[1]);
