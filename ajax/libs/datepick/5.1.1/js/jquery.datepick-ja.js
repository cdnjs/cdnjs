/* http://keith-wood.name/datepick.html
   Japanese localisation for jQuery Datepicker.
   Written by Kentaro SATO (kentaro@ranvis.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.ja = {
		monthNames: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		monthNamesShort: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		dayNamesShort: ['日','月','火','水','木','金','土'],
		dayNamesMin: ['日','月','火','水','木','金','土'],
		dateFormat: 'yyyy/mm/dd',
		firstDay: 0,
		renderer: $.extend({}, $.datepick.defaultRenderer, {
			month: $.datepick.defaultRenderer.month.replace(/monthHeader/, 'monthHeader:yyyy年 MM')
		}),
		prevText: '&#x3c;前',
		prevStatus: '前月を表示します',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '前年を表示します',
		nextText: '次&#x3e;',
		nextStatus: '翌月を表示します',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '翌年を表示します',
		currentText: '今日',
		currentStatus: '今月を表示します',
		todayText: '今日',
		todayStatus: '今月を表示します',
		clearText: 'クリア',
		clearStatus: '日付をクリアします',
		closeText: '閉じる',
		closeStatus: '変更せずに閉じます',
		yearStatus: '表示する年を変更します',
		monthStatus: '表示する月を変更します',
		weekText: '週',
		weekStatus: '暦週で第何週目かを表します',
		dayStatus: 'Md日(D)',
		defaultStatus: '日付を選択します',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.ja);
})(jQuery);
