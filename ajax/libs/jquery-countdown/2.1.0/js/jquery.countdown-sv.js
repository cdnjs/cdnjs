/* http://keith-wood.name/countdown.html
   Swedish initialisation for the jQuery countdown extension
   Written by Carl (carl@nordenfelt.com). */
(function($) {
	'use strict';
	$.countdown.regionalOptions.sv = {
		labels: ['År','Månader','Veckor','Dagar','Timmar','Minuter','Sekunder'],
		labels1: ['År','Månad','Vecka','Dag','Timme','Minut','Sekund'],
		compactLabels: ['Å','M','V','D'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.sv);
})(jQuery);
