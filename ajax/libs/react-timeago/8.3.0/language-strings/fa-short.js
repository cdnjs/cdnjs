"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var hasIntl = typeof Intl !== 'undefined' && Intl.NumberFormat != null;
var strings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: '',
  suffixFromNow: '',
  seconds: '۱دقیقه',
  minute: '۱دقیقه',
  minutes: function minutes(value) {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'دقیقه';
    }
    return '%dدقیقه';
  },
  hour: '۱ساعت',
  hours: function hours(value) {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'ساعت';
    }
    return '%dساعت';
  },
  day: '۱روز',
  days: function days(value) {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'روز';
    }
    return '%dروز';
  },
  month: '۱ماه',
  months: function months(value) {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'ماه';
    }
    return '%dماه';
  },
  year: '۱سال',
  years: function years(value) {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'سال';
    }
    return '%dسال';
  },
  wordSeparator: ' '
};
var _default = exports["default"] = strings;