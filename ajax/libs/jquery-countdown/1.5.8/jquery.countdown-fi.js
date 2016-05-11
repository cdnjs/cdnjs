/* http://keith-wood.name/countdown.html
   Finnish initialisation for the jQuery countdown extension
   Written by Kalle Vänskä and Juha Suni (juhis.suni@gmail.com). */
(function($) {
	$.countdown.regional['fi'] = {
		labels: ['Vuotta', 'Kuukautta', 'Viikkoa', 'Päivää', 'Tuntia', 'Minuuttia', 'Sekuntia'],
		labels1: ['Vuosi', 'Kuukausi', 'Viikko', 'Päivä', 'Tunti', 'Minuutti', 'Sekunti'],
		compactLabels: ['v', 'kk', 'vk', 'pv'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['fi']);
})(jQuery);
