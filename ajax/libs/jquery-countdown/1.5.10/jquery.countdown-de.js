/* http://keith-wood.name/countdown.html
   German initialisation for the jQuery countdown extension
   Written by Samuel Wulf. */
(function($) {
	$.countdown.regional['de'] = {
		labels: ['Jahre', 'Monate', 'Wochen', 'Tage', 'Stunden', 'Minuten', 'Sekunden'],
		labels1: ['Jahr', 'Monat', 'Woche', 'Tag', 'Stunde', 'Minute', 'Sekunde'],
		compactLabels: ['J', 'M', 'W', 'T'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['de']);
})(jQuery);
