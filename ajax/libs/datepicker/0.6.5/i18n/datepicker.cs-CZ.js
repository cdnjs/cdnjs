(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {

  'use strict';

  $.fn.datepicker.languages['cs-CZ'] = {
    format: 'dd.mm.YYYY',
    days: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
    daysShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    daysMin: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    weekStart: 1,
    months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
    // Used everywhere, but probably not grammar correct
    monthsShort: ['Led', 'Úno', 'Bře', 'Dub', 'Květ', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro']
  };
})));
