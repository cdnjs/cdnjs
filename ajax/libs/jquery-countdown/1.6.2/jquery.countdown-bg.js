/* http://keith-wood.name/countdown.html
 * Bulgarian initialisation for the jQuery countdown extension
 * Written by Manol Trendafilov manol@rastermania.com (2010) */
(function($) {
	$.countdown.regional['bg'] = {
		labels: ['Години', 'Месеца', 'Седмица', 'Дни', 'Часа', 'Минути', 'Секунди'],
		labels1: ['Година', 'Месец', 'Седмица', 'Ден', 'Час', 'Минута', 'Секунда'],
		compactLabels: ['l', 'm', 'n', 'd'], compactLabels1: ['g', 'm', 'n', 'd'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['bg']);
})(jQuery);
