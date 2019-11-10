/* ========================================================================
 * Phonon: accordion.js v0.0.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window) {

	'use strict';

	/**
	 * Show the accordion content
	 * @param {DOMNode} defaultTarget
	 * @param {DOMNode} accordionContent
	 */
	function show(defaultTarget, accordionContent) {

		var height = accordionContent.offsetHeight;
		accordionContent.style.maxHeight = '0px';

		window.setTimeout(function() {

			var onShow = function() {

				accordionContent.off(phonon.event.transitionEnd, onShow);

				var icon = defaultTarget.parentNode.querySelector('.icon-expand-more');

				if(icon) {
					icon.classList.remove('icon-expand-more');
					icon.classList.add('icon-expand-less');
				}

			};

			accordionContent.on(phonon.event.transitionEnd, onShow);

			accordionContent.style.maxHeight = height + 'px';
			accordionContent.classList.add('accordion-active');

		}, 100);
	}

	/**
	 * Hide the accordion content
	 * @param {DOMNode} defaultTarget
	 * @param {DOMNode} accordionContent
	 */
	function hide(defaultTarget, accordionContent) {

		var onHide = function() {

			accordionContent.classList.remove('accordion-active');
			accordionContent.style.maxHeight = 'none';

			var icon = defaultTarget.parentNode.querySelector('.icon-expand-less');

			if(icon) {
				icon.classList.remove('icon-expand-less');
				icon.classList.add('icon-expand-more');
			}

			accordionContent.off(phonon.event.transitionEnd, onHide);
		};

		accordionContent.on(phonon.event.transitionEnd, onHide);
		accordionContent.style.maxHeight = '0px';
	}

  function onPage(evt) {

    var defaultTarget = evt.target;
    var accordionContent = defaultTarget.nextElementSibling;

    if(accordionContent && accordionContent.classList.contains('accordion-content')) {
			if(accordionContent.classList.contains('accordion-active')) {
				hide(defaultTarget, accordionContent);
			} else {
				show(defaultTarget, accordionContent);
			}
    }
  }

	/*
	 * Attachs event once
	 */
	document.on('pagecreated', function(evt) {

		var page = document.querySelector(evt.detail.page);
		var findAccordions = page.querySelector('.accordion-content');

		if(findAccordions) {
      page.on('tap', onPage);
    }
	});

}(typeof window !== 'undefined' ? window : this));
