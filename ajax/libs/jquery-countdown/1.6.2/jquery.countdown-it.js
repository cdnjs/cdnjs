/* http://keith-wood.name/countdown.html
 * Italian initialisation for the jQuery countdown extension
 * Written by Davide Bellettini (davide.bellettini@gmail.com) and Roberto Chiaveri Feb 2008. */
(function($) {
	$.countdown.regional['it'] = {
		labels: ['Anni', 'Mesi', 'Settimane', 'Giorni', 'Ore', 'Minuti', 'Secondi'],
		labels1: ['Anno', 'Mese', 'Settimana', 'Giorno', 'Ora', 'Minuto', 'Secondo'],
		compactLabels: ['a', 'm', 's', 'g'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['it']);
})(jQuery);
