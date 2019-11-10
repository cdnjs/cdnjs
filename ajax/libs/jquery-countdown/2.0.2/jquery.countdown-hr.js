/**
* http://keith-wood.name/countdown.html
* Croatian l10n for the jQuery countdown plugin
* Written by Dejan Broz info@hqfactory.com (2011)
* Improved by zytzagoo (2014)
*/
(function($) {
	$.countdown.regionalOptions['hr'] = {
		// plurals
		labels: ['Godina', 'Mjeseci', 'Tjedana', 'Dana', 'Sati', 'Minuta', 'Sekundi'],
		// singles
		labels1: ['Godina', 'Mjesec', 'Tjedan', 'Dan', 'Sat', 'Minutu', 'Sekundu'],
		// paucals
		labels2: ['Godine', 'Mjeseca', 'Tjedana', 'Dana', 'Sata', 'Minute', 'Sekunde'],
		compactLabels: ['g', 'm', 't', 'd'],
		whichLabels: function(amount){
			amount = parseInt(amount, 10);
			if (amount % 10 === 1 && amount % 100 !== 11) {
				return 1; // singles (/.*1$/ && ! /.*11$/)
			}
			if (amount % 10 >= 2 && amount % 10 <= 4 && (amount % 100 < 10 || amount % 100 >= 20)) {
				return 2; // paucals (/.*[234]$/ && ! /.*1[234]$/
			}
			return 0; // default plural (most common case)
		},
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['hr']);
})(jQuery);
