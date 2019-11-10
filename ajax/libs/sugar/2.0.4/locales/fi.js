/*
 * Finnish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('fi')
 *
 */
Sugar.Date.addLocale('fi', {
  'plural': true,
  'units': 'millisekun:ti|tia|nin|teja|tina,sekun:ti|tia|nin|teja|tina,minuut:ti|tia|in|teja|tina,tun:ti|tia|nin|teja|tina,päiv:ä|ää|än|iä|änä,viik:ko|koa|on|olla|koja|kona,kuukau:si|tta|den+kuussa,vuo:si|tta|den|sia|tena|nna',
  'months': 'tammi:kuuta||kuu,helmi:kuuta||kuu,maalis:kuuta||kuu,huhti:kuuta||kuu,touko:kuuta||kuu,kesä:kuuta||kuu,heinä:kuuta||kuu,elo:kuuta||kuu,syys:kuuta||kuu,loka:kuuta||kuu,marras:kuuta||kuu,joulu:kuuta||kuu',
  'weekdays': 'su:nnuntai||nnuntaina,ma:anantai||anantaina,ti:istai||istaina,ke:skiviikko||skiviikkona,to:rstai||rstaina,pe:rjantai||rjantaina,la:uantai||uantaina',
  'numerals': 'nolla,yksi|ensimmäinen,kaksi|toinen,kolm:e|as,neljä:|s,vii:si|des,kuu:si|des,seitsemä:n|s,kahdeksa:n|s,yhdeksä:n|s,kymmene:n|s',
  'short': '{d}.{M}.{yyyy}',
  'medium': '{d}. {month} {yyyy}',
  'long': '{d}. {month} {yyyy} klo {time}',
  'full': '{weekday} {d}. {month} {yyyy} klo {time}',
  'stamp': '{dow} {d} {mon} {yyyy} {time}',
  'time': '{H}.{mm}',
  'timeMarkers': 'klo,kello',
  'ordinalSuffix': '.',
  'relative': function(num, unit, ms, format) {
    var units = this['units'];
    function numberWithUnit(mult) {
      return num + ' ' + units[(8 * mult) + unit];
    }
    function baseUnit() {
      return numberWithUnit(num === 1 ? 0 : 1);
    }
    switch(format) {
      case 'duration':  return baseUnit();
      case 'past':      return baseUnit() + ' sitten';
      case 'future':    return numberWithUnit(2) + ' kuluttua';
    }
  },
  'modifiers': [
    { 'name': 'day',   'src': 'toissa päivänä', 'value': -2 },
    { 'name': 'day',   'src': 'eilen|eilistä', 'value': -1 },
    { 'name': 'day',   'src': 'tänään', 'value': 0 },
    { 'name': 'day',   'src': 'huomenna|huomista', 'value': 1 },
    { 'name': 'day',   'src': 'ylihuomenna|ylihuomista', 'value': 2 },
    { 'name': 'sign',  'src': 'sitten|aiemmin', 'value': -1 },
    { 'name': 'sign',  'src': 'päästä|kuluttua|myöhemmin', 'value': 1 },
    { 'name': 'edge',  'src': 'lopussa', 'value': 2 },
    { 'name': 'edge',  'src': 'ensimmäinen|ensimmäisenä', 'value': -2 },
    { 'name': 'shift', 'src': 'edel:linen|lisenä', 'value': -1 },
    { 'name': 'shift', 'src': 'viime', 'value': -1 },
    { 'name': 'shift', 'src': 'tä:llä|ssä|nä|mä', 'value': 0 },
    { 'name': 'shift', 'src': 'seuraava|seuraavana|tuleva|tulevana|ensi', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{num?} {unit} {sign}',
    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
  ]
});
