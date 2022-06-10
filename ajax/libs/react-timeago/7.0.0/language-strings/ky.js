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
  suffixAgo: 'мурун',
  suffixFromNow: null,
  seconds: '1 минуттан аз',
  minute: 'минута',
  minutes: function minutes(value) {
    return numpf(value, '%d минута', '%d минута', '%d минут');
  },
  hour: 'саат',
  hours: function hours(value) {
    return numpf(value, '%d саат', '%d саат', '%d саат');
  },
  day: 'күн',
  days: function days(value) {
    return numpf(value, '%d күн', '%d күн', '%d күн');
  },
  month: 'ай',
  months: function months(value) {
    return numpf(value, '%d ай', '%d ай', '%d ай');
  },
  year: 'жыл',
  years: function years(value) {
    return numpf(value, '%d жыл', '%d жыл', '%d жыл');
  }
};
var _default = strings;
exports["default"] = _default;