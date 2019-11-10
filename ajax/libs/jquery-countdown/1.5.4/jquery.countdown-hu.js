/* http://keith-wood.name/countdown.html
 * Hungarian initialisation for the jQuery countdown extension
 * Written by Edmond L. (webmond@gmail.com). */
(function($) {
	$.countdown.regional['hu'] = {
		labels: ['Év', 'Hónap', 'Hét', 'Nap', 'Óra', 'Perc', 'Másodperc'],
		labels1: ['Év', 'Hónap', 'Hét', 'Nap', 'Óra', 'Perc', 'Másodperc'],
		compactLabels: ['É', 'H', 'Hé', 'N'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['hu']);
})(jQuery);
