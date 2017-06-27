if(!window.calendar_languages) {
	window.calendar_languages = {};
}

window.calendar_languages['zh-CN'] = {
	error_noview:     'Calendar: 没有发现视图 {0} ',
	error_dateformat: 'Calendar: 日期格式不正确： {0}. 应当为 "now" 或者 "yyyy-mm-dd"',
	error_loadurl:    'Calendar: 没有设置事件的 URL',
	error_where:      'Calendar: 导航指示错误 {0}. 只能是 "next" 或 "prev" 或 "today"',
	error_timedevide: 'Calendar: 时间分隔参数只能是被60整除的整数. 例如 10、15、30',

	no_events_in_day: '今天没有事件。',

	title_year:       '{0}',
	title_month:      '{1} 年 {0}',
	title_week:       '{1} 年 第 {0} 周 ',
	title_day:        '{3} 年 {2} {1} 日， {0} ',

	week:        '第{0}周',
	all_day:     '全天',
	time:        '时间',
	events:      '事件',
	before_time: '结束早于时间轴',
	after_time:  '开始晚于时间轴',

	m0:  '1 月',
	m1:  '2 月',
	m2:  '3 月',
	m3:  '4 月',
	m4:  '5 月',
	m5:  '6 月',
	m6:  '7 月',
	m7:  '8 月',
	m8:  '9 月',
	m9:  '10 月',
	m10: '11 月',
	m11: '12 月',

	ms0:  '1 月',
	ms1:  '2 月',
	ms2:  '3 月',
	ms3:  '4 月',
	ms4:  '5 月',
	ms5:  '6 月',
	ms6:  '7 月',
	ms7:  '8 月',
	ms8:  '9 月',
	ms9:  '10 月',
	ms10: '11 月',
	ms11: '12 月',

	d0:        '周日',
	d1:        '周一',
	d2:        '周二',
	d3:        '周三',
	d4:        '周四',
	d5:        '周五',
	d6:        '周六',

	first_day: 2,

	holidays:  {
		'01-01': '元旦',
		'08-03': '妇女节',
		'01-05': '国际劳动节',
		'04-05': '青年节',
		'01-06': '儿童节',
		'01-10': '国庆节'
	}
};
