/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.locales=g.tempusDominus.locales||{},g.tempusDominus.locales.ru={})));})(this,(function(exports){'use strict';const name = 'ru';
const localization = {
    today: 'Перейти сегодня',
    clear: 'Очистить выделение',
    close: 'Закрыть сборщик',
    selectMonth: 'Выбрать месяц',
    previousMonth: 'Предыдущий месяц',
    nextMonth: 'В следующем месяце',
    selectYear: 'Выбрать год',
    previousYear: 'Предыдущий год',
    nextYear: 'В следующем году',
    selectDecade: 'Выбрать десятилетие',
    previousDecade: 'Предыдущее десятилетие',
    nextDecade: 'Следующее десятилетие',
    previousCentury: 'Предыдущий век',
    nextCentury: 'Следующий век',
    pickHour: 'Выберите час',
    incrementHour: 'Время увеличения',
    decrementHour: 'Уменьшить час',
    pickMinute: 'Выбрать минуту',
    incrementMinute: 'Минута приращения',
    decrementMinute: 'Уменьшить минуту',
    pickSecond: 'Выбрать второй',
    incrementSecond: 'Увеличение секунды',
    decrementSecond: 'Уменьшение секунды',
    toggleMeridiem: 'Переключить период',
    selectTime: 'Выбрать время',
    selectDate: 'Выбрать дату',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    locale: 'ru',
    startOfTheWeek: 1,
    dateFormats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'dd.MM.yyyy',
        LL: 'd MMMM yyyy г.',
        LLL: 'd MMMM yyyy г., H:mm',
        LLLL: 'dddd, d MMMM yyyy г., H:mm',
    },
    ordinal: (n) => n,
    format: 'L LT',
};exports.localization=localization;exports.name=name;Object.defineProperty(exports,'__esModule',{value:true});}));