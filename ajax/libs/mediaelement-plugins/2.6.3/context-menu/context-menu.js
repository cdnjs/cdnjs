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

mejs.i18n.en['mejs.fullscreen-off'] = 'Turn off Fullscreen';
mejs.i18n.en['mejs.fullscreen-on'] = 'Go Fullscreen';
mejs.i18n.en['mejs.download-video'] = 'Download Video';

Object.assign(mejs.MepDefaults, {
	contextMenuItems: [{
		render: function render(player) {
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
	}, {
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
	}, {
		isSeparator: true
	}, {
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

		if (!player.isVideo) {
			return;
		}

		if (!document.querySelector('.' + player.options.classPrefix + 'contextmenu')) {
			player.contextMenu = document.createElement('div');
			player.contextMenu.className = player.options.classPrefix + 'contextmenu';
			player.contextMenu.style.display = 'none';

			document.body.appendChild(player.contextMenu);
		}

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
		var t = this,
		    html = '',
		    items = t.options.contextMenuItems;

		for (var i = 0, total = items.length; i < total; i++) {

			var item = items[i];

			if (item.isSeparator) {
				html += '<div class="' + t.options.classPrefix + 'contextmenu-separator"></div>';
			} else {

				var rendered = item.render(t);

				if (rendered !== null && rendered !== undefined) {
					html += '<div class="' + t.options.classPrefix + 'contextmenu-item" data-itemindex="' + i + '" id="element-' + Math.random() * 1000000 + '">' + rendered + '</div>';
				}
			}
		}

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
		t.contextMenu.style.left = left + 'px';
		t.contextMenu.style.top = top + 'px';

		var contextItems = t.contextMenu.querySelectorAll('.' + t.options.classPrefix + 'contextmenu-item');

		var _loop = function _loop(_i, _total) {
			var menuItem = contextItems[_i],
			    itemIndex = parseInt(menuItem.getAttribute('data-itemindex'), 10),
			    item = t.options.contextMenuItems[itemIndex];

			if (typeof item.show !== 'undefined') {
				item.show(menuItem, t);
			}

			menuItem.addEventListener('click', function () {
				if (typeof item.click !== 'undefined') {
					item.click(t);
				}

				t.contextMenu.style.display = 'none';
			});
		};

		for (var _i = 0, _total = contextItems.length; _i < _total; _i++) {
			_loop(_i, _total);
		}

		setTimeout(function () {
			t.killControlsTimer();
		}, 100);
	}
});

},{}]},{},[1]);
