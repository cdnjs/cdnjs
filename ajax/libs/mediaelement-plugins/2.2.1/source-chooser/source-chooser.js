(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Source chooser button
 *
 * This feature creates a button to speed media in different levels.
 */

// Translations (English required)

mejs.i18n.en["mejs.source-chooser"] = "Source Chooser";

// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
  * @type {?String}
  */
	sourcechooserText: null
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
	buildsourcechooser: function buildsourcechooser(player, controls, layers, media) {

		var t = this,
		    sourceTitle = mejs.Utils.isString(t.options.sourcechooserText) ? t.options.sourcechooserText : mejs.i18n.t('mejs.source-chooser'),
		    sources = [],
		    children = t.mediaFiles ? t.mediaFiles : t.node.childNodes;

		// add to list
		var hoverTimeout = void 0;

		for (var i = 0, total = children.length; i < total; i++) {
			var s = children[i];

			if (t.mediaFiles) {
				sources.push(s);
			} else if (s.nodeName === 'SOURCE') {
				sources.push(s);
			}
		}

		if (sources.length <= 1) {
			return;
		}

		player.sourcechooserButton = document.createElement('div');
		player.sourcechooserButton.className = t.options.classPrefix + "button " + t.options.classPrefix + "sourcechooser-button";
		player.sourcechooserButton.innerHTML = "<button type=\"button\" role=\"button\" aria-haspopup=\"true\" aria-owns=\"" + t.id + "\" title=\"" + sourceTitle + "\" aria-label=\"" + sourceTitle + "\" tabindex=\"0\"></button>" + ("<div class=\"" + t.options.classPrefix + "sourcechooser-selector " + t.options.classPrefix + "offscreen\" role=\"menu\" aria-expanded=\"false\" aria-hidden=\"true\"><ul></ul></div>");

		t.addControlElement(player.sourcechooserButton, 'sourcechooser');

		for (var _i = 0, _total = sources.length; _i < _total; _i++) {
			var src = sources[_i];
			if (src.type !== undefined && typeof media.canPlayType === 'function') {
				player.addSourceButton(src.src, src.title, src.type, media.src === src.src);
			}
		}

		// hover
		player.sourcechooserButton.addEventListener('mouseover', function () {
			clearTimeout(hoverTimeout);
			player.showSourcechooserSelector();
		});
		player.sourcechooserButton.addEventListener('mouseout', function () {
			hoverTimeout = setTimeout(function () {
				player.hideSourcechooserSelector();
			}, 0);
		});

		// keyboard menu activation
		player.sourcechooserButton.addEventListener('keydown', function (e) {

			if (t.options.keyActions.length) {
				var keyCode = e.which || e.keyCode || 0;

				switch (keyCode) {
					case 32:
						// space
						if (!mejs.MediaFeatures.isFirefox) {
							// space sends the click event in Firefox
							player.showSourcechooserSelector();
						}
						player.sourcechooserButton.querySelector('input[type=radio]:checked').focus();
						break;
					case 13:
						// enter
						player.showSourcechooserSelector();
						player.sourcechooserButton.querySelector('input[type=radio]:checked').focus();
						break;
					case 27:
						// esc
						player.hideSourcechooserSelector();
						player.sourcechooserButton.querySelector('button').focus();
						break;
					default:
						return true;
				}

				e.preventDefault();
				e.stopPropagation();
			}
		});

		// close menu when tabbing away
		player.sourcechooserButton.addEventListener('focusout', mejs.Utils.debounce(function () {
			// Safari triggers focusout multiple times
			// Firefox does NOT support e.relatedTarget to see which element
			// just lost focus, so wait to find the next focused element
			setTimeout(function () {
				var parent = document.activeElement.closest("." + t.options.classPrefix + "sourcechooser-selector");
				if (!parent) {
					// focus is outside the control; close menu
					player.hideSourcechooserSelector();
				}
			}, 0);
		}, 100));

		var radios = player.sourcechooserButton.querySelectorAll('input[type=radio]');

		for (var _i2 = 0, _total2 = radios.length; _i2 < _total2; _i2++) {
			// handle clicks to the source radio buttons
			radios[_i2].addEventListener('click', function () {
				// set aria states
				this.setAttribute('aria-selected', true);
				this.checked = true;

				var otherRadios = this.closest("." + t.options.classPrefix + "sourcechooser-selector").querySelectorAll('input[type=radio]');

				for (var j = 0, radioTotal = otherRadios.length; j < radioTotal; j++) {
					if (otherRadios[j] !== this) {
						otherRadios[j].setAttribute('aria-selected', 'false');
						otherRadios[j].removeAttribute('checked');
					}
				}

				var src = this.value;

				if (media.getSrc() !== src) {
					var currentTime = media.currentTime;

					var paused = media.paused,
					    canPlayAfterSourceSwitchHandler = function canPlayAfterSourceSwitchHandler() {
						if (!paused) {
							media.setCurrentTime(currentTime);
							media.play();
						}
						media.removeEventListener('canplay', canPlayAfterSourceSwitchHandler);
					};

					media.pause();
					media.setSrc(src);
					media.load();
					media.addEventListener('canplay', canPlayAfterSourceSwitchHandler);
				}
			});
		}

		// Handle click so that screen readers can toggle the menu
		player.sourcechooserButton.querySelector('button').addEventListener('click', function () {
			if (mejs.Utils.hasClass(mejs.Utils.siblings(this, "." + t.options.classPrefix + "sourcechooser-selector"), t.options.classPrefix + "offscreen")) {
				player.showSourcechooserSelector();
				player.sourcechooserButton.querySelector('input[type=radio]:checked').focus();
			} else {
				player.hideSourcechooserSelector();
			}
		});
	},

	/**
  *
  * @param {String} src
  * @param {String} label
  * @param {String} type
  * @param {Boolean} isCurrent
  */
	addSourceButton: function addSourceButton(src, label, type, isCurrent) {
		var t = this;
		if (label === '' || label === undefined) {
			label = src;
		}
		type = type.split('/')[1];

		t.sourcechooserButton.querySelector('ul').innerHTML += "<li>" + ("<input type=\"radio\" name=\"" + t.id + "_sourcechooser\" id=\"" + t.id + "_sourcechooser_" + label + type + "\"") + ("role=\"menuitemradio\" value=\"" + src + "\" " + (isCurrent ? 'checked="checked"' : '') + " aria-selected=\"" + isCurrent + "\"/>") + ("<label for=\"" + t.id + "_sourcechooser_" + label + type + "\" aria-hidden=\"true\">" + label + " (" + type + ")</label>") + "</li>";

		t.adjustSourcechooserBox();
	},

	/**
  *
  */
	adjustSourcechooserBox: function adjustSourcechooserBox() {
		var t = this;
		// adjust the size of the outer box
		t.sourcechooserButton.querySelector("." + t.options.classPrefix + "sourcechooser-selector").style.height = parseFloat(t.sourcechooserButton.querySelector("." + t.options.classPrefix + "sourcechooser-selector ul").offsetHeight) + "px";
	},

	/**
  *
  */
	hideSourcechooserSelector: function hideSourcechooserSelector() {

		var t = this;

		if (t.sourcechooserButton === undefined || !t.sourcechooserButton.querySelector('input[type=radio]')) {
			return;
		}

		var selector = t.sourcechooserButton.querySelector("." + t.options.classPrefix + "sourcechooser-selector"),
		    radios = selector.querySelectorAll('input[type=radio]');
		selector.setAttribute('aria-expanded', 'false');
		selector.setAttribute('aria-hidden', 'true');
		mejs.Utils.addClass(selector, t.options.classPrefix + "offscreen");

		// make radios not focusable
		for (var i = 0, total = radios.length; i < total; i++) {
			radios[i].setAttribute('tabindex', '-1');
		}
	},

	/**
  *
  */
	showSourcechooserSelector: function showSourcechooserSelector() {

		var t = this;

		if (t.sourcechooserButton === undefined || !t.sourcechooserButton.querySelector('input[type=radio]')) {
			return;
		}

		var selector = t.sourcechooserButton.querySelector("." + t.options.classPrefix + "sourcechooser-selector"),
		    radios = selector.querySelectorAll('input[type=radio]');
		selector.setAttribute('aria-expanded', 'true');
		selector.setAttribute('aria-hidden', 'false');
		mejs.Utils.removeClass(selector, t.options.classPrefix + "offscreen");

		// make radios not focusable
		for (var i = 0, total = radios.length; i < total; i++) {
			radios[i].setAttribute('tabindex', '0');
		}
	}
});

},{}]},{},[1]);
