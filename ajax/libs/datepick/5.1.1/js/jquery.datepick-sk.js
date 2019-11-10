/* http://keith-wood.name/datepick.html
   Slovak localisation for jQuery Datepicker.
   Written by Vojtech Rinik (vojto@hmm.sk). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.sk = {
		monthNames: ['Január','Február','Marec','Apríl','Máj','Jún',
		'Júl','August','September','Október','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Máj','Jún',
		'Júl','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedel\'a','Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota'],
		dayNamesShort: ['Ned','Pon','Uto','Str','Štv','Pia','Sob'],
		dayNamesMin: ['Ne','Po','Ut','St','Št','Pia','So'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Predchádzajúci',
		prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Nasledujúci&#x3e;',
		nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'Dnes',
		currentStatus: '',
		todayText: 'Dnes',
		todayStatus: '',
		clearText: 'Zmazať',
		clearStatus: '',
		closeText: 'Zavrieť',
		closeStatus: '',
		yearStatus: '',
		monthStatus: '',
		weekText: 'Ty',
		weekStatus: '',
		dayStatus: 'D, M d',
		defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.sk);
})(jQuery);
