"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Estonian
var strings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: 'tagasi',
  suffixFromNow: 'pärast',
  seconds: function seconds(n, d) {
    return d < 0 ? 'vähem kui minuti aja' : 'vähem kui minut aega';
  },
  minute: function minute(n, d) {
    return d < 0 ? 'umbes minuti aja' : 'umbes minut aega';
  },
  minutes: function minutes(n, d) {
    return d < 0 ? '%d minuti' : '%d minutit';
  },
  hour: function hour(n, d) {
    return d < 0 ? 'umbes tunni aja' : 'umbes tund aega';
  },
  hours: function hours(n, d) {
    return d < 0 ? '%d tunni' : '%d tundi';
  },
  day: function day(n, d) {
    return d < 0 ? 'umbes päeva' : 'umbes päev';
  },
  days: '%d päeva',
  month: function month(n, d) {
    return d < 0 ? 'umbes kuu aja' : 'umbes kuu aega';
  },
  months: function months(n, d) {
    return d < 0 ? '%d kuu' : '%d kuud';
  },
  year: function year(n, d) {
    return d < 0 ? 'umbes aasta aja' : 'umbes aasta aega';
  },
  years: function years(n, d) {
    return d < 0 ? '%d aasta' : '%d aastat';
  }
};
var _default = strings;
exports["default"] = _default;