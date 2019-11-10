/* http://keith-wood.name/datepick.html
   Indonesian localisation for jQuery Datepicker.
   Written by Deden Fathurahman (dedenf@gmail.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.id = {
		monthNames: ['Januari','Februari','Maret','April','Mei','Juni',
		'Juli','Agustus','September','Oktober','Nopember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Agus','Sep','Okt','Nop','Des'],
		dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
		dayNamesShort: ['Min','Sen','Sel','Rab','kam','Jum','Sab'],
		dayNamesMin: ['Mg','Sn','Sl','Rb','Km','jm','Sb'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;mundur',
		prevStatus: 'Tampilkan bulan sebelumnya',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'maju&#x3e;',
		nextStatus: 'Tampilkan bulan berikutnya',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'hari ini',
		currentStatus: 'Tampilkan bulan sekarang',
		todayText: 'hari ini',
		todayStatus: 'Tampilkan bulan sekarang',
		clearText: 'kosongkan',
		clearStatus: 'bersihkan tanggal yang sekarang',
		closeText: 'Tutup',
		closeStatus: 'Tutup tanpa mengubah',
		yearStatus: 'Tampilkan tahun yang berbeda',
		monthStatus: 'Tampilkan bulan yang berbeda',
		weekText: 'Mg',
		weekStatus: 'Minggu dalam tahun',
		dayStatus: 'pilih le DD, MM d',
		defaultStatus: 'Pilih Tanggal',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.id);
})(jQuery);
