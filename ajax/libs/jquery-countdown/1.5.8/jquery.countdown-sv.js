/* http://keith-wood.name/countdown.html
   Swedish initialisation for the jQuery countdown extension
   Written by Carl (carl@nordenfelt.com). */
(function($) {
	$.countdown.regional['sv'] = {
		labels: ['År', 'Månader', 'Veckor', 'Dagar', 'Timmar', 'Minuter', 'Sekunder'],
		labels1: ['År', 'Månad', 'Vecka', 'Dag', 'Timme', 'Minut', 'Sekund'],
		compactLabels: ['Å', 'M', 'V', 'D'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['sv']);
})(jQuery);
