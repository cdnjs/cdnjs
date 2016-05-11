/* http://keith-wood.name/countdown.html
 * Croatian Latin initialisation for the jQuery countdown extension
 * Written by Dejan Broz info@hqfactory.com (2011) */
(function($) {
	$.countdown.regional['hr'] = {
		labels: ['Godina', 'Mjeseci', 'Tjedana', 'Dana', 'Sati', 'Minuta', 'Sekundi'],
		labels1: ['Godina', 'Mjesec', 'Tjedan', 'Dan', 'Sat', 'Minuta', 'Sekunda'],
		labels2: ['Godine', 'Mjeseca', 'Tjedna', 'Dana', 'Sata', 'Minute', 'Sekunde'],
		compactLabels: ['g', 'm', 't', 'd'],
		whichLabels: function(amount) {
			return (amount == 1 ? 1 : (amount >= 2 && amount <= 4 ? 2 : 0));
		},
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['hr']);
})(jQuery);
