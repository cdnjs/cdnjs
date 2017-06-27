/* http://keith-wood.name/countdown.html
   Simplified Chinese initialisation for the jQuery countdown extension
   Written by Cloudream (cloudream@gmail.com). */
(function($) {
	$.countdown.regional['zh-CN'] = {
		labels: ['年', '月', '周', '天', '时', '分', '秒'],
		labels1: ['年', '月', '周', '天', '时', '分', '秒'],
		compactLabels: ['年', '月', '周', '天'], compactLabels1: ['年', '月', '周', '天'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['zh-CN']);
})(jQuery);
