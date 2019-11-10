/* http://keith-wood.name/datepick.html
   Croatian localisation for jQuery Datepicker.
   Written by Vjekoslav Nesek. */
(function($) {
	'use strict';
	$.datepick.regionalOptions.hr = {
		monthNames: ['Siječanj','Veljača','Ožujak','Travanj','Svibanj','Lipanj',
		'Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
		monthNamesShort: ['Sij','Velj','Ožu','Tra','Svi','Lip',
		'Srp','Kol','Ruj','Lis','Stu','Pro'],
		dayNames: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','Čet','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','Če','Pe','Su'],
		dateFormat: 'dd.mm.yyyy.',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;',
		prevStatus: 'Prikaži prethodni mjesec',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: '&#x3e;',
		nextStatus: 'Prikaži slijedeći mjesec',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'Danas',
		currentStatus: 'Današnji datum',
		todayText: 'Danas',
		todayStatus: 'Današnji datum',
		clearText: 'izbriši',
		clearStatus: 'Izbriši trenutni datum',
		closeText: 'Zatvori',
		closeStatus: 'Zatvori kalendar',
		yearStatus: 'Prikaži godine',
		monthStatus: 'Prikaži mjesece',
		weekText: 'Tje',
		weekStatus: 'Tjedan',
		dayStatus: '\'Datum\' D, M d',
		defaultStatus: 'Odaberi datum',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.hr);
})(jQuery);
