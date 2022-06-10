"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Croatian
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
  second: 'sekundu',
  seconds: function seconds(value) {
    return numpf(value, '%d sekundu', '%d sekunde', '%d sekundi');
  },
  minute: 'oko minutu',
  minutes: function minutes(value) {
    return numpf(value, '%d minutu', '%d minute', '%d minuta');
  },
  hour: 'oko jedan sat',
  hours: function hours(value) {
    return numpf(value, '%d sat', '%d sata', '%d sati');
  },
  day: 'jedan dan',
  days: function days(value) {
    return numpf(value, '%d dan', '%d dana', '%d dana');
  },
  month: 'mjesec dana',
  months: function months(value) {
    return numpf(value, '%d mjesec', '%d mjeseca', '%d mjeseci');
  },
  year: 'prije godinu dana',
  years: function years(value) {
    return numpf(value, '%d godinu', '%d godine', '%d godina');
  },
  wordSeparator: ' '
};
var _default = strings;
exports["default"] = _default;