/* http://keith-wood.name/datepick.html
   Turkish localisation for jQuery Datepicker.
   Written by Izzet Emre Erkan (kara@karalamalar.net). */
(function($) {
	$.datepick.regional['tr'] = {
		monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
		'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
		monthNamesShort: ['Oca','Şub','Mar','Nis','May','Haz',
		'Tem','Ağu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;geri', prevStatus: 'önceki ayı göster',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'ileri&#x3e', nextStatus: 'sonraki ayı göster',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'bugün', currentStatus: '',
		todayText: 'bugün', todayStatus: '',
		clearText: 'temizle', clearStatus: 'geçerli tarihi temizler',
		closeText: 'kapat', closeStatus: 'sadece göstergeyi kapat',
		yearStatus: 'başka yıl', monthStatus: 'başka ay',
		weekText: 'Hf', weekStatus: 'Ayın haftaları',
		dayStatus: 'D, M d seçiniz', defaultStatus: 'Bir tarih seçiniz',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['tr']);
})(jQuery);
