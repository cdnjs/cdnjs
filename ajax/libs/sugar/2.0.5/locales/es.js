/*
 * Spanish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('es')
 *
 */
Sugar.Date.addLocale('es', {
  'plural': true,
  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos',
  'months': 'ene:ro|,feb:rero|,mar:zo|,abr:il|,may:o|,jun:io|,jul:io|,ago:sto|,sep:tiembre|,oct:ubre|,nov:iembre|,dic:iembre|',
  'weekdays': 'dom:ingo|,lun:es|,mar:tes|,mié:rcoles|+mie:rcoles|,jue:ves|,vie:rnes|,sáb:ado|+sab:ado|',
  'numerals': 'cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez',
  'tokens': 'el,la,de',
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} de {Month} de {yyyy}',
  'long':   '{d} de {Month} de {yyyy} {time}',
  'full':   '{weekday}, {d} de {month} de {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'a las',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'anteayer', 'value': -2 },
    { 'name': 'day', 'src': 'ayer', 'value': -1 },
    { 'name': 'day', 'src': 'hoy', 'value': 0 },
    { 'name': 'day', 'src': 'mañana|manana', 'value': 1 },
    { 'name': 'sign', 'src': 'hace', 'value': -1 },
    { 'name': 'sign', 'src': 'dentro de', 'value': 1 },
    { 'name': 'shift', 'src': 'pasad:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
  ],
  'parse': [
    '{months} {2?} {year?}',
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{0?}{1?} {unit:5-7} {shift}',
    '{0?}{1?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday} {shift?}',
    '{date} {2?} {months?}\\.? {2?} {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {weekday} {shift?}',
    '{date} {2?} {months?}\\.? {2?} {year?}'
  ]
});
