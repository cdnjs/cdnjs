/* http://keith-wood.name/datepick.html
   Tatar localisation for jQuery Datepicker.
   Written by Irek Khaziev (khazirek@gmail.com). */
(function($) {
	$.datepick.regionalOptions['tt'] = {
		monthNames: ['Гынвар','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Гыйн','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['якшәмбе','дүшәмбе','сишәмбе','чәршәмбе','пәнҗешәмбе','җомга','шимбә'],
		dayNamesShort: ['якш','дүш','сиш','чәр','пән','җом','шим'],
		dayNamesMin: ['Як','Дү','Си','Чә','Пә','Җо','Ши'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'Алдагы',  prevStatus: 'Алдагы айны күрсәтү',
		prevJumpText: '&lt;&lt;', prevJumpStatus: 'Алдагы елны күрсәтү',
		nextText: 'Киләсе', nextStatus: 'Киләсе айны күрсәтү',
		nextJumpText: '&gt;&gt;', nextJumpStatus: 'Киләсе елны күрсәтү',
		currentText: 'Хәзер', currentStatus: 'Хәзерге айны күрсәтү',
		todayText: 'Бүген', todayStatus: 'Бүгенге айны күрсәтү',
		clearText: 'Чистарту', clearStatus: 'Барлык көннәрне чистарту',
		closeText: 'Ябарга', closeStatus: 'Көн сайлауны ябарга',
		yearStatus: 'Елны кертегез', monthStatus: 'Айны кертегез',
		weekText: 'Атна', weekStatus: 'Елда атна саны',
		dayStatus: 'DD, M d', defaultStatus: 'Көнне сайлагыз',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['tt']);
})(jQuery);
