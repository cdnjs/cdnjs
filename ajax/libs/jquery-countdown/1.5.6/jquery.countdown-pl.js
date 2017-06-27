/* http://keith-wood.name/countdown.html
 * Polish initialisation for the jQuery countdown extension
 * Written by Pawel Lewtak lewtak@gmail.com (2008) */
(function($) {
	$.countdown.regional['pl'] = {
		labels: ['lat', 'miesięcy', 'tygodni', 'dni', 'godzin', 'minut', 'sekund'],
		labels1: ['rok', 'miesiac', 'tydzien', 'dzien', 'godzina', 'minuta', 'sekunda'],
		compactLabels: ['l', 'm', 't', 'd'], compactLabels1: ['r', 'm', 't', 'd'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['pl']);
})(jQuery);
