/* http://keith-wood.name/countdown.html
   Persian (فارسی) initialisation for the jQuery countdown extension
   Written by Alireza Ziaie (ziai@magfa.com) Oct 2008.
   Digits corrected by Hamed Ramezanian Feb 2013. */
(function($) {
	'use strict';
	$.countdown.regionalOptions.fa = {
		labels: ['سال','ماه','هفته','روز','ساعت','دقیقه','ثانیه'],
		labels1: ['سال','ماه','هفته','روز','ساعت','دقیقه','ثانیه'],
		compactLabels: ['س','م','ه','ر'],
		whichLabels: null,
		digits: ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'],
		timeSeparator: ':',
		isRTL: true
	};
	$.countdown.setDefaults($.countdown.regionalOptions.fa);
})(jQuery);
