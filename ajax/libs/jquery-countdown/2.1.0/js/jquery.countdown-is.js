/* http://keith-wood.name/countdown.html
   Icelandic initialisation for the jQuery countdown extension
   Written by Róbert K. L. */
(function($) {
	'use strict';
	$.countdown.regionalOptions.is = {
		labels: ['Ár','Mánuðir','Vikur','Dagar','Klukkustundir','Mínútur','Sekúndur'],
		labels1: ['Ár','Mánuður','Vika','Dagur','Klukkustund','Mínúta','Sekúnda'],
		compactLabels: ['ár.','mán.','vik.','dag.','klst.','mín.','sek.'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.is);
})(jQuery);