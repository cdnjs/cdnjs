
if(!window.calendar_languages) {
	window.calendar_languages = {};
}

window.calendar_languages['th-TH'] = {
	error_noview: 'ปฏิทิน: ไม่พบ View {0}',
	error_dateformat: 'ปฏิทิน: รูปแบบวันที่ไม่ถูกต้อง {0}. ควรจะเป็นค่า "now" หรือ "yyyy-mm-dd"',
	error_loadurl: 'ปฏิทิน: URL ของเหตุการณ์ไม่ได้ตั้งค่าไว้',
	error_where: 'ปฏิทิน: เกิดข้อผิดพลาด {0}. สามารถเป็นได้แค่ค่า "ถัดไป" หรือ "ก่อนหน้า" หรือ "วันนี้" เท่านั้น',
	error_timedevide: 'ปฏิทิน:  Time split parameter ควรนำไปหาร 60 ลงตัวเท่านั้น. อย่างเช่น 10, 15, 30',

	no_events_in_day: 'วันนี้ไม่มีเหตุการณ์ใดๆ',

	// {0} will be replaced with the year (example: 2013)
	title_year: '{0}',
	// {0} will be replaced with the month name (example: September)
	// {1} will be replaced with the year (example: 2013)
	title_month: '{0} {1}',
	// {0} will be replaced with the week number (example: 37)
	// {1} will be replaced with the year (example: 2013)
	title_week: 'สัปดาห์ที่ {0} ของปี {1}',
	// {0} will be replaced with the weekday name (example: Thursday)
	// {1} will be replaced with the day of the month (example: 12)
	// {2} will be replaced with the month name (example: September)
	// {3} will be replaced with the year (example: 2013)
	title_day: '{0} {1} {2}, {3}',

	week:'สัปดาห์ที่ {0}',
	all_day:     'ทุกวัน',
	time:        'เวลา',
	events:      'เหตุการณ์',
	before_time: 'เริ่มก่อน Timeline',
	after_time:  'เริ่มหลัง Timeline',

	m0: 'มกราคม',
	m1: 'กุมภาพันธ์',
	m2: 'มีนาคม',
	m3: 'เมษายน',
	m4: 'พฤษภาคม',
	m5: 'มิถุนายน',
	m6: 'กรกฎาคม',
	m7: 'สิงหาคม',
	m8: 'กันยายน',
	m9: 'ตุลาคม',
	m10: 'พฤศจิกายน',
	m11: 'ธันวาคม',

	ms0: 'ม.ค.',
	ms1: 'ก.พ.',
	ms2: 'มี.ค.',
	ms3: 'เม.ย.',
	ms4: 'พ.ค.',
	ms5: 'มิ.ย.',
	ms6: 'ก.ค.',
	ms7: 'ส.ค.',
	ms8: 'ก.ย.',
	ms9: 'ต.ค.',
	ms10: 'พ.ย.',
	ms11: 'ธ.ค.',

	d0: 'อาทิตย์',
	d1: 'จันทร์',
	d2: 'อังคาร',
	d3: 'พุธ',
	d4: 'พฤหัสบดี',
	d5: 'ศุกร์',
	d6: 'เสาร์',

	first_day: 1,
	week_numbers_iso_8601: true,
	holidays: {
	}
};
