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

mejs.i18n.en['mejs.quality-chooser'] = 'Quality Chooser';

Object.assign(mejs.MepDefaults, {
	defaultQuality: 'auto',

	qualityText: null,

	autoGenerate: false,

	autoDash: false,

	autoHLS: false,

	qualityChangeCallback: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildquality: function buildquality(player, controls, layers, media) {
		var t = this,
		    children = t.mediaFiles ? t.mediaFiles : t.node.children,
		    qualityMap = new Map();

		for (var i = 0, total = children.length; i < total; i++) {
			var mediaNode = children[i];
			var quality = mediaNode instanceof HTMLElement ? mediaNode.getAttribute('data-quality') : mediaNode['data-quality'];

			if (quality === 'undefined') {
				quality = 'Auto';
				t.options.autoGenerate = true;
			}

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

		var currentQuality = '',
		    sourceIndex = 0;

		media.addEventListener('error', function (e) {
			if (e.message === 'No renderer found' && qualityMap.get(currentQuality).length > sourceIndex + 1) {
				sourceIndex = sourceIndex + 1;
				var nextSource = qualityMap.get(currentQuality)[sourceIndex].src;
				media.setSrc(nextSource);
				media.load();
			}
		});

		media.addEventListener('loadedmetadata', function () {
			if (!!media.hlsPlayer) {
				var levels = media.hlsPlayer.levels;
				if (t.options.autoGenerate && levels.length > 1) {
					levels.forEach(function (level) {
						var height = level.height;
						var quality = t.getQualityFromHeight(height);
						t.addValueToKey(qualityMap, quality, '');
					});
					t.options.autoHLS = true;
					t.generateQualityButton(t, player, media, qualityMap, currentQuality);
				}
			} else if (!!media.dashPlayer) {
				var bitrates = media.dashPlayer.getBitrateInfoListFor("video");
				if (t.options.autoGenerate && bitrates.length > 1) {
					bitrates.forEach(function (level) {
						var height = level.height;
						var quality = t.getQualityFromHeight(height);
						t.addValueToKey(qualityMap, quality, '');
					});
					t.options.autoDash = true;
					t.generateQualityButton(t, player, media, qualityMap, currentQuality);
				}
			}
		});

		t.generateQualityButton(t, player, media, qualityMap, currentQuality);
	},
	generateQualityButton: function generateQualityButton(t, player, media, qualityMap, currentQuality) {
		t.cleanquality(player);

		var qualityTitle = mejs.Utils.isString(t.options.qualityText) ? t.options.qualityText : mejs.i18n.t('mejs.quality-chooser'),
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
		currentQuality = defaultValue;

		var generateId = Math.floor(Math.random() * 100);
		player.qualitiesContainer = document.createElement('div');
		player.qualitiesContainer.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'qualities-button';
		player.qualitiesContainer.innerHTML = '<button type="button" title="' + qualityTitle + '" aria-label="' + qualityTitle + '" aria-controls="qualitieslist-' + generateId + '" aria-expanded="false">' + defaultValue + '</button>' + ('<div class="' + t.options.classPrefix + 'qualities-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'qualities-selector-list" id="qualitieslist-' + generateId + '" tabindex="-1"></ul></div>');

		t.addControlElement(player.qualitiesContainer, 'qualities');

		qualityMap.forEach(function (value, key) {
			if (key !== 'map_keys_1') {
				var src = value[0],
				    quality = key,
				    inputId = t.id + '-qualities-' + quality;
				player.qualitiesContainer.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'qualities-selector-list-item">' + ('<input class="' + t.options.classPrefix + 'qualities-selector-input ' + (quality === defaultValue ? t.options.classPrefix + 'qualities-selected-input' : '') + '" type="radio" name="' + t.id + '_qualities" disabled="disabled" ') + ('value="' + quality + '" id="' + inputId + '" ' + (quality === defaultValue ? ' checked="checked"' : '') + ' />') + ('<label for="' + inputId + '" class="' + t.options.classPrefix + 'qualities-selector-label ' + (quality === defaultValue ? ' ' + t.options.classPrefix + 'qualities-selected' : '') + '">') + ((src.title || quality) + ' </label></li>');
			}
		});

		var isHidden = true;
		var qualityContainer = player.qualitiesContainer,
		    qualityButton = player.qualitiesContainer.querySelector('button'),
		    qualitiesSelector = player.qualitiesContainer.querySelector('.' + t.options.classPrefix + 'qualities-selector'),
		    qualitiesList = player.qualitiesContainer.querySelector('.' + t.options.classPrefix + 'qualities-selector-list'),
		    radios = player.qualitiesContainer.querySelectorAll('input[type="radio"]'),
		    labels = player.qualitiesContainer.querySelectorAll('.' + t.options.classPrefix + 'qualities-selector-label');

		function hideSelector() {
			mejs.Utils.addClass(qualitiesSelector, t.options.classPrefix + 'offscreen');
			qualityButton.setAttribute('aria-expanded', 'false');
			qualityButton.focus();
			isHidden = true;
		}

		function showSelector() {
			mejs.Utils.removeClass(qualitiesSelector, t.options.classPrefix + 'offscreen');
			qualitiesSelector.style.height = qualitiesSelector.querySelector('ul').offsetHeight + 'px';
			qualitiesSelector.style.top = -1 * parseFloat(qualitiesSelector.offsetHeight) + 'px';
			qualityButton.setAttribute('aria-expanded', 'true');
			qualitiesSelector.querySelector('.' + t.options.classPrefix + 'qualities-selected-input').focus();
			isHidden = false;
		}

		qualityButton.addEventListener('click', function () {
			if (isHidden === true) {
				showSelector();
			} else {
				hideSelector();
			}
		});

		qualitiesList.addEventListener('focusout', function (event) {
			if (!qualityContainer.contains(event.relatedTarget)) {
				hideSelector();
			}
		});

		qualityButton.addEventListener('mouseenter', function () {
			showSelector();
		});

		qualityContainer.addEventListener('mouseleave', function () {
			hideSelector();
		});

		qualityContainer.addEventListener('keydown', function (event) {
			if (event.key === "Escape") {
				hideSelector();
			}

			event.stopPropagation();
		});

		for (var i = 0, total = radios.length; i < total; i++) {
			var radio = radios[i];
			radio.disabled = false;
			radio.addEventListener('change', function () {
				if (t.options.autoDash) {
					t.updateQualityButton(this, player, currentQuality);
					t.switchDashQuality(player, media);
				} else if (t.options.autoHLS) {
					t.updateQualityButton(this, player, currentQuality);
					t.switchHLSQuality(player, media);
				} else {
					t.updateQualityButton(this, player, currentQuality);

					var currentTime = media.currentTime;
					var paused = media.paused;

					if (!paused) {
						media.pause();
					}
					t.updateVideoSource(media, qualityMap, currentQuality);
					media.setSrc(qualityMap.get(currentQuality)[0].src);
					media.load();
					media.dispatchEvent(mejs.Utils.createEvent('seeking', media));
					if (!paused) {
						media.play();
					}
					media.addEventListener('canplay', function canPlayAfterSourceSwitchHandler() {
						media.setCurrentTime(currentTime);
						media.removeEventListener('canplay', canPlayAfterSourceSwitchHandler);
					});
				}
				if (t.options.qualityChangeCallback) {
					t.options.qualityChangeCallback(media, media.originalNode, newQuality);
				}
			});
		}

		for (var _i = 0, _total = labels.length; _i < _total; _i++) {
			labels[_i].addEventListener('click', function () {
				var radio = mejs.Utils.siblings(this, function (el) {
					return el.tagName === 'INPUT';
				})[0],
				    event = mejs.Utils.createEvent('click', radio);
				radio.dispatchEvent(event);
			});
		}
	},
	cleanquality: function cleanquality(player) {
		if (player) {
			if (player.qualitiesContainer) {
				player.qualitiesContainer.remove();
			}
		}
	},
	addValueToKey: function addValueToKey(map, key, value) {
		if (map.has('map_keys_1')) {
			map.get('map_keys_1').push(key);
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
		return -1 < map.get('map_keys_1').indexOf(searchKey);
	},
	switchDashQuality: function switchDashQuality(player, media) {
		var radios = player.qualitiesContainer.querySelectorAll('input[type="radio"]');
		for (var index = 0; index < radios.length; index++) {
			if (radios[index].checked) {
				if (index === 0) {
					media.dashPlayer.setAutoSwitchQuality(true);
				} else {
					media.dashPlayer.setAutoSwitchQuality(false);
					media.dashPlayer.setQualityFor("video", index - 1);
				}
			}
		}
	},
	switchHLSQuality: function switchHLSQuality(player, media) {
		var radios = player.qualitiesContainer.querySelectorAll('input[type="radio"]');
		for (var index = 0; index < radios.length; index++) {
			if (radios[index].checked) {
				if (index === 0) {
					media.hlsPlayer.currentLevel = -1;
				} else {
					media.hlsPlayer.currentLevel = index - 1;
				}
			}
		}
	},
	updateQualityButton: function updateQualityButton(self, player, currentQuality) {
		var t = this;
		var newQuality = self.value;
		currentQuality = newQuality;

		var formerSelected = player.qualitiesContainer.querySelectorAll('.' + t.options.classPrefix + 'qualities-selected');
		for (var i = 0, total = formerSelected.length; i < total; i++) {
			mejs.Utils.removeClass(formerSelected[i], t.options.classPrefix + 'qualities-selected');
			formerSelected[i].parentElement.querySelector('input').classList.remove(t.options.classPrefix + 'qualities-selected-input');
		}

		self.checked = true;
		var currentSelected = mejs.Utils.siblings(self, function (el) {
			return mejs.Utils.hasClass(el, t.options.classPrefix + 'qualities-selector-label');
		});
		for (var j = 0, _total2 = currentSelected.length; j < _total2; j++) {
			mejs.Utils.addClass(currentSelected[j], t.options.classPrefix + 'qualities-selected');
			currentSelected[j].parentElement.querySelector('input').classList.add(t.options.classPrefix + 'qualities-selected-input');
		}

		player.qualitiesContainer.querySelector('button').innerHTML = newQuality;
	},
	getQualityFromHeight: function getQualityFromHeight(height) {
		if (height >= 4320) {
			return "8K UHD";
		} else if (height >= 2160) {
			return "UHD";
		} else if (height >= 1440) {
			return "QHD";
		} else if (height >= 1080) {
			return "FHD";
		} else if (height >= 720) {
			return "HD";
		} else {
			return "SD";
		}
	}
});

},{}]},{},[1]);
