/* ========================================================================
* Phonon: notifications.js v0.0.2
* http://phonon.quarkdev.com
* ========================================================================
* Licensed under MIT (http://phonon.quarkdev.com)
* ======================================================================== */
;(function (window, phonon) {

	'use strict'

	var notifs = []

	function onShow() {
		var self = this

		var timeout = self.getAttribute('data-timeout')
		if(timeout) {

			if(isNaN(parseInt(timeout, 10))) {
				console.error('Attribute data-timeout must be a number')
				return
			}

			var progress = self.querySelector('.progress')

			if(progress) {

				if(!progress.classList.contains('active')) {
					progress.classList.add('active')
				}

				var progressBar = progress.querySelector('.determinate')

				progressBar.style.width = '0'

				progressBar.style.webkitTransitionDuration = timeout + 'ms'
				progressBar.style.MozTransitionDuration = timeout + 'ms'
				progressBar.style.msTransitionDuration = timeout + 'ms'
				progressBar.style.OTransitionDuration = timeout + 'ms'
				progressBar.style.transitionDuration = timeout + 'ms'

				window.setTimeout(function() {
					progressBar.style.width = '100%'
				}, 10)
			}

			window.setTimeout(function() {
				hide(self);
			}, parseInt(timeout, 10) + 10);
		}

		self.off(phonon.event.transitionEnd, onShow, false)
	}

	function onHide() {
		var self = this

		// reset
		self.style.zIndex = 28

		var height = self.clientHeight

		// for the notif
		self.style.webkitTransform = 'translateY('+height+'px)'
		self.style.MozTransform = 'translateY('+height+'px)'
		self.style.msTransform = 'translateY('+height+'px)'
		self.style.OTransform = 'translateY('+height+'px)'
		self.style.transform = 'translateY('+height+'px)'

		var index = getIndex(self)
		if(index >= 0) notifs.splice(index, 1)

		// for others
		var i = notifs.length - 1
		for(; i >= 0; i--) {
			var valueUpdated = (i * height)
			notifs[i].style.webkitTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.MozTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.msTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.OTransform = 'translateY(-'+valueUpdated+'px)'
			notifs[i].style.transform = 'translateY(-'+valueUpdated+'px)'

			if(needsFixedSupport()) {
				notifs[i].style.bottom = valueUpdated + 'px'
			}
		}

		var progressBar = self.querySelector('.determinate')
		if(progressBar) {
			progressBar.style.width = '0'

			progressBar.style.webkitTransitionDuration = '0ms'
			progressBar.style.MozTransitionDuration = '0ms'
			progressBar.style.msTransitionDuration = '0ms'
			progressBar.style.OTransitionDuration = '0ms'
			progressBar.style.transitionDuration = '0ms'
		}

		self.off(phonon.event.transitionEnd, onHide, false)

		if(self.getAttribute('data-autodestroy') === 'true') {
			window.setTimeout(function() {
				document.body.removeChild(self)
			}, 500)
		}
	}

	function getIndex(notif) {
		var i = notifs.length - 1
		for (; i >= 0; i--) {
			if(notifs[i] === notif) {
				return i
			}
		}
		return -1
	}

	var getNotification = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if(target.classList.contains('notification')) {
				return target
			}
		}
	};

	var generateId = function() {
		var text = ""
		var possible = "abcdefghijklmnopqrstuvwxyz"
		var i = 0
		for(; i < 8; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		}
		return text
	}

	var buildNotif = function(text, timeout, showButton, textButton) {
		if(typeof text !== 'string') text = ''
		timeout = (typeof timeout === 'number' ? timeout : 5000)
		textButton = (typeof textButton === 'string' ? textButton : 'CANCEL')

		var progress = '<div class="progress"><div class="determinate"></div></div>'
		var btn = (showButton === true ? '<button class="btn pull-right" data-hide-notif="true">' + textButton + '</button>' : '')

		var div = document.createElement('div')
		div.setAttribute('class', 'notification')
		div.setAttribute('data-autodestroy', 'true')
		if(timeout) div.setAttribute('data-timeout', timeout)
		div.id = generateId()

		div.innerHTML = progress + btn + text

		document.body.appendChild(div)

		return document.querySelector('#' + div.id)
	};

	document.on('tap', function(evt) {
		var target = evt.target

		if(target.getAttribute('data-hide-notif') === 'true') {
			var notification = getNotification(target)
			if(notification) hide(notification)
		}
	});

	/**
	 *
	 * Android JellyBean does not support
	 * X,Y,Z translations with fixed elements
	 */
	function needsFixedSupport () {
		var version = parseFloat(phonon.device.osVersion)
		if(phonon.device.os === phonon.device.ANDROID
			&& !isNaN(version) && version < 4.4) {
			return true
		}
		return false
	}

	/*
	* Public API
	*/

	function show(notification) {
		if (notification.classList.contains('show')) return false

		window.setTimeout(function() {
			notification.classList.add('show')
		}, 10)

		// Fix animation
		notification.style.zIndex = (28 + notifs.length)

		// Fix space
		var value = 0
		if(notifs.length > 0) {
			var lastNotif = notifs[notifs.length - 1]
			value = (notifs.length * lastNotif.clientHeight)
		}

		notification.style.webkitTransform = 'translateY(-'+value+'px)'
		notification.style.MozTransform = 'translateY(-'+value+'px)'
		notification.style.msTransform = 'translateY(-'+value+'px)'
		notification.style.OTransform = 'translateY(-'+value+'px)'
		notification.style.transform = 'translateY(-'+value+'px)'

		if(needsFixedSupport()) {
			notification.style.bottom = value + 'px'
		}

		notifs.push(notification)

		// push floating actions
		var fla = document.querySelector('.app-active .floating-action')
		if(fla) {
			fla.style.webkitTransform = 'translateY(-48px)'
			fla.style.MozTransform = 'translateY(-48px)'
			fla.style.msTransform = 'translateY(-48px)'
			fla.style.OTransform = 'translateY(-48px)'
			fla.style.transform = 'translateY(-48px)'
		}

		notification.on(phonon.event.transitionEnd, onShow, false)
	}

	function hide(notification) {
		if(notification.classList.contains('show')) {

			notification.classList.remove('show')

			notification.on(phonon.event.transitionEnd, onHide, false)

			// put floating actions back in their place
			var fla = document.querySelector('.app-active .floating-action')
			if(fla) {
				fla.style.webkitTransform = 'translateY(0)'
				fla.style.MozTransform = 'translateY(0)'
				fla.style.msTransform = 'translateY(0)'
				fla.style.OTransform = 'translateY(0)'
				fla.style.transform = 'translateY(0)'
			}
		}
	}

	function setColor(notif, color) {
		if (typeof color !== 'string') {
			throw new Error('color must be a string, ' + typeof color + ' given');
		}
		notif.classList.add(color);
		var progress = notif.querySelector('.progress');
		if (progress) {
			progress.classList.add(color);
		}
	}

	phonon.notif = function(el, timeout, showButton, textButton) {

		if(arguments.length > 1) {
			// el is text
			var generatedNotif = buildNotif(el, timeout, showButton, textButton);
			show(generatedNotif);
			return {
				element: generatedNotif,
				setColor: function (color) {
					setColor(generatedNotif, color);
				}
			}
		}

		var notif = (typeof el === 'string' ? document.querySelector(el) : el)
		if(notif === null) {
			throw new Error('The notification with ID ' + el + ' does not exist')
		}

		return {
			element: notif,
			show: function () {
				show(notif)
				return this
			},
			hide: function () {
				hide(notif)
				return this
			},
			setColor: function (color) {
				setColor(notif, color)
				return this
			}
		}
	}

	window.phonon = phonon

	if(typeof exports === 'object') {
		module.exports = phonon.notif
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.notif })
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
