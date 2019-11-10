/*
 * Danish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('da')
 *
 */
Sugar.Date.addLocale('da', {
  'plural': true,
  'units': 'millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
  'months': 'jan:uar|,feb:ruar|,mar:ts|,apr:il|,maj,jun:i|,jul:i|,aug:ust|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
  'weekdays': 'søn:dag|+son:dag|,man:dag|,tir:sdag|,ons:dag|,tor:sdag|,fre:dag|,lør:dag|+lor:dag|',
  'numerals': 'nul,en|et,to,tre,fire,fem,seks,syv,otte,ni,ti',
  'tokens':   'den,for',
  'articles': 'den',
  'short':  '{dd}-{MM}-{yyyy}',
  'medium': '{d}. {month} {yyyy}',
  'long':   '{d}. {month} {yyyy} {time}',
  'full':   '{weekday} d. {d}. {month} {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
    { 'name': 'day', 'src': 'over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'siden', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i sidste|sidste', 'value': -1 },
    { 'name': 'shift', 'src': 'denne', 'value': 0 },
    { 'name': 'shift', 'src': 'næste|naeste', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift} {weekday}',
    '{0?} {weekday?},? {date}\\.? {months?}\\.? {year?}'
  ]
});
