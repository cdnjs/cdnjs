(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Postroll plugin
 *
 * This feature allows the injection of any HTML content in an independent layer once the media finished.
 * To activate it, one of the nodes contained in the `<video>` tag must be
 * `<link href="/path/to/action_to_display_content" rel="postroll">`
 */

// Translations (English required)

mejs.i18n.en["mejs.close"] = "Close";

// Feature configuration
Object.assign(mejs.MepDefaults, {
	/**
  * @type {?String}
  */
	postrollCloseText: null
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
	buildpostroll: function buildpostroll(player, controls, layers) {
		var t = this,
		    postrollTitle = mejs.Utils.isString(t.options.postrollCloseText) ? t.options.postrollCloseText : mejs.i18n.t('mejs.close'),
		    postrollLink = t.container.find('link[rel="postroll"]').attr('href');

		if (postrollLink !== undefined) {
			player.postroll = $("<div class=\"" + t.options.classPrefix + "postroll-layer " + t.options.classPrefix + "layer\">" + ("<a class=\"" + t.options.classPrefix + "postroll-close\" onclick=\"$(this).parent().hide();return false;\">") + ("" + postrollTitle) + "</a>" + ("<div class=\"" + t.options.classPrefix + "postroll-layer-content\"></div>") + "</div>").prependTo(layers).hide();

			t.media.addEventListener('ended', function () {
				$.ajax({
					dataType: 'html',
					url: postrollLink,
					success: function success(data) {
						layers.find("." + t.options.classPrefix + "postroll-layer-content").html(data);
					}
				});
				player.postroll.show();
			}, false);
		}
	}
});

},{}]},{},[1]);
