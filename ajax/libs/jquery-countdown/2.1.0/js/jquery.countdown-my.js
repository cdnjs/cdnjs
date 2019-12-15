/* http://keith-wood.name/countdown.html
   Burmese initialisation for the jQuery countdown extension
   Written by Win Lwin Moe (winnlwinmoe@gmail.com) Dec 2009. */
(function($) {
	'use strict';
	$.countdown.regionalOptions.my = {
		labels: ['နွစ္','လ','ရက္သတဿတပတ္','ရက္','နာရီ','မိနစ္','စကဿကန့္'],
		labels1: ['နွစ္','လ','ရက္သတဿတပတ္','ရက္','နာရီ','မိနစ္','စကဿကန့္'],
		compactLabels: ['နွစ္','လ','ရက္သတဿတပတ္','ရက္'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.my);
})(jQuery);