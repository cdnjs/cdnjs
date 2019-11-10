/* http://keith-wood.name/datepick.html
   Spanish/Argentina localisation for jQuery Datepicker.
   Written by Esteban Acosta Villafane (esteban.acosta@globant.com) of Globant (http://www.globant.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions['es-AR'] = {
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Ant',
		prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Sig&#x3e;',
		nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'Hoy',
		currentStatus: '',
		todayText: 'Hoy',
		todayStatus: '',
		clearText: 'Limpiar',
		clearStatus: '',
		closeText: 'Cerrar',
		closeStatus: '',
		yearStatus: '',
		monthStatus: '',
		weekText: 'Sm',
		weekStatus: '',
		dayStatus: 'D, M d',
		defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['es-AR']);
})(jQuery);
