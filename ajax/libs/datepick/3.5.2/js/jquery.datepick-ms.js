/* Malaysian initialisation for the jQuery UI date picker plugin. */
/* Written by Mohd Nawawi Mohamad Jamili (nawawi@ronggeng.net). */
(function($) {
	$.datepick.regional['ms'] = {
		clearText: 'Padam', clearStatus: 'Padamkan tarikh terkini',
		closeText: 'Tutup', closeStatus: 'Tutup tanpa perubahan',
		prevText: '&#x3c;Sebelum', prevStatus: 'Tunjukkan bulan lepas',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Tunjukkan tahun lepas',
		nextText: 'Selepas&#x3e;', nextStatus: 'Tunjukkan bulan depan',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Tunjukkan tahun depan',
		currentText: 'hari ini', currentStatus: 'Tunjukkan bulan terkini',
		monthNames: ['Januari','Februari','Mac','April','Mei','Jun',
		'Julai','Ogos','September','Oktober','November','Disember'],
		monthNamesShort: ['Jan','Feb','Mac','Apr','Mei','Jun',
		'Jul','Ogo','Sep','Okt','Nov','Dis'],
		monthStatus: 'Tunjukkan bulan yang lain', yearStatus: 'Tunjukkan tahun yang lain',
		weekHeader: 'Mg', weekStatus: 'Minggu bagi tahun ini',
		dayNames: ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
		dayNamesShort: ['Aha','Isn','Sel','Rab','Kha','Jum','Sab'],
		dayNamesMin: ['Ah','Is','Se','Ra','Kh','Ju','Sa'],
		dayStatus: 'DD', dateStatus: 'DD, d MM',
		dateFormat: 'dd/mm/yy', firstDay: 0,
		initStatus: 'Sila pilih tarikh', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['ms']);
})(jQuery);
