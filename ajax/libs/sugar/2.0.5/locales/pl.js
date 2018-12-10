/*
 * Polish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('pl')
 *
 */
Sugar.Date.addLocale('pl', {
  'plural': true,
  'units': 'milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzień|dni|dni,tydzień|tygodnie|tygodni,miesiąc|miesiące|miesięcy,rok|lata|lat',
  'months': 'sty:cznia||czeń,lut:ego||y,mar:ca||zec,kwi:etnia||ecień,maj:a|,cze:rwca||rwiec,lip:ca||iec,sie:rpnia||rpień,wrz:eśnia||esień,paź:dziernika||dziernik,lis:topada||topad,gru:dnia||dzień',
  'weekdays': 'nie:dziela||dzielę,pon:iedziałek|,wt:orek|,śr:oda||odę,czw:artek|,piątek|pt,sobota|sb|sobotę',
  'numerals': 'zero,jeden|jedną,dwa|dwie,trzy,cztery,pięć,sześć,siedem,osiem,dziewięć,dziesięć',
  'tokens': 'w|we,roku',
  'short': '{dd}.{MM}.{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long':  '{d} {month} {yyyy} {time}',
  'full' : '{weekday}, {d} {month} {yyyy} {time}',
  'stamp': '{dow} {d} {mon} {yyyy} {time}',
  'time': '{H}:{mm}',
  'timeMarkers': 'o',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'przedwczoraj', 'value': -2 },
    { 'name': 'day', 'src': 'wczoraj', 'value': -1 },
    { 'name': 'day', 'src': 'dzisiaj|dziś', 'value': 0 },
    { 'name': 'day', 'src': 'jutro', 'value': 1 },
    { 'name': 'day', 'src': 'pojutrze', 'value': 2 },
    { 'name': 'sign', 'src': 'temu|przed', 'value': -1 },
    { 'name': 'sign', 'src': 'za', 'value': 1 },
    { 'name': 'shift', 'src': 'zeszły|zeszła|ostatni|ostatnia', 'value': -1 },
    { 'name': 'shift', 'src': 'następny|następna|następnego|przyszły|przyszła|przyszłego', 'value': 1 }
  ],
  'relative': function (num, unit, ms, format) {
    // special cases for relative days
    var DAY = 4;
    if (unit === DAY) {
      if (num === 1 && format === 'past')   return 'wczoraj';
      if (num === 1 && format === 'future') return 'jutro';
      if (num === 2 && format === 'past')   return 'przedwczoraj';
      if (num === 2 && format === 'future') return 'pojutrze';
    }

    var mult;
    var last  = +num.toFixed(0).slice(-1);
    var last2 = +num.toFixed(0).slice(-2);
    switch (true) {
      case num === 1:                  mult = 0; break;
      case last2 >= 12 && last2 <= 14: mult = 2; break;
      case last  >=  2 && last  <=  4: mult = 1; break;
      default:                         mult = 2;
    }
    var text = this['units'][(mult * 8) + unit];
    var prefix = num + ' ';

    // changing to accusative case for 'past' and 'future' formats
    // (only singular feminine unit words are different in accusative, each of which ends with 'a')
    if ((format === 'past' || format === 'future') && num === 1) {
      text = text.replace(/a$/, 'ę');
    }

    text = prefix + text;
    switch (format) {
      case 'duration': return text;
      case 'past':     return text + ' temu';
      case 'future':   return 'za ' + text;
    }
  },
  'parse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{months} {year?}',
    '{shift} {unit:5-7}',
    '{0} {shift?} {weekday}'
  ],
  'timeFrontParse': [
    '{day|weekday}',
    '{date} {months} {year?} {1?}',
    '{0?} {shift?} {weekday}'
  ]
});
