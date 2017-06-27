/* http://keith-wood.name/datepick.html
   Traditional Chinese localisation for jQuery Datepicker.
   Written by Ressol (ressol@gmail.com). */
(function($) {
	$.datepick.regionalOptions['zh-TW'] = {
		monthNames: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一','二','三','四','五','六',
		'七','八','九','十','十一','十二'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		dateFormat: 'yyyy/mm/dd', firstDay: 1,
		renderer: $.extend({}, $.datepick.defaultRenderer,
			{month: $.datepick.defaultRenderer.month.
				replace(/monthHeader/, 'monthHeader:MM yyyy年')}),
		prevText: '&#x3c;上月', prevStatus: '顯示上月',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '顯示上一年',
		nextText: '下月&#x3e;', nextStatus: '顯示下月',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '顯示下一年',
		currentText: '今天', currentStatus: '顯示本月',
		todayText: '今天', todayStatus: '顯示本月',
		clearText: '清除', clearStatus: '清除已選日期',
		closeText: '關閉', closeStatus: '不改變目前的選擇',
		yearStatus: '選擇年份', monthStatus: '選擇月份',
		weekText: '周', weekStatus: '年內周次',
		dayStatus: '選擇 m月 d日, DD', defaultStatus: '請選擇日期',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['zh-TW']);
})(jQuery);
