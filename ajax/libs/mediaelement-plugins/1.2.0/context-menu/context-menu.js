(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/*
 * ContextMenu
 *
 */

Object.assign(mejs.MepDefaults, {
	contextMenuItems: [
	// demo of a fullscreen option
	{
		render: function render(player) {

			// check for fullscreen plugin
			if (player.enterFullScreen === undefined) {
				return null;
			}

			if (player.isFullScreen) {
				return mejs.i18n.t('mejs.fullscreen-off');
			} else {
				return mejs.i18n.t('mejs.fullscreen-on');
			}
		},
		click: function click(player) {
			if (player.isFullScreen) {
				player.exitFullScreen();
			} else {
				player.enterFullScreen();
			}
		}
	},
	// demo of a mute/unmute button
	{
		render: function render(player) {
			if (player.media.muted) {
				return mejs.i18n.t('mejs.unmute');
			} else {
				return mejs.i18n.t('mejs.mute');
			}
		},
		click: function click(player) {
			if (player.media.muted) {
				player.setMuted(false);
			} else {
				player.setMuted(true);
			}
		}
	},
	// separator
	{
		isSeparator: true
	},
	// demo of simple download video
	{
		render: function render() {
			return mejs.i18n.t('mejs.download-video');
		},
		click: function click(player) {
			window.location.href = player.media.currentSrc;
		}
	}]
});

Object.assign(MediaElementPlayer.prototype, {
	buildcontextmenu: function buildcontextmenu(player) {

		// create context menu
		player.contextMenu = $('<div class="' + t.options.classPrefix + 'contextmenu"></div>').appendTo($('body')).hide();

		// create events for showing context menu
		player.container.on('contextmenu', function (e) {
			if (player.isContextMenuEnabled) {
				e.preventDefault();
				player.renderContextMenu(e.clientX - 1, e.clientY - 1);
				return false;
			}
		});
		player.container.on('click', function () {
			player.contextMenu.hide();
		});
		player.contextMenu.on('mouseleave', function () {
			player.startContextMenuTimer();
		});
	},

	cleancontextmenu: function cleancontextmenu(player) {
		player.contextMenu.remove();
	},

	isContextMenuEnabled: true,
	enableContextMenu: function enableContextMenu() {
		this.isContextMenuEnabled = true;
	},
	disableContextMenu: function disableContextMenu() {
		this.isContextMenuEnabled = false;
	},

	contextMenuTimeout: null,
	startContextMenuTimer: function startContextMenuTimer() {
		var t = this;

		t.killContextMenuTimer();

		t.contextMenuTimer = setTimeout(function () {
			t.hideContextMenu();
			t.killContextMenuTimer();
		}, 750);
	},
	killContextMenuTimer: function killContextMenuTimer() {
		var timer = this.contextMenuTimer;

		if (timer !== null && timer !== undefined) {
			clearTimeout(timer);
			timer = null;
		}
	},

	hideContextMenu: function hideContextMenu() {
		this.contextMenu.hide();
	},

	renderContextMenu: function renderContextMenu(x, y) {

		// alway re-render the items so that things like "turn fullscreen on" and "turn fullscreen off" are always written correctly
		var t = this,
		    html = '',
		    items = t.options.contextMenuItems;

		for (var i = 0, il = items.length; i < il; i++) {

			var item = items[i];

			if (item.isSeparator) {
				html += '<div class="' + t.options.classPrefix + 'contextmenu-separator"></div>';
			} else {

				var rendered = item.render(t);

				// render can return null if the item doesn't need to be used at the moment
				if (rendered !== null && rendered !== undefined) {
					html += '<div class="' + t.options.classPrefix + 'contextmenu-item"' + ('data-itemindex="' + i + '" id="element-' + Math.random() * 1000000 + '">' + rendered + '</div>');
				}
			}
		}

		// position and show the context menu
		t.contextMenu.empty().append($(html)).css({ top: y, left: x }).show();

		// bind events
		t.contextMenu.find('.' + t.options.classPrefix + 'contextmenu-item').each(function () {

			// which one is this?
			var $dom = $(this),
			    itemIndex = parseInt($dom.data('itemindex'), 10),
			    item = t.options.contextMenuItems[itemIndex];

			// bind extra functionality?
			if (typeof item.show !== 'undefined') {
				item.show($dom, t);
			}

			// bind click action
			$dom.click(function () {
				// perform click action
				if (typeof item.click !== 'undefined') {
					item.click(t);
				}

				// close
				t.contextMenu.hide();
			});
		});

		// stop the controls from hiding
		setTimeout(function () {
			t.killControlsTimer('rev3');
		}, 100);
	}
});

},{}]},{},[1]);
