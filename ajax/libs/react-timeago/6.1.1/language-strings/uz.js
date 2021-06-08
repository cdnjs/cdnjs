"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Uzbek
var strings = {
  prefixAgo: null,
  prefixFromNow: 'keyin',
  suffixAgo: 'avval',
  suffixFromNow: null,
  seconds: 'bir necha soniya',
  minute: '1 daqiqa',
  minutes: function minutes(_value) {
    return '%d daqiqa';
  },
  hour: '1 soat',
  hours: function hours(_value) {
    return '%d soat';
  },
  day: '1 kun',
  days: function days(_value) {
    return '%d kun';
  },
  month: '1 oy',
  months: function months(_value) {
    return '%d oy';
  },
  year: '1 yil',
  years: function years(_value) {
    return '%d yil';
  },
  wordSeparator: ' '
};
var _default = strings;
exports["default"] = _default;