/* http://keith-wood.name/countdown.html
 * Galician initialisation for the jQuery countdown extension
 * Written by Moncho Pena ramon.pena.rodriguez@gmail.com (2009) */
(function($) {
	$.countdown.regional['gl'] = {
		labels: ['Anos', 'Meses', 'Semanas', 'Días', 'Horas', 'Minutos', 'Segundos'],
		labels1: ['Anos', 'Meses', 'Semanas', 'Días', 'Horas', 'Minutos', 'Segundos'],
		compactLabels: ['a', 'm', 's', 'g'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['gl']);
})(jQuery);