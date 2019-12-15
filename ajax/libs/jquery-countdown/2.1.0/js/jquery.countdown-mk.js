/* http://keith-wood.name/countdown.html
 * Macedonian initialisation for the jQuery countdown extension
 * Written by Gorast Cvetkovski cvetkovski@gorast.com (2016) */
(function($) {
	'use strict';
	$.countdown.regionalOptions.mk = {
		labels: ['Години','Месеци','Недели','Дена','Часа','Минути','Секунди'],
		labels1: ['Година','Месец','Недела','Ден','Час','Минута','Секунда'],
		compactLabels: ['l','m','n','d'],
		compactLabels1: ['g','m','n','d'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.mk);
})(jQuery);
