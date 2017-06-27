/* http://keith-wood.name/countdown.html
 * Serbian Cyrillic initialisation for the jQuery countdown extension
 * Written by Predrag Leka lp@lemurcake.com (2010) */
(function($) {
	$.countdown.regional['sr'] = {
		labels: ['Година', 'Месеци', 'Недеља', 'Дана', 'Часова', 'Минута', 'Секунди'],
		labels1: ['Година', 'месец', 'Недеља', 'Дан', 'Час', 'Минут', 'Секунда'],
		labels2: ['Године', 'Месеца', 'Недеље', 'Дана', 'Часа', 'Минута', 'Секунде'],
		compactLabels: ['г', 'м', 'н', 'д'],
		whichLabels: function(amount) {
			return (amount == 1 ? 1 : (amount >= 2 && amount <= 4 ? 2 : 0));
		},
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['sr']);
})(jQuery);
