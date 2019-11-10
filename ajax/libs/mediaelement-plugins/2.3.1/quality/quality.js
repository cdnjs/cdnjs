/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * Maintained by, Rafael Miranda (rafa8626@gmail.com)
 * License: MIT
 *
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

mejs.i18n.en["mejs.quality-chooser"] = "Quality Chooser";

Object.assign(mejs.MepDefaults, {
	defaultQuality: 'auto',

	qualityText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildquality: function buildquality(player, controls, layers, media) {

		var t = this,
		    qualities = [],
		    children = t.mediaFiles ? t.mediaFiles : t.node.children;

		for (var i = 0, total = children.length; i < total; i++) {
			var s = children[i];

			if (t.mediaFiles) {
				qualities.push(s);
			} else if (s.nodeName === 'SOURCE') {
				qualities.push(s);
			}
		}

		if (qualities.length <= 1) {
			return;
		}

		t.clearquality(player);

		var qualityTitle = mejs.Utils.isString(t.options.qualityText) ? t.options.qualityText : mejs.i18n.t('mejs.quality-quality'),
		    getQualityNameFromValue = function getQualityNameFromValue(value) {
			var label = void 0;
			if (value === 'auto') {
				var src = qualities[0];
				label = src instanceof HTMLElement ? src.getAttribute('data-quality') : src['data-quality'];
			} else {
				label = value;
			}

			return label;
		},
		    defaultValue = getQualityNameFromValue(t.options.defaultQuality);

		player.qualitiesButton = document.createElement('div');
		player.qualitiesButton.className = t.options.classPrefix + "button " + t.options.classPrefix + "qualities-button";
		player.qualitiesButton.innerHTML = "<button type=\"button\" aria-controls=\"" + t.id + "\" title=\"" + qualityTitle + "\" " + ("aria-label=\"" + qualityTitle + "\" tabindex=\"0\">" + defaultValue + "</button>") + ("<div class=\"" + t.options.classPrefix + "qualities-selector " + t.options.classPrefix + "offscreen\">") + ("<ul class=\"" + t.options.classPrefix + "qualities-selector-list\"></ul>") + "</div>";

		t.addControlElement(player.qualitiesButton, 'qualities');

		for (var _i = 0, _total = qualities.length; _i < _total; _i++) {
			var src = qualities[_i],
			    quality = src instanceof HTMLElement ? src.getAttribute('data-quality') : src['data-quality'],
			    inputId = t.id + "-qualities-" + quality;

			player.qualitiesButton.querySelector('ul').innerHTML += "<li class=\"" + t.options.classPrefix + "qualities-selector-list-item\">" + ("<input class=\"" + t.options.classPrefix + "qualities-selector-input\" type=\"radio\" name=\"" + t.id + "_qualities\"") + ("disabled=\"disabled\" value=\"" + quality + "\" id=\"" + inputId + "\"  ") + ((quality === defaultValue ? ' checked="checked"' : '') + "/>") + ("<label for=\"" + inputId + "\" class=\"" + t.options.classPrefix + "qualities-selector-label") + ((quality === defaultValue ? " " + t.options.classPrefix + "qualities-selected" : '') + "\">") + ((src.title || quality) + "</label>") + "</li>";
		}

		var inEvents = ['mouseenter', 'focusin'],
		    outEvents = ['mouseleave', 'focusout'],
		    radios = player.qualitiesButton.querySelectorAll('input[type="radio"]'),
		    labels = player.qualitiesButton.querySelectorAll("." + t.options.classPrefix + "qualities-selector-label"),
		    selector = player.qualitiesButton.querySelector("." + t.options.classPrefix + "qualities-selector");

		for (var _i2 = 0, _total2 = inEvents.length; _i2 < _total2; _i2++) {
			player.qualitiesButton.addEventListener(inEvents[_i2], function () {
				mejs.Utils.removeClass(selector, t.options.classPrefix + "offscreen");
				selector.style.height = selector.querySelector('ul').offsetHeight + "px";
				selector.style.top = -1 * parseFloat(selector.offsetHeight) + "px";
			});
		}

		for (var _i3 = 0, _total3 = outEvents.length; _i3 < _total3; _i3++) {
			selector.addEventListener(outEvents[_i3], function () {
				mejs.Utils.addClass(this, t.options.classPrefix + "offscreen");
			});
		}

		for (var _i4 = 0, _total4 = radios.length; _i4 < _total4; _i4++) {
			var radio = radios[_i4];
			radio.disabled = false;
			radio.addEventListener('click', function () {
				var self = this,
				    newQuality = self.value;

				var selected = player.qualitiesButton.querySelectorAll("." + t.options.classPrefix + "qualities-selected");
				for (var _i5 = 0, _total5 = selected.length; _i5 < _total5; _i5++) {
					mejs.Utils.removeClass(selected[_i5], t.options.classPrefix + "qualities-selected");
				}

				self.checked = true;
				var siblings = mejs.Utils.siblings(self, function (el) {
					return mejs.Utils.hasClass(el, t.options.classPrefix + "qualities-selector-label");
				});
				for (var j = 0, _total6 = siblings.length; j < _total6; j++) {
					mejs.Utils.addClass(siblings[j], t.options.classPrefix + "qualities-selected");
				}

				var currentTime = media.currentTime;

				var paused = media.paused,
				    canPlayAfterSourceSwitchHandler = function canPlayAfterSourceSwitchHandler() {
					if (!paused) {
						media.setCurrentTime(currentTime);
						media.play();
					}
					media.removeEventListener('canplay', canPlayAfterSourceSwitchHandler);
				};

				for (var _i6 = 0, _total7 = qualities.length; _i6 < _total7; _i6++) {
					var _src = qualities[_i6],
					    _quality = _src instanceof HTMLElement ? _src.getAttribute('data-quality') : _src['data-quality'];

					if (_quality === newQuality) {
						player.qualitiesButton.querySelector('button').innerHTML = _src.title || getQualityNameFromValue(newQuality);
						media.pause();
						media.setSrc(_src.src);
						media.load();
						media.addEventListener('canplay', canPlayAfterSourceSwitchHandler);
					}
				}
			});
		}

		for (var _i7 = 0, _total8 = labels.length; _i7 < _total8; _i7++) {
			labels[_i7].addEventListener('click', function () {
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
	},
	clearquality: function clearquality(player) {
		if (player) {
			if (player.qualitiesButton) {
				player.qualitiesButton.remove();
			}
		}
	}
});

},{}]},{},[1]);
