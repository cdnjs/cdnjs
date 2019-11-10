/*
 * Italian locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('it')
 *
 */
Sugar.Date.addLocale('it', {
  'plural': true,
  'units': 'millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i',
  'months': 'gen:naio|,feb:braio|,mar:zo|,apr:ile|,mag:gio|,giu:gno|,lug:lio|,ago:sto|,set:tembre|,ott:obre|,nov:embre|,dic:embre|',
  'weekdays': 'dom:enica|,lun:edì||edi,mar:tedì||tedi,mer:coledì||coledi,gio:vedì||vedi,ven:erdì||erdi,sab:ato|',
  'numerals': "zero,un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",
  'tokens': "l'|la|il",
  'short': '{dd}/{MM}/{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long': '{d} {month} {yyyy} {time}',
  'full': '{weekday}, {d} {month} {yyyy} {time}',
  'stamp': '{dow} {d} {mon} {yyyy} {time}',
  'time': '{H}:{mm}',
  'past': '{num} {unit} {sign}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'timeMarkers': 'alle',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'ieri', 'value': -1 },
    { 'name': 'day', 'src': 'oggi', 'value': 0 },
    { 'name': 'day', 'src': 'domani', 'value': 1 },
    { 'name': 'day', 'src': 'dopodomani', 'value': 2 },
    { 'name': 'sign', 'src': 'fa', 'value': -1 },
    { 'name': 'sign', 'src': 'da adesso', 'value': 1 },
    { 'name': 'shift', 'src': 'scors:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'prossim:o|a', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{num} {unit} {sign}',
    '{0?} {unit:5-7} {shift}',
    '{0?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ]
});
