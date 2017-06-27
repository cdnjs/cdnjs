/* http://keith-wood.name/datepick.html
   Afrikaans localisation for jQuery Datepicker.
   Written by Renier Pretorius and Ruediger Thiede. */
(function($) {
	$.datepick.regionalOptions['af'] = {
		monthNames: ['Januarie','Februarie','Maart','April','Mei','Junie',
		'Julie','Augustus','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
		dayNamesShort: ['Son', 'Maan', 'Dins', 'Woens', 'Don', 'Vry', 'Sat'],
		dayNamesMin: ['So','Ma','Di','Wo','Do','Vr','Sa'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'Vorige', prevStatus: 'Vertoon vorige maand',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Vertoon vorige jaar',
		nextText: 'Volgende', nextStatus: 'Vertoon volgende maand',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Vertoon volgende jaar',
		currentText: 'Vandag', currentStatus: 'Vertoon huidige maand',
		todayText: 'Vandag', todayStatus: 'Vertoon huidige maand',
		clearText: 'Vee uit', clearStatus: 'Verwyder die huidige datum',
		closeText: 'Klaar', closeStatus: 'Sluit sonder verandering',
		yearStatus: 'Vertoon \'n ander jaar', monthStatus: 'Vertoon \'n ander maand',
		weekText: 'Wk', weekStatus: 'Week van die jaar',
		dayStatus: 'Kies DD, M d', defaultStatus: 'Kies \'n datum',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['af']);
})(jQuery);
