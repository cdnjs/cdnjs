/* http://keith-wood.name/datepick.html
   Serbian localisation for jQuery Datepicker.
   Written by Dejan Dimić. */
(function($) {
	'use strict';
	$.datepick.regionalOptions.sr = {
		monthNames: ['Јануар','Фебруар','Март','Април','Мај','Јун',
		'Јул','Август','Септембар','Октобар','Новембар','Децембар'],
		monthNamesShort: ['Јан','Феб','Мар','Апр','Мај','Јун',
		'Јул','Авг','Сеп','Окт','Нов','Дец'],
		dayNames: ['Недеља','Понедељак','Уторак','Среда','Четвртак','Петак','Субота'],
		dayNamesShort: ['Нед','Пон','Уто','Сре','Чет','Пет','Суб'],
		dayNamesMin: ['Не','По','Ут','Ср','Че','Пе','Су'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;',
		prevStatus: 'Прикажи претходни месец',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: 'Прикажи претходну годину',
		nextText: '&#x3e;',
		nextStatus: 'Прикажи следећи месец',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: 'Прикажи следећу годину',
		currentText: 'Данас',
		currentStatus: 'Текући месец',
		todayText: 'Данас',
		todayStatus: 'Текући месец',
		clearText: 'Обриши',
		clearStatus: 'Обриши тренутни датум',
		closeText: 'Затвори',
		closeStatus: 'Затвори календар',
		yearStatus: 'Прикажи године',
		monthStatus: 'Прикажи месеце',
		weekText: 'Сед',
		weekStatus: 'Седмица',
		dayStatus: '\'Датум\' DD d MM',
		defaultStatus: 'Одабери датум',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.sr);
})(jQuery);
