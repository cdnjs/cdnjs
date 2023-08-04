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

mejs.i18n.en['mejs.close'] = 'Close';

Object.assign(mejs.MepDefaults, {
	postrollCloseText: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildpostroll: function buildpostroll(player, controls, layers) {
		var t = this,
		    postrollTitle = mejs.Utils.isString(t.options.postrollCloseText) ? t.options.postrollCloseText : mejs.i18n.t('mejs.close'),
		    postrollLink = t.container.querySelector('link[rel="postroll"]');

		if (postrollLink) {
			player.postroll = document.createElement('div');
			player.postroll.className = t.options.classPrefix + 'postroll-layer ' + t.options.classPrefix + 'layer';
			player.postroll.innerHTML = '<a class="' + t.options.classPrefix + 'postroll-close" href="#">' + postrollTitle + '</a>' + ('<div class="' + t.options.classPrefix + 'postroll-layer-content"></div>');
			player.postroll.style.display = 'none';

			layers.insertBefore(player.postroll, layers.firstChild);

			player.postroll.querySelector('.' + t.options.classPrefix + 'postroll-close').addEventListener('click', function (e) {
				this.parentNode.style.display = 'none';
				e.preventDefault();
				e.stopPropagation();
			});

			t.media.addEventListener('ended', function () {
				mejs.Utils.ajax(postrollLink.getAttribute('href'), 'html', function (data) {
					layers.querySelector('.' + t.options.classPrefix + 'postroll-layer-content').innerHTML = data;
				});
				player.postroll.style.display = 'block';
			}, false);

			t.media.addEventListener('seeked', function () {
				player.postroll.style.display = 'none';
			}, false);

			t.media.addEventListener('playing', function () {
				player.postroll.style.display = 'none';
			}, false);
		}
	}
});

},{}]},{},[1]);
