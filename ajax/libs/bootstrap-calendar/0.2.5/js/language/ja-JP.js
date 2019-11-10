if(!window.calendar_languages) {
	window.calendar_languages = {};
}

window.calendar_languages['ja-JP'] = {
	error_noview: 'カレンダーのビューが見つかりません： {0}',
	error_dateformat: '日付のフォーマットが間違っています：{0}。"now" か "yyyy-mm-dd" で指定して下さい。',
	error_loadurl: 'カレンダーのイベントURLがセットされていません。',
	error_where: 'カレンダーのナビゲーションが間違っています：{0}。"next" か "prev" か "today" でセットして下さい。',
	error_timedevide: 'カレンダーの時間分割パラメーターは、10, 15, 30等の60を小数なしで割り切れる整数を指定して下さい。',

	no_events_in_day: 'イベントはありません。',

	// {0} will be replaced with the year (example: 2013)
	title_year: '{0}年',
	// {0} will be replaced with the month name (example: September)
	// {1} will be replaced with the year (example: 2013)
	title_month: '{1}年{0}',
	// {0} will be replaced with the week number (example: 37)
	// {1} will be replaced with the year (example: 2013)
	title_week: '{1}年{0}週目',
	// {0} will be replaced with the weekday name (example: Thursday)
	// {1} will be replaced with the day of the month (example: 12)
	// {2} will be replaced with the month name (example: September)
	// {3} will be replaced with the year (example: 2013)
	title_day: '{3}年{2}{1}日({0})',

	week:        '{0}週目',
	all_day:     '終日',
	time:        '時間',
	events:      'イベント',
	before_time: 'タイムラインの前に終了',
	after_time:  'タイムラインの後に開始',

	m0: '1月',
	m1: '2月',
	m2: '3月',
	m3: '4月',
	m4: '5月',
	m5: '6月',
	m6: '7月',
	m7: '8月',
	m8: '9月',
	m9: '10月',
	m10: '11月',
	m11: '12月',

	ms0: '1月',
	ms1: '2月',
	ms2: '3月',
	ms3: '4月',
	ms4: '5月',
	ms5: '6月',
	ms6: '7月',
	ms7: '8月',
	ms8: '9月',
	ms9: '10月',
	ms10: '11月',
	ms11: '12月',

	d0: '日',
	d1: '月',
	d2: '火',
	d3: '水',
	d4: '木',
	d5: '金',
	d6: '土',

	// Which is the first day of the week (2 for sunday, 1 for monday)
	first_day: 2,

	// The list of the holidays.
	// Each holiday has a date definition and a name (in your language)
	// For instance:
	// holidays: {
	// 	'date': 'name',
	// 	'date': 'name',
	// 	...
	//   'date': 'name' //No ending comma for the last holiday
	// }
	// The format of the date may be one of the following:
	// # For a holiday recurring every year in the same day: 'dd-mm' (dd is the day of the month, mm is the month). For example: '25-12'.
	// # For a holiday that exists only in one specific year: 'dd-mm-yyyy' (dd is the day of the month, mm is the month, yyyy is the year). For example: '31-01-2013'
	// # For Easter: use simply 'easter'
	// # For holidays that are based on the Easter date: 'easter+offset in days'.
	//   Some examples:
	//   - 'easter-2' is Good Friday (2 days before Easter)
	//   - 'easter+1' is Easter Monday (1 day after Easter)
	//   - 'easter+39' is the Ascension Day
	//   - 'easter+49' is Pentecost
	// # For holidays that are on a specific weekday after the beginning of a month: 'mm+n*w', where 'mm' is the month, 'n' is the ordinal position, 'w' is the weekday being 0: Sunday, 1: Monday, ..., 6: Saturnday
	//   For example:
	//   - Second (2) Monday (1) in October (10): '10+2*1'
	// # For holidays that are on a specific weekday before the ending of a month: 'mm-n*w', where 'mm' is the month, 'n' is the ordinal position, 'w' is the weekday being 0: Sunday, 1: Monday, ..., 6: Saturnday
	//   For example:
	//   - Last (1) Saturnday (6) in Match (03): '03-1*6'
	//   - Last (1) Monday (1) in May (05): '05-1*1'
	// # You can also specify a holiday that lasts more than one day. To do that use the format 'start>end' where 'start' and 'end' are specified as above.
	//   For example:
	//   - From 1 January to 6 January: '01-01>06-01'
	//   - Easter and the day after Easter: 'easter>easter+1'
	//   Limitations: currently the multi-day holydays can't cross an year. So, for example, you can't specify a range as '30-12>01-01'; as a workaround you can specify two distinct holidays (for instance '30-12>31-12' and '01-01'). 
	holidays: {
	}
};
