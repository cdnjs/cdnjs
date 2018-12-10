/*
 * Catalan locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ca')
 *
 */
Sugar.Date.addLocale('ca', {
  'plural': true,
  'units': 'milisegon:|s,segon:|s,minut:|s,hor:a|es,di:a|es,setman:a|es,mes:|os,any:|s',
  'months': 'gen:er|,febr:er|,mar:ç|,abr:il|,mai:g|,jun:y|,jul:iol|,ag:ost|,set:embre|,oct:ubre|,nov:embre|,des:embre|',
  'weekdays': 'diumenge|dg,dilluns|dl,dimarts|dt,dimecres|dc,dijous|dj,divendres|dv,dissabte|ds',
  'numerals': 'zero,un,dos,tres,quatre,cinc,sis,set,vuit,nou,deu',
  'tokens': 'el,la,de',
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long':   '{d} {month} {yyyy} {time}',
  'full':   '{weekday} {d} {month} {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'a las',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': "abans d'ahir", 'value': -2 },
    { 'name': 'day', 'src': 'ahir', 'value': -1 },
    { 'name': 'day', 'src': 'avui', 'value': 0 },
    { 'name': 'day', 'src': 'demà|dema', 'value': 1 },
    { 'name': 'sign', 'src': 'fa', 'value': -1 },
    { 'name': 'sign', 'src': 'en', 'value': 1 },
    { 'name': 'shift', 'src': 'passat', 'value': -1 },
    { 'name': 'shift', 'src': 'el proper|la propera', 'value': 1 }
  ],
  'parse': [
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{0?}{1?} {unit:5-7} {shift}',
    '{0?}{1?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift} {weekday}',
    '{weekday} {shift}',
    '{date?} {2?} {months}\\.? {2?} {year?}'
  ]
});
