/* http://keith-wood.name/datepick.html
   Македонски MK localisation for jQuery Datepicker.
   Written by Hajan Selmani
   email: hajan [at] live [dot] com
   url: http://weblogs.asp.net/hajan | http://codeasp.net/blogs/hajan | http://mkdot.net/blogs/hajan */
(function($) {
	'use strict';
	$.datepick.regionalOptions.mk = {
		monthNames: ['Јануари','Февруари','Март','Април','Мај','Јуни',
		'Јули','Август','Септември','Октомври','Ноември','Декември'],
		monthNamesShort: ['Јан','Фев','Мар','Апр','Мај','Јун',
		'Јул','Авг','Сеп','Окт','Нов','Дек'],
		dayNames: ['Недела','Понеделник','Вторник','Среда','Четврток','Петок','Сабота'],
		dayNamesShort: ['Нед','Пон','Вто','Сре','Чет','Пет','Саб'],
		dayNamesMin: ['Не','По','Вт','Ср','Че','Пе','Са'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'Претх.',
		prevStatus: 'Прикажи го претходниот месец',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: 'Прикажи ја претходната година',
		nextText: 'Следен',
		nextStatus: 'Прикажи го следниот месец',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: 'Прикажи ја следната година',
		currentText: 'Тековен',
		currentStatus: 'Прикажи го тековниот месец',
		todayText: 'Денес',
		todayStatus: 'Прикажи го денешниот месец',
		clearText: 'Бриши',
		clearStatus: 'Избриши го тековниот датум',
		closeText: 'Затвори',
		closeStatus: 'Затвори без промени',
		yearStatus: 'Избери друга година',
		monthStatus: 'Избери друг месец',
		weekText: 'Нед',
		weekStatus: 'Недела во годината',
		dayStatus: 'Избери DD, M d',
		defaultStatus: 'Избери датум',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.mk);
})(jQuery);