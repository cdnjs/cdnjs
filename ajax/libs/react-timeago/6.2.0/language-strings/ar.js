"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function numpf(n, a) {
  return a[n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5];
}

var strings = {
  prefixAgo: 'منذ',
  prefixFromNow: 'بعد',
  suffixAgo: null,
  suffixFromNow: null,
  // null OR "من الآن"
  second: function second(value) {
    return numpf(value, ['أقل من ثانية', 'ثانية واحدة', 'ثانيتين', '%d ثوانٍ', '%d ثانية', '%d ثانية']);
  },
  seconds: function seconds(value) {
    return numpf(value, ['أقل من ثانية', 'ثانية واحدة', 'ثانيتين', '%d ثوانٍ', '%d ثانية', '%d ثانية']);
  },
  minute: function minute(value) {
    return numpf(value, ['أقل من دقيقة', 'دقيقة واحدة', 'دقيقتين', '%d دقائق', '%d دقيقة', 'دقيقة']);
  },
  minutes: function minutes(value) {
    return numpf(value, ['أقل من دقيقة', 'دقيقة واحدة', 'دقيقتين', '%d دقائق', '%d دقيقة', 'دقيقة']);
  },
  hour: function hour(value) {
    return numpf(value, ['أقل من ساعة', 'ساعة واحدة', 'ساعتين', '%d ساعات', '%d ساعة', '%d ساعة']);
  },
  hours: function hours(value) {
    return numpf(value, ['أقل من ساعة', 'ساعة واحدة', 'ساعتين', '%d ساعات', '%d ساعة', '%d ساعة']);
  },
  day: function day(value) {
    return numpf(value, ['أقل من يوم', 'يوم واحد', 'يومين', '%d أيام', '%d يومًا', '%d يوم']);
  },
  days: function days(value) {
    return numpf(value, ['أقل من يوم', 'يوم واحد', 'يومين', '%d أيام', '%d يومًا', '%d يوم']);
  },
  month: function month(value) {
    return numpf(value, ['أقل من شهر', 'شهر واحد', 'شهرين', '%d أشهر', '%d شهرًا', '%d شهر']);
  },
  months: function months(value) {
    return numpf(value, ['أقل من شهر', 'شهر واحد', 'شهرين', '%d أشهر', '%d شهرًا', '%d شهر']);
  },
  year: function year(value) {
    return numpf(value, ['أقل من عام', 'عام واحد', '%d عامين', '%d أعوام', '%d عامًا']);
  },
  years: function years(value) {
    return numpf(value, ['أقل من عام', 'عام واحد', 'عامين', '%d أعوام', '%d عامًا', '%d عام']);
  }
};
var _default = strings;
exports["default"] = _default;