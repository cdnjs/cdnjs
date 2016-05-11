/* http://keith-wood.name/countdown.html
 * Romanian initialisation for the jQuery countdown extension
 * Written by Edmond L. (webmond@gmail.com). */
$(document).ready(function() {
	$.countdown.regional['ro'] = {
		labels: ['An', 'Luna', 'Saptamana', 'Ziua', 'Ora', 'Minutul', 'Secunda'],
		compactLabels: ['A', 'L', 'S', 'Z'], timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['ro']);
});
