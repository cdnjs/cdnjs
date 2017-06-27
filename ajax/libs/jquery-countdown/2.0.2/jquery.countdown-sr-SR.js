/* http://keith-wood.name/countdown.html
 * Serbian Latin initialisation for the jQuery countdown extension
 * Written by Predrag Leka lp@lemurcake.com (2010) */
(function($) {
	$.countdown.regionalOptions['sr-SR'] = {
		labels: ['Godina', 'Meseci', 'Nedelja', 'Dana', 'Časova', 'Minuta', 'Sekundi'],
		labels1: ['Godina', 'Mesec', 'Nedelja', 'Dan', 'Čas', 'Minut', 'Sekunda'],
		labels2: ['Godine', 'Meseca', 'Nedelje', 'Dana', 'Časa', 'Minuta', 'Sekunde'],
		compactLabels: ['g', 'm', 'n', 'd'],
		whichLabels: function(amount) {
			return (amount == 1 ? 1 : (amount >= 2 && amount <= 4 ? 2 : 0));
		},
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['sr-SR']);
})(jQuery);
