(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {

  'use strict';

  $.fn.datepicker.languages['ja-JP'] = {
    format: 'yyyy年mm月dd日',
    days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    daysShort: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜'],
    daysMin: ['日', '月', '火', '水', '木', '金', '土'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekStart: 1,
    yearFirst: true,
    yearSuffix: '年'
  };
})));
