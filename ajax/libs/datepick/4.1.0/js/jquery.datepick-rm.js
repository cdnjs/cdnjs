/* http://keith-wood.name/datepick.html
   Romansh localisation for jQuery Datepicker.
   Yvonne Gienal (yvonne.gienal@educa.ch). */
(function($) {
	$.datepick.regional['rm'] = {
		monthNames: ['Schaner','Favrer','Mars','Avrigl','Matg','Zercladur',
		'Fanadur','Avust','Settember','October','November','December'],
		monthNamesShort: ['Scha','Fev','Mar','Avr','Matg','Zer',
		'Fan','Avu','Sett','Oct','Nov','Dec'],
		dayNames: ['Dumengia','Glindesdi','Mardi','Mesemna','Gievgia','Venderdi','Sonda'],
		dayNamesShort: ['Dum','Gli','Mar','Mes','Gie','Ven','Som'],
		dayNamesMin: ['Du','Gl','Ma','Me','Gi','Ve','So'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Suandant', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Precedent&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Actual', currentStatus: '',
		todayText: 'Actual', todayStatus: '',
		clearText: 'X', clearStatus: '',
		closeText: 'Serrar', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'emna', weekStatus: '',
		dayStatus: 'DD d MM', defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['rm']);
})(jQuery);
