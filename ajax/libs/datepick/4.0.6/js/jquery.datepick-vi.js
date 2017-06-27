/* http://keith-wood.name/datepick.html
   Vietnamese localisation for jQuery Datepicker.
   Translated by Le Thanh Huy (lthanhhuy@cit.ctu.edu.vn). */
(function($) {
	$.datepick.regional['vi'] = {
		monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
		'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
		monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
		'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
		dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
		dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dateFormat: 'dd/mm/yyyy', firstDay: 0,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Trước', prevStatus: 'Tháng trước',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Năm trước',
		nextText: 'Tiếp&#x3e;', nextStatus: 'Tháng sau',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Năm sau',
		currentText: 'Hôm nay', currentStatus: 'Tháng hiện tại',
		todayText: 'Hôm nay', todayStatus: 'Tháng hiện tại',
		clearText: 'Xóa', clearStatus: 'Xóa ngày hiện tại',
		closeText: 'Đóng', closeStatus: 'Đóng và không lưu lại thay đổi',
		yearStatus: 'Năm khác', monthStatus: 'Tháng khác',
		weekText: 'Tu', weekStatus: 'Tuần trong năm',
		dayStatus: 'Đang chọn DD, \'ngày\' d M', defaultStatus: 'Chọn ngày',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['vi']);
})(jQuery);
