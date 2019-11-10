/* Afrikaans initialisation for the jQuery UI date picker plugin. */
/* Written by Renier Pretorius. */
(function($) {
	$.datepick.regional['af'] = {
		clearText: 'Kanselleer', clearStatus: 'Korigeer die huidige datum',
		closeText: 'Selekteer', closeStatus: 'Sluit sonder verandering',
		prevText: 'Vorige', prevStatus: 'Vertoon vorige maand',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Vertoon vorige jaar',
		nextText: 'Volgende', nextStatus: 'Vertoon volgende maand',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Vertoon volgende jaar',
		currentText: 'Vandag', currentStatus: 'Vertoon huidige maand',
		monthNames: ['Januarie','Februarie','Maart','April','Mei','Junie',
		'Julie','Augustus','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		monthStatus: 'Vertoon n ander maand', yearStatus: 'Vertoon n ander jaar',
		weekHeader: 'Wk', weekStatus: 'Week van die jaar',
		dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
		dayNamesShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
		dayNamesMin: ['So','Ma','Di','Wo','Do','Vr','Sa'],
		dayStatus: 'Stel DD as eerste dag van die week', dateStatus: 'Kies DD, M d',
		dateFormat: 'dd/mm/yy', firstDay: 1,
		initStatus: 'Kies n datum', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['af']);
})(jQuery);
