/* http://keith-wood.name/datepick.html
   Simplified Chinese localisation for jQuery Datepicker.
   Written by Cloudream (cloudream@gmail.com). */
(function($) {
	$.datepick.regional['zh-CN'] = {
		monthNames: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一','二','三','四','五','六',
		'七','八','九','十','十一','十二'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		dateFormat: 'yyyy-mm-dd', firstDay: 1,
		renderer: $.extend({}, $.datepick.defaultRenderer,
			{month: $.datepick.defaultRenderer.month.
				replace(/monthHeader/, 'monthHeader:MM yyyy年')}),
		prevText: '&#x3c;上月', prevStatus: '显示上月',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '显示上一年',
		nextText: '下月&#x3e;', nextStatus: '显示下月',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '显示下一年',
		currentText: '今天', currentStatus: '显示本月',
		todayText: '今天', todayStatus: '显示本月',
		clearText: '清除', clearStatus: '清除已选日期',
		closeText: '关闭', closeStatus: '不改变当前选择',
		yearStatus: '选择年份', monthStatus: '选择月份',
		weekText: '周', weekStatus: '年内周次',
		dayStatus: '选择 m月 d日, DD', defaultStatus: '请选择日期',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['zh-CN']);
})(jQuery);
