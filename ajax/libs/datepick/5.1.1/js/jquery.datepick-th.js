/* http://keith-wood.name/datepick.html
   Thai localisation for jQuery Datepicker.
   Written by pipo (pipo@sixhead.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.th = {
		monthNames: ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
		'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],
		monthNamesShort: ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.',
		'ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],
		dayNames: ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'],
		dayNamesShort: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'],
		dayNamesMin: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&laquo;&nbsp;ย้อน',
		prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'ถัดไป&nbsp;&raquo;',
		nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'วันนี้',
		currentStatus: '',
		todayText: 'วันนี้',
		todayStatus: '',
		clearText: 'ลบ',
		clearStatus: '',
		closeText: 'ปิด',
		closeStatus: '',
		yearStatus: '',
		monthStatus: '',
		weekText: 'Wk',
		weekStatus: '',
		dayStatus: 'D, M d',
		defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.th);
})(jQuery);
