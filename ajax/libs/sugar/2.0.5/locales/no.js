/*
 * Norwegian locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('no')
 *
 */
Sugar.Date.addLocale('no', {
  'plural': true,
  'units': 'millisekund:|er,sekund:|er,minutt:|er,tim:e|er,dag:|er,uk:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
  'months': 'januar,februar,mars,april,mai,juni,juli,august,september,oktober,november,desember',
  'weekdays': 'søndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,lørdag|lordag',
  'numerals': 'en|et,to,tre,fire,fem,seks,sju|syv,åtte,ni,ti',
  'tokens': 'den,for',
  'articles': 'den',
  'short':'d. {d}. {month} {yyyy}',
  'long': 'den {d}. {month} {yyyy} {H}:{mm}',
  'full': '{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
    { 'name': 'day', 'src': 'overimorgen|overmorgen|over i morgen', 'value': 2 },
    { 'name': 'sign', 'src': 'siden', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i siste|siste', 'value': -1 },
    { 'name': 'shift', 'src': 'denne', 'value': 0 },
    { 'name': 'shift', 'src': 'neste', 'value': 1 }
  ],
  'parse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{date} {month}',
    '{shift} {weekday}',
    '{0?} {weekday?},? {date?} {month}\\.? {year}'
  ]
});
