/* ========================================================================
 * Phonon: forms.js v0.0.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window) {

	'use strict';

	function addListener(inputEl) {
		inputEl.on('focus', onInputFocus);
		inputEl.on('blur', onInputBlur);
	}

	function onInputFocus(evt) {
		evt.target.parentNode.classList.add('input-filled');
	}

	function onInputBlur(evt) {
		if(evt.target.value.trim() === '') {
			evt.target.parentNode.classList.remove('input-filled');
		}
	}

	function isInputFilled(input) {
		if(input.value.trim() !== '' && !input.parentNode.classList.contains('input-filled')) {
			input.parentNode.classList.add('input-filled');
		}
	}

	/*
	 * Attachs events once
	 */
	document.on('pagecreated', function(evt) {
		var page = document.querySelector(evt.detail.page);
		var inputs = page.querySelectorAll('input.with-label'), i = inputs.length - 1;
		for (; i >= 0; i--) {
			addListener(inputs[i]);

			/*
			 * Do this once at start also, otherwise pre-populated inputs
			 * will have labels directly overlapping on top of the input value on page load.
			*/
			isInputFilled(inputs[i]);
		}
	});

	/*
	 * Checks if inputs are filled
	 */
	document.on('pageopened', function(evt) {
		var page = document.querySelector(evt.detail.page);
		var inputs = page.querySelectorAll('input.with-label'), i = inputs.length - 1;
		for (; i >= 0; i--) {
			isInputFilled(inputs[i]);
		}
	});

}(typeof window !== 'undefined' ? window : this));
