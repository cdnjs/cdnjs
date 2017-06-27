/* http://keith-wood.name/countdown.html
 * Romanian initialisation for the jQuery countdown extension
 * Written by Edmond L. (webmond@gmail.com). */
(function($) {
	$.countdown.regional['ro'] = {
		labels: ['Ani', 'Luni', 'Saptamani', 'Zile', 'Ore', 'Minute', 'Secunde'],
		labels1: ['An', 'Luna', 'Saptamana', 'Ziua', 'Ora', 'Minutul', 'Secunda'],
		compactLabels: ['A', 'L', 'S', 'Z'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['ro']);
})(jQuery);
