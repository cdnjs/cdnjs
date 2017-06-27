/*
 * Traditional Chinese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('zh-TW')
 *
 */
Sugar.Date.addLocale('zh-TW', {
  'ampmFront': true,
  'numeralUnits': true,
  'allowsFullWidth': true,
  'timeMarkerOptional': true,
  'units': '毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年',
  'weekdays': '星期日|日|週日|星期天,星期一|一|週一,星期二|二|週二,星期三|三|週三,星期四|四|週四,星期五|五|週五,星期六|六|週六',
  'numerals': '〇,一,二,三,四,五,六,七,八,九',
  'placeholders': '十,百,千,万',
  'short':  '{yyyy}/{MM}/{dd}',
  'medium': '{yyyy}年{M}月{d}日',
  'long':   '{yyyy}年{M}月{d}日{time}',
  'full':   '{yyyy}年{M}月{d}日{weekday}{time}',
  'stamp':  '{yyyy}年{M}月{d}日{H}:{mm}{dow}',
  'time':   '{tt}{h}點{mm}分',
  'past':   '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': ',秒,分鐘?,點|時,日|號,,月,年',
  'ampm': '上午,下午',
  'modifiers': [
    { 'name': 'day', 'src': '大前天', 'value': -3 },
    { 'name': 'day', 'src': '前天', 'value': -2 },
    { 'name': 'day', 'src': '昨天', 'value': -1 },
    { 'name': 'day', 'src': '今天', 'value': 0 },
    { 'name': 'day', 'src': '明天', 'value': 1 },
    { 'name': 'day', 'src': '後天', 'value': 2 },
    { 'name': 'day', 'src': '大後天', 'value': 3 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '後', 'value': 1 },
    { 'name': 'shift', 'src': '上|去', 'value': -1 },
    { 'name': 'shift', 'src': '這', 'value':  0 },
    { 'name': 'shift', 'src': '下|明', 'value':  1 }
  ],
  'parse': [
    '{num}{unit}{sign}',
    '{shift}{unit:5-7}',
    '{year?}{month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift}{weekday}',
    '{year?}{month?}{date}'
  ]
});
