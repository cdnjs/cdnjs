(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['is-IS'] = {
    format: 'dd.mm.YYYY',
    // Capital letters are not used in day/month names
    days: ['sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur', 'fimmtudagur', 'föstudagur', 'laugardagur'],
    daysShort: ['sun', 'mán', 'þri', 'mið', 'fim', 'fös', 'lau'],
    daysMin: ['Su', 'Má', 'Þr', 'Mi', 'Fi', 'Fö', 'La'],
    weekStart: 1,
    months: ['janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember'],
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'maí', 'jún', 'júl', 'ágú', 'sep', 'okt', 'nóv', 'des']
  };
})));
