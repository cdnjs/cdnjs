/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.pl={})));})(this,(function(exports){'use strict';const name = 'pl';
const localization = {
    today: 'Dzisiaj',
    clear: 'Wyczyść',
    close: 'Zamknij',
    selectMonth: 'Wybierz miesiąc',
    previousMonth: 'Poprzedni miesiąc',
    nextMonth: 'Następny miesiąc',
    selectYear: 'Wybierz rok',
    previousYear: 'Poprzedni rok',
    nextYear: 'Następny rok',
    selectDecade: 'Wybierz dekadę',
    previousDecade: 'Poprzednia dekada',
    nextDecade: 'Następna dekada',
    previousCentury: 'Poprzednie stulecie',
    nextCentury: 'Następne stulecie',
    pickHour: 'Wybierz godzinę',
    incrementHour: 'Kolejna godzina',
    decrementHour: 'Poprzednia godzina',
    pickMinute: 'Wybierz minutę',
    incrementMinute: 'Kolejna minuta',
    decrementMinute: 'Poprzednia minuta',
    pickSecond: 'Wybierz sekundę',
    incrementSecond: 'Kolejna sekunda',
    decrementSecond: 'Poprzednia sekunda',
    toggleMeridiem: 'Przełącz porę dnia',
    selectTime: 'Ustaw godzinę',
    selectDate: 'Ustaw datę',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    locale: 'pl',
    startOfTheWeek: 1,
    dateFormats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'dd.MM.yyyy',
        LL: 'd MMMM yyyy',
        LLL: 'd MMMM yyyy HH:mm',
        LLLL: 'dddd, d MMMM yyyy HH:mm',
    },
    ordinal: (n) => `${n}.`,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));