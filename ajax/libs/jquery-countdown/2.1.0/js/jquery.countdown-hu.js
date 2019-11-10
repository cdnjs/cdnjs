/* http://keith-wood.name/countdown.html
 * Hungarian initialisation for the jQuery countdown extension
 * Written by Edmond L. (webmond@gmail.com). */
(function($) {
	'use strict';
	$.countdown.regionalOptions.hu = {
		labels: ['Év','Hónap','Hét','Nap','Óra','Perc','Másodperc'],
		labels1: ['Év','Hónap','Hét','Nap','Óra','Perc','Másodperc'],
		compactLabels: ['É','H','Hé','N'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.hu);
})(jQuery);
