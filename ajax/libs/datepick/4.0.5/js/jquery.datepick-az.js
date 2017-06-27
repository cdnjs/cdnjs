/* http://keith-wood.name/datepick.html
   Azerbaijani localisation for jQuery Datepicker.
   Written by Jamil Najafov (necefov33@gmail.com). */
(function($) {
	$.datepick.regional['az'] = {
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','İyun',
		'İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','İyun',
		'İyul','Avq','Sen','Okt','Noy','Dek'],
		dayNames: ['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə'],
		dayNamesShort: ['B','Be','Ça','Ç','Ca','C','Ş'],
		dayNamesMin: ['B','B','Ç','С','Ç','C','Ş'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Geri',  prevStatus: 'Əvvəlki ay',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Əvvəlki il',
		nextText: 'İrəli&#x3e;', nextStatus: 'Sonrakı ay',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Sonrakı il',
		currentText: 'Bugün', currentStatus: 'İndiki ay',
		todayText: 'Bugün', todayStatus: 'İndiki ay',
		clearText: 'Təmizlə', clearStatus: 'Tarixi sil',
		closeText: 'Bağla', closeStatus: 'Təqvimi bağla',
		yearStatus: 'Başqa il', monthStatus: 'Başqa ay',
		weekText: 'Hf', weekStatus: 'Həftələr',
		dayStatus: 'D, M d seçin', defaultStatus: 'Bir tarix seçin',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['az']);
})(jQuery);