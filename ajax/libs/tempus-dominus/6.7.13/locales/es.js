/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.es={})));})(this,(function(exports){'use strict';const name = 'es';
const localization = {
    today: 'Hoy',
    clear: 'Borrar selección',
    close: 'Cerrar selector',
    selectMonth: 'Seleccionar mes',
    previousMonth: 'Mes anterior',
    nextMonth: 'Próximo mes',
    selectYear: 'Seleccionar año',
    previousYear: 'Año anterior',
    nextYear: 'Próximo año',
    selectDecade: 'Seleccionar década',
    previousDecade: 'Década anterior',
    nextDecade: 'Próxima década',
    previousCentury: 'Siglo anterior',
    nextCentury: 'Próximo siglo',
    pickHour: 'Elegir hora',
    incrementHour: 'Incrementar hora',
    decrementHour: 'Decrementar hora',
    pickMinute: 'Elegir minuto',
    incrementMinute: 'Incrementar minuto',
    decrementMinute: 'Decrementar minuto',
    pickSecond: 'Elegir segundo',
    incrementSecond: 'Incrementar segundo',
    decrementSecond: 'Decrementar segundo',
    toggleMeridiem: 'Cambiar AM/PM',
    selectTime: 'Seleccionar tiempo',
    selectDate: 'Seleccionar fecha',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    startOfTheWeek: 1,
    locale: 'es',
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