(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['el-GR'] = {
    format: 'dd/mm/yyyy',
    days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
    daysShort: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
    daysMin: ['Κ', 'Δ', 'Τ', 'Τ', 'Π', 'Π', 'Σ'],
    months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβρης', 'Οκτώβρης', 'Νοέμβρης', 'Δεκέμβρης'],
    monthsShort: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι', 'Ιούν', 'Ιούλ', 'Άυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
    weekStart: 1,
    startView: 0,
    yearFirst: false,
    yearSuffix: ''
  };
})));
