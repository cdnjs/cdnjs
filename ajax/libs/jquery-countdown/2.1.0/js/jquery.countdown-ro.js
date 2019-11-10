/* http://keith-wood.name/countdown.html
 * Romanian initialisation for the jQuery countdown extension
 * Written by Edmond L. (webmond@gmail.com). */
(function($) {
	'use strict';
	$.countdown.regionalOptions.ro = {
		labels: ['Ani','Luni','Saptamani','Zile','Ore','Minute','Secunde'],
		labels1: ['An','Luna','Saptamana','Ziua','Ora','Minutul','Secunda'],
		compactLabels: ['A','L','S','Z'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.ro);
})(jQuery);
