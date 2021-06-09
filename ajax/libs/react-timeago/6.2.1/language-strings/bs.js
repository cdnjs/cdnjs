"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Bosnian
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
  prefixAgo: 'prije',
  prefixFromNow: 'za',
  suffixAgo: null,
  suffixFromNow: null,
  second: 'sekund',
  seconds: function seconds(value) {
    return numpf(value, '%d sekund', '%d sekunde', '%d sekundi');
  },
  minute: 'oko minut',
  minutes: function minutes(value) {
    return numpf(value, '%d minut', '%d minute', '%d minuta');
  },
  hour: 'oko sat',
  hours: function hours(value) {
    return numpf(value, '%d sat', '%d sata', '%d sati');
  },
  day: 'oko jednog dana',
  days: function days(value) {
    return numpf(value, '%d dan', '%d dana', '%d dana');
  },
  month: 'mjesec dana',
  months: function months(value) {
    return numpf(value, '%d mjesec', '%d mjeseca', '%d mjeseci');
  },
  year: 'prije godinu dana ',
  years: function years(value) {
    return numpf(value, '%d godinu', '%d godine', '%d godina');
  },
  wordSeparator: ' '
};
var _default = strings;
exports["default"] = _default;