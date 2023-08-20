/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.ca={})));})(this,(function(exports){'use strict';const name = 'ca';
const localization = {
    today: 'Avui',
    clear: 'Esborrar selecció',
    close: 'Tancar selector',
    selectMonth: 'Seleccionar mes',
    previousMonth: 'Mes anterior',
    nextMonth: 'Pròxim mes',
    selectYear: 'Seleccionar any',
    previousYear: 'Any anterior',
    nextYear: 'Pròxim any',
    selectDecade: 'Seleccionar dècada',
    previousDecade: 'Dècada anterior',
    nextDecade: 'Pròxima dècada',
    previousCentury: 'Segle anterior',
    nextCentury: 'Pròxim segle',
    pickHour: 'Escollir hora',
    incrementHour: 'Incrementar hora',
    decrementHour: 'Decrementar hora',
    pickMinute: 'Escollir minut',
    incrementMinute: 'Incrementar minut',
    decrementMinute: 'Decrementar minut',
    pickSecond: 'Escollir segon',
    incrementSecond: 'Incrementar segon',
    decrementSecond: 'Decrementar segon',
    toggleMeridiem: 'Canviar AM/PM',
    selectTime: 'Seleccionar temps',
    selectDate: 'Seleccionar data',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    startOfTheWeek: 1,
    locale: 'ca',
    dateFormats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'dd/MM/yyyy',
        LL: 'd [de] MMMM [de] yyyy',
        LLL: 'd [de] MMMM [de] yyyy H:mm',
        LLLL: 'dddd, d [de] MMMM [de] yyyy H:mm',
    },
    ordinal: (n) => `${n}º`,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));