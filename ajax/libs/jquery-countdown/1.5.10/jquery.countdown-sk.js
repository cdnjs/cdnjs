/* http://keith-wood.name/countdown.html
 * Slovak initialisation for the jQuery countdown extension
 * Written by Roman Chlebec (creamd@c64.sk) (2008) */
(function($) {
	$.countdown.regional['sk'] = {
		labels: ['Rokov', 'Mesiacov', 'Týždňov', 'Dní', 'Hodín', 'Minút', 'Sekúnd'],
		labels1: ['Rok', 'Mesiac', 'Týždeň', 'Deň', 'Hodina', 'Minúta', 'Sekunda'],
		labels2: ['Roky', 'Mesiace', 'Týždne', 'Dni', 'Hodiny', 'Minúty', 'Sekundy'],
		compactLabels: ['r', 'm', 't', 'd'],
		whichLabels: function(amount) {
			return (amount == 1 ? 1 : (amount >= 2 && amount <= 4 ? 2 : 0));
		},
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['sk']);
})(jQuery);
