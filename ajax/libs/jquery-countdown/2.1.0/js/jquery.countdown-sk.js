/* http://keith-wood.name/countdown.html
 * Slovak initialisation for the jQuery countdown extension
 * Written by Roman Chlebec (creamd@c64.sk) (2008) */
(function($) {
	'use strict';
	$.countdown.regionalOptions.sk = {
		labels: ['Rokov','Mesiacov','Týždňov','Dní','Hodín','Minút','Sekúnd'],
		labels1: ['Rok','Mesiac','Týždeň','Deň','Hodina','Minúta','Sekunda'],
		labels2: ['Roky','Mesiace','Týždne','Dni','Hodiny','Minúty','Sekundy'],
		compactLabels: ['r','m','t','d'],
		whichLabels: function(amount) {
			return (amount === 1 ? 1 : (amount >= 2 && amount <= 4 ? 2 : 0));
		},
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.sk);
})(jQuery);
