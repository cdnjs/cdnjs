/* http://keith-wood.name/countdown.html
 * Spanish initialisation for the jQuery countdown extension
 * Written by Sergio Carracedo Martinez webmaster@neodisenoweb.com (2008) */
(function($) {
	$.countdown.regional['es'] = {
		labels: ['Años', 'Meses', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
		labels1: ['Años', 'Meses', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
		compactLabels: ['a', 'm', 's', 'g'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['es']);
})(jQuery);
