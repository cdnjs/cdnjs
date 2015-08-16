/* http://keith-wood.name/countdown.html
 * Slovenian localisation for the jQuery countdown extension
 * Written by Borut Tomažin (debijan{at}gmail.com) (2011) */
(function($) {
	$.countdown.regionalOptions['sl'] = {
		labels: ['Let', 'Mesecev', 'Tednov', 'Dni', 'Ur', 'Minut', 'Sekund'],
		labels1: ['Leto', 'Mesec', 'Teden', 'Dan', 'Ura', 'Minuta', 'Sekunda'],
		compactLabels: ['l', 'm', 't', 'd'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['sl']);
})(jQuery);
