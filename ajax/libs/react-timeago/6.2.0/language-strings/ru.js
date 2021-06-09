"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Russian
function numpf(n, f, s, t) {
  // f - 1, 21, 31, ...
  // s - 2-4, 22-24, 32-34 ...
  // t - 5-20, 25-30, ...
  var n10 = n % 10;

  if (n10 === 1 && (n === 1 || n > 20)) {
    return f;
  } else if (n10 > 1 && n10 < 5 && (n > 20 || n < 10)) {
    return s;
  } else {
    return t;
  }
}

var strings = {
  prefixAgo: null,
  prefixFromNow: 'через',
  suffixAgo: 'назад',
  suffixFromNow: null,
  seconds: 'меньше минуты',
  minute: 'минуту',
  minutes: function minutes(value) {
    return numpf(value, '%d минута', '%d минуты', '%d минут');
  },
  hour: 'час',
  hours: function hours(value) {
    return numpf(value, '%d час', '%d часа', '%d часов');
  },
  day: 'день',
  days: function days(value) {
    return numpf(value, '%d день', '%d дня', '%d дней');
  },
  month: 'месяц',
  months: function months(value) {
    return numpf(value, '%d месяц', '%d месяца', '%d месяцев');
  },
  year: 'год',
  years: function years(value) {
    return numpf(value, '%d год', '%d года', '%d лет');
  }
};
var _default = strings;
exports["default"] = _default;