/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.it={})));})(this,(function(exports){'use strict';const name = 'it';
const localization = {
    today: 'Oggi',
    clear: 'Cancella selezione',
    close: 'Chiudi',
    selectMonth: 'Seleziona mese',
    previousMonth: 'Mese precedente',
    nextMonth: 'Mese successivo',
    selectYear: 'Seleziona anno',
    previousYear: 'Anno precedente',
    nextYear: 'Anno successivo',
    selectDecade: 'Seleziona decennio',
    previousDecade: 'Decennio precedente',
    nextDecade: 'Decennio successivo',
    previousCentury: 'Secolo precedente',
    nextCentury: 'Secolo successivo',
    pickHour: "Seleziona l'ora",
    incrementHour: "Incrementa l'ora",
    decrementHour: "Decrementa l'ora",
    pickMinute: 'Seleziona i minuti',
    incrementMinute: 'Incrementa i minuti',
    decrementMinute: 'Decrementa i minuti',
    pickSecond: 'Seleziona i secondi',
    incrementSecond: 'Incrementa i secondi',
    decrementSecond: 'Decrementa i secondi',
    toggleMeridiem: 'Scambia AM-PM',
    selectTime: "Seleziona l'ora",
    selectDate: 'Seleziona una data',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    locale: 'it',
    startOfTheWeek: 1,
    dateFormats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'dd/MM/yyyy',
        LL: 'd MMMM yyyy',
        LLL: 'd MMMM yyyy HH:mm',
        LLLL: 'dddd d MMMM yyyy HH:mm',
    },
    ordinal: (n) => `${n}º`,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));