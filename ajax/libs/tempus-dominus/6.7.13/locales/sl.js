/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.sl={})));})(this,(function(exports){'use strict';const name = 'sl';
const localization = {
    today: 'Danes',
    clear: 'Počisti',
    close: 'Zapri',
    selectMonth: 'Izberite mesec',
    previousMonth: 'Prejšnji mesec',
    nextMonth: 'Naslednji mesec',
    selectYear: 'Izberite leto',
    previousYear: 'Prejšnje Leto',
    nextYear: 'Naslednje leto',
    selectDecade: 'Izberite desetletje',
    previousDecade: 'Prejšnje desetletje',
    nextDecade: 'Naslednje desetletje',
    previousCentury: 'Prejšnje stoletje',
    nextCentury: 'Naslednje stoletje',
    pickHour: 'Izberite uro',
    incrementHour: 'Povečaj ure',
    decrementHour: 'Zmanjšaj uro',
    pickMinute: 'Izberite minuto',
    incrementMinute: 'Povečaj minuto',
    decrementMinute: 'Zmanjšaj minuto',
    pickSecond: 'Izberite drugo',
    incrementSecond: 'Povečaj sekundo',
    decrementSecond: 'Zmanjšaj sekundo',
    toggleMeridiem: 'Preklop dopoldne/popoldne',
    selectTime: 'Izberite čas',
    selectDate: 'Izberite Datum',
    dayViewHeaderFormat: { month: 'long', year: 'numeric' },
    locale: 'sl',
    startOfTheWeek: 1,
    dateFormats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'dd.MM.yyyy',
        LL: 'd. MMMM yyyy',
        LLL: 'd. MMMM yyyy H:mm',
        LLLL: 'dddd, d. MMMM yyyy H:mm',
    },
    ordinal: (n) => `${n}.`,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));