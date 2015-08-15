/* http://keith-wood.name/countdown.html
 * Uzbek initialisation for the jQuery countdown extension
 * Written by Alisher U. (ulugbekov{at}gmail.com) August 2012. */
(function($) {
	$.countdown.regionalOptions['uz'] = {
		labels: ['Yil', 'Oy', 'Hafta', 'Kun', 'Soat', 'Daqiqa', 'Soniya'],
		labels1: ['Yil', 'Oy', 'Hafta', 'Kun', 'Soat', 'Daqiqa', 'Soniya'],
		compactLabels: ['y', 'o', 'h', 'k'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['uz']);
})(jQuery);