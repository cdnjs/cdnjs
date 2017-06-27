(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

// Translations (English required)

mejs.i18n.en["mejs.fullscreen-off"] = "Turn off Fullscreen";
mejs.i18n.en["mejs.fullscreen-on"] = "Go Fullscreen";
mejs.i18n.en["mejs.download-video"] = "Download Video";

/*
 * ContextMenu
 *
 */
Object.assign(mejs.MepDefaults, {
	contextMenuItems: [{
		// demo of a fullscreen option
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

	isContextMenuEnabled: true,

	contextMenuTimeout: null,

	buildcontextmenu: function buildcontextmenu(player) {

		// create context menu
		if (!document.querySelector("." + player.options.classPrefix + "contextmenu")) {
			player.contextMenu = document.createElement('div');
			player.contextMenu.className = player.options.classPrefix + "contextmenu";
			player.contextMenu.style.display = 'none';

			document.body.appendChild(player.contextMenu);
		}

		// create events for showing context menu
		player.container.addEventListener('contextmenu', function (e) {
			if (player.isContextMenuEnabled && (e.keyCode === 3 || e.which === 3)) {
				player.renderContextMenu(e);
				e.preventDefault();
				e.stopPropagation();
			}
		});
		player.container.addEventListener('click', function () {
			player.contextMenu.style.display = 'none';
		});
		player.contextMenu.addEventListener('mouseleave', function () {
			player.startContextMenuTimer();
		});
	},
	cleancontextmenu: function cleancontextmenu(player) {
		player.contextMenu.remove();
	},
	enableContextMenu: function enableContextMenu() {
		this.isContextMenuEnabled = true;
	},
	disableContextMenu: function disableContextMenu() {
		this.isContextMenuEnabled = false;
	},
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
		this.contextMenu.style.display = 'none';
	},
	renderContextMenu: function renderContextMenu(event) {

		// alway re-render the items so that things like "turn fullscreen on" and "turn fullscreen off" are always written correctly
		var t = this,
		    html = '',
		    items = t.options.contextMenuItems;

		for (var i = 0, total = items.length; i < total; i++) {

			var item = items[i];

			if (item.isSeparator) {
				html += "<div class=\"" + t.options.classPrefix + "contextmenu-separator\"></div>";
			} else {

				var rendered = item.render(t);

				// render can return null if the item doesn't need to be used at the moment
				if (rendered !== null && rendered !== undefined) {
					html += "<div class=\"" + t.options.classPrefix + "contextmenu-item\" data-itemindex=\"" + i + "\" id=\"element-" + Math.random() * 1000000 + "\">" + rendered + "</div>";
				}
			}
		}

		// position and show the context menu
		t.contextMenu.innerHTML = html;

		var width = t.contextMenu.offsetWidth,
		    height = t.contextMenu.offsetHeight,
		    x = event.pageX,
		    y = event.pageY,
		    doc = document.documentElement,
		    scrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
		    scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
		    left = x + width > window.innerWidth + scrollLeft ? x - width : x,
		    top = y + height > window.innerHeight + scrollTop ? y - height : y;

		t.contextMenu.style.display = '';
		t.contextMenu.style.left = left + "px";
		t.contextMenu.style.top = top + "px";

		// bind events
		var contextItems = t.contextMenu.querySelectorAll("." + t.options.classPrefix + "contextmenu-item");

		var _loop = function _loop(_i, _total) {

			// which one is this?
			var menuItem = contextItems[_i],
			    itemIndex = parseInt(menuItem.getAttribute('data-itemindex'), 10),
			    item = t.options.contextMenuItems[itemIndex];

			// bind extra functionality?
			if (typeof item.show !== 'undefined') {
				item.show(menuItem, t);
			}

			// bind click action
			menuItem.addEventListener('click', function () {
				// perform click action
				if (typeof item.click !== 'undefined') {
					item.click(t);
				}

				// close
				t.contextMenu.style.display = 'none';
			});
		};

		for (var _i = 0, _total = contextItems.length; _i < _total; _i++) {
			_loop(_i, _total);
		}

		// stop the controls from hiding
		setTimeout(function () {
			t.killControlsTimer();
		}, 100);
	}
});

},{}]},{},[1]);
