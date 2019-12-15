/* http://keith-wood.name/countdown.html
 * Polish initialisation for the jQuery countdown extension
 * Written by Pawel Lewtak lewtak@gmail.com (2008) */
(function($) {
	'use strict';
	$.countdown.regionalOptions.pl = {
		labels: ['lat','miesięcy','tygodni','dni','godzin','minut','sekund'],
		labels1: ['rok','miesiąc','tydzień','dzień','godzina','minuta','sekunda'],
		labels2: ['lata','miesiące','tygodnie','dni','godziny','minuty','sekundy'],
		compactLabels: ['l','m','t','d'],
		compactLabels1: ['r','m','t','d'],
		whichLabels: function(amount) {
			var units = amount % 10;
			var tens = Math.floor((amount % 100) / 10);
			return (amount === 1 ? 1 : (units >= 2 && units <= 4 && tens !== 1 ? 2 : 0));
		},
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.pl);
})(jQuery);
