"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Czech
function f(n, d, a) {
  return a[d >= 0 ? 0 : a.length === 2 || n < 5 ? 1 : 2];
}

var strings = {
  prefixAgo: 'před',
  prefixFromNow: 'za',
  suffixAgo: null,
  suffixFromNow: null,
  seconds: function seconds(n, d) {
    return f(n, d, ['méně než minutou', 'méně než minutu']);
  },
  minute: function minute(n, d) {
    return f(n, d, ['minutou', 'minutu']);
  },
  minutes: function minutes(n, d) {
    return f(n, d, ['%d minutami', '%d minuty', '%d minut']);
  },
  hour: function hour(n, d) {
    return f(n, d, ['hodinou', 'hodinu']);
  },
  hours: function hours(n, d) {
    return f(n, d, ['%d hodinami', '%d hodiny', '%d hodin']);
  },
  day: function day(n, d) {
    return f(n, d, ['%d dnem', '%d den']);
  },
  days: function days(n, d) {
    return f(n, d, ['%d dny', '%d dny', '%d dní']);
  },
  month: function month(n, d) {
    return f(n, d, ['%d měsícem', '%d měsíc']);
  },
  months: function months(n, d) {
    return f(n, d, ['%d měsíci', '%d měsíce', '%d měsíců']);
  },
  year: function year(n, d) {
    return f(n, d, ['%d rokem', '%d rok']);
  },
  years: function years(n, d) {
    return f(n, d, ['%d lety', '%d roky', '%d let']);
  }
};
var _default = strings;
exports["default"] = _default;