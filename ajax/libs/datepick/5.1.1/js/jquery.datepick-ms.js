/* http://keith-wood.name/datepick.html
   Malaysian localisation for jQuery Datepicker.
   Written by Mohd Nawawi Mohamad Jamili (nawawi@ronggeng.net). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.ms = {
		monthNames: ['Januari','Februari','Mac','April','Mei','Jun',
		'Julai','Ogos','September','Oktober','November','Disember'],
		monthNamesShort: ['Jan','Feb','Mac','Apr','Mei','Jun',
		'Jul','Ogo','Sep','Okt','Nov','Dis'],
		dayNames: ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
		dayNamesShort: ['Aha','Isn','Sel','Rab','Kha','Jum','Sab'],
		dayNamesMin: ['Ah','Is','Se','Ra','Kh','Ju','Sa'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Sebelum',
		prevStatus: 'Tunjukkan bulan lepas',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: 'Tunjukkan tahun lepas',
		nextText: 'Selepas&#x3e;',
		nextStatus: 'Tunjukkan bulan depan',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: 'Tunjukkan tahun depan',
		currentText: 'hari ini',
		currentStatus: 'Tunjukkan bulan terkini',
		todayText: 'hari ini',
		todayStatus: 'Tunjukkan bulan terkini',
		clearText: 'Padam',
		clearStatus: 'Padamkan tarikh terkini',
		closeText: 'Tutup',
		closeStatus: 'Tutup tanpa perubahan',
		yearStatus: 'Tunjukkan tahun yang lain',
		monthStatus: 'Tunjukkan bulan yang lain',
		weekText: 'Mg',
		weekStatus: 'Minggu bagi tahun ini',
		dayStatus: 'DD, d MM',
		defaultStatus: 'Sila pilih tarikh',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.ms);
})(jQuery);
