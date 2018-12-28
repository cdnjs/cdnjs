(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['km-KH'] = {
    format: 'dd-mm-yyyy',
    days: ['អាទិត្យ', 'ច័ន្ទ', ' អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'],
    daysShort: ['អទ', 'ចន', 'អង', 'ពធ', 'ពហ', 'សក', 'សរ'],
    daysMin: ['អ', 'ច', 'អ', 'ព', 'ព្', 'ស', 'ស'],
    weekStart: 1,
    months: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
    monthsShort: ['មរ', 'កម', 'មន', 'មស', 'ឧស', 'មថ', 'កដ', 'សហ', 'កញ', 'តល', 'វឆ', 'ធ្ន']
  };
})));
