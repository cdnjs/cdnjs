/* http://keith-wood.name/countdown.html
 * Ukrainian initialisation for the jQuery countdown extension
 * Written by Goloborodko M misha.gm@gmail.com (2009) */
(function($) {
	$.countdown.regional['uk'] = {
		labels: ['Років', 'Місяців', 'Тижднів', 'Днів', 'Годин', 'Хвилин', 'Секунд'],
		labels1: ['Рік', 'Місяць', 'Тиждень', 'День', 'Година', 'Хвилина', 'Секунда'],
		compactLabels: ['r', 'm', 't', 'd'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['uk']);
})(jQuery);
