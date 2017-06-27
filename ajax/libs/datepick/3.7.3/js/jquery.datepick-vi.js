/* Vietnamese (Tieng Viet) initialisation for the jQuery UI date picker plugin
	Translated by Le Thanh Huy (lthanhhuy@cit.ctu.edu.vn). */
(function($) {
	$.datepick.regional['vi'] = {
		clearText: 'Xóa', clearStatus: 'Xóa ngày hiện tại',
		closeText: 'Đóng', closeStatus: 'Đóng và không lưu lại thay đổi',
		prevText: '&#x3c;Trước', prevStatus: 'Tháng trước',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Năm trước',
		nextText: 'Tiếp&#x3e;', nextStatus: 'Tháng sau',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Năm sau',
		currentText: 'Hôm nay', currentStatus: 'Tháng hiện tại',
		monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
		'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
		monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
		'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
		monthStatus: 'Tháng khác', yearStatus: 'Năm khác',
		weekHeader: 'Tu', weekStatus: 'Tuần trong năm',
		dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
		dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayStatus: 'Gán DD là ngày đầu của tuần', dateStatus: 'Đang chọn DD, \'ngày\' d M',
		dateFormat: 'dd/mm/yy', firstDay: 0,
		initStatus: 'Chọn ngày', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['vi']);
})(jQuery);
