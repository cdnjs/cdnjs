/* http://keith-wood.name/countdown.html
   Persian (فارسی) initialisation for the jQuery countdown extension
   Written by Alireza Ziaie (ziai@magfa.com) Oct 2008. */
(function($) {
	$.countdown.regional['fa'] = {
		labels: ['‌سال', 'ماه', 'هفته', 'روز', 'ساعت', 'دقیقه', 'ثانیه'],
		labels1: ['سال', 'ماه', 'هفته', 'روز', 'ساعت', 'دقیقه', 'ثانیه'],
		compactLabels: ['س', 'م', 'ه', 'ر'],
		timeSeparator: ':', isRTL: true};
	$.countdown.setDefaults($.countdown.regional['fa']);
})(jQuery);
