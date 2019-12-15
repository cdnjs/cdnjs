/* http://keith-wood.name/countdown.html
   Faroese initialisation for the jQuery countdown extension
   Written by Kasper Friis Christensen (kasper@friischristensen.com). */
(function($) {
	'use strict';
	$.countdown.regionalOptions.fo = {
		labels: ['Ár','Mánaðir','Vikur','Dagar','Tímar','Minuttir','Sekund'],
		labels1: ['Ár','Mánaður','Vika','Dagur','Tími','Minuttur','Sekund'],
		compactLabels: ['Á','M','V','D'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.fo);
})(jQuery);
