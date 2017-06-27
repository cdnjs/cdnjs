/* ========================================================================
 * Phonon: preloaders.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

	'use strict';

	function show (preloader) {

		if(!preloader.classList.contains('active')) {
			preloader.style.visibility = 'visible';
			preloader.classList.add('active');
		}
	}

	function onHide() {
		this.style.visibility = 'hidden';
		this.off(phonon.event.transitionEnd, onHide);
	}

	/**
	 * @param {DOMElement | String} el
	*/
	function hide (preloader) {

		if(preloader.classList.contains('active')) {
			preloader.classList.remove('active');
			preloader.on(phonon.event.transitionEnd, onHide);
		}
	}


	phonon.preloader = function (el) {
		var preloader = (typeof el === 'string' ? document.querySelector(el) : el);
		if(preloader === null) {
			throw new Error('The preloader with ID ' + el + ' does not exist');
		}

		return {
			show: function () {
				show(preloader);
			},
			hide: function () {
				hide(preloader);
			}
		};
	};

	window.phonon = phonon;

	if(typeof exports === 'object') {
		module.exports = phonon.preloader;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return phonon.preloader });
	}

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));