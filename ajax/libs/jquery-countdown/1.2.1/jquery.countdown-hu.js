/* http://keith-wood.name/countdown.html
 * Hungarian initialisation for the jQuery countdown extension
 * Written by Edmond L. (webmond@gmail.com). */
$(document).ready(function() {
	$.countdown.regional['hu'] = {
		labels: ['Év', 'Hónap', 'Hét', 'Nap', 'Óra', 'Perc', 'Másodperc'],
		labelsSingle: ['Év', 'Hónap', 'Hét', 'Nap', 'Óra', 'Perc', 'Másodperc'],
		compactLabels: ['É', 'H', 'Hé', 'N'], compactLabelsSingle: ['É', 'H', 'Hé', 'N'],
		timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['hu']);
});
