"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Hebrew
var strings = {
  prefixAgo: 'לפני',
  prefixFromNow: 'עוד',
  seconds: 'פחות מדקה',
  minute: 'דקה',
  minutes: '%d דקות',
  hour: 'שעה',
  hours: function hours(number) {
    return number === 2 ? 'שעתיים' : '%d שעות';
  },
  day: 'יום',
  days: function days(number) {
    return number === 2 ? 'יומיים' : '%d ימים';
  },
  month: 'חודש',
  months: function months(number) {
    return number === 2 ? 'חודשיים' : '%d חודשים';
  },
  year: 'שנה',
  years: function years(number) {
    return number === 2 ? 'שנתיים' : '%d שנים';
  }
};
var _default = strings;
exports["default"] = _default;