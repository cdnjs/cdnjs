"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Polish
function numpf(n, s, t) {
  // s - 2-4, 22-24, 32-34 ...
  // t - 5-21, 25-31, ...
  var n10 = n % 10;

  if (n10 > 1 && n10 < 5 && (n > 20 || n < 10)) {
    return s;
  } else {
    return t;
  }
}

var strings = {
  prefixAgo: null,
  prefixFromNow: 'za',
  suffixAgo: 'temu',
  suffixFromNow: null,
  seconds: 'mniej niż minutę',
  minute: 'minutę',
  minutes: function minutes(value) {
    return numpf(value, '%d minuty', '%d minut');
  },
  hour: 'godzinę',
  hours: function hours(value) {
    return numpf(value, '%d godziny', '%d godzin');
  },
  day: 'dzień',
  days: '%d dni',
  month: 'miesiąc',
  months: function months(value) {
    return numpf(value, '%d miesiące', '%d miesięcy');
  },
  year: 'rok',
  years: function years(value) {
    return numpf(value, '%d lata', '%d lat');
  }
};
var _default = strings;
exports["default"] = _default;