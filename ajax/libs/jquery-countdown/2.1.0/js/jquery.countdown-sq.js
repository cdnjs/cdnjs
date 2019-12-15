/* http://keith-wood.name/countdown.html
   Albanian initialisation for the jQuery countdown extension
   Written by Erzen Komoni. */
(function($) {
	'use strict';
    $.countdown.regionalOptions.sq = {
        labels: ['Vite','Muaj','Javë','Ditë','Orë','Minuta','Sekonda'],
        labels1: ['Vit','Muaj','Javë','Dit','Orë','Minutë','Sekond'],
        compactLabels: ['V','M','J','D'],
        whichLabels: null,
        digits: ['0','1','2','3','4','5','6','7','8','9'],
        timeSeparator: ':',
		isRTL: false
	};
    $.countdown.setDefaults($.countdown.regionalOptions.sq);
})(jQuery);