(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Speed button
 *
 * This feature creates a button to speed media in different levels.
 */

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
  * @type {String}
  */
	speedText: ''
});

Object.assign(MediaElementPlayer.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildspeed: function buildspeed(player, controls, layers, media) {
		var t = this,
		    isNative = t.media.rendererName !== null && t.media.rendererName.match(/(native|html5)/) !== null;

		if (!isNative) {
			return;
		}

		var playbackSpeed = void 0,
		    inputId = void 0,
		    speedTitle = t.options.speedText ? t.options.speedText : mejs.i18n.t('mejs.speed-rate'),
		    speeds = [],
		    defaultInArray = false,
		    getSpeedNameFromValue = function getSpeedNameFromValue(value) {
			for (var i = 0, len = speeds.length; i < len; i++) {
				if (speeds[i].value === value) {
					return speeds[i].name;
				}
			}
		};

		for (var i = 0, len = t.options.speeds.length; i < len; i++) {
			var s = t.options.speeds[i];

			if (typeof s === 'string') {
				speeds.push({
					name: '' + s + t.options.speedChar,
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

		player.speedButton = $('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'speed-button">' + ('<button type="button" aria-controls="' + t.id + '" title="' + speedTitle + '" ') + ('aria-label="' + speedTitle + '" tabindex="0">' + getSpeedNameFromValue(t.options.defaultSpeed) + '</button>') + ('<div class="' + t.options.classPrefix + 'speed-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'speed-selector-list"></ul>') + '</div>' + '</div>').appendTo(controls);

		for (var _i = 0, il = speeds.length; _i < il; _i++) {

			inputId = t.id + '-speed-' + speeds[_i].value;

			player.speedButton.find('ul').append($('<li class="' + t.options.classPrefix + 'speed-selector-list-item">' + ('<input class="' + t.options.classPrefix + 'speed-selector-input" type="radio" name="' + t.id + '_speed"') + ('disabled="disabled" value="' + speeds[_i].value + '" id="' + inputId + '"  ') + ((speeds[_i].value === t.options.defaultSpeed ? ' checked="checked"' : '') + '/>') + ('<label class="' + t.options.classPrefix + 'speed-selector-label') + ((speeds[_i].value === t.options.defaultSpeed ? ' ' + t.options.classPrefix + 'speed-selected' : '') + '">') + (speeds[_i].name + '</label>') + '</li>'));
		}

		playbackSpeed = t.options.defaultSpeed;

		// Enable inputs after they have been appended to controls to avoid tab and up/down arrow focus issues
		$.each(player.speedButton.find('input[type="radio"]'), function () {
			$(this).prop('disabled', false);
		});

		player.speedSelector = player.speedButton.find('.' + t.options.classPrefix + 'speed-selector');

		// hover or keyboard focus
		player.speedButton.on('mouseenter focusin', function () {
			player.speedSelector.removeClass(t.options.classPrefix + 'offscreen').height(player.speedSelector.find('ul').outerHeight(true)).css('top', -1 * player.speedSelector.height() + 'px');
		}).on('mouseleave focusout', function () {
			player.speedSelector.addClass(t.options.classPrefix + 'offscreen');
		})
		// handle clicks to the language radio buttons
		.on('click', 'input[type=radio]', function () {
			var self = $(this),
			    newSpeed = self.val();

			playbackSpeed = newSpeed;
			media.playbackRate = parseFloat(newSpeed);
			player.speedButton.find('button').html(getSpeedNameFromValue(newSpeed)).end().find('.' + t.options.classPrefix + 'speed-selected').removeClass(t.options.classPrefix + 'speed-selected').end().find('input[type="radio"]');

			self.prop('checked', true).siblings('.' + t.options.classPrefix + 'speed-selector-label').addClass(t.options.classPrefix + 'speed-selected');
		}).on('click', '.' + t.options.classPrefix + 'speed-selector-label', function () {
			$(this).siblings('input[type="radio"]').trigger('click');
		})
		//Allow up/down arrow to change the selected radio without changing the volume.
		.on('keydown', function (e) {
			e.stopPropagation();
		});

		media.addEventListener('loadedmetadata', function () {
			if (playbackSpeed) {
				media.playbackRate = parseFloat(playbackSpeed);
			}
		}, true);
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
				player.speedButton.remove();
			}
			if (player.speedSelector) {
				player.speedSelector.remove();
			}
		}
	}
});

},{}]},{},[1]);
