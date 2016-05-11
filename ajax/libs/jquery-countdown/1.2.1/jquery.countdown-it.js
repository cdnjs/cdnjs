/* http://keith-wood.name/countdown.html
 * Italian initialisation for the jQuery countdown extension
 * Written by Davide Bellettini (davide.bellettini@gmail.com) Feb 2008. */
$(document).ready(function() {
	$.countdown.regional['it'] = {
		labels: ['Anni', 'Mesi', 'Settimane', 'Giorni', 'Ore', 'Minuti', 'Secondi'],
		labelsSingle: ['Anni', 'Mesi', 'Settimane', 'Giorni', 'Ore', 'Minuti', 'Secondi'],
		compactLabels: ['a', 'm', 's', 'g'], compactLabelsSingle: ['a', 'm', 's', 'g'],
		timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['it']);
});
