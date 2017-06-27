/* http://keith-wood.name/datepick.html
   Esperanto localisation for jQuery Datepicker.
   Written by Olivier M. (olivierweb@ifrance.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.eo = {
		monthNames: ['Januaro','Februaro','Marto','Aprilo','Majo','Junio',
		'Julio','Aŭgusto','Septembro','Oktobro','Novembro','Decembro'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aŭg','Sep','Okt','Nov','Dec'],
		dayNames: ['Dimanĉo','Lundo','Mardo','Merkredo','Ĵaŭdo','Vendredo','Sabato'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Ĵaŭ','Ven','Sab'],
		dayNamesMin: ['Di','Lu','Ma','Me','Ĵa','Ve','Sa'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&lt;Anta',
		prevStatus: 'Vidi la antaŭan monaton',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Sekv&gt;',
		nextStatus: 'Vidi la sekvan monaton',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'Nuna',
		currentStatus: 'Vidi la nunan monaton',
		todayText: 'Nuna',
		todayStatus: 'Vidi la nunan monaton',
		clearText: 'Vakigi',
		clearStatus: '',
		closeText: 'Fermi',
		closeStatus: 'Fermi sen modifi',
		yearStatus: 'Vidi alian jaron',
		monthStatus: 'Vidi alian monaton',
		weekText: 'Sb',
		weekStatus: '',
		dayStatus: 'Elekti DD, MM d',
		defaultStatus: 'Elekti la daton',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.eo);
})(jQuery);
