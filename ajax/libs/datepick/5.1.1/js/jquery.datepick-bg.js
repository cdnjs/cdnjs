/* http://keith-wood.name/datepick.html
   Bulgarian localisation for jQuery Datepicker.
   Written by Stoyan Kyosev (http://svest.org). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.bg = {
		monthNames: ['Януари','Февруари','Март','Април','Май','Юни',
		'Юли','Август','Септември','Октомври','Ноември','Декември'],
		monthNamesShort: ['Яну','Фев','Мар','Апр','Май','Юни',
		'Юли','Авг','Сеп','Окт','Нов','Дек'],
		dayNames: ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота'],
		dayNamesShort: ['Нед','Пон','Вто','Сря','Чет','Пет','Съб'],
		dayNamesMin: ['Не','По','Вт','Ср','Че','Пе','Съ'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;назад',
		prevStatus: 'покажи последния месец',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'напред&#x3e;',
		nextStatus: 'покажи следващия месец',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'днес',
		currentStatus: '',
		todayText: 'днес',
		todayStatus: '',
		clearText: 'изчисти',
		clearStatus: 'изчисти актуалната дата',
		closeText: 'затвори',
		closeStatus: 'затвори без промени',
		yearStatus: 'покажи друга година',
		monthStatus: 'покажи друг месец',
		weekText: 'Wk',
		weekStatus: 'седмица от месеца',
		dayStatus: 'Избери D, M d',
		defaultStatus: 'Избери дата',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.bg);
})(jQuery);
