/* http://keith-wood.name/countdown.html
   Urdu (اردو) initialisation for the jQuery countdown extension
   Translated by Azhar Rasheed (azhar.rasheed19@gmail.com), November 2013. */
(function($) {
	'use strict';
	$.countdown.regionalOptions.ur = {
		labels: ['سال','مہينے','ہفتے','دن','گھنٹے','منٹس','سيکنڑز'],
		labels1: ['سال','ماہ','ہفتہ','دن','گھنٹہ','منٹ','سیکنڈز'],
		compactLabels: ['(ق)','سینٹ','ایک','J'],
		whichLabels: null,
		digits: ['٠','١','٢','٣','۴','۵','۶','۷','٨','٩'],
		timeSeparator: ':',
		isRTL: true
	};
	$.countdown.setDefaults($.countdown.regionalOptions.ur);
})(jQuery);
