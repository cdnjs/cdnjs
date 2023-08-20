/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.de={})));})(this,(function(exports){'use strict';const name = 'de';
const localization = {
    today: 'Heute',
    clear: 'Auswahl löschen',
    close: 'Auswahlbox schließen',
    selectMonth: 'Monat wählen',
    previousMonth: 'Letzter Monat',
    nextMonth: 'Nächster Monat',
    selectYear: 'Jahr wählen',
    previousYear: 'Letztes Jahr',
    nextYear: 'Nächstes Jahr',
    selectDecade: 'Jahrzehnt wählen',
    previousDecade: 'Letztes Jahrzehnt',
    nextDecade: 'Nächstes Jahrzehnt',
    previousCentury: 'Letztes Jahrhundert',
    nextCentury: 'Nächstes Jahrhundert',
    pickHour: 'Stunde wählen',
    incrementHour: 'Stunde erhöhen',
    decrementHour: 'Stunde verringern',
    pickMinute: 'Minute wählen',
    incrementMinute: 'Minute erhöhen',
    decrementMinute: 'Minute verringern',
    pickSecond: 'Sekunde wählen',
    incrementSecond: 'Sekunde erhöhen',
    decrementSecond: 'Sekunde verringern',
    toggleMeridiem: 'Tageszeit umschalten',
    selectTime: 'Zeit wählen',
    selectDate: 'Datum wählen',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    locale: 'de',
    startOfTheWeek: 1,
    dateFormats: {
        LTS: 'HH:mm:ss',
        LT: 'HH:mm',
        L: 'dd.MM.yyyy',
        LL: 'd. MMMM yyyy',
        LLL: 'd. MMMM yyyy HH:mm',
        LLLL: 'dddd, d. MMMM yyyy HH:mm',
    },
    ordinal: (n) => `${n}.`,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));