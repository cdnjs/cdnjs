/* Azerbaijani (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Jamil Najafov (necefov33@gmail.com). */
(function($) {
	$.datepick.regional['az'] = {
		clearText: 'Təmizlə', clearStatus: 'Tarixi sil',
		closeText: 'Bağla', closeStatus: 'Təqvimi bağla',
		prevText: '&#x3c;Geri',  prevStatus: 'Əvvəlki ay',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Əvvəlki il',
		nextText: 'İrəli&#x3e;', nextStatus: 'Sonrakı ay',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Sonrakı il',
		currentText: 'Bugün', currentStatus: 'İndiki ay',
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','İyun',
		'İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','İyun',
		'İyul','Avq','Sen','Okt','Noy','Dek'],
		monthStatus: 'Başqa ay', yearStatus: 'Başqa il',
		weekHeader: 'Hf', weekStatus: 'Həftələr',
		dayNames: ['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə'],
		dayNamesShort: ['B','Be','Ça','Ç','Ca','C','Ş'],
		dayNamesMin: ['B','B','Ç','С','Ç','C','Ş'],
		dayStatus: 'Həftənin ilk gününü təyin edin', dateStatus: 'D, M d seçin',
		dateFormat: 'dd.mm.yy', firstDay: 1,
		initStatus: 'Bir tarix seçin', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['az']);
})(jQuery);