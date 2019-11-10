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
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildsourcechooser: function buildsourcechooser(player, controls, layers, media) {

		var t = this,
		    sourceTitle = mejs.Utils.isString(t.options.sourcechooserText) ? t.options.sourcechooserText : mejs.i18n.t('mejs.source-chooser'),
		    sources = [];

		// add to list
		var hoverTimeout = void 0;

		for (var j in this.node.children) {
			var s = this.node.children[j];
			if (s.nodeName === 'SOURCE') {
				sources.push(s);
			}
		}

		if (sources.length <= 1) {
			return;
		}

		player.sourcechooserButton = $("<div class=\"" + t.options.classPrefix + "button " + t.options.classPrefix + "sourcechooser-button\">" + ("<button type=\"button\" role=\"button\" aria-haspopup=\"true\" aria-owns=\"" + t.id + "\" title=\"" + sourceTitle + "\"") + ("aria-label=\"" + sourceTitle + "\" tabindex=\"0\"></button>") + ("<div class=\"" + t.options.classPrefix + "sourcechooser-selector " + t.options.classPrefix + "offscreen\" role=\"menu\"") + "aria-expanded=\"false\" aria-hidden=\"true\">" + "<ul></ul>" + "</div>" + "</div>");

		if (t.featurePosition['sourcechooser'] !== undefined) {
			player.sourcechooserButton.insertAfter(controls.children(":eq(" + (t.featurePosition['sourcechooser'] - 1) + ")"));
		} else {
			player.sourcechooserButton.appendTo(controls);
			t.featurePosition['sourcechooser'] = controls.children("." + t.options.classPrefix + "sourcechooser-button").index();
		}

		// hover
		player.sourcechooserButton.hover(function () {
			clearTimeout(hoverTimeout);
			player.showSourcechooserSelector();
		}, function () {
			hoverTimeout = setTimeout(function () {
				player.hideSourcechooserSelector();
			}, 500);
		})

		// keyboard menu activation
		.on('keydown', function (e) {
			var keyCode = e.which || e.keyCode || 0;

			switch (keyCode) {
				case 32:
					// space
					if (!mejs.MediaFeatures.isFirefox) {
						// space sends the click event in Firefox
						player.showSourcechooserSelector();
					}
					$(this).find("." + t.options.classPrefix + "sourcechooser-selector").find('input[type=radio]:checked').first().focus();
					break;
				case 13:
					// enter
					player.showSourcechooserSelector();
					$(this).find("." + t.options.classPrefix + "sourcechooser-selector").find('input[type=radio]:checked').first().focus();
					break;
				case 27:
					// esc
					player.hideSourcechooserSelector();
					$(this).find('button').focus();
					break;
				default:
					return true;
			}
		})

		// close menu when tabbing away
		.on('focusout', mejs.Utils.debounce(function () {
			// Safari triggers focusout multiple times
			// Firefox does NOT support e.relatedTarget to see which element
			// just lost focus, so wait to find the next focused element
			setTimeout(function () {
				var parent = $(document.activeElement).closest("." + t.options.classPrefix + "sourcechooser-selector");
				if (!parent.length) {
					// focus is outside the control; close menu
					player.hideSourcechooserSelector();
				}
			}, 0);
		}, 100))

		// handle clicks to the source radio buttons
		.on('click', 'input[type=radio]', function () {
			// set aria states
			$(this).attr('aria-selected', true).attr('checked', 'checked');
			$(this).closest("." + t.options.classPrefix + "sourcechooser-selector").find('input[type=radio]').not(this).attr('aria-selected', 'false').removeAttr('checked');

			var src = this.value;

			if (media.currentSrc !== src) {
				(function () {
					var currentTime = media.currentTime;
					var paused = media.paused;
					media.pause();
					media.setSrc(src);
					media.load();

					media.addEventListener('loadedmetadata', function () {
						media.currentTime = currentTime;
					}, true);

					var canPlayAfterSourceSwitchHandler = function canPlayAfterSourceSwitchHandler() {
						if (!paused) {
							media.play();
						}
						media.removeEventListener('canplay', canPlayAfterSourceSwitchHandler, true);
					};
					media.addEventListener('canplay', canPlayAfterSourceSwitchHandler, true);
					media.load();
				})();
			}
		})

		// Handle click so that screen readers can toggle the menu
		.on('click', 'button', function () {
			if ($(this).siblings("." + t.options.classPrefix + "sourcechooser-selector").hasClass(t.options.classPrefix + "offscreen")) {
				player.showSourcechooserSelector();
				$(this).siblings("." + t.options.classPrefix + "sourcechooser-selector").find('input[type=radio]:checked').first().focus();
			} else {
				player.hideSourcechooserSelector();
			}
		});

		for (var i in sources) {
			var src = sources[i];
			if (src.type !== undefined && src.nodeName === 'SOURCE' && media.canPlayType !== null) {
				player.addSourceButton(src.src, src.title, src.type, media.src === src.src);
			}
		}
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

		t.sourcechooserButton.find('ul').append($("<li>" + ("<input type=\"radio\" name=\"" + t.id + "_sourcechooser\" id=\"" + t.id + "_sourcechooser_" + label + type + "\"") + ("role=\"menuitemradio\" value=\"" + src + "\" " + (isCurrent ? 'checked="checked"' : '') + " aria-selected=\"" + isCurrent + "\"/>") + ("<label for=\"" + t.id + "_sourcechooser_" + label + type + "\" aria-hidden=\"true\">" + label + " (" + type + ")</label>") + "</li>"));

		t.adjustSourcechooserBox();
	},

	/**
  *
  */
	adjustSourcechooserBox: function adjustSourcechooserBox() {
		var t = this;
		// adjust the size of the outer box
		t.sourcechooserButton.find("." + t.options.classPrefix + "sourcechooser-selector").height(t.sourcechooserButton.find("." + t.options.classPrefix + "sourcechooser-selector ul").outerHeight(true));
	},

	/**
  *
  */
	hideSourcechooserSelector: function hideSourcechooserSelector() {

		var t = this;

		if (t.sourcechooserButton === undefined || !t.sourcechooserButton.find("." + t.options.classPrefix + "sourcechooser-selector").find('input[type=radio]').length) {
			return;
		}

		t.sourcechooserButton.find("." + t.options.classPrefix + "sourcechooser-selector").addClass(t.options.classPrefix + "offscreen").attr('aria-expanded', 'false').attr('aria-hidden', 'true').find('input[type=radio]') // make radios not focusable
		.attr('tabindex', '-1');
	},

	/**
  *
  */
	showSourcechooserSelector: function showSourcechooserSelector() {

		var t = this;

		if (t.sourcechooserButton === undefined || !t.sourcechooserButton.find("." + t.options.classPrefix + "sourcechooser-selector").find('input[type=radio]').length) {
			return;
		}

		t.sourcechooserButton.find("." + t.options.classPrefix + "sourcechooser-selector").removeClass(t.options.classPrefix + "offscreen").attr('aria-expanded', 'true').attr('aria-hidden', 'false').find('input[type=radio]').attr('tabindex', '0');
	}
});

},{}]},{},[1]);
