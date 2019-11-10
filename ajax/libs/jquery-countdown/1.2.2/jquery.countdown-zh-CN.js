/* http://keith-wood.name/countdown.html
   Simplified Chinese initialisation for the jQuery countdown extension
   Written by Cloudream (cloudream@gmail.com). */
$(document).ready(function() {
	$.countdown.regional['zh-CN'] = {
		labels: ['年', '月', '周', '天', '时', '分', '秒'],
		labelsSingle: ['年', '月', '周', '天', '时', '分', '秒'],
		compactLabels: ['年', '月', '周', '天'], compactLabelsSingle: ['年', '月', '周', '天'],
		timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['zh-CN']);
});