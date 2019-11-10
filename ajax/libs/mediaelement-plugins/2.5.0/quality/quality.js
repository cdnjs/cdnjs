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

mejs.i18n.en['mejs.quality-chooser'] = 'Quality Chooser';

Object.assign(mejs.MepDefaults, {
	defaultQuality: 'auto',

	qualityText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildquality: function buildquality(player, controls, layers, media) {
		var t = this,
		    children = t.mediaFiles ? t.mediaFiles : t.node.children,
		    qualityMap = new Map();

		for (var i = 0, total = children.length; i < total; i++) {
			var mediaNode = children[i];
			var quality = mediaNode instanceof HTMLElement ? mediaNode.getAttribute('data-quality') : mediaNode['data-quality'];

			if (t.mediaFiles) {
				var source = document.createElement('source');
				source.src = mediaNode['src'];
				source.type = mediaNode['type'];

				t.addValueToKey(qualityMap, quality, source);
			} else if (mediaNode.nodeName === 'SOURCE') {
				t.addValueToKey(qualityMap, quality, mediaNode);
			}
		}

		if (qualityMap.size <= 1) {
			return;
		}

		t.cleanquality(player);

		var qualityTitle = mejs.Utils.isString(t.options.qualityText) ? t.options.qualityText : mejs.i18n.t('mejs.quality-quality'),
		    getQualityNameFromValue = function getQualityNameFromValue(value) {
			var label = void 0;
			if (value === 'auto') {
				var keyExist = t.keyExist(qualityMap, value);
				if (keyExist) {
					label = value;
				} else {
					var keyValue = t.getMapIndex(qualityMap, 0);
					label = keyValue.key;
				}
			} else {
				label = value;
			}
			return label;
		},
		    defaultValue = getQualityNameFromValue(t.options.defaultQuality);

		player.qualitiesButton = document.createElement('div');
		player.qualitiesButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'qualities-button';
		player.qualitiesButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + qualityTitle + '" ' + ('aria-label="' + qualityTitle + '" tabindex="0">' + defaultValue + '</button>') + ('<div class="' + t.options.classPrefix + 'qualities-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'qualities-selector-list"></ul>') + '</div>';

		t.addControlElement(player.qualitiesButton, 'qualities');

		media.setSrc(qualityMap.get(defaultValue)[0].src);
		media.load();

		qualityMap.forEach(function (value, key) {
			if (key !== 'map_keys_1') {
				var src = value[0],
				    _quality = key,
				    inputId = t.id + '-qualities-' + _quality;
				player.qualitiesButton.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'qualities-selector-list-item">' + ('<input class="' + t.options.classPrefix + 'qualities-selector-input" type="radio" name="' + t.id + '_qualities"') + ('disabled="disabled" value="' + _quality + '" id="' + inputId + '"  ') + ((_quality === defaultValue ? ' checked="checked"' : '') + '/>') + ('<label for="' + inputId + '" class="' + t.options.classPrefix + 'qualities-selector-label') + ((_quality === defaultValue ? ' ' + t.options.classPrefix + 'qualities-selected' : '') + '">') + ((src.title || _quality) + '</label>') + '</li>';
			}
		});
		var inEvents = ['mouseenter', 'focusin'],
		    outEvents = ['mouseleave', 'focusout'],
		    radios = player.qualitiesButton.querySelectorAll('input[type="radio"]'),
		    labels = player.qualitiesButton.querySelectorAll('.' + t.options.classPrefix + 'qualities-selector-label'),
		    selector = player.qualitiesButton.querySelector('.' + t.options.classPrefix + 'qualities-selector');

		for (var _i = 0, _total = inEvents.length; _i < _total; _i++) {
			player.qualitiesButton.addEventListener(inEvents[_i], function () {
				mejs.Utils.removeClass(selector, t.options.classPrefix + 'offscreen');
				selector.style.height = selector.querySelector('ul').offsetHeight + 'px';
				selector.style.top = -1 * parseFloat(selector.offsetHeight) + 'px';
			});
		}

		for (var _i2 = 0, _total2 = outEvents.length; _i2 < _total2; _i2++) {
			player.qualitiesButton.addEventListener(outEvents[_i2], function () {
				mejs.Utils.addClass(selector, t.options.classPrefix + 'offscreen');
			});
		}

		for (var _i3 = 0, _total3 = radios.length; _i3 < _total3; _i3++) {
			var radio = radios[_i3];
			radio.disabled = false;
			radio.addEventListener('change', function () {
				var self = this,
				    newQuality = self.value;

				var selected = player.qualitiesButton.querySelectorAll('.' + t.options.classPrefix + 'qualities-selected');
				for (var _i4 = 0, _total4 = selected.length; _i4 < _total4; _i4++) {
					mejs.Utils.removeClass(selected[_i4], t.options.classPrefix + 'qualities-selected');
				}

				self.checked = true;
				var siblings = mejs.Utils.siblings(self, function (el) {
					return mejs.Utils.hasClass(el, t.options.classPrefix + 'qualities-selector-label');
				});
				for (var j = 0, _total5 = siblings.length; j < _total5; j++) {
					mejs.Utils.addClass(siblings[j], t.options.classPrefix + 'qualities-selected');
				}

				var currentTime = media.currentTime;

				var paused = media.paused;

				player.qualitiesButton.querySelector('button').innerHTML = newQuality;
				if (!paused) {
					media.pause();
				}
				t.updateVideoSource(media, qualityMap, newQuality);
				media.setSrc(qualityMap.get(newQuality)[0].src);
				media.load();
				media.dispatchEvent(mejs.Utils.createEvent('seeking', media));
				if (!paused) {
					media.play();
				}
				media.addEventListener('canplay', function canPlayAfterSourceSwitchHandler() {
					media.setCurrentTime(currentTime);
					media.removeEventListener('canplay', canPlayAfterSourceSwitchHandler);
				});
			});
		}
		for (var _i5 = 0, _total6 = labels.length; _i5 < _total6; _i5++) {
			labels[_i5].addEventListener('click', function () {
				var radio = mejs.Utils.siblings(this, function (el) {
					return el.tagName === 'INPUT';
				})[0],
				    event = mejs.Utils.createEvent('click', radio);
				radio.dispatchEvent(event);
			});
		}

		selector.addEventListener('keydown', function (e) {
			e.stopPropagation();
		});
		media.setSrc(qualityMap.get(defaultValue)[0].src);
	},
	cleanquality: function cleanquality(player) {
		if (player) {
			if (player.qualitiesButton) {
				player.qualitiesButton.remove();
			}
		}
	},
	addValueToKey: function addValueToKey(map, key, value) {
		if (map.has('map_keys_1')) {
			map.get('map_keys_1').push(key.toLowerCase());
		} else {
			map.set('map_keys_1', []);
		}
		if (map.has(key)) {
			map.get(key).push(value);
		} else {
			map.set(key, []);
			map.get(key).push(value);
		}
	},
	updateVideoSource: function updateVideoSource(media, map, key) {
		this.cleanMediaSource(media);
		var sources = map.get(key);

		var _loop = function _loop(i) {
			var mediaNode = media.children[i];
			if (mediaNode.tagName === 'VIDEO') {
				sources.forEach(function (sourceElement) {
					mediaNode.appendChild(sourceElement);
				});
			}
		};

		for (var i = 0; i < media.children.length; i++) {
			_loop(i);
		}
	},
	cleanMediaSource: function cleanMediaSource(media) {
		for (var i = 0; i < media.children.length; i++) {
			var _mediaNode = media.children[i];
			if (_mediaNode.tagName === 'VIDEO') {
				while (_mediaNode.firstChild) {
					_mediaNode.removeChild(_mediaNode.firstChild);
				}
			}
		}
	},
	getMapIndex: function getMapIndex(map, index) {
		var counter = -1;
		var keyValue = {};
		map.forEach(function (value, key) {

			if (counter === index) {
				keyValue.key = key;
				keyValue.value = value;
			}
			counter++;
		});
		return keyValue;
	},
	keyExist: function keyExist(map, searchKey) {
		return -1 < map.get('map_keys_1').indexOf(searchKey.toLowerCase());
	}
});

},{}]},{},[1]);
