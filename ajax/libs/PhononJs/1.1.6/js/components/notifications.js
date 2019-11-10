/* ========================================================================
 * Phonon: notifications.js v0.0.2
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';

	var notifs = [];

	function onShow() {

		var self = this;

		var timeout = self.getAttribute('data-timeout');
		if(timeout) {

			if(isNaN(parseInt(timeout))) {
				console.error('Attribute data-timeout must be a number');
			} else {

				var progress = self.querySelector('.progress');

				if(progress) {

					if(!progress.classList.contains('active')) {
						progress.classList.add('active');
					}

					var progressBar = progress.querySelector('.determinate');

					progressBar.style.width = '0';
					progressBar.style.transitionDuration = timeout + 'ms';

					window.setTimeout(function() {
						progressBar.style.width = '100%';
					}, 1);
				}

				window.setTimeout(function() {
					hide(self);
				}, parseInt(timeout));
			}
		}

		self.off(phonon.event.transitionEnd, onShow, false);
	}

	function onHide() {

		var self = this;

		// reset
		self.style.zIndex = 18;

		var height = self.clientHeight;

		// for the notif
		self.style.webkitTransform = 'translateY('+height+'px)';
		self.style.MozTransform = 'translateY('+height+'px)';
		self.style.msTransform = 'translateY('+height+'px)';
		self.style.OTransform = 'translateY('+height+'px)';
		self.style.transform = 'translateY('+height+'px)';

		var index = getIndex(self);
		if(index >= 0) notifs.splice(index, 1);

		// for others
		var i = notifs.length - 1;
		for(; i >= 0; i--) {
			var valueUpdated = (i * height);
			notifs[i].style.webkitTransform = 'translateY(-'+valueUpdated+'px)';
			notifs[i].style.MozTransform = 'translateY(-'+valueUpdated+'px)';
			notifs[i].style.msTransform = 'translateY(-'+valueUpdated+'px)';
			notifs[i].style.OTransform = 'translateY(-'+valueUpdated+'px)';
			notifs[i].style.transform = 'translateY(-'+valueUpdated+'px)';
		}

		var progressBar = self.querySelector('.determinate');
		if(progressBar) {
			progressBar.style.width = '0';
			progressBar.style.transitionDuration = '0ms';
		}

		self.off(phonon.event.transitionEnd, onHide, false);

		if(self.getAttribute('data-autodestroy') === 'true') {
			window.setTimeout(function() {
				document.body.removeChild(self);
			}, 500);
		}
	}

	function getIndex(notif) {
		var i = notifs.length - 1;
		for (; i >= 0; i--) {
			if(notifs[i] === notif) {
				return i;
			}
		}
		return -1;
	}

	var getNotification = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if(target.classList.contains('notification')) {
				return target;
			}
		}
	};

	var buildNotif = function(text, timeout, showButton) {
		if(typeof text !== 'string') text = '';
		timeout = (typeof timeout === 'number' ? timeout : 5000);

    var progress = '<div class="progress"><div class="determinate"></div></div>';
    var btn = (showButton === true ? '<button class="btn pull-right" data-hide-notif="true">CANCEL</button>' : '');

    var div = document.createElement('div');
		div.setAttribute('class', 'notification');
		div.setAttribute('data-autodestroy', 'true');
		if(timeout) div.setAttribute('data-timeout', timeout);
		div.id = 'auto-gen-notif-' + Math.floor(Date.now() / 1000);

		div.innerHTML = progress + btn + text;

		document.body.appendChild(div);

		return div;
	};

	document.on('tap', function(evt) {

		var target = evt.target;

		if(target.getAttribute('data-hide-notif') === 'true') {
			var notification = getNotification(target);
			if(notification) hide(notification);
		}
	});

	/*
	 * Public API
	*/

	function show(notification) {

		if(!notification.classList.contains('show')) {
			notification.classList.add('show');

			// Fix animation
			notification.style.zIndex = (18 + notifs.length);

			// Fix space

			var value = 0;
			if(notifs.length > 0) {
				var lastNotif = notifs[notifs.length - 1];
				value = (notifs.length * lastNotif.clientHeight);
			}

			notification.style.webkitTransform = 'translateY(-'+value+'px)';
			notification.style.MozTransform = 'translateY(-'+value+'px)';
			notification.style.msTransform = 'translateY(-'+value+'px)';
			notification.style.OTransform = 'translateY(-'+value+'px)';
			notification.style.transform = 'translateY(-'+value+'px)';

			notifs.push(notification);

			// push floating actions
			var fla = document.querySelector('.app-active .floating-action');
			if(fla) {
				fla.style.webkitTransform = 'translateY(-48px)';
				fla.style.MozTransform = 'translateY(-48px)';
				fla.style.msTransform = 'translateY(-48px)';
				fla.style.OTransform = 'translateY(-48px)';
				fla.style.transform = 'translateY(-48px)';
			}

			notification.on(phonon.event.transitionEnd, onShow, false);
		}
	}

	function hide(notification) {
		if(notification.classList.contains('show')) {

			notification.classList.remove('show');

			notification.on(phonon.event.transitionEnd, onHide, false);

			// put floating actions back in their place
			var fla = document.querySelector('.app-active .floating-action');
			if(fla) {
				fla.style.webkitTransform = 'translateY(0)';
				fla.style.MozTransform = 'translateY(0)';
				fla.style.msTransform = 'translateY(0)';
				fla.style.OTransform = 'translateY(0)';
				fla.style.transform = 'translateY(0)';
			}
		}
	}

	phonon.notif = function(el, timeout, showButton) {

		if(arguments.length > 1) {

			var text = el;
			var nBuild = buildNotif(text, timeout, showButton);
			window.setTimeout(function() {
				show(document.querySelector('#'+nBuild.id));
			}, 10);
			return;
		}

		var notif = (typeof el === 'string' ? document.querySelector(el) : el);
		if(notif === null) {
			throw new Error('The notification with ID ' + el + ' does not exist');
		}

		return {
			show: function () {
				show(notif);
			},
			hide: function () {
				hide(notif);
			}
		};
	};

    window.phonon = phonon;

	if(typeof exports === 'object') {
		module.exports = phonon.notif;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.notif });
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
