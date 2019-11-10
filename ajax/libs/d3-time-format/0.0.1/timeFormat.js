if (typeof Map === "undefined") {
  Map = function() { this.clear(); };
  Map.prototype = {
    set: function(k, v) { this._[k] = v; return this; },
    get: function(k) { return this._[k]; },
    has: function(k) { return k in this._; },
    delete: function(k) { return k in this._ && delete this._[k]; },
    clear: function() { this._ = Object.create(null); },
    get size() { var n = 0; for (var k in this._) ++n; return n; },
    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
  };
} else (function() {
  var m = new Map;
  if (m.set(0, 0) !== m) {
    m = m.set;
    Map.prototype.set = function() { m.apply(this, arguments); return this; };
  }
})();

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.timeFormat = {}));
}(this, function (exports) { 'use strict';

  var pads = {"-": "", "_": " ", "0": "0"};

  var LocalDate = Date;

  var date = Date;

  function UtcDate() {
    this._ = new date(arguments.length > 1 ? date.UTC.apply(this, arguments) : arguments[0]);
  }

  var proto = date.prototype;

  UtcDate.prototype = {
    getDate: function() { return this._.getUTCDate(); },
    getDay: function() { return this._.getUTCDay(); },
    getFullYear: function() { return this._.getUTCFullYear(); },
    getHours: function() { return this._.getUTCHours(); },
    getMilliseconds: function() { return this._.getUTCMilliseconds(); },
    getMinutes: function() { return this._.getUTCMinutes(); },
    getMonth: function() { return this._.getUTCMonth(); },
    getSeconds: function() { return this._.getUTCSeconds(); },
    getTime: function() { return this._.getTime(); },
    getTimezoneOffset: function() { return 0; },
    valueOf: function() { return this._.valueOf(); },
    setDate: function() { return proto.setUTCDate.apply(this._, arguments); },
    setDay: function() { return proto.setUTCDay.apply(this._, arguments); },
    setFullYear: function() { return proto.setUTCFullYear.apply(this._, arguments); },
    setHours: function() { return proto.setUTCHours.apply(this._, arguments); },
    setMilliseconds: function() { return proto.setUTCMilliseconds.apply(this._, arguments); },
    setMinutes: function() { return proto.setUTCMinutes.apply(this._, arguments); },
    setMonth: function() { return proto.setUTCMonth.apply(this._, arguments); },
    setSeconds: function() { return proto.setUTCSeconds.apply(this._, arguments); },
    setTime: function() { return proto.setTime.apply(this._, arguments); }
  };

  var percentRe = /^%/;

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseZone(d, string, i) {
    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5))
        ? (d.Z = -string, i + 5) // sign differs from getTimezoneOffset!
        : -1;
  }

  var numberRe = /^\s*\d+/;

  function parseWeekdayNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDay(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.j = +n[0], i + n[0].length) : -1;
  }

  // Note: we don't validate that the hour is in the range [0,23] or [1,12].
  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad(z / 60 | 0, "0", 2)
        + pad(z % 60, "0", 2);
  }

  function newInterval(floori, offseti, count) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.round = function(date) {
      var d0 = new Date(+date),
          d1 = new Date(date - 1);
      floori(d0), floori(d1), offseti(d1, 1);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), date;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [];
      start = new Date(start - 1);
      stop = new Date(+stop);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop)) return range; // also handles Invalid Date
      offseti(start, 1), floori(start);
      if (start < stop) range.push(new Date(+start));
      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        while (--step >= 0) while (offseti(date, 1), !test(date));
      });
    };

    if (count) interval.count = function(start, end) {
      start = new Date(+start);
      end = new Date(+end);
      floori(start), floori(end);
      return Math.floor(count(start, end));
    };

    return interval;
  }

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  });

  function weekday(i) {
    return newInterval(function(date) {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    }, function(date, offset) {
      date.setDate(date.getDate() + offset * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
    });
  }

  var monday = weekday(1);

  var sunday = weekday(0);

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
  });

  function formatLookup(names) {
    var map = new Map, i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }

  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function localeFormat(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_days = locale.days,
        locale_shortDays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodLookup = formatLookup(locale_periods),
        dayRe = formatRe(locale_days),
        dayLookup = formatLookup(locale_days),
        dayAbbrevRe = formatRe(locale_shortDays),
        dayAbbrevLookup = formatLookup(locale_shortDays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        monthAbbrevRe = formatRe(locale_shortMonths),
        monthAbbrevLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": function(d) { return locale_shortDays[d.getDay()]; },
      "A": function(d) { return locale_days[d.getDay()]; },
      "b": function(d) { return locale_shortMonths[d.getMonth()]; },
      "B": function(d) { return locale_months[d.getMonth()]; },
      "c": newFormat(locale_dateTime),
      "d": function(d, p) { return pad(d.getDate(), p, 2); },
      "e": function(d, p) { return pad(d.getDate(), p, 2); },
      "H": function(d, p) { return pad(d.getHours(), p, 2); },
      "I": function(d, p) { return pad(d.getHours() % 12 || 12, p, 2); },
      "j": function(d, p) { return pad(1 + day.count(year(d), d), p, 3); },
      "L": function(d, p) { return pad(d.getMilliseconds(), p, 3); },
      "m": function(d, p) { return pad(d.getMonth() + 1, p, 2); },
      "M": function(d, p) { return pad(d.getMinutes(), p, 2); },
      "p": function(d) { return locale_periods[+(d.getHours() >= 12)]; },
      "S": function(d, p) { return pad(d.getSeconds(), p, 2); },
      "U": function(d, p) { return pad(sunday.count(year(d), d), p, 2); },
      "w": function(d) { return d.getDay(); },
      "W": function(d, p) { return pad(monday.count(year(d), d), p, 2); },
      "x": newFormat(locale_date),
      "X": newFormat(locale_time),
      "y": function(d, p) { return pad(d.getFullYear() % 100, p, 2); },
      "Y": function(d, p) { return pad(d.getFullYear() % 10000, p, 4); },
      "Z": formatZone,
      "%": function() { return "%"; }
    };

    var parses = {
      "a": parseWeekdayAbbrev,
      "A": parseWeekday,
      "b": parseMonthAbbrev,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDay,
      "e": parseDay,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parseAmPm,
      "S": parseSeconds,
      "U": parseWeekNumberSunday,
      "w": parseWeekdayNumber,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    function newFormat(specifier) {
      specifier += "";

      function format(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            if (format = formats[c]) c = format(date, pad == null ? (c === "e" ? " " : "0") : pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      }

      format.parse = function(string) {
        var d = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0, Z: null},
            i = parseSpecifier(d, specifier, string, 0);
        if (i != string.length) return null;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // If a time zone is specified, it is always relative to UTC;
        // we need to use UtcDate if we aren’t already.
        var localZ = d.Z != null && Date !== UtcDate,
            date = new (localZ ? UtcDate : Date);

        // Set year, month, date.
        if ("j" in d) {
          date.setFullYear(d.y, 0, d.j);
        } else if ("w" in d && ("W" in d || "U" in d)) {
          date.setFullYear(d.y, 0, 1);
          date.setFullYear(d.y, 0, "W" in d
              ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7
              :  d.w          + d.U * 7 - (date.getDay() + 6) % 7);
        } else {
          date.setFullYear(d.y, d.m, d.d);
        }

        // Set hours, minutes, seconds and milliseconds.
        date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);

        return localZ ? date._ : date;
      };

      format.toString = function() {
        return specifier;
      };

      return format;
    }

    function newUtcFormat(specifier) {
      var local = newFormat(specifier);

      function format(date) {
        try {
          Date = UtcDate;
          var utc = new Date;
          utc._ = date;
          return local(utc);
        } finally {
          Date = LocalDate;
        }
      }

      format.parse = function(string) {
        try {
          Date = UtcDate;
          var date = local.parse(string);
          return date && date._;
        } finally {
          Date = LocalDate;
        }
      };

      format.toString = local.toString;

      return format;
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parseWeekdayAbbrev(d, string, i) {
      var n = dayAbbrevRe.exec(string.slice(i));
      return n ? (d.w = dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = dayRe.exec(string.slice(i));
      return n ? (d.w = dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseMonthAbbrev(d, string, i) {
      var n = monthAbbrevRe.exec(string.slice(i));
      return n ? (d.m = monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function parseAmPm(d, string, i) {
      var n = periodLookup.get(string.slice(i, i += 2).toLowerCase());
      return n == null ? -1 : (d.p = n, i);
    }

    return {
      format: newFormat,
      utcFormat: newUtcFormat
    };
  }

  var locale = localeFormat({
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  exports.format = locale.format;
  exports.utcFormat = locale.utcFormat;

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };

  formatIsoNative.toString = function() {
    return isoSpecifier;
  };

  var formatIso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
      ? formatIsoNative
      : locale.utcFormat(isoSpecifier);

  var isoFormat = formatIso;

  exports.isoFormat = isoFormat;
  exports.localeFormat = localeFormat;

}));