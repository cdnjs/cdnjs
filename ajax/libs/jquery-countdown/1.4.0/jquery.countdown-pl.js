/* http://keith-wood.name/countdown.html
 * Polish initialisation for the jQuery countdown extension
 * Written by Pawel Lewtak lewtak@gmail.com (2008) */
$.countdown.regional['pl'] = {
	labels: ['lat', 'miesięcy', 'tygodni', 'dni', 'godzin', 'minut', 'sekund'],
	labelsSingle: ['rok', 'miesiac', 'tydzien', 'dzien', 'godzina', 'minuta', 'sekunda'],
	compactLabels: ['l', 'm', 't', 'd'], compactLabelsSingle: ['r', 'm', 't', 'd'],
	timeSeparator: ':'};
$.countdown.setDefaults($.countdown.regional['pl']);
