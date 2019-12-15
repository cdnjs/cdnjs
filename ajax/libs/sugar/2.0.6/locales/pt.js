/*
 * Portuguese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('pt')
 *
 */
Sugar.Date.addLocale('pt', {
  'plural': true,
  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s',
  'months': 'jan:eiro|,fev:ereiro|,mar:ço|,abr:il|,mai:o|,jun:ho|,jul:ho|,ago:sto|,set:embro|,out:ubro|,nov:embro|,dez:embro|',
  'weekdays': 'dom:ingo|,seg:unda-feira|,ter:ça-feira|,qua:rta-feira|,qui:nta-feira|,sex:ta-feira|,sáb:ado||ado',
  'numerals': 'zero,um:|a,dois|duas,três|tres,quatro,cinco,seis,sete,oito,nove,dez',
  'tokens': 'a,de',
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} de {Month} de {yyyy}',
  'long':   '{d} de {Month} de {yyyy} {time}',
  'full':   '{Weekday}, {d} de {Month} de {yyyy} {time}',
  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'às',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'anteontem', 'value': -2 },
    { 'name': 'day', 'src': 'ontem', 'value': -1 },
    { 'name': 'day', 'src': 'hoje', 'value': 0 },
    { 'name': 'day', 'src': 'amanh:ã|a', 'value': 1 },
    { 'name': 'sign', 'src': 'atrás|atras|há|ha', 'value': -1 },
    { 'name': 'sign', 'src': 'daqui a', 'value': 1 },
    { 'name': 'shift', 'src': 'passad:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
  ],
  'parse': [
    '{months} {1?} {year?}',
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{0?} {unit:5-7} {shift}',
    '{0?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{0?} {shift} {weekday}',
    '{date} {1?} {months?} {1?} {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{date} {1?} {months?} {1?} {year?}'
  ]
});
