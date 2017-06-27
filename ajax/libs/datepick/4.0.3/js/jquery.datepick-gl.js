/* http://keith-wood.name/datepick.html
   Galician localisation for jQuery Datepicker.
   Traducido por Manuel (McNuel@gmx.net). */
(function($) {
	$.datepick.regional['gl'] = {
		monthNames: ['Xaneiro','Febreiro','Marzo','Abril','Maio','Xuño',
		'Xullo','Agosto','Setembro','Outubro','Novembro','Decembro'],
		monthNamesShort: ['Xan','Feb','Mar','Abr','Mai','Xuñ',
		'Xul','Ago','Set','Out','Nov','Dec'],
		dayNames: ['Domingo','Luns','Martes','Mércores','Xoves','Venres','Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mér','Xov','Ven','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Me','Xo','Ve','Sá'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Ant', prevStatus: 'Amosar mes anterior',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Amosar ano anterior',
		nextText: 'Seg&#x3e;', nextStatus: 'Amosar mes seguinte',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Amosar ano seguinte',
		currentText: 'Hoxe', currentStatus: 'Amosar mes actual',
		todayText: 'Hoxe', todayStatus: 'Amosar mes actual',
		clearText: 'Limpar', clearStatus: 'Borrar data actual',
		closeText: 'Pechar', closeStatus: 'Pechar sen gardar',
		yearStatus: 'Amosar outro ano', monthStatus: 'Amosar outro mes',
		weekText: 'Sm', weekStatus: 'Semana do ano',
		dayStatus: 'D, M d', defaultStatus: 'Selecciona Data',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['gl']);
})(jQuery);
