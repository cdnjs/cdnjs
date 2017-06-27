/* http://keith-wood.name/countdown.html
   Brazilian initialisation for the jQuery countdown extension
   Translated by Marcelo Pellicano de Oliveira (pellicano@gmail.com) Feb 2008. */
(function($) {
	$.countdown.regional['pt-BR'] = {
		labels: ['Anos', 'Meses', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
		labels1: ['Anos', 'Meses', 'Semanas', 'Dias', 'Horas', 'Minutos', 'Segundos'],
		compactLabels: ['a', 'm', 's', 'd'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['pt-BR']);
})(jQuery);
