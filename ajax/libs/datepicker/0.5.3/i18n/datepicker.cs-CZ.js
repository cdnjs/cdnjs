(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('datepicker.cs-CZ', ['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

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
});