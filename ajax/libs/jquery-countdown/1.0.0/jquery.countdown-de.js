/* http://keith-wood.name/countdown.html
   German initialisation for the jQuery countdown extension
   Written by Keith Wood (kbwood@virginbroadband.com.au) Jan 2008. */
$(document).ready(function() {
	$.countdown.regional['de'] = {
		labels: ['Tage', 'Stunden', 'Minuten', 'Sekunden'],
		compactDays: 't', timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['de']);
});