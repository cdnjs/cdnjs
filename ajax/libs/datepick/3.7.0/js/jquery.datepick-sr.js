/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimić. */
(function($) {
	$.datepick.regional['sr'] = {
		clearText: 'Обриши', clearStatus: 'Обриши тренутни датум',
		closeText: 'Затвори', closeStatus: 'Затвори календар',
		prevText: '&#x3c;', prevStatus: 'Прикажи предходни месец',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Прикажи предходну годину',
		nextText: '&#x3e;', nextStatus: 'Прикажи слецећи месец',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Прикажи следећу годину',
		currentText: 'Данас', currentStatus: 'Текући месец',
		monthNames: ['Јануар','Фебруар','Март','Април','Мај','Јун',
		'Јул','Август','Септембар','Октобар','Новембар','Децембар'],
		monthNamesShort: ['Јан','Феб','Мар','Апр','Мај','Јун','Јул','Авг','Сеп','Окт','Нов','Дец'],
		monthStatus: 'Прикажи месеце', yearStatus: 'Прикажи године',
		weekHeader: 'Сед', weekStatus: 'Седмица',
		dayNames: ['Недеља','Понедељак','Уторак','Среда','Четвртак','Петак','Субота'],
		dayNamesShort: ['Нед','Пон','Уто','Сре','Чет','Пет','Суб'],
		dayNamesMin: ['Не','По','Ут','Ср','Че','Пе','Су'],
		dayStatus: 'Одабери DD за први дан седмице', dateStatus: '\'Датум\' DD d MM',
		dateFormat: 'dd/mm/yy', firstDay: 1,
		initStatus: 'Одабери датум', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['sr']);
})(jQuery);
