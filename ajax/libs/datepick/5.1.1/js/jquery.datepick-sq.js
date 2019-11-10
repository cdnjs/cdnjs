/* http://keith-wood.name/datepick.html
   Albanian localisation for jQuery Datepicker.
   Written by Flakron Bytyqi (flakron@gmail.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.sq = {
		monthNames: ['Janar','Shkurt','Mars','Prill','Maj','Qershor',
		'Korrik','Gusht','Shtator','Tetor','Nëntor','Dhjetor'],
		monthNamesShort: ['Jan','Shk','Mar','Pri','Maj','Qer',
		'Kor','Gus','Sht','Tet','Nën','Dhj'],
		dayNames: ['E Diel','E Hënë','E Martë','E Mërkurë','E Enjte','E Premte','E Shtune'],
		dayNamesShort: ['Di','Hë','Ma','Më','En','Pr','Sh'],
		dayNamesMin: ['Di','Hë','Ma','Më','En','Pr','Sh'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;mbrapa',
		prevStatus: 'trego muajin e fundit',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Përpara&#x3e;',
		nextStatus: 'trego muajin tjetër',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'sot',
		currentStatus: '',
		todayText: 'sot',
		todayStatus: '',
		clearText: 'fshije',
		clearStatus: 'fshije datën aktuale',
		closeText: 'mbylle',
		closeStatus: 'mbylle pa ndryshime',
		yearStatus: 'trego tjetër vit',
		monthStatus: 'trego muajin tjetër',
		weekText: 'Ja',
		weekStatus: 'Java e muajit',
		dayStatus: '\'Zgjedh\' D, M d',
		defaultStatus: 'Zgjedhe një datë',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.sq);
})(jQuery);
