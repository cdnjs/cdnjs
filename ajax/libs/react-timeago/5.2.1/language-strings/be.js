"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Belarusian
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
  prefixFromNow: 'праз',
  suffixAgo: 'таму',
  suffixFromNow: null,
  seconds: 'менш хвіліны',
  minute: 'хвіліну',
  minutes: function minutes(value) {
    return numpf(value, '%d хвіліна', '%d хвіліны', '%d хвілін');
  },
  hour: 'гадзіну',
  hours: function hours(value) {
    return numpf(value, '%d гадзіна', '%d гадзіны', '%d гадзін');
  },
  day: 'дзень',
  days: function days(value) {
    return numpf(value, '%d дзень', '%d дні', '%d дзён');
  },
  month: 'месяц',
  months: function months(value) {
    return numpf(value, '%d месяц', '%d месяцы', '%d месяцаў');
  },
  year: 'год',
  years: function years(value) {
    return numpf(value, '%d год', '%d гады', '%d гадоў');
  }
};
var _default = strings;
exports["default"] = _default;