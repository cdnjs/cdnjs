/* http://keith-wood.name/countdown.html
 * Italian initialisation for the jQuery countdown extension
 * Written by Davide Bellettini (davide.bellettini@gmail.com) Feb 2008. */
(function($) {
	$.countdown.regional['it'] = {
		labels: ['Anni', 'Mesi', 'Settimane', 'Giorni', 'Ore', 'Minuti', 'Secondi'],
		labels1: ['Anni', 'Mesi', 'Settimane', 'Giorni', 'Ore', 'Minuti', 'Secondi'],
		compactLabels: ['a', 'm', 's', 'g'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['it']);
})(jQuery);
