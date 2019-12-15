/*
 * Japanese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ja')
 *
 */
Sugar.Date.addLocale('ja', {
  'ampmFront': true,
  'numeralUnits': true,
  'allowsFullWidth': true,
  'timeMarkerOptional': true,
  'firstDayOfWeek': 0,
  'firstDayOfWeekYear': 1,
  'units': 'ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年|年度',
  'weekdays': '日:曜日||曜,月:曜日||曜,火:曜日||曜,水:曜日||曜,木:曜日||曜,金:曜日||曜,土:曜日||曜',
  'numerals': '〇,一,二,三,四,五,六,七,八,九',
  'placeholders': '十,百,千,万',
  'timeSuffixes': ',秒,分,時,日,,月,年度?',
  'short':  '{yyyy}/{MM}/{dd}',
  'medium': '{yyyy}年{M}月{d}日',
  'long':   '{yyyy}年{M}月{d}日{time}',
  'full':   '{yyyy}年{M}月{d}日{time} {weekday}',
  'stamp':  '{yyyy}年{M}月{d}日 {H}:{mm} {dow}',
  'time':   '{tt}{h}時{mm}分',
  'past':   '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'ampm': '午前,午後',
  'modifiers': [
    { 'name': 'day', 'src': '一昨々日|前々々日', 'value': -3 },
    { 'name': 'day', 'src': '一昨日|おととい|前々日', 'value': -2 },
    { 'name': 'day', 'src': '昨日|前日', 'value': -1 },
    { 'name': 'day', 'src': '今日|当日|本日', 'value': 0 },
    { 'name': 'day', 'src': '明日|翌日|次日', 'value': 1 },
    { 'name': 'day', 'src': '明後日|翌々日', 'value': 2 },
    { 'name': 'day', 'src': '明々後日|翌々々日', 'value': 3 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '後', 'value': 1 },
    { 'name': 'edge', 'src': '始|初日|頭', 'value': -2 },
    { 'name': 'edge', 'src': '末|尻', 'value': 2 },
    { 'name': 'edge', 'src': '末日', 'value': 1 },
    { 'name': 'shift', 'src': '一昨々|前々々', 'value': -3 },
    { 'name': 'shift', 'src': '一昨|前々|先々', 'value': -2 },
    { 'name': 'shift', 'src': '先|昨|去|前', 'value': -1 },
    { 'name': 'shift', 'src': '今|本|当', 'value':  0 },
    { 'name': 'shift', 'src': '来|明|翌|次', 'value':  1 },
    { 'name': 'shift', 'src': '明後|翌々|次々|再来|さ来', 'value': 2 },
    { 'name': 'shift', 'src': '明々後|翌々々', 'value':  3 }
  ],
  'parse': [
    '{month}{edge}',
    '{num}{unit}{sign}',
    '{year?}{month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift}{unit:5}{weekday?}',
    '{shift}{unit:7}{month}{edge}',
    '{shift}{unit:7}{month?}{date?}',
    '{shift}{unit:6}{edge?}{date?}',
    '{year?}{month?}{date}'
  ]
});
