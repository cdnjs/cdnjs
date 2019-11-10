(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Speed button
 *
 * This feature creates a button to speed media in different levels.
 */

// Translations (English required)

mejs.i18n.en["mejs.speed-rate"] = "Speed Rate";

// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
  * The speeds media can be accelerated
  *
  * Supports an array of float values or objects with format
  * [{name: 'Slow', value: '0.75'}, {name: 'Normal', value: '1.00'}, ...]
  * @type {{String[]|Object[]}}
  */
	speeds: ['2.00', '1.50', '1.25', '1.00', '0.75'],
	/**
  * @type {String}
  */
	defaultSpeed: '1.00',
	/**
  * @type {String}
  */
	speedChar: 'x',
	/**
  * @type {?String}
  */
	speedText: null
});

Object.assign(MediaElementPlayer.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {HTMLElement} controls
  * @param {HTMLElement} layers
  * @param {HTMLElement} media
  */
	buildspeed: function buildspeed(player, controls, layers, media) {
		var t = this,
		    isNative = t.media.rendererName !== null && /(native|html5)/i.test(t.media.rendererName);

		if (!isNative) {
			return;
		}

		var speeds = [],
		    speedTitle = mejs.Utils.isString(t.options.speedText) ? t.options.speedText : mejs.i18n.t('mejs.speed-rate'),
		    getSpeedNameFromValue = function getSpeedNameFromValue(value) {
			for (var i = 0, total = speeds.length; i < total; i++) {
				if (speeds[i].value === value) {
					return speeds[i].name;
				}
			}
		};

		var playbackSpeed = void 0,
		    defaultInArray = false;

		for (var i = 0, total = t.options.speeds.length; i < total; i++) {
			var s = t.options.speeds[i];

			if (typeof s === 'string') {
				speeds.push({
					name: "" + s + t.options.speedChar,
					value: s
				});

				if (s === t.options.defaultSpeed) {
					defaultInArray = true;
				}
			} else {
				speeds.push(s);
				if (s.value === t.options.defaultSpeed) {
					defaultInArray = true;
				}
			}
		}

		if (!defaultInArray) {
			speeds.push({
				name: t.options.defaultSpeed + t.options.speedChar,
				value: t.options.defaultSpeed
			});
		}

		speeds.sort(function (a, b) {
			return parseFloat(b.value) - parseFloat(a.value);
		});

		t.clearspeed(player);

		player.speedButton = document.createElement('div');
		player.speedButton.className = t.options.classPrefix + "button " + t.options.classPrefix + "speed-button";
		player.speedButton.innerHTML = "<button type=\"button\" aria-controls=\"" + t.id + "\" title=\"" + speedTitle + "\" " + ("aria-label=\"" + speedTitle + "\" tabindex=\"0\">" + getSpeedNameFromValue(t.options.defaultSpeed) + "</button>") + ("<div class=\"" + t.options.classPrefix + "speed-selector " + t.options.classPrefix + "offscreen\">") + ("<ul class=\"" + t.options.classPrefix + "speed-selector-list\"></ul>") + "</div>";

		t.addControlElement(player.speedButton, 'speed');

		for (var _i = 0, _total = speeds.length; _i < _total; _i++) {

			var inputId = t.id + "-speed-" + speeds[_i].value;

			player.speedButton.querySelector('ul').innerHTML += "<li class=\"" + t.options.classPrefix + "speed-selector-list-item\">" + ("<input class=\"" + t.options.classPrefix + "speed-selector-input\" type=\"radio\" name=\"" + t.id + "_speed\"") + ("disabled=\"disabled\" value=\"" + speeds[_i].value + "\" id=\"" + inputId + "\"  ") + ((speeds[_i].value === t.options.defaultSpeed ? ' checked="checked"' : '') + "/>") + ("<label class=\"" + t.options.classPrefix + "speed-selector-label") + ((speeds[_i].value === t.options.defaultSpeed ? " " + t.options.classPrefix + "speed-selected" : '') + "\">") + (speeds[_i].name + "</label>") + "</li>";
		}

		playbackSpeed = t.options.defaultSpeed;

		player.speedSelector = player.speedButton.querySelector("." + t.options.classPrefix + "speed-selector");

		var inEvents = ['mouseenter', 'focusin'],
		    outEvents = ['mouseleave', 'focusout'],


		// Enable inputs after they have been appended to controls to avoid tab and up/down arrow focus issues
		radios = player.speedButton.querySelectorAll('input[type="radio"]'),
		    labels = player.speedButton.querySelectorAll("." + t.options.classPrefix + "speed-selector-label");

		// hover or keyboard focus
		for (var _i2 = 0, _total2 = inEvents.length; _i2 < _total2; _i2++) {
			player.speedButton.addEventListener(inEvents[_i2], function () {
				mejs.Utils.removeClass(player.speedSelector, t.options.classPrefix + "offscreen");
				player.speedSelector.style.height = player.speedSelector.querySelector('ul').offsetHeight;
				player.speedSelector.style.top = -1 * parseFloat(player.speedSelector.offsetHeight) + "px";
			});
		}

		for (var _i3 = 0, _total3 = outEvents.length; _i3 < _total3; _i3++) {
			player.speedSelector.addEventListener(outEvents[_i3], function () {
				mejs.Utils.addClass(this, t.options.classPrefix + "offscreen");
			});
		}

		for (var _i4 = 0, _total4 = radios.length; _i4 < _total4; _i4++) {
			var radio = radios[_i4];
			radio.disabled = false;
			radio.addEventListener('click', function () {
				var self = this,
				    newSpeed = self.value;

				playbackSpeed = newSpeed;
				media.playbackRate = parseFloat(newSpeed);
				player.speedButton.querySelector('button').innerHTML = getSpeedNameFromValue(newSpeed);
				var selected = player.speedButton.querySelectorAll("." + t.options.classPrefix + "speed-selected");
				for (var _i5 = 0, _total5 = selected.length; _i5 < _total5; _i5++) {
					mejs.Utils.removeClass(selected[_i5], t.options.classPrefix + "speed-selected");
				}

				self.checked = true;
				var siblings = mejs.Utils.siblings(self, function (el) {
					return mejs.Utils.hasClass(el, t.options.classPrefix + "speed-selector-label");
				});
				for (var j = 0, _total6 = siblings.length; j < _total6; j++) {
					mejs.Utils.addClass(siblings[j], t.options.classPrefix + "speed-selected");
				}
			});
		}

		for (var _i6 = 0, _total7 = labels.length; _i6 < _total7; _i6++) {
			labels[_i6].addEventListener('click', function () {
				var radio = mejs.Utils.siblings(this, function (el) {
					return el.tagName === 'INPUT';
				})[0],
				    event = mejs.Utils.createEvent('click', radio);
				radio.dispatchEvent(event);
			});
		}

		//Allow up/down arrow to change the selected radio without changing the volume.
		player.speedSelector.addEventListener('keydown', function (e) {
			e.stopPropagation();
		});

		media.addEventListener('loadedmetadata', function () {
			if (playbackSpeed) {
				media.playbackRate = parseFloat(playbackSpeed);
			}
		});
	},

	/**
  * Feature destructor.
  *
  * Always has to be prefixed with `clean` and the name that was used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  */
	clearspeed: function clearspeed(player) {
		if (player) {
			if (player.speedButton) {
				player.speedButton.parentNode.removeChild(player.speedButton);
			}
			if (player.speedSelector) {
				player.speedSelector.parentNode.removeChild(player.speedSelector);
			}
		}
	}
});

},{}]},{},[1]);
