"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Ukrainian
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
  suffixAgo: 'тому',
  suffixFromNow: null,
  seconds: 'менше хвилини',
  minute: 'хвилина',
  minutes: function minutes(value) {
    return numpf(value, '%d хвилина', '%d хвилини', '%d хвилин');
  },
  hour: 'година',
  hours: function hours(value) {
    return numpf(value, '%d година', '%d години', '%d годин');
  },
  day: 'день',
  days: function days(value) {
    return numpf(value, '%d день', '%d дні', '%d днів');
  },
  month: 'місяць',
  months: function months(value) {
    return numpf(value, '%d місяць', '%d місяці', '%d місяців');
  },
  year: 'рік',
  years: function years(value) {
    return numpf(value, '%d рік', '%d роки', '%d років');
  }
};
var _default = strings;
exports["default"] = _default;