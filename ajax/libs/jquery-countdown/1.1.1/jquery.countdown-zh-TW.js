/* http://keith-wood.name/countdown.html
   Traditional Chinese initialisation for the jQuery countdown extension
   Written by Cloudream (cloudream@gmail.com). */
$(document).ready(function() {
	$.countdown.regional['zh-TW'] = {
		labels: ['年', '月', '周', '天', '時', '分', '秒'],
		compactLabels: ['年', '月', '周', '天'], timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['zh-TW']);
});