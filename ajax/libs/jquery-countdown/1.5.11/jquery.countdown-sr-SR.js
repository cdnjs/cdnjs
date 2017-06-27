/* http://keith-wood.name/countdown.html
 * Serbian Latin initialisation for the jQuery countdown extension
 * Written by Predrag Leka lp@lemurcake.com (2010) */
(function($) {
	$.countdown.regional['sr-SR'] = {
		labels: ['Godina', 'Meseci', 'Nedelja', 'Dana', 'Časova', 'Minuta', 'Sekundi'],
		labels1: ['Godina', 'Mesec', 'Nedelja', 'Dan', 'Čas', 'Minut', 'Sekunda'],
		labels2: ['Godine', 'Meseca', 'Nedelje', 'Dana', 'Časa', 'Minuta', 'Sekunde'],
		compactLabels: ['g', 'm', 'n', 'd'],
		whichLabels: function(amount) {
			return (amount == 1 ? 1 : (amount >= 2 && amount <= 4 ? 2 : 0));
		},
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['sr-SR']);
})(jQuery);
