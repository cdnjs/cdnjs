/* http://keith-wood.name/countdown.html
 * Slovenian localisation for the jQuery countdown extension
 * Written by Borut Tomažin (debijan{at}gmail.com) (2011) */
(function($) {
	$.countdown.regional['sl'] = {
		labels: ['Let', 'Mesecev', 'Tednov', 'Dni', 'Ur', 'Minut', 'Sekund'],
		labels1: ['Leto', 'Mesec', 'Teden', 'Dan', 'Ura', 'Minuta', 'Sekunda'],
		compactLabels: ['l', 'm', 't', 'd'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['sl']);
})(jQuery);
