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
	vastAdTagUrl: '',

	vastAdsType: 'vast'
});

Object.assign(MediaElementPlayer.prototype, {
	vastAdTagIsLoading: false,

	vastAdTagIsLoaded: false,

	vastStartedPlaying: false,

	vastAdTags: [],

	buildvast: function buildvast(player, controls, layers, media) {

		var t = this;

		if (!t.isVideo) {
			return;
		}

		if (t.options.vastAdTagUrl !== '') {
			t.vastLoadAdTagInfo();
		}

		t.buildads(player, controls, layers, media);

		t.vastSetupEvents();
	},
	vastSetupEvents: function vastSetupEvents() {

		var t = this;

		var firstQuartExecuted = false,
		    secondQuartExecuted = false,
		    thirdQuartExecuted = false;

		t.container.addEventListener('mejsprerollinitialized', function () {
			if (t.vastAdTags.length > 0) {

				var adTag = t.vastAdTags[0];

				if (adTag.trackingEvents.initialization) {
					for (var i = 0, total = adTag.trackingEvents.initialization.length; i < total; i++) {
						t.adsLoadUrl(adTag.trackingEvents.initialization[i]);
					}
				}
			}
		});

		t.container.addEventListener('mejsprerollstarted', function () {

			if (t.vastAdTags.length > 0) {

				var adTag = t.vastAdTags[0];

				if (adTag.trackingEvents.start) {
					for (var i = 0, total = adTag.trackingEvents.start.length; i < total; i++) {
						t.adsLoadUrl(adTag.trackingEvents.start[i]);
					}
				}

				if (!adTag.shown && adTag.impressions.length > 0) {
					for (var _i = 0, _total = adTag.impressions.length; _i < _total; _i++) {
						t.adsLoadUrl(adTag.impressions[_i]);
					}
				}

				adTag.shown = true;
			}
		});

		t.container.addEventListener('mejsprerollvolumechanged', function () {

			if (t.vastAdTags.length > 0 && t.options.indexPreroll < t.vastAdTags.length) {
				var adTag = t.vastAdTags[t.options.indexPreroll];

				if (adTag.trackingEvents.mute && !t.media.volume) {
					for (var i = 0, total = adTag.trackingEvents.mute.length; i < total; i++) {
						t.adsLoadUrl(adTag.trackingEvents.mute[i]);
					}
				}

				if (adTag.trackingEvents.unmute && t.media.volume) {
					for (var _i2 = 0, _total2 = adTag.trackingEvents.unmute.length; _i2 < _total2; _i2++) {
						t.adsLoadUrl(adTag.trackingEvents.unmute[_i2]);
					}
				}
			}
		});

		t.container.addEventListener('mejsprerolltimeupdate', function (e) {

			if (t.vastAdTags.length > 0 && t.options.indexPreroll < t.vastAdTags.length) {
				var duration = e.detail.duration,
				    current = e.detail.currentTime,
				    percentage = Math.min(1, Math.max(0, current / duration)) * 100,
				    adTag = t.vastAdTags[t.options.indexPreroll],
				    isFirsQuart = percentage >= 25 && percentage < 50,
				    isMidPoint = percentage >= 50 && percentage < 75,
				    isThirdQuart = percentage >= 75 && percentage < 100;

				if (adTag.trackingEvents.firstQuartile && !firstQuartExecuted && isFirsQuart) {
					for (var i = 0, total = adTag.trackingEvents.firstQuartile.length; i < total; i++) {
						t.adsLoadUrl(adTag.trackingEvents.firstQuartile[i]);
					}
					firstQuartExecuted = true;
				} else if (adTag.trackingEvents.midpoint && !secondQuartExecuted && isMidPoint) {
					for (var _i3 = 0, _total3 = adTag.trackingEvents.midpoint.length; _i3 < _total3; _i3++) {
						t.adsLoadUrl(adTag.trackingEvents.midpoint[_i3]);
					}
					secondQuartExecuted = true;
				} else if (adTag.trackingEvents.thirdQuartile && !thirdQuartExecuted && isThirdQuart) {
					for (var _i4 = 0, _total4 = adTag.trackingEvents.thirdQuartile.length; _i4 < _total4; _i4++) {
						t.adsLoadUrl(adTag.trackingEvents.thirdQuartile[_i4]);
					}
					thirdQuartExecuted = true;
				}
			}
		});

		t.container.addEventListener('mejsprerollended', function () {

			var adTag = t.vastAdTags[t.options.indexPreroll];

			if (t.vastAdTags.length > 0 && t.options.indexPreroll < t.vastAdTags.length && adTag.trackingEvents.complete) {
				for (var i = 0, total = adTag.trackingEvents.complete.length; i < total; i++) {
					t.adsLoadUrl(adTag.trackingEvents.complete[i]);
				}
			}

			firstQuartExecuted = false;
			secondQuartExecuted = false;
			thirdQuartExecuted = false;
		});

		t.container.addEventListener('mejsprerolladsclicked', function () {
			var adTag = t.vastAdTags[t.options.indexPreroll];

			if (t.vastAdTags.length > 0 && t.options.indexPreroll < t.vastAdTags.length && adTag.clickThrough && adTag.clickTracking) {
				t.adsLoadUrl(adTag.clickTracking);
			}
		});

		t.container.addEventListener('mejsprerollskipclicked', function () {

			var adTag = t.vastAdTags[t.options.indexPreroll];

			if (t.vastAdTags.length > 0 && t.options.indexPreroll < t.vastAdTags.length && adTag.trackingEvents.skip) {
				for (var i = 0, total = adTag.trackingEvents.skip.length; i < total; i++) {
					t.adsLoadUrl(adTag.trackingEvents.skip[i]);
				}
			}
		});
	},
	vastSetAdTagUrl: function vastSetAdTagUrl(url) {

		var t = this;

		t.options.vastAdTagUrl = url;
		t.options.indexPreroll = 0;
		t.vastAdTagIsLoaded = false;
		t.vastAdTags = [];
	},
	vastLoadAdTagInfo: function vastLoadAdTagInfo() {
		var t = this;

		t.adsDataIsLoading = true;
		t.vastAdTagIsLoading = true;

		t.loadAdTagInfoDirect();
	},
	loadAdTagInfoDirect: function loadAdTagInfoDirect() {
		var t = this;

		mejs.Utils.ajax(t.options.vastAdTagUrl, 'xml', function (data) {
			if (t.options.vastAdsType === 'vpaid') {
				t.vpaidParseVpaidData(data);
			} else {
				t.vastParseVastData(data);
			}
		}, function (err) {
			console.error('vast3:direct:error', err);

			t.loadAdTagInfoProxy();
		});
	},
	loadAdTagInfoProxy: function loadAdTagInfoProxy() {
		var t = this,
		    protocol = location.protocol,
		    query = 'select * from xml where url="' + encodeURI(t.options.vastAdTagUrl) + '"',
		    yahooUrl = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?format=xml&q=' + query;

		mejs.Utils.ajax(yahooUrl, 'xml', function (data) {
			if (t.options.vastAdsType === 'vpaid') {
				t.vpaidParseVpaidData(data);
			} else {
				t.vastParseVastData(data);
			}
		}, function (err) {
			console.error('vast:proxy:yahoo:error', err);
		});
	},
	vastParseVastData: function vastParseVastData(data) {

		var t = this,
		    ads = data.getElementsByTagName('Ad');

		if (!ads.length) {
			return;
		}

		t.vastAdTags = [];
		t.options.indexPreroll = 0;

		for (var i = 0, total = ads.length; i < total; i++) {
			var adNode = ads[i],
			    title = adNode.getElementsByTagName('AdTitle').length ? adNode.getElementsByTagName('AdTitle')[0].textContent.trim() : '',
			    description = adNode.getElementsByTagName('Description').length ? adNode.getElementsByTagName('Description')[0].textContent.trim() : '',
			    clickLink = adNode.getElementsByTagName('ClickThrough').length ? adNode.getElementsByTagName('ClickThrough')[0].textContent.trim() : '',
			    clickTrack = adNode.getElementsByTagName('ClickTracking').length ? adNode.getElementsByTagName('ClickTracking')[0].textContent.trim() : '',
			    adTag = {
				id: adNode.getAttribute('id'),
				title: title,
				description: description,
				impressions: [],
				clickThrough: clickLink,
				clickTracking: clickTrack,
				mediaFiles: [],
				trackingEvents: {},

				shown: false
			},
			    impressions = adNode.getElementsByTagName('Impression'),
			    mediaFiles = adNode.getElementsByTagName('MediaFile'),
			    trackFiles = adNode.getElementsByTagName('Tracking');

			t.vastAdTags.push(adTag);

			for (var j = 0, impressionsTotal = impressions.length; j < impressionsTotal; j++) {
				adTag.impressions.push(impressions[j].textContent.trim());
			}

			for (var _j = 0, tracksTotal = trackFiles.length; _j < tracksTotal; _j++) {
				var trackingEvent = trackFiles[_j],
				    event = trackingEvent.getAttribute('event');

				if (adTag.trackingEvents[event] === undefined) {
					adTag.trackingEvents[event] = [];
				}
				adTag.trackingEvents[event].push(trackingEvent.textContent.trim());
			}

			for (var _j2 = 0, mediaFilesTotal = mediaFiles.length; _j2 < mediaFilesTotal; _j2++) {
				var mediaFile = mediaFiles[_j2],
				    type = mediaFile.getAttribute('type');

				if (t.media.canPlayType(type) !== '' || /(no|false)/i.test(t.media.canPlayType(type))) {
					if (mediaFile.getAttribute('type') === 'application/javascript') {
						var script = document.createElement('script'),
						    firstScriptTag = document.getElementsByTagName('script')[0];

						script.src = mediaFile.textContent.trim();
						firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
					} else if (mediaFile.getAttribute('delivery') !== 'application/x-shockwave-flash') {
							adTag.mediaFiles.push({
								id: mediaFile.getAttribute('id'),
								delivery: mediaFile.getAttribute('delivery'),
								type: mediaFile.getAttribute('type'),
								bitrate: mediaFile.getAttribute('bitrate'),
								width: mediaFile.getAttribute('width'),
								height: mediaFile.getAttribute('height'),
								url: mediaFile.textContent.trim()
							});
						}
				}
			}
		}

		t.vastLoaded();
	},
	vpaidParseVpaidData: function vpaidParseVpaidData(data) {

		var t = this,
		    ads = data.getElementsByTagName('AdParameters');

		t.vpaidAdTags = [];
		t.options.indexPreroll = 0;

		if (typeof ads[0] === 'undefined') {
			return;
		}

		var adData = JSON.parse(ads[0].textContent.trim()),
		    duration = data.getElementsByTagName('Duration'),
		    adTag = {
			id: adData.ad_id.trim(),
			title: adData.title.trim(),
			clickThrough: adData.page_url,
			impressions: [],
			mediaFiles: [],
			trackingEvents: {},

			shown: false
		};

		if (typeof adData.media.tracking.beacon !== 'undefined') {

			var trackingPoints = ['initialization', 'start', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete'];

			for (var i = 0, total = adData.media.tracking.beacon.length; i < total; i++) {
				var trackingEvent = adData.media.tracking.beacon[i];

				if (~trackingPoints.indexOf(trackingEvent.type)) {
					if (adTag.trackingEvents[trackingEvent.type] === undefined) {
						adTag.trackingEvents[trackingEvent.type] = [];
					}
					adTag.trackingEvents[trackingEvent.type].push(trackingEvent.beacon_url.trim());
				} else if (trackingEvent.type === 'impression') {
					adTag.impressions.push(trackingEvent.beacon_url.trim());
				}
			}
		}

		for (var property in adData.media.video) {
			if (adData.media.video.hasOwnProperty(property)) {
				var mediaFile = adData.media.video[property],
				    type = mediaFile.mime_type.trim();

				if (t.media.canPlayType(type) !== '' || /(no|false)/i.test(t.media.canPlayType(type))) {

					adTag.mediaFiles.push({
						id: mediaFile.media_id,
						format: mediaFile.format,
						type: type,
						transcoding: mediaFile.transcoding,
						width: mediaFile.width,
						height: mediaFile.height,
						duration: duration,
						url: mediaFile.media_url
					});
				}
			}
		}

		t.vastAdTags.push(adTag);

		t.vastLoaded();
	},
	vastLoaded: function vastLoaded() {
		var t = this;

		t.vastAdTagIsLoaded = true;
		t.vastAdTagIsLoading = false;
		t.adsDataIsLoading = false;
		t.vastStartPreroll();
	},
	vastStartPreroll: function vastStartPreroll() {
		var t = this;

		var i = 0;
		while (i < t.vastAdTags.length) {
			if (typeof t.vastAdTags[i].mediaFiles !== 'undefined' && t.vastAdTags[i].mediaFiles.length) {
				t.options.adsPrerollMediaUrl[i] = t.vastAdTags[i].mediaFiles[0].url;
			}
			if (typeof t.vastAdTags[i].clickThrough !== 'undefined') {
				t.options.adsPrerollAdUrl[i] = t.vastAdTags[i].clickThrough;
			}
			i++;
		}
		t.adsStartPreroll();
	}
});

},{}]},{},[1]);
