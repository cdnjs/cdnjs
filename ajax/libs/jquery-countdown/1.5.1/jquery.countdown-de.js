/* http://keith-wood.name/countdown.html
   German initialisation for the jQuery countdown extension
   Written by Keith Wood (kbwood@virginbroadband.com.au) Jan 2008. */
(function($) {
	$.countdown.regional['de'] = {
		labels: ['Jahren', 'Monate', 'Wochen', 'Tage', 'Stunden', 'Minuten', 'Sekunden'],
		labels1: ['Jahre', 'Monat', 'Woche', 'Tag', 'Stunde', 'Minute', 'Sekunde'],
		compactLabels: ['J', 'M', 'W', 'T'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['de']);
})(jQuery);
