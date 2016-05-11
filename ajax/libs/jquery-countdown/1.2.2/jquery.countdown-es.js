/* http://keith-wood.name/countdown.html
 * Spanish initialisation for the jQuery countdown extension
 * Written by Sergio Carracedo Martinez webmaster@neodisenoweb.com (2008) */
$(document).ready(function() {
	$.countdown.regional['es'] = {
		labels: ['A&ntilde;os', 'Meses', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
		labelsSingle: ['A&ntilde;os', 'Meses', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
		compactLabels: ['a', 'm', 's', 'g'], compactLabelsSingle: ['a', 'm', 's', 'g'],
		timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['es']);
});
