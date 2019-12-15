/* http://keith-wood.name/countdown.html
 * Hebrew initialisation for the jQuery countdown extension
 * Translated by Nir Livne, Dec 2008 */
(function($) {
	'use strict';
	$.countdown.regionalOptions.he = {
		labels: ['שנים','חודשים','שבועות','ימים','שעות','דקות','שניות'],
		labels1: ['שנה','חודש','שבוע','יום','שעה','דקה','שנייה'],
		compactLabels: ['שנ','ח','שב','י'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: true
	};
	$.countdown.setDefaults($.countdown.regionalOptions.he);
})(jQuery);
