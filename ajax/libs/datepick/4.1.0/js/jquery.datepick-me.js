/* http://keith-wood.name/datepick.html
   Montenegrin localisation for jQuery Datepicker.
   By Miloš Milošević - fleka d.o.o. */
(function($) {
	$.datepick.regional['me'] = {
		monthNames: ['Јануар','Фебруар','Март','Април','Мај','Јун',
		'Јул','Август','Септембар','Октобар','Новембар','Децембар'],
		monthNamesShort: ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун',
		'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'],
		dayNames: ['Неђеља', 'Понеђељак', 'Уторак', 'Сриједа', 'Четвртак', 'Петак', 'Субота'],
		dayNamesShort: ['Неђ', 'Пон', 'Уто', 'Сри', 'Чет', 'Пет', 'Суб'],
		dayNamesMin: ['Не','По','Ут','Ср','Че','Пе','Су'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;', prevStatus: 'Прикажи претходни мјесец',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Прикажи претходну годину',
		nextText: '&#x3e;', nextStatus: 'Прикажи сљедећи мјесец',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Прикажи сљедећу годину',
		currentText: 'Данас', currentStatus: 'Текући мјесец',
		todayText: 'Данас', todayStatus: 'Текући мјесец',
		clearText: 'Обриши', clearStatus: 'Обриши тренутни датум',
		closeText: 'Затвори', closeStatus: 'Затвори календар',
		yearStatus: 'Прикажи године', monthStatus: 'Прикажи мјесеце',
		weekText: 'Сед', weekStatus: 'Седмица',
		dayStatus: '\'Датум\' DD d MM', defaultStatus: 'Одабери датум',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['me']);
})(jQuery);
