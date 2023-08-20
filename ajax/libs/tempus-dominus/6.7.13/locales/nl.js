/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.nl={})));})(this,(function(exports){'use strict';const name = 'nl';
const localization = {
    today: 'Vandaag',
    clear: 'Verwijder selectie',
    close: 'Sluit de picker',
    selectMonth: 'Selecteer een maand',
    previousMonth: 'Vorige maand',
    nextMonth: 'Volgende maand',
    selectYear: 'Selecteer een jaar',
    previousYear: 'Vorige jaar',
    nextYear: 'Volgende jaar',
    selectDecade: 'Selecteer decennium',
    previousDecade: 'Vorige decennium',
    nextDecade: 'Volgende decennium',
    previousCentury: 'Vorige eeuw',
    nextCentury: 'Volgende eeuw',
    pickHour: 'Kies een uur',
    incrementHour: 'Verhoog uur',
    decrementHour: 'Verlaag uur',
    pickMinute: 'Kies een minute',
    incrementMinute: 'Verhoog  minuut',
    decrementMinute: 'Verlaag minuut',
    pickSecond: 'Kies een seconde',
    incrementSecond: 'Verhoog seconde',
    decrementSecond: 'Verlaag seconde',
    toggleMeridiem: 'Schakel tussen AM/PM',
    selectTime: 'Selecteer een tijd',
    selectDate: 'Selecteer een datum',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    locale: 'nl',
    startOfTheWeek: 1,
    dateFormats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'dd-MM-yyyy',
        LL: 'd MMMM yyyy',
        LLL: 'd MMMM yyyy HH:mm',
        LLLL: 'dddd d MMMM yyyy HH:mm',
    },
    ordinal: (n) => `[${n}${n === 1 || n === 8 || n >= 20 ? 'ste' : 'de'}]`,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));