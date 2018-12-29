(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['hu-HU'] = {
    format: 'yyyy. mm. dd.',
    days: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],
    daysShort: ['vas', 'hé', 'ke', 'sze', 'csüt', 'pé', 'szo'],
    daysMin: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
    weekStart: 1,
    months: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
    monthsShort: ['jan', 'feb', 'már', 'ápr', 'máj', 'jún', 'júl', 'aug', 'szep', 'okt', 'nov', 'dec']
  };
})));
