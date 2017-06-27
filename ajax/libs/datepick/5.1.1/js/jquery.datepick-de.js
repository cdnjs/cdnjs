/* http://keith-wood.name/datepick.html
   German localisation for jQuery Datepicker.
   Written by Milian Wolff (mail@milianw.de). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.de = {
		monthNames: ['Januar','Februar','März','April','Mai','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dez'],
		dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
		dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;zurück',
		prevStatus: 'letzten Monat zeigen',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Vor&#x3e;',
		nextStatus: 'nächsten Monat zeigen',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'heute',
		currentStatus: '',
		todayText: 'heute',
		todayStatus: '',
		clearText: 'löschen',
		clearStatus: 'aktuelles Datum löschen',
		closeText: 'schließen',
		closeStatus: 'ohne Änderungen schließen',
		yearStatus: 'anderes Jahr anzeigen',
		monthStatus: 'anderen Monat anzeigen',
		weekText: 'Wo',
		weekStatus: 'Woche des Monats',
		dayStatus: 'Wähle D, M d',
		defaultStatus: 'Wähle ein Datum',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.de);
})(jQuery);
