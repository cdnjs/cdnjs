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

mejs.i18n.en['mejs.playlist'] = 'Toggle Playlist';
mejs.i18n.en['mejs.playlist-prev'] = 'Previous';
mejs.i18n.en['mejs.playlist-next'] = 'Next';
mejs.i18n.en['mejs.playlist-loop'] = 'Loop';
mejs.i18n.en['mejs.playlist-shuffle'] = 'Shuffle';

Object.assign(mejs.MepDefaults, {
	playlist: [],

	showPlaylist: true,

	autoClosePlaylist: false,

	prevText: null,

	nextText: null,

	loopText: null,

	shuffleText: null,

	playlistTitle: null,

	currentMessage: null
});

Object.assign(MediaElementPlayer.prototype, {
	buildplaylist: function buildplaylist(player, controls, layers, media) {

		var defaultPlaylistTitle = mejs.i18n.t('mejs.playlist'),
		    playlistTitle = mejs.Utils.isString(player.options.playlistTitle) ? player.options.playlistTitle : defaultPlaylistTitle;

		if (player.createPlayList_()) {
			return;
		}

		player.currentPlaylistItem = 0;
		player.originalControlsIndex = controls.style.zIndex;
		controls.style.zIndex = 5;

		player.endedCallback = function () {
			if (player.currentPlaylistItem < player.listItems.length) {
				player.setSrc(player.playlist[++player.currentPlaylistItem]);
				player.load();
				setTimeout(function () {
					player.play();
				}, 200);
			}
		};

		media.addEventListener('ended', player.endedCallback);

		if (!player.isVideo) {
			var currentItem = document.createElement('div'),
			    audioCallback = function audioCallback() {
				currentItem.innerHTML = '';
				if (typeof player.playlist[player.currentPlaylistItem]['data-playlist-thumbnail'] !== 'undefined') {
					currentItem.innerHTML += '<img tabindex="-1" src="' + player.playlist[player.currentPlaylistItem]['data-playlist-thumbnail'] + '">';
				}

				currentItem.innerHTML += '<p>' + (player.options.currentMessage || '') + ' <span class="' + player.options.classPrefix + 'playlist-current-title">' + player.playlist[player.currentPlaylistItem].title + '</span>';
				if (typeof player.playlist[player.currentPlaylistItem].description !== 'undefined') {
					currentItem.innerHTML += ' - <span class="' + player.options.classPrefix + 'playlist-current-description">' + player.playlist[player.currentPlaylistItem].description + '</span>';
				}
				currentItem.innerHTML += '</p>';
				player.resetSize();
			};
			currentItem.className = player.options.classPrefix + 'playlist-current ' + player.options.classPrefix + 'layer';
			audioCallback();
			layers.insertBefore(currentItem, layers.firstChild);
			media.addEventListener('play', audioCallback);
		}

		if (player.options.showPlaylist) {
			player.playlistLayer = document.createElement('div');
			player.playlistLayer.className = player.options.classPrefix + 'playlist-layer  ' + player.options.classPrefix + 'layer ' + (player.isVideo ? player.options.classPrefix + 'playlist-hidden' : '') + ' ' + player.options.classPrefix + 'playlist-selector';
			player.playlistLayer.innerHTML = '<ul class="' + player.options.classPrefix + 'playlist-selector-list"></ul>';
			layers.insertBefore(player.playlistLayer, layers.firstChild);

			for (var i = 0, total = player.listItems.length; i < total; i++) {
				player.playlistLayer.querySelector('ul').innerHTML += player.listItems[i];
			}

			if (player.isVideo) {
				player.playlistButton = document.createElement('div');
				player.playlistButton.className = player.options.classPrefix + 'button ' + player.options.classPrefix + 'playlist-button';
				player.playlistButton.innerHTML = '<button type="button" aria-controls="' + player.id + '" title="' + playlistTitle + '" aria-label="' + playlistTitle + '" tabindex="0"></button>';
				player.playlistButton.addEventListener('click', function () {
					mejs.Utils.toggleClass(player.playlistLayer, player.options.classPrefix + 'playlist-hidden');
				});
				player.addControlElement(player.playlistButton, 'playlist');
			} else {
				var _items = player.playlistLayer.querySelectorAll('li');

				if (_items.length <= 10) {
					var height = 0;
					for (var _i = 0, _total = _items.length; _i < _total; _i++) {
						height += _items[_i].offsetHeight;
					}
					player.container.style.height = height + 'px';
				}
			}

			var items = player.playlistLayer.querySelectorAll('.' + player.options.classPrefix + 'playlist-selector-list-item'),
			    inputs = player.playlistLayer.querySelectorAll('input[type=radio]');

			for (var _i2 = 0, _total2 = inputs.length; _i2 < _total2; _i2++) {
				inputs[_i2].disabled = false;
				inputs[_i2].addEventListener('click', function () {
					var radios = player.playlistLayer.querySelectorAll('input[type="radio"]'),
					    selected = player.playlistLayer.querySelectorAll('.' + player.options.classPrefix + 'playlist-selected');

					for (var j = 0, total2 = radios.length; j < total2; j++) {
						radios[j].checked = false;
					}
					for (var _j = 0, _total3 = selected.length; _j < _total3; _j++) {
						mejs.Utils.removeClass(selected[_j], player.options.classPrefix + 'playlist-selected');
						selected[_j].querySelector('label').querySelector('span').remove();
					}

					this.checked = true;
					this.closest('.' + player.options.classPrefix + 'playlist-selector-list-item').querySelector('label').innerHTML = '<span>\u25B6</span> ' + this.closest('.' + player.options.classPrefix + 'playlist-selector-list-item').querySelector('label').innerHTML;
					mejs.Utils.addClass(this.closest('.' + player.options.classPrefix + 'playlist-selector-list-item'), player.options.classPrefix + 'playlist-selected');
					player.currentPlaylistItem = this.getAttribute('data-playlist-index');
					player.setSrc(this.value);
					player.load();
					player.play();

					if (player.isVideo && player.options.autoClosePlaylist === true) {
						mejs.Utils.toggleClass(player.playlistLayer, player.options.classPrefix + 'playlist-hidden');
					}
				});
			}

			for (var _i3 = 0, _total4 = items.length; _i3 < _total4; _i3++) {
				items[_i3].addEventListener('click', function () {
					var radio = mejs.Utils.siblings(this.querySelector('.' + player.options.classPrefix + 'playlist-selector-label'), function (el) {
						return el.tagName === 'INPUT';
					})[0],
					    event = mejs.Utils.createEvent('click', radio);
					radio.dispatchEvent(event);
				});
			}

			player.keydownCallback = function (e) {
				var event = mejs.Utils.createEvent('click', e.target);
				e.target.dispatchEvent(event);
				return false;
			};

			player.playlistLayer.addEventListener('keydown', function (e) {
				var keyCode = e.which || e.keyCode || 0;
				if (~[13, 32, 38, 40].indexOf(keyCode)) {
					player.keydownCallback(e);
				}
			});
		} else {
			mejs.Utils.addClass(player.container, player.options.classPrefix + 'no-playlist');
		}
	},
	cleanplaylist: function cleanplaylist(player, controls, layers, media) {
		media.removeEventListener('ended', player.endedCallback);
	},
	buildprevtrack: function buildprevtrack(player) {

		var defaultPrevTitle = mejs.i18n.t('mejs.playlist-prev'),
		    prevTitle = mejs.Utils.isString(player.options.prevText) ? player.options.prevText : defaultPrevTitle;
		player.prevButton = document.createElement('div');
		player.prevButton.className = player.options.classPrefix + 'button ' + player.options.classPrefix + 'prev-button';
		player.prevButton.innerHTML = '<button type="button" aria-controls="' + player.id + '" title="' + prevTitle + '" aria-label="' + prevTitle + '" tabindex="0"></button>';

		player.prevPlaylistCallback = function () {
			if (player.playlist[--player.currentPlaylistItem]) {
				player.setSrc(player.playlist[player.currentPlaylistItem].src);
				player.load();
				player.play();
			} else {
				++player.currentPlaylistItem;
			}
		};

		player.prevButton.addEventListener('click', player.prevPlaylistCallback);
		player.addControlElement(player.prevButton, 'prevtrack');
	},
	cleanprevtrack: function cleanprevtrack(player) {
		player.prevButton.removeEventListener('click', player.prevPlaylistCallback);
	},
	buildnexttrack: function buildnexttrack(player) {
		var defaultNextTitle = mejs.i18n.t('mejs.playlist-next'),
		    nextTitle = mejs.Utils.isString(player.options.nextText) ? player.options.nextText : defaultNextTitle;
		player.nextButton = document.createElement('div');
		player.nextButton.className = player.options.classPrefix + 'button ' + player.options.classPrefix + 'next-button';
		player.nextButton.innerHTML = '<button type="button" aria-controls="' + player.id + '" title="' + nextTitle + '" aria-label="' + nextTitle + '" tabindex="0"></button>';

		player.nextPlaylistCallback = function () {
			if (player.playlist[++player.currentPlaylistItem]) {
				player.setSrc(player.playlist[player.currentPlaylistItem].src);
				player.load();
				player.play();
			} else {
				--player.currentPlaylistItem;
			}
		};

		player.nextButton.addEventListener('click', player.nextPlaylistCallback);
		player.addControlElement(player.nextButton, 'nexttrack');
	},
	cleannexttrack: function cleannexttrack(player) {
		player.nextButton.removeEventListener('click', player.nextPlaylistCallback);
	},
	buildloop: function buildloop(player) {
		var defaultLoopTitle = mejs.i18n.t('mejs.playlist-loop'),
		    loopTitle = mejs.Utils.isString(player.options.loopText) ? player.options.loopText : defaultLoopTitle;

		player.loopButton = document.createElement('div');
		player.loopButton.className = player.options.classPrefix + 'button ' + player.options.classPrefix + 'loop-button ' + (player.options.loop ? player.options.classPrefix + 'loop-on' : player.options.classPrefix + 'loop-off');
		player.loopButton.innerHTML = '<button type="button" aria-controls="' + player.id + '" title="' + loopTitle + '" aria-label="' + loopTitle + '" tabindex="0"></button>';
		player.loopCallback = function () {
			player.options.loop = !player.options.loop;
			if (player.options.loop) {
				mejs.Utils.removeClass(player.loopButton, player.options.classPrefix + 'loop-off');
				mejs.Utils.addClass(player.loopButton, player.options.classPrefix + 'loop-on');
			} else {
				mejs.Utils.removeClass(player.loopButton, player.options.classPrefix + 'loop-on');
				mejs.Utils.addClass(player.loopButton, player.options.classPrefix + 'loop-off');
			}
		};

		player.loopButton.addEventListener('click', player.loopCallback);
		player.addControlElement(player.loopButton, 'loop');
	},
	cleanloop: function cleanloop(player) {
		player.loopButton.removeEventListener('click', player.loopCallback);
	},
	buildshuffle: function buildshuffle(player) {
		var defaultShuffleTitle = mejs.i18n.t('mejs.playlist-shuffle'),
		    shuffleTitle = mejs.Utils.isString(player.options.shuffleText) ? player.options.shuffleText : defaultShuffleTitle;
		player.shuffleButton = document.createElement('div');
		player.shuffleButton.className = player.options.classPrefix + 'button ' + player.options.classPrefix + 'shuffle-button ' + player.options.classPrefix + 'shuffle-off';
		player.shuffleButton.innerHTML = '<button type="button" aria-controls="' + player.id + '" title="' + shuffleTitle + '" aria-label="' + shuffleTitle + '" tabindex="0"></button>';
		player.shuffleButton.style.display = 'none';
		player.media.addEventListener('play', function () {
			player.shuffleButton.style.display = '';
			player.resetSize();
		});

		var enabled = false,
		    playedItems = [];
		var randomizeCallback = function randomizeCallback() {
			if (!player.options.loop) {
				var randomItem = Math.floor(Math.random() * player.playlist.length);
				if (playedItems.indexOf(randomItem) === -1) {
					player.setSrc(player.playlist[randomItem].src);
					player.load();
					player.play();
					player.currentPlaylistItem = randomItem;
					playedItems.push(randomItem);
				} else if (playedItems.length < player.playlist.length) {
					player.shuffleCallback();
				} else if (playedItems.length < player.playlist.length) {
					playedItems = [];
					player.currentPlaylistItem = randomItem;
					playedItems.push(randomItem);
				}
			}
		};

		player.shuffleCallback = function () {
			if (!enabled) {
				mejs.Utils.removeClass(player.shuffleButton, player.options.classPrefix + 'shuffle-off');
				mejs.Utils.addClass(player.shuffleButton, player.options.classPrefix + 'shuffle-on');
				enabled = true;
				player.media.addEventListener('ended', randomizeCallback);
			} else {
				mejs.Utils.removeClass(player.shuffleButton, player.options.classPrefix + 'shuffle-on');
				mejs.Utils.addClass(player.shuffleButton, player.options.classPrefix + 'shuffle-off');
				enabled = false;
				player.media.removeEventListener('ended', randomizeCallback);
			}
		};

		player.shuffleButton.addEventListener('click', player.shuffleCallback);
		player.addControlElement(player.shuffleButton, 'shuffle');
	},
	cleanshuffle: function cleanshuffle(player) {
		player.shuffleButton.removeEventListener('click', player.shuffleCallback);
	},
	createPlayList_: function createPlayList_() {
		var t = this;

		t.playlist = t.options.playlist.length ? t.options.playlist : t.mediaFiles && t.mediaFiles.length ? t.mediaFiles : [];

		if (!t.playlist.length) {
			var children = t.media.originalNode.children;

			for (var i = 0, total = children.length; i < total; i++) {
				var childNode = children[i];

				if (childNode.tagName.toLowerCase() === 'source') {
					(function () {
						var elements = {};
						Array.prototype.slice.call(childNode.attributes).forEach(function (item) {
							elements[item.name] = item.value;
						});

						if (elements.src && elements.type && elements.title) {
							elements.type = mejs.Utils.formatType(elements.src, elements.type);
							t.playlist.push(elements);
						}
					})();
				}
			}
		}

		if (t.playlist.length < 2) {
			return;
		}

		t.listItems = [];
		for (var _i4 = 0, _total5 = t.playlist.length; _i4 < _total5; _i4++) {
			var element = t.playlist[_i4],
			    item = document.createElement('li'),
			    id = t.id + '_playlist_item_' + _i4,
			    thumbnail = element['data-playlist-thumbnail'] ? '<div class="' + t.options.classPrefix + 'playlist-item-thumbnail"><img tabindex="-1" src="' + element['data-playlist-thumbnail'] + '"></div>' : '',
			    description = element['data-playlist-description'] ? '<div class="' + t.options.classPrefix + 'playlist-item-description">' + element['data-playlist-description'] + '</div>' : '';
			item.tabIndex = 0;
			item.className = t.options.classPrefix + 'playlist-selector-list-item' + (_i4 === 0 ? ' ' + t.options.classPrefix + 'playlist-selected' : '');
			item.innerHTML = '<div class="' + t.options.classPrefix + 'playlist-item-inner">' + ('' + thumbnail) + ('<div class="' + t.options.classPrefix + 'playlist-item-content">') + ('<div><input type="radio" class="' + t.options.classPrefix + 'playlist-selector-input" ') + ('name="' + t.id + '_playlist" id="' + id + '" data-playlist-index="' + _i4 + '" value="' + element.src + '" disabled>') + ('<label class="' + t.options.classPrefix + 'playlist-selector-label" ') + ('for="' + id + '">' + (_i4 === 0 ? '<span>\u25B6</span> ' : '') + (element.title || _i4) + '</label></div>' + description + '</div></div>');

			t.listItems.push(item.outerHTML);
		}
	}
});

},{}]},{},[1]);
