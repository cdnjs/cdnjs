/* http://keith-wood.name/datepick.html
   Faroese localisation for jQuery Datepicker.
   Written by Sverri Mohr Olsen, sverrimo@gmail.com */
(function($) {
	'use strict';
	$.datepick.regionalOptions.fo = {
		monthNames: ['Januar','Februar','Mars','Apríl','Mei','Juni',
		'Juli','August','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNames: ['Sunnudagur','Mánadagur','Týsdagur','Mikudagur','Hósdagur','Fríggjadagur','Leyardagur'],
		dayNamesShort: ['Sun','Mán','Týs','Mik','Hós','Frí','Ley'],
		dayNamesMin: ['Su','Má','Tý','Mi','Hó','Fr','Le'],
		dateFormat: 'dd-mm-yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Sísta',
		prevStatus: 'Vís sísta mánaðan',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: 'Vís sísta árið',
		nextText: 'Næsta&#x3e;',
		nextStatus: 'Vís næsta mánaðan',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: 'Vís næsta árið',
		currentText: 'Í dag',
		currentStatus: 'Vís mánaðan fyri í dag',
		todayText: 'Í dag',
		todayStatus: 'Vís mánaðan fyri í dag',
		clearText: 'Strika',
		clearStatus: 'Strika allir mánaðarnar',
		closeText: 'Goym',
		closeStatus: 'Goym hetta vindeyðga',
		yearStatus: 'Broyt árið',
		monthStatus: 'Broyt mánaðan',
		weekText: 'Vk',
		weekStatus: 'Vika av árinum',
		dayStatus: 'Vel DD, M d, yyyy',
		defaultStatus: 'Vel ein dato',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.fo);
})(jQuery);
