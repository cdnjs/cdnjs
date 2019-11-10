/* http://keith-wood.name/countdown.html
 * Latvian initialisation for the jQuery countdown extension
 * Written by Jānis Peisenieks janis.peisenieks@gmail.com (2010) */
(function($) {
	$.countdown.regional['lv'] = {
		labels: ['Gadi', 'Mēneši', 'Nedēļas', 'Dienas', 'Stundas', 'Minūtes', 'Sekundes'],
		labels1: ['Gads', 'Mēnesis', 'Nedēļa', 'Diena', 'Stunda', 'Minūte', 'Sekunde'],
		compactLabels: ['l', 'm', 'n', 'd'], compactLabels1: ['g', 'm', 'n', 'd'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['lv']);
})(jQuery);
