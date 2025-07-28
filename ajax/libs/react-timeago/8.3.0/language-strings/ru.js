"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function numpf(n, f, s, t) {
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
  suffixAgo: function suffixAgo(value) {
    if (value === 0) {
      return '';
    }
    return 'назад';
  },
  suffixFromNow: null,
  seconds: function seconds(value) {
    if (value === 0) {
      return 'только что';
    }
    return numpf(value, '%d секунду', '%d секунды', '%d секунд');
  },
  minute: 'минуту',
  minutes: function minutes(value) {
    return numpf(value, '%d минуту', '%d минуты', '%d минут');
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
var _default = exports["default"] = strings;