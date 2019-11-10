/*
 * Korean locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ko')
 *
 */
Sugar.Date.addLocale('ko', {
  'ampmFront': true,
  'numeralUnits': true,
  'units': '밀리초,초,분,시간,일,주,개월|달,년|해',
  'weekdays': '일:요일|,월:요일|,화:요일|,수:요일|,목:요일|,금:요일|,토:요일|',
  'numerals': '영|제로,일|한,이,삼,사,오,육,칠,팔,구,십',
  'short':  '{yyyy}.{MM}.{dd}',
  'medium': '{yyyy}년 {M}월 {d}일',
  'long':   '{yyyy}년 {M}월 {d}일 {time}',
  'full':   '{yyyy}년 {M}월 {d}일 {weekday} {time}',
  'stamp':  '{yyyy}년 {M}월 {d}일 {H}:{mm} {dow}',
  'time':   '{tt} {h}시 {mm}분',
  'past':   '{num}{unit} {sign}',
  'future': '{num}{unit} {sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': ',초,분,시,일,,월,년',
  'ampm': '오전,오후',
  'modifiers': [
    { 'name': 'day', 'src': '그저께', 'value': -2 },
    { 'name': 'day', 'src': '어제', 'value': -1 },
    { 'name': 'day', 'src': '오늘', 'value': 0 },
    { 'name': 'day', 'src': '내일', 'value': 1 },
    { 'name': 'day', 'src': '모레', 'value': 2 },
    { 'name': 'sign', 'src': '전', 'value': -1 },
    { 'name': 'sign', 'src': '후', 'value':  1 },
    { 'name': 'shift', 'src': '지난|작', 'value': -1 },
    { 'name': 'shift', 'src': '이번|올', 'value': 0 },
    { 'name': 'shift', 'src': '다음|내', 'value': 1 }
  ],
  'parse': [
    '{num}{unit} {sign}',
    '{shift?} {unit:5-7}',
    '{year?} {month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift} {unit:5?} {weekday}',
    '{year?} {month?} {date} {weekday?}'
  ]
});
